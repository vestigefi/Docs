---
sidebar_position: 3
title: Developer Guide
---

# For Developers (Developer Guide)

This guide provides the technical details needed to interact with the AsaMetadataManager smart contract.

### Contract Information

*   **MainNet**
    *   **Network**: Algorand MainNet
    *   **Application ID**: `3129810607`
    *   **Application Address**: `YOX47PUA2IARLJCG6CWYPSW7AYFFBAUJJEDVZVPNJS7DRNWPMJ6CT77TMM`
*   **TestNet**
    *   **Application ID**: `743122411`
    *   **Application Address**: `BXYU4XINAL5FLWFXFBMVMTPMPAE4H5AC322UY5KSHNKQ3GNYLKJADBUG7Q`
*   **ABI Specification**: You can find the full ARC-56 ABI JSON file [here](/abi/AsaMetadataManager.arc56.json).

### Setting Up Your Environment

You will need an Algorand SDK to interact with the contract. The following examples use the official Algorand JavaScript SDK and assume you have access to the contract's ABI file.

```javascript
import algosdk, { encodeUint64 } from "algosdk";
import contractAbi from "./AsaMetadataManager.arc56.json"; // The ARC-56 ABI JSON file

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", 443);
const contract = new algosdk.ABIContract(contractAbi);

const ASA_METADATA_MANAGER_APP_ID = 3129810607; // MainNet App ID

// An account that can sign transactions
const sender = {
    addr: YOUR_ADDRESS,
    signer: your_signer, // e.g., algosdk.makeBasicAccountTransactionSigner(your_account)
};

// Helper methods
const bytesToString = (bytes: Uint8Array): string => {
    const bytesArray = new Uint8Array(bytes);
    const utf8Decoder = new TextDecoder("utf-8");
    const decodedString = utf8Decoder.decode(bytesArray);
    return decodedString;
};

const stringToBytes = (value: string): Uint8Array => {
    const utf8Encoder = new TextEncoder();
    const result = utf8Encoder.encode(value);
    return result;
};

const bytesToBigInt = (bytes: Uint8Array, byteLength?: number): bigint => {
    const actualLength = byteLength
        ? Math.min(byteLength, bytes.length)
        : bytes.length;

    let result = 0;
    for (let i = 0; i < actualLength; i++) {
        result = (result << 8) | bytes[i];
    }

    return BigInt(result);
};

const bigIntToBytes = (value: bigint, byteLength: number): Uint8Array => {
    const result = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; i++) {
        result[byteLength - 1 - i] = Number(value & BigInt(0xff));
        value >>= BigInt(8);
    }
    return result;
};
```

### Reading Metadata (Read-Only Calls)

To read metadata, you should use a `simulate` call. This is a read-only operation and does not require signatures or fees. The contract returns data via logs, not a return value.

**Example: Fetching an asset's description and other data**

The `get_asset_metadata` method is used for all data retrieval. You specify which data to include using boolean flags.

```javascript
// This account is used for read-only calls and does not need to be funded, since it is funded on all networks except LocalNet.
const READ_ACCOUNT = "A7NMWS3NT3IUDMLVO26ULGXGIIOUQ3ND2TXSER6EBGRZNOBOUIQXHIBGDE";

async function getAssetMetadata(assetId) {
    const atc = new algosdk.AtomicTransactionComposer();
    const suggestedParams = await algodClient.getTransactionParams().do();

    atc.addMethodCall({
        appID: ASA_METADATA_MANAGER_APP_ID,
        method: contract.getMethodByName("get_asset_metadata"),
        methodArgs: [
            assetId,
            false, // include_asset_full
            true,  // include_core_metadata
            true,  // include_wallet_labels
            false, // include_managers
            true,  // include_circulating_supply
            false, // include_wallet_labels_balances
        ],
        sender: READ_ACCOUNT,
        signer: algosdk.makeEmptyTransactionSigner(),
        suggestedParams,
    });
    
    // Simulate the call to get the logs
    const simulateRequest = new algosdk.modelsv2.SimulateRequest({ txnGroups: [], allowEmptySignatures: true });
    const simulateResponse = await atc.simulate(algodClient, simulateRequest);
    const logs = simulateResponse.simulateResponse.txnGroups[0].txnResults[0].txnResult.logs;

    if (!logs) {
        throw new Error("No metadata found for asset " + assetId);
    }

    // The ABI method logs raw bytes. You need to decode them.
    // The order of logs corresponds to the `include_*` flags that are set to true.
    // In this example: core_metadata, wallet_labels, circulating_supply
    
    // 1. Decode Core Metadata
    // The type is (byte[],byte[],uint64,(byte[2],byte[])[]) for (description, imageIcon, lastUpdated, fields)
    const coreMetadataType = algosdk.ABIType.from("(byte[],byte[],uint64,(byte[2],byte[])[])");
    const decoded = coreMetadataType.decode(new Uint8Array(logs[0]))
    const assetMetadata = {
        description: bytesToString(decoded[0]),
        imageIcon: bytesToString(decoded[1]),
        lastUpdated: decoded[2],
        fields: decoded[3].map((field) => ({
            label: Number(bytesToBigInt(field[0], 2)),
            value: bytesToString(field[1]),
        })),
    };
    console.log("Description:", assetMetadata.description);

    // 2. Decode Wallet Labels
    const walletLabelsType = algosdk.ABIType.from("(address,byte,byte[])[]");
    const decodedWalletLabels = walletLabelsType.decode(new Uint8Array(logs[1]))
    const walletLabels = decodedWalletLabels.map((label) => ({
            address: label[0],
            type: label[1],
            description: bytesToString(label[2]),
        }));
    console.log("Wallet Labels:", walletLabels);

    // 3. Decode Circulating Supply (arc62CirculatingSupply)
    const circulatingSupplyType = algosdk.ABIType.from("uint64");
    const decodedCirculatingSupply = circulatingSupplyType.decode(new Uint8Array(logs[2]))
    console.log("Circulating Supply:", decodedCirculatingSupply);
}

getAssetMetadata(12345678); // The ID of the ASA you want to query
```

### Writing Metadata (State-Changing Calls)

To modify an asset's metadata, the sender must be one of the authorized **Asset Metadata Managers**. These calls must be executed as a standard transaction.

The contract uses boxes to store data. When calling a method that modifies data, you must provide the correct box references. Box names are derived from the asset ID.

**Example: Setting an asset's description**

```javascript
async function setDescription(assetId, newDescription) {
    const atc = new algosdk.AtomicTransactionComposer();
    const suggestedParams = await algodClient.getTransactionParams().do();

    // The contract uses boxes to store metadata. Box names are derived from the asset ID.
    // 'm' for metadata, 'a' for managers, 'w' for walletLabels.
    const metadataBoxName = new Uint8Array(bigIntToBytes(assetId, 8));
    const managersBoxName = new Uint8Array([...stringToBytes("m"), ...bigIntToBytes(assetId, 8)]);
    const walletLabelsBoxName = new Uint8Array([...stringToBytes("w"), ...bigIntToBytes(assetId, 8)]);

    atc.addMethodCall({
        appID: ASA_METADATA_MANAGER_APP_ID,
        method: contract.getMethodByName("set_description"),
        methodArgs: [assetId, stringToBytes(newDescription)],
        boxes: [
            { appIndex: 0, name: metadataBoxName },
            { appIndex: 0, name: managersBoxName },
            { appIndex: 0, name: walletLabelsBoxName },
        ],
        sender: sender.addr,
        signer: sender.signer,
        suggestedParams,
    });
    
    atc.addPayment({
        sender: sender.addr,
        signer: sender.signer,
        receiver: algosdk.getApplicationAddress(ASA_METADATA_MANAGER_APP_ID),
        amount: 100000, // MBR For Boxes (If required)
        suggestedParams: suggestedParams,
    })

    const result = await atc.execute(algodClient, 3);
    console.log("Transaction confirmed in round:", result.confirmedRound);
}

setDescription(12345678, "This is the new official description.");
```

For more detailed information on all methods, data structures, and error codes, please refer to the **API Reference** sections. 
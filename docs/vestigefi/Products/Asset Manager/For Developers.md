---
sidebar_position: 3
title: Developer Guide
---

# For Developers (Developer Guide)

This guide provides the technical details needed to interact with the AsaMetadataManager smart contract.

### Contract Information

*   **MainNet**
    *   **Network**: Algorand MainNet
    *   **Application ID**: `3091009830`
    *   **Application Address**: `423QFKHXTUXHVCIX4Z35OKT7PPFS57S3SOGKPMXZJMPC2BREYADPJ6TQ4M`
*   **TestNet**
    *   **Application ID**: `742667466`
    *   **Application Address**: `SJ42LPEZX6ZL3NQA37MERRAORFTJEHRZXCZI273HWU4Y3E4TRLHWDPZNSE`
*   **ABI Specification**: You can find the full ARC-56 ABI JSON file [here](https://github.com/vestigefi/asset-meta-arc/blob/contract-cleanup/artifacts/AsaMetadataManager.arc56.json).

### Setting Up Your Environment

You will need an Algorand SDK to interact with the contract. The following examples use the official Algorand JavaScript SDK.

First, instantiate an `Algodv2` client and an `ApplicationClient` from the `@algorandfoundation/algokit-utils` library.

```javascript
import { ApplicationClient } from "@algorandfoundation/algokit-utils";
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", "");

const appClient = new ApplicationClient(
  {
    app: YOUR_APP_ID, // Or the full app spec
    sender: { signer: your_signer, addr: YOUR_ADDRESS },
    resolveBy: "id",
  },
  algodClient
);
```

### Reading Metadata (Read-Only Calls)

The most common use case is reading metadata. The contract provides highly flexible getter methods.

**Example: Fetching core metadata and wallet labels for an asset**

The `get_asset_metadata` method allows you to fetch a custom combination of data in a single call. This is the most efficient way to query information.

```javascript
const assetId = 12345678; // The ID of the ASA you want to query

const response = await appClient.call({
    method: "get_asset_metadata",
    methodArgs: [
        assetId,
        false, // include_asset_full
        true,  // include_core_metadata
        true,  // include_wallet_labels
        false, // include_managers
        true,  // include_circulating_supply
        false, // include_wallet_labels_balances
    ],
});

// The return value will be a tuple containing the requested data
const [coreMetadata, walletLabels, circulatingSupply] = response.returnValue;

console.log("Description:", coreMetadata.description);
console.log("Wallet Labels:", walletLabels);
console.log("Circulating Supply:", circulatingSupply);
```

### Writing Metadata (State-Changing Calls)

To modify an asset's metadata, the sender must be one of the authorized **Asset Metadata Managers**.

**Example: Setting an asset's description**

```javascript
const assetId = 12345678;
const newDescription = "This is the official description for our asset.";

await appClient.call({
    method: "set_description",
    methodArgs: [
        {
            txn: algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
                from: YOUR_ADDRESS,
                to: YOUR_ADDRESS,
                assetIndex: assetId,
                amount: 0,
                suggestedParams: await algodClient.getTransactionParams().do(),
            }),
            signer: your_signer
        },
        newDescription
    ],
});
```

For more detailed information on all methods, data structures, and error codes, please refer to the **API Reference** sections. 
---
sidebar_position: 5
---

# Standards Compliance

The AsaMetadataManager contract is designed to be compatible with several existing and emerging Algorand Request for Comments (ARC) standards. This ensures interoperability, discoverability, and a consistent developer experience across the ecosystem.

### [ARC-22](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0022.md): Read-Only Method Discoverability

This standard provides a convention for read-only methods that can be called without submitting a state-changing transaction. All of the contract's `get_*` methods are decorated as read-only, allowing any client to query them easily and efficiently without needing a signer.

### [ARC-28](https://github.com/algorandfoundation/ARCs/blob/main/ARCs/arc-0028.md): Application Events

ARC-28 specifies a format for application events, enabling off-chain tools to reliably index and interpret on-chain activity. The Asset Manager emits a specific event for every change made to an asset's metadata, creating a transparent, machine-readable history of all updates.

Learn more about the Events [here](./API%20Reference/Events.md).

### [ARC-56](https://github.com/algorandfoundation/ARCs/pull/198): ABI JSON Format

This draft standard defines a JSON format for Application Binary Interface (ABI) specifications. The contract's ABI is provided in this format, making it easy for developer tools and SDKs to generate typed clients and parse method calls.

You can find the ABI for the Asset Manager [here](/abi/AsaMetadataManager.arc56.json).

### [ARC-62](https://github.com/algorandfoundation/ARCs/pull/214): Circulating Supply Calculation

This draft standard proposes a unified method for calculating an asset's circulating supply. The Asset Manager implements the `arc62_get_circulating_supply` method, which calculates the supply by subtracting the balances of labeled wallets (e.g., team, treasury) + reserve supply from the total supply. This provides a consistent and verifiable circulating supply figure for dApps and explorers.

### [ARC-65](https://github.com/algorandfoundation/ARCs/pull/261): Standardized Contract-to-Client Error Messaging

This draft standard defines a convention for returning clear, specific error messages from a smart contract. When a call fails, the Asset Manager logs an error code (e.g., `"ERR:004:MAX"`) that maps to a human-readable message, helping developers debug issues quickly. 

Learn more about the Error Codes [here](./API%20Reference/Error%20Codes.md).
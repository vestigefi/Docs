---
sidebar_position: 1
---

# ABI Methods

This page provides a detailed reference for all the methods in the `AsaMetadataManager` smart contract.

The methods are divided into three categories:
- **Write Methods:** These change the state of the contract.
- **Read-Only Methods:** These are for querying data and do not change state.
- **Log-Based Read-Only Methods:** These methods return data via transaction logs to overcome the 4KB AVM return limit.

A brief overview of the data structures used in these methods can be found in the [Data Structures](./Data%20Structures.md) page.

---
## Write Methods

These methods alter the contract's state and require the sender to be an authorized metadata manager for the specified asset. An event is emitted for every successful state change.

### `update_manager`
Updates the contract's global manager. Only callable by the current contract manager.
*   **`new_manager`** (`address`): The address of the new global manager.

### `add_asset_metadata_manager`
Adds a new address to the list of authorized managers for a specific asset.
*   If this is the first time a manager is being added for an asset, the initial list of managers will be populated with the asset's creator, manager, reserve, and the contract's global manager.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`new_manager`** (`address`): The address to add as a manager.

### `remove_asset_metadata_manager`
Removes an address from the list of authorized managers. The last manager for an asset cannot be removed.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`manager`** (`address`): The address to remove.

### `set_description`
Sets or updates the description for an asset.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`description`** (`byte[]`): The description text (max 240 bytes).

### `set_image_icon`
Sets or updates the image icon URL for an asset.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`image_icon`** (`byte[]`): The URL of the icon (max 96 bytes).

### `manage_wallet_label`
Adds, updates, or removes a wallet label for an asset. The contract supports up to 20 wallet labels per asset.

*   **`asset`** (`asset`): The ASA this operation is for.
*   **`wallet_label`** (`(address,byte,byte[])`): The `WalletLabel` struct, which contains:
    *   `address` (`address`): The wallet address to label.
    *   `type` (`byte`): An enumerated type (1-255), e.g., 1=Burn, 2=Team.
    *   `description` (`byte[]`): A description for the label (max 60 bytes).

**Usage:**
*   To **add** a new label, provide the `WalletLabel` struct with a new, un-labeled address.
*   To **update** an existing label, provide the `WalletLabel` with an existing address and the new `type` and/or `description`.
*   To **remove** an existing label, provide the `WalletLabel` with the address to remove, a `type` of `0`, and a `description` that is an empty byte array of size 60 (`bytes(60)`).

### `manage_field`
Adds, updates, or removes a custom field (e.g., social media links) for an asset. The contract supports up to 15 custom fields per asset.

*   **`asset`** (`asset`): The ASA this operation is for.
*   **`field`** (`(byte[2],byte[])`): The `Field` struct, which contains:
    *   `label` (`byte[2]`): An enumerated type (1-65535), e.g., 1=Twitter, 2=Telegram.
    *   `value` (`byte[]`): The URL or custom value for the field (max 96 bytes).

**Usage:**
*   To **add** a new field, provide the `Field` struct with a new, unused `label`.
*   To **update** an existing field, provide the `Field` with an existing `label` and the new `value`.
*   To **remove** an existing field, provide the `Field` with the `label` to remove and a `value` that is an empty byte array of size 96 (`bytes(96)`).

### `gas`
A utility method to increase the opcode budget for complex operations. This method can be called in a group transaction with other methods to ensure they have enough execution resources.

---

## Read-Only Methods

These methods are for querying data and do not change state. They return data directly.

### `get_asset_core_metadata`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(byte[],byte[],uint64,(byte[2],byte[])[])` (The `AssetMetadata` struct).

### `get_asset_image_icon`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `byte[]` (The image icon URL).

### `get_asset_description`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `byte[]` (The description).

### `get_asset_wallet_labels`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(address,byte,byte[])[]` (Array of `WalletLabel` structs).

### `get_asset_fields`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(byte[2],byte[])[]` (Array of `Field` structs).

### `get_asset_last_updated`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `uint64` (The Unix timestamp of the last update).

### `get_asset_metadata_managers`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `address[]` (Array of manager addresses).

### `get_manager`
*   **Returns**: `address` (The global contract manager).

### `arc62_get_circulating_supply`
Calculates circulating supply based on the asset's total supply minus the balance of the reserve address and all labeled wallets.
*   **`asset_id`** (`uint64`): The ID of the ASA.
*   **Returns**: `uint64` (The circulating supply).

---

## Log-Based Read-Only Methods

To overcome the AVM's 4KB return limit, these read-only methods use transaction logs to output data. A client calling these methods must capture and decode the ABI-encoded logs to reconstruct the data. If a requested piece of data does not exist, an empty log is emitted instead of data/error.

### `get_asset_metadata`
A flexible bulk getter for a single asset. It returns data via logs based on the boolean flags provided.
*   **`asset_id`** (`uint64`): The ASA to query.
*   **`include_asset_full`** (`bool`): If true, logs the asset's full on-chain parameters (`AssetFull` struct).
*   **`include_core_metadata`** (`bool`): If true, logs the core `AssetMetadata` struct.
*   **`include_wallet_labels`** (`bool`): If true, logs an array of `WalletLabel` or `WalletLabelWithBalance` structs.
*   **`include_managers`** (`bool`): If true, logs an array of manager addresses.
*   **`include_circulating_supply`** (`bool`): If true, logs the calculated circulating supply (`uint64`).
*   **`include_wallet_labels_balances`** (`bool`): If true and `include_wallet_labels` is also true, logs an array of `WalletLabelWithBalance` structs instead of `WalletLabel` structs. This flag modifies the output of `include_wallet_labels`.
*   **Returns**: `None`. Data is returned in logs.

### `get_asset_metadata_bulk`
A flexible bulk getter for multiple assets. It behaves like `get_asset_metadata` but iterates over an array of assets, logging the requested data for each one sequentially.
*   **`assets`** (`uint64[]`): An array of ASA IDs.
*   (Same boolean flags as `get_asset_metadata`)
*   **Returns**: `None`. Data is returned in logs.

### `get_asset_holding`
Retrieves the balance of a specific asset for a single address.
*   **`asset_id`** (`uint64`): The ASA to query.
*   **`address`** (`address`): The account address.
*   **Returns**: `None`. The balance (`uint64`) is returned in a log.

### `get_asset_holding_bulk`
Retrieves the balance of a specific asset for multiple addresses.
*   **`asset_id`** (`uint64`): The ASA to query.
*   **`address`** (`address[]`): An array of account addresses.
*   **Returns**: `None`. A sequence of balances (`uint64`) is returned in logs, one for each address. 
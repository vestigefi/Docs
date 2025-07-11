---
sidebar_position: 1
---

# ABI Methods

This page provides a detailed reference for all the methods in the AsaMetadataManager smart contract.

## Write Methods

These methods change the state of the contract and require the sender to be an authorized manager for the asset.

### `update_manager`
Updates the contract's global manager. Only callable by the current contract manager.
*   **`new_manager`** (`address`): The address of the new manager.

### `add_asset_metadata_manager`
Adds a new address to the list of authorized managers for a specific asset.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`new_manager`** (`address`): The address to add as a manager.

### `remove_asset_metadata_manager`
Removes an address from the list of authorized managers.
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
Adds, updates, or removes a wallet label for an asset.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`wallet_label`** (`(address,byte,byte[])`): The WalletLabel struct.
    *   To **add**, provide a new address.
    *   To **update**, provide an existing address with new data.
    *   To **remove**, provide an existing address with a `type` of 0.

### `manage_field`
Adds, updates, or removes a custom field for an asset.
*   **`asset`** (`asset`): The ASA this operation is for.
*   **`field`** (`(byte[2],byte[])`): The Field struct.
    *   To **add**, provide a new label.
    *   To **update**, provide an existing label with a new value.
    *   To **remove**, provide an existing label with an empty `value`.

---

## Read-Only Methods

These methods are for querying data and do not change state.

### `get_asset_core_metadata`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(byte[],byte[],uint64,(byte[2],byte[])[])` (AssetMetadata struct).

### `get_asset_image_icon`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `byte[]` (The image icon URL).

### `get_asset_description`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `byte[]` (The description).

### `get_asset_wallet_labels`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(address,byte,byte[])[]` (Array of WalletLabel structs).

### `get_asset_fields`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `(byte[2],byte[])[]` (Array of Field structs).

### `get_asset_last_updated`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `uint64` (The timestamp of the last update).

### `get_asset_metadata_managers`
*   **`asset`** (`asset`): The ASA to query.
*   **Returns**: `address[]` (Array of manager addresses).

### `get_manager`
*   **Returns**: `address` (The global contract manager).

### `arc62_get_circulating_supply`
Calculates circulating supply based on labeled wallets.
*   **`asset_id`** (`uint64`): The ID of the ASA.
*   **Returns**: `uint64` (The circulating supply).

### `get_asset_metadata`
A flexible bulk getter for a single asset.
*   **`asset_id`** (`uint64`): The ASA to query.
*   **`include_asset_full`** (`bool`)
*   **`include_core_metadata`** (`bool`)
*   **`include_wallet_labels`** (`bool`)
*   **`include_managers`** (`bool`)
*   **`include_circulating_supply`** (`bool`)
*   **`include_wallet_labels_balances`** (`bool`)
*   **Returns**: `(string,string,string,uint64,uint8,address,address,address,address,address,bool,byte[],uint64),(byte[],byte[],uint64,(byte[2],byte[])[]),(address,byte,byte[],uint64)[],address[],uint64` (A tuple containing the requested data).

### `get_asset_metadata_bulk`
A flexible bulk getter for multiple assets.
*   **`assets`** (`uint64[]`): An array of ASA IDs.
*   (Same boolean flags as `get_asset_metadata`)
*   **Returns**: See ABI spec for the complex tuple structure. 
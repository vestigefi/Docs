---
sidebar_position: 2
---

# Data Structures

The AsaMetadataManager contract uses several custom structs to organize data.

### `AssetMetadata`
This struct holds the core metadata for an asset.
*   **`description`** (`byte[]`): The asset's description (max 240 bytes).
*   **`image_icon`** (`byte[]`): A URL for the asset's icon (max 96 bytes).
*   **`last_updated`** (`uint64`): The Unix timestamp of the last update.
*   **`fields`** (`Field[]`): A dynamic array of `Field` structs.

### `WalletLabel`
This struct is used to label a specific wallet address.
*   **`address`** (`address`): The Algorand address being labeled.
*   **`type`** (`byte`): An enumerated identifier for the wallet type (e.g., 1 for "Team").
*   **`description`** (`byte[]`): A short description for the label (max 60 bytes).

### `WalletLabelWithBalance`
This is a read-only struct that includes the balance of a labeled wallet.
*   **`address`** (`address`)
*   **`type`** (`byte`)
*   **`description`** (`byte[]`)
*   **`balance`** (`uint64`): The current balance of the address for the given asset.

### `Field`
This struct represents a single custom field, typically a social link.
*   **`label`** (`byte[2]`): An enumerated identifier for the field (e.g., 1 for "Website").
*   **`value`** (`byte[]`): The value of the field, such as a URL (max 96 bytes).

### `AssetFull`
This is a read-only struct that aggregates a full profile of an ASA, combining on-chain asset parameters with data from the Asset Manager.
*   **`name`** (`string`)
*   **`unit_name`** (`string`)
*   **`url`** (`string`)
*   **`total`** (`uint64`)
*   **`decimals`** (`uint8`)
*   **`creator`** (`address`)
*   **`manager`** (`address`)
*   **`freeze`** (`address`)
*   **`clawback`** (`address`)
*   **`reserve`** (`address`)
*   **`default_frozen`** (`bool`)
*   **`metadata_hash`** (`byte[]`)
*   **`reserve_balance`** (`uint64`) 
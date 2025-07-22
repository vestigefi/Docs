---
sidebar_position: 3
---

# Events

The contract emits events for all state changes, compliant with the ARC-28 standard. This creates a transparent and auditable log of all metadata updates.

### Manager Events
*   **`add_asset_metadata_manager_event`**
    *   `asset_id` (uint64)
    *   `manager` (address)
*   **`remove_asset_metadata_manager_event`**
    *   `asset_id` (uint64)
    *   `manager` (address)

### Metadata Events
*   **`set_description_event`**
    *   `asset_id` (uint64)
    *   `description` (byte[])
*   **`set_image_icon_event`**
    *   `asset_id` (uint64)
    *   `image_icon` (byte[])

### Wallet Label Events
*   **`add_wallet_label_event`**
    *   `asset_id` (uint64)
    *   `wallet_label` (WalletLabel)
*   **`update_wallet_label_event`**
    *   `asset_id` (uint64)
    *   `wallet_label` (WalletLabel)
*   **`remove_wallet_label_event`**
    *   `asset_id` (uint64)
    *   `wallet_label` (WalletLabel)

### Field Events
*   **`add_field_event`**
    *   `asset_id` (uint64)
    *   `social` (Field)
*   **`update_field_event`**
    *   `asset_id` (uint64)
    *   `social` (Field)
*   **`remove_field_event`**
    *   `asset_id` (uint64)
    *   `social` (Field) 
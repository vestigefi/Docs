---
sidebar_position: 4
---

# Error Codes

The contract uses ARC-65 to provide standardized error messages. If a call fails, the contract will log a specific error code that you can find in the transaction's `app-logs`.

### Manager Errors
*   **`ERR:001:UNAUTH`**: You are not authorized to update app manager.
*   **`ERR:002:UNAUTH`**: Sender is not authorized to add manager for the first time (must be app manager, asset manager, reserve, or creator).
*   **`ERR:003:INVALID`**: Invalid manager address provided (must not be the zero address).
*   **`ERR:004:MAX`**: Maximum number of managers reached (10).
*   **`ERR:005:UNAUTH`**: Sender is not authorized to add manager (must be in the existing managers array).
*   **`ERR:006:EXISTS`**: Manager already exists.
*   **`ERR:007:NOEXIST`**: Asset metadata managers do not exist for this asset yet.
*   **`ERR:008:INVALID`**: Invalid manager address provided (must not be the zero address).
*   **`ERR:009:MIN`**: Cannot remove the last manager.
*   **`ERR:010:UNAUTH`**: Sender is not authorized to remove a manager.
*   **`ERR:011:NOEXIST`**: Manager does not exist to remove.

### General Permission Errors
*   **`ERR:012:NOEXIST`**: Asset metadata managers do not exist to perform this operation.
*   **`ERR:013:UNAUTH`**: Sender is not authorized to perform this operation (must be in the existing managers array).

### Metadata Validation Errors
*   **`ERR:014:MAXSIZE`**: Description is too long (max 240 bytes).
*   **`ERR:015:MAXSIZE`**: Image icon is too large (max 96 bytes).

### Wallet Label Validation Errors
*   **`ERR:016:INVALID`**: Invalid wallet label provided - address must not be the zero address.
*   **`ERR:017:INVALID`**: Invalid wallet label provided - type must not be 0.
*   **`ERR:018:MAXSIZE`**: Wallet label description is too long (max 60 bytes).
*   **`ERR:019:INVALID`**: Invalid wallet label provided - description must not be all zero bytes.
*   **`ERR:020:EXISTS`**: Wallet label already exists.
*   **`ERR:021:MAX`**: Maximum number of wallet labels reached (20).

### Field Validation Errors
*   **`ERR:022:INVALID`**: Invalid field provided - label must not be 0.
*   **`ERR:023:MAXSIZE`**: Field value is too long (max 96 bytes).
*   **`ERR:024:INVALID`**: Invalid field provided - value must not be all zero bytes.
*   **`ERR:025:EXISTS`**: Field already exists.
*   **`ERR:026:MAX`**: Maximum number of fields reached (15).

### Getter Errors
These errors indicate that the requested data has not been set yet.
*   **`ERR:027:NOEXIST`**: Asset Core Metadata does not exist.
*   **`ERR:028:NOEXIST`**: Asset Image Icon does not exist.
*   **`ERR:029:NOEXIST`**: Asset Description does not exist.
*   **`ERR:030:NOEXIST`**: Asset Wallet Labels do not exist.
*   **`ERR:031:NOEXIST`**: Asset Fields do not exist.
*   **`ERR:032:NOEXIST`**: Asset Last Updated does not exist.
*   **`ERR:033:NOEXIST`**: Asset Metadata Managers do not exist. 
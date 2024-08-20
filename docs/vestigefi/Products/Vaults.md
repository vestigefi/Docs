---
coverY: 0
---

# Vault

**What is Vault?** Vault is a protocol built by Vestige that allows the creation of time-locked escrow accounts on the Algorand blockchain. The main purpose of the protocol is to allow project managers to set up these vaults, that are verifiable on-chain, as evidence that a percentage of their tokens or liquidity is being held on an escrow account and thus:&#x20;

- **Can not be “dumped” -** Meaning market-sold without notice on unsuspecting users or the liquidity, This brings an extra layer of security, trust and transparency into the Algorand DeFi space, since all this information is verifiable on chain and can be viewed by anyone.

_**OR**_&#x20;

- **Can not be “rugged” -** Meaning removed without notice. With this, users can have more trust by verifying the details of the locked tokens at any time.

The Vault can also work as a token vesting mechanism, by which teams can give core-contributors agreed upon tokens to be released over a period of time and quantity to avoid potential price crashes, and panic from these.

## **How it Works**&#x20;

The Vault contains 3 basic stages (Creation, Waiting and Claim). These stages allow for the user to set the type of vault, expiration date(s) and who will be able to claim once the contract has completed. Inside of these stages, the vault works through two smart contracts working in tandem. One we internally refer to as the “**Manager**” contract and the other as the “**Vault**” contract.&#x20;

- The **Manager** contract is in charge of setting up the fee structure as well as keeping track of all the launched contracts in an easily queryable format, so that any user can verify what vaults are live.
- The **Vault** contract is in charge of executing the logic of the smart contract, that is keeping the funds on the escrow account and only releasing them when certain conditions are met.&#x20;

### **Creation Stage**

In this stage the user sets up the vault they want to deploy. The user has a choice of four different types of vaults:&#x20;

- **Time Capsule:** The vault will release the full amount of tokens once the specified period has passed.&#x20;
- **Interval**: This vault will unlock tokens in evenly spaced intervals based on the interval frequency and expiration.
- **Halving:** The vault will release half of the tokens held every time-step, the number of time-steps are set at the start by the vault deployer, with the final time-step releasing the same amount of tokens as the second-to-final.
- **Burn:** The vault will never release any tokens resulting in the tokens no longer being useable.

### Waiting Stage

In this stage, the vault locks the tokens based on the vault type and expiration date. You can access the vault directly to see when your claim option will be available which will be indicated by the countdown timer. Users can see or share a link to the vault, but there are no other actions available at this stage.

### Claiming Stage

&#x20;In this stage the vault returns all of the tokens it has left to the deployer or the assigned recipient. The user can then claim the tokens directly by initiating the signing process via the **Claim** button. &#x20;

Once "Claimed" the user will see an **All Claimed** button indicating the process is complete.

Note: To avoid any unexpected behaviour users should **NOT** airdrop tokens into vaults but instead launch new ones. Airdroping could result in miss-reported data or loss of tokens.

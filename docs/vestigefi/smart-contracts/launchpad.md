# Launchpad

**What is Launchpad?** Launchpad is a protocol built by Vestige that allows the creation of IDOs (Initial DAO Offerings) in a decentralised manner on the Algorand blockchain. The main purpose of the protocol is to allow DAO managers to raise capital in the form of ALGOs in exchange for tokens, in a decentralised on-chain manner and without going through intermediares.

## How it Works

The Launchpad protocol consists of two smart contracts that work in tandem. One we internally refer to as the “Manager” contract and the other as the “Launchpad” contract.

- The **Manager** contract is in charge of setting up the fee structure as well as keeping track of all the launched Launchpad contracts in an easily query-able format, so that any user can verify active launches or previous ones.
- The **Launchpad** contract is the instance of a Launchpad and it can have four possible stages:
  - Creation
  - Funding Stage
  - End Funding Stage
  - Claiming Stage

## Creation Stage

In this stage the “**Token Offerer**” sets up the parameters for the Launchpad they wish to deploy. The **Token Offerer** can set the token they wish to offer, the amount they wish to offer, the minimum amount of **ALGO** they wish to receive, the end date of their offer and the maximum amount of **ALGO** they wish to receive. As well as whether they want to pay the launch fee in **ALGOs** or in **VEST**.

\
The **Token Offerer** then pays the offered tokens, a percentage fee into the contract (THIS FEE WILL BE REIMBURSED IF FUNDING ISN’T SECURED) and a lump fee in either **VEST** or **ALGO** (THIS FEE **WILL NOT** BE REIMBURSED).

_\*We recommend the Token Offerer launch a few Launchpads in the TestNet to familiarize themselves with the process._

## Funding Stage

In the funding stage the **Token Offerer** can:

- **Cancel the Order**: This action can ONLY be taken if the minimum amount of **ALGO** has **NOT** been raised and the time deadline has **NOT** been reached yet. If this action is taken then we enter the Claiming Stage (see below)

In the funding stage individual **Users** (ie, anyone) can:

- **Place an offer:** By taking this action, users commit a certain amount of **ALGOs** to receive the token offered. A user **CAN’T OFFER** more than what is set as the maximum amount the Token Offerer wants to receive. So for example, if the Token Offerer wishes to receive a maximum of 100 **ALGOs** and they have already raised 80 **ALGOs** an individual user won’t be able to contribute more than 20 **ALGOs**.

  _\*Due to the nature of blockchains, we always recommend individual users to commit **AT LEAST 1 ALGO** to the fund raising to avoid any potential “truncation” (see **FAQ** below)._

- **End the funding round:** By taking this action the contract moves on to its next stage (Claiming Fase). This action can **ONLY** be taken **IF** the time deadline or the maximum funding amount have been reached.

## Claiming Stage

The **claiming stage** has two potential outcomes:

- **Funding Secured**: This outcome is achieved if the raised amount is larger or equal to the minimum amount sought after by the Token Offerer and the End Round action has been triggered. If reached:
  - **Users** can proceed to claim the percentage amount of tokens they are entitled to based on their contribution
  - The **Token Offerer** can proceed to claim the amount of **ALGO** they raised from the token offering
  - The **Protocol** can claim the fees in the form of the token offered and **VEST** or **ALGO**
- **Funding NOT Secured**: This outcome is achieved if the raised amount is **LESS THAN** the minimum amount sought after by the **Token Offerer** and the **End Round** action has been triggered. If reached:
  - Users can proceed to claim back the **ALGOs** they contributed to the fundraise
  - The **Token Offerer** can proceed to claim the tokens offered plus the fee.
  - The **Protocol** can claim the fees in **VEST** or **ALGO**

After the claiming phase is reached if all tokens actions have been taken and all tokens have been claimed the application will proceed to “end” and will be “deleted” from the chain.

\
**FAQ**

---

- **What do you mean by “truncation”?**

The way the amount of tokens a user is entitled to after a funding round is succesful is by doing a “wide-ratio” calculation. This means that when dealing with Atomic Units (so for example, in the case of **ALGO** dealing with .000001 **ALGO**) there is a small chance that a users contribution is “too small” to “receive” any tokens. In this case the users’ contribution is essentially lost. We limit this on our UI by making sure minimum contributions are set to 1000000 micro-**ALGO** (ie 1 **ALGO**) but as a decentralised protocol, anyone can interact with it and can thus contribute as much as they want through other methods (either employing an SDK or interacting through the ABI). This is not something the average user should worry about, but it is something to keep in mind.

To assure a minimum amount of tokens received individual users should contribute at the max amount raised “price”, this can easily be calculated by grabbing the amount of tokens offered and dividing it by the max amount sought after. This should give users a maximum possible unit price.

- **Is it legal to launch or participate in an IDO?**

It is beyond the scope of the team and project to determine whether individual users can participate or interact with the protocol. As a permissionless and decentralised system we have no control as to who can or can’t participate, and it is up to the user to verify whether their local jurisdiction allows them to. Please refer to our Terms and Conditions.

- **Are the projects launched here associated with or vetted by Vestige?**

No! Not only are the projects launched through this service **NOT** associated with Vestige, they’re also not vetted by us **AND MAY NOT EVEN BE RELATED TO THE UNDERLYING TOKEN**. Launchpad is a decentralised and permisionless protocol, due to its design the Vestige team has no control over who interacts with it. The only aspect we can control is the fee oracle in the manager contract, other than that what we provide is a simply UI to interact with the contracts on the blockchain.

- **How can I be sure that the project launched isn’t malicious or a “rug”?**

You can’t. You should always do your own research, there is no guarantees whatsoever that the advertised project will deliver on its stated roadmap, nor are there any guarantees that the token offered has any intrinsic value or utility, there isn’t even a guarantee that the **Token Offerer** is associated whatsoever with the project behind the token. It is up to individual users to do their own research and reach their own conclusions.\

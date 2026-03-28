import { DocContent } from "@/components/docs/DocContent";
import { EndpointCard } from "@/components/docs/EndpointCard";
import { Callout } from "@/components/docs/Callout";

export default function ApiReferencePage() {
  return (
    <DocContent>
      <h1>API Reference</h1>
      <p>
        The Trustless Work API is a NestJS server that builds unsigned Solana transactions for client-side signing. All endpoints follow the pattern: send payload → receive unsigned TX → sign with wallet → send signed TX.
      </p>

      <Callout type="info" title="Base URL">
        <p>Development: <code>http://localhost:3000</code> | All responses include an <code>unsignedTransaction</code> field (base64 encoded) unless otherwise noted.</p>
      </Callout>

      <h2>Helper</h2>

      <EndpointCard
        method="POST"
        path="/helper/send-transaction"
        description="Submit a signed transaction for broadcasting to Solana. Used after every operation that returns an unsigned TX."
        body={`{
  "signedXdr": "base64-encoded-signed-tx",
  "queueKey": "contract-id-or-key",
  "returnEscrowDataIsRequired": true
}`}
        response={`{
  "success": true,
  "message": "Transaction sent successfully",
  "data": { /* escrow data if requested */ }
}`}
      />

      <EndpointCard
        method="POST"
        path="/helper/set-trustline"
        description="Create a USDC token account (Associated Token Account) for the given wallet. Required before funding an escrow."
        body={`{
  "walletAddress": "2sRVNRnXDzMa57cPwJyVw9cWiUmrKpL2Xb83qzSyzrjC"
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Set trustline transaction built"
}`}
      />

      <h2>Deployer</h2>

      <EndpointCard
        method="POST"
        path="/deployer/single-release"
        description="Create a new single-release escrow contract on-chain. Returns unsigned TX and the contract ID (PDA address)."
        body={`{
  "signer": "wallet-address",
  "engagementId": "uuid-v4",
  "title": "Q1 2026 Cross-Border Invoice",
  "description": "Payment for services",
  "approver": "wallet-address",
  "serviceProvider": "wallet-address",
  "platformAddress": "wallet-address",
  "amount": "5",
  "platformFee": "0.1",
  "milestones": [{ "description": "Full delivery", "status": "pending" }],
  "releaseSigner": "wallet-address",
  "disputeResolver": "wallet-address",
  "trustline": "USDC-mint-address",
  "trustlineDecimals": 6,
  "receiver": "wallet-address",
  "receiverMemo": 1
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "contract_id": "escrow-pda-address"
}`}
      />

      <h2>Escrow Operations</h2>

      <EndpointCard
        method="POST"
        path="/escrow/fund-escrow"
        description="Fund an escrow with USDC. Requires KYC verification (KycGuard)."
        body={`{
  "contractId": "escrow-pda-address",
  "signer": "wallet-address",
  "amount": "5"
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Fund escrow transaction built"
}`}
      />

      <EndpointCard
        method="POST"
        path="/escrow/change-milestone-status"
        description="Mark a milestone as completed. Only the service provider can call this."
        body={`{
  "contractId": "escrow-pda-address",
  "milestoneIndex": "0",
  "newStatus": "completed",
  "serviceProvider": "wallet-address"
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Change milestone status transaction built"
}`}
      />

      <EndpointCard
        method="POST"
        path="/escrow/change-milestone-approved-flag"
        description="Approve or reject a milestone. Only the approver can call this."
        body={`{
  "contractId": "escrow-pda-address",
  "milestoneIndex": "0",
  "newFlag": true,
  "approver": "wallet-address"
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Change milestone flag transaction built"
}`}
      />

      <EndpointCard
        method="POST"
        path="/escrow/release-funds"
        description="Release escrowed funds to the receiver. Requires all milestones approved. KYC + Travel Rule guards apply."
        body={`{
  "contractId": "escrow-pda-address",
  "releaseSigner": "wallet-address"
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Release funds transaction built"
}`}
      />

      <EndpointCard
        method="POST"
        path="/escrow/get-escrow"
        description="Fetch the current on-chain state of an escrow."
        body={`{
  "signer": "wallet-address",
  "contractId": "escrow-pda-address"
}`}
        response={`{
  "engagementId": "uuid",
  "title": "...",
  "amount": "5000000",
  "balance": "5000000",
  "milestones": [...],
  "flags": { "released": false, "disputeFlag": false }
}`}
      />

      <h2>Compliance</h2>

      <EndpointCard
        method="POST"
        path="/compliance/verify-address"
        description="Register a KYC verification for a wallet address on the compliance registry."
        body={`{
  "signer": "authority-wallet",
  "address": "address-to-verify",
  "kycProvider": "TrustlessWork-Demo",
  "jurisdiction": "CH",
  "riskScore": 10
}`}
        response={`{
  "unsignedTransaction": "base64...",
  "message": "Verify address transaction built"
}`}
      />
    </DocContent>
  );
}

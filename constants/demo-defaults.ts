export const USDC_MINT = process.env.NEXT_PUBLIC_USDC_MINT || "319qerHwtNVK5httbu4H8uGLfTP3iz8852CHHxzSiLtJ";
export const USDC_DECIMALS = 6;
export const PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID || "8LvnKBjEobkQGsu3SkzCGTwrZaXzMZh1X4Wj5ZGcmqwW";

export const DEMO_ESCROW_DEFAULTS = {
  title: "Q1 2026 Cross-Border Invoice",
  description: "Payment for software development services - Swiss entity to international provider via USDC escrow on Solana.",
  amount: "500000",        // 0.5 USDC (6 decimals)
  platformFee: "200",      // 2% in basis points (1 BPS = 0.01%)
  displayAmount: "0.5",
  displayFee: "2%",
  milestones: [
    {
      description: "Full project delivery and acceptance",
      status: "pending",
    },
  ],
  trustlineDecimals: USDC_DECIMALS,
  receiverMemo: 1,
};

export const DEMO_KYC_DEFAULTS = {
  kycProvider: "TrustlessWork-Demo",
  jurisdiction: "CH",
  riskScore: 10,
};

export const SOLANA_EXPLORER_URL = "https://explorer.solana.com";

export function getExplorerTxUrl(signature: string): string {
  return `${SOLANA_EXPLORER_URL}/tx/${signature}?cluster=devnet`;
}

export function getExplorerAddressUrl(address: string): string {
  return `${SOLANA_EXPLORER_URL}/address/${address}?cluster=devnet`;
}

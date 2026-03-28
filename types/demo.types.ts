export type DemoStep = 1 | 2 | 3 | 4 | 5 | 6;

export interface StepConfig {
  step: DemoStep;
  title: string;
  description: string;
}

export const DEMO_STEPS: StepConfig[] = [
  { step: 1, title: "Connect Wallet", description: "Connect your Solana wallet" },
  { step: 2, title: "Setup", description: "Create token account & verify KYC" },
  { step: 3, title: "Create Escrow", description: "Deploy escrow contract on-chain" },
  { step: 4, title: "Fund Escrow", description: "Deposit USDC into escrow" },
  { step: 5, title: "Complete Work", description: "Mark milestone as completed" },
  { step: 6, title: "Release Funds", description: "Approve & release payment" },
];

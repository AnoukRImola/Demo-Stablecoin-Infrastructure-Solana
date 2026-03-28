export interface Milestone {
  description: string;
  status: string;
  approved: boolean;
}

export interface EscrowData {
  engagementId: string;
  title: string;
  description: string;
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  amount: string;
  balance: string;
  platformFee: string;
  milestones: Milestone[];
  releaseSigner: string;
  disputeResolver: string;
  trustline: string;
  receiver: string;
  flags: {
    released: boolean;
    disputeFlag: boolean;
  };
}

export interface CreateEscrowPayload {
  signer: string;
  engagementId: string;
  title: string;
  description: string;
  approver: string;
  serviceProvider: string;
  platformAddress: string;
  amount: string;
  platformFee: string;
  milestones: { description: string; status: string }[];
  releaseSigner: string;
  disputeResolver: string;
  trustline: string;
  trustlineDecimals: number;
  receiver: string;
  receiverMemo: number;
}

export interface FundEscrowPayload {
  contractId: string;
  signer: string;
  amount: string;
}

export interface ChangeMilestoneStatusPayload {
  contractId: string;
  milestoneIndex: string;
  newStatus: string;
  serviceProvider: string;
}

export interface ChangeMilestoneFlagPayload {
  contractId: string;
  milestoneIndex: string;
  newFlag: boolean;
  approver: string;
}

export interface ReleaseFundsPayload {
  contractId: string;
  releaseSigner: string;
}

export interface SendTransactionPayload {
  signedXdr: string;
  queueKey: string;
  returnEscrowDataIsRequired?: boolean;
}

export interface SetTrustlinePayload {
  walletAddress: string;
}

export interface InitializeRegistryPayload {
  signer: string;
  travelRuleThreshold: string;
}

export interface VerifyAddressPayload {
  signer: string;
  address: string;
  kycProvider: string;
  jurisdiction: string;
  riskScore: number;
}

export interface GetEscrowPayload {
  signer: string;
  contractId: string;
}

interface AxiosLikeError extends Error {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
    status?: number;
  };
  isAxiosError?: boolean;
}

const FRIENDLY_ERRORS: Record<string, string> = {
  // Funding
  "SignerInsufficientFunds": "Your wallet doesn't have enough USDC to fund this escrow. Please mint test USDC first.",
  "EscrowAlreadyFunded": "This escrow has already been funded.",
  "EscrowFullyFunded": "This escrow is already fully funded.",
  "AmountCannotBeZero": "The amount must be greater than zero.",
  "AmountToDepositGreatherThanEscrowAmount": "The deposit amount exceeds the escrow amount.",
  "NotEnoughAllowance": "Insufficient token allowance to fund this escrow.",

  // Escrow state
  "EscrowNotFunded": "This escrow hasn't been funded yet.",
  "EscrowNotInitialized": "This escrow hasn't been initialized.",
  "EscrowAlreadyInitialized": "This escrow already exists. Try with a different engagement ID.",
  "EscrowAlreadyCompleted": "This escrow has already been completed.",
  "EscrowNotCompleted": "The escrow must be completed before releasing funds.",
  "EscrowHasFunds": "Cannot modify an escrow that still has funds.",
  "EscrowNotFound": "Escrow not found. It may not exist on-chain yet.",

  // Milestones
  "NoMileStoneDefined": "No milestones defined in this escrow.",
  "InvalidMileStoneIndex": "Invalid milestone index.",
  "MilestoneApprovedCantChangeEscrowProperties": "Cannot modify the escrow — a milestone has already been approved.",
  "MilestoneAlreadyReleased": "This milestone has already been released.",
  "MilestoneNotApproved": "This milestone must be approved before it can be released.",
  "MilestoneIsDisputed": "This milestone is currently in dispute.",
  "MilestoneAlreadyDisputed": "This milestone is already in dispute.",
  "MilestoneNotDisputed": "This milestone is not in dispute.",
  "MilestoneAlreadyResolved": "This milestone has already been resolved.",
  "NotAllMilestonesSettled": "All milestones must be settled before withdrawing remaining funds.",
  "MilestoneAmountCannotBeZero": "Milestone amount must be greater than zero.",
  "TooManyMilestones": "Too many milestones — reduce the number and try again.",

  // Authorization
  "OnlySignerCanFundEscrow": "Only the escrow signer can fund it.",
  "OnlyReleaseSignerCanDistributeEarnings": "Only the release signer can distribute funds.",
  "OnlyServiceProviderChangeMilstoneStatus": "Only the service provider can update milestone status.",
  "OnlyApproverChangeMilstoneFlag": "Only the approver can approve milestones.",
  "OnlyDisputeResolverCanExecuteThisFunction": "Only the dispute resolver can perform this action.",
  "OnlyPlatformAddressExecuteThisFunction": "Only the platform address can perform this action.",
  "Unauthorized": "You are not authorized to perform this action.",
  "UnauthorizedToChangeDisputeFlag": "You are not authorized to change the dispute flag.",

  // Disputes
  "EscrowAlreadyInDispute": "This escrow is already in dispute.",
  "EscrowNotInDispute": "This escrow is not in dispute.",
  "EscrowAlreadyResolved": "This escrow dispute has already been resolved.",
  "InsufficientFundsForResolution": "Insufficient funds to resolve this dispute.",
  "NoRemainingFunds": "No remaining funds to withdraw.",

  // Compliance / KYC
  "AddressNotKycVerified": "Your wallet is not KYC verified. Please complete KYC verification first.",
  "AddressAlreadyVerified": "This wallet is already KYC verified.",
  "AddressNotVerified": "This address has not been verified.",
  "TravelRuleRequired": "Travel rule data is required for this transaction amount.",
  "ComplianceRegistryAlreadyInitialized": "The compliance registry is already initialized.",
  "OnlyComplianceAuthority": "Only the compliance authority can perform this action.",
  "EscrowComplianceAlreadySet": "Compliance settings for this escrow have already been configured.",
  "SanctionedJurisdiction": "This jurisdiction is sanctioned and cannot be used.",

  // Misc
  "PlatformFeeTooHigh": "Platform fee cannot exceed 99%.",
  "Overflow": "Calculation overflow — the amounts may be too large.",
  "Underflow": "Calculation underflow — check the amounts.",
  "ContractInsufficientFunds": "The escrow contract has insufficient funds.",
  "ContractHasInsufficientBalance": "The escrow contract has no balance to repay.",
};

function matchProgramError(message: string): string | null {
  for (const [errorName, friendly] of Object.entries(FRIENDLY_ERRORS)) {
    if (message.includes(errorName)) return friendly;
  }
  return null;
}

export function parseError(err: unknown): string {
  if (!(err instanceof Error)) return "An unexpected error occurred. Please try again.";

  const msg = err.message.toLowerCase();

  // Wallet rejection
  if (msg.includes("user rejected") || msg.includes("user denied") || msg.includes("user cancelled")) {
    return "Transaction cancelled — you declined the request in your wallet.";
  }

  // Network error
  if (msg.includes("network error") || msg.includes("econnrefused")) {
    return "Cannot reach the server. Please check your connection and try again.";
  }

  // Timeout
  if (msg.includes("timeout")) {
    return "The request timed out. Solana devnet may be congested — please try again in a moment.";
  }

  // Axios errors — extract server message and try to match program errors
  const axErr = err as AxiosLikeError;
  if (axErr.response?.data) {
    const serverMsg = axErr.response.data.message || axErr.response.data.error || "";

    // Try to match a known program error in the server message
    const friendly = matchProgramError(serverMsg);
    if (friendly) return friendly;

    if (axErr.response.status === 401) {
      return "Session expired. Please disconnect and reconnect your wallet.";
    }

    if (serverMsg) return serverMsg;
  }

  if (msg.includes("status code 401")) {
    return "Session expired. Please disconnect and reconnect your wallet.";
  }

  // Try matching program errors in the raw error message
  const friendly = matchProgramError(err.message);
  if (friendly) return friendly;

  // Generic Solana errors
  if (msg.includes("insufficient") || msg.includes("not enough")) {
    return "Insufficient balance. Make sure you have enough devnet SOL and test USDC.";
  }

  if (msg.includes("already initialized") || msg.includes("already in use")) {
    return "This account already exists. Try refreshing and starting a new escrow.";
  }

  if (msg.includes("blockhash not found") || msg.includes("blockhash")) {
    return "Transaction expired. Please try again.";
  }

  return "Something went wrong. Please try again.";
}

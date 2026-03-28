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

export function parseError(err: unknown): string {
  if (!(err instanceof Error)) return "An unexpected error occurred";

  const msg = err.message.toLowerCase();

  // Wallet rejection
  if (msg.includes("user rejected") || msg.includes("user denied") || msg.includes("user cancelled")) {
    return "Transaction rejected — please approve the transaction in your wallet to continue.";
  }

  // Network error
  if (msg.includes("network error")) {
    return "Cannot connect to the API server. Make sure it's running on localhost:3000.";
  }

  // Axios errors — extract real server message from response body
  const axErr = err as AxiosLikeError;
  if (axErr.response?.data) {
    const serverMsg = axErr.response.data.message || axErr.response.data.error;
    if (serverMsg) {
      // For 401, add helpful hint
      if (axErr.response.status === 401) {
        return `Authentication failed: ${serverMsg}. Try disconnecting and reconnecting your wallet.`;
      }
      return serverMsg;
    }
  }

  if (msg.includes("status code 401")) {
    return "Authentication failed. Try disconnecting and reconnecting your wallet.";
  }

  // Solana errors
  if (msg.includes("insufficient") || msg.includes("not enough")) {
    return "Insufficient balance. Make sure you have enough devnet SOL and USDC.";
  }

  if (msg.includes("already initialized") || msg.includes("already in use")) {
    return "This account already exists. Try running the demo again with a fresh engagement ID.";
  }

  return err.message;
}

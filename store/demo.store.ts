import { create } from "zustand";
import type { DemoStep } from "@/types/demo.types";
import type { EscrowData } from "@/types/escrow.types";
import { clearAuthToken } from "@/lib/api";

interface DemoState {
  currentStep: DemoStep;
  completedSteps: Set<DemoStep>;

  // Step results
  walletAddress: string | null;
  tokenAccountTxSig: string | null;
  kycTxSig: string | null;
  contractId: string | null;
  engagementId: string | null;
  escrowData: EscrowData | null;
  createEscrowTxSig: string | null;
  fundTxSig: string | null;
  milestoneTxSig: string | null;
  approveTxSig: string | null;
  releaseTxSig: string | null;

  // UI state
  loading: boolean;
  error: string | null;

  // Actions
  setStep: (step: DemoStep) => void;
  completeStep: (step: DemoStep) => void;
  setWalletAddress: (address: string | null) => void;
  setTokenAccountTxSig: (sig: string) => void;
  setKycTxSig: (sig: string) => void;
  setContractId: (id: string) => void;
  setEngagementId: (id: string) => void;
  setEscrowData: (data: EscrowData) => void;
  setCreateEscrowTxSig: (sig: string) => void;
  setFundTxSig: (sig: string) => void;
  setMilestoneTxSig: (sig: string) => void;
  setApproveTxSig: (sig: string) => void;
  setReleaseTxSig: (sig: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetDemo: () => void;
}

const initialState = {
  currentStep: 1 as DemoStep,
  completedSteps: new Set<DemoStep>(),
  walletAddress: null,
  tokenAccountTxSig: null,
  kycTxSig: null,
  contractId: null,
  engagementId: null,
  escrowData: null,
  createEscrowTxSig: null,
  fundTxSig: null,
  milestoneTxSig: null,
  approveTxSig: null,
  releaseTxSig: null,
  loading: false,
  error: null,
};

export const useDemoStore = create<DemoState>((set) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step, error: null }),
  completeStep: (step) =>
    set((state) => {
      const newCompleted = new Set(state.completedSteps);
      newCompleted.add(step);
      return { completedSteps: newCompleted };
    }),
  setWalletAddress: (address) => set({ walletAddress: address }),
  setTokenAccountTxSig: (sig) => set({ tokenAccountTxSig: sig }),
  setKycTxSig: (sig) => set({ kycTxSig: sig }),
  setContractId: (id) => set({ contractId: id }),
  setEngagementId: (id) => set({ engagementId: id }),
  setEscrowData: (data) => set({ escrowData: data }),
  setCreateEscrowTxSig: (sig) => set({ createEscrowTxSig: sig }),
  setFundTxSig: (sig) => set({ fundTxSig: sig }),
  setMilestoneTxSig: (sig) => set({ milestoneTxSig: sig }),
  setApproveTxSig: (sig) => set({ approveTxSig: sig }),
  setReleaseTxSig: (sig) => set({ releaseTxSig: sig }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetDemo: () => {
    clearAuthToken();
    set({ ...initialState, completedSteps: new Set() });
  },
}));

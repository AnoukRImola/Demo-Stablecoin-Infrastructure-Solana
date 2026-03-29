"use client";

import { useDemoStore } from "@/store/demo.store";
import { StepIndicator } from "./StepIndicator";
import { StepConnectWallet } from "./StepConnectWallet";
import { StepSetup } from "./StepSetup";
import { StepCreateEscrow } from "./StepCreateEscrow";
import { StepFundEscrow } from "./StepFundEscrow";
import { StepCompleteMilestone } from "./StepCompleteMilestone";
import { StepApproveRelease } from "./StepApproveRelease";
import { AdminResetRegistry } from "./AdminResetRegistry";
import { DEMO_STEPS } from "@/types/demo.types";

export function DemoWizard() {
  const { currentStep } = useDemoStore();
  const stepConfig = DEMO_STEPS.find((s) => s.step === currentStep);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-navy">Live Demo</h1>
        <p className="text-navy-light">
          Experience the full escrow lifecycle on Solana devnet. All transactions are real on-chain operations.
        </p>
      </div>

      <StepIndicator />

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-navy">
          Step {currentStep}: {stepConfig?.title}
        </h2>
        <p className="text-sm text-navy-light">{stepConfig?.description}</p>
      </div>

      <AdminResetRegistry />

      <div className="mt-6">
        {currentStep === 1 && <StepConnectWallet />}
        {currentStep === 2 && <StepSetup />}
        {currentStep === 3 && <StepCreateEscrow />}
        {currentStep === 4 && <StepFundEscrow />}
        {currentStep === 5 && <StepCompleteMilestone />}
        {currentStep === 6 && <StepApproveRelease />}
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { DEMO_STEPS, type DemoStep } from "@/types/demo.types";
import { useDemoStore } from "@/store/demo.store";

export function StepIndicator() {
  const { currentStep, completedSteps } = useDemoStore();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {DEMO_STEPS.map((step, index) => {
          const isCompleted = completedSteps.has(step.step);
          const isCurrent = currentStep === step.step;

          return (
            <div key={step.step} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isCompleted
                      ? "bg-success text-white"
                      : isCurrent
                        ? "bg-primary text-white"
                        : "bg-border text-navy-light",
                  )}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : step.step}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium",
                    isCurrent ? "text-primary" : "text-navy-light",
                  )}
                >
                  {step.title}
                </span>
              </div>
              {index < DEMO_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1",
                    isCompleted ? "bg-success" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

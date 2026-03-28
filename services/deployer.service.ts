import api from "@/lib/api";
import type { CreateEscrowPayload } from "@/types/escrow.types";

export async function createSingleReleaseEscrow(payload: CreateEscrowPayload) {
  const response = await api.post("/deployer/single-release", payload);
  return response.data;
}

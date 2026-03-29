import api from "@/lib/api";
import type { VerifyAddressPayload } from "@/types/escrow.types";

export async function getVerification(address: string) {
  const response = await api.get("/compliance/verification", { params: { address } });
  return response.data;
}

export async function verifyAddress(payload: VerifyAddressPayload) {
  const response = await api.post("/compliance/verify-address", payload);
  return response.data;
}

export async function closeRegistry(signer: string) {
  const response = await api.post("/compliance/close-registry", { signer });
  return response.data;
}

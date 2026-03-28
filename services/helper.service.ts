import api from "@/lib/api";
import type { SendTransactionPayload, SetTrustlinePayload } from "@/types/escrow.types";

export async function sendTransaction(payload: SendTransactionPayload) {
  const response = await api.post("/helper/send-transaction", payload);
  return response.data;
}

export async function setTrustline(payload: SetTrustlinePayload) {
  const response = await api.post("/helper/set-trustline", payload);
  return response.data;
}

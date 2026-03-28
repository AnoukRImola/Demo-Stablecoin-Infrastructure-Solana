import api from "@/lib/api";
import type {
  FundEscrowPayload,
  ChangeMilestoneStatusPayload,
  ChangeMilestoneFlagPayload,
  ReleaseFundsPayload,
  GetEscrowPayload,
} from "@/types/escrow.types";

export async function fundEscrow(payload: FundEscrowPayload) {
  const response = await api.post("/escrow/fund-escrow", payload);
  return response.data;
}

export async function changeMilestoneStatus(payload: ChangeMilestoneStatusPayload) {
  const response = await api.post("/escrow/change-milestone-status", payload);
  return response.data;
}

export async function changeMilestoneApprovedFlag(payload: ChangeMilestoneFlagPayload) {
  const response = await api.post("/escrow/change-milestone-approved-flag", payload);
  return response.data;
}

export async function releaseFunds(payload: ReleaseFundsPayload) {
  const response = await api.post("/escrow/release-funds", payload);
  return response.data;
}

export async function getEscrow(payload: GetEscrowPayload) {
  const response = await api.post("/escrow/get-escrow", payload);
  return response.data;
}

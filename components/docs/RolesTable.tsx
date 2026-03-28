interface Role {
  name: string;
  key: string;
  description: string;
}

const roles: Role[] = [
  {
    name: "Approver",
    key: "approver",
    description: "Entity that approves milestones and authorizes fund release. Typically the client or buyer.",
  },
  {
    name: "Service Provider",
    key: "serviceProvider",
    description: "Entity that performs the work and marks milestones as completed.",
  },
  {
    name: "Platform",
    key: "platformAddress",
    description: "Integrating platform that receives a fee for facilitating the escrow.",
  },
  {
    name: "Release Signer",
    key: "releaseSigner",
    description: "Authorized signer that triggers the actual fund distribution after approval.",
  },
  {
    name: "Dispute Resolver",
    key: "disputeResolver",
    description: "Neutral third party that resolves disputes and splits funds between parties.",
  },
  {
    name: "Receiver",
    key: "receiver",
    description: "Wallet that receives the released funds. Often the service provider's payment address.",
  },
];

export function RolesTable() {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-border-light">
            <th className="px-4 py-3 text-left font-semibold text-navy">Role</th>
            <th className="px-4 py-3 text-left font-semibold text-navy">Field</th>
            <th className="px-4 py-3 text-left font-semibold text-navy">Description</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.key} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium text-navy">{role.name}</td>
              <td className="px-4 py-3">
                <code className="rounded bg-border-light px-1.5 py-0.5 text-xs font-mono">{role.key}</code>
              </td>
              <td className="px-4 py-3 text-navy-light">{role.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

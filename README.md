# Trustless Work Demo — Stablecoin Escrow Infrastructure on Solana

Interactive demo site and documentation for **Trustless Work**, an Escrow-as-a-Service protocol built on Solana. Created for the **StableHacks 2026** hackathon (Programmable Stablecoin Payments track).

## What's Inside

- **Landing page** — Overview of the protocol and its value proposition
- **Interactive demo** — Step-by-step wizard that walks through a full escrow lifecycle (connect wallet → create escrow → fund → complete milestone → release funds) on Solana devnet
- **Documentation** — Escrow design, lifecycle, architecture, compliance, API reference, developer guide, SDK core, and React hooks

## Tech Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS 4**
- **Solana wallet-adapter** (Phantom, Solflare)
- **Zustand** for state management
- **@trustless-work/sdk-solana** for API integration

## Getting Started

```bash
# Install dependencies
bun install

# Run development server (port 3002)
bun run dev
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=8LvnKBjEobkQGsu3SkzCGTwrZaXzMZh1X4Wj5ZGcmqwW
NEXT_PUBLIC_USDC_MINT=319qerHwtNVK5httbu4H8uGLfTP3iz8852CHHxzSiLtJ
```

## Project Structure

```
app/
  page.tsx          # Landing page
  demo/             # Interactive escrow demo wizard
  docs/             # Documentation pages
    overview/
    escrow-design/
    escrow-lifecycle/
    architecture/
    solana-network/
    compliance/
    api-reference/
    developer-guide/
    sdk/            # SDK Core documentation
    sdk-react/      # React Hooks documentation
components/
  demo/             # Demo wizard step components
  docs/             # Doc components (CodeBlock, Callout, DocContent)
  layout/           # Navbar, Sidebar, Footer
  shared/           # Wallet button, Explorer link
constants/          # Navigation config
services/           # API service layer
store/              # Zustand stores
```

## Related Repositories

- [Trustless Work — Solana Smart Contract + Server + SDK](https://github.com/AnoukRImola/Solana) (fork)

## License

MIT

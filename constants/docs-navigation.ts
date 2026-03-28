export interface NavItem {
  title: string;
  href: string;
  section?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const docsNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Overview", href: "/docs/overview" },
      { title: "Why Escrows?", href: "/docs/why-escrows" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Escrow Design", href: "/docs/escrow-design" },
      { title: "Escrow Lifecycle", href: "/docs/escrow-lifecycle" },
      { title: "Architecture", href: "/docs/architecture" },
    ],
  },
  {
    title: "Platform",
    items: [
      { title: "Solana Network", href: "/docs/solana-network" },
      { title: "Compliance", href: "/docs/compliance" },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "API Reference", href: "/docs/api-reference" },
      { title: "Developer Guide", href: "/docs/developer-guide" },
    ],
  },
  {
    title: "SDK",
    items: [
      { title: "SDK Core", href: "/docs/sdk" },
      { title: "React Hooks", href: "/docs/sdk-react" },
    ],
  },
];

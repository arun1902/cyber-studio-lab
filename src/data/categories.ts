export type CategoryId =
  | "basics"
  | "privacy"
  | "ethical-hacking"
  | "tools";

export type Category = {
  id: CategoryId;
  index: string;
  title: string;
  short: string;
  description: string;
  note: string;
  href: string;
};

export const categories: Category[] = [
  {
    id: "basics",
    index: "01",
    title: "Cybersecurity Basics",
    short: "Foundations",
    description:
      "The habits that quietly decide whether an account survives a bad day: passwords, updates, authentication, and how attacks actually begin.",
    note: "Start here if the jargon still feels louder than the advice.",
    href: "/explore#basics",
  },
  {
    id: "privacy",
    index: "02",
    title: "Privacy & Protection",
    short: "Boundaries",
    description:
      "What you share, what apps collect, and how to move through public networks and social platforms without handing over the map.",
    note: "Protection is a set of boundaries, not a single switch.",
    href: "/explore#privacy",
  },
  {
    id: "ethical-hacking",
    index: "03",
    title: "Ethical Hacking",
    short: "Perspective",
    description:
      "How defenders learn to see systems the way curious attackers do — with permission, restraint, and a clear line around harm.",
    note: "Understanding a weakness is not the same as exploiting it.",
    href: "/explore#ethical-hacking",
  },
  {
    id: "tools",
    index: "04",
    title: "Digital Tools & Tricks",
    short: "Practice",
    description:
      "Password managers, browser settings, security headers, and small configurations that make careful behavior easier to keep.",
    note: "Tools should reduce friction, not add another ritual you abandon.",
    href: "/explore#tools",
  },
];

export function getCategory(id: CategoryId) {
  const category = categories.find((item) => item.id === id);
  if (!category) {
    throw new Error(`Unknown category: ${id}`);
  }
  return category;
}

export const site = {
  name: "Cyber Studio Lab",
  domain: "cyberstudiolab.com",
  url: "https://cyberstudiolab.com",
  description:
    "Cyber Studio Lab publishes cybersecurity tips, tutorials, and security awareness for people who want a safer digital mindset.",
  tagline: "Built for the curious. Designed for the digital world.",
  year: 2026,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

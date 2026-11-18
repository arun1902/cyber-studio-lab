export const site = {
  name: "CyberStudioLab",
  domain: "cyberstudiolab.com",
  url: "https://cyberstudiolab.com",
  description:
    "CyberStudioLab is a developer and cybersecurity knowledge platform: blogs, tutorials, animated videos, and tips for building better, more secure software and infrastructure.",
  tagline: "Learn. Build. Secure.",
  promise: "Learn technologies. Write better code. Understand security. Build reliable systems.",
  servicesPartner: "DevCoreBit",
  year: 2026,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blogs" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/videos", label: "Animated Videos" },
  { href: "/tips", label: "Tips & Tricks" },
  { href: "/labs", label: "Labs" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
] as const;

export type SocialPlatform =
  | "instagram"
  | "youtube"
  | "linkedin"
  | "x"
  | "github";

export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  handle: string;
  href: string;
};

export const socialLinks: SocialLink[] = [
  {
    platform: "instagram",
    label: "Instagram",
    handle: "@cyberstudiolab",
    href: "https://instagram.com/cyberstudiolab",
  },
  {
    platform: "youtube",
    label: "YouTube",
    handle: "@cyberstudiolab",
    href: "https://youtube.com/@cyberstudiolab",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "CyberStudioLab",
    href: "https://www.linkedin.com/company/cyberstudiolab",
  },
  {
    platform: "x",
    label: "X",
    handle: "@cyberstudiolab",
    href: "https://x.com/cyberstudiolab",
  },
  {
    platform: "github",
    label: "GitHub",
    handle: "cyberstudiolab",
    href: "https://github.com/cyberstudiolab",
  },
];

export type Tip = {
  id: string;
  index: string;
  title: string;
  detail: string;
  signal: string;
};

export const tips: Tip[] = [
  {
    id: "mfa",
    index: "01",
    title: "Enable two-factor authentication.",
    detail:
      "A stolen password should not be enough. Turn on an authenticator app or a hardware key for email, banking, and any account that can reset the others.",
    signal: "Stops most password-only takeovers",
  },
  {
    id: "reuse",
    index: "02",
    title: "Never reuse passwords.",
    detail:
      "One leaked database becomes a keyring when the same secret opens your mail, shopping, and work accounts. A password manager makes unique secrets practical.",
    signal: "Contains a breach to a single account",
  },
  {
    id: "phishing",
    index: "03",
    title: "Recognize phishing emails.",
    detail:
      "Urgency, a mismatched sender, and a link that does not match the brand are the usual tells. Open the service directly instead of trusting the message.",
    signal: "Interrupts the most common entry point",
  },
  {
    id: "wifi",
    index: "04",
    title: "Secure public Wi-Fi connections.",
    detail:
      "Cafe networks are shared rooms. Avoid banking on them, forget the network afterward, and prefer your phone hotspot when the session matters.",
    signal: "Reduces exposure on shared networks",
  },
  {
    id: "updates",
    index: "05",
    title: "Keep software updated.",
    detail:
      "Patches close doors that are already documented. Enable automatic updates for the operating system, browser, and the few apps you actually use.",
    signal: "Removes known, fixable weaknesses",
  },
  {
    id: "personal",
    index: "06",
    title: "Protect personal information online.",
    detail:
      "Birth dates, travel plans, and answers to security questions are reusable. Share less in public, and treat quizzes that ask for your first pet as data collection.",
    signal: "Shrinks what an impersonator can use",
  },
];

export type TerminalCommand = {
  input: string;
  output: string[];
};

export const terminalCommands: TerminalCommand[] = [
  {
    input: "cyberlab --help",
    output: [
      "Welcome to Cyber Studio Lab.",
      "Learn. Explore. Protect.",
      "",
      "This is a simulated terminal. Nothing here scans a network",
      "or runs on your machine.",
      "",
      "  tips       six habits worth keeping",
      "  mindset    why awareness beats panic",
      "  paths      where to start in the lab",
    ],
  },
  {
    input: "tips",
    output: [
      "01  Turn on two-factor authentication.",
      "02  Use a different password for every account.",
      "03  Treat urgent links as untrusted until verified.",
      "04  Be careful on public Wi-Fi.",
      "05  Install updates while they are still boring.",
      "06  Publish less personal data than you think.",
    ],
  },
  {
    input: "mindset",
    output: [
      "Security is a practice, not a product.",
      "You do not need to fear every link.",
      "You do need a habit for the accounts that matter.",
      "",
      "Curiosity first. Panic never.",
    ],
  },
  {
    input: "paths",
    output: [
      "explore     four fields inside the lab",
      "tutorials   guided setups you can finish",
      "blog        essays and field notes",
      "about       why this studio exists",
    ],
  },
];

export const terminalSuggestions = terminalCommands.map((command) => command.input);

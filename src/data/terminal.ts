export type TerminalCommand = {
  input: string;
  output: string[];
};

export const terminalCommands: TerminalCommand[] = [
  {
    input: "csl --help",
    output: [
      "CyberStudioLab — Learn. Build. Secure.",
      "",
      "Simulated terminal. Nothing here runs on your machine.",
      "",
      "  csl formats    the four ways to learn",
      "  csl topics     what we cover",
      "  csl focus      what makes this platform different",
      "  csl roadmap    what comes next",
    ],
  },
  {
    input: "csl formats",
    output: [
      "blogs        engineering knowledge and security explanations",
      "tutorials    step-by-step guides with real code and configs",
      "videos       animated breakdowns of systems and attacks",
      "tips         copy-ready commands, settings, and tools",
    ],
  },
  {
    input: "csl topics",
    output: [
      "build    programming · clean code · backend & APIs · databases · AI & LLMs · dev tools",
      "secure   appsec · ethical hacking · AI security",
      "operate  cloud · devsecops · docker & kubernetes · linux & networking",
    ],
  },
  {
    input: "csl focus",
    output: [
      "Don't just explain what a technology is.",
      "Explain how to use it correctly in real projects:",
      "",
      "  ✓ recommended values and the reasoning behind them",
      "  ✓ every important parameter explained",
      "  ✓ production mistakes and how to avoid them",
    ],
  },
  {
    input: "csl roadmap",
    output: [
      "[now]    free blogs, tutorials, videos, tips",
      "[next]   hands-on labs",
      "[later]  premium courses · corporate training · memberships",
    ],
  },
];

export const terminalSuggestions = terminalCommands.map((command) => command.input);

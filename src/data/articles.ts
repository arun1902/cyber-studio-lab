import type { CategoryId } from "@/data/categories";

export type ArticleFormat = "article" | "tutorial";

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "note"; text: string };

export type ArticleStep = {
  title: string;
  body: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategoryId;
  format: ArticleFormat;
  readingMinutes: number;
  publishedAt: string;
  featured?: boolean;
  cover: "radar" | "lattice" | "signal" | "key" | "mesh" | "orbit";
  author: string;
  tags: string[];
  level?: "Foundation" | "Practice" | "Guided";
  duration?: string;
  steps?: ArticleStep[];
  content: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "passwords-are-a-habit",
    title: "Passwords Are a Habit, Not a Product",
    excerpt:
      "The useful password is the one you never reuse and never have to remember. Everything else is theater.",
    category: "basics",
    format: "article",
    readingMinutes: 7,
    publishedAt: "2026-10-02",
    featured: true,
    cover: "key",
    author: "Cyber Studio Lab",
    tags: ["passwords", "habits", "accounts"],
    content: [
      {
        type: "p",
        text: "Most password advice still talks as if memory were the security control. It is not. A password you can recall is usually a password you have shaped into something a stranger can guess, or a password you have quietly reused because remembering twelve variations of your dog's name is miserable.",
      },
      {
        type: "h2",
        id: "what-actually-fails",
        text: "What actually fails",
      },
      {
        type: "p",
        text: "Account takeovers rarely begin with a cinematic guess. They begin with a dump from a service you forgot you used. If that password also opens your email, the rest of your digital life is one reset link away. Length matters. Uniqueness matters more.",
      },
      {
        type: "ul",
        items: [
          "Reuse turns one breach into many.",
          "Email is the master key because it receives the resets.",
          "Short secrets fall to guessing. Reused secrets fall to lists.",
          "A note in your camera roll is not a vault.",
        ],
      },
      {
        type: "h2",
        id: "the-habit",
        text: "The habit worth keeping",
      },
      {
        type: "p",
        text: "Put a password manager between you and the secret. Let it generate long, random passwords. You remember one strong passphrase for the manager, and you turn on two-factor authentication for that account before anything else. The product is optional. The habit is not: one account, one secret.",
      },
      {
        type: "quote",
        text: "If you can remember it, assume someone else can eventually reconstruct it.",
      },
      {
        type: "h2",
        id: "where-to-start",
        text: "Where to start this week",
      },
      {
        type: "p",
        text: "Change email first, then banking, then the accounts that store cards or identity documents. Leave the newsletter login for later. Security improves when the important doors are unique, not when every door is theoretically perfect and none of them are.",
      },
      {
        type: "note",
        text: "Cyber Studio Lab does not endorse a specific vendor. Pick a reputable manager, store the recovery codes somewhere offline, and tell one trusted person how to reach that backup.",
      },
    ],
  },
  {
    slug: "read-a-phishing-email",
    title: "How to Read a Phishing Email Before You Click",
    excerpt:
      "Phishing works by borrowing urgency from institutions you already trust. Slow the message down and the costume slips.",
    category: "basics",
    format: "article",
    readingMinutes: 6,
    publishedAt: "2026-09-18",
    cover: "signal",
    author: "Cyber Studio Lab",
    tags: ["phishing", "email", "awareness"],
    content: [
      {
        type: "p",
        text: "A phishing email is a costume. The logo, the tone, and the deadline are borrowed from a company you already obey. The goal is not to impress you. The goal is to move your hand before your judgment arrives.",
      },
      {
        type: "h2",
        id: "the-three-tells",
        text: "Three tells that hold up",
      },
      {
        type: "ul",
        items: [
          "Urgency that punishes a pause: locked accounts, expiring packages, legal threats.",
          "A sender name that looks right beside an address that does not.",
          "A link whose visible text and actual destination disagree.",
        ],
      },
      {
        type: "p",
        text: "Hover, on a computer, shows where a link goes. On a phone, press and hold. You are looking for the domain, not the brand word stuffed in front of it. support-paypal.example.com is not PayPal. paypal.com is.",
      },
      {
        type: "h2",
        id: "the-safer-path",
        text: "The safer path",
      },
      {
        type: "p",
        text: "Do not use the link to resolve the feeling. Open the service the way you usually do: a bookmark, the official app, or an address you typed. If something is actually wrong with the account, it will be waiting there. If it is not, the email was theater.",
      },
      {
        type: "quote",
        text: "Real institutions can survive you verifying them through a door you already trust.",
      },
      {
        type: "h2",
        id: "after-a-click",
        text: "If you already clicked",
      },
      {
        type: "p",
        text: "Close the page. If you typed a password, change it from the real site and turn on two-factor authentication. If you entered a card number, call the bank using the number on the card, not the number in the email. Tell the person who shares that account. Speed matters after a mistake. Shame does not.",
      },
    ],
  },
  {
    slug: "public-wifi-without-panic",
    title: "Public Wi-Fi Without the Panic",
    excerpt:
      "Shared networks are not haunted. They are shared. Treat them like a room where other people can watch the door.",
    category: "privacy",
    format: "article",
    readingMinutes: 6,
    publishedAt: "2026-09-04",
    cover: "mesh",
    author: "Cyber Studio Lab",
    tags: ["wifi", "privacy", "travel"],
    content: [
      {
        type: "p",
        text: "Public Wi-Fi earned a horror-story reputation that is only half useful. Modern sites encrypt their traffic. That does not make a cafe network a private office. Other people share the air, and a network named after the cafe is not always the cafe.",
      },
      {
        type: "h2",
        id: "what-is-exposed",
        text: "What is actually exposed",
      },
      {
        type: "p",
        text: "A careful site hides the contents of the page. It does not hide the fact that you visited it, and it does not protect you from a login page the network itself inserted. The practical risk is a fake portal, a lookalike network name, or an old device that still speaks an outdated protocol.",
      },
      {
        type: "h2",
        id: "a-simple-policy",
        text: "A simple policy",
      },
      {
        type: "ul",
        items: [
          "Confirm the network name with staff before you join.",
          "Skip banking and password changes on networks you do not control.",
          "Use your phone as a hotspot when the session matters.",
          "Forget the network when you leave so the laptop does not rejoin a twin later.",
          "Keep the operating system updated so old wireless bugs stay closed.",
        ],
      },
      {
        type: "quote",
        text: "Encryption protects the conversation. It does not prove you dialed the right room.",
      },
      {
        type: "note",
        text: "A VPN can help on networks you distrust. It is not a substitute for checking the network name, and it does not make every login wise.",
      },
    ],
  },
  {
    slug: "what-two-factor-stops",
    title: "What Two-Factor Authentication Actually Stops",
    excerpt:
      "A second factor is not magic. It is a second door, and it only works if the first compromise cannot open both.",
    category: "basics",
    format: "article",
    readingMinutes: 8,
    publishedAt: "2026-08-21",
    cover: "radar",
    author: "Cyber Studio Lab",
    tags: ["mfa", "accounts", "authentication"],
    content: [
      {
        type: "p",
        text: "Two-factor authentication asks for something you know and something you have. The password is the first. A code from an app, a hardware key, or a prompt on a phone you already unlocked is the second. Text messages are better than nothing and weaker than the others, because phone numbers can be moved.",
      },
      {
        type: "h2",
        id: "the-attack-it-stops",
        text: "The attack it stops",
      },
      {
        type: "p",
        text: "If someone buys your password from a leak, the second factor is the part they do not have. That is the entire point. It does not stop you from typing the password into a fake site that also asks for the code in the same minute. Phishing still needs a pause from you.",
      },
      {
        type: "h2",
        id: "where-it-belongs",
        text: "Where it belongs first",
      },
      {
        type: "ul",
        items: [
          "Email, because it resets everything else.",
          "Banking and payment accounts.",
          "Your password manager.",
          "Work accounts and cloud storage.",
          "Social accounts that can impersonate you to people you know.",
        ],
      },
      {
        type: "h2",
        id: "recovery-codes",
        text: "Do not lose the spare key",
      },
      {
        type: "p",
        text: "When you turn the feature on, the service will offer recovery codes or a backup method. Write the codes down and store them somewhere that is not the same phone. A second factor you cannot recover is how people lock themselves out and then beg support to weaken the account.",
      },
      {
        type: "quote",
        text: "The second factor should be inconvenient for a stranger and recoverable for you.",
      },
    ],
  },
  {
    slug: "calm-introduction-ethical-hacking",
    title: "A Calm Introduction to Ethical Hacking",
    excerpt:
      "Ethical hacking is permission, scope, and a written purpose. Curiosity without those three is just trespass with better vocabulary.",
    category: "ethical-hacking",
    format: "article",
    readingMinutes: 8,
    publishedAt: "2026-08-07",
    cover: "orbit",
    author: "Cyber Studio Lab",
    tags: ["ethics", "careers", "mindset"],
    content: [
      {
        type: "p",
        text: "People meet the phrase through movies: a hoodie, a cascade of text, a system that falls over because someone typed fast. The work is quieter. Ethical hacking is the practice of looking for weaknesses in systems you are allowed to examine, documenting what you find, and stopping at the edge of the agreement.",
      },
      {
        type: "h2",
        id: "the-line",
        text: "The line is permission",
      },
      {
        type: "p",
        text: "A locksmith who studies locks is not entitled to open a stranger's door. The same idea holds for networks, websites, and accounts. If you do not own it, and nobody with authority has asked you to test it, you do not get to probe it to see what happens. Curiosity is not consent.",
      },
      {
        type: "ul",
        items: [
          "Permission should be explicit and written.",
          "Scope says which systems are in bounds.",
          "Rules of engagement say what you must not disrupt.",
          "Findings go to the people who can fix them, not to a public stunt.",
        ],
      },
      {
        type: "h2",
        id: "how-people-learn",
        text: "How people actually learn",
      },
      {
        type: "p",
        text: "Start with your own machines, deliberate practice labs, and programs that invite testing. Learn how the web requests a page, how a password is stored, and how a patch closes a bug. That knowledge makes you a better defender long before it makes you a specialist. The studio's writing stays on that side of the line: concepts, habits, and judgment. Not break-in instructions.",
      },
      {
        type: "quote",
        text: "The skill is seeing a weak assumption. The ethic is deciding who is allowed to hear about it, and when.",
      },
      {
        type: "note",
        text: "If a company publishes a vulnerability disclosure policy, that policy is the door. If it does not, an unsolicited test is not a gift.",
      },
    ],
  },
  {
    slug: "browser-settings-that-matter",
    title: "Browser Settings That Quietly Reduce Risk",
    excerpt:
      "You do not need a pile of extensions. A current browser, fewer permissions, and one skeptical habit will outperform most toolbars.",
    category: "tools",
    format: "tutorial",
    readingMinutes: 9,
    publishedAt: "2026-07-22",
    cover: "lattice",
    author: "Cyber Studio Lab",
    tags: ["browser", "privacy", "settings"],
    level: "Practice",
    duration: "25 min",
    steps: [
      {
        title: "Update the browser and let it stay updated",
        body: "Open the browser's about page and install the pending update. Turn on automatic updates if the setting exists. An old browser is a collection of bugs that already have names.",
      },
      {
        title: "Review site permissions",
        body: "Visit the privacy or site settings panel. Remove camera, microphone, and location access from sites that do not need them. Notifications are a privilege, not a default.",
      },
      {
        title: "Turn on safe browsing protections",
        body: "Enable the browser's phishing and malware warnings. They are not perfect. They catch the copies that have already been reported, which is a large share of real-world lures.",
      },
      {
        title: "Use a separate browser profile for experiments",
        body: "Keep shopping and banking in one profile and random downloads in another. Extensions and saved passwords should not travel with every tab you open out of curiosity.",
      },
    ],
    content: [
      {
        type: "p",
        text: "The browser is the front door of modern work. It is also where rushed permissions pile up: a news site that wanted notifications in 2019, a map that still knows your location, an extension you installed for one afternoon. Cleaning it is less glamorous than a new security product and more effective.",
      },
      {
        type: "h2",
        id: "update",
        text: "Start with the version",
      },
      {
        type: "p",
        text: "Before you tune anything, update. Browser vendors ship fixes constantly because the browser is exposed to the entire web. A settings checklist on an outdated build is decoration.",
      },
      {
        type: "h2",
        id: "permissions",
        text: "Permissions are a security setting",
      },
      {
        type: "p",
        text: "Camera, microphone, location, and notification access should be rare. Open the site settings page and revoke what you do not recognize. If a site truly needs the microphone, it can ask again the next time you intend to use it.",
      },
      {
        type: "h2",
        id: "extensions",
        text: "Extensions are other people's code",
      },
      {
        type: "p",
        text: "An extension can read pages. That is the feature and the risk. Keep the list short, install from the browser's own store, and remove anything you cannot explain. A password manager's extension earns its place. A bundle of unknown coupons usually does not.",
      },
      {
        type: "ul",
        items: [
          "Automatic updates on.",
          "Phishing protection on.",
          "Pop-ups blocked.",
          "Third-party cookies restricted if the browser offers it.",
          "Saved passwords only if you are not already using a manager — do not keep two competing vaults out of habit.",
        ],
      },
      {
        type: "quote",
        text: "A quiet browser is a smaller target. Remove permissions you would not grant again today.",
      },
    ],
  },
  {
    slug: "updates-are-a-control",
    title: "Updating Software Is a Security Control",
    excerpt:
      "A patch is a closed door. Leaving it uninstalled is a choice to keep a documented mistake in your pocket.",
    category: "basics",
    format: "article",
    readingMinutes: 5,
    publishedAt: "2026-07-09",
    cover: "orbit",
    author: "Cyber Studio Lab",
    tags: ["updates", "devices", "habits"],
    content: [
      {
        type: "p",
        text: "Updates feel like chores because the benefit is invisible. Nothing dramatic happens when a patch works. Something avoidable happens when it does not: a bug that was public last month is still sitting on the phone you use for banking.",
      },
      {
        type: "h2",
        id: "what-to-update",
        text: "What deserves automatic updates",
      },
      {
        type: "ul",
        items: [
          "Phone and computer operating systems.",
          "The browser and its built-in components.",
          "Password managers and office suites.",
          "The router firmware, checked a few times a year.",
          "Apps that hold messages, photos, or money.",
        ],
      },
      {
        type: "h2",
        id: "the-delay-myth",
        text: "The delay myth",
      },
      {
        type: "p",
        text: "Waiting weeks to see if an update is safe made more sense when updates were rare and enormous. For phones and browsers, the risk of staying behind is usually larger than the risk of installing on day two. Restart the device. That is often the step that actually applies the fix.",
      },
      {
        type: "quote",
        text: "An update you postpone is a vulnerability you have agreed to host.",
      },
    ],
  },
  {
    slug: "stop-oversharing",
    title: "Personal Data You Should Stop Oversharing",
    excerpt:
      "The details that make a post feel personal are the same details that answer a password reset.",
    category: "privacy",
    format: "article",
    readingMinutes: 6,
    publishedAt: "2026-06-26",
    cover: "signal",
    author: "Cyber Studio Lab",
    tags: ["privacy", "social", "identity"],
    content: [
      {
        type: "p",
        text: "Oversharing is not a moral failing. Platforms reward specificity, and specificity is useful to anyone pretending to be you. A birthday, a school, a pet, a mother's maiden name, a photo of a boarding pass: each one is a small key that used to live offline.",
      },
      {
        type: "h2",
        id: "high-value-details",
        text: "Details with a second life",
      },
      {
        type: "ul",
        items: [
          "Full birth date paired with your city.",
          "Answers you also used for security questions.",
          "Real-time travel, hotel names, and empty-house posts.",
          "Photos of IDs, badges, tickets, or mail.",
          "Children's names, schools, and routines.",
        ],
      },
      {
        type: "h2",
        id: "a-publishing-test",
        text: "A test before you post",
      },
      {
        type: "p",
        text: "Ask whether a stranger could reuse the detail to impersonate you, find your home, or reset an account. If the answer is yes, the story can wait until you are back, or it can be told without the identifiers. Friends do not need your exact gate number.",
      },
      {
        type: "quote",
        text: "Privacy is not disappearance. It is refusing to publish the answers.",
      },
    ],
  },
  {
    slug: "password-manager-evening",
    title: "Set Up a Password Manager in One Evening",
    excerpt:
      "One passphrase, a recovered backup, and three important accounts moved. That is a complete first session.",
    category: "tools",
    format: "tutorial",
    readingMinutes: 10,
    publishedAt: "2026-06-11",
    featured: true,
    cover: "key",
    author: "Cyber Studio Lab",
    tags: ["passwords", "tutorial", "setup"],
    level: "Guided",
    duration: "45 min",
    steps: [
      {
        title: "Choose one manager and install it officially",
        body: "Pick a single reputable password manager and download it from the vendor or your operating system's store. Skip third-party repackages and browser popups that offer to install one for you.",
      },
      {
        title: "Create a long passphrase you do not reuse",
        body: "The manager's master passphrase should be several unrelated words you can say aloud slowly. It must not be a password you already use anywhere else. Write the recovery kit down before you add other accounts.",
      },
      {
        title: "Turn on a second factor",
        body: "Protect the vault with an authenticator app or a hardware key. Store the recovery codes on paper, separate from the computer. This account is now the front door.",
      },
      {
        title: "Move email, banking, and one daily account",
        body: "Generate a new unique password inside the manager for email first, then banking, then the account you use most during the week. Confirm you can sign in. Stop there for the night. The long tail of old accounts can wait.",
      },
    ],
    content: [
      {
        type: "p",
        text: "People abandon password managers when the first session tries to migrate a decade of logins. Do not do that. The evening is a success when three important accounts are unique and you can still get back in if the phone disappears.",
      },
      {
        type: "h2",
        id: "scope",
        text: "Keep the scope small",
      },
      {
        type: "p",
        text: "Install the app, create the vault, record the recovery method, and rotate email plus two other accounts. Importing a messy browser password list can come later, after you have deleted the obvious duplicates. A half-trusted vault you actually use beats a perfect system you never open.",
      },
      {
        type: "h2",
        id: "the-passphrase",
        text: "The passphrase is the product",
      },
      {
        type: "p",
        text: "Make it long and speakable. Avoid lyrics, famous quotations, and anything printed on a mug in your office. If you forget it and you also skipped the recovery codes, the vendor usually cannot ethically unlock the vault. That inconvenience is the feature.",
      },
      {
        type: "h2",
        id: "after",
        text: "The following week",
      },
      {
        type: "p",
        text: "Each time a site makes you sign in, replace the password if the manager says it is reused or weak. You will finish the important set without a heroic weekend. Remove the browser's offer to save passwords so you do not grow a second, weaker list.",
      },
      {
        type: "note",
        text: "This guide is vendor-neutral on purpose. The sequence matters more than the logo.",
      },
    ],
  },
  {
    slug: "read-a-security-header",
    title: "Read Your First HTTP Security Header",
    excerpt:
      "A response header is a public sentence from a website to the browser. You can read it without attacking anything.",
    category: "ethical-hacking",
    format: "tutorial",
    readingMinutes: 8,
    publishedAt: "2026-05-28",
    cover: "lattice",
    author: "Cyber Studio Lab",
    tags: ["web", "headers", "learning"],
    level: "Foundation",
    duration: "30 min",
    steps: [
      {
        title: "Open a site you own or a site that invites learning",
        body: "Use your own project, a documentation site, or a practice lab. Reading public response headers in the browser's developer tools is ordinary web literacy. Do not point scanners at systems you do not operate.",
      },
      {
        title: "Open the network panel and reload",
        body: "In the browser's developer tools, choose the document request. Look at the response headers. You are reading metadata the server already sent to anyone who loaded the page.",
      },
      {
        title: "Find three common names",
        body: "Look for Content-Security-Policy, Strict-Transport-Security, and X-Content-Type-Options. Their presence is a sign the site has thought about browsers. Their absence is a conversation for the site owner, not a trophy.",
      },
      {
        title: "Write down what each one is trying to say",
        body: "In plain language: which sources of code are allowed, whether the browser should stick to HTTPS, and whether the browser should trust the declared file type. Understanding the sentence is the lesson.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Security headers are instructions a website gives a browser. They are visible because the browser needs them. Learning to read them is a clean way to understand web defense without crossing into someone else's system.",
      },
      {
        type: "h2",
        id: "three-headers",
        text: "Three headers worth recognizing",
      },
      {
        type: "ul",
        items: [
          "Content-Security-Policy limits where scripts and other resources may load from.",
          "Strict-Transport-Security tells the browser to keep using HTTPS for that site.",
          "X-Content-Type-Options: nosniff asks the browser not to guess a file type.",
        ],
      },
      {
        type: "h2",
        id: "what-this-is-not",
        text: "What this exercise is not",
      },
      {
        type: "p",
        text: "It is not permission to probe, fuzz, or hammer a site. The developer tools show you the response you were already given. If you run a site of your own, you can compare its headers with the documentation from a trusted source such as MDN and decide what you want the browser to enforce.",
      },
      {
        type: "quote",
        text: "Defense becomes legible when you can read the instructions the browser is already obeying.",
      },
      {
        type: "note",
        text: "Stay on systems you own or on materials published for learning. Observation of your own traffic is the whole exercise.",
      },
    ],
  },
  {
    slug: "what-a-breach-notice-means",
    title: "What to Do With a Breach Notice",
    excerpt:
      "The email you hoped was spam is sometimes real. The work is small, specific, and better done the same day.",
    category: "privacy",
    format: "article",
    readingMinutes: 6,
    publishedAt: "2026-05-14",
    cover: "radar",
    author: "Cyber Studio Lab",
    tags: ["breaches", "response", "accounts"],
    content: [
      {
        type: "p",
        text: "A breach notice means a service lost data it was holding for you. It does not mean every account you own is gone. It means the data listed in the notice — often an email address, a password hash, or a phone number — should be treated as public.",
      },
      {
        type: "h2",
        id: "same-day",
        text: "The same-day list",
      },
      {
        type: "ul",
        items: [
          "Confirm the notice on the company's own site or app, not only in the email.",
          "Change that password, and change it anywhere else you reused it.",
          "Turn on two-factor authentication if the account offers it.",
          "Watch the email account for password-reset messages you did not request.",
          "If financial data was involved, ask the bank what monitoring they recommend.",
        ],
      },
      {
        type: "h2",
        id: "what-you-can-skip",
        text: "What you can skip",
      },
      {
        type: "p",
        text: "You do not need to close every account you have ever created. You do not need to buy the first identity product the notice advertises. You do need to kill password reuse, because that is how a notice about a forum becomes a problem for your inbox.",
      },
      {
        type: "quote",
        text: "A breach is a fact about one database. Reuse is how you let it travel.",
      },
    ],
  },
  {
    slug: "permissions-on-your-phone",
    title: "A Phone Permission Audit You Can Finish",
    excerpt:
      "Apps accumulate access the way drawers accumulate cables. Revoke what the last year did not justify.",
    category: "tools",
    format: "tutorial",
    readingMinutes: 7,
    publishedAt: "2026-04-30",
    cover: "mesh",
    author: "Cyber Studio Lab",
    tags: ["mobile", "permissions", "privacy"],
    level: "Foundation",
    duration: "20 min",
    steps: [
      {
        title: "Open the privacy dashboard",
        body: "On iOS this lives in Settings under Privacy & Security. On Android, look for Privacy and Permission manager. You want the list organized by permission, not by app.",
      },
      {
        title: "Start with location, camera, and microphone",
        body: "Remove access from apps that do not need the sensor to do their job. A flashlight does not need your contacts. A game does not need always-on location.",
      },
      {
        title: "Set location to while-using where you can",
        body: "Maps can ask when they are open. Almost nothing needs your location in the background. Precise location can stay off for weather and shopping.",
      },
      {
        title: "Delete the apps you no longer open",
        body: "An unused app is still a permission set. Remove it, then confirm the permission lists got shorter. Repeat once a season.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Phone permissions are granted in a second and forgotten for years. The audit is a list, not a lifestyle. You are looking for access that would surprise you if you were asked again today.",
      },
      {
        type: "h2",
        id: "priority",
        text: "Prioritize sensors and identity",
      },
      {
        type: "p",
        text: "Location, camera, microphone, contacts, and photos can reveal more than a preference setting. Notifications are lower stakes but higher annoyance. Work top down. If an app breaks in a way you care about, you can allow the single permission again.",
      },
      {
        type: "h2",
        id: "accounts",
        text: "Then look at the accounts on the device",
      },
      {
        type: "p",
        text: "A phone with a lock screen, an updated operating system, and a second factor on the Apple or Google account is doing more work than a folder of security apps. The audit is a complement to those basics, not a replacement.",
      },
      {
        type: "quote",
        text: "If you would hesitate to grant it now, revoke it and let the app ask again.",
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: CategoryId) {
  return articles.filter((article) => article.category === category);
}

export function getRelatedArticles(slug: string, limit = 3) {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  const sameCategory = articles.filter(
    (article) => article.slug !== slug && article.category === current.category,
  );
  const others = articles.filter(
    (article) => article.slug !== slug && article.category !== current.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export function getTutorials() {
  return articles.filter((article) => article.format === "tutorial");
}

export function getFeaturedArticle() {
  return articles.find((article) => article.featured) ?? articles[0];
}

export function getHeadings(article: Article) {
  return article.content.flatMap((block) =>
    block.type === "h2" ? [{ id: block.id, text: block.text }] : [],
  );
}

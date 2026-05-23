export type LegalPageSlug = "privacy" | "terms" | "disclaimer" | "about" | "contact";

export type LegalPageSection = {
  heading: string;
  paragraphs: string[];
};

export type LegalPageContent = {
  slug: LegalPageSlug;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: LegalPageSection[];
};

export const siteUrl = "https://big-six-wheel-simulator.vercel.app";
export const contactEmail = "contact@example.com";

export const legalPages: LegalPageContent[] = [
  {
    slug: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    metaTitle: "Privacy Policy | Big Six Wheel Simulator",
    metaDescription:
      "Privacy policy for Big Six Wheel Simulator, an educational virtual-credit probability simulator.",
    intro:
      "Big Six Wheel Simulator is an educational probability simulator that uses virtual credits only.",
    sections: [
      {
        heading: "Educational simulator",
        paragraphs: [
          "This site is designed to help visitors understand Big Six wheel probabilities, payout structures, and house edge. It is not a real-money gambling service.",
          "No real-money gambling transactions are processed. The simulator does not accept deposits, wagers, withdrawals, or payments for casino-style play.",
        ],
      },
      {
        heading: "Accounts and personal information",
        paragraphs: [
          "The site currently does not require user accounts. Visitors can use the simulator without creating a profile or submitting personal account details.",
          "If account features are ever added, this policy should be updated before those features are launched.",
        ],
      },
      {
        heading: "Analytics and advertising placeholders",
        paragraphs: [
          "Analytics or advertising tools may be added later to understand site usage or support the operation of the site.",
          "Google Analytics placeholder: if enabled in the future, Google Analytics may collect general usage data such as page views, device type, approximate location, and referral sources.",
          "Google AdSense placeholder: if enabled in the future, Google AdSense may use cookies or similar technologies to serve and measure ads according to Google's policies.",
        ],
      },
      {
        heading: "Cookies and similar technologies",
        paragraphs: [
          "The site may use cookies, local storage, or similar technologies for basic functionality, analytics, advertising, performance measurement, or preference storage.",
          "Visitors can usually manage cookies through their browser settings.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `For privacy questions, contact the site owner at ${contactEmail}. Replace this placeholder with the correct contact email before publishing formal legal notices.`,
        ],
      },
    ],
  },
  {
    slug: "terms",
    path: "/terms",
    title: "Terms of Use",
    metaTitle: "Terms of Use | Big Six Wheel Simulator",
    metaDescription:
      "Terms of use for Big Six Wheel Simulator, including virtual-credit and educational-use limitations.",
    intro:
      "By using Big Six Wheel Simulator, you agree to use it as an educational and entertainment tool only.",
    sections: [
      {
        heading: "Educational and entertainment use",
        paragraphs: [
          "The simulator is provided for educational and entertainment purposes. It is intended to demonstrate probability, odds, payouts, and house edge in a virtual-credit environment.",
        ],
      },
      {
        heading: "Virtual credits",
        paragraphs: [
          "Virtual credits have no cash value. They cannot be purchased, sold, redeemed, withdrawn, exchanged, or transferred for money, prizes, goods, or services.",
        ],
      },
      {
        heading: "No professional advice",
        paragraphs: [
          "Users should not rely on the simulator for financial, gambling, legal, or other professional decisions. The content is informational and may not reflect every real-world rule variation.",
        ],
      },
      {
        heading: "Availability and accuracy",
        paragraphs: [
          "The site owner does not guarantee uninterrupted or error-free operation. The simulator may be updated, changed, unavailable, or contain inaccuracies at any time.",
        ],
      },
    ],
  },
  {
    slug: "disclaimer",
    path: "/disclaimer",
    title: "Educational Disclaimer",
    metaTitle: "Educational Disclaimer | Big Six Wheel Simulator",
    metaDescription:
      "Educational disclaimer explaining that Big Six Wheel Simulator is not a gambling service and uses virtual credits only.",
    intro:
      "Big Six Wheel Simulator is a probability education tool. It is not a gambling service.",
    sections: [
      {
        heading: "Not a gambling service",
        paragraphs: [
          "This app does not accept deposits, wagers, withdrawals, or real-money bets. It does not offer prizes, cashouts, accounts, or real-money gambling functionality.",
        ],
      },
      {
        heading: "Probability education",
        paragraphs: [
          "The simulator is designed to teach probability, odds, payouts, weighted outcomes, and house edge through interactive virtual-credit examples.",
        ],
      },
      {
        heading: "Responsible use",
        paragraphs: [
          "Use this simulator as a learning tool. If gambling-related content is not appropriate for you, or if it may encourage harmful behavior, avoid using the app and seek support from qualified resources where needed.",
        ],
      },
    ],
  },
  {
    slug: "about",
    path: "/about",
    title: "About",
    metaTitle: "About | Big Six Wheel Simulator",
    metaDescription:
      "Learn about Big Six Wheel Simulator, an educational probability tool for understanding odds, payouts, and house edge.",
    intro:
      "Big Six Wheel Simulator is an educational probability tool focused on clear, interactive math.",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "The simulator helps users understand Big Six wheel odds, payouts, and house edge through interactive virtual-credit simulation.",
          "It presents weighted results and session statistics so users can compare short-term outcomes with the underlying probability model.",
        ],
      },
      {
        heading: "Neutral educational focus",
        paragraphs: [
          "The project is built to explain probability concepts in a professional and neutral way. It does not provide real-money gambling features.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    path: "/contact",
    title: "Contact",
    metaTitle: "Contact | Big Six Wheel Simulator",
    metaDescription:
      "Contact information for Big Six Wheel Simulator. No contact form is currently provided.",
    intro:
      "For questions about Big Six Wheel Simulator, use the placeholder contact email below.",
    sections: [
      {
        heading: "Email",
        paragraphs: [
          `Contact email: ${contactEmail}`,
          "A contact form is not available yet. Replace this placeholder address with the correct site owner email before publishing formal contact information.",
        ],
      },
    ],
  },
];

export const getLegalPageByPath = (path: string) =>
  legalPages.find((page) => page.path === path);

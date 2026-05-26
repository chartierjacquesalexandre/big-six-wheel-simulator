export type EducationArticleSlug = "big-six-wheel-odds" | "big-six-wheel-house-edge";

export type EducationArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type EducationArticleContent = {
  slug: EducationArticleSlug;
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: EducationArticleSection[];
};

export const educationArticles: EducationArticleContent[] = [
  {
    slug: "big-six-wheel-odds",
    path: "/big-six-wheel-odds",
    title: "How Big Six Wheel Odds Work",
    metaTitle: "How Big Six Wheel Odds Work | Big Six Wheel Simulator",
    metaDescription:
      "Learn how Big Six wheel odds are calculated from weighted stops, probabilities, payouts, and virtual-credit outcomes.",
    intro:
      "Big Six wheel odds come from a simple idea: results that appear more often on the wheel are more likely to land.",
    sections: [
      {
        heading: "Odds start with wheel stops",
        paragraphs: [
          "A Big Six wheel is divided into stops. Each stop belongs to a result such as 1, 3, 6, 12, 25, Flag, or Joker. If a result has more stops, it has a higher probability of landing.",
          "In the default simulator setup, the wheel has 54 total stops. The 1 result appears 26 times, while Flag and Joker each appear once.",
        ],
      },
      {
        heading: "How probability is calculated",
        paragraphs: [
          "Probability is calculated by dividing the number of stops for a result by the total number of stops on the wheel.",
          "For example, the 6 result appears 7 times on a 54-stop wheel, so its probability is 7 divided by 54, or about 12.96%.",
        ],
      },
      {
        heading: "Why payouts are not the same as probability",
        paragraphs: [
          "A payout describes how many virtual credits are returned when a selected result lands. It does not mean that the result has that same chance of landing.",
          "Rare results often have larger payouts, but the relationship between probability and payout determines whether a result has a higher or lower house edge.",
        ],
      },
      {
        heading: "Short-term results can vary",
        paragraphs: [
          "Even when the probability math is fixed, short sessions can produce streaks, gaps, and unusual patterns. This is normal for random outcomes.",
          "The simulator's recent-results and outcome-gap views are designed to show the difference between theoretical probability and short-term results.",
        ],
      },
      {
        heading: "Educational use only",
        paragraphs: [
          "Big Six Wheel Simulator uses virtual credits only. It is intended to help users understand odds and probability, not to provide gambling services or real-money betting.",
        ],
      },
    ],
  },
  {
    slug: "big-six-wheel-house-edge",
    path: "/big-six-wheel-house-edge",
    title: "Big Six Wheel House Edge Explained",
    metaTitle: "Big Six Wheel House Edge Explained | Big Six Wheel Simulator",
    metaDescription:
      "Understand Big Six wheel house edge, expected value, payout differences, and why some virtual-credit bets are less favorable than others.",
    intro:
      "House edge explains the long-term mathematical advantage built into a payout table.",
    sections: [
      {
        heading: "What house edge means",
        paragraphs: [
          "House edge is the expected long-term percentage retained by the game rules when outcomes follow their theoretical probabilities.",
          "In this simulator, house edge is shown for educational comparison only. Virtual credits have no cash value and cannot be redeemed.",
        ],
      },
      {
        heading: "Expected value in plain language",
        paragraphs: [
          "Expected value combines the chance of winning with the payout for winning and the chance of losing the virtual-credit stake.",
          "For a fair even-risk result, the payout would exactly match the probability. Big Six wheel payouts are usually lower than fair mathematical payouts, which creates house edge.",
        ],
      },
      {
        heading: "Why the 6 result is less favorable",
        paragraphs: [
          "In the default wheel, the 6 result appears 7 times on a 54-stop wheel and pays 6 to 1. That combination produces a higher house edge than several other default results.",
          "The simulator highlights this relationship so users can compare payout size against probability instead of looking only at the headline payout.",
        ],
      },
      {
        heading: "Comparing best and worst bets",
        paragraphs: [
          "The 1, 3, 12, and 25 results share the lowest default house edge in this setup. Flag and Joker are rarer and have a different edge because each appears once and pays 50 to 1.",
          "The best educational takeaway is that the largest payout is not automatically the best mathematical choice. Probability and payout must be considered together.",
        ],
      },
      {
        heading: "Responsible interpretation",
        paragraphs: [
          "This content is not financial, gambling, or legal advice. It is a probability explanation for a virtual-credit simulator.",
          "The app does not accept deposits, withdrawals, real-money wagers, or casino accounts.",
        ],
      },
    ],
  },
];

export const getEducationArticleByPath = (path: string) =>
  educationArticles.find((article) => article.path === path);

export type ProductReview = {
  id: string;
  name: string;
  rating: number;
  body: string;
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export const shopReviews: ProductReview[] = [
  {
    id: "rev-jessica",
    name: "Jessica F.",
    rating: 5,
    body: "I bought this for my boyfriend and he loves it. The material feels soft but durable, and the fit is just right - not too tight, not too loose. Works great for casual Fridays or dinner dates.",
  },
  {
    id: "rev-brody",
    name: "Brody G.",
    rating: 5,
    body: "I like this modern cut and subtle color. It pairs easily with chinos or jeans. The zipper detail gives it a slightly elevated feel compared to most basics. I highly recommend this one.",
  },
  {
    id: "rev-silvia",
    name: "Silvia L.",
    rating: 4,
    body: "Honestly did not expect the quality to be this good. The fabric feels premium and it holds shape even after washing. Definitely worth the price. I just wish there were more color options.",
  },
  {
    id: "rev-marcus",
    name: "Marcus T.",
    rating: 5,
    body: "Arrived quickly and packed well. Finish is cleaner than I expected at this price - I have already ordered a second one.",
  },
  {
    id: "rev-priya",
    name: "Priya N.",
    rating: 4,
    body: "Comfortable, looks considered, and it layers easily. Sizing is true. I would buy it again.",
  },
  {
    id: "rev-owen",
    name: "Owen K.",
    rating: 5,
    body: "Exactly as described. Solid build, no cheap smell, and it still looks new after a few weeks of use.",
  },
];

export const shopFaqs: ProductFaq[] = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping is 3–5 business days across Australia. Regional addresses may take a little longer.",
  },
  {
    question: "What is your returns policy?",
    answer:
      "Unused items can be returned within 30 days in original packaging. Start a return from the order email we send you.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "We currently ship within Australia. International delivery is on the way - join the list in the footer to hear first.",
  },
  {
    question: "How do I choose a size?",
    answer:
      "Clothing is a relaxed unisex fit. If you are between sizes, take the larger one. Furniture dimensions are listed in product details.",
  },
];

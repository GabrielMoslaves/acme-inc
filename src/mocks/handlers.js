import { rest } from "msw";
import { adjectives, nouns } from "./mockProducts";

export const handlers = [
  rest.get("https://acme-inc.mock/random-words", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        adjectives,
        nouns,
      })
    );
  }),
];

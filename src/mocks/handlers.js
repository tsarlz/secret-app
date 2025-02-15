import { rest } from "msw";

export const handlers = [
  rest.post(
    "https://itnifittkksxbtqleffd.supabase.co/auth/v1/signup",
    (req, res, ctx) => {
      const { email, password } = req.body;

      if (email === "test@example.com" && password === "password123") {
        return res(ctx.status(200), ctx.json({ user: { id: "123456" } }));
      }

      return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
    }
  ),
];

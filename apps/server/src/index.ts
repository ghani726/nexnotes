import { Elysia } from "elysia";
import { UserSignupSchema } from "@repo/validation";

const app = new Elysia();

app.get("/health", () => ({ status: "ok" }));
app.post(
    "/signup",
    ({ body, }) => {
        return { success: true, data: body };
    },
    {
        body: UserSignupSchema,
    },
);

export type App = typeof app;

app.listen(3001);

console.log("🚀 Elysia server running at http://localhost:3001");

export default app
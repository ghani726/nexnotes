import { t, Static } from 'elysia';

export const UserSignupSchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
  customRole: t.Union([t.Literal('admin'), t.Literal('user')])
});

export type UserSignupInput = Static<typeof UserSignupSchema>;
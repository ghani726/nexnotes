import { Type, Static } from '@sinclair/typebox';

export const UserSignupSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
  customRole: Type.Union([Type.Literal('admin'), Type.Literal('user')])
});

export type UserSignupInput = Static<typeof UserSignupSchema>;

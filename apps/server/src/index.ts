import { Elysia } from 'elysia';
import { UserSignupSchema } from '@repo/validation';

export const app = new Elysia()
  .get('/health', () => ({ status: 'ok' }))
  .post('/signup', ({ body }) => {
    return { success: true, data: body };
  }, {
    body: UserSignupSchema
  })
  .listen(3001);

console.log('🚀 Elysia server running at http://localhost:3001');

export type App = typeof app;

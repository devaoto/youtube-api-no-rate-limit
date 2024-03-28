import { Elysia } from 'elysia';
import { getAll, getInfo, type AllResponse, type Info } from 'ytscr';
import { cors } from '@elysiajs/cors';

new Elysia()
  .use(cors())
  .get('/', () => ({
    message: 'Hello, world',
  }))
  .get('/channel', async ({ query, set }) => {
    const id = query.id;

    if (!id) {
      set.status = 400;
      return {
        message: 'No id was provided.',
      };
    }

    set.status = 200;

    const response = (await getAll(id)) as AllResponse;

    return { ...response };
  })
  .get('/info', async ({ query, set }) => {
    const videoId = query.id;

    if (!videoId) {
      set.status = 400;
      return {
        message: 'No id was provided.',
      };
    }

    const response = (await getInfo(videoId)) as Info;

    return { ...response };
  })
  .listen(3000);

console.log('Server started on port: 3000');

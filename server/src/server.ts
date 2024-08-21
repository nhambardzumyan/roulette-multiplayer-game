import { Server, Origins } from 'boardgame.io/server';
import RouletteGame from './core/Game';

const generateCredentials = (ctx: any) => {
  console.log('generateCredentials --- ', ctx);
  const authHeader = ctx.request.headers['authorization'];
  const token = Math.random().toString(36).substring(7);
  return token;
};

const authenticateCredentials = async (
  credentials: any,
  playerMetadata: any
) => {
  console.log('authenticateCredentials --- ', credentials);
  console.log('authenticateCredentials --- ', playerMetadata);

  // if (credentials) {
  //   const token = await authService.decodeToken(credentials);
  //   if (token.uid === playerMetadata.credentials) return true;
  // }
  return true;
};

const server = Server({
  games: [RouletteGame],
  generateCredentials,
  authenticateCredentials,

  origins: [
    // Allow localhost to connect, except when NODE_ENV is 'production'.
    Origins.LOCALHOST_IN_DEVELOPMENT,
  ],
});

server.router.use('/ping', async (ctx: any, next: any) => {
  // Decide number of players etc. based on some other API.
  console.log('pong --- ');
  next();
});

server.run(8002, () => console.log('server running...'));

import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { createApp } from './app.js';

await connectDatabase();

const server = createApp().listen(env.PORT);

const shutdown = () => {
  server.close(async () => {
    await disconnectDatabase();
    process.exit(0);
  });
};

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);

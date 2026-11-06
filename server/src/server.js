import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

await connectDB();
const server = app.listen(env.PORT, () => console.log(`API running on http://localhost:${env.PORT}`));

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => server.close(() => process.exit(0)));
}

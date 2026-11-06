import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/index.js';

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({ origin: env.CLIENT_ORIGIN }));
app.use(express.json({ limit: '10kb' }));
if (env.NODE_ENV !== 'test') app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 300, standardHeaders: true, legacyHeaders: false }), routes);
app.use(notFound);
app.use(errorHandler);

export default app;

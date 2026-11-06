import crypto from 'node:crypto';
import { ZodError } from 'zod';
import { env } from '../config/env.js';

export const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/** Validates req.body with a zod schema and replaces it with the parsed (sanitised) value. */
export const validate = (schema) => (req, _res, next) => {
  req.body = schema.parse(req.body);
  next();
};

/** Protects write routes with a shared secret sent as `x-api-key` (constant-time compare). */
export function adminAuth(req, res, next) {
  const a = Buffer.from(String(req.get('x-api-key') ?? ''));
  const b = Buffer.from(env.ADMIN_API_KEY);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

export const notFound = (_req, res) => res.status(404).json({ message: 'Not found' });

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validation failed', errors: err.flatten().fieldErrors });
  }
  if (err.name === 'CastError') return res.status(400).json({ message: 'Invalid id' });
  console.error(err);
  res.status(500).json({ message: env.NODE_ENV === 'production' ? 'Server error' : err.message });
}

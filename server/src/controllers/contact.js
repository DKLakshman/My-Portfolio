import { z } from 'zod';
import { Message } from '../models/Message.js';
import { asyncHandler } from '../middleware/index.js';

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(2000),
});

export const send = asyncHandler(async (req, res) => {
  await Message.create(req.body);
  res.status(201).json({ message: 'Thanks! I will get back to you soon.' });
});

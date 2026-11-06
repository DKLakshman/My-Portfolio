import { z } from 'zod';
import { Project } from '../models/Project.js';
import { asyncHandler } from '../middleware/index.js';

const url = z.string().url().optional().or(z.literal('').transform(() => undefined));

export const projectSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(600),
  tags: z.array(z.string().trim().min(1).max(30)).max(8).default([]),
  liveUrl: url,
  repoUrl: url,
  order: z.number().int().default(0),
});

export const list = asyncHandler(async (_req, res) => {
  res.json(await Project.find().sort({ order: 1, createdAt: 1 }).lean());
});

export const create = asyncHandler(async (req, res) => {
  res.status(201).json(await Project.create(req.body));
});

export const update = asyncHandler(async (req, res) => {
  const doc = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!doc) return res.status(404).json({ message: 'Project not found' });
  res.json(doc);
});

export const remove = asyncHandler(async (req, res) => {
  const doc = await Project.findByIdAndDelete(req.params.id);
  if (!doc) return res.status(404).json({ message: 'Project not found' });
  res.status(204).end();
});

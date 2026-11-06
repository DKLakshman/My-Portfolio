import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import * as projects from '../controllers/projects.js';
import * as contact from '../controllers/contact.js';
import { adminAuth, validate } from '../middleware/index.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.get('/projects', projects.list);
router.post('/projects', adminAuth, validate(projects.projectSchema), projects.create);
router.put('/projects/:id', adminAuth, validate(projects.projectSchema), projects.update);
router.delete('/projects/:id', adminAuth, projects.remove);

const contactLimiter = rateLimit({ windowMs: 60 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });
router.post('/contact', contactLimiter, validate(contact.contactSchema), contact.send);

export default router;

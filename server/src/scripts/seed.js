import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { Project } from '../models/Project.js';

const projects = [
  { title: 'Repair Geek', description: 'Full website for a computer repair shop: services, pricing, troubleshooting guides and service inquiries.', tags: ['JS', 'Laravel', 'Bootstrap'], liveUrl: 'https://repairgeek.lk/' },
  { title: 'SLIIT SEDS Club Website', description: 'Interactive site for the space-exploration club covering events, divisions and initiatives.', tags: ['JS', 'Sanity', 'Bootstrap'], liveUrl: 'https://sliit-seds.github.io/SEDS-Website/', repoUrl: 'https://github.com/DKLakshman/SEDS-Website' },
  { title: 'Textile & Garment System', description: 'Production system for PTI (Pvt) Ltd. I built the Inventory Management module for raw materials and finished goods.', tags: ['React', 'Express', 'MongoDB'], repoUrl: 'https://github.com/SLIIT-Group-projects/SLIIT-Y2S2-ITPproject-TextileSystem' },
  { title: 'Photography Portfolio', description: 'Customisable portfolio platform for Malcolm Lismore Photography.', tags: ['PHP', 'MySQL', 'Bootstrap'], repoUrl: 'https://github.com/DKLakshman/D01-Photography-portfolio' },
  { title: 'Online Vehicle Rental', description: 'Web app where I built the vehicle management backend, frontend and common UI.', tags: ['Java', 'MySQL', 'Bootstrap'], repoUrl: 'https://github.com/SLIIT-Group-projects/SLIIT-Y1S2-IWTproject' },
].map((p, i) => ({ ...p, order: i }));

await connectDB();
await Project.deleteMany({});
await Project.insertMany(projects);
console.log(`Seeded ${projects.length} projects`);
await mongoose.disconnect();

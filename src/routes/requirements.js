import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.resolve(process.cwd(), 'src', 'data', 'requirements.json');

router.get('/', (_req, res) => {
  try {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const data = JSON.parse(raw);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load requirements' });
  }
});

export default router;

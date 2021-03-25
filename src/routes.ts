import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.json({ 'home': 'Hello World!' }));

export { router };
import { Router } from 'express';
import { ToolsController } from './controllers/ToolsController';

const router = Router();

const toolsController = new ToolsController();

router.get('/', (req, res) => res.json({ 'home': 'Hello World!' }));

router.get('/tools', toolsController.show);
router.post('/tools', toolsController.create);
router.delete('/tools/:id', toolsController.delete)

export { router };
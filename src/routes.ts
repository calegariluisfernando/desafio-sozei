import { Request, Response, Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { ToolsController } from './controllers/ToolsController';
import { UsersController } from './controllers/UsersController';

const router = Router();

router.get('/', (req: Request, res: Response) => res.json({ 'home': 'Hello World!' }));

const authController = new AuthController();
router.post('/auth/login', authController.login);
router.post('/auth/logout', authController.logout);

const toolsController = new ToolsController();
router.get('/tools', toolsController.show);
router.post('/tools', toolsController.create);
router.delete('/tools/:id', toolsController.delete);

const usersController = new UsersController();
router.post('/users', usersController.create);
router.get('/users', usersController.show);
router.delete('/users/:id', usersController.delete);

export { router };


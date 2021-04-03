import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { ToolsController } from './controllers/ToolsController';
import { UsersController } from './controllers/UsersController';
import { AppError } from './error/AppError';
import { TokenGenerator } from './utils/TokenGenerator';

const router = Router();

router.get('/', (req, res) => res.json({ 'home': 'Hello World!' }));

router.use('/', (request: Request, response: Response, next: NextFunction) => {

    const { path } = request;   
    const dmzPaths = process.env.DMZ_ROUTES.split(',').map(p => p.trim());

    if (!dmzPaths.includes(path)) {

        const { authorization } = request.headers;
        if (typeof authorization === 'undefined') {

            throw new AppError('Access denied!', 401);
        }

        const checkedToken = TokenGenerator.verify(authorization);
        if (typeof checkedToken === 'string') {

            throw new AppError(checkedToken, 401);
        }

        if (checkedToken === false) {

            throw new AppError('Access denied!', 401);
        }
    }

    next();
});

const authController = new AuthController();
router.post('/auth/login', authController.login);

const toolsController = new ToolsController();
router.get('/tools', toolsController.show);
router.post('/tools', toolsController.create);
router.delete('/tools/:id', toolsController.delete);

const usersController = new UsersController();
router.post('/users', usersController.create);

export { router };

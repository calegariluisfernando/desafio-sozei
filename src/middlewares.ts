import { NextFunction, Request, Response, Router } from 'express';
import { blackListToken } from './app';
import { AppError } from './error/AppError';
import { TokenGenerator } from './utils/TokenGenerator';

const middleware = Router();

// Middleware Check Token
middleware.use('/', (request: Request, response: Response, next: NextFunction) => {

    const { path } = request;   
    const dmzPaths = process.env.DMZ_ROUTES.split(',').map(p => p.trim());

    if (!dmzPaths.includes(path)) {

        const { authorization } = request.headers;
        if (typeof authorization === 'undefined') {

            throw new AppError('Access denied!', 401);
        }

        const checkedToken = TokenGenerator.verify(authorization);
        if (checkedToken.status === false) {

            if (checkedToken.message) {

                throw new AppError(checkedToken.message, 401);
            } else {

                throw new AppError('Access denied!', 401);
            }
        } else if (blackListToken.map(t => t['idToken']).includes(checkedToken.token['jti'])) { 

            throw new AppError('Access denied!', 401);
        }
    }

    next();
});


export { middleware };


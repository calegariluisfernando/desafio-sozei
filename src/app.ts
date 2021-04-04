import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import createConnection from './database';
import { AppError } from './error/AppError';
import { middleware } from './middlewares';
import { router } from './routes';
import { TokenGenerator } from './utils/TokenGenerator';

createConnection();
const app = express();

var activeTokens = [];
var blackListToken = [];

// **************************   1 Hora
const timeCheckActiveTokens = 1000 * 60 * 60;
setInterval(() => {

    const listTokenBlackList = blackListToken.map(item => item['idToken']);
    activeTokens.filter(item => !listTokenBlackList.includes(item['idToken']));

    activeTokens.filter(item => {

        let checkedToken = TokenGenerator.verify(item['token']);
        return checkedToken.status
    });
    
}, timeCheckActiveTokens);

// ******************************   1 Hora
const timeCheckBlacklistTokens = 1000 * 60 * 60;
setInterval(() => {

    blackListToken.filter(item => {

        let checkedToken = TokenGenerator.verify(item['token']);
        return checkedToken.status
    });
    
}, timeCheckBlacklistTokens);

app.use(express.json());
app.use(middleware);
app.use(router);

app.use((err: Error, request: Request,  response: Response, _next: NextFunction) => {
    
    if (err instanceof AppError) {

        return response.status(err.statusCode).json({ 

            message: err.message 
        });
    }

    return response.status(500).json({
        
        status: 'Error',
        message: `Internal server error ${err.message}`
    });
});

export { app, activeTokens, blackListToken };


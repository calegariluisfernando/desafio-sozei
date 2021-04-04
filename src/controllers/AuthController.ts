import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { activeTokens, blackListToken } from "../app";
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository";
import { Helpers } from "../utils/Helpers";
import { TokenDataInterface, TokenGenerator } from "../utils/TokenGenerator";

class AuthController {

    async login(request: Request, response: Response) {

        const { email, password } = request.body;
        const userRespository = getCustomRepository(UsersRepository);
        const user = await userRespository.findOne({ email, password: Helpers.generateMd5(password) });

        if (!user) {

            throw new AppError("User not found!");
        }

        const { id, uuid } = user;
        const dadosToken: TokenDataInterface = TokenGenerator.sign({ id, uuid });
        
        activeTokens.push({ idToken: dadosToken['idToken'], token: dadosToken['token'] });

        return response.json({ token: dadosToken['token'] });       
    }

    async logout(request: Request, response: Response) {

        // Adicionar Token na Lista Negra
        const { authorization } = request.headers;
        
        if (typeof authorization !== 'undefined') {

            const token         = authorization.split(' ').pop();
            const tokenDecoded  = TokenGenerator.verify(token);
            const tokenId       = tokenDecoded.token['jti'];

            if (!blackListToken.map(t => t['idToken']).includes(tokenId)) {

                blackListToken.push({ idToken: tokenDecoded.token['jti'], token });
            }
        }

        return response.status(200).json({});
    }
}

export { AuthController };


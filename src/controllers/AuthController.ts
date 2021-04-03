import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as jwt from 'jsonwebtoken';
import { AppError } from "../error/AppError";
import { Helpers } from "../utils/Helpers";
import { TokenGenerator } from "../utils/TokenGenerator";

class AuthController {

    async login(request: Request, response: Response) {

        const { email, password } = request.body;
        const userRespository = getCustomRepository(UsersRepository);
        const user = await userRespository.findOne({ email, password: Helpers.generateMd5(password) });

        if (!user) {

            throw new AppError("User not found!");
        }

        const { id, uuid } = user;
        const token = TokenGenerator.sign({ id, uuid });

        return response.json({ token });       
    }
}

export { AuthController };
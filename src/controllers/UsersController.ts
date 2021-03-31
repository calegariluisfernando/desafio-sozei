import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository";
import { Helpers } from "../utils/Helpers";

interface ResquestCreateData {

    uuid?: string;
    name: string,
    email: string;
    password: string;
    status: number;
}

class UsersController {

    async create(request: Request, response: Response) {

        let { name, email, password, status }:ResquestCreateData = request.body;
        password = Helpers.md5(password);
        const userRespository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRespository.findOne({ email });

        if (userAlreadyExists) {

            throw new AppError('User Already existis!');
        }

        const user = userRespository.create({ name, email, password, status });

        await userRespository.save(user);

        return response.status(201).json(user);
    }
}

export { UsersController };
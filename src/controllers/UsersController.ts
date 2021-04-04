import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../error/AppError";
import { UsersRepository } from "../repositories/UsersRepository";

interface ResquestCreateData {

    uuid?: string;
    name: string,
    email: string;
    password: string;
    isActive: false | true;
}

class UsersController {

    async create(request: Request, response: Response) {

        const { name, email, password, isActive }:ResquestCreateData = request.body;
        const userRespository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await userRespository.findOne({ email });

        if (userAlreadyExists) {

            throw new AppError('User Already existis!');
        }

        const user = userRespository.create({ name, email, password, isActive });

        await userRespository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response) {
        
        const usersRepository = getCustomRepository(UsersRepository);
        const all = await usersRepository.find();

        return response.json(all);
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        const usersRepository = getCustomRepository(UsersRepository);

        const retorno = await usersRepository.findByIds([id]);

        await usersRepository.remove(retorno);

        return response.status(204).json(retorno);
    }
}

export { UsersController };

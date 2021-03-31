import e, { Request, Response } from "express";
import { getCustomRepository, In } from "typeorm";
import { TagsRepository } from "../repositories/TagsRepository";
import { ToolsRepository } from "../repositories/ToolsRepository";

interface RequestData {
    id?: number,
    title: string; 
    link?: string;
    description?: string;
    tags?: []
}

class ToolsController {

    async show(request: Request, response: Response) {

        const { tag } = request.query;
        const toolsRepository = getCustomRepository(ToolsRepository);

        const all = await toolsRepository.find({ 
            relations: ['tags']
        });

        return response.json(all);
    }

    async create(request: Request, response: Response) {

        const { title, link, description, tags }:RequestData = request.body;

        const toolsRepository = getCustomRepository(ToolsRepository);
        const tagsRepository = getCustomRepository(TagsRepository);

        let tagsExists = await tagsRepository.find(
            { 
                title: In(tags)
            }
        );

        const tagsNotExists = tags.filter(
            t => !tagsExists.map(
                te => te.title
            )
            .includes(t))
            .map(title => tagsRepository.create({ title }));


        if (tagsNotExists.length > 0) {
            
            await tagsRepository.save(tagsNotExists);

            tagsExists = tagsExists.concat(tagsNotExists);
        }

        const tool = toolsRepository.create({
            title, link, description, tags: tagsExists
        });

        await toolsRepository.save(tool);


        return response.status(201).json(tool);
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;
        const toolsrepository = getCustomRepository(ToolsRepository);

        const retorno = await toolsrepository.findByIds([id]);

        await toolsrepository.remove(retorno);

        return response.status(204).json(retorno);
    }
}

export { ToolsController }
import { EntityRepository, Repository } from "typeorm";
import { Tool } from "../models/Tool";

@EntityRepository(Tool)
class ToolsRepository extends Repository<Tool> {}

export { ToolsRepository }
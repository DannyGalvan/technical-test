import { ModuleResponse } from "@/entities/response/module-response";
import { Module } from "@/entities/models/module"


export const ModuleToResponse = (src?: Module): ModuleResponse | undefined => {

    if (!src) return undefined;

    return {
        id: src.id,
        name: src.name,
        description: src.description,
        image: src.image,
        path: src.path,
        state: src.state
    }
}
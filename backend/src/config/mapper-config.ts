import { ModuleToResponse } from "@/mappers/module-mapper";
import { OperationToResponse } from "@/mappers/operation-mapper";
import { RolToResponse } from "@/mappers/rol-mapper";
import { RequestToUser, UserToResponse, UserToUser } from "@/mappers/user-mappers";

const MAPPER_TYPES: Record<string, (src: any) => any> = {
    "RequestToUser": RequestToUser,
    'UserToResponse': UserToResponse,
    'UserToUser': UserToUser,
    'RolToResponse': RolToResponse,
    'OperationToResponse': OperationToResponse,
    'ModuleToResponse': ModuleToResponse,
}

export class AutomapperConfig {
    Map<T, U>(src: T, name: string): U {
        return MAPPER_TYPES[name](src) as U;
    }
}
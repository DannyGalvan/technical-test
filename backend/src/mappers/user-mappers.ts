import { User } from "@/entities/models/user"
import { UserRequest } from "@/entities/request/user-request"
import { UserResponse } from "@/entities/response/user-response"
import { RolToResponse } from "./rol-mapper";

export const RequestToUser = (src: UserRequest): User => {
    const user = new User();

    user.id = src.id!;
    user.rolId = src.rolId!;
    user.name = src.name!;
    user.email = src.email!;
    user.state = src.state ?? true;
    user.password = src.password!;
    user.createdBy = src.createdBy!;
    user.updatedBy = src.updatedBy!;
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return user;
}

export const UserToResponse = (src?: User): UserResponse => {

    if (!src) {
        return undefined!;
    }


    return {
        id: src.id,
        rolId: src.rolId,
        name: src.name,
        email: src.email,
        state: src.state,
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdAt: src.createdAt,
        updatedAt: src.updatedAt,
        rol: RolToResponse(src.rol)
    }
}

export const UserToUser = (src: User): User => {
    return {
        id: src.id,
        rolId: src.rolId,
        name: src.name,
        email: src.email,
        password: src.password,
        state: src.state,
        createdBy: src.createdBy,
        updatedBy: src.updatedBy,
        createdAt: src.createdAt,
        updatedAt: src.updatedAt,
        comparePassword: src.comparePassword,
        salt: src.salt,
        hashPassword: src.hashPassword
    }
}
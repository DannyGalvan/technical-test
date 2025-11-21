import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { Rol } from "@/entities/models/rol";
import { RolRequest } from "@/entities/request/rol-request";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { RolResponse } from "@/entities/response/rol-response";
import { RolRepository } from "@/repository/rol-repository";
import { QueryParamsRequest } from "@/types/types/types.common";
import { RolValidations } from "@/validations/rol-validators/rol-validations";
import { inject, injectable } from "inversify";
import { $ZodIssue } from "zod/v4/core/errors.cjs";

@injectable()
export class RolService {

    constructor(
        @inject(TYPES.RolRepository) private rolRepository: RolRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
        @inject(TYPES.RolValidations) private rolValidations: RolValidations,
    ) { }


    async getAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<RolResponse[]>> {
        const rols = await this.rolRepository.findAll({filters, relations, pageNumber, pageSize, includeTotal});
        return {
            data: rols.data.map(rol => this.mapper.Map(rol, "RolToResponse")),
            message: 'Roles obtenidos exitosamente',
            success: true,
            totalResults: rols.totalResults,
            Error: [],
        };
    }

    async getById(id: number, relations: string): Promise<ApiResponseWithErrors<RolResponse>> {
        const rol = await this.rolRepository.findById(id, relations);

        if (!rol) {
            return {
                data: null,
                message: 'Rol no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(rol, "RolToResponse"),
            message: 'Rol obtenido exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async createRol(rolData: RolRequest): Promise<ApiResponseWithErrors<RolResponse>> {

        const validate = this.rolValidations.create(rolData);

        if (!validate.success) {
            const issues: $ZodIssue[] = validate.error.issues;
            return {
                data: null,
                message: 'Validación fallida',
                success: false,
                totalResults: 0,
                Error: issues.map(issue => ({ code: 'invalid_element', message: issue.message, path: issue.path.join('.') })),
            };
        }

        const rolToCreate = this.mapper.Map<RolRequest, Rol>(rolData, "RequestToRol");

        const createdRol = await this.rolRepository.save(rolToCreate);

        return {
            data: this.mapper.Map(createdRol, "RolToResponse"),
            message: 'Rol creado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async updateRol(id: number, rolData: RolRequest): Promise<ApiResponseWithErrors<RolResponse>> {
        const validate = this.rolValidations.update(rolData);

        if (!validate.success) {
            const issues: $ZodIssue[] = validate.error.issues;
            return {
                data: null,
                message: 'Validación fallida',
                success: false,
                totalResults: 0,
                Error: issues.map(issue => ({ code: 'invalid_element', message: issue.message, path: issue.path.join('.') })),
            };
        }

        const rolToUpdate = this.mapper.Map<RolRequest, Rol>(rolData, "RequestToRol");

        const updatedRol = await this.rolRepository.update(id, rolToUpdate);

        if (!updatedRol) {
            return {
                data: null,
                message: 'Rol no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(updatedRol, "RolToResponse"),
            message: 'Rol actualizado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async deleteRol(id: number): Promise<ApiResponseWithErrors<RolResponse>> {
        const rol = await this.rolRepository.delete(id);

        if (!rol) {
            return {
                data: null,
                message: 'Rol no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(rol, "RolToResponse"),
            message: 'Rol eliminado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }
}
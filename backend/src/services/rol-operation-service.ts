import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { RolOperation } from "@/entities/models/rol-operation";
import { RolOperationRequest } from "@/entities/request/rol-operation-request";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { OperationResponse } from "@/entities/response/operation-response";
import { RolOperationResponse } from "@/entities/response/rol-operation-response";
import { RolOperationRepository } from "@/repository/rol-operation-repository";
import { QueryParamsRequest } from "@/types/types/types.common";
import { RolOperationValidations } from "@/validations/rol-operation-validators/rol-operation-validations";
import { inject, injectable } from "inversify";
import { $ZodIssue } from "zod/v4/core/errors.cjs";

@injectable()
export class RolOperationService {

    constructor(
        @inject(TYPES.RolOperationRepository) private rolOperationRepository: RolOperationRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
        @inject(TYPES.RolOperationValidations) private rolOperationValidations: RolOperationValidations,
    ) { }


    async getAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<RolOperationResponse[]>> {
        const rolOperations = await this.rolOperationRepository.findAll({filters, relations, pageNumber, pageSize, includeTotal});
        return {
            data: rolOperations.data.map(rolOperation => this.mapper.Map(rolOperation, "RolOperationToResponse")),
            message: 'Roles de operación obtenidos exitosamente',
            success: true,
            totalResults: rolOperations.totalResults,
            Error: [],
        };
    }

    async getAllOperations({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<OperationResponse[]>> {
        const operations = await this.rolOperationRepository.findAllOperations({filters, relations, pageNumber, pageSize, includeTotal});
        return {
            data: operations.data.map(operation => this.mapper.Map(operation, "OperationToResponse")),
            message: 'Operaciones obtenidas exitosamente',
            success: true,
            totalResults: operations.totalResults,
            Error: [],
        };
    }

    async getRolOperationById(id: number, relations: string): Promise<ApiResponseWithErrors<RolOperationResponse>> {
        const rolOperation = await this.rolOperationRepository.findById(id, relations);

        if (!rolOperation) {
            return {
                data: null,
                message: 'Rol de operación no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol de operación no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(rolOperation, "RolOperationToResponse"),
            message: 'Rol de operación obtenido exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async create(rolOperationData: RolOperationRequest): Promise<ApiResponseWithErrors<RolOperationResponse>> {

        const validate = this.rolOperationValidations.create(rolOperationData);

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

        const rolOperationToCreate = this.mapper.Map<RolOperationRequest, RolOperation>(rolOperationData, "RequestToRolOperation");

        const createdRolOperation = await this.rolOperationRepository.save(rolOperationToCreate);

        return {
            data: this.mapper.Map(createdRolOperation, "RolOperationToResponse"),
            message: 'Rol de operación creado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async updateRolOperation(id: number, rolOperationData: RolOperationRequest): Promise<ApiResponseWithErrors<RolOperationResponse>> {
        const validate = this.rolOperationValidations.update(rolOperationData);

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

        const rolOperationToUpdate = this.mapper.Map<RolOperationRequest, RolOperation>(rolOperationData, "RequestToRolOperation");

        const updatedRolOperation = await this.rolOperationRepository.update(id, rolOperationToUpdate);

        if (!updatedRolOperation) {
            return {
                data: null,
                message: 'Rol de operación no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol de operación no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(updatedRolOperation, "RolOperationToResponse"),
            message: 'Rol de operación actualizado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async deleteRolOperation(id: number): Promise<ApiResponseWithErrors<RolOperationResponse>> {
        const rolOperation = await this.rolOperationRepository.delete(id);

        if (!rolOperation) {
            return {
                data: null,
                message: 'Rol de operación no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Rol de operación no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(rolOperation, "RolOperationToResponse"),
            message: 'Rol de operación eliminado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }
}
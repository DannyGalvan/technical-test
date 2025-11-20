import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { Expedient } from "@/entities/models/expedient";
import { ExpedientRequest } from "@/entities/request/expedient-request";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { ExpedientResponse } from "@/entities/response/expedient-response";
import { ExpedientRepository } from "@/repository/expedient-repository";
import { ExpedientValidations } from "@/validations/expedient-validators/expedient-validations";
import { inject, injectable } from "inversify";
import { $ZodIssue } from "zod/v4/core/errors.cjs";

@injectable()
export class ExpedientService {

    constructor(
        @inject(TYPES.ExpedientRepository) private expedientRepository: ExpedientRepository,
        @inject(TYPES.Mapper) private mapper: AutomapperConfig,
        @inject(TYPES.ExpedientValidations) private expedientValidations: ExpedientValidations,
    ) { }


    async getAllExpedients(filters: string, relations: string): Promise<ApiResponseWithErrors<ExpedientResponse[]>> {
        const expedients = await this.expedientRepository.findAll(filters, relations);
        return {
            data: expedients.map(expedient => this.mapper.Map(expedient, "ExpedientToResponse")),
            message: 'Expedientes obtenidos exitosamente',
            success: true,
            totalResults: expedients.length,
            Error: [],
        };
    }

    async getExpedientById(id: number, relations: string): Promise<ApiResponseWithErrors<ExpedientResponse>> {
        const expedient = await this.expedientRepository.findById(id, relations);

        if (!expedient) {
            return {
                data: null,
                message: 'Expediente no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Expediente no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(expedient, "ExpedientToResponse"),
            message: 'Expediente obtenido exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async createExpedient(expedientData: ExpedientRequest): Promise<ApiResponseWithErrors<ExpedientResponse>> {

        const validate = this.expedientValidations.create(expedientData);

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

        const expedientToCreate = this.mapper.Map<ExpedientRequest, Expedient>(expedientData, "RequestToExpedient");

        const createdExpedient = await this.expedientRepository.save(expedientToCreate);

        return {
            data: this.mapper.Map(createdExpedient, "ExpedientToResponse"),
            message: 'Expediente creado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async updateExpedient(id: number, expedientData: ExpedientRequest): Promise<ApiResponseWithErrors<ExpedientResponse>> {
        const validate = this.expedientValidations.update(expedientData);

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

        const expedientToUpdate = this.mapper.Map<ExpedientRequest, Expedient>(expedientData, "RequestToExpedient");

        const updatedExpedient = await this.expedientRepository.update(id, expedientToUpdate);

        if (!updatedExpedient) {
            return {
                data: null,
                message: 'Expediente no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Expediente no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(updatedExpedient, "ExpedientToResponse"),
            message: 'Expediente actualizado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }

    async deleteExpedient(id: number): Promise<ApiResponseWithErrors<ExpedientResponse>> {
        const expedient = await this.expedientRepository.delete(id);

        if (!expedient) {
            return {
                data: null,
                message: 'Expediente no encontrado',
                success: false,
                totalResults: 0,
                Error: [{ code: 'invalid_element', message: "Expediente no encontrado", path: "" }],
            };
        }

        return {
            data: this.mapper.Map(expedient, "ExpedientToResponse"),
            message: 'Expediente eliminado exitosamente',
            success: true,
            totalResults: 1,
            Error: [],
        };
    }
}
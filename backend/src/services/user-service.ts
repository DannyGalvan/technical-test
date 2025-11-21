
import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { User } from "@/entities/models/user";
import { UserRequest } from "@/entities/request/user-request";
import { ApiResponseWithErrors } from "@/entities/response/api-response";
import { UserResponse } from "@/entities/response/user-response";
import { UserRepository } from "@/repository/user-repository";
import { QueryParamsRequest } from "@/types/types/types.common";
import { UserValidations } from "@/validations/user-validators/user-validations";
import { injectable, inject } from "inversify";
import { $ZodIssue } from "zod/v4/core/errors.cjs";


@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository,
    @inject(TYPES.Mapper) private mapper: AutomapperConfig,
    @inject(TYPES.UserValidations) private userValidations: UserValidations,
  ) { }

  async getAllUsers({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponseWithErrors<UserResponse[]>> {
    const users = await this.userRepository.findAll({filters, relations, pageNumber, pageSize, includeTotal});
    return {
      data: users.data.map(user => this.mapper.Map(user, "UserToResponse")),
      message: 'Usuarios obtenidos exitosamente',
      success: users.success,
      totalResults: users.totalResults,
      Error: [],
    }
  }

  async getUserById(id: number): Promise<ApiResponseWithErrors<UserResponse>> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }],
      };
    }

    return {
      data: this.mapper.Map(user, "UserToResponse"),
      message: 'Usuario obtenido exitosamente',
      success: true,
      totalResults: 1,
      Error: [],
    };
  }

  async getUserByEmail(email: string): Promise<ApiResponseWithErrors<UserResponse>> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }]
      };
    }
    return {
      data: this.mapper.Map(user, "UserToResponse"),
      message: 'Usuario obtenido exitosamente',
      success: true,
      totalResults: 1,
      Error: [],
    };
  }

  async createUser(userData: UserRequest): Promise<ApiResponseWithErrors<UserResponse>> {
    // Validaciones de negocio
    const validate = this.userValidations.create(userData);

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

    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(userData.email!);

    if (existingUser) {
      return {
        data: null,
        message: 'El email ya está registrado',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "El email ya está registrado", path: "Email" }]
      };
    }

    const userEntity = this.mapper.Map<UserRequest, User>(userData, "RequestToUser");

    const createdUser = await this.userRepository.create(userEntity);

    return {
      data: this.mapper.Map(createdUser, "UserToResponse"),
      message: 'Usuario creado exitosamente',
      success: true,
      totalResults: 1,
      Error: [],
    }
  }

  async updateUser(id: number, userData: UserRequest): Promise<ApiResponseWithErrors<UserResponse>> {

    // Validaciones de negocio
    const validate = this.userValidations.update({ ...userData, id });

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

    const exists = await this.userRepository.exists(id);
    if (!exists) {
      return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }]
      };
    }

    // Si se intenta actualizar el email, verificar que no exista
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser && existingUser.id !== id) {
        return {
          data: null,
          message: 'El email ya está en uso',
          success: false,
          totalResults: 0,
          Error: [{ code: 'invalid_element', message: "El email ya está registrado", path: "Email" }]
        };
      }
    }

    const userEntity = this.mapper.Map<UserRequest, User>(userData, "RequestToUser");

    const updatedUser = await this.userRepository.update(id, userEntity);

    if (!updatedUser) {
      return {
        data: null,
        message: 'Error al actualizar el usuario',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Error al actualizar el usuario", path: "" }]
      };
    }

    return {
      data: this.mapper.Map(updatedUser, "UserToResponse"),
      message: 'Usuario actualizado exitosamente',
      success: true,
      totalResults: 1,
      Error: [],
    };
  }

  async deleteUser(id: number): Promise<ApiResponseWithErrors<null>> {
    const exists = await this.userRepository.exists(id);
    if (!exists) {
      return {
        data: null,
        message: 'Usuario no encontrado',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }]
      };
    }

    const deleted = await this.userRepository.delete(id);

    if (!deleted) {
      return {
        data: null,
        message: 'Error al eliminar el usuario',
        success: false,
        totalResults: 0,
        Error: [{ code: 'invalid_element', message: "Error al eliminar el usuario", path: "" }]
      };
    }

    return {
      data: null,
      message: 'Usuario eliminado exitosamente',
      success: true,
      totalResults: 0,
      Error: [],
    }
  }
}
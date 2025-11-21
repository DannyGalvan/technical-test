
import { TYPES } from "@/config/container-types";
import { AutomapperConfig } from "@/config/mapper-config";
import { Module } from "@/entities/models/module";
import { Operation } from "@/entities/models/operation";
import { RolOperation } from "@/entities/models/rol-operation";
import { User } from "@/entities/models/user";
import { AuthResponse } from "@/entities/request/auth-response";
import { ApiResponse, ApiResponseWithErrors } from "@/entities/response/api-response";
import { Authorizations } from "@/entities/response/autorizations-response";
import { QueryParamsRequest } from "@/types/types/types.common";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";


import { inject, injectable } from "inversify";
import { DataSource, Repository } from "typeorm";


@injectable()
export class UserRepository {
  private repository: Repository<User>;
  private moduleRepository: Repository<Module>;

  constructor(
    @inject(TYPES.DataSource) private dataSource: DataSource,
    @inject(TYPES.FilterTranslator) private filterTranslator: FilterTranslator,
    @inject(TYPES.RelationLoader) private relationLoader: RelationLoader,
    @inject(TYPES.Mapper) private mapper: AutomapperConfig
  ) {
    this.repository = this.dataSource.getRepository(User);
    this.moduleRepository = this.dataSource.getRepository(Module);
  }

  async findAll({filters, relations, pageNumber = 1, pageSize = 10, includeTotal = false} : QueryParamsRequest): Promise<ApiResponse<User[]>> {
    const qb = this.repository.createQueryBuilder("user");
        this.filterTranslator.applyFilter(qb, "user", filters);
        this.relationLoader.applyRelations(qb, "user", relations);

        qb.orderBy("user.id", "DESC");

        const skip = (pageNumber - 1) * pageSize;
        const pagedData = await qb.skip(skip).take(pageSize).getMany();

        if (includeTotal) {
            const [result, total] = await qb.getManyAndCount();
            // You can return total count along with results if needed
            return {
                data: result,
                totalResults: total,
                message: "Expedients retrieved successfully",
                success: true,
            }
        }

        return {
            data: pagedData,
            message: "Expedients retrieved successfully",
            success: true,
            totalResults: skip + pagedData.length + (pagedData.length > pageSize ? 1 : 0), // Approximate total
        };
  }

  async findById(id: number, relations?: string): Promise<User | null> {
     const qb = this.repository.createQueryBuilder("user");
        qb.where("user.id = :id", { id });
        this.relationLoader.applyRelations(qb, "user", relations);
        return qb.getOne();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return this.repository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    userData.updatedAt = new Date();
    userData.id = undefined;
    userData.createdAt = undefined;
    userData.createdBy = undefined;
    await this.repository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<User | null> {
    await this.repository.update(id, { state: false, updatedAt: new Date() });

    return this.repository.findOneByOrFail({ id });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.repository.count({ where: { id } });
    return count > 0;
  }

  async getUserAuthorizations(userId: number): Promise<ApiResponseWithErrors<AuthResponse | null>> {

    const userResponse: ApiResponseWithErrors<AuthResponse | null> = {
      success: false,
      message: '',
      totalResults: 0,
      data: null,
      Error: [],
    }

    const user = await this.repository.findOne({ where: { id: userId }, relations: ["rol"] });

    if (!user) {
      userResponse.message = 'Credenciales inválidas';
      userResponse.success = false;
      userResponse.totalResults = 0;
      userResponse.data = null;
      userResponse.Error = [{ code: 'invalid_element', message: "Usuario no encontrado", path: "" }];
      return userResponse;
    }

    const rolOperations: RolOperation[] = await this.dataSource.getRepository(RolOperation).find({
      where: { rolId: user.rol!.id, state: 1 },
      relations: ["operation"]
    });

    const operationsRol: Operation[] = rolOperations.map(ro => ro.operation!);

    const modules: Module[] = await this.moduleRepository.query(`
      SELECT m.id, m.name, m.description, m.image, m.path, m.state, 
            m.createdAt, m.updatedAt, m.createdBy, m.updatedBy 
      FROM (
        SELECT DISTINCT o.moduleId 
        FROM rol_operations ro 
        INNER JOIN operations o ON o.id = ro.operationId
        WHERE ro.rolId = @0 AND ro.state = @1
      ) AS modIds
      INNER JOIN modules m ON m.id = modIds.moduleId
    `, [user.rolId, 1]);

    const authorizations: Authorizations[] = modules.map(mod => ({
      module: this.mapper.Map(mod, 'ModuleToResponse'),
      operations: operationsRol.filter(op => op.moduleId === mod.id).map(op => this.mapper.Map(op, 'OperationToResponse')),
    }));

    const userResponseSuccess: ApiResponseWithErrors<AuthResponse> = {
      success: true,
      message: 'Usuario autenticado exitosamente',
      Error: [],
      totalResults: 1,
      data: {
        token: '',
        email: user.email,
        name: user.name,
        userId: user.id,
        operations: authorizations,
        rol: user.rolId,
        redirect: false,
      }
    };

    return userResponseSuccess;
  }
}
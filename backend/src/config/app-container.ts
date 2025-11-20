import { Container } from "inversify";
import { DataSource } from "typeorm";
import { TYPES } from "./container-types";

import { UserRepository } from "@/repository/user-repository";
import { UserService } from "@/services/user-service";
import { UserController } from "@/controllers/user-controller";
import { appDataSource } from "@/context/data-source";
import { AutomapperConfig } from "./mapper-config";
import { AuthService } from "@/services/auth-service";
import { JWTService } from "@/services/jwt-service";
import { AuthController } from "@/controllers/auth-controller";
import { AuthMiddleware } from "@/middleware/auth-middleware";
import { UserValidations } from "@/validations/user-validators/user-validations";
import { FilterTranslator } from "@/utils/filter-translator";
import { RelationLoader } from "@/utils/relation-loader";
import { DocumentStatusService } from "@/services/document-status-service";
import { DocumentStatusController } from "@/controllers/document-status-controller";
import { DocumentStatusRepository } from "@/repository/document-status-repository";
import { ExpedientValidations } from "@/validations/expedient-validators/expedient-validations";
import { ExpedientRepository } from "@/repository/expedient-repository";
import { ExpedientService } from "@/services/expedient-service";
import { ExpedientController } from "@/controllers/expedient-controller";
import { TraceabilityRepository } from "@/repository/traceability-repository";


const appContainer = new Container();

// Bind DataSource
appContainer.bind<DataSource>(TYPES.DataSource).toConstantValue(appDataSource);

// Bind repositories
appContainer.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
appContainer.bind<DocumentStatusRepository>(TYPES.DocumentStatusRepository).to(DocumentStatusRepository);
appContainer.bind<ExpedientRepository>(TYPES.ExpedientRepository).to(ExpedientRepository);
appContainer.bind<TraceabilityRepository>(TYPES.TraceabilityRepository).to(TraceabilityRepository);

// Bind services
appContainer.bind<UserService>(TYPES.UserService).to(UserService);
appContainer.bind<JWTService>(TYPES.JWTService).to(JWTService);
appContainer.bind<AuthService>(TYPES.AuthService).to(AuthService);
appContainer.bind<DocumentStatusService>(TYPES.DocumentStatusService).to(DocumentStatusService);
appContainer.bind<ExpedientService>(TYPES.ExpedientService).to(ExpedientService);

// Bind controllers
appContainer.bind<UserController>(UserController).toSelf().inSingletonScope();
appContainer.bind<AuthController>(AuthController).toSelf().inSingletonScope();
appContainer.bind<DocumentStatusController>(DocumentStatusController).toSelf().inSingletonScope();
appContainer.bind<ExpedientController>(ExpedientController).toSelf().inSingletonScope();

// Bind Middlewares
appContainer.bind<AuthMiddleware>(AuthMiddleware).toSelf();

// Bind Validations
appContainer.bind<UserValidations>(TYPES.UserValidations).to(UserValidations);
appContainer.bind<ExpedientValidations>(TYPES.ExpedientValidations).to(ExpedientValidations);

// Bind mappers
appContainer.bind<AutomapperConfig>(TYPES.Mapper).to(AutomapperConfig);

// Bind Utils
appContainer.bind<FilterTranslator>(TYPES.FilterTranslator).to(FilterTranslator);
appContainer.bind<RelationLoader>(TYPES.RelationLoader).to(RelationLoader);


export { appContainer };
import { Expedient } from "@/entities/models/expedient";

const TYPES = {
    // data source
    DataSource: Symbol.for("DataSource"),
    // repositories
    UserRepository: Symbol.for("UserRepository"),
    DocumentStatusRepository: Symbol.for("DocumentStatusRepository"),
    ExpedientRepository: Symbol.for("ExpedientRepository"),
    TraceabilityRepository: Symbol.for("TraceabilityRepository"),
    // services
    UserService: Symbol.for("UserService"),
    JWTService: Symbol.for("JWTService"),
    AuthService: Symbol.for("AuthService"),
    DocumentStatusService: Symbol.for("DocumentStatusService"),
    ExpedientService: Symbol.for("ExpedientService"),
    // mappers
    Mapper: Symbol.for("Mapper"),
    // validations
    UserValidations: Symbol.for("UserValidations"),
    ExpedientValidations: Symbol.for("ExpedientValidations"),
    //utils
    FilterTranslator: Symbol.for("FilterTranslator"),
    RelationLoader: Symbol.for("RelationLoader"),
};

export { TYPES }
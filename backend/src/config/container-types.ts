const TYPES = {
    // data source
    DataSource: Symbol.for("DataSource"),
    // repositories
    UserRepository: Symbol.for("UserRepository"),
    // services
    UserService: Symbol.for("UserService"),
    JWTService: Symbol.for("JWTService"),
    AuthService: Symbol.for("AuthService"),
    // mappers
    Mapper: Symbol.for("Mapper"),
    // validations
    UserValidations: Symbol.for("UserValidations"),
    //utils
    FilterTranslator: Symbol.for("FilterTranslator"),
    RelationLoader: Symbol.for("RelationLoader"),
};

export { TYPES}
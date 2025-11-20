import { Module } from "@/entities/models/module";
import { Operation } from "@/entities/models/operation";
import { Rol } from "@/entities/models/rol";
import { RolOperation } from "@/entities/models/rol-operation";
import { User } from "@/entities/models/user";
import "reflect-metadata";
import { DataSource } from "typeorm";

const appDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "1433", 10),
    database: process.env.DB_NAME,
    synchronize: false,
    logging: ["error", "warn"],
    entities: [
        User,
        Rol,
        Module,
        Operation,
        RolOperation
    ],
    migrations: [],
    migrationsRun: false,
    migrationsTableName: "migrations",
    migrationsTransactionMode: "all",
    extra: {
        trustServerCertificate: true,
        encrypt: false,
    },
});

export { appDataSource };
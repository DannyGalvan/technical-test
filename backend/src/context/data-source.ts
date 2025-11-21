import { DocumentStatus } from "@/entities/models/document-status";
import { Expedient } from "@/entities/models/expedient";
import { ExpedientItem } from "@/entities/models/expedient-item";
import { Module } from "@/entities/models/module";
import { Operation } from "@/entities/models/operation";
import { Rol } from "@/entities/models/rol";
import { RolOperation } from "@/entities/models/rol-operation";
import { Traceability } from "@/entities/models/traceability";
import { User } from "@/entities/models/user";
import "reflect-metadata";
import { DataSource } from "typeorm";

const appDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "sa",
    password: process.env.DB_PASSWORD || 'Galvan2483',
    port: parseInt(process.env.DB_PORT || "1433"),
    database: process.env.DB_NAME || "mp",
    synchronize: false,
    logging: ["error", "warn"],
    entities: [
        User,
        Rol,
        Module,
        Operation,
        RolOperation,
        Expedient,
        ExpedientItem,
        DocumentStatus,
        Traceability,
    ],
    //migrations: ["src/migrations/**/*.ts"],
    migrationsRun: false,
    migrationsTableName: "migrations",
    migrationsTransactionMode: "all",
    extra: {
        trustServerCertificate: true,
        encrypt: false,
    },
});

export { appDataSource };
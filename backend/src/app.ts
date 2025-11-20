import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import { useContainer, useExpressServer } from "routing-controllers";
import { InversifyAdapter } from "./config/inversify-adapter";
import { appContainer } from "./config/app-container";
import { UserController } from "./controllers/user-controller";
import { getSwaggerSpec } from "./config/swagger-config";
import { appDataSource } from "./context/data-source";
import { AuthController } from "./controllers/auth-controller";
import { PolicyCacheOperations } from "./config/policy-cache-operations";
import { Operation } from "./entities/models/operation";
import { DocumentStatusController } from "./controllers/document-status-controller";

// Setup .env variables
dotenv.config();

// Setup constant variables
const PORT = process.env.PORT || 5000;
const RATE_TIME_LIMIT = Number(process.env.RATE_TIME_LIMIT) || 15;
const RATE_REQUEST_LIMIT = Number(process.env.RATE_REQUEST_LIMIT) || 100;

// Init express app
const app = express();

// ===== MIDDLEWARE SETUP =====

// 1. Security Headers (primero)
app.use(helmet());

// 2. CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// 3. Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4. Detailed server logging
app.use(morgan("dev"));

// 5. Rate limiting
app.use(
  rateLimit({
    windowMs: RATE_TIME_LIMIT * 60 * 1000,
    max: RATE_REQUEST_LIMIT,
  })
);

// 6. Secure against param pollutions
app.use(hpp());

// ===== INVERSIFY + ROUTING-CONTROLLERS =====

// Setup InversifyJS container
useContainer(new InversifyAdapter(appContainer));

// Configurar routing-controllers (DESPUÉS de los middlewares básicos)
useExpressServer(app, {
  controllers: [AuthController, UserController, DocumentStatusController],
  defaultErrorHandler: false,
  validation: true,
  cors: false,
  classTransformer: true,
});

// ===== SWAGGER DOCUMENTATION =====

const swaggerSpec = getSwaggerSpec();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
}));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ===== ERROR HANDLER =====

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err);

  const status = err.httpCode || err.status || 500;
  const message = err.message || 'Error interno del servidor';

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      details: err
    }),
  });
});

// ===== SERVER BOOTSTRAP =====

async function bootstrap() {
  try {
    console.log("🔄 Intentando conectar a la base de datos...");

    await appDataSource.initialize();
    console.log("✅ Base de datos inicializada");

    console.log("🔄 Cargando operaciones...");
    const operations = appDataSource.getRepository(Operation);
    const operationList = await operations.find();

    console.log(`📊 Operaciones encontradas: ${operationList.length}`);
    PolicyCacheOperations.push(...operationList);
    console.log("✅ Caché de operaciones de políticas cargada");

    console.log("🔄 Iniciando servidor HTTP...");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📚 Documentación: http://localhost:${PORT}/api-docs`);
    });

  } catch (error) {
    console.error("❌ Error al inicializar:", error);

    // Log más detallado del error
    if (error instanceof Error) {
      console.error("📋 Mensaje:", error.message);
      console.error("🔍 Stack:", error.stack);
    }

    process.exit(1);
  }
}

bootstrap();
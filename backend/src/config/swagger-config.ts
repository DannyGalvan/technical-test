import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

export function getSwaggerSpec() {
  const storage = getMetadataArgsStorage();

  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  });

  const spec = routingControllersToSpec(
    storage,
    {},
    {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'Documentación de la API con TypeORM, Inversify y Routing Controllers',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor de desarrollo',
        },
      ],
      components: {
        schemas,
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    }
  );

  // ⚠️ APLICAR SECURITY MANUALMENTE A TODAS LAS RUTAS EXCEPTO AUTH
  if (spec.paths) {
    Object.keys(spec.paths).forEach((path) => {
      const pathItem = spec.paths![path];

      // Excluir rutas de autenticación (login y register)
      const isAuthPath = path.includes('/auth/login') || path.includes('/auth/register');

      Object.keys(pathItem).forEach((method) => {
        if (['get', 'post', 'put', 'delete', 'patch'].includes(method)) {
          const operation = pathItem[method];

          // Si no es una ruta de auth, aplicar seguridad
          if (!isAuthPath && operation) {
            operation.security = [{ bearerAuth: [] }];
          }
        }
      });
    });
  }

  return spec;
}
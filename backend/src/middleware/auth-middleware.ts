import { injectable, inject } from "inversify";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "@/config/container-types";
import { JWTService } from "@/services/jwt-service";
import { UserRepository } from "@/repository/user-repository";

interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  operations: string[];
}

// Extender el tipo Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

@injectable()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  constructor(
    @inject(TYPES.JWTService) private jwtService: JWTService,
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Obtener token del header
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'No se proporcionó token de autenticación' });
        return;
      }

      const token = authHeader.substring(7); // Remover "Bearer "

      // Verificar token
      const payload = this.jwtService.verifyToken(token);

      // Verificar que el usuario existe
      const user = await this.userRepository.findById(payload.userId);
      if (!user) {
        res.status(401).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Agregar user al request
      req.user = payload;

      next();
    } catch (error) {
      res.status(401).json({ error: 'Token inválido o expirado' });
    }
  }
}
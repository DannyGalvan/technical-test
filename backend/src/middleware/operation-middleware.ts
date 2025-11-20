import { PolicyCacheOperations } from "@/config/policy-cache-operations";
import { Request, Response, NextFunction } from "express";

export function OperationMiddleware(operation: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' });
      return;
    }

    const operationExists = PolicyCacheOperations.find(op => op.policy === operation);

    if (!operationExists) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    if (!req.user.operations.includes(operationExists.guid)) {
      res.status(403).json({ error: 'No tienes permisos para esta acción' });
      return;
    }

    next();
  };
}
import { injectable } from "inversify";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

type Operator = "eq" | "ne" | "gt" | "lt" | "gte" | "lte" | "like" | "in" | "notin";

@injectable()
export class FilterTranslator {
  /**
   * Aplica el filtro al QueryBuilder en base a la sintaxis:
   *  field:op:value  combinados con " AND " y " OR "
   *
   * Ejemplos:
   *  "name:eq:Daniel"
   *  "age:gte:18 AND age:lte:65"
   *  "status:in:ACTIVE,IN_REVIEW"
   */
  applyFilter<TEntity extends ObjectLiteral>(
    qb: SelectQueryBuilder<TEntity>,
    baseAlias: string,
    sqlQuery?: string | null
  ): SelectQueryBuilder<TEntity> {
    if (!sqlQuery || !sqlQuery.trim()) {
      return qb;
    }

    let paramIndex = 0;

    // Separar por AND a nivel superior
    const andParts = sqlQuery.split(/\s+AND\s+/i).filter(Boolean);

    for (const andPart of andParts) {
      // Dentro de cada AND, podemos tener varios OR
      const orParts = andPart.split(/\s+OR\s+/i).filter(Boolean);

      const groupConditions: string[] = [];
      const groupParams: Record<string, any> = {};

      for (const orPart of orParts) {
        const parsed = this.translateSingleCondition(
          orPart.trim(),
          baseAlias,
          paramIndex
        );
        if (!parsed) continue;

        const { condition, params, nextIndex } = parsed;
        paramIndex = nextIndex;

        groupConditions.push(condition);
        Object.assign(groupParams, params);
      }

      if (groupConditions.length === 0) {
        continue;
      }

      // (cond1 OR cond2 OR ...)
      const groupExpr = "(" + groupConditions.join(" OR ") + ")";

      // Primer grupo: andWhere, siguientes: andWhere también (AND entre grupos)
      // params se agregan en cada llamada
      qb.andWhere(groupExpr, groupParams);
    }

    return qb;
  }

  /**
   * Traduce una condición "field:op:value" a una expresión SQL de TypeORM
   * y parámetros.
   *
   * Retorna:
   *  {
   *    condition: "alias.field = :p0",
   *    params: { p0: "Daniel" },
   *    nextIndex: 1
   *  }
   */
  private translateSingleCondition(
    condition: string,
    baseAlias: string,
    paramIndex: number
  ): {
    condition: string;
    params: Record<string, any>;
    nextIndex: number;
  } | null {
    const parts = condition.split(":");
    if (parts.length < 3) {
      // condición mal formada
      return null;
    }

    const field = parts[0].trim();       // "name" o "user.name"
    const op = parts[1].trim().toLowerCase() as Operator;
    const rawValue = parts.slice(2).join(":").trim(); // por si el valor tenía ":" dentro

    // Si el field viene con alias explícito (ej: "profile.name"), lo respetamos
    // Si no, usamos el alias base (ej: "user")
    const propertyPath = field;
    const [maybeAlias, ...rest] = field.split(".");
    let fieldExpression: string;

    if (rest.length > 0) {
      // "profile.name" -> alias "profile"
      fieldExpression = `${maybeAlias}.${rest.join(".")}`;
    } else {
      // "name" -> alias base "user.name"
      fieldExpression = `${baseAlias}.${propertyPath}`;
    }

    const paramName = `p${paramIndex}`;
    const params: Record<string, any> = {};
    let conditionExpr: string;

    switch (op) {
      case "eq":
        conditionExpr = `${fieldExpression} = :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "ne":
        conditionExpr = `${fieldExpression} <> :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "gt":
        conditionExpr = `${fieldExpression} > :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "lt":
        conditionExpr = `${fieldExpression} < :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "gte":
        conditionExpr = `${fieldExpression} >= :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "lte":
        conditionExpr = `${fieldExpression} <= :${paramName}`;
        params[paramName] = rawValue;
        break;

      case "like":
        // Aquí puedes decidir si quieres %value% o value%
        conditionExpr = `${fieldExpression} LIKE :${paramName}`;
        params[paramName] = `%${rawValue}%`;
        break;

      case "in": {
        const values = rawValue.split(",").map(v => v.trim()).filter(Boolean);
        const arrayParam = `${paramName}`;
        // TypeORM: IN (:...param)
        conditionExpr = `${fieldExpression} IN (:...${arrayParam})`;
        params[arrayParam] = values;
        break;
      }

      case "notin": {
        const values = rawValue.split(",").map(v => v.trim()).filter(Boolean);
        const arrayParam = `${paramName}`;
        conditionExpr = `${fieldExpression} NOT IN (:...${arrayParam})`;
        params[arrayParam] = values;
        break;
      }

      default:
        throw new Error(`Operador no soportado: ${op}`);
    }

    return {
      condition: conditionExpr,
      params,
      nextIndex: paramIndex + 1,
    };
  }
}

import { injectable } from "inversify";
import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

@injectable()
export class RelationLoader {
  /**
   * Aplica relaciones a un QueryBuilder usando un string CSV:
   *  ej: "rol,permissions,profile"
   *
   * Se asume que las propiedades se llaman igual en la entidad:
   *  user.rol, user.permissions, user.profile
   */
  applyRelations<TEntity extends ObjectLiteral>(
    qb: SelectQueryBuilder<TEntity>,
    baseAlias: string,
    relationsString?: string | null
  ): SelectQueryBuilder<TEntity> {
    if (!relationsString) {
      return qb;
    }

    const relations = relationsString
      .split(",")
      .map(r => r.trim())
      .filter(Boolean);

    for (const rel of relations) {
      // user.rol, user.permissions ...
      const propertyPath = `${baseAlias}.${rel}`;
      const alias = rel; // alias = "rol", "permissions", etc.

      qb.leftJoinAndSelect(propertyPath, alias);
    }

    return qb;
  }
}

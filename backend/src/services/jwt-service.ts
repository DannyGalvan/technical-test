// src/services/jwt-service.ts
import { injectable } from "inversify";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
  operations: string[];
}

type Unit =
        | "Years"
        | "Year"
        | "Yrs"
        | "Yr"
        | "Y"
        | "Weeks"
        | "Week"
        | "W"
        | "Days"
        | "Day"
        | "D"
        | "Hours"
        | "Hour"
        | "Hrs"
        | "Hr"
        | "H"
        | "Minutes"
        | "Minute"
        | "Mins"
        | "Min"
        | "M"
        | "Seconds"
        | "Second"
        | "Secs"
        | "Sec"
        | "s"
        | "Milliseconds"
        | "Millisecond"
        | "Msecs"
        | "Msec"
        | "Ms";

    type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;

    type StringValue =
        | `${number}`
        | `${number}${UnitAnyCase}`
        | `${number} ${UnitAnyCase}`;

@injectable()
export class JWTService {
  private readonly secret: Secret;
  private readonly expiresIn: StringValue;

  constructor() {
    this.secret = process.env.JWT_SECRET || "your-secret-key-change-in-production";
    this.expiresIn = process.env.JWT_EXPIRES_IN as StringValue || "7d";
  }

  generateToken(payload: JWTPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn,
    };

    return jwt.sign(payload, this.secret, options);
  }

  verifyToken(token: string): JWTPayload {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      throw new Error("Token inválido o expirado");
    }
  }

  decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}
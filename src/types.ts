import { Admin } from "./models/Admin";

export interface JwtAdmin {
  sub: string;
  role: number;
  action: string;
  iat: number;
}

export enum Role {
  User,
  Admin,
}

export interface Auth {
  accessToken: string;
  refreshToken: string;
}

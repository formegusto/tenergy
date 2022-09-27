export type AuthRole = "HOUSEHOLD" | "ADMIN";

export interface IAuth {
  name: string;
  role: AuthRole;
}

declare namespace Express {
  export interface Request {
    auth: {
      _id?: string;
      name: string;
      role: "USER" | "ADMIN";
    };
  }
}

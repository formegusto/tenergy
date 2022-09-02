declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_HOST: string;
      MONGO_PORT: string;
      MONGO_APP: string;
    }
  }
}

export {};

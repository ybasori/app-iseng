declare namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
      PORT?: string;
      NODE_ENV?: 'development' | 'production';
    }
  }
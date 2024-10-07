declare namespace NodeJS {
  export interface ProcessEnv {
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    JWT_SECRET_KEY: string
    JWT_REFRESH_SECRET_KEY: string
    CLIENT_URL: string
  }
}

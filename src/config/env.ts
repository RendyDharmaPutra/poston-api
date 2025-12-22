const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined.`);

  return value;
};

export const env = {
  // Application Environment
  BOT_SECRET: getEnv("BOT_SECRET"),
  JWT_SECRET: getEnv("JWT_SECRET"),

  // Server Environment
  PORT: Number(getEnv("PORT")),

  // Database Environment
  DB_HOST: getEnv("DB_HOST"),
  DB_PORT: Number(getEnv("DB_PORT")),
  DB_USER: getEnv("DB_USER"),
  DB_PASSWORD: getEnv("DB_PASSWORD"),
  DB_NAME: getEnv("DB_NAME"),
  DB_URL: getEnv("DB_URL"),
};

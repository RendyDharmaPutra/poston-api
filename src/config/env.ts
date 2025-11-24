const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Environment variable ${key} is not defined.`);

  return value;
};

export const env = {
  port: Number(getEnv("PORT")),
};

const envVar = (envName: string) => {
  const envValue = process.env[envName];
  if (!envValue) {
    throw new Error(`Environment variable ${envName} is not set`);
  }
  return envValue;
};

export { envVar };

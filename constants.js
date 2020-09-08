export const getConstant = (constant, defaultValue) => {
    return process.env[constant] ?
        process.env[constant] :
        typeof window !== "undefined" &&
        window["bxEnv"] &&
        window["bxEnv"][constant] ?
        window["bxEnv"][constant] :
        defaultValue;
};

export const API_URL = getConstant("API_URL", "http://localhost:3001");
export const TOKEN_KEY = "auth-access-token";
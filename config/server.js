// sees if the server is dev or prod
const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:2222' : 'https://clom.by';
export const database = dev ? "pingpong-accounts-dev" : "pingpong-accounts";



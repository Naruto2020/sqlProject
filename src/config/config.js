import dotenv from "dotenv";

dotenv.config();

// Container for environments
let environments = {};

// Dev environment
environments.dev = {
  'PORT': 3000,
  'envName': 'development'
};

environments.prod = {
  'PORT': process.env.SERVER_PORT,
  'envName': 'production'
};

let currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : '';

// Export the environment
let environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.dev;

// Export environments module
export default  environmentToExport;
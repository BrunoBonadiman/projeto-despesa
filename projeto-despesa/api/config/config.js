var env = process.env.NODE_ENV || 'desenvolvimento';
var config = require('./config.json');
var envConfig = config[env];
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);
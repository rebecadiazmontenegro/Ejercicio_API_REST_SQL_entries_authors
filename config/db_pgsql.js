const { Pool } = require('pg');

require('dotenv').config();
// console.log(process.env);

const isProduction = process.env.NODE_ENV === 'production';


// Datos de conexión
const pool = new Pool({ 
    user: process.env.PG_USER, 
    host: process.env.PG_HOST, 
    database: process.env.PG_DATABASE, 
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: isProduction ? true : false // BBDD local (false) o remota (true)
})

module.exports = pool;
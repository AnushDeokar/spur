const Pool  = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();
const connectionString = process.env.POSTGRES_CONNECTION_STRING;
const pool = new Pool({
    // connectionString: connectionString,
    user: process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE_NAME,
    // ssl: {
    //     rejectUnauthorized: false,
    // },
})

module.exports = pool;
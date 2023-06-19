const Pool  = require('pg').Pool;
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    password:process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DATABASE_PORT,
    database:process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: false,
    },
})

module.exports = pool;


import mysql from 'mysql2/promise';

import dotenv from 'dotenv';

dotenv.config();

const dbs = {
    webivert_app: mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306'),
        waitForConnections: true,
        connectionLimit: 10,
    })
}

export default dbs;
import mysql from 'mysql2/promise';

const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'petla',
  password: 'MKPmkp@844101',
  database: 'thanos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default connectionPool;

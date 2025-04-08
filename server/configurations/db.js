require('dotenv').config({path: "../.env"})
const mssql = require('mssql')



const dbConfig = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT?.toLowerCase() === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERT?.toLowerCase() === 'true',
    },
    pool: {
        max: 10,
        min: 0,
    },
};

console.log('Database Config:', dbConfig); //for debug

const poolPromise = async () => {
    try {
      const pool = await mssql.connect(dbConfig);
      console.log(`Connected to database pool: ${pool}`);
      return pool;
    } catch (err) {
      console.error('Database Connection Failed:', err);
      process.exit(1); //Stop app if DB fails
    }
  };




  //remove eventually
const poolPromise2 = new mssql.ConnectionPool(dbConfig).connect()
.then(pool => {console.log(`Connected to database pool: ${pool}`); return pool})
.catch(err => {
    console.error('Database Connection Failed:', err);
    process.exit(1); // Stop app if DB fails
});


module.exports = {mssql,poolPromise} //exported to index.js and repo
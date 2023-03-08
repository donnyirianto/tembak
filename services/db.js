const mysql = require('mysql2/promise');
const config = require('../config');

const conn =  mysql.createPool(config.db); 

async function query(query, param) {
  const result = await conn.query(query, param) 
  return result
}
async function execute(query) {
  const result = await conn.execute(query) 
  return result

}

async function queryInsert(query,data) {
  try {
    
    await conn.query(query , [data] , (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
    });

    return "Sukses"
  } catch (e) {
    console.log(e)
    return "Gagal"
  } 

} 
module.exports = {
  query, execute,queryInsert
}
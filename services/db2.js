
const query = async (queryx) => {
  try {
      const mysql = require('mysql2/promise'); 
      const config = require('../config');
      const conn =  await mysql.createConnection(config.db2);  
      const result = await conn.query(queryx)
      conn.end()
      return result
    
  } catch (e) {
    console.log(e)
    return "Gagal"
  }
}
 
module.exports = {
  query
}
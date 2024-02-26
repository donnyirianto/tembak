const fs = require('fs');
const conn = require('./services/dbho');
 
const doitBro = async () => {
    try {    
      const data = await conn.query(`select id from information_schema.processlist`);
      console.log(data)
      
    } catch (e) {
      console.log("Sini 2" + e);
    } 
}
 
doitBro()
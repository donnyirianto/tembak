
const runQuery = async (host,user,password,database,port, queryx) => {
  try {
      const mysql = require('mysql2/promise');
      const dbnya = { /* don't expose password or any sensitive info, done only for demo */
          host: host,
          user: user,
          password: password,
          database: database,
          port: port,
          dateStrings:true,
          multipleStatements: true
      }

      const conn =  await mysql.createConnection(dbnya);  
      const [result] = await conn.query(queryx)
      conn.end()
      
      return {
        status: "OK",
        data:result
      }
    
  } catch (error) { 
    
    return {
      status: "NOK",
      data: error
    }
  }
}


const zconnTembak = async (host,user,password,database,port, queryx) => {
  try {
      const mysql = require('mysql2/promise');
      const dbnya = { /* don't expose password or any sensitive info, done only for demo */
          host: host,
          user: user,
          password: password,
          database: database,
          port: port,
          dateStrings:true,
          multipleStatements: true
      }

      const conn =  await mysql.createConnection(dbnya); 
      
      await conn.query(queryx)
      conn.end()
      return "Sukses"
    
  } catch (e) {
    //console.log(e)
    return "Gagal"
  }
}


const zconnTembakMany = async (host,user,password,database,port, query1,query2,query3,query4,query5,query6,query7) => {
  try {
      const mysql = require('mysql2/promise');
      const dbnya = { /* don't expose password or any sensitive info, done only for demo */
          host: host,
          user: user,
          password: password,
          database: database,
          port: port,
          dateStrings:true,
          multipleStatements: true
      }

      const conn =  await mysql.createConnection(dbnya); 
      
      await conn.query(`${query1}`)
      conn.end()
      return "Sukses"
    
  } catch (error) {
    //console.log(error)
    return "Gagal"
  }
}


const zconn_array = async (host,user,password,database,port, queryx) => {
  try {
      const mysql = require('mysql2/promise');
      const dbnya = { /* don't expose password or any sensitive info, done only for demo */
          host: host,
          user: user,
          password: password,
          database: database,
          port: port,
          dateStrings:true,
          multipleStatements: true,
          rowsAsArray: true
      }

      const conn =  await mysql.createConnection(dbnya);  
      const [result] = await conn.query(queryx)
      conn.end()
      return result
    
  } catch (error) { 
    return "Gagal"
  }
}

module.exports= {
  runQuery, zconnTembak, zconnTembakMany,zconn_array
}
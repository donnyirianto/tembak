// Dependencies
var mysql   = require('mysql')
module.exports = async (params) => new Promise(
    (resolve, reject) => {
      const connection = mysql.createConnection(params);
      connection.connect(error => {
          if (error) {
            reject("None");
        }
        resolve(connection);
        //resolve("Koneksi Sukses");
      })
    });

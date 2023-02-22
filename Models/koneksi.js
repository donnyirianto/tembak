 
var mysql = require('mysql'); 

var connection = mysql.createPool({

	connectionLimit : 10, //important 
	host: "192.168.131.71",
	user: "root",
	password: "n3wbi323m3d",
	database: "realtime", 
	debug    :  false
  });
  

module.exports = connection;
 
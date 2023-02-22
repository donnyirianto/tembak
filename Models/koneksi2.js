 
var mysql = require('mysql'); 

var connection2 = mysql.createPool({	
	connectionLimit : 10000,
	port: 3306,
	host: "192.168.131.71",
	user: "root",
	password: "n3wbi323m3d",
	database: "realtime", 
	debug    :  false
});  
    
module.exports = connection2;
 
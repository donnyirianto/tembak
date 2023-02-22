// Dependencies
var mysql   = require('mysql')
/*
 * @selectData
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var selectData = function selectData(sql, ip, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createConnection({
        port: 3306,
        host: ip,
        user: "root",
        password: "N8rM5RmJYbKGbEFWuvuSb6bauDFB3BPTc=zOMd2onoNJ",
        //rooot
        //Baru: 5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4
        //lama: N8rM5RmJYbKGbEFWuvuSb6bauDFB3BPTc=zOMd2onoNJ
        
        //kasir
        //password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn",
        //password: "JuYKMvPfECnqkqzxINTEzELpzK/c31FA8=1Y5Phizfi5",
        database: "pos"});

    connection.connect(function(err) {
        if (err !== null) {
            //console.log("[MYSQL] Error connecting to Toko:" + ip +" ||| "+ err+'\n');
        }
    });

    connection.query(sql, ip, values, function(err) {

        connection.end(); // close the connection 
        
        next.apply(this, arguments);

    }); 
     
}

module.exports = selectData;
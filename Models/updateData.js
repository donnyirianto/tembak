// Dependencies
var mysql   = require('mysql')
/*
 * @insertData
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var updateData = function updateData(sql, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createConnection({
        port: 3306,
        host: "192.168.131.50",
        user: "root",
        password: "",
        database: "management_co"});
    connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }
    });

    connection.query(sql, values, function(err) {

        connection.end(); // close the connection

        if (err) {
            throw err;
        }

        // Execute the callback
        next.apply(this, arguments);

    });
}

module.exports = updateData;
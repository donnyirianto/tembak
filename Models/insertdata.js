// Dependencies

var connection2 = require('./koneksi2'); 
/*
 * @insertData
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var insertData = function insertData(sql, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }
 
/*      connection.connect(function(err) {
        if (err !== null) {
            //console.log("[MYSQL] Error connecting to 71: Soko wekku " + err+'\n');
        }
    });
 */
    connection2.query(sql, values, function (error) {
        if (error) throw error;
        next.apply(this, arguments);
    }); 
}

module.exports = insertData;
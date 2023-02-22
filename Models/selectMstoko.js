// Dependencies
//var connection = require('./koneksi'); 
var connection = require('./koneksi'); 
/*
 * @insertData
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
var selectMstoko = function selectmastertoko(sql, values, next) {

    // It means that the values hasnt been passed
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

  /*   connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting DB IP :" + err+'\n');
        }
    });
      */
    
    connection.query(sql, values, function(err) {

            //connection.end(); // close the connection 
            // Execute the callback
            if(err){
                throw err;
            }
            //console.error('err thrown: ' + err);
            next.apply(this, arguments);

        });  
     
    
}

module.exports = selectMstoko;
const fs = require('fs');
const venvLocal = require('./Models/venvLocal');
const vquery = require('./Models/vquery');
const connection = require('./Models/zconn');
 

process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 

const deleteFile = (filePath) => {
  // Unlink the file.
  fs.unlink(filePath, (error) => {
    if (!error) {
       return "Sukses Hapus"
    } else {
      return "Gagal Hapus"
    }
  })
};
const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)   
      while(true){         
          (async ()=>{
              try{  
                deleteFile('./data.txt');    
                const fileReport = fs.createWriteStream("data.txt");   
                fileReport.once('open', async function(fd) {      
                
                  const qtoko = "SELECT * FROM zarvi.ip order by kdtk "  

                  const conn = await connection(venvLocal).catch(e => {console.log("Sini coy:"+ e)}) 
                  const results = await vquery(conn, qtoko).catch( e =>{console.log("Sini coy2:"+ e)});
                //for (const r of results) {  
                  results.forEach( async (r) => {                  
                    const c = {port: 3306,host: r.ip1, user: "kasir",password: "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ", database: "pos", multipleStatements: true, dateStrings:true}                
                    //const c = {port: 3306,host: r.ip1, user: "root",password: "N8rM5RmJYbKGbEFWuvuSb6bauDFB3BPTc=zOMd2onoNJ", database: "pos", multipleStatements: true, dateStrings:true}                
                    const c2 = {port: 3306,host: r.ip1, user: "kasir",password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn", database: "pos", multipleStatements: true, dateStrings:true}                
                    const conn_toko = await connection(c).catch( async (e) => {
                      try {
                        const connx = await connection(c2);
                        return connx
                      } catch (error) {
                        return "None";                        
                      }
                    }) 
                    if(conn_toko === "None"){
                      console.log(r.kdtk +":"+conn_toko)
                    }else{
                      console.log(r.kdtk +": Sukses")
                    }
                    //const queryTembak = "insert ignore into const() values('', 'EPB', 'PBSL', 0, 0, '2013-05-13', '2013-05-13', '', '', '', '2021-03-15 00:33:18', '', '2021-03-15 00:33:18');"
                    /* if(conn_toko != "None"){
                      const queryTembak = "DELETE from vir_bacaprod where jenis='SKIP_ODBC';"
                      const rv = await vquery(conn_toko, queryTembak).catch(e=>{ })
                      
                      if(rv === "Gagal"){
                        console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Query')
                        return true
                      }else{
                        console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                        
                      }  
                    }else{
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Koneksi')
                    } */
                    
                  }) 
                })
              }catch(err){
                console.log("Error1 : " + err) 
                return false
              }

          })(); 
        await sleep(120000)            
      }
    } catch (e) {
      console.log("Error2" + e);
      //doitBro()
    } 
}
 
doitBro()
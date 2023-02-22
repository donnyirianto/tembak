const { Console } = require('console');
const fs = require('fs');
const venvLocal = require('./Models/venvLocal');
const vquery = require('./Models/vquery');
const connection = require('./Models/zconn');
const Models = require('./modelsnew/model')


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
     
      while(true){         
          (async ()=>{
              try{   
                  console.log("Running At : " +  new Date())   
                  const results = await Models.getListIpMultidc();

                  results.forEach( async (r) => { 
                    // ANCHOR ===============Query Ambil Data =========================  

                    const queryTembak = `select count(*) as total from (
                      SELECT * FROM MSTRAN WHERE RTYPE='BPB' AND ADDID LIKE '%NPBG030%' AND DATE(BUKTI_TGL) = CURDATE()
                      HAVING TIMEDIFF(NOW(), BUKTI_TGL) > '01:01'
                      ) x;`
                    
                    const rv = await Models.vquery(r.ip1, queryTembak) 
                    if(rv === "G" || rv === "Gagal" ){
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                    }else{
                        if(rv[0].total > 0){
                          console.log(r.kdtk +'|'+ r.kdcab +'|Sudah BPB|')  
                          const queryTembakx= `
                          CREATE TABLE IF NOT EXISTS SPDMAST_BCK_DD01_ASLI select * from spdmast;
                          CREATE TABLE IF NOT EXISTS SPDMAST_BCK_DD01 select * from spdmast WHERE SUPCO !='G102' GROUP BY PRDCD;
                          UPDATE SPDMAST_BCK_DD01 SET SUPCO='G177';
                          DELETE From spdmast WHERE SUPCO !='G102';
                          INSERT ignore INTO spdmast SELECT * FROM SPDMAST_BCK_DD01;
                          `
                          await Models.vqueryTembak(r.ip1, queryTembakx) 
                          await Models.updateFlag(r.kdtk)  
                          
                        }else{
                          console.log(r.kdtk +'|'+ r.kdcab +'|Belum BPB|')                        
                        }
                    } 
                  }) 
                 
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(300000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
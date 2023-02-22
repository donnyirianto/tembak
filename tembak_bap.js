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
      const start = new Date();
      console.log("Running At : " + start)   
      while(true){         
          (async ()=>{
              try{   
                  fs.appendFile('data.txt',"let Donny = [", errx => {
                    if (errx) {
                      console.log("error Tulis File")
                      return true
                    } 
                  })     
                  const results = await Models.getListIpBap();

                  results.forEach( async (r) => { 
                    // ANCHOR ===============Query Ambil Data =========================  
                    if(r.keterangan === "BAP"){
                      const queryTembak = `
                      UPDATE PRODMAST SET 
                      RECID='',
                      FLAGPROD = CONCAT(FLAGPROD, ', BAP=Y') , 
                      PTAG='', CTGR='XX', 
                      STATUS_RETUR='PT'
                      WHERE PRDCD = '${r.prdcd}'
                      `
                      const rv = await Models.vqueryTembak(r.ip1, queryTembak)
                      if(rv === "Gagal"){
                        console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                      }else{                       
                          console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                      }
                    }else{
                      const queryTembak = `
                      UPDATE PRODMAST SET 
                      RECID='',
                      PTAG='', CTGR='XX', 
                      STATUS_RETUR='RT'
                      WHERE PRDCD = '${r.prdcd}'
                      `
                      const rv = await Models.vqueryTembak(r.ip1, queryTembak)
                      if(rv === "Gagal"){
                        console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                      }else{                       
                          console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                      }
                    }
                   
                   
                  }) 
              
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(3600000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
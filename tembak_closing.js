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
                   
                    
                  const results = await Models.getListIp();

                  results.forEach( async (r) => { 
                    
                    // ANCHOR ===============Query Ambil Data 
                   
                  const queryTembakx= `
                  update const set docno= 202206 where rkey='PRD' and docno!= '202206';
                  update initial set recid='C'  where tanggal BETWEEN '2022-07-01' and '2022-07-29';
                  insert ignore into bln_akt () values 
                  ('', '2022', '07', '202207202206202203', '2022-02-11');
                  `
                  
                  const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

                    //const rv= await Models.vqueryTembak(r.ip1, `SET GLOBAL max_allowed_packet=1073741824;`)
                   if(rv === "Gagal"){
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                    }else{                       
                        console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|' + r.ip1)
                    }
                    
                  })
                 
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(360000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
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
                    // ANCHOR ===============Query Ambil Data =========================  
                   //const depan = r.kdtk.substring(0,1)
                   //const blkg = r.kdtk.substring(1,4)
                            //
                    const rv = await Models.ftpdel(r.IP_STB, `/AUTOUPD/Backoffkardusnetv20.zip`)
                    //const rv = await Models.ftpcek(r.ip2, `/INPUT/DT31723${depan}.${blkg}`)
                    //if(rv === "Gagal"){
                      //console.log(r.kdtk +'|'+ r.kdcab +'|Tidak Ada') 
                    //}else{                       
                        console.log(r.kdtk +'|'+ r.kdcab +'|'+ rv)
                    //} 
                    
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
const { Console } = require('console');
const fs = require('fs'); 
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
            
            var start = new Date();
            console.log("Running At : " + start)   
              try{   
                  
                  const results = await Models.getListIpPASSTOKO();

                  results.forEach( async (r) => {  
                    
                  const queryTembakx= `  
                    UPDATE PASSTOKO SET PASS = '${r.passwordtoko}' where nik = '${r.nik}';
                  `
  
                    const rvx = await Models.vqueryTembak(r.ip1, queryTembakx)      
                    if(rvx === "Gagal"){
                      await Models.updateFlag3(r.kdtk)  
                      console.log(r.kdtk +'|'+ r.kdcab +'|Tembak|Gagal|')
                    }else{
                      await Models.updateFlag(r.kdtk)  
                      console.log(r.kdtk +'|'+ r.kdcab +'|Tembak|Sukses|')
                       
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
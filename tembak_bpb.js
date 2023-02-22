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
                  
                  const results = await Models.getListIpBpb();

                  results.forEach( async (r) => {  
                    
                  const queryTembakx= `  
                  select * from mstran where rtype='BPB' AND PRDCD = '${r.prdcd}' AND BUKTI_NO='${r.docno}' AND INVNO='${r.invno}' AND ISTYPE='${r.istype}' into outfile 'mstran_${r.prdcd}${r.istype}${r.docno}';
                  DELETE FROM mstran where rtype='BPB' AND PRDCD = '${r.prdcd}' AND BUKTI_NO='${r.docno}' AND INVNO='${r.invno}' AND ISTYPE='${r.istype}';
                  ` 
                  
                  const rv = await Models.vquery(r.ip1, queryTembakx) 
                  
                   if(rv === "Gagal"){
                      await Models.updateFlag3(r.kdtk)  
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                    }else{      
                        await Models.updateFlag4(r.kdtk)  
                        console.log(r.kdtk +'|'+ r.kdcab +'|Toko Sukses|')
                         
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
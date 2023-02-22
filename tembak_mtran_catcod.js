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
                  
                  const results = await Models.getListIpCatcodSudah();

                  results.forEach( async (r) => {  
                    
                    const queryTembakx= ` 
                    CREATE TABLE IF NOT EXISTS D_BCK_MTRAN_TODAY SELECT * FROM MTRAN WHERE TANGGAL=CURDATE(); 
                    UPDATE MTRAN A, PRODMAST B SET A.CATCODE = B.CAT_COD
                    WHERE A.PLU = B.PRDCD
                    AND A.TANGGAL = '2021-09-21'
                    AND LENGTH(A.CATCODE) != 6;
                    `
  
                    const rv = await Models.vquery(r.ip1, queryTembakx) 
                    
                    if(rv === "Gagal"){ 
                      
                        await Models.updateFlag4(r.kdtk, 'BELUM');
                        console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                      }else{     
                          await Models.updateFlag4(r.kdtk, 'SUKSES');
                          console.log(r.kdtk +'|'+ r.kdcab +'|SUKSES UDPATE')
                            
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
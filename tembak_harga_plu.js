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
      const start = new Date();
      console.log("Running At : " + start)   
      while(true){         
          (async ()=>{
              try{   

                  const results = await Models.getListIpTembakHarga();

                  /* UPDATE PRODMAST a, donny_bck_prod b set  a.PRICE = b.price 
                  where a.prdcd = b.prdcd and a.prdcd = '${r.prdcd}';
                  */
                  results.forEach( async (r) => {  

                  const queryTembakx= `
                   UPDATE stmast set \`max\` = 0 where prdcd in('${r.plu}');
                  `
                  
                  const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

                    //const rv= await Models.vqueryTembak(r.ip1, `SET GLOBAL max_allowed_packet=1073741824;`)
                   if(rv === "Gagal"){
                      console.log(r.kdtk +'|'+ r.kdcab +'|'+ r.plu +'|Gagal') 
                    }else{                       
                        console.log(r.kdtk +'|'+ r.kdcab +'|'+ r.plu  +'| Sukses|')
                    }
                    
                  }) 
                 
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(36000000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
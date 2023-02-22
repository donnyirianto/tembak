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
                deleteFile('./data.txt');    
                const fileReport = fs.createWriteStream("data.txt");   
                fileReport.once('open', async function(fd) { 
                  fs.appendFile('data.txt',"let Donny = [", errx => {
                    if (errx) {
                      console.log("error Tulis File")
                      return true
                    } 
                  })     
                  const results = await Models.getListIpTembakHarga();

                  /* UPDATE PRODMAST a, donny_bck_prod b set  a.PRICE = b.price 
                  where a.prdcd = b.prdcd and a.prdcd = '${r.prdcd}';
                  */
                  results.forEach( async (r) => {  

                  const queryTembakx= `
                  update prodmast set price = '${r.harga}' where prdcd = '${r.plu}';
                  delete from ptag where  prdcd = '${r.plu}';
                  update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
                  update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
                  update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
                  update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM';
                  
                  `
                  
                  const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

                    //const rv= await Models.vqueryTembak(r.ip1, `SET GLOBAL max_allowed_packet=1073741824;`)
                   if(rv === "Gagal"){

                        console.log(r.kdcab +'|'+ r.kdtk+'|'+ r.plu +'| Gagal|')
                    }else{                       
                        await Models.updateFlagx(r.kdtk,r.plu)
                        console.log(r.kdcab +'|'+ r.kdtk+'|'+ r.plu +'| Sukses|' )
                    }
                    
                  }) 
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
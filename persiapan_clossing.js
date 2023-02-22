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

      deleteFile('./data.txt');    
      const fileReport = fs.createWriteStream("data.txt");   
      fileReport.once('open', async function(fd) { 
        fs.appendFile('data.txt',"let Donny = [", errx => {
          if (errx) {
            console.log("error Tulis File")
            return true
          } 
          return true
        })     
        const results = await Models.getListIpPersiapanClossing();


        results.forEach( async (r) => { 
          
          const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
          (select DOCNO from const where rkey='PRD') as const_prd,
          (select sum(begbal) as t_begbal from stmast) as begbal, 
          (select sum(saldo_akh) from ${r.kdtk}2109) as saldo_akh,
          (select bln_sls from bln_akt where tahun='2021' and bulan = '10') as bln_akt;
          `; 

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
             
            //const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
         /*   
            fs.appendFile('data.txt',a, errx => {
              if (errx) {
                console.log(r.kdtk +'|'+ r.kdcab +'|Gagal')
                return true
              }else{
                console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                return true
              }
              
            }) */

              const insertData = await Models.insertDataPersiapanClossing(r.kdcab, r.kdtk, r.nama, rv ) 
              console.log(r.kdtk +'|'+ r.kdcab +'|'+insertData) 

          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
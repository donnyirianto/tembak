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
        const kdcabx = "'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305'"
        const results = await Models.getListIpPromo(kdcabx); 

        results.forEach( async (r) => { 
          
          const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
          sumber,
          (select UPDTIME from const where rkey='dta') AS dta,
          (select  sum(if(itemsyarat like '&',1,0)) from promo_matriks where kodepromo in('HSFL01WW')) as itemsyarat_ww,
          (select sum(if(itemsyaratori like '&',1,0)) from promo_matriks where kodepromo in('HSFL01WW')) as itemsyaratori_ww,
          (select sum(if(itemsyarat like '&',1,0)) from promo_matriks where kodepromo in('HSFL01WX')) as itemsyarat_wx,
          (select sum(if(sum(if(itemsyaratori like '&',1,0)) like '&',1,0)) from promo_matriks where kodepromo in('HSFL01WX')) as itemsyaratori_wx
          from promo_matriks GROUP BY sumber;
          `; 


          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
             
              const insertData = await Models.insertDataPromo(r.kdcab, r.kdtk, r.nama, rv ) 
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
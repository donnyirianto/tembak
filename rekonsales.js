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
        const results = await Models.getListIpRekon();


        results.forEach( async (r) => { 
          
          const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
            SHOP,
            TANGGAL AS WDATE,
            SUM(IF(RTYPE='J',GROSS,0)) AS TJUALN,
            SUM(IF(RTYPE='D',GROSS,0)) AS TRETN,
            SUM(IF(RTYPE='J',IF(SUB_BKP NOT IN ('P','W','G'),PPN,0),IF(SUB_BKP NOT IN ('P','W','G'),PPN*-1,0))) AS TPPN,            
            SUM(IF(RTYPE='J',(QTY*HPP),(-QTY)*HPP)) AS THPP,
            SUM(IF(RTYPE='J',GROSS-PPN,0)) AS TJUAL,
            SUM(IF(RTYPE='D',GROSS-PPN,0)) AS TRET,
            SUM(IF(RTYPE='J',QTY,0)) AS JQTY,
            SUM(IF(RTYPE='D',QTY,0)) AS DQTY,
            SUM(IF(RTYPE='J',IF(SUB_BKP IN ('P','W','G'),PPN,0),IF(SUB_BKP IN ('P','W','G'),PPN*-1,0))) AS BBS_PPN
            FROM MTRAN
            WHERE PLU NOT IN ('20052297','20052298','20052299','20052300','20052301','20052302','20054875','20054876','20054877','20054878','20054879','20054880')
            AND (CATCODE NOT LIKE ('55%') AND CATCODE NOT LIKE ('055%') AND 
            CATCODE NOT IN('54901','54902','54005','054901','054902','054005')) 
            AND MONTH(TANGGAL)='06'
            and tanggal < curdate() 
            GROUP BY TANGGAL
          `; 

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
             
              const insertData = await Models.insertData(r.kdcab, r.kdtk, r.nama, rv ) 
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
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
      fileReport.once('open', async function() { 
        fs.appendFile('data.txt',"let Donny = [", errx => {
          if (errx) {
            console.log("error Tulis File")
            return true
          } 
          return true
        })     
        const results = await Models.getListIpIns();

        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `SELECT '${r.kdcab}' AS KDCAB, KDTK, CLASS_TK, SUBCLASS_TK AS SUB_CLASS, SPD, GROWTH_SPD, STD, SPD_RTE_RTD, SPD_PERISHABLE, APC, ISS, NKLALL, NKLALL_RP, NKL_DRY, NKL_PERISHABLE, NBR_DRY, NBR_RTE_RTD, NBR_PERISHABLE, GROSS_MARGIN, SALES_ALL, SALES_DRY, SALES_PERISHABLE, SALES_RTE_RTD, JML_HARI_BUKA, STD_RAW, NBR_RTE_RTD_RAW, NBR_DRY_RAW, 
          '2212' AS PERIODE
          FROM
          (SELECT ' ' EMBIK,KDTK,CLASS_TK,SUBCLASS_TK FROM TOKO) A
          LEFT JOIN
          (Select ' ' EMBIK,SUM(IF(RKEY='SPD',NILAI,0)) SPD ,
          SUM(IF(RKEY='GROWTH_SPD',NILAI,0)) GROWTH_SPD ,
          SUM(IF(RKEY='STD',NILAI,0)) STD ,
          SUM(IF(RKEY='SPD_RTE_RTD',NILAI,0)) SPD_RTE_RTD ,
          SUM(IF(RKEY='SPD_PERISHABLE',NILAI,0)) SPD_PERISHABLE ,
          SUM(IF(RKEY='APC',NILAI,0)) APC ,
          SUM(IF(RKEY='ISS',NILAI,0)) ISS ,
          SUM(IF(RKEY='NKLALL',NILAI,0)) NKLALL ,
          SUM(IF(RKEY='NKLALL_RP',NILAI,0)) NKLALL_RP ,
          SUM(IF(RKEY='NKL_DRY',NILAI,0)) NKL_DRY ,
          SUM(IF(RKEY='NKL_PERISHABLE',NILAI,0)) NKL_PERISHABLE ,
          SUM(IF(RKEY='NBR_DRY',NILAI,0)) NBR_DRY ,
          SUM(IF(RKEY='NBR_RTE_RTD',NILAI,0)) NBR_RTE_RTD ,
          SUM(IF(RKEY='NBR_PERISHABLE',NILAI,0)) NBR_PERISHABLE ,
          SUM(IF(RKEY='GROSS_MARGIN',NILAI,0)) GROSS_MARGIN ,
          SUM(IF(RKEY='SALES_ALL_PRODUK',NILAI,0)) SALES_ALL ,
          SUM(IF(RKEY='SALES_DRY',NILAI,0)) SALES_DRY ,
          SUM(IF(RKEY='SALES_PERISHABLE',NILAI,0)) SALES_PERISHABLE ,
          SUM(IF(RKEY='SALES_RTE_RTD',NILAI,0)) SALES_RTE_RTD ,
          SUM(IF(RKEY='JML_HARI_BUKA',NILAI,0)) JML_HARI_BUKA ,
          SUM(IF(RKEY='STD_RAW',NILAI,0)) STD_RAW ,
          SUM(IF(RKEY='NBR_RTE_RTD_RAW',NILAI,0)) NBR_RTE_RTD_RAW ,
          SUM(IF(RKEY='NBR_DRY_RAW',NILAI,0)) NBR_DRY_RAW
           FROM ASAM_BULAN WHERE PERIODE='202212') B
          ON A.EMBIK=B.EMBIK;`

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
             
              const insertData = await Models.insertDataIns(rv ) 
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
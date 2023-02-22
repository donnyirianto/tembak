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
        const results = await Models.getListIpRRAK();


        results.forEach( async (r) => { 
          // (select  Min(create_time) AS Creation_time from information_schema.tables where table_schema = 'POS') AS tgl_install,
          //group_concat(periode) as periode_rrak, count(*)total_item from rrak_rrak where periode like '2021%';
          //`; 
          /* const queryTembak = `SELECT  *, '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko
          from rrak_trend;
          `;  */

          const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.nama}' as nama_toko, '' WRCID,'SJF' WDOTP,1 AS WSQNO,CAST(R.SEQ AS CHAR) WRCSQ,R.PERIODE AS  WPSDAP ,DATE_FORMAT(R.TGLBUAT,'%d-%m-%Y')  AS WTRDAD, M.KETER AS WDESC,R.ACCOUNT WDRAC, '' AS WDRCO,'11520' AS WCRAC,'' WCRCO, CAST(R.QTYREAL AS CHAR) WCUAM,R.RPREAL AS WRPAM,'' WDUDAD,'' WRFLG,
(SELECT KDTK FROM TOKO) AS KDTK,DATE_FORMAT(R.TGLBUAT,'%d-%m-%Y') as TGLUPD,
DATE_FORMAT(R.TGLBUAT,'%H:%i:%S') as JAMUPD, 'trf' as USRUPD  from
rrak_RRAK R left outer join rrak_mrrak M on R.Account=m.account and r.seq=m.seq
where r.periode in(202101,202102,202103,202104,202105)
and r.fvalid='TRUE' and concat(R.ACCOUNT+'-'+R.SEQ)<>'52108-1';`

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
             
              const insertData = await Models.insertDataRRAKData(r.kdcab, r.kdtk, r.nama, rv ) 
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
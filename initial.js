const fs = require('fs'); 
const Models = require('./modelsnew/model') 
process.setMaxListeners(0);  

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    

    
      const fileReport = fs.createWriteStream("data.txt");   
      fileReport.once('open', async function(fd) { 
        fs.appendFile('data.txt',"let Donny = [", errx => {
          if (errx) {
            console.log("error Tulis File")
            return true
          } 
          return true
        })     
        const kodecabang = `'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305','G232','G224'`
        const results = await Models.getListIpInitial(kodecabang); 

        results.forEach( async (r) => { 
          
          const queryTembak = `SELECT  
          (select kirim from toko) as kdcab, 
          (select toko from toko) as kdtk, 
          (select nama from toko) as nama_toko,
          cast(ifnull(A.TANGGAL,'0000-00-00') as char) as TANGGAL,A.STATION, A.SHIFT,A.NIK,A.KASIR_NAME,A.TRN_START, A.TOTAL_SHIFT, B.STRUK_AWAL,B.TOTAL 
          from 
          (select TANGGAL,STATION,SHIFT,NIK,KASIR_NAME,TRN_START,count(*) as TOTAL_SHIFT
          FROM INITIAL WHERE TANGGAL=CURDATE() and recid = '' AND STATION<>'I1' and trn_start>='04:00' order by trn_start asc limit 1) A
          left join 
          (select TANGGAL,SHIFT,STATION, min(jam) AS STRUK_AWAL,count(*) AS TOTAL FROM MTRAN WHERE TANGGAL=CURDATE() GROUP BY STATION,SHIFT) B
          ON CONCAT(A.STATION,A.SHIFT) = CONCAT(B.STATION, B.SHIFT);
          `; 

          const rv = await Models.vquery(r.IP_INDUK, queryTembak)
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.TOKO +'|'+ r.KDCAB +'|Gagal', rv) 
          }else{
              const insertData = await Models.insertDataInitial(r.KDCAB, r.TOKO, r.NAMA, rv ) 
              console.log(r.TOKO +'|'+ r.KDCAB +'|'+insertData) 
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 

doitBro()


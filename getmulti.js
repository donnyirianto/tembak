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
        //LIST IP ADA DI Folder Modelsnew/models/ cari function getListIp()
        const results = await Models.getListIpMultidc2();
 
        results.forEach( async (r) => { 
          
         //const queryTembak = "SELECT  '"+r.kdcab+"' as kdcab, '"+r.kdtk+"' as kdtk,'"+r.nama+"' as nama_toko,prdcd, max as pkm from stmast where prdcd in('20036130','20036135','20036239','20046368','20052758','20053745','20066299','20069202','20069566','20069567','20074000','20074001','20074004','20076737','20084959','20088711','20092368','20102838','10003517','10004906','10021010','20009737');"
         //select table_schema as Database_name, Min(create_time) AS Creation_time
        //from information_schema.tables where table_schema = 'POS' group by table_schema
        //from program_setting where program like '%realt%' and jenis = 'INTERVALGETTASK';
        //HAVING TIMEDIFF(NOW(), BUKTI_TGL) > '01:01'
         const queryTembak = `SELECT '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
         (select group_concat(CONCAT(kode_dc,'-',TYPE_DC)) from dcmast) as dcmast,
         (select group_concat(distinct SUPCO) from SPDMAST) AS spdmast,
         (select cast(concat(bukti_tgl,'::',gudang,'::',ADDID, '=> ', ROUND(time_to_sec((TIMEDIFF(NOW(), bukti_tgl))) / 60),' menit') as CHAR) as gudang_npb 
          from (
            SELECT * FROM MSTRAN WHERE RTYPE='BPB' 
            AND ADDID LIKE '%NPBG%'
            group by bukti_tgl order by bukti_tgl desc limit 1 
            ) 
          x) AS BPB
          ;
         `;

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
            const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
            fs.appendFile('data.txt',a, errx => {
              if (errx) {
                console.log(r.kdtk +'|'+ r.kdcab +'|Gagal')
                return true
              }else{
                console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                return true
              }
              
            })
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./modelsnew/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    
 
const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListHr(); 
    
    list.forEach( async (r) => { 
      /* */
        var queryCheck =`
        select 
(select kirim from toko) as kdcab,
(select toko from toko) as toko,
(
  select  cast(concat(tgl,log) as char) as ket from tracelog 
  where date(tgl) = '${r.tanggal}'
  and hour(tgl) >16
  and appname rlike 'pos2' 
  and \`log\` rlike 'cekMatrixPlano'
  ) as start_closing,
  (
  select cast(concat(tgl,log) as char) as ket from tracelog 
  where date(tgl) = '${r.tanggal}'
  and hour(tgl) >16
  and appname rlike 'pos2' 
  and \`log\` rlike 'CetakHarian : Tulis file slp'
  ) as slp,
  (
  select  cast(concat(tgl,log) as char) as ket from tracelog 
  where date(tgl) = '${r.tanggal}'
  and hour(tgl) >16
  and appname rlike 'pos2' 
  and \`log\` rlike 'Proses HR, size :'
  ) as file_hr,
  (
  select  cast(concat(tgl,log) as char) as ket from tracelog 
  where date(tgl) = '${r.tanggal}'
  and hour(tgl) >16
  and appname rlike 'ftptoko'
  and \`log\` rlike 'Complete: D:%R230212%.${r.kdtk.substring(1,4)}'
  ) AS ftp, 
(
  select cast(concat(tgl,log) as char) as ket from tracelog 
  where date(tgl) = '${r.tanggal}'
  and appname rlike 'pos2' 
  order by tgl desc limit 1
) AS last_pos2
;
        `  
        
        const rv = await Models.vquery(r.ip1, queryCheck)
        
        if(rv === "Gagal" ){
          
          console.log(r.kdcab +'|'+ r.kdtk +'|'+ r.tanggal +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)

        }else{ 
          await Models.updatelistHr(r.kdtk,r.tanggal,rv)
          console.log(r.kdcab +'|'+ r.kdtk +'|Sukses') 
        }
 
     })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
 
cekToko() 
 
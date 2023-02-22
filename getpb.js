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
    
    const list = await Models.getListPB(); 
    
    list.forEach( async (r) => { 
      /* */
        var queryCheck =`
        select 
(select kirim from toko) as kdcab,
(select toko from toko) as toko,
(
  select \`log\` from tracelog 
  where 
  date(tgl)='${r.tanggal}'
  and 
  appname rlike 'posbpb'
  and \`log\` rlike "Delete PB new_bkl supplier='${r.supco}' krn di bawah 0.75"
) AS keterangan
;
`   
        const rv = await Models.vquery(r.ip1, queryCheck)
        if(rv === "Gagal" ){
          
          console.log(r.kdcab +'|'+ r.kdtk +'|'+ r.tanggal +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)

        }else{ 
          await Models.updatelistPB(r.kdtk,r.supco,r.tanggal,rv[0].keterangan)
          console.log(`${r.kdtk},${r.supco},${r.tanggal},${rv[0].keterangan} |Sukses`) 
        }
 
     })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
 
cekToko() 
 
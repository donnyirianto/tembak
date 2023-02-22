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
  select
  cast(concat('Kapdisp = ',kap_disp, ' Min_disp= ', min_disp) as char) as keterangan
  from stmast a left join prodmast b on a.prdcd = b.prdcd where a.prdcd = '${r.prdcd}' limit 1
) AS keterangan
;
`   
        const rv = await Models.vquery(r.ip1, queryCheck)
        if(rv === "Gagal" ){
          
          console.log(r.kdcab +'|'+ r.kdtk +'|'+ r.prdcd +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)

        }else{ 
          await Models.updatelistPB(r.kdtk,r.prdcd,rv[0].keterangan)
          console.log(`${r.kdtk},${r.prdcd},${rv[0].keterangan} |Sukses`) 
        }
 
     })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
 
cekToko() 
 
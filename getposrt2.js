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
    
    const list = await Models.getListCekPosrtToko3(); 
    /* var queryCheck =`select 
        cast(group_concat(DISTINCT(\`LOG\`))as char) as log_data froM 
        TRACELOG WHERE TGL BETWEEN '${r.tanggal_lunas}' AND '${r.tanggal_terima}' 
        AND APPNAME LIKE '%IDM.Report%' AND \`LOG\` LIKE '%ERROR%'
        `  */
    list.forEach( async (r) => { 
        var queryCheck =` 
        select 
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,tanggal,jam,underlying,timeout,unable,(total-underlying-timeout-unable) as ok
        from
        (
        select date(tgl) as tanggal,hour(tgl)as jam,
        sum(if(log like '%underlying%',1,0)) as underlying,
        sum(if(log like '%out%',1,0)) as timeout,
        sum(if(log like '%unable%',1,0)) as unable,
        count(*) as total
        from posrt_tracelog 
        where 
        \`log\` like '%172.24.16.160%' 
        and date(tgl) between '2023-04-01' and '2023-04-30'
        group by date(tgl),hour(tgl))
        a order by tanggal,jam
        ` 
          
      const dataip =  await Ip.bykdtk(r.kdcab,r.kdtk);
      
      if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(dataip.data[0].IP, queryCheck)
        
        if(rv === "Gagal" ){
          
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt2(r.kdcab,r.kdtk,r.tanggal,r.jam,`Koneksi Timeout`)
        }else{  
          
            await Models.UpdateFlagPosrt3(rv)
            console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Sukses') 
         
        }

      }else{
        console.log(r.kdcab,r.kdtk, "IP Tidak Terdaftar")
      } 
       
     }) 
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
cekToko()
  
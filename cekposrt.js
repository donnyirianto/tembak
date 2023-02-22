var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./modelsnew/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    

const doitBro = async () => {
    try {    
      
      const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
      const tanggal = dayjs().format("YYYY-MM-DD")
      const jam = dayjs().format("HH")

      console.log("Running Tarik Data Rekap : " + start)    
      
      await Models.getListCekPosrt();
         
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 

const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListCekPosrtToko(tanggal,jam);

    var queryCheck =`select *,
        (SELECT count(*) as total_trigger FROM information_schema.\`TRIGGERS\` where trigger_name in('TRG_INS_MTRAN','TRG_UPD_MTRAN','TRG_INS_BAYAR','TRG_UPD_BAYAR','TRG_INS_mstran','TRG_UPD_mstran')) as total_trigger,
        if( tgl_ok > tgl_time_out AND tgl_ok > tgl_underlying AND tgl_ok > tgl_unable , 'OK' ,
          if( tgl_underlying > tgl_time_out AND tgl_underlying > tgl_unable ,
            'Underlying Connection',
            if(tgl_time_out > tgl_unable,'Time out to the server','Unable to connect to the server')
          )
        ) as keterangan
         from (
        select 
        a.kirim as kdcab, 
        a.toko, a.nama,
        cast(ifnull(f.tgl,'2020-01-01 00:00:00') as datetime) as tgl_henti,
        cast(ifnull(g.tgl,'2020-01-01 00:00:00') as datetime) as tgl_jalan,
        cast(ifnull(b.tgl,'2020-01-01 00:00:00') as datetime) as tgl_underlying,
        cast(ifnull(c.tgl,'2020-01-01 00:00:00') as datetime) as tgl_time_out,
        cast(ifnull(e.tgl,'2020-01-01 00:00:00') as datetime) as tgl_unable,
        cast(ifnull(d.tgl,'2020-01-01 00:00:00') as datetime) as tgl_ok
        from toko a
        left join 
        (
        select 
        (select toko from toko ) as toko,tgl,\`log\` from posrt_tracelog 
        where 
        \`log\` like '%under%' order by tgl desc limit 1)  b on a.toko =b.toko
        left join 
        
        (select 
        (select toko from toko ) as  toko,tgl,\`log\` from posrt_tracelog 
        where
        \`log\` like '%out%'
        order by tgl desc limit 1) c on a.toko=c.toko
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from posrt_tracelog 
        where 
        \`log\` like '%unable%'
        order by tgl desc limit 1
        ) e on a.toko=e.toko
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from posrt_tracelog 
        where
        \`log\` like '%SendTableOK%'
        order by tgl desc limit 1
        ) d on a.toko=d.toko
        
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from posrt_tracelog 
        where  
        \`log\` like '%henti%'
        order by tgl desc limit 1
        ) f on a.toko=f.toko
        
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from posrt_tracelog 
        where  
        \`log\` like '%jalan%'
        order by tgl desc limit 1
        ) g on a.toko=g.toko
        
        ) a` 
    
    list.forEach( async (r) => { 
      
      const dataip =  await Ip.bykdtk(r.KDCAB,r.TOKO);
      
      if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(dataip.data[0].IP, queryCheck)
        
        if(rv === "Gagal" ){
          
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Gagal Koneksi') 
          await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)
        }else{ 
          let keter = `${rv[0].tgl_henti}||${rv[0].tgl_jalan}||${rv[0].tgl_unable}||${rv[0].tgl_underlying}||${rv[0].tgl_time_out}||${rv[0].tgl_ok}||${rv[0].total_trigger}||${rv[0].keterangan}||`
          await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,keter)
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Sukses') 
        }

      }else{
        console.log(r.KDCAB,r.TOKO, "IP Tidak Terdaftar")
      }
       
     })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  

cron.schedule('00 09,11,15,16,18 * * * *', async() => { 
  try {
    
    await doitBro() 

  } catch (e) {
    
  }
})

cron.schedule('*/1 * * * *', async() => { 
  try {
    
    await cekToko()

  } catch (e) {
    console.log(e)
  }
})


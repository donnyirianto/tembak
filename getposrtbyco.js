var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./models/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    

const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListCekPosrtToko2(); 
    
    list.forEach( async (r) => { 
        var queryCheck =` 
        select *,
        (SELECT count(*) as total_trigger FROM information_schema.\`TRIGGERS\` where trigger_name in('TRG_INS_MTRAN','TRG_UPD_MTRAN','TRG_INS_BAYAR','TRG_UPD_BAYAR','TRG_INS_mstran','TRG_UPD_mstran')) as total_trigger,
        if( tgl_ok > tgl_time_out AND tgl_ok > tgl_underlying AND tgl_ok > tgl_unable , 'OK' ,
          if( tgl_underlying > tgl_time_out AND tgl_underlying > tgl_unable ,
            'Underlying Connection',
            if(tgl_time_out > tgl_unable,'Time out to the server',
              if(tgl_unable ='2020-01-01 00:00:00','Tidak Ada log bermasalah','Unable to connect to the server'))
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
        (select toko from toko ) as toko,tgl,\`log\` from tracelog 
        where 
        \`log\` rlike '172.24.16.160' and \`log\` like '%under%' 
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1)  b on a.toko =b.toko
        left join 
        (select 
        (select toko from toko ) as  toko,tgl,\`log\` from tracelog 
        where
        \`log\` rlike '172.24.16.160' and \`log\` like '%out%'
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1) c on a.toko=c.toko
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from tracelog 
        where 
        \`log\` rlike '172.24.16.160' and \`log\` like '%unable%'
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1
        ) e on a.toko=e.toko
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from tracelog 
        where
        \`log\` rlike '172.24.16.160' and \`log\` like '%SendTableOK%'
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1
        ) d on a.toko=d.toko
        
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from tracelog 
        where  
        \`log\` rlike '172.24.16.160' and \`log\` like '%henti%'
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1
        ) f on a.toko=f.toko
        
        left join    
        (
        select 
        (select toko from toko ) as  toko,tgl,log 
        from tracelog 
        where  
        \`log\` rlike '172.24.16.160' and \`log\` like '%jalan%'
        and tgl between '${r.sebelum}' and '${r.sesudah}'
        order by tgl desc limit 1
        ) g on a.toko=g.toko
        
        ) a
        ` 
          
      const dataip =  await Ip.bykdtk(r.kdcab,r.kdtk);
      
      if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(dataip.data[0].IP, queryCheck)
        console.log(rv)
        if(rv === "Gagal"){
          
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt2(r.kdcab,r.kdtk,r.tanggal,r.jam,`Koneksi Timeout`)
        }else{ 
          
          await Models.UpdateFlagPosrt2(r.noco,rv.data[0].keterangan)
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
  
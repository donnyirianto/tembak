const conn_any = require('./services/anydb'); 
const conn_ho = require('./services/dbho');

(async ()=>{
  try{  
      const acuan_toko = await conn_ho.query(`select kodetoko as toko from posrealtime_base.toko_extended te where KodeGudang ='g244' order by kodetoko`)
      
      for(let i of acuan_toko){
        let query = `
          insert ignore into mstran_all_toko
          select toko as gudang,shop,prdcd,date(max(tgl1)) as tgl1 
          from mstran_${i.toko}_2301 where rtype='b' and left(toko,1) = 'G' group by prdcd;
        `
        let query2 = `
          insert ignore into mstran_all_toko
          select toko as gudang,shop,prdcd,date(max(tgl1)) as tgl1 
          from mstran_${i.toko}_2302 where rtype='b' and left(toko,1) = 'G' group by prdcd;
        `
        let query3 = `
          insert ignore into mstran_all_toko
          select toko as gudang,shop,prdcd,date(max(tgl1)) as tgl1 
          from mstran_${i.toko}_2303 where rtype='b' and left(toko,1) = 'G' group by prdcd;
        `
        let query4 = `
          insert ignore into mstran_all_toko
          select toko as gudang,shop,prdcd,date(max(tgl1)) as tgl1 
          from mstran_${i.toko}_2304 where rtype='b' and left(toko,1) = 'G' group by prdcd;
        `
        let query5 = `
          insert ignore into mstran_all_toko
          select toko as gudang,shop,prdcd,date(max(tgl1)) as tgl1 
          from mstran_${i.toko}_2305 where rtype='b' and left(toko,1) = 'G' group by prdcd;
        `
        await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query)
        await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query2)
        await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query3)
        await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query4)
        await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query5)
        console.log(`${i.toko} - Sukses`)
      }
      
      console.log("Done") 
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
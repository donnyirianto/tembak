const Models = require('./models/model');
const conn_any = require('./services/anydb'); 
const ipToko = require('./helpers/iptoko'); 

 
(async ()=>{
  try{   
      console.log(`running`)
      const a = await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, `select * from m_toko_ip where toko in('TCSH','TG90','TGBA','TGF3','TGNU','TGPD','TGSK','TGUK','THCE','THKH','THKW','THOR','THRK','TIGC','TJEN','TJV5','TJYN','TK5T','TKKG','TKKK','TKT4','TL5X','TLES','TLLS','TM06','TM4J','TMTF','TMU2','TMZC','TN77','TNJZ','TOHU','TOP4','TORE','TOTI','TOWL','TP6O','TPES','TPOM','TPZP','TQ7P','TQ9U','TRC6','TRGN','TRJ0','TRL6','TRLG','TRMS','TRR8','TS4J','TSAK','TSC6','TSF2','TSVY','TTAL','TTC4','TTER','TTHN','TTKW','TTRP','TTSI','TTZU','TU1N','TU2Y','TU7B','TUAN','TUBR','TUBX','TUCL','TULI','TULL','TUMF','TUPH','TURA','TUSE','TUTV','TVAL','TVD5','TVHA','TVR6','TVUZ','TVZG','TW3V','TXHY','TYLR','TZMY')
      and toko not in('TCSH')
      order by toko`);
      
      for(let rrrr of a.data){ 
        console.log(rrrr.TOKO)
        const query = `select a.*,b.ip_induk from rekap_spdmast2 a
        left join m_toko_ip b on a.shop = b.toko where (ket!='Y' or ket is null) and shop='${rrrr.TOKO}'`
        const results = await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, query);
        const plu = results.data.map((r) => r.prdcd);
        console.log(plu.length)
        // const queryTembakx= `
        // create table if not exists bck_reg4_spdmast_23061614 select * from spdmast;
        // update spdmast 
        // set 
        //   supco='GI28',
        //   tgl_beli1=curdate(),
        //   addtime = now()
        // WHERE prdcd in(${plu.toString()}) and supco='G244'
        // AND (prdcd, supco) NOT IN (
        //   SELECT prdcd, supco
        //   FROM (
        //       SELECT prdcd, supco
        //       FROM spdmast
        //       WHERE prdcd in(${plu.toString()}) AND supco = 'GI28'
        //   ) AS temp
        //   );
        // ` 

        let queryTembak2 = `
        create table if not exists bck_reg4_spdmast_23061614 select * from spdmast;
        UPDATE spdmast AS t1
        JOIN (
          SELECT prdcd, GROUP_CONCAT(SUPCO) AS X
          FROM spdmast
          WHERE prdcd IN (${plu.toString()})
          GROUP BY prdcd
          HAVING X NOT RLIKE 'GI28'
        ) AS t2 ON t1.prdcd = t2.prdcd
        SET t1.supco = 'GI28',
            t1.tgl_beli1 = CURDATE(),
            t1.addtime = NOW();
          `
        
          const rv = await Models.vqueryTembak(rrrr.IP_INDUK, queryTembak2)
        
          if(rv.status =="NOK"){
            console.log(rrrr.TOKO +'|'+ rrrr.KDCAB +'|Gagal|'+ rrrr.IP_INDUK) 
          }else{               
              let queryUpd = `update rekap_spdmast2 set ket = 'Y' where shop='${rrrr.TOKO}' and prdcd in(${plu.toString()});`
              await conn_any.runQuery("192.168.68.191","root","R3giONp4p4t","indomaret", 3306, queryUpd);
              console.log(rrrr.TOKO +'|'+ rrrr.KDCAB +'|Sukses|' + rrrr.IP_INDUK)
          } 
      }
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
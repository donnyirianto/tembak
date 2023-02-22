const Models = require('./modelsnew/model')
const dayjs = require('dayjs');
const conn_ho = require('./services/dbho');
const zconn = require('./services/anydb'); 
const iptoko = require('./helpers/iptoko')
const cron = require('node-cron')
var taskdoit = true;
var taskdoit2 = true;
var taskdoit3 = true;
/* =================================================*/
//   BA Tembak PKM = 1 tanggal 22 oKTOBER -02 NOVEMBER 2022
/* =================================================*/

//cron.schedule('00 06,07,08,09 * * *', async() => { 
( async() => {    
  var xtoday = dayjs().format("YYMMDD")
  var today = dayjs().format("YYYY-MM-DD")  
  if (taskdoit && today <="2022-11-02") { 
          taskdoit = false    
          console.log("[START] Proses Penyesuaian Toko: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
          try {          
              const query = `select 
                                kodegudang as kdcab,
                                kodetoko as kdtk,
                                namatoko as namatoko,
                                tglbuka as tglbuka
                              from posrealtime_base.toko_extended 
                              where kodetoko in('T61Q');`
              const [masterToko] = await conn_ho.query(query);
              
              masterToko.forEach( async(r) =>{
                const ip = await iptoko.bykdtk(r.kdcab,r.kdtk);
                
                if(ip.data.length > 0){
                  var query_tembak1 =`create table if not exists bck_reg_stmast_${xtoday}
                  select * from stmast
                  where prdcd in('20040896','20093524','20040895','20040898','20106981','20054749','20096808','20040893','20040894','20056053','20056050','20069690','20093523','20053906','20102839','20103793');
                  update stmast set \`max\` = 0 where prdcd in('20040896','20093524','20040895','20040898','20106981','20054749','20096808','20040893','20040894','20056053','20056050','20069690','20093523','20053906','20102839','20103793')`
                  
                  const data = await zconn.zconn(ip.data[0].IP,ip.data[0].USER,ip.data[0].PASSWORD.split("|")[0],"POS","3306",query_tembak1);
                  if(data !="Gagal"){
                    console.log(`${r.kdcab} - ${r.kdtk} - Sukses`)
                  }else{
                    console.log(`${r.kdcab} - ${r.kdtk} - Gagal`)
                  }
                }else{
                  console.log(`${r.kdtk} - IP Tidak terdaftar`)
                } 
              })

              taskdoit = true

      } catch (err) {
              console.log("[END] ERROR !!! Proses Penyesuaian Toko:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
              taskdoit = true
              console.log(err);
      }
    } 
})();


  /* =================================================*/
//   BA Tembak TY67 PKM = 1 tanggal 27 OKTOBER - 02 nOVEMBER 2022
/* =================================================*/

//cron.schedule('00 06,07,08,09 * * *', async() => { 
  ( async() => {    
    var xtoday = dayjs().format("YYMMDD")
    var today = dayjs().format("YYYY-MM-DD")
    var today3 = dayjs().format("MMDD")
    var tableformat = dayjs().format("HHmmss")
    if (taskdoit3 && today <="2022-11-02") { 
          taskdoit3 = false    
          console.log("[START] Proses Penyesuaian Toko: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
          try {         
              const query = `select 
                                kodegudang as kdcab,
                                kodetoko as kdtk,
                                namatoko as namatoko,
                                tglbuka as tglbuka
                              from posrealtime_base.toko_extended 
                              where kodetoko in('TY67');`
              const [masterToko] = await conn_ho.query(query);
              
              masterToko.forEach( async(r) =>{
                const ip = await iptoko.bykdtk(r.kdcab,r.kdtk);
                
                if(ip.data.length > 0){
                  var query_tembak1 =`create table if not exists bck_reg_stmast2_${xtoday}
                  select * from stmast
                  where prdcd in(20040893,20040894,20053906,20056050,20056053,20096808,20106981);
                  update stmast set \`max\` = 1 where prdcd in(20040893,20040894,20053906,20056050,20056053,20096808,20106981);`
                  
                  const data = await zconn.zconn(ip.data[0].IP,ip.data[0].USER,ip.data[0].PASSWORD.split("|")[0],"POS","3306",query_tembak1);
                  if(data !="Gagal"){
                    console.log(`${r.kdcab} - ${r.kdtk} - Sukses`)
                  }else{
                    console.log(`${r.kdcab} - ${r.kdtk} - Gagal`)
                  }
                }else{
                  console.log(`${r.kdtk} - IP Tidak terdaftar`)
                } 
              })

              taskdoit3 = true

      } catch (err) {
              console.log("[END] ERROR !!! Proses Penyesuaian Toko:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
              taskdoit3 = true
              console.log(err);
      }
    } 
})();

/* =================================================*/
//   BA Tembak PKM = 1 tanggal 22-29 Oktober 2022
/* =================================================*/

//cron.schedule('00 06,07,08,09 * * *', async() => { 
/* ( async() => {    
        if (taskdoit2) { 
              taskdoit2 = false    
              console.log("[START] Proses Penyesuaian Toko: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
              try {         
  
                var xtoday = dayjs().format("YYMMDD")
                var today = dayjs().format("YYYY-MM-DD")
                  var today2 = dayjs().format("MMDD")
                  var tableformat = dayjs().format("HHmmss")
                  const query = `select 
                                    kodegudang as kdcab,
                                    kodetoko as kdtk,
                                    namatoko as namatoko,
                                    tglbuka as tglbuka
                                  from posrealtime_base.toko_extended 
                                  where kodetoko in('TFFX','T8QA','TAO4','T0YL','T3YV','TIJF','T8TH','T7SR','TSW3','TA0D','TDNW','TSOZ','T433','T4R8','T2GY','TXOD','TY95','TY67','TPV6','TNBZ','T2B2','TYVY','TYBS','TI9U','TWGJ','T5W9','TUD7','TFBI');`
                  const [masterToko] = await conn_ho.query(query);
                  
                  masterToko.forEach( async(r) =>{
                    const ip = await iptoko.bykdtk(r.kdcab,r.kdtk);
                    
                    if(ip.data.length > 0){
                      var query_tembak1 =`create table if not exists bck_reg_stmast_${xtoday}
                      select * from stmast
                      where prdcd in(20120553,20120554,20120551,20120550,20120555,20120558,20120549,20120552,20120557,20120556);
                      update stmast set \`max\` = 1 where prdcd in(20120553,20120554,20120551,20120550,20120555,20120558,20120549,20120552,20120557,20120556)`
                      
                      const data = await zconn.zconn(ip.data[0].IP,ip.data[0].USER,ip.data[0].PASSWORD.split("|")[0],"POS","3306",query_tembak1);
                      if(data !="Gagal"){
                        console.log(`${r.kdcab} - ${r.kdtk} - Sukses`)
                      }else{
                        console.log(`${r.kdcab} - ${r.kdtk} - Gagal`)
                      }
                    }else{
                      console.log(`${r.kdtk} - IP Tidak terdaftar`)
                    } 
                  })
  
                  taskdoit2 = true
  
          } catch (err) {
                  console.log("[END] ERROR !!! Proses Penyesuaian Toko:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
                  taskdoit2 = true
                  console.log(err);
          }
        } 
  })(); */


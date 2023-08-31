const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');


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
    try{  
            
      const start = new Date();
      console.log("Running At : " + start)    

        const results = await Models.getServerIris();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data ========================= 
          for(let i = 18; i<=24; i++ ){
            let x = i
            if(i < 10){
                x = `0${i}`
            }
            let tanggal = `2023-08-${x}`
            let summary = `docno_lompat`
            let table_dt = `dt_2308${x}`

            const queryTembak = `
            create table if not exists ${summary}(
              tanggal date,
              shop varchar(4),
              shift varchar(2),
              station varchar(2),
              docno varchar(15),
              prev_docno varchar(15),
              plu text,
              total_item int,
              total_gross int,
              keterangan varchar(20),
              primary key (tanggal,shop,shift,station,docno)
              )engine=innoDB;`;
            await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak);
            
            let query_select=`
            SET SESSION group_concat_max_len=4294967295;
            REPLACE INTO ${summary} (tanggal,shop,shift,station,docno,prev_docno,plu,total_item,total_gross,keterangan) 
            select *,
            if((cast(docno as SIGNED)- cast(prev_docno as signed)) > 1,'Lompat','Normal') as keterangan
            from (
            select 
            tanggal,shop,shift,station,docno,
            LAG(docno) OVER (PARTITION BY tanggal,shop,shift,station ORDER BY tanggal,shop,shift,station,docno) AS prev_docno, 
            group_concat(prdcd) as plu, 
            count(*) as total_item,
            sum(gross) as total_gross
            from 
            (
            select
            DATE_FORMAT(STR_TO_DATE(tanggal, '%d-%m-%Y'), '%Y-%m-%d') as  tanggal,shop,shift,station,docno,prdcd,qty,gross,jam
            from ${table_dt}
            order by tanggal,shop,shift,station,docno,prdcd
            ) a
            group by tanggal,shop,shift,station,docno) a  
            having keterangan !='NORMAL'
            `;
            //  console.log(query_select)
            const rv = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, query_select)
            
            if(rv.status === "NOK"){
              console.log(`${r.kdcab}|${tanggal}|GAGAL`)
            }else{ 
              console.log(`${r.kdcab}|${tanggal}|${rv.status}`)
            }
          }
          
        })
      
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
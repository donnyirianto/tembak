const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');
let csvToJson = require('convert-csv-to-json');

process.setMaxListeners(0);
 
const doitBro = async () => { 
    try{   
        let json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./local.csv");
        
        const results = await Models.getServerIris();
        results.forEach( async (r) => { 
          console.log(r.kdcab)
          // ANCHOR ===============Query Ambil Data ========================= 
          await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, `drop table if exists summary_paretoy; create table if not exists summary_paretoy(
            kdcab varchar(4),
            prdcd varchar(8),
            deskripsi varchar(150)  default null,
            rank_nett int,
            ptag varchar(3),
            primary key (kdcab,prdcd)
            )engine=InnoDB;`)
            
            let dataInsert = json.filter(x => x.kdcab ===r.kdcab).map((rx)=>{
              return `('${rx.kdcab}','${rx.plu}','${rx.deskripsi}','${rx.rank_nett}','${rx.ptag}')`
            })
            const queryTembak = `INSERT IGNORE INTO summary_paretoy values ${dataInsert.join(",")};`;
            //console.log(queryTembak)
            await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak) 
            
            console.log(`${r.kdcab}-Selesai`)
        })         
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
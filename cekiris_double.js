const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');


process.setMaxListeners(0);
 

const doitBro = async () => { 
    try{   

      console.log("Running: ")  
      
      let dataVariance = await Models.QueryCO(`select 
      tanggal as tgl_varian,
      kdcab,toko,sales_net,noStruk,nilaiStruk,isiStruk 
      from summary_varian_2023 where tanggal between '2023-08-01' and '2023-08-31' 
      and jmlStruk is not null and jmlStruk >0`);

      for(let r of dataVariance){
        let struk = r.noStruk.split(",");
        
        for(let astruk of struk){
          let toko = r.toko
          let tgl_varian = r.tgl_varian
          let kdcab = r.kdcab
          let sales_net = r.sales_net
          let noStruk = r.noStruk
          let nilaiStruk = r.nilaiStruk
          //20230828-012-000000091
          let tanggal = dayjs(astruk.substring(0,8)).format("YYYY-MM-DD")
          let station = astruk.substring(9,11)
          let shift = astruk.substring(11,12)
          let docno = astruk.split("-")[2]
          
          console.log(`('${kdcab}','${toko}','${tanggal}','${station}','${shift}','${docno}')`)
        }
      }
        console.log("finish")
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
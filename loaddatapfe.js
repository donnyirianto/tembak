
let csvToJson = require('convert-csv-to-json');
let conn_ho = require("./services/dbho");

(async ()=>{
  try{   
    
    const pfe = ['PFE12053F.2ZP','PFE12053F.17R','PFE12053F.46N','PFE12053F.55F','PFE12053F.CCA','PFE12053F.CCF','PFE12053F.LVE','PFE12053F.ML8','PFE12053F.UR8']
    //const pfe = ['PFE12053F.17R.CSV']
    for(let i of pfe){
      
      let json = csvToJson.fieldDelimiter('|').getJsonFromCsv(`./pfe/new/${i}`);
      let toko = `${i.substring(8,9)}${i.substring(10,13)}`
      json = json.map((r)=>{
        return `('${toko}','${r.PRDCD}','${r.CTGR}','${i}')`
      })
      const dataInsert = json.join(",")

      await conn_ho.query(`REPLACE into cekpfe2(toko,prdcd,ctgr,addfile) values ${dataInsert}`);
      console.log(`${i} Sukses Insert`)
    }
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
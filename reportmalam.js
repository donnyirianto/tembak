
let csvToJson = require('convert-csv-to-json');
let conn_ho = require("./services/dbho");
let dayjs = require("dayjs");

const cekPfe = async ()=>{
  try{   
    
    for(let i of pfe){  
      let json = csvToJson.fieldDelimiter('|').getJsonFromCsv(`./pfe/${i}`);
      let toko = `${i.substring(8,9)}${i.substring(10,13)}`
      json = json.map((r)=>{
        return `('${toko}','${r.PRDCD}','${r.CTGR}','${i}')`
      })
      const dataInsert = json.join(",")
      await conn_ho.query(`REPLACE into cekpfe(toko,prdcd,ctgr,addfile) values ${dataInsert}`);
      console.log(`${i} Sukses Insert`)
    }
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
}
 
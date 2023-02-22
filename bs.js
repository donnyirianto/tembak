const { Parser } = require('json2csv');
const fs = require('fs');
const Models = require('./modelsnew/model')
 

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)   
      const acuan = await Models.getListBsacuan()

      acuan.forEach( async (x)=>{

        fields = ["RECID","TIPERAK","NORAK","NOSHELF","KIRIKANAN","DIV","PRDCD","DESC","SINGKAT","BARCODE","BARCODE2","FRAC","UNIT","PTAG","CAT_COD","BKP","SUB_BKP","CTGR","KEMASAN","ACOST","LCOST","RCOST","PRICE","TTL","TTL1","TTL2","COM","HPP","SOID","EDIT","SOTYPE","SOTGL","SOTIME","ADJDT","ADJTIME","DRAFT","DCP","CTK"]
        const opts = {
          fields,
          quote: "",
          delimiter: "|",
          eol :"\r\n"
        }
  
        const myData  = await Models.getListBsExport(x.toko,x.tanggal)
        const parser = new Parser(opts);
        
        const csv = parser.parse(myData);
        
        fs.writeFileSync(`./bs/BS${x.tanggal.replace(/-/g, '')}${x.toko}.CSV`, csv)
        console.log(`./bs/BS${x.tanggal.replace(/-/g, '')}${x.toko}.CSV`)
      })
      
      
      /* converter.json2csv(todos, (err, csv) => {
        if (err) {
          throw err
        }

        // print CSV string
        console.log(csv)

        // write CSV to a file
        fs.writeFileSync('todos.csv', csv)
      }) */
      
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getCekItem();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `
          select 
          '${r.kdcab}' as kdcab,
          '${r.toko}' as toko,
          '${r.prdcd}' as prdcd,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0508') as tgl_08,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0509') as tgl_09,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0510') as tgl_10,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0511') as tgl_11,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0512') as tgl_12,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0513') as tgl_13,
          (select count(*) as total from pr2305 where toko ='${r.toko}' and prdcd ='${r.prdcd}' and FILENAME rlike '0514') as tgl_14
          `
          
          const rv = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.toko +'|'+ r.kdcab +'|Gagal|' + r.prdcd) 
          }else{ 
              const x = await Models.updateCekItem(rv.data[0]);
              console.log(r.toko +'|'+ r.kdcab +'|Insert|'+x)  
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 
doitBro();
// cron.schedule('*/2 * * * *', async() => { 
//   doitBro()
// })

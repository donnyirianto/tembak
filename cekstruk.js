const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpStruk();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `select ifnull(sum(amount),0) as total from struk_online 
          where tanggal='${r.tanggal}'
          and shift= ${r.shift}
          and station= ${r.station}
          and docno between ${r.start} and ${r.end};
          `
          
          const rv = await Models.vquery(r.ip_induk, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip_induk) 
          }else{ 
              const insertData = await Models.updateStrukOnline(r.id,rv.data[0].total) 
              console.log(r.kdtk +'|'+ r.kdcab +'|'+insertData)  
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

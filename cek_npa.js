const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpNpa();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `select 
          (select addtime from wtran_in where addid rlike '${r.file_acuan}' group by addid) as wtran,
          (select bukti_no from mstran where addid rlike '${r.file_acuan}' group by addid) as bukti_no,
          (select cast(bukti_tgl as char) as bukti_tgl from mstran where addid rlike '${r.file_acuan}' group by addid) as bukti_tgl;
          `
          
          const rv = await Models.vquery(r.ip_induk, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip_induk) 
          }else{ 
              const insertData = await Models.updateCekNPA(r.nama_file,rv.data[0]) 
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

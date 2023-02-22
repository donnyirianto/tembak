var cron = require('node-cron');
const Models = require('./modelsnew/model')

process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 
 

const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpWaktu();

        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data Waktu=========================  

          const queryTembak = `select 
          (select kirim from toko ) as kdcab,
          (select toko from toko ) as kdtk,
          (select nama from toko ) as nama,
          prdcd 
          from mstran order by bukti_tgl desc limit 100;
          `
          var pre_query = new Date().getTime();

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip1) 
            await Models.insertDataWaktu(r.kdcab, r.kdtk, r.nama,"-", "Gagal")
          }else{ 
              var post_query = new Date().getTime();
              
              var duration = (post_query - pre_query) / 1000;
              await Models.insertDataWaktu(r.kdcab, r.kdtk, r.nama,duration, "Sukses") 
              console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')  
              console.log(post_query, pre_query)
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 

cron.schedule('*/10 * * * * *', async() => { 
  doitBro()
})

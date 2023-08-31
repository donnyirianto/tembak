const cron = require('node-cron');
const Models = require('./models/model')
const dayjs = require('dayjs');

const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpNpa2();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `
          select cast(concat(cast(ifnull(wtran,'') as char),'|',ifnull(mstran_toko,'')) as char) as cektoko
          from (
            select 
            (
              select ifnull(addtime,'') from wtran_in 
              where  
              toko='${r.toko_pengirim}' and invno='${r.docno}' and prdcd = '${r.prdcd}'
              limit 1
            ) as wtran,
              (select cast(concat(bukti_tgl,'|',bukti_no,'|',qty,'|',gross) as char) as data
              from mstran where rtype='I' 
              and gudang='${r.toko_pengirim}' and invno='${r.docno}' and prdcd = '${r.prdcd}') as mstran_toko
          ) a
          ; 
          `
          
          const rv = await Models.vquery(r.ip_induk, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.ip_induk +'|Gagal|' + r.ip_induk) 
          }else{ 
              const insertData = await Models.updateCekNPA2(r,rv.data[0]) 
              console.log(r.kdtk +'|'+ r.ip_induk +'|'+insertData)  
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 
console.log("Loop Start : ")    

doitBro()

cron.schedule('*/10 * * * *', async() => { 
  if(dayjs().format("HH") > 7 && dayjs().format("HH") < 20){
    doitBro()
  }
    
})

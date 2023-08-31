const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getCekItemToko();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `
          select 
          '${r.kdcab}' as kdcab,
          '${r.toko}' as toko,
          '${r.prdcd}' as prdcd,
          (select CAST(CONCAT(IFNULL(RECID,''),'|',IFNULL(CTGR,''),'|',IFNULL(ket,'')) AS CHAR) FROM bck_prodmast_reg4_230512 where prdcd ='${r.prdcd}') as tgl_12_bck
          `
          
          const rv = await Models.vquery(r.IP_INDUK, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.toko +'|'+ r.kdcab +'|Gagal|' + r.prdcd) 
          }else{ 
            
              const x = await Models.updateCekItemToko(rv.data[0]);
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

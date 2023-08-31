const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListFt();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `select ft_ho from ft_all_toko where prdcd ='${prdcd}';`
          
          const rv = await Models.vquery(r.ip_induk, queryTembak)
          
          if(rv.status === "NOK" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|') 
          }else{ 
              const insertData = await Models.updateStrukOnline(r.toko,rv.data[0]) 
              console.log(r.kdtk +'|'+ r.kdcab +'|')  
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 
doitBro();
 
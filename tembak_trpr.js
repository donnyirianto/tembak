const fs = require('fs');
const Models = require('./models/model');

const cron = require('node-cron')

var taskdoit = true;

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    
        const results = await Models.getListIp();

        results.forEach( async (r) => {  
            
            const queryTembakx= `         
            update promo_matriks a set itemsyarat = replace(itemsyarat,'&-PLU=','!');
            update promo_matriks a set itemsyarat = replace(itemsyarat,'!PLU=','!');
            update promo_matriks a set itemsyarat = replace(itemsyarat,'&PLU=','!');
            update promo_matriks set itemsyarat = mid(itemsyarat,2,100000) where left(itemsyarat,1) = '!';
            insert ignore into rak select * from rak_reg;
            `
            //

            const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
    
            if(rv.status =="NOK"){
              console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|'+ r.ip1) 
            }else{                       
                console.log(r.kdtk +'|'+ r.kdcab +'|Sukses Update|' + r.ip1)
            } 
      }) 
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

          
}
cron.schedule('*/5 * * * * *', async() => { 
  if (taskdoit ) {
    try{ 
      taskdoit = false
        await doitBro()
       taskdoit = true

    } catch (err) {
            console.log("[END] ERROR !!! Proses Penyesuaian Toko:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
            taskdoit = true
          
            console.log(err);
    }
  }

});



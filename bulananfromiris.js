
const Models = require('./modelsnew/modelbulanan')
 
process.setMaxListeners(0);

      
(async ()=>{
    try{  
          
        const results = await Models.getListServerBulanan();

        for(const r of results){

          const queryTembakx= `select kdcab,shop,tanggal,station,shift,docno,left(ttype,1) as ttype from iris.ttypefix
           WHERE KDCAB='${r.kdcab}';`
          
          const rv = await Models.vquery_local(queryTembakx)

            if(rv === "Gagal"){
              console.log(r.kdcab +'|Gagal') 
            }else{                       
              //await Promise.all(rv.map(async (x) => {
               for(const x of rv){
                //console.log(x.kdcab,x.shop,x.tanggal,x.station,x.shift,x.docno,x.ttype)
                var queryx = `UPDATE MTRAN_${x.shop}_2111 SET TTYPE='${x.ttype}'
                                WHERE SHOP='${x.shop}' and TANGGAL='${x.tanggal}' and
                                STATION='${x.station}' and SHIFT='${x.shift}' and DOCNO='${x.docno}'
                              `
                const xu = await Models.vqueryTembak(r, queryx) 
                console.log(xu, x.kdcab,x.shop,x.tanggal,x.station,x.shift,x.docno,x.ttype)
              }
              
              console.log(r.kdcab +'|Sukses|')
              


            }
            
        }
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

})();        
       
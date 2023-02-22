const fs = require('fs');
const Models = require('./modelsnew/model')
   
const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    
        const results = await Models.getListIpTembakPpn();

        results.forEach( async (r) => {  

        const queryTembakx= ` 
        update mstran set ppn='${r.ppn}',ppn_rp_idm='${r.ppn_rp_idm}'
        where bukti_no = '${r.docno}'
        and prdcd = '${r.prdcd}'
        and rtype='${r.rtype}'
        `
        
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

          if(rv === "Gagal"){

              console.log(r.kdcab +'|'+ r.kdtk+'|'+ r.docno +'| Gagal|')
          }else{                       
              await Models.updateFlagPpn(r.kdtk,r.prdcd,r.rtype,r.docno)
              console.log(r.kdcab +'|'+ r.kdtk+'|'+ r.docno +'| Sukses|' )
          }
          
        }) 
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

          
}
 
doitBro()
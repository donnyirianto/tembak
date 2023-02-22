const Models = require('./modelsnew/model');
 
(async ()=>{
  try{  
    
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
  
        const queryTembakx= `   
          UPDATE CONST SET JENIS = 'N' WHERE RKEY='PCO';
        ` 
        //console.log(r.kdtk)
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
      
        if(rv === "Gagal"){
          console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
        }else{                       
            console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|' + r.ip1)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
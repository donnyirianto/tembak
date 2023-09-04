const Models = require('./models/model');
 
(async ()=>{
  try{  
 
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
        
        const queryTembakx= `
        update const set docno='0',rdocno='0' where rkey='trf';
        `
 
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
        
        if(rv.status =="NOK"){
          console.log(r.kdtk +'|'+ r.kdcab +'|gagal|'+ r.ip1) 
        }else{                       
            console.log(r.kdtk +'|'+ r.kdcab +'|sukses|' + r.ip1)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
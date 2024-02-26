const Models = require('./models/model');
 
(async ()=>{
  try{  
 
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
        
        const queryTembakx= `
        UPDATE dbl.const set \`desc\`='TGL01012024|TGL01082023|TGL01022023|TGL01012022|TGL01062021' WHERE rkey='TG1';
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
 
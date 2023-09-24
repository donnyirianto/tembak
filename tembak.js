const Models = require('./models/model');
 
(async ()=>{
  try{  
 
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
        
        const queryTembakx= `
        create table if not exists bck_reg4_prodmast 230913 select * from prodmast where flagprod rlike 'TAS=Y';
UPDATE PRODMAST SET FLAGPROD=REPLACE(FLAGPROD,'TAS=Y','') WHERE flagprod RLIKE 'TAS=Y';
update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM';
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
 
const Models = require('./modelsnew/model');
 
(async ()=>{
  try{  
    
      const results = await Models.getListIpHispb();
      
      results.forEach( async (r) => { 
  
        const queryTembakx= `     
        select a.prdcd,cast(left(b.tgl_pb,10) as char) as tanggal,a.qty,
        cast(concat(a.keter) as char) as stock
        from mstran a
        left join
        (select prdcd,tgl_pb from his_pbdc where prdcd ='${r.plu}' order by tgl_pb asc limit 1) b on a.prdcd = b.prdcd
        where a.prdcd = '${r.plu}' 
        and rtype='bpb'
        order by bukti_tgl asc limit 1;
        ` 
        
        const rv = await Models.vquery(r.ip1, queryTembakx)
       
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.plu +'|Gagal') 
          }else{
            
              await Models.insertDataHis(r.kdtk, r.plu, rv ) 
              console.log(r.kdtk +'|'+ r.plu +'|Sukses') 
          }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
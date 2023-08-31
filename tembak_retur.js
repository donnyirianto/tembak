const Models = require('./models/model');
 
(async ()=>{
  try{  
    
      const results = await Models.getListIpRetur();
      
      results.forEach( async (r) => { 
        
        const queryTembakx= `
        create table if not exists bck_mstran_reg4_230522 like mstran;
        insert into bck_mstran_reg4_230522 select * from mstran where rtype='${r.rtype}' and date(bukti_tgl)='${r.tanggal}' and prdcd='${r.prdcd}' and bukti_no='${r.docno}';
        delete from mstran where rtype='${r.rtype}' and date(bukti_tgl)='${r.tanggal}' and prdcd='${r.prdcd}' and bukti_no='${r.docno}';
        `
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
        if(rv.status =="NOK"){
          console.log(r.toko +'|Gagal|'+ r.ip1) 
        }else{               
            await Models.UpdateRetur(r)
            console.log(r.toko +'|Sukses|' + r.ip1)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
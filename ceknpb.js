const conn_any = require('./services/anydb'); 
const conn_ho = require('./services/dbho');
const Models = require('./models/model');

(async ()=>{
  try{  
      const acuan_toko = await conn_ho.query(`select a.*,b.IP_INDUK  from dd_ceknpb a left join m_toko_ip b on a.toko=b.toko
      where ket ='N';`)
      
      acuan_toko.forEach(async (r)=>{
        let query = `
        select cast(group_concat(distinct docno) as char) as total_docno from dc_npbtoko_log where namafile rlike '${r.namafile}' group by namafile  
        `
        let res = await Models.vquery(r.IP_INDUK,query)
        
        if(res.status='OK'){
          
          await conn_ho.query(`Update dd_ceknpb set  total_toko = '${res.data[0].total_docno}', ket='Y' where namafile='${r.namafile}';`)
          console.log(`${r.toko} - Sukses`)
        }else{
          console.log(`${r.toko} - Gagal`)
        }
        
      })
      
      console.log("Done") 
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
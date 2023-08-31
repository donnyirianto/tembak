const cron = require('node-cron');
const Models = require('./models/model')
 
const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpCeknp2();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          const queryTembak = `select 
          (select kirim from toko ) as kdcab,
          (select toko from toko ) as kdtk,
          (select addtime from npb_d where addid rlike '${r.namafile_pilih}'   limit 1) as npb_d,
          (select addtime from DC_NPBTOKO_LOG where namafile rlike '${r.namafile_pilih}'    limit 1) as dc_npbtoko,
          (select cast(group_concat(distinct bukti_tgl) as char) as bukti_tgl from mstran where rtype = 'BPB'   and addid rlike '${r.namafile_pilih}') as bukti_tgl,
          (select cast(group_concat(distinct bukti_no) as char) as bukti_no from mstran where  rtype = 'BPB'    and addid rlike '${r.namafile_pilih}') as no_bpb,
          (select sum(qty) from mstran where  rtype = 'BPB'    and addid rlike '${r.namafile_pilih}') as qty,
          (select sum(gross) from mstran where  rtype = 'BPB' and addid rlike '${r.namafile_pilih}') as gross;
          `
          
          const rv = await Models.vquery(r.ip_induk, queryTembak)
          
          if(rv === "G" || rv.status != "OK" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip_induk) 
          }else{ 
              const insertData = await Models.insertDataCeknp2(r,rv.data) 
              console.log(r.kdtk +'|'+ r.kdcab +'|'+insertData)  
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 

//cron.schedule('*/2 * * * *', async() => { 
  doitBro()
//})

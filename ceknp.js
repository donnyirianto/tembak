var cron = require('node-cron');
const Models = require('./modelsnew/model')

process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 
 

const doitBro = async () => {
    try {    
      
      const start = new Date();
      console.log("Running At : " + start)    
      
        const results = await Models.getListIpCeknp();

        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data =========================  
          const queryTembak = `select 
          (select kirim from toko ) as kdcab,
          (select toko from toko ) as kdtk,
          (select addtime from npb_d where addid like '%${r.namafile_pilih}%' limit 1) as npb_d,
          (select cast(group_concat(distinct bukti_tgl) as char) as bukti_tgl from mstran where addid like '%${r.namafile_pilih}%' and rtype = 'BPB') as bukti_tgl,
          (select cast(group_concat(distinct bukti_no) as char) as bukti_no from mstran where addid like '%${r.namafile_pilih}%' and rtype = 'BPB') as no_bpb,
          (select sum(qty) from mstran where addid like '%${r.namafile_pilih}%' and rtype = 'BPB') as qty,
          (select sum(gross) from mstran where addid like '%${r.namafile_pilih}%' and rtype = 'BPB') as gross,
          (
            select if(log_item - log_item2 !=0,'Selisih','Normal') as sel_np
            from
            (
              select 
              (select sum(item) as item from dc_npbtoko_log where namafile rlike '${r.namafile_pilih}') as log_item,
              (
                select count(*) as item from dc_npbtoko_file where docno in(select docno from dc_npbtoko_log where namafile rlike '${r.namafile_pilih}')
              ) as log_item2
            ) a 
          ) sel_np;`

          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip1) 
          }else{ 
              const insertData = await Models.insertDataCeknp(r.namafile,rv) 
              console.log(r.kdtk +'|'+ r.kdcab +'|'+insertData)  
          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 

cron.schedule('*/10 * * * *', async() => { 
  doitBro()
})

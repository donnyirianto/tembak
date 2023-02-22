const Models = require('./modelsnew/model')  

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)      
        
        const results = await Models.getListSales();
       
        results.forEach( async (r) => { 
   //
        const queryTembak2 =`
        select 
(select kirim from toko) as kdcab,
(select toko from toko) as toko,
(select nama from toko) as nama,
a.nik,c.kasir_name,
a.tanggal as tanggal,
b.tanggal as tanggal_presensi, b.jam_in as jam_in_presensi,b.jam_out as jam_out_presensi,
c.trn_start as jam_start_initial,c.trn_end as jam_end_initial,
a.jam as jam_sales_pertama
from 
(select nik1 as nik,tanggal,min(jam) as jam from mtran where tanggal between '2023-01-01' and '2023-01-31' group by nik1,tanggal) a 
left join 
(
select 
CAST(DECODE(tanggal,'EuVxq6hKnqe7pNtsP9c2dePyez6ABuD5') AS CHAR) tanggal, 
nik, 
CAST(DECODE(jam_in,'EuVxq6hKnqe7pNtsP9c2dePyez6ABuD5') AS CHAR) jam_in,
CAST(DECODE(jam_out,'EuVxq6hKnqe7pNtsP9c2dePyez6ABuD5') AS CHAR) jam_out
from soppagent.absabsensitrnoffline 
where 
DECODE(tanggal,'EuVxq6hKnqe7pNtsP9c2dePyez6ABuD5')  between '2023-01-01' and '2023-01-31'
) b on a.nik =b.nik and a.tanggal = b.tanggal
left join 
(
select tanggal,nik,kasir_name,trn_start,trn_end  from initial where tanggal between '2023-01-01' and '2023-01-31'
) c on  a.nik =c.nik and a.tanggal = c.tanggal
;
 `
 
        const rv = await Models.vquery(r.ip1, queryTembak2)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal data') 
          }else{
            const insert = await Models.updatelistSales(rv)

            console.log(r.kdtk +'|'+ r.kdcab +'|'+rv.length+'|'+insert+'|Sukses') 
            
            
          }
          
        })
     
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
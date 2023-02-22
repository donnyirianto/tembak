
const Models = require('./modelsnew/modelbulanan')
 
process.setMaxListeners(0);

      
(async ()=>{
    try{  
          
        const results = await Models.getListServer();

        results.forEach( async (r) => {  

          const queryTembakx= `  
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211101 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211102 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211103 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211104 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211105 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211106 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211107 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211108 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211109 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211110 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211111 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211112 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211113 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211114 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211115 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211116 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211117 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211118 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211119 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211120 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211121 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211122 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211123 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211124 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211125 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211126 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211127 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211128 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211129 where tipe='grb' union all 
          select '${r.kdcab}' as KDCAB, TOKO AS SHOP, TANGGAL,STATION,SHIFT,DOCNO,TIPE AS TTYPE from byr_211130 where tipe='grb'
        `
          //console.log(r.ipserver,r.user,r.pass,r.database)
          const rv = await Models.vquery_array(r, queryTembakx)

            if(rv === "Gagal"){
              console.log(r.kdcab +'|Gagal') 
            }else{                       
              console.log(r.kdcab +'|Sukses|')
              await Models.insertData(rv)
            }
            
        })
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

})();        
       
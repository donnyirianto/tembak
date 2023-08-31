var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./models/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    
 
const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss"); 

    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListBs(); 
    
    list.forEach( async (r) => { 
        
      const queryCheck =`SELECT 
      (SELECT KIRIM FROM TOKO) AS KDCAB,
      (SELECT TOKO FROM TOKO) AS TOKO,
      '2023-08-21' AS TANGGAL,
      RECID,TIPERAK,NORAK,NOSHELF,KIRIKANAN,\`DIV\`,PRDCD,\`DESC\`,SINGKAT,BARCODE,BARCODE2,FRAC,UNIT,PTAG,CAT_COD,BKP,SUB_BKP,CTGR,KEMASAN,ACOST,LCOST,RCOST,PRICE,TTL,TTL1,TTL2,COM,HPP,SOID,EDIT,SOTYPE,SOTGL,SOTIME,ADJDT,ADJTIME,DRAFT,DCP,CTK
      From BS20230821${r.kdtk.substring(0,1)}`

      //const dataip =  await Ip.bykdtk(r.kdcab,r.kdtk);
      
      //if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(r.ip1, queryCheck)
        
        if(rv.status === "NOK" ){
          
          console.log(r.kdcab +'|'+ r.kdtk +'|gagal') 
          //await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)

        }else{ 
          if(rv.data.length > 0){
            await Models.UpdateFlagBS(rv.data)
            console.log(r.kdcab +'|'+ r.kdtk +'|Sukses') 
          }else {
            
            console.log(r.kdcab +'|'+ r.kdtk +'|Sukses| Tidak Ada Data') 
          }
          
        }

     /*  }else{
        console.log(r.KDCAB,r.TOKO, "IP Tidak Terdaftar")
      } */
       
     })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
 
cekToko() 
 
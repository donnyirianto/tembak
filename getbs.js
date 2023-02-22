var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./modelsnew/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    
 
const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListBs(); 
    
    list.forEach( async (r) => { 
        
        var queryCheck =`select 
        *,(select kirim from toko)  as KDCAB,
        (select toko from toko ) as TOKO,
        '2022-11-17' AS TANGGAL
        from bs20221117${r.kdtk.substring(0,1)}` 
      //const dataip =  await Ip.bykdtk(r.kdcab,r.kdtk);
      
      //if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(r.ip1, queryCheck)
        
        if(rv === "Gagal" ){
          
          console.log(r.kdcab +'|'+ r.kdtk +'|Gagal Koneksi') 
          //await Models.UpdateFlagPosrt(r.TOKO,tanggal,jam,`Koneksi Timeout`)

        }else{ 
          await Models.UpdateFlagBS(rv)
          console.log(r.kdcab +'|'+ r.kdtk +'|Sukses') 
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
 
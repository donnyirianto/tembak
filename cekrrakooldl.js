var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./models/model')
const Ip = require('./helpers/iptoko')

console.log("Service Start")    


const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    
    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListRRAK();
    
    var queryCheck =`select *, 
      if(rprenc > 0 and fvalid_true > 0, 'Sudah Input Sudah Validasi',
      if(rprenc > 0 and fvalid_true = 0, 'Sudah Input Belum Validasi','Belum Input RRAK')
      ) as keterangan
    from (
      select 
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        count(*) rec,
        SUM(qtyrenc) qtyrenc,
        SUM(rprenc) rprenc,
        SUM(rpreal) rpreal,
        sum(if(fvalid='true',1,0)) fvalid_true,
        sum(if(fvalid='false',1,0)) fvalid_false,
        sum(if(ftrf='true',1,0)) ftrf_true,
        sum(if(ftrf='false',1,0)) ftrf_false,
        date_format(tglbuat,'%Y-%m-%d %H-%i-%s') tglbuat 
      from rrak_rrak 
      where periode='202307'
    ) a` 
    
    list.forEach( async (r) => { 

      const dataip =  await Ip.bykdtk(r.toko);
      
      if(dataip != "Gagal" && dataip.data.length > 0){
        
        const rv = await Models.vquery(dataip.data[0].IP, queryCheck)
        
        if(rv.status === "NOK"){
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Gagal Koneksi')          
        }else{ 
          await Models.UpdateAbsenRrak(rv.data)
          console.log(dataip.data[0].KDCAB +'|'+ dataip.data[0].TOKO +'|Sukses') 
        }

      }else{
        console.log(r.kdcab,r.toko, "IP Tidak Terdaftar")
      }
       
    })
   
    
    return true

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
  
cron.schedule('*/30 * * * *', async() => { 
//(async() => { 
  try {
    
    await cekToko()

  } catch (e) {
    console.log(e)
  }
});
 
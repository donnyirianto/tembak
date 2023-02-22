const fs = require('fs'); 
const Models = require('./modelsnew/model')  

const deleteFile = (filePath) => {
  // Unlink the file.
  fs.unlink(filePath, (error) => {
    if (!error) {
       return "Sukses Hapus"
    } else {
      return "Gagal Hapus"
    }
  })
};

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    

      deleteFile('./data.txt');    
      const fileReport = fs.createWriteStream("data.txt");   
      fileReport.once('open', async function(fd) { 
        fs.appendFile('data.txt',"let Donny = [", errx => {
          if (errx) {
            console.log("error Tulis File")
            return true
          } 
          return true
        })      
        const results = await Models.getListIp();
       
        results.forEach( async (r) => { 
   
        const queryTembak2 =`
        select (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,
          plu,qty,tgl_awal,tgl_akh from fixed_tb where plu in(
          20069208,
          20036157,
          20019673,
          20090009
        );
` 
 
        const rv = await Models.vquery(r.ip1, queryTembak2)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal data') 
          }else{
            
            const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
           
            fs.appendFile('data.txt',a, errx => {
              if (errx) { 
                console.log(r.kdtk +'|'+ r.kdcab +'|Gagal')
                return true
              }else{
                console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                return true
              }
              
            })
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()

/* 
select 
(select kirim from toko) as kdcab,
(select toko from toko) as toko,
(select nama from toko) as nama,
(select itemsyarat from promo_matriks where kodepromo='HSFB0562') as item_syarat,
(select period1 from const where rkey='tmt') as tmt,
(select \`desc\` from const where rkey='dt_') as dt,
(select \`desc\` from const where rkey='dt1') as jam_trf_data,
(select tgl from tracelog_posnet where \`log\` rlike 'mulai' 
order by tgl desc limit 1) as buka_pos_kasir,
(select count(*) from ptag where kodepromo='HSFB0562' and prdcd !='20125798') as ptag,
(select count(*) from ptag_old where kodepromo='HSFB0562' and prdcd !='20125798') as ptag_old; */
const fs = require('fs'); 
const Models = require('./models/model')


process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 

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
    try{  
            
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
        })     
        const results = await Models.getListIp();
        
        results.forEach( async (r) => { 
          
          // ANCHOR ===============Query Ambil Data ========================= 
         
          const queryTembak = ` 
          SELECT
          (select kirim from toko) as kdcab,
          (select toko from toko) as toko,
          Kode,Sumber,
          CASE Pesanan_Diantar WHEN 'Y' THEN 'Diantar' WHEN 'N' THEN 'Diambil' END AS Jenis,
          CAST(DATE_FORMAT(IF(Tanggal_Kirim_Max='0000-00-00',NULL,Tanggal_Kirim_Min),'%Y-%m-%d') AS CHAR) AS TanggalKirimAmbil,
          CAST(DATE_FORMAT(IF(Tanggal_Kirim_Max='0000-00-00',NULL,Tanggal_Kirim_Min),'%H:%i:00') AS CHAR) AS JamKirimAmbil
          FROM pos.idelivery_pesanan
          WHERE Sumber IN ('ISTORE')
          AND DATE(Tanggal_Kirim_Max) <= CURDATE()
          AND Status NOT IN ('BOOKING', 'CANCEL')
          AND Cetak_SP IS NULL AND Keterangan IN('')
          ORDER BY Tanggal_Kirim_Max ASC;
          `
          
          const rv = await Models.vquery(r.ip1, queryTembak)
          let ket  = ""
          if(rv.status === "NOK"){
            console.log(r.kdtk +'|'+ r.kdcab +'|gagal') 
          }else{
            // console.log("sukses")
            // await Models.insertHasilFT(rv.data) 
            const a = JSON.stringify(rv.data).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
             ket = rv.data.length > 0 ? `Ada Data` : `Tidak ada Data`


            fs.appendFile('data.txt',a, errx => {
              if (errx) {
                console.log(r.kdtk +'|'+ r.kdcab +'|gagal|'+ket)
                return true
              }else{
                console.log(r.kdtk +'|'+ r.kdcab +'|sukses|'+ket)
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

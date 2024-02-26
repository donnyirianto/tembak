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
          
          const queryTembak = `select
          (select kirim from toko) as kdcab,
          (select toko from toko) as toko,
          (SELECT deskripsi FROM spec_hardware WHERE tag in('LOAD_POSMAIN') AND station in('01',1)) as LOAD_POSMAIN,
          (SELECT deskripsi FROM spec_hardware WHERE tag in('CETAK_STRUK_KASIR') AND station in('01',1)) as CETAK_STRUK_KASIR,
          (SELECT deskripsi FROM spec_hardware WHERE tag in('LAST BOOTING') AND station in('01',1)) as LAST_BOOTING,
          (select tgl from tracelog where date(tgl) = '2023-10-01' and appname rlike 'posidm' and \`log\` rlike 'mulai menjalankan Set_LastTransferAuto' order by tgl desc limit 1) as start_trf_data,
          (select tgl from tracelog where tgl >= (select concat('2023-10-01 ',\`desc\`) as tgl from const where rkey='TRF') and appname rlike 'posidm' and \`log\` rlike 'mulai menjalankan UpdateConstDT1' limit 1) as finish_trf_data,
          (select tgl from tracelog where date(tgl) = '2023-10-01' and log ='clstools.Cek_Fingerprint_v2 : panggil function otorisasi_new untuk transaksi INITIAL' order by tgl desc limit 1) as start_initial,
(select tgl from tracelog where date(tgl) = '2023-10-01' and log ='FrmMsgbox keterangan : INITIAL BERJALAN DENGAN SUKSES ! anda sudah dapat melakukan sales' order by tgl desc limit 1) as end_initial;`

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
/*
(select nama from toko) as nama,
(select tok24 from toko) as toko24,
(SELECT deskripsi FROM spec_hardware WHERE tag in('CPU_PROC') AND station in('01',1)) as CPU_PROC,
(SELECT deskripsi FROM spec_hardware WHERE tag in('OS_NAME') AND station in('01',1)) as OS_NAME,
(SELECT deskripsi FROM spec_hardware WHERE tag in('RAM_CUR') AND station in('01',1)) as RAM_CUR,
(SELECT deskripsi FROM spec_hardware WHERE tag in('Windows Bios Type') AND station in('01',1)) as Windows_Bios_Type,
(SELECT deskripsi FROM spec_hardware WHERE tag in('DISK_DRIVES') AND station in('01',1)) as DISK_DRIVES,

*/
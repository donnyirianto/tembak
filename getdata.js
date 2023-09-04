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
          select
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,
        (SELECT period1 FROM const WHERE rkey='tmt') as tmt,
        (SELECT rdocno FROM const WHERE rkey='trf') as trf_rdocno,
        (SELECT \`desc\` FROM const WHERE rkey='trf') as trf_desc
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
/*
Cek Spek
select
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,
        (select deskripsi from spec_hardware where station=1 and tag = 'RAM_CUR') as ram_1,
        (select deskripsi from spec_hardware where station=2 and tag = 'RAM_CUR') as ram_2,
        (select deskripsi from spec_hardware where station=1 and tag = 'Windows Bios Type') bios_1,
        (select deskripsi from spec_hardware where station=2 and tag = 'Windows Bios Type') bios_2

*/
const fs = require('fs'); 
const Models = require('./modelsnew/model') 
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
        //LIST IP ADA DI Folder Modelsnew/models/ cari function getListIp()
        const results = await Models.getListIp();
 
        results.forEach( async (r) => { 
          const queryTembak =`SELECT '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko
         `;

          const rv = await Models.vquerycheckpass(r.ip1, queryTembak)
           
          fs.appendFile('data.txt',rv, errx => {
              
              console.log(r.kdcab +'|'+ r.kdtk +'|'+rv)
              
              return true
            }  
          )
          
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
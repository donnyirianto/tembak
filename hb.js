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
        const results = await Models.getListIp();

        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data ========================= 
          const queryData = `SELECT  *,'${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko
          from heartbeat_edc where date(requesttime) between '2021-03-01' and '2021-03-31'
          `;
        

          const rv = await Models.vquery(r.ip1, queryData)
          
          if(rv === "G"){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
            const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
            fs.appendFile('data.txt',a+'\n', errx => {
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
const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');


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

        const results = await Models.getServerIris();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data ========================= 
          let data = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, `select count(*) as total from sales_per_item_2309;`)
          console.log(r.kdcab,data.data[0])
             
          }          
        )
      
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
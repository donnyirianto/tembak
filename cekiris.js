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
           

            const queryTembak = `select * from m_branch;`;

            const rv = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak)
            
            if(rv.status === "NOK"){
              console.log(`${r.kdcab}|GAGAL`)
            }else{
              
              const a = JSON.stringify(rv.data).replace(/[\]\[]/g,"") 
              //const report = `${r.kdcab}|${rv.status}\\n`
              // //const c = a.replace(/[}{]/g,"")
              fs.appendFile('data.txt',a, errx => {
                if (errx) {
                  console.log(`${r.kdcab}|GAGAL`)
                  return true
                }else{
                  console.log(`${r.kdcab}|SUKSES`)
                  return true
                }
                
              })
            }
          }          
        )
      
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
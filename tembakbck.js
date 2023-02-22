const { Console } = require('console');
const fs = require('fs');
const venvLocal = require('./Models/venvLocal');
const vquery = require('./Models/vquery');
const connection = require('./Models/zconn');
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
      while(true){         
          (async ()=>{
              try{  
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
                    
                    // ANCHOR ===============Query Ambil Data 
                  //create table bckdd_prodmast_210907 select * from prodmast;
                  //update prodmast set flagprod=replace(flagprod,'CBR=Y','');
                  //update program_setting set nilai = '07-09-2021 09:12:00' where program='POS.NET-POS.IDM';
                  //=========================  
 
                  const queryTembakx= `                  
                  update prodmast a, bckdd_prodmast_210907 b 
                    set a.flagprod = b.flagprod 
                  where 
                    a.prdcd = b.prdcd 
                    and b.flagprod like '%CBR%';
                  `
                  const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

                    //const rv= await Models.vqueryTembak(r.ip1, `SET GLOBAL max_allowed_packet=1073741824;`)
                   if(rv === "Gagal"){
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                    }else{                       
                        console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|')
                    }
                    
                  })
                })
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(3600000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
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
        select
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,
        (select tgl from tracelog where date(tgl) = '2023-02-20' and appname rlike 'posidm' and \`log\` rlike 'mulai menjalankan Set_LastTransferAuto' limit 1) as start_trf_data,
        (select tgl from tracelog where date(tgl) = '2023-02-20' and appname rlike 'posidm' and \`log\` rlike 'mulai menjalankan UpdateConstDT1' limit 1) as finish_trf_data;
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
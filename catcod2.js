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
        
         const queryTembak =`
         SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
          (select \`desc\` from const where rkey='dta') AS dta,
          (select \`desc\` from const where rkey='dt_') AS dt_,
          (select period1 from const where rkey='TMT') AS tmt,
          (select sum(if(length(CAST(CONCAT(KAT_DIV,KAT_DEP,KAT_CODE) AS char)) = 6,1,0)) from kat) as kat_6,
          (select sum(if(length(CAST(CONCAT(KAT_DIV,KAT_DEP,KAT_CODE) AS char)) = 5,1,0)) from kat) as kat_5,
          (select sum(if(length(cat_cod) = 6,1,0)) catcod6 from prodmast) prdomast_catcod_6,
          (select sum(if(length(cat_cod) = 5,1,0)) catcod5 from prodmast) prdomast_catcod_5,
          (select sum(if(length(catcode) = 6,1,0)) from mtran where tanggal=curdate()) mtran_catcod_6,
          (select sum(if(length(catcode) = 5,1,0)) from mtran where tanggal=curdate()) mtran_catcod_5;
         `;
         //RECID,ctgr,prdcd,singkatan,flagprod from prodmast where prdcd in(20033717)           
          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
            
          }else{
            const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
           
            fs.appendFile('data.txt', a, async(errx) => {

              await Models.updateFlag(r.kdtk)  
              
            })
            
            console.log(r.kdtk +'|'+ r.kdcab +'|Sukses') 
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 
doitBro()
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
  
        const results = await Models.getListIpAdj();

        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data INS=========================  
          

          //const rv = await Models.vquery(r.ip1, `update mstran set INV_DATE='2022-06-26',bukti_tgl='2022-06-26' where rtype='X' and bukti_no='99990' and prdcd ='${r.prdcd}';`)

          const rv = await Models.vquery(r.ip1, r.query)
          
          if(rv === "G" || rv === "Gagal" ){
              console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|' + r.ip1 + '|PRDCD' + r.prdcd) 
          }else{
             
              await Models.insertDataAdj(r.kdtk,r.prdcd) 
              console.log(r.kdtk +'|'+ r.kdcab +'|Sukses') 

          }
          
     }) 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 
doitBro()
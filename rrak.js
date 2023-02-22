const fs = require('fs'); 
const Models = require('./modelsnew/model') 
process.setMaxListeners(0);  

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    

    
      const fileReport = fs.createWriteStream("data.txt");   
      fileReport.once('open', async function(fd) { 
        fs.appendFile('data.txt',"let Donny = [", errx => {
          if (errx) {
            console.log("error Tulis File")
            return true
          } 
          return true
        })     
        const kodecabang = `'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305','G232','G224','G234','G236','G237'`
        const results = await Models.getListIpRrak(kodecabang); 

        results.forEach( async (r) => { 
          
          const queryTembak = `SELECT  
          (select kirim from toko) as kdcab, 
          (select toko from toko) as kdtk, 
          (select nama from toko) as nama_toko,
          (select count(*) from rrak_mrrak) as rrak_mrrak,
          (select count(*) from rrak_rrak where periode='202211') as rrak_rrak_11,
          (select count(*) from rrak_rrak where periode='202212') as rrak_rrak_12,
          (select cast(group_concat(distinct periode) as char) from rrak_rrak) as detail_rrak,
          (select count(*) from rrak_mrrak where keter='FotoCopy + Laminating') as valid;
          `;

          const rv = await Models.vquery(r.IP_INDUK, queryTembak)
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.TOKO +'|'+ r.KDCAB +'|Gagal', rv) 
          }else{
              const insertData = await Models.insertDataRrak(rv) 
              console.log(r.TOKO +'|'+ r.KDCAB +'|'+insertData) 
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
}
 

doitBro()


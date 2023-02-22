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
         //(select sum(saldo_akh) from ${r.kdtk}2301) as saldo_akh, 
      //(select sum(saldo_akh) from ${r.kdtk}2301) as saldo_akh,
         const queryTembak =`
         SELECT 
         (select kirim from toko) as kdcab,
         (select kdtk from toko) as kdtk,
         (select nama from toko) as nama,  
         (select docno from const where rkey='PRD') as prd,
         (select COUNT(*) from information_schema.tables where table_name='${r.kdtk}2301') as ada_table,
         (select TABLE_ROWS from information_schema.tables where table_name='${r.kdtk}2301') as total_rows_filet,
         (select TABLE_ROWS from information_schema.tables where table_name='stmast') as total_rows_stmast,
         (select sum(begbal) from stmast) as begbal,
         (SELECT COUNT(*) FROM STMAST WHERE BEGBAL < 0 and cat_cod not in(54005,44601,44602,44603,44604,44605,44606,64601,64602,64603,64604,64605,64606,55401,55402,55403,55404,55405,55406,55407,55408,55409,55501,55502,55503,55504,55601,55701,55702,55703,55801,55802,55803,55804,55805,63801,63802,63803,63804,63805,63806,63807,63808,63809,63810,63811,65901,65902,66001,66002,66003,66101,66102,66201,66202,66301,66401,66402,66501,66502,66503,66601,66602,66701,66702,66801,66802,66901,66902,67001,67101,67201,67202,67301,67302,67401,67402,054005,044601,044602,044603,044604,044605,044606,064601,064602,064603,064604,064605,064606,055401,055402,055403,055404,055405,055406,055407,055408,055409,055501,055502,055503,055504,055601,055701,055702,055703,055801,055802,055803,055804,055805,063801,063802,063803,063804,063805,063806,063807,063808,063809,063810,063811,065901,065902,066001,066002,066003,066101,066102,066201,066202,066301,066401,066402,066501,066502,066503,066601,066602,066701,066702,066801,066802,066901,066902,067001,067101,067201,067202,067301,067302,067401,067402)) BEGBAL_MINUS,
         (SELECT COUNT(*) FROM STMAST WHERE QTY < 0 and cat_cod not in(54005,44601,44602,44603,44604,44605,44606,64601,64602,64603,64604,64605,64606,55401,55402,55403,55404,55405,55406,55407,55408,55409,55501,55502,55503,55504,55601,55701,55702,55703,55801,55802,55803,55804,55805,63801,63802,63803,63804,63805,63806,63807,63808,63809,63810,63811,65901,65902,66001,66002,66003,66101,66102,66201,66202,66301,66401,66402,66501,66502,66503,66601,66602,66701,66702,66801,66802,66901,66902,67001,67101,67201,67202,67301,67302,67401,67402,054005,044601,044602,044603,044604,044605,044606,064601,064602,064603,064604,064605,064606,055401,055402,055403,055404,055405,055406,055407,055408,055409,055501,055502,055503,055504,055601,055701,055702,055703,055801,055802,055803,055804,055805,063801,063802,063803,063804,063805,063806,063807,063808,063809,063810,063811,065901,065902,066001,066002,066003,066101,066102,066201,066202,066301,066401,066402,066501,066502,066503,066601,066602,066701,066702,066801,066802,066901,066902,067001,067101,067201,067202,067301,067302,067401,067402)) STOCK_MINUS,
         (select sum(\`max\`) from stmast) pkm_toko         
         ;
         `

       
          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
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
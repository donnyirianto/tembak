const fs = require('fs'); 
const Models = require('./models/model') 
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
         select 
         (SELECT KIRIM FROM TOKO ) AS KDCAB,
          (SELECT TOKO FROM TOKO ) AS TOKO,
          (SELECT NAMA FROM TOKO ) AS NAMA
          count(*) ast total_selisih 
        FROM(
         SELECT *,
          (SALDO_AWAL+TRFIN-TRFOUT-SALES+RETUR+ADJ+QTY_BS+QTY_BA) SALDO_AKH,
          QTY_STMAST-(SALDO_AWAL+TRFIN-TRFOUT-SALES+RETUR+ADJ+QTY_BS+QTY_BA) SEL_SALDO,
          BEGBAL-(SALDO_AWAL+TRFIN-TRFOUT-SALES+RETUR+ADJ+QTY_BS+QTY_BA) SEL_SALDO_BEGBAL,
          (SELECT KIRIM FROM TOKO ) AS KDCAB,
          (SELECT TOKO FROM TOKO ) AS TOKO,
          (SELECT NAMA FROM TOKO ) AS NAMA
          FROM
          (
              SELECT
              A.PRDCD,A.BEGBAL,
              IFNULL(B.SALDO_AKH,0) SALDO_AWAL,
              IFNULL(C.SALES,0) SALES,
              IFNULL(C.RETUR,0) RETUR,
              IFNULL(D.TRFIN,0) TRFIN,
              IFNULL(D.TRFOUT,0) TRFOUT,
              IFNULL(D.ADJ,0) ADJ,
              IFNULL(D.QTY_BA,0) QTY_BA,
              IFNULL(D.QTY_BS,0) QTY_BS,
              A.QTY QTY_STMAST
          FROM
              (SELECT * FROM STMAST WHERE LEFT(CAT_COD,3) NOT IN ('055') AND CAT_COD NOT IN (054003,054005)) A
          LEFT join ${r.kdtk}2303 B
          ON A.PRDCD=B.PRDCD
          LEFT JOIN
              (
                  SELECT
                      PLU,
                      SUM(IF(RTYPE='J',QTY,0)) AS SALES,
                      SUM(IF(RTYPE='D',QTY,0)) AS RETUR
                  FROM MTRAN 
                  WHERE TANGGAL RLIKE '2023-04' AND LEFT(CATCODE,3) NOT IN ('055') AND CATCODE NOT IN (054003,054005)
                  GROUP BY PLU
              ) C
          ON A.PRDCD=C.PLU
          LEFT JOIN
          (
              SELECT
                  PRDCD,
                  SUM(IF(RTYPE IN ('BPB','I'),QTY,0)) AS TRFIN,
                  SUM(IF(RTYPE IN ('K','O'),QTY,0)) AS TRFOUT,
                  SUM(IF(RTYPE='X' AND ISTYPE NOT IN ( 'BA','BAIV', 'BA SPL', 'BARSK', 'BASMP', 'BAKLB', 'BARD', 'BACSP', 'BATLJ','BS'),QTY,0)) AS ADJ,
                  SUM(IF(RTYPE='X' AND ISTYPE IN ( 'BA','BAIV', 'BA SPL', 'BARSK', 'BASMP', 'BAKLB', 'BARD', 'BACSP', 'BATLJ'),QTY,0)) AS QTY_BA,
                  SUM(IF(RTYPE='X' AND ISTYPE='BS',QTY,0)) AS QTY_BS
              FROM MSTRAN WHERE BUKTI_TGL RLIKE '2023-04'
          GROUP BY PRDCD
          ) D
          ON A.PRDCD=D.PRDCD
          ) A 
          having SEL_SALDO_BEGBAL != 0 OR SEL_SALDO !=0
          ) A
         ;
         `

       
          const rv = await Models.vquery(r.ip1, queryTembak)
          
          if(rv === "G" || rv.status === "Gagal" ){
            console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
          }else{
            const a = JSON.stringify(rv.data).replace(/[\]\[]/g,"") 
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
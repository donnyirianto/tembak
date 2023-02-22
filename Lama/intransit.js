const fs = require('fs');
const venvLocal = require('./Models/venvLocal');
const vquery = require('./Models/vquery');
const connection = require('./Models/zconn');
  
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
                      return true
                    }
                    console.log("error Tulis File")
                  })     

                  // ANCHOR =============== PILIH TOKO =========================
                  const qtoko = "select b.kdtk,b.nama,b.kdcab,b.ip1,a.docnonpb from intransit a left join ip b on a.kdtk=b.kdtk"  
                  //========================================
                  
                  const conn = await connection(venvLocal).catch(e => {console.log(e)}) 
                  const results = await vquery(conn, qtoko).catch( e =>{console.log(e)});

                  results.forEach( async (r) => {
                    
                    const c = {port: 3306,host: r.ip1, user: "kasir",password: "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ", database: "pos", multipleStatements: true, dateStrings:true}                
                    //const c = {port: 3306,host: r.ip1, user: "root",password: "N8rM5RmJYbKGbEFWuvuSb6bauDFB3BPTc=zOMd2onoNJ", database: "pos", multipleStatements: true, dateStrings:true}                
                    const c2 = {port: 3306,host: r.ip1, user: "kasir",password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn", database: "pos", multipleStatements: true, dateStrings:true}                
                    const conn_toko = await connection(c).catch( async (e) => {
                      try {
                        const connx = await connection(c2)
                        return connx
                      } catch (error) {
                        //console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Koneksi')
                        return "None";                        
                      }
                    }) 

                    // ANCHOR ===============Query Ambil Data =========================
					//RECID,RKEY,\`DESC\`,JENIS, (SELECT FILTER FROM VIR_BACAPROD WHERE JENIS = 'ONLINETBM') AS TBM from const where rkey='PCO';`
                    const queryTembak = `SELECT '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    '${r.docnonpb}' as no_npd,
                    (select docno from npb_d where docno='${r.docnonpb}' limit 1) as docno_npbd,
                    (select sum(qty) from npb_d where docno='${r.docnonpb}' limit 1) as qty_npbd,
                    (select  bukti_no from mstran where invno='${r.docnonpb}' and rtype='BPB' group by bukti_no) as no_bpb,
                    (select  sum(qty) as qty_bpb from mstran where invno='${r.docnonpb}' and rtype='BPB' group by bukti_no) as qty_bpb
                    ;`
                    //========================================
                    
                    const rv = await vquery(conn_toko, queryTembak).catch(e=>{ })
                    try {
                      if(rv === undefined || rv ==="Gagal"){
                        throw err
                      }else{
                        const a = JSON.stringify(rv).replace(/[\]\[]/g,"") 
                        //const c = a.replace(/[}{]/g,"")
                        fs.appendFile('data.txt',a, errx => {
                          if (errx) {
                            return true
                          }
                          console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                        })
                      } 
                     
                    } catch (e) {
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Query') 
                      return true
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
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
                  })     

                  // ANCHOR =============== PILIH TOKO =========================
                  const qtoko = "SELECT * FROM zarvi.ip WHERE KDTK NOT IN ('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T4TG','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020')"  
				          //const qtoko = "SELECT * FROM zarvi.ip ORDER BY kdtk"  
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
                        return "None";                        
                      }
                    }) 

                    // ANCHOR ===============Query Ambil Data =========================
                    const queryTembak = `SELECT  *,'${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko, 
                                        (SELECT FILTER FROM VIR_BACAPROD WHERE JENIS = 'ONLINETBM') AS TBM from const where rkey='PCO';`
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
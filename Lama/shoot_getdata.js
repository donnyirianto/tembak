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
                      console.log("error Tulis File")
                      return true
                    }
                    
                  })     

                  // ANCHOR =============== PILIH TOKO =========================
                  // pco const qtoko = "SELECT * FROM zarvi.ip where kdtk not in('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T4TG','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020')"  
                  const qtoko = "SELECT * FROM zarvi.ip where nama not like '%bandara%' AND kdtk not in('F476','FAP0','FBLP','FF37','FFHL','FOOD','FX02','FYMQ','FZU3','T02R','T02T','T08R','T09Y','T0AL','T0BA','T0BK','T0FK','T0KH','T0NY','T0P4','T0PO','T0RS','T0SW','T0UU','T0ZK','T11Q','T15R','T1BK','T1PA','T1UW','T1X2','T1XK','T1YO','T20P','T24R','T28Q','T28R','T29Q','T2BD','T2CB','T2DU','T2M2','T2TZ','T33I','T34R','T39Q','T39T','T3AO','T3B7','T3EE','T3MT','T3OM','T3VJ','T407','T415','T42T','T44N','T4AL','T4H8','T4KH','T4LR','T4MD','T4S4','T4TG','T55T','T5AL','T5CR','T5F2','T5KF','T5KK','T5KL','T5PU','T61C','T65P','T663','T673','T680','T687','T699','T6AR','T6FH','T6FL','T6KH','T6MC','T6O3','T6Z5','T6ZS','T70M','T73H','T76V','T77C','T7A1','T7DJ','T7IO','T7MP','T7R2','T7U7','T7UW','T8GB','T8P0','T8UM','T9EJ','T9KH','T9NN','T9QW','T9RE','T9TX','TA07','TA09','TA17','TA1B','TA49','TA4K','TA56','TACK','TADA','TAGU','TAH6','TAH7','TAHR','TAL5','TALQ','TALU','TAQH','TAR0','TART','TASR','TAXM','TAZM','TB01','TB04','TB2L','TBBM','TBCR','TBDV','TBEF','TBEO','TBEX','TBGE','TBJR','TBLR','TBLU','TBMR','TBUM','TBY2','TC2L','TC3L','TC4N','TC9L','TC9R','TCAF','TCJS','TCK5','TCMG','TCMN','TCNN','TCUW','TCVW','TD3R','TD45','TD50','TD99','TDAZ','TDBF','TDDY','TDFI','TDIK','TDL4','TDMQ','TDOF','TDOZ','TDPI','TDPT','TDQQ','TDTQ','TDTZ','TDVX','TEBA','TECW','TEEQ','TEGT','TEGU','TEH9','TEHC','TEHL','TEID','TELW','TENY','TEO5','TEPG','TEPJ','TESI','TESQ','TEUN','TEVE','TEVR','TEVW','TEWN','TEWV','TEXP','TF02','TF04','TF30','TF54','TF82','TF83','TFCL','TFFF','TFLH','TFM6','TFMU','TFSE','TFUA','TG2R','TG3J','TG3X','TG4C','TG7Q','TGMA','TGOC','TGPX','TGSC','TGXG','TH6G','THAE','THCM','THEH','THEZ','THF5','THFE','THGF','THH2','THHA','THHD','THK1','THK7','THKK','THNO','THOP','THPM','THPX','THSA','THTT','THUV','THV5','THXB','TI5U','TI66','TI7Y','TIA8','TICD','TIDI','TIE4','TIE5','TIID','TIJ8','TIMX','TIOO','TIWC','TJ0X','TJ8T','TJAT','TJBB','TJIT','TJJK','TJJZ','TJKJ','TJKK','TJM2','TJPD','TJPG','TJTI','TK30','TK43','TK5T','TKDN','TKGA','TKGE','TKGK','TKIA','TKIV','TKK0','TKLJ','TKLM','TKMF','TKPD','TKU3','TL8V','TL9L','TLA3','TLJF','TLN7','TLO3','TLPD','TLR8','TLTK','TLTY','TLU4','TLW7','TLWD','TM4J','TM7U','TMCH','TMCS','TMHR','TMHY','TMIW','TMIZ','TMPO','TMPQ','TMSV','TMTB','TMTF','TMYK','TN28','TN4S','TNAF','TNAL','TNBA','TNEP','TNGU','TNIE','TNJP','TNLV','TNM3','TNPW','TNSQ','TNUA','TNVI','TOCH','TONU','TOPG','TOWH','TP4O','TP4T','TP6O','TPAK','TPAW','TPDA','TPDM','TPDP','TPIC','TPID','TPIJ','TPIW','TPME','TPPA','TQ13','TQ19','TQ20','TQ39','TQ41','TQ59','TQ5Q','TQ63','TQ64','TQ73','TQ75','TQ84','TQ86','TQ89','TQ95','TQEU','TQFV','TQLA','TQON','TR2E','TR2F','TR3K','TR5Y','TR7G','TRBL','TRCY','TRDQ','TRHD','TRHS','TRIN','TRIZ','TRMP','TRRK','TRSU','TRTG','TRTS','TRWO','TS46','TS4J','TS50','TS7X','TS83','TSAL','TSAP','TSEP','TSHE','TSKF','TSKG','TSOD','TSOT','TSRR','TSSG','TSUK','TSVY','TSW3','TT7A','TTBH','TTBO','TTDB','TTE7','TTGB','TTGH','TTGI','TTJS','TTJU','TTKW','TTM5','TTPP','TTRS','TTRW','TTSJ','TTTI','TTTZ','TU2O','TUAL','TUBR','TUD8','TUER','TUF8','TUGL','TUGM','TUKM','TULI','TULM','TUM7','TUMF','TUNT','TURA','TURD','TURH','TUUZ','TUV3','TUWM','TUXX','TV5I','TV70','TVCM','TVGY','TVNC','TVQE','TVR1','TVRB','TVUZ','TVWB','TW0W','TWHH','TWJF','TWOT','TWP5','TWPT','TWTA','TWUN','TWWD','TWYS','TXNT','TXO8','TXPP','TXR8','TXSR','TY4R','TYAW','TYE7','TYEZ','TYLD','TYLT','TYTR','TYUA','TYUU','TZ1N','TZAP','TZAY','TZDA','TZEM','TZEO','TZMU','TZPG','TZTD','TZVG','TZXR')"  
                  //const qtoko = "SELECT * FROM zarvi.ip WHERE KDTK IN ('F1CC','FIJH','TB02','FAKY','TIG4','F2XX','FX9X','TQH5','F3V5','TYNU','TYNG','TWTA','TWOT','TWEM','TV1M','TAZG','TCO0','FRS4','TWIZ','FOK1','T55T','TIJ8','TYQW','T7Q6','THAD','TK46','TUR6','T1L1','TVQD','TXO8','TY27','FP2W','FTPI','TVWF','F47L','TJ1U','TN4R','TAH7','TDVB','TUE5','TJ8T','TITJ','TXJN','TDNW','TOHC','F6JP','F6FF','F4SY','T2KM','TXIE','TAGU','TMTT','TN3X','TQWV','TC2Q','FOGV','F14C','F0EP','TWWT','F44K','TE4Z','T14F','TEJ2','TH0A','F89L','TL7C','TE7I','TIHI','T86C','TFJL','TEEQ','FEDA','TMMM','FIA5','TAEC','T1UB','TMDF','FIGT','TQN8','TPID','F9FD','T4Q1','T6RA','TOQ9','TOOK','TIIU','TT6I','T8DO','TTLV','TUX5','T28Q','TWCL','TU3J','TWI0','TSYS','TT1K','TUPB','TUNA','TW0Z','TUVK','TW9C','TURU','TLY3','TUIA','TGNP','T6M1','TK45','TW9X','TI0I','T3YV','TYH3','TYJK','T0N0','TICE','FW90','TT3Q','TWCR','TEZE','TS3X','TUIG','TEKK','F657','TE7Z','TPUG','TWZW','F78A','TWWD','F2TO','FXSS','T54T','TX0W','T000','TTCA','TYH4','TLF0','F76L','TF30','FD51','FBVQ','FBPP','T5OS','T4AL','FR70','FQ3R','FDON','TDVX','TQQK','FPYR','T1LN','T22D','TLQG','T1LW','T1KH','TQ12','TAH6','TFPV','THLJ','T5TG','TG3J','TAN8','FOAR','FF3N','T9KH','TUG3','TSNC','T007','TPSH','FKHP','TK30','TPV4','T1OH','T1UW','T3Z9','TSSG','T61C','FTXO','FGUE','TPJ0','T3RX','TXQY','T623','TRHS','T491','TSOZ','TFW5','TFMU','T5W9','T620','TRAK','TFFN','TPV6','FZIJ','TQVR','T406','TPY9','TDIK','FAI9','T6FF','TX5F','TKKA','T1G1','TREM','TF0M','T0G1','TAYU','TI9U','TTWX','T1UZ','TLPU','TBIU','FHEN','F1L3','FEF5','F468','FETS','FIN6','TIML','T0AK','T2R5','T6DN','T4TG','TKEX','T55H','FLRP','TD3N','TD0A','T6ZS','TVB8','F911','TFIK','TRPZ','T11Y','T8YR','FC82','TV3I','TXVV','TY4R','TRYY','FD52','TIL1','TXFB','TT00','TACI','TA06','T17F','TF62','T9VB','T5QM','TAH8','FUH3','TBDF','TO3X','T5PU','TROG','T0W9','TVZ7','FZ7C','TQ64','FZPP','TZTI','TIA9','FQ73','T7I4','TUMN','FELT','T4R6','T0TD','T7BD','T56C','T7JA','T0ZI','T53W','T5HF','FW7X','FD42','TQUE','TD8L','TNBB','TA0N','TH5G','FGHB','TOB0','TPAR','TX6R','TRHK','TR8I','TF0I','THB0','FM78','TO99','TUTT')"  
                  //========================================
                  
                  const conn = await connection(venvLocal).catch(e => {console.log(e)}) 
                  const results = await vquery(conn, qtoko).catch( e =>{console.log(e)});

                  results.forEach( async (r) => {
                    
                  
                    
                    const c = {port: 3306,host: r.ip1, user: "kasir",password: "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ", database: "pos", multipleStatements: true, dateStrings:true}                
                    const c2 = {port: 3306,host: r.ip1, user: "root",password: "5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4", database: "pos", multipleStatements: true, dateStrings:true}                
                    //const c2 = {port: 3306,host: r.ip1, user: "kasir",password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn", database: "pos", multipleStatements: true, dateStrings:true}                
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
                    /* 
                    const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    RECID,RKEY,JENIS, (SELECT FILTER FROM VIR_BACAPROD WHERE JENIS = 'ONLINETBM') AS TBM from const where rkey='PCO';`
                    *//* 
                    const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    COUNT(*) as total FROM mstran WHERE prdcd IN (SELECT prdcd FROM prodmast WHERE flagprod LIKE '%pnjm%')` */

                    const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    (select count(*) as t from promo_matriks where date(tanggalakhir) >= curdate()
                    and tipepromo like '%ptw%' or tipepromo like 'hanya 3%') as total`
                   /*  const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                      (SELECT COUNT(*) AS TOTAL FROM FEE) AS TDATA_FEE,
                      (SELECT COUNT(*) AS TOTAL FROM PRODMAST WHERE FLAGPROD LIKE '%CBR%') AS TDATA_CBR,
                      (SELECT PERIOD1 FROM CONST WHERE RKEY='TMT') AS PERIODE_TMT,
                      (SELECT FILTER FROM VIR_BACAPROD WHERE JENIS='SKIP_ODBC') AS SKIP_ODBC;`; */
                      /* const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    (SELECT COUNT(*) AS TOTAL FROM FEE) as total_fee */
                    //========================================
                    /*const queryTembak = `SELECT  '${r.kdcab}' as kdcab, '${r.kdtk}' as kdtk, '${r.nama}' as nama_toko,
                    jenis, filter from vir_bacaprod where jenis='SKIP_ODBC';`;
                    */
                    //from stmast where  (max is null or max = '') ;`;
                    
                    const rv = await vquery(conn_toko, queryTembak).catch(e=>{ console.log("error")})
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
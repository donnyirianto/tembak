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
                
                  //const qtoko = "SELECT * FROM zarvi.ip where kdtk not in('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T4TG','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020')"  
                  //const qtoko = "SELECT * FROM zarvi.ip WHERE nama not like '%bandara%' AND kdtk not in('F476','FAP0','FBLP','FF37','FFHL','FOOD','FX02','FYMQ','FZU3','T02R','T02T','T08R','T09Y','T0AL','T0BA','T0BK','T0FK','T0KH','T0NY','T0P4','T0PO','T0RS','T0SW','T0UU','T0ZK','T11Q','T15R','T1BK','T1PA','T1UW','T1X2','T1XK','T1YO','T20P','T24R','T28Q','T28R','T29Q','T2BD','T2CB','T2DU','T2M2','T2TZ','T33I','T34R','T39Q','T39T','T3AO','T3B7','T3EE','T3MT','T3OM','T3VJ','T407','T415','T42T','T44N','T4AL','T4H8','T4KH','T4LR','T4MD','T4S4','T4TG','T55T','T5AL','T5CR','T5F2','T5KF','T5KK','T5KL','T5PU','T61C','T65P','T663','T673','T680','T687','T699','T6AR','T6FH','T6FL','T6KH','T6MC','T6O3','T6Z5','T6ZS','T70M','T73H','T76V','T77C','T7A1','T7DJ','T7IO','T7MP','T7R2','T7U7','T7UW','T8GB','T8P0','T8UM','T9EJ','T9KH','T9NN','T9QW','T9RE','T9TX','TA07','TA09','TA17','TA1B','TA49','TA4K','TA56','TACK','TADA','TAGU','TAH6','TAH7','TAHR','TAL5','TALQ','TALU','TAQH','TAR0','TART','TASR','TAXM','TAZM','TB01','TB04','TB2L','TBBM','TBCR','TBDV','TBEF','TBEO','TBEX','TBGE','TBJR','TBLR','TBLU','TBMR','TBUM','TBY2','TC2L','TC3L','TC4N','TC9L','TC9R','TCAF','TCJS','TCK5','TCMG','TCMN','TCNN','TCUW','TCVW','TD3R','TD45','TD50','TD99','TDAZ','TDBF','TDDY','TDFI','TDIK','TDL4','TDMQ','TDOF','TDOZ','TDPI','TDPT','TDQQ','TDTQ','TDTZ','TDVX','TEBA','TECW','TEEQ','TEGT','TEGU','TEH9','TEHC','TEHL','TEID','TELW','TENY','TEO5','TEPG','TEPJ','TESI','TESQ','TEUN','TEVE','TEVR','TEVW','TEWN','TEWV','TEXP','TF02','TF04','TF30','TF54','TF82','TF83','TFCL','TFFF','TFLH','TFM6','TFMU','TFSE','TFUA','TG2R','TG3J','TG3X','TG4C','TG7Q','TGMA','TGOC','TGPX','TGSC','TGXG','TH6G','THAE','THCM','THEH','THEZ','THF5','THFE','THGF','THH2','THHA','THHD','THK1','THK7','THKK','THNO','THOP','THPM','THPX','THSA','THTT','THUV','THV5','THXB','TI5U','TI66','TI7Y','TIA8','TICD','TIDI','TIE4','TIE5','TIID','TIJ8','TIMX','TIOO','TIWC','TJ0X','TJ8T','TJAT','TJBB','TJIT','TJJK','TJJZ','TJKJ','TJKK','TJM2','TJPD','TJPG','TJTI','TK30','TK43','TK5T','TKDN','TKGA','TKGE','TKGK','TKIA','TKIV','TKK0','TKLJ','TKLM','TKMF','TKPD','TKU3','TL8V','TL9L','TLA3','TLJF','TLN7','TLO3','TLPD','TLR8','TLTK','TLTY','TLU4','TLW7','TLWD','TM4J','TM7U','TMCH','TMCS','TMHR','TMHY','TMIW','TMIZ','TMPO','TMPQ','TMSV','TMTB','TMTF','TMYK','TN28','TN4S','TNAF','TNAL','TNBA','TNEP','TNGU','TNIE','TNJP','TNLV','TNM3','TNPW','TNSQ','TNUA','TNVI','TOCH','TONU','TOPG','TOWH','TP4O','TP4T','TP6O','TPAK','TPAW','TPDA','TPDM','TPDP','TPIC','TPID','TPIJ','TPIW','TPME','TPPA','TQ13','TQ19','TQ20','TQ39','TQ41','TQ59','TQ5Q','TQ63','TQ64','TQ73','TQ75','TQ84','TQ86','TQ89','TQ95','TQEU','TQFV','TQLA','TQON','TR2E','TR2F','TR3K','TR5Y','TR7G','TRBL','TRCY','TRDQ','TRHD','TRHS','TRIN','TRIZ','TRMP','TRRK','TRSU','TRTG','TRTS','TRWO','TS46','TS4J','TS50','TS7X','TS83','TSAL','TSAP','TSEP','TSHE','TSKF','TSKG','TSOD','TSOT','TSRR','TSSG','TSUK','TSVY','TSW3','TT7A','TTBH','TTBO','TTDB','TTE7','TTGB','TTGH','TTGI','TTJS','TTJU','TTKW','TTM5','TTPP','TTRS','TTRW','TTSJ','TTTI','TTTZ','TU2O','TUAL','TUBR','TUD8','TUER','TUF8','TUGL','TUGM','TUKM','TULI','TULM','TUM7','TUMF','TUNT','TURA','TURD','TURH','TUUZ','TUV3','TUWM','TUXX','TV5I','TV70','TVCM','TVGY','TVNC','TVQE','TVR1','TVRB','TVUZ','TVWB','TW0W','TWHH','TWJF','TWOT','TWP5','TWPT','TWTA','TWUN','TWWD','TWYS','TXNT','TXO8','TXPP','TXR8','TXSR','TY4R','TYAW','TYE7','TYEZ','TYLD','TYLT','TYTR','TYUA','TYUU','TZ1N','TZAP','TZAY','TZDA','TZEM','TZEO','TZMU','TZPG','TZTD','TZVG','TZXR')"  
                  //'G301','G305','G148','G025','G004','G034','G146','G158','G174','G030','G177'
                  const qtoko = "SELECT * FROM zarvi.ip WHERE kdcab in('G030','G146') AND nama not like '%bandara%' and  kdtk not in('F476','FAP0','FBLP','FF37','FFHL','FOOD','FX02','FYMQ','FZU3','T02R','T02T','T08R','T09Y','T0AL','T0BA','T0BK','T0FK','T0KH','T0NY','T0P4','T0PO','T0RS','T0SW','T0UU','T0ZK','T11Q','T15R','T1BK','T1PA','T1UW','T1X2','T1XK','T1YO','T20P','T24R','T28Q','T28R','T29Q','T2BD','T2CB','T2DU','T2M2','T2TZ','T33I','T34R','T39Q','T39T','T3AO','T3B7','T3EE','T3MT','T3OM','T3VJ','T407','T415','T42T','T44N','T4AL','T4H8','T4KH','T4LR','T4MD','T4S4','T4TG','T55T','T5AL','T5CR','T5F2','T5KF','T5KK','T5KL','T5PU','T61C','T65P','T663','T673','T680','T687','T699','T6AR','T6FH','T6FL','T6KH','T6MC','T6O3','T6Z5','T6ZS','T70M','T73H','T76V','T77C','T7A1','T7DJ','T7IO','T7MP','T7R2','T7U7','T7UW','T8GB','T8P0','T8UM','T9EJ','T9KH','T9NN','T9QW','T9RE','T9TX','TA07','TA09','TA17','TA1B','TA49','TA4K','TA56','TACK','TADA','TAGU','TAH6','TAH7','TAHR','TAL5','TALQ','TALU','TAQH','TAR0','TART','TASR','TAXM','TAZM','TB01','TB04','TB2L','TBBM','TBCR','TBDV','TBEF','TBEO','TBEX','TBGE','TBJR','TBLR','TBLU','TBMR','TBUM','TBY2','TC2L','TC3L','TC4N','TC9L','TC9R','TCAF','TCJS','TCK5','TCMG','TCMN','TCNN','TCUW','TCVW','TD3R','TD45','TD50','TD99','TDAZ','TDBF','TDDY','TDFI','TDIK','TDL4','TDMQ','TDOF','TDOZ','TDPI','TDPT','TDQQ','TDTQ','TDTZ','TDVX','TEBA','TECW','TEEQ','TEGT','TEGU','TEH9','TEHC','TEHL','TEID','TELW','TENY','TEO5','TEPG','TEPJ','TESI','TESQ','TEUN','TEVE','TEVR','TEVW','TEWN','TEWV','TEXP','TF02','TF04','TF30','TF54','TF82','TF83','TFCL','TFFF','TFLH','TFM6','TFMU','TFSE','TFUA','TG2R','TG3J','TG3X','TG4C','TG7Q','TGMA','TGOC','TGPX','TGSC','TGXG','TH6G','THAE','THCM','THEH','THEZ','THF5','THFE','THGF','THH2','THHA','THHD','THK1','THK7','THKK','THNO','THOP','THPM','THPX','THSA','THTT','THUV','THV5','THXB','TI5U','TI66','TI7Y','TIA8','TICD','TIDI','TIE4','TIE5','TIID','TIJ8','TIMX','TIOO','TIWC','TJ0X','TJ8T','TJAT','TJBB','TJIT','TJJK','TJJZ','TJKJ','TJKK','TJM2','TJPD','TJPG','TJTI','TK30','TK43','TK5T','TKDN','TKGA','TKGE','TKGK','TKIA','TKIV','TKK0','TKLJ','TKLM','TKMF','TKPD','TKU3','TL8V','TL9L','TLA3','TLJF','TLN7','TLO3','TLPD','TLR8','TLTK','TLTY','TLU4','TLW7','TLWD','TM4J','TM7U','TMCH','TMCS','TMHR','TMHY','TMIW','TMIZ','TMPO','TMPQ','TMSV','TMTB','TMTF','TMYK','TN28','TN4S','TNAF','TNAL','TNBA','TNEP','TNGU','TNIE','TNJP','TNLV','TNM3','TNPW','TNSQ','TNUA','TNVI','TOCH','TONU','TOPG','TOWH','TP4O','TP4T','TP6O','TPAK','TPAW','TPDA','TPDM','TPDP','TPIC','TPID','TPIJ','TPIW','TPME','TPPA','TQ13','TQ19','TQ20','TQ39','TQ41','TQ59','TQ5Q','TQ63','TQ64','TQ73','TQ75','TQ84','TQ86','TQ89','TQ95','TQEU','TQFV','TQLA','TQON','TR2E','TR2F','TR3K','TR5Y','TR7G','TRBL','TRCY','TRDQ','TRHD','TRHS','TRIN','TRIZ','TRMP','TRRK','TRSU','TRTG','TRTS','TRWO','TS46','TS4J','TS50','TS7X','TS83','TSAL','TSAP','TSEP','TSHE','TSKF','TSKG','TSOD','TSOT','TSRR','TSSG','TSUK','TSVY','TSW3','TT7A','TTBH','TTBO','TTDB','TTE7','TTGB','TTGH','TTGI','TTJS','TTJU','TTKW','TTM5','TTPP','TTRS','TTRW','TTSJ','TTTI','TTTZ','TU2O','TUAL','TUBR','TUD8','TUER','TUF8','TUGL','TUGM','TUKM','TULI','TULM','TUM7','TUMF','TUNT','TURA','TURD','TURH','TUUZ','TUV3','TUWM','TUXX','TV5I','TV70','TVCM','TVGY','TVNC','TVQE','TVR1','TVRB','TVUZ','TVWB','TW0W','TWHH','TWJF','TWOT','TWP5','TWPT','TWTA','TWUN','TWWD','TWYS','TXNT','TXO8','TXPP','TXR8','TXSR','TY4R','TYAW','TYE7','TYEZ','TYLD','TYLT','TYTR','TYUA','TYUU','TZ1N','TZAP','TZAY','TZDA','TZEM','TZEO','TZMU','TZPG','TZTD','TZVG','TZXR') "

                  const conn = await connection(venvLocal).catch(e => {console.log(e)}) 
                  const results = await vquery(conn, qtoko).catch( e =>{console.log(e)});

                  results.forEach( async (r) => {
                  
                    const c = {port: 3306,host: r.ip1, user: "kasir",password: "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ", database: "pos", multipleStatements: true, dateStrings:true}                
                    const c2 = {port: 3306,host: r.ip1, user: "root",password: "5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4", database: "pos", multipleStatements: true, dateStrings:true}                
                    //const c1 = {port: 3306,host: r.ip1, user: "kasir",password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn", database: "pos", multipleStatements: true, dateStrings:true}                
                    const conn_toko = await connection(c).catch( async (e) => {
                      try {
                        const connx = await connection(c2).catch((e)=>{ return "None"})
                        return connx
                      } catch (error) {
                        return "None";                        
                      }
                    }) 
                    /* const queryTembak = `insert ignore into ptag () values ('','10013116','MILO 3IN1+ACT-E20X35','HSFA01U1','',69900.00000,'2338',5,5,'CTN','10205',64900.00000,'2021-03-31','2021-04-04','8992696410275','1','10013116','',''),
                    ('','10013116','MILO 3IN1+ACT-E20X35','HSFA01U1','',69900.00000,'77444',5,2,'CTN','10205',64900.00000,'2021-03-31','2021-04-04','8992696410275','1','10013116','',''), 
                    ('','20036590','LUWAK WHT ORGL 10X20','HSFC017Z','',13400.00000,'2365',6,3,'CTN','10106',9500.00000,'2021-03-31','2021-04-06','8994171101371','1','20036590','',''), 
                    ('','20036590','LUWAK WHT ORGL 10X20','HSFC017Z','',13400.00000,'77338',2,5,'CTN','10106',9500.00000,'2021-03-31','2021-04-06','8994171101371','1','20036590','',''), 
                    ('','20046341','MILO 3IN1 ACTG-E 800','HSFA01U2','',77500.00000,'2338',5,4,'CTN','10205',69500.00000,'2021-03-31','2021-04-04','8992696427976','1','20046341','',''), 
                    ('','20046341','MILO 3IN1 ACTG-E 800','HSFA01U2','',77500.00000,'77444',5,1,'CTN','10205',69500.00000,'2021-03-31','2021-04-04','8992696427976','1','20046341','',''), 
                    ('','20054716','NIVEA/M R/ON COL/K50','HSFM018A','',19600.00000,'33501',46,12,'CTN','21911',13500.00000,'2021-04-01','2021-04-04','8999777004484','1','20054716','',''), 
                    ('','20062867','CHIL GO SUSU STRW140','HSFB01RR','',5500.00000,'3937',4,11,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080033','1','20062867','',''), 
                    ('','20062868','CHIL GO SUSU COKL140','HSFB01RR','',5500.00000,'3937',4,9,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080026','1','20062868','',''), 
                    ('','20062868','CHIL GO SUSU COKL140','HSFB01RR','',5500.00000,'3942',33,8,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080026','1','20062868','',''), 
                    ('','20062869','CHIL GO SUSU VNL 140','HSFB01RR','',5500.00000,'3937',4,10,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080019','1','20062869','',''), 
                    ('','20062869','CHIL GO SUSU VNL 140','HSFB01RR','',5500.00000,'3942',33,9,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080019','1','20062869','',''), 
                    ('','20068905','FF SKM PUTIH 560G','HSFA01S2','',15900.00000,'2338',7,8,'CTN','10201',13500.00000,'2021-03-31','2021-04-06','8992753004010','1','20068905','',''), 
                    ('','20068905','FF SKM PUTIH 560G','HSFA01S2','',15900.00000,'77216',3,2,'CTN','10201',13500.00000,'2021-03-31','2021-04-06','8992753004010','1','20068905','',''), 
                    ('','20073425','IDM P.PRNG JRK.N 800','PLFO005X','',12500.00000,'2333',10,8,'CTN','22107',9900.00000,'2021-04-01','2021-04-04','8994096219403','1','20073425','',''), 
                    ('','20073425','IDM P.PRNG JRK.N 800','PLFO005X','',12500.00000,'77185',4,1,'CTN','22107',9900.00000,'2021-04-01','2021-04-04','8994096219403','1','20073425','',''), 
                    ('','20086392','SANIA TPNG TRGU 1KG','HSFG00V2','',11100.00000,'47208',1,4,'CTN','10504',10000.00000,'2021-04-01','2021-04-04','8993496109956','1','20086392','',''), 
                    ('','20087474','BENG2 CHOCO DRNK 4S','HSFC018W','',8400.00000,'2365',8,6,'CTN','10104',4900.00000,'2021-04-01','2021-04-04','8996001431047','1','20087474','',''),
                    ('','20087474','BENG2 CHOCO DRNK 4S','HSFC018W','',8400.00000,'77437',4,4,'CTN','10104',4900.00000,'2021-04-01','2021-04-04','8996001431047','1','20087474','',''),
                    ('','20092367','NIVEA MEN INVS FRS50','HSFM018A','',19600.00000,'33501',46,13,'CTN','21911',13500.00000,'2021-04-01','2021-04-04','8999777010881','1','20092367','',''), 
                    ('','20093196','CHIL GO MLN MADU 140','HSFB01RR','',5500.00000,'3937',4,7,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080132','1','20093196','',''), 
                    ('','20099571','CIMORY UHT CHOCO 250','HSFB01RT','',6900.00000,'3942',35,3,'CTN','10401',5900.00000,'2021-04-01','2021-04-15','8993200666133','1','20099571','',''), 
                    ('','20099572','CIMORY UHT STRAW 250','HSFB01RT','',6900.00000,'3942',35,1,'CTN','10401',5900.00000,'2021-04-01','2021-04-15','8993200666218','1','20099572','',''), 
                    ('','20099573','CIMORY UHT BLBRY 250','HSFB01RT','',6900.00000,'3942',35,2,'CTN','10401',5900.00000,'2021-04-01','2021-04-15','8993200666126','1','20099573','',''), 
                    ('','20104636','CIMORY UHT CHOML 250','HSFB01RT','',6900.00000,'3942',35,4,'CTN','10401',5900.00000,'2021-04-01','2021-04-15','8993200666898','1','20104636','',''), 
                    ('','20104637','CIMORY UHT CSHEW 250','HSFB01RT','',6900.00000,'3942',35,5,'CTN','10401',5900.00000,'2021-04-01','2021-04-15','8993200666867','1','20104637','',''), 
                    ('','20112341','CHIL GO ORGNAL 130ML','HSFB01RR','',5500.00000,'3937',4,8,'CTN','10402',4500.00000,'2021-04-01','2021-04-15','8992802080217','1','20112341','','')
                    ` */

                    const queryTembak = "UPDATE promo_matriks set sumber = ''; "
                    if(conn_toko != "None"){
                      
                      const rv = await vquery(conn_toko, queryTembak).catch(e=>{ return "Gagal"})

                      if(rv === "Gagal"){
                        console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Query')
                        return true
                      }else{
                        console.log(r.kdtk +'|'+ r.kdcab +'|Sukses') 
                      } 
                    }else{
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Koneksi') 
                      return true
                    }
                    
                    
                   
                  })
                })
              }catch(err){
                console.log("Error1 : " + err) 
                return true
              }

          })(); 
        await sleep(3600000)            
      }
    } catch (e) {
      console.log("Error2" + e);
      //doitBro()
    } 
}
 
doitBro()
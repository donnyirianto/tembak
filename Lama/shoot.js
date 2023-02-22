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
                  const qtoko = "SELECT * FROM zarvi.ip WHERE kdtk in ('TN7L','T9FA','TWD8','TBKA','THIL','FP2W','TAO5','TTB2','TTGO','TAON','T91E','TF8A','TW9C','TZES','T5RH','T4Q1','TX4X')"

                  const conn = await connection(venvLocal).catch(e => {console.log(e)}) 
                  const results = await vquery(conn, qtoko).catch( e =>{console.log(e)});

                  results.forEach( async (r) => {
                    const c = {port: 3306,host: r.ip1, user: "kasir",password: "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ", database: "pos", multipleStatements: true, dateStrings:true}                
                    const c2 = {port: 3306,host: r.ip1, user: "root",password: "5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4", database: "pos", multipleStatements: true, dateStrings:true}                
                    //const c1 = {port: 3306,host: r.ip1, user: "kasir",password: "iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn", database: "pos", multipleStatements: true, dateStrings:true}                
                    const conn_toko = await connection(c).catch( async (e) => {
                      try {
                        const connx = await connection(c2)
                        return connx
                      } catch (error) {
                        return "None";                        
                      }
                    }) 
                    const queryTembak = `
                    INSERT IGNORE into promo_matriks select * from promo_matriks_reg
                    where date(tanggalakhir) >= curdate() and kodepromo not in
                    (select kodepromo from promo_matriks where date(tanggalakhir) >= curdate());
                    `
                    //const queryTembak = "insert into fee () values ('', '000062', 'BAA', 'I', 10000, 1000000, 'N', 1000.00), ('', '000063', 'BAA', 'I', 10000, 1000000, 'N', 0.00), ('', '000070', 'BAA', 'I', 10000, 1000000, 'N', 1000.00), ('', '000076', 'BAC', 'O', 50000, 100000, 'N', 5000.00), ('', '000076', 'BAC', 'O', 100001, 500000, 'N', 8000.00), ('', '000076', 'BAC', 'O', 500001, 1000000, 'N', 10000.00), ('', '000081', 'BAE', 'O', 50000, 1000000, 'N', 1500.00), ('', '000095', 'BAE', 'O', 50000, 2000000, 'N', 0.00), ('', '012001', 'B12', 'I', 50000, 1000000, 'N', 1500.00), ('', '014500', 'B01', 'I', 50000, 1000000, 'N', 1500.00), ('', '014501', 'B01', 'I', 50000, 1000000, 'N', 1500.00), ('', '014520', 'B01', 'I', 50000, 1000000, 'N', 1500.00), ('', '405651', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '409700', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '409766', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '409790', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '445076', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '461600', 'B02', 'I', 50000, 1000000, 'N', 4000.00), ('', '461699', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '46169933', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '46169960', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '461700', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '46170033', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '467840', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '483700', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '483795', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '48379566', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '483796', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '48379699', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '507985', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '507987', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '507988', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '523940', 'B02', '', 150000, 100000000, 'N', 0.00), ('', '601350', 'B03', 'I', 50000, 1000000, 'N', 1500.00), ('', '601900', 'B01', 'I', 50000, 1000000, 'N', 1500.00), ('', '603200', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '603298', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329803', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329805', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329807', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329808', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329809', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329810', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329820', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329822', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329824', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329825', 'B02', '', 50000, 2000000, 'N', 1500.00), ('', '60329825', 'B02', 'I', 50000, 2000000, 'N', 1500.00), ('', '60329826', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329827', 'B02', 'I', 50000, 2000000, 'N', 1500.00), ('', '60329828', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329831', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329832', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329833', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329834', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329835', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329836', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329837', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329838', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329839', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329840', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329841', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329842', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329845', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329850', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329852', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329853', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329855', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329860', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329862', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329863', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329864', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '60329872', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329874', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329875', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329882', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329884', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329886', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329887', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329889', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329897', 'B02', 'O', 50000, 1000000, 'N', 4000.00), ('', '60329899', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('', '62', 'BAA', 'I', 1, 1000000, 'N', 1000.00), ('', '62', 'BAA', 'O', 1, 1000000, 'N', 5000.00), ('', '7546', 'B12', 'I', 50000, 1000000, 'N', 1500.00), ('', '754680', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('1', '000070', 'BAE', '', 1, 1, 'N', 0.00), ('1', '000076', 'BAC', 'I', 10000, 1000000, 'N', 1500.00), ('1', '000082', 'BAE', 'O', 50000, 2000000, 'N', 0.00), ('1', '000088', 'BAE', '', 1, 1, 'N', 0.00), ('1', '1', 'B01', 'I', 50000, 1000000, 'N', 1500.00), ('1', '60329898', 'B02', 'I', 50000, 1000000, 'N', 1500.00), ('1', '62', 'BAA', 'O', 1, 200000, 'N', 5000.00), ('1', '62', 'BAA', 'O', 200001, 1000000, 'Y', 1.00), ('1', '636351', 'BAA', 'I', 1, 1000000, 'N', 1000.00), ('1', '936088', 'B05', 'I', 50000, 1000000, 'N', 1500.00);"
                    const rv = await vquery(conn_toko, queryTembak).catch(e=>{ })
                    
                    if(rv === "Gagal"){
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal Query')
                      return true
                    }else{
                      console.log(r.kdtk +'|'+ r.kdcab +'|Sukses')
                      
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
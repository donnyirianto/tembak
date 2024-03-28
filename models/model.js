const conn_local = require("../services/db");
const conn_new = require("../services/dbho2");
const conn_50 = require("../services/db50");
const conn_ho = require("../services/dbho");
const conn_any = require("../services/anydb");
const ftp = require("../services/ftp");
var dateFormat = require("dateformat");
var dayjs = require("dayjs");
/* 
--- user kasir new 2023-02 ----
ydUcgx+VcZOXOvtX8CgOQerivop3oMXGk=WosaavE+Cm
dan 
5wRVkMKPJ8LufhKX2W+eJ3hi++btMn7Sc=XZT/xPyvPB
---- user kasir 2022 ----
mJDC2ASrWJqKKlDFoh1WPiZWgy6oBwAKU=ljvYW1kTDi
--------------------------------
kasir Lama
cL/EohOGyT3uPR/HmG9zSpHt6/V8zPQKs=VunZtrQfh1
kasir baru 2
D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ
kasir lama 
iUL+J2zDwNbP1FEWjqpa4jZhPPB4yyDYE=MORFTmyGZn
root1 
5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4
root2
N8rM5RmJYbKGbEFWuvuSb6bauDFB3BPTc=zOMd2onoNJ
 'TLLL','TXTR','TDR3','TVUD'
*/
const getListIp = async () => {
  try {
    const rows = await conn_ho.query(`
        select kdcab,toko as kdtk,ip_induk as ip1 from m_toko_ip
        where kdcab in(select kdcab from m_server_iris where jenis='iris' and reg='reg4')
        AND left(toko,1) not in('B','G','D')
        and toko in('FIQH','TFPV','TJ3S','TAPN','T4I6','TY3R','TTLM','TIIQ','T6Y5','F14C','TOMA','F3BB','T6NL','TRLG','TCOD','TE7Z','FSNV','TRSA','TXMZ','T9FA','FAKY','FN78','FAGN','TYQH','T0L1','TYOP','F5ME','TLYU','THFU','TFDD','X001','TFV7','TR7B','TTEW','FR8C','TAEE','TYMM','FHMU','T6CJ','TFTA','TWZ1','TC','TMGD','TFYC','TV3I','FD5R','TDHQ','TQ33','P002','TEN1','F7KV','T0N9','F2HH','TAIR','TUNV','TOBI','TBKA','TQH5','TT66','FLEE','TV6S','T1MN','FAZ3','TLFA','FOAT','F2PW','TMMM','THPM','T6JD','FKMI','TNAT','TK8U','TNJP','TOVM','TAAB','T0TO','TDHB','TFMR','TUSZ','T2N2','T0IO','TS1O','TBYV','TEK2','T7BO','TKUX','T7PV','T7J4','TWD1','TAIC','T90V','TAGZ','TVNZ','T82P','F89S','TRIW','FAHP','FPUG','TUTT','FKJS','TFI6','T588','TUUN','T7TW','TFW5','FQ79','TGHD','TSS3','TH5A','TFYM','TVD5','TEAR','TBNE','TNY2','TLOB','TXJ2','T5K9','TLBT','T7Z0','TTQX','T77H','T0LS','TXYX','T19T','TSE1','TCGF','TPV6','T4X1','TG1Q','TMDU','TTZE','TEYX','TWUL','FINN','T7AL','TY4B','T20A','TCME','TNJY','TG90','TVWB','F462','TTVC','TSRY','T2RE','T4R8','TN4Z','TUPH','TT9M','THD4','TSFD','FQUU','F79G','TG6P','T5V3','F4PV','FHAT','FURN','P004','P003','TI1O','FHTH','TYJO','TCK0','TBTI','TFFX','TEPK','FGIR','TY95','TRE8','TTB2','FAEG','TEG5','TACI','TWSG','TGIG','TM8G','TMSL','TIOO','TKPW','FISD','FE96','THM9','TOKI','TUXD','TUUX','TZNV','TY2F','TSRR','TB1C','TOHC','THHQ','TFBI','TKOC','TKSM','T5SO','T0QX','TPF0','TSES','TOBJ','TUMA','TBEK','THMS','TOER','T84M','FW49','F65R','TWGJ','T3B3','TFRQ','TM8S','FX02','FT1V','FJ3O','TIY2','TYGL','TKKX','TIG4','TK5E','TUER','TKZN','F74A','T0O8','FGKR','TR3C','TTLI','TJTQ','TGRU','TS4J','TETO','TB4E','T1LW','TNPW','TEFS','TGSM','FTF7','TDKP','TX2I','TWDF','FYIL','T7X0','FQ35','TDT5','TQCV','F1DJ','FX0U','FD57','FY07','TEHJ','TSPU','TJTI','TRUE','FNFM','FR9Q','T3WC','T6ZY','TC1W','TCWH','TZZZ','T56C','T1MV','TA9I','TOX8','TUIG','FRRT','TDTK','TKEU','TWUV','T9UL','TBD2','TLHR','TKLS','TCZ0','F2GB','TXY9','TNBZ','TA4J','TTMB','TA6T','TKGK','T5FB','TGNP','TACK','TLOZ','TM98','FDON','TUXX','TIKG','FQUA','TCUW','T5NG','FJMM','TQIY','TITW','TA8H','TNIE','TUPG','TJJQ','TAH6','T5X9','TNLJ','TDMQ','TAGL','TQMA','T8DP','FOU0','FTRP','TCVI','TWCR','THTZ','FMBY','TIHR','FDQE','T4OC','THYV','TZUL','FTTV','T0FU','T1NL','TPNU','FHUN','TMJT','F887','TICK','TT3Q','TI47','TS6A','TAM0','T86C','TTOF','FS25','TE3Y','T5H9','TD8L','TBZK','TUAU','TZPG','TTMZ','TNRO','TDKV','T0ZI','F9GO','FCCF','T0UY','T1FF','TSF8','TALU','T3AO','TA2V','TYVW','TWOT','T3DV','TDPC','TBEL','TAED','T0VV','F56L','TCTK','T92S','TT5E','TA7U','TERM','T26R','TRDA','TR2F','TKWM','TA6A','TDDY','TXEZ','TLID','FRRA','TUZ0','TBDA','FROK','FP01','TUIB','TD6W','TDSU','FCZ5','TDNO','FGPX','FXXM','TUSV','TO3E','TV5I','TUN4','TECP','T7PS','TTHO','T4S4','T5HA','TA8A','T1UZ','TH8T','TKFX','F958','T9Y8','TAGU','TXFB','TZLC','TPID','T0KH','TW0Z','THBX','TUY2','T33F','TGPX','TQOM','TGOC','TF9V','TQ95','THCM','TUGE','TXO9','TCPO','T0TD','FSPY','TMED','T73C','TXO8','TGTO','T6P4','TLBD','TWZW','TX7V','TWOD','T9HK','TKH1','FIJH','T00T','T623','TJXY','TFMN','FBPP','TKK4','TIYQ','TMVB','TRL4','F618','TBEX','T1DY','T1AI','T9PB','T33P','TSOD','T5B5','FFOA','TD99','TDFI','FYOZ','TGET','TLFV','TED2','T69T','TFUA','TZOG','FHBD','TLZV','TGE1','TNLV','TWYS','TM1J','TEGT','FPDL','TOMB','TENI','TZM5','T15A','F8UK','TBT1','THJP','TSEV','TITK','TFOJ','TAGC','FTOH','TQ31','T9HU','TADI','T2DS','FN8D','T4N7','T1NN','THH2','TINR','TD3R','F447','TI02','TQSX','TEUM','TJE6','FKBZ','TCAZ','FLCE','TMOU','TRRE','TDOG','TYQ8','T9G9','TIIU','T1PA','FR43','TXSR','TWGP','TKL0','FD9Y','TC9R','TSN7','T4HF','TQ42','TTSD','T63X','T4LR','TMTT','FRYQ','T9A5','TUEK','F3EW','TF83','THAD','TU3J','TLJF','T97Q','FOFL','TIQI','TNNM','T14A','TODA','TLJZ','T7AH','TQLM','TLP9','TSWZ','TSSQ','TWOL','FR37','TROG','TQUE','FZFE','TDLW','F82U','FQ27','T5LP','TSKG','FGUD','F1HT','FZP8','TCFF','TVYL','TR1R','T7XT','T2M6','TCL5','TZDA','FMYY','TS7Y','T7TQ','TIOK','FNTX','T4XL','TI0I','TR2D','TQ4E','TQRS','TUUQ','TQ5Q','FFEN','TCAL','T6EM','T2AW','T3L8','TQ59','T4KH','TQ40','T7I6','TGQ0','TAL5','FV3G','TBY0','T96Q','FRNN','TUSA','TNJF','FSSB','TTZZ','TQ13','TDME','TQES','TLBL','TKNL','TREO','FWUD','TMQH','TZKG','TM7T','TNUA','T7MH','TATE','TXSJ','FVLB','TQ63','TSIV','TNLR','FAAD','TIXI','TAFO','TICG','T32H','TQ94','TF96','TDL4','TGT0','F7W1','TNQ1','TGYW','FUKP','TEPW','TI26','TQE0','TCZM','THF3','TUNA','TU6Y','T24V','FHLF','TE0H','TED7','F75P','FLRP','TZ8C','TLK4','T92V','THKI','T08R','TOKA','TX2V','TNJB','FJX6','TTK0','TZKZ','FF3N','TELS','FD50','TQ88','TADD','THDD','TP1U','TKVL','TX0W','TIRA','TLEY','FEPF','TUPB','FEEI','T2QE','TFZB','TH7A','TGN8','TJRV','FRAM','TXXC','TKYJ','TOTW','TRW1','TA81','F44K','TL3T','TZKQ','TGBB','TYAC','TGLE','TFUF','T1C1','TVKV','TKF2','T144','TSPY','TMMX','FFDA','TASM','TGQD','TIT8','FZDZ','T1HJ','F2XX','TKON','TN32','T2DA','FHLZ','T3J5','TXR8','F20R','T3X1','TYLT','TLRU','FM10','TAKT','T0KI','T3EE','TR2C','T99R','T9SY','TB4Q','TX4Q','TZUY','TV7A','FV8R','TAY4','TMHY','T8W7','TTH2','FVZ6','TGKO','TOM7','FWS7','TWTA','TVNG','FFOT','TANI','TMUN','TS7X','TD45','TNBA','TVNY','T76V','TAXO','T61C','TM2C','FORY','FC5Z','TES2','TS45','T3BG','FK83','T7AE','TRDQ','TLQI','TZIM','T01T','T1CS','TL9C','FSFL','TXJJ','FKLI','TF64','FS10','THCN','TJG3','TMKT','T0DD','T4WQ','T6DH','T0CY','T0BK','TUYX','FLCK','TQ76','TQAG','TDWD','TNAL','T03T','T8FH','T6M1','TWFP','T8DO','TURH','TPHE','FMZ0','FG0I','TH6G','FZJ7','TH7H','T1UL','F20E','T4HH','T0BI','T40V','TMVL','F2AA','TLUR','TKM3','TQ89','TBBZ','TRJG','FLPH','TDTQ','TRQN','FAOH','FT62','TURL','TF43','TMUF','TA52','TSEP','T0BG','F0PT','TVAR','T96E','TI9R','FYCA','TYLL','TQ28','T4N1','TDTL','TW4I','T3QQ','TYP1','TIJV','TRQQ','THAE','TTHK','TC4B','TTN4','THZL','THOP','FWNQ','TRMT','TGPK','T8Q1','TWIZ','T2JJ','TWHL','F2G2','T5NI','TI7Y','TF23','FACT','TEPC','TLZR','TYNU','TQ22','FR36','TIZP','T6PS','FSZC','FGRN','TWJF','T67C','FMH6','TMCS','T45W','T7D5','T4LI','F7G4','TH8G','T67Q','TLWD','TGHI','T8JB','TUDU','TCOA','FFGN','TJY0','THU0','TEAH','TBZZ','FX2V','TMCR','F69C','F6XK','F5BA','T40R','TFMW','TAF6','T7G3','FGIC','FT5L','TVVM','TRRW','T3QK','TFRU','TDRL','TP2H','TM7U','THNO','T1GH','TVHS','FGGB','TQ84','TYWZ','TZ7P','THK1','TKVY','TOPL','TOOI','FHIZ','FCRP','F4UG','T1MW','FXJJ','T9HS','F2MD')
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const getToko = async () => {
  try {
    const rows = await conn_ho.query(`
        select kdcab,toko from m_toko_aktif 
        where tanggal =curdate()
        and 
        kdcab in (select kdcab from m_server_iris where jenis='iris' and reg='reg4')
        group by kdcab, toko
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const getTokoStruk = async (toko) => {
  try {
    const filter = toko.length > 0 ? `and concat(toko,tanggal) not in(${toko})` : "";
    const rows = await conn_ho.query(`
    select kdcab,toko,tanggal from summary_varian_2024 
    where tanggal between '2024-03-01' and '2024-03-07'
    AND statusListener is null
    ${filter}
    ;
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const InsertDataStrukOl = async (query) => {
  try {
    const rows = await conn_ho.query(query);
    console.log(rows);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const insertHasilFT = async (data) => {
  try {
    let u = data.map((r) => {
      return `('${r.kdcab}','${r.toko}','${r.prdcd}','${r.ft_ho}')`;
    });

    const rows = await conn_local.query(`insert ignore into 
        acuan_ft(kdcab,kdtk,prdcd,ft_toko)
        values ${u.join(",")}
        `);

    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpRetur = async () => {
  try {
    const rows = await conn_ho.query(`
        select a.toko,b.ip_induk as ip1,a.rtype,a.docno,a.prdcd,a.tanggal 
        from hapusnrb a
        left join m_toko_ip b on a.toko = b.toko
        where ket is null or ket !='Y'
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};
const UpdateRetur = async (r) => {
  try {
    await conn_ho.query(`
        update hapusnrb 
        set ket = 'Y'
        where 
        toko ='${r.toko}'
        and docno='${r.docno}'
        and tanggal='${r.tanggal}'
        and prdcd='${r.prdcd}'
        and rtype='${r.rtype}'
    `);

    return "Sukses";
  } catch (e) {
    return "Error";
  }
};
const getListIpSpdmast = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //and kdcab in('G004','G030','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','G236','G237')

    const [rows] = await conn_ho.query(`
        select kodegudang as kdcab, kodetoko as toko from posrealtime_base.toko_extended
        WHERE LEFT (kodetoko,1) NOT IN('D','G','W','B','R')
        and kodegudang in('G236','G237')  
        AND kodetoko ='TDHB'
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpHispb = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'

    const [rows] = await conn_ho.query(`
        select a.toko as kdtk, a.ip_induk as ip1,b.plu
        from m_toko_ip a 
        right join his_pb b on a.toko = b.kdtk
        where ket is null or ket ='' or ket != 'sukses'
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpk = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'

    const [rows] = await conn_ho.query(`
        select TOKO as kdtk, nama, kdcab, ip_induk as ip1, ip_anak1 as ip2,IP_STB ,b.docno
        from m_toko_ip a 
        right join ceknp b on a.toko = b.kdtk
        where b.kdtk in('T5W9','TYBS','T8TH','TYHG','T3ZC','TV0Y','TLLK','T1UW','TY67','T0QX','TFNU','TFFX','TI9U','T2B2','TWGJ','TVRB','TA0D','T8QA','TCEZ','TSOZ','TMSL','T7SR','THRW','TPV6','T4R8','TYVY','T433','T7I4','TUD7','TFWN','TUE5','T9RH','TK4E','TAO4','TO5D','T3YV','TGSO','T7RU','TTAT','T8SD','TYKP','TY95','THFA','TMET','TSE1','TUSJ','TVWB','TFBI','T2GY','TCDK','T0YL','TBP5','TIJF','TSW3','TN4R','T4IU','TL5R','TDNW','TXOD','TFW5','TRE8','TNBZ','T4N9','T7X0','T6FQ','TH5X','TUR6','TS8D','TOHC','T2KM','TQCV','TSFR','TUP3','T5EY','TSFD','TBYV','TWZA','T9MW','TZRX','TJ6H','TDT5','T5HD','TT6R','TW18','TNIL','TPOM','TDW4','TVD5','TUTV','TTHN','TIGC','TSVY','TRL6','TM06','T3B7','TEPT','TFGI','TQ7P','T77S','TK5T','T7BT','T0NA','TEZ6','F911','TGPD','TYLR','TQ9U','TMZC','TP6O','TRLG','T11Y','TUMF','TAUJ','T8H4','T2EI','THKW','TG90','FBIB','TDR3','TVR6','TFCI','TKT4','TULL','TFNN','TSC6','TNJZ','TUBX','T8GR','T9CB','TTRP','TN77','T2NP','TRC6','TULI','T8GA','TERI','T4NH','TAUK','TBNE','TDH7','TEVE','TFCD','TM4J','TEAR','T8FN','TMTF','T2BM','TELG','TGSK','TKKK','FMQO','TRGN','TGUK','TUBR','TARJ','TVAL','TEG4','TGBA','TRMS','TJEN','TEUK','TKKG','FDKK','TBBM','TSF2','TOP4','T3N5','T1YO','TSAK','TETE','TPES','T44A','TMU2','TDPI','TUAN','TOTI','TETM','TEAG','FAS4','TCOL','TLLS','TAGZ','TCMB','TERD','TTC4','TGF3','T3WU','TUCL','TOHU','TCSH','TTSI','TERN','TZMY','F4LV','TCCY','TASR','TAKO','TORE','TBIB','TTKW','TJV5','TCLP','T7S2','TRR8','TDSD','TUSE','TGPQ','TTZU','TBSE','T4N8','TJYN','TCGX','TVHA','TS4J','TAX5','THKH','TUPH','TAFD','TEFS','TPZP','TGNU','TDTX','TLES','THCE','TVZG','TFDD','TTER','TXHY','TURA','T3SM','TTAL','TVUZ','THRK','TC2Q','T6IH','TL5X','TU2Y','TRJ0','T4T9','TU7B','TEFY','TU1N','F4PV','TOWL','TDGT','T9GG','T3AN','TEN1','TBO5','THOR','TBKV','T3NH','TFZV','T6NL','FFZV','FRQJ','F8YK','TW3V','F5AX','FLA2','FMTM','FWSW','FYLH','T0DD','T0JW','T0PD','T1AF','T1HJ','T1UV','T2DA','T2JJ','T2QE','T3J5','T3TA','T4EK','T523','T5C9','T5FJ','T6EM','T6OG','T7W5','T92S','T9BN','T9R0','T9RZ','T9SY','TAAZ','TABG','TABL','TADD','TAFG','TAFO','TAGH','TAIQ','TAMN','TAOT','TARK','TATF','TAVX','TBB6','TBCC','TBDA','TBDS','TBER','TBFV','TBGS','TBIO','TBJX','TBJZ','TBKU','TBUR','TBZH','TBZZ','TC4B','TC9Z','TCAV','TCBE','TCER','TCMY','TCNX','TCQN','TCWV','TCYJ','TCZM','TDOG','TDOZ','TDTL','TDUO','TDWE','TECW','TED7','TEJ6','TELW','TEOR','TETZ','TEVW','TEWC','TEWN','TEWV','TEXP','TF3S','TFAK','TFIM','TFOF','TFS5','TFYC','TGPK','THDD','THYX','TIRV','TITW','TJBQ','TJBV','TJER','TJNE','TJPG','TKAL','TKNL','TKWH','TLCR','TMM8','TMOM','TN81','TNAT','TNEP','TNFC','TNJP','TNOP','TNZC','TOEG','TOFJ','TOKA','TOKJ','TOU5','TOVM','TPEC','TPG6','TPIC','TPIW','TPRB','TPRW','TPTW','TQ8F','TQEX','TREB','TRQN','TRZL','TS2W','TSDO','TSI2','TTBA','TTBL','TTRW','TVDZ','TVE5','TVGZ','TVIJ','TWHL','TWJG','TWYO','TXAD','TXBQ','TXJJ','TZDA','TZSP','T1TL','T6DH','TCM9')
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpKdcab = async (kdcab) => {
  try {
    //'T4ZW','T9KC','TBCX' Sorong
    const [rows] = await conn_ho.query(`
        select TOKO as kdtk, nama, kdcab, ip_induk as ip1, ip_anak1 as ip2,IP_STB  from m_toko_ip
        WHERE LEFT (TOKO,1) NOT IN('D','G','W','B','R')
        and ip_induk not like '%192.168%'
        and kdcab in('${kdcab}')
        `);

    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpLocal = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')

    //,'G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177'
    //AND TOKO IN('T4AH','T6HH','TXEL','T80F','T2M2','TUKZ','THK7','TVKI','T4ED','T4BL','TQ16','TWND','T9AH','TH9F','T85B','TF6H','TK81','TMMI','F1CD','TSBJ','TC9L','TVYC','TRTG','T0FK','TICO','TYH4','TJXW','TK80','TD49','TEH7','TMST','TRPZ','T8YR','FEVE','TAUN','TYFR','T9HH','TIID','T7JA','T4A8','THGO','TT1K','TTQ8','TLY3','TQUP','TK5S','FERZ','T8R9','T685','T647','TEZL','TIMX','TMHR','T56Q','TN28','TB34','T55C','TH3A','TN16','T28B','TQEU','TEOT','TCL1','TTGI','TOS4','T4DM','F1LS','TEH1','TVVQ','T82F','TRV7','TS83','TWNP','F2WW','TB04','TF3H','TFAE','TK6P','TLC1','TRWO','TR75','TOKS')
    //and kdcab in('G004','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177')
    //and toko in('TJPG','TPIC','TTRW','TEWV','TAFO','TPIW','FLA2','TBKU','TJBV','TBER','TOFJ','TKAL','TRQN','TJER','TCAV','TATF','FWSW','TED7')
    //and toko in('TGMA','T1PA','TW9X','TQ86','T2QH','TXII','TTLV','T8R9','TAO5','TQ59','T301','TLW7','TAON','T5X9','TA17','T02R','THIL','TK30','T28R','TIMX','TNUA','T7U7','TAL7','TG7Q','T5KL','T84F','TFCL','TIHM','T08R','T1LN','TAH7','TLNI','TY4R','TA30','TF94','TMHR','TP3F','TWTA','TCFR','T7I6','TAL5','TC2L','TIID','T60T','TZPG','TUXX','T0FK','TB0S','TWWD','T09A','T6ZS','T33I','TAK4','TJKK','T3ZG','THNO','TXPP','T3VJ','TQ13','T3BG','TILR','TD49','TA6A','TBLU','TVR1','TDOF','TPMX','TB04','TAFE','TF85','TRRK','TOPG','TGOC','TF6H','TLBW','T6KH','T34R','T5KF','TJCQ','TI02','TZDA','TQHH','TZOG','T33F','THY8','TOC1','TPPH','TQ19','TVHA','TK5S','T3KK','TASM','TPY9','TTBH','TDMQ','TBFF','T28Q','TD99','THH5','T3JM','T620','TEZL','T6BC','TNJP','T28W','T1G7','TART','THH2','TEH7','TLA3','TXSI','TUSZ','TKK0','T63F','TQ73','TTZZ','T39Q','T1XK','TQ22','TEPC','TF8A','TQ30','TCJS','TSF8','TSPT','TF75','T99R','TELW','T0NA','TQ28','T4TG','TQ0B','TA44','TFMU','TULL','TPU3','T4KH','TF66','TCK8','T691','TNHC','TQ8F','TAIB','TR1R','TIDN','T4LR','T5AL','TZKE','TACK','TMUF','TRTS','TOHU','TB02','T407','TC9L','TICK','T647','T8C0','TB4O','TH3A','TT9R','TFDD','TFIK','TITJ','T9KH','T5W9','TYBS','TYVY','T0KH','T2GC','TPIC','TG72','T89J','TELM','TQ67','T6ZQ','T5RH','TY95','TQ63','T95O','TPJ0','TQ08','TZ0Y','TNJF','TK6P','TC8L','T436','TEWL','TIIP','T1MN','T2Z8','TLY3','TK80','TZTI','TQR0','TRIZ','T84K','TAUJ','TLBG','TPRO','TLTY','TEAH','TOKJ','TL9C','TODA','TX4X','TURD','TBUX','TXOD','TG7N','TQ45','T82K','TQ75','TUAV','T9Z3')
    //,
    const [rows] = await conn_local.query(`
        select *  from ip
        WHERE LEFT (kdtk,1) NOT IN('D','G','W','B','R')
        and kdcab in('G025') and kdtk='TIMX'
        `);
    //('FJJI','FQ34','TAKG','FBIB','TMAZ','FERZ','FFG7','FGJJ','TTSN','FUXR','T41R','TASM','TMKT','FEPF','TKVY','TYEO','TC49','TN9Z','TRU7','F6JK','FOOE','TOFJ','FPME','T3QG','TN9M','T0YF')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpIkiosk = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')

    //,'G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177'
    //AND TOKO IN('T4AH','T6HH','TXEL','T80F','T2M2','TUKZ','THK7','TVKI','T4ED','T4BL','TQ16','TWND','T9AH','TH9F','T85B','TF6H','TK81','TMMI','F1CD','TSBJ','TC9L','TVYC','TRTG','T0FK','TICO','TYH4','TJXW','TK80','TD49','TEH7','TMST','TRPZ','T8YR','FEVE','TAUN','TYFR','T9HH','TIID','T7JA','T4A8','THGO','TT1K','TTQ8','TLY3','TQUP','TK5S','FERZ','T8R9','T685','T647','TEZL','TIMX','TMHR','T56Q','TN28','TB34','T55C','TH3A','TN16','T28B','TQEU','TEOT','TCL1','TTGI','TOS4','T4DM','F1LS','TEH1','TVVQ','T82F','TRV7','TS83','TWNP','F2WW','TB04','TF3H','TFAE','TK6P','TLC1','TRWO','TR75','TOKS')
    //and kdcab in('G004','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177')
    //and toko in('TJPG','TPIC','TTRW','TEWV','TAFO','TPIW','FLA2','TBKU','TJBV','TBER','TOFJ','TKAL','TRQN','TJER','TCAV','TATF','FWSW','TED7')
    const [rows] = await conn_ho.query(`
        select TOKO as kdtk, nama, kdcab, ip_ikios as ip1  from m_toko_ip
        WHERE LEFT (TOKO,1) NOT IN('D','G','W','B','R')
        and ip_ikios !=''
        
        `);
    //('FJJI','FQ34','TAKG','FBIB','TMAZ','FERZ','FFG7','FGJJ','TTSN','FUXR','T41R','TASM','TMKT','FEPF','TKVY','TYEO','TC49','TN9Z','TRU7','F6JK','FOOE','TOFJ','FPME','T3QG','TN9M','T0YF')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpIris = async () => {
  try {
    const rows = await conn_ho.query(`
        select * from m_server_iris
        WHERE jenis = 'IRIS'
        and flag != 1
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpBpb = async () => {
  try {
    //    where kdcab in('G097','G174','G030','G177','G158')

    //    where kdtk in('F0XP','FDBP','FERZ','TB05') 'TT43','TD49','TIID'
    const [rows] = await conn_local.query(`
        select
        b.kdcab,a.toko as kdtk,b.nama,a.prdcd,a.docno,a.invno,a.istype,b.ip1,ket,updtime
        from iris.bpb a
        left join zarvi.ip b on a.toko =b.kdtk
        where
        b.ip1 is not null
        and a.ket = 'Sukses' and date(updtime)=curdate();
        `);
    //('FJJI','FQ34','TAKG','FBIB','TMAZ','FERZ','FFG7','FGJJ','TTSN','FUXR','T41R','TASM','TMKT','FEPF','TKVY','TYEO','TC49','TN9Z','TRU7','F6JK','FOOE','TOFJ','FPME','T3QG','TN9M','T0YF')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpBuah = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')

    //where kdtk in('F0XP','FDBP','FERZ','TB05') 'TT43','TD49','TIID'
    const [rows] = await conn_local.query(`
        select
        b.kdcab,a.kdtk,b.nama,a.tidak_hitung_pb,b.ip1
        from iris.temp_tkx a left join zarvi.ip b on a.kdtk =b.kdtk
        where 
        b.ip1 is not null
        and a.kdtk in('TUUX','THFZ','F2K0','T1LU','T08A','FZVS','FELT','THRY','TI7Y','TG6D','TKGE','THOP','TGTB','FZEM','T020','TH5X','THUG','TALB','TW7T','TW9C','TW9X','TWCX','TVOK','TVQE','TVWF','TYLD','TW0Z','TY4B','TYAW','TVZL','TW2W','TVT8','TXIX','THDD','TURA','THHQ','TVQJ','TVWX','TYTR','TVKV','TASR','TJCQ','T0KH','FD21','TDCJ','FEHE','TKK4','TKLN','TT03','TY95','TTBR','FR44','TVQD','TRZL','T8TH','FQWU','FPOO','TLNI','TB6S','TP3Y','F5MB','F73Y','FD56','FGIJ','FGUG','FJMM','FL2Z','FT69','FVLU','FXVO','FYCC','FZ7C','RBSJ','T14A','T5N5','T6ZU','TATO','TAWN','TCBA','TCNC','TCOD','TCT6','TDD7','TDKA','TDTN','TDVB','TDVM','TDY3','TFH5','TG1Q','TGJF','TIDN','TIIQ','TJRY','TJUV','TK9V','TKUD','TM0A','TMMM','TPDS','TQXL','TR7B','TSRB','TSVF','TT9M','TTAT','TTLD','TTRP','TWGJ','TWOL','TWZ1','TWZA','TY3R','TY5X','TYEO','TEPZ')
        `);
    //('FJJI','FQ34','TAKG','FBIB','TMAZ','FERZ','FFG7','FGJJ','TTSN','FUXR','T41R','TASM','TMKT','FEPF','TKVY','TYEO','TC49','TN9Z','TRU7','F6JK','FOOE','TOFJ','FPME','T3QG','TN9M','T0YF')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpPASSTOKO = async () => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const [rows] = await conn_local.query(`
        select b.*,a.ip1,a.kdcab,a.nama  from ip a
        right join tembak_updpasstoko b on a.kdtk =b.kdtk
        where b.ket='BELUM'
        AND b.KDTK in ('F92C','FSEA','TADN','TAQH','TDBF','TDST','TF21','TF72','TJDR','TOP7','TSLM','FA3I','FLUK','FNBF','FOAT','FOGV','FZXK','T677','TBAT','TLMB','TNOL','TYWG','FZU5','TBWM','TCKL','TCQW','TICA','TJJZ','TLTS','TONJ','TTRS','TVWI','FKCW','FKII','T2AA','T656','TA87','TAMQ','TCOH','TLKG','TQND','TWEO','TYAW','F14G','F7J5','FAYA','FBNH','FDKW','FE8P','FF44','FFAY','FHTH','FP00','FPM0','FRNC','FSOD','FZU3','FZU5','T5FP','T78T','TA28','TAHH','TBIA','TBMR','TBWM','TCKL','TCQW','TDTF','TDYI','TEOD','TF85','TFBF','TGWO','THZW','TICA','TIFN','TJJZ','TJSW','TJWA','TKMB','TKZN','TLTS','TMCE','TOFB','TOFL','TOFU','TONJ','TPEV','TPVQ','TQ43','TQQJ','TRIN','TRKU','TRRI','TTRS','TUCX','TVUS','TVWI','F79A','F7J7','F97A','FASH','FAZ1','FDRR','FKCW','FKII','FKOR','FNDI','FPOO','FRUH','FT37','FTP5','T12A','T18A','T1P8','T2AA','T3MT','T61Q','T639','T656','T85J','T8FM','TA06','TA56','TA87','TAK4','TAMQ','TBGE','TCOH','TERQ','TFFF','TGQT','THPN','TIRY','TK9V','TKEG','TLKG','TLXH','TMAU','TMLD','TMPQ','TONY','TP4O','TQND','TRIO','TRT4','TSES','TUTI','TVDP','TWEO','TYAW','TYFT','TZAB')
        `);
    //kdtk not in('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020','TLKS','T60T')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpCatcodSudah = async () => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const [rows] = await conn_ho.query(`
        select kdcab, kdtk,nama, ip1 from node_getdata
        WHERE KET = 'SUKSES' AND KET2 = 'BELUM';
            
        `);
    //kdtk not in('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020','TLKS','T60T')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListlocalSales = async () => {
  try {
    const [rows] = await conn_local.query(`
        select a.*,kdcab, nama, ip1 from acuan_sales  a
        left join IP b on a.kdtk = b.kdtk 
        where kdcab ='G034'
            
        `);
    //'T2M2','T2M2','T4H8','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T6FL','T6FL','T8GB','TADA','TB01','TB01','TB01','TC4N','TC4N','TC4N','TC4N','TCMG','TCMG','TCMG','TCMG','TCNN','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TEH9','TEH9','TEH9','TEH9','THHD','TJAT','TJAT','TJAT','TJAT','TJAT','TJM2','TJM2','TJM2','TJM2','TJPD','TJPD','TKIA','TKIA','TKIA','TKIA','TKIA','TLO3','TN28','TN28','TN28','TN28','TN4S','TN4S','TN4S','TN4S','TRWO','TRWO','TS50','TS50','TS50','TS83','TT1K','TT1K','TT1K','TT1K','TT1K','TT1K','TTDB','TTDB','TTGI','TTGI','TTGI','TWP5','T09Y','TADA','TC4N','TCNN','TF82','TF82','THK7','TIJ8','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TP4T','TQEU','TSKF','TTDB','TTGI','TTGI'
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListlocal = async () => {
  try {
    const [rows] = await conn_local.query(`
        select kdcab, kdtk,nama, ip1 from IP
        WHERE LEFT (KDTK,1) NOT IN('D','G','W','B','R') and kdcab not in('G117')
        and KDTK IN
        ('TGMA','T1PA','TW9X','TQ86','T2QH','TXII','TTLV','T8R9','TAO5','TQ59','T301','TLW7','TAON','T5X9','TA17','T02R','THIL','TK30','T28R','TIMX','TNUA','T7U7','TAL7','TG7Q','T5KL','T84F','TFCL','TIHM','T08R','T1LN','TAH7','TLNI','TY4R','TA30','TF94','TMHR','TP3F','TWTA','TCFR','T7I6','TAL5','TC2L','TIID','T60T','TZPG','TUXX','T0FK','TB0S','TWWD','T09A','T6ZS','T33I','TAK4','TJKK','T3ZG','THNO','TXPP','T3VJ','TQ13','T3BG','TILR','TD49','TA6A','TBLU','TVR1','TDOF','TPMX','TB04','TAFE','TF85','TRRK','TOPG','TGOC','TF6H','TLBW','T6KH','T34R','T5KF','TJCQ','TI02','TZDA','TQHH','TZOG','T33F','THY8','TOC1','TPPH','TQ19','TVHA','TK5S','T3KK','TASM','TPY9','TTBH','TDMQ','TBFF','T28Q','TD99','THH5','T3JM','T620','TEZL','T6BC','TNJP','T28W','T1G7','TART','THH2','TEH7','TLA3','TXSI','TUSZ','TKK0','T63F','TQ73','TTZZ','T39Q','T1XK','TQ22','TEPC','TF8A','TQ30','TCJS','TSF8','TSPT','TF75','T99R','TELW','T0NA','TQ28','T4TG','TQ0B','TA44','TFMU','TULL','TPU3','T4KH','TF66','TCK8','T691','TNHC','TQ8F','TAIB','TR1R','TIDN','T4LR','T5AL','TZKE','TACK','TMUF','TRTS','TOHU','TB02','T407','TC9L','TICK','T647','T8C0','TB4O','TH3A','TT9R','TFDD','TFIK','TITJ','T9KH','T5W9','TYBS','TYVY','T0KH','T2GC','TPIC','TG72','T89J','TELM','TQ67','T6ZQ','T5RH','TY95','TQ63','T95O','TPJ0','TQ08','TZ0Y','TNJF','TK6P','TC8L','T436','TEWL','TIIP','T1MN','T2Z8','TLY3','TK80','TZTI','TQR0','TRIZ','T84K','TAUJ','TLBG','TPRO','TLTY','TEAH','TOKJ','TL9C','TODA','TX4X','TURD','TBUX','TXOD','TG7N','TQ45','T82K','TQ75','TUAV','T9Z3')
        group by KDTK
        `);
    //'T2M2','T2M2','T4H8','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T5F2','T6FL','T6FL','T8GB','TADA','TB01','TB01','TB01','TC4N','TC4N','TC4N','TC4N','TCMG','TCMG','TCMG','TCMG','TCNN','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TCVW','TEH9','TEH9','TEH9','TEH9','THHD','TJAT','TJAT','TJAT','TJAT','TJAT','TJM2','TJM2','TJM2','TJM2','TJPD','TJPD','TKIA','TKIA','TKIA','TKIA','TKIA','TLO3','TN28','TN28','TN28','TN28','TN4S','TN4S','TN4S','TN4S','TRWO','TRWO','TS50','TS50','TS50','TS83','TT1K','TT1K','TT1K','TT1K','TT1K','TT1K','TTDB','TTDB','TTGI','TTGI','TTGI','TWP5','T09Y','TADA','TC4N','TCNN','TF82','TF82','THK7','TIJ8','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TMIW','TP4T','TQEU','TSKF','TTDB','TTGI','TTGI'
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpTembakHarga = async () => {
  try {
    //where kdtk in('TAB9','TK9V','FAZ4','FPFB','TA56','FT37','TIIQ','TEEB','TJXW','TVXL','TTU9','FOOF','TDV6','TK81','T16P','T0SP','T5Y7','FSML','TYZI','FNPK','FD57','F50A','TQPI','TMMM','TTHK','TCOD','FAAA','FEDA','T28R','FLBN','FAAP','TCBA','TTKR','TRIM','TUGL','T02T','T0L1','TIDN','FFEN','TKAF','TDVB','T5X9','FAWE','TYEO','TV52','TG4C','TQ9U','TSP7','TU2Y','TBQ6','TLT1','TULI','TRKM','T4NH','TUUX','TM06','TCT6','TSWO','TATO','T1V3','TAWG','TDTN','T27Q','RBSJ','TCO9','FH9R','TWEZ','FMQJ','TWDR','TDS0','TK0W','FLD3','TVGF','FML8','F83F','TY5X','FQ80','TKAL','TFYC','TYVY','TMGD','TGZ3','TAPL','TQZ8','TRLI','TCDS','TQXD','TDTS','TBTT','TS4Q','TX9S','TSKZ','F6NZ','T61C','TIOK','TX4Q','FMH7','TWZ1','TEWL','FP2W','FJ41','TMED','FSHZ','T8UG','TFV7','TR7B','TRR1','THF5')
    const [rows] = await conn_ho.query(`
        select a.TOKO as kdtk, a.nama, a.kdcab,b.plu, ip_induk as ip1, ip_anak1 as ip2,IP_STB  from m_toko_ip a
        right join tembak b on a.toko = b.kdtk
        WHERE 
        LEFT (a.TOKO,1) NOT IN('D','G','W','B','R')
        and a.ip_induk not like '%192.168%'
        and a.ip_induk is not null
        and (b.ket != 'Sukses' or b.ket is null);
           `);
    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIplombok = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select b.kdcab,b.nama,b.kdtk,b.ip1,a.docno from pkmlombok2 a
        left join ip b on a.kdtk = b.kdtk;
        ;

        `);
    /* tanggal = curdate() 
                and jam_eksekusi='13:00' 
                and */
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpPbTernate = async (kdcab) => {
  try {
    "T0Y1",
      "T454",
      "T4OG",
      "T5SO",
      "T5YG",
      "T8NI",
      "TABE",
      "TB1C",
      "TE6N",
      "TEG5",
      "TFSE",
      "TGOS",
      "TGPF",
      "TGSG",
      "THLQ",
      "THZP",
      "TI32",
      "TKOC",
      "TKYK",
      "TL7Q",
      "TLHT",
      "TMOR",
      "TN4Z",
      "TOBJ",
      "TODK",
      "TOZW",
      "TQBY",
      "TRCZ",
      "TSXL",
      "TT1F",
      "TUAZ",
      "TWDF",
      "TWSG",
      "TXQ9",
      "TYQH";
    const [rows] = await conn_local.query(`
            SELECT * FROM ip where kdtk 
            in('TGPF','THZP')
            
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpMultidc2 = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select ZONA, PICK, RIT, DAERAH, GROUPI, FLAG, ADDTIME, b.nama ,b.kdcab, b.kdtk, b.ip1 
        from toko_multidc a 
        left join ip b on a.kdtk = b.kdtk
        where flag='N'
        ;

        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpMultidc = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select ZONA, PICK, RIT, DAERAH, GROUPI, FLAG, ADDTIME, b.nama ,b.kdcab, b.kdtk, b.ip1 
        from toko_multidc a 
        left join ip b on a.kdtk = b.kdtk
        where FLAG='N'
        ;

        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const updateFlag = async (kdtk) => {
  try {
    const queryx = `UPDATE tembak_updpasstoko SET ket='SUKSES', updated_at= now() where kdtk ='${kdtk}';`;
    await conn_local.query(queryx);

    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};
const updateFlag2 = async (kdtk) => {
  try {
    const queryx = `UPDATE node_getdata SET ket='BELUM', updated_at= now() where kdtk ='${kdtk}';`;
    await conn_ho.query(queryx);

    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};

const updateFlagx = async (kdtk, plu) => {
  try {
    const queryx = `UPDATE tembak SET ket='Sukses' where kdtk ='${kdtk}' and plu='${plu}';`;
    await conn_ho.query(queryx);

    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};

const updateFlag3 = async (kdtk) => {
  try {
    const queryx = `UPDATE iris.bpb SET ket='GAGAL', updtime= now() where toko ='${kdtk}';`;
    await conn_local.query(queryx);

    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};

const updateFlag4 = async (kdtk) => {
  try {
    const queryx = `UPDATE iris.bpb SET ket='Sukses', updtime= now() where toko ='${kdtk}';`;
    await conn_local.query(queryx);

    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};

const updateFlagIdm = async (kdtk, ket) => {
  try {
    const queryx = `UPDATE idmadvance SET keterangan='${ket}', updtime= now() where kdtk ='${kdtk}' `;
    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Update";
  } catch (e) {
    console.log(e);
    return "Error Update";
  }
};

const getListIpRrak = async (kdcab) => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    const [rows] = await conn_ho.query(`
            SELECT * FROM m_toko_ip 
            WHERE kdcab in (${kdcab})
            AND toko IN(SELECT KDTK FROM getrrak WHERE KDCAB IN(${kdcab}) and rrak_rrak_09 =0 )
            and left(TOKO,1) not in('D','B')
            and nama not like 'event%'
            and nama not like 'i-mobil%'
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpInitial = async (kdcab) => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    const rows = await conn_ho.query(`
            SELECT * FROM m_toko_ip 
            WHERE kdcab in (${kdcab})
            AND toko NOT IN(SELECT KDTK FROM INITIAL WHERE tanggal=curdate() and KDCAB IN(${kdcab}) )
            and left(TOKO,1) not in('D','B')
            and nama not like 'event%'
            and nama not like 'i-mobil%'
            and nama not like '%pancingan%'
        `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIpPromo = async (kdcab) => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    const [rows] = await conn_local.query(`
        SELECT * FROM ip 
        WHERE kdcab in (${kdcab})
        AND KDTK NOT IN(SELECT KDTK FROM m_promo)
                  
        `);
    //AND KDTK NOT IN(SELECT KDTK FROM m_promo WHERE kdcab IN(${kdcab}) )
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpBap = async (kdcab) => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    const [rows] = await conn_local.query(`
            SELECT a.*,b.ip1 FROM bap2 a
            left join ip b on a.kdtk = b.kdtk    
                  
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpAdj = async () => {
  try {
    const [rows] = await conn_local.query(`
        select b.kdcab,a.kdtk,b.nama,a.query, a.prdcd,b.ip1 
        from m_adj a left join ip b on a.kdtk  = b.kdtk
        where status_action ='N' order by a.kdtk;
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpCeknp = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    //npb_d is null or npb_d ='null';
    const [rows] = await conn_local.query(`
        select a.kdcab,a.kdtk,left(namafile,21) as namafile_pilih,a.namafile , b.ip1 from ceknp a left join ip b on a.kdtk  = b.kdtk
        where npb_d is null or npb_d ='null' or no_bpb is null or no_bpb ='null'
        
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListIpCeknp2 = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const rows = await conn_ho.query(`
        select a.kdcab,a.kdtk,left(namafile,19) as namafile_pilih,a.namafile,docno,
        b.ip_induk
        from ceknp2 a 
        left join m_toko_ip b on a.kdtk  = b.toko
        where no_bpb is null or no_bpb ='null';
        `);
    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIpWaktu = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select a.kdcab,a.kdtk,a.nama,a.ip1 
        from ip a 
        left join (select * from waktu where tanggal=curdate()) b on a.kdtk  = b.kdtk
        where b.ket is null or b.ket !='sukses'
        ;
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpIns = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select * from ip 
        WHERE KDTK NOT IN(SELECT KDTK FROM INS WHERE PERIODE='2212')
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpKuning = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select * from ip where kdcab in('G030','G174','G177')
        and kdtk in ('FPME','TBMG','TCOD','TDKP','THTK','TIAS','TRFI','TWRR')
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpOrange = async () => {
  try {
    //where kdcab in('G097','G174','G030','G177','G158')
    const [rows] = await conn_local.query(`
        select * from ip where kdcab in('G158','G149','G097')
        and kdtk in('TDUO','TMM8','TRLG')
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpFt = async () => {
  try {
    const [rows] = await conn_local.query(`
            select * from zarvi.tembak_ft a 
            left join zarvi.ip b on a.kdtk = b.kdtk 
            limit 1
        `);
    return rows;
  } catch (e) {
    return "Error";
  }
};

const ftpdel = async (ip, namafile) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const rows = await ftp.ceckfile(ip, namafile);
    return rows;
  } catch (e) {
    return "Gagal";
  }
};

const ftpcek = async (ip, namafile) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const rows = await ftp.ceckfile(ip, namafile);
    return rows;
  } catch (e) {
    return "Gagal";
  }
};
const getListIpPco = async () => {
  try {
    //and toko in('F38Y','F69C','FAIJ','FGC6','FKHP','FLLB','FMI9','FN8D','FWBG','T11F','T1LU','T23F','T3KH','T3WJ','T56Q','T5CR','T61Q','T7MH','T84F','T9FS','T9HH','TAUJ','TAUN','TBAT','TBJI','TCFR','TDYI','TEKK','TF58','TF62','TF75','TGPX','TGY1','THGO','THH5','TJAG','TKLK','TLES','TN6W','TO08','TOFL','TP4P','TPMX','TQ16','TR7G','TRDE','TREM','TRPH','TT43','TT66','TUHT','TV5G','TVS9','TVZQ','TXIE','TY80','TY95','TYWE','TZMY','TZZW','T0NA','TCV6','TEAL','THHD','TUCX','TYFR','TERI','TART','TDXW','TNJP','T42R','TDME','FNHD','FOSL','TTSD','TQLZ','FGMN','FA5A','TMGG','FSUE','FSUF','TTXS','FD44','TQQQ','TF66','TSEV','T020','TLKS','T60T')
    const [rows] = await conn_ho.query(`
        select kdcab, toko as kdtk,nama, ip_induk as ip1 from m_toko_ip
        WHERE LEFT (TOKO,1) NOT IN('D','G')
        and toko in('T60T','T61Q','TBAT','TBJI','TDYI','TJAG','TKLK','TOFL','TRDE','TUCX','TUHT','FKHP','T56Q','T9HH','TAUN','THHD','TQ16','TT43','TVS9','TYFR','F3W7','FAAD','FIJJ','FJHJ','FTOH','T1X2','TF6V','THT2','TLID','TQCW','FDKK','T2MN','TEFY','TN9Z','TY55','TY80','TNOP','TY95','F69C','FAIJ','FLLB','FN8D','T0TD','T107','T1AI','T7MH','TAIR','TKDN','TREM','TRSC','TS0G','TT66','T1LU','T23F','T84F','T9FS','TCV6','TEAL','TF58','TF75','TP4P','TYWE','FGMN','FNHD','FOSL','TART','TDME','TDXW','TNOP','TQLZ','TTSD','FGC6','FMI9','FWBG','T11F','T3KH','T3WJ','TEKK','TGPX','THH5','TR7G','TRPH','TVZQ','TXIE','TZZW')
        `);
    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIpNonPco = async () => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const rows = await conn_ho.query(`
        select kdcab, toko as kdtk,nama, ip_induk as ip1 from m_toko_ip
        WHERE LEFT (TOKO,1) NOT IN('D','G') 
        and kdcab in ('G004','G030','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','G236','G237')
        and toko in('F79G','F7Q9','FD6X','FIVI','FNBU','FOO7','T9NN','TDD7','TGSC','TIIQ','TKLJ','TTOB','TWEU','TWUN','F3BZ','F404','FQRW','T1LG','T8GB','T8YR','TACS','TADA','TKIO','TRLU','TRSA','TT1K','TVVQ','TRKM','FM0W','FMQO','T4GA','TBSE','TF7K','THO1','TJCG','TPJ6','TPN9','TSP7','TTRP','TUN8','TVQU','TXUN','TXXQ','TYLR','TZLG','FSRY','T50W','TAHI','TR6O','TZ6L','F43H','F1GO','TNOG','F2C0','TTRH','TSWH','FS2O','TCXF','FA9J','TDMX','TGDC','FNB1','TV8U','FYDW','TVX7','T55T','TSOZ','TF7T','TF3F','TQTP','TVEW','TAZ6','F5N6','F7XK','FLZ0','FUXS','FZHN','T3QQ','T9RE','T9W9','TGIF','TH1S','THLF','THPA','TPXQ','TPXS','TX0W','F38Y','F7G4','FC0W','FFSR','FMNQ','T25O','T4BC','T65P','T67H','T6M1','T79N','T9MA','TAPG','TBQK','TF64','TI9R','TJPU','TLSD','TM7U','TMVB','TTN4','TW7U','TYP1','F5LI','F7PV','FANN','T00V','T1CS','TEKA','TP2S','TTZZ','TZWC','FZ7Y','T7PS','TBMS','TCMX','TLPX','TPMN','TR1Z','TS2C','TYJP','F0KM','FBE8','FDLB','FPJ6','FW8I','FY9Y','T2PX','T44R','T6XP','T70M','TD8E','TDKV','TDTZ','THKI','TOMB','TONS','TPWQ','TQMR','TSOP','TXDN','FMTM','T2JJ','T4EK','T9BN','TBDA','TBER','TCBE','THYX','TJBV','TLXY','TOFJ','TSDO','FPME','T6UI','TDSR','TG6P','TGQ8','TJNJ','TLF0','TM4I','TN9M','TQA2','TRRA','TTCP','TYYB','T1TL','T3ES','T4N1','T4WQ','T6DH','TCM9','TR8S','TRAO','TNMS','T7XJ')
        
        `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIpPersiapanClossing = async () => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    //        and kdtk not in
    //(select kdtk from m_persiapan_clossing)
    const [rows] = await conn_local.query(`
            select * from ip where kdtk not in(select kdtk from m_persiapan_clossing)
            
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpRekon = async () => {
  try {
    //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
    const [rows] = await conn_local.query(`
            select * from ip where kdcab in ('G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305')
            and kdtk not in
            (select kdtk from m_rekonsales where wdate=curdate()-1)
            
        `);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpIntransit = async () => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    const [rows] = await conn_local.query(`
        select b.kdtk,b.nama,b.kdcab,b.ip1,a.docnonpb from intransit a left join ip b on a.kdtk=b.kdtk
        `);
    return rows;
  } catch (e) {
    return "Error";
  }
};

const vqueryIkios = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQuery(iptoko, "ikiosk", "indomaret", "ikioskterminal", 3306, param);
    if (rows === "Gagal") {
      return "Gagal";
    } else {
      return rows;
    }
  } catch (e) {
    return "Gagal";
  }
};

const vquerySpdmast = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQueryTembak(
      iptoko,
      "kasir",
      "mJDC2ASrWJqKKlDFoh1WPiZWgy6oBwAKU=ljvYW1kTDi",
      "pos",
      3306,
      param
    );

    if (rows === "Gagal") {
      const rows2 = await conn_any.runQueryTembak(
        iptoko,
        "kasir",
        "cL/EohOGyT3uPR/HmG9zSpHt6/V8zPQKs=VunZtrQfh1",
        "pos",
        3306,
        param
      );
      if (rows2 === "Gagal") {
        return "Gagal";
      } else {
        return rows2;
      }
    } else {
      return rows;
    }
  } catch (e) {
    //console.log(e)
    return "Gagal";
  }
};

const vqueryTembak = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQuery(
      iptoko,
      "root",
      "giTk2Yr0K9VV5nBKzn22JafQt9iUiuQ3A=3soy2lSa1t",
      "pos",
      3306,
      param
    );
    if (rows.status === "NOK") {
      const rows2 = await conn_any.runQuery(
        iptoko,
        "root",
        "v4dg4IDbVLYJnB7zOv3lKg8jw8WPvrwd4=NqpoGGrLCX",
        "pos",
        3306,
        param
      );
      if (rows2.status === "NOK") {
        const rows3 = await conn_any.runQuery(
          iptoko,
          "kasir",
          "xDxXDCtUtIl6DJrwkxoVA0nvNgG5OUWlM=eP2hoyuOre",
          "pos",
          3306,
          param
        );
        if (rows3.status === "NOK") {
          return {
            status: "NOK",
          };
        } else {
          return rows2;
        }
      } else {
        return rows2;
      }
    } else {
      return rows;
    }
  } catch (e) {
    return {
      status: "NOK",
      data: e,
    };
  }
};

const vqueryTembakIris = async (client, kdcab, ip, user, pass, db, param) => {
  try {
    const rows = await conn_any.runQuery(ip, user, pass, db, 3306, param);

    if (rows.status != "OK") throw new Error(rows.data);

    await client.set(`GETDATAIRIS-${kdcab}`, JSON.stringify(rows.data), "EX", 4 * 60 * 60);

    return rows;
  } catch (e) {
    return {
      kdcab: kdcab,
      status: "NOK",
      data: e,
    };
  }
};

const queryIris = async (ip, user, pass, db, param) => {
  try {
    const rows = await conn_any.runQuery(ip, user, pass, db, 3306, param);

    return rows;
  } catch (e) {
    console.log(e);
    return {
      status: "NOK",
      data: e,
    };
  }
};
const QueryCO = async (param) => {
  try {
    const rows = await conn_ho.query(param);

    return rows;
  } catch (e) {
    console.log(e);
    return {
      status: "NOK",
      data: e,
    };
  }
};
const vquerycheckpass = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQuery(
      iptoko,
      "kasir",
      "ydUcgx+VcZOXOvtX8CgOQerivop3oMXGk=WosaavE+Cm",
      "pos",
      3306,
      param
    );
    if (rows === "Gagal") {
      const rows2 = await conn_any.runQuery(
        iptoko,
        "kasir",
        "ydUcgx+VcZOXOvtX8CgOQerivop3oMXGk=WosaavE+Cm",
        "pos",
        3306,
        param
      );
      if (rows2 === "Gagal") {
        const rows3 = await conn_any.runQuery(
          iptoko,
          "kasir",
          "mJDC2ASrWJqKKlDFoh1WPiZWgy6oBwAKU=ljvYW1kTDi",
          "pos",
          3306,
          param
        );
        if (rows3 === "Gagal") {
          return "Gagal Koneksi";
        } else {
          return "User Lama 2";
        }
      } else {
        return "User Lama 1";
      }
    } else {
      return "User Baru";
    }
  } catch (e) {
    return "Gagal";
  }
};

const vquerycheckpass3307 = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQuery(iptoko, "root", "$d3@pr15mata", "", 3307, param);
    if (rows === "Gagal") {
      return "OFF";
    } else {
      return "ON";
    }
  } catch (e) {
    return "Gagal";
  }
};

const vqueryTembakMany = async (iptoko, query1, query2, query3, query4, query5, query6, query7) => {
  try {
    const rows = await conn_any.runQueryTembakMany(
      iptoko,
      "kasir",
      "D5SgTTMDME9E4yLxI4CRw/+suEYGcL0YE=NmOUnkyrZZ",
      "pos",
      3306,
      query1,
      query2,
      query3,
      query4,
      query5,
      query6,
      query7
    );
    if (rows === "Gagal") {
      const rows2 = await conn_any.runQueryTembakMany(
        iptoko,
        "kasir",
        "5CCNQV3rio/dI/iboPPnww9nzUHh8bpac=fU59bpWfE4",
        "pos",
        3306,
        query1,
        query2,
        query3,
        query4,
        query5,
        query6,
        query7
      );
      if (rows2 === "Gagal") {
        return "Gagal";
      } else {
        return rows2;
      }
    } else {
      return rows;
    }
  } catch (e) {
    //console.log(e)
    return "Gagal";
  }
};

const insertData = async (kdcab, kdtk, namatoko, data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    //console.log(data)
    var dd = [];
    for (const i of data) {
      dd.push(`('${kdcab}' ,'${kdtk}', '${namatoko.toString()}', '${i.SHOP}',
              '${dateFormat(i.WDATE, "yyyy-mm-dd")}','${i.TJUALN}',
              '${i.TRETN}','${i.TPPN}','${i.THPP}','${i.TJUAL}','${i.TRET}',
              '${i.JQTY}','${i.DQTY}','${i.BBS_PPN}')`);
    }

    const queryx = `REPLACE INTO m_rekonsales() VALUES ${dd.toString()}`;
    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataPromo = async (kdcab, kdtk, namatoko, data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    //console.log(data)
    var dd = [];
    for (const i of data) {
      dd.push(`('${kdcab}' ,'${kdtk}', '${namatoko.toString()}', '${i.sumber}',
            '${i.itemsyarat_ww}','${i.itemsyaratori_ww}','${i.itemsyarat_wx}','${i.itemsyaratori_wx}',
             '${i.dta}', now())`);
    }

    const queryx = `REPLACE INTO m_promo() VALUES ${dd.toString()}`;
    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataRRAKTrend = async (kdcab, kdtk, namatoko, data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    //console.log(data)
    var dd = [];
    for (const i of data) {
      dd.push(`('${kdcab}' ,'${kdtk}', '${namatoko.toString()}',
            '${i.NoUrut}','${i.ACCOUNT}','${i.SEQ}','${i.JenisBiaya}','${i.Januari}','${i.Februari}','${i.Maret}','${
        i.April
      }','${i.Mei}','${i.Juni}','${i.Juli}','${i.Agustus}','${i.September}','${i.Oktober}','${i.November}','${
        i.Desember
      }')`);
    }

    const queryx = `REPLACE INTO rrak_trend() VALUES ${dd.toString()}`;

    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataRRAKData = async (kdcab, kdtk, namatoko, data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    //console.log(data)
    var dd = [];
    for (const i of data) {
      dd.push(`('${kdcab}','${namatoko.toString()}',
            '${i.WRCID}','${i.WDOTP}','${i.WSQNO}','${i.WRCSQ}','${i.WPSDAP}','${i.WTRDAD}','${i.WDESC}','${
        i.WDRAC
      }','${i.WDRCO}','${i.WCRAC}','${i.WCRCO}','${i.WCUAM}','${i.WRPAM}','${i.WDUDAD}','${i.WRFLG}','${i.KDTK}','${
        i.TGLUPD
      }','${i.JAMUPD}','${i.USRUPD}')`);
    }

    const queryx = `REPLACE INTO rrak_data() VALUES ${dd.toString()}`;

    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataIns = async (data) => {
  try {
    var dd = [];
    for (const i of data) {
      dd.push(
        `('${i.KDCAB}','${i.KDTK}','${i.CLASS_TK}','${i.SUB_CLASS}','${i.SPD}','${i.GROWTH_SPD}','${i.STD}','${i.SPD_RTE_RTD}','${i.SPD_PERISHABLE}','${i.APC}','${i.ISS}','${i.NKLALL}','${i.NKLALL_RP}','${i.NKL_DRY}','${i.NKL_PERISHABLE}','${i.NBR_DRY}','${i.NBR_RTE_RTD}','${i.NBR_PERISHABLE}','${i.GROSS_MARGIN}','${i.SALES_ALL}','${i.SALES_DRY}','${i.SALES_PERISHABLE}','${i.SALES_RTE_RTD}','${i.JML_HARI_BUKA}','${i.STD_RAW}','${i.NBR_RTE_RTD_RAW}','${i.NBR_DRY_RAW}','${i.PERIODE}')`
      );
    }
    const queryx = `INSERT IGNORE INTO ins() VALUES ${dd.toString()}`;
    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataAdj = async (kdtk, prdcd) => {
  try {
    const queryx = `
        update m_adj set
        status_action = 'Y',
        addtime = now()
        where kdtk = '${kdtk}' and prdcd = '${prdcd}';
        `;
    //console.log(queryx)
    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};
const insertDataCeknp = async (namafile, data) => {
  try {
    const queryx = `
        update ceknp set
        npb_d = '${data[0].npb_d}',
        bukti_tgl = '${data[0].bukti_tgl}',
        no_bpb = '${data[0].no_bpb}',
        qty_bpb = '${data[0].qty}',
        gross_bpb = '${data[0].gross}',
        sel_np = '${data[0].sel_np}'
        where kdtk = '${data[0].kdtk}' and namafile ='${namafile}';
        `;
    //console.log(queryx)
    await conn_local.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataCeknp2 = async (r, data) => {
  try {
    const queryx = `
        update ceknp2 set
        npb_d = '${data[0].npb_d}',
        dc_npbtoko = '${data[0].dc_npbtoko}',
        bukti_tgl = '${data[0].bukti_tgl}',
        no_bpb = '${data[0].no_bpb}',
        qty = '${data[0].qty}',
        gross = '${data[0].gross}'
        where namafile ='${r.namafile}';
        `;
    await conn_ho.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    return "Error insert";
  }
};

const insertDataPersiapanClossing = async (kdcab, kdtk, namatoko, data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')
    //console.log(data)
    var dd = [];
    for (const i of data) {
      dd.push(`('${kdcab}' ,'${kdtk}', '${namatoko.toString()}', '${i.const_prd}',
              '${i.begbal}','${i.saldo_akh}','${i.bln_akt}')`);
    }

    const queryx = `REPLACE INTO m_persiapan_clossing() VALUES ${dd.toString()}`;
    await conn_local.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const insertDataInitial = async (data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')

    var dd = [];
    for (const i of data) {
      dd.push(`('${i.kdcab}' ,'${i.kdtk}', '${i.nama_toko}',
              '${i.TANGGAL}','${i.STATION}',
              '${i.SHIFT}','${i.NIK}','${i.KASIR_NAME}','${i.TRN_START}','${i.TOTAL_SHIFT}','${i.STRUK_AWAL}',
              '${i.TOTAL}','SUKSES')`);
    }

    const queryx = `REPLACE INTO initial() VALUES ${dd.toString()}`;
    await conn_ho.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    return "Error insert";
  }
};

const UpdateDataInitial = async (kdcab, kdtk, nama) => {
  try {
    const queryx = `INSERT IGNORE INTO INITIAL SET keterangan='GAGAL', kdcab='${kdcab}',kdtk='${kdtk}',nama='${nama}',tanggal=curdate();`;
    await conn_ho.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    return "Error insert";
  }
};

const insertDataHis = async (kdtk, plu, data) => {
  var dd = [];
  for (const i of data) {
    dd.push(`('${kdtk}', '${i.prdcd}',
              '${i.tanggal}','${i.qty}','${i.stock}','Sukses')`);
  }

  const queryx = `REPLACE INTO his_pb() VALUES ${dd.toString()}`;
  try {
    await conn_ho.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    return "Error insert";
  }
};

const insertDataRrak = async (data) => {
  try {
    //'G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305')

    var dd = [];
    for (const i of data) {
      dd.push(`('${i.kdcab}' ,'${i.kdtk}', '${i.nama_toko}',
              '${i.rrak_mrrak}','${i.rrak_rrak_08}','${i.rrak_rrak_09}','${i.detail_rrak}','${i.valid}')`);
    }
    const queryx = `REPLACE INTO getrrak() VALUES ${dd.toString()}`;
    await conn_ho.query(queryx);

    return "Sukses Insert";
  } catch (e) {
    return "Error insert";
  }
};

const insertprogram = async (r) => {
  try {
    await conn_local.query(`
        insert into m_cek_program(toko,nama,ukuran)
        values ${r};
        `);

    await conn_local.query(`update m_cek_program set ukuran = replace(ukuran,',','')`);
    await conn_local.query(`delete from m_cek_program where ukuran like '.%';`);
    await conn_local.query(`delete from m_cek_program where ukuran like '%.%';`);
    await conn_local.query(`delete from m_cek_program where toko=''`);
    await conn_local.query(`delete from m_cek_program where ukuran='undefined'`);
    await conn_local.query(`delete from m_cek_program where ukuran=''`);
    await conn_local.query(`delete from m_cek_program where ukuran='_AUT'`);
    await conn_local.query(`delete from m_cek_program where left(toko,1) not in('T','F','R')`);
    return "Sukses";
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const insertacuanprogram = async (r) => {
  try {
    await conn_local.query(`
        insert ignore into m_acuan_cek_program(toko,nama,ukuran)
        values ${r};
        `);

    await conn_local.query(`update m_acuan_cek_program set ukuran = replace(ukuran,',','')`);
    await conn_local.query(`delete from m_acuan_cek_program where ukuran like '.%';`);
    await conn_local.query(`delete from m_acuan_cek_program where ukuran like '%.%';`);
    await conn_local.query(`delete from m_acuan_cek_program where toko=''`);
    await conn_local.query(`delete from m_acuan_cek_program where ukuran='undefined'`);
    await conn_local.query(`delete from m_acuan_cek_program where ukuran=''`);
    await conn_local.query(`delete from m_acuan_cek_program where ukuran='_AUT'`);
    await conn_local.query(`delete from m_acuan_cek_program where left(toko,1) not in('T','F','R')`);

    return "Sukses";
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const insertDataWaktu = async (kdcab, kdtk, namatoko, waktu, ket) => {
  try {
    const queryx = `REPLACE INTO waktu set 
        kdcab='${kdcab}', 
        kdtk='${kdtk}',  
        nama='${namatoko}',  
        waktu='${waktu}', ket = '${ket}',
        tanggal = curdate()`;

    await conn_any.runQueryTembak("192.168.131.71", "donny", "n3wbi329m3d", "zarvi", 3306, queryx);

    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};
const getListCekPosrt = async () => {
  try {
    const query = `select *,CURDATE() AS TANGGAL_LOG, HOUR(CURTIME()) AS JAM from log_posrt where status = 'NOK';`;
    const data = await conn_any.runQuery("192.168.131.50", "edp1", "abcd@1234", "management_co", 3306, {
      sql: query,
      rowsAsArray: true,
    });

    await conn_local.queryInsert(
      `INSERT IGNORE INTO log_posrt(TOKO,KDCAB,NAMATABLE,TRXDATE,serverdate,diffminute,STATUS,ADDTIME,TANGGAL,JAM) values ?`,
      data
    );

    const query2 = `select TOKO,CABANG,TIPE,STOCKOLDATE,serverdate,diffminute,STATUS,ADDTIME,CURDATE() AS TANGGAL_LOG, HOUR(CURTIME()) AS JAM from log_posrt_inventory where status = 'NOK';`;
    const data2 = await conn_any.runQuery("192.168.131.50", "edp1", "abcd@1234", "management_co", 3306, {
      sql: query2,
      rowsAsArray: true,
    });
    await conn_local.queryInsert(
      `INSERT IGNORE INTO log_posrt(TOKO,KDCAB,NAMATABLE,TRXDATE,serverdate,diffminute,STATUS,ADDTIME,TANGGAL,JAM) values ?`,
      data2
    );

    return "Sukses";
  } catch (e) {
    console.log(e);
    return "None";
  }
};

const getListCekPosrtToko = async (tanggal, jam) => {
  try {
    const [data] = await conn_local.query(`select * from log_posrt 
        where 
        tanggal ='${tanggal}' and jam = '${jam}'
        and cek is null 
        `);

    return data;
  } catch (e) {
    console.log(e);
    return "None";
  }
};
const UpdateFlagPosrt = async (kdtk, tanggal, jam, ket) => {
  try {
    await conn_local.query(`update log_posrt set cek = '${ket}' 
        where 
        Toko='${kdtk}'
        and tanggal='${tanggal}'
        and jam='${jam}';
        `);

    return "Sukses";
  } catch (e) {
    console.log(e);
    return "None";
  }
};

const getListCekPosrtToko2 = async () => {
  try {
    const data = await conn_ho.query(`select *,
        timestamp(DATE_SUB(tanggal_lunas , INTERVAL 30 MINUTE)) sebelum,
        tanggal_terima as tanggalco
        from cekposrt2
        where 
            (ok is null or ok ='')
            
        `);
    return data;
  } catch (e) {
    return "None";
  }
};

const UpdateFlagPosrt2 = async (kode, ket) => {
  try {
    await conn_ho.query(`update cekposrt2
        set ket = '${ket.replace("/'/g", "")}',
        ok='OK'
        where 
        kodepsan ='${kode}';
        `);

    return "Sukses";
  } catch (e) {
    return "None";
  }
};

const getListCekPosrtToko3 = async () => {
  try {
    const [data] = await conn_ho.query(`
            select TOKO as kdtk, nama, a.kdcab, ip_induk as ip1
            from m_toko_ip a
            WHERE LEFT (TOKO,1) NOT IN('D','G','W','B','R')
            and ip_induk not like '%192.168%'
            and nama not like '%event%'
            and nama not like '%mobile%'
            and a.kdcab in('G004','G030','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','G234','G236','G237')
            and toko not in(select kdtk from cekposrt3 group by kdtk)
        `);

    return data;
  } catch (e) {
    return "None";
  }
};

const UpdateFlagPosrt3 = async (data) => {
  try {
    const dataInsert = data.map((r) => {
      return [r.kdcab, r.toko, r.nama, r.tanggal, r.jam, r.underlying, r.timeout, r.unable, r.ok];
    });
    await conn_ho.queryInsert(`REPLACE INTO cekposrt3 () values ?`, dataInsert);

    return "Sukses";
  } catch (e) {
    return "None";
  }
};

const getListBs = async () => {
  try {
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'
    const rows = await conn_ho.query(`
        select TOKO as kdtk, nama, kdcab, ip_induk as ip1
        from m_toko_ip
        WHERE LEFT (TOKO,1) NOT IN('D','G','W','B','R')
        and ip_induk not like '%192.168%'
        and toko in('TMLB','TLNE','T8KP','TV2H','TV0M','TFYM')
        `);

    return rows;
  } catch (e) {
    return "Error";
  }
};
const getListBsacuan = async () => {
  try {
    const [rows] = await conn_ho.query(`
       select toko,tanggal from bs where tanggal>='2022-11-16' group by toko,tanggal;
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const getListBsExport = async (toko, tanggal) => {
  try {
    const rows = await conn_ho.query(`
       select * from bs where toko='${toko}' and  tanggal='${tanggal}';
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const UpdateFlagBS = async (data) => {
  var dd = [];
  for (const r of data) {
    dd.push(`(
                '${r.KDCAB}',
                '${r.TOKO}',
                '${r.TANGGAL}',
                '${r.RECID}',
                '${r.TIPERAK}',
            '${r.NORAK}',
            '${r.NOSHELF}',
            '${r.KIRIKANAN}',
            '${r.DIV}',
            '${r.PRDCD}',
            '${r.DESC}',
            '${r.SINGKAT}',
            '${r.BARCODE}',
            '${r.BARCODE2}',
            '${r.FRAC}',
            '${r.UNIT}',
            '${r.PTAG}',
            '${r.CAT_COD}',
            '${r.BKP}',
            '${r.SUB_BKP}',
            '${r.CTGR}',
            '${r.KEMASAN}',
            '${r.ACOST}',
            '${r.LCOST}',
            '${r.RCOST}',
            '${r.PRICE}',
            '${r.TTL}',
            '${r.TTL1}',
            '${r.TTL2}',
            '${r.COM}',
            '${r.HPP}',
            '${r.SOID}',
            '${r.EDIT}',
            '${r.SOTYPE}',
            '${r.SOTGL}',
            '${r.SOTIME}',
            '${r.ADJDT}',
            '${r.ADJTIME}',
            '${r.DRAFT}',
            '${r.DCP}',
            '${r.CTK}')`);
  }
  const queryx = `REPLACE INTO bs() VALUES ${dd.toString()}`;
  try {
    await conn_ho.query(queryx);
    return "Sukses Insert";
  } catch (e) {
    console.log(e);
    return "Error insert";
  }
};

const getListHr = async () => {
  try {
    const rows = await conn_ho.query(`
         select a.kdtk, b.nama, b.kdcab,a.tanggal,b.ip_induk as ip1
         from cekharian a
         left join m_toko_ip b on a.kdtk = b.toko
         WHERE 
         b.ip_induk not like '%192.168%'
         and b.ip_induk is not null
         and a.tanggal = '2023-05-21'
         and (a.ket != 'Sukses' or a.ket is null)
         and kdtk in('FQUW','F1NX','THHY','TRJQ','TTUD','TB2U','TPJ6','TT7A','TQOK','TYE7','F36B','FX3S','TKOE','TO5D','FWNQ','T4EV','TIKC','TPB7')
        `);

    return rows;
  } catch (e) {
    return "Error";
  }
};
const updatelistHr = async (kdtk, tanggal, rv) => {
  try {
    const queryx = `UPDATE cekharian SET 
        ket='Sukses',
        start_closing='${rv[0].start_closing}',
        slp='${rv[0].slp}',
        file_hr='${rv[0].file_hr}',
        ftp='${rv[0].ftp}',
        last_pos2='${rv[0].last_pos2.substring(0, 25).replace(/'/g, "")}'
        where kdtk ='${kdtk}' and tanggal='${tanggal}';`;

    await conn_ho.query(queryx);
    return "Sukses Update";
  } catch (e) {
    return "Error Update";
  }
};

const getListPB = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'

    const [rows] = await conn_ho.query(`
       select a.toko as kdtk, a.ip_induk as ip1,b.prdcd
       from m_toko_ip a 
       right join checkpb2 b on a.toko = b.kdtk
       where status is null or status ='' or status != 'sukses' 
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const updatelistPB = async (kdtk, prdcd, keterangan) => {
  try {
    await conn_ho.query(`
        update checkpb2 set status='sukses',
        ket = '${keterangan.replace(/'/g, "")}'
        where kdtk ='${kdtk}' 
        and prdcd = '${prdcd}'
        `);

    return "Sukses";
  } catch (e) {
    return "Error";
  }
};
const getListSales = async () => {
  try {
    const [rows] = await conn_ho.query(`
       select a.kdcab,a.toko as kdtk, a.ip_induk as ip1
       from m_toko_ip a 
       where 
       LEFT (TOKO,1) NOT IN('D','G','W','B','R')
       and kdcab in('G004','G030','G025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','G234','G236','G237')
       and toko not in(select kdtk from check_sales group by kdtk)
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const updatelistSales = async (data) => {
  try {
    let dataInsert = data.map((r) => {
      return `('${r.kdcab}','${r.toko}','${r.nama}','${r.nik}','${r.kasir_name}','${r.tanggal}','${r.tanggal_presensi}','${r.jam_in_presensi}','${r.jam_out_presensi}','${r.jam_start_initial}','${r.jam_end_initial}','${r.jam_sales_pertama}')`;
    });
    await conn_ho.query(`REPLACE INTO check_sales(kdcab,kdtk,nama,nik,kasir_name,tanggal,tanggal_presensi,jam_in_presensi,jam_out_presensi,jam_start_initial,jam_end_initial,jam_sales_pertama)
        values ${dataInsert.join(",")}`);

    return "Sukses";
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpNpa = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'

    const rows = await conn_ho.query(`
        select b.nama_file,left(nama_file,15) as file_acuan,a.toko as kdtk, a.ip_induk as ip_induk,b.*
        from m_toko_ip a 
        right join cek_npp b on a.toko = b.kdtk
        where (ket is null or ket ='' or ket != 'sukses')
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    return "Error";
  }
};

const getListIpNpa2 = async () => {
  try {
    //,'G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224'
    //'g004','g030','g025','G034','G097','G030','G149','G146','G148','G158','G174','G301','G305','G177','G232','G224','g236','g237'

    const rows = await conn_50.query(`
        select a.toko as kdtk, a.ip_induk as ip_induk,b.*
        from m_toko_ip a
        right join cek_tat b on a.toko = b.toko_penerima
        where (cek2 is null or cek2 ='' or cek2 ='|' or length(cek2) < 20)
        `);
    //and toko in('F4PV','T8VP','TBKV','TCOL')
    return rows;
  } catch (e) {
    return "Error";
  }
};

const updateStrukOnline = async (id, amount) => {
  try {
    await conn_ho.query(`
            update m_struk_online set amount = '${amount}' , ket='Sukses' where id='${id}'
        `);

    return "Sukses";
  } catch (e) {
    return e;
  }
};

const getListIpDocnoLompat = async () => {
  try {
    const [data] = await conn_local.query(`
            select a.*,IP_INDUK from docno_lompat a
            left join m_toko_ip b on a.shop =b.toko
            where
            (cektoko is null or cektoko!='OK')
        `);
    return data;
  } catch (error) {
    throw error;
  }
};
const UpdateDocnoLompat = async (r, params) => {
  try {
    await conn_local.query(`
            update docno_lompat 
            set 
            cektoko='OK',
            get_docno = '${params[0].docno}',
            get_isi_struk = '${params[0].isi_struk}',
            get_amount = '${params[0].amount}'
            where shop='${r.shop}'
            and tanggal='${r.tanggal}'
            and shift='${r.shift}'
            and station='${r.station}'
            and docno='${r.docno}' 
        `);
    console.log(`
            update docno_lompat 
            set 
            cektoko='OK',
            get_docno = '${params[0].docno}',
            get_isi_struk = '${params[0].isi_struk}',
            get_amount = '${params[0].amount}'
            where shop='${r.shop}'
            and tanggal='${r.tanggal}'
            and shift='${r.shift}'
            and station='${r.station}'
            and docno='${r.docno}'
            
        `);
    return "Insert Sukses";
  } catch (error) {
    console.log(`
            update docno_lompat 
            set 
            cektoko='OK',
            get_docno = '${params[0].docno}',
            get_isi_struk = '${params[0].isi_struk}',
            get_amount = '${params[0].amount}'
            where shop='${r.shop}'
            and tanggal='${r.tanggal}'
            and shift='${r.shift}'
            and station='${r.station}'
            and docno='${r.docno}'
            
        `);
    return error;
  }
};
const updateCekNPA = async (namafile, r) => {
  try {
    await conn_ho.query(`
            update cek_npp set wtranin = '${r.wtran}' , 
            docno = '${r.bukti_no}' , 
            bukti_tgl = '${r.bukti_tgl}' ,             
            ket='Sukses' where nama_file='${namafile}';
        `);

    return "Sukses";
  } catch (e) {
    return e;
  }
};
const updateCekNPA2 = async (r, rdata) => {
  try {
    await conn_50.query(`
            update cek_tat set cek2 = '${rdata.cektoko}' 
            where 
            toko_penerima='${r.toko_penerima}'
            and prdcd='${r.prdcd}'
            and docno='${r.docno}'
            ;
        `);

    return "Sukses";
  } catch (e) {
    return e;
  }
};

const getServerIris = async () => {
  try {
    const data = await conn_ho.query(`
        select * from m_server_iris where jenis='IRIS' and kdcab !='G177'
            order by kdcab ;
        `);

    return data;
  } catch (e) {
    return e;
  }
};

const updateCekItem = async (r) => {
  try {
    // tgl_08='${r.tgl_08}',
    // tgl_09='${r.tgl_09}',
    // tgl_10='${r.tgl_10}',
    // tgl_11='${r.tgl_11}',
    // tgl_12='${r.tgl_12}',
    // tgl_13='${r.tgl_13}',
    // tgl_14='${r.tgl_14}',
    await conn_ho.query(`
        update cekpr set 
            pbsl = '${r.tgl_12}',
            ket='Y'
        where 
            kdcab='${r.kdcab}' and
            toko='${r.toko}' and
            prdcd='${r.prdcd}'
        `);

    return "Sukses";
  } catch (e) {
    return "Error";
  }
};

const getCekItemToko = async () => {
  try {
    const data = await conn_ho.query(`
        select b.*, a.prdcd,a.kdcab,a.toko from cekpr a 
        left join m_toko_ip b on a.kdcab =b.kdcab and a.toko=b.toko
        where a.ket is null or a.ket !='Y';
        `);

    return data;
  } catch (e) {
    return e;
  }
};

const updateCekItemToko = async (r) => {
  try {
    await conn_ho.query(`
        update cekpr set  
            tgl_12_bck='${r.tgl_12_bck}',
            ket='Y'
        where 
            kdcab='${r.kdcab}' and
            toko='${r.toko}' and
            prdcd='${r.prdcd}'
        `);

    return "Sukses";
  } catch (e) {
    return "Error";
  }
};

const vquery = async (iptoko, param) => {
  try {
    const rows = await conn_any.runQuery(
      iptoko,
      "kasir",
      "xDxXDCtUtIl6DJrwkxoVA0nvNgG5OUWlM=eP2hoyuOre",
      "pos",
      3306,
      param
    );

    if (rows.status === "NOK") {
      const rows2 = await conn_any.runQuery(
        iptoko,
        "kasir",
        "mJDC2ASrWJqKKlDFoh1WPiZWgy6oBwAKU=ljvYW1kTDi",
        "pos",
        3306,
        param
      );
      if (rows2.status === "NOK") {
        const rows3 = await conn_any.runQuery(
          iptoko,
          "kasir",
          "5wRVkMKPJ8LufhKX2W+eJ3hi++btMn7Sc=XZT/xPyvPB",
          "pos",
          3306,
          param
        );

        return rows3;
      } else {
        return rows2;
      }
    } else {
      return rows;
    }
  } catch (e) {
    console.log(e);
    return {
      status: "NOK",
      data: e,
    };
  }
};

const getListRRAK = async () => {
  try {
    //where keterangan in('Sudah Input Belum Validasi','Belum Input RRAK') or keterangan is null
    const data = await conn_new.query(`
        select * from absen_rrak where keterangan not in('Sudah Realisasi Sudah Transfer') or keterangan is null
        order by kdcab,toko
        `);

    return data;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};
const UpdateAbsenRrak = async (r) => {
  try {
    const res = await conn_new.query(`
        update absen_rrak 
        set 
            rec='${r[0].rec}' ,
            qtyrenc ='${r[0].qtyrenc}' ,
            rprenc ='${r[0].rprenc}' ,
            rpreal ='${r[0].rpreal}' ,
            fvalid_true ='${r[0].fvalid_true}' ,
            fvalid_false ='${r[0].fvalid_false}' ,
            ftrf_true ='${r[0].ftrf_true}' ,
            ftrf_false ='${r[0].ftrf_false}' ,
            tglbuat ='${r[0].tglbuat}' ,
            keterangan ='${r[0].keterangan}'
        where 
        kdcab='${r[0].kdcab}' 
        and toko='${r[0].toko}';
        `);

    return "Sukses";
  } catch (e) {
    return "Error";
  }
};

const getListRSB = async () => {
  try {
    //where keterangan in('Sudah Input Belum Validasi','Belum Input RRAK') or keterangan is null
    const [data] = await conn_local.query(`
        select * from rsb where toko in('T1TL','TCM9','T6DH');
        `);

    return data;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const updateFlagRSB = async (toko) => {
  try {
    //where keterangan in('Sudah Input Belum Validasi','Belum Input RRAK') or keterangan is null
    await conn_local.query(`
            UPDATE zarvi.rsb SET ket = 'OK' WHERE toko ='${toko}' limit 1;
        `);

    return "Sukses";
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

module.exports = {
  getListRRAK,
  UpdateAbsenRrak,
  getListRSB,
  updateFlagRSB,
  getListIpDocnoLompat,
  getListSales,
  updatelistSales,
  getServerIris,
  updateCekItem,
  getCekItemToko,
  updateCekItemToko,
  updateFlagx,
  getListPB,
  updatelistPB,
  getListlocal,
  vquery,
  getListIp,
  vqueryTembak,
  getListIpPco,
  getListIpIntransit,
  ftpdel,
  ftpcek,
  vqueryTembakMany,
  getListIpRekon,
  getListIpFt,
  insertData,
  getListIpOrange,
  getListIpKuning,
  getListIpInitial,
  insertDataInitial,
  getListIpBap,
  insertDataPersiapanClossing,
  getListIpPersiapanClossing,
  insertDataIns,
  getListIpIns,
  insertDataRRAKTrend,
  insertDataRRAKData,
  insertDataPromo,
  getListIpPromo,
  getListIpMultidc,
  updateFlag,
  getListIplombok,
  updateFlagIdm,
  getListIpPbTernate,
  vquerycheckpass,
  getListIpNonPco,
  getListIpTembakHarga,
  getListlocalSales,
  getListIpMultidc2,
  getListIpPASSTOKO,
  getListIp,
  updateFlag2,
  updateFlag3,
  getListIpCatcodSudah,
  updateFlag4,
  getListIpBuah,
  getListIpBpb,
  getListIpIris,
  vqueryTembakIris,
  getListIpIkiosk,
  vqueryIkios,
  getListIpLocal,
  vquerycheckpass3307,
  insertprogram,
  insertacuanprogram,
  getListIpCeknp,
  insertDataCeknp,
  getListIpAdj,
  insertDataAdj,
  insertDataWaktu,
  getListIpWaktu,
  getListIpCeknp2,
  insertDataCeknp2,
  getListIpRrak,
  insertDataRrak,
  getListIpKdcab,
  getListIpk,
  getListIpHispb,
  insertDataHis,
  getListCekPosrt,
  getListCekPosrtToko,
  UpdateFlagPosrt,
  getListCekPosrtToko2,
  UpdateFlagPosrt2,
  getListBs,
  UpdateFlagBS,
  getListBsExport,
  getListBsacuan,
  getListHr,
  updatelistHr,
  getListIpSpdmast,
  vquerySpdmast,
  getListCekPosrtToko3,
  UpdateFlagPosrt3,
  updateStrukOnline,
  getListIpNpa,
  updateCekNPA,
  getListIpNpa2,
  updateCekNPA2,
  UpdateDataInitial,
  getListIpRetur,
  UpdateRetur,
  insertHasilFT,
  UpdateDocnoLompat,
  queryIris,
  QueryCO,
  getToko,
  getTokoStruk,
  InsertDataStrukOl,
};

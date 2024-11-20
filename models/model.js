const conn_local = require("../services/db");
const conn_new = require("../services/dbho2");
const conn_50 = require("../services/db50");
const conn_ho = require("../services/dbho");
const conn_any = require("../services/anydb");
const ftp = require("../services/ftp");
var dateFormat = require("dateformat");
var dayjs = require("dayjs");
const Papa = require("papaparse");
const fs = require("fs");

/* 
--- user kasir new 2023-02 ----
ydUcgx+VcZOXOvtX8CgOQerivop3oMXGk=WosaavE+Cm
dan 
5wRVkMKPJ8LufhKX2W+eJ3hi++btMn7Sc=XZT/xPyvPBlet filter = 
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
        and kdcab ='G025'
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};
//kdcab in('G117','G113','G107','G026','G157','G033')
//and kdcab in(select kdcab from m_server_iris where jenis = 'IRIS' and reg = 'reg4')
const getToko = async () => {
  try {
    const rows = await conn_ho.query(`
        select kdcab,toko from m_toko_aktif 
        where tanggal =curdate()
        and kdcab in(select kdcab from m_server_iris where jenis = 'IRIS' and reg = 'reg4')
        and toko not in('T3QQ','TJQT','TCAJ','TKLD','F3QQ','FCC2','T01Y','TKLN','TTVC','FD9Y','TYEU','TLU4','TIUZ','TGBZ','TPYZ','FG68','TUEK','TEJ3','TF3F','TPUP','TMW8','FFVO','FGTE','TXZZ','TI47','FWPA','TS6P','TAPJ','TOOZ','TC1W','T00T','TUV3','TWJF','TWC9','TLBL','F4MY','TSCC','FY1N','T3WJ','TMVN','TR47','TPOU','FQUW','FY08','TI3K','F4F9','TWCV','FQWU','TMEM','TEVZ','F43H','TLRU','T0DD','FAJU','T3IY','FMPP','TNRX','T49I','T5JZ','FFEN','TGTK','TLYC','TSBP','T3GC','TMZ0','TEPK','F2G2','T3RX','TSSQ','TEOT','TJBM','F42Q','T5FG','TTGB','TTAG','TRUE','TERD','TTQ8','TOP7','THXB','TIQI','FT69','TW7U','TP2U','TPUG','TNS7','TFSH','TP4U','TWGP','F0O8','TGQT','TEER','FBRI','TSVF','T1UW','FEPF','TKZN','TW5M','F9IU','TYH3','FAP0','TULA','FFG0','TREM','TM0A','T42T','F17R','TUTP','T7X0','TZUY','TPDT','T3LY','F73P','TWES','FMLT','TIHI','T4OC','TJE6','TWV0','FFOA','TKWS','TZEE','TTAL','FKB4','TMN0','TTUD','TWRS','TZRT','TD3N','TLEZ','TVLZ','TV76','FFEA','TCRR','FVZL','TFTI','FMTM','TOXL','F7PV','T0ND','TM7B','T0NB','T0ZI','TMSS','FZNV','T2EW','TQ2E','TO1Z','TGE1','TNLT','FL4B','TPPC','F6KP','TIJ8','F3NZ','TXVH','TEH9','F74S','TQON','F5OT','F0PG','TL0I','TS59','FHLN','TBQ6','TPZP','TXOB','TGYY','F1RX','TRYP','TKBY','TNOG','TMFJ','T5FJ','T56C','TXUZ','TFK9','T9JS','TIHA','T9IY','TO63','TMD9','FG78','TS4J','TI0X','TLTS','FYS1','T3AN','TXTR','T1R9','T9RL','T9OK','TJBT','FZHN','TA07','TNXU','TXBZ','FQNS','TRXA','TDST','TTTI','TD7T','TH1S','TU6Q','FEF5','F8K4','TQ7C','TCIH','F5GS','TK7E','FC5P','TA67','TS2U','TYLN','TSNZ','F26W','TIUF','FEEO','TJE8','TW7T','T1NJ','TLKQ','TRRU','TUUB','TXA3','FQM8','TXT6','TCCV','TRGN','TGVK','FAPA','TXGC','TZB6','TKRQ','TROH','TGVY','TVMI','TEFS','TXDN','FZO4','F01U','T1BF','T7V2','TQYF','FQUM','FTWO','FM7V','F55F','F1FX','T8G6','TWAR','F4D1','TQGF','TRWO','FC7H','FL05','TOM7','TIVY','TI1I','FRQJ','TYQW','TG90','TDFK','TJAT','FY2E','F8IZ','FWSW','TKUS','FMQJ','TKIU','THT3','TRW1','THCE','TYGL','TN8D','FKRU','TNB4','FIE7','TREO','TTAC','FK6M','TSP7','T3XV','TAFD','F7Q6','TSOD','FS2U','TY5X','TUMN','TZRN','TJ1U','FMH7','T3YV','TPII','TDX3','T1DW','FNW3','FMKC','TLXH','TTSI','TOX8','TVNG','F5IA','TUTK','TEPL','FNKC','T66Q','FYNI','TTXS','TO6C','F7UT','FPXQ','TXSQ','T5JA','TT7A','TUWT','TRSX','TVOK','F3N3','TWCC','TIHF','TUCU','TUYX','TIWC','FZ58','TPUV','FSSA','TOFB','TBM0','FCD5','TIKC','TJAZ','FCBJ','TO2M','TIJJ','T4QU','TRKU','TZ8H','TCX4','TFMW','T609','TZAM','TTW2','T8D0','T2CK','TPGE','THRK','TV5G','TJMX','FWJS','TT9C','FKIU','TJTI','FI3Z','TKQS','TWUL','TUIB','F5LI','F4R4','TYCH','TYBV','TUIG','TTXF','TMVL','FF7L','T22N','FX02','TXXR','T1ZQ','TWJ8','FG8Z','TSG6','TIOK','TOTL','T4HH','T225','FCBI','TRAQ','TEG4','TRNF','TFH5','T3PP','TO5I','T4EK','TQMI','TQ90','TSI2','TP1U','F8N5','TRR1','TQA2','T6BG','TIJE','THKK','T7TQ','FBPG','FGFU','TQLH','TPO9','F5KK','TARJ','TGKX','THLF','T1X8','T5CL','FFAX','TWZ6','F958','FGAD','TOAN','T1YB','TUIA','TPXS','TM60','F3BB','FMJN','FNKF','TLOZ','TL9J','FFGC','TXE7','T17C','T78Y','F73L','T6OG','THOR','TZMJ','TAUF','TBVB','TZFP','FT42','FKAN','T6UD','TMH6','TUIR','T3ZC','FRKO','TXXY','TY26','TMOU','TYZU','FAWE','TSIS','FDDY','TCGB','TQ5Q','FAND','T3OG','TID6','TUPF','TZMT','FT1X','TVHS','FLAP','TRMT','TSL9','FRC1','F1CZ','F7XK','FEVO','TLRM','TTDB','FP53','FFZ4','F3AR','TZGQ','TYL9','TTRP','FHTG','TKNV','TFBI','TGYF','FOK6','TWZM','TY8V','TOOI','T5DN','TIK4','TX2V','THV5','F23Q','TEOY','F37V','TVRB','TMGO','FOAK','THYE','TTCS','TQFL','FKXK','FW5E','TDA1','F7C6','T5ON','FOOE','TMUN','TQVR','TU9C','TRL6','TWEC','FANN','TK63','TAXT','F8VT','TWDK','FI23','TWJZ','TUPB','TEPF','TL3B','FAH8','TOG4','TTGU','TJJZ','T9JK','F91E','TJ6H','TYCF','TDGA','THZL','T447','TDZU','F921','TLCJ','TNPG','TWND','THF4','TWJS','TWIZ','TV7A','FERZ','FZ6X','FNW0','TTM7','TO8B','TP4T','F11J','TLQM','TWWS','TYKD','F3FT','F8P3','FFC0','F5E5','TNNL','T9GG','TYM8','TRF9','FLD3','TAEC','TSWN','FGN0','TYYB','T9UL','TTZU','F426','FHLF','TY2X','TOOK','TTTQ','TNLV','TU2O','TCUS','TS50','FTTW','T6LS','TVWF','TY49','TS4B','TQ4E','FVNK','TWRB','FBIB','TKL0','T76B','TROJ','TXY9','TV3I','TXUQ','TCM7','T8JA','T1DI','FMY8','TEH1','TB2S','TW0S','FBE8','TW2P','TF64','TIMO','TYVW','TQDW','TZ6L','T7Y5','FM2O','TINZ','TQLA','TZIK','FGL1','TTUJ','TWOD','FOPV','TLJ4','FATM','F74A','TB6S','TFZV','F2YX','TJFJ','T4YD','FT5Y','TQ37','TWLQ','TW51','TK1Y','THI3','TY8G','TYLE','F77C','FC1H','TUKZ','TJCO','TD0A','TV6S','FD21','T523','TWFP','TPJ6','F01G','FMHB','TUU5','TVL6','TYW5','TOCF','TUWO','FN41','T7S2','FCRP','T3KS','T2MN','TZ6W','FARV','FCYX','TVOJ','TEH7','TRJ0','TOCE','FD3P','FJAO','TFM6','TSVH','F3QN','T0JW','TNDS','T1YO','TQWD','T97N','T2JJ','TUIM','TRQW','TTJU','TTY5','FGWA','TT3Q','F29I','TRTF','FMP5','FIMZ','TS6A','FAKP','FQJQ','TYHE','TVWL','F6XK','TA9L','TXTE','TK1X','T5ZY','TMZU','FVUE','TK6P','F8RZ','FIU9','F0GT','FW53','TRKC','F4UC','TCFZ','FIMK','TC3U','FEQL','F20T','TWB6','T3TA','T1T5','FL5B','T2EF','TYKF','T7K3','FDSZ','TVR7','TT1C','TLQW','TNBA','T5KA','FCUY','TRYR','TF82','FEEI','TUD1','THEM','FDF7','TMP7','T6JK','TXF4','F0KN','TKK4','F1KY','TSN7','TXXC','FIUA','F13U','T6DZ','T1SG','TQ9Y','TTIK','TNNI','TO08','TJOI','TLBD','TWPT','TRV7','T3X2','TK8U','TEUK','TROG','TDRK','TA4J','FLWE','FYUN','F0HT','F59R','TP0D','TXR8','TVW6','FBRR','THAK','FJCG','TO7K','TQGC','TOPO','FVIA','FETS','FULA','TUAU','F76Q','TTFI','FL2Z','TCQ9','TROD','FSNV','TOBX','FC0W','TIY2','TY6S','TMMX','FSF6','FT7U','TRPM','T79E','TXX8','FSSB','TYIQ','TBVS','TTNX','THTY','FA84','FJJK','FF0E','TO2S','T4GA','TQ7S','TNI5','TZEO','FITO','FQ0A','T7AE','T3M8','F5F4','FZVZ','FVDM','TSNC','TKMB','TY5V','T4RL','TYJ4','TRHK','TIIU','TIT8','TBY2','TACI','THMS','FJ05','F1NI','TET2','TX2I','FM4O','TJE3','F0YO','FPPL','TQ88','TN0U','TTRN','TKU5','F1CC','TD7W','TQJB','T9TR','T2KQ','TNII','TVLH','F2AA','TGZ1','F5II','T8HN','TFS2','FAI9','TIO4','TKQW','TXQ9','F36B','TXJQ','FQJI','TEVE','F657','FUY5','F1HT','TMPP','FD2C','T55C','TMCE','F08C','F3DP','TG5H','F9GO','THW2','TAGU','TYDO','TTD0','TUPS','FA8Q','TIRL','TTU9','TTDH','T7ED','TSHM','TC2R','TUZ0','FEU4','THVM','TNEO','FDI8','TY7N','TYXC','T0BA','TIXI','TVVI','FN34','FDCM','TLN7','TGMA','TMSL','FG0P','TCN3','TCL1','TQ6T','F6RW','TFWN','T1LG','TSMS','TCXF','TOWJ','TGY9','FHLR','TLP9','TQH3','FE7O','TTPA','FE6H','FAIV','TCRL','TTGI','TZNM','T5OS','F68Q','TIO9','TFSD','F5GZ','TETM','T77S','TYPO','TI0I','F52Q','TKEX','TWFM','TXO9','TZ7H','TY4Y','TICO','TXMH','TOK9','F8UK','TZ6D','T5KU','F4F4','FFSP','FC1R','FS8G','TNJB','TTCD','T55O','F8CN','TWBE','THNE','F6RD','FXX1','FAL3','TJ2C','FQ50','TPMN','TWD1','FD9U','TF1R','TITO','TPYL','T4FN','TUXU','F0UZ','T86S','T1AF','TJJQ','T8A5','TXUG','T75C','TSIA','F3RQ','TIOC','T8Y0','T01P','FQZU','TXHG','TVSP','TBFY','TL1C','FP2U','FQA9','TLLL','TOYZ','TZ0G','FC9Z','TQ74','TUF8','F0VA','THRE','FN6R','TDKV','T9KB','THRN','FCME','T13I','TSLB','T0IS','TIMF','TSYU','TPJU','TTLD','TYLT','TNNX','FRRA','TVNY','T4I6','TSQU','F2HT','TVBE','TTSV','T53W','TOOM','FSFY','FE7U','TXFG','FAS4','TY8P','FMI9','FLE3','TF9V','T2QE','TH5Y','F0L0','TKSU','TL9L','FUNQ','TBND','TLRW','FB2P','TSAB','TR5K','TTTK','FZ7G','TCK5','FBP2','FO9P','T1HJ','TY4B','T0UR','TKYZ','TPN9','FFDA','TQ97','TLID','TISY','TW2N','TVAR','FFYJ','F5YI','TR1Z','TSLM','T85B','TIK5','FUS2','T1FZ','TAQE','TD51','TXK7','TVVM','T6RD','F0JF','F2YY','F80B','F2S7','TCIK','FURN','TFCI','T6ZU','TYQ8','TVGF','TQ7P','TIMS','TUAY','T0XU','TMPO','TSS9','T433','FTE6','TETP','T4EV','FZQT','TD50','TZDC','TMXZ','THHB','TXGV','TZ2L','T7TT','TDDL','TNEN','T75B','TWAL','F31B','T5BU','F6CV','FPDL','TQZT','TSWF','FITT','TMXV','TWXO','FYMQ','FI3B','T606','F5BA','F97Q','T8FB','TUNV','TXKA','TBIA','TBYV','T154','TM5L','F425','F7G4','TOFU','TF7T','TLJ1','TRLU','TR6C','T7HK','T5JK','TZXF','F5N6','TELS','TWOL','TUY8','TWEB','FKP1','FH8E','FIRF','F0PT','TK5K','TWSX','FBK8','TDFI','TXPW','TJL4','TUJD','TTAZ','T628','F5WF','TUBM','FVGM','TYPA','TCZ0','TG8C','T6ZM','TWRR','T1ST','F424','TMGK','TL5C','FD44','F01O','T9QP','TNHH','TND4','TFQV','TFZR','TEN1','THAB','F6JP','TT66','TSUP','T4N8','FDUW','TXVV','TSZJ','FCKU','FMTO','TN1Q','F0W1','TNAS','F3XG','T66H','TP6O','FC1X','FUWQ','TIMG','F29H','TSBZ','T1M2','TBVE','FT1V','F2MD','TU3E','T4SA','T04V','T11N','TJLC','FXAX','FQZH','TXOR','TCPH','TXXO','FS03','TVR8','TKKX','TWZA','FEUF','T3Y0','TNGU','FFNK','TAOF','FT32','TNRI','TO3E','TCGF','TTGO','T1UV','T3C5','TQCV','T6CJ','FNE4','TXIE','TJPD','T0HK','TUG7','TQZ0','T5WE','TNZ9','FJT1','TZ8C','FXJJ','FBYF','FPZ0','TL4A','TPNU','TXTU','T5NW','TF54','F1FY','FAFH','F1SX','TU6J','T9XS','FADM','TIV6','TTE7','TEOA','T0NA','TYFE','TRUB','T4G5','T1DF','F34V','T9BR','T6FQ','T4GH','T6PS','TK9V','TQ59','FUXS','FMRX','T09O','TXUS','F2C0','F1GO','T0V3','FJTV','F7UN','TADA','TDHA','TLDH','TVOO','TWB7','FO6I','T0CY','TUI6','TVUV','T3XW','TSKF','TRXY','TVQJ','TI66','TKPE','TEUM','FW63','TTOX','TLZG','TZCZ','TO5A','TGN8','TXJ2','F6OM','FNKE','T2M2','TO8E','F90F','T2UY','TS5F','TYUK','T3J9','TVDA','F17S','TKMD','TQ53','TRST','T78B','FYUZ','T8KE','TCNN','FS2O','TMJ6','TQ61','T53I','TURL','TUXX','TXQY','TLD3','FUSN','TACS','TXFB','FKCD','T76E','TWZW','F7MP','F3EW','T8GR','FC5Z','TUEW','FX1L','FIOQ','TXO8','FH28','T5ET','TORG','TPVL','FLIB','TYTR','FC3Y','T7R2','FUEK','T8LV','TLJX','TBEK','TJGK','FBVQ','TBJR','FYYY','TXZ4','F30C','FE70','TJS8','T0OA','TPEC','TSJN','TSXZ','THIT','T3NF','TUKT','T0BP','TUU0','T6F6','TP7K','TL7C','TGOJ','T485','FRBR','TBSE','TOTJ','TJTT','FW00','F2ZP','FMHN','T4YO','TZ4K','TTP2','TKMF','TJSG','TU60','TBJI','TU0P','TR69','TUE6','T0MT','TSS3','TGCJ','TCLP','TNMS','TL3J','FRIQ','TVYC','TPOG','T7QC','TUN4','FHJP','F4OI','TVKV','TGQQ','TDOT','TWNB','TMXX','TI1E','FD5R','FAHK','TGGR','F3UW','T9GN','TCOP','FJRR','F5YX','TTSN','TRK6','TUP3','TH2N','TMK0','TDMX','TVME','FM5U','T6VO','FCAM','TEZ0','F85R','T8HH','TIBA','TSAN','TIDN','FYLH','TTOF','FBR4','FJLB','TJYU','TGF1','T2DA','TN6W','FEGS','FUDE','T3IC','TSIT','TSH5','TRL4','FVNA','TH2S','TJBB','FD47','FAEN','TZKQ','TEAN','TPCS','TZ7U','TQ42','T2F4','TKMM','T3NH','TOHC','TENW','TULY','FCJM','FEB7','TKU3','FA0W','TUI0','TWSL','TTGM','TQTU','TWYE','TJ0R','TV1A','FLEX','TUD0','F49D','T2NT','TJNJ','FANT','TPQZ','TRRI','TO5O','T1F4','TPOR','FUXR','F02X','FC82','TO99','FFNT','TLA6','TNBZ','FKJJ','TI1O','T9T0','TR3K','FFWQ','FV5C','T5JD','TO8O','TCAK','FCZM','T3DQ','T8VB','TY3E','FA7Q','FS3T','TT3Z','TRRM','T2MY','TP2S','F55L','TT9Y','TVXL','TETE','TQWG','TZM8','TMPL','TYAO','FCCF','TOYA','FQCJ','TTXU','TALQ','F0ZX','T3J5','TI0L','F8LF','TZSI','THCM','TRFZ','TESF','TQ3N','TF6V','T09Y','FSDW','FZ9Z','F93J','TGT0','TJJG','FAOH','F1NH','FKIX','FDVG','F3QZ','FNAN','TG6P','TUEZ','T0R5','FUSP','F5AX','F10Q','TTN4','T8SD','TK8Q','TUMP','TSYI','FNY1','FEHE','TXAM','T6NL','TGDC','TLYR','FOSW','TKM3','T7IS','TI4P','T4X2','TS8K','FL9D','TSOT','TYC0','TGTF','TRUW','TIGJ','FJ25','TJSX','TRON','T78J','TA55','TRUA','FIJH','TUSJ','TT83','TQ8I','TT6R','TDGT','F435','TMM0','FT43','TZAP','THRW','F984','FCDF','TTZG','THKY','T76J','TS48','TWAV','TRT4','TS7Y','FHOX','FSKY','TUUA','T5C9','F32L','TYAC','TB6C','TN5R','TNOI','TWS6','T6IH','TRHR','F7KV','T56Y','FESZ','F5FX','FOZ4','T3B7','TQ43','TNAL','T1FH','F2XX','TRB2','T54C','T54W','TFOX','TATO','TQ5N','TWEM','F2JE','TWQF','F2KF','TKEM','TW5A','FGJK','FP1E','TT8N','FNN3','TRUL','TOCI','FAAP','TM1C','TZVG','TXL6','FWYJ','TN9L','TVFP','TYKC','TWNJ','T4B0','T8EO','FH9R','T6LO','FTEG','F2PA','FHAT','TDBM','FIQ7','TLA8','TYYT','TZKZ','TM2C','T3QO','TYP1','F10D','F941','TPOP','TQ28','FW6C','TZRI','THKW','TRDQ','FME7','TPZS','TYQJ','TPGD','TBPS','TW0Z','F00R','TQVJ','TJNP','F8I6','TMEJ','FFA3','TJJ3','T8TX','TW08','TUX5','T6KB','TTSD','TJM2','TXXZ','TNA7','TEJ6','TRFR','TVO4','TZIM','TWIL','FHPA','TEKZ','T0U6','TZAY','TR6O','TPFG','FT3B','TO5D','TSXA','FDA2','TPVQ','TKLJ','T4BC','FNIN','FU7Y','TA00','FPBF','FM0K','FW8J','FRGV','TSNS','F8LR','FLPH','FOCZ','TOE6','TZM5','FR7R','T21V','TQ91','T1LL','TNQ1','TYLD','FN7J','TVRU','TJMT','TWHH','TTC4','TXRB','FEVA','T676','TY55','T9QZ','TCFF','TTER','TVED','FMUP','T2GG','TUEG','FR67','T5KL','F1QX','TUYU','T6S8','TH7Y','TP4O','THFU','FL4F','TNOB','TLQG','TEYB','TFN1','TNOL','TDRO','TKAM','T7VI','TRIG','FT2E','TE4V','F18I','FODA','TQ09','FYN3','T2ZO','TUQ0','FADB','FOSL','TTWX','T5LL','F48A','FJMJ','TH1K','TPG4','TU4U','FM0I','TJWA','F76L','TB8W','TWLB','T64O','TSIV','FTFC','T61C','TZXA','TLG5','FQ9W','TSA1')
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const getTokoStruk = async (toko) => {
  try {
    //--AND statusListener is null
    //AND (lower(statusListener) not rlike 'succes' or statusListener is null or jmlstruk > 10)
    //${filter}
    const filter = toko.length > 0 ? `and concat(toko,tanggal) not in(${toko})` : "";
    const rows = await conn_ho.query(`
    select kdcab,toko,group_concat(tanggal) as tanggal from summary_varian_2024 
    where tanggal >= '${dayjs().subtract(7, "day").format("YYYY-MM-DD")}'
    AND (lower(statusListener) not rlike 'succes' or statusListener is null or jmlstruk > 10)
    ${filter} 
    group by kdcab,toko;
    `);

    return rows;
  } catch (e) {
    return "Error";
  }
};

const cekGetTokoStruk = async () => {
  try {
    const rows = await conn_ho.query(`select 
      kdcab,toko,
      STR_TO_DATE(SUBSTR(isistruk, LOCATE('/',isistruk)-14,8),'%d.%m.%y') as tanggal,
      nostruk 
      from summary_varian_2024_new`);

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
        and flag != 1`);
    return rows;
  } catch (e) {
    console.log(e);
    return "Error";
  }
};

const getListIpIris2 = async () => {
  try {
    const rows = await conn_ho.query(`
        select * from m_server_iris
        WHERE jenis = 'IRIS'
        and flag != 1
        and kdcab in('G301')`);
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
      "kasir",
      "IBFclpn+vT3lRyK++3tN4pYWvKlYPqakg=rNgrhYREb/",
      "pos",
      3306,
      param
    );
    if (rows.status === "NOK") {
      const rows2 = await conn_any.runQuery(
        iptoko,
        "kasir",
        "xDxXDCtUtIl6DJrwkxoVA0nvNgG5OUWlM=eP2hoyuOre",
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
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const rows = await conn_any.runQuery(ip, user, pass, db, 3306, param);

    if (rows.status != "OK") throw new Error(rows.data);

    await client.set(`GETDATAIRIS-${kdcab}`, JSON.stringify(rows.data));
    const end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(`${kdcab}|${start}|${end}`);
    return `${kdcab}-Sukses`;
  } catch (e) {
    console.log(`${kdcab}-Gagal`);
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

const ipserver = async (kdcab) => {
  try {
    const rows = await conn_ho.query(`
        select * from m_server_iris
        WHERE jenis = 'IRIS'
        and kdcab ='${kdcab}'`);
    return rows;
  } catch (e) {
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
  getListIpIris2,
  cekGetTokoStruk,
  ipserver,
};

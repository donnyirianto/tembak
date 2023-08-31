const fs = require('fs');
const Models = require('./models/model')
const getIP = require('./helpers/iptoko');
   
const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    
        const results = await Models.getListRSB();

        results.forEach( async (r) => {  

        const queryTembakx= ` 
        create table if not exists a_reg_insert_${r.rsb} select * from pos2_backup_rak_20230725 where kodemodis like '${r.rsb}%';  
        insert ignore into rak select * from a_reg_insert_${r.rsb} where kodemodis like '${r.rsb}%';
          update prodmast set recid='', ctgr='XX' where prdcd in (SELECT prdcd FROM a_reg_insert_${r.rsb} WHERE kodemodis LIKE '${r.rsb}%');
          create table if not exists bck_reg4_nrakktgr_230726 select * from nrakktgr;
          create table if not exists bck_reg4_ptag_nr_230726 select * from ptag_nr;
          delete from nrakktgr where prdcd in (SELECT prdcd FROM a_reg_insert_${r.rsb} WHERE kodemodis LIKE '${r.rsb}%');
          delete from ptag_nr where prdcd in (SELECT prdcd FROM a_reg_insert_${r.rsb} WHERE kodemodis LIKE '${r.rsb}%');
          UPDATE pos.program_setting SET nilai = CAST(DATE_FORMAT(NOW(),"%d-%m-%Y %H:%i:%s") AS CHAR) WHERE program = "POSREALTIME" AND jenis LIKE "LastUpdateProdmast%";
          update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
          update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
          update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
          update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM';
        `
        const rIP = await getIP.bykdtk(r.toko);
        
        const rv = await Models.vquery(rIP.data[0].IP, queryTembakx)
        
          if(rv.status === "NOK"){
              console.log(r.kdcab +'|'+ r.toko+'|'+'Gagal|')
          }else{                       
              await Models.updateFlagRSB(r.toko)
              console.log(r.kdcab +'|'+ r.toko+'|'+'Sukses|')
          }
          
        }) 
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

          
}
 
doitBro()
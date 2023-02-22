const Models = require('./modelsnew/model');
 
(async ()=>{
  try{  
    
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
        //update prodmast set price = '22900' where prdcd in(20036467,20102701);
        /* DELETE FROM USERSODCP WHERE ID = '2015392812';
        INSERT INTO USERSODCP SET ID='2015392812', NAMA='EKI MOHAMMAD RIZKI',\`PASSWORD\`=392812, \`GROUP\`='BIC'; 
        update vir_bacaprod set filter = 'ON' where jenis = 'SKIP_ODBC';
        */
        const queryTembakx= ` 
        replace into vir_bacaprod
        values ('SKIP_ODBC', 'ON', 'Lewati pemanggilan ODBC', 'PosIDM', '', '2021-03-23 14:24:44', '2021-03-31 16:44:17', 'Dari WebService')
        ` 

/* SELECT "DeletePromoMatriks|230210014955|261";6^, Updtime = NOW(), Runtime = NULL, TipeJadwal = 6^6^, Jadwal = 6^6^; INSERT INTO pos.log_monitor (WAKTUREPORT,JENIS,KETERANGAN) VALUES (NOW(),"7","TembakDataToko|DeletePromoMatriks|IdStatus:261|KodePromo1:HSFB0562|KodePromo2:HSFB0562");
SELECT "DeletePromoMatriks|230210014955|261";6^, NOW(), NULL, NULL, 6^6^, 6^6^) ON DUPLICATE KEY UPDATE perintah = 6^DELETE FROM pos.promo_matriks WHERE kodepromo = "HSFB0562" AND kodepromo = "HSFB0562"; 
 */
/* DROP TABLE IF EXISTS POS.PLASTIK_TEMP;
        CREATE TABLE pos.plastik_temp LIKE plastik;
        UPDATE pos.plastik SET berbayar='Y';
        UPDATE POS.CONST SET JENIS='Y' WHERE RKEY='MPL';
        UPDATE PLASTIK SET JADWAL='YYYYYYY';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM'; */
        /* DROP TABLE IF EXISTS POS.PLASTIK_TEMP;
        CREATE TABLE pos.plastik_temp LIKE plastik;
        UPDATE pos.plastik SET berbayar='Y';
        UPDATE POS.CONST SET JENIS='Y' WHERE RKEY='MPL';
        UPDATE PLASTIK SET JADWAL='YYYYYYY';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
        update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM'; */
        //console.log(r.kdtk)
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
      
        if(rv === "Gagal"){
          console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|'+ r.ip1) 
        }else{                       
            console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|' + r.ip1)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 

//UPDATE TOKO SET PEDULI='Y',PEDULI1='2022-12-08', PEDULI2='2023-01-17';
        /* insert ignore into vir_bacaprod set jenis = 'CETAKLISTINGLBL_OFF',
filter='ON', ket ='Memo masih draft', program='Pricetag',recid=''; 

replace into \`vir_bacaprod\`(\`jenis\`,\`FILTER\`,\`KET\`,\`program\`,\`RECID\`,\`ADDTIME\`,\`UPDTIME\`,\`UPDID\`) 
        values ('BA_DRAFT_AKTIF','','Memo 301/20 mulai main','BERITAACARA','',NULL,NULL,'BeritaAcara.exe'),
        ('DRAFT_KONTAINER',"ON|DCI='20038946','20052235';DCGI='20052236';DEPO='20052234'",'Memo 119/21 mulai main','PosBPB','','2022-08-23 09:09:36','2022-11-11 09:55:48','Dari WebService');
        */
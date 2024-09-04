const Models = require("./models/model");

(async () => {
  try {
    const results = await Models.getListIp();

    results.forEach(async (r) => {
      const queryTembakx = `
        create table if not exists pos2_backup_rak_20240527_ACRCAKE3 SELECT * FROM pos2_backup_rak_20240526 WHERE kodemodis rlike 'RSB';
        create table if not exists prodmast_reg_240527_3 select * from prodmast;
        update prodmast a right join (SELECT prdcd FROM pos2_backup_rak_20240527_ACRCAKE3) b on a.prdcd=b.prdcd set a.recid='',a.ctgr='XX' where a.prdcd=b.prdcd and a.prdcd is not null;
        create table if not exists rak_reg_240527_3 select * from rak;
        insert ignore INTO rak SELECT * FROM pos2_backup_rak_20240527_ACRCAKE3;
        create table if not exists ptag_nr_reg_240527_3 select * from ptag_nr;
        delete from ptag_nr where prdcd in (SELECT prdcd FROM pos2_backup_rak_20240527_ACRCAKE3);
        create table if not exists nrakktgr_reg_240527_3 select * from nrakktgr;
        delete from nrakktgr where prdcd in (SELECT prdcd FROM pos2_backup_rak_20240527_ACRCAKE3);
        UPDATE program_setting SET  nilai=DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL 30 SECOND),'%d-%m-%Y %H:%i:%S')  WHERE jenis like 'LastUpdateProdmast-%' AND program='POS.NET-POS.IDM';
        UPDATE program_setting SET  nilai=DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL 30 SECOND),'%d-%m-%Y %H:%i:%S')  WHERE jenis='LastUpdateProdmast-01' AND program='POS.NET-POS.IDM';
        UPDATE program_setting SET  nilai=DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL 30 SECOND),'%d-%m-%Y %H:%i:%S')  WHERE jenis='LastUpdateProdmast-02' AND program='POS.NET-POS.IDM';
        UPDATE program_setting SET  nilai=DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL 30 SECOND),'%d-%m-%Y %H:%i:%S')  WHERE jenis='LastUpdateProdmast-03' AND program='POS.NET-POS.IDM';
        UPDATE program_setting SET  nilai=DATE_FORMAT(DATE_ADD(SYSDATE(),INTERVAL 30 SECOND),'%d-%m-%Y %H:%i:%S')  WHERE jenis='LastUpdateProdmast-04' AND program='POS.NET-POS.IDM';
        `;

      const rv = await Models.vqueryTembak(r.ip1, queryTembakx);

      if (rv.status == "NOK") {
        console.log(r.kdtk + "|" + r.kdcab + "|gagal|" + r.ip1);
      } else {
        console.log(r.kdtk + "|" + r.kdcab + "|sukses|" + r.ip1);
      }
    });
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
})();

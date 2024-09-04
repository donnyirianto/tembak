const Models = require("./models/model");

process.setMaxListeners(0);

const doitBro = async () => {
  try {
    const start = new Date();
    console.log("Running At : " + start);
    //rename table m_rekonsales_rekap2 to m_rekonsales_rekap2_bck_2401;
    const querySql = `
        create table report
SELECT KDCAB,KODE_TOKO,NAMA,
	NAMA_MODUL,
	SUM(QTY_31) AS QTY_31,
	SUM(BPB_01) AS BPB_01, 
	SUM(SALES_01) AS SALES_01, 
	SUM(RETUR_01) AS RETUR_01, 
	SUM(BAP_01) AS BAP_01, 
	SUM(NK_01) AS NK_01,
	SUM(BPB_02) AS BPB_02, 
	SUM(SALES_02) AS SALES_02, 
	SUM(RETUR_02) AS RETUR_02, 
	SUM(BAP_02) AS BAP_02, 
	SUM(NK_02) AS NK_02,
	SUM(BPB_03) AS BPB_03, 
	SUM(SALES_03) AS SALES_03, 
	SUM(RETUR_03) AS RETUR_03, 
	SUM(BAP_03) AS BAP_03, 
	SUM(NK_03) AS NK_03
FROM 
(
	SELECT KODE_TOKO,NAMA_MODUL,A.PRDCD,
		A.QTY QTY_31,
		IFNULL(BPB_01,0) AS BPB_01,
		IFNULL(SALES_01,0) AS SALES_01,
		IFNULL(RETUR_01,0) AS RETUR_01,
		IFNULL(BAP_01,0) AS BAP_01,
		IFNULL(NK_01,0) AS NK_01,
		IFNULL(BPB_02,0) AS BPB_02,
		IFNULL(SALES_02,0) AS SALES_02,
		IFNULL(RETUR_02,0) AS RETUR_02,
		IFNULL(BAP_02,0) AS BAP_02,
		IFNULL(NK_02,0) AS NK_02,
		IFNULL(BPB_03,0) AS BPB_03,
		IFNULL(SALES_03,0) AS SALES_03,
		IFNULL(RETUR_03,0) AS RETUR_03,
		IFNULL(BAP_03,0) AS BAP_03,
		IFNULL(NK_03,0) AS NK_03
	FROM ST_240531 A
	LEFT JOIN
	master_produk_khusus B
	ON A.PRDCD=B.PLU
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='B',QTY,0)) BPB_01,
			SUM(IF(RTYPE='K',QTY,0)) RETUR_01,
			SUM(IF(RTYPE='X' AND ISTYPE='BA',QTY,0)) BAP_01,
			SUM(IF(RTYPE='X' AND ISTYPE='SO',QTY,0)) NK_01 
		FROM WT_240601 GROUP BY PRDCD,SHOP
	) WT1
	ON A.KODE_TOKO=WT1.SHOP AND A.PRDCD=WT1.PRDCD
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='B',QTY,0)) BPB_02,
			SUM(IF(RTYPE='K',QTY,0)) RETUR_02,
			SUM(IF(RTYPE='X' AND ISTYPE='BA',QTY,0)) BAP_02,
			SUM(IF(RTYPE='X' AND ISTYPE='SO',QTY,0)) NK_02 
		FROM WT_240602 GROUP BY PRDCD,SHOP
	) WT2
	ON A.KODE_TOKO=WT2.SHOP AND A.PRDCD=WT2.PRDCD
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='B',QTY,0)) BPB_03,
			SUM(IF(RTYPE='K',QTY,0)) RETUR_03,
			SUM(IF(RTYPE='X' AND ISTYPE='BA',QTY,0)) BAP_03,
			SUM(IF(RTYPE='X' AND ISTYPE='SO',QTY,0)) NK_03 
		FROM WT_240603 GROUP BY PRDCD,SHOP
	) WT3
	ON A.KODE_TOKO=WT3.SHOP AND A.PRDCD=WT3.PRDCD
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='J',QTY,-QTY)) SALES_01
		FROM DT_240601 GROUP BY SHOP,PRDCD
	) DT1
	ON A.KODE_TOKO=DT1.SHOP AND A.PRDCD=DT1.PRDCD
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='J',QTY,-QTY)) SALES_02
		FROM DT_240602 GROUP BY SHOP,PRDCD
	) DT2
	ON A.KODE_TOKO=DT2.SHOP AND A.PRDCD=DT2.PRDCD
	LEFT JOIN
	(
		SELECT SHOP,PRDCD,
			SUM(IF(RTYPE='J',QTY,-QTY)) SALES_03
		FROM DT_240603 GROUP BY SHOP,PRDCD
	) DT3
	ON A.KODE_TOKO=DT3.SHOP AND A.PRDCD=DT3.PRDCD
	WHERE B.NAMA_MODUL RLIKE 'MISTER DONUT|ONIGIRI'
) A 
LEFT JOIN
M_TOKO B
ON A.KODE_TOKO=B.TOKO
GROUP BY KODE_TOKO,NAMA_MODUL;        
        `;
    //insert ignore into m_rekonsales_rekap2 select * from m_rekonsales_rekap2_bck_2401 where id >='2023-12-01';
    const results = await Models.getServerIris();

    results.forEach(async (r) => {
      // ANCHOR ===============Query Ambil Data =========================
      let data = await Models.vqueryTembakIris(r.ipserver, r.user, r.pass, r.database, querySql);
      console.log(r.kdcab, data.data[0]);
    });
    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

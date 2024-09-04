const Models = require("./models/model");
const { readRespSql } = require("./helpers/readresp");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");

const prepareData = async (client, r) => {
  try {
    let dataCache = await client.get(r);
    if (!dataCache) throw new Error("Data not found");
    const hasil = JSON.parse(dataCache);
    const csv_sukses = Papa.unparse(hasil, { delimiter: "|" });
    fs.writeFileSync(`/home/donny/project/tembak/hasil/${r}.csv`, csv_sukses);
    console.log(r);
    return {
      status: "Sukses",
      id: r,
      data: "Sukses",
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};

const doitBro = async () => {
  try {
    const start = new Date();
    console.log("Running At : " + start);

    const results = await Models.getListIpIris2();

    // ANCHOR ===============Query Ambil Data =========================

    let a = [];
    let wt = [];
    let dt = [];

    for (let i = 1; i <= 12; i++) {
      let u = i < 10 ? `0${i}` : i;

      a.push(`IFNULL(BPB_${u},0) AS BPB_${u},
      IFNULL(SALES_${u},0) AS SALES_${u},
      IFNULL(RETUR_${u},0) AS RETUR_${u},
      IFNULL(BAP_${u},0) AS BAP_${u},
      IFNULL(NK_${u},0) AS NK_${u},
      IFNULL(GROSS_BPB_${u},0) AS GROSS_BPB_${u},
      IFNULL(HPP_SALES_${u},0) AS HPP_SALES_${u},
      IFNULL(GROSS_RETUR_${u},0) AS GROSS_RETUR_${u},
      IFNULL(GROSS_BAP_${u},0) AS GROSS_BAP_${u},
      IFNULL(GROSS_NK_${u},0) AS GROSS_NK_${u}`);

      wt.push(`LEFT JOIN (SELECT SHOP,PRDCD,
        SUM(IF(RTYPE='B',QTY,0)) BPB_${u},
        SUM(IF(RTYPE='K',QTY,0)) RETUR_${u},
        SUM(IF(RTYPE='X' AND ISTYPE='BA',QTY,0)) BAP_${u},
        SUM(IF(RTYPE='X' AND ISTYPE='SO',QTY,0)) NK_${u},
        SUM(IF(RTYPE='B',GROSS,0)) GROSS_BPB_${u},
        SUM(IF(RTYPE='K',GROSS,0)) GROSS_RETUR_${u},
        SUM(IF(RTYPE='X' AND ISTYPE='BA',GROSS,0)) GROSS_BAP_${u},
        SUM(IF(RTYPE='X' AND ISTYPE='SO',GROSS,0)) GROSS_NK_${u} 
          FROM WT_2406${u} GROUP BY PRDCD,SHOP
        ) WT${u}
        ON A.KODE_TOKO=WT${u}.SHOP AND A.PRDCD=WT${u}.PRDCD`);
      dt.push(`LEFT JOIN
        (
          SELECT SHOP,PRDCD,
            SUM(IF(RTYPE='J',QTY,-QTY)) SALES_${u},
            SUM(IF(RTYPE='J',QTY*HPP,-QTY * HPP)) HPP_SALES_${u}
          FROM DT_2406${u} GROUP BY SHOP,PRDCD
        ) DT${u}
        ON A.KODE_TOKO=DT${u}.SHOP AND A.PRDCD=DT${u}.PRDCD`);
    }

    const queryCheck = `create table report_donny SELECT KDCAB,KODE_TOKO,NAMA,NAMA_MODUL,MID(CAT_COD,2,2) \`DIV\`,A.PRDCD,
	A.QTY QTY_31,
	${a.join(",")}
FROM ST_240531 A
LEFT JOIN
master_produk_khusus B
ON A.PRDCD=B.PLU
${wt.join(" ")}
${dt.join(" ")}
LEFT JOIN 
M_TOKO Z
ON A.KODE_TOKO=Z.TOKO
WHERE B.NAMA_MODUL RLIKE 'MISTER DONUT|ONIGIRI'`;

    const getData = results.map((r) =>
      Models.vqueryTembakIris(clientRedis, r.kdcab, r.ipserver, r.user, r.pass, r.database, queryCheck)
    );
    const dataCache = await Promise.allSettled(getData);

    //let dataResult = dataCache.filter((r) => r.status === "fulfilled").map((r) => r.value);
    // const dataResult_sukses = dataResult
    //   .filter((r) => r.status == "OK")
    //   .map((r) => r.data)
    //   .flat();
    //const dataResult_gagal = dataResult.filter((r) => r.status != "OK");

    // const dataHasil = await clientRedis.keys("GETDATAIRIS*");

    // if (dataHasil.length > 0) {
    //   const prepare = dataHasil.map((r) => prepareData(clientRedis, r));
    //   await Promise.allSettled(prepare);
    // }

    // dataHasil.forEach(async (r) => {
    //   await clientRedis.del(r);
    // });

    //const csv_gagal = Papa.unparse(dataResult_gagal, { delimiter: "|" });
    //fs.writeFileSync("data_gagal.csv", csv_gagal);

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

const Models = require("./models/model");
const { readRespSql, readRespNative } = require("./helpers/readresp");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");

const prepareData = async (client, r) => {
  try {
    let dataCache = await client.get(r);
    if (!dataCache) throw new Error("Data not found");

    return {
      status: "Sukses",
      id: r,
      data: JSON.parse(dataCache),
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

    const listHrAct = 

    // // ANCHOR ===============Query Ambil Data =========================

    // LISTENERS
    const queryCheck2 = `select 
    (select kirim from toko ) as kdcab,
    (select toko from toko ) as kdtk,
    cast(date(bukti_tgl)as char) as tanggal, bukti_no FROM mstran WHERE 
rtype = 'K'
AND date(bukti_tgl) >='2024-05-01'
AND prdcd in(SELECT prdcd FROM master_returcukai)
AND keter = '04130000 RETUR CUKAI'
GROUP BY date(bukti_tgl),bukti_no;
    `;

    let dataResult_gagal = [];

    for (let i = 0; i < listHrAct.length; i += 500) {
      console.info(`[collect] run ${i}-${Math.min(i + 500, listHrAct.length)}`);
      let allPromise = [];

      for (let j = i; j < Math.min(i + 500, listHrAct.length); j++) {
        const promise = new Promise((res, rej) => {
          //readRespNative(clientRedis, listHrAct[j].kdcab, listHrAct[j].toko, queryCheck2)
          readRespSql(clientRedis, listHrAct[j].kdcab, listHrAct[j].toko, queryCheck2)
            .then((val) => {
              res(val);
            })
            .catch((e) => {
              rej(e);
            });
        });
        allPromise.push(promise);
      }

      let actTask = await Promise.allSettled(allPromise);
      actTask = actTask.filter((e) => e.status === "fulfilled").map((r) => r.value);
      let actTask_NOK = actTask.filter((r) => r.status != "Sukses");
      let actTask_OK = actTask.filter((r) => r.status === "Sukses");
      dataResult_gagal.push(...actTask_NOK);
      console.info(
        `[collect] Total Task: Looping request ${i}-${Math.min(i + 500, listHrAct.length)}, Total OK: ${
          actTask_OK.length
        }, Total NOK: ${actTask_NOK.length}`
      );
    }

    // NATIVE
    //const getData = results.map((r) => readRespNative(clientRedis, r.kdcab, r.toko, queryCheck));

    const dataHasil = await clientRedis.keys("GETDATA*");

    if (dataHasil.length > 0) {
      const prepare = dataHasil.map((r) => prepareData(clientRedis, r));
      const dataCacheResult = await Promise.allSettled(prepare);
      let dataResultCache = dataCacheResult.filter((r) => r.status === "fulfilled").map((r) => r.value);
      const hasil = dataResultCache.filter((r) => r.status === "Sukses").map((r) => r.data);
      const csv_sukses = Papa.unparse(hasil.flat(), { delimiter: "|" });
      fs.writeFileSync("data_sukses.csv", csv_sukses);
    }
    dataHasil.forEach(async (r) => {
      await clientRedis.del(r);
    });

    console.log(dataResult_gagal);

    const csv_gagal = Papa.unparse(dataResult_gagal, { delimiter: "|" });
    fs.writeFileSync("data_gagal.csv", csv_gagal);
    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

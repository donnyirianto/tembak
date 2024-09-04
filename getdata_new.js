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
    const x = await clientRedis.keys("GETDATA-*");
    x.forEach(async (r) => {
      await clientRedis.del(r);
    });
    const start = new Date();
    console.log("Running At : " + start);

    const listHrAct = await Models.getToko();

    // // ANCHOR ===============Query Ambil Data =========================

    // LISTENERS
    const queryCheck2 = `SELECT tgl_slp as tanggal,(select toko from toko) as toko,no_ttss as ttss,nilai_kas_toko FROM history_slp WHERE tgl_slp >= '2024-05-01'`;

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

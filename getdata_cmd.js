const Models = require("./models/model");
const { readRespCmd, readRespNative } = require("./helpers/readresp");
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

    const listHrAct = await Models.getToko();

    // // ANCHOR ===============Query Ambil Data =========================

    const skripCmd = `dir D:\\backup\\DT34419?.???;D:\\idm\\DT34419?.???;`;

    const dataGagalAll = [];
    // LISTENERS
    for (let i = 0; i < listHrAct.length; i += 500) {
      console.info(`[collect] run ${i}-${Math.min(i + 500, listHrAct.length)}`);
      let allPromise = [];

      for (let j = i; j < Math.min(i + 500, listHrAct.length); j++) {
        const promise = new Promise((res, rej) => {
          readRespCmd(clientRedis, listHrAct[j].kdcab, listHrAct[j].toko, skripCmd)
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
      let dataResult_sukses = actTask.filter((r) => r.status == "Sukses");
      let dataResult_gagal = actTask.filter((r) => r.status != "Sukses");

      dataGagalAll.push(...dataResult_gagal);

      console.info(
        `Total Task: Looping request ${i}-${Math.min(i + 500, listHrAct.length)}, Total OK: ${
          dataResult_sukses.length
        }, Total NOK: ${dataResult_gagal.length}`
      );
    }

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
    const csv_gagal = Papa.unparse(dataGagalAll.flat(), { delimiter: "|" });
    fs.writeFileSync("data_gagal.csv", csv_gagal);
    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

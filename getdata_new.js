const Models = require("./models/model");
const { requestTaskNew, loginTask } = require("./helpers/readresp");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");
const { getAESEncrypted } = require("./helpers/encrypt");

const preparePayload = async (kdcab, toko, query) => {
  try {
    const payloadEncrypted = await getAESEncrypted(query);
    return {
      status: "sukses",
      data: {
        kdcab: kdcab,
        toko: toko,
        task: "SQL",
        idreport: `GETDATA-${toko}`,
        station: "01",
        command: payloadEncrypted,
      },
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};

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
    let token = await clientRedis.get("token-ess");
    if (!token) {
      const reqToken = await loginTask();
      console.log(reqToken);
      if (reqToken.status != "OK") throw new Error("Gagal Login ESS");

      token = reqToken.data;
      await clientRedis.set(`token-ess`, token, { EX: 60 * 50 });
    }

    const x = await clientRedis.keys("GETDATA-*");
    x.forEach(async (r) => {
      await clientRedis.del(r);
    });
    const start = new Date();
    console.log("Running At : " + start);

    const listHrAct = await Models.getToko();

    // // ANCHOR ===============Query Ambil Data =========================

    // LISTENERS
    const queryCheck2 = `SELECT  
          (select kirim from toko) as kdcab, 
          (select toko from toko) as kdtk, 
          (select nama from toko) as nama_toko,
          cast(ifnull(A.TANGGAL,'2024-11-27') as char) as TANGGAL,A.STATION, A.SHIFT,A.NIK,A.KASIR_NAME,A.TRN_START, A.TOTAL_SHIFT, B.STRUK_AWAL,B.TOTAL 
          from 
          (
            select TANGGAL,STATION,SHIFT,NIK,KASIR_NAME,min(TRN_START) as TRN_START,count(*) as TOTAL_SHIFT
            FROM INITIAL WHERE TANGGAL=CURDATE() 
            and recid = '' 
            AND STATION<>'I1' 
            and trn_start>='04:00' 
            order by trn_start asc limit 1
          ) A
          left join 
          (select TANGGAL,SHIFT,STATION, min(jam) AS STRUK_AWAL,count(*) AS TOTAL FROM MTRAN WHERE TANGGAL=CURDATE() GROUP BY STATION,SHIFT) B
          ON CONCAT(A.STATION,A.SHIFT) = CONCAT(B.STATION, B.SHIFT);
          `;

    let dataResult_gagal = [];

    for (let i = 0; i < listHrAct.length; i += 1000) {
      console.info(`[collect] run ${i}-${Math.min(i + 1000, listHrAct.length)}`);
      let allPromise = [];

      for (let j = i; j < Math.min(i + 1000, listHrAct.length); j++) {
        const promise = new Promise((res, rej) => {
          preparePayload(listHrAct[j].kdcab, listHrAct[j].toko, queryCheck2)
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
      let actTask_ok = actTask.filter((r) => r.status === "sukses");

      const dataPayload = actTask_ok.map((r) => r.data);

      if (dataPayload.length >= 50) {
        let allPromise2 = [
          requestTaskNew(clientRedis, token, dataPayload.slice(0, 100), 1),
          requestTaskNew(clientRedis, token, dataPayload.slice(100, 200), 2),
          requestTaskNew(clientRedis, token, dataPayload.slice(200, 300), 3),
          requestTaskNew(clientRedis, token, dataPayload.slice(300, 400), 4),
          requestTaskNew(clientRedis, token, dataPayload.slice(400, 500), 5),
          requestTaskNew(clientRedis, token, dataPayload.slice(500, 600), 6),
          requestTaskNew(clientRedis, token, dataPayload.slice(600, 700), 7),
          requestTaskNew(clientRedis, token, dataPayload.slice(700, 800), 8),
          requestTaskNew(clientRedis, token, dataPayload.slice(800, 900), 9),
          requestTaskNew(clientRedis, token, dataPayload.slice(900, 1000), 10),
        ];
        await Promise.allSettled(allPromise2);
      } else {
        await requestTaskNew(clientRedis, token, dataPayload, 1);
      }
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
      //await clientRedis.del(r);
    });

    const csv_gagal = Papa.unparse(dataResult_gagal, { delimiter: "|" });
    fs.writeFileSync("data_gagal.csv", csv_gagal);
    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

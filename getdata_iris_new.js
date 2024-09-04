const Models = require("./models/model");
const { readRespSql } = require("./helpers/readresp");
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

    const results = await Models.getListIpIris();
    //===============Query Ambil Data =========================

    const queryCheck = `alter table m_mtc_sttoko modify column tanggal date default null;`;

    const getData = results.map((r) =>
      Models.vqueryTembakIris(clientRedis, r.kdcab, r.ipserver, r.user, r.pass, r.database, queryCheck)
    );
    await Promise.allSettled(getData);

    const dataHasil = await clientRedis.keys("GETDATAIRIS*");

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

    //const csv_gagal = Papa.unparse(dataResult_gagal, { delimiter: "|" });
    //fs.writeFileSync("data_gagal.csv", csv_gagal);

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

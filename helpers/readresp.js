const axios = require("axios");
const dayjs = require("dayjs");
const { bykdtk } = require("./iptoko");
const { runQuery } = require("../services/anydb");

const readRespSql = async (client, kdcab, toko, query) => {
  try {
    const payload = [
      {
        kdcab: kdcab,
        toko: toko,
        id: dayjs().format("YYYYMMDDHHmmss"),
        task: "SQL",
        idtask: "3",
        taskdesc: "getdatatoko",
        timeout: 60,
        isinduk: true,
        station: "01",
        command: query,
      },
    ];
    // const payload2 = [
    //   {
    //     kdcab: kdcab,
    //     toko: toko,
    //     id: dayjs().format("YYYYMMDDHHmmss"),
    //     task: "SQL",
    //     idtask: "3",
    //     taskdesc: "getdatatoko",
    //     timeout: 60,
    //     isinduk: true,
    //     station: "01",
    //     command: `SET GLOBAL group_concat_max_len = 1000000;`,
    //   },
    // ];

    //await axios.post("http://172.24.52.10:2905/CekStore", payload2, { timeout: parseInt(20000) });

    let resp = await axios.post("http://172.24.52.10:2905/CekStore", payload, { timeout: parseInt(20000) });

    if (resp.data.code != 200) {
      throw new Error("Response Code Api != 200");
    }
    let dataRes = JSON.parse(resp.data.data);

    if (dataRes[0].msg != "success" && dataRes[0].msg != "succes") {
      throw new Error(dataRes[0].msg);
    }

    let dataReponse = JSON.parse(dataRes[0].data);

    dataReponse = JSON.parse(dataReponse[0]);

    if (dataReponse.hasOwnProperty("error") || dataReponse[0].hasOwnProperty("pesan")) {
      throw new Error("Data Error atau Pesan");
    }

    await client.set(`GETDATA-${toko}`, JSON.stringify(dataReponse), "EX", 60 * 60 * 4);
    return {
      code: 200,
      status: "Sukses",
      kdcab: kdcab,
      toko: toko,
    };
  } catch (err) {
    console.log(err);
    return {
      code: 400,
      status: "Gagal",
      kdcab: kdcab,
      toko: toko,
      err: err,
    };
  }
};

const readRespNative = async (client, kdcab, toko, queryEx) => {
  try {
    let dataReponse = "";
    let ip = await bykdtk(toko);

    if (ip === "Gagal") throw e;

    for (let i of ip.data[0].PASSWORD.split("|")) {
      dataReponse = await runQuery(ip.data[0].IP, ip.data[0].USER, i, "POS", 3306, queryEx);
      if (dataReponse.status != "NOK") {
        await client.set(`GETDATA-${toko}`, JSON.stringify(dataReponse.data), "EX", 60 * 60 * 4);
        break;
      }
    }

    return {
      code: 200,
      status: "Sukses",
      kdcab: kdcab,
      toko: toko,
    };
  } catch (err) {
    return {
      code: 400,
      status: "Gagal",
      kdcab: kdcab,
      toko: toko,
      err: err,
    };
  }
};

module.exports = {
  readRespSql,
  readRespNative,
};

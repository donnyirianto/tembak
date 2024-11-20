const axios = require("axios");
const dayjs = require("dayjs");
const { bykdtk } = require("./iptoko");
const { runQuery } = require("../services/anydb");

const readRespSql = async (client, kdcab, toko, tanggal, query) => {
  try {
    const payload = [
      {
        kdcab: kdcab,
        toko: toko,
        idreport: `strukol${toko}${tanggal}`,
        task: "SQL",
        idtask: `strukol${toko}${tanggal}`,
        taskdesc: `strukol${toko}${tanggal}`,
        timeout: 60,
        isinduk: true,
        station: "01",
        command:
          "SELECT (select toko from toko) as toko,(select nama from toko) as nama,`desc`, updtime FROM const WHERE rkey ='E02'",
      },
    ];
    let resp = await axios.post("http://172.24.52.10:2905/CekStore", payload, { timeout: parseInt(100000) });

    if (resp.data.code != 200) {
      throw new Error("Response Code Api != 200");
    }

    let dataRes = JSON.parse(resp.data.data);

    if (dataRes[0].msg.substring(0, 7) != "success" && dataRes[0].msg.substring(0, 6) != "succes") {
      throw new Error(dataRes[0].msg);
    }

    let dataReponse = [];

    if (dataRes[0].msg != "Succes SQL Native") {
      let u = JSON.parse(dataRes[0].data);
      let x = JSON.parse(u);
      dataReponse = x;
    } else {
      dataReponse = JSON.parse(dataRes.data);
    }

    if (dataReponse.hasOwnProperty("error") || dataReponse.hasOwnProperty("pesan")) {
      throw new Error("Pesan Error");
    }

    await client.set(`GETDATA-${toko}-${tanggal}`, JSON.stringify(dataReponse), { EX: 60 * 15 });
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

    if (ip === "Gagal") throw new Error("Gagal Akses Toko");

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

const readRespCmd = async (client, kdcab, toko, query) => {
  try {
    const payload = [
      {
        kdcab: kdcab,
        toko: toko,
        id: dayjs().format("YYYYMMDDHHmmss"),
        task: "COMMAND",
        idtask: "3",
        taskdesc: "cek-dt3",
        timeout: 60,
        isinduk: true,
        station: "01",
        command: query,
      },
    ];

    let resp = await axios.post("http://172.24.52.10:2905/CekStore", payload, { timeout: parseInt(20000) });

    if (resp.data.code != 200) {
      throw new Error("Response Code Api != 200");
    }
    let dataRes = JSON.parse(resp.data.data);

    if (dataRes[0].msg != "success" && dataRes[0].msg != "succes") {
      throw new Error(dataRes[0].msg);
    }

    let dataReponse = JSON.parse(dataRes[0].data);
    const hasilCmd = dataReponse[0].cmdResult;
    const pattern = /4419/;

    const kesimpulan = pattern.test(hasilCmd) ? "ADA" : "TIDAK ADA";

    const datasave = {
      kdcab: kdcab,
      toko: toko,
      kesimpulan: kesimpulan,
      detail: hasilCmd.replace(/\r\n/g, " "),
    };
    await client.set(`GETDATA-${toko}`, JSON.stringify(datasave), "EX", 60 * 60 * 4);
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
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const requestTask = async (client, token, dataPayload, urutReq) => {
  try {
    await sleep(urutReq * 1000);
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(`Urutan Request: ${urutReq} - ${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}`);

    const respTask = await axios.post("http://172.24.52.14:7321/ReportFromListener/v1/CekStore", dataPayload, {
      headers: {
        Token: `${token}`,
      },
      timeout: 300000,
    });
    const end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const selsai = dayjs().diff(start);
    console.log("request ke - ", urutReq, `Start: ${start},  end: ${end}, selesai: ${selsai}`);
    if (respTask.data.code == "200") {
      let readResponse = JSON.parse(respTask.data.data);

      for (let dataRes of readResponse) {
        if (dataRes.msg.substring(0, 6) != "Succes") {
          console.log("Msg Tidak sesuai", dataRes.msg);
          continue;
        }
        let dataReponse = [];
        if (dataRes.msg != "Succes SQL Native") {
          let u = JSON.parse(dataRes.data);
          let x = JSON.parse(u);
          dataReponse = x;
        } else {
          dataReponse = JSON.parse(dataRes.data);
        }

        if (dataReponse.hasOwnProperty("error") || dataReponse.hasOwnProperty("pesan")) {
          console.log("Error");
          continue;
        }

        await client.set(`strukol-${dataReponse[0].toko}`, JSON.stringify(dataReponse), {
          EX: 60 * 15,
        });
      }

      return {
        status: "OK",
        msg: JSON.stringify(respTask.data.msg),
      };
    }
    return {
      status: "NOK",
      msg: JSON.stringify(respTask.data),
    };
  } catch (e) {
    console.log("request ke - ", urutReq, "GAGAl", `${e.code}: ${e.errno}`);
    return {
      status: "ERROR",
      msg: `${e.code}: ${e.errno}`,
    };
  }
};

const requestTaskNew = async (client, token, dataPayload, urutReq) => {
  try {
    await sleep(urutReq * 1000);
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    console.log(`Urutan Request: ${urutReq} - ${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}`);

    const respTask = await axios.post("http://172.24.52.10:7321/ReportFromListener/v1/CekStore", dataPayload, {
      headers: {
        Token: `${token}`,
      },
      timeout: 300000,
    });
    const end = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const selsai = dayjs().diff(start);
    console.log("request ke - ", urutReq, `Start: ${start},  end: ${end}, selesai: ${selsai}`);
    if (respTask.data.code == "200") {
      let readResponse = JSON.parse(respTask.data.data);

      for (let dataRes of readResponse) {
        if (dataRes.msg.substring(0, 6) != "Succes") {
          console.log("Msg Tidak sesuai", dataRes.msg);
          continue;
        }
        let dataReponse = [];
        if (dataRes.msg != "Succes SQL Native") {
          let u = JSON.parse(dataRes.data);

          for (let detail of u) {
            try {
              let x = JSON.parse(detail);
              if (!x[0].hasOwnProperty("pesan")) {
                dataReponse.push(...x);
              }
            } catch (error) {
              console.error(`Error parsing JSON: ${error.message} value: ${detail}`);
              continue;
            }
          }
        } else {
          let u = JSON.parse(dataRes.data);
          for (let detail of u) {
            try {
              let x = JSON.parse(detail);
              if (!x[0].hasOwnProperty("pesan")) {
                dataReponse.push(...x);
              }
            } catch (error) {
              console.error(`Error parsing JSON: ${error.message}`);
              continue;
            }
          }
        }

        if (dataReponse.hasOwnProperty("error") || dataReponse.hasOwnProperty("pesan")) {
          console.log("Error");
          continue;
        }
        if (dataReponse.length > 0) {
          await client.set(`GETDATA-${dataReponse[0].toko}`, JSON.stringify(dataReponse), {
            EX: 60 * 60 * 15,
          });
        }
      }

      return {
        status: "OK",
        msg: JSON.stringify(respTask.data.msg),
      };
    }
    return {
      status: "NOK",
      msg: JSON.stringify(respTask.data),
    };
  } catch (e) {
    console.log("request ke - ", urutReq, "GAGAl", `${e}:`);
    return {
      status: "ERROR",
      msg: `${e.code}: ${e.errno}`,
    };
  }
};

const loginTask = async () => {
  try {
    const payload = {
      username: "2012073403",
      password: "N3wbi330m3D@2406",
    };

    const respTask = await axios.post("http://172.24.52.30:7321/login", payload, { timeout: 300000 });

    if (respTask.data.code != 200) throw new Error(respTask.data.msg);

    let dataResp = JSON.parse(respTask.data.data);

    return {
      status: "OK",
      data: dataResp.token,
    };
  } catch (e) {
    console.log("Gagal Login");
    return {
      status: "NOK",
      msg: e,
    };
  }
};
module.exports = {
  readRespSql,
  readRespNative,
  readRespCmd,
  requestTask,
  loginTask,
  requestTaskNew,
};

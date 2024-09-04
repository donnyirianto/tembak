const Models = require("./models/model");
const { readRespSql, requestTask, loginTask } = require("./helpers/readresp");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");

const preparePayload = async (kdcab, toko, tanggal, query) => {
  try {
    return {
      status: "sukses",
      data: {
        kdcab: kdcab,
        toko: toko,
        task: "SQL",
        idreport: `ambildatastruk-${toko}${tanggal}`,
        station: "01",
        command: query,
      },
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};

const prepareData = async (clientRedis, r) => {
  try {
    if (r.split("-")[1] == "undefined") throw new Error("Data not found");
    const data = await clientRedis.get(r);

    if (!data) throw new Error("Data not found");

    return {
      status: "Sukses",
      data: JSON.parse(data),
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};

const doitBro = async () => {
  try {
    const start = new Date();
    let token = await clientRedis.get("token-ess");
    if (!token) {
      const reqToken = await loginTask();
      console.log(reqToken);
      if (reqToken.status != "OK") throw new Error("Gagal Login ESS");

      token = reqToken.data;
      await clientRedis.set(`token-ess`, token, { EX: 60 * 50 });
    }

    console.log("Running At : " + start);

    const sudah = await clientRedis.keys("GETDATA*");

    const listToko = sudah.length > 0 ? sudah.map((r) => `'${r.split("-")[1]}${r.split("-")[2]}'`).join(",") : "";

    const results = await Models.getTokoStruk(listToko);

    console.log(`Proses Data: ${results.length}`);

    //ANCHOR ===============Query Ambil Data =========================
    for (let i = 0; i < results.length; i += 1000) {
      console.log(`[collect] run ${i}-${Math.min(i + 1000, results.length)}`);
      let allPromise = [];
      for (let j = i; j < Math.min(i + 1000, results.length); j++) {
        const promise = new Promise((res, rej) => {
          preparePayload(
            results[j].kdcab,
            results[j].toko,
            results[j].tanggal,
            `SELECT (select kirim from toko) as kdcab, (select toko from toko) as toko, '${results[j].tanggal}' as tanggal,               cast(group_concat(replace(tanggal,'-',''),'-',station,shift,'-',docno) as char) as noStruk,count(*) as jmlStruk,sum(amount)  as nilaiStruk, group_concat(replace(isi_struk,"'","") SEPARATOR '\n') as isiStruk FROM struk_online WHERE tanggal='${results[j].tanggal}' and concat(tanggal,shift,station,docno) not in(select concat(tanggal,shift,station,docno) from mtran where tanggal='${results[j].tanggal}')`
          )
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
          requestTask(clientRedis, token, dataPayload.slice(0, 100), 1),
          requestTask(clientRedis, token, dataPayload.slice(100, 200), 2),
          requestTask(clientRedis, token, dataPayload.slice(200, 300), 3),
          requestTask(clientRedis, token, dataPayload.slice(300, 400), 4),
          requestTask(clientRedis, token, dataPayload.slice(400, 500), 5),
          requestTask(clientRedis, token, dataPayload.slice(500, 600), 6),
          requestTask(clientRedis, token, dataPayload.slice(600, 700), 7),
          requestTask(clientRedis, token, dataPayload.slice(700, 800), 8),
          requestTask(clientRedis, token, dataPayload.slice(800, 900), 9),
          requestTask(clientRedis, token, dataPayload.slice(900, 1000), 10),
        ];
        await Promise.allSettled(allPromise2);
      } else {
        await requestTask(clientRedis, token, dataPayload, 1);
      }

      const dataHasil = await clientRedis.keys("GETDATA*");

      if (dataHasil.length > 0) {
        const prepare = dataHasil.map((r) => prepareData(clientRedis, r));
        const dataCacheResult = await Promise.allSettled(prepare);
        let dataResultCache = dataCacheResult.filter((r) => r.status === "fulfilled").map((r) => r.value);
        let hasil = dataResultCache.filter((r) => r.status === "Sukses").map((r) => r.data);

        const listNoStruk = hasil.filter((r) => r[0].jmlStruk == 0).flat();

        if (listNoStruk.length > 0) {
          const prepareNoStruk = listNoStruk.map(
            (r) => `('${r.kdcab}','${r.toko}','${r.tanggal}','0','0','0','','success',now())`
          );
          const queryInsertNoStruk = `insert into summary_varian_2024 (kdcab,toko,tanggal,jmlStruk,noStruk,nilaiStruk,isiStruk,statusListener,addtimeListener)
          values ${prepareNoStruk.join(",")} as new
          on duplicate key update
          jmlStruk = new.jmlStruk,
          noStruk = new.noStruk,
          nilaiStruk = new.nilaiStruk,
          isiStruk = new.isiStruk,
          statusListener = new.statusListener,
          addtimeListener = new.addtimeListener
          `;

          await Models.InsertDataStrukOl(queryInsertNoStruk);
        }

        hasil = hasil.filter((r) => r[0].jmlStruk > 0).flat();
        if (hasil.length > 0) {
          hasil = hasil.map(
            (r) =>
              `('${r.kdcab}','${r.toko}','${r.tanggal}','${r.jmlStruk}','${r.noStruk}','${r.nilaiStruk}','${r.isiStruk}','success',now())`
          );

          const queryInsert = `insert into summary_varian_2024 (kdcab,toko,tanggal,jmlStruk,noStruk,nilaiStruk,isiStruk,statusListener,addtimeListener)
                                        values ${hasil.join(",")} as new
                                        on duplicate key update
                                jmlStruk = new.jmlStruk,
                                noStruk = new.noStruk,
                                nilaiStruk = new.nilaiStruk,
                                isiStruk = new.isiStruk,
                                statusListener = new.statusListener,
                                addtimeListener = new.addtimeListener
                                `;

          await Models.InsertDataStrukOl(queryInsert);
        }
      }
      dataHasil.forEach(async (r) => {
        //let x = await clientRedis.get(r);
        //if (JSON.parse(x)[0].jmlStruk == "0") {
        await clientRedis.del(r);
        //}
      });

      console.log(`[collect] run ${i}-${Math.min(i + 100, results.length)} SELESAI`);
    }

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

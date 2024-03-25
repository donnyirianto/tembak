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

    // const sudah = await clientRedis.keys("GETDATA*");

    // const listToko = sudah.length > 0 ? sudah.map((r) => `'${r.split("-")[1]}${r.split("-")[2]}'`).join(",") : "";

    // const results = await Models.getTokoStruk(listToko);

    // console.log(`Proses Data: ${results.length}`);

    // //ANCHOR ===============Query Ambil Data =========================
    // for (let i = 0; i < results.length; i += 500) {
    //   console.log(`[collect] run ${i}-${Math.min(i + 500, results.length)}`);
    //   let allPromise = [];
    //   for (let j = i; j < Math.min(i + 500, results.length); j++) {
    //     const promise = new Promise((res, rej) => {
    //       readRespSql(
    //         clientRedis,
    //         results[j].kdcab,
    //         results[j].toko,
    //         results[j].tanggal,
    //         `
    //           SELECT
    //             (select kirim from toko) as kdcab,
    //             (select toko from toko) as toko,
    //             '${results[j].tanggal}' as tanggal,
    //           cast(group_concat(replace(tanggal,'-',''),'-',station,shift,'-',docno) as char) as noStruk,
    //           count(*) as jmlStruk,
    //           sum(amount)  as nilaiStruk,
    //           group_concat(replace(isi_struk,"'","") SEPARATOR '\n') as isiStruk
    //           FROM struk_online WHERE tanggal='${results[j].tanggal}'
    //           and concat(tanggal,shift,station,docno) not in(select concat(tanggal,shift,station,docno) from mtran where tanggal='${results[j].tanggal}')
    //         `
    //       )
    //         .then((val) => {
    //           res(val);
    //         })
    //         .catch((e) => {
    //           rej(e);
    //         });
    //     });
    //     allPromise.push(promise);
    //   }
    //   await Promise.allSettled(allPromise);
    // }

    const dataHasil = await clientRedis.keys("GETDATA*");

    // if (dataHasil.length > 0) {
    //   const prepare = dataHasil.map((r) => prepareData(clientRedis, r));
    //   const dataCacheResult = await Promise.allSettled(prepare);
    //   let dataResultCache = dataCacheResult.filter((r) => r.status === "fulfilled").map((r) => r.value);
    //   let hasil = dataResultCache.filter((r) => r.status === "Sukses").map((r) => r.data);

    //   const listNoStruk = hasil.filter((r) => r[0].jmlStruk == 0).flat();

    //   if (listNoStruk.length > 0) {
    //     const prepareNoStruk = listNoStruk.map(
    //       (r) => `('${r.kdcab}','${r.toko}','${r.tanggal}','0','0','0','','success',now())`
    //     );
    //     const queryInsertNoStruk = `insert into summary_varian_2024 (kdcab,toko,tanggal,jmlStruk,noStruk,nilaiStruk,isiStruk,statusListener,addtimeListener)
    //       values ${prepareNoStruk.join(",")} as new
    //       on duplicate key update
    //       jmlStruk = new.jmlStruk,
    //       noStruk = new.noStruk,
    //       nilaiStruk = new.nilaiStruk,
    //       isiStruk = new.isiStruk,
    //       statusListener = new.statusListener,
    //       addtimeListener = new.addtimeListener
    //       `;

    //     await Models.InsertDataStrukOl(queryInsertNoStruk);
    //   }

    //   hasil = hasil.filter((r) => r[0].jmlStruk > 1).flat();
    //   if (hasil.length > 0) {
    //     hasil = hasil.map(
    //       (r) =>
    //         `('${r.kdcab}','${r.toko}','${r.tanggal}','${r.jmlStruk}','${r.noStruk}','${r.nilaiStruk}','${r.isiStruk}','success',now())`
    //     );

    //     const queryInsert = `insert into summary_varian_2024 (kdcab,toko,tanggal,jmlStruk,noStruk,nilaiStruk,isiStruk,statusListener,addtimeListener)
    //                                     values ${hasil.join(",")} as new
    //                                     on duplicate key update
    //                             jmlStruk = new.jmlStruk,
    //                             noStruk = new.noStruk,
    //                             nilaiStruk = new.nilaiStruk,
    //                             isiStruk = new.isiStruk,
    //                             statusListener = new.statusListener,
    //                             addtimeListener = new.addtimeListener
    //                             `;

    //     await Models.InsertDataStrukOl(queryInsert);
    //   }
    // }
    dataHasil.forEach(async (r) => {
      //let x = await clientRedis.get(r);
      //if (JSON.parse(x)[0].jmlStruk == "0") {
      await clientRedis.del(r);
      //}
    });

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

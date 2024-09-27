const Models = require("./models/model");
const conn_any = require("./services/anydb");
const { readRespSql, requestTask, loginTask } = require("./helpers/readresp");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");
const dayjs =    require('dayjs');
const cron = require('node-cron');

const preparePayload = async (kdcab, toko, tanggal, nostruk) => {
  try {
    
    let datastruk = nostruk.split(",")
    
    let table = `dt_${dayjs(tanggal).format("YYMMDD")}`
    let filter = []
    for(let i of datastruk){

      let xfilter  = i.split("-")
      filter.push(`('${toko}','${xfilter[1].substring(0,2)}','${xfilter[1].substring(2,3)}','${xfilter[2]}')`)
    }

    let querycek = `select tanggal,shop as toko, shift,station,docno from ${table} where 
    (shop,station,shift,docno) in(${filter})
    `
    
    let ipserver = await Models.ipserver(kdcab)
    const rows = await conn_any.runQuery(
      ipserver[0].ipserver,
      ipserver[0].user,
      ipserver[0].pass,
      ipserver[0].database,
      ipserver[0].port,
      querycek
    );
    
    let hasil = `${kdcab}-${toko}-${tanggal}-${nostruk}-NON`
    
    if(rows.data.length > 0){
      hasil = `${kdcab}-${toko}-${tanggal}-${nostruk}-OK`
    }
    return {
      status: "sukses",
      data: hasil
    };
  } catch (error) {
    console.log(error)
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
    
    console.log("Running At : " + start);
 
    const results = await Models.cekGetTokoStruk();

    console.log(`Proses Data: ${results.length}`);
    
    //ANCHOR ===============Query Ambil Data =========================
    for (let i = 0; i < results.length; i += 10) {
      console.log(`[collect] run ${i}-${Math.min(i + 10, results.length)}`);
      let allPromise = [];
      for (let j = i; j < Math.min(i + 10, results.length); j++) {
        const promise = new Promise((res, rej) => {
          preparePayload(
            results[j].kdcab,
            results[j].toko,
            results[j].tanggal,
            results[j].nostruk,
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
      console.log(dataPayload)

      console.log(`[collect] run ${i}-${Math.min(i + 100, results.length)} SELESAI`);

    }

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

var taskLoad = true;

//cron.schedule('*/45 * * * *', async() => { 
  (async()=>{
  try {
    if (!taskLoad) {
      return;
    } 
    taskLoad = false

    console.info(`[START] Proses Struk OL:  ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`) 


    await doitBro();     
      //await prosesInsertCabang(logger,client,query);

    console.info(`[FINISH] Proses  Struk OL:  ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`) 

    taskLoad = true

  } catch (error) {
      console.error(error);
      taskLoad =true
  } 
})();

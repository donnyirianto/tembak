const Models = require('./models/model')
const {readRespSql}  = require("./helpers/readresp");
const {clientRedis} = require("./services/redis");
const Papa = require('papaparse');
const fs = require('fs');

const prepareData = async (client,r) => {
  try {
    let dataCache = await client.get(r);
    if(!dataCache) throw new Error("Data not found");
 
    return {
      status: "Sukses",
      id: r,
      data: JSON.parse(dataCache)
    };
  } catch (error) {
    logger.info(error)
    return { status: "Gagal" };
  }
};

const doitBro = async () => { 
    try{  
            
      const start = new Date();
      console.log("Running At : " + start)   

      const results = await Models.getListIpIris(); 
        
      // ANCHOR ===============Query Ambil Data ========================= 
      
      const queryCheck = ` 
      select 
      if(tanggal between '2024-02-01' and '2024-02-15','PERIODE1','PERIODE2') as periode,
      if(left(KODE_TOKO,1) = 'T','REG','FRC') as jenistoko,
      kode_cabang,
      kode_toko,
      nama_toko,
      TANGGAL,
      SALES_NET ,margin, 
      STRUK,APC,
      count(*) as hari_sales
      from summary_toko_2402 where jenis_sales = 'ALL PRODUK' and tanggal between '2024-02-01' and '2024-02-25'
      and sales_net > 0
      group by kode_cabang,kode_toko,tanggal;`;

      const getData = results.map(r => Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryCheck));
      const dataCache = await Promise.allSettled(getData);
      
      let dataResult = dataCache.filter(r => r.status === 'fulfilled').map(r => r.value);
      const dataResult_sukses = dataResult.filter(r => r.status == 'OK').map(r => r.data).flat()
      const dataResult_gagal = dataResult.filter(r => r.status != 'OK')
 
      if(dataResult_sukses.length > 0){
        const csv_sukses = Papa.unparse(dataResult_sukses,{delimiter: '|'}); 
        fs.writeFileSync('data_sukses.csv', csv_sukses);
      }
      console.log("Selesai")
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()

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

      const results = await Models.getToko(); 
        
      // ANCHOR ===============Query Ambil Data ========================= 
      
      const queryCheck = ` 
      SELECT 
      (select kirim from toko ) as kdcab,
      (select kdtk from toko ) as kdtk,
      tgl_slp,tgl_ttss,tgl_ttkd,no_ttkd,shift,no_ttss,nilai_sales,nilai_kas_toko
      FROM history_slp WHERE tgl_slp between '2024-02-01' and '2024-02-29' AND no_ttss is not null
      ORder BY tgl_slp`;

      const getData = results.map(r => readRespSql(clientRedis,r.kdcab,r.toko, queryCheck));
      const dataCache = await Promise.allSettled(getData);
      
      let dataResult = dataCache.filter(r => r.status === 'fulfilled').map(r => r.value);
      const dataResult_sukses = dataResult.filter(r => r.status == 'Sukses')
      const dataResult_gagal = dataResult.filter(r => r.status != 'Sukses')
      

      const dataHasil =  await clientRedis.keys("GETDATA*")

      if(dataHasil.length > 0){
        const prepare = dataHasil.map(r => prepareData(clientRedis,r));
        const dataCacheResult = await Promise.allSettled(prepare);
        let dataResultCache = dataCacheResult.filter(r => r.status === 'fulfilled').map(r => r.value);
        const hasil = dataResultCache.filter(r => r.status === 'Sukses').map(r => r.data)
        const csv_sukses = Papa.unparse(hasil.flat(),{delimiter: '|'}); 
        fs.writeFileSync('data_sukses.csv', csv_sukses);
      }
      dataHasil.forEach(async (r)=> {
        await clientRedis.del(r)
      })
      const csv_gagal = Papa.unparse(dataResult_gagal,{delimiter: '|'}); 
      fs.writeFileSync('data_gagal.csv', csv_gagal);
      console.log("Selesai")
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()

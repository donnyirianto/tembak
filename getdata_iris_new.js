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
      with data_sales AS (
        SELECT 
        kode_cabang,
        SUM(SALES_NET) as sales_net,
        SUM(margin) as margin, 
        sum(STRUK) as struk,
        (SUM(SALES_NET) / sum(STRUK)) as apc,
        count(*) as hari_sales,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) ='T',SALES_NET,0)) as sales_net_reg_1,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) ='T',margin,0)) as margin_reg_1, 
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) ='T',STRUK,0)) as struk_reg_1,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) ='T',1,0)) as hari_sales_reg_1,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) !='T',SALES_NET,0)) as sales_net_frc_1,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) !='T',margin,0)) as margin_frc_1, 
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) !='T',STRUK,0)) as struk_frc_1,
        SUM(if(tanggal between '2024-02-01' and '2024-02-15' and left(kode_toko,1) !='T',1,0)) as hari_sales_frc_1,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) ='T',SALES_NET,0)) as sales_net_reg_2,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) ='T',margin,0)) as margin_reg_2, 
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) ='T',STRUK,0)) as struk_reg_2,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) ='T',1,0)) as hari_sales_reg_2,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) !='T',SALES_NET,0)) as sales_net_frc_2,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) !='T',margin,0)) as margin_frc_2, 
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) !='T',STRUK,0)) as struk_frc_2,
        SUM(if(tanggal between '2024-02-16' and '2024-02-25' and left(kode_toko,1) !='T',1,0)) as hari_sales_frc_2
        FROM summary_toko_2402 
        WHERE jenis_sales = 'ALL PRODUK' 
        AND tanggal between '2024-02-01' and '2024-02-25'
        AND sales_net > 0
        GROUP BY kode_cabang
      )
      select * from data_sales;`;

      const getData = results.map(r => Models.vqueryTembakIris(clientRedis, r.kdcab, r.ipserver,r.user,r.pass,r.database, queryCheck));
      const dataCache = await Promise.allSettled(getData);
      
      let dataResult = dataCache.filter(r => r.status === 'fulfilled').map(r => r.value);
      //const dataResult_sukses = dataResult.filter(r => r.status == 'OK').map(r => r.data).flat()
      const dataResult_gagal = dataResult.filter(r => r.status != 'OK')
 
      const dataHasil =  await clientRedis.keys("GETDATAIRIS*")

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

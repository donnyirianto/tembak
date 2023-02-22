var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./modelsnew/model');
const getIP = require('./helpers/iptoko');

console.log("Service Start");

/*
Running setiap 15 menit sekali start jam 07:00 WIB
1. CREATE TABLE IF NOT EXISTS bck_reg_spdmast_221106 select * from spdmast;
2. DROP TABLE IF EXISTS act_reg_spdmast;
3. CREATE TABLE act_reg_spdmast SELECT * FROM spdmast GROUP BY prdcd;
4. UPDATE act_reg_spdmast SET supco ='G236'; => MENGIKUTI KODE CABANG MASING2
5. DELETE FROM spdmast;
6. INSERT INTO SPDMAST SELECT * FROM act_reg_spdmast;

Running jam 20:00 WIB dan jam 21:00 WIB
1. DELETE FROM spdmast;
2. INSERT INTO SPDMAST SELECT * FROM bck_reg_spdmast_221106  group by prdcd,supco
*/ 


cron.schedule('*/15 * * * *', async() => { 
//(async () => {
  try {
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("[START] Running Penyesuaian SPDMAST : " + start)     
    
    const acuan = await Models.getListIpSpdmast();
    const X = await Promise.all(
      acuan.map(async (r) => {
        let query = `
          CREATE TABLE IF NOT EXISTS bck_reg_spdmast_${dayjs().format("YYMMDD")} select * from spdmast;
          DROP TABLE IF EXISTS act_reg_spdmast;
          CREATE TABLE act_reg_spdmast SELECT * FROM spdmast GROUP BY prdcd;
          UPDATE act_reg_spdmast SET supco ='${r.kdcab}';
          DELETE FROM spdmast;
          INSERT INTO SPDMAST SELECT * FROM act_reg_spdmast;
          `
          
        const rIP = await getIP.bykdtk(r.kdcab, r.toko);


        if (rIP.msg !== "Sukses") {
          return `${r.kdcab}|${r.toko}|API Gagal`;
        }

        if (rIP.data.length < 1){
          return `${r.kdcab}|${r.toko}|${dayjs().format("YYYY-MM-DD HH:mm:ss")}|IP Tidak Terdaftar`;
        }
        
        const tembak = await Models.vquerySpdmast(rIP.data[0].IP, query);
        return `${r.kdcab}|${r.toko}|${rIP.data[0].IP}|${dayjs().format("YYYY-MM-DD HH:mm:ss")}|${tembak}`;
        
      })
    );
    X.forEach((e) => {
      console.log(e);
    });
    console.info(
      `[FINISH] Penyesuaian SPDMAST ke Toko: ${dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      )}`
    ); 
  } catch (e) {
    console.log(e)
  }
}); 


cron.schedule('00 20,21 * * * *', async() => { 
//(async () => {  
  try {
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    const tanggal = dayjs().format("YYYY-MM-DD")
    const jam = dayjs().format("HH")

    console.log("[START] Running Penyesuaian Kembali SPDMAST : " + start)     
    
    const acuan = await Models.getListIpSpdmast();
    const X = await Promise.all(
      acuan.map(async (r) => {
        let query = `
        DELETE FROM SPDMAST;
        INSERT INTO SPDMAST SELECT * FROM bck_reg_spdmast_${dayjs().format("YYMMDD")} group by prdcd,supco;
        `
          
        const rIP = await getIP.bykdtk(r.kdcab, r.toko);


        if (rIP.msg !== "Sukses") {
          return `${r.kdcab}|${r.toko}|API Gagal`;
        }

        if (rIP.data.length < 1){
          return `${r.kdcab}|${r.toko}|${dayjs().format("YYYY-MM-DD HH:mm:ss")}|IP Tidak Terdaftar`;
        }
        
        const tembak = await Models.vquerySpdmast(rIP.data[0].IP, query);
        return `${r.kdcab}|${r.toko}|${rIP.data[0].IP}|${dayjs().format("YYYY-MM-DD HH:mm:ss")}|${tembak}`;
        
      })
    );
    X.forEach((e) => {
      console.log(e);
    });
    console.info(
      `[FINISH] Penyesuaian Kembali SPDMAST ke Toko: ${dayjs().format(
        "YYYY-MM-DD HH:mm:ss"
      )}`
    ); 
  } catch (e) {
    console.log(e)
  }
});

const Models = require("./models/model");
process.setMaxListeners(0);
const cron = require("node-cron");

const doitBro = async () => {
  try {
    const start = new Date();
    console.log("Running At : " + start);

    const kodecabang = `'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G177','G301','G305','G232','G224'`;
    const results = await Models.getListIpInitial(kodecabang);

    results.forEach(async (r) => {
      const queryTembak = `SELECT  
          (select kirim from toko) as kdcab, 
          (select toko from toko) as kdtk, 
          (select nama from toko) as nama_toko,
          cast(ifnull(A.TANGGAL,'2025-01-01') as char) as TANGGAL,A.STATION, A.SHIFT,A.NIK,A.KASIR_NAME,A.TRN_START, A.TOTAL_SHIFT, B.STRUK_AWAL,B.TOTAL 
          from 
          (
            select TANGGAL,STATION,SHIFT,NIK,KASIR_NAME,min(TRN_START) as TRN_START,count(*) as TOTAL_SHIFT
            FROM INITIAL WHERE TANGGAL=CURDATE() 
            and recid = '' 
            AND STATION<>'I1' 
            and trn_start>='04:00' 
            order by trn_start asc limit 1
          ) A
          left join 
          (select TANGGAL,SHIFT,STATION, min(jam) AS STRUK_AWAL,count(*) AS TOTAL FROM MTRAN WHERE TANGGAL=CURDATE() GROUP BY STATION,SHIFT) B
          ON CONCAT(A.STATION,A.SHIFT) = CONCAT(B.STATION, B.SHIFT);
          `;

      const rv = await Models.vquery(r.IP_INDUK, queryTembak);
      if (rv.status === "NOK" || rv === "Gagal") {
        await Models.UpdateDataInitial(r.KDCAB, r.TOKO, r.NAMA);
        console.log(r.TOKO + "|" + r.KDCAB + "|Gagal", rv);
      } else {
        const insertData = await Models.insertDataInitial(rv.data);
        console.log(r.TOKO + "|" + r.KDCAB + "|" + insertData);
      }
    });
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

console.log(`Start Cek initial`);

cron.schedule("*/2 * * * *", async () => {
  doitBro();
});

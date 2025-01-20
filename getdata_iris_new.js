const Models = require("./models/model");
require("./helpers/readresp");
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
    // const dataHasil_awal = await clientRedis.keys("GETDATAIRIS*");
    // dataHasil_awal.forEach(async (r) => {
    //   await clientRedis.del(r);
    // });

    const results = await Models.getListIpIris();
    //===============Query Ambil Data =========================

    const queryCheck = `
WITH sales AS (
select shop, count(distinct shop) as jml_toko,
sum(gross) as gross, sum(ppn) as ppn, 
count(distinct shop,tanggal,shift,station,docno) as struk
from dt_250102
where 
ABS(round(ppn,1) - round((gross*0.11/1.11),1)) > 10
and ppn > 0
and (round(ppn,1)  > round((gross*0.11/1.11),1))
AND bkp = 'T' AND sub_bkp = 'Y'
and rate_ppn > 10
group by shop
),
bpb_idm AS (
select 
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('B')
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and (supco = '' or supco is null)
and ppn > 0
and istype<>'L' 
and left(toko,1)='G'
and left(toko,2)<>'GI'
group by shop
),
bpb_igr AS(
select 
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('B')
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and (supco = '' or supco is null)
and ppn > 0
and istype<>'L'
and left(toko,2) = 'GI'
group by shop
),
bpb_bkl_supp AS (
select
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('B')
and ppn > 0
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and istype='L' and left(toko,1)='S'
group by shop
),
retur_idm AS (
select 
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('K')
and ppn > 0
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and (supco = '' or supco is null)
and istype<>'L' 
and left(toko,1)='G'
and left(toko,2)<>'GI'
group by shop
),
retur_igr AS(
select 
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('K')
and ppn > 0
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and (supco = '' or supco is null)
and istype<>'L'
and left(toko,2) = 'GI'
group by shop
),
retur_bkl_supp AS (
select
shop,
count(distinct shop) as jml_toko,
count(distinct bukti_no) as jml_docno,
sum(ppn) as nilai_ppn
from wt_250102
where rtype in('K')
and ppn > 0
and abs(round(ppn,1) - round((gross * 11 / 100),1)) > 10
and istype='L' and left(toko,1)='S'
group by shop
)
select 
(select kode_cabang from m_branch) as kdcab,
a.toko as toko,a.nama as nama_toko,
'2025-01-02' as tanggal,
x.jml_toko,x.gross,x.ppn,x.struk,
b.jml_toko as bpb_jml_toko_idm,
b.jml_docno as bpb_jml_docno_idm,
b.nilai_ppn as bpb_nilai_ppn_idm,
c.jml_toko as bpb_jml_toko_igr,
c.jml_docno as bpb_jml_docno_igr,
c.nilai_ppn as bpb_nilai_ppn_igr,
d.jml_toko as bpb_jml_toko_supp,
d.jml_docno as bpb_jml_docno_supp,
d.nilai_ppn as bpb_nilai_ppn_supp,
e.jml_toko as retur_jml_toko_idm,
e.jml_docno as retur_jml_docno_idm,
e.nilai_ppn as retur_nilai_ppn_idm,
f.jml_toko as retur_jml_toko_igr,
f.jml_docno as retur_jml_docno_igr,
f.nilai_ppn as retur_nilai_ppn_igr,
g.jml_toko as retur_jml_toko_supp,
g.jml_docno as retur_jml_docno_supp,
g.nilai_ppn as retur_nilai_ppn_supp
from m_toko a
left join sales x on a.toko = x.shop
left join bpb_idm b on a.toko =b.shop
left join bpb_igr c on a.toko=c.shop
left join bpb_bkl_supp d on a.toko=d.shop
left join retur_idm e on a.toko=e.shop
left join retur_igr f on a.toko=f.shop
left join retur_bkl_supp g on a.toko=g.shop
where 
b.jml_toko>0
OR x.jml_toko>0
OR c.jml_toko>0
OR d.jml_toko>0
OR e.jml_toko>0
OR f.jml_toko>0
OR g.jml_toko>0;`;

    const getData = results.map((r) =>
      Models.vqueryTembakIris(clientRedis, r.kdcab, r.ipserver, r.user, r.pass, r.database, queryCheck)
    );
    await Promise.allSettled(getData);

    const dataHasil = await clientRedis.keys("GETDATAIRIS*");

    if (dataHasil.length > 0) {
      const prepare = dataHasil.map((r) => prepareData(clientRedis, r));
      const dataCacheResult = await Promise.allSettled(prepare);
      let dataResultCache = dataCacheResult.filter((r) => r.status === "fulfilled").map((r) => r.value);
      const hasil = dataResultCache.filter((r) => r.status === "Sukses").map((r) => r.data);
      const csv_sukses = Papa.unparse(hasil.flat(), { delimiter: "|" });
      fs.writeFileSync("data_sukses.csv", csv_sukses);
    }

    dataHasil.forEach(async () => {
      //await clientRedis.del(r);
    });

    //const csv_gagal = Papa.unparse(dataResult_gagal, { delimiter: "|" });
    //fs.writeFileSync("data_gagal.csv", csv_gagal);

    console.log("Selesai");
  } catch (err) {
    console.log("Sini Ketnya : " + err);
    return true;
  }
};

doitBro();

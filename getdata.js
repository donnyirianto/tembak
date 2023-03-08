const dayjs = require('dayjs');
const conn_ho = require('./services/dbho');
const getDataToko = require('./helpers/getDataToko');
const path = require('path');
const file_sukses = path.basename('/home/donny/project/tembak/res_hasil.txt');
const file_gagal = path.basename('/home/donny/project/tembak/res_gagal.txt');

const runGetData = async () => {
  try {    
    console.info(`[Get Data] - Start :: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`)

    const acuan_toko =`select a.kdcab, toko, nama
    from m_toko_ip a
    WHERE LEFT (TOKO,1) NOT IN('D','G','W','B','R')
    and ip_induk not like '%192.168%'
    and nama not like '%event%'
    and nama not like '%mobile%'
    and kdcab in('G097')
    limit 100
    `
    let querySelect =`
      select 
      (select kirim from toko) as kdcab,
      (select toko from toko) as toko,
      (select nama from toko) as nama,
      (select filter from vir_bacaprod where jenis='tkx_ws') as tkx_ws;
      ` 
    const list = await conn_ho.query(acuan_toko); 
    
    await getDataToko.cekDataToko(list,querySelect,file_sukses,file_gagal)

    console.info(`[Get Data] - Finish :: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}`)
    
    return

  }catch(err){
    console.warn("Error: " + err) 
    return
  }  
}   
runGetData()
  
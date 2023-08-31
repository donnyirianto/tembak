var cron = require('node-cron');
const dayjs = require('dayjs');
const Models = require('./models/model') 
const axios = require('axios');
console.log("Service Start")    

const requestTask = async (param)=>{
  try {
    
        //172.24.52.14
        console.log(param)
          const respTask = await axios.post("http://192.168.131.61:2905/CekStore",param)

          if(respTask.data.code == 200 ){
            console.log(JSON.stringify(respTask.data.data))
            return {
              status: "OK", 
              data : respTask.data.data
            } 
          }

          return {
              status: "NOK",  
          } 

  } catch (e) { 
      console.log(e)
      return {
        status: "NOK",  
        msg : e
      }
  }
}

const cekToko = async () => {
  try {    
    
    const start = dayjs().format("YYYY-MM-DD HH:mm:ss");
    
    console.log("Running Check Toko : " + start)    
    
    const list = await Models.getListRRAK();
    
    var queryCheck =`select *, if(rprenc > 0 and fvalid_true > 0, 'Sudah Input Sudah Validasi', if(rprenc > 0 and fvalid_true = 0, 'Sudah Input Belum Validasi','Belum Input RRAK') ) as keterangan from ( select (select kirim from toko) as kdcab, (select toko from toko) as toko, count(*) rec, SUM(qtyrenc) qtyrenc, SUM(rprenc) rprenc, SUM(rpreal) rpreal, sum(if(fvalid='true',1,0)) fvalid_true, sum(if(fvalid='false',1,0)) fvalid_false, sum(if(ftrf='true',1,0)) ftrf_true, sum(if(ftrf='false',1,0)) ftrf_false, date_format(tglbuat,'%Y-%m-%d %H-%i-%s') tglbuat from rrak_rrak where periode='202307' ) a` 

    let allPromise = [];
    for(let r of list){
      
      const promise = new Promise(async (res, rej) => {
          requestTask( [{
            toko: r.toko,
            id: "2023060615184",
            task: "SQL",
            idtask : "3",
            taskdesc: "Cek Data RRAK",
            timeout: 5,
            isinduk: true,
            station: "01",
            command: queryCheck
        }])
          .then((val) => { res(val)})
          .catch((e) => { rej(e) })
      });
      allPromise.push(promise);
    }

    await Promise.allSettled(allPromise);
    //     actTask = actTask.filter(e=> e.status ==="fulfilled")
    //     actTask = actTask.map(r => r.value)
    // let actTask_NOK = actTask.filter((r) => r.status == "NOK")
    // let actTask_OK = actTask.filter((r) => r.status == "OK") 
    //actTask_OK.forEach( (e) => {console.log(e)})
    console.log("SElesai")
    return "OK"

  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }  
}  
  
//cron.schedule('*/1 * * * *', async() => { 
(async() => { 
  try {
    
    await cekToko()

  } catch (e) {
    console.log(e)
  }
})();
 
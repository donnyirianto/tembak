
const fs = require('fs');
const Ip = require('./iptoko');
const conn = require('../services/anydb');

const getData = async(r,querySelect)=>{
    try {
      let res = []
      const dataip =  await Ip.bykdtk(r.kdcab,r.toko);
      
      if(dataip != "Gagal" && dataip.data.length > 0){
        
        for(let i of dataip.data[0].PASSWORD.split("|")){
          res = await conn.runQuery(dataip.data[0].IP,dataip.data[0].USER,i,"pos", 3306, querySelect)
          if(res.status === "OK"){
            console.log(`${r.kdcab}|${r.toko}|OK`)
            break;
          }
        }
  
        return {
          kdcab:dataip.data[0].KDCAB,
          toko:dataip.data[0].TOKO,
          nama:dataip.data[0].NAMA,
          statusGetData: res.status,
          data : res.data
        }
  
      }else{
        return {
          kdcab:dataip.data[0].KDCAB,
          toko:dataip.data[0].TOKO,
          nama:dataip.data[0].NAMA,
          statusGetData: `IP Tidak terdaftar`,
        }
      } 
    } catch (e) {      
      return {
        status: "NOK",
        kdcab:r.kdcab,
        toko:r.toko,
        nama:r.NAMA,
        statusGetData: `Error: ${e}`,
      }
    }
  }
const deleteFile = (filePath) => { 
fs.unlink(filePath, (error) => {
    if (!error) {
        return "Sukses Hapus"
    } else {
    return "Gagal Hapus"
    }
})
};
const cekDataToko = async(list,querySelect,file_sukses,file_gagal)=>{
    try {
        deleteFile(file_sukses);
        deleteFile(file_gagal);

        const allPromise = [];
        for(let r of list){   
          const promise = new Promise(async (res, rej) => {
              getData(r,querySelect) 
              .then((val) => { res(val)})
              .catch((e) => { rej(e) })
          });
          allPromise.push(promise);
        }

        let res = await Promise.allSettled(allPromise);
            res = res.filter(e=> e.status ==="fulfilled")

        let res_sukses = res.filter(e=> e.value.statusGetData ==="OK")
        res_sukses = res_sukses.map(r=> r.value.data)

        let res_gagal = res.filter(e=> e.value.statusGetData !="OK")
            res_gagal = res_gagal.map(r=> r.value)
             
        const fileReport = fs.createWriteStream(file_sukses);
        const fileReport2 = fs.createWriteStream(file_gagal);
        
        fileReport.once('open', async function(fd) { 
        fs.appendFile(file_sukses,"let Donny = [", errx => {
            if (errx) {
            console.log("error Tulis File")
            return true
            } 
            return true
        })
        const a = JSON.stringify(res_sukses).replace(/[\]\[]/g,"")
        const b = a.replace(/}{/g,"},{")
        fs.appendFile(file_sukses, b +"]", e => {})
        })

        fileReport2.once('open', async function(fd) { 
        fs.appendFile(file_gagal,"let Donny = [", errx => {
            if (errx) {
            console.log("error Tulis File")
            return true
            } 
            return true
        })
        const a = JSON.stringify(res_gagal).replace(/[\]\[]/g,"")
        const b = a.replace(/}{/g,"},{")
        fs.appendFile(file_gagal, b +"]", e => {})
        })
        return 
    } catch (e) {
        console.log(`Error Tulis File ${e}`)
        return 
    }
}

module.exports= {
    cekDataToko
  }
const { Console } = require('console');
const fs = require('fs');
const Models = require('./modelsnew/model')


process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
} 

const deleteFile = (filePath) => {
  // Unlink the file.
  fs.unlink(filePath, (error) => {
    if (!error) {
       return "Sukses Hapus"
    } else {
      return "Gagal Hapus"
    }
  })
};

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)   
      while(true){         
          (async ()=>{
              try{  
                deleteFile('./data.txt');    
                const fileReport = fs.createWriteStream("data.txt");   
                fileReport.once('open', async function(fd) { 
                  fs.appendFile('data.txt',"let Donny = [", errx => {
                    if (errx) {
                      console.log("error Tulis File")
                      return true
                    } 
                  })     
                  const results = await Models.getListIp();

                  /* UPDATE PRODMAST a, donny_bck_prod b set  a.PRICE = b.price 
                  where a.prdcd = b.prdcd and a.prdcd = '${r.prdcd}';
                  */
                  results.forEach( async (r) => {  

                  const queryTembakx= `
                  update prodmast set price = '14400'where prdcd = '10004037';
                  update prodmast set price = '7000'where prdcd = '10004039';
                  update prodmast set price = '6000'where prdcd = '10004372';
                  update prodmast set price = '15500'where prdcd = '10005643';
                  update prodmast set price = '17400'where prdcd = '10006194';
                  update prodmast set price = '17400'where prdcd = '10006195';
                  update prodmast set price = '20400'where prdcd = '10008867';
                  update prodmast set price = '11900'where prdcd = '10010255';
                  update prodmast set price = '12400'where prdcd = '10010256';
                  update prodmast set price = '17400'where prdcd = '10018154';
                  update prodmast set price = '7000'where prdcd = '10032089';
                  update prodmast set price = '16900'where prdcd = '20003591';
                  update prodmast set price = '17400'where prdcd = '20014916';
                  update prodmast set price = '14400'where prdcd = '20025041';
                  update prodmast set price = '17400'where prdcd = '20031087';
                  update prodmast set price = '6000'where prdcd = '20035999';
                  update prodmast set price = '15900'where prdcd = '20037475';
                  update prodmast set price = '6000'where prdcd = '20046106';
                  update prodmast set price = '6000'where prdcd = '20052495';
                  update prodmast set price = '20400'where prdcd = '20055855';
                  update prodmast set price = '6000'where prdcd = '20062099';
                  update prodmast set price = '11900'where prdcd = '20072596';
                  update prodmast set price = '10000'where prdcd = '20080782';
                  update prodmast set price = '15500'where prdcd = '20108264';

                  `
                  
                  const rv = await Models.vqueryTembak(r.ip1, queryTembakx)

                    //const rv= await Models.vqueryTembak(r.ip1, `SET GLOBAL max_allowed_packet=1073741824;`)
                   if(rv === "Gagal"){
                      console.log(r.kdtk +'|'+ r.kdcab +'|Gagal') 
                    }else{                       
                        console.log(r.kdtk +'|'+ r.kdcab +'| Sukses|')
                    }
                    
                  }) 
                })
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(3600000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()
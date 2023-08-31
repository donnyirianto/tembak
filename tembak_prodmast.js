const fs = require('fs');
const Models = require('./models/model');

const cron = require('node-cron')

var taskdoit = true;

const doitBro = async () => {
    try {    
      const start = new Date();
      console.log("Running At : " + start)    
        const results = await Models.getListIp();

        results.forEach( async (r) => {  
          const querycheck =`
          select 
          (select period1 from const where rkey='tmt') as tmt,
          (select count(*) from prodmast where ctgr='99') as non_kateg,
          (select count(*) from prodmast a where ctgr='99' and prdcd in(select prdcd from stmast where qty > 0) ) as non_kateg`
        const cek  = await Models.vquery(r.ip1, querycheck)
        if(cek.status !="NOK"){
          //console.log(cek.data)
          //
          if(cek.data[0].tmt=== '2023-05-12' &&  cek.data[0].non_kateg > 500){

            const queryTembakx= ` 
            create table if not exists bck_prodmast_reg4_230512 select * from prodmast;
            UPDATE PRODMAST A,PRODMAST_REG B SET A.RECID=B.RECID, A.CTGR = B.CTGR WHERE A.PRDCD = B.PRDCD AND A.RECID='1';
            UPDATE PRODMAST A,PRODMAST_REG B SET A.RECID=B.RECID, A.CTGR = B.CTGR WHERE A.PRDCD = B.PRDCD AND A.CTGR='99';
            DELETE FROM NRAKKTGR WHERE DATE(ADDTIME)=CURDATE();
            DELETE FROM PTAG_NR WHERE DATE(ADDTIME)=CURDATE();
            update promo_matriks a, trpr_promo b set a.itemsyarat = b.itemsyarat where a.kodepromo = b.kodepromo;            
            update promo_matriks a set itemsyarat = replace(itemsyarat,'&-PLU=','!');
            update promo_matriks a set itemsyarat = replace(itemsyarat,'!PLU=','!');
            update promo_matriks a set itemsyarat = replace(itemsyarat,'&PLU=','!');
            update promo_matriks set itemsyarat = mid(itemsyarat,2,100000) where left(itemsyarat,1) = '!';
            update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-01' and program='POS.NET-POS.IDM';
            update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-02' and program='POS.NET-POS.IDM';
            update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-03' and program='POS.NET-POS.IDM';
            update program_setting set  nilai=DATE_FORMAT(NOW(),'%d-%m-%Y %H:%i:%s')  where jenis like 'LastUpdateProdmast-04' and program='POS.NET-POS.IDM';
            `
            
            const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
    
              if(rv.status =="NOK"){
                console.log(r.kdtk +'|'+ r.kdcab +'|Gagal|'+ r.ip1) 
              }else{                       
                  console.log(r.kdtk +'|'+ r.kdcab +'|Sukses Update|' + r.ip1)
              }
            
          }else{                       
            console.log(r.kdtk +'|'+ r.kdcab +'|Toko Belum Update|' + r.ip1)
          }
        }else{                       
          console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|' + r.ip1)
        }
          
      }) 
        
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }

          
}
cron.schedule('*/5 * * * *', async() => { 
  if (taskdoit ) {
    try{ 
      taskdoit = false
        await doitBro()
       taskdoit = true

    } catch (err) {
            console.log("[END] ERROR !!! Proses Penyesuaian Toko:: " + dayjs().format("YYYY-MM-DD HH:mm:ss") )
            taskdoit = true
          
            console.log(err);
    }
  }

});



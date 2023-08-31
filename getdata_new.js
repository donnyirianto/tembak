const Models = require('./models/model')

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
    try{  
            
      const start = new Date();
      console.log("Running At : " + start)   

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
        
        results.forEach( async (r) => { 
          
          // ANCHOR ===============Query Ambil Data ========================= 
         //update pos.toko SET peduli='Y',peduli1='2023-07-01',peduli2='2023-10-31';
          const queryTembak = ` 
          select  
          (select kirim from toko) as kdcab,
          (select toko from toko) as toko,
          ifnull(count(*),0) as ada table
          from 
          information_schema.tables
          where table_name = 'pos2_backup_rak_20230725'`;
          
          const rv = await Models.vquery(r.ip1, queryTembak)
          let ket  = ""
          if(rv.status === "NOK"){
            console.log(r.kdtk +'|'+ r.kdcab +'|gagal') 
          }else{
            
            const a = JSON.stringify(rv.data).replace(/[\]\[]/g,"") 
            //const c = a.replace(/[}{]/g,"")
             ket = rv.data.length > 0 ? `Ada Data` : `Tidak ada Data`


            fs.appendFile('data.txt',a, errx => {
              if (errx) {
                console.log(r.kdtk +'|'+ r.kdcab +'|gagal|'+ket)
                return true
              }else{
                console.log(r.kdtk +'|'+ r.kdcab +'|sukses|'+ket)
                return true
              }
              
            })
          }
          
        })
      })
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()


/*
select
          (select kirim from toko) as kdcab,
          (select toko from toko) as toko,
          a.tanggal,
          a.total_item as total_item_29,
          a.recid_1 as recid_1_29,
          a.ctgr_99 as ctgr_99_29,
          a.aktif as aktif_29,
          b.total_item as total_item_28,
          b.recid_1 as recid_1_28,
          b.ctgr_99 as ctgr_99_28,
          b.aktif as aktif_28,
          (a.total_item - b.total_item) as selisih_total_item,
          (a.recid_1 - b.recid_1) as selisih_recid_1,
          (a.ctgr_99 - b.ctgr_99) as selisih_ctgr_99,
          (a.aktif - b.aktif) as selisih_aktif
          from 
          (select
          '2023-06-29' as tanggal,
          count(*) total_item,
          sum(if(recid='1',1,0)) recid_1,
          sum(if(ctgr !='99',1,0)) ctgr_99,
          sum(if(recid='' and ctgr='xx',1,0)) aktif
          from prodmast where merk = 'Y/CHOICE') a
          left join 
          (select
          '2023-06-29' as tanggal,
          count(*) total_item,
          sum(if(recid='1',1,0)) recid_1,
          sum(if(ctgr !='99',1,0)) ctgr_99,
          sum(if(recid='' and ctgr='xx',1,0)) aktif
          from prodmast_reg where merk = 'Y/CHOICE'
          ) b on a.tanggal=b.tanggal
          */
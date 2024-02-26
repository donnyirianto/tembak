const fs = require('fs'); 
const Models = require('./models/model')


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
         
          // const queryTembak = ` 
          // (select cast(concat(ptag,'|',flagprod) as char) from prodmast where prdcd = '20128415') as prodmast,
          //(select cast(concat(docno,'|',qty,'|',addid)as char) as npb_d from npb_d where prdcd = '20128415' and recid = '*' limit 1) as npb_d,
          //(select cast(concat(qty,'|',qtym1,'|',npb_out,'|',tgl_pb,'|',docno,'|',pkm_akh,'|',minor,'|',addid)as char) as pb from his_pbdc where prdcd = '20128415' order by tgl_pb desc limit 1) as pb
          // ;
          // `
          const queryTembak = `select 
          (select kirim from toko) as kdcab,
          (select toko from toko) as toko,
          (select nama from toko) as nama,
          (select count(*) from initial where tanggal=curdate() and recid = '' and station !='|1') as total_initial,
          (select \`desc\` from dbl.const where rkey='TG1') as const;
          `

          const rv = await Models.vquery(r.ip1, queryTembak)
          let ket  = ""
          if(rv.status === "NOK"){
            console.log(r.kdtk +'|'+ r.kdcab +'|gagal') 
          }else{
            // console.log("sukses")
            // await Models.insertHasilFT(rv.data) 
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
Cek Spek
select
        (select kirim from toko) as kdcab,
        (select toko from toko) as toko,
        (select nama from toko) as nama,
        (select deskripsi from spec_hardware where station=1 and tag = 'RAM_CUR') as ram_1,
        (select deskripsi from spec_hardware where station=1 and tag = 'Windows Bios Type') bios_1

        //           (select tgl from tracelog where date(tgl) = curdate() and log ='proses tutup shift : akan menutup shift 2' order by tgl desc limit 1) as start_initial,
// (select tgl from tracelog where date(tgl) = curdate() and log ='POS2 BtShift : berhasil menutup shift - msgbox sudah terpanggil' order by tgl desc limit 1) as end_initial
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('CPU_PROC') AND station in('01',1)) as CPU_PROC,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('OS_NAME') AND station in('01',1)) as OS_NAME,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('RAM_CUR') AND station in('01',1)) as RAM_CUR,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('LOAD_POSMAIN') AND station in('01',1)) as LOAD_POSMAIN,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('CETAK_STRUK_KASIR') AND station in('01',1)) as CETAK_STRUK_KASIR,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('LAST BOOTING') AND station in('01',1)) as LAST_BOOTING,
          // (SELECT deskripsi FROM spec_hardware WHERE tag in('Windows Bios Type') AND station in('01',1)) as Windows_Bios_Type;`
          // //(SELECT cast(concat(waktureport,'|',keterangan) as char) FROM log_monitor where jenis=7 and date(waktureport) = curdate() order by waktureport desc limit 1) as log_monitor,
          //(select \`log\` from tracelog where date(tgl) = curdate() and appname rlike 'POSIDM' and log RLIKE "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'PLU=" limit 1) as tracelog;
*/
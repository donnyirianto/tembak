const fs = require('fs').promises; 
const Models = require('./models/model');
const dayjs = require('dayjs'); 
const { Parser } = require('json2csv');

async function createFolderIfNotExists(folderPath) {
  try {
    await fs.access(folderPath); 
  } catch (error) {
    if (error.code === 'ENOENT') {
      try {
        await fs.mkdir(folderPath, { recursive: true });
      } catch (mkdirError) {
      }
    }
  }
}

const prosesFile = async(r)=>{
  try {
          console.time(`NTB-${r.kdcab}`)
          // ANCHOR ===============Query Ambil Data ========================= 
          for(let i = 16; i<=30; i++ ){
            let x = i
            if(i < 10){
                x = `0${i}`
            }
            let output= `./filentb/${r.kdcab}/${x}`
            await createFolderIfNotExists(output);

            let tanggal = `2023-08-${x}`
            let acuan_double = `identik_perdocno_230831`
            // let table_dt = `dt_2308${x}`
            // let table_bayar = `byr_2308${x}`
            // let table_spr = `spr2308`
            let table_ntb = `ntb_2308${x}`

            const query_select = `select 
            a.STATION,a.NO_STRUK,a.TOKO,DATE_FORMAT(STR_TO_DATE(a.TANGGAL, '%Y-%m-%d'), '%d-%m-%Y') as TANGGAL,a.KD_PROMO,a.\`GROUP\`,a.NOURUT,a.JNS_NTAMBAH,a.PLU_NTAMBAH,a.QTY_NTAMBAH,a.RP_NTAMBAH,a.SHIFT
            from ${table_ntb} a
            right join identik_perdocno_230831 b on a.tanggal = DATE_FORMAT(STR_TO_DATE(b.tanggal, '%d-%m-%Y'), '%Y-%m-%d') and a.toko  = b.shop and a.station = b.station and a.shift = b.shift and a.no_struk = b.docno_double
            where a.station is not null;`;
 
            const rv = await Models.queryIris(r.ipserver,r.user,r.pass,r.database, query_select)
            
            if(rv.status === "NOK"){
              console.log(`${r.kdcab}|${tanggal}|GAGAL`)
              throw e              
            }else{ 
              let groupsAll = [];
              rv.data.reduce((groups, item) => {
                const groupKey = `${item.TOKO}|${item.TANGGAL}`;
                if (!groupsAll.find(o => o === groupKey)) {
                  groupsAll.push(groupKey);
                }
                
                return groupsAll;
              }, {});

              for(let ex of groupsAll){ 
                let dataExport = rv.data.filter((r)=> r.TOKO === ex.split("|")[0] && r.TANGGAL===ex.split("|")[1])
                const json2csvParser = new Parser({ delimiter: '|', quote: '',eol:'\r\n' });
                const csv = json2csvParser.parse(dataExport);
                fs.writeFile(`${output}/NTB_Double_${ex.split("|")[0]}.csv`, csv);
              }
            }
          }
          console.timeEnd(`NTB-${r.kdcab}`)
  } catch (e) {
     return e
  }
}

(async () => { 
    try{  

        console.log("Start Running : " + dayjs().format("YYYY-MM-DD HH:mm:ss"))
        console.time('TotalWaktuProses');
        const results = await Models.getServerIris();
        
        const promise = results.map((r)=>{ 
            return prosesFile(r)
        })

        const actProses = await Promise.allSettled(promise); 

        console.timeEnd('TotalWaktuProses');
        console.log("Finish Running : " + dayjs().format("YYYY-MM-DD HH:mm:ss"))
      
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
})();
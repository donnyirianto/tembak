const fs = require('fs'); 
const Models = require('./models/model');
const dayjs = require('dayjs');


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

        const results = await Models.getServerIris();
        
        results.forEach( async (r) => { 
          await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, `drop table identik_plu_230831;`)
          // ANCHOR ===============Query Ambil Data ========================= 
          for(let i = 16; i<=30; i++ ){
            let x = i
            if(i < 10){
                x = `0${i}`
            }
            let tanggal = `2023-08-${x}`
            let summary = `identik_plu_230831`
            let table_dt = `dt_2308${x}`
            let table_byr = `byr_2308${x}`

            const queryTembak = `
            create table if not exists ${summary}(
cabang varchar(25),
SHOP varchar(4),
Nama varchar(100),
TANGGAL varchar(15),
Docno_Double varchar(20),
Docno_before varchar(20),
Jam_Double varchar(100),
Jam_before varchar(100),
STATION varchar(2),
SHIFT varchar(2),
SEQNO varchar(20),
PRDCD varchar(15),
Singkatan varchar(100),
QTY varchar(100),
PRICE varchar(100),
GROSS varchar(100),
PPN varchar(100),
HPP varchar(100),
BKP varchar(100),
SUB_BKP varchar(100),
B_noacc text,
B_CSH varchar(100),
B_P01 varchar(100),
B_P02 varchar(100),
B_CCR varchar(100),
B_DEB varchar(100),
B_GRB varchar(100),
B_ISC varchar(100),
B_IST varchar(100),
B_KBI varchar(100),
B_KPN varchar(100),
B_RRA varchar(100),
B_SPC varchar(100),
B_TCH varchar(100),
B_VBE varchar(100),
C_noacc text,
C_CSH varchar(100),
C_P01 varchar(100),
C_P02 varchar(100),
C_CCR varchar(100),
C_DEB varchar(100),
C_GRB varchar(100),
C_ISC varchar(100),
C_IST varchar(100),
C_KBI varchar(100),
C_KPN varchar(100),
C_RRA varchar(100),
C_SPC varchar(100),
C_TCH varchar(100),
C_VBE varchar(100),
primary key (cabang,shop,tanggal,shift,station,docno_double,seqno,PRDCD)
)
engine=InnoDB                
                `;
            await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembak);
            
            let query_select=`
            SET SESSION group_concat_max_len=4294967295;
            replace into ${summary} 
            SELECT a.*,B_noacc,B_CSH,B_P01,B_P02,B_CCR,B_DEB,B_GRB,B_ISC,B_IST,B_KBI,B_KPN,B_RRA,B_SPC,B_TCH,B_VBE
,C_noacc,C_CSH,C_P01,C_P02,C_CCR,C_DEB,C_GRB,C_ISC,C_IST,C_KBI,C_KPN,C_RRA,C_SPC,C_TCH,C_VBE FROM 
(
	SELECT 
		(SELECT CONCAT(kode_cabang,'-',nama_cabang) FROM m_branch) cabang,
		a.shop,
		(SELECT nama FROM m_toko WHERE toko=a.shop) Nama,
		a.tanggal,
		Docno_Double,
		Docno_before,
		MAX(a.jam) Jam_Double,
		MIN(a.jam) Jam_before,
		a.station,
		a.shift,
		a.seqno,
		a.prdcd,
		(SELECT singkatan FROM prodmast_all WHERE prdcd=a.prdcd) Singkatan,
		a.qty,
		a.price,
		a.gross,
		a.ppn,
		a.hpp,
		a.bkp,
		a.sub_bkp 
	FROM 
		(
			SELECT * FROM ${table_dt} WHERE rtype='j' and prdcd<>0
		) a 
	RIGHT JOIN
		(
			SELECT shop,tanggal,station,shift,MAX(docno) docno_double,MIN(docno) docno_before,tot_item,qty,gross,ppn,bebas_ppn,hpp,jam,COUNT(*) tot FROM
			(
				SELECT shop,tanggal,station,shift,docno,COUNT(*) tot_item,SUM(qty) qty,SUM(gross) gross,SUM(IF(bkp='T' AND sub_bkp='Y',ppn,0)) PPn,SUM(IF(bkp='T' AND sub_bkp <>'Y',ppn,0)) Bebas_PPn,SUM(qty*hpp) hpp,SUM(TIME_TO_SEC(jam))jam FROM ${table_dt} 
				WHERE rtype='j' and prdcd<>0
				GROUP BY shop,tanggal,station,shift,docno 
				having gross>=75000
			) a
			GROUP BY shop,tanggal,station,shift,tot_item,qty,gross,ppn,bebas_ppn,hpp,jam
			HAVING tot > 1
		) b
	ON 
		a.shop=b.shop AND a.tanggal=b.tanggal AND a.station=b.station AND a.shift=b.shift AND a.docno=b.docno_double
	GROUP BY 
		a.shop,a.tanggal,a.station,a.shift,a.docno,a.prdcd
) a
LEFT JOIN
(
	SELECT toko,tanggal,station,shift,docno,SUM(nilai-kembali) B_bayar,GROUP_CONCAT(IF(tipe RLIKE ('p0'),noacc,'')) B_noacc,
		SUM(IF(tipe IN ('CSH'),nilai-kembali,0)) B_CSH,
		SUM(IF(tipe IN ('CCR'),nilai-kembali,0)) B_CCR,
		SUM(IF(tipe IN ('DEB'),nilai-kembali,0)) B_DEB,
		SUM(IF(tipe IN ('GRB'),nilai-kembali,0)) B_GRB,
		SUM(IF(tipe IN ('ISC'),nilai-kembali,0)) B_ISC,
		SUM(IF(tipe IN ('IST'),nilai-kembali,0)) B_IST,
		SUM(IF(tipe IN ('KBI'),nilai-kembali,0)) B_KBI,
		SUM(IF(tipe IN ('KPN'),nilai-kembali,0)) B_KPN,
		SUM(IF(tipe IN ('P01'),nilai-kembali,0)) B_P01,
		SUM(IF(tipe IN ('P02'),nilai-kembali,0)) B_P02,
		SUM(IF(tipe IN ('RRA'),nilai-kembali,0)) B_RRA,
		SUM(IF(tipe IN ('SPC'),nilai-kembali,0)) B_SPC,
		SUM(IF(tipe IN ('TCH'),nilai-kembali,0)) B_TCH,
		SUM(IF(tipe IN ('VBE'),nilai-kembali,0)) B_VBE
	FROM ${table_byr} WHERE rtype='J'
	GROUP BY toko,tanggal,station,shift,docno
) b
ON a.shop=b.toko AND a.station=b.station AND a.shift=b.shift AND a.Docno_Double=b.docno
LEFT JOIN
(
	SELECT toko,tanggal,station,shift,docno,SUM(nilai-kembali) C_bayar,GROUP_CONCAT(IF(tipe RLIKE ('p0'),noacc,'')) C_noacc,
		SUM(IF(tipe IN ('CSH'),nilai-kembali,0)) C_CSH,
		SUM(IF(tipe IN ('CCR'),nilai-kembali,0)) C_CCR,
		SUM(IF(tipe IN ('DEB'),nilai-kembali,0)) C_DEB,
		SUM(IF(tipe IN ('GRB'),nilai-kembali,0)) C_GRB,
		SUM(IF(tipe IN ('ISC'),nilai-kembali,0)) C_ISC,
		SUM(IF(tipe IN ('IST'),nilai-kembali,0)) C_IST,
		SUM(IF(tipe IN ('KBI'),nilai-kembali,0)) C_KBI,
		SUM(IF(tipe IN ('KPN'),nilai-kembali,0)) C_KPN,
		SUM(IF(tipe IN ('P01'),nilai-kembali,0)) C_P01,
		SUM(IF(tipe IN ('P02'),nilai-kembali,0)) C_P02,
		SUM(IF(tipe IN ('RRA'),nilai-kembali,0)) C_RRA,
		SUM(IF(tipe IN ('SPC'),nilai-kembali,0)) C_SPC,
		SUM(IF(tipe IN ('TCH'),nilai-kembali,0)) C_TCH,
		SUM(IF(tipe IN ('VBE'),nilai-kembali,0)) C_VBE
	FROM ${table_byr} WHERE rtype='J'
	GROUP BY toko,tanggal,station,shift,docno
) c
ON a.shop=c.toko AND a.station=c.station AND a.shift=c.shift AND a.Docno_Before=c.docno
HAVING C_CCR+C_DEB+C_GRB+C_ISC+C_IST+C_KBI+C_KPN+C_RRA+C_SPC+C_TCH+C_VBE <> 0;
            `; 
            const rv = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, query_select)
            
            if(rv.status === "NOK"){
              console.log(`${r.kdcab}|${tanggal}|GAGAL`)
            }else{ 
              console.log(`${r.kdcab}|${tanggal}|${rv.status}`)
            }
          }
          
        })
      
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
const anydb = require('./services/anydb');
 
const doitBro = async () => {
    try {    
        let queryx =`SELECT 
        TOKO,
        DATE(TANGGAL) TANGGAL,
        JAM,
        STATION,
        SHIFT,
        NIK,
        NAMA_KASIR,
        TOTAL_RP RUPIAH_SERAH,
        (SELECT SUM(IF(tipe='CSH',nilai-Kembali,0)) FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Uang_Cash,
        (SELECT SUM(tunai)FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Tarik_Tunai,
        (SELECT SUM(IF(tipe='CSH',nilai-Kembali,0)) - SUM(tunai) Uang_Tunai FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Uang_Tunai
    FROM RSH2212 A
    WHERE TANGGAL='2022-12-01' AND RTYPE='SER' and toko ='TXII' 
    ORDER BY TOKO,TANGGAL,STATION,SHIFT`

        const x = await anydb.zconn("192.168.24.142","report","Rpt@Edpho2020","indomaret",3306, queryx)
        //const x = rows.sort(function(a,b){return new Date(a.tanggal_buat) - new Date(b.tanggal_buat)})
        let data_bersamaan = []
        x.forEach(rx => {
            
            let cekprimary = []
            //console.log(`Cek No CO ${rx.noco} = ada dalam array ${data_bersamaan.toString()}`)
            const primary = `${rx.toko,rx.tanggal,rx.shift,rx.station,rx.nik}`

            if(!cekprimary.includes(primary)){ 

                var arrayFiltered = x.filter( i => i.tanggal_ambil  > rx.tanggal_ambil &&  i.tanggal_ambil < rx.tanggal_selesai && i.diambil_oleh == rx.diambil_oleh);
                
                arrayFiltered.forEach( (a) => {
                    data_bersamaan.push(`${rx.toko,rx.tanggal,rx.shift,rx.station,rx.nik}`)
                });

                //console.log(`Nomor CO ${rx.noco} - ${rx.tanggal_ambil} ${rx.tanggal_selesai}`);
                if(arrayFiltered.length > 0){
                    //console.log(data_bersamaan.toString())
                    //console.log(`Nomor CO ${rx.noco} - ${rx.tanggal_ambil} ${rx.tanggal_selesai}  Bersamaan dengan Co :`, arrayFiltered.length);
                    var tampil = `${rx.noco}|${rx.tanggal_ambil}|${rx.tanggal_selesai}|${rx.diambil_oleh}|${arrayFiltered.length}|${result}`
                    console.log(tampil)
                }
            }
            
        });

        console.log("selesai")
    
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    }  
} 
 
doitBro()
 

/* SELECT 
	TOKO,
	DATE(TANGGAL) TANGGAL,
	JAM,
	STATION,
	SHIFT,
	NIK,
	NAMA_KASIR,
	TOTAL_RP RUPIAH_SERAH,
	(SELECT SUM(IF(tipe='CSH',nilai-Kembali,0)) FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Uang_Cash,
	(SELECT SUM(tunai)FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Tarik_Tunai,
	(SELECT SUM(IF(tipe='CSH',nilai-Kembali,0)) - SUM(tunai) Uang_Tunai FROM byr_221201 WHERE TOKO=A.TOKO AND STATION=A.STATION AND SHIFT=A.SHIFT AND FTIME < A.JAM) Uang_Tunai
FROM RSH2212 A
WHERE TANGGAL='2022-12-01' AND RTYPE='SER'ORDER BY TOKO,TANGGAL,STATION,SHIFT */
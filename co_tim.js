const conn_ho = require('./services/dbho');
 
const doitBro = async () => {
    try {    
      
        console.log("Start")
        const x = await conn_ho.query(`
        select 
        kode_lokasi_tujuan,
        nik_pengambil,
        diambil_oleh,
        no_komplain,
        tanggal_ambil,
        tanggal_selesai
        from dt_complain 
        where date(tanggal_buat) between '2024-08-01' and '2024-10-14'
        and kode_lokasi_tujuan rlike 'RE0'
        and (Tujuan_Relasi_Komplain is null or Tujuan_Relasi_Komplain ='')
        and kategori_masalah ='EDP - Software TK'
        and Tipe_Lokasi_Asal ='store'
        order by diambil_oleh,tanggal_ambil
        `)
        //const x = rows.sort(function(a,b){return new Date(a.tanggal_buat) - new Date(b.tanggal_buat)})
        var data_bersamaan = []
        x.forEach(rx => {
            
            //console.log(`Cek No CO ${rx.no_komplain} = ada dalam array ${data_bersamaan.toString()}`)
            if(!data_bersamaan.includes(rx.no_komplain)){ 

                var arrayFiltered = x.filter( i => i.tanggal_ambil  > rx.tanggal_ambil &&  i.tanggal_ambil < rx.tanggal_selesai && i.diambil_oleh == rx.diambil_oleh);
                
                result = arrayFiltered.map(function (a) {
                    data_bersamaan.push(a.no_komplain)
                    //console.log(`Push CO Double ${a.noco}`)
                    return a.no_komplain;
                });

                //console.log(`Nomor CO ${rx.noco} - ${rx.tanggal_ambil} ${rx.tanggal_selesai}`);
                if(arrayFiltered.length > 0){
                    //console.log(data_bersamaan.toString())
                    //console.log(`Nomor CO ${rx.noco} - ${rx.tanggal_ambil} ${rx.tanggal_selesai}  Bersamaan dengan Co :`, arrayFiltered.length);
                    let tampil = `${rx.kode_lokasi_tujuan}|${rx.nik_pengambil}|${rx.diambil_oleh}|${rx.no_komplain}|${rx.tanggal_ambil}|${rx.tanggal_selesai}|${arrayFiltered.length}|${result}`
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
 
const conn_local = require('./services/db');
 
const doitBro = async () => {
    try {    
      
        const [x] = await conn_local.query(`
        select * from dt_complain 
        order by diambil_oleh,tanggal_ambil
        `)
        //const x = rows.sort(function(a,b){return new Date(a.tanggal_buat) - new Date(b.tanggal_buat)})
        var data_bersamaan = []
        x.forEach(rx => {
            
            //console.log(`Cek No CO ${rx.noco} = ada dalam array ${data_bersamaan.toString()}`)
            if(!data_bersamaan.includes(rx.noco)){ 

                var arrayFiltered = x.filter( i => i.tanggal_ambil  > rx.tanggal_ambil &&  i.tanggal_ambil < rx.tanggal_selesai && i.diambil_oleh == rx.diambil_oleh);
                
                result = arrayFiltered.map(function (a) {
                    data_bersamaan.push(a.noco)
                    //console.log(`Push CO Double ${a.noco}`)
                    return a.noco;
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
 
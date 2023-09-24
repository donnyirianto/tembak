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

      console.log("Running: ")  
      
      const startDate = dayjs('2022-09-01');
      const endDate = dayjs('2023-02-10');
      let currentDate = startDate;

      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
        const formattedDate = currentDate.format('YYYY-MM-DD');
        
        // Increment the current date by one day for the next iteration

      await Models.QueryCO(`INSERT IGNORE INTO absen_co select concat(Nama,'|',tanggal_shift) as data_user from (
        SELECT concat( Nik_pengambil,'|', SUBSTRING_INDEX(SUBSTRING_INDEX(Diambil_Oleh , '-', 1),' ',2),'|',
        if(hour(min(Tanggal_ambil)) between 5 and 10,'Shift 1', 
        (if(hour(min(Tanggal_ambil)) between 13 and 19,'Shift 2','Shift 3')))
        ) as Nama, 
        date(max(Tanggal_selesai)) as tanggal_shift
        FROM dt_complain 
        where Kode_Lokasi_Tujuan ='re04'
        and date(Tanggal_Buat) = '${formattedDate}'
        and kategori_masalah not rlike 'Hardware'
        and diambil_oleh !=''
        group by Nik_pengambil,Diambil_Oleh) a`)
        console.log(formattedDate); 
        currentDate = currentDate.add(1, 'day');
      } 
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
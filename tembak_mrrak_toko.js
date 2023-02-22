const Models = require('./modelsnew/model');
 
(async ()=>{
  try{  
    
      const results = await Models.getListIp();
      
      results.forEach( async (r) => { 
  
        const queryTembakx= `   
        delete from rrak_mrrak;
insert into rrak_mrrak() values
('', '510072', '1', 'Air Minum', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1),
('', '510009', '6', 'Lem Kertas', '', 0, 0, 0, 12500, 0, 0, 0, 0, 0, 0, 2),
('', '510009', '1', 'Cutter', '', 0, 0, 0, 0, 0, 17000, 0, 0, 0, 0, 3),
('', '510009', '13', 'Isi Cutter', '', 0, 0, 0, 0, 0, 17000, 0, 0, 0, 0, 4),
('', '510009', '3', 'Gunting', '', 0, 0, 0, 0, 0, 21000, 0, 0, 0, 0, 5),
('', '510009', '10', 'Staples', '', 0, 0, 0, 0, 0, 38000, 0, 0, 0, 0, 6),
('', '510009', '4', 'Isi Staples', '', 0, 31000, 0, 0, 0, 0, 0, 0, 0, 0, 7),
('', '510009', '8', 'Lakban', '', 0, 38000, 0, 0, 0, 0, 0, 0, 0, 0, 8),
('', '510009', '9', 'Selotip', '', 0, 17000, 0, 0, 0, 0, 0, 0, 0, 0, 9),
('', '510009', '15', 'Kabel Ties', '', 0, 19000, 0, 0, 0, 0, 0, 0, 0, 0, 10),
('', '510073', '2', 'Kamper', '', 0, 26000, 0, 0, 0, 0, 0, 0, 0, 0, 11),
('', '510073', '6', 'Pembersih Kaca', '', 0, 18000, 0, 0, 0, 0, 0, 0, 0, 0, 12),
('', '510073', '7', 'Pembersih Piring', '', 0, 22000, 0, 0, 0, 0, 0, 0, 0, 0, 13),
('', '510073', '13', 'Spons', '', 0, 0, 0, 16000, 0, 0, 0, 0, 0, 0, 14),
('', '510073', '17', 'Kawat Cuci / Sabut', '', 0, 0, 0, 16000, 0, 0, 0, 0, 0, 0, 15),
('', '510073', '8', 'Cairan Pembersih Lantai', '', 0, 40000, 0, 0, 0, 0, 0, 0, 0, 0, 16),
('', '510073', '18', 'Bubuk Pembersih', '', 0, 0, 0, 34000, 0, 0, 0, 0, 0, 0, 17),
('', '510073', '11', 'Refill Pel', '', 0, 0, 0, 50000, 0, 0, 0, 0, 0, 0, 18),
('', '510073', '4', 'Karbol', '', 0, 26000, 0, 0, 0, 0, 0, 0, 0, 0, 19),
('', '510073', '9', 'Pengharum Ruangan', '', 0, 24000, 0, 0, 0, 0, 0, 0, 0, 0, 20),
('', '510073', '19', 'Tissue Wajah', '', 0, 43000, 0, 0, 0, 0, 0, 0, 0, 0, 21),
('', '510073', '15', 'Tissue Toilet', '', 0, 500000, 0, 0, 0, 0, 0, 0, 0, 0, 22),
('', '510073', '16', 'Handsoap', '', 0, 60000, 0, 0, 0, 0, 0, 0, 0, 0, 23),
('', '510009', '14', 'Lampu ( Toilet )', '', 0, 0, 0, 0, 0, 52000, 0, 0, 0, 0, 24),
('', '510024', '1', 'Lem Tikus', '', 0, 40000, 0, 0, 0, 0, 0, 0, 0, 0, 25),
('', '510059', '1', 'Parkir Motor ( Setor bank)', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26),
('', '510003', '1', 'BBM ( Kendaraan Delivery )', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27),
('', '510004', '1', 'BBM Genzet', '1', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28),
('', '510000', '1', 'Listrik', '4', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29),
('', '510001', '1', 'PDAM', '5', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30),
('', '510005', '1', 'Telepon (Pulsa)', '6', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31),
('', '510016', '1', 'Pemeliharaan Kendaraan', '2', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32),
('', '510035', '1', 'Babinsa/ Bimaspol', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33),
('', '510035', '2', 'Iuran Keamanan Toko', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34),
('', '510035', '3', 'Iuran Kebersihan', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35),
('', '510035', '4', 'Iuran RT/RW', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36),
('', '510009', '16', 'Canang - (Khusus Cab.BALI)', '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37),
('', '216004', '1', 'Pengobatan Khusus toko Frc', '3', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38);
        replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aBBM','Account Biaya BBM','510004-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aBNK','Account Biaya Pemeliharaan Kendaraan','510016-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aLIS','Account Biaya Listrik','510000-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aOBT','Account Biaya Pengobatan Personil','216004-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aPAM','Account Biaya PAM','510001-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('aTEL','Account Biaya Telpon','510005-1'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('PREM','Harga Premium','0'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('PRMX','Harga Pertamax','0'); 
replace into rrak_pengaturan (\`RKEY\`,\`Ket\`,\`Nilai1\`) values ('SOLR','Harga Solar','0');

` 
        //console.log(r.kdtk)
        const rv = await Models.vqueryTembak(r.ip1, queryTembakx)
      
        if(rv === "Gagal"){
          console.log(r.kdtk +'|'+ r.kdcab +'|Gagal'+ r.ip1) 
        }else{                       
            console.log(r.kdtk +'|'+ r.kdcab +'|Sukses|' + r.ip1)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
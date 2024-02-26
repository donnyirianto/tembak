const conn = require("./services/db");

(async()=>{

try {
    const querySql  = `replace into db_ori_v3.tpds (id,kdcab,kdtk,nama_toko,tanggal,tanggal_report,tanggal_validasi,jenis,shift,total_setor,pengurang,penambah,nilai_setor_toko,nilai_nominal_cdc,namafile_truck,filesize_truck,namafile,filesize,nik_user,nama_user,jumlah_lampiran,lampiran,id_metode_setoran,id_kdv,id_ttss,id_ttkd,id_pkd,id_sinkron_status,addtime,addid,updtime,updid) VALUES
    ('TXAM-2401192','G025','TXAM','S. SUPRIADI 172','2024-01-19','2024-01-16 07:30:33.000','2024-01-16 07:31:12.000',NULL,'2',0.0,0.0,0.0,1250000.0,0.0,'KDV-20240116-d823086a-4d3f-4cab-a353-17d7ea797325.jpeg',64.44,'LAMPIRAN-TXAM-6899b031-5344-4f84-a257-10da25ca3965.jpeg',68.74,'0000000002','DEVELOPER',1,'[{"jam": "07:30:00", "nominal": 1250000, "tanggal_setor": "2024-01-16"}]',96,0,'240108TXAM2','','','','2023-12-29 07:10:05.000','py_ori_service_v3','2024-01-16 07:31:12.000',NULL);
    `
    
    const thousandArray = [];
    for (let i = 0; i < 100; i++) {
        thousandArray.push(i);
    }

    thousandArray.forEach(async(e) => {
        const data = await conn.queryInsert(querySql);
        console.log(`${e} - ${data}`)
    });       

    console.log("sukses")

} catch (error) {
    console.log(error)
}
})();
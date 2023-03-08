const { Console } = require('console');
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
    try {    
      const start = new Date();
      console.log("Running At : " + start)   
      while(true){         
          (async ()=>{
              try{  
                deleteFile('./data.txt');    
                const fileReport = fs.createWriteStream("data.txt");  
                fileReport.once('open', async function(fd) { 
                  fs.appendFile('data.txt',"let Donny = [", errx => {
                    if (errx) {
                      console.log("error Tulis File")
                      return true
                    } 
                    return true
                  })      
                  const results = await Models.getListIpIris();

                  results.forEach( async (r) => {  
                    //set global max_allowed_packet=33554432;
                    //show variables like 'max_allowed_packet';
                    /*ALTER TABLE m_target_sales
DROP PRIMARY KEY;
ALTER TABLE m_target_sales
ADD PRIMARY KEY (KODE_CABANG,SHOP,PERIODE);*/
                  /*const queryTembakx= ` 
                  CREATE TABLE IF NOT EXISTS \`m_rekon_wt\` (
                    \`kdcab\` char(4) NOT NULL DEFAULT '',
                    \`kdtk\` char(4) NOT NULL DEFAULT '',
                    \`nama_toko\` char(25) NOT NULL DEFAULT '',
                    \`bukti_tgl\` date NOT NULL DEFAULT '0000-00-00',
                    \`rtype\` char(1) NOT NULL,
                    \`istype\` char(8) NOT NULL,
                    \`toko\` varchar(25) NOT NULL,
                    \`bukti_no\` char(7) NOT NULL DEFAULT '',
                    \`total_item\` bigint NOT NULL DEFAULT '0',
                    \`qty\` decimal(32,0) DEFAULT NULL,
                    \`gross\` decimal(36,2) DEFAULT NULL,
                    \`ppn\` decimal(36,2) DEFAULT NULL,
                    \`gross_jual\` decimal(36,2) DEFAULT NULL,
                    \`ppnrp_idm\` decimal(36,2) DEFAULT NULL,
                    \`disc05\` decimal(36,2) DEFAULT NULL,
                    PRIMARY KEY (\`kdcab\`,\`kdtk\`,\`bukti_tgl\`,\`bukti_no\`,\`rtype\`,\`istype\`)
                    ) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPRESSED KEY_BLOCK_SIZE=8;
                  CREATE TABLE IF NOT EXISTS \`m_rekon_wt_rekap\` (
                      \`id\` int unsigned NOT NULL AUTO_INCREMENT,
                      \`kdcab\` char(4) NOT NULL DEFAULT '',
                      \`kdtk\` char(4) NOT NULL DEFAULT '',
                      \`nama_toko\` char(25) NOT NULL DEFAULT '',
                      \`bukti_tgl\` date NOT NULL DEFAULT '0000-00-00',
                      \`rtype\` char(1) NOT NULL,
                      \`istype\` char(8) NOT NULL,
                      \`toko\` varchar(25) NOT NULL,
                      \`bukti_no\` char(7) NOT NULL DEFAULT '',
                      \`total_item\` bigint NOT NULL DEFAULT '0',
                      \`qty\` decimal(32,0) DEFAULT NULL,
                      \`gross\` decimal(36,2) DEFAULT NULL,
                      \`ppn\` decimal(36,2) DEFAULT NULL,
                      \`gross_jual\` decimal(36,2) DEFAULT NULL,
                      \`ppnrp_idm\` decimal(36,2) DEFAULT NULL,
                      \`disc05\` decimal(36,2) DEFAULT NULL,
                      \`sel_total_item\` bigint NOT NULL DEFAULT '0',
                      \`sel_qty\` decimal(32,0) DEFAULT NULL,
                      \`sel_gross\` decimal(36,2) DEFAULT NULL,
                      \`sel_ppn\` decimal(36,2) DEFAULT NULL,
                      \`sel_gross_jual\` decimal(36,2) DEFAULT NULL,
                      \`sel_ppnrp_idm\` decimal(36,2) DEFAULT NULL,
                      \`sel_disc05\` decimal(36,2) DEFAULT NULL,
                      \`keterangan\` text,
                      \`nama_user\` varchar(25) DEFAULT NULL,
                      \`addtime\` timestamp NULL DEFAULT NULL,
                      \`updtime\` timestamp NULL DEFAULT NULL,
                      PRIMARY KEY (\`id\`) USING BTREE
                      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                  CREATE TABLE IF NOT EXISTS \`m_rekonsales_rekap\` (
                      \`id\` int unsigned NOT NULL AUTO_INCREMENT,
                      \`kdcab\` char(4) NOT NULL DEFAULT '',
                      \`kdtk\` char(4) NOT NULL DEFAULT '',
                      \`nama\` char(25) NOT NULL DEFAULT '',
                      \`shop\` char(4) DEFAULT NULL,
                      \`wdate\` date NOT NULL,
                      \`tjualn\` decimal(34,0) DEFAULT NULL,
                      \`tretn\` decimal(34,0) DEFAULT NULL,
                      \`tppn\` decimal(41,6) DEFAULT NULL,
                      \`thpp\` decimal(45,6) DEFAULT NULL,
                      \`tjual\` decimal(41,6) DEFAULT NULL,
                      \`tret\` decimal(41,6) DEFAULT NULL,
                      \`jqty\` decimal(31,0) DEFAULT NULL,
                      \`dqty\` decimal(31,0) DEFAULT NULL,
                      \`bbs_ppn\` decimal(41,6) DEFAULT NULL,
                      \`sales\` decimal(38,3) DEFAULT NULL,
                      \`ppn\` double DEFAULT NULL,
                      \`hpp\` decimal(38,3) DEFAULT NULL,
                      \`Sel_Sales\` decimal(43,6) DEFAULT NULL,
                      \`Sel_Hpp\` decimal(46,6) DEFAULT NULL,
                      \`Sel_PPn\` double DEFAULT NULL,
                      \`keterangan\` text,
                      \`nama_user\` varchar(25) DEFAULT NULL,
                      \`addtime\` timestamp NULL DEFAULT NULL,
                      \`updtime\` timestamp NULL DEFAULT NULL,
                      PRIMARY KEY (\`id\`) USING BTREE
                      ) ENGINE=InnoDB DEFAULT CHARSET=latin1; 
                  CREATE TABLE IF NOT EXISTS \`m_rekonwt_rekap\` (
                    \`id\` int unsigned NOT NULL AUTO_INCREMENT,
                    \`kdcab\` char(4) NOT NULL DEFAULT '',
                    \`kdtk\` char(4) NOT NULL DEFAULT '',
                    \`nama_toko\` char(25) NOT NULL DEFAULT '',
                    \`bukti_tgl\` date NOT NULL,
                    \`rtype\` char(1) NOT NULL,
                    \`istype\` char(8) NOT NULL,
                    \`toko\` varchar(25) NOT NULL,
                    \`bukti_no\` char(7) NOT NULL DEFAULT '',
                    \`total_item\` bigint NOT NULL DEFAULT '0',
                    \`qty\` decimal(32,0) DEFAULT NULL,
                    \`gross\` decimal(36,2) DEFAULT NULL,
                    \`ppn\` decimal(36,2) DEFAULT NULL,
                    \`gross_jual\` decimal(36,2) DEFAULT NULL,
                    \`ppnrp_idm\` decimal(36,2) DEFAULT NULL,
                    \`disc05\` decimal(36,2) DEFAULT NULL,
                    \`total_item_wt\` bigint NOT NULL DEFAULT '0',
                    \`qty_wt\` decimal(32,0) DEFAULT NULL,
                    \`gross_wt\` decimal(36,2) DEFAULT NULL,
                    \`ppn_wt\` decimal(36,2) DEFAULT NULL,
                    \`gross_jual_wt\` decimal(36,2) DEFAULT NULL,
                    \`ppnrp_idm_wt\` decimal(36,2) DEFAULT NULL,
                    \`disc05_wt\` decimal(36,2) DEFAULT NULL,
                    \`sel_total_item\` bigint DEFAULT NULL,
                    \`sel_qty\` decimal(33,0) DEFAULT NULL,
                    \`sel_gross\` decimal(37,2) DEFAULT NULL,
                    \`sel_ppn\` decimal(37,2) DEFAULT NULL,
                    \`sel_gross_jual\` decimal(37,2) DEFAULT NULL,
                    \`sel_ppnrp_idm\` decimal(37,2) DEFAULT NULL,
                    \`sel_disc05\` decimal(37,2) DEFAULT NULL,
                    \`keterangan\` text,
                    \`nama_user\` varchar(25) DEFAULT NULL,
                    \`addtime\` timestamp NULL DEFAULT NULL,
                    \`updtime\` timestamp NULL DEFAULT NULL,
                    PRIMARY KEY (\`id\`) USING BTREE
                    ) ENGINE=InnoDB DEFAULT CHARSET=latin1; 
                  CREATE TABLE IF NOT EXISTS \`m_rekonsales\` (
                      \`kdcab\` char(4) NOT NULL DEFAULT '',
                      \`kdtk\` char(4) NOT NULL DEFAULT '',
                      \`nama\` char(25) NOT NULL DEFAULT '',
                      \`SHOP\` char(4) DEFAULT '',
                      \`WDATE\` date NOT NULL DEFAULT '0000-00-00',
                      \`TJUALN\` decimal(34,0) DEFAULT NULL,
                      \`TRETN\` decimal(34,0) DEFAULT NULL,
                      \`TPPN\` decimal(41,6) DEFAULT NULL,
                      \`THPP\` decimal(45,6) DEFAULT NULL,
                      \`TJUAL\` decimal(41,6) DEFAULT NULL,
                      \`TRET\` decimal(41,6) DEFAULT NULL,
                      \`JQTY\` decimal(31,0) DEFAULT NULL,
                      \`DQTY\` decimal(31,0) DEFAULT NULL,
                      \`BBS_PPN\` decimal(41,6) DEFAULT NULL,
                      PRIMARY KEY (\`kdcab\`,\`kdtk\`,\`WDATE\`)
                      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;	 
                                  CREATE TABLE IF NOT EXISTS \`m_mtc_const\` (
                            \`id\` int NOT NULL DEFAULT '0',
                            \`TANGGAL\` date DEFAULT NULL,
                            \`KET\` varchar(3) NOT NULL DEFAULT '',
                            \`RTYPE\` char(3) NOT NULL DEFAULT '',
                            \`DOCNO_MSTRAN\` char(10) DEFAULT NULL,
                            \`RKEY\` char(3) DEFAULT '',
                            \`DOCNO_CONST\` char(10) DEFAULT NULL,
                            \`KETERANGAN\` varchar(13) NOT NULL DEFAULT '',
                            PRIMARY KEY (\`id\`,\`KET\`,\`RTYPE\`)
                          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;                  
                      CREATE TABLE IF NOT EXISTS \`m_mtc_docno_mstran\` (
                                \`id\` int NOT NULL DEFAULT '0',
                                \`BUKTI_TGL\` date NOT NULL DEFAULT '0000-00-00',
                                \`RTYPE\` char(5) NOT NULL,
                                \`BUKTI_NO\` text,
                                PRIMARY KEY (\`id\`,\`BUKTI_TGL\`,\`RTYPE\`)
                              ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS \`m_mtc_docno_mtran\` (
                            \`id\` int NOT NULL DEFAULT '0',
                            \`TANGGAL\` date NOT NULL DEFAULT '0000-00-00',
                            \`STATION\` char(3) NOT NULL DEFAULT '',
                            \`SHIFT\` char(1) NOT NULL DEFAULT '',
                            \`STRUK\` bigint NOT NULL DEFAULT '0',
                            \`MIN_DOCNO\` double DEFAULT NULL,
                            \`MAX_DOCNO\` double DEFAULT NULL,
                            \`SEL_DOCNO\` double DEFAULT NULL,
                            PRIMARY KEY (\`id\`,\`TANGGAL\`,\`STATION\`,\`SHIFT\`)
                          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_listrik\` (
                              \`id\` int NOT NULL DEFAULT '0',
                              \`listrik_mtran\` int DEFAULT '0',
                              \`listrik_virtual_trx\` int DEFAULT '0',
                              PRIMARY KEY (\`id\`)
                            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_mstran\` (
                              \`id\` int NOT NULL DEFAULT '0',
                              \`SHOP\` varchar(4) NOT NULL,
                              \`TANGGAL\` date NOT NULL,
                              \`RTYPE\` char(3) NOT NULL,
                              \`BUKTI_NO\` char(7) NOT NULL DEFAULT '',
                              \`GROSS\` decimal(36,2) DEFAULT NULL,
                              \`PPN\` decimal(36,6) DEFAULT NULL,
                              \`DISC_05\` decimal(32,4) DEFAULT NULL,
                              PRIMARY KEY (\`id\`,\`SHOP\`,\`TANGGAL\`,\`RTYPE\`,\`BUKTI_NO\`)
                            ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_mtran\` (
                            \`id\` int NOT NULL DEFAULT '0',
                            \`TANGGAL\` date NOT NULL DEFAULT '0000-00-00',
                            \`SHOP\` char(4) NOT NULL DEFAULT '',
                            \`SALES_NET\` decimal(42,6) DEFAULT NULL,
                            \`HPP\` decimal(46,6) DEFAULT NULL,
                            \`STRUK\` bigint DEFAULT '0',
                            \`TOTAL_REC\` bigint DEFAULT '0',
                            PRIMARY KEY (\`id\`,\`TANGGAL\`,\`SHOP\`)
                          ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_paymentpoint\` (
                                  \`id\` int NOT NULL DEFAULT '0',
                                  \`trxtoko\` varchar(25) NOT NULL DEFAULT '',
                                  \`trandate\` datetime DEFAULT NULL,
                                  PRIMARY KEY (\`id\`,\`trxtoko\`)
                                ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_plastik\` (
                              \`id\` int NOT NULL DEFAULT '0',
                              \`KONSUMEN_IDM\` decimal(23,0) DEFAULT NULL,
                              \`DC_IDM\` decimal(23,0) DEFAULT NULL,
                              \`KONSUMEN_CRM\` decimal(23,0) DEFAULT NULL,
                              \`DC_CRM\` decimal(23,0) DEFAULT NULL,
                              \`NON_IDM_CRM\` decimal(23,0) DEFAULT NULL,
                              PRIMARY KEY (\`id\`)
                              ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_spdmast\` (
                              \`id\` int NOT NULL DEFAULT '0',
                              \`supco\` varchar(4) NOT NULL DEFAULT '',
                              PRIMARY KEY (\`id\`,\`supco\`)
                              ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS \`m_mtc_const_toko\` (
                                \`id\` int NOT NULL DEFAULT '0',
                                \`const_toko\` text,
                                PRIMARY KEY (\`id\`)
                              ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
                      CREATE TABLE IF NOT EXISTS  \`m_mtc_mtran_detail\` (
                            \`id\` int NOT NULL DEFAULT '0',
                            \`tanggal\` date NOT NULL DEFAULT '0000-00-00',
                            \`struk_initial\` tinyint(5) NOT NULL DEFAULT 0,
                            \`struk_mtran\` tinyint(5) DEFAULT 0,
                            \`struk_bayar\` tinyint(5) DEFAULT 0,
                            \`sel_a\` bigint DEFAULT '0',
                            \`sel_b\` bigint DEFAULT '0',
                            \`sel_c\` bigint DEFAULT '0',
                            PRIMARY KEY (\`id\`,\`tanggal\`)
                           ) ENGINE=InnoDB DEFAULT CHARSET=latin;`
                           */
                  const queryTembakx='set global max_allowed_packet=33554432;'
                  const rv = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, queryTembakx)
                    
                  
                    console.log(rv); 
                    
                   
                    
                  })
                })
           
                 
              }catch(err){
                console.log("Sini Ketnya : " + err) 
                return true
              }

          })(); 
        await sleep(360000)            
      }
    } catch (e) {
      console.log("Sini 2" + e);
      //doitBro()
    } 
}
 
doitBro()

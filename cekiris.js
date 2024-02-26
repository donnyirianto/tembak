const Models = require('./models/model'); 

process.setMaxListeners(0);
 
const doitBro = async () => { 
    try{  
            
        const start = new Date();
        console.log("Running At : " + start)   
        //rename table m_rekonsales_rekap2 to m_rekonsales_rekap2_bck_2401;
        const querySql = `
        CREATE TABLE IF NOT EXISTS \`m_rekonsales_rekap2\` (
          \`id\` varchar(10) NOT NULL,
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
          PRIMARY KEY (\`id\`,\`kdcab\`,\`kdtk\`,\`wdate\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
        
        `
        //insert ignore into m_rekonsales_rekap2 select * from m_rekonsales_rekap2_bck_2401 where id >='2023-12-01';
        const results = await Models.getServerIris();
        
        results.forEach( async (r) => { 
          // ANCHOR ===============Query Ambil Data ========================= 
          let data = await Models.vqueryTembakIris(r.ipserver,r.user,r.pass,r.database, querySql)
          console.log(r.kdcab,data.data[0])
             
          }          
        )
        console.log("Selesai")
    }catch(err){
      console.log("Sini Ketnya : " + err) 
      return true
    } 
}
 
doitBro()
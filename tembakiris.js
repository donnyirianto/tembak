const { Console } = require("console");
const fs = require("fs");
const Models = require("./models/model");

process.setMaxListeners(0);

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const deleteFile = (filePath) => {
  // Unlink the file.
  fs.unlink(filePath, (error) => {
    if (!error) {
      return "Sukses Hapus";
    } else {
      return "Gagal Hapus";
    }
  });
};

const doitBro = async () => {
  try {
    const results = await Models.getListIpIris();
    for (let r of results) {
      const cekquery = `CREATE TABLE if not exists \`m_mtc_sttoko\` (
          \`id\` int NOT NULL DEFAULT '0',
        \`tanggal\` decimal(23,0) DEFAULT NULL,
        \`aqty\` decimal(23,0) DEFAULT NULL,
        \`bqty\` decimal(23,0) DEFAULT NULL,
        \`cqty\` decimal(23,0) DEFAULT NULL,
        \`dqty\` decimal(23,0) DEFAULT NULL,
        \`eqty\` decimal(23,0) DEFAULT NULL,
        \`fqty\` decimal(23,0) DEFAULT NULL,
        \`spd\` decimal(23,0) DEFAULT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`;
      const rv = await Models.vqueryTembakIris(r.ipserver, r.user, r.pass, r.database, cekquery);

      console.log(`${r.kdcab}|${r.namacabang}`);
    }
  } catch (e) {
    console.log("Sini 2" + e);
  }
};

doitBro();

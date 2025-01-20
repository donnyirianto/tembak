require("console");
const Models = require("./models/model");

process.setMaxListeners(0);

const doitBro = async () => {
  try {
    const results = await Models.getListIpIris();
    for (let r of results) {
      const cekquery = `truncate m_rekonsales_rekap2;`;
      await Models.vqueryTembakIris(r.kdcab, r.ipserver, r.user, r.pass, r.database, cekquery);

      console.log(`${r.kdcab}|${r.namacabang}`);
    }
  } catch (e) {
    console.log("Sini 2" + e);
  }
};

doitBro();

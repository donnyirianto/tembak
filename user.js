const axios = require("axios");
const { clientRedis } = require("./services/redis");
const Papa = require("papaparse");
const fs = require("fs");

const prepareDataBaca = async (client, r) => {
  try {
    let dataCache = await client.get(r);
    if (!dataCache) throw new Error("Data not found");

    return {
      status: "Sukses",
      id: r,
      data: JSON.parse(dataCache),
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};
const prepareData = async (client, payload) => {
  try {
    let dataCache = await axios.post("http://172.24.16.131:3030/ess/user/cekuserkaryawan", payload);

    await client.set(`GETDATAIRIS-${payload.username}`, JSON.stringify(dataCache.data.result));
    return {
      status: "Sukses",
    };
  } catch (error) {
    logger.info(error);
    return { status: "Gagal" };
  }
};

const doitBro = async () => {
  try {
    const start = new Date();
    console.log("Running At : " + start);

    const dataUser = [
      "1997001798",
      "2013159165",
      "2009402208",
      "2010001073",
      "2015208503",
      "2012028664",
      "2009403726",
      "1997000814",
      "2015048541",
      "2013185274",
      "2010027367",
      "2012030813",
      "2002007148",
      "2015220491",
      "2013162668",
      "2013046294",
      "2013052616",
      "2013235562",
      "2013030339",
      "1998006119",
      "2013226608",
      "2007000042",
      "2015167679",
      "2015093499",
      "2015039397",
      "2015065411",
      "2015261709",
      "2013109820",
      "2005005038",
      "2015107572",
      "2012072604",
      "2006403801",
      "2015520123",
      "2013190024",
      "2015281493",
      "2013074857",
      "2008190430",
      "1999000686",
      "2012073403",
      "2015251072",
      "2015044193",
      "2013072088",
      "2006004636",
      "2010030012",
      "2015165457",
      "2010004440",
      "2015069892",
      "1197000924",
      "2015252853",
      "2011021711",
      "2015251079",
      "2001006162",
      "2015061597",
      "1996001432",
      "2013152953",
      "1997000931",
      "199500854",
      "2013015493",
      "2013159703",
      "2015349240",
      "2001001543",
      "1997001977",
      "1999001831",
      "2015224528",
      "2008901274",
      "1999001067",
      "2015027013",
      "2005002032",
      "2008891227",
      "2010022815",
      "2015111901",
      "2000004096",
      "1989000009",
      "2015118024",
      "2015410084",
      "2015024501",
      "2012045109",
      "2010001246",
      "2002002225",
      "2013032121",
      "2007403703",
      "1993000509",
      "2015150074",
      "2006009015",
      "2011013490",
      "2013210385",
      "2013121230",
      "2015187714",
      "2013066488",
      "2012047566",
      "2015224529",
      "2013026323",
      "2015503450",
      "2012099409",
      "1992000993",
      "2013096864",
      "2015296978",
      "2006004373",
      "2015129512",
      "2011018762",
      "2015044203",
      "2006003621",
      "2004009746",
      "2010001535",
      "2000002304",
      "2010003496",
      "2015293573",
      "2015146819",
      "2013026188",
      "2013097124",
      "1995000547",
      "2013037500",
      "2015305604",
      "2011016374",
      "1995000060",
      "2015076046",
      "2004012540",
      "2015156633",
      "2015185028",
      "2003006122",
      "1997001530",
      "2015008281",
      "2015287737",
      "2012039907",
      "2015429973",
      "2004000352",
      "2012062166",
      "2012058403",
      "2015190107",
      "2012069889",
      "1997001072",
      "2013095992",
      "2003000267",
      "1999000255",
      "2004002982",
      "2009407734",
      "2012111802",
      "2004009516",
      "2008420277",
      "2013099750",
      "2012025563",
      "2015267868",
      "2011015999",
      "2013093494",
      "2013206840",
      "2015086820",
      "2015250548",
      "2015010338",
      "2015312176",
      "2015046502",
      "2015208026",
      "2007008003",
      "2011006678",
      "2011007527",
      "2013214257",
      "2013072891",
      "2013098437",
      "2008420097",
      "2013174454",
      "2011005733",
      "2007020155",
      "2011015109",
      "2013081087",
      "2013207969",
      "2001004003",
      "1997001128",
      "2013235629",
      "2013235729",
      "2013072899",
      "2015050131",
      "2015369046",
      "2013124652",
      "2012041602",
      "2000001178",
      "1997003171",
      "2008900692",
      "2012070328",
      "2013227794",
      "2013195496",
      "2015295793",
      "2015069877",
      "2015069788",
      "2008000126",
      "2015110715",
      "1992000150",
      "1997003034",
      "2015198281",
      "2015198295",
      "2009046378",
      "2013211598",
      "2015424855",
      "2010003739",
      "2013184122",
      "2005008387",
      "2015175666",
      "2005000089",
      "2010024765",
      "2013022268",
      "2013068106",
      "2015021070",
      "2013176183",
      "2013027684",
      "2013228369",
      "2001006637",
      "2013158138",
      "2015082074",
      "2004004044",
      "2013232045",
      "1997000547",
      "2011013488",
      "2004000207",
      "2013227120",
      "2013213961",
      "2012035877",
      "2015090568",
      "2012096470",
      "1992000212",
      "2012039749",
      "1999003163",
      "2015250992",
      "2000000730",
      "2015281491",
      "2013064408",
      "2015495879",
      "2015023893",
      "2013047195",
      "2012029036",
      "2015269295",
      "2000001047",
      "2015071903",
      "2013039629",
      "2006002102",
      "2005008102",
      "2005000010",
      "2012054727",
      "2015030704",
      "2013101043",
      "2012030331",
      "2013121926",
      "2015074446",
      "1998000419",
      "2013058857",
      "2013018789",
      "2013002937",
      "2015261707",
      "2015149530",
      "2015076231",
      "2004001220",
      "2015305596",
      "2013225799",
      "2015109943",
      "2012051971",
      "2015433423",
      "2015318637",
      "2015049601",
      "2011018423",
      "2009407316",
      "1999000292",
      "2010022544",
      "2013022631",
      "2010005722",
      "2015001615",
      "2015142516",
      "2015116953",
      "2015063260",
      "2015343367",
      "2015349842",
      "2006003518",
      "2013115288",
      "2007414184",
      "2008190533",
      "2015010645",
      "2012110547",
      "2015084995",
      "2015500991",
      "2015152360",
      "2002006354",
      "2013094683",
      "2002004068",
      "2015178742",
      "1996001840",
      "2005004067",
      "2012024687",
      "2012023608",
      "2013228368",
      "2005002411",
      "1995000296",
      "2005007044",
      "2015175527",
      "2007004003",
      "2001000236",
      "2015204847",
      "2013185394",
      "2006403830",
      "2013096320",
      "2004007239",
      "1998000160",
      "2013208635",
      "2005004062",
      "2013103262",
      "2015486858",
      "2012027707",
      "2001001710",
      "2013123580",
      "2015155613",
      "2015170178",
      "2013168059",
      "2012033222",
      "2015269007",
      "2012051034",
      "2015262538",
      "2013119534",
      "2015271080",
      "2006009556",
      "2007006576",
      "2001000413",
      "2012055207",
      "2015250434",
      "2012029278",
      "2015249640",
      "2015097125",
      "2013029681",
      "2007414311",
      "2008000047",
      "2008191359",
      "2013010223",
      "2015059802",
      "2006009046",
      "2011008177",
      "2015075519",
      "2015136953",
      "2001004091",
      "2001000360",
      "2013222971",
      "2001002980",
      "2012072607",
      "2015177340",
      "2007004031",
      "2010000806",
      "1999004694",
      "2015476602",
      "2007414334",
      "2011021649",
      "2013020009",
      "2012104399",
      "2013227251",
      "2013170909",
      "1999000434",
      "2001000552",
      "2013175091",
      "1996000419",
      "1999006629",
      "2010023078",
      "2013223517",
      "2013097070",
      "2013064410",
      "1995000610",
      "2012022314",
      "2013164715",
      "2015057884",
      "2004009728",
      "2000001793",
      "2013061159",
      "2013161554",
      "2011016595",
      "2003002041",
      "2006008382",
      "2008891280",
      "2013218107",
      "2012034722",
      "2011013487",
      "2012071959",
      "1997000627",
      "1997001675",
      "2015227455",
      "2008600225",
      "2015040491",
      "2015290003",
      "1995005050",
      "2012035792",
      "2009047087",
      "2013233347",
      "2015263730",
      "2011004770",
      "1995000773",
      "1999000083",
      "2012022488",
      "2015010325",
      "2015176885",
      "1999000089",
      "1998000944",
      "2010017403",
      "2015070974",
      "2012036055",
      "2013027868",
      "2015255587",
      "2013093233",
      "2013109600",
      "2002002814",
      "2004002902",
      "2000000653",
      "2013226871",
      "2010003770",
      "2015173087",
      "2013027828",
      "2000000029",
      "1998004334",
      "2005009242",
      "2012025488",
      "2005004002",
      "2012026519",
      "2013230124",
      "2002002767",
      "2013185395",
      "2015059794",
      "2011021226",
      "2013177724",
      "2013203566",
      "2015181670",
      "2012053737",
      "2012053034",
      "2015157313",
      "2003001016",
      "2013153938",
      "2015145826",
      "2015316549",
      "2005000032",
      "2013041305",
      "2013233142",
      "2004009159",
      "2001009069",
      "2015281540",
      "2011006612",
      "2011012612",
      "2015321137",
      "2013223271",
      "2013010960",
      "2015153706",
      "2013071655",
      "2012023445",
      "2013097123",
      "2013207056",
      "2010014275",
      "2007003800",
      "2015000363",
      "2015061082",
      "2013140599",
      "2011011664",
      "2002006466",
      "2006403800",
      "2012023968",
      "2012036692",
      "2013170309",
      "2011002573",
      "2012026543",
      "2008191355",
      "2011004509",
      "2010011205",
      "2003007098",
      "2012100045",
      "2015061823",
      "1999001535",
      "1999001635",
      "1991000097",
      "2013164429",
      "2013160920",
      "2013214961",
      "1993000257",
      "2013020223",
      "2015049584",
      "1998000592",
      "2002006968",
      "2013223246",
      "2012027896",
      "2005008378",
      "2013223245",
      "2013144539",
      "2013036748",
      "2012029013",
      "2011001028",
      "2004001408",
      "2009407565",
      "2002001724",
      "2000000626",
      "2004009185",
      "2012051938",
      "2013024147",
      "2007009980",
      "2010025203",
      "2013014005",
      "2013229420",
      "2015166518",
      "2015430669",
      "2008890515",
      "2006008155",
      "2010011116",
      "2008901363",
      "2015125069",
      "2013047386",
      "2012036105",
      "2015336757",
      "2013042310",
      "2015176599",
      "2012034125",
      "2013226603",
      "2010011516",
      "2015061037",
      "2015178740",
      "2015160250",
      "2012028529",
      "2015324867",
      "2015084984",
      "2015124449",
      "2009405255",
      "2015080323",
      "2005008133",
      "2015281475",
      "2015175537",
      "1996000655",
      "2015060135",
      "2007014222",
      "2013088637",
      "2013168066",
      "2006008068",
      "2015153806",
      "2000000122",
      "2013066338",
      "2015077187",
      "2000000018",
      "2012032269",
      "2012034915",
      "2012022993",
      "2010007160",
      "2015057948",
      "2013234457",
      "2012049680",
      "2012046125",
      "2013118732",
      "2015173090",
      "1997001585",
      "2015262223",
      "2013171493",
      "2007009379",
      "2010029866",
      "2015276034",
      "2013089023",
      "2013069582",
      "1997001399",
      "2015099137",
      "2013216158",
      "2012029428",
      "2015039392",
      "2013048383",
      "2010021836",
      "2002002126",
      "1999000080",
      "2011010878",
      "2006005439",
      "2015118840",
      "1995000854",
      "2015178561",
      "2013017927",
      "2011000199",
      "1999000922",
      "2007004482",
      "2015161384",
      "2004001609",
      "2015251076",
      "2012084444",
      "1997001594",
      "2013234982",
      "2012036052",
      "2013089184",
      "2007001661",
      "2015206210",
      "2013124649",
      "2013207947",
      "2015219873",
      "1998000377",
      "2005009598",
      "2013160082",
      "2015024488",
      "2012104393",
      "2002001045",
      "2011019038",
      "2013077956",
      "2002006714",
      "2015074550",
      "2015285913",
      "2012085163",
      "2013104247",
      "2011012019",
      "2009404498",
      "2013058626",
      "1999000058",
      "2004002735",
      "2004006845",
      "2015182106",
      "2013120894",
      "2003001467",
      "2002001127",
      "2015154474",
      "2013131435",
      "2012043064",
      "2001000039",
      "1995000516",
      "1995000589",
      "2001004052",
      "2012028406",
      "2013011211",
      "2015041433",
      "2013107815",
      "1995000425",
      "2015121392",
      "1996000975",
      "2013189069",
      "2013223305",
      "2011008047",
      "2008901366",
      "2004004124",
      "2012047956",
      "2013170535",
      "2013163539",
      "2012031841",
      "2012110142",
      "2013228287",
      "2015013070",
      "2015180639",
      "2013164138",
      "2015103166",
      "2010030272",
      "2013213854",
      "2015069787",
      "2013066370",
      "2010011760",
      "2013163540",
      "2013068138",
      "2012035570",
      "2001006553",
      "2015010008",
      "2013030174",
      "2015366001",
      "2013145941",
      "2013087138",
      "1991000061",
      "2006004054",
      "2013003183",
      "2015198345",
      "2000000482",
      "2015058324",
      "2013235916",
      "2005008376",
      "2003003003",
      "2010014435",
      "2015349844",
      "2001002108",
      "2013118488",
      "2013131080",
      "2002002142",
      "2015112855",
      "2015196859",
      "2015048536",
      "2015200007",
      "2015060742",
      "2004007277",
      "2003002647",
      "2004009679",
      "2005004049",
      "2004009546",
      "2015053281",
      "2013229701",
      "2002001745",
      "2012027040",
      "2008600239",
    ];

    const getData = dataUser.map((r) => prepareData(clientRedis, { username: r }));

    await Promise.allSettled(getData);

    const dataHasil = await clientRedis.keys("GETDATAIRIS*");
    if (dataHasil.length > 0) {
      const prepare = dataHasil.map((r) => prepareDataBaca(clientRedis, r));
      const dataCacheResult = await Promise.allSettled(prepare);

      const dataResultCache = dataCacheResult.filter((r) => r.status === "fulfilled").map((r) => r.value);

      const hasil = dataResultCache.filter((r) => r.status === "Sukses").map((r) => r.data);

      const csv_sukses = Papa.unparse(hasil.flat(), { delimiter: "|" });
      fs.writeFileSync("data_sukses.csv", csv_sukses);
    }

    // for (const r of dataHasil) {
    //   await clientRedis.del(r);
    // }

    console.log("Selesai");
  } catch (err) {
    console.error("Error: ", err);
    return true;
  }
};

doitBro();
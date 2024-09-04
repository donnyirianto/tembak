const data = {
  kdcab: "G004",
  toko: "F94C",
  nama: "GENDOH - BANYUWANGI",
  station: "01",
  ip: "10.41.42.226",
  code: 200,
  msg: "Succes",
  data: '["[{\\"kdcab\\":\\"G004\\",\\"toko\\":\\"F94C\\",\\"tanggal\\":\\"2024-08-24\\",\\"noStruk\\":null,\\"jmlStruk\\":0,\\"nilaiStruk\\":null,\\"isiStruk\\":null}]"]',
  idreport: "ambildatastruk-F94C2024-08-30",
  timerequest: "2024-09-04 09:11:29",
  timerespons: "2024-09-04 09:11:29",
};

let u = JSON.parse(data.data);
let x = JSON.parse(u);
console.log(x);

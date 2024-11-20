const data = [
  '[\r\n  {\r\n    "pesan": "0 ROW AFFECTED"\r\n  }\r\n]',
  '[{"Tanggal":"2024-11-19T00:00:00","Sql_Start":"2024-11-19T22:56:28","Initial":"06:26:42","Mulai":"06:26:45","File":"06:28:05","Database":"06:27:13","Program":"00:00:00","Memory":"00:00:00","Corrupt":"00:00:00","Selesai":"06:28:05","Durasi":"00:01:20","addid":"kasir@TXAM-ANAK"}]',
];
const dataReponse = [];
for (let detail of data) {
  try {
    let x = JSON.parse(detail);
    if (!x[0].hasOwnProperty("pesan")) {
      dataReponse.push(...x);
    }
  } catch (error) {
    console.error(`Error parsing JSON: ${error.message}`);
    continue;
  }
}
console.log(dataReponse);

const lineReader = require('line-reader');
const Models = require('./modelsnew/model')
var insert_array = [];


lineReader.eachLine('/home/donny/hasil_199 tokofinal.txt', async function(line, last) {
  
    const a = line.replace(/\s/g, "")
    const b = a.replace(/"/g, '')
    const kalimat = b.trim()

  if(kalimat.includes('.exe')){
      
    const kalimat2 = kalimat.split(".exe")

    const kode_toko = kalimat.split(".exe")[1].substr(kalimat.split(".exe")[1].length - 4)
    const size_prog = kalimat.split(".exe")[1].split(kode_toko)[0]
    if(typeof size_prog != "undefined" && size_prog != ".co-nfig"){
      insert_array.push(`('${kode_toko}','${kalimat2[0]}.exe','${size_prog}')`)
    }
    

  }else if(kalimat.includes('.dll')){

    const kalimat2 = kalimat.split(".dll")

    const kode_toko = kalimat.split(".dll")[1].substr(kalimat.split(".dll")[1].length - 4)
    const size_prog = kalimat.split(".dll")[1].split(kode_toko)[0]
    if(typeof size_prog != "undefined" && size_prog != ".co-nfig"){
      insert_array.push(`('${kode_toko}','${kalimat2[0]}.dll','${size_prog}')`)
    }
    

  }
  
  if(last) {
    console.log('Last line printed.');
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    
    const insert_data = await Models.insertprogram(insert_array.join(","))
    console.log(`Insert Data :`, insert_data)
  }

});


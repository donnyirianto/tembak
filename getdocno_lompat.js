const Models = require('./models/model');

 
(async ()=>{
  try{  
    
      const results = await Models.getListIpDocnoLompat();
      
      results.forEach( async (r) => { 
        
        const queryCeck= `
        SELECT (select toko FROM toko) as toko,
            tanggal,
            shift,
            station,
            ifnull(group_concat(docno),'') as docno,
            ifnull(group_concat(replace(isi_struk,"'",'')),'') as isi_struk,
            ifnull(sum(amount),0) as amount
            FROM 
            STRUK_ONLINE WHERE 
            TANGGAL='${r.tanggal}'
            AND SHIFT = ${r.shift} AND STATION= ${r.station}
            AND DOCNO > ${r.prev_docno} AND docno < ${r.docno}
        `

        const rv = await Models.vqueryTembak(r.IP_INDUK, queryCeck)
        
        if(rv.status =="NOK"){
          console.log(r.shop +'|Gagal|'+ r.IP_INDUK) 
        }else{               
            await Models.UpdateDocnoLompat(r,rv.data)
            console.log(r.shop +'|Sukses|' + r.IP_INDUK)
        }
       
      }) 
      
  }catch(err){
    console.log("Sini Ketnya : " + err) 
    return true
  }
})()
 
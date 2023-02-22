const conn_local = require('../services/db');
const conn_iris = require('../services/db2');
const conn_ho = require('../services/dbho');
const zconn = require('../services/anydb'); 
const ftp = require('../services/ftp'); 
var dateFormat = require("dateformat");
 //'G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305','G177'
const getListServer = async () => {
    try{
   
        const [rows] = await conn_ho.query(`
            SELECT * FROM m_server_iris where jenis='iris' 
            and kdcab in('G004','G025','G030','G034','G097','G146','G148','G149','G158','G174','G301','G305','G177')
        `)
        return rows
    }catch(e){
        console.log(e)
        return "Error"
    }
} 

 
const getListServerBulanan = async () => {
    try{
   //'G146',
        const [rows] = await conn_local.query(`
        SELECT * FROM iris.m_server where jenis='bulanan' and kdcab IN('G034','G146')

        `)
        return rows
    }catch(e){
        console.log(e)
        return "Error"
    }
} 

const vquery_array = async (r, param) => {
    try{
        
        const rows = await zconn.zconn_array(r.ipserver,r.user,r.pass,r.database, 3306, param)
        
        if(rows === "Gagal"){
            return "Gagal" 
        }else{

            return rows
        }
        
    }catch(e){ 
        console.log(e)
        return "Gagal"
    } 
}

const vquery = async (r, param) => {
    try{
        //console.log(r.ipserver,r.user,r.pass,r.database, 3306, param)
        const rows = await zconn.zconn(r.ipserver,r.user,r.pass,r.database, 3306, param)
        
        if(rows === "Gagal"){
            return "Gagal" 
        }else{
            
            return rows
        }
        
    }catch(e){ 
        //console.log(e)
        return "Gagal"
    } 
}

const vqueryTembak = async (r, param) => {
    try{
        //console.log(r.ipserver,r.user,r.pass,r.database, 3306, param)
        const rows = await zconn.zconnTembak(r.ipserver,r.user,r.pass,r.database, 3306, param)
        
        if(rows === "Gagal"){
            return "Gagal" 
        }else{
            
            return rows
        }
        
    }catch(e){ 
        //console.log(e)
        return "Gagal"
    } 
}

const vquery_local = async (param) => {
    try{
        
        const [rows] = await conn_local.query(param)
        
        if(rows === "Gagal"){
            return "Gagal" 
        }else{

            return rows
        }
        
    }catch(e){ 
        console.log(e)
        return "Gagal"
    } 
}

const getListData =  async () => {
    try {   
       
       const querynya = `select * from iris.ttypefix where TTYPE='AP';`
       
       const result = await conn_local.query(querynya)
        
        return result
    } catch (error) {
        console.log(error)
        return "Error"
    }
}

const insertData =  async (data) => {
    try {   
       /* const querynya = `INSERT INTO glslp (KDCAB,TOKO,NAMA,ASPV,AMGR,TOK_DOMAIN,KODE,SUBKODE,\`DESC\`,AMOUNT_DR,AMOUNT_CR,NO_KSM,DOC_NO,REF_ID_TOKO,REF_2,PRD_GLSLP,ADDID,\`ADDTIME\`)
       values ?
       ` */
       const querynya = `replace into iris.ttypefix 
       (kdcab, shop, tanggal, station, shift, docno, ttype)
       VALUES  ?`
       
       const result = await conn_local.queryInsert(querynya, data)
        
        return result
    } catch (error) {
        console.log(error)
        return "Error"
    }
}
module.exports = {
    getListServer, getListServerBulanan, vquery_array,insertData,getListData,vquery,vquery_local,vqueryTembak
}

const ftp = require("basic-ftp")
module.exports = {
  ceckfile: async(ip,ftpdir) => {
    try {
      const client = new ftp.Client()
      client.ftp.verbose = false
      await client.access({
        host: ip,
        user: "posterm",
        password: "dAZAD9yq",
        secure: false
      })
       
       const a = await client.remove(ftpdir).then( (r) => { 
        client.close()  
        return "Sukses"
      })  
      /* const a = await client.list(`${ftpdir}`).then( (r) => { 
      
        if(r[0].name.length > 0){
          client.close() 
          return "Ada"
        }else{
          client.close() 
          return "Tidak Ada"
        } 
      })  */
      
      return a

     } catch(err) { 
       return "Gagal"     
    } 
    
  }
}  
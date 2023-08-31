const axios = require("axios");
async function query(query) {
  try {
    const result = await axios.post('http://192.168.131.71:7272/api/v1/mysql/query', {query : query}) 
    
    return result.data.data[0]
  } catch (error) {   
    
    return "Gagal"
  }
} 

module.exports = {
  query
}
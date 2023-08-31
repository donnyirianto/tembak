for(let i = 1; i<=31; i++ ){
    
    let tanggal = `2023-05-${i}`
    if(i < 10){
        tanggal = `2023-05-0${i}`
    }
    console.log(tanggal)
}
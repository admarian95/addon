generateRandomString=(count)=>{
    let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    let res ='';
    for(let i=0;i<count;i++){
        res += char[Math.floor(Math.random()*char.length)];
    }
    return res;
}

module.exports = {generateRandomString} ;
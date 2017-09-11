import crypto from 'crypto'

const privateKey = 'ed1764a547104dc388b3c82b899ad3f1'

const md5 = (str) =>{
    let md5sum = crypto.createHash("md5");
    md5sum.update(str.toString())
    str = md5sum.digest("hex")
    return str
}
const getTimestamp = () =>{
    return Math.floor(new Date().valueOf() / 1000).toString(16);
}

const convertCDNUrl = (url) =>{
    let timestamp = getTimestamp()
    return 'https://m.yunpub.cn/'+md5(privateKey + url + timestamp) + '/' + timestamp + url

}
export default convertCDNUrl
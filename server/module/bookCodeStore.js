/**
 * Created by tomson on 2017/4/7.
 */
import _cache from "memory-cache"
import _services from "../lib/requestProxyV2"
import * as _templates from '../config/templates_config'

const bookCodeStore = {}
bookCodeStore.get = async (code , itemType) =>{
    console.log(itemType)
    if (!code) {
        return 0
    } else {
        let resType = await _templates.textToType.get(itemType)
        console.log(resType)
        let req = {
            "bookCode":code ,
            "validCode":"" ,
            "codeResType":resType ,
            "codeType":1
        }
        console.log(req)
        let tresponse = await _services.getGoodsFromCode(req)
        console.log(tresponse)
        if (!tresponse || !tresponse.body || tresponse.body.length <= 0) {
            return 0
        } else {
            let itemId
            itemId = getMainBookId(tresponse.body , itemType)

            return itemId
        }


    }
}
const getMainBookId = (data , t) =>{
console.log(t)
    for (let i in data) {

        if (data[i].isMain == 1) {
            if (t == 'books' || t == 'ebooks')
                return data[i].bookid
            else if (t == 'bag') {
                return data[i].pgId
            }
            else {
                return data[i].goodsNum
            }
        }
    }
}
export default bookCodeStore
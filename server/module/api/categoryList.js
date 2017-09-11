'use strict';
import _cache from "memory-cache"
import _services from "../../lib/requestProxyV2"

const getCategoryList = async (req) =>{
    let data = _cache.get('indexCategorys')

    let arr = []
    if (data == null) {
        let tresponse = await _services.getCategoryList(req)
        if (tresponse && tresponse.body ) {

            let dataList = tresponse.body
            if (!!dataList && dataList.length > 0) {
                dataList.forEach(function (item){
                    arr.push(item)
                })
                _cache.put('indexCategorys' , arr , 60 * 60 * 1000)
            }
        }
    }
    arr =  data||arr
    return arr
}
export default getCategoryList
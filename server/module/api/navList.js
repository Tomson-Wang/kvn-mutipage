'use strict';
import _cache from "memory-cache"
import _services from "../../lib/requestProxyV2"

const getNavList = async (req) =>{
    let navs = _cache.get('indexNavs')

    let navInfo = []
    if (navs == null) {
        let tresponse = await _services.getNavList(req)
        if (tresponse && tresponse.body ) {

            let navList = tresponse.body
            if (!!navList && navList.length > 0) {
                navList.forEach(function (item){
                    navInfo.push(item)
                })
                _cache.put('indexNavs' , navInfo , 60 * 60 * 1000)
            }
        }
    }
    navInfo =  navs||navInfo
    return navInfo
}
export default getNavList
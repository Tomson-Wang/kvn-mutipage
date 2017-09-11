'use strict';
import _cache from "memory-cache"
import _services from "../../lib/requestProxyV2"

const getBannerList = async (req) =>{
    let banners = _cache.get('indexBanners')
    let bannerInfo = []
    if (banners == null) {
        let tresponse = await _services.getBannerList(req)
        if (tresponse && tresponse.body && tresponse.body.bannerList) {

            let bannerList = tresponse.body.bannerList
            if (!!bannerList && bannerList.length > 0) {
                bannerList.forEach(function (item){
                console.log(item)
                    bannerInfo.push(item)
                })
                _cache.put('indexBanners' , bannerInfo , 60 * 60 * 1000)
            }
        }
    }
    bannerInfo =  banners||bannerInfo
    return {bannerList:bannerInfo}
}
export default getBannerList
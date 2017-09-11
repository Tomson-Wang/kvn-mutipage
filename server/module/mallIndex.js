/**
 * Created by tomson on 2017/3/22.
 */
'use strict';
import _cache from "memory-cache"
import _services from "../lib/requestproxy"
const getMallIndex = async () =>{
    let response
    let data = _cache.get('mallIndexData')
    let banner = _cache.get('indexBanner')
    let bannerInfo = []
    if (data == null) {
        data = []
        let tresponse = await _services.getIndexItemInfo()
        let sectionList = tresponse.body
        console.log(sectionList)
        for (let v of sectionList) {

            let sresponse = await getItemInfo(v)

            if (sresponse && sresponse.body && sresponse.body.sectionContent.length > 0) {

                let sData = Object.assign({} , sresponse.body , {sectionType:v.itemType , sectionId:v.id})
                data.push(sData)
            }
        }

        if (data.length > 0) {
            _cache.put('mallIndexData' , data , 60 * 60 * 1000)
        }


    }
    if (banner == null) {
        let tresponse = await _services.getBannerList()
        if (tresponse && tresponse.body && tresponse.body.bannerList) {

            let bannerList = tresponse.body.bannerList
            if (!!bannerList && bannerList.length > 0) {
              bannerList.forEach(function(item){
                bannerInfo.push(item)
              })
              console.log(bannerInfo)
               _cache.put('indexBanner' , bannerInfo , 60 * 60 * 1000)
            }
        }
    }
    console.log(bannerInfo)
    console.log( {content:data , banner:bannerInfo})
    return {content:data , banner:bannerInfo}
}
const getItemInfo = async (item) =>{
    let tresponse = null

    let req = {
        "sectionId":item.id ,
        "pageInde":1 ,
        "step":3
    }
    switch (item.itemType) {
        case 1:
            tresponse = await _services.getAudioBooks(req)
            break
        case 4:
            tresponse = await _services.getCourses(req)
            break;
        case 3:
            tresponse = await _services.getReadParties(req)
            break;
        default:
            break;
    }
    return tresponse
}
export default getMallIndex
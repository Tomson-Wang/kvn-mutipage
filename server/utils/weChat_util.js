/**
 * Created by tomson on 2017/3/15.
 */
'use strict';
import * as _shareData from "../config/weChatShareContent"
const getWeChatShareData = (user , itemKey) =>{
    let currentShareData = _findOne(itemKey)
    if (user) {

        for (let k of Object.keys(currentShareData)) {
            console.log(k)
            currentShareData[k] = currentShareData[k].replace('{%userNickname%}' , user.nickname || "")
            if (k === "AppMessageImgUrl" || k === "TimeLineImgUrl") {
                currentShareData[k] = currentShareData[k].replace('{%userHeadImg%}' , user.headImg || "")
            }
        }
    }
    console.log(currentShareData)
    return currentShareData

}
const _findOne = (itemKey) =>{
    let r = null
    for (let v of _shareData.data) {
        if (v.itemKey === itemKey) {
            r = v
            break;
        }
    }
    r = r || _shareData.defaultData
    return r
}
export  {getWeChatShareData}
"use strict"
import _wxUtils from '../utils/wechatOAuth'
import config from '../config/config'

const getCurrentData = async ctx =>{
    let reqUrl = config.hostName + ctx.request.url.split('#')[0]
    let apiData= await _wxUtils.getJsApiData(reqUrl)
    return Object.assign({},{appid:config.weChatAppId},apiData)
}
const resetToken = async() =>{
console.log(1231312)
   let d=await _wxUtils.resetToken()
}
export default {getCurrentData,resetToken}
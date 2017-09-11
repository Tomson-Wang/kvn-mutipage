'use strict'

import config from '../../config/config';
import fetch from 'node-fetch'
import qs from 'querystring'

const getToken = async (code) =>{
    let queryParams = {

        appid:config.weChatAppId ,
        secret:config.weChatSecret ,
        code:code ,
        grant_type:'authorization_code'
    }

    let wxGetTokenBaseUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?' + qs.stringify(queryParams)
    console.log('getWxInfo')
    return fetch(wxGetTokenBaseUrl , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(tjson =>{
        console.log(tjson)
        return tjson
    })

}
export default getToken
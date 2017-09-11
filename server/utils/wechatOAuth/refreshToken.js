'use strict'

import config from '../../config/config';
import fetch from 'node-fetch'
import redisTool from './redisTools'
import qs from 'querystring'

let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
const getAccessToken = async () =>{
    console.log('getAccesToken in utils')
    let queryParams = {
        'grant_type':'client_credential' ,
        'appid':config.weChatAppId ,
        'secret':config.weChatSecret
    }

    let wxGetAccessTokenBaseUrl = 'https://api.weixin.qq.com/cgi-Bin/token?' + qs.stringify(queryParams)

    return fetch(wxGetAccessTokenBaseUrl , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(async tjson =>{
        console.log(tjson)
        let token = tjson['access_token']
        if (token) {
            await redisTool.setToken(token)
            return token
        }
    })

}

const refreshToken = async () =>{
    console.log('refreshToken')
    let token = await redisTool.getToken()
    if (!token && "development" == env) {
        token = await getAccessToken()
    }
    return token
}

export default refreshToken
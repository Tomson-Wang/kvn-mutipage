'use strict';
import fetch from 'node-fetch'
import qs from 'querystring'

const getUserInfo = async (AccessToken , openId) =>{

    let params = {
        access_token:AccessToken ,
        openid:openId ,
        lang:'zh_CN'
    }
    let wxGetUserUrl = 'https://api.weixin.qq.com/sns/userinfo?' + qs.stringify(params)
    console.log(wxGetUserUrl)
    return fetch(wxGetUserUrl , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(tjson =>{
        console.log(tjson)
        return tjson
    })
}

export default getUserInfo;
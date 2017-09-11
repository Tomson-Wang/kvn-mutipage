'use strict';

import fetch from 'node-fetch'
import crypto from 'crypto'
import refreshToken from './refreshToken'

const sha1 = (str) =>{
    var shasum = crypto.createHash("sha1");
    shasum.update(str)
    str = shasum.digest("hex")
    return str
}

const getJsApiTicket = async () =>{
    let token = await refreshToken()
    console.log('token::' + token)
    let reqUrl = 'https://api.weixin.qq.com/cgi-Bin/ticket/getticket?access_token=' + token + '&type=jsapi'
    let options = {
        method:'get' ,
        url:reqUrl
    };
    return fetch(reqUrl , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(tjson =>{
        let ticket = ''
        console.log(tjson)
        if (tjson && tjson.ticket) {
            ticket = tjson.ticket
        }
        return ticket
    })
}

const getNonceStr = () =>{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0 ; i < 16 ; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

const getTimestamp = () =>{
    return Math.floor(new Date().valueOf()/1000);
}

const getSign = (jsApiTicket , noncestr , timestamp , url) =>{
    let sortData = "jsapi_ticket=" + jsApiTicket + "&noncestr=" + noncestr + "&timestamp=" + timestamp + "&url=" + url;
    return sha1(sortData);
}
const getJsApiData = async clientUrl =>{
    let noncestr = getNonceStr();
    let timestamp = getTimestamp();
    let ticket = await getJsApiTicket()
    return {
        sign:getSign(ticket , noncestr , timestamp , clientUrl) ,
        timestamp:timestamp ,
        noncestr:noncestr
    }
}
export default getJsApiData
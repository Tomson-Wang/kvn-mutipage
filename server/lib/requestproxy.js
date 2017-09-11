/**
 * Created by tomson on 2016/12/12.
 */
'use strict'

import config from '../config/config';
import fetch from "node-fetch";

const _ = require("lodash");
const ajaxService = {}
console.log(config.serviceUrl)
for (let i in config.serviceUrl) {
    ajaxService[i] = async (req = {}) =>{
        let reqUrl = config.serviceHosts[_.random(1)] + config.serviceUrl[i]
        console.log('fetch' , reqUrl , req)
        return fetch(reqUrl , {
            method:'POST' ,
            headers:{
                'Content-Type':'application/json'
            } ,
            body:JSON.stringify(req)

        }).then(tresponse =>{

            return tresponse.json()
        }).then(tjson =>{
            // console.log('fetch' , reqUrl , req , tjson)
            return tjson
        }).catch(function (err){
            console.log('fetch-error:' , err)
            return {body:null}

        })
    }
}

for (let i in config.getServiceUrl) {

    ajaxService[i] = async () =>{
        let reqUrl = config.serviceHosts[_.random(1)] + config.getServiceUrl[i]
        console.log('fetch' , reqUrl)
        return fetch(reqUrl , {
            headers:{
                'Content-Type':'application/json'
            }

        }).then(tresponse =>{

            return tresponse.json()
        }).then(tjson =>{
            return tjson
        })
    }
}
ajaxService.getBookIdByCode = async (code) =>{
    const bookMap = {
        'w':'7592' ,
    }
    console.log('getBID' , code)
    if (isNaN(parseInt(code))) {
        if (code === 'w') {
            return '7592'
        }
    } else {
        return code
    }
    return '7592'

}
ajaxService.getSDKToken = async () =>{
    let url = config.serviceHosts[_.random(1)] + '/academy/api/weixin/getTicket'
    let url2 = 'http://112.126.93.98:8090/academy/api/weixin/getTicket'

    console.log('fetch' , url + '::' + url2)
    return fetch(url , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(tjson =>{
        if (tjson.header.code == '200') {
            return tjson
            console.log('fetch' , reqUrl , req , tjson)
        } else {
            return ''
        }
    })
}
export default ajaxService
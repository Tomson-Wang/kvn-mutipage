"use strict";
import fetch from "node-fetch"

const getCountryByIP = async (uip) =>{
    let reqUrl = 'http://freegeoip.net/json/' + uip
    return fetch(reqUrl , {
        method:'GET'
    }).then(tresponse =>{
        return tresponse.json()
    }).then(tjson =>{
        console.log(tjson)
        return tjson.country_code
    })


}
const checkPermissionFromIP = async (uip) =>{
    let uCountryCode = await getCountryByIP(uip)
    return "CN" === uCountryCode.toUpperCase()

}
export default checkPermissionFromIP
'use strict'

import config from '../config/config';
import fetch from "node-fetch";

const ajaxService = {}
ajaxService.getUserBindToken = async (req = {}) =>{
    let reqUrl = config.citicAuthHost + '/userBindToken'
    return fetch(reqUrl , {
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify(req)

    }).then(tresponse =>{
        let re
        try {
            re = tresponse.json()
        }
        catch (er) {
            console.log(er)
            return {body:null}
        }

        return re
    }).then(tjson =>{
        console.log('fetch' , reqUrl , req , tjson)
        return tjson
    })
}
ajaxService.refreshUserBindToken = async (req = {}) =>{

    let reqUrl = config.citicAuthHost + '/refreshUserBindToken'
    return fetch(reqUrl , {
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify(req)

    }).then(tresponse =>{
        let re
        try {
            re = tresponse.json()
        }
        catch (er) {
            console.log(er)
            return {body:null}
        }

        return re
    }).then(tjson =>{
        console.log('fetch' , reqUrl , req , tjson)
        return tjson
    })
}
ajaxService.getUserToken = async (req = {}) =>{

    let reqUrl = config.citicAuthHost + '/userToken'
    return fetch(reqUrl , {
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify(req)

    }).then(tresponse =>{
        let re
        try {
            re = tresponse.json()
        }
        catch (er) {
            console.log(er)
            return {body:null}
        }

        return re
    }).then(tjson =>{
        console.log('fetch' , reqUrl , req , tjson)
        return tjson
    })
}
ajaxService.updataCiticOpenId = async (req = {}) =>{

    // let reqUrl = config.citicAuthHost + '/userBindToken'
    let reqUrl = '/userBindToken'
    return fetch(reqUrl , {
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify(req)

    }).then(tresponse =>{
        let re
        try {
            re = tresponse.json()
        }
        catch (er) {
            console.log(er)
            return {body:null}
        }

        return re
    }).then(tjson =>{
        console.log('fetch' , reqUrl , req , tjson)
        return tjson
    })
}
export default ajaxService
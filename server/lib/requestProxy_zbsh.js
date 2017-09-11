'use strict'

import config from '../config/config';
import fetch from "node-fetch";

const _ = require("lodash");
const ajaxService = {}
for (let i in config.serviceUrlV2) {

    ajaxService[i] = async (req = {}) =>{
        let reqUrl = config.serviceHostZBSH[_.random(1)] + config.serviceUrlV2[i]
        console.log('fetch' , reqUrl , req)
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
        }).catch(function (err){
            console.log('fetch-error:' , err)
            return {body:null}

        })
    }
}
export default ajaxService
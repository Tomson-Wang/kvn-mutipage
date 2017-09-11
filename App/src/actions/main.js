/**
 * Created by tomson on 2016/12/28.
 */
import 'whatwg-fetch'
// let u='https://localhost:5000'
let u=''
export function getBoughtAudioList(cb){
    fetch(u+'/zxapi/getBoughtAudioList' , {
        credentials:'same-origin' ,
        method:'POST' ,
        headers:{
            'Content-Type':'application/json'
        } ,
        body:JSON.stringify({
            bookId:authData.bookId ,
            uid:authData.uid
        })
    }).then(function(tresponse){
        return tresponse.json()
    }).then(function(tjson){
        if (tjson.data) {
            let data = JSON.parse(JSON.stringify(tjson.data)) || []
            cb(data)
        }
    })
}
export function getCodeStat(code,cb){
  fetch(u+'/zxapi/getCodeStat' , {
    credentials:'same-origin' ,
    method:'POST' ,
    headers:{
      'Content-Type':'application/json'
    } ,
    body:JSON.stringify({
      bookId:authData.bookId ,
      uid:authData.uid,
      code:code
    })
  })
  .then(function(tresponse){
    return tresponse.json()
  })
  .then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function checkBoughtStatus(cb){
  fetch(u+'/zxapi/checkBoughtStatus' , {
    credentials:'same-origin' ,
    method:'POST' ,
    headers:{
      'Content-Type':'application/json'
    } ,
    body:JSON.stringify({
      bookId:authData.bookId ,
      uid:authData.uid
    })
  })
  .then(function(tresponse){
    return tresponse.json()
  })
  .then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function getBookReviews(cb){
  fetch(u+'/zxapi/getBookReviews',
    {
      credentials:'same-origin' ,
      method:'POST' ,
      headers:{
        'Content-Type':'application/json'
      } ,
      body:JSON.stringify({
        bookId:authData.bookId ,
        uid:authData.uid
      })
    })
  .then(function(tresponse){
    return tresponse.json()
  })
  .then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function getBookExcerpt(cb){
  fetch(u+'/zxapi/getDigestsByBid',
    {
      credentials:'same-origin' ,
      method:'POST' ,
      headers:{
        'Content-Type':'application/json'
      } ,
      body:JSON.stringify({
        bookId:authData.itemId ,
        uid:authData.uid
      })
    })
  .then(function(tresponse){
    return tresponse.json()
  })
  .then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function binded(bindCode,cb){
  fetch(u+'/zxapi/bindCode' , {
    credentials:'same-origin' ,
    method:'POST' ,
    headers:{
      'Content-Type':'application/json'
    } ,
    body:JSON.stringify({
      code:bindCode ,
      bookId:authData.bookId ,
      uid:authData.uid
    })
  }).then(function(tresponse){
    return tresponse.json()
  }).then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function getBookInfo(cb){
  fetch(u+'/zxapi/getBookInfo',
    {
      credentials:'same-origin' ,
      method:'POST' ,
      headers:{
        'Content-Type':'application/json'
      } ,
      body:JSON.stringify({
        uid:authData.uid ,
        bookId:authData.bookId
      })
    })
  .then(function(tresponse){
    return tresponse.json()
  })
  .then(function(tjson){
    if (tjson.data) {
      let data = JSON.parse(JSON.stringify(tjson.data)) || []
      cb(data)
    }
  })
}
export function trickAction(action){
    fetch('/caapiv2/action_types?' + action,{credentials:'same-origin', method:'GET'},)
}


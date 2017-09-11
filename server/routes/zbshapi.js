/**
 * Created by tomson on 2017/3/22.
 */
"use strict";

import Router from 'koa-router';
import _services from '../lib/requestProxy_zbsh'

const router = new Router()


//tab切换



/* 获取nav信息 */
router.post('/navList' , async (ctx , next) =>{
    let goodsId = ctx.request.body.itemId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "goodsNum":goodsId
        }
    }
    let tresponse = require("../mock/nav.json")
    let origin = tresponse.data
    ctx.body = {
        status:'200' ,
        data:origin
    }
})


/* 获取homeList信息 */
router.post('/homeList' , async (ctx , next) =>{
    let goodsId = ctx.request.body.itemId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "goodsNum":goodsId
        }
    }
    let tresponse = require("../mock/homeList.json")
    let origin = tresponse.data
    ctx.body = {
        status:'200' ,
        data:origin
    }
})





router.post('/getAudioSections' , async (ctx , next) =>{

    let bookId = ctx.request.body.bookId
      let req = {
        body:{
          "uid":ctx.session.uid ,
          "goodsNum":bookId
        }
      }
      console.log(req)
    let tresponse = await _services.getAudioSections(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取课程详情信息 */
router.post('/getCourse' , async (ctx , next) =>{
    let goodsId = ctx.request.body.itemId
    let courseId = ctx.request.body.resId
    console.log(ctx.session.uid)
    let req = {
         body:{
           "uid":ctx.session.uid ,
           "goodsNum":goodsId
         }
       }
    let tresponse = await _services.getCourse(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }


})
/* 获取课程详情信息 */
router.post('/essentialPage' , async (ctx , next) =>{
  let goodsId = ctx.request.body.itemId
  console.log(ctx.session.uid)
  let req = {
    body:{
      "uid":ctx.session.uid ,
      "goodsNum":goodsId
    }
  }
  let tresponse = await _services.essentialPage(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }


})
router.post('/getMyCollection' , async (ctx , next) =>{
    let goodsType = ctx.request.body.goodsType
    // let pageIndex = ctx.request.body.pageIndex
    let req = {
        "header":null ,
        "body":
            {
                "uid":ctx.session.uid ,
                "goodsType":goodsType ,
                "pageIndex":1 ,
                "step":999
            }
    }
    let tresponse = await _services.getMyCollection(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }


})
router.post('/goodsRecord' , async (ctx , next) =>{
  // let goodsType = ctx.request.body.goodsType
  let pageIndex = ctx.request.body.pageIndex
  let req = {
    "header":null ,
    "body":
      {
        "uid":ctx.session.uid ,
        // "goodsType":goodsType ,
        "pageIndex":pageIndex,
        "step":30
      }
  }
  let tresponse = await _services.goodsRecord(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})




/* 获取读书会详情信息 */
router.post('/getReadPartyInfo' , async (ctx , next) =>{
    let goodsNum = ctx.request.body.itemId
    console.log(ctx.session.uid)
    let req = {
      body:{
        "uid":ctx.session.uid ,
        "goodsNum":goodsNum
      }
    }
    let tresponse = await _services.getReadParty(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*  领取 */
router.post('/freeGet' , async (ctx , next) =>{
    let goodsId = ctx.request.body.itemId
    console.log(ctx.session.uid)
    let req = {
      body:{
        "uid":ctx.session.uid ,
        "goodsNum":goodsId
      }
    }
    console.log(345)
    let tresponse = await _services.freeGet(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取有声书版本列表 */
router.post('/audioEdition' , async (ctx , next) =>{
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
            "bookid":ctx.request.body.bookid ,
        }
    }
    let tresponse = await _services.audioEdition(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 栏目基本信息 */
router.post('/itemBaseInfo' , async (ctx , next) =>{
    let id = ctx.request.body.sectionId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "id":id
        }
    }
    let tresponse = await _services.itemBaseInfo(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})


/* 专题列表 */
router.post('/subList' , async (ctx , next) =>{
    let req = {
        body:{
            "uid":ctx.session.uid
        }

    }
    let tresponse = await _services.itemList(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取专题详情和子专题列表 */
router.post('/subColList' , async (ctx , next) =>{
    let req = {
        body:{
            "uid":ctx.session.uid
        }
    }
    let tresponse = await _services.subColList(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取专题下内容列表 */
router.post('/subGoodsList' , async (ctx , next) =>{

    let subTopicIdList = ctx.request.body.subTopicIdList
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "subTopicIdList":subTopicIdList
        }
    }
    console.log('subGoodsList')
    let tresponse = await _services.subGoodsList(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})

export default router
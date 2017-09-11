/**
 * Created by tomson on 2017/3/22.
 */
"use strict";

import Router from 'koa-router';
import logUtil from '../utils/log_util'
import _services from '../lib/requestproxy'
import _module from '../module'

const router = new Router()
/*获取列表页信息*/
router.post('/getSectionList' , async (ctx , next) =>{
    let sectionId = ctx.request.body.sectionId
    let pageIndex = ctx.request.body.pageIndex
    let sectionType = ctx.request.body.sectionType
    let step = ctx.request.body.step || 30
    let req = {
        'sectionId':sectionId ,
        'pageIndex':pageIndex ,
        'step':step
    }
    let tresponse = await _module.getSectionList(req , sectionType)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})
router.post('/getBookInfo' , async (ctx , next) =>{

    let bookId = ctx.request.body.bookId

    let req = {
      body:{
        "uid":ctx.session.uid ,
        "bookid":bookId
      }
    }
    let tresponse = await _services.getBookBasic(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/getBookComments' , async (ctx , next) =>{

    let bookId = ctx.request.body.bookId
    let step = ctx.request.body.step
    let pageIndex = ctx.request.body.pageIndex
    let req = {
      body:{
        "uid":ctx.session.uid ,
        "bookid":bookId ,
        "step":step ,
        "pageIndex":pageIndex
      }
    }
    let tresponse = await _services.getBookComments(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/getDigestsByBid' , async (ctx , next) =>{

    let bookId = ctx.request.body.bookId
    let step = ctx.request.body.step
    let pageIndex = ctx.request.body.pageIndex
    let req = {
        "uid":ctx.session.uid ,
        "bookId":bookId ,
        "step":step ,
        "pageIndex":pageIndex
    }
    let tresponse = await _services.getDigestsByBid(req)
    console.log(tresponse)
    let origin = tresponse.body
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
router.post('/getMyCollection' , async (ctx , next) =>{
    console.log(ctx.session.uid)
    let req = {
        "uid":ctx.session.uid
    }
    let tresponse = await _services.getMyCollection(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }


})
/*收藏接口*/
router.post('/likeDigest' , async (ctx , next) =>{
    let bdid = ctx.request.body.bdids
    let bid = ctx.request.body.bookId
    let flag = ctx.request.body.flag
    let req = {
        body:{
          "uid": ctx.session.uid,//必填
          "flag": flag,//FALSE为取消收藏，true为收藏
          "itemType": 7,//必填，从liketype改为itemtype，用来指出是对什么内容的收藏
          "itemId": bdid,//必填
          "datasource": 1 //为来源，1为微信等，必填
        }
    }
    let tresponse = await _services.likeDigest(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*取消收藏接口 */
router.post('/unlikeDigest' , async (ctx , next) =>{
    let bdid = ctx.request.body.bdids
    let bid = ctx.request.body.bookId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "bdids":bdid ,
            "bookId":bid
        }
    }
    let tresponse = await _services.unlikeDigest(req)
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
    let tresponse = await _services.freeGet(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*点赞接口 */
router.post('/likeCourseReadParty' , async (ctx , next) =>{
    let resId = ctx.request.body.itemId
    let flag = ctx.request.body.flag
    let itemtype = ctx.request.body.itemtype
    let req = {
        "uid":ctx.session.uid ,
        "itemId":resId ,
        "flag":flag ,//FALSE为取消点赞，true为点赞
        "itemType":itemtype ,//必填
        "datasource":1 //为来源，1为微信等，必填
    }
    let tresponse = await _services.likeCourseReadParty(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*移出书房  */
// router.post('/removegoods' , async (ctx , next) =>{
//   // let resId = ctx.request.body.itemId
//   // let flag = ctx.request.body.flag
//   // let likeType = ctx.request.body.likeType
//   let req = {
//     body:{
//       "uid":"7d3eb5ed-c392-4cf2-a22d-0a7a443a437d",
//       "id":1,
//       "goodsNum":"1314942318807167"
//     }
//   }
//   let tresponse = await _services.removegoods(req)
//   console.log(tresponse)
//   let origin = tresponse.body
//   ctx.body = {
//     status:'200' ,
//     data:origin
//   }
// })
/*加入书房*/
// router.post('/addgoods' , async (ctx , next) =>{
//   // let resId = ctx.request.body.itemId
//   // let flag = ctx.request.body.flag
//   // let likeType = ctx.request.body.likeType
//   let req = {
//     "uid":"7d3eb5ed-c392-4cf2-a22d-0a7a443a437d",
//     "id":1,
//     "goodsNum":"1314942318807167"
//   }
//   let tresponse = await _services.addgoods(req)
//   console.log(tresponse)
//   let origin = tresponse.body
//   ctx.body = {
//     status:'200' ,
//     data:origin
//   }
// })
/*视频页面接口 */
router.post('/video' , async (ctx , next) =>{
    let bid = ctx.request.body.bookid
    console.log(bid)
    let req = {
        "uid":ctx.session.uid ,
        "bookid":bid
    }
    let tresponse = await _services.video(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/getGoodsByCode' , async (ctx , next) =>{
    let bookCode = ctx.request.body.bookCode
    console.log(ctx.session.uid)
    let req = {
        "bookCode":bookCode
    }
    let tresponse = await _services.getGoodsByCode(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})

router.post('/getBookIdByBookCode' , async (ctx , next) =>{
    let bookCode = ctx.request.body.bookCode
    console.log(ctx.session.uid)
    let req = {
        "bookCode":bookCode
    }
    let tresponse = await _services.getBookIdByBookCode(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})

router.post('/checkCodeState' , async (ctx , next) =>{
    let bookCode = ctx.request.body.bookCode
    let validCode = ctx.request.body.validCode

    console.log(ctx.session.uid)
    let req = {
        "bookCode":bookCode ,
        "validCode":validCode ,
        "uid":ctx.session.uid
    }
    let tresponse = await _services.checkCodeState(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})


router.post('/bindValidCode' , async (ctx , next) =>{
    let bookCode = ctx.request.body.bookCode
    let validCode = ctx.request.body.validCode

    console.log(ctx.session.uid)
    let req = {
        "bookCode":bookCode ,
        "validCode":validCode ,
        "uid":ctx.session.uid
    }
    let tresponse = await _services.bindValidCode(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/listHotItems' , async (ctx , next) =>{
    let pageIndex = ctx.request.body.pageIndex
    let req = {
        "sectionId":60 ,
        "pageInde":pageIndex ,
        "step":30
    }
    let tresponse = await _services.listHotItems(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})


router.post('/createNewOrder' , async (ctx , nex) =>{
    let goodsId = ctx.request.body.goodsId
    let req = {
        "uid":ctx.session.uid ,
        "goodsId":goodsId
    }
    let tresponse = await _services.createOrder(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/unifiedOrder' , async (ctx , nex) =>{
    let orderId = ctx.request.body.orderId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "orderId":orderId
        }
    }
    let tresponse = await _services.getSign(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/checkOrderState' , async (ctx , nex) =>{

    let orderId = ctx.request.body.orderId
    let req = {
        "orderId":orderId

    }
    let tresponse = await _services.checkOrderState(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})
//新版功能
/* 获取书房标签列表 */
router.post('/roomNav' , async (ctx , next) =>{
  let req = {
    "uid":ctx.session.uid
  }
  let tresponse = await _services.roomNav(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 获取书房标签下图书列表 */
router.post('/roomBookList' , async (ctx , next) =>{
  let req = {
    "uid":ctx.session.uid,
    "tagid":ctx.request.body.tagid,
    "pageindex":1,
    "step":4
  }
  let tresponse = await _services.roomBookList(req)
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
    "uid":ctx.session.uid,
    "bookid":ctx.request.body.bookid,
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
  let req = {
    "uid":ctx.session.uid,
    "id":59
  }
  let tresponse = await _services.itemBaseInfo(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 首页具体一个栏目中的物品（资源／商品）列表 */
router.post('/itemList' , async (ctx , next) =>{
  let req = {
    "uid":ctx.session.uid,
    "id":59,//栏目ID
    "itemType":1,//栏目类型：1为有声书，2为每周视频，3为读书会，4为课程，5每日音频，6专题，7广告 8混合 9 年包
    "pageIndex":1,//请求页码，默认1代表第一页
    "step":10//每页数量，默认一页10条
  }
  let tresponse = await _services.itemList(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 年包类型列表 */
router.post('/bagList' , async (ctx , next) =>{
  let req = {
    "uid":ctx.session.uid,
    "bookid":ctx.request.body.bookid,
  }
  let tresponse = await _services.itemList(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 年包详情信息 */
router.post('/bagDetail' , async (ctx , next) =>{
  let req = {
    "uid":ctx.session.uid,
    "pgId":ctx.request.body.pgId
  }
  let tresponse = await _services.bagDetail(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 用户畅享包权益查询 */
router.post('/packageRight' , async (ctx , next) =>{
  let req = {
    "uid": "uuu",
    "id":["1"]
  }
  let tresponse = await _services.packageRight(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
/* 年包商品列表，带分页 */
router.post('/bagGoodsList' , async (ctx , next) =>{
  let req = {
    "pgNum":"808c17bc-ad72-4f0a-9b11-1b62e0da543d",
    "pageIndex":1,
    "step":2

  }
  let tresponse = await _services.bagGoodsList(req)
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
    "uid":ctx.session.uid,
    "bookid":ctx.request.body.bookid,
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
    "uid":ctx.session.uid,
    "bookid":ctx.request.body.bookid,
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
  let req = {
    "uid":ctx.session.uid,
    "bookid":ctx.request.body.bookid,
  }
  let tresponse = await _services.subGoodsList(req)
  console.log(tresponse)
  let origin = tresponse.body
  ctx.body = {
    status:'200' ,
    data:origin
  }
})
export default router
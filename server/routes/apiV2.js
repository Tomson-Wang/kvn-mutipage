/**
 * Created by tomson on 2017/3/22.
 */
"use strict";

import Router from 'koa-router';
import logUtil from '../utils/log_util'
import _services from '../lib/requestproxy'
import _servicesV2 from '../lib/requestProxyV2'
import _module from '../module/api'

const router = new Router()
/*中信联盟使用接口*/
router.post('/saveCiticOpenId' , async (ctx , next) =>{
    let req = {uid:ctx.request.body.user_id,openid:ctx.request.body.citic_open_id}
    let data = await _servicesV2.bindCiticOpenId(req)
    console.log('bind_citic_opem_id',req,data)
    ctx.body = data
})
router.post('/member/rights/list' , async (ctx , next) =>{
    let req = ctx.request.body
    let data = await _servicesV2.cluserRightsList(req)
    console.log('get_user_rights_list',req,data)
    ctx.body = data
})
router.post('/member/rights/get' , async (ctx , next) =>{
    let req = ctx.request.body
    let data = await _servicesV2.cluserRightsDetail(req)
    console.log('get_user_rights_detail',req,data)
    ctx.body = data
})
/*中信联盟使用接口*/

//banner列表
router.post('/getBannerList' , async (ctx , next) =>{
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
        }
    }
    let data = await _module.getBannerList(req)
    ctx.body = {
        status:'200' ,
        data:data
    }

})
//导航列表
router.post('/getNavList' , async (ctx , next) =>{
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
        }
    }
    let data = await _module.getNavList(req)
    console.log(data)
    ctx.heade = {}
    ctx.body = {
        status:'200' ,
        data:data
    }

})

//首页栏目
router.post('/getCategoryList' , async (ctx , next) =>{
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
        }
    }
    let data = await _module.getCategoryList(req)
    console.log('首页栏目是' , data)
    ctx.body = {
        status:'200' ,
        data:data
    }

})
//首页栏目  首页具体一个栏目中的物品（资源／商品）列表
router.post('/getTopList' , async (ctx , next) =>{
    let id = ctx.request.body.id
    let itemType = ctx.request.body.itemType
    let pageIndex = ctx.request.body.pageIndex
    let step = ctx.request.body.step
    console.log(id , itemType)
    let req = {
        // body: {
        "id":id ,
        "itemType":itemType ,
        "pageIndex":pageIndex ,//请求页码，默认1代表第一页
        "step":step ,//每页数量，默认一页10条
        // "uid": "uuuu"
        // }
    }
    let tresponse = await _servicesV2.getTopList(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})

/*获取列表页信息*/
router.post('/getSectionList' , async (ctx , next) =>{
    let sectionId = ctx.request.body.sectionId
    let pageIndex = ctx.request.body.pageIndex
    let sectionType = ctx.request.body.sectionType
    let step = ctx.request.body.step || 30

    let req = {
        "id":sectionId ,
        "itemType":sectionType ,
        "pageIndex":pageIndex ,//请求页码，默认1代表第一页
        "step":step ,//每页数量，默认一页10条

    }
    let tresponse = await _servicesV2.getTopList(req)
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
    let tresponse = await _servicesV2.essentialPage(req)
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
    let tresponse = await _servicesV2.getMyCollection(req)
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
                "pageIndex":pageIndex ,
                "step":30
            }
    }
    let tresponse = await _servicesV2.goodsRecord(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/bagRecord' , async (ctx , next) =>{
    let pageIndex = ctx.request.body.pageIndex
    let req = {
        "header":null ,
        "body":
            {
                "uid":ctx.session.uid ,
                // "goodsType":goodsType ,
                "pageIndex":pageIndex ,
                "step":30
            }
    }
    let tresponse = await _servicesV2.bagRecord(req)
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
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "bdids":bdid ,
            "bookId":bid
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
    console.log(345)
    let tresponse = await _servicesV2.freeGet(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*点赞接口 */
router.post('/likeCourseReadParty' , async (ctx , next) =>{
    let itemId = ctx.request.body.itemId
    let flag = ctx.request.body.flag
    let itemtype = ctx.request.body.itemtype
    let req = {
        "uid":ctx.session.uid ,
        "itemId":itemId ,
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
router.post('/removegoods' , async (ctx , next) =>{
    let itemId = ctx.request.body.itemId
    let goodsNum = ctx.request.body.goodsNum
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
            // "id":itemId ,
            "goodsNum":goodsNum
        }
    }
    let tresponse = await _servicesV2.removegoods(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*加入书房*/
router.post('/addgoods' , async (ctx , next) =>{
    let itemId = ctx.request.body.itemId
    let goodsNum = ctx.request.body.goodsNum
    let req = {
        header:{} ,
        body:{
            "uid":ctx.session.uid ,
            // "id":itemId ,
            "goodsNum":goodsNum
        }
    }
    let tresponse = await _servicesV2.addgoods(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/*视频页面接口 */
router.post('/video' , async (ctx , next) =>{
    let bid = ctx.request.body.bookid
    console.log(bid)
    let req = {
        "header":null ,
        "body":{
            "uid":ctx.session.uid ,
            "bookid":bid
        }
    }
    let tresponse = await _servicesV2.video(req)
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
    let phoneCode = ctx.request.body.phoneCode
    let phone = ctx.request.body.phone
    let codeType = ctx.request.body.codeType

    console.log(ctx.session.uid)
    let req = {
        "uid":ctx.session.uid ,
        "bookCode":bookCode ,
        "validCode":validCode ,
        "codeType":codeType ,
        "phoneCode":phoneCode ,//手机收到的验证码，试听码绑定时必填
        "phone":phone//手机号，试听码绑定时必填
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
    let goodsNums = ctx.request.body.goodsNums,
        rechargeId = ctx.request.body.rechargeId;
    let req = {
        "uid":ctx.session.uid ,
        "czuid":rechargeId , //当订单为充值订单时，czuid是需要被充值账户的uid
        "goodsNums":goodsNums,
        "targetPlatform":1 //当订单为充值订单时，1：ios账户,2:安卓账户
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
    let tresponse = await _servicesV2.roomNav(req)
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
        "uid":ctx.session.uid ,
        "tagid":ctx.request.body.tagid ,
        "pageindex":1 ,
        "step":4
    }
    let tresponse = await _servicesV2.roomBookList(req)
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
    let tresponse = await _servicesV2.audioEdition(req)
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
    let tresponse = await _servicesV2.itemBaseInfo(req)
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
        "uid":ctx.session.uid ,
        "bookid":ctx.request.body.bookid ,
    }
    let tresponse = await _servicesV2.itemList(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 年包详情信息 */
router.post('/bagDetail' , async (ctx , next) =>{
    let pgId = ctx.request.body.pgId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "pgId":pgId
        }
    }
    let tresponse = await _servicesV2.bagDetail(req)
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
        "uid":"uuu" ,
        "id":["1"]
    }
    let tresponse = await _servicesV2.packageRight(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 年包商品列表，带分页 */
router.post('/bagGoodsList' , async (ctx , next) =>{
    let pgNum = ctx.request.body.pgNum
    let pageIndex = ctx.request.body.pageIndex
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "pgNum":pgNum ,
            "pageIndex":pageIndex ,
            "step":10
        }
    }
    let tresponse = await _servicesV2.bagGoodsList(req)
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
            "uid":ctx.session.uid ,
            "bookid":ctx.request.body.bookid ,
        }

    }
    let tresponse = await _servicesV2.itemList(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取专题详情和子专题列表 */
router.post('/subColList' , async (ctx , next) =>{
    let topicId = ctx.request.body.topicId
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "topicId":topicId
        }
    }
    let tresponse = await _servicesV2.subColList(req)
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
    let tresponse = await _servicesV2.subGoodsList(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 获取手机验证码 */
router.post('/getPhoneCode' , async (ctx , next) =>{
    let phoneNum = ctx.request.body.phoneNum
    let req = {
        "phoneNumber":phoneNum ,//手机号
        "templateId":1//模板ID
    }
    let tresponse = await _servicesV2.getPhoneCode(req)
    console.log(tresponse)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 搜索 */
router.post('/searchList' , async (ctx , next) =>{
    let keyWord = ctx.request.body.keyWord
    let req = {
        body:{
            "uid":ctx.session.uid ,
            "goodsTypeList":[1,3,4,6,7],
            "keyWord":keyWord,
            "offset":0,
            "step":10
        }
    }

    let tresponse = await _servicesV2.searchList(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/searchListOrder' , async (ctx , next) =>{
    let keyWord = ctx.request.body.keyWord


    ctx.body = {
        status:'200' ,
        data:[1,3,4,6,7]
    }
})
/* 用户身份验证 */
router.post('/userCheck' , async (ctx , next) =>{
    let phone = ctx.request.body.phoneNum
    let req = {
        "uid":ctx.session.uid ,
        "phone":phone
    }
    let tresponse = await _servicesV2.userCheck(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
/* 检测验证码是否正确 */
router.post('/MessageCodeCheck' , async (ctx , next) =>{
    let phone = ctx.request.body.phoneNum
    let code = ctx.request.body.code
    let req = {
        "uid":ctx.session.uid ,
        "phoneNumber": phone,
        "code":code
    }
    let tresponse = await _servicesV2.MessageCodeCheck(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.get('/action_types' , async(ctx , next) =>{
    // logUtil.logResponse(ctx)

    console.log(789)
    ctx.body = 'ok'
    // await next()
})

/* 充值 */

/* 查询充值商品列表 */
router.post('/rechargeList' , async (ctx , next) =>{
    let keyWord = ctx.request.body.keyWord
    let req = {
        body:{
            "uid":ctx.session.uid
        }
    }

    let tresponse = await _servicesV2.rechargeList(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})

/* 查询账户余额 */
router.post('/balanceList' , async (ctx , next) =>{
    let uid = ctx.session.uid;
    console.log()
    let req = {
        "uid":uid ,//当前登录用户uid
        "czuid":uid,//要充值的账户uid，需要查询余额的uid
        "platformCode":1//查询目标平台（1：IOS  2：安卓）
    }

    let tresponse = await _servicesV2.balanceList(req)
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})



export default router
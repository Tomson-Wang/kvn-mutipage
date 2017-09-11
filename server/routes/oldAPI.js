/**
 * Created by tomson on 2017/3/30.
 */
'use strict';
import Router from 'koa-router';
import _services from '../lib/requestproxy'
import logUtil from '../utils/log_util'
const router = new Router();
router.get('/action_types' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    ctx.body = 'ok'
    await next()
})
router.post('/getSDKKey' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getSDKToken()
    ctx.body = {'header':{'code':200} , 'body':tresponse.body}
    await next()
})

router.post('/bindBag' , async (ctx , next) =>{
    console.log(ctx.request.body)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid
    //logUtil.logResponse(ctx)
    let tresponse = await _services.bindBag({
        'uid':uid ,
        'code':code
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

    await next()

})

router.post('/getBagInfo' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let bagCode = ctx.request.body.code , uid = ctx.request.body.uid || ctx.session.uid

    let tresponse = await _services.getBagInfo({"bagCode":bagCode , 'uid':uid})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
    console.log(ctx.body)


    await next()

})

router.post('/createBagOrder' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let uid = ctx.request.body.uid || ctx.session.uid ,
        givenOrderNum = ctx.request.body.onum || ctx.session.givenOrderNum

    let tresponse = await _services.createBagOrder({
        "codeGivenUid":uid ,
        'givenOrderNum':givenOrderNum ,
        bookids:["1404" , "7592"]
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
    console.log(ctx.body)


    await next()

})

router.post('/orderNumStat' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let uid = ctx.request.body.codeGivenUid || ctx.session.uid ,
        givenOrderNum = ctx.request.body.givenOrderNum || ctx.session.givenOrderNum
    console.log(uid , givenOrderNum)
    let tresponse = await _services.orderNumStat({"codeGivenUid":uid , 'givenOrderNum':givenOrderNum})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
    console.log(ctx.body)


    await next()

})

router.post('/getCodeStat' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId

    let tresponse = await _services.checkCodeStatus({"codeid":code})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
    console.log(ctx.body)


    await next()

})

router.post('/getBookBoughtStat' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    console.log(uid , bookId)
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getBoughtAudioList({uid:uid , bookid:bookId})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/bindCode' , async (ctx , next) =>{

    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    console.log(code , bookId , uid)
    //logUtil.logResponse(ctx)
    let tresponse = await _services.bindCode({codeid:code , bookid:'7592' , uid:uid})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/getBoughtBooks' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getBoughtBookList({uid:uid})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/getBoughtAudioList' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getBoughtAudioList({bookid:bookId , uid:uid})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/checkBoughtStatus' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    console.log(uid , bookId)
    //logUtil.logResponse(ctx)
    let tresponse = await _services.checkBoughtStatus({bookid:bookId , uid:uid})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})
router.post('/getBookReviews' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getBookReviews({bookid:bookId})
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})

router.post('/getDigestsByBid' , async (ctx , next) =>{
    console.log(ctx.request.body)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getDigestsByBid({
        'uid':uid ,
        'bookId':bookId ,
        'start':0 , 'end':9999
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})
router.post('/getBookInfo' , async (ctx , next) =>{
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    console.log('getBookInfo' , bookId)
    //logUtil.logResponse(ctx)
    if (!bookId) {
        ctx.body = {
            status:'400'
        }
    } else {
        let tresponse = await _services.getBookInfo({
            'bookId':bookId
        })
        let origin = tresponse.body
        ctx.body = {
            status:'200' ,
            data:origin
            // data:{"bookDigest":origin.bookDigest}
        }
    }
})
router.post('/getMyDigestsByBid' , async (ctx , next) =>{
    console.log(ctx.request.body)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId
    //logUtil.logResponse(ctx)
    let tresponse = await _services.getMyDigestsByBid({
        'uid':uid ,
        'bookId':bookId ,
        'start':0 , 'end':20
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }
})
router.post('/likeDigest' , async (ctx , next) =>{
    console.log(ctx.request.body)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId ,
        bdids = bdids ? [bdids] : []
    //logUtil.logResponse(ctx)
    let tresponse = await _services.likeDigest({
        'uid':uid ,
        'bookId':bookId ,
        'bdids':bdids
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})
router.post('/unlikeDigest' , async (ctx , next) =>{
    console.log(ctx.request.body)
    let code = ctx.request.body.code || ctx.session.code , uid = ctx.request.body.uid || ctx.session.uid ,
        bookId = ctx.request.body.bookId || ctx.session.bookId ,
        bdids = bdids ? [bdids] : []
    //logUtil.logResponse(ctx)
    let tresponse = await _services.unlikeDigest({
        'uid':uid ,
        'bookId':bookId ,
        'bdids':bdids
    })
    let origin = tresponse.body
    ctx.body = {
        status:'200' ,
        data:origin
    }

})


export default router;
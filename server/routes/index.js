/**
 * Created by tomson on 2017/3/14.
 */
'use strict';

import compose from 'koa-compose';
import Router from 'koa-router';
// import logUtil from '../utils/log_util'
import weChatAuth from '../middleware/OAuth'

import checkIP from '../utils/ipgeo'
import bookCodeStore from '../module/bookCodeStore'
import * as _templates from '../config/templates_config'

import wxJSModule from '../module/wxJsApiData'
import citicRightsModule from "../module/citicRights"
import RouterAPI from './api'
import RouterAPIV2 from './apiV2'
import zbshAPI from './zbshapi'
import partnerRouter from './partner'
import bookRouter from './books'
import isbnRouter from './isbn'
import marketingRouter from './marketing'
import citicAuthor from '../utils/citicOAuth'
import _config from '../config/config'

const fs = require('fs')
const path = require('path')
import _dev from './dev'

const router = new Router();

router.use('/caapiv2' , RouterAPIV2.routes() , RouterAPIV2.allowedMethods())

/*支部生活不上线*/
// router.use('/zbsh_api' , zbshAPI.routes() , zbshAPI.allowedMethods())
// router.use('/partner' , partnerRouter.routes() , partnerRouter.allowedMethods())
/*支部生活不上线*/
router.use('/caapi' , RouterAPI.routes() , RouterAPI.allowedMethods())
router.use('/books' , bookRouter.routes() , bookRouter.allowedMethods())
router.use('/isbn' , isbnRouter.routes() , isbnRouter.allowedMethods())
router.use('/marketing' , marketingRouter.routes() , marketingRouter.allowedMethods())
router.get('/resetToken' , async (ctx , next) =>{
    wxJSModule.resetToken()
    ctx.body = 'resetToken '
})

router.use('/citicLeague' , weChatAuth())
    .get('/citicLeague' , async (ctx , next) =>{
        let redUrl = await citicAuthor.getAccessUrl(ctx.session.weChatInfo.unionid)
        // console.log(redUrl)
        ctx.redirect(redUrl)
    })

router.get('/' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let apiData = await wxJSModule.getCurrentData(ctx)
    console.log(apiData)
    await ctx.render('mallIndex' , {
        'uid':ctx.session.uid ,
        'apiData':apiData
    })
})

router.use('/mall' , weChatAuth())
    .get('/mall' , async (ctx , next) =>{
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('mallIndex' , {
            'uid':ctx.session.uid ,
            'apiData':apiData
        })
    })

router.use('/section' , weChatAuth()).get('/section/:sectionId' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let sectionType = ctx.query.s_type
    let sectionId = ctx.params.sectionId
    let templeName = await _templates.sectionListTemplates.get(sectionType)
    let apiData = await wxJSModule.getCurrentData(ctx)
    if (!!templeName) {
        await ctx.render('./' + templeName , {
            'uid':ctx.session.uid ,
            'sectionId':sectionId ,
            'sectionType':sectionType ,
            'apiData':apiData
        })
    } else {
        ctx.redirect('/mall')
    }
})


router.use('/mine' , weChatAuth()).get('/mine' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./myCollection' , {
        'apiData':apiData ,
        'uid':ctx.session.uid
    })

})
router.use('/buyRecord' , weChatAuth()).get('/buyRecord' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./buyRecord' , {
        'apiData':apiData ,
        'uid':ctx.session.uid
    })
})
router.use('/bagRecord' , weChatAuth()).get('/bagRecord' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./bagRecord' , {
        'apiData':apiData ,
        'uid':ctx.session.uid
    })
})


router.use('/item' , weChatAuth()).get('/item/:itemId' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let sectionType = ctx.query.s_type
    let itemId = ctx.params.itemId
    let resId = ctx.query.res_id || (sectionType == 1 ? itemId : '')
    let templeName = await _templates.itemTemplates.get(sectionType)
    let apiData = await wxJSModule.getCurrentData(ctx)
    if (!!templeName) {
        await ctx.render('./' + templeName , {
            'uid':ctx.session.uid ,
            'itemId':itemId ,
            'resId':resId ,
            'sectionType':sectionType ,
            'apiData':apiData
        })
    } else {
        ctx.redirect('/mall')
    }
})

router.use('/videos' , weChatAuth()).get('/videos/:itemId' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let sectionType = ctx.query.s_type
    let itemId = ctx.params.itemId
    let resId = ctx.query.res_id || (sectionType == 1 ? itemId : '')
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./videos' , {
        'uid':ctx.session.uid , 'itemId':itemId , 'resId':resId , 'sectionType':sectionType
    })

})

router.use('/audios' , weChatAuth()).get('/audios/:itemId' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let sectionType = ctx.query.s_type
    let itemId = ctx.params.itemId
    let resId = ctx.query.res_id || (sectionType == 1 ? itemId : '')
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./audios' , {
        'uid':ctx.session.uid , 'itemId':itemId , 'resId':resId , 'sectionType':sectionType ,
        'apiData':apiData
    })

})
router.use('/1404' , weChatAuth())
    .get('/1404' , async (ctx , next) =>{
        ctx.redirect('/item/1404?s_type=1')
    })
router.use('/w' , weChatAuth())
    .get('/w' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let bookId = await bookCodeStore.get('w' , 'books')
        ctx.redirect('/item/' + bookId + '?s_type=1')
    })
    .get('/w/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=books&itemCode=w&code=' + ctx.params.code)
    })

router.use('/trial' , weChatAuth())
    .get('/trial/audiobook' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('./weekFree' , {
            'apiData':apiData ,
            'itemCode':'audiobook'
        })

    })
    .get('/trial/citic/getRights' , async (ctx , next) =>{
        if (!!ctx.query.rightsId) {
            let redirectUrl = await citicRightsModule.receive(ctx)
            let data = {}

            if (!redirectUrl) {
                data.btnText = "前往首页"
                data.title = "领取失败"
                data.url = _config.citicLeagueHost + "/lm-web/#/weal"
            } else {
                data.btnText = "查看权益"
                data.title = "领取成功"
                data.url = _config.citicLeagueHost + '/lm-web/#/card'
            }
            await ctx.render('./leagueRight' , data)
        } else {
            ctx.redirect('/mall')
        }
    })
    .get('trial/*' , async (ctx , next) =>{
        ctx.render('./404')
    })

router.use('/aboutZX' , weChatAuth())
    .get('/aboutZX' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('./aboutZX' , {
            'apiData':apiData ,
            'itemCode':'audiobook'
        })
    }).get('aboutZX/*' , async (ctx , next) =>{
    ctx.render('./404')
})
router.use('/lessons' , weChatAuth())
    .get('/lessons/:lessonsCode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let lessonsCode = ctx.params.lessonsCode

        let itemId = await bookCodeStore.get(lessonsCode , 'lessons')
        console.log(itemId)
        let apiData = await wxJSModule.getCurrentData(ctx)
        console.log(123)
        if (itemId === 0) {
            ctx.redirect('/mall')
        } else if (itemId == "") {
            if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemId + '.html')) {
                await  ctx.render('./templates/comingSoon/' + itemId , {
                    'apiData':apiData
                })
            } else
                await  ctx.render('./comingSoon' , {
                    'apiData':apiData
                })
        } else {


            ctx.redirect('/item/' + itemId + '?s_type=4')

        }

    })
    .get('/lessons/:lessonsCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=lessons&itemCode=' + ctx.params.lessonsCode + '&code=' + ctx.params.code)
    })

router.use('/rp' , weChatAuth())
    .get('/rp/:rpCode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let rpCode = ctx.params.rpCode
        let itemId = await bookCodeStore.get(rpCode , 'rp')
        console.log(itemId)
        if (itemId === 0) {
            ctx.redirect('/mall')
        } else if (itemId == "") {
            if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemId + '.html')) {
                await  ctx.render('./templates/comingSoon/' + itemId)
            } else
                await  ctx.render('./comingSoon')
        } else {


            ctx.redirect('/item/' + itemId + '?s_type=3')

        }

    })
    .get('/rp/:rpCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=rp&itemCode=' + ctx.params.rpCode + '&code=' + ctx.params.code)
    })

router.use('/ebooks' , weChatAuth())
    .get('/ebooks/:ebookCode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let ebookCode = ctx.params.ebookCode
        let itemId = await bookCodeStore.get(ebookCode , 'ebooks')
        console.log(itemId)
        if (itemId === 0) {
            ctx.redirect('/mall')
        } else if (itemId == "") {
            if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemId + '.html')) {
                await  ctx.render('./templates/comingSoon/' + itemId)
            } else
                await  ctx.render('./comingSoon')
        } else {
            ctx.redirect('/item/' + itemId + '?s_type=1')
        }

    })
    .get('/ebooks/:ebookCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=ebooks&itemCode=' + ctx.params.ebookCode + '&code=' + ctx.params.code)
    })
router.use('/nsebooks' , weChatAuth())
    .get('/nsebooks/:nsebooksCode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let ebookCode = ctx.params.ebookCode
        let itemId = await bookCodeStore.get(ebookCode , 'nsebooks')
        console.log(itemId)
        if (itemId === 0) {
            ctx.redirect('/mall')
        } else if (itemId == "") {
            if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemId + '.html')) {
                await  ctx.render('./templates/comingSoon/' + itemId)
            } else
                await  ctx.render('./comingSoon')
        } else {
            ctx.redirect('/item/' + itemId + '?s_type=12')
        }

    })
    .get('/nsebooks/:nsebooksCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=nsebooks&itemCode=' + ctx.params.nsebooksCode + '&code=' + ctx.params.code)
    })
router.use('/bag' , weChatAuth())
    .get('/bag/:bagCode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let bagCode = ctx.params.bagCode

        let bagId = await bookCodeStore.get(bagCode , 'bag')
        console.log(bagId)
        if (bagId === 0) {
            ctx.redirect('/mall')
        } else if (bagId == "") {
            if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemId + '.html')) {
                await  ctx.render('./templates/comingSoon/' + itemId)
            } else
                await  ctx.render('./comingSoon')
        } else {
            ctx.redirect('/item/' + bagId + '?s_type=9')
        }

    })
    .get('/bag/:bagCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('/bindCode?itemType=bag&itemCode=' + ctx.params.bagCode + '&code=' + ctx.params.code)
    })


router.use('/bindcode' , weChatAuth())
    .get('/bindcode' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let itemCode = ctx.query.itemCode
        let code = ctx.query.code
        let itemType = ctx.query.itemType
        console.log(ctx.session.uid)
        let apiData = await wxJSModule.getCurrentData(ctx)
        if (itemCode) {
            let itemId = await bookCodeStore.get(itemCode , itemType)

            if (itemId === 0) {
                ctx.redirect('/mall')
            } else if (itemId == "") {
                if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + itemIdCode + '.html')) {
                    await  ctx.render('./templates/comingSoon/' + itemId , {
                        'apiData':apiData
                    })
                } else
                    await  ctx.render('./comingSoon' , {
                        'apiData':apiData
                    })
            } else {
                await  ctx.render('./bindCode' , {
                    'codeType':_templates.textToType.get(itemType) ,
                    'uid':ctx.session.uid ,
                    'bookCode':itemCode ,
                    'code':code ,
                    'bookId':itemId ,
                    'codeTypeName':itemType ,
                    'apiData':apiData
                })
            }
        } else {
            await  ctx.render('./bindCode' , {
                'codeType':0 ,
                'uid':ctx.session.uid ,
                'bookCode':'' ,
                'code':'' ,
                'bookId':'' ,
                'codeTypeName':'' ,
                'apiData':apiData
            })
        }
    })
router.use('/wxpay' , weChatAuth()).get('/wxpay/:goodsId' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let authority = await checkIP(ctx.request.ip)
        console.log('authority' , authority)
        if (1 == ctx.query.limitStatus || authority) {
            let goodsId = ctx.params.goodsId
            let type = ctx.query.s_type
            let apiData = await wxJSModule.getCurrentData(ctx)
            console.log(type)
            if (type == 2) {
                await  ctx.render('./EbookPay' , {
                    'uid':ctx.session.uid ,
                    'goodsId':goodsId ,
                    'type':type ,
                    'apiData':apiData
                })
            } else {
                await  ctx.render('./payment' , {
                    'uid':ctx.session.uid ,
                    'goodsId':goodsId ,
                    'type':type ,
                    'apiData':apiData
                })
            }
        } else {
            await ctx.render('./noPurchasingAuthority')
        }

    }
)
router.use('/EbookPay' , weChatAuth())
    .get('/EbookPay' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('./EbookPay' , {
            'apiData':apiData ,
            'itemCode':'audiobook'
        })
    }).get('aboutZX/*' , async (ctx , next) =>{
    ctx.render('./404')
})
router.use('/reChargeLogin' , weChatAuth()).get('/reChargeLogin' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let tip = ctx.query.tip
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./reChargeLogin' , {
        'apiData':apiData ,
        'tip':tip,
        'uid':ctx.session.uid
    })
})
router.use('/phoneReCharge' , weChatAuth()).get('/phoneReCharge' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./phoneReCharge' , {
        'apiData':apiData ,
        'uid':ctx.session.uid
    })
})
router.use('/accountInfo' , weChatAuth()).get('/accountInfo' , async (ctx , next) =>{
    let accountType = ctx.query.a_type
    let apiData = await wxJSModule.getCurrentData(ctx)
    await ctx.render('./accountInfo', {
        'uid':ctx.session.uid ,
        'accountType':accountType ,
        'apiData':apiData
    })
})

router.use('/search' , weChatAuth()) // 搜索
    .get('/search' , async (ctx , next) =>{
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('./bookSearch' , {
            'uid':ctx.session.uid ,
            'apiData':apiData ,
            'itemCode':'audiobook'
        })
    })
    .get('/searchResult/:searchType' , async (ctx , next) =>{// 搜索结果加载页
        let searchVal = ctx.query.keyWord
        let searchType = ctx.params.searchType
        console.log(searchType,'sunny')
        let apiData = await wxJSModule.getCurrentData(ctx)
        await ctx.render('./bookSearchEnd' , {
            'uid':ctx.session.uid ,
            'searchType':searchType ,
            'keyWord':searchVal ,
            'apiData':apiData
        })
    })

router.get('*' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    ctx.redirect('/mall')
})
export default function routes(){
    return compose(
        [
            router.routes() ,
            router.allowedMethods()
        ]
    )
}

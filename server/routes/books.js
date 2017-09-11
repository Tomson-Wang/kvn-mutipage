"use strict";

import Router from 'koa-router';
import fs from 'fs'
import bookCodeStore from '../module/bookCodeStore'
import wxJSModule from '../module/wxJsApiData'
import weChatAuth from '../middleware/wechatAuth'
import logUtil from '../utils/log_util'

const router = new Router()

router.use('/:bookCode' , weChatAuth())
    .get('/:bookCode' , async (ctx , next) =>{
            let bookCode = ctx.params.bookCode
            let bookId
            //当bookcode为数字时,认为它是bookid
            if (bookCode.match(/^\d+$/)) {
                bookId = bookCode
            } else {
                bookId = await bookCodeStore.get(bookCode , 'books')

            }
            let apiData = await wxJSModule.getCurrentData(ctx)
            if (bookId === 0) {
                ctx.redirect('/mall')
            } else if (bookId == "") {
                if (fs.existsSync(__dirname + '/../views/templates/comingSoon/' + bookId + '.html')) {
                    await  ctx.render('./templates/comingSoon/' + bookId , {
                        'apiData':apiData
                    })
                } else
                    await  ctx.render('./comingSoon' , {
                        'apiData':apiData
                    })
            } else {


                ctx.redirect('/item/' + bookId + '?s_type=1')

            }

        }
    )
    .get('/:bookCode/:code' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        ctx.redirect('../../bindCode?itemType=books&itemCode=' + ctx.params.bookCode + '&code=' + ctx.params.code)
    })
export default router
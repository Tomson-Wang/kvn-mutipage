"use strict";

import Router from 'koa-router';
import wxJSModule from '../module/wxJsApiData'
import weChatAuth from '../middleware/wechatAuth'

const router = new Router()
router.use('/audiobook' , weChatAuth())
    .get('/audiobook' , async (ctx , next) =>{

        ctx.redirect('/item/' + bookId + '?s_type=1')

    })

export default router
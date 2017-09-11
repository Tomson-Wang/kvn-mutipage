"use strict";

import Router from 'koa-router';
import fs from 'fs'
import weChatAuth from '../middleware/wechatAuth'
import _services from '../lib/requestProxyV2'
import logUtil from '../utils/log_util'

const router = new Router()
const checkISBN13 = code =>{
    code = (code + '').replace(/[-\s]/g , '');
    if (!/^\d{12,13}$/.test(code)) return;
    var i = 1 , c = 0 , c1 = 0 , c2 = 0;
    for (; i < 12 ; i += 2)
        c1 += Math.floor(code.charAt(i));
    for (i = 0 ; i < 12 ; i += 2)
        c2 += Math.floor(code.charAt(i));
    c = 10 - (c1 + 3 * c2) % 10;
    return c == code.charAt(12);
}
router.use('/:isbn' , weChatAuth())
    .get('/:isbn' , async (ctx , next) =>{

        let isbn = ctx.params.isbn
        if ((/(^\d{9}$)|((^\d{13}$))/).test(isbn)) {
            isbn = isbn.length == 9 ? '9787' + isbn : isbn
            console.log(isbn)
            //if (checkISBN13(isbn)) {
            let req = {
                header:{} ,
                body:{
                    uid:ctx.session.uid ,
                    isbn:isbn
                }
            }
            let data = await _services.getBookIdByISBN(req)
            if (data.body&&data.body.bookId) {
                await ctx.redirect('/item/' + data.body.bookId + '?s_type=1')
            } else {
                await ctx.redirect('/mall')
            }

        } else {
            await ctx.redirect('/mall')
        }

        // ctx.redirect('/item/' + bookId + '?s_type=1')

    })

export default router
/**
 * Created by cbs on 2017/6/7.
 */
import Router from 'koa-router'

import logUtil from '../utils/log_util'
import weChatAuth from '../middleware/wechatAuth'
import {getWeChatShareData} from '../utils/weChat_util'
import _services from '../lib/requestproxy'
import getIndexModule from '../module/mallIndex'
import bookCodeStore from '../module/bookCodeStore'
import * as _templates from '../config/templates_config'
import RouterAPI from './api'
const router =new Router()
// router.get('/dailyListening' , async (ctx , next) =>{
//     let bookCode = ctx.query.bookCode
//     let bookId = await bookCodeStore.get(bookCode)
//     let code = ctx.query.code
//     console.log('...')
//     await  ctx.render('./dailyListening' , {
//       'uid':ctx.session.uid , 'bookCode':bookCode , 'code':code , 'bookId':bookId
//     })
//   })
// router.get('/weeklyVideo' , async (ctx , next) =>{
//   let sectionType = ctx.query.s_type
//   let sectionId = ctx.params.sectionId
//     await  ctx.render('./weeklyVideo' , {
//       'uid':ctx.session.uid , 'sectionType':sectionType , 'sectionId':sectionId
//     })
//   })
/*专题列表部分*/
router.get('/subList' , async (ctx , next) =>{
    let bookCode = ctx.query.bookCode
    let bookId = await bookCodeStore.get(bookCode)
    let code = ctx.query.code
    console.log('...')
    await  ctx.render('./subList' , {
      'uid':ctx.session.uid ,
      'sectionId':sectionId ,
      'sectionType':sectionType
    })
  })
/*年包列表部分*/
router.get('/bagList' , async (ctx , next) =>{
    let bookCode = ctx.query.bookCode
    let bookId = await bookCodeStore.get(bookCode)
    let code = ctx.query.code
    console.log('...')
    await  ctx.render('./bagList' , {
      'uid':ctx.session.uid , 'bookCode':bookCode , 'code':code , 'bookId':bookId
    })
  })
/*年包内容列表部分*/
router.get('/bagConList' , async (ctx , next) =>{
    let bookCode = ctx.query.bookCode
    let bookId = await bookCodeStore.get(bookCode)
    let code = ctx.query.code
    console.log('...')
    await  ctx.render('./bagConList' , {
      'uid':ctx.session.uid , 'bookCode':bookCode , 'code':code , 'bookId':bookId
    })
  })
/*专题详情部分*/
router.get('/subject' , async (ctx , next) =>{
    let bookCode = ctx.query.bookCode
    let bookId = await bookCodeStore.get(bookCode)
    let code = ctx.query.code
    console.log('...')
    await  ctx.render('./subject' , {
      'uid':ctx.session.uid , 'bookCode':bookCode , 'code':code , 'bookId':bookId
    })
  })
/*专题详情部分*/
router.get('/bagDetail' , async (ctx , next) =>{
    let bookCode = ctx.query.bookCode
    let bookId = await bookCodeStore.get(bookCode)
    let code = ctx.query.code
    console.log('...')
    await  ctx.render('./bagDetail' , {
      'uid':ctx.session.uid , 'bookCode':bookCode , 'code':code , 'bookId':bookId
    })
  })

export default router
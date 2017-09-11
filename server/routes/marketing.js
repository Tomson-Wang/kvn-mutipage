"use strict";

import Router from 'koa-router';
import weChatAuth from '../middleware/wechatAuth'
import convertCDNUrl from '../utils/aliyunCDN'
import wxJSModule from '../module/wxJsApiData'

const router = new Router()

router.use('/jd' , weChatAuth()).get('/jd/djyn' , async (ctx , next) =>{
    let longList = [
        {
            id:1 ,
            title:"庙宇" ,
            src:convertCDNUrl("/group1/M00/00/D0/Cqs08llxb6aALNPLAEYDz2qoirg254.mp3") ,
            duration:"06:19"
        } ,
        {
            id:2 ,
            title:"展馆" ,
            src:convertCDNUrl("/group1/M00/00/D8/CjN5vllxb6iAcuTNAEde4VAzi5w562.mp3") ,
            duration:"06:35"
        } ,
        {
            id:3 ,
            title:"餐厅" ,
            src:convertCDNUrl("/group1/M00/00/D4/CiyniFlxb6yABA21AGpYjioXXt4766.mp3") ,
            duration:"09:43"
        } ,
        {
            id:4 ,
            title:"文艺" ,
            src:convertCDNUrl("/group1/M00/00/D0/Cqs08llxb62AYa3DAGae7y1K3eU278.mp3") ,
            duration:"09:20"
        } ,
        {
            id:5 ,
            title:"居住" ,
            src:convertCDNUrl("/group1/M00/00/D4/CiyniFlxb6aAXyQ8ADIczmj7Nck180.mp3") ,
            duration:"03:25"
        } ,
    ]
    let shortList = [
        convertCDNUrl("/group1/M00/00/D4/CiyniFlxbvKAQrPWAAUZhhbWpjw030.mp3") ,
        convertCDNUrl("/group1/M00/00/D0/Cqs08llxbvKAP1SfAAT2D3zMQKQ701.mp3") ,
        convertCDNUrl("/group1/M00/00/D0/Cqs08llxbvKANIcdAAPbKDL1RAE468.mp3") ,
        convertCDNUrl("/group1/M00/00/D8/CjN5vllxbvKAI_i2AAP9fSxtnfA963.mp3") ,
        convertCDNUrl("/group1/M00/00/D8/CjN5vllxbvOADGUIAAawW0ysUqM305.mp3")
    ]
    let apiData = await wxJSModule.getCurrentData(ctx)

    await ctx.render('./marketing/djyn' , {
        shortList:shortList ,
        longList:longList ,
        uid:ctx.session.uid ,
        apiData:apiData
    })
    // await ctx.render('./djyn',{shortList:JOSN.stringify(shortList)})
})
export default router

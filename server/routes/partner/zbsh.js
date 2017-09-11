
import compose from 'koa-compose';
import Router from 'koa-router';
import oauth from '../../middleware/zbshOauth'
import * as _templates from '../../config/templates_config'

const router = new Router()
router.use('/oauth' , oauth()).get('/oauth' , async (ctx , next) =>{
    await ctx.render('./subject' , {
        'uid':ctx.session.uid
    })
})

router.use('/item' , oauth()).get('/item/:itemId' , async (ctx , next) =>{
    //logUtil.logResponse(ctx)
    let sectionType = ctx.query.s_type
    let itemId = ctx.params.itemId
    let resId = ctx.query.res_id

    let templeName = await _templates.zbshItemTemplates.get(sectionType)

    if (!!templeName) {
        await ctx.render('./partner/zbsh/' + templeName , {
            'uid':ctx.session.uid ,
            'itemId':itemId ,
            'resId':resId ,
            'sectionType':sectionType ,
        })
    } else {
        ctx.body = '404 Not Found'
    }
})
export default router
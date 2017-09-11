import Router from 'koa-router';
import oauth from '../../middleware/zbshOauth'
import * as _templates from '../../config/templates_config'

const router = new Router()

router.use('/zhibuwork' , oauth())
    .get('/zhibuwork' , async (ctx , next) =>{
        console.log('zhibw')
    })
    .get('/zhibuwork/oauth' , async (ctx , next) =>{
        console.log('oauth')
        console.log(ctx.session.uid)
        await ctx.render('./partner/zbsh/subject' , {
            'uid':ctx.session.uid
        })
    })

    .get('/zhibuwork/item/:itemId' , async (ctx , next) =>{
        //logUtil.logResponse(ctx)
        let sectionType = ctx.query.s_type
        let itemId = ctx.params.itemId
        let resId = ctx.query.res_id

        let templeName = await _templates.zbshItemTemplates.get(sectionType)
        console.log(templeName)
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
// router.use('/zhibuwork' , zbsh.routes() , zbsh.allowedMethods())

export default router
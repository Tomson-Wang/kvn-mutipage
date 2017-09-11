/**
 * Created by tomson on 2017/3/15.
 */
'use strict';

import Router from 'koa-router';
import _services from '../lib/mock'
import logUtil from '../utils/log_util'

const router = new Router();
router.use()
router.get('/emall', async(ctx,next)=>{
    //logUtil.logResponse(ctx)

});

export default router;
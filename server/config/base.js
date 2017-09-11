'use strict';

import compose from 'koa-compose'
import convert from 'koa-convert'
import cors from 'kcors'
import Serve from 'koa-static'
import Logger from 'koa-logger'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import staticCache from 'koa-static-cache'

import session from 'koa-generic-session'
import views from 'koa-views'
import path from 'path'
import redisStore from 'koa-redis'
import config from './config'
import logUtil from '../utils/log_util'

const favicon = require('koa-favicon');
const nunjucks = require('nunjucks')

export default function middleware(app){
    const env = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path.join(__dirname , '/../views') , {
            noCache:false ,
        })
    )
    app.proxy = true;
    app.use(favicon(__dirname + '/../public/favicon.ico'))
    app.use(cors({credentials:true}));
    app.use(Logger())
    app.use(bodyParser())
    app.use(mount("/" , staticCache(__dirname + '/../public/' , {maxAge:30 * 24 * 60 * 60 , gzip:true})))

    app.keys = ['CA-session-key']
    app.use(session({
        // key:'fbcitic:' ,
        // ttl:3600 ,
        store:new redisStore(config.redisConfig)
    }))
    app.use(async (ctx , next) =>{
        //响应开始时间
        const start = new Date();
        ctx.session.cookie.maxAge = 24 * 60 * 60 * 1000

        //响应间隔时间
        var ms;
        try {
            //开始进入到下一个中间件
            await next();
        } catch (error) {

            ms = new Date() - start;
            //记录异常日志
            logUtil.logError(ctx , error , ms);
        }
    });
   /* // app.use(async (ctx , next) =>{
    //     if (ctx.clientIP == '114.113.117.15') {
    //         await next();
    //     }
    // })*/
    app.use(views(path.join(__dirname , '/../views') , {
            options:{
                nunjucksEnv:env
            } ,
            map:{html:'nunjucks'}
        }
    ))


}
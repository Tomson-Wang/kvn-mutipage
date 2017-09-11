'use strict';

import Koa from 'koa'
import baseconfig from './config/base'
// import middleware from './middleware'
import routes from './routes'
import config from './config/config'
import fs from 'fs'
import logConfig from './config/log_config'

/**
 * np确定目录是否存在，如果不存在则创建目录
 */
let confirmPath = function (pathStr){

    if (!fs.existsSync(pathStr)) {
        fs.mkdirSync(pathStr)
        console.log('createPath: ' + pathStr)
    }
}

/**
 * 初始化log相关目录
 */
let initLogPath = function (){
    //创建log的根目录'logs'
    console.log('create logs dirs' , logConfig.baseLogPath)
    if (logConfig.baseLogPath) {
        confirmPath(logConfig.baseLogPath)
        //根据不同的logType创建不同的文件目录
        for (var i = 0 , len = logConfig.appenders.length ; i < len ; i++) {
            if (logConfig.appenders[i].path) {
                confirmPath(logConfig.baseLogPath + logConfig.appenders[i].path)
            }
        }
    }
}

initLogPath();
const app = new Koa();

//configure basic app
baseconfig(app)

//configure custom middleware
// app.use(middleware())

//configure custom routes
app.use(routes())

app.listen(config.app.port);
console.log("Server started, listening on port: " + config.app.port);

export default app
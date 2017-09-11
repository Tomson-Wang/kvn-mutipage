/**
 * Created by tomson on 2016/12/29.
 */
import log4js from 'log4js'
import log_config from '../config/log_config'

//加载配置文件
log4js.configure(log_config);

let logUtil = {};

let errorLogger = log4js.getLogger('errorLogger');
let resLogger = log4js.getLogger('resLogger');
let testLogger = log4js.getLogger('testLogger');
let sessionLogger = log4js.getLogger('sessionLogger');

//封装错误日志
// logUtil.logError = function (ctx , error , resTime){
//     if (ctx && error) {
//         errorLogger.error(formatError(ctx , error , resTime));
//     }
// }

//封装响应日志
// logUtil.logResponse = function (ctx){
//
//     if (ctx) {
//         // resLogger.info(formatBus(ctx));
//         resLogger.info(formatRes(ctx));
//     }
// }

// logUtil.logRedis = function (content){
//
//     testLogger.info(content)
// }
logUtil.logSession = function (content){

    sessionLogger.info(formatSession(content))
}

//格式化响应日志
let formatRes = function (ctx){
    let reqInfo = {uid:ctx.session.uid , sessionId:ctx.sessionId , clientIP:ctx.request.ip , bookId:ctx.session.bookId}
    let newRequest = Object.assign({} , reqInfo , ctx.query , JSON.parse(JSON.stringify(ctx.request)))
    let logText = new String();
    logText += JSON.stringify(newRequest)
    //响应日志结束
    logText += "\n"

    return logText;

}

let formatSession = function (ctx){

    let logText = new String();
    logText += ctx.session.uid + ',' + ctx.sessionId
    //响应日志结束
    logText += "\n"

    return logText;


}

//格式化错误日志
let formatError = function (ctx , err , resTime){
    var logText = new String()

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += formatReqLog(ctx.request , resTime)

    //错误名称
    logText += "err name: " + err.name + "\n"
    //错误信息
    logText += "err message: " + err.message + "\n"
    //错误详情
    logText += "err stack: " + err.stack + "\n"

    //错误信息结束
    logText += "*************** error log end ***************" + "\n"

    return logText
};

//格式化请求日志
let formatReqLog = function (req , resTime){

    var logText = new String()

    var method = req.method
    //访问方法
    logText += "request method: " + method + "\t"

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\t"

    //客户端ip
    logText += "request client ip:  " + req.ip + "\t"

    //开始时间
    let startTime
    //请求参数
    if (method === 'GET') {
        if (req.query) {
            logText += "request query:  " + JSON.stringify(req.query) + "\t"
        }

        // startTime = req.query.requestStartTime;
    } else {

        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\t"
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\t";

    return logText
}

module.exports = logUtil
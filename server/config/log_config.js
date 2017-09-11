var path = require('path');


//日志根目录
var baseLogPath = path.resolve(__dirname , '../../logs')
// var baseLogPath = path.resolve('/web/logs/node_ca')

//错误日志目录
var errorPath = "/error";
//错误日志文件名
var errorFileName = "error";
//错误日志输出完整路径
var errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// var errorLogPath = path.resolve(__dirname, "../logs/error/error");


//响应日志目录
var responsePath = "/response";
//响应日志文件名
var responseFileName = "response";
//响应日志输出完整路径
var responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
// var responseLogPath = path.resolve(__dirname, "../logs/response/response");

var testPath = '/test'
var testFileName = "test";
//响应日志输出完整路径
var testLogPath = baseLogPath + testPath + "/" + testFileName;

var sessionPath = '/session'
var sessionFileName = "session";
//响应日志输出完整路径
var sessionLogPath = baseLogPath + sessionPath + "/" + sessionFileName;


module.exports = {
    "appenders":[
        //错误日志:q
        // {
        //     "category":"errorLogger" ,             //logger名称
        //     "type":"dateFile" ,                   //日志类型
        //     "filename":errorLogPath ,             //日志输出位置
        //     "alwaysIncludePattern":true ,          //是否总是有后缀名
        //     "pattern":"-yyyy-MM-dd-hh.log" ,      //后缀，每小时创建一个新的日志文件
        //     "path":errorPath                     //自定义属性，错误日志的根目录
        // } ,
        // //响应日志
        // {
        //     "category":"resLogger" ,
        //     "type":"dateFile" ,
        //     "filename":responseLogPath ,
        //     "alwaysIncludePattern":true ,
        //     "pattern":"-yyyy-MM-dd-hh.log" ,
        //     "path":responsePath
        // } ,
        // {
        //     "category":"testLogger" ,
        //     "type":"dateFile" ,
        //     "filename":testLogPath ,
        //     "alwaysIncludePattern":true ,
        //     "pattern":"-yyyy-MM-dd-hh.log" ,
        //     "path":testPath
        // }
        // ,
        {
            "category":"sessionLogger" ,
            "type":"dateFile" ,
            "filename":sessionLogPath ,
            "alwaysIncludePattern":true ,
            "pattern":"-yyyy-MM-dd.log" ,
            "path":sessionPath
        }
    ] ,
    "levels":                                   //设置logger名称对应的的日志等级
        {
            "errorLogger":"ERROR" ,
            "resLogger":"ALL"
        } ,
    "baseLogPath":baseLogPath                  //logs根目录
}
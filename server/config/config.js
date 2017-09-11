"use strict";
const path = require("path");
const _ = require("lodash");

let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
let serviceHosts = ""
let devServiceHosts = []
let devServiceHostsZBSH = []

let citicLeagueHost = ''
let citicLeagueOauth = citicLeagueHost + '/authserver'
let citicLeaguePortal = citicLeagueHost + '/lm-web/#/home?type=3&'
let base = {
    app:{
        root:path.normalize(path.join(__dirname , "/..")) ,
        env:env ,
    } ,
};
let webservice = {
    checkCodeStatus:'/academy/validCode/status' ,
    bindCode:'/academy/validCode/bind' ,
    getBoughtBookList:'/academy/bookpurchase/list' ,
    getBoughtAudioList:'/academy/bookbuyedaudio/list' ,
    getVideoList:'/academy/bookvideo/list' ,
    checkBoughtStatus:'/academy/bookaudiobuyed/status' ,
    getBookReviews:'/academy/bookreview/list' ,
    getAuthUserInfo:'/academy/openwebchat/getAuthUserInfo' ,


    getBookInfo:'/academy/webchat/bookInfo' ,
    getDigestsByBid:'/academy/book/oneBookAllDigest' ,
    getMyDigestsByBid:'/academy/webchat/mineBookDigest' ,
    likeDigest:'/academy/webchat/storeBookDigest' ,
    unlikeDigest:'/academy/webchat/unStoreBookDigest' ,
    likeCourseReadParty:'/academy/bang/done' ,

    getCourses:'/academy/course/list' ,
    getReadParties:'/academy/club/list' ,
    getAudioBooks:'/academy/audio/list' ,
    getCoursesS:'/academy/course/short' ,
    getReadPartiesS:'/academy/club/short' ,
    getAudioBooksS:'/academy/audio/short' ,
    getCourse:'/academy/course/info' ,
    getReadParty:'/academy/club/info' ,
    getBookBasic:'/academy/book/basic' ,
    getAudioSections:'/academy/audio/info' ,
    getMyCollection:'/academy/user/room' ,
    getBookComments:'/academy/book/comment' ,
    getGoodsByCode:'/academy/code/goods' ,
    getBookIdByBookCode:'/academy/code/books' ,
    bindValidCode:'/academy/code/bind' ,
    checkCodeState:'/academy/code/status' ,
    video:'/academy/vedio/info' ,
    checkUsersRight:'/academy/code/validcoderightstaus' ,
    listHotItems:'/academy/essence/info' ,
    createOrder:'/academy/create/order' ,
    getSign:'/academy/JsConfig/unifiedorder' ,
    checkOrderState:'/academy/order/query' ,


}
let webserviceV2 = {
    getCourse:'/academy/course/info' ,
    getReadParty:'/academy/club/info' ,

    getAudioSections:'/academy/audio/info' ,
    getBookIdByISBN:'/academy/book/isbn' ,
    getBannerList:'/academy/banner/info' ,//banner
    getNavList:'/academy/nav/info' ,//导航条
    getCategoryList:'/academy/category/list' ,//栏目列表表
    getTopList:'/academy/category/goodsList' ,//栏目列表表
    packageRight:'/academy/right/package' ,//用户畅享包权益查询
    addgoods:'/academy/bookroom/addgoods' ,
    removegoods:'/academy/bookroom/removegoods' ,
    roomNav:'/academy/bookroom/taglist' , //书房标签列表
    roomBookList:'/academy/bookroom/taglist' , //获取标签下图书列表
    yearBagBase:'/academy/nianpg/detail' , //畅享基本信息
    audioEdition:'/academy/audio/list' ,//有声书版本列表
    editionInfo:'/academy/category/info' ,//有声书版本列表
    itemBaseInfo:'/academy/category/info' ,//栏目基本信息
    itemList:'/academy/category/toplist' ,//栏目中的物品（资源／商品）列表
    // dailyList:'/academy/category/toplist',//每日听书音频列表
    bagDetail:'/academy/nianpg/detail' ,//年包详情信息
    bagGoodsList:'/academy/nianpg/goodsList' ,//年包商品列表，带分页
    subColList:'/academy/topic/sublist' ,//获取专题详情和子专题列表
    subGoodsList:'/academy/topic/goodslist' ,//获取专题下内容列表
    getGoodsFromCode:'/academy/code/goods' ,//获取专题下内容列表
    getMyCollection:'/academy/bookroom/goodsList' ,
    video:'/academy/book/videolist' ,
    freeGet:'/academy/right/receive' ,
    updateAuthUserInfo:'/academy/user/update' ,
    getPhoneCode:'/academy/api/sendMessage' ,
    bindPhoneCode:'/academy/code/bind' ,
    essentialPage:'/academy/essential/info' , //浓缩书详情信息
    goodsRecord:'/academy/right/goods_list' , //已购记录的商品列表
    bagRecord:'/academy/right/pg_list' ,//已购记录的年包列表
    getCiticOpenId:'/academy/zx/userInfo' ,
    bindCiticOpenId:'/academy/zx/userSave' ,
    cluserRightsList:'/academy/zx/userRightsList' ,
    cluserRightsDetail:'/academy/zx/userRightsDetail' ,
    clUserRightsReceive:'/academy/zx/userRightsRecive' ,
    searchList:'/academy/search/list' ,//搜索
    rechargeList:'/academy/czgoods/list' ,//查询充值商品列表（充值）
    balanceList:'/academy/user/account' ,//查询账户余额（充值）
    userCheck:'/academy/user/uid' ,
    MessageCodeCheck:'/academy/api/validMessage',
}
let getWebservice = {
    getBannerList:'/academy/banner/info' ,
    getIndexItemInfo:'/academy/item/info'
}
let redBagService = {
    getMyBagList:'/academy/redbag/list' ,
    bindBag:'/academy/redbag/bind' ,
    createBagOrder:'/academy/redbag/create' ,
    getBagInfo:'/academy/redbag/get' ,
    orderNumStat:'/academy/redbag/orderNumStauts'
}
let specific = {
    development:{
        app:{
            port:5000 ,
            name:" Dev" ,
            excluded:"excluded_path"
        } ,
        redisConfig:{
            host:'127.0.0.1' ,
            port:'6379' ,
            ttl:600000
        } ,
        /*  mysql:{
         host:'localhost' ,
         port:3306 ,
         user:'test' ,
         password:'test' ,
         database:'test'
         } ,*/
        serviceHosts:devServiceHosts ,
        serviceHosts2:devServiceHosts ,
        serviceHostZBSH:devServiceHostsZBSH ,
        getServiceUrl:getWebservice ,
        serviceUrl:_.merge(webservice , redBagService) ,
        serviceUrlV2:webserviceV2 ,
        citicLeagueHost:citicLeagueHost ,
        citicAuthHost:citicLeagueOauth ,
        citicLeaguePortal:citicLeaguePortal ,
        citicChannelId:'' ,
        citicChannelSecret:'' ,
        hostName:'' ,
        weChatAppId:'' ,
        weChatSecret:''
    } ,
    production:{
        app:{
            port:process.env.PORT || 5000 ,
            name:"" ,
            excluded:"excluded_path"
        } ,
        redisConfig:{
            host:'' ,
            port:'' ,
            auth_pass:''
        } ,

        serviceHosts:serviceHosts ,
        serviceHost2:serviceHosts ,
        getServiceUrl:getWebservice ,
        serviceHostZBSH:devServiceHostsZBSH ,
        serviceUrl:_.merge(webservice , redBagService) ,
        serviceUrlV2:webserviceV2 ,
        citicLeagueHost:citicLeagueHost ,
        citicAuthHost:citicLeagueOauth ,
        citicLeaguePortal:citicLeaguePortal ,
        citicChannelId:'' ,
        citicChannelSecret:'' ,
        hostName:'' ,
        weChatAppId:'' ,
        weChatSecret:''
    } ,
    test:{
        app:{
            port:process.env.PORT || 5000 ,
            name:"Test" ,
            excluded:"excluded_path"
        } ,
        redisConfig:{
            host:'' ,
            port:'' ,
            auth_pass:''
        } ,

        /*   mysql:{
         host:'localhost' ,
         port:3306 ,
         user:'test' ,
         password:'test' ,
         database:'test'
         } ,*/
        serviceHosts:devServiceHosts ,
        serviceHosts2:[] ,
        getServiceUrl:getWebservice ,
        serviceHostZBSH:devServiceHostsZBSH ,
        serviceUrl:_.merge(webservice , redBagService) ,
        serviceUrlV2:webserviceV2 ,
        citicLeagueHost:citicLeagueHost ,
        citicAuthHost:citicLeagueOauth ,
        citicLeaguePortal:citicLeaguePortal ,
        citicChannelId:'' ,
        citicChannelSecret:'' ,

        hostName:'' ,
        weChatAppId:'' ,
        weChatSecret:''
    } ,
};

module.exports = _.merge(base , specific[env]);

/**
 * Created by tomson on 2017/3/15.
 */
'use strict';
let env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
import _services from "../lib/requestproxy"
import _servicesV2 from "../lib/requestProxyV2"
import config from '../config/config';
import _wxUtils from '../utils/wechatOAuth'
import _logUtil from '../utils/log_util'

export default function checkWeChatAuth(){
    return async function (ctx , next){
        if (ctx.session.uid) {
            await next();
        } else {
            let reff = ctx.request.header.referer || ''
            if (ctx.query.code) {
                let wxResponse = await _wxUtils.getToken(ctx.query.code)
                let wxUser = await _wxUtils.getUserInfo(wxResponse['access_token'] , wxResponse['openid'])
                let req1 = {
                    "nickname":wxUser.nickname ,
                    "unionid":wxUser.unionid ,
                    "headimgurl":wxUser.headimgurl ,
                    "openid":wxUser.openid

                }
                let user = await _servicesV2.updateAuthUserInfo(req1)
                ctx.session.weChatInfo = wxUser
                ctx.session.uid = user.body.uid
                _logUtil.logSession(ctx)
                await next()
            } else {

                let reg = new RegExp("(|&)uid=([^&]*)(&|$)" , "i")
                let r = ctx.req.url.match(reg)
                if (r != null) {
                    ctx.session.uid = decodeURIComponent(r[2]);
                    let user = await _services.getAuthUserInfo({body:{uid:ctx.session.uid}})
                    ctx.session.weChatInfo = user.body
                    _logUtil.logSession(ctx)
                    await next();

                } else {
                    let redirectUrl = encodeURIComponent(config.hostName + ctx.request.url)
                    console.log(redirectUrl)
                    let authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.weChatAppId + '&redirect_uri=' + redirectUrl +
                        '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
                    ctx.redirect(authUrl)
                }
            }
        }
    }
}
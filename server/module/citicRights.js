'use strict';
import _services from "../lib/requestProxyV2"

const citicRights = {}
citicRights.receive = async (ctx) =>{
    let redirectUrl
    if (ctx.session.uid && ctx.session.citicOpenId && ctx.query.rightsId) {
        let req = {
            uid:ctx.session.uid ,
            citicOpenId:ctx.session.citicOpenId ,
            rightsId:ctx.query.rightsId
        }
        console.log(req)
        let res = await _services.clUserRightsReceive(req)
        if ("success" === res.result.toString()) {
            switch (res.bizVO.goodsType) {
                case 1:
                    redirectUrl = "/item/" + res.bizVO.bookId + '?s_type=1'
                    break
                case 2:
                    // redirectUrl = "/item/" + bookId + '?s_type=2'
                    break
                case 3:
                    redirectUrl = "/item/" + res.bizVO.goodsNum + '?s_type=3'
                    break
                case 4:
                    redirectUrl = "/item/" + res.bizVO.goodsNum + '?s_type=4'
                    break
                case 5:
                    redirectUrl = "/item/" + res.bizVO.pgId + '?s_type=9'
                    break
                case 6:
                    redirectUrl = "/item/" + res.bizVO.bookId + '?s_type=1'
                    break
                case 7:
                    redirectUrl = "/item/" + res.bizVO.goodsNum + '?s_type=9'
                    break
            }

        }
        return redirectUrl
    }
}
export default citicRights
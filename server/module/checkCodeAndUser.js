/**
 * Created by tomson on 2017/4/7.
 */
'use strict';
import _services from "../lib/requestproxy"

const checkCodeAndUser = async (req) =>{
    let checkUser = await _services.checkUsersRight(req)
    if (checkUser.hasbind) {
        return 0
    }
    let checkCode = await _services.checkCodeState(req)
    if (checkCode.hasBind) {
        return 1
    } else {
        return 2
    }
}
export default checkCodeAndUser
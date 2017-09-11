/**
 * Created by tomson on 2017/3/27.
 */
'use strict';
import _services from "../lib/requestproxy"

const getSectionList = async (req,sectionType) =>{
    let tresponse = null

    console.log('get section list' , req)
    switch (sectionType) {
        case 1:
            tresponse = await _services.getAudioBooks(req)
            break
        case 4:
            tresponse = await _services.getCourses(req)
            break;
        case 3:
            tresponse = await _services.getReadParties(req)
            break;
        default:
            break;
    }
    console.log('get Section List result:',tresponse)
    return tresponse
}


export default getSectionList
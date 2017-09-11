/**
 * Created by tomson on 2017/3/22.
 */
'use strict';
import * as _routerTables from "../config/templates_config"

const getIndexRouter = (sectionType) =>{
    let _href = _routerTables.mallIndexRouterTable.get(sectionType.toString())
    return href
}
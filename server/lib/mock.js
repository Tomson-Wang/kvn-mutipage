/**
 * Created by tomson on 2017/3/15.
 */
'use strict'
const ajaxService = {}

ajaxService.getIndexPageList = () =>{
    return {
        "contentLists":[{
            "sectionType":0 ,                    //栏目类型 ,0:有声书;1:课程;2:读书会
            "sectionTitle":"精品有声书" ,         //栏目标题
            "displayTypeId":"" ,                 //显示类型id
            "sectionContent":[                  //栏目内容列表,最多三条数据
                {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                } ,
                {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                } , {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                }
            ]
        } , {
            "sectionType":1 ,                    //栏目类型 ,0:有声书;1:课程;2:读书会
            "sectionTitle":"精品课程" ,         //栏目标题
            "displayTypeId":"" ,                 //显示类型id
            "sectionContent":[                  //栏目内容列表,最多三条数据
                {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                } ,
                {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                } , {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                }
            ]
        } , {
            "sectionType":2 ,                    //栏目类型 ,0:有声书;1:课程;2:读书会
            "sectionTitle":"大咖读书会" ,         //栏目标题
            "displayTypeId":"" ,                 //显示类型id
            "sectionContent":[                  //栏目内容列表,最多三条数据
                // {
                //     "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                //     "itemImg":"" ,               //封面图片地址
                //     "itemTitle":"test" ,             //内容名称
                //     "itemAuthor":"test" ,             //作者姓名
                //     "hasAudio":true ,            //内容名称
                //     "hasVideo":true ,            //作者姓名
                //     "price":100                 //价格
                // } ,
                {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                } , {
                    "itemId":7605 ,              //内容Id,有声书为图书id,课程为课程id,读书会为读书会id
                    "itemImg":"" ,               //封面图片地址
                    "itemTitle":"test" ,             //内容名称
                    "itemAuthor":"test" ,             //作者姓名
                    "hasAudio":true ,            //内容名称
                    "hasVideo":true ,            //作者姓名
                    "price":100                 //价格
                }
            ]
        }]
    }
}

let d1 = {
    "itemId":123 ,                 //内容Id,有声书为图书id
    "itemImg":"" ,                 //封面图片地址
    "itemTitle":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,               //内容名称
    "itemAuthor":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,              //作者姓名
    "itemDescription":"不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听"          //内容描述
}
let dd1 = []
for (let i = 0 ; i < 30 ; i++) {
    dd1.push(d1)
}
let d2 = {
    "itemId":123 ,                 //内容Id,课程为课程id
    "itemImg":"" ,                 //封面图片地址
    "itemTitle":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,               //内容名称
    "itemAuthor":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,              //作者姓名
    "price":100 ,                  //价格
    "itemDescription":"不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听"          //内容描述
}
let dd2 = []
for (let i = 0 ; i < 30 ; i++) {
    dd2.push(d2)
}
let d3 = {
    "itemId":"" ,                  //内容Id,读书会为读书会id
    "itemImg":"" ,                 //封面图片地址
    "itemTitle":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,               //内容名称
    "itemAuthor":"能满足我们队生命、地球和宇宙等" ,              //作者姓名
    "price":100 ,                  //价格
    "itemDescription":"不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听"          //内容描述
}
let d32 = {
    "itemId":"" ,                  //内容Id,读书会为读书会id
    "itemImg":"" ,                 //封面图片地址
    "itemTitle":"能满足我们队生命、地球和宇宙等能满足我们队生命、地球和宇宙等" ,               //内容名称
    "itemAuthor":"能满足我们队生命、地球和宇宙等" ,              //作者姓名
    "price":100 ,                  //价格
    "itemDescription":"不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听，更能满足我们队生命、地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心地球和宇宙等宏观问题的好奇心不仅是看清人类世界的快捷听不仅是看清人类世界的快捷听"          //内容描述
}
let dd3 = []
for (let i = 0 ; i < 5 ; i++) {
    dd3.push(d32)
}
for (let i = 0 ; i < 25 ; i++) {
    dd3.push(d3)
}
ajaxService.getSectionList = (req) =>{
    let data = {}
    switch (req.sectionId) {
        case 0:

            data = {
                "sectionTitle":"精品有声书" ,           //栏目名称
                "pageTotal":5 ,                        //总计页数
                "currentPageIndex":req.pageIndex ,                 //当前页码
                "sectionContent":dd1
            }
            break;
        case 1:

            data = {
                "sectionTitle":"精品课程" ,             //栏目名称
                "pageTotal":5 ,                        //总计页数
                "currentPageIndex":req.pageIndex ,                 //当前页码
                "sectionContent":dd2
            }
            break;
        case 2:

            data = {
                "sectionTitle":"大咖读书会" ,           //栏目名称
                "pageTotal":5 ,                        //总计页数
                "currentPageIndex":req.pageIndex ,                 //当前页码
                "sectionContent":dd3
            }
            break;
        default:
            break
    }
    return {'body':data}
}
export default ajaxService


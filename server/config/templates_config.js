/**
 * Created by tomson on 2017/3/22.
 */
"use strict";
export const sectionListTemplates = new Map([
    ['1' , 'sectionList'] ,
    ['2' , 'weeklyVideo'] ,
    ['3' , 'sectionList'],
    ['4' , 'sectionList'] ,
    ['5' , 'dailyListening'] ,
    ['6' , 'subList'] ,
    ['8' , 'sectionList'] ,
    ['9' , 'bagList'],
    ['10', 'bagConList'],
    ['11', 'sectionList'],
    ['12', 'sectionList']
])
export const itemTemplates = new Map([
    ['1' , 'book'] ,
    ['4' , 'course'] ,
    ['3' , 'readParty'],
    ['6' , 'subject'] ,
    ['9' , 'bagDetail'],
    ['12','essentialPage']
])

export const zbshItemTemplates = new Map([
    ['1' , 'audios'] ,
    ['4' , 'course'] ,
    ['3' , 'readParty'],
    ['6' , 'subject']
])
export const textToType = new Map([
    ['books' , 1] ,
    ['lessons' , 4] ,
    ['rp',3],
    ['bag',9],
    ['nsebook',12],
    ['ebook',11]
])
export const typeToText = new Map([
    ['1','Books' ] ,
    ['4','lessons' ] ,
    ['3','rp'],
    ['9','bag'],
    ['12','essentialPage']
])
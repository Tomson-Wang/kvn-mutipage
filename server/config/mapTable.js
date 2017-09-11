/**
 * Created by tomson on 2017/3/22.
 */
export const indexSectionTable = {
    "audioBook":0 ,
    "course":1 ,
    "readParty":2 ,
}
export const getSectionKey = (id) =>{
    const _map = new Map([
        ['0' , 'audioBook'] , ['1' , "course"] , ['2' , "readParty"]

    ])
    return _map.get(id.toString())
}
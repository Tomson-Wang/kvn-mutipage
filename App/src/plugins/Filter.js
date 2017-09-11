/**
 * Created by tomson on 2017/4/7.
 */
import Vue from 'vue'

Date.prototype.Format = function (fmt){
    var o = {
        "M+":this.getMonth() + 1 ,
        "d+":this.getDate() ,
        "h+":this.getHours() ,
        "m+":this.getMinutes() ,
        "s+":this.getSeconds() ,
        "q+":Math.floor((this.getMonth() + 3) / 3) ,
        "S":this.getMilliseconds()

    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1 , (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1 , (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
Vue.filter('formatLikeNum' , value =>{
    return value > 999 ? '999+' : value
})
Vue.filter('time', function(value) {
    var date = new Date(value)
    var  Y = date.getFullYear()
    var  m = date.getMonth() + 1
    var  d = date.getDate()
    var  H = date.getHours()
    var  i = date.getMinutes()
    var  s = date.getSeconds()
    if (m < 10) {
      m = '0' + m;
    }
    if (d < 10) {
      d = '0' + d;
    }
    if (H < 10) {
      H = '0' + H;
    }
    if (i < 10) {
      i = '0' + i;
    }
    if (s < 10) {
      s = '0' + s;
    }
    var t = Y+'-'+m+'-'+d;
    return t;
  })
Vue.filter('fullTime', function(value) {
  var date = new Date(value)
  var  Y = date.getFullYear()
  var  m = date.getMonth() + 1
  var  d = date.getDate()
  var  H = date.getHours()
  var  i = date.getMinutes()
  var  s = date.getSeconds()
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (i < 10) {
    i = '0' + i;
  }
  if (s < 10) {
    s = '0' + s;
  }
  var t = Y+'-'+m+'-'+d+' '+H+':'+i+':'+s
  return t;
})
Vue.filter('formatPrice' , value =>{
    let newPrice = ''
    if (value && value > 0) {
        newPrice = "￥" + value / 100
    }

    return newPrice
})
Vue.filter('decode' , value =>{
    let t = decodeURIComponent(value)
    return t
})
Vue.filter('formatDateTime' , value =>{
    let t = !!value ? new Date(value).Format('MM-dd hh:mm') : ''
    return t
})
Vue.filter('millisecondToDate' , time =>{
    const second = Math.floor(time % 60)
    let minite = Math.floor(time / 60)
    return (minite + ':' + (second >= 10 ? second : '0' + second))
})
Vue.filter('intro' , con =>{
    const newCon = con.replace(/\n/g , "<br/>")
    return newCon
})

Vue.filter('cornerText' , itemType =>{
    let cornText = ''
    switch (itemType) {
        case 1:
            cornText = '有声书'
            break
        case 2:
            cornText = '每周视频'
            break
        case 3:
            cornText = '精读'
            break
        case 4:
            cornText = '课程'
            break
        case 5:
            cornText = '每日音频'
            break
        case 6:
            cornText = '专题'
            break
        case 7:
            cornText = '广告'
            break
        case 9:
            cornText = '年包'
            break
        case 11:
            cornText = '电子书'
            break
        case 12:
            cornText = '浓缩书'
            break
        default:
            cornText = ''
            break
    }
    return cornText
})
Vue.filter('subText' , itemType =>{
  let text = ''
  // 1为有声书，2为视频，3为读书会，4为课程 5 年包 6 电子书，7 浓缩书
  switch (itemType) {
    case 1:
      text = '有声书'
      break
    case 2:
      text = '每周视频'
      break
    case 3:
      text = '精读'
      break
    case 4:
      text = '课程'
      break
    case 5:
      text = '年包'
      break
    case 6:
      text = '电子书'
      break
    case 7:
      text = '浓缩书'
      break
    default:
      text = ''
      break
  }
  return text
})


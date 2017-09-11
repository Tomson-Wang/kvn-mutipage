/**
 * Created by tomson on 2016/11/1.
 */

var shareData = {};
shareData.title = '中信书院';// 分享标题
shareData.link = location.href; // 分享链接
shareData.imgUrl = '';
window.onload = function () {
  $.ajax({
    url: 'https://v.yunpub.cn/academy/api/weixin/getTicket',
    type: 'get',
    success: function (res) {
      if (res.header.code == 200) {
        (function () {
          wx.config({

            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.body.appid, // 必填，公众号的唯一标识
            timestamp: res.body.nowTimeStr, // 必填，生成签名的时间戳
            nonceStr: res.body.nowRandomStr, // 必填，生成签名的随机串
            signature: res.body.signstr,// 必填，签名，见附录1
            jsApiList: [
              'checkJsApi', 'onMenuShareTimeline', 'showMenuItems'
              'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        })();
      }
    }
  });

}
wx.ready(function () {
  wx.showMenuItems({
    menuList: [
      'menuItem:profile', // 添加查看公众号
      'menuItem:addContact'
    ]
  });
  wx.onMenuShareTimeline({
    title: shareData.title, // 分享标题
    link: shareData.link, // 分享链接
    imgUrl: shareData.imgUrl, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      alert('1')
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
  wx.onMenuShareAppMessage({
    title: shareData.title, // 分享标题
    desc: shareData.desc, // 分享描述
    link: shareData.link, // 分享链接
    imgUrl: shareData.imgUrl, // 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });
});

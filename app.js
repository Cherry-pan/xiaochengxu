//app.js
import {
  $get
} from '/utils/common.js'
App({
  onLaunch: function() {
    wx.login({
      success: function({
        code
      }) {
        // console.log(code)
        //发起网络请求
        wx.request({
          url: 'http://192.168.43.208:8088/wx/getopenid',
          data: {
            code
          },
          success: function(res) {
            wx.setStorage({
              key: 'openid',
              data: res.data.openid
            })
          }
        })
      }
    });
  }
})
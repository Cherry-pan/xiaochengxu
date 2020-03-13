// pages/pay/index.js

Page({
  buy() {
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        wx.request({
          url: 'http://192.168.43.208:8088/wx/unifiedorder',
          data: {
            openid: res.data
          },
          success: function(res) {
            // console.log(res)
            wx.requestPayment({
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              paySign: res.data.paySign,
              success: function(res) {
                console.log(res)
              },
              fail: function(res) {
                console.log(res)
              }
            })
          },
          fail: function(res) {
            console.log(res)
          },
        })
      }
    })


  },


  /**
   * 页面的初始数据
   */
  data: {
    goodsinfo: [],
    address: "小行路16号",
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options)
    this.setData({
      goodsinfo: options
    })
    // console.log(this.data.goodsinfo)
    // wx.getStorage({      
    //   key: 'storageCode',
    //   success: function (res) {
    //     console.log(res)
    //     // code:res
    //   },
    //   fail:function(res){
    //     console.log(res)
    //   }
    // })
    // wx.request({
    //   url: 'http://127.0.0.1:8888/getOpenId',
    //   data: {
    //     appid: "wx558806d044728f84",
    //     secret: "b3537689da4e6dbde002d3245a3a2bfc",
    //     grant_type:"authorization_code"
    //   },
    //   method: 'POST',
    //   success: function(res) {
    //     console.log(res)
    //   }      
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
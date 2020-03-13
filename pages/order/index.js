// pages/order/index.js
import {
  $getData,
  $get
} from '../../utils/common.js'
Page({
  onChange(e) {
    console.log(e)
    this.data.orderType = e.detail.index - 1
    this.data.pageIndex = 1
    this.setData({
      orderList: []
    })
    this.orderList()
  },

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
    pageIndex: 1,
    orderType: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.orderList()
  },
  async orderList() {
    let orderList = await $get('http://www.simbajs.com:7777/order/orderlist', {
      pageIndex: this.data.pageIndex,
      pageSize: 10,
      type: this.data.orderType
    })

    if (orderList.length === 0) {
      wx.showToast({
        title: '没有加载更多了',
        icon: "none"
      })
      return
    }

    this.setData({
      orderList: this.data.orderList.concat(orderList) //concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
    })
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
    setTimeout(() => {
      wx.stopPullDownRefresh() //300毫秒之后停止刷新
    }, 300)
    this.data.pageIndex = 1 //第1页
    this.data.orderList = [] //清空数组
    this.orderList() //调一次orderList
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.data.pageIndex++ //页面++
      this.orderList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
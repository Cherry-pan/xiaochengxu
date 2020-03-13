// pages/cart/index.js

import {
  $getData,
  $get
} from '../../utils/common.js'
Page({
  changing(e) {
    console.log(e.detail, e.currentTarget.dataset.id)
    // this.data.goodList[e.currentTarget.dataset.id].count=e.detail
    let curr = this.data.goodList.find(r => r.id === e.currentTarget.dataset.id)
    curr.count = e.detail
    this.caclTotalMoney()
  },
  caclTotalMoney() {
    this.data.totalMoney = 0,
      // page。data。goodlist调用filter回调函数参数是r,返回一个数组，数组的筛选条件是goodlist中isSelect为true的对象
      // 遍历过滤出来的数组
      this.data.goodList.filter(r => r.isSelect === true).forEach(r => {
        this.data.totalMoney += r.price * r.count
      })
    this.setData({
      totalMoney: this.data.totalMoney
    })
  },
  select(e) {
    // 找到ID匹配的自身对象
    let curr = this.data.goodList.find((r) => r.id === e.currentTarget.dataset.id)
    curr.isSelect = !curr.isSelect
    var isSelectAll = this.data.goodList.every((r) => r.isSelect) //判断数组中的每一项是否都是选中的状态
    this.setData({
      goodList: this.data.goodList,
      isSelectAll: isSelectAll
    })
    this.caclTotalMoney()
  },
  selectAll() {
    this.data.isSelectAll = !this.data.isSelectAll //取反
    this.data.goodList.forEach((r) => { //循环整个数组，
      r.isSelect = this.data.isSelectAll
    })
    this.setData({
      goodList: this.data.goodList,
      isSelectAll: this.data.isSelectAll
    })
    this.caclTotalMoney()
  },

  /**
   * 页面的初始数据
   */
  data: {
    isSelectAll: false,
    totalMoney: 0,
    // 商品列表
    goodList: [{
      id: 1,
      name: "榛果榛果拿铁拿铁拿铁拿铁",
      desc: "全糖/大杯/bing",
      price: 19,
      count: 2,
      isSelect: false
    }, {
      id: 2,
      name: "香草拿铁",
      desc: "全糖/大杯",
      price: 19,
      count: 4,
      isSelect: true
    }, {
      id: 3,
      name: "拿铁",
      desc: "全糖/大杯",
      price: 30,
      count: 2,
      isSelect: false
    }, {
      id: 4,
      name: "太妃芝士拿铁拿铁",
      desc: "全糖/大杯",
      price: 29,
      count: 3,
      isSelect: false
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.caclTotalMoney()
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
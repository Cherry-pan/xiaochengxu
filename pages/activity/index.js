import io from '../../utils/weapp.socket.io.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    socket : null
  },
  setval(e){
    this.data.content = e.detail.value
  },
  send(e){
    this.data.socket.emit('chat',{
      receiver:'Cherry',
      msg:this.data.content
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   this.data.socket = io('ws://localhost:8088/', {
      query: {
        nickname: 'Cherry'
      }
    })
    this.data.socket.on('connection',(msg)=>{
      console.log(msg)
    })
    // wx.connectSocket({
    //   url: 'ws://localhost:8088/',
    //   header: {},
    //   method: '',
    //   protocols: [],
    //   success: function(res) {
    //     console.log(res)
    //   },
    //   fail: function(res) {
    //     console.log(res)
    //   },
    //   complete: function(res) {},
    // })

    //this.getLocationByAddress()
    // this.getDistance()

    // getLocation() {
    //   return new Promise(resolve => {
    //     wx.getLocation({
    //       type: 'gcj02',
    //       altitude: true,
    //       success: function(res) {
    //         // console.log(res)
    //         resolve({
    //           lat: res.latitude,
    //           lng: res.longitude
    //         })
    //       },
    //       fail: function(res) {},
    //       complete: function(res) {},
    //     })
    //   })
    // },

    //  async getAddressByLocation() {
    //     let local =await this.getLocation()
    //     console.log(local)
    //     wx.request({
    //       url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    //       data: {
    //         location:local.lat+','+local.lng,
    //         key:"NIBBZ-FGPKJ-WXZFJ-K7X4C-P5JWH-KWBZM"
    //       },
    //       success: function(res) {
    //         console.log(res)
    //       },
    //       fail: function(res) {},
    //       complete: function(res) {},
    //     })
    //   },
    // async getLocationByAddress() {
    //   let local = await this.getLocation()
    //   let pro = []
    //   let proall = []
    // console.log(local.lat + ',' + local.lng)
    // function a1() {
    //     wx.request({
    //       url: 'http://rest.apizza.net/mock/a5cdf4058b6f0c8a44849f94d5cfc690/shoplist',
    //       method: 'GET',
    //       success: (res) => {
    //      let arr2= res.data.map(r=>r.address)
    //       return new Promise(async (resolve)=>{
    //         arr2.forEach(r => {
    //           wx.request({
    //             url: 'https://apis.map.qq.com/ws/geocoder/v1/',
    //             data: {
    //               address: r,
    //               key: "NIBBZ-FGPKJ-WXZFJ-K7X4C-P5JWH-KWBZM"
    //             },
    //             success: async function (res) {
    //               pro.push(res.data.result.location)
    //               resolve(pro)
    //             }
    //           })
    //         })
    //       }) 
    //       proall = a1()
    // console.log(proall)
    //       },
    //     })
    // }
  },
  send() {
    wx.request({
      url: 'http://localhost:8088/wx/sendSMS',
      data: {
        tel: 15651833228
      },
      success: function(res) {
        console.log(res)
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
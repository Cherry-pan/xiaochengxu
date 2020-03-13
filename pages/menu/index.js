import {
  Tencent_Map_Key,
  BASEURL
} from "../../config/index.js"
import {
  getAddressByLocation,
  getLocation
} from '../../utils/location.js'
import {
  $get
} from '../../utils/common.js'
Page({
  changeCount(e) {
    // console.log(e)
    this.data.count = e.detail
  },
  /**
   * 页面的初始数据
   */
  async showDetail(e) {
    let id = e.currentTarget.dataset.id
    let res = await $get('http://127.0.0.1:8088/order/goods/detail/' + id)

    this.setData({
      gooddetail: res
    })
    wx.hideTabBar({
      animation: true
    })
    this.setData({
      isHidedetail: false
    })
  },
  close() {
    this.setData({
      isHidedetail: true,
      guigeListIndex: 0, //默认第一个给后台的数据
      wenduListIndex: 0,
      sweetListIndex: 0
    })

    wx.showTabBar({
      animation: true
    })
  },
  active(e) {
    // console.log(e.currentTarget.dataset.index)
    this.setData({
      activeList: e.currentTarget.dataset.index + 1
    })
    this.getGoods()
  },

  changeguige(e) {
    // console.log(e)
    this.data.guigeListIndex = e.detail
  },
  changewendu(e) {
    this.data.wenduListIndex = e.detail
  },
  changetangdu(e) {
    this.data.sweetListIndex = e.detail
  },
  buy(e) {
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log(res.userInfo.avatarUrl, res.userInfo.nickName)
      }
    })
    wx.navigateTo({
      url: `../pay/index?count=${this.data.count}&guige=${this.data.guigeList[this.data.guigeListIndex]}&wendu=${this.data.wenduList[this.data.wenduListIndex]}&sweet=${this.data.sweetList[this.data.sweetListIndex]}&price=27&goodname=冲绳黑糖拿铁`,
    })

  },
  data: {
    isHidedetail: true,
    activeList: 1, //初始值
    //menuList: [], //菜单数组
    minShop: {}, //最近门店对象
    shopList: [], //门店数组
   // goodlist: [], //商品列表
    guigeList: ["中", "大", "超大"],
    wenduList: ["热", "常温", "冰"],
    sweetList: ["少糖", "常规糖", "半塘"],
    guigeListIndex: 0, //默认第一个给后台的数据
    wenduListIndex: 0,
    sweetListIndex: 0,
    count: 1,
    gooddetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //先获取门店列表
    this.getGoods() //在执行获取商品
    // wx.hideTabBar({
    //   animation: true
    // })
  },
  onShow() {
    this.getShopAddress() //后获取
  },
  async getShopAddress() {
    await this.getShoplist()
    this.getAddress()
  },
  async getGoods() {
    await this.getMenu();
    this.getGoodslist()
  },

  // 门店
  async getShoplist() { //外面是异步，里面的同步，等一行执行完，再通知页面
    let shop = await $get('http://localhost:8088/order/goods/shoplist')
    this.setData({
      shopList: shop
    })
  },

  // 获取位置代码
  async getAddress() {
    // 获取当前的位置
    let {
      lat,
      lng
    } = await getLocation()
    // console.log(getLocation())
    // 全局变量存放每个地址
    let arr = []
    // 遍历整个数组
    this.data.shopList.forEach(r => {
      let pro = $get('https://apis.map.qq.com/ws/geocoder/v1/', {
        address: r.address,
        key: Tencent_Map_Key
      })
      arr.push(pro)
      // console.log(arr)
    })
    let proAll = await Promise.all(arr)
    // console.log(proAll)

    let local = proAll.map(r => [r.result.location.lat, r.result.location.lng]) //这也是经纬度的数组
    // console.log(local)

    // 调用计算距离的api
    let distance = await $get('https://apis.map.qq.com/ws/distance/v1/', {
      mode: "driving",
      key: Tencent_Map_Key,
      from: [lat, lng].join(','), //???你问我为什么？？
      to: local.join(';')
    })
    // console.log(distance)
    let minDistance = distance.result.elements.map(r => r.distance) //距离数组
    // console.log(minDistance)
    let min = Math.min(...minDistance) //最小距离
    // console.log(min)
    let minIndex = minDistance.indexOf(min) //最小距离的下标
    // console.log(minIndex)

    this.setData({
      minShop: {
        shopName: this.data.shopList[minIndex].name, //为什么要.name
        distance: min
      },
    })
  },

  // 获取虚拟数据菜单
  async getMenu() {
    let res = await $get('http://localhost:8088/order/goods/typelist')
    // console.log(res)
    this.setData({
      menuList: res
    })
  },

  // 获取商品列表
  async getGoodslist() {
    // 返给后台的数据，后台通过id获取对应的数据
    let id = this.data.menuList[this.data.activeList - 1].id
    console.log(id)
    let res = await $get('http://localhost:8088/order/goods/goodslist/' + id)
    this.setData({
      goodlist: res
    })
  }
})
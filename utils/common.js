export function $getData(e) {
  return e.currentTarget.dataset
}
export function $requestGet(url, data) {
  $get(url, data, 'GET')
}
export function $requestPost(url, data) {
  $get(url, data, 'POST')
}
export function $get(url, data, method = 'GET') {
  return new Promise((resolve, reject) => {
    wx: wx.showLoading({
      title: '加载中'
    })
    wx: wx.request({
      url,
      data,
      method,
      success: (res) => {
        resolve(res.data) //成功之后调用数据       
      },
      fail(e) {
        reject(e)
        wx.showToast({
          title: '服务器繁忙，请稍后重试',
          icon: "none"
        })
      },
      complete() {
        wx: wx.hideLoading() //不管是成功还是完成都要隐藏loading
      }
    })
  })
}




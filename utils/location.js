import {
  Tencent_Map_Key
} from '../config/index.js'

// 通过微信开发文档的位置获取当前位置
export function getLocation() {
  // 通过微信开发文档的位置获取当前位置
  return new Promise((resolve, reject) => { //使用【return】Promise对象
    wx.getLocation({
      type: "gcj02", //更加精确
      success: function({ //如果用户点击【确定】，走这里的代码
        latitude: lat,
        longitude: lng
      }) {
        resolve({ //成功之后走这个代码
          lat,
          lng
        })
      },
      // 失败的类型
       fail: function(){
         wx.getSetting({//获取用户的授权状态
           success(res) {//获取用户的授权状态成功，只是获取成功，并没有授权成功，这一步只是获取
          //  console.log(res)
             console.log(!res.authSetting["scope.userLocation"]) //用户权限不止是位置，还有许多照相、语音功能等
             if (!res.authSetting["scope.userLocation"]){
              wx.showModal({
                title: '重要提示',
                content: '需要您的授权',
                success(res){//模态框弹出的状态
                  if(res.confirm){
                    wx.openSetting({//关闭当前页面
                      success(res) {//管理授权信息状态成功
                        if (res.authSetting["scope.userLocation"]){//true
                          // console.log(res.authSetting["scope.userLocation"])
                          wx.showToast({
                            title: '授权成功',
                          })
                        }
                      }
                    })
                  }else{
                    getLocation()
                  }
                }
              })
             }
           }
         })
       }     
    })
  })
}

export function getAddressByLocation(lat, lng) {
  return new Promise((resolve) => {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${lat},${lng}`,
        key: Tencent_Map_Key,
      },
      success: function(res) {
        return res.data.result
      }
    })
  })
}
import {
  $getData,
  $get
} from '../../utils/common.js'

// pages/home/index.js
Page({
  onLoad(){
    setTimeout(()=>{
      //this的指向
      this.setData({
        showadv: true
      })      
    },300)
  },
  close(){
    this.setData({
      showadv: false
    })
  },
  data: {
    showadv:false
  }
})
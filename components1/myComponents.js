import Xp from "../behavior-in/xuzhen.js"

Component({
  behaviors: [Xp],
  /**
   * 组件的 属性列表
   */
  properties: {
    label: { //属性名
      type: String,
      value: '标题'
    },
    items: {
      type: Array
    },
    activeIndex:{
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inActive: 0,  
  },
  lifetimes: {
    attached: function () {
      this.setData({
        inActive: this.data.activeIndex
      })
    }
  },
  observers: {
    activeIndex: function (activeIndex) {
      this.setData({
        inActive: this.data.activeIndex
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    activeGG(e) {
      this.setData({
        inActive: e.currentTarget.dataset.index
      })
      this.$outevent('change',e.currentTarget.dataset.index) 
    },    
  }
})
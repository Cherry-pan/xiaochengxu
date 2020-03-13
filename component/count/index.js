// component/count/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    color:{
      type:String,
      value:"red"
    },
    count:{
      type:Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    plus(e) {
      if (++this.data.count > 10)
        this.data.count = 10
      this.setData({
        count: this.data.count
      })
      this.triggerEvent("changeCount", this.data.count)
    },
    mus(e) {
      if (--this.data.count < 1) this.data.count = 1
      this.setData({
        count: this.data.count
      })
      this.triggerEvent("changeCount", this.data.count)
    },
  }
})

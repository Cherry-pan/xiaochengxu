// 公共行为
export default Behavior({ 
  data: {
    authorName: "xp"
  },
  methods: {
    $outevent(event,data){
      this.triggerEvent(event,data)
    }
  }
})
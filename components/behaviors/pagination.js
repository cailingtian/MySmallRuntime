
let paginationBev = Behavior({
  properties: {
   
  },
  data: {
    start: 0,
    count: 20,
    total: 0,
    dataArray: [],
    empty:false,
    ending:false,
    noResult: false
  },

  methods: {
    setMoreData: function(dataArray) {
      if (dataArray == false) {
        this.data.ending = true
        if(this.data.dataArray == false){
          this.setData({
            empty: true
          })
        }
      }
      let temp =this.data.dataArray.concat(dataArray)
      this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
      return true
    },

    hasMore:function(){
      return !this.data.ending
    },

    getCurrentStart:function(){
      return this.data.start
    },
    setTotal: function(total) {
      this.data.total = total
      // 判断搜索是否有效，无效提示用户
      if (!this.data.total) {
        this.setData({
          noResult: true
        })
      }
    },

    initPagination:function() {
      this.data.ending = false
      this.data.start = 0
      this.data.dataArray = []
      this.setData({
        dataArray: [],
        noResult: false
      })
    }
  }
})


export {
  paginationBev
}
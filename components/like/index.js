// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    like: false,
    count: 0,
    likeImg: 'images/like.png',
    disLikeImg: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike: function(event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like
      let count =this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        like: !like,
        count: count
      })

      let behavior = this.properties.like ? 'like' : 'cancel'
      // 激活自定义事件
      this.triggerEvent('like', {
        behavior: behavior
      }, {})
    }
  }
})

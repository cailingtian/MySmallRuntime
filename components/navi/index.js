// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    LeftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    RightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft: function(event) {
      // 判断如果是最新一期期刊则禁止左按钮事件触发
      if (!this.properties.latest) {
        // 触发自定义left事件
        this.triggerEvent('left', {}, {})
      }
    },
    onRight: function(event) {
      // 判断如果是第一期期刊则禁止右按钮事件触发
      if (!this.properties.first){
        // 触发自定义right事件
        this.triggerEvent('right', {}, {})
      }
    }
  }
})

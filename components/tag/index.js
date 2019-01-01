// components/tag/index.js
Component({
  options:{
    // 启用多插槽
   multipleSlots:true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    text: String
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
    onTap(event) {
      this.triggerEvent('tapping', {
        text: this.data.text
      })
    }
  }
})

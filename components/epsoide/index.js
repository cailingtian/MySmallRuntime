// components/epsoide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: String,
      observer: function(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal
        // 切记不要去改变properties里的属性的index值，会引起无限递归调用，可以改变data里的_index属性值去替代
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    months: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月',],
    _index: '',
    month: ''
  },

  attached: function() {
    let date = new Date()
    let year = date.getFullYear() //获取当前年份
    let month = date.getMonth() //获取当前月份year
    this.setData({
      year: year,
      month: this.data.months[month]
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

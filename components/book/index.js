// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object
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
    onTap: function(event) {
      // 拿到用户点击书籍的id
      const bookId = this.properties.book.id
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bookId=${bookId}`
       })
    }
  }
})

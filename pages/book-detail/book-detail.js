// pages/book-detail/book-detail.js

import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookDetail: null,
    comments: [],
    likeConut: 0,
    likeStatus: false,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    // 接收从book页面的book组件传过来的id
    const bookId = options.bookId
    const bookDetail = bookModel.getDetail(bookId)
    const comments = bookModel.getComment(bookId)
    const likeStatus = bookModel.getLikeStatus(bookId)

    //优化代码 并行请求，生成新的Promise
    // 区分Promise.all等待请求时间最长的请求完成后才触发回调函数，Promise.race任何一个请求先请求完成后会率先触发回调
    Promise.all([bookDetail, comments, likeStatus])
    .then((res) => {
      // console.log(res)
      this.setData({
        bookDetail: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeConut: res[2].fav_nums
      })
      wx.hideLoading()
    })

    /* bookDetail.then((res) => {
      // console.log(res)
      this.setData({
        bookDetail: res
      })
    })

    comments.then((res)  => {
      // console.log(res)
      this.setData({
        comments: res.comments
      })
    })

    likeStatus.then((res) => {
      // console.log(res)
      this.setData({
        likeStatus: res.like_status,
        likeConut: res.fav_nums
      })
    }) */
  },
   // 修改喜欢状态
  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.bookDetail.id, 400)
  },
  // 修改评论栏状态
  onPostFake(event) {
    this.setData({
      posting: !this.data.posting
    })
  },
  // 提交评论
  onPost(event) {
    const comment = event.detail.text || event.detail.value  // 用户点击的评论或者用户输入的内容
    // 提示用户短评输入字数限制
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    // 输入框内容为空不提交
    if(!comment) {
      return
    }
    // 提交评论
    bookModel.postComment(this.data.bookDetail.id, comment)
      .then((res) => {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          diration: 2000
        })

        this.data.comments.unshift({
          content: comment,
          nums: 1
        })
        this.setData({
          comments: this.data.comments,
          posting: false
        })
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/my/my.js

import { BookModel } from '../../models/book.js'
import { ClassicModel } from '../../models/classic.js'
let bookModel = new BookModel()
let classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authoried: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthoried()
    this.getMyBookCount()
    this.getMyFavor()
  },
  getMyBookCount() {
    bookModel.getMyBookCount().then((res) => {
      console.log(res)
      this.setData({
        bookCount: res.count
      })
    })
  },

  getMyFavor() {
    classicModel.getMyFavor((res) => {
      console.log(res)
      this.setData({
        classics: res
      })
    })
  },
  userAuthoried() {
    wx.getSetting({
      success: (data) => {
       if (data.authSetting['scope.userInfo']) {
         // 已授权
         wx.getUserInfo({
          success: (data) => {
            // console.log(data)
            this.setData({
              authoried: true,
              userInfo: data.userInfo
            })
          }
        })
       } else {
         // 未授权
        console.log('未授权登录')
       }
      }
    })
  },
  onGetUserInfo(event) {
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authoried: true
      })
    }
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
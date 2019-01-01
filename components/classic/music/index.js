// components/classic/music/index.js
import { classicBehavior } from '../classic-behavior.js'

const backgroundAudioManager = wx.getBackgroundAudioManager()
Component({
  /**
   * 组件的属性列表
   */
  // 组件继承相同行为
  behaviors: [classicBehavior],
  properties: {
    musicSrc: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing: false,
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  /**
   * 组件的生命周期函数
   */
  attached:function(event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function(event) {
    // backgroundAudioManager.stop()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay: function(event) {
      if (!this.data.playing) {
        // 切换至播放图标,开始播放音乐
        this.setData({
          playing: true
        })
        backgroundAudioManager.title = this.properties.title  // 标题必须传递
        backgroundAudioManager.src = this.properties.musicSrc // 传递src后会自动播放
      } else {
        // 切换至暂停图标，暂停播放音乐
        this.setData({
          playing: false
        })
        backgroundAudioManager.pause()
      } 
    },

    // 检测切换到的音乐期刊是否为当前播放音乐期刊，并更改播放图标
    _recoverStatus: function(event) {
      // 当音乐为暂停状态时
      if (backgroundAudioManager.paused) {
        this.setData({
          playing: false
        })
        return
      }
      // 当期刊切换到为当前播放音乐的期刊时
      if (backgroundAudioManager.src === this.properties.musicSrc) {
        this.setData({
          playing: true
        })
      }
    },

    // 实现音乐总控开关于组件的播放开关联动
    _monitorSwitch: function(event) {
      // 监听音乐播放事件
      backgroundAudioManager.onPlay(() => {
        this._recoverStatus()
      })
      // 监听音乐暂停事件
      backgroundAudioManager.onPause(() => {
        this._recoverStatus()
      })
      //监听音乐播放至自然结束事件
      backgroundAudioManager.onEnded(() => {
        this._recoverStatus()
      })
      // 监听音乐停止播放事件
      backgroundAudioManager.onStop(() => {
        this._recoverStatus()
      })
    }


  }
})

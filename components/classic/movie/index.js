// components/classic/movie/index.js
import { classicBehavior } from '../classic-behavior.js'
Component({
  /**
   * 组件的属性列表
   */
  // 组件继承相同行为
  behaviors: [classicBehavior],
  properties: {
    hidden: Boolean
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

  }
})

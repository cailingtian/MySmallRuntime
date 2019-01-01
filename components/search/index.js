// components/search/index.js
import { KeyWordModel } from '../../models/keyword.js'
import { paginationBev} from '../behaviors/pagination.js'
let keyWordModel = new KeyWordModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    more: {
      type: String,
      observer: 'loadMore'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchInput: '',
    historyWords: [],
    hotWords:[],
    showSearchResult: false,
    loading: false,
    loadingCenter: false
  },

  /**
   * 组件的生命周期
   */
  attached() {
    this.setData({
      historyWords: keyWordModel.getHistory()
    })

    keyWordModel.getHot().then((res) => {
      // console.log(res)
      this.setData({
        hotWords: res.hot,
      })
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭搜索 向父组件传递触发事件
    onCancel: function(event) {
      this.initPagination() // 重置数据
      this.triggerEvent('cancel')
    },

    onConfirm: function(event) {
      this._showLoadingCenter() //显示中间加载控件
      this._showSearchResult() // 显示搜索结果
      // 获得关键字
      const word = event.detail.value || event.detail.text
      this.setData({
        searchInput: word
      })
      keyWordModel.search(0, word).then((res) => {
        console.log(res)
        this.setMoreData(res.books)
        this.setTotal(res.total)
        // 将关键字添加进缓存
        keyWordModel.addToHistory(word)
        this._hideLoadingCenter() //隐藏中间加载控件
      })
    },
    
    // 清空搜索
    onClear(event) {
      this.initPagination() // 重置数据
      this.setData({
        searchInput: '',
        showSearchResult: false
      })
    },

    loadMore() {
      // console.log('123456')
      if (!this.data.searchInput) {
        return
      }
      // 判断锁的状态，防止同时发送请求
      if (this._isLocked()) {
        return
      }
      if (this.hasMore()) {
        this._locked()  // 加锁
        keyWordModel.search(this.getCurrentStart(), this.data.searchInput).then((res) => {
          this.setMoreData(res.books)
          this._unlocked() // 解锁
        }, () => {
          this._unlocked() // 请求失败也解锁
        })
      }
    },
    // 显示搜索结果
    _showSearchResult() {
      this.setData({
        showSearchResult: true,
      })
    },
    // 判断锁的状态
    _isLocked() {
      return this.data.loading ? true : false
    },
    // 加锁
    _locked() {
      this.setData({
        loading: true
      })
    },
    // 解锁
    _unlocked() {
      this.setData({
        loading: false
      })
    },
    // 显示中间加载控件
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    // 隐藏中间加载控件
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    }
  }
})

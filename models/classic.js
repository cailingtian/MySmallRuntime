import { HTTP } from '../util/http.js'

class ClassicModel extends HTTP {
    prefix = 'classic'
    constructor() {
        super()
    }
    // 获取最新一期期刊数据
    getLatest(sCallback) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                // 请求最新期刊数据成功并写入缓存
                let key = this._getkey(res.index)
                wx.setStorageSync(key, res)
                // 成功将数据回传回去
                sCallback(res) 
            }
          })
    }
    // 获取我喜欢的期刊信息
    getMyFavor(success){
        let params={
          url:'classic/favor',
          success:success
        }
        this.request(params)
    }
    
    // 获取上一期或者下一期期刊的数据
    getClassic(index, nextOrPrevious, sCallback) {
        let key = nextOrPrevious === 'next' ? this._getkey(index + 1) : this._getkey(index - 1)
        let classic = wx.getStorageSync(key)  // 获取缓存中数据
        if (!classic) {
            // 如果缓存不存在该期期刊数据，向服务器请求数据
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    // 请求成功后并将期刊数据写入缓存
                    wx.setStorageSync(this._getkey(res.index), res)
                    // 成功将服务器请求数据回传回去
                    sCallback(res)
                    this._setLatestIndex(res.index)
                  }
            })
        } else {
            // 否则缓存中存在该期刊数据，将缓存数据回传回去
            sCallback(classic)
        }
    }
    // 根据索引值判断更新左按钮的状态
    isFirst(index) {
        return index === 1 ? true : false
    }
    // 根据索引值判断更新右按钮的状态
    isLatest(index) {
        // let latestIndex = this._getLatestIndex()
        return index === 8 ? true : false
    }

    // 将最新期刊索引值写入缓存
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index)
    }
    // 从缓存中读取最新期刊的索引值
    _getLatestIndex() {
        let index = wx.getStorageSync('latest')
        return index
    }

    // 生成缓存的key值
    _getkey(index) {
        let key =  `classic-${index}`
        return key
    }
}

export { ClassicModel }
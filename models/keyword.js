import {HTTP} from '../util/http-p.js'

class KeyWordModel extends HTTP {
    key = 'keyWord'
    max_length = 10
    
    getHistory() {
        let words = wx.getStorageSync(this.key)
        if (!words) {
            return []
        }
        return words
    }
    // 获取热门搜索热词
    getHot() {
        return this.request({
            url: '/book/hot_keyword'
        })
    }

    addToHistory(keyword) {
        let words = this.getHistory()
        //判断热词是否已经存在
        const has = words.includes(keyword)
        // 不存在添加该热词
        if (!has) {
            const length = words.length
            if (length >= this.max_length) {
                //删除末尾元素
                words.pop()
            }
            //添加到元素首位
            words.unshift(keyword)
            //存入缓存
            wx.setStorageSync(this.key, words)
        }
    }

    // 获取搜索结果
    search(start, q) {
        return this.request({
            url: '/book/search?summary=1',
            data: {
                q: q,
                start: start
            }
        })
    }
}

export { KeyWordModel }
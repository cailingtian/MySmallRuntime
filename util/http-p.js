import {config} from '../config.js'

const tips = {
    1: '抱歉，出现了一个错误',
    1005: 'appkey无效',
    3000: '期刊不存在'
}
// 封装网络请求类
class HTTP {
    request({url, data={},method='GET'}){
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data={},method='GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                const code = res.statusCode.toString()
                /* startsWith()：返回布尔值，表示参数字符串是否在查找字符串的头部；
                    endsWith()：返回布尔值，表示参数字符串是否在查找字符串的尾部。 */
                    // 判断以2（2xx)开头的状态码为正确
                if (code.startsWith('2')) {
                    resolve(res.data)
                } else {
                    reject()
                    const error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                reject()
                this._show_error(1)
            }

        })

    }
    _show_error(error_code) {
        if(!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}
 
export { HTTP }
import { HTTP } from '../util/http-p'

class BookModel extends HTTP {
    // 获取热门书籍
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        })
    }

    // 获取喜欢看书人数
    getMyBookCount(){
        return this.request({
            url:'/book/favor/count'
        })
    }

    // 获取书籍详情信息
    getDetail(bookId) {
        return this.request({
            url: `/book/${bookId}/detail`
        })
    }

    // 获取书籍喜欢状态
    getLikeStatus(bookId){
        return this.request({
            url:`book/${bookId}/favor`
        })
    }

    // 书籍短评详情
    getComment(bookId){
        return this.request({
            url:`book/${bookId}/short_comment`
        })
    }

    // 提交发送评论
    postComment(bid, comment) {
        return this.request({
          url: 'book/add/short_comment',
          method: 'POST',
          data: {
            book_id: bid,
            content: comment
          }
        })
    }
}

export { BookModel }
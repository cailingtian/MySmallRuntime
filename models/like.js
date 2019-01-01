 import { HTTP } from '../util/http.js'

 class LikeModel extends HTTP {
        // 向服务器发送喜欢的状态
        like(behavior, art_id, category) {
            let url = behavior === 'like' ? 'like' : 'like/cancel'
            this.request({
                url: url,
                method: 'POST',
                data: {
                    art_id: art_id,
                    type: category
                }
            }) 
        }
        // 获取喜欢该期刊的总人数和状态
        getClassicLikeStatus(art_id, category, sCallback){
            this.request({
                url: `classic/${category}/${art_id}/favor`,
                success: sCallback

            })
        }
 }

 export { LikeModel }
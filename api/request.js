// 发送 网络请求

// 引入 网络请求
 import config from './config.js'

//  设置请求

export default (url,data={},method="GET") => {
    return new Promise((reslove,reject)=> {
        // 1. new Promise初始化promise实例的状态为pending
        wx.request({
            url:config.host + url,
            data,
            method,
            success: (result) => {
                console.log('请求成功',result)
                reslove(result.data)
            },
            fail: (err) => {
                console.log('请求失败',err)
                reject(err)
            },
          })
    })
}
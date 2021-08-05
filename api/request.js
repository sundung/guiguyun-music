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
            header:{ // 登录成功后携带cookies
                cookie: wx.getStorageSync('cookies') ? wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
            },
            success: (result) => {
                console.log(data.isLogin)
                // 获取登录的标识
                if(data.isLogin){
                    // 将用户的cookie存入至本地
                    wx.setStorage({
                        key: 'cookies',
                        data: result.cookies
                    })
                }
                reslove(result.data)
            },
            fail: (err) => {
                console.log('请求失败',err)
                reject(err)
            },
          })
    })
}
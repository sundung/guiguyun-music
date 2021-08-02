// index.js

// 导入网络请求
import request from '../../api/request'

Page({
  data: {
    bannersList:[], // 轮播图数据
  },
  onLoad() {
    // 发起轮播图网络请求
    this.getBanner()
  },
  // 轮播图请求函数
  async getBanner(){
    let data = await request('/banner',{type:2});
    this.setData({
      bannersList: data.banners
    }) 
  }
})

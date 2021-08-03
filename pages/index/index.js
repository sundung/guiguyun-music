// index.js

// 导入网络请求
import request from '../../api/request'

Page({
  data: {
    bannersList:[], // 轮播图数据
    recommendSongList:[], // 推荐歌曲数据
  },
  onLoad() {
    // 发起轮播图网络请求
    this.getBanner();
    // 发起推荐歌曲请求
    this.getRecommendSongList();
  },
  // 轮播图请求函数
  async getBanner(){
    let data = await request('/banner',{type:2});
    this.setData({
      bannersList: data.banners
    }) 
  },
  async getRecommendSongList(){
    let data = await request('/personalized',{limit:10});
    this.setData({
      recommendSongList:data.result
    })
    
  }
})

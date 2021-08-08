// index.js

// 导入网络请求
import request from '../../api/request'

Page({
  data: {
    bannersList:[], // 轮播图数据
    recommendSongList:[], // 推荐歌曲数据
    topList:[] // 排行榜数据
  },
  onLoad() {
    // 发起轮播图网络请求
    this.getBanner();
    // 发起推荐歌曲请求
    this.getRecommendSongList();
    // 发起排行榜请求
    this.getTopList()
  },
  // 轮播图请求函数
  async getBanner(){
    let data = await request('/banner',{type:2});
    this.setData({
      bannersList: data.banners
    }) 
  },
  // 推荐歌曲函数
  async getRecommendSongList(){
    let data = await request('/personalized',{limit:10});
    this.setData({
      recommendSongList:data.result
    }) 
  },
  // 获取排行榜数据
    /*
    * 需求分析：
    *   1. 需要根据idx的值获取对应的数据
    *   2. idx的取值范围是0-20， 我们需要0-4
    *   3. 需要发送5次请求
    * 前++ 和 后++的区别
    *   1. 先看到是运算符还是值
    *   2. 如果先看到的是运算符就先运算再赋值
    *   3. 如果先看到的值那么就先赋值再运算
    * */
  async getTopList(){
    let index = 0;
    let arrResult = [];
    while (index < 5) {
      let data = await request('/top/list',{idx:index++});
      // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组)
      let tempArr = {name:data.playlist.name,tracks:data.playlist.tracks.slice(0,3)};
      arrResult.push(tempArr)
      // 更新数据
      // 不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些
      this.setData({
        topList:arrResult
      })
    }
    // 更新topList的状态值, 放在此处更新会导致发送请求的过程中页面长时间白屏，用户体验差
    // this.setData({
    //   topList: resultArr
    // })
  },
  // 点击每日推荐跳转到每日推荐页面
  goToRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  }
})

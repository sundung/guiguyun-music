// pages/songDetail/songDetail.js
// 导入网络请求
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false, // 是否播放状态
    song:{}, // 歌曲详情对象
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.musicId
    // 调用歌曲详情
    this.getSongDetail(musicId);
  },
  // 控制音乐的播放与暂停
  handleMusicPlay(){
    let isPlay = ! this.data.isPlay
    this.setData({
      isPlay
    })
  },
  // 获取歌曲详情页面
  async getSongDetail(musicId){
    let data = await request('/song/detail',{ids:musicId})
    this.setData({
      song:data.songs[0]
    })
    // 动态设置导航标题
    wx.setNavigationBarTitle({
      title:this.data.song.name
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
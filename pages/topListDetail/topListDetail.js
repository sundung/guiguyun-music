import request from "../../api/request"

// pages/topListDetail/topListDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'', // 榜单id
    songDetail:[], // 歌曲详情
    bgcImage:'',// 背景图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      id:options.id
    })
    this.getTopListDetail()
  },
  async getTopListDetail(){
    let data = await request('/playlist/detail',{id:this.data.id})
    console.log(data)
    this.setData({
      bgcImage:data.playlist.coverImgUrl,
      songDetail:data.playlist.tracks 
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
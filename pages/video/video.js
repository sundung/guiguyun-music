// pages/video/video.js
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], // 获取视频标签列表数组
    navId:'', // 控制激活样式的标识
    videoList:[], // 视频数组
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupList();
  },
  // 获取推荐导航 /video/group/list
  async getVideoGroupList(){
    let data = await request('/video/group/list');
    this.setData({
      videoGroupList:data.data.slice(0,13),
      navId:data.data[0].id
    })
    // 此处调用导航对应下的视频数组,因为 能获取 navId
    this.getVideoList(this.data.navId);
  },
  // 点击推荐导航事件
  changeNav(event){
    let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;
    // 加载loading状态
    wx.showLoading({
      title:'正在加载'
    })
    this.setData({
      navId,
      videoList:[] // 清空当前视频列表
    })
    // 点击切换时加载数据
    this.getVideoList(this.data.navId)
  },
  // 获取推荐导航下对应的视频信息,注意该接口需要用户登录
  async getVideoList(navId){
    let data = await request('/video/group',{id:navId});
     // 关闭loading
    if(data) {
      // 关闭消息提示框
      wx.hideLoading();
    }
    // 设置一个id用作遍历的 key
    let index = 0;
    let videoList = data.datas.map(item => {
      item.id = index++;
      return item;
    })
    this.setData({
      videoList
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
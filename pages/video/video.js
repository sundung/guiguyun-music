// pages/video/video.js
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList:[], // 获取视频标签列表数组
    navId:'' // 控制激活样式的标识
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
  },
  // 点击推荐导航事件
  changeNav(event){
    let navId = event.currentTarget.id; // 通过id向event传参的时候如果传的是number会自动转换成string
    // let navId = event.currentTarget.dataset.id;
    this.setData({
      navId
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
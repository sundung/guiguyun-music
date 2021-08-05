// pages/personal/personal.js
let startY = 0; // 手指起始的坐标
let moveY = 0; // 手指移动的坐标
let moveDistance = 0; // 手指移动的距离

// 导入网络请求
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(200)rpx', // 下拉动画的移动距离
    coveTransition:'', // 动画
    userInfo:{}, // 用户信息
    userPlayRecord:[] // 用户播放记录数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 进入页面判断当前用户是否登录
    // 读取用户的基本信息
    let userInfo = wx.getStorageSync('userInfo');
    if(userInfo){ // 用户登录
      // 更新userInfo的状态
      this.setData({
        userInfo: JSON.parse(userInfo)
      })
    }
    this.getUserPlayRecord(this.data.userInfo.userId);
  },
  // 获取用户播放记录
  async getUserPlayRecord(userID){
    let data = await request('/user/record',{uid:userID,type:0})
    let index = 0;
    let userPlayRecord = data.allData && data.allData.slice(0, 10).map(item => {
      item.id = index++;
      return item;
    })
    console.log(userPlayRecord)
    this.setData({
      userPlayRecord
    })
  },
  handleTouchStart(event){
    // 获取起始坐标
     startY = event.touches[0].clientY;
  },
  handleTouchMove(event){
    // 获取移动的坐标
     moveY = event.touches[0].clientY;
    // 获取手指的移动距离
    moveDistance = moveY - startY;
    // 禁止上划
    if(moveDistance <= 0){
      return;
    }
    // 滑动的最大距离为 80 
    if(moveDistance >= 80){
      moveDistance = 80;
    }
    // 动态更新手指的移动距离
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
    console.log(moveDistance)
  },
  handleTouchEnd(event){
    // 动态更新coverTransform的状态值
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coveTransition: 'transform 1s linear'
    })
  },
  // 点击头像跳转到登录页面
  goToLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    });
      
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
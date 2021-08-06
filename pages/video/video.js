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
    videoId:'',// 视频播放的id
    videoUpdateTime: [], // 记录video播放的时长
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
    console.log(data);
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
  // 处理多个视频播放的问题
  handlePlay(event){
    console.log(event.currentTarget.id)
    // 1.获取上一个视频的id
    let vid = event.currentTarget.id;

    // 判断当前id不是第一个视频
    // this.vid && this.vid != event.currentTarget.id && this.videoContext && this.videoContext.stop();
    // this.vid = vid;
    // 更新视频id
    this.setData({
      videoId:vid
    })
    // 创建控制video标签的实例对象
    this.videoContext = wx.createVideoContext(vid);
    // 判断当前的视频之前是否播放过，是否有播放记录, 如果有，跳转至指定的播放位置
    let {videoUpdateTime} = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === vid);
    if(videoItem){
      this.videoContext.seek(videoItem.currentTime);
    }
    // 自动播放
    this.videoContext.play();
  },
  // 跳转到播放过视频的对应时长
  handleTimeUpdate(event){
    let videoTimeObj = {vid: event.currentTarget.id, currentTime: event.detail.currentTime};
    let {videoUpdateTime} = this.data;
    /*
    * 思路： 判断记录播放时长的videoUpdateTime数组中是否有当前视频的播放记录
    *   1. 如果有，在原有的播放记录中修改播放时间为当前的播放时间
    *   2. 如果没有，需要在数组中添加当前视频的播放对象
    *
    * */
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if(videoItem){ // 之前有
      videoItem.currentTime = event.detail.currentTime;
    }else { // 之前没有
      videoUpdateTime.push(videoTimeObj);
    }
    // 更新videoUpdateTime的状态
    this.setData({
      videoUpdateTime
    })
  },
  // 视频播放结束调用的回调
  handleEnded(event){
    // 移除记录播放时长数组中当前视频的对象
    let {videoUpdateTime} = this.data;
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1);
    this.setData({
      videoUpdateTime
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
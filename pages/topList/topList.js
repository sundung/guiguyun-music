// pages/topList/topList.js
// 导入网络请求
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList:[], // 排行榜数据
    songTypeList:[] // 曲风榜
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTopList();
  },
  async getTopList(){
    let data = await request('/toplist/detail');
    console.log(data)
    this.setData({
      topList:data.list.slice(0,4)
    })
    // 判断当前数组的长度不够三整除就祛除
    if(data.list.slice(4).length % 3 !== 0) {
      var temp = data.list.slice(4).length % 3 
      var result = data.list.slice(4,-temp)
    }
      this.setData({
        songTypeList:result
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
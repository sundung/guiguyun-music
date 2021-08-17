// pages/search/search.js
// 导入网络请求
import request from '../../api/request'
let isSend = false; // 函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:'',// 搜索 placeholder
    searchContent:'', // 输入搜索框的内容
    hotList:[], // 热搜榜
    searchList:[], // 搜索内容区域
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 默认搜索关键字
    this.getSearchContent();
    // 获取热搜数据
    this.getHotListDetail();
  },
  // 获取默认搜索关键字显示在搜索框中
  async getSearchContent(){
    let data = await request('/search/default');
    this.setData({
      placeholderContent:data.data.showKeyword
    })
    console.log(data);
  },
  // 获取热搜数据
  async getHotListDetail(){
    let data = await request('/search/hot/detail');
    console.log(data)
    this.setData({
      hotList:data.data
    })
  },
  async getSearchValue(){
    if(!this.data.searchContent){
      this.setData({
        searchList: []
      })
      return;
    }
    let {searchContent, historyList} = this.data;
    // 发请求获取关键字模糊匹配数据
    let searchListData = await request('/search', {keywords: searchContent, limit: 10});
    this.setData({
      searchList: searchListData.result.songs
    })
  },
  // 搜索框input事件
  handleInputChange(event){
    this.setData({
      searchContent: event.detail.value.trim()
    })
     if(isSend){
       return
     }
     isSend = true;
     this.getSearchValue();
    //  函数节流
    setTimeout( () => {
      isSend = false;
    }, 300)
  },
  // 清楚搜索框内容事件,并关闭搜索内容展示
  clearSearchContent(){
    console.log('object')
    this.setData({
      searchContent:'',
      searchList:[]
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
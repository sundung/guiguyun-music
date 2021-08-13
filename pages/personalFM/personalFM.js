// pages/personalFM/personalFM.js
// 导入网络请求
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personal_fm:[], // 私人FM数据
    isPlay:false, // 控制音乐的播放状态
    musicId:'', // 音乐的id
    musicLink:''// 音乐的播放连接
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用私人FM
    this.getPersonalFM();
    // 创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监视音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      this.changePlayState(true);
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });
  },
  // 获取私人FM
  async getPersonalFM(){
    let data = await request('/personal_fm');
    let res = data.data.slice(0,1)
    this.setData({
      personal_fm:res,
      musicId:res[0].privilege.id
    })
  },
  
  // 修改播放状态的功能函数
  changePlayState(isPlay){
    // 修改音乐是否的状态
    this.setData({
      isPlay
    })
  },

// 控制音乐的播放与暂停
handleMusicPlay(){
  let isPlay = ! this.data.isPlay
  let {musicId, musicLink} = this.data;
  this.musicControl(isPlay, musicId, musicLink);
},

// 控制音乐播放/暂停的功能函数
async musicControl(isPlay, musicId, musicLink){
  if(isPlay){ // 音乐播放
    if(!musicLink){
      // 获取音乐播放链接
      let musicLinkData = await request('/song/url', {id: musicId});
      // 注意 不能直接在setData中更新,异步获取不到数据
      musicLink = musicLinkData.data[0].url
      // 更新歌曲连接
      this.setData({
        musicLink
      })
    }

    
    this.backgroundAudioManager.src = musicLink;
    // 注意必须要传title 否则不会播放音乐
    this.backgroundAudioManager.title = this.data.personal_fm[0].name;
  }else { // 暂停音乐
    this.backgroundAudioManager.pause();
  }
  
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
// pages/songDetail/songDetail.js
// 导入网络请求
import request from '../../api/request'

// 获取全局实例
const appInstance = getApp();

// 导入 事件发布npm包
import PubSub from 'pubsub-js'
// 导入时间格式化插件
import dayjs from 'dayjs' 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false, // 是否播放状态
    song:{}, // 歌曲详情对象
    musicId:'', //歌曲id
    musicLink:'', // 歌曲连接
    currentTime: '00:00',  // 实时时间
    durationTime: '00:00', // 总时长
    currentWidth: 0, // 实时进度条的宽度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.musicId
    this.setData({
      musicId
    })
    // 调用歌曲详情
    this.getSongDetail(musicId);
    // 判断当前音乐是否播放过,如果有马上修改播放状态
    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicID === musicId) {
      // 修改当前你页面的播放状态
      this.setData({
        isPlay:true
      })
    }
    // 创建控制音乐播放的实例
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    // 监视音乐播放/暂停/停止
    this.backgroundAudioManager.onPlay(() => {
      // 当用户点击播放按钮时,记录当前音乐id到全局data中
      appInstance.globalData.musicID = musicId;
      this.changePlayState(true);
    });
    this.backgroundAudioManager.onPause(() => {
      this.changePlayState(false);
    });
    this.backgroundAudioManager.onStop(() => {
      this.changePlayState(false);
    });
    // 监听音乐实时播放的进度
    this.backgroundAudioManager.onTimeUpdate(() => {
      // console.log('总时长: ', this.backgroundAudioManager.duration);
      // console.log('实时的时长: ', this.backgroundAudioManager.currentTime);
      // 格式化实时的播放时间
      let currentTime = dayjs(this.backgroundAudioManager.currentTime * 1000).format('mm:ss')
      let currentWidth = this.backgroundAudioManager.currentTime/this.backgroundAudioManager.duration * 450;
      this.setData({
        currentTime,
        currentWidth
      })
      
    })
  },
  // 修改播放状态的功能函数
  changePlayState(isPlay){
    // 修改音乐是否的状态
    this.setData({
      isPlay
    })
    // 控制全局的播放状态
    appInstance.globalData.isMusicPlay = isPlay;
  },
  // 控制音乐的播放与暂停
  handleMusicPlay(){
    let isPlay = ! this.data.isPlay
    let {musicId, musicLink} = this.data;
    this.musicControl(isPlay, musicId, musicLink);
  },
  // 获取歌曲详情页面
  async getSongDetail(musicId){
    let data = await request('/song/detail',{ids:musicId})
    // data.songs[0].dt 单位ms
    let durationTime = dayjs(data.songs[0].dt).format('mm:ss');
    this.setData({
      song: data.songs[0],
      durationTime
    })
    // 动态设置导航标题
    wx.setNavigationBarTitle({
      title:this.data.song.name
    })
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
      this.backgroundAudioManager.title = this.data.song.name;
    }else { // 暂停音乐
      this.backgroundAudioManager.pause();
    }
    
  },
  // PubSub.subscribe('MY TOPIC', mySubscriber)
  // 点击上一首,下一首按钮事件
  handleSwitchMusic(event){
    
    // 获取切歌的类型
    let type = event.currentTarget.id;
    // 订阅来自 recommendSong的页面消息
    PubSub.subscribe('musicId', (msg,musicId)=>{
       // 获取音乐详情信息
       this.getSongDetail(musicId);
       // 自动播放当前的音乐
       this.musicControl(true, musicId);
       // 取消订阅
       PubSub.unsubscribe('musicId');
    })
    // 发布消息数据给recommendSong页面
    PubSub.publish('switchType', type)
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
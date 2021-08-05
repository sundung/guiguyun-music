// pages/login/login.js
// 导入网络请求
import request from '../../api/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleInput(event){
    // 获取输入框的类型
    let type = event.currentTarget.dataset.type
    this.setData({
      [type]:event.detail.value
    })
  },
  // 登录按钮点击事件
  async login(){
    let {phone,password} = this.data;
    console.log(phone,password)
    if(!phone) {
      wx.showToast({
        title:'手机号不能为空',
        icon:'none'
      })
    }
    // 定义正则表达式
    let phoneReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none'
      })
      return;
    }
    
    if(!password){
      wx.showToast({
        title: '密码不能为空',
        icon: 'none'
      })
      return;
    }
    // 前端验证通过
    let result = await request('/login/cellphone',{phone,password,isLogin:true});
    if(result.code === 200){ // 登录成功
      wx.showToast({
        title: '登录成功'
      })
      // 将用户的信息存储至本地
      wx.setStorageSync('userInfo', JSON.stringify(result.profile))
      
      // 跳转至个人中心personal页面
      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    }else if(result.code === 400){
      wx.showToast({
        title: '手机号错误',
        icon: 'none'
      })
    }else if(result.code === 502){
      wx.showToast({
        title: '密码错误',
        icon: 'none'
      })
    }else {
      wx.showToast({
        title: '登录失败，请重新登录',
        icon: 'none'
      })
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
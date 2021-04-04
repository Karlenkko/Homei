// miniprogram/pages/knowledge.js
var app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // start the questionnaire
  start(){
    wx.navigateTo({
      url : '../knowledge/quizz',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this; 
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    // 高度自适应
    wx.getSystemInfo( { 
    success: function( res ) { 
      var clientHeight=res.windowHeight,
      clientWidth=res.windowWidth,
      rpxR=750/clientWidth;
      var calc=clientHeight*rpxR-180;
      console.log(calc)
      that.setData( { 
      winHeight: calc 
      }); 
    } 
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
  footerTap:app.footerTap
})
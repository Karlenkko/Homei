// miniprogram/pages/knowledge/result.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score : 0,
    q1 : 0,   // 0 for wrong answers, 1 for correct answers
    q2 : 0,
    q3 : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // load the results from the previous page
    const {score, q1, q2, q3} = options;
    this.setData({
      score : score,
      q1 : q1,   
      q2 : q2,
      q3 : q3,
    });

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
      //console.log(calc)
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
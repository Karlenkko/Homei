// miniprogram/pages/order/order.js
const db = wx.cloud.database();
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders_wait: [],
    orders_finish: []
  },

  gotoRating(e) {
    //console.log(e.currentTarget.dataset.id);
    //console.log(e.currentTarget.dataset.name);
    wx.navigateTo({
      url: './rate_order1/rate_order1?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name,
    })
  },

  gotoTrace: function(e){
    //console.log(e.currentTarget.dataset);
    wx.navigateTo({
      url: '/pages/order/trace/trace?id='+e.currentTarget.dataset.id,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height: screenHeight * 1.9 - 180
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

    db.collection('Order').where({client_id: app.globalData.openid}).get().then((res) => {
      function deleteWait(item) {
        return item.state!="0";
      }
      function leaveWait(item) {
        return item.state=="0";
      }
      this.setData({
        orders_wait: res.data.filter(leaveWait),
        orders_finish: res.data.filter(deleteWait)
      })
    })
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
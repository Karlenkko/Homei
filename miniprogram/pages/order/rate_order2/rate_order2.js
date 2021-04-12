// miniprogram/pages/order/rate_order2/rate_order2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    rating_rest: "",
    positive_selected: "",
    negative_selected: "",
    rating_qua: "3",
    rating_coh: "3",
    star1: "./images/full_star.png",
    star2: "./images/full_star.png",
    star3: "./images/full_star.png",
    star4: "./images/empty_star.png",
    star5: "./images/empty_star.png",
    star6: "./images/full_star.png",
    star7: "./images/full_star.png",
    star8: "./images/full_star.png",
    star9: "./images/empty_star.png",
    star10: "./images/empty_star.png"
  },
  set1(e) {
    this.setData({
      rating_qua: "1",
      star1: "./images/full_star.png",
      star2: "./images/empty_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set2(e) {
    this.setData({
      rating_qua: "2",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set3(e) {
    this.setData({
      rating_qua: "3",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set4(e) {
    this.setData({
      rating_qua: "4",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set5(e) {
    this.setData({
      rating_qua: "5",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/full_star.png"
    })
  },
  set6(e) {
    this.setData({
      rating_coh: "1",
      star6: "./images/full_star.png",
      star7: "./images/empty_star.png",
      star8: "./images/empty_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set7(e) {
    this.setData({
      rating_coh: "2",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/empty_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set8(e) {
    this.setData({
      rating_coh: "3",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set9(e) {
    this.setData({
      rating_coh: "4",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/full_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set10(e) {
    this.setData({
      rating_coh: "5",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/full_star.png",
      star10: "./images/full_star.png"
    })
  },
  gotoRate3(e){
    wx.navigateTo({
      url: '../rate_order3/rate_order3?id='+this.data.id+"&name="+this.data.name+"&ratingrest="+this.data.rating_rest+"&postags="+this.data.positive_selected+"&negtags="+this.data.negative_selected+"&ratingqua="+this.data.rating_qua+"&ratingcoh="+this.data.rating_coh,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      id: options.id,
      rating_rest: options.ratingrest,
      positive_selected: options.postags,
      negative_selected: options.negtags
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
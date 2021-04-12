// miniprogram/pages/order/rate_order3/rate_order3.js
const db = wx.cloud.database();
var app = getApp();
const util= require('../../../utils/util');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    rating_rest: "",
    rating_qua: "",
    rating_coh: "",
    rating_pac: "3",
    rating_eco: "3",
    positive_all: ['good service', 'fast', 'authentic', 'tasty food', 'original', 'high quality' ],
    negative_all: ['bad service', 'too much oil', 'not so tasty', 'slow', 'poorly presented','not satisfied'],
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
      rating_pac: "1",
      star1: "./images/full_star.png",
      star2: "./images/empty_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set2(e) {
    this.setData({
      rating_pac: "2",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set3(e) {
    this.setData({
      rating_pac: "3",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set4(e) {
    this.setData({
      rating_pac: "4",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set5(e) {
    this.setData({
      rating_pac: "5",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/full_star.png"
    })
  },
  set6(e) {
    this.setData({
      rating_eco: "1",
      star6: "./images/full_star.png",
      star7: "./images/empty_star.png",
      star8: "./images/empty_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set7(e) {
    this.setData({
      rating_eco: "2",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/empty_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set8(e) {
    this.setData({
      rating_eco: "3",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/empty_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set9(e) {
    this.setData({
      rating_eco: "4",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/full_star.png",
      star10: "./images/empty_star.png"
    })
  },
  set10(e) {
    this.setData({
      rating_eco: "5",
      star6: "./images/full_star.png",
      star7: "./images/full_star.png",
      star8: "./images/full_star.png",
      star9: "./images/full_star.png",
      star10: "./images/full_star.png"
    })
  },
  submit(e){
    function getPosTags(i){
      var pages = getCurrentPages()
      var page = pages[pages.length-1]
      return page.data.positive_selected[page.data.positive_all.indexOf(i)] > 0
    }
    function getNegTags(i){
      var pages = getCurrentPages()
      var page = pages[pages.length-1]
      return page.data.negative_selected[page.data.negative_all.indexOf(i)] > 0
    }
    var positive_string = this.data.positive_all.filter(getPosTags).toString()
    var negative_string = this.data.negative_all.filter(getNegTags).toString()
    positive_string = positive_string.replace(/,/g, ";")
    negative_string = negative_string.replace(/,/g, ";")
    db.collection('Rating').add({
      data: {
        order_id: this.data.id,
        rest_name: this.data.name,
        client_id: app.globalData.openid,
        rating_rest: this.data.rating_rest,
        rating_qua: this.data.rating_qua,
        rating_coh: this.data.rating_coh,
        rating_pac: this.data.rating_pac,
        rating_eco: this.data.rating_eco,
        positive: positive_string,
        negative: negative_string,
        created_at: util.formatTime(new Date())
      }
    }).then((res) => {
      db.collection('Order').where({_id: this.data.id}).update({
        data: {
          rating: this.data.rating_rest
        }
      }).then((res) => {
        wx.switchTab({
          url: '/pages/order/order',
        })
      })
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
      rating_qua: options.ratingqua,
      rating_coh: options.ratingcoh,
      positive_selected: options.postags.split(","),
      negative_selected: options.negtags.split(",")
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
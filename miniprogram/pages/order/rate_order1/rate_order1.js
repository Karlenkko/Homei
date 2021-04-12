// miniprogram/pages/order/rate_order1/rate_order1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    rating_rest: "3",
    star1: "./images/full_star.png",
    star2: "./images/full_star.png",
    star3: "./images/full_star.png",
    star4: "./images/empty_star.png",
    star5: "./images/empty_star.png",
    positive_tags: ['good service', 'fast', 'authentic', 'tasty food', 'original', 'high quality' ],
    negative_tags: ['bad service', 'too much oil', 'not so tasty', 'slow', 'poorly presented','not satisfied'],
    positive_selected: [0,0,0,0,0,0],
    negative_selected: [0,0,0,0,0,0]
  },
  gotoRate2(e){
    wx.navigateTo({
      url: '../rate_order2/rate_order2?id='+this.data.id+"&name="+this.data.name+"&ratingrest="+this.data.rating_rest+"&postags="+this.data.positive_selected.toString()+"&negtags="+this.data.negative_selected.toString(),
    })
  },
  positive_click(e){
    var selected_tag = parseInt(e.currentTarget.dataset.selected)
    var new_positive_selected = this.data.positive_selected
    new_positive_selected[selected_tag] = 1 - new_positive_selected[selected_tag]
    var new_negative_selected = this.data.negative_selected
    if(new_positive_selected[selected_tag] > 0) {
      if(selected_tag == 0){
        new_negative_selected[0] = 0
      } else if(selected_tag == 1) {
        new_negative_selected[3] = 0
      } else if(selected_tag == 3) {
        new_negative_selected[2] = 0
      }
    }
    this.setData({
      positive_selected: new_positive_selected,
      negative_selected: new_negative_selected
    })
  },
  negative_click(e) {
    var selected_tag = parseInt(e.currentTarget.dataset.selected)
    var new_positive_selected = this.data.positive_selected
    var new_negative_selected = this.data.negative_selected
    new_negative_selected[selected_tag] = 1 - new_negative_selected[selected_tag]
    if(new_negative_selected[selected_tag] > 0) {
      if(selected_tag == 0){
        new_positive_selected[0] = 0
      } else if(selected_tag == 3) {
        new_positive_selected[1] = 0
      } else if(selected_tag == 2) {
        new_positive_selected[3] = 0
      }
    }
    this.setData({
      positive_selected: new_positive_selected,
      negative_selected: new_negative_selected
    })
  },
  set1(e) {
    this.setData({
      rating_rest: "1",
      star1: "./images/full_star.png",
      star2: "./images/empty_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set2(e) {
    this.setData({
      rating_rest: "2",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/empty_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set3(e) {
    this.setData({
      rating_rest: "3",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/empty_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set4(e) {
    this.setData({
      rating_rest: "4",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/empty_star.png"
    })
  },
  set5(e) {
    this.setData({
      rating_rest: "5",
      star1: "./images/full_star.png",
      star2: "./images/full_star.png",
      star3: "./images/full_star.png",
      star4: "./images/full_star.png",
      star5: "./images/full_star.png"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name,
      id: options.id
    })
    // if (options.ratingrest > 0) {
    //   this.setData({
    //     rating_rest: options.ratingrest
    //   })
    // }
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
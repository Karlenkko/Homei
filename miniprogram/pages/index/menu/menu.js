// miniprogram/pages/index/menu/menu.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selftags: ["healthy", "traceable", "inspiring"],
    name: "Homei Restaurant",
    rating: "5",
    rating_qua: "5",
    rating_coh: "5",
    rating_pac: "5",
    rating_eco: "5",
    nbr: "9999",
    positive_tags: "",
    negative_tags: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      name: options.name
    })
    db.collection('Restaurant').where({description : this.data.name}).get().then((res) => {
      console.log(res.data[0].positive_string)
      let hyg_ratings = res.data[0].hygiene_rating.split(";");
      this.setData({
        selftags: res.data[0].description_string.split(";"),
        rating: res.data[0].rating,
        positive_tags: res.data[0].positive_string,
        negative_tags: res.data[0].negative_string,
        rating_qua: hyg_ratings[0],
        rating_coh: hyg_ratings[1],
        rating_pac: hyg_ratings[2],
        rating_eco: hyg_ratings[3]
      })
      console.log(this.data.rating_coh)
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
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
    negative_tags: "",
    menu_normal: [],
    menu_recom: [],
    id: "",
    eta: ""
  },
  gotoFood(e){
    wx.navigateTo({
      url: './food/food?id='+e.currentTarget.dataset.foodid+"&eta="+this.data.eta+"&rest="+this.data.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      name: options.name,
      height: screenHeight + 80
    })
    db.collection('Restaurant').where({description : this.data.name}).get().then((res) => {
      let hyg_ratings = res.data[0].hygiene_rating.split(";");
      this.setData({
        id : res.data[0]._id,
        selftags: res.data[0].description_string.split(";"),
        rating: res.data[0].rating,
        positive_tags: res.data[0].positive_string,
        negative_tags: res.data[0].negative_string,
        rating_qua: hyg_ratings[0],
        rating_coh: hyg_ratings[1],
        rating_pac: hyg_ratings[2],
        rating_eco: hyg_ratings[3],
        eta: res.data[0].delivery_time
      })
      db.collection('Menu').where({restaurant_id : parseInt(this.data.id)}).get().then((res) => {
        this.setData({
          menu_normal: res.data
        })
      })
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
// miniprogram/pages/index/menu/food/food.js
const db = wx.cloud.database();
var app = getApp();
const util= require('../../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "sample dish",
    description: "",
    ingredients: "",
    restaurant_id: "",
    price: ""
  },

  orderTA(e){
    db.collection('Order').add({
      data: {
        restaurant_id: this.data.restaurant_id,
        client_id: app.globalData.openid,
        menu_id: this.data.id,
        price: this.data.price,
        rating: "",
        takeaway: "1",
        state: "0",
        created_at: util.formatTime(new Date())
      }
    }).then((res) => {
      wx.switchTab({
        url: '/pages/order/order',
      })
    })
  },
  orderDI(e){
    db.collection('Order').add({
      data: {
        restaurant_id: this.data.restaurant_id,
        client_id: app.globalData.openid,
        menu_id: this.data.id,
        price: this.data.price,
        rating: "",
        takeaway: "0",
        state: "0",
        created_at: util.formatTime(new Date())
      }
    }).then((res) => {
      wx.switchTab({
        url: '/pages/order/order',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      eta: options.eta
    })
    db.collection('Menu').where({_id: parseInt(options.id)}).get().then((res) => {
      this.setData({
        id: res.data[0]._id,
        name: res.data[0].food_name,
        description: res.data[0].description,
        calcium: res.data[0]['calcium(%daily)'],
        calories: res.data[0].calories,
        fat: res.data[0]['fat(%daily)'],
        protein: res.data[0]['protein(%daily)'],
        sodium: res.data[0]['sodium(%daily)'],
        carbo: res.data[0]['carbohydrates(%daily)'],
        restaurant_id: res.data[0].restaurant_id,
        price: res.data[0].discount_price>0?res.data[0].discount_price:res.data[0].price
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
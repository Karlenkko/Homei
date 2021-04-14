// miniprogram/pages/index/menu/menu.js
var app = getApp();
const db = wx.cloud.database();
const Client = db.collection('Client');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selftags: ["healthy", "traceable", "inspiring"],
    name: "",
    rating: "",
    rating_qua: "",
    rating_coh: "",
    rating_pac: "",
    rating_eco: "",
    nbr: "9999",
    positive_tags: "",
    negative_tags: "",
    id: "",
    eta: "",
  },
  gotoFood(e){
    wx.navigateTo({
      url: './food/food?id='+e.currentTarget.dataset.foodid+"&eta="+this.data.eta+"&rest="+this.data.name,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    this.setData({
      name: options.name,
      height: screenHeight + 80
    })
    var restaurant_info = await this.get_restaurant_info(this.data.name);
    var hyg_ratings = restaurant_info.hygiene_rating.split(";");
    this.setData({
      id : restaurant_info._id,
      selftags: restaurant_info.description_string.split(";"),
      rating: restaurant_info.rating,
      positive_tags: restaurant_info.positive_string,
      negative_tags: restaurant_info.negative_string,
      rating_qua: hyg_ratings[0],
      rating_coh: hyg_ratings[1],
      rating_pac: hyg_ratings[2],
      rating_eco: hyg_ratings[3],
      eta: restaurant_info.delivery_time
    })
    var menu_total = await this.get_menu(this.data.id);
    this.setData({
      menu_total: menu_total,
    })
    var client_tag = await this.get_client_tag();
    this.setData({
      client_tag: client_tag,
    })
    let menu_recom = [];
    let menu_normal = [];
    let allergen_alert = [];
    for (let index = 0; index < menu_total.length; index++) {
      const food_tag = menu_total[index].food_tag;
      if (!this.allergen(food_tag) && menu_total[index].recommended) {
        menu_recom.push(menu_total[index]);
      }else{
        menu_normal.push(menu_total[index]);
        allergen_alert.push(this.allergen(food_tag));
      }
    }
    this.setData({
      menu_recom: menu_recom,
      menu_normal: menu_normal,
      allergen_alert: allergen_alert,
    })
  },

  get_restaurant_info: function (name) {
    return new Promise((resolve, reject) => {
      db.collection('Restaurant').where({description : name}).get({
        success: function (res) {
          resolve(res.data[0]);
        }
      });
    })
  },

  get_menu: function (id) {
    return new Promise((resolve, reject) => {
      db.collection('Menu').where({restaurant_id : parseInt(id)}).get({
        success: function (res) {
          resolve(res.data);
        }
      });
    })
  },

  get_client_tag: function () {
    return new Promise((resolve, reject) => {
      Client.where({_openid : app.globalData.openid}).get({
        success: function(res){
          resolve(res.data[0].client_tag.split(/[;]/));
        }
      });
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

  // check whether this dish contains allergens
  allergen: function (food_tag) {
    var client_tag = this.data.client_tag;
    var food_tag_list = food_tag.split(/[;]/);
    for (var i = 3; i < client_tag.length; i++){
      if (food_tag_list.indexOf(client_tag[i]) != -1){
        return true;
      }
    }
    return false;
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
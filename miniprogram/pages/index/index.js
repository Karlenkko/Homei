// miniprogram/pages/index/index.js
var app = getApp();
const key = "MDDBZ-N2XCF-7OUJX-JGXZD-GTAR3-NAFTS";
const referer = "HOMEI";
const chooseLocation = requirePlugin('chooseLocation');

const db = wx.cloud.database();
const Client = db.collection('Client');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //openid:"",
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: true,
    canIUseOpenData: true,// wx.canIUse('open-data.type.userAvatarUrl') // 如需尝试获取用户信息可改为false\
    location: 'Please select your location',
    restaurants: [],
    burger_normal: [],
    burger_recom: [],
    asian_normal: [],
    asian_recom: [],
    dessert_recom: [],
    dessert_normal: [],
    drink_normal: [],
    drink_recom: [],
    currentTab: 0
  },
  gotoMenu(e){
    wx.navigateTo({
      url: './menu/menu?name='+e.currentTarget.dataset.name,
    })
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  // 滚动切换标签样式
 switchTab:function(e){
  this.setData({
   currentTab:e.detail.current
  });
 },
 // 点击标题切换当前页时改变样式
  switchNav:function(e){
    var cur=e.currentTarget.dataset.current;
    if(this.data.currentTab==cur){return false;}
    else{
    this.setData({
      currentTab:cur
    })
    }
  },
  getLocation:function(e){
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
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
    wx.getSystemInfo({ 
      success: function( res ) { 
        var clientHeight=res.windowHeight,
        clientWidth=res.windowWidth,
        rpxR=750/clientWidth;
        var calc=clientHeight*rpxR-180;
        that.setData({ 
          winHeight: calc 
        }); 
      } 
    });
    /*var id=app.lc(function (id){
      console.log(id);
      that.setData({openid:id});
    });*/
  },

  // check whether a restaurant should be recommended
  recommend: function (description) {
    var client_tag = this.data.client_tag;
    var description_list = description.split(/[;]/);
    var status = 1;  // 1 for recommended, 2 for not recommended, 0 for do not display
    if (client_tag.indexOf("on diet") != -1 ){
      if (description_list.indexOf("on diet") == -1){
        status = 2;
      }
    }
    if (client_tag.indexOf("vegan") != -1){
      if (description_list.indexOf("vegan") == -1){
        status = 2;
      }
    }
    if (client_tag.indexOf("vegetarian") != -1 ){
      if (description_list.indexOf("vegetarian") == -1 && description_list.indexOf("vegan") == -1){
        status = 2;
      }
    }
    if (client_tag.indexOf("halal") != -1 ){
      if (description_list.indexOf("halal") == -1){
        status = 0;
      }
    }
    return status;
  },

  // add new client tags
  add: function () {
    wx.navigateTo({
      url : 'client_tag/client_tag',
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
  onShow:async function () {
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (location){
      this.setData({
        location: location.address
      })
    }
    var openid = app.globalData.openid;
    //"oqLxe5AvyOuiJDc5QtMu2G4cqwVA";
    //app.globalData.openid;
    console.log(openid)
    var final_tags = await this.get_client_tag(openid);
    this.setData({             
      client_tag: final_tags
    })
    var restaurants = await this.get_restaurants();
    this.setData({
      restaurants: restaurants
    })
    let burger1 = []
    let burger2 = []
    let asian1 = []
    let asian2 = []
    let dessert1 = []
    let dessert2 = []
    let drink1 = []
    let drink2 = []
    for (let index = 0; index < this.data.restaurants.length; index++) {
      const type = this.data.restaurants[index].type;
      const description = this.data.restaurants[index].description_string;
      const recommendation = this.recommend(description);
      if ("burger" == type) {
        if(recommendation == 1){
          burger1.push(this.data.restaurants[index])
        }else if (recommendation == 2) {
          burger2.push(this.data.restaurants[index])
        }
      } else if ("asian" == type) {
        if(recommendation == 1){
          asian1.push(this.data.restaurants[index])
        }else if (recommendation == 2) {
          asian2.push(this.data.restaurants[index])
        }
      } else if ("dessert" == type) {
        if(recommendation == 1){
          dessert1.push(this.data.restaurants[index])
        }else if (recommendation == 2) {
          dessert2.push(this.data.restaurants[index])
        }
      } else if ("drinks" == type) {
        if(recommendation == 1){
          drink1.push(this.data.restaurants[index])
        }else if (recommendation == 2) {
          drink2.push(this.data.restaurants[index])
        }
      }
    }
    this.setData({
      burger_normal: burger2,
      burger_recom: burger1,
      asian_normal: asian2,
      asian_recom: asian1,
      dessert_normal: dessert2,
      dessert_recom: dessert1,
      drink_normal: drink2,
      drink_recom: drink1
    })
  },

  get_client_tag: function (openid) {
    return new Promise((resolve, reject) => {
      Client.where({_openid : openid}).get({
        success: function (res) {
          // long tag format stored in the database ==> short tag format displayed at the front-end
          var final_tags = [];
          var std_tag = res.data[0].client_tag;
          var ori_tags = std_tag.split(/[;]/);
          if(ori_tags[0] != "normal"){
            final_tags[final_tags.length] = ori_tags[0];
          }
          if(ori_tags[1] != "normal"){
            final_tags[final_tags.length] = ori_tags[1];
          }
          if(ori_tags[2] != "non halal"){
            final_tags[final_tags.length] = ori_tags[2];
          }
          for (var j = 3; j < ori_tags.length; j++){
            final_tags[final_tags.length] = ori_tags[j];
          }
          resolve(final_tags);
        }
      });
    })
  },

  get_restaurants: function () {
    return new Promise((resolve, reject) => {
      db.collection('Restaurant').limit(20).get({
        success: function (res) {
          resolve(res.data);
        }
      });
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
    chooseLocation.setLocation(null);
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
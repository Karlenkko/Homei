// miniprogram/pages/index/index.js
var app = getApp();
const key = "MDDBZ-N2XCF-7OUJX-JGXZD-GTAR3-NAFTS";
const referer = "HOMEI";
const chooseLocation = requirePlugin('chooseLocation');

const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  },
  gotoMenu(e){
    console.log(e)
    wx.navigateTo({
      url: './menu/menu',
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
    wx.getSystemInfo( { 
    success: function( res ) { 
      var clientHeight=res.windowHeight,
      clientWidth=res.windowWidth,
      rpxR=750/clientWidth;
      var calc=clientHeight*rpxR-180;
      console.log(calc)
      that.setData( { 
      winHeight: calc 
      }); 
    } 
    });
    db.collection('Restaurant').get().then((res) => {
      this.setData({
        restaurants: res.data
      })
      console.log(res)
    }).then(() => {
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
        if ("burger" == type) {
          burger1.push(this.data.restaurants[index])
        } else if ("asian" == type) {
          asian1.push(this.data.restaurants[index])
        } else if ("dessert" == type) {
          dessert1.push(this.data.restaurants[index])
        } else if ("drinks" == type) {
          drink1.push(this.data.restaurants[index])
        }
      }
      this.setData({
        burger_normal: burger1,
        burger_recom: burger2,
        asian_normal: asian1,
        asian_recom: asian2,
        dessert_normal: dessert1,
        dessert_recom: dessert2,
        drink_normal: drink1,
        drink_recom: drink2
      })
    })
  },

  // add new client tags
  add: function () {
    wx.navigateTo({
      url : 'client_tag/client_tag?id=24',
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
    const location = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
    if (location){
      console.log(location)
      this.setData({
        location: location.address
      })
    }
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
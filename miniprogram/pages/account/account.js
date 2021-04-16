//account.js
const app = getApp()

Page({
  data: {
  },

  // check the annual report
  report:function(){
    wx.navigateTo({
      url : 'annual_report/annual_report',
    })
  },

  // edit my preferences
  edit:function(){
    wx.navigateTo({
      url : '../index/client_tag/client_tag',
    })
  },
  // view my coupons
  coupon:function(){
    wx.navigateTo({
      url : 'coupons/coupons',
    })
  },

  onLoad: function() {
  },

})

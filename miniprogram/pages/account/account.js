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

  onLoad: function() {
  },

})

//app.js
App({
  onLaunch: function () {
    this.globalData = {}
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'cloud1-5g29tvav9c043e9d',
        traceUser: true,
      })
    }
    wx.login({
        success: function(res) {
      },
      fail: function(){
      console.log("启用wx.login函数，失败！");
      },
      complete:function(){
      console.log("已启用wx.login函数");
      }
    });
    
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        this.globalData.openid = res.result.openid
        const db = wx.cloud.database();
        db.collection('Client').where({_openid: this.globalData.openid}).get().then((res) => {
          if(res.data.length == 0) {
            db.collection('Client').add({
              data: {
                client_tag: ""
              }
            })
          }
        })
      },
      fail: err => {
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    });
  }
})

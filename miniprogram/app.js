//app.js
App({
  globalData: {
  },

  onLaunch: function () {
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
    let  PromiseArr = [];
    var openid;
    PromiseArr.push(new Promise((reslove,reject)=>{
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          openid = res.result.openid
          const db = wx.cloud.database();
          db.collection('Client').where({_openid: openid}).get().then((res) => {
            if(res.data.length == 0) {
              db.collection('Client').add({
                data: {
                  client_tag: "normal;normal;non halal"
                }
              })
            }
          })
          reslove();
        },
        fail: err => {
          wx.navigateTo({
            url: '../deployFunctions/deployFunctions',
          })
        }
      });
    }))
    Promise.all(PromiseArr).then(res=>{
      this.globalData.openid = openid;
    })
  },
})
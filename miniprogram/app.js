//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        env: 'cloud1-5g29tvav9c043e9d',
        traceUser: true,
      })
    }
    wx.login({
      success: function(res) {
      console.log(res);
      // wx.getUserProfile({
      //   desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      //   success: (res) => {
      //     this.setData({
      //       avatarUrl: res.userInfo.avatarUrl,
      //       userInfo: res.userInfo,
      //       hasUserInfo: true,
      //     })
      //     console.log(res)
      //   }
      // })
     },
    fail: function(){
     console.log("启用wx.login函数，失败！");
    },
    complete:function(){
     console.log("已启用wx.login函数");
    }
   });
    this.globalData = {}
  }
})

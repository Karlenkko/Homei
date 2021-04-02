// miniprogram/pages/knowledge.js
const db = wx.cloud.database()
const Questionnaire = db.collection('Questionnaire')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // start the questionnaire
  start(){
    Questionnaire.get({
      success: function(res){
        console.log(res.data[0]);
      }
    })
  }
})
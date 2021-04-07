// miniprogram/pages/index/client_tag/client_tag.js
var app = getApp();
const db = wx.cloud.database();
const Client = db.collection('Client');
const tag_name_list = ["vegan", "vegetarian", "on diet", "halal", "wheat", "soy", "tree nuts", "fish", "peanut", "sellfish", "eggs", "milk"]

Page({

  /**
   * 页面的初始数据
   */
  data: {

    allergen : ["wheat", "soy", "tree nuts", "fish", "peanut", "sellfish", "eggs", "milk"],
    num_new_pre : 0,
    new_tag_list : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  // choose some new tags
  click:function(event){
    var chosen_tag = parseInt(event.currentTarget.dataset.chosen);
    var new_tag_list = this.data.new_tag_list;
    var num_new_pre = this.data.num_new_pre;
    if (new_tag_list[chosen_tag]){
      new_tag_list[chosen_tag] = 0;
      num_new_pre--;
    }else{
      new_tag_list[chosen_tag] = 1;
      num_new_pre++;
      if(new_tag_list[0] && new_tag_list[1]){
        new_tag_list[1-chosen_tag] = 0;
        num_new_pre--;
      }
    }
    this.setData({             
      new_tag_list : new_tag_list,
      num_new_pre : num_new_pre,
    })
  },

  // delete the chosen tag
  delete:function(event){
    var deleted_tag = event.currentTarget.dataset.current;
    var ori_tags = this.data.tag;
    var final_tags = [];
    for (var i = 0; i < ori_tags.length; i++){
      if (ori_tags[i] == deleted_tag){
      }else{
        final_tags[final_tags.length] = ori_tags[i];
      }
    }
    this.setData({             
      tag : final_tags,
    })
    // short tag format displayed at the front-end ==> long tag format stored in the database
    var final_string = "";
    var std_tag = this.data.std_tag;
    var std_tag_list = std_tag.split(/[;]/);
    var length = std_tag_list.length;
    var counter = 0;
    if(deleted_tag == "vegan" || deleted_tag == "vegetarian"){
      std_tag_list[0] = "normal";
    }else if(deleted_tag == "on diet"){
      std_tag_list[1] = "normal";
    }else if(deleted_tag == "halal"){
      std_tag_list[2] = "non halal";
    }else{
      length--;
    }
    for (var j = 0; j < std_tag_list.length; j++){
      if(std_tag_list[j] != deleted_tag){
        if(counter != length - 1){
          final_string = final_string + std_tag_list[j] + ";";
          counter++;
        }else{
          final_string = final_string + std_tag_list[j];
        }
      }
    }
    // rewrite the std_tag
    this.setData({             
      std_tag : final_string,
    })
    // rewrite the data in the DB
    Client.doc(this.data.user_id).update({
      data:{
        client_tag:final_string
      },
    })
  },

  // add some new preferences
  add:function(){
    var num_new_pre = this.data.num_new_pre;
    if(num_new_pre){
      var new_tag_list = this.data.new_tag_list;
      var std_tag = this.data.std_tag;
      var std_tag_list = std_tag.split(/[;]/);
      if(new_tag_list[0] || new_tag_list[1]){
        if(new_tag_list[0]){
          std_tag_list[0] = "vegan";
        }else{
          std_tag_list[0] = "vegetarian";
        }
      }
      if(new_tag_list[2]){
        std_tag_list[1] = "on diet";
      }
      if(new_tag_list[3]){
        std_tag_list[2] = "halal";
      }
      for (var i = 4; i < 12; i++){
        if(new_tag_list[i]){
          var exist = 0;
          for (var j = 3; j < std_tag_list.length; j++){
            if(std_tag_list[j] == tag_name_list[i]){
              exist = 1;
            }
          }
          if(!exist){
            std_tag_list[std_tag_list.length] = tag_name_list[i];
          }
        }
      }
      std_tag = "";
      for (var k = 0; k < std_tag_list.length; k++){
        if(k != std_tag_list.length - 1){
          std_tag = std_tag + std_tag_list[k] + ";";
        }else{
          std_tag = std_tag + std_tag_list[k];
        }
      }
      var final_tags = [];
      if(std_tag_list[0] != "normal"){
        final_tags[final_tags.length] = std_tag_list[0];
      }
      if(std_tag_list[1] != "normal"){
        final_tags[final_tags.length] = std_tag_list[1];
      }
      if(std_tag_list[2] != "non halal"){
        final_tags[final_tags.length] = std_tag_list[2];
      }
      for (var h = 3; h < std_tag_list.length; h++){
        final_tags[final_tags.length] = std_tag_list[h];
      }
      this.setData({             
        tag : final_tags,
        std_tag : std_tag,
        num_new_pre : 0,
        new_tag_list : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      })
      // rewrite the data in the DB
      Client.doc(this.data.user_id).update({
        data:{
          client_tag:std_tag
        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var std_tag;  // client_tag in the standard format
    var final_tags = [];
    let  PromiseArr = [];
    const {id} = options;
    var user_id = parseInt(id);
    this.setData({
      user_id : user_id,
    });
    PromiseArr.push(new Promise((reslove,reject)=>{
      Client.where({_id : user_id}).get({
        success: function(res){
          // long tag format stored in the database ==> short tag format displayed at the front-end
          std_tag = res.data[0].client_tag;
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
          reslove();
        }
      })
    }))
    Promise.all(PromiseArr).then(res=>{
      this.setData({             
        tag : final_tags,
        std_tag : std_tag,
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
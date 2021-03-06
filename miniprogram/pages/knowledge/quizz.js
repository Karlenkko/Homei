// miniprogram/pages/knowledge/quizz.js
var app = getApp();
const db = wx.cloud.database();
const Questionnaire = db.collection('Questionnaire');
const num_ques = 12; //Total number of questions in the DB

Page({

  /**
   * 页面的初始数据
   */
  data: {
    q_num : 0,
    submitted : false, 
  },

   //switch to the next question (to the right)
  switch_right:function(){
    var curr_num = this.data.q_num;
    curr_num++;
    if(curr_num == 3){
      this.setData({
        q_num : 0
      })
    }else{
      this.setData({
        q_num : curr_num
      })
    }
   },

   //switch to the previous question (to the left)
   switch_left:function(){
    var curr_num = this.data.q_num;
    curr_num--;
    if(curr_num == -1){
      this.setData({
        q_num : 2
      })
    }else{
      this.setData({
        q_num : curr_num
      })
    }
   },

   // choose an option
   select(e){
      if(!this.data.submitted){
        var q_num = this.data.q_num;
        let update_q_final = this.data.q_final[q_num].options.map(item=>{
          if(item.id===e.currentTarget.dataset.id){
              item.status = "chosen";
          }else{
            item.status=""
          }
          return item
        })    
        var str = 'q_final[' + q_num + '].options';
        this.setData({[str]:update_q_final});
        if(q_num != 2){
          q_num++;
          this.setData({q_num : q_num})
        }
      }
  },

  // submit the quizz
  process(){
    if(!this.data.submitted){
    var points = 0;
    var results = [];
    for (var i = 0; i < 3; i++){
      let chosen_id = this.data.q_final[i].options.filter(item => item.status == "chosen").map(item=>item.id);
      if(chosen_id.length == 0){chosen_id = 0;}  //in case that no choices are chosen
      var answer_id = this.data.q_final[i].answer;
      if(chosen_id == answer_id){
        results[i] = 1;
        points++;
        var str = 'q_final[' + i + '].options[' + chosen_id + '].status';
        this.setData({submitted : true, [str] : "correct"});
      }else{
        results[i] = 0;
        var str1 = 'q_final[' + i + '].options[' + chosen_id + '].status';
        var str2 = 'q_final[' + i + '].options[' + answer_id + '].status';
        this.setData({submitted : true, [str1] : "incorrect", [str2] : "correct"});
      }
    }
    if(points > 1){
      var myDate = new Date();
			var y =	myDate.getFullYear() ;    
			var m = myDate.getMonth() + 1;       
			if(m<10){
				m = "0"+m;
			}
			var d = myDate.getDate();        
			if(d<10){
				d = "0"+d;
			}
			var h = myDate.getHours();       
			if(h<10){
				h = "0"+h;
			}
			var s = myDate.getMinutes();    
			var mytime= y +"/"+ m +"/"+ d+"-"+ h+"：" + s;
      db.collection('Coupon').add({
        data: {
          amount : 2,
          created_at :  mytime,
        }
      })
    }
    var destination = 'result?score=' + points + '&q1=' + results[0] + '&q2=' + results[1] + '&q3=' + results[2];
    wx.navigateTo({
      url : destination,
    })
  }},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var q_tem = [];
    let  PromiseArr = [];
    for (var i = 0; i < 3; i++) {
      PromiseArr.push(new Promise((reslove,reject)=>{
        var ques_id = Math.floor(Math.random()*num_ques);
        Questionnaire.where({_id : ques_id}).get({
          success: function(res){
            let object = {};
            object._id = res.data[0]._id;
            object.question = res.data[0].question;
            object.answer = parseInt(res.data[0].answer);
            var options = res.data[0].options.split(/[;]/);
            object.options = [];
            for (var j = 0; j < options.length; j++){
              object.options[object.options.length] = {id : j, value : options[j], status : ""};
            }
            q_tem[q_tem.length] = object;
            //console.log(res.data[0].question);
            reslove();
          }
        })
      }))
    }
    Promise.all(PromiseArr).then(res=>{
      this.setData({             
        q_final : q_tem,
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
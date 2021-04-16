// miniprogram/pages/order/trace/trace.js
var app = getApp();
const db = wx.cloud.database();
const Order = db.collection('Order');
const Menu = db.collection('Menu');
const Ingredient = db.collection('Ingredient');
const Product = db.collection('Product');
const Restaurant=db.collection('Restaurant');
const Farm=db.collection('Farm');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    imgurl:"",
    menu_id:0,
    product_list:[],
    productCur:0,
    product_ok:[],
    ingredient_history:[],
    trace:[],
    time:[],
    expiration:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
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
    //console.log(this.data.id);
    Order.where({
      _id:this.data.id
    }).get().then((res) => {
      //console.log(res.data)
      this.setData({
        imgurl:res.data[0].imgurl,
        menu_id:res.data[0].menu_id
      })
      //console.log(this.data.menu_id);
      this.loadProduct();
    })

  },

  loadProduct:function(){
    //console.log(this.data.order_list[this.data.orderCur].menu_id);
    Menu.where({
      _id:this.data.menu_id
    }).get().then((res) => {
      let ingredients=res.data[0].ingredients.split(";");
      let product_ok=[];
      for (let i=0;i<ingredients.length;i++){
        product_ok.push(2)
      }
      this.setData({
        product_list:ingredients,
        product_ok:product_ok
      })
      //console.log(this.data.product_list);
      this.loadHistory();
    })
  },

  loadHistory:function(){
    let product=this.data.product_list[this.data.productCur];
    let order_id=this.data.id;
    Product.where({
      name:product
    }).get().then((res) => {
      let product_id=res.data[0]._id;
      console.log(order_id);
      Ingredient.where({
        product_id:product_id,
        order_id:order_id
      }).get().then((res) => {
        console.log(res.data);
        let history=res.data[0].history.split(";");
        let time=[];
        time.push(res.data[0].created_at);
        time.push(res.data[0].updated_at);
        this.setData({
          ingredient_history:history,
          time:time,
          expiration:res.data[0].expiration.substring(0,10),
        })
        this.loadTrace();
      })
    })
  },

  loadTrace:function(){
    //console.log(this.data.ingredient_history[0]);
    //console.log(this.data.ingredient_history[1]);
    let farm="";
    let restaurant="";
    Restaurant.where({
      _id:parseInt(this.data.ingredient_history[1])
    }).get().then((res) => {
      //console.log(res.data)
      restaurant=res.data[0].description;
      console.log(restaurant);
      //console.log(this.data.ingredient_history[0]-1);
      let farm_id=(this.data.ingredient_history[0]-1).toString;
      Farm.where({
        _id:farm_id
      }).get().then((res) => {
        console.log(res.data)
        farm=res.data[0].description;
        //console.log(farm);
        let trace=[];
        trace.push(farm);
        trace.push(restaurant);
        this.setData({
          trace:trace
        })
        //console.log(this.data.trace);
        //console.log(this.data.time);
        //console.log(this.data.expiration);
      });
    });
  },

  selectProduct:function(event){
    if (this.data.productCur!=event.currentTarget.id){
      this.setData({
        productCur:event.currentTarget.id,
        ingredient_history:[],
        trace:[],
        time:[],
        expiration:"",
      })
      this.loadHistory();
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
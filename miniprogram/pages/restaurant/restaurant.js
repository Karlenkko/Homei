// miniprogram/pages/restaurant/restaurant.js
var app = getApp();
const db = wx.cloud.database();
const Order = db.collection('Order');
const Menu = db.collection('Menu');
const Ingredient = db.collection('Ingredient');
const Product = db.collection('Product');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderCur:0,
    order_list:[],
    order_name:[],
    product_list:[], //当前order所需食材
    product_ok:[], //食材是否已处理
    choice:[],
    productCur:0,
    ingre_id:[],  //当前product所有可用ingre
    ingreChosen:-1  //选中的ingre，默认不选为-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    Order.where({
      restaurant_id : 0,
      state:"0"
    }).get().then((res) => {
      //console.log(res.data);
      this.setData({
        order_list: res.data
      })
      let order_name=[];
      for (let i=0;i<this.data.order_list.length;i++){
        order_name.push(this.data.order_list[i].food);
      }
      //console.log(this.data.order_list);
      this.setData({
        order_name:order_name
      });
      //console.log(order_name);
      if (order_name.length>0) {
        this.loadProduct();
      }
      else {
        this.setData({
          orderCur:0,
          order_list:[],
          order_name:[],
          product_list:[],
          product_ok:[],
          productCur:0,
          ingre_id:[],
          ingreChosen:-1,
          choice:[]
        })
      }
    });
    
  },

  loadProduct:function(){
    //console.log(this.data.order_list[this.data.orderCur].menu_id);
    Menu.where({
      _id:this.data.order_list[this.data.orderCur].menu_id
    }).get().then((res) => {
      let ingredients=res.data[0].ingredients.split(";");
      let product_ok=[];
      let choice=[];
      for (let i=0;i<ingredients.length;i++){
        product_ok.push(0);
        choice.push(-1);
      }
      this.setData({
        product_list:ingredients,
        product_ok:product_ok,
        choice:choice
      })
      //console.log(this.data.product_ok);
      this.loadIngredient();
    })
  },

  loadIngredient:function(){
    let name=this.data.product_list[this.data.productCur];
    Product.where({
      name:name
    }).get().then((res) => {
      let id=res.data[0]._id;
      Ingredient.where({
        product_id:id,
        order_id:db.command.eq('')
      }).get().then((res) => {
        let ingre_id=[];
        let l=res.data.length>10?10:res.data.length;
        for (let i=0;i<l;i++)
        {
          ingre_id.push(res.data[i]._id)
        }
        let ingreChosen=-1;
        if (this.data.product_ok[this.data.productCur]==1){
          ingreChosen=this.data.ingreChosen;
        }
        this.setData({
          ingre_id:ingre_id,
          ingreChosen:ingreChosen
        })
      })
    })
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

  },

  showOrder:function(event){
    this.setData({
      orderCur:event.currentTarget.id,
      product_list:[],
      product_ok:[],
      productCur:0,
      ingre_id:[],
      ingreChosen:-1
    })
    this.loadProduct();
  },

  selectProduct:function(event){
    if (this.data.productCur!=event.currentTarget.id){
      this.setData({
        productCur:event.currentTarget.id,
        ingre_id:[]
      })
      this.loadIngredient();
    }
  },

  selectIngre:function(event){
    let product_ok=this.data.product_ok;
    let productCur=this.data.productCur;
    if (productCur!=this.data.product_list.length-1){
      productCur=productCur+1;
    }
    product_ok[this.data.productCur]=1;
    let id=this.data.ingre_id[event.currentTarget.id]; //要被更新的食材ID
    let order_id=this.data.order_list[this.data.orderCur]._id;
    let choice=this.data.choice;
    choice[this.data.productCur]=id;
    /*Ingredient.doc(id).update({
      data: {
        order_id:order_id
      },
      success: function(res) {
        console.log("order_id写入成功！")
      }
    })*/
    this.setData({
      ingreChosen:event.currentTarget.id,
      product_ok:product_ok,
      productCur:productCur,
      ingre_id:[],
      choice:choice
    });
    console.log(this.data.choice);
    this.checkOrder();
    this.loadIngredient();
  },

  checkOrder:function(){
    let product_ok=this.data.product_ok;
    let finish=1;
    for (let i=0;i<product_ok.length;i++) {
      if (product_ok[i]==0) {
        finish=0;
      }
    }
    if (finish==1) {
      let order_id=this.data.order_list[this.data.orderCur]._id;
      console.log(order_id);
      Order.doc(order_id).update({
        data: {
          state:"1",
        },
        success: function(res) {
          console.log("state更新成功！");
        }
      })
      this.writeid();
      this.setData({
        orderCur:0,
        //order_list:[],
        //order_name:[],
        product_list:[],
        product_ok:[],
        productCur:0,
        ingre_id:[],
        ingreChosen:-1,
        choice:[]
      })
      
      
    }
  },

  writeid:function(){
    let order_id=this.data.order_list[this.data.orderCur]._id;
    console.log(this.data.choice.length);
    for (let i=0;i<this.data.choice.length;i++)
    {
      let id=this.data.choice[i];
      console.log(id);
      Ingredient.doc(id).update({
        data: {
          order_id:order_id
        },
        success: function(res) {
          console.log("order_id写入成功！")
        }
      })
    }
    //this.onShow();
    
    //setTimeout(function () {
      this.reloadorder();
    //}, 1000)
  },

  reloadorder:function(){
    Order.where({
      restaurant_id : 0,
      state:"0"
    }).get().then((res) => {
      //console.log(res.data);
      this.setData({
        order_list: res.data
      })
      let order_name=[];
      for (let i=0;i<this.data.order_list.length;i++){
        order_name.push(this.data.order_list[i].food);
      }
      //console.log(this.data.order_list);
      this.setData({
        order_name:order_name
      });
      //console.log(order_name);
      if (order_name.length>0) {
        this.loadProduct();
      }
      else {
        this.setData({
          orderCur:0,
          order_list:[],
          order_name:[],
          product_list:[],
          product_ok:[],
          productCur:0,
          ingre_id:[],
          ingreChosen:-1,
          choice:[]
        })
      }
    });
  },

  tabSelect(e) {  //导航栏用
    this.setData({
      tabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
  }
})
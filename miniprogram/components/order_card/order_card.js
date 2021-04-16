// components/order_card/order_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img_url: {
      type: String
    },
    rest_name: {
      type: String
    },
    food_name: {
      type: String
    },
    price: {
      type: Number
    },
    rating: {
      type: Number
    },
    date: {
      type: String
    },
    order_id: {
      type:String
    },
    state:{
      type:String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    order: "",
    rated: "0",
    order_id: "",
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        order: this.properties.food_name + "  - " + "￥" + this.properties.price + "\n" + this.properties.date,
        order_id: this.properties.order_id
      })
      if (this.properties.state == "0") {
        this.setData({
          rated: "0",
          order: this.data.order + " - Cooking"
        })
      } 
      else if (this.properties.state=="1") {
        this.setData({
          rated: "0",
          order: this.data.order + " - Please comment - click to trace it"
        })
      }
      else {
        this.setData({
          rated: "1",
          order: this.data.order + " - Completed - click to trace it"
        })
      }
      
    },
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    gotoRating(e) {
      //console.log(this.data.order_id);
      //console.log(this.properties.rest_name)
      /*wx.navigateTo({
         url: '/pages/index/index?order_id='+this.data.order_id
      })*/
      wx.navigateTo({
        url: '/pages/order/rate_order1/rate_order1?id='+this.data.order_id+'&name='+this.properties.rest_name,
      });
    },
    gotoTrace(e){
      //console.log(e.currentTarget.dataset);
      wx.navigateTo({
        url: '/pages/order/trace/trace?id='+this.data.order_id,
      });
    },
  }
})

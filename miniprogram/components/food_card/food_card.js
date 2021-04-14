// components/food_card/food_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    img_url: {
      type: String
    },
    name: {
      type: String
    },
    ingredients: {
      type: String
    },
    standard_price: {
      type: Number
    },
    discount_price: {
      type: Number
    },
    color: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    price_style1: "text-decoration:line-through;font-size:18rpx;",
    price_style2: "color:#ff9f48",
    discountprice: ""
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      if (this.properties.discount_price != 0){
        this.setData({
          discountprice: "￥" + this.properties.discount_price,
        })
      } else {
        this.setData({
          discountprice: "",
          price_style1: ""
        })
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

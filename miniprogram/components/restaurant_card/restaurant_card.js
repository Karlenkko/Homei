// components/restaurant_card/restaurant_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image_url: {
      type: String,
    },
    name: {
      type: String
    },
    self_tags: {
      type: String,
    },
    eta: {
      type:String,
    },
    rating: {
      type: Number,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags: []
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let tagArray = this.properties.self_tags.split(";");
      this.setData({
        tags: tagArray,
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

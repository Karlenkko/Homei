// components/hygiene/hygiene.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Number
    },
    positive_tags:{
      type: String
    },
    negative_tags: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    positivetags: [],
    negativetags: []
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let tagArray = [];
      if (this.properties.positive_tags){
        tagArray = this.properties.positive_tags.split(";");
        this.setData({
          positivetags: tagArray,
        })
      }
      if (this.properties.negative_tags){
        tagArray = this.properties.negative_tags.split(";");
        this.setData({
          negativetags: tagArray,
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

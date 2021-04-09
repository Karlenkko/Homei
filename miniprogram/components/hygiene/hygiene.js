// components/hygiene/hygiene.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating_qua: {
      type: Number
    },
    rating_coh: {
      type: Number
    },
    rating_pac: {
      type: Number
    },
    rating_eco: {
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
    negativetags: [],
    ratingqua: "",
    ratingcoh: "",
    ratingpac: "",
    ratingeco: ""
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        ratingqua: this.properties.rating_qua,
        ratingcoh: this.properties.rating_coh,
        ratingpac: this.properties.rating_pac,
        ratingeco: this.properties.rating_eco
      })
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
  observers:{
    'positive_tags, negative_tags' (val) {
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
    "rating_qua, rating_coh, rating_pac, rating_eco" (val) {
      this.setData({
        ratingqua: this.properties.rating_qua,
        ratingcoh: this.properties.rating_coh,
        ratingpac: this.properties.rating_pac,
        ratingeco: this.properties.rating_eco
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

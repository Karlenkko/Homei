// components/customerreviews/customerreviews.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    "nbr": {
      type: String
    },
    "rating": {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/full_star.png',
    noSrc: 'images/empty_star.png',
    halfSrc: 'images/half_star.png',
    reviewcount: 0
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      this.setData({
        reviewcount: parseInt(nbr),
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

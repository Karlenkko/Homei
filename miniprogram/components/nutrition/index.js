// components/nutrition/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    calories : {
      type: Number,
    },
    fat : {
      type: Number,
    },
    protein : {
      type: Number,
    },
    carbo : {
      type: Number,
    }
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      
      this.setData({
        calories: this.properties.calories,
        fat: this.properties.fat,
        protein: this.properties.protein,
        carbo: this.properties.carbo,
      })
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

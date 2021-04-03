// components/oneIngredient/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ingredientName : {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    path: 'images/',
    fileType: '.png',
    ingredients: [],
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let ingredientArray = this.properties.ingredientName.split(",");
      for(let i=0; i<ingredientArray.length; ++i)
      {
        ingredientArray[i] = this.data.path+ingredientArray[i]+this.data.fileType;
      }
      this.setData({
        ingredients: ingredientArray,
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

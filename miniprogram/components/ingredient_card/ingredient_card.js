// components/ingredient_card/ingredient_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    ingredientName : {
      type: String,
    },
    ok:{
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    path: 'images/',
    fileType: '.png',
    source:"",
    ok:0,
    yesSrc:'images/1.png',
    noSrc:'images/0.png'
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let ingredient = this.properties.ingredientName;
      let source= this.data.path+ingredient+this.data.fileType;
      this.setData({
        ok:this.properties.ok,
        source: source,
      })
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

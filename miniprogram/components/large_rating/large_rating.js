// components/large_rating/large_rating.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rating: {
      type: Number
    },
    name: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/full_star.png',
    noSrc: 'images/empty_star.png',
    halfSrc: 'images/half_star.png',
    img1: 'images/empty_star.png',
    img2: 'images/empty_star.png',
    img3: 'images/empty_star.png',
    img4: 'images/empty_star.png',
    img5: 'images/empty_star.png'
  },

  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      let temp = this.properties.rating
      let src = []
      if (temp >= 0.5 && temp < 1){
        src[0] = this.data.halfSrc
      } else if (temp >= 1) {
        src[0] = this.data.yesSrc
      } 
      if (temp >= 1.5 && temp < 2){
        src[1] = this.data.halfSrc
      } else if (temp >= 2) {
        src[1] = this.data.yesSrc
      } 
      if (temp >= 2.5 && temp < 3){
        src[2] = this.data.halfSrc
      } else if (temp >= 3) {
        src[2] = this.data.yesSrc
      } 
      if (temp >= 3.5 && temp < 4){
        src[3] = this.data.halfSrc
      } else if (temp >= 4) {
        src[3] = this.data.yesSrc
      } 
      if (temp >= 4.5 && temp < 5){
        src[4] = this.data.halfSrc
      } else if (temp >= 5) {
        src[4] = this.data.yesSrc
      } 
      this.setData({
        img1: src[0],
        img2: src[1],
        img3: src[2],
        img4: src[3],
        img5: src[4]
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

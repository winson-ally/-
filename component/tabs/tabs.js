// component/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabindex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getindex(e){
      this.setData({
        tabindex:e.currentTarget.dataset.index
      })
    }
  }
})
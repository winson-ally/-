// component/goods/goods.js
import req from '../../utils/request/request'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: {
      type: Number,
      value: 1
    },
    limit: {
      type: Number,
      value: 5
    },
    cid: {
      type: Number,

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    textinde: 0,
    goodarr: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getindex: function (e) {
      this.setData({
        textinde: e.target.dataset.index
      })
    },
    cleardata: function () {
      const {
        page,
      } = this.properties
      this.setData({
        goodarr: []
      })
      this.getdata()
    },
    //根据id进入相应的商品详情
    todetail:function(e){
      const id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/details/details?id='+id+'',
      })
    },

    getdata: async function () {
      const {
        page,
        cid
      } = this.properties
      const res = await req('https://api-hmugo-web.itheima.net/api/public/v1/goods/search?cid=' + cid + '&pagenum=' + page)
      let dataarr = res.data.message.goods //20 1
      let newArr = dataarr // 20 1
      dataarr = this.data.goodarr.concat(newArr) //20 21
      if (this.data.goodarr.length == res.data.message.total) {
        return
      } else {
        this.setData({
          goodarr: dataarr
        })
      }

    }
  },
  lifetimes: {
    attached() {
    },
  },
  observers: {
    'page': function (page) {
      if (page > 1 ) {
        this.getdata()
      }else{
       this.cleardata()
      }

    },

  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.getdata()
    },
  }
})
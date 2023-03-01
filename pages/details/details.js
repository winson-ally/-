// pages/details/details.js
import req from '../../utils/request/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id: '',
    imgsrc: [],
    content: {},
    bigImg: '',
    bgshow: true,
    details: '',
    scshow: 'iconfont icon-shoucang',
    sc1: 'iconfont icon-shoucang',
    sc2: 'iconfont icon-shoucang1',
    scarr: [],
    gwcarr: [],
    cartnum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: async function () {
    const res = await req('https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=' + this.data.goods_id)
    this.setData({
      imgsrc: res.data.message.pics,
      content: res.data.message,
      details: res.data.message.goods_introduce
    })
    const rs = wx.getStorageSync('item')
    if (rs) {
      rs.forEach(item => {
        if (item.goods_id == res.data.message.goods_id) {
          this.setData({
            scshow: this.data.sc2
          })
        }
      })
    }
  },
  //点击图片进去图片预览
  Scaleimg: function (e) {
    this.setData({
      bigImg: e.currentTarget.dataset.bigimg,
      bgshow: false
    })
  },
  //点击预览图片或者遮罩区恢复小图片
  hiddenimg: function () {
    this.setData({
      bgshow: true
    })
  },
  //收藏
  tosc: function (e) {
    const item = e.currentTarget.dataset.item
    let scicon = ''
    let itdata = this.data.scarr
    let resarr
    if (this.data.scshow == 'iconfont icon-shoucang') {
      scicon = this.data.sc2
      itdata.push(item)
      wx.setStorageSync('item', itdata)
    } else {
      scicon = this.data.sc1
      resarr = wx.getStorageSync('item')
      let idx
      resarr.forEach((item, index) => {
        if (resarr[index] == item) {
          idx = index
        }
      })
      resarr.splice(idx, 1)
      wx.setStorageSync('item', resarr)
    }
    this.setData({
      scarr: resarr,
      scshow: scicon
    })
    // console.log(wx.getStorageSync('item'));
  },
  //添加到购物车
  addcart: function (e) {
    let item = e.currentTarget.dataset.item
    let res = this.data.gwcarr 
    item.is_del = 0
    if (res.length > 0) {
      let on
      res.forEach(i => {
        if (i.goods_id == item.goods_id) {
          on = 1
        }
      })
      if (on != 1) {
        res.push(item)
        wx.setStorageSync('cartitem', res)
      }else{
        wx.showToast({
          title: '此商品已存在',
        })
        console.log(wx.getStorageSync('cartitem'));
      }
    } else {
      res.push(item)
      wx.setStorageSync('cartitem', res)
    }
    this.setData({
      cartnum:wx.getStorageSync('cartitem').length
    })

  },
  onLoad: function (options) {
    this.setData({
      goods_id: options.id
    })
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const res = wx.getStorageSync('item')
    if (res) {
      this.setData({
        scarr: res
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const rs = wx.getStorageSync('cartitem')
    if (rs) {
      this.setData({
        gwcarr: rs,
        cartnum:rs.length
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
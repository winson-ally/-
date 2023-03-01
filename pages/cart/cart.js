// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartarr: [],
    shopnum: [],
    selectarr: [],
    selectedAll: 0,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getData: function () {
    let numarr = wx.getStorageSync('cartitem')
    if (numarr) {
      numarr.map(item => {
        if (item['shopNum']) {
          return
        } else {
          return item['shopNum'] = 1
        }
      })
      let shopnum = numarr
      let arr = []
      shopnum.forEach(item => {
        arr.push(item.shopNum)
      })
      this.setData({
        cartarr: numarr,
        shopnum: arr
      })
    }
  },
  //添加商品数量
  addnum: function (e) {
    let index = e.currentTarget.dataset.index
    let {
      shopnum
    } = this.data
    if (shopnum[index] == 99) {
      wx.showToast({
        title: '最多添加99件',
      })
    } else {
      shopnum[index]++
      this.setData({
        shopnum: shopnum
      })
      let data = wx.getStorageSync('cartitem')
      data[index].shopNum = this.data.shopnum[index]
      wx.setStorageSync('cartitem', data)
    }
    this.totalPrice()

  },
  //减少商品数量
  unaddnum: function (e) {
    let index = e.currentTarget.dataset.index
    let {
      shopnum
    } = this.data
    if (shopnum[index] == 1) {
      wx.showToast({
        title: '最少数量为1哦',
      })
    } else {
      shopnum[index]--
      this.setData({
        shopnum: shopnum
      })
      let data = wx.getStorageSync('cartitem')
      data[index].shopNum = this.data.shopnum[index]
      wx.setStorageSync('cartitem', data)
    }
    this.totalPrice()

  },
  //点击商品添加到本地缓存，或从本地缓存移除
  getitem: function (e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let del = wx.getStorageSync('cartitem')
    let selarr = this.data.selectarr
    if (del[index].is_del == 0) {
      del[index].is_del = 1
      wx.setStorageSync('cartitem', del)
      selarr.push(item)
    } else {
      del[index].is_del = 0
      wx.setStorageSync('cartitem', del)
      let idx
      selarr.forEach((i, index) => {
        if (i.goods_id == item.goods_id) {
          idx = index
        }
      })
      selarr.splice(idx, 1)
    }
    wx.setStorageSync('seltedarr', selarr)
    this.totalPrice()
    this.SelectAll()
  },
  //实现自动全选
  SelectAll: function () {
    let cart = wx.getStorageSync('cartitem')
    let num = 0
    let count = 0
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].is_del == 1) {
        count++
        if (count == cart.length) {
          num = 1
        } else {
          num = 0
        }
      }
    }
    wx.setStorageSync('SelAll', num)
    this.setData({
      selectedAll: wx.getStorageSync('SelAll')
    })

  },
  //点击全选按钮 实现全选和反选
  clickall: function ()  {
    let selall = this.data.selectedAll
    let Arr = wx.getStorageSync('cartitem')
    let num
    if (selall == 0) {
      num = 1
      wx.setStorageSync('SelAll', num)
      Arr.forEach(item => {
        item.is_del = 1
      })
      wx.setStorageSync('cartitem', Arr)

    } else {
      num = 0
      wx.setStorageSync('SelAll', num)
      Arr.forEach(item => {
        item.is_del = 0
      })
      wx.setStorageSync('cartitem', Arr)
    }
    this.getData()
    this.SelectAll()
    this.totalPrice()
  },
  //计算总价
  totalPrice: function () {
    let arr = wx.getStorageSync('cartitem')
    let num = this.data.shopnum
    let sum = 0
    if (arr) {
      arr.forEach((item, index) => {
        if (item.is_del == 1) {
          sum += item.goods_price * num[index]
        }
      })
      this.setData({
        totalPrice: sum
      })
    }


  },
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
    // this.SelectAll()
    this.totalPrice()
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
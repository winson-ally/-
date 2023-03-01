// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuindex: 0,
    collectarr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  menuidx: function (e) {
    this.setData({
      menuindex: e.currentTarget.dataset.index
    })
  },
  getdata: function () {
    const res = wx.getStorageSync('item')
    this.setData({
      collectarr: res
    })
  },
  //传递参数id并跳转到对应详情页
  todetails: function (e) {
    const id = e.currentTarget.dataset.cid
    wx.navigateTo({
      url: '/pages/details/details?id=' + id + '',
    })
  },
  onLoad: function (options) {
    this.getdata()
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
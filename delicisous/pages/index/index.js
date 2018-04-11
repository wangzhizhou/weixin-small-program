//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '地图定位三公里内的美食',
    userInfo: {},
    appInfo:{
      logoUrl:'../../image/logo.png',
      title:'搜索附近三公里内的美食'
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.switchTab({
      url: '../map/map',
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.setData({
        appInfo:this.data.appInfo
    })
  }
})

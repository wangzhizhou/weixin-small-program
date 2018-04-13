//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    musics: null,
  },
  onLoad: function () {
    if (app.globalData.musics) {
      this.setData({
        musics: app.globalData.musics,
      })
    } else {
      app.userInfoReadyCallback = res => {
        this.setData({
          musics: res.data,
        })
      }
    }
  }
})

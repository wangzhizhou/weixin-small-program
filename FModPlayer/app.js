//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var musicJSONData = wx.getStorageSync('music.json')
    if (musicJSONData.length > 0){
      console.log("music json file have been download into local storage")
      this.globalData.music = musicJSONData
    } else {
      console.log("We need download the music json file from server")
      this.requestMusicJSONData()
    }
  },
  requestMusicJSONData: function() {
    wx.request({
      url: 'https://jokerhub.cn/keygenmusicpack/music.json',
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync("music.json", res.data)
        this.globalData.music = res.data

        if (this.musicDataReadyCallback) {
          this.musicDataReadyCallback(res)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  globalData: {
    musics: null
  }
})
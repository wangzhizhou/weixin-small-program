
const util = require('../../utils/util.js')

Page({
  data: {
    weatherApikey: '', //天气apikey，在https://www.seniverse.com上申请
    city: '', //城市名称
    areaid: '', //城市对应的id
    curWd: {}, //当天天气情况
    indexs: {}, //当天天气详情说明
    forecast: {}, //未来2天的天气情况
    completed: false, //数据是否已经请求完成
    week: util.formatWeekDay(new Date()) //获取今天是周几
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    this.setData({ weatherApikey: getApp().globalData.weatherApikey });
    this.loadLocation();
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: '天气-小程序', // 分享标题
      desc: '今天天气怎么样？', // 分享描述
      path: 'path' // 分享路径
    }
  },
  //获取当前的位置信息，即经纬度
  loadLocation: function () {
    var page = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        var latitude = res.latitude;
        var longitude = res.longitude;

        //获取城市
        page.loadCity(latitude, longitude);
      }
    })
  },

  //通过经纬度获取城市
  loadCity: function (latitude, longitude) {
    var page = this;
    var weatherURL = "https://api.seniverse.com/v3/weather/daily.json?key=" + this.data.weatherApikey + "&location=" + latitude + ":" + longitude + "&language=zh-Hans&unit=c&start=0&days=5"
    wx.request({
      url: weatherURL,
      data: {},
      method: 'GET',
      success: function (res) {
        // success
        const result = res.data.results[0]
        console.log(result)
        page.setData({ city: result.location.name });
        page.setData({ areaid: result.location.id });
        page.setData({
          curWd: result.daily[0],
          forecast: result.daily.slice(1)
        });
      }
    })

    var suggestURL = "https://api.seniverse.com/v3/life/suggestion.json?key=" + this.data.weatherApikey + "&location=" + latitude + ":" + longitude + "&language=zh-Hans"
    wx.request({
      url: suggestURL,
      data: {},
      method: 'GET', 
      success: function (res) {
        const result = res.data.results[0]
        const sug = result.suggestion
        console.log(result)
        page.setData({
          completed: true,
          indexs: 
          [
            {
              name: "洗车",
              sug: sug.car_washing,
            },

            {
              name: "穿衣",
              sug: sug.dressing,
            },

            {
              name: "感冒",
              sug: sug.flu,
            },

            {
              name: "运动",
              sug: sug.sport,
            },

            {
              name: "旅游",
              sug: sug.travel,
            },

            {
              name: "紫外线",
              sug: sug.uv,
            }
          ]
        });
      }
    })
  }
})
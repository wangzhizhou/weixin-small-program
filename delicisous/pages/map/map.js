// map.js
var bmap = require('../../libs/bmap-wx.min.js');
Page({
  data: {
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/image/location-control.png',
      position: {
        left: wx.getSystemInfoSync().windowWidth - 40 - 5,
        top: wx.getSystemInfoSync().windowHeight - 40 - 5,
        width: 40,
        height: 40
      },
      clickable: true
    }]
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('map')
  },
  onLoad: function () {
    console.log('地图定位！')
    this.search()
  },
  regionchange(e) {
    console.log(e.type)

  },
  markertap(e) {
    console.log(e)
  },
  controltap(e) {
    console.log(e.controlId)
    this.setData({
      markers: []
    });
    this.mapCtx.moveToLocation()
    this.search()
  },
  search() {
    let that = this
    var BMap = new bmap.BMapWX({
      ak: 'ibyffCfGrMfADqjdOcKRNMvUMgimTwzR'//换成自己的<http://lbsyun.baidu.com>帐号开通的服务ak
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      that.setData({
        markers: data.wxMarkerData
      });
      that.mapCtx.moveToLocation()
    };
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../image/marker_red.png',
      iconTapPath: '../../image/marker_red.png'
    });
  }
})
//获取应用实例
var app = getApp()
Page({
  data: {
    scale: 16,
    latitude: 0,
    longitude: 0,

           
  },
// 页面加载
  onLoad: function (options) {
   wx.getUserInfo({
   success: (res) => {
        // console.log(res)
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,                   
        })
      }
})

    // 2.获取并设置当前位置经纬度
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        // console.log(res)
        var longitude = res.longitude
        var  latitude = res.latitude
       
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          markers: [{
          iconPath: "/images/kefu.png",
          id: 0,
          longitude: res.longitude,
          latitude: res.latitude - 0.003,
          width: 30,
          height: 30
          }]
        })
      }
    });
   // 3.设置地图控件的位置及大小，通过设备宽高定位
     // 3.设置地图控件的位置及大小，通过设备宽高定位
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls: [{
            id: 1,
            iconPath: '/images/imgs_main.png',
            position: {
              left: 10,
              top: res.windowHeight - 100,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 2,
            iconPath: '/images/saoma.png',
            position: {
              left: res.windowWidth/2 - 70,
              top: res.windowHeight - 100,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 3,
             iconPath: '/images/saoma.png',
            position: {
              left: res.windowWidth/2 +10,
              top: res.windowHeight - 100,
              width: 50,
              height: 50
            },
            clickable: true
          },
          {
            id: 4,
             iconPath: '/images/location.png',
            position: {
              left: res.windowWidth/2 - 23,
              top: res.windowHeight/2 - 33,
              width: 45,
              height: 45
            },
            clickable: true
          },
          {
            id: 5,
             iconPath: '/images/kefu.png',
            position: {
              left: res.windowWidth - 50,
              top: res.windowHeight - 100,
              width: 45,
              height: 45
            },
            clickable: true
          }],
          
        })
      }
    });

  },

// 页面显示
  onShow: function(){
    // 1.创建地图上下文，移动当前位置到地图中心
    this.mapCtx = wx.createMapContext("map");
    this.movetoPosition()
  },
// 地图控件点击事件
  bindcontroltap: function(e){
    // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id
    switch(e.controlId){
      // 点击定位控件
      case 1: this.movetoPosition();
        break;
      // 点击立即用车，判断当前是否正在计费
      case 2:  wx.scanCode({
            success: (res) => {
              // 正在获取密码通知
            }
              });
        break;
      // 点击保障控件，跳转到报障页
      case 3:wx.scanCode({
            success: (res) => {
              // 正在获取密码通知
            }
              });
        break;
      // 点击头像控件，跳转到个人中心
      case 5: wx.makePhoneCall({
  phoneNumber: '13480393648' //仅为示例，并非真实的电话号码
});
        break; 
      default: break;
    }
  },
// 地图视野改变事件
  bindregionchange: function(e){
    // 拖动地图，获取附件单车位置
    if(e.type == "begin"){
     
    }
  },

// 定位函数，移动位置到地图中心
  movetoPosition: function(){
    this.mapCtx.moveToLocation();
  }


})



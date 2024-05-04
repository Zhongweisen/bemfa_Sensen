// index.js
// 获取应用实例
const app = getApp()


Page({
  data: {

    //需要修改的地方
    uid:"4892bd7fe005ecbbccf35929157ec7e7",//用户密钥，巴法云控制台获取
    Auto:"Auto",//控制led的主题，创客云控制台创建
    DaMen:"DaMen001",//控制led的主题，创客云控制台创建
    Mppt:"Mppt",//控制led的主题，创客云控制台创建
    Shidian:"Shidian001",//控制led的主题，创客云控制台创建
    ZYBeng:"ZengYaBeng",//控制led的主题，创客云控制台创建
    dataTime:"", //记录数据上传的时间
    color0:"#999",color1:"#999",color2:"#999",color3:"#999",color4:"#999",
  },

//屏幕打开时执行的函数
  onLoad() {
    //检查设备是否在线
    this.getOnline()

    //检查设备是打开还是关闭
    this.getOnOff()
    this.xintiao()

    //设置定时器，每3秒请求一下设备状态
    setInterval(this.xintiao, 1000)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function(){
    this.onRefresh();
  },
  onRefresh:function(){
    //导航条加载动画
    wx.showNavigationBarLoading()
    //loading 提示框
    wx.showLoading({
      title: 'Loading...',
    })
    this.getOnOff();
    console.log("下拉刷新啦");
      wx.hideLoading();
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
  },


 xintiao()
  {
    this.getMppt()
    this.getAuto()
    this.getDamen()
    this.getShidian()
  },

  //获取开关状态，检查设备是打开还是关闭
  getOnOff()
  {
    this.LedSendMsg("Mppt","mppt")
    this.LedSendMsg("Auto","K")
    this.LedSendMsg("Shidian001","K")
  },

  /**
   * Button按钮点击事件
   */
  shengji: function () {
    console.log("Helloworld0.")
  },
  shezhi: function () {
    console.log("Helloworld1.")
  },
  
//请求设备状态,检查设备是否在线
getOnline(){
  var that = this
   //api 接口详细说明见巴法云接入文档
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.Auto,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color0:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color0:"#999"   //设置状态为离线
        })
      }
    }
  }),
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.Mppt,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color1:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color1:"#999"   //设置状态为离线
        })
      }
    }
  })
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.Shidian,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color2:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color2:"#999"   //设置状态为离线
        })
      }
    }
  })
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.DaMen,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color3:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color3:"#999"   //设置状态为离线
        })
      }
    }
  }) 
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.ZYBeng,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color4:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color4:"#999"   //设置状态为离线
        })
      }
    }
  })

  },

//获取数据函数
  getAuto(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.Auto,
        num:1
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          console.log(all_data_arr)//打印数组
          if(all_data_arr[0]=="Auto")
          {
            that.setData({ //数据赋值给变量
              data0:all_data_arr[1]/100,
              data1:all_data_arr[2]/100,
              data2:all_data_arr[3]/10,
              data3:all_data_arr[4]/100,
              data12:all_data_arr[5]/10,
              data13:all_data_arr[6]/10,
              data14:all_data_arr[7]/10,
              data15:all_data_arr[8]/10,
              // dataTime:res.data.time
            })
          }
          if(all_data_arr[0] == "K"){//判断是否上传了led状态
            if(all_data_arr[1] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked5:true,//赋值led状态
                })
            }else{
              that.setData({ //数据赋值给变量
                isChecked5:false,//赋值led状态
              })
            }
              if(all_data_arr[2] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked6:true,//赋值led状态
                  })
              }else{
                that.setData({ //数据赋值给变量
                  isChecked6:false,//赋值led状态
                })
              } 
            if(all_data_arr[3] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked7:true,//赋值led状态
                })
              }else{
              that.setData({ //数据赋值给变量
                isChecked7:false,//赋值led状态
              })
            }
              if(all_data_arr[4] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked8:true,//赋值led状态
                  })
              }else{
                that.setData({ //数据赋值给变量
                  isChecked8:false,//赋值led状态
                })
              }
              if(all_data_arr[5] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked9:true,//赋值led状态
                  })
              }else{
                that.setData({ //数据赋值给变量
                  isChecked9:false,//赋值led状态
                })
              }
              if(all_data_arr[6] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked10:true,//赋值led状态
                  })
              }else{
                that.setData({ //数据赋值给变量
                  isChecked10:false,//赋值led状态
                })
              }
              if(all_data_arr[7] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked11:true,//赋值led状态
                  })
                  }else{
                  that.setData({ //数据赋值给变量
                    isChecked11:false,//赋值led状态
                  })
                }
              if(all_data_arr[8] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked12:true,//赋值led状态
                })
                  }else{
                  that.setData({ //数据赋值给变量
                    isChecked12:false,//赋值led状态
                  })
              }
          }
        }
      }
    })    
  },

  getMppt(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.Mppt,
        num:1
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          console.log(all_data_arr)//打印数组
          if(all_data_arr[0]=="Mppt")
          {
            that.setData({ //数据赋值给变量
              data4:all_data_arr[1],
              data5:all_data_arr[2],
              data6:all_data_arr[3],
              data7:all_data_arr[7],
              data8:all_data_arr[4],
              data9:all_data_arr[5],
              data10:all_data_arr[6],
              data11:all_data_arr[7],
              // dataTime:res.data.time
            })
          }
          if(all_data_arr[0] == "K"){//判断是否上传了led状态
            if(all_data_arr[1] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked1:true,//赋值led状态
                })
            }else{
              that.setData({ //数据赋值给变量
                isChecked1:false,//赋值led状态
              })
            }
              if(all_data_arr[2] == "1"){//如果单片机处于打开状态
                  that.setData({ //数据赋值给变量
                    isChecked2:true,//赋值led状态
                  })
              }else{
                that.setData({ //数据赋值给变量
                  isChecked2:false,//赋值led状态
                })
              } 
          }
        }
      }
    })    
  },

  getShidian(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.Shidian,
        num:1
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          console.log(all_data_arr)//打印数组
          if(all_data_arr[0]=="Shidian001")
          {
            that.setData({ //数据赋值给变量
              data16:all_data_arr[2],
              data17:all_data_arr[3],
              data18:all_data_arr[4],
              data19:all_data_arr[5],
            })
          }
          if(all_data_arr[0] == "K"){//判断是否上传了led状态
            if(all_data_arr[1] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked4:true,//赋值led状态
                })
            }else{
              that.setData({ //数据赋值给变量
                isChecked4:false,//赋值led状态
              })
            }
          }
        }
      }
    })    
  },

  getDamen(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.DaMen,
        num:1
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          console.log(all_data_arr)//打印数组
          if(all_data_arr[0] == "DaMen001"){
            if(all_data_arr[1] == "1"){//如果单片机处于打开状态
                that.setData({ //数据赋值给变量
                  isChecked8:true,//赋值led状态
                })
            }else{
                that.setData({ //数据赋值给变量
                  isChecked8:false,//赋值led状态
                })
            }
          }  
        }
      }
    })   
  },

  //发送数据
  LedSendMsg(topic,msg){
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/push/get/?', //状态api接口，详见巴法云接入文档
      data: {
        uid: this.data.uid,
        topic:topic,
        msg:msg
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
      }
    })   
  },

  changeSwitch1(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("Mppt","mppt#001#on")
    }else{
      this.LedSendMsg("Mppt","mppt#001#off")
    }
  },
  changeSwitch2(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("Mppt","mppt#002#on")
    }else{
      this.LedSendMsg("Mppt","mppt#002#off")
    }
  },
  changeSwitch3(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K1001","on")
    }else{
      this.LedSendMsg("K1001","off")
    }
  },
  changeSwitch4(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("Shidian001","K#on")
    }else{
      this.LedSendMsg("Shidian001","K#off")
    }
  },
  changeSwitch5(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K1001","on")
    }else{
      this.LedSendMsg("K1001","off")
    }
  },
  changeSwitch6(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K2001","on")
    }else{
      this.LedSendMsg("K2001","off")
    }
  },
  changeSwitch7(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K3001","on")
    }else{
      this.LedSendMsg("K3001","off")
    }  

  },
  changeSwitch8(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("DaMen001","on")
    }else{
      this.LedSendMsg("DaMen001","off")
    }
  },
  changeSwitch9(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K5001","on")
    }else{
      this.LedSendMsg("K5001","off")
    }
  },
  changeSwitch10(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K6001","on")
    }else{
      this.LedSendMsg("K6001","off")
    }
  },
  changeSwitch11(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K7001","on")
    }else{
      this.LedSendMsg("K7001","off")
    }
  },
  changeSwitch12(e)
  {
    var status=e.detail.value
    if(status==true){
      this.LedSendMsg("K8001","on")
    }else{
      this.LedSendMsg("K8001","off")
    }
  },
})

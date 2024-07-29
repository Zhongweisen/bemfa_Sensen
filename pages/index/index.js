// index.js
// 获取应用实例
const app = getApp()
let Uxm= ''
let It = ''
let Uxf = ''
let Utg = ''
let T = ''
Page({
  data: {

    //需要修改的地方
    uid:"4892bd7fe005ecbbccf35929157ec7e7",//用户密钥，巴法云控制台获取
    Auto:"Auto",//控制led的主题，创客云控制台创建
    DaMen:"DaMen001",//控制led的主题，创客云控制台创建
    Mppt:"Mppt",//控制led的主题，创客云控制台创建
    Shidian:"Shidian001",//控制led的主题，创客云控制台创建
    ZYBeng:"ZengYaBeng",//控制led的主题，创客云控制台创建
    Wlrg:"Wlrg",//控制led的主题，创客云控制台创建
    Ktdy:"ktdy",//控制led的主题，创客云控制台创建
    dataTime:"", //记录数据上传的时间
    battryIMG:["e.png","e.png","e.png","e.png"],
    color0:"#999",color1:"#999",color2:"#999",color3:"#999",color4:"#999",color5:"#999",color6:"#999",
    showModalStatus: false,
    title:"可调电源/放电仪",
  },

//屏幕打开时执行的函数
  onLoad() {
    //检查设备是否在线
    this.getOnline()
    //读取数据
    this.getData()
    //检查设备是打开还是关闭
    this.getOnOff()

    //设置定时器
    setInterval(this.getData, 1000)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh:function(){
    this.getOnOff();
    this.getOnline()
    console.log("下拉刷新啦");
    wx.stopPullDownRefresh();//停止下拉刷新
  },
 //获取传感器数据
  getData()
  {
    this.getOnline()
    this.getMppt()
    this.getAuto()
    this.getDamen()
    this.getShidian()
    this.getktdy()
  },

  //获取开关状态
  getOnOff()
  {
    this.LedSendMsg("Mppt","mppt")
    this.LedSendMsg("Auto","K")
    this.LedSendMsg("Shidian001","K")
  },
  /**
   * 升级按钮点击事件
   */
  shengji: function (e) {
    console.log("参数：" + e.target.dataset.name)
    var that = this
          wx.showModal({
            title: '升级',
            content: e.target.dataset.name,
            success (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                if(e.target.dataset.name == '并网控制器')
                {
                  that.LedSendMsg("Auto","update")
                  console.log("Auto")
                } 
                else if(e.target.dataset.name == '太阳能控制器')
                {
                  that.LedSendMsg("Mppt","mppt#update")
                  console.log("Mppt")
                }
                else if(e.target.dataset.name == '市电')
                {
                  that.LedSendMsg("Shidian001","update")
                  console.log("Shidian001")
                }
                else if(e.target.dataset.name == '大门')
                {
                  that.LedSendMsg("DaMen001","update")
                  console.log("DaMen001")
                }
                else if(e.target.dataset.name == '增压泵')
                {
                  that.LedSendMsg("ZengYaBeng","update")
                  console.log("ZengYaBeng")
                }
                else if(e.target.dataset.name == '五菱荣光')
                {
                  that.LedSendMsg("Wlrg","update")
                  console.log("Wlrg")
                }
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
    
    })
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
      // console.log(res.data)
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
      // console.log(res.data)
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
      // console.log(res.data)
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
      // console.log(res.data)
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
      // console.log(res.data)
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
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.Wlrg,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      // console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color5:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color5:"#999"   //设置状态为离线
        })
      }
    }
  })
  wx.request({
    url: 'https://api.bemfa.com/api/device/v1/status/?', //状态api接口，详见巴法云接入文档
    data: {
      uid: that.data.uid,
      topic: that.data.Ktdy,
    },
    header: {
      'content-type': "application/x-www-form-urlencoded"
    },
    success (res) {
      // console.log(res.data)
      if(res.data.status === "online"){//如果在线
        that.setData({
          color6:"#000"  //设置状态为在线
        })
      }else{                          //如果不在线
        that.setData({
          color6:"#999"   //设置状态为离线
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
        // console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr)//打印数组
          if(all_data_arr[0]=="Auto")
          {
            that.setData({ //数据赋值给变量
              data12:all_data_arr[1]/10,
              data13:all_data_arr[2]/10,
              data14:all_data_arr[3]/10,
              data15:all_data_arr[4]/10,
              data20:all_data_arr[5]/10,
              data21:all_data_arr[6]/10,
              data22:all_data_arr[7]/10,
              data23:all_data_arr[8]/10,
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
          if(all_data_arr[0] == "canshu"){
            that.setData({ //数据赋值给变量
              Max:all_data_arr[1],
              output:all_data_arr[2],
            })
          }
          if(all_data_arr[0] == "except"){
            wx.showModal({
              title: '报错',
              content: all_data_arr[1]
            })
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
        // console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr)//打印数组
          if(all_data_arr[0]==that.data.Mppt)
          {
            that.setData({ //数据赋值给变量
              data0:all_data_arr[1],
              data1:all_data_arr[2],
              data01:(all_data_arr[1]*all_data_arr[2]).toFixed(2),
              data2:all_data_arr[3],
              data3_1:all_data_arr[4],
              data3_2:all_data_arr[5],
              // data_0:all_data_arr[6],
              // data_1:all_data_arr[7],
              // data_2:all_data_arr[8],
              // data_3:all_data_arr[9],
              cellVotage:[all_data_arr[6],all_data_arr[7],all_data_arr[8],all_data_arr[9]],
              data4:all_data_arr[10],
              data5:all_data_arr[11],
              data6:all_data_arr[12],
              data7:all_data_arr[13],
              data8:all_data_arr[14],
              data9:all_data_arr[15],
              data10:all_data_arr[16],
              data11:all_data_arr[17],
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
          if(all_data_arr[0] == "canshu"){
            that.setData({ //数据赋值给变量
             Canshu1:all_data_arr[1],
             Canshu2:all_data_arr[2],
             Canshu3:all_data_arr[3],
             Canshu4:all_data_arr[4],
             Canshu5:all_data_arr[5],
            })
          }
          if(all_data_arr[0] == "update"){
            wx.showLoading({
              title: `上传中(${all_data_arr[1]})`,
              mask:true,//遮罩
            })
            if(all_data_arr[1] == "100%"){
              that.LedSendMsg("Mppt","mppt")
              wx.showLoading({
                title: "升级完成",
                mask:true,//遮罩
              })
              setTimeout(()=>{
                wx.hideLoading()
              },1000)//设置定时器
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
        // console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr)//打印数组
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
        // console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr)//打印数组
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
          if(all_data_arr[0] == "update"){
            wx.showLoading({
              title: `上传中(${all_data_arr[1]})`,
              mask:true,//遮罩
            })
            if(all_data_arr[1] == "100%"){
              that.LedSendMsg("DaMen001","DaMen001")
              wx.showLoading({
                title: "升级完成",
                mask:true,//遮罩
              })
              setTimeout(()=>{
                wx.hideLoading()
              },1000)//设置定时器
            }
          } 
        }
      }
    })   
  },
  getWlrg(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.Wlrg,
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
          // console.log(all_data_arr)//打印数组
          if(all_data_arr[0] == "canshu"){
            that.setData({ //数据赋值给变量
             Qian:all_data_arr[1],
             Qian_jd:all_data_arr[2],
             Kong:all_data_arr[3],
             Kong_jd:all_data_arr[4],
             Hou:all_data_arr[5],
             Hou_jd:all_data_arr[6],
             Zuo:all_data_arr[7],
             Zuo_jd:all_data_arr[8],
             Zhong:all_data_arr[9],
             Zhong_jd:all_data_arr[10],
             You:all_data_arr[11],
             You_jd:all_data_arr[12],


            })
          }
          if(all_data_arr[0] == "update"){
            wx.showLoading({
              title: `上传中(${all_data_arr[1]})`,
              mask:true,//遮罩
            })
            if(all_data_arr[1] == "100%"){
              that.LedSendMsg("Mppt","mppt")
              wx.showLoading({
                title: "升级完成",
                mask:true,//遮罩
              })
              setTimeout(()=>{
                wx.hideLoading()
              },1000)//设置定时器
            }
          }
        }
      }
    })    
  },
  getktdy(){
    //获取温湿度值，屏幕初始化时，未订阅收到温湿度时，先去主动获取值
    //api 接口详细说明见巴法云接入文档
    var that = this
    wx.request({
      url: 'https://api.bemfa.com/api/device/v1/data/1/get/', //状态api接口，详见巴法云接入文档
      data: {
        uid: that.data.uid,
        topic: that.data.Ktdy,
        num:1
      },
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      success (res) {
        // console.log(res)
        if(res.data.msg.indexOf("#") != -1){//如果数据里包含#号，表示获取的是传感器值，因为单片机上传数据的时候用#号进行了包裹
          //如果有#号就进行字符串分割
          var all_data_arr = res.data.msg.split("#"); //分割数据，并把分割后的数据放到数组里。
          // console.log(all_data_arr)//打印数组
          if(all_data_arr[0]=="k")
          {
            that.setData({title:"可调电源"})
          }
          else
          {
            that.setData({title:"放电仪"})
          }
          that.setData({ //数据赋值给变量
            ktdy0:all_data_arr[1]/1000,
            ktdy1:all_data_arr[2]/1000,
            ktdy2:all_data_arr[3]/1000,
            ktdy3:all_data_arr[4]/1000,
            ktdy4:all_data_arr[5]/1000,
            ktdy5:all_data_arr[6],
          })
          
        }
      }
    })
  },
  //发送数据
  LedSendMsg(topic,msg)
  {
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
   //开关
  changeSwitch(e)
  {
    var k = e.currentTarget.dataset.k
    var status=e.detail.value
    console.log(k)
    if(k=="k1")
    {
      if(status==true){
        this.LedSendMsg("Mppt","mppt#001#on")
      }else{
        this.LedSendMsg("Mppt","mppt#001#off")
      }
    }
    else if(k=="k2")
    {
      if(status==true){
        this.LedSendMsg("Mppt","mppt#002#on")
      }else{
        this.LedSendMsg("Mppt","mppt#002#off")
      }
    } 
    else if(k=="k3")
    {
      if(status==true){
        this.LedSendMsg("K1001","on")
      }else{
        this.LedSendMsg("K1001","off")
      }
    }  
    else if(k=="k4")
    {
      if(status==true){
        this.LedSendMsg("Shidian001","K#on")
      }else{
        this.LedSendMsg("Shidian001","K#off")
      }
    }  
    else if(k=="k5")
    {
      if(status==true){
        this.LedSendMsg("K1001","on")
      }else{
        this.LedSendMsg("K1001","off")
      }
    }  
    else if(k=="k6")
    {
      if(status==true){
        this.LedSendMsg("K2001","on")
      }else{
        this.LedSendMsg("K2001","off")
      }
    }  
    else if(k=="k7")
    {
      if(status==true){
        this.LedSendMsg("K3001","on")
      }else{
        this.LedSendMsg("K3001","off")
      } 
    }  
    else if(k=="k8")
    {
      if(status==true){
        this.LedSendMsg("DaMen001","K#on")
      }else{
        this.LedSendMsg("DaMen001","K#off")
      }
    }  
    else if(k=="k9")
    {
      if(status==true){
        this.LedSendMsg("K5001","on")
      }else{
        this.LedSendMsg("K5001","off")
      }
    }  
    else if(k=="k10")
    {
      if(status==true){
        this.LedSendMsg("K6001","on")
      }else{
        this.LedSendMsg("K6001","off")
      }
    }  
    else if(k=="k11")
    {
      if(status==true){
        this.LedSendMsg("K7001","on")
      }else{
        this.LedSendMsg("K7001","off")
      }
    }  
    else if(k=="k12")
    {
      if(status==true){
        this.LedSendMsg("K8001","on")
      }else{
        this.LedSendMsg("K8001","off")
      }
    } 
  },
  
  Uxm(event) { 
    Uxm = event.detail.value*1000
  },
  It(event) {
    It = event.detail.value*1000
  },
  Uxf(event) { 
    Uxf = event.detail.value*1000
  },
  Utg(event) { 
    Utg = event.detail.value*1000
  },
  T(event) { 
    T = event.detail.value
  },
  tanchuan: function (e) {
    let that=this
    var currentStatu = e.currentTarget.dataset.statu;
    var Shebei = e.target.dataset.name;
    this.setData
    ({
      Shebei:Shebei,
      Bingwangkongzhiqi: false,
      Taiyangnengkongzhiqi: false,
      Dantidianya:false,
    })
    if (Shebei=="并网控制器") 
    {
      this.setData({Bingwangkongzhiqi: true})
    }
    else if (Shebei=="太阳能控制器") 
    {
      this.setData({Taiyangnengkongzhiqi: true})
      if(currentStatu == "open"){
        this.LedSendMsg("Mppt","shezhi#canshu")
      }else if(currentStatu == "close")
      {
        this.LedSendMsg("Mppt","shezhi#Uxm:"+Uxm+"VIt:"+It+"AUxf:"+Uxf+"VUtg:"+Utg+"VT:"+T+"°C")
      }
    }
    else if (Shebei=="单体电压")
    {  
      {this.setData({Dantidianya:true})}
      if(currentStatu == "ble_off")
      {
        this.LedSendMsg("Mppt","shezhi#ble#off")
        currentStatu ="close" 
      }else if(currentStatu == "ble_on")
      {
        this.LedSendMsg("Mppt","shezhi#ble#on")
        currentStatu ="close" 

      }

    }
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例  
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });
    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;
 
    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(-100).step();
 
    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })
 
    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })
    }.bind(this), 200)
    // 显示 
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
    //关闭 
    if (currentStatu == "close") {
    this.setData({
      showModalStatus: false
    });
  }
  },
})

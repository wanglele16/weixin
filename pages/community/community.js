//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        indexbanner: [],
        loadingHidden: false,
        cocourse: [],
        refreshHidden: true,
        loadmoreHidden: true,
        swiper: {
            indicatorDots: true,
            autoplay: true,
            interval: 3000,
            duration: 300
        }
    },
    //事件处理函数

    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://localhost/mock/cobanner.json',
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        indexbanner: res.data,
                        loadingHidden: true
                    });
                    wx.request({
                        url: 'http://localhost/mock/cocourse.json',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function(res) {
                            that.setData({
                                cocourse: res.data
                            });
                            console.log(res.data);
                        }
                    })
                }, 1000);
            },
            fail: function(error) {
                console.log(error);
            }
        });
    },






});

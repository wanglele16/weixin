//index.js
//获取应用实例
var app = getApp();
Page({
    data: {
        indexnavs: [{
            nav: '资讯'
        }, {
            nav: '视频'
        }, {
            nav: '赛事'
        }, {
            nav: '培训'
        }, {
            nav: '户外'
        }, {
            nav: '原创'
        }, {
            nav: '热点'
        }, {
            nav: '组图'
        }, {
            nav: '爆料'
        }],
        current: 0,
        swiper: {
            indicatorDots: false,
            autoplay: false,
            interval: 0,
            duration: 300
        },
        indexbanner: [],
        loadingHidden: false,
        indexcourse: [],
        refreshHidden: true,
        loadmoreHidden: true
    },
    //事件处理函数

    onLoad: function() {
        var that = this;
        wx.request({
            url: 'http://localhost/mock/indexbanner.json',
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
                        url: 'http://localhost/mock/indexcourse.json',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        success: function(res) {
                            that.setData({
                                indexcourse: res.data
                            })
                        }
                    })
                }, 1000);
            },
            fail: function(error) {
                console.log(error);
            }
        });
    },

    switchSlider: function(event) {
        this.setData({
            current: event.target.dataset.index
        })
    },

    changeSlider: function(event) {
        this.setData({
            current: event.detail.current
        });
    },

    actionToupper: function() {
        var that = this;
        this.setData({
            refreshHidden: false
        });
        wx.request({
            url: 'http://localhost/mock/refresh.json',
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        indexcourse: res.data.concat(that.data.indexcourse),
                        refreshHidden: true
                    });
                }, 1500);
            }
        })
    },

    actionTolower: function() {
        var that = this;
        this.setData({
            loadmoreHidden: false
        });
        wx.request({
            url: 'http://localhost/mock/more.json',
            success: function(res) {
                setTimeout(function() {
                    that.setData({
                        indexcourse: that.data.indexcourse.concat(res.data),
                        refreshHidden: true
                    });
                }, 1500);
            }
        });
    }
});

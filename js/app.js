/*
    js公共类库
*/
(function (w) {

    function App() {}
    App.prototype = {
        //获取scrollTop
        getScrollTop: function () {
            var scrollTop = 0,
                bodyScrollTop = 0,
                documentScrollTop = 0;　　
            if (document.body) {　　　　
                bodyScrollTop = document.body.scrollTop;　　
            }　　
            if (document.documentElement) {　　　　
                documentScrollTop = document.documentElement.scrollTop;　　
            }　　
            scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;　　
            return scrollTop;
        },

        //文档的总高度
        getScrollHeight: function () {
            var scrollHeight = 0,
                bodyScrollHeight = 0,
                documentScrollHeight = 0;　　
            if (document.body) {　　　　
                bodyScrollHeight = document.body.scrollHeight;　　
            }　　
            if (document.documentElement) {　　　　
                documentScrollHeight = document.documentElement.scrollHeight;　　
            }　　
            scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;　　
            return scrollHeight;
        },

        //浏览器视口的高度
        getWindowHeight: function () {
            var windowHeight = 0;　　
            if (document.compatMode == "CSS1Compat") {　　　　
                windowHeight = document.documentElement.clientHeight;　　
            } else {　　　　
                windowHeight = document.body.clientHeight;　　
            }　　
            return windowHeight;
        }
    }

    w.Page = function (obj) {
        for(var i in obj){
            App.prototype[i]=obj[i];
        }
        var app = new App();
        if('onLoad' in app){
            window.onload = function () {
                app.onLoad();
            };
        }
        if('onReachBottom' in app){
            window.onscroll = function () {　　
                if (app.getScrollTop() + app.getWindowHeight() == app.getScrollHeight()) {　　　　
                    app.onReachBottom();　
                }
            }
        }
        return app;
    }
})(window);
/*
    js公共类库 前端老徐 by 2017/3/29
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
        for (var i in obj) {
            App.prototype[i] = obj[i];
        }
        var app = new App();
        if ('onLoad' in app) {
            window.onload = function () {
                app.onLoad();
            };
        }
        if ('onReady' in app) {
            /*
             * 传递函数给whenReady()
             * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
             */
            var whenReady = (function () { //这个函数返回whenReady()函数
                var funcs = []; //当获得事件时，要运行的函数
                var ready = false; //当触发事件处理程序时,切换为true

                //当文档就绪时,调用事件处理程序
                function handler(e) {
                    if (ready) return; //确保事件处理程序只完整运行一次

                    //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好
                    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
                        return;
                    }

                    //运行所有注册函数
                    //注意每次都要计算funcs.length
                    //以防这些函数的调用可能会导致注册更多的函数
                    for (var i = 0; i < funcs.length; i++) {
                        funcs[i].call(document);
                    }
                    //事件处理函数完整执行,切换ready状态, 并移除所有函数
                    ready = true;
                    funcs = null;
                }
                //为接收到的任何事件注册处理程序
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', handler, false);
                    document.addEventListener('readystatechange', handler, false); //IE9+
                    window.addEventListener('load', handler, false);
                } else if (document.attachEvent) {
                    document.attachEvent('onreadystatechange', handler);
                    window.attachEvent('onload', handler);
                }
                //返回whenReady()函数
                return function whenReady(fn) {
                    if (ready) {
                        fn.call(document);
                    } else {
                        funcs.push(fn);
                    }
                }
            })();
            whenReady(app.onReady);
        }
        if('onResize' in app){
            var flag = null;
            window.onresize=function(){
                if (flag) clearTimeout(flag);
                flag = setTimeout(function () {
                    app.onResize()
                }, 120)　
            };
        }
        if ('onReachBottom' in app) {
            var flag = null;
            window.onscroll = function () {　　
                if (app.getScrollTop() + app.getWindowHeight() == app.getScrollHeight()) {
                    if (flag) clearTimeout(flag);
                    flag = setTimeout(function () {
                        app.onReachBottom();
                    }, 200)　
                }
            }
        }
        return app;
    }
})(window);
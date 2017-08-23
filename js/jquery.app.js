'use strict';
/*
    js公共类库
*/
(function (w) {

    function App() {}
    App.prototype = {
      //TODO
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
            $(document).ready(function(){
                app.onReady();
            });
        }
        if('onResize' in app){
            var flag = null;
            $(window).on('resize',function(){
                if (flag) clearTimeout(flag);
                flag = setTimeout(function () {
                    app.onResize()
                }, 120)　
            })
        }
        if ('onScroll' in app) {
            $(window).on('scroll',function(){
                app.onScroll();
            });
        }
        return app;
    }
})(window);

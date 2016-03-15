(function() {
    "use strict";
    
    var bgImg = undefined;
    var bgwidth = 0;
    var bgheight = 0;
    
    var get = function(id) {
        return document.getElementById(id);
    }
    var renderImage = function() {
        var wwidth = window.innerWidth;
        var wheight = window.innerHeight;
        if(wwidth / wheight < bgwidth / bgheight) {
            bgImg.style.left = 0 - (bgwidth / bgheight * wheight - wwidth) / 2 + "px";
            bgImg.style.top = "0";
            bgImg.style.height = wheight + "px";
            bgImg.style.width = bgwidth / bgheight * wheight + "px";
        }
        else {
            bgImg.style.left = "0";
            bgImg.style.top = 0 - (bgheight / bgwidth * wwidth - wheight) / 2 + "px";
            bgImg.style.width = wwidth + "px";
            bgImg.style.height = bgheight / bgwidth * wwidth + "px";
        }
    };
    var loaded = function() {
        bgImg = get("bgImg");
        bgwidth = bgImg.width;
        bgheight = bgImg.height;
        
        renderImage();
    };
    var windowResize = function() {
        if(bgImg != undefined)
            renderImage();
    };
    window.onresize = function () {
      windowResize();  
    };
    window.onload = function() {
        loaded();
    };
})();
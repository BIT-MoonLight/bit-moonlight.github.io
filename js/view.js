(function () {
    "use strict";

    var frame = undefined;
    var tsksCont = undefined;
    var section = undefined;

    var lastsel = -1;
    var secsel = -1;

    var secCounts = [12, 0, 0, 0];

    var getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    var get = function (id) {
        return document.getElementById(id);
    };

    var naviClick = function (e) {
        var childs = section.children;
        var item = e.currentTarget;
        var i = 0;
        for (i = 0; i < childs.length; i++)
            if (childs[i] == item)
                break;

        if (secsel == i)
            return;

        if (secsel != -1 && secsel != i) {
            childs[secsel].style.backgroundColor = "rgba(0, 0, 0 ,0)";
            childs[secsel].style.color = "#fff";
        }
        childs[i].style.backgroundColor = "#5E9ABF";
        childs[i].style.color = "#000";
        secsel = i;

        frame.src = "pages/ex" + (lastsel + 1) + "/tsk" + (secsel + 1) + "/index.html";
    };
    var firstClick = function (e) {
        var childs = tsksCont.children;
        var item = e.currentTarget;
        var index = 0;
        for (index = 0; index < childs.length; index++)
            if (item == childs[index])
                break;

        if (lastsel != -1 && lastsel != index) {
            childs[lastsel].style.backgroundColor = "rgba(0, 0, 0 ,0)";
            childs[lastsel].style.color = "#fff";

        }
        childs[index].style.backgroundColor = "#D8D9C7";
        childs[index].style.color = "#000";
        lastsel = index;

        loadsection(index);
    };

    var loadsection = function (i) {
        var childs = section.children;
        for (var index = childs.length - 1; index >= 0; index--) {
            section.removeChild(childs[index]);
        }

        secsel = -1;

        for (var index = 0; index < secCounts[i]; index++) {
            var div = document.createElement("div");
            div.innerHTML = "任务" + (index + 1);
            section.appendChild(div);

            div.onclick = naviClick;
        }
    }

    var load = function () {
        tsksCont = get("tsksCont");
        section = get("section");
        frame = get("frame");

        var childs = tsksCont.children;
        var i = 0;
        for (i = 0; i < childs.length; i++) {
            childs[i].onclick = firstClick;
        }

        var tskv = getQueryString("tsk");
        if (tskv != null) {
            i = parseInt(tskv);
            if(i <= 4 && i >= 1)
                firstClick({currentTarget : childs[i - 1]});
        }
    };

    window.onload = function () {
        load();
    };

})();
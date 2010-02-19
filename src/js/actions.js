﻿/**
*配置显示搜索的方式
*/
var info = {};

//选择的文本
info.selectText = "";

//搜索引擎列表
info.engines_ = null;

//右键菜单
info["menu"] = {};
//点击右键菜单显示搜索模式
info["menu"].searchResultDisplayMode = "";




var dragEngine;
var dragImageDisplayMode;
var dragLinkDisplayMode;

request_({ option: "getinfo" }, function(opt) {
    info.engines_ = JSON.parse(opt.engines);
    info["menu"].searchResultDisplayMode = opt.searchshow;
    dragEngine = opt.dragengine;
    dragImageDisplayMode = opt.dragImageDisplayMode;
    dragLinkDisplayMode = opt.dragLinkDisplayMode;
    info.drag = JSON.parse(opt.superdrag);
});


/**
* 执行的动作
*/
var actions = {
    "newtab": function(src) {
        postMessage_({ "newtab": { url: src} });
    },
    "newbackgroundtab": function(src) {
        postMessage_({ "newtab": { url: src, selected: false} });
    },
    "closetab": function() { },
    "newwindow": function(src) {
        var screenW = screen.width, screenH = screen.height;
        postMessage_({
            "left": (screenW - screenW * (3 / 4)) / 2,
            "top": (screenH - screenH * (3 / 4)) / 2,
            "width": screenW * (3 / 4),
            "height": screenH * (3 / 4),
            "newwindow": src
        });
    },
    "closewindow": function() { },
    "imageviewer": function(src) {
        var viewer = new imageViewer(new makedom(src));
        viewer.initUI();

        viewer.initEvent();
        viewer.openViewer();
        viewer.setAction();
    }
};



//获取鼠标位置
var _lastX, _lastY, _accuX, _accuY;
addEvent(window, "dragstart", function(ev) {
    _lastX = ev.screenX;
    _lastY = ev.screenY;
    _accuX = _accuY = 0;
});

//获取鼠标方向
function mouseDirection(ev) {
    var move, last_idx,
			x = ev.screenX, y = ev.screenY,
			offsetX = x - _lastX, offsetY = y - _lastY,
			absX = Math.abs(offsetX), absY = Math.abs(offsetY);

    /* the movement is negligible */
    //if (absX < _cfg.minstep && absY < _cfg.minstep) return;

    _lastX = x;
    _lastY = y;
    _accuX += absX;
    _accuY += absY;

    if (absX > absY) {
        move = offsetX > 0 ? "right" : "left";
    } else {
        move = offsetY > 0 ? "down" : "up";
    }
    return move;
}

﻿//interface.js
var Interface=function(a,b){if(arguments.length!=2){throw new Error("Interface constructor called with "+arguments.length+"arguments, but expected exactly 2.");}this.name=a;this.methods=[];for(var i=0,len=b.length;i<len;i++){if(typeof b[i]!=='string'){throw new Error("Interface constructor expects method names to be "+"passed in as a string.");}this.methods.push(b[i])}};Interface.ensureImplements=function(a){if(arguments.length<2){throw new Error("Function Interface.ensureImplements called with "+arguments.length+"arguments, but expected at least 2.");}for(var i=1,len=arguments.length;i<len;i++){var b=arguments[i];if(b.constructor!==Interface){throw new Error("Function Interface.ensureImplements expects arguments "+"two and above to be instances of Interface.");}for(var j=0,methodsLen=b.methods.length;j<methodsLen;j++){var c=b.methods[j];if(!a[c]||typeof a[c]!=='function'){throw new Error("Function Interface.ensureImplements: object "+"does not implement the "+b.name+" interface. Method "+c+" was not found.");}}}};
//events.js
function addEvent(a,b,c){if(a.addEventListener){a.addEventListener(b,c,false)}else{if(!c.$$guid)c.$$guid=addEvent.guid++;if(!a.events)a.events={};var d=a.events[b];if(!d){d=a.events[b]={};if(a["on"+b]){d[0]=a["on"+b]}}d[c.$$guid]=c;a["on"+b]=handleEvent}};addEvent.guid=1;function removeEvent(a,b,c){if(a.removeEventListener){a.removeEventListener(b,c,false)}else{if(a.events&&a.events[b]){delete a.events[b][c.$$guid]}}};function handleEvent(a){var b=true;a=a||fixEvent(((this.ownerDocument||this.document||this).parentWindow||window).event);var c=this.events[a.type];for(var i in c){this.$$handleEvent=c[i];if(this.$$handleEvent(a)===false){b=false}}return b};function fixEvent(a){a.preventDefault=fixEvent.preventDefault;a.stopPropagation=fixEvent.stopPropagation;return a};fixEvent.preventDefault=function(){this.returnValue=false};fixEvent.stopPropagation=function(){this.cancelBubble=true};
//util.js
function setCenter(a) { a.style.left = (iWindowW - a.offsetWidth) / 2 + scrollX() + "px"; a.style.top = (iWindowH - a.offsetHeight) / 2 + scrollY() + "px" } function addAnimation(a, b, c) { var d = new FX(a, b, { duration: .2, tweenType: "Sine", easeType: "easeOut", callback: c }); d.start() } function bind(b, c, d) { var e = c || window; if (arguments.length > 2) { var f = Array.prototype.slice.call(arguments, 2); return function() { var a = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(a, f); return b.apply(e, a) } } else { return function() { return b.apply(e, arguments) } } }; function log(a) { if (window.console) console.log(a) } function getPos(a) { var b, top; if (a.getBoundingClientRect) { b = a.getBoundingClientRect().left, top = a.getBoundingClientRect().top } else { b = findPos(a)[0], top = findPos(a)[1] } return { x: b, y: top} } function findPos(a) { var b = curtop = 0; if (a.offsetParent) { while (a.offsetParent) { b += a.offsetLeft; curtop += a.offsetTop; a = a.offsetParent } } return [b, curtop] } function remove(a) { if (a) a.parentNode.removeChild(a) } function getScrollbarSize() { var i = document.createElement('p'); i.style.width = '100%'; i.style.height = '200px'; var o = document.createElement('div'); o.style.position = 'absolute'; o.style.top = '0px'; o.style.left = '0px'; o.style.visibility = 'hidden'; o.style.width = '200px'; o.style.height = '150px'; o.style.overflow = 'hidden'; o.appendChild(i); document.body.appendChild(o); var a = i.offsetWidth; var b = i.offsetHeight; o.style.overflow = 'scroll'; var c = i.offsetWidth; var d = i.offsetHeight; if (a == c) c = o.clientWidth; if (b == d) d = o.clientWidth; document.body.removeChild(o); return { width: a - c, height: b - d} } function scrollX() { var a = document.documentElement; return self.pageXOffset || (a && a.scrollLeft) || document.body.scrollLeft } function scrollY() { var a = document.documentElement; return self.pageYOffset || (a && a.scrollTop) || document.body.scrollTop } var ua = navigator.userAgent.toLowerCase(), isWebkit = /webkit/.test(ua), isOpera = /opera/.test(ua), isIE = /msie/.test(ua); var dom = { getDocumentHeight: function() { var a = (document.compatMode != 'CSS1Compat') ? document.body.scrollHeight : document.documentElement.scrollHeight; var h = Math.max(a, this.getViewportHeight()); return h }, getDocumentWidth: function() { var a = (document.compatMode != 'CSS1Compat') ? document.body.scrollWidth : document.documentElement.scrollWidth; var w = Math.max(a, this.getViewportWidth()); return w }, getViewportHeight: function() { var a = self.innerHeight; var b = document.compatMode; if ((b || isIE) && !isOpera) { a = (b == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight } return a }, getViewportWidth: function() { var a = self.innerWidth; var b = document.compatMode; if (b || isIE) { a = (b == 'CSS1Compat') ? document.documentElement.clientWidth : document.body.clientWidth } return a } }; function windowHeight() { var a = document.documentElement; return self.innerHeight || (a && a.clientHeight) || document.body.clientHeight } function windowWidth() { var a = document.documentElement; return self.innerWidth || (a && a.clientWidth) || document.body.clientWidth }
//tween.js
var Tween={Linear:function(t,b,c,d){return c*t/d+b},Quad:{easeIn:function(t,b,c,d){return c*(t/=d)*t+b},easeOut:function(t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b}},Cubic:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b}},Quart:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t+b},easeOut:function(t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b}},Quint:{easeIn:function(t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOut:function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b}},Sine:{easeIn:function(t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOut:function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOut:function(t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b}},Expo:{easeIn:function(t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOut:function(t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOut:function(t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b}},Circ:{easeIn:function(t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOut:function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOut:function(t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b}},Elastic:{easeIn:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOut:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b)},easeInOut:function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(!a||a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b}},Back:{easeIn:function(t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOut:function(t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOut:function(t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b}},Bounce:{easeIn:function(t,b,c,d){return c-Tween.Bounce.easeOut(d-t,0,c,d)+b},easeOut:function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOut:function(t,b,c,d){if(t<d/2)return Tween.Bounce.easeIn(t*2,0,c,d)*.5+b;else return Tween.Bounce.easeOut(t*2-d,0,c,d)*.5+c*.5+b}}};
//fx.js
(function(){this.FX=function(a,b,c){this.el=f.get(a);this.attributes=b;this.duration=c.duration||0.7;this.tweenType=c.tweenType||"Sine";this.easeType=c.easeType||"easeInOut";this.callback=c.callback||function(){};this.ctx=c.ctx||window;this.frame={},this.endAttr={},this.startAttr={}};this.FX.prototype={start:function(){var b=this;this.getAttributes();this.duration=this.duration*1000;this.time=new Date().getTime();this.animating=true;this.timer=setInterval(function(){var a=new Date().getTime();if(a<(b.time+b.duration)){b.elapsed=a-b.time;b.setCurrentFrame()}else{b.frame=b.endAttr;b.complete()}b.setAttributes()},1)},ease:function(a,e){var c=e-a;var b=a;var d=this.duration;var t=this.elapsed;return Tween[this.tweenType][this.easeType](t,b,c,d)},complete:function(){clearInterval(this.timer);this.timer=null;this.animating=false;this.callback.call(this.ctx)},setCurrentFrame:function(){for(var a in this.startAttr){if(this.startAttr[a]instanceof Array){this.frame[a]=[];for(var i=0;i<this.startAttr[a].length;i++){this.frame[a][i]=this.ease(this.startAttr[a][i],this.endAttr[a][i])}}else{this.frame[a]=this.ease(this.startAttr[a],this.endAttr[a])}}},getAttributes:function(){for(var a in this.attributes){switch(a){case'color':case'background-color':this.startAttr[a]=h(this.attributes[a].from||f.getStyle(this.el,a));this.endAttr[a]=h(this.attributes[a].to);break;case'scrollTop':case'scrollLeft':var b=(this.el==document.body)?(document.documentElement||document.body):this.el;this.startAttr[a]=this.attributes[a].from||b[a];this.endAttr[a]=this.attributes[a].to;break;default:this.startAttr[a]=this.attributes[a].from||(parseFloat(f.getStyle(this.el,a))||0);this.endAttr[a]=this.attributes[a].to;break}}},setAttributes:function(){for(var a in this.frame){switch(a){case'opacity':f.setStyle(this.el,a,this.frame[a]);break;case'scrollLeft':case'scrollTop':var b=(this.el==document.body)?(document.documentElement||document.body):this.el;b[a]=this.frame[a];break;case'color':case'background-color':var c='rgb('+Math.floor(this.frame[a][0])+','+Math.floor(this.frame[a][1])+','+Math.floor(this.frame[a][2])+')';f.setStyle(this.el,a,c);break;default:f.setStyle(this.el,a,this.frame[a]+'px');break}}}};var f={get:function(a){return(typeof a=="string")?document.getElementById(a):a},getStyle:function(a,b){b=g(b);var c=document.defaultView;if(c&&c.getComputedStyle){return a.style[b]||c.getComputedStyle(a,"")[b]||null}else{if(b=='opacity'){var d=a.filters('alpha').opacity;return isNaN(d)?1:(d?d/100:0)}return a.style[b]||a.currentStyle[b]||null}},setStyle:function(a,b,c){if(b=='opacity'){a.style.filter="alpha(opacity="+c*100+")";a.style.opacity=c}else{b=g(b);a.style[b]=c}}};var g=(function(){var d={};return function(c){if(!d[c]){return d[c]=c.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}else{return d[c]}}})();var h=function(a){var b=a.match(/^#?(\w{2})(\w{2})(\w{2})$/);if(b&&b.length==4){return[parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16)]}b=a.match(/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/);if(b&&b.length==4){return[parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10)]}b=a.match(/^#?(\w{1})(\w{1})(\w{1})$/);if(b&&b.length==4){return[parseInt(b[1]+b[1],16),parseInt(b[2]+b[2],16),parseInt(b[3]+b[3],16)]}}})();

var isIE = (document.all) ? true : false;

var $ = function(id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
    create: function() {
        return function() { this.initialize.apply(this, arguments); }
    }
}

var Extend = function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
}

var Bind = function(object, fun) {
    return function() {
        return fun.apply(object, arguments);
    }
}

var BindAsEventListener = function(object, fun) {
    return function(event) {
        return fun.call(object, (event || window.event));
    }
}

function addEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};

function removeEventHandler(oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};

//拖放程序
var Drag = Class.create();
Drag.prototype = {
    //拖放对象,触发对象
    initialize: function(drag) {
        this.Drag = $(drag);
        this._x = this._y = 0;
        this._fM = BindAsEventListener(this, this.Move);
        this._fS = Bind(this, this.Stop);
        this.Drag.style.position = "absolute";
        addEventHandler(this.Drag, "mousedown", BindAsEventListener(this, this.Start));
    },
    //准备拖动
    Start: function(oEvent) {
        this._x = oEvent.clientX - this.Drag.offsetLeft;
        this._y = oEvent.clientY - this.Drag.offsetTop;
        addEventHandler(document, "mousemove", this._fM);
        addEventHandler(document, "mouseup", this._fS);

        if (isIE) {
            //焦点丢失
            addEventHandler(this.Drag, "losecapture", this._fS);
            //设置鼠标捕获
            this.Drag.setCapture();
        } else {
            //焦点丢失
            addEventHandler(window, "blur", this._fS);
            //阻止默认动作
            oEvent.preventDefault();
        };
        
        
        
    },
    //拖动
    Move: function(oEvent) {
        this.Drag.style.left = oEvent.clientX - this._x + "px";
        this.Drag.style.top = oEvent.clientY - this._y + "px";
    },
    //停止拖动
    Stop: function(oEvent) {
        removeEventHandler(document, "mousemove", this._fM);
        removeEventHandler(document, "mouseup", this._fS);

        if (isIE) {
            removeEventHandler(this.Drag, "losecapture", this._fS);
            this.Drag.releaseCapture();
        } else {
            removeEventHandler(window, "blur", this._fS);
        };
    }
};


function makedom(a){var b=document.createElement("span");b.id="imageview";var c=document.createElement("div");c.style.cssText+=";z-index:95;left:0px;top:0px;position:absolute;background-color:#000;";c.style.filter="alpha(opacity=50)";c.style.opacity="0.5";c.style.width=dom.getDocumentWidth()+"px";c.style.height=dom.getDocumentHeight()+"px";var d=document.createElement("div");d.style.cssText+=";cursor:pointer;z-index:999;position:fixed;top:3px;left:700px;width:22px;height:22px;;font-weight:bold;font-size:24pt;border:solid #fff 1px;background:url(http://imageview.googlecode.com/svn/trunk/images/close.png) no-repeat 1px 1px";b.appendChild(d);b.appendChild(c);document.body.appendChild(b);var e=document.createElement("img");e.src=a;e.style.cssText+=";position:absolute;visibility:hidden;z-index:101;-webkit-border-radius: 5px;-webkit-box-shadow: 0px 0px 19px rgba(0, 0, 0, .5);cursor:move;";b.appendChild(e);var f=document.createElement("div");f.style.cssText+=";z-index;105;left:0px;top:0px;position:absolute;display:none;background-color:#000;width:70px;height:35px;text-align:center;line-height:35px;vertical-align:middle;color:#fff;";f.style.filter="alpha(opacity=40)";f.style.opacity="0.4";b.appendChild(f);this.oDivClose_=d;this.oImg_=e;this.oDivZoom_=f;this.oDivCover_=c;this.oSpanUiBase=b}makedom.prototype={getCloseButton:function(){return this.oDivClose_},getImage:function(){return this.oImg_},getIndicator:function(){return this.oDivZoom_},getCover:function(){return this.oDivCover_},close:function(){remove(document.getElementById("imageview"))}};makedom.getInstance=function(a){return makedom.instance_||(makedom.instance_=new this(a))};
var IimageViewDom=new Interface('IimageViewDom',['getCloseButton','getImage','getIndicator',"getCover"]);var iWindowW=windowWidth(),iWindowH=windowHeight();var ua=navigator.userAgent.toLowerCase(),isWebkit=/webkit/.test(ua),isOpera=/opera/.test(ua),isIE=/msie/.test(ua);function imageViewer(a){Interface.ensureImplements(a,IimageViewDom);this.oDivClose=a.getCloseButton();this.oImg=a.getImage();this.imgHeight;this.imgWidth;this.whrate;this.left;this.top;new Drag(this.oImg);this.oDivCover=a.getCover();this.oDivZoom=a.getIndicator();this.closeUi=a.close}imageViewer.prototype={zoomfn:null,actions_:[],closeViewer:function(){var a=this.oImg;var b=this.oDivZoom;var c=this.oDivClose;var d=this.oDivCover;var e=windowWidth()/2,leftFrom=(windowWidth()-a.offsetWidth)/2,topTo=windowHeight()/2,topFrom=(windowHeight()-a.offsetHeight)/2,widthFrom=a.offsetWidth,heightFrom=a.offsetHeight;var f=this;addAnimation(a,{"left":{from:leftFrom,to:e},"top":{from:topFrom,to:topTo},'width':{from:widthFrom,to:0},'height':{from:heightFrom,to:0}},function(){d.style.display="none";a.style.display="none";f.removeEvent();f.closeUi()})},zoomOut:function(){var a=this.oImg;var b=this.oDivZoom;var c=this.oDivClose;var d=this.oDivCover;this.imgHeight=a.height;this.imgWidth=a.width;this.whrate=this.imgHeight/this.imgWidth;this.left=getPos(a).x;this.top=getPos(a).y;var e=windowWidth()/2+scrollX(),leftTo=(windowWidth()-a.width)/2+scrollX(),topFrom=windowHeight()/2+ +scrollY(),topTo=(windowHeight()-a.height)/2+scrollY(),widthTo=a.width,heightTo=a.height;a.style.visibility="visible";a.style.display="block";d.style.display="";a.style.height=a.style.width="0px";a.style.left=e+"px";a.style.top=topFrom+"px";addAnimation(a,{"left":{from:e,to:leftTo},"top":{from:topFrom,to:topTo},'width':{from:0,to:widthTo},'height':{from:0,to:heightTo}})},openViewer:function(){var a=this.actions_;var b=this.oImg;var c=this.zoomOut;var d=this;this.imageOnReady(bind(function(){var i=0,ilen=a.length;for(;i<ilen;i++){a[i]()}c.call(this)},this))},imageOnReady:function(a){var b=this.oImg;if(b.width==0){b.onload=function(){a()}}else{a()}},initUI:function(){var b=this.actions_;var c=this.oImg;var d=this.oDivZoom;var e=this.oDivClose;b.push(function(){setCenter(c);var a=2;if(document.body.scrollHeight>iWindowH)a=22;e.style.left=(iWindowW-e.offsetWidth)-a+"px"})},initEvent:function(){var a=this.oDivClose;var b=this.oImg;addEvent(a,"click",bind(this.closeViewer,this));addEvent(document,"keydown",bind(this.keyHandler,this));this.zoomfn=bind(this.wheel,this);if(document.addEventListener&&!isWebkit&&!isOpera){addEvent(document,"DOMMouseScroll",this.zoomfn)}else{addEvent(document,"mousewheel",this.zoomfn)}},removeEvent:function(){if(document.addEventListener&&!isWebkit&&!isOpera){removeEvent(document,"DOMMouseScroll",this.zoomfn)}else{removeEvent(document,"mousewheel",this.zoomfn)}},keyHandler:function(e){switch(e.keyCode){case 27:this.closeViewer();break;case 40:this.zoom(e,-15);break;case 38:this.zoom(e,15);break}},zoom:function(e,a){this.zoomOnPointer(e,a);e.preventDefault();e.stopPropagation()},wheel:function(e){if(!isIE&&!isWebkit&&!isOpera){this.zoom(e,e.detail*-4)}else{this.zoom(e,e.wheelDelta)}},zoomOnCenter:function(e,a){var b=this.oImg;var c=this.oDivZoom;var d=this.oDivClose;var f=this.imgHeight/this.imgWidth,_width=b.width,_height=b.height,width=b.width+a*10,height=width*f;if(width<0)return;b.style.width=width+'px';b.style.height=height+'px';b.style.top=parseFloat(b.style.top)-(height-_height)/2+"px";b.style.left=parseFloat(b.style.left)-(width-_width)/2+"px"},zoomOnPointer:function(e,a){var b=this.oImg;addEvent(b,"mousemove",bind(function(){this.imgWidth=b.offsetWidth;this.imgHeight=b.offsetHeight;this.top=getPos(b).y;this.left=getPos(b).x},this));var c=e.clientX-this.left;var d=e.clientY-this.top;b.style.width=parseFloat(b.style.width)+a+"px";var f=b.width/this.imgWidth;b.style.height=parseFloat(b.style.width)*this.whrate+"px";var g=parseFloat(f*c);var h=parseFloat(f*d);b.style.top=scrollY()+this.top-(h-d)+"px";b.style.left=scrollX()+this.left-(g-c)+"px"}};



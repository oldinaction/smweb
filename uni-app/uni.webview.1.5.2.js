!function (e, n) {
    "object" == typeof exports && "undefined" != typeof module ? 
		module.exports = n() 
		: 
		"function" == typeof define && define.amd ? 
			define(n) 
			// 原来为 : (e = e || self).uni = n() 容易和uni-app项目产生冲突
			: (e = e || self).uniWebview = n()
}
(this, (function () {
        "use strict";
        try {
            var e = {};
            Object.defineProperty(e, "passive", {
                get: function () {
                    !0
                }
            }),
            window.addEventListener("test-passive", null, e)
        } catch (e) {}
        var n = Object.prototype.hasOwnProperty;
        function t(e, t) {
            return n.call(e, t)
        }
        var i = [],
        a = function (e, n) {
            var t = {
                options: {
                    timestamp: +new Date
                },
                name: e,
                arg: n
            };
            if (window.__dcloud_weex_postMessage || window.__dcloud_weex_) {
                if ("postMessage" === e) {
                    var a = {
                        data: [n]
                    };
                    return window.__dcloud_weex_postMessage ? window.__dcloud_weex_postMessage(a) : window.__dcloud_weex_.postMessage(JSON.stringify(a))
                }
                var o = {
                    type: "WEB_INVOKE_APPSERVICE",
                    args: {
                        data: t,
                        webviewIds: i
                    }
                };
                window.__dcloud_weex_postMessage ? window.__dcloud_weex_postMessageToService(o) : window.__dcloud_weex_.postMessageToService(JSON.stringify(o))
            }
            if (!window.plus)
				// 非plus环境，如微信小程序环境。此处获取的window.parent为小程序window，postMessage最终基于WeixinJSBridge
                return window.parent.postMessage({
                    type: "WEB_INVOKE_APPSERVICE",
                    data: t,
                    pageId: ""
                }, "*");
            if (0 === i.length) {
                var r = plus.webview.currentWebview();
                if (!r)
                    throw new Error("plus.webview.currentWebview() is undefined");
                var d = r.parent(),
                s = "";
                s = d ? d.id : r.id,
                i.push(s)
            }
            if (plus.webview.getWebviewById("__uniapp__service"))
                plus.webview.postMessageToUniNView({
                    type: "WEB_INVOKE_APPSERVICE",
                    args: {
                        data: t,
                        webviewIds: i
                    }
                }, "__uniapp__service");
            else {
                var w = JSON.stringify(t);
                plus.webview.getLaunchWebview().evalJS('UniPlusBridge.subscribeHandler("'.concat("WEB_INVOKE_APPSERVICE", '",').concat(w, ",").concat(JSON.stringify(i), ");"))
            }
        },
        o = {
            navigateTo: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.url;
                a("navigateTo", {
                    url: encodeURI(n)
                })
            },
            navigateBack: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.delta;
                a("navigateBack", {
                    delta: parseInt(n) || 1
                })
            },
            switchTab: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.url;
                a("switchTab", {
                    url: encodeURI(n)
                })
            },
            reLaunch: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.url;
                a("reLaunch", {
                    url: encodeURI(n)
                })
            },
            redirectTo: function () {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = e.url;
                a("redirectTo", {
                    url: encodeURI(n)
                })
            },
            getEnv: function (e) {
                window.plus ? e({
                    plus: !0
                }) : e({
                    h5: !0
                })
            },
            postMessage: function () {
				// 有可能页面还未加载完成，导致判断环境失败，从而返回对象的postMessage函数为此中间函数，上同
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                a("postMessage", e.data || {})
            }
        },
        r = /uni-app/i.test(navigator.userAgent),
        d = /Html5Plus/i.test(navigator.userAgent),
        s = /complete|loaded|interactive/;
        var w = window.my && navigator.userAgent.indexOf("AlipayClient") > -1;
        var u = window.swan && window.swan.webView && /swan/i.test(navigator.userAgent);
        var c = window.qq && window.qq.miniProgram && /QQ/i.test(navigator.userAgent) && /miniProgram/i.test(navigator.userAgent);
        var g = window.tt && window.tt.miniProgram && /toutiaomicroapp/i.test(navigator.userAgent);
        // 判断是否为微信小程序
		var v = window.wx && window.wx.miniProgram && /micromessenger/i.test(navigator.userAgent) && /miniProgram/i.test(navigator.userAgent);
        var p = window.qa && /quickapp/i.test(navigator.userAgent);
        for (var l, _ = function () {
            window.UniAppJSBridge = !0,
            document.dispatchEvent(new CustomEvent("UniAppJSBridgeReady", {
                    bubbles: !0,
                    cancelable: !0
                }))
        }, f = [function (e) {
                    if (r || d)
                        return window.__dcloud_weex_postMessage || window.__dcloud_weex_ ? document.addEventListener("DOMContentLoaded", e)
                             : window.plus && s.test(document.readyState) ? setTimeout(e, 0) : document.addEventListener("plusready", e), o
                    }, function (e) {
                        if (v)
							// 为微信小程序，判断WeixinJSBridge(容器提供，如微信小程序编辑器或微信客户端)是否准备就绪
							// 如果已经准备就绪则直接触发UniAppJSBridgeReady；否则监听WeixinJSBridgeReady事件，并返回window.wx.miniProgram对象(window.wx为jweixin-1.4.0.js即JS-SDK提供)
                            return window.WeixinJSBridge && window.WeixinJSBridge.invoke ? setTimeout(e, 0) : document.addEventListener("WeixinJSBridgeReady", e), window.wx.miniProgram
                    }, function (e) {
                        if (c)
                            return window.QQJSBridge && window.QQJSBridge.invoke ? setTimeout(e, 0) : document.addEventListener("QQJSBridgeReady", e), window.qq.miniProgram
                    }, function (e) {
                        if (w) {
                            document.addEventListener("DOMContentLoaded", e);
                            var n = window.my;
                            return {
                                navigateTo: n.navigateTo,
                                navigateBack: n.navigateBack,
                                switchTab: n.switchTab,
                                reLaunch: n.reLaunch,
                                redirectTo: n.redirectTo,
                                postMessage: n.postMessage,
                                getEnv: n.getEnv
                            }
                        }
                    }, function (e) {
                        if (u)
                            return document.addEventListener("DOMContentLoaded", e), window.swan.webView
                    }, function (e) {
                        if (g)
                            return document.addEventListener("DOMContentLoaded", e), window.tt.miniProgram
                    }, function (e) {
                        if (p) {
                            window.QaJSBridge && window.QaJSBridge.invoke ? setTimeout(e, 0) : document.addEventListener("QaJSBridgeReady", e);
                            var n = window.qa;
                            return {
                                navigateTo: n.navigateTo,
                                navigateBack: n.navigateBack,
                                switchTab: n.switchTab,
                                reLaunch: n.reLaunch,
                                redirectTo: n.redirectTo,
                                postMessage: n.postMessage,
                                getEnv: n.getEnv
                            }
                        }
                    }, function (e) {
                        return document.addEventListener("DOMContentLoaded", e),
						// 有可能页面还未加载完成，导致判断环境失败，此处先返回一个中间函数
                        o
                    }
                ], m = 0; m < f.length && !(l = f[m](_)); m++);
		// l存在或l={}
        l || (l = {});
		// 原来为 var E = "undefined" != typeof uni ? uni : {}; 容易和uni-app项目产生冲突
        var E = "undefined" != typeof uniWebview ? uniWebview : {};
        if (!E.navigateTo)
            for (var b in l)
                t(l, b) && (E[b] = l[b]);
        return E.webView = l,
		// 返回的顶级对象E(最终设值到window上或返回成模块)
        E
    }));

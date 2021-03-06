/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.vms_feature || (window.vms_feature = function() {
    return !1
}), window.DWait && DWait.run("jms/lib/vms_feature.js");
Browser = {}, Browser.isKHTML = navigator.userAgent.indexOf("KHTML") >= 0, Browser.isWebkit = navigator.userAgent.indexOf("WebKit") >= 0, Browser.isGecko = !Browser.isKHTML && "Gecko" == navigator.product, Browser.isChrome = Browser.isWebkit && navigator.userAgent.indexOf("Chrome") >= 0, Browser.isFirefox = Browser.isGecko && navigator.userAgent.indexOf("Firefox") >= 0, Browser.isSafari = !Browser.isChrome && Browser.isWebkit && navigator.userAgent.indexOf("Safari") >= 0, Browser.isIE = !Browser.isGecko && void 0 != navigator.cpuClass && "Microsoft Internet Explorer" == navigator.appName, Browser.isOpera = navigator.userAgent.indexOf("Opera") >= 0, Browser.isIE8 = Browser.isIE && navigator.userAgent.indexOf("MSIE 8") >= 0, Browser.isIE9 = Browser.isIE && navigator.userAgent.indexOf("MSIE 9") >= 0, Browser.isIE10 = Browser.isIE && navigator.userAgent.indexOf("MSIE 10") >= 0, Browser.isWebkit && (Browser.webkitVersion = parseFloat(navigator.userAgent.match(/WebKit\/(\d+\.\d+)/)[1])), Browser.isMac = navigator.appVersion.indexOf("Mac") >= 0, Browser.isTux = navigator.appVersion.indexOf("Linux") >= 0, Browser.isWin = navigator.appVersion.indexOf("Windows") >= 0, Browser.isPhantom = "callPhantom" in window, Browser.isTouch = "ontouchstart" in window && !Browser.isPhantom, Browser.isAndroid = navigator.userAgent.indexOf("Android") >= 0, Browser.isBB = navigator.userAgent.indexOf("BB10") >= 0, Browser.isWebOS = navigator.userAgent.indexOf("webOS") >= 0, Browser.isPhone = navigator.userAgent.indexOf("iPhone") >= 0, Browser.isPad = navigator.userAgent.indexOf("iPad") >= 0, Browser.isPod = navigator.userAgent.indexOf("iPod") >= 0, Browser.isIOS = Browser.isPhone || Browser.isPad || Browser.isPod, Browser.isMobile = Browser.isIOS || Browser.isAndroid || Browser.isBB || Browser.isWebOS, Browser.isTouch && void 0 === Browser.touchTested && DWait.ready(".domready", function() {
    document.body.className += " is_touch", Browser.touchTested = !0
}), window.DWait && DWait.run("jms/lib/browser.js");
window.console || (window.console = {
    log: function() {},
    trace: function() {},
    info: function() {},
    warn: function() {}
}), window.deviantART || (window.deviantART = {}), window.Base = function() {}, Base.extend = function(t, n) {
    var e = Base.prototype.extend;
    Base._prototyping = !0;
    var o = new this;
    e.call(o, t), o.base = function() {}, delete Base._prototyping;
    var i = o.constructor,
        r = o.constructor = function() {
            if (!Base._prototyping) if (this._constructing || this.constructor == r) this._constructing = !0, i.apply(this, arguments), delete this._constructing;
            else if (null != arguments[0]) return (arguments[0].extend || e).call(arguments[0], o)
        };
    return r.ancestor = this, r.extend = this.extend, r.forEach = this.forEach, r.implement = this.implement, r.prototype = o, r.toString = this.toString, r.valueOf = function(t) {
        return "object" == t ? r : i.valueOf()
    }, e.call(r, n), "function" == typeof r.init && r.init(), r
}, Base.prototype = {
    extend: function(t, n) {
        if (arguments.length > 1) {
            var e = this[t];
            if (e && "function" == typeof n && (!e.valueOf || e.valueOf() != n.valueOf()) && /\bbase\b/.test(n)) {
                var o = n.valueOf();
                n = function() {
                    var t = this.base || Base.prototype.base;
                    this.base = e;
                    var n = o.apply(this, arguments);
                    return this.base = t, n
                }, n.valueOf = function(t) {
                    return "object" == t ? n : o
                }, n.toString = Base.toString
            }
            this[t] = n
        } else if (t) {
            var i = Base.prototype.extend;
            Base._prototyping || "function" == typeof this || (i = this.extend || i);
            for (var r = {
                toSource: null
            }, s = ["constructor", "toString", "valueOf"], a = Base._prototyping ? 0 : 1; u = s[a++];) t[u] != r[u] && i.call(this, u, t[u]);
            for (var u in t) r[u] || i.call(this, u, t[u])
        }
        return this
    }
}, Base = Base.extend({
    constructor: function() {
        this.extend(arguments[0])
    }
}, {
    ancestor: Object,
    version: "1.1",
    forEach: function(t, n, e) {
        for (var o in t) void 0 === this.prototype[o] && n.call(e, t[o], o, t)
    },
    implement: function() {
        for (var t = 0; arguments.length > t; t++) "function" == typeof arguments[t] ? arguments[t](this.prototype) : this.prototype.extend(arguments[t]);
        return this
    },
    toString: function() {
        return this.valueOf() + ""
    }
}), window.DWait && DWait.run("jms/lib/Base.js");
BIND_FUNCTION_SOURCE = "return arguments.callee._refunction_f.apply(arguments.callee._refunction_obj || this, arguments.callee._refunction_args ? (arguments.length ? bind.args(arguments.callee._refunction_args, arguments) : arguments.callee._refunction_args) : arguments);", window.bind = function(n, r) {
    var e, t, i, u, o;
    for (o = 2, "function" == typeof this ? (o = 1, e = this) : e = r, t = Function(BIND_FUNCTION_SOURCE), t._refunction_obj = n, t._refunction_f = e, u = [], i = o; arguments.length > i; i++) u.push(arguments[i]);
    return u.length && (t._refunction_args = u), t
}, bind.cache = function(n, r) {
    var e;
    return e = bind.lookup(n, r), e || (e = bind(n, r), bind.storage.push([n, r, e])), e
}, bind.storage = [], bind.release = function(n, r) {
    return bind.lookup(n, r)
}, bind.lookup = function(n, r, e) {
    var t, i;
    for (t = 0; i = bind.storage[t]; t++) if (i[0] == n && i[1] == r) return e && bind.storage.splice(t, 1), i[2];
    return null
}, bind.args = function(n, r) {
    var e;
    for (n = n.slice(0), e = 0; e != r.length; e++) n.push(r[e]);
    return n
}, Function.prototype.bindTo = bind, window.DWait && DWait.run("jms/lib/bind.js");
(function(e, t) {
    function n(e) {
        var t = e.length,
            n = ct.type(e);
        return ct.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function r(e) {
        var t = kt[e] = {};
        return ct.each(e.match(pt) || [], function(e, n) {
            t[n] = !0
        }), t
    }
    function i(e, n, r, i) {
        if (ct.acceptData(e)) {
            var o, a, s = ct.expando,
                u = e.nodeType,
                l = u ? ct.cache : e,
                c = u ? e[s] : e[s] && s;
            if (c && l[c] && (i || l[c].data) || r !== t || "string" != typeof n) return c || (c = u ? e[s] = tt.pop() || ct.guid++ : s), l[c] || (l[c] = u ? {} : {
                toJSON: ct.noop
            }), ("object" == typeof n || "function" == typeof n) && (i ? l[c] = ct.extend(l[c], n) : l[c].data = ct.extend(l[c].data, n)), a = l[c], i || (a.data || (a.data = {}), a = a.data), r !== t && (a[ct.camelCase(n)] = r), "string" == typeof n ? (o = a[n], null == o && (o = a[ct.camelCase(n)])) : o = a, o
        }
    }
    function o(e, t, n) {
        if (ct.acceptData(e)) {
            var r, i, o = e.nodeType,
                a = o ? ct.cache : e,
                u = o ? e[ct.expando] : ct.expando;
            if (a[u]) {
                if (t && (r = n ? a[u] : a[u].data)) {
                    ct.isArray(t) ? t = t.concat(ct.map(t, ct.camelCase)) : t in r ? t = [t] : (t = ct.camelCase(t), t = t in r ? [t] : t.split(" ")), i = t.length;
                    for (; i--;) delete r[t[i]];
                    if (n ? !s(r) : !ct.isEmptyObject(r)) return
                }(n || (delete a[u].data, s(a[u]))) && (o ? ct.cleanData([e], !0) : ct.support.deleteExpando || a != a.window ? delete a[u] : a[u] = null)
            }
        }
    }
    function a(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(St, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : Et.test(r) ? ct.parseJSON(r) : r
                } catch (o) {}
                ct.data(e, n, r)
            } else r = t
        }
        return r
    }
    function s(e) {
        var t;
        for (t in e) if (("data" !== t || !ct.isEmptyObject(e[t])) && "toJSON" !== t) return !1;
        return !0
    }
    function u() {
        return !0
    }
    function l() {
        return !1
    }
    function c() {
        try {
            return G.activeElement
        } catch (e) {}
    }
    function f(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e
    }
    function p(e, t, n) {
        if (ct.isFunction(t)) return ct.grep(e, function(e, r) {
            return !!t.call(e, r, e) !== n
        });
        if (t.nodeType) return ct.grep(e, function(e) {
            return e === t !== n
        });
        if ("string" == typeof t) {
            if ($t.test(t)) return ct.filter(t, e, n);
            t = ct.filter(t, e)
        }
        return ct.grep(e, function(e) {
            return ct.inArray(e, t) >= 0 !== n
        })
    }
    function d(e) {
        var t = Ut.split("|"),
            n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }
    function h(e, t) {
        return ct.nodeName(e, "table") && ct.nodeName(1 === t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function g(e) {
        return e.type = (null !== ct.find.attr(e, "type")) + "/" + e.type, e
    }
    function m(e) {
        var t = on.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }
    function y(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) ct._data(n, "globalEval", !t || ct._data(t[r], "globalEval"))
    }
    function v(e, t) {
        if (1 === t.nodeType && ct.hasData(e)) {
            var n, r, i, o = ct._data(e),
                a = ct._data(t, o),
                s = o.events;
            if (s) {
                delete a.handle, a.events = {};
                for (n in s) for (r = 0, i = s[n].length; i > r; r++) ct.event.add(t, n, s[n][r])
            }
            a.data && (a.data = ct.extend({}, a.data))
        }
    }
    function b(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !ct.support.noCloneEvent && t[ct.expando]) {
                i = ct._data(t);
                for (r in i.events) ct.removeEvent(t, r, i.handle);
                t.removeAttribute(ct.expando)
            }
            "script" === n && t.text !== e.text ? (g(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), ct.support.html5Clone && e.innerHTML && !ct.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && tn.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function x(e, n) {
        var r, i, o = 0,
            a = typeof e.getElementsByTagName !== Y ? e.getElementsByTagName(n || "*") : typeof e.querySelectorAll !== Y ? e.querySelectorAll(n || "*") : t;
        if (!a) for (a = [], r = e.childNodes || e; null != (i = r[o]); o++)!n || ct.nodeName(i, n) ? a.push(i) : ct.merge(a, x(i, n));
        return n === t || n && ct.nodeName(e, n) ? ct.merge([e], a) : a
    }
    function T(e) {
        tn.test(e.type) && (e.defaultChecked = e.checked)
    }
    function w(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = kn.length; i--;) if (t = kn[i] + n, t in e) return t;
        return r
    }
    function C(e, t) {
        return e = t || e, "none" === ct.css(e, "display") || !ct.contains(e.ownerDocument, e)
    }
    function N(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; s > a; a++) r = e[a], r.style && (o[a] = ct._data(r, "olddisplay"), n = r.style.display, t ? (o[a] || "none" !== n || (r.style.display = ""), "" === r.style.display && C(r) && (o[a] = ct._data(r, "olddisplay", A(r.nodeName)))) : o[a] || (i = C(r), (n && "none" !== n || !i) && ct._data(r, "olddisplay", i ? n : ct.css(r, "display"))));
        for (a = 0; s > a; a++) r = e[a], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }
    function k(e, t, n) {
        var r = vn.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function E(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > o; o += 2) "margin" === n && (a += ct.css(e, n + Nn[o], !0, i)), r ? ("content" === n && (a -= ct.css(e, "padding" + Nn[o], !0, i)), "margin" !== n && (a -= ct.css(e, "border" + Nn[o] + "Width", !0, i))) : (a += ct.css(e, "padding" + Nn[o], !0, i), "padding" !== n && (a += ct.css(e, "border" + Nn[o] + "Width", !0, i)));
        return a
    }
    function S(e, t, n) {
        var r = !0,
            i = "width" === t ? e.offsetWidth : e.offsetHeight,
            o = fn(e),
            a = ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = pn(e, t, o), (0 > i || null == i) && (i = e.style[t]), bn.test(i)) return i;
            r = a && (ct.support.boxSizingReliable || i === e.style[t]), i = parseFloat(i) || 0
        }
        return i + E(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }
    function A(e) {
        var t = G,
            n = Tn[e];
        return n || (n = j(e, t), "none" !== n && n || (cn = (cn || ct("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = j(e, t), cn.detach()), Tn[e] = n), n
    }
    function j(e, t) {
        var n = ct(t.createElement(e)).appendTo(t.body),
            r = ct.css(n[0], "display");
        return n.remove(), r
    }
    function D(e, t, n, r) {
        var i;
        if (ct.isArray(t)) ct.each(t, function(t, i) {
            n || Sn.test(e) ? r(e, i) : D(e + "[" + ("object" == typeof i ? t : "") + "]", i, n, r)
        });
        else if (n || "object" !== ct.type(t)) r(e, t);
        else for (i in t) D(e + "[" + i + "]", t[i], n, r)
    }
    function L(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r, i = 0,
                o = t.toLowerCase().match(pt) || [];
            if (ct.isFunction(n)) for (; r = o[i++];) "+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function H(e, n, r, i) {
        function o(u) {
            var l;
            return a[u] = !0, ct.each(e[u] || [], function(e, u) {
                var c = u(n, r, i);
                return "string" != typeof c || s || a[c] ? s ? !(l = c) : t : (n.dataTypes.unshift(c), o(c), !1)
            }), l
        }
        var a = {}, s = e === zn;
        return o(n.dataTypes[0]) || !a["*"] && o("*")
    }
    function q(e, n) {
        var r, i, o = ct.ajaxSettings.flatOptions || {};
        for (i in n) n[i] !== t && ((o[i] ? e : r || (r = {}))[i] = n[i]);
        return r && ct.extend(!0, e, r), e
    }
    function _(e, n, r) {
        for (var i, o, a, s, u = e.contents, l = e.dataTypes;
        "*" === l[0];) l.shift(), o === t && (o = e.mimeType || n.getResponseHeader("Content-Type"));
        if (o) for (s in u) if (u[s] && u[s].test(o)) {
            l.unshift(s);
            break
        }
        if (l[0] in r) a = l[0];
        else {
            for (s in r) {
                if (!l[0] || e.converters[s + " " + l[0]]) {
                    a = s;
                    break
                }
                i || (i = s)
            }
            a = a || i
        }
        return a ? (a !== l[0] && l.unshift(a), r[a]) : t
    }
    function M(e, t, n, r) {
        var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
        if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;) if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) if ("*" === o) o = u;
        else if ("*" !== u && u !== o) {
            if (a = l[u + " " + o] || l["* " + o], !a) for (i in l) if (s = i.split(" "), s[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                a === !0 ? a = l[i] : l[i] !== !0 && (o = s[0], c.unshift(s[1]));
                break
            }
            if (a !== !0) if (a && e["throws"]) t = a(t);
            else try {
                t = a(t)
            } catch (f) {
                return {
                    state: "parsererror",
                    error: a ? f : "No conversion from " + u + " to " + o
                }
            }
        }
        return {
            state: "success",
            data: t
        }
    }
    function O() {
        try {
            return new e.XMLHttpRequest
        } catch (t) {}
    }
    function F() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
    }
    function B() {
        return setTimeout(function() {
            Zn = t
        }), Zn = ct.now()
    }
    function P(e, t, n) {
        for (var r, i = (or[t] || []).concat(or["*"]), o = 0, a = i.length; a > o; o++) if (r = i[o].call(n, t, e)) return r
    }
    function R(e, t, n) {
        var r, i, o = 0,
            a = ir.length,
            s = ct.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (i) return !1;
                for (var t = Zn || B(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, o = 1 - r, a = 0, u = l.tweens.length; u > a; a++) l.tweens[a].run(o);
                return s.notifyWith(e, [l, o, n]), 1 > o && u ? n : (s.resolveWith(e, [l]), !1)
            }, l = s.promise({
                elem: e,
                props: ct.extend({}, t),
                opts: ct.extend(!0, {
                    specialEasing: {}
                }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Zn || B(),
                duration: n.duration,
                tweens: [],
                createTween: function(t, n) {
                    var r = ct.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                    return l.tweens.push(r), r
                },
                stop: function(t) {
                    var n = 0,
                        r = t ? l.tweens.length : 0;
                    if (i) return this;
                    for (i = !0; r > n; n++) l.tweens[n].run(1);
                    return t ? s.resolveWith(e, [l, t]) : s.rejectWith(e, [l, t]), this
                }
            }),
            c = l.props;
        for (W(c, l.opts.specialEasing); a > o; o++) if (r = ir[o].call(l, e, c, l.opts)) return r;
        return ct.map(c, P, l), ct.isFunction(l.opts.start) && l.opts.start.call(e, l), ct.fx.timer(ct.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }
    function W(e, t) {
        var n, r, i, o, a;
        for (n in e) if (r = ct.camelCase(n), i = t[r], o = e[n], ct.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = ct.cssHooks[r], a && "expand" in a) {
            o = a.expand(o), delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }
    function $(e, t, n) {
        var r, i, o, a, s, u, l = this,
            c = {}, f = e.style,
            p = e.nodeType && C(e),
            d = ct._data(e, "fxshow");
        n.queue || (s = ct._queueHooks(e, "fx"), null == s.unqueued && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function() {
            s.unqueued || u()
        }), s.unqueued++, l.always(function() {
            l.always(function() {
                s.unqueued--, ct.queue(e, "fx").length || s.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [f.overflow, f.overflowX, f.overflowY], "inline" === ct.css(e, "display") && "none" === ct.css(e, "float") && (ct.support.inlineBlockNeedsLayout && "inline" !== A(e.nodeName) ? f.zoom = 1 : f.display = "inline-block")), n.overflow && (f.overflow = "hidden", ct.support.shrinkWrapBlocks || l.always(function() {
            f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2]
        }));
        for (r in t) if (i = t[r], tr.exec(i)) {
            if (delete t[r], o = o || "toggle" === i, i === (p ? "hide" : "show")) continue;
            c[r] = d && d[r] || ct.style(e, r)
        }
        if (!ct.isEmptyObject(c)) {
            d ? "hidden" in d && (p = d.hidden) : d = ct._data(e, "fxshow", {}), o && (d.hidden = !p), p ? ct(e).show() : l.done(function() {
                ct(e).hide()
            }), l.done(function() {
                var t;
                ct._removeData(e, "fxshow");
                for (t in c) ct.style(e, t, c[t])
            });
            for (r in c) a = P(p ? d[r] : 0, r, l), r in d || (d[r] = a.start, p && (a.end = a.start, a.start = "width" === r || "height" === r ? 1 : 0))
        }
    }
    function I(e, t, n, r, i) {
        return new I.prototype.init(e, t, n, r, i)
    }
    function z(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) n = Nn[i], r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e), r
    }
    function X(e) {
        return ct.isWindow(e) ? e : 9 === e.nodeType ? e.defaultView || e.parentWindow : !1
    }
    var U, V, Y = typeof t,
        J = e.location,
        G = e.document,
        Q = G.documentElement,
        K = e.jQuery,
        Z = e.$,
        et = {}, tt = [],
        nt = "1.10.1",
        rt = tt.concat,
        it = tt.push,
        ot = tt.slice,
        at = tt.indexOf,
        st = et.toString,
        ut = et.hasOwnProperty,
        lt = nt.trim,
        ct = function(e, t) {
            return new ct.fn.init(e, t, V)
        }, ft = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        pt = /\S+/g,
        dt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ht = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        gt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        mt = /^[\],:{}\s]*$/,
        yt = /(?:^|:|,)(?:\s*\[)+/g,
        vt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        xt = /^-ms-/,
        Tt = /-([\da-z])/gi,
        wt = function(e, t) {
            return t.toUpperCase()
        }, Ct = function(e) {
            (G.addEventListener || "load" === e.type || "complete" === G.readyState) && (Nt(), ct.ready())
        }, Nt = function() {
            G.addEventListener ? (G.removeEventListener("DOMContentLoaded", Ct, !1), e.removeEventListener("load", Ct, !1)) : (G.detachEvent("onreadystatechange", Ct), e.detachEvent("onload", Ct))
        };
    ct.fn = ct.prototype = {
        jquery: nt,
        constructor: ct,
        init: function(e, n, r) {
            var i, o;
            if (!e) return this;
            if ("string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ht.exec(e), !i || !i[1] && n) return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof ct ? n[0] : n, ct.merge(this, ct.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n : G, !0)), gt.test(i[1]) && ct.isPlainObject(n)) for (i in n) ct.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                if (o = G.getElementById(i[2]), o && o.parentNode) {
                    if (o.id !== i[2]) return r.find(e);
                    this.length = 1, this[0] = o
                }
                return this.context = G, this.selector = e, this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : ct.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), ct.makeArray(e, this))
        },
        selector: "",
        length: 0,
        toArray: function() {
            return ot.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = ct.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        },
        each: function(e, t) {
            return ct.each(this, e, t)
        },
        ready: function(e) {
            return ct.ready.promise().done(e), this
        },
        slice: function() {
            return this.pushStack(ot.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(ct.map(this, function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: it,
        sort: [].sort,
        splice: [].splice
    }, ct.fn.init.prototype = ct.fn, ct.extend = ct.fn.extend = function() {
        var e, n, r, i, o, a, s = arguments[0] || {}, u = 1,
            l = arguments.length,
            c = !1;
        for ("boolean" == typeof s && (c = s, s = arguments[1] || {}, u = 2), "object" == typeof s || ct.isFunction(s) || (s = {}), l === u && (s = this, --u); l > u; u++) if (null != (o = arguments[u])) for (i in o) e = s[i], r = o[i], s !== r && (c && r && (ct.isPlainObject(r) || (n = ct.isArray(r))) ? (n ? (n = !1, a = e && ct.isArray(e) ? e : []) : a = e && ct.isPlainObject(e) ? e : {}, s[i] = ct.extend(c, a, r)) : r !== t && (s[i] = r));
        return s
    }, ct.extend({
        expando: "jQuery" + (nt + Math.random()).replace(/\D/g, ""),
        noConflict: function(t) {
            return e.$ === ct && (e.$ = Z), t && e.jQuery === ct && (e.jQuery = K), ct
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? ct.readyWait++ : ct.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--ct.readyWait : !ct.isReady) {
                if (!G.body) return setTimeout(ct.ready);
                ct.isReady = !0, e !== !0 && --ct.readyWait > 0 || (U.resolveWith(G, [ct]), ct.fn.trigger && ct(G).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === ct.type(e)
        },
        isArray: Array.isArray || function(e) {
            return "array" === ct.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? et[st.call(e)] || "object" : typeof e
        },
        isPlainObject: function(e) {
            var n;
            if (!e || "object" !== ct.type(e) || e.nodeType || ct.isWindow(e)) return !1;
            try {
                if (e.constructor && !ut.call(e, "constructor") && !ut.call(e.constructor.prototype, "isPrototypeOf")) return !1
            } catch (r) {
                return !1
            }
            if (ct.support.ownLast) for (n in e) return ut.call(e, n);
            for (n in e);
            return n === t || ut.call(e, n)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return !1;
            return !0
        },
        error: function(e) {
            throw Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1), t = t || G;
            var r = gt.exec(e),
                i = !n && [];
            return r ? [t.createElement(r[1])] : (r = ct.buildFragment([e], t, i), i && ct(i).remove(), ct.merge([], r.childNodes))
        },
        parseJSON: function(n) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(n) : null === n ? n : "string" == typeof n && (n = ct.trim(n), n && mt.test(n.replace(vt, "@").replace(bt, "]").replace(yt, ""))) ? Function("return " + n)() : (ct.error("Invalid JSON: " + n), t)
        },
        parseXML: function(n) {
            var r, i;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch (o) {
                r = t
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || ct.error("Invalid XML: " + n), r
        },
        noop: function() {},
        globalEval: function(t) {
            t && ct.trim(t) && (e.execScript || function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(xt, "ms-").replace(Tt, wt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e);
            if (r) {
                if (s) for (; a > o && (i = t.apply(e[o], r), i !== !1); o++);
                else for (o in e) if (i = t.apply(e[o], r), i === !1) break
            } else if (s) for (; a > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
            else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
            return e
        },
        trim: lt && !lt.call("﻿ ") ? function(e) {
            return null == e ? "" : lt.call(e)
        } : function(e) {
            return null == e ? "" : (e + "").replace(dt, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? ct.merge(r, "string" == typeof e ? [e] : e) : it.call(r, e)), r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (at) return at.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n : 0; r > n; n++) if (n in t && t[n] === e) return n
            }
            return -1
        },
        merge: function(e, n) {
            var r = n.length,
                i = e.length,
                o = 0;
            if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
            else for (; n[o] !== t;) e[i++] = n[o++];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            var r, i = [],
                o = 0,
                a = e.length;
            for (n = !! n; a > o; o++) r = !! t(e[o], o), n !== r && i.push(e[o]);
            return i
        },
        map: function(e, t, r) {
            var i, o = 0,
                a = e.length,
                s = n(e),
                u = [];
            if (s) for (; a > o; o++) i = t(e[o], o, r), null != i && (u[u.length] = i);
            else for (o in e) i = t(e[o], o, r), null != i && (u[u.length] = i);
            return rt.apply([], u)
        },
        guid: 1,
        proxy: function(e, n) {
            var r, i, o;
            return "string" == typeof n && (o = e[n], n = e, e = o), ct.isFunction(e) ? (r = ot.call(arguments, 2), i = function() {
                return e.apply(n || this, r.concat(ot.call(arguments)))
            }, i.guid = e.guid = e.guid || ct.guid++, i) : t
        },
        access: function(e, n, r, i, o, a, s) {
            var u = 0,
                l = e.length,
                c = null == r;
            if ("object" === ct.type(r)) {
                o = !0;
                for (u in r) ct.access(e, n, u, r[u], !0, a, s)
            } else if (i !== t && (o = !0, ct.isFunction(i) || (s = !0), c && (s ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
                return c.call(ct(e), n)
            })), n)) for (; l > u; u++) n(e[u], r, s ? i : i.call(e[u], u, n(e[u], r)));
            return o ? e : c ? n.call(e) : l ? n(e[0], r) : a
        },
        now: function() {
            return (new Date).getTime()
        },
        swap: function(e, t, n, r) {
            var i, o, a = {};
            for (o in t) a[o] = e.style[o], e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = a[o];
            return i
        }
    }), ct.ready.promise = function(t) {
        if (!U) if (U = ct.Deferred(), "complete" === G.readyState) setTimeout(ct.ready);
        else if (G.addEventListener) G.addEventListener("DOMContentLoaded", Ct, !1), e.addEventListener("load", Ct, !1);
        else {
            G.attachEvent("onreadystatechange", Ct), e.attachEvent("onload", Ct);
            var n = !1;
            try {
                n = null == e.frameElement && G.documentElement
            } catch (r) {}
            n && n.doScroll && function i() {
                if (!ct.isReady) {
                    try {
                        n.doScroll("left")
                    } catch (e) {
                        return setTimeout(i, 50)
                    }
                    Nt(), ct.ready()
                }
            }()
        }
        return U.promise(t)
    }, ct.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        et["[object " + t + "]"] = t.toLowerCase()
    }), V = ct(G),
    function(e, t) {
        function n(e, t, n, r) {
            var i, o, a, s, u, l, c, f, p, d;
            if ((t ? t.ownerDocument || t : z) !== O && M(t), t = t || O, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (s = t.nodeType) && 9 !== s) return [];
            if (B && !r) {
                if (i = Ct.exec(e)) if (a = i[1]) {
                    if (9 === s) {
                        if (o = t.getElementById(a), !o || !o.parentNode) return n;
                        if (o.id === a) return n.push(o), n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(a)) && $(t, o) && o.id === a) return n.push(o), n
                } else {
                    if (i[2]) return it.apply(n, t.getElementsByTagName(e)), n;
                    if ((a = i[3]) && S.getElementsByClassName && t.getElementsByClassName) return it.apply(n, t.getElementsByClassName(a)), n
                }
                if (S.qsa && (!P || !P.test(e))) {
                    if (f = c = I, p = t, d = 9 === s && e, 1 === s && "object" !== t.nodeName.toLowerCase()) {
                        for (l = g(e), (c = t.getAttribute("id")) ? f = c.replace(Et, "\\$&") : t.setAttribute("id", f), f = "[id='" + f + "'] ", u = l.length; u--;) l[u] = f + m(l[u]);
                        p = yt.test(e) && t.parentNode || t, d = l.join(",")
                    }
                    if (d) try {
                        return it.apply(n, p.querySelectorAll(d)), n
                    } catch (h) {} finally {
                        c || t.removeAttribute("id")
                    }
                }
            }
            return N(e.replace(ht, "$1"), t, n, r)
        }
        function r(e) {
            return wt.test(e + "")
        }
        function i() {
            function e(n, r) {
                return t.push(n += " ") > j.cacheLength && delete e[t.shift()], e[n] = r
            }
            var t = [];
            return e
        }
        function o(e) {
            return e[I] = !0, e
        }
        function a(e) {
            var t = O.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }
        function s(e, t, n) {
            e = e.split("|");
            for (var r, i = e.length, o = n ? null : t; i--;)(r = j.attrHandle[e[i]]) && r !== t || (j.attrHandle[e[i]] = o)
        }
        function u(e, t) {
            var n = e.getAttributeNode(t);
            return n && n.specified ? n.value : e[t] === !0 ? t.toLowerCase() : null
        }
        function l(e, t) {
            return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }
        function c(e) {
            return "input" === e.nodeName.toLowerCase() ? e.defaultValue : t
        }
        function f(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || Z) - (~e.sourceIndex || Z);
            if (r) return r;
            if (n) for (; n = n.nextSibling;) if (n === t) return -1;
            return e ? 1 : -1
        }
        function p(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function d(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function h(e) {
            return o(function(t) {
                return t = +t, o(function(n, r) {
                    for (var i, o = e([], n.length, t), a = o.length; a--;) n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function g(e, t) {
            var r, i, o, a, s, u, l, c = Y[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (s = e, u = [], l = j.preFilter; s;) {
                (!r || (i = gt.exec(s))) && (i && (s = s.slice(i[0].length) || s), u.push(o = [])), r = !1, (i = mt.exec(s)) && (r = i.shift(), o.push({
                    value: r,
                    type: i[0].replace(ht, " ")
                }), s = s.slice(r.length));
                for (a in j.filter)!(i = Tt[a].exec(s)) || l[a] && !(i = l[a](i)) || (r = i.shift(), o.push({
                    value: r,
                    type: a,
                    matches: i
                }), s = s.slice(r.length));
                if (!r) break
            }
            return t ? s.length : s ? n.error(e) : Y(e, u).slice(0)
        }
        function m(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }
        function y(e, t, n) {
            var r = t.dir,
                i = n && "parentNode" === r,
                o = U++;
            return t.first ? function(t, n, o) {
                for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
            } : function(t, n, a) {
                var s, u, l, c = X + " " + o;
                if (a) {
                    for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, a)) return !0
                } else for (; t = t[r];) if (1 === t.nodeType || i) if (l = t[I] || (t[I] = {}), (u = l[r]) && u[0] === c) {
                    if ((s = u[1]) === !0 || s === A) return s === !0
                } else if (u = l[r] = [c], u[1] = e(t, n, a) || A, u[1] === !0) return !0
            }
        }
        function v(e) {
            return e.length > 1 ? function(t, n, r) {
                for (var i = e.length; i--;) if (!e[i](t, n, r)) return !1;
                return !0
            } : e[0]
        }
        function b(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; u > s; s++)(o = e[s]) && (!n || n(o, r, i)) && (a.push(o), l && t.push(s));
            return a
        }
        function x(e, t, n, r, i, a) {
            return r && !r[I] && (r = x(r)), i && !i[I] && (i = x(i, a)), o(function(o, a, s, u) {
                var l, c, f, p = [],
                    d = [],
                    h = a.length,
                    g = o || C(t || "*", s.nodeType ? [s] : s, []),
                    m = !e || !o && t ? g : b(g, p, e, s, u),
                    y = n ? i || (o ? e : h || r) ? [] : a : m;
                if (n && n(m, y, s, u), r) for (l = b(y, d), r(l, [], s, u), c = l.length; c--;)(f = l[c]) && (y[d[c]] = !(m[d[c]] = f));
                if (o) {
                    if (i || e) {
                        if (i) {
                            for (l = [], c = y.length; c--;)(f = y[c]) && l.push(m[c] = f);
                            i(null, y = [], l, u)
                        }
                        for (c = y.length; c--;)(f = y[c]) && (l = i ? at.call(o, f) : p[c]) > -1 && (o[l] = !(a[l] = f))
                    }
                } else y = b(y === a ? y.splice(h, y.length) : y), i ? i(null, a, y, u) : it.apply(a, y)
            })
        }
        function T(e) {
            for (var t, n, r, i = e.length, o = j.relative[e[0].type], a = o || j.relative[" "], s = o ? 1 : 0, u = y(function(e) {
                return e === t
            }, a, !0), l = y(function(e) {
                return at.call(t, e) > -1
            }, a, !0), c = [function(e, n, r) {
                return !o && (r || n !== q) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r))
            }]; i > s; s++) if (n = j.relative[e[s].type]) c = [y(v(c), n)];
            else {
                if (n = j.filter[e[s].type].apply(null, e[s].matches), n[I]) {
                    for (r = ++s; i > r && !j.relative[e[r].type]; r++);
                    return x(s > 1 && v(c), s > 1 && m(e.slice(0, s - 1).concat({
                        value: " " === e[s - 2].type ? "*" : ""
                    })).replace(ht, "$1"), n, r > s && T(e.slice(s, r)), i > r && T(e = e.slice(r)), i > r && m(e))
                }
                c.push(n)
            }
            return v(c)
        }
        function w(e, t) {
            var r = 0,
                i = t.length > 0,
                a = e.length > 0,
                s = function(o, s, u, l, c) {
                    var f, p, d, h = [],
                        g = 0,
                        m = "0",
                        y = o && [],
                        v = null != c,
                        x = q,
                        T = o || a && j.find.TAG("*", c && s.parentNode || s),
                        w = X += null == x ? 1 : Math.random() || .1;
                    for (v && (q = s !== O && s, A = r); null != (f = T[m]); m++) {
                        if (a && f) {
                            for (p = 0; d = e[p++];) if (d(f, s, u)) {
                                l.push(f);
                                break
                            }
                            v && (X = w, A = ++r)
                        }
                        i && ((f = !d && f) && g--, o && y.push(f))
                    }
                    if (g += m, i && m !== g) {
                        for (p = 0; d = t[p++];) d(y, h, s, u);
                        if (o) {
                            if (g > 0) for (; m--;) y[m] || h[m] || (h[m] = nt.call(l));
                            h = b(h)
                        }
                        it.apply(l, h), v && !o && h.length > 0 && g + t.length > 1 && n.uniqueSort(l)
                    }
                    return v && (X = w, q = x), y
                };
            return i ? o(s) : s
        }
        function C(e, t, r) {
            for (var i = 0, o = t.length; o > i; i++) n(e, t[i], r);
            return r
        }
        function N(e, t, n, r) {
            var i, o, a, s, u, l = g(e);
            if (!r && 1 === l.length) {
                if (o = l[0] = l[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && S.getById && 9 === t.nodeType && B && j.relative[o[1].type]) {
                    if (t = (j.find.ID(a.matches[0].replace(St, At), t) || [])[0], !t) return n;
                    e = e.slice(o.shift().value.length)
                }
                for (i = Tt.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !j.relative[s = a.type]);) if ((u = j.find[s]) && (r = u(a.matches[0].replace(St, At), yt.test(o[0].type) && t.parentNode || t))) {
                    if (o.splice(i, 1), e = r.length && m(o), !e) return it.apply(n, r), n;
                    break
                }
            }
            return H(e, l)(r, t, !B, n, yt.test(e)), n
        }
        function k() {}
        var E, S, A, j, D, L, H, q, _, M, O, F, B, P, R, W, $, I = "sizzle" + -new Date,
            z = e.document,
            X = 0,
            U = 0,
            V = i(),
            Y = i(),
            J = i(),
            G = !1,
            Q = function() {
                return 0
            }, K = typeof t,
            Z = 1 << 31,
            et = {}.hasOwnProperty,
            tt = [],
            nt = tt.pop,
            rt = tt.push,
            it = tt.push,
            ot = tt.slice,
            at = tt.indexOf || function(e) {
                for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
                return -1
            }, st = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ut = "[\\x20\\t\\r\\n\\f]",
            lt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ft = lt.replace("w", "w#"),
            pt = "\\[" + ut + "*(" + lt + ")" + ut + "*(?:([*^$|!~]?=)" + ut + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + ft + ")|)|)" + ut + "*\\]",
            dt = ":(" + lt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + pt.replace(3, 8) + ")*)|.*)\\)|)",
            ht = RegExp("^" + ut + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ut + "+$", "g"),
            gt = RegExp("^" + ut + "*," + ut + "*"),
            mt = RegExp("^" + ut + "*([>+~]|" + ut + ")" + ut + "*"),
            yt = RegExp(ut + "*[+~]"),
            vt = RegExp("=" + ut + "*([^\\]'\"]*)" + ut + "*\\]", "g"),
            bt = RegExp(dt),
            xt = RegExp("^" + ft + "$"),
            Tt = {
                ID: RegExp("^#(" + lt + ")"),
                CLASS: RegExp("^\\.(" + lt + ")"),
                TAG: RegExp("^(" + lt.replace("w", "w*") + ")"),
                ATTR: RegExp("^" + pt),
                PSEUDO: RegExp("^" + dt),
                CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ut + "*(even|odd|(([+-]|)(\\d*)n|)" + ut + "*(?:([+-]|)" + ut + "*(\\d+)|))" + ut + "*\\)|)", "i"),
                bool: RegExp("^(?:" + st + ")$", "i"),
                needsContext: RegExp("^" + ut + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ut + "*((?:-\\d)?\\d*)" + ut + "*\\)|)(?=[^-]|$)", "i")
            }, wt = /^[^{]+\{\s*\[native \w/,
            Ct = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            Nt = /^(?:input|select|textarea|button)$/i,
            kt = /^h\d$/i,
            Et = /'|\\/g,
            St = RegExp("\\\\([\\da-f]{1,6}" + ut + "?|(" + ut + ")|.)", "ig"),
            At = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(55296 | r >> 10, 56320 | 1023 & r)
            };
        try {
            it.apply(tt = ot.call(z.childNodes), z.childNodes), tt[z.childNodes.length].nodeType
        } catch (jt) {
            it = {
                apply: tt.length ? function(e, t) {
                    rt.apply(e, ot.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }
        L = n.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, S = n.support = {}, M = n.setDocument = function(e) {
            var n = e ? e.ownerDocument || e : z,
                i = n.defaultView;
            return n !== O && 9 === n.nodeType && n.documentElement ? (O = n, F = n.documentElement, B = !L(n), i && i.attachEvent && i !== i.top && i.attachEvent("onbeforeunload", function() {
                M()
            }), S.attributes = a(function(e) {
                return e.innerHTML = "<a href='#'></a>", s("type|href|height|width", l, "#" === e.firstChild.getAttribute("href")), s(st, u, null == e.getAttribute("disabled")), e.className = "i", !e.getAttribute("className")
            }), S.input = a(function(e) {
                return e.innerHTML = "<input>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
            }), s("value", c, S.attributes && S.input), S.getElementsByTagName = a(function(e) {
                return e.appendChild(n.createComment("")), !e.getElementsByTagName("*").length
            }), S.getElementsByClassName = a(function(e) {
                return e.innerHTML = "<div class='a'></div><div class='a i'></div>", e.firstChild.className = "i", 2 === e.getElementsByClassName("i").length
            }), S.getById = a(function(e) {
                return F.appendChild(e).id = I, !n.getElementsByName || !n.getElementsByName(I).length
            }), S.getById ? (j.find.ID = function(e, t) {
                if (typeof t.getElementById !== K && B) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, j.filter.ID = function(e) {
                var t = e.replace(St, At);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete j.find.ID, j.filter.ID = function(e) {
                var t = e.replace(St, At);
                return function(e) {
                    var n = typeof e.getAttributeNode !== K && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), j.find.TAG = S.getElementsByTagName ? function(e, n) {
                return typeof n.getElementsByTagName !== K ? n.getElementsByTagName(e) : t
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, j.find.CLASS = S.getElementsByClassName && function(e, n) {
                return typeof n.getElementsByClassName !== K && B ? n.getElementsByClassName(e) : t
            }, R = [], P = [], (S.qsa = r(n.querySelectorAll)) && (a(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || P.push("\\[" + ut + "*(?:value|" + st + ")"), e.querySelectorAll(":checked").length || P.push(":checked")
            }), a(function(e) {
                var t = n.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("t", ""), e.querySelectorAll("[t^='']").length && P.push("[*^$]=" + ut + "*(?:''|\"\")"), e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), P.push(",.*:")
            })), (S.matchesSelector = r(W = F.webkitMatchesSelector || F.mozMatchesSelector || F.oMatchesSelector || F.msMatchesSelector)) && a(function(e) {
                S.disconnectedMatch = W.call(e, "div"), W.call(e, "[s!='']:x"), R.push("!=", dt)
            }), P = P.length && RegExp(P.join("|")), R = R.length && RegExp(R.join("|")), $ = r(F.contains) || F.compareDocumentPosition ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return !0;
                return !1
            }, S.sortDetached = a(function(e) {
                return 1 & e.compareDocumentPosition(n.createElement("div"))
            }), Q = F.compareDocumentPosition ? function(e, t) {
                if (e === t) return G = !0, 0;
                var r = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t);
                return r ? 1 & r || !S.sortDetached && t.compareDocumentPosition(e) === r ? e === n || $(z, e) ? -1 : t === n || $(z, t) ? 1 : _ ? at.call(_, e) - at.call(_, t) : 0 : 4 & r ? -1 : 1 : e.compareDocumentPosition ? -1 : 1
            } : function(e, t) {
                var r, i = 0,
                    o = e.parentNode,
                    a = t.parentNode,
                    s = [e],
                    u = [t];
                if (e === t) return G = !0, 0;
                if (!o || !a) return e === n ? -1 : t === n ? 1 : o ? -1 : a ? 1 : _ ? at.call(_, e) - at.call(_, t) : 0;
                if (o === a) return f(e, t);
                for (r = e; r = r.parentNode;) s.unshift(r);
                for (r = t; r = r.parentNode;) u.unshift(r);
                for (; s[i] === u[i];) i++;
                return i ? f(s[i], u[i]) : s[i] === z ? -1 : u[i] === z ? 1 : 0
            }, n) : O
        }, n.matches = function(e, t) {
            return n(e, null, null, t)
        }, n.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== O && M(e), t = t.replace(vt, "='$1']"), !(!S.matchesSelector || !B || R && R.test(t) || P && P.test(t))) try {
                var r = W.call(e, t);
                if (r || S.disconnectedMatch || e.document && 11 !== e.document.nodeType) return r
            } catch (i) {}
            return n(t, O, null, [e]).length > 0
        }, n.contains = function(e, t) {
            return (e.ownerDocument || e) !== O && M(e), $(e, t)
        }, n.attr = function(e, n) {
            (e.ownerDocument || e) !== O && M(e);
            var r = j.attrHandle[n.toLowerCase()],
                i = r && et.call(j.attrHandle, n.toLowerCase()) ? r(e, n, !B) : t;
            return i === t ? S.attributes || !B ? e.getAttribute(n) : (i = e.getAttributeNode(n)) && i.specified ? i.value : null : i
        }, n.error = function(e) {
            throw Error("Syntax error, unrecognized expression: " + e)
        }, n.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (G = !S.detectDuplicates, _ = !S.sortStable && e.slice(0), e.sort(Q), G) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return e
        }, D = n.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += D(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[r]; r++) n += D(t);
            return n
        }, j = n.selectors = {
            cacheLength: 50,
            createPseudo: o,
            match: Tt,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(St, At), e[3] = (e[4] || e[5] || "").replace(St, At), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || n.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && n.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var n, r = !e[5] && e[2];
                    return Tt.CHILD.test(e[0]) ? null : (e[3] && e[4] !== t ? e[2] = e[4] : r && bt.test(r) && (n = g(r, !0)) && (n = r.indexOf(")", r.length - n) - r.length) && (e[0] = e[0].slice(0, n), e[2] = r.slice(0, n)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(St, At).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = V[e + " "];
                    return t || (t = RegExp("(^|" + ut + ")" + e + "(" + ut + "|$)")) && V(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || typeof e.getAttribute !== K && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, r) {
                    return function(i) {
                        var o = n.attr(i, e);
                        return null == o ? "!=" === t : t ? (o += "", "=" === t ? o === r : "!=" === t ? o !== r : "^=" === t ? r && 0 === o.indexOf(r) : "*=" === t ? r && o.indexOf(r) > -1 : "$=" === t ? r && o.slice(-r.length) === r : "~=" === t ? (" " + o + " ").indexOf(r) > -1 : "|=" === t ? o === r || o.slice(0, r.length + 1) === r + "-" : !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                        a = "last" !== e.slice(-4),
                        s = "of-type" === t;
                    return 1 === r && 0 === i ? function(e) {
                        return !!e.parentNode
                    } : function(t, n, u) {
                        var l, c, f, p, d, h, g = o !== a ? "nextSibling" : "previousSibling",
                            m = t.parentNode,
                            y = s && t.nodeName.toLowerCase(),
                            v = !u && !s;
                        if (m) {
                            if (o) {
                                for (; g;) {
                                    for (f = t; f = f[g];) if (s ? f.nodeName.toLowerCase() === y : 1 === f.nodeType) return !1;
                                    h = g = "only" === e && !h && "nextSibling"
                                }
                                return !0
                            }
                            if (h = [a ? m.firstChild : m.lastChild], a && v) {
                                for (c = m[I] || (m[I] = {}), l = c[e] || [], d = l[0] === X && l[1], p = l[0] === X && l[2], f = d && m.childNodes[d]; f = ++d && f && f[g] || (p = d = 0) || h.pop();) if (1 === f.nodeType && ++p && f === t) {
                                    c[e] = [X, d, p];
                                    break
                                }
                            } else if (v && (l = (t[I] || (t[I] = {}))[e]) && l[0] === X) p = l[1];
                            else for (;
                            (f = ++d && f && f[g] || (p = d = 0) || h.pop()) && ((s ? f.nodeName.toLowerCase() !== y : 1 !== f.nodeType) || !++p || (v && ((f[I] || (f[I] = {}))[e] = [X, p]), f !== t)););
                            return p -= i, p === r || 0 === p % r && p / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var r, i = j.pseudos[e] || j.setFilters[e.toLowerCase()] || n.error("unsupported pseudo: " + e);
                    return i[I] ? i(t) : i.length > 1 ? (r = [e, e, "", t], j.setFilters.hasOwnProperty(e.toLowerCase()) ? o(function(e, n) {
                        for (var r, o = i(e, t), a = o.length; a--;) r = at.call(e, o[a]), e[r] = !(n[r] = o[a])
                    }) : function(e) {
                        return i(e, 0, r)
                    }) : i
                }
            },
            pseudos: {
                not: o(function(e) {
                    var t = [],
                        n = [],
                        r = H(e.replace(ht, "$1"));
                    return r[I] ? o(function(e, t, n, i) {
                        for (var o, a = r(e, null, i, []), s = e.length; s--;)(o = a[s]) && (e[s] = !(t[s] = o))
                    }) : function(e, i, o) {
                        return t[0] = e, r(t, null, o, n), !n.pop()
                    }
                }),
                has: o(function(e) {
                    return function(t) {
                        return n(e, t).length > 0
                    }
                }),
                contains: o(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || D(t)).indexOf(e) > -1
                    }
                }),
                lang: o(function(e) {
                    return xt.test(e || "") || n.error("unsupported lang: " + e), e = e.replace(St, At).toLowerCase(),
                    function(t) {
                        var n;
                        do if (n = B ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === F
                },
                focus: function(e) {
                    return e === O.activeElement && (!O.hasFocus || O.hasFocus()) && !! (e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !! e.checked || "option" === t && !! e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return !1;
                    return !0
                },
                parent: function(e) {
                    return !j.pseudos.empty(e)
                },
                header: function(e) {
                    return kt.test(e.nodeName)
                },
                input: function(e) {
                    return Nt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                },
                first: h(function() {
                    return [0]
                }),
                last: h(function(e, t) {
                    return [t - 1]
                }),
                eq: h(function(e, t, n) {
                    return [0 > n ? n + t : n]
                }),
                even: h(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: h(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: h(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: h(function(e, t, n) {
                    for (var r = 0 > n ? n + t : n; t > ++r;) e.push(r);
                    return e
                })
            }
        };
        for (E in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) j.pseudos[E] = p(E);
        for (E in {
            submit: !0,
            reset: !0
        }) j.pseudos[E] = d(E);
        H = n.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = J[e + " "];
            if (!o) {
                for (t || (t = g(e)), n = t.length; n--;) o = T(t[n]), o[I] ? r.push(o) : i.push(o);
                o = J(e, w(i, r))
            }
            return o
        }, j.pseudos.nth = j.pseudos.eq, k.prototype = j.filters = j.pseudos, j.setFilters = new k, S.sortStable = I.split("").sort(Q).join("") === I, M(), [0, 0].sort(Q), S.detectDuplicates = G, ct.find = n, ct.expr = n.selectors, ct.expr[":"] = ct.expr.pseudos, ct.unique = n.uniqueSort, ct.text = n.getText, ct.isXMLDoc = n.isXML, ct.contains = n.contains
    }(e);
    var kt = {};
    ct.Callbacks = function(e) {
        e = "string" == typeof e ? kt[e] || r(e) : ct.extend({}, e);
        var n, i, o, a, s, u, l = [],
            c = !e.once && [],
            f = function(t) {
                for (i = e.memory && t, o = !0, s = u || 0, u = 0, a = l.length, n = !0; l && a > s; s++) if (l[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                    i = !1;
                    break
                }
                n = !1, l && (c ? c.length && f(c.shift()) : i ? l = [] : p.disable())
            }, p = {
                add: function() {
                    if (l) {
                        var t = l.length;
                        (function r(t) {
                            ct.each(t, function(t, n) {
                                var i = ct.type(n);
                                "function" === i ? e.unique && p.has(n) || l.push(n) : n && n.length && "string" !== i && r(n)
                            })
                        })(arguments), n ? a = l.length : i && (u = t, f(i))
                    }
                    return this
                },
                remove: function() {
                    return l && ct.each(arguments, function(e, t) {
                        for (var r;
                        (r = ct.inArray(t, l, r)) > -1;) l.splice(r, 1), n && (a >= r && a--, s >= r && s--)
                    }), this
                },
                has: function(e) {
                    return e ? ct.inArray(e, l) > -1 : !(!l || !l.length)
                },
                empty: function() {
                    return l = [], a = 0, this
                },
                disable: function() {
                    return l = c = i = t, this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return c = t, i || p.disable(), this
                },
                locked: function() {
                    return !c
                },
                fireWith: function(e, t) {
                    return t = t || [], t = [e, t.slice ? t.slice() : t], !l || o && !c || (n ? c.push(t) : f(t)), this
                },
                fire: function() {
                    return p.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!o
                }
            };
        return p
    }, ct.extend({
        Deferred: function(e) {
            var t = [
                ["resolve", "done", ct.Callbacks("once memory"), "resolved"],
                ["reject", "fail", ct.Callbacks("once memory"), "rejected"],
                ["notify", "progress", ct.Callbacks("memory")]
            ],
                n = "pending",
                r = {
                    state: function() {
                        return n
                    },
                    always: function() {
                        return i.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var e = arguments;
                        return ct.Deferred(function(n) {
                            ct.each(t, function(t, o) {
                                var a = o[0],
                                    s = ct.isFunction(e[t]) && e[t];
                                i[o[1]](function() {
                                    var e = s && s.apply(this, arguments);
                                    e && ct.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[a + "With"](this === r ? n.promise() : this, s ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? ct.extend(e, r) : r
                    }
                }, i = {};
            return r.pipe = r.then, ct.each(t, function(e, o) {
                var a = o[2],
                    s = o[3];
                r[o[1]] = a.add, s && a.add(function() {
                    n = s
                }, t[1 ^ e][2].disable, t[2][2].lock), i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r : this, arguments), this
                }, i[o[0] + "With"] = a.fireWith
            }), r.promise(i), e && e.call(i, i), i
        },
        when: function(e) {
            var t, n, r, i = 0,
                o = ot.call(arguments),
                a = o.length,
                s = 1 !== a || e && ct.isFunction(e.promise) ? a : 0,
                u = 1 === s ? e : ct.Deferred(),
                l = function(e, n, r) {
                    return function(i) {
                        n[e] = this, r[e] = arguments.length > 1 ? ot.call(arguments) : i, r === t ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
                    }
                };
            if (a > 1) for (t = Array(a), n = Array(a), r = Array(a); a > i; i++) o[i] && ct.isFunction(o[i].promise) ? o[i].promise().done(l(i, r, o)).fail(u.reject).progress(l(i, n, t)) : --s;
            return s || u.resolveWith(r, o), u.promise()
        }
    }), ct.support = function(t) {
        var n, r, i, o, a, s, u, l, c, f = G.createElement("div");
        if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*") || [], r = f.getElementsByTagName("a")[0], !r || !r.style || !n.length) return t;
        o = G.createElement("select"), s = o.appendChild(G.createElement("option")), i = f.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t.getSetAttribute = "t" !== f.className, t.leadingWhitespace = 3 === f.firstChild.nodeType, t.tbody = !f.getElementsByTagName("tbody").length, t.htmlSerialize = !! f.getElementsByTagName("link").length, t.style = /top/.test(r.getAttribute("style")), t.hrefNormalized = "/a" === r.getAttribute("href"), t.opacity = /^0.5/.test(r.style.opacity), t.cssFloat = !! r.style.cssFloat, t.checkOn = !! i.value, t.optSelected = s.selected, t.enctype = !! G.createElement("form").enctype, t.html5Clone = "<:nav></:nav>" !== G.createElement("nav").cloneNode(!0).outerHTML, t.inlineBlockNeedsLayout = !1, t.shrinkWrapBlocks = !1, t.pixelPosition = !1, t.deleteExpando = !0, t.noCloneEvent = !0, t.reliableMarginRight = !0, t.boxSizingReliable = !0, i.checked = !0, t.noCloneChecked = i.cloneNode(!0).checked, o.disabled = !0, t.optDisabled = !s.disabled;
        try {
            delete f.test
        } catch (p) {
            t.deleteExpando = !1
        }
        i = G.createElement("input"), i.setAttribute("value", ""), t.input = "" === i.getAttribute("value"), i.value = "t", i.setAttribute("type", "radio"), t.radioValue = "t" === i.value, i.setAttribute("checked", "t"), i.setAttribute("name", "t"), a = G.createDocumentFragment(), a.appendChild(i), t.appendChecked = i.checked, t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, f.attachEvent && (f.attachEvent("onclick", function() {
            t.noCloneEvent = !1
        }), f.cloneNode(!0).click());
        for (c in {
            submit: !0,
            change: !0,
            focusin: !0
        }) f.setAttribute(u = "on" + c, "t"), t[c + "Bubbles"] = u in e || f.attributes[u].expando === !1;
        f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", t.clearCloneStyle = "content-box" === f.style.backgroundClip;
        for (c in ct(t)) break;
        return t.ownLast = "0" !== c, ct(function() {
            var n, r, i, o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                a = G.getElementsByTagName("body")[0];
            a && (n = G.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", a.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = l && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ct.swap(a, null != a.style.zoom ? {
                zoom: 1
            } : {}, function() {
                t.boxSizing = 4 === f.offsetWidth
            }), e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
                width: "4px"
            }).width, r = f.appendChild(G.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), typeof f.style.zoom !== Y && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, t.inlineBlockNeedsLayout && (a.style.zoom = 1)), a.removeChild(n), n = f = i = r = null)
        }), n = o = a = s = r = i = null, t
    }({});
    var Et = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        St = /([A-Z])/g;
    ct.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(e) {
            return e = e.nodeType ? ct.cache[e[ct.expando]] : e[ct.expando], !! e && !s(e)
        },
        data: function(e, t, n) {
            return i(e, t, n)
        },
        removeData: function(e, t) {
            return o(e, t)
        },
        _data: function(e, t, n) {
            return i(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return o(e, t, !0)
        },
        acceptData: function(e) {
            if (e.nodeType && 1 !== e.nodeType && 9 !== e.nodeType) return !1;
            var t = e.nodeName && ct.noData[e.nodeName.toLowerCase()];
            return !t || t !== !0 && e.getAttribute("classid") === t
        }
    }), ct.fn.extend({
        data: function(e, n) {
            var r, i, o = null,
                s = 0,
                u = this[0];
            if (e === t) {
                if (this.length && (o = ct.data(u), 1 === u.nodeType && !ct._data(u, "parsedAttrs"))) {
                    for (r = u.attributes; r.length > s; s++) i = r[s].name, 0 === i.indexOf("data-") && (i = ct.camelCase(i.slice(5)), a(u, i, o[i]));
                    ct._data(u, "parsedAttrs", !0)
                }
                return o
            }
            return "object" == typeof e ? this.each(function() {
                ct.data(this, e)
            }) : arguments.length > 1 ? this.each(function() {
                ct.data(this, e, n)
            }) : u ? a(u, e, ct.data(u, e)) : null
        },
        removeData: function(e) {
            return this.each(function() {
                ct.removeData(this, e)
            })
        }
    }), ct.extend({
        queue: function(e, n, r) {
            var i;
            return e ? (n = (n || "fx") + "queue", i = ct._data(e, n), r && (!i || ct.isArray(r) ? i = ct._data(e, n, ct.makeArray(r)) : i.push(r)), i || []) : t
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = ct.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = ct._queueHooks(e, t),
                a = function() {
                    ct.dequeue(e, t)
                };
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, a, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ct._data(e, n) || ct._data(e, n, {
                empty: ct.Callbacks("once memory").add(function() {
                    ct._removeData(e, t + "queue"), ct._removeData(e, n)
                })
            })
        }
    }), ct.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--), r > arguments.length ? ct.queue(this[0], e) : n === t ? this : this.each(function() {
                var t = ct.queue(this, e, n);
                ct._queueHooks(this, e), "fx" === e && "inprogress" !== t[0] && ct.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                ct.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = ct.fx ? ct.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r, i = 1,
                o = ct.Deferred(),
                a = this,
                s = this.length,
                u = function() {
                    --i || o.resolveWith(a, [a])
                };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; s--;) r = ct._data(a[s], e + "queueHooks"), r && r.empty && (i++, r.empty.add(u));
            return u(), o.promise(n)
        }
    });
    var At, jt, Dt = /[\t\r\n\f]/g,
        Lt = /\r/g,
        Ht = /^(?:input|select|textarea|button|object)$/i,
        qt = /^(?:a|area)$/i,
        _t = /^(?:checked|selected)$/i,
        Mt = ct.support.getSetAttribute,
        Ot = ct.support.input;
    ct.fn.extend({
        attr: function(e, t) {
            return ct.access(this, ct.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                ct.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return ct.access(this, ct.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = ct.propFix[e] || e, this.each(function() {
                try {
                    this[e] = t, delete this[e]
                } catch (n) {}
            })
        },
        addClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                u = "string" == typeof e && e;
            if (ct.isFunction(e)) return this.each(function(t) {
                ct(this).addClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(pt) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Dt, " ") : " ")) {
                for (o = 0; i = t[o++];) 0 > r.indexOf(" " + i + " ") && (r += i + " ");
                n.className = ct.trim(r)
            }
            return this
        },
        removeClass: function(e) {
            var t, n, r, i, o, a = 0,
                s = this.length,
                u = 0 === arguments.length || "string" == typeof e && e;
            if (ct.isFunction(e)) return this.each(function(t) {
                ct(this).removeClass(e.call(this, t, this.className))
            });
            if (u) for (t = (e || "").match(pt) || []; s > a; a++) if (n = this[a], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(Dt, " ") : "")) {
                for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                n.className = e ? ct.trim(r) : ""
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
                r = "boolean" == typeof t;
            return ct.isFunction(e) ? this.each(function(n) {
                ct(this).toggleClass(e.call(this, n, this.className, t), t)
            }) : this.each(function() {
                if ("string" === n) for (var i, o = 0, a = ct(this), s = t, u = e.match(pt) || []; i = u[o++];) s = r ? s : !a.hasClass(i), a[s ? "addClass" : "removeClass"](i);
                else(n === Y || "boolean" === n) && (this.className && ct._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ct._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(Dt, " ").indexOf(t) >= 0) return !0;
            return !1
        },
        val: function(e) {
            var n, r, i, o = this[0]; {
                if (arguments.length) return i = ct.isFunction(e), this.each(function(n) {
                    var o;
                    1 === this.nodeType && (o = i ? e.call(this, n, ct(this).val()) : e, null == o ? o = "" : "number" == typeof o ? o += "" : ct.isArray(o) && (o = ct.map(o, function(e) {
                        return null == e ? "" : e + ""
                    })), r = ct.valHooks[this.type] || ct.valHooks[this.nodeName.toLowerCase()], r && "set" in r && r.set(this, o, "value") !== t || (this.value = o))
                });
                if (o) return r = ct.valHooks[o.type] || ct.valHooks[o.nodeName.toLowerCase()], r && "get" in r && (n = r.get(o, "value")) !== t ? n : (n = o.value, "string" == typeof n ? n.replace(Lt, "") : null == n ? "" : n)
            }
        }
    }), ct.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = ct.find.attr(e, "value");
                    return null != t ? t : e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, a = o ? null : [], s = o ? i + 1 : r.length, u = 0 > i ? s : o ? i : 0; s > u; u++) if (n = r[u], !(!n.selected && u !== i || (ct.support.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || n.parentNode.disabled && ct.nodeName(n.parentNode, "optgroup"))) {
                        if (t = ct(n).val(), o) return t;
                        a.push(t)
                    }
                    return a
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = ct.makeArray(t), a = i.length; a--;) r = i[a], (r.selected = ct.inArray(ct(r).val(), o) >= 0) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        },
        attr: function(e, n, r) {
            var i, o, a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return typeof e.getAttribute === Y ? ct.prop(e, n, r) : (1 === a && ct.isXMLDoc(e) || (n = n.toLowerCase(), i = ct.attrHooks[n] || (ct.expr.match.bool.test(n) ? jt : At)), r === t ? i && "get" in i && null !== (o = i.get(e, n)) ? o : (o = ct.find.attr(e, n), null == o ? t : o) : null !== r ? i && "set" in i && (o = i.set(e, r, n)) !== t ? o : (e.setAttribute(n, r + ""), r) : (ct.removeAttr(e, n), t))
        },
        removeAttr: function(e, t) {
            var n, r, i = 0,
                o = t && t.match(pt);
            if (o && 1 === e.nodeType) for (; n = o[i++];) r = ct.propFix[n] || n, ct.expr.match.bool.test(n) ? Ot && Mt || !_t.test(n) ? e[r] = !1 : e[ct.camelCase("default-" + n)] = e[r] = !1 : ct.attr(e, n, ""), e.removeAttribute(Mt ? n : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!ct.support.radioValue && "radio" === t && ct.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(e, n, r) {
            var i, o, a, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) return a = 1 !== s || !ct.isXMLDoc(e), a && (n = ct.propFix[n] || n, o = ct.propHooks[n]), r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i : e[n] = r : o && "get" in o && null !== (i = o.get(e, n)) ? i : e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = ct.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : Ht.test(e.nodeName) || qt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        }
    }), jt = {
        set: function(e, t, n) {
            return t === !1 ? ct.removeAttr(e, n) : Ot && Mt || !_t.test(n) ? e.setAttribute(!Mt && ct.propFix[n] || n, n) : e[ct.camelCase("default-" + n)] = e[n] = !0, n
        }
    }, ct.each(ct.expr.match.bool.source.match(/\w+/g), function(e, n) {
        var r = ct.expr.attrHandle[n] || ct.find.attr;
        ct.expr.attrHandle[n] = Ot && Mt || !_t.test(n) ? function(e, n, i) {
            var o = ct.expr.attrHandle[n],
                a = i ? t : (ct.expr.attrHandle[n] = t) != r(e, n, i) ? n.toLowerCase() : null;
            return ct.expr.attrHandle[n] = o, a
        } : function(e, n, r) {
            return r ? t : e[ct.camelCase("default-" + n)] ? n.toLowerCase() : null
        }
    }), Ot && Mt || (ct.attrHooks.value = {
        set: function(e, n, r) {
            return ct.nodeName(e, "input") ? (e.defaultValue = n, t) : At && At.set(e, n, r)
        }
    }), Mt || (At = {
        set: function(e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)), i.value = n += "", "value" === r || n === e.getAttribute(r) ? n : t
        }
    }, ct.expr.attrHandle.id = ct.expr.attrHandle.name = ct.expr.attrHandle.coords = function(e, n, r) {
        var i;
        return r ? t : (i = e.getAttributeNode(n)) && "" !== i.value ? i.value : null
    }, ct.valHooks.button = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return r && r.specified ? r.value : t
        },
        set: At.set
    }, ct.attrHooks.contenteditable = {
        set: function(e, t, n) {
            At.set(e, "" === t ? !1 : t, n)
        }
    }, ct.each(["width", "height"], function(e, n) {
        ct.attrHooks[n] = {
            set: function(e, r) {
                return "" === r ? (e.setAttribute(n, "auto"), r) : t
            }
        }
    })), ct.support.hrefNormalized || ct.each(["href", "src"], function(e, t) {
        ct.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    }), ct.support.style || (ct.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }), ct.support.optSelected || (ct.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
        }
    }), ct.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        ct.propFix[this.toLowerCase()] = this
    }), ct.support.enctype || (ct.propFix.enctype = "encoding"), ct.each(["radio", "checkbox"], function() {
        ct.valHooks[this] = {
            set: function(e, n) {
                return ct.isArray(n) ? e.checked = ct.inArray(ct(e).val(), n) >= 0 : t
            }
        }, ct.support.checkOn || (ct.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var Ft = /^(?:input|select|textarea)$/i,
        Bt = /^key/,
        Pt = /^(?:mouse|contextmenu)|click/,
        Rt = /^(?:focusinfocus|focusoutblur)$/,
        Wt = /^([^.]*)(?:\.(.+)|)$/;
    ct.event = {
        global: {},
        add: function(e, n, r, i, o) {
            var a, s, u, l, c, f, p, d, h, g, m, y = ct._data(e);
            if (y) {
                for (r.handler && (l = r, r = l.handler, o = l.selector), r.guid || (r.guid = ct.guid++), (s = y.events) || (s = y.events = {}), (f = y.handle) || (f = y.handle = function(e) {
                    return typeof ct === Y || e && ct.event.triggered === e.type ? t : ct.event.dispatch.apply(f.elem, arguments)
                }, f.elem = e), n = (n || "").match(pt) || [""], u = n.length; u--;) a = Wt.exec(n[u]) || [], h = m = a[1], g = (a[2] || "").split(".").sort(), h && (c = ct.event.special[h] || {}, h = (o ? c.delegateType : c.bindType) || h, c = ct.event.special[h] || {}, p = ct.extend({
                    type: h,
                    origType: m,
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: o,
                    needsContext: o && ct.expr.match.needsContext.test(o),
                    namespace: g.join(".")
                }, l), (d = s[h]) || (d = s[h] = [], d.delegateCount = 0, c.setup && c.setup.call(e, i, g, f) !== !1 || (e.addEventListener ? e.addEventListener(h, f, !1) : e.attachEvent && e.attachEvent("on" + h, f))), c.add && (c.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), o ? d.splice(d.delegateCount++, 0, p) : d.push(p), ct.event.global[h] = !0);
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, u, l, c, f, p, d, h, g, m = ct.hasData(e) && ct._data(e);
            if (m && (c = m.events)) {
                for (t = (t || "").match(pt) || [""], l = t.length; l--;) if (s = Wt.exec(t[l]) || [], d = g = s[1], h = (s[2] || "").split(".").sort(), d) {
                    for (f = ct.event.special[d] || {}, d = (r ? f.delegateType : f.bindType) || d, p = c[d] || [], s = s[2] && RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length; o--;) a = p[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (p.splice(o, 1), a.selector && p.delegateCount--, f.remove && f.remove.call(e, a));
                    u && !p.length && (f.teardown && f.teardown.call(e, h, m.handle) !== !1 || ct.removeEvent(e, d, m.handle), delete c[d])
                } else for (d in c) ct.event.remove(e, d + t[l], n, r, !0);
                ct.isEmptyObject(c) && (delete m.handle, ct._removeData(e, "events"))
            }
        },
        trigger: function(n, r, i, o) {
            var a, s, u, l, c, f, p, d = [i || G],
                h = ut.call(n, "type") ? n.type : n,
                g = ut.call(n, "namespace") ? n.namespace.split(".") : [];
            if (u = f = i = i || G, 3 !== i.nodeType && 8 !== i.nodeType && !Rt.test(h + ct.event.triggered) && (h.indexOf(".") >= 0 && (g = h.split("."), h = g.shift(), g.sort()), s = 0 > h.indexOf(":") && "on" + h, n = n[ct.expando] ? n : new ct.Event(h, "object" == typeof n && n), n.isTrigger = o ? 2 : 3, n.namespace = g.join("."), n.namespace_re = n.namespace ? RegExp("(^|\\.)" + g.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : ct.makeArray(r, [n]), c = ct.event.special[h] || {}, o || !c.trigger || c.trigger.apply(i, r) !== !1)) {
                if (!o && !c.noBubble && !ct.isWindow(i)) {
                    for (l = c.delegateType || h, Rt.test(l + h) || (u = u.parentNode); u; u = u.parentNode) d.push(u), f = u;
                    f === (i.ownerDocument || G) && d.push(f.defaultView || f.parentWindow || e)
                }
                for (p = 0;
                (u = d[p++]) && !n.isPropagationStopped();) n.type = p > 1 ? l : c.bindType || h, a = (ct._data(u, "events") || {})[n.type] && ct._data(u, "handle"), a && a.apply(u, r), a = s && u[s], a && ct.acceptData(u) && a.apply && a.apply(u, r) === !1 && n.preventDefault();
                if (n.type = h, !o && !n.isDefaultPrevented() && (!c._default || c._default.apply(d.pop(), r) === !1) && ct.acceptData(i) && s && i[h] && !ct.isWindow(i)) {
                    f = i[s], f && (i[s] = null), ct.event.triggered = h;
                    try {
                        i[h]()
                    } catch (m) {}
                    ct.event.triggered = t, f && (i[s] = f)
                }
                return n.result
            }
        },
        dispatch: function(e) {
            e = ct.event.fix(e);
            var n, r, i, o, a, s = [],
                u = ot.call(arguments),
                l = (ct._data(this, "events") || {})[e.type] || [],
                c = ct.event.special[e.type] || {};
            if (u[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (s = ct.event.handlers.call(this, e, l), n = 0;
                (o = s[n++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, a = 0;
                (i = o.handlers[a++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(i.namespace)) && (e.handleObj = i, e.data = i.data, r = ((ct.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, u), r !== t && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result
            }
        },
        handlers: function(e, n) {
            var r, i, o, a, s = [],
                u = n.delegateCount,
                l = e.target;
            if (u && l.nodeType && (!e.button || "click" !== e.type)) for (; l != this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
                for (o = [], a = 0; u > a; a++) i = n[a], r = i.selector + " ", o[r] === t && (o[r] = i.needsContext ? ct(r, this).index(l) >= 0 : ct.find(r, this, null, [l]).length), o[r] && o.push(i);
                o.length && s.push({
                    elem: l,
                    handlers: o
                })
            }
            return n.length > u && s.push({
                elem: this,
                handlers: n.slice(u)
            }), s
        },
        fix: function(e) {
            if (e[ct.expando]) return e;
            var t, n, r, i = e.type,
                o = e,
                a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Pt.test(i) ? this.mouseHooks : Bt.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new ct.Event(o), t = r.length; t--;) n = r[t], e[n] = o[n];
            return e.target || (e.target = o.srcElement || G), 3 === e.target.nodeType && (e.target = e.target.parentNode), e.metaKey = !! e.metaKey, a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r, i, o, a = n.button,
                    s = n.fromElement;
                return null == e.pageX && null != n.clientX && (i = e.target.ownerDocument || G, o = i.documentElement, r = i.body, e.pageX = n.clientX + (o && o.scrollLeft || r && r.scrollLeft || 0) - (o && o.clientLeft || r && r.clientLeft || 0), e.pageY = n.clientY + (o && o.scrollTop || r && r.scrollTop || 0) - (o && o.clientTop || r && r.clientTop || 0)), !e.relatedTarget && s && (e.relatedTarget = s === e.target ? n.toElement : s), e.which || a === t || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== c() && this.focus) try {
                        return this.focus(), !1
                    } catch (e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === c() && this.blur ? (this.blur(), !1) : t
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return ct.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : t
                },
                _default: function(e) {
                    return ct.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = ct.extend(new ct.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? ct.event.trigger(i, null, t) : ct.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault()
        }
    }, ct.removeEvent = G.removeEventListener ? function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    } : function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && (typeof e[r] === Y && (e[r] = null), e.detachEvent(r, n))
    }, ct.Event = function(e, n) {
        return this instanceof ct.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? u : l) : this.type = e, n && ct.extend(this, n), this.timeStamp = e && e.timeStamp || ct.now(), this[ct.expando] = !0, t) : new ct.Event(e, n)
    }, ct.Event.prototype = {
        isDefaultPrevented: l,
        isPropagationStopped: l,
        isImmediatePropagationStopped: l,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = u, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = u, e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = u, this.stopPropagation()
        }
    }, ct.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(e, t) {
        ct.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this,
                    i = e.relatedTarget,
                    o = e.handleObj;
                return (!i || i !== r && !ct.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t), n
            }
        }
    }), ct.support.submitBubbles || (ct.event.special.submit = {
        setup: function() {
            return ct.nodeName(this, "form") ? !1 : (ct.event.add(this, "click._submit keypress._submit", function(e) {
                var n = e.target,
                    r = ct.nodeName(n, "input") || ct.nodeName(n, "button") ? n.form : t;
                r && !ct._data(r, "submitBubbles") && (ct.event.add(r, "submit._submit", function(e) {
                    e._submit_bubble = !0
                }), ct._data(r, "submitBubbles", !0))
            }), t)
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && ct.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return ct.nodeName(this, "form") ? !1 : (ct.event.remove(this, "._submit"), t)
        }
    }), ct.support.changeBubbles || (ct.event.special.change = {
        setup: function() {
            return Ft.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ct.event.add(this, "propertychange._change", function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), ct.event.add(this, "click._change", function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1), ct.event.simulate("change", this, e, !0)
            })), !1) : (ct.event.add(this, "beforeactivate._change", function(e) {
                var t = e.target;
                Ft.test(t.nodeName) && !ct._data(t, "changeBubbles") && (ct.event.add(t, "change._change", function(e) {
                    !this.parentNode || e.isSimulated || e.isTrigger || ct.event.simulate("change", this.parentNode, e, !0)
                }), ct._data(t, "changeBubbles", !0))
            }), t)
        },
        handle: function(e) {
            var n = e.target;
            return this !== n || e.isSimulated || e.isTrigger || "radio" !== n.type && "checkbox" !== n.type ? e.handleObj.handler.apply(this, arguments) : t
        },
        teardown: function() {
            return ct.event.remove(this, "._change"), !Ft.test(this.nodeName)
        }
    }), ct.support.focusinBubbles || ct.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = 0,
            r = function(e) {
                ct.event.simulate(t, e.target, ct.event.fix(e), !0)
            };
        ct.event.special[t] = {
            setup: function() {
                0 === n++ && G.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && G.removeEventListener(e, r, !0)
            }
        }
    }), ct.fn.extend({
        on: function(e, n, r, i, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (a in e) this.on(a, n, r, e[a], o);
                return this
            }
            if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = l;
            else if (!i) return this;
            return 1 === o && (s = i, i = function(e) {
                return ct().off(e), s.apply(this, arguments)
            }, i.guid = s.guid || (s.guid = ct.guid++)), this.each(function() {
                ct.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i, o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj, ct(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, n, e[o]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t), r === !1 && (r = l), this.each(function() {
                ct.event.remove(this, e, r, n)
            })
        },
        trigger: function(e, t) {
            return this.each(function() {
                ct.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, n) {
            var r = this[0];
            return r ? ct.event.trigger(e, n, r, !0) : t
        }
    });
    var $t = /^.[^:#\[\.,]*$/,
        It = /^(?:parents|prev(?:Until|All))/,
        zt = ct.expr.match.needsContext,
        Xt = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    ct.fn.extend({
        find: function(e) {
            var t, n = [],
                r = this,
                i = r.length;
            if ("string" != typeof e) return this.pushStack(ct(e).filter(function() {
                for (t = 0; i > t; t++) if (ct.contains(r[t], this)) return !0
            }));
            for (t = 0; i > t; t++) ct.find(e, r[t], n);
            return n = this.pushStack(i > 1 ? ct.unique(n) : n), n.selector = this.selector ? this.selector + " " + e : e, n
        },
        has: function(e) {
            var t, n = ct(e, this),
                r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) if (ct.contains(this, n[t])) return !0
            })
        },
        not: function(e) {
            return this.pushStack(p(this, e || [], !0))
        },
        filter: function(e) {
            return this.pushStack(p(this, e || [], !1))
        },
        is: function(e) {
            return !!p(this, "string" == typeof e && zt.test(e) ? ct(e) : e || [], !1).length
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], a = zt.test(e) || "string" != typeof e ? ct(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n !== t; n = n.parentNode) if (11 > n.nodeType && (a ? a.index(n) > -1 : 1 === n.nodeType && ct.find.matchesSelector(n, e))) {
                n = o.push(n);
                break
            }
            return this.pushStack(o.length > 1 ? ct.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? ct.inArray(this[0], ct(e)) : ct.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? ct(e, t) : ct.makeArray(e && e.nodeType ? [e] : e),
                r = ct.merge(this.get(), n);
            return this.pushStack(ct.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), ct.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return ct.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return ct.dir(e, "parentNode", n)
        },
        next: function(e) {
            return f(e, "nextSibling")
        },
        prev: function(e) {
            return f(e, "previousSibling")
        },
        nextAll: function(e) {
            return ct.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return ct.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return ct.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return ct.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return ct.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return ct.sibling(e.firstChild)
        },
        contents: function(e) {
            return ct.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : ct.merge([], e.childNodes)
        }
    }, function(e, t) {
        ct.fn[e] = function(n, r) {
            var i = ct.map(this, t, n);
            return "Until" !== e.slice(-5) && (r = n), r && "string" == typeof r && (i = ct.filter(r, i)), this.length > 1 && (Xt[e] || (i = ct.unique(i)), It.test(e) && (i = i.reverse())), this.pushStack(i)
        }
    }), ct.extend({
        filter: function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? ct.find.matchesSelector(r, e) ? [r] : [] : ct.find.matches(e, ct.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        },
        dir: function(e, n, r) {
            for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !ct(o).is(r));) 1 === o.nodeType && i.push(o), o = o[n];
            return i
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var Ut = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Vt = / jQuery\d+="(?:null|\d+)"/g,
        Yt = RegExp("<(?:" + Ut + ")[\\s/>]", "i"),
        Jt = /^\s+/,
        Gt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Qt = /<([\w:]+)/,
        Kt = /<tbody/i,
        Zt = /<|&#?\w+;/,
        en = /<(?:script|style|link)/i,
        tn = /^(?:checkbox|radio)$/i,
        nn = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rn = /^$|\/(?:java|ecma)script/i,
        on = /^true\/(.*)/,
        an = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        sn = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: ct.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        }, un = d(G),
        ln = un.appendChild(G.createElement("div"));
    sn.optgroup = sn.option, sn.tbody = sn.tfoot = sn.colgroup = sn.caption = sn.thead, sn.th = sn.td, ct.fn.extend({
        text: function(e) {
            return ct.access(this, function(e) {
                return e === t ? ct.text(this) : this.empty().append((this[0] && this[0].ownerDocument || G).createTextNode(e))
            }, null, e, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.appendChild(e)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = h(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = e ? ct.filter(e, this) : this, i = 0; null != (n = r[i]); i++) t || 1 !== n.nodeType || ct.cleanData(x(n)), n.parentNode && (t && ct.contains(n.ownerDocument, n) && y(x(n, "script")), n.parentNode.removeChild(n));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && ct.cleanData(x(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && ct.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function() {
                return ct.clone(this, e, t)
            })
        },
        html: function(e) {
            return ct.access(this, function(e) {
                var n = this[0] || {}, r = 0,
                    i = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Vt, "") : t;
                if (!("string" != typeof e || en.test(e) || !ct.support.htmlSerialize && Yt.test(e) || !ct.support.leadingWhitespace && Jt.test(e) || sn[(Qt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Gt, "<$1></$2>");
                    try {
                        for (; i > r; r++) n = this[r] || {}, 1 === n.nodeType && (ct.cleanData(x(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch (o) {}
                }
                n && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var e = ct.map(this, function(e) {
                return [e.nextSibling, e.parentNode]
            }),
                t = 0;
            return this.domManip(arguments, function(n) {
                var r = e[t++],
                    i = e[t++];
                i && (r && r.parentNode !== i && (r = this.nextSibling), ct(this).remove(), i.insertBefore(n, r))
            }, !0), t ? this : this.remove()
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, t, n) {
            e = rt.apply([], e);
            var r, i, o, a, s, u, l = 0,
                c = this.length,
                f = this,
                p = c - 1,
                d = e[0],
                h = ct.isFunction(d);
            if (h || !(1 >= c || "string" != typeof d || ct.support.checkClone) && nn.test(d)) return this.each(function(r) {
                var i = f.eq(r);
                h && (e[0] = d.call(this, r, i.html())), i.domManip(e, t, n)
            });
            if (c && (u = ct.buildFragment(e, this[0].ownerDocument, !1, !n && this), r = u.firstChild, 1 === u.childNodes.length && (u = r), r)) {
                for (a = ct.map(x(u, "script"), g), o = a.length; c > l; l++) i = u, l !== p && (i = ct.clone(i, !0, !0), o && ct.merge(a, x(i, "script"))), t.call(this[l], i, l);
                if (o) for (s = a[a.length - 1].ownerDocument, ct.map(a, m), l = 0; o > l; l++) i = a[l], rn.test(i.type || "") && !ct._data(i, "globalEval") && ct.contains(s, i) && (i.src ? ct._evalUrl(i.src) : ct.globalEval((i.text || i.textContent || i.innerHTML || "").replace(an, "")));
                u = r = null
            }
            return this
        }
    }), ct.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        ct.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = ct(e), a = o.length - 1; a >= r; r++) n = r === a ? this : this.clone(!0), ct(o[r])[t](n), it.apply(i, n.get());
            return this.pushStack(i)
        }
    }), ct.extend({
        clone: function(e, t, n) {
            var r, i, o, a, s, u = ct.contains(e.ownerDocument, e);
            if (ct.support.html5Clone || ct.isXMLDoc(e) || !Yt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ln.innerHTML = e.outerHTML, ln.removeChild(o = ln.firstChild)), !(ct.support.noCloneEvent && ct.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || ct.isXMLDoc(e))) for (r = x(o), s = x(e), a = 0; null != (i = s[a]); ++a) r[a] && b(i, r[a]);
            if (t) if (n) for (s = s || x(e), r = r || x(o), a = 0; null != (i = s[a]); a++) v(i, r[a]);
            else v(e, o);
            return r = x(o, "script"), r.length > 0 && y(r, !u && x(e, "script")), r = s = i = null, o
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, a, s, u, l, c, f = e.length, p = d(t), h = [], g = 0; f > g; g++) if (o = e[g], o || 0 === o) if ("object" === ct.type(o)) ct.merge(h, o.nodeType ? [o] : o);
            else if (Zt.test(o)) {
                for (s = s || p.appendChild(t.createElement("div")), u = (Qt.exec(o) || ["", ""])[1].toLowerCase(), c = sn[u] || sn._default, s.innerHTML = c[1] + o.replace(Gt, "<$1></$2>") + c[2], i = c[0]; i--;) s = s.lastChild;
                if (!ct.support.leadingWhitespace && Jt.test(o) && h.push(t.createTextNode(Jt.exec(o)[0])), !ct.support.tbody) for (o = "table" !== u || Kt.test(o) ? "<table>" !== c[1] || Kt.test(o) ? 0 : s : s.firstChild, i = o && o.childNodes.length; i--;) ct.nodeName(l = o.childNodes[i], "tbody") && !l.childNodes.length && o.removeChild(l);
                for (ct.merge(h, s.childNodes), s.textContent = ""; s.firstChild;) s.removeChild(s.firstChild);
                s = p.lastChild
            } else h.push(t.createTextNode(o));
            for (s && p.removeChild(s), ct.support.appendChecked || ct.grep(x(h, "input"), T), g = 0; o = h[g++];) if ((!r || -1 === ct.inArray(o, r)) && (a = ct.contains(o.ownerDocument, o), s = x(p.appendChild(o), "script"), a && y(s), n)) for (i = 0; o = s[i++];) rn.test(o.type || "") && n.push(o);
            return s = null, p
        },
        cleanData: function(e, t) {
            for (var n, r, i, o, a = 0, s = ct.expando, u = ct.cache, l = ct.support.deleteExpando, c = ct.event.special; null != (n = e[a]); a++) if ((t || ct.acceptData(n)) && (i = n[s], o = i && u[i])) {
                if (o.events) for (r in o.events) c[r] ? ct.event.remove(n, r) : ct.removeEvent(n, r, o.handle);
                u[i] && (delete u[i], l ? delete n[s] : typeof n.removeAttribute !== Y ? n.removeAttribute(s) : n[s] = null, tt.push(i))
            }
        },
        _evalUrl: function(e) {
            return ct.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), ct.fn.extend({
        wrapAll: function(e) {
            if (ct.isFunction(e)) return this.each(function(t) {
                ct(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = ct(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return ct.isFunction(e) ? this.each(function(t) {
                ct(this).wrapInner(e.call(this, t))
            }) : this.each(function() {
                var t = ct(this),
                    n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = ct.isFunction(e);
            return this.each(function(n) {
                ct(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                ct.nodeName(this, "body") || ct(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var cn, fn, pn, dn = /alpha\([^)]*\)/i,
        hn = /opacity\s*=\s*([^)]*)/,
        gn = /^(top|right|bottom|left)$/,
        mn = /^(none|table(?!-c[ea]).+)/,
        yn = /^margin/,
        vn = RegExp("^(" + ft + ")(.*)$", "i"),
        bn = RegExp("^(" + ft + ")(?!px)[a-z%]+$", "i"),
        xn = RegExp("^([+-])=(" + ft + ")", "i"),
        Tn = {
            BODY: "block"
        }, wn = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Cn = {
            letterSpacing: 0,
            fontWeight: 400
        }, Nn = ["Top", "Right", "Bottom", "Left"],
        kn = ["Webkit", "O", "Moz", "ms"];
    ct.fn.extend({
        css: function(e, n) {
            return ct.access(this, function(e, n, r) {
                var i, o, a = {}, s = 0;
                if (ct.isArray(n)) {
                    for (o = fn(e), i = n.length; i > s; s++) a[n[s]] = ct.css(e, n[s], !1, o);
                    return a
                }
                return r !== t ? ct.style(e, n, r) : ct.css(e, n)
            }, e, n, arguments.length > 1)
        },
        show: function() {
            return N(this, !0)
        },
        hide: function() {
            return N(this)
        },
        toggle: function(e) {
            var t = "boolean" == typeof e;
            return this.each(function() {
                (t ? e : C(this)) ? ct(this).show() : ct(this).hide()
            })
        }
    }), ct.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = pn(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": ct.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, a, s, u = ct.camelCase(n),
                    l = e.style;
                if (n = ct.cssProps[u] || (ct.cssProps[u] = w(l, u)), s = ct.cssHooks[n] || ct.cssHooks[u], r === t) return s && "get" in s && (o = s.get(e, !1, i)) !== t ? o : l[n];
                if (a = typeof r, "string" === a && (o = xn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(ct.css(e, n)), a = "number"), !(null == r || "number" === a && isNaN(r) || ("number" !== a || ct.cssNumber[u] || (r += "px"), ct.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (l[n] = "inherit"), s && "set" in s && (r = s.set(e, r, i)) === t))) try {
                    l[n] = r
                } catch (c) {}
            }
        },
        css: function(e, n, r, i) {
            var o, a, s, u = ct.camelCase(n);
            return n = ct.cssProps[u] || (ct.cssProps[u] = w(e.style, u)), s = ct.cssHooks[n] || ct.cssHooks[u], s && "get" in s && (a = s.get(e, !0, r)), a === t && (a = pn(e, n, i)), "normal" === a && n in Cn && (a = Cn[n]), "" === r || r ? (o = parseFloat(a), r === !0 || ct.isNumeric(o) ? o || 0 : a) : a
        }
    }), e.getComputedStyle ? (fn = function(t) {
        return e.getComputedStyle(t, null)
    }, pn = function(e, n, r) {
        var i, o, a, s = r || fn(e),
            u = s ? s.getPropertyValue(n) || s[n] : t,
            l = e.style;
        return s && ("" !== u || ct.contains(e.ownerDocument, e) || (u = ct.style(e, n)), bn.test(u) && yn.test(n) && (i = l.width, o = l.minWidth, a = l.maxWidth, l.minWidth = l.maxWidth = l.width = u, u = s.width, l.width = i, l.minWidth = o, l.maxWidth = a)), u
    }) : G.documentElement.currentStyle && (fn = function(e) {
        return e.currentStyle
    }, pn = function(e, n, r) {
        var i, o, a, s = r || fn(e),
            u = s ? s[n] : t,
            l = e.style;
        return null == u && l && l[n] && (u = l[n]), bn.test(u) && !gn.test(n) && (i = l.left, o = e.runtimeStyle, a = o && o.left, a && (o.left = e.currentStyle.left), l.left = "fontSize" === n ? "1em" : u, u = l.pixelLeft + "px", l.left = i, a && (o.left = a)), "" === u ? "auto" : u
    }), ct.each(["height", "width"], function(e, n) {
        ct.cssHooks[n] = {
            get: function(e, r, i) {
                return r ? 0 === e.offsetWidth && mn.test(ct.css(e, "display")) ? ct.swap(e, wn, function() {
                    return S(e, n, i)
                }) : S(e, n, i) : t
            },
            set: function(e, t, r) {
                var i = r && fn(e);
                return k(e, t, r ? E(e, n, r, ct.support.boxSizing && "border-box" === ct.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }), ct.support.opacity || (ct.cssHooks.opacity = {
        get: function(e, t) {
            return hn.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
        },
        set: function(e, t) {
            var n = e.style,
                r = e.currentStyle,
                i = ct.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
                o = r && r.filter || n.filter || "";
            n.zoom = 1, (t >= 1 || "" === t) && "" === ct.trim(o.replace(dn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = dn.test(o) ? o.replace(dn, i) : o + " " + i)
        }
    }), ct(function() {
        ct.support.reliableMarginRight || (ct.cssHooks.marginRight = {
            get: function(e, n) {
                return n ? ct.swap(e, {
                    display: "inline-block"
                }, pn, [e, "marginRight"]) : t
            }
        }), !ct.support.pixelPosition && ct.fn.position && ct.each(["top", "left"], function(e, n) {
            ct.cssHooks[n] = {
                get: function(e, r) {
                    return r ? (r = pn(e, n), bn.test(r) ? ct(e).position()[n] + "px" : r) : t
                }
            }
        })
    }), ct.expr && ct.expr.filters && (ct.expr.filters.hidden = function(e) {
        return 0 >= e.offsetWidth && 0 >= e.offsetHeight || !ct.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || ct.css(e, "display"))
    }, ct.expr.filters.visible = function(e) {
        return !ct.expr.filters.hidden(e)
    }), ct.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        ct.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Nn[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        }, yn.test(e) || (ct.cssHooks[e + t].set = k)
    });
    var En = /%20/g,
        Sn = /\[\]$/,
        An = /\r?\n/g,
        jn = /^(?:submit|button|image|reset|file)$/i,
        Dn = /^(?:input|select|textarea|keygen)/i;
    ct.fn.extend({
        serialize: function() {
            return ct.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = ct.prop(this, "elements");
                return e ? ct.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !ct(this).is(":disabled") && Dn.test(this.nodeName) && !jn.test(e) && (this.checked || !tn.test(e))
            }).map(function(e, t) {
                var n = ct(this).val();
                return null == n ? null : ct.isArray(n) ? ct.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(An, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(An, "\r\n")
                }
            }).get()
        }
    }), ct.param = function(e, n) {
        var r, i = [],
            o = function(e, t) {
                t = ct.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
            };
        if (n === t && (n = ct.ajaxSettings && ct.ajaxSettings.traditional), ct.isArray(e) || e.jquery && !ct.isPlainObject(e)) ct.each(e, function() {
            o(this.name, this.value)
        });
        else for (r in e) D(r, e[r], n, o);
        return i.join("&").replace(En, "+")
    }, ct.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        ct.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), ct.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var Ln, Hn, qn = ct.now(),
        _n = /\?/,
        Mn = /#.*$/,
        On = /([?&])_=[^&]*/,
        Fn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Bn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Pn = /^(?:GET|HEAD)$/,
        Rn = /^\/\//,
        Wn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        $n = ct.fn.load,
        In = {}, zn = {}, Xn = "*/".concat("*");
    try {
        Hn = J.href
    } catch (Un) {
        Hn = G.createElement("a"), Hn.href = "", Hn = Hn.href
    }
    Ln = Wn.exec(Hn.toLowerCase()) || [], ct.fn.load = function(e, n, r) {
        if ("string" != typeof e && $n) return $n.apply(this, arguments);
        var i, o, a, s = this,
            u = e.indexOf(" ");
        return u >= 0 && (i = e.slice(u, e.length), e = e.slice(0, u)), ct.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (a = "POST"), s.length > 0 && ct.ajax({
            url: e,
            type: a,
            dataType: "html",
            data: n
        }).done(function(e) {
            o = arguments, s.html(i ? ct("<div>").append(ct.parseHTML(e)).find(i) : e)
        }).complete(r && function(e, t) {
            s.each(r, o || [e.responseText, t, e])
        }), this
    }, ct.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        ct.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), ct.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Hn,
            type: "GET",
            isLocal: Bn.test(Ln[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Xn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": ct.parseJSON,
                "text xml": ct.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? q(q(e, ct.ajaxSettings), t) : q(ct.ajaxSettings, e)
        },
        ajaxPrefilter: L(In),
        ajaxTransport: L(zn),
        ajax: function(e, n) {
            function r(e, n, r, i) {
                var o, f, v, b, T, C = n;
                2 !== x && (x = 2, u && clearTimeout(u), c = t, s = i || "", w.readyState = e > 0 ? 4 : 0, o = e >= 200 && 300 > e || 304 === e, r && (b = _(p, w, r)), b = M(p, b, w, o), o ? (p.ifModified && (T = w.getResponseHeader("Last-Modified"), T && (ct.lastModified[a] = T), T = w.getResponseHeader("etag"), T && (ct.etag[a] = T)), 204 === e || "HEAD" === p.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = b.state, f = b.data, v = b.error, o = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), w.status = e, w.statusText = (n || C) + "", o ? g.resolveWith(d, [f, C, w]) : g.rejectWith(d, [w, C, v]), w.statusCode(y), y = t, l && h.trigger(o ? "ajaxSuccess" : "ajaxError", [w, p, o ? f : v]), m.fireWith(d, [w, C]), l && (h.trigger("ajaxComplete", [w, p]), --ct.active || ct.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e, e = t), n = n || {};
            var i, o, a, s, u, l, c, f, p = ct.ajaxSetup({}, n),
                d = p.context || p,
                h = p.context && (d.nodeType || d.jquery) ? ct(d) : ct.event,
                g = ct.Deferred(),
                m = ct.Callbacks("once memory"),
                y = p.statusCode || {}, v = {}, b = {}, x = 0,
                T = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (2 === x) {
                            if (!f) for (f = {}; t = Fn.exec(s);) f[t[1].toLowerCase()] = t[2];
                            t = f[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? s : null
                    },
                    setRequestHeader: function(e, t) {
                        var n = e.toLowerCase();
                        return x || (e = b[n] = b[n] || e, v[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return x || (p.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e) if (2 > x) for (t in e) y[t] = [y[t], e[t]];
                        else w.always(e[w.status]);
                        return this
                    },
                    abort: function(e) {
                        var t = e || T;
                        return c && c.abort(t), r(0, t), this
                    }
                };
            if (g.promise(w).complete = m.add, w.success = w.done, w.error = w.fail, p.url = ((e || p.url || Hn) + "").replace(Mn, "").replace(Rn, Ln[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = ct.trim(p.dataType || "*").toLowerCase().match(pt) || [""], null == p.crossDomain && (i = Wn.exec(p.url.toLowerCase()), p.crossDomain = !(!i || i[1] === Ln[1] && i[2] === Ln[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (Ln[3] || ("http:" === Ln[1] ? "80" : "443")))), p.data && p.processData && "string" != typeof p.data && (p.data = ct.param(p.data, p.traditional)), H(In, p, n, w), 2 === x) return w;
            l = p.global, l && 0 === ct.active++ && ct.event.trigger("ajaxStart"), p.type = p.type.toUpperCase(), p.hasContent = !Pn.test(p.type), a = p.url, p.hasContent || (p.data && (a = p.url += (_n.test(a) ? "&" : "?") + p.data, delete p.data), p.cache === !1 && (p.url = On.test(a) ? a.replace(On, "$1_=" + qn++) : a + (_n.test(a) ? "&" : "?") + "_=" + qn++)), p.ifModified && (ct.lastModified[a] && w.setRequestHeader("If-Modified-Since", ct.lastModified[a]), ct.etag[a] && w.setRequestHeader("If-None-Match", ct.etag[a])), (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && w.setRequestHeader("Content-Type", p.contentType), w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + Xn + "; q=0.01" : "") : p.accepts["*"]);
            for (o in p.headers) w.setRequestHeader(o, p.headers[o]);
            if (p.beforeSend && (p.beforeSend.call(d, w, p) === !1 || 2 === x)) return w.abort();
            T = "abort";
            for (o in {
                success: 1,
                error: 1,
                complete: 1
            }) w[o](p[o]);
            if (c = H(zn, p, n, w)) {
                w.readyState = 1, l && h.trigger("ajaxSend", [w, p]), p.async && p.timeout > 0 && (u = setTimeout(function() {
                    w.abort("timeout")
                }, p.timeout));
                try {
                    x = 1, c.send(v, r)
                } catch (C) {
                    if (!(2 > x)) throw C;
                    r(-1, C)
                }
            } else r(-1, "No Transport");
            return w
        },
        getJSON: function(e, t, n) {
            return ct.get(e, t, n, "json")
        },
        getScript: function(e, n) {
            return ct.get(e, t, n, "script")
        }
    }), ct.each(["get", "post"], function(e, n) {
        ct[n] = function(e, r, i, o) {
            return ct.isFunction(r) && (o = o || i, i = r, r = t), ct.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            })
        }
    }), ct.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return ct.globalEval(e), e
            }
        }
    }), ct.ajaxPrefilter("script", function(e) {
        e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1)
    }), ct.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var n, r = G.head || ct("head")[0] || G.documentElement;
            return {
                send: function(t, i) {
                    n = G.createElement("script"), n.async = !0, e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function(e, t) {
                        (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
                    }, r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(t, !0)
                }
            }
        }
    });
    var Vn = [],
        Yn = /(=)\?(?=&|$)|\?\?/;
    ct.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Vn.pop() || ct.expando + "_" + qn++;
            return this[e] = !0, e
        }
    }), ct.ajaxPrefilter("json jsonp", function(n, r, i) {
        var o, a, s, u = n.jsonp !== !1 && (Yn.test(n.url) ? "url" : "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Yn.test(n.data) && "data");
        return u || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = ct.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, u ? n[u] = n[u].replace(Yn, "$1" + o) : n.jsonp !== !1 && (n.url += (_n.test(n.url) ? "&" : "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
            return s || ct.error(o + " was not called"), s[0]
        }, n.dataTypes[0] = "json", a = e[o], e[o] = function() {
            s = arguments
        }, i.always(function() {
            e[o] = a, n[o] && (n.jsonpCallback = r.jsonpCallback, Vn.push(o)), s && ct.isFunction(a) && a(s[0]), s = a = t
        }), "script") : t
    });
    var Jn, Gn, Qn = 0,
        Kn = e.ActiveXObject && function() {
            var e;
            for (e in Jn) Jn[e](t, !0)
        };
    ct.ajaxSettings.xhr = e.ActiveXObject ? function() {
        return !this.isLocal && O() || F()
    } : O, Gn = ct.ajaxSettings.xhr(), ct.support.cors = !! Gn && "withCredentials" in Gn, Gn = ct.support.ajax = !! Gn, Gn && ct.ajaxTransport(function(n) {
        if (!n.crossDomain || ct.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var a, s, u = n.xhr();
                    if (n.username ? u.open(n.type, n.url, n.async, n.username, n.password) : u.open(n.type, n.url, n.async), n.xhrFields) for (s in n.xhrFields) u[s] = n.xhrFields[s];
                    n.mimeType && u.overrideMimeType && u.overrideMimeType(n.mimeType), n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (s in i) u.setRequestHeader(s, i[s])
                    } catch (l) {}
                    u.send(n.hasContent && n.data || null), r = function(e, i) {
                        var s, l, c, f;
                        try {
                            if (r && (i || 4 === u.readyState)) if (r = t, a && (u.onreadystatechange = ct.noop, Kn && delete Jn[a]), i) 4 !== u.readyState && u.abort();
                            else {
                                f = {}, s = u.status, l = u.getAllResponseHeaders(), "string" == typeof u.responseText && (f.text = u.responseText);
                                try {
                                    c = u.statusText
                                } catch (p) {
                                    c = ""
                                }
                                s || !n.isLocal || n.crossDomain ? 1223 === s && (s = 204) : s = f.text ? 200 : 404
                            }
                        } catch (d) {
                            i || o(-1, d)
                        }
                        f && o(s, c, f, l)
                    }, n.async ? 4 === u.readyState ? setTimeout(r) : (a = ++Qn, Kn && (Jn || (Jn = {}, ct(e).unload(Kn)), Jn[a] = r), u.onreadystatechange = r) : r()
                },
                abort: function() {
                    r && r(t, !0)
                }
            }
        }
    });
    var Zn, er, tr = /^(?:toggle|show|hide)$/,
        nr = RegExp("^(?:([+-])=|)(" + ft + ")([a-z%]*)$", "i"),
        rr = /queueHooks$/,
        ir = [$],
        or = {
            "*": [function(e, t) {
                var n = this.createTween(e, t),
                    r = n.cur(),
                    i = nr.exec(t),
                    o = i && i[3] || (ct.cssNumber[e] ? "" : "px"),
                    a = (ct.cssNumber[e] || "px" !== o && +r) && nr.exec(ct.css(n.elem, e)),
                    s = 1,
                    u = 20;
                if (a && a[3] !== o) {
                    o = o || a[3], i = i || [], a = +r || 1;
                    do s = s || ".5", a /= s, ct.style(n.elem, e, a + o);
                    while (s !== (s = n.cur() / r) && 1 !== s && --u)
                }
                return i && (a = n.start = +a || +r || 0, n.unit = o, n.end = i[1] ? a + (i[1] + 1) * i[2] : +i[2]), n
            }]
        };
    ct.Animation = ct.extend(R, {
        tweener: function(e, t) {
            ct.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++) n = e[r], or[n] = or[n] || [], or[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? ir.unshift(e) : ir.push(e)
        }
    }), ct.Tween = I, I.prototype = {
        constructor: I,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (ct.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = I.propHooks[this.prop];
            return e && e.get ? e.get(this) : I.propHooks._default.get(this)
        },
        run: function(e) {
            var t, n = I.propHooks[this.prop];
            return this.pos = t = this.options.duration ? ct.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : I.propHooks._default.set(this), this
        }
    }, I.prototype.init.prototype = I.prototype, I.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = ct.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            },
            set: function(e) {
                ct.fx.step[e.prop] ? ct.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[ct.cssProps[e.prop]] || ct.cssHooks[e.prop]) ? ct.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, I.propHooks.scrollTop = I.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, ct.each(["toggle", "show", "hide"], function(e, t) {
        var n = ct.fn[t];
        ct.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(z(t, !0), e, r, i)
        }
    }), ct.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(C).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = ct.isEmptyObject(e),
                o = ct.speed(t, n, r),
                a = function() {
                    var t = R(this, ct.extend({}, e), o);
                    (i || ct._data(this, "finish")) && t.stop(!0)
                };
            return a.finish = a, i || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return "string" != typeof e && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function() {
                var t = !0,
                    n = null != e && e + "queueHooks",
                    o = ct.timers,
                    a = ct._data(this);
                if (n) a[n] && a[n].stop && i(a[n]);
                else for (n in a) a[n] && a[n].stop && rr.test(n) && i(a[n]);
                for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1));
                (t || !r) && ct.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"), this.each(function() {
                var t, n = ct._data(this),
                    r = n[e + "queue"],
                    i = n[e + "queueHooks"],
                    o = ct.timers,
                    a = r ? r.length : 0;
                for (n.finish = !0, ct.queue(this, e, []), i && i.stop && i.stop.call(this, !0), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; a > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }), ct.each({
        slideDown: z("show"),
        slideUp: z("hide"),
        slideToggle: z("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        ct.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), ct.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? ct.extend({}, e) : {
            complete: n || !n && t || ct.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !ct.isFunction(t) && t
        };
        return r.duration = ct.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in ct.fx.speeds ? ct.fx.speeds[r.duration] : ct.fx.speeds._default, (null == r.queue || r.queue === !0) && (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            ct.isFunction(r.old) && r.old.call(this), r.queue && ct.dequeue(this, r.queue)
        }, r
    }, ct.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, ct.timers = [], ct.fx = I.prototype.init, ct.fx.tick = function() {
        var e, n = ct.timers,
            r = 0;
        for (Zn = ct.now(); n.length > r; r++) e = n[r], e() || n[r] !== e || n.splice(r--, 1);
        n.length || ct.fx.stop(), Zn = t
    }, ct.fx.timer = function(e) {
        e() && ct.timers.push(e) && ct.fx.start()
    }, ct.fx.interval = 13, ct.fx.start = function() {
        er || (er = setInterval(ct.fx.tick, ct.fx.interval))
    }, ct.fx.stop = function() {
        clearInterval(er), er = null
    }, ct.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, ct.fx.step = {}, ct.expr && ct.expr.filters && (ct.expr.filters.animated = function(e) {
        return ct.grep(ct.timers, function(t) {
            return e === t.elem
        }).length
    }), ct.fn.offset = function(e) {
        if (arguments.length) return e === t ? this : this.each(function(t) {
            ct.offset.setOffset(this, e, t)
        });
        var n, r, i = {
            top: 0,
            left: 0
        }, o = this[0],
            a = o && o.ownerDocument;
        if (a) return n = a.documentElement, ct.contains(n, o) ? (typeof o.getBoundingClientRect !== Y && (i = o.getBoundingClientRect()), r = X(a), {
            top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : i
    }, ct.offset = {
        setOffset: function(e, t, n) {
            var r = ct.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i, o, a = ct(e),
                s = a.offset(),
                u = ct.css(e, "top"),
                l = ct.css(e, "left"),
                c = ("absolute" === r || "fixed" === r) && ct.inArray("auto", [u, l]) > -1,
                f = {}, p = {};
            c ? (p = a.position(), i = p.top, o = p.left) : (i = parseFloat(u) || 0, o = parseFloat(l) || 0), ct.isFunction(t) && (t = t.call(e, n, s)), null != t.top && (f.top = t.top - s.top + i), null != t.left && (f.left = t.left - s.left + o), "using" in t ? t.using.call(e, f) : a.css(f)
        }
    }, ct.fn.extend({
        position: function() {
            if (this[0]) {
                var e, t, n = {
                    top: 0,
                    left: 0
                }, r = this[0];
                return "fixed" === ct.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), ct.nodeName(e[0], "html") || (n = e.offset()), n.top += ct.css(e[0], "borderTopWidth", !0), n.left += ct.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - n.top - ct.css(r, "marginTop", !0),
                    left: t.left - n.left - ct.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Q; e && !ct.nodeName(e, "html") && "static" === ct.css(e, "position");) e = e.offsetParent;
                return e || Q
            })
        }
    }), ct.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(e, n) {
        var r = /Y/.test(n);
        ct.fn[e] = function(i) {
            return ct.access(this, function(e, i, o) {
                var a = X(e);
                return o === t ? a ? n in a ? a[n] : a.document.documentElement[i] : e[i] : (a ? a.scrollTo(r ? ct(a).scrollLeft() : o, r ? o : ct(a).scrollTop()) : e[i] = o, t)
            }, e, i, arguments.length, null)
        }
    }), ct.each({
        Height: "height",
        Width: "width"
    }, function(e, n) {
        ct.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        }, function(r, i) {
            ct.fn[i] = function(i, o) {
                var a = arguments.length && (r || "boolean" != typeof i),
                    s = r || (i === !0 || o === !0 ? "margin" : "border");
                return ct.access(this, function(n, r, i) {
                    var o;
                    return ct.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? ct.css(n, r, s) : ct.style(n, r, i, s)
                }, n, a ? i : t, a, null)
            }
        })
    }), ct.fn.size = function() {
        return this.length
    }, ct.fn.andSelf = ct.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ct : (e.jQuery = e.$ = ct, "function" == typeof define && define.amd && define("jquery", [], function() {
        return ct
    }))
})(window), window.DWait && DWait.run("jms/lib/jquery/jquery-stable.js");
DWait.ready(["jms/lib/jquery/jquery-stable.js"], function() {
    window.vms_feature && window.vms_feature("dre") ? (jQuery.migrateMute = !1, jQuery.migrateTrace = !0) : jQuery.migrateMute = !0, window.DWait && window.DWait.ready && window.DWait.run && (window.DWait.run(".jquery"), $(document).ready(function() {
        window.DWait.run(".domready"), window.DWait.ready(".allready", function() {
            window.DWait.run(".jqready")
        })
    })), window.DWait && DWait.run("jms/lib/jquery/jquery.current.js")
});
jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function(n, e, t, u, a) {
        return jQuery.easing[jQuery.easing.def](n, e, t, u, a)
    },
    easeInQuad: function(n, e, t, u, a) {
        return u * (e /= a) * e + t
    },
    easeOutQuad: function(n, e, t, u, a) {
        return -u * (e /= a) * (e - 2) + t
    },
    easeInOutQuad: function(n, e, t, u, a) {
        return 1 > (e /= a / 2) ? u / 2 * e * e + t : -u / 2 * (--e * (e - 2) - 1) + t
    },
    easeInCubic: function(n, e, t, u, a) {
        return u * (e /= a) * e * e + t
    },
    easeOutCubic: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e + 1) + t
    },
    easeInOutCubic: function(n, e, t, u, a) {
        return 1 > (e /= a / 2) ? u / 2 * e * e * e + t : u / 2 * ((e -= 2) * e * e + 2) + t
    },
    easeInQuart: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e + t
    },
    easeOutQuart: function(n, e, t, u, a) {
        return -u * ((e = e / a - 1) * e * e * e - 1) + t
    },
    easeInOutQuart: function(n, e, t, u, a) {
        return 1 > (e /= a / 2) ? u / 2 * e * e * e * e + t : -u / 2 * ((e -= 2) * e * e * e - 2) + t
    },
    easeInQuint: function(n, e, t, u, a) {
        return u * (e /= a) * e * e * e * e + t
    },
    easeOutQuint: function(n, e, t, u, a) {
        return u * ((e = e / a - 1) * e * e * e * e + 1) + t
    },
    easeInOutQuint: function(n, e, t, u, a) {
        return 1 > (e /= a / 2) ? u / 2 * e * e * e * e * e + t : u / 2 * ((e -= 2) * e * e * e * e + 2) + t
    },
    easeInSine: function(n, e, t, u, a) {
        return -u * Math.cos(e / a * (Math.PI / 2)) + u + t
    },
    easeOutSine: function(n, e, t, u, a) {
        return u * Math.sin(e / a * (Math.PI / 2)) + t
    },
    easeInOutSine: function(n, e, t, u, a) {
        return -u / 2 * (Math.cos(Math.PI * e / a) - 1) + t
    },
    easeInExpo: function(n, e, t, u, a) {
        return 0 == e ? t : u * Math.pow(2, 10 * (e / a - 1)) + t
    },
    easeOutExpo: function(n, e, t, u, a) {
        return e == a ? t + u : u * (-Math.pow(2, - 10 * e / a) + 1) + t
    },
    easeInOutExpo: function(n, e, t, u, a) {
        return 0 == e ? t : e == a ? t + u : 1 > (e /= a / 2) ? u / 2 * Math.pow(2, 10 * (e - 1)) + t : u / 2 * (-Math.pow(2, - 10 * --e) + 2) + t
    },
    easeInCirc: function(n, e, t, u, a) {
        return -u * (Math.sqrt(1 - (e /= a) * e) - 1) + t
    },
    easeOutCirc: function(n, e, t, u, a) {
        return u * Math.sqrt(1 - (e = e / a - 1) * e) + t
    },
    easeInOutCirc: function(n, e, t, u, a) {
        return 1 > (e /= a / 2) ? -u / 2 * (Math.sqrt(1 - e * e) - 1) + t : u / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + t
    },
    easeInElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), Math.abs(u) > s) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return -(s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - r) * 2 * Math.PI / i)) + t
    },
    easeOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (1 == (e /= a)) return t + u;
        if (i || (i = .3 * a), Math.abs(u) > s) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return s * Math.pow(2, - 10 * e) * Math.sin((e * a - r) * 2 * Math.PI / i) + u + t
    },
    easeInOutElastic: function(n, e, t, u, a) {
        var r = 1.70158,
            i = 0,
            s = u;
        if (0 == e) return t;
        if (2 == (e /= a / 2)) return t + u;
        if (i || (i = a * .3 * 1.5), Math.abs(u) > s) {
            s = u;
            var r = i / 4
        } else var r = i / (2 * Math.PI) * Math.asin(u / s);
        return 1 > e ? -.5 * s * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * a - r) * 2 * Math.PI / i) + t : .5 * s * Math.pow(2, - 10 * (e -= 1)) * Math.sin((e * a - r) * 2 * Math.PI / i) + u + t
    },
    easeInBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * (e /= a) * e * ((r + 1) * e - r) + t
    },
    easeOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), u * ((e = e / a - 1) * e * ((r + 1) * e + r) + 1) + t
    },
    easeInOutBack: function(n, e, t, u, a, r) {
        return void 0 == r && (r = 1.70158), 1 > (e /= a / 2) ? u / 2 * e * e * (((r *= 1.525) + 1) * e - r) + t : u / 2 * ((e -= 2) * e * (((r *= 1.525) + 1) * e + r) + 2) + t
    },
    easeInBounce: function(n, e, t, u, a) {
        return u - jQuery.easing.easeOutBounce(n, a - e, 0, u, a) + t
    },
    easeOutBounce: function(n, e, t, u, a) {
        return 1 / 2.75 > (e /= a) ? u * 7.5625 * e * e + t : 2 / 2.75 > e ? u * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t : 2.5 / 2.75 > e ? u * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t : u * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
    },
    easeInOutBounce: function(n, e, t, u, a) {
        return a / 2 > e ? .5 * jQuery.easing.easeInBounce(n, 2 * e, 0, u, a) + t : .5 * jQuery.easing.easeOutBounce(n, 2 * e - a, 0, u, a) + .5 * u + t
    }
}), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.easing.js");
(function(t) {
    function i(i, e) {
        var n, s = t.isFunction(i) ? i : t.noop;
        return s !== t.noop || "string" != typeof i || e || (e = i), t.isFunction(e) ? n = e : e && window[e] && (n = window[e]),
        function() {
            var i = this,
                o = GMIBase.getOne(i, n);
            return o ? (s && s.call(o, i), !o.gmi_lifecycle && (o.gmi_lifecycle = "constructed") && t(i).data("gmi_instance", o).bind("lifecycle", t.noop), o) : (r && console.log("[jQ-GMI] could not create gmi instance for node", i, "with class", e), void 0)
        }
    }
    function e(t, i, r, s) {
        if (s = s || "gmi-", "object" == typeof i) {
            for (var o in i) e(t, o, i[o], s);
            return t
        }
        return void 0 !== r ? (t.each(n, [i, r, s]), t) : n.call(t.get(0), i, r, s)
    }
    function n(i, e, n) {
        var r = t(this),
            s = n + i,
            o = void 0 !== e;
        if (o && r.attr(s, e), obj = r.data("gmi_instance")) {
            if (void 0 == i) return obj.gmi_args;
            o ? (obj.gmi_args[i] = e, this.dataset && this.dataset !== obj.gmi_args && (this.dataset[i] = e)) : e = obj.gmi_args[i]
        }
        return o ? e : e || r.attr(s)
    }
    var r = vms_feature("dre") && vms_feature("spamalot");
    window.$.fn.base = Base.extend({
        constructor: function(t, i, e) {
            this.gmi_node = t, this.gmi_args = i || {}, window.jQuery && (this.$ = jQuery(t)), jQuery.isFunction(e) ? this.inlineConstructor = e : jQuery.isObject(e) && jQuery.extend(this, e), this.gmiConstructor()
        },
        gmiConstructor: function() {
            this.inlineConstructor()
        },
        inlineConstructor: function() {},
        gmiDestructor: function() {},
        hooks: function() {}
    }), t.extend(t.fn, {
        gmi: function(t, e) {
            return this.map(i(t, e))
        },
        gmi1: function(e) {
            var n;
            return (n = this.get(0)) ? i(t.noop, e).call(n) : !1
        },
        gmiNodes: function(t, e) {
            return this.each(i(t, e))
        },
        gmiEach: function(e) {
            var n = t.expr[":"];
            return this.each(function() {
                if (n["gmi-active"](this) || n.gmi(this)) {
                    var t = i().call(this);
                    if (t) return e.call(t, this)
                }
            }), this
        },
        gmiWake: function() {
            return this.each(function() {
                t(this).closest(":gmi").gmi()
            }), this
        },
        gmiUp: function() {
            return this.closest(":gmi").gmi()
        },
        gmiClean: function(i) {
            return this.each(function() {
                1 === this.nodeType && (i && this.firstChild && t(this).find(":gmi-active").gmiClean(!1), t.cleanData(this), this.removeAttribute("gmindex"))
            }), this
        },
        gmiAttr: function(t, i, n) {
            return e(this, t, i, n)
        },
        gmiPurge: function() {
            var i = {
                "data-gmiclass": !0,
                name: !1,
                id: !1
            }, e = function(t, i) {
                if (i) {
                    var e = t.substr(5);
                    this.removeData(e), this.removeAttr(t)
                } else 0 === (this.attr(t) + "").indexOf("gmi-") && this.removeAttr(t)
            };
            this.gmiClean(), this.each(function() {
                t.each(i, t.proxy(e, t(this)))
            })
        }
    }), t.extend(t.expr[":"], {
        gmi: function(t, i, e) {
            var n = t.getAttribute("data-gmiclass");
            return n || (n = t.name || t.getAttribute("name") || t.id || !1, n = n && n.indexOf && 0 === n.indexOf("gmi-") ? n.substr(4) : !1), e && e[3] ? n == e[3] : !! n
        },
        "gmi-active": function(t) {
            return !!t.getAttribute("gmindex")
        }
    }), t.event.special.lifecycle = {
        setup: function() {
            return !1
        },
        teardown: function() {
            var i, e, n = t(this);
            if (i = n.data("gmi_instance")) {
                if (n.removeData("gmi_instance"), i.gmi_lifecycle in {
                    deleted: "",
                    destructing: ""
                }) return;
                i.gmi_lifecycle = "destructing", r && console.log("[jQ-GMI] tearing down instance", i), i.gmiDestructor ? i.gmiDestructor() : r && console.log("[jQ-GMI] no gmiDestructor in instance", i), this.dataset && this.dataset === i.gmi_args && delete this.dataset, i.gmi_node = i.gmi_args = i.$ = null, i.gmi_lifecycle = "deleted"
            }
            return (e = n.attr("gmindex")) && (n.removeAttr("gmindex"), delete GMIBase.index[e]), !1
        }
    }, DWait.init("gmi_wake", function(i) {
        t(i).gmiWake()
    })
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.gmi.js");
DWait.ready(["jms/lib/jquery/jquery.current.js"], function() {
    (function(e) {
        e.fn.someData = function(a) {
            return e.isArray(a) || e.isPlainObject(a) || (a = Array.prototype.slice.call(arguments)), e.someData(this[0], a)
        }, e.someData = function(a, i) {
            var r, t, n, u = e(a),
                l = {}, s = [];
            if (e.isArray(i)) s = i;
            else {
                if (!e.isPlainObject(i)) throw "Invalid list argument provided";
                for (r in i) s.push(r);
                l = e.extend(!0, {}, i)
            }
            if (u.length) for (t = 0, n = s.length; n > t; t++) r = s[t], value = u.data(r), void 0 !== value && null !== value && (l[r] = value);
            return l
        }
    })(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.somedata.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js"], function() {
    (function(t) {
        var a = "dummy",
            e = a.length,
            r = {
                text: "data-" + a + "-text",
                attr: "data-" + a + "-attr",
                html: "data-" + a + "-html",
                prepend: "data-" + a + "-prepend",
                append: "data-" + a + "-append",
                remove: "data-" + a + "-remove",
                addClass: "data-" + a + "-add-class",
                removeClass: "data-" + a + "-remove-class",
                toggleClass: "data-" + a + "-toggle-class",
                clone: "data-" + a + "-clone",
                plural: "data-" + a + "-plural"
            }, d = [a + "-clone"],
            l = function(r) {
                var l, s = r.data(),
                    i = {};
                for (l in s) 0 === l.indexOf(a) && -1 === t.inArray(l, d) && (i[l.charAt(e).toLowerCase() + l.substr(e + 1)] = s[l]);
                return i
            };
        t.extend(t.expr[":"], {
            dummy: function(t, a, e) {
                if (e && e[3]) return r[e[3]] ? !! t.getAttribute(r[e[3]]) : !1;
                for (var d in r) if (t.getAttribute(r[d])) return !0;
                return !1
            }
        }), t.fn.dummy = function(e) {
            var r = this;
            r.data(a + "-clone") && (r = this.clone(), r.attr("id") && r.attr("id", ""), r.is(":gmi") && r.gmiPurge(), r.insertAfter(this));
            var d = r.find(":dummy").addBack(":dummy");
            d.each(function() {
                var a, r, d, s, i = t(this),
                    n = l(i);
                ddt.trace("Dummy", "updating node", this, n);
                for (var u in n) switch (r = n[u], u) {
                    case "plural":
                        a = r.split(":"), r = a[0], e[r] !== void 0 && (d = parseInt(e[r], 10), a = a[1].split(","), 2 > a.length && a.push(a[0] + ("sh" === a[0].substr(-2) ? "es" : "s")), s = 1 !== d ? 1 : 0, i.text(a[s]), ddt.log("Dummy", "> called", u, [r, d], "with", a[s]));
                        break;
                    case "attr":
                        a = r.split(",");
                        for (r in a) r = a[r].split(":"), i[u](r[0], e[r[1]]), ddt.log("Dummy", "> called", u, "with", r[0], "=", e[r[1]]);
                        break;
                    case "remove":
                        s = "!" === r.charAt(0), d = Boolean(e[r.substr(s ? 1 : 0)]), s && (d = !d), d && (i.remove(), ddt.log("Dummy", "> called", u, "with", d, s));
                        break;
                    case "addClass":
                    case "removeClass":
                    case "toggleClass":
                        a = r.split(",");
                        for (r in a) r = a[r].split(":"), r[1] !== void 0 ? (s = "!" === r[1].charAt(0), d = Boolean(e[r[1].substr(s ? 1 : 0)]), s && (d = !d), "toggleClass" === u ? (i[u](r[0], d), ddt.log("Dummy", "> called", u, "with", r[0], d)) : d && (i[u](r[0]), ddt.log("Dummy", "> called", u, "with", r[0]))) : (i[u](r[0]), ddt.log("Dummy", "> called", u, "with", r[0]));
                        break;
                    default:
                        i[u](e[r]), ddt.log("Dummy", "> called", u, r, "with", e[r])
                }
            })
        }
    })(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.dummy.js")
});
! function(t, e, i) {
    function o(t, i) {
        var o, r = e.createElement(t || "div");
        for (o in i) r[o] = i[o];
        return r
    }
    function r(t) {
        for (var e = 1, i = arguments.length; i > e; e++) t.appendChild(arguments[e]);
        return t
    }
    function n(t, e, i, o) {
        var r = ["opacity", e, ~~ (100 * t), i, o].join("-"),
            n = .01 + 100 * (i / o),
            a = Math.max(1 - (1 - t) / e * (100 - n), t),
            s = p.substring(0, p.indexOf("Animation")).toLowerCase(),
            l = s && "-" + s + "-" || "";
        return c[r] || (d.insertRule("@" + l + "keyframes " + r + "{" + "0%{opacity:" + a + "}" + n + "%{opacity:" + t + "}" + (n + .01) + "%{opacity:1}" + (n + e) % 100 + "%{opacity:" + t + "}" + "100%{opacity:" + a + "}" + "}", d.cssRules.length), c[r] = 1), r
    }
    function a(t, e) {
        var o, r, n = t.style;
        if (n[e] !== i) return e;
        for (e = e.charAt(0).toUpperCase() + e.slice(1), r = 0; u.length > r; r++) if (o = u[r] + e, n[o] !== i) return o
    }
    function s(t, e) {
        for (var i in e) t.style[a(t, i) || i] = e[i];
        return t
    }
    function l(t) {
        for (var e = 1; arguments.length > e; e++) {
            var o = arguments[e];
            for (var r in o) t[r] === i && (t[r] = o[r])
        }
        return t
    }
    function f(t) {
        for (var e = {
            x: t.offsetLeft,
            y: t.offsetTop
        }; t = t.offsetParent;) e.x += t.offsetLeft, e.y += t.offsetTop;
        return e
    }
    var p, u = ["webkit", "Moz", "ms", "O"],
        c = {}, d = function() {
            var t = o("style", {
                type: "text/css"
            });
            return r(e.getElementsByTagName("head")[0], t), t.sheet || t.styleSheet
        }(),
        h = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "auto",
            left: "auto"
        }, m = function m(t) {
            return this.spin ? (this.opts = l(t || {}, m.defaults, h), i) : new m(t)
        };
    m.defaults = {}, l(m.prototype, {
        spin: function(t) {
            this.stop();
            var e, i, r = this,
                n = r.opts,
                a = r.el = s(o(0, {
                    className: n.className
                }), {
                    position: "relative",
                    width: 0,
                    zIndex: n.zIndex
                }),
                l = n.radius + n.length + n.width;
            if (t && (t.insertBefore(a, t.firstChild || null), i = f(t), e = f(a), s(a, {
                left: ("auto" == n.left ? i.x - e.x + (t.offsetWidth >> 1) : parseInt(n.left, 10) + l) + "px",
                top: ("auto" == n.top ? i.y - e.y + (t.offsetHeight >> 1) : parseInt(n.top, 10) + l) + "px"
            })), a.setAttribute("aria-role", "progressbar"), r.lines(a, r.opts), !p) {
                var u = 0,
                    c = n.fps,
                    d = c / n.speed,
                    h = (1 - n.opacity) / (d * n.trail / 100),
                    m = d / n.lines;
                (function y() {
                    u++;
                    for (var t = n.lines; t; t--) {
                        var e = Math.max(1 - (u + t * m) % d * h, n.opacity);
                        r.opacity(a, n.lines - t, e, n)
                    }
                    r.timeout = r.el && setTimeout(y, ~~ (1e3 / c))
                })()
            }
            return r
        },
        stop: function() {
            var t = this.el;
            return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = i), this
        },
        lines: function(t, e) {
            function i(t, i) {
                return s(o(), {
                    position: "absolute",
                    width: e.length + e.width + "px",
                    height: e.width + "px",
                    background: t,
                    boxShadow: i,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~ (360 / e.lines * l + e.rotate) + "deg) translate(" + e.radius + "px" + ",0)",
                    borderRadius: (e.corners * e.width >> 1) + "px"
                })
            }
            for (var a, l = 0; e.lines > l; l++) a = s(o(), {
                position: "absolute",
                top: 1 + ~ (e.width / 2) + "px",
                transform: e.hwaccel ? "translate3d(0,0,0)" : "",
                opacity: e.opacity,
                animation: p && n(e.opacity, e.trail, l, e.lines) + " " + 1 / e.speed + "s linear infinite"
            }), e.shadow && r(a, s(i("#000", "0 0 4px #000"), {
                top: "2px"
            })), r(t, r(a, i(e.color, "0 0 1px rgba(0,0,0,.1)")));
            return t
        },
        opacity: function(t, e, i) {
            t.childNodes.length > e && (t.childNodes[e].style.opacity = i)
        }
    }),
    function() {
        function t(t, e) {
            return o("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', e)
        }
        var e = s(o("group"), {
            behavior: "url(#default#VML)"
        });
        !a(e, "transform") && e.adj ? (d.addRule(".spin-vml", "behavior:url(#default#VML)"), m.prototype.lines = function(e, i) {
            function o() {
                return s(t("group", {
                    coordsize: f + " " + f,
                    coordorigin: -l + " " + -l
                }), {
                    width: f,
                    height: f
                })
            }
            function n(e, n, a) {
                r(u, r(s(o(), {
                    rotation: 360 / i.lines * e + "deg",
                    left: ~~n
                }), r(s(t("roundrect", {
                    arcsize: i.corners
                }), {
                    width: l,
                    height: i.width,
                    left: i.radius,
                    top: -i.width >> 1,
                    filter: a
                }), t("fill", {
                    color: i.color,
                    opacity: i.opacity
                }), t("stroke", {
                    opacity: 0
                }))))
            }
            var a, l = i.length + i.width,
                f = 2 * l,
                p = 2 * -(i.width + i.length) + "px",
                u = s(o(), {
                    position: "absolute",
                    top: p,
                    left: p
                });
            if (i.shadow) for (a = 1; i.lines >= a; a++) n(a, - 2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (a = 1; i.lines >= a; a++) n(a);
            return r(e, u)
        }, m.prototype.opacity = function(t, e, i, o) {
            var r = t.firstChild;
            o = o.shadow && o.lines || 0, r && r.childNodes.length > e + o && (r = r.childNodes[e + o], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = i))
        }) : p = a(e, "animation")
    }(), "function" == typeof define && define.amd ? define(function() {
        return m
    }) : t.Spinner = m
}(window, document), window.DWait && DWait.run("jms/thirdparty/lib/spin.js");
(function() {
    var e = function(e, t, a) {
        e.addEventListener ? e.addEventListener(t, a, !1) : e.attachEvent && e.attachEvent("on" + t, a)
    }, t = function(e, t, a) {
        e.removeEventListener ? e.removeEventListener(t, a, !1) : e.detachEvent && e.detachEvent("on" + t, a)
    };
    window.DWait && (DWait.download = function(a, n, r) {
        var d, o, i, s, l, c, u, m = document.getElementsByTagName("head")[0],
            h = document.getElementsByTagName("html")[0];
        for (a instanceof Array || (a = [a]), c = function(e, a, n) {
            if (!e.readyState || "complete" == e.readyState || "loaded" == e.readyState || "IMG" == e.tagName) {
                if (e.dwait_callback_done) return;
                e.dwait_callback_done = !0, "string" == typeof a && (a = Function(a)), a(!0, e, e.getAttribute("src")), n && (t(n, "error", arguments.callee), n.parentNode.removeChild(n)), t(e, "load", arguments.callee), t(e, "readystatechange", arguments.callee), DWait.downloads[e.getAttribute("src")] = "completed"
            }
        }, d = 0; d != a.length; d++) if (DWait.downloads[a[d]]) i = 1;
        else switch (DWait.downloads[a[d]] = !0, "string" == typeof r ? r : a[d].replace(/\?.*$/, "").split(".").pop().toLowerCase()) {
            case "js":
                o = document.createElement("script"), o.setAttribute("type", "text/javascript"), o.setAttribute("src", a[d]), n && (l = a[d], s = bind(this, c, o, n, !1), n = null, e(o, "load", s), e(o, "readystatechange", s)), m.appendChild(o);
                break;
            case "css":
                o = document.createElement("link"), o.setAttribute("type", "text/css"), o.setAttribute("rel", "stylesheet"), o.setAttribute("href", a[d]), n && (l = a[d], u = document.createElement("img"), u.src = l, s = bind(this, c, o, n, u), e(o, "load", s), e(o, "readystatechange", s), e(u, "error", s), h.appendChild(u), n = null), m.appendChild(o);
                break;
            default:
                throw Error('DWait cannot download "' + a[d] + '"')
        }
        i && n && setTimeout(n, 1)
    }), window.DWait && (DWait.downloads = {})
})(), window.DWait && DWait.run("jms/dwait/download.js");
$(function() {
    function t(t) {
        var o = ["deviantart.com", "dreamup.com", "codeplz.com", "sta.sh"],
            e = t.split("/")[2];
        return e ? RegExp("\\.(" + o.join("|").split(".").join("\\.") + ")$").test("." + e) : !0
    }
    window.self != window.top && "https:" == window.location.protocol && document.referrer && !t(document.referrer) && ($("body").empty(), $("<a>Go to deviantART.com</a>").attr({
        href: window.location.href,
        target: "_top"
    }).css({
        display: "block",
        position: "fixed",
        overflow: "hidden",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        "z-index": 9999,
        background: "#D6E1D1 url(https://s.deviantart.com/minish/main/errors/logo.png) no-repeat",
        "text-decoration": "underline",
        padding: "40px 10px 10px 10px",
        color: "#0084B0",
        "font-size": "11px"
    }).appendTo("body"))
});
var core_get = $.getScript;
$.getScript = function(t) {
    return /\.cm/i.test(unescape(t)) ? void 0 : core_get.apply(this, arguments)
}, window.DWait && DWait.run("jms/lib/clickjacking_blocker.js");
DWait.ready(["cssms/lib/modals.css", "jms/lib/jquery/jquery.current.js", "jms/lib/browser.js", "jms/lib/events.js", "jms/lib/station.js", "jms/lib/pubsub.js"], function() {
    window.Modals = {
        $space: null,
        $fade: null,
        ready: !1,
        adopted_holder: !1,
        stack: [],
        init: function(e) {
            this.$space && this.$space.length ? this.$space.addClass(e).data("modal-class", e) : (this.$space = $("#modalspace"), this.$space.length ? this.adopted_holder = !0 : (this.$space = $('<div id="modalspace"></div>').appendTo(document.body), e && this.$space.addClass(e)), this.ready = !0), this.$fade || (this.$fade = $("#modalfade")), this.$fade.length || (this.$fade = $('<div id="modalfade"></div>').appendTo(document.body))
        },
        topModal: function() {
            return Modals.stack.length ? Modals.stack[Modals.stack.length - 1][0] : null
        },
        push: function(e, a, o, s, t) {
            var n = Modals.topModal();
            if (!window.Popup2 || (Popup2.hideAll(), !Popup2.anyActivePopup() || e && e.is_modal_instance && e.options.ignoreinvincible)) {
                Modals.init(t);
                var d;
                if (d = e.is_modal_instance ? e : Modals.factory(e, {
                    modalDOM: function() {
                        var e = $("<div>").addClass("loading modal").addClass(o);
                        return $('<a href="" />').addClass("x").on("click", function() {
                            return Modals.pop("cancel"), !1
                        }).appendTo(e), e
                    }
                }), d.modalspace_class = t, o && d.getjQNode().addClass(o), s || (n && (n.getDOM().style.zIndex = 199, n.removeShadow()), Modals.$space.show(), Modals.$fade.show()), Modals.stack.push([d, a]), this && this.no_form_hook || Events.hook(d.getDOM(), "submit", Modals.submit), !s) {
                    d.$content_node.css("display", "block");
                    var l = $("<div>").addClass("modal-wrapper").append(d.getDOM()),
                        i = $("<div>").addClass("modal-cel").append(l);
                    Modals.$space.append(i)
                }
                if (d.addShadow(), $("body").off("keyup.modals").on("keyup.modals", Modals.escape), PubSub.publish("PreviewStream.keyboard_stop"), PubSub.subscribe({
                    eventname: "Duperbrowse.closed",
                    subscriber: this,
                    callback: Modals.pop
                }), this && this.no_form_hook || Events.hook(d.getDOM(), "click", Modals.click), 1 == Modals.stack.length) {
                    window.Popup2 && Popup2.hideOverlayElements(d.options.modalDOM({}));
                    var c = "modal-active";
                    c += Modals.$space.hasClass("absolute") ? " modal-is-absolute" : " modal-is-relative", $(document.body).addClass(c), Browser.isIE && (document.body.runtimeStyle.backgroundImage = "url(//st.deviantart.com/minish/main/blank.gif)", document.body.runtimeStyle.backgroundAttachment = "fixed")
                }
                return d.getDOM()
            }
        },
        pop: function(e) {
            if (Modals.stack.length) {
                var a = Modals.stack[Modals.stack.length - 1],
                    o = a[0].getDOM();
                if (a) {
                    if ("function" == typeof a[1]) {
                        var s = "FORM" == o.tagName ? o : $("form", o)[0];
                        if (0 == a[1].call(o, e, s ? Modals.serializeForm(s) : null)) return !1
                    }
                    o.onsubmit && o.onsubmit.calls && (Events.unhook(n, "submit", Modals.submit), Events.unhook(n, "click", Modals.click)), $("body").off("keyup.modals"), PubSub.publish("PreviewStream.keyboard_start"), o.parentNode && $(o).parents(".modal-cel").detach()
                }
                if (Modals.stack.pop(), 0 == Modals.stack.length) window.Popup2 && Popup2.showOverlayElements(), Modals.$space.css("display", "none"), Modals.$fade.css("display", "none"), $(document.body).removeClass("modal-active modal-is-absolute modal-is-relative"), PubSub.unsubscribe({
                    eventname: "Duperbrowse.closed",
                    subscriber: this
                }), Modals.adopted_holder ? (Modals.$space.remove(), Modals.$space = null, Modals.ready = !1) : a && a[0] && a[0].modalspace_class && Modals.$space.removeClass(a[0].classname);
                else {
                    var t = Modals.topModal();
                    t.getDOM().style.zIndex = 201, t.addShadow()
                }
            }
        },
        close: function(e, a) {
            if (0 != Modals.stack.length) for (var o = Modals.stack.length - 1; o >= 0; o--) if (Modals.stack[o][0] == e || Modals.stack[o][0].getDOM() == e) {
                var s = Modals.stack[o];
                Modals.stack.splice(o, 1), Modals.stack.push(s), Modals.pop(a);
                break
            }
        },
        escape: function(e) {
            if (27 == e.keyCode) if (window.Popup2 && Popup2.anyActivePopup()) Popup2.hideAll();
            else {
                var a = Modals.stack[Modals.stack.length - 1];
                if (a && a[0].options.disableEscape) return;
                Modals.pop("cancel")
            }
        },
        click: function(e) {
            var a = void 0,
                o = e.srcElement || e.target;
            return ("INPUT" == o.tagName || (o = $(o).closest("button")[0])) && "submit" == o.type && (a = $(o).closest("form")[0]) && $(o).closest("div.modal")[0] == Modals.topModal().getDOM() ? (("cancel" == o.name || (window.validateForm ? validateForm(a, !0) : !0)) && Modals.pop(o.name), window.event && (event.cancelBubble = !0), !1) : void 0
        },
        submit: function() {
            return window.event && (event.cancelBubble = !0), !1
        },
        serializeForm: function(e) {
            for (var a = {}, o = Modals.getFormControls(e), s = o.length, t = 0; s > t; t++) {
                var n = o[t];
                if (n.name) if ("radio" == n.type) n.checked && (a[n.name] = n.value);
                else if ("checkbox" == n.type) if (n.checked && n.name.indexOf("[]") > 0) {
                    var d = n.name.split("[]")[0];
                    a[d] || (a[d] = []), a[d].push(n.value)
                } else a[n.name] = n.checked;
                else a[n.name] = n.value
            }
            return a
        },
        getFormControls: function(e, a) {
            var o = [];
            return $(e).find("input, select, textarea").each(function(e, s) {
                a && $(s).attr("name") !== a || o.push(s)
            }), o
        },
        updateSize: function(e, a) {
            if (Modals.stack.length) {
                var o = Modals.topModal();
                e && o.$node.width(e), a && o.$node.height(a), $(window).trigger("modal_resize", [o.getDOM(), o.getjQNode().width(), o.getjQNode().height()])
            }
        },
        getTopModalSize: function() {
            var e = Modals.topModal();
            if (Modals.stack.length) return {
                w: e.getjQNode().width(),
                h: e.getjQNode().height()
            }
        },
        factory: function(e, a) {
            return new window.ModalInstance(e, a)
        },
        adopt: function(e) {
            var a = Modals.factory($(e).find("*"));
            return a.$node = $(e), a
        }
    }, window.ModalInstance = Base.extend({
        is_modal_instance: !0,
        $content_node: null,
        $node: null,
        options: {},
        buttons: [],
        defaults: {
            showCloseButton: !0,
            showButtonsSeparator: !0,
            buttonContainerExtraClass: "",
            noShadows: !1,
            disableEscape: !1,
            modalDOM: function(e) {
                var a = "loading modal modal-rounded";
                e.extraClassy && (a += " " + e.extraClassy);
                var o = $("<div>").addClass(a);
                return e.showCloseButton && o.append($('<a href="" />').addClass("x").on("click", function() {
                    return Modals.pop("cancel"), !1
                })), o
            }
        },
        constructor: function(e, a) {
            this.$content_node = $(e), this.options = {}, this.options = $.extend(this.options, this.defaults, a || {}), this.buttons = []
        },
        getjQNode: function() {
            return this.$node || (this.$node = $(this.options.modalDOM(this.options)).append(this.$content_node).append(this.makeButtons())), this.$node
        },
        getDOM: function() {
            return Popup2.hideOverlayElements(this.getjQNode()), this.getjQNode().get(0)
        },
        addShadow: function() {
            this.options.noShadows || this.getjQNode().addClass("with-shadow")
        },
        removeShadow: function() {
            this.getjQNode().removeClass("with-shadow")
        },
        addButton: function(e, a, o) {
            var s;
            switch (typeof o) {
                case "function":
                    s = o;
                    break;
                default:
                    o = "cancel";
                case "string":
                    s = function(e) {
                        e.preventDefault(), Modals.pop(o)
                    }
            }
            this.buttons.push({
                button_text: e || "Cancel",
                classes: a || "smbutton-lightgreen",
                click_cb: s
            })
        },
        makeButtons: function() {
            if (!this.buttons.length) return null;
            var e = "modal-button-holder" + (this.options.showButtonsSeparator ? " modal-separated " : " ") + this.options.buttonContainerExtraClass,
                a = $("<div>").addClass(e);
            return $.each(this.buttons, function(e, o) {
                a.append($('<a class="smbutton smbutton-size-default smbutton-shadow"></a>').addClass(o.classes).html(o.button_text).on("click", o.click_cb))
            }), a
        }
    }), window.DWait && DWait.run("jms/legacy/modals.js")
});
(function() {
    var e = Base.extend({
        constructor: function() {
            this.subscriptions = {}, this.queued_payloads = {}
        },
        publish: function(e, n, s) {
            if (-1 === e.indexOf(".")) throw Error("PubSub has a naming convention you must follow: Package.event_name");
            if (this.subscriptions["*.*"] && "*.*" !== e && this.publish("*.*", {
                eventname: e,
                payload: n
            }), this.subscriptions[e]) {
                "*.*" === e || s || ddt.log("PubSub", "Event", e, n);
                var i = [];
                for (var t in this.subscriptions[e]) {
                    var r = this.subscriptions[e][t],
                        a = r.subscriber,
                        u = r.callback,
                        o = u.bindTo(a);
                    i.push({
                        callback: o,
                        eventname: e,
                        payload: n
                    })
                }
                for (var b in i) {
                    var c = i[b];
                    c.callback(c.eventname, c.payload)
                }
            } else this.queued_payloads[e] || (this.queued_payloads[e] = []), "*.*" === e || s || ddt.log("PubSub", "Queueing event", e, n), this.queued_payloads[e].push(n);
            return this._publish_to_parent(e, n, s), this
        },
        _publish_to_parent: function(e, n, s) {
            if (window.parent != window && window.parent.postMessage) {
                s = s || !1;
                var i = {
                    _type: "PubSubEvent",
                    eventname: e,
                    payload: this._stringifyMessage({
                        _fromWindow: window.name,
                        data: n
                    }),
                    quiet: s
                }, t = this._stringifyMessage(i);
                window.parent.postMessage(t, "*")
            }
        },
        subscribe: function(e) {
            if (arguments.length > 1) throw Error("PubSub subscribe called with multiple arguments, you probably meant to use an array");
            var n;
            if (e instanceof Array) {
                for (n in e) e.hasOwnProperty(n) && this.subscribe(e[n]);
                return this
            }
            if (!e.eventname) throw Error("Must specify an eventname");
            if (!e.subscriber) throw Error("Must specify a subscriber for " + e.eventname);
            if (!e.callback) throw Error("Must specify a callback for " + e.eventname);
            if (-1 === e.eventname.indexOf(".")) throw Error("PubSub has a naming convention you must follow: Package.event_name");
            this.subscriptions[e.eventname] || (this.subscriptions[e.eventname] = []);
            var s = !1;
            for (n in this.subscriptions[e.eventname]) if (this.subscriptions[e.eventname][n].subscriber == e.subscriber) {
                s = !0;
                break
            }
            if (!s) {
                var i = {
                    subscriber: e.subscriber,
                    callback: e.callback
                };
                if (this.subscriptions[e.eventname].push(i), this.queued_payloads[e.eventname]) {
                    if (!e.empty_queue_if_first_subscriber) for (var t in this.queued_payloads[e.eventname]) {
                        var r = this.queued_payloads[e.eventname][t];
                        ddt.log("PubSub", "Unqueueing event", e.eventname, r), this.publish(e.eventname, r)
                    }
                    delete this.queued_payloads[e.eventname]
                }
            }
            return this
        },
        unsubscribe: function(e) {
            var n;
            if (e instanceof Array) for (n in e) this.unsubscribe(e[n]);
            else {
                if (!e.eventname) throw Error("Must specify an eventname");
                if (!e.subscriber) throw Error("Must specify a subscriber");
                if (-1 === e.eventname.indexOf(".")) throw Error('PubSub has a naming convention you must follow: Package.event_name. "' + e.eventname + '" is not acceptable.');
                if (this.subscriptions[e.eventname]) {
                    var s = [];
                    for (var n in this.subscriptions[e.eventname]) {
                        var i = this.subscriptions[e.eventname][n];
                        i.subscriber != e.subscriber && s.push(i)
                    }
                    return delete this.subscriptions[e.eventname], s.length && (this.subscriptions[e.eventname] = s), this
                }
            }
        },
        _stringifyMessage: function(e) {
            var n = [];
            try {
                return JSON.stringify(e, function(e, s) {
                    if (s && (s.nodeType || s.window === s)) return "" + s;
                    if (s && "object" == typeof s && null !== s) {
                        if (-1 !== $.inArray(s, n)) return;
                        n.push(s)
                    }
                    return s
                })
            } catch (s) {
                return ddt.error("PubSub", "This payload can't be completely stringified", {
                    event: s,
                    obj: e
                }), ""
            }
        }
    });
    window.PubSub = new e, window.PubSub.classdef = e
})(), window.DWait && DWait.run("jms/lib/pubsub.js");
DWait.ready(["jms/lib/pubsub.js"], function() {
    (function() {
        var e = window.PubSub.classdef.extend({
            constructor: function() {
                this.base(), $(window).on("message", this.handlers.message_handler.bindTo(this))
            },
            handlers: {
                message_handler: function(e) {
                    try {
                        var t = JSON.parse(e.originalEvent.data);
                        t.payload && (t.payload = JSON.parse(t.payload))
                    } catch (a) {
                        return ddt.error("PubSubCrossFrame", "Invalid postMessage data received", e), void 0
                    }
                    t._type && "PubSubEvent" == t._type && this.publish(t.eventname, t.payload, t.quiet)
                }
            },
            publish: function(e, t, a) {
                "*.*" !== e && ddt.log("PubSubCrossFrame", "Event", e, "has bubbled up to window", window.name, t), this.base(e, t, a)
            }
        });
        jQuery.fn.toJSON = function() {
            return "[object jQuery]"
        }, jQuery.Event.prototype.toJSON = function() {
            var e = "altKey bubbles button cancelable clientX clientY ctrlKey detail eventPhase keyCode layerX layerY metaKey pageX pageY shiftKey timeStamp type which x y".split(" "),
                t = {};
            return $.each(e, function(e, a) {
                t[a] = this[a]
            }), JSON.stringify(t)
        }, window.PubSubCrossFrame = new e
    })(), window.DWait && DWait.run("jms/lib/pubsubcrossframe.js")
});
DWait.ready(["jms/lib/pubsub.js", ".domready"], function() {
    (function() {
        var s = Base.extend({
            $: void 0,
            $window: $(window),
            sessions: {},
            stats: {},
            frequency: 500,
            playback_frequency: 100,
            timer: void 0,
            playback: {},
            $playback_panel: void 0,
            selected_stat: void 0,
            handlers: {
                start_session: function(s, t) {
                    var e = $.now();
                    a.sessions[t.id] || (a.sessions[t.id] = {}), a.sessions[t.id][t.namespace] || (a.sessions[t.id][t.namespace] = {
                        start_ts: e,
                        last_ts: e,
                        mouse_ts: {},
                        visibility_context: t.visibility_context,
                        selectors: t.selectors
                    }), a.stats[t.id] || (a.stats[t.id] = {}), a.stats[t.id][t.namespace] || (a.stats[t.id][t.namespace] = {
                        total_time: 0,
                        stats: {}
                    });
                    for (var i in t.selectors) {
                        var n = t.selectors[i],
                            o = {
                                id: t.id,
                                namespace: t.namespace,
                                selector: n
                            };
                        a.$.on("click.whatchadoin focus.whatchadoin keydown.whatchadoin", n, a.handlers.click_or_focus.bindTo(o)), a.$.on("mouseenter.whatchadoin mouseleave.whatchadoin", n, a.handlers.mouse_move.bindTo(o))
                    }
                    setTimeout(a.handlers.is_in_view_timer, a.frequency)
                },
                stop_session: function(s, t) {
                    a.sessions[t.id] && a.sessions[t.id][t.namespace] && ($.each(a.sessions[t.id][t.namespace].selectors, function(s, t) {
                        a.$.off("click.whatchadoin focus.whatchadoin keydown.whatchadoin", t), a.$.off("mouseenter.whatchadoin mouseleave.whatchadoin", t)
                    }), delete a.sessions[t.id][t.namespace])
                },
                click_or_focus: function(s) {
                    var t = this.id,
                        e = this.namespace,
                        i = this.selector;
                    a.init_stats(t, e, i), "click" == s.type ? a.stats[t][e].stats[i].click += 1 : "focusin" == s.type ? a.stats[t][e].stats[i].focus += 1 : "keydown" == s.type && (a.stats[t][e].stats[i].keydown += 1)
                },
                mouse_move: function(s) {
                    var t = this.id,
                        e = this.namespace,
                        i = this.selector;
                    if (a.init_stats(t, e, i), "mouseenter" == s.type) a.sessions[t][e].mouse_ts[i] = $.now();
                    else {
                        if (!a.sessions[t][e].mouse_ts[i]) return;
                        var n = $.now() - a.sessions[t][e].mouse_ts[i];
                        a.stats[t][e].stats[i].mouseover += n, delete a.sessions[t][e].mouse_ts[i]
                    }
                },
                is_in_view_timer: function() {
                    var s = $.now();
                    $.each(a.sessions, function(s, t) {
                        $.each(t, function(t, e) {
                            if (!e.visibility_context || $(e.visibility_context).is(":visible")) {
                                var i = a.$window.scrollTop(),
                                    n = a.$window.scrollTop() + a.$window.height();
                                clipping_point_left = a.$window.scrollLeft(), clipping_point_right = a.$window.scrollLeft() + a.$window.width(), now = $.now(), delta = now - e.last_ts, a.stats[s] || a.handlers.start_session("", {
                                    id: s,
                                    namespace: t
                                }), a.stats[s][t].total_time += delta;
                                for (var o in e.selectors) {
                                    var c = e.selectors[o];
                                    a.init_stats(s, t, c), a.is_selector_in_view(c, i, n, clipping_point_left, clipping_point_right) && (a.stats[s][t].stats[c].visible += delta)
                                }
                                e.last_ts = now
                            }
                        })
                    }), setTimeout(a.handlers.is_in_view_timer, Math.max(0, a.frequency - $.now() + s))
                },
                save: function() {
                    var s = !1;
                    for (var t in a.stats) s = !0;
                    s && (DiFi.pushPost("Whatchadoin", "save_whatchadoin_data", [a.stats], $.noop), a.stats = {}, DiFi._async ? DiFi.timer(100) : DiFi.send())
                },
                playback: function(s, t) {
                    a.playback[t.namespace] || (a.playback[t.namespace] = {
                        visibility_context: t.visibility_context,
                        stats: {},
                        total_time: 0,
                        divs: {}
                    }), a.$playback_panel || (a.$playback_panel = $('<div class="whatchadoin-panel"><div class="whatchadoin-data"></div><br><select class="whatchadoin-dropdown"></select></div>').appendTo("body"), a.$playback_panel.find(".whatchadoin-dropdown").change(a.handlers.playback_dropdown)), DiFi.pushPost("Whatchadoin", "load_whatchadoin_data", [t.namespace], a.handlers.playback_data), DiFi.send()
                },
                playback_data: function(s, t) {
                    if (s) {
                        var e = t.request.args[0];
                        a.playback[e].stats = t.response.content.stats, a.playback[e].total_time = t.response.content.total_time, $.each(a.playback[e].stats, function(s, t) {
                            var i = $('<div class="whatchadoin-box"></div>').hide().appendTo("body"),
                                n = $(s),
                                o = {
                                    selector: s,
                                    namespace: e
                                }, c = a.$playback_panel.find(".whatchadoin-dropdown");
                            n.mouseenter(a.handlers.playback_box_enter.bindTo(o)).mouseleave(a.handlers.playback_box_leave.bindTo(o)), a.playback[e].divs[s] = i, $.each(t, function(s) {
                                0 == c.find("option[value=" + s + "]").length && $('<option value="' + s + '">' + s + "</option>").appendTo(c), a.selected_stat || (a.selected_stat = s)
                            })
                        }), a.handlers.playback_dropdown(), setTimeout(a.handlers.playback_timer, a.playback_frequency)
                    }
                },
                playback_timer: function() {
                    $.each(a.playback, function(s, a) {
                        var t = $(a.visibility_context).is(":visible");
                        $.each(a.divs, function(s, a) {
                            if (t) {
                                var e = $(s);
                                if (e.length && e.is(":visible")) {
                                    var i = e.offset();
                                    return a.css({
                                        top: i.top,
                                        left: i.left,
                                        width: e.outerWidth(),
                                        height: e.outerHeight()
                                    }).show(), void 0
                                }
                            }
                            a.hide()
                        })
                    }), setTimeout(a.handlers.playback_timer, a.playback_frequency)
                },
                playback_box_enter: function() {
                    var s = this.selector,
                        t = this.namespace,
                        e = s + " => ";
                    $.each(a.playback[t].stats[s], function(s, a) {
                        e += s + ": " + a + " "
                    }), a.$playback_panel.find(".whatchadoin-data").html(e)
                },
                playback_box_leave: function() {
                    var s = this.namespace;
                    a.$playback_panel.find(".whatchadoin-data").html(a.playback[s].visibility_context + " => " + a.playback[s].total_time)
                },
                playback_dropdown: function() {
                    a.selected_stat = $(".whatchadoin-dropdown option:selected").val(), $.each(a.playback, function(s, t) {
                        var e = 1e16,
                            i = 0;
                        $.each(t.stats, function(s, t) {
                            var n = t[a.selected_stat];
                            e > n && (e = n), n > i && (i = n)
                        }), $.each(t.stats, function(s, n) {
                            var o = n[a.selected_stat],
                                c = (o - e) / (i - e),
                                l = t.divs[s],
                                d = Math.round(255 * c);
                            l.css("background-color", "rgba(255, " + (255 - d) + ", 0, 0.33)")
                        })
                    })
                },
                show_stats: function() {
                    console.log(a.stats)
                }
            },
            constructor: function() {
                setTimeout(this.async_constructor, 0)
            },
            async_constructor: function() {
                a.$ = $("body"), PubSub.subscribe([{
                    eventname: "Whatchadoin.start_session",
                    subscriber: a,
                    callback: a.handlers.start_session
                }, {
                    eventname: "Whatchadoin.stop_session",
                    subscriber: a,
                    callback: a.handlers.stop_session
                }, {
                    eventname: "Whatchadoin.save",
                    subscriber: a,
                    callback: a.handlers.save
                }, {
                    eventname: "Whatchadoin.playback",
                    subscriber: a,
                    callback: a.handlers.playback
                }, {
                    eventname: "Whatchadoin.show_stats",
                    subscriber: a,
                    callback: a.handlers.show_stats
                }])
            },
            is_selector_in_view: function(s, t, e, i, n) {
                var o = a.$.find(s);
                if (!o || !o.length || o.is(":hidden")) return !1;
                var c = o.offset(),
                    l = c.top,
                    d = o.outerHeight(),
                    r = l + d,
                    h = c.left,
                    p = o.outerWidth(),
                    _ = c.left + p,
                    u = d - Math.max(0, t - l) - Math.max(0, r - e),
                    b = p - Math.max(0, i - h) - Math.max(0, _ - n),
                    v = b * u > d * p / 2;
                return v
            },
            init_stats: function(s, t, e) {
                a.stats[s] || a.handlers.start_session("", {
                    id: s,
                    namespace: t
                }), a.stats[s][t].stats[e] || (a.stats[s][t].stats[e] = {
                    visible: 0,
                    mouseover: 0,
                    click: 0,
                    focus: 0,
                    keydown: 0
                })
            }
        }),
            a = new s
    })(jQuery), window.DWait && DWait.run("jms/lib/whatchadoin.js")
});
DWait.ready(["jms/lib/pubsub.js"], function() {
    (function(t) {
        var a = Base.extend({
            _a_state_was_pushed: !1,
            _ignore_hashchange_to: null,
            _previous_location: null,
            _current_state_id: null,
            _state_history: [],
            handlers: {
                push: function(a, e) {
                    var i = "Location.push" === a;
                    i || (e = {
                        url: e,
                        replace: "Location.replace" === a
                    });
                    var s = t.extend({
                        state: null,
                        url: void 0,
                        replace: !1
                    }, e);
                    if (this._set_location(s.url, e.replace)) if (Glbl("Location.pushstate_enabled")) {
                        try {
                            e.replace ? (history.replaceState(s.state, "", Glbl("Location.path")), ddt.log("Location", "Replaced state", s)) : (history.pushState(s.state, "", Glbl("Location.path")), ddt.log("Location", "Pushed state", s))
                        } catch (o) {
                            ddt.warn("Location", "Failed to push/replace state", o, e)
                        }
                        this._a_state_was_pushed = !0
                    } else s.replace ? this._replace_current_state_in_history(s) : this._push_state_to_history(s), s.url = this._add_state_to_url(s.url, s.state), window.location.hash = this._ignore_hashchange_to = s.url
                },
                popstate: function(t) {
                    return this._a_state_was_pushed ? (this._set_to_current_browser_values() && PubSub.publish("Location.changed", {
                        origin: "popstate",
                        path: this._previous_location,
                        state: t.originalEvent.state
                    }), void 0) : (Glbl("Location.pushstate_enabled") && PubSub.publish("Location.changed_without_push", {
                        origin: "popstate",
                        path: this._previous_location,
                        state: t.originalEvent.state
                    }), void 0)
                },
                hashchange: function() {
                    var t = this._ignore_hashchange_to === window.location.hash;
                    this._ignore_hashchange_to = null, t || this._set_to_current_browser_values() && PubSub.publish("Location.changed", {
                        origin: "hashchange",
                        path: this._previous_location,
                        state: this._get_current_state_from_history()
                    })
                },
                redirect_to_canonical_url: function() {
                    ddt.log("Location", "Redirecting to canonical URL", Glbl("Location.path")), window.location = Glbl("Location.path")
                }
            },
            constructor: function() {
                this._set_to_current_browser_values(), PubSub.subscribe([{
                    eventname: "Location.set",
                    subscriber: this,
                    callback: this.handlers.push
                }, {
                    eventname: "Location.replace",
                    subscriber: this,
                    callback: this.handlers.push
                }, {
                    eventname: "Location.push",
                    subscriber: this,
                    callback: this.handlers.push
                }, {
                    eventname: "Location.redirect_to_canonical_url",
                    subscriber: this,
                    callback: this.handlers.redirect_to_canonical_url
                }]), t(window).bind("popstate", this.handlers.popstate.bindTo(this)).bind("hashchange", this.handlers.hashchange.bindTo(this));
                var a = window.location.pathname + window.location.search;
                a != Glbl("Location.path") && PubSub.publish("Location.changed", {
                    path: a,
                    origin: "constructor",
                    state: null
                })
            },
            _set_to_current_browser_values: function() {
                var a = t("<div>").text(window.location.hash).html().substr(1),
                    e = !1;
                if (0 == a.length) e = !1;
                else try {
                    e = t("#" + a).length > 0
                } catch (i) {
                    e = !1
                }
                if (a.length > 0 && !e) {
                    var s = a.match(/[?&]_sid=([abcdef0-9]+)/);
                    return s ? (this._current_state_id = s[1], a = a.replace(s[0], "")) : this._current_state_id = null, this._set_location(a)
                }
                var o = window.location.pathname + window.location.search,
                    n = this._set_location(o);
                return !n && e && PubSub.publish("Location.anchor_changed", {
                    origin: "anchorchange",
                    path: window.location.pathname + window.location.search,
                    state: null
                }), n
            },
            _set_location: function(t, a) {
                return Glbl("Location.path") != t ? (this._previous_location = Glbl("Location.path"), Glbl("Location.path", t), this._set_params(), !0) : a ? !0 : !1
            },
            _get_current_state_from_history: function() {
                if (!this._current_state_id) return null;
                for (var t = this._state_history.length - 1; t >= 0; t--) if (this._current_state_id === this._state_history[t].id) return this._state_history[t].state
            },
            _replace_current_state_in_history: function(t) {
                if (!this._current_state_id) return this._push_state_to_history(t);
                for (var a = this._state_history.length - 1; a >= 0; a--) if (this._current_state_id === this._state_history[a].id) {
                    this._state_history[a].state = t;
                    break
                }
            },
            _push_state_to_history: function(t) {
                if (Glbl("Location.pushstate_enabled")) throw "Location attempting to push hash state when pushState is enabled, wtf?";
                var a = this._state_history[this._state_history.length - 1] || {};
                if (this._current_state_id && this._current_state_id !== a.id) for (var e = this._state_history.length - 1; e >= 0; e--) if (this._current_state_id === this._state_history[e].id) {
                    this._state_history = this._state_history.slice(0, e + 1);
                    break
                }
                t.id = this._current_state_id = Math.floor(2147483646 * Math.random()).toString(16), this._state_history.push(t)
            },
            _set_params: function() {
                var a = /\?(.*)/,
                    e = {}, i = Glbl("Location.path"),
                    s = function(t) {
                        var a;
                        t = t || "";
                        try {
                            a = decodeURIComponent(t.split("+").join(" "))
                        } catch (e) {
                            a = decodeURIComponent(escape(t.split("+").join(" ")))
                        }
                        return a
                    };
                a.test(i) && t.each(a.exec(i)[1].split("&"), function(t, a) {
                    var i = a.split("=");
                    try {
                        e[s(i[0])] = s(i[1])
                    } catch (o) {
                        ddt.warn("Location", "Failed to parse URI component", i, o)
                    }
                }), Glbl("Location.get_params", e)
            },
            _add_state_to_url: function(t, a) {
                return t = (t || "").replace(/[&?]_sid=[^&]*/, ""), null !== a && (t += (-1 === t.indexOf("?") ? "?" : "&") + "_sid=" + encodeURIComponent(this._current_state_id)), t
            }
        });
        Glbl("Location.pushstate_enabled", !vms_feature("no_pushstate") && void 0 !== window.history && void 0 !== window.history.pushState), new a
    })(jQuery), window.DWait && DWait.run("jms/lib/location.js")
});
window.popup || (window.popup = function(e, n, t, o, i, w) {
    var e = e || "",
        t = t || 500,
        n = n || "DA",
        o = o || 600,
        a = (screen.width - t) / 2,
        p = (screen.height - o) / 2.1,
        r = window.open(e, n, "left = " + a + ", top = " + p + ", toolbar = 0, scrollbars = 1, location = 0, status = " + (w ? 1 : 0) + ", statusmenubar = 0, resizable = 1, width=" + t + ", height=" + o);
    return window.event && (event.cancelBubble = !0), i ? r : !1
}), window.DWait && DWait.run("jms/lib/popupwindow.js");
DWait.ready(["jms/lib/glbl.js"], function() {
    (function() {
        var t = window.self.location.hostname,
            i = window.self.location.pathname;
        Glbl("Site.is_deviantart", /\bdeviantart.com$/.test(t)), Glbl("Site.is_stash", /\bsta.sh$/.test(t) && !/^\/writer\//.test(i)), Glbl("Site.is_stash_writer", /\bsta.sh$/.test(t) && /^\/writer\//.test(i)), Glbl("Site.is_dreamup", /\bdreamup.com$/.test(t))
    })(), window.DWait && DWait.run("jms/lib/site.js")
});
GUID = {
    latest: 1e4,
    get: function() {
        return GUID.latest++
    }
}, window.DWait && DWait.run("jms/lib/guid.js");
DWait.ready(["jms/lib/difi.js"], function() {
    (function() {
        function e(e) {
            var n = e.toLowerCase();
            return -1 != n.indexOf("deviantart.com") || -1 != n.indexOf("deviantart.net") || -1 != n.indexOf("sta.sh") || -1 != n.indexOf("dreamup.com")
        }
        function n(e) {
            var n;
            return (n = e.match(/'(.*)' is undefined/i)) ? n[1] + " is undefined" : (n = e.match(/Uncaught ReferenceError: (.*) is not defined/i)) ? n[1] + " is undefined" : (n = e.match(/ReferenceError: (.*) is not defined/i)) ? n[1] + " is undefined" : (n = e.match(/ReferenceError: Can't find variable: (.*)/i)) ? n[1] + " is undefined" : (n = e.match(/Uncaught exception: ReferenceError: Undefined variable: (.*)/i)) ? n[1] + " is undefined" : (n = e.match(/(.*) is not defined/i), n ? n[1] + " is undefined" : e)
        }
        var i = window.onerror,
            d = 0,
            a = +new Date;
        window.onerror = function(r, t, o) {
            var w = window.navigator.userLanguage || window.navigator.language;
            if (0 == d && "en" == w.toLowerCase().slice(0, 2) && e(t) && window.deviantART && window.deviantART.deviant && window.deviantART.deviant.features && window.deviantART.deviant.username && window.deviantART.deviant.id && window.deviantART.deviant.symbol && ("$" == window.deviantART.deviant.symbol || "=" == window.deviantART.deviant.symbol || Glbl("Logr.force_js_report"))) {
                var s = {
                    url: window.top.location.href,
                    username: window.deviantART.deviant.username,
                    symbol: window.deviantART.deviant.symbol,
                    userid: window.deviantART.deviant.id,
                    features: window.deviantART.deviant.features,
                    useragent: navigator.userAgent,
                    script: t,
                    line: o,
                    time_to_error: (new Date - a) / 1e3
                }, v = ["JS error"];
                s.jquery_version = window.$ ? $().jquery : "unloaded", DiFi.pushPost("Logr", "logr", ["js", n(r), s, v], void 0), DiFi.send(), d++
            }
            return i ? i(r, t, o) : !1
        }
    })(), window.DWait && DWait.run("jms/lib/logr.js")
});
Events = {
    hook: function(n, t, e) {
        return $(n).bind(t, e)
    },
    unhook: function(n, t, e) {
        return $(n).unbind(t, e)
    },
    stop: function() {
        return window.event && (window.event.cancelBubble = !0), !1
    }
}, window.DWait && DWait.run("jms/lib/events.js");
var JSON;
JSON || (JSON = {}),
function() {
    "use strict";

    function f(t) {
        return 10 > t ? "0" + t : t
    }
    function quote(t) {
        return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
            var e = meta[t];
            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + t + '"'
    }
    function str(t, e) {
        var n, r, o, f, u, i = gap,
            a = e[t];
        switch (a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? a + "" : "null";
            case "boolean":
            case "null":
                return a + "";
            case "object":
                if (!a) return "null";
                if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                    for (f = a.length, n = 0; f > n; n += 1) u[n] = str(n, a) || "null";
                    return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]" : "[" + u.join(",") + "]", gap = i, o
                }
                if (rep && "object" == typeof rep) for (f = rep.length, n = 0; f > n; n += 1) "string" == typeof rep[n] && (r = rep[n], o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o));
                else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (o = str(r, a), o && u.push(quote(r) + (gap ? ": " : ":") + o));
                return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}" : "{" + u.join(",") + "}", gap = i, o
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
    "function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
        var r;
        if (gap = "", indent = "", "number" == typeof n) for (r = 0; n > r; r += 1) indent += " ";
        else "string" == typeof n && (indent = n);
        if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw Error("JSON.stringify");
        return str("", {
            "": t
        })
    }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
        function walk(t, e) {
            var n, r, o = t[e];
            if (o && "object" == typeof o) for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
            return reviver.call(t, e, o)
        }
        var j;
        if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
            return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
            "": j
        }, "") : j;
        throw new SyntaxError("JSON.parse")
    })
}(), window.DWait && DWait.run("jms/lib/json2.js");
PRIV_LOGGEDIN = -1, PRIV_VERIFIED = -100, DiFi = {
    _queue: [],
    _queuedType: "",
    _queuedPage: "",
    _queuedAd: [],
    first_page: !0,
    _async: !0,
    _lastresponse: !1,
    pushPublicStaticGet: function(e, i, r, t, a) {
        return DiFi.push("static", e, i, r, t, a)
    },
    pushPublicGet: function(e, i, r, t, a) {
        return DiFi.push("public", e, i, r, t, a)
    },
    pushPrivateGet: function(e, i, r, t, a) {
        return DiFi.push("private", e, i, r, t, a)
    },
    pushPost: function(e, i, r, t, a) {
        var s = DiFi.push("post", e, i, r, t, a);
        return window.PubSub && PubSub.publish("DiFi.pushPost", {
            api: e,
            method: i,
            args: r
        }), s
    },
    _timer: null,
    timer: function(e) {
        DiFi._timer && (clearTimeout(DiFi._timer), e *= .6), DiFi._timer = setTimeout("DiFi.send()", e)
    },
    _siCallbacks: {},
    _pageCallbacks: {},
    push: function(e, i, r, t, a, s) {
        switch (e) {
            case "static":
                DiFi._queuedType && "static" != DiFi._queuedType && DiFi.send(), DiFi._queuedType = "static";
                break;
            case "public":
                DiFi._queuedType || (DiFi._queuedType = "public");
                break;
            case "private":
                DiFi._queuedType in {
                    post: 0,
                    page: 0
                } || (DiFi._queuedType = "private");
                break;
            case "post":
                DiFi._queuedType = "post";
                break;
            default:
                ddt.warn("difi", "Unknown type", e)
        }
        vms_feature("difi_debugging") && console.log("^DiFi", e + " (" + DiFi._queuedType + ") / " + i + "." + r, t), DiFi._queue.push({
            "class": i,
            method: r,
            args: t,
            callback: a,
            callback_obj: s,
            original: arguments
        }), DiFi._queue.length > 80 && "post" != DiFi._queuedType && (DiFi._queuedType in {
            "static": 0,
            page: 0
        } ? DiFi.send() : DiFi._queuedType = "post")
    },
    cached: {},
    cache: function(e, i, r, t) {
        DiFi.cached[e + ";" + i + ";" + r.join(",")] = t
    },
    send: function() {
        var e, i, r, t, a, s, o, n, u, l, c, d, p, f, D, F;
        for (DiFi._timer && (clearTimeout(DiFi._timer), DiFi._timer = null), u = "", t = [], a = [], o = [], p = [], l = 0; r = DiFi._queue[l]; l++) r.args = DiFi._normalizeArgs(r.args), i = r["class"] + ";" + r.method, (e = DiFi.cached[i + ";" + r.args.join(",")]) ? (r.result = e, o.push(r)) : DiFi.overrides[i] && (e = DiFi.overrides[i](r["class"], r.method, r.args, r.callback, r.callback_obj)) ? (r.result = {
            request: {
                "class": r["class"],
                method: r.method,
                args: r.args
            },
            response: {
                status: "SUCCESS",
                content: e
            }
        }, o.push(r)) : (n = i, window.Profile && deviantART.debug && p.push({
            api: r["class"],
            request: r.method,
            request: r.args,
            dre_horizontal: !0
        }), a.push([r.callback, r.callback_obj]), n == u ? (s = JSON.stringify(r.args), t[t.length - 1] += "," + DiFi._urlescapeCall(s)) : (s = JSON.stringify(r["class"]) + "," + JSON.stringify(r.method) + "," + JSON.stringify(r.args), t.push(DiFi._urlescapeCall(s)), u = n));
        if (F = "ui=" + (("; " + document.cookie + ";").match("; userinfo=([^;]*)") || [])[1], t = ("post" == DiFi._queuedType ? F + "&" : "") + "c%5B%5D=" + t.join("&c%5B%5D="), f = DiFi._queuedType, D = DiFi._queuedPage, DiFi._queue.length = 0, DiFi._queuedType = "", DiFi._queuedPage = "", a.length) if (f in {
            "public": 0,
            "private": 0,
            post: 0
        }) t += "&t=json", window.Profile && deviantART.debug && Profile.add("DiFi", {
            id: "N/A" + Math.round(1e4 * Math.random()),
            uri: "/global/difi/",
            type: "post" == f ? "Post" : "Private Get",
            data: p
        }), DiFi._request("post" == f ? "POST" : "GET", t, a);
        else {
            if ("static" != f) throw Error("Cannot send as " + f);
            t += "&t=jsonp&callback=DiFi._callbackSI&extraarg=lookup", DiFi._siCallbacks[t] || (DiFi._siCallbacks[t] = []), DiFi._siCallbacks[t].push(a), e = document.createElement("script"), e.setAttribute("type", "text/javascript"), e.setAttribute("src", "http://backend.deviantart.com/global/difi/?" + t), document.getElementsByTagName("head")[0].appendChild(e), window.Profile && deviantART.debug && Profile.add("DiFi", {
                id: t,
                type: "DiFi Backend Request"
            })
        }
        for (l = 0; d = o[l]; l++) {
            var l;
            for ("function" == typeof d.callback && (d.callback = [d.callback], d.callback_obj = [d.callback_obj]), c = 0; d.callback && d.callback[c]; c++) d.callback[c].call(d.callback_obj[c], !0, d.result)
        }
    },
    _asciiSafe: function(e) {
        return (e || "").replace(/[\x00\cA-\cG\cK\cL\cN-\cZ]/g, "")
    },
    _normalizeArgs: function(e, i) {
        if ("array" == typeof e) for (var r = 0, t = e.length; t > r; r++) e[r] = DiFi._normalizeArgsImpl(e[r], i);
        else if ("object" == typeof e) for (var r in e) e === e[r] ? vms_feature("dre") && (console.log("^DiFi: Ignored attempt to normalize an object with circular references, key:", r), vms_feature("difi_debugging") && console.trace()) : e[r] = DiFi._normalizeArgsImpl(e[r], i);
        return e
    },
    _normalizeArgsImpl: function(e, i) {
        if ("number" != typeof i) var i = 0;
        switch (typeof e) {
            case "number":
                e += "";
                break;
            case "string":
                e = DiFi._asciiSafe(e);
                break;
            case "array":
            case "object":
                100 > i && (e = DiFi._normalizeArgs(e, i + 1))
        }
        return e
    },
    _urlescapeCall: function(e) {
        return encodeURIComponent(e)
    },
    _request: function(e, i, r) {
        var t, a = "",
            s = !0;
        for (var o in r) for (var n in r[o]) void 0 === r[o][n] || window.$ && window.$.noop && r[o][n] === window.$.noop || (s = !1);
        s && (i += "&ace=true"), !deviantART.debug || 0 != window.location.href.indexOf("file:") && 0 != location.href.indexOf("http://127.0.0.1/") || (Browser.isGecko && netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), a = "http://www.deviantart.com"), t = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Msxml2.XMLHTTP"), "POST" == e ? (t.open(e, a + "/global/difi/?", DiFi._async), t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")) : t.open(e, a + "/global/difi/?" + i, DiFi._async), window.Profile && deviantART.debug && Profile.add("DiFi", {
            id: "N/A" + Math.round(1e4 * Math.random()),
            type: "DiFi POST Request",
            src: unescape(i)
        }), Browser.isKHTML && (DiFi._safariTimer = setTimeout(function() {
            return t
        }, 1e5)), t.callbacks = r, DiFi._async && (t.onreadystatechange = function() {
            return DiFi._handleStateChange(this), !0
        }), t.send("POST" == e ? i : ""), DiFi._async || (vms_feature("difi_debugging") && console.log("DIFI IS SYNCHRONOUS", e, i), DiFi._handleStateChange(t))
    },
    _handleStateChange: function(e) {
        if (4 == e.readyState) {
            var i;
            if (200 == e.status && "" != e.responseText) {
                Browser.isGecko && window.deviantART && deviantART.debug && 0 == window.location.href.indexOf("file:") && netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                try {
                    i = JSON.parse(DiFi._asciiSafe(e.responseText))
                } catch (r) {
                    i = null, vms_feature("dre") && Browser.isIE && alert("IE DRE\n" + e.responseText)
                }
            } else i = null;
            window.Profile && deviantART.debug && Profile.add("DiFi", {
                id: "N/A" + Math.round(1e4 * Math.random()),
                type: "DiFi XMLHTTP Response",
                data: i || "ERROR: " + e.responseText
            }), DiFi._lastresponse = e.responseText, DiFi._handleCallbacks(e.callbacks, i), Browser.isKHTML && clearTimeout(DiFi._safariTimer)
        }
    },
    _callbackSI: function(e, i) {
        var r, t;
        if (window.Profile && deviantART.debug && Profile.add("DiFi", {
            id: i,
            type: "DiFi SI Response",
            data: e
        }), e && e.DiFi && "SUCCESS" == e.DiFi.status) for (r = 0; t = e.DiFi.response.calls[r]; r++) "SUCCESS" == t.response.status && DiFi.cache(t.request["class"], t.request.method, t.request.args, t);
        if (DiFi._siCallbacks[i]) for (; DiFi._siCallbacks[i].length > 0;) DiFi._handleCallbacks(DiFi._siCallbacks[i].shift(), e)
    },
    _handleCallbacks: function(e, i) {
        var r, t, a, s, o, n, u, l;
        for (s = i && i.DiFi && "SUCCESS" == i.DiFi.status, r = 0; t = e[r]; r++) if (t[0]) {
            if (s ? (a = i.DiFi.response.calls[r], window.DIFI_RECORD && "SUCCESS" == a.response.status && DiFi.cache(a.request["class"], a.request.method, a.request.args, a)) : i && i.DiFi && i.DiFi.response.details && i.DiFi.response.details.calls ? a = i.DiFi.response.details.calls[r] : (o = "No valid response received.", a = {
                request: void 0,
                response: {
                    status: "NOEXEC_HALT",
                    content: i && i.DiFi.response || {
                        error: o,
                        details: o,
                        human: o
                    }
                }
            }), t[0] instanceof Array || (t[0] = [t[0]], t[1] = [t[1]]), vms_feature("dre") && vms_feature("difi_debugging") && i && i.DiFi && i.DiFi.developer_info && i.DiFi.developer_info.profile_info && i.DiFi.developer_info.profile_info.dumpid) {
                var c = i.DiFi.developer_info.profile_info;
                console.log("http://www.deviantart.com/dre/share?dumpid=" + c.dumpid + "&token=" + c.dumptoken + " Browse in DRE")
            }
            if (a = a || {
                response: {}
            }, n = "SUCCESS" == (a.response || {}).status, l = 0, !n && a.request) for (u = 0; h = this.errorHooks[u]; u++) if (h(n, a, t)) {
                l = 1;
                break
            }
            if (!l) for (u = 0; u != t[0].length; u++) t[0][u] && (vms_feature("difi_debugging") && console.log("^DiFi callback", a.request && a.request.method ? a.request["class"] + "." + a.request.method : "UNKNOWN", n, a), t[0][u].call(t[1][u], n, a))
        }
    },
    errorHooks: [],
    overrides: {},
    override: function(e, i, r) {
        i = e + ";" + i, DiFi.overrides[i] = r
    },
    STR_ERR_BUFFER_PERIOD: 500,
    stdErr: function(e, i, r) {
        var t;
        DiFi.stderr_output || (DiFi.stderr_output = []), t = this.stdErrFormat(i), "No valid response received." == t ? console.log("DiFi error: backend probably became unaccessible or ran into fatals", t) : (DiFi.stderr_output.push((e || "") + (e && t ? " - " : "") + (t || "") || "Unknown Error"), setTimeout(DiFi.stdErrKaboom, r ? 1 : DiFi.STR_ERR_BUFFER_PERIOD))
    },
    stdErrFormat: function(e) {
        return "string" == typeof e ? e : e && e.error ? e.error.human || e.error.details || e.error : "Unknown Error"
    },
    stdErrKaboom: function() {
        var e;
        DiFi.stderr_output.length && (e = DiFi.stderr_output.length > 1 ? "Some errors have occurred:\n\n- " : "An error has occurred:\n\n", e += DiFi.stderr_output.join("\n- "), DiFi.stderr_output = [], alert(e))
    },
    stdErrCallback: function(e, i) {
        return e || DiFi.stdErr("", i.response.content), e
    }
}, window.DWait && DWait.run("jms/lib/difi.js");
DWait.ready(["cssms/lib/popup.css", "jms/lib/Base.js", "jms/lib/glbl.js", "jms/lib/browser.js", "jms/lib/jquery/jquery.current.js", ".domready"], function() {
    var e = window.Popup2 = Base.extend({
        default_options: {
            classes: "",
            content: "",
            removed: !1,
            switched: !1,
            created: !1,
            shown: !1,
            hidden: !1,
            destroy: !1,
            invincible: !1,
            append: !1,
            blur_invincible: !1,
            events: []
        },
        constructor: function(t, i, s) {
            this.name = t, this.parent = i, this.$parent = $(i), s = $.extend({}, this.default_options, s), this.events = s.events, s.classes && (this.classes = $.isFunction(s.classes) ? s.classes() : s.classes), this.destroy = s.destroy, this.invincible = s.invincible, this.blur_invincible = s.blur_invincible, this.append = s.append, this.content = s.content, this.created = s.created, this.shown = s.shown, this.hidden = s.hidden, this.switched_callback = s.switched, this.removed = s.removed, this.destroy && e.hideAll(), this.rendered = !1, e.popups[t] = this
        },
        visible: function() {
            return this.rendered ? this.$node.is(":visible") : !1
        },
        render: function() {
            var e;
            this.rendered || (this.$node = $("<div>", {
                "class": "popup2" + (this.classes ? " popup2-" + this.classes : "")
            }), e = $.isFunction(this.content) ? this.content() : this.content, "object" == $.type(e) ? this.$node.prepend($(e)) : this.$node.html(e), this.append ? $(this.$parent).append(this.$node) : $(this.$parent).prepend(this.$node), this.created && this.created.call(this, this), this.bindEvents(), this.rendered = !0)
        },
        bindEvents: function() {
            var e = function(e) {
                if ($(this).hasClass("disabled")) return !1;
                var t = e.data.cb.call(this, e);
                return "boolean" == $.type(t) && t === !1 ? t : (e.data.popup.hide(), t)
            };
            $.each(this.events, function(t, i) {
                i.selector || (i.selector = null), this.$node.on(i.event, i.selector, {
                    popup: this,
                    cb: i.callback
                }, e)
            }.bindTo(this))
        },
        default_position_options: {
            align: "left",
            valign: "bottom",
            keepOnScreen: !0,
            screenPadding: "5",
            absolute: !1,
            fixedElem: !1,
            bump: {
                top: 0,
                left: 0
            }
        },
        position: function(e, t) {
            this.render(), t = $.extend(!0, {}, this.default_position_options, t);
            var i, s = e.width(),
                n = e.height(),
                o = e.offset(),
                r = this.$node.width(),
                p = this.$node.height(),
                h = $(window),
                d = $(document),
                l = h.width(),
                c = d.height();
            if (t.absolute) return i = t.bump;
            switch (i = o, t.fixedElem && (i.top -= h.scrollTop(), i.left -= h.scrollLeft()), t.align) {
                case "center":
                    i.left += Math.round(s / 2), i.left -= Math.round(r / 2);
                    break;
                case "right":
                    i.left -= r, i.left += s
            }
            var a = !1;
            switch (t.valign) {
                case "top":
                    i.top -= p;
                    break;
                case "bottom":
                    i.top += n;
                    break;
                case "center":
                    i.top += Math.round(n / 2), i.top -= Math.round(p / 2), a = !0;
                    break;
                case "undertop":
                    a = !0
            }
            a && ("left" == t.align ? i.left -= r : "right" == t.align && (i.left += r)), i.top += t.bump.top, i.left += t.bump.left;
            var u = l,
                f = c;
            if (t.keepOnScreen) {
                var b = {};
                b.left = i.left + r, b.top = i.top + p, b.left >= u - t.screenPadding && (i.left = u - r - t.screenPadding), b.top >= f - t.screenPadding && (i.top = f - p - t.screenPadding), 0 >= i.top + t.screenPadding && (i.top = t.screenPadding), 0 >= i.left + t.screenPadding && (i.left = t.screenPadding)
            }
            return i.right = i.left + s, i.bottom = i.top + n, i.width = s, i.height = n, i
        },
        show: function(t) {
            return this.render(), this.shown && this.shown.call(this, this), this.$node.hide(), this.$node.css("top", t.top + "px").css("left", t.left + "px"), this.$node.show(), e.hideOverlayElements(this.$node), !0
        },
        hide: function() {
            return this.render(), this.destroy ? (this.destroy = !1, this.remove(), void 0) : (this.hidden && this.hidden.call(this, this), this.$node.hide(), e.showOverlayElements(), void 0)
        },
        remove: function() {
            this.hide(), this.removed && this.removed.call(this, this), this.$node.remove(), delete e.popups[this.name]
        },
        switched: function() {
            this.render(), this.switched_callback && this.switched_callback.call(this, this), this.$node.hide()
        },
        addHotKeys: function(e, t) {
            for (var i = 0; t.length > i; i++) {
                if (t[i].modifiers.length > 0) for (var s = 0; t[i].modifiers.length > s; s++) {
                    var n = t[i].modifiers[s];
                    switch (n) {
                        case "cmd":
                            t[i].key = Browser.isMac ? "&#8984;" + t[i].key : "Ctrl+" + t[i].key;
                            break;
                        case "shift":
                            t[i].key = Browser.isMac ? "&#8679;" + t[i].key : "Shift+" + t[i].key
                    }
                }
                var o = this.$node.find(e + t[i].rel);
                o.find(".hotkey").remove(), o.append('<span class="hotkey">' + t[i].key + "</span>")
            }
        }
    }, {
        hideOverlayElements: function(t) {
            if (t && t.length) {
                var i = $(e.overlayElements).not(".never-hide-me, .menucompatible").not(function() {
                    return $(this).closest(".popup2").length > 0
                }),
                    s = t.offset();
                s.right = s.left + t.width(), s.bottom = s.top + t.height();
                var n = function() {
                    var e = $(this).offset();
                    return e.right = e.left + $(this).width(), e.bottom = e.top + $(this).height(), e.right > s.left && s.right > e.left && e.bottom > s.top && s.bottom > e.top
                };
                i = i.filter(n), Glbl("Site.is_stash") && i.not(".objective embed, .objective object, #pdf-viewer object"), i.addClass("menucompatible")
            }
        },
        showOverlayElements: function() {
            var t = $(e.overlayElements).filter(":not(.never-hide-me), .menucompatible");
            t.removeClass("menucompatible")
        },
        overlayElements: "iframe, embed, object:not(.no-select), div.sitback_container, .popup-unfriendly, #flash_target_1" + (Browser.isIE ? ", #output select" : ""),
        popups: {},
        hideAll: function(t) {
            for (var i in e.popups) e.popups[i].invincible || t && e.popups[i].blur_invincible || !e.popups[i].visible() || e.popups[i].hide()
        },
        switchPopup: function(t, i) {
            for (var s in e.popups) s != t.name && e.popups[s].visible() && e.popups[s].switched();
            t.show(i)
        },
        anyActivePopup: function() {
            for (var t in e.popups) if (e.popups[t].visible()) return !0;
            return !1
        },
        activePopup: function() {
            for (var t in e.popups) if (e.popups[t].visible()) return t
        },
        getPopup: function(t) {
            return e.popups[t] ? e.popups[t] : !1
        },
        isVisible: function(t) {
            return e.getPopup(t) && e.getPopup(t).visible() ? !0 : !1
        },
        getActivePopup: function() {
            return e.getPopup(e.activePopup())
        },
        documentClick: function(t) {
            PubSub.publish("Popup2.document_clicked", t), e.anyActivePopup() && ($(t.target).closest("div.popup2").length || e.hideAll())
        }
    });
    $(document).bind("mousedown.popup2", e.documentClick), $(window).bind("resize.popup2", e.hideAll), vms_feature("dre") || Browser.isIE8 || $(window).bind("blur.popup2", function() {
        e.hideAll(!0)
    }), window.DWait && DWait.run("jms/lib/popup2.js")
});
Ruler = {
    document: {
        jq_node: function(e) {
            var o = $(e),
                t = o.offset(),
                r = {
                    x: t.left,
                    y: t.top,
                    w: o.width(),
                    h: o.height()
                };
            return r.x2 = r.x + r.w, r.y2 = r.y + r.h, r
        },
        node: function(e, o) {
            var t = e,
                r = {
                    x: 0,
                    y: 0
                };
            r.w = t.offsetWidth, r.h = t.offsetHeight;
            do r.x += t.offsetLeft, r.y += t.offsetTop;
            while (t = t.offsetParent);
            return r.x2 = r.x + r.w, r.y2 = r.y + r.h, o ? Ruler.scrollCompensate(e, r) : r
        },
        pointer: function(e, o) {
            var t = {
                x: e.clientX,
                y: e.clientY
            };
            return Browser.isIE ? (t.x += document.body.scrollLeft || document.documentElement.scrollLeft, t.y += document.body.scrollTop || document.documentElement.scrollTop) : (Browser.isOpera || Browser.isChrome || Browser.isSafari || !Browser.isKHTML) && (t.x += window.pageXOffset, t.y += window.pageYOffset), o && (t.x += o.x, t.y += o.y), Ruler.mouseCache = t, t
        }
    },
    screen: {
        rect: function() {
            return {
                x: Browser.isGecko || Browser.isOpera ? window.pageXOffset : document.body.scrollLeft || document.documentElement.scrollLeft,
                y: Browser.isGecko || Browser.isOpera ? window.pageYOffset : document.body.scrollTop || document.documentElement.scrollTop,
                w: window.innerWidth || document.documentElement.offsetWidth,
                h: window.innerHeight || document.documentElement.offsetHeight,
                x2: window.innerWidth || document.documentElement.offsetWidth,
                y2: window.innerHeight || document.documentElement.offsetHeight
            }
        },
        node: function(e, o, t) {
            var r, n;
            return r = Ruler.document.node(e, o), n = Browser.isGecko || Browser.isOpera ? window.pageYOffset : document.body.scrollTop || document.documentElement.scrollTop, r.y -= n, r.y2 -= n, t && (r.y -= t, r.y2 -= t), r
        },
        pointer: function(e, o) {
            var t = {
                x: e.clientX,
                y: e.clientY
            };
            return !Browser.isKHTML || Browser.isSafari || Browser.isChrome || (t.x -= window.pageXOffset, t.y -= window.pageYOffset), o && (t.x += o.x, t.y += o.y), t
        }
    },
    clickMod: function(e, o) {
        return e.x -= o.x, e.y -= o.y, e
    },
    hitTest: function(e, o, t) {
        var r;
        for (o instanceof Array || (o = [o]), i = 0; i != o.length; i++) if (r = o[i], t && t.y2_buffer && (r.y2 = r.y + r.h - t.y2_buffer), e.x > r.x + (t ? t.x : 0) && e.y > r.y + (t ? t.y : 0) && r.x2 + (t ? t.x : 0) > e.x && r.y2 + (t ? t.y : 0) > e.y) return i;
        return null
    },
    scrollCompensate: function(e, o) {
        var t, r, n;
        for (t = Browser.isGecko || Browser.isOpera, n = t ? window.pageYOffset : document.body.scrollTop || document.documentElement.scrollTop, r = t ? window.pageXOffset : document.body.scrollLeft || document.documentElement.scrollLeft;
        (e = e.parentNode) && e != document.body;) e.scrollTop && (o.y -= e.scrollTop, o.y2 -= e.scrollTop), e.scrollLeft && (o.x += e.scrollLeft, o.x2 -= e.scrollLeft), (window.getComputedStyle && "fixed" == getComputedStyle(e, "").getPropertyValue("position") || e.currentStyle && "fixed" == e.currentStyle.position || e.runtimeStyle && "fixed" == e.runtimeStyle.position) && (o.y -= n, o.y2 += n, o.x += r, o.x2 += r);
        return o
    }
}, Ruler.document.mouse = Ruler.document.pointer, Ruler.screen.mouse = Ruler.screen.pointer, window.DWait && DWait.run("jms/lib/ruler.js");
Station = {
    INTERVAL: 25,
    DRAW_EVERY_FRAME: !1,
    SPEED: 1,
    data: [],
    animations: [],
    passiveGet: function(t) {
        var o;
        for (o = 0; o != Station.data.length; o++) if (Station.data[o][0] == t) return Station.data[o];
        return null
    },
    addNode: function(t) {
        var o = [t, {}];
        return Station.data.push(o), o
    },
    activeGet: function(t) {
        return Station.passiveGet(t) || Station.addNode(t)
    },
    nullInterpolator: function(t) {
        return t
    },
    push: function(t, o) {
        var a, n, e, i, r, l, p;
        for (e = Station.activeGet(t), i = Station.animations.length, l = 2, p = (new Date).valueOf(); arguments[l];) "function" == typeof arguments[l] ? a = arguments[l] : (n = arguments[l].from, void 0 === n && (n = Station.read(e, o) || 0), a = {
            data: e,
            property: o,
            from: n,
            to: arguments[l].to,
            f: arguments[l].f || Station.nullInterpolator,
            marker: p
        }, "substr" == this.numbers[o] && (a.special = a.to, a.from = 0, a.to = a.special.length), a.velocity && (a.px = a.from - a.velocity), window.SPRINGY_THING && (a.time = null, a.f = Vadavadavada.spring), void 0 == arguments[l].time && arguments[l].f || (a.ticktock = 0, a.ticks = Math.max(Math.round((arguments[l].time || 0) * Station.SPEED / Station.INTERVAL), 1))), r ? r.STATION_next = a : Station.animations.push(a), r = a, l++, "string" == typeof arguments[l] && (o = arguments[l++]);
        return Station.loopOn(), i
    },
    run: function() {
        var t;
        return t = Station.push.apply(this, arguments), Station.loop(t), t
    },
    stopAnimation: function(t) {
        var o, a;
        for (o = 0; o != Station.animations.length; o++) a = Station.animations[o], a && a.data && a.data[0] == t && (Station.animations[o] = null)
    },
    numbers: {
        left: "px",
        top: "px",
        bottom: "px",
        right: "px",
        "left%": "%",
        marginLeft: "px",
        marginTop: "px",
        marginBottom: "px",
        marginRight: "px",
        paddingLeft: "px",
        paddingTop: "px",
        paddingBottom: "px",
        paddingRight: "px",
        borderLeft: "px",
        borderTop: "px",
        borderBottom: "px",
        borderRight: "px",
        width: "px",
        height: "px",
        fontSize: "px",
        opacity: "float",
        zoom: "float",
        scrollLeft: "direct",
        scrollTop: "direct",
        innerHTML: "direct",
        nodeValue: "substr",
        backgroundPositionX: "bgxhax",
        backgroundPositionY: "bgyhax",
        zIndex: "",
        letterSpacing: "px"
    },
    loop: function(t) {
        var o, a, n, e, i, r;
        if (Station.looper) {
            for (r = (new Date).valueOf(), a = t || 0; a != Station.animations.length; a++) {
                if (t >= 0 && t != a) return;
                if (o = Station.animations[a]) {
                    if (void 0 == t && (o.ticks || o.complete)) {
                        if (o.complete || o.ticktock >= o.ticks) {
                            for (Station.animations[a] = null;
                            "function" == typeof o.STATION_next;) o.STATION_next.call(o, o.data[0]), o = o.STATION_next;
                            o.STATION_next && (o.STATION_next.marker = r, Station.animations.push(o.STATION_next));
                            continue
                        }
                        o.ticktock += Math.max(1, Math.floor((r - o.marker) * Station.SPEED / Station.INTERVAL)), o.marker = r, o.ticktock = Math.min(o.ticktock, o.ticks)
                    }
                    i = !0, "string" != typeof o.to && Station.numbers[o.property] ? o.ticks ? (n = o.ticktock / o.ticks, y = o.f(n), to = o.from + y * (o.to - o.from)) : (void 0 == o.px && (o.px = o.from), e = o.f(o.from - o.to, o.px - o.to), o.px = o.from, o.complete = e.complete, to = o.to + e.result, o.from = to) : to = o.to, Station.apply(o.data, o.property, to, o.special)
                }
            }
            i || Station.loopOff()
        }
    },
    apply: function(t, o, a, n) {
        var e;
        if (t.nodeType && (t = Station.activeGet(t)), e = Station.numbers[o]) switch (e) {
            case "float":
                Browser.isIE && "opacity" == o ? t[0].style.filter = "alpha(opacity=" + 100 * a + ")" : t[0].style[o] = a;
                break;
            case "substr":
                t[0][o] = n.substr(0, Math.round(a));
                break;
            case "direct":
                t[0][o] = a;
                break;
            case "%":
                t[0].style[o.replace(/%/g, "")] = Math.round(a) + "%";
                break;
            case "bgxhax":
                t[0].style.backgroundPosition = Math.round(a) + "px 0";
                break;
            case "bgyhax":
                t[0].style.backgroundPosition = "0 " + Math.round(a) + "px";
                break;
            default:
                t[0].style[o] = Math.round(a) + e
        } else t[0].style[o] = a;
        t[1][o] = a
    },
    loopOn: function() {
        Station.looper || (Station.looper = setInterval(Station.loop, Station.INTERVAL))
    },
    loopOff: function() {
        Station.looper && (clearInterval(Station.looper), Station.looper = null, Station.animations.length = 0)
    },
    stop: function(t) {
        Station.animations[t] = null
    },
    read: function(t, o) {
        var a;
        return a = t.nodeType ? Station.passiveGet(t) : t, a ? a[1][o] : Browser.isIE ? t.runtimeStyle[o] || t.currentStyle[o] : (o = o.replace(/([A-Z])/g, "-$1").toLowerCase(), t.style[o] || getComputedStyle(t, "").getPropertyValue(o))
    },
    looper: null,
    f: {
        inversion: function(t) {
            return function(o) {
                return 1 - t(1 - o)
            }
        }
    },
    overlayEnd: function(t) {
        t.parentNode.removeChild(t)
    },
    overlay: function(t) {
        var o;
        return o = t.cloneNode(!0), Station.apply(o, "opacity", .99), Station.apply(o, "position", "absolute"), Station.apply(o, "width", t.offsetWidth), Station.apply(o, "zIndex", 30), o.disabled = !0, t.parentNode.insertBefore(o, t), o
    }
};
var interpolatorPulseNormalize = 1;
Interpolators = {
    line: function(t) {
        return t
    },
    sineCurve: function(t) {
        return Math.sin(.5 * Math.PI * t)
    },
    pulse: function(t) {
        var o, a;
        if (1 == interpolatorPulseNormalize && 1 != t && (interpolatorPulseNormalize = 1 / arguments.callee(1)), t = 8 * t, 1 > t) o = t - (1 - Math.exp(-t));
        else {
            var n = Math.exp(-1);
            t -= 1, a = 1 - Math.exp(-t), o = n + a * (1 - n)
        }
        return o * interpolatorPulseNormalize
    }
}, Vadavadavada = {
    spring: function(t, o) {
        var a, n, e;
        return e = t - o, n = .2, a = -t * n, e += a, t += e, t *= 1 - 1 / Math.pow(Math.abs(t / 2e3) + 1.3, 2), {
            result: t,
            complete: !(Math.round(t) || Math.round(o))
        }
    }
}, window.DWait && DWait.run("jms/lib/station.js");
window.Shadows = {
    nodes: function(a) {
        $("span.shadow", a || document.body).each(function() {
            var a = $(this);
            if (!(a.hasClass("mild") || (a.css("background-image") || "").length > 5)) {
                var s, n, i = a.attr("shadowsize");
                if (i) i = i.split("x"), s = parseInt(i[0], 10), n = parseInt(i[1], 10);
                else {
                    var t = a.find("img");
                    t.length && (s = t.width(), n = t.height())
                }
                if (s && n) {
                    var o = "null.png";
                    s >= 70 && n >= 50 && (o = s >= 100 && n >= 70 ? "logo3.png" : "small3.png"), a.css("background-image", "url(//sh.deviantart.net/shadow/alpha-000000/2.6667-0.35/" + [s, n, o].join("/") + ")")
                }
            }
        })
    }
}, window.DWait && DWait.run("jms/lib/shadows.js");
LiquidSwitch = function(t, i) {
    this.f = t, this.initial_state = i, this.state = i
}, LiquidSwitch.prototype = {
    destroy: function(t) {
        t || (this.state = this.start_state, this.target_time = null, this.tick()), this.ticker && clearInterval(this.ticker)
    },
    change: function(t, i, e, s) {
        var a;
        this.interrupt = !0, a = (new Date).valueOf(), this.target_time = this.target_time && t == this.target_state ? Math.min(this.target_time, a + i) : a + i, this.target_time = Math.max(this.target_time, (this.last_change || 0) + e), this.target_state = t, s && t == this.state && (this.state = null), this.ticker || (this.ticker = setInterval(bind(this, this.tick), 25), this.tick())
    },
    tick: function() {
        var t;
        t = (new Date).valueOf(), (!this.target_time || t >= this.target_time) && (this.ticker && clearInterval(this.ticker), this.ticker = null, this.target_time = null, this.target_state != this.state && (this.interrupt = !1, this.f(this.target_state, this.state) === !1 || this.interrupt || (this.last_change = t, this.state = this.target_state)))
    }
}, window.DWait && DWait.run("jms/lib/liquidswitch.js");
window.LitBox = {
    _disabled: !1,
    hover: function(t, i) {
        if (!LitBox._disabled) {
            var o = t.getAttribute("data-litbox-timeout");
            if (o) return clearTimeout(o), t.removeAttribute("data-litbox-timeout"), void 0;
            var e = $(t),
                a = e.find("q"),
                n = a.position(),
                r = a.height() - e.height() + 10;
            0 >= r || (Station.stopAnimation(a[0]), Station.run(a[0], "top", {
                from: n.top,
                to: n.top - r,
                time: i ? 3 * 25 * (r / 2) : 3 * 25 * r
            }))
        }
    },
    out: function(t) {
        if (!LitBox._disabled) {
            var i = t.getAttribute("data-litbox-timeout");
            if (!i) {
                var o = this;
                return t.setAttribute("data-litbox-timeout", setTimeout(function() {
                    o.out(t)
                }, 0)), void 0
            }
            clearTimeout(i), t.removeAttribute("data-litbox-timeout"), t = t.getElementsByTagName("q")[0], Station.stopAnimation(t), Station.run(t, "display", {
                to: "block",
                time: 100
            }, "top", {
                from: parseInt(Station.read(t, "top"), 10) || 0,
                to: 0,
                f: Interpolators.pulse,
                time: 600
            })
        }
    },
    start: function() {
        LitBox._disabled = !1
    },
    stop: function(t, i) {
        if (i.length > 0) {
            var o = i.find("q");
            o.length > 0 && (Station.stopAnimation(o[0]), Station.apply(o[0], "top", 0))
        }
        LitBox._disabled = !0
    }
}, PubSub.subscribe([{
    eventname: "LitBox.start",
    subscriber: LitBox,
    callback: LitBox.start,
    empty_queue_if_first_subscriber: !0
}, {
    eventname: "LitBox.stop",
    subscriber: LitBox,
    callback: LitBox.stop,
    empty_queue_if_first_subscriber: !0
}]), window.DWait && DWait.run("jms/lib/litbox.js");
DTLocal = {}, DTLocal.infect = function(l) {
    var t;
    l.constructor && !l.constructor.localCache && (l.constructor.localCache = {});
    for (t in DTLocal.infection) l[t] = DTLocal.infection[t];
    l.local = {}
}, DTLocal.infection = {
    localUID: function() {
        return this.local_uid_counter || (this.local_uid_counter = 100), this.local_uid_counter++
    },
    localDestroy: function() {
        this.localRecv && this.localRecv("lastcall"), this.localClean(), this.localRecv && this.localRecv("destroy")
    },
    localClean: function(l, t) {
        var o, c, e;
        for (o in this.local) {
            if ("function" == typeof l || l instanceof RegExp) {
                if (l instanceof RegExp) {
                    if (!o.match(l)) continue
                } else if (!(this.local[o] instanceof l)) continue;
                e = o
            } else e = l || o;
            if (e in this.local) {
                if (t || !this.local[e]) {
                    this.local[e] = null;
                    continue
                }
                if (this.local[e] instanceof Array) this.local[e][0] == clearInterval ? clearInterval(this.local[e][1]) : this.local[e][0] == clearTimeout ? clearTimeout(this.local[e][1]) : this.local[e][0].apply(this, this.local[e].slice(1));
                else if (this.local[e].nodeType) this.local[e].parentNode && this.local[e].parentNode.removeChild(this.local[e]);
                else {
                    if ("function" != typeof this.local[e].localDestroy && "function" != typeof this.local[e].gmiConstructor) continue;
                    c = this.local[e], this.local[e] = null, c.localDestroy ? c.localDestroy() : GMI._delete(c), delete c
                }
                delete this.local[e]
            }
            if ("string" == typeof l) return
        }
    },
    getLocalEventHook: function(l, t, o) {
        return Events.hook(l, t, o), [Events.unhook, l, t, o]
    },
    getLocalSetTimeout: function(l, t) {
        return [clearTimeout, setTimeout(l, t)]
    },
    getLocalSetInterval: function(l, t) {
        return [clearInterval, setInterval(l, t)]
    },
    localEventHook: function() {
        this.local[this.localUID()] = this.getLocalEventHook.apply(this, arguments)
    },
    localSetTimeout: function() {
        this.local[this.localUID()] = this.getSetTimeout.apply(this, arguments)
    },
    localSetInterval: function() {
        this.local[this.localUID()] = this.getSetInterval.apply(this, arguments)
    }
}, window.DWait && DWait.run("jms/lib/dtlocal.js");
DWait.ready(["jms/dwait/download.js", "jms/lib/bind.js", "jms/lib/glbl.js", "jms/lib/pubsub.js"], function() {
    window.gWebPage = {
        update: function(e, a, t) {
            var i, s;
            if (e.pageData && !(e.pageData instanceof Array)) for (i in e.pageData) "deviant" == i ? deviantART.deviant = e.pageData[i] : deviantART.pageData[i] = e.pageData[i];
            if (e.title && e.title.length && (document.title = e.title), e.css && ($("style#difi-page-css").remove(), $("head").append('<style id="difi-page-css" type="text/css">' + e.css + "</style>")), e.rollups) {
                var l, d, i;
                for (l in e.rollups) DWait.R[l] = e.rollups[l]
            }
            if (e.deps) for (i = 0; e.deps.length > i; i++) {
                var n = e.deps[i];
                if (!(n[3] && n[3].media && !/Screen/.test(n[3].media) || DWait.L[n[0]])) if ($('link[rel="stylesheet"][href^="' + n[1] + '"]').length > 0 || $('script[src^="' + n[1] + '"]').length > 0) DWait.R[n[1]] && delete DWait.R[n[1]];
                else {
                    s = bind(gWebPage, gWebPage.downloadDone, n[1], a ? a.pull() : null);
                    var o;
                    o = n[2] ? n[1] + "?" + n[2] : n[1], DWait.download(o, s, n[3] && n[3].media ? "css" : "js")
                }
            }
            if (e.downloads) {
                var l, d, i;
                for (l in e.downloads) if (!DWait.T[l]) {
                    d = [];
                    for (i in e.downloads[l]) $('link[rel="stylesheet"][href^="' + e.downloads[l][i] + '"]').length > 0 || $('script[src^="' + e.downloads[l][i] + '"]').length > 0 || d.push(e.downloads[l][i]);
                    d.length && (DWait.T[l] = d)
                }
                DWait.retrip()
            }
            if (e.dwaitcalls) for (i = 0; e.dwaitcalls.length > i; i++) DWait.ready.apply(t || this, e.dwaitcalls[i]);
            t && (window.Shadows && setTimeout(bind(Shadows, Shadows.nodes, t), 1), window.Keeper && setTimeout(Keeper.master_on, 1)), DWait.init_domready(), PubSub.publish("gWebPage.update", e)
        },
        downloadDone: function(e, a) {
            DWait.unroll(e), a && a()
        }
    }, window.DWait && DWait.run("jms/lib/gwebpage.js")
});
window.SpinnerPresets = {
    green: {
        lines: 15,
        length: 0,
        width: 3,
        radius: 4,
        color: "#84b247",
        trail: 60,
        shadow: !1,
        hwaccel: !1,
        zIndex: 1
    },
    big_white: {
        lines: 15,
        length: 15,
        width: 5,
        radius: 20,
        color: "#fff",
        trail: 60,
        shadow: !0,
        hwaccel: !1,
        zIndex: 1
    }
}, window.DWait && DWait.run("jms/lib/spinpreset.js");
REG_OLD_DEVIATION_2 = /^h[t]tp:\/\/()www.deviantart\....\/(?:deviation|view)\/()([0-9]+)\/?(?:\?.*)?$/, REG_DEVIATION_2 = /^h[t]tp:\/\/([^\.]+)\.deviantart\....\/(?:art\/|journal\/)?([0-9A-Za-z\-\.]+)\-([0-9]+)\/?(?:\?.*)?$/, REG_COLLECTION = /^h[t]tp:\/\/([^\.]+)\.deviantart\....\/(?:gallery|favourites)\/\#_?()([0-9A-Za-z\-]+)\/?$/, RESOURCE_DEVIATION = 1, RESOURCE_GALLERIES = 20, RESOURCE_FAVCOLLECTIONS = 21, MYSTERY = 0, window.DWait && DWait.run("jms/pages/lub/lub_constants.js");
window.Subby = {
    warning: function(t, i, s, e) {
        var n, o, b, a = $(t);
        i = void 0 === i ? "Get" : i || "", s = s || "this feature", e = e ? " " + e : "", o = '<div class="subblebubble">' + i + " <strong>" + s + "</strong>" + e + " when you upgrade to <strong>Premium&nbsp;Membership</strong></div>", n = $(o).css({
            visibility: "hidden",
            position: "absolute",
            "z-index": 300
        }).appendTo("body"), a.addClass("subble").data("subby", n), b = Subby.getPosition(n[0], Ruler.document.jq_node(t)), n.css({
            left: b.x,
            top: b.y,
            visibility: "visible"
        })
    },
    getPosition: function(t, i) {
        var s, e;
        return e = {
            x: i.x,
            y: i.y2,
            w: t.offsetWidth,
            h: t.offsetHeight
        }, e.x2 = e.x + e.w, e.y2 = e.y + e.h, s = Ruler.screen.rect(), e.x2 + 30 > s.x2 && (e.x = Math.max(0, i.x2 - e.w), e.x2 = e.x + e.w), e.y2 > s.y2 && (e.y = Math.max(0, i.y - e.h), e.y2 = e.y + e.h), e
    },
    out: function(t) {
        var i;
        i = $(t).data("subby"), i && i.remove(), $(t).data("subby", null)
    }
}, window.DWait && DWait.run("jms/pages/subby.js");
(function() {
    var t = "l",
        i = "r",
        s = "t",
        o = "b";
    window.QuickTip = {
        show: function(t, i, s) {
            var o, p = $(t);
            o = p.data("quicktip"), o || (o = new n(p, i, s), p.data("quicktip", o)), o.show()
        }
    };
    var n = function(i, s, n) {
        var h = {
            timeout: null,
            mode: "mouseover",
            close_wait: 150,
            visible: !1,
            gravity: {
                x: t,
                y: o
            },
            position: {
                x: 0,
                y: 0
            }
        };
        this.options = $.extend(h, n || {}), this.template = p[s || "simple"], this.$anchor = i, this.build_body(), this.build_tip()
    };
    n.prototype = {
        show: function() {
            if (this.$tip.closest("html").length || this.$tip.appendTo("body"), !this.cancel_close() && !this.options.visible) {
                switch (this.calculate_position(), this.options.mode) {
                    case "only_close_on_outside_click":
                        $(document).on("click.quicktip", this.close.bindTo(this));
                        break;
                    default:
                        this.$anchor.on("mouseleave.quicktip", this.close.bindTo(this)), this.$tip.on("mouseenter.quicktip", this.cancel_close.bindTo(this)).on("mouseleave.quicktip", this.close.bindTo(this))
                }
                this.options.visible = !0, this.template.show.call(this)
            }
        },
        build_body: function() {
            var t = this.$anchor.data(),
                i = $("<div>").addClass("message");
            t.quicktipTitle && i.append($("<strong>").text(t.quicktipTitle)), t.quicktipText && i.append($("<span>").text(t.quicktipText)), t.quicktipFinal && i.append($("<em>").text(t.quicktipFinal)), this.$tip_body = i
        },
        build_tip: function() {
            var t = this.$anchor.data(),
                i = !1;
            t.quicktipHref && t.quicktipHref.match("^https?://") ? i = t.quicktipHref : this.$anchor.is("a") && (i = this.$anchor.attr("href")), i ? (this.$tip = $("<a>").attr("href", i), this.$anchor.attr("target") && this.$tip.attr("target", this.$anchor.attr("target")), this.$anchor.attr("onclick") && this.$tip.attr("onclick", this.$anchor.attr("onclick"))) : this.$tip = $("<div>"), this.$tip.addClass(this.template.classes || "").append(this.$tip_body)
        },
        calculate_position: function() {
            var o = $(window).width(),
                n = this.$anchor.offset(),
                p = this.$anchor.outerWidth(),
                h = this.$anchor.outerHeight(),
                e = this.$tip.outerHeight(),
                a = this.$tip.width();
            this.$tip.removeClass("gravity-" + this.options.gravity.y + this.options.gravity.x), n.left + a > o ? this.options.gravity.x = i : 0 > n.left - a && (this.options.gravity.x = t), 0 > n.top - e && (this.options.gravity.y = s), this.options.position.x = this.options.gravity.x === t ? n.left : n.left + p - a, this.options.position.y = this.options.gravity.y === s ? n.top + h : n.top - e, this.$tip.addClass("gravity-" + this.options.gravity.y + this.options.gravity.x)
        },
        cancel_close: function() {
            return this.options.timeout ? (clearTimeout(this.options.timeout), this.options.timeout = null, !0) : !1
        },
        close: function() {
            var t = this;
            this.options.timeout = setTimeout(function() {
                t.template.close.call(t), t.cancel_close(), t.$tip.off(".quicktip"), t.$anchor.off(".quicktip"), t.options.visible = !1
            }, this.options.close_wait)
        }
    };
    var p = {
        fade_up_in: {
            classes: "quicktip",
            show: function() {
                var t = this.options.gravity.y == o ? 10 : -10;
                this.$tip.css({
                    top: this.options.position.y + t,
                    left: this.options.position.x
                }).show().animate({
                    top: this.options.position.y,
                    opacity: 1
                })
            },
            close: function() {
                var t = this.options.gravity.y == o ? 10 : -10,
                    i = this;
                this.$tip.animate({
                    top: i.options.position.y + t,
                    opacity: 0
                }, function() {
                    i.$tip.hide()
                })
            }
        },
        subby: {
            classes: "quicktip",
            show: function() {
                this.options.position.x += this.options.gravity.x == t ? -5 : 5, p.fade_up_in.show.call(this)
            },
            close: function() {
                p.fade_up_in.close.call(this)
            }
        },
        password: {
            classes: "quicktip simple-tip",
            show: function() {
                this.$tip.css({
                    top: this.$anchor.offset().top - this.$tip.outerHeight() + 33,
                    left: this.$anchor.offset().left - 8 - this.$tip.outerWidth(),
                    opacity: 1
                }).removeClass("gravity-" + this.options.gravity.y + this.options.gravity.x).addClass("right-bottom").show()
            },
            close: function() {
                this.$tip.hide()
            }
        },
        simple: {
            classes: "quicktip simple-tip",
            show: function() {
                this.$tip.css({
                    top: this.options.position.y,
                    left: this.options.position.x,
                    opacity: 1
                }).show()
            },
            close: function() {
                this.$tip.hide()
            }
        },
        symbol: {
            classes: "quicktip simple-tip",
            show: function() {
                this.$tip.css({
                    top: this.options.position.y - 4,
                    left: this.options.position.x - 5,
                    opacity: 1
                }).show()
            },
            close: function() {
                this.$tip.hide()
            }
        }
    }
})(), window.DWait && DWait.run("jms/pages/quicktip.js");
window.GMIBase || (window.GMIBase = Base.extend({
    constructor: function(e, t) {
        this.gmi_node = e, this.gmi_args = t || {}, window.jQuery && (this.$ = jQuery(e)), this.gmiConstructor()
    },
    gmiConstructor: function() {},
    gmiQuery: function(e, t, n, r) {
        var i, o, a, s, u, m, g, d, c;
        if ("string" == typeof arguments[0] && (r = arguments[2], n = arguments[1], t = arguments[0], e = this.gmi_node || document), n || (n = {}), g = [], i = document.getElementsByName("gmi-" + t), e != document) {
            for (o = [], a = 0; a != i.length; a++) for (s = i[a]; s; s = s.parentNode) if (s == e) {
                o.push(i[a]);
                break
            }
        } else o = i;
        for (d = GMIBase.getConstructor(t), a = 0; u = o[a]; a++) {
            if (n.match) {
                m = 1;
                for (s in n.match) if ((u.getAttribute("gmi-" + s) || "") + "" != n.match[s] + "") {
                    m = 0;
                    break
                }
                if (!m) continue
            }
            c = GMIBase.getOne(u, d, r), - 1 != c && null != c && g.push(c)
        }
        return g
    },
    gmiQueryAsync: function(e, t, n, r, i) {
        var o, a, s, u, m, g, d, c;
        if ("string" == typeof arguments[0] && (r = arguments[2], n = arguments[1], t = arguments[0], e = this.gmi_node || document), n || (n = {}), g = [], o = document.getElementsByName("gmi-" + t), e != document) {
            for (a = [], s = 0; s != o.length; s++) for (u = o[s]; u; u = u.parentNode) if (u == e) {
                a.push(o[s]);
                break
            }
        } else a = o;
        d = GMIBase.getConstructor(t);
        var l = 0,
            f = a.length;
        setTimeout(function M() {
            if (m = a[l], f > l) {
                var e = !0;
                if (n.match) for (u in n.match) if ((m.getAttribute("gmi-" + u) || "") + "" != n.match[u] + "") {
                    e = !1;
                    break
                }
                e && (c = GMIBase.getOne(m, d, r), - 1 != c && null != c && g.push(c)), ++l, setTimeout(M, 1)
            } else i && i(g)
        }, 1)
    },
    gmiUp: function(e, t, n) {
        var r, i, o;
        r = arguments[0] && arguments[0].nodeType ? 1 : 0, i = r ? arguments[0] : this.gmi_node, e = arguments[0 + r], t = arguments[1 + r], n = arguments[2 + r], e && (e = "gmi-" + e);
        for (var a = {}; n || (i = i.parentNode);) if (n = !1, i.getAttribute) if (o = i.getAttribute("gmi-redirect"), o && a[i] && window.console && console.log("thwarted gmi-redirect loop", e, i), o && !a[i]) a[i] = !0, i = GMIBase.index[o].gmi_node, n = 1;
        else if (i.getAttribute("name") && (!e || i.getAttribute("name") == e)) {
            if (t) {
                t--;
                continue
            }
            return GMIBase.getOne(i)
        }
    },
    gmiApply: function(e, t, n, r) {
        var i, o;
        return e.setAttribute("gmindex", o = ++GMIBase.current_lookup), r || (e.setAttribute("id", "gmi-" + t), e.id = "gmi-" + t), e.setAttribute("name", "gmi-" + t), e.name = "gmi-" + t, i = GMIBase.getConstructor(t), GMIBase.index[o] = new i(e, n)
    },
    gmiCreate: function(e, t) {
        return GMI.gmiApply(document.createElement("div"), e, t)
    },
    gmiRefresh: function() {
        for (i in this.gmi_args) this.$.attr("gmi-" + i, this.gmi_args[i])
    }
}), GMIBase.index = {}, GMIBase.current_lookup = 0, GMIBase.getOne = function(node, constructor_shortcut, passive) {
    var eax, i, a, options;
    if (i = node.getAttribute("gmindex"), !i) {
        if (passive) return null;
        for (options = {}, i = 0; a = node.attributes[i]; i++) 0 == a.name.indexOf("gmi-") ? options[a.name.substr(4)] = a.value : 0 == a.name.indexOf("gmon-") ? options[a.name.substr(5)] = eval("(" + a.value + ")") : 0 == a.name.indexOf("data-") && (options[a.name.substr(5)] = a.value);
        node.dataset || (node.dataset = options), node.setAttribute("gmindex", i = ++GMIBase.current_lookup), GMIBase.index[i] = -1;
        try {
            (constructor_shortcut = GMIBase.getConstructorFromNode(node, constructor_shortcut)) && (eax = new constructor_shortcut(node, options), GMIBase.index[i] = eax)
        } catch (e) {
            if (node.removeAttribute("gmindex"), delete GMIBase.index[i], !e.message || !e.message.match(/gmi class not declared/i)) throw e;
            return ddt.trace("gmi", e.message), window.onerror && window.onerror(e.message, "deviantart.com/gmi.js", 0), - 1
        }
    }
    return GMIBase.index[i]
}, GMIBase._deleteNode = function(e) {
    var t;
    return (t = GMIBase.getOne(e, null, !0)) ? this._delete(t) : (e.parentNode && e.parentNode.removeChild(e), delete e, void 0)
}, GMIBase._delete = function(e, t) {
    var n, r;
    if (e instanceof Array) for (r = 0; r != e.length; r++) arguments.callee.call(this, e[r], t);
    else n = e.gmi_node, e.gmi_lifecycle = "destructing", e.gmiDestructor && e.gmiDestructor(), e.gmi_lifecycle = "deleted", delete GMIBase.index[n.getAttribute("gmindex")], n.setAttribute("gmindex", ""), t || (n.parentNode && n.parentNode.removeChild(n), window.attachEvent || (n.innerHTML = ""))
}, GMIBase.getConstructor = function(name) {
    try {
        return eval(name)
    } catch (e) {
        return Function("", 'throw new Error("GMI Class not declared: ' + name + '")')
    }
}, GMIBase.getConstructorFromNode = function(e, t) {
    if (jQuery.isFunction(t)) return t;
    var n, r;
    if (t) e.setAttribute("data-gmiclass", n = t);
    else if (!(n = e.getAttribute("data-gmiclass"))) {
        var i = e.getAttribute("name") || e.getAttribute("id") || "";
        "gmi-" == i.substr(0, 4) && (n = i.substr(4))
    }
    return (r = GMIBase.getConstructor(n)) && (r.GMIClass = n), r
}, GMIBase.default_constructor = function() {
    throw Error("Default GMI constructor used")
}, window.GMI = GMI = new GMIBase, GMI.getOne = GMIBase.getOne, GMI.query = GMI.gmiQuery, GMI.up = GMI.gmiUp, GMI.apply = GMI.gmiApply, GMI.create = GMI.gmiCreate, GMI._delete = GMIBase._delete, GMI._deleteNode = GMIBase._deleteNode, GMI.evCancel = function() {
    return window.event && (event.cancelBubble = !0), !1
}, window.$gm = GMI.gmiQuery), window.DWait && DWait.run("jms/lib/gmi.js");
(function() {
    var D = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
    crc32 = function(B, A) {
        A == window.undefined && (A = 0);
        var C = 0,
            E = 0;
        A = -1 ^ A;
        for (var F = 0, r = B.length; r > F; F++) C = 255 & (A ^ B.charCodeAt(F)), E = "0x" + D.substr(9 * C, 8), A = A >>> 8 ^ E;
        return -1 ^ A
    }, fletcher16 = function(D) {
        for (var B, A = D.length, C = 255, E = 255, F = 0; A;) {
            B = A > 20 ? 20 : A, A -= B;
            do E += C += D.charCodeAt(F++);
            while (--B);
            C = (255 & C) + (C >> 8), E = (255 & E) + (E >> 8)
        }
        return C = (255 & C) + (C >> 8), E = (255 & E) + (E >> 8), E << 8 | C
    }
})(), window.DWait && DWait.run("jms/lib/crc32.js");
QuantcastHelper = {
    account: "p-915Y6SMHQQJHI",
    replaceLabel: function(t, n) {
        if (!window.__qc || !window.__qc.qopts) return console.log("[QC] quantcast not present"), void 0;
        var s = __qc.qopts.labels || "",
            e = s.split(/,/);
        for (var c in e) e[c] == t && (e[c] = n);
        s = e.join(","), __qc.qpixelsent = [], _qevents.push({
            qacct: this.account,
            labels: s
        })
    },
    replaceLabelAll: function(t) {
        if (!window.__qc || !window.__qc.qopts) return console.log("[QC] quantcast not present"), void 0;
        var n = __qc.qopts.labels || "",
            s = n.split(/,/),
            e = [];
        for (var c in s) - 1 != s[c].indexOf("UserStatus.") && e.push(s[c]);
        e.push(t), n = e.join(","), __qc.qpixelsent = [], _qevents.push({
            qacct: this.account,
            labels: n
        })
    },
    addLabel: function(t) {
        if (!window.__qc || !window.__qc.qopts) return console.log("[QC] quantcast not present"), void 0;
        var n = __qc.qopts.labels || "";
        n += "," + t, __qc.qpixelsent = [], _qevents.push({
            qacct: this.account,
            labels: n
        })
    }
}, window.DWait && DWait.run("jms/lib/quantcast.js");
DWait.ready(["jms/lib/pubsub.js", "jms/lib/jquery/jquery.current.js", "jms/lib/jquery/plugins/jquery.throttle-debounce.js", "jms/lib/quantcast.js"], function() {
    (function(t, e) {
        var a, i = 31536e6,
            n = 500,
            s = 5,
            r = 1,
            o = "galt",
            c = "a",
            d = "b",
            l = "c",
            _ = "d",
            u = "e",
            h = "f",
            v = "g",
            p = "h",
            g = "i",
            b = "z",
            m = {
                sessionstart: c,
                sessionlast: d,
                session30: l,
                senterror: _,
                pageview: h,
                event: u,
                social: v,
                total: p,
                total30: g
            }, f = Base.extend({
                limit_tracker: null,
                set_vars: 0,
                slots: {
                    5: !1,
                    4: !1,
                    3: !1,
                    2: !1
                },
                constructor: function() {
                    this.limit_tracker = new k, PubSub.subscribe([{
                        eventname: "DaGa.init",
                        subscriber: this,
                        callback: this.handlers.init
                    }, {
                        eventname: "DaGa.track_event",
                        subscriber: this,
                        callback: e.debounce(1e3, !0, this.handlers.track_event)
                    }, {
                        eventname: "DaGa.track_event_no_debounce",
                        subscriber: this,
                        callback: this.handlers.track_event
                    }, {
                        eventname: "DaGa.track_event_link",
                        subscriber: this,
                        callback: e.debounce(1e3, !0, this.handlers.track_event_link)
                    }, {
                        eventname: "DaGa.set_custom_var",
                        subscriber: this,
                        callback: this.handlers.set_custom_var
                    }, {
                        eventname: "DaGa.set_and_send_custom_var",
                        subscriber: this,
                        callback: this.handlers.set_and_send_custom_var
                    }, {
                        eventname: "DaGa.track_pageview",
                        subscriber: this,
                        callback: this.handlers.track_pageview
                    }, {
                        eventname: "DaGa.track_tao_pageview",
                        subscriber: this,
                        callback: this.handlers.track_tao_pageview
                    }, {
                        eventname: "DaGa.track_artist_private_pageview",
                        subscriber: this,
                        callback: this.handlers.track_artist_private_pageview
                    }, {
                        eventname: "DaGa.track_social",
                        subscriber: this,
                        callback: e.debounce(1e3, !0, this.handlers.track_social)
                    }])
                },
                _tokenize: function(t, a) {
                    var i = [],
                        n = this._get_standard_token_data();
                    "footer" == t ? (n = e.extend(n, this._get_footer_token_data()), "dev" == n.sec && (n = e.extend(n, this._get_deviation_token_data()))) : "deviation" == t && (n = e.extend(n, this._get_deviation_token_data()));
                    for (var s in n) n.hasOwnProperty(s) && i.push([s, n[s]].join("-"));
                    return ((deviantART.pageData || {}).tao || {}).tracking && i.push(deviantART.pageData.tao.tracking.token), i = i.sort(), a && i.unshift(a), i.join("_")
                },
                _get_standard_token_data: function() {
                    var e = (t.deviantART || {}).deviant || {}, a = {
                        usr: e.loggedIn ? "li" : "lo",
                        mob: Glbl("Site.is_mobile") ? "y" : "n"
                    };
                    return a
                },
                _get_deviation_token_data: function() {
                    var e = (t.deviantART || {}).pageData || {}, a = {
                        pg: Glbl("Minibrowse.opened") ? "db" : "pv"
                    }, i = ((e.tao || {}).tracking || {}).filters || {}, n = e.ads || {};
                    if (Glbl("Site.is_mobile") ? i.adm && (a.adm = n.mob_top_320x48 || n.atf_top_320x50 ? "y" : "n") : (i.ada && (a.ada = n.atf_right_300x250 ? "y" : "n"), i.adx && (a.adx = n.atf_right_300x600 ? "y" : "n"), i.adb && (a.adb = n.btf_right_300x250 ? "y" : "n"), i.adt && (a.adt = n.deviation_banner_textad ? "y" : "n"), i.ady && (a.ady = n.saymedia_925x65 || Glbl("Ads.saymedia") ? "y" : "n")), i.ddt) switch (a.ddt = "n", e.deviation_download) {
                        case "film":
                            a.ddt = "m";
                            break;
                        case "image":
                        case "file":
                        case "app":
                            a.ddt = download_type.substr(0, 1)
                    }
                    return i.dct && (a.dct = e.deviation_cat_topicid || 2), a
                },
                _get_footer_token_data: function() {
                    var t = {
                        sec: e("#dv7,.dev-page-container").length ? "dev" : "oth"
                    };
                    return t
                },
                handlers: {
                    init: function(t, a) {
                        e.extend(this.slots, a.slots);
                        var i = a.hits || [];
                        if (i.length) for (var n = 0, s = i.length; s > n; ++n) {
                            var r = null,
                                o = i[n];
                            "pageview" == o.type && (r = h, this.limit_tracker.increment(r, "server: " + o.signature))
                        }
                    },
                    track_event: function(e, a) {
                        if (!t._gaq) return console.warn("[GA] Cannot record event: GA is missing"), void 0;
                        var i = (a.category + "").toLowerCase().match(/^(duperbrowse|deviation|pcp|footer)$/);
                        if (i) switch (i[1]) {
                            case "duperbrowse":
                            case "deviation":
                            case "pcp":
                                a.label = this._tokenize("deviation", a.label);
                                break;
                            case "footer":
                                a.label = this._tokenize("footer", a.label)
                        }
                        var n = ["_trackEvent", a.category, a.action, a.label ? a.label : void 0, a.value && !isNaN(a.value) ? Number(a.value) : void 0, void 0 === a.noninteraction ? !0 : Boolean(a.noninteraction)];
                        return this.limit_tracker.increment(u, n.slice(1).join(", ")), t._gaq.push(n), !0
                    },
                    track_event_link: function(e, a) {
                        if (!a || !a.event || !a.element) return console.warn("[GA] Missing element or event in data object for track_event_link"), void 0;
                        PubSub.publish("DaGa.track_event_no_debounce", a);
                        var i = a.element,
                            n = a.event,
                            s = i.getAttribute("target"),
                            r = i.getAttribute("href");
                        if (!a.nofollow && r && !n.defaultPrevented && n.returnValue !== !1 && !n.altKey && !n.ctrlKey && !n.metaKey && !n.shiftKey && 2 > n.which && 0 !== r.indexOf("javascript:") && "#" !== r[0] && "_blank" != s && !(t.Admin || {}).active) {
                            r = i.href, n.preventDefault ? n.preventDefault() : n.returnValue = !1, s && 0 === s.indexOf("_") ? s.substring(1) : s;
                            var o = s && t[s] ? t[s] : t;
                            setTimeout(function() {
                                o.location = r
                            }, 166)
                        }
                    },
                    set_custom_var: function(e, a) {
                        return a.scope == r ? (console.warn("[GA] Cannot set visitor scope variables"), void 0) : t._gaq ? (this.slots[a.slot] !== !1 && console.warn("[GA] Overwritting slot ".data.slot), this.set_vars > s && console.warn("[GA] Hit custom var limit"), t._gaq.push(["_setCustomVar", a.slot, a.name, a.value, a.scope]), G("set custom var", a), this.set_vars++, void 0) : (console.warn("[GA] GA is missing"), void 0)
                    },
                    set_and_send_custom_var: function(t, e) {
                        PubSub.publish("DaGa.set_custom_var", e.custom_var), PubSub.publish("DaGa.track_event_no_debounce", e.event)
                    },
                    track_pageview: function(e, a) {
                        return t._gaq ? (this.limit_tracker.increment(h, a.page), a.page ? (t._gaq.push(["_trackPageview", a.page]), void 0) : (t._gaq.push(["_trackPageview"]), void 0)) : (console.warn("[GA] Cannot record pageview: GA is missing"), void 0)
                    },
                    track_artist_private_pageview: function(e, a) {
                        return t._gaq ? (a.artist_analytics_id && (G("tracked private artist pageview (" + Glbl("Location.path") + ")" + " for " + a.artist_analytics_id), t._gaq.push(["UserTracking._setAccount", a.artist_analytics_id]), t._gaq.push(["UserTracking._trackPageview", Glbl("Location.path")])), void 0) : (console.warn("[GA] Cannot record pageview: GA is missing"), void 0)
                    },
                    track_tao_pageview: function(t, e) {
                        var a = (deviantART.pageData || {}).tao || {};
                        if (a.tracking) {
                            if (e.page != a.tracking.namespace) return vms_feature("tao") && console.log("Mismatched tracking data:", e, a), void 0;
                            var i = "/tao/" + a.tracking.test + "/" + this._tokenize(a.tracking.namespace);
                            PubSub.publish("DaGa.track_pageview", {
                                page: i
                            })
                        }
                    },
                    track_social: function(e, a) {
                        if (!t._gaq) return console.warn("[GA] GA is missing"), void 0;
                        var i = ["_trackSocial", a.network, a.action];
                        a.target && i.push(a.target), a.target && a.page && i.push(a.page), this.limit_tracker.increment(v, i.slice(1).join(", ")), t._gaq.push(i)
                    }
                }
            }),
            k = Base.extend({
                cookie_regex: RegExp("\\b" + o + "=([^;]*)"),
                recording_limit: !1,
                recording_value: "",
                queued_increments: [],
                expose: function(t) {
                    var e = {}, a = t || this.data;
                    for (var i in m) m.hasOwnProperty(i) && (e[i] = a[m[i]], "session" == i.substr(0, 7) && (e[i] = new Date(e[i])));
                    return e
                },
                handlers: {
                    set: function(t, a) {
                        e.isPlainObject(a) || (a = {}), this.read();
                        var i = this.expose(e.extend(!0, {}, this.data));
                        for (var n in a) m[n] && (this.data[m[n]] = a[n]);
                        this.write(!0), G("Limit Tracker: modified cookie..", {
                            original: i,
                            overrides: a,
                            result: this.expose()
                        })
                    },
                    expose: function() {
                        G("Limit Tracker: exposing internals..", this.expose())
                    }
                },
                constructor: function() {
                    var t = e.now();
                    this.default_data = {}, this.default_data[c] = t, this.default_data[d] = t, this.default_data[l] = t, this.default_data[_] = !1, this.default_data[h] = 0, this.default_data[u] = 0, this.default_data[v] = 0, this.default_data[p] = 0, this.default_data[g] = 0, this.read(), vms_feature("ga_debug") ? PubSub.subscribe([{
                        eventname: "DaGaLimitTracker.set",
                        subscriber: this,
                        callback: this.handlers.set
                    }, {
                        eventname: "DaGaLimitTracker.expose",
                        subscriber: this,
                        callback: this.handlers.expose
                    }]) : this.expose = e.noop
                },
                increment: function(t, a) {
                    if (t == h || t == u || t == v) {
                        if (this.recording_limit) return this.queued_increments.push({
                            type: t,
                            value: a
                        }), void 0;
                        this.recording_limit = t, this.recording_value = a;
                        var i = e.now(),
                            n = i - 18e5;
                        if (n > this.data[d]) {
                            var s = Math.floor((i - this.data[d]) / 6e4);
                            return G("Limit Tracker: Reset session due to inactivity. Last interaction: " + s + " minutes ago"), DiFi.pushPost("Analytics", "ga_report_reset", [], this.reset_and_increment_callback.bindTo(this)), DiFi.send(), void 0
                        }
                        return n > this.data[l] ? (G("Limit Tracker: 30-minutes into the session, reporting GA usage.", this.expose()), DiFi.pushPost("Analytics", "ga_report_usage", [], this.report_and_increment_callback.bindTo(this)), DiFi.send(), void 0) : (this._do_increment(), void 0)
                    }
                },
                _do_increment: function() {
                    var t = this.recording_limit,
                        e = this.recording_value;
                    this.data[t] = (parseInt(this.data[t], 10) || 0) + 1, this.data[p] = (parseInt(this.data[p], 10) || 0) + 1, this.data[g] = (parseInt(this.data[g], 10) || 0) + 1, this.write();
                    var a = "pageview";
                    return t != h && (a = t == v ? "social" : "event"), G("tracked " + a + ": " + e), !this.data[_] && this.data[p] >= n ? (this.data[_] = !0, this.write(), G("Limit Tracker: User breached GA limit. Reporting...", this.expose()), DiFi.pushPost("Analytics", "ga_limit_breach", [], this.report_limit_breach_callback.bindTo(this)), DiFi.send(), void 0) : (this.process_call_queue(), void 0)
                },
                process_call_queue: function() {
                    this.recording_limit = !1, this.queued_increments.length && this.increment(this.queued_increments.shift())
                },
                reset_and_increment_callback: function(t, e) {
                    return t ? (this.reset(), this._do_increment(), void 0) : (this.reset_on_error(t, e), this.process_call_queue())
                },
                report_and_increment_callback: function(t, a) {
                    return t ? (this.data[l] = e.now(), this.data[g] = 0, this._do_increment(), void 0) : (this.reset_on_error(t, a), this.process_call_queue())
                },
                report_limit_breach_callback: function(t, e) {
                    this.reset_on_error(t, e), this.process_call_queue()
                },
                reset_on_error: function(t, e) {
                    t || "BAD_DATA" != (((e || {}).response || {}).content || {}).error || (this.reset(), this.write(), G("Limit Tracker: cookie data reset due to server error on last request"))
                },
                reset: function() {
                    var t = e.now();
                    this.data[c] = t, this.data[d] = t, this.data[l] = t, this.data[_] = !1, this.data[h] = 0, this.data[u] = 0, this.data[v] = 0, this.data[p] = 0, this.data[g] = 0
                },
                read: function() {
                    this.data = {};
                    var t = {};
                    try {
                        t = JSON.parse(unescape(((document.cookie + "").match(this.cookie_regex) || []).pop()) || "{}")
                    } catch (a) {}
                    this.data = e.extend(!0, {}, this.default_data, t)
                },
                write: function(a) {
                    a || (this.data[d] = e.now());
                    var n = {};
                    for (var s in this.default_data) this.default_data.hasOwnProperty(s) && this.data[s] && (n[s] = this.data[s]);
                    vms_feature("ga_debug") && this.data[b] && (n[b] = 1);
                    try {
                        var r = new Date(e.now() + i);
                        document.cookie = [o, "=", encodeURIComponent(JSON.stringify(n)), "; expires=", r, "; path=/", "; domain=.", t.location.host.split(".").slice(-2).join(".")].join("")
                    } catch (c) {}
                },
                persist_debugger: function(t) {
                    this.data[b] = t, this.write()
                }
            }),
            w = Base.extend({
                constructor: function() {
                    PubSub.subscribe({
                        eventname: "PageViewTracker.pageview",
                        subscriber: this,
                        callback: this.handlers.track_pageview
                    })
                },
                handlers: {
                    track_pageview: function(e, a) {
                        PubSub.publish("DaGa.track_pageview", {
                            page: a.page
                        }), t.COMSCORE_fire && t.COMSCORE_fire({
                            c4: "www.deviantart.com" + a.page
                        }), t.QuantcastHelper && a.tag && t.QuantcastHelper.replaceLabelAll(a.tag)
                    }
                }
            }),
            x = null,
            y = [],
            G = function(i, n) {
                vms_feature("ga_debug") && (i = "(" + a.limit_tracker.data[p] + ") " + i, console.warn("[GA Debug] " + i, void 0 === n ? "" : n), y.unshift(i), x || (x = e('<pre style="display: block; position: fixed; z-index: 199; bottom: 15px; right: 2px; width: 45px; height: 13px; padding: 3px; overflow: hidden; background: black; background: rgba(0,0,0,.8); color: #fff; border: 1px solid #fff; font-size: 11px; white-space: pre-wrap; cursor: pointer; box-shadow: 2px 2px 3px #666">').prependTo(document.body), x.on({
                    "click.ga": function() {
                        var t = x.data("open");
                        e(this).trigger(t ? "close" : "open"), a.limit_tracker.persist_debugger(!t)
                    },
                    "open.ga": function() {
                        e(this).data("open", !0), x.css({
                            overflowY: "scroll"
                        }).animate({
                            width: e(t).width() / 2,
                            height: 80
                        }, 200), x.text(y.join("\n"))
                    },
                    "close.ga": function() {
                        e(this).data("open", !1), x.css({
                            overflowY: "hidden"
                        }).animate({
                            width: 45,
                            height: 13
                        }, 100), x.text("GA Log")
                    }
                }), a.limit_tracker.data[b] ? (x.css({
                    width: e(t).width() / 2,
                    height: 80,
                    overflowY: "scroll"
                }), x.data("open", !0)) : x.html("GA Log")), x.data("open") && x.text(y.join("\n")))
            };
        try {
            new w, a = new f, G("=== DaGa tracking instantiated ===")
        } catch (D) {}
    })(window, jQuery), window.DWait && DWait.run("jms/lib/analytics.js")
});
(function() {
    var e = Base.extend({
        events: [],
        handlers: {
            push_event: function(e, t) {
                this.events.push(t), this.set_cookie()
            }
        },
        set_cookie: function() {
            var e = new Date,
                t = Glbl("Site.is_stash") ? "sta.sh" : ".deviantart.com",
                s = 0,
                i = 1;
            for (s = 0; this.events.length > s; s++) this.events[s].days_valid > i && (i = this.events[s].days_valid);
            e.setTime(e.getTime() + Math.ceil(1e3 * 60 * 60 * 24 * i)), document.cookie = "crosspagetracking=" + JSON.stringify(this.events) + "; expires=" + e.toGMTString() + "; domain=" + t + "; path=/"
        },
        constructor: function() {
            PubSub.subscribe([{
                eventname: "CrossPageTracking.push_event",
                subscriber: this,
                callback: this.handlers.push_event
            }])
        }
    });
    new e
})(jQuery), window.DWait && DWait.run("jms/lib/tracking.js");
window.Selection = {}, window.SimpleSelection = Base.extend({
    constructor: function(e, t) {
        this.setRoot(e), this.callback = t || this.fnull
    },
    fnull: function() {},
    setRoot: function(e) {
        this.root = e
    },
    getAllSelectable: function() {
        return this.root.childNodes || []
    },
    isSelectable: function(e) {
        return e.parentNode == this.root
    },
    isSelected: function(e) {
        return (" " + e.className + " ").indexOf(" selected ") >= 0
    },
    getSelection: function(e) {
        var t, i, l;
        for (l = e ? {} : [], t = this.getAllSelectable(), i = 0; t[i]; i++) this.isSelected(t[i]) && (e ? l[i] = t[i] : l.push(t[i]));
        return l
    },
    setSelection: function(e, t) {
        if (e && !this.isSelectable(e)) throw Error("Cannot select " + e);
        if (Selection.focused = this, e && this.isSelected(e)) return !0;
        var i, l;
        for (l = this.getSelection(), i = 0; l[i]; i++) this.deselect(l[i]);
        return e && (this.next_sel_click_volatile = !1, this.select(e)), this.callback(this.getSelection(void 0), l, t), !0
    },
    setRelativeSelection: function(e, t, i, l, n) {
        var s, c, a;
        return a = t ? "relative_keyboard" : "relative", c = this.getAllSelectable(), 1 > c.length ? void 0 : (s = this.getSelection(!0), i ? this.setNewAdditiveSelection.call(this, s, a, e, c, t, l, n) : this.setNewSelection.call(this, s, a, e, c), this.getSelection(!0))
    },
    setNewSelection: function(e, t, i, l) {
        for (var n in e) return n = Number(n), 0 > n + i ? this.setSelection(l[0], t) : this.setSelection(l[Math.min(l.length - 1, n + i)], t), void 0;
        this.setSelection(l[i > 0 ? 0 : l.length - 1], t)
    },
    setNewAdditiveSelection: function(e, t, i, l, n, s, c) {
        if (jQuery.isEmptyObject(e)) return this.setRelativeSelection(i, n);
        var a = 0,
            o = null;
        for (var r in e) r = Number(r), null === o && (o = r), a += 1;
        var h = null,
            u = 0;
        for (var f in s) f = Number(f), null === h && (h = f), u += 1;
        var S = f;
        null === h && (h = o, S = v, u = a);
        var v = r;
        if (0 > i) if (a > 1 && o == h && v != S) {
            if (!c) for (var d = Math.max(v, v + i) - 1; d >= Math.min(v, v + i); d--) this.deselect(l[Math.max(o, d + 1)])
        } else for (var d = Math.max(o, o + i) - 1; d >= Math.min(o, o + i); d--) this.select(l[Math.max(0, d)]);
        else if (a > 1 && v == S && o != h) {
            if (!c) for (var d = Math.min(o, o + i); Math.max(o, o + i) > d; d += 1) this.deselect(l[Math.min(v, d)])
        } else for (var d = Math.min(v, v + i); Math.max(v, v + i) > d; d += 1) this.select(l[Math.min(l.length - 1, d + 1)]);
        this.callback(this.getSelection(void 0), e, t)
    },
    setVerticallyRelativeSelection: function(e, t, l, n, s) {
        var c, a, o;
        if (o = t ? "relative_keyboard" : "relative", a = this.getAllSelectable(), !(1 > a.length)) {
            if (c = this.getSelection(!0), jQuery.isEmptyObject(c) && l) return this.setVerticallyRelativeSelection(e, t);
            var r = null,
                h = 0;
            for (i in a) {
                var u = Ruler.screen.node(a[i]);
                if (null === r) r = u.y;
                else if (u.y != r) break;
                h++
            }
            return this.setRelativeSelection(e * h, t, l, n, s)
        }
    },
    select: function(e) {
        this.isSelected(e) || (e.className += " selected")
    },
    deselect: function(e) {
        e.className = e.className.replace(/\s*\bselected\b/g, "")
    },
    deselectAll: function() {
        for (var e = this.getSelection(), t = 0; e.length > t; t++) this.deselect(e[t])
    }
}), window.DWait && DWait.run("jms/lib/simple_selection.js");
DWait.ready(["jms/lib/Base.js"], function() {
    window.CBC = Base.extend({
        constructor: function(t, a, i) {
            this.active_tasks = 0, this.failures = [], this.active = !1, this.callback = t, this.granular_callback = a, this.current_granular_params = i || []
        },
        pull: function(t) {
            return this.active_tasks++, bind(this, this.distributable_callback, t, this.current_granular_params)
        },
        start: function() {
            this.active = !0, this.checkForCompleteness()
        },
        setGranularParams: function(t) {
            this.current_granular_params = t ? t instanceof Array ? t : [t] : []
        },
        finish: function() {
            this.active && (this.callback(this), this.active = !1)
        },
        checkForCompleteness: function() {
            this.active_tasks || this.finish()
        },
        distributable_callback: function(t, a) {
            var i, s, n;
            if (n = this.granular_callback, t || n) {
                for (s = [], i = 2; arguments.length > i; i++) s.push(arguments[i]);
                t && t.apply(window, s), n && n.apply(window, a.concat(s))
            }
            this.active_tasks--, this.checkForCompleteness()
        }
    }), window.DWait && DWait.run("jms/lib/cbc.js")
});
DWait.ready(["jms/lib/gmi.js", "jms/lib/bind.js"], function() {
    GSTREAM_MAX_LENGTH = 1e4, GStream = (window.GMIHub || GMIBase).extend({
        gmiConstructor: function() {
            this.gs_dedupe_on_splice = !0, this.contents = [], this.graveyard = [], this.domReadMeta(), this.domReadState()
        },
        REQUEST_FETCH: 1,
        domFindVisible: function() {},
        domReadOne: function() {},
        domReadState: function() {
            var t, s;
            s = this.domFindVisible();
            for (t in s) s.constructor.prototype[t] || (this.contents[t] = this.domReadOne(s[t]));
            !this.gs_offset && this.gs_count_per_page > this.contents.length && !this.gs_more_to_load && (this.gs_total = this.contents.length)
        },
        domReadMeta: function() {
            this.gs_offset = 0, this.gs_count_per_page = 24, this.gs_fetch_size = 48, this.gs_fetch_bank = 0, this.gs_total = this.gmi_args.total || void 0, this.gs_empty = this.gmi_args.empty
        },
        domDrawRange: function(t, s) {
            var i, e, n;
            for (i = 0; i != s; i++) if (!(this.gs_offset > i + t)) {
                if (i + t >= Math.min(this.gs_total || GSTREAM_MAX_LENGTH, this.gs_offset + this.gs_count_per_page)) break;
                this.domDrawItem(t + i, this.contents[t + i]) == this.REQUEST_FETCH && (void 0 === e ? e = this.gs_offset + i : n = this.gs_offset + i)
            }
            void 0 != e && this.dataFetch(e, Math.max(this.gs_fetch_size, (n ? n - e : 0) + 1))
        },
        domDrawItem: function() {},
        domRemoveItem: function(t) {
            t.parentNode && t.parentNode.removeChild(t)
        },
        domClearAll: function() {
            var t, s;
            t = this.domFindVisible();
            for (s in t) this.domRemoveItem(t[s])
        },
        dataSplice: function(t, s, i) {
            var e, n, o, a, h, r = 0;
            if (this.gs_dedupe_on_splice && i) for (e = 0; e != i.length; e++)(n = this.dataIndexOf(i[e])) >= 0 && (this.gs_hold_exposure = !0, i[e] = this.dataSplice(n, 1, [])[0] || i[e], this.gs_hold_exposure = !1, n != t + e && r++);
            for (this.gs_empty && i.length && (this.gmi_node.innerHTML = "", this.gs_empty = !1), e = this.contents.length; t > e; e++) this.contents[e] = null;
            for (h = this.contents.splice.apply(this.contents, [t, s].concat(i || [])), this.graveyard = this.graveyard.concat(h), void 0 !== this.gs_total && (this.gs_total += (i || []).length - h.length), e = 0; s > e; e++) t + e >= this.gs_offset && this.gs_count_per_page > e && (o || (o = this.domFindVisible()), (a = o[t + e]) && (this.domRemoveItem(a), r++));
            var d = i ? i.length : 0;
            return r = Math.max(r, d, (this.gs_total || this.contents.length) + (d - r) - t % this.gs_count_per_page), i && i.length && (this.domDrawRange(t, r), r = 0), r > 0 && !this.gs_hold_exposure && this.domDrawRange(this.gs_offset + (this.gs_count_per_page - r), r), h
        },
        dataIndexOf: function(t) {
            var s;
            for (s = 0; s != this.contents.length; s++) if (this.contents[s] && this.dataCompare(this.contents[s], t)) return s;
            return -1
        },
        dataFetch: function() {},
        dataFilterArray: function(t, s, e) {
            var n = {};
            for (i = 0; i != s.length; i++) n[i + t] = s[i];
            return this.dataFilter(n, e)
        },
        dataFilter: function(t, s) {
            var i, e, n, o, a;
            o = {};
            for (e in t) if (!(e in t.constructor.prototype)) {
                for (void 0 === a && (a = Number(e)), n = t[e], i = 0; i != this.graveyard.length; i++) if (this.graveyard[i] && this.dataCompare(this.graveyard[i], n)) {
                    s ? this.graveyard.splice(i) : i = -1;
                    break
                } - 1 != i && (o[a++] = n)
            }
            return o
        },
        dataCompare: function() {
            return !1
        },
        dataAdd: function(t) {
            var s, i;
            i = this.gs_offset + this.gs_count_per_page;
            for (s in t) this.contents[s] = t[s], s >= this.gs_offset && i > s && this.domDrawItem(s, this.contents[s])
        },
        commsAskForTargets: function() {
            return []
        },
        commsRecvDrop: function() {},
        commsNonInputEvent: function() {}
    }), window.DWait && DWait.run("jms/lib/gstream/gstream.js")
});
window.ResourceStream = GStream.extend({
    gmiConstructor: function() {
        if (this.active_fetches = {}, this.base(), 1 === parseInt(this.gmi_args.duperbrowse_enabled, 10)) {
            this.$.removeClass("dwait");
            var e = this;
            DWait.ready("jms/pages/duperbrowse/stream/" + (this.gmi_args.duperbrowse_class || "Standard").toLowerCase() + ".resource.stream.js", function() {
                DuperbrowseStandardResourceStream.prototype.factory(e.gmi_args, e)
            })
        }
    },
    domReadOne: function(e) {
        var t = (e.getAttribute("collect_rid") || "0:0").split(":");
        return [Number(t[0]), Number(t[1]), e]
    },
    domFindVisible: function() {
        var e, t, i, s;
        for (t = {}, s = 0, e = 0; i = this.gmi_node.childNodes[e]; e++)((i.className || "").indexOf("tt-a") >= 0 || (i.className || "").indexOf("tt-crop") >= 0 || (i.className || "").indexOf("rs-customicon-cont") >= 0 || (i.className || "").indexOf("gl-text") >= 0) && !i.getAttribute("rs_ignore") && (t[s+++this.gs_offset] = i);
        return t
    },
    domReadMeta: function() {
        var e, t;
        if (e = (this.gmi_node.getElementsByTagName("smoothie") || [])[0], e ? (t = e.getAttribute && e.getAttribute("q").length > 0 ? e.getAttribute("q") : "", this.gs_offset = Number(e.getAttribute("offset")), this.gs_count_per_page = Number(this.gmi_args.count_per_page) || Number(e.getAttribute("count_per_page")) || 24, this.gs_more_to_load = e.getAttribute("moreleft"), this.gs_title = e.getAttribute("label")) : (t = this.gmi_args.query || "", this.gs_offset = Number(this.gmi_args.offset) || 0, this.gs_count_per_page = Number(this.gmi_args.count_per_page) || 24, this.gs_title = this.gmi_args.title, this.gs_more_to_load = this.gmi_args.more_to_load), t) {
            var i = this.gs_offset;
            $(this.gmi_node).find(".tt-a,.tt-aa").each(function() {
                $(this).find("a.thumb, a.t").each(function() {
                    var e = $(this),
                        s = e.attr("href");
                    if (s && -1 != s.indexOf("/art/") && -1 == s.indexOf("?q=")) {
                        var r = s.indexOf("?") > -1 ? "&" : "?";
                        e.attr("href", s + r + "q=" + encodeURIComponent(t) + "&qo=" + i)
                    }
                }), i++
            })
        }
        this.gs_fetch_size = 1 === parseInt(this.gmi_args.duperbrowse_enabled, 10) ? this.gs_count_per_page : Math.max(24, this.gs_count_per_page), this.gs_fetch_bank = 0
    },
    domDrawItem: function(e, t, i) {
        var s, r, o;
        if (!(void 0 !== this.gs_total && e >= this.gs_total)) {
            if (i = i || this.domFindVisible(), void 0 == t) s = document.createElement("div"), s.className = "placeholder tt-a", s.innerHTML = '<span class="tt-w"><span class="shadow"><img src="" width="149" height="92" style="visibility:hidden"/></span></span></div>', r = this.REQUEST_FETCH;
            else {
                if ("string" == typeof t[2]) {
                    var a = document.createElement("div");
                    a.innerHTML = t[2], t[2] = a.getElementsByTagName("*")[0]
                }
                s = t[2]
            }
            if (i[e]) {
                if (s != i[e]) {
                    if (o = this.preview_selector) if (o.isSelected(i[e])) {
                        var n = s.getAttribute("collect_rid");
                        n && n != (i[e].getAttribute("collect_rid") || n) && (o = null)
                    } else o = null;
                    if (void 0 != s && (this.gmi_node.insertBefore(s, i[e]), this.domRemoveItem(i[e])), o) {
                        if (!o.isSelectable(s)) return o.setRelativeSelection(1), void 0;
                        o.setSelection(s)
                    }
                }
            } else s && (this.gmi_node.appendChild(s), r == this.REQUEST_FETCH && window.Shadows && Shadows.nodes(s));
            return s && s.setAttribute("gs_offset", e), r
        }
    },
    domRemoveItem: function(e) {
        e.parentNode && ("A" == (e.nextSibling || {}).tagName && e.parentNode.removeChild(e.nextSibling), e.parentNode.removeChild(e))
    },
    dataFetch: function(e, t) {
        var i, s, r;
        r = (new Date).valueOf(), s = (this.gmi_node.getElementsByTagName("smoothie") || [])[0], this.resource_stream_query || (s ? s && (this.resource_stream_query = s.getAttribute("q")) : this.resource_stream_query = this.gmi_args.query), i = ["Resources", "htmlFromQuery", [this.resource_stream_query, e, t, this.gmi_args.view || "thumb150", "artist:" + Number(Boolean(this.gmi_args.show_artist)) + ",title:" + ((Number(this.gmi_args.show_title + 1) || 2) - 1) + (this.gmi_args.browseCategory ? ",browseCategory:" + this.gmi_args.browseCategory : "") + (this.gmi_args.folders ? ",folders:" + this.gmi_args.folders : "") + (this.gmi_args.comment_count ? ",comment_count:" + this.gmi_args.comment_count : "")]];
        var o = i.join(";");
        i.push(bind(this, this.dataFetchComplete, o, e, t, r)), this.active_fetches[o] > (new Date).valueOf() || (this.active_fetches[o] = (new Date).valueOf() + 2e4, DiFi.pushPublicGet.apply(DiFi, i), DiFi.timer(this.gs_difi_delay || 1))
    },
    dataFetchComplete: function(e, t, i, s, r, o) {
        var a, n, c;
        if (a = o.response.content, this.active_fetches[e] = 1, r) {
            if (o.response.content.total && (this.gs_total = Number(o.response.content.total), this.gs_total -= this.graveyard.length, this.contents.length + i > this.gs_total)) {
                n = this.domFindVisible();
                for (c in n)((n[c] || {}).className || "").indexOf("placeholder") >= 0 && this.domRemoveItem(n[c])
            }
            this.cleanUpData(o.response.content.resources), this.dataAdd(this.dataFilterArray(Number(t), o.response.content.resources instanceof Array ? o.response.content.resources : []))
        } else("NOEXEC_HALT" != o.response.status || window.location.href.indexOf("file:")) && DiFi.stdErr(null, o.response.content)
    },
    cleanUpData: function(e) {
        var t;
        for (t in e) t in e.constructor.prototype || ("number" != typeof e[t][0] && (e[t][0] = Number(e[t][0])), "number" != typeof e[t][1] && (e[t][1] = Number(e[t][1])))
    },
    dataCompare: function(e, t) {
        return e[0] == t[0] && e[1] == t[1]
    },
    setQuery: function(e) {
        this.resource_stream_query = e, this.gs_offset = 0, this.gs_total = e ? void 0 : 0, this.contents = [], this.domDrawRange(0, 24)
    },
    hubRecv: function(e) {
        this.dataSplice(0, 0, [
            [1, e.id, e.thumb]
        ])
    }
}), window.ResourceTV = ResourceStream.extend({}), window.GPageButton = ResourceStream.extend({
    domDrawItem: function() {},
    dataSplice: function() {},
    domFindVisible: function() {}
}), RES_SEL_EXT = {
    getAllSelectable: function() {
        var e, t, i;
        e = [];
        var s = $(this.root).children();
        for (t = 0; i = s[t]; t++) if (this.isSelectable(i)) e.push(i);
        else if (1 == i.nodeType && "gmi-ResourceScatter" == i.getAttribute("name")) break;
        return e
    },
    isSelectable: function(e) {
        var t = e.parentNode;
        if (!t) return !1;
        var i = $(e);
        if (i.closest("[rs_ignore]").length) return !1;
        var s = !1;
        try {
            s = 1 == window.deviantART.deviant.browseadult
        } catch (r) {}
        return t == this.root && i.is(".tt-a, .rs-customicon, .gl-text") && !(!s && i.is(".tt-ismature") && i.closest("#browse2").length) && !e.getAttribute("rs_ignore")
    }
}, window.ResourceStreamSimpleSelection = SimpleSelection.extend(RES_SEL_EXT), DWait.ready("jms/lib/selection.js", function() {
    window.ResourceStreamSelection = Selection.extend(RES_SEL_EXT)
}), window.DWait && DWait.run("jms/lib/gstream/resource_stream.js");
window.PortalCoreResourceStream = ResourceStream.extend({
    dataFetch: function(e, t) {
        var s = $.extend(this.gmi_args.query_params, {
            offset: Number(e),
            length: Number(t)
        }),
            r = this.gmi_args.portal || "browse",
            a = ["PortalCore", "get_result_thumbs", [r, s]],
            i = a.join(";");
        a.push(bind(this, this.dataFetchComplete, i, e, t)), this.active_fetches[i] > (new Date).valueOf() || (this.active_fetches[i] = (new Date).valueOf() + 2e4, DiFi.pushPublicGet.apply(DiFi, a), DiFi.timer(this.gs_difi_delay || 1))
    },
    dataFetchComplete: function(e, t, s, r, a) {
        var i = a.response.content;
        this.active_fetches[e] = 1, r ? (this.cleanUpData(i.resources), this.dataAdd(this.dataFilterArray(Number(t), i.resources instanceof Array ? i.resources : []))) : "NOEXEC_HALT" != a.response.status && DiFi.stdErr(null, i)
    }
}), window.DWait && DWait.run("jms/lib/gstream/portal_core_resource_stream.js");
WatchableObject = Base.extend({
    constructor: function() {
        this._wo_listeners = []
    },
    addListener: function(s) {
        if (!s) throw Error("Blank listener");
        return this._wo_listeners.push(s), !0
    },
    removeListener: function(s) {
        var i;
        for (i = 0; i != this._wo_listeners.length; i++) if (this._wo_listeners[i] == s) return this._wo_listeners.splice(i, 1), this._wo_sm_i >= i && this._wo_sm_i--, !0;
        return !1
    },
    broadcast: function() {
        if (void 0 != this._wo_sm_i) throw Error("Possible WO feedback loop");
        try {
            for (this._wo_sm_i = 0; this._wo_sm_i != this._wo_listeners.length; this._wo_sm_i++) this._wo_listeners[this._wo_sm_i].apply(this, arguments)
        } finally {
            this._wo_sm_i = void 0
        }
    }
}), window.DWait && DWait.run("jms/lib/wo.js");
BFC = WatchableObject.extend({
    boot: function() {
        this.shout = bind(this, this.shout), "onhashchange" in window ? window.onhashchange = this.event : this.location_interval || (this.location_interval = setInterval(this.shout, 150), this.shout())
    },
    unboot: function() {
        this.location_interval ? (clearInterval(this.location_interval), this.location_interval = null) : window.onhashchange = null
    },
    addListener: function(t) {
        this.shout(), this.base(t), t("navigate", this.previous)
    },
    event: function() {
        BackForward.shout()
    },
    shout: function(t) {
        var o;
        if ("string" == typeof t ? o = t : window.location.hash.length > 0 ? (o = $("<div>").text(window.location.hash).html().substr(1), o = o.replace("&amp;", "&")) : o = "", this.previous != o) {
            if ((this.timeout || 0) > (new Date).valueOf()) return;
            this.previous = o, this.broadcast("navigate", o)
        }
    },
    load: function(t) {
        this.previous != t && (this.shout(t), t || (this.timeout = (new Date).valueOf() + 800), window.location.hash = t)
    },
    iframe: function(t) {
        var o;
        document.frames.da_backforward || ($("<iframe>", {
            name: "da_backforward",
            id: "da_backforward",
            css: {
                position: "absolute",
                left: 0,
                top: "-1000px",
                width: "1px",
                height: "1px"
            }
        }).prependTo("body"), this.IE_bypass_firstrun && "" != window.location.hash || arguments.callee("")), o = document.frames.da_backforward, o.document.open("text/html"), o.document.write("<html><head><title>" + document.title + "</title></head><body onl" + "oad=\"parent.location.hash = '" + t + "';parent.BackForward.shout()\"></body></html>"), o.document.close()
    }
}), BackForward = new BFC, $(BackForward.boot()), window.DWait && DWait.run("jms/lib/backforward.js");
AdZone = function(i, t, e, s, a) {
    this.ad = {}, this.zones = i, this.keys = t || {}, this.size = e, this.min_time = s, Events.hook(window, "resize", this.position = bind(this, this.position)), this.start_counting_stats = (new Date).valueOf() + 1e3, this.master_anchor = a
}, AdZone.prototype = {
    destructor: function() {
        this.need(0, 0, !0), this.hide(), this.dead = 1, Events.unhook(window, "resize", this.position)
    },
    getDiv: function() {
        return this.ad.div
    },
    hide: function() {
        this.ad.div && this.anchor && $(this.ad.div).addClass("hidoframe"), this.anchor = null
    },
    show: function(i) {
        var t;
        if (!this.dead) {
            if (!this.master_anchor) throw Error("Cannot display ad without " + (this.auto ? "auto " : " ") + "anchor point. Use AdZone.getHTML() to create an anchor point");
            return (t = document.getElementById("ad-footprint-" + this.size.toLowerCase()) || this.master_anchor) ? ((this.anchor != t || i) && (this.anchor = t, this.ad.div && (this.position(), $(this.ad.div).removeClass("hidoframe"), this.ad.div.style.display = "block", this.ad.div.firstChild.style.display = "block")), void 0) : !1
        }
    },
    position: function() {
        var i, t, e;
        if (this.ad.div && this.anchor) {
            for (i = this.anchor; !i.offsetWidth;) if (i = i.parentNode, !i) return;
            i = Ruler.document.node(i), t = 0, e = this.ad.div, e.style.zIndex = 121, Browser.isIE && e.parentNode && "DIV" == e.parentNode.tagName && (e.parentNode.style.zIndex = 121), e.style.left = "auto", e.style.right = (document.getElementById("dv7") || document.getElementById("output") || document.body).offsetWidth - i.x2 + "px", e.style.top = i.y + "px", e.style.visibility = "visible"
        }
    },
    fetch: function(i, t, e) {
        var s, a, h, d;
        if ((!this.always_flush_difi && 0 != DiFi._queue.length || !(this.ad.div || this.no_refetch_while_busy && this.busy)) && ("728x90" == this.size && window.AdHug && AdHug.full && AdHug.apply("banner", ""), s = (new Date).valueOf(), this.marker = (new Date).valueOf(), a = this.getParams("zones", i), this.last_main_zone = a[0], this.last_keys = this.getSerializedKeys(), this.last_size = this.size, a[0])) {
            var n = this.frame_zone ? this.frame_zone : "728x90" == this.size ? "atf_top_728x90" : "atf_right_" + (this.size || "160x600"),
                o = this.getSerializedKeys();
            o || (o = "section:messagecenter"), this.busy = 1, this.always_flush_difi && DiFi.send(), d = {
                ad_frame: n,
                ad_keys: o,
                ad_buster: s,
                ad_mature: Number(Boolean(i)),
                ad_ignore1: e,
                ad_d: this.size
            }, h = ((location.href.split("#")[0].split("?")[1] || "").match(/swapAdZone=([^\&]+)/) || [])[1], h && (d.swapAdZone = h);
            var r = ((location.href.split("#")[0].split("?")[1] || "").match(/force_unanimis=([^\&]+)/) || [])[1];
            r && (d.force_unanimis = r), DiFi.pushPage("difi", d, bind(this, this.difi, this.marker, i)), DiFi.pushPublicGet("MessageCenter", "placebo_call", []), this.always_flush_difi && DiFi.send()
        }
    },
    difi: function(i, t, e, s) {
        var a;
        if (!this.dead) if (a = (t ? "M" : "g") + "->" + (s.maturecontent ? "M" : t ? "m" : "g"), this.busy = 0, i == this.marker) if (s.ad) {
            if (this.ad.div) {
                try {
                    delete this.ad.div.firstChild
                } catch (h) {
                    this.ad.div.innerHTML = ""
                }
                this.ad.div.parentNode.removeChild(this.ad.div), this.ad = {}
            } else this.ad.next_ad;
            this.ad = {
                next: (new Date).valueOf() + 1e3 * this.min_time,
                mature: s.maturecontent || t,
                div: e
            }, this.anchor && this.show(!0)
        } else this.ad.div && this.anchor && this.show(!0);
        else if (e) {
            try {
                delete e.firstChild
            } catch (h) {
                e.innerHTML = ""
            }
            e.parentNode.removeChild(e)
        }
    },
    getParams: function(i, t) {
        var e;
        return e = this[i], "function" == typeof e && (e = e(t)), e instanceof Array || (e = [e]), e
    },
    resetKeys: function() {
        this.keys = {}
    },
    setKey: function(i, t) {
        this.keys[i] = t
    },
    getKey: function(i) {
        return this.keys[i]
    },
    getSerializedKeys: function() {
        var i = [];
        for (var t in this.keys) i.push(t + ":" + this.keys[t]);
        return i.join(",")
    },
    need: function(i, t, e) {
        var s;
        if (this.ad.div && (e === !0 || this.getParams("zones", i)[0] != this.last_main_zone || this.getSerializedKeys() != this.last_keys && !this.allow_key_changes || this.size != this.last_size || (new Date).valueOf() > (this.ad.next || 0))) {
            this.hide();
            try {
                delete this.ad.div.firstChild
            } catch (a) {
                this.ad.div.innerHTML = ""
            }
            this.ad.div.parentNode.removeChild(this.ad.div), this.ad = {}
        }
        if (e !== !0) {
            if (this.ad.mature) {
                if (this.ad.div && (s = "m"), i) return
            } else if (this.ad.div && (s = "g"), i && this.ad.div) {
                try {
                    delete this.ad.div.firstChild
                } catch (a) {
                    this.ad.div.innerHTML = ""
                }
                this.ad.div.parentNode.removeChild(this.ad.div), this.ad = {}
            }
            this.fetch(i, t, this.no_ignores ? "" : s || "")
        }
    }
}, window.DWait && DWait.run("jms/lib/adzone.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/bind.js", "jms/lib/wo.js", "jms/lib/backforward.js"], function() {
    window.URLManagerBase = WatchableObject.extend({
        constructor: function(t, a) {
            var i;
            this.base(), this.options = a || {}, this.defaults = t || {}, this.map = {}, this.cb = !1;
            for (i in this.defaults) this.map[i] = this.defaults[i];
            this.options.no_hash_change || BackForward.boot(), this.backforward_listen = BackForward.addListener(bind(this, this.backforwardCallback))
        },
        destructor: function() {
            BackForward.removeListener(this.backforward_listen)
        },
        addListener: function(t, a) {
            return a && t(this.map, this.map), this.base(t)
        },
        set: function(t) {
            var a, i;
            i = {};
            for (a in this.map) i[a] = a in t ? t[a] : this.map[a];
            this.options.no_hash_change ? this.broadcast(i) : BackForward.load(this.locationStateToString(i))
        },
        setLoadCallback: function(t) {
            this.cb = t
        },
        backforwardCallback: function(t, a) {
            var i;
            i = this.locationStringToState(a, {}), this.broadcast(i)
        },
        broadcast: function(t) {
            window.Messages && !Glbl("Location.pushstate_enabled") && ($.isEmptyObject(t) || $.each(t, function(a, i) {
                "string" === $.type(i) && i.match(/[?&]_sid=([abcdef0-9]+)/) && (t[a] = i.replace(/[?&]_sid=([abcdef0-9]+)/, ""), Glbl("Duperbrowse.message_centre_hack_skip_next_state_change", !0))
            }));
            var a, i, s;
            a = {};
            for (i in this.defaults) s = i in t ? t[i] : (this.options.ignore_blanks ? this.map[i] : null) || this.defaults[i], s != this.map[i] && (a[i] = s, this.map[i] = s);
            for (i in a) {
                this.base(t, a);
                break
            }
            this.cb && (this.cb(), this.cb = !1)
        },
        locationStateToString: function() {
            throw Error("I need subclassing")
        },
        locationStringToState: function() {
            throw Error("I need subclassing")
        }
    }), window.URLQueryString = URLManagerBase.extend({
        locationStateToString: function(t) {
            var a, i;
            i = [];
            for (a in this.map) a in t && t[a] != this.defaults[a] && escape(t[a]) && i.push(a + "=" + escape(t[a]));
            return i.join("&")
        },
        locationStringToState: function(t) {
            var a, i, s;
            for (t = t.split("&"), s = {}, a = 0; a != t.length; a++) i = t[a].split("="), i[0] in this.map && (s[i[0]] = unescape(i.slice(1).join("=")));
            return s
        }
    }), REG_BROWSE_OVERLAY = /^(edit)?\/d[0-9a-z]+$/, window.BrowseAwareURLQueryString = URLQueryString.extend({
        backforwardCallback: function(t, a) {
            (a || "").match(REG_BROWSE_OVERLAY) || this.base.apply(this, arguments)
        }
    }), window.DWait && DWait.run("jms/lib/urlmanager.js")
});
window.URLBrowseLink = URLManagerBase.extend({
    locationStateToString: function(t) {
        return t.deviationid ? "/d" + Number(t.deviationid).toString(36) : this.sp_url_backup || ""
    },
    locationStringToState: function(t) {
        var i = "edit" == t.substr(0, 4) ? 6 : 2,
            n = t.match(REG_BROWSE_OVERLAY) ? parseInt(t.substr(i), 36) : this.spBackupURL(t);
        return {
            mode: 6 == i ? "edit" : "view",
            deviationid: n
        }
    },
    spBackupURL: function(t) {
        return this.sp_url_backup = t, null
    }
}), window.DWait && DWait.run("jms/pages/superbrowse/browse_urlm.js");
PreviewLoaderQueueMasterCount = 0, PreviewLoaderQueue = Base.extend({
    GUID: 7,
    LOADER_WANT_IMAGE: 1,
    LOADER_NOT_NEEDED: 2,
    LOADER_FAILED: 3,
    LOADER_COMPLETE: 4,
    constructor: function(e, u) {
        this.queue = {}, this.args = e, this.debug_label = u, this.current_pid = 1e3, this.GUID += PreviewLoaderQueueMasterCount++
    },
    setRequest: function(e, u, i, t) {
        var s;
        e = "d" + e, s = this.queue[e] || {}, s.state != this.LOADER_COMPLETE && (s.working || i != this.LOADER_NOT_NEEDED ? this.queue[e] = {
            state: i,
            working: s.working || 0,
            node: u,
            cbc: t,
            cbcf: t && t.pull()
        } : (this.queue[e] && this.queue[e].cbc && (this.queue[e].cbc.failures.push({
            err: "DO_NOT_WANT",
            human: "No longer desired"
        }), this.queue[e].cbcf()), this.queue[e] = null, delete this.queue[e]), this.runRequests())
    },
    queueCount: function(e) {
        var u, i = 0;
        for (u in this.queue)(this.queue[u].working || !e) && i++;
        return i
    },
    runRequests: function() {
        var e, u, i, t, s, r = 1;
        for (e = 0, this.$_(u, null, "Look for jobs"), s = 0; 2 != s; s++) for (u in this.queue) if (i = this.queue[u], 0 == s && i.working ? e++ : 1 != s || i.state != this.LOADER_WANT_IMAGE || i.working || (e++, i.working = 1, this.$_(u, i, "Run"), i.pid = this.current_pid++, setTimeout(bind(this, this.requestDone, u, !1, i.pid), 8e3), t = new CBC(bind(this, this.requestDone, u)), this.args.callback(u, i.node, t), t.start()), e >= r) break
    },
    requestDone: function(e, u, i) {
        var t;
        if (u === !1) {
            if (!this.queue[e] || i && i != this.queue[e].pid) return this.queue[e] && (this.queue[e].working = 0, this.queue[e].state = this.LOADER_FAILED), this.$_(e, this.queue[e], "Fail: Soft"), void 0;
            this.$_(e, this.queue[e], "Fail: Hard"), this.queue[e].working = 0, this.queue[e].timeout_pid = i, t = 1
        } else t = 1, this.$_(e, this.queue[e], "Success");
        this.queue[e] && this.queue[e].cbc ? (u || this.queue[e].cbc.failures.push(i ? "Loading timeout" : "Unknown Failure"), this.queue[e].cbcf()) : u && this.$_(e, this.queue[e], "No callback"), t && delete this.queue[e], this.runRequests()
    },
    _debugQueue: function() {
        var e, u, i;
        i = {};
        for (e in this.queue) u = this.queue[e], i[e] = Number(u.working) + " / " + Number(u.working) + " ! " + (u.timeout_pid || "_");
        return i
    },
    $_: function(e, u, i) {
        "Images" == this.debug_label && window.DiFiBug && DiFiBug.sessionUpdate(this, this.GUID + " [" + this.queueCount() + ":" + this.queueCount(1) + "] " + (e || "%") + " ! " + i, !1, !0, !0)
    }
}), $dppd = function() {
    da_preview_master.current_stream.image_loader._debugQueue()
}, window.DWait && DWait.run("jms/pages/superbrowse/loader_queue.js");
window.PreviewStreamControls = GMIBase.extend({
    gmiConstructor: function() {
        this.gmi_node.style.display = "none", this.gmi_node.innerHTML = this.template, this.gmi_node.onmousemove = bind(this, this.mouseOver)
    },
    gmiDestructor: function() {
        delete this.switcher
    },
    template: '<a class="lrx l-arrow lldr" href="" onmousedown="GMI.up(this).left();" onclick="return GMI.evCancel()"><span class="slrx"></span></a> <a class="lrx r-arrow rrdr" href="" onmousedown="GMI.up(this).right();" onclick="return GMI.evCancel()"><span class="slrx"></span></a> <a class="lrx x-arrow h-ignore" href="" onclick="GMI.up(this).back();return GMI.evCancel()"><span class="flrx h-ignore">show all</span><span class="slrx h-ignore"></span></a> <a class="lrx x-text" href="" onclick="GMI.up(this).back();return GMI.evCancel()">show all</a> ',
    back: function() {
        this.stream.preview_selector.setSelection(null, "escape")
    },
    left: function() {
        PubSub.publish("DaGa.track_event", {
            category: "SuperBrowse",
            action: "navigate_prev"
        }), this.stream.preview_selector.setRelativeSelection(-1)
    },
    right: function() {
        PubSub.publish("DaGa.track_event", {
            category: "SuperBrowse",
            action: "navigate_next"
        }), this.stream.preview_selector.setRelativeSelection(1)
    },
    mouseOver: function() {
        this.stream.navigationMouseHint()
    },
    updateState: function() {}
}), window.DWait && DWait.run("jms/pages/superbrowse/preview_controls_light.js");
window.PreviewStreamSelection = ResourceStreamSimpleSelection.extend({
    onclick: function(e) {
        var t;
        for (e = e || window.event, t = e.target || e.srcElement;
        "A" != t.tagName && (t = t.parentNode););
        return t && (t.href.match(REG_DEVIATION_2) || t.href.match(REG_OLD_DEVIATION_2)) ? this.base(e) : !0
    },
    select: function(e) {
        e.className += " ps-selected"
    },
    deselect: function(e) {
        e.className = e.className.replace(/\s+\bps.selected\b/g, "")
    },
    isSelected: function(e) {
        return (e.className || "").indexOf("ps-selected") >= 0
    },
    isSelectable: function(e) {
        var t;
        return this.base(e) ? (t = OUTLINE_PreviewStream.previewLinkFromThumb(e), Boolean((e.className || "").indexOf("placeholder") >= 0 || (e.className || "").indexOf("tt-special") >= 0 || t && (t.href.match(REG_DEVIATION_2) || t.href.match(REG_OLD_DEVIATION_2)))) : !1
    },
    setRelativeSelection: function(e, t) {
        var s, i, a, n, l;
        i = this.getSelection(!0), n = this.preview_stream_owner;
        for (a in i) {
            if (a = Number(a), i = this.getAllSelectable(), 0 > a + e && n.gs_offset > 0) l = Math.max(0, n.gs_offset - n.gs_count_per_page), this.setSelection(null, "temporary_blank_selection"), n.previewLoadOffset(l), i = this.getAllSelectable(), s = i.length - 1;
            else if (a + e >= n.gs_count_per_page || e > 0 && a == i.length - 1) {
                if (l = n.gs_offset + n.gs_count_per_page, l > n.contents.length || "1" !== n.gs_more_to_load) return;
                this.setSelection(null, "temporary_blank_selection"), n.previewLoadOffset(l), i = this.getAllSelectable(), s = 0
            }
            break
        }
        void 0 != s ? this.setSelection(i[s], t ? "relative_keyboard" : "relative") : this.base(e, t)
    },
    setSelection: function(e, t) {
        return e && this.isSelected(e) ? (this.callback(this.getSelection(), [], t), !0) : this.base(e, t)
    },
    onkeydown: function(e) {
        var t;
        return this.preview_active ? t = this.base(e) : !0
    }
}), window.DWait && DWait.run("jms/pages/superbrowse/preview_selection.js");
OUTLINE_PreviewStream = {
    previewLinkFromThumb: function(e) {
        var o;
        return o = "object" == typeof e && e.getElementsByTagName("a") || [], o[0] && !o[0].href ? o[1] : o[0]
    },
    domClearAll: function() {
        var e, o;
        e = this.domFindVisible();
        for (o in e) this.gmi_node.removeChild(e[o])
    }
}, window.PreviewStream = ResourceStream.extend(OUTLINE_PreviewStream), PreviewStream.scrollTo = function(e) {
    window.scrollTo ? window.scrollTo(0, e) : (Browser.isGecko ? document.documentElement : document.body).scrollTop = e || 0, 0 === e && Browser.isChrome && setTimeout(function() {
        document.body.scrollTop = 1
    }, 1)
}, window.DWait && DWait.run("jms/pages/superbrowse/preview_stream.js");
dsize_get = function(e, t, n, i, d, o) {
    var a, h, m, w, _, r, u, l, c, g, E, I, M, H, N, f, s, v, T;
    if (a = navigator.userAgent.toLowerCase(), h = /(msie) ([\w.]+)/.exec(a), m = 0 > a.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a), w = /(webkit)[ \/]([\w.]+)/.exec(a), _ = Number((document.body || {}).clientWidth || window.innerWidth || document.documentElement.offsetWidth), r = window.innerHeight || document.documentElement.offsetHeight, !e || !t) return {
        resview: {
            w: _ - 160,
            h: null
        }
    };
    var p = !(window.deviantART || {
        deviant: {}
    }).deviant.loggedIn || (window.deviantART || {
        deviant: {}
    }).deviant.ads ? 58 : 0;
    return u = 300, l = 20, c = 60, MYSTERY_PIXELS = -70, g = 60, CONTAINER_MIN_HEIGHT = 200, o && (m ? _ -= 15 : h ? _ -= 20 : w && (_ += 15)), E = Math.max(300, _ - (c + u + MYSTERY_PIXELS + l + g)), I = Math.max(300, r - (vms_feature("new_devpage") ? 164 : 138) - p), M = e / E, H = t / I, M > 1 || H > 1 ? (N = M > H ? E / e : I / t, ht = Math.round(t * N), padding_top = ht > 2 && CONTAINER_MIN_HEIGHT > ht ? (CONTAINER_MIN_HEIGHT - ht) / 2 : null, f = {
        w: Math.round(e * N),
        h: ht,
        y: padding_top
    }) : (ht = t, padding_top = ht > 2 && CONTAINER_MIN_HEIGHT > ht ? (CONTAINER_MIN_HEIGHT - ht) / 2 : null, f = {
        w: e,
        h: ht,
        y: padding_top
    }), T = document.getElementById("ile-container"), E = Math.max(d ? T ? 850 : 650 : 300, _ - (d ? 0 : c + g)), n && i && (N = Math.min(1, E / n), ht = Math.round(i * N), padding_top = ht > 2 && CONTAINER_MIN_HEIGHT > ht ? (CONTAINER_MIN_HEIGHT - ht) / 2 : null, v = {
        w: Math.round(n * N),
        h: ht,
        y: padding_top
    }), s = {
        w: Math.max(T ? 860 : 650, _ - (d ? 0 : 90 + MYSTERY_PIXELS)),
        h: null,
        y: Math.max(d ? -7 : 0, Math.min(0, _ - 7 - n))
    }, {
        resview: s,
        img: f,
        fullimg: v
    }
}, window.dsize_artificial_view = function(e, t, n, i, d, o) {
    var a, h, m, w, _, r, u, l, c, g;
    return g = (document.body || {}).clientWidth || window.innerWidth || document.documentElement.offsetWidth, window_height = window.innerHeight || document.documentElement.offsetHeight, l = -368 + g, c = o ? -311 + (window.innerHeight || document.documentElement.offsetHeight) : -140 + (window.innerHeight || document.documentElement.offsetHeight), _ = g / e, u = Math.min(t, t * _), r = Math.min(e, e * _), t > e && 100 > e * (200 / t) ? (w = 1, a = d) : c > u ? l > e ? (a = 0, h = 1, w = 0) : (w = 1, a = d) : (w = 1, a = d), {
        new_artificial_view: a,
        upgrade_smallview: h,
        use_larger_image: m,
        enable_zoom: w,
        min_x: l,
        min_y: c
    }
}, window.DWait && DWait.run("jms/chrome/deviationsize_core.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", ".domready"], function() {
    (function(t, i) {
        var e = Base.extend({
            _GA_List: {
                1: "BrowseArt",
                2: "PrintsShop",
                3: "Journals",
                4: "Chat",
                5: "Today",
                6: "Forum",
                8: "MyProfile",
                10: "HelpFAQ",
                11: "MyJournal",
                18: "MyGallery",
                19: "MyFavorites",
                23: "RandomDeviant",
                24: "RandomDeviation",
                27: "DailyDeviation",
                30: "dAmnit",
                32: "Channels",
                33: "MyFriends",
                34: "Wallpaper",
                39: "Discover",
                40: "Critiques",
                41: "Critiqueable",
                42: "MyPortfolio",
                44: "Groups",
                45: "RandomGroup",
                54: "MyPoints",
                55: "MyEarnings",
                90: "Muro",
                97: "Stash"
            },
            $node: null,
            constructor: function() {
                var i = this;
                this.$node = t("#overhead"), this.$node.on && this.$node.on("click.mainmenuga", "a.mi[appid]", function(t) {
                    i._GA_List[this.getAttribute("appid")] && PubSub.publish("DaGa.track_event_link", {
                        event: t,
                        element: this,
                        category: "MoreMenu",
                        action: i._GA_List[this.getAttribute("appid")]
                    })
                })
            },
            setHTML: function(i) {
                if (i || this.backup) {
                    var e = this.$node.find("tr>*:not(.oh-mmain):not(.oh-gap):not(.oh-keep):not(.collectmenu)").detach();
                    this.backup || (this.backup = e), i || (i = this.backup, this.backup = null);
                    var n = t(i);
                    Glbl("Site.is_stash") && n.each(function(i, e) {
                        t(e).hasClass(".shorturl-publicview") && this.$node.find("tr>.oh-gap").after(n.splice(i, 1))
                    }), this.$node.find("tr>.oh-mmain").after(n)
                }
            }
        });
        i.da_overhead_box = new e
    })(jQuery, window), window.DWait && DWait.run("jms/chrome/overhead_html.js")
});
DevMatureZone = GMIBase.extend({
    gmiConstructor: function() {
        DevMatureZone.cache[this.gmi_args.id] && this.display()
    },
    display: function() {
        this.gmi_node.firstChild.style.display = "none", this.gmi_node.firstChild.nextSibling.style.display = "block", DevMatureZone.cache[this.gmi_args.id] = 1, window.FilmPage !== void 0 && FilmPage.adjustPlayerSize()
    }
}), DevMatureZone.cache = {}, ResourceViewFavouriteButton = GMIBase.extend({
    add_text: vms_feature("new_devpage") && !vms_feature("frankenpage") ? "Favourite" : "Add to Favourites",
    remove_text: "In Favourites",
    remove_text_alt: "Remove Favourite",
    adding_text: "...",
    removing_text: "...",
    add_success_text: "Thanks!",
    remove_success_text: "Removed",
    gmiConstructor: function() {
        this.alive = 1, this.refresh(), this.bind(), this.is_faved = vms_feature("new_devpage") ? Boolean(Number(this.gmi_args.is_faved)) : this.get() == this.remove_text
    },
    gmiDestructor: function() {
        this.alive = 0
    },
    bind: function() {
        $(this.gmi_node).mouseover(bind(this, this.mouseOver)).mouseout(bind(this, this.mouseOut)).mousemove(bind(this, this.mouseMove)), "gmi-ResourceViewFavouriteButton" == $(this.gmi_node).attr("id") && (this.favesnav = $(this.gmi_node).parent().find("#favesnav ul"), this.favesnav.mouseover(bind(this, this.favesnavMouseDelay)).mouseleave(bind(this, this.favesnavMouseOut)), this.favesnav_arrow = $(this.gmi_node).parent().find("#favesnav div.favesnav-downarrow"), this.favesnav_arrow.mouseover(bind(this, this.favesnavMouseOver)).mouseover(bind(this, this.favesnavMouseAppearDelay)).mouseleave(bind(this, this.favesnavMouseOut)).click(function() {
            return !1
        }))
    },
    set: function(e, t, i, s) {
        var n, a;
        if (this.alive) {
            if (e && (n = this.$.find("i, em").get(0), n.className = (s ? "" : "icon ") + e), a = this.$.find("b, strong, .label").get(0), a.innerHTML = t, "gmi-ResourceViewFavouriteButton" == $(this.gmi_node).attr("id")) return;
            a.style.color = i || "#121516"
        }
    },
    get: function() {
        var e;
        return e = this.$.find("b, strong, .label").get(0), e.textContent || e.innerText
    },
    send: function() {
        var e;
        this.busy || (this.mouseOut({
            currentTarget: this.gmi_node
        }), this.busy = 1, e = !this.is_faved, this.set("iconx-favesstar", e ? this.adding_text : this.removing_text), DiFi.pushPost("Deviation", "Favourite", [this.gmi_args.id], bind(this, this.got), this), DiFi.timer(1), e && PubSub.publish("DaGa.track_event", {
            category: "Deviation",
            action: "AddToFavourites"
        }))
    },
    got: function(e, t, i, s) {
        var n;
        if (this.busy = 0, e) if (n = !this.is_faved || s, this.set("iconx-favesstar", n ? this.add_success_text : this.remove_success_text, n ? "#196BA7" : null), n ? $(this.gmi_node).addClass("active") : $(this.gmi_node).removeClass("active"), ResourceViewFavouriteButton.cache[this.gmi_args.id] = n, this.is_faved = n, this.busy = 1, setTimeout(bind(this, this.reset), 2500), n) {
            if (!s) {
                var a = $("em", this.gmi_node).offset();
                a.top -= 10, $('<span id="favup-star"></span>').css(a).insertAfter("body").animate({
                    top: "-=36"
                }, {
                    duration: 650,
                    complete: function() {
                        $(this).remove()
                    },
                    easing: "easeOutSine"
                })
            }
            window.deviantART.pageData.catpath && 0 !== window.deviantART.pageData.catpath.indexOf("flash") && setTimeout(bind(this, this.popupReminder), 400)
        } else s || window.da_minish_lub && window.da_minish_lub.modCookie(!1, !0);
        else this.reset(!0, this.is_faved), i || DiFi.stdErr("Unable to +favourite", t.response.content)
    },
    refresh: function() {
        void 0 !== ResourceViewFavouriteButton.cache[this.gmi_args.id] && !this.busy && this.alive && this.reset(null, ResourceViewFavouriteButton.cache[this.gmi_args.id])
    },
    reset: function(e, t) {
        var i;
        this.busy = 0, i = t === !0 || t === !1 ? t : Number(e === !0) ^ Number(this.is_faved), this.set("iconx-favesstar", i ? this.remove_text : this.add_text), i ? $(this.gmi_node).addClass("active") : $(this.gmi_node).removeClass("active"), i ? $(this.gmi_node).parent().find("#favesnav").hide() : $(this.gmi_node).parent().find("#favesnav").show()
    },
    popupReminder: function() {
        var e, t;
        if (this.alive && !(window.TalkPostWrapper || {}).one_comment_posted && this.gmi_args.comments_allowed) {
            if (e = vms_feature("new_devpage") ? $(".dev-title-avatar") : $("#artist-comments"), !e.is(":visible")) return;
            e = e.find("img:first"), e.length && (t = new Popup2("favedOverMore", "body", {
                classes: "darkspeech",
                content: "<div class=dsp>&nbsp;</div><i class=pbq></i>",
                destroy: !0,
                shown: function() {
                    Station.push(this.$node.get(0).firstChild.firstChild, "nodeValue", {
                        from: "",
                        to: "Don't forget to\nadd a comment!",
                        time: 500,
                        f: Interpolators.line
                    })
                },
                events: [{
                    selector: "*",
                    event: "click",
                    callback: function() {
                        GMI.query("TalkPostWrapper")[0].talkpost.focus()
                    }
                }]
            }), t.show(t.position(e, {
                valign: "top",
                keepOnScreen: !1
            })))
        }
    },
    firstOver: function(e) {
        e && e.target && "favesnav-downarrow" == e.target.className && this.favesnavMouseOver(e), this.first_over || (this.first_over = !0, this.mouseOver({
            target: this.gmi_node,
            relatedTarget: this.gmi_node.parentNode
        }))
    },
    mouseOver: function(e) {
        this.gmi_node != e.currentTarget || this.get() != this.remove_text || vms_feature("new_devpage") && !this.is_faved || this.busy || $(this.gmi_node).addClass("remove smbutton-red").find("b,strong").html(this.remove_text_alt)
    },
    mouseOut: function(e) {
        this.gmi_node == e.currentTarget && $(this.gmi_node).hasClass("remove") && $(this.gmi_node).removeClass("remove smbutton-red").find("b,strong").html(this.remove_text)
    },
    mousePos: {
        left: 0,
        top: 0
    },
    mouseMove: function(e) {
        this.mousePos.left = e.pageX, this.mousePos.top = e.pageY
    },
    favesnavMouseOver: function(e) {
        if (this.favesnav_arrow[0] == e.currentTarget && !$(this.gmi_node).hasClass("remove") && !$(this.gmi_node).hasClass("active")) {
            var t = this;
            this.favesnavMouseDelay(), this.favesnav.hasClass("favesnav-load") || (this.favesnav.addClass("favesnav-load"), DiFi.pushPrivateGet("Aggregations", "get_galleries_initial", [t.gmi_args.userid, RESOURCE_FAVCOLLECTIONS, 1], function(e, i) {
                if (!e) return DiFi.stdErr("Could not get the list of your collections"), void 0;
                t.favesnav.html(""), t.favesnav.append("<li><div>Add To:</div></li>");
                var s = $('<li class="list"></li>');
                t.favesnav.append(s);
                for (var n = 0, a = i.response.content.length; a > n; n++) {
                    var o = i.response.content[n];
                    "Featured" == o.title && (o.title = "Favourites"), o.title.length > 22 && (o.title = o.title.substring(0, 20) + "&hellip;"), s.append('<a href="#" cgalleryid="' + o.galleryid + '">' + o.title + "</a>")
                }
                t.favesnav.append('<li class="add_new"><input class="collection_name wide" value="Add new..." /><a class="new_collection">Add</a></li>'), t.favesnav.find("a").click(function() {
                    if ($(this).hasClass("new_collection")) return t.favesnav.trigger("CREATE_COLLECTION"), !1;
                    var e = $(this).attr("cgalleryid");
                    return t.favesnav.trigger("ADD_TO_COLLECTION", e), !1
                }), t.favesnav.find("input.collection_name").bind({
                    focus: function() {
                        t.favesnav.addClass("stick stick-perm"), "Add new..." == $(this).val() && ($(this).removeClass("wide").val(""), $(this).next("a").show())
                    },
                    blur: function() {
                        t.favesnav.removeClass("stick stick-perm"), "" == $(this).val().trim() && ($(this).addClass("wide").val("Add new..."), $(this).next("a").hide())
                    },
                    keypress: function(e) {
                        var i = e.keyCode ? e.keyCode : e.which;
                        13 == i && t.favesnav.trigger("CREATE_COLLECTION")
                    }
                })
            }), t.favesnav.bind("ADD_TO_COLLECTION", function(e, i) {
                PubSub.publish("DaGa.track_event", {
                    category: "Deviation",
                    action: "AddToFavouritesCollection"
                }), DiFi.pushPost("Aggregations", "add_resource", [t.gmi_args.userid, MYSTERY, RESOURCE_FAVCOLLECTIONS, i, 1, t.gmi_args.id, 0], function(e) {
                    e || DiFi.stdErr("Could not add this deviation to your favourites. Please try again"), t.got(!0, null, null, !1), window.da_minish_lub && window.da_minish_lub.modCookie(!1, !0)
                }), DiFi.send()
            }), t.favesnav.bind("CREATE_COLLECTION", function() {
                var e = t.favesnav.find("input.collection_name").val();
                "" != $.trim(e) && "Add new..." != $.trim(e) && (t.favesnav.find("input.collection_name").val("Add new..."), DiFi.pushPost("Aggregations", "create", [t.gmi_args.userid, MYSTERY, RESOURCE_FAVCOLLECTIONS, e, 0], function(i, s) {
                    if (!i) return DiFi.stdErr("Could not create a collection", s.response.content.error), void 0;
                    t.favesnav.trigger("ADD_TO_COLLECTION", s.response.content), e.length > 22 && (e = e.substring(0, 20) + "&hellip;");
                    var n = $('<a href="#" cgalleryid="' + s.response.content + '">' + e + "</a>");
                    t.favesnav.find("li.list").append(n), n.click(function() {
                        return t.favesnav.trigger("ADD_TO_COLLECTION", s.response.content), !1
                    })
                }), DiFi.send())
            }), DiFi.send())
        }
    },
    favesnavUnstick: null,
    favesnavMouseDelay: function() {
        var e = this.favesnav;
        e.addClass("stick"), clearTimeout(this.favesnavUnstick), e.hasClass("favesnav-wait") && !e.hasClass("stick-perm") ? e.removeClass("stick") : this.favesnavUnstick = setTimeout(function() {
            e.hasClass("stick-perm") || e.removeClass("stick")
        }, 300)
    },
    favesnavMouseAppearDelay: function() {
        var e = this.favesnav;
        e.addClass("favesnav-wait"), clearTimeout(this.favesnavAppear), this.favesnavAppear = setTimeout(function() {
            e.removeClass("favesnav-wait"), clearTimeout(this.adsAppear), Popup2.hideOverlayElements(this.favesnav)
        }, 150)
    },
    favesnavMouseOut: function() {
        var e = $("#favesnav");
        clearTimeout(this.favesnavAppear), e.hasClass("favesnav-wait") || (this.favesnavMouseDelay(), this.adsAppear = setTimeout(function() {
            Popup2.showOverlayElements()
        }, 300)), e.removeClass("favesnav-wait")
    }
}), ResourceViewFavouriteButton.cache = {}, ResourceViewPrintButton = ResourceViewFavouriteButton.extend({
    send: function() {
        this.busy || confirm("Send the artist a request to make this art available as a print?") && (this.busy = 1, this.set("", "Sending..."), DiFi.pushPost("Deviation", "RequestPrint", [this.gmi_args.id], bind(this, this.got), this), DiFi.timer(1))
    },
    got: function(e, t, i) {
        var s;
        this.busy = 0, e ? (this.set("", "Request Sent!"), this.busy = 1, setTimeout(bind(this, this.reset), 2500), s && setTimeout(bind(this, this.popupReminder), 400)) : (this.reset(!0), i || DiFi.stdErr("Unable to +favourite", t.response.content))
    },
    refresh: function() {},
    reset: function() {
        this.set("", "Request as Print"), GMI._delete(this)
    }
}), ResourceViewWatchButton = ResourceViewFavouriteButton.extend({
    send: function() {
        var e;
        this.busy || (this.busy = 1, e = "Add" == this.get().substr(0, 3), this.set("", e ? "Adding..." : "Removing..."), e ? DiFi.pushPost("Friends", "addFriendGetAttributes", [this.gmi_args.username, "deviation"], bind(this, this.got), this) : DiFi.pushPost("Friends", "removeFriend", [this.gmi_args.username], bind(this, this.got), this), DiFi.timer(1))
    },
    got: function(e, t, i) {
        var s;
        this.busy = 0, e ? (s = "Add" == this.get().substr(0, 3), this.set("", s ? "Now Watching!" : "Removed", s ? "#196BA7" : null), ResourceViewFavouriteButton.cache[this.gmi_args.id] = s, this.busy = 1, setTimeout(bind(this, this.reset), 2500)) : (this.reset(!0), i || DiFi.stdErr("Unable to alter deviantWATCH", t.response.content))
    },
    refresh: function() {},
    reset: function(e, t) {
        var i;
        this.busy = 0, i = t === !0 || t === !1 ? t : Number(e === !0) ^ Number(this.get().substr(0, 3) in {
            Now: 1,
            Add: 1
        }), this.set(i ? "i25" : "i24", i ? "Remove from deviantWATCH" : "Add to deviantWATCH", !1, !0)
    }
}), ResourceViewCollectButton = ResourceViewFavouriteButton.extend({
    gmiConstructor: function() {
        this.base(), this.mouseup_handler = bind(this, this.mouseup_handler), Events.hook(document.documentElement, "mouseup", this.mouseup_handler)
    },
    gmiDestructor: function() {
        this.base(), Events.unhook(document.documentElement, "mouseup", this.mouseup_handler)
    },
    send: function() {
        return this.ignore_onclick ? (this.ignore_onclick = 0, !1) : this.busy ? this.off() : this.on()
    },
    on: function() {
        if (this.busy) return !1;
        this.busy = 1;
        var e, t;
        return (e = document.getElementById("deviation-collect-bubble")) ? (Browser.isIE && "iframe" != e.firstChild.tagName.toLowerCase() && document.getElementsByTagName("iframe").length && e.insertBefore(document.createElement("iframe"), e.firstChild), "block" != e.style.display && (t = !document.getElementsByTagName("film").length, t ? (e.style.left = "0px", e.style.top = "-25px", e.style.position = "relative") : (e.style.left = "152px", e.style.top = Ruler.document.node(document.getElementById("collect-button")).y - (t ? Ruler.screen.rect().y2 : -7) - 6 + "px"), e.style.display = "block"), !1) : !1
    },
    off: function() {
        if (this.busy) {
            this.busy = 0;
            var e = document.getElementById("deviation-collect-bubble");
            e.style.display = "none"
        }
    },
    mouseup_handler: function(e) {
        var t = e.target || e.srcElement;
        !this.busy || "gmi-ResourceViewCollectButton" != t.id && "gmi-ResourceViewCollectButton" != t.parentNode.id && "gmi-ResourceViewCollectButton" != t.parentNode.parentNode.id || (this.ignore_onclick = 1), $(t).closest("#deviation-collect-bubble")[0] || this.busy && setTimeout(bind(this, this.off()), 500)
    },
    got: function() {},
    refresh: function() {},
    reset: function() {
        this.set("", "Request as Print"), GMI._delete(this)
    }
}), ResourceViewShare = GMIBase.extend({
    gmiConstructor: function() {
        var e = $("body"),
            t = this.$.find(".social-title"),
            i = this.$.find(".share-button"),
            s = i.filter(".more"),
            n = s.find(".deviation-share-links-dropdown"),
            a = t.text();
        i.on("mouseenter.share", function() {
            t.text($(this).data("title") || a)
        }).on("mouseleave.share", function() {
            t.text(a)
        }), n.on("mousedown.share", function() {
            return !1
        }), s.on("mousedown.share", function() {
            var t = s.toggleClass("active").hasClass("active");
            t ? (n.appendTo(e).css($(this).offset()).fadeIn(), Popup2.hideOverlayElements(n), setTimeout(function() {
                e.on("mousedown.share", function() {
                    s.hasClass("active") && s.trigger("mousedown.share")
                }), n.find("input.link").click()
            }, 0)) : (n.find("input").attr("selectionEnd", 0), n.hide().appendTo(s), Popup2.showOverlayElements(), e.off("mousedown.share"))
        }), this.gmiDestructor = function() {
            e.trigger("mousedown.share"), e.add(i).add(n).add(s).off(".share")
        }
    }
}), ResourceViewShareTumblr = GMIBase.extend({
    gmiConstructor: function() {
        this.$node = $(this.gmi_node), this.$node.click(function() {
            if ($(this).hasClass("tumblr-tab")) return !0;
            var e = $(this).data("deviation-id"),
                t = $(this).attr("openurl"),
                i = window.open("about:blank", "sharetumblr" + e, "toolbar=0,status=0,resizable=yes,width=450,height=480");
            return i ? (i.document.open(), i.document.write('<meta http-equiv="refresh" content="0; url=' + t + '">'), i.document.close(), !1) : !0
        })
    },
    gmiDestructor: function() {
        this.$node.unbind()
    }
}), window.DWait && DWait.run("jms/pages/superbrowse/resview/devbuttons.js");
window.GPageButton || (window.GPageButton = GMIBase.extend({
    gmiConstructor: function() {}
})), window.GMoodButton || (window.GMoodButton = GMIBase.extend({
    gmiConstructor: function() {}
})), window.DWait && DWait.run("jms/pages/superbrowse/resview/extras.js");
RESVIEW_OUTLINE = {
    gmiConstructor: function() {},
    gmiDestructor: function() {},
    deviationChangeView: function(e, t, i) {
        this.gmiUp().deviationChangeView(e, t, i)
    }
}, ResourcePageDisplayPane = GMIBase.extend(RESVIEW_OUTLINE), ResourcePageMetaPane = GMIBase.extend(RESVIEW_OUTLINE).extend({
    _last_view_mode: null,
    gmiConstructor: function() {
        this.$.find(":gmi(ResourceStream)").gmi(), this._track_scroll_and_view_mode()
    },
    gmiDestructor: function() {
        this._untrack_scroll_and_view_mode()
    },
    _track_scroll_and_view_mode: function() {
        this._untrack_scroll_and_view_mode(), Glbl("Minibrowse.opened") || PubSub.subscribe([{
            eventname: "MinibrowseView.restore_page",
            subscriber: this,
            callback: this._track_scroll_and_view_mode
        }]), $(window).on("scroll.T9129", $.debounce(500, this.handlers.onscroll.bindTo(this))), PubSub.subscribe([{
            eventname: "ResViewContainer.deviationChangeView",
            subscriber: window,
            callback: this.handlers.changed_view_mode.bindTo(this)
        }])
    },
    _untrack_scroll_and_view_mode: function() {
        Glbl("Minibrowse.opened") || PubSub.unsubscribe([{
            eventname: "MinibrowseView.restore_page",
            subscriber: this
        }]), $(window).off("scroll.T9129"), PubSub.unsubscribe([{
            eventname: "ResViewContainer.deviationChangeView",
            subscriber: window
        }])
    },
    handlers: {
        onscroll: function() {
            var e = $("#artist-comments").find(".text:first"),
                t = $("#gmi-ResViewContainer"),
                i = e.offset(),
                s = t.offset(),
                o = $(window).scrollTop(),
                n = $(window).height();
            if (i && s && e.length && t.length && !(20 > o)) for (var r = [{
                name: "t",
                offset: 0
            }, {
                name: "d",
                offset: i.top + e.outerHeight(!0)
            }, {
                name: "f",
                offset: t.offset().top + Math.floor(.9 * t.outerHeight(!0))
            }], h = r.length; h--;) if (o + n >= r[h].offset) {
                PubSub.publish("DaGa.track_event", {
                    category: "Deviation",
                    action: "page_scrolled",
                    label: "dst-" + r[h].name
                }), $(window).off("scroll.T9129");
                break
            }
        },
        changed_view_mode: function(e, t) {
            var i = t.full === !0 ? "fz" : t.full ? "f" : "n",
                s = this._last_view_mode || "n";
            this._last_view_mode = i, PubSub.publish("DaGa.track_event", {
                category: "Deviation",
                action: "view_mode_changed",
                label: "vmf-" + s + "_vmt-" + i
            })
        }
    }
}), ResourcePageAboutPane = GMIBase.extend(RESVIEW_OUTLINE), ResourcePageAd = GMIBase.extend({
    gmiConstructor: function() {
        this.position = bind(this, this.position), this.refresh2 = bind(this, this.refresh2), this.z = new AdZone([" ", " "], {
            section: "deviation"
        }, "300x250", this.gmi_args.timer || 8, null), this.z.frame_zone = this.gmi_args.frame_zone, this.z.no_ignores = 1, this.z.allow_key_changes = 1, this.z.no_refetch_while_busy = 1, this.z.always_flush_difi = 1, this.reset(300, 250, 0, 1), this.gmi_node.style.marginBottom = "7px", this.gmi_node.style.position = "relative"
    },
    gmiDestructor: function() {
        this.z.destructor(), delete this.z
    },
    reset: function(e, t, i, s) {
        var o;
        this.gmi_node.style.width = e + "px", this.gmi_node.style.height = t + "px", o = e + "x" + t, this.z.master_anchor = this.gmi_node, this.z.size = o, this.mature = i, s || this.refresh()
    },
    hide: function() {
        this.z.hide(), this.gmi_node.style.display = "none"
    },
    refresh: function(e, t, i) {
        if (void 0 != e) {
            if (this.last_id == e && t == this.mature) return;
            this.last_id = e
        }
        this.z.hide(), this.gmi_node.style.display = "block", void 0 != t && (this.mature = t), this.z.keys.catid = i || 0, this.z.keys.deviationid = e || 0, this.z.need(this.mature, 0), this.refresh2()
    },
    refresh2: function() {
        this.z.show(), this.z.position()
    },
    position: function(e) {
        e === !0 ? (this.z.hide(), this.z.position(), setTimeout(this.refresh2, 150)) : this.z.position()
    }
}), ResourcePageLowerAd = ResourcePageAd.extend({}), ResViewSizer_img = GMIBase.extend({
    gmiConstructor: function() {
        this.active = 1
    }
}), ResViewSizer_fullimg = ResViewSizer_img, ResViewSizer_cinemaplayer = GMIBase.extend({
    adjustTextAd: function() {
        $("body").hasClass("fullview") || $(".textbanner-ad").css("top", this.$.height() + 20)
    },
    gmiDestructor: function() {
        this.restoreTextAd()
    },
    restoreTextAd: function() {
        $("body").hasClass("fullview") || $(".textbanner-ad").css("top", "auto")
    }
}),
function() {
    var e = 0;
    window.ResourcePageBtfDockAd = GMIBase.extend({
        gmiConstructor: function() {
            this.$win = $(window), Browser.isPad || (this.event_ns = "scroll.BtfDockAd" + ++e, this.dock_padding_btm = 0, this.dock_padding_top = 12, this.$bubbleview = this.$.closest(".bubbleview"), vms_feature("new_devpage") ? (this.$rescontainer = this.$.closest(":gmi(DeviationPageView)"), this.$metapane = this.$rescontainer.find(".dev-view-meta")) : this.$rescontainer = this.$.closest("#gmi-ResViewContainer"), this.$bubbleview.length && (this.bv_cached_height = this.$bubbleview.height(), PubSub.publish("ResourcePageBtfDockAd.state_changed", {
                state: "relative",
                el: this.$
            }), this.bindScroll(this.normalScrollHandler)))
        },
        gmiDestructor: function() {
            this.unbindScroll()
        },
        bindScroll: function(e) {
            return DWait.ready("jms/lib/jquery/plugins/jquery.throttle-debounce.js", function() {
                this.$win.on(this.event_ns, $.throttle(100, e.bindTo(this)))
            }.bindTo(this)), this
        },
        unbindScroll: function() {
            return this.$win.off(this.event_ns), this
        },
        rebindScroll: function(e) {
            return this.unbindScroll().bindScroll(e)
        },
        sbClosed: function() {
            PubSub.unsubscribe({
                eventname: "Duperbrowse.closed",
                subscriber: this
            }), this.rebindScroll(this.normalScrollHandler)
        },
        sbOpen: function() {
            PubSub.subscribe({
                eventname: "Duperbrowse.closed",
                subscriber: this,
                callback: this.sbClosed
            }), this.unbindScroll()
        },
        readBounds: function() {
            if (!this.bounds || this.$bubbleview.height() != this.bv_cached_height) {
                if (this.bv_cached_height = this.$bubbleview.height(), !this.bv_cached_height) return this.sbOpen(), {
                    top: 0,
                    btm: 0,
                    h: 0
                };
                var e = this.$rescontainer.offset().top;
                if (this.bounds) {
                    var t = this.$.css("position"),
                        i = this.$.css("top");
                    this.$.css({
                        position: "relative",
                        top: "auto"
                    }), this.bounds.h = this.$.height(), this.bounds.top = this.$.offset().top - this.dock_padding_top, this.bounds.btm = e + this.$rescontainer.outerHeight() - this.dock_padding_top - this.bounds.h, this.$.css({
                        position: t,
                        top: i
                    })
                } else {
                    var s = this.$.height();
                    if ("none" === this.$.css("display") && (this.unbindScroll(), this.$.remove(), this.$ = $()), !s || !this.$.parent().length) return {
                        top: 0,
                        btm: 0,
                        h: 0
                    };
                    this.bounds = {
                        h: s,
                        top: this.$.offset().top - this.dock_padding_top,
                        btm: e + this.$rescontainer.outerHeight() - this.dock_padding_top - s
                    }
                }
                vms_feature("new_devpage") && (this.bounds.btm -= 15), this.bounds.able = this.bounds.btm - e > this.bounds.top
            }
            return this.bounds
        },
        normalScrollHandler: function() {
            var e = this.readBounds(),
                t = this.$win.scrollTop();
            e.able && t >= e.top && (this.$.css({
                position: "fixed",
                top: this.dock_padding_top
            }), this.rebindScroll(this.undockedScrollHandler), PubSub.publish("ResourcePageBtfDockAd.state_changed", {
                state: "fixed",
                el: this.$
            }), this.h1evt || (this.h1evt = !0, this.undockedScrollHandler()))
        },
        undockedScrollHandler: function() {
            var e = this.readBounds(),
                t = this.$win.scrollTop();
            t >= e.btm ? (vms_feature("new_devpage") ? this.$.css({
                position: "absolute",
                top: e.btm + this.dock_padding_btm - this.$metapane.offset().top
            }) : this.$.css({
                position: "absolute",
                top: e.btm + this.dock_padding_btm - this.$rescontainer.offset().top
            }), this.rebindScroll(this.btmdockScrollHandler), PubSub.publish("ResourcePageBtfDockAd.state_changed", {
                state: "absolute",
                el: this.$
            })) : e.top >= t && (this.$.css({
                position: "relative",
                top: "auto"
            }), this.rebindScroll(this.normalScrollHandler), PubSub.publish("ResourcePageBtfDockAd.state_changed", {
                state: "absolute",
                el: this.$
            }))
        },
        btmdockScrollHandler: function() {
            var e = this.readBounds(),
                t = this.$win.scrollTop();
            e.btm > t && (this.$.css({
                position: "fixed",
                top: this.dock_padding_top
            }), this.rebindScroll(this.undockedScrollHandler), PubSub.publish("ResourcePageBtfDockAd.state_changed", {
                state: "fixed",
                el: this.$
            }))
        }
    })
}(), window.DWait && DWait.run("jms/pages/superbrowse/resview/respage_components.js");
ResViewContainer = (window.GMIHub || GMIBase).extend({
    gmiConstructor: function() {
        vms_feature("no_super_browse") || (this.pre_body = !0, $(function() {
            this.pre_body = !1
        }.bindTo(this)), this.active = 1, this.mobile = Glbl("Site.is_mobile"), this.fullview_mode = $("body").hasClass("fullview"), this.previous_view = null, PubSub.subscribe([{
            eventname: "ResViewContainer.adjust",
            subscriber: this,
            callback: this.handlers.adjust,
            empty_queue_if_first_subscriber: !0
        }, {
            eventname: "DeviationExtras.loaded",
            subscriber: this,
            callback: this.handlers.adjust,
            empty_queue_if_first_subscriber: !0
        }]), this.viewer_node = this.gmiQuery("ResourcePageDisplayPane")[0].gmi_node, this.about_node = this.gmiQuery("ResourcePageAboutPane")[0].gmi_node, this.meta_node = this.gmiQuery("ResourcePageMetaPane")[0].gmi_node, this.$has_mobile_ad = !0, PubSub.publish("ResViewContainer.adjust"), deviantART.pageData.overlay_sponsor && (this.ad = ResViewContainer.ad, this.ad ? this.meta_node.firstChild && "gmi-ResourcePageAd" == this.meta_node.firstChild.getAttribute("id") && this.meta_node.replaceChild(this.ad.gmi_node, this.meta_node.firstChild) : this.ad = GMI.query("ResourcePageAd")[0]), this.updateDeviationPosition())
    },
    gmiDestructor: function() {
        var e;
        if (PubSub.unsubscribe([{
            eventname: "ResViewContainer.adjust",
            subscriber: this
        }, {
            eventname: "DeviationExtras.loaded",
            subscriber: this
        }]), $("#dv7.publisher").length) {
            var i = $(":gmi(ResViewContainer)").gmi()[0];
            i.view_locked = 0, PubSub.publish("ResViewContainer.adjust"), $(":gmi(ResourcePageMetaPane)").show(), $("#dv7").removeClass("publisher")
        }
        for (e in this.sizers) "resview" != e && GMI._delete(this.sizers[e], 1);
        void 0 !== this.artificial_view && (void 0 != this.previous_view && this.artificial_view !== this.previous_view && (this.deviationChangeView(this.previous_view, 1), this.previous_view = void 0), this.artificial_view = void 0), GMI._delete(this.gmiQuery("ResourcePageMLTPreviewClickTracker", null, 1)), GMI._delete(this.gmiQuery("ResourcePageBtfDockAd", null, 1)), GMI._delete(this.gmiQuery("ResViewSizer_cinemaplayer", null, 1)), GMI._delete(this.gmiQuery("DevMatureZone", null, 1)), GMI._delete(this.gmiQuery("FilmPlayer", null, 1)), GMI._delete(this.gmiQuery("ResourcePageDisplayPane", null, 1)), GMI._delete(this.gmiQuery("ResourcePageAboutPane", null, 1)), GMI._delete(this.gmiQuery("ResourcePageMetaPane", null, 1)), window.Keeper2 && window.da_current_film && Keeper2.deleteOne(da_current_film), this.ad && (ResViewContainer.ad = this.ad)
    },
    handlers: {
        adjust: function() {
            var e, i, t, s, r, o = $("#print_preview");
            if (this.canGoSuperWide(), this.autoViewChange(!0), o.length) {
                var a = o.closest("#deviation.shop-on-browse");
                e = a.is(":visible") ? o.width() + parseInt(a.css("margin-right"), 10) + "px" : null, this.gmi_node.style.minWidth = e
            }
            if (this.sizers = {
                resview: [this],
                img: this.gmiQuery("ResViewSizer_img"),
                fullimg: this.gmiQuery("ResViewSizer_fullimg")
            }, this.sizers.img[0]) {
                var n = Number((r = this.sizers.img[this.sizers.img.length - 1].gmi_node).getAttribute("width", 2)),
                    d = Number(r.getAttribute("height", 2)),
                    u = Number((r = (this.sizers.fullimg[this.sizers.fullimg.length - 1] || {}).gmi_node || r).getAttribute("width", 2)),
                    l = Number(r.getAttribute("height", 2));
                s = dsize_get(n, d, u, l, this.fullview_mode, this.pre_body);
                for (e in s) for (i = 0; i != this.sizers[e].length; i++) if ((r = this.sizers[e][i]) && r.active) {
                    if (!r.gmi_node) continue;
                    t = s[e] && s[e].y, (t == Number(t) || "IMG" == r.gmi_node.tagName) && (r.gmi_node.style.marginTop = t ? t + "px" : "auto");
                    var h = s[e] && s[e].w && !this.mobile ? s[e].w + "px" : "auto",
                        m = s[e] && s[e].h && !this.mobile ? Math.max(0, s[e].h) + "px" : "auto";
                    r.gmi_node.style.width = h, r.gmi_node.style["IMG" == r.gmi_node.tagName ? "height" : "minHeight"] = m, r.afterSize && r.afterSize()
                }
            } else for (e in this.sizers) for (i = 0; i != this.sizers[e].length; i++)(r = (this.sizers[e][i] || {}).gmi_node) && (r.style.width = "auto", r.style.height = "auto");
            this.btfad || (this.btfad = this.gmiQuery("ResourcePageBtfDockAd")[0] || null), this.ad && this.ad.position()
        }
    },
    canGoSuperWide: function() {
        return this.gmiQuery("ResViewSizer_fullimg")[0] && Number(this.gmiQuery("ResViewSizer_fullimg")[0].gmi_node.getAttribute("width", 2)) > Ruler.screen.rect().x2 ? ($("body").addClass("couldgosuperwide"), !0) : ($("body").removeClass("couldgosuperwide"), !1)
    },
    updateDeviationPosition: function() {
        this.fullview_mode || this.mobile ? this.meta_node.parentNode.insertBefore(this.viewer_node, this.meta_node) : this.about_node.parentNode.insertBefore(this.viewer_node, this.about_node), this.meta_node.style.display = "block"
    },
    shakeItBaby: function() {
        if (!Browser.isChrome) return !1;
        var e = $('<div style="position:absolute;background-color:transparent;left:0px;top:0px;width:100%;height:100%;z-index:100000;cursor:default;"></div>');
        $("body").append(e), setTimeout(function() {
            e.remove()
        }, 100)
    },
    deviationChangeView: function(e, i, t, s) {
        if (!this.touch_moved && !this.view_locked) {
            if (this.canGoSuperWide() && t && !e) {
                var r = $("body").hasClass("superwide");
                r ? (this.viewer_node.scrollLeft = 0, $("body").removeClass("superwide"), this.shakeItBaby()) : (e = !0, $("body").addClass("superwide"), this.shakeItBaby())
            }
            if (t && (PreviewStream.scrollTo(0), $(".dv-img-maxed-out").length)) return !1;
            t && void 0 != this.previous_view && (this.previous_view = e ? 1 : 0), e ? ($("body").addClass("fullview"), s && $("body").addClass("hiresview"), this.fullview_mode = !0) : ($("body, body>div.fullview, body>div.hiresview, body>div>div.hiresview").removeClass("hiresview").removeClass("fullview"), this.fullview_mode = !1), this.shakeItBaby(), this.updateDeviationPosition(), i || this.deviationViewChanged(), this.previous_view = e, PubSub.publish("ResViewContainer.deviationChangeView", {
                full: e,
                no_refresh: i,
                from_click: t,
                hi_res_required: s
            })
        }
    },
    deviationViewChanged: function(e) {
        var i;
        "deleted" != this.gmi_lifecycle && (window.Popup2 && Popup2.hideAll(), i = this.fullview_mode, PubSub.publish("ResViewContainer.adjust"), this.ad && !e && (i = !1, this.ad.position()))
    },
    autoViewChange: function(e) {
        var i, t, s, r, o, a, n;
        i = this.viewer_node, void 0 === this.artificial_view && (this.previous_view = this.fullview_mode ? 1 : 0), t = this.gmiQuery("ResViewSizer_fullimg")[0], s = this.gmiQuery("ResViewSizer_img")[0], t && (r = Number(t.gmi_node.getAttribute("width", 2)), o = Number(t.gmi_node.getAttribute("height", 2))), $(i).find(".journal-wrapper").length > 0 ? $(i).find(".journal-wrapper div[skinscript=fullview]").length ? ($(i).find(".journal-wrapper").addClass("journal-wrapper-fullview"), a = 1) : a = 0 : $(i).find("film,iframe,#news-special").length > 0 ? a = 1 : $(i).find(".filmspot").length > 0 ? a = 0 : (n = dsize_artificial_view(r, o, s ? Number(s.gmi_node.getAttribute("width", 2)) : 0, s ? Number(s.gmi_node.getAttribute("height", 2)) : 0, this.previous_view, this.ad), a = n.new_artificial_view), n && (n.upgrade_smallview || $("body").hasClass("superwide")) && t && s && (s.gmi_node.setAttribute("width", t.gmi_node.getAttribute("width", 2)), s.gmi_node.setAttribute("height", t.gmi_node.getAttribute("height", 2)), s.gmi_node.getAttribute("rs_src") ? s.gmi_node.setAttribute("rs_src", t.gmi_node.getAttribute("rs_src") || t.gmi_node.src) : s.gmi_node.src = t.gmi_node.getAttribute("rs_src") || t.gmi_node.src), n && this.$ && (n.enable_zoom ? this.$.removeClass("dv-img-maxed-out") : this.$.addClass("dv-img-maxed-out")), void 0 !== a && (a !== this.previous_view || void 0 !== this.artificial_view && a !== this.artificial_view) && (console.log("autoViewChange to", a), this.artificial_view = a, this.deviationChangeView(this.artificial_view, e, null, n && n.use_larger_image)), this.artificial_view = a
    },
    deviationSetPanes: function() {
        this.panes || (this.panes = 1)
    },
    deviationRemovePanes: function() {
        this.panes && (window.Keeper2 && window.da_current_film && (console.log("Removing Keeper2 Film instance"), Keeper2.deleteOne(da_current_film)), GMI._delete(GMI.query(this.preview_node, "FilmPlayer")))
    },
    reloadExtrasPane: function(e, i) {
        e = e || {}, this.deviationSetPanes(), this.deviationRemovePanes();
        var t = $([this.meta_node, this.about_node]),
            s = this,
            r = !1;
        t.fadeOut(300, function() {
            i && i(), r || (r = !0, s.panes = 0, s._reloadExtrasPane(e))
        })
    },
    _reloadExtrasPane: function(e) {
        var i = this,
            t = (Glbl("Site.is_deviantart") ? this.gmi_args.id : deviantART.pageData.privateid) || Glbl("Minibrowse.itemid");
        DiFi.pushPost("DeviationView", "getExtrasHTML", [t, "", e, {}], function(e, t) {
            if (e) {
                $([i.meta_node, i.about_node]).empty().show();
                var s = $("div#dv7"),
                    r = $(".resview7-about .sban-dyn", s),
                    o = $(".resview7-meta .sbmn-dyn", s),
                    a = t.response;
                r.length || (r = $(".resview7-about", s)), o.length || (o = $(".resview7-meta", s)), r.html(a.content.html_col1), o.html(a.content.html_col2), Glbl("Site.is_deviantart") ? PubSub.publish("MinibrowseView.init_extras", a) : PubSub.publish("DeviationExtras.loaded")
            } else PubSub.publish("MinibrowseView.populate_failed")
        }), DiFi.send(), this.deviationSetPanes()
    },
    _reloadMainPane: function() {
        var e = (Glbl("Site.is_deviantart") ? this.gmi_args.id : deviantART.pageData.privateid) || Glbl("Minibrowse.itemid");
        DiFi.pushPost("DeviationView", "getMainHTML", [e], bind(this, function(e, i) {
            e && (this.$.find(".resview7-view").html(i.response.content.html), window.gWebPage && gWebPage.update(i.response.content))
        })), DiFi.send()
    },
    hubRecv: function() {
        this._reloadMainPane()
    }
}), ResViewContainer.pictureClick = function(link, w, h) {
    var popup;
    if (Browser.isTouch) return !0;
    if (Browser.isChrome || Browser.isSafari) return window.open(link.href, null, "toolbar = 0, scrollbars = 1, location = 0, statusbar = 0, menubar = 0, resizable = 1, width= " + (w || 640) + ", height= " + (h || 480)), !1;
    if (popup = window.open("", null, "toolbar = 0, scrollbars = 1, location = 0, statusbar = 0, menubar = 0, resizable = 1, width= " + (w || 640) + ", height= " + (h || 480)), !popup) return !0;
    window.event && (event.cancelBubble = !0);
    var background_color = Glbl("Site.is_stash") ? "#888" : "#76827B";
    with(popup.document) open(), write('<html><body style="padding:0;margin:0;background:' + background_color + '"><img src="' + link.href.replace(/"/g, "&quot;") + '"></body></html>'), close();
    return popup.focus(), !1
}, DWait.ready([".domready", "jms/lib/jquery/plugins/jquery.throttle-debounce.js"], function() {
    $(":gmi(ResViewContainer)").gmi(), $(window).on("resize.resviewcontainer", $.throttle(50, function() {
        PubSub.publish("ResViewContainer.adjust")
    }))
}), window.DWait && DWait.run("jms/pages/superbrowse/resview/resview_container.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/location.js", ".domready"], function() {
    (function() {
        var e = Base.extend({
            purchase: null,
            padding: 15,
            scroll_time: 400,
            handlers: {
                scroll: function() {
                    this._get_purchase_from_url(), vms_feature("pcp_price") && this.purchase && this.purchase in this.openers && this.openers[this.purchase].call(this)
                }
            },
            openers: {
                prints: function() {
                    var e = this;
                    DWait.ready(["jms/shop/product-tabs-loader.js"], function() {
                        $("#print-button").click(), e.done_loading()
                    })
                },
                pcp: function() {
                    var e = vms_feature("new_devpage") ? $(".pdw_button_download") : $("#pdw_button_download");
                    if (e.length) {
                        var s = e.offset().top + e.parent().height() + this.padding,
                            a = $(window).height();
                        if (s > a) {
                            var t = $("html, body").animate({
                                scrollTop: s - a
                            }, this.scroll_time);
                            this._log("promise", t);
                            var r = this;
                            $.when(t).done(function() {
                                r._activate_pcp(e)
                            })
                        } else this._activate_pcp(e)
                    }
                }
            },
            constructor: function() {
                PubSub.subscribe([{
                    eventname: "PurchaseAutoload.scroll",
                    subscriber: this,
                    callback: this.handlers.scroll
                }, {
                    eventname: "Minibrowse.open",
                    subscriber: this,
                    callback: this._get_purchase_from_url
                }, {
                    eventname: "Minibrowse.preload",
                    subscriber: this,
                    callback: this._get_purchase_from_url
                }, {
                    eventname: "Minibrowse.next_click",
                    subscriber: this,
                    callback: this._get_purchase_from_url
                }, {
                    eventname: "Minibrowse.prev_click",
                    subscriber: this,
                    callback: this._get_purchase_from_url
                }, {
                    eventname: "Minibrowse.close",
                    subscriber: this,
                    callback: this._clear_purchase
                }])
            },
            _get_purchase_from_url: function() {
                this.purchase = (Glbl("Location.get_params") || {}).purchase, Glbl("PurchaseAutoload.purchase", this.purchase), this._log("purchase", this.purchase)
            },
            _clear_purchase: function() {
                Glbl.del("PurchaseAutoload.purchase")
            },
            done_loading: function() {
                PubSub.publish("PurchaseAutoload.loaded", this.purchase), this._clear_purchase()
            },
            _activate_pcp: function(e) {
                var s = this;
                e.parent().hasClass("already-downloaded") || DWait.ready(["jms/modals/purchase.js"], function() {
                    e.click(), s.done_loading()
                })
            },
            _log: function() {
                vms_feature("helloandre") && console.log("[PurchaseAutoload]", arguments)
            }
        });
        new e
    })(), window.DWait && DWait.run("jms/pages/art/purchase-autoloader.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/jquery/jquery.current.js", "jms/lib/jquery/plugins/jquery.throttle-debounce.js", ".domready"], function() {
    var e = !1,
        i = Base.extend({
            initialized: !1,
            is_mobile: !1,
            is_adblocked: !1,
            standard_ads: {
                atf: null,
                atfx: null,
                btf: null,
                text: null
            },
            minibrowse_ads: {
                mobile: null,
                text: null,
                atf: null,
                atfx: null,
                btf: null,
                say: null
            },
            constructor: function() {
                this.is_mobile = Glbl("Site.is_mobile");
                var e = (window.deviantART || {}).deviant || {};
                (!e.loggedIn || e.ads) && this.bind_pubsub_events()
            },
            bind_pubsub_events: function() {
                PubSub.subscribe([{
                    eventname: "DeviationAds.init",
                    subscriber: this,
                    callback: this.handlers.initialize
                }, {
                    eventname: "DeviationAds.minibrowse_init",
                    subscriber: this,
                    callback: this.handlers.initialize_minibrowse
                }, {
                    eventname: "DeviationAds.minibrowse_populate",
                    subscriber: this,
                    callback: this.handlers.populate_minibrowse
                }, {
                    eventname: "DeviationAds.minibrowse_destroy",
                    subscriber: this,
                    callback: this.handlers.destroy_minibrowse
                }, {
                    eventname: "DeviationAds.inline_editor_opening",
                    subscriber: this,
                    callback: this.handlers.ile_open
                }, {
                    eventname: "DeviationPageEditor.open",
                    subscriber: this,
                    callback: this.handlers.ile_open
                }, {
                    eventname: "InlineEditor.open",
                    subscriber: this,
                    callback: this.handlers.ile_open
                }, {
                    eventname: "DeviationAds.check_adblock",
                    subscriber: this,
                    callback: $.debounce(1e3, !0, this.handlers.track_adblock.bindTo(this))
                }])
            },
            unbind_pubsub_events: function() {
                PubSub.unsubscribe([{
                    eventname: "DeviationAds.init",
                    subscriber: this
                }, {
                    eventname: "DeviationAds.minibrowse_init",
                    subscriber: this
                }, {
                    eventname: "DeviationAds.minibrowse_populate",
                    subscriber: this
                }, {
                    eventname: "DeviationAds.minibrowse_destroy",
                    subscriber: this
                }, {
                    eventname: "DeviationAds.inline_editor_opening",
                    subscriber: this
                }, {
                    eventname: "DeviationPageEditor.open",
                    subscriber: this
                }, {
                    eventname: "InlineEditor.open",
                    subscriber: this
                }, {
                    eventname: "DeviationAds.check_adblock",
                    subscriber: this
                }])
            },
            for_each_ad: function(e, i) {
                if (i || "function" != typeof e || (i = e, e = !1), "function" == typeof i) {
                    if (!e || "standard" == e) for (var t in this.standard_ads) this.standard_ads.hasOwnProperty(t) && this.standard_ads[t] && i.call(this, this.standard_ads[t], t);
                    if (!e || "minibrowse" == e) for (var t in this.minibrowse_ads) this.minibrowse_ads.hasOwnProperty(t) && this.minibrowse_ads[t] && i.call(this, this.minibrowse_ads[t], t)
                }
            },
            for_each_minibrowse_ad: function(e) {
                this.for_each_ad("minibrowse", e)
            },
            for_each_standard_ad: function(e) {
                this.for_each_ad("standard", e)
            },
            handlers: {
                initialize: function() {
                    var i = ((deviantART || {}).pageData || {}).ads || {};
                    this.is_mobile || (ddt.log("DeviationAds", "- creating standard ads -"), i.deviation_banner_textad && (this.standard_ads.text = new r), i.atf_right_300x600 ? (this.standard_ads.atfx = new a, this.standard_ads.atfx.show_ad()) : (this.standard_ads.atf = new n, this.standard_ads.atf.show_ad()), i.saymedia_925x65 && (e = !0, Glbl("Ads.saymedia", !0)), this.standard_ads.btf = new o, this.standard_ads.btf.show_ad(), PubSub.unsubscribe({
                        eventname: "Duperbrowse.closed",
                        subscriber: this,
                        callback: this.handlers.initialize
                    }), PubSub.subscribe({
                        eventname: "Duperbrowse.opened",
                        subscriber: this,
                        callback: this.handlers.standard_duper_open
                    }))
                },
                standard_duper_open: function() {
                    ddt.log("DeviationAds", "- destroying standard ads -"), this.for_each_standard_ad(function(e, i) {
                        e.destroy(), this.standard_ads[i] = null
                    }), PubSub.unsubscribe({
                        eventname: "Duperbrowse.opened",
                        subscriber: this,
                        callback: this.handlers.standard_duper_open
                    }), PubSub.subscribe({
                        eventname: "Duperbrowse.closed",
                        subscriber: this,
                        callback: this.handlers.initialize
                    })
                },
                initialize_minibrowse: function() {
                    var e = !0;
                    this.initialized ? ddt.log("DeviationAds", "- showing minibrowse ads -") : (this.initialized = !0, e = !1, ddt.log("DeviationAds", "- creating minibrowse ads -"), this.is_mobile ? this.minibrowse_ads.mobile = new h : (this.minibrowse_ads.text = new l, this.minibrowse_ads.atf = new _, this.minibrowse_ads.atfx = new u, this.minibrowse_ads.btf = new b, this.minibrowse_ads.say = new p)), this.for_each_minibrowse_ad(function(i) {
                        e && i.clear_positioning_dom(), i.show_chrome()
                    })
                },
                populate_minibrowse: function(e, i) {
                    ddt.log("DeviationAds", "- populating minibrowse ads -");
                    var t = (i || {}).content || {}, s = t.ads || {};
                    this.for_each_minibrowse_ad(function(e, i) {
                        s[i] && e.show_ad(s[i])
                    })
                },
                destroy_minibrowse: function() {
                    this.initialized = !1, ddt.log("DeviationAds", "- destroying minibrowse ads -"), this.for_each_minibrowse_ad(function(e, i) {
                        e.destroy(), this.minibrowse_ads[i] = null
                    })
                },
                ile_open: function() {
                    ddt.log("DeviationAds", "- hiding all ads (ILE) -"), this.unbind_pubsub_events(), this.for_each_ad(function(e) {
                        e.hide_chrome()
                    }), PubSub.subscribe({
                        eventname: "InlineEditor.reset_overhead",
                        subscriber: this,
                        callback: this.handlers.ile_close
                    })
                },
                ile_close: function() {
                    PubSub.unsubscribe({
                        eventname: "InlineEditor.reset_overhead",
                        subscriber: this
                    }), this.bind_pubsub_events()
                },
                track_adblock: function(e, i) {
                    if (!this.is_adblocked) {
                        var t = i[0],
                            s = i[1] || t;
                        t && !this.is_adblocked && "none" === t.css("display") && (this.is_adblocked = !0, s.detach(), ddt.log("DeviationAds", "Destroyed ad spot because of Adblock."))
                    }
                    this.is_adblocked && PubSub.publish("DaGa.track_event_no_debounce", {
                        category: "Ads",
                        action: "adblocked"
                    })
                }
            }
        }),
        t = 0,
        s = Base.extend({
            css_class: null,
            uses_placeholder: !0,
            docking_pubsub_eventname: !1,
            $chrome: null,
            $placeholder: null,
            id: null,
            bound_events: !1,
            repositioning_ref: {},
            repositioning_retry_ct: 0,
            repositioning_timer: null,
            constructor: function() {
                this.id = "devAd" + ++t, this.log("instantiated")
            },
            show_ad: function() {
                this.show_chrome(), this.bind_positioning_events(), this.set_repositioning_retries(3), this.position_ad_on_placeholder()
            },
            show_chrome: function() {
                if (this.uses_placeholder) {
                    var e = this.get_placeholder();
                    if (e && PubSub.publish("DeviationAds.check_adblock", vms_feature("new_devpage") ? [e.parent()] : [e, this.get_chrome()]), !e || !e.is(":visible")) return this.hide_chrome()
                } else this.get_chrome().addClass("dp-ad-visible"), PubSub.publish("DeviationAds.check_adblock", [this.get_chrome()])
            },
            hide_chrome: function() {
                this.get_chrome().removeClass("dp-ad-visible")
            },
            position_ad_on_placeholder: function() {
                if (this.uses_placeholder) {
                    this.clear_repositioning_timeout();
                    var e = this.get_placeholder();
                    if (!e) return this.log("placeholder not found, waiting for re-check"), void 0;
                    var i = e.offset() || {
                        top: 0,
                        left: 0
                    };
                    if (!i.top || !i.left) return this.log("placeholder has invalid offset, waiting for recheck", i), void 0;
                    if (this.repositioning_ref = $.extend(!0, {}, i), vms_feature("new_devpage")) {
                        var t = e.closest(".dev-view-meta"),
                            s = t.position() || {
                                top: 0,
                                left: 0
                            }, n = t.offset() || {
                                top: 0,
                                left: 0
                            };
                        i.top = i.top - n.top + s.top
                    }
                    this.log(!0, "pos ref: ", this.repositioning_ref), this.get_chrome().addClass("dp-ad-visible").css({
                        top: i.top,
                        left: i.left
                    }), this.schedule_repositioning_recheck()
                }
            },
            set_repositioning_retries: function(e) {
                this.uses_placeholder && (this.repositioning_retry_ct = Math.max(3, parseInt(e, 10)) || 0)
            },
            schedule_repositioning_recheck: function() {
                if (this.repositioning_retry_ct) {
                    var e = 500;
                    2 == this.repositioning_retry_ct ? e = 2500 : 1 == this.repositioning_retry_ct && (e = 5e3), this.repositioning_retry_ct -= 1, this.repositioning_timer = setTimeout(this.handlers.reposition_from_timeout.bindTo(this), e)
                }
            },
            clear_repositioning_timeout: function() {
                this.repositioning_timer && clearTimeout(this.repositioning_timer), this.repositioning_timer = null
            },
            get_placeholder: function() {
                if (!this.$placeholder) {
                    var e = ".dp-ad-target." + this.css_class;
                    vms_feature("new_devpage") && (e += " > div"), this.$placeholder = this.get_parent().find(e), this.$placeholder.length || (this.$placeholder = !1)
                }
                return this.$placeholder
            },
            get_chrome: function() {
                return this.$chrome || (this.$chrome = this.get_parent().find(".dp-ad-chrome." + this.css_class)), this.$chrome
            },
            get_parent: function() {
                return vms_feature("new_devpage") ? $(".dev-page-container") : $("div#dv7")
            },
            bind_positioning_events: function() {
                return !this.uses_placeholder || this.bound_events ? !1 : (this.bound_events = !0, vms_feature("new_devpage") ? PubSub.subscribe([{
                    eventname: "DeviationPageView.changed_view_mode",
                    subscriber: this,
                    callback: this.handlers.reposition
                }, {
                    eventname: "DeviationExtras.shown",
                    subscriber: this,
                    callback: this.handlers.reposition
                }]) : PubSub.subscribe([{
                    eventname: "ResViewContainer.deviationChangeView",
                    subscriber: this,
                    callback: $.debounce(10, this.handlers.reposition.bindTo(this))
                }]), PubSub.subscribe([{
                    eventname: "ResViewContainer.adjust",
                    subscriber: this,
                    callback: $.throttle(100, this.handlers.reposition.bindTo(this))
                }, {
                    eventname: "ProductTabs.opened",
                    subscriber: this,
                    callback: this.handlers.reposition
                }, {
                    eventname: "ProductTabs.animating",
                    subscriber: this,
                    callback: this.handlers.hide_from_printtabs
                }, {
                    eventname: "ProductTabs.resized",
                    subscriber: this,
                    callback: this.handlers.show_from_printtabs
                }]), this.docking_pubsub_eventname && PubSub.subscribe({
                    eventname: this.docking_pubsub_eventname,
                    subscriber: this,
                    callback: this.handlers.reposition_from_dockable
                }), void 0)
            },
            unbind_positioning_events: function() {
                this.uses_placeholder && (this.bound_events = !1, PubSub.unsubscribe([{
                    eventname: "DeviationPageView.changed_view_mode",
                    subscriber: this
                }, {
                    eventname: "DeviationExtras.shown",
                    subscriber: this
                }, {
                    eventname: "ResViewContainer.deviationChangeView",
                    subscriber: this
                }, {
                    eventname: "ResViewContainer.adjust",
                    subscriber: this
                }, {
                    eventname: "ProductTabs.opened",
                    subscriber: this
                }, {
                    eventname: "ProductTabs.animating",
                    subscriber: this
                }, {
                    eventname: "ProductTabs.resized",
                    subscriber: this
                }]), this.docking_pubsub_eventname && PubSub.unsubscribe({
                    eventname: this.docking_pubsub_eventname,
                    subscriber: this
                }))
            },
            log: function() {
                var e = 0,
                    i = "DeviationAds";
                arguments[0] === !0 && (e = 1, i = "DeviationAdsPositioning");
                for (var t = [i, this.id + " (" + (this instanceof d ? "db" : "pv") + " " + this.css_class + "): "], s = arguments.length; s > e; ++e) t.push(arguments[e]);
                ddt.log.apply(ddt, t)
            },
            destroy: function() {
                this.clear_repositioning_timeout(), this.unbind_positioning_events(), this.clear_positioning_dom(), this.$chrome = null, this.log("destroyed")
            },
            clear_positioning_dom: function() {
                this.$placeholder = null
            },
            handlers: {
                reposition: function() {
                    this.clear_positioning_dom(), this.set_repositioning_retries(3), this.docking_pubsub_eventname ? this.handlers.reposition_from_dockable.apply(this) : this.position_ad_on_placeholder()
                },
                reposition_from_dockable: function() {
                    var e = this.get_placeholder();
                    if (!e) return this.log("reposition_dockable cancelled: could not find placeholder"), void 0;
                    if (vms_feature("new_devpage") && (e = e.parent()), this.log(!0, "reposition from dockable: " + e.css("position")), "fixed" == e.css("position")) {
                        this.clear_repositioning_timeout(), this.set_repositioning_retries(0);
                        var i = e.position();
                        this.get_chrome().css({
                            position: "fixed",
                            top: i.top,
                            left: i.left
                        })
                    } else this.get_chrome().css({
                        position: "absolute"
                    }), this.set_repositioning_retries(3), this.position_ad_on_placeholder()
                },
                reposition_from_timeout: function() {
                    var e = this.get_placeholder();
                    if (!e) return this.log("reposition_from_timeout cancelled: could not find placeholder"), this.schedule_repositioning_recheck(), void 0;
                    var i = e.offset() || {
                        top: 0,
                        left: 0
                    };
                    this.log(!0, "repositioning from timeout (retry attempt #" + (3 - this.repositioning_retry_ct) + "); cached top: " + this.repositioning_ref.top + "x" + this.repositioning_ref.left + ", actual: " + i.top + "x" + i.left), i.top != this.repositioning_ref.top || i.left != this.repositioning_ref.left ? (this.set_repositioning_retries(3), this.position_ad_on_placeholder()) : this.schedule_repositioning_recheck()
                },
                hide_from_printtabs: function() {
                    this.log(!0, "hiding from printtabs"), this.get_chrome().removeClass("dp-ad-visible")
                },
                show_from_printtabs: function() {
                    this.log(!0, "showing from printtabs"), this.get_chrome().addClass("dp-ad-visible"), this.handlers.reposition.call(this)
                }
            }
        }),
        n = s.extend({
            css_class: "atf-right-300x250"
        }),
        a = s.extend({
            css_class: "atf-right-300x600"
        }),
        o = s.extend({
            css_class: "btf-right-300x250",
            docking_pubsub_eventname: "ResourcePageBtfDockAd.state_changed"
        }),
        r = s.extend({
            css_class: "textbanner-ad",
            uses_placeholder: !1
        }),
        d = s.extend({
            ga_label: "",
            $wrapper_adsafe: null,
            $wrapper_mature: null,
            show_chrome: function() {
                this.base(), this.get_chrome().addClass("dp-ad-loading")
            },
            show_ad: function(e) {
                if (this.log("minibrowse ad show: adsafe = " + e.adsafe + ", suppress = " + e.suppress), this.should_hide_ad_based_on_response(e)) return this.get_chrome().removeClass("dp-ad-visible"), e.suppress && PubSub.publish("DaGa.track_event_no_debounce", {
                    category: "Deviation",
                    action: "ad_impressions_suppressed",
                    label: "ad-" + this.ga_label
                }), void 0;
                this.get_chrome().removeClass("dp-ad-loading"), this.get_wrapper(!e.adsafe).removeClass("dp-ad-wrapper-active");
                var i = this.get_wrapper(e.adsafe).addClass("dp-ad-wrapper-active"),
                    t = this.filter_content(e, i.children().length);
                if (t) {
                    var s = this.uses_placeholder && this.get_placeholder();
                    !s || s.parent().length ? i.html(t) : this.log("Prevented ad rendering due to Adblock")
                }
                this.bind_positioning_events(), this.set_repositioning_retries(3), this.position_ad_on_placeholder()
            },
            get_chrome: function() {
                return this.$chrome || (this.$chrome = $('<div class="dp-ad-chrome">').prependTo(this.get_parent()), this.css_class && this.$chrome.addClass(this.css_class)), this.$chrome
            },
            get_wrapper: function(e) {
                var i = "$wrapper_" + (e ? "adsafe" : "mature");
                return this[i] || (this[i] = $('<div class="dp-ad-wrapper">').prependTo(this.get_chrome())), this[i]
            },
            destroy: function() {
                this.base(), this.$wrapper_adsafe = null, this.$wrapper_mature = null
            },
            filter_content: function() {
                return !1
            },
            should_hide_ad_based_on_response: function(e) {
                return e.suppress || !e.content
            }
        }),
        h = d.extend({
            css_class: "mobile-ad",
            uses_placeholder: !1,
            filter_content: function(e) {
                return this.log("populating mobile ad"), e.content
            }
        }),
        l = d.extend({
            css_class: "textbanner-ad",
            ga_label: "txt",
            uses_placeholder: !1,
            should_hide_ad_based_on_response: function(e) {
                return e.suppress
            },
            filter_content: function(e, i) {
                if (i) return !1;
                if (e.adsafe) {
                    if (vms_feature("new_devpage")) var t = $(".dev-view-about", this.get_parent()).width() - 64;
                    else var t = $(":gmi(ResourcePageAboutPane)", this.get_parent()).width() - 64;
                    return e.content.replace('style="', 'style="max-width:' + t + "px;")
                }
                var s = "PubSub.publish('DaGa.track_event', {category: 'PremiumUpsell', action: 'TextAd' });PubSub.publish('DaGa.track_event_link', {event: event, element: this, category: 'Deviation', action: 'text_ad_upsell' });";
                return deviantART.deviant.loggedIn ? '<div style="text-align:center"><h2 style="margin:4px 0 0 0;"><a href="https://www.deviantart.com/checkout/?mx=premium&subpref=22870_0&point=critique" onclick="' + s + '">' + "Receive advanced feedback on your art with Critiques &#187;" + "</a>" + "</h2>" + '<a style="text-decoration:none;" href="https://www.deviantart.com/checkout/?mx=premium&subpref=22870_0&point=critique" onclick="' + s + '">' + "Upgrade to a deviantART Premium Membership today!" + "</a>" + "</div>" : '<div style="text-align:center"><h2 style="margin:4px 0 0 0;"><a href="http://www.deviantart.com/join/?joinpoint=Ads&utm_source=DA&utm_medium=banner-textad" onclick="' + s + '">' + "Join deviantART for FREE &raquo;" + "</a>" + "</h2>" + '<a style="text-decoration:none;" href="http://www.deviantart.com/join/?joinpoint=Ads&utm_source=DA&utm_medium=banner-textad" onclick="' + s + '">' + "Collect, Watch, Comment, Contribute. Join the world's largest art community today!" + "</a>" + "</div>"
            }
        }),
        c = d.extend({
            is_infinite: !1,
            is_timed: !1,
            last_serve: 0,
            last_pause: 0,
            constructor: function() {
                this.base(), ((deviantART || {}).deviant || {}).loggedIn ? this.is_timed = 3e4 : this.is_infinite = !0, this.log("persistent ad configured", {
                    is_infinite: this.is_infinite,
                    timer: this.is_timed
                })
            },
            show_chrome: function() {
                this.base(), this.is_timed && (this.last_pause = $.now())
            },
            filter_content: function(e, i) {
                if (i) {
                    if (this.is_infinite) return !1;
                    if (this.is_timed) {
                        var t = $.now(),
                            s = this.last_pause,
                            n = 2e3 + (s ? t - s : 0),
                            a = this.last_serve + n,
                            o = t - a,
                            r = this.is_timed;
                        return this.last_pause = 0, this.log("pause duration: ", n, "; time_since_last: ", o, "; min_time: ", r, "; should_refresh: ", o > r), o > r ? (this.last_serve = t, this.log("populating ad"), e.content) : !1
                    }
                }
                return this.is_timed && (this.last_serve = $.now()), this.log("populating ad"), e.content
            }
        }),
        _ = c.extend({
            css_class: "atf-right-300x250",
            ga_label: "atf"
        }),
        u = c.extend({
            css_class: "atf-right-300x600",
            ga_label: "atfx"
        }),
        b = c.extend({
            css_class: "btf-right-300x250",
            ga_label: "btf",
            docking_pubsub_eventname: "ResourcePageBtfDockAd.state_changed"
        }),
        p = d.extend({
            css_class: "saymedia-ad",
            uses_placeholder: !1,
            filter_content: function(i, t) {
                return e ? (this.log("ignoring saymedia ad, standard one already exists on underlying deviation page"), !1) : t ? (this.log("ignoring saymedia ad, one already exists"), !1) : (this.log("populating saymedia ad"), Glbl("Ads.saymedia", !0), i.content)
            }
        });
    new i, window.DWait && DWait.run("jms/pages/deviation/dev-page-ads.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/minibrowse.view.js", "jms/lib/difi.queue.js"], function() {
    (function(e) {
        var i = Base.extend({
            _main_html_dimensions_cache: {},
            _main_html_data_cache: {},
            _extras_html_data_cache: {},
            _itemid: null,
            _difi_queue: null,
            handlers: {
                open: function(i, s) {
                    var t = s,
                        a = "view",
                        n = "Minibrowse.preload" === i;
                    e.isPlainObject(s) && (t = s.id, a = s.mode || "view"), t && ("Minibrowse.open" == i && (this._is_it_too_fast(), this._itemid = t, Glbl("Minibrowse.opened", !0), Glbl("Minibrowse.mode", a), Glbl("Minibrowse.itemid", parseInt(t, 10)), PubSub.publish("Minibrowse.item_has_been_opened", t)), Glbl("Minibrowse.opened") && this._too_fast && !n ? (this._open_timeout && clearTimeout(this._open_timeout), this._open_timeout = setTimeout(function() {
                        this.handlers._open.call(this, t, a, n)
                    }.bindTo(this), 350)) : this.handlers._open.call(this, t, a, n))
                },
                _open: function(e, i, s) {
                    if (this._itemid == e || s) {
                        var t = {};
                        Glbl("Duperbrowse.preload_active") > 1 && (t.current_id = Glbl("Minibrowse.itemid")), s && (t.preload = !0), s || PubSub.publish("MinibrowseView.take_over_page"), "edit" == i ? t.edit = 1 : void 0 !== this._main_html_dimensions_cache[e] ? this.handlers._main_html_loaded.call(this, !0, this._simulate_main_html_loaded_from_dimensions(e, this._main_html_dimensions_cache[e].width, this._main_html_dimensions_cache[e].height, this._main_html_dimensions_cache[e].src, this._main_html_dimensions_cache[e].full_src, this._main_html_dimensions_cache[e].full_width, this._main_html_dimensions_cache[e].full_height, this._main_html_dimensions_cache[e].transparent), s) : this._main_html_data_cache[e] ? this.handlers._main_html_loaded.call(this, !0, this._main_html_data_cache[e], s) : this._difi_queue.push("post", "DeviationView", "getMainHTML", [e], function(e, i) {
                            this.handlers._main_html_loaded.call(this, e, i, s)
                        }.bindTo(this)), void 0 !== this._extras_html_data_cache[e] && void 0 !== this._extras_html_data_cache[e][i] ? this.handlers._extras_html_loaded.call(this, !0, this._extras_html_data_cache[e][i], s) : this._difi_queue.push("post", "DeviationView", "getExtrasHTML", [e, "", t, {}], function(e, i) {
                            this.handlers._extras_html_loaded.call(this, e, i, s)
                        }.bindTo(this)), this._difi_queue.send(s ? "preload" : "default")
                    }
                },
                cache_main_html_dimensions: function(e, i) {
                    this._main_html_dimensions_cache[i.id] = i
                },
                uncache: function(e, i) {
                    void 0 !== this._main_html_dimensions_cache[i] && delete this._main_html_dimensions_cache[i], void 0 !== this._main_html_data_cache[i] && delete this._main_html_data_cache[i], void 0 !== this._extras_html_data_cache[i] && delete this._extras_html_data_cache[i]
                },
                close: function() {
                    Glbl("Minibrowse.opened", !1), Glbl.del("Minibrowse.mode"), Glbl.del("Minibrowse.itemid"), PubSub.publish("MinibrowseView.restore_page"), PubSub.publish("Minibrowse.closed")
                },
                _main_html_loaded: function(e, i, s) {
                    e && i && i.response ? (void 0 === i.simulated && (this._main_html_data_cache[i.request.args[0]] = i), s ? PubSub.publish("MinibrowseView.preload_main", i.response) : parseInt(i.request.args[0], 10) === Glbl("Minibrowse.itemid") && PubSub.publish("MinibrowseView.populate_main", i.response)) : PubSub.publish("MinibrowseView.populate_failed", {
                        which: "main"
                    })
                },
                _extras_html_loaded: function(i, s, t) {
                    if (i) {
                        try {
                            if (s.response.content.pageData.deviant.loggedIn !== deviantART.deviant.loggedIn) return window.location.reload(), void 0
                        } catch (a) {}
                        this._extras_html_data_cache[s.request.args[0]] = {};
                        var n = void 0 !== s.request.args[2].edit;
                        n ? this._extras_html_data_cache[s.request.args[0]].edit = s : this._extras_html_data_cache[s.request.args[0]].view = s, t ? PubSub.publish("MinibrowseView.preload_extra", s.response) : parseInt(s.request.args[0], 10) === Glbl("Minibrowse.itemid") && PubSub.publish("MinibrowseView.populate_extra", e.extend(s.response, {
                            edit: n
                        })), PubSub.publish("Minibrowse.extras_loaded")
                    } else PubSub.publish("MinibrowseView.populate_failed", {
                        which: "extras"
                    })
                },
                reload_extras: function(e, i) {
                    var s = !1;
                    this._difi_queue.push("post", "DeviationView", "getExtrasHTML", [i.itemid, "", i.extras_parameters, {}], function(e, i) {
                        this.handlers._extras_html_loaded.call(this, e, i, s)
                    }.bindTo(this)), this._difi_queue.send("default")
                }
            },
            constructor: function() {
                this._difi_queue = new DiFiQueue({
                    active_buffer_size: 1,
                    queue_callback: function(e) {
                        for (var i = [], s = e.length - 1; s >= 0; --s) if ("default" == e[s].group) {
                            i.push(e[s]);
                            break
                        }
                        return 0 === i.length && e.length > 0 && i.push(e[e.length - 1]), i
                    }
                }), PubSub.subscribe([{
                    eventname: "Minibrowse.open",
                    subscriber: this,
                    callback: this.handlers.open
                }, {
                    eventname: "Minibrowse.close",
                    subscriber: this,
                    callback: this.handlers.close
                }, {
                    eventname: "Minibrowse.cache_main_html_dimensions",
                    subscriber: this,
                    callback: this.handlers.cache_main_html_dimensions
                }, {
                    eventname: "Minibrowse.uncache",
                    subscriber: this,
                    callback: this.handlers.uncache
                }, {
                    eventname: "Minibrowse.preload",
                    subscriber: this,
                    callback: this.handlers.open
                }, {
                    eventname: "Minibrowse.reload_extras",
                    subscriber: this,
                    callback: this.handlers.reload_extras
                }])
            },
            _simulate_main_html_loaded_from_dimensions: function(e, i, s, t, a, n, _, l) {
                a || (a = t, n = i, _ = s), Glbl("Site.is_mobile") && (i = "auto", s = "auto", n = "auto", _ = "auto");
                var h = "no-lub";
                if (Glbl("Site.is_deviantart") && (h = ""), vms_feature("new_devpage")) var o = '<img collect_rid="1:' + e + '" src="' + t + '"  width="' + i + '" height="' + s + '" alt="" class="dev-content-normal" >' + '<img collect_rid="1:' + e + '" src="' + a + '"  width="' + n + '" height="' + _ + '" alt="" class="dev-content-full" >';
                else var o = '<div id="zoomed-in" class="' + h + '">' + '<img  name="gmi-ResViewSizer_img" id="gmi-ResViewSizer_img" data-gmiclass="ResViewSizer_img" ' + "onclick=\"DWait.readyLink('jms/pages/superbrowse/resview/respage_components.js', this, function () { GMI.up(this, 'ResourcePageDisplayPane').deviationChangeView(1,0,1,1) })\" " + 'collect_rid="1:' + e + '" src="' + t + '"  width="' + i + '" height="' + s + '" alt="" ' + (l ? "" : 'class="smshadow"') + " >" + '<img  name="gmi-ResViewSizer_fullimg" id="gmi-ResViewSizer_fullimg" data-gmiclass="ResViewSizer_fullimg" ' + "onclick=\"GMI.up(this, 'ResourcePageDisplayPane').deviationChangeView(0,0,1) \" " + 'collect_rid="1:' + e + '" src="' + a + '"  width="' + n + '" height="' + _ + '" alt="" class="fullview' + (l ? "" : " smshadow") + '">' + "</div>";
                var r = {
                    deviation_preload_type: "image",
                    deviationid: e
                };
                return {
                    simulated: !0,
                    request: {
                        args: [e]
                    },
                    response: {
                        content: {
                            html: o,
                            pageData: r
                        }
                    }
                }
            },
            _is_it_too_fast: function() {
                if (void 0 === this._last_open_call) this._last_open_call = e.now();
                else {
                    var i = e.now() - this._last_open_call;
                    350 > i ? this._too_fast = !0 : i > 450 && (this._too_fast = !1), this._last_open_call = e.now()
                }
            }
        });
        new i
    })(jQuery), window.DWait && DWait.run("jms/lib/minibrowse.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/pubsub.js"], function() {
    (function(e) {
        var i = Base.extend({
            debugging: !1,
            _canonical_dv7: null,
            _canonical_dv7_placeholder: null,
            _saved_title: "",
            constructor: function() {
                this.debugging = vms_feature("dre") && vms_feature("no_js_compression") && vms_feature("spamalot"), PubSub.subscribe([{
                    eventname: "MinibrowseView.take_over_page",
                    subscriber: this,
                    callback: this.handlers.take_over_page
                }, {
                    eventname: "MinibrowseView.restore_page",
                    subscriber: this,
                    callback: this.handlers.restore_page
                }, {
                    eventname: "MinibrowseView.populate_main",
                    subscriber: this,
                    callback: this.handlers.populate_main
                }])
            },
            handlers: {
                take_over_page: function() {
                    !this._saved_title && document.title && (this._saved_title = document.title), this._clear_page(), e("body > div#output").hide();
                    var i = this._get_container();
                    if (i.length || (this.debugging && console.log("[MinibrowseView] creating new #dv7 element"), vms_feature("new_devpage") ? (i = e('<div class="dev-page-container bubbleview minibrowse-container"></div>'), this._canonical_dv7 = e("div#output > div.dev-page-container")) : (i = e('<div id="dv7" class="bubbleview dv7-dyn"></div>'), this._canonical_dv7 = e("div#output > div#dv7")), this._canonical_dv7.length ? (this._canonical_dv7_placeholder = e('<div style="display: none;"></div>').insertAfter(this._canonical_dv7), this._canonical_dv7.detach()) : this._canonical_dv7 = null, i.appendTo("body")), vms_feature("new_devpage")) {
                        var a = Boolean((deviantART.pageData.user || {}).fullview_all),
                            n = vms_feature("new_devpage_shelf"),
                            t = "dev-page-view view-mode-normal" + (vms_feature("frankenpage") ? " frankenpage" : ""),
                            s = '<div class="' + t + '" data-gmiclass="DeviationPageView">';
                        s += a ? '<div class="dev-view-deviation"></div><div class="dev-view-meta"><div class="dev-view-meta-content"></div></div>' : '<div class="dev-view-meta"><div class="dev-view-meta-content"></div></div><div class="dev-view-deviation"></div>', s += '<div class="dev-view-about"><div class="dev-about-bg-border"><div class="dev-about-bg-gradient"></div></div><div class="dev-view-about-content"></div></div><div class="dev-right-col-bg"></div><div style="clear:both;"></div></div>', e(s).toggleClass("dev-page-shelf", n).appendTo(i)
                    } else e('<div id="gmi-ResViewContainer" name="gmi-ResViewContainer"><div id="gmi-ResourcePageMetaPane" class="resview7-meta" name="gmi-ResourcePageMetaPane"><div class="sbmn-dyn"></div></div> <!-- #gmi-ResourcePageMetaPane --><div id="gmi-ResourcePageDisplayPane" class="resview7-view" name="gmi-ResourcePageDisplayPane"></div> <!-- #gmi-ResourcePageDisplayPane --><div id="gmi-ResourcePageAboutPane" class="resview7-about" name="gmi-ResourcePageAboutPane"><div class="sban-dyn"></div></div> <!-- #gmi-ResourcePageAboutPane --><div style="clear:both;"></div></div> <!-- #gmi-ResViewContainer -->').appendTo(i);
                    setTimeout(function() {
                        e(window).scrollTop(0)
                    }, 1)
                },
                restore_page: function() {
                    e("body > div#output").show(), this._clear_page(!0), this._saved_title && (document.title = this._saved_title), this._saved_title = null
                },
                populate_main: function(i, a) {
                    if (this.debugging && console.log("[MinibrowseView] populate main", a), !a.content || !e.isPlainObject(a.content)) return PubSub.publish("MinibrowseView.populate_failed", {
                        which: "main"
                    }), void 0;
                    var n = Boolean((deviantART.pageData.user || {}).fullview_all);
                    e("body").removeClass("superwide").toggleClass("fullview", n);
                    var t, s = vms_feature("new_devpage") ? ".dev-view-deviation" : ".resview7-view";
                    this._get_container().find(s).html(a.content.html), vms_feature("new_devpage") && (t = e(":gmi(DeviationPageView)").toggleClass("view-mode-full", n).toggleClass("view-mode-normal", !n), t.gmiAttr("deviationid", a.content.pageData.deviationid)), void 0 !== a.content && gWebPage.update(a.content), vms_feature("new_devpage") ? t.gmi() : e(":gmi(ResViewContainer)").gmi()
                }
            },
            _clear_page: function(e) {
                var i = this._get_container();
                e ? (PubSub.publish("DeviationAds.minibrowse_destroy"), this._canonical_dv7 && this._canonical_dv7_placeholder && (this._canonical_dv7_placeholder.replaceWith(this._canonical_dv7), this._canonical_dv7 = this._canonical_dv7_placeholder = null), i.remove()) : i.children().not(".dp-ad-chrome").remove()
            },
            _get_container: function() {
                return vms_feature("new_devpage") ? e(".dev-page-container.minibrowse-container") : e("body > div#dv7")
            }
        });
        new i;
        var a = {
            factory: function(e, a) {
                vms_feature("dre") && vms_feature("no_js_compression") && vms_feature("spamalot") && console.log("[MinibrowseView] creating view", a);
                var n = i.extend(a);
                new n
            }
        };
        PubSub.subscribe({
            eventname: "MinibrowseView.js_factory",
            subscriber: a,
            callback: a.factory
        })
    })(jQuery), window.DWait && DWait.run("jms/lib/minibrowse.view.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/lib/difi.js"], function() {
    (function(e, i) {
        var t = Base.extend({
            pushes: [],
            group: null,
            wait: !1,
            _timer: null,
            _deferred: null,
            _killed: !1,
            constructor: function(e, i, t) {
                this.pushes = e, this.group = i, this.wait = t
            },
            merge: function(e) {
                for (var i = this.pushes, t = 0, s = e.length; s > t; t++) i = i.concat(e[t].pushes);
                return this.pushes = i, this
            },
            promise: function() {
                this.deferred = e.Deferred();
                for (var i = 0, t = this.pushes.length; t > i; i++) DiFi.push.apply(DiFi, this._wrap_difi(this.pushes[i], this.deferred));
                return this.wait ? DiFi.timer(this.wait) : DiFi.send(), this._timer = setTimeout(this._kill.bindTo(this), 6e4), this.deferred.promise()
            },
            _kill: function() {
                this.deferred && "pending" === this.deferred.state() && (this.deferred.resolve("killed"), this._killed = !0, console.log("[DiFi] Request killed after timeout")), clearTimeout(this._timer), this._timer = null
            },
            _wrap_difi: function(i, t) {
                var s = i[4],
                    u = i[5],
                    r = {
                        request: void 0,
                        response: {
                            status: "NOEXEC_HALT",
                            content: {
                                error: "Request timed out",
                                details: "Request timed out and was killed",
                                human: "The request took too long and was cancelled, please try later"
                            }
                        }
                    };
                return e.isFunction(s) && (i[4] = function(e, i) {
                    return this._killed ? (s.call(u || null, !1, r), void 0) : (s.call(u || null, e, i), t.resolve(e), void 0)
                }.bindTo(this)), i
            }
        });
        i.DiFiQueue = Base.extend({
            _buffer: [],
            _active_buffer: [],
            _push_queue: [],
            options: {},
            constructor: function(i) {
                var t = {
                    active_buffer_size: 1,
                    queue_callback: null,
                    wait_for_more: !1
                };
                this.options = e.extend(t, i), this._buffer = [], this._active_buffer = [], this._push_queue = []
            },
            push: function(e, i, t, s, u, r) {
                this._push_queue.push([e, i, t, s, u, r])
            },
            send: function(e) {
                e = e || "default", 0 !== this._push_queue.length && (this._buffer.push(new t(this._push_queue, e, this.options.wait_for_more)), this._push_queue = [], this._waiting() || this._flush())
            },
            _flush: function(e) {
                if (e && this.options.queue_callback && (this._buffer = this.options.queue_callback(this._buffer)), 0 !== this._buffer.length && !this._waiting()) {
                    var i = this._buffer[0].merge(this._buffer.slice(1));
                    this._active_buffer.push(i.promise().done(this._handle.bindTo(this))), this._buffer = []
                }
            },
            _handle: function() {
                this._active_buffer = e.map(this._active_buffer, function(e) {
                    return "pending" === e.state() ? e : void 0
                }), this._flush(!0)
            },
            _waiting: function() {
                return this._active_buffer.length >= this.options.active_buffer_size
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/lib/difi.queue.js")
});
DiFiHolder = {
    up: function() {
        this.count = (this.count || 0) + 1, 1 == this.count && this.on()
    },
    down: function() {
        this.count = (this.count || 0) - 1, this.count || this.off()
    },
    downWithCallback: function() {
        DiFiHolder.down(), DiFi.stdErrCallback.apply(this, arguments)
    },
    getStdCallback: function() {
        return this.up(), this.downWithCallback
    },
    on: function() {
        DiFiHolder.on_please = 1, setTimeout(DiFiHolder.on2, 1)
    },
    on2: function() {
        DiFiHolder.on_please && Events.hook(document.body, "click", DiFiHolder.click)
    },
    off: function() {
        DiFiHolder.on_please = 0, Events.unhook(document.body, "click", this.click), this.queued_click && (window.location.href = this.queued_click, this.queued_click = null)
    },
    click: function(i) {
        var t, e, n, o;
        if (i = i || window.event, i.ctrlKey || i.metaKey || i.altKey || i.shiftKey) return !0;
        for (t = i.target || i.srcElement; t && "A" != t.tagName;) if (!(t = t.parentNode)) return !0;
        return e = t.href || "", n = t.href.indexOf("#"), o = window.location.href.split("#"), !e || n >= 0 && 3 > n || 0 == e.indexOf(o[0] + "#") || o[0] == e ? !0 : DiFiHolder.queued_click == e ? DiFiHolder.impatience(e) : (DiFiHolder.queued_click = e, t.style.cursor = "wait", DiFi.timer(1), !1)
    },
    impatience: function(i) {
        return !i || confirm("This page is still saving.\n\nAre you sure you want to go to a different page?")
    }
}, window.DWait && DWait.run("jms/lib/difi_hold.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/Base.js", "jms/pages/lub/lub_constants.js", "jms/lib/ddd.utils.js"], function() {
    ResourceComms = new(Base.extend({
        ready: !1,
        constructor: function() {
            DWait.ready(".jqready", function() {
                this.ready = !0
            }.bindTo(this)), document.documentElement.onmousedown = this.mouseDown.bindTo(this)
        },
        broadcastPrepareClones: function(e) {
            var t, a, r, s, i, d;
            for (s = [], t = 0; a = e[t]; t++) a && "object" == typeof a[2] ? ((i = GMI.query(a[2], "GalleryArrowMenu")[0]) && (d = i.gmi_node.parentNode, d.removeChild(i.gmi_node)), r = a[2].cloneNode(!0), (eax = r.getElementsByTagName("img")[0]) && Station.apply(eax, "opacity", 1), s.push([a[0], a[1], r]), i && d && d.insertBefore(i.gmi_node, d.firstChild)) : s.push(a);
            return s
        },
        broadcastDataSplice: function(e, t, a, r) {
            var s, i, d;
            for (r = r || [], s = this.getEveryone(e ? {
                match: e
            } : null), i = 0; i != s.length; i++) {
                for (d = 0; d != r.length; d++) if (r[d] == s[i]) {
                    d = -1;
                    break
                } - 1 != d && (t[2] && s[i] != a && (t[2] = this.broadcastPrepareClones(t[2])), s[i].dataSplice.apply(s[i], t))
            }
        },
        mouseDown: function(e) {
            var t, a;
            if (e = e || window.event, a = e.target || e.srcElement, !this.ready) return !0;
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button > 1) return !0;
            if ($(a).hasClass("dwaiting")) return !0;
            if (document.body.className.indexOf("modal-active") >= 0) return !0;
            for (; a && a != this.gmi_node;) {
                if (1 == a.nodeType && (t = a.getAttribute("collect_rid")) && !$(a).hasClass("tt-special") && (this.clicked_stream = GMI.up(a), this.clicked_stream && ("gmi-StashThumb" == this.clicked_stream.gmi_node.id && (this.clicked_stream = GMI.up(this.clicked_stream.gmi_node)), !(!this.clicked_stream || window.PreviewStream && this.clicked_stream instanceof PreviewStream || window.StashStream && this.clicked_stream instanceof StashStream || "function" != typeof this.clicked_stream.dataSplice)))) {
                    if (window.DDD && DDD.mouseDown.call(a, e, this)) return this.dragged_rid = t.split(":"), this.dragged_rid[0] = Number(this.dragged_rid[0]), this.dragged_rid[1] = Number(this.dragged_rid[1]), e.cancelBubble = !0, e.returnValue = !1, e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault(), !1;
                    break
                }
                a = a.parentNode
            }
        },
        ddd: {
            snap: function(e) {
                var t, a, r, s, i, d, o, n, c, h = function(e) {
                    e.drag_data = {
                        rects: [],
                        selected: [],
                        selected_details: [],
                        surfers: [],
                        share: null
                    }
                };
                if ("gmi-StashStream" == this.clicked_stream.gmi_node.id) return h(this);
                this.clicked_stream.selector && (i = this.clicked_stream.selector.getSelection()), i && i.length || (i = [this.getStreamNode(this.clicked_stream, this.ddd.node) || this.ddd.node]), d = this.clicked_stream.domFindVisible(), c = [];
                for (t in d) for (a = 0; a != i.length; a++) d[t] == i[a] && c.push(this.clicked_stream.contents[t]);
                if (i.length != c.length) throw h(this), Error("Selection Mismatch");
                for (this.drag_data = {
                    rects: [],
                    selected: i,
                    selected_details: c,
                    surfers: []
                }, r = this.getEveryone(), t = 0; s = r[t]; t++) {
                    if (o = s.commsAskForTargetsEnh(this.clicked_stream, i, c), o === !1 && s == this.clicked_stream) return h(this);
                    this.drag_data.rects = this.drag_data.rects.concat(o), o.length && s == this.clicked_stream && (n = 1)
                }
                for (t = 0; t != i.length; t++) this.drag_data.surfers.push(this.createSurfer(e, this.clicked_stream, c[t], i[t]));
                for (t = 0; eax = this.drag_data.surfers[t]; t++) eax.node.style.display = "block";
                DDDUtils.mix(this), this.dddTickStart(e), 1 != c.length || !window.da_minish_lub || n && !da_minish_lub.out ? this.drag_data.share = null : (this.drag_data.share = window.da_minish_lub, this.drag_data.share.init(), this.drag_data.shared_rid = c[0], this.drag_data.share.ddd.node = this.ddd.node, this.drag_data.share.ddd.snap.call(this.drag_data.share, e, this, this.drag_data.shared_rid, this.drag_data.surfers[0]))
            },
            drag: function(e, t) {
                var a, r, s;
                if (DDD.subject) {
                    if (e && this.dddTickUpdate && this.dddTickUpdate(e), a = (new Date).valueOf(), "object" == typeof e) this.drag_event_cache = {
                        clientX: e.clientX,
                        clientY: e.clientY,
                        x: e.x,
                        y: e.y
                    };
                    else if (e = this.drag_event_cache, !e) return;
                    for (s = 0; r = this.drag_data.surfers[s]; s++) Surfer.update(r, e);
                    if (!(500 > a - this.drag_snap_time)) {
                        if (100 > a - (this.drag_lores_time || 0) && !t) return this.drag_lores_timer || (this.drag_lores_timer = setTimeout(bind.cache(this, this.ddd.drag), 100)), void 0;
                        this.drag_lores_timer = null, this.drag_lores_time = a;
                        var i;
                        this.drag_data.hover && (this.drag_data.hover.owner.commsDragHover(this.clicked_stream, this.drag_data.hover, !1, !1, this.drag_data.surfers), this.drag_data.hover = null), i = Ruler.hitTest(Ruler.document.pointer(e), this.drag_data.rects, this.clicked_stream.hit_rect), null !== i && (this.drag_data.hover = this.drag_data.rects[i], this.drag_data.hover.owner.commsDragHover(this.clicked_stream, this.drag_data.hover, !0, !1, this.drag_data.surfers)), this.drag_data.share ? (this.drag_data.share.ddd.drag.call(this.drag_data.share, e, this, this.drag_data.shared_rid), this.drag_data.top_drag_offset = 230) : this.drag_data.top_drag_offset = 0
                    }
                }
            },
            drop: function(e) {
                var t, a, r, s, i;
                if (this.dddTickEnd && this.dddTickEnd(e), this.drag_lores_timer && (clearTimeout(this.drag_lores_timer), this.drag_lores_timer = null), this.drag_data.share && (i = this.drag_data.share.ddd.drop.call(this.drag_data.share, e, this, this.drag_data.shared_rid))) return this.drag_data = {}, !0;
                if (this.drag_data.hover && (t = this.drag_data.hover.owner, t.commsDragHover(this.clicked_stream, this.drag_data.hover, !1, !0, this.drag_data.surfers), a = this.drag_data.selected_details, t != this.clicked_stream && (a = this.broadcastPrepareClones(a)), t.commsRecvDrop(this.clicked_stream, a, this.drag_data.hover), this.drag_data.hover = null, t != this.clicked_stream)) for (r = 0; s = this.drag_data.surfers[r]; r++) Surfer.dissolve(s, e);
                else for (r = 0; s = this.drag_data.surfers[r]; r++) Surfer.flyHome(s, e)
            }
        },
        getStreamNode: function(e, t) {
            if (e.get_stream_node_from_clicked_node) return e.get_stream_node_from_clicked_node(t);
            for (; t && t.parentNode != e.gmi_node;) t = t.parentNode;
            return t
        },
        getEveryone: function(e) {
            return GMI.query("EditableResourceStream", e).concat(GMI.query("EditableResourceStack", e)).concat(GMI.query("EditableResourceTV", e)).concat(GMI.query("EditableFolderStream", e)).concat(GMI.query("EditableResourceCustomIcon", e)).concat(GMI.query("GPageButton"))
        },
        createSurfer: function(e, t, a, r) {
            var s, i, d, o, n, c, h;
            if (t.commsMakeCustomSurfer && (s = t.commsMakeCustomSurfer(e, a, r))) return s;
            switch (Number(a[0])) {
                case RESOURCE_DEVIATION:
                    if (img = (r.getElementsByTagName("img") || [])[0] || r, $(img).hasClass("lit")) {
                        r = $(r).find("span").get(0);
                        var l = $(r).find(".gmbutton2, .details, .t, small").hide(),
                            m = $(this.ddd.node).find(".shadow"),
                            g = m.css("background-image");
                        m.css("background-image", ""), s = Surfer.create(e, r, 1, void 0, !0), m.css("background-image", g), l.show();
                        break
                    }
                    s = Surfer.create(e, img);
                    var _ = $("body.maturefilter").length && ($(e.target).hasClass("ismature") || $(".ismature", e.target).length);
                    _ && (s.node.setAttribute("src", "http://s.deviantart.net/minish/icons/blank.gif"), s.node.style.background = "url(http://s.deviantart.net/misc/noentry-green.png) no-repeat center center"), d = img.width || img.offsetWidth, o = img.height || img.offsetHeight, (d > 150 || o > 150) && (s.modified = !0, s.node.style.width = 150 / Math.max(d, o) * d + "px", s.node.style.height = 150 / Math.max(d, o) * o + "px", s.mod_down.x *= 150 / Math.max(d, o), s.mod_down.y *= 150 / Math.max(d, o));
                    break;
                case RESOURCE_GALLERIES:
                case RESOURCE_FAVCOLLECTIONS:
                    if (i = " " + r.className + " ", i.indexOf(" tt-tv150 ") >= 0 ? (r = r.getElementsByTagName("div")[2], i = " " + r.className + " ") : i.indexOf(" rs-customicon ") >= 0 && (r = $(r).find("a.rs-customicon-link img").get(0), i = " " + r.className + " "), n = i.indexOf(" tv150 ") >= 0) {
                        for (s = Surfer.create(e, r, 1, void 0, !0), c = s.node.getElementsByTagName("div"), h = 0; h != c.length; h++) if (i = " " + s.node.className + " ", i.indexOf(" a-stream ") >= 0) {
                            c[h].className += " stream";
                            break
                        }
                        s.node.className += n ? " surfer-tv150 tv150" : " surfer-tv200 tv200"
                    } else i.indexOf(" rs-customicon-inner ") >= 0 ? (s = Surfer.create(e, r, void 0, void 0, !0), s.node.className += " surfer-rs-customicon") : i.indexOf(" gl-text ") >= 0 ? (s = Surfer.create(e, r, void 0, void 0, !0), s.node.className += " surfer-gl-text") : (s = Surfer.create(e, r, void 0, void 0, !0), s.node.className += " surfer-stack stackctrl")
            }
            return s
        }
    })), window.DWait && DWait.run("jms/lib/gstream/resource_comms.js")
});
ResourceStack = ResourceStream.extend({
    findIconSlots: function() {
        var t, i, e, s;
        for (s = [], t = this.gmi_node.getElementsByTagName("div")[1].childNodes, i = 0; e = t[i]; i++)(e.className || "").indexOf("icon") >= 0 && s.push(e);
        return s.reverse(), s
    },
    dataFetch: function() {},
    domFindVisible: function() {
        var t, i, e, s, n;
        for (n = this.findIconSlots(), i = {}, s = 0, t = 0; e = n[t]; t++) e.firstChild && (i[s+++this.gs_offset] = e.firstChild);
        return i
    },
    domReadMeta: function() {
        this.length = null, this.gs_offset = 0, this.gs_count_per_page = 3, this.gs_fetch_size = 6, this.gs_fetch_bank = 0
    },
    domDrawItem: function(t, i) {
        var e;
        if (!(void 0 !== this.gs_total && t >= this.gs_total)) {
            if (void 0 == i) return this.REQUEST_FETCH;
            if (e = this.findIconSlots(), e[t]) if ("string" == typeof i[2]) e[t].innerHTML = i[2];
            else {
                for (; e[t].firstChild;) e[t].removeChild(e[t].firstChild);
                e[t].appendChild(i[2])
            }
        }
    },
    commsRecvDrop: function(t, i, e) {
        var s;
        s = [];
        for (var n = 0; n != e.length; n++) s[n] = this.processDroppedItem(e[n]);
        this.dataSplice(0, 0, s)
    },
    processDroppedItem: function(t) {
        return window.da_minish_lub && (t[2] = da_minish_lub.stacktileFromThumb150([Number(t[0]), t[1]], t[2]) || t[2]), t
    }
}), window.DWait && DWait.run("jms/lib/gstream/resource_stack.js");
DWait.ready(["jms/lib/gmi.js", "jms/lib/browser.js", "jms/lib/popup2.js"], function() {
    window.GalleryArrowMenu = GMIBase.extend({
        gmiConstructor: function() {
            this.cmn = 0, "legacy" == this.gmi_args.mode ? this.gmi_node.innerHTML = '<img onclick="setTimeout(bind(GMI.up(this), GMI.up(this).click), 1)" style="cursor:pointer;position:relative;z-index:30" src="http://s.deviantart.com/minish/gallery/menu-button-b.gif" alt="Menu"/>' : (this.gmi_node.className = "gm-chaos gmbuttons gmbuttons-arrowmenu" + ("folder" == this.gmi_args.mode ? " gmbuttons-folder" : ""), this.gmi_node.innerHTML = '<a class="gmbutton2 gmbutton2chaos gmbutton2hidden" onclick="Popup2.hideAll();this.className += \' active\';setTimeout(bind(GMI.up(this), GMI.up(this).click, 1), 1);return GMI.evCancel()">Menu</a>')
        },
        gmiDestructor: function() {
            !this.folder && this.stream_item && this.removeFromStreamItem(), this.popup && (this.popup.remove(), delete this.popup)
        },
        DEFAULT_LABEL: "Folder",
        addToStreamItem: function(e) {
            if (this.stream_item) throw Error("addToStreamItem called twice");
            this.stream_item = e;
            var i, t;
            if (i = e.getElementsByTagName("*")[0], "legacy" == this.gmi_args.mode) {
                for (this.stream_item_backup = e.innerHTML, t = "B" == i.firstChild.tagName ? 2 : 1; i.childNodes[t];) i.removeChild(i.childNodes[t]);
                i.appendChild(this.gmi_node)
            } else i.insertBefore(this.gmi_node, i.firstChild);
            this.gmiUp("Gruser") && this.gmiUp("Gruser").gmi_args.group || (this.stream_item.ondblclick = bind(this, this.click));
            var s = this.$.closest("grid" == this.gmi_args.browse_view_mode ? ".tt-w" : ".tt-fh"),
                r = {};
            if (s.length > 0) {
                var n = $("#output");
                n.is(":hidden") && (r = {
                    position: n.css("position"),
                    left: n.css("left")
                }, n.css({
                    position: "absolute",
                    left: "-9999px"
                }).show()), this.$.css({
                    marginLeft: s.innerWidth() - 26 + "px",
                    zIndex: 1
                }), $.isEmptyObject(r) || n.css(r).hide()
            }
        },
        removeFromStreamItem: function() {
            this.stream_item.ondblclick = null, this.gmi_node.parentNode && this.gmi_node.parentNode.removeChild(this.gmi_node), "legacy" == this.gmi_args.mode && (this.stream_item.innerHTML = this.stream_item_backup)
        },
        getRID: function() {
            return this.gmi_args.stream_proxy.domReadOne(this.stream_item).slice(0, 2)
        },
        addToFolderItem: function(e) {
            var i;
            this.stream_item = e, this.folder = this.findAnyFolder(), this.gmi_node.style.position = "absolute", this.gmi_node.style.top = Browser.isIE && 8 == document.documentMode ? "-" + this.stream_item.firstChild.offsetHeight + "px" : "-3px", i = "A" == (e.nextSibling || {}).tagName ? e.nextSibling : e, i.style.position = "relative", i.appendChild(this.gmi_node), this.buddy_link = i, this.findRenameLink()
        },
        findRenameLink: function() {
            folder = GMI.query(this.stream_item, "EditableResourceTV")[0], this.rename_link = folder ? folder.gmi_node.parentNode.getElementsByTagName("div")[0] : this.buddy_link.firstChild
        },
        addToTextItem: function(e) {
            this.stream_item = e, this.folder = GMI.getOne(e), e.style.position = "relative", this.gmi_node.style.position = "absolute", this.gmi_node.style.top = "-20px", this.gmi_node.style.right = "-4px", e.appendChild(this.gmi_node), this.rename_link = this.buddy_link = e.getElementsByTagName("a")[0]
        },
        addToCustomIcon: function(e) {
            this.stream_item = e, this.folder = GMI.getOne(e), e.style.position = "relative", this.gmi_node.style.position = "absolute", this.gmi_node.style.top = e.className.match(/\brs-customicon-no-label\b/) ? "-12px" : "-5px", e.appendChild(this.gmi_node), this.rename_redirect = !0, this.rename_link = this.buddy_link = e.getElementsByTagName("a")[0]
        },
        addToSectionItem: function(e) {
            var i;
            this.stream_item = e, this.gmi_node.className += " gm-astro", this.folder = this.findAnyFolder(), this.gmi_node.style.position = "absolute", this.gmi_node.style.top = "-13px", this.gmi_node.style.right = "6px", i = e, i.style.position = "relative", i.appendChild(this.gmi_node), this.buddy_link = i, this.rename_link = e.getElementsByTagName("a")[0] || e.getElementsByTagName("b")[e.getElementsByTagName("b") - 1]
        },
        HR: '<div class="blockmenu-hr"></div>',
        click: function() {
            var e;
            this.gmi_args.selection_proxy && (this.gmi_args.selection_proxy.isSelected(this.stream_item) || this.gmi_args.selection_proxy.setSelection(this.stream_item));
            var i = $("legacy" == this.gmi_args.mode ? this.gmi_node.firstChild : this.gmi_node);
            (e = this.popup) || (e = this.popup = new Popup2("GalleryArrowMenu", "body", {
                classes: "cruiser",
                content: '<div class="blockmenu"><div style="position:relative">' + this.getDefaultMenuHTML() + "</div></div>",
                created: function(e) {
                    e.$node.attr("gmi-redirect", this.gmi_node.getAttribute("gmindex"))
                }.bindTo(this),
                hidden: function() {
                    this.menuDone(), i.removeClass("active")
                }.bindTo(this),
                removed: function() {
                    delete this.popup
                }.bindTo(this),
                shown: function() {
                    i.addClass("active")
                },
                destroy: !0
            })), e.show(e.position(i))
        },
        menuClick: function(e, i, t, s) {
            switch (e) {
                case "back":
                    this.setMenuHTML(this.getDefaultMenuHTML(), "left");
                    break;
                case "unfav":
                case "remove":
                    this.menuSubClick(e);
                    break;
                case "move":
                case "copy":
                    this.getFolderList(bind(this, function(i, t, r, n) {
                        function a(e, i) {
                            var t, s, n;
                            for (s = Number(e[1]), n = [], t = 0; t != r.length; t++) if (Number(r[t].parentid) == s) {
                                if (i) return !0;
                                n.push(r[t])
                            }
                            return i ? !1 : n
                        }
                        var o, l, m, h, d, u, c, g, p, _;
                        for (t = Number(t), d = t ? a([i, t], !1) : r, _ = "folder" == this.gmi_args.mode ? "create_folder" : "edit_folder", m = Number(this.gmi_args.stream_proxy.gmi_args.set_id || this.gmi_args.stream_proxy.gmiUp("GalleryEditor").gmi_args.itemid), this.gmi_args.stream_proxy.gmi_args.browse_mode && (m = null), o = [], l = 0; l != d.length; l++) if (t || !Number(d[l].parentid)) if (g = d[l].behavior || {}, mod_breath = "", a(d[l].rid, !0) && (o.push("<a " + mod_breath + ' href="" class="f blockmenu-morelink" onclick="GMI.up(this).menuClick(\'' + e + "', " + d[l].rid[0] + ", " + d[l].rid[1] + ');return GMI.evCancel()">more &#9658;</a>'), mod_breath = ' style="margin-right:56px" '), Number(d[l].rid[1]) == m || !g[_] && (p = 1)) {
                            if (!("Featured" != d[l].title && g[_] || mod_breath)) continue;
                            o.push("<div " + mod_breath + " class=blockdisabled>" + d[l].title + "</div>")
                        } else o.push("<a " + mod_breath + ' href="" class=f onclick="GMI.up(this).menuSubClick(\'' + e + "', " + d[l].rid[0] + ", " + d[l].rid[1] + ');return GMI.evCancel()">' + d[l].title + "</a>");
                        if (o.length || (c = !0, o.push("<div " + mod_breath + " class=blockdisabled>" + (p ? "All " + (this.gmi_args.item_label || this.DEFAULT_LABEL) + "s are read only!" : "You have no " + (this.gmi_args.item_label || this.DEFAULT_LABEL) + "s yet!") + "</div>")), t) for (l = 0; l != r.length; l++) if (Number(r[l].rid[1]) == t) {
                            u = r[l].parentid || 0;
                            break
                        }
                        h = u ? "'" + e + "', " + i + ", " + u + ", 'left'" : t ? "'" + e + "', 0, 0, 'left'" : "'back'", this.setMenuHTML('<a href="" class=f onclick="GMI.up(this).menuClick(' + h + ');return GMI.evCancel()"><span class="blockmenu-left-arrow">' + (Browser.isMac ? "&#9664;" : "&#9668;") + "</span> Back</a>" + this.HR + (c ? "" : '<div class="blockdisabled">' + {
                            move: "Move",
                            copy: "Copy"
                        }[e] + " to:</div>") + o.join(""), n ? s || "right" : "none")
                    }, i, t), s);
                    break;
                case "rename":
                    this.active_renamer && (this.active_renamer.localDestroy(), this.active_renamer = null), this.rename_redirect ? window.location = this.rename_link.href + "?edit_options=1" : (this.rename_link_previous_style = {
                        none: "none"
                    }[this.rename_link.style.display], this.active_renamer = new Renamer(this, bind(this, this.renamed), this.rename_link.innerHTML), this.rename_link.replaceChild(this.active_renamer.node, this.rename_link.firstChild), setTimeout(bind(this, this.renameFocus), 10)), Popup2.hideAll();
                    break;
                case "delete":
                    var r, n;
                    confirm("Are you sure?") && (r = this.gmiUp("EditableFolderStream"), n = this.folder, r.emSplice(r.dataIndexOf([Number(n.gmi_args.set_typeid), Number(n.gmi_args.set_id)]), 1), Popup2.hideAll(), GalleryArrowMenu.ggi_result = null)
            }
        },
        emRenameClick: function() {
            this.menuClick("rename")
        },
        menuDone: function() {
            this.gmi_node.firstChild && (this.gmi_node.firstChild.className = this.gmi_node.firstChild.className.replace(/\bactive\b/, "")), this.gmi_args.selection_proxy && 1 >= this.gmi_args.selection_proxy.getSelection().length && this.gmi_args.selection_proxy.setSelection(null)
        },
        menuSubClick: function(e, t, s, r) {
            var n, a, o, l, m = this.gmi_args.stream_proxy;
            if (r || this.gmi_args.selection_proxy && (o = this.gmi_args.selection_proxy.getSelection()), Popup2.hideAll(), n = this.getRID(), a = m.dataIndexOf(n), 0 > a) return DiFi.stdErr("Sorry! Unable to " + e + " item due to missing index.", null);
            switch (e) {
                case "unfav":
                    m.emUnfav(a, 1);
                    break;
                case "remove":
                case "copy":
                case "move":
                    m.emSplice(a, {
                        remove: 1,
                        move: 1,
                        copy: 1
                    }[e], [], "remove" == e ? void 0 : [t, s], "remove" == e ? void 0 : 0, "copy" == e)
            }
            if (!r && void 0 != o) for (i = 0; o.length > i; i++) o[i] != this.stream_item && (l = GMI.query(o[i], "GalleryArrowMenu")[0], l && l.menuSubClick(e, t, s, !0))
        },
        ANIPUSH: 100,
        setMenuHTML: function(e, i) {
            return this.cmn++, this.set_menu_html = e, "none" == i ? (this.popup.$node.get(0).firstChild.firstChild.innerHTML = e, this._adaptPopupHeight(), void 0) : (this.menu_animating || (this.menu_animating = !0, this.popup.$node.css("overflow", "hidden"), Station.run(this.popup.$node.get(0).firstChild.firstChild, "left", {
                from: 0,
                to: "right" == i ? -this.ANIPUSH : this.ANIPUSH,
                time: 150,
                f: Interpolators.pulse
            }, bind(this, this._setMenuHTML_midpoint, e, i)), Station.run(this.popup.$node.get(0).firstChild.firstChild, "opacity", {
                from: 1,
                to: 0,
                time: 150,
                f: Interpolators.sineCurve
            }), this.menu_animating = !0), void 0)
        },
        _setMenuHTML_midpoint: function(e, i) {
            this.popup.$node.get(0).firstChild.firstChild.innerHTML = e, Station.run(this.popup.$node.get(0).firstChild.firstChild, "left", {
                from: "right" == i ? this.ANIPUSH : -this.ANIPUSH,
                to: 0,
                time: 150,
                f: Interpolators.pulse
            }, bind(this, this._setMenuHTML_end, e)), Station.run(this.popup.$node.get(0).firstChild.firstChild, "opacity", {
                from: 0,
                to: 1,
                time: 150,
                f: Interpolators.sineCurve
            })
        },
        _adaptPopupHeight: function() {
            var e = this.popup.$node[0];
            e.style.cssText = e.style.cssText.replace(/height:\s?350px\s?\!\s?important;\s?/, ""), this.popup.$node.height() > 350 ? (this.popup.$node.css("overflow", "auto"), this.popup.$node.css("overflow-x", "hidden"), e.style.cssText = "height: 350px !important;" + e.style.cssText) : this.popup.$node.css("overflow", "hidden")
        },
        _setMenuHTML_end: function(e) {
            this.menu_animating = !1, e != this.set_menu_html && this.setMenuHTML(this.set_menu_html, "none"), this._adaptPopupHeight()
        },
        getDefaultMenuHTML: function() {
            var e, i, t;
            if ("folder" == this.gmi_args.mode) return (t = this.folder) ? (e = t.gmi_args.behavior || {}, i = this.gmiUp("GMFrame_Gruser"), i || console.log("Missing sidebar widget frame"), (this.getSiblingHeaderHTML() + (e.edit_folder && "Featured" != (this.rename_link || this.gmi_node).firstChild.nodeValue ? '<a class=f href="#" onclick="GMI.up(this).menuClick(\'rename\');return GMI.evCancel()">Rename this ' + (this.gmi_args.item_label || this.DEFAULT_LABEL) + "</a>" : "") + (e.delete_folder && "Featured" != (this.rename_link || this.gmi_node).firstChild.nodeValue ? '<a class=f href="#" onclick="GMI.up(this).menuClick(\'delete\');return GMI.evCancel()">Delete this ' + (this.gmi_args.item_label || this.DEFAULT_LABEL) + "..." + "</a>" : "") + (e.delete_folder && this.gmiUp("Gruser").gmi_args["super"] && "Featured" != (this.rename_link || this.gmi_node).firstChild.nodeValue ? '<a class=f href="##" onclick="GMI.up(this).menuClick(\'move\', null, null, \'right\');return GMI.evCancel();"><span class="blockmenu-right-arrow">&#9658;</span>Move this ' + (this.gmi_args.item_label || this.DEFAULT_LABEL) + " to...&nbsp;&nbsp;&nbsp;</a>" : "") || '<div class="blockdisabled">This item cannot be Renamed or Deleted</div>') + (i && i.canBehave("edit") ? (e.edit_folder || e.delete_folder ? '<div class="blockmenu-hr"></div>' : "") + "<a class=f href=\"###\" onclick=\"GMI.up(this).gmiUp('GMFrame_Gruser').loadView('config');Popup2.hideAll();return GMI.evCancel()\">Edit this Widget</a>" : "")) : '<div class="blockdisabled">This menu is having a bad day and cannot be displayed</div>';
            e = this.gmi_args.stream_proxy.gmi_args.behavior || {};
            var s = e.edit_folder,
                r = this.gmi_args.stream_proxy.gmi_args.set_typeid;
            r != RESOURCE_FAVCOLLECTIONS && r != RESOURCE_GALLERIES || "set_id" in this.gmi_args.stream_proxy.gmi_args || (s = !1);
            var n = "group" == this.gmi_args.stream_proxy.gmi_args.gruser_type,
                a = $(this.gmi_node).closest(".tt-a").hasClass("tt-special");
            return this.getSiblingHeaderHTML() + (s && !a ? '<a class=f href="#" onclick="GMI.up(this).menuClick(\'move\', null, null, \'right\');return GMI.evCancel()"><span class="blockmenu-right-arrow">&#9658;</span>Move to...&nbsp;&nbsp;&nbsp;</a>' : "") + (a ? "" : '<a class=f href="##" onclick="GMI.up(this).menuClick(\'copy\', null, null, \'right\');return GMI.evCancel()"><span class="blockmenu-right-arrow">&#9658;</span>Copy to...&nbsp;&nbsp;&nbsp;</a>') + (s ? (a ? "" : this.HR) + '<a class=f href="###" onclick="GMI.up(this).menuClick(\'remove\');return GMI.evCancel()">Remove from This ' + (this.gmi_args.item_label || this.DEFAULT_LABEL) + "</a>" : "") + (r != RESOURCE_FAVCOLLECTIONS || n ? "" : this.HR + '<a class=f href="###" onclick="GMI.up(this).menuClick(\'unfav\');return GMI.evCancel()">Remove from Favourites</a>')
        },
        findAnyFolder: function() {
            return GMI.query(this.stream_item, "EditableResourceTV")[0] || GMI.query(this.stream_item, "EditableResourceStack")[0] || GMI.query(this.stream_item, "EditableResourceStream")[0]
        },
        getSiblingHeaderHTML: function() {
            var e;
            return this.gmi_args.selection_proxy && (e = this.gmi_args.selection_proxy.getSelection(), e.length > 1) ? '<div class="blockdisabled">' + e.length + " Selected</div>" + this.HR : ""
        },
        getFolderList: function(e, i) {
            return GalleryArrowMenu.ggi_result ? e(GalleryArrowMenu.ggi_result, !0) : (this.setMenuHTML('<a href="" class=f onclick="GMI.up(this).menuClick(\'back\');return GMI.evCancel()"><span class="blockmenu-left-arrow">' + (Browser.isMac ? "&#9664;" : "&#9668;") + "</span> Back</a>" + this.HR + '<div class="blockdisabled">Please Wait...</div>', i), DiFi.pushPrivateGet("Gallections", "get_gallections_with_permissions", [this.gmi_args.stream_proxy.gmiUp("Gruser").gmi_args.id, this.gmi_args.stream_proxy.gmi_args.set_typeid || this.gmiUp("GalleryEditor").gmi_args.typeid], bind(this, function(e, i, t, s) {
                var r;
                if (i == this.cmn) {
                    if (!t) return DiFi.stdErr("Unable to fetch folder list.", s.response.content), Popup2.hideAll(), void 0;
                    r = [];
                    var n;
                    jQuery.each(s.response.content, function(e, i) {
                        return "Featured" == i.name ? (n = i.galleryid, !1) : void 0
                    }), jQuery.each(s.response.content, bind(this, function(e, i) {
                        i.rid = [Number(i.resource_typeid), Number(i.galleryid)], i.parentid == n && (i.parentid = 0), r[i.position] = i
                    })), e(GalleryArrowMenu.ggi_result = r)
                }
            }, e, this.cmn)), DiFi.send(), void 0)
        },
        renameFocus: function() {
            this.active_renamer && this.active_renamer.node.focus()
        },
        renamed: function(e, i) {
            var t, s;
            if (this.active_renamer) {
                delete this.active_renamer, e = this.makeValidNameString(e), this.updateNameDisplay(e || i), this.rename_link_previous_style && (this.rename_link.style.display = this.rename_link_previous_style), t = this.gmiUp("GalleryEditor");
                var r = bind(this, function(e, t) {
                    return e || (this.updateNameDisplay(i), t.response && t.response.content && t.response.content.error ? alert(t.response.content.error) : alert("There was a problem renaming this folder.\n\nPlease try again or choose a different name.")), GalleryArrowMenu.ggi_result = null, e
                });
                s = this.findGruserid(), e && e != i && this.performRename(s, this.folder.gmi_args.set_typeid, this.folder.gmi_args.set_id, e, r), t && t.updateChannels()
            }
        },
        updateNameDisplay: function(e) {
            $(this.rename_link).html(e)
        },
        performRename: function(e, i, t, s, r) {
            DiFi.pushPost("Gallections", "rename", [e, i, t, s], r), DiFi.timer(1)
        },
        findGruserid: function() {
            if (this.gmi_args.gruser_id) return this.gmi_args.gruser_id;
            var e = this.gmiUp("GalleryEditor");
            return e ? e.gmi_args.gruser_id : this.gmiUp("Gruser").gmi_args.id
        },
        makeValidNameString: function(e) {
            return e = e.replace(/[^a-zA-Z0-9\-_\ \.\?$'\":\,\+]/g, " "), e = e.replace(/(?:^\s+|\s+$)/g, ""), e = e.replace(/\s{2,}/g, " "), e = e.substr(0, 44), e.match(/^[a-zA-Z0-9\-_\ \,\.\?$'\"]{1,44}$/) ? e : null
        }
    }), window.DWait && DWait.run("jms/pages/gallery/arrowmenu.js")
});
DWait.ready(["jms/lib/gstream/resource_stream.js", "jms/lib/gstream/resource_stack.js", "jms/lib/gstream/resource_comms.js", "jms/lib/difi.js", "jms/lib/difi_hold.js", "jms/lib/bind.js"], function() {
    window.EditableResourceStream = ResourceStream.extend(EditableResourceStream_proto = {
        hit_rect: {
            x: 0,
            y: 0,
            y2_buffer: 5
        },
        gmiConstructor: function() {
            this.edit_mode = !1, this.base()
        },
        dataSplice: function(e, t, i) {
            var s;
            return 0 == this.contents.length && (this.gmi_node.innerHTML = ""), s = this.base(e, t, i), this.scatter_hook && this.scatter_hook.resize(), s
        },
        domRemoveItem: function(e) {
            GMI._delete(GMI.query(e, "GalleryArrowMenu")), this.base(e)
        },
        emUnfav: function(e, t) {
            if (!t || this.gmi_args.set_typeid != RESOURCE_FAVCOLLECTIONS || "group" == this.gmi_args.gruser_type) return !1;
            var i = this.contents.slice(e, e + t),
                s = 0,
                r = i.length;
            for (s = 0; r > s; s++) {
                var o = i[s][2].getAttribute("userid");
                o == this.gmi_args.gruser_id ? this.gmi_args.set_id && DiFi.pushPost("Gallections", "remove_resource", [this.gmi_args.gruser_id, this.gmi_args.set_typeid, this.gmi_args.set_id, i[s][0], i[s][1]], DiFiHolder.getStdCallback()) : DiFi.pushPost("Deviation", "Favourite", [i[s][1]], DiFiHolder.getStdCallback())
            }
            return this.dataSplice(e, t), !0
        },
        emSplice: function(e, t, i, s, r, o) {
            var a, n, d, m = this.gmi_args.gruser_type || this.gmiUp("EditableFolderStream").gmi_args.gruser_type;
            if (t) {
                if (a = this.contents.slice(e, e + t), s) {
                    for (n = 0; n != a.length; n++) "group" == m ? (d = !0, DiFi.pushPost("Aggregations", "copy_resource", [this.gmi_args.gruser_id, this.gmi_args.mod_id || 0, s[0], s[1], this.gmi_args.set_id, a[n][0], a[n][1], r + n], DiFiHolder.getStdCallback())) : DiFi.pushPost("Aggregations", "add_resource", [this.gmi_args.gruser_id, this.gmi_args.mod_id || 0, s[0], s[1], a[n][0], a[n][1], r + n], DiFiHolder.getStdCallback());
                    ResourceComms.broadcastDataSplice({
                        set_typeid: Number(s[0]),
                        set_id: Number(s[1])
                    }, [r, 0, a], this, [this])
                }
                if (!o) for (n = 0; n != a.length; n++) this.gmi_args.set_id && DiFi.pushPost("Gallections", "remove_resource", [this.gmi_args.gruser_id, this.gmi_args.set_typeid, this.gmi_args.set_id, a[n][0], a[n][1]], DiFiHolder.getStdCallback())
            }
            if (i && i.length) for (n = 0; n != i.length; n++) this.tmp_from_stream ? "group" == m ? (d = !0, DiFi.pushPost("Aggregations", "copy_resource", [this.gmi_args.gruser_id, this.gmi_args.mod_id || 0, this.gmi_args.set_typeid, this.gmi_args.set_id, this.tmp_from_stream.gmi_args.set_id, i[n][0], i[n][1], e + n], DiFiHolder.getStdCallback())) : DiFi.pushPost("Aggregations", "add_resource", [this.gmi_args.gruser_id, this.gmi_args.mod_id || 0, this.gmi_args.set_typeid, this.gmi_args.set_id, i[n][0], i[n][1], e + n], DiFiHolder.getStdCallback()) : "group" == m ? DiFi.pushPost("Gallections", "reposition_resource", [this.gmi_args.gruser_id, this.gmi_args.set_typeid, this.gmi_args.set_id, i[n][0], i[n][1], e + n], DiFiHolder.getStdCallback()) : this.gmi_args.set_id && DiFi.pushPost("Aggregations", "add_resource", [this.gmi_args.gruser_id, this.gmi_args.mod_id || 0, this.gmi_args.set_typeid, this.gmi_args.set_id, i[n][0], i[n][1], e + n], DiFiHolder.getStdCallback());
            DiFi.timer(1), o || ResourceComms.broadcastDataSplice({
                set_typeid: this.gmi_args.set_typeid,
                set_id: this.gmi_args.set_id
            }, arguments, this, null)
        },
        emReceiver: function(e) {
            if (this.edit_mode != e && "deleted" != this.gmi_lifecycle) if (this.edit_mode = e, e) {
                var t, i;
                this.selector = new(this.override_selection_type || ResourceStreamSelection)(this.gmi_node), this.gmi_args.no_selection || this.selector.hook(this.emGetSelectionParams()), t = this.domFindVisible();
                for (i in t) this.emMakeEditable(t[i])
            } else GMI._delete(this.gmiQuery("GalleryArrowMenu")), this.selector && (this.gmi_args.no_selection || (this.selector.setSelection(null), this.selector.unhook()), delete this.selector)
        },
        emGetSelectionParams: function() {
            return {
                allow_multiple: "rectangle",
                drag_rect_ruler: this._drag_rect,
                ignore_clicks: this.gmiUp("Gruser").gmi_args.group || 1,
                global_mouse_cancel: !0,
                selectable_area: null
            }
        },
        emMakeEditable: function(e) {
            GMI.query(e, "GalleryArrowMenu")[0] || GMI.create("GalleryArrowMenu", {
                stream_proxy: this,
                selection_proxy: this.selector,
                browse_view_mode: this.gmi_args.browse_view_mode,
                mode: (this.gmiUp("Gruser") || this).gmi_args.group ? "modern" : "modern"
            }).addToStreamItem(e)
        },
        _drag_rect: function(e, t) {
            var i;
            return i = Ruler.document.node(e, t), Browser.isKHTML ? (i.y2 += 210, i.h = 210) : Browser.isIE && document.documentMode > 7 && (i.y -= 210, i.h = 210), i
        },
        domDrawItem: function(e, t) {
            var i;
            return i = this.base(e, t), this.edit_mode && t && t[2] && 1 == t[2].nodeType && this.emMakeEditable(t[2]), i
        },
        commsAskForTargetsEnh: function(e, t, i) {
            var s, r = this._contentInterest(i, e);
            return r === !1 ? !1 : r ? (this.contents.length ? s = this.selector.getAllSelectableRects(this, !0, t.length > 1 ? null : t[0]) : (s = [Ruler.document.node(this.gmi_node)], s[0].index = 0, s[0].node = this.gmi_node, s[0].owner = this), s) : []
        },
        commsRecvDrop: function(e, t, s) {
            var r;
            if (this != e) for (i = 0; i != t.length; i++) {
                if (r = e.dataIndexOf(t[i]), !(r >= 0)) throw alert("Unable to move items due to missing index."), Error("Missing index");
                e.emSplice(r, 1, [], [this.gmi_args.set_typeid, this.gmi_args.set_id], s.index + this.gs_offset || 0, !1)
            } else try {
                this != e && (this.tmp_from_stream = e), this.emSplice(s.index + this.gs_offset || 0, 0, t)
            } finally {
                this.tmp_from_stream = null
            }
        },
        commsNonInputEvent: function() {},
        commsDragHover: function(e, t, i) {
            if (!window.da_minish_lub || !window.da_minish_lub.out) {
                var s = GMI.query("EditableResourceStream", {
                    match: {
                        browse_mode: 1
                    }
                });
                if (!s.length) {
                    var r = $(t.node),
                        o = r.hasClass("tt-fh"),
                        a = t.offset_mark ? "r" : "l",
                        n = r.children(".tt-w").first();
                    if (o) {
                        var d = n.find(".offset-mark-" + a);
                        i ? 0 == d.length && $("<div></div>").addClass("offset-mark-" + a).appendTo(n) : d.remove()
                    } else i ? n.addClass("drag-hover-" + a) : n.removeClass("drag-hover-l drag-hover-r")
                }
            }
        },
        _contentInterest: function(e, t) {
            if (!this.gmi_args.gruser_id) return 0;
            if (!this.edit_mode && "gmi-EditableResourceTV" != this.gmi_node.id) return 0;
            if (!(this.gmi_args.behavior || {}).edit_folder) return 0;
            for (i = 0; i != e.length; i++) if (1 != Number(e[i][0])) {
                if (window.EditableFolderStream && t instanceof EditableFolderStream) return 0;
                if (21 != Number(this.gmi_args.set_typeid)) return 0;
                if ("group" == this.gmi_args.gruser_type) return 0
            }
            return 1
        }
    }), window.EditableResourceTV = EditableResourceStream.extend({
        commsAskForTargetsEnh: function(e, t, i) {
            var s;
            return this._contentInterest(i, e) ? (s = Ruler.document.node(this.gmi_node.parentNode.parentNode), s.node = this.gmi_node, s.owner = this, s.index = 0, [s]) : []
        },
        commsRecvDrop: function(e, t, i) {
            try {
                this.tmp_from_stream = e, this.emSplice(i.index + this.gs_offset || 0, 0, t)
            } finally {
                this.tmp_from_stream = null
            }
        },
        commsDragHover: function(e, t, i) {
            var s = this.gmi_node.parentNode.parentNode.parentNode;
            i ? s.className += " selected" : s.className = s.className.replace(/\s*\bselected\b/g, "")
        },
        emReceiver: function(e) {
            this.edit_mode = e
        }
    }), window.EditableResourceFolderLink = EditableResourceTV.extend({
        domDrawItem: function() {},
        dataSplice: function() {},
        domFindVisible: function() {}
    }), window.EditableResourceCustomIcon = EditableResourceTV.extend({
        commsAskForTargetsEnh: function(e, t, i) {
            var s;
            return this._contentInterest(i, e) ? (s = Ruler.document.node($("img", this.gmi_node).get(0)), s.node = this.gmi_node, s.owner = this, s.index = 0, [s]) : []
        },
        domDrawItem: function() {},
        dataSplice: function() {},
        domFindVisible: function() {}
    }), window.EditableResourceStack = ResourceStack.extend(EditableResourceStream_proto), window.GPageButton = EditableResourceStream.extend({
        domDrawItem: function() {},
        dataSplice: function() {},
        domFindVisible: function() {},
        domReadMeta: function() {
            this.gs_offset = Number(this.gmi_args.offset), this.gs_count_per_page = 1, this.gs_fetch_size = 0, this.gs_fetch_bank = 0
        },
        commsAskForTargetsEnh: function(e, t, i) {
            var s;
            return i[0] && 1 == Number(i[0][0]) ? (s = Ruler.document.node(this.gmi_node), s.node = this.gmi_node, s.owner = this, s.index = 0, [s]) : []
        },
        commsRecvDrop: function(e, t, i) {
            mod = 0, e.emSplice(i.index + this.gs_offset + mod, 0, t), e.domDrawRange(e.gs_offset, e.gs_count_per_page)
        },
        commsDragHover: function(e, t, i, s, r) {
            var o, a, n = this.gmi_node;
            for (i ? n.className += " nav-drag-hover" : n.className = n.className.replace(/\s*\bnav.drag.hover\b/g, ""), o = 0; a = r[o]; o++) Station.run(a.node, "opacity", {
                from: Station.read(a.node, "opacity") || 1,
                to: i ? .25 : 1,
                time: 150,
                f: Interpolators.sineCurve
            })
        }
    }), window.DWait && DWait.run("jms/lib/gstream/folders/editable_resource_stream.js")
});
(function(n, t) {
    "$:nomunge";
    var u, e = n.jQuery || n.Cowboy || (n.Cowboy = {});
    e.throttle = u = function(n, u, o, i) {
        function r() {
            function e() {
                c = +new Date, o.apply(d, f)
            }
            function r() {
                a = t
            }
            var d = this,
                g = +new Date - c,
                f = arguments;
            i && !a && e(), a && clearTimeout(a), i === t && g > n ? e() : u !== !0 && (a = setTimeout(i ? r : e, i === t ? n - g : n))
        }
        var a, c = 0;
        return "boolean" != typeof u && (i = o, o = u, u = t), e.guid && (r.guid = o.guid = o.guid || e.guid++), r
    }, e.debounce = function(n, e, o) {
        return o === t ? u(n, e, !1) : u(n, o, e !== !1)
    }
})(this), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.throttle-debounce.js");
(function(e, i) {
    "use strict";
    var a = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    e.fn.imagesLoaded = function(t) {
        function n() {
            var i = e(l),
                a = e(g);
            d && (g.length ? d.reject(u, i, a) : d.resolve(u)), e.isFunction(t) && t.call(o, u, i, a)
        }
        function r(e) {
            s(e.target, "error" === e.type)
        }
        function s(i, t) {
            i.src !== a && -1 === e.inArray(i, A) && (A.push(i), t ? g.push(i) : l.push(i), e.data(i, "imagesLoaded", {
                isBroken: t,
                src: i.src
            }), c && d.notifyWith(e(i), [t, u, e(l), e(g)]), u.length === A.length && (setTimeout(n), u.unbind(".imagesLoaded", r)))
        }
        var o = this,
            d = e.isFunction(e.Deferred) ? e.Deferred() : 0,
            c = e.isFunction(d.notify),
            u = o.find("img").add(o.filter("img")),
            A = [],
            l = [],
            g = [];
        return e.isPlainObject(t) && e.each(t, function(e, i) {
            "callback" === e ? t = i : d && d[e](i)
        }), u.length ? u.bind("load.imagesLoaded error.imagesLoaded", r).each(function(t, n) {
            var r = n.src,
                o = e.data(n, "imagesLoaded");
            return o && o.src === r ? (s(n, o.isBroken), i) : n.complete && n.naturalWidth !== i ? (s(n, 0 === n.naturalWidth || 0 === n.naturalHeight), i) : ((n.readyState || n.complete) && (n.src = a, n.src = r), i)
        }) : n(), d ? d.promise(o) : o
    }
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.imagesloaded.js");
DWait.ready(["jms/lib/pubsub.js"], function() {
    (function(e) {
        var t = {
            updateTimer: null,
            active: !1,
            init: function() {
                PubSub.subscribe({
                    eventname: "ImageLazyLoad.activate",
                    subscriber: this,
                    callback: this.activate
                }), PubSub.subscribe({
                    eventname: "ImageLazyLoad.delayedUpdate",
                    subscriber: this,
                    callback: this.delayedUpdate
                }), PubSub.subscribe({
                    eventname: "ImageLazyLoad.update",
                    subscriber: this,
                    callback: this.update
                })
            },
            activate: function() {
                this.active || (this.active = !0, e(window).on("load resize scroll", e.proxy(this, "delayedUpdate")), this.delayedUpdate())
            },
            delayedUpdate: function() {
                clearTimeout(this.updateTimer), this.updateTimer = setTimeout(this.update, 200)
            },
            update: function() {
                for (var t, a = e(window).width(), i = e(window).height(), s = e(".image-lazy-load:visible"), d = 0; t = s[d]; d++) {
                    var u = t.getBoundingClientRect();
                    u.bottom > 0 && i > u.top && u.right > 0 && a > u.left && (e(t).removeClass("image-lazy-load"), t.src = t.getAttribute("data-src"))
                }
            }
        };
        t.init()
    })(jQuery), window.DWait && DWait.run("jms/lib/image_lazy_load.js")
});
Surfer2 = {
    create: function(e, t) {
        var n;
        return n = $("<div>", {
            "class": "surfer2"
        }).appendTo("body"), n = {
            node: n[0],
            o: t || DDD.p_down
        }, Surfer2.update(n, e), n
    },
    update: function(e, t) {
        var n, o, a, r;
        return r = Browser.isIE ? 2 : 0, a = {}, n = Ruler.document.pointer(t), o = e.o, a.x = n.x > o.x ? o.x : n.x, a.x2 = n.x > o.x ? n.x : o.x, a.y = n.y > o.y ? o.y : n.y, a.y2 = n.y > o.y ? n.y : o.y, Station.apply(e.node, "left", a.x), Station.apply(e.node, "top", a.y), Station.apply(e.node, "width", Math.max(a.x2 - a.x, 1) + r), Station.apply(e.node, "height", Math.max(a.y2 - a.y, 1) + r), a
    },
    clear: function(e) {
        e.node.parentNode.removeChild(e.node)
    }
}, window.DWait && DWait.run("jms/lib/surfer2.js");
(function(i) {
    var t = Base.extend({
        modals: [],
        current_modal: null,
        throttle_debounce: 200,
        _listener_added: !1,
        handlers: {
            close_popup: function() {
                var i = Popup2.getActivePopup();
                return i && i.hide(), Popup2.anyActivePopup() || this._detach_listener(), !1
            },
            recieve_message: function(i) {
                var t;
                i = i.originalEvent;
                try {
                    t = JSON.parse(i.data)
                } catch (s) {
                    return
                }
                if ("https://www.deviantart.com" == i.origin && t.type && "PurchaseModal" == t.type) switch (t.command) {
                    case "resize":
                        this.resize_modal(t);
                        break;
                    case "close":
                    case "success":
                        PubSub.publish("PurchaseModal.close_popup", t.command);
                        break;
                    case "paypal_redirect":
                        this.paypal_redirect(t.id);
                        break;
                    case "error":
                        this.resize_modal(t)
                }
            },
            resized: function() {
                var i = Popup2.activePopup(),
                    t = this.get_modal({
                        id: i
                    });
                t.show()
            }
        },
        modal_types: {
            pcp: function(i) {
                var t = i.data("deviationid"),
                    s = {
                        id: t,
                        heading: "Purchase Content",
                        iframe_url: "https://www.deviantart.com/pointsdownload/modal/display?deviationid=" + t
                    }, o = this.get_modal(s);
                o.show(i)
            },
            commission: function(t) {
                var s = "https://www.deviantart.com/grusers-modals/commissions/purchase",
                    o = "?" + i.param({
                        gruserid: t.data("commission-gruserid"),
                        request: JSON.stringify({
                            commission_id: t.data("commission-id"),
                            is_portal: Glbl("Commissions.is_portal") ? 1 : 0
                        })
                    }),
                    e = t.data("commission-gruserid") + "-" + t.data("commission-id"),
                    n = {
                        id: e,
                        heading: "Request Commission",
                        iframe_url: s + o
                    }, a = this.get_modal(n);
                a.show(t)
            },
            upgrade: function(t, s) {
                if (void 0 === s && (s = ""), 480 > i(window).width()) return window.location = "https://www.deviantart.com/checkout/?mx=premium&point=modalfallback", void 0;
                var o = {
                    id: "upgrade",
                    heading: null,
                    iframe_url: "https://www.deviantart.com/checkout/modal/premium/?" + i.param({
                        context: s
                    })
                }, e = this.get_modal(o);
                e.show(t)
            },
            rate_commission_artist: function(t) {
                var s = "https://www.deviantart.com/grusers-modals/commissions/rate",
                    o = "?" + i.param({
                        gruserid: t.data("commission-gruserid"),
                        request: JSON.stringify({
                            commission_id: t.data("commission-id")
                        })
                    }),
                    e = "rate-" + t.data("commission-gruserid") + "-" + t.data("commission-id"),
                    n = {
                        id: e,
                        heading: "Submit Rating",
                        iframe_url: s + o,
                        position_options: {
                            align: "right"
                        }
                    }, a = this.get_modal(n);
                a.show(t)
            }
        },
        constructor: function() {
            PubSub.subscribe([{
                eventname: "PurchaseModal.close_popup",
                subscriber: this,
                callback: this.handlers.close_popup
            }, {
                eventname: "Duperbrowse.closed",
                subscriber: this,
                callback: this.handlers.close_popup
            }, {
                eventname: "Duperbrowse.next",
                subscriber: this,
                callback: this.handlers.close_popup
            }, {
                eventname: "Duperbrowse.prev",
                subscriber: this,
                callback: this.handlers.close_popup
            }])
        },
        open: function(i, t, s) {
            if (i in this.modal_types) {
                this._attach_listener();
                var o = this.modal_types[i];
                o.call(this, t, s)
            }
        },
        resize_modal: function(i) {
            var t = this.get_modal(i);
            t.resize(i)
        },
        get_modal: function(i) {
            return i.id ? (this.modals[i.id] || (this.modals[i.id] = new s(i)), this.current_modal = this.modals[i.id], this.modals[i.id]) : this.current_modal
        },
        paypal_redirect: function(i) {
            window.location = "https://www.deviantart.com/checkout/modal/paypal_redirect/" + i
        },
        _attach_listener: function() {
            if (!this._listener_added) {
                var t = i.throttle(this.throttle_debounce, this.handlers.resized.bindTo(this));
                i(window).on("message", this.handlers.recieve_message.bindTo(this)).on("resize", t), this._listener_added = !0
            }
        },
        _detach_listener: function() {
            this._listener_added && (i(window).off("message", this.handlers.recieve_message.bindTo(this)).off("resize"), this._listener_added = !1)
        }
    }),
        s = Base.extend({
            $node: null,
            $iframe_container: null,
            $iframe: null,
            options: null,
            arrow_width: 9,
            arrow_height: 15,
            vertical_padding: 5,
            dimensions: {
                width: 0,
                height: 0,
                iframe_height: 0
            },
            popup_position_options: {
                align: "left",
                valign: "center",
                bump: {
                    top: 0,
                    left: 0
                }
            },
            position: null,
            constructor: function(t) {
                this.options = t, this.popup_position_options = i.extend({}, this.popup_position_options, this.options.position_options);
                var s = Glbl("Site.is_mobile") ? i(window).width() : 450,
                    o = 0;
                this._set_dimensions(s, o)
            },
            show: function(i) {
                void 0 !== i && (this.$node = i), this._determine_popup_position_options();
                var t;
                t = Popup2.getPopup(this.options.id) ? Popup2.getPopup(this.options.id) : new Popup2(this.options.id, "body", {
                    classes: "purchase-modal",
                    content: this._make_content(),
                    invincible: !0
                }), this.position = t.position(this.$node, this.popup_position_options), this._position_fix(), this._add_arrow(), t.show(this.position)
            },
            resize: function(i) {
                this._set_dimensions(i.width, i.height), this.$iframe_container.css({
                    height: this.dimensions.height,
                    width: this.dimensions.width
                }), this.$iframe.css({
                    height: this.dimensions.iframe_height,
                    width: this.dimensions.width
                }), this.$loading.hide(), this.show(this.$node)
            },
            _set_dimensions: function(i, t) {
                this.dimensions = {
                    width: i,
                    height: t + 12,
                    iframe_height: t
                }
            },
            _make_content: function() {
                var t = i("<div>").addClass("purchase-modal modal modal-rounded");
                return this.options.heading && i("<h2>").text(this.options.heading).appendTo(t), i("<a>").addClass("x").on("click", function() {
                    return PubSub.publish("PurchaseModal.close_popup"), !1
                }).appendTo(t), this.$loading = i("<div>").addClass("purchase-modal-loading").css("width", this.dimensions.width).appendTo(t), i("<img>").attr("src", "http://s.deviantart.com/emoticons/e/eager.gif").after("Loading&hellip;").appendTo(this.$loading), this.$iframe_container = i("<div>").addClass("purchase-modal-iframe-container").css({
                    width: this.dimensions.width,
                    height: this.dimensions.height
                }).appendTo(t), this.$iframe = i("<iframe>").addClass("purchase-modal-iframe").attr({
                    frameBorder: "0",
                    src: this.options.iframe_url,
                    scrolling: "no"
                }).css({
                    width: this.dimensions.width,
                    height: this.dimensions.iframe_height
                }).appendTo(this.$iframe_container), t
            },
            _determine_popup_position_options: function() {
                var t = this.$node.offset(),
                    s = this.dimensions.width + this.arrow_width,
                    o = t.left + this.arrow_width + this.dimensions.width + this.$node.width(),
                    e = i(window).width();
                if (("right" != this.popup_position_options.align || o > e) && (this.popup_position_options.align = s >= t.left ? o > e ? "center" : "right" : "left"), "right" == this.popup_position_options.align) {
                    var n = this.$node.outerWidth() - this.$node.width();
                    this.popup_position_options.bump.left = n + this.arrow_width
                } else this.popup_position_options.bump.left = 0
            },
            _position_fix: function() {
                var t = Popup2.getPopup(this.options.id);
                t.render();
                var s = i(window),
                    o = s.height(),
                    e = s.scrollTop(),
                    n = t.$node.height(),
                    a = e + this.vertical_padding,
                    d = e + o - (n + this.vertical_padding),
                    h = o / 2 + e - n / 2;
                "center" == this.popup_position_options.align && (this.position.left = Math.ceil(s.width() / 2) - Math.ceil(t.$node.width() / 2), this.position.top = Math.ceil(o / 2) - Math.ceil(n / 2)), o >= n ? e > this.position.top ? this.position.top = a : this.position.top > d && (this.position.top = d) : this.position.top = 0 > h ? this.vertical_padding : h
            },
            _add_arrow: function() {
                var t = Popup2.getPopup(this.options.id);
                if (t.render(), t.$node.find(".purchase-modal-arrow").remove(), "center" != this.popup_position_options.align) {
                    var s, o, e = 2,
                        n = i('<div class="purchase-modal-arrow"></div>'),
                        a = 3,
                        d = t.$node.height() - this.arrow_height - a,
                        h = this.$node.offset().top + this.$node.height() / 2 - this.position.top,
                        r = Math.min(Math.max(a, h), d);
                    "left" == this.popup_position_options.align ? (s = "right", this.position.left -= this.arrow_width, o = t.$node.width() - e) : (s = "left", o = e - this.arrow_width), n.css({
                        top: r,
                        left: o
                    }), n.addClass(s), t.$node.append(n)
                }
            }
        });
    window.PurchaseModal = new t
})(jQuery), window.DWait && DWait.run("jms/modals/purchase.js");
(function(e) {
    window.WriterAnywhere_Persist = {
        sidebar: null,
        skinbar: null,
        last_draft_id: null
    }, window.WriterAnywhere = GMIBase.extend({
        writer: null,
        owner: null,
        ccwriter_scrolloffset: null,
        ccwriter_inited: 0,
        ccwriter_expanded: 0,
        ccwriter_expanded_first: 0,
        ccwriter_wide: 0,
        ccwriter_closing: 0,
        default_options: {
            animate_time: 200,
            sync_timeout: 1e3,
            height_drop: 118,
            sidespace: 25,
            has_skinbar: !1,
            has_conversation: !1,
            passthrough_tab: !1,
            toolbar_file: !1,
            toolbar_edit: !1,
            toolbar_link: !0,
            toolbar_align: !0,
            toolbar_headings: !1,
            drafts: !1,
            draft_title: function() {
                return "Draft"
            },
            image_actions: ["Image", "Full", "Thumb", "Link", "Remove"],
            image_resize: !0,
            embedded_item_limit: !1,
            sidebar_premium_upsell: !0,
            sidebar_click_callback: function(e) {
                this.writer.insert_thumb(e)
            },
            on_switch_editing_mode: function() {},
            on_save_content: function() {},
            remember_editing_mode: !1,
            valid_tags: ["br", "hr", "strong", "small", "b", "code", "sub", "sup", "tt", "acronym", "a", "abbr", "strike", "em", "i", "s", "u", "ins", "span", "div", "blockquote", "p", "bcode", "ul", "li", "ol", "da:embed", "da:deviation", "da:thumb", "da:bigthumb", "da:emoticon", "da:drawing", "img", "font", "h1", "h2", "h3", "h4", "h5", "h6"]
        },
        gmiConstructor: function() {
            this.$.removeClass("dwait")
        },
        gmiDestructor: function() {
            this.ccwriter_inited && !this.ccwriter_closing && (ddt.log("writer", "WriterAnywhere gmiDestructor"), PubSub.publish("WriterAnywhere.shutdown"), PubSub.publish("WriterSidebar.stop_stash"), WriterFactory.destroy(this.$.find("textarea")), this.owner && this.owner.detach(!0, !0))
        },
        setOwner: function(i) {
            this.owner = i, this.owner.active = !0, this.options = e.extend({}, this.default_options, this.owner.options)
        },
        load: function() {
            this.owner.before_load.apply(this);
            var i = e(".commentwriter-toolbar"),
                t = e(".commentwriter-sidebar-inner");
            this.$writer_ui = i.add(t), this.$writer_ui.hide();
            var r = this.$.find("textarea")[0].style.height || 0;
            this.$.find("textarea").show().wrap('<div class="ccwriter-content"></div>'), this.$.siblings(".commentwriter-underlay").remove(), this.writer = WriterFactory.toggle(this.$.find("textarea"), {
                storage: this.options.drafts ? "DefaultStorage" : "NoSaveStorage",
                draft_title: this.options.draft_title,
                sync_timeout: this.options.sync_timeout,
                draft_id_override: WriterAnywhere_Persist.last_draft_id,
                imagecontrol_options: {
                    attach_point: ".ccwriter-content",
                    allowed_image_actions: this.options.image_actions,
                    prevent_resize: !this.options.image_resize
                },
                valid_tags: this.options.valid_tags,
                valid_attrs: this.options.valid_attrs,
                toolbars: [{
                    toolbar_name: "writersub",
                    toolbar_node: e("<div>")[0],
                    toolbar_button_class: "subToolbarButton",
                    toolbar_menu_class: "subToolbarMenu",
                    toolbar_popup_class: "stashwriter-subtoolbar-menu stashwriter-subtoolbar-menu",
                    toolbar_order: ["bold", "italic", "underline", "separator", "blockquote", "ul", "ol", "separator", "alignl", "alignc", "alignr"]
                }],
                allow_html_mode: !0,
                passthrough_tab: this.options.passthrough_tab,
                block_sidescroll: this.options.block_sidescroll,
                on_switch_editing_mode: bind(this, function() {
                    if (this.options.remember_editing_mode) try {
                        var e = "writeranywhere-editing-mode-" + this.owner.type;
                        console.log("storage", e), this.writer.inHtmlMode() ? localStorage.setItem(e, 1) : localStorage.removeItem(e)
                    } catch (i) {}
                    this.options.on_switch_editing_mode.apply(this)
                }),
                on_save_content: this.options.on_save_content.bindTo(this),
                autocomplete_priority: this.options.autocomplete_priority
            }, {
                separate_ident: !0
            }), this.writer.$node[0].style.paddingBottom = "", r && (this.writer.$node[0].style.minHeight = r), this.writer.insert_thumbs = !0;
            try {
                localStorage.getItem("writeranywhere-editing-mode-" + this.owner.type) && this.writer.switchToHtmlMode()
            } catch (s) {}
            var o = !1;
            this.options.initial_sidebar_on_expand || (o = this.options.initial_sidebar_selection ? this.options.initial_sidebar_selection : this.options.has_conversation ? "conversation" : "stash");
            var n = this;
            WriterAnywhere_Persist.sidebar ? (WriterAnywhere_Persist.sidebar.click_callback = this.options.sidebar_click_callback.bindTo(this), WriterAnywhere_Persist.sidebar.options.premium_upsell = this.options.sidebar_premium_upsell, WriterAnywhere_Persist.sidebar.reinit_modes(["gallery", "faves", "search", this.options.has_conversation ? "conversation" : "", "stash", "art", "emotes"], o), PubSub.unsubscribe([{
                eventname: "WriterEmbed.loaded",
                subscriber: WriterAnywhere_Persist
            }, {
                eventname: "WriterSidebar.activate_tab",
                subscriber: WriterAnywhere_Persist
            }, {
                eventname: "Writer.sync",
                subscriber: WriterAnywhere_Persist
            }])) : WriterAnywhere_Persist.sidebar = new WriterSidebar(e(".commentwriter-sidebar-inner"), this.options.sidebar_click_callback.bindTo(this), {
                initial_selection: o,
                upload_thumb: !0,
                height_drop: this.options.height_drop,
                sections: ["gallery", "faves", "search", this.options.has_conversation ? "conversation" : "", "stash", "art", "emotes"],
                premium_upsell: this.options.sidebar_premium_upsell
            }), PubSub.subscribe([{
                eventname: "WriterEmbed.loading",
                subscriber: WriterAnywhere_Persist,
                callback: this.disable_sidebar_if_necessary.bindTo(n)
            }, {
                eventname: "WriterSidebar.activate_tab",
                subscriber: WriterAnywhere_Persist,
                callback: this.disable_sidebar_if_necessary.bindTo(n)
            }, {
                eventname: "Writer.sync",
                subscriber: WriterAnywhere_Persist,
                callback: this.disable_sidebar_if_necessary.bindTo(n)
            }]), this.sidebar = WriterAnywhere_Persist.sidebar, this.owner.after_load.apply(this)
        },
        hook: function() {
            if (this.ccwriter_closed = 0, this.ccwriter_initing = 1, "deleted" != this.gmi_lifecycle) {
                if (!this.writer) return DWait.ready(["cssms/lib/writer.css", "cssms/pages/stash/stash.override.thumbs.css", "cssms/pages/stash/stash.header.css", "cssms/lib/writer-subtoolbar.css", "cssms/drawplz/muro_comment.css", "jms/lib/writer/factory.js", "jms/lib/sidebar.js"], bind(this, function() {
                    "deleted" == this.gmi_lifecycle || this.ccwriter_closed || (this.load(), this.hook())
                })), void 0;
                this.writer.$node.focus(bind(this, function() {
                    this.$writer_ui[0].className += " open", this.ccwriter_inited && Glbl("Site.is_stash") && !Glbl("InlineEditor.loaded") && !this.ccwriter_expanded && PubSub.publish("WriterAnywhere.expand"), Glbl("Site.is_stash") && (Glbl("StashStream.navigation_keyboard_disabled", !0), Glbl("StashStream.minibrowse_keyboard_disabled", !0))
                })), this.writer.$node.blur(bind(this, function() {
                    Glbl("Site.is_stash") && (Glbl.del("StashStream.navigation_keyboard_disabled"), Glbl.del("StashStream.minibrowse_keyboard_disabled")), this.writer.sync(), setTimeout(bind(this, function() {
                        !this.sidebar_clicked && this.sidebar && e(this.$writer_ui[0]).removeClass("open")
                    }), 100)
                })), this.$.addClass("ccwriter-wrapper").find("textarea").removeClass("writeranywhere"), this.sidebar.$.css({
                    top: 0
                }).hide(), this.sidebar.on_hide(), this.ccwriter_inited = 1, PubSub.subscribe([{
                    eventname: "WriterAnywhere.expand",
                    subscriber: this,
                    callback: this.expandWriterUI
                }, {
                    eventname: "WriterAnywhere.collapse",
                    subscriber: this,
                    callback: this.collapseWriterUI
                }, {
                    eventname: "WriterAnywhere.shutdown",
                    subscriber: this,
                    callback: this.closeWriterUI,
                    empty_queue_if_first_subscriber: !0
                }, {
                    eventname: "Location.changed",
                    subscriber: this,
                    callback: this.closeWriterUI,
                    empty_queue_if_first_subscriber: !0
                }, {
                    eventname: "Location.set",
                    subscriber: this,
                    callback: this.closeWriterUI,
                    empty_queue_if_first_subscriber: !0
                }]), this.owner.after_hook.apply(this), this.ccwriter_initing = 0, PubSub.publish("WriterAnywhere.hooked")
            }
        },
        closeWriterUI: function(i) {
            i = i || null, this.ccwriter_closing = 1;
            var t = e.Deferred();
            if (this.ccwriter_initing) PubSub.subscribe([{
                eventname: "WriterAnywhere.hooked",
                subscriber: this,
                callback: function() {
                    PubSub.unsubscribe([{
                        eventname: "WriterAnywhere.hooked",
                        subscriber: this
                    }]), t.resolve()
                }
            }]);
            else if (!this.ccwriter_inited) return t.resolve(), t;
            t.done(bind(this, function() {
                this.ccwriter_inited && this.ccwriter_closing && (PubSub.unsubscribe([{
                    eventname: "WriterAnywhere.expand",
                    subscriber: this
                }, {
                    eventname: "WriterAnywhere.collapse",
                    subscriber: this
                }, {
                    eventname: "WriterAnywhere.shutdown",
                    subscriber: this
                }, {
                    eventname: "Location.changed",
                    subscriber: this
                }, {
                    eventname: "Location.set",
                    subscriber: this
                }, {
                    eventname: "WriterEmbed.loading",
                    subscriber: WriterAnywhere_Persist
                }, {
                    eventname: "WriterSidebar.activate_tab",
                    subscriber: WriterAnywhere_Persist
                }, {
                    eventname: "Writer.sync",
                    subscriber: WriterAnywhere_Persist
                }]), this.ccwriter_inited = 0, this.ccwriter_closing = 0, this.ccwriter_closed = 1, this.owner && (this.owner.ccwriter = null, this.owner.active = !1), WriterAnywhere_Persist.sidebar.click_callback = function() {})
            }));
            var r = this.writer && !this.writer.$textarea.val().length;
            if (this.ccwriter_inited) if ("string" == typeof i) {
                this.owner.before_shutdown.apply(this), this.recordScrollPosition(), e.each(this.writer.toolbars, function(e, i) {
                    i.destroy()
                }), this.writer.destroy(), this.writer = null;
                var s = this.$.find("textarea");
                if (s.unwrap().unwrap().addClass("writeranywhere").removeClass("writer").hide().after(e('<div class="writeranywhere commentwriter-underlay' + (this.owner.options.expand_immediately ? " expandplz" : "") + (r ? " empty" : "") + '">').data("type", this.owner._type).html(s.val())), e(".commentwriter-toolbar-inner").empty(), e("body").hasClass("ccwriter-subframe")) {
                    var o = this.owner._get_bodycontent_selector.apply(this);
                    e(".commentwriter-interface").hide(), e("body").removeClass("stickhelper ccwriter-subframe ccwriter-journal"), e(window).off("resize.writeranywhere"), e(o).css("min-height", ""), e(o + " > *, #output:visible > *").css("margin-right", ""), e(o + ", #output:visible").css("right", "")
                }
                this.owner.after_shutdown.apply(this), this.scrollToWriterUI(), t.resolve()
            } else this.collapseWriterUI(bind(this, function() {
                this.writer.destroy(), this.writer = null;
                var i = this.$.find("textarea");
                i.unwrap().unwrap().addClass("writeranywhere").removeClass("writer").hide().after(e('<div class="writeranywhere commentwriter-underlay' + (this.owner.options.expand_immediately ? " expandplz" : "") + (r ? " empty" : "") + '">').data("type", this.owner._type).html(i.val())), t.resolve()
            }), !0);
            else t.resolve();
            return t
        },
        scrollToWriterUI: function(i) {
            var t = this.owner._get_bodycontent_selector.apply(this),
                r = i ? e("#output > " + t).length ? t : t + ", #output:visible" : document;
            if (this.ccwriter_scrolloffset) {
                var s = e(r),
                    o = this.ccwriter_scrolloffset.left,
                    n = this.ccwriter_scrolloffset.top;
                r == document ? (document.defaultView || document.parentWindow).scrollTo(o, n) : (s.scrollLeft(o), setTimeout(function() {
                    s.scrollTop(n), (document.defaultView || document.parentWindow).scrollTo(0, 0)
                }, 10))
            } else "string" == typeof r && e(document).scrollTop(1)
        },
        recordScrollPosition: function(i) {
            var t = this.owner._get_bodycontent_selector.apply(this),
                r = e(e("#output > " + t).length ? t : t + ", #output:visible"),
                s = r.length && i ? r : e(document);
            this.ccwriter_scrolloffset = {
                top: r.length && r.scrollTop() ? r.scrollTop() : s.scrollTop(),
                left: r.length && r.scrollLeft() ? r.scrollLeft() : s.scrollLeft()
            }
        },
        openSkinbar: function(i) {
            var t = this;
            this.sidebar.on_hide();
            var r = this.sidebar.$.find(".types-main").height();
            this.sidebar.$.addClass("sidebar-collapsed").find(".types-main").animate({
                height: 0
            }, i, function() {
                t.sidebar.top(), t.skinbar.display()
            }), e(".commentwriter-skinbar-inner .current-skin").hide(), this.skinbar.$.show().find(".types-main").css({
                height: 0
            }).animate({
                height: r
            }, i)
        },
        closeSkinbar: function(i) {
            var t = this,
                r = this.skinbar.$.find(".types-main").height();
            this.sidebar.$.removeClass("sidebar-collapsed").find(".types-main").animate({
                height: r
            }, 200), this.skinbar.applySkin(), this.skinbar.$.find(".types-main").animate({
                height: 0
            }, 200, function() {
                t.skinbar.$.hide(), e(".commentwriter-skinbar-inner .current-skin").show(), t.sidebar.modes[i].display(), t.sidebar.on_show()
            })
        },
        expandWriterUI: function() {
            if (!this.ccwriter_expanded) {
                this.ccwriter_wide = 326 > this.$.offset().left && 326 > e(window).width() - this.$.offset().left - this.$.width(), this.owner.before_expand.apply(this), this.ccwriter_expanded_first || (this.ccwriter_expanded_first = 1, this.options.initial_sidebar_on_expand && (this.sidebar.options.initial_selection = this.options.initial_sidebar_on_expand, this.sidebar.modes[this.options.initial_sidebar_on_expand].display())), this.sidebar.on_show(), this.recordScrollPosition(), e(".ohm-stickhelper:visible").length && e("body").addClass("stickhelper"), e("body").removeClass("ccwriter-collapsed").addClass("ccwriter-subframe"), e(window).off("resize.writeranywhere").on("resize.writeranywhere", e.throttle(50, bind(this, function() {
                    this.owner._expanded_resize.apply(this)
                }))), this.scrollToWriterUI(!0), e(".commentwriter-interface").show();
                var i = e("table#commentwriter-topmenu");
                i.removeAttr("style"), e(this.$writer_ui[0]).show().height(0).animate({
                    height: 46
                }, this.options.animate_time).find("table").show(), e(this.$writer_ui[1]).parent().show().width(0).animate({
                    width: 300
                }, this.options.animate_time, function() {
                    PubSub.publish("WriterAnywhere.expanded")
                }).children().show(), e.each(this.writer.toolbars, function(e, i) {
                    i.destroy()
                }), this.writer.createToolbars(null, [{
                    toolbar_name: "writer",
                    toolbar_node: e(".commentwriter-toolbar-inner")[0],
                    toolbar_button_class: "headerButton",
                    toolbar_menu_class: "headerMenu gmbutton2",
                    toolbar_order: ["separator", "undo", "redo", this.options.toolbar_file ? "file" : "", this.options.toolbar_edit ? "edit" : "", "separator"]
                }, {
                    toolbar_name: "writersub",
                    toolbar_node: e(".commentwriter-toolbar-inner")[0],
                    toolbar_button_class: "subToolbarButton",
                    toolbar_menu_class: "subToolbarMenu",
                    toolbar_popup_class: "stashwriter-subtoolbar-menu stashwriter-subtoolbar-menu",
                    toolbar_order: e.merge(["bold", "italic", "underline", this.options.toolbar_headings ? "headings" : "", "separator", "ul", "ol", "blockquote"], e.merge(this.options.toolbar_align ? ["separator", "alignl", "alignc", "alignr"] : [], this.options.toolbar_link ? ["separator", "link2"] : []))
                }]), e.each(this.writer.toolbars, function(e, i) {
                    i.show(), i.rebind()
                }), e(this.$writer_ui[0]).find(".commentwriter-cancel, .commentwriter-submit, .commentwriter-preview").off("click.writeranywhere"), e(this.$writer_ui[0]).find(".oh-stashmain").hover(function() {
                    e(this).addClass("mmhover")
                }, function() {
                    e(this).removeClass("mmhover")
                }), this.owner.after_expand.apply(this), PubSub.publish("WriterSidebar.start_stash"), this.$.addClass("expanded"), e(window).trigger("resize.writeranywhere"), this.ccwriter_expanded = 1
            }
        },
        collapseWriterUI: function(i, t) {
            var r = this,
                s = this.owner._get_bodycontent_selector.apply(this),
                o = e(s),
                n = e("#output:visible"),
                a = o.add(n),
                l = a.children();
            t = t || !1, this.owner.before_collapse.apply(this, [t]), PubSub.publish("WriterSidebar.stop_stash"), this.recordScrollPosition(!t), e(".commentwriter-toolbar").animate({
                height: 0
            }, this.options.animate_time), l.animate({
                "margin-right": 0
            }, this.options.animate_time), a.scrollLeft() ? a.animate({
                right: 0,
                scrollLeft: 0
            }, this.options.animate_time) : a.animate({
                right: 0
            }, this.options.animate_time), this.sidebar && this.sidebar.on_hide(), e(".commentwriter-sidebar").animate({
                width: 0
            }, this.options.animate_time, bind(this, function() {
                this.ccwriter_inited && (this.writer.$node.off("focus.writeranywhere"), e("body").removeClass("ccwriter-subframe ccwriter-journal").addClass("ccwriter-collapsed"), e(window).off("resize.writeranywhere"), o.css("min-height", ""), l.css("margin-right", ""), a.css("right", ""), r.scrollToWriterUI(), e("body").removeClass("stickhelper"), this.ccwriter_wide = 0, e.each(this.writer.toolbars, function(e, i) {
                    i.destroy()
                }), this.writer.createToolbars(null), e.each(this.writer.toolbars, function(e, i) {
                    i.show(), i.rebind()
                }), e("#modalspace .commentwriter-interface").detach().appendTo("body"), e(".commentwriter-interface").hide(), this.$.removeClass("expanded"), this.ccwriter_expanded = 0, PubSub.publish("WriterAnywhere.collapsed", t), i && "function" == typeof i && i.call())
            })), this.owner.after_collapse.apply(this, [t]), e('<input style="position:fixed; left: 0; top: 0">').appendTo("body").focus().remove()
        },
        _sidebar_should_be_disabled: function() {
            if (!this.options.embedded_item_limit) return ddt.log("writer", "no embedded_item_limit"), !1;
            if (!this.writer) return ddt.log("writer", "no writer active"), !1;
            var e = this.writer.$node.find('.writer-embed[data-embed-type!="emoticon"], .writer-embed-loader[data-embed-type!="emoticon"]').length;
            return this.options.embedded_item_limit > e ? (ddt.log("writer", "embed limit not reached"), !1) : "emotes" == this.sidebar.active.name ? (ddt.log("writer", "we're on emotes"), !1) : !0
        },
        disable_sidebar_if_necessary: function() {
            this.sidebar && (this._sidebar_should_be_disabled() ? (ddt.log("writer", "sidebar should be disabled"), 0 === this.sidebar.active.$main.find(".writer-sidebar-limit-overlay").length && this.sidebar.active.show_overlay("limit", e("<div>The maximum of <b>" + this.options.embedded_item_limit + " thumbnails</b> for this comment has already been reached.</div>"))) : (ddt.log("writer", "sidebar should NOT be disabled"), this.sidebar.$.find(".writer-sidebar-limit-overlay").remove()))
        }
    })
})(jQuery), window.DWait && DWait.run("jms/pages/writeranywhere/core.js");
DWait.ready(["jms/pages/writeranywhere/core.js"], function() {
    (function(e) {
        var t = Base.extend({
            types: {},
            storage: {},
            get: function(e, t, i, r, n) {
                if (t.length && (n || this.enabled(t))) {
                    if (!this.types[e]) return ddt.log("writer", "Tried to initialize WriterAnywhere with invalid type", e), void 0;
                    var s = this._id(t);
                    return this.storage[s] || (this.storage[s] = new this.types[e], this.storage[s]._type = e), this.attach(t, i, r), this.storage[s]
                }
            },
            getInto: function(t, i, r) {
                i.length && Function.prototype.bind && (this[r] ? this[r].detach(!0, !0) : e.Deferred().resolve()).done(bind(this, function() {
                    this[r] = WriterAnywhereFactory.get(t, i, !0), this[r] && i.addClass("writeranywhere")
                }))
            },
            register: function(e, t, i) {
                i.type = e, this.types[e] = t ? this.types[t].extend(i) : i
            },
            enabled: function(t) {
                return !(Glbl("Site.is_mobile") || !(Browser.isChrome || Browser.isFirefox || Browser.isSafari || Browser.isOpera || Browser.isIpad || Browser.isIE && !Browser.isIE8) || e(t).data("disable-writer") || e(t).find("textarea").data("disable-writer") || window.disable_writer_anywhere || jQuery.fn.jquery != e().jquery || !jQuery.expr[":"].gmi || !e.expr[":"].gmi)
            },
            remove: function(e) {
                e[0].getAttribute("ident") && Writer.active.id == e[0].getAttribute("ident") + "-writer" && (Writer.active = null);
                var t = this._id(e);
                delete this.storage[t]
            },
            attach: function(e, t, i) {
                t = t || !1, i = i || !1;
                var r = this._id(e);
                i ? (this.storage[r].attach(e), t && this.storage[r].activate()) : this.detachAll().done(bind(this, function() {
                    this.storage[r].attach(e), t && this.storage[r].activate()
                }))
            },
            reattachAll: function() {
                for (var t in this.storage) {
                    var i = e("[ccwident=" + t + "]");
                    this.storage[t].active || this.storage[t].attach(i)
                }
            },
            detachAll: function(t, i) {
                t = t || !1, i = i || !1;
                var r = e.Deferred(),
                    n = 0;
                for (var s in this.storage) this.storage.hasOwnProperty(s) && n++;
                if (n) {
                    var a = 0,
                        o = 0;
                    for (var s in this.storage) e("[ccwident=" + s + "]"), a++, this.storage[s].active ? this.storage[s].detach(t, i).done(bind(this, function() {
                        o++, o == a && r.resolve()
                    })) : (o++, o == a && r.resolve())
                } else r.resolve();
                return r
            },
            detachOthers: function(t, i) {
                i = i || !1;
                var r = e.Deferred(),
                    n = 0,
                    s = 0;
                for (var a in this.storage) e("[ccwident=" + a + "]"), n++, this.storage[a].active && this.storage[a]._id() != t._id() ? this.storage[a].detach(i).done(bind(this, function() {
                    s++, s == n && r.resolve()
                })) : (s++, s == n && r.resolve());
                return n || r.resolve(), r
            },
            _id: function(e) {
                if (e[0].getAttribute("ccwident")) return e[0].getAttribute("ccwident");
                var t = "writeranywhere" + Math.round(1e10 * Math.random());
                return e[0].setAttribute("ccwident", t), t
            }
        });
        window.WriterAnywhereFactory = new t, PubSub.subscribe([{
            eventname: "gWebPage.update",
            subscriber: WriterAnywhere_Persist,
            callback: function(e, t) {
                if ((!t.called_from || "Deck.categoryHelpPreview" != t.called_from) && (WriterAnywhereFactory.detachAll(!0), this.sidebar)) {
                    var i = this.sidebar.options.initial_selection || "art";
                    this.sidebar.modes[i] && this.sidebar.modes[i].display()
                }
            }
        }]), e(document).on("click.writerunderlay", ".commentwriter-underlay", function(t) {
            var i = e(t.target);
            i.is(".commentwriter-underlay") || (i = i.closest(".commentwriter-underlay"));
            var r = i.siblings("textarea.writeranywhere");
            if (i.data("type")) {
                var n = i.hasClass("expandplz");
                WriterAnywhereFactory.get(i.data("type"), r, !0) || ddt.log("writer", "WriterAnywhere re-activation failed", i), PubSub.subscribe([{
                    eventname: "WriterAnywhere.hooked",
                    subscriber: {},
                    callback: function() {
                        PubSub.unsubscribe([{
                            eventname: "WriterAnywhere.hooked",
                            subscriber: this
                        }]);
                        var e = r.closest(":gmi(WriterAnywhere)").gmi1();
                        e && PubSub.subscribe([{
                            eventname: "WriterAnywhere.collapsed",
                            subscriber: {},
                            callback: function() {
                                PubSub.unsubscribe([{
                                    eventname: "WriterAnywhere.collapsed",
                                    subscriber: this
                                }]), e.writer.$node.focus(), n && PubSub.publish("WriterAnywhere.expand")
                            }
                        }])
                    }
                }])
            }
        }), WriterAnywhereFactory.register("base", null, Base.extend({
            ccwriter: null,
            $node: null,
            active: !1,
            activating: !1,
            options: {},
            _id: function() {
                return this.$node[0].getAttribute("ccwident") || ""
            },
            attach: function(t) {
                if (!this.active && !this.activating) {
                    this.$node = t;
                    var i = '<a class="showMedia" href="#showMedia">Add Media</a>',
                        r = '<div class="drawPlz"><div class="topbar hh">' + i + "</div></div>",
                        n = t,
                        s = n.parent().parent(),
                        a = !0;
                    if ((Glbl("Site.is_stash") || Glbl("Site.is_mobile")) && (a = !1), n.parents(":gmi(GMFrame_Gruser)").length && 153 == n.parents(":gmi(GMFrame_Gruser)").gmiAttr("typeid") && (a = !1), !n.hasClass("butan") && (n[0].className += " butan", a && (s.hasClass("cctextarea") || s.children("td.f").length ? s.children("td.f").length ? (s = s.closest("table.f"), s.find(".drawPlz").length ? s.find(".topbar").prepend(i) : s.find("td.f").append(r)) : s.find(".drawPlz").length ? s.find(".topbar").prepend(i) : s.append(r) : n.parent().append(r)), n.val().length)) {
                        var o = n.height();
                        n.hide().after(e('<div class="writeranywhere commentwriter-underlay' + (this.options.expand_immediately ? " expandplz" : "") + '" data-type="' + this._type + '">').html(n.val())).siblings(".commentwriter-underlay").css("height", o)
                    }
                    e("a.showMedia", s).off("click.writeranywhere").on("click.writeranywhere", function() {
                        var t = e(this);
                        do t = t.parent();
                        while (!t.find("textarea.writeranywhere, div.ccwriter-wrapper").length);
                        return t.find("textarea.writeranywhere").addClass("expandplz").click(), !1
                    }), e("textarea.writeranywhere, .commentwriter-underlay", s).off("click.writeranywhere, focus.writeranywhere").on("click.writeranywhere, focus.writeranywhere", bind(this, function(t) {
                        t.cancelBubble = !0;
                        var i = e(t.target);
                        i.is("textarea") || ($v = i.siblings("textarea"), $v.length ? i = $v : ($v = i.siblings(":gmi(WriterAnywhere)"), i = $v.find("textarea")));
                        var r = i[0].getAttribute("ident");
                        return r && i.is(":visible") && e("#" + r + "-writer:hidden").length ? !0 : (this.activate(), !1)
                    }))
                }
            },
            activate: function() {
                this.active || this.activating ? ddt.log("writer", "WriterAnywhere already active in this instance") : (this.activating = !0, PubSub.publish("WriterAnywhere.shutdown"), WriterAnywhereFactory.detachOthers(this).done(bind(this, function() {
                    this.$node.parents(":gmi(WriterAnywhere)").length || this.$node.wrap(e("<div>", {
                        "data-gmiclass": "WriterAnywhere"
                    })).gmiWake(), this.ccwriter = this.$node.parent().gmi1(), this.ccwriter.setOwner(this), this.ccwriter.hook(), this.active = !0, this.activating = !1
                })))
            },
            detach: function(t, i) {
                if (t = t || !1, i = i || !1, this.ccwriter) {
                    var r = this.ccwriter.closeWriterUI(t ? "Shut Down Everything" : null);
                    return r.done(bind(this, function() {
                        PubSub.publish("WriterSidebar.stop_stash"), this.ccwriter = null, this.active = !1, i || this.attach(this.$node)
                    })), r
                }
                return e.Deferred().resolve()
            },
            before_load: function() {},
            after_load: function() {},
            after_hook: function() {
                Glbl("Site.is_stash") || this.writer.$textarea.hasClass("expandplz") ? setTimeout(bind(this, function() {
                    this.writer.$textarea.removeClass("expandplz"), e(".ccwriter-hidden-furniture").removeClass("ccwriter-hidden-furniture"), PubSub.publish("WriterAnywhere.expand")
                }), 25) : PubSub.publish("WriterAnywhere.collapse", !0), this.writer.$node.focus()
            },
            before_expand: function() {
                "undefined" != typeof da_minish_lub && da_minish_lub.init(), "undefined" != typeof Lub && Lub.shutdown(), e(".commentwriter-skinbar-inner").hide();
                var t = this.owner._get_bodycontent_selector.apply(this);
                this.$.offset().left + this.$.width() > e(t + ", #output:visible").width() - 326 && this.ccwriter_wide && e(t + " > *, #output:visible > *").css("margin-right", this.options.sidespace - this.$.offset().left), e(t + " + #depths").css("display", "")
            },
            after_expand: function() {
                var t = this.owner._get_bodycontent_selector.apply(this);
                if (this.$.offset().left + this.$.width() > e(t + ", #output:visible").width() && (e(t + ", #output:visible").animate({
                    scrollLeft: this.$.offset().left + this.$.width() - e(t + ", #output:visible").width()
                }, this.options.animate_time), this.ccwriter_wide && e(t + ", #output:visible").scrollTop(this.$.offset().top - 46 + e(t + ", #output:visible").scrollTop())), e(this.$writer_ui[0]).find(".commentwriter-preview, .commentwriter-submit").show(), e(this.$writer_ui[0]).find(".commentwriter-submit em").text("Submit"), e(this.$writer_ui[0]).find(".commentwriter-cancel").on("click.writeranywhere", bind(this, function() {
                    return this.writer.remember_selection(), PubSub.publish("WriterAnywhere.collapse"), this.writer.restore_selection(), !1
                })), this.$.siblings(".drawPlz").find(".showMedia").text("Hide Media").off("click.writeranywhere").on("click.writeranywhere", bind(this, function() {
                    return this.writer.remember_selection(), PubSub.publish("WriterAnywhere.collapse"), this.writer.restore_selection(), !1
                })), Glbl("Site.is_mobile")) {
                    var i = e(e("#output > " + t).length ? t : t + ", #output:visible");
                    i.css("right", 0), e(".commentwriter-sidebar").hide()
                }
            },
            before_collapse: function() {},
            after_collapse: function(e) {
                this.$.siblings(".drawPlz").find(".showMedia").text("Add Media").off("click.writeranywhere").on("click.writeranywhere", bind(this, function() {
                    return this.writer.remember_selection(), PubSub.publish("WriterAnywhere.expand"), this.writer.restore_selection(), !1
                })), e || this.owner._postcollapse_restart_lub.apply(this)
            },
            before_shutdown: function() {},
            after_shutdown: function() {
                var t = this.owner._get_bodycontent_selector.apply(this);
                e("body").removeClass("ccwriter-subframe stickhelper"), e(window).off("resize.writeranywhere"), e(t).css("min-height", ""), e(".commentwriter-interface").hide()
            },
            _expanded_resize: function() {
                var t = {
                    width: e(window).width(),
                    height: e(window).height()
                }, i = t.height - 46 - 32 - (e("body").hasClass("stickhelper") ? 25 : 0),
                    r = this.owner._get_bodycontent_selector.apply(this);
                e(r).css("min-height", i), e(".commentwriter-sidebar").css("height", t.height - 46 - 20), e(".commentwriter-toolbar-outer").css("width", t.width - 218 - e(".commentwriter-actions").outerWidth(!0))
            },
            _postcollapse_restart_lub: function() {
                "undefined" != typeof Lub && (Lub.reboot(), setTimeout(function() {
                    "undefined" != typeof da_minish_lub && da_minish_lub.init()
                }, 1e3))
            },
            _get_bodycontent_selector: function() {
                return vms_feature("new_devpage") ? ".dev-page-container:visible" : "#dv7"
            }
        })), PubSub.publish("QUnit.WriterAnywhereFactory.loaded")
    })(jQuery), window.DWait && DWait.run("jms/pages/writeranywhere/factory.js")
});
DWait.ready(["jms/pages/writeranywhere/core.js", "jms/pages/writeranywhere/factory.js", "jms/pages/talkpost.js", "jms/pages/ccomment.js", "jms/pages/ccommentthread.js"], function() {
    (function(t) {
        WriterAnywhereFactory.register("comment", "base", {
            options: {
                has_conversation: !0,
                toolbar_align: !1,
                initial_sidebar_on_expand: "emotes",
                passthrough_tab: !0,
                block_sidescroll: !0,
                sidespace: 100,
                image_actions: ["Draw", "Thumb", "Link", "Remove"],
                image_resize: !1,
                animate_time: 150,
                sync_timeout: 200,
                sidebar_premium_upsell: !0,
                embedded_item_limit: 5,
                on_switch_editing_mode: function() {
                    this.ccwriter_toplevel && (this.cctalkpost.owner.writer_focused = this.writer.$node.is(":visible"), this.cctalkpost.owner.refreshTextareaState())
                },
                valid_tags: ["br", "hr", "strong", "b", "code", "sub", "sup", "small", "tt", "acronym", "a", "abbr", "strike", "em", "i", "s", "u", "ins", "span", "blockquote", "p", "bcode", "ul", "ol", "li", "div", "da:thumb", "da:bigthumb", "da:emoticon", "da:drawing"],
                valid_attrs: ["height", "href", "name", "title", "width", "target"],
                limits_override_deviations: [388461696, 405848886]
            },
            before_load: function() {
                this.base.apply(this), this.ccwriter = this.$.closest(":gmi(CCommentThread), :gmi(TalkPostWrapper), .ccomment-post").length, this.ccwriter_toplevel = this.$.closest(":gmi(TalkPostWrapper)").length;
                var e = this.options.autocomplete_priority = [];
                if (this.ccwriter_toplevel) this.cctalkpost = this.owner.$node.closest(":gmi(TalkPostWrapper)").gmi1().talkpost;
                else {
                    this.cctalkpost = this.owner.$node.closest(".talk-post").data("TalkPost");
                    var i = this.$.closest("div.nest").prev(".ccomment-activereply").find(".cc-name .username-with-symbol .username").text();
                    i != window.deviantART.deviant.username && e.push(i)
                }
                if (1 == this.cctalkpost.comment.typeid || 61 == this.cctalkpost.comment.typeid) {
                    var r = t(".dev-view-about .dev-title-container h1 .username-with-symbol .username").text();
                    r != window.deviantART.deviant.username && e.push(r)
                }
                this.owner.adjust_limits.apply(this)
            },
            adjust_limits: function() {
                if (18 == this.cctalkpost.comment.typeid) this.options.embedded_item_limit = 200;
                else if (!window.deviantART.deviant.subbed) {
                    if ((1 == this.cctalkpost.comment.typeid || 61 == this.cctalkpost.comment.typeid) && t.inArray(0 | this.cctalkpost.comment.itemid, this.options.limits_override_deviations) >= 0) return this.options.sidebar_premium_upsell = !1, void 0;
                    var e = {
                        "da:embed": !0,
                        "da:widget": !0,
                        "da:deviation": !0,
                        "da:thumb": !0,
                        "da:bigthumb": !0
                    };
                    this.options.valid_tags = t.grep(this.options.valid_tags, function(t) {
                        return !(t in e)
                    })
                }
            },
            after_load: function() {
                var e = this.$.closest(":gmi(TalkPostWrapper)").gmi1();
                e && (e.refreshTextareaState(), e.gmi_node.className += " ccexpanded"), this.writer.$node.on("keydown.ccwriter", bind(this, function(e) {
                    if (!this.writer.autocomplete || !this.writer.autocomplete.isShown()) {
                        if (!(9 != e.which || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey)) {
                            e.preventDefault();
                            var i = this.writer.$textarea.attr("tabindex");
                            return t("[tabindex=" + ++i + "]", this.$.closest(":gmi(TalkPostWrapper), .ccomment-post, .talk-post")).focus(), !1
                        }
                        return 13 == e.which && (e.ctrlKey || e.metaKey) ? (e.preventDefault(), this.writer.syncer.sync(), this.$.closest(":gmi(TalkPostWrapper), .ccomment-post, .talk-post").find("span.post").click(), !1) : void 0
                    }
                })), Browser.isIE ? (this.$.css("min-height", 148), this.writer.$node.css("min-height", 146), !this.owner.active && this.owner.activating && this.owner._resize_writer.apply(this), setTimeout(bind(this, function() {
                    this.owner._scroll_down_talkpost.apply(this), this.writer.$node.focus()
                }), 0), this.$.parent().parent().find(".drawPlz").show()) : (this.$.addClass("ccwriter-raisin-closed").removeClass("ccwriter-raisin-open").animate({
                    height: 148
                }, {
                    duration: 150,
                    done: bind(this, function() {
                        this.ccwriter_inited && (this.$.css({
                            height: "",
                            "min-height": 148
                        }).removeClass("ccwriter-raisin-closed").addClass("ccwriter-raisin-open"), this.writer.$node.css("min-height", 146), this.owner._resize_writer.apply(this), setTimeout(bind(this, function() {
                            this.owner._scroll_down_talkpost.apply(this)
                        }), 0))
                    })
                }), this.$.parent().parent().find(".drawPlz").hide().fadeIn(300)), t(window).on("resize.ccwriter", t.throttle(50, this.owner._resize_writer.bindTo(this))), t("body").hasClass("ccwriter-webscale") || (document.body.className += " ccwriter-webscale"), this.writer.insert_thumbs = !0, this.writer.insert_thumb_format = "200H", this.drawplz_button = this.$.closest(".ccomment-form, .ccomment-post").find(".showDrawPlz").off("click.writeranywhere").on("click.writeranywhere", this.owner._draw_click.bindTo(this)), this.ccwriter_toplevel && this.cctalkpost.owner.$.find(".inputs").show()
            },
            after_expand: function() {
                if (this.owner._resize_writer.apply(this), this.base.apply(this), this.cctalkpost.showCancel(), t(this.$writer_ui[0]).find(".commentwriter-cancel").show().on("click.writeranywhere", bind(this, function() {
                    return this.cctalkpost.confirmCancel(), !1
                })), t(this.$writer_ui[0]).find(".commentwriter-submit").show().on("click.writeranywhere", bind(this, function() {
                    return PubSub.publish("WriterAnywhere.collapse"), this.cctalkpost.confirmPost(), !1
                })).find("em").text("Submit Comment"), t(this.$writer_ui[0]).find(".commentwriter-preview").show().on("click.writeranywhere", bind(this, function() {
                    return this.cctalkpost.confirmPreview(), !1
                })), t(this.cctalkpost.node).find(".drawPlz .showMedia").addClass("hideMedia").text("Hide Media").off("click.writeranywhere").on("click.writeranywhere", bind(this, function() {
                    return PubSub.publish("WriterAnywhere.collapse"), !1
                })), vms_feature("dotdotdot")) {
                    var e = new t.Deferred;
                    if (e.done(bind(this, function(e, i) {
                        e && 0 !== e.length && (i = i || "Quote Original Comment", this.writer.$node.css({
                            "min-height": 110
                        }), this.$.addClass("contains-dots").append(t('<div class="writer-dotdotdot">...</div>').attr("title", i).on("click.writeranywhere", bind(this, function(i) {
                            i.preventDefault(), e.each(bind(this, function(e, i) {
                                var r = t(i).clone();
                                r.find(".thumb-attachment,.cc-signature").remove(), r.find(".thumb-attachment-content").replaceWith(function() {
                                    return t(this).data("html")
                                }), WriterEmbed.normalizeServerRenderedDaml(r), r.find('img[src^="http://e.deviantart."][alt]').replaceWith(function() {
                                    return t(this).attr("alt")
                                }), t("<blockquote>" + r.html() + "</blockquote>").appendTo(this.writer.$node)
                            })), this.writer.sync(), WriterEmbed.damlToLoaders(this.writer.$node), WriterEmbed.runLoaders(this.writer.$node), this.$.find(".writer-dotdotdot").trigger("mouseleave").remove(), t(".writer-dotdotdot-tooltip").remove()
                        })).on("mouseenter", function() {
                            var e = t(this);
                            e.attr("title") && (e.data("title", e.attr("title")), e.removeAttr("title")), e.after(t("<div>", {
                                text: e.data("title"),
                                "class": "writer-dotdotdot-tooltip"
                            }))
                        }).on("mouseleave", function() {
                            t(".writer-dotdotdot-tooltip").remove()
                        })))
                    })), this.ccwriter_toplevel) {
                        var i = this.$.closest(":gmi(TalkPostWrapper)").gmi1();
                        if (i) {
                            var r = (i.gmi_args.itemid, i.gmi_args.typeid);
                            if (r in {
                                61: !0,
                                1: !0
                            }) {
                                var s = "Quote Original Submission";
                                window.deviantART && 0 === window.deviantART.pageData.catpath.indexOf("journals/") && (s = "Quote Original Journal");
                                var o = t("#gmi-ResourcePageDisplayPane .text");
                                return o.length ? o.find(".da-quotable").length && (o = o.find(".da-quotable")) : o = t('<div><da:thumb id="' + (window.deviantART.pageData.privateid || window.deviantART.pageData.deviationid) + '"></div>'), e.resolve(o, s), void 0
                            }
                        }
                        e.reject()
                    } else this.$.closest(".mcbox").length ? e.resolve(this.$.closest(".mcbox").prev(".mcbox").find(".mcb-body")) : e.resolve(this.$.closest("div.nest").prev(".ccomment-activereply").find("div.text"))
                }
                var a = t(":gmi(ResViewContainer), :gmi(DeviationPageView)");
                if (a.length) {
                    var n = this.owner._get_bodycontent_selector.apply(this),
                        c = vms_feature("new_devpage") ? "full" == a.gmi1()._current_mode : a.gmi1().fullview_mode;
                    if (c) {
                        var d = t(n).scrollTop(),
                            l = this.$.offset().top;
                        vms_feature("new_devpage") ? a.gmi1().change_to_mode("normal") : a.gmi1().deviationChangeView(0, 1);
                        var h = this.$.offset().top;
                        t(n).scrollTop(d + (h - l))
                    }
                }
            },
            before_collapse: function() {
                if (this.$.find(".writer-dotdotdot").remove(), Browser.isSafari && !Browser.isPad && vms_feature("new_devpage")) {
                    var e = t(".dev-page-container:visible");
                    this.collapsing_scroll_position = e.scrollTop(), e.css("position", "static"), e.parent().scrollTop(this.collapsing_scroll_position)
                }
            },
            after_collapse: function(e) {
                this.base.apply(this, [e]), PubSub.subscribe([{
                    eventname: "WriterAnywhere.collapsed",
                    subscriber: this,
                    callback: function() {
                        PubSub.unsubscribe([{
                            eventname: "WriterAnywhere.collapsed",
                            subscriber: this
                        }]), this.owner._resize_writer.apply(this), Browser.isSafari && !Browser.isPad && vms_feature("new_devpage") && (t(".dev-page-container:visible").css("position", ""), t("body").scrollTop(this.collapsing_scroll_position), this.collapsing_scroll_position = null, t(window).trigger("resize"))
                    }
                }]), t(this.cctalkpost.node).find(".drawPlz .showMedia").removeClass("hideMedia").text("Add Media").off("click.writeranywhere").on("click.writeranywhere", bind(this, function() {
                    return PubSub.publish("WriterAnywhere.expand"), !1
                }))
            },
            before_shutdown: function() {
                this.$.find(".writer-dotdotdot").remove(), t(window).off("resize.ccwriter")
            },
            after_shutdown: function() {
                this.owner.ccwriter = null, this.owner.active = !1, t.contains(document.documentElement, this.cctalkpost.node) && ("normal" != this.cctalkpost.current_mode && this.cctalkpost.goMode("normal", !1), t(this.cctalkpost.node).find(".drawPlz .showMedia").removeClass("hideMedia").text("Add Media").off("click.writeranywhere"), this.ccwriter_toplevel && (this.owner.$node.find("textarea").val() || (this.cctalkpost.owner.textarea_focused = 0, this.cctalkpost.owner.writer_focused = 0, this.cctalkpost.owner.refreshTextareaState(), this.cctalkpost.owner.$.find(".inputs").hide(), this.cctalkpost.confirmExit())))
            },
            _scroll_down_talkpost: function() {
                var e, i, r = this.ccwriter_expanded ? ".dev-page-container:visible, #dv7:visible" : document;
                i = this.ccwriter_toplevel ? this.$.closest(":gmi(TalkPostWrapper)") : this.$.closest(".talk-post-reply"), e = i.offset().top + (this.ccwriter_expanded ? i.position().top : 0) + i.outerHeight() - t(window).height(), e > t(r).scrollTop() && t(r).scrollTop(e)
            },
            _resize_writer: function() {
                if (!this.writer) return ddt.log("writer", "_resize_writer not cleaned up", this), void 0;
                var t = 14;
                this.ccwriter_toplevel || (t = 82), this.writer.$node.width(this.$.closest(".ccomment-form, .ccomment-post, .talk-post").width() - t)
            },
            _draw_click: function(e) {
                e.preventDefault();
                var i = 1350,
                    r = 1020,
                    s = this.writer,
                    o = this.drawplz_button;
                if (!o.is(".loading")) {
                    o.addClass("loading");
                    var a = new Spinner(t.extend({}, SpinnerPresets.green, {
                        left: "-22px"
                    }));
                    a.spin(o[0]);
                    var n, c, d, l = this,
                        h = Glbl("Site.is_deviantart") ? "http://muro.deviantart.com" : "http://sta.sh/muro";
                    s.frame(h + "/iframe?width=" + i + "&height=" + r + "&background=clear", function(e, h) {
                        var m = "remove";
                        switch (e.action) {
                            case "error":
                                return o.removeClass("loading"), a.stop(), h.hidden && h.act("show"), void 0;
                            case "cancel":
                                return "remove";
                            case "got_id":
                                return c = e.id && parseInt(e.id, 36), void 0;
                            case "done":
                                d = e.img || d, l.cctalkpost.drawplz_saving++, m = "hide";
                                break;
                            case "save":
                                c = e.privateid || e.id || c, d = e.img || d, setTimeout(function() {
                                    l.cctalkpost.drawplz_saving--
                                }, 2e3);
                                break;
                            case "ready":
                                return setTimeout(function() {
                                    o.removeClass("loading"), a.stop()
                                }, 1e3), "show";
                            default:
                                return
                        }
                        if (c && d && !n) {
                            var p = t("<img>", {
                                src: d,
                                "class": "writer-embed writer-deviation-image writer-deviation-redraw",
                                "data-embed-id": c,
                                "data-embed-type": "drawing",
                                "data-embed-format": "image",
                                "data-embed-naturalwidth": i,
                                "data-embed-naturalheight": r
                            });
                            s.insert(p, !0), s.insert("<br><br>", null, null, null, !0), WriterEmbed.runLoaders(s.$node), n = !0
                        }
                        return m
                    })
                }
            }
        }), t(document).on("click.commentwriter", function(e) {
            var i = t(e.target).closest(".ccomment-form, .talk-post");
            if (i.length) {
                var r, s = t(e.target).closest(".ccomment-form");
                if (r = s.length ? s.gmi1().talkpost : i.data("TalkPost")) {
                    if (!r.commentwriter) return;
                    if (r.commentwriter.active) return
                }
                s.length && r.commentwriter.detach().done(function() {
                    GMI._delete(s.gmi1(), !0)
                }), "A" == e.target.nodeName && -1 !== e.target.className.indexOf("showMedia") && (i.find("textarea").addClass("expandplz"), e.preventDefault()), ddt.log("writer", "Reattaching from outside click", i.find("textarea")), WriterAnywhereFactory.get(Glbl("Site.is_stash") ? "stashcomment" : i.closest(".mczone").length ? "mccomment" : "comment", i.find("textarea"), !0, !0)
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/writeranywhere/comment.js")
});
DWait.ready(["jms/pages/writeranywhere/core.js", "jms/pages/writeranywhere/factory.js", "jms/pages/writeranywhere/comment.js"], function() {
    (function(e) {
        WriterAnywhereFactory.register("stashcomment", "comment", {
            options: {
                has_conversation: !0,
                toolbar_align: !0,
                initial_sidebar_on_expand: "conversation",
                passthrough_tab: !0,
                block_sidescroll: !0,
                sidespace: 100,
                image_actions: ["Draw", "Image", "Full", "Thumb", "Link", "Remove"],
                image_resize: !0,
                animate_time: 150,
                sync_timeout: 200,
                embedded_item_limit: !1,
                sidebar_premium_upsell: !1,
                valid_tags: ["br", "hr", "strong", "b", "code", "sub", "sup", "small", "tt", "acronym", "a", "abbr", "strike", "em", "i", "s", "u", "ins", "span", "blockquote", "p", "bcode", "ul", "ol", "li", "div", "da:deviation", "da:thumb", "da:bigthumb", "da:emoticon", "da:drawing"],
                expand_immediately: !0
            },
            after_load: function() {
                this.base.apply(this), this.writer.insert_thumbs = !1, this.writer.insert_thumb_format = null
            },
            after_expand: function() {
                this.base.apply(this), e(this.$writer_ui[0]).find(".commentwriter-cancel em").text("Close")
            },
            adjust_limits: function() {}
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/writeranywhere/stashcomment.js")
});
DWait.ready(["jms/pages/writeranywhere/core.js", "jms/pages/writeranywhere/factory.js", "jms/pages/writeranywhere/comment.js"], function() {
    (function() {
        WriterAnywhereFactory.register("mccomment", "comment", {
            before_load: function() {
                this.base.apply(this), this.options.has_conversation = !1, this.options.sidespace = 40, this.ccwriter = 0, this.ccwriter_toplevel = 0
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/writeranywhere/mccomment.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js"], function() {
    (function() {
        function e() {
            var e = {};
            if ($.each(i, function(t, i) {
                36e5 > new Date - i.ts && (e[t] = i)
            }), i = e, window.sessionStorage) try {
                sessionStorage.setItem("ImageCache", JSON.stringify(i))
            } catch (t) {
                ddt.log("ImageCache", "Ran out of space, have to wait until some existing items expire")
            }
        }
        function t(e) {
            var t = -1;
            if (!e.match(/th..\.deviantart\./)) return {
                deviationid: t,
                size: "unknown"
            };
            var i = e.match(/-d([0-9a-zA-Z]+)/);
            if (i && i[1] && (t = parseInt(i[1], 36)), e.match(/th..\.deviantart\./)) {
                if (e.match(/fs..\/150\//)) return {
                    deviationid: t,
                    size: "150"
                };
                if (e.match(/fs..\/300W\//i)) return {
                    deviationid: t,
                    size: "300W"
                }
            }
            return {
                deviationid: t,
                size: "unknown"
            }
        }
        var i = {};
        if (window.sessionStorage) {
            var a = sessionStorage.getItem("ImageCache");
            null !== a && (i = JSON.parse(a), ddt.log("ImageCache", "Reading cache from sessionStorage", i), e())
        }
        setInterval(e, 6e4), window.ImageCache = {
            set: function(t, a) {
                i[t] = {
                    ts: +new Date
                }, $.each(a, function(e, a) {
                    i[t][e] = a
                }), e(), ddt.log("ImageCache", "Setting entry for deviationid " + t, a, i)
            },
            get: function(e) {
                if (!e) return e;
                var a = t(e);
                if (ddt.log("ImageCache", "Extracted information for " + e, a), i[a.deviationid] && i[a.deviationid][a.size]) {
                    var n = i[a.deviationid][a.size];
                    return ddt.log("ImageCache", "Found an entry in the ImageCache for " + e), n
                }
                return ddt.log("ImageCache", "Did not find any entry in the ImageCache for " + e, i), e
            }
        }
    })(), window.DWait && DWait.run("jms/lib/imagecache.js")
});
if (window.DWait) {
    DWait.count()
}

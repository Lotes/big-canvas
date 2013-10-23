/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.DTask = Base.extend({
    constructor: function(t) {
        this.init(t)
    },
    init: function(t) {
        this.stop(), t = t || {}, this.id = t.id;
        for (var i = ["onComplete", "onStep", "totalSteps"], s = 0; i.length > s; ++s) {
            var n = i[s];
            t[n] === void 0 && this.throwError('Missing argument "' + n + '"')
        }
        return this.onComplete = "function" == typeof t.onComplete ? t.onComplete : this.throwError("Invalid onComplete handler."), this.onStep = "function" == typeof t.onStep ? t.onStep : this.throwError("Invalid onStep handler."), this.onChunk = "function" == typeof t.onChunk ? t.onChunk : !1, this.interval = t.interval || 1, this.totalSteps = t.totalSteps || 1, this.chunkSize = t.chunkSize || (0 | .05 * this.totalSteps) + 1, this.reset(), this
    },
    start: function() {
        return this.isRunning || (this.isPaused = !1, this.doStep()), this
    },
    end: function(t) {
        return this.stop().onComplete(t), this
    },
    pause: function() {
        return this.isPaused ? this.start() : (this.isPaused = !0, this.stop()), this
    },
    doStep: function() {
        this.onChunk && this.onChunk(this.currentStep, this.totalSteps);
        for (var t = Math.min(this.currentStep + this.chunkSize, this.totalSteps); t > this.currentStep;) this.onStep(this.currentStep++);
        return this.currentStep >= this.totalSteps ? (this.isCompleted = !0, this.end(success = !0)) : (this.timeoutId = setTimeout(this.doStep.bindTo(this), this.interval), this)
    },
    stop: function() {
        return clearTimeout(this.timeoutId), this.isRunning && !this.isPaused && this.onComplete(success = !1), this.isRunning = !1, this
    },
    reset: function() {
        return this.stop(), this.currentStep = 0, this.isPaused = this.isRunning = this.isCompleted = !1, this
    },
    throwError: function(t) {
        var i = "[DTask " + (this.id ? '"' + this.id + '"' : "") + "] Error:";
        throw Error(i + t)
    }
}), window.DWait && DWait.run("jms/lib/dtask.js");
var MathUtils = {
    ROOT_2: 1.4142135,
    rotatePoint: function(t, a) {
        return [t[0] * Math.cos(a) + t[1] * -Math.sin(a), t[0] * Math.sin(a) + t[1] * Math.cos(a)]
    },
    translatePoint: function(t, a) {
        return [t[0] + a[0], t[1] + a[1]]
    },
    transformPoint: function(t, a, n) {
        return MathUtils.rotatePoint(MathUtils.translatePoint(t, a), n)
    },
    getAngle: function(t, a) {
        var n = Math.pow(Math.pow(a, 2) + Math.pow(t, 2), .5);
        return t >= 0 && a >= 0 ? Math.asin(t / n) : t >= 0 ? Math.acos(a / n) : a >= 0 ? Math.asin(t / n) + 2 * Math.PI : Math.asin(-1 * t / n) + Math.PI
    },
    distance: function(t, a) {
        return Math.pow(Math.pow(a[0] - t[0], 2) + Math.pow(a[1] - t[1], 2), .5)
    },
    centerPoint: function(t, a, n) {
        var o = [t[0] + (a[0] - t[0]) / 2, t[1] + (a[1] - t[1]) / 2];
        return n ? [Math.round(o[0]), Math.round(o[1])] : o
    }
};
window.DWait && DWait.run("jms/pages/drawplz/mathUtils.js");
window.toHexByte = function(a) {
    return (a = parseInt(a, 10)) ? (a = 0 > a ? 0 : a > 255 ? 255 : a, "0123456789ABCDEF".charAt(a - (15 & a) >> 4) + "0123456789ABCDEF".charAt(15 & a)) : "00"
}, window.rgbaToHex = function(a) {
    var t = toHexByte;
    return t(a[0]) + t(a[1]) + t(a[2]) + t(a[3])
}, window.hexToRgba = function(a) {
    return [parseInt(a.substr(0, 2), 16), parseInt(a.substr(2, 2), 16), parseInt(a.substr(4, 2), 16), parseInt(a.substr(6, 2), 16)]
}, window.interpolateColor = function(a, t, r) {
    var e = hexToRgba(a),
        o = hexToRgba(t),
        n = 1 - r,
        s = parseInt(e[0] * n + o[0] * r, 10),
        w = parseInt(e[1] * n + o[1] * r, 10),
        i = parseInt(e[2] * n + o[2] * r, 10),
        u = parseInt(e[3] * n + o[3] * r, 10);
    return [s, w, i, u]
}, window.HSVToHex = function(a, t, r) {
    var e = HSVToRGB(a, t, r);
    return toHexByte(e[0]) + toHexByte(e[1]) + toHexByte(e[2])
}, window.HSVToRGB = function(a, t, r) {
    var e, o, n, s, w, i, u;
    switch (0 >= t && (t = .001), a >= 1 && (a = 0), a = 6 * a, e = a - Math.floor(a), o = Math.round(255 * r * (1 - t)), n = Math.round(255 * r * (1 - t * e)), s = Math.round(255 * r * (1 - t * (1 - e))), r = Math.round(255 * r), Math.floor(a)) {
        case 0:
            w = r, i = s, u = o;
            break;
        case 1:
            w = n, i = r, u = o;
            break;
        case 2:
            w = o, i = r, u = s;
            break;
        case 3:
            w = o, i = n, u = r;
            break;
        case 4:
            w = s, i = o, u = r;
            break;
        case 5:
            w = r, i = o, u = n
    }
    return [w, i, u]
}, window.HexToHSV = function(a) {
    return RGBToHSV(parseInt(a.substr(0, 2).substring(0, 2), 16), parseInt(a.substr(2, 2).substring(0, 2), 16), parseInt(a.substr(4, 2).substring(0, 2), 16))
}, window.RGBToHSV = function(a, t, r) {
    var e, o = Math.max(a, t, r),
        n = Math.min(a, t, r),
        s = o - n,
        w = o / 255,
        i = o > 0 ? s / o : 0;
    if (0 === i) e = 0;
    else {
        switch (o) {
            case a:
                e = (t - r) / (6 * s);
                break;
            case t:
                e = 1 / 3 + (r - a) / (6 * s);
                break;
            case r:
                e = 2 / 3 + (a - t) / (6 * s)
        }
        e > 1 && (e -= 1), 0 > e && (e += 1)
    }
    return [e, i, w]
}, window.RGBToHSP = function(a, t, r) {
    var e, o, n, s = .299,
        w = .587,
        i = .114,
        u = a / 255,
        c = t / 255,
        h = r / 255;
    n = Math.pow(s * u * u + w * c * c + i * h * h, .5);
    var b = Math.max(a, t, r),
        p = Math.min(a, t, r),
        M = b - p;
    if (o = b > 0 ? M / b : 0, 0 === o) e = 0;
    else {
        switch (b) {
            case a:
                e = (t - r) / (6 * M);
                break;
            case t:
                e = 1 / 3 + (r - a) / (6 * M);
                break;
            case r:
                e = 2 / 3 + (a - t) / (6 * M)
        }
        e > 1 && (e -= 1), 0 > e && (e += 1)
    }
    return [e, o, n]
}, window.HSPToRGB = function(a, t, r) {
    var e = [];
    return HSPToRGB_passedArray(a, t, r, e), e
}, window.HSPToRGB_passedArray = function(a, t, r, e) {
    var o, n, s, w, i = .299,
        u = .587,
        c = .114,
        h = 1 - t;
    switch (Math.floor(6 * a)) {
        case 0:
            a = 6 * a, 1 != t ? (w = 1 + a * (1 / h - 1), s = r / Math.pow(i / (h * h) + u * w * w + c, .5), o = s / h, n = s + a * (o - s)) : (o = Math.pow(r * r / (i + u * a * a), .5), n = o * a, s = 0);
            break;
        case 1:
            a = 6 * (2 / 6 - a), 1 != t ? (w = 1 + a * (1 / h - 1), s = r / Math.pow(u / (h * h) + i * w * w + c, .5), n = s / h, o = s + a * (n - s)) : (n = Math.pow(r * r / (u + i * a * a), .5), o = n * a, s = 0);
            break;
        case 2:
            a = 6 * (a - 2 / 6), 1 != t ? (w = 1 + a * (1 / h - 1), o = r / Math.pow(u / (h * h) + c * w * w + i, .5), n = o / h, s = o + a * (n - o)) : (n = Math.pow(r * r / (u + c * a * a), .5), s = n * a, o = 0);
            break;
        case 3:
            a = 6 * (4 / 6 - a), 1 != t ? (w = 1 + a * (1 / h - 1), o = r / Math.pow(c / (h * h) + u * w * w + i, .5), s = o / h, n = o + a * (s - o)) : (s = Math.pow(r * r / (c + u * a * a), .5), n = s * a, o = 0);
            break;
        case 4:
            a = 6 * (a - 4 / 6), 1 != t ? (w = 1 + a * (1 / h - 1), n = r / Math.pow(c / (h * h) + i * w * w + u, .5), s = n / h, o = n + a * (s - n)) : (s = Math.pow(r * r / (c + i * a * a), .5), o = s * a, n = 0);
            break;
        case 5:
            a = 6 * (1 - a), 1 != t ? (w = 1 + a * (1 / h - 1), n = r / Math.pow(i / (h * h) + c * w * w + u, .5), o = n / h, s = n + a * (o - n)) : (o = Math.pow(r * r / (i + c * a * a), .5), s = o * a, n = 0)
    }
    e[0] = Math.round(255 * o), e[1] = Math.round(255 * n), e[2] = Math.round(255 * s)
}, window.DWait && DWait.run("jms/pages/drawplz/lib/colorlib.js");
var Filler = Base.extend({
    constructor: function(i, t, e, n) {
        this.logger = new StdLogger("Filler"), this.fillFunction = i, this.tolerance = 0 | parseFloat(t), this.yieldFunction = e, this.yieldTime = 100 | parseInt(n)
    },
    fill: function(i, t, e, n) {
        return this.pd = i, t = parseInt(t), e = parseInt(e), 0 > t || 0 > e || t >= i.width || e >= i.height ? (this.logger.talkback("[muro] Error in filler, starting coord is off canvas", [t, e, i.width, i.height]), n(), void 0) : (this.targetColor = window.getPixel(i, t, e), this.callback = n, this.loopDetector = {}, this.stack = [], this.stack.push([e, this._findLine(t, e), [-1, - 1],
            [-1, - 1]
        ]), setTimeout(this._runForWhile.bindTo(this), 1), void 0)
    },
    _findLine: function(i, t) {
        var e, n, l, o, r = this.pd,
            s = this.tolerance,
            h = this.targetColor;
        if (0 > i || 0 > t || i >= r.width || t >= r.height) return null;
        if (e = window.getPixel(r, i, t), window.colorDistance(h, e) > s) return null;
        for (l = i, o = !1; !o;) l--, e = window.getPixel(r, l, t), (0 > l || window.colorDistance(h, e) > s) && (l++, o = !0);
        for (n = i, o = !1; !o;) n++, e = window.getPixel(r, n, t), (n >= r.width || window.colorDistance(h, e) > s) && (n--, o = !0);
        return this.fillFunction(l, t, n - l + 1, 1), [l, n]
    },
    _runForWhile: function() {
        for (var i, t, e, n, l, o, r, s = 0, h = (new Date).getMilliseconds(); this.stack.length > 0;) {
            r = this.stack.pop();
            try {
                n = r[0], line = r[1], l = r[2], o = r[3];
                var c = n + "_" + line[0] + "_" + line[1];
                if (this.loopDetector[c]) continue;
                if (this.loopDetector[c] = !0, n > 0) for (e = line[0]; line[1] >= e;) e >= l[0] && l[1] >= e ? e = l[1] + 1 : (i = this._findLine(e, n - 1), i && i.length > 0 && i[0] != i[1] ? (this.stack.push([n - 1, i, [-1, - 1], line]), e = i[1] + 1) : e++);
                if (this.pd.height - 1 > n) for (e = line[0]; line[1] >= e;) e >= o[0] && o[1] >= e ? e = o[1] + 1 : (t = this._findLine(e, n + 1), t && t.length > 0 && t[0] != t[1] ? (this.stack.push([n + 1, t, line, [-1, - 1]]), e = t[1] + 1) : e++)
            } catch (a) {
                this.logger.talkback("[muro] Error in filler", a), s = -1
            }
            if ((new Date).getMilliseconds() > h + this.yieldTime) return this.yieldFunction && this.yieldFunction(), setTimeout(this._runForWhile.bindTo(this), 1), void 0
        }
        try {
            this.yieldFunction && this.yieldFunction(), this.loopDetector = null
        } catch (a) {
            this.logger.talkback("[muro] Error in filler finish", a), s = -2
        } finally {
            this.callback(s)
        }
    }
});
window.DWait && DWait.run("jms/pages/drawplz/lib/filler.js");
window.controlPoints = function(firstPoint, secondPoint, thirdPoint, t) {
    if (
		!firstPoint 
		|| !thirdPoint 
		|| firstPoint[0] == secondPoint[0] && firstPoint[1] == secondPoint[1] 
		|| thirdPoint[0] == secondPoint[0] && thirdPoint[1] == secondPoint[1]
	) 
		return [[null, null], [null, null]];
    var pointA = [firstPoint[0] + (secondPoint[0] - firstPoint[0]) / 2, firstPoint[1] + (secondPoint[1] - firstPoint[1]) / 2],
        pointW = [secondPoint[0] + (thirdPoint[0] - secondPoint[0]) / 2, secondPoint[1] + (thirdPoint[1] - secondPoint[1]) / 2],
        distanceFirstSecond = Math.pow(Math.pow(secondPoint[0] - firstPoint[0], 2) + Math.pow(secondPoint[1] - firstPoint[1], 2), .5),
        distanceSecondThird = Math.pow(Math.pow(thirdPoint[0] - secondPoint[0], 2) + Math.pow(thirdPoint[1] - secondPoint[1], 2), .5),
        fracU = distanceFirstSecond / (distanceFirstSecond + distanceSecondThird),
        b = t ? t : .75,
        h = [pointA[0] + fracU * (pointW[0] - pointA[0]), pointA[1] + fracU * (pointW[1] - pointA[1])],
        l = [h[0] - (h[0] - pointA[0]) * b, h[1] - (h[1] - pointA[1]) * b],
        p = [h[0] - (h[0] - pointW[0]) * b, h[1] - (h[1] - pointW[1]) * b],
        M = [l[0] - (h[0] - secondPoint[0]), l[1] - (h[1] - secondPoint[1])],
        z = [p[0] - (h[0] - secondPoint[0]), p[1] - (h[1] - secondPoint[1])];
    return [M, z]
}, 
window.bezStep = function(o, n, r, t, a, w) {
    var e = [n[0] + o * (t[1][0] - n[0]), n[1] + o * (t[1][1] - n[1])],
        i = [t[1][0] + o * (a[0][0] - t[1][0]), t[1][1] + o * (a[0][1] - t[1][1])],
        u = [a[0][0] + o * (r[0] - a[0][0]), a[0][1] + o * (r[1] - a[0][1])],
        b = [e[0] + o * (i[0] - e[0]), e[1] + o * (i[1] - e[1])],
        h = [i[0] + o * (u[0] - i[0]), i[1] + o * (u[1] - i[1])],
        l = b[0] + o * (h[0] - b[0]),
        p = b[1] + o * (h[1] - b[1]);
    w(l, p)
}, window.bezYFromX = function(o, n, r, t, a, w) {
    var e = bezTFromX(o, n, r, t, a, w),
        i = o[1] + e * (r[1] - o[1]),
        u = r[1] + e * (t[1] - r[1]),
        b = t[1] + e * (n[1] - t[1]),
        h = i + e * (u - i),
        l = u + e * (b - u);
    return h + e * (l - h)
}, window.bezTFromX = function(o, n, r, t, a, w) {
    for (var e = n[0] - 3 * t[0] + 3 * r[0] - o[0], i = 3 * t[0] - 6 * r[0] + 3 * o[0], u = 3 * r[0] - 3 * o[0], b = o[0], h = [0, _bezXFromT(0, e, i, u, b)], l = [1, _bezXFromT(1, e, i, u, b)], p = (l[1] - h[1]) / (l[0] - h[0]), M = Math.abs((a - h[1]) / p), z = [M, _bezXFromT(M, e, i, u, b)]; Math.abs(z[1] - a) > w;) {
        if (a > z[1]) h = z;
        else {
            if (!(z[1] > a)) return z[0];
            l = z
        }
        p = (l[1] - h[1]) / (l[0] - h[0]), M = h[0] + Math.abs(a - h[1]) / p, z = [M, _bezXFromT(M, e, i, u, b)]
    }
    return z[0]
}, window._bezXFromT = function(o, n, r, t, a) {
    return Math.pow(o, 3) * n + Math.pow(o, 2) * r + Math.pow(o, 1) * t + a
}, window.DWait && DWait.run("jms/pages/drawplz/lib/bezier.js");
window.SlopeConstraint = Base.extend({
    constructor: function(t, i) {
        this.reset(), this.setOrigin(t), this.setDestination(i)
    },
    reset: function() {
        this.origin = this.destination = this.unit = this.distance = void 0, this.no_recalc_flags = {}, this.is_locked = !1
    },
    unlock: function() {
        this.is_locked = !1
    },
    lock: function() {
        this.is_locked = !0
    },
    tryToLockOntoSlope: function() {
        this.getDistance() >= (this.lock_orthogonally ? this.options.MIN_ORTHOGONAL_DISTANCE : this.options.MIN_DISTANCE) && this.lock()
    },
    isLocked: function() {
        return this.is_locked
    },
    isValidPoint: function(t) {
        return t && t.length && !isNaN(t[0]) && !isNaN(t[1])
    },
    isValid: function() {
        return !isNaN(this.getDistance())
    },
    constrain: function(t) {
        if (this.getDistance() >= (this.lock_orthogonally ? this.options.MIN_ORTHOGONAL_DISTANCE : this.options.MIN_DISTANCE)) try {
            var i = this.getUnit(),
                n = t[0] - this.origin[0],
                s = t[1] - this.origin[1],
                o = n * i[0] + s * i[1];
            return t[0] = Math.round(o * i[0] + this.origin[0]), t[1] = Math.round(o * i[1] + this.origin[1]), t
        } catch (h) {
            return t
        }
    },
    setOrigin: function(t) {
        this.is_locked || (this.origin = t, this.no_recalc_flags = {})
    },
    setDestination: function(t) {
        this.is_locked || (this.destination = t, this.no_recalc_flags = {})
    },
    translateTo: function(t) {
        try {
            var i = this.destination[0] - this.origin[0],
                n = this.destination[1] - this.origin[1],
                s = [t[0], t[1]],
                o = [t[0] + i, t[1] + n];
            this.origin = s, this.destination = o
        } catch (h) {
            console.log(h.message)
        }
    },
    getDistance: function() {
        return "distance" in this.no_recalc_flags || (this.distance = this.calcDistance(this.origin, this.destination), this.no_recalc_flags.distance = !0), this.distance
    },
    getUnit: function() {
        if (!("unit" in this.no_recalc_flags)) try {
            var t = this.origin[0] - this.destination[0],
                i = this.origin[1] - this.destination[1],
                n = Math.sqrt(t * t + i * i),
                s = n ? t / n : 0,
                o = n ? i / n : 0;
            this.unit = [s, o], this.no_recalc_flags.unit = !0
        } catch (h) {
            this.unit = null
        }
        if (this.lock_orthogonally) {
            var a = Math.abs(this.unit[0]),
                c = Math.abs(this.unit[1]);
            if (a * c > .353) {
                var r = .707106781;
                return [this.unit[0] > 0 ? r : -r, this.unit[1] > 0 ? r : -r]
            }
            return a > c ? [1, 0] : [0, 1]
        }
        return this.unit
    },
    setOrthogonalLock: function(t) {
        t = !! t, this.lock_orthogonally != t && (this.lock_orthogonally = t, this.no_recalc_flags = {})
    },
    calcDistance: function(t, i) {
        try {
            var n = i[0] - t[0],
                s = i[1] - t[1];
            return Math.sqrt(n * n + s * s)
        } catch (o) {
            return void 0
        }
    },
    options: {
        MIN_DISTANCE: 10,
        MIN_ORTHOGONAL_DISTANCE: 4
    }
}), window.DWait && DWait.run("jms/pages/drawplz/slopeconstraint.js");
DWait.ready(["jms/lib/browser.js", "jms/lib/Base.js", "jms/lib/dragger.js", "jms/pages/drawplz/lib/colorlib.js", "jms/lib/canvas.js", "jms/lib/dtask.js", "jms/pages/drawplz/drawBean.js", "jms/pages/drawplz/slopeconstraint.js"], function() {
    window.cumulativeOffset = function(t) {
        var s = 0,
            e = 0;
        if (t.parentNode) do s += t.offsetTop || 0, e += t.offsetLeft || 0, t = t.offsetParent;
        while (t);
        return [e, s]
    }, window.CanvasDrawing = Base.extend({
        constructor: function() {
            this.bean = mgr.bean, this.mainNode = this.bean.getMainNode(), this.$drawPlzCanvas = $(this.mainNode).find(".drawPlzCanvas"), this.isIPad = !1, this.brush = this.bean.getBrush(), this.bean.setLastUsedBrush(this.brush), this.bindEvents(), this.bindBean(), this.interval_id = null, this.interval_update = 20, this.mouse_coords = [0, 0], this.coords = [0, 0], this.velocity = [0, 0], this.maxSpeed = 20, this.inertia = 8, this.doesTiltWork = !0, this.slope = new SlopeConstraint, this.isWacom = null, this.forcedEraser = !1, this.lastCoords = null, this.lastEvent = null, this.inInnerShift = !1, $(".flyouts").remove().appendTo("body")
        },
        bindEvents: function() {
            var t = mgr.zoomManager;
            this.canvasDragger = new Dragger([$(".mouseCapture").get(0)], this.bean.getBufferCtx().obj.canvas.get(0), this.startDraw.bindTo(this), this.moveDraw.bindTo(this), this.endDraw.bindTo(this), t.transformCoords.bindTo(t)), wacomEnabled && $(this.mainNode).mousemove(this.detectEraser.bindTo(this))
        },
        detectEraser: function() {
            if (!mgr.bean.getIsPenDown()) try {
                if (3 == wacomPlugin.pointerType) "erase" != this.brush.options.whichTool && (this.forcedEraser = this.brush.options.name, mgr.toolManager.toolAction("erase"));
                else if (this.forcedEraser) {
                    switch (this.forcedEraser) {
                        case "Eye Dropper":
                            mgr.toolManager.toolAction("dropper");
                            break;
                        case "Flood Fill":
                            mgr.toolManager.toolAction("flood");
                            break;
                        default:
                            mgr.toolManager.toolAction("draw")
                    }
                    this.forcedEraser = null
                }
            } catch (t) {}
        },
        bindBean: function() {
            this.bean.subscribe("brush", function() {
                this.brush = this.bean.getBrush(), this.enableControls()
            }.bindTo(this))
        },
        setBackgroundColor: function(t) {
            this.bean.setBackgroundColor(t)
        },
        handleLineConstraint: function(t, s) {
            if (!this.brush.options.defaultModifiers) return !1;
            if (s.shiftKey || s.altKey) {
                if (t) if (this.slope.isValidPoint(this.slope.origin)) {
                    if (this.slope.isLocked() || (this.slope.setDestination(t), this.slope.setOrthogonalLock(s.shiftKey), this.slope.tryToLockOntoSlope()), this.slope.constrain(t), !this.slope.isLocked() && s.shiftKey) return !0
                } else this.slope.unlock(), this.slope.setOrigin(t), this.slope.setOrthogonalLock(s.shiftKey)
            } else this.slope.unlock(), this.slope.setOrigin(t), this.slope.setOrthogonalLock(s.shiftKey);
            return !1
        },
        iPadBug: function(t, s) {
            try {
                if (this.isIPad || s.touches.length > 0) {
                    this.isIPad = !0;
                    var e = mgr.bean.getScale();
                    return [t[0] + this.$drawPlzCanvas.scrollLeft() / e, t[1] + this.$drawPlzCanvas.scrollTop() / e]
                }
            } catch (i) {}
            return t
        },
        recordCoords: function(t, s, e) {
            var i = mgr.bean.getBrush();
            if (e || (e = mgr.bean.getRDWriter())) {
                var r = [t[0], t[1]];
                if (1 != t[2] || t[3] && t[3][0] && t[3][1]) {
                    if (1 != t[2]) {
                        var n = parseFloat(t[2].toFixed(4));
                        0 === n && (n = 1e-4), r.push(n)
                    } else r.push(1);
                    t[3] && t[3][0] && t[3][1] && r.push([t[3][0] ? parseFloat(t[3][0].toFixed(4)) : 0, t[3][1] ? parseFloat(t[3][1].toFixed(4)) : 0])
                }(s.shiftKey || s.altKey || s.ctrlKey || s.metaKey || i.update) && (r = {
                    c: r
                }, (s.shiftKey || s.altKey || s.ctrlKey || s.metaKey) && (r.e = [s.altKey, s.shiftKey, s.ctrlKey, s.metaKey])), e.addInstructionData(r)
            }
        },
        shiftLine: function(t, s) {
            this.inInnerShift = !0;
            try {
                if (this.startDraw(this.lastCoords, this.lastEvent), !this.brush.options.straightShift) for (var e = Math.floor(Math.max(Math.abs(this.lastCoords[0] - t[0]), Math.abs(this.lastCoords[1] - t[1])) / 4), i = 0; e > i; i++) {
                    var r = Math.round(this.lastCoords[0] + i * (t[0] - this.lastCoords[0]) / e),
                        n = Math.round(this.lastCoords[1] + i * (t[1] - this.lastCoords[1]) / e);
                    this.brush.options.shiftJitter && (r += (this.brush.random() - .5) * mgr.bean.getBrushSize() * this.brush.options.shiftJitter, n += (this.brush.random() - .5) * mgr.bean.getBrushSize() * this.brush.options.shiftJitter), this.brush.update && mgr.canvasDrawing.onIntervalUpdate(), this.moveDraw([r, n, t[2], t[3]], {
                        altKey: !1,
                        shiftKey: !1,
                        ctrlKey: !1,
                        metaKey: !1,
                        clientX: r,
                        clientY: n,
                        screenX: 2 * r,
                        screenY: 2 * n,
                        which: 1
                    })
                }
                this.moveDraw(t, s), this.endDraw(t, s)
            } finally {
                this.inInnerShift = !1
            }
        },
        startDraw: function(t, s) {
            $("body").focus(), mgr.bean.setIsPenDown(!0), this.numMoveDraws = 0;
            var e = this.iPadBug(t, s);
            if (s = s || window.event, !this.brush) return !1;
            if (this.addPressureData(e), !this.inInnerShift) {
                var i = mgr.bean.getRDWriter();
                i.isStub || (this.brush.recordStart(i), this.recordCoords(e, s, i))
            }
            if (mgr.toolManager.isDrawBrush(this.brush) && !this.inInnerShift && s.shiftKey) return this.shiftLine(e, s), !1;
            if (this.lastCoords = e, this.lastEvent = s, this.brush.lastCoords = null, this.brush.previousCoords = null, mgr.zoomManager.clearRefresh(), !this.bean.getSelectedLayer().isVisible()) switch (this.brush.options.name) {
                case "Eye Dropper":
                case "Selection":
                case "Move":
                case "Hand Tool":
                    break;
                default:
                    return this.canvasDragger.clearEvents(), mgr.bean.getRDReader() || (mgr.bean.getRDWriter().pushInstruction(), alert("You may not draw on an invisible layer")), !1
            }
            if (this.brush.shiftKey = !this.inInnerShift && s.shiftKey || !1, this.brush.altKey = s.altKey || !1, this.cursorPreview = mgr.cursorPreview, this.brush.options.defaultModifiers) {
                var r = this.slope,
                    n = !this.inInnerShift && s.shiftKey;
                r.setOrthogonalLock(n), (s.altKey || n) && e ? r.isValid() && !n ? r.isLocked() && r.translateTo(e) : (r.unlock(), r.setOrigin(e)) : r.reset()
            }
            return this.velocity = [0, 0], this.coords = this.mouse_coords = e, clearInterval(this.interval_id), this.brush.update && !mgr.bean.getRDReader() && (this.interval_id = setInterval(this.onIntervalUpdate.bindTo(this), this.interval_update)), this.brush.clearMinMax(), this.brush.startDraw(e, s), this.brush.options.handlesOwnMinMax || this.brush.minMax(e), window.SelectionManager && mgr.selectionManager.startMasking(), !0
        },
        moveDraw: function(t, s, e, i) {
            i = !! i, this.numMoveDraws++;
            var r = this.iPadBug(t, s);
            if (s = s || window.event, this.brush && (this.addPressureData(r), r[0] != this.lastCoords[0] || r[1] != this.lastCoords[1])) {
                if (this.brush.options.handlesOwnMinMax || this.brush.minMax(r), !this.inInnerShift) {
                    var n = mgr.bean.getRDWriter();
                    n.isStub || this.recordCoords(r, s, n)
                }
                if (this.lastCoords = r, this.lastEvent = s, null === this.isWacom && (this.isWacom = wacomPlugin.isWacom > 0 && (1 == wacomPlugin.pointerType || 3 == wacomPlugin.pointerType) ? !0 : !1), this.brush.shiftKey = !this.inInnerShift && s.shiftKey || !1, this.brush.altKey = s.altKey || !1, this.brush.options.defaultModifiers && this.handleLineConstraint(r, s)) return !1;
                this.mouse_coords = this.brush.lastCoords = r, this.brush.options.shouldHandleSharpStrokes && this.handleSharpStrokes(this.mouse_coords), this.brush.moveDraw(this.mouse_coords, s, i), window.SelectionManager && (!mgr.selectionManager.hasSelection || this.brush.options.handlesOwnSelection || this.brush.update || mgr.selectionManager.maskStagingBuffer(this.brush.options.maskBuffers))
            }
        },
        endDraw: function(t, s) {
            if (s = s || window.event, this.brush) {
                var e = null;
                if (this.inInnerShift || (e = mgr.bean.getRDWriter()), this.brush.options.minMoveDraws > this.numMoveDraws && this.brush.dotFunction && this.brush.dotFunction(this.lastCoords), this.brush.shiftKey = s.shiftKey || !1, clearInterval(this.interval_id), this.brush.endDraw(this.mouse_coords), window.SelectionManager && mgr.selectionManager.stopMasking(), window.SelectionManager && mgr.selectionManager.hasSelection && "post" != mgr.tabManager.currentTab() && "preset" != mgr.tabManager.currentTab() && (this.bean.getSelectedLayer().getContext().drawImage(mgr.stagingCanvas.canvas.get(0), 0, 0), this.bean.getStagingCtx().clear()), this.brush.clearLineStyle([this.bean.getSelectedLayer().getContext(), this.bean.getBufferCtx(), this.bean.getBrushCtx(), this.bean.getStagingCtx()]), this.bean.getSelectedLayer().setChangeStamp(), this.brush.options.shouldUndo) {
                    var i = !0;
                    if (i) {
                        var r = Math.max(0, this.brush.minX),
                            n = Math.max(0, this.brush.minY),
                            a = Math.min(mgr.width - r, this.brush.maxX - r),
                            o = Math.min(mgr.height - n, this.brush.maxY - n);
                        mgr.undoManager.push([r, n, a, o])
                    }
                }
                this.isWacom = null, mgr.bean.setIsPenDown(!1), this.brush.options.asyncPush || this.inInnerShift || null === e || e.pushInstruction()
            }
        },
        addPressureData: function(t) {
            t[0] = Math.round(t[0]), t[1] = Math.round(t[1]), !mgr.bean.getRDReader() && wacomPlugin.isWacom > 0 && (1 == wacomPlugin.pointerType || 3 == wacomPlugin.pointerType) ? (t[2] = wacomPlugin.pressure, t[3] = [wacomPlugin.tiltX, wacomPlugin.tiltY]) : (t[2] || 0 === t[2] || (t[2] = 1), t[3] || (t[3] = [0, 0]))
        },
        onIntervalUpdate: function() {
            this.brush.update && (this.brush.update(this.mouse_coords), this.brush.recordVelocity(), mgr.bean.getRDWriter().addInstructionData("U")), window.SelectionManager && mgr.selectionManager.maskStagingBuffer(this.brush.options.maskBuffers)
        },
        getAngleDiff: function(t, s) {
            var e = (t + 180 - s) % 360 - 180;
            return 0 > e ? -e : e
        },
        getAngle: function(t, s) {
            var e = t[0] - s[0],
                i = t[1] - s[1];
            return Math.atan2(i, e) * RAD2DEG
        },
        handleSharpStrokes: function(t) {
            var s = this.brush.path;
            if (s) {
                var e = s.length;
                if (!(2 > e)) {
                    var i = s[e - 2],
                        r = s[e - 1],
                        n = this.getAngleDiff(this.getAngle(i, r), this.getAngle(t, r));
                    90 > n && (this.brush.endDraw(i), this.brush.startDraw(r))
                }
            }
        },
        clearToColor: function(t) {
            $(".drawPlzCanvas").css("background-color", "#" + t)
        },
        undo: function() {
            mgr.undoManager.undo()
        },
        redo: function() {
            mgr.undoManager.redo()
        },
        exportImage: function() {
            mgr.fileManager.exportImageData(this.getSaveData())
        },
        hasUnsavedWork: function() {
            return mgr.undoManager.hasUnsavedWork()
        },
        getSaveData: function() {
            return mgr.layerManager.flatten()
        },
        enableControls: function(t, s) {
            t === void 0 && (t = ["all"]), s === void 0 && (s = !0);
            for (var e = t.length; e--;) this.enableControl(t[e], s)
        },
        enableControl: function(t, s) {
            var e;
            switch (t) {
                case "opacitySlider":
                case "sizeSlider":
                case "effectSlider":
                case "brushSelector":
                case "colorPicker":
                    e = "." + t + " .disableElement";
                    break;
                case "all":
                    e = ".disableElement";
                    break;
                default:
            }
            s ? $(e).hide() : $(e).show()
        }
    }), window.loadModal = function(t) {
        var s = new DrawBean,
            e = $(t).find(".testCanvas"),
            i = new Canvas(e.get(0)),
            r = new Canvas($(t).find(".bufferCanvas").get(0)),
            n = new Canvas($(t).find(".brushPreviewCanvas").get(0)),
            a = new BrushPicker($(t).find(".brushPicker").get(0), s),
            o = new BrushSelector($(t).find(".brushSelector").get(0), s),
            h = new CanvasDrawing(i, s, n, r, a, o);
        s.setColor("005d7a"), $(t).find("#colorInput").change(function() {
            s.setColor($(this).val())
        }), $(t).find("#brushSize").change(function() {
            s.setBrushSize($(this).val())
        }), $(t).find("input[name=useDynamics]").change(function() {
            s.setUseDynamics($(this).is(":checked"))
        }), $(t).find("#saveButton").click(h.save.bindTo(h)), $(t).find("#undoButton").click(h.undo.bindTo(h)), $(t).find("#redoButton").click(h.redo.bindTo(h)), $(t).find("#colorInput").val("000000"), $(t).find("#brushSize").val(5)
    }, window.DWait && DWait.run("jms/lib/canvas_drawing.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/canvas.js", "jms/lib/Bean.js", "jms/lib/dragger.js"], function() {
    window.ColorPicker = Base.extend({
        constructor: function(t) {
            this.logger = new StdLogger("Color Picker"), this.mainNode = t, this.bean = getManager().bean, this.ignoreMainColor = !1, this.canvas = new Canvas($(this.mainNode).find(".color_preview").get(0)), this.canvasWidth = this.canvas.canvas.width(), this.canvasHeight = this.canvas.canvas.height(), this.canvas.init(this.canvasWidth, this.canvasHeight, !1), this.ctx = this.canvas.context, this.hueCanvas = new Canvas($(this.mainNode).find(".hueCanvas").get(0)), this.hueCanvasWidth = this.hueCanvas.canvas.width(), this.hueCanvasHeight = this.hueCanvas.canvas.height(), this.hueCanvas.init(this.hueCanvasWidth, this.hueCanvasHeight, !1), this.hueCtx = this.hueCanvas.context, this.bindBean(), this.bindHtml(), this.bean.setColor("005E7A")
        },
        bindBean: function() {
            this.bean.subscribe("color", this.mainColorChange.bindTo(this)), this.bean.subscribe("hue", this.updateColor.bindTo(this)), this.bean.subscribe("saturation", this.updateColor.bindTo(this)), this.bean.subscribe("value", this.updateColor.bindTo(this))
        },
        bindHtml: function() {
            $(this.mainNode).find(".color_switcher").click(function() {
                var t = this.bean.getColor();
                this.bean.startAtomic(), this.bean.setColor(this.bean.getSecondaryColor()), this.bean.setSecondaryColor(t), this.bean.endAtomic()
            }.bindTo(this));
            var t = $(this.mainNode).find(".satval_area").get(0);
            new Dragger([t], t, this.startSatvalDrag.bindTo(this), this.moveSatvalDrag.bindTo(this), this.endSatvalDrag.bindTo(this));
            var i = $(this.mainNode).find(".hueClick").get(0);
            new Dragger([i], i, this.startHueDrag.bindTo(this), this.moveHueDrag.bindTo(this), this.endHueDrag.bindTo(this))
        },
        startSatvalDrag: function() {
            this.ignoreMainColor = !0, this.origHue = this.bean.getHue();
            var t = navigator.platform;
            ("iPad" == t || "iPod" == t || "iPhone" == t) && ($(".flyouts .colorFlyoutMask").show(), $(".flyouts .flyoutBG").show(), $(".flyouts .numberFlyoutMask").hide(), $(".flyouts").show())
        },
        moveSatvalDrag: function(t, i) {
            this.bean.startAtomic();
            var s = Math.max(.01, Math.min(1, 1 - Math.min(68, t[1]) / 68));
            this.bean.setValue(s);
            var a = Math.max(0, Math.min(1, Math.min(68, t[0]) / 68));
            this.bean.setSaturation(a);
            var e = this.HSVToHex(this.origHue, a, s);
            this.bean.setColor(e), this.bean.endAtomic(), this.bean.setHue(this.origHue), $(".flyoutBG").css("background-color", "#" + this.bean.getColor());
            try {
                $(".flyouts").css("left", i.touches[0].pageX - 34), $(".flyouts").css("top", i.touches[0].pageY - 100)
            } catch (h) {
                $(".flyouts").hide()
            }
        },
        endSatvalDrag: function() {
            this.ignoreMainColor = !1, $(".flyouts").hide()
        },
        startHueDrag: function() {
            this.ignoreMainColor = !0;
            var t = navigator.platform;
            ("iPad" == t || "iPod" == t || "iPhone" == t) && ($(".flyouts .colorFlyoutMask").show(), $(".flyouts .flyoutBG").show(), $(".flyouts .numberFlyoutMask").hide(), $(".flyouts").show())
        },
        moveHueDrag: function(t, i) {
            t[0] -= 34, t[1] = 34 - t[1];
            var s;
            s = t[1] ? 180 * Math.atan(t[1] / t[0]) / Math.PI : 0, 0 > t[0] && t[1] > 0 ? s += 180 : 0 > t[0] && 0 >= t[1] && (s -= 180), s += 45, 0 > s && (s += 360);
            var a = Math.max(0, Math.min(1, s / 360));
            this.bean.setHue(a);
            var e = "#" + this.HSVToHex(a, 1, 1);
            $(".flyoutBG").css("background-color", e);
            try {
                $(".flyouts").css("left", i.touches[0].pageX - 34), $(".flyouts").css("top", i.touches[0].pageY - 100)
            } catch (h) {
                $(".flyouts").hide()
            }
        },
        endHueDrag: function() {
            this.ignoreMainColor = !1, $(".flyouts").hide()
        },
        mainColorChange: function() {
            if (this.ignoreMainColor) return this.preview(), void 0;
            var t = this.bean.getColor(),
                i = this.HexToHSV(t),
                s = i[0],
                a = i[1],
                e = i[2];
            this.bean.startAtomic(), this.bean.setHue(s), this.bean.setSaturation(a), this.bean.setValue(e), this.bean.endAtomic(), this.preview()
        },
        updateColor: function() {
            var t = this.bean.getHue(),
                i = "#" + this.HSVToHex(t, 1, 1),
                s = 2 * t * Math.PI - Math.PI / 4;
            0 > s && (s += 2 * Math.PI), this.hueCtx.clear(), this.hueCtx.strokeStyle = "#b3b3b3", this.hueCtx.lineWidth = 3, this.hueCtx.beginPath(), this.hueCtx.moveTo(Math.ceil(10 * Math.cos(s)) + 34, Math.ceil(10 * -1 * Math.sin(s)) + 34), this.hueCtx.lineTo(Math.ceil(50 * Math.cos(s)) + 34, Math.ceil(50 * -1 * Math.sin(s)) + 34), this.hueCtx.stroke(), this.hueCtx.strokeStyle = "#fff", this.hueCtx.lineWidth = 2, this.hueCtx.beginPath(), this.hueCtx.moveTo(Math.ceil(9 * Math.cos(s)) + 34, Math.ceil(9 * -1 * Math.sin(s)) + 34), this.hueCtx.lineTo(Math.ceil(50 * Math.cos(s)) + 34, Math.ceil(50 * -1 * Math.sin(s)) + 34), this.hueCtx.stroke(), $(this.mainNode).find(".hue_div").css("background-color", i);
            var a = this.bean.getValue(),
                e = this.bean.getSaturation(),
                h = 62 - Math.floor(68 * a),
                o = Math.floor(68 * e) - 6;
            $(this.mainNode).find(".satval_cursor").css("top", h + "px"), $(this.mainNode).find(".satval_cursor").css("left", o + "px");
            var n = this.HSVToHex(this.bean.getHue(), this.bean.getSaturation(), this.bean.getValue());
            this.bean.setColor(n)
        },
        preview: function() {
            var t = this.bean.getColor();
            this.ctx.strokeStyle = "#" + t, this.ctx.fillStyle = "#" + t, this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(0, 13), this.ctx.lineTo(53, 64), this.ctx.lineTo(63, 64), this.ctx.lineTo(63, 0), this.ctx.lineTo(0, 0), this.ctx.fill();
            var i = this.bean.getSecondaryColor();
            this.ctx.strokeStyle = "#" + i, this.ctx.fillStyle = "#" + i, this.ctx.beginPath(), this.ctx.moveTo(0, 12), this.ctx.lineTo(0, 68), this.ctx.lineTo(53, 68), this.ctx.lineTo(53, 63), this.ctx.lineTo(0, 12), this.ctx.fill(), this.ctx.strokeStyle = "#fff", this.ctx.lineWidth = 1.5, this.ctx.beginPath(), this.ctx.moveTo(0, 12), this.ctx.lineTo(53, 64), this.ctx.stroke(), $(this.mainNode).find(".specialColor").css("background-color", "#" + t)
        },
        HSVToHex: function(t, i, s) {
            var a, e, h, o, n, r, c;
            switch (0 >= i && (i = .001), t >= 1 && (t = 0), t = 6 * t, a = t - Math.floor(t), e = Math.round(255 * s * (1 - i)), h = Math.round(255 * s * (1 - i * a)), o = Math.round(255 * s * (1 - i * (1 - a))), s = Math.round(255 * s), Math.floor(t)) {
                case 0:
                    n = s, r = o, c = e;
                    break;
                case 1:
                    n = h, r = s, c = e;
                    break;
                case 2:
                    n = e, r = s, c = o;
                    break;
                case 3:
                    n = e, r = h, c = s;
                    break;
                case 4:
                    n = o, r = e, c = s;
                    break;
                case 5:
                    n = s, r = e, c = h
            }
            return this.toHex(n) + this.toHex(r) + this.toHex(c)
        },
        toHex: function(t) {
            return null === t ? "00" : (t = parseInt(t, 10), 0 === t || isNaN(t) ? "00" : (t = Math.max(0, t), t = Math.min(t, 255), t = Math.round(t), "0123456789ABCDEF".charAt((t - t % 16) / 16) + "0123456789ABCDEF".charAt(t % 16)))
        },
        HexToHSV: function(t) {
            var i, s, a, e, h, o, n = t.substr(0, 2);
            e = parseInt(n.substring(0, 2), 16);
            var r = t.substr(2, 2);
            h = parseInt(r.substring(0, 2), 16);
            var c = t.substr(4, 2);
            o = parseInt(c.substring(0, 2), 16);
            var l = Math.max(e, h, o),
                u = Math.min(e, h, o),
                b = l - u;
            a = 100 * (l / 255), s = 0 !== l ? 100 * (b / l) : 0, 0 === s ? i = 0 : (e == l ? i = (h - o) / b : h == l ? i = 2 + (o - e) / b : o == l && (i = 4 + (e - h) / b), i = 60 * i, i > 360 && (i = 360), 0 > i && (i += 360));
            var d = i / 360,
                g = s / 100,
                v = a / 100;
            return [d, g, v]
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/colorpicker.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/dragger.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.BrushPicker = Base.extend({
        constructor: function(i) {
            this.logger = new StdLogger("Brush Picker"), this.bean = getManager().bean, this.mainNode = i, this.trackWidth = $(".opacitySlider .track", this.mainNode).width(), this.bindBean(), this.bindHtml(), this.logupdate = !1
        },
        bindBean: function() {
            this.bean.subscribe("brushOpacity", this.updateBrush.bindTo(this)), this.bean.subscribe("brushSize", this.updateBrush.bindTo(this)), this.bean.subscribe("brushHardness", this.updateBrush.bindTo(this))
        },
        bindHtml: function() {
            var i, e, t, s = this;
            i = mgr.$mainNode.find(".opacitySlider"), e = i.find(".knob").get(0), t = i.find(".track").get(0), new Dragger([e, t], t, function(i, e) {
                s.startDrag(i, e, "opacity")
            }, this.moveDrag.bindTo(this), this.endDrag.bindTo(this)), mgr.sliderManager.fineTuneBinder(i.find(".fineInput"), i.find(".value"), this.bean.getBrushOpacity.bindTo(this.bean), this.bean.setBrushOpacity.bindTo(this.bean), .01, 100), i = mgr.$mainNode.find(".sizeSlider"), e = i.find(".knob").get(0), t = i.find(".track").get(0), new Dragger([e, t], t, function(i, e) {
                s.startDrag(i, e, "size")
            }, this.moveDrag.bindTo(this), this.endDrag.bindTo(this)), mgr.sliderManager.fineTuneBinder(i.find(".fineInput"), i.find(".value"), this.bean.getBrushSize.bindTo(this.bean), this.bean.setBrushSize.bindTo(this.bean), 1, 2.5), i = mgr.$mainNode.find(".effectSlider"), e = i.find(".knob").get(0), t = i.find(".track").get(0), new Dragger([e, t], t, function(i, e) {
                s.startDrag(i, e, "effect")
            }, this.moveDrag.bindTo(this), this.endDrag.bindTo(this)), mgr.sliderManager.fineTuneBinder(i.find(".fineInput"), i.find(".value"), function() {
                return 1 - this.bean.getBrushHardness()
            }.bindTo(this), function(i) {
                return this.bean.setBrushHardness(1 - i)
            }.bindTo(this), .01, 100)
        },
        checkSliderWidths: function() {
            this.trackWidth = $(".opacitySlider .track", this.mainNode).width(), this.updateBrush()
        },
        updateBrush: function() {
            var i;
            i = mgr.$mainNode.find(".opacitySlider");
            var e = this.bean.getBrushOpacity();
            mgr.sliderManager.setVal(i, e, Math.floor(100 * e), "%"), i = mgr.$mainNode.find(".sizeSlider");
            var t = this.bean.getBrushSize();
            mgr.sliderManager.setVal(i, t / MAX_BRUSH_SIZE, Math.floor(100 * t / MAX_BRUSH_SIZE), "%"), i = mgr.$mainNode.find(".effectSlider");
            var s = this.bean.getBrushHardness();
            mgr.sliderManager.setVal(i, 1 - s, Math.floor(100 * (1 - s)), "%")
        },
        startDrag: function(i, e, t) {
            this.sliderType = t;
            var s = navigator.platform;
            ("iPad" == s || "iPod" == s || "iPhone" == s) && ($(".flyouts .colorFlyoutMask").hide(), $(".flyouts .flyoutBG").hide(), $(".flyouts .numberFlyoutMask").show(), $(".flyouts").show())
        },
        moveDrag: function(i, e) {
            var t = Math.max(0, Math.min(1, i[0] / this.trackWidth));
            switch (this.sliderType) {
                case "opacity":
                    this.bean.setBrushOpacity(t);
                    break;
                case "size":
                    var s = Math.ceil(t * MAX_BRUSH_SIZE);
                    this.bean.setBrushSize(s);
                    break;
                case "effect":
                    this.bean.setBrushHardness(1 - t)
            }
            try {
                $(".numberFlyoutMask .valdisp").empty().html(Math.round(100 * t) + "%"), $(".flyouts").css("left", e.touches[0].pageX - 34), $(".flyouts").css("top", e.touches[0].pageY - 100)
            } catch (n) {
                $(".flyouts").hide()
            }
        },
        endDrag: function() {
            this.sliderType = null, $(".flyouts").hide();
            var i = this.bean.getBrush();
            i && i.settings.save()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushpicker.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/difi.js", "jms/lib/gwebpage.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/basic.js", "jms/pages/drawplz/brushes/scatter.js", "jms/pages/drawplz/brushes/bubble.js", "jms/pages/drawplz/brushes/eyedropper.js", "jms/pages/drawplz/brushes/drippy.js", "jms/pages/drawplz/brushes/floodfill.js", "jms/pages/drawplz/brushes/furry.js", "jms/pages/drawplz/brushes/dragon.js", "jms/pages/drawplz/brushes/yarn.js", "jms/pages/drawplz/brushes/heat.js", "jms/pages/drawplz/brushes/bottle.js", "jms/pages/drawplz/brushes/slinky.js", "jms/pages/drawplz/brushes/pencil.js", "jms/pages/drawplz/brushes/webink.js", "jms/pages/drawplz/brushes/polygon.js", "jms/pages/drawplz/brushes/hatch.js", "jms/pages/drawplz/brushes/splatter.js", "jms/pages/drawplz/brushes/smoke.js", "jms/pages/drawplz/brushes/halftone.js", "jms/pages/drawplz/brushes/stripes.js", "jms/pages/drawplz/brushes/texture.js", "jms/pages/drawplz/brushes/concrete.js", "jms/pages/drawplz/brushes/rough.js", "jms/pages/drawplz/brushes/handTool.js", "jms/pages/drawplz/brushes/text.js", "jms/pages/drawplz/brushes/erasers/eraser.js", "jms/pages/drawplz/brushes/erasers/scatterErase.js"], function() {
    window.BrushSelector = Base.extend({
        constructor: function(s) {
            this.logger = new StdLogger("Brush Selector"), this.mainNode = s, this.bean = getManager().bean, this.brushArr = [], this.bindBean()
        },
        bindBean: function() {
            this.bean.subscribe(["color", "secondaryColor", "brush", "brushSize", "brushOpacity", "brushHardness"], this.preview.bindTo(this)), this.bean.subscribe(["brush"], this.brushSubscribe.bindTo(this))
        },
        brushSubscribe: function() {
            var s = mgr.bean.getBrush();
            try {
                s.options.inToolbar 
				&& (mgr.$mainNode.find(".brushButtonSelected").removeClass("brushButtonSelected"), 
				mgr.$mainNode.find(".brushGlyphSelected").removeClass("brushGlyphSelected"), 
				mgr.$mainNode.find('.brushButton[data-name="' + s.options.name + '"]').addClass("brushButtonSelected").find(".brushGlyph").addClass("brushGlyphSelected"), 
				safeLocalSet("drawplz_lastbrush", s.options.name))
            } catch (r) {}
        },
        init: function(layerContext, bufferContext, brushContext) {
            var brushNames = [
				"BasicBrush", 
				"PencilBrush", 
				"HalftoneBrush", 
				"StripesBrush", 
				"WebinkBrush", 
				"YarnBrush", 
				"FurryBrush", 
				"ScatterBrush", 
				"BubbleBrush", 
				"SplatterBrush", 
				"DrippyBrush", 
				"DrPepper", 
				"HatchBrush", 
				"PolygonBrush", 
				"SlinkyBrush", 
				"SmokeBrush", 
				"BottleBrush", 
				"DragonBrush", 
				"HeatBrush", 
				"RoughBrush", 
				"ConcreteBrush", 
				"HandTool", 
				"EraserBrush", 
				"SmudgeBrush", 
				"MoveTool", 
				"MarqueeSelectionBrush", 
				"EyeDropperBrush", 
				"FloodFillBrush", 
				"ScatterErase", 
				"SplatterErase", 
				"WebinkErase", 
				"SketchErase", 
				"NightmareErase", 
				"BubbleErase", 
				"DrippyErase", 
				"HatchErase", 
				"PaperwormErase", 
				"SlinkyErase", 
				"BottleErase"
			];
            "comment" != mgr.type 
				&& brushNames.push("TextBrush"), 
				this.brushArr = [];
            for (var index = 0; index < brushNames.length; index++) try {
                var currentBrushName = brushNames[index];
                "TextErase" == currentBrushName && breakpoint(), 
				this.brushArr.push(new window[currentBrushName](mgr.bean, layerContext, bufferContext, brushContext))
            } catch (ex) {
                this.logger.log("Could not instantiate " + brushNames[index])
            }
            this.makeBrushMenu(), 
			mgr.layoutManager.resizeBrushSelector();
            var lastBrushName = safeLocalGet("drawplz_lastbrush_draw", null);
            lastBrushName ? 
				this.selectBrushByName(lastBrushName) 
				: this.selectBrushByName("Basic"), 
				  DWait.run(".brushesLoaded")
        },
        makeBrushMenu: function(s, r, e) {
            switch (s || (s = "draw"), r || (r = function(s) {
                return s.options.inToolbar && "draw" == s.options.whichTool
            }), s) {
                case "erase":
                    $(".brushSelector").addClass("brushSelectorGrey");
                    break;
                default:
                    $(".brushSelector").removeClass("brushSelectorGrey")
            }
            if (this.key != s && (this.key = s, this.filter = r, this.brushArr.length)) {
                var t, a, h, u, n, o;
                $(".brushSelector .brushCont").empty();
                var i = null;
                for (t = 0; this.brushArr.length > t; t++) h = this.brushArr[t], r(h) && (u = h.options.name, u = u.charAt(0).toUpperCase() + u.slice(1), i || (i = u), n = 40 * h.options.glyphPos, o = $(this.generateBrushButtonHtml(u, n)).appendTo(".brushSelector .brushCont"), "erase" == this.key && o.find(".brushGlyph").addClass("Erase"), h.setButton(o), o.mousedown(this.buttonClick.bindTo(h)));
                i ? e || (a = this.selectBrushByName(safeLocalGet("drawplz_lastbrush_" + s, i)), r(a) || this.selectBrushByName(i)) : $(".brushSelector .brushCont").append('<span class="noOptions">There are no extra options for this tool<span>'), mgr.layoutManager.resizeBrushSelector()
            }
        },
        generateBrushButtonHtml: function(s, r, e) {
            return e = e || s, '<div class="brushButton" title="' + e + '" data-name="' + e + '"><div class="brushGlyph font_icon icon' + s + '" title="' + s + '" data-name="' + s + '"></div></div>'
        },
        buttonClick: function() {
            $(this.button).is(".brushButtonSelected") || mgr.bean.setBrush(this)
        },
        getBrushIndex: function() {
            for (var s = this.bean.getBrush(), r = 0; this.brushArr.length > r; r++) if (this.brushArr[r] == s) return r;
            return -1
        },
        nextBrush: function() {
            for (var s = null, r = this.getBrushIndex(); !s || !s.options.inToolbar;) r++, r > this.brushArr.length - 1 && (r = 0), s = this.brushArr[r];
            $(s.button).mousedown()
        },
        prevBrush: function() {
            for (var s = null, r = this.getBrushIndex(); !s || !s.options.inToolbar;) r--, 0 > r && (r = this.brushArr.length - 1), s = this.brushArr[r];
            $(s.button).mousedown()
        },
        preview: function() {
            var s = this.bean.getBrushCtx();
            s.clear();
            try {
                var r = this.bean.getBrush();
                r.brushPreview([67, 12]), 
				$(this.mainNode).find(".brushTitle").empty();
                var e = r.options.name;
                $(this.mainNode).find(".brushTitle").html(e.charAt(0).toUpperCase() + e.slice(1)), $(".brushPicker .overlay").css("background-image", "url(" + r.options.overlay + "?2)"), window.wacomEnabled && (r.options.wacom ? $(".wacomIndicator").addClass("wacomPresentActive") : $(".wacomIndicator").removeClass("wacomPresentActive"))
            } catch (t) {}
        },
        selectBrushByName: function(s) {
            var r = mgr.bean.getBrush();
            if (r && r.options.name == s) return r;
            for (var e = s.toLowerCase(), t = 0; this.brushArr.length > t; t++) {
                var a = this.brushArr[t];
                if (a.options.name.toLowerCase() == e) return mgr.bean.setBrush(a), a
            }
        },
        selectBrush: function(s) {
            mgr.bean.setBrush(s)
        },
        reset: function() {
            for (var s, r, e = 0; this.brushArr.length > e; e++) s = this.brushArr[e], r = s.options.defaultSettings, s.settings.set(r[0], r[1], r[2]), s.settings.saveToStorage();
            s = this.bean.getBrush(), s.settings.restore(), s.settings.save(), $(this.brushArr[0].button).mousedown()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushselector.js")
});
window.ToolManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Tool Manager"), this.bean = getManager().bean, this.mainNode = this.bean.getMainNode(), this.bindHtml()
    },
    bindHtml: function() {
        var e = this;
        $(".drawPlzControls a.toolbutton", this.mainNode).click(function() {
            return e.toolClick(this), !1
        }), this.bean.subscribe("brush", function() {
            var e = this.bean.getBrush(),
                r = e.options.specialBrushes;
            r ? ($(".regularBrushes", this.mainNode).hide(), $(".specialBrushes .specialBrushGroup", this.mainNode).hide(), $(".specialBrushes ." + r, this.mainNode).show(), $(".specialBrushes", this.mainNode).show(), e.specialBrushFunction()) : ($(".specialBrushes", this.mainNode).hide(), $(".regularBrushes", this.mainNode).show());
            var s = e.options.secondarySelector;
            s && !mgr.isPlayback ? mgr.bean.setIsLargeBrushArea(!0) : mgr.bean.setIsLargeBrushArea(!1)
        }.bindTo(this))
    },
    toolClick: function(e) {
        var r = $(e, this.mainNode).attr("action");
        this.toolAction(r)
    },
    toolAction: function(e, r) {
        var s, a, o, t = getManager().canvasDrawing,
            n = getManager().brushSelector;
        switch (o = mgr.bean.getRDWriter().startInstruction(RDInst.TOOLMANAGER, e), e) {
            case "new":
                getManager().layerManager.removeAll(!1, !0);
                break;
            case "dropper":
                t.enableControls(), this.pushBrush(), n.selectBrushByName("Eye Dropper"), $(".specialColor", this.mainNode).show().css("background-color", "#" + this.bean.getColor()), t.enableControls(["opacitySlider", "sizeSlider", "effectSlider"], !1), mgr.brushSelector.makeBrushMenu("dropper", function() {
                    return !1
                }, r);
                break;
            case "hand":
                t.enableControls(), this.pushBrush(), n.selectBrushByName("Hand Tool"), $(".specialColor", this.mainNode).show().css("background-color", "#000"), t.enableControls(["opacitySlider", "sizeSlider", "effectSlider"], !1);
                break;
            case "flood":
                t.enableControls(), this.pushBrush(), n.selectBrushByName("Flood Fill"), s = this.bean.getBrush(), s.settings.restore(), $(".specialColor", this.mainNode).css("background-color", "#" + this.bean.getColor()), t.enableControls(["opacitySlider", "sizeSlider"], !1), mgr.brushSelector.makeBrushMenu("flood", function() {
                    return !1
                }, r);
                break;
            case "draw":
                mgr.brushSelector.makeBrushMenu("draw", filter = function(e) {
                    return e.options.inToolbar && "draw" == e.options.whichTool
                }, r);
                try {
                    if (this.isDrawBrush(mgr.bean.getBrush())) break;
                    if (t.enableControls(), !r) {
                        var i = mgr.bean.getLastUsedBrush();
                        this.isDrawBrush(i) || (i = mgr.brushSelector.selectBrushByName("Basic"), mgr.bean.setLastUsedBrush(i)), mgr.bean.setBrush(i), i.settings.restore()
                    }
                    $(".specialColor", this.mainNode).hide()
                } finally {
                    var l = mgr.bean.getBrush();
                    if (!this.isDrawBrush(l)) {
                        var h = mgr.brushSelector.selectBrushByName("Basic");
                        mgr.bean.setBrush(h), h.settings.restore()
                    }
                }
                break;
            case "erase":
                switch (mgr.brushSelector.makeBrushMenu("erase", function(e) {
                    return "erase" == e.options.whichTool
                }, r), t.enableControls(), t.enableControls(["colorPicker"], !1), mgr.bean.getBrush().options.name) {
                    case "Paper Worm Erase":
                    case "Bottle Brush Erase":
                        mgr.canvasDrawing.enableControls(["effectSlider"], !1)
                }
                break;
            case "undo":
                getManager().canvasDrawing.undo();
                break;
            case "redo":
                getManager().canvasDrawing.redo();
                break;
            case "save":
                window.open(t.getSaveData(), "_blank");
                break;
            case "select":
                mgr.brushSelector.makeBrushMenu("select", function() {
                    return !1
                }, r), this.pushBrush(), n.selectBrushByName("Selection"), $(".specialColor", this.mainNode).hide(), t.enableControls(["opacitySlider", "sizeSlider", "effectSlider", "colorPicker"], !1), mgr.bean.getBrush().subbrush.match(/Wand/) && t.enableControls(["effectSlider"], !0);
                break;
            case "move":
                this.pushBrush(), n.selectBrushByName("Move"), $(".specialColor", this.mainNode).hide(), t.enableControls(["opacitySlider", "sizeSlider", "effectSlider", "colorPicker"], !1), mgr.brushSelector.makeBrushMenu("move", function() {
                    return !1
                }, r);
                break;
            case "smudge":
                t.enableControls(), this.pushBrush(), a = n.selectBrushByName("Blending"), $(".specialColor", this.mainNode).hide(), t.enableControls(["colorPicker", "opacitySlider"], !1), a.settings.restore(), mgr.brushSelector.makeBrushMenu("smudge", function() {
                    return !1
                }, r);
                break;
            case "text":
                t.enableControls(), this.pushBrush(), a = n.selectBrushByName("Text"), $(".specialColor", this.mainNode).hide(), a.settings.restore();
                break;
            case "annotation":
                t.enableControls(), mgr.annotation.create();
                break;
            case "undo":
            default:
                this.logger.log("Unknown Tool Click: ", e)
        }
        o.pushInstruction()
    },
    pushBrush: function() {
        var e = this.bean.getBrush();
        this.isDrawBrush(e) && this.bean.setLastUsedBrush(e)
    },
    isDrawBrush: function(e) {
        return e.options.inToolbar && "draw" == e.options.whichTool
    }
}), window.DWait && DWait.run("jms/pages/drawplz/toolManager.js");
window.SettingsManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("settingsmanager"), this.logger.enabled = !1, this.bean = getManager().bean, this.settings = {
            last_used_brush: "basic",
            draftid: null,
            primary_color: "005E7A",
            secondary_color: "2D3836"
        }
    },
    getParam: function(t) {
        return this.settings.hasOwnProperty(t) ? this.settings[t] : null
    },
    setParam: function(t, s, e) {
        this.settings.hasOwnProperty(t) && (this.logger.log("Setting param " + t + " to " + s), this.settings[t] = s, (e || e === void 0) && this.updateRemoteSettings())
    },
    toggleParam: function(t) {
        if (this.settings.hasOwnProperty(t)) {
            var s = this.settings[t],
                e = "boolean" == typeof s,
                i = !isNaN(parseFloat(s)) && isFinite(s);
            return (e || i) && this.setParam(t, !s), this.getParam(t)
        }
        return null
    },
    updateLocalSettings: function(t) {
        for (var s in t) this.setParam(s, t[s], !1);
        mgr.bean.getRDReader() || safeLocalSet("drawplz_settings", this.settings)
    },
    updateRemoteSettings: function() {
        !this.timeoutID && this.isLoggedIn() && (this.timeoutID = window.setTimeout(bind(this, this.saveSettings), 5e3))
    },
    saveSettings: function() {
        window.clearTimeout(this.timeoutID), this.timeoutID = null, !this.busy_saving && this.isLoggedIn() && (this.busy_saving = !0, DiFi.pushPost("DrawPlz", "save_user_settings", [this.settings], this.saveCallback, this), DiFi.send())
    },
    saveCallback: function(t, s) {
        return this.logger.log("Saved user settings", s), this.busy_saving = !1, t ? (safeLocalSet("drawplz_settings", this.settings), void 0) : (this.logger.log("Error saving settings."), void 0)
    },
    loadSettings: function() {},
    loadCallback: function(t, s, e) {
        this.logger.log("Loaded user settings", s), this.busy_loading = !1;
        var i = e.response.content.settings;
        i || (this.logger.log("Error loading settings."), i = safeLocalGet("drawplz_settings", this.settings)), this.updateLocalSettings(i), "function" == typeof t && t(s)
    },
    isLoggedIn: function() {
        var t;
        try {
            t = deviantART.deviant.loggedIn
        } catch (s) {
            t = !1
        }
        return t
    }
}), window.DWait && DWait.run("jms/pages/drawplz/settingsManager.js");
window.KeyHandler = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("KeyHandler"), this.bindHtml(), this.enabled = !0, this.noAlter = !1, this.dropper = !1, this.handtool = !1, this.lableMenus()
    },
    bindHtml: function() {
        $(document).get(0).onkeydown = this.keyDown.bindTo(this), $(document).get(0).onkeyup = this.keyUp.bindTo(this), $(document).get(0).onkeypress = this.keyPress.bindTo(this), $(document).focus(), $(document).on("focusin", "input, textarea", function() {
            $(this).addClass("focussedInput")
        }), $(document).on("focusout", "input, textarea", function() {
            $(this).removeClass("focussedInput")
        }), $(".dhUrlEntry").length && ($(".dhUrlEntry").get(0).onkeypress = function(e) {
            13 == e.which && $(".dhUrlCont .headerButton").click()
        })
    },
    on: function() {
        this.enabled = !0
    },
    off: function() {
        this.enabled = !1
    },
    noAlterOn: function() {
        this.noAlter = !0
    },
    noAlterOff: function() {
        this.noAlter = !1
    },
    keyPress: function(e) {
        if (!e) return !0;
        if (mgr.bean.getIsPenDown()) return !1;
        if (mgr.bean.getIsSaveBlocking()) return !1;
        if (mgr.bean.getRDReader()) return !0;
        if (e.ctrlKey || e.metaKey) switch (e.which) {
            case 45:
                return mgr.zoomManager.zoomOut(), !1;
            case 61:
                return mgr.zoomManager.zoomIn(), !1
        } else switch (e.which) {
            case 91:
                return mgr.bean.setBrushSize(mgr.bean.getBrushSize() - 1), !1;
            case 93:
                return mgr.bean.setBrushSize(mgr.bean.getBrushSize() + 1), !1
        }
    },
    keyDown: function(e) {
        if (!this.enabled) return !1;
        if (!e) return !0;
        if (mgr.bean.getRDReader()) switch (e.which) {
            case 32:
                return mgr.playbackManager.playbuttonClick(), !1;
            default:
                return !0
        }
        if (mgr.bean.getIsPenDown()) return !1;
        if (mgr.bean.getIsSaveBlocking()) return !1;
        var r, t = mgr.canvasDrawing;
        if (t.processingFilter) return !1;
        if ($(".focussedInput").length > 0) return !0;
        if (window.SelectionManager) if (e.ctrlKey || e.metaKey && !$(document.activeElement).is("input")) switch (e.which) {
            case 67:
                return this.noAlter || mgr.selectionManager.copy(), !1;
            case 86:
                return this.noAlter || mgr.selectionManager.paste(), !1;
            case 88:
                return this.noAlter || mgr.selectionManager.cut(), !1;
            case 68:
                return mgr.selectionManager.deselect(), !1;
            case 65:
                return mgr.selectionManager.selectAll(), !1;
            case 73:
                if (e.shiftKey) return mgr.selectionManager.selectInverse(), !1
        } else {
            var n;
            switch (e.which) {
                case 76:
                    return mgr.toolManager.toolAction("select"), n = mgr.bean.getBrush(), n.subbrush.match(/Lasso/) || n.subBrush(safeLocalGet("drawplz_whichLasso", "Lasso")), !1;
                case 77:
                    return mgr.toolManager.toolAction("select"), n = mgr.bean.getBrush(), n.subbrush.match(/Marquee/) || n.subBrush(safeLocalGet("drawplz_whichMarquee", "Marquee")), !1;
                case 86:
                    return mgr.toolManager.toolAction("move"), !1;
                case 87:
                    return mgr.toolManager.toolAction("select"), n = mgr.bean.getBrush(), n.subbrush.match(/Wand/) || n.subBrush(safeLocalGet("drawplz_whichWand", "Magic Wand")), !1
            }
        }
        if (e.ctrlKey || e.metaKey) switch (e.which) {
            case 26:
            case 122:
            case 90:
                return e.shiftKey ? this.noAlter || mgr.undoManager.redo() : this.noAlter || mgr.undoManager.undo(), !1;
            case 65:
                return $(document.activeElement).is("input") ? !0 : !1;
            case 48:
                return mgr.zoomManager.fitToScreen(), !0;
            case 49:
                return mgr.zoomManager.actualPixels(), !1;
            case 110:
            case 78:
                if (!this.noAlter) {
                    mgr.bean.startAtomic();
                    var a = mgr.layerManager.create();
                    mgr.bean.setSelectedLayer(a), mgr.bean.endAtomic(), mgr.undoManager.push()
                }
                return !1;
            case 189:
                return mgr.zoomManager.zoomOut(), !1;
            case 187:
                return mgr.zoomManager.zoomIn(), !1;
            case 61:
            case 109:
                return !1
        } else {
            var s = mgr.brushSelector;
            switch (e.which) {
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    return e.shiftKey ? (size = Math.ceil(1 + 40 * ((e.which - 48 || 10) - 1) / 9), mgr.bean.setBrushSize(size)) : (r = (e.which - 48 || 10) / 10, mgr.bean.setBrushOpacity(r)), !1;
                case 45:
                case 189:
                    return r = mgr.bean.getBrushOpacity(), r > .2 && mgr.bean.setBrushOpacity(r - .1), !1;
                case 61:
                case 187:
                    return mgr.bean.setBrushOpacity(mgr.bean.getBrushOpacity() + .1), !1;
                case 59:
                case 186:
                    return hard = mgr.bean.getBrushHardness(), .9 > hard ? mgr.bean.setBrushHardness(hard + .1) : mgr.bean.setBrushHardness(1), !1;
                case 39:
                case 222:
                    return hard = mgr.bean.getBrushHardness(), hard > .1 && mgr.bean.setBrushHardness(hard - .1), !1;
                case 188:
                    return s.prevBrush(), !1;
                case 190:
                    return s.nextBrush(), !1;
                case 73:
                case 67:
                    return this.dropper || (this.dropper = !0, this.switchBackBrush = mgr.bean.getBrush().options.name, mgr.toolManager.toolAction("dropper")), !1;
                case 32:
                    if (!this.handtool) {
                        this.handtool = !0;
                        var o = mgr.bean.getBrush().options.name;
                        "Hand Tool" != o && (this.switchBackBrush = o), mgr.toolManager.toolAction("hand")
                    }
                    return !1;
                case 66:
                    return this.noAlter || mgr.toolManager.toolAction("draw"), !1;
                case 69:
                    return this.noAlter || mgr.toolManager.toolAction("erase"), !1;
                case 70:
                    return this.noAlter || mgr.toolManager.toolAction("flood"), !1
            }
        }
        return !0
    },
    keyUp: function() {
        if (mgr.bean.getRDReader()) return !0;
        if (mgr.bean.getIsSaveBlocking()) return !1;
        if (!this.dropper && !this.handtool) return !0;
        switch (this.dropper = !1, this.handtool = !1, this.logger.log("switch back: ", this.switchBackBrush), this.switchBackBrush) {
            case "Eraser":
                return mgr.toolManager.toolAction("erase"), !1;
            case "Flood Fill":
                return mgr.toolManager.toolAction("flood"), !1;
            case "Blending":
                return mgr.toolManager.toolAction("smudge"), !1;
            case "Text":
                return mgr.toolManager.toolAction("text"), !1;
            case "Selection":
                return mgr.toolManager.toolAction("selection"), !1;
            default:
                return mgr.toolManager.toolAction("draw"), !1
        }
    },
    menuHotkey: function(e, r, t) {
        if (t.length > 0) for (var n = 0; t.length > n; n++) {
            var a = t[n];
            switch (a) {
                case "cmd":
                    r = Browser.isMac ? "&#8984;" + r : "Ctrl+" + r;
                    break;
                case "shift":
                    r = Browser.isMac ? "&#8679;" + r : "Shift+" + r
            }
        }
        var s = $('.topArea .oh-menu .editMenuItem[rel="' + e + '"]');
        s.find(".hotkey").remove(), s.append('<div class="hotkey">' + r + "</div>")
    },
    lableMenus: function() {
        this.menuHotkey("cut", "X", ["cmd"]), this.menuHotkey("copy", "C", ["cmd"]), this.menuHotkey("paste", "V", ["cmd"]), this.menuHotkey("selectAll", "A", ["cmd"]), this.menuHotkey("selectInverse", "I", ["shift", "cmd"]), this.menuHotkey("deselect", "D", ["cmd"])
    }
}), window.DWait && DWait.run("jms/pages/drawplz/keyhandler.js");
window.CHANGESTAMPS = {
    CLEAR: 0,
    WHITE: 1,
    OFFWHITE: 2,
    BLACK: 3
}, window.CHANGESTAMP_COLORS = {
    CLEAR: "rgba(0, 0, 0, 0)",
    WHITE: "#ffffff",
    OFFWHITE: "#fffffa",
    BLACK: "#000000"
}, window.isSpecialChangestamp = function(t) {
    switch (t) {
        case CHANGESTAMPS.CLEAR:
        case CHANGESTAMPS.WHITE:
        case CHANGESTAMPS.BLACK:
        case CHANGESTAMPS.OFFWHITE:
            return !0;
        default:
            return !1
    }
}, window.getSpecialColor = function(t) {
    switch (t) {
        case CHANGESTAMPS.CLEAR:
            return CHANGESTAMP_COLORS.CLEAR;
        case CHANGESTAMPS.WHITE:
            return CHANGESTAMP_COLORS.WHITE;
        case CHANGESTAMPS.BLACK:
            return CHANGESTAMP_COLORS.BLACK;
        case CHANGESTAMPS.OFFWHITE:
            return CHANGESTAMP_COLORS.OFFWHITE;
        default:
            return CHANGESTAMP_COLORS.CLEAR
    }
}, window.UndoManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Undo"), this.mainNode = getManager().bean.getMainNode(), this.bean = getManager().bean, this.enabled = !0, this.talkedback = !1, this.reset()
    },
    reset: function() {
        this.stash = new LayerDataStash, this.undoBuffer = [], this.redoBuffer = [], this.setDisabledStates(), this.changedAt = 0, this.savedAt = 0, this.saveStartedAt = 0, this.area = getManager().width * getManager().height
    },
    disable: function() {
        this.enabled = !1
    },
    enable: function() {
        this.enabled = !0
    },
    setDisabledStates: function() {
        mgr.tabManager && "post" == mgr.tabManager.currentTab() || (this.hasMoreUndo() ? ($(".white div.stashmuro-toolbar .headerButton.muro-toolbar-undo").removeClass("disabled"), $(".undoToolButtonDisabled", this.mainNode).removeClass("undoToolButtonDisabled")) : ($(".white div.stashmuro-toolbar .headerButton.muro-toolbar-undo").addClass("disabled"), $("a.toolbutton[action=undo]", this.mainNode).addClass("undoToolButtonDisabled")), this.hasMoreRedo() ? ($(".white div.stashmuro-toolbar .headerButton.muro-toolbar-redo").removeClass("disabled"), $(".redoToolButtonDisabled", this.mainNode).removeClass("redoToolButtonDisabled")) : ($(".white div.stashmuro-toolbar .headerButton.muro-toolbar-redo").addClass("disabled"), $("a.toolbutton[action=redo]", this.mainNode).addClass("redoToolButtonDisabled"))), mgr.bean.getDraftId() && this.hasUnsavedWork() ? mgr.isBusy("save", "load", "modal") || mgr.layoutManager.enableMenuItem("save", !0) : mgr.layoutManager.disableMenuItem("save")
    },
    push: function(t) {
        try {
            if (!this.enabled) return;
            var e = this.makeFrame(t);
            for (e.store(), this.undoBuffer.push(e); this.undoBuffer.length > this.MAX_LEVELS;) this.undoBuffer.shift();
            this.redoBuffer = [], this.markAndSweep(), this.changedAt = (new Date).getTime(), this.setDisabledStates()
        } catch (a) {
            this.talkedback || (this.talkedback = !0, this.logger.talkback("Drawplz - Error in undo push.", {
                message: a.message
            }))
        }
    },
    undo: function() {
        if (this.hasMoreUndo()) {
            var t = mgr.bean.getRDWriter().startInstruction(RDInst.UNDO, "u");
            this.redoBuffer.push(this.undoBuffer.pop()), this.undoBuffer.push(this.undoBuffer.pop().restore()), this.changedAt = (new Date).getTime(), t.pushInstruction()
        }
        this.markAndSweep(), this.setDisabledStates()
    },
    redo: function() {
        if (this.hasMoreRedo()) {
            var t = mgr.bean.getRDWriter().startInstruction(RDInst.UNDO, "r");
            this.undoBuffer.push(this.redoBuffer.pop().restore()), this.changedAt = (new Date).getTime(), t.pushInstruction()
        }
        this.markAndSweep(), this.setDisabledStates()
    },
    hasMoreUndo: function() {
        return this.undoBuffer.length > 1
    },
    hasMoreRedo: function() {
        return this.redoBuffer.length > 0
    },
    hasUnsavedWork: function() {
        return mgr.recordingDeviationId ? !1 : (this.hasMoreUndo() || this.hasMoreRedo()) && this.changedAt > this.savedAt
    },
    startedSaving: function() {
        this.saveStartedAt = (new Date).getTime()
    },
    didSave: function() {
        this.savedAt = this.saveStartedAt
    },
    markAndSweep: function() {
        for (var t = 0; this.undoBuffer.length > t; t++) this.undoBuffer[t].mark();
        for (t = 0; this.redoBuffer.length > t; t++) this.redoBuffer[t].mark();
        this.stash.sweep()
    },
    clearBuffers: function() {
        this.enabled && (this.undoBuffer = [], this.redoBuffer = [], this.markAndSweep(), this.push(), this.setDisabledStates())
    }
}), window.CanvasUndo = UndoManager.extend({
    constructor: function(t) {
        this.MAX_LEVELS = 6, this.base(t)
    },
    makeFrame: function(t) {
        return new CanvasUndoFrame(this.stash, t, this.area)
    }
}), window.UndoFrame = Base.extend({
    constructor: function(t, e, a) {
        this.stash = t, this.dirty = e, this.area = a, this.nameList = [], this.opacityList = [], this.visibilityList = [], this.layerDataKeys = [], this.layerDatas = [], this.layerIds = [], this.width = mgr.width, this.height = mgr.height, this.talkedback = !1
    },
    mark: function() {
        for (var t = 0; this.layerDataKeys.length > t; t++) this.stash.mark(this.layerDataKeys[t])
    },
    store: function() {
        try {
            var t = getManager().layerManager;
            this.selectedName = t.bean.getSelectedLayer().getName(), this.nameList = t.getLayerList(), this.layersToDelete = t.layersToDelete, this.layerDataKeys = [];
            for (var e, a, s = 0; this.nameList.length > s; s++) e = getManager().layerManager.getLayer(this.nameList[s]), a = e.changeStamp, isSpecialChangestamp(a) || this.stash.check(a) || this.stash.put(a, this.getData(e)), this.layerDataKeys.push(a), this.opacityList.push($(e.canvasDom).css("opacity")), this.layerDatas.push(e.getLayerData()), this.layerIds.push(e.getId()), this.visibilityList.push(e.isVisible());
            if (window.SelectionManager) {
                var i = getManager().selectionManager;
                this.selection = i.hasSelection ? i.selCtx.getImageData(0, 0, i.width, i.height) : null
            }
        } catch (r) {
            throw this.talkedback || (this.talkedback = !0, talkback("Drawplz - Error in undo store method.", {
                message: r.message
            })), r
        }
    },
    restore: function() {
        var t, e, a, s, i = getManager().layerManager;
        (this.width != mgr.width || this.height != mgr.height) && i.innerResize(this.width, this.height, 0, 0, 0), i.bean.startAtomic();
        try {
            if (i.layersToDelete = this.layersToDelete, this.nameList.length > 0) {
                for (t = 0; this.nameList.length > t; t++) if (a = this.layerDataKeys[t], !isSpecialChangestamp(a)) {
                    s = this.stash.get(a);
                    try {
                        for (var r = s; r.meta.ref || 0 === r.meta.ref;) r = this.stash.get(r.meta.ref);
                        if (!r.data) throw "fuck me"
                    } catch (h) {
                        return this.talkedback = !0, this.logger.talkback("Drawplz - Trying to undo to something not in our stash, aborting"), this
                    }
                }
                for (i.clobber(), t = 0; this.nameList.length > t; t++) try {
                    e = new Layer(i, this.nameList[t]), a = this.layerDataKeys[t], isSpecialChangestamp(a) ? e.getContext().clearToColor(getSpecialColor(a)) : (s = this.stash.get(a), this.putData(e, s)), e.changeStamp = a, $(e.canvasDom).css("opacity", this.opacityList[t]), e.setLayerData(this.layerDatas[t]), this.visibilityList[t] ? $(e.canvasDom).show() : $(e.canvasDom).hide(), i.add(e)
                } catch (h) {
                    if (!this.talkedback) {
                        this.talkedback = !0;
                        var n = {};
                        try {
                            n.imgDataType = typeof s, n.imgDataLength = s.length, n.changeStamp = e.changeStamp
                        } catch (o) {}
                        talkback("Drawplz - Error in restore layer.", {
                            message: h.message,
                            argObj: n
                        })
                    }
                }
                var d = i.getLayer(this.selectedName);
                d || (d = i.layers[0]), i.bean.setSelectedLayer(d), i.bean.setLayerOpacity($(d.canvasDom).css("opacity"))
            }
            if (window.SelectionManager) {
                var l = getManager().selectionManager;
                this.selection ? (l.hasSelection = !0, l.selCtx.putImageData(this.selection, 0, 0), l.makeMarchingAnts()) : l.innerDeselect(), PubSub.publish("muro.selectionChange")
            }
        } catch (h) {
            this.talkedback || (this.talkedback = !0, talkback("Drawplz - Error in undo restore.", {
                message: h.message
            }))
        } finally {
            i.bean.endAtomic()
        }
        return this
    }
}), window.CanvasUndoFrame = UndoFrame.extend({
    mergeDirty: function(t, e) {
        if (!t) return e;
        if (!e) return t;
        try {
            var a = Math.floor(Math.min(t[0], e[0])),
                s = Math.floor(Math.min(t[1], e[1])),
                i = Math.floor(Math.max(t[0] + t[2], e[0] + e[2])),
                r = Math.floor(Math.max(t[1] + t[3], e[1] + e[3]));
            return this.checkBounds([a, s, i - a, r - s])
        } catch (h) {
            return this.logger.talkback("Drawplz - Error in undo mergeDirty.", {
                message: h.message
            }), null
        }
    },
    checkBounds: function(t) {
        try {
            var e = mgr.width,
                a = mgr.height,
                s = Math.min(e - 1, Math.max(0, t[0])),
                i = Math.min(a - 1, Math.max(0, t[1])),
                r = Math.min(e - s, Math.max(1, t[2])),
                h = Math.min(a - i, Math.max(1, t[3]));
            return [s, i, r, h]
        } catch (n) {
            return this.logger.talkback("Drawplz - Error in undo checkBounds.", {
                message: n.message
            }), null
        }
    },
    getData: function(t) {
        var e = t.getContext();
        try {
            if (this.dirty && this.stash.check(t.oldChangeStamp)) {
                var a = this.stash.get(t.oldChangeStamp).meta,
                    s = a.dirtyCoords,
                    i = this.mergeDirty(s, this.dirty);
                if (i && 4 == i.length && this.area > 1.5 * i[2] * i[3]) return {
                    data: null,
                    meta: {
                        ref: t.oldChangeStamp,
                        dirtyData: e.getImageData(i[0], i[1], i[2], i[3]),
                        dirtyCoords: i
                    }
                }
            }
        } catch (r) {}
        return {
            data: e.getImageData(0, 0, mgr.width, mgr.height),
            meta: {
                ref: null,
                dirtyData: null,
                dirtyCoords: null
            }
        }
    },
    checkDataSize: function(t, e) {
        (t.width != e.$canvasDom.width() || t.height != e.$canvasDom.height() || t.width != e.$canvasDom.attr("width") || t.height != e.$canvasDom.attr("height")) && (mgr.layerManager.innerResize(t.width, t.height, 0, 0, 0), e.resize(t.width, t.height, 0, 0, 0))
    },
    putData: function(t, e) {
        if (e.data) this.checkDataSize(e.data, t), t.getContext().putImageData(e.data, 0, 0);
        else {
            for (var a = e; a.meta.ref || 0 === a.meta.ref;) a = this.stash.get(a.meta.ref);
            this.checkDataSize(a.data, t), t.getContext().putImageData(a.data, 0, 0)
        }
        if (e.meta.dirtyData) {
            var s = this.checkBounds(e.meta.dirtyCoords);
            s ? t.getContext().putImageData(e.meta.dirtyData, s[0], s[1]) : this.talkedback || (this.talkedback = !0, talkback("Drawplz - Error in restore dirty data"))
        }
    }
}), window.LayerDataStash = Base.extend({
    constructor: function() {
        this.stash = []
    },
    put: function(t, e) {
        for (var a = 0; this.stash.length > a; a++) if (this.stash[a][0] == t) return;
        this.stash.push([t, e, !1])
    },
    check: function(t) {
        for (var e = 0; this.stash.length > e; e++) if (this.stash[e][0] == t) return !0;
        return !1
    },
    get: function(t) {
        for (var e = 0; this.stash.length > e; e++) if (this.stash[e][0] == t) return this.stash[e][1];
        return null
    },
    mark: function(t) {
        for (var e = 0; this.stash.length > e; e++) if (this.stash[e][0] == t) return this.stash[e][2] = !0, void 0
    },
    moveData: function(t) {
        for (var e = this.stash[t][0], a = 0; this.stash.length > a; a++) try {
            if (this.stash[a][1].meta.ref == e) return this.stash[a][1].data = this.stash[t][1].data, this.stash[a][1].meta.ref = null, void 0
        } catch (s) {}
    },
    sweep: function() {
        for (var t = this.stash.length - 1; t >= 0; t--) this.stash[t][2] ? this.stash[t][2] = !1 : (this.moveData(t), this.stash.splice(t, 1))
    }
}), window.undoFactory = function(t) {
    return new CanvasUndo(t)
}, window.DWait && DWait.run("jms/pages/drawplz/undo.js");
window.CursorPreview = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Cursor Preview"), this.bean = getManager().bean, this.mainNode = this.bean.getMainNode(), this.drawObj = getManager().canvasDrawing, this.offset = $(this.mainNode).find(".mouseCapture").offset(), this.bean.subscribe("scale", this.makeCursor.bindTo(this)), this.bean.subscribe("brushSize", this.makeCursor.bindTo(this)), this.bean.subscribe("brush", this.makeCursor.bindTo(this)), this.$jqNode = $(this.mainNode).find(".cursorPreview"), this.jqNode = this.$jqNode.get(0), this.canvas = new Canvas(this.$jqNode.get(0)), this.hidden = !0, this.dragFromOutsideCanvas = !1, this.noCursor = !1, this.bindHtml()
    },
    bindHtml: function() {
        document.onselectstart = function() {
            this.dragFromOutsideCanvas = !0
        }.bindTo(this), $(document).mouseup(function() {
            this.dragFromOutsideCanvas = !1
        }.bindTo(this)), $(this.mainNode).find(".mouseCapture").mousemove(this.moveCursorPreview.bindTo(this)), $(this.mainNode).find(".cursorPreview").mousemove(this.moveCursorPreview.bindTo(this)), $(this.mainNode).find(".mouseCapture").mouseleave(this.mouseCaptureLeave.bindTo(this)), $(this.mainNode).find(".mouseCapture").mouseenter(this.checkCursor.bindTo(this))
    },
    checkCursor: function() {
        this.noCursor && (this.noCursor = !1, this.makeCursor())
    },
    mouseCaptureLeave: function() {
        return this.dragFromOutsideCanvas ? !0 : (this.hidden = !0, this.$jqNode.hide(), void 0)
    },
    moveCursorPreview: function(i) {
        if (this.dragFromOutsideCanvas) return !0;
        var t = [0 | i.pageX - this.offset.left, 0 | i.pageY - this.offset.top];
        this.hidden && (this.checkCursor(), this.$jqNode.show(), this.hidden = !1);
        var s = t[0] - this.radius - 2,
            e = t[1] - this.radius - 2;
        isNaN(s) || isNaN(e) || this.$jqNode.css("left", Math.round(s) + "px").css("top", Math.round(e) + "px")
    },
    makeCursor: function() {
        var i, t = this.bean.getBrush();
        if (t) {
            if (this.noCursor && "Eye Dropper" != t.options.name) {
                this.width = 26, this.radius = this.width / 2, this.canvas.init(this.width + 4, this.width + 4, !0), i = this.canvas.context, i.globalAlpha = 1, i.lineCap = "round", i.lineJoin = "round", i.strokeStyle = "#ffffff", i.lineWidth = 7;
                var s = 6,
                    e = 23;
                return i.beginPath(), i.moveTo(s, s), i.lineTo(e, e), i.moveTo(e, s), i.lineTo(s, e), i.stroke(), i.strokeStyle = "#000000", i.lineWidth = 3, i.beginPath(), i.moveTo(s, s), i.lineTo(e, e), i.moveTo(e, s), i.lineTo(s, e), i.stroke(), void 0
            }
            if (this.width = Math.max(4, Math.round(t.getCursorSize() * this.bean.getScale())), this.radius = r = this.width / 2, this.canvas.init(this.width + 4, this.width + 4, !0), i = this.canvas.context, i.lineWidth = 1, t.customCursor && "undefined" != t.customCursor) return t.customCursor(i), void 0;
            i.globalAlpha = 10 > this.width ? .7 : .3, i.strokeStyle = "#000000", i.beginPath(), i.moveTo(this.width + 2, r + 2), i.arc(r + 2, r + 2, r, 0, 2 * Math.PI, !0), i.stroke(), i.strokeStyle = "#ffffff", i.beginPath(), i.moveTo(this.width + 1, r + 2), i.arc(r + 2, r + 2, r - 1, 0, 2 * Math.PI, !0), i.stroke()
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/cursorPreview.js");
(function() {
    function e(e) {
        var s = ['<div class="green-guy"><table class="full"><tr>', '<td class="left-image"><img src="${iconSrc}" class="mood-face"/></td>', '<td><div class="talkmessage">', '<div class="cctextarea">', '<div class="cctextarea-ctrl message">{{html message}}</div>', '<i class="l"></i>', "</div>", "</div> </td>", "</tr></table></div>"].join("");
        return jQuery.tmpl(s, e)
    }
    window.GreenGuy = Base.extend({
        constructor: function(s, n, a) {
            this.message = n, this.icon = a, this.$node = e({
                message: n,
                iconSrc: this.iconToFilename(a)
            }), jQuery(s).append(this.$node)
        },
        showMessage: function(e, s) {
            this.message = e, this.icon = s, this.$node && this.$node.find(".left-image img").attr("src", this.iconToFilename(s)).end().find(".talkmessage .message").html(this.message)
        },
        showRandomMessage: function(e, s) {
            e && e instanceof Array && this.showMessage(e[0 | Math.random() * e.length], s)
        },
        iconToFilename: function(e) {
            var s = "green_happy.png";
            switch (e) {
                case "sad":
                case "warning":
                    s = "yellow_frown.png";
                    break;
                case "happy":
                default:
                    s = "green_happy.png"
            }
            return "http://st.deviantart.com/minish/canvasdraw/modals/" + s
        },
        show: function() {
            this.$node && this.$node.show()
        },
        hide: function() {
            this.$node && this.$node.hide()
        },
        appendTo: function(e) {
            e && this.$node && jQuery(e).append(this.$node)
        }
    })
})(jQuery), window.DWait && DWait.run("jms/pages/drawplz/greenGuy.js");
window.SelectionManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Selection Manager"), this.mainNode = mgr.bean.getMainNode(), this.stepsize = 10, this.hasSelection = !1, this.clipboardData = !1, this.selectionChangestamp = 0, this.reset(), mgr.bean.subscribe("selectedLayer", function() {
            this.fixBrushCtx(this.hasSelection)
        }.bindTo(this)), mgr.bean.subscribe("brush", function() {
            this.fixBrushCtx(this.hasSelection)
        }.bindTo(this)), PubSub.subscribe([{
            eventname: "muro.selectionChange",
            subscriber: this,
            callback: this.selectionChange
        }])
    },
    reset: function() {
        this.width = mgr.width, this.height = mgr.height, this.selCanvas = new Canvas($(this.mainNode).find(".selectionCanvas").get(0)), this.selCanvas.init(this.width, this.height, !0), this.selCtx = this.selCanvas.context, this.selDom = this.selCanvas.canvas.get(0), this.antsCanvas = new Canvas($(this.mainNode).find(".marchingAnts").get(0)), this.antsCanvas.init(this.width, this.height, !0), this.antsCtx = this.antsCanvas.context, this.antOffset = 0, this.clipboardData && (this.clipboardData.rect.x = 0, this.clipboardData.rect.y = 0), this.innerDeselect(), PubSub.publish("muro.selectionChange")
    },
    selectionChange: function() {
        this.makeMarchingAnts(), this.selectionChangestamp = this.hasSelection ? (new Date).getTime() : 0
    },
    getSelectionRectangle: function() {
        return this.hasSelection ? {
            x: this.minX,
            y: this.minY,
            width: this.maxX - this.minX,
            height: this.maxY - this.minY
        } : {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
    },
    getClipboardData: function() {
        return this.clipboardData
    },
    isInSelection: function(t, e) {
        var i = this.selCtx.getImageData(t, e, 1, 1);
        return 1 - i.data[3] / 255
    },
    clearClipboardData: function() {
        this.clipboardData = !1
    },
    setClipboardData: function(t, e) {
        this.clipboardData = {
            pixelData: t,
            rect: e,
            handDrawn: mgr.bean.getHandDrawn()
        }
    },
    getInverseMask: function() {
        this.inverseCanvas || (this.inverseCanvas = new Canvas(document.createElement("canvas"))), this.inverseCanvas.init(this.width, this.height, !0);
        var t = this.inverseCanvas.context;
        return t.globalCompositeOperation = "source-over", t.fillStyle = "#000000", t.fillRect(0, 0, this.width, this.height), t.globalCompositeOperation = "xor", t.drawImage(this.selCanvas.canvas.get(0), 0, 0), this.inverseCanvas
    },
    selectInverse: function() {
        if (this.hasSelection) {
            var t = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "inv");
            this._selectInverse(), PubSub.publish("muro.selectionChange"), t.pushInstruction()
        }
    },
    _selectInverse: function() {
        this.selCtx.globalCompositeOperation = "xor";
        try {
            this.selCtx.fillStyle = "#000000", this.selCtx.fillRect(0, 0, this.width, this.height)
        } finally {
            this.selCtx.globalCompositeOperation = "source-over"
        }
    },
    squareSelect: function(t, e, i, s, a) {
        a ? this.selCtx.clearRect(t, e, i, s) : (this.selCtx.fillStyle = "#000000", this.selCtx.fillRect(t, e, i, s)), PubSub.publish("muro.selectionChange")
    },
    ellipticalSelect: function(t, e, i, s, a) {
        this.selCtx.globalCompositeOperation = a ? "destination-out" : "source-over";
        try {
            this.selCtx.fillStyle = "rgba(0, 0, 0, 1)", this._fillEllipse(t, e, i, s, this.selCtx)
        } finally {
            this.selCtx.globalCompositeOperation = "source-over"
        }
        PubSub.publish("muro.selectionChange")
    },
    _fillEllipse: function(t, e, i, s, a) {
        a.save();
        try {
            a.translate(t, e), a.scale(i / 2, s / 2), a.beginPath(), a.moveTo(1, 0), a.arc(0, 0, 1, 0, 2 * Math.PI)
        } finally {
            a.restore()
        }
        a.fill()
    },
    pathSelect: function(t, e) {
        this.selCtx.globalCompositeOperation = e ? "destination-out" : "source-over";
        try {
            this.selCtx.fillStyle = "rgba(0, 0, 0, 1)";
            var i = t[0];
            this.selCtx.beginPath(), this.selCtx.moveTo(i[0], i[1]);
            for (var s = 1; t.length > s; s++) i = t[s], this.selCtx.lineTo(i[0], i[1]);
            this.selCtx.fill()
        } finally {
            this.selCtx.globalCompositeOperation = "source-over"
        }
        PubSub.publish("muro.selectionChange")
    },
    wandSelect: function(t, e, i) {
        var s;
        e ? s = this.selCtx.clearRect.bindTo(this.selCtx) : (this.selCtx.fillStyle = "rgba(0,0,0,1)", s = this.selCtx.fillRect.bindTo(this.selCtx));
        var a;
        a = "post" == mgr.tabManager.currentTab() ? 7 : 15 * (1 - mgr.bean.getBrushHardness());
        var n = mgr.bean.getSelectedLayer().ctx.getPixelData(),
            h = new Filler(s, a, function() {}, 1e3);
        h.fill(n, t[0], t[1], function() {
            try {
                mgr.bean.getSelectedLayer().setChangeStamp(), getManager().undoManager.push();
                var t = mgr.bean.getRDReader();
                t && setTimeout(function() {
                    mgr.bean.getRDReader().resumeFromAsync()
                }, 5), PubSub.publish("muro.selectionChange");
                var e = mgr.bean.getRDWriter();
                e && e.pushInstruction()
            } finally {
                i()
            }
        }.bindTo(this))
    },
    fixBrushCtx: function(t) {
        try {
            var e = mgr.bean.getBrush();
            e.ctx = !t || e.options.handlesOwnSelection ? mgr.bean.getSelectedLayer().getContext() : mgr.bean.getStagingCtx()
        } catch (i) {}
    },
    deselect: function() {
        var t = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "des");
        this.innerDeselect(), PubSub.publish("muro.selectionChange"), mgr.undoManager.push(), t.pushInstruction()
    },
    innerDeselect: function() {
        this.selCtx.fillStyle = "#000000", this.selCtx.fillRect(0, 0, this.width, this.height), this.hasSelection = !1, this.fixBrushCtx(!1), this.antsCtx.clear()
    },
    selectAll: function() {
        var t = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "sall");
        this.selCtx.clearRect(0, 0, mgr.width, mgr.height), this.fixBrushCtx(!0), this.hasSelection = !0, PubSub.publish("muro.selectionChange"), t.pushInstruction()
    },
    selectFromImage: function(t) {
        this.selCtx.clear(), this.selCtx.drawImage(t, 0, 0), this.fixBrushCtx(!0), this.hasSelection = !0, PubSub.publish("muro.selectionChange")
    },
    moveSelection: function(t, e) {
        var i = this.getInverseMask();
        this.innerDeselect(), this.selCtx.globalCompositeOperation = "destination-out";
        try {
            this.selCtx.drawImage(i.canvas.get(0), t, e)
        } finally {
            this.selCtx.globalCompositeOperation = "source-over"
        }
        PubSub.publish("muro.selectionChange")
    },
    rebuildAntCanvas: function() {
        var t = this.antsCanvas.canvas.css("z-index"),
            e = this.antsCanvas.canvas.parent();
        this.antsCanvas.canvas.remove();
        var i = $('<canvas class="marchingAnts"></canvas>').appendTo(e);
        this.antsCanvas = new Canvas(i), this.antsCanvas.init(this.width, this.height, !0), this.antsCtx = this.antsCanvas.context, this.antsCanvas.canvas.css("z-index", t)
    },
    makeMarchingAnts: function() {
        this.hasSelection = !1, this.fixBrushCtx(!1);
        var t = this.selCtx.getPixelData();
        this.rebuildAntCanvas();
        var e = this.antsCtx.getPixelData();
        this.minX = this.width, this.maxX = 0, this.minY = this.height, this.maxY = 0;
        var i, s, a, n, h = [];
        for (a = 0; this.width > a; a++) h[a] = 255;
        for (n = 0; this.height - 1 > n; n++) for (i = 255, a = 0; this.width > a; a++) s = i, i = this.width - 1 > a ? t.data[(n * this.width + a + 1 << 2) + 3] : 255, (128 > s && (i >= 128 || h[a] >= 128) || s >= 128 && (128 > i || 128 > h[a])) && (this.antsCtx.setPixel(e, a, n, [0, 0, 0, 255]), this.minX = Math.min(this.minX, a), this.maxX = Math.max(this.maxX, a + 1), this.minY = Math.min(this.minY, n), this.maxY = Math.max(this.maxY, n + 1), this.hasSelection = !0, this.fixBrushCtx(!0)), h[a] = s;
        for (n = this.height - 1, a = 0; this.width > a; a++) s = h[a], i = this.width - 1 > a ? h[a + 1] : 255, (128 > s || 128 > i) && (this.antsCtx.setPixel(e, a, n, [0, 0, 0, 255]), this.minX = Math.min(this.minX, a), this.maxX = Math.max(this.maxX, a + 1), this.minY = Math.min(this.minY, this.height - 1), this.maxY = Math.max(this.maxY, this.height), this.hasSelection = !0, this.fixBrushCtx(!0));
        this.antsCtx.setPixelData(e), mgr.zoomManager.reScale(), this.animateAnts()
    },
    animateAnts: function() {
        if (window.clearTimeout(this.antTimeout), this.hasSelection) {
            try {
                this.antOffset += 2, this.antOffset >= this.stepsize && (this.antOffset -= this.stepsize), this.antsCtx.globalCompositeOperation = "source-atop", this.antsCtx.drawImage($(this.mainNode).find(".antStripes").get(0), this.antOffset, 0, this.maxX - this.minX + this.stepsize, this.maxY - this.minY, this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
            } catch (t) {}
            this.antTimeout = window.setTimeout(this.animateAnts.bindTo(this), 300)
        }
    },
    copy: function() {
        if (this.hasSelection) {
            var t, e = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "copy");
            try {
                var i = this.getSelectionRectangle();
                t = mgr.bean.getBufferCtx(), t.clear(), t.globalCompositeOperation = "source-over", t.drawImage(mgr.bean.getSelectedLayer().canvasDom, i.x, i.y, i.width, i.height, i.x, i.y, i.width, i.height), t.globalCompositeOperation = "destination-out", t.drawImage(this.selCanvas.canvas.get(0), i.x, i.y, i.width, i.height, i.x, i.y, i.width, i.height);
                var s = t.getImageData(i.x, i.y, i.width, i.height);
                this.setClipboardData(s, i)
            } finally {
                t.globalCompositeOperation = "source-over", t.clear()
            }
            e.pushInstruction()
        }
    },
    cut: function() {
        if (this.hasSelection) {
            var t = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "cut");
            this.copy();
            var e = this.getInverseMask(),
                i = mgr.bean.getSelectedLayer().getContext();
            i.globalCompositeOperation = "destination-out";
            try {
                i.drawImage(e.canvas.get(0), 0, 0)
            } finally {
                i.globalCompositeOperation = "source-over"
            }
            mgr.bean.getSelectedLayer().setChangeStamp(), mgr.undoManager.push(), this.innerDeselect(), PubSub.publish("muro.selectionChange"), t.pushInstruction()
        }
    },
    clear: function(t) {
        var e = this.getInverseMask(),
            i = mgr.bean.getSelectedLayer().getContext();
        i.globalCompositeOperation = "destination-out";
        try {
            i.drawImage(e.canvas.get(0), 0, 0)
        } finally {
            i.globalCompositeOperation = "source-over"
        }
        t && (mgr.bean.getSelectedLayer().setChangeStamp(), mgr.undoManager.push())
    },
    paste: function() {
        var t = this.getClipboardData();
        if (t) {
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.FLUSH, ["Pasting", "Pasting Selection"]),
                i = mgr.layerManager.createLayer(!1);
            i.getContext().putImageData(t.pixelData, t.rect.x, t.rect.y), i.setChangeStamp(), t.handDrawn || mgr.bean.setHandDrawn(!1), mgr.undoManager.push(), e.pushInstruction()
        }
    },
    startMasking: function() {
        window.clearTimeout(this.antTimeout), this.brush = mgr.bean.getBrush(), this.hasSelection && !mgr.bean.getBrush().options.handlesOwnSelection && (this.bufferCtx = mgr.bean.getBufferCtx(), this.stgCtx = mgr.bean.getStagingCtx(), this.maskStagingBuffer(this.brush.options.maskBuffers))
    },
    stopMasking: function() {
        this.brush && (this.brush.options.handlesOwnSelection || this.maskStagingBuffer(["stgCtx", "bufferCtx"]), this.bufferCtx = null, this.stgCtx = null, this.brush = null, this.animateAnts())
    },
    maskStagingBuffer: function(t) {
        if (this.hasSelection && !this.brush.options.handlesOwnSelection) for (var e, i = 0; t.length > i; i++) try {
            e = t[i];
            var s = this[e];
            this.maskContext(s)
        } catch (a) {
            this.logger.log("FAIL: ", [e, a])
        }
    },
    maskContext: function(t) {
        var e = t.globalCompositeOperation,
            i = t.globalAlpha;
        try {
            t.globalCompositeOperation = "destination-out", t.globalAlpha = 1, t.drawImage(this.selDom, 0, 0)
        } finally {
            t.globalCompositeOperation = e, t.globalAlpha = i
        }
    },
    selectByColorModal: function() {
        mgr.modalManager.pushModal("selectColor", [], function(t) {
            t && mgr.selectionManager.selectByColor(t.tolerance, t.allLayers)
        }, function(t) {
            var e, i, s;
            e = $(t).find(".selColSlider"), i = e.find(".knob").get(0), s = e.find(".track").get(0);
            var a = $(s).width();
            new Dragger([i, s], s, function() {}, function(s) {
                var n = Math.max(0, Math.min(1, s[0] / a)),
                    h = Math.floor(a * n) - 6;
                $(i).css("left", h + "px"), e.find(".value").html(Math.floor(100 * n) + "%"), e.find(".fineInput").val(Math.round(100 * n)), $.data(t, "tolerance", n)
            }, function() {
                var e = $.data(t, "tolerance");
                safeLocalSet("drawplz_selColorTol", e)
            });
            var n = safeLocalGet("drawplz_selColorTol", .5);
            $.data(t, "tolerance", n);
            var h = Math.floor(a * n) - 6;
            $(i).css("left", h + "px"), $(t).find(".scmOK").click(function() {
                var e = $.data(t, "tolerance"),
                    i = "allLayers" == $(t).find(".isAllLayers option:selected").val();
                Modals.pop({
                    tolerance: e,
                    allLayers: i
                })
            }), $(t).find(".scmCancel").click(function() {
                Modals.pop(-1)
            })
        })
    },
    selectByColor: function(t, e) {
        var i = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "sbc");
        i.addInstructionData(t), i.addInstructionData(e);
        var s, a, n, h = this.selCtx.getPixelData();
        e ? (a = mgr.layerManager.getTempMergedVisible().getContext("2d"), n = a.getImageData(0, 0, mgr.width, mgr.height)) : (s = mgr.bean.getSelectedLayer(), a = s.getContext(), n = a.getPixelData());
        for (var r, o, l, c = mgr.bean.getColor(), g = hexToRgba(c + "FF"), u = 0; mgr.width > u; u++) for (var m = 0; mgr.height > m; m++) l = 4 * (m * mgr.width + u), r = [n.data[l], n.data[l + 1], n.data[l + 2], n.data[l + 3]], o = colorDistance(g, r), 150 * t >= Math.pow(o, 2) && (this.hasSelection = !0, h.data[l + 3] = 0);
        this.hasSelection && (this.selCtx.setPixelData(h), this.fixBrushCtx(!0), PubSub.publish("muro.selectionChange")), i.pushInstruction()
    },
    expand: function(t) {
        if (this.hasSelection) {
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "exp");
            e.addInstructionData(t), this._selectInverse(), this._contract(t), this._selectInverse(), this.fixBrushCtx(!0), PubSub.publish("muro.selectionChange"), e.pushInstruction()
        }
    },
    contract: function(t) {
        if (this.hasSelection) {
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "cnt");
            e.addInstructionData(t), this._contract(t);
            var i = this.selCtx.getPixelData();
            this.antsCtx.setPixelData(i), this.fixBrushCtx(!0), PubSub.publish("muro.selectionChange"), e.pushInstruction()
        }
    },
    _contract: function(t) {
        if (this.hasSelection) {
            this.selCtx.globalCompositeOperation = "source-over";
            try {
                var e, i, s, a, n = this.selCtx.getPixelData(),
                    h = 2 * Math.PI,
                    r = [];
                for (s = 0; this.width > s; s++) r[s] = 0;
                for (a = 0; this.height - 1 > a; a++) for (e = 0, s = 0; this.width > s; s++) i = e, e = this.width - 1 > s ? n.data[(a * this.width + s + 1 << 2) + 3] : 0, i > e || i > r[s] ? (this.selCtx.fillStyle = "rgba(0,0,0," + i + ")", this.selCtx.beginPath(), this.selCtx.arc(s, a, t, 0, h, !1), this.selCtx.fill()) : e > i && this.width - 1 > s ? (this.selCtx.fillStyle = "rgba(0,0,0," + e + ")", this.selCtx.beginPath(), this.selCtx.arc(s + 1, a, t, 0, h, !1), this.selCtx.fill()) : r[s] > i && (this.selCtx.fillStyle = "rgba(0,0,0," + r[s] + ")", this.selCtx.beginPath(), this.selCtx.arc(s, a - 1, t, 0, h, !1), this.selCtx.fill()), r[s] = i;
                for (a = this.height - 1, s = 0; this.width > s; s++) i = r[s], e = this.width - 1 > s ? r[s + 1] : 255, i > e ? (this.selCtx.fillStyle = "rgba(0,0,0," + i + ")", this.selCtx.beginPath(), this.selCtx.arc(s, a, t, 0, h, !1), this.selCtx.fill()) : e > i && this.width - 1 > s && (this.selCtx.fillStyle = "rgba(0,0,0," + e + ")", this.selCtx.beginPath(), this.selCtx.arc(s + 1, a, t, 0, h, !1), this.selCtx.fill())
            } finally {
                this.selCtx.globalCompositeOperation = "source-over"
            }
        }
    },
    expandModal: function() {
        this.hasSelection && mgr.modalManager.pushModal("expand_contract", ["Expand"], function(t) {
            t.numpx && mgr.selectionManager.expand(mgr.selectionManager.checkExpConArg(t.numpx))
        }.bindTo(this), function(t) {
            this.$modal = $(t)
        }.bindTo(this))
    },
    contractModal: function() {
        this.hasSelection && mgr.modalManager.pushModal("expand_contract", ["Contract"], function(t) {
            t.numpx && mgr.selectionManager.contract(mgr.selectionManager.checkExpConArg(t.numpx))
        }.bindTo(this), function(t) {
            this.$modal = $(t)
        }.bindTo(this))
    },
    checkExpConArg: function(t) {
        var e = parseInt(t, 10);
        return !e || 1 > e || e > 255 ? null : e
    },
    selectFromLayer: function(t, e) {
        var i = mgr.layerManager.getLayer(t);
        if (!i) return this.logger.talkback("Selecting from layer when layer doesn't exist"), void 0;
        var s = mgr.bean.getRDWriter().startInstruction(RDInst.SELECTION, "sfl");
        s.addInstructionData(t), s.addInstructionData(e), e && this.innerDeselect();
        try {
            this.selCtx.globalCompositeOperation = "destination-out", this.selCtx.drawImage(i.canvasDom, 0, 0)
        } finally {
            this.selCtx.globalCompositeOperation = "source-over"
        }
        PubSub.publish("muro.selectionChange"), s.pushInstruction()
    },
    crop: function() {
        if (this.hasSelection) {
            for (var t = mgr.width, e = mgr.height, i = 0, s = 0, a = this.selCtx.getPixelData(), n = 0; mgr.width > n; n++) for (var h = 0; mgr.height > h; h++) 255 > a.data[4 * (h * mgr.width + n) + 3] && (t = Math.min(t, n), e = Math.min(e, h), i = Math.max(i, n), s = Math.max(s, h));
            var r = i - t + 1,
                o = s - e + 1;
            1 > r || 1 > o || mgr.layerManager.resize(r, o, - 1 * t, - 1 * e, 0)
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/selectionManager.js");
DWait.ready(["jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.MarqueeSelectionBrush = BrushBase.extend({
        options: {
            name: "Selection",
            wacom: !1,
            ie: !1,
            ie9: !0,
            handlesOwnSelection: !0,
            inToolbar: !1,
            whichTool: "select",
            defaultModifiers: !1,
            specialBrushes: "selectionBrushes"
        },
        constructor: function(t, s, e, i) {
            this.base(t, s, e, i), this.subbrush = safeLocalGet("drawplz_selectionSubBrush", "Marquee"), this.bindHtml(), this.is_busy = !1
        },
        bindHtml: function() {
            var t = this;
            $(document).on("mousedown", ".selectionBrushes .brushButton", function() {
                var s = $(this).data("name");
                t.subBrush(s)
            })
        },
        getCursorSize: function() {
            return 36 / this.bean.getScale()
        },
        customCursor: function(t) {
            t.globalAlpha = 1, t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = "#ffffff", t.lineWidth = 3;
            var s = 12,
                e = 29,
                i = 20.5;
            t.beginPath(), t.moveTo(i, s), t.lineTo(i, e), t.moveTo(e, i), t.lineTo(s, i), t.stroke(), t.strokeStyle = "#000000", t.lineWidth = 1, t.beginPath(), t.moveTo(i, s), t.lineTo(i, e), t.moveTo(e, i), t.lineTo(s, i), t.stroke()
        },
        subBrush: function(t) {
            t ? this.subbrush = t : this.subbrush || (this.subbrush = "Marquee"), mgr.bean.getRDReader() || safeLocalSet("drawplz_selectionSubBrush", this.subbrush), this.subbrush.match(/Marquee/) ? mgr.bean.getRDReader() || safeLocalSet("drawplz_whichMarquee", this.subbrush) : this.subbrush.match(/Elliptical/) ? mgr.bean.getRDReader() || safeLocalSet("drawplz_whichElliptical", this.subbrush) : this.subbrush.match(/Wand/) ? (mgr.bean.getRDReader() || safeLocalSet("drawplz_whichWand", this.subbrush), $(".effectLabel").html("Threshold")) : mgr.bean.getRDReader() || safeLocalSet("drawplz_whichLasso", this.subbrush), this.subbrush.match(/Wand/) ? (this.options.asyncPush = !0, this.options.async = !0, mgr.canvasDrawing.enableControls(["effectSlider"], !0)) : (this.options.asyncPush = !1, this.options.async = !1, mgr.canvasDrawing.enableControls(["effectSlider"], !1)), $(".selectionBrushes .brushButton", this.mainNode).removeClass("brushButtonSelected"), $('.selectionBrushes .brushButton[data-name="' + this.subbrush + '"]', this.mainNode).addClass("brushButtonSelected")
        },
        brushPreview: function() {
            $(".brushPicker .brushPickerCover").show(), this.subBrush(null)
        },
        revertThingsIChanged: function() {
            $(".brushPickerCover").hide()
        },
        startDraw: function(t) {
            switch (this.shiftStroke = this.shiftKey, this.altStroke = this.altKey, this.subbrush) {
                case "Marquee":
                case "Lasso":
                case "Elliptical":
                case "Magic Wand":
                    this.shiftKey || this.altKey || (this.isMicroSelection = !0, mgr.selectionManager.innerDeselect());
                case "Additive Elliptical":
                case "Subtractive Elliptical":
                case "Additive Wand":
                case "Subtractive Wand":
                case "Additive Marquee":
                case "Additive Lasso":
                case "Subtractive Marquee":
                case "Subtractive Lasso":
                    this.startCoords = t, this.bufferCtx.obj.canvas.css("z-index", mgr.selectionManager.antsCanvas.canvas.css("z-index") + 1)
            }
            switch ("Additive Elliptical" == this.subbrush && (this.shiftStroke = !1), "Subtractive Elliptical" == this.subbrush && (this.altStroke = !1), this.subbrush) {
                case "Lasso":
                case "Additive Lasso":
                case "Subtractive Lasso":
                    this.lassoPoints = [], this.lassoPoints.push(t)
            }
        },
        moveDraw: function(t) {
            var s = t[0] - this.startCoords[0],
                e = t[1] - this.startCoords[1];
            switch (s * s + e * e > 16 && (this.isMicroSelection = !1), this.subbrush) {
                case "Marquee":
                case "Additive Marquee":
                case "Subtractive Marquee":
                    return this.bufferCtx.clear(), this.bufferCtx.strokeStyle = "#ffffff", this.bufferCtx.lineWidth = 2, this.bufferCtx.strokeRect(this.startCoords[0], this.startCoords[1], s, e), this.bufferCtx.strokeStyle = "#000000", this.bufferCtx.lineWidth = 1, this.bufferCtx.strokeRect(this.startCoords[0], this.startCoords[1], s, e), !1;
                case "Elliptical":
                case "Additive Elliptical":
                case "Subtractive Elliptical":
                    !this.shiftStroke && this.shiftKey && (s = 0 > s ? -1 * Math.min(Math.abs(s), Math.abs(e)) : Math.min(Math.abs(s), Math.abs(e)), e = 0 > e ? -1 * Math.min(Math.abs(s), Math.abs(e)) : Math.min(Math.abs(s), Math.abs(e)));
                    var i, a;
                    !this.altStroke && this.altKey ? (i = this.startCoords[0], a = this.startCoords[1], s *= 2, e *= 2) : (i = this.startCoords[0] + s / 2, a = this.startCoords[1] + e / 2), this.bufferCtx.clear(), this.bufferCtx.strokeStyle = "#ffffff", this.bufferCtx.lineWidth = 2, this.bufferCtx.save();
                    try {
                        this.bufferCtx.translate(i, a), this.bufferCtx.scale(s / 2, e / 2), this.bufferCtx.beginPath(), this.bufferCtx.moveTo(1, 0), this.bufferCtx.arc(0, 0, 1, 0, 2 * Math.PI)
                    } finally {
                        this.bufferCtx.restore()
                    }
                    this.bufferCtx.stroke(), this.bufferCtx.strokeStyle = "#000000", this.bufferCtx.lineWidth = 1, this.bufferCtx.save();
                    try {
                        this.bufferCtx.translate(i, a), this.bufferCtx.scale(s / 2, e / 2), this.bufferCtx.beginPath(), this.bufferCtx.moveTo(1, 0), this.bufferCtx.arc(0, 0, 1, 0, 2 * Math.PI)
                    } finally {
                        this.bufferCtx.restore()
                    }
                    return this.bufferCtx.stroke(), !1;
                case "Lasso":
                case "Additive Lasso":
                case "Subtractive Lasso":
                    this.lassoPoints.push(t), this.bufferCtx.clear(), this.bufferCtx.strokeStyle = "#000000", this.bufferCtx.lineWidth = 1;
                    var r = this.lassoPoints[0];
                    this.bufferCtx.beginPath(), this.bufferCtx.moveTo(r[0], r[1]);
                    for (var h = 1; this.lassoPoints.length > h; h++) r = this.lassoPoints[h], this.bufferCtx.lineTo(r[0], r[1]);
                    this.bufferCtx.stroke();
                    break;
                case "Magic Wand":
                case "Additive Wand":
                case "Subtractive Wand":
                    return !1
            }
        },
        endDraw: function(t) {
            var s;
            if ("Marquee" != this.subbrush && "Lasso" != this.subbrush || !this.isMicroSelection) {
                var e, i;
                switch (this.subbrush) {
                    case "Marquee":
                    case "Additive Marquee":
                    case "Subtractive Marquee":
                        e = t[0] - this.startCoords[0], i = t[1] - this.startCoords[1], s = (this.shiftStroke || "Subtractive Marquee" != this.subbrush) && !this.altStroke, mgr.selectionManager.squareSelect(this.startCoords[0], this.startCoords[1], e, i, s);
                        break;
                    case "Elliptical":
                    case "Additive Elliptical":
                    case "Subtractive Elliptical":
                        e = t[0] - this.startCoords[0], i = t[1] - this.startCoords[1], !this.shiftStroke && this.shiftKey && (e = 0 > e ? -1 * Math.min(Math.abs(e), Math.abs(i)) : Math.min(Math.abs(e), Math.abs(i)), i = 0 > i ? -1 * Math.min(Math.abs(e), Math.abs(i)) : Math.min(Math.abs(e), Math.abs(i)));
                        var a, r;
                        !this.altStroke && this.altKey ? (a = this.startCoords[0], r = this.startCoords[1], e *= 2, i *= 2) : (a = this.startCoords[0] + e / 2, r = this.startCoords[1] + i / 2), s = (this.shiftStroke || "Subtractive Elliptical" != this.subbrush) && !this.altStroke, mgr.selectionManager.ellipticalSelect(a, r, e, i, s);
                        break;
                    case "Lasso":
                    case "Additive Lasso":
                    case "Subtractive Lasso":
                        s = (this.shiftStroke || "Subtractive Lasso" != this.subbrush) && !this.altStroke, mgr.selectionManager.pathSelect(this.lassoPoints, s), this.lassoPoints = null;
                        break;
                    case "Magic Wand":
                    case "Additive Wand":
                    case "Subtractive Wand":
                        if (this.is_busy) return !1;
                        this.is_busy = !0, s = (this.shiftStroke || "Subtractive Wand" != this.subbrush) && !this.altStroke, mgr.selectionManager.wandSelect(this.startCoords, s, function() {
                            this.is_busy = !1
                        }.bindTo(this))
                }
            } else mgr.selectionManager.innerDeselect(), PubSub.publish("muro.selectionChange");
            return this.bufferCtx.clear(), mgr.layerManager.setZIndices(), !1
        },
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name, this.subbrush])
        },
        recordPlayMeta: function(t) {
            return this.subBrush(t[1]), !0
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/marqueeSelection.js")
});
DWait.ready(["jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.MoveTool = BrushBase.extend({
        options: {
            name: "Move",
            wacom: !1,
            ie: !1,
            ie9: !0,
            handlesOwnSelection: !0,
            inToolbar: !1,
            whichTool: "move",
            defaultModifiers: !1
        },
        constructor: function(s, t, e, a) {
            this.base(s, t, e, a), this.cursorImage = new Image, this.cursorImage.src = "http://st.deviantart.net/minish/canvasdraw/brushassets/move_cursor.png?2"
        },
        getCursorSize: function() {
            return 36 / this.bean.getScale()
        },
        customCursor: function(s) {
            s.globalAlpha = 1, s.drawImage(this.cursorImage, 11, 11)
        },
        brushPreview: function() {
            $(".brushPicker .brushPickerCover").show()
        },
        revertThingsIChanged: function() {
            $(".brushPickerCover").hide()
        },
        startDraw: function(s) {
            this.startCoords = s, this.scale = this.bean.getScale(), this.bufferCtx.clear(), this.bufferCtx.drawImage(this.ctx.obj.canvas.get(0), 0, 0), this.selMgr = getManager().selectionManager, this.hasSel = this.selMgr.hasSelection, this.hasSel ? (this.bufferCtx.globalCompositeOperation = "destination-out", this.bufferCtx.drawImage(getManager().selectionManager.selDom, 0, 0), this.bufferCtx.globalCompositeOperation = "source-over", getManager().selectionManager.clear(!1)) : this.ctx.obj.canvas.hide()
        },
        moveDraw: function(s) {
            var t = Math.round((s[0] - this.startCoords[0]) * this.scale),
                e = Math.round((s[1] - this.startCoords[1]) * this.scale);
            return this.bufferCtx.obj.canvas.css("left", t + "px").css("top", e + "px"), this.hasSel && this.selMgr.antsCanvas.canvas.css("left", t + "px").css("top", e + "px"), !1
        },
        endDraw: function(s) {
            var t = Math.round(s[0] - this.startCoords[0]),
                e = Math.round(s[1] - this.startCoords[1]);
            return this.hasSel ? this.selMgr.moveSelection(t, e) : (this.ctx.clear(), this.ctx.obj.canvas.show(), this.selMgr.antsCanvas.canvas.css("left", "0px").css("top", "0px")), this.ctx.drawImage(this.bufferCtx.obj.canvas.get(0), t, e), this.bufferCtx.clear(), this.bufferCtx.obj.canvas.css("left", "0px").css("top", "0px"), this.selMgr = this.hasSel = null, this.minX = this.minY = 0, this.maxX = mgr.width, this.maxY = mgr.height, !1
        },
        recordStart: function(s) {
            s.startInstruction(RDInst.BRUSH, [this.options.name])
        },
        recordPlayMeta: function() {
            return !0
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/moveTool.js")
});
DWait.ready(["jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.HandTool = BrushBase.extend({
        options: {
            name: "Hand Tool",
            wacom: !1,
            ie: !1,
            ie9: !0,
            inToolbar: !1,
            whichTool: "none",
            shouldUndo: !1
        },
        constructor: function(a, r, n, s) {
            this.base(a, r, n, s), this.cursorImage = new Image, this.cursorImage.src = "http://st.deviantart.net/minish/canvasdraw/brushassets/hand_cursor.png"
        },
        setTool: function() {},
        getCursorSize: function() {
            return 36 / this.bean.getScale()
        },
        customCursor: function(a) {
            a.globalAlpha = 1, a.drawImage(this.cursorImage, 0, 0)
        },
        init: function() {},
        brushPreview: function() {
            $(".brushPicker .brushPickerCover").show()
        },
        revertThingsIChanged: function() {
            $(".brushPickerCover").hide()
        },
        startDraw: function(a) {
            return this.startCoords = a, this.startNavPan = [mgr.zoomManager.navPanLeft, mgr.zoomManager.navPanTop], this.scale = mgr.bean.getScale(), !1
        },
        moveDraw: function(a) {
            var r = mgr.zoomManager;
            return r.setNavPan(this.startNavPan[0] + r.navScale * (this.startCoords[0] - a[0]), this.startNavPan[1] + r.navScale * (this.startCoords[1] - a[1])), !1
        },
        endDraw: function() {
            return this.startCoords = null, !1
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/handTool.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.SmudgeBrush = BrushBase.extend({
        options: {
            name: "Blending",
            wacom: !0,
            ie: !1,
            ie9: !0,
            defaultSettings: [15, 1, .5],
            effectLabel: "Smear",
            maskBuffers: ["bufferCtx"],
            minMaxWidth: 2 * MAX_BRUSH_SIZE,
            handlesOwnSelection: !0,
            inToolbar: !1,
            whichTool: "smudge"
        },
        brushInit: function() {},
        getCursorSize: function() {
            return this.bean.getBrushSize()
        },
        brushPreview: function() {
            this.setLineStyle(), this.imageData = null, this.brushCtx.lineWidth = 10;
            for (var t = mgr.$mainNode.find(".brushPreviewCanvas").width(), s = mgr.$mainNode.find(".brushPreviewCanvas").height(), e = -1 * s + 5; t > e; e += 20) this.brushCtx.strokeStyle = this.getRGBA("000000", 1), this.brushCtx.beginPath(), this.brushCtx.moveTo(e, 0), this.brushCtx.lineTo(e + s, s), this.brushCtx.stroke(), this.brushCtx.strokeStyle = this.getRGBA("ffffff", 1), this.brushCtx.beginPath(), this.brushCtx.moveTo(e + 5, 0), this.brushCtx.lineTo(e + s + 5, s), this.brushCtx.stroke();
            for (e = 0; 100 > e; e += 3) coord = [], coord[0] = e, coord[1] = 26, coord[2] = Math.pow(e / 100, .25), coord[3] = [0, 0], this.stroke(this.brushCtx, coord)
        },
        setLineStyle: function() {
            this.radius = Math.ceil(.5 * mgr.bean.getBrushSize()), this.diameter = 2 * this.radius, this.lift = 2 * (1 - mgr.bean.getBrushHardness() + .01)
        },
        startDraw: function(t) {
            return this.setLineStyle(), this.base(t), this.imageData = null, this.lc = [t[0], t[1], t[2]], !1
        },
        moveDraw: function(t) {
            var s = t[0] - this.lc[0],
                e = t[1] - this.lc[1],
                a = t[2] - this.lc[2],
                i = Math.pow(s * s + e * e, .5),
                r = 2;
            if (i > r) {
                for (var h = r; i > h; h += r) {
                    var n = h / i,
                        o = [Math.round(this.lc[0] + n * s), Math.round(this.lc[1] + n * e), Math.max(0, Math.min(1, this.lc[2] + n * a))];
                    this.stroke(this.ctx, o)
                }
                this.lc = [t[0], t[1], t[2]]
            } else this.stroke(this.ctx, [Math.round(t[0]), Math.round(t[1]), t[2]])
        },
        endDraw: function() {
            return this.hasSel && (this.ctx.drawImage(this.stgDom, 0, 0), this.stgCtx.clear()), this.stgCtx = this.stgDom = this.hasSel = this.selDom = null, !1
        },
        stroke: function(t, s) {
            var e, a, i, r, h, n, o, u, d, g, l, m, c, b, f;
            if (i = this.radius, r = this.diameter, b = mgr.selectionManager.hasSelection && t == this.ctx, f = b ? mgr.selectionManager.selCanvas.context.getImageData(s[0] - i, s[1] - i, r, r) : null, c = t.getImageData(s[0] - i, s[1] - i, r, r), m = this.lift * Math.pow(s[2], 3), !this.imageData) return this.imageData = c, void 0;
            for (h = this.imageData.data, e = 0; r > e; e++) for (n = Math.pow(e - i, 2), l = e * r, a = 0; r > a; a++) o = 4 * (l + a), u = Math.max(i - Math.pow(n + Math.pow(a - i, 2), .5), .1) / i, d = m * u, b && (d *= 1 - f.data[o + 3] / 255), g = d + 1, h[o] = (h[o] * d + c.data[o]) / g, h[o + 1] = (h[o + 1] * d + c.data[o + 1]) / g, h[o + 2] = (h[o + 2] * d + c.data[o + 2]) / g, h[o + 3] = (h[o + 3] * d + c.data[o + 3]) / g;
            t.putImageData(this.imageData, Math.round(s[0] - i), Math.round(s[1] - i))
        },
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name, 1, mgr.bean.getBrushSize(), mgr.bean.getBrushHardness()])
        },
        recordPlayMeta: function(t) {
            mgr.bean.setBrushOpacity(t[1]), mgr.bean.setBrushHardness(t[3]);
            var s = 1 > mgr.bean.getInstructionsVersion() ? t[2] * MAX_BRUSH_SIZE / 40 : t[2];
            return mgr.bean.setBrushSize(s), !0
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/smudge.js")
});
window.TextChunk = Base.extend({
    constructor: function(t, e, r, s) {
        this.brush = t, this.logger = t.logger, this.text = e, this.measure(r, s), this.ptr = 0, this.recordMarker = !1, this.hasSubpixelCanvas = !Browser.isGecko && !Browser.isIE && !Browser.isOpera
    },
    measure: function(t, e) {
        e && (this.font = e);
        var r = this.brush.getSize();
        t.font = r + "px " + this.font, this.measurement = t.measureText(this.text).width
    },
    makeCanvas: function(t) {
        var e = this.brush.getSize();
        t.obj.init(this.measurement, 2 * e, !0), t.font = e + "px " + this.font, t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = this.brush.getRGBA(mgr.bean.getColor(), 1), t.fillText(this.text, 0, e)
    },
    reset: function(t, e) {
        this.ptr = 0, this.measure(t, e)
    },
    draw: function(t, e, r, s, i, a, h) {
        this.recordText();
        var n = i;
        i > this.measurement - this.ptr && (n = this.measurement - this.ptr);
        var o, u, c, l, d, m, f, g;
        if (o = this.ptr, u = n, c = 0, l = -1 * h / 2, d = n / i * a, m = h, f = r[0], g = r[1], !this.hasSubpixelCanvas) {
            f = Math.round(f), g = Math.round(g);
            var x = MathUtils.rotatePoint([f - r[0], g - r[1]], - s),
                b = c - x[0];
            c = Math.floor(b), d = Math.ceil(d + b - c);
            var p = l - x[1];
            l = Math.floor(p), m = Math.ceil(m + p - l)
        }
        t.save();
        try {
            t.translate(f, g), t.rotate(s), t.drawImage(e.obj.canvas.get(0), o, 0, u, e.canvas.height, c, l, d, m)
        } catch (k) {
            this.brush.logger.talkback("[muro] Error in drawImage: ", [k, e.obj.width, e.obj.height, n])
        } finally {
            t.restore()
        }
        return this.ptr += n, this.ptr >= this.measurement && (this.ptr = 0), i - n
    },
    recordText: function() {
        if (!this.recordMarker) {
            var t = mgr.bean.getRDWriter();
            t.isStub || (t.currentInstruction && t.currentInstruction[RDINDEX.META_INDEX][11].push({
                chunkIndex: this.brush.chunkIndex,
                text: this.text
            }), this.recordMarker = !0)
        }
    },
    clearRecordMarker: function() {
        this.recordMarker = !1
    }
}), window.DWait && DWait.run("jms/pages/drawplz/brushes/textChunk.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/filters.js"], function() {
    window.FilterManager = Base.extend({
        constructor: function() {
            this.logger = new StdLogger("Filter"), this.bean = getManager().bean, this.filter = "BlurFilter", this.processingFilter = !1
        },
        changeFilter: function(e) {
            e = e || window.event, this.filter = e.target.value
        },
        applyFilter: function(e) {
            if (!this.processingFilter) {
                this.processingFilter = !0;
                var t, a = "";
                switch (this.filter) {
                    case "NoiseFilter":
                        a || (a = "0.1");
                    case "DecreaseContrastFilter":
                    case "IncreaseContrastFilter":
                    case "LightenFilter":
                    case "DarkenFilter":
                        a || (a = "0.05");
                    default:
                        t = new window[this.filter](a)
                }
                var n, i = t.isSlow ? "s" : "f";
                n = t.isSlow ? mgr.bean.getRDWriter().startInstruction(RDInst.FLUSH, ["Applying Filter", "Applying " + t.name]) : mgr.bean.getRDWriter().startInstruction(RDInst.FILTER, [this.filter, i]);
                try {
                    var r, s = this.bean.getSelectedLayer(),
                        g = s.getContext(),
                        o = g.getPixelData();
                    if (t.isSlow) {
                        mgr.openProgressModal("Applying Filter", t.name, [], function() {
                            this.processingFilter = !1
                        }.bindTo(this));
                        var l = {
                            onComplete: bind(this, function(a) {
                                a && (t.applyResultTo(o), this.pastePixels(o), console.log("Popping Modal"), Modals.pop()), this.processingFilter = !1, this.bean.getSelectedLayer().setChangeStamp(), getManager().undoManager.push(), n.pushInstruction(), e && e(a)
                            }),
                            onStep: function(e) {
                                t.deviatePixel(o, e)
                            },
                            onChunk: function() {},
                            totalSteps: o.data.length >> 2,
                            interval: Browser.isTouch ? 50 : 1
                        };
                        t.suggestedChunkSize && (l.chunkSize = t.suggestedChunkSize), r = new DTask(l), r.start()
                    } else t.deviatePixels(o), this.pastePixels(o), this.bean.getSelectedLayer().setChangeStamp(), getManager().undoManager.push(), n.pushInstruction(), this.processingFilter = !1
                } catch (c) {
                    this.logger.log("ERROR IN FILTER!!!!", c), this.processingFilter = !1
                }
            }
        },
        random: function() {
            var e = mgr.bean.getRDWriter();
            if (e.isStub) {
                var t = mgr.bean.getRDReader();
                return t ? t.getRandom() : Math.random()
            }
            return e.getRandom()
        },
        pastePixels: function(e) {
            if (window.SelectionManager && getManager().selectionManager.hasSelection) {
                var t = getManager().bean.getBufferCtx();
                t.clear(), t.setPixelData(e), t.globalCompositeOperation = "destination-out", t.drawImage(getManager().selectionManager.selCanvas.canvas.get(0), 0, 0), t.globalCompositeOperation = "source-over", getManager().selectionManager.clear(), getManager().bean.getSelectedLayer().getContext().drawImage(t.canvas, 0, 0), t.clear()
            } else getManager().bean.getSelectedLayer().getContext().setPixelData(e)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/filterManager.js")
});
window.retryData = {
    intervalsBeforeRetry: 20,
    minIntervals: 30,
    maxIntervals: 120
}, window.RetryPoster = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Retry Poster"), this.setOptions({}), this.callback = null
    },
    defaultOptions: {
        timeoutInterval: 1e3,
        startFunction: function() {},
        endFunction: function() {},
        errorFunction: function(t) {
            stdLog("ERROR IN NETWORK CALL: " + t)
        },
        oneAtaTime: !0,
        busyKey: null,
        numRetriesInArg: !1,
        retryErrors: null
    },
    setOptions: function(t) {
        this.options = t;
        for (var i in this.defaultOptions) void 0 === this.options[i] && (this.options[i] = this.defaultOptions[i]);
        return this.options
    },
    post: function(t, i, s, e, r) {
        this.callback = s, this.callbackThisArg = e, this.postOptions = r || {};
        var n = this.options.busyKey || "retry_poster:" + t;
        if (this.options.oneAtaTime && !mgr.bean.getIsForcedSync()) {
            if (mgr.isBusy(n)) return this.logger.log("Delaying call to " + t + " because call already in progress"), setTimeout(function() {
                this.post(t, i, s, e, r)
            }.bindTo(this), this.options.timeoutInterval), void 0;
            mgr.setBusy(n, !0)
        }
        this._start(function(s) {
            this.options.numRetriesInArg && (i.num_retries = this.numRetries), $.post(t, i, function() {
                var i;
                if (this.options.retryErrors) {
                    try {
                        i = JSON.parse(arguments[0])
                    } catch (e) {
                        this.logger.talkback("Bad JSON in return from " + t, arguments[0]), i = {
                            response: {
                                status: -1,
                                content: {
                                    error: "DiFi returned non JSON"
                                }
                            }
                        }
                    }
                    if (1 != i.response.status) return this.options.retryErrors(this.numRetries, i) ? (this.logger.log("DiFi Fail: ", i.response.content.error), this._clearTimer(), this.numIntervals = 0, this.timerFunc(s)) : (this._clearTimer(), this.dedupeNum = null, this.options.endFunction(), mgr.setBusy(n, !1)), void 0
                }
                try {
                    for (var r = [s], o = 0; arguments.length > o; o++) r.push(arguments[o]);
                    this._finish.apply(this, r)
                } finally {
                    mgr.setBusy(n, !1)
                }
            }.bindTo(this)).error(function(t, i, s) {
                this._clearTimer(), this.dedupeNum = null, this.options.endFunction(), this.options.errorFunction("Retry Poster post Error: ", [t, i, s]), mgr.setBusy(n, !1)
            }.bindTo(this)), this.numRetries++
        }.bindTo(this))
    },
    _start: function(t) {
        this.timerFunc = t, this._clearTimer(), this.numRetries = 0, this.numIntervals = 0, this.options.startFunction(), this.timerRef = setTimeout(this._intervalTimeout.bindTo(this), this.options.timeoutInterval), this.timerFunc(this.dedupeNum = Math.random())
    },
    _intervalTimeout: function() {
        this._clearTimer(), this.numIntervals++ > retryData.intervalsBeforeRetry && (retryData.intervalsBeforeRetry = Math.min(retryData.maxIntervals, 2 * retryData.intervalsBeforeRetry), this.numIntervals = 0, this.postOptions.retryFunction ? this.postOptions.retryFunction(function() {
            this.timerFunc(this.dedupeNum = Math.random())
        }.bindTo(this), function() {
            this._finish(this.dedupeNum)
        }.bindTo(this), this.numRetries) : this.timerFunc(this.dedupeNum = Math.random())), this.timerRef = setTimeout(this._intervalTimeout.bindTo(this), this.options.timeoutInterval)
    },
    _clearTimer: function() {
        this.timerRef && (window.clearTimeout(this.timerRef), this.timerRef = null)
    },
    _finish: function() {
        var t = arguments[0];
        if (t == this.dedupeNum) {
            for (var i = [], s = 1; arguments.length > s; s++) i.push(arguments[s]);
            this._clearTimer(), this.dedupeNum = null, this.callback.apply(this.callbackThisArg, i), this.options.endFunction()
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/retryPoster.js");
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/dragger.js", "jms/pages/drawplz/slider.js"], function() {
    window.ImageImporter = Base.extend({
        constructor: function() {
            this.A = .3857, this.B = 2.4079, this.C = .2857, this.E = 2.71828, this.logger = new StdLogger("Image Importer"), this.bean = mgr.bean, this.loaded = !1, this.active = !1, mgr.$mainNode.find(".sidebarCancel").click(function() {
                return mgr.$mainNode.find(".toolsTab").click(), mgr.layoutManager.unBlur(), !1
            }.bindTo(this)), mgr.$mainNode.find(".sidebarButton").click(this.sidebarImport.bindTo(this))
        },
        filterFunc: function() {
            setTimeout(function() {
                mgr.$mainNode.find(".stashSidebarTab a.thumb").each(function() {
                    $(this).data("super-img") || ($(this).addClass("nonImportable"), $(this).parent(".shadow").css("background-image", "none"))
                })
            }.bindTo(this), 10)
        },
        sidebarImport: function() {
            return mgr.$mainNode.find(".importTab").click(), !1
        },
        destructor: function() {
            void 0 !== Glbl("Stash.mode") && PubSub.publish("StashEmbedded.stop"), this.unsubscribe()
        },
        subscribe: function() {
            PubSub.subscribe([{
                eventname: "Stash.item_open",
                subscriber: this,
                callback: this.importFromStash
            }, {
                eventname: "Stash.folder_open",
                subscriber: this,
                callback: this.folderStash
            }, {
                eventname: "Stash.root_open",
                subscriber: this,
                callback: this.rootStash
            }, {
                eventname: "StashEmbedded.folder_loaded",
                subscriber: this,
                callback: this.folderStashLoaded
            }, {
                eventname: "StashEmbedded.root_loaded",
                subscriber: this,
                callback: this.rootStashLoaded
            }])
        },
        unsubscribe: function() {
            PubSub.unsubscribe([{
                eventname: "Stash.item_open",
                subscriber: this
            }, {
                eventname: "Stash.folder_open",
                subscriber: this
            }, {
                eventname: "Stash.root_open",
                subscriber: this
            }, {
                eventname: "StashEmbedded.folder_loaded",
                subscriber: this
            }, {
                eventname: "StashEmbedded.root_loaded",
                subscriber: this
            }]), $(".stashImport").undelegate(".backToStash", "click")
        },
        importFromStash: function(t, i) {
            try {
                var s = GMI.query("StashThumb", {
                    match: i
                })[0];
                if (s.non_importable) return;
                var e = s.$.find("a.thumb").data("super-img"),
                    h = s.gmi_args.flat_title;
                Modals.pop("OK"), mgr.imageImporter.enterModalMode({
                    thumbUrl: e,
                    name: h
                })
            } catch (a) {
                stdLog("Click Error: ", a)
            }
        },
        importImage: function() {
            this.active = !0, this.loadStash()
        },
        importImageNoUI: function(t, i, s, e, h, a, o, r) {
            this.$img = $('<img class="iiImg" src=""/>').load(function() {
                var n = this._import(t, i, s, e, h, a, o);
                n.setChangeStamp(), mgr.undoManager.push(), r()
            }.bindTo(this)), this.$img.attr("src", t)
        },
        _import: function(t, i, s, e, h, a, o) {
            var r = mgr.bean.getRDWriter().startInstruction(RDInst.FLUSH, ["Importing Image", "Importing " + o]),
                n = new Image;
            $(n).attr("src", t);
            var d = mgr.layerManager.create(o).select(),
                g = d.getContext();
            g.save();
            try {
                g.translate(i + e / 2, s + h / 2), g.rotate(2 * Math.PI * a / 360), g.drawImage(n, 0, 0, n.width, n.height, - .5 * e, - .5 * h, e, h)
            } finally {
                g.restore()
            }
            return d.setChangeStamp(), mgr.bean.setHandDrawn(!1), mgr.undoManager.push(), this.done(), r.pushInstruction(), n = null, d
        },
        loadStash: function() {
            mgr.modalManager.pushModal("stash_import", [], function() {
                this.destructor()
            }.bindTo(this), function(t) {
                $(".stash-upload-box").hide(), this.subscribe(), $(".stashImport:visible").delegate(".backToStash", "click", function() {
                    return PubSub.publish("Stash.root_open"), !1
                }), this.$modalNode = $(t), this.$modalNode.find(".mainPart").hide(), DWait.ready(["jms/pages/stash/stash.js"], function() {
                    Glbl("Stash.mode", "plain"), Glbl("Stash.filter", ""), Glbl("Stash.browselimit", 48), PubSub.publish("StashEmbedded.start"), $(".stash-upload-box").show(), PubSub.publish("StashUploader.form_switch"), PubSub.publish("Stash.root_open")
                })
            }.bindTo(this), !0)
        },
        rootStash: function() {
            var t = this.$modalNode.find(".mainPart");
            this.$modalNode.find(".backToStash").hide(), t.empty().hide().height(290).css("margin-top", "10px")
        },
        folderStash: function() {
            var t = this.$modalNode.find(".mainPart");
            t.empty().hide().height(255).css("margin-top", "30px")
        },
        rootStashLoaded: function(t, i) {
            var s = this.$modalNode.find(".mainPart");
            s.show(), mgr.imageImporter.loadStashContents(s, i)
        },
        folderStashLoaded: function(t, i) {
            var s = this.$modalNode.find(".mainPart");
            this.$modalNode.find(".backToStash").show(), s.show(), mgr.imageImporter.loadStashContents(s, i)
        },
        loadStashContents: function(t, i) {
            t.empty();
            var s = $(i);
            s.appendTo(t), Browser.isIE9 && t.find(".stash-stream").wrap('<div style="overflow: hidden" />');
            var e = GMI.query(t[0], "StashThumb", {
                match: {
                    type: "flat"
                }
            });
            $.each(e, function(t, i) {
                i.$.find("a.thumb").data("super-img") || (i.non_importable = !0, i.$.find(".stash-tt-a").addClass("nonImportable"))
            })
        },
        fileDone: function(t) {
            return t ? (this.logger.log("Item:", t), this.enterModalMode(t), void 0) : (alert("Please select a file"), this.importImage(), void 0)
        },
        convertURL: function(t) {
            t = t || "";
            var i;
            return i = t.replace(/http:\/\/.*.deviantart.[a-z,A-Z]+/, "http://" + window.location.hostname + "/_fc_"), t.match(/th[0-9]+.deviantart.[a-z]+/) && (i = i.replace(/\/150\//, "/")), i
        },
        enterModalMode: function(t) {
            var i = $.Deferred(),
                s = this.convertURL(t.thumbUrl);
            return DiFi.pushPost("DrawPlzModals", "image_import", [], function(e, h) {
                if (!e) return talkback("Drawplz - Error getting modal: ", h), void 0;
                h.response.content.pageData && $.extend(window.deviantART.pageData, h.response.content.pageData), this.$stoptouch = $(h.response.content.topContent).insertBefore(mgr.$mainNode.find(".drawPlzApp")), this.$img = $('<img class="iiImg" src=""/>').appendTo(this.$stoptouch.find(".iiWindowMain")).load(this.imgLoad.bindTo(this)), this.$img.attr("src", s);
                var a = this.$stoptouch.find("div.iiLockButton");
                this.isConstrained = a.is(".iiLocked"), a.mousedown(this.lockClick.bindTo(this)), this.bindFineTune();
                var o = t.name ? t.name.replace(/\..*/, "") : "";
                this.$stoptouch.find(".iiNameInput").val(mgr.layerManager.getUniqueName(o)), this.sizeModal(), mgr.layoutManager.blurTop(), mgr.layoutManager.blurBottom(), this.$stoptouch.find(".iiScaleSelect").change(this.selectChange.bindTo(this)), this.$stoptouch.find("a.iiOK").click(function() {
                    var t = this.bean.getScale(),
                        i = mgr.zoomManager.$drawPlzCanvas.scrollLeft(),
                        e = mgr.zoomManager.$drawPlzCanvas.scrollTop();
                    this._import(s, (this.imgLeft + i) / t, (this.imgTop + e) / t, this.imgWidth, this.imgHeight, this.imgRotate, this.$stoptouch.find(".iiNameInput").val())
                }.bindTo(this)), this.$stoptouch.find("a.iiCancel").click(function() {
                    this.done()
                }.bindTo(this)), i.resolve(), mgr.layoutManager.resizeTabStoptouch(), mgr.$mainNode.find(".stoptouchGreyer").show()
            }.bindTo(this)), DiFi.send(), i
        },
        bindFineTune: function() {
            mgr.sliderManager.fineTuneBinder(this.$stoptouch.find(".iiWidthInput"), this.$stoptouch.find(".widthSlider .value"), function() {
                return this.imgWidth
            }.bindTo(this), this.setWidth.bindTo(this), 1), mgr.sliderManager.fineTuneBinder(this.$stoptouch.find(".iiHeightInput"), this.$stoptouch.find(".heightSlider .value"), function() {
                return this.imgHeight
            }.bindTo(this), this.setHeight.bindTo(this), 1), mgr.sliderManager.fineTuneBinder(this.$stoptouch.find(".iiRotateInput"), this.$stoptouch.find(".rotateSlider .value"), function() {
                return this.imgRotate
            }.bindTo(this), this.setRotate.bindTo(this), .1)
        },
        setWidth: function(t) {
            if (t = parseInt(t, 10), !t || isNaN(t) ? t = this.imgWidth : 0 > t && (t *= -1), this.imgWidth = Math.round(Math.max(.1 * this.imgBaseWidth, Math.min(4 * this.imgBaseWidth, t))), this.isConstrained) {
                var i = Math.log((this.imgWidth / this.imgBaseWidth + this.C) / this.A) / this.B;
                this.imgHeight = Math.ceil(Math.max(.1 * this.imgBaseHeight, this.imgBaseHeight * (this.A * Math.pow(this.E, this.B * i) - this.C)))
            }
            this.applySize()
        },
        setHeight: function(t) {
            if (t = parseInt(t, 10), !t || isNaN(t) ? t = this.imgHeight : 0 > t && (t *= -1), this.imgHeight = Math.round(Math.max(.1 * this.imgBaseHeight, Math.min(4 * this.imgBaseHeight, t))), this.isConstrained) {
                var i = Math.log((this.imgHeight / this.imgBaseHeight + this.C) / this.A) / this.B;
                this.imgWidth = Math.ceil(Math.max(.1 * this.imgBaseWidth, this.imgBaseWidth * (this.A * Math.pow(this.E, this.B * i) - this.C)))
            }
            this.applySize()
        },
        setRotate: function(t) {
            t = parseFloat(t), (void 0 === t || isNaN(t)) && (t = this.imgRotate), this.imgRotate = Math.round(10 * Math.max(-180, Math.min(180, t))) / 10, this.applySize()
        },
        imgLoad: function() {
            this.bindDraggers(), this.loaded = !0, this.imgWidth = this.imgBaseWidth = this.$img.get(0).width, this.imgHeight = this.imgBaseHeight = this.$img.get(0).height, this.imgRotate = 0, this.applySize(), this.disableSelects()
        },
        selectChange: function() {
            var t, i;
            switch (this.$stoptouch.find("option:selected").val()) {
                case "original":
                    this.imgWidth = this.imgBaseWidth, this.imgHeight = this.imgBaseHeight;
                    break;
                case "scale":
                    t = mgr.width / mgr.height, i = this.imgBaseWidth / this.imgBaseHeight, t > i ? (this.imgHeight = mgr.height, this.imgWidth = Math.round(this.imgBaseWidth * mgr.height / this.imgBaseHeight), this.imgLeft = Math.round((mgr.width - this.imgWidth) / 2), this.imgTop = 0) : (this.imgWidth = mgr.width, this.imgHeight = Math.round(this.imgBaseHeight * mgr.width / this.imgBaseWidth), this.imgLeft = 0, this.imgTop = Math.round((mgr.height - this.imgHeight) / 2));
                    break;
                case "stretch":
                    this.imgHeight = mgr.height, this.imgWidth = mgr.width, this.imgLeft = 0, this.imgTop = 0;
                    break;
                case "crop":
                    t = mgr.width / mgr.height, i = this.imgBaseWidth / this.imgBaseHeight, i > t ? (this.imgHeight = mgr.height, this.imgWidth = Math.round(this.imgBaseWidth * mgr.height / this.imgBaseHeight), this.imgLeft = Math.round((mgr.width - this.imgWidth) / 2), this.imgTop = 0) : (this.imgWidth = mgr.width, this.imgHeight = Math.round(this.imgBaseHeight * mgr.width / this.imgBaseWidth), this.imgTop = Math.round((mgr.height - this.imgHeight) / 2), this.imgLeft = 0)
            }
            mgr.imageImporter.applySize(), this.$img.css("left", this.imgLeft + "px").css("top", this.imgTop + "px")
        },
        lockClick: function() {
            var t = this.$stoptouch.find("div.iiLockButton");
            if (t.is(".iiLocked")) this.isConstrained = !1, t.removeClass("iiLocked"), t.addClass("iiUnLocked");
            else {
                this.isConstrained = !0, t.removeClass("iiUnLocked"), t.addClass("iiLocked");
                var i = this.imgWidth / (2 * this.imgBaseWidth);
                this.imgHeight = Math.ceil(Math.max(.1 * this.imgBaseHeight, 2 * this.imgBaseHeight * i)), this.applySize(), this.switchCustom()
            }
        },
        sizeModal: function() {
            var t = mgr.$mainNode.find(".drawPlzCanvas"),
                i = t.offset();
            this.$stoptouch.find(".iiWindow").width(t.width()).height(t.height()).css("top", i.top + "px").css("left", i.left + "px")
        },
        switchCustom: function() {
            this.$stoptouch.find(".iiScaleSelect").val("custom")
        },
        startDragImg: function(t) {
            this.startCoords = [t[0] - this.imgLeft, t[1] - this.imgTop]
        },
        dragImg: function(t) {
            this.imgLeft = t[0] - this.startCoords[0], this.imgTop = t[1] - this.startCoords[1], this.$img.css("left", this.imgLeft + "px").css("top", this.imgTop + "px")
        },
        endDragImg: function(t) {
            this.imgLeft = t[0] - this.startCoords[0], this.imgTop = t[1] - this.startCoords[1]
        },
        disableSelects: function() {
            var t, i, s = this.$stoptouch.find(".iiScaleSelect");
            t = mgr.width / mgr.height, i = this.imgBaseWidth / this.imgBaseHeight, t > i ? (mgr.height > 4 * this.imgBaseHeight && (s.find('option[value="scale"]').attr("disabled", !0), s.find('option[value="stretch"]').attr("disabled", !0)), mgr.width > 4 * this.imgBaseWidth && (s.find('option[value="stretch"]').attr("disabled", !0), s.find('option[value="crop"]').attr("disabled", !0))) : (mgr.width > 4 * this.imgBaseWidth && (s.find('option[value="scale"]').attr("disabled", !0), s.find('option[value="stretch"]').attr("disabled", !0)), mgr.height > 4 * this.imgBaseHeight && (s.find('option[value="stretch"]').attr("disabled", !0), s.find('option[value="crop"]').attr("disabled", !0)))
        },
        dragSlider: function(t) {
            var i = Math.max(0, Math.min(1, t[0] / this.trackWidth));
            switch (this.sliderType) {
                case "width":
                    this.switchCustom(), this.setWidth(Math.ceil(Math.max(.1 * this.imgBaseWidth, this.imgBaseWidth * (this.A * Math.pow(this.E, this.B * i) - this.C))));
                    break;
                case "height":
                    this.switchCustom(), this.setHeight(Math.ceil(Math.max(.1 * this.imgBaseHeight, this.imgBaseHeight * (this.A * Math.pow(this.E, this.B * i) - this.C))));
                    break;
                case "rotate":
                    this.setRotate(360 * (i - .5))
            }
        },
        applySize: function() {
            if (this.loaded) {
                var t = this.bean.getScale();
                this.$img.width(Math.round(this.imgWidth * t)).height(Math.round(this.imgHeight * t)).css("transform", "rotate(" + this.imgRotate + "deg)").css("-moz-transform", "rotate(" + this.imgRotate + "deg)").css("-webkit-transform", "rotate(" + this.imgRotate + "deg)").css("-o-transform", "rotate(" + this.imgRotate + "deg)"), this.$img.get(0).style.msTransform = "rotate(" + this.imgRotate + "deg)";
                var i = Math.log((this.imgWidth / this.imgBaseWidth + this.C) / this.A) / this.B;
                mgr.sliderManager.setVal(this.$stoptouch.find(".widthSlider"), i, this.imgWidth, "px"), i = Math.log((this.imgHeight / this.imgBaseHeight + this.C) / this.A) / this.B, mgr.sliderManager.setVal(this.$stoptouch.find(".heightSlider"), i, this.imgHeight, "px"), i = this.imgRotate / 360 + .5, mgr.sliderManager.setVal(this.$stoptouch.find(".rotateSlider"), i, this.imgRotate, "&deg;")
            }
        },
        bindDraggers: function() {
            this.imgLeft = this.imgTop = 0, this.imgDragger = new Dragger([this.$img.get(0)], this.$stoptouch.find(".iiWindowMain").get(0), this.startDragImg.bindTo(this), this.dragImg.bindTo(this), this.endDragImg.bindTo(this)), this.trackWidth = this.$stoptouch.find("div.widthSlider div.track").width(), this.widthDragger = new Dragger([this.$stoptouch.find("div.widthSlider div.knob").get(0), this.$stoptouch.find("div.widthSlider div.track").get(0)], this.$stoptouch.find("div.widthSlider div.track").get(0), function() {
                this.sliderType = "width"
            }.bindTo(this), this.dragSlider.bindTo(this), function() {}), this.heightDragger = new Dragger([this.$stoptouch.find("div.heightSlider div.knob").get(0), this.$stoptouch.find("div.heightSlider div.track").get(0)], this.$stoptouch.find("div.heightSlider div.track").get(0), function() {
                this.sliderType = "height"
            }.bindTo(this), this.dragSlider.bindTo(this), function() {}), this.rotateDragger = new Dragger([this.$stoptouch.find("div.rotateSlider div.knob").get(0), this.$stoptouch.find("div.rotateSlider div.track").get(0)], this.$stoptouch.find("div.rotateSlider div.track").get(0), function() {
                this.sliderType = "rotate"
            }.bindTo(this), this.dragSlider.bindTo(this), function() {})
        },
        done: function() {
            try {
                this.$stoptouch.remove()
            } catch (t) {}
            mgr.$mainNode.find("div.brushSliders").show(), this.$stoptouch = null, this.$img = null, this.imgLeft = this.imgTop = this.imgWidth = this.imgHeight = 0, this.trackWidth = 0, this.widthDragger = this.heightDragger = null, this.loaded = !1, this.active = !1, mgr.$mainNode.find(".stoptouchGreyer").hide(), mgr.layoutManager.unBlur()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/imageImporter.js")
});
window.ModalManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("modalManager")
    },
    pushModal: function(t, n, e, o, a) {
        var i = $.Deferred(),
            s = function(t, n) {
                if (!t) return this.logger.log("MODAL CALL FAILED: ", n), e("cancel"), void 0;
                n.response.content.pageData && $.extend(window.deviantART.pageData, n.response.content.pageData);
                var a = n.response.content.htmlContent,
                    s = document.createElement("div");
                $(s).html(a), mgr.layoutManager.blurAll(), Modals.push(s, function() {
                    mgr.layoutManager.modalUnblur(), e.apply(this, arguments)
                }, ModalManager.MODAL_CLASS);
                try {
                    o(s), i.resolve()
                } catch (l) {
                    i.reject(["Drawplz - Error opening modal: ", l]), this.logger.talkback("Drawplz - Error opening modal: ", l)
                }
            }.bindTo(this);
        return a ? DiFi.pushPost("DrawPlzModals", t, n, s) : DiFi.pushPublicGet("DrawPlzModals", t, n, s), DiFi.send(), i
    },
    confirmModal: function(t, n, e) {
        this.pushModal("confirm", [], function(t) {
            e("ok" == t)
        }.bindTo(this), function(e) {
            $modal = $(e), $modal.find(".daTitle").html(t), $modal.find(".talkmessage .message").html(n)
        }.bindTo(this))
    },
    fontPicker: function(t, n) {
        return mgr.modalManager.pushModal("font_chooser", [], function(t) {
            if ("cancel" != t) {
                var e = t.font;
                mgr.fontManager.addRecentFont(e), safeLocalSet("drawplz_lastFont", e), n(e)
            }
        }.bindTo(this), function(n) {
            this.$modal = $(n);
            var e = this.$modal.find(".fontList"),
                o = mgr.fontManager.getRecentFonts();
            if (o.length > 0) {
                for (var a = '<li class="fontHeading">RECENTLY USED FONTS</li>', i = 0; o.length > i; i++) a += '<li class="fontItem fontItemRecent">' + o[i] + "</li>";
                e.prepend(a)
            }
            this.$modal.find(".fontItem").on("mousedown", function() {
                var t = $(this).html();
                $(".selectedFontItem").removeClass("selectedFontItem"), $(this).addClass("selectedFontItem"), mgr.fontManager.loadFont(t, function() {
                    var e = $(n).find(".sampleText"),
                        o = 18;
                    e.css("font-size", o + "px"), e.css("font-family", t)
                }.bindTo(this))
            }), $(".selectedFontItem").removeClass("selectedFontItem"), this.$modal.find(".fontItemRecent").each(function() {
                $(this).html() == t && $(this).addClass("selectedFontItem")
            }), mgr.fontManager.loadFont(t, function() {
                $(n).find(".sampleText").css("font-family", t)
            }.bindTo(this))
        }.bindTo(this))
    }
}, {
    MODAL_CLASS: "muro-modal"
}), window.DWait && DWait.run("jms/pages/drawplz/modalManager.js");
PixelDeviator = Base.extend({
    constructor: function() {},
    _init: function(t, i, e, r) {
        if (this.name = t || "Pixel Deviator", this.kernel = i, this.radius = Math.sqrt(this.kernel.length), this.isSlow = !1, this.preserveAlpha = !1, this.factor = r || 0, isNaN(r)) for (var s = i.length; s--;) this.factor += i[s];
        this.offset = isNaN(e) ? 0 : e, this.pixelData = null
    },
    getName: function() {
        return this.name
    },
    deviatePixels: function(t) {
        var i, e, r, s, n, o, a, l, h, c, u, d = t,
            v = d.data,
            f = d.width,
            x = d.height,
            F = this.pixelData = Array(f * x << 2),
            g = this.kernel,
            p = this.radius,
            w = this.factor,
            D = this.offset,
            P = p - 1 >> 1,
            m = f * x - 1;
        do {
            l = m % f, h = 0 | m / f, c = g.length - 1, i = e = r = s = 0;
            do u = g[c], o = l - P + c % p, a = 0 | h - P + c / p, o = 0 > o ? 0 : o > f - 1 ? f - 1 : o, a = 0 > a ? 0 : a > x - 1 ? x - 1 : a, n = a * f + o << 2, i += v[n + 0] * u, e += v[n + 1] * u, r += v[n + 2] * u, s += v[n + 3] * u;
            while (c--);
            i = 0 | i / w + D + .5, e = 0 | e / w + D + .5, r = 0 | r / w + D + .5, s = 0 | s / w + D + .5, i = i > 255 ? 255 : 0 > i ? 0 : i, e = e > 255 ? 255 : 0 > e ? 0 : e, r = r > 255 ? 255 : 0 > r ? 0 : r, s = s > 255 ? 255 : 0 > s ? 0 : s, n = m << 2, F[n + 0] = i, F[n + 1] = e, F[n + 2] = r, F[n + 3] = this.preserveAlpha ? v[n + 3] : s
        } while (m--);
        this.applyResultTo(t)
    },
    deviatePixel: function(t, i) {
        var e = t,
            r = e.data,
            s = e.width,
            n = e.height;
        0 === i && (this.pixelData = Array(s * n << 2));
        var o, a, l, h, c, u, d, v, f, x, F, g = this.pixelData,
            p = this.kernel,
            w = this.radius,
            D = this.factor,
            P = this.offset,
            m = w - 1 >> 1,
            S = i;
        v = S % s, f = 0 | S / s, x = p.length - 1, o = a = l = h = 0;
        do F = p[x], u = v - m + x % w, d = 0 | f - m + x / w, u = 0 > u ? 0 : u > s - 1 ? s - 1 : u, d = 0 > d ? 0 : d > n - 1 ? n - 1 : d, c = d * s + u << 2, o += r[c + 0] * F, a += r[c + 1] * F, l += r[c + 2] * F, h += r[c + 3] * F;
        while (x--);
        o = 0 | o / D + P + .5, a = 0 | a / D + P + .5, l = 0 | l / D + P + .5, h = 0 | h / D + P + .5, o = o > 255 ? 255 : 0 > o ? 0 : o, a = a > 255 ? 255 : 0 > a ? 0 : a, l = l > 255 ? 255 : 0 > l ? 0 : l, h = h > 255 ? 255 : 0 > h ? 0 : h, c = S << 2, g[c + 0] = o, g[c + 1] = a, g[c + 2] = l, g[c + 3] = this.preserveAlpha ? r[c + 3] : h
    },
    applyResultTo: function(t) {
        for (var i = this.pixelData, e = t.data.length; e--;) t.data[e] = i[e];
        this.pixelData = null
    }
}), window.combsort = function(t, i) {
    for (var e, r, s = i, n = !1; s > 1 || n;) for (s = 0 | 10 * s / 13, 9 == s || 10 == s ? s = 11 : 1 > s && (s = 1), n = !1, e = 0; i - s > e; e++) r = e + s, t[e] > t[r] && (t[e] += t[r], t[r] = t[e] - t[r], t[e] -= t[r], n = !0)
}, HighPassFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [-1, - 1, - 1, - 1, 9, - 1, - 1, - 1, - 1];
        this._init("HighPass Filter", t, 0), this.isSlow = !0
    }
}), SobelFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [-1, - 2, - 1, 0, 0, 0, 1, 2, 1];
        this._init("Sobel Filter", t, 0, .5), this.isSlow = !0, this.preserveAlpha = !0
    }
}), LaplacianFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [0, - 1, 0, - 1, 4, - 1, 0, - 1, 0];
        this._init("Laplacian Filter", t, 127, 1), this.isSlow = !0, this.preserveAlpha = !0
    }
}), SmoothFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 2, 1, 2, 4, 2, 1, 2, 1];
        this._init("Smooth Filter", t, 0), this.isSlow = !0
    }
}), MotionBlurFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1];
        this._init("MotionBlur Filter", t, 0), this.isSlow = !0
    }
}), BlurFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [.5, 2, .5, 2, 0, 2, .5, 2, .5];
        this._init("Blur Filter", t, 0), this.isSlow = !0
    }
}), BlurMoreFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this._init("BlurMore Filter", t, 0), this.isSlow = !0
    }
}), SharpenFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [0, - .5, 0, - .5, 3, - .5, 0, - .5, 0];
        this._init("Sharpen Filter", t, 0, 1), this.isSlow = !0
    }
}), SharpenMoreFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [0, - 1, 0, - 1, .5, - 1, 0, - 1, 0];
        this._init("Sharpen More", t, 0, 1), this.isSlow = !0
    }
}), FindEdgesFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 1, 1, 1, - 7, 1, 1, 1, 1];
        this._init("Find Edges", t, 0, 1), this.isSlow = !0
    }
}), GlowingEdgesFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [-1, - 1, - 1, - 1, 8, - 1, - 1, - 1, - 1];
        this._init("Glowing Edges", t, 0, 1), this.isSlow = !0, this.preserveAlpha = !0
    }
}), DarkSharpenFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [0, 0, 0, - 1, 1.2, 0, 0, 0, 0];
        this._init("Dark Sharpen", t, 0, 1), this.isSlow = !0, this.preserveAlpha = !0
    }
}), EmbossFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [-2, - 1, 0, - 1, 1, 1, 0, 1, 2];
        this._init("Emboss Filter", t, 128, 1), this.isSlow = !0
    }
}), MeanFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 2, 3, 2, 1, 2, 4, 6, 4, 2, 3, 6, 9, 6, 3, 2, 4, 6, 4, 2, 1, 2, 3, 2, 1];
        this._init("Mean Filter", t, 0, 27), this.isSlow = !0
    }
}), DesaturateFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [];
        this._init("Desaturate Filter", t, 0)
    },
    deviatePixels: function(t) {
        for (var i, e, r = t, s = r.data, n = r.width, o = r.height, a = n * o; a--;) e = a << 2, i = 0 | (s[e + 0] + s[e + 1] + s[e + 2]) / 3, s[e + 0] = s[e + 1] = s[e + 2] = i
    },
    applyResultTo: function() {}
}), NoiseFilter = PixelDeviator.extend({
    constructor: function(t) {
        t = t || 0, t = 0 > t ? 0 : t > 1 ? 1 : t;
        var i = [];
        this._init("Noise Filter", i, 0, t)
    },
    deviatePixels: function(t) {
        for (var i, e, r, s, n, o = t, a = o.data, l = o.width, h = o.height, c = this.factor, u = l * h; u--;) i = u << 2, e = 0 | 255 * (Math.random() - .5) * c, r = a[i + 0] + e, s = a[i + 1] + e, n = a[i + 2] + e, a[i + 0] = 0 > r ? 0 : r > 255 ? 255 : r, a[i + 1] = 0 > s ? 0 : s > 255 ? 255 : s, a[i + 2] = 0 > n ? 0 : n > 255 ? 255 : n
    },
    applyResultTo: function() {}
}), InvertColorsFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [];
        this._init("InvertColors Filter", t, 255, 1)
    },
    deviatePixels: function(t) {
        for (var i, e = t, r = e.data, s = e.width, n = e.height, o = s * n; o--;) i = o << 2, r[i + 0] = 255 - r[i + 0], r[i + 1] = 255 - r[i + 1], r[i + 2] = 255 - r[i + 2]
    },
    applyResultTo: function() {}
}), BrightnessFilter = PixelDeviator.extend({
    constructor: function(t) {
        t = t || 0, t = -1 > t ? -1 : t > 1 ? 1 : t;
        var i = [];
        this._init("Brightness Filter", i, 0, 0 | 255 * t)
    },
    deviatePixels: function(t) {
        for (var i, e, r = t, s = r.data, n = r.width, o = r.height, a = this.factor, l = n * o; l--;) e = l << 2, i = s[e + 0] + a, s[e + 0] = 0 > i ? 0 : i > 255 ? 255 : i, i = s[e + 1] + a, s[e + 1] = 0 > i ? 0 : i > 255 ? 255 : i, i = s[e + 2] + a, s[e + 2] = 0 > i ? 0 : i > 255 ? 255 : i
    },
    applyResultTo: function() {}
}), LightenFilter = BrightnessFilter.extend({
    constructor: function(t) {
        this.base(t), this.name = "Lighten Filter"
    }
}), DarkenFilter = BrightnessFilter.extend({
    constructor: function(t) {
        this.base(-t), this.name = "Darken Filter"
    }
}), ContrastFilter = PixelDeviator.extend({
    constructor: function(t) {
        t = t || 0, t = -1 > t ? -1 : t > 1 ? 1 : t, t += 1, t *= t;
        var i = [];
        this._init("Contrast Filter", i, 0, t)
    },
    deviatePixels: function(t) {
        for (var i, e, r = t, s = r.data, n = r.width, o = r.height, a = this.factor, l = n * o; l--;) e = l << 2, i = 0 | 255 * ((s[e + 0] / 255 - .5) * a + .5), s[e + 0] = 0 > i ? 0 : i > 255 ? 255 : i, i = 0 | 255 * ((s[e + 1] / 255 - .5) * a + .5), s[e + 1] = 0 > i ? 0 : i > 255 ? 255 : i, i = 0 | 255 * ((s[e + 2] / 255 - .5) * a + .5), s[e + 2] = 0 > i ? 0 : i > 255 ? 255 : i
    },
    applyResultTo: function() {}
}), IncreaseContrastFilter = ContrastFilter.extend({
    constructor: function(t) {
        this.base(t), this.name = "Increase Contrast"
    }
}), DecreaseContrastFilter = ContrastFilter.extend({
    constructor: function(t) {
        this.base(-t), this.name = "Decrease Contrast"
    }
}), MedianFilter = PixelDeviator.extend({
    constructor: function() {
        var t = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        this._init("Median Filter", t, 0), this.rgbs = null, this.isSlow = !0, this.suggestedChunkSize = 8e3
    },
    deviatePixels: function(t) {
        var i, e, r, s, n, o, a, l = t,
            h = l.data,
            c = l.width,
            u = l.height,
            d = this.kernel,
            v = this.radius,
            f = this.kernel.length,
            x = Array(f),
            F = Array(f),
            g = Array(f),
            p = v - 1 >> 1,
            w = v * v,
            D = w >> 1,
            P = c * u - 1;
        do {
            a = 0, s = P % c, n = 0 | P / c, o = d.length - 1, sumr = sumg = sumb = suma = 0;
            do e = s - p + o % v, r = 0 | n - p + o / v, e = 0 > e ? 0 : e > c - 1 ? c - 1 : e, r = 0 > r ? 0 : r > u - 1 ? u - 1 : r, i = r * c + e << 2, x[a] = h[i + 0], F[a] = h[i + 1], g[a] = h[i + 2], a++;
            while (o--);
            combsort(x, w), combsort(F, w), combsort(g, w), i = P << 2, 1 == w % 2 ? (h[i + 0] = x[D], h[i + 1] = F[D], h[i + 2] = g[D]) : v >= 2 && (h[i + 0] = x[D] + x[D + 1] >> 1, h[i + 1] = F[D] + F[D + 1] >> 1, h[i + 2] = g[D] + g[D + 1] >> 1)
        } while (P--)
    },
    deviatePixel: function(t, i) {
        var e = t,
            r = e.data,
            s = e.width,
            n = e.height,
            o = this.kernel,
            a = this.radius,
            l = this.kernel.length;
        this.rgbs || (this.rgbs = {
            reds: Array(l),
            greens: Array(l),
            blues: Array(l)
        });
        var h, c, u, d, v, f, x, F = this.rgbs.reds,
            g = this.rgbs.greens,
            p = this.rgbs.blues,
            w = a - 1 >> 1,
            D = a * a,
            P = D >> 1,
            m = i;
        x = 0, d = m % s, v = 0 | m / s, f = o.length - 1, sumr = sumg = sumb = suma = 0;
        do c = d - w + f % a, u = 0 | v - w + f / a, c = 0 > c ? 0 : c > s - 1 ? s - 1 : c, u = 0 > u ? 0 : u > n - 1 ? n - 1 : u, h = u * s + c << 2, F[x] = r[h + 0], g[x] = r[h + 1], p[x] = r[h + 2], x++;
        while (f--);
        combsort(F, D), combsort(g, D), combsort(p, D), h = m << 2, 1 == D % 2 ? (r[h + 0] = F[P], r[h + 1] = g[P], r[h + 2] = p[P]) : a >= 2 && (r[h + 0] = F[P] + F[P + 1] >> 1, r[h + 1] = g[P] + g[P + 1] >> 1, r[h + 2] = p[P] + p[P + 1] >> 1)
    },
    applyResultTo: function() {
        this.rgbs = null
    }
}), window.DWait && DWait.run("jms/pages/drawplz/filters.js");
window.FileManager = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("File Manager"), $.ajaxSetup({
            type: "POST",
            headers: {
                "cache-control": "no-cache"
            }
        }), this.BASE_URL = mgr.on_stash ? "http://sta.sh/muro/" : "http://muro.deviantart.com/", this.RECORD_START_URL = this.BASE_URL + "record/start", this.RECORD_STOP_URL = this.BASE_URL + "record/complete", this.RECORD_RESUME_URL = this.BASE_URL + "record/resume", this.RECORD_DUPLICATE_URL = this.BASE_URL + "record/duplicate", this.KEY_RECORDING_DEVIATIONID = "r", this.MIN_WIDTH = 1, this.MIN_HEIGHT = 1, this.MAX_WIDTH = 2e3, this.MAX_HEIGHT = 2e3;
        var e = [{
            alias: "da-muro-recordings",
            header: "Recorded Drawings",
            emptyMessage: "You do not have any saved drawings."
        }];
        this.DRAWINGS_STACKS_ALIASES = $.map(e, function(e) {
            return e.alias
        }), this.loadedRecording = null, this.ranSignupHack = !1;
        for (var t = {}, r = 0; e.length > r; r++) t[e[r].alias] = {
            header: e[r].header,
            emptyMessage: e[r].emptyMessage
        };
        this.DRAWINGS_STACKS_DISPLAY_CONFIG = t, this.bindBean(), vms_feature("qunit") ? window.HashURI = {
            store: {},
            setKey: function(e, t) {
                this.store[e] = t
            },
            getKey: function(e) {
                return this.store[e]
            },
            removeKey: function(e) {
                this.store[e] = null
            },
            get: function() {},
            set: function() {}
        } : mgr.iframe || this.backForward()
    },
    reset: function() {
        mgr.bean.setDraftTitle(void 0), mgr.bean.setRecordingDeviationId("")
    },
    bindBean: function() {
        mgr.bean.subscribe(["recordingDeviationId"], function() {
            var e = mgr.bean.getRecordingDeviationId();
            e != this.loadedRecording && (this.loadedRecording = null), e ? (mgr.layoutManager.isStandalone() && HashURI.setKey(this.KEY_RECORDING_DEVIATIONID, e), PubSub.publish("redraw.gotDeviationId"), $("#overhead .ile-shorturl input").val("http://sta.sh/0" + e), $("#overhead .ile-shorturl").css("visibility", "visible")) : (HashURI.setKey(this.KEY_RECORDING_DEVIATIONID, ""), $("#overhead .ile-shorturl").css("visibility", "hidden"))
        }.bindTo(this)), mgr.bean.subscribe("isRecording", function() {
            var e = mgr.bean.getIsRecording();
            if (!e || mgr.isPlayback || "comment" == mgr.type || vms_feature("qunit") && !mgr.bean.getOverrideQunitSkip() || vms_feature("no_saving")) {
                if (!window.deviantART.deviant.loggedIn || !mgr.hasDrawn()) return this._recordStopCallback(null), void 0;
                mgr.bean.getRDWriter().endFlush = !0, mgr.bean.getRDWriter().flush(function() {
                    this.stopSucceeded = !1, this.postStop(), mgr.bean.getRDWriter().endFlush = !1
                }.bindTo(this))
            } else this.startRecording()
        }.bindTo(this))
    },
    backForward: function() {
        BackForward.boot(), this.backforward_listen = BackForward.addListener(function() {
            if (mgr.layoutManager.isStandalone()) try {
                var e = HashURI.getKey(this.KEY_RECORDING_DEVIATIONID);
                e && e != mgr.bean.getRecordingDeviationId() && (mgr.bean.getIsRecording() ? mgr.recordedDrawingManager.stopRecording(!0, function() {
                    mgr.bean.setRecordingDeviationId(e), this.resumeRecording(e, !0)
                }.bindTo(this)) : (mgr.bean.setRecordingDeviationId(e), this.resumeRecording(e, !0)))
            } catch (t) {
                this.logger.log("Error in back forward: ", t)
            }
        }.bindTo(this))
    },
    startRecording: function() {
        if (!mgr.bean.getIsRecording()) {
            mgr.bean.turnEventsOff();
            try {
                mgr.bean.setIsRecording(!0)
            } finally {
                mgr.bean.turnEventsOn()
            }
        }
        var e = mgr.bean.getRDWriter();
        (!e || e.isStub) && (e = new RedrawWriter, mgr.bean.setRDWriter(e)), mgr.bean.setKeyframeNumber(0), mgr.bean.getRecordingDeviationId() || e.flush()
    },
    postStartToServer: function() {
        this.inRecordStart = !0, DiFi.pushPost("DrawPlz", "login_noop", [], function(e) {
            e ? $.post(this.RECORD_START_URL, this._recordStartArgs(), this._recordStartCallback.bindTo(this)).error(function(e) {
                this.logger.talkback("Drawplz - Error in Recorded Drawing start", e), mgr.modalManager.confirmModal("Error in Starting Recording", "deviantART muro has detected errors intializing autosave.  Continuing to draw at this point is risky in that you could lose some of your work.  Press OK to reload this page, and cancel to keep drawing.<br/>Last Autosave: " + mgr.bean.getSaveTimeString(), function(e) {
                    return e ? (document.location.reload(!0), void 0) : void 0
                }.bindTo(this))
            }.bindTo(this)) : this.ranSignupHack ? this.logger.talkback("[Drawplz] - Client thinks it is logged in, but server says it is not signup hack failed", window.deviantART.deviant) : (this.ranSignupHack = !0, DWait.ready("jms/pages/signup.js", function() {
                Signup.modal([
                    [this.postStartToServer],
                    [this]
                ], !1)
            }.bindTo(this)))
        }.bindTo(this)), DiFi.send()
    },
    stopRecording: function(e, t) {
        return mgr.bean.getIsRecording() && window.deviantART.deviant.loggedIn ? (e && window.deviantART.deviant.loggedIn && mgr.hasDrawn() ? (this.recordStoppedCallback = function(e) {
            Modals.pop(), t && t(e)
        }, mgr.openProgressModal("Saving to Your Sta.sh", "Uploading to Your Sta.sh", ["sin(b)/tan(b) = Dr. Huxtable<br/><br/>", "zzzzzzzz<br/><br/>"])) : this.recordStoppedCallback = function(e) {
            t && t(e)
        }, mgr.bean.setIsRecording(!1), void 0) : (t(), void 0)
    },
    postStop: function() {
        if (!this.stopSucceeded) {
            var e = new RetryPoster;
            e.setOptions({
                timeoutInterval: 1e3,
                errorFunction: this.postError.bindTo(this),
                retryErrors: function(e) {
                    return 5 > e ? !0 : (this.recordStoppedCallback && (this.recordStoppedCallback(null), this.recordStoppedCallback = null), !1)
                }.bindTo(this)
            }), e.post(this.RECORD_STOP_URL, this._recordStopArgs(), this._recordStopCallback, this)
        }
    },
    recSaveAs: function() {
        return mgr.setBusy("modal", !0), mgr.bean.getRecordingDeviationId() ? (mgr.modalManager.pushModal("save_recording_as", [], function(e) {
            mgr.setBusy("modal", !1), "cancel" != e && setTimeout(function() {
                mgr.setBusy("save", !0), mgr.openProgressModal("Save As", "Saving: " + e.name, ["How did the cat get so fat?<br/><br/>"], function(t) {
                    return t ? (this.duplicateRecording(e.name, function() {
                        mgr.setBusy("save", !1), Modals.pop("done")
                    }.bindTo(this)), void 0) : (this.logger.talkback("Drawplz: Error in save as progress modal"), mgr.setBusy("save", !1), Modals.pop("done"), void 0)
                }.bindTo(this))
            }.bindTo(this), 1)
        }.bindTo(this), function(e) {
            try {
                var t = $(e);
                t.find("img.thumb").attr("src", mgr.makeThumb(225, 60));
                var r = "Untitled";
                mgr.bean.getDraftTitle() && (r = mgr.bean.getDraftTitle() + " Copy"), t.find(".nameEntry").val(r).select()
            } catch (i) {
                this.logger.talkback("Error in modal: " + i.message)
            }
        }.bindTo(this)), void 0) : mgr.hasDrawn() ? (mgr.fileManager.afterRecordStart = this.recSaveAs.bindTo(this), mgr.fileManager.postStartToServer(), void 0) : (alert("Draw something first!"), mgr.setBusy("modal", !1), void 0)
    },
    duplicateRecording: function(e, t) {
        var r = mgr.bean.getRecordingDeviationId();
        return r ? (mgr.fileManager.stopRecording(!1, function() {
            $.post(mgr.fileManager.RECORD_DUPLICATE_URL, {
                encoded_deviationid: r
            }, function(r) {
                try {
                    var i = JSON.parse(r).response.content;
                    mgr.bean.setIsRecording(!0), mgr.bean.setDraftTitle(e), t(i)
                } catch (a) {
                    this.postError("caught error in duplicateRec callback - " + a.message, "Error in Save As")
                }
            }.bindTo(this)).error(function(e) {
                this.postError(e, "Error with Save As")
            }.bindTo(this))
        }.bindTo(this)), void 0) : (this.logger.talkback("Duplicate called when no recording is active"), void 0)
    },
    postError: function(e, t) {
        this.logger.talkback("Drawplz - Error in file manager func", e), PubSub.publish("redraw.recordError", {
            error: e
        }), mgr.modalManager.confirmModal(t, "deviantART muro has encountered an unexpected error.  Continuing to draw at this point is risky and you could lose some of your work.  Press OK to reload this page (which will probably correct the problem).<br/>Last Autosave: " + mgr.bean.getSaveTimeString(), function(e) {
            return e ? (window.location.reload(!0), void 0) : void 0
        }.bindTo(this))
    },
    resumeRecording: function(e, t, r) {
        return t = !0, mgr.bean.getIsRecording() && mgr.bean.getRecordingDeviationId() != e ? (this.stopRecording(!0, function() {
            this.resumeRecording(e, t, r)
        }.bindTo(this)), void 0) : this.loadedRecording == e ? (r && r(), void 0) : ((!mgr.bean.getRDWriter() || mgr.bean.getRDWriter().isStub) && mgr.bean.setRDWriter(new RedrawWriter), mgr.bean.setPreventWrites(!0), this.loadedRecording = e, mgr.setBusy("load", !0), mgr.openProgressModal("Loading File", "Loading . . .", ["Did you know that the American Institute of Mathematics meets in a backroom of Fry's because their medieval math castle is still under construction?<br/><br/>"]), DiFi.pushPost("DrawPlzDrafts", "load_recording", [MURO_CONSTS.PROTOCOL_VERSION, e], function(i, a) {
            if (!i) return this.logger.talkback("Drawplz - Error Getting Playback Frames", a), alert("Error loading drawing"), mgr.setBusy("load", !1), Modals.pop(), mgr.bean.setPreventWrites(!1), void 0;
            mgr.reset(a.response.content.width, a.response.content.height);
            var n = a.response.content.keyframes,
                o = n[n.length - 1],
                s = o.load_data,
                d = new FileLoad(null, function() {
                    if (o.layoutstate) try {
                        var i = new RedrawReader;
                        i.playback(o.layoutstate, function() {
                            this.resumePost(e, t, r)
                        }.bindTo(this))
                    } catch (a) {
                        this.logger.talkback("[muro] Failure recovering from lastFrame.layoutstate: ", a), this.resumePost(e, t, r)
                    } else this.resumePost(e, t, r)
                }.bindTo(this));
            d.loadLayers(s.layers, null)
        }.bindTo(this)), DiFi.send(), void 0)
    },
    resumePost: function(e, t, r) {
        $.post(mgr.fileManager.RECORD_RESUME_URL, {
            encoded_deviationid: e,
            forced: t
        }, function(i) {
            mgr.bean.setRecordingDeviationId(e), mgr.fileManager._recordResumeCallback(i, t), this.checkForUnpushedInstructions(e, function() {
                mgr.setBusy("load", !1), mgr.bean.setPreventWrites(!1), Modals.pop(), r && r()
            })
        }.bindTo(this))
    },
    checkForUnpushedInstructions: function(e, t) {
        DiFi.pushPost("DrawPlzDrafts", "get_recording_queued_instructions", [MURO_CONSTS.PROTOCOL_VERSION, e], function(e, r) {
            if (!e) return this.logger.talkback("[muro] Error in get_recording_queued_instructions", r.response.content.error), t(), void 0;
            var i = r.response.content.queued_instructions;
            if (i) {
                var a = mgr.bean.getRDWriter(),
                    n = !1;
                a.isStub || (n = !0, mgr.bean.setRDWriter(null));
                var o = new RedrawReader;
                mgr.bean.setRDReader(o), o.playback(i, function() {
                    mgr.bean.setRDReader(null), n && mgr.bean.setRDWriter(a), t()
                }.bindTo(this))
            } else t()
        }.bindTo(this)), DiFi.send()
    },
    openLoadModal: function() {
        mgr.setBusy("modal", !0), mgr.modalManager.pushModal("load_recording", [], function() {
            mgr.setBusy("modal", !1), PubSub.publish("StashEmbedded.stop").unsubscribe([{
                eventname: "StashEmbedded.folder_loaded",
                subscriber: this
            }, {
                eventname: "Stash.item_open",
                subscriber: this
            }])
        }.bindTo(this), function(e) {
            this.$modal = $(e), this.getDraftsList($(e), 0, !0)
        }.bindTo(this))
    },
    openNewFileModal: function() {
        mgr.setBusy("modal", !0);
        var e = Math.max($(window).width(), $(window).height());
        mgr.modalManager.pushModal("new_file", [], function() {
            mgr.setBusy("modal", !1)
        }.bindTo(this), function(t) {
            var r = $(t);
            r.find(".maxSizePrint").html("Maximum canvas size: " + this.MAX_WIDTH + "&times;" + this.MAX_HEIGHT + "px"), r.find(".customSizeSelect").change(function() {
                var e = $(this).val();
                e.length > 3 && (r.find(".widthEntry").val(e.replace(/x.*/, "")), r.find(".heightEntry").val(e.replace(/^.*x/, "")))
            }), r.find(".customSizeSelect option").each(function() {
                $(this).attr("rel") > e && $(this).hide()
            }), r.find(".switchButton").click(function() {
                var e = r.find(".widthEntry").val(),
                    t = r.find(".heightEntry").val();
                r.find(".widthEntry").val(t), r.find(".heightEntry").val(e)
            });
            var i = mgr.width,
                a = mgr.height,
                n = mgr.selectionManager.getClipboardData();
            if (n) {
                var o = n.rect;
                i = o.width, a = o.height
            }
            i = Math.max(this.MIN_WIDTH, Math.min(i, this.MAX_WIDTH)), a = Math.max(this.MIN_HEIGHT, Math.min(a, this.MAX_HEIGHT)), r.find(".widthEntry").val(i), r.find(".heightEntry").val(a)
        }.bindTo(this))
    },
    newFileModalSubmit: function(e) {
        var t = $(e).parents(".newFileModal"),
            r = parseInt(t.find(".widthEntry").val(), 10),
            i = parseInt(t.find(".heightEntry").val(), 10);
        return !r || !i || this.MIN_WIDTH > r || r > this.MAX_WIDTH || this.MIN_HEIGHT > i || i > this.MAX_HEIGHT ? (alert("Please select a size between " + this.MIN_WIDTH + "x" + this.MIN_HEIGHT + "px and " + this.MAX_WIDTH + "x" + this.MAX_HEIGHT + "px."), void 0) : (Modals.pop(), mgr.fileManager.stopRecording(!0, function() {
            mgr.bean.setRecordingDeviationId(null), mgr.reset(r, i), this.reset();
            var e, a = mgr.layerManager.create("Background").select();
            switch (t.find(".customBGSelect").val()) {
                case "transparent":
                    a.setChangeStamp(CHANGESTAMPS.CLEAR);
                    break;
                case "black":
                    a.getContext().clearToColor(CHANGESTAMP_COLORS.BLACK), a.setChangeStamp(CHANGESTAMPS.BLACK), e = mgr.layerManager.create().select(), e.setChangeStamp(CHANGESTAMPS.CLEAR);
                    break;
                case "white":
                    a.getContext().clearToColor(CHANGESTAMP_COLORS.WHITE), a.setChangeStamp(CHANGESTAMPS.WHITE), e = mgr.layerManager.create().select(), e.setChangeStamp(CHANGESTAMPS.CLEAR)
            }
            mgr.brushSelector.init(mgr.bean.getSelectedLayer().getContext(), mgr.bean.getBufferCtx(), mgr.bean.getBrushCtx()), mgr.zoomManager.simonFitToScreen(), mgr.undoManager.reset(), mgr.undoManager.push(), mgr.bean.setIsRecording(!0), mgr.fileManager.postStartToServer()
        }.bindTo(this)), void 0)
    },
    getSafeTitle: function(e) {
        return e = e || this.title || "Untitled", e = e.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), e = e.replace(/[^\w\s-]/g, "-")
    },
    getDraftsList: function() {
        PubSub.subscribe([{
            eventname: "Stash.item_open",
            subscriber: this,
            callback: this.openStashRecording
        }, {
            eventname: "StashEmbedded.folder_loaded",
            subscriber: this,
            callback: this.stashFolderLoaded
        }]), DWait.ready("jms/pages/stash/stash.js", function() {
            Glbl("Stash.mode", "plain|no_upload"), Glbl("Stash.filter", "muro_recordings"), Glbl("Stash.browselimit", 18), PubSub.publish("StashEmbedded.start"), DiFi.pushPost("DrawPlzDrafts", "get_stash_recordings_stashid", [MURO_CONSTS.PROTOCOL_VERSION], function(e, t) {
                PubSub.publish("Stash.folder_open", {
                    id: t.response.content
                })
            }.bindTo(this)), DiFi.send()
        }.bindTo(this))
    },
    getRootDraftsList: function() {
        PubSub.subscribe([{
            eventname: "StashEmbedded.root_loaded",
            subscriber: this,
            callback: this.rootStashLoaded
        }]), DWait.ready("jms/pages/stash/stash.js", function() {
            Glbl("Stash.mode", "plain|no_upload"), Glbl("Stash.filter", "muro_recordings"), Glbl("Stash.browselimit", 18), PubSub.publish("StashEmbedded.start"), PubSub.publish("Stash.root_open")
        })
    },
    rootStashLoaded: function(e, t) {
        var r = $(t),
            i = this.$modal.find(".mainPart");
        i.empty(), r.find('.stash-tt-a[collect_rid!="1:0"]').length ? r.appendTo(i) : i.append('<h2 class="nofiles">You do not have any files in your sta.sh</h2>'), i.animate({
            scrollTop: 0
        }, "slow")
    },
    openStashRecording: function(e, t) {
        Modals.pop("cancel"), mgr.fileManager.stopRecording(!0, function() {
            try {
                var e = parseInt(t.privateid, 10).toString(36);
                mgr.bean.setRecordingDeviationId(e), this.resumeRecording(e, !0)
            } catch (r) {
                mgr.bean.setRecordingDeviationId(null), mgr.bean.setIsRecording(!0)
            }
        }.bindTo(this))
    },
    stashFolderLoaded: function(e, t) {
        var r = $(t),
            i = this.$modal.find(".mainPart");
        i.empty().append('<div style="text-align:left;">< <a href="#" class="moveUp">Sta.sh</a></div>'), r.find('.stash-tt-a[collect_rid!="1:0"]').length ? r.appendTo(i) : i.append('<h2 class="nofiles">You do not have any saved recordings.<h2>'), i.animate({
            scrollTop: 0
        }, "slow")
    },
    doneButton: function() {
        return "post" == mgr.tabManager.currentTab() ? (mgr.postProcessor.cleanAndPush().done(this._doneButton.bindTo(this)), !1) : (this._doneButton(), !1)
    },
    _doneButton: function() {
        if (!mgr.hasDrawn() && (mgr.iframe || mgr.thirdPartyEmbed)) return PubSub.publish("redraw.recordCancel"), void 0;
        if (mgr.bean.getRecordingDeviationId()) PubSub.publish("redraw.doneButton"), mgr.openProgressModal("Writing to your Sta.sh", "Saving your file to your Sta.sh", ["Looks great, you must put in a lot of practice!<br/><br/>"]), mgr.fileManager.stopRecording(!0, function(e) {
            PubSub.publish("redraw.recordSave", {
                id: e.deviationinfo.id,
                privateid: e.deviationinfo.privateid
            }), mgr.iframe || (window.location.href = e ? mgr.catid ? e.deviationinfo.url + "?edit=1" : e.deviationinfo.url : "http://sta.sh/")
        });
        else {
            if (!mgr.hasDrawn()) return alert("Draw something first!"), void 0;
            window.deviantART.deviant.loggedIn ? (mgr.fileManager.afterRecordStart = function() {
                this.doneButton()
            }.bindTo(this), mgr.fileManager.postStartToServer()) : (DiFi.pushPost("DrawPlz", "login_noop", [], function(e) {
                e && (PubSub.subscribe([{
                    eventname: "redraw.recordStart",
                    subscriber: this,
                    callback: this.doneButton
                }]), setTimeout(mgr.fileManager.startRecording.bindTo(mgr.recordedDrawingManager), 10))
            }.bindTo(this)), DiFi.send())
        }
    },
    exportImageData: function() {
        var e = mgr.layerManager.realWidth,
            t = mgr.layerManager.realHeight;
        window.open("javascript:var base64=window.opener.mgr.canvasDrawing.getSaveData();document.write('<img src=\"'+base64+'\"/>');", "image_export", "height=" + t + ", width=" + e)
    },
    _recordStartArgs: function() {
        for (var e = !0, t = 0; mgr.layerManager.layers.length > t; t++) if (!isSpecialChangestamp(mgr.layerManager.layers[t].changeStamp)) {
            e = !1;
            break
        }
        var r = {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            draft_metadata: {
                name: "Untitled Drawing",
                width: mgr.width,
                height: mgr.height,
                iframe: mgr.iframe,
                catid: mgr.catid,
                is_blank_canvas: e
            }
        };
        return mgr.url && (r.draft_metadata.original_source = mgr.url), mgr.stashFolder && (r.draft_metadata.stash_folder = mgr.stashFolder), r
    },
    _recordStartCallback: function(e) {
        this.inRecordStart = !1;
        var t = JSON.parse(e).response;
        try {
            if (1 != t.status) {
                var r = "Bad status: " + data.response.status;
                throw data.response.content && data.response.content.error && (r += "  (" + data.response.content.error + ")"), r
            }
            var i = t.content.deviationid;
            if (!i) throw "Invalid recordingDeviationId: " + t.content.deviationid;
            mgr.bean.setRecordingDeviationId(i), mgr.bean.setRecordingPreviewUrl(t.content.deviationinfo.url), mgr.bean.getRDWriter().isStub && mgr.bean.setRDWriter(new RedrawWriter), mgr.bean.getRDWriter().flush(), PubSub.publish("redraw.recordStart"), this.afterRecordStart && (this.afterRecordStart(), this.afterRecordStart = null)
        } catch (a) {
            this.logger.talkback("drawplz - Error in record start: ", a), mgr.bean.setIsRecording(!1), mgr.bean.setRDWriter(null)
        }
    },
    _recordStopArgs: function() {
        var e = mgr.makeThumb(150, 200),
            t = mgr.layerManager.flatten();
        return {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId(),
            draft_metadata: {
                name: mgr.bean.getDraftTitle(),
                layercount: mgr.layerManager.layers.length,
                thumb_crc: fletcher16(e),
                base64thumb: e,
                crc: fletcher16(t),
                base64ImageData: t
            }
        }
    },
    _recordStopCallback: function(e) {
        if (!(vms_feature("error_simulator") && .7 > Math.random())) {
            this.stopTimer && (clearTimeout(this.stopTimer), this.stopTimer = null, this.stopSucceeded = !0);
            try {
                var t = null;
                if (e) {
                    var r = JSON.parse(e).response;
                    if (1 != r.status) throw "Bad return status: " + r.status;
                    t = r.content
                }
                mgr.bean.setRDWriter(null), this.recordStoppedCallback && (this.recordStoppedCallback(t), this.recordStoppedCallback = null)
            } catch (i) {
                this.logger.talkback("drawplz - Error in record stop: ", i)
            }
        }
    },
    _recordResumeCallback: function(e, t) {
        var r = JSON.parse(e).response;
        try {
            if (1 != r.status) switch (r.content.error) {
                case "Recording was deleted":
                    return mgr.bean.setRecordingDeviationId(null), mgr.bean.setIsRecording(!0), void 0;
                case "Recording is in use":
                    if (!t) return mgr.modalManager.confirmModal("File Already Open?", "It seems like you are already editing this drawing in another window or browser.  Opening the same file in multiple windows can lead to unpredictable behavior.  Are you sure you want to continue?", function(e) {
                        if (e) mgr.fileManager.resumeRecording(mgr.bean.getRecordingDeviationId(), !0);
                        else {
                            try {
                                mgr.bean.turnEventsOff(), mgr.bean.setIsRecording(!1), mgr.bean.setRecordingDeviationId(null), mgr.reset(mgr.width, mgr.height), mgr.fileManager.reset(), mgr.initLayers()
                            } finally {
                                mgr.bean.turnEventsOn()
                            }
                            mgr.bean.setIsRecording(!0)
                        }
                    }), void 0;
                    break;
                default:
                    return this.logger.talkback("Drawplz: Trying to resume, had an unknown error returned: ", r.content.error), mgr.bean.setRecordingDeviationId(null), mgr.bean.setIsRecording(!0), void 0
            }
            mgr.bean.setSaveTime(), mgr.bean.setIsRecording(!0)
        } catch (i) {
            this.logger.talkback("drawplz - Error in record resume: ", i), mgr.bean.setIsRecording(!1), mgr.bean.setRDWriter(null)
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/file/fileManager.js");
window.FileLoad = Base.extend({
    constructor: function(e, a, r) {
        if (this.logger = new StdLogger("File Load"), this.callback = a, this.preloader = r, this.preloader || (this.preloader = {
            getImage: function() {
                return !1
            }
        }), e) {
            if (mgr.isBusy(["load"])) return alert("Another file is being loaded.  Please wait for it to complete."), this.finish(!1), void 0;
            mgr.setBusy(["load", "save"], !0), DiFi.pushPost("DrawPlzDrafts", "load_drawing", [2, e], this.loadCallback.bindTo(this)), DiFi.send()
        }
    },
    loadCallback: function(e, a) {
        if (e) {
            var r = a.response.content,
                t = parseInt(r.width, 10),
                o = parseInt(r.height, 10);
            mgr.bean.setDraftId(r.draftid), mgr.bean.setDraftTitle(r.name), mgr.reset(t, o), this.loadLayers(r.layers || []), mgr.zoomManager.fitToScreen(), mgr.undoManager.startedSaving(), mgr.undoManager.didSave()
        } else this.logger.talkback("Drawplz - Error Loading Drawing");
        mgr.setBusy(["load", "save"], !1)
    },
    loadLayers: function(e, a) {
        mgr.layerManager.removeAll(!1, !1), e.sort(function(e, a) {
            return parseInt(e.order, 10) - parseInt(a.order, 10)
        }), this.imagesToLoad = 0;
        for (var r, t = this, o = [], i = 0; e.length > i; i++) {
            var n, s = e[i],
                g = mgr.layerManager.createLayer(!1).select(),
                l = g.getContext();
            g.setName(s.name), parseInt(s.visible, 10) || g.toggle(), mgr.bean.setLayerOpacity(parseFloat(s.opacity));
            var d = parseInt(s.changestamp, 10);
            if (g.setChangeStamp(d), isSpecialChangestamp(d)) l.clearToColor(getSpecialColor(d));
            else if (n = this.preloader.getImage(d)) {
                var m = mgr.layerManager.getLayerById(g.getId());
                m && m.getContext() ? (m.getContext().clear(), m.getContext().drawImage(n, 0, 0)) : (this.logger.talkback("Drawplz: WTF, no layer (or context) found for " + g.getId()), breakpoint())
            } else {
                this.imagesToLoad++;
                var c = new Image;
                $(c).data("id", g.getId()), c.onload = this.makeOnload(), r = mgr.imageImporter.convertURL(s.fileurl), $(c).attr("src", r)
            }
            o.push(s.name)
        }
        if (a) {
            this.imagesToLoad++;
            var h = new Image;
            $(h).data("id", "selection"), h.onload = function() {
                mgr.selectionManager.selectFromImage(this), t.imagesToLoad--, 0 === t.imagesToLoad && t.finish(!0)
            }, r = mgr.imageImporter.convertURL(a), $(h).attr("src", r)
        } else mgr.selectionManager.innerDeselect(), PubSub.publish("muro.selectionChange");
        return 0 === this.imagesToLoad && this.finish(!0), mgr.layerManager.order(o), 0 === this.imagesToLoad
    },
    finish: function(e) {
        e && (mgr.undoManager.reset(), mgr.undoManager.push()), this.callback && this.callback(e)
    },
    makeOnload: function() {
        var e = this;
        return function() {
            try {
                var a = mgr.layerManager.getLayerById($(this).data("id"));
                if (!a) return e.logger.log("No layer found for image, must be left over from old load: ", $(this).data("id")), void 0;
                var r = a.getContext();
                r.clear(), r.drawImage(this, 0, 0), e.imagesToLoad--, 0 === e.imagesToLoad && e.finish(!0), $(this).remove()
            } catch (t) {
                e.logger.log("Error in load Layers: ", t), breakpoint()
            }
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/file/fileLoad.js");
window.Calibrator = Base.extend({
    constructor: function(a) {
        a = 50 | a, 
		this.logger = new StdLogger("Calibrator"), 
		this.makeBlurMap(a)
    },
    calibrate1: function() {
        var a = new Canvas(document.createElement("canvas"));
        a.canvas.width(200), 
		a.canvas.height(200), 
		a.init(200, 200, !0);
        var r = a.context;
        r.shadowColor = "rgba(0, 0, 0, 1)", 
		r.strokeStyle = "rgba(0, 0, 0, 1)", 
		r.shadowOffsetY = 500, 
		r.shadowOffsetX = 0, 
		r.shadowBlur = 25, 
		r.lineWidth = 10;
        for (var t, e = "", o = 15; 16 > o; o += 5) {
            r.shadowBlur = o, 
			r.clear(), 
			r.moveTo(-50, - 400), 
			r.lineTo(250, - 400), 
			r.stroke(), 
			t = r.getImageData(100, 0, 1, 200);
            for (var s = -50; 50 > s; s += 1) 
				e += s + "," + t.data[4 * (s + 100) + 3] + "cr"
        }
        this.logger.log("", e)
    },
    calibrate: function() {
        var a = new Canvas(document.createElement("canvas"));
        a.canvas.width(200), a.canvas.height(200), a.init(200, 200, !0);
        var r = a.context;
        r.shadowColor = "rgba(0, 0, 0, 1)", 
		r.strokeStyle = "rgba(0, 0, 0, 1)", 
		r.shadowOffsetY = 500, 
		r.shadowOffsetX = 0, 
		r.shadowBlur = 25, 
		r.lineWidth = 10;
        for (var t, e = "", o = 0; 50 > o; o += 1) {
            r.shadowBlur = o, 
			r.clear(), 
			r.moveTo(-50, - 400), 
			r.lineTo(250, - 400), 
			r.stroke(), 
			t = r.getImageData(100, 0, 1, 200);
            for (var s = 0; 100 > s; s += 1) {
                var l = t.data[4 * (s + 100) + 3];
                if (10 > l) {
                    e += o + "," + s + "cr";
                    break
                }
            }
        }
        this.logger.log("", e)
    },
    standardDeviation: function() {
        var a = new Canvas(document.createElement("canvas"));
        a.canvas.width(200), a.canvas.height(400), a.init(200, 400, !0);
        var r = a.context;
        r.shadowColor = "rgba(0, 0, 0, 1)", r.strokeStyle = "rgba(0, 0, 0, 1)", r.shadowOffsetY = 600, r.shadowOffsetX = 0, r.shadowBlur = 25, r.lineWidth = 10;
        for (var t, e = "", o = 4; 40 > o; o += 4) for (var s = 0; 150 > s; s += 5) {
            r.lineWidth = o, r.shadowBlur = s, r.clear(), r.moveTo(-50, - 400), r.lineTo(250, - 400), r.stroke(), t = r.getImageData(100, 0, 1, 400);
            var l, h, i = 0,
                n = 0;
            for (l = 0; 400 > l; l += 1) h = t.data[4 * l + 3], n += h, i += h * l;
            i /= n;
            var u = 0;
            for (l = 0; 400 > l; l += 1) h = t.data[4 * l + 3], u += h * Math.pow(l - i, 2);
            u = Math.pow(u / n, .5), e += o + "," + s + "," + u + "," + i + "cr"
        }
        this.logger.log("", e)
    },
    makeBlurMap: function(a) {
        if (!this.getCachedBlurmap()) {
            var r = new Canvas(document.createElement("canvas"));
            r.canvas.width(200), r.canvas.height(400), r.init(200, 400, !0);
            var t = r.context;
            t.shadowColor = "rgba(0, 0, 0, 1)", t.strokeStyle = "rgba(0, 0, 0, 1)", t.shadowOffsetY = 400, t.shadowOffsetX = 0, this.blurMap = [];
            var e, o, s, l, h, i = 0;
            for (o = 2; a > o; o += 5) {
                var n = [];
                t.lineWidth = o, s = 0;
                var u = 0;
                for (s = 0; 100 > s; s += 5) try {
                    if (
						t.shadowBlur = s, 
						t.clear(), 
						t.moveTo(-50, - 200), 
						t.lineTo(250, - 200), 
						t.stroke(), 
						e = t.getImageData(100, 0, 1, 400), 
						e.data[3]
					) 
						break;
                    var g, c = 0,
                        d = 0,
                        f = 0;
                    for (l = 0; e.height > l; l += 1) 
						g = e.data[4 * l + 3], 
						d += g, 
						c += g * l, 
						f = Math.max(f, g);
                    c /= d;
                    var v = 0;
                    for (l = 0; e.height > l; l += 1) g = e.data[4 * l + 3], v += g * Math.pow(l - c, 2);
                    if (v = Math.pow(v / d, .5), u != s) for (l = u + 1; s > l; l++) h = n.length > u && 2 == n[u].length ? n[u] : [f, v], n.push([Math.round((f - h[0]) * (l - u) / (s - i) + h[0]), (v - h[1]) * (l - u) / (s - u) + h[1]]);
                    f > 1 && v && (u = s, n.push([f, v]))
                } catch (w) {
                    this.logger.talkback("[muro] drawplz - Caught error while making blurmap (spot 1)", [w.message, u])
                }
                var p, m, b = this.blurMap[i];
                if (i) try {
                    for (p = i + 1; o > p; p++) {
                        for (
							m = [], 
							s = 0; 
							this.blurMap[i].length > s && n.length > s; s++
						) 
							m.push([
								Math.round((n[s][0] - b[s][0]) * (p - i) / (o - i) + b[s][0]), 
								(n[s][1] - b[s][1]) * (p - i) / (o - i) + b[s][1]
							]);
                        this.blurMap.push(m)
                    }
                } catch (w) {
                    this.logger.talkback("[muro] drawplz - Caught error while making blurmap (spot 2)", [w, s])
                } else for (p = i; o > p; p++) this.blurMap.push(n);
                i = o, this.blurMap.push(n)
            }
            this.cacheBlurmap()
        }
    },
    cacheBlurmap: function() {
        this.blurMap && 0 !== this.blurMap.length && safeLocalSet("drawplz.blurmap", JSON.stringify({
            useragent: navigator.userAgent,
            blurmap: this.blurMap
        }))
    },
    getCachedBlurmap: function() {
        try {
            var a = JSON.parse(safeLocalGet("drawplz.blurmap", {}));
            if (a && a.useragent == navigator.userAgent) return this.blurMap = a.blurmap, !0
        } catch (r) {}
        return !1
    },
    setBlur: function(context, r, t) {
        (!this.blurMap || 1 > this.blurMap.length) && this.makeBlurMap();
        for (var e = Math.floor(context.lineWidth), o = this.blurMap[e - 1], s = 0; o.length > s; s++) if (o[s][1] > r) {
            if (s > 0) {
                var l = o[s][1],
                    h = o[s - 1][1],
                    i = (r - h) / (l - h);
                if (t) {
                    var n = o[s - 1][0],
                        u = o[s][0],
                        g = n + (u - n) * i;
                    context.shadowColor = "rgba(0, 0, 0, " + Math.min(1, t / g) + ")"
                }
                context.shadowBlur = s - 1 + i
            } else context.shadowBlur = s;
            return
        }
        this.logger.log("WARNING: ASKED TO SET BLUR TO GREATER THAN CALIBRATED VALUES"), context.shadowBlur = o.length
    },
    specBlur: function(a, r) {
        var t = this.blurMap[Math.floor(a.lineWidth)][0][1];
        this.setBlur(a, t + r / 2)
    },
    calTest: function() {
        var a = new Canvas(document.createElement("canvas"));
        a.canvas.width(200), a.canvas.height(200), a.init(200, 200, !0);
        var r = a.context;
        r.shadowColor = "rgba(0, 0, 0, 1)", r.strokeStyle = "rgba(0, 0, 0, 1)", r.shadowOffsetY = 500, r.shadowOffsetX = 0, r.shadowBlur = 23, r.lineWidth = 10, this.setBlur(r, 11, 85), this.logger.log("Blur set to: ", r.shadowBlur);
        for (var t = 0; 50 > t; t += 5) {
            r.shadowBlur = t, r.clear(), r.moveTo(-50, - 400), r.lineTo(250, - 400), r.stroke();
            for (var e = r.getImageData(100, 0, 1, 200), o = "0", s = -50; 50 > s; s += 1) o += "," + e.data[4 * (s + 100) + 3];
            this.logger.log("", o)
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/calibrator.js");
window.RDINDEX = {
    TIME_INDEX: 0,
    NAME_INDEX: 1,
    META_INDEX: 2,
    DATA_INDEX: 3,
    INST_TIME_INDEX: 4
},

window.RedrawWriter = Base.extend({
    constructor: function() {
        Math.seedrandom(0), this.logger = new StdLogger("RDWriter"), this.isStub = !1, this.clear(), this.lastTime = (new Date).getTime(), this.numRands = 0, this.saveStack = [], this.isBlocking = !1, this.keyNumber = 0, this.isRecording = !0, this.MAX_INSTRUCTIONS_AS = 5, this.MAX_DATA_SIZE_AS = 1e3, this.MAX_INSTRUCTIONS_KF = 50, this.MAX_DATA_SIZE_KF = 5e3, this.STACK_SIZE_WARNING = 5, this.STACK_SIZE_BLOCK = 10, this.numInstructionsKeyframe = 0, this.instructionsSizeKeyframe = 0, this.instructionsSizeAs = 0, this.autoFlush = !0, this.endFlush = !1, mgr.bean.subscribe("isSaveBlocking", this.saveBlockUpdate.bindTo(this))
    },
    setAutoFlush: function(t) {
        this.autoFlush = vms_feature("qunit") || vms_feature("no_saving") ? t : !0
    },
    startInstruction: function(t, i) {
        if (mgr.bean.getPreventWrites() || null !== this.currentInstruction) return {
            addInstructionData: function() {},
            pushInstruction: function() {}
        };
        var n = (new Date).getTime(),
            s = n - this.lastTime;
        return this.lastTime = n, s || (s = 14), this.mathSeed = s, Math.seedrandom(s), this.currentInstruction = [s, t, i, []], this
    },
    addInstructionData: function(t) {
        this.currentInstruction && this.currentInstruction[RDINDEX.DATA_INDEX].push(t)
    },
    appendToMeta: function(t) {
        this.currentInstruction && this.currentInstruction[RDINDEX.META_INDEX].push(t)
    },
    pushInstruction: function() {
        if (this.currentInstruction) {
            var t = this.currentInstruction[RDINDEX.NAME_INDEX] == RDInst.FLUSH;
            return this.currentInstruction.push((new Date).getTime() - this.lastTime), this.instructions.push(this.currentInstruction), this.instructionsSizeAs += this.currentInstruction[RDINDEX.DATA_INDEX].length, this.instructionsSizeKeyframe += this.currentInstruction[RDINDEX.DATA_INDEX].length, this.numInstructionsKeyframe++, this.currentInstruction = null, t ? (this.flush(), void 0) : ((this.numInstructionsKeyframe >= this.MAX_INSTRUCTIONS_KF || this.instructionsSizeKeyframe > this.MAX_DATA_SIZE_KF) && this.autoFlush ? (this.instructions.length >= this.MAX_INSTRUCTIONS ? this.logger.talkback("MURO_STATS: Max Instruction Keyframe", [this.instructions.length, this.instructionsSize]) : this.logger.talkback("MURO_STATS: Max Size Keyframe", [this.instructions.length, this.instructionsSize]), this.flush()) : ((this.instructions.length >= this.MAX_INSTRUCTIONS_AS || this.instructionsSizeAs > this.MAX_DATA_SIZE_AS) && this.autoFlush || !mgr.bean.getRecordingDeviationId() && this.autoFlush) && this.instructionsFlush(), void 0)
        }
    },
    abortInstruction: function() {
        this.currentInstruction = null
    },
    getScript: function() {
        return null !== this.currentInstruction && this.pushInstruction(), this.instructions.length ? JSON.stringify(this.instructions) : ""
    },
    clear: function(t) {
        switch (t) {
            case "keyframe":
            default:
                this.numInstructionsKeyframe = 0, this.instructionsSizeKeyframe = 0;
            case "instructions":
                this.instructions = [], this.instructionsSizeAs = 0, this.currentInstruction = null
        }
    },
    getRandom: function() {
        return this.currentInstruction ? (this.mathSeed || (this.logger.log("WARNING: UNSEEDED RANDOM!!!!!!!"), Math.seedrandom(this.mathSeed = 1234)), this.numRands++, Math.srand()) : Math.random()
    },
    flush: function(t) {
        try {
            var i, n = this.getScript();
            i = n.length > 0 ? n : "", this.saveStack.push(new KeyframeUploader(i, function() {
                t && t(), this.saveDone()
            }.bindTo(this))), this.clear("keyframe"), this.autoFlush && this.saveCall()
        } catch (s) {
            return this.throwError(s, null), void 0
        }
    },
    instructionsFlush: function(t) {
        try {
            var i, n = this.getScript();
            if (i = n.length > 0 ? n : "", this.saveStack.length > 1) {
                var s = this.saveStack[this.saveStack.length - 1].saveObject;
                if ("instruction" == s.type) {
                    var e = JSON.parse(s.instructions);
                    return s.instructions = JSON.stringify(e.concat(this.instructions)), this.clear("instructions"), void 0
                }
            }
            this.saveStack.push(new InstructionUploader(i, function() {
                t && t(), this.saveDone()
            }.bindTo(this))), this.clear("instructions"), this.autoFlush && this.saveCall()
        } catch (r) {
            return this.throwError(r, null), void 0
        }
    },
    saveCall: function() {
        if (!window.deviantART.deviant.loggedIn) return this._loggedOutSaveCall(), void 0;
        if (!(vms_feature("qunit") && !mgr.bean.getOverrideQunitSkip() || !vms_feature("qunit") && vms_feature("no_saving")) && this.saveStack.length) {
            if (!mgr.bean.getRecordingDeviationId()) return this.logger.log("Recording start"), this.saveStack.length > 1 && !mgr.fileManager.inRecordStart && (mgr.fileManager.afterRecordStart = function() {
                this.saveCall()
            }.bindTo(this), mgr.fileManager.postStartToServer()), void 0;
            if (this.isSaving) return this.saveStack.length >= this.STACK_SIZE_BLOCK ? mgr.bean.setIsSaveBlocking(!0) : this.saveStack.length >= this.STACK_SIZE_WARNING && mgr.$mainNode.find(".slowNetworkWarn").show(), void 0;
            this.isSaving = !0;
            var t = this.saveStack.shift();
            t.save()
        }
    },
    _loggedOutSaveCall: function() {
        3 > this.saveStack.length || mgr.modalManager.confirmModal("Sign In/Up to Continue", "deviantART muro automatically saves recordings of your drawing, but it can only do this if you are logged in.  If you do not log in or sign up now, you will not be able to save your work.  Would you like to sign in?", function(t) {
            t ? (DiFi.pushPost("DrawPlz", "login_noop", [], function(t) {
                t && PubSub.subscribe([{
                    eventname: "gWebPage.update",
                    subscriber: this,
                    callback: this._loggedOutStartRecording
                }])
            }.bindTo(this)), DiFi.send()) : (mgr.bean.setRDWriter(null), mgr.$mainNode.find(".submitButton").hide())
        }.bindTo(this))
    },
    _loggedOutStartRecording: function(t, i) {
        i.pageData.deviant.loggedIn === !0 && mgr.fileManager.startRecording(), PubSub.unsubscribe([{
            eventname: "gWebPage.update",
            subscriber: this
        }])
    },
    saveDone: function() {
        this.isSaving = !1, this.isBlocking && this.STACK_SIZE_WARNING > this.saveStack.length && mgr.bean.setIsSaveBlocking(!1), 2 > this.saveStack.length && mgr.$mainNode.find(".slowNetworkWarn").hide(), this.saveCall()
    },
    throwError: function(t) {
        breakpoint(), this.logger.talkback("Drawplz - Error in Recorded Drawing Save", t), mgr.modalManager.confirmModal("Error in Autosave", "deviantART muro has detected errors in autosave.  Continuing to draw at this point is risky in that you could lose some of your work.  Press OK to reload this page, and cancel to keep drawing.<br/>Last Autosave: " + mgr.bean.getSaveTimeString(), function(t) {
            return t ? (window.location.reload(!0), void 0) : void 0
        }.bindTo(this))
    },
    saveBlockUpdate: function() {
        var t = mgr.bean.getIsSaveBlocking(),
            i = Modals.stack.length > 0 && "Waiting for Network" == Modals.stack[0][0].$node.find(".daTitle").html();
        t ? (mgr.openProgressModal("Waiting for Network", "Your network connection cannot keep up with the speed of your drawing", ["Autosave is trying to push information to the cloud, but is running into problems.  This is usually caused by slow or intermittent network connectivity. <br/><br/>"], function() {}), this.blockTimer = setTimeout(this.networkIsFucked.bindTo(this), 1e4)) : (this.blockTimer && clearTimeout(this.blockTimer), i && Modals.pop())
    },
    networkIsFucked: function() {
        this.logger.talkback("[muro] Network is fucked", [this.saveStack.length])
    },
    hasUnsavedWork: function() {
        return this.saveStack.length > 0 || this.instructions.length > 0
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/redrawWriter.js");
window.RedrawReader = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("RDReader"), this.DATA_PACKET_SIZE = 10, this.MAX_TIME_NO_YIELD = 200, this.MAX_TIME_NO_STROKE_YIELD = 50, this.MIN_TIMEOUT = 1, this.instructions = [], this.currentInstruction = null, this.instructionTimeout = null, this.strokeTimeout = null, this.callback = null, this.numRands = 0, this.playing = !1, this.$knob = $(".drawPlzControls .rdScrubber .knob"), this.data = null, this.dataPtr = 0, this.unscaledTPP = 1, this.asyncPause = !1, this.lastBreak = 0, mgr.bean.subscribe("playbackSpeed", function() {
            this.timePerPacket = this.brushSpeedAdjust(this.unscaledTPP)
        }.bindTo(this)), this.resetLastTime(), Math.seedrandom(0)
    },
    playback: function(t, e) {
        if ($(".rdControls .playButton").addClass("playButtonPlaying"), this.playing = !0, this.asyncPause = !1, this.callback = e, "string" == typeof t) try {
            this.instructions = JSON.parse(t.replace(/\\\'/g, "'"))
        } catch (r) {
            this.logger.log("Error parsing json: ", t), this.instructions = [
                [0, "err", "corrupt json", [], 0]
            ]
        } else this.instructions = t;
        this.numInstructions = this.instructions.length, this.instructionPtr = 0, this.schedule(), $(".pauseDrawer").css("height", "0")
    },
    resetLastTime: function() {
        this.lastTime = (new Date).getTime()
    },
    stop: function() {
        this.playing = !1, this.clearTimers(), $(".rdControls .playButton").removeClass("playButtonPlaying")
    },
    pauseForAsync: function() {
        this.asyncPause = !0
    },
    resumeFromAsync: function() {
        this.asyncPause = !1, this.schedule()
    },
    playInstruction: function() {
        try {
            if (!this.playing) return;
            if (this.currentInstruction = this.instructions[this.instructionPtr++]) {
                Math.seedrandom(this.currentInstruction[RDINDEX.TIME_INDEX]);
                var t = this.currentInstruction[RDINDEX.NAME_INDEX];
                switch (t) {
                    case RDInst.BRUSH:
                        if (!this.brush()) return;
                        break;
                    case RDInst.LAYER:
                        this.layer();
                        break;
                    case RDInst.TOOLMANAGER:
                        var e = this.currentInstruction[RDINDEX.META_INDEX];
                        "annotation" != e && "postprocess" != e && mgr.toolManager.toolAction(e);
                        break;
                    case RDInst.SELECTION:
                        this.selection();
                        break;
                    case RDInst.ZOOM:
                        this.zoom();
                        break;
                    case RDInst.UNDO:
                        switch (this.currentInstruction[RDINDEX.META_INDEX]) {
                            case "u":
                                mgr.undoManager.undo();
                                break;
                            case "r":
                                mgr.undoManager.redo()
                        }
                        break;
                    case RDInst.FILTER:
                        this.filter();
                        break;
                    case RDInst.ERROR:
                        this.error();
                        break;
                    case RDInst.FLUSH:
                        this.flush();
                        break;
                    case RDInst.ANNOTATION:
                        this.annotation();
                        break;
                    case RDInst.VERSION:
                        mgr.bean.setInstructionsVersion(this.currentInstruction[RDINDEX.META_INDEX]);
                        break;
                    case RDInst.SIZE:
                        var r = this.currentInstruction[RDINDEX.META_INDEX][0],
                            s = this.currentInstruction[RDINDEX.META_INDEX][1];
                        (mgr.width != r || mgr.height != s) && mgr.layerManager.resize(r, s, 0, 0, 0);
                        break;
                    case RDInst.BASICPRO:
                        break;
                    default:
                        this.logger.talkback("Drawplz - Unknown instruction in playback:", {
                            name: t
                        })
                }
            }
        } catch (n) {
            this.logger.log("ERROR PLAYING INSTRUCTION: ", [n, this.currentInstruction]), this.flush(), breakpoint()
        }
        this.currentInstruction = null, this.schedule()
    },
    clearTimers: function() {
        this.instructionTimeout && (clearTimeout(this.instructionTimeout), this.instructionTimeout = null), this.strokeTimeout && (clearTimeout(this.strokeTimeout), this.strokeTimeout = null)
    },
    schedule: function() {
        if (this.clearTimers(), !this.asyncPause) if (this.instructions.length > this.instructionPtr) {
            var t = (new Date).getTime(),
                e = this.instructions[this.instructionPtr][RDINDEX.TIME_INDEX] - (t - this.lastTime);
            e = Math.max(1, e), this.lastTime = t;
            var r = Math.pow(mgr.bean.getPlaybackSpeed(), 2),
                s = Math.max(1, 3e3 * r),
                n = Math.max(this.MIN_TIMEOUT, e / (1 + e / s));
            mgr.bean.setFramePercent(this.instructionPtr / this.instructions.length);
            var a = t - this.lastBreak;
            5 > n && (1 - r) * this.MAX_TIME_NO_STROKE_YIELD > a ? this.playInstruction() : (this.lastBreak = t, this.instructionTimeout = window.setTimeout(this.playInstruction.bindTo(this), n))
        } else this.callback && this.callback()
    },
    getRandom: function() {
        return this.currentInstruction ? (this.numRands++, Math.srand()) : Math.random()
    },
    fakeEvent: function(t, e, r, s, n, a) {
        return {
            altKey: r || !1,
            shiftKey: s || !1,
            ctrlKey: n || !1,
            metaKey: a || !1,
            clientX: t,
            clientY: e,
            screenX: 2 * t,
            screenY: 2 * e,
            which: 1
        }
    },
    playInnerInstruction: function(t) {
        switch (t) {
            case "U":
                mgr.canvasDrawing.onIntervalUpdate()
        }
    },
    extractMouseEvent: function(t) {
        var e, r;
        try {
            if ($.isArray(t)) r = this.fakeEvent(t[0], t[1], !1, !1, !1, !1), e = t;
            else {
                if (r = t.e ? this.fakeEvent(t.c[0], t.c[1], t.e[0], t.e[1], t.e[2], t.e[3]) : this.fakeEvent(t[0], t[1], !1, !1, !1, !1), t.v) {
                    var s = mgr.bean.getBrush();
                    s.velocityX = t.v[0], s.velocityY = t.v[1], s.velocity = t.v[2]
                }
                e = t.c
            }
            return [e, r]
        } catch (n) {
            this.logger.log("Error extracting mouse event from: ", [t, n])
        }
    },
    brush: function() {
        var t, e, r = this.currentInstruction[RDINDEX.META_INDEX];
        this.data = this.currentInstruction[RDINDEX.DATA_INDEX], this.dataPtr = 0;
        var s = this.currentInstruction;
        switch (this.currentInstruction = null, r[0]) {
            case "Selection":
                mgr.toolManager.toolAction("select");
                break;
            case "Move":
                mgr.toolManager.toolAction("move");
                break;
            case "Eye Dropper":
                mgr.toolManager.toolAction("dropper");
                break;
            case "Flood Fill":
                mgr.toolManager.toolAction("flood");
                break;
            case "Eraser":
                mgr.toolManager.toolAction("erase");
                break;
            case "Blending":
                mgr.toolManager.toolAction("smudge");
                break;
            case "Hand Tool":
                mgr.toolManager.toolAction("hand");
                break;
            case "Text":
                "Text" != mgr.bean.getBrush().options.name && mgr.toolManager.toolAction("text");
                break;
            default:
                mgr.toolManager.toolAction("draw")
        }
        if (mgr.brushSelector.selectBrushByName(r[0]).recordPlayMeta(r)) {
            for (this.currentInstruction = s; this.data.length > this.dataPtr && (e = this.data[this.dataPtr++]) && "string" == typeof e;) this.playInnerInstruction(e);
            if (!e) return this.logger.log("Ran into bad instruction, skipping"), breakpoint(), !0;
            if (t = this.extractMouseEvent(e), !mgr.canvasDrawing.startDraw(t[0], t[1])) return !0;
            var n, a = Math.ceil(this.data.length / this.DATA_PACKET_SIZE);
            return this.currentInstruction.length >= RDINDEX.INST_TIME_INDEX + 1 ? (n = this.currentInstruction[RDINDEX.INST_TIME_INDEX], this.unscaledTPP = n / a, this.timePerPacket = this.brushSpeedAdjust(n / a)) : this.unscaledTPP = 100, this.timePerPacket = this.brushSpeedAdjust(this.unscaledTPP), this.brushMove()
        }
    },
    brushSpeedAdjust: function(t) {
        var e = 5e3 * Math.pow(mgr.bean.getPlaybackSpeed(), 2),
            r = Math.ceil(t / (1 + t / e));
        return r || (r = 100 / (1 + 100 / e)), r
    },
    brushMove: function() {
        var t, e, r = (new Date).getTime(),
            s = 500,
            n = 10,
            a = 0,
            i = this.data.length > this.dataPtr,
            o = this.MIN_TIMEOUT;
        for (this.strokeTimeout && (clearTimeout(this.strokeTimeout), this.strokeTimeout = null); i;) {
            for (var c = 0; this.data.length > this.dataPtr && this.DATA_PACKET_SIZE > c++;) e = this.data[this.dataPtr++], "string" == typeof e ? this.playInnerInstruction(e) : (t = this.extractMouseEvent(e), mgr.canvasDrawing.moveDraw(t[0], t[1], null, !0));
            a++;
            var h = (new Date).getTime();
            this.dataPtr >= this.data.length || a >= s || h - r > this.MAX_TIME_NO_YIELD ? (i = !1, slepTime = this.MIN_TIMEOUT) : a * this.timePerPacket - a * n > h - r ? (i = !1, o = Math.max(this.MIN_TIMEOUT, a * this.timePerPacket - (h - r))) : i = !0
        }
        var u = mgr.bean.getBrush();
        return u.options.hasFlush && u.flush(), this.data.length > this.dataPtr ? (this.pauseForAsync(), this.strokeTimeout = setTimeout(function() {
            this.brushMove() && (this.currentInstruction = null, this.schedule())
        }.bindTo(this), o), !1) : (this.asyncPause && (this.asyncPause = !1), this.brushEnd(), !0)
    },
    brushEnd: function() {
        var t = this.extractMouseEvent(this.data[this.data.length - 1]);
        mgr.canvasDrawing.endDraw(t[0], t[1]), mgr.bean.getBrush().options.async && this.pauseForAsync()
    },
    layer: function() {
        var t, e = this.currentInstruction[RDINDEX.META_INDEX],
            r = this.currentInstruction[RDINDEX.DATA_INDEX];
        switch (e[0]) {
            case "a":
                return t = mgr.layerManager.createLayer(!1), t.setName(r[0]), e[1] && mgr.undoManager.push(), void 0;
            case "d":
                return mgr.layerManager.remove(e[1]), void 0;
            case "o":
                return mgr.layerManager.order(e[1]), void 0;
            case "op":
                return mgr.layerManager.select(e[1]), mgr.bean.setLayerOpacity(e[2]), void 0;
            case "s":
                return mgr.layerManager.select(e[1]), void 0;
            case "rn":
                return mgr.layerManager.layers[mgr.layerManager.find(e[1])].setName(e[2]), void 0;
            case "v":
                var s = mgr.layerManager.find(e[1]);
                mgr.layerManager.layers[s].isVisible != e[2] && mgr.layerManager.layers[s].toggle();
                break;
            case "mrg":
                mgr.layerManager.mergeVisible();
                break;
            case "fh":
                mgr.layerManager.flipLayersHoriz();
                break;
            case "fv":
                mgr.layerManager.flipLayersVert();
                break;
            case "rs":
                mgr.layerManager.resize(e[1], e[2], e[3], e[4], e[5]);
                break;
            default:
                return this.logger.talkback("Drawplz - Unknown layer playback instruction:", {
                    instruction: e[0]
                }), void 0
        }
    },
    flush: function() {
        !mgr.playbackManager || !mgr.playbackManager.keyframes || mgr.bean.getPlaybackFrame() >= mgr.playbackManager.keyframes.length || (this.pauseForAsync(), mgr.playbackManager.loadFrame(mgr.bean.getPlaybackFrame(), !0, this.resumeFromAsync.bindTo(this)) || this.stop())
    },
    filter: function() {
        var t = mgr.filterManager,
            e = this.currentInstruction[RDINDEX.META_INDEX];
        "f" === e[1] ? (t.filter = e[0], t.applyFilter()) : (this.pauseForAsync(), t.filter = e[0], t.applyFilter(this.resumeFromAsync.bindTo(this)))
    },
    zoom: function() {
        var t = this.currentInstruction[RDINDEX.META_INDEX],
            e = mgr.zoomManager,
            r = Math.min(e.$drawPlzCanvas.width() / mgr.width, e.$drawPlzCanvas.height() / mgr.height),
            s = Math.min(e.$drawPlzCanvas.width() / t[2], e.$drawPlzCanvas.height() / t[3]);
        r > s ? (mgr.bean.setScale(r), e.setNavPan(0, 0)) : (mgr.bean.setScale(s), e.setNavPan(t[0], t[1]))
    },
    selection: function() {
        var t = mgr.selectionManager,
            e = this.currentInstruction[RDINDEX.META_INDEX],
            r = this.currentInstruction[RDINDEX.DATA_INDEX];
        switch (e) {
            case "inv":
                return t.selectInverse(), void 0;
            case "des":
                return t.deselect(), void 0;
            case "sall":
                return t.selectAll(), void 0;
            case "copy":
                return t.copy(), void 0;
            case "cut":
                return t.cut(), void 0;
            case "pst":
                return t.paste(), void 0;
            case "exp":
                return t.expand(t.checkExpConArg(r[0])), void 0;
            case "cnt":
                return t.contract(t.checkExpConArg(r[0])), void 0;
            case "sbc":
                return t.selectByColor(r[0], r[1]), void 0;
            case "sfl":
                return t.selectFromLayer(r[0], r[1]), void 0;
            default:
                return this.logger.talkback("Drawplz - Unknown selection playback instruction:", {
                    instruction: e
                }), void 0
        }
    },
    annotation: function() {
        var t = this.currentInstruction[RDINDEX.DATA_INDEX][0];
        t[10] ? mgr.bean.setColor(t[10]) : mgr.bean.setColor("000000"), this.pauseForAsync(), $.when(mgr.annotation.create()).then(function() {
            var e = mgr.annotation.annotationBean;
            mgr.annotation.setStyleByName(t[0]), e.setLeft(t[1]), e.setTop(t[2]), e.setWidth(t[3]), e.setArrowTip(t[5]), e.setPadding(t[6]), e.setFont(t[7]), e.setFontSize(t[8]), e.setText(t[9]), e.setHeight(t[4]), mgr.annotation.closeModal("ok"), this.resumeFromAsync()
        }.bindTo(this))
    },
    error: function() {
        this.logger.log("Error in playback: " + this.currentInstruction[RDINDEX.META_INDEX])
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/redrawReader.js");
window.KeyframeUploader = Base.extend({
    constructor: function(e, t) {
        if (this.logger = new StdLogger("File Save"), this.keyNumber = mgr.bean.getKeyframeNumber(), this.MAX_RETRIES = 5, this._construct(e, t), this.retryPoster = new RetryPoster, this.retryPoster.setOptions({
            timeoutInterval: 1e3,
            startFunction: this.spinner.bindTo(this),
            endFunction: this.stopSpinning.bindTo(this),
            errorFunction: this.postError.bindTo(this),
            retryErrors: this.retryErrors.bindTo(this),
            busyKey: "keyframe/instruction saving"
        }), vms_feature("qunit")) {
            for (var s = [], a = [], r = 0; e.length > r; r++) s.push(e[r][RDINDEX.TIME_INDEX]), a.push(e[r][RDINDEX.INST_TIME_INDEX]);
            this.saveObject.td = s, this.saveObject.ed = a
        }
    },
    _construct: function(e, t) {
        var s = mgr.on_stash ? "http://sta.sh/muro/" : "http://muro.deviantart.com/";
        this.consts = {
            START_URL: s + "record/keyframe/start",
            REQUEST_URL: s + "record/keyframe/request",
            COMPLETE_URL: s + "record/keyframe/complete",
            ERR_STR: "[Drawplz] Error in Keyframe Save: "
        };
        for (var a, r, n = [], o = mgr.layerManager.layers, i = 0; o.length > i; i++) r = o[i], a = r.changeStamp, n[a] || isSpecialChangestamp(a) || (n[a] = r.getContext().toDataURL("image/png"));
        this.saveObject = {
            type: "keyframe",
            layerMetaData: mgr.layerManager.layerMetaData(),
            changestampData: n,
            instructions: e,
            thumb: mgr.makeThumb(300, 200),
            layercount: mgr.layerManager.layers.length,
            layoutstate: JSON.stringify([
                [0, RDInst.SIZE, [mgr.width, mgr.height],
                    []
                ],
                [0, RDInst.ZOOM, mgr.zoomManager.zoomInstruction(), []],
                [0, RDInst.LAYER, ["s", mgr.bean.getSelectedLayer().getName()],
                    []
                ],
                [0, RDInst.VERSION, MURO_CONSTS.INSTRUCTIONS_VERSION, []]
            ]),
            keyframe_num: null,
            gotToComplete: !1,
            saveTime: (new Date).getTime(),
            selectChangestamp: mgr.selectionManager.selectionChangestamp,
            selection: mgr.selectionManager.selectionChangestamp ? mgr.selectionManager.selCtx.toDataURL("image/png") : null,
            callback: t
        }
    },
    postError: function(e, t) {
        var s = "string" == typeof e ? e : e.message;
        this.logger.talkback(this.consts.ERR_STR + " " + s, [e, t]), this.saveObject.callback && this.saveObject.callback(!1, s)
    },
    retryErrors: function(e, t) {
        return e > this.MAX_RETRIES ? (this.errorAlert({
            message: t.response.content.error
        }), !1) : !0
    },
    errorAlert: function(e) {
        this.logger.talkback("[muro] Unrecoverable error while saveing", [e, this.saveObject]);
        var t = "deviantART muro has encountered an unexpected error.  Continuing to draw at this point is risky and you could lose some of your work.  Press OK to reload this page (which will probably correct the problem).<br/>Last Autosave: " + mgr.bean.getSaveTimeString();
        mgr.modalManager.confirmModal("Unrecoverable Error While Saving", t, function(e) {
            return e ? (window.location.reload(!0), void 0) : (mgr.bean.getRDWriter().saveDone(), void 0)
        }.bindTo(this))
    },
    spinner: function() {
        var e = $(".white .muro-toolbar-file"),
            t = e.data("spinner");
        t || (t = new Spinner($.extend({}, SpinnerPresets.green, {
            top: 4,
            left: -2
        })), e.data("spinner", t)), t.spin(e.find("b")[0]), e.addClass("autosaving")
    },
    stopSpinning: function() {
        var e = $(".white .muro-toolbar-file"),
            t = e.data("spinner");
        t && t.stop(), e.removeClass("autosaving")
    },
    save: function() {
        this.retryPoster.post(this.consts.START_URL, this.startArgs(), this.startCallback, this)
    },
    sendChangestamps: function() {
        if (null === this.neededChangestamps) return this.postError("Trying to send changestamps when save_start hasn't returned or had error"), void 0;
        if (this.neededChangestamps.length > 0) {
            var e = parseInt(this.neededChangestamps.pop(), 10);
            this.retryPoster.post(this.consts.REQUEST_URL, this.changeStampArgs(e), this.changeStampCallback, this), this.imagesSent++
        } else this.sendComplete()
    },
    sendComplete: function() {
        this.retryPoster.post(this.consts.COMPLETE_URL, this.saveCompleteArgs(), this.completeCallback, this, {
            retryFunction: function(e, t) {
                DiFi.pushPost("DrawPlzDrafts", "should_resend_recording_keyframe_complete", [MURO_CONSTS.PROTOCOL_VERSION, mgr.bean.getRecordingDeviationId(), this.saveObject.keyframe_num], function(s, a) {
                    return s && a.response.content ? (a.response.content.should_retry ? e() : t(), void 0) : (this.logger.talkback("Drawplz - Error Getting Keyframe Request Status"), e(), void 0)
                }.bindTo(this)), DiFi.send()
            }.bindTo(this)
        })
    },
    startArgs: function() {
        return {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId(),
            layers_metadata: this.saveObject.layerMetaData,
            selection_metadata: this.saveObject.selectChangestamp
        }
    },
    changeStampArgs: function(e) {
        if (!this.saveObject.changestampData[e] && !isSpecialChangestamp(e)) throw this.logger.talkback("[Drawplz] Missing changestamp data in file save.", [this.layersState.changestampData, e]), "Missing changestamp data in file save (" + e + ")";
        var t, s;
        return isSpecialChangestamp(e) ? (t = null, s = 0) : (t = this.saveObject.changestampData[e], s = fletcher16(t)), {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId(),
            keyframe_num: this.keyNumber,
            changestamp: e,
            crc: s,
            base64data: t
        }
    },
    saveCompleteArgs: function() {
        var e = {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId(),
            keyframe_num: this.keyNumber,
            keyframe_metadata: {
                layercount: this.saveObject.layercount,
                thumb_crc: fletcher16(this.saveObject.thumb),
                base64thumb: this.saveObject.thumb,
                instructions: this.saveObject.instructions,
                layoutstate: this.saveObject.layoutstate
            },
            selection_metadata: {
                mask_changestamp: this.saveObject.selectChangestamp
            }
        };
        return this.saveObject.selectChangestamp && this.saveObject.selection && (e.selection_metadata.mask_crc = fletcher16(this.saveObject.selection), e.selection_metadata.mask_base64data = this.saveObject.selection), e
    },
    startCallback: function(e) {
        if (vms_feature("error_simulator") && this.ERROR_SIM_PROBABILITY > Math.random()) return this.logger.log("SIMULATING NETWORK ERROR IN: keyframeStart"), void 0;
        var t = JSON.parse(e);
        try {
            if (1 != t.response.status) {
                var s = "Bad status: " + t.response.status;
                throw t.response.content && t.response.content.error && (s += "  (" + t.response.content.error + ")"), s
            }
            t.response.content.selection_mask_changestamp && t.response.content.selection_mask_changestamp.length > 0 && (this.needsSelectionData = !0), this.neededChangestamps = [];
            for (var a = 0; t.response.content.changestamps.length > a; a++) this.neededChangestamps.push(t.response.content.changestamps[a]);
            t.response.content.keyframe_num > this.keyNumber && (this.saveObject.keyframe_num = this.keyNumber = t.response.content.keyframe_num, mgr.bean.setKeyframeNumber(this.keyNumber), this.sendChangestamps())
        } catch (r) {
            this.postError("Caught error in startCallback", r)
        }
    },
    changeStampCallback: function(e, t) {
        try {
            var s = JSON.parse(e);
            if (1 != s.response.status || "success" != t) {
                var a = "Bad status: " + s.response.status;
                throw s.response.content && s.response.content.error && (a += "  (" + s.response.content.error + ")"), a
            }
            this.neededChangestamps = [];
            for (var r = 0; s.response.content.changestamps.length > r; r++) this.neededChangestamps.push(s.response.content.changestamps[r]);
            this.sendChangestamps()
        } catch (n) {
            this.postError("Caught error in changeStampCallback", n)
        }
    },
    completeCallback: function() {
        this.saveObject.callback(), mgr.bean.setSaveTime(this.saveObject.saveTime)
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/keyframeUploader.js");
window.InstructionUploader = KeyframeUploader.extend({
    constructor: function(t, e) {
        this.base(t, e)
    },
    _construct: function(t, e) {
        var r = mgr.on_stash ? "http://sta.sh/muro/" : "http://muro.deviantart.com/";
        this.consts = {
            START_URL: r + "record/instructions/start",
            COMPLETE_URL: r + "record/instructions/complete",
            ERR_STR: "[Drawplz] Error in Instructions Save: "
        }, this.saveObject = {
            type: "instruction",
            instructions: t,
            keyframe_num: null,
            gotToComplete: !1,
            saveTime: (new Date).getTime(),
            callback: e
        }
    },
    save: function() {
        this.saveObject.instructions ? this.base() : this.saveObject.callback()
    },
    sendComplete: function() {
        this.retryPoster.post(this.consts.COMPLETE_URL, this.saveCompleteArgs(), this.completeCallback, this)
    },
    startArgs: function() {
        return {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId()
        }
    },
    saveCompleteArgs: function() {
        return {
            protocol_version: MURO_CONSTS.PROTOCOL_VERSION,
            encoded_deviationid: mgr.bean.getRecordingDeviationId(),
            keyframe_num: this.keyNumber,
            keyframe_metadata: {
                instructions: this.saveObject.instructions
            }
        }
    },
    startCallback: function(t) {
        if (vms_feature("error_simulator") && this.ERROR_SIM_PROBABILITY > Math.random()) return this.logger.log("SIMULATING NETWORK ERROR IN: keyframeStart"), void 0;
        var e = JSON.parse(t);
        try {
            if (1 != e.response.status) {
                var r = "Bad status: " + e.response.status;
                throw e.response.content && e.response.content.error && (r += "  (" + e.response.content.error + ")"), r
            }
            e.response.content.keyframe_num > this.keyNumber && (this.saveObject.keyframe_num = this.keyNumber = e.response.content.keyframe_num, mgr.bean.setKeyframeNumber(this.keyNumber), this.sendComplete())
        } catch (s) {
            this.errorRetry("start", s)
        }
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/instructionUploader.js");
window.PlaybackManager = Base.extend({
    constructor: function(e) {
        this.logger = new StdLogger("Recorded Playback"), this.playState = null, this.playTimer = null, this.asyncTimer = null, this.preloader = new ChangestampPreloader, this.keyframes = null, this.autoplay = e, this.numErrors = 0, this.MAX_ERRORS = 5, window.rd_json = window.recdraw_json = function(e) {
            mgr.playbackManager.jsonCallback(e)
        };
        var t = $(".drawPlz .playbackDP .pieceInfo"),
            a = t.attr("id");
        a && this.loadRecording(a), this.recordingDeviationHref = t.attr("deviation_href"), this.bindBean(), this.bindHtml(), this.makeCanvas()
    },
    bindBean: function() {
        mgr.bean.subscribe("playbackFrame", this.positionScrubber.bindTo(this)), mgr.bean.subscribe("framePercent", this.positionScrubber.bindTo(this))
    },
    clearTimers: function() {
        this.playTimer && (clearTimeout(this.playTimer), this.playTimer = null), this.asyncTimer && (clearTimeout(this.asyncTimer), this.asyncTimer = null, this.getRdr().clearTimers())
    },
    getTarget: function() {
        return mgr.isEmbedded ? "_blank" : mgr.isCinema ? "_top" : "_self"
    },
    bindHtml: function() {
        $(document).on("click", ".rdControls .playButtonReady", this.playbuttonClick.bindTo(this));
        var e = this;
        $(document).on("click", "#playbackBy a.u", function() {
            return window.open($(this).attr("href"), e.getTarget()), !1
        }), $(document).on("click", ".pauseDrawer img.avatar", function() {
            return window.open($(this).parents("a").attr("href"), e.getTarget()), !1
        }), $(document).on("click", "#playbackTitle", function() {
            return window.open($(this).parents(".pieceInfo").attr("deviation_href"), e.getTarget()), !1
        }), $(document).on("click", ".playbackStoptouch", function() {
            return this.convoluteClick(this), !1
        }.bindTo(this)), $(document).on("click", ".resumeButton", function() {
            return this.playbuttonClick(this), !1
        }.bindTo(this)), $(document).on("click", ".replayButton", function() {
            return this.playbuttonClick(this), !1
        }.bindTo(this)), $(document).on("click", ".pauseDrawer", function() {
            return !1
        }), $(document).on("click", ".drawWMuro", function() {
            return window.open("http://sta.sh/muro", this.getTarget()), !1
        }.bindTo(this)), $(document).on("mousedown", ".turtleButton", function() {
            mgr.bean.setPlaybackSpeed(mgr.bean.getPlaybackSpeed() + .1)
        }), $(document).on("mousedown", ".rabbitButton", function() {
            mgr.bean.setPlaybackSpeed(mgr.bean.getPlaybackSpeed() - .1)
        }), $(document).on("click", ".dAButton", function() {
            window.open(this.recordingDeviationHref, "blank")
        }.bindTo(this)), window.addEventListener("message", function(e) {
            switch (e.data) {
                case "pause":
                    this.pauseIfPlaying()
            }
        }.bindTo(this), !1)
    },
    pauseIfPlaying: function() {
        var e = this.getRdr();
        e.playing && this.playbuttonClick()
    },
    convoluteClick: function() {
        this.keyframes.length > mgr.bean.getPlaybackFrame() ? this.playbuttonClick() : mgr.pauseDrawer && (!$(".pauseDrawer").is(":visible") || 50 > $(".pauseDrawer").height()) ? ($(".pauseDrawer").show(), this.pauseDrawer()) : $(".pauseDrawer").hide()
    },
    playbuttonClick: function() {
        var e = this.getRdr();
        return e.playing ? ($(".rdControls .playButton").removeClass("playButtonPlaying"), e.stop(), this.pauseDrawer()) : (e.asyncPause = !1, mgr.bean.getPlaybackFrame() >= this.keyframes.length && mgr.bean.setPlaybackFrame(0), $(".pauseDrawer").css("height", "0"), this.play()), !1
    },
    loadRecording: function(e) {
        $(".rdControls .playButton").removeClass("playButtonReady").addClass("playButtonLoading"), this.allLoaded = !1, this.playbackStartTime = 0, DiFi.pushPost("DrawPlzDrafts", "load_recording", [MURO_CONSTS.PROTOCOL_VERSION, e], function(t, a) {
            if (!t) return this.numErrors++ > this.MAX_ERRORS ? this.logger.talkback("Drawplz - Error Getting Playback Frames", a) : setTimeout(function() {
                this.loadRecording(e)
            }.bindTo(this), 100), void 0;
            this.numErrors = 0, mgr.reset(a.response.content.width, a.response.content.height), mgr.bean.setHandDrawn(!1), mgr.zoomManager.simonFitToScreen(), this.keyframes = a.response.content.keyframes;
            for (var r = 0; this.keyframes.length > r; r++) this.keyframes[r].loaded = !1;
            this.keyframes.length > 1 ? (this.createPlaybackControls(), this.loadJson(), this.loadFrame(0, this.autoplay)) : this.loadFrame(0, !0)
        }.bindTo(this)), DiFi.send()
    },
    makeCanvas: function() {
        var e = $(".rdScrubber .trackPercentage");
        if (!e.length) return setTimeout(this.makeCanvas.bindTo(this), 100), void 0;
        this.trackCanvas = new Canvas(e.get(0));
        var t = e.width(),
            a = e.height();
        this.trackCanvas.init(t, a, !0)
    },
    positionScrubber: function() {
        if (this.keyframes) {
            var e = this.keyframes.length;
            if (e > 0 && this.$track && this.$knob) {
                var t = Math.min(1, Math.max(0, (mgr.bean.getPlaybackFrame() - 1 + mgr.bean.getFramePercent()) / (e - 1)));
                mgr.sliderManager.setVal($(".rdScrubber"), t, Math.floor(100 * t), "%")
            }
        }
    },
    createPlaybackControls: function() {
        var e = "artist";
        $(".drawPlzContainer").is(".embedded") ? e = "embed" : $(".drawPlzContainer").is(".cinema") && (e = "cinema"), DiFi.pushPost("DrawPlzModals", "recordedDrawingPlayback", [e], function(e, t) {
            if (!e) return this.numErrors++ > this.MAX_ERRORS ? this.logger.talkback("Drawplz - Error Getting Playback Controls", t) : setTimeout(function() {
                this.loadRecording(recordingDeviationId)
            }.bindTo(this), 100), void 0;
            this.numErrors = 0, $(".drawPlzControls").append(t.response.content.htmlContent), mgr.layoutManager.setLayoutMode(MODE_PLAYBACK), this.$knob = $(".drawPlzControls .rdScrubber .knob"), this.$track = $(".drawPlzControls .rdScrubber .track");
            var a = $(".rdThumbs");
            mgr.showControls || $(".rdPlayback").hide();
            var r = $(".rdThumbs .thumbScroller");
            this.trackLength = this.$track.width(), new Dragger([this.$knob.get(0), this.$track.get(0)], this.$track.get(0), function() {
                rdr = mgr.bean.getRDReader(), rdr && (null === this.playState && (this.playState = rdr.playing), rdr.stop()), this.logger.log("On press, playstate is: ", this.playState), this.$lastThumb = $(this.keyframes[this.keyframes.length - 1].thumbNode), a.show(), $(".pauseDrawer").css("height", "0")
            }.bindTo(this), function(e) {
                var t = Math.min(1, Math.max(0, e[0] / this.trackLength));
                mgr.sliderManager.setVal($(".rdScrubber"), t, Math.floor(100 * t), "%");
                var s;
                if (s = 0 === t ? 0 : Math.max(0, Math.min(this.keyframes.length - 1, Math.round(t * this.keyframes.length))), this.shownFrame != s) {
                    var i = $(this.keyframes[s].thumbNode);
                    a.find(".genieThumb").removeClass("genieThumb"), a.find(".almostGenieThumb").removeClass("almostGenieThumb"), i.addClass("genieThumb"), s > 0 && $(this.keyframes[s - 1].thumbNode).addClass("almostGenieThumb"), this.keyframes.length - 1 > s && $(this.keyframes[s + 1].thumbNode).addClass("almostGenieThumb");
                    var n = i.offset(),
                        o = r.offset(),
                        l = this.$lastThumb.offset(),
                        h = n.left - o.left + i.width() / 2,
                        d = l.left - o.left + this.$lastThumb.width(),
                        c = Math.max(0, h - a.width() / 2),
                        m = Math.max(0, d - a.width() + 10);
                    a.scrollLeft(Math.min(c, m))
                }
                this.shownFrame = s
            }.bindTo(this), function() {
                this.logger.log("On release, playstate is: ", this.playState), null === this.playState && (this.playState = !0), this.loadFrame(this.shownFrame, this.playState), this.playState = null, a.hide()
            }.bindTo(this));
            var s = mgr.$mainNode.find(".playbackSpeedSlider"),
                i = s.find(".knob").get(0),
                n = s.find(".track").get(0),
                o = $(n).width();
            new Dragger([i, n], n, function() {}, function(e) {
                var t = Math.max(0, Math.min(1, e[0] / o));
                mgr.bean.setPlaybackSpeed(1 - t)
            }, function() {}), mgr.bean.subscribe("playbackSpeed", function() {
                var e = mgr.bean.getPlaybackSpeed();
                mgr.sliderManager.setVal($(".playbackSpeedSlider"), 1 - e, "", "")
            });
            var l = parseFloat(safeLocalGet("drawplz_playbackSpeed", 0));
            mgr.bean.setPlaybackSpeed(l), mgr.layoutManager.resizeDrawingArea(), this.loadThumbs()
        }.bindTo(this)), DiFi.send()
    },
    loadThumbs: function() {
        var e = $(".rdPlayback .thumbScroller");
        e.empty();
        for (var t = 0; this.keyframes.length > t; t++) {
            var a = this.keyframes[t],
                r = "keyframeThumb";
            this.keyframes[t].thumbNode = $('<img class="' + r + '" src="' + a.thumburl + '"/>').appendTo(e)
        }
    },
    loadJson: function() {
        for (var e = 0; this.keyframes.length > e; e++) {
            var t = this.keyframes[e];
            if (!t.instructions) {
                if (this.kf_json_loading = t, t.startPercentage = e / this.keyframes.length, t.endPercentage = (e + 1) / this.keyframes.length, t.jsonurl) {
                    this.logger.log("Loading script: ", t.jsonurl);
                    var a = document.createElement("script");
                    return a.type = "text/javascript", a.src = window.isVM && vms_feature("vm_fileserving") ? t.jsonurl : t.jsonurl + "/recdraw_json", document.getElementsByTagName("head")[0].appendChild(a), void 0
                }
                t.instructions = !0, this.markLoaded(t), t.loaded = !0
            }
        }
        this.kf_json_loading = null, $(".rdControls .playButton").addClass("playButtonReady").removeClass("playButtonLoading")
    },
    loadFrame: function(e, t, a) {
        var r = !1;
        try {
            this.clearTimers();
            var s = this.keyframes[e],
                i = s.load_data;
            mgr.bean.setPlaybackFrame(e + 1), this.playbackFrame = e;
            var n = new FileLoad(null, function() {
                s.layoutstate ? this.getRdr().playback(s.layoutstate, function() {
                    t ? this.play() : this.playTimer = setTimeout(this.dontPlayIfReady.bindTo(this), 1e3), a && a()
                }.bindTo(this)) : t && (this.play(), a && a())
            }.bindTo(this), this.preloader),
                o = s.load_data.selection ? s.load_data.selection.mask_fileurl : null;
            r = n.loadLayers(i.layers, o)
        } catch (l) {
            this.logger.talkback("Error loading frame: ", l)
        }
        return r
    },
    markLoaded: function(e) {
        if (!this.trackCanvas) return setTimeout(function() {
            this.markLoaded(e)
        }.bindTo(this), 100), void 0;
        var t = this.trackCanvas.context,
            a = Math.round(this.trackCanvas.height / 2);
        t.strokeStyle = "#ffffff", t.lineWidth = 2 * a, t.lineCap = "round";
        var r = Math.floor(e.startPercentage * this.trackCanvas.width) - 1,
            s = Math.floor(e.endPercentage * this.trackCanvas.width) + 1;
        t.beginPath(), t.moveTo(r, a), t.lineTo(s, a), t.stroke()
    },
    jsonCallback: function(e) {
        var t = this.kf_json_loading;
        this.kf_json_loading.instructions = e, this.kf_json_loading.loaded = !0, this.markLoaded(t), !this.playbackStartTime && t.instructions.length > 0, vms_feature("error_simulator") ? setTimeout(this.loadJson.bindTo(this), 500) : this.loadJson(), t == this.keyframes[0] && this.loadFrame(0, !1)
    },
    getRdr: function() {
        var e;
        return (e = mgr.bean.getRDReader()) || (e = new RedrawReader, mgr.bean.setRDReader(e)), e
    },
    doubleCheckLayers: function(e) {
        var t = this.keyframes[e],
            a = mgr.layerManager,
            r = t.load_data.layers.sort(function(e, t) {
                return e.order - t.order
            });
        if (r.length != a.layers.length) return this.logger.log("ERROR: Layers.length is wrong!"), breakpoint(), this.loadFrame(e, !0), !1;
        for (var s = 0; r.length > s; s++) {
            var i = r[s],
                n = a.layers[s];
            if (i.changestamp = parseInt(i.changestamp, 10), i.name != n.name && (this.logger.log("Error, layer had wrong name (was " + n.name + " should have been " + i.name + ")"), n.setName(i.name)), $(n.canvasDom).css("opacity", i.opacity), mgr.bean.getSelectedLayer() == n && mgr.bean.setLayerOpacity(i.opacity), n.isVisible() != (1 == i.visible) && n.toggle(), i.changestamp != n.changeStamp) {
                var o, l = n.getContext();
                l.save(), l.globalAlpha = 1, l.globalCompositeOperation = "source-over", l.shadowColor = "rgba(0,0,0,0)", isSpecialChangestamp(i.changestamp) ? (l.clearToColor(getSpecialColor(i.changestamp)), n.changeStamp = i.changestamp) : (o = this.preloader.getImage(i.changestamp)) && (l.clear(), l.drawImage(o, 0, 0), n.changeStamp = i.changestamp), l.restore()
            }
        }
        return !0
    },
    preload: function(e) {
        var t, a, r = [];
        if (this.keyframes.length - 1 > e) for (t = this.keyframes[e + 1], i = 0; t.load_data.layers.length > i; i++) a = t.load_data.layers[i], this.preloader.preload(a.changestamp, a.fileurl), r.push(a.changestamp);
        if (this.keyframes.length - 2 > e) for (t = this.keyframes[e + 2], i = 0; t.load_data.layers.length > i; i++) a = t.load_data.layers[i], this.preloader.preload(a.changestamp, a.fileurl), r.push(a.changestamp);
        this.preloader.clearExcept(r)
    },
    isPlayReady: function() {
        if (this.allLoaded) return !0;
        for (var e = mgr.bean.getPlaybackFrame(), t = Math.min(this.keyframes.length, e + 3), a = 0; t > a; a++) if (!this.keyframes[a].loaded) return !1;
        return e == this.keyframes.length - 1 && (this.allLoaded = !0), !0
    },
    playIfReady: function() {
        this.isPlayReady() ? ($(".rdControls .playButton").addClass("playButtonReady").removeClass("playButtonLoading"), this.play()) : (this.clearTimers(), this.playTimer = setTimeout(this.playIfReady.bindTo(this), 200))
    },
    dontPlayIfReady: function() {
        if (this.isPlayReady()) {
            $(".rdControls .playButton").addClass("playButtonReady").removeClass("playButtonLoading");
            var e = this.getRdr();
            e.stop()
        } else this.clearTimers(), this.playTimer = setTimeout(this.dontPlayIfReady.bindTo(this), 200)
    },
    play: function() {
        var e = mgr.bean.getPlaybackFrame();
        (mgr.layoutManager.getAppType() == APP_TYPE_EMBEDDED || mgr.layoutManager.getAppType() == APP_TYPE_CINEMA) && (mgr.$mainNode.find(".canvasContainer").is(":visible") || mgr.$mainNode.find(".canvasContainer").show(), mgr.$mainNode.find(".embedCover").remove());
        var t = this.getRdr();
        return e >= this.keyframes.length ? (t.stop(), mgr.zoomManager.isInFrame(0, 0) && mgr.zoomManager.isInFrame(mgr.width, mgr.height) || mgr.zoomManager.fitToScreen(), mgr.isEmbedded || this.pauseDrawer(), void 0) : e ? (this.isPlayReady() ? ($(".rdControls .playButton").addClass("playButtonReady").removeClass("playButtonLoading"), this._play()) : ($(".rdControls .playButton").removeClass("playButtonReady").addClass("playButtonLoading"), t.stop(), this.clearTimers(), this.playTimer = setTimeout(this.playIfReady.bindTo(this), 200)), void 0) : (this.loadFrame(0, !0), void 0)
    },
    _play: function() {
        var e = this.getRdr();
        if (e.asyncPause) return this.logger.log("Async Pause"), this.clearTimers(), this.asyncTimer = setTimeout(this._play.bindTo(this), 100), void 0;
        var t = mgr.bean.getPlaybackFrame();
        e.playback(this.keyframes[t].instructions, function() {
            return this.preload(t), this.doubleCheckLayers(t) ? (this.keyframes.length - 1 > this.playbackFrame ? (mgr.bean.setPlaybackFrame(t + 1), this.play()) : (mgr.bean.getRDReader().stop(), mgr.zoomManager.fitToScreen(), this.pauseDrawer()), void 0) : (e.stop(), void 0)
        }.bindTo(this))
    },
    needUndoPush: function() {
        try {
            var e = 0,
                t = 0,
                a = mgr.bean.getPlaybackFrame(),
                r = this.getRdr().instructionPtr;
            if (!this.keyframes || !this.keyframes.length || !this.keyframes[a]) return !0;
            if ("string" == typeof this.keyframes[a].instructions) try {
                this.keyframes[a].instructions = JSON.parse(this.keyframes[a].instructions)
            } catch (s) {
                this.logger.log("Error parsing json: ", this.keyframes[a].instructions), this.keyframes[a].instructions = [
                    [0, "err", "corrupt json", [], 0]
                ]
            }
            for (var i = this.keyframes[a].instructions; mgr.undoManager.MAX_LEVELS >= e;) {
                if (r >= i.length) {
                    if (a++, a >= this.keyframes.length) return !1;
                    if (r = 0, "string" == typeof this.keyframes[a].instructions) try {
                        this.keyframes[a].instructions = JSON.parse(this.keyframes[a].instructions)
                    } catch (s) {
                        this.logger.log("Error parsing json: ", this.keyframes[a].instructions), this.keyframes[a].instructions = [
                            [0, "err", "corrupt json", [], 0]
                        ]
                    }
                    i = this.keyframes[a].instructions
                }
                if (!i[r]) return !0;
                switch (i[r][RDINDEX.NAME_INDEX]) {
                    case RDInst.UNDO:
                        if (1 >= --t) return !0;
                        break;
                    case RDInst.BRUSH:
                        switch (i[r][RDINDEX.META_INDEX]) {
                            case "Eye Dropper":
                            case "Hand Tool":
                                break;
                            case "Selection":
                            case "Move":
                            case "Flood Fill":
                            case "Eraser":
                            case "Blending":
                            case "Text":
                            default:
                                t++, e++
                        }
                        break;
                    case RDInst.LAYER:
                    case RDInst.SELECTION:
                    case RDInst.FILTER:
                    case RDInst.FLUSH:
                        t++, e++;
                        break;
                    case RDInst.TOOLMANAGER:
                    case RDInst.ZOOM:
                        break;
                    case RDInst.ERROR:
                    default:
                        return this.logger.log("Error/default true: ", i[r][RDINDEX.NAME_INDEX]), !0
                }
                r++
            }
            return !1
        } catch (s) {
            return this.logger.log("Error in checking undo push: ", s), !0
        }
    },
    pauseDrawer: function() {
        return mgr.pauseDrawer ? (this.keyframes.length > mgr.bean.getPlaybackFrame() ? ($(".pauseDrawer .resumeButton").show(), $(".pauseDrawer .replayButton").hide()) : ($(".pauseDrawer .resumeButton").hide(), $(".pauseDrawer .replayButton").show()), $(".pauseDrawer").css("height", "92px"), void 0) : ($(".pauseDrawer").hide(), void 0)
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/playbackManager.js");
window.ChangestampPreloader = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Changestamp Preloader"), this.preloadStack = [], this.images = [], this.fetching = !1, this.FETCH_TIMEOUT = 3e3
    },
    preload: function(t, e) {
        if (t = parseInt(t), !isSpecialChangestamp(t)) {
            for (var i = 0; this.images.length > i; i++) if (this.images[i][0] == t) return;
            if (!e) return this.images.push([t, !1]), void 0;
            this.preloadStack.push([t, e]), this.fetch()
        }
    },
    getImage: function(t) {
        t = parseInt(t);
        for (var e = 0; this.images.length > e; e++) if (this.images[e][0] == t) return this.images[e][1];
        return null
    },
    fetch: function() {
        if (!this.fetching && this.preloadStack.length) {
            var t = this.preloadStack.shift(),
                e = parseInt(t[0]),
                i = mgr.imageImporter.convertURL(t[1]),
                s = new Image;
            $(s).attr("title", e), s.onload = function() {
                this.images.push([e, s]), this.fetching = !1, clearTimeout(this.fetchTimeout), this.fetch()
            }.bindTo(this), this.fetching = !0, this.fetchTimeout = setTimeout(this.giveUp.bindTo(this), this.FETCH_TIMEOUT), $(s).attr("src", i)
        }
    },
    clearExcept: function(t) {
        var e, i, s;
        for (e = this.images.length - 1; e >= 0; e--) {
            for (s = !1, i = 0; t.length > i; i++) if (parseInt(t[i]) == this.images[e][0]) {
                s = !0;
                break
            }
            s || this.images.splice(e, 1)
        }
        for (e = this.preloadStack.length - 1; e >= 0; e--) {
            for (s = !1, i = 0; t.length > i; i++) if (parseInt(t[i]) == this.preloadStack[e][0]) {
                s = !0;
                break
            }
            s || this.preloadStack.splice(e, 1)
        }
    },
    giveUp: function() {
        this.fetching = !1, this.fetch()
    }
}), window.DWait && DWait.run("jms/pages/drawplz/redraw/changestampPreloader.js");
DWait.ready(["jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js"], function() {
    window.TabManager = Base.extend({
        constructor: function() {
            this.logger = new StdLogger("Tabs"), this.bindHtml(), this.sidebar = null, this.tabPromise = null
        },
        bindHtml: function() {
            mgr.$mainNode.on("click", ".sidebarTabButton", this.tabClick)
        },
        tabClick: function() {
            var a = mgr.$mainNode.find(".sidebarTabSelected");
            if (a.get(0) != this) return a.is(".postTab") ? (mgr.tabManager.tabPromise = mgr.postProcessor.cleanAndPush(), mgr.tabManager.tabPromise.done(function() {
                mgr.layoutManager.muroToolbar.enableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), mgr.tabManager.switchTo(this), mgr.undoManager.setDisabledStates()
            }.bindTo(this))) : a.is(".toolsTab") ? (mgr.tabManager.toolTabBrush = mgr.bean.getBrush(), mgr.tabManager.tabPromise = null, mgr.tabManager.switchTo(this)) : a.is(".presetsTab") ? (mgr.tabManager.tabPromise = mgr.presetManager.cleanAndPush(), PubSub.unsubscribe([{
                eventname: "muro.selectionChange",
                subscriber: mgr.presetManager
            }]), mgr.tabManager.tabPromise.done(function() {
                mgr.layoutManager.muroToolbar.enableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), mgr.tabManager.switchTo(this), mgr.undoManager.setDisabledStates()
            }.bindTo(this))) : a.is(".importTab") ? (PubSub.unsubscribe([{
                eventname: "StashEmbedded.folder_loaded",
                subscriber: this
            }, {
                eventname: "StashEmbedded.root_loaded",
                subscriber: this
            }]), mgr.$mainNode.find(".sidebarTabs").show(), mgr.$mainNode.find(".stashSidebarTab").hide(), mgr.layoutManager.muroToolbar.enableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), mgr.tabManager.switchTo(this)) : (mgr.tabManager.tabPromise = null, mgr.tabManager.switchTo(this)), !1
        },
        switchTo: function(a) {
            var e = null;
            return mgr.$mainNode.find(".sidebarTab").hide(), mgr.$mainNode.find(".sidebarTabSelected").removeClass("sidebarTabSelected"), $(a).addClass("sidebarTabSelected"), $(a).is(".toolsTab") ? (mgr.$mainNode.find(".toolsSidebarTab").show(), mgr.$mainNode.find(".stoptouchGreyer").hide(), mgr.toolManager.toolAction("draw"), mgr.keyHandler.noAlterOff(), this.toolTabBrush && (mgr.bean.setBrush(this.toolTabBrush), this.toolTabBrush = null), mgr.layoutManager.showTools()) : $(a).is(".postTab") ? (mgr.bean.setIsLargeBrushArea(!1), mgr.$mainNode.find(".postSidebarTab").show(), mgr.$mainNode.find(".stoptouchGreyer").hide(), mgr.toolManager.toolAction("select"), mgr.layoutManager.hideTools(), mgr.keyHandler.noAlterOn(), mgr.layoutManager.muroToolbar.disableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), e = mgr.postProcessor.createUI()) : $(a).is(".presetsTab") ? (mgr.bean.setIsLargeBrushArea(!1), mgr.$mainNode.find(".presetsSidebarTab").show(), mgr.$mainNode.find(".stoptouchGreyer").hide(), mgr.toolManager.toolAction("select"), mgr.layoutManager.hideTools(), mgr.keyHandler.noAlterOn(), mgr.layoutManager.muroToolbar.disableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), mgr.presetManager.activateUI(), e = mgr.presetManager.refreshPreview()) : $(a).is(".importTab") && (PubSub.subscribe([{
                eventname: "StashEmbedded.folder_loaded",
                subscriber: this,
                callback: mgr.imageImporter.filterFunc
            }, {
                eventname: "StashEmbedded.root_loaded",
                subscriber: this,
                callback: mgr.imageImporter.filterFunc
            }]), mgr.$mainNode.find(".sidebarTabs").hide(), mgr.layoutManager.resizeTabStoptouch(), mgr.$mainNode.find(".stashSidebarTab").show(), mgr.$mainNode.find(".stoptouchGreyer").show(), mgr.keyHandler.noAlterOn(), mgr.layoutManager.muroToolbar.disableBlock(mgr.layoutManager.muroToolbar.adjustDisablements), mgr.layoutManager.blurTop(), mgr.layoutManager.blurBottom(), mgr.$mainNode.find(".stashSidebarTab").show(), this.sidebar ? this.sidebar.display() : this.sidebar = new WriterSidebar(".sidebarMain", function(a) {
                if (a.find("a.thumb").data("super-img")) {
                    var e;
                    (e = a.find("a.thumb").data("super-full-img")) || (e = a.find("a.thumb").data("super-img"));
                    var r = a.parent("[gmi-flat_title]").attr("gmi-flat_title");
                    mgr.imageImporter.enterModalMode({
                        thumbUrl: e,
                        name: r
                    }).done(function() {
                        mgr.$mainNode.find(".toolsTab").click()
                    })
                }
            }, {
                sections: ["gallery", "stash", "art"],
                drop_zone: $("body"),
                initial_selection: "stash",
                upload_thumb: !0,
                stash_filter: ""
            }), e = $.Deferred().resolve()), mgr.layoutManager.resizeSidebar(), mgr.safari5.mainResize(), e
        },
        currentTab: function() {
            return mgr.$mainNode.find(".sidebarTabSelected").is(".toolsTab") ? "tools" : mgr.$mainNode.find(".sidebarTabSelected").is(".postTab") ? "post" : mgr.$mainNode.find(".sidebarTabSelected").is(".presetsTab") ? "preset" : "import"
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/tabManager.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/dragger.js", "jms/pages/drawplz/slider.js", "jms/pages/drawplz/annotationStyles/arrow.js", "jms/pages/drawplz/annotationStyles/sticky.js", "jms/pages/drawplz/annotationStyles/speech.js", "jms/pages/drawplz/annotationStyles/blank.js"], function() {
    window.Annotation = Base.extend({
        constructor: function() {
            this.logger = new StdLogger("Annotations"), this.annotationBean = new AnnotationBean, this.bindHtml(), this.loadStyles()
        },
        bindHtml: function() {
            $(document).on("click", ".snFontButton", function() {
                mgr.modalManager.fontPicker(this.annotationBean.getFont(), function(t) {
                    this.annotationBean.setFont(t)
                }.bindTo(this))
            }.bindTo(this)), $(document).on("click", ".snOK", function() {
                this.closeModal("ok")
            }.bindTo(this)), $(document).on("click", ".snCancel", function() {
                this.closeModal("cancel")
            }.bindTo(this)), $(document).on("click", ".snAlignLeft", function() {
                this.annotationBean.setTextAlignment("left")
            }.bindTo(this)), $(document).on("click", ".snAlignCenter", function() {
                this.annotationBean.setTextAlignment("center")
            }.bindTo(this)), $(document).on("click", ".snAlignRight", function() {
                this.annotationBean.setTextAlignment("right")
            }.bindTo(this)), $(window).resize(function() {
                this.active && this.layout()
            }.bindTo(this))
        },
        bindBean: function() {
            this.annotationBean.subscribe(["width", "height", "left", "top", "arrowTip", "currentStyle"], function() {
                this.annotationBean.getCurrentStyle().draw(this.layer.ctx)
            }.bindTo(this)), this.annotationBean.subscribe(["width", "text", "fontSize", "textAlignment", "currentStyle"], this.writeText.bindTo(this)), this.annotationBean.subscribe(["textAlignment"], this.highlightAlignment.bindTo(this)), this.annotationBean.subscribe(["width", "height", "left", "top"], this.updateSticky.bindTo(this)), this.annotationBean.subscribe("arrowTip", function() {
                var t = mgr.bean.getScale(),
                    n = this.annotationBean.getArrowTip();
                this.$stoptouch.find(".snArrowDrag").css("left", t * n[0] - 7).css("top", t * n[1] - 7)
            }.bindTo(this)), this.$stoptouch.find(".snTextArea").on("keyup", function() {
                this.annotationBean.setText(this.$stoptouch.find(".snTextArea").val())
            }.bindTo(this)), this.annotationBean.subscribe(["currentStyle"], function() {
                safeLocalSet("drawplz_annotationStyle", this.annotationBean.getCurrentStyle().getName())
            }.bindTo(this)), this.annotationBean.subscribe(["textAlignment"], function() {
                safeLocalSet("drawplz_annotationAlign", this.annotationBean.getTextAlignment())
            }.bindTo(this)), this.annotationBean.subscribe(["fontSize"], function() {
                safeLocalSet("drawplz_lastFontSize", this.annotationBean.getFontSize()), this.updateFontSize()
            }.bindTo(this)), this.annotationBean.subscribe(["font"], function() {
                var t = this.annotationBean.getFont();
                this.$stoptouch.find(".snFontButton").html(t), mgr.fontManager.loadFont(t, this.writeText.bindTo(this)), safeLocalSet("drawplz_lastFont", t)
            }.bindTo(this))
        },
        bindDraggers: function() {
            this.stickyDragger = new Dragger([this.$stoptouch.find(".snTextCanvas").get(0)], this.$stoptouch.find(".snWindowMain").get(0), this.startDragSticky.bindTo(this), this.dragSticky.bindTo(this), this.endDragSticky.bindTo(this)), this.leftHandleDragger = new Dragger([this.$stoptouch.find(".snLeftDrag").get(0)], this.$stoptouch.find(".snWindowMain").get(0), function(t) {
                this.startCoords = t, this.startWidth = this.annotationBean.getWidth(), this.startLeft = this.annotationBean.getLeft()
            }.bindTo(this), function(t) {
                t[0] = Math.max(0, t[0]);
                var n = (t[0] - this.startCoords[0]) / mgr.bean.getScale(),
                    i = Math.max(100, this.startWidth - n),
                    a = this.startLeft - (i - this.startWidth);
                this.annotationBean.setWidth(i), this.annotationBean.setLeft(a)
            }.bindTo(this), function() {}.bindTo(this)), this.rightHandleDragger = new Dragger([this.$stoptouch.find(".snRightDrag").get(0)], this.$stoptouch.find(".snWindowMain").get(0), function(t) {
                this.startCoords = t, this.startWidth = this.annotationBean.getWidth(), this.startLeft = this.annotationBean.getLeft()
            }.bindTo(this), function(t) {
                t[0] = Math.min(this.$stoptouch.find(".snWindowMain").width() - 3, t[0]);
                var n = (t[0] - this.startCoords[0]) / mgr.bean.getScale();
                this.annotationBean.setWidth(Math.max(100, this.startWidth + n))
            }.bindTo(this), function() {}.bindTo(this)), this.arrowHandleDragger = new Dragger([this.$stoptouch.find(".snArrowDrag").get(0)], this.$stoptouch.find(".snWindowMain").get(0), function(t) {
                this.startCoords = t, this.startArrow = this.annotationBean.getArrowTip()
            }.bindTo(this), function(t) {
                t[0] = Math.max(0, Math.min(this.$stoptouch.find(".snWindowMain").width() - 3, t[0]));
                var n = (t[0] - this.startCoords[0]) / mgr.bean.getScale();
                t[1] = Math.max(0, Math.min(this.$stoptouch.find(".snWindowMain").height() - 3, t[1]));
                var i = (t[1] - this.startCoords[1]) / mgr.bean.getScale();
                this.annotationBean.setArrowTip([this.startArrow[0] + n, this.startArrow[1] + i])
            }.bindTo(this), function() {});
            var t = this.$stoptouch.find(".snSizeSlider"),
                n = t.find(".knob").get(0),
                i = t.find(".track").get(0);
            new Dragger([n, i], i, function() {
                this.getTrackWidth()
            }.bindTo(this), function(t) {
                var n = Math.max(0, Math.min(1, t[0] / this.trackWidth)),
                    i = 8 + Math.round(92 * n);
                this.annotationBean.setFontSize(i)
            }.bindTo(this), function() {})
        },
        getTrackWidth: function() {
            return this.trackWidth = this.$stoptouch.find(".snSizeSlider .track").width(), this.trackWidth
        },
        loadStyles: function() {
            this.styles = [new StickyAnnotationStyle(this.annotationBean), new SpeechAnnotationStyle(this.annotationBean), new ArrowAnnotationStyle(this.annotationBean), new BlankAnnotationStyle(this.annotationBean)]
        },
        setStyleByName: function(t) {
            for (var n = 0; this.styles.length > n; n++) this.styles[n].getName() == t && this.annotationBean.setCurrentStyle(this.styles[n])
        },
        create: function() {
            var t = $.Deferred();
            return DiFi.pushPost("DrawPlzModals", "annotation", [], function(n, i) {
                if (!n) return talkback("Drawplz - Error getting modal: ", i), void 0;
                var a = mgr.bean.getRDWriter();
                a.startInstruction(RDInst.ANNOTATION, []), i.response.content.pageData && $.extend(window.deviantART.pageData, i.response.content.pageData), this.$stoptouch = $(i.response.content.topContent.trim()).insertBefore(mgr.$mainNode.find(".drawPlzApp")), this.$sticky = this.$stoptouch.find(".snStickyDrag"), this.layout(), this.bindBean(), this.bindDraggers(), this.createCanvas(), this.createLayer(), mgr.layoutManager.blurTop(), mgr.layoutManager.blurBottom(), this.createStyleButtons(), this.tweakLayout(), this.annotationBean.startAtomic();
                try {
                    this.setStyleByName(safeLocalGet("drawplz_annotationStyle", "sticky")), this.annotationBean.setTextAlignment(safeLocalGet("drawplz_annotationAlign", "center"), !0), this.annotationBean.setFont(safeLocalGet("drawplz_lastFont", "Lato"), !0), this.annotationBean.setFontSize(safeLocalGet("drawplz_lastFontSize", 12), !0), this.annotationBean.setText(this.$stoptouch.find(".snTextArea").val(), !0), this.defaultPosition()
                } finally {
                    this.annotationBean.endAtomic()
                }
                this.annotationBean.getCurrentStyle().draw(this.layer.ctx), this.highlightAlignment(), this.active = !0, t.resolve()
            }.bindTo(this)), DiFi.send(), t
        },
        tweakLayout: function() {
            var t = 125;
            this.$stoptouch.find(".snFooterGrayer").height(t), mgr.bean.setIsLargeBrushArea(!1)
        },
        defaultPosition: function() {
            var t = mgr.bean.getScale(),
                n = mgr.$mainNode.find(".drawPlzCanvas"),
                i = n.width() / t,
                a = n.height() / t,
                e = 300 > i ? 100 : 200,
                o = Math.min((n.scrollLeft() + 100) / t, Math.max(10, i - e - 20)),
                s = Math.min((n.scrollTop() + 100) / t, Math.round(a / 2), o);
            this.annotationBean.setWidth(e, !0), this.annotationBean.setLeft(o, !0), this.annotationBean.setTop(s, !0), this.annotationBean.setArrowTip([Math.min(Math.round(o + i / 2), i - 20), Math.min(Math.round(s + a / 2), a - 20)], !0)
        },
        closeModal: function(t) {
            var n = mgr.bean.getRDWriter();
            "ok" == t ? (this.layer.ctx.drawImage(this.txtCtx.obj.canvas.get(0), 0, 0, this.annotationBean.getWidth(), this.annotationBean.getHeight(), this.annotationBean.getLeft(), this.annotationBean.getTop(), this.annotationBean.getWidth(), this.annotationBean.getHeight()), this.layer.select(), n.addInstructionData([this.annotationBean.getCurrentStyle().getName(), this.annotationBean.getLeft(), this.annotationBean.getTop(), this.annotationBean.getWidth(), this.annotationBean.getHeight(), this.annotationBean.getArrowTip(), this.annotationBean.getPadding(), this.annotationBean.getFont(), this.annotationBean.getFontSize(), this.annotationBean.getText(), mgr.bean.getColor()]), mgr.bean.getSelectedLayer().setChangeStamp(), mgr.undoManager.push(), n.pushInstruction()) : (mgr.layerManager.destroyLayer(mgr.layerManager.find(this.layer.getName())), n.abortInstruction()), this.$stoptouch.remove(), mgr.layoutManager.unBlur(), this.$stoptouch = null, this.active = !1, mgr.layerManager.updateDisplay()
        },
        layout: function() {
            var t = this.$stoptouch.find(".snViewport"),
                n = mgr.bean.getScale(),
                i = this.annotationBean.getPadding() * n;
            t.find(".snWindowMain").width(Math.round(mgr.zoomManager.realWidth * n)).height(Math.round(mgr.zoomManager.realHeight * n)), mgr.layoutManager.sidebarModalLayout(this.$stoptouch), t.find(".snLeftDrag").css("left", - 1 * i - 7 + "px"), t.find(".snRightDrag").css("right", - 1 * i - 7 + "px")
        },
        updateFontSize: function() {
            var t = this.annotationBean.getFontSize();
            mgr.sliderManager.setVal(this.$stoptouch.find(".snSizeSlider"), (t - 8) / 92, t, "px")
        },
        updateSticky: function() {
            var t = mgr.bean.getScale();
            this.$sticky.width(this.annotationBean.getWidth() * t).height(this.annotationBean.getHeight() * t).css("left", this.annotationBean.getLeft() * t).css("top", this.annotationBean.getTop() * t)
        },
        createCanvas: function() {
            this.txtCanvas = new Canvas(this.$stoptouch.find(".snTextCanvas").get(0)), this.txtCanvas.init(this.annotationBean.getWidth(), this.annotationBean.getHeight(), !0), this.txtCtx = this.txtCanvas.context
        },
        createLayer: function() {
            return this.layer = mgr.layerManager.create("Annotation").select(), this.layer
        },
        createStyleButtons: function() {
            var t = this.$stoptouch.find(".snStylesCont");
            t.empty();
            for (var n = 0; this.styles.length > n; n++) this.styles[n].makeButton(t)
        },
        startDragSticky: function(t) {
            this.startCoords = t, this.startPosition = [this.annotationBean.getLeft(), this.annotationBean.getTop()]
        },
        dragSticky: function(t) {
            var n = this.annotationBean.getPadding(),
                i = mgr.bean.getScale();
            this.annotationBean.setLeft(Math.max(n, Math.min(mgr.width - this.annotationBean.getWidth() - n, this.startPosition[0] + (t[0] - this.startCoords[0]) / i))), this.annotationBean.setTop(Math.max(n, Math.min(mgr.height - this.annotationBean.getHeight() - n, this.startPosition[1] + (t[1] - this.startCoords[1]) / i)))
        },
        endDragSticky: function(t) {
            var n = MathUtils.distance(this.startCoords, t);
            4 > n && $(".snTextArea").focus()
        },
        writeText: function() {
            this.txtCtx.font = this.annotationBean.getFontSize() + "px " + this.annotationBean.getFont(), this.lineHeight = Math.round(1.2 * this.annotationBean.getFontSize());
            for (var t = this.annotationBean.getWidth(), n = this.annotationBean.getText(), i = n.replace(/[\n\r]/g, " \n ").split(" "), a = [], e = 0; i.length > e;) {
                for (var o = i[e++]; i.length > e && t - 20 > this.txtCtx.measureText(o + " " + i[e]).width && "\n" != i[e];) "\n" != o ? o += " " + i[e++] : o = i[e++];
                a.push(o)
            }
            var s = (a.length + 1) * this.lineHeight;
            this.annotationBean.setHeight(s), this.txtCanvas.init(t, s, !0), this.txtCtx = this.txtCanvas.context, this.txtCtx.font = this.annotationBean.getFontSize() + "px " + this.annotationBean.getFont(), this.txtCtx.textAlign = this.annotationBean.getTextAlignment(), this.txtCtx.textBaseline = "top", this.txtCtx.fillStyle = this.annotationBean.getCurrentStyle().getTextColor();
            for (var h = 0; a.length > h; h++) switch (this.txtCtx.textAlign) {
                case "right":
                    this.txtCtx.fillText(a[h], t, (h + .5) * this.lineHeight);
                    break;
                case "center":
                    this.txtCtx.fillText(a[h], Math.round(t / 2), (h + .5) * this.lineHeight);
                    break;
                case "left":
                default:
                    this.txtCtx.fillText(a[h], 0, (h + .5) * this.lineHeight)
            }
            var r = mgr.bean.getScale();
            $(this.txtCanvas.canvas.get(0)).width(t * r).height(s * r)
        },
        highlightAlignment: function() {
            switch ($(".snAlignmentButtonSelected").removeClass("snAlignmentButtonSelected"), this.annotationBean.getTextAlignment()) {
                case "left":
                    $(".snAlignLeft").addClass("snAlignmentButtonSelected");
                    break;
                case "center":
                    $(".snAlignCenter").addClass("snAlignmentButtonSelected");
                    break;
                case "right":
                    $(".snAlignRight").addClass("snAlignmentButtonSelected")
            }
        }
    }), window.AnnotationBean = Base.extend({
        constructor: function() {
            var t = this._initialize.bindTo(this);
            t()
        }
    }), jQuery.extend(window.AnnotationBean, {
        attributes: {
            width: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 200
            },
            height: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 200
            },
            left: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 200
            },
            top: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 200
            },
            text: {
                type: Bean.types.STRING,
                initialValue: "Enter Text"
            },
            textAlignment: {
                type: Bean.types.STRING,
                initialValue: "center"
            },
            arrowTip: {
                type: Bean.types.OBJECT,
                initialValue: [10, 10]
            },
            padding: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 10
            },
            currentStyle: {
                type: Bean.types.OBJECT,
                initialValue: null,
                addToSetter: function() {
                    switch ($(".snStyleButtonActive").removeClass("snStyleButtonActive"), this.currentStyle.$button.addClass("snStyleButtonActive"), this.currentStyle.getName()) {
                        case "blank":
                            this.setPadding(0);
                            break;
                        default:
                            this.setPadding(10)
                    }
                }
            },
            font: {
                type: Bean.types.String,
                initialValue: null
            },
            fontSize: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 0
            }
        }
    }), Bean.createBean(window.AnnotationBean, AnnotationBean.attributes), window.DWait && DWait.run("jms/pages/drawplz/annotation.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/mathUtils.js"], function() {
    window.AnnotationStyle = Base.extend({
        constructor: function(t) {
            this.logger = new StdLogger("Annotation Style"), this.annotationBean = t
        },
        properties: {
            NAME: "changeme",
            MIN_ARROW_LENGTH: 0
        },
        draw: function(t) {
            var n = this.annotationBean.getPadding(),
                a = this.annotationBean.getArrowTip(),
                e = [this.annotationBean.getLeft() - n, this.annotationBean.getTop() - n],
                o = [e[0] + this.annotationBean.getWidth() + 2 * n, e[1]],
                i = [e[0], e[1] + this.annotationBean.getHeight() + 2 * n],
                s = [o[0], i[1]];
            t.clear();
            var r, h, l = [this.annotationBean.getLeft() + this.annotationBean.getWidth() / 2, this.annotationBean.getTop() + this.annotationBean.getHeight() / 2],
                g = MathUtils.getAngle(l[1] - a[1], a[0] - l[0]),
                d = MathUtils.getAngle((this.annotationBean.getHeight() + 2 * n) / 2, (this.annotationBean.getWidth() + 2 * n) / 2),
                u = Math.PI - d,
                c = Math.PI + d,
                w = 2 * Math.PI - d;
            g > d && u > g ? (h = "top", r = MathUtils.centerPoint(e, o)) : g > u && c > g ? (h = "left", r = MathUtils.centerPoint(e, i)) : g > c && w > g ? (h = "bottom", r = MathUtils.centerPoint(i, s)) : (h = "right", r = MathUtils.centerPoint(s, o));
            var B = MathUtils.distance(r, a),
                p = a[0] > i[0] && s[0] > a[0] && a[1] > e[1] && i[1] > a[1];
            !p && B > this.properties.MIN_ARROW_LENGTH ? this.drawArrow(t, a, r, h) : h = null, this.drawBubble(t, h, a, r)
        },
        clearShadow: function(t) {
            t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = 0, t.shadowColor = "rgba(0,0,0,0)"
        },
        getName: function() {
            return this.properties.NAME
        },
        drawBubble: function() {
            this.logger.talkback("[muro] Annotation Style Should Overwrite drawBubble()")
        },
        drawArrow: function() {
            this.logger.talkback("[muro] Annotation Style Should Overwrite drawArrow()")
        },
        makeButton: function(t) {
            this.$button = $('<div class="snStyleButton"><div class="snStyleIcon"</div></div>').appendTo(t), this.$button.on("click", function() {
                this.annotationBean.setCurrentStyle(this)
            }.bindTo(this))
        },
        getTextColor: function() {
            return "#000000"
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/annotationStyles/baseStyle.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/annotationStyles/baseStyle.js"], function() {
    window.ArrowAnnotationStyle = AnnotationStyle.extend({
        constructor: function(t) {
            this.base(t)
        },
        properties: {
            NAME: "arrow",
            MIN_ARROW_LENGTH: 100
        },
        makeButton: function(t) {
            this.base(t), this.$button.addClass("snStyleButton3")
        },
        drawBubble: function(t, n) {
            if (n) {
                t.fillStyle = "#222", t.beginPath();
                var a = [this.annotationBean.getLeft() + this.annotationBean.getWidth() / 2, this.annotationBean.getTop() + this.annotationBean.getHeight() / 2];
                switch (n) {
                    case "top":
                        t.arc(a[0], this.annotationBean.getTop(), 2 * this.annotationBean.getPadding(), 0, 2 * Math.PI), t.fill();
                        break;
                    case "left":
                        t.arc(this.annotationBean.getLeft(), a[1], 2 * this.annotationBean.getPadding(), 0, 2 * Math.PI), t.fill();
                        break;
                    case "bottom":
                        t.arc(a[0], this.annotationBean.getTop() + this.annotationBean.getHeight(), 2 * this.annotationBean.getPadding(), 0, 2 * Math.PI), t.fill();
                        break;
                    case "right":
                        t.arc(this.annotationBean.getLeft() + this.annotationBean.getWidth(), a[1], 2 * this.annotationBean.getPadding(), 0, 2 * Math.PI), t.fill()
                }
            }
            t.lineWidth = 1, t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = "#000000", t.shadowColor = "rgba(0,0,0,0.3)", t.shadowOffsetX = 5, t.shadowOffsetY = 5, t.shadowBlur = mgr.calibrator.specBlur(t, 4), t.fillStyle = "#ffffff", t.fillRect(this.annotationBean.getLeft() - this.annotationBean.getPadding(), this.annotationBean.getTop() - this.annotationBean.getPadding(), this.annotationBean.getWidth() + 2 * this.annotationBean.getPadding(), this.annotationBean.getHeight() + 2 * this.annotationBean.getPadding()), this.clearShadow(t), t.strokeRect(this.annotationBean.getLeft() - this.annotationBean.getPadding(), this.annotationBean.getTop() - this.annotationBean.getPadding(), this.annotationBean.getWidth() + 2 * this.annotationBean.getPadding(), this.annotationBean.getHeight() + 2 * this.annotationBean.getPadding())
        },
        drawArrow: function(t, n, a) {
            var e = a[1] - n[1],
                i = a[0] - n[0],
                o = Math.pow(e * e + i * i, .5),
                s = MathUtils.getAngle(e, i);
            t.lineWidth = 1, t.lineCap = "round", t.lineJoin = "round", t.fillStyle = "#ffffff", t.strokeStyle = "#000000", t.shadowColor = "rgba(0,0,0,0.3)", t.save();
            try {
                t.translate(n[0], n[1]), t.rotate(s), t.beginPath(), t.moveTo(0, 0), t.lineTo(60, 15), t.lineTo(53, 7), t.lineTo(o, 0), t.lineTo(53, - 7), t.lineTo(60, - 15), t.lineTo(0, 0)
            } finally {
                t.restore()
            }
            t.shadowOffsetX = 5, t.shadowOffsetY = 5, t.shadowBlur = mgr.calibrator.specBlur(t, 4), t.fill(), this.clearShadow(t), t.stroke()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/annotationStyles/arrow.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/annotationStyles/baseStyle.js"], function() {
    window.StickyAnnotationStyle = AnnotationStyle.extend({
        constructor: function(t) {
            this.base(t)
        },
        properties: {
            NAME: "sticky",
            MIN_ARROW_LENGTH: 20
        },
        makeButton: function(t) {
            this.base(t), this.$button.addClass("snStyleButton1")
        },
        drawBubble: function(t) {
            t.lineWidth = 1, t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = "#000000", t.shadowColor = "rgba(0,0,0,0.3)", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowBlur = mgr.calibrator.specBlur(t, 1), t.fillStyle = "#fce401";
            var n = this.annotationBean.getPadding();
            t.fillRect(this.annotationBean.getLeft() - n, this.annotationBean.getTop() - n, this.annotationBean.getWidth() + 2 * n, this.annotationBean.getHeight() + 2 * n);
            var a = [this.annotationBean.getLeft() + this.annotationBean.getWidth() - 20 + n, this.annotationBean.getTop() + this.annotationBean.getHeight() + n],
                e = [this.annotationBean.getLeft() + this.annotationBean.getWidth() + n, this.annotationBean.getTop() + this.annotationBean.getHeight() - 20 + n];
            t.globalCompositeOperation = "destination-out", t.fillStyle = "#ffffff", t.beginPath(), t.moveTo(a[0], a[1] + 2), t.lineTo(e[0] + 2, e[1]), t.lineTo(this.annotationBean.getLeft() + this.annotationBean.getWidth() + n + 2, this.annotationBean.getTop() + this.annotationBean.getHeight() + n + 2), t.lineTo(a[0], a[1]), t.fill(), t.globalCompositeOperation = "source-over", t.shadowBlur = mgr.calibrator.specBlur(t, 3), t.fillStyle = "#fce401", t.beginPath(), t.moveTo(a[0], a[1] + 1), t.lineTo(a[0], e[1]), t.lineTo(e[0] + 1, e[1]), t.lineTo(a[0], a[1]), t.fill(), this.clearShadow(t)
        },
        drawArrow: function(t, n, a) {
            var e = a[1] - n[1],
                o = a[0] - n[0];
            Math.pow(e * e + o * o, .5), MathUtils.getAngle(e, o), t.lineCap = "round", t.lineJoin = "round", t.shadowColor = "rgba(0,0,0,0.3)", t.shadowOffsetX = 0, t.shadowOffsetY = 0, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.shadowBlur = mgr.calibrator.specBlur(t, 2), t.beginPath(), t.moveTo(a[0], a[1]), t.lineTo(n[0], n[1]), t.lineWidth = 3, t.strokeStyle = "rgba(255, 255, 255, 0.7)", t.stroke(), t.lineWidth = 2, t.strokeStyle = "rgba(0, 0, 0, 0.5)", t.stroke(), t.stroke();
            var i = t.createRadialGradient(n[0], n[1] - 6, 2, n[0], n[1], 10);
            i.addColorStop(0, "#ffbbbb"), i.addColorStop(1, "#ff0000"), t.fillStyle = i, t.beginPath(), t.arc(n[0], n[1], 10, 0, 2 * Math.PI), t.fill(), this.clearShadow(t), t.lineWidth = 2, t.strokeStyle = "rgba(150, 150, 150, 0.5)", t.stroke(), this.clearShadow(t)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/annotationStyles/sticky.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/annotationStyles/baseStyle.js"], function() {
    window.SpeechAnnotationStyle = AnnotationStyle.extend({
        constructor: function(t) {
            this.base(t)
        },
        properties: {
            NAME: "speech",
            MIN_ARROW_LENGTH: 50
        },
        makeButton: function(t) {
            this.base(t), this.$button.addClass("snStyleButton2")
        },
        drawBubble: function(t, e, n) {
            t.lineWidth = 2, t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = "#000000", t.fillStyle = "#ffffff", t.shadowColor = "rgba(0,0,0,0.5)";
            var o = 8,
                a = this.annotationBean.getPadding(),
                i = [this.annotationBean.getLeft() - a, this.annotationBean.getTop() - a],
                r = [i[0] + this.annotationBean.getWidth() + 2 * a, i[1]],
                s = [i[0], i[1] + this.annotationBean.getHeight() + 2 * a],
                l = [r[0], s[1]];
            t.beginPath(), t.moveTo(i[0] + o, i[1]), t.quadraticCurveTo(i[0], i[1], i[0], i[1] + o), "left" == e && this.drawBubbleArrow(t, i, s, n), t.lineTo(s[0], s[1] - o), t.quadraticCurveTo(s[0], s[1], s[0] + o, s[1]), "bottom" == e && this.drawBubbleArrow(t, s, l, n), t.lineTo(l[0] - o, l[1]), t.quadraticCurveTo(l[0], l[1], l[0], l[1] - o), "right" == e && this.drawBubbleArrow(t, l, r, n), t.lineTo(r[0], r[1] + o), t.quadraticCurveTo(r[0], r[1], r[0] - o, r[1]), "top" == e && this.drawBubbleArrow(t, r, i, n), t.lineTo(i[0] + o, i[1]), t.shadowOffsetX = 3, t.shadowOffsetY = 3, t.shadowBlur = mgr.calibrator.specBlur(t, 3), t.fill(), this.clearShadow(t), t.stroke()
        },
        drawBubbleArrow: function(t, e, n, o) {
            var a, i = MathUtils.distance(e, o),
                r = MathUtils.distance(n, o),
                s = MathUtils.centerPoint(e, n);
            r > i ? (a = [e[0] + 3 * (n[0] - e[0]) / 4, e[1] + 3 * (n[1] - e[1]) / 4], t.lineTo(s[0], s[1]), t.lineTo(o[0], o[1]), t.lineTo(a[0], a[1])) : (a = [e[0] + (n[0] - e[0]) / 4, e[1] + (n[1] - e[1]) / 4], t.lineTo(a[0], a[1]), t.lineTo(o[0], o[1]), t.lineTo(s[0], s[1]))
        },
        drawArrow: function() {}
    }), window.DWait && DWait.run("jms/pages/drawplz/annotationStyles/speech.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/annotationStyles/baseStyle.js"], function() {
    window.BlankAnnotationStyle = AnnotationStyle.extend({
        constructor: function(t) {
            this.base(t)
        },
        properties: {
            NAME: "blank",
            MIN_ARROW_LENGTH: 20
        },
        makeButton: function(t) {
            this.base(t), this.$button.addClass("snStyleButton4")
        },
        drawBubble: function() {},
        drawArrow: function(t, n, e) {
            t.lineCap = "round", t.lineJoin = "round", t.strokeStyle = "#000000", this.clearShadow(t), t.beginPath(), t.moveTo(e[0], e[1]), t.lineTo(n[0], n[1]), t.lineWidth = 3, t.strokeStyle = "rgba(255, 255, 255, 0.7)", t.stroke(), t.lineWidth = 2, t.strokeStyle = "rgba(0, 0, 0, 0.5)", t.stroke()
        },
        getTextColor: function() {
            return "#" + mgr.bean.getColor()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/annotationStyles/blank.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/pubsub.js", "jms/pages/drawplz/postProcessors/curves.js", "jms/pages/drawplz/postProcessors/saturation.js", "jms/pages/drawplz/postProcessors/brightness.js", "jms/pages/drawplz/postProcessors/contrast.js", "jms/pages/drawplz/postProcessors/temperature.js", "jms/pages/drawplz/postProcessors/tint.js"], function() {
    window.PostProcessor = Base.extend({
        constructor: function() {
            this.logger = new StdLogger("Post Processor"), this.whichLayers = safeLocalGet(MURO_CONSTS.PP_WHICHLAYER_KEY, MURO_CONSTS.PP_WHICHLAYER_ALL), this.bindHtml(), this.curves = new CurvesProcessor, this.saturation = new SaturationProcessor, this.brightness = new BrightnessProcessor, this.contrast = new ContrastProcessor, this.temperature = new TemperatureProcessor, this.tint = new TintProcessor, vms_feature("presets") && (this.sharpness = new SharpnessProcessor)
        },
        bindHtml: function() {
            var e = mgr.$mainNode.find(".postAdjustments");
            e.on("click", ".newAdjustment", function() {
                return this.apply().done(function() {
                    this.cleanAndPush().done(this.createUI.bindTo(this))
                }.bindTo(this)), !1
            }.bindTo(this)), e.on("click", ".ppReset", function() {
                return this.reset(), this.update(), !1
            }.bindTo(this)), e.on("mousedown", ".allRockerLabel", this.setRockerAll.bindTo(this)), e.on("mousedown", ".selRockerLabel", this.setRockerSel.bindTo(this)), e.on("mousedown", ".rockerArrow", this.rockerToggle.bindTo(this))
        },
        setRockerAll: function() {
            return $(".postAdjustments .rockerArrow").removeClass("rockerArrowLeft").addClass("rockerArrowRight"), this.whichLayers = MURO_CONSTS.PP_WHICHLAYER_ALL, this.chainPixelData(), safeLocalSet(MURO_CONSTS.PP_WHICHLAYER_KEY, MURO_CONSTS.PP_WHICHLAYER_ALL), !1
        },
        setRockerSel: function() {
            return $(".postAdjustments .rockerArrow").removeClass("rockerArrowRight").addClass("rockerArrowLeft"), this.whichLayers = MURO_CONSTS.PP_WHICHLAYER_SELECTED, this.chainPixelData(), safeLocalSet(MURO_CONSTS.PP_WHICHLAYER_KEY, MURO_CONSTS.PP_WHICHLAYER_SELECTED), !1
        },
        rockerToggle: function() {
            return this.whichLayers == MURO_CONSTS.PP_WHICHLAYER_ALL ? this.setRockerSel() : this.setRockerAll()
        },
        createUI: function() {
            return mgr.layoutManager.showSpinner(), this.whichLayers == MURO_CONSTS.PP_WHICHLAYER_ALL ? ($(".postSelected").removeClass("rockerButtonSelected"), $(".postAll").addClass("rockerButtonSelected")) : ($(".postAll").removeClass("rockerButtonSelected"), $(".postSelected").addClass("rockerButtonSelected")), this.initAll(), PubSub.subscribe([{
                eventname: "muro.selectionChange",
                subscriber: this,
                callback: this.selectionChange
            }]), this.chainPixelData().done(function() {
                mgr.layoutManager.hideSpinner()
            }.bindTo(this))
        },
        initAll: function() {
            this.tint.init(), this.temperature.init(), this.contrast.init(), this.brightness.init(), this.saturation.init(), this.curves.init(), vms_feature("presets") && this.sharpness.init()
        },
        chainPixelData: function() {
            switch (mgr.layerManager.restoreVisibilities(), mgr.layerManager.setZIndices(), this.whichLayers) {
                case MURO_CONSTS.PP_WHICHLAYER_SELECTED:
                    this.pd = mgr.bean.getSelectedLayer().ctx.getImageData(0, 0, mgr.width, mgr.height), mgr.$mainNode.find(".stagingBuffer").css("opacity", mgr.bean.getSelectedLayer().$canvasDom.css("opacity")), mgr.bean.getSelectedLayer().$canvasDom.css("visibility", "hidden");
                    break;
                default:
                case MURO_CONSTS.PP_WHICHLAYER_ALL:
                    this.pd = mgr.layerManager.merge(mgr.layerManager.layers, !0).getContext("2d").getImageData(0, 0, mgr.width, mgr.height), mgr.$mainNode.find(".stagingBuffer").css("z-index", 3 * mgr.layerManager.layers.length + 1), mgr.$mainNode.find(".stagingBuffer").css("opacity", 1), $.each(mgr.layerManager.layers, function(e, s) {
                        s.$canvasDom.css("visibility", "hidden")
                    })
            }
            return this.chainFunc = this.temperature.chain(this.tint.chain(this.brightness.chain(this.contrast.chain(this.saturation.chain(this.curves.chain(function(e) {
                mgr.stagingCanvas.context.setPixelData(e), this.updateDeferred.resolve()
            }.bindTo(this))))))), vms_feature("presets") && (this.chainFunc = this.sharpness.chain(this.chainFunc)), this.update()
        },
        update: function() {
            return this.updateDeferred = $.Deferred(), this.chainFunc(this.pd), this.updateDeferred
        },
        selectionChange: function() {
            mgr.layoutManager.showSpinner(), this.update().done(function() {
                mgr.layoutManager.hideSpinner()
            })
        },
        applyToLayers: function(e) {
            if (this.applyToLayersDeferred || (this.applyToLayersDeferred = $.Deferred(), this.applyToLayersDeferred.done(function() {
                this.applyToLayersDeferred = null
            }.bindTo(this))), e && e.length) {
                var s = e.pop(),
                    t = s.ctx.getPixelData();
                vms_feature("presets") ? this.sharpness.applyChain(this.temperature.applyChain(this.tint.applyChain(this.brightness.applyChain(this.contrast.applyChain(this.saturation.applyChain(this.curves.applyChain(function(t) {
                    s.ctx.setPixelData(t), s.setChangeStamp(null), this.applyToLayers(e)
                }.bindTo(this))))))))(t) : this.temperature.applyChain(this.tint.applyChain(this.brightness.applyChain(this.contrast.applyChain(this.saturation.applyChain(this.curves.applyChain(function(t) {
                    s.ctx.setPixelData(t), s.setChangeStamp(null), this.applyToLayers(e)
                }.bindTo(this)))))))(t)
            } else this.applyToLayersDeferred.resolve();
            return this.applyToLayersDeferred
        },
        apply: function() {
            mgr.layoutManager.showSpinner();
            var e = [];
            switch (this.whichLayers) {
                case MURO_CONSTS.PP_WHICHLAYER_SELECTED:
                    e.push(mgr.bean.getSelectedLayer());
                    break;
                default:
                case MURO_CONSTS.PP_WHICHLAYER_ALL:
                    for (var s = 0; mgr.layerManager.layers.length > s; s++) {
                        var t = mgr.layerManager.layers[s];
                        (t.isVisible() || t.storedVisible) && e.push(t)
                    }
            }
            var r = this.applyToLayers(e);
            return r.done(function() {
                mgr.layoutManager.hideSpinner(), this.reset()
            }.bindTo(this)), r
        },
        cleanup: function() {
            mgr.stagingCanvas.context.clear(), mgr.layerManager.restoreVisibilities(), mgr.layerManager.setZIndices(), PubSub.unsubscribe([{
                eventname: "muro.selectionChange",
                subscriber: this
            }])
        },
        cleanAndPush: function() {
            var e;
            return this.hasAdjustments() ? (e = mgr.postProcessor.apply(), e.done(function() {
                this.cleanup();
                var e = mgr.bean.getRDWriter().startInstruction(RDInst.FLUSH, ["Post Processor", "Post Processing"]);
                mgr.undoManager.push([0, 0, mgr.width, mgr.height]), e.pushInstruction()
            }.bindTo(this))) : (e = $.Deferred(), mgr.postProcessor.cleanup(), e.resolve()), e
        },
        reset: function() {
            this.temperature.reset(), this.tint.reset(), this.brightness.reset(), this.contrast.reset(), this.saturation.reset(), this.curves.reset(), vms_feature("presets") && this.sharpness.reset()
        },
        hasAdjustments: function() {
            var e = !(this.temperature.isIdentity() && this.tint.isIdentity() && this.brightness.isIdentity() && this.contrast.isIdentity() && this.saturation.isIdentity() && this.curves.isIdentity());
            return vms_feature("presets") && (e |= !this.sharpness.isIdentity()), e
        },
        unloadHandler: function() {
            return this.hasAdjustments() ? 'Quit without saving adjustments?  Press the "Done" button to make sure changes are applied.' : ($(".toolsTab").click(), mgr.unload())
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessor.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/slider.js"], function() {
    window.BaseProcessor = Base.extend({
        constructor: function(t) {
            this.logger = new StdLogger(t + " Processor"), this.name = t, this.guaranteedQueue = [], this.nonGuaranteed = null, this.processHash = null, this.dataProcessedID = null, this.reset()
        },
        init: function() {},
        loadData: function(t) {
            this.pixelData = t, this.dataLoadedId = Math.random()
        },
        getData: function() {
            return this.resultData
        },
        announceDataChange: function() {
            this.dataChangeFunction && this.dataChangeFunction()
        },
        onDataChange: function(t) {
            this.dataChangeFunction = t
        },
        queue: function(t, e, s) {
            var a = {
                settings: t,
                data: e
            };
            return s ? (a.deferred = $.Deferred(), this.guaranteedQueue.push(a), this.process(), a.deferred) : (this.nonGuaranteed = a, this.process(), null)
        },
        uiDelayedQueue: function(t, e, s, a) {
            a || (a = 250), this.delayQueueTimer && clearTimeout(this.delayQueueTimer), this.delayQueueTimer = setTimeout(function() {
                this.queue(t, e, s), this.delayQueueTimer = null
            }.bindTo(this), a)
        },
        process: function() {
            if (!this.processingDeferred || "pending" != this.processingDeferred.state()) {
                if (mgr.layoutManager.showSpinner(), this.nonGuaranteed) this.processingDeferred = this.processImpl(this.nonGuaranteed.settings, this.nonGuaranteed.data), this.processingDeferred.done(function() {
                    setTimeout(this.process.bindTo(this), 1)
                }.bindTo(this)), this.nonGuaranteed = null;
                else if (this.guaranteedQueue.length) {
                    var t = this.guaranteedQueue.shift();
                    this.processingDeferred = this.processImpl(t.settings, t.data), this.processingDeferred.done(function(e) {
                        t.deferred.resolve(e), setTimeout(this.process.bindTo(this), 1)
                    }.bindTo(this))
                }
                this.processingDeferred.done(function() {
                    mgr.layoutManager.hideSpinner()
                })
            }
        },
        chunkProcess: function(t, e) {
            var s = $.Deferred();
            return this.y = 0, setTimeout(function() {
                if (t) this.applyToData(t, e, s);
                else {
                    if (this.processHash == this.getHash() && this.dataProcessedID == this.dataLoadedId) return s.resolve(this.resultData), void 0;
                    this.processHash = this.getHash(), s.done(this.announceDataChange.bindTo(this)), this.applyToData(this.pixelData, e, s)
                }
            }.bindTo(this), 1), s
        },
        applyToData: function(t, e, s) {
            this.dataProcessedID = this.dataLoadedId, this.resultData && this.resultData.width == mgr.width && this.resultData.height == mgr.height || (this.resultData = mgr.bean.getStagingCtx().createImageData(mgr.width, mgr.height));
            for (var a; mgr.height > this.y;) {
                for (var i = 0; mgr.width > i; i++) a = 4 * (this.y * mgr.width + i), e(t, a);
                if (0 === this.y++ % 30) return this.applyTimeout(t, e, s), void 0
            }
            mgr.selectionManager.hasSelection && this.maskResultData(t), s.resolve(this.resultData)
        },
        applyTimeout: function(t, e, s) {
            setTimeout(function() {
                this.applyToData(t, e, s)
            }.bindTo(this), 1)
        },
        initSlider: function(t, e) {
            var s = $(t),
                a = s.find(".knob").get(0),
                i = s.find(".track").get(0);
            this.trackWidth = $(i).width(), new Dragger([a, i], i, function() {}, e, function() {})
        },
        maskResultData: function(t) {
            var e = mgr.bean.getBufferCtx();
            e.clear(), e.setPixelData(this.resultData), mgr.selectionManager.maskContext(e);
            for (var s, a, i, n = e.getPixelData(), r = t.data, o = this.resultData.data, h = 0; mgr.height > h; h++) for (var u = 0; mgr.width > u; u++) s = 4 * (h * mgr.width + u), n.data[s + 3] != r[s + 3] && (a = Math.max(0, Math.min(1, n.data[s + 3] / r[s + 3])), i = 1 - a, o[s] = Math.floor(a * n.data[s] + i * r[s]), o[s + 1] = Math.floor(a * n.data[s + 1] + i * r[s + 1]), o[s + 2] = Math.floor(a * n.data[s + 2] + i * r[s + 2]), o[s + 3] = r[s + 3]);
            e.clear()
        },
        chain: function(t, e) {
            return e || (e = {}),
            function(s) {
                this.loadData(s), this.onDataChange(function() {
                    t(this.getData())
                }.bindTo(this)), this.shouldPassThrough() ? t(s) : this.queue(e, null, !1)
            }.bindTo(this)
        },
        applyChain: function(t, e) {
            return e || (e = {}),
            function(s) {
                return this.shouldPassThrough() ? (t(s), void 0) : this.queue(e, s, !0).done(function(e) {
                    t(e)
                }.bindTo(this))
            }.bindTo(this)
        },
        processImpl: function() {
            return this.logger.talkback("Post Processor has no processImpl: ", this.name), null
        },
        reset: function() {
            return this.logger.talkback("Post Processor has no reset: ", this.name), null
        },
        shouldPassThrough: function() {
            return !1
        },
        isIdentity: function() {
            return this.shouldPassThrough()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/baseProcessor.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/crc32.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/postProcessors/baseProcessor.js", "jms/pages/drawplz/lib/bezier.js"], function() {
    window.CurvesProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Curves")
        },
        init: function() {
            this.curvesCanvas = new Canvas($(".curvesCanvas").get(0)), this.curvesCanvas.init($(".curvesCanvas").width(), $(".curvesCanvas").height(), !0), this.curvesCtx = this.curvesCanvas.context, this.curvesDragger || (this.curvesDragger = new Dragger([mgr.$mainNode.find(".curvesCanvas").get(0)], mgr.$mainNode.find(".curvesCanvas").get(0), this.startCurveDrag.bindTo(this), this.moveCurveDrag.bindTo(this), this.endCurveDrag.bindTo(this)))
        },
        processImpl: function(t, s) {
            var i = $.Deferred(),
                r = $.Deferred();
            return t && t.curve && t.points && (this.curve = t.curve, this.points = t.points), this.bezierCurve(), setTimeout(function() {
                this.createHistogram(), i.resolve()
            }.bindTo(this), 1), setTimeout(function() {
                if (s) r.resolve(this.applyToData(s));
                else {
                    var t = fletcher16(this.curve.join("|"));
                    t == this.curveHash && this.dataProcessedID == this.dataLoadedId ? r.resolve(this.resultData) : (this.curveHash = t, r.resolve(this.applyToData(this.pixelData)), this.announceDataChange())
                }
            }.bindTo(this), 1), $.when(i, r).then(function(t, s) {
                this.displayHistogram(), this.processingDeferred.resolve(s)
            }.bindTo(this)), $.Deferred()
        },
        flatCurve: function() {
            for (var t = [], s = 0; 256 > s; s++) t[s] = s;
            return t
        },
        sortPoints: function() {
            return this.points.sort(function(t, s) {
                return t[0] != s[0] ? t[0] - s[0] : t[1] - s[1]
            }), this.points
        },
        bezierCurve: function() {
            var t;
            if (!this.points || 3 > this.points.length) {
                for (this.curve = [], t = 0; 256 > t; t++) this.curve[t] = t;
                return this.points = [
                    [0, 0],
                    [256, 256]
                ], void 0
            }
            this.sortPoints(), this.controlPoints = [
                [
                    [],
                    [0, 0]
                ]
            ];
            for (var s = 0, i = 1, r = 2; this.points.length > r;) this.controlPoints.push(controlPoints(this.points[s++], this.points[i++], this.points[r++], .5));
            for (this.controlPoints[0][1] = this.controlPoints[1][0], this.controlPoints.push([this.controlPoints[this.controlPoints.length - 1][1],
                []
            ]), t = 0; this.points.length - 1 > t; t++) for (var a = this.points[t], e = this.points[t + 1], h = this.controlPoints[t][1], o = this.controlPoints[t + 1][0], n = a[0]; e[0] > n; n++) this.curve[n] = Math.min(255, Math.max(0, Math.round(bezYFromX(a, e, h, o, n, .5))))
        },
        createHistogram: function() {
            if (this.histogramProcessedID != this.dataLoadedId) {
                this.histogramProcessedID = this.dataLoadedId, this.histogram || (this.histogram = {
                    r: [],
                    g: [],
                    b: [],
                    l: []
                });
                for (var t = 0; 256 > t; t++) this.histogram.r[t] = 0, this.histogram.g[t] = 0, this.histogram.b[t] = 0, this.histogram.l[t] = 0;
                var s;
                if (mgr.selectionManager.hasSelection) {
                    var i = mgr.bean.getBufferCtx();
                    i.setPixelData(this.pixelData), mgr.selectionManager.maskContext(i), s = i.getPixelData().data, i.clear()
                } else s = this.pixelData.data;
                for (var r, a, e, h, o, n = mgr.width, u = mgr.height, c = 0; n > c; c++) for (var g = 0; u > g; g++) r = 4 * (g * n + c), a = s[r], e = s[r + 1], h = s[r + 2], o = s[r + 3] / 255, this.histogram.r[a] += o, this.histogram.g[e] += o, this.histogram.b[h] += o
            }
        },
        displayHistogram: function() {
            this.curvesCtx.clear(), this.initialColoring(), this.postHistogram(), this.drawCurve()
        },
        initialColoring: function() {
            var t, s = 0,
                i = 0;
            for (t = 5; 250 > t; t++) s = Math.max(s, Math.min(this.histogram.r[t], this.histogram.r[t + 1]), Math.min(this.histogram.g[t], this.histogram.g[t + 1]), Math.min(this.histogram.b[t], this.histogram.b[t + 1]));
            for (t = 0; 255 > t; t++) i = Math.max(i, this.histogram.r[t], this.histogram.g[t], this.histogram.b[t]);
            for (t = 0; 256 > t; t++) i = Math.max(i, this.histogram.r[t], this.histogram.g[t], this.histogram.b[t]);
            (!s || .25 * i > s) && (s = i);
            var r = this.curvesCanvas.height,
                a = this.curvesCanvas.width;
            this.curvesCtx.shadowColor = "rgba(0,0,0,0)", this.curvesCtx.shadowBlur = "0", this.curvesCtx.fillStyle = "rgba(255,0,0,.3)", this.drawData(this.curvesCtx, this.histogram.r, s, a, r), this.curvesCtx.fillStyle = "rgba(0,255,0,.3)", this.drawData(this.curvesCtx, this.histogram.g, s, a, r), this.curvesCtx.fillStyle = "rgba(0,0,255,.3)", this.drawData(this.curvesCtx, this.histogram.b, s, a, r)
        },
        drawData: function(t, s, r, a, e) {
            for (t.beginPath(), t.moveTo(0, e), i = 0; 256 > i; i++) t.lineTo(Math.round(a * i / 256), Math.round(e - .95 * e * s[i] / r));
            t.lineTo(a, e), t.fill()
        },
        postHistogram: function() {
            for (var t, s, i, r, a, e = this.curvesCtx.getPixelData(), h = e.width, o = e.height, n = e.data, u = 0; o > u; u++) for (var c = 0; h > c; c++) t = 4 * (u * h + c), s = n[t], i = n[t + 1], r = n[t + 2], a = n[t + 3], s > 240 && a > 20 ? setPixel(e, c, u, [255, 0, 0, 100]) : i > 240 && a > 20 ? setPixel(e, c, u, [0, 255, 0, 100]) : r > 240 && a > 20 ? setPixel(e, c, u, [0, 0, 255, 100]) : 20 > s && a > 20 ? setPixel(e, c, u, [0, 255, 255, 100]) : 20 > i && a > 20 ? setPixel(e, c, u, [255, 0, 255, 100]) : 20 > r && a > 20 ? setPixel(e, c, u, [255, 255, 0, 100]) : a > 20 ? setPixel(e, c, u, [0, 0, 0, 100]) : setPixel(e, c, u, [0, 0, 0, 0]);
            this.curvesCtx.setPixelData(e)
        },
        drawCurve: function() {
            var t, s = this.curvesCtx,
                i = this.curvesCanvas.height,
                r = this.curvesCanvas.width;
            for (s.beginPath(), s.lineWidth = 1, s.strokeStyle = "rgba(0,0,0,1)", s.shadowColor = "#000000", s.shadowBlur = 1, s.shadowOffsetX = 0, s.shadowOffsetY = 0, s.beginPath(), s.moveTo(0, i), t = 0; 256 > t; t++) s.lineTo(Math.round(r * t / 256), i - Math.round(i * this.curve[t] / 256));
            for (s.lineTo(r, 0), s.stroke(), t = 1; this.points.length - 1 > t; t++) {
                var a = this.points[t];
                s.strokeStyle = "rgba(0,0,0,1)", s.fillStyle = "#ededed", s.beginPath(), s.moveTo(Math.floor(r * a[0] / 256), i - Math.ceil(i * a[1] / 256)), s.arc(Math.floor(r * a[0] / 256), i - Math.ceil(i * a[1] / 256), 5, 0, 2 * Math.PI, !1), s.stroke(), s.fill(), s.fillStyle = "#a9a9a9", s.beginPath(), s.moveTo(Math.floor(r * a[0] / 256), i - Math.ceil(i * a[1] / 256)), s.arc(Math.floor(r * a[0] / 256), i - Math.ceil(i * a[1] / 256), 2, 0, 2 * Math.PI, !1), s.fill()
            }
        },
        applyToData: function(t) {
            this.dataProcessedID = this.dataLoadedId, this.resultData && this.resultData.width == mgr.width && this.resultData.height == mgr.height || (this.resultData = mgr.bean.getStagingCtx().createImageData(mgr.width, mgr.height));
            for (var s, i = t.data, r = this.resultData.data, a = 0; mgr.height > a; a++) for (var e = 0; mgr.width > e; e++) s = 4 * (a * mgr.width + e), r[s] = this.curve[i[s]], r[s + 1] = this.curve[i[s + 1]], r[s + 2] = this.curve[i[s + 2]], r[s + 3] = i[s + 3];
            return mgr.selectionManager.hasSelection && this.maskResultData(t), this.resultData
        },
        coords2Curve: function(t) {
            return this.canvasWidth && this.canvasHeight || (this.canvasWidth = $(".curvesCanvas").width(), this.canvasHeight = $(".curvesCanvas").height()), [Math.round(255 * t[0] / this.canvasWidth), Math.round(255 * (this.canvasHeight - t[1]) / this.canvasHeight)]
        },
        startCurveDrag: function(t) {
            this.startPoints = $.extend(!0, [], this.sortPoints());
            var s = this.coords2Curve(t);
            this.minX = 0, this.maxX = 256;
            var i, r;
            for (r = 1; this.startPoints.length - 1 > r; r++) if (i = this.startPoints[r], 9 > MathUtils.distance(s, i)) {
                this.startPoints.splice(r, 1);
                break
            }
            for (r = 1; this.startPoints.length - 1 > r; r++) i = this.startPoints[r], s[0] >= i[0] && (this.minX = Math.max(this.minX, i[0])), i[0] >= s[0] && (this.maxX = Math.min(this.maxX, i[0]))
        },
        moveCurveDrag: function(t) {
            var s = this.coords2Curve(t),
                i = {
                    curve: this.flatCurve(),
                    points: $.extend(!0, [], this.startPoints)
                }, r = 15;
            s[0] > this.minX && this.maxX > s[0] && s[1] > 0 && 256 > s[1] ? i.points.push(s) : s[0] > -r && 256 + r > s[0] && s[1] > -r && 256 + r > s[1] && i.points.push([Math.max(this.minX + 1, Math.min(this.maxX - 1, s[0])), Math.max(0, Math.min(255, s[1]))]), this.queue(i, null, !1)
        },
        endCurveDrag: function() {},
        reset: function() {
            this.curve = this.flatCurve(), this.points = []
        },
        isIdentity: function() {
            for (var t = 0; 256 > t; t++) if (this.curve[t] != t) return !1;
            return !0
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/curves.js")
});
DWait.ready(["jms/pages/drawplz/postProcessors/baseProcessor.js"], function() {
    window.SaturationProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Saturation")
        },
        init: function() {
            this.initSlider(".ppSaturationSlider", function(t) {
                var a = Math.max(0, Math.min(1, t[0] / this.trackWidth));
                this.saturation = a, this.updateSlider(), this.uiDelayedQueue({
                    saturation: a
                }, null, !1)
            }.bindTo(this)), this.updateSlider()
        },
        processImpl: function(t, a) {
            return this.chunkProcess(a, function(t, a) {
                if (1 != this.scale) {
                    var s = RGBToHSP(t.data[a], t.data[a + 1], t.data[a + 2]),
                        i = HSPToRGB(s[0], Math.max(0, Math.min(1, this.scale * s[1])), s[2]);
                    this.resultData.data[a] = i[0], this.resultData.data[a + 1] = i[1], this.resultData.data[a + 2] = i[2], this.resultData.data[a + 3] = t.data[a + 3]
                } else this.resultData.data[a] = t.data[a], this.resultData.data[a + 1] = t.data[a + 1], this.resultData.data[a + 2] = t.data[a + 2], this.resultData.data[a + 3] = t.data[a + 3]
            }.bindTo(this))
        },
        updateSlider: function() {
            mgr.sliderManager.setVal($(".ppSaturationSlider"), this.saturation, Math.round((this.saturation - .5) / .005), ""), this.scale = 1 == this.saturation ? 100 : Math.min(99, this.saturation / (1 - this.saturation))
        },
        getHash: function() {
            return this.scale
        },
        reset: function() {
            this.saturation = .5, this.updateSlider()
        },
        shouldPassThrough: function() {
            return .5 == this.saturation
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/saturation.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/crc32.js", "jms/pages/drawplz/slider.js", "jms/pages/drawplz/postProcessors/baseProcessor.js"], function() {
    window.BrightnessProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Brightness"), this.MAX_SCALE = .8
        },
        init: function() {
            this.initSlider(".ppBrightnessSlider", function() {
                var s = Math.max(0, Math.min(1, coords[0] / this.trackWidth));
                this.brightness = s, this.updateSlider(), this.uiDelayedQueue({
                    brightness: s
                }, null, !1)
            }.bindTo(this)), this.updateSlider()
        },
        processImpl: function(s, t) {
            return this.chunkProcess(t, function(s, t) {
                if (.5 != this.brightness) {
                    var a = RGBToHSP(s.data[t], s.data[t + 1], s.data[t + 2]),
                        i = this.brightness > .5 ? Math.max(0, Math.min(1, a[2] * this.scale)) : Math.max(0, Math.min(1, 1 - (1 - a[2]) * this.scale)),
                        e = HSPToRGB(a[0], a[1], i);
                    this.resultData.data[t] = e[0], this.resultData.data[t + 1] = e[1], this.resultData.data[t + 2] = e[2], this.resultData.data[t + 3] = s.data[t + 3]
                } else this.resultData.data[t] = s.data[t], this.resultData.data[t + 1] = s.data[t + 1], this.resultData.data[t + 2] = s.data[t + 2], this.resultData.data[t + 3] = s.data[t + 3]
            }.bindTo(this))
        },
        updateSlider: function() {
            mgr.sliderManager.setVal($(".ppBrightnessSlider"), this.brightness, Math.round((this.brightness - .5) / .005), ""), this.scale = 1 + Math.pow((this.brightness - .5) / .5, 2) * this.MAX_SCALE
        },
        getHash: function() {
            return this.brightness
        },
        reset: function() {
            this.brightness = .5, this.updateSlider()
        },
        shouldPassThrough: function() {
            return .5 == this.brightness
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/brightness.js")
});
DWait.ready(["jms/pages/drawplz/postProcessors/baseProcessor.js"], function() {
    window.ContrastProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Contrast")
        },
        init: function() {
            this.initSlider(".ppContrastSlider", function() {
                var t = Math.max(0, Math.min(1, coords[0] / this.trackWidth));
                this.contrast = 75 * (t - .5), this.updateSlider(), this.uiDelayedQueue({
                    contrast: t
                }, null, !1)
            }.bindTo(this)), this.updateSlider()
        },
        processImpl: function(t, a) {
            return this.chunkProcess(a, function(t, a) {
                if (1 != this.factor) {
                    var s = RGBToHSP(t.data[a], t.data[a + 1], t.data[a + 2]),
                        r = HSPToRGB(s[0], s[1], Math.max(0, Math.min(1, this.factor * (s[2] - .5) + .5)));
                    this.resultData.data[a] = r[0], this.resultData.data[a + 1] = r[1], this.resultData.data[a + 2] = r[2], this.resultData.data[a + 3] = t.data[a + 3]
                } else this.resultData.data[a] = t.data[a], this.resultData.data[a + 1] = t.data[a + 1], this.resultData.data[a + 2] = t.data[a + 2], this.resultData.data[a + 3] = t.data[a + 3]
            }.bindTo(this))
        },
        updateSlider: function() {
            mgr.sliderManager.setVal($(".ppContrastSlider"), .5 + this.contrast / 75, Math.round(200 * this.contrast / 75), ""), this.factor = 259 * (this.contrast + 255) / (255 * (259 - this.contrast))
        },
        getHash: function() {
            return this.factor
        },
        reset: function() {
            this.contrast = 0, this.updateSlider()
        },
        shouldPassThrough: function() {
            return 0 === this.contrast
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/contrast.js")
});
DWait.ready(["jms/pages/drawplz/postProcessors/baseProcessor.js"], function() {
    window.TemperatureProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Temperature")
        },
        init: function() {
            this.initSlider(".ppTempSlider", function(t) {
                var e = Math.max(0, Math.min(1, t[0] / this.trackWidth));
                this.temperature = e - .5, this.updateSlider(), this.uiDelayedQueue({
                    temperature: e
                }, null, !1)
            }.bindTo(this)), this.updateSlider()
        },
        processImpl: function(t, e) {
            return this.chunkProcess(e, function(t, e) {
                var r, a, s, i = [t.data[e], t.data[e + 1], t.data[e + 2]],
                    u = RGBToHSP(i[0], i[1], i[2]);
                r = Math.abs(this.temperature), a = 1 - r, s = this.temperature > 0 ? [(i[0] * a + 255 * r) / 2, (i[1] * a + 255 * r) / 2, i[2] * a / 2] : [i[0] * a / 2, i[1] * a / 2, (i[2] * a + 255 * r) / 2];
                var n = RGBToHSP(s[0], s[1], s[2]),
                    o = HSPToRGB(n[0], n[1], u[2]);
                this.resultData.data[e] = o[0], this.resultData.data[e + 1] = o[1], this.resultData.data[e + 2] = o[2], this.resultData.data[e + 3] = t.data[e + 3]
            }.bindTo(this))
        },
        updateSlider: function() {
            mgr.sliderManager.setVal($(".ppTempSlider"), this.temperature + .5, Math.round(200 * this.temperature), "")
        },
        getHash: function() {
            return this.temperature
        },
        reset: function() {
            this.temperature = 0, this.updateSlider()
        },
        shouldPassThrough: function() {
            return 0 === this.temperature
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/temperature.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/crc32.js", "jms/pages/drawplz/slider.js", "jms/pages/drawplz/postProcessors/baseProcessor.js"], function() {
    window.TintProcessor = BaseProcessor.extend({
        constructor: function() {
            this.base("Tint")
        },
        init: function() {
            this.initSlider(".ppTintSlider", function() {
                var t = Math.max(0, Math.min(1, coords[0] / this.trackWidth));
                this.tint = t - .5, this.updateSlider(), this.uiDelayedQueue({
                    tint: t
                }, null, !1)
            }.bindTo(this)), this.updateSlider()
        },
        processImpl: function(t, s) {
            return this.chunkProcess(s, function(t, s) {
                var i, a = [t.data[s], t.data[s + 1], t.data[s + 2]],
                    n = RGBToHSP(a[0], a[1], a[2]),
                    r = Math.abs(this.tint),
                    e = 1 - r;
                i = 0 > this.tint ? [(a[0] * e + 255 * r) / 2, a[1] * e / 2, (a[2] * e + 255 * r) / 2] : [a[0] * e / 2, (a[1] * e + 255 * r) / 2, a[2] * e / 2];
                var o = RGBToHSP(i[0], i[1], i[2]),
                    d = HSPToRGB(o[0], o[1], n[2]);
                this.resultData.data[s] = d[0], this.resultData.data[s + 1] = d[1], this.resultData.data[s + 2] = d[2], this.resultData.data[s + 3] = t.data[s + 3]
            }.bindTo(this))
        },
        updateSlider: function() {
            mgr.sliderManager.setVal($(".ppTintSlider"), this.tint + .5, Math.round(200 * this.tint), "")
        },
        getHash: function() {
            return this.tint
        },
        reset: function() {
            this.tint = 0, this.updateSlider()
        },
        shouldPassThrough: function() {
            return 0 === this.tint
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/postProcessors/tint.js")
});
if (window.DWait) {
    DWait.count()
}

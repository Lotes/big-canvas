/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
function Base85() {}
Base85.prototype.alphabetChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}()[]<>=-~_+?^`|/!#$%&", Base85.prototype.powerChars = ".,;", Base85.prototype.repeatChar = "*", Base85.prototype.encode = function(e) {
    if (!e || !e.length) return "";
    for (var a, r, t, s, o, p = "", h = 0, B = 0; e.length > h;) {
        for (a = parseInt(e[h]), o = 1; parseInt(e[++h]) == a && 84 > o;)++o;
        if (B += o, r = 0 | a / 85, t = a % 85, s = "", r && (s += Base85.powerChars.charAt(r - 1)), s += Base85.alphabetChars.charAt(t), o > 3) p += Base85.repeatChar + Base85.alphabetChars.charAt(o) + s;
        else for (; o--;) p += s
    }
    return p
}, Base85.prototype.decode = function(e) {
    if (!e) return "";
    for (var a, r = "", t = [], s = 0; e.length > s;) {
        for (a = 1, r = e.charAt(s), r == Base85.repeatChar && (a = Base85.alphabetChars.indexOf(e.charAt(++s)), r = e.charAt(++s)), power = 0, m = Base85.powerChars.indexOf(r), - 1 != m && (power = 85 * (m + 1), r = e.charAt(++s)), val = Base85.alphabetChars.indexOf(r) + power; a--;) t.push(val);
        ++s
    }
    return t
}, Base85.alphabetChars = Base85.prototype.alphabetChars, Base85.powerChars = Base85.prototype.powerChars, Base85.repeatChar = Base85.prototype.repeatChar, Base85.decode = Base85.prototype.decode, Base85.encode = Base85.prototype.encode, window.Base85 = Base85, window.DWait && DWait.run("jms/lib/base85.js");
window.AssetLoader = {
    requested_files: {},
    loadAssets: function(e, t, s) {
        if (!window.DWait) throw Error("DWait is not available?");
        if (!(e && e.length && t && t.length)) throw Error("Invalid asset filename(s) and/or invalid asset name(s) provided");
        if (!s || "function" != typeof s) throw Error("This call is asynchronous. Callback must be provided");
        for (var a = bind(this, function(e, t) {
            e = e || [];
            for (var s = {}, a = 0; e.length > a;) {
                var r = e[a];
                s[r] = window.BrushAssets && BrushAssets[r] ? BrushAssets[r] : false, a++
            }
            t(s)
        }, t, s), r = [], i = 0; e.length > i; ++i) e[i] in AssetLoader.requested_files || (r.push(e[i]), AssetLoader.requested_files[e[i]] = true);
        if (r.length) try {
            DWait.readyLink("jms/dwait/download.js", this, function() {
                DWait.download(r, a)
            })
        } catch (d) {} else window.setTimeout(bind(AssetLoader, AssetLoader.checkIfFilesAreLoaded, e, a), 300)
    },
    checkIfFilesAreLoaded: function(e, t) {
        for (var s = true, a = 0; e.length > a; a++) s = s && "completed" == DWait.downloads[e[a]];
        s ? t() : window.setTimeout(bind(AssetLoader, AssetLoader.checkIfFilesAreLoaded, e, t), 300)
    },
    convertAssetToPixelData: function(e, t) {
        if (!e || !e.createImageData) throw Error("Invalid context provided");
        if (!(t && t.width && t.height && t.data)) return false;
        try {
            for (var s = Base85.decode(t.data), a = e.createImageData(t.width, t.height), r = 0, i = a.data, d = t.inverted || false, o = i.length >> 2; o--;) r = o << 2, i[r] = i[r + 1] = i[r + 2] = 0, i[r + 3] = d ? 255 - s[o] : s[o];
            return a
        } finally {}
        return false
    },
    defaults: {
        base_path: window.vms_feature && vms_feature("staging") ? "http://s.deviantart.com/styles-trunk/jms/pages/drawplz/brushes/assets/" : "http://st.deviantart.com/styles/jms/pages/drawplz/brushes/assets/"
    }
}, window.DWait && DWait.run("jms/pages/drawplz/assetLoader.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/Base.js", "jms/lib/Bean.js"], function() {
    window.BrushSettings = Base.extend({
        constructor: function(bean, brush) {
            this.bean = bean, this.brush = brush
        },
        save: function() {
            this.size = this.bean.getBrushSize(), 
			this.opacity = this.bean.getBrushOpacity(), 
			this.hardness = this.bean.getBrushHardness(), 
			this.saveToStorage()
        },
        restore: function() {
            this.bean.setBrushHardness(this.hardness), 
			this.bean.setBrushOpacity(this.opacity), 
			this.bean.setBrushSize(this.size)
        },
        set: function(size, opacity, hardness) {
            this.size = size, 
			this.opacity = opacity, 
			this.hardness = hardness
        },
        saveToStorage: function() {
            getManager().brushSelector.initializing 
			|| mgr.bean.getRDReader() 
			|| safeLocalSet("drawplz_brushsetting_" + this.brush.options.name, [this.size, this.opacity, this.hardness].join(":"))
        },
        restoreFromStorage: function() {
            var s = safeLocalGet("drawplz_brushsetting_" + this.brush.options.name, this.brush.options.defaultSettings, function(s) {
                try {
                    return s.split(":")
                } catch (t) {
                    return stdLog("Could not split: ", s), s
                }
            });
            this.set(s[0], s[1], s[2]),
			this.restore(), 
			(isNaN(this.bean.getBrushHardness()) 
			|| isNaN(this.bean.getBrushOpacity()) 
			|| isNaN(this.bean.getBrushSize())) 
			&& (d = this.brush.options.defaultSettings, this.set(d[0], d[1], d[2]), this.restore(), this.save())
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushSettings.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushSettings.js", "jms/pages/drawplz/consts.js", "jms/pages/drawplz/lib/bezier.js"], function() {
    window.MAX_BRUSH_SIZE = 110, 
	window.BrushBase = Base.extend({
        defaultOptions: {
            name: "",
            wacom: false,
            ie: false,
            ie9: true,
            maskBuffers: ["stgCtx"],
            inToolbar: true,
            shouldUndo: true,
            asyncPush: false,
            specialBrushes: false,
            secondarySelector: false,
            defaultSettings: [20, 1, .9],
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_basic.png",
            shouldHandleSharpStrokes: false,
            defaultModifiers: true,
            handlesOwnSelection: false,
            handlesOwnMinMax: false,
            minMaxWidth: MAX_BRUSH_SIZE,
            usersBuffer: false,
            async: false,
            hasFlush: false,
            shiftJitter: 1,
            straightShift: false,
            whichTool: "draw",
            minMoveDraws: 0
        },
        options: {},
        constructor: function(bean, layerContext, bufferCtx, brushCtx) {
            this.logger = new StdLogger("Brush"), 
			this.settings = new BrushSettings(bean, this), 
			this.bean = bean, 
			this.ctx = bean.getSelectedLayer().getContext(), 
			this.bufferCtx = bufferCtx, 
			this.brushCtx = brushCtx, 
			this.button = null, 
			this.activated = true;
            for (var r in this.defaultOptions) 
				void 0 === this.options[r] 
				&& (this.options[r] = this.defaultOptions[r]);
            this.lastCoords = null, 
			this.previousCoords = null, 
			this.velocityX = 0, 
			this.velocityY = 0, 
			this.velocity = 0, 
			this.shiftKey = false, 
			this.settings.restoreFromStorage(), 
			this.ctxArr = [this.ctx, this.bufferCtx, this.brushCtx], 
			this.bean.subscribe("selectedLayer", function() {
                var bean = this.bean.getSelectedLayer();
                bean && (
					this.ctxArr = [this.ctx, this.bufferCtx, this.brushCtx]
				)
            }.bindTo(this)), 
			this.init()
        },
        init: function() {},
        brushPreview: function() {
            $(".brushPreviewCanvas").css("opacity", 1), 
			$(".brushPicker .brushPickerCover").hide()
        },
        getCursorSize: function() {
            return this.bean.getBrushSize()
        },
        revertThingsIChanged: function() {},
        strokePreview: function(strokeCallback, offsetPoint, doStroke) {
            for (var path = [], r = 0; r < 30; r = r + .6 + r / 100) 
				coord = [], 
				coord[0] = offsetPoint[0] - Math.floor(.4 * Math.pow(10 - r, 2)) + 25, 
				coord[1] = offsetPoint[1] + 2 * r - 20, 
				coord[2] = Math.pow((10 + r) / 40, 1.5), 
				coord[3] = [0, 0], 
				path.push(coord), 
				doStroke || strokeCallback(coord, path);
            doStroke && strokeCallback(coord, path)
        },
        recordVelocity: function() {
            this.lastCoords ? 
				this.previousCoords ? 
					(this.velocityX = this.lastCoords[0] - this.previousCoords[0], 
					this.velocityY = this.lastCoords[1] - this.previousCoords[1], 
					this.velocity = Math.sqrt(Math.pow(this.velocityX, 2) + Math.pow(this.velocityY, 2)), 
					this.previousCoords = [this.lastCoords[0], this.lastCoords[1]]) 
					: (this.velocity = 0, 
					this.velocityX = 0, 
					this.velocityY = 0, 
					this.previousCoords = [this.lastCoords[0], this.lastCoords[1]]) : (this.velocityX = 0, this.velocityY = 0, this.velocity = 0)
        },
        setButton: function(button) {
            this.button = button
        },
        setTool: function() {
            var t = this.options.whichTool;
            switch ($(".toolbutton").removeClass("toolbuttonActive"), mgr.toolManager.toolAction(t, true), safeLocalSet("drawplz_lastbrush_" + t, this.options.name), $(".brushSelectorArrow").removeClass("brushSelectorArrowGrey"), t) {
                case "draw":
                    $(".toolbutton[data-name=Draw]").addClass("toolbuttonActive"), $(".specialColor").hide(), $(".brushPreview .brushPreviewCanvas").show(), mgr.bean.setIsLargeBrushArea(false);
                    break;
                case "erase":
                    $(".toolbutton[data-name=Eraser]").addClass("toolbuttonActive"), $(".brushSelectorArrow").addClass("brushSelectorArrowGrey");
                    break;
                case "dropper":
                    $(".toolbutton[data-name='Eye Dropper']").addClass("toolbuttonActive");
                    break;
                case "flood":
                    $(".toolbutton[data-name='Flood Fill']").addClass("toolbuttonActive");
                    break;
                case "select":
                    $(".toolbutton[data-name='Select']").addClass("toolbuttonActive");
                    break;
                case "move":
                    $(".toolbutton[data-name='Move']").addClass("toolbuttonActive");
                    break;
                case "smudge":
                    $(".toolbutton[data-name='Blending']").addClass("toolbuttonActive")
            }
            mgr.layoutManager.alignBsArrow()
        },
        stroke: function() {},
        getRGBA: function(rgb, a, asList) {
            var sr = rgb.substr(0, 2),
                r = parseInt(sr.substring(0, 2), 16),
                sg = rgb.substr(2, 2),
                g = parseInt(sg.substring(0, 2), 16),
                sb = rgb.substr(4, 2),
                b = parseInt(sb.substring(0, 2), 16);
            return asList ? [r, g, b, a] : "rgba(" + r + ", " + g + ", " + b + ", " + a + ")"
        },
        clearMinMax: function() {
            this.minX = mgr.width, 
			this.maxX = 0, 
			this.minY = mgr.height, 
			this.maxY = 0
        },
        minMax: function(point) {
            this.minX = Math.min(this.minX, point[0] - this.options.minMaxWidth), 
			this.maxX = Math.max(this.maxX, point[0] + this.options.minMaxWidth), 
			this.minY = Math.min(this.minY, point[1] - this.options.minMaxWidth), 
			this.maxY = Math.max(this.maxY, point[1] + this.options.minMaxWidth)
        },
        clearLineStyle: function(t) {
            for (var o = 0; t.length > o; o++) {
                var s = t[o];
                s.shadowColor = this.getRGBA("000000", 0), 
				s.shadowBlur = 0, 
				s.globalAlpha = 1
            }
        },
        setDefaultLineStyle: function(contextArray) {
            contextArray = contextArray || this.ctxArr;
            for (var i = 0; i < contextArray.length; i++) {
                var context = contextArray[i];
                context.lineCap = "round", 
				context.lineJoin = "round", 
				context.globalCompositeOperation = "source-over", 
				context.globalAlpha = 1, 
				context.strokeStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), 
				context.lineWidth = this.bean.getBrushSize()
            }
        },
        getRGBALong: function(hex, a) {
            var rgb = parseInt("0x" + hex, 16),
                b = 255 & s >> 16,
                g = 255 & s >> 8,
                r = 255 & s;
            return a = 255 & (0 | 255 * a), b << 24 | g << 16 | r << 8 | a
        },
        isActivated: function() {
            return this.activated
        },
        updateVML: function(t, o) {
            for (var s = "", e = 0; o.length > e; e++) {
                var r = o[e];
                ieCoords = this.bufferCtx.getCoords_(Math.floor(r[0][0]), Math.floor(r[0][1])), 
				s += " m" + ieCoords.x + "," + ieCoords.y;
                for (var i = 0; r.length > i; i++) 
					c = r[i], 
					ieCoords = this.bufferCtx.getCoords_(Math.floor(c[0]), 
					Math.floor(c[1])), 
					s += " l" + ieCoords.x + "," + ieCoords.y
            }
            s += " e", 
			$(t).attr("path", s)
        },
        getControlPoints: function(path, controlPoints, s, e) {
            for (var firstPoint, secondPoint, thirdPoint, index = 0; index < path.length; index++) 
				if (!controlPoints[index]) {
					if (
						firstPoint = index === 0 ? null : path[index - 1], 
						secondPoint = path[index], 
						index > path.length - 2
					) {
						if (e) 
							continue;
						thirdPoint = null
					} else 
						thirdPoint = path[index + 1];
					controlPoints[index] = this.controlPoints(firstPoint, secondPoint, thirdPoint, s)
				}
        },
        controlPoints: function(t, o, s, e) {
            return window.controlPoints(t, o, s, e)
        },
        random: function() {
            var t, o = mgr.bean.getRDWriter();
            return o.isStub ? (t = mgr.bean.getRDReader(), t ? t.getRandom() : Math.random()) : o.getRandom()
        },
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name, mgr.bean.getColor(), mgr.bean.getSecondaryColor(), mgr.bean.getBrushOpacity(), mgr.bean.getBrushSize(), mgr.bean.getBrushHardness()])
        },
        recordPlayMeta: function(t) {
            try {
                mgr.bean.startAtomic(), mgr.bean.setColor(t[1]), mgr.bean.setSecondaryColor(t[2]), mgr.bean.setBrushOpacity(t[3]), mgr.bean.setBrushSize(t[4]), mgr.bean.setBrushHardness(t[5])
            } catch (o) {} finally {
                mgr.bean.endAtomic()
            }
            return true
        },
        dotFunction: function(t) {
            this.moveDraw([t[0], t[1] - 1, 1, [0, 0]], null), this.moveDraw(t, null), this.moveDraw([t[0], t[1] + 1, 1, [0, 0]], null), this.moveDraw(t, null), this.moveDraw([t[0] - 1, t[1], 1, [0, 0]], null), this.moveDraw(t, null), this.moveDraw([t[0] + 1, t[1], 1, [0, 0]], null)
        },
        specialBrushFunction: function() {}
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/brushBase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.BasicBrush = BrushBase.extend({
        options: {
            name: "Basic",
            wacom: false,
            ie: true,
            ie9: true,
            glyphPos: 1,
            defaultSettings: [3, 1, 1],
            effectLabel: "Softness",
            maskBuffers: ["bufferCtx"],
            minMaxWidth: 1.5 * MAX_BRUSH_SIZE,
            hasFlush: true,
            straightShift: true,
            minMoveDraws: 3
        },
        constructor: function(bean, layerContext, bufferContext, brushContext) {
            this.base(bean, layerContext, bufferContext, brushContext), 
			this.SHADOW_DISTANCE = 10000, 
			this.count = 0
        },
        drawDotFunction: function() {},
        init: function() {
            for (var index = 0; index < this.ctxArr.length; index++) {
                var context = this.ctxArr[index];
                context.lineCap = "round", 
				context.lineJoin = "round"
            }
        },
        brushPreview: function(t) {
            this.base(t), 
			this.setLineStyle([this.brushCtx, this.bufferCtx]), 
			this.brushInit([this.brushCtx, this.bufferCtx]), 
			this.brushCtx.clear(), 
			this.bufferCtx.clear(), 
			this.setupShadow(this.brushCtx), 
			this.strokePreview(function(t, path) {
                this.stroke(this.brushCtx, path, [], true)
            }.bindTo(this), t, true), 
			this.clearShadow(this.brushCtx)
        },
        setLineStyle: function(contextArray) {
            this._setLineStyle(contextArray, this.bean.getColor())
        },
        _setLineStyle: function(contextArray) {
            this.baseLineWidth = this.bean.getBrushSize(), 
			this.setDefaultLineStyle(contextArray);
            for (var index = 0; index < contextArray.length; index++) 
				contextArray[index].lineWidth = thiindex.baindexeLineWidth
        },
        brushInit: function(t) {
            this._brushInit(t, this.bean.getColor())
        },
        _brushInit: function(t, color) {
            color || (color = this.bean.getColor()), 
			this.hex = color, 
			this.radius = this.bean.getBrushSize(), 
			this.hardness = this.bean.getBrushHardness()
        },
        setupShadow: function(context) {
            var s;
            this.isOpaque = 
				this.bean.getBrushOpacity() > .9 
				&& 1 == this.bean.getBrushHardness(), 
					this.isOpaque ? 
					(
						this.SHADOW_DISTANCE = 0, 
						context.shadowColor = this.getRGBA(this.hex, 0), 
						context.strokeStyle = this.getRGBA(this.hex, this.bean.getBrushOpacity()), 
						context.fillStyle = this.getRGBA(this.hex, this.bean.getBrushOpacity()), 
						context.shadowBlur = 0
					) : 
					(
						this.SHADOW_DISTANCE = 2 * getManager().width, 
						context.shadowColor = this.getRGBA(this.hex, this.bean.getBrushOpacity()), 
						context.strokeStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), 
						context.fillStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), 
						s = 1.5 * Math.pow(1 - this.hardness, 2) * Math.log(this.radius), 
						mgr.calibrator.specBlur(context, s)
					), 
					context.shadowOffsetX = this.SHADOW_DISTANCE, 
					context.shadowOffsetY = 0
        },
        clearShadow: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.shadowColor = this.getRGBA("ffffff", 0), 
				s.shadowBlur = 0
            }
        },
        startDraw: function(point) {
            this.brushInit([this.ctx, this.bufferCtx]), 
			this.setLineStyle([this.ctx, this.bufferCtx]), 
			this.path = [], 
			this.cp = [], 
			this.setupShadow(this.bufferCtx), 
			this.moveDraw(point)
        },
        moveDraw: function(point, s, i) {
            return 
				this.path.push(point), 
				this.minMax(point), 
				this._moveDraw(false, i), 
				false
        },
        _moveDraw: function(t, s) {
            var pathLength = this.path.length;
            pathLength > 2 ? 
				this.cp[pathLength - 2] = this.controlPoints(this.path[pathLength - 3], this.path[pathLength - 2], this.path[pathLength - 1]) 
				: 2 == pathLength 
					&& (
						this.cp[0] = [this.path[0], this.path[0]]
					), 
					s 
					|| (
						!this.isOpaque 
						|| t ? (this.count++ % 5 || t) 
						&& (
							this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), 
							this.stroke(this.bufferCtx, this.path, this.cp, t)
						) : 
						(
							this.count++ % 5 || t
						) 
						&& this.stroke(this.bufferCtx, this.path, this.cp, t)
					)
        },
        dotFunction: function(t) {
            var s = t[0],
                i = t[1],
                h = mgr.bean.getBrushSize();
            this.minX = s - h, 
			this.maxX = s + h, 
			this.minY = i + h, 
			this.maxY = i + h, 
			this.ctx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), 
			this.setupShadow(this.ctx), this.ctx.beginPath(),
			this.ctx.moveTo(s - this.SHADOW_DISTANCE, i), 
			this.ctx.arc(s - this.SHADOW_DISTANCE, i, this.bean.getBrushSize() / 2, 0, 2 * Math.PI, false), 
			this.ctx.fill(), 
			this.clearShadow(this.ctx)
        },
        flush: function() {
            this.isOpaque 
			|| this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), 
			this.stroke(this.bufferCtx, this.path, this.cp, false)
        },
        endDraw: function(t) {
            return 
				this.path.push(t), 
				this._moveDraw(true), 
				this.ctx.globalAlpha = 1, 
				this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), 
				this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), 
				this.clearShadow(this.bufferCtx), 
				false
        },
        stroke: function(ctx, path, controlPoints, h) {
            var e, a;
            if (path.length) {
                var r = h ? path.length : path.length - 2;
                h 
				&& (!controlPoints || r - 1 > controlPoints.length) 
				&& this.getControlPoints(path, controlPoints), 
				ctx.beginPath(), 
				ctx.moveTo(path[0][0] - this.SHADOW_DISTANCE, path[0][1]);
                for (var index = 0; index < r; index++) 
					if (h) {
						try {
							e = 0 === index ? controlPoints[0][1] : controlPoints[index - 1][1]
						} catch (o) {
							e = [null, null]
						}
						try {
							a = path.length - 2 > index ? controlPoints[index][0] : [path[index], path[index]]
						} catch (o) {
							a = [null, null]
						}
						if (e && a && e[0] && e[1] && a[0] && a[1]) 
							if (this.isCollinear(index < 1? path[0] : path[index - 1], e, a, path[index])) 
								ctx.lineTo(path[index][0] - this.SHADOW_DISTANCE, path[index][1]);
							else 
								try {
									ctx.bezierCurveTo(
										e[0] - this.SHADOW_DISTANCE, 
										e[1], 
										a[0] - this.SHADOW_DISTANCE, 
										a[1], 
										path[index][0] - this.SHADOW_DISTANCE, 
										path[index][1]
									)
								} catch (o) {
									ctx.lineTo(path[index][0] - this.SHADOW_DISTANCE, path[index][1])
								} 
						else 
							ctx.lineTo(path[index][0] - this.SHADOW_DISTANCE, path[index][1])
					} else 
						ctx.lineTo(path[index][0] - this.SHADOW_DISTANCE, path[index][1]);
                ctx.stroke()
            }
        },
        isCollinear: function(t, s, i, h) {
            var e;
            return e = t[0] * (s[1] - i[1]) + s[0] * (i[1] - t[1]) + i[0] * (t[1] - s[1]), 1 > Math.abs(e) && (e = h[0] * (s[1] - i[1]) + s[0] * (i[1] - h[1]) + i[0] * (h[1] - s[1]), 1 > Math.abs(e)) ? true : false
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/basic.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.ScatterBrush = BrushBase.extend({
        options: {
            name: "Scatter",
            wacom: true,
            ie: true,
            ie9: true,
            glyphPos: 9,
            defaultSettings: [35, .5, .65],
            effectLabel: "Density",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_scatter.png",
            shiftJitter: 0
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e)
        },
        getCursorSize: function() {
            return 2 * this.bean.getBrushSize()
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over", this.count = 0
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx, this.bufferCtx]), this.brushInit([this.brushCtx, this.bufferCtx]), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.radius = this.bean.getBrushSize() / 2, this.density = 1 - this.bean.getBrushHardness()
        },
        setLineStyle: function(t) {
            var s;
            this.setDefaultLineStyle(t);
            for (var i = 0; t.length > i; i++) {
                var e = t[i];
                s = this.bean.getBrushOpacity(), 
				e.globalAlpha = s, 
				e.strokeStyle = this.getRGBA(this.bean.getColor(), 1), 
				e.fillStyle = this.getRGBA(this.bean.getColor(), 1), 
				e.lineWidth = 2
            }
        },
        startDraw: function(t) {
            return 
				this.setLineStyle([this.bufferCtx, mgr.bean.getSelectedLayer().ctx]), 
				this.brushInit(), 
				this.path = [], 
				this.count = 0, 
				this.moveDraw(t), 
				false
        },
        moveDraw: function(t) {
            return 
				this.path.push(t), 
				this.stroke(this.ctx, this.path), 
				false
        },
        endDraw: function(t) {
            return 
				this.moveDraw(t),
				false
        },
        stroke: function(ctx, path) {
            ctx.beginPath();
            var last = path[path.length - 1];
            if (1.3 * this.random() > 1 - this.density) {
                var e = last[0] + Math.cos(2 * this.random() * Math.PI) * this.radius - 2 * this.radius * last[3][0],
                    r = last[1] + Math.cos(2 * this.random() * Math.PI) * this.radius + 2 * this.radius * last[3][1],
                    h = Math.ceil(this.random() * this.radius * Math.max(.2, Math.pow(i[2], .8)));
                ctx.beginPath(), 
				ctx.moveTo(e + h, r), 
				ctx.arc(e, r, h, 0, 2 * Math.PI, false), 
				ctx.fill()
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/scatter.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/base85.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/scatter.js", "jms/pages/drawplz/assetLoader.js"], function() {
    window.OrganicBrush = ScatterBrush.extend({
        options: {
            name: "Organic",
            wacom: false,
            ie: false,
            ie9: true
        },
        constructor: function(s, t, a, e) {
            this.base(s, t, a, e), this.imagesData = [], this.hasAllRequiredAssets = false
        },
        parseAssets: function(s) {
            this.imagesData = [];
            var t = true;
            for (var a in s) {
                var e = AssetLoader.convertAssetToPixelData(this.ctx, s[a]);
                "false" !== e ? this.imagesData.push(e) : t = false
            }
            for (var i = 0, r = 0, h = 0; this.imagesData.length > h; h++) i = Math.max(i, this.imagesData[h].height), r += this.imagesData[h].width;
            this.assetCanvas = new Canvas(document.createElement("canvas")), this.assetCanvas.init(r, i, true), this.assetCanvasOrig = new Canvas(document.createElement("canvas")), this.assetCanvasOrig.init(r, i, true);
            var n = 0;
            for (h = 0; this.imagesData.length > h; h++) this.assetCanvasOrig.context.putImageData(this.imagesData[h], n, 0), this.imagesData[h].x = n, n += this.imagesData[h].width;
            return this.hasAllRequiredAssets = t, true
        },
        setLineStyle: function(s) {
            if (this.hasAllRequiredAssets) {
                for (var t = 0; s.length > t; t++) this.opacity = this.bean.getBrushOpacity(), s[t].globalAlpha = this.opacity, s[t].globalCompositeOperation = "source-over";
                var a = this.bean.getColor();
                this.key != a && (this.key = a, this.assetCanvas.context.globalCompositeOperation = "source-over", this.assetCanvas.context.fillStyle = this.getRGBA(this.bean.getColor(), 1), this.assetCanvas.context.fillRect(0, 0, this.assetCanvas.width, this.assetCanvas.height), this.assetCanvas.context.fill(), this.assetCanvas.context.globalCompositeOperation = "destination-in", this.assetCanvas.context.drawImage(this.assetCanvasOrig.context.canvas, 0, 0))
            }
        },
        brushPreview: function(s) {
            return this.hasAllRequiredAssets ? (this.setLineStyle([this.brushCtx, this.ctx]), this.brushInit([this.brushCtx, this.bufferCtx]), this.renderPreview(s), true) : (window.setTimeout(function() {
                this.brushPreview(s) && mgr.brushSelector.preview()
            }.bindTo(this), 100), false)
        },
        renderPreview: function(s) {
            return this.hasAllRequiredAssets ? (this.strokePreview(function(s, t) {
                this.stroke(this.brushCtx, t)
            }.bindTo(this), s), void 0) : window.setTimeout(bind(this, this.renderPreview, s), 50)
        },
        stroke: function(s, t) {
            if (this.hasAllRequiredAssets) {
                var a = t[t.length - 1];
                if (1.3 * this.random() > 1 - this.density) {
                    var e = a[0],
                        i = a[1],
                        r = Math.ceil(this.random() * this.radius * Math.sqrt(a[2])),
                        h = 4 * r;
                    s.save();
                    try {
                        s.translate(e, i), s.rotate(2 * this.random() * Math.PI);
                        var n = 0 | this.imagesData.length * this.random();
                        s.drawImage(this.assetCanvas.context.canvas, this.imagesData[n].x, 0, this.imagesData[n].width, this.imagesData[n].height, 0, 0, h, h)
                    } finally {
                        s.restore()
                    }
                }
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/organic.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.MaskBrush = BrushBase.extend({
        options: {
            name: "Mask",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 2,
            defaultSettings: [3, 1, .99],
            shouldHandleSharpStrokes: true,
            effectLabel: "Effect"
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", 
				s.lineJoin = "round"
            }
        },
        brushPreview: function(t) {
            this.base(t), 
			Browser.isSafari && mgr.bean.getRDReader() ? (this.buildMask(this.bufferCtx), this.maskCanvKey != this.getMaskKey(this.bufferCtx) && (this.buildMaskCanvas(), this.maskCanvKey = this.getMaskKey(this.bufferCtx))) : this.buildMask(this.bufferCtx), this.brushInit([this.brushCtx, this.bufferCtx]), this.setLineStyle([this.brushCtx, this.bufferCtx]), $(".brushPreviewCanvas").css("opacity", this.bean.getBrushOpacity()), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t, true)
        },
        revertThingsIChanged: function() {
            $(".brushPreviewCanvas").css("opacity", 1)
        },
        buildMaskCanvas: function() {
            this.maskCanvas || (
				this.maskCanvas = document.createElement("canvas"), 
				this.maskCanv = new Canvas(this.maskCanvas), 
				this.maskCanv.init(mgr.width, mgr.height, false)
			);
            var t = this.maskCanv.context;
            this.maskKey = null, 
			t.clear(), 
			t.fillStyle = this.pattern, 
			t.beginPath(), 
			t.rect(0, 0, mgr.width, mgr.height), 
			t.fill()
        },
        setLineStyle: function(t) {
            this.lineWidth = this.bean.getBrushSize(), 
			this.setDefaultLineStyle(t), 
			$(".canvasBuffer").css("opacity", this.bean.getBrushOpacity())
        },
        setDefaultLineStyle: function(t) {
            t = t || this.ctxArr;
            for (var s = 0; t.length > s; s++) {
                var i = t[s];
                i.lineCap = "round", i.lineJoin = "round", i.globalAlpha = 1, i.strokeStyle = this.pattern, i.lineWidth = this.bean.getBrushSize(), i.globalCompositeOperation = "source-over", i.shadowColor = this.getRGBA("ffffff", 0), i.shadowBlur = 0
            }
        },
        brushInit: function() {
            this.radius = this.bean.getBrushSize(), this.hardness = this.bean.getBrushHardness()
        },
        buildMask: function() {
            this.logger.log("MUST IMPLEMENT!")
        },
        getMaskKey: function() {
            return this.bean.getBrushHardness() + "_" + this.bean.getColor()
        },
        startDraw: function() {
            this.brushInit([this.ctx, this.bufferCtx]), 
			this.setLineStyle([this.ctx, this.bufferCtx]), 
			this.path = [], 
			this.count = 0
        },
        moveDraw: function(t) {
            return 
				this.path.push(t), 
				this.stroke(this.bufferCtx, this.path), 
				false
        },
        endDraw: function() {
            return 
				this.ctx.globalAlpha = this.bean.getBrushOpacity(), 
				this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), 
				this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), 
				false
        },
        stroke: function(t, s) {
            var i, e;
            if (Browser.isSafari && mgr.bean.getRDReader()) 
				return this.fuckedUpSafariBugCanStrokeDeezNutz(t, s), void 0;
            for (; s.length > 1;) 
				i = s.shift(), 
				e = s[0], 
				t.lineWidth = this.lineWidth * Math.pow(i[2], 2.5), 
				t.beginPath(), 
				t.moveTo(i[0], i[1]), 
				t.lineTo(e[0], e[1]), 
				t.stroke()
        },
        fuckedUpSafariBugCanStrokeDeezNutz: function(t, s) {
            for (t.strokeStyle = this.getRGBA("000000", 1); s.length > 1;) if (coord1 = s.shift(), coord2 = s[0], t.lineWidth = this.lineWidth * Math.pow(coord1[2], 2.5), t.globalCompositeOperation = "source-over", t.beginPath(), t.moveTo(coord1[0], coord1[1]), t.lineTo(coord2[0], coord2[1]), t.stroke(), t.globalCompositeOperation = "source-in", t != mgr.bean.getBrushCtx()) try {
                var i = Math.min(mgr.width - 1, Math.max(0, this.minX)),
                    e = Math.min(mgr.height - 1, Math.max(0, this.minY)),
                    a = Math.min(mgr.width - i, Math.max(1, this.maxX - this.minX)),
                    h = Math.min(mgr.height - e, Math.max(1, this.maxY - this.minY));
                t.drawImage(this.maskCanvas, i, e, a, h, i, e, a, h)
            } catch (r) {
                breakpoint()
            } else t.drawImage(this.maskCanvas, 0, 0);
            t.globalCompositeOperation = "source-over"
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/mask.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/base85.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/mask.js", "jms/pages/drawplz/assetLoader.js"], function() {
    window.TextureBrush = MaskBrush.extend({
        options: {
            name: "Texture",
            ie: false,
            ie9: true,
            glyphPos: 2,
            defaultSettings: [40, 1, 0],
            effectLabel: "Effect",
            shouldHandleSharpStrokes: true,
            shiftJitter: 0
        },
        constructor: function(t, e, s, i) {
            this.base(t, e, s, i), this.imagesData = [], this.pattern = null, this.hasAllRequiredAssets = false
        },
        parseAssets: function(t) {
            this.imagesData = [];
            var e = true;
            for (var s in t) {
                var i = AssetLoader.convertAssetToPixelData(this.ctx, t[s]);
                "false" !== i ? this.imagesData.push(i) : e = false
            }
            return this.hasAllRequiredAssets = e, true
        },
        chromeSux: function(t) {
            if (this.maskKey != this.getMaskKey(t)) {
                if (!this.hasAllRequiredAssets) return window.setTimeout(function() {
                    this.buildChromeSuxCanvas() && mgr.brushSelector.preview()
                }.bindTo(this), 100), false;
                try {
                    var e = this.imagesData[0],
                        s = document.createElement("canvas");
                    s.setAttribute("width", e.width), s.setAttribute("height", e.height);
                    var i = s.getContext("2d");
                    i.globalCompositeOperation = "source-over", i.putImageData(e, 0, 0), i.globalCompositeOperation = "source-atop", i.fillStyle = this.getRGBA(this.bean.getColor(), 1), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-over", i.fillStyle = this.avgRGBA(this.bean.getSecondaryColor(), this.bean.getColor(), .8 * this.bean.getBrushHardness(), 1), i.fillRect(0, 0, e.width, e.height);
                    for (var a = 0; mgr.width > a; a += e.width) for (var r = 0; mgr.height > r; r += e.height) t.drawImage(s, a, r);
                    this.maskKey = this.getMaskKey()
                } catch (n) {
                    return this.pattern = null, false
                }
                return true
            }
        },
        buildMask: function(t) {
            if (!this.hasAllRequiredAssets) return window.setTimeout(function() {
                this.buildMask(this.bean.getBrushCtx()) && mgr.brushSelector.preview()
            }.bindTo(this), 100), false;
            if (this.maskKey == this.getMaskKey(t)) return true;
            try {
                var e = this.imagesData[0],
                    s = document.createElement("canvas");
                s.setAttribute("width", e.width), s.setAttribute("height", e.height);
                var i = s.getContext("2d");
                i.globalCompositeOperation = "source-over", i.putImageData(e, 0, 0), i.globalCompositeOperation = "source-atop", i.fillStyle = this.getRGBA(this.bean.getColor(), 1), i.fillRect(0, 0, e.width, e.height), i.globalCompositeOperation = "destination-over", i.fillStyle = this.avgRGBA(this.bean.getSecondaryColor(), this.bean.getColor(), .8 * this.bean.getBrushHardness(), 1), i.fillRect(0, 0, e.width, e.height), this.pattern = this.ctx.createPattern(s, "repeat"), s = null, this.maskKey = this.getMaskKey()
            } catch (a) {
                return this.pattern = null, false
            }
            return true
        },
        getMaskKey: function() {
            return this.bean.getBrushHardness() + "_" + this.bean.getSecondaryColor() + "_" + this.bean.getColor()
        },
        avgRGBA: function(t, e, s, i) {
            var a = parseInt(t.substr(0, 2).substring(0, 2), 16),
                r = parseInt(t.substr(2, 2).substring(0, 2), 16),
                n = parseInt(t.substr(4, 2).substring(0, 2), 16),
                h = parseInt(e.substr(0, 2).substring(0, 2), 16),
                o = parseInt(e.substr(2, 2).substring(0, 2), 16),
                u = parseInt(e.substr(4, 2).substring(0, 2), 16),
                l = Math.min(255, Math.max(0, Math.round(a + (h - a) * s))),
                g = Math.min(255, Math.max(0, Math.round(r + (o - r) * s))),
                b = Math.min(255, Math.max(0, Math.round(n + (u - n) * s)));
            return "rgba(" + l + ", " + g + ", " + b + ", " + i + ")"
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/texture.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/scatter.js"], function() {
    window.BubbleBrush = ScatterBrush.extend({
        options: {
            name: "Bubbles",
            wacom: false,
            ie: false,
            ie9: true,
            glyphPos: 10,
            defaultSettings: [35, 1, .65],
            effectLabel: "Density",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_bubble.png",
            shiftJitter: 0
        },
        brushPreview: function(t) {
            this.base(t), 
			this.setLineStyle([this.brushCtx]), 
			this.brushInit([this.brushCtx]), 
			this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s, true)
            }.bindTo(this), t)
        },
        setLineStyle: function(t) {
            for (var s, e = 0; t.length > e; e++) {
                var i = t[e];
                s = this.bean.getBrushOpacity(), i.globalAlpha = s, i.strokeStyle = this.getRGBA(this.bean.getColor(), 1), i.fillStyle = this.getRGBA(this.bean.getColor(), 0), i.lineWidth = 2
            }
        },
        stroke: function(t, s) {
            t.beginPath();
            var e = s[s.length - 1];
            if (1.3 * this.random() > 1 - this.density) {
                var i = e[0] + Math.cos(2 * this.random() * Math.PI) * this.radius - 2 * this.radius * e[3][0],
                    a = e[1] + Math.cos(2 * this.random() * Math.PI) * this.radius + 2 * this.radius * e[3][1],
                    r = Math.ceil(this.random() * this.radius * Math.sqrt(e[2]));
                t.moveTo(i + r, a), t.arc(i, a, r, 0, 2 * Math.PI, false), t.stroke()
            }
        },
        lobotomized: function() {}
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/bubble.js")
});
DWait.ready(["jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/lib/colorlib.js"], function() {
    window.EyeDropperBrush = BrushBase.extend({
        options: {
            name: "Eye Dropper",
            wacom: false,
            ie: false,
            ie9: true,
            inToolbar: false,
            whichTool: "dropper",
            shouldUndo: false
        },
        constructor: function(t, e, r, a) {
            this.base(t, e, r, a), this.cursorImage = new Image, this.cursorImage.src = "http://st.deviantart.net/minish/canvasdraw/brushassets/eye_cursor.png"
        },
        getCursorSize: function() {
            return 36 / this.bean.getScale()
        },
        customCursor: function(t) {
            t.globalAlpha = 1, t.drawImage(this.cursorImage, 20, 10)
        },
        init: function() {},
        brushPreview: function() {
            $(".brushPicker .brushPickerCover").show()
        },
        revertThingsIChanged: function() {
            $(".brushPickerCover").hide()
        },
        startDraw: function() {
            return lm = getManager().layerManager, tmpCanvas = lm.merge(lm.layers, true), tmpCtx = tmpCanvas.getContext("2d"), this.pixelData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height), tmpCanvas = null, false
        },
        pickColor: function(t) {
            x = Math.round(t[0]), y = Math.round(t[1]);
            var e = this.ctx.getPixel(this.pixelData, x, y);
            if (!(10 >= e[3])) {
                var r = toHexByte(e[0]) + toHexByte(e[1]) + toHexByte(e[2]);
                this.bean.setColor(r)
            }
        },
        moveDraw: function(t) {
            return this.pickColor(t), false
        },
        endDraw: function(t) {
            return this.pickColor(t), this.pixelData = null, false
        },
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name])
        },
        recordPlayMeta: function() {
            return true
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/eyedropper.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.DrippyBrush = BrushBase.extend({
        options: {
            name: "Drippy",
            ie: false,
            ie9: true,
            glyphPos: 8,
            defaultSettings: [20, .5, .1],
            effectLabel: "Drippiness",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_drippy.png",
            maskBuffers: ["stgCtx", "bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 3
        },
        update: function() {},
        constructor: function(t, i, s, e) {
            this.base(t, i, s, e)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var i = this.ctxArr[t];
                i.lineCap = "round", i.lineJoin = "round", i.globalCompositeOperation = "source-over", this.count = 0
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx, this.bufferCtx]), this.brushInit([this.brushCtx, this.bufferCtx]), this.strokePreview(function(t, i) {
                this.stroke(this.brushCtx, i, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.bean.getBrushOpacity();
            var t = this.bean.getBrushSize(),
                i = this.bean.getBrushHardness();
            this.minRad = Math.ceil(i * t), this.radiusDelta = t - this.minRad, 0 >= this.radiusDelta && (this.radiusDelta = 1), this.drippiness = 1 - this.bean.getBrushHardness() * this.bean.getBrushHardness()
        },
        setLineStyle: function(t) {
            var i, s;
            this.setDefaultLineStyle(t);
            for (var e = 0; t.length > e; e++) s = t[e], i = this.bean.getBrushOpacity(), s.strokeStyle = this.getRGBA(this.bean.getColor(), 1), s.lineWidth = this.bean.getBrushSize()
        },
        startDraw: function(t) {
            return this.setLineStyle([this.bufferCtx, this.ctx]), this.brushInit([this.bufferCtx, this.ctx]), this.count = 0, this.path = [], this.moveDraw(t), false
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.ctx, this.path), false
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        stroke: function(t, i) {
            if (!(2 > i.length)) {
                var s = i[i.length - 1],
                    e = i[i.length - 2];
                t.beginPath(), t.moveTo(s[0], s[1]), t.lineTo(e[0], e[1]), t.stroke();
                var h = this.random() * (400 * (1 - this.drippiness) * Math.sqrt(this.velocity + this.velocityX + .001) + 2);
                if (1 > h) {
                    try {
                        t.globalAlpha = this.bean.getBrushOpacity();
                        var r = t.lineWidth;
                        t.lineWidth = Math.min(10, Math.ceil(this.random() * t.lineWidth / 3));
                        var n = 1e3 * this.random() / (this.velocity + 3);
                        t.beginPath();
                        var a = i[i.length - 1][0] + (r - t.lineWidth / 2) * (this.random() - .5);
                        t.moveTo(a, i[i.length - 1][1]), t.lineTo(a, i[i.length - 1][1] + n), this.minMax([a, i[i.length - 1][1] + n]), t.stroke()
                    } catch (o) {}
                    t.lineWidth = r, t.globalAlpha = 1
                }
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/drippy.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/lib/colorlib.js", "jms/pages/drawplz/lib/filler.js"], function() {
    window.FloodFillBrush = BrushBase.extend({
        options: {
            name: "Flood Fill",
            wacom: false,
            ie: false,
            ie9: true,
            defaultSettings: [40, 1, .5],
            effectLabel: "Threshold",
            handlesOwnSelection: true,
            inToolbar: false,
            whichTool: "flood",
            shouldUndo: false,
            asyncPush: true,
            async: true
        },
        constructor: function(t, s, e, i) {
            this.base(t, s, e, i), this.is_busy = false, this.cursorImage = new Image, this.cursorImage.src = "http://st.deviantart.net/minish/canvasdraw/brushassets/flood_cursor.png"
        },
        getCursorSize: function() {
            return 36
        },
        customCursor: function(t) {
            t.globalAlpha = 1, t.drawImage(this.cursorImage, 5, 8)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.globalCompositeOperation = "source-over", s.globalAlpha = 1, this.count = 0
            }
        },
        brushPreview: function() {
            $(".brushPicker .brushPickerCover").show(), $(".specialColor").show()
        },
        revertThingsIChanged: function() {
            $(".brushPickerCover").hide(), $(".specialColor").hide()
        },
        setLineStyle: function(t) {
            for (var s = 0; t.length > s; s++) {
                var e = t[s];
                e.strokeStyle = this.getRGBA(this.bean.getColor(), 1), e.fillStyle = this.getRGBA(this.bean.getColor(), 1), e.lineWidth = Math.ceil(this.bean.getBrushSize() / 2)
            }
        },
        startDraw: function() {
            return false
        },
        moveDraw: function() {
            return false
        },
        endDraw: function(t) {
            if (this.is_busy) return false;
            this.is_busy = true;
            var s = this.ctx.getPixelData(),
                e = 15 * (1 - this.bean.getBrushHardness()),
                i = this.bean.getColor(),
                r = mgr.selectionManager.hasSelection;
            if (r) {
                var a = new Canvas(document.createElement("canvas"));
                a.init(mgr.width, mgr.height, true);
                var o = a.context;
                o.fillStyle = this.getRGBA(i, 1);
                var n = this.bufferCtx;
                n.clear(), o.shadowColor = this.getRGBA(i, .3), mgr.calibrator.specBlur(o, .1), o.shadowOffsetX = 0, o.shadowOffsetY = 0
            } else this.ctx.fillStyle = this.getRGBA(i, 1), this.ctx.shadowColor = this.getRGBA(i, .3), mgr.calibrator.specBlur(this.ctx, .1), this.ctx.shadowOffsetX = 0, this.ctx.shadowOffsetY = 0;
            this.minX = mgr.width, this.maxX = 0, this.minY = mgr.height, this.maxY = 0;
            var h = function(t, s, e, i) {
                this.minX = Math.min(this.minX, t), this.maxX = Math.max(this.maxX, t), this.minY = Math.min(this.minY, s), this.maxY = Math.max(this.maxY, s), r ? o.fillRect(t, s, e, i) : this.ctx.fillRect(t, s, e, i)
            }.bindTo(this),
                l = mgr.selectionManager.hasSelection ? function() {
                    if (r) try {
                        n.clear(), n.globalCompositeOperation = "source-over", n.drawImage(a.canvas.get(0), 0, 0), n.globalCompositeOperation = "destination-out", n.drawImage(mgr.selectionManager.selDom, 0, 0)
                    } finally {
                        n.globalCompositeOperation = "source-over"
                    }
                } : function() {}, m = new Filler(h, e, l, 100);
            return m.fill(s, t[0], t[1], function() {
                try {
                    if (r) try {
                        n.clear(), n.globalCompositeOperation = "source-over", n.drawImage(a.canvas.get(0), 0, 0), n.globalCompositeOperation = "destination-out", n.drawImage(mgr.selectionManager.selDom, 0, 0), this.ctx.drawImage(n.canvas, 0, 0), this.bufferCtx.clear()
                    } finally {
                        n.globalCompositeOperation = "source-over"
                    } else this.ctx.shadowColor = "rgba(0,0,0,0)", this.ctx.shadowBlur = 0;
                    mgr.bean.getSelectedLayer().setChangeStamp(), mgr.undoManager.push([this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY]);
                    var t = mgr.bean.getRDReader();
                    if (t) {
                        if (this.storedBounds) {
                            var s = 5,
                                e = this.maxX - this.minX,
                                i = this.maxY - this.minY;
                            if (Math.abs(this.storedBounds[0] - this.minX) > s || Math.abs(this.storedBounds[1] - this.minY) > s || Math.abs(this.storedBounds[2] - e) > s || Math.abs(this.storedBounds[3] - i) > s) return t.asyncPause = false, t.flush(), void 0
                        }
                        setTimeout(function() {
                            mgr.bean.getRDReader().resumeFromAsync()
                        }, 5)
                    }
                    var o = mgr.bean.getRDWriter();
                    o && (o.appendToMeta([this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY]), o.pushInstruction())
                } finally {
                    this.is_busy = false
                }
            }.bindTo(this)), false
        },
        stroke: function() {},
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name, mgr.bean.getColor(), mgr.bean.getBrushHardness()])
        },
        recordPlayMeta: function(t) {
            return mgr.bean.setColor(t[1]), mgr.bean.setBrushHardness(t[2]), this.storedBounds = t.length >= 4 ? t[3] : null, true
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/floodfill.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.HeatBrush = BrushBase.extend({
        options: {
            name: "Heat",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 19,
            defaultSettings: [20, 1, .5],
            effectLabel: "Conductivity",
            maskBuffers: ["stgCtx", "bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 5
        },
        update: function() {},
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e), this.SHADOW_DISTANCE = 1e4, this.activated = false
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit([this.brushCtx]), this.setupShadow(this.brushCtx), $(".brushPreviewCanvas").css("opacity", this.bean.getBrushOpacity()), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t, false)
        },
        revertThingsIChanged: function() {
            $(".brushPreviewCanvas").css("opacity", 1)
        },
        brushInit: function() {
            this.hex = this.bean.getColor(), this.radius = this.bean.getBrushSize(), this.hardness = .5, this.awesomeness = .01 * (1 - this.bean.getBrushHardness()), this.scaler = 0
        },
        setLineStyle: function(t) {
            this.brushSize = this.bean.getBrushSize(), this.baseColor = this.bean.getColor(), this.baseHSV = HexToHSV(this.baseColor), this.radius = this.bean.getBrushSize(), this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var i = t[s];
                i.strokeStyle = this.getRGBA(this.bean.getColor(), 1), i.fillStyle = this.getRGBA(this.bean.getColor(), 1), i.lineWidth = this.bean.getBrushSize()
            }
        },
        startDraw: function() {
            this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit([this.ctx, this.bufferCtx]), this.setupShadow(this.bufferCtx), this.path = []
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.bufferCtx, this.path), false
        },
        endDraw: function() {
            return this.ctx.globalAlpha = this.bean.getBrushOpacity(), this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), this.ctx.globalAlpha = 1, this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), this.clearShadow(this.bufferCtx), false
        },
        setupShadow: function(t) {
            $(".canvasBuffer").css("opacity", this.bean.getBrushOpacity()), t.shadowColor = this.getRGBA(this.hex, 1), t.strokeStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), t.fillStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), mgr.calibrator.specBlur(t, 3 * Math.pow(1 - this.hardness, 2) * Math.log(this.radius)), t.shadowOffsetX = this.SHADOW_DISTANCE, t.shadowOffsetY = 0
        },
        clearShadow: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.shadowColor = this.getRGBA("ffffff", 0)
            }
            $(".canvasBuffer").css("opacity", 1)
        },
        stroke: function(t, s) {
            var i, e, h, a, r, n, o, u, l, c, f, b, g, d, p, w, x, S;
            if (!(2 > s.length) && (a = s[s.length - 1], h = s[s.length - 2], e = s.length > 2 ? s[s.length - 3] : h, i = s.length > 3 ? s[s.length - 4] : e, x = this.controlPoints(i, e, h), S = this.controlPoints(e, h, a), x[1][0] && S[0][0])) {
                try {
                    var C, m, B, v, y;
                    10 > this.velocity ? this.scaler += this.awesomeness : this.scaler -= this.awesomeness, this.scaler = Math.max(-.5, this.scaler), C = Math.max(0, this.baseHSV[2] + this.scaler), C >= 1 ? (v = C - 1, C = 1, m = Math.max(0, this.baseHSV[1] - v)) : m = this.baseHSV[1], B = HSVToHex(this.baseHSV[0], m, C), y = this.bean.getBrushOpacity(), t.strokeStyle = this.getRGBA(B, Math.pow(y, 2)), t.shadowColor = this.getRGBA(B, 1)
                } catch (A) {}
                r = h[0] - e[0], n = h[1] - e[1], o = Math.pow(r * r + n * n, .5), u = o / (o - Math.min(o - 1, .4 * (1 - this.hardness) * this.radius * Math.min(e[2], h[2]))), l = (h[2] - e[2]) / o, t.beginPath();
                for (var M = 0; o > M; M += u) {
                    var H = M / o;
                    c = Math.pow(1 - H, 3), f = 3 * Math.pow(1 - H, 2) * H, b = 3 * (1 - H) * Math.pow(H, 2), g = Math.pow(H, 3), d = c * e[0] + f * x[1][0] + b * S[0][0] + g * h[0] - this.SHADOW_DISTANCE, p = c * e[1] + f * x[1][1] + b * S[0][1] + g * h[1], w = Math.max(.1, Math.min(this.radius / 2, .5 * this.radius * Math.pow(e[2] + l * M, 3))), t.arc(d, p, w, 0, 2 * Math.PI, false)
                }
                t.fill()
            }
        },
        dotFunction: function(t) {
            var s = t[0],
                i = t[1],
                e = Math.ceil(mgr.bean.getBrushSize() / 2);
            this.ctx.beginPath(), this.ctx.arc(s, i, e, 0, 2 * Math.PI, false), this.ctx.fill()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/heat.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.FurryBrush = BrushBase.extend({
        options: {
            name: "Nightmare",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 2,
            defaultSettings: [3, .2, 0],
            effectLabel: "Intensity",
            shiftJitter: .1
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e)
        },
        getCursorSize: function() {
            return 2 * this.bean.getBrushSize()
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over", this.count = 0
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit([this.brushCtx]), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.furriness = 20 + 200 * (1 - this.bean.getBrushHardness())
        },
        setLineStyle: function(t) {
            this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var i = t[s],
                    e = Math.pow(this.bean.getBrushOpacity(), 2);
                i.strokeStyle = this.getRGBA(this.bean.getColor(), e), i.lineWidth = this.size = Math.ceil(this.bean.getBrushSize() / 3), i.globalCompositeOperation = "source-over"
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit(), this.path = [], this.count = 0, this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.ctx, this.path), false
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        stroke: function(t, s) {
            t.beginPath();
            for (var i = 0; s.length > i; i++) {
                var e = this.furriness * Math.pow(s[i][2], 1.3),
                    r = 1 + s[i][2],
                    n = s[i],
                    h = s[this.count];
                h && void 0 !== h || (this.count = 0, h = s[this.count]);
                var o = h[0] - n[0],
                    a = h[1] - n[1],
                    u = Math.pow(o * o + a * a, .5),
                    c = this.random();
                if (o *= c, a *= c, e > u && this.random() > u / e) {
                    var l = [h[0] + o, h[1] + a * this.size],
                        b = [n[0] - o + this.random() * r, n[1] - a + this.random() * r];
                    t.moveTo(l[0], l[1]), t.lineTo(b[0], b[1]), this.minMax(l), this.minMax(b)
                }
            }
            t.stroke(), this.count++, this.count >= s.length && (this.count = 0)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/furry.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.DragonBrush = BrushBase.extend({
        options: {
            name: "Dragon",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 6,
            defaultSettings: [20, .8, .5],
            effectLabel: "Spikes",
            handlesOwnMinMax: true,
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_furry.png",
            minMoveDraws: 3
        },
        constructor: function(bean, layerContext, bufferContext, brushContext) {
            this.base(bean, layerContext, bufferContext, brushContext)
        },
        getCursorSize: function() {
            return 20 * (1 - this.bean.getBrushHardness())
        },
        init: function() {
            for (var index = 0; index < this.ctxArr.length; index++) {
                var context = this.ctxArr[index];
                context.lineCap = "round", 
				context.lineJoin = "round", 
				context.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(offsetPoint) {
            this.count = 0, 
			this.base(offsetPoint), 
			this.setLineStyle([this.brushCtx]), 
			this.brushInit(),
			this.strokePreview(function(offsetPoint, path) {
                this.stroke(offsetPoint, this.brushCtx, path)
            }.bindTo(this), offsetPoint, false)
        },
        brushInit: function() {
            this.trogdor = 10 * Math.pow(this.bean.getBrushSize() / 2, 2), 
			this.sizeScale = Math.ceil(this.bean.getBrushSize() / 10), 
			this.radiusScale = .1 * (1 - this.bean.getBrushHardness())
        },
        setLineStyle: function(t) {
            var s;
            this.lineWidth = Math.floor(15 * (1 - this.bean.getBrushHardness())) + 1, this.setDefaultLineStyle(t);
            for (var e = 0; t.length > e; e++) {
                var i = t[e];
                s = this.bean.getBrushOpacity(), s = s * s * s, i.strokeStyle = this.getRGBA(this.bean.getColor(), s), i.fillStyle = this.getRGBA(this.bean.getColor(), s), this.baseColor = this.bean.getColor(), this.baseHSV = HexToHSV(this.baseColor);
                var r = Math.pow(this.baseHSV[2] - 1, 2),
                    h = HSVToHex(this.baseHSV[0], 0, r);
                i.shadowColor = this.getRGBA(h, .3 * s), i.shadowBlur = Math.floor(10 * (1 - this.bean.getBrushHardness())), i.shadowOffsetX = 2, i.shadowOffsetY = 2
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx, this.bufferCtx]), 
			this.brushInit(), 
			this.path = [], 
			this.count = 0, 
			this.moveDraw(t), 
			this.minMax[0]
        },
        moveDraw: function(t) {
            return 
				this.stroke(t, this.ctx, this.path), 
				this.path.push(t), 
				false
        },
        stroke: function(t, context, path) {
            path.length - 1;
            var lastPoint = path[path.length - 1];
            path.length > 1 && (context.beginPath(), context.moveTo(lastPoint[0], lastPoint[1]), context.lineTo(path[path.length - 2][0], path[path.length - 2][1]), context.stroke());
            for (var index = path.length - 2; index >= 0 && index > path.length - 20; index--) {
                var point = path[index],
                    deltaX = point[0] - lastPoint[0],
                    deltaY = point[1] - lastPoint[1],
                    o = deltaX * deltaX + deltaY * deltaY;
                if (this.trogdor > o && this.random() > o / this.trogdor) for (var u = index; path.length > u; u++) {
                    var l = path[u];
                    point[0] - lastPoint[0], point[1] - lastPoint[1], 3 * this.trogdor > o && this.random() > o / (3 * this.trogdor) && (context.lineWidth = this.lineWidth * Math.pow(l[2], 2), context.beginPath(), context.moveTo(lastPoint[0], lastPoint[1]), .5 > this.random() ? context.bezierCurveTo(point[0], point[1], l[0], l[1], t[0], t[1]) : context.quadraticCurveTo(point[0], point[1], t[0], t[1]), context.stroke())
                }
            }
            this.count++, this.count >= e.length && (this.count = 0)
        },
        endDraw: function(t) {
            return 
				this.moveDraw(t), 
				this.minMax[getManager().width, getManager().height], 
				false
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/dragon.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.YarnBrush = BrushBase.extend({
        options: {
            name: "Sketch",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 4,
            defaultSettings: [35, .2, .4],
            effectLabel: "Strokes",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_furry.png",
            minMoveDraws: 4
        },
        constructor: function(t, e, s, i) {
            this.base(t, e, s, i)
        },
        getCursorSize: function() {
            return this.bean.getBrushSize() / 2
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var e = this.ctxArr[t];
                e.lineCap = "round", e.lineJoin = "round", e.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit();
            var e = this.bean.getBrushOpacity();
            this.brushCtx.fillStyle = this.getRGBA("000000", Math.pow(e, 2) / 5), this.strokePreview(function(t, e) {
                this.stroke(this.brushCtx, e, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.awesomeness = 1e5 * (1 - this.bean.getBrushHardness())
        },
        setLineStyle: function(t) {
            var e = this.bean.getBrushOpacity();
            this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var i = t[s];
                i.strokeStyle = this.getRGBA(this.bean.getColor(), Math.pow(e, 2)), i.fillStyle = this.getRGBA("000000", Math.pow(e, 2) / 20), i.lineWidth = Math.floor(this.bean.getBrushSize() / 10), i.globalCompositeOperation = "source-over"
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit(), this.path = [], this.count = 0, this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.ctx, this.path), false
        },
        stroke: function(t, e) {
            var s = e.length - 1,
                i = e[s],
                r = 0,
                n = [];
            n[r++] = i;
            for (var h = 0; --s >= 0;) {
                var o = [e[s][0], e[s][1]],
                    a = o[0] - i[0],
                    u = o[1] - i[1];
                h += a * a + u * u, (h > this.awesomeness * r || e.length - s > this.awesomeness / 10 || 500 > e.length && .2 > this.random()) && (n[r++] = o)
            }
            r >= 4 && (t.beginPath(), t.moveTo(n[0][0], n[0][1]), t.bezierCurveTo(n[1][0], n[1][1], n[2][0], n[2][1], n[3][0], n[3][1]), t.stroke(), t.fill())
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        dotFunction: function(t) {
            var e = t[0],
                s = t[1],
                i = Math.ceil(mgr.bean.getBrushSize() / 4);
            this.ctx.beginPath(), this.ctx.moveTo(e, s - i), this.ctx.bezierCurveTo(e - i, s, e + i, s, e, s + i), this.ctx.stroke(), this.ctx.fill()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/yarn.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.BottleBrush = BrushBase.extend({
        options: {
            name: "Bottle Brush",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 5,
            defaultSettings: [35, 1, .25],
            effectLabel: "Shadow",
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(t, s, e, i) {
            this.base(t, s, e, i)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit(), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.awesomeness = 100 * (1 - this.bean.getBrushHardness())
        },
        setLineStyle: function(t) {
            this.brushSize = this.bean.getBrushSize();
            var s = this.bean.getBrushOpacity();
            this.setDefaultLineStyle(t);
            for (var e = 0; t.length > e; e++) {
                var i = t[e];
                i.strokeStyle = this.getRGBA(this.bean.getColor(), Math.pow(s, 2)), i.lineWidth = Math.floor(this.bean.getBrushSize() / 10) + 1, i.shadowColor = this.getRGBA("000000", .5 * s), mgr.calibrator.specBlur(i, 5 * (1 - this.bean.getBrushHardness())), i.shadowOffsetX = 0, i.shadowOffsetY = 0
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit(), this.path = [], this.count = 0, this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.ctx, this.path), false
        },
        stroke: function(t, s) {
            var e = s.length - 1,
                i = s[e];
            try {
                var r = [s[e - 1][0], s[e - 1][1]],
                    h = this.brushSize * s[e - 1][2],
                    a = [i[1] - r[1], r[0] - i[0]],
                    n = Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
                a[0] = a[0] / n, a[1] = a[1] / n;
                var o = 0,
                    u = [];
                u[o++] = i;
                for (var l = 0; --e >= 0;) {
                    var b = [s[e][0], s[e][1]],
                        c = b[0] - i[0],
                        f = b[1] - i[1],
                        w = c * c + f * f;
                    l += w, (l > this.awesomeness * o || s.length - e > this.awesomeness / 10 || 500 > s.length && .2 > this.random()) && (u[o++] = b)
                }
                o >= 3 && (t.beginPath(), t.moveTo(u[0][0] - .5 * a[0] * h, u[0][1] - .5 * a[1] * h), t.quadraticCurveTo(u[1][0] + .5 * a[0] * h, u[1][1] + .5 * a[1] * h, u[2][0] - .5 * a[0] * h, u[2][1] - .5 * a[1] * h), t.moveTo(u[0][0] + .5 * a[0] * h, u[0][1] + .5 * a[1] * h), t.quadraticCurveTo(u[1][0] - .5 * a[0] * h, u[1][1] - .5 * a[1] * h, u[2][0] + .5 * a[0] * h, u[2][1] + .5 * a[1] * h), t.stroke())
            } catch (d) {
                return false
            }
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/bottle.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.SlinkyBrush = BrushBase.extend({
        options: {
            name: "Pebble",
            wacom: false,
            ie: false,
            ie9: true,
            glyphPos: 7,
            defaultSettings: [10, 1, .75],
            effectLabel: "Fill Opacity",
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(t, i, s, r) {
            this.base(t, i, s, r)
        },
        getCursorSize: function() {
            return 30
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var i = this.ctxArr[t];
                i.lineCap = "round", i.lineJoin = "round", i.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.count = 0, this.radius = 0, this.coord0 = null, this.coord1 = null, this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit(), this.strokePreview(function(t) {
                this.stroke(this.brushCtx, t, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.trogdor = 10 * Math.pow(this.bean.getBrushSize(), 2), this.sizeScale = Math.ceil(this.bean.getBrushSize() / 5), this.radiusScale = .1 * (1 - this.bean.getBrushHardness())
        },
        setLineStyle: function(t) {
            var i;
            this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var r = t[s];
                i = this.bean.getBrushOpacity(), r.strokeStyle = this.getRGBA(this.bean.getColor(), i), r.fillStyle = this.getRGBA(this.bean.getSecondaryColor(), i * (1 - this.bean.getBrushHardness())), r.lineWidth = Math.ceil(this.bean.getBrushSize() / 7)
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx]), this.brushInit(), this.path = [], this.count = 0, this.radius = 0, this.coord0 = null, this.coord1 = null, this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.stroke(this.ctx, t), false
        },
        stroke: function(t, i) {
            try {
                this.coord1 = [this.coord0[0], this.coord0[1]], this.coord0 = [i[0], i[1]]
            } catch (s) {
                return this.coord0 = [i[0], i[1]], this.coord1 = [i[0], i[1]], this.radius = 0, void 0
            }
            var r = this.coord1[0] - this.coord0[0],
                h = this.coord1[1] - this.coord0[1],
                o = this.radius;
            return this.radius = Math.floor(Math.sqrt(r * r + h * h)) - this.radius, 0 > this.radius && (this.radius = 0), this.bean.getBrushSize() / 5 > this.radius ? (this.coord0 = [this.coord1[0], this.coord1[1]], this.radius = o, void 0) : (t.beginPath(), t.moveTo(this.coord0[0] + this.radius, this.coord0[1]), t.arc(this.coord0[0], this.coord0[1], this.radius, 0, 2 * Math.PI, false), t.fill(), t.stroke(), this.minMax([this.coord0[0] - this.radius, this.coord0[1]] - this.radius), this.minMax([this.coord0[0] + this.radius, this.coord0[1]] + this.radius), void 0)
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        dotFunction: function(t) {
            var i = Math.ceil(mgr.bean.getBrushSize() / 2);
            this.ctx.beginPath(), this.ctx.moveTo(t[0] + i, t[1]), this.ctx.arc(t[0], t[1], i, 0, 2 * Math.PI, false), this.ctx.fill(), this.ctx.stroke()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/slinky.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.PencilBrush = BrushBase.extend({
        options: {
            name: "Paintbrush",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 13,
            defaultSettings: [20, 1, .25],
            effectLabel: "Softness",
            minMaxWidth: 1.5 * MAX_BRUSH_SIZE,
            maskBuffers: ["bufferCtx"],
            straightShift: true
        },
        constructor: function(t, s, i, h) {
            this.base(t, s, i, h), this.SHADOW_DISTANCE = 1e4
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.setLineStyle([this.brushCtx]), this.brushInit([this.brushCtx]), this.setupShadow(this.brushCtx), $(".brushPreviewCanvas").css("opacity", this.opacity), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t, false), this.clearShadow(this.brushCtx)
        },
        revertThingsIChanged: function() {
            $(".brushPreviewCanvas").css("opacity", 1)
        },
        setLineStyle: function(t) {
            this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var i = t[s];
                i.strokeStyle = this.getRGBA(this.bean.getColor(), 1), i.fillStyle = this.getRGBA(this.bean.getColor(), 1), i.lineWidth = this.bean.getBrushSize()
            }
        },
        brushInit: function() {
            this.hex = this.bean.getColor(), this.opacity = this.bean.getBrushOpacity(), this.radius = this.bean.getBrushSize(), this.hardness = this.bean.getBrushHardness()
        },
        startDraw: function(t) {
            this.drew = false, this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit([this.ctx, this.bufferCtx]), this.setupShadow(this.bufferCtx), this.path = [], this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.path.push(t), 3 > this.path.length ? void 0 : (3 == this.path.length && (this.path[0][2] = this.path[1][2] = this.path[2][2]), this.drew = true, this.stroke(this.bufferCtx, this.path), false)
        },
        endDraw: function() {
            return this.drew || this.stroke(this.bufferCtx, this.path), this.ctx.globalAlpha = this.opacity, this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), this.ctx.globalAlpha = 1, this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY), this.clearShadow(this.bufferCtx), false
        },
        setupShadow: function(t) {
            $(".canvasBuffer").css("opacity", this.opacity), t.shadowColor = this.getRGBA(this.hex, 1), t.strokeStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), t.fillStyle = this.getRGBA(this.bean.getBackgroundColor(), 1), mgr.calibrator.specBlur(t, 3 * Math.pow(1 - this.hardness, 2) * Math.log(this.radius)), t.shadowOffsetX = this.SHADOW_DISTANCE, t.shadowOffsetY = 0
        },
        clearShadow: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.shadowColor = this.getRGBA("ffffff", 0)
            }
            $(".canvasBuffer").css("opacity", 1)
        },
        stroke: function(t, s) {
            var i, h, e, a, r, n, o, u, l, f, c;
            if (s.length) {
                if (2 > s.length) return o = s[0][0] - this.SHADOW_DISTANCE, u = s[0][1], l = Math.max(.1, Math.min(this.radius / 2, this.radius * Math.pow(s[0][2], 3))), t.beginPath(), t.arc(o, u, l, 0, 2 * Math.PI, false), t.fill(), void 0;
                4 > s.length ? (h = s[s.length - 2], e = s[s.length - 1], r = e[0] - h[0], n = e[1] - h[1], i = [h[0] - r, h[1] - n, h[2], h[3]], a = [e[0] + r, e[1] + n, e[2], e[3]]) : (i = s[s.length - 4], h = s[s.length - 3], e = s[s.length - 2], a = s[s.length - 1]), f = this.controlPoints(i, h, e), c = this.controlPoints(h, e, a), f[1][0] && c[0][0] && this.draw(t, h, e, f, c)
            }
        },
        draw: function(t, s, i, h, e) {
            var a, r, n, o, u, l, f, c, g = this.SHADOW_DISTANCE,
                b = this.radius,
                d = 2 * Math.PI,
                p = 1 - this.hardness,
                w = i[0] - s[0],
                x = i[1] - s[1],
                C = Math.pow(w * w + x * x, .5),
                S = 1,
                m = (i[2] - s[2]) / C;
            for (a = 0; C > a; a += S) t.beginPath(), r = a / C, coef1 = Math.pow(1 - r, 3), n = 3 * Math.pow(1 - r, 2) * r, o = 3 * (1 - r) * Math.pow(r, 2), u = Math.pow(r, 3), l = coef1 * s[0] + n * h[1][0] + o * e[0][0] + u * i[0] - g, f = coef1 * s[1] + n * h[1][1] + o * e[0][1] + u * i[1], c = Math.max(.01, .5 * b * Math.pow(s[2] + m * a, 3)), S = C / (C - Math.min(C - 1, .3 * p * c)), t.arc(l, f, c, 0, d, false), t.fill()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/pencil.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.WebinkBrush = BrushBase.extend({
        options: {
            name: "Webink",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 0,
            defaultSettings: [2, .5, .5],
            effectLabel: "Webbiness",
            maskBuffers: ["stgCtx", "bufferCtx"],
            minMoveDraws: 3
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e), this.last_coord_idx = 0
        },
        getCursorSize: function() {
            return this.bean.getBrushSize() / 5
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over", this.count = 0
            }
        },
        brushPreview: function(t) {
            this.base(t), this.brushInit([this.brushCtx]), this.setLineStyle([this.brushCtx]), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.radius = Math.ceil(this.bean.getBrushSize() / 8), this.opacity = this.bean.getBrushOpacity(), this.opacity *= this.opacity, this.webbiness = Math.ceil(10 * (1 - this.bean.getBrushHardness())) + 1, this.last_coord_idx = 0
        },
        setLineStyle: function(t) {
            this.setDefaultLineStyle(t);
            for (var s = 0; t.length > s; s++) {
                var i = t[s];
                i.strokeStyle = this.getRGBA(this.bean.getColor(), this.opacity), i.lineWidth = 1
            }
        },
        startDraw: function(t) {
            this.setLineStyle([this.ctx, this.bufferCtx]), this.brushInit([this.ctx, this.bufferCtx]), this.path = [], this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.path.push(t), this.stroke(this.ctx, this.path), false
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        stroke: function(t, s) {
            try {
                t.lineWidth = Math.max(1, Math.ceil(this.radius * Math.pow(s[s.length - 1][2], 2)))
            } catch (i) {
                t.lineWidth = 1
            }
            t.beginPath(), t.moveTo(s[0][0], s[0][1]);
            var e = this.last_coord_idx - this.web_how_many;
            e = Math.max(0, e);
            for (var r = this.webbiness, h = this.last_coord_idx; s.length > h; h++) for (var n = s[h], a = r; a > 0; a--) if (h - a >= 0) {
                var o = s[h - a];
                t.moveTo(o[0], o[1]), t.lineTo(n[0], n[1])
            }
            this.last_coord_idx = s.length, t.stroke()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/webink.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/assetLoader.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/organic.js"], function() {
    window.SplatterBrush = OrganicBrush.extend({
        options: {
            name: "Splatter",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 3,
            defaultSettings: [35, .5, .65],
            minMaxWidth: 2 * MAX_BRUSH_SIZE,
            effectLabel: "Density"
        },
        constructor: function(s, e, t, a) {
            this.base(s, e, t, a), AssetLoader.loadAssets([AssetLoader.defaults.base_path + "splatter.js"], ["splatter1", "splatter2", "splatter3", "splatter4", "splatter5", "splatter6"], bind(this, this.parseAssets))
        },
        getCursorSize: function() {
            return 4 * this.bean.getBrushSize()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/splatter.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/lib/colorlib.js"], function() {
    window.PolygonBrush = BrushBase.extend({
        options: {
            name: "Paper Worm",
            wacom: false,
            ie: false,
            ie9: true,
            glyphPos: 14,
            defaultSettings: [10, 1, .75],
            effectLabel: "Shadow",
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(t, i, s, e) {
            this.base(t, i, s, e)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var i = this.ctxArr[t];
                i.lineCap = "round", i.lineJoin = "round", i.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.brushInit(), this.setLineStyle([this.brushCtx]), this.strokePreview(function(t) {
                this.stroke(this.brushCtx, t, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.path = [], this.opacity = this.bean.getBrushOpacity(), this.radius = 2 * this.bean.getBrushSize(), this.lastRadius = 0, this.orthLine = null, this.lastPosition = null
        },
        setLineStyle: function(t) {
            this.setDefaultLineStyle(t);
            for (var i = 0; t.length > i; i++) {
                var s = t[i];
                s.strokeStyle = this.getRGBA(this.bean.getColor(), 0), s.fillStyle = this.getRGBA(this.bean.getColor(), this.opacity), s.lineWidth = 0, s.shadowColor = this.getRGBA("000000", .5 * this.opacity), s.shadowBlur = 35 * (1 - this.bean.getBrushHardness()), s.shadowOffsetX = 0, s.shadowOffsetY = 0
            }
        },
        startDraw: function(t) {
            this.brushInit(), this.setLineStyle([this.ctx]), this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.stroke(this.ctx, t), false
        },
        stroke: function(t, i) {
            if (!(2 > i.length)) {
                i.length;
                var s = i[0],
                    e = i[1],
                    h = false;
                if (this.lastPosition) {
                    var o = this.lastPosition[0] - s,
                        r = this.lastPosition[1] - e,
                        n = Math.sqrt(o * o + r * r);
                    if (5 > n) return;
                    o = n ? o / n : 0, r = n ? r / n : 0;
                    var a = this.radius * n / 50;
                    a = a > 50 ? 50 : a;
                    var l = a - this.lastRadius;
                    this.lastRadius += l / 8, o *= this.lastRadius, r *= this.lastRadius, h = [r + s, - o + e, - r + s, o + e]
                }
                if (this.lastPosition = [s, e], h) {
                    if (this.orthLine) {
                        var o = this.orthLine[0] - h[2],
                            r = this.orthLine[1] - h[3],
                            u = o * o + r * r;
                        o = this.orthLine[0] - h[0], r = this.orthLine[1] - h[1];
                        var c = o * o + r * r,
                            f = c > u;
                        t.beginPath(), t.moveTo(this.orthLine[0], this.orthLine[1]), t.lineTo(this.orthLine[2], this.orthLine[3]), f ? (t.lineTo(h[0], h[1]), t.lineTo(h[2], h[3])) : (t.lineTo(h[2], h[3]), t.lineTo(h[0], h[1])), t.fill(), t.stroke()
                    }
                    this.coords = [], this.orthLine = h
                }
            }
        },
        endDraw: function(t) {
            return this.moveDraw(t), this.clearLineStyle([this.ctx, this.bufferCtx, this.brushCtx]), false
        },
        dotFunction: function(t) {
            var i = t[0],
                s = t[1],
                e = Math.ceil(mgr.bean.getBrushSize() / 2);
            this.ctx.beginPath(), this.ctx.moveTo(i - e, s), this.ctx.lineTo(i + e, s + e), this.ctx.lineTo(i + e, s - e), this.ctx.fill(), this.ctx.stroke()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/polygon.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.HatchBrush = BrushBase.extend({
        options: {
            name: "Hatch",
            wacom: false,
            ie: false,
            ie9: true,
            glyphPos: 11,
            defaultSettings: [10, 1, .75],
            effectLabel: "Width",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_furry.png",
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(t, i, s, e) {
            this.base(t, i, s, e)
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var i = this.ctxArr[t];
                i.lineCap = "round", i.lineJoin = "round", i.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            this.base(t), this.brushInit(), this.setLineStyle([this.brushCtx]), this.strokePreview(function(t) {
                this.stroke(this.brushCtx, t, true)
            }.bindTo(this), t)
        },
        brushInit: function() {
            this.path = [], this.opacity = this.bean.getBrushOpacity(), this.radius = this.bean.getBrushSize(), this.lastRadius = 0, this.orthLine = null, this.lastPosition = null
        },
        setLineStyle: function(t) {
            this.setDefaultLineStyle(t);
            for (var i = 0; t.length > i; i++) {
                var s = t[i];
                s.strokeStyle = this.getRGBA(this.bean.getColor(), this.opacity), s.fillStyle = this.getRGBA(this.bean.getColor(), 0), s.lineWidth = Math.floor(20 * (1 - this.bean.getBrushHardness())) + 1
            }
        },
        startDraw: function(t) {
            this.brushInit(), this.setLineStyle([this.ctx]), this.moveDraw(t)
        },
        moveDraw: function(t) {
            return this.stroke(this.ctx, t), false
        },
        stroke: function(t, i) {
            if (!(2 > i.length)) {
                i.length;
                var s = i[0],
                    e = i[1],
                    h = false;
                if (this.lastPosition) {
                    var r = this.lastPosition[0] - s,
                        n = this.lastPosition[1] - e,
                        o = Math.sqrt(r * r + n * n);
                    if (5 > o) return;
                    r = o ? r / o : 0, n = o ? n / o : 0, r *= .5 * this.radius, n *= .5 * this.radius, h = [s + n, e - r, - n + s, r + e]
                }
                this.lastPosition = [s, e], h && (this.orthLine = h, this.orthLine && (t.beginPath(), t.moveTo(this.orthLine[0], this.orthLine[1]), t.lineTo(this.orthLine[2], this.orthLine[3]), t.stroke()), this.coords = [])
            }
        },
        endDraw: function(t) {
            return this.moveDraw(t), false
        },
        dotFunction: function(t) {
            this.ctx.beginPath(), this.ctx.moveTo(t[0], t[1] - this.radius / 2), this.ctx.lineTo(t[0], t[1] + this.radius / 2), this.ctx.stroke()
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/hatch.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js"], function() {
    window.SmokeBrush = BrushBase.extend({
        options: {
            name: "Smoke",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 12,
            defaultSettings: [40, .6, .5],
            effectLabel: "Speed",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_furry.png",
            cursorSize: 40,
            maskBuffers: ["stgCtx", "bufferCtx"],
            shiftJitter: 5
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e), this.isDrawing = false, this.factor = 400, this.awesomeness = 70
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "lighter"
            }
        },
        createParticle: function(t, s, i, e, r, a) {
            return bh = HexToHSV(a[1]), {
                x: t,
                y: s,
                vx: i,
                vy: e,
                damp: r,
                color: a[0],
                baseHSV: bh,
                o: a[2]
            }
        },
        update: function(t, s) {
            if (this.isDrawing && this.initialized) {
                isWacom = getManager().canvasDrawing.isWacom, s = s || this.ctx;
                for (var i, e = t[0], r = t[1], a = t[2], n = this.particles.length, h = .93, o = 1 / this.factor; n--;) {
                    var u = this.particles[n];
                    isWacom ? (heatVal = Math.max(0, u.baseHSV[2] + a - .5), heatVal >= 1 ? (diff = heatVal - 1, heatVal = 1, heatSat = Math.max(0, u.baseHSV[1] - diff)) : heatSat = u.baseHSV[1], strokeColor = this.getRGBA(HSVToHex(u.baseHSV[0], heatSat, heatVal), u.o)) : strokeColor = u.color, s.beginPath(), s.strokeStyle = strokeColor || this.baseColor, i = o * u.damp, s.moveTo(u.x, u.y), this.minMax([u.x, u.y]), u.vx *= h, u.vy *= h, u.vx += (e - u.x) * i, u.vy += (r - u.y) * i, u.x += u.vx, u.y += u.vy, s.lineTo(u.x, u.y), this.minMax([u.x, u.y]), u.vx *= h, u.vy *= h, u.vx += (e - u.x) * i, u.vy += (r - u.y) * i, u.x += u.vx, u.y += u.vy, s.lineTo(u.x, u.y), this.minMax([u.x, u.y]), s.stroke()
                }
            }
        },
        brushPreview: function(t) {
            this.base(t), this.previousCoords = [0, 0], this.setLineStyle([this.brushCtx]), this.brushInit([this.brushCtx]), this.isDrawing = true, this.strokePreview(function(t) {
                this.stroke(this.brushCtx, t)
            }.bindTo(this), t), this.isDrawing = false
        },
        stroke: function(t, s) {
            this.update(s, t)
        },
        brushInit: function() {
            var t = this.awesomeness,
                s = this.generateGradientArray(t);
            this.particles = Array();
            for (var i = this.previousCoords || [0, 0], e = t; e--;) this.particles.push(this.createParticle(i[0], i[1], 0, 0, 1 + 2 * (e / t), s[e]));
            this.initialized = true
        },
        generateGradientArray: function(t) {
            var s, i, e, r, a, n, h, o, u, l = [],
                g = this.bean.getColor(),
                b = this.bean.getSecondaryColor(),
                c = Math.pow(this.bean.getBrushOpacity(), 2);
            s = parseInt(g.substring(0, 2), 16), i = parseInt(g.substring(2, 4), 16), sB = parseInt(g.substring(4, 6), 16), e = parseInt(b.substring(0, 2), 16), r = parseInt(b.substring(2, 4), 16), a = parseInt(b.substring(4, 6), 16);
            for (var p = 0; t > p; p++) n = Math.round(s + p * (e - s) / t).toString(16), h = Math.round(i + p * (r - i) / t).toString(16), o = Math.round(sB + p * (a - sB) / t).toString(16), 2 > n.length && (n = "0" + n), 2 > h.length && (h = "0" + h), 2 > o.length && (o = "0" + o), u = n + h + o, l.push([this.getRGBA(u, c), u, c]);
            return l
        },
        setLineStyle: function(t) {
            this.brushSize = this.bean.getBrushSize(), this.awesomeness = 1 | 70 * (this.brushSize / 40), this.factor = 50 + 1e3 * this.bean.getBrushHardness();
            var s = this.bean.getBrushOpacity();
            this.baseColor = this.getRGBA(this.bean.getColor(), Math.pow(s, 2)), s = this.bean.getBrushOpacity();
            for (var i = 0; t.length > i; i++) {
                var e = t[i];
                e.strokeStyle = this.getRGBA(this.bean.getColor(), Math.pow(s, 2)), e.lineWidth = 1
            }
        },
        startDraw: function(t) {
            this.initialized = false, this.setLineStyle([this.ctx, this.bufferCtx]), this.previousCoords = t, this.brushInit(), this.path = [], this.isDrawing = true
        },
        moveDraw: function() {
            return false
        },
        endDraw: function() {
            return this.isDrawing = false, false
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/smoke.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/mask.js"], function() {
    window.HalftoneBrush = MaskBrush.extend({
        options: {
            name: "Halftone",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 15,
            defaultSettings: [20, 1, .9],
            effectLabel: "Dot Size",
            shiftJitter: 0,
            maskBuffers: ["bufferCtx"],
            minMoveDraws: 3
        },
        buildMask: function(e) {
            if (this.maskKey != this.getMaskKey(e)) {
                var t = Math.ceil(20 * (1 - this.bean.getBrushHardness())) + 2,
                    s = Math.ceil(2.4 * t),
                    a = 2 * s,
                    i = document.createElement("canvas");
                i.setAttribute("width", a), i.setAttribute("height", a);
                var r = i.getContext("2d"),
                    n = this.bean.getColor();
                r.strokeStyle = this.getRGBA(n, 1), r.fillStyle = this.getRGBA(n, 1);
                for (var h = true, l = -1 * s; a + s > l; l += s) {
                    for (var o = -1 * s; a + s > o; o += s) {
                        var u = h ? Math.round(o + s / 2) : o;
                        r.beginPath(), r.moveTo(u + t, l), r.arc(u, l, t, 0, 2 * Math.PI, false), r.fill()
                    }
                    h = !h
                }
                this.pattern = this.ctx.createPattern(i, "repeat"), i = null, this.maskKey = this.getMaskKey(e)
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/halftone.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/mask.js"], function() {
    window.StripesBrush = MaskBrush.extend({
        options: {
            name: "Stripes",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 16,
            defaultSettings: [20, 1, .9],
            effectLabel: "Stripe Size",
            maskBuffers: ["bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 3
        },
        buildMask: function(e) {
            if (this.maskKey != this.getMaskKey(e)) {
                var t = Math.ceil(40 * (1 - this.bean.getBrushHardness())) + 3,
                    s = Math.ceil(2.5 * t),
                    i = 2 * s,
                    a = document.createElement("canvas");
                a.setAttribute("width", i), a.setAttribute("height", i);
                var r = a.getContext("2d"),
                    n = this.bean.getColor();
                r.strokeStyle = "#" + n, r.fillStyle = "#" + n, r.lineWidth = t;
                for (var l = i + s, h = 0; 2 * l > h; h += s) r.beginPath(), r.moveTo(-1 * s, h), r.lineTo(h, - 1 * s), r.stroke();
                this.pattern = r.createPattern(a, "repeat"), a = null, this.maskKey = this.getMaskKey(e)
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/stripes.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/base85.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/texture.js", "jms/pages/drawplz/assetLoader.js"], function() {
    window.ConcreteBrush = TextureBrush.extend({
        options: {
            name: "Concrete",
            ie: false,
            ie9: true,
            glyphPos: 17,
            defaultSettings: [40, 1, 0],
            effectLabel: "Roughness",
            maskBuffers: ["bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(s, e, t, a) {
            this.base(s, e, t, a), AssetLoader.loadAssets([AssetLoader.defaults.base_path + "texture.js"], ["concrete"], bind(this, this.parseAssets))
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/concrete.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/base85.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/texture.js", "jms/pages/drawplz/assetLoader.js"], function() {
    window.RoughBrush = TextureBrush.extend({
        options: {
            name: "Rough",
            ie: false,
            ie9: true,
            glyphPos: 18,
            defaultSettings: [40, 1, 0],
            effectLabel: "Roughness",
            maskBuffers: ["bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(s, e, t, a) {
            this.base(s, e, t, a), AssetLoader.loadAssets([AssetLoader.defaults.base_path + "texture.js"], ["rough"], bind(this, this.parseAssets))
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/rough.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/assetLoader.js"], function() {
    window.DrPepper = BrushBase.extend({
        options: {
            name: "Dr Pepper",
            wacom: true,
            ie: false,
            ie9: true,
            glyphPos: 20,
            defaultSettings: [2, .5, .5],
            effectLabel: "Fizz",
            maskBuffers: ["stgCtx", "bufferCtx"],
            shiftJitter: 0,
            minMoveDraws: 3
        },
        constructor: function(t, s, i, e) {
            this.base(t, s, i, e), this.assetsLoaded = {}, this.bubbleImages = [], this.fizzImages = [], this.gco1 = "source-atop", this.gco2 = "source-over", AssetLoader.loadAssets([AssetLoader.defaults.base_path + "drpepper.js"], ["bubble1"], this.parseBubbleAssets.bindTo(this)), AssetLoader.loadAssets([AssetLoader.defaults.base_path + "drpepper.js"], ["fizz1", "fizz2"], this.parseFizzAssets.bindTo(this))
        },
        parseBubbleAssets: function(t) {
            var s = this,
                i = 0;
            this.bubbleImages = [];
            for (var e in t) {
                var a = t[e],
                    r = document.createElement("img");
                this.bubbleImages.push({
                    width: a.width,
                    height: a.height
                }), r.rel = i++, r.onload = function() {
                    s.bubbleImages[this.rel].img = this;
                    for (var t = 0; s.bubbleImages.length > t; t++) if (!s.bubbleImages[t].img) return s.assetsLoaded.bubbleImages = false, void 0;
                    s.assetsLoaded.bubbleImages = true
                }, r.src = a.data
            }
        },
        parseFizzAssets: function(t) {
            var s = this,
                i = 0;
            this.fizzImages = [];
            for (var e in t) {
                var a = t[e],
                    r = document.createElement("img");
                this.fizzImages.push({
                    width: a.width,
                    height: a.height
                }), r.rel = i++, r.onload = function() {
                    s.fizzImages[this.rel].img = this, s.fizzImages[this.rel].canv = new Canvas(document.createElement("canvas")), s.fizzImages[this.rel].canv.init(s.fizzImages[this.rel].width, s.fizzImages[this.rel].height, true);
                    for (var t = 0; s.fizzImages.length > t; t++) if (!s.fizzImages[t].img) return s.assetsLoaded.fizzImages = false, void 0;
                    s.assetsLoaded.fizzImages = true
                }, r.src = a.data
            }
        },
        getCursorSize: function() {
            return 3.5 * this.bean.getBrushSize()
        },
        init: function() {
            for (var t = 0; this.ctxArr.length > t; t++) {
                var s = this.ctxArr[t];
                s.lineCap = "round", s.lineJoin = "round", s.globalCompositeOperation = "source-over"
            }
        },
        brushPreview: function(t) {
            return this.assetsLoaded.fizzImages && this.assetsLoaded.bubbleImages ? (this.base(t), this.brushInit([this.brushCtx]), this.setLineStyle([this.brushCtx]), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t), void 0) : (this.logger.log("Postponing brushPreview until assets are loaded"), setTimeout(function() {
                this.brushPreview(t)
            }.bindTo(this), 100), void 0)
        },
        brushInit: function() {
            this.radius = mgr.bean.getBrushSize(), this.opacity = mgr.bean.getBrushOpacity(), this.fizz = mgr.bean.getBrushHardness()
        },
        setLineStyle: function(t) {
            for (var s, i, e = 0; t.length > e; e++) i = t[e], s = this.bean.getBrushOpacity(), i.lineWidth = this.bean.getBrushSize(), i.fillStyle = this.getRGBA(mgr.bean.getColor(), s / 3), i.lineCap = "round", i.lineJoin = "round", i.globalCompositeOperation = "source-over";
            for (e = 0; this.fizzImages.length > e; e++) {
                var a = this.fizzImages[e];
                i = a.canv.context, i.globalCompositeOperation = "source-over", i.fillStyle = this.getRGBA(mgr.bean.getColor(), 1), i.fillRect(0, 0, a.width, a.height), i.fill(), i.globalCompositeOperation = "destination-in", i.drawImage(a.img, 0, 0)
            }
        },
        startDraw: function() {
            this.setLineStyle([this.bufferCtx, this.ctx]), this.path = []
        },
        moveDraw: function(t) {
            this.path.push(t), this.stroke(this.bufferCtx, this.path)
        },
        endDraw: function() {
            this.ctx.globalAlpha = 1, this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), this.bufferCtx.clearRect(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
        },
        stroke: function(t, s) {
            for (var i = s[s.length - 1], e = 5, a = 1; e > a; a += this.random()) {
                var r = Math.max(1, Math.log(a)),
                    h = i[0] + Math.cos(2 * this.random() * Math.PI) * this.radius / r - 2 * this.radius * i[3][0],
                    o = i[1] + Math.cos(2 * this.random() * Math.PI) * this.radius / r + 2 * this.radius * i[3][1],
                    n = Math.ceil(this.random() * Math.max(.2, Math.pow(i[2], .8)) * this.radius / Math.max(1, 2 * Math.log(e - a)));
                t.beginPath(), t.moveTo(h + n, o), t.arc(h, o, n, 0, 2 * Math.PI, false), t.fill(), this.minMax([h - n - 5, o - n - 5]), this.minMax([h + n + 5, o + n + 5])
            }
            for (var a = 0; 10 > a; a++) {
                var h = i[0] + Math.cos(2 * this.random() * Math.PI) * this.radius / (3 * Math.log(a)) - 2 * this.radius * i[3][0],
                    o = i[1] + Math.cos(2 * this.random() * Math.PI) * this.radius / (3 * Math.log(a)) + 2 * this.radius * i[3][1],
                    n = Math.ceil(5 * this.random() * this.radius);
                t.save();
                try {
                    t.globalCompositeOperation = "destination-out", t.globalAlpha = .1, t.translate(h, o), t.rotate(2 * this.random() * Math.PI);
                    var l = Math.floor(this.random() * this.fizzImages.length),
                        d = this.fizzImages[l];
                    t.drawImage(d.canv.canvas.get(0), 0, 0, d.width, d.height, 0, 0, n, n)
                } finally {
                    t.restore()
                }
            }
            if (t.shadowBlur = 0, t.globalCompositeOperation = this.gco1, this.assetsLoaded.bubbleImages) for (a = 0; 10 > a; a++) if (Math.pow(this.random(), 2) > mgr.bean.getBrushHardness()) {
                h = i[0] + Math.cos(2 * this.random() * Math.PI) * this.radius - 2 * this.radius * i[3][0], o = i[1] + Math.cos(2 * this.random() * Math.PI) * this.radius + 2 * this.radius * i[3][1], n = Math.ceil(this.random() * this.radius / 2) + 3;
                var g = Math.floor(this.random() * this.bubbleImages.length),
                    u = this.bubbleImages[g];
                t.drawImage(u.img, 0, 0, u.width, u.height, h, o, n, n)
            }
            t.globalCompositeOperation = this.gco2
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/drpepper.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/fontManager.js", "jms/lib/localStorage.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/textChunk.js", "jms/pages/drawplz/modalManager.js"], function() {
    window.TextBrush = BrushBase.extend({
        options: {
            name: "Text",
            wacom: true,
            defaultSettings: [10, 1, .75],
            effectLabel: "Pressure",
            inToolbar: true,
            secondarySelector: true,
            handlesOwnSelection: true,
            glyphPos: 21
        },
        constructor: function(t, s, e, i) {
            this.base(t, s, e, i), this.subbrush = safeLocalGet("drawplz_textSubBrush", "Text"), this.font = safeLocalGet("drawplz_lastFont", "Lato"), this.isContinuous = "T" == safeLocalGet("drawplz_isTextContinuous", "F"), this.text = "", this.dejavu = false, this.bindHtml(), this.textCanvas = new Canvas(document.createElement("canvas")), this.textCanvas.init(10, 10, true), this.$textCanvas = $(this.textCanvas), this.txtCtx = this.textCanvas.context, this.chunkArr = [], this.chunkIndex = 0, this.TEXT_CHUNK_SIZE = 20, this.DEFAULT_TEXT = 'Enter text then "brush" it on the canvas.'
        },
        getLocalStorageText: function() {
            return safeLocalGet("drawplz_lastTextEntry", this.DEFAULT_TEXT, function(t) {
                return t && t.length && "string" == typeof t ? t : this.DEFAULT_TEXT
            }.bindTo(this))
        },
        bindHtml: function() {
            mgr.$mainNode.find(".textBrushes .repeatButton").on("click", this.toggleContinuous.bindTo(this)), mgr.$mainNode.find(".textBrushes .textBrushText").on("keyup", function() {
                this.textBlur(), this.brushPreview()
            }.bindTo(this)).on("mousedown", function() {
                return $(this).focus(), this.select(), true
            })
        },
        textBlur: function() {
            var t = mgr.$mainNode.find(".textBrushes .textBrushText").val();
            t && "string" == typeof t && t.length || (t = this.getLocalStorageText()), t = this._textBlur(t), mgr.bean.getRDReader() || safeLocalSet("drawplz_lastTextEntry", t)
        },
        _textBlur: function(t) {
            t && "string" == typeof t && t.length || (safeLocalSet("drawplz_lastTextEntry", mgr.$mainNode.find(".textBrushes .textBrushText").val()), t = this.getLocalStorageText()), this.chunkArr = [], this.chunkIndex = 0;
            for (var s = 0; t.length > s; s += this.TEXT_CHUNK_SIZE) this.chunkArr.push(new TextChunk(this, t.slice(s, s + this.TEXT_CHUNK_SIZE), this.txtCtx, this.font));
            return mgr.bean.getRDReader() || safeLocalSet("drawplz_lastTextEntry", t), this.resetChunk(), t
        },
        toggleContinuous: function() {
            this.isContinuous = !this.isContinuous, this.isContinuous ? (mgr.$mainNode.find(".textBrushes .repeatButton").html("ON"), mgr.bean.getRDReader() || safeLocalSet("drawplz_isTextContinuous", "T")) : (mgr.$mainNode.find(".textBrushes .repeatButton").html("OFF"), mgr.bean.getRDReader() || safeLocalSet("drawplz_isTextContinuous", "F")), this.resetChunk()
        },
        subBrush: function(t) {
            t ? this.subbrush = t : this.subbrush || (this.subbrush = "Text"), mgr.bean.getRDReader() || safeLocalSet("drawplz_textSubBrush", this.subbrush), $(".textBrushes .brushButton", this.mainNode).removeClass("brushButtonSelected"), $('.textBrushes .brushButton[data-name="' + this.subbrush + '"]', this.mainNode).addClass("brushButtonSelected")
        },
        getSize: function() {
            return 5 + Math.pow(mgr.bean.getBrushSize(), 2) / 20
        },
        brushInit: function() {
            this.size = this.getSize()
        },
        getCursorSize: function() {
            return this.getSize()
        },
        brushPreview: function() {
            this.base();
            try {
                this.brushCtx.clear(), this.brushCtx.canvas.width;
                var t = this.brushCtx.canvas.height;
                this.brushInit([this.brushCtx]), mgr.fontManager.loadFont(this.font, function() {
                    var s = this.isContinuous;
                    this.isContinuous = true, this.clearState([0, t / 2]), this.resetChunk();
                    var e = [],
                        i = [],
                        h = this.brushCtx.canvas.width;
                    this.bufferCtx.clear();
                    for (var n = -2; h + 22 > n; n += 21) e.push([n, t / 2, Math.min(1, Math.max(0, (n + 22) / h)), [0, 0]]), this.getControlPoints(e, i, 1, true), this.stroke(this.bufferCtx, e, i);
                    try {
                        this.brushCtx.globalAlpha = mgr.bean.getBrushOpacity(), this.brushCtx.drawImage(this.bufferCtx.canvas, 0, 0)
                    } finally {
                        this.brushCtx.globalAlpha = 1, this.bufferCtx.clear(), this.isContinuous = s
                    }
                    this.resetChunk()
                }.bindTo(this))
            } catch (s) {
                this.logger.talkback("[muro] Error in text brush preview: ", s)
            }
        },
        setLineStyle: function() {},
        clearState: function(t) {
            this.prevCoords = t, this.lastMove = t, this.lastAngle = null, this.UL = this.LL = this.UR = this.LR = null
        },
        resetChunk: function() {
            this.chunkIndex = 0;
            for (var t = 0; this.chunkArr.length > t; t++) this.chunkArr[t].reset(this.txtCtx, this.font);
            this.chunkArr.length ? this.chunkArr[0].makeCanvas(this.txtCtx) : this.logger.talkback("[muro] ERROR, No Text!!!!")
        },
        startDraw: function(t) {
            return mgr.bean.getRDReader() || mgr.$mainNode.find(".textBrushes .textBrushText").blur(), this.isBeginning = true, this.base(t), this.brushInit([this.bufferCtx]), this.bufferCtx.obj.canvas.css("opacity", mgr.bean.getBrushOpacity()), this.isContinuous || this.resetChunk(), this.clearState(t), this.path = [], this.cp = [], false
        },
        moveDraw: function(t) {
            var s = t[0] - this.lastMove[0],
                e = this.lastMove[1] - t[1],
                i = Math.pow(Math.pow(s, 2) + Math.pow(e, 2), .5),
                h = Math.min(40, this.getSize());
            return (i > h || this.isBeginning) && (this.isBeginning = false, this.path.push(t), this.getControlPoints(this.path, this.cp, 1, true), this.stroke(this.bufferCtx, this.path, this.cp), this.lastMove = t, mgr.selectionManager.hasSelection && mgr.selectionManager.maskContext(this.bufferCtx)), false
        },
        endDraw: function() {
            try {
                this.ctx.globalAlpha = mgr.bean.getBrushOpacity(), this.ctx.drawImage(this.bufferCtx.canvas, 0, 0)
            } finally {
                this.ctx.globalAlpha = 1, this.bufferCtx.obj.canvas.css("opacity", 1)
            }
            return this.bufferCtx.clear(), this.isContinuous ? this.chunkArr[this.chunkIndex].ptr = Math.floor(this.chunkArr[this.chunkIndex].ptr) : this.resetChunk(), false
        },
        getAngle: function(t, s) {
            var e = s[0] - t[0],
                i = s[1] - t[1],
                h = Math.pow(Math.pow(e, 2) + Math.pow(i, 2), .5);
            return i >= 0 && e >= 0 ? Math.asin(i / h) : i >= 0 ? Math.acos(e / h) : e >= 0 ? Math.asin(i / h) + 2 * Math.PI : Math.asin(-1 * i / h) + Math.PI
        },
        stroke: function(t, s, e) {
            var i, h, n, r;
            if (!(2 > e.length)) {
                2 == e.length ? (i = s[0], h = s[1], n = [
                    [null, null],
                    [i[0] + .1 * (h[0] - i[0]), i[1] + .1 * (h[1] - i[1])]
                ], r = e[1]) : (i = s[e.length - 2], h = s[e.length - 1], n = e[e.length - 2], r = e[e.length - 1]);
                for (var a, o, u = h[0] - i[0], c = h[1] - i[1], l = Math.pow(u * u + c * c, .5), g = h[2] - i[2], d = 0; l > d; d++) a = d / l, o = Math.pow(i[2] + a * g, 3), this.bezStep(t, a, 1, i, h, n, r, o);
                var f = l - (d - 1);
                1 > f && (a = (l - f) / l, o = Math.pow(i[2] + a * g, 3), this.bezStep(t, a, f, i, h, n, r, o))
            }
        },
        bezStep: function(t, s, e, i, h, n, r, a) {
            var o = [i[0] + s * (n[1][0] - i[0]), i[1] + s * (n[1][1] - i[1])],
                u = [n[1][0] + s * (r[0][0] - n[1][0]), n[1][1] + s * (r[0][1] - n[1][1])],
                c = [r[0][0] + s * (h[0] - r[0][0]), r[0][1] + s * (h[1] - r[0][1])],
                l = [o[0] + s * (u[0] - o[0]), o[1] + s * (u[1] - o[1])],
                g = [u[0] + s * (c[0] - u[0]), u[1] + s * (c[1] - u[1])],
                d = l[0] + s * (g[0] - l[0]),
                f = l[1] + s * (g[1] - l[1]),
                x = this.prevCoords[1] - f,
                b = d - this.prevCoords[0],
                m = Math.pow(x * x + b * b, .5),
                p = this.getAngle(l, g),
                C = this.size * (1 - (1 - mgr.bean.getBrushHardness()) * (1 - a));
            if (this.UR = [d - C * Math.sin(p), f - C * Math.cos(p)], this.LR = [d + C * Math.sin(p), f + C * Math.cos(p)], !this.UL || !this.LL) return this.prevCoords = [d, f], this.UL = this.UR, this.LL = this.LR, void 0;
            for (var k = Math.pow(Math.pow(this.LR[0] - this.LL[0], 2) + Math.pow(this.LR[1] - this.LL[1], 2), .5), v = Math.pow(Math.pow(this.UR[0] - this.UL[0], 2) + Math.pow(this.UR[1] - this.UL[1], 2), .5), L = Math.max(k, v), w = 1, B = 0; L > B; B += w) {
                w = 1 > L - B ? Math.min(1, L) : L - B;
                var M = B / L,
                    T = [this.UL[0] + (this.UR[0] - this.UL[0]) * M, this.UL[1] + (this.UR[1] - this.UL[1]) * M],
                    S = [this.LL[0] + (this.LR[0] - this.LL[0]) * M, this.LL[1] + (this.LR[1] - this.LL[1]) * M],
                    A = [this.prevCoords[0] + b * M, this.prevCoords[1] - x * M],
                    R = Math.PI / 2 - this.getAngle(T, S),
                    y = Math.pow(Math.pow(T[0] - S[0], 2) + Math.pow(T[1] - S[1], 2), .5),
                    I = 2 * w * m * this.size / (L * y);
                this.isContinuous && this.chunkIndex > this.chunkArr.length && (this.chunkIndex = 0, this.chunkArr[0].reset(this.txtCtx));
                var z = this.chunkArr[this.chunkIndex];
                if (z) {
                    var j = z.draw(t, this.txtCtx, A, R, I, w, y);
                    if (j) {
                        if (this.chunkIndex++, this.chunkIndex >= this.chunkArr.length) {
                            if (!this.isContinuous) return;
                            this.chunkIndex = 0
                        }
                        z = this.chunkArr[this.chunkIndex], z.reset(this.txtCtx), z.makeCanvas(this.txtCtx);
                        var U = j / I * w;
                        z.draw(t, this.txtCtx, A, R, j, U, y)
                    }
                }
            }
            this.prevCoords = [d, f], this.UL = this.UR, this.LL = this.LR
        },
        specialBrushFunction: function() {},
        setTool: function() {
            this.base();
            var t = mgr.$mainNode.find(".textBrushes .fontButton");
            t.html(this.font), t.on("click", function() {
                mgr.modalManager.fontPicker(this.font, function(t) {
                    this.font = t, mgr.$mainNode.find(".textBrushes .fontButton").html(this.font), this.resetChunk(), mgr.fontManager.loadFont(this.font, this.brushPreview.bindTo(this))
                }.bindTo(this))
            }.bindTo(this)), this.isContinuous ? mgr.$mainNode.find(".textBrushes .repeatButton").html("ON") : mgr.$mainNode.find(".textBrushes .repeatButton").html("OFF");
            var s = mgr.bean.getRDReader() ? "User entered text" : this.getLocalStorageText(),
                e = mgr.$mainNode.find(".textBrushes .textBrushText");
            e.val(s), e.keyup()
        },
        clearRecordMarkers: function() {
            for (var t = 0; this.chunkArr.length > t; t++) this.chunkArr[t].clearRecordMarker()
        },
        recordStart: function(t) {
            this.clearRecordMarkers(), t.startInstruction(RDInst.BRUSH, [this.options.name, mgr.bean.getColor(), mgr.bean.getSecondaryColor(), mgr.bean.getBrushOpacity(), mgr.bean.getBrushSize(), mgr.bean.getBrushHardness(), this.font, this.chunkArr.length, this.isContinuous, this.isContinuous ? this.chunkIndex : 0, this.isContinuous ? this.chunkArr[this.chunkIndex].ptr : 0, []])
        },
        recordPlayMeta: function(t) {
            try {
                mgr.bean.startAtomic(), mgr.bean.setColor(t[1]), mgr.bean.setSecondaryColor(t[2]), mgr.bean.setBrushOpacity(t[3]), mgr.bean.setBrushSize(t[4]), mgr.bean.setBrushHardness(t[5])
            } finally {
                mgr.bean.endAtomic()
            }
            var s;
            if (this.chunkArr.length > t[7]) this.chunkArr.splice(t[7], this.chunkArr.length - t[7]);
            else if (t[7] > this.chunkArr.length) for (s = this.chunkArr.length; t[7] > s; s++) this.chunkArr.push(new TextChunk(this, "", this.ctx, this.font));
            for (s = 0; t[11].length > s; s++) this.chunkArr[t[11][s].chunkIndex].text = t[11][s].text;
            if (this.chunkIndex = t[9], chunk = this.chunkArr[this.chunkIndex], chunk.reset(this.txtCtx), chunk.makeCanvas(this.txtCtx), chunk.ptr = t[10], this.dejavu && this.font == t[6] && this.isContinuous == t[8]) return true;
            if (this.dejavu = true, this.font = t[6], this.isContinuous != t[8] && this.toggleContinuous(), mgr.fontManager.isLoaded(this.font)) return true;
            var e = mgr.bean.getRDReader();
            return e.pauseForAsync(), e.instructionPtr--, this.dejavu = false, mgr.fontManager.loadFont(this.font, function() {
                this.dejavu = true, e.resumeFromAsync()
            }.bindTo(this)), false
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/text.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/basic.js"], function() {
    window.EraserBrush = BasicBrush.extend({
        options: {
            name: "Eraser",
            wacom: true,
            ie: false,
            ie9: true,
            defaultSettings: [15, 1, .99],
            effectLabel: "Softness",
            maskBuffers: ["bufferCtx"],
            handlesOwnSelection: true,
            inToolbar: true,
            glyphPos: 23,
            whichTool: "erase",
            minMoveDraws: 3
        },
        brushInit: function(t) {
            this.hex = this.bean.getBackgroundColor(), this._brushInit(t, this.hex)
        },
        brushPreview: function(t) {
            this.setLineStyle([this.brushCtx, this.bufferCtx, this.bean.getStagingCtx()]), this.brushInit([this.brushCtx, this.bufferCtx, this.bean.getStagingCtx()]), this.setupShadow(this.brushCtx), this.brushCtx.clearToColor("#000000"), this.strokePreview(function(t, s) {
                this.stroke(this.brushCtx, s)
            }.bindTo(this), t, true), this.clearShadow(this.brushCtx)
        },
        setLineStyle: function(t) {
            this._setLineStyle(t)
        },
        startDraw: function(t) {
            this.base(t), this.copyContext(this.ctx, this.bufferCtx), $(this.ctx.canvas).hide(), this.stgCtx = this.bean.getStagingCtx(), $(this.stgCtx.canvas).hide(), window.SelectionManager ? (this.hasSel = getManager().selectionManager.hasSelection, this.selDom = getManager().selectionManager.selDom, this.stgDom = this.stgCtx.canvas) : this.hasSel = false, this.hasSel && this.setupShadow(this.stgCtx)
        },
        copyContext: function(t, s) {
            try {
                s.clear(), s.globalCompositeOperation = "source-over", s.globalAlpha = 1;
                var e = s.shadowBlur;
                s.shadowBlur = 0, s.drawImage(t.canvas, 0, 0), s.shadowBlur = e
            } catch (i) {
                console.log("brushes.eraser#copyContext Error: Incompatible contexts")
            }
        },
        moveDraw: function(t) {
            return this.path.push(t), this.isOpaque ? (this.stroke(this.bufferCtx, this.path), this.path.length > 2 && this.path.shift()) : (this.count++ % 5 || this.shiftKey) && (this.copyContext(this.ctx, this.bufferCtx), this.hasSel && this.stgCtx.clear(), this.stroke(this.bufferCtx, this.path)), false
        },
        endDraw: function() {
            return this.ctx.globalAlpha = 1, this.ctx.clear(), this.ctx.drawImage(this.bufferCtx.canvas, 0, 0), this.bufferCtx.clear(), this.clearShadow(this.bufferCtx), this.clearShadow(this.stgCtx), $(this.stgCtx.canvas).show(), $(this.ctx.canvas).show(), this.stgCtx = this.stgDom = this.hasSel = this.selDom = null, false
        },
        stroke: function(t, s) {
            if (s.length) {
                var e, i;
                if (this.hasSel && t != this.brushCtx) {
                    for (e = this.SHADOW_DISTANCE, this.stgCtx.beginPath(), this.stgCtx.moveTo(s[0][0] - e, s[0][1]), i = 0; s.length > i; i++) c = s[i], this.stgCtx.lineTo(c[0] - e, c[1]);
                    this.stgCtx.stroke(), this.stgCtx.globalCompositeOperation = "destination-out", this.stgCtx.drawImage(this.selDom, 0, 0), this.stgCtx.globalCompositeOperation = "source-over", t.globalCompositeOperation = "destination-out", t.drawImage(this.stgDom, 0, 0), t.globalCompositeOperation = "source-over", this.stgCtx.clear()
                } else {
                    for (t.globalCompositeOperation = "destination-out", e = this.SHADOW_DISTANCE, t.beginPath(), t.moveTo(s[0][0] - e, s[0][1]), i = 0; s.length > i; i++) c = s[i], t.lineTo(c[0] - e, c[1]);
                    t.stroke(), t.globalCompositeOperation = "source-over"
                }
            }
        },
        dotFunction: function(t) {
            this.stroke(this.bufferCtx, [t, [t[0], t[1] + 1]])
        },
        recordStart: function(t) {
            t.startInstruction(RDInst.BRUSH, [this.options.name, mgr.bean.getBrushOpacity(), mgr.bean.getBrushSize(), mgr.bean.getBrushHardness()])
        },
        recordPlayMeta: function(t) {
            return mgr.bean.setBrushOpacity(t[1]), mgr.bean.setBrushSize(t[2]), mgr.bean.setBrushHardness(t[3]), true
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/eraser.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/scatter.js"], function() {
    window.ScatterErase = ScatterBrush.extend({
        options: {
            name: "Scatter Erase",
            wacom: true,
            glyphPos: 31,
            defaultSettings: [35, .5, .65],
            effectLabel: "Density",
            overlay: "http://st.deviantart.com/minish/canvasdraw/brush_overlay_scatter.png",
            shiftJitter: 0,
            handlesOwnSelection: true,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var t = 0; e.length > t; t++) e[t].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.setLineStyle([this.brushCtx, this.bufferCtx, this.bean.getStagingCtx()]), this.brushInit(), this.strokePreview(function(e, t) {
                this.stroke(this.brushCtx, t, true)
            }.bindTo(this), e, false)
        },
        stroke: function(e, t, s) {
            if (!s && mgr.selectionManager.hasSelection) {
                var a = mgr.bean.getStagingCtx();
                a.globalCompositeOperation = "source-over", this.base(a, t), mgr.selectionManager.maskContext(a), e.globalCompositeOperation = "destination-out", e.drawImage(a.canvas, 0, 0), e.globalCompositeOperation = "source-over", a.clear()
            } else this.base(e, t)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/scatterErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/splatter.js"], function() {
    window.SplatterErase = SplatterBrush.extend({
        options: {
            name: "Splatter Erase",
            wacom: true,
            glyphPos: 25,
            defaultSettings: [35, .5, .65],
            effectLabel: "Density",
            shiftJitter: 0,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            if (this.hasAllRequiredAssets) {
                this.base(e);
                for (var t = 0; e.length > t; t++) e[t].globalCompositeOperation = "destination-out"
            }
        },
        brushPreview: function(e) {
            return this.hasAllRequiredAssets ? (this.brushCtx.clearToColor("#000000"), this.setLineStyle([this.brushCtx, this.bufferCtx, this.bean.getStagingCtx()]), this.brushInit(), this.strokePreview(function(e, t) {
                this.stroke(this.brushCtx, t, true)
            }.bindTo(this), e, false), void 0) : (window.setTimeout(function() {
                this.brushPreview(e) && mgr.brushSelector.preview()
            }.bindTo(this), 100), false)
        },
        stroke: function(e, t, s) {
            if (!s && mgr.selectionManager.hasSelection) {
                var r = mgr.bean.getStagingCtx();
                r.globalCompositeOperation = "source-over", this.base(r, t), mgr.selectionManager.maskContext(r);
                var i = mgr.bean.getSelectedLayer().ctx;
                i.globalCompositeOperation = "destination-out", i.drawImage(r.canvas, 0, 0), i.globalCompositeOperation = "source-over", r.clear()
            } else this.base(e, t)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/splatterErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/halftone.js"], function() {
    window.HalftoneErase = HalftoneBrush.extend({
        options: {
            name: "Halftone Erase",
            wacom: true,
            glyphPos: 37,
            defaultSettings: [20, 1, .9],
            effectLabel: "Dot Size",
            shiftJitter: 0,
            maskBuffers: ["bufferCtx"],
            minMoveDraws: 3,
            whichTool: "erase"
        },
        setLineStyle: function(s) {
            this.base(s);
            for (var e = 0; s.length > e; e++) s[e].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(s) {
            this.base(), this.brushCtx.clearToColor("#000000"), this.setLineStyle([this.brushCtx, this.bufferCtx, this.bean.getStagingCtx()]), this.brushInit(), this.strokePreview(function(s, e) {
                this.stroke(this.brushCtx, e)
            }.bindTo(this), s, false)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/halftoneErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/webink.js"], function() {
    window.WebinkErase = WebinkBrush.extend({
        options: {
            name: "Webink Erase",
            wacom: true,
            glyphPos: 22,
            defaultSettings: [2, .5, .5],
            effectLabel: "Webbiness",
            maskBuffers: ["stgCtx", "bufferCtx"],
            minMoveDraws: 3,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var t = mgr.bean.getStagingCtx();
                t.globalCompositeOperation = "source-over", this.base(t, s), mgr.selectionManager.maskContext(t);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(t.canvas, 0, 0), r.globalCompositeOperation = "source-over", t.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/webinkErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/yarn.js"], function() {
    window.SketchErase = YarnBrush.extend({
        options: {
            name: "Sketch Erase",
            wacom: true,
            glyphPos: 26,
            defaultSettings: [35, .2, .4],
            effectLabel: "Strokes",
            minMoveDraws: 4,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var t = mgr.bean.getStagingCtx();
                t.globalCompositeOperation = "source-over", this.base(t, s), mgr.selectionManager.maskContext(t);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(t.canvas, 0, 0), r.globalCompositeOperation = "source-over", t.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/sketchErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/furry.js"], function() {
    window.NightmareErase = FurryBrush.extend({
        options: {
            name: "Nightmare Erase",
            wacom: true,
            glyphPos: 24,
            defaultSettings: [3, .2, 0],
            effectLabel: "Intensity",
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var r = mgr.bean.getStagingCtx();
                r.globalCompositeOperation = "source-over", this.base(r, s), mgr.selectionManager.maskContext(r);
                var t = mgr.bean.getSelectedLayer().ctx;
                t.globalCompositeOperation = "destination-out", t.drawImage(r.canvas, 0, 0), t.globalCompositeOperation = "source-over", r.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/nightmareErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/bubble.js"], function() {
    window.BubbleErase = BubbleBrush.extend({
        options: {
            name: "Bubble Erase",
            wacom: true,
            glyphPos: 32,
            defaultSettings: [35, 1, .65],
            effectLabel: "Density",
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var t = mgr.bean.getStagingCtx();
                t.globalCompositeOperation = "source-over", this.base(t, s), mgr.selectionManager.maskContext(t);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(t.canvas, 0, 0), r.globalCompositeOperation = "source-over", t.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/bubbleErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/drippy.js"], function() {
    window.DrippyErase = DrippyBrush.extend({
        options: {
            name: "Drippy Erase",
            wacom: true,
            glyphPos: 30,
            defaultSettings: [20, .5, .1],
            effectLabel: "Drippiness",
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var r = mgr.bean.getStagingCtx();
                r.globalCompositeOperation = "source-over", this.base(r, s), mgr.selectionManager.maskContext(r);
                var t = mgr.bean.getSelectedLayer().ctx;
                t.globalCompositeOperation = "destination-out", t.drawImage(r.canvas, 0, 0), t.globalCompositeOperation = "source-over", r.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/drippyErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/hatch.js"], function() {
    window.HatchErase = HatchBrush.extend({
        options: {
            name: "Hatch Erase",
            wacom: false,
            glyphPos: 33,
            defaultSettings: [10, 1, .75],
            effectLabel: "Width",
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var t = mgr.bean.getStagingCtx();
                t.globalCompositeOperation = "source-over", this.base(t, s), mgr.selectionManager.maskContext(t);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(t.canvas, 0, 0), r.globalCompositeOperation = "source-over", t.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/hatchErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/polygon.js"], function() {
    window.PaperwormErase = PolygonBrush.extend({
        options: {
            name: "Paper Worm Erase",
            wacom: false,
            glyphPos: 36,
            defaultSettings: [10, 1, .75],
            effectLabel: "Shadow",
            shiftJitter: 0,
            minMoveDraws: 3,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            mgr.bean.setBrushHardness(1), this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var r = mgr.bean.getStagingCtx();
                r.globalCompositeOperation = "source-over", this.base(r, s), mgr.selectionManager.maskContext(r);
                var o = mgr.bean.getSelectedLayer().ctx;
                o.globalCompositeOperation = "destination-out", o.drawImage(r.canvas, 0, 0), o.globalCompositeOperation = "source-over", r.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/paperwormErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/slinky.js"], function() {
    window.SlinkyErase = SlinkyBrush.extend({
        options: {
            name: "Pebble Erase",
            wacom: false,
            glyphPos: 29,
            defaultSettings: [10, 1, .75],
            effectLabel: "Fill Opacity",
            shiftJitter: 0,
            minMoveDraws: 3,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, a) {
            if (!a && mgr.selectionManager.hasSelection) {
                var t = mgr.bean.getStagingCtx();
                t.globalCompositeOperation = "source-over", this.base(t, s), mgr.selectionManager.maskContext(t);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(t.canvas, 0, 0), r.globalCompositeOperation = "source-over", t.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/slinkyErase.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/pages/drawplz/brushes/bottle.js"], function() {
    window.BottleErase = BottleBrush.extend({
        options: {
            name: "Bottle Brush Erase",
            wacom: true,
            glyphPos: 27,
            defaultSettings: [35, 1, .25],
            effectLabel: "Shadow",
            shiftJitter: 0,
            minMoveDraws: 3,
            whichTool: "erase"
        },
        setLineStyle: function(e) {
            mgr.bean.setBrushHardness(1), this.base(e);
            for (var s = 0; e.length > s; s++) e[s].globalCompositeOperation = "destination-out"
        },
        brushPreview: function(e) {
            this.brushCtx.clearToColor("#000000"), this.base(e)
        },
        stroke: function(e, s, t) {
            if (!t && mgr.selectionManager.hasSelection) {
                var a = mgr.bean.getStagingCtx();
                a.globalCompositeOperation = "source-over", this.base(a, s), mgr.selectionManager.maskContext(a);
                var r = mgr.bean.getSelectedLayer().ctx;
                r.globalCompositeOperation = "destination-out", r.drawImage(a.canvas, 0, 0), r.globalCompositeOperation = "source-over", a.clear()
            } else this.base(e, s)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/brushes/erasers/bottleErase.js")
});
if (window.DWait) {
    DWait.count()
}

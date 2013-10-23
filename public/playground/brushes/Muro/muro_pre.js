/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.HashURI = {
    get: function() {
        var e = document.location.hash,
            n = {}, t = null,
            s = null,
            a = null;
        if (!e.length) return n;
        e = e.substring(1).split("&");
        for (var i in e) t = e[i].split("="), s = unescape(t[0]), a = t[1] === void 0 ? !0 : unescape(t[1]), n[s] = a;
        return n
    },
    set: function(e) {
        var n = [];
        for (var t in e) n.push(escape(t) + "=" + escape(e[t]));
        document.location.hash = n.join("&")
    },
    getKey: function(e) {
        return HashURI.get()[e]
    },
    setKey: function(e, n) {
        if (n === void 0) HashURI.removeKey(e);
        else {
            var t = HashURI.get();
            t[e] = n, HashURI.set(t)
        }
    },
    removeKey: function(e) {
        if (e) {
            var n = HashURI.get();
            delete n[e], HashURI.set(n)
        }
    }
}, window.DWait && DWait.run("jms/lib/hashUri.js");
window.Modernizr = function(e, t, n) {
    function r(e) {
        h.cssText = e
    }
    function a(e, t) {
        return typeof e === t
    }
    var o, c, i, l = "2.6.2",
        u = {}, s = !0,
        d = t.documentElement,
        f = "modernizr",
        m = t.createElement(f),
        h = m.style,
        p = ({}.toString, {}),
        g = [],
        v = g.slice,
        y = {}.hasOwnProperty;
    i = a(y, "undefined") || a(y.call, "undefined") ? function(e, t) {
        return t in e && a(e.constructor.prototype[t], "undefined")
    } : function(e, t) {
        return y.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = v.call(arguments, 1),
            r = function() {
                if (this instanceof r) {
                    var a = function() {};
                    a.prototype = t.prototype;
                    var o = new a,
                        c = t.apply(o, n.concat(v.call(arguments)));
                    return Object(c) === c ? c : o
                }
                return t.apply(e, n.concat(v.call(arguments)))
            };
        return r
    }), p.canvas = function() {
        var e = t.createElement("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    }, p.localstorage = function() {
        try {
            return localStorage.setItem(f, f), localStorage.removeItem(f), !0
        } catch (e) {
            return !1
        }
    }, p.webworkers = function() {
        return !!e.Worker
    };
    for (var E in p) i(p, E) && (c = E.toLowerCase(), u[c] = p[E](), g.push((u[c] ? "" : "no-") + c));
    return u.addTest = function(e, t) {
        if ("object" == typeof e) for (var r in e) i(e, r) && u.addTest(r, e[r]);
        else {
            if (e = e.toLowerCase(), u[e] !== n) return u;
            t = "function" == typeof t ? t() : t, s !== n && s && (d.className += " " + (t ? "" : "no-") + e), u[e] = t
        }
        return u
    }, r(""), m = o = null,
    function(e, t) {
        function r(e, t) {
            var n = e.createElement("p"),
                r = e.getElementsByTagName("head")[0] || e.documentElement;
            return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild)
        }
        function a() {
            var e = y.elements;
            return "string" == typeof e ? e.split(" ") : e
        }
        function o(e) {
            var t = v[e[p]];
            return t || (t = {}, g++, e[p] = g, v[g] = t), t
        }
        function c(e, n, r) {
            if (n || (n = t), d) return n.createElement(e);
            r || (r = o(n));
            var a;
            return a = r.cache[e] ? r.cache[e].cloneNode() : h.test(e) ? (r.cache[e] = r.createElem(e)).cloneNode() : r.createElem(e), a.canHaveChildren && !m.test(e) ? r.frag.appendChild(a) : a
        }
        function i(e, n) {
            if (e || (e = t), d) return e.createDocumentFragment();
            n = n || o(e);
            for (var r = n.frag.cloneNode(), c = 0, i = a(), l = i.length; l > c; c++) r.createElement(i[c]);
            return r
        }
        function l(e, t) {
            t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function(n) {
                return y.shivMethods ? c(n, e, t) : t.createElem(n)
            }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + a().join().replace(/\w+/g, function(e) {
                return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
            }) + ");return n}")(y, t.frag)
        }
        function u(e) {
            e || (e = t);
            var n = o(e);
            return !y.shivCSS || s || n.hasCSS || (n.hasCSS = !! r(e, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), d || l(e, n), e
        }
        var s, d, f = e.html5 || {}, m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            h = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            p = "_html5shiv",
            g = 0,
            v = {};
        (function() {
            try {
                var e = t.createElement("a");
                e.innerHTML = "<xyz></xyz>", s = "hidden" in e, d = 1 == e.childNodes.length || function() {
                    t.createElement("a");
                    var e = t.createDocumentFragment();
                    return e.cloneNode === n || e.createDocumentFragment === n || e.createElement === n
                }()
            } catch (r) {
                s = !0, d = !0
            }
        })();
        var y = {
            elements: f.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
            shivCSS: f.shivCSS !== !1,
            supportsUnknownElements: d,
            shivMethods: f.shivMethods !== !1,
            type: "default",
            shivDocument: u,
            createElement: c,
            createDocumentFragment: i
        };
        e.html5 = y, u(t)
    }(this, t), u._version = l, d.className = d.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (s ? " js " + g.join(" ") : ""), u
}(this, this.document), Modernizr.load = function() {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, Modernizr.addTest("dataview", "undefined" != typeof DataView && "getFloat64" in DataView.prototype), window.DWait && DWait.run("jms/pages/drawplz/lib/muroModernizr.js");
DWait.ready(["jms/lib/Base.js"], function() {
    window.talkedBack = !1, window.StdLogger = Base.extend({
        constructor: function(t) {
            this.enabled = !0, this.logClass = t, this.logFunction = this.noOp, this.checkExcludes() && (this.logFunction = "undefined" != typeof console && console.log !== void 0 ? this.consoleLog : this.noOp)
        },
        talkback: function(t, o) {
            try {
                if (this.log("TALKBACK ERROR - " + t, o), vms_feature("break_on_talkback") && !window.STOP_BOTHERING_ME && breakpoint(), !window.talkedBack) {
                    window.talkedBack = !0;
                    var a = {
                        useragent: navigator.userAgent,
                        url: location.href,
                        attachedObject: o
                    };
                    DiFi.pushPost("Logr", "logr", ["php", t, a, ["client"]], function() {}), DiFi.send()
                }
            } catch (n) {}
        },
        checkExcludes: function() {
            try {
                var t = localStorage.getItem("stdlog_excludes");
                if (t) {
                    for (var o = t.split(","), a = 0; o.length > a; a++) if (o[a].toUpperCase() == this.logClass.toUpperCase()) return !1;
                    return !0
                }
                return !0
            } catch (n) {
                return !1
            }
        },
        log: function(t, o) {
            if (this.enabled) try {
                var a = this.logFunction.bindTo(this);
                a(t, o)
            } catch (n) {
                this.enabled = !1
            }
        },
        noOp: function() {},
        consoleLog: function(t, o) {
            try {
                o ? console.log(this.logClass.toUpperCase() + ":  " + t, o) : console.log(this.logClass.toUpperCase() + ":  " + t)
            } catch (a) {
                this.enabled = !1
            }
        }
    }), window.stdLog = function(t, o) {
        var a = new StdLogger("StaticLoggingCall");
        a.log(t, o)
    }, window.talkback = function(t, o) {
        var a = new StdLogger("StaticTalkbackCall");
        a.talkback(t, o)
    }, window.talkbackWrap = function(t) {
        try {
            t()
        } catch (o) {
            var a = new StdLogger("TalkbackWrap"),
                n = "Caught Error: " + o.message;
            a.talkback(n, o)
        }
    }, window.DWait && DWait.run("jms/pages/drawplz/StdLogger.js")
});
window.MURO_CONSTS = {
    PROTOCOL_VERSION: 5,
    INSTRUCTIONS_VERSION: 1,
    PP_WHICHLAYER_KEY: "drawplz_PP_whichLayers",
    PP_WHICHLAYER_ALL: "all",
    PP_WHICHLAYER_SELECTED: "sel",
    PRE_WHICHLAYER_KEY: "drawplz_PRE_whichLayers",
    PRE_WHICHLAYER_ALL: "all",
    PRE_WHICHLAYER_SELECTED: "sel"
}, window.DWait && DWait.run("jms/pages/drawplz/consts.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/Bean.js", "jms/pages/drawplz/consts.js"], function() {
    window.DrawBean = Base.extend({
        constructor: function() {
            var e = this._initialize.bindTo(this);
            e()
        }
    }), jQuery.extend(window.DrawBean, {
        attributes: {
            color: {
                type: Bean.types.STRING,
                initialValue: "000000"
            },
            secondaryColor: {
                type: Bean.types.STRING,
                initialValue: "2D3836"
            },
            backgroundColor: {
                type: Bean.types.STRING,
                initialValue: "fffffa"
            },
            useDynamics: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            brushSize: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 10,
                addToSetter: function() {
                    var e = this.getBrushSize();
                    e > MAX_BRUSH_SIZE ? this.setBrushSize(MAX_BRUSH_SIZE) : 1 > e && this.setBrushSize(1)
                }
            },
            brushOpacity: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 1,
                addToSetter: function() {
                    var e = this.getBrushOpacity();.01 > e && this.setBrushOpacity(.01)
                }
            },
            brushHardness: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 1
            },
            lastUsedBrush: {
                type: Bean.types.OBJECT,
                initialValue: null,
                addBeforeSetter: function(e) {
                    try {
                        return mgr.toolManager.isDrawBrush(e)
                    } catch (t) {
                        return !1
                    }
                }
            },
            isLargeBrushArea: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            mainNode: {
                type: Bean.types.OBJECT,
                initialValue: null,
                addBeforeSetter: function() {
                    return !this.getMainNode()
                }
            },
            brush: {
                type: Bean.types.OBJECT,
                initialValue: null,
                addBeforeSetter: function() {
                    var e = this.getBrush();
                    return e && (e.settings.save(), e.revertThingsIChanged()), !0
                },
                addToSetter: function() {
                    $(".dropperPreview").hide(), $(".floodPreview").hide();
                    var e = this.getBrush();
                    e.setTool(), $(".effectSlider .label").html(e.options.effectLabel), e.settings.restore()
                }
            },
            ctx: {
                type: Bean.types.OBJECT,
                initialValue: null
            },
            bufferCtx: {
                type: Bean.types.OBJECT,
                initialValue: null
            },
            stagingCtx: {
                type: Bean.types.OBJECT,
                initialValue: null
            },
            brushCtx: {
                type: Bean.types.OBJECT,
                initialValue: null
            },
            selectedLayer: {
                type: Bean.types.OBJECT,
                initialValue: null,
                addToSetter: function() {
                    var e = this.getSelectedLayer();
                    this.setLayerOpacity($(e.canvasDom).css("opacity"))
                }
            },
            layerOpacity: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 1,
                addToSetter: function() {
                    var e = this.getLayerOpacity().toFixed(3);.01 > e ? this.setLayerOpacity(.01) : this.layerOpacity = e
                }
            },
            hue: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 0
            },
            saturation: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 1
            },
            value: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: 1
            },
            scale: {
                type: Bean.types.POSITIVE_FLOAT,
                initialValue: 1,
                addToSetter: function() {
                    this.getScale() > 5 && this.setScale(5)
                }
            },
            handDrawn: {
                type: Bean.types.BOOLEAN,
                initialValue: !0
            },
            draftId: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 0
            },
            draftTitle: {
                type: Bean.types.STRING,
                initialValue: null
            },
            draftFileversion: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 1
            },
            busyFlags: {
                type: Bean.types.OBJECT,
                initialValue: {}
            },
            RDWriter: {
                type: Bean.types.OBJECT,
                initialValue: null,
                nullStub: {
                    isStub: !0,
                    startInstruction: function() {
                        return this
                    },
                    addInstructionData: function() {},
                    appendToMeta: function() {},
                    pushInstruction: function() {},
                    abortInstruction: function() {},
                    flush: function() {
                        stdLog("Error, trying to flush with a null (stubbed) RDWriter")
                    },
                    getRandom: function() {
                        return Math.random()
                    }
                }
            },
            RDReader: {
                type: Bean.types.OBJECT,
                initialValue: null
            },
            preventWrites: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            isRecording: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            recordingDeviationId: {
                type: Bean.types.STRING,
                initialValue: ""
            },
            recordingPreviewUrl: {
                type: Bean.types.STRING,
                initialValue: ""
            },
            playbackFrame: {
                type: Bean.types.INTEGER,
                initialValue: 0,
                addToSetter: function() {
                    mgr.bean.setFramePercent(0)
                }
            },
            playbackSpeed: {
                type: Bean.types.ZERO_ONE_FLOAT,
                initialValue: null,
                addToSetter: function(e) {
                    safeLocalSet("drawplz_playbackSpeed", e)
                }
            },
            framePercent: {
                type: Bean.types.POSITIVE_FLOAT,
                initialValue: 0
            },
            saveTime: {
                type: Bean.types.POSITIVE_INTEGER,
                initialValue: 0,
                addToSetter: function() {
                    var e;
                    this.getSaveTime() ? e = new Date(this.getSaveTime()) : (e = new Date, this.setSaveTime(e.getTime()));
                    var t = e.getHours(),
                        a = t >= 12 ? "pm" : "am";
                    t > 12 ? t -= 12 : 1 > t && (t += 12);
                    var i = e.getMinutes();
                    10 > i && (i = "0" + i), this.setSaveTimeString(t + ":" + i + a)
                }
            },
            saveTimeString: {
                type: Bean.types.STRING,
                initialValue: "never"
            },
            keyframeNumber: {
                type: Bean.types.INTEGER,
                initialValue: 0
            },
            overrideQunitSkip: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            isPenDown: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            isSaveBlocking: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            isForcedSync: {
                type: Bean.types.BOOLEAN,
                initialValue: !1
            },
            instructionsVersion: {
                type: Bean.types.INTEGER,
                initialValue: 0
            }
        }
    }), Bean.createBean(window.DrawBean, DrawBean.attributes), window.DWait && DWait.run("jms/pages/drawplz/drawBean.js")
});
DWait.ready(["jms/pages/drawplz/StdLogger.js", "jms/lib/Base.js", "jms/lib/pubsub.js", "jms/pages/drawplz/consts.js", "jms/pages/drawplz/drawBean.js"], function() {
    window.Managers = Base.extend({
        constructor: function(e, a, t, s, i) {
            this.lastTime = (new Date).getTime(), this.logger = new StdLogger("Managers"), this.width = parseInt(a, 10), this.height = parseInt(t, 10), this.url = s, this.isCinema = !1, this.isEmbedded = !1, this.resetFunc = null, this.recordingDeviationId = null, this.$mainNode = $(e), this.consts = MURO_CONSTS, i = i || {}, this.autoplay = !! i.autoplay, this.pauseDrawer = !! i.pausedrawer, this.showControls = !! i.controls, this.iframe = !! i.iframe, this.thirdPartyEmbed = !! i.thirdpartyembed, this.on_stash = !! i.on_stash, this.$mainNode.is(".commentDP") ? this.type = "comment" : (this.type = "fullview", this.$mainNode.is(".playbackDP") && (this.isPlayback = !0), this.$mainNode.is(".cinema") ? this.isCinema = !0 : this.$mainNode.is(".embedded") && (this.isEmbedded = !0)), i.background ? (this.initialBackground = this.normalizeColor(i.background), this.wasBackgroundSpecified = !0) : this.wasBackgroundSpecified = !1, this.startTab = i.start_tab ? i.start_tab : "draw", this.initialBackground || (this.initialBackground = this.getDefaultBackgroundColor()), i.initial_layer && (this.initialLayerName = i.initial_layer), i.stash_folder && (this.stashFolder = i.stash_folder), this.catid = i.catid ? parseInt(i.catid, 10) : 0, window.getManager = function() {
                return this
            }.bindTo(this), window.mgr = this, this.mainNode = e, this.bean = new DrawBean, this.isPlayback ? this.bean.setInstructionsVersion(0) : this.bean.setInstructionsVersion(MURO_CONSTS.INSTRUCTIONS_VERSION), this.isEmbedded && (this.bean.getPlaybackSpeed = function() {
                return 0
            }), this.bean.setMainNode(this.mainNode);
            var n = document.createElement("canvas");
            return n.getContext && n.getContext("2d") ? (this.logger.log("First dwait request: ", (new Date).getTime() - this.lastTime), this.lastTime = (new Date).getTime(), DWait.ready(["jms/lib/canvas.js", "jms/lib/hashUri.js", "jms/pages/drawplz/layerManager.js", "jms/pages/drawplz/zoomManager.js", "jms/pages/drawplz/slider.js", "jms/pages/drawplz/featureManager.js", "jms/pages/drawplz/toolbar.js", "jms/pages/drawplz/layoutManager.js"], DWait.bind(this, this.firstDwait)), void 0) : (location.href = this.isCinema || this.isEmbedded ? "http://sta.sh/muro/nohtml5embed" : "http://sta.sh/muro/nohtml5", void 0)
        },
        firstDwait: function() {
            this.logger.log("First dwait response: ", (new Date).getTime() - this.lastTime), this.lastTime = (new Date).getTime(), this.bean.startAtomic();
            try {
                $(document).on("click", ".wacomNotPresent", function() {
                    return window.open("http://www.wacom.com/CustomerCare/Plugin.aspx", "wacomWindow"), !1
                }), this.recordingDeviationId = $(".drawPlz .playbackDP .pieceInfo").attr("id") || "", this.detectWacom(), this.makeCanvases(), this.sliderManager = new SliderManager, this.layerManager = new LayerManager(this.width, this.height, this.type), this.zoomManager = new ZoomManager(this.width, this.height), this.safari5 = window.getSafariObj(), this.layoutManager = "comment" == this.type ? new CommentLayoutManager : this.isCinema ? new CinemaLayoutManager : this.isEmbedded ? new EmbeddedLayoutManager : new LayoutManager, $(this.mainNode).find(".drawPlzCanvas").show();
                var e = ["jms/pages/drawplz/colorpicker.js", "jms/pages/drawplz/brushpicker.js", "jms/pages/drawplz/brushselector.js", "jms/pages/drawplz/toolManager.js", "jms/pages/drawplz/settingsManager.js", "jms/pages/drawplz/keyhandler.js", "jms/pages/drawplz/undo.js", "jms/pages/drawplz/filterManager.js", "jms/pages/drawplz/cursorPreview.js", "jms/pages/drawplz/modalManager.js", "jms/pages/drawplz/file/fileManager.js", "jms/pages/drawplz/brushes/brushBase.js", "jms/lib/canvas_drawing.js", "jms/pages/drawplz/redraw/redrawReader.js", "jms/pages/drawplz/redraw/redrawWriter.js", "jms/pages/drawplz/redraw/playbackManager.js", "jms/pages/drawplz/redraw/calibrator.js", "jms/pages/drawplz/brushes/text.js", "jms/pages/drawplz/safari5.js", "jms/lib/fontManager.js"];
                "fullview" == this.type && (e.push("jms/pages/drawplz/selectionManager.js"), e.push("jms/pages/drawplz/brushes/moveTool.js"), e.push("jms/pages/drawplz/brushes/marqueeSelection.js"), e.push("jms/pages/drawplz/imageImporter.js"), e.push("jms/pages/drawplz/annotation.js"), e.push("jms/pages/drawplz/tabManager.js"), e.push("jms/pages/drawplz/postProcessor.js"), e.push("jms/lib/sidebar.js"), vms_feature("presets") && e.push("jms/pages/drawplz/presetManager.js")), vms_feature("qunit") && e.push("jms/developer/qunit.js"), (this.iframe || this.thirdPartyEmbed) && e.push("jms/pages/drawplz/embedManager.js"), DWait.ready(e, DWait.bind(this, this.secondDwait))
            } finally {
                this.bean.endAtomic(), this.logger.log("First dwait done: ", (new Date).getTime() - this.lastTime), this.lastTime = (new Date).getTime()
            }
        },
        secondDwait: function() {
            this.logger.log("Second dwait ready: ", (new Date).getTime() - this.lastTime), this.lastTime = (new Date).getTime(), this.bean.startAtomic();
            try {
                this.selectionManager = new SelectionManager, this.colorPicker = new ColorPicker($(this.mainNode).find(".fourSquares").get(0)), this.brushPicker = new BrushPicker($(this.mainNode).find(".brushSliders").get(0)), this.brushSelector = new BrushSelector(this.mainNode), this.toolManager = new ToolManager, this.keyHandler = new KeyHandler, this.undoManager = undoFactory(this.layerManager), this.filterManager = new FilterManager, this.canvasDrawing = new CanvasDrawing, this.cursorPreview = new CursorPreview, this.modalManager = new ModalManager, this.settingsManager = new SettingsManager, this.fileManager = new FileManager, this.fontManager = new FontManager, this.annotation = new Annotation, this.tabManager = new TabManager, this.postProcessor = new PostProcessor, this.safari5.mainResize(), vms_feature("presets") && "fullview" == this.type && (this.presetManager = new PresetManager, Modernizr.webworkers && Modernizr.dataview && (this.workerPool = new WorkerPool)), this.iframe ? this.embedManager = new WriterEmbedManager : this.thirdPartyEmbed && (this.embedManager = new EmbedManager), this.$mainNode.find(".canvasContainer").is(":visible") || this.$mainNode.find(".canvasContainer").show();
                var e = this.initLayers();
                if (this.brushSelector.init(this.bean.getSelectedLayer().getContext(), this.bean.getBufferCtx(), this.bean.getBrushCtx()), this.zoomManager.simonFitToScreen(), this.url || (this.undoManager.push(), this.resetFunc && (this.resetFunc(), this.resetFunc = null)), this.calibrator = new Calibrator(MAX_BRUSH_SIZE + 10), this.isCinema && parent.postMessage("show_redraw", "*"), this.playbackManager = new PlaybackManager(this.autoplay), this.isCinema && window.addEventListener("message", function(e) {
                    "playback_click" == e.data && this.playbackManager.playbuttonClick(), "pause_if_playing" == e.data && this.playbackManager.pauseIfPlaying()
                }.bindTo(this)), window.onbeforeunload = this.unload.bindTo(this), this.bean.subscribe("isForcedSync", function() {
                    mgr.bean.getIsForcedSync() ? $.ajaxSetup({
                        async: !1
                    }) : $.ajaxSetup({
                        async: !0
                    })
                }), !this.isPlayback && "comment" != this.type && !vms_feature("qunit") && !vms_feature("no_saving")) {
                    var a = HashURI.getKey(mgr.fileManager.KEY_RECORDING_DEVIATIONID);
                    if (a) return mgr.bean.setRecordingDeviationId(a), mgr.fileManager.resumeRecording(a, !0, function() {
                        PubSub.publish("muro.ready")
                    }), void 0;
                    mgr.bean.setIsRecording(!0)
                }
                e.done(function() {
                    switch (this.startTab) {
                        case "adjust":
                            this.tabManager.switchTo($(".postTab").get(0));
                            break;
                        case "preset":
                            this.tabManager.switchTo($(".presetsTab").get(0));
                            break;
                        default:
                    }
                }.bindTo(this))
            } finally {
                this.bean.endAtomic()
            }
            if (PubSub.publish("muro.ready"), this.logger.log("muro.ready fired: ", (new Date).getTime() - this.lastTime), window.deviantART.deviant.loggedIn || (window.addEventListener("message", function(e) {
                if ("https://sta.sh" != e.origin) return !0;
                try {
                    var a = JSON.parse(e.data);
                    a.logged_in && gWebPage.update({
                        pageData: {
                            deviant: {
                                loggedIn: a.logged_in,
                                username: a.username
                            }
                        }
                    })
                } catch (t) {}
                return !0
            }.bindTo(this)), $("body").append('<iframe src="https://sta.sh/oauth/hidden" style="display:none"/>'), PubSub.subscribe({
                eventname: "gWebPage.update",
                subscriber: this,
                callback: this.onLogin
            })), vms_feature("dr_evil")) {
                var t = new Image;
                $(t).attr("src", MONSTER), mgr.bean.getSelectedLayer().ctx.drawImage(t, 0, 0, 500, 333, 0, 0, 1e3, 666), this.tabManager.switchTo($(".presetsTab").get(0))
            }
            vms_feature("muro_performance") && DWait.ready(["jms/developer/performanceTest.js", "jms/developer/muro_performance_tests.js"], DWait.bind(this, function() {
                window.setTimeout(function() {
                    new PerformanceTest([new MuroPerformanceTests])
                }, 3e3)
            })), vms_feature("qunit") && DWait.ready(["jms/developer/qunit.js", "jms/pages/drawplz/qunit/muroQunitRunner.js", ".brushesLoaded", ".domready"], function() {
                QUnit.config.notrycatch = !0, muroQunitRunner.displayCheckFeatureInfos(), muroQunitRunner.runTests()
            })
        },
        onLogin: function(e, a) {
            a.pageData.deviant && a.pageData.deviant.loggedIn && ($(".loggedOut").removeClass("loggedOut"), $(".loginPhrase").remove(), PubSub.unsubscribe({
                eventname: "gWebPage.update",
                subscriber: this
            }))
        },
        setBusy: function(e, a) {
            a = !! a, $.isArray(e) || (e = [e]);
            for (var t = !1, s = this.bean.getBusyFlags(), i = 0; e.length > i; i++) {
                var n = e[i];
                a != this.isBusy(n) && (t = !0, s[n] = !! a)
            }
            t && this.bean.setBusyFlags(s)
        },
        isBusy: function() {
            var e = this.bean.getBusyFlags(),
                a = !1;
            if (arguments.length) for (var t = arguments.length; t--;) a = a || !! e[arguments[t]];
            else for (var s in e) a = a || !! e[s];
            return a
        },
        insertWacomPlugin: function() {
            window.wacomPlugin = $('<div id="wacomPlugHider" style="visibility: hidden; width: 1px; height: 1px; overflow: hidden; position: absolute; left: -1px; top: -1px;"> <object id="wtPlugin" class="no-select" type="application/x-wacomtabletplugin"> <param name="onload" value="pluginLoaded"> </object></div>').appendTo(this.$mainNode).find("#wtPlugin").get(0).penAPI, wacomPlugin ? (window.wacomEnabled = !0, $(".wacomIndicator").addClass("wacomPresent"), $(".wacomIndicator").removeClass("wacomNotPresent")) : (this.makeWacomStub(), $(".wacomIndicator").removeClass("wacomPresent"), $(".wacomIndicator").addClass("wacomNotPresent"))
        },
        makeWacomStub: function() {
            window.wacomEnabled = !1, window.wacomPlugin = {}, window.wacomPlugin.isEraser = 0, window.wacomPlugin.isWacom = 0, window.wacomPlugin.pointerType = 2, window.wacomPlugin.pressure = 1, window.wacomPlugin.rotationDeg = 0, window.wacomPlugin.rotationRad = 0, window.wacomPlugin.tangentialPressure = 0, window.wacomPlugin.tiltX = 0, window.wacomPlugin.tiltY = 0
        },
        detectWacom: function() {
            if (this.isPlayback) $(".wacomIndicator").hide();
            else {
                for (var e = 0; navigator.plugins.length > e; e++) if (p = navigator.plugins[e], p.name.indexOf("WacomTabletPlugin") >= 0) return this.insertWacomPlugin(), void 0;
                if (Browser.isIE) return this.insertWacomPlugin(), void 0
            }
            this.makeWacomStub()
        },
        getDefaultBackgroundColor: function() {
            return "fullview" === this.type ? "OFFWHITE" : "CLEAR"
        },
        normalizeColor: function(e) {
            if (!e) return null;
            if (window.CHANGESTAMPS && void 0 !== typeof window.CHANGESTAMPS[e.toUpperCase()]) return e.toUpperCase();
            var a;
            if (!(a = e.match(/^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+\.?|\d*\.\d+)\s*\)$/))) switch (e.toUpperCase()) {
                case "BLACK":
                case "WHITE":
                case "OFFWHITE":
                case "CLEAR":
                    return e.toUpperCase();
                default:
                    return null
            }
            var t = parseInt(a[1], 10),
                s = parseInt(a[2], 10),
                i = parseInt(a[3], 10),
                n = parseFloat(a[4]);
            if (t >= 0 && 255 >= t && s >= 0 && 255 >= s && i >= 0 && 255 >= i && n >= 0 && 1 >= n) {
                if (1 === n) {
                    if (255 === t && 255 === s && 255 === i) return "WHITE";
                    if (0 === t && 0 === s && 0 === i) return "BLACK"
                } else if (0 === n) return "CLEAR";
                return "rgba(" + [t, s, i, n].join(", ") + ")"
            }
            return null
        },
        initLayers: function() {
            var e = $.Deferred();
            if ("fullview" == this.type) {
                this.imageImporter = new ImageImporter;
                var a = HashURI.getKey(mgr.fileManager.KEY_RECORDING_DEVIATIONID);
                this.url && !a ? (this.wasBackgroundSpecified ? this.layerManager.create("Background", this.initialBackground).select() : this.layerManager.create("Loading", "CLEAR").select(), this.imageImporter.importImageNoUI(this.imageImporter.convertURL(this.url.url), 0, 0, this.width, this.height, 0, this.url.title, function() {
                    this.layerManager.remove("Loading"), this.layerManager.updateDisplay(), this.undoManager.reset(), this.undoManager.push(), this.wasBackgroundSpecified && mgr.layerManager.select("Background"), this.initialLayerName ? this.layerManager.create(this.initialLayerName, "CLEAR").select() : this.iframe && this.layerManager.create("Layer 1", "CLEAR").select(), this.resetFunc && (this.resetFunc(), this.resetFunc = null), e.resolve()
                }.bindTo(this))) : ("CLEAR" !== this.initialBackground && this.layerManager.create("Background", this.initialBackground).select(), this.initialLayerName ? this.layerManager.create(this.initialLayerName, "CLEAR").select() : this.layerManager.create("Layer 1", "CLEAR").select(), e.resolve())
            } else this.layerManager.create("Background", this.initialBackground).select(), e.resolve();
            return e
        },
        makeCanvases: function() {
            this.bufferCanvas = new Canvas($(this.mainNode).find(".canvasBuffer").get(0)), this.bufferCanvas.init(this.width, this.height, !1), this.bean.setBufferCtx(this.bufferCanvas.context), this.stagingCanvas = new Canvas($(this.mainNode).find(".stagingBuffer").get(0)), this.stagingCanvas.init(this.width, this.height, !1), this.bean.setStagingCtx(this.stagingCanvas.context), this.brushPreviewCanvas = new Canvas($(this.mainNode).find(".brushPreviewCanvas").get(0)), this.brushPreviewCanvas.init(104, 52, !1), this.bean.setBrushCtx(this.brushPreviewCanvas.context)
        },
        reset: function(e, a) {
            this.bean.startAtomic();
            try {
                this.width = parseInt(e, 10), this.height = parseInt(a, 10), this.bean.setHandDrawn(!0), this.bufferCanvas.init(this.width, this.height, !0), this.bean.setBufferCtx(this.bufferCanvas.context), this.selectionManager && this.selectionManager.reset(), this.stagingCanvas.init(this.width, this.height, !0), this.bean.setStagingCtx(this.stagingCanvas.context), this.zoomManager.reset(this.width, this.height), this.undoManager.reset(), this.layerManager.removeAll(!1, !1), this.layerManager.realWidth = this.width, this.layerManager.realHeight = this.height, this.layoutManager.resizeDrawingArea(), this.layoutManager.resizeBrushSelector(), this.zoomManager.simonFitToScreen(), this.selectionManager && (this.selectionManager.innerDeselect(), PubSub.publish("muro.selectionChange")), this.bean.setIsRecording(!1), this.bean.setRecordingDeviationId(""), this.bean.setSaveTime(0), this.bean.setSaveTimeString("never"), this.bean.setKeyframeNumber(0), this.bean.setRDWriter(null), this.bean.setRDReader(null)
            } finally {
                this.bean.endAtomic()
            }
        },
        makeThumb: function(e, a) {
            return this.layerManager.merge(this.layerManager.layers, !1, e, a)
        },
        openProgressModal: function(e, a, t, s) {
            var i = ["Almost there!", "Painting pixels...", "Pushing the progressbar!", "*whistles*", 'Adding to <a href="http://browse.deviantart.com/?order=15">popular art on dA</a>', "Ordering some nachos", "Zzzzzzzzz....", "Making witty comments...", "Making sure this works...", "Counting bits...", "Adding some final touches...", "Messing with the red channel...", "Cheering up blue pixels...", "Adding some awesomeness...", "Calculating PI... mmm, pie....", "Polishing each pixel...", "Handpicking best pixels...", "Making green more deviant-green...", "Starting over... just kidding ;)", "What would Tron guy do here?", "Singing some pixel blues...", "Adding to random deviant's favourites...", "Trying to make your CPU faster...", "Decreasing cheesy factor...", "Waiting for the color to dry...", "Fixing Hyperdrive Motivator", "Gaga, ooh la la", "Anybody wanna peanut?"];
            this.modalManager.pushModal("progress", [], function(e) {
                return "cancel" == e ? !1 : (mgr.setBusy("modal", !1), void 0)
            }.bindTo(this), function(t) {
                var n = $(t);
                n.parents(".modal").find(".x").hide(), n.find(".daTitle").html(e), n.find(".workDesc").html(a), n.find(".talkmessage .message").html(i[Math.floor(Math.random() * i.length)]), s && s(!0)
            }.bindTo(this))
        },
        hasDrawn: function() {
            return mgr.undoManager.hasMoreUndo() || mgr.undoManager.hasMoreRedo()
        },
        hasUnsavedWork: function() {
            return mgr.recordingDeviationId ? !1 : mgr.bean.getIsRecording() ? mgr.bean.getRDWriter().hasUnsavedWork() : (mgr.undoManager.hasMoreUndo() || mgr.undoManager.hasMoreRedo()) && mgr.undoManager.changedAt > mgr.undoManager.savedAt
        },
        unload: function() {
            if ("post" == mgr.tabManager.currentTab()) return mgr.postProcessor.unloadHandler();
            if (this.hasUnsavedWork() && this.hasDrawn()) {
                var e = navigator.platform,
                    a = "iPad" == e || "iPod" == e || "iPhone" == e,
                    t = mgr.bean.getRDWriter();
                if (!t.isStub) {
                    var s = !! t.saveStack.length;
                    return 1 == t.saveStack.length && 0 === t.saveStack[0].saveObject.instructions.length && (s = !1), a || s ? (a && !s && t.flush(), "Some of your work is still in the process of being saved, are you sure you want to exit?") : (mgr.bean.setIsForcedSync(!0), mgr.fileManager.stopRecording(!1), void 0)
                }
            }
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/managers.js")
});
DWait.ready(["jms/lib/browser.js", "jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/pages/drawplz/layer.js", "jms/lib/dragger.js"], function() {
    window.LayerManager = Base.extend({
        constructor: function(e, t, r) {
            this.logger = new StdLogger("Layer Manager"), this.bean = mgr.bean, this.mainNode = this.bean.getMainNode(), this.$layerList = $(this.mainNode).find(".drawPlzLayerList"), this.realWidth = e, this.realHeight = t, this.paintArea = $(this.mainNode).find(".drawPlzCanvas").get(0), this.updatesOn = !0, this.type = r, this.layers = [], this.changeFuncs = [], this.orderChange = !1, this.layersToDelete = [], this.bindHtml()
        },
        bindHtml: function() {
            this.bean.subscribe("selectedLayer", this.setZIndices.bindTo(this)), this.bean.subscribe("selectedLayer", this.updateDisplay.bindTo(this)), this.bean.subscribe("selectedLayer", this.recordSelect.bindTo(this)), this.bean.subscribe("layerOpacity", this.updateOpacity.bindTo(this)), new Dragger(["li.layer"], $(this.mainNode).find(".drawPlzLayerList").get(0), this.startLayerDrag.bindTo(this), this.moveLayerDrag.bindTo(this), this.endLayerDrag.bindTo(this)), this.$slider = mgr.$mainNode.find(".layerOpacitySlider");
            var e = this.$slider.find(".knob").get(0),
                t = this.$slider.find(".track").get(0);
            new Dragger([e, t], t, this.startOpacDrag.bindTo(this), this.moveOpacDrag.bindTo(this), this.endOpacDrag.bindTo(this)), mgr.sliderManager.fineTuneBinder(this.$slider.find(".fineInput"), this.$slider.find(".value"), this.bean.getLayerOpacity.bindTo(this.bean), this.bean.setLayerOpacity.bindTo(this.bean), .01, 100), $(document).on("blur", ".layer .nameInput", function() {
                var e = $(this).val().replace("<", "&lt;").replace(">", "&gt;");
                $(this).find(".name").html(e).show(), $(this).hide();
                try {
                    $(this).parents(".layer").data("layerObj").setName(e)
                } catch (t) {
                    stdLog("Error renaming: " + t.message)
                }
            }), $(document).on("keypress", ".layer .nameInput", function(e) {
                return 13 == e.which ? ($(this).blur(), !1) : !0
            }), $(this.mainNode).find(".layerAdd").click(function() {
                return this.createLayer(!0), !1
            }.bindTo(this)), $(this.mainNode).find(".layerDel").click(function() {
                var e = this.bean.getSelectedLayer().getName();
                return this.remove(e), !1
            }.bindTo(this)), $(this.mainNode).find(".layerMergeVisible").click(function() {
                return this.mergeVisible(), !1
            }.bindTo(this)), $(this.mainNode).on("mousedown", ".eyeButton", this.eyeFunc), $(document).on("click", ".modalNLButton", function() {
                return this.createLayer(!0), mgr.cursorPreview.mouseCaptureLeave(), !1
            }.bindTo(this))
        },
        recordSelect: function() {
            var e = this.bean.getSelectedLayer();
            mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["s", e.getName()]).pushInstruction()
        },
        updateDisplay: function() {
            if (this.updatesOn) {
                var e = $(".drawPlzLayerList").get(0).scrollTop;
                this.$layerList.empty();
                var t, r, a, s, n, h, o, l, g, d, c = this.bean.getSelectedLayer();
                for (i = this.layers.length - 1; i >= 0; i--) t = this.layers[i], r = t.getName(), a = t.isVisible(), s = $(t.canvasDom).css("opacity"), n = Math.round(100 * s), h = t.getLayerData(), o = "layer", a || (o += " hiddenLayer"), t == c && (o += " selectedLayer"), l = "", g = '<li class="' + o + '" layerId="' + t.getId() + '"> <input type="text" class="nameInput" value="' + r + '"/> <span class="name">' + r + "</span> " + l + ' <div class="eyeButton"><i class="icon icon-eye font_icon"></i> </div> <div class="opacityDisplay">' + n + "</div> </li>", d = $(g).appendTo(".drawPlzLayerList").get(0), Browser.isOpera && new Dragger([$(d).find("li.layer").get(0)], this.$layerList.get(0), this.startLayerDrag.bindTo(this), this.moveLayerDrag.bindTo(this), this.endLayerDrag.bindTo(this)), $(d).data("layerObj", t), $(d).find(".eyeButton").get(0).ontouchstart = this.eyeFunc;
                this.updateOpacity(), $(".drawPlzLayerList").get(0).scrollTop = e
            }
        },
        updateOpacity: function() {
            try {
                var e = this.bean.getLayerOpacity();
                mgr.sliderManager.setVal(this.$slider, e, Math.floor(100 * e), "%"), $(this.mainNode).find(".canvasBuffer, .stagingBuffer").css("opacity", e), $(this.mainNode).find("li.selectedLayer .opacityDisplay").html(Math.floor(100 * e));
                var t = this.bean.getSelectedLayer();
                $(t.canvasDom).css("opacity", e)
            } catch (r) {}
        },
        eyeFunc: function() {
            var e = $(this).parents(".layer").data("layerObj").getId(),
                t = mgr.layerManager.getLayerById(e);
            return t.toggle(), !1
        },
        startLayerDrag: function(e, t, r) {
            this.startCoords = e, this.isDrag = !1;
            var a = $(r);
            a.find(".layer .nameInput").hide(), a.find(".layer .name").show()
        },
        moveLayerDrag: function(e, t, r) {
            if (this.isDrag) {
                $(this.dragObj).css("top", e[1] - 20 + "px");
                for (var a, i = e[1] + this.$layerList.data("offset")[1], s = this.$layerList.find(".layer"), n = 0; s.length > n; n++) {
                    var h = s[n];
                    if (!$(h).is(".dragGhost")) {
                        var o = cumulativeOffset($(h).get(0))[1] - this.scrollOffset;
                        if (i > o + $(h).height()) {
                            if ($(h).index() > $(".dragGhost").index()) {
                                a = $(".dragGhost").remove(), $(a).insertAfter(h);
                                break
                            }
                        } else if (o > i && $(".dragGhost").index() > $(h).index()) {
                            a = $(".dragGhost").remove(), $(a).insertBefore(h);
                            break
                        }
                    }
                }
            } else if (Math.abs(e[1] - this.startCoords[1]) > 10) {
                this.scrollOffset = this.$layerList.scrollTop(), this.isDrag = !0;
                var l = $(this.mainNode).find(".drawPlzLayerDragger").show();
                this.dragObj = $(r).clone().appendTo(l), $(this.dragObj).css("top", e[1] - 20 + "px"), $(r).addClass("dragGhost")
            }
        },
        endLayerDrag: function(e, t, r) {
            if (this.isDrag) {
                $(this.mainNode).find(".drawPlzLayerDragger").empty().hide();
                for (var a = [], i = this.$layerList.find(".layer"), s = 0; i.length > s; s++) a.unshift($(i[s]).find(".name").html());
                this.order(a)
            } else {
                var n = $(r),
                    h = n.find(".name").html();
                if (t.metaKey) return mgr.selectionManager.selectFromLayer(h, !t.shiftKey), void 0;
                if (n.is(".selectedLayer")) {
                    n.find(".name").hide().end().find(".nameInput").val(h).show();
                    var o = n.find(".nameInput");
                    document.onmousedown = function() {
                        return o.blur(), document.onmousedown = null, !1
                    }, n.find(".nameInput").focus()
                } else this.select(h)
            }
            $(".dragGhost").removeClass("dragGhost"), this.$layerList.scrollTop(this.scrollOffset)
        },
        startOpacDrag: function() {
            var e = navigator.platform;
            ("iPad" == e || "iPod" == e || "iPhone" == e) && ($(".flyouts .colorFlyoutMask, .flyouts .flyoutBG").hide(), $(".flyouts .numberFlyoutMask, .flyouts").show())
        },
        moveOpacDrag: function(e, t) {
            var r = mgr.sliderManager.getVal(this.$slider, e);
            this.bean.setLayerOpacity(r);
            try {
                $(".numberFlyoutMask .valdisp").empty().html(Math.round(100 * r) + "%"), $(".flyouts").css("left", t.touches[0].pageX - 34).css("top", t.touches[0].pageY - 100)
            } catch (a) {
                $(".flyouts").hide()
            }
        },
        endOpacDrag: function() {
            $(".flyouts").hide(), mgr.undoManager.push();
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["op", mgr.bean.getSelectedLayer().getName(), mgr.bean.getLayerOpacity()]);
            e.pushInstruction()
        },
        getUniqueName: function(e) {
            e = e || "", e = e.replace(/[^\w,\s]/g, "");
            var t = !1;
            if ((!e || 1 > e.length) && (e = "Layer", t = !0), !t && -1 == this.find(e)) return e;
            for (var r = t ? 1 : 2; this.find(e + " " + r) >= 0;) r++;
            return e + " " + r
        },
        createWithId: function(e, t) {
            var r = new Layer(this, e);
            return r.setId(t), this.add(r)
        },
        create: function(e, t) {
            var r = this.add(new Layer(this, e));
            return void 0 !== t && (void 0 !== CHANGESTAMP_COLORS[t] ? (r.getContext().clearToColor(CHANGESTAMP_COLORS[t]), r.setChangeStamp(CHANGESTAMPS[t])) : (r.getContext().clearToColor(t), r.setChangeStamp(Math.random()))), r
        },
        add: function(e) {
            this.layers.push(e), this.changeEvent();
            var t = mgr.zoomManager;
            return t.reScaleLayer(e), this.updateDisplay(), e
        },
        remove: function(e) {
            var t = this.find(e);
            if (0 > t || 2 > this.layers.length) return 0;
            var r = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["d", e]);
            return this.destroyLayer(t), this.changeEvent(), mgr.undoManager.push(), r.pushInstruction(), 1
        },
        destroyLayer: function(e) {
            (0 > e || e >= this.layers.length) && this.logger.log("Invalid index to delete");
            var t = this.layers[e];
            this.bean.startAtomic();
            try {
                t.destroy(), this.bean.getSelectedLayer() == t && (e > 0 ? this.bean.setSelectedLayer(this.layers[e - 1]) : this.layers.length - 1 > e ? this.bean.setSelectedLayer(this.layers[e + 1]) : this.bean.setSelectedLayer(null)), this.layers.splice(e, 1)
            } catch (r) {
                this.logger.talkback("Drawplz - Error Destroying Layer: ", r)
            } finally {
                this.bean.endAtomic()
            }
        },
        removeAll: function(e, t, r) {
            if (e && mgr.undoManager.hasUnsavedWork() && !confirm("You will lose your unsaved work.\nAre you sure you want to do this?")) return !1;
            for (this.bean.startAtomic(); this.layers.length;) this.layers.pop().destroy();
            if (mgr.bean.getStagingCtx().clear(), mgr.bean.getBufferCtx().clear(), mgr.selectionManager.innerDeselect(), PubSub.publish("muro.selectionChange"), t) {
                var a = this.create("Background").select();
                "fullview" != this.type || r || (a.getContext().clearToColor(CHANGESTAMP_COLORS.OFFWHITE), a.setChangeStamp(CHANGESTAMPS.OFFWHITE))
            }
            return this.bean.endAtomic(), this.updateDisplay(), this.changeEvent(), mgr.undoManager.push(), !0
        },
        createLayer: function(e) {
            var t = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["a", e]);
            this.bean.startAtomic();
            var r = this.create();
            return this.bean.setSelectedLayer(r), this.bean.endAtomic(), t.addInstructionData(r.getName()), e && mgr.undoManager.push(), this.setZIndices(), t.pushInstruction(), r
        },
        find: function(e) {
            for (var t = 0; this.layers.length > t; t++) if (this.layers[t].getName() == e) return t;
            return -1
        },
        findById: function(e) {
            for (var t = 0; this.layers.length > t; t++) if (this.layers[t].getId() == e) return t;
            return -1
        },
        getLayerById: function(e) {
            var t = this.findById(e);
            return 0 > t ? null : this.layers[t]
        },
        order: function(e) {
            for (var t = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["o", e]), r = 0, a = 0; e.length > a; a++) {
                var i = this.layers.splice(this.find(e[a]), 1)[0];
                null !== i && this.layers.splice(r++, 0, i)
            }
            this.setZIndices(), this.updateDisplay(), this.changeEvent(), this.checkForOrderChange(), mgr.undoManager.push(), t.pushInstruction()
        },
        checkForOrderChange: function() {
            this.orderChange = !1;
            for (var e = -1, t = 0; this.layers.length > t; t++) {
                var r = this.layers[t],
                    a = r.getLayerData();
                if (a) {
                    var i = r.getLayerData().order;
                    i >= e ? e = i : this.orderChange = !0
                }
            }
            return this.orderChange
        },
        setZIndices: function() {
            for (var e = this.bean.getSelectedLayer(), t = 0; this.layers.length > t; t++) {
                var r = this.layers[t];
                r.setZIndex(3 * t), r == e && ($(this.mainNode).find(".stagingBuffer").css("z-index", 3 * t + 1), $(this.mainNode).find(".canvasBuffer").css("z-index", 3 * t + 2))
            }
            $(this.mainNode).find(".marchingAnts").css("z-index", 3 * this.layers.length + 3), $(this.mainNode).find(".mouseCapture").css("z-index", 3 * this.layers.length + 4 + 100), this.changeEvent()
        },
        select: function(e) {
            var t = this.find(e);
            return 0 > t ? !1 : (this.bean.setSelectedLayer(this.layers[t]), this.updateDisplay(), !0)
        },
        selectDefault: function() {
            var e;
            e = this.layers[this.layers.length - 1], e.select()
        },
        duplicate: function(e) {
            var t = this.find(e);
            if (0 > t) return null;
            var r = this.layers[t],
                a = r.duplicate();
            this.add(a), this.changeEvent()
        },
        getLayerList: function() {
            for (var e = [], t = 0; this.layers.length > t; t++) e.push(this.layers[t].getName());
            return e
        },
        getLayer: function(e) {
            var t = this.find(e);
            return 0 > t ? null : this.layers[t]
        },
        clobber: function() {
            this.layers = [], $(this.paintArea).find(".canvasPaint").remove()
        },
        flatten: function() {
            return this.merge(this.layers)
        },
        merge: function(e, t, r, a) {
            var i, s;
            if (r && a) {
                var n = r / a,
                    h = mgr.width / mgr.height;
                n > h ? (s = a, i = Math.floor(s * h)) : (i = r, s = Math.floor(i / h))
            } else i = mgr.width, s = mgr.height;
            if (!(1 > e.length)) {
                var o = document.createElement("canvas");
                o.setAttribute("width", i), o.setAttribute("height", s);
                for (var l = o.getContext("2d"), g = 0; e.length > g; g++) {
                    var d = e[g];
                    d.isVisible() && (l.globalAlpha = $(d.canvasDom).css("opacity"), l.drawImage(d.canvasDom, 0, 0, mgr.width, mgr.height, 0, 0, i, s))
                }
                return l.globalAlpha = 1, t ? o : (this.changeEvent(), o.toDataURL("image/png"))
            }
        },
        getTempMergedVisible: function() {
            for (var e = [], t = 0; this.layers.length > t; t++) {
                var r = this.layers[t];
                r.isVisible() && e.push(r)
            }
            return 1 > e.length ? null : this.merge(e, !0)
        },
        mergeVisible: function() {
            var e, t, r = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["mrg", []]),
                a = [];
            for (e = 0; this.layers.length > e; e++) t = this.layers[e], t.isVisible() && a.push(t);
            if (!(2 > a.length)) {
                var i = this.merge(a, !0);
                for (e = 1; a.length > e; e++) {
                    var s = a[e].getName(),
                        n = this.find(s);
                    n >= 0 && (this.layersToDelete.push(this.layers[n].getId()), this.layers[n].destroy(), this.layers.splice(n, 1))
                }
                t = a[0], t.getContext().clear(), $(t.canvasDom).css("opacity", "1"), t.getContext().drawImage(i, 0, 0), t.setChangeStamp(), this.bean.setSelectedLayer(t), this.bean.setLayerOpacity(1), this.changeEvent(), this.updateDisplay(), mgr.undoManager.push(), r.pushInstruction()
            }
        },
        changeEvent: function() {
            for (var e = 0; this.changeFuncs.length > e; e++) {
                var t = this.changeFuncs[e];
                t()
            }
        },
        subscribe: function(e) {
            this.changeFuncs.push(e)
        },
        sanitizeLayerData: function(e) {
            for (var t = e.length - 1; t >= 0; t--) 1 > e[t].name.length ? e.splice(t, 1) : e[t].ownerid = parseInt(e[t].ownerid, 10);
            return e.sort(function(e, t) {
                return e.order - t.order
            })
        },
        layerMetaData: function() {
            var e, t = [];
            for (i = 0; this.layers.length > i; i++) e = this.layers[i].getMetadata(), e.order = i, t.push(e);
            return t
        },
        loadLayerData: function(e) {
            var t, r, a, i, s;
            for (e = this.sanitizeLayerData(e), s = 0; this.layers.length > s; s++) i = this.layers[s], i.mark = !1;
            for (s = 0; e.length > s; s++) t = e[s], r = t.layerid, a = this.getLayerById(r), a && (a.setLayerData(t), a.isVisible() != t.visible && a.toggle(), a.mark = !1);
            for (s = this.layers.length - 1; s >= 0; s--) {
                var n = this.layers[s];
                n.mark && this.destroyLayer(s)
            }
            if (this.orderChange) this.checkForOrderChange();
            else {
                var h = [];
                for (e.sort(function(e, t) {
                    return e.order - t.order
                }), s = 0; e.length > s; s++) h.push(e[s].name);
                this.order(h)
            }
            this.updateDisplay()
        },
        flipLayersHoriz: function() {
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["fh"]);
            for (i = 0; this.layers.length > i; i++) this.layers[i].flip(FLIP_DIRECTION_HORIZ);
            mgr.undoManager.push(), e.pushInstruction()
        },
        flipLayersVert: function() {
            var e = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["fv"]);
            for (i = 0; this.layers.length > i; i++) this.layers[i].flip(FLIP_DIRECTION_VERT);
            mgr.undoManager.push(), e.pushInstruction()
        },
        resize: function(e, t, r, a, i) {
            var s = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["rs", e, t, r, a, i]);
            this.innerResize(e, t, r, a, i);
            for (var n, h = 0; this.layers.length > h; h++) n = this.layers[h], isSpecialChangestamp(n.changeStamp) ? n.getContext().clearToColor(getSpecialColor(n.changeStamp)) : n.setChangeStamp(parseInt(1e6 * Math.random(), 10));
            mgr.undoManager.push(), s.pushInstruction()
        },
        innerResize: function(e, t, r, a, i) {
            e = Math.max(mgr.fileManager.MIN_WIDTH, Math.min(mgr.fileManager.MAX_WIDTH, Math.round(e))), t = Math.max(mgr.fileManager.MIN_HEIGHT, Math.min(mgr.fileManager.MAX_HEIGHT, Math.round(t))), mgr.bean.startAtomic();
            try {
                mgr.selectionManager.innerDeselect(), PubSub.publish("muro.selectionChange"), mgr.width = e, mgr.height = t, mgr.bufferCanvas.init(e, t, !0), mgr.bean.setBufferCtx(mgr.bufferCanvas.context), mgr.stagingCanvas.init(e, t, !0), mgr.bean.setStagingCtx(mgr.stagingCanvas.context), mgr.selectionManager.reset(), mgr.zoomManager.reset(e, t);
                for (var s = 0; this.layers.length > s; s++) this.layers[s].resize(e, t, r, a, i);
                this.realWidth = e, this.realHeight = t, mgr.layoutManager.resizeDrawingArea(), mgr.layoutManager.resizeBrushSelector(), mgr.zoomManager.simonFitToScreen()
            } finally {
                mgr.bean.endAtomic()
            }
        },
        restoreVisibilities: function() {
            for (var e = 0; this.layers.length > e; e++) this.layers[e].$canvasDom.css("visibility", "visible")
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/layerManager.js")
});
DWait.ready(["jms/lib/Base.js", "jms/pages/drawplz/StdLogger.js", "jms/lib/dragger.js"], function() {
    window.ZoomManager = Base.extend({
        constructor: function(t, a) {
            this.logger = new StdLogger("ZoomManager"), this.bean = getManager().bean, this.mainNode = this.bean.getMainNode(), this.$mainNode = $(this.mainNode), this.hasNavigator = !(this.$mainNode.is(".embedded") || this.$mainNode.is(".cinema")), this.navPanLeft = 0, this.navPanTop = 0, this.$viewPort = this.$mainNode.find(".canvasContainer"), this.$drawPlzCanvas = this.$mainNode.find(".drawPlzCanvas"), this.$navigator = this.$mainNode.find(".drawPlzZoom"), this.$panInd = this.$mainNode.find(".panIndicator"), this.MAX_NAV_WIDTH = 290, this.MAX_NAV_HEIGHT = 130, this.REFRESH_TIMEOUT = 2e3, this.bindHtml(), this.navCanvas = new Canvas($(".navigatorCanvas canvas", this.mainNode).get(0)), this.reset(t, a), new Dragger([$(".navMouseCapture", this.$navigator).get(0), $(".panIndicator", this.$navigator).get(0), $(".panIndicatorInner", this.$navigator).get(0)], $(".navigatorCont", this.$navigator).get(0), this.startNavDrag.bindTo(this), this.moveNavDrag.bindTo(this), this.endNavDrag.bindTo(this)), this.refreshNavigator(), $(".navigatorCont").show(), this.bean.subscribe("scale", this.reScale.bindTo(this)), getManager().layerManager.subscribe(this.delayedNavRefresh.bindTo(this))
        },
        reset: function(t, a) {
            this.realWidth = t, this.realHeight = a, this.navScale = Math.min(this.MAX_NAV_WIDTH / this.realWidth, this.MAX_NAV_HEIGHT / this.realHeight), this.navWidth = Math.round(this.realWidth * this.navScale), this.navHeight = Math.round(this.realHeight * this.navScale), $(".navigatorCont", this.mainNode).width(this.navWidth).height(this.navHeight).css("top", Math.floor((this.MAX_NAV_HEIGHT + 10 - this.navHeight) / 2)), this.navCanvas.init(this.navWidth, this.navHeight, !0), this.navCtx = this.navCanvas.context
        },
        startNavDrag: function() {},
        moveNavDrag: function(t) {
            this.setNavPan(Math.round(t[0] - this.navPanWidth / 2), Math.round(t[1] - this.navPanHeight / 2))
        },
        endNavDrag: function() {
            this.writeZoom()
        },
        zoomInstruction: function() {
            var t = this.bean.getScale();
            return [this.navPanLeft, this.navPanTop, Math.ceil(this.$drawPlzCanvas.width() / t), Math.ceil(this.$drawPlzCanvas.height() / t)]
        },
        writeZoom: function() {
            try {
                mgr.bean.getRDWriter().startInstruction(RDInst.ZOOM, this.zoomInstruction()).pushInstruction()
            } catch (t) {}
        },
        bindHtml: function() {
            $(".zoomIn", this.$navigator).click(this.zoomIn.bindTo(this)), $(".zoomOut", this.$navigator).click(this.zoomOut.bindTo(this)), $(".zoomZero", this.$navigator).click(this.actualPixels.bindTo(this))
        },
        setNavPan: function(t, a) {
            this.navPanLeft = Math.round(Math.max(0, Math.min(this.navWidth - this.navPanWidth, t))), this.navPanTop = Math.round(Math.max(0, Math.min(this.navHeight - this.navPanHeight, a))), $(".panIndicator", this.$navigator).css("left", this.navPanLeft + "px").css("top", this.navPanTop + "px");
            var i = this.bean.getScale(),
                e = i * this.navPanLeft / this.navScale,
                n = i * this.navPanTop / this.navScale;
            return this.$drawPlzCanvas.scrollLeft(e).scrollTop(n), [this.navPanLeft, this.navPanTop]
        },
        zoomIn: function() {
            var t = Math.min(5, this.bean.getScale() + .1);
            return t = Math.round(10 * t) / 10, t != this.scale && this.bean.setScale(t), !1
        },
        zoomOut: function() {
            var t = Math.max(.1, this.bean.getScale() - .1);
            return t = Math.round(10 * t) / 10, t != this.scale && this.bean.setScale(t), !1
        },
        reScale: function() {
            for (var t = this.bean.getScale(), a = getManager().layerManager, i = Math.round(this.realWidth * t), e = Math.round(this.realHeight * t), n = 0; a.layers.length > n; n++) {
                var h = a.layers[n];
                h.ctx.rescale(i, e)
            }
            this.bean.getBufferCtx().rescale(i, e), this.bean.getStagingCtx().rescale(i, e), getManager().selectionManager && getManager().selectionManager.antsCtx.rescale(i, e), this.refreshViewport(), this.writeZoom()
        },
        reScaleLayer: function(t) {
            var a = this.bean.getScale(),
                i = Math.round(this.realWidth * a),
                e = Math.round(this.realHeight * a);
            t.ctx.rescale(i, e)
        },
        transformCoords: function(t) {
            var a = this.bean.getScale();
            return [t[0] / a, t[1] / a]
        },
        getCanvasHeight: function(t) {
            var a = this.bean.getScale();
            $(".zoomPercentage", this.$navigator).empty().html(Math.round(100 * a) + "%");
            var i = this.realHeight * a;
            return i >= t - 10 ? t - 10 : Math.floor(i)
        },
        refreshViewport: function() {
            var t, a, i, e, n = this.bean.getScale();
            $(".zoomPercentage", this.$navigator).empty().html(Math.round(100 * n) + "%");
            var h = this.realWidth * n,
                s = this.realHeight * n,
                r = this.$viewPort.height(),
                o = this.$viewPort.width();
            s >= r - 15 ? (a = 5, i = r - 15) : (a = Math.floor((r - s) / 2), i = Math.floor(s)), h >= o - 40 ? (t = 20, e = o - 40) : (t = Math.floor((o - h) / 2), e = Math.floor(h)), this.$drawPlzCanvas.css("top", a + "px").css("left", t + "px").height(i).width(e), this.refreshNavigator(), mgr.layoutManager && mgr.layoutManager.chromeRepaintBugWorkaround()
        },
        clearRefresh: function() {
            this.refreshTimeout && window.clearTimeout(this.refreshTimeout), this.refreshTimeout = null
        },
        delayedNavRefresh: function() {
            this.refreshTimeout || (this.refreshTimeout = window.setTimeout(this.refreshNavigator.bindTo(this), this.REFRESH_TIMEOUT))
        },
        refreshNavigator: function() {
            if (this.refreshTimeout = null, this.hasNavigator) {
                this.navCtx.clear();
                for (var t = getManager().layerManager, a = 0; t.layers.length > a; a++) {
                    var i = t.layers[a];
                    i.isVisible() && (this.navCtx.globalAlpha = i.$canvasDom.css("opacity"), isSpecialChangestamp(i.changeStamp) ? i.changeStamp != CHANGESTAMPS.CLEAR && (this.navCtx.fillStyle = getSpecialColor(i.changeStamp), this.navCtx.fillRect(0, 0, this.navWidth, this.navHeight)) : this.navCtx.drawImage(i.canvasDom, 0, 0, this.realWidth, this.realHeight, 0, 0, this.navWidth, this.navHeight), this.navCtx.globalAlpha = 1)
                }
            }
            var e = this.bean.getScale();
            this.navPanWidth = Math.round(this.navScale * this.$drawPlzCanvas.width() / e), this.navPanHeight = Math.round(this.navScale * this.$drawPlzCanvas.height() / e), this.$panInd.width(this.navPanWidth - 4).height(this.navPanHeight - 4), this.setNavPan(this.navPanLeft, this.navPanTop)
        },
        actualPixels: function() {
            this.bean.setScale(1), this.reScale()
        },
        fitToScreen: function() {
            var t = this.$viewPort.height(),
                a = this.$viewPort.width(),
                i = t / (this.realHeight + 10),
                e = a / (this.realWidth + 10);
            this.bean.setScale(Math.min(i, e)), this.reScale()
        },
        simonFitToScreen: function() {
            var t = this.$viewPort.height(),
                a = this.$viewPort.width(),
                i = t / (this.realHeight + 10),
                e = a / (this.realWidth + 10);
            this.bean.setScale(Math.min(1, Math.min(i, e))), this.reScale()
        },
        isInFrame: function(t, a) {
            var i = this.bean.getScale(),
                e = i * this.navPanLeft / this.navScale,
                n = i * this.navPanTop / this.navScale,
                h = Math.floor(this.$viewPort.width() / i),
                s = Math.floor(this.$viewPort.height() / i);
            return t >= e && a >= n && e + h >= t && n + s >= a
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/zoomManager.js")
});
DWait.ready(["jms/lib/toolbar.js", "jms/lib/popuptoolbar.js", "jms/legacy/modals.js", "jms/lib/popup2.js"], function() {
    window.MuroToolbarAction = PopupToolbarAction.extend({
        constructor: function(o, e) {
            this.base(o, e), this.popup_name = this.popup_name || "MuroPopup" + this.name
        },
        act: function(o) {
            this.base(o), $(".stopTouch").width($(window).width()).height($(window).height()).show()
        },
        position_options: function() {
            var o = this.base();
            return o.bump.top -= 1, o.bump.left -= 203, o
        }
    }), window.MuroToolbar = Toolbar.extend({
        actions: {
            undo: MuroToolbarAction.extend({
                name: "undo",
                label: "&#9100;",
                title: "Undo",
                act: function() {
                    $(".muro-toolbar-undo").is(".disabled") || mgr.canvasDrawing.undo()
                }
            }),
            redo: MuroToolbarAction.extend({
                name: "redo",
                label: "&#9100;",
                title: "Redo",
                act: function() {
                    $(".muro-toolbar-redo").is(".disabled") || mgr.canvasDrawing.redo()
                }
            }),
            filters: MuroToolbarAction.extend({
                name: "filters",
                label: "Filters",
                title: "Filters",
                isMenu: !0,
                popup_options: function() {
                    return this._memoized_popup_options = this._memoized_popup_options || this._get_popup_options(), this._memoized_popup_options
                },
                _get_popup_options: function() {
                    return {
                        classes: "stashmuro-filters stashmuro-toolbar-menu default-toolbar-menu",
                        content: function() {
                            return $("#filter_menu").html()
                        },
                        hidden: function(o) {
                            this.default_popup_options().hidden.call(this, o), $(".stopTouch").hide()
                        }.bindTo(this),
                        events: [{
                            selector: ".muro-toolbar-filter",
                            event: "click",
                            callback: function() {
                                mgr.filterManager.filter = $(this).data("value"), mgr.filterManager.applyFilter()
                            }
                        }]
                    }
                }
            }),
            edit: MuroToolbarAction.extend({
                name: "edit",
                label: "Edit",
                title: "Edit",
                isMenu: !0,
                popup_options: function() {
                    return this._memoized_popup_options = this._memoized_popup_options || this._get_popup_options(), this._memoized_popup_options
                },
                _get_popup_options: function() {
                    return {
                        classes: "stashmuro-edit stashmuro-toolbar-menu default-toolbar-menu with-icons",
                        content: function() {
                            return $("#edit_menu").html()
                        },
                        hidden: function(o) {
                            this.default_popup_options().hidden.call(this, o), $(".stopTouch").hide()
                        }.bindTo(this),
                        created: function() {
                            var o = [{
                                rel: "cut",
                                key: "X",
                                modifiers: ["cmd"]
                            }, {
                                rel: "copy",
                                key: "C",
                                modifiers: ["cmd"]
                            }, {
                                rel: "paste",
                                key: "V",
                                modifiers: ["cmd"]
                            }, {
                                rel: "select-all",
                                key: "A",
                                modifiers: ["cmd"]
                            }, {
                                rel: "select-inverse",
                                key: "I",
                                modifiers: ["shift", "cmd"]
                            }, {
                                rel: "deselect",
                                key: "D",
                                modifiers: ["cmd"]
                            }];
                            this.addHotKeys(".muro-toolbar-", o)
                        },
                        events: [{
                            selector: ".muro-toolbar-cut",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.cut()
                            }
                        }, {
                            selector: ".muro-toolbar-copy",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.copy()
                            }
                        }, {
                            selector: ".muro-toolbar-paste",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.paste()
                            }
                        }, {
                            selector: ".muro-toolbar-select-all",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.selectAll()
                            }
                        }, {
                            selector: ".muro-toolbar-select-inverse",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.selectInverse()
                            }
                        }, {
                            selector: ".muro-toolbar-select-color",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.selectByColorModal()
                            }
                        }, {
                            selector: ".muro-toolbar-select-expand",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.expandModal()
                            }
                        }, {
                            selector: ".muro-toolbar-select-contract",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.contractModal()
                            }
                        }, {
                            selector: ".muro-toolbar-select-crop",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.crop(), "post" == mgr.tabManager.currentTab() && (mgr.layoutManager.showSpinner(), mgr.postProcessor.initAll(), mgr.postProcessor.chainPixelData().done(function() {
                                    mgr.layoutManager.hideSpinner()
                                }))
                            }
                        }, {
                            selector: ".muro-toolbar-deselect",
                            event: "click",
                            callback: function() {
                                mgr.selectionManager.deselect()
                            }
                        }, {
                            selector: ".muro-toolbar-clear",
                            event: "click",
                            callback: function() {
                                mgr.layerManager.removeAll(!0, !0)
                            }
                        }, {
                            selector: ".muro-toolbar-reset",
                            event: "click",
                            callback: function() {
                                mgr.modalManager.confirmModal("Reset All Brushes", "Are you sure you want to reset all your brush settings?", function(o) {
                                    o && mgr.brushSelector.reset()
                                })
                            }
                        }, {
                            selector: ".muro-toolbar-flip-horizontal",
                            event: "click",
                            callback: function() {
                                mgr.layerManager.flipLayersHoriz()
                            }
                        }, {
                            selector: ".muro-toolbar-flip-veritcal",
                            event: "click",
                            callback: function() {
                                mgr.layerManager.flipLayersVert()
                            }
                        }]
                    }
                }
            }),
            file: MuroToolbarAction.extend({
                name: "file",
                label: "File",
                title: "File",
                isMenu: !0,
                popup_options: function() {
                    return this._memoized_popup_options = this._memoized_popup_options || this._get_popup_options(), this._memoized_popup_options
                },
                _get_popup_options: function() {
                    return {
                        classes: "stashmuro-file stashmuro-toolbar-menu default-toolbar-menu with-icons",
                        content: function() {
                            return $("#file_menu").html()
                        },
                        hidden: function(o) {
                            this.default_popup_options().hidden.call(this, o), $(".stopTouch").hide()
                        }.bindTo(this),
                        shown: function(o) {
                            this.default_popup_options().shown.call(this, o), o.$node.find(".muro-autosave-timestamp").html(mgr.bean.getSaveTimeString())
                        }.bindTo(this),
                        events: [{
                            selector: ".muro-toolbar-new",
                            event: "click",
                            callback: function() {
                                mgr.fileManager.openNewFileModal()
                            }
                        }, {
                            selector: ".muro-toolbar-open",
                            event: "click",
                            callback: function() {
                                mgr.fileManager.openLoadModal()
                            }
                        }, {
                            selector: ".muro-toolbar-save",
                            event: "click",
                            callback: function() {
                                mgr.fileManager.recSaveAs()
                            }
                        }, {
                            selector: ".muro-toolbar-export",
                            event: "click",
                            callback: function() {
                                mgr.canvasDrawing.exportImage()
                            }
                        }, {
                            selector: ".muro-toolbar-import",
                            event: "click",
                            callback: function() {
                                mgr.$mainNode.find(".importTab").click()
                            }
                        }, {
                            selector: ".muro-toolbar-exit",
                            event: "click",
                            callback: function() {
                                mgr.fileManager.doneButton()
                            }
                        }]
                    }
                }
            }),
            separator: MuroToolbarAction.extend({
                name: "separator",
                label: "",
                act: $.noop,
                render: function() {
                    return this.$node = $('<div class="muro-toolbar-separator"></div>'), this.$node
                }
            })
        },
        disableBlock: function(o) {
            var e = o.join(",");
            $(e).addClass("disabled")
        },
        enableBlock: function(o) {
            var e = o.join(",");
            $(e).removeClass("disabled"), (o.indexOf(".muro-toolbar-undo") > 0 || o.indexOf(".muro-toolbar-redo") > 0) && mgr.undoManager.setDisabledStates()
        },
        adjustDisablements: [".muro-toolbar-export", ".muro-toolbar-import", ".muro-toolbar-cut", ".muro-toolbar-copy", ".muro-toolbar-paste", ".muro-toolbar-select-color", ".muro-toolbar-clear", ".muro-toolbar-reset", ".muro-toolbar-flip-horizontal", ".muro-toolbar-flip-veritcal", ".muro-toolbar-filter", ".muro-toolbar-preset", ".muro-toolbar-undo", ".muro-toolbar-redo"]
    }), window.DWait && DWait.run("jms/pages/drawplz/toolbar.js")
});
window.MODE_NORMAL = "normal", window.MODE_PLAYBACK = "playback", window.APP_TYPE_STANDALONE = "standalone", window.APP_TYPE_COMMENT = "comment", window.APP_TYPE_CINEMA = "cinema", window.APP_TYPE_EMBEDDED = "embedded", window.LayoutManager = Base.extend({
    toolbarData: {
        toolbar_name: "muro",
        toolbar_node: ".stashmuro-toolbar",
        toolbar_button_class: "headerButton",
        toolbar_menu_class: "headerMenu gmbutton2",
        toolbar_order: ["separator", "undo", "redo", "file", "edit", "filters"]
    },
    constructor: function() {
        this.app_type = APP_TYPE_STANDALONE, this._construct()
    },
    _construct: function() {
        this.logger = new StdLogger("layoutmanager"), this.mainNode = mgr.bean.getMainNode(), this.$sidebar = $(".sideBar", this.mainNode), this.headerSize = $("table#overhead").height(), this.controlSize = $(".drawPlzControls", this.mainNode).height(), this.spinnerSemaphore = 0, this.disableTextSelect(), this.createToolbar(), this.bindEvents(), this.resizeDrawingArea(), this.resizeBrushSelector(), this.layout_mode = MODE_NORMAL, this.updateLayout()
    },
    createToolbar: function() {
        $("td.oh-stashinactivetab").hide().next().addClass("oh-stashmuro-toolbar oh-default-toolbar").append($(".stashmuro_actions").clone()), $(".stash-toolbar").removeClass("stash-toolbar").addClass("stashmuro-toolbar"), vms_feature("presets") && (this.toolbarData.toolbar_order = ["separator", "undo", "redo", "file", "edit", "presets"]), this.muroToolbar = new MuroToolbar("muro", $('<div id="muroToolbar"></div>'), function() {}, this.toolbarData), this.muroToolbar.show(), window.deviantART.deviant.loggedIn || (PubSub.subscribe({
            eventname: "gWebPage.update",
            subscriber: this,
            callback: this.onLogin
        }), PubSub.unsubscribe({
            eventname: "gWebPage.update",
            subscriber: mgr
        }), PubSub.subscribe([{
            eventname: "Signup.headerRefresh",
            subscriber: this,
            callback: this.createToolbar
        }, {
            eventname: "gWebPage.update",
            subscriber: this,
            callback: this.onLogin
        }]))
    },
    onLogin: function() {},
    disableTextSelect: function() {
        var e = document.body;
        e.onselectstart !== void 0 ? $(e).bind("selectstart", function() {
            return $(document.activeElement).is("input") ? !0 : !1
        }) : e.style.MozUserSelect !== void 0 ? $(e).css("MozUserSelect", "-moz-none") : $(e).mousedown(function() {
            return $(document.activeElement).is("input") ? !0 : !1
        })
    },
    bindEvents: function() {
        $(window).resize(function() {
            this.resizeDrawingArea(), this.chromeRepaintBugWorkaround()
        }.bindTo(this)), $(window).resize(this.resizeBrushSelector.bindTo(this)), $(document).on("click", ".stashmuro-submit", function() {
            return mgr.fileManager.doneButton(), !1
        }), $(".brushPaddleRight", this.mainNode).click(function() {
            this.scrollRight()
        }.bindTo(this)), $(".brushPaddleLeft", this.mainNode).click(function() {
            this.scrollLeft()
        }.bindTo(this)), $(".toolTab", this.mainNode).click(function() {
            this.$sidebar.find(".sidebarTabSelected").removeClass("sidebarTabSelected").end().find(".toolTab").addClass("sidebarTabSelected").end().find(".toolsSidebarTab").show().end(), this.resizeSidebar()
        }.bindTo(this)), $(document).on("click", ".loadDraftModal .mainPart .moveUp", function() {
            return mgr.fileManager.getRootDraftsList($(this).parent().parent().parent(), 0, 1), !1
        }), $(".loginPhrase").click(function() {
            DiFi.pushPost("DrawPlz", "login_noop", [], function(e) {
                e && setTimeout(mgr.fileManager.startRecording.bindTo(mgr.fileManager), 10)
            }.bindTo(this)), DiFi.send()
        }), mgr.bean.subscribe(["draftId", "deviationId", "draftTitle", "busyFlags"], function() {
            mgr.isBusy("save") ? (this.disableMenuItem("saveAs"), this.disableMenuItem("save")) : (this.enableMenuItem("saveAs", !0), mgr.bean.getDraftId() && mgr.undoManager.hasUnsavedWork() ? this.enableMenuItem("save", !0) : this.disableMenuItem("save"))
        }.bindTo(this)), mgr.bean.subscribe(["isLargeBrushArea"], this.largeBrushDrawer.bindTo(this))
    },
    largeBrushDrawer: function() {
        mgr.bean.getIsLargeBrushArea() ? ($(".middleArea").addClass("largeBrushDrawer"), $(".drawPlzControls").addClass("largeBrushDrawer"), $(".secondarySelector").show()) : ($(".largeBrushDrawer").removeClass("largeBrushDrawer"), $(".secondarySelector").hide()), this.resizeDrawingArea()
    },
    blurAll: function() {
        $(".drawPlzApp").addClass("blurred"), $("#overhead-collect").addClass("blurred")
    },
    modalUnblur: function() {
        $(".drawPlzApp").removeClass("blurred"), $("#overhead-collect").removeClass("blurred")
    },
    unBlur: function() {
        $(".blurred").removeClass("blurred")
    },
    blurTop: function() {
        $("#overhead-collect").addClass("blurred")
    },
    blurBottom: function() {
        $(".bottomArea").addClass("blurred")
    },
    hideTools: function() {
        $(".middleArea").addClass("noTools"), $(".drawPlzControls").addClass("noTools"), this.resizeDrawingArea()
    },
    showTools: function() {
        $(".noTools").removeClass("noTools"), this.resizeDrawingArea(), this.alignBsArrow()
    },
    getMiddleAreaSize: function(e) {
        var r = $(this.mainNode).height();
        return r - this.headerSize - e
    },
    getSidebarSize: function(e) {
        return e - 278
    },
    resizeDrawingArea: function() {
        var e = mgr.zoomManager;
        if (this.controlSize = $(".drawPlzControls", this.mainNode).height() || 15, this.layout_mode == MODE_PLAYBACK) {
            var r = $(".drawPlzContainer").height() - $(".rdControls").offset().top;
            $(".playbackStoptouch").css("bottom", r + "px")
        }
        e.refreshViewport(), this.resizeSidebar(), mgr.imageImporter && mgr.imageImporter.active && mgr.imageImporter.sizeModal(), this.resizeControls(), mgr.safari5.mainResize()
    },
    resizeControls: function() {
        var e, r = mgr.$mainNode.find(".drawPlzControls");
        980 > r.width() ? (r.addClass("narrowControls"), e = 20) : (r.removeClass("narrowControls"), e = 110)
    },
    resizeSidebar: function() {
        this.$sidebar.find(".postSidebarTab").is(":visible") && this.resizeTabStoptouch()
    },
    resizeTabStoptouch: function() {
        if (!mgr.layoutManager) return setTimeout(this.resizeTabStoptouch.bindTo(this), 10), void 0;
        var e = mgr.$mainNode.find(".middleArea").is(".largeBrushDrawer") ? 170 : 125;
        mgr.$mainNode.find(".footerGrayer").height(e), mgr.bean.setIsLargeBrushArea(!1)
    },
    resizeBrushSelector: function() {
        var e = $(".brushSelector .regularBrushes", this.mainNode),
            r = $(this.mainNode).width(),
            t = r - 106;
        t -= t % 40, e.find(".scroller").width(t);
        var a = 40 * e.find(".brushButton").length + 3;
        a += 275 * e.find("span.noOptions").length, e.find(".brushCont").width(a);
        var i = Math.round((t - a) / 2);
        a >= t && (i = 0), e.find(".brushCont").css("left", i + "px");
        var s = Math.round((r - t) / 2);
        e.find(".scroller").css("left", s + "px"), this.scrollerButtonStates(), this.alignSpecialBrushes(), this.alignBsArrow()
    },
    alignBsArrow: function() {
        try {
            $(".brushSelectorArrow").css("left", $(".toolbuttonActive").offset().left + 15 + "px")
        } catch (e) {}
    },
    alignSpecialBrushes: function() {
        $(".selectionBrushes", this.mainNode).each(function(e, r) {
            var t = $(".brushButton", r).length,
                a = 40 * t,
                i = $(".brushSelector", this.mainNode).width(),
                s = Math.floor((i - a) / 2);
            $(r).css("margin-left", s + "px")
        })
    },
    scrollLeft: function() {
        var e = $(".scroller", this.mainNode).get(0),
            r = Math.floor($(e).width() / 2);
        r -= r % 40, e.scrollLeft -= r, this.scrollerButtonStates()
    },
    scrollRight: function() {
        var e = $(".scroller", this.mainNode).get(0),
            r = Math.floor($(e).width() / 2);
        r -= r % 40, e.scrollLeft += r, this.scrollerButtonStates()
    },
    scrollerButtonStates: function() {
        var e = $(".scroller", this.mainNode).get(0),
            r = $(".brushCont", this.mainNode).width(),
            t = $(e).width(),
            a = e.scrollLeft;
        t >= r ? ($(".brushPaddleLeft, .brushPaddleRight", this.mainNode).hide(), e.scrollLeft = 0) : ($(".brushPaddleLeft, .brushPaddleRight", this.mainNode).show(), t > r - e.scrollLeft && (a = r - t, a -= a % 40, e.scrollLeft = a)), 10 > a ? $(".brushPaddleLeft", this.mainNode).addClass("brushPaddleLeftDisabled") : $(".brushPaddleLeft", this.mainNode).removeClass("brushPaddleLeftDisabled"), a > r - t - 10 ? $(".brushPaddleRight", this.mainNode).addClass("brushPaddleRightDisabled") : $(".brushPaddleRight", this.mainNode).removeClass("brushPaddleRightDisabled")
    },
    showMenuItems: function(e, r) {
        for (var t = 0; e.length > t; ++t) this.showMenuItem(e[t], r)
    },
    showMenuItem: function(e, r) {
        r = "boolean" == typeof r ? r : !0;
        var t = $(".topArea .stuffMenuItem[rel=" + e + "]", this.mainNode);
        t[r ? "show" : "hide"]()
    },
    disableMenuItem: function(e) {
        this.enableMenuItem(e, !1)
    },
    enableMenuItem: function(e, r) {
        r = r === void 0 ? !0 : r;
        var t = $(".topArea .mi[rel=" + e + "]", this.mainNode);
        t[r ? "removeClass" : "addClass"]("disabled")
    },
    getAppType: function() {
        return this.app_type
    },
    isStandalone: function() {
        return this.app_type == APP_TYPE_STANDALONE
    },
    setLayoutMode: function(e) {
        if (e = (e + "").toLowerCase(), e != this.layout_mode) {
            switch (e) {
                case MODE_PLAYBACK:
                    break;
                default:
                    e = MODE_NORMAL
            }
            this.layout_mode = e, this.updateLayout()
        }
    },
    updateLayout: function() {
        switch ($(".headerButton, .headerDivider, .bottomArea", this.mainNode).show(), $(".toolsSidebarTab .layerOpacitySlider, .toolsSidebarTab .layerControls", this.mainNode).show(), $(".mi", this.mainNode).show(), this.layout_mode || (this.layout_mode = MODE_NORMAL), this.showMenuItems(["invite", "poll", "ispublic"], !1), this.app_type) {
            case APP_TYPE_STANDALONE:
                vms_feature("artbitkit") || this.showMenuItems(["share"], !1);
                break;
            case APP_TYPE_COMMENT:
                this.showMenuItems(["import", "load"], !1)
        }
        this.resizeDrawingArea()
    },
    handleMenuClick: function() {
        var e = $(this).attr("rel");
        if ($(this).hasClass("disabled")) return !1;
        try {
            switch (e) {
                case "clear":
                    mgr.layerManager.removeAll(!0, !0);
                    break;
                case "reset":
                    mgr.modalManager.confirmModal("Reset All Brushes", "Are you sure you want to reset all your brush settings?", function(e) {
                        e && mgr.brushSelector.reset()
                    });
                    break;
                case "export":
                    mgr.canvasDrawing.exportImage();
                    break;
                case "import":
                    mgr.imageImporter && mgr.imageImporter && mgr.imageImporter.importImage();
                    break;
                case "share":
                    mgr.fileManager.openShareModal();
                    break;
                case "saveAs":
                    mgr.fileManager.recSaveAs();
                    break;
                case "load":
                    mgr.fileManager.openLoadModal();
                    break;
                case "new":
                    mgr.fileManager.openNewFileModal();
                    break;
                case "saveExit":
                    mgr.fileManager.doneButton();
                    break;
                case "cut":
                    mgr.selectionManager.cut();
                    break;
                case "copy":
                    mgr.selectionManager.copy();
                    break;
                case "paste":
                    mgr.selectionManager.paste();
                    break;
                case "deselect":
                    mgr.selectionManager.deselect();
                    break;
                case "selectAll":
                    mgr.selectionManager.selectAll();
                    break;
                case "selectInverse":
                    mgr.selectionManager.selectInverse();
                    break;
                case "selectColor":
                    mgr.selectionManager.selectByColorModal();
                    break;
                case "selectExpand":
                    mgr.selectionManager.expandModal();
                    break;
                case "selectContract":
                    mgr.selectionManager.contractModal();
                    break;
                case "cropSel":
                    mgr.selectionManager.crop();
                    break;
                case "flipH":
                    mgr.layerManager.flipLayersHoriz();
                    break;
                case "flipV":
                    mgr.layerManager.flipLayersVert()
            }
        } catch (r) {
            stdLog("Error: " + r.message)
        }
        return !1
    },
    sidebarModalLayout: function(e) {
        var r = mgr.$mainNode.find(".drawPlzCanvas");
        e.find(".sidebarViewport").width(r.width()).height(r.height()).css("top", r.offset().top + "px").css("left", r.offset().left + "px").scrollLeft(r.scrollLeft()).scrollTop(r.scrollTop());
        var t = 125;
        e.find(".sidebarFooter88ayer").height(t), mgr.bean.setIsLargeBrushArea(!1)
    },
    showSpinner: function() {
        $(".canvasSpinner .spinnerImage .spinner").remove(), this.spinner = new Spinner($.extend({}, SpinnerPresets.green, {
            top: 2,
            left: -19
        })), this.spinner.spin(mgr.$mainNode.find(".canvasSpinner .spinnerImage").get(0)), mgr.$mainNode.find(".canvasSpinner").show(), this.spinnerSemaphore++
    },
    hideSpinner: function() {
        0 === --this.spinnerSemaphore && (this.spinner.stop(), mgr.$mainNode.find(".canvasSpinner .spinnerImage .spinner").remove(), mgr.$mainNode.find(".canvasSpinner").hide())
    },
    chromeRepaintBugWorkaround: function() {
        this.$drawPlzCanvas || (this.$drawPlzCanvas = $(".drawPlzCanvas")), this.$drawPlzCanvas.hide(), this.$drawPlzCanvas.offset(), this.$drawPlzCanvas.show()
    }
}), window.CinemaLayoutManager = LayoutManager.extend({
    constructor: function() {
        this.app_type = APP_TYPE_CINEMA, this._construct()
    },
    bindEvents: function() {
        this.base(), $(window).resize(function() {
            mgr.zoomManager.fitToScreen()
        }), $(document).on("click", ".artistView", function() {
            var e = "http://sta.sh/muro/redraw/" + mgr.recordingDeviationId,
                r = mgr.bean.getRDReader();
            r && r.playing && mgr.playbackManager.playbuttonClick(), window.open(e, "_top")
        }), $(document).on("click", ".exitRedraw", function() {
            mgr.playbackManager.pauseIfPlaying(), parent.postMessage("close_redraw", "*")
        })
    },
    resizeSidebar: function() {},
    disableTextSelect: function() {},
    resizeDrawingArea: function() {
        var e = mgr.zoomManager;
        $(".middleArea", this.mainNode).height(mgr.$mainNode.height() - 50), $(".middleArea", this.mainNode).width(mgr.$mainNode.width()), e.refreshViewport(), this.resizeControls()
    },
    resizeControls: function() {}
}), window.EmbeddedLayoutManager = CinemaLayoutManager.extend({
    constructor: function() {
        console.log("Embedded constructor"), this.app_type = APP_TYPE_EMBEDDED, this._construct(), this.resizeEmbedCover()
    },
    resizeEmbedCover: function() {
        var e = mgr.$mainNode.find(".middleArea"),
            r = mgr.$mainNode.find(".embedCover"),
            t = r.find(".previewImage"),
            a = r.find(".splash"),
            i = t.attr("fullview_width"),
            s = t.attr("fullview_height"),
            o = e.width() - 10,
            n = e.height() - 5,
            d = o / n,
            l = i / s;
        l > d ? (t.width(o), t.height(Math.round(o / l))) : (t.height(n), t.width(Math.round(n * l))), t.css("left", Math.round((e.width() - t.width()) / 2) + "px").css("top", Math.round((e.height() - t.height()) / 2) - 5 + "px"), a.css("left", Math.round((e.width() - a.width()) / 2) + "px").css("top", Math.round((e.height() - a.height()) / 2) + "px"), r.show()
    },
    resizeDrawingArea: function() {
        var e = mgr.zoomManager;
        mgr.showControls ? $(".middleArea", this.mainNode).height(mgr.$mainNode.height() - 50) : $(".middleArea", this.mainNode).height(mgr.$mainNode.height()), $(".middleArea", this.mainNode).width(mgr.$mainNode.width()), e.refreshViewport(), this.resizeEmbedCover(), this.resizeControls()
    }
}), window.DWait && DWait.run("jms/pages/drawplz/layoutManager.js");
window.FLIP_DIRECTION_HORIZ = 1, window.FLIP_DIRECTION_VERT = 2, window.Layer = Base.extend({
    constructor: function(t, a) {
        this.logger = new StdLogger("Layer"), this.manager = t, this.bean = this.manager.bean, this.name = this.manager.getUniqueName(a), this.layerId = -1 * Math.round(4294967296 * Math.random() - 1), this.gotData = !1, this.createCanvas(), this.changeStamp = 0, this.oldChangeStamp = -1
    },
    createCanvas: function() {
        this.canvasDom = document.createElement("canvas"), this.$canvasDom = $(this.canvasDom), $(this.manager.paintArea).get(0).appendChild(this.canvasDom), this.$canvasDom.addClass("canvasPaint"), this.canvasObj = new Canvas(this.canvasDom), this.canvasObj.init(this.manager.realWidth, this.manager.realHeight, !1), this.ctx = this.canvasObj.context
    },
    getName: function() {
        return this.name
    },
    setName: function(t) {
        if (t != this.name) {
            var a = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["rn", this.name, t]);
            return t = this.manager.getUniqueName(t), this.name = t, this.manager.updateDisplay(), a.pushInstruction(), t
        }
    },
    getId: function() {
        return this.layerId
    },
    setId: function(t) {
        return this.layerId = parseInt(t, 10), this.layerId
    },
    getLayerData: function() {
        var t = this.layerData || {};
        return t.layerid = this.layerId, t.name = this.name, t
    },
    setLayerData: function(t) {
        return this.layerData = t, this.setId(t.layerid), this.setName(t.name), this.layerData
    },
    getContext: function() {
        return this.ctx
    },
    setZIndex: function(t) {
        $(this.canvasDom).css("z-index", t)
    },
    duplicate: function() {
        return copy = new Layer(this.manager, this.name)
    },
    destroy: function() {
        $(this.canvasDom).remove()
    },
    select: function() {
        this.bean.startAtomic();
        var t = $(this.canvasDom).css("opacity");
        return this.bean.setSelectedLayer(this), this.bean.setLayerOpacity(t), this.bean.endAtomic(), this
    },
    toggle: function() {
        var t = mgr.bean.getRDWriter().startInstruction(RDInst.LAYER, ["v", this.getName(), !this.isVisible]);
        $(this.canvasDom).toggle(), getManager().layerManager.changeEvent(), getManager().layerManager.updateDisplay(), this.setChangeStamp(), getManager().undoManager.push(), t.pushInstruction()
    },
    isVisible: function() {
        return $(this.canvasDom).is(":visible")
    },
    isDataLoaded: function() {
        return this.gotData === !0
    },
    setData: function(t, a) {
        var e = new Image;
        e.onload = function() {
            var t = this.getContext();
            t.clear(), t.drawImage(e, 0, 0), this.setChangeStamp(), this.logger.log("Setting data"), a && a()
        }.bindTo(this), e.src = t, this.gotData = !0
    },
    setChangeStamp: function(t) {
        this.oldChangeStamp = this.changeStamp, null === t || t === void 0 ? (this.changeStamp = (new Date).getTime(), this.changeStamp = Math.ceil(1e8 * Math.random())) : this.changeStamp = t, this.manager.changeEvent([this])
    },
    getMetadata: function() {
        var t = {
            name: this.getName(),
            opacity: Math.round(100 * parseFloat($(this.canvasDom).css("opacity"))) / 100,
            visible: this.isVisible() ? 1 : 0,
            changestamp: this.changeStamp
        };
        return this.getId() > 0 && (t.layerid = this.getId()), t
    },
    flip: function(t) {
        if (!isSpecialChangestamp(this.changeStamp)) {
            var a = mgr.bean.getBufferCtx();
            a.globalCompositeOperation = "source-over", a.clear(), a.drawImage(this.canvasDom, 0, 0), this.ctx.clear(), this.ctx.save(), t == FLIP_DIRECTION_HORIZ ? (this.ctx.translate(mgr.width, 0), this.ctx.scale(-1, 1)) : (this.ctx.translate(0, mgr.height), this.ctx.scale(1, - 1)), this.ctx.drawImage(mgr.bufferCanvas.canvas.get(0), 0, 0), this.ctx.restore(), this.setChangeStamp(null), a.clear()
        }
    },
    resize: function(t, a, e, n, s) {
        var i = document.createElement("canvas"),
            r = new Canvas(i);
        r.init(t, a, !1);
        var h = r.context;
        h.save();
        try {
            h.translate(e, n), h.rotate(s), h.drawImage(this.canvasDom, 0, 0)
        } finally {
            h.restore()
        }
        this.$canvasDom.remove(), this.canvasDom = i, this.$canvasDom = $(i), $(this.manager.paintArea).get(0).appendChild(this.canvasDom), this.$canvasDom.addClass("canvasPaint"), this.canvasObj = r, this.ctx = h
    }
}), window.DWait && DWait.run("jms/pages/drawplz/layer.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/drawplz/StdLogger.js"], function() {
    window.SliderManager = Base.extend({
        constructor: function() {
            this.sliderId = 0
        },
        setVal: function(t, i, n, e) {
            var r = 100 * i;
            t.find(".knob").css("left", r + "%"), t.find(".sliderProgress").css("width", r + "%"), t.find(".value").html(n + e), t.find(".fineInput").val(n)
        },
        getVal: function(t, i) {
            var n = t.find(".track").width();
            return Math.max(0, Math.min(1, i[0] / n))
        },
        fineTuneBinder: function(t, i, n, e, r, s) {
            var u = this.sliderId;
            this.sliderId++, s || (s = 1), i.click(function() {
                t.show();
                var i = Math.round(n() * s);
                return t.val(i), t.get(0).focus(), !1
            }), t.blur(function() {
                t.hide()
            }), t.get(0).onkeydown = function(t) {
                switch (t.which) {
                    case 38:
                        return e(n() + r), !1;
                    case 40:
                        return e(n() - r), !1
                }
                return !0
            }, t.get(0).onkeyup = function() {
                return this["timer_" + u] && clearTimeout(this["timer_" + u]), this["timer_" + u] = setTimeout(function() {
                    e(t.val() / s), this["timer_" + u] = null
                }.bindTo(this), 1e3), !1
            }.bindTo(this)
        }
    }), window.DWait && DWait.run("jms/pages/drawplz/slider.js")
});
window.RDInst = {
    BRUSH: "b",
    LAYER: "l",
    TOOLMANAGER: "tm",
    SELECTION: "sel",
    ZOOM: "z",
    UNDO: "u",
    FILTER: "fil",
    ERROR: "err",
    FLUSH: "flsh",
    VERSION: "v",
    ANNOTATION: "annot",
    SIZE: "s",
    BASICPRO: "bp"
}, window.DWait && DWait.run("jms/pages/drawplz/redraw/RDInst.js");
window.checkFeature = function() {
    return !1
}, window.getCheckFeatureInfos = function() {
    for (var e = [], n = {}, r = 0; e.length > r; r++) n[e[r]] = window.checkFeature(e[r]);
    return n
}, window.DWait && DWait.run("jms/pages/drawplz/featureManager.js");
window.Safari5 = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Safari 5"), this.$dpa = $(".drawPlzApp"), this.$middle = this.$dpa.find(".middleArea"), this.$bottom = this.$dpa.find(".bottomArea"), this.$bottom.find(".satval_area").css("background", "url(http://st.deviantart.net/muro/satval.png)"), this.watchElements(), this.mainResize()
    },
    watchElements: function() {
        this.$dpa.resize(this.mainResize.bindTo(this))
    },
    mainResize: function() {
        this.middleAreaResize(), this.bottomAreaResize(), mgr.zoomManager.refreshViewport()
    },
    middleAreaResize: function() {
        if (this.$middle.is(".largeBrushDrawer") ? this.$middle.height(this.$dpa.height() - 220) : this.$middle.is(".noTools") ? this.$middle.height(this.$dpa.height() - 95) : this.$middle.height(this.$dpa.height() - 175), this.$middle.find(".sidebarTab").height(this.$middle.height() - 36), mgr.tabManager) switch (mgr.tabManager.currentTab()) {
            case "tools":
                this.$middle.find(".drawPlzLayers").height(this.$middle.find(".toolsSidebarTab").height() - 192), this.$middle.find(".layerWell").height(this.$middle.find(".drawPlzLayers").height() - 50), this.$middle.find(".drawPlzLayerDragger .drawPlzLayerList").height(this.$middle.find(".layerWell").height() - 6);
                var i = $(".iiStoptouch");
                i.length && i.is(":visible") && (i.find(".iiWindow").width(i.width() - 360), i.find(".iiWindow").height(i.height() - 185), i.find(".iiControls").height(i.height() - 188));
                break;
            case "post":
                var t = this.$middle.find(".postSidebarTab");
                t.find(".sideBarWell").height(t.height() - 47), t.find(".postAdjustments").height(t.find(".postWell").height() - 42), t.find(".ppControlScroller").height(t.find(".postAdjustments").height() - 250), t.find(".ppSaturationSlider .track").css("background", "#bbb");
                break;
            case "import":
                var e = this.$middle.find(".stashSidebarTab");
                e.width(298), e.height(this.middle.find(".sideBar").height() - 16), e.find(".sidebarMain").height(e.height() - 60), e.find(".types-container").width(e.find(".sidebarMain").width() - 2), e.find(".types-main").height(e.find(".types-container").height() - 24)
        }
    },
    bottomAreaResize: function() {
        this.$bottom.find(".textBrushText").width(this.$bottom.find(".textEntry").width() - 428)
    }
}), window.Safari5_stub = Base.extend({
    constructor: function() {
        this.logger = new StdLogger("Safari 5 Stub")
    },
    mainResize: function() {}
}), window.getSafariObj = function() {
    var i = document.createElement("div");
    return i.style.cssText = "width: -webkit-calc(100% - 10px); width: -moz-calc(100% - 10px); width: calc(100% - 10px);", i.style.length ? new Safari5_stub : new Safari5
}, window.DWait && DWait.run("jms/pages/drawplz/safari5.js");
if (window.DWait) {
    DWait.count()
}

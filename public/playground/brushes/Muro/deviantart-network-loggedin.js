/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
DDD = {
    DEFAULT_SNAP_TRESHOLD: 4,
    subject: null,
    subject_snap_treshold: null,
    p_down: null,
    mod_down: null,
    snapped: !1,
    preventDraggingToDesktop: function(D) {
        D.preventDefault()
    },
    hookMouse: function(D) {
        Events.hook(document, "mousedown", D), Browser.isTouch && Events.hook(document, "touchstart", D)
    },
    unhookMouse: function(D) {
        Events.unhook(document, "mousedown", D), Browser.isTouch && Events.unhook(document, "touchstart", D)
    },
    mouseDown: function(D, e, o, n) {
        return Glbl("Site.is_mobile") || DDD.subject || Browser.isTouch && "touchstart" === D.type || (D.which || D.button) > 1 ? !1 : (e.ddd.node = this, DDD.subject = e, DDD.subject_snap_treshold = o == Number(o) ? o : DDD.DEFAULT_SNAP_TRESHOLD, DDD.p_down = Ruler.document.pointer(D), DDD.mod_down = Ruler.clickMod(Ruler.document.node(DDD.subject.ddd.node, n), DDD.p_down), Events.hook(document, "mousemove", DDD.mouseDrag), Events.hook(document, "mouseup", DDD.mouseDrop), Browser.isTouch && (Events.hook(document, "touchmove", DDD.mouseDrag), Events.hook(document, "touchend", DDD.mouseDrop)), Browser.isIE && ($(DDD.subject.ddd.node).bind("mousemove", DDD.preventDraggingToDesktop), Browser.isIE8 && (document.onselectstart = function() {
            return !1
        })), DDD.p_current = null, 0 == DDD.subject_snap_treshold && DDD.mouseDrag(D), !0)
    },
    mouseDrop: function(D) {
        DDD.snapped && DDD.subject.ddd.drop.call(DDD.subject, D), DDD.mouseUp(D)
    },
    mouseUp: function() {
        DDD.p_down = null, DDD.snapped = !1, Browser.isIE && (DDD.subject && $(DDD.subject.ddd.node).unbind("mousemove", DDD.preventDraggingToDesktop), Browser.isIE8 && (document.onselectstart = null)), DDD.subject = null, Events.unhook(document, "mousemove", DDD.mouseDrag), Events.unhook(document, "mouseup", DDD.mouseDrop), Browser.isTouch && (Events.unhook(document, "touchmove", DDD.mouseDrag), Events.unhook(document, "touchend", DDD.mouseDrop))
    },
    mouseDrag: function(D) {
        var e;
        if (!DDD.subject) return !0;
        if (DDD.p_previous = DDD.p_current, DDD.p_current = e = Ruler.document.pointer(D), !DDD.snapped) {
            if (!(Math.abs(DDD.p_down.x - e.x) >= DDD.subject_snap_treshold || Math.abs(DDD.p_down.y - e.y) >= DDD.subject_snap_treshold)) return !0;
            DDD.snapped = !0, DDD.subject.ddd.snap.call(DDD.subject, D)
        }
        return DDD.subject.ddd.drag.call(DDD.subject, D), !1
    },
    eventKeys: function(D) {
        return Browser.isMac && !Browser.isOpera ? {
            range: D.shiftKey,
            multiple: D.metaKey
        } : {
            range: D.shiftKey,
            multiple: D.ctrlKey
        }
    }
}, window.DWait && DWait.run("jms/lib/ddd.js");
DDDUtils = {
    mix: function(t) {
        var r, d = DDDUtils.mixer;
        for (r in d) if (t[r] != d[r]) {
            if (t[r]) throw Error("subject." + r + " already exists");
            t[r] = d[r]
        }
    },
    mixer: {
        dddTickStart: function(t) {
            this.drag_data.top_drag_offset || (this.drag_data.top_drag_offset = 0), this.drag_data.scroll_timer = setInterval(bind(this, this._dddTickIterate), 200), this.dddTickUpdate(t)
        },
        dddTickUpdate: function(t) {
            this.drag_data.event_cache = {
                clientX: t.clientX,
                clientY: t.clientY,
                x: t.x,
                y: t.y
            }
        },
        dddTickEnd: function() {
            clearInterval(this.drag_data.scroll_timer)
        },
        _dddTickIterate: function() {
            var t, r;
            if (t = Ruler.screen.pointer(this.drag_data.event_cache), t.y > this.drag_data.top_drag_offset && this.drag_data.top_drag_offset + 48 > t.y || t.y > Ruler.screen.rect().y2 - 24) {
                if (this.drag_data.surfers) for (r = 0; this.drag_data.surfers[r]; r++) Surfer.update(this.drag_data.surfers[r], this.drag_data.event_cache);
                else this.drag_data.surfer2 && Surfer2.update(this.drag_data.surfer2, this.drag_data.event_cache);
                this.drag_data.top_drag_offset + 48 > t.y ? Browser.isGecko || Browser.isIE ? document.documentElement.scrollTop -= 48 : document.body.scrollTop -= 48 : Browser.isGecko || Browser.isIE ? document.documentElement.scrollTop += 48 : document.body.scrollTop += 48
            }
        }
    }
}, window.DWait && DWait.run("jms/lib/ddd.utils.js");
window.Renamer = function(t, e, i) {
    DTLocal.infect(this), this.init(t, e, i)
}, Renamer.prototype = {
    template: '<input type="text" class="itext renamer"/>',
    init: function(t, e, i) {
        this.node = $(this.template)[0], this.owner = t, this.callback = e, this.localEventHook(this.node, "blur", bind(this, this.blurred)), this.localEventHook(this.node, "keydown", bind(this, this.keyd)), this.localEventHook(this.node, "keyup", bind(this, this.keyu)), this.localEventHook(this.node, "click", bind(this, this.clicked)), this.localEventHook(this.node, "mousedown", bind(this, this.clicked)), this.previous_name = i, this.node.value = i, setTimeout(bind(this, this.focus), 1)
    },
    localRecv: function(t) {
        var e;
        "destroy" == t && (e = this.node.value, this.node.cancelled && (e = null), this.node.parentNode && this.node.parentNode.removeChild(this.node), this.callback && this.callback.call(this.owner, e, this.previous_name))
    },
    clicked: function(t) {
        return t.cancelBubble = !0, t.stopPropagation && t.stopPropagation(), !0
    },
    focus: function() {
        this.node.focus(), this.node.select()
    },
    blurred: function() {
        this.done()
    },
    done: function() {
        this.dead || (this.dead = !0, setTimeout(bind(this, this.localDestroy), 1))
    },
    keyd: function(t) {
        return 13 == t.keyCode ? (this.done(), !1) : void 0
    },
    keyu: function(t) {
        return 27 == t.keyCode ? (this.node.value = "", this.done(), !1) : void 0
    }
}, window.DWait && DWait.run("jms/lib/renamer.js");
DWait.ready(["jms/lib/Base.js", "jms/lib/events.js", "jms/lib/simple_selection.js", "jms/lib/browser.js", "jms/lib/wo.js"], function() {
    window.Selection = SimpleSelection.extend({
        constructor: function(t, e) {
            this.base(t, e), this.ieonmousedown = bind(this, this.ieonmousedown), this.onmousedown = bind(this, this.onmousedown), this.onclick = bind(this, this.onclick), this.ie_last_button = null
        },
        fnull: function() {},
        hook: function(t) {
            var t;
            if ("object" != typeof arguments[0] && (t = {
                include_keyboard: arguments[0],
                allow_multiple: arguments[1]
            }), this.options = t, this.options.include_click !== !1 && Events.hook(this.root, "click", this.onclick), this.options.include_keyboard && (this.options.include_keyboard = "h" == this.options.include_keyboard ? {
                37: !0,
                39: !0
            } : {
                38: !0,
                40: !0
            }, Events.hook(document.documentElement, Browser.isGecko ? "keypress" : "keydown", this.onkeydown = bind(this, this.onkeydown))), this.options.allow_multiple) {
                if (!window.DDD) throw Error("Cannot hook multiple without ddd.js present");
                Events.hook(this.options.selectable_area || this.root, "mousedown", this.onmousedown), this.root.onselectstart = this.cancelEvent
            } else this.options.fast_clicks && Events.hook(this.root, "mousedown", this.onclick);
            Browser.isIE && this.options.ieOnClickMouseButtonHack && Events.hook(this.root, "mousedown", this.ieonmousedown), this.options.global_mouse_cancel && Selection.mouseInit().addListener(this._bound_sel = bind(this, this.setSelection, null, "mousedown")), this.drag_rect_ruler = this.options.drag_rect_ruler || Ruler.document.node
        },
        cancelEvent: function(t) {
            return (t || window.event).cancelBubble = !0, !1
        },
        unhook: function() {
            Events.unhook(this.root, "click", this.onclick), Browser.isIE && Events.unhook(this.root, "mousedown", this.ieonmousedown), this.options.include_keyboard && Events.unhook(document.documentElement, Browser.isGecko ? "keypress" : "keydown", this.onkeydown), this.options.allow_multiple ? (Events.unhook(this.options.selectable_area || this.root, "mousedown", this.onmousedown), this.root.onselectstart = null) : this.options.fast_clicks && Events.unhook(this.root, "mousedown", this.onclick), this.options.global_mouse_cancel && Selection.mouseInit().removeListener(this._bound_sel)
        },
        onclick: function(t) {
            var e, o, s, n;
            if (t = t || window.event, s = this.options.allow_multiple && "ignore" != this.options.allow_multiple || this.options.ignore_keyclicks ? Selection.eventKeys(t) : {}, this.options.ignore_keyclicks && (s.multiple || s.range)) return !0;
            var l = Browser.isIE ? this.ie_last_button : t.button;
            if (l > (Browser.isGecko || Browser.isKHTML ? 0 : 1)) return !0;
            if (!window.Admin || !Admin.active) {
                Selection.focused = this, e = t.target || t.srcElement;
                do if (this.isSelectable(e)) {
                    if (n = this.isSelected(e), s.multiple || s.range) {
                        if (n) this.deselect(e);
                        else {
                            if (s.range && this.getSelection().length) {
                                var r = !1,
                                    c = !0,
                                    a = this.getAllSelectable();
                                for (i = 0; node = a[i]; i++) {
                                    if (node == e) {
                                        if (c = !1, r) break;
                                        r = !0
                                    }!r && c && this.isSelected(node) && (r = !0), r && this.select(node)
                                }
                            }
                            this.select(e)
                        }
                        this.callback && this.callback(this.getSelection(), [], "click"), o = !0
                    } else {
                        if (this.options.ignore_clicks) {
                            o = n && !this.next_sel_click_volatile, this.next_sel_click_volatile = !0;
                            break
                        }
                        this.setSelection(e, "click"), o = !0
                    }
                    break
                }
                while (e != this.root && (e = e.parentNode));
                if (o || this.options.sticky_selection || this.setSelection(null, "click"), this.options.ignore_clicks) return !0;
                if (e && e.blur) try {
                    e.blur()
                } catch (t) {}
                return t.returnValue = !1
            }
        },
        onkeydown: function(t) {
            var e;
            if (t = t || event, t.ctrlKey || t.metaKey || t.altKey || t.shiftKey) return !0;
            if ((t.target || t.srcElement).tagName in {
                TEXTAREA: 1,
                INPUT: 1
            }) return !0;
            if ((t.target || t.srcElement).isContentEditable || (t.target || t.srcElement).getAttribute("contenteditable")) return !0;
            if (Selection.focused == this) {
                if (t.keyCode in this.options.include_keyboard) return e = t.keyCode in {
                    37: 1,
                    38: 1
                } ? -1 : 1, this.setRelativeSelection(e, 1), this.scroll(e), !1;
                if (27 == t.keyCode) {
                    if (this.cancel_next_esc) return this.cancel_next_esc = 0, !0;
                    setTimeout(bind(this, this.setSelection, null, "keyboard"), 1)
                }
            }
            return !0
        },
        ieonmousedown: function(t) {
            t = t || window.event, this.ie_last_button = t.buttons || t.button
        },
        onmousedown: function(t) {
            var e;
            if (t = t || window.event, t.button > (Browser.isGecko ? 0 : 1));
            else {
                for (e = t.target || t.srcElement; e && e != document.documentElement && ("DIV" != e.tagName || e.parentNode.className.indexOf("thumb") >= 0 || e.className.indexOf("stash-tt-a") >= 0 || e.className.indexOf("stash-thumb-container") >= 0 || e.parentNode.parentNode.className.indexOf("wrap") >= 0);) {
                    if ("A" == e.tagName && 0 > e.className.indexOf("no-drag")) return !0;
                    if ("INPUT" == e.tagName) return !0;
                    e = e.parentNode
                }
                if (window.event && (window.event.cancelBubble = !0), t.stopPropagation && t.stopPropagation(), DDD.mouseDown.call(this.root, t, this, 12, !0)) return t.preventDefault && t.preventDefault(), window.Popup2 && Popup2.hideAll(), !1
            }
            return !0
        },
        getAllSelectableRects: function(t, e, i) {
            var o, s, n, l, r, c, a = 0;
            for (l = this.getAllSelectable(), n = [], o = 0; s = l[o]; o++)(!this.options.skip_first_item || a++) && (!e || !this.isSelected(s) && i !== s ? (c = this.drag_rect_ruler(s, !0), c.index = o, c.owner = t, c.node = s, e && r && (c.offset_mark = 1), n.push(c)) : r = !0);
            return n
        },
        ddd: {
            snap: function(t) {
                var e, i, o;
                for (e = Selection.eventKeys(t), this.drag_data = {
                    surfer2: Surfer2.create(t, Ruler.document.pointer(t)),
                    rects: [],
                    initial_selection: []
                }, this.drag_data.rects = "ignore" == this.options.allow_multiple ? [] : this.getAllSelectableRects(), i = 0; o = (this.drag_data.rects[i] || {}).node; i++) e && (e.multiple || e.range) && (this.drag_data.initial_selection[i] = this.isSelected(o));
                "rectangle" == this.options.allow_multiple && (this.drag_data.surfer2.node.style.display = "block"), window.DDDUtils && DDDUtils.mix(this), this.dddTickStart && this.dddTickStart(t)
            },
            drag: function(t) {
                var e, i, o;
                for (this.dddTickUpdate && this.dddTickUpdate(t), e = Surfer2.update(this.drag_data.surfer2, t), i = 0; msg_rect = this.drag_data.rects[i]; i++) o = msg_rect.x2 > e.x && e.x2 > msg_rect.x && msg_rect.y2 > e.y && e.y2 > msg_rect.y, o ^ this.drag_data.initial_selection[i] ? (this.next_sel_click_volatile = !1, this.select(this.drag_data.rects[i].node)) : this.deselect(this.drag_data.rects[i].node)
            },
            drop: function(t) {
                this.dddTickEnd && this.dddTickEnd(t), Surfer2.clear(this.drag_data.surfer2), this.drag_data.surfer2 = {}
            }
        },
        scroll: function(t, e) {
            var i;
            i = this.getSelection(), i.length && (rect = Ruler.document.node(this.root), t > 0 ? (e && "y" != e || (this.root.scrollTop = Math.max(this.root.scrollTop, 0, Ruler.document.node(i[i.length - 1]).y2 - (rect.y + rect.h - 8))), e && "x" != e || (this.root.scrollLeft = Math.max(this.root.scrollLeft, 0, Ruler.document.node(i[i.length - 1]).x2 - (rect.x + rect.w - 8)))) : (e && "y" != e || (this.root.scrollTop = Math.min(this.root.scrollTop, Math.max(0, Ruler.document.node(i[0]).y - rect.y))), e && "x" != e || (this.root.scrollLeft = Math.min(this.root.scrollLeft, Math.max(0, Ruler.document.node(i[0]).x - rect.x)))))
        }
    }), Selection.eventKeys = function(t) {
        return Browser.isMac && !Browser.isOpera ? {
            range: t.shiftKey,
            multiple: t.metaKey
        } : {
            range: t.shiftKey,
            multiple: t.ctrlKey
        }
    }, Selection.mouseInit = function() {
        return this._mouse || (this._mouse = new WatchableObject), this._mouse
    }, Selection.mouseCancel = function(t) {
        this._mouse && !t.ctrlKey && !t.metaKey && !t.altKey && !t.shiftKey && 1 > t.button && this._mouse.broadcast(t)
    }, window.DivOnlySelection = Selection.extend({
        getAllSelectable: function() {
            var t, e;
            for (t = [], e = 0; e != this.root.childNodes.length; e++) "div" == (this.root.childNodes[e].tagName || "").toLowerCase() && t.push(this.root.childNodes[e]);
            return t
        },
        isSelectable: function(t) {
            return t.parentNode == this.root && "DIV" == t.tagName
        }
    }), window.LinkOnlySelection = Selection.extend({
        getAllSelectable: function() {
            return this.root.getElementsByTagName("a")
        },
        isSelectable: function(t) {
            return t.parentNode == this.root && "A" == t.tagName
        }
    }), window.DWait && DWait.run("jms/lib/selection.js")
});
if (window.DWait) {
    DWait.count()
}

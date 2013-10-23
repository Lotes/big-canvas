/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.Dragger = Base.extend({
    constructor: function(t, o, e, n, s, u) {
        this.clickNodes = t, this.$offsetNode = $(o), this.offsetNode = this.$offsetNode[0], this.startDragFunc = e, this.moveDragFunc = n, this.endDragFunc = s, this.transformFunc = u, this.type = "unknown", this.$win = $(window);
        for (var r = 0; t.length > r; r++) {
            var i = t[r],
                c = this;
            mouseFunc = function(t) {
                if (t = t || window.event, t.which) {
                    if (1 != t.which) return !1
                } else if (t.button && t.button > 1) return !1;
                return document.onmousemove = c.moveDrag.bindTo(c), document.onmouseup = c.endDrag.bindTo(c), c.$win.mouseout(c.mouseOut.bindTo(c)), c.startDrag(t, this), !1
            }, touchFunc = function(o) {
                if (o.touches || (o.touches = o.originalEvent.touches), o = o || window.event, 1 == o.touches.length) {
                    for (var e = 0; t.length > e; e++) c.clickNodes[e].onmousedown = null;
                    return document.ontouchmove = c.moveDrag.bindTo(c), document.ontouchend = function() {
                        this.endDrag()
                    }.bindTo(c), c.startDrag(o, this), !0
                }
                return !0
            }, "object" == typeof i ? (i.onmousedown = mouseFunc, i.ontouchstart = touchFunc) : "string" == typeof i && ($(document).on("mousedown", i, mouseFunc), $(document).on("touchstart", i, touchFunc)), i && (i.ontouchstart = function(o) {
                if (o = o || window.event, 1 == o.touches.length) {
                    for (var e = 0; t.length > e; e++) this.clickNodes[e].onmousedown = null;
                    return document.ontouchmove = this.moveDrag.bindTo(this), document.ontouchend = function() {
                        this.endDrag()
                    }.bindTo(this), this.startDrag(o), !0
                }
                return !0
            }.bindTo(this))
        }
    },
    startDrag: function(t, o) {
        return this.obj = o, this.type = null, this.getOffset(t), t = t || window.event, coords = this.transformCoords(t), this.startDragFunc(coords, t, this.obj), this.moveDragFunc(coords, t, this.obj), t.preventDefault && t.preventDefault(), !1
    },
    moveDrag: function(t) {
        return t = t || window.event, coords = this.transformCoords(t), this.numTouches > 1 ? !0 : (this.moveDragFunc(coords, t, this.obj), t.preventDefault && t.preventDefault(), !1)
    },
    endDrag: function(t) {
        if (this.clearEvents(), t = t || window.event) {
            coords = this.transformCoords(t);
            try {
                coords[0] > 0 && coords[1] > 0 && this.moveDragFunc(coords, t, this.obj)
            } catch (t) {}
            t.preventDefault && t.preventDefault()
        } else coords = t = null;
        return this.endDragFunc(coords, t, this.obj), this.offset = null, !1
    },
    mouseOut: function(t) {
        return t = t || window.event, t.relatedTarget || t.fromElement || t.toElement ? !0 : (this.clearEvents(), coords = this.transformCoords(t), this.endDragFunc(coords, t), t.preventDefault && t.preventDefault(), !1)
    },
    clearEvents: function() {
        document.onmouseup = null, document.onmousemove = null, document.ontouchend = null, document.ontouchmove = null, this.$win.unbind("mouseout")
    },
    getOffset: function(t) {
        this.numTouches = 0;
        try {
            this.numTouches = t.touches.length
        } catch (o) {}
        this.numTouches > 0 ? (this.offset = cumulativeOffset(this.offsetNode), this.$offsetNode.data("offset", this.offset)) : (this.offset = this.$offsetNode.offset(), this.$offsetNode.data("offset", [this.offset.left, this.offset.top]))
    },
    transformCoords: function(t) {
        if (t = t || window.event, "regular" != this.type) {
            this.numTouches = 0;
            try {
                this.numTouches = t.touches.length
            } catch (o) {
                this.type = "regular"
            }
        } else this.numTouches = 0;
        if (this.numTouches > 0) this.type = "ipad", (!this.offset || 2 > this.offset.length || this.offset[0] != parseInt(this.offset[0])) && this.getOffset(t), coords = [parseInt(t.touches[0].pageX - this.offset[0]), parseInt(t.touches[0].pageY - this.offset[1])];
        else {
            this.offset || this.getOffset(t);
            var e = t.pageX || (document.body.scrollLeft || document.documentElement.scrollLeft) + t.clientX,
                n = t.pageY || (document.body.scrollTop || document.documentElement.scrollTop) + t.clientY;
            coords = [0 | e - this.offset.left, 0 | n - this.offset.top]
        }
        return this.transformFunc ? this.transformFunc(coords) : coords
    }
}), window.DWait && DWait.run("jms/lib/dragger.js");
if (window.DWait) {
    DWait.count()
}

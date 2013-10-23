/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.setPixel = function(t, i, a, n) {
    var s = a * t.width + i << 2,
        e = t.data;
    e[s + 0] = n[0], e[s + 1] = n[1], e[s + 2] = n[2], e[s + 3] = n[3]
}, 
window.getPixel = function(t, i, a) {
    i = parseInt(i), a = parseInt(a);
    var n = t.data,
        s = a * t.width + i << 2;
    return [n[s + 0], n[s + 1], n[s + 2], n[s + 3]]
},
window.colorDistance = function(t, i) {
    if (t[0] == i[0] && t[1] == i[1] && t[2] == i[2] && t[3] == i[3]) return 0;
    if (alphaThreshold = 25, alphaThreshold > t[3] || alphaThreshold > i[3]) return dist = Math.pow(Math.abs(t[3] - i[3]), .5);
    var a = Math.pow(t[0] - i[0], 2),
        n = Math.pow(t[1] - i[1], 2),
        s = Math.pow(t[2] - i[2], 2),
        e = Math.pow(t[3] - i[3], 2);
    return Math.pow(a + n + s + e, .25)
},
window.avgColors = function(t, i, a) {
    var n = (a * t[0] + i[0]) / (a + 1),
        s = (a * t[1] + i[1]) / (a + 1),
        e = (a * t[2] + i[2]) / (a + 1),
        o = (a * t[3] + i[3]) / (a + 1);
    return [n, s, e, o]
};
var IMAGETYPE_PNG = 3,
    RAD2DEG = 180 / Math.PI;
window.Canvas = Base.extend({
    constructor: function(t) {
        this.canvas = $(t), 
		this.context = null, 
		this.didInit = !1, 
		this.isExCanvas = !1, 
		this.path = []
    },
    init: function(t, i, a) {
        if (this.width = t, this.height = i, !this.didInit || a) {
            if (
				this.canvas.css("width", t + "px"), 
				this.canvas.css("height", i + "px"), 
				this.canvas.attr("width", t), 
				this.canvas.attr("height", i), 
				this.isExCanvas = !this.canvas.get(0).getContext, 
				this.isExCanvas) 
			try {
                G_vmlCanvasManager.initElement(this.canvas.get(0))
            } catch (n) {}
            this.canvasWidth = t, 
			this.canvasHeight = i, 
			this.context = this.canvas.get(0).getContext("2d"), 
			this.context.obj = this, 
			this.context.key = Math.random(), 
			this.context.clearRect(0, 0, t, i), 
			this.context.isExCanvas = this.isExCanvas, 
			this.didInit = !0, 
			this.context.clear = function() {
                this.context.isExCanvas ? $(this.canvas).find("[path]").remove() : this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            }.bindTo(this), 
			this.context.clearToColor = function(t) {
                $("#debugDiv").append("Clear To Color <br/>"), 
				this.context.isExCanvas && this.context.clear();
                var i = this.context.globalAlpha,
                    a = this.context.globalCompositeOperation;
                this.context.globalAlpha = 1, 
				this.context.globalCompositeOperation = "source-over", 
				this.context.fillStyle = t, 
				this.context.fillRect(0, 0, this.canvasWidth + 30, this.canvasHeight + 30), 
				this.context.globalAlpha = i, 
				this.context.globalCompositeOperation = a
            }.bindTo(this), this.context.getPixelData = function() {
                return this.context.getImageData ? this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight) : !1
            }.bindTo(this), this.context.setPixelData = function(t) {
                try {
                    var i = this.context.globalCompositeOperation;
                    this.context.globalCompositeOperation = "copy", 
					this.context.putImageData(t, 0, 0), 
					this.context.globalCompositeOperation = i
                } catch (a) {
                    breakpoint()
                }
            }.bindTo(this), this.context.toDataURL = function(t) {
                return this.canvas.get(0).toDataURL ? this.canvas.get(0).toDataURL(t) : !1
            }.bindTo(this), this.context.getPixel || (this.context.getPixel = this.context.isExCanvas ? function() {
                return !1
            } : window.getPixel), this.context.setPixel || (this.context.isExCanvas && (this.context.setPixel = function() {
                return !1
            }), this.context.setPixel = window.setPixel), 
			this.context.colorDistance = window.colorDistance, 
			this.context.avgColors = window.avgColors, 
			this.context.rescale = function(t, i) {
                $(this.canvas).width(t).height(i)
            }.bindTo(this)
        }
    }
}), window.DWait && DWait.run("jms/lib/canvas.js");
if (window.DWait) {
    DWait.count()
}

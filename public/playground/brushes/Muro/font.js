/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.FontManager = Base.extend({
    constructor: function() {
        this.loadedFonts = [], this.loadingFonts = [], this.KEY = "recentFonts", this.MAX_RECENTS = 5, this.DELIMETER = "|"
    },
    loadFont: function(t, n) {
        if (this.loadedFonts.indexOf(t) >= 0) return n(), void 0;
        for (var o = 0; this.loadingFonts.length > o; o++) if (this.loadingFonts[o].name == t) return this.loadingFonts[o].callbacks.push(n), void 0;
        var i = document.createElement("script");
        WebFontConfig = {
            google: {
                families: [t]
            },
            active: function() {
                this._markFontLoaded(t), $(i).remove()
            }.bindTo(this),
            fontinactive: function() {}
        }, i.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js", i.type = "text/javascript", i.async = "true";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(i, s), this.loadingFonts.push({
            name: t,
            callbacks: [n]
        })
    },
    isLoaded: function(t) {
        return this.loadedFonts.indexOf(t) >= 0
    },
    getRecentFonts: function() {
        return safeLocalGet(this.KEY, "Lato").split(this.DELIMETER, this.MAX_RECENTS)
    },
    addRecentFont: function(t) {
        var n, o = this.getRecentFonts();
        (n = o.indexOf(t)) >= 0 && o.splice(n, 1), o.unshift(t), o.length > this.MAX_RECENTS && o.splice(this.MAX_RECENTS, o.length - this.MAX_RECENTS), safeLocalSet(this.KEY, o.join(this.DELIMETER))
    },
    _markFontLoaded: function(t) {
        this.loadedFonts.push(t);
        for (var n = 0; this.loadingFonts.length > n; n++) if (this.loadingFonts[n].name == t) {
            for (var o = 0; this.loadingFonts[n].callbacks.length > o; o++) this.loadingFonts[n].callbacks[o]();
            return this.loadingFonts.splice(n, 1), void 0
        }
    }
}), window.DWait && DWait.run("jms/lib/fontManager.js");
if (window.DWait) {
    DWait.count()
}

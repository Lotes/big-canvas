/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.Bean = function() {}, jQuery.extend(window.Bean, {
    types: {
        UNKNOWN: 0,
        STRING: 1,
        INTEGER: 2,
        FLOAT: 3,
        POSITIVE_INTEGER: 4,
        POSITIVE_FLOAT: 5,
        OBJECT: 6,
        BOOLEAN: 7,
        ZERO_ONE_FLOAT: 8
    },
    sanitizeType: function(t, e) {
        switch (t) {
            case Bean.types.POSITIVE_INTEGER:
                return Math.abs(parseInt(e, 10));
            case Bean.types.INTEGER:
                return parseInt(e, 10);
            case Bean.types.POSITIVE_FLOAT:
                return Math.abs(parseFloat(e, 10));
            case Bean.types.ZERO_ONE_FLOAT:
                return Math.max(0, Math.min(1, parseFloat(e, 10)));
            case Bean.types.FLOAT:
                return parseFloat(e, 10);
            case Bean.types.BOOLEAN:
                return !!e;
            case Bean.types.STRING:
            case Bean.types.OBJECT:
            case Bean.types.UNKNOWN:
            default:
                return e
        }
    },
    createBean: function(t) {
        t.prototype.getModified = function() {
            return this.isModified
        }, 
		t.prototype.setModified = function(t) {
            this.isModified = t
        }, 
		jQuery.each(t.attributes, function(e, i) {
            if (!(1 > e.length)) {
                var s = e.charAt(0).toUpperCase() + e.substr(1),
                    n = i.type;
                n || (n = Bean.types.UNKNOWN), t.prototype["get" + s] = function() {
                    return null == this[e] && i.nullStub ? i.nullStub : Bean.sanitizeType(n, this[e])
                }, t.prototype["set" + s] = function(t, s) {
                    if (!this.frozenList[e]) {
                        var a = Bean.sanitizeType(n, t);
                        if (s || n == Bean.types.OBJECT || Bean.sanitizeType(n, this[e]) != a) {
                            var r = i.addBeforeSetter;
                            if (r) {
                                var o = r.bindTo(this);
                                if (!o(a)) return
                            }
                            this.isEventsOff || (i.setsModified && this.setModified(!0), this.eventList[e][0] = !0), this[e] = a
                        }
                        var h = i.addToSetter;
                        if (h) {
                            var f = h.bindTo(this);
                            f(a)
                        }
                        this.isEventsOff || this.fireEvents()
                    }
                }
            }
        }), 
		t.prototype._initialize = function() {
            this.eventList = Array(), this.frozenList = Array(), jQuery.each(t.attributes, function(t, e) {
                if (this.frozenList[t] = !1, this.eventList[t] = [!1, []], e.initialValue || 0 == e.initialValue) this[t] = e.initialValue;
                else switch (e.type) {
                    case Bean.types.POSITIVE_INTEGER:
                    case Bean.types.INTEGER:
                    case Bean.types.POSITIVE_FLOAT:
                    case Bean.types.FLOAT:
                        this[t] = 0;
                        break;
                    case Bean.types.BOOLEAN:
                        this[t] = !1;
                        break;
                    case Bean.types.STRING:
                        this[t] = "";
                        break;
                    case Bean.types.OBJECT:
                    case Bean.types.UNKNOWN:
                    default:
                        this[t] = null
                }
            }.bindTo(this)), this.setModified(!0), this.isAtomic = 0, this.isEventsOff = !1
        }, 
		t.prototype.fireEvents = function() {
            if (!this.isAtomic) for (key in this.eventList) if (this.eventList[key][0]) {
                this.eventList[key][0] = !1;
                for (var t = this.eventList[key][1], e = 0; t.length > e; e++) {
                    var i = t[e];
                    try {
                        i()
                    } catch (s) {
                        stdLog("Error in function subscribed to " + key + ": ", s)
                    }
                }
            }
        }, 
		t.prototype.subscribe = function(t, e) {
            -1 == ("" + t.constructor).indexOf("Array") && (t = [t]);
            for (var i, s = 0; t.length > s; s++) {
                i = t[s];
                try {
                    this.eventList[i][1].push(e)
                } catch (n) {
                    this.eventList[i] && (stdLog("Attribute: ", i), stdLog("EventList: ", this.eventList), this.eventList[i][1] = [], this.eventList[i][1].push(e))
                }
            }
        }, t.prototype.unsubscribe = function(t, e) {
            this.eventList[t][1] = jQuery.grep(this.eventList[t][1], function(t) {
                return t == e
            }, !0)
        }, t.prototype.freeze = function(t) {
            this.frozenList[t] = !0
        }, t.prototype.thaw = function(t) {
            this.frozenList[t] = !1
        }, t.prototype.startAtomic = function() {
            this.isAtomic++
        }, t.prototype.endAtomic = function() {
            this.isAtomic--, this.isAtomic = Math.max(0, this.isAtomic), this.isAtomic || this.fireEvents()
        }, t.prototype.turnEventsOff = function() {
            this.isEventsOff = !0
        }, t.prototype.turnEventsOn = function() {
            this.isEventsOff = !1
        }
    }
}), window.DWait && DWait.run("jms/lib/Bean.js");
if (window.DWait) {
    DWait.count()
}

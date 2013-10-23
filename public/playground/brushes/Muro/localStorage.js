/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.safeLocalGet = function(t, o, e) {
    var r = o;
    try {
        if (r = localStorage.getItem(t), "string" != typeof r) return r = o;
        e && "function" == typeof e && (func = e, r = func(r))
    } catch (a) {
        return r = o
    }
    return r
}, window.safeLocalSet = function(t, o) {
    try {
        localStorage.removeItem(t), localStorage.setItem(t, o)
    } catch (e) {
        console.log("Error setting local storage", e)
    }
}, window.DWait && DWait.run("jms/lib/localStorage.js");
(function(window) {
    var ua = navigator.userAgent.toLowerCase(),
        match = /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [],
        browser = {};
    browser[match[1] || ""] = !0, browser.version = match[2] || "0";
    var BaseStorageDriver = Base.extend({
        constructor: function() {
            this._data = {}, this.log("BaseStorageDriver instantiated"), this.log("Lame. Your browser does not support cross-session storage (appart from cookies)")
        },
        clear: function() {
            this._data = {}
        },
        getItem: function(t, e) {
            return t in this._data ? this._data[t] : e
        },
        setItem: function(t, e) {
            this._data[t] = e
        },
        removeItem: function(t) {
            this._data[t] = null, delete this._data[t]
        },
        log: function(t) {
            vms_feature("dre") && console.log("[DStorage]" + t)
        }
    }),
        LocalStorageDriver = BaseStorageDriver.extend({
            constructor: function() {
                this._data = window.localStorage
            },
            clear: function() {
                this._data.clear()
            },
            getItem: function(t, e) {
                if (!(t in this._data)) return e;
                if (browser.opera) {
                    var a = !1;
                    for (var r in this._data) if (t == r) {
                        a = !0;
                        break
                    }
                    if (!a) return e
                }
                var i;
                try {
                    i = this._data.getItem(t)
                } catch (o) {
                    this.log(o.message), i = e
                }
                return i
            },
            setItem: function(t, e) {
                try {
                    this._data.setItem(t, e)
                } catch (a) {
                    this.log(a.message)
                }
            },
            removeItem: function(t) {
                this._data[t] = null, delete this._data[t]
            }
        }),
        GlobalStorageDriver = LocalStorageDriver.extend({
            constructor: function() {
                this._data = window.globalStorage[window.location.hostname], this.log("GlobalStorageDriver instantiated")
            },
            clear: function() {
                for (var t in this._data) this.removeItem(t)
            },
            getItem: function(t, e) {
                if (!(t in this._data)) return e;
                var a;
                try {
                    a = this._data[t].value
                } catch (r) {
                    this.log(r.message), a = e
                }
                return a
            },
            setItem: function(t, e) {
                this._data[t] = e
            },
            removeItem: function(t) {
                this._data.removeItem(t), delete this._data[t]
            }
        }),
        UserDataPersistenceStorageDriver = BaseStorageDriver.extend({
            constructor: function() {
                this.clear(), this.initialized = !1, DWait.ready([".domready", "jms/lib/json2.js"], function() {
                    this.initDOM()
                }.bindTo(this)), this.log("UserDataPersistenceStorageDriver instantiated")
            },
            initDOM: function() {
                var t = document;
                this._storage = t.createElement("span"), this._storage.addBehavior("#default#userData"), this._storage.load("dAstorage");
                try {
                    this._data = JSON.parse(this._storage.getAttribute("data") || "{}")
                } catch (e) {
                    this.log(e.message), this._data = {}
                }
                this.initialized = !0
            },
            save: function() {
                if (!initialized) return this.log("Cannot save storage data. UserData behaviour not yet initialized."), void 0;
                var t = JSON.stringify(this._data);
                try {
                    this._storage.setAttribute("data", t), this._storage.save("dAstorage")
                } catch (e) {
                    throw Error("Could not save storage data.")
                }
            },
            clear: function() {
                this.base(), this.save()
            },
            setItem: function() {
                this.base(), this.save()
            },
            removeItem: function() {
                this.base(), this.save()
            }
        }),
        DStorage = Base.extend({
            constructor: function(driver) {
                if (driver && eval(driver)) {
                    var driver_class = eval(driver);
                    this._storage_driver = new driver_class
                } else this._storage_driver = DStorage.getStorageDriver()
            },
            clear: function() {
                this._storage_driver.clear()
            },
            getItem: function(t, e) {
                return this._storage_driver.getItem(t, e)
            },
            setItem: function(t, e) {
                this._storage_driver.setItem(t, e)
            },
            removeItem: function(t) {
                this._storage_driver.removeItem(t)
            }
        }, {
            getStorageDriver: function() {
                var t = parseInt(browser.version.slice(0, 2)),
                    e = browser.msie && t >= 6 && 8 > t;
                return window.localStorage ? new LocalStorageDriver : window.globalStorage ? new GlobalStorageDriver : e ? new UserDataPersistenceStorageDriver : new BaseStorageDriver
            }
        });
    window.DStorage || (window.DStorage = new DStorage)
})(window), window.DWait && DWait.run("jms/lib/storage.js");
if (window.DWait) {
    DWait.count()
}

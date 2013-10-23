/* Sketchpad.io */


function linkify(e) {
    if ("WebkitPerspective" in document.body.style || "MozPerspective" in document.body.style || "msPerspective" in document.body.style || "OPerspective" in document.body.style || "perspective" in document.body.style) for (var e = document.querySelectorAll(e), t = 0, n = e.length; t < n; t++) {
        var r = e[t];
        (!r.className || !r.className.match(/roll/g)) && r.textContent === r.innerHTML && (r.className += " roll", r.innerHTML = '<span data-title="' + r.innerHTML + '">' + r.innerHTML + "</span>")
    }
}
typeof Color == "undefined" && (Color = {}), typeof Color.Blend == "undefined" && (Color.Blend = {}),
function(e) {
    return e.modes = {
        COMPOSITE: ["SourceIn", "SourceOver", "DestinationOut"],
        OPACITY: ["Normal", "Dissolve", "Average"],
        DARKEN: "Darker,Darken,Multiply,Color Burn,Color Burn Inverse,Soft Burn,Linear Burn,Darker Color".split(","),
        LIGHTEN: "Lighter,Lighten,Screen,Color Dodge,Color Dodge Inverse,Soft Dodge,Linear Dodge,Lighter Color".split(","),
        LIGHTING: "Overlay,Soft Light,Fuzzy Light,Hard Light,Vivid Light,Linear Light,Pin Light,Hard Mix,Grain Extract,Grain Merge".split(","),
        INVERT: ["Difference", "Exclusion", "Negation", "Invert"],
        COLOR: "Hue,Saturation,Color,Luminosity,Red,Green,Blue,Tint".split(","),
        THERMAL: ["Reflect", "Glow", "Heat", "Freeze"],
        MATH: "Additive,Subtractive,Subtract,Stamp,Interpolation,Divide".split(","),
        LOGIC: ["XOR", "AND", "OR"]
    }, e.isAlphaRequired = function(e) {
        for (var t = 0, n = {}; t < e.length; t++) n[e[t].replace(" ", "")] = !0;
        return n
    }("Darker,Lighter,SourceIn,SourceOver,DestinationOut,Luminosity,Tint,DarkerColor,LighterColor,Hue,Saturation,Color,Red,Green,Blue,Cyan,Magenta,Yellow,Dissolve".split(",")), e.apply = function(t, n, r) {
        var i = e[r],
            t = t.data,
            s = n.data,
            o = t.length;
        return e.isAlphaRequired[r] ? e.apply32bit(i, t, s, o) : e.apply24bit(i, t, s, o), n
    }, e.apply24bit = function(e, t, n, r) {
        for (var i = 0; i < r; i += 4) t[i + 3] > 0 ? (n[i] = e(t[i], n[i]), n[i + 1] = e(t[i + 1], n[i + 1]), n[i + 2] = e(t[i + 2], n[i + 2])) : (n[i] = n[i], n[i + 1] = n[i + 1], n[i + 2] = n[i + 2]), n[i + 3] = n[i + 3]
    }, e.apply32bit = function(e, t, n, r) {
        for (var i = 0; i < r; i += 4) if (t[i + 3] > 0) {
            var s = e({
                R: t[i + 0],
                G: t[i + 1],
                B: t[i + 2],
                A: t[i + 3]
            }, {
                R: n[i + 0],
                G: n[i + 1],
                B: n[i + 2],
                A: n[i + 3]
            });
            n[i] = s >>> 16 & 255, n[i + 1] = s >>> 8 & 255, n[i + 2] = s & 255, preserveAlpha || (n[i + 3] = s >>> 24)
        } else n[i] = n[i], n[i + 1] = n[i + 1], n[i + 2] = n[i + 2], n[i + 3] = n[i + 3]
    }, e.SourceIn = function(e, t) {
        return _a = e.A * t.A, _r = e.R * t.A, _g = e.G * t.A, _b = e.B * t.A, (_a << 24 | _r << 16 | _g << 8 | _b) >>> 0
    }, e.DestinationOut = function(e, t) {
        return (t.A * (1 - e.A) << 24 | t.R * (1 - e.A) << 16 | t.G * (1 - e.A) << 8 | t.B * (1 - e.A)) >>> 0
    }, e.SourceOver = function(e, t) {
        return (e.A + t.A * (1 - e.A / 255) << 24 | e.R + t.R * (1 - e.A / 255) << 16 | e.G + t.G * (1 - e.A / 255) << 8 | e.B + t.B * (1 - e.A / 255)) >>> 0
    }, e.Dissolve = function(e, t) {
        return RAND.toDouble() * 255 > t.A ? (t.A << 24 | e.R << 16 | e.G << 8 | e.B) >>> 0 : (t.A << 24 | t.R << 16 | t.G << 8 | t.B) >>> 0
    }, e.Average = function(e, t) {
        return e + t >> 1
    }, e.Darken = function(e, t) {
        return e < t ? e : t
    }, e.Multiply = function(e, t) {
        return e * t / 255
    }, e.ColorBurn = function(e, t) {
        if (t == 0) return 0;
        var n = 255 - (255 - e << 8) / t;
        return n < 0 ? 0 : n
    }, e.ColorBurnInverse = function(e, t) {
        if (e == 0) return 0;
        var n = 255 - (255 - t << 8) / e;
        return n < 0 ? 0 : n
    }, e.SoftBurn = function(e, t) {
        if (e + t < 256) {
            if (e == 255) return 255;
            var n = (t << 7) / (e ^ 255);
            return n > 255 ? 255 : n
        }
        return n = ((e ^ 255) << 7) / t ^ 255, n < 0 ? 0 : n
    }, e.LinearBurn = function(e, t) {
        var n = e + t - 255;
        return n < 0 ? 0 : n
    }, e.DarkerColor = function(e, t) {
        var n = (e.R << 16 | e.G << 8 | e.B) > (t.R << 16 | t.G << 8 | t.B) ? b : a;
        return (Math.min(e.A + t.A, 255) << 24 | n.R << 16 | n.G << 8 | n.B) >>> 0
    }, e.Lighter = function(e, t) {
        var n = e.A / 255,
            r = e.G,
            i = e.B,
            s = t.A / 255,
            o = t.R,
            u = t.G,
            a = t.B,
            f = s * 255,
            o = Math.max(o, e.R * n + o * s),
            r = Math.max(u, r * n + u * s),
            n = Math.max(a, i * n + a * s);
        return o > 255 && (o = 255), r > 255 && (r = 255), n > 255 && (n = 255), (f << 24 | o << 16 | r << 8 | n) >>> 0
    }, e.Darker = function(e, t) {
        var n = e.A / 255,
            r = e.R / 255,
            i = e.G / 255,
            s = e.B / 255,
            o = t.A / 255,
            u = t.R / 255,
            a = t.G / 255,
            f = t.B / 255,
            l = n + o - n * o,
            r = Math.min(255, (r * (1 - o) + u * (1 - n) + Math.min(r, u)) * 255),
            i = Math.min(255, (i * (1 - o) + a * (1 - n) + Math.min(i, a)) * 255),
            n = Math.min(255, (s * (1 - o) + f * (1 - n) + Math.min(s, f)) * 255);
        return (l << 24 | r << 16 | i << 8 | n) >>> 0
    }, e.Lighten = function(e, t) {
        return e > t ? e : t
    }, e.Screen = function(e, t) {
        return 255 - ((255 - e) * (255 - t) >> 8)
    }, e.ColorDodge = function(e, t) {
        if (t == 255) return 255;
        var n = (e << 8) / (255 - t);
        return n > 255 ? 255 : n
    }, e.ColorDodgeInverse = function(e, t) {
        if (e == 255) return 255;
        var n = (t << 8) / (255 - e);
        return n > 255 ? 255 : n >> 0
    }, e.SoftDodge = function(e, t) {
        if (e + t < 256) {
            if (t == 255) return 255;
            var n = (e << 7) / (t ^ 255);
            return n > 255 ? 255 : n
        }
        return n = ((t ^ 255) << 7) / e ^ 255, n < 0 ? 0 : n
    }, e.LinearDodge = function(e, t) {
        var n = e + t;
        return n > 255 ? 255 : n
    }, e.LighterColor = function(e, t) {
        var n = (e.R << 16 | e.G << 8 | e.B) < (t.R << 16 | t.G << 8 | t.B) ? b : a;
        return (Math.min(e.A + t.A, 255) << 24 | n.R << 16 | n.G << 8 | n.B) >>> 0
    }, e.Overlay = function(e, t) {
        return e < 128 ? e * t >> 7 : 255 - ((255 - e) * (255 - t) >> 7)
    }, e.SoftLight = function(e, t) {
        return Math.pow(e / 255, 1 / (t / 170 + .5)) * 255
    }, e.FuzzyLight = function(e, t) {
        var n = e * t / 255;
        return n + e * (255 - (e ^ 255) * (t ^ 255) / 255 - n) / 255
    }, e.HardLight = function(e, t) {
        return t < 128 ? t * e >> 7 : 255 - ((255 - t) * (255 - e) >> 7)
    }, e.VividLight = function(e, t) {
        return t < 128 ? 255 - Math.min(255, (255 - e) * 255 / (2 * t)) : Math.min(255, e * 255 / (2 * (255 - t)))
    }, e.LinearLight = function(e, t) {
        return Math.min(255, Math.max(0, e + 2 * t - 255))
    }, e.PinLight = function(e, t) {
        return t > 128 ? Math.max(e, 2 * (t - 128)) : Math.min(e, 2 * t)
    }, e.HardMix = function(e, t) {
        return e < 255 - t ? 0 : 255
    }, e.GrainExtract = function(e, t) {
        return Math.min(255, Math.max(0, e - t + 128))
    }, e.GrainMerge = function(e, t) {
        return Math.min(255, Math.max(0, e + t - 128))
    }, e.Difference = function(e, t) {
        var n = e - t;
        return n < 0 ? -n : n
    }, e.Exclusion = function(e, t) {
        return e + t - (e * t >> 7)
    }, e.Negation = function(e, t) {
        var n = 255 - e - t;
        return (n < 0 ? -n : n) ^ 255
    }, e.Invert = function(e) {
        return e ^ 255
    }, e.Tint = function(e, t) {
        var n = t.R * .3 + t.G * .59 + t.B * .11;
        return (Math.min(e.A + t.A, 255) << 24 | Math.min(255, (e.R + n) * .5 + t.R * .5) << 16 | Math.min(255, (e.G + n) * .5 + t.G * .5) << 8 | Math.min(255, (e.B + n) * .5 + t.B * .5)) >>> 0
    }, e.Red = function(e, t) {
        return (Math.min(e.A + t.A, 255) << 24 | t.R << 16 | e.G << 8 | e.B) >>> 0
    }, e.Green = function(e, t) {
        return (Math.min(e.A + t.A, 255) << 24 | e.R << 16 | t.G << 8 | e.B) >>> 0
    }, e.Blue = function(e, t) {
        return (Math.min(e.A + t.A, 255) << 24 | e.R << 16 | e.G << 8 | t.B) >>> 0
    },
    function() {
        var t = {
            0: "R",
            1: "G",
            2: "B"
        }, n = function(e, n, r, i) {
            var s = 0,
                o = 1,
                u = 2;
            return e > n && (e ^= n, n ^= e, e ^= n, s ^= o, o ^= s, s ^= o), e > r && (e ^= r, r ^= e, e ^= r, s ^= u, u ^= s, s ^= u), n > r && (n ^= r, r ^= n, n ^= r, o ^= u, u ^= o, o ^= u), r > e ? (n = (n - e) * i / (r - e), r = i) : n = r = 0, e = {}, e[t[s]] = 0, e[t[o]] = n, e[t[u]] = r, e
        }, r = function(e, t, n) {
            return .3 * e + .59 * t + .11 * n
        }, i = function(e, t, n, i) {
            typeof e == "object" && (i = t, n = e.B, t = e.G, e = e.R), i -= r(e, t, n), e += i, t += i, n += i;
            var i = r(e, t, n),
                s = Math.min(e, t, n),
                o = Math.max(e, t, n);
            return s < 0 && (e = i + (e - i) * i / (i - s), t = i + (t - i) * i / (i - s), n = i + (n - i) * i / (i - s)), o > 255 && (e = i + (e - i) * (255 - i) / (o - i), t = i + (t - i) * (255 - i) / (o - i), n = i + (n - i) * (255 - i) / (o - i)), e << 16 | t << 8 | n
        };
        e.Hue = function(e, t) {
            var s = Math.max(e.R, e.G, e.B) - Math.min(e.R, e.G, e.B),
                o = Math.min(e.A + t.A, 255),
                s = i(n(t.R, t.G, t.B, s), r(e.R, e.G, e.B));
            return (o << 24 | s) >>> 0
        }, e.Saturation = function(e, t) {
            var s = Math.max(t.R, t.G, t.B) - Math.min(t.R, t.G, t.B),
                o = Math.min(e.A + t.A, 255),
                s = i(n(e.R, e.G, e.B, s), r(e.R, e.G, e.B));
            return (o << 24 | s) >>> 0
        }, e.Color = function(e, t) {
            var n = Math.min(e.A + t.A, 255),
                s = i(t.R, t.G, t.B, r(e.R, e.G, e.B));
            return (n << 24 | s) >>> 0
        }, e.Luminosity = function(e, t) {
            var n = Math.min(e.A + t.A, 255),
                s = i(e.R, e.G, e.B, r(t.R, t.G, t.B));
            return (n << 24 | s) >>> 0
        }
    }(), e.Reflect = function(e, t) {
        if (t == 255) return 255;
        var n = e * e / (255 - t);
        return n > 255 ? 255 : n
    }, e.Glow = function(e, t) {
        if (e == 255) return 255;
        var n = t * t / (255 - e);
        return n > 255 ? 255 : n
    }, e.Freeze = function(e, t) {
        if (t == 0) return 0;
        var n = 255 - Math.pow(e ^ 255, 2) / t;
        return n < 0 ? 0 : n
    }, e.Heat = function(e, t) {
        if (e == 0) return 0;
        var n = 255 - Math.pow(t ^ 255, 2) / e;
        return n < 0 ? 0 : n
    }, e.Additive = function(e, t) {
        var n = e + t;
        return n > 255 ? 255 : n
    }, e.Subtractive = function(e, t) {
        var n = e + t - 256;
        return n < 0 ? 0 : n
    }, e.Subtract = function(e, t) {
        var n = e - t;
        return n < 0 ? 0 : n
    }, e.Stamp = function(e, t) {
        var n = e + 2 * t - 256;
        return n < 0 ? 0 : n > 255 ? 255 : n
    },
    function() {
        for (var t = [], n = Math.PI / 255, r = 0; r < 256; r++) t[r] = Math.round(64 - Math.cos(r * n) * 64);
        e.Interpolation = function(e, n) {
            var r = t[n] + t[e];
            return r > 255 ? 255 : r
        }
    }(), e.Divide = function(e, t) {
        return Math.min(255, e * 256 / (t + 1))
    }, e.XOR = function(e, t) {
        return e ^ t
    }, e.AND = function(e, t) {
        return e & t
    }, e.OR = function(e, t) {
        return e | t
    }, e.createKernals = function() {
        var t = {}, n;
        for (n in e.modes) for (var r in e.modes[n]) t[e.modes[n][r]] = !0;
        r = [];
        for (n in t) {
            var i = String(e[n.replaceAll(" ", "")]),
                s = i.indexOf("function (A, B)") == -1,
                i = i.substr(i.indexOf("{") + 1),
                i = i.substr(0, i.lastIndexOf("}")),
                i = i.replace("//+", "");
            if (s) i = i.replaceAll("src.A", "sA"), i = i.replaceAll("src.R", "sR"), i = i.replaceAll("src.G", "sG"), i = i.replaceAll("src.B", "sB"), i = i.replaceAll("dst.A", "dA"), i = i.replaceAll("dst.R", "dR"), i = i.replaceAll("dst.G", "dG"), i = i.replaceAll("dst.B", "dB"), i = i.replaceAll("return ", "var hex = "), r.push("Color.Blend['_" + n.replaceAll(" ", "") + "'] = function(src, dst, preserveAlpha) {	var data1 = src.data, data2 = dst.data;	var length = data1.length;	for (var n = 0; n < length; n += 4) {		var sR = data1[n], sG = data1[n+1], sB = data1[n+2], sA = data1[n+3];		var dR = data2[n], dG = data2[n+1], dB = data2[n+2], dA = data2[n+3];" + i + "		if (sA > 0) {			data2[n] = hex >>> 16 & 0xFF;			data2[n + 1] = hex >>> 8 & 0xFF;			data2[n + 2] = hex & 0xFF;			if (!preserveAlpha) data2[n + 3] = hex >>> 24;		} else {			data2[n] = dR;			data2[n + 1] = dG;			data2[n + 2] = dB;			data2[n + 3] = dA;		}	}return dst;};");
            else {
                var s = i.replaceAll("B", "dR"),
                    s = s.replaceAll("A", "sR"),
                    s = s.replaceAll("return ", "data2[n] = "),
                    o = i.replaceAll("B", "dG"),
                    o = o.replaceAll("A", "sG"),
                    o = o.replaceAll("return ", "data2[n + 1] = "),
                    i = i.replaceAll("B", "dB"),
                    i = i.replaceAll("A", "sB"),
                    i = i.replaceAll("return ", "data2[n + 2] = ");
                r.push("Color.Blend['_" + n.replaceAll(" ", "") + "'] = function(src, dst) {	var data1 = src.data, data2 = dst.data;	var length = data1.length;	for (var n = 0; n < length; n += 4) {		var sR = data1[n], sG = data1[n+1], sB = data1[n+2], sA = data1[n+3];		var dR = data2[n], dG = data2[n+1], dB = data2[n+2], dA = data2[n+3];		if (sA > 0) {" + s + o + i + "			data2[n + 3] = sA;		} else {			data2[n] = dR;			data2[n + 1] = dG;			data2[n + 2] = dB;			data2[n + 3] = dA;		}	}return dst;};")
            }
        }
        console.log(r.join("\r"))
    }, e
}(Color.Blend);
var Gradient = function(e) {
    return e.getNoise = function(e) {
        for (var t = new Random, n = e.dna, r = e.resolution, i = e.length, s = Color.Blend.isAlphaRequired[e.blend], o = Color.Blend[e.blend], u = e.H, a = e.S, e = e.L, f = [], l = 0; l < n.length; l += 2) f.push({
            hex: n[l + 1],
            stop: n[l]
        });
        for (var n = 0, l = Color.Space.HEX32_RGBA(f[n].hex), c = f[n].stop, h = Color.Space.HEX32_RGBA(f[n + 1].hex), p = f[n + 1].stop, d = [], v = 0; v <= i; v += r) {
            var m = v / i;
            m > p && (n++, f[n] && (l = h, c = p, f[n + 1])) && (h = Color.Space.HEX32_RGBA(f[n + 1].hex), p = f[n + 1].stop), m = (m - c) / (p - c), m === Infinity && (m = 0);
            if (o === "Normal" && H === 0 && S === 0 && L === 0) m = Color.Space.RGB_W3({
                R: l.R * (1 - m) + h.R * m,
                G: l.G * (1 - m) + h.G * m,
                B: l.B * (1 - m) + h.B * m
            });
            else {
                var g = Color.Space.RGB_HSL({
                    R: l.R * (1 - m) + h.R * m,
                    G: l.G * (1 - m) + h.G * m,
                    B: l.B * (1 - m) + h.B * m
                }),
                    m = Color.Space.HSLA_RGBA({
                        H: (g.H + t.toDouble() * u + 360) % 360,
                        S: Math.min(100, Math.max(0, g.S - t.toDouble() * a)),
                        L: Math.min(100, Math.max(0, g.L - t.toDouble() * e)),
                        A: 255
                    }),
                    g = Color.Space.HSLA_RGBA({
                        H: (g.H + t.toDouble() * u + 360) % 360,
                        S: Math.min(100, Math.max(0, g.S + t.toDouble() * a)),
                        L: Math.min(100, Math.max(0, g.L + t.toDouble() * e)),
                        A: 255
                    });
                s ? (m = o(m, g), m = Color.Space(m, "HEX32>RGBA>W3")) : m = Color.Space.RGBA_W3({
                    R: o(m.R, g.R),
                    G: o(m.G, g.G),
                    B: o(m.B, g.B),
                    A: o(m.A, g.A)
                })
            }
            d.push(v / i), d.push(m)
        }
        return d
    }, e
}({});
if (typeof Color == "undefined") var Color = {};
(function() {
    Color.Picker = function(s) {
        window.zIndexGlobal || (window.zIndexGlobal = 100);
        var o = this,
            u = s.modules;
        typeof u == "undefined" && (u = {
            hue: !0,
            satval: !0,
            alpha: !0
        }), typeof s == "undefined" && (s = {}), this.state = "colorPicker", this.callback = s.callback, this.color = e(s.color), this.eyedropLayer = s.eyedropLayer, this.eyedropMouseLayer = s.eyedropMouseLayer || s.eyedropLayer, this.container = s.container || document.body, this.margin = s.margin || 12, this.offset = this.margin / 2, this.conf = {}, u.hue && (this.conf.hue = {
            column: 0,
            enable: !0,
            width: u.hue.width || 30,
            height: u.hue.height || 200
        }), u.satval && (this.conf.satval = {
            column: 1,
            enable: !0,
            width: u.satval.width || 200,
            height: u.satval.height || 200
        }), u.alpha && (this.conf.alpha = {
            column: 2,
            enable: !0,
            width: u.alpha.width || 30,
            height: u.alpha.height || 200
        }), this.onMouseDown = s.onMouseDown, this.onMouseUp = s.onMouseUp;
        var a = document.createElement("div");
        a.id = "ColorPicker";
        var f = 0,
            l = 0,
            h = -1,
            p;
        for (p in this.conf) if (f += this.conf[p].width + this.margin + this.offset - 7, h !== this.conf[p].row) l += this.conf[p].height + this.margin * 2, h = this.conf[p].row;
        a.style.cssText = s.style, a.style.height = l + "px", a.style.width = f + "px", this.container.appendChild(a), this.element = a;
        var v = document.createElement("div");
        v.style.backgroundImage = "url(" + r.data + ")", v.className = "hexBox", v.title = "Eyedropper";
        if (o.eyedropMouseLayer) {
            var m, g = function(e) {
                e = Event.proxy.getCoord(e), e = o.eyedropLayer.getContext("2d").getImageData(e.x, e.y, 1, 1), e = Color.Space(e.data, "RGBA>HSVA"), u.alpha || (e.A = 255), o.update(e, "HSVA")
            }, y = function() {
                o.callback(Color.Space(o.color, "HSVA>RGBA"), "up"), v.className = "hexBox", o.eyedropMouseLayer.style.cursor = "default", o.eyedropMouseLayer.title = m, Event.remove(o.eyedropMouseLayer, "mouseup", y), Event.remove(o.eyedropMouseLayer, "mousemove", g), setTimeout(function() {
                    o.state = "colorPicker"
                }, 50)
            };
            Event.add(o.eyedropMouseLayer, "mousedown", function() {
                E.blur()
            }), Event.add(v, "mousedown", Event.cancel), Event.add(v, "click", function() {
                if (o.state === "eyeDropper") return y();
                o.state = "eyeDropper", m = o.eyedropMouseLayer.title, v.className = "hexBox active", o.eyedropMouseLayer.style.cursor = "crosshair", o.eyedropMouseLayer.title = "Pick color", Event.add(o.eyedropMouseLayer, "mouseup", y), Event.add(o.eyedropMouseLayer, "mousemove", g)
            })
        }
        var b = document.createElement("div");
        v.appendChild(b), a.appendChild(v);
        var w = /[^a-f0-9]/gi,
            E = document.createElement("input");
        E.title = "HEX Code", E.className = "hexInput", E.size = 6, E.type = "text", Event.add(E, "mousedown", Event.stop), Event.add(E, "keydown change", function(e) {
            Event.stop(e);
            var t = e.keyCode,
                n = E.value.replace(w, "").substr(0, 6),
                n = parseInt("0x" + n);
            if (e.type === "keydown") if (t === 40) n = Math.max(0, n - (e.shiftKey ? 10 : 1)), E.value = Color.Space(n, "HEX24>W3").toUpperCase().substr(1);
            else {
                if (t !== 38) return;
                n = Math.min(16777215, n + (e.shiftKey ? 10 : 1)), E.value = Color.Space(n, "HEX24>W3").toUpperCase().substr(1)
            }
            String(n) !== "NaN" && (n > 16777215 && (n = 16777215), n < 0 && (n = 0), o.update(Color.Space(n, "HEX24>RGB"), "RGB"), e.keyCode === 27 && this.blur())
        }), a.appendChild(E), f = document.createElement("div"), f.title = "Close", f.className = "hexClose", f.innerHTML = "x", Event.add(f, "mousedown", Event.cancel), Event.add(f, "click", function() {
            o.toggle(!1)
        }), a.appendChild(f), a.appendChild(document.createElement("br"));
        var S = document.createElement("canvas"),
            x = S.getContext("2d"),
            l = f = 0;
        for (p in this.conf) l = Math.max(this.conf[p].height + this.margin, l), f += this.conf[p].width + this.margin;
        S.width = f, S.height = l, S.style.cssText = "position: absolute; top: 32px; left: " + this.offset + "px;", a.appendChild(S), Event.add(a, "mousedown mousemove mouseup", function(e) {
            var t = e.type === "mousedown" || e.type === "touchstart",
                n = e.type === "mouseup" || e.type === "touchend";
            t && (o.onMouseDown && o.onMouseDown(e), Event.stop(e), E.blur()), n && o.onMouseDown && o.onMouseUp(e);
            var r = o.margin / 2,
                i = n = 0;
            if (window !== S) for (var u = S; u !== null;) n += u.offsetLeft, i += u.offsetTop, u = u.offsetParent;
            n = (e.touches ? e.touches[0].pageX : e.pageX) - n - r, r = (e.touches ? e.touches[0].pageY : e.pageY) - i - r, i = n < 0 ? 0 : n > S.width ? S.width : n, u = r < 0 ? 0 : r > o.conf.satval.height ? o.conf.satval.height : r;
            if (e.target.className !== "hexInput") {
                if (i !== n || u !== r) a.style.cursor = "move", a.title = "Move", t && Event.proxy.drag({
                    position: "move",
                    event: e,
                    target: a,
                    listener: function(e, t) {
                        var n = window.innerWidth,
                            r = window.innerHeight,
                            i = t.target.offsetWidth,
                            o = t.target.offsetHeight;
                        t.x + i > n && (t.x = n - i), t.y + o > r && (t.y = r - o), t.x < 0 && (t.x = 0), t.y < 0 && (t.y = 0), a.style.left = t.x + "px", a.style.top = t.y + "px", t.state === "down" ? a.style.zIndex = window.zIndexGlobal++ : t.state === "up" && s.recordCoord && s.recordCoord({
                            id: a.id,
                            left: t.x / n,
                            top: t.y / r,
                            display: "block"
                        }), Event.prevent(e)
                    }
                });
                else if (i <= o.conf.satval.width) {
                    if (o.conf.satval.enable === !1) return;
                    a.style.cursor = "crosshair", a.title = "Saturation + Value", t && Event.proxy.drag({
                        position: "relative",
                        event: e,
                        target: S,
                        listener: function(e, t) {
                            var n = t.y - o.offset < 0 ? 0 : t.y - o.offset > o.conf.satval.height ? o.conf.satval.height : t.y - o.offset;
                            o.color.S = (t.x - o.offset < 0 ? 0 : t.x - o.offset > o.conf.satval.width ? o.conf.satval.width : t.x - o.offset) / o.conf.satval.width * 100, o.color.V = 100 - n / o.conf.satval.height * 100, o.drawSample(t.state, !0), Event.prevent(e)
                        }
                    })
                } else if (i > o.conf.satval.width + o.margin && i <= o.conf.satval.width + o.margin + o.offset + o.conf.hue.width) {
                    if (o.conf.hue.enable === !1) return;
                    a.style.cursor = "crosshair", a.title = "Hue", t && Event.proxy.drag({
                        position: "relative",
                        event: e,
                        target: S,
                        listener: function(e, t) {
                            o.color.H = 360 - Math.min(1, (t.y - o.offset < 0 ? 0 : t.y - o.offset > o.conf.satval.height ? o.conf.satval.height : t.y - o.offset) / o.conf.satval.height) * 360, o.drawSample(t.state, !0), Event.prevent(e)
                        }
                    })
                } else if (o.conf.alpha && i > o.conf.satval.width + o.conf.alpha.width + o.margin * 2 && i <= o.conf.satval.width + o.margin * 2 + o.offset + o.conf.alpha.width * 2) {
                    if (o.conf.alpha.enable === !1) return;
                    a.style.cursor = "crosshair", a.title = "Alpha", t && Event.proxy.drag({
                        position: "relative",
                        event: e,
                        target: S,
                        listener: function(e, t) {
                            o.color.A = (1 - Math.min(1, (t.y - o.offset < 0 ? 0 : t.y - o.offset > o.conf.satval.height ? o.conf.satval.height : t.y - o.offset) / o.conf.satval.height)) * 255, o.drawSample(t.state, !0), Event.prevent(e)
                        }
                    })
                } else a.style.cursor = "default";
                return !1
            }
            a.style.cursor = "text"
        }), this.update = function(t, n) {
            t && (o.color = e(t)), typeof n == "number" && (o.color.A = n), o.drawSample("update", !0)
        }, this.drawSample = function(e, r) {
            x.clearRect(0, 0, S.width, S.height), o.drawSquare(), o.drawHue(), this.conf.alpha && o.drawAlpha();
            var s = Color.Space(o.color, "HSVA>RGBA"),
                u = Color.Space(s, "RGB>HEX24>W3");
            E.value = u.toUpperCase().substr(1), b.style.backgroundColor = Color.Space(s, "RGBA>W3"), x.save();
            if (this.conf.alpha) {
                x.globalAlpha = this.conf.alpha.enable ? 1 : 0;
                var a = o.conf.satval.width + o.margin * 2 + o.conf.hue.width + o.conf.alpha.width + o.offset,
                    u = (255 - o.color.A) / 255 * o.conf.satval.height - 2;
                x.drawImage(t, a + 2, Math.round(u) + o.offset - 1)
            }
            this.conf.hue && (x.globalAlpha = this.conf.hue.enable ? 1 : 0, a = o.conf.satval.width + o.margin + o.offset + o.conf.hue.width, u = (360 - o.color.H) / 362 * o.conf.satval.height - 2, x.drawImage(t, a + 2, Math.round(u) + o.offset - 1)), this.conf.satval && (x.globalAlpha = this.conf.satval.enable ? 1 : 0, a = o.color.S / 100 * o.conf.satval.width, u = (1 - o.color.V / 100) * o.conf.satval.height, a -= n.width / 2, u -= n.height / 2, x.drawImage(n, Math.round(a) + o.offset, Math.round(u) + o.offset)), x.restore(), o.callback && e && r && o.callback(s, e)
        }, this.drawSquare = function() {
            var e = Color.Space({
                H: o.color.H,
                S: 100,
                V: 100
            }, "HSV>RGB>HEX24>W3");
            Color.Space.HEX_RGB("0x" + e);
            var t = o.offset,
                n = o.conf.satval.width;
            x.save(), x.fillStyle = r, x.fillRect(t, o.offset, o.conf.satval.width, o.conf.satval.height), x.globalAlpha = o.color.A / 255, x.fillStyle = T(e, "satval"), x.fillRect(t, t, n, n), e = x.createLinearGradient(t, t, n + t, 0), e.addColorStop(0, T("rgba(255, 255, 255, 1)", "satval")), e.addColorStop(1, T("rgba(255, 255, 255, 0)", "satval")), x.fillStyle = e, x.fillRect(t, t, n, n), e = x.createLinearGradient(0, t, 0, n + t), e.addColorStop(0, "rgba(0, 0, 0, 0)"), e.addColorStop(1, "rgba(0, 0, 0, 1)"), x.fillStyle = e, x.fillRect(t, t, n, n), x.strokeStyle = T("rgba(255,255,255,0.15)", "satval"), x.strokeRect(t + .5, t + .5, n - 1, n - 1), x.restore()
        };
        var T = function(e, t) {
            if (o.conf[t].enable === !0) return e;
            var e = e.substr(0, 4) === "rgba" ? Color.Space(e, "W3>RGBA") : Color.Space(e, "W3>HEX32>RGBA"),
                n = Math.round(.33 * e.R + .33 * e.G + .33 * e.B);
            return "rgba(" + n + "," + n + "," + n + "," + e.A / 255 * .42 + ")"
        };
        return this.drawHue = function() {
            var e = o.conf.satval.width + o.margin + o.offset;
            x.fillStyle = r, x.fillRect(e, o.offset, o.conf.hue.width, o.conf.satval.height);
            var t = x.createLinearGradient(0, 0, 0, o.conf.satval.width + o.offset);
            t.addColorStop(0, T("rgba(255, 0, 0, 1)", "hue")), t.addColorStop(5 / 6, T("rgba(255, 255, 0, 1)", "hue")), t.addColorStop(4 / 6, T("rgba(0, 255, 0, 1)", "hue")), t.addColorStop(.5, T("rgba(0, 255, 255, 1)", "hue")), t.addColorStop(2 / 6, T("rgba(0, 0, 255, 1)", "hue")), t.addColorStop(1 / 6, T("rgba(255, 0, 255, 1)", "hue")), t.addColorStop(1, T("rgba(255, 0, 0, 1)", "hue")), x.save(), x.globalAlpha = o.color.A / 255, x.fillStyle = t, x.fillRect(e, o.offset, o.conf.hue.width, o.conf.satval.height), x.strokeStyle = T("rgba(255,255,255,0.2)", "hue"), x.strokeRect(e + .5, o.offset + .5, o.conf.hue.width - 1, o.conf.hue.height - 1), x.restore()
        }, this.drawAlpha = function() {
            var e = o.conf.satval.width + o.margin * 2 + o.conf.hue.width + o.offset;
            x.fillStyle = r, x.fillRect(e, o.offset, o.conf.alpha.width, o.conf.satval.height);
            var t = Color.Space.HSV_RGB({
                H: o.color.H,
                S: o.color.S,
                V: o.color.V
            }),
                n = x.createLinearGradient(0, 0, 0, o.conf.satval.height);
            t.A = 255, n.addColorStop(0, T(Color.Space.RGBA_W3(t), "alpha")), t.A = 0, n.addColorStop(1, T(Color.Space.RGBA_W3(t), "alpha")), x.fillStyle = n, x.fillRect(e, o.offset, o.conf.alpha.width, o.conf.satval.height), x.strokeStyle = "rgba(255,255,255,0.2)", x.strokeRect(e + .5, o.offset + .5, o.conf.alpha.width - 1, o.conf.satval.height - 1)
        }, this.toggle = function(e) {
            typeof e != "boolean" && (e = a.style.display === "block" ? !1 : !0), e ? (a.style.display = "block", setTimeout(function() {
                a.style.opacity = 1
            }, 150)) : (a.style.opacity = 0, setTimeout(function() {
                a.style.display = "none"
            }, 150)), s.recordCoord && s.recordCoord({
                id: a.id,
                display: e ? "block" : "none"
            });
            if (e && s.autoclose) {
                var t = function() {
                    Event.remove(window, "mousedown", t), o.toggle(!1)
                };
                Event.add(window, "mousedown", t)
            }
        }, this.destory = function() {
            document.body.removeChild(a);
            for (var e in o) delete o[e]
        }, this.drawSample("create"), typeof s.display != "undefined" && this.toggle(s.display), this
    };
    var e = function(e) {
        return typeof e == "string" ? e = e.substr(0, 4) === "hsla" ? Color.Space(e, "W3>HSLA>RGBA>HSVA") : e.substr(0, 4) === "rgba" ? Color.Space(e, "W3>RGBA>HSVA") : e.substr(0, 3) === "rgb" ? Color.Space(e, "W3>RGB>HSV") : Color.Space(e, "W3>HEX24>RGB>HSV") : typeof e.R != "undefined" && (e = Color.Space(e, "RGB>HSV")), typeof e.A == "undefined" && (e.A = 255), e
    }, t = function() {
        var e = document.createElement("canvas"),
            t = e.getContext("2d"),
            n = 16 / 3;
        e.width = 16, e.height = 16;
        for (var r = 0; r < 20; r++) t.beginPath(), t.fillStyle = "#fff", t.moveTo(0, 4), t.lineTo(4, 0), t.lineTo(4, 8), t.fill();
        return t.translate(-n, - 16), e
    }(),
        n = function() {
            var e = document.createElement("canvas");
            e.width = 10, e.height = 10;
            var t = e.getContext("2d");
            t.lineWidth = 1, t.beginPath();
            var n = e.width / 2,
                r = e.width / 2;
            return t.arc(n, r, 4.5, 0, Math.PI * 2, !0), t.strokeStyle = "#000", t.stroke(), t.beginPath(), t.arc(n, r, 3.5, 0, Math.PI * 2, !0), t.strokeStyle = "#FFF", t.stroke(), e
        }(),
        r = function(e, t, n) {
            var r = document.createElement("canvas").getContext("2d");
            return r.canvas.width = e * 2, r.canvas.height = e * 2, r.fillStyle = t, r.fillRect(0, 0, e, e), r.fillStyle = n, r.fillRect(e, 0, e, e), r.fillStyle = n, r.fillRect(0, e, e, e), r.fillStyle = t, r.fillRect(e, e, e, e), e = r.createPattern(r.canvas, "repeat"), e.data = r.canvas.toDataURL(), e
        }(8, "#FFF", "#eee")
})(), typeof Color == "undefined" && (Color = {}), typeof Color.Space == "undefined" && (Color.Space = {}),
function() {
    var e = Math.PI / 180,
        t = 1 / e,
        n = {}, r = {
            "HEX>xyY": "HEX>RGB>XYZ>xyY",
            "HEX>Luv": "HEX>RGB>XYZ>Luv",
            "HEX>LCHuv": "HEX>RGB>XYZ>Luv>LCHuv",
            "HEX>Lab": "HEX>RGB>XYZ>Lab",
            "HEX>LCHab": "HEX>RGB>XYZ>Lab>LCHab",
            "HEX>HLab": "HEX>RGB>XYZ>HLab",
            "HEX>RYB": "HEX>RGB>HSV>RYB",
            "HEX>CMYK": "HEX>RGB>CMY>CMYK",
            "RGB>xyY": "RGB>XYZ>xyY",
            "RGB>Luv": "RGB>XYZ>Luv",
            "RGB>LCHuv": "RGB>XYZ>Luv>LCHuv",
            "RGB>Lab": "RGB>XYZ>Lab",
            "RGB>LCHab": "RGB>XYZ>Lab>LCHab",
            "RGB>HLab": "RGB>XYZ>HLab",
            "RGB>RYB": "RGB>HSV>RYB",
            "RGB>CMYK": "RGB>CMY>CMYK"
        }, i = Color.Space = function(e, t) {
            r[t] && (t = r[t]);
            var s = t.split(">");
            if (typeof e == "object" && e[0] >= 0) {
                for (var o = s[0], u = {}, a = 0; a < o.length; a++) {
                    var f = o.substr(a, 1);
                    u[f] = e[a]
                }
                e = u
            }
            if (n[t]) return n[t](e);
            o = 1;
            for (u = s[0]; o < s.length; o++) o > 1 && (u = u.substr(u.indexOf("_") + 1)), u += (o === 0 ? "" : "_") + s[o], e = i[u](e);
            return e
        };
    i.RGB_W3 = function(e) {
        return "rgb(" + (e.R >> 0) + "," + (e.G >> 0) + "," + (e.B >> 0) + ")"
    }, i.RGBA_W3 = function(e) {
        return "rgba(" + (e.R >> 0) + "," + (e.G >> 0) + "," + (e.B >> 0) + "," + (typeof e.A == "number" ? e.A / 255 : 1) + ")"
    }, i.W3_RGB = function(e) {
        return e = e.substr(4, e.length - 5).split(","), {
            R: parseInt(e[0]),
            G: parseInt(e[1]),
            B: parseInt(e[2])
        }
    }, i.W3_RGBA = function(e) {
        return e = e.substr(5, e.length - 6).split(","), {
            R: parseInt(e[0]),
            G: parseInt(e[1]),
            B: parseInt(e[2]),
            A: parseFloat(e[3]) * 255
        }
    }, i.HSL_W3 = function(e) {
        return "hsl(" + (e.H + .5 >> 0) + "," + (e.S + .5 >> 0) + "%," + (e.L + .5 >> 0) + "%)"
    }, i.HSLA_W3 = function(e) {
        return "hsla(" + (e.H + .5 >> 0) + "," + (e.S + .5 >> 0) + "%," + (e.L + .5 >> 0) + "%," + (typeof e.A == "number" ? e.A / 255 : 1) + ")"
    }, i.W3_HSL = function(e) {
        return e = e.substr(4, e.length - 5).split(","), {
            H: parseInt(e[0]),
            S: parseInt(e[1]),
            L: parseInt(e[2])
        }
    }, i.W3_HSLA = function(e) {
        return e = e.substr(5, e.length - 6).split(","), {
            H: parseInt(e[0]),
            S: parseInt(e[1]),
            L: parseInt(e[2]),
            A: parseFloat(e[3]) * 255
        }
    }, i.RYB_Hue = function(e) {
        var t = Math.floor(e),
            n = t > 0 ? e % t : 0,
            t = s[t % 360],
            e = s[Math.ceil(e) % 360];
        return t + (e - t) * n
    }, i.Hue_RYB = function(e) {
        var t = Math.floor(e),
            n = t > 0 ? e % t : 0,
            t = o[t % 360],
            e = o[Math.ceil(e) % 360];
        return t + (e - t) * n
    }, i.W3_HEX = i.W3_HEX24 = function(e) {
        return e.substr(0, 1) === "#" && (e = e.substr(1)), e.length === 3 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]), parseInt("0x" + e)
    }, i.W3_HEX32 = function(e) {
        return e.substr(0, 1) === "#" && (e = e.substr(1)), e.length === 6 ? parseInt("0xFF" + e) : parseInt("0x" + e)
    }, i.HEX_W3 = i.HEX24_W3 = function(e, t) {
        t || (t = 6), e || (e = 0);
        for (var n = e.toString(16), r = n.length; r < t;) n = "0" + n, r++;
        for (r = n.length; r > t;) n = n.substr(1), r--;
        return "#" + n
    }, i.HEX32_W3 = function(e) {
        return i.HEX_W3(e, 8)
    }, i.HEX_RGB = i.HEX24_RGB = function(e) {
        return {
            R: e >> 16,
            G: e >> 8 & 255,
            B: e & 255
        }
    }, i.HEX32_RGBA = function(e) {
        return {
            R: e >>> 16 & 255,
            G: e >>> 8 & 255,
            B: e & 255,
            A: e >>> 24
        }
    }, i.RGBA_HEX32 = function(e) {
        return (e.A << 24 | e.R << 16 | e.G << 8 | e.B) >>> 0
    }, i.RGB_HEX24 = i.RGB_HEX = function(e) {
        return e.R < 0 && (e.R = 0), e.G < 0 && (e.G = 0), e.B < 0 && (e.B = 0), e.R > 255 && (e.R = 255), e.G > 255 && (e.G = 255), e.B > 255 && (e.B = 255), e.R << 16 | e.G << 8 | e.B
    }, i.RGB_CMY = function(e) {
        return {
            C: 1 - e.R / 255,
            M: 1 - e.G / 255,
            Y: 1 - e.B / 255
        }
    }, i.RGBA_HSLA = i.RGB_HSL = function(e) {
        var t = e.R / 255,
            n = e.G / 255,
            r = e.B / 255,
            i = Math.min(t, n, r),
            s = Math.max(t, n, r),
            o = s - i,
            u, a = (s + i) / 2;
        if (o === 0) i = u = 0;
        else {
            var i = a < .5 ? o / (s + i) : o / (2 - s - i),
                f = ((s - t) / 6 + o / 2) / o,
                l = ((s - n) / 6 + o / 2) / o,
                o = ((s - r) / 6 + o / 2) / o;
            t === s ? u = o - l : n === s ? u = 1 / 3 + f - o : r === s && (u = 2 / 3 + l - f), u < 0 && (u += 1), u > 1 && (u -= 1)
        }
        return {
            H: u * 360,
            S: i * 100,
            L: a * 100,
            A: e.A
        }
    }, i.RGBA_HSVA = i.RGB_HSV = function(e) {
        var t = e.R / 255,
            n = e.G / 255,
            r = e.B / 255,
            i = Math.min(t, n, r),
            s = Math.max(t, n, r),
            o = s - i,
            u;
        if (o === 0) i = u = 0;
        else {
            var i = o / s,
                a = ((s - t) / 6 + o / 2) / o,
                f = ((s - n) / 6 + o / 2) / o,
                o = ((s - r) / 6 + o / 2) / o;
            t === s ? u = o - f : n === s ? u = 1 / 3 + a - o : r === s && (u = 2 / 3 + f - a), u < 0 && (u += 1), u > 1 && (u -= 1)
        }
        return {
            H: u * 360,
            S: i * 100,
            V: s * 100,
            A: e.A
        }
    }, i.RGB_XYZ = function(e) {
        i.RGB_XYZ_Matrix || i.getProfile("sRGB");
        var t = i.RGB_XYZ_Matrix,
            n = {}, r = e.R / 255,
            s = e.G / 255,
            e = e.B / 255;
        return i.Profile === "sRGB" ? (r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92, s = s > .04045 ? Math.pow((s + .055) / 1.055, 2.4) : s / 12.92, e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) : (r = Math.pow(r, i.Gamma), s = Math.pow(s, i.Gamma), e = Math.pow(e, i.Gamma)), n.X = r * t[0] + s * t[3] + e * t[6], n.Y = r * t[1] + s * t[4] + e * t[7], n.Z = r * t[2] + s * t[5] + e * t[8], n
    }, i.CMY_RGB = function(e) {
        return {
            R: Math.max(0, (1 - e.C) * 255),
            G: Math.max(0, (1 - e.M) * 255),
            B: Math.max(0, (1 - e.Y) * 255)
        }
    }, i.CMY_CMYK = function(e) {
        var t = e.C,
            n = e.M,
            e = e.Y,
            r = Math.min(e, Math.min(n, Math.min(t, 1))),
            t = Math.round((t - r) / (1 - r) * 100),
            n = Math.round((n - r) / (1 - r) * 100),
            e = Math.round((e - r) / (1 - r) * 100),
            r = Math.round(r * 100);
        return {
            C: t,
            M: n,
            Y: e,
            K: r
        }
    }, i.CMYK_CMY = function(e) {
        return {
            C: e.C * (1 - e.K) + e.K,
            M: e.M * (1 - e.K) + e.K,
            Y: e.Y * (1 - e.K) + e.K
        }
    }, i.HSLA_RGBA = i.HSL_RGB = function(e) {
        var t = e.H / 360,
            n = e.S / 100,
            r = e.L / 100,
            i, s, o;
        return n === 0 ? r = n = t = r : (s = r < .5 ? r * (1 + n) : r + n - n * r, i = 2 * r - s, o = t + 1 / 3, o < 0 && (o += 1), o > 1 && (o -= 1), r = 6 * o < 1 ? i + (s - i) * 6 * o : 2 * o < 1 ? s : 3 * o < 2 ? i + (s - i) * (2 / 3 - o) * 6 : i, o = t, o < 0 && (o += 1), o > 1 && (o -= 1), n = 6 * o < 1 ? i + (s - i) * 6 * o : 2 * o < 1 ? s : 3 * o < 2 ? i + (s - i) * (2 / 3 - o) * 6 : i, o = t - 1 / 3, o < 0 && (o += 1), o > 1 && (o -= 1), t = 6 * o < 1 ? i + (s - i) * 6 * o : 2 * o < 1 ? s : 3 * o < 2 ? i + (s - i) * (2 / 3 - o) * 6 : i), {
            R: r * 255,
            G: n * 255,
            B: t * 255,
            A: e.A
        }
    }, i.HSVA_RGBA = i.HSV_RGB = function(e) {
        var t = e.H / 360,
            n = e.S / 100,
            r = e.V / 100,
            i, s, o;
        if (n === 0) i = s = o = Math.round(r * 255);
        else switch (t >= 1 && (t = 0), t *= 6, D = t - Math.floor(t), A = Math.round(255 * r * (1 - n)), o = Math.round(255 * r * (1 - n * D)), C = Math.round(255 * r * (1 - n * (1 - D))), r = Math.round(255 * r), Math.floor(t)) {
            case 0:
                i = r, s = C, o = A;
                break;
            case 1:
                i = o, s = r, o = A;
                break;
            case 2:
                i = A, s = r, o = C;
                break;
            case 3:
                i = A, s = o, o = r;
                break;
            case 4:
                i = C, s = A, o = r;
                break;
            case 5:
                i = r, s = A
        }
        return {
            R: i,
            G: s,
            B: o,
            A: e.A
        }
    }, i.XYZ_RGB = function(e) {
        i.XYZ_RGB_Matrix || i.getProfile("sRGB");
        var t = i.XYZ_RGB_Matrix,
            n, r;
        return n = e.X * t[0] + e.Y * t[3] + e.Z * t[6], r = e.X * t[1] + e.Y * t[4] + e.Z * t[7], e = e.X * t[2] + e.Y * t[5] + e.Z * t[8], i.Profile === "sRGB" ? (n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n, r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : 12.92 * r, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : 12.92 * e) : (n = Math.pow(n, 1 / i.Gamma), r = Math.pow(r, 1 / i.Gamma), e = Math.pow(e, 1 / i.Gamma)), {
            R: Math.round(n * 255),
            G: Math.round(r * 255),
            B: Math.round(e * 255)
        }
    }, i.XYZ_xyY = function(e) {
        var t = e.X + e.Y + e.Z;
        return t === 0 ? {
            x: 0,
            y: 0,
            Y: e.Y
        } : {
            x: e.X / t,
            y: e.Y / t,
            Y: e.Y
        }
    }, i.XYZ_HLab = function(e) {
        var t = Math.sqrt(e.Y);
        return {
            L: 10 * t,
            a: 17.5 * ((1.02 * e.X - e.Y) / t),
            b: 7 * ((e.Y - .847 * e.Z) / t)
        }
    }, i.XYZ_Lab = function(e) {
        var t = e.X / i.WPScreen.X,
            n = e.Y / i.WPScreen.Y,
            e = e.Z / i.WPScreen.Z,
            t = t > .008856 ? Math.pow(t, 1 / 3) : 7.787 * t + 16 / 116,
            n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116,
            e = e > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116;
        return {
            L: 116 * n - 16,
            a: 500 * (t - n),
            b: 200 * (n - e)
        }
    }, i.XYZ_Luv = function(e) {
        var t = i.WPScreen,
            n = 4 * e.X / (e.X + 15 * e.Y + 3 * e.Z),
            r = 9 * e.Y / (e.X + 15 * e.Y + 3 * e.Z);
        return e.Y = e.Y > .008856 ? Math.pow(e.Y, 1 / 3) : 7.787 * e.Y + 16 / 116, e = 116 * e.Y - 16, {
            L: e,
            u: 13 * e * (n - 4 * t.X / (t.X + 15 * t.Y + 3 * t.Z)) || 0,
            v: 13 * e * (r - 9 * t.Y / (t.X + 15 * t.Y + 3 * t.Z)) || 0
        }
    }, i.xyY_XYZ = function(e) {
        return {
            X: e.x * e.Y / e.y,
            Y: e.Y,
            Z: (1 - e.x - e.y) * e.Y / e.y
        }
    }, i.HLab_XYZ = function(e) {
        var t = e.a / 17.5 * (e.L / 10),
            n = e.b / 7 * (e.L / 10),
            e = Math.pow(e.L / 10, 2);
        return {
            X: (t + e) / 1.02,
            Y: e,
            Z: -(n - e) / .847
        }
    }, i.Lab_XYZ = function(e) {
        var t = i.WPScreen,
            n = (e.L + 16) / 116,
            r = e.a / 500 + n,
            e = n - e.b / 200,
            n = Math.pow(n, 3) > .008856 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787,
            r = Math.pow(r, 3) > .008856 ? Math.pow(r, 3) : (r - 16 / 116) / 7.787,
            e = Math.pow(e, 3) > .008856 ? Math.pow(e, 3) : (e - 16 / 116) / 7.787;
        return {
            X: t.X * r,
            Y: t.Y * n,
            Z: t.Z * e
        }
    }, i.Lab_LCHab = function(e) {
        var n = Math.atan2(e.b, e.a) * t;
        return n < 0 ? n += 360 : n > 360 && (n -= 360), {
            L: e.L,
            C: Math.sqrt(e.a * e.a + e.b * e.b),
            H: n
        }
    }, i.Luv_XYZ = function(e) {
        var t = i.WPScreen,
            n = (e.L + 16) / 116,
            n = Math.pow(n, 3) > .008856 ? Math.pow(n, 3) : (n - 16 / 116) / 7.787,
            r = e.u / (13 * e.L) + 4 * t.X / (t.X + 15 * t.Y + 3 * t.Z),
            e = e.v / (13 * e.L) + 9 * t.Y / (t.X + 15 * t.Y + 3 * t.Z),
            r = -(9 * n * r) / ((r - 4) * e - r * e);
        return {
            X: r,
            Y: n,
            Z: (9 * n - 15 * e * n - e * r) / (3 * e)
        }
    }, i.Luv_LCHuv = function(e) {
        var n = Math.atan2(e.v, e.u) * t;
        return n < 0 ? n += 360 : n > 360 && (n -= 360), {
            L: e.L,
            C: Math.sqrt(e.u * e.u + e.v * e.v),
            H: n
        }
    }, i.LCHab_Lab = function(t) {
        var n = t.H * e;
        return {
            L: t.L,
            a: Math.cos(n) * t.C,
            b: Math.sin(n) * t.C
        }
    }, i.LCHuv_Luv = function(t) {
        var n = t.H * e;
        return {
            L: t.L,
            u: Math.cos(n) * t.C,
            v: Math.sin(n) * t.C
        }
    }, i.RGB_HSI = function(e) {
        var n = e.R,
            r = e.G,
            e = e.B,
            i = .5 * (2 * n - r - e),
            s = Math.sqrt(3) * (r - e);
        return I = (n + r + e) / 3, I > 0 ? (S = 1 - Math.min(n, r, e) / I, H = Math.atan2(s, i) * t, H < 0 && (H += 360)) : H = S = 0, {
            H: H,
            S: S * 100,
            I: I
        }
    }, i.HSI_RGB = function(t) {
        var n = t.H,
            r = t.S / 100,
            t = t.I,
            i, s, o;
        return n -= 360 * Math.floor(n / 360), n < 120 ? (o = t * (1 - r), i = t * (1 + r * Math.cos(n * e) / Math.cos((60 - n) * e)), s = 3 * t - i - o) : n < 240 ? (n -= 120, i = t * (1 - r), s = t * (1 + r * Math.cos(n * e) / Math.cos((60 - n) * e)), o = 3 * t - i - s) : (n -= 240, s = t * (1 - r), o = t * (1 + r * Math.cos(n * e) / Math.cos((60 - n) * e)), i = 3 * t - s - o), {
            R: i,
            G: s,
            B: o
        }
    }, i.getAdaption = function(e, t) {
        var n = {
            "XYZ scaling": {
                A: [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ],
                Z: [
                    [1, 0, 0],
                    [0, 1, 0],
                    [0, 0, 1]
                ]
            },
            "Von Kries": {
                A: [
                    [.40024, - 0.2263, 0],
                    [.7076, 1.16532, 0],
                    [-0.08081, .0457, .91822]
                ],
                Z: [
                    [1.859936, .361191, 0],
                    [-1.129382, .638812, 0],
                    [.219897, - 0.000006, 1.089064]
                ]
            },
            Bradford: {
                A: [
                    [.8951, .2664, - 0.161399],
                    [-0.750199, 1.7135, .0367],
                    [.038899, - 0.0685, 1.0296]
                ],
                Z: [
                    [.986993, - 0.14705399, .15996299],
                    [.43230499, .51836, .0492912],
                    [-0.00852866, .0400428, .96848699]
                ]
            }
        }, r = i.WPSource,
            s = i.WPScreen,
            o = n[t].A,
            n = n[t].Z,
            s = f(o, [
                [s.X],
                [s.Y],
                [s.Z]
            ]),
            r = f(o, [
                [r.X],
                [r.Y],
                [r.Z]
            ]),
            o = f(n, f([
                [s[0] / r[0], 0, 0],
                [0, s[1] / r[1], 0],
                [0, 0, s[2] / r[2]]
            ], f(o, [
                [e.X],
                [e.Y],
                [e.Z]
            ])));
        return {
            X: o[0][0],
            Y: o[1][0],
            Z: o[2][0]
        }
    }, i.getProfile = function(e) {
        function t(e) {
            return i.getAdaption(i.xyY_XYZ(e), "Bradford")
        }
        var n = u[e];
        i.Profile = e, i.ICCProfile = n, i.Gamma = n[0], i.WPSource = i.getIlluminant("2", n[1]);
        var e = t({
            x: n[2],
            y: n[3],
            Y: n[4]
        }),
            r = t({
                x: n[5],
                y: n[6],
                Y: n[7]
            }),
            n = t({
                x: n[8],
                y: n[9],
                Y: n[10]
            });
        i.RGB_XYZ_Matrix = [e.X, e.Y, e.Z, r.X, r.Y, r.Z, n.X, n.Y, n.Z], i.XYZ_RGB_Matrix = l(i.RGB_XYZ_Matrix)
    }, i.getIlluminant = function(e, t) {
        var n = a[t],
            n = e === "2" ? {
                x: n[0],
                y: n[1],
                Y: 1
            } : {
                x: n[2],
                y: n[3],
                Y: 1
            };
        return i.xyY_XYZ(n)
    };
    var s = [],
        o = [];
    (function() {
        for (var e = [
            [0, 0],
            [15, 8],
            [30, 17],
            [45, 26],
            [60, 34],
            [75, 41],
            [90, 48],
            [105, 54],
            [120, 60],
            [135, 81],
            [150, 103],
            [165, 123],
            [180, 138],
            [195, 155],
            [210, 171],
            [225, 187],
            [240, 204],
            [255, 219],
            [270, 234],
            [285, 251],
            [300, 267],
            [315, 282],
            [330, 298],
            [345, 329],
            [360, 0]
        ], t = 0; t < 360; t++) for (var n = !1, r = !1, i = 0; i < 24; i++) {
            var u = e[i],
                a = e[i + 1];
            a && a[1] < u[1] && (a[1] += 360), !n && u[0] <= t && a[0] > t && (o[t] = (u[1] + (a[1] - u[1]) * (t - u[0]) / (a[0] - u[0])) % 360, n = !0), !r && u[1] <= t && a[1] > t && (s[t] = (u[0] + (a[0] - u[0]) * (t - u[1]) / (a[1] - u[1])) % 360, r = !0);
            if (n === !0 && r === !0) break
        }
    })();
    var u = {
        "Adobe (1998)": [2.2, "D65", .64, .33, .297361, .21, .71, .627355, .15, .06, .075285],
        "Apple RGB": [1.8, "D65", .625, .34, .244634, .28, .595, .672034, .155, .07, .083332],
        BestRGB: [2.2, "D50", .7347, .2653, .228457, .215, .775, .737352, .13, .035, .034191],
        "Beta RGB": [2.2, "D50", .6888, .3112, .303273, .1986, .7551, .663786, .1265, .0352, .032941],
        "Bruce RGB": [2.2, "D65", .64, .33, .240995, .28, .65, .683554, .15, .06, .075452],
        "CIE RGB": [2.2, "E", .735, .265, .176204, .274, .717, .812985, .167, .009, .010811],
        ColorMatch: [1.8, "D50", .63, .34, .274884, .295, .605, .658132, .15, .075, .066985],
        DonRGB4: [2.2, "D50", .696, .3, .27835, .215, .765, .68797, .13, .035, .03368],
        eciRGB: [1.8, "D50", .67, .33, .32025, .21, .71, .602071, .14, .08, .077679],
        "Ekta Space PS5": [2.2, "D50", .695, .305, .260629, .26, .7, .734946, .11, .005, .004425],
        "Generic RGB": [1.8, "D65", .6295, .3407, .232546, .2949, .6055, .672501, .1551, .0762, .094952],
        "HDTV (HD-CIF)": [1.95, "D65", .64, .33, .212673, .3, .6, .715152, .15, .06, .072175],
        NTSC: [2.2, "C", .67, .33, .298839, .21, .71, .586811, .14, .08, .11435],
        "PAL / SECAM": [2.2, "D65", .64, .33, .222021, .29, .6, .706645, .15, .06, .071334],
        ProPhoto: [1.8, "D50", .7347, .2653, .28804, .1596, .8404, .711874, .0366, 1e-4, 86e-6],
        SGI: [1.47, "D65", .625, .34, .244651, .28, .595, .67203, .155, .07, .083319],
        "SMPTE-240M": [1.92, "D65", .63, .34, .212413, .31, .595, .701044, .155, .07, .086543],
        "SMPTE-C": [2.2, "D65", .63, .34, .212395, .31, .595, .701049, .155, .07, .086556],
        sRGB: [2.2, "D65", .64, .33, .212656, .3, .6, .715158, .15, .06, .072186],
        "Wide Gamut": [2.2, "D50", .7347, .2653, .258187, .1152, .8264, .724938, .1566, .0177, .016875]
    }, a = {
        A: [.44757, .40745, .45117, .40594, 2856],
        B: [.34842, .35161, .3498, .3527, 4874],
        C: [.31006, .31616, .31039, .31905, 6774],
        D50: [.34567, .3585, .34773, .35952, 5003],
        D55: [.33242, .34743, .33411, .34877, 5503],
        D65: [.31271, .32902, .31382, .331, 6504],
        D75: [.29902, .31485, .29968, .3174, 7504],
        E: [1 / 3, 1 / 3, 1 / 3, 1 / 3, 5454],
        F1: [.3131, .33727, .31811, .33559, 6430],
        F2: [.37208, .37529, .37925, .36733, 4230],
        F3: [.4091, .3943, .41761, .38324, 3450],
        F4: [.44018, .40329, .4492, .39074, 2940],
        F5: [.31379, .34531, .31975, .34246, 6350],
        F6: [.3779, .38835, .3866, .37847, 4150],
        F7: [.31292, .32933, .31569, .3296, 6500],
        F8: [.34588, .35875, .34902, .35939, 5e3],
        F9: [.37417, .37281, .37829, .37045, 4150],
        F10: [.34609, .35986, .3509, .35444, 5e3],
        F11: [.38052, .37713, .38541, .37123, 4e3],
        F12: [.43695, .40441, .44256, .39717, 3e3]
    };
    i.Profile = "RGB", i.RGB_XYZ_Matrix = "", i.XYZ_RGB_Matrix = "", i.Gamma = "", i.WPScreen = i.getIlluminant("2", "D65");
    var f = function(e, t) {
        var n = e.length,
            r = n,
            i, s, o = t[0].length,
            u, a = e[0].length,
            f = [],
            l, c, h;
        do {
            i = r - n, f[i] = [], s = o;
            do {
                u = o - s, l = 0, c = a;
                do h = a - c, l += e[i][h] * t[h][u];
                while (--c);
                f[i][u] = l
            } while (--s)
        } while (--n);
        return f
    }, l = function(e) {
        var t = 1 / (e[0] * (e[4] * e[8] - e[5] * e[7]) - e[1] * (e[3] * e[8] - e[5] * e[6]) + e[2] * (e[3] * e[7] - e[4] * e[6]));
        return [t * (e[4] * e[8] - e[5] * e[7]), t * -1 * (e[1] * e[8] - e[2] * e[7]), t * (e[1] * e[5] - e[2] * e[4]), t * -1 * (e[3] * e[8] - e[5] * e[6]), t * (e[0] * e[8] - e[2] * e[6]), t * -1 * (e[0] * e[5] - e[2] * e[3]), t * (e[3] * e[7] - e[4] * e[6]), t * -1 * (e[0] * e[7] - e[1] * e[6]), t * (e[0] * e[4] - e[1] * e[3])]
    }
}(), typeof Color == "undefined" && (Color = {}), Color.WebColors = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "00ffff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000000",
    blanchedalmond: "ffebcd",
    blue: "0000ff",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "00ffff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "ff00ff",
    fuscia: "ff00ff",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "778899",
    lightslategrey: "778899",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "00ff00",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "ff00ff",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    red: "ff0000",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "ffffff",
    whitesmoke: "f5f5f5",
    yellow: "ffff00",
    yellowgreen: "9acd32"
}, typeof DOMLoader == "undefined" && (DOMLoader = {}),
function() {
    var e, t = {};
    DOMLoader.image = function(n) {
        var r = new Image,
            s = function() {
                var r = n.src;
                return DOMLoader.sendRequestBase64({
                    url: r,
                    error: function() {
                        o(3), t[a.host] = 3
                    },
                    callback: function(s) {
                        if (s) {
                            var u = r.split(".").pop();
                            n.src = "data:image/" + u + ";base64," + s.responseText, o(0), t[a.host] = e === !0 ? 1 : 0
                        }
                    },
                    progress: n.progress
                })
            }, o = function(e) {
                r.onload = n.callback;
                switch (e) {
                    case 0:
                        r.src = n.src;
                        break;
                    case 1:
                        r.crossOrigin = "anonymous", r.src = n.src;
                        break;
                    case 2:
                        s();
                        break;
                    case 3:
                        $vars.host.substr(0, 6) === "chrome" ? (DOMLoader.imageToJson = function(e) {
                            r.onload = n.callback, r.src = e.data
                        }, DOMLoader.script.add({
                            src: "http://img-to-json.appspot.com/?callback=DOMLoader.imageToJson&url=" + escape(n.src)
                        })) : (e = $vars.host + "/software/inc/getImage.php?url=", r.src = e + escape(n.src))
                }
            }, u = function() {
                if (n.src.substr(0, 10) === "data:image") return o(0);
                if (n.progress) return s();
                var r = t[a.host];
                return typeof r != "undefined" ? o(r) : e !== !1 || "withCredentials" in req ? s() : o(3)
            };
        if (n.src.substr(0, 10) === "data:image") return o(0);
        var a = document.createElement("a");
        a.href = n.src;
        if (typeof e != "undefined") return u(e);
        var f = new Image;
        return f.crossOrigin = "anonymous", f.onload = function() {
            var t = document.createElement("canvas").getContext("2d");
            t.drawImage(f, 0, 0);
            try {
                t.getImageData(0, 0, 1, 1), u(e = !0)
            } catch (n) {
                u(e = !1)
            }
        }, f.src = "https://lh4.googleusercontent.com/-Qw7nlh9DWec/TvV5qTZ9yfI/AAAAAAAADOA/XdalA5bQBOY/s128/1x1.png", r
    }, DOMLoader.sendRequestBase64 = function(e) {
        var t = function(e) {
            var t = "",
                n, r = Array(4),
                i = 0;
            for (n = 0; i < e.length;) {
                n = Array(3);
                for (jnx = 0; jnx < n.length; jnx++) n[jnx] = i < e.length ? e.charCodeAt(i++) & 255 : 0;
                r[0] = n[0] >> 2, r[1] = (n[0] & 3) << 4 | n[1] >> 4, r[2] = (n[1] & 15) << 2 | n[2] >> 6, r[3] = n[2] & 63, n = i - (e.length - 1);
                switch (n) {
                    case 2:
                        r[3] = 64, r[2] = 64;
                        break;
                    case 1:
                        r[3] = 64
                }
                for (jnx = 0; jnx < r.length; jnx++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(r[jnx])
            }
            return t
        }, n = e.callback;
        e.callback = function(r) {
            if (r.responseText) {
                if (r = t(r.responseText), e.JS64) {
                    var r = "data:image/png;base64," + r,
                        i = document.createElement("canvas"),
                        s = i.getContext("2d"),
                        o = new Image;
                    return o.onload = function() {
                        var e = this.offsetWidth,
                            t = this.offsetHeight;
                        i.width = e, i.height = t, i.style.width = e + "px", i.style.height = t + "px", document.getElementById("output"), s.drawImage(this, 0, 0);
                        for (var e = s.getImageData(0, 0, e, t).data, t = [], r = e.length, u = -1, a = 0; a < r; a += 4) e[a] > 0 && (t[++u] = String.fromCharCode(e[a]));
                        e = t.join(""), n({
                            responseText: e
                        }), document.body.removeChild(o)
                    }, o.src = r, !0
                }
                n({
                    responseText: r
                })
            }
        }, DOMLoader.sendRequest(e)
    }
}(), typeof DOMLoader == "undefined" && (DOMLoader = {}), DOMLoader.link = function(e) {
    typeof e == "string" && (e = {
        href: e
    });
    var t = e.href.replace(/[^a-zA-Z 0-9]+/g, "");
    if (!document.getElementById(t)) {
        var n = document.createElement("link");
        n.href = e.href, n.id = t, n.setAttribute("rel", "stylesheet"), n.setAttribute("type", "text/css"), e = document.getElementsByTagName("head")[0], e || (e = document.body), e.appendChild(n)
    }
}, typeof DOMLoader == "undefined" && (DOMLoader = {}), DOMLoader.script = function() {
    return this.loaded = {}, this.loading = {}, this
}, DOMLoader.script.prototype.add = function(e) {
    var t = this,
        n = e.srcs;
    typeof n == "undefined" && (n = [{
        src: e.src,
        verify: e.verify
    }]);
    var r = document.getElementsByTagName("head")[0],
        i = function(e, n) {
            !t.loaded[e.src] && (!n || typeof window[n] != "undefined") && (t.loaded[e.src] = !0, t.loading[e.src] && t.loading[e.src](), delete t.loading[e.src], e.callback && e.callback(), typeof f != "undefined" && f())
        }, s = [],
        o = function(n) {
            typeof n == "string" && (n = {
                src: n,
                verify: e.verify
            }), /([\w\d.])$/.test(n.verify) && (n.test = n.verify, s.push(n.test));
            if (!t.loaded[n.src]) {
                var o = document.createElement("script");
                o.onreadystatechange = function() {
                    this.readyState !== "loaded" && this.readyState !== "complete" || i(n)
                }, o.onload = function() {
                    i(n)
                }, o.setAttribute("type", "text/javascript"), o.setAttribute("src", n.src), r.appendChild(o), t.loading[n.src] = function() {}
            }
        }, u = function(t) {
            if (t) i(t, t.test);
            else for (var r = 0; r < n.length; r++) i(n[r], n[r].test);
            for (var o = !0, r = 0; r < s.length; r++) typeof window[s[r]] == "undefined" && (o = !1);
            !e.strictOrder && o ? e.callback && e.callback() : setTimeout(function() {
                u(t)
            }, 10)
        };
    if (e.strictOrder) {
        var a = -1,
            f = function() {
                a++;
                if (n[a]) {
                    var r = n[a],
                        i = r.src;
                    t.loading[i] ? t.loading[i] = function() {
                        r.callback && r.callback(), f()
                    } : t.loaded[i] ? f() : (o(r), u(r))
                } else e.callback && e.callback()
            };
        f()
    } else {
        for (a = 0; a < n.length; a++) o(n[a]);
        u()
    }
}, DOMLoader.script = new DOMLoader.script, typeof DOMLoader == "undefined" && (DOMLoader = {});
if (typeof XMLHttpRequest == "undefined") {
    var XMLHttpRequest;
    (function() {
        for (var e = [function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }], t = 0; t < e.length; t++) {
            try {
                e[t]()
            } catch (n) {
                continue
            }
            break
        }
        XMLHttpRequest = e[t]
    })()
}
if (typeof(new XMLHttpRequest).responseText == "undefined") {
    var IEBinaryToArray_ByteStr_Script = "<!-- IEBinaryToArray_ByteStr -->\r\n<script type='text/vbscript'>\r\nFunction IEBinaryToArray_ByteStr(Binary)\r\n   IEBinaryToArray_ByteStr = CStr(Binary)\r\nEnd Function\r\nFunction IEBinaryToArray_ByteStr_Last(Binary)\r\n   Dim lastIndex\r\n   lastIndex = LenB(Binary)\r\n   if lastIndex mod 2 Then\r\n       IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n   Else\r\n       IEBinaryToArray_ByteStr_Last = \"\"\r\n   End If\r\nEnd Function\r\n</script>\r\n";
    document.write(IEBinaryToArray_ByteStr_Script), DOMLoader.sendRequest = function(e) {
        function t(e) {
            for (var t = {}, n = 0; n < 256; n++) for (var r = 0; r < 256; r++) t[String.fromCharCode(n + r * 256)] = String.fromCharCode(n) + String.fromCharCode(r);
            return n = IEBinaryToArray_ByteStr(e), e = IEBinaryToArray_ByteStr_Last(e), n.replace(/[\s\S]/g, function(e) {
                return t[e]
            }) + e
        }
        var n = XMLHttpRequest();
        return n.open("GET", e.url, !0), e.responseType && (n.responseType = e.responseType), e.error && (n.onerror = e.error), e.progress && (n.onprogress = e.progress), n.onreadystatechange = function() {
            n.readyState === 4 && (n.status === 200 ? n.responseText = t(n.responseBody) : n = !1, e.onload) && e.onload(n)
        }, n.setRequestHeader("Accept-Charset", "x-user-defined"), n.send(null), n
    }
} else DOMLoader.sendRequest = function(e) {
    var t = new XMLHttpRequest;
    return t.open(e.data ? "POST" : "GET", e.url, !0), t.overrideMimeType && t.overrideMimeType("text/plain; charset=x-user-defined"), e.data && t.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.responseType && (t.responseType = e.responseType), e.error && (t.onerror = e.error), e.progress && (t.onprogress = e.progress), t.onreadystatechange = function(n) {
        t.readyState === 4 && (t.status !== 200 && t.status != 304 ? e.onerror && e.onerror(n, !1) : e.onload && e.onload(t))
    }, t.send(e.data), t
};
if (typeof Event == "undefined") var Event = {};
Event = function(e) {
    e.modifyEventListener = !1, e.modifySelectors = !1, e.add = function(e, n, r, i) {
        return t(e, n, r, i, "add")
    }, e.remove = function(e, n, r, i) {
        return t(e, n, r, i, "remove")
    }, e.stop = function(e) {
        e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0, e.bubble = 0
    }, e.prevent = function(e) {
        e.preventDefault && e.preventDefault(), e.returnValue = !1
    }, e.cancel = function(t) {
        e.stop(t), e.prevent(t)
    }, e.supports = function(e, t) {
        typeof e == "string" && (t = e, e = window), t = "on" + t;
        if (t in e) return !0;
        e.setAttribute || (e = document.createElement("div"));
        if (e.setAttribute && e.removeAttribute) {
            e.setAttribute(t, "");
            var n = typeof e[t] == "function";
            return typeof e[t] != "undefined" && (e[t] = void 0), e.removeAttribute(t), n
        }
    };
    var t = function(o, h, v, m, y) {
        m = m || {};
        if (typeof o != "string" || h !== "ready") {
            if (typeof o == "string") {
                o = document.querySelectorAll(o);
                if (o.length === 0) return r("Missing target on listener!");
                o.length === 1 && (o = o[0])
            }
            if (o.length > 1) {
                for (var S = {}, x = 0, T = o.length; x < T; x++) {
                    var N = t(o[x], h, v, m, y);
                    N && (S[x] = N)
                }
                return n(S)
            }
            h.indexOf && h.indexOf(" ") !== -1 && (h = h.split(" ")), h.indexOf && h.indexOf(",") !== -1 && (h = h.split(","));
            if (typeof h != "string") {
                S = {};
                if (typeof h.length == "number") {
                    x = 0;
                    for (T = h.length; x < T; x++)(N = t(o, h[x], v, m, y)) && (S[h[x]] = N)
                } else for (x in h)(N = typeof h[x] == "function" ? t(o, x, h[x], m, y) : t(o, x, h[x].listener, h[x], y)) && (S[x] = N);
                return n(S)
            }
            if (typeof v != "function") return r("Listener is not a function! ", o, h, v);
            S = m.useCapture || !1, N = i(h) + u(o) + "." + u(v) + "." + (S ? 1 : 0);
            if (e.Gesture._gestureHandlers[h]) {
                if (y === "remove") {
                    if (!s[N]) return;
                    s[N].remove(), delete s[N]
                } else if (y === "add") {
                    if (s[N]) return s[N];
                    if (m.useCall && !e.modifyEventListener) var C = v,
                        v = function(e, t) {
                            for (var n in t) e[n] = t[n];
                            return C.call(o, e)
                        };
                    m.gesture = h, m.target = o, m.listener = v, s[N] = e.proxy[h](m)
                }
            } else if (h = i(h), y === "remove") {
                if (!s[N]) return;
                o[f](h, v, S), delete s[N]
            } else if (y === "add") {
                if (s[N]) return s[N];
                o[a](h, v, S), s[N] = {
                    type: h,
                    target: o,
                    listener: v,
                    remove: function() {
                        e.remove(o, h, v, m)
                    }
                }
            }
            return s[N]
        }
        var b = (new Date).getTime(),
            w = m.timeout,
            E = setInterval(function() {
                (new Date).getTime() - b > w && clearInterval(E), document.querySelector(o) && (clearInterval(E), v())
            }, m.interval || 1e3 / 60)
    }, n = function(e) {
        return {
            remove: function() {
                for (var t in e) e[t].remove()
            },
            add: function() {
                for (var t in e) e[t].add()
            }
        }
    }, r = function(e) {
        typeof console != "undefined" && typeof console.error != "undefined" && console.error(arguments)
    }, i = function() {
        var t = {};
        return function(n) {
            return e.pointerType || (window.navigator.msPointerEnabled ? (e.pointerType = "mspointer", t = {
                mousedown: "MSPointerDown",
                mousemove: "MSPointerMove",
                mouseup: "MSPointerUp"
            }) : e.supports("touchstart") ? (e.pointerType = "touch", t = {
                mousedown: "touchstart",
                mouseup: "touchend",
                mousemove: "touchmove"
            }) : e.pointerType = "mouse"), t[n] && (n = t[n]), document.addEventListener ? n : "on" + n
        }
    }(),
        s = {}, o = 0,
        u = function(e) {
            return e === window ? "#window" : e === document ? "#document" : e ? (e.uniqueID || (e.uniqueID = "id" + o++), e.uniqueID) : r("Missing target on listener!")
        }, a = document.addEventListener ? "addEventListener" : "attachEvent",
        f = document.removeEventListener ? "removeEventListener" : "detachEvent";
    return e.createPointerEvent = function(t, n, r) {
        var i = n.gesture,
            s = n.target,
            o = t.changedTouches || e.proxy.getCoords(t);
        if (o.length) {
            var u = o[0];
            n.pointers = r ? [] : o, n.pageX = u.pageX, n.pageY = u.pageY, n.x = n.pageX, n.y = n.pageY
        }
        r = document.createEvent("Event"), r.initEvent(i, !0, !0), r.originalEvent = t;
        for (var a in n) r[a] = n[a];
        s.dispatchEvent(r)
    }, e.modifyEventListener && function() {
        var n = function(n) {
            var r = function(r) {
                var s = r + "EventListener",
                    o = n[s];
                n[s] = function(n, s, u) {
                    if (e.Gesture._gestureHandlers[n]) {
                        var a = u;
                        typeof u == "object" ? a.useCall = !0 : a = {
                            useCall: !0,
                            useCapture: u
                        }, t(this, n, s, a, r), o.call(this, n, s, u)
                    } else o.call(this, i(n), s, u)
                }
            };
            r("add"), r("remove")
        };
        navigator.userAgent.match(/Firefox/) ? (n(HTMLDivElement.prototype), n(HTMLCanvasElement.prototype)) : n(HTMLElement.prototype), n(document), n(window)
    }(), e.modifySelectors && function() {
        var e = NodeList.prototype;
        e.removeEventListener = function(e, t, n) {
            for (var r = 0, i = this.length; r < i; r++) this[r].removeEventListener(e, t, n)
        }, e.addEventListener = function(e, t, n) {
            for (var r = 0, i = this.length; r < i; r++) this[r].addEventListener(e, t, n)
        }
    }(), e
}(Event), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.pointerSetup = function(e, t) {
        e.doc = e.target.ownerDocument || e.target, e.minFingers = e.minFingers || e.fingers || 1, e.maxFingers = e.maxFingers || e.fingers || Infinity, e.position = e.position || "relative", t = t || {}, t.gesture = e.gesture, t.target = e.target, t.pointerType = Event.pointerType, Event.modifyEventListener && (e.listener = Event.createPointerEvent);
        var n = 0,
            r = t.gesture.indexOf("pointer") === 0 && Event.modifyEventListener ? "pointer" : "mouse";
        return t.proxy = function(n) {
            t.defaultListener = e.listener, e.listener = n, n(e.event, t)
        }, t.remove = function() {
            e.onPointerDown && Event.remove(e.target, r + "down", e.onPointerDown), e.onPointerMove && Event.remove(e.doc, r + "move", e.onPointerMove), e.onPointerUp && Event.remove(e.doc, r + "up", e.onPointerUp)
        }, t.resume = function(t) {
            e.onPointerMove && (!t || t.move) && Event.add(e.doc, r + "move", e.onPointerMove), e.onPointerUp && (!t || t.move) && Event.add(e.doc, r + "up", e.onPointerUp), e.fingers = n
        }, t.pause = function(t) {
            n = e.fingers, e.onPointerMove && (!t || t.move) && Event.remove(e.doc, r + "move", e.onPointerMove), e.onPointerUp && (!t || t.up) && Event.remove(e.doc, r + "up", e.onPointerUp), e.fingers = 0
        }, t
    }, e.pointerStart = function(t, n, r) {
        var i = function(e, t) {
            var n = r.bbox,
                i = o[t] = {};
            switch (r.position) {
                case "absolute":
                    i.offsetX = 0, i.offsetY = 0;
                    break;
                case "difference":
                    i.offsetX = e.pageX, i.offsetY = e.pageY;
                    break;
                case "move":
                    i.offsetX = e.pageX - n.x1, i.offsetY = e.pageY - n.y1;
                    break;
                default:
                    i.offsetX = n.x1, i.offsetY = n.y1
            }
            var s = (e.pageX + n.scrollLeft - i.offsetX) * n.scaleX,
                n = (e.pageY + n.scrollTop - i.offsetY) * n.scaleY;
            i.rotation = 0, i.scale = 1, i.startTime = i.moveTime = (new Date).getTime(), i.move = {
                x: s,
                y: n
            }, i.start = {
                x: s,
                y: n
            }, r.fingers++
        };
        r.event = t, n.defaultListener && (r.listener = n.defaultListener, delete n.defaultListener);
        for (var s = !r.fingers, o = r.tracker, t = t.changedTouches || e.getCoords(t), u = t.length, a = 0; a < u; a++) {
            var f = t[a],
                l = f.identifier || Infinity;
            if (r.fingers) {
                if (r.fingers >= r.maxFingers) {
                    i = [];
                    for (l in r.tracker) i.push(l);
                    return n.identifier = i.join(","), s
                }
                var h = 0,
                    p;
                for (p in o) {
                    if (o[p].up) {
                        delete o[p], i(f, l), r.cancel = !0;
                        break
                    }
                    h++
                }
                if (o[l]) continue
            } else o = r.tracker = {}, r.bbox = e.getBoundingBox(r.target), r.fingers = 0, r.cancel = !1;
            i(f, l)
        }
        i = [];
        for (l in r.tracker) i.push(l);
        return n.identifier = i.join(","), s
    }, e.pointerEnd = function(e, t, n, r) {
        for (var i = e.touches || [], s = i.length, o = {}, u = 0; u < s; u++) o[i[u].identifier || Infinity] = !0;
        for (var a in n.tracker) if (i = n.tracker[a], !o[a] && !i.up) r && (e.changedTouches = [{
            pageX: i.pageX,
            pageY: i.pageY,
            identifier: a === "Infinity" ? Infinity : a
        }], r(e, "up")), n.tracker[a].up = !0, n.fingers--;
        if (n.fingers !== 0) return !1;
        e = [], n.gestureFingers = 0;
        for (var f in n.tracker) n.gestureFingers++, e.push(f);
        return t.identifier = e.join(","), !0
    }, e.getCoords = function(t) {
        return e.getCoords = typeof t.pageX != "undefined" ? function(e) {
            return Array({
                type: "mouse",
                x: e.pageX,
                y: e.pageY,
                pageX: e.pageX,
                pageY: e.pageY,
                identifier: Infinity
            })
        } : function(e) {
            return e = e || window.event, Array({
                type: "mouse",
                x: e.clientX + document.documentElement.scrollLeft,
                y: e.clientY + document.documentElement.scrollTop,
                pageX: e.clientX + document.documentElement.scrollLeft,
                pageY: e.clientY + document.documentElement.scrollTop,
                identifier: Infinity
            })
        }, e.getCoords(t)
    }, e.getCoord = function(t) {
        if ("ontouchstart" in window) {
            var n = 0,
                r = 0;
            e.getCoord = function(e) {
                return e = e.changedTouches, e.length ? {
                    x: n = e[0].pageX,
                    y: r = e[0].pageY
                } : {
                    x: n,
                    y: r
                }
            }
        } else e.getCoord = typeof t.pageX != "undefined" && typeof t.pageY != "undefined" ? function(e) {
            return {
                x: e.pageX,
                y: e.pageY
            }
        } : function(e) {
            return e = e || window.event, {
                x: e.clientX + document.documentElement.scrollLeft,
                y: e.clientY + document.documentElement.scrollTop
            }
        };
        return e.getCoord(t)
    }, e.getBoundingBox = function(e) {
        if (e === window || e === document) e = document.body;
        var t = {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            scrollLeft: 0,
            scrollTop: 0
        };
        e === document.body ? (t.height = window.innerHeight, t.width = window.innerWidth) : (t.height = e.offsetHeight, t.width = e.offsetWidth), t.scaleX = e.width / t.width || 1, t.scaleY = e.height / t.height || 1;
        for (var n = e; n !== null;) t.x1 += n.offsetLeft, t.y1 += n.offsetTop, n = n.offsetParent;
        for (n = e.parentNode; n !== null;) {
            if (n === document.body) break;
            if (n.scrollTop === void 0) break;
            t.scrollLeft += n.scrollLeft, t.scrollTop += n.scrollTop, n = n.parentNode
        }
        return t.x2 = t.x1 + t.width, t.y2 = t.y1 + t.height, t
    },
    function() {
        var t = navigator.userAgent.toLowerCase(),
            n = t.indexOf("macintosh") !== -1,
            r = n && t.indexOf("khtml") !== -1 ? {
                91: !0,
                93: !0
            } : n && t.indexOf("firefox") !== -1 ? {
                224: !0
            } : {
                17: !0
            };
        e.isMetaKey = function(e) {
            return !!r[e.keyCode]
        }, e.metaTracker = function(t) {
            r[t.keyCode] && (e.metaKey = t.type === "keydown")
        }
    }(), e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.click = function(t) {
        t.maxFingers = t.maxFingers || t.fingers || 1;
        var n;
        t.onPointerDown = function(n) {
            e.pointerStart(n, r, t) && (Event.add(t.doc, "mousemove", t.onPointerMove).listener(n), Event.add(t.doc, "mouseup", t.onPointerUp))
        }, t.onPointerMove = function(e) {
            n = e
        }, t.onPointerUp = function(s) {
            if (e.pointerEnd(s, r, t) && (Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp), !(n.cancelBubble && ++n.bubble > 1))) {
                var o = (n.changedTouches || e.getCoords(n))[0],
                    s = t.bbox,
                    u = e.getBoundingBox(t.target),
                    a = (o.pageX + s.scrollLeft - s.x1) * s.scaleX,
                    o = (o.pageY + s.scrollTop - s.y1) * s.scaleY;
                a > 0 && a < s.width && o > 0 && o < s.height && s.scrollTop === u.scrollTop && t.listener(n, r)
            }
        };
        var r = e.pointerSetup(t);
        return r.state = "click", Event.add(t.target, "mousedown", t.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.click = e.click, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.dbltap = e.dblclick = function(t) {
        t.maxFingers = t.maxFingers || t.fingers || 1;
        var n, r, i, s, o;
        t.onPointerDown = function(a) {
            var l = a.changedTouches || e.getCoords(a);
            n && !r ? (o = l[0], r = (new Date).getTime() - n) : (s = l[0], n = (new Date).getTime(), r = 0, clearTimeout(i), i = setTimeout(function() {
                n = 0
            }, 700)), e.pointerStart(a, u, t) && (Event.add(t.doc, "mousemove", t.onPointerMove).listener(a), Event.add(t.doc, "mouseup", t.onPointerUp))
        }, t.onPointerMove = function(u) {
            n && !r && (o = (u.changedTouches || e.getCoords(u))[0]);
            var u = t.bbox,
                a = (o.pageX + u.scrollLeft - u.x1) * u.scaleX,
                l = (o.pageY + u.scrollTop - u.y1) * u.scaleY;
            a > 0 && a < u.width && l > 0 && l < u.height && Math.abs(o.pageX - s.pageX) <= 25 && Math.abs(o.pageY - s.pageY) <= 25 || (Event.remove(t.doc, "mousemove", t.onPointerMove), clearTimeout(i), n = r = 0)
        }, t.onPointerUp = function(s) {
            e.pointerEnd(s, u, t) && (Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp)), n && r && (r <= 700 && !(s.cancelBubble && ++s.bubble > 1) && (u.state = t.gesture, t.listener(s, u)), clearTimeout(i), n = r = 0)
        };
        var u = e.pointerSetup(t);
        return u.state = "dblclick", Event.add(t.target, "mousedown", t.onPointerDown), u
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.dbltap = e.dbltap, Event.Gesture._gestureHandlers.dblclick = e.dblclick, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.dragElement = function(t, n) {
        e.drag({
            event: n,
            target: t,
            position: "move",
            listener: function(e, n) {
                t.style.left = n.x + "px", t.style.top = n.y + "px"
            }
        })
    }, e.drag = function(t) {
        t.gesture = "drag", t.onPointerDown = function(r) {
            e.pointerStart(r, n, t) && (Event.add(t.doc, "mousemove", t.onPointerMove), Event.add(t.doc, "mouseup", t.onPointerUp)), t.onPointerMove(r, "down")
        }, t.onPointerMove = function(r, s) {
            for (var o = t.bbox, u = r.changedTouches || e.getCoords(r), a = u.length, f = 0; f < a; f++) {
                var l = u[f],
                    h = l.identifier || Infinity,
                    p = t.tracker[h];
                p && (p.pageX = l.pageX, p.pageY = l.pageY, n.state = s || "move", n.identifier = h, n.start = p.start, n.fingers = 1, n.x = (p.pageX + o.scrollLeft - p.offsetX) * o.scaleX, n.y = (p.pageY + o.scrollTop - p.offsetY) * o.scaleY, t.listener(r, n))
            }
        }, t.onPointerUp = function(r) {
            e.pointerEnd(r, n, t, t.onPointerMove) && (Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp))
        };
        var n = e.pointerSetup(t);
        return t.event ? t.onPointerDown(t.event) : Event.add(t.target, "mousedown", t.onPointerDown), n
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.drag = e.drag, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    var t = Math.PI / 180;
    return e.gesture = function(n) {
        n.minFingers = n.minFingers || n.fingers || 2, n.onPointerDown = function(t) {
            var i = n.fingers;
            e.pointerStart(t, r, n) && (Event.add(n.doc, "mousemove", n.onPointerMove), Event.add(n.doc, "mouseup", n.onPointerUp));
            if (n.fingers === n.minFingers && i !== n.fingers) {
                r.fingers = n.minFingers, r.scale = 1, r.rotation = 0, r.state = "start";
                var i = "",
                    s;
                for (s in n.tracker) i += s;
                r.identifier = parseInt(i), n.listener(t, r)
            }
        }, n.onPointerMove = function(s) {
            for (var o = n.bbox, u = n.tracker, a = s.changedTouches || e.getCoords(s), f = a.length, l = 0; l < f; l++) {
                var h = a[l],
                    p = h.identifier || Infinity,
                    v = u[p];
                v && (v.move.x = (h.pageX + o.scrollLeft - o.x1) * o.scaleX, v.move.y = (h.pageY + o.scrollTop - o.y1) * o.scaleY)
            }
            if (!(n.fingers < n.minFingers)) {
                var a = [],
                    m = v = l = o = 0,
                    f = 0;
                for (p in u) h = u[p], h.up || (v += h.move.x, m += h.move.y, f++);
                v /= f, m /= f;
                for (p in u) if (h = u[p], !h.up) {
                    f = h.start;
                    if (!f.distance) {
                        var g = f.x - v,
                            y = f.y - m;
                        f.distance = Math.sqrt(g * g + y * y), f.angle = Math.atan2(g, y) / t
                    }
                    var g = h.move.x - v,
                        y = h.move.y - m,
                        b = Math.sqrt(g * g + y * y);
                    o += b / f.distance, g = Math.atan2(g, y) / t, f = (f.angle - g + 360) % 360 - 180, h.DEG2 = h.DEG1, h.DEG1 = f > 0 ? f : -f, typeof h.DEG2 != "undefined" && (f > 0 ? h.rotation += h.DEG1 - h.DEG2 : h.rotation -= h.DEG1 - h.DEG2, l += h.rotation), a.push(h.move)
                }
                r.touches = a, r.fingers = n.fingers, r.scale = o / n.fingers, r.rotation = l / n.fingers, r.state = "change", n.listener(s, r)
            }
        }, n.onPointerUp = function(t) {
            var i = n.fingers;
            e.pointerEnd(t, r, n) && (Event.remove(n.doc, "mousemove", n.onPointerMove), Event.remove(n.doc, "mouseup", n.onPointerUp)), i === n.minFingers && n.fingers < n.minFingers && (r.fingers = n.fingers, r.state = "end", n.listener(t, r))
        };
        var r = e.pointerSetup(n);
        return Event.add(n.target, "mousedown", n.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.gesture = e.gesture, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.pointerdown = e.pointermove = e.pointerup = function(t) {
        if (!t.target.isPointerEmitter) {
            var n = !0;
            t.onPointerDown = function(e) {
                n = !1, r.gesture = "pointerdown", t.listener(e, r)
            }, t.onPointerMove = function(e) {
                r.gesture = "pointermove", t.listener(e, r, n)
            }, t.onPointerUp = function(e) {
                n = !0, r.gesture = "pointerup", t.listener(e, r, !0)
            };
            var r = e.pointerSetup(t);
            return Event.add(t.target, "mousedown", t.onPointerDown), Event.add(t.target, "mousemove", t.onPointerMove), Event.add(t.doc, "mouseup", t.onPointerUp), t.target.isPointerEmitter = !0, r
        }
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.pointerdown = e.pointerdown, Event.Gesture._gestureHandlers.pointermove = e.pointermove, Event.Gesture._gestureHandlers.pointerup = e.pointerup, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.shake = function(e) {
        var t = {
            gesture: "devicemotion",
            acceleration: {},
            accelerationIncludingGravity: {},
            target: e.target,
            listener: e.listener,
            remove: function() {
                window.removeEventListener("devicemotion", s, !1)
            }
        }, n = (new Date).getTime(),
            r = {
                x: 0,
                y: 0,
                z: 0
            }, i = {
                x: {
                    count: 0,
                    value: 0
                },
                y: {
                    count: 0,
                    value: 0
                },
                z: {
                    count: 0,
                    value: 0
                }
            }, s = function(s) {
                var o = s.accelerationIncludingGravity;
                r.x = .8 * r.x + (1 - .8) * o.x, r.y = .8 * r.y + (1 - .8) * o.y, r.z = .8 * r.z + (1 - .8) * o.z, t.accelerationIncludingGravity = r, t.acceleration.x = o.x - r.x, t.acceleration.y = o.y - r.y, t.acceleration.z = o.z - r.z;
                if (e.gesture === "devicemotion") e.listener(s, t);
                else for (var o = (new Date).getTime(), u = 0; u < 3; u++) {
                    var a = "xyz" [u],
                        l = t.acceleration[a],
                        a = i[a],
                        h = Math.abs(l);
                    if (!(o - n < 1e3) && h > 4) if (l = o * l / h, h = Math.abs(l + a.value), a.value && h < 200) {
                        if (a.value = l, a.count++, a.count === 3) e.listener(s, t), n = o, a.value = 0, a.count = 0
                    } else a.value = l, a.count = 1
                }
            };
        if (window.addEventListener) return window.addEventListener("devicemotion", s, !1), t
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.shake = e.shake, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    var t = Math.PI / 180;
    return e.swipe = function(n) {
        n.snap = n.snap || 90, n.threshold = n.threshold || 1, n.onPointerDown = function(t) {
            e.pointerStart(t, r, n) && (Event.add(n.doc, "mousemove", n.onPointerMove).listener(t), Event.add(n.doc, "mouseup", n.onPointerUp))
        }, n.onPointerMove = function(t) {
            for (var t = t.changedTouches || e.getCoords(t), r = t.length, i = 0; i < r; i++) {
                var s = t[i],
                    o = n.tracker[s.identifier || Infinity];
                o && (o.move.x = s.pageX, o.move.y = s.pageY, o.moveTime = (new Date).getTime())
            }
        }, n.onPointerUp = function(s) {
            if (e.pointerEnd(s, r, n)) {
                Event.remove(n.doc, "mousemove", n.onPointerMove), Event.remove(n.doc, "mouseup", n.onPointerUp);
                var o, u, a, f, l;
                for (l in n.tracker) {
                    var h = n.tracker[l];
                    f = h.move.x - h.start.x;
                    var p = h.move.y - h.start.y;
                    u = Math.sqrt(f * f + p * p), h = h.moveTime - h.startTime, f = Math.atan2(f, p) / t + 180, u = h ? u / h : 0;
                    if (typeof a == "undefined") a = f, o = u;
                    else {
                        if (!(Math.abs(f - a) <= 20)) return;
                        a = (a + f) / 2, o = (o + u) / 2
                    }
                }
                o > n.threshold && (r.angle = -(((a / n.snap + .5 >> 0) * n.snap || 360) - 360), r.velocity = o, r.fingers = n.gestureFingers, r.state = "swipe", n.listener(s, r))
            }
        };
        var r = e.pointerSetup(n);
        return Event.add(n.target, "mousedown", n.onPointerDown), r
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.swipe = e.swipe, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.tap = e.longpress = function(t) {
        t.delay = t.delay || 500, t.timeout = t.timeout || 250;
        var n, r;
        t.onPointerDown = function(s) {
            e.pointerStart(s, i, t) && (n = (new Date).getTime(), Event.add(t.doc, "mousemove", t.onPointerMove).listener(s), Event.add(t.doc, "mouseup", t.onPointerUp), t.gesture === "longpress" && (r = setTimeout(function() {
                if (!(s.cancelBubble && ++s.bubble > 1)) {
                    var e = 0,
                        n;
                    for (n in t.tracker) {
                        if (t.tracker[n].end === !0) return;
                        if (t.cancel) return;
                        e++
                    }
                    i.state = "start", i.fingers = e, t.listener(s, i)
                }
            }, t.delay)))
        }, t.onPointerMove = function(n) {
            for (var r = t.bbox, n = n.changedTouches || e.getCoords(n), i = n.length, s = 0; s < i; s++) {
                var o = n[s],
                    u = t.tracker[o.identifier || Infinity];
                if (u) {
                    var a = (o.pageX + r.scrollLeft - r.x1) * r.scaleX,
                        o = (o.pageY + r.scrollTop - r.y1) * r.scaleY;
                    if (!(a > 0 && a < r.width && o > 0 && o < r.height && Math.abs(a - u.start.x) <= 25 && Math.abs(o - u.start.y) <= 25)) {
                        Event.remove(t.doc, "mousemove", t.onPointerMove), t.cancel = !0;
                        break
                    }
                }
            }
        }, t.onPointerUp = function(s) {
            e.pointerEnd(s, i, t) && (clearTimeout(r), Event.remove(t.doc, "mousemove", t.onPointerMove), Event.remove(t.doc, "mouseup", t.onPointerUp), !(s.cancelBubble && ++s.bubble > 1)) && (t.gesture === "longpress" ? i.state === "start" && (i.state = "end", t.listener(s, i)) : !t.cancel && !((new Date).getTime() - n > t.timeout) && (i.state = "tap", i.fingers = t.gestureFingers, t.listener(s, i)))
        };
        var i = e.pointerSetup(t);
        return Event.add(t.target, "mousedown", t.onPointerDown), i
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.tap = e.tap, Event.Gesture._gestureHandlers.longpress = e.longpress, e
}(Event.proxy), typeof Event == "undefined" && (Event = {}), typeof Event.proxy == "undefined" && (Event.proxy = {}), Event.proxy = function(e) {
    return e.wheel = function(e) {
        var t, n = e.timeout || 150,
            r = 0,
            i = {
                gesture: "wheel",
                state: "start",
                wheelDelta: 0,
                target: e.target,
                listener: e.listener,
                remove: function() {
                    e.target[u](a, s, !1)
                }
            }, s = function(s) {
                s = s || window.event, i.state = r++ ? "change" : "start", i.wheelDelta = s.detail ? s.detail * -40 : s.wheelDelta, e.listener(s, i), clearTimeout(t), t = setTimeout(function() {
                    r = 0, i.state = "end", i.wheelDelta = 0, e.listener(s, i)
                }, n)
            }, o = document.addEventListener ? "addEventListener" : "attachEvent",
            u = document.removeEventListener ? "removeEventListener" : "detachEvent",
            a = Event.supports("mousewheel") ? "mousewheel" : "DOMMouseScroll";
        return e.target[o](a, s, !1), i
    }, Event.Gesture = Event.Gesture || {}, Event.Gesture._gestureHandlers = Event.Gesture._gestureHandlers || {}, Event.Gesture._gestureHandlers.wheel = e.wheel, e
}(Event.proxy);
if (typeof sketch == "undefined") var sketch = {};
var sketch = function(e) {
    function t(e, t) {
        for (var n = 0; n < e.length; n++) t(e[n])
    }
    function n(e) {
        return e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), e = RegExp("[\\?&]" + e + "=([^&#]*)").exec(window.location.search), e == null ? "" : decodeURIComponent(e[1].replace(/\+/g, " "))
    }
    e.fromPNG = !0, e.onComplete = function() {
        e.growl.message("Sketchpad ♡’s HTML5"), e.setupTool("select"), e.setToolMenu(e.tool.type), e.ui.buildConfigure(e.tool.type), e.windows.restore(), e.loader.stop()
    }, Event.add(window, "load", function() {
        avgrundInit(), document.querySelector("#foxy-configure").onmousedown = function(e) {
            return sketch.dragElement(this, e), !1
        }, document.querySelector("#foxy-tools").onmousedown = function(e) {
            sketch.dragElement(this, e)
        }, t(document.querySelectorAll("#foxy-tools img"), function(e) {
            e.onmousedown = Event.stop
        }), t(document.querySelectorAll("#foxy-tools button"), function(e) {
            e.onclick = function() {
                sketch.setTool(this.id.substr(5))
            }
        }), t(document.querySelectorAll(".scroller"), function(e) {
            e.onmousedown = Event.stop
        }), linkify("a"), e.container = document.querySelector(".meny-contents"), DOMLoader.link("http://fonts.googleapis.com/css?family=Capriola"), e.thumbnailer = new widgets.Thumbnailer, e.fileSaver = new widgets.FileSaver({
            jsDir: "./inc/"
        }), e.loader = new widgets.Loader("starting..."), e.growl = new widgets.Growl, e.text = Vector.Text, e.construct({
            width: window.innerWidth,
            height: window.innerHeight,
            scale: 1,
            container: document.getElementById("canvas_container"),
            configure: e.configure
        });
        for (var r in SVGButtons) for (var s in SVGButtons[r]) {
            var o = r + "-" + s,
                u = SVGButtons[r][s],
                a = document.createElement("canvas").getContext("2d"),
                f = "#" + o,
                l = {};
            l[f] = u, e.area.buttons[o] = new Vector.SVG({
                ctx: a,
                src: f,
                srcs: l
            })
        }
        e.enableToolkit("area-text"), e.enableToolkit("area-media"), e.enableToolkit("brush"), e.enableToolkit("move"), e.enableToolkit("snapshot"), e.enableToolkit("shape"), e.enableToolkit("select"), Event.add(e.active.canvas, "contextmenu", Event.cancel), e.setupInterlace(localStorage.getItem("backdrop") || "dark"), e.setupUploader(), e.setupColorPicker(), e.setupKeyboardShortcuts(), window.location.search === "?newfile" ? e.onComplete() : (r = n("src"), e.sync = r || localStorage.getItem("sync"), r = e.sync ? e.sync : "docs/LionAlian", DOMLoader.sendRequest({
            url: "../getfile.php?src=" + r,
            onerror: function(e) {
                console.log(e)
            },
            onload: function(t) {
                var n = t.responseText;
                n ? e.loader.message("Decoding file...", function() {
                    e.TimeMachine.restoreFromJSON(n, e.onComplete)
                }) : e.onComplete()
            },
            progress: function(t) {
                var n = parseInt(this.getResponseHeader("Content-Length-Raw"));
                e.loader.message("Downloading file: " + (t.loaded / n * 100 >> 0) + "%")
            }
        }))
    }),
    function() {
        var t = document.createElement("canvas");
        e.supports = {}, e.supports.jpeg = t.toDataURL("image/jpeg").substr(0, 15) === "data:image/jpeg"
    }(), e.webintent = {
        save: function() {
            var e = sketch.toDataURL(),
                e = new Intent("http://webintents.org/save", "image/*", e);
            navigator.startActivity(e)
        },
        open: function() {
            var t = new Intent("http://webintents.org/pick", "image/*");
            navigator.startActivity(t, function(t) {
                e.render.fileToImage(t, function(t) {
                    t.type = "png", t.name = "", e.addMedia(t)
                })
            })
        },
        share: function() {
            var e = new Intent("http://webintents.org/share", "image/*", imageBlob || url);
            navigator.startActivity(e)
        }
    }, e.filepicker = {
        save: function() {
            var e = document.createElement("canvas");
            DOMLoader.script.add({
                src: "https://api.filepicker.io/v0/filepicker.js",
                verify: "filepicker",
                callback: function() {
                    filepicker.setKey("AmXVSjplaSwalHIqs9E6Qz"), filepicker.getUrlFromData(e.toDataURL(), function(e) {
                        filepicker.saveAs(e, "image/png", function(e) {
                            console.log(e)
                        })
                    })
                }
            })
        },
        open: function() {
            DOMLoader.script.add({
                src: "https://api.filepicker.io/v0/filepicker.js",
                verify: "filepicker",
                callback: function() {
                    filepicker.setKey("AmXVSjplaSwalHIqs9E6Qz"), filepicker.getFile(filepicker.MIMETYPES.ALL, {
                        modal: !0
                    }, function(t, n) {
                        var r = new Image;
                        r.onload = function() {
                            r.type = "png", r.name = n.filename, e.addMedia(r)
                        }, r.src = t, console.log(t)
                    })
                }
            })
        }
    }, e.setupInterlace = function(t) {
        e.backdrop = t;
        var n = t === "dark" ? e.createMedia.interlace(8, "#111", "#222").data : e.createMedia.interlace(8, "#fff", "#eee").data;
        e.canvas2d.container.style.background = "url(" + n + ")", e.renderActions("root.setupInterlace"), localStorage.setItem("backdrop", t)
    }, e.setupKeyboardShortcuts = function() {
        var t = e.toolkits.select.keyboardShortcuts,
            n = document.getElementById("shortcuts"),
            r = "",
            i;
        for (i in t) if (i.substr(0, 5) === "break") r += '<div class="break">' + t[i] + "</div>";
        else {
            for (var s = [], o = t[i].split("."), u = 0; u < o.length; u++) s.push("<span>" + o[u] + "</span>");
            r += '<div class="cmd">' + s.join(" & ") + '</div>					  <font color="#666">&nbsp;: &nbsp;</font>' + i + "<br>"
        }
        n.innerHTML = r
    }, e.setToolMenu = function(e) {
        if ((e = document.getElementById("tool-" + e)) && e.parentNode) {
            var t = e.parentNode.querySelector(".selected");
            t && (t.className = (" " + t.className + " ").replace(" selected ", " ").trim()), e.className = (" " + e.className + " ").replace(" selected ", " ") + " selected".trim()
        }
    }, e.setTool = function(t) {
        switch (t) {
            case "undo":
                e.actions.deselectAll(), e.TimeMachine.undoAction();
                return;
            case "redo":
                e.actions.deselectAll(), e.TimeMachine.redoAction();
                return;
            case "color":
                e.ColorPicker.toggle();
                return;
            case "snapshot":
                e.growl.message("Click & drag to create your screenshot.");
                break;
            case "open":
            case "save":
            case "help":
                if (avgrund.active) avgrund.deactivate();
                else {
                    var n = document.querySelector("#avgrund-" + t),
                        r = document.querySelector("#avgrund-content");
                    e.lazyloader("#avgrund-" + t + " .lazy"), e.avgrund(n.innerHTML), r.querySelector("input") && sketch.uploader.initFileInput(r.querySelector("input"))
                }
                return;
            default:
                e.actions.deselectAll()
        }
        e.setToolMenu(t), e.ui.buildConfigure(t), e.renderActions("root.color.picker"), e.setupTool(t)
    }, e.avgrund = function(e) {
        document.querySelector("#avgrund-content").innerHTML = e, avgrund.activate()
    }, e.lazyloader = function(e) {
        for (var e = document.querySelectorAll(e), t = 0; t < e.length; t++) {
            var n = e[t];
            n.src = n.getAttribute("data-src"), n.className = (" " + n.className + " ").replace(" lazy ", " ").trim()
        }
    };
    var r;
    return Event.add(window, "resize", function() {
        clearTimeout(r), r = setTimeout(function() {
            e.setSize(window.innerWidth, window.innerHeight), e.renderActions("root.color.picker"), e.windows.restore()
        }, 100)
    }), Event.add(window, "focus load", function() {
        Event.proxy.metaKey = !1, e.actions.copies = JSON.parse(localStorage.getItem("copies"))
    }), Event.add(window, "beforeunload blur", function() {
        Event.proxy.metaKey = !1, localStorage.setItem("copies", e.actions.clone(e.actions.copies, !0))
    }), Event.add(window, "load", function() {
        var t = e.container;
        Event.add(t, "scroll", function() {
            for (var n = e.canvas2d.container.querySelectorAll("canvas"), r = 0; r < n.length; r++) n[r].style.top = t.scrollTop + "px", n[r].style.left = t.scrollLeft + "px";
            for (var i in e.actions.data) e.actions.data[i].dirtyTransform = !0;
            e.renderActions("container.onscroll")
        })
    }), Event.add(window, "keyup keydown", Event.proxy.metaTracker), e
}(sketch),
    mergeObject = function(e, t) {
        if (!e || typeof e != "object") return e;
        for (var n in e) t[n] = !e[n] || typeof e[n] != "object" ? e[n] : mergeObject(e[n], t[n] || new e[n].constructor);
        return t
    }, clone = function(e) {
        if (!e || typeof e != "object") return e;
        var t = new e.constructor,
            n;
        for (n in e) t[n] = !e[n] || typeof e[n] != "object" ? e[n] : clone(e[n]);
        return t
    };
typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    var t = document.createElement("canvas"),
        n = t.getContext("2d");
    return e.createMedia = {}, e.createMedia.interlace = function(e, t, n) {
        var r = document.createElement("canvas").getContext("2d");
        return r.canvas.width = e * 2, r.canvas.height = e * 2, r.fillStyle = t, r.fillRect(0, 0, e, e), r.fillStyle = n, r.fillRect(e, 0, e, e), r.fillStyle = n, r.fillRect(0, e, e, e), r.fillStyle = t, r.fillRect(e, e, e, e), e = r.createPattern(r.canvas, "repeat"), e.data = r.canvas.toDataURL(), e
    }, e.createMedia.rangeBar = function(e) {
        t.width = 234, t.height = 19, n.clearRect(0, 8, 233, 30), n.fillStyle = "#151515";
        if (e) {
            for (var r = n.createLinearGradient(0, 0, 233, 0), s = 0, o = e.length; s < o; s++) r.addColorStop(s / (o - 1 || 1), e[s]);
            n.fillStyle = r
        } else n.fillStyle = "#333";
        e = .5, n.lineWidth = .25, n.strokeStyle = "#000", Vector.Shapes.roundRect(n, e, 8, e + 233, 6, 5), n.fill(), n.stroke(), n.save(), n.globalAlpha = .07, r = n.createLinearGradient(0, 8, 0, 13), r.addColorStop(0, "#fff"), r.addColorStop(1, "#111"), n.fillStyle = r, n.fill(), n.restore(), r = 0, n.beginPath();
        for (s = 0; s <= 225; s += 22.5) e = Math.round(s) + 0 + 4.5, n.moveTo(e, 6), n.lineTo(e, 8 - (r % 5 ? 4 : 5)), n.strokeStyle = "#888", n.stroke(), n.beginPath(), r++;
        return t.toDataURL()
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.Generate = {}, e.Generate.FontPreview = function(t) {
        var n = e.canvas2d.layers.cache,
            r = n.getContext("2d");
        document.body.appendChild(n), n.style.cssText = "";
        var i = [],
            s = [],
            o = [];
        if (t) o.push(e.media.text["Cherry Cream Soda"]), s.push("Cherry Cream Soda");
        else for (var u in e.media.text) s.push(u), o.push(e.media.text[u]);
        console.log(s.join());
        var a = e.createQueue({
            items: o,
            onComplete: function() {
                e.loader.stop(), sketch.fileSaver.download({
                    fileName: "FontPreview",
                    fileType: "zip",
                    format: "base64",
                    getData: function() {
                        return i
                    }
                })
            },
            getNext: function(e) {
                sketch.text.attach({
                    family: e.family,
                    href: "http://fonts.googleapis.com/css?family=" + e.family + ":" + e.variants[0],
                    callback: function() {
                        n.width = n.width, r.textAlign = "center", r.font = "60px '" + e.family + "'", r.textBaseline = "middle";
                        var t = r.measureText(e.family).width,
                            s = sketch.text.measureTextHeight(e.family, r.font),
                            t = Math.min(n.width / (t + 40), n.height / (s + 10));
                        t < 1 && (r.font = t * 60 + "px '" + e.family + "'"), r.fillText(e.family, n.width / 2, n.height / 2), i.push({
                            name: e.family + ".png",
                            data: n.toDataURL()
                        }), setTimeout(a.getNext, 100)
                    }
                })
            }
        })
    }, e.Generate.SVGPreview = function() {
        var t = e.canvas2d.layers.cache;
        document.body.appendChild(t), t.style.cssText = "";
        var n = [],
            r = e.media.clipart,
            i;
        for (i in r) for (var s in r[i]) console.log(s), n.push("./media/clipart/" + s);
        var o = {}, u = e.createQueue({
            items: n,
            onComplete: function() {
                e.loader.stop(), sketch.fileSaver.download({
                    fileName: "SVGPreview",
                    fileType: "zip",
                    format: "base64",
                    getData: function() {
                        return o
                    }
                })
            },
            getNext: function(n) {
                new Vector.SVG({
                    ctx: t.ctx,
                    src: n,
                    srcs: e.actions.srcs,
                    onload: function(e) {
                        var r = e.viewBox,
                            i = r[2] - r[0],
                            r = r[3] - r[1],
                            i = (new Vector.Transform).scale(Math.min(42 / i, 42 / r));
                        t.width = 42, t.height = 42, e.render({
                            ctx: this.ctx,
                            matrix: i.matrix
                        }), i = n.split("/"), e = i[3], o[e] || (o[e] = []);
                        var i = i.pop().replace("svg", "png"),
                            r = t.toDataURL(),
                            s = new Image;
                        s.src = r, document.body.appendChild(s), o[e].push({
                            name: i,
                            data: r
                        }), u.getNext()
                    }
                })
            }
        })
    }, sketch
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    function t(e) {
        var t = document.createElement("select");
        t.onmousedown = Event.stop, t.onchange = e.onchange, e.element.appendChild(t);
        var n = document.createElement("optgroup");
        n.label = e.label;
        for (var r in e.data) {
            var i = document.createElement("option");
            e.selected === r && (i.selected = "selected"), i.innerHTML = r, n.appendChild(i)
        }
        t.appendChild(n)
    }
    return e.ui = {}, e.ui.buildRanges = function(t) {
        function n() {
            var e = document.createElement("div");
            e.className = "break", i.appendChild(e)
        }
        function r(n) {
            var r = document.createElement("div");
            r.className = "slider";
            var u = document.createElement("span");
            u.className = "title", u.innerHTML = n.title, r.appendChild(u), u = document.createElement("span"), u.className = "values";
            for (var a = n.value.length ? n.value : [n.value], f = new widgets.Range({
                min: n.min,
                max: n.max,
                gradient: n.gradient,
                value: a.toString(),
                className: "range",
                onchange: function(r, i) {
                    r.element.parentNode.querySelector(".value" + i.index).value = n.max > 10 ? Math.round(i.value) : Math.round(i.value * 10) / 10;
                    if (r.state !== "load") {
                        var o = r.element.parentNode.querySelector(".title").innerHTML,
                            o = o[0].toLowerCase() + o.substr(1);
                        if (!(i = s[o])) return console.log("missing tool: " + o);
                        typeof i.min != "undefined" && i.max && r.thumbs.length === 1 ? (i.min = r.thumbs[0].value, i.max = r.thumbs[0].value) : typeof i.min != "undefined" && i.max ? (i.min = r.thumbs[0].value, i.max = r.thumbs[1].value) : i.value = r.thumbs[0].value;
                        var u = e.actions.getToolkit(t);
                        typeof i.max != "undefined" ? u.device && (u.device[o] = clone(i)) : u.device && (u.device[o] = i.value);
                        var u = [],
                            a = [],
                            f = e.actions.selection,
                            l;
                        for (l in f) {
                            var h = e.actions.data[l];
                            if (h.type === t) {
                                r.state === "start" && h && (r.lastValue = clone(h[o])), h || e.actions.getToolkit(t), typeof i.max != "undefined" ? h && (h[o] = clone(i)) : h && (h[o] = i.value), h && h.toolkit && (h.dirty = !0, h.toolkit.updateActionSize(h));
                                if (r.state === "end" && h) {
                                    var p = {
                                        id: h.id
                                    }, d = {
                                        id: h.id
                                    };
                                    p[o] = r.lastValue, d[o] = h[o], u.push(p), a.push(d)
                                }
                            }
                        }
                        u.length && a.length && (e.TimeMachine.store(u), e.TimeMachine.store(a)), e.renderActions("GUI")
                    }
                }
            }), l = 0; l < a.length; l++) {
                var h = document.createElement("input");
                h.className = "value" + l, h.value = a[l], h.onmousedown = Event.stop, h.onkeydown = h.onkeyup = h.onchange = function(e) {
                    Event.stop(e);
                    var e = this.value.replace(o, ""),
                        t = parseInt(this.className.substr(5)),
                        n = f.thumbs[t],
                        e = Math.max(f.min, Math.min(f.max, e));
                    n.value !== e && (n.value = e, f.update(t))
                }, u.appendChild(h), a[l + 1] && (h = document.createElement("small"), h.innerHTML = "/", u.appendChild(h))
            }
            return r.appendChild(u), r.appendChild(f.element), i.appendChild(r), f
        }
        var i = document.getElementById("configure");
        document.querySelectorAll(".range"), i.innerHTML = "";
        var s = e.configure.tools[t];
        if (s) {
            var o = /[^0-9]/gi,
                u = e.configure.defaults,
                a = {}, f;
            for (f in s) if (u[f]) {
                var l = s[f];
                if (l && l.clamp) {
                    var h = typeof l.max == "undefined" ? l.value : [l.min, l.max];
                    f === "flow" && (h = h[0]);
                    var p = l.clamp.max,
                        d = l.clamp.min;
                    n(), a[f] = r({
                        title: f[0].toUpperCase() + f.substr(1),
                        gradient: l.gradient,
                        min: d,
                        max: p,
                        value: h
                    })
                }
            }
            e.ui.stateConfigure = a
        }
    }, e.ui.updateRanges = function(t) {
        var n = e.actions.data[e.actions.id],
            r = n ? n.toolkit : e.actions.getToolkit(t),
            i;
        for (i in e.ui.stateConfigure) {
            var s = e.ui.stateConfigure[i],
                o = void 0;
            n && (o = n[i]), typeof o == "undefined" && r.device && (o = r.device[i]), typeof o == "undefined" && (o = e.actions.cloneConfigure(e.configure.tools[t][i])), o = typeof o.max != "undefined" ? [o.min, o.max] : o;
            if (s.thumbs.length === 2) {
                if (s.thumbs[0].value !== o[0] || s.thumbs[1].value !== o[1]) s.thumbs[0].value = o[0], s.thumbs[1].value = o[1], s.update(0, "load"), s.update(1, "load")
            } else if (o = o[0] || o, s.thumbs[0].value !== o) s.thumbs[0].value = o, s.update(0, "load")
        }
    }, e.ui.brushes = {}, e.ui.buildConfigure = function(n) {
        function r(t, n) {
            u.innerHTML = "", u.style.display = "none";
            var r = e.media[t + "_credits"];
            if (r && r[n]) {
                u.style.display = "block";
                var r = r[n],
                    i = document.createElement("a");
                i.href = r.url, i.target = "_blank", i.className = "roll";
                var s = document.createElement("span");
                s.setAttribute("data-title", r.name), s.innerHTML = r.name, i.appendChild(s), u.appendChild(document.createTextNode("By: ")), u.appendChild(i)
            }
        }
        if (n = n || e.tool.type) {
            var s = document.getElementById("foxy-configure"),
                o = s.getAttribute("type");
            s.setAttribute("type", n), n !== o ? e.ui.buildRanges(n) : e.ui.updateRanges(n);
            if (" move select snapshot ".indexOf(" " + n + " ") !== -1) e.foxybox.close("foxy-configure");
            else {
                e.foxybox.open("foxy-configure");
                var u = document.querySelector(".credits");
                u.innerHTML = "", u.style.display = "none";
                var a = e.actions.data[e.actions.id] || e.configure.tools[n],
                    o = document.querySelector("#foxy-configure .header");
                o.innerHTML = "", n === "svg" && (n = "clipart"), e.brushes[n.ucfirst()] ? (a = n.ucfirst(), t({
                    label: "Brushes",
                    element: o,
                    selected: a,
                    data: e.brushes,
                    onchange: function() {
                        var t = this.options[this.selectedIndex].innerHTML.toLowerCase(),
                            n = document.querySelector(".paintbrush");
                        document.querySelector(".paintbrush img").src = e.brushes[t.ucfirst()], n.id = "tool-" + t, e.setTool(t)
                    }
                })) : (a = e.media[n] && n !== "text" ? a.src.split("/")[3] : "", o.innerHTML = n[0].toUpperCase() + n.substr(1)),
                function(t, i) {
                    var o, u;
                    e.ui.stateItems = [];
                    var a = n !== "text" || i,
                        l = e.media[n],
                        h = s.querySelector(".scroller");
                    a && (h.innerHTML = "");
                    if (l) {
                        if (!l[t]) for (t in l) break;
                        r(n, t);
                        if (n === "text") {
                            o = 195, u = 38;
                            var p = 260,
                                v = 6,
                                m = 1,
                                g;
                            for (g in e.media.text) e.ui.stateItems.push("./media/font-preview/" + g + ".png")
                        } else {
                            p = 156, v = 16, m = 4, o = 38, u = 38;
                            for (var y in l) for (g in l[y]) n === "stamp" ? e.ui.stateItems.push("./media/brush/" + g.replace("original", "thumb")) : e.ui.stateItems.push("./media/" + n + "-preview/" + g.replace(".svg", ".png"))
                        }
                        h.updateTime = (new Date).getTime(), h.scrollTop = 0, h.style.cssText = "max-height: " + p + "px;", h.onscroll = function() {
                            h.updateTime = (new Date).getTime(), window.clearTimeout(h.timeout), h.timeout = window.setTimeout(function() {
                                for (var t = Math.floor(h.scrollTop / h.scrollHeight * e.ui.stateItems.length / m) * m, n = t; n < t + v; n++) {
                                    var r = e.ui.stateItems[n];
                                    r && r.image && !r.image.src && (r.image.src = r.canvas.getAttribute("data-src"))
                                }
                            }, 100)
                        }, p = e.actions.data[e.actions.id], !p && n === "clipart" ? p = e.configure.tools.svg : p || (p = e.configure.tools[n]), l = "", p && (p.src ? (l = p.src.replace("original", "thumb"), l = p.src.replace(".svg", ".png")) : p.fontFamily && (l = "./media/font/" + p.fontFamily + ".png")), p = !1;
                        for (g = 0; g < e.ui.stateItems.length; g++) {
                            y = e.ui.stateItems[g];
                            var b = y.replace("-preview/", "/"),
                                w = e.ui.brushes[y] || document.createElement("img"),
                                E = w.canvas || document.createElement("canvas");
                            b === l ? (p = E, E.className = "selected") : E.className = "", w.canvas || (E.width = o, E.height = u, E.style.width = o + "px", E.style.height = u + "px", E.setAttribute("data-src", y), E.setAttribute("data-n", g), E.onmousedown = function(e) {
                                e.preventDefault()
                            }, E.onclick = function() {
                                e.loader.stopPropagation = !0;
                                var t = sketch.tool.type === "select",
                                    i = e.actions.selection,
                                    s;
                                for (s in i) break;
                                var o = typeof s != "undefined",
                                    u = function() {
                                        if (t && o) e.setupTool("select");
                                        else {
                                            var n = document.getElementById("tool-" + sketch.tool.type),
                                                r = n.parentNode.querySelector(".selected");
                                            r && (r.className = ""), n.className = "selected", e.active.canvas.width = e.active.canvas.width
                                        }
                                        e.loader.stop()
                                    }, a = e.actions.data[e.actions.id];
                                if (n === "stamp") {
                                    var f = this.getAttribute("data-src").replace("thumb", "live"),
                                        l = f.split("/").pop();
                                    e.configure.tools.stamp.src = f;
                                    var h = [],
                                        p = [];
                                    if (o) for (s in i)(a = e.actions.data[s]) && a.type === "stamp" && (h.push({
                                        id: a.id,
                                        src: a.src
                                    }), p.push({
                                        id: a.id,
                                        src: f
                                    }), a.dirtyRender = !0, a.src = f);
                                    h.length && p.length ? (e.TimeMachine.store(h), e.TimeMachine.store(p), e.loadActions()) : e.setupTool("stamp", u), r(n, f.split("/")[3])
                                } else if (n === "clipart") {
                                    f = this.getAttribute("data-src").replace(".png", ".svg").replace("-preview", ""), l = f.split("/").pop(), a = e.toolkits["area-media"], e.configure.tools.svg.src = f, a.style.src = f, a.style.render = void 0, h = [], p = [];
                                    if (o) for (s in i)(a = e.actions.data[s]) && a.type === "svg" && (h.push({
                                        id: a.id,
                                        src: a.src
                                    }), p.push({
                                        id: a.id,
                                        src: f
                                    }), a.dirtyRender = !0, a.src = f);
                                    h.length && p.length ? (e.TimeMachine.store(h), e.TimeMachine.store(p), e.loadActions()) : e.setupTool("svg", u)
                                } else {
                                    l = this.getAttribute("data-src").replace("./media/font-preview/", "").replace(".png", ""), a = e.toolkits["area-text"], a.style.fontFamily = l, e.configure.tools[n].fontFamily = l, h = [], p = [];
                                    if (o) for (s in i)(a = e.actions.data[s]) && a.type === "text" && (h.push({
                                        id: a.id,
                                        fontFamily: a.fontFamily
                                    }), p.push({
                                        id: a.id,
                                        fontFamily: l
                                    }), a.fontFamily = l, a.dirtyRender = !0);
                                    h.length && p.length ? (e.TimeMachine.store(h), e.TimeMachine.store(p), e.loadActions()) : e.setupTool("text", u)
                                }
                                if (i = this.parentNode.querySelector(".selected")) i.className = "";
                                this.className = "selected", n !== "clipart" && (i && (i = i.getContext("2d"), i.fillStyle = "#fff", i.fillRect(0, 0, this.width, this.height)), i = this.getContext("2d"), i.fillStyle = "#000", i.fillRect(0, 0, this.width, this.height))
                            }, w.canvas = E, w.onload = function() {
                                e.thumbnailer.generate({
                                    src: this,
                                    canvas: this.canvas,
                                    maxWidth: o,
                                    maxHeight: u,
                                    callback: function(e) {
                                        if (n !== "clipart") {
                                            var t = e.getContext("2d");
                                            t.globalCompositeOperation = "source-atop", t.fillStyle = e.className ? "#000" : "#fff", t.fillRect(0, 0, e.width, e.height)
                                        }
                                    }
                                })
                            }), g < v && (w.src = y, e.ui.brushes[y] = w), a && (h.appendChild(E), e.ui.stateItems[g] = {
                                image: w,
                                canvas: E
                            })
                        }
                        p && (h.scrollTop = p.offsetTop - E.height - 10, h.onscroll())
                    }
                }(a, !0)
            }
        }
    }, sketch
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.brushes = {
        Calligraphy: "./media/ux/tools/Calligraphy_2.png",
        Paintbrush: "./media/ux/tools/Brush_2.png",
        Pencil: "./media/ux/tools/Pencil_2.png",
        Streamer: "./media/ux/tools/Brush_2.png"
    }, e.media = {}, e.media.clipart = {
        animal: {
            "animal/1216139760278927551lemmling_Cartoon_cow.svg": "1216139760278927551lemmling_Cartoon_cow.svg",
            "animal/1300095062.svg": "1300095062.svg",
            "animal/Anonymous_Architetto_--_Dinosauri_05.svg": "Anonymous_Architetto_--_Dinosauri_05.svg",
            "animal/Anonymous_Architetto_--_Dinosauri_06.svg": "Anonymous_Architetto_--_Dinosauri_06.svg",
            "animal/antontw_BlackCat_with_White_Sockets.svg": "antontw_BlackCat_with_White_Sockets.svg",
            "animal/conejo.svg": "conejo.svg",
            "animal/FunDraw_dot_com_Coloring_Book_Octopus.svg": "FunDraw_dot_com_Coloring_Book_Octopus.svg",
            "animal/Gerald_G_Cartoon_Cat_Sitting.svg": "Gerald_G_Cartoon_Cat_Sitting.svg",
            "animal/gth.svg": "gth.svg",
            "animal/JazzyNico_Dino_Simple_T-REX.svg": "JazzyNico_Dino_Simple_T-REX.svg",
            "animal/Lucky_Beckoning_Cat.svg": "Lucky_Beckoning_Cat.svg",
            "animal/monster_truck.svg": "monster_truck.svg",
            "animal/MrBordello_Chimpzilla.svg": "MrBordello_Chimpzilla.svg",
            "animal/qilin.svg": "qilin.svg",
            "animal/rg1024_Little_octopus.svg": "rg1024_Little_octopus.svg",
            "animal/stone-giant.svg": "stone-giant.svg",
            "animal/StudioFibonacci_Cartoon_peacock.svg": "StudioFibonacci_Cartoon_peacock.svg",
            "animal/StudioFibonacci_Cartoon_Pterodactyl.svg": "StudioFibonacci_Cartoon_Pterodactyl.svg",
            "animal/StudioFibonacci_Cartoon_triceratops.svg": "StudioFibonacci_Cartoon_triceratops.svg"
        },
        Monsters: {
            "Monsters/monster0.svg": "monster0.svg",
            "Monsters/monster1.svg": "monster1.svg",
            "Monsters/monster2.svg": "monster2.svg",
            "Monsters/monster3.svg": "monster3.svg",
            "Monsters/monster4.svg": "monster4.svg",
            "Monsters/monster5.svg": "monster5.svg",
            "Monsters/monster6.svg": "monster6.svg",
            "Monsters/monster7.svg": "monster7.svg",
            "Monsters/monster8.svg": "monster8.svg"
        },
        people: {
            "people/1300463358.svg": "1300463358.svg",
            "people/archer.svg": "archer.svg",
            "people/burglar.svg": "burglar.svg",
            "people/centaur.svg": "centaur.svg",
            "people/dwarf.svg": "dwarf.svg",
            "people/girl_with_lantern.svg": "girl_with_lantern.svg",
            "people/johnny_automatic_geisha_playing_shamisen.svg": "johnny_automatic_geisha_playing_shamisen.svg",
            "people/ninja.svg": "ninja.svg"
        },
        plants: {
            "plants/1313071007.svg": "1313071007.svg",
            "plants/automne.svg": "automne.svg",
            "plants/baronchon_palm_trees_1.svg": "baronchon_palm_trees_1.svg",
            "plants/ete.svg": "ete.svg",
            "plants/mekonee_29_vegetables_set_1.svg": "mekonee_29_vegetables_set_1.svg",
            "plants/mekonee_29_vegetables_set_2.svg": "mekonee_29_vegetables_set_2.svg",
            "plants/mekonee_29_vegetables_set_7.svg": "mekonee_29_vegetables_set_7.svg",
            "plants/molumen_fern.svg": "molumen_fern.svg",
            "plants/rg1024_country_landscape_.svg": "rg1024_country_landscape_.svg",
            "plants/spring.svg": "spring.svg",
            "plants/treehouse.svg": "treehouse.svg"
        }
    }, e.media.stamp = {
        Basic: {
            "Basic/0-original.png": "0-original.png",
            "Basic/1-original.png": "1-original.png"
        },
        Butterflies: {
            "Butterflies/0-original.png": "0-original.png",
            "Butterflies/1-original.png": "1-original.png",
            "Butterflies/10-original.png": "10-original.png",
            "Butterflies/11-original.png": "11-original.png",
            "Butterflies/12-original.png": "12-original.png",
            "Butterflies/13-original.png": "13-original.png",
            "Butterflies/14-original.png": "14-original.png",
            "Butterflies/15-original.png": "15-original.png",
            "Butterflies/16-original.png": "16-original.png",
            "Butterflies/17-original.png": "17-original.png",
            "Butterflies/18-original.png": "18-original.png",
            "Butterflies/19-original.png": "19-original.png",
            "Butterflies/2-original.png": "2-original.png",
            "Butterflies/20-original.png": "20-original.png",
            "Butterflies/21-original.png": "21-original.png",
            "Butterflies/22-original.png": "22-original.png",
            "Butterflies/23-original.png": "23-original.png",
            "Butterflies/24-original.png": "24-original.png",
            "Butterflies/25-original.png": "25-original.png",
            "Butterflies/26-original.png": "26-original.png",
            "Butterflies/3-original.png": "3-original.png",
            "Butterflies/4-original.png": "4-original.png",
            "Butterflies/5-original.png": "5-original.png",
            "Butterflies/6-original.png": "6-original.png",
            "Butterflies/7-original.png": "7-original.png",
            "Butterflies/8-original.png": "8-original.png",
            "Butterflies/9-original.png": "9-original.png"
        },
        Doodles: {
            "Doodles/0-original.png": "0-original.png",
            "Doodles/1-original.png": "1-original.png",
            "Doodles/10-original.png": "10-original.png",
            "Doodles/2-original.png": "2-original.png",
            "Doodles/3-original.png": "3-original.png",
            "Doodles/4-original.png": "4-original.png",
            "Doodles/5-original.png": "5-original.png",
            "Doodles/6-original.png": "6-original.png",
            "Doodles/7-original.png": "7-original.png",
            "Doodles/8-original.png": "8-original.png",
            "Doodles/9-original.png": "9-original.png"
        },
        Flowers: {
            "Flowers/0-original.png": "0-original.png",
            "Flowers/1-original.png": "1-original.png",
            "Flowers/10-original.png": "10-original.png",
            "Flowers/11-original.png": "11-original.png",
            "Flowers/12-original.png": "12-original.png",
            "Flowers/13-original.png": "13-original.png",
            "Flowers/14-original.png": "14-original.png",
            "Flowers/15-original.png": "15-original.png",
            "Flowers/16-original.png": "16-original.png",
            "Flowers/17-original.png": "17-original.png",
            "Flowers/18-original.png": "18-original.png",
            "Flowers/19-original.png": "19-original.png",
            "Flowers/2-original.png": "2-original.png",
            "Flowers/20-original.png": "20-original.png",
            "Flowers/21-original.png": "21-original.png",
            "Flowers/22-original.png": "22-original.png",
            "Flowers/23-original.png": "23-original.png",
            "Flowers/24-original.png": "24-original.png",
            "Flowers/25-original.png": "25-original.png",
            "Flowers/26-original.png": "26-original.png",
            "Flowers/27-original.png": "27-original.png",
            "Flowers/3-original.png": "3-original.png",
            "Flowers/4-original.png": "4-original.png",
            "Flowers/5-original.png": "5-original.png",
            "Flowers/6-original.png": "6-original.png",
            "Flowers/7-original.png": "7-original.png",
            "Flowers/8-original.png": "8-original.png",
            "Flowers/9-original.png": "9-original.png"
        },
        Footprints: {
            "Footprints/0-original.png": "0-original.png",
            "Footprints/1-original.png": "1-original.png",
            "Footprints/10-original.png": "10-original.png",
            "Footprints/11-original.png": "11-original.png",
            "Footprints/12-original.png": "12-original.png",
            "Footprints/13-original.png": "13-original.png",
            "Footprints/14-original.png": "14-original.png",
            "Footprints/15-original.png": "15-original.png",
            "Footprints/16-original.png": "16-original.png",
            "Footprints/17-original.png": "17-original.png",
            "Footprints/2-original.png": "2-original.png",
            "Footprints/3-original.png": "3-original.png",
            "Footprints/4-original.png": "4-original.png",
            "Footprints/5-original.png": "5-original.png",
            "Footprints/6-original.png": "6-original.png",
            "Footprints/7-original.png": "7-original.png",
            "Footprints/8-original.png": "8-original.png",
            "Footprints/9-original.png": "9-original.png"
        },
        Leafs: {
            "Leafs/0-original.png": "0-original.png",
            "Leafs/1-original.png": "1-original.png",
            "Leafs/10-original.png": "10-original.png",
            "Leafs/11-original.png": "11-original.png",
            "Leafs/12-original.png": "12-original.png",
            "Leafs/13-original.png": "13-original.png",
            "Leafs/14-original.png": "14-original.png",
            "Leafs/15-original.png": "15-original.png",
            "Leafs/16-original.png": "16-original.png",
            "Leafs/17-original.png": "17-original.png",
            "Leafs/18-original.png": "18-original.png",
            "Leafs/19-original.png": "19-original.png",
            "Leafs/2-original.png": "2-original.png",
            "Leafs/20-original.png": "20-original.png",
            "Leafs/21-original.png": "21-original.png",
            "Leafs/22-original.png": "22-original.png",
            "Leafs/23-original.png": "23-original.png",
            "Leafs/24-original.png": "24-original.png",
            "Leafs/25-original.png": "25-original.png",
            "Leafs/26-original.png": "26-original.png",
            "Leafs/27-original.png": "27-original.png",
            "Leafs/28-original.png": "28-original.png",
            "Leafs/29-original.png": "29-original.png",
            "Leafs/3-original.png": "3-original.png",
            "Leafs/30-original.png": "30-original.png",
            "Leafs/31-original.png": "31-original.png",
            "Leafs/32-original.png": "32-original.png",
            "Leafs/33-original.png": "33-original.png",
            "Leafs/34-original.png": "34-original.png",
            "Leafs/35-original.png": "35-original.png",
            "Leafs/36-original.png": "36-original.png",
            "Leafs/37-original.png": "37-original.png",
            "Leafs/38-original.png": "38-original.png",
            "Leafs/39-original.png": "39-original.png",
            "Leafs/4-original.png": "4-original.png",
            "Leafs/40-original.png": "40-original.png",
            "Leafs/41-original.png": "41-original.png",
            "Leafs/42-original.png": "42-original.png",
            "Leafs/43-original.png": "43-original.png",
            "Leafs/44-original.png": "44-original.png",
            "Leafs/45-original.png": "45-original.png",
            "Leafs/46-original.png": "46-original.png",
            "Leafs/47-original.png": "47-original.png",
            "Leafs/48-original.png": "48-original.png",
            "Leafs/49-original.png": "49-original.png",
            "Leafs/5-original.png": "5-original.png",
            "Leafs/6-original.png": "6-original.png",
            "Leafs/7-original.png": "7-original.png",
            "Leafs/8-original.png": "8-original.png",
            "Leafs/9-original.png": "9-original.png"
        },
        Light: {
            "Light/0-original.png": "0-original.png",
            "Light/1-original.png": "1-original.png",
            "Light/10-original.png": "10-original.png",
            "Light/11-original.png": "11-original.png",
            "Light/12-original.png": "12-original.png",
            "Light/13-original.png": "13-original.png",
            "Light/14-original.png": "14-original.png",
            "Light/2-original.png": "2-original.png",
            "Light/3-original.png": "3-original.png",
            "Light/4-original.png": "4-original.png",
            "Light/5-original.png": "5-original.png",
            "Light/6-original.png": "6-original.png",
            "Light/7-original.png": "7-original.png",
            "Light/8-original.png": "8-original.png",
            "Light/9-original.png": "9-original.png"
        },
        Retro: {
            "Retro/0-original.png": "0-original.png",
            "Retro/1-original.png": "1-original.png",
            "Retro/10-original.png": "10-original.png",
            "Retro/11-original.png": "11-original.png",
            "Retro/12-original.png": "12-original.png",
            "Retro/13-original.png": "13-original.png",
            "Retro/14-original.png": "14-original.png",
            "Retro/15-original.png": "15-original.png",
            "Retro/16-original.png": "16-original.png",
            "Retro/17-original.png": "17-original.png",
            "Retro/18-original.png": "18-original.png",
            "Retro/19-original.png": "19-original.png",
            "Retro/2-original.png": "2-original.png",
            "Retro/20-original.png": "20-original.png",
            "Retro/21-original.png": "21-original.png",
            "Retro/22-original.png": "22-original.png",
            "Retro/23-original.png": "23-original.png",
            "Retro/24-original.png": "24-original.png",
            "Retro/25-original.png": "25-original.png",
            "Retro/26-original.png": "26-original.png",
            "Retro/27-original.png": "27-original.png",
            "Retro/28-original.png": "28-original.png",
            "Retro/29-original.png": "29-original.png",
            "Retro/3-original.png": "3-original.png",
            "Retro/4-original.png": "4-original.png",
            "Retro/5-original.png": "5-original.png",
            "Retro/6-original.png": "6-original.png",
            "Retro/7-original.png": "7-original.png",
            "Retro/8-original.png": "8-original.png",
            "Retro/9-original.png": "9-original.png"
        },
        "Simple Smudges": {
            "Simple Smudges/0-original.png": "0-original.png",
            "Simple Smudges/1-original.png": "1-original.png",
            "Simple Smudges/10-original.png": "10-original.png",
            "Simple Smudges/11-original.png": "11-original.png",
            "Simple Smudges/12-original.png": "12-original.png",
            "Simple Smudges/13-original.png": "13-original.png",
            "Simple Smudges/2-original.png": "2-original.png",
            "Simple Smudges/3-original.png": "3-original.png",
            "Simple Smudges/4-original.png": "4-original.png",
            "Simple Smudges/5-original.png": "5-original.png",
            "Simple Smudges/6-original.png": "6-original.png",
            "Simple Smudges/7-original.png": "7-original.png",
            "Simple Smudges/8-original.png": "8-original.png",
            "Simple Smudges/9-original.png": "9-original.png"
        },
        Tizzape: {
            "Tizzape/0-original.png": "0-original.png",
            "Tizzape/1-original.png": "1-original.png",
            "Tizzape/10-original.png": "10-original.png",
            "Tizzape/11-original.png": "11-original.png",
            "Tizzape/12-original.png": "12-original.png",
            "Tizzape/13-original.png": "13-original.png",
            "Tizzape/14-original.png": "14-original.png",
            "Tizzape/15-original.png": "15-original.png",
            "Tizzape/16-original.png": "16-original.png",
            "Tizzape/17-original.png": "17-original.png",
            "Tizzape/18-original.png": "18-original.png",
            "Tizzape/19-original.png": "19-original.png",
            "Tizzape/2-original.png": "2-original.png",
            "Tizzape/3-original.png": "3-original.png",
            "Tizzape/4-original.png": "4-original.png",
            "Tizzape/5-original.png": "5-original.png",
            "Tizzape/6-original.png": "6-original.png",
            "Tizzape/7-original.png": "7-original.png",
            "Tizzape/8-original.png": "8-original.png",
            "Tizzape/9-original.png": "9-original.png"
        },
        Typogrunge: {
            "Typogrunge/0-original.png": "0-original.png",
            "Typogrunge/1-original.png": "1-original.png",
            "Typogrunge/10-original.png": "10-original.png",
            "Typogrunge/11-original.png": "11-original.png",
            "Typogrunge/12-original.png": "12-original.png",
            "Typogrunge/13-original.png": "13-original.png",
            "Typogrunge/14-original.png": "14-original.png",
            "Typogrunge/15-original.png": "15-original.png",
            "Typogrunge/16-original.png": "16-original.png",
            "Typogrunge/17-original.png": "17-original.png",
            "Typogrunge/18-original.png": "18-original.png",
            "Typogrunge/19-original.png": "19-original.png",
            "Typogrunge/2-original.png": "2-original.png",
            "Typogrunge/20-original.png": "20-original.png",
            "Typogrunge/21-original.png": "21-original.png",
            "Typogrunge/22-original.png": "22-original.png",
            "Typogrunge/23-original.png": "23-original.png",
            "Typogrunge/3-original.png": "3-original.png",
            "Typogrunge/4-original.png": "4-original.png",
            "Typogrunge/5-original.png": "5-original.png",
            "Typogrunge/6-original.png": "6-original.png",
            "Typogrunge/7-original.png": "7-original.png",
            "Typogrunge/8-original.png": "8-original.png",
            "Typogrunge/9-original.png": "9-original.png"
        },
        "Water Colors": {
            "Water Colors/0-original.png": "0-original.png",
            "Water Colors/1-original.png": "1-original.png",
            "Water Colors/10-original.png": "10-original.png",
            "Water Colors/11-original.png": "11-original.png",
            "Water Colors/12-original.png": "12-original.png",
            "Water Colors/13-original.png": "13-original.png",
            "Water Colors/14-original.png": "14-original.png",
            "Water Colors/15-original.png": "15-original.png",
            "Water Colors/16-original.png": "16-original.png",
            "Water Colors/2-original.png": "2-original.png",
            "Water Colors/3-original.png": "3-original.png",
            "Water Colors/4-original.png": "4-original.png",
            "Water Colors/5-original.png": "5-original.png",
            "Water Colors/6-original.png": "6-original.png",
            "Water Colors/7-original.png": "7-original.png",
            "Water Colors/8-original.png": "8-original.png",
            "Water Colors/9-original.png": "9-original.png"
        }
    }, e.media.stamp_credits = {
        Butterflies: {
            email: "bulletproof.cupidx@gmail.com",
            url: "http://dead-brushes.deviantart.com/art/ps7-butterfly-brushes-61623697",
            name: "dead-brushes"
        },
        Doodles: {
            email: "punksafetypin@gmail.com",
            url: "http://punksafetypin.deviantart.com/art/Brush-Set-21-Boney-Doodles-57365483",
            name: "punksafetypin"
        },
        Flowers: {
            email: "ir@hawksmont.com",
            url: "http://hawksmont.com/",
            name: "hawksmont"
        },
        Footprints: {
            email: "jonas@rognemedia.no",
            url: "http://chain.deviantart.com/art/Footprint-brushes-60108797",
            name: "chain"
        },
        Leafs: {
            email: "ir@hawksmont.com",
            url: "http://hawksmont.com/",
            name: "hawksmont"
        },
        Light: {
            email: "",
            url: "",
            name: ""
        },
        Retro: {
            email: "vivekdhage@gmail.com",
            url: "http://vwake.deviantart.com/art/Retr0-Brushes-1689219",
            name: "vwake"
        },
        "Simple Smudges": {
            email: "p.szczepanski@gmail.com",
            url: "http://env1ro.deviantart.com/art/SimpleSmudges-1-Brushes-Pack-52089760",
            name: "env1ro"
        },
        Tizzape: {
            email: "services@dirt2.com",
            url: "http://keepwaiting.deviantart.com/art/Tizzape-Tape-Brushes-29459997",
            name: "keepwaiting"
        },
        Typogrunge: {
            email: "",
            url: "http://scully7491.deviantart.com/art/Typographic-Grunge-Brushes-30565921",
            name: "scully7491"
        },
        "Water Colors": {
            email: "p.szczepanski@gmail.com",
            url: "http://env1ro.deviantart.com/art/WaterColor-Reloaded-98294189",
            name: "env1ro"
        }
    }, e.media.text = {
        "Open Sans": {
            family: "Open Sans",
            variants: "300,300italic,regular,italic,600,600italic,700,700italic,800,800italic".split(","),
            subsets: "latin,latin-ext,cyrillic,greek,vietnamese,greek-ext,cyrillic-ext".split(",")
        },
        "Droid Sans": {
            family: "Droid Sans",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Oswald: {
            family: "Oswald",
            variants: ["300", "regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        "Shadows Into Light Two": {
            family: "Shadows Into Light Two",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Droid Serif": {
            family: "Droid Serif",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Lobster: {
            family: "Lobster",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "PT Sans": {
            family: "PT Sans",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Yanone Kaffeesatz": {
            family: "Yanone Kaffeesatz",
            variants: ["200", "300", "regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Ubuntu: {
            family: "Ubuntu",
            variants: "300,300italic,regular,italic,500,500italic,700,700italic".split(","),
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        "Open Sans Condensed": {
            family: "Open Sans Condensed",
            variants: ["300", "300italic", "700"],
            subsets: "latin,latin-ext,cyrillic,greek,vietnamese,greek-ext,cyrillic-ext".split(",")
        },
        Lora: {
            family: "Lora",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Lato: {
            family: "Lato",
            variants: "100,100italic,300,300italic,regular,italic,700,700italic,900,900italic".split(","),
            subsets: ["latin"]
        },
        "PT Sans Narrow": {
            family: "PT Sans Narrow",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        Nunito: {
            family: "Nunito",
            variants: ["300", "regular", "700"],
            subsets: ["latin"]
        },
        Arvo: {
            family: "Arvo",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "Shadows Into Light": {
            family: "Shadows Into Light",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Francois One": {
            family: "Francois One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "The Girl Next Door": {
            family: "The Girl Next Door",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Crafty Girls": {
            family: "Crafty Girls",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Play: {
            family: "Play",
            variants: ["regular", "700"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        Merriweather: {
            family: "Merriweather",
            variants: ["300", "regular", "700", "900"],
            subsets: ["latin"]
        },
        Bitter: {
            family: "Bitter",
            variants: ["regular", "italic", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Cabin: {
            family: "Cabin",
            variants: "regular,italic,500,500italic,600,600italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        Questrial: {
            family: "Questrial",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Josefin Sans": {
            family: "Josefin Sans",
            variants: "100,100italic,300,300italic,regular,italic,600,600italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        "Just Me Again Down Here": {
            family: "Just Me Again Down Here",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Coming Soon": {
            family: "Coming Soon",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "PT Serif": {
            family: "PT Serif",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "cyrillic"]
        },
        "Marck Script": {
            family: "Marck Script",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Dancing Script": {
            family: "Dancing Script",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Arimo: {
            family: "Arimo",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Raleway: {
            family: "Raleway",
            variants: ["100"],
            subsets: ["latin"]
        },
        Vollkorn: {
            family: "Vollkorn",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Cantarell: {
            family: "Cantarell",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Rokkitt: {
            family: "Rokkitt",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Ubuntu Condensed": {
            family: "Ubuntu Condensed",
            variants: ["regular"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        Cuprum: {
            family: "Cuprum",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Fredoka One": {
            family: "Fredoka One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Nobile: {
            family: "Nobile",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Kreon: {
            family: "Kreon",
            variants: ["300", "regular", "700"],
            subsets: ["latin"]
        },
        Anton: {
            family: "Anton",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Philosopher: {
            family: "Philosopher",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "cyrillic"]
        },
        Calligraffitti: {
            family: "Calligraffitti",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Abel: {
            family: "Abel",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Pacifico: {
            family: "Pacifico",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Unkempt: {
            family: "Unkempt",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Chewy: {
            family: "Chewy",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Cherry Cream Soda": {
            family: "Cherry Cream Soda",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Asap: {
            family: "Asap",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Bree Serif": {
            family: "Bree Serif",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Rock Salt": {
            family: "Rock Salt",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Squada One": {
            family: "Squada One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Molengo: {
            family: "Molengo",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Comfortaa: {
            family: "Comfortaa",
            variants: ["300", "regular", "700"],
            subsets: ["latin", "latin-ext", "cyrillic", "greek", "cyrillic-ext"]
        },
        "Source Sans Pro": {
            family: "Source Sans Pro",
            variants: "200,200italic,300,300italic,regular,italic,600,600italic,700,700italic,900,900italic".split(","),
            subsets: ["latin", "latin-ext"]
        },
        "Merienda One": {
            family: "Merienda One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Reenie Beanie": {
            family: "Reenie Beanie",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Syncopate: {
            family: "Syncopate",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Luckiest Guy": {
            family: "Luckiest Guy",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Mate SC": {
            family: "Mate SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Righteous: {
            family: "Righteous",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Maven Pro": {
            family: "Maven Pro",
            variants: ["regular", "500", "700", "900"],
            subsets: ["latin"]
        },
        "Black Ops One": {
            family: "Black Ops One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Tangerine: {
            family: "Tangerine",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Changa One": {
            family: "Changa One",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Crushed: {
            family: "Crushed",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Metamorphous: {
            family: "Metamorphous",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Montserrat: {
            family: "Montserrat",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Anonymous Pro": {
            family: "Anonymous Pro",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        Judson: {
            family: "Judson",
            variants: ["regular", "italic", "700"],
            subsets: ["latin"]
        },
        Marvel: {
            family: "Marvel",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "Amatic SC": {
            family: "Amatic SC",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Quattrocento: {
            family: "Quattrocento",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        "Permanent Marker": {
            family: "Permanent Marker",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Crimson Text": {
            family: "Crimson Text",
            variants: "regular,italic,600,600italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        Cardo: {
            family: "Cardo",
            variants: ["regular", "italic", "700"],
            subsets: ["latin", "latin-ext", "greek", "greek-ext"]
        },
        "Walter Turncoat": {
            family: "Walter Turncoat",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Amaranth: {
            family: "Amaranth",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "News Cycle": {
            family: "News Cycle",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Limelight: {
            family: "Limelight",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Signika: {
            family: "Signika",
            variants: ["300", "regular", "600", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Dosis: {
            family: "Dosis",
            variants: "200,300,regular,500,600,700,800".split(","),
            subsets: ["latin", "latin-ext"]
        },
        "Gloria Hallelujah": {
            family: "Gloria Hallelujah",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Muli: {
            family: "Muli",
            variants: ["300", "300italic", "regular", "italic"],
            subsets: ["latin"]
        },
        "Architects Daughter": {
            family: "Architects Daughter",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Paytone One": {
            family: "Paytone One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Allerta: {
            family: "Allerta",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Copse: {
            family: "Copse",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Quicksand: {
            family: "Quicksand",
            variants: ["300", "regular", "700"],
            subsets: ["latin"]
        },
        "Droid Sans Mono": {
            family: "Droid Sans Mono",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Homemade Apple": {
            family: "Homemade Apple",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Lobster Two": {
            family: "Lobster Two",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "Josefin Slab": {
            family: "Josefin Slab",
            variants: "100,100italic,300,300italic,regular,italic,600,600italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        "PT Sans Caption": {
            family: "PT Sans Caption",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Waiting for the Sunrise": {
            family: "Waiting for the Sunrise",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Sunshiney: {
            family: "Sunshiney",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Voltaire: {
            family: "Voltaire",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Exo: {
            family: "Exo",
            variants: "100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic".split(","),
            subsets: ["latin", "latin-ext"]
        },
        "Indie Flower": {
            family: "Indie Flower",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Fanwood Text": {
            family: "Fanwood Text",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        "Just Another Hand": {
            family: "Just Another Hand",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "EB Garamond": {
            family: "EB Garamond",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "vietnamese", "cyrillic-ext"]
        },
        "Goudy Bookletter 1911": {
            family: "Goudy Bookletter 1911",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Leckerli One": {
            family: "Leckerli One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Covered By Your Grace": {
            family: "Covered By Your Grace",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Fontdiner Swanky": {
            family: "Fontdiner Swanky",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Happy Monkey": {
            family: "Happy Monkey",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Old Standard TT": {
            family: "Old Standard TT",
            variants: ["regular", "italic", "700"],
            subsets: ["latin"]
        },
        "Cabin Condensed": {
            family: "Cabin Condensed",
            variants: ["regular", "500", "600", "700"],
            subsets: ["latin"]
        },
        Bevan: {
            family: "Bevan",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Pontano Sans": {
            family: "Pontano Sans",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Bangers: {
            family: "Bangers",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Jura: {
            family: "Jura",
            variants: ["300", "regular", "500", "600"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        Oxygen: {
            family: "Oxygen",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Gentium Basic": {
            family: "Gentium Basic",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        Chivo: {
            family: "Chivo",
            variants: ["regular", "italic", "900", "900italic"],
            subsets: ["latin"]
        },
        Puritan: {
            family: "Puritan",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "Maiden Orange": {
            family: "Maiden Orange",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Berkshire Swash": {
            family: "Berkshire Swash",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Istok Web": {
            family: "Istok Web",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "Annie Use Your Telescope": {
            family: "Annie Use Your Telescope",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Schoolbell: {
            family: "Schoolbell",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Didact Gothic": {
            family: "Didact Gothic",
            variants: ["regular"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        Neucha: {
            family: "Neucha",
            variants: ["regular"],
            subsets: ["latin", "cyrillic"]
        },
        Slackey: {
            family: "Slackey",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Metrophobic: {
            family: "Metrophobic",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "IM Fell French Canon SC": {
            family: "IM Fell French Canon SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Inconsolata: {
            family: "Inconsolata",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Bilbo: {
            family: "Bilbo",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Quattrocento Sans": {
            family: "Quattrocento Sans",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        Actor: {
            family: "Actor",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Varela: {
            family: "Varela",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Spirax: {
            family: "Spirax",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Orbitron: {
            family: "Orbitron",
            variants: ["regular", "500", "700", "900"],
            subsets: ["latin"]
        },
        Viga: {
            family: "Viga",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Neuton: {
            family: "Neuton",
            variants: "200,300,regular,italic,700,800".split(","),
            subsets: ["latin", "latin-ext"]
        },
        "Allerta Stencil": {
            family: "Allerta Stencil",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Sancreek: {
            family: "Sancreek",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Gudea: {
            family: "Gudea",
            variants: ["regular", "italic", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Boogaloo: {
            family: "Boogaloo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Varela Round": {
            family: "Varela Round",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Shanti: {
            family: "Shanti",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Carter One": {
            family: "Carter One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Tinos: {
            family: "Tinos",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        "Fredericka the Great": {
            family: "Fredericka the Great",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Pinyon Script": {
            family: "Pinyon Script",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Loved by the King": {
            family: "Loved by the King",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Cabin Sketch": {
            family: "Cabin Sketch",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Nothing You Could Do": {
            family: "Nothing You Could Do",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Oleo Script": {
            family: "Oleo Script",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Share: {
            family: "Share",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        Carme: {
            family: "Carme",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Cantata One": {
            family: "Cantata One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Kameron: {
            family: "Kameron",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Special Elite": {
            family: "Special Elite",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Passion One": {
            family: "Passion One",
            variants: ["regular", "700", "900"],
            subsets: ["latin", "latin-ext"]
        },
        Rochester: {
            family: "Rochester",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Jockey One": {
            family: "Jockey One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Italianno: {
            family: "Italianno",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Short Stack": {
            family: "Short Stack",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Ropa Sans": {
            family: "Ropa Sans",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Love Ya Like A Sister": {
            family: "Love Ya Like A Sister",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Sansita One": {
            family: "Sansita One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Brawler: {
            family: "Brawler",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Fugaz One": {
            family: "Fugaz One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Mountains of Christmas": {
            family: "Mountains of Christmas",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Patua One": {
            family: "Patua One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Kranky: {
            family: "Kranky",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "PT Serif Caption": {
            family: "PT Serif Caption",
            variants: ["regular", "italic"],
            subsets: ["latin", "cyrillic"]
        },
        "Ubuntu Mono": {
            family: "Ubuntu Mono",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: "latin,latin-ext,cyrillic,greek,greek-ext,cyrillic-ext".split(",")
        },
        "Sorts Mill Goudy": {
            family: "Sorts Mill Goudy",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        Delius: {
            family: "Delius",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Italiana: {
            family: "Italiana",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Stardos Stencil": {
            family: "Stardos Stencil",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "IM Fell English": {
            family: "IM Fell English",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Cookie: {
            family: "Cookie",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Days One": {
            family: "Days One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Michroma: {
            family: "Michroma",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Lovers Quarrel": {
            family: "Lovers Quarrel",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Homenaje: {
            family: "Homenaje",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Kristi: {
            family: "Kristi",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Handlee: {
            family: "Handlee",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Gruppo: {
            family: "Gruppo",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Salsa: {
            family: "Salsa",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Bentham: {
            family: "Bentham",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Playfair Display": {
            family: "Playfair Display",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Six Caps": {
            family: "Six Caps",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Crete Round": {
            family: "Crete Round",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        Karla: {
            family: "Karla",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Volkhov: {
            family: "Volkhov",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Mako: {
            family: "Mako",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Rosario: {
            family: "Rosario",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Yellowtail: {
            family: "Yellowtail",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "IM Fell DW Pica": {
            family: "IM Fell DW Pica",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        MedievalSharp: {
            family: "MedievalSharp",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Marmelad: {
            family: "Marmelad",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Hammersmith One": {
            family: "Hammersmith One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Doppio One": {
            family: "Doppio One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Alice: {
            family: "Alice",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Acme: {
            family: "Acme",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Bowlby One SC": {
            family: "Bowlby One SC",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Lekton: {
            family: "Lekton",
            variants: ["regular", "italic", "700"],
            subsets: ["latin"]
        },
        "Noticia Text": {
            family: "Noticia Text",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext", "vietnamese"]
        },
        Cousine: {
            family: "Cousine",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Geo: {
            family: "Geo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Andika: {
            family: "Andika",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        Corben: {
            family: "Corben",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Give You Glory": {
            family: "Give You Glory",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Miltonian Tattoo": {
            family: "Miltonian Tattoo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Norican: {
            family: "Norican",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Nixie One": {
            family: "Nixie One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Sue Ellen Francisco": {
            family: "Sue Ellen Francisco",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Magra: {
            family: "Magra",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        "Delius Unicase": {
            family: "Delius Unicase",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Coustard: {
            family: "Coustard",
            variants: ["regular", "900"],
            subsets: ["latin"]
        },
        "Wire One": {
            family: "Wire One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Rancho: {
            family: "Rancho",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Prata: {
            family: "Prata",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Convergence: {
            family: "Convergence",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Damion: {
            family: "Damion",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Press Start 2P": {
            family: "Press Start 2P",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "greek"]
        },
        Pompiere: {
            family: "Pompiere",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Satisfy: {
            family: "Satisfy",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Telex: {
            family: "Telex",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Alfa Slab One": {
            family: "Alfa Slab One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Poly: {
            family: "Poly",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Economica: {
            family: "Economica",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        Antic: {
            family: "Antic",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Patrick Hand": {
            family: "Patrick Hand",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Spinnaker: {
            family: "Spinnaker",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Swanky and Moo Moo": {
            family: "Swanky and Moo Moo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Coda: {
            family: "Coda",
            variants: ["regular", "800"],
            subsets: ["latin"]
        },
        Baumans: {
            family: "Baumans",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Podkova: {
            family: "Podkova",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Ultra: {
            family: "Ultra",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Aldrich: {
            family: "Aldrich",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Dawning of a New Day": {
            family: "Dawning of a New Day",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Great Vibes": {
            family: "Great Vibes",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Redressed: {
            family: "Redressed",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Gochi Hand": {
            family: "Gochi Hand",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Aclonica: {
            family: "Aclonica",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Gravitas One": {
            family: "Gravitas One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Quantico: {
            family: "Quantico",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin"]
        },
        Average: {
            family: "Average",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Lusitana: {
            family: "Lusitana",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "IM Fell DW Pica SC": {
            family: "IM Fell DW Pica SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Condiment: {
            family: "Condiment",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        UnifrakturMaguntia: {
            family: "UnifrakturMaguntia",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Bowlby One": {
            family: "Bowlby One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "IM Fell English SC": {
            family: "IM Fell English SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Allan: {
            family: "Allan",
            variants: ["700"],
            subsets: ["latin"]
        },
        "Cedarville Cursive": {
            family: "Cedarville Cursive",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Rammetto One": {
            family: "Rammetto One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Megrim: {
            family: "Megrim",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Delius Swash Caps": {
            family: "Delius Swash Caps",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "La Belle Aurore": {
            family: "La Belle Aurore",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Lustria: {
            family: "Lustria",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Tienne: {
            family: "Tienne",
            variants: ["regular", "700", "900"],
            subsets: ["latin"]
        },
        "Gentium Book Basic": {
            family: "Gentium Book Basic",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext"]
        },
        Capriola: {
            family: "Capriola",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Advent Pro": {
            family: "Advent Pro",
            variants: "100,200,300,regular,500,600,700".split(","),
            subsets: ["latin", "latin-ext", "greek"]
        },
        Simonetta: {
            family: "Simonetta",
            variants: ["regular", "italic", "900", "900italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Poiret One": {
            family: "Poiret One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        Alike: {
            family: "Alike",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Nova Square": {
            family: "Nova Square",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Parisienne: {
            family: "Parisienne",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "IM Fell Great Primer SC": {
            family: "IM Fell Great Primer SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Ruluko: {
            family: "Ruluko",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Montez: {
            family: "Montez",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Abril Fatface": {
            family: "Abril Fatface",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Snippet: {
            family: "Snippet",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Candal: {
            family: "Candal",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Arapey: {
            family: "Arapey",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Caudex: {
            family: "Caudex",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["latin", "latin-ext", "greek", "greek-ext"]
        },
        Federo: {
            family: "Federo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Russo One": {
            family: "Russo One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        Overlock: {
            family: "Overlock",
            variants: "regular,italic,700,700italic,900,900italic".split(","),
            subsets: ["latin", "latin-ext"]
        },
        Rationale: {
            family: "Rationale",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Artifika: {
            family: "Artifika",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Contrail One": {
            family: "Contrail One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Glegoo: {
            family: "Glegoo",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Nova Round": {
            family: "Nova Round",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Dynalight: {
            family: "Dynalight",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Bad Script": {
            family: "Bad Script",
            variants: ["regular"],
            subsets: ["latin", "cyrillic"]
        },
        Vidaloka: {
            family: "Vidaloka",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Ruda: {
            family: "Ruda",
            variants: ["regular", "700", "900"],
            subsets: ["latin", "latin-ext"]
        },
        "Kaushan Script": {
            family: "Kaushan Script",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Tulpen One": {
            family: "Tulpen One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Forum: {
            family: "Forum",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "Ruslan Display": {
            family: "Ruslan Display",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "Nova Script": {
            family: "Nova Script",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Over the Rainbow": {
            family: "Over the Rainbow",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Kelly Slab": {
            family: "Kelly Slab",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        Adamina: {
            family: "Adamina",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Chau Philomene One": {
            family: "Chau Philomene One",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Expletus Sans": {
            family: "Expletus Sans",
            variants: "regular,italic,500,500italic,600,600italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        "Kotta One": {
            family: "Kotta One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Electrolize: {
            family: "Electrolize",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Yeseva One": {
            family: "Yeseva One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Asset: {
            family: "Asset",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Zeyada: {
            family: "Zeyada",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Tenor Sans": {
            family: "Tenor Sans",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "League Script": {
            family: "League Script",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Mystery Quest": {
            family: "Mystery Quest",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "IM Fell Great Primer": {
            family: "IM Fell Great Primer",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        "IM Fell French Canon": {
            family: "IM Fell French Canon",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Unna: {
            family: "Unna",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Radley: {
            family: "Radley",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        Codystar: {
            family: "Codystar",
            variants: ["300", "regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Holtwood One SC": {
            family: "Holtwood One SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Buda: {
            family: "Buda",
            variants: ["300"],
            subsets: ["latin"]
        },
        "IM Fell Double Pica SC": {
            family: "IM Fell Double Pica SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        UnifrakturCook: {
            family: "UnifrakturCook",
            variants: ["700"],
            subsets: ["latin"]
        },
        Ovo: {
            family: "Ovo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Shojumaru: {
            family: "Shojumaru",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Dorsa: {
            family: "Dorsa",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Meddon: {
            family: "Meddon",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Signika Negative": {
            family: "Signika Negative",
            variants: ["300", "regular", "600", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Andada: {
            family: "Andada",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Mate: {
            family: "Mate",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Imprima: {
            family: "Imprima",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "GFS Neohellenic": {
            family: "GFS Neohellenic",
            variants: ["regular", "italic", "700", "700italic"],
            subsets: ["greek"]
        },
        "Nova Slim": {
            family: "Nova Slim",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Smythe: {
            family: "Smythe",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Hanuman: {
            family: "Hanuman",
            variants: ["regular", "700"],
            subsets: ["khmer"]
        },
        Numans: {
            family: "Numans",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Nova Oval": {
            family: "Nova Oval",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Julee: {
            family: "Julee",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Voces: {
            family: "Voces",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Lilita One": {
            family: "Lilita One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Nova Mono": {
            family: "Nova Mono",
            variants: ["regular"],
            subsets: ["latin", "greek"]
        },
        "IM Fell Double Pica": {
            family: "IM Fell Double Pica",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Kenia: {
            family: "Kenia",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Nova Flat": {
            family: "Nova Flat",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Miniver: {
            family: "Miniver",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Vibur: {
            family: "Vibur",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Astloch: {
            family: "Astloch",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Enriqueta: {
            family: "Enriqueta",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        VT323: {
            family: "VT323",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Fjord One": {
            family: "Fjord One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Coda Caption": {
            family: "Coda Caption",
            variants: ["800"],
            subsets: ["latin"]
        },
        Petrona: {
            family: "Petrona",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Prociono: {
            family: "Prociono",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Geostar: {
            family: "Geostar",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Aladin: {
            family: "Aladin",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Irish Grover": {
            family: "Irish Grover",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Alegreya: {
            family: "Alegreya",
            variants: "regular,italic,700,700italic,900,900italic".split(","),
            subsets: ["latin", "latin-ext"]
        },
        Wallpoet: {
            family: "Wallpoet",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Sniglet: {
            family: "Sniglet",
            variants: ["800"],
            subsets: ["latin"]
        },
        Monoton: {
            family: "Monoton",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Linden Hill": {
            family: "Linden Hill",
            variants: ["regular", "italic"],
            subsets: ["latin"]
        },
        Graduate: {
            family: "Graduate",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Federant: {
            family: "Federant",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Modern Antiqua": {
            family: "Modern Antiqua",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Monofett: {
            family: "Monofett",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Aubrey: {
            family: "Aubrey",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Euphoria Script": {
            family: "Euphoria Script",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Bigshot One": {
            family: "Bigshot One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Sofia: {
            family: "Sofia",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Vast Shadow": {
            family: "Vast Shadow",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Miltonian: {
            family: "Miltonian",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Cambo: {
            family: "Cambo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Galdeano: {
            family: "Galdeano",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Sigmar One": {
            family: "Sigmar One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Armata: {
            family: "Armata",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Lancelot: {
            family: "Lancelot",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Nova Cut": {
            family: "Nova Cut",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Alike Angular": {
            family: "Alike Angular",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Goblin One": {
            family: "Goblin One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Inder: {
            family: "Inder",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Rouge Script": {
            family: "Rouge Script",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Allura: {
            family: "Allura",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Flamenco: {
            family: "Flamenco",
            variants: ["300", "regular"],
            subsets: ["latin"]
        },
        "Poller One": {
            family: "Poller One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Supermercado One": {
            family: "Supermercado One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Passero One": {
            family: "Passero One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Playball: {
            family: "Playball",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Smokum: {
            family: "Smokum",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Atomic Age": {
            family: "Atomic Age",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Alex Brush": {
            family: "Alex Brush",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Chelsea Market": {
            family: "Chelsea Market",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Cutive: {
            family: "Cutive",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Overlock SC": {
            family: "Overlock SC",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Geostar Fill": {
            family: "Geostar Fill",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "GFS Didot": {
            family: "GFS Didot",
            variants: ["regular"],
            subsets: ["greek"]
        },
        Niconne: {
            family: "Niconne",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Engagement: {
            family: "Engagement",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Belgrano: {
            family: "Belgrano",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Esteban: {
            family: "Esteban",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Londrina Solid": {
            family: "Londrina Solid",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Emblema One": {
            family: "Emblema One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Gorditas: {
            family: "Gorditas",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        "Jolly Lodger": {
            family: "Jolly Lodger",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Averia Sans Libre": {
            family: "Averia Sans Libre",
            variants: "300,300italic,regular,italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        Trochut: {
            family: "Trochut",
            variants: ["regular", "italic", "700"],
            subsets: ["latin"]
        },
        "Port Lligat Sans": {
            family: "Port Lligat Sans",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Buenard: {
            family: "Buenard",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Courgette: {
            family: "Courgette",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Piedra: {
            family: "Piedra",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Chango: {
            family: "Chango",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Averia Libre": {
            family: "Averia Libre",
            variants: "300,300italic,regular,italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        "Mr De Haviland": {
            family: "Mr De Haviland",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Creepster: {
            family: "Creepster",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Alegreya SC": {
            family: "Alegreya SC",
            variants: "regular,italic,700,700italic,900,900italic".split(","),
            subsets: ["latin", "latin-ext"]
        },
        Trocchi: {
            family: "Trocchi",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Audiowide: {
            family: "Audiowide",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Junge: {
            family: "Junge",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Fresca: {
            family: "Fresca",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Amethysta: {
            family: "Amethysta",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Antic Slab": {
            family: "Antic Slab",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Duru Sans": {
            family: "Duru Sans",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Sail: {
            family: "Sail",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Concert One": {
            family: "Concert One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "PT Mono": {
            family: "PT Mono",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"]
        },
        "Bubblegum Sans": {
            family: "Bubblegum Sans",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Henny Penny": {
            family: "Henny Penny",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Glass Antiqua": {
            family: "Glass Antiqua",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Eater: {
            family: "Eater",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Titan One": {
            family: "Titan One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Basic: {
            family: "Basic",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Knewave: {
            family: "Knewave",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Medula One": {
            family: "Medula One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Princess Sofia": {
            family: "Princess Sofia",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Almendra SC": {
            family: "Almendra SC",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Ruthie: {
            family: "Ruthie",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Qwigley: {
            family: "Qwigley",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Averia Serif Libre": {
            family: "Averia Serif Libre",
            variants: "300,300italic,regular,italic,700,700italic".split(","),
            subsets: ["latin"]
        },
        "Antic Didone": {
            family: "Antic Didone",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Stint Ultra Condensed": {
            family: "Stint Ultra Condensed",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Arizonia: {
            family: "Arizonia",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Suwannaphum: {
            family: "Suwannaphum",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        "Londrina Sketch": {
            family: "Londrina Sketch",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Frijole: {
            family: "Frijole",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Ledger: {
            family: "Ledger",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        "Mr Dafoe": {
            family: "Mr Dafoe",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Quando: {
            family: "Quando",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Rosarivo: {
            family: "Rosarivo",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        Yesteryear: {
            family: "Yesteryear",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Prosto One": {
            family: "Prosto One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext", "cyrillic"]
        },
        Lemon: {
            family: "Lemon",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Trade Winds": {
            family: "Trade Winds",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Mrs Sheppards": {
            family: "Mrs Sheppards",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Belleza: {
            family: "Belleza",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Cagliostro: {
            family: "Cagliostro",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Marko One": {
            family: "Marko One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Khmer: {
            family: "Khmer",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        Iceberg: {
            family: "Iceberg",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Revalia: {
            family: "Revalia",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Balthazar: {
            family: "Balthazar",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Habibi: {
            family: "Habibi",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Dr Sugiyama": {
            family: "Dr Sugiyama",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Krona One": {
            family: "Krona One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Iceland: {
            family: "Iceland",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Erica One": {
            family: "Erica One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Seaweed Script": {
            family: "Seaweed Script",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Asul: {
            family: "Asul",
            variants: ["regular", "700"],
            subsets: ["latin"]
        },
        Felipa: {
            family: "Felipa",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Peralta: {
            family: "Peralta",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Macondo Swash Caps": {
            family: "Macondo Swash Caps",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Fondamento: {
            family: "Fondamento",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        Devonshire: {
            family: "Devonshire",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Trykker: {
            family: "Trykker",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Chicle: {
            family: "Chicle",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Della Respira": {
            family: "Della Respira",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Londrina Shadow": {
            family: "Londrina Shadow",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Butterfly Kids": {
            family: "Butterfly Kids",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Caesar Dressing": {
            family: "Caesar Dressing",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Sevillana: {
            family: "Sevillana",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Averia Gruesa Libre": {
            family: "Averia Gruesa Libre",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Inika: {
            family: "Inika",
            variants: ["regular", "700"],
            subsets: ["latin", "latin-ext"]
        },
        "Sonsie One": {
            family: "Sonsie One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Flavors: {
            family: "Flavors",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Oldenburg: {
            family: "Oldenburg",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Emilys Candy": {
            family: "Emilys Candy",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Sirin Stencil": {
            family: "Sirin Stencil",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Nosifer: {
            family: "Nosifer",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Stoke: {
            family: "Stoke",
            variants: ["300", "regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Bilbo Swash Caps": {
            family: "Bilbo Swash Caps",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Aguafina Script": {
            family: "Aguafina Script",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Original Surfer": {
            family: "Original Surfer",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Amarante: {
            family: "Amarante",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Germania One": {
            family: "Germania One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Port Lligat Slab": {
            family: "Port Lligat Slab",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Londrina Outline": {
            family: "Londrina Outline",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Wellfleet: {
            family: "Wellfleet",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Battambang: {
            family: "Battambang",
            variants: ["regular", "700"],
            subsets: ["khmer"]
        },
        Fascinate: {
            family: "Fascinate",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Uncial Antiqua": {
            family: "Uncial Antiqua",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Stint Ultra Expanded": {
            family: "Stint Ultra Expanded",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Cantora One": {
            family: "Cantora One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Mrs Saint Delafield": {
            family: "Mrs Saint Delafield",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Spicy Rice": {
            family: "Spicy Rice",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Almendra: {
            family: "Almendra",
            variants: ["regular", "italic", "700"],
            subsets: ["latin", "latin-ext"]
        },
        Sarina: {
            family: "Sarina",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Unlock: {
            family: "Unlock",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Ribeye: {
            family: "Ribeye",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Ribeye Marrow": {
            family: "Ribeye Marrow",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Ewert: {
            family: "Ewert",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Jim Nightshade": {
            family: "Jim Nightshade",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Monsieur La Doulaise": {
            family: "Monsieur La Doulaise",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Plaster: {
            family: "Plaster",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Mr Bedfort": {
            family: "Mr Bedfort",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Eagle Lake": {
            family: "Eagle Lake",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Montaga: {
            family: "Montaga",
            variants: ["regular"],
            subsets: ["latin"]
        },
        McLaren: {
            family: "McLaren",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Macondo: {
            family: "Macondo",
            variants: ["regular"],
            subsets: ["latin"]
        },
        "Diplomata SC": {
            family: "Diplomata SC",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Metal Mania": {
            family: "Metal Mania",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Oregano: {
            family: "Oregano",
            variants: ["regular", "italic"],
            subsets: ["latin", "latin-ext"]
        },
        "Ruge Boogie": {
            family: "Ruge Boogie",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Life Savers": {
            family: "Life Savers",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Bonbon: {
            family: "Bonbon",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Butcherman: {
            family: "Butcherman",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Herr Von Muellerhoff": {
            family: "Herr Von Muellerhoff",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Racing Sans One": {
            family: "Racing Sans One",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Freehand: {
            family: "Freehand",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        Content: {
            family: "Content",
            variants: ["regular", "700"],
            subsets: ["khmer"]
        },
        Moul: {
            family: "Moul",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        Nokora: {
            family: "Nokora",
            variants: ["regular", "700"],
            subsets: ["khmer"]
        },
        "Miss Fajardose": {
            family: "Miss Fajardose",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Diplomata: {
            family: "Diplomata",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Ceviche One": {
            family: "Ceviche One",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Taprom: {
            family: "Taprom",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        Dangrek: {
            family: "Dangrek",
            variants: ["regular"],
            subsets: ["khmer"]
        },
        Arbutus: {
            family: "Arbutus",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        "Fascinate Inline": {
            family: "Fascinate Inline",
            variants: ["regular"],
            subsets: ["latin"]
        },
        Romanesco: {
            family: "Romanesco",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        },
        Galindo: {
            family: "Galindo",
            variants: ["regular"],
            subsets: ["latin", "latin-ext"]
        }
    }, sketch
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.setupColorPicker = function() {
        var t, n = new Color.Picker({
            color: "#008BE1",
            container: document.querySelector(".avgrund-contents"),
            eyedropMouseLayer: sketch.canvas2d.layers.active,
            eyedropLayer: sketch.canvas2d.layers.layer0,
            recordCoord: e.windows.record,
            modules: {
                hue: !0,
                satval: !0,
                alpha: !1
            },
            callback: function(n, r) {
                var s = Color.Space(n, "RGBA>W3");
                r === "up" && e.tool.changeColor && e.tool.changeColor(s);
                var o = e.configure.tools[sketch.tool.type];
                o.fill && (o.fill.color = s);
                var o = !1,
                    u = e.actions.selection,
                    a = [],
                    f = [],
                    l;
                for (l in u) {
                    var h = e.actions.data[l];
                    if (typeof h == "undefined") return;
                    var p = h.fillStyle ? "fillStyle" : "color";
                    r === "down" && (t = h[p]), s = h.type === "svg" || h.type === "image" ? Color.Space(n, "RGB>HEX24>W3") : Color.Space(n, "RGBA>W3"), e.defaultValues.colors = [0, s];
                    if (r === "up") {
                        var o = !0,
                            d = {
                                id: h.id
                            };
                        d[p] = t;
                        var v = {
                            id: h.id
                        };
                        v[p] = s, a.push(d), f.push(v)
                    }
                    h[p] = s, h.dirty = !0, e.area.updateColor(s)
                }
                o && (e.TimeMachine.store(a), e.TimeMachine.store(f)), e.renderActions("root.color.picker")
            }
        });
        n.updateFromAction = function(e, t, r) {
            r = r || e.color || e.fillStyle, n.update(r)
        }, e.ColorPicker = n
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    e.setupUploader = function() {
        e.uploader = new widgets.Uploader({
            confirm: "json",
            action: "../upload.php?upload=true",
            mode: "read",
            maxFiles: Infinity,
            fakeInput: document.getElementById("file-input"),
            dropAreaStyle: "position: absolute; background: rgba(0, 200, 0, 0.5);",
            dropAreaMessage: "Drop Files Here",
            formats: "jpg,jpeg,gif,png,svg,json",
            onChange: t,
            onProgress: function(t) {
                e.loader.message("Uploading: " + t.transferPercent + "%")
            },
            onError: function() {
                e.loader.stop()
            }
        })
    }, e.addMedia = function(t, n) {
        avgrund.deactivate(), typeof n == "undefined" && (n = function() {
            var t = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2
            }, n = t.x + 128,
                r = t.y + 128;
            e.tool.createAction({
                x: n,
                y: r,
                start: t,
                state: "down"
            }), e.tool.createAction({
                x: n,
                y: r,
                start: t,
                state: "up"
            }), e.actions.selection = {}, e.actions.selection[e.actions.id] = !0, e.setTool("select")
        }), e.loader.message(t.name);
        var r = t.name.split(".").pop();
        t.type.indexOf("svg") !== -1 ? (r = "#" + t.name, e.actions.srcs[r] = t.src, e.configure.tools.svg.src = r, e.setupTool("svg"), e.tool.loadResource(e.tool.style, n)) : r === "json" ? e.TimeMachine.restoreFromJSON(t.src, e.onComplete) : e.render.fileToCanvas(t, function(t, r) {
            var i = "#" + r.name;
            e.actions.srcs[i] = t.toDataURL(), e.configure.tools.image.src = i, e.setupTool("image"), e.tool.loadResource(e.tool.style, n)
        })
    };
    var t = function(t, n) {
        if (typeof n.pageX != "undefined") var r = Event.proxy.getCoord(n),
            i = {
                x: r.x,
                y: r.y
            };
        else i = {
            x: window.innerWidth / 3,
            y: window.innerHeight / 3
        };
        var s = 0,
            o = {}, u = function() {
                var t = i.x + 128,
                    n = i.y + 128;
                e.tool.createAction({
                    x: t,
                    y: n,
                    start: i,
                    state: "down"
                }), e.tool.createAction({
                    x: t,
                    y: n,
                    start: i,
                    state: "up"
                }), o[e.actions.id] = !0, s++, i.x += 25, i.y += 25, window.setTimeout(a.getNext, 50)
            }, a = e.createQueue({
                items: t.changedFiles,
                onComplete: function() {
                    s !== 1 && (e.actions.deselectAll(), e.actions.selection = o, e.renderActions()), e.ui.buildConfigure(e.tool.type), e.setToolMenu("select"), e.setupTool("select"), e.loader.stop()
                },
                getNext: function(t) {
                    e.addMedia(t, u)
                }
            })
    };
    return e
}(sketch), document.addEventListener("load", function() {}, !1), document.addEventListener("load", function() {
    window.webkitIntent && window.webkitIntent.postResult(window.webkitIntent.data)
}, !1), document.addEventListener("load", function() {
    window.webkitIntent && window.webkitIntent.postFailure()
}, !1), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.foxybox = {
        open: function(t) {
            e.windows.record({
                id: t,
                display: "block"
            });
            var n = document.getElementById(t);
            n.style.display = "block", setTimeout(function() {
                n.style.opacity = 1
            }, 1)
        },
        close: function(t) {
            e.windows.record({
                id: t,
                display: "none"
            });
            var n = document.getElementById(t);
            n.style.opacity = 0, setTimeout(function() {
                n.style.display = "none"
            }, 250)
        }
    }, e.dragElement = function(t, n) {
        window.zIndexGlobal || (window.zIndexGlobal = 100), Event.proxy.drag({
            event: n,
            target: t,
            position: "move",
            listener: function(n, r) {
                Event.stop(n), r.target.state = r.state, r.width = r.target.offsetWidth, r.height = r.target.offsetHeight, e.windows.clamp(r), r.state === "up" && e.windows.record({
                    id: t.id,
                    left: r.x / window.innerWidth,
                    top: r.y / window.innerHeight
                }), t.style.zIndex = window.zIndexGlobal++, t.style.left = r.x + "px", t.style.top = r.y + "px"
            }
        })
    }, e.windows = [], e.windows.getById = {}, e.windows.add = function(t, n, r) {
        e.windows.getById[t] = e.windows.length;
        var i = localStorage.getItem(t);
        i ? e.windows.push(JSON.parse(i)) : e.windows.push({
            id: t,
            left: n,
            top: r
        })
    }, e.windows.clamp = function(e, t, n, r, i) {
        t = t || 0, n = n || 0, r = r || window.innerWidth, i = i || window.innerHeight, e.x + e.width > r && (e.x = r - e.width), e.y + e.height > i && (e.y = i - e.height), e.x < t && (e.x = t), e.y < n && (e.y = n)
    }, e.windows.record = function(t) {
        var n = e.windows[e.windows.getById[t.id]];
        typeof t.left != "undefined" && (n.left = t.left), typeof t.top != "undefined" && (n.top = t.top), typeof t.display != "undefined" && (n.display = t.display), n = JSON.stringify(n), localStorage.setItem(t.id, n)
    }, e.windows.restore = function() {
        for (var t = window.innerWidth, n = window.innerHeight, r = 0; r < e.windows.length; r++) {
            var i = e.windows[r],
                s = document.getElementById(i.id),
                o = i.left,
                u = i.top;
            s.style.display = "block";
            var a = o * t + s.offsetWidth,
                f = u * n + s.offsetHeight;
            a > t && (o = Math.max(0, Math.min(1, i.left - (a - t) / t))), f > n && (u = Math.max(0, Math.min(1, i.top - (f - n) / n))), s.style.top = u * n + "px", s.style.left = o * t + "px", s.style.display = i.display, i.display === "block" && (s.style.opacity = 1)
        }
    }, e.windows.add("foxy-configure", .08, .08), e.windows.add("foxy-tools", .03, .02), e.windows.add("ColorPicker", .5, .2), e
}(sketch),
function() {
    var e = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
    ColorMatrix = function(t, n) {
        this.filters = {}, this.id = "ColorMatrix";
        if (t) if (typeof t == "object") {
            var r = !0,
                i;
            for (i in t) r = !1;
            r && (this.matrix = e.slice(0));
            for (var s in t) break;
            if (typeof t[s] == "number") if (isNaN(s)) this.update(t);
            else {
                r = {};
                for (i in t) r[i] = t[i];
                this.matrix = r
            } else typeof t[s] == "object" && this.combine(t)
        } else this.update(t, n);
        else this.matrix = e.slice(0);
        return this
    }, ColorMatrix.prototype = {
        brightness: function(e) {
            return [1, 0, 0, 0, e, 0, 1, 0, 0, e, 0, 0, 1, 0, e, 0, 0, 0, 1, 0]
        },
        contrast: function(e) {
            return [++e, 0, 0, 0, 128 * (1 - e), 0, e, 0, 0, 128 * (1 - e), 0, 0, e, 0, 128 * (1 - e), 0, 0, 0, 1, 0]
        },
        sepia: function() {
            return [.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0]
        },
        exposure: function(e) {
            return e = ++e < 1 ? (e + 1.5) / 3 : 1 + (e - 1) * 1 / 2, [e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 1, 0]
        },
        colorize: function(t) {
            var n = (t >>> 16 & 255) / 255,
                r = (t >>> 8 & 255) / 255,
                i = (t & 255) / 255,
                t = (t >>> 24) / 255,
                n = [n * .212656, n * .715158, n * .072186, 0, 0, r * .212656, r * .715158, r * .072186, 0, 0, i * .212656, i * .715158, i * .072186, 0, 0, 0, 0, 0, 1, 0];
            if (t < 1) for (r = 0; r < 20; r++) n[r] = (1 - t) * e[r] + t * n[r];
            return n
        },
        light: function(e, t, n, r) {
            for (var n = r.highlights, t = -clamp(n.value * (n.max - n.min) + n.min, n.min, n.max), n = r.shadows, r = -clamp(n.value * (n.max - n.min) + n.min, n.min, n.max), i = Math.PI, n = Math.cos(i), i = Math.sin(i), s = e.data, o = s.length, u = 0; u < o; u += 4) {
                var a = s[u],
                    f = s[u + 1],
                    l = s[u + 2],
                    c = a,
                    h = f,
                    p = l;
                a ^= 255, f ^= 255, l ^= 255;
                var d = (.299 + .701 * n + .168 * i) * a + (.587 - .587 * n + .33 * i) * f + (.114 - .114 * n - .497 * i) * l,
                    v = (.299 - .299 * n - .328 * i) * a + (.587 + .413 * n + .035 * i) * f + (.114 - .114 * n + .292 * i) * l,
                    m = (.299 - .3 * n + 1.25 * i) * a + (.587 - .588 * n - 1.05 * i) * f + (.114 + .886 * n - .203 * i) * l,
                    a = c < d ? c : d,
                    f = h < v ? h : v,
                    l = p < m ? p : m,
                    c = (1 - t) * c + t * a,
                    h = (1 - t) * h + t * f,
                    p = (1 - t) * p + t * l,
                    a = c > d ? c : d,
                    f = h > v ? h : v,
                    l = p > m ? p : m,
                    c = (1 - r) * c + r * a,
                    h = (1 - r) * h + r * f,
                    p = (1 - r) * p + r * l;
                s[u] = (c < 0 ? 0 : c < 256 ? c : 255) >> 0, s[u + 1] = (h < 0 ? 0 : h < 256 ? h : 255) >> 0, s[u + 2] = (p < 0 ? 0 : p < 256 ? p : 255) >> 0
            }
            return e
        },
        duotone: function(e, t, n, r) {
            for (var t = Color.HSV_RGB({
                H: r.hue.value * 360,
                S: r.saturation.value * 100,
                V: r.saturation.value * 100
            }), n = r.luminance.value * 1.5, r = r.amount.value, i = e.data, s = i.length, o = 0; o < s; o += 4) {
                var u = i[o],
                    a = i[o + 1],
                    f = i[o + 2],
                    l = .212656 * u + .715158 * a + .072186 * f,
                    c = (1 - l / 255) * t.R + l / 255 * l,
                    h = (1 - l / 255) * t.G + l / 255 * l,
                    p = (1 - l / 255) * t.B + l / 255 * l;
                l -= (c + h + p) / 3, c += l, h += l, p += l;
                var l = (c + h + p) / 3,
                    d = Math.min(c, h, p);
                d < 0 && (c = l + (c - l) * l / (l - d), h = l + (h - l) * l / (l - d), p = l + (p - l) * l / (l - d)), d = Math.max(c, h, p), d > 255 && (c = l + (c - l) * (255 - l) / (d - l), h = l + (h - l) * (255 - l) / (d - l), p = l + (p - l) * (255 - l) / (d - l)), c = ((1 - r) * u + r * c) * n, h = ((1 - r) * a + r * h) * n, p = ((1 - r) * f + r * p) * n, i[o] = c, i[o + 1] = h, i[o + 2] = p
            }
            return e
        },
        monotone: function(t) {
            var n = (t >>> 16 & 255) / 255,
                r = (t >>> 8 & 255) / 255,
                i = (t & 255) / 255,
                t = (t >>> 24) / 255,
                n = [n, r, i, 0, 0, n, r, i, 0, 0, n, r, i, 0, 0, 0, 0, 0, 1, 0];
            if (t < 1) for (r = 0; r < 20; r++) n[r] = (1 - t) * e[r] + t * n[r];
            return n
        },
        invert: function(e) {
            return e *= -1, [e, 0, 0, 0, 255, 0, e, 0, 0, 255, 0, 0, e, 0, 255, 0, 0, 0, 1, 0]
        },
        temperature: function(e) {
            return [1 + e / 256, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 + -e / 256, 0, 0, 0, 0, 0, 1, 0]
        },
        tint: function(e) {
            return [1 + e / 256, 0, 0, 0, 0, 0, 1 + -e / 256, 0, 0, 0, 0, 0, 1 + e / 256, 0, 0, 0, 0, 0, 1, 0]
        },
        saturation: function(e) {
            var t = (1 - e) * .212656,
                n = (1 - e) * .715158,
                r = (1 - e) * .072186;
            return [t + e, n, r, 0, 0, t, n + e, r, 0, 0, t, n, r + e, 0, 0, 0, 0, 0, 1, 0]
        },
        blend: function(e, t) {
            for (var n = this.matrix, r = [], i = 0; i < 20; i++) r[i] = (1 - t) * n[i] + t * e[i];
            return this.matrix = r, this
        },
        combine: function(e) {
            var t = [];
            if (typeof e[0] == "number") for (var n = 0, r = arguments.length; n < r; n++) t[n] = arguments[n];
            else t = e;
            var r = this.matrix,
                i = [];
            for (n in t) if (r) {
                for (x = 0; x < 5; x++) for (y = 0; y < 20; y += 5) i[y + x] = r[y] * t[n][x] + r[y + 1] * t[n][x + 5] + r[y + 2] * t[n][x + 10] + r[y + 3] * t[n][x + 15] + (x === 4 ? r[y + 4] : 0);
                r = i
            } else r = t[n];
            return this.matrix = r, this
        },
        update: function(e, t) {
            if (typeof e == "string") {
                if (!this[e]) return;
                typeof t == "number" ? this.filters[e] = this[e](t) : delete this.filters[e]
            } else for (var n in e) this[n] && (typeof e[n] == "number" ? this.filters[n] = this[n](e[n]) : delete this.filters[n]);
            return delete this.matrix, this.combine(this.filters), this
        },
        toString: function() {
            return this.matrix.join(",")
        },
        apply: function(e, t, n, r) {
            var i = e.canvas;
            r || (r = [0, 0]), n || (n = e), t || (t = [0, 0, i.width, i.height]);
            for (var e = e.getImageData(t[0], t[1], t[2], t[3]), t = e.data, s = this.matrix, i = s[0], o = s[1], u = s[2], a = s[3], f = s[4], l = s[5], c = s[6], h = s[7], p = s[8], d = s[9], v = s[10], m = s[11], g = s[12], y = s[13], b = s[14], w = s[15], E = s[16], S = s[17], x = s[18], s = s[19], T, N, C, k, L, A, O, M = 0, _ = t.length; M < _; M += 4) T = t[M], N = t[M + 1], C = t[M + 2], k = t[M + 3], L = T * i + N * o + C * u + k * a + f, A = T * l + N * c + C * h + k * p + d, O = T * v + N * m + C * g + k * y + b, T = T * w + N * E + C * S + k * x + s, e.data[M] = (L < 0 ? 0 : L < 255 ? L : 255) >> 0, e.data[M + 1] = (A < 0 ? 0 : A < 255 ? A : 255) >> 0, e.data[M + 2] = (O < 0 ? 0 : O < 255 ? O : 255) >> 0, e.data[M + 3] = (T < 0 ? 0 : T < 255 ? T : 255) >> 0;
            n.putImageData(e, r[0], r[1])
        },
        reset: function() {
            this.matrix = e.slice(0)
        }
    }
}(),
function() {
    for (var e = [], t = 0; t <= 768; t++) e[t] = t;
    ColorTable = function(t, n) {
        this.id = "ColorTable";
        if (t) if (typeof t == "object") {
            for (var r in t) break;
            typeof r == "string" && typeof t[r] != "object" ? this.update(t) : typeof t[r] == "number" ? this.ColorTable = clone(t) : typeof t[r] == "object" && this.combine(t)
        } else this.update(t, n);
        else this.ColorTable = clone(e);
        return this
    }, ColorTable.prototype = {
        Posterize: function(e) {
            for (var t = 0, n = []; t < 256; t++) n[t] = n[256 + t] = n[512 + t] = t - t % Math.round(256 / e);
            return n
        },
        Gamma: function(e) {
            for (var t = (e >>> 16 & 255) / 255, n = (e >>> 8 & 255) / 255, e = (e & 255) / 255, r = 0, i = []; r < 256; r++) i[r] = clamp(255 * Math.pow(r / 255, 1 / t) + .5, 0, 255), i[256 + r] = clamp(255 * Math.pow(r / 255, 1 / n) + .5, 0, 255), i[512 + r] = clamp(255 * Math.pow(r / 255, 1 / e) + .5, 0, 255);
            return i
        },
        combine: function(e) {
            typeof e[0] == "number" && (e = [e]);
            var t = this.ColorTable,
                n = [],
                r;
            for (r in e) if (t) {
                for (var i = 0; i <= 768; i++) n[i] = e[r][Math.round(t[i])];
                t = n
            } else t = e[r];
            return this.ColorTable = t, this
        },
        update: function(e, t) {
            if (typeof e == "string") {
                if (!this[e]) return;
                typeof t == "number" ? Filters.ColorTable[e] = this[e](t) : delete Filters.ColorTable[e]
            } else for (var n in e) this[n] && (typeof e[n] == "number" ? Filters.ColorTable[n] = this[n](e[n]) : delete Filters.ColorTable[n]);
            return delete this.ColorTable, this.combine(Filters.ColorTable), this
        },
        apply: function(e, t, n, r) {
            if (!$stop) {
                $stop = 1;
                for (var i = (new Date).getTime(), e = e.getImageData(t[0], t[1], t[2], t[3]), t = e.data, s = this.ColorTable, o = 0, u = t.length; o < u; o += 4) e.data[o] = s[t[o]], e.data[o + 1] = s[t[o + 1] + 256], e.data[o + 2] = s[t[o + 2] + 512];
                n.putImageData(e, r[0], r[1]), $stop = 0, TEST(i - (new Date).getTime() + "ColorTable", 1)
            }
        },
        png: function() {
            for (var e = addCanvas2D(256, 1, "temp"), t = e.getImageData(0, 0, 256, 1), n = this.ColorTable, r = 0; r < 256; r++) t.data[r * 4] = n[r], t.data[r * 4 + 1] = n[r + 256], t.data[r * 4 + 2] = n[r + 512], t.data[r * 4 + 3] = 255;
            e.putImageData(t, 0, 0), TEST($("#temp").toDataURL())
        },
        toString: function() {}
    }
}();
var Darkroom;
typeof Darkroom == "undefined" && (Darkroom = {}), typeof Darkroom.Raster == "undefined" && (Darkroom.Raster = {}), Darkroom.Raster.MonotonePresets = {
    None: {
        Amount: 0,
        Red: .212656,
        Green: .715158,
        Blue: .072186
    },
    "Black & White": {
        Amount: 1,
        Red: .212656,
        Green: .715158,
        Blue: .072186
    },
    "Red Filter": {
        Amount: 1,
        Red: 1,
        Green: 0,
        Blue: 0
    },
    "Orange Filter": {
        Amount: 1,
        Red: .75,
        Green: .25,
        Blue: 0
    },
    "Yellow Filter": {
        Amount: 1,
        Red: .5,
        Green: .5,
        Blue: 0
    },
    "Green Filter": {
        Amount: 1,
        Red: 0,
        Green: 1,
        Blue: 0
    },
    "Cyan Filter": {
        Amount: 1,
        Red: 0,
        Green: .5,
        Blue: .5
    },
    "Blue Filter": {
        Amount: 1,
        Red: 0,
        Green: 0,
        Blue: 1
    },
    "Magenta Filter": {
        Amount: 1,
        Red: .5,
        Green: 0,
        Blue: .5
    },
    Infared: {
        Amount: 1,
        Red: .33,
        Green: 1,
        Blue: 0
    }
}, Darkroom.Raster.Presets = {
    None: {},
    Rust: {
        "White Balance": {
            Temp: -64
        },
        Exposure: {
            Exposure: -0.14516129032258074
        },
        Enhance: {
            Contrast: .5
        },
        "Light Balance": {
            Highlights: .12580645161290327,
            Shadows: .0741935483870968
        },
        Monotone: {
            Red: .5419354838709678,
            Green: .4129032258064516
        },
        Duotone: {
            Hue: 16.258064516129032,
            Luminance: .7612903225806451
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    "Rust 2": {
        "White Balance": {
            Temp: 64,
            Tint: -37.5741935483871
        },
        Exposure: {
            Exposure: -0.08709677419354844
        },
        Enhance: {
            Contrast: .23548387096774193
        },
        "Light Balance": {
            Highlights: -0.10806451612903226,
            Shadows: .0370967741935484
        },
        Monotone: {
            Red: .5419354838709678,
            Green: .4129032258064516
        },
        Duotone: {
            Hue: 16.258064516129032,
            Luminance: .7612903225806451
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    "Rust 3": {
        "White Balance": {
            Temp: 53.26451612903226,
            Tint: -2.8903225806451616
        },
        Exposure: {
            Exposure: -0.08709677419354844
        },
        Enhance: {
            Contrast: .5,
            Saturation: 1.7032258064516128
        },
        "Light Balance": {
            Highlights: -0.1274193548387097,
            Shadows: -0.014516129032258074
        },
        Monotone: {
            Red: .5419354838709678,
            Green: .4129032258064516
        },
        Duotone: {
            Hue: 16.258064516129032,
            Luminance: .7612903225806451
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    "Intensify Lighting": {
        Enhance: {
            Contrast: .08235294117647063,
            Saturation: 1.6903225806451614
        },
        "Light Balance": {
            Highlights: .011,
            Shadows: .022
        },
        Duotone: {
            Amount: 0,
            Luminance: .8
        }
    },
    Yellowing: {
        "White Balance": {
            Temp: 64,
            Tint: -25.18709677419355
        },
        Exposure: {
            Exposure: -0.35806451612903234,
            Brightness: 49.67741935483872
        },
        Enhance: {
            Contrast: .1387096774193548
        },
        "Light Balance": {
            Highlights: .12096774193548387,
            Shadows: .10161290322580646
        },
        Duotone: {
            Amount: .4967741935483871,
            Hue: 32.516129032258064,
            Saturation: .7290322580645161,
            Luminance: .7612903225806451
        }
    },
    "Old-film": {
        Levels: {
            RGB: !0
        },
        Monotone: {
            Amount: .6
        },
        Duotone: {
            Amount: .5,
            Hue: 42,
            Saturation: .9,
            Luminance: .7
        }
    },
    "Old Film 2": {
        Levels: {
            RGB: !0
        },
        Monotone: {
            Amount: .3,
            Red: .2,
            Green: .6,
            Blue: .2
        },
        Duotone: {
            Amount: .4,
            Hue: 42,
            Saturation: .8,
            Luminance: .6
        }
    },
    "Washed-out Film": {
        Enhance: {
            Contrast: -0.2
        },
        Duotone: {
            Amount: .5,
            Hue: 40,
            Saturation: 1,
            Luminance: .8
        }
    },
    "Cold Lens": {
        Levels: {
            L: !0
        },
        Monotone: {
            Amount: .3,
            Red: .2,
            Green: .6,
            Blue: .2
        },
        Duotone: {
            Amount: .4,
            Hue: 220,
            Saturation: .7,
            Luminance: .7
        }
    },
    Cyanotype: {
        Duotone: {
            Amount: 1,
            Hue: 210,
            Saturation: .6,
            Luminance: .6
        }
    },
    "Cyanotype 2": {
        Levels: {
            RGB: !0
        },
        Enhance: {
            Contrast: -0.15806451612903227
        },
        "Light Balance": {
            Highlights: .07903225806451614,
            Shadows: .030645161290322576
        },
        Monotone: {
            Red: .4645161290322581,
            Green: .2645161290322581,
            Blue: .5032258064516129
        },
        Duotone: {
            Amount: .567741935483871,
            Hue: 227.61290322580643,
            Luminance: .5870967741935483
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    "Cyanotype 3": {
        "White Balance": {
            Temp: 41.703,
            Tint: 62.348
        },
        Exposure: {
            Exposure: 1.035,
            Brightness: 35.484
        },
        Enhance: {
            Contrast: .242,
            Saturation: 1.406
        },
        "Light Balance": {
            Highlights: .002,
            Shadows: .25
        },
        Duotone: {
            Hue: 211.355,
            Saturation: .542,
            Luminance: .671,
            visible: !0
        }
    },
    "Glow - Red": {
        Levels: {
            L: !0
        },
        Duotone: {
            Amount: .4,
            Hue: 360,
            Saturation: .8,
            Luminance: .6
        },
        "White Balance": {
            Tint: 10
        }
    },
    "Inverted Duotone": {
        Effects: {
            Presets: "Invert"
        },
        Duotone: {
            Amount: 1,
            Hue: 360,
            Saturation: .7,
            Luminance: .9
        }
    },
    "Sepia - Shadows": {
        Levels: {
            RGB: !0
        },
        "White Balance": {
            Temp: 64,
            Tint: 22.709677419354833
        },
        Exposure: {
            Exposure: .3774193548387097,
            Brightness: -3.225806451612897
        },
        Enhance: {
            Contrast: -0.082
        },
        "Light Balance": {
            Highlights: .25,
            Shadows: .25
        },
        Monotone: {
            Amount: .3225806451612903,
            Red: .32903225806451614,
            Green: .5,
            Blue: .23225806451612904
        },
        Duotone: {
            Amount: .10967741935483871,
            Hue: 360,
            Luminance: .5548387096774193
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    "Sepia - High Contrast": {
        "White Balance": {
            Temp: -64,
            Tint: 30
        },
        Exposure: {
            Exposure: .3,
            Brightness: 78
        },
        Enhance: {
            Contrast: .5
        },
        Monotone: {
            Amount: 1,
            Red: 0,
            Green: 0,
            Blue: .6
        },
        Duotone: {
            Amount: .5,
            Hue: 44,
            Saturation: 1,
            Luminance: .7
        }
    },
    "Sepia - Darken": {
        Levels: {
            L: !0
        },
        Enhance: {
            Contrast: .1
        },
        Monotone: {
            Amount: 1,
            Red: .1,
            Green: .4,
            Blue: .6
        },
        Duotone: {
            Amount: .8,
            Hue: 40,
            Saturation: 1,
            Luminance: .5
        }
    },
    "Sepia - Colorized": {
        Levels: {
            RGB: !0
        },
        Monotone: {
            Amount: .3
        },
        Duotone: {
            Amount: 1,
            Hue: 42,
            Saturation: .45,
            Luminance: .7
        }
    },
    "Sepia - Natural": {
        "White Balance": {
            Temp: -64
        },
        Effects: {
            Presets: "Sepia"
        }
    },
    Steelgrey: {
        Levels: {
            L: !0
        },
        Duotone: {
            Amount: .8,
            Hue: 205,
            Saturation: .1,
            Luminance: .7
        }
    },
    "Steelgrey - Extra Grey": {
        Levels: {
            L: !0
        },
        Monotone: {
            Amount: .7,
            Red: .5,
            Green: .6,
            Blue: .2
        },
        Duotone: {
            Amount: .4,
            Hue: 244,
            Saturation: .3,
            Luminance: .6
        }
    },
    "Vivid Red": {
        Enhance: {
            Contrast: .17,
            Saturation: 1.75
        },
        Duotone: {
            Amount: .3,
            Hue: 360,
            Saturation: .75,
            Luminance: .8
        }
    }
}, Darkroom.Raster.ColorBlindnessPresets = {
    Protanopia: {
        name: "Protanopia (Red deficiency)",
        "Color Blindness": {
            Simulate: "Protanope"
        }
    },
    Deuteranopia: {
        name: "Deuteranopia (Green deficiency)",
        "Color Blindness": {
            Simulate: "Deuteranope"
        }
    }
},
function() {
    function e() {
        this.a = 0, this.next = null
    }
    StackBlurAlpha = function(r, s, o, u, a, f, l) {
        if (!(isNaN(f) || f < 1)) {
            var r = r.getContext("2d"),
                h;
            try {
                try {
                    h = r.getImageData(s, o, u, a)
                } catch (p) {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), h = r.getImageData(s, o, u, a)
                }
            } catch (d) {
                throw Error("unable to access image data: " + d)
            }
            var v = h.data,
                m, g, y, b, w, E, S, x, T, N, C;
            m = f + f + 1;
            var k = u - 1,
                L = a - 1,
                A = f + 1,
                O = A * (A + 1) / 2,
                M = new e,
                _ = M;
            for (y = 1; y < m; y++) if (_ = _.next = new e, y == A) var D = _;
            _.next = M, _ = y = null, E = w = 0;
            var P = t[f],
                H = n[f];
            for (g = 0; g < a; g++) {
                T = S = 0, x = A * (N = v[w + 3]), S += O * N, _ = M;
                for (y = 0; y < A; y++) _.a = N, _ = _.next;
                for (y = 1; y < A; y++) b = w + ((k < y ? k : y) << 2), C = A - y, S += (_.a = N = v[b + 3]) * C, T += N, _ = _.next;
                y = M, _ = D;
                for (m = 0; m < u; m++) v[w + 3] = S * P >> H, S -= x, x -= y.a, b = E + ((b = m + f + 1) < k ? b : k) << 2, T += y.a = v[b + 3], S += T, y = y.next, x += N = _.a, T -= N, _ = _.next, w += 4;
                E += u
            }
            for (m = 0; m < u; m++) {
                T = S = 0, w = m << 2, x = A * (N = v[w + 3]), S += O * N, _ = M;
                for (y = 0; y < A; y++) _.a = N, _ = _.next;
                b = u;
                for (y = 1; y <= f; y++) w = b + m << 2, C = A - y, S += (_.a = N = v[w + 3]) * C, T += N, _ = _.next, y < L && (b += u);
                w = m, y = M, _ = D;
                for (g = 0; g < a; g++) b = w << 2, v[b + 3] = S * P >> H, S -= x, x -= y.a, b = m + ((b = g + A) < L ? b : L) * u << 2, S += T += y.a = v[b + 3], y = y.next, x += N = _.a, T -= N, _ = _.next, w += u
            }
            l ? r.putImageData(h, 0, 0) : r.putImageData(h, s, o)
        }
    }, StackBlur = function(r, s, o, u, a, f, l) {
        if (!(isNaN(f) || f < 1)) {
            var r = r.getContext("2d"),
                h;
            try {
                try {
                    h = r.getImageData(s, o, u, a)
                } catch (p) {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"), h = r.getImageData(s, o, u, a)
                }
            } catch (d) {
                throw Error("unable to access image data: " + d)
            }
            var v = h.data,
                m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I;
            g = f + f + 1, m = u - 1;
            var q = a - 1,
                R = f + 1,
                U = R * (R + 1) / 2,
                z = new e,
                W = z;
            for (b = 1; b < g; b++) if (W = W.next = new e, b == R) var X = W;
            W.next = z, W = b = null, S = E = 0;
            var V = t[f],
                $ = n[f];
            for (y = 0; y < a; y++) {
                M = _ = D = P = x = T = N = C = 0, H = v[E], B = v[E + 1], j = v[E + 2], F = v[E + 3], k = R * H, L = R * B, A = R * j, O = R * F, x += U * H, T += U * B, N += U * j, C += U * F, W = z;
                for (b = 0; b < R; b++) W.r = H, W.g = B, W.b = j, W.a = F, W = W.next;
                for (b = 1; b < R; b++) w = E + ((m < b ? m : b) << 2), H = v[w], B = v[w + 1], j = v[w + 2], F = v[w + 3], x += (W.r = H) * (I = R - b), T += (W.g = B) * I, N += (W.b = j) * I, C += (W.a = F) * I, M += H, _ += B, D += j, P += F, W = W.next;
                b = z, W = X;
                for (g = 0; g < u; g++) H = x * V >> $, B = T * V >> $, j = N * V >> $, F = C * V >> $, v[E] = H, v[E + 1] = B, v[E + 2] = j, v[E + 3] = F, x -= k, T -= L, N -= A, C -= O, k -= b.r, L -= b.g, A -= b.b, O -= b.a, w = S + ((w = g + f + 1) < m ? w : m) << 2, b.r = v[w], b.g = v[w + 1], b.b = v[w + 2], b.a = v[w + 3], M += b.r, _ += b.g, D += b.b, P += b.a, x += M, T += _, N += D, C += P, b = b.next, k += H = W.r, L += B = W.g, A += j = W.b, O += F = W.a, M -= H, _ -= B, D -= j, P -= F, W = W.next, E += 4;
                S += u
            }
            for (g = 0; g < u; g++) {
                _ = D = P = M = T = N = C = x = 0, E = g << 2, k = R * (H = v[E]), L = R * (B = v[E + 1]), A = R * (j = v[E + 2]), O = R * (F = v[E + 3]), x += U * H, T += U * B, N += U * j, C += U * F, W = z;
                for (b = 0; b < R; b++) W.r = H, W.g = B, W.b = j, W.a = F, W = W.next;
                w = u;
                for (b = 1; b <= f; b++) E = w + g << 2, x += (W.r = H = v[E]) * (I = R - b), T += (W.g = B = v[E + 1]) * I, N += (W.b = j = v[E + 2]) * I, C += (W.a = F = v[E + 3]) * I, M += H, _ += B, D += j, P += F, W = W.next, b < q && (w += u);
                E = g, b = z, W = X;
                for (y = 0; y < a; y++) w = E << 2, H = x * V >> $, B = T * V >> $, j = N * V >> $, F = C * V >> $, F < 255 && (m = F / 255, H /= m, B /= m, j /= m), v[w] = H, v[w + 1] = B, v[w + 2] = j, v[w + 3] = F, x -= k, T -= L, N -= A, C -= O, k -= b.r, L -= b.g, A -= b.b, O -= b.a, w = g + ((w = y + R) < q ? w : q) * u << 2, x += M += b.r = v[w], T += _ += b.g = v[w + 1], N += D += b.b = v[w + 2], C += P += b.a = v[w + 3], b = b.next, k += H = W.r, L += B = W.g, A += j = W.b, O += F = W.a, M -= H, _ -= B, D -= j, P -= F, W = W.next, E += u
            }
            l ? r.putImageData(h, 0, 0) : r.putImageData(h, s, o)
        }
    };
    var t = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259],
        n = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
}(), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    e.version = 2, e.canvas2d = {
        pixelRatio: window.devicePixelRatio || 1,
        scale: 1,
        width: window.innerWidth,
        height: window.innerHeight,
        top: 0,
        left: 0,
        layers: {
            cache: "display: none",
            layer0: "z-index: 0;",
            active: "z-index: 1;"
        }
    }, e.construct = function(t) {
        var n = e.canvas2d;
        e.debug = !1, e.saveHistory = !1, e.cursor = !0, e.editable = !0, e.useCreateAction = !0, e.forcePlacement = !0, e.setContainer(t.container || document.body), e.setConfiguration(t.configure), e.setSize(t.width || n.width, t.height || n.height), e.scale2d(t.scale || n.scale), e.active = n.layers.active.ctx, e.cache = n.layers.cache.ctx, e.ctx = n.layers.layer0.ctx
    }, e.canvas = function(t) {
        var n;
        t && (n = document.getElementById(t)), n || (n = document.createElement("canvas"));
        var r = e.canvas2d;
        return n.id = t, n.width = r.width * r.pixelRatio, n.height = r.height * r.pixelRatio, n.ctx = n.getContext("2d"), n
    }, e.setSize = function(t, n) {
        var r = e.canvas2d.layers;
        e.canvas2d.width = t || window.innerWidth, e.canvas2d.height = n || window.innerHeight;
        for (var i in r) {
            var s = e.canvas(i),
                o = e.canvas2d;
            o.container.appendChild(s), o.layers[i].indexOf && (s.style.cssText = o.layers[i]), s.style.width = t + "px", s.style.height = n + "px", r[i] = s
        }
    }, e.scale2d = function(t) {
        var n = e.canvas2d;
        t && (n.scale = t);
        var t = n.scale * n.pixelRatio,
            r = n.layers,
            i;
        for (i in r) {
            var s = r[i],
                o = s.height * t;
            s.style.width = s.width * t + "px", s.style.height = o + "px", s.style.left = 0, s.style.top = 0, s.parentNode.scrollLeft = 0, s.parentNode.scrollTop = 0, n.left = parseFloat(s.style.left), n.top = parseFloat(s.style.top)
        }
    }, e.enableToolkit = function(t) {
        if (e.toolkits[t] === void 0) {
            var n = t.split("-"),
                r = {};
            r.active = e.canvas2d.layers.active, r.cache = e.canvas2d.layers.cache, r.layer0 = e.canvas2d.layers.layer0, r.type = n[1], e.toolkits[t] = new e[n[0]](r)
        }
    }, e.setupTool = function(t, n) {
        var r = e.configure.tools[t || "pencil"],
            i = r.toolkit;
        n === void 0 && (n = {}), typeof n == "function" && (n = {
            callback: n
        });
        for (var s in n) r[s] = n[s];
        e.tool.disable && e.tool.disable(), e.tool = e.toolkits[i], e.tool.type = t, e.toolkit = e.toolkits[e.tool.id], i = function() {
            e.loader.stop(), n.callback && n.callback();
            var r = e.configure.tools[t];
            if (typeof r.fill != "undefined") {
                var i = Color.Space(e.ColorPicker.color, "HSVA>RGBA>W3");
                e.ColorPicker.updateFromAction(r, t, i), e.tool.changeColor && e.tool.changeColor(i)
            }
        }, e.tool.style ? (r.src && (e.tool.style.src = r.src), e.tool.style.type = r.type, e.tool.loadResource(e.tool.style, i)) : e.tool.loadResource && e.tool.loadResource(e.tool.type, i), e.tool.enable()
    }, e.toolkits = {}, e.toolkit = {}, e.tool = {}, e.createGradient = function(e, t, n, r, i, s) {
        if (s.composite === "erase") return "#000";
        if (s.color_mode === "cycle") return e = s.colors, e[((s.time || 0) * 2 + 1) % e.length];
        if (s.color_mode === "radial") var o = (t + r) / 2,
            u = (n + i) / 2,
            t = Math.max(Math.abs(t - r), Math.abs(n - i)),
            o = e.createRadialGradient(o, u, 0, o, u, t);
        else o = e.createLinearGradient(t, n, r, i);
        if (e = s.colors) {
            for (s = 0; s < e.length; s += 2) o.addColorStop(e[s], e[s + 1]);
            return o
        }
    };
    var t = {
        erase: "destination-out",
        paint: "source-over",
        multiply: "darker",
        light: "lighter"
    };
    return e.defineComposite = function(e, n) {
        return e === "disco" ? n % 2 === 0 ? "lighter" : "source-over" : t[e] || "source-over"
    }, e.setTranslation = function(t) {
        for (var n in t) e.translation[n] = t[n]
    }, e.translation = {
        "clear-confirm": "Are you sure you want to clear the canvas?",
        "delete": "Delete",
        rotate: "Rotate",
        scale: "Scale",
        move: "Move"
    }, e.setContainer = function(t) {
        e.canvas2d.container = t
    }, e.setConfiguration = function(t) {
        e.configure = t
    }, e.defaultValues = {
        colors: [0, "rgba(255,139,225,1)"]
    }, e.addBackgroundColor = function(t) {
        e.addBackground({
            color: t,
            name: "background.svg",
            type: "image/svg+xml",
            src: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px"	 height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><g id="Background__x2B__Background__x2B__Footer__x2B__Top_Nav__x2B__MAIN__x2B__Header__x2B__Layer_25__x2B___x3E___x2B__Layer_26__x2B___x3F___x2B__Shape_70__x2B__Layer_27__x2B__Stamps_and_shapes__x2B__Layer_29_copy__x2B__STAMPS__x2B__Layer_40__x2B__Shape_74__x_1_"><rect width="100" height="100"/></g></svg>'
        })
    }, e.addBackground = function(t) {
        var n = function(n, o, u, a) {
            n = {
                type: o,
                src: n,
                name: "background",
                zIndex: -1,
                stickToBack: !0,
                hideMove: !0,
                hideClose: !0,
                hideRotate: !0,
                hideScale: !0
            }, u / a < i / s ? (n.constrainX = !0, n.stickToY = !0, n.bbox = {}, n.bbox.width = i, n.bbox.height = a / u * i) : (n.constrainY = !0, n.stickToX = !0, n.bbox = {}, n.bbox.width = u / a * s, n.bbox.height = s), n.bbox.x = (i - n.bbox.width) / 2, n.bbox.y = (s - n.bbox.height) / 2, n.color = t.color || "rgba(0,0,0,1)", e.actions.removeByName("background"), u = e.actions.add(n), e.TimeMachine.store("add"), e.TimeMachine.store([e.actions.clone(u)]), e.loadActions(), e.loader.stop(), e.setupTool(r)
        }, r = sketch.tool.type,
            i = e.canvas2d.width,
            s = e.canvas2d.height;
        t.type.indexOf("svg") !== -1 ? (e.actions.srcs["#" + t.name] = t.src, e.setupTool("svg"), e.tool.style.src = "#" + t.name, e.tool.loadResource(e.tool.style, function() {
            n(e.tool.style.src, "svg", e.tool.style.bbox.width, e.tool.style.bbox.height)
        })) : e.render.fileToCanvas(t, function(t, r) {
            var i = r.src.substr(0, 5) === "blob:" ? t.toDataURL() : r.src,
                s = t.width,
                o = t.height;
            e.actions.srcs[i] = r.src, n(i, "image", s, o)
        })
    }, e.createQueue = function(e) {
        var t = {
            queue: []
        }, n;
        for (n in e.items) t.queue.push(e.items[n]);
        return t.getNext = function() {
            if (!t.queue.length) return e.onComplete();
            e.getNext(t.queue.shift())
        }, setTimeout(t.getNext, 1), t
    }, e.paths = {
        fonts: "./media/font/",
        css: "./css/"
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.action == "undefined" && (sketch.actions = {}), sketch = function(e) {
    e.actions.data = [], e.actions.copies = [], e.actions.controls = [], e.actions.selection = {}, e.actions.srcs = {}, e.actions.reset = function() {
        e.actions.deselectAll(), e.actions.data = [], e.actions.controls = [], e.actions.selection = {}, e.actions.srcs = {}, e.TimeMachine.resetActionHistory(), e.renderActions("actions.paste")
    }, e.actions.add = function(t, n) {
        t = mergeObject(t, {
            id: e.actions.createId(),
            zIndex: e.actions.data.length,
            bbox: {
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                }
            }
        }), typeof t.bbox.viewBox == "undefined" && (t.bbox.viewBox = [0, 0, t.bbox.width, t.bbox.height], t.bbox.boxWidth = t.bbox.width, t.bbox.boxHeight = t.bbox.height), n || (n = {}), n.hideClose && (t.hideClose = n.hideClose), n.hideMove && (t.hideMove = n.hideMove), n.hideRotate && (t.hideRotate = n.hideRotate), n.hideScale && (t.hideScale = n.hideScale), n.constrain && (t.constrain = n.constrain), n.constrainX && (t.constrainX = n.constrainX), n.constrainY && (t.constrainY = n.constrainY), n.stickToX && (t.stickToX = n.stickToX), n.stickToY && (t.stickToY = n.stickToY), n.minWidth && (t.bbox.minWidth = n.minWidth), n.minHeight && (t.bbox.minHeight = n.minHeight), n.maxWidth && (t.bbox.maxWidth = n.maxWidth), n.maxHeight && (t.bbox.maxHeight = n.maxHeight), n.imageCtx && (t.imageCtx = n.imageCtx), n.image && (t.image = n.image), e.actions.data.push(t), e.actions.updateToolkit(t), e.actions.sort(), e.actions.reindex();
        var r = e.actions.getById(t.id).zIndex;
        return e.actions.id = r, e.actions.selection = {}, e.actions.selection[r] = !0, t
    }, e.actions.remove = function(t, n) {
        if (typeof t != "undefined") {
            if (typeof t == "number") {
                var r = {};
                r[t] = !0, t = r
            }
            for (var r = [], i = [], s = e.actions.data.length, o = 0; o < s; o++) {
                var u = e.actions.data[o];
                t[o] ? (i.push(e.actions.clone(u)), e.renderCacheClean(u)) : r.push(u)
            }
            n && (e.TimeMachine.store(i), e.TimeMachine.store("remove")), e.actions.data = r
        }
    }, e.actions.removeByName = function(t) {
        for (var n = e.actions, r = n.data, i = [], s = r.length; s--;) {
            var o = r[s];
            o.name === t && (i.push(o), r.splice(s, 1), e.renderCacheClean(o))
        }
        n.reindex(), i.length && (r = n.clone(i), e.TimeMachine.store(r), e.TimeMachine.store("remove"))
    }, e.actions.select = function(t, n) {
        var r = e.actions,
            i = r.data[t];
        if (!i) return console.log("error: id = ", t);
        if (n) r.selection[t] = !0, r.id = void 0;
        else {
            var s = i.toolkit;
            e.tool.type !== i.type && (r.toolkit && (r.toolkit.disable(), delete r.toolkit), i.type === "text" && s) && (r.toolkit = s, r.toolkit.enable()), r.deselectAll(), r.selection = {}, r.selection[t] = !0, r.id = t
        }
    }, e.actions.selectAll = function(t) {
        var n = e.actions.selection,
            r = e.actions.data.length;
        e.actions.id = void 0, e.actions.controls = [];
        for (var i = 0; i < r; i++) t && n[i] ? delete n[i] : n[i] = !0;
        e.actions.checkForSingleSelection()
    }, e.actions.checkForSingleSelection = function() {
        var t = e.actions.selection,
            n = 0,
            r;
        for (r in t) n++;
        if (n === 0) e.ui.buildConfigure();
        else if (n > 1) e.actions.id = void 0, e.actions.controls = [];
        else {
            e.actions.select(parseInt(r)), n = e.actions.data[e.actions.id];
            if (!n) return console.log(r, t);
            e.ColorPicker.updateFromAction(n), e.ui.buildConfigure(n.type), n.type === "text" && (e.area.textarea.innerHTML = n.content, e.area.textarea.style.color = n.fillStyle, n.toolkit.updateActionSize())
        }
    }, e.actions.deselectAll = function() {
        e.area.hide(), e.actions.id = void 0, e.actions.controls = [], e.actions.selection = {}
    }, e.actions.cut = function() {
        for (var t = e.actions, n = t.selection, r = t.data, i = [], s = r.length; s--;) if (n[s]) {
            var o = r[s];
            i.push(o), r.splice(s, 1), e.renderCacheClean(o)
        }
        t.reindex(), e.TimeMachine.store(t.clone(i).reverse()), e.TimeMachine.store("remove"), t.copies = t.clone(i), t.deselectAll()
    }, e.actions.copy = function() {
        for (var t = e.actions, n = t.selection, r = t.data, i = [], s = r.length; s--;) n[s] && i.push(r[s]);
        t.copies = t.clone(i)
    }, e.actions.paste = function() {
        var t = e.actions;
        if (t.copies.length) {
            t.deselectAll();
            for (var n = t.selection, r = t.data, i = t.copies, s = i.length, o = s; o--;) {
                var u = t.clone(i[o]);
                t.getById(u.id) && (i[o].id = u.id = t.createId()), n[r.length] = !0, r.push(u), t.updateToolkit(u), u.toolkit.loadResource(u, function() {
                    --s || (e.actions.checkForSingleSelection(), e.renderActions("actions.paste"))
                }, !1)
            }
            t.reindex(), e.TimeMachine.store("add"), e.TimeMachine.store(t.clone(i))
        }
    }, e.actions.move = function(t, n, r) {
        for (var i = e.actions, s = i.selection, i = i.data, o = [], u = [], a = i.length, f = 0, l = 0; l < a; l++) if (s[l]) {
            var h = i[l],
                p = h.bbox;
            switch (r) {
                case "record":
                    o.push({
                        id: h.id,
                        bbox: {
                            x: p.ox,
                            y: p.oy
                        }
                    }), u.push({
                        id: h.id,
                        bbox: {
                            x: p.x,
                            y: p.y
                        }
                    }), delete p.ox, delete p.oy;
                    break;
                case "cache":
                    p.ox = p.x, p.oy = p.y;
                default:
                    p.x += t, p.y += n, h.dirtyTransform = !0, e.actions.constrain(h)
            }
            f++
        }
        f && r === "record" && (e.TimeMachine.store(o), e.TimeMachine.store(u))
    }, e.actions.constrain = function(t) {
        var n = e.canvas2d.width,
            r = e.canvas2d.height,
            i = t.bbox,
            s = i.height,
            o = i.width;
        if (t.constrain || t.constrainX || t.constrainY) {
            var u = t.trx,
                a = i.x,
                f = i.y,
                l = u.point2d(a + o, f),
                h = u.point2d(a + o, f + s),
                p = u.point2d(a, f + s),
                d = Math.max(l.x, h.x, i.x, p.x),
                u = Math.max(l.y, h.y, i.y, p.y),
                v = Math.min(l.x, h.x, i.x, p.x),
                p = Math.min(l.y, h.y, i.y, p.y),
                l = a - v,
                h = f - p,
                d = n - Math.max(0, d - v) + l,
                u = r - Math.max(0, u - p) + h;
            t.constrain ? (i.x = Math.max(l, Math.min(d, a)), i.y = Math.max(h, Math.min(u, f))) : t.constrainX ? (i.x = Math.max(l, Math.min(d, a)), i.y = f) : t.constrainY && (i.x = a, i.y = Math.max(h, Math.min(u, f)))
        }
        t.stickToX ? i.x = Math.max(n - o, Math.min(0, i.x)) : t.stickToY && (i.y = Math.max(r - s, Math.min(0, i.y)))
    }, e.actions.sendForwards = function(t) {
        var n = e.actions,
            r = n.selection,
            i = n.data,
            s = i.length,
            o;
        for (o in r) if (parseInt(o) === s - 1) return;
        o = [];
        var u = [];
        if (t) {
            for (var t = [], a = [], f = 0; f < s; f++) r[f] ? (t.push(i[f]), delete r[f]) : a.push(i[f]);
            f = 0;
            for (s = t.length; f < s; f++) r[a.length] = !0, a.push(t[f]);
            r = e.actions.clone(t), n.data = a, n.reindex(), f = 0;
            for (s = t.length; f < s; f++) o.push({
                id: i[f].id,
                zIndex: r[f].zIndex
            }), u.push({
                id: i[f].id,
                zIndex: t[f].zIndex
            })
        } else {
            for (f = s; f--;) r[f] && f !== s - 1 && (i.splice(f, 0, i.splice(f + 1, 1)[0]), o.push({
                id: i[f].id,
                zIndex: f
            }), u.push({
                id: i[f].id,
                zIndex: f + 1
            }), r[f + 1] = !0, delete r[f]);
            n.reindex()
        }
        e.actions.checkForSingleSelection(), e.TimeMachine.store(o), e.TimeMachine.store(u)
    }, e.actions.sendBackwards = function(t) {
        for (var n = e.actions, r = n.selection, i = n.data, s = i.length, o = 0, u = 0; u < s; u++) {
            if (!i[u].stickToBack) break;
            o++
        }
        for (var a in r) if (parseInt(a) === o) return;
        o = [], a = [];
        if (t) {
            for (var t = [], f = [], u = 0; u < s; u++) r[u] || i[u].stickToBack ? (r[t.length] = !0, t.push(i[u]), delete r[u]) : f.push(i[u]);
            r = e.actions.clone(t), u = 0;
            for (s = f.length; u < s; u++) t.push(f[u]);
            n.data = t, n.reindex(), u = 0;
            for (s = r.length; u < s; u++) o.push({
                id: i[u].id,
                zIndex: r[u].zIndex
            }), a.push({
                id: i[u].id,
                zIndex: t[u].zIndex
            })
        } else {
            for (u = 0; u < s; u++) r[u] && u !== 0 && (i.splice(u, 0, i.splice(u - 1, 1)[0]), o.push({
                id: i[u].id,
                zIndex: u
            }), a.push({
                id: i[u].id,
                zIndex: u - 1
            }), r[u - 1] = !0, delete r[u]);
            n.reindex()
        }
        e.actions.checkForSingleSelection(), e.TimeMachine.store(o), e.TimeMachine.store(a)
    };
    var t = function(e, t) {
        return e.zIndex > t.zIndex ? 1 : -1
    };
    e.actions.sort = function() {
        e.actions.data.sort(t)
    }, e.actions.reindex = function() {
        for (var t = e.actions.data, n = 0; n < t.length; n++) t[n].zIndex = n
    }, e.actions.updateToolkit = function(t) {
        switch (t.type) {
            case "text":
                t.toolkit = e.toolkits["area-text"];
                break;
            case "svg":
            case "image":
                t.toolkit = e.toolkits["area-media"];
                break;
            case "stamp":
            case "eraser":
            case "pencil":
            case "chrome":
            case "shader":
            case "streamer":
            case "spirograph":
            case "calligraphy":
            case "paintbrush":
            case "textbrush":
                t.toolkit = e.toolkits.brush;
                break;
            default:
                console.log('Missing toolkit "' + t.type + '"'), t.toolkit = e.toolkits.brush
        }
    }, e.actions.getToolkit = function(t) {
        switch (t) {
            case "text":
                return e.toolkits["area-text"];
            case "svg":
            case "image":
                return e.toolkits["area-media"];
            case "stamp":
            case "eraser":
            case "pencil":
            case "chrome":
            case "shader":
            case "streamer":
            case "spirograph":
            case "calligraphy":
            case "paintbrush":
            case "textbrush":
                return e.toolkits.brush;
            case "select":
                return e.toolkits.select;
            default:
                return console.log('Missing toolkit "' + t + '"'), e.toolkits.brush
        }
    }, e.actions.getById = function(t) {
        for (var n = e.actions.data, r = 0; r < n.length; r++) if (n[r].id === t) return n[r]
    }, e.actions.createId = function() {
        for (var t = 0, n = e.actions.data, r = 0; r < n.length; r++) n[r].id > t && (t = n[r].id);
        return t + 1
    }, e.actions.createHash = function(e) {
        for (var t = "", r = [e]; r.length;) {
            var e = r.shift(),
                i;
            for (i in e) if (!n[i] && i !== "id" && i !== "zIndex" && i !== "element" && i !== "image" && i !== "imageCtx" && i !== "clamp" && i !== "brush" && i !== "data" && (i !== "scale" || e.type) && i !== "boxWidth" && i !== "boxHeight") if (i === "bbox") {
                if (t += "boxWidth:" + e.bbox.boxWidth, t += "boxHeight:" + e.bbox.boxHeight, e.bbox.scale) {
                    var s = e.bbox.scale;
                    t += "scale:" + s.x + "," + s.y
                }
            } else typeof e[i] != "object" ? t += i + ":" + e[i] : e[i] && !e.getImageData && !e.parentNode && r.push(e[i])
        }
        e = 5381, r = 0;
        for (i = t.length; r < i; r++) s = t[r].charCodeAt(), e = (e << 5) + e + s;
        return e
    }, e.actions.clone = function(t, r) {
        if (!t || typeof t != "object") return t;
        if (t.getImageData) return t;
        var i = new t.constructor,
            s;
        for (s in t) n[s] || (i[s] = !t[s] || typeof t[s] != "object" ? t[s] : e.actions.clone(t[s]));
        return r ? JSON.stringify(i) : i
    }, e.actions.getBBox = function() {
        for (var t = Infinity, n = -Infinity, r = Infinity, i = -Infinity, s = 0; s < e.actions.data.length; s++) {
            var o = e.actions.data[s].bbox;
            o.x < t && (t = o.x), o.y < r && (r = o.y);
            var u = o.boxWidth * o.scale.x,
                a = o.boxHeight * o.scale.y;
            o.x + u > n && (n = o.x + u), o.y + a > i && (i = o.y + a)
        }
        return t = Math.max(0, t), r = Math.max(0, r), {
            x: t,
            y: r,
            width: Math.min(e.canvas2d.layers.layer0.width - t, n - t),
            height: Math.min(e.canvas2d.layers.layer0.height - r, i - r)
        }
    }, e.actions.cloneConfigure = function(e) {
        var t = new e.constructor;
        if (typeof e.value != "undefined") return e.value;
        for (var n in e) n !== "clamp" && (t[n] = typeof e[n] != "object" ? e[n] : typeof e[n].value != "undefined" ? e[n].value : this.cloneConfigure(e[n]));
        return t
    };
    var n = function(e, t) {
        return t = t.split(","), t.map(function(t) {
            e[t] = !0
        }), e
    }({}, "hash,render,renderCache,breaks,brush,image,imageCtx,dirty,dirtyCache,dirtyTransform,dirtyRender,placement,ctx,trx,svg,toolkit");
    return e
}(sketch), typeof sketch == "undefined" && (sketch = {});
var sketch = function(e) {
    e.area = function(r) {
        var s = this;
        return r.defaultWidth = r.defaultWidth || (r.type === "text" ? 300 : 100), r.defaultHeight = r.defaultHeight || 100, r.minWidth = r.minWidth || 15, r.minHeight = r.minHeight || 15, this.construct = function() {
            return this.ctx = r.layer0.ctx, this.active = r.active.ctx, this.cache = r.cache.ctx, this.container = t, this.container.className = "textareaWrapper", setTimeout(function() {
                n(), s.container.appendChild(e.area.textarea), e.canvas2d.container.appendChild(s.container)
            }, 250), this
        }, this.enable = function() {
            e.tool !== e.toolkits.select && e.toolkits.select.enable({
                cursor: !0,
                cancelSelection: !0,
                search: this.type
            })
        }, this.disable = function() {
            e.tool !== e.toolkits.select && e.toolkits.select.disable({
                cursor: !0
            })
        }, this.construct(), e.area[r.type](r, this), this
    };
    var t = document.createElement("div"),
        n = function() {
            var n;
            if (e.area.textarea) {
                n = e.area.textarea.style.cssText;
                var r = e.area.textarea.innerHTML;
                e.area.textarea.parentNode.removeChild(e.area.textarea)
            }
            e.area.textarea = document.createElement("div"), e.area.textarea.className = "textarea", e.area.textarea.setAttribute("contentEditable", "true"), e.area.textarea.style.cssText = n + ";" + e.text.CSSWhiteSpace, e.area.textarea.innerHTML = r, t.appendChild(e.area.textarea);
            if (n = sketch.toolkits["area-text"]) Event.add(e.area.textarea, "keydown", n.keydown), Event.add(e.area.textarea, "keypress", n.keypress), Event.add(e.area.textarea, "keyup", n.keyup)
        };
    e.area.buttons = {}, e.area.deleteEvent = function(t) {
        var n = t.target,
            r = function() {
                Event.remove(n, "mouseup", r);
                if (e.area.hover === "delete") {
                    e.area.hide(), e.actions.remove(e.actions.id, !e.area.inGenesis), e.actions.deselectAll();
                    var t = 0,
                        i = setInterval(function() {
                            e.active.save(), e.active.globalAlpha = .25, e.active.globalCompositeOperation = "destination-out", e.active.fillRect(0, 0, e.active.canvas.width, e.active.canvas.width), e.active.restore(), t++ > 10 && (clearInterval(i), e.renderActions("root.deleteAction"))
                        }, 25)
                }
            };
        Event.add(n, "mouseup", r), Event.cancel(t)
    }, e.area.moveEvent = function(t) {
        typeof e.actions.data[e.actions.id] != "undefined" && Event.proxy.drag({
            position: "absolute",
            event: t,
            target: e.active.canvas,
            listener: function(t, n) {
                switch (n.state) {
                    case "down":
                        e.actions.move(0, 0, "cache");
                        break;
                    case "move":
                        e.actions.move(n.x - (n.px || 0), n.y - (n.py || 0));
                        break;
                    case "up":
                        e.actions.move(0, 0, "record")
                }
                n.px = n.x, n.py = n.y, e.area.updateBBox(), Event.cancel(t)
            }
        })
    }, e.area.rotateEvent = function(t) {
        var n = e.actions.data[e.actions.id];
        if (typeof n != "undefined") {
            var r = n.bbox,
                i = r.x,
                s = r.y,
                o = r.rotate,
                u = null;
            Event.proxy.drag({
                position: "relative",
                event: t,
                target: e.active.canvas,
                listener: function(t, a) {
                    Event.cancel(t), a.state === "down" ? e.area.active = "rotate" : a.state === "up" && (e.area.active = "");
                    if (i - a.x !== 0 || s - a.y !== 0) {
                        var f = -Math.atan2(i - a.x, s - a.y) * RAD_DEG;
                        u === null && (u = f), r.rotate = (o - (u - f) + 360) % 360, n.dirtyTransform = !0, e.area.updateBBox(), a.state === "up" && (a.start.x !== a.x || a.start.y !== a.y) && (e.TimeMachine.store([{
                            id: n.id,
                            bbox: {
                                rotate: o
                            }
                        }]), e.TimeMachine.store([{
                            id: n.id,
                            bbox: {
                                rotate: r.rotate
                            }
                        }]))
                    }
                }
            })
        }
    }, e.area.scaleEvent = function(t) {
        var n = e.actions.data[e.actions.id];
        if (typeof n != "undefined") {
            var r = n.type === "text";
            Event.proxy.getCoord(t);
            var i = n.bbox,
                s = i.x,
                o = i.y,
                u = t.shiftKey,
                a, f = i.scale.x,
                l = i.scale.x,
                h = null,
                p, d = function() {
                    delete i.scaleCache, n.dirty = !0, f = a, e.area.updateBBox()
                };
            if (r) {
                if (u) {
                    var v = 1 / i.scale.x,
                        m = 1 / i.scale.y,
                        g = i.rotate * DEG_RAD,
                        y = new Vector.Transform;
                    y.translate(i.x, i.y), g && y.rotate(-g), y.translate(-i.x * v, - i.y * m), y.scale(v, m)
                }
                n.breaks = e.text.drawLineBreaks({
                    fillStyle: n.fillStyle,
                    fontVariant: n.fontVariant,
                    fontStyle: n.fontStyle,
                    fontWeight: n.fontWeight,
                    fontSize: n.fontSize,
                    fontFamily: n.fontFamily,
                    content: n.content,
                    bbox: i
                })
            }
            Event.proxy.drag({
                position: "relative",
                event: t,
                target: e.active.canvas,
                listener: function(t, i) {
                    Event.cancel(t), i.state === "down" ? e.area.active = "scale" : i.state === "up" && (e.area.active = "");
                    var v = n.bbox;
                    if (s - i.x !== 0 || o - i.y !== 0) {
                        var m = i.state === "up" && (i.start.x !== i.x || i.start.y !== i.y);
                        r && !i.fontSize && (i.width = v.width, i.height = v.height, i.boxWidth = v.boxWidth, i.boxHeight = v.boxHeight, i.viewBox = clone(v.viewBox), i.breaks = clone(n.breaks), i.fontSize = parseFloat(n.fontSize));
                        if (r && u) {
                            var g = y.point2d(s, o),
                                b = y.point2d(i.x, i.y),
                                w = Math.max(50, b.x - g.x),
                                g = Math.max(50, b.y - g.y);
                            v.width = w, v.boxWidth = w, v.viewBox[2] = w, v.height = g, v.boxHeight = g, v.viewBox[3] = g, delete n.breaks, n.dirty = !0, e.area.updateBBox(), m && (e.TimeMachine.store([{
                                id: n.id,
                                bbox: {
                                    width: i.width,
                                    height: i.height,
                                    boxWidth: i.boxWidth,
                                    boxHeight: i.boxHeight,
                                    viewBox: i.viewBox
                                }
                            }]), e.TimeMachine.store([{
                                id: n.id,
                                bbox: {
                                    width: v.width,
                                    height: v.height,
                                    boxWidth: v.boxWidth,
                                    boxHeight: v.boxHeight,
                                    viewBox: v.viewBox
                                }
                            }]))
                        } else if (w = i.x - s, g = i.y - o, a = Math.sqrt(w * w + g * g), h === null && (h = a), a = a / h * l, a * v.width < v.minWidth && (a = v.minWidth / v.width), a * v.height < v.minHeight && (a = v.minHeight / v.height), a * v.width > v.maxWidth && (a = v.maxWidth / v.width), a * v.height > v.maxHeight && (a = v.maxHeight / v.height), r) v.width = a * i.width, v.height = a * i.height, v.boxWidth = a * i.boxWidth, v.boxHeight = a * i.boxHeight, v.viewBox[2] = a * i.viewBox[2], v.viewBox[3] = a * i.viewBox[3], n.fontSize = a * i.fontSize + "px", n.breaks.lineHeight = a * i.breaks.lineHeight, n.dirty = !0, n.toolkit.updateActionSize(n), m && (e.TimeMachine.store([{
                            id: n.id,
                            fontSize: i.fontSize,
                            bbox: {
                                width: i.width,
                                height: i.height,
                                boxWidth: i.boxWidth,
                                boxHeight: i.boxHeight,
                                viewBox: i.viewBox
                            }
                        }]), e.TimeMachine.store([{
                            id: n.id,
                            fontSize: n.fontSize,
                            bbox: {
                                width: v.width,
                                height: v.height,
                                boxWidth: v.boxWidth,
                                boxHeight: v.boxHeight,
                                viewBox: v.viewBox
                            }
                        }]));
                        else {
                            v.scale = {
                                x: a,
                                y: a
                            }, m && (e.TimeMachine.store([{
                                id: n.id,
                                bbox: {
                                    scale: {
                                        x: l,
                                        y: l
                                    }
                                }
                            }]), e.TimeMachine.store([{
                                id: n.id,
                                bbox: {
                                    scale: v.scale
                                }
                            }]));
                            if (i.state === "up" || v.scaleCache < .5 || v.scaleCache > 2) return d();
                            n.dirtyTransform = !0, v.scaleCache = 1 + (a - f) * 1 / f, clearTimeout(p), p = setTimeout(d, 250), e.area.updateBBox()
                        }
                    }
                }
            })
        }
    }, e.area.updateBBox = function() {
        var t = e.actions.data[e.actions.id];
        typeof t != "undefined" && (e.actions.constrain(t), e.active.canvas.width = e.active.canvas.width, e.area.updateTextareaCSS(t), e.renderActions("root.area.updateBBox"))
    }, e.area.cleanText = function(e) {
        return e.split("&nbsp;").join(" ").split("<br>").join("\n").split("<div>").join("\n").split("\r").join("\n").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/(<([a-z/]+)>)/ig, "")
    }, e.area.entities = function(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    }, e.area.updateTextareaCSS = function(n) {
        if (typeof n == "undefined" && (n = e.actions.data[e.actions.id], typeof n == "undefined")) return;
        if (typeof n.bbox != "undefined") {
            e.area.textarea && (e.area.textarea.style.font = e.text.getFontStyle(n));
            var r = n.bbox
        } else r = n;
        var s = e.canvas2d.scale,
            o = r.rotate,
            u = r.scale.x * s,
            a = r.scale.y * s,
            f = n.blur || 0,
            l = t.style;
        l.padding = f / 2 + "px", l.left = r.x * s + e.canvas2d.left + "px", l.top = r.y * s + e.canvas2d.top + "px", l.width = r.boxWidth - f + "px", l.height = r.boxHeight - f + "px", l.transform = l.msTransform = l.OTransform = l.MozTransform = l.WebkitTransform = "rotate(" + o + "deg) scale(" + u + "," + a + ")", l.transformOrigin = l.msTransformOrigin = l.OTransformOrigin = l.MozTransformOrigin = l.WebkitTransformOrigin = "0 0", l.opacity = (n.opacity || 0) / 100, r = n.fillStyle, typeof r != "undefined" && (typeof r.H != "undefined" && (r = Color.Space.HSLA_W3(r)), e.area.blur = n.blur || 0, e.area.updateColor(r))
    }, e.area.renderControls = function(t) {
        e.active.canvas.width = e.active.canvas.width;
        for (var n in e.actions.data) {
            n = parseInt(n);
            var r = e.actions.data[n];
            e.actions.id === n ? e.area.drawControls(e.active, r) : t === n && e.area.drawControls(e.active, r, !0)
        }
    }, e.area.drawControls = function(t, n, r) {
        var i = n.bbox,
            s = Math.round(i.x - 10),
            o = Math.round(i.y - 10),
            u = e.container;
        t.save(), t.translate(i.x - u.scrollLeft, i.y - u.scrollTop), t.rotate(i.rotate * DEG_RAD), t.translate(-i.x, - i.y), t.lineWidth = 2, t.strokeStyle = r ? "rgba(0,200,255,0.5)" : "rgba(0,255,0,0.5)", t.strokeRect(s + .5, o + .5, i.scale.x * i.boxWidth + 20, i.scale.y * i.boxHeight + 20), t.restore();
        if (!r) {
            if (!n.placement) return console.log("action.placement not available");
            if (n.type === "text") var a = i.boxWidth,
                u = i.boxHeight;
            else a = i.viewBox[2], u = i.viewBox[2] / i.boxWidth * i.boxHeight;
            r = n.placement.clone(), r.translate(-i.x, - i.y);
            var f = 1 / i.scale.x,
                l = 1 / i.scale.y,
                s = r.point2d(i.x - f, i.y - l),
                o = r.point2d(a + i.x, u + i.y),
                u = r.point2d(i.x - f, u + i.y),
                a = r.point2d(a + i.x, i.y - l);
            e.actions.controls = [], e.actions.controls.push({
                id: "area",
                type: "button",
                cursor: "move",
                event: e.area.moveEvent,
                bbox: {
                    x: i.x,
                    y: i.y,
                    left: -10,
                    top: -10,
                    boxWidth: i.scale.x * i.boxWidth + 20,
                    boxHeight: i.scale.y * i.boxHeight + 20,
                    rotate: i.rotate,
                    scale: {
                        x: 1,
                        y: 1
                    }
                }
            }), n.hideClose || (e.actions.controls.push({
                id: "delete",
                type: "button",
                cursor: "pointer",
                event: e.area.deleteEvent,
                bbox: {
                    x: s.x,
                    y: s.y,
                    left: -20,
                    top: -20,
                    boxWidth: 20,
                    boxHeight: 20,
                    rotate: i.rotate,
                    scale: {
                        x: 1,
                        y: 1
                    }
                }
            }), l = e.area.hover === "delete" || e.area.active === "delete", l = e.area.buttons["close-" + (l ? "hover" : "normal")], f = 23 / l.viewBox[2], t.save(), t.shadowColor = "black", t.shadowBlur = 1, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.beginPath(), r.reset(), r.translate(s.x, s.y), r.rotate(i.rotate * DEG_RAD), r.translate(-20, - 20), r.apply(t), l.render({
                ctx: t,
                matrix: {
                    a: f,
                    b: 0,
                    c: 0,
                    d: f,
                    x: 0,
                    y: 0
                }
            }), t.restore()), n.hideMove || (e.actions.controls.push({
                id: "move",
                type: "button",
                cursor: "pointer",
                event: e.area.moveEvent,
                bbox: {
                    x: u.x,
                    y: u.y,
                    left: -20,
                    top: 0,
                    boxWidth: 20,
                    boxHeight: 20,
                    rotate: i.rotate,
                    scale: {
                        x: 1,
                        y: 1
                    }
                }
            }), l = e.area.hover === "move" || e.area.active === "move", l = e.area.buttons["move-" + (l ? "hover" : "normal")], f = 23 / l.viewBox[2], t.save(), t.shadowColor = "black", t.shadowBlur = 1, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.beginPath(), r.reset(), r.translate(u.x, u.y), r.rotate(i.rotate * DEG_RAD), r.translate(-20, 0), r.apply(t), l.render({
                ctx: t,
                matrix: {
                    a: f,
                    b: 0,
                    c: 0,
                    d: f,
                    x: 0,
                    y: 0
                }
            }), t.restore()), n.hideScale || (e.actions.controls.push({
                id: "scale",
                type: "button",
                cursor: "pointer",
                event: e.area.scaleEvent,
                bbox: {
                    x: o.x,
                    y: o.y,
                    left: 0,
                    top: 0,
                    boxWidth: 20,
                    boxHeight: 20,
                    rotate: i.rotate,
                    scale: {
                        x: 1,
                        y: 1
                    }
                }
            }), l = e.area.hover === "scale" || e.area.active === "scale", l = e.area.buttons["scale-" + (l ? "hover" : "normal")], f = 23 / l.viewBox[2], t.save(), t.shadowColor = "black", t.shadowBlur = 1, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.beginPath(), r.reset(), r.translate(o.x, o.y), r.rotate(i.rotate * DEG_RAD), r.translate(0, 0), r.apply(t), l.render({
                ctx: t,
                matrix: {
                    a: f,
                    b: 0,
                    c: 0,
                    d: f,
                    x: 0,
                    y: 0
                }
            }), t.restore()), n.hideRotate || (e.actions.controls.push({
                id: "rotate",
                type: "button",
                cursor: "pointer",
                event: e.area.rotateEvent,
                bbox: {
                    x: a.x,
                    y: a.y,
                    left: 0,
                    top: -20,
                    boxWidth: 20,
                    boxHeight: 20,
                    rotate: i.rotate,
                    scale: {
                        x: 1,
                        y: 1
                    }
                }
            }), l = e.area.hover === "rotate" || e.area.active === "rotate", l = e.area.buttons["rotate-" + (l ? "hover" : "normal")], f = 23 / l.viewBox[2], t.save(), t.shadowColor = "black", t.shadowBlur = 1, t.shadowOffsetX = 1, t.shadowOffsetY = 1, t.beginPath(), r.reset(), r.translate(a.x, a.y), r.rotate(i.rotate * DEG_RAD), r.translate(0, - 20), r.apply(t), l.render({
                ctx: t,
                matrix: {
                    a: f,
                    b: 0,
                    c: 0,
                    d: f,
                    x: 0,
                    y: 0
                }
            }), t.restore())
        }
    }, e.area.blur = 0, e.area.updateColor = function(t) {
        if (e.area.textarea) {
            var n = e.area.blur;
            e.area.textarea.style.textShadow = "0 0 " + n + "px " + t, e.area.textarea.style.color = n ? "rgba(0,0,0,0)" : t
        }
    };
    var r = {};
    return e.area.hide = function() {
        e.area.textarea || n();
        var s = e.actions.data[e.actions.id];
        e.editing = !1, e.area.hidden = !0, e.area.textarea.innerHTML = "", e.area.textarea.blur(), t.style.opacity = 0, t.style.display = "none";
        if (s && s.type === "text") {
            if (!s.content.trim()) {
                e.TimeMachine.popAction(), e.actions.data.pop(), e.actions.deselectAll(), e.area.inGenesis = !1, r = {};
                return
            }
            s.dirty = !0
        }
        e.area.inGenesis ? (e.area.inGenesis = !1, s && (e.TimeMachine.popAction(), e.TimeMachine.store("add"), e.TimeMachine.store([e.actions.clone(s)]))) : typeof r.id != "undefined" && r.type === "text" && ((s = e.actions.getById(r.id)) && r.content !== s.content && (e.TimeMachine.store([{
            id: s.id,
            content: r.content
        }]), e.TimeMachine.store([{
            id: s.id,
            content: s.content
        }])), n(), r = {})
    }, e.area.show = function(n) {
        r = e.actions.clone(n), e.area.blur = n.blur || 0, e.area.updateColor(n.fillStyle), n.type === "text" ? (e.editing = !0, e.area.hidden = !1, e.area.textarea.innerHTML = n.content || "", e.area.textarea.blur(), e.area.updateTextareaCSS(), e.renderActions(), t.style.opacity = 1, t.style.display = "block", e.text.range.selectAll(e.area.textarea)) : (e.editing = !1, e.area.hidden = !0, e.area.textarea.innerHTML = "", t.style.opacity = 0, t.style.display = "none")
    }, e
}(sketch),
    SVGButtons = {
        close: {
            hover: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">	<stop  offset="0" style="stop-color:#0093E7"/>	<stop  offset="1" style="stop-color:#001CF2"/></linearGradient><rect stroke="rgba(255,255,255,0.5)" fill="url(#SVGID_1_)" x="0" y="0" rx="2" ry="2" width="12" height="12"/><path stroke="none" fill="#FFFFFF" d="M2,10.516l2.982-4.553L2.28,1.79h2.059l1.75,2.804L7.804,1.79h2.042L7.131,6.028l2.982,4.487H7.988	L6.054,7.498l-1.94,3.018H2z"/></svg>',
            normal: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve">	<linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#777777"/>		<stop  offset="1" style="stop-color:#222222"/>	</linearGradient>	<rect x="0" y="0" rx="2" ry="2" fill="url(#SVGID_1_)" width="12" height="12"/>	<path fill="#FFFFFF" d="M2.145,10.516l2.982-4.553L2.425,1.79h2.059l1.75,2.804L7.948,1.79H9.99L7.275,6.028l2.982,4.487H8.133		L6.198,7.498l-1.94,3.018H2.145z"/></svg>'
        },
        move: {
            hover: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px"	 height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#0093E7"/>		<stop  offset="1" style="stop-color:#001CF2"/>	</linearGradient><rect stroke="rgba(255,255,255,0.5)" fill="url(#SVGID_1_)" x="0" y="0" rx="2" ry="2" width="12" height="12"/><path stroke="none" fill="#FFFFFF" d="M9.284,3.718l1.243,1.243V1.734H7.301l1.251,1.252L6.134,5.391L3.729,2.972l1.243-1.244H1.745v3.227	l1.252-1.252L5.4,6.119L2.982,8.525L1.74,7.283v3.227h3.227L3.712,9.256L6.13,6.854l2.406,2.42l-1.241,1.242h3.226V7.289	L9.268,8.543L6.862,6.125L9.284,3.718z"/></svg>',
            normal: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve">	<linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#777777"/>		<stop  offset="1" style="stop-color:#222222"/>	</linearGradient>	<path fill="url(#SVGID_1_)" d="M2,0h8c1.104,0,2,0.896,2,2v8c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2C0,0.896,0.896,0,2,0z"/>	<path fill="#FFFFFF" d="M9.284,3.718l1.243,1.243V1.734H7.301l1.251,1.252L6.134,5.391L3.729,2.972l1.243-1.244H1.745v3.227		l1.252-1.252L5.4,6.119L2.982,8.525L1.74,7.283v3.227h3.227L3.712,9.256L6.13,6.854l2.406,2.42l-1.241,1.242h3.226V7.289		L9.268,8.543L6.862,6.125L9.284,3.718z"/></svg>'
        },
        rotate: {
            hover: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px"	 height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#0093E7"/>		<stop  offset="1" style="stop-color:#001CF2"/>	</linearGradient>	<rect stroke="rgba(255,255,255,0.5)" fill="url(#SVGID_1_)" x="0" y="0" rx="2" ry="2" width="12" height="12"/>	<path stroke="none" fill="#FFFFFF" d="M1.74,4.056l2.328,2.328V4.561c2.015,0,3.654,1.67,3.654,3.724h-1.86l2.328,2.327l2.328-2.327H8.731		c0-2.61-2.092-4.733-4.664-4.733V1.728L1.74,4.056z"/></svg>',
            normal: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve">	<linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#777777"/>		<stop  offset="1" style="stop-color:#222222"/>	</linearGradient>	<path fill="url(#SVGID_1_)" d="M2,0h8c1.104,0,2,0.896,2,2v8c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2C0,0.896,0.896,0,2,0z"/>	<path fill="#FFFFFF" d="M1.74,4.056l2.328,2.328V4.561c2.015,0,3.654,1.67,3.654,3.724h-1.86l2.328,2.327l2.328-2.327H8.731		c0-2.61-2.092-4.733-4.664-4.733V1.728L1.74,4.056z"/></svg>'
        },
        scale: {
            hover: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="12px"	 height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#0082d6"/>		<stop  offset="1" style="stop-color:#001CF2"/>	</linearGradient>	<rect stroke="rgba(255,255,255,0.5)" fill="url(#SVGID_1_)" x="0" y="0" rx="2" ry="2" width="12" height="12"/>	<path stroke="none" fill="#FFFFFF" d="M10.517,7.288v3.228H7.29l1.301-1.302L6.718,7.329L7.45,6.6l1.872,1.883L10.517,7.288z M4.825,5.552		L2.99,3.706l-1.25,1.25V1.728h3.227L3.72,2.975l1.838,1.849L4.825,5.552z M7.439,5.324L5.333,7.431L4.822,6.918l2.106-2.105		L7.439,5.324z"/></svg>',
            normal: '<?xml version="1.0" encoding="utf-8"?><!-- Generator: Adobe Illustrator 15.0.2, SVG Export Plug-In . SVG Version: 6.00 Build 0)  --><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 width="12px" height="12px" viewBox="0 0 12 12" enable-background="new 0 0 12 12" xml:space="preserve">	<linearGradient id="SVGID_1_" gradientUnits="objectBoundingBox" y1="1" x1="1">		<stop  offset="0" style="stop-color:#777777"/>		<stop  offset="1" style="stop-color:#222222"/>	</linearGradient>	<path fill="url(#SVGID_1_)" d="M2,0h8c1.104,0,2,0.896,2,2v8c0,1.104-0.896,2-2,2H2c-1.104,0-2-0.896-2-2V2C0,0.896,0.896,0,2,0z"/>	<path fill="#FFFFFF" d="M10.517,7.288v3.228H7.29l1.301-1.302L6.718,7.329L7.45,6.6l1.872,1.883L10.517,7.288z M4.825,5.552		L2.99,3.706l-1.25,1.25V1.728h3.227L3.72,2.975l1.838,1.849L4.825,5.552z M7.439,5.324L5.333,7.431L4.822,6.918l2.106-2.105		L7.439,5.324z"/></svg>'
        }
    };
typeof sketch == "undefined" && (sketch = {}), typeof sketch.area == "undefined" && (sketch.area = {}), sketch = function(e) {
    return e.area.media = function(t, n) {
        n.id = "area-media", n.changeColor = function() {}, n.updateActionSize = function(e) {
            if (e.type === "image") {
                e.imageCtx || (e.imageCtx = document.createElement("canvas").getContext("2d"));
                var t = new ColorMatrix,
                    n = e.imageCtx.canvas,
                    r = e.imageCtx,
                    i = e.bbox.width * e.bbox.scale.x,
                    s = e.bbox.height * e.bbox.scale.y;
                n.width = Math.round(i) || 1, n.height = Math.round(s) || 1, t.reset(), t.update("saturation", e.saturation), t.update("tint", e.tint), t.update("temperature", e.temperature), t.update("exposure", e.exposure), t.update("brightness", e.brightness), t.update("contrast", e.contrast), r.drawImage(e.image, 0, 0, i, s), t.apply(r)
            }
        }, n.loadResource = function(t, r, i) {
            if (!t.src) return r(t);
            var s = t.src,
                o = t.bbox,
                u = o.owidth || o.width,
                a = o.oheight || o.height,
                f = function(e, t) {
                    u / e > a / t && (a = u / e * t), u / e < a / t && (u = a / t * e), o.width = u, o.height = a, o.boxWidth = u, o.boxHeight = a, o.owidth || (o.owidth = u), o.oheight || (o.oheight = a)
                }, l = e.actions.cloneConfigure(e.configure.tools[t.type]),
                h;
            for (h in l) typeof t[h] == "undefined" && (t[h] = l[h]);
            i && (i = t.type.ucwords(), l = s.split("/").pop(), e.loader.message("Loading " + i + "...<br>&ldquo;" + l + "&rdquo;")), i = function() {
                var n = e.cache,
                    r = n.canvas;
                s.split("/").pop(), r.width = t.bbox.width, r.height = t.bbox.height, n.fillStyle = "#000", n.fillRect(0, 0, r.width, r.height), d.src = r.toDataURL()
            };
            if (s.split(".").pop() === "svg") {
                var p = s.indexOf("/shapes/") !== -1;
                return new Vector.SVG({
                    ctx: e.canvas2d.layers.cache.ctx,
                    src: s,
                    srcs: e.actions.srcs,
                    onerror: i,
                    onload: function(e) {
                        var n = e.viewBox;
                        f(n[2] - n[0], n[3] - n[1]), t.bbox.viewBox = n, t.svg = e, t.dirty = !0, t.render = function(t, n) {
                            e.render({
                                ctx: t,
                                matrix: n.matrix,
                                defaultFill: p ? this.color : "black"
                            })
                        }, r && r(t)
                    }
                })
            }
            if (l = function() {
                var e = [0, 0, d.width, d.height];
                f(e[2] - e[0], e[3] - e[1]), t.bbox.viewBox = e, t.image = d, t.dirty = !0, t.render = function(e) {
                    (this.dirty || !this.imageCtx) && n.updateActionSize(this);
                    var t = this.imageCtx.canvas;
                    e.save(), e.drawImage(t, 0, 0), e.restore()
                }, r && r(t)
            }, e.actions.srcs && e.actions.srcs[s] && (s = e.actions.srcs[s]), typeof FlashCanvas != "undefined") {
                var d = new Image;
                d.src = s, n.ctx.loadImage(d, l, i)
            } else d = new Image, d.onerror = i, d.onload = l, d.src = s
        }, n.createAction = function(r) {
            if (e.ColorPicker.state !== "eyeDropper") {
                var s = n.style;
                if (s.render) {
                    var o = s.bbox;
                    Math.min(r.start.x, r.x), Math.min(r.start.y, r.y);
                    var u = Math.abs(r.start.x - r.x),
                        a = Math.abs(r.start.y - r.y),
                        f = o.boxWidth,
                        l = o.boxHeight;
                    u / f > a / l ? a = u / f * l : u = a / l * f, o.x = r.start.x, o.y = r.start.y, o.width = u, o.height = a;
                    if (r.state === "down") u = e.actions.cloneConfigure(e.configure.tools[e.tool.type]), u.render = s.render, u.bbox = clone(o), e.actions.add(u, s);
                    else {
                        s = e.actions.data[e.actions.id], s.bbox.x = o.x, s.bbox.y = o.y, s.bbox.width = o.width, s.bbox.height = o.height, s.bbox.boxWidth = o.width, s.bbox.boxHeight = o.height, s.bbox.owidth = o.width, s.bbox.oheight = o.height, s.dirty = !0, s.dirtyTransform = !0;
                        if (r.state === "up") {
                            if (s.bbox.width < t.minWidth || s.bbox.height < t.minHeight) {
                                if (!e.forcePlacement) {
                                    e.actions.data.pop(), e.renderActions("create-up");
                                    return
                                }
                                u = t.defaultWidth, a = t.defaultHeight, u / f > a / l && (a = u / f * l), u / f < a / l && (u = a / l * f), s.bbox.width = u, s.bbox.boxWidth = u, s.bbox.height = a, s.bbox.boxHeight = a
                            }
                            e.TimeMachine.store("add"), e.TimeMachine.store([e.actions.clone(s)])
                        }
                        e.area.updateBBox()
                    }
                } else r.pause && r.pause(), n.loadResource(s, function() {
                    r.resume && r.resume(), n.createAction(r)
                }, !1)
            }
        }, n.style = {
            bbox: {
                x: 0,
                y: 0,
                width: 100,
                height: 100,
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                }
            }
        }
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.placement = function(t) {
        var n = t.trx ? t.trx.reset() : new Vector.Transform,
            r = t.bbox,
            i = t.pt0,
            s = t.pt1,
            o = e.container;
        n.translate(-o.scrollLeft, - o.scrollTop);
        var u = s.x,
            a = s.y,
            s = i.x,
            i = i.y,
            f = u - s || .001,
            l = a - i || .001,
            h = !t.doRotate && f < 0,
            p = !t.doRotate && l < 0,
            d = f < 0 ? 1 : -1,
            v = l < 0 ? 1 : -1,
            o = h ? -1 : 1,
            m = p ? -1 : 1,
            u = typeof t.rotate == "undefined" ? -Math.atan2(s - u, i - a) : t.rotate,
            a = r.viewBox[2],
            g = r.viewBox[3],
            y = f / a || 0,
            r = l / g || 0;
        return t.doLockRatio && (y = Math.max(Math.abs(r), Math.abs(y)), r = y * v, y *= d), l > 0 && (r *= -1), f > 0 && (y *= -1), t.doRotate && (n.translate(s, i), n.rotate(u), n.translate(-s, - i), h && (s += -a * y), p && (i += -g * r)), t.doScale && (t.doCenter ? (f = o * y * a / 2, l = m * r * g / 2) : l = f = 0, n.translate(s - f, i - l), n.scale(y * o, r * m)), t.scale && n.scale(t.scale.x, t.scale.y), n
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.area == "undefined" && (sketch.area = {}), sketch = function(e) {
    return e.area.text = function(t, n) {
        n.id = "area-text", n.loadResource = function(t, n, r) {
            t.dirty = !0, t.render = function() {
                var t = clone(this.bbox);
                t.x = 0, t.y = 0, t.rotate = 0, this.breaks = e.text.drawLineBreaks({
                    ctx: this.ctx,
                    opacity: this.opacity,
                    composite: this.composite,
                    fillStyle: this.fillStyle,
                    fontVariant: this.fontVariant,
                    fontStyle: this.fontStyle,
                    fontWeight: this.fontWeight,
                    fontSize: this.fontSize,
                    fontFamily: this.fontFamily,
                    blur: this.blur,
                    content: this.content,
                    breaks: this.breaks,
                    bbox: t
                })
            };
            var i = t.fontFamily,
                s = e.media.text[i] ? "http://fonts.googleapis.com/css?family=" + i + ":regular" : e.paths.fonts + i.toLowerCase().replace(" ", "_") + ".css";
            r && e.loader.message("Loading Font-Family...<br>&ldquo;" + i + "&rdquo;"), e.text.attach({
                family: i,
                href: s,
                callback: function(e) {
                    e && (e = "&ldquo;" + i + "&rdquo; font-family unavailable."), n && n(t, e)
                }
            })
        }, n.keydown = function(e) {
            (e.keyCode === 86 || e.keyCode === 88 || e.keyCode === 90) && Event.proxy.metaKey && setTimeout(function() {
                n.updateActionSize()
            }, 25)
        }, n.keyup = function(t) {
            if (t.keyCode === 27) e.actions.deselectAll(), e.renderActions("text.keyup");
            else if (!Event.proxy.metaKey || t.keyCode !== 88 && t.keyCode !== 86) {
                if (t.keyCode === 8) {
                    var t = e.area.textarea,
                        r = e.area.cleanText(e.area.textarea.innerHTML),
                        i = e.text.getRange(),
                        s = r.substr(0, i.startOffset),
                        r = r.substr(i.endOffset);
                    e.area.textarea.innerHTML = e.area.entities(s + r), (s = s.length) && e.text.setRange(t, s, s), n.updateActionSize()
                }
            } else n.updateActionSize()
        }, n.keypress = function(t) {
            if (typeof e.actions.data[e.actions.id] != "undefined" && t.which !== 0 && t.keyCode !== 8) {
                Event.prevent(t);
                var r = e.area.textarea,
                    i = e.area.cleanText(e.area.textarea.innerHTML),
                    t = e.area.cleanText(String.fromCharCode(t.charCode || t.keyCode)),
                    s = e.text.getRange(e.area.textarea),
                    o = i.substr(0, s.startOffset),
                    i = i.substr(s.endOffset);
                e.area.textarea.innerHTML = e.area.entities(o + t + i), (i = (o + t).length) && e.text.setRange(r, i, i), n.updateActionSize()
            }
        }, n.createAction = function(r) {
            var s = n.style;
            if (e.ColorPicker.state !== "eyeDropper") if (typeof s.render == "undefined") r.pause(), n.loadResource(n.style, function() {
                r.resume(), n.createAction(r)
            });
            else {
                r.state === "down" && e.area.show(n.style);
                var o = s.bbox;
                Math.min(r.start.x, r.x), Math.min(r.start.y, r.y), o.x = r.start.x, o.y = r.start.y, o.width = Math.abs(r.start.x - r.x) || 1, o.height = Math.abs(r.start.y - r.y) || 1;
                if (r.state === "down") var u = e.configure.tools.text,
                    s = e.actions.add({
                        type: "text",
                        blur: u.blur.value,
                        opacity: u.opacity.value,
                        fontVariant: u.fontVariant,
                        fontStyle: u.fontStyle,
                        fontSize: u.fontSize,
                        fontFamily: u.fontFamily,
                        fontWeight: u.fontWeight,
                        fillStyle: u.fill.color,
                        render: n.style.render,
                        content: "",
                        bbox: clone(o)
                    }, s);
                else if (s = e.actions.data[e.actions.id], s.bbox.x = o.x, s.bbox.y = o.y, s.bbox.width = o.width, s.bbox.height = o.height, s.bbox.boxWidth = o.width, s.bbox.boxHeight = o.height, s.bbox.viewBox = [0, 0, o.width, o.height], s.dirty = !0, s.dirtyTransform = !0, r.state === "up") {
                    if (s.bbox.width < t.minWidth || s.bbox.height < t.minHeight) {
                        if (!e.forcePlacement) {
                            e.area.hide(), e.actions.data.pop(), e.renderActions("create-up");
                            return
                        }
                        s.bbox.width = t.defaultWidth, s.bbox.boxWidth = t.defaultWidth, s.bbox.height = t.defaultHeight, s.bbox.boxHeight = t.defaultHeight, s.bbox.viewBox = [0, 0, t.defaultWidth, t.defaultHeight]
                    }
                    e.TimeMachine.store("add"), e.TimeMachine.store([e.actions.clone(s)]), e.area.inGenesis = !0, setTimeout(function() {
                        e.area.textarea.blur(), e.area.textarea.focus()
                    }, 10)
                }
                e.area.updateBBox()
            }
        }, n.updateBBox = function() {
            var t = e.actions.data[e.actions.id];
            typeof t != "undefined" && (t.content && (e.area.textarea.innerHTML = e.area.cleanText(t.content)), e.area.textarea.style.font = e.text.getFontStyle(t), e.area.updateTextareaCSS(t), e.renderActions("root.updateAction"))
        }, n.updateActionSize = function(t) {
            var r = e.editing || !t ? e.area.cleanText(e.area.textarea.innerHTML) : t.content,
                t = t || e.actions.data[e.actions.id];
            if (typeof t != "undefined") {
                e.text.getFontStyle(t), r || (r = " ");
                var i = ((t.blur || 0) * 2 + (t.diameter || 0) + (t.lineWidth || 0)) * (t.scale ? t.scale.max : 1),
                    s = e.text.drawLineBreaks({
                        fillStyle: t.fillStyle,
                        fontVariant: t.fontVariant,
                        fontStyle: t.fontStyle,
                        fontWeight: t.fontWeight,
                        fontSize: t.fontSize,
                        fontFamily: t.fontFamily,
                        blur: t.blur,
                        content: r || " ",
                        bbox: t.bbox
                    });
                t.content = r, t.breaks = s, r = t.bbox.width + i / 2, i = s.height + i / 2, s = {
                    x: t.bbox.x,
                    y: t.bbox.y,
                    boxWidth: r,
                    boxHeight: i,
                    viewBox: [0, 0, r, i]
                }, s.width = t.bbox.width, s.height = t.bbox.height, s.scale = t.bbox.scale, s.rotate = t.bbox.rotate, t.bbox.boxHeight !== i && (t.bbox = s, n.container.style.height = s.height + "px", e.renderActions("root.updateActionSize()")), e.area.updateTextareaCSS(t)
            }
        }, n.changeColor = function(e) {
            n.style.fillStyle = e
        }, n.style = {
            fontWeight: "bold",
            fontSize: "41px",
            fontFamily: "Arial",
            fontVariant: "",
            fontStyle: "",
            bbox: {
                x: 200,
                y: 18,
                width: 400,
                height: 470,
                rotate: 0,
                scale: {
                    x: 1,
                    y: 1
                }
            }
        }
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.brush = function(t) {
        function n(t, n) {
            var r = this.brush;
            this.dirty && i.cloneAttributes(this, r), r.colors = [0, this.color || "#000"], r.isRecording = !1;
            var s = r.composite === "disco",
                o = e.defineComposite(r.composite);
            r.ctx = t, r.active = i.active, r.cache = i.cache;
            for (var u = -1, a = this.data, l = a.length, h = [], p = 0; p < l; p++) a[p].beginPath && u++, h[u] || (h[u] = []), h[u].push(a[p]);
            l = this.bbox, t.save(), n.matrix.x = l.viewBox[0] * l.scale.x, n.matrix.y = l.viewBox[1] * l.scale.y, n.apply(t);
            for (p = 0; p < h.length; p++) {
                u = h[p], u.time || (u.time = 0), r.path = u;
                if (r.render) r.render(this);
                else {
                    t.save(), t.globalAlpha = 1, t.globalCompositeOperation = o, a = 0;
                    for (l = u.length; a < l; a++) {
                        var d = u[a],
                            v = d.x,
                            m = d.y;
                        r.x = v, r.y = m;
                        if (d.cmd === "M") {
                            var g = i.position["1x"] = v,
                                y = i.position["1y"] = m,
                                b = g,
                                w = y;
                            r.state = "down", r.px = b, r.py = w, i.gestures++, r.drawStart && (r.time = ++u.time, r.drawStart())
                        } else d.cmd === "z" && r.drawEnd && (r.state = "up", r.time = ++u.time, r.drawEnd()), g = i.position["1x"], y = i.position["1y"], b = g, w = y, r.px = b, r.py = w;
                        r.interval && (i.intervals[1] = d);
                        var E = r.flow.max,
                            S = g > v ? g - v : v - g,
                            x = y > m ? y - m : m - y,
                            S = (S > x ? S : x) + 1;
                        if (!(S < r.flow.min && d.cmd !== "M")) {
                            for (var d = (v - g) / S || 0, x = (m - y) / S || 0, T = E || 1, E = E < S - 1 ? E : S - 1; E < S; E += T) v = g + d * E, m = y + x * E, s && (t.globalCompositeOperation = u.time % 2 === 0 ? "lighter" : "source-over"), r.x = v, r.y = m, r.px = b, r.py = w, r.state = "move", r.time = ++u.time, r.draw(a), b = v, w = m;
                            i.position["1x"] = v, i.position["1y"] = m
                        }
                    }
                    t.restore()
                }
            }
            t.restore()
        }
        function r() {
            (new Date).getTime();
            var t = i.device,
                n = t.composite === "disco",
                s = i.active,
                o = e.defineComposite(t.composite),
                u = t.opacity / 100;
            t.ctx = i.ctx, t.active = i.active, t.cache = i.cache, t.isRecording = !0;
            if (t.preprocess) for (var a in i.batches) {
                var l = i.batches[a];
                if (l.length === 0) break;
                t.path = l.path, t.preprocess()
            } else {
                for (a in i.batches) {
                    l = i.batches[a];
                    if (l.length === 0) break;
                    t.path = l.path, t.finger = a;
                    var h = typeof t.draw != "undefined",
                        s = l[0].state !== "up" ? i.active : i.ctx;
                    s.save(), s.globalAlpha = u, s.globalCompositeOperation = o;
                    for (var p = 0, v = l.length; p < v; p++) {
                        var m = l.shift(),
                            g = m.x,
                            y = m.y;
                        t.x = g, t.y = y;
                        if (m.state === "down") {
                            var b = i.position[a + "x"] = g,
                                w = i.position[a + "y"] = y,
                                E = b,
                                S = w;
                            t.state = "down", t.px = E, t.py = S, i.gestures++, t.drawStart && (t.time = ++l.time, t.drawStart())
                        } else b = i.position[a + "x"], w = i.position[a + "y"], E = b, S = w, t.px = E, t.py = S;
                        t.interval && (i.intervals[a] = m);
                        if (m.state === "up") {
                            i.gestures--, t.drawEnd && (t.state = "up", t.time = ++l.time, t.drawEnd()), i.time = i.batches[a].time, delete i.batches[a], delete i.intervals[a], delete i.position[a + "x"], delete i.position[a + "y"];
                            break
                        }
                        if (h) {
                            var x = t.flow.max,
                                T = b > g ? b - g : g - b,
                                N = w > y ? w - y : y - w,
                                T = (T > N ? T : N) + 1;
                            if (!(T < t.flow.min && m.state !== "down")) {
                                for (var N = (g - b) / T || 0, C = (y - w) / T || 0, k = x || 1, x = x < T - 1 ? x : T - 1; x < T; x += k) g = b + N * x, y = w + C * x, n && (s.globalCompositeOperation = l.time % 2 === 0 ? "lighter" : "source-over"), t.x = g, t.y = y, t.px = E, t.py = S, t.state = "move", t.time = ++l.time, t.draw(), E = g, S = y;
                                i.position[a + "x"] = g, i.position[a + "y"] = y
                            }
                        }
                    }
                    s.restore()
                }
                t.postprocess && t.postprocess()
            }
            typeof m == "undefined" ? i.rendering = !1 : (requestAnimationFrame(r), i.rendering = !0);
            for (a in i.intervals) if (l = i.batches[a]) t = i.intervals[a], l.length > 0 || (l.push({
                x: t.x,
                y: t.y
            }), i.path.push({
                cmd: "M",
                x: t.x,
                y: t.y
            }))
        }
        var i = this;
        this.active = t.active.ctx, this.cache = t.cache.ctx, this.ctx = t.layer0.ctx, this.device = null, this.gestures = 0, this.rendering = !1, this.time = 0, this.path = [], this.batches = {}, this.position = {}, this.intervals = {}, this.enable = function() {
            Event.add(i.active.canvas, "drag", this.record), e.tool !== e.toolkits.select && e.toolkits.select.enable({
                mouse: !1
            })
        }, this.disable = function() {
            Event.remove(i.active.canvas, "drag", this.record), e.tool !== e.toolkits.select && e.toolkits.select.disable({
                mouse: !1
            })
        }, this.loadResource = function(t, r, s) {
            typeof t == "string" && (t = {
                type: t
            });
            var o = e.configure.tools[t.type];
            if (o) {
                t.dirty = !0, t.render = n;
                var u = i.cloneAttributes(t, clone(o));
                if (u.type === "stamp" && s !== !1) {
                    var a = u.src ? u.src.split("/")[3] + "/" + u.src.split("/")[4] : u.type.ucwords();
                    e.loader.message("Loading " + u.type.ucwords() + "...<br>&ldquo;" + a + "&rdquo;")
                }
                u.ctx = i.ctx, u.callback = function(e, n) {
                    t.brush = e, i.device = e, i.device.type = u.type, n && (n = "&ldquo;" + a + "&rdquo; " + e.type + " unavailable."), r && r(t, n)
                };
                if (e.brush[u.type]) return new e.brush[u.type](u);
                console.log("missing brush: " + u.type)
            } else r && r(t)
        }, this.changeColor = function(e) {
            i.device.colors[1] = e
        }, this.cloneAttributes = function(e, t) {
            return e.seed && (t.seed = e.seed), e.spread && (t.spread = e.spread), e.lineWidth && (t.lineWidth = e.lineWidth), e.diameter && (t.diameter = e.diameter), e.blur && (t.blur = e.blur), e.src && (t.src = e.src), e.opacity && (t.opacity = clone(e.opacity)), e.flow && (t.flow = clone(e.flow)), e.rotate && (t.rotate = clone(e.rotate)), e.scale && (t.scale = clone(e.scale)), t
        }, this.updateActionSize = function(t) {
            if (e.configure.tools[t.type].type !== t.toolkit.device.type) return i.loadResource(t, i.updateActionSize, !1);
            var n = t.translate ? t.translate.max : 0,
                r = ((t.blur || 0) * 2 + (t.diameter || 0) + (t.lineWidth || 0) + ((t.outerRadius || 0) + (t.innerRadius || 0))) * (t.scale ? t.scale.max : 1);
            t.type === "streamer" && (r = 20);
            var s = -r / 2;
            if (t.bbox) for (var o = 0; o < t.data.length; o++) {
                var u = t.data[o];
                u.x += t.bbox.x, u.y += t.bbox.y
            }
            var a = new Vector.BBox(e.catmullRomSpline({
                path: t.data,
                tension: 0
            }));
            a.x1 += -n + s, a.y1 += -n + s, a.x2 += n + s, a.y2 += n + s, o = a.x2 - a.x1 + r, r = a.y2 - a.y1 + r, r = {
                x: Math.round(a.x1),
                y: Math.round(a.y1),
                width: o,
                height: r,
                boxWidth: o,
                boxHeight: r,
                viewBox: [0, 0, o, r]
            };
            for (o = 0; o < t.data.length; o++) u = t.data[o], u.x -= a.x1, u.y -= a.y1;
            if (t.firstRecord) return r;
            r.scale = t.bbox.scale, r.rotate = t.bbox.rotate, t.bbox = r
        };
        var s = {
            down: "M",
            move: "L",
            up: "z"
        };
        return this.record = function(t, n) {
            if (e.ColorPicker.state !== "eyeDropper") {
                var o = i.batches[n.id];
                if (!o || n.state === "down") o = i.batches[n.id] = [], o.path = [], o.time = i.time, Event.cancel(t);
                var u = {
                    x: n.x,
                    y: n.y,
                    state: n.state,
                    cmd: s[n.state]
                };
                i.device.click === !0 ? o[0] = u : (o.push(u), o.path.push(u)), e.editable && (n.state === "down" ? (i.device.seed = Math.random() * 2147483648 >> 0, i.path = [], i.path.push({
                    beginPath: !0,
                    cmd: "M",
                    x: n.x,
                    y: n.y
                })) : i.path.push({
                    cmd: n.state === "move" ? "L" : "z",
                    x: n.x,
                    y: n.y
                }), n.state === "up" ? (o = i.cloneAttributes(i.device, e.actions.cloneConfigure(e.configure.tools[e.tool.type])), o.data = i.path, o.toolkit = {
                    device: i.device
                }, o.firstRecord = !0, o = i.cloneAttributes(i.device, {
                    type: i.type,
                    data: i.path,
                    color: i.device.colors[1],
                    composite: i.device.composite,
                    opacity: i.device.opacity,
                    render: i.renderAction,
                    bbox: i.updateActionSize(o)
                }), o = e.actions.add(o), e.actions.deselectAll(), e.TimeMachine.store("add"), e.TimeMachine.store([e.actions.clone(o)]), i.loadResource(o, function() {
                    r(), e.renderActions()
                }, !1)) : i.rendering || r())
            }
        }, this
    }, e.catmullRomSpline = function(e) {
        var t = clone(e.path),
            n = 1 - (e.tension || 0),
            r = t.length - 2;
        t.splice(0, 0, t[0]), t.push(t[t.length - 1]), t.push(t[t.length - 1]);
        if (r <= 0) return e.path;
        for (var e = [], i = 0; i < r; i++) {
            var s = t[i],
                o = t[i + 1],
                u = t[i + 2],
                a = t[i + 3];
            i === 0 && e.push({
                beginPath: !0,
                cmd: "M",
                x: o.x,
                y: o.y
            }), e.push({
                beginPath: !0,
                cmd: "C",
                x1: o.x + (n * u.x - n * s.x) / 6,
                y1: o.y + (n * u.y - n * s.y) / 6,
                x2: u.x + (n * o.x - n * a.x) / 6,
                y2: u.y + (n * o.y - n * a.y) / 6,
                x: u.x,
                y: u.y
            })
        }
        return e
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    return e.brush.chrome = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.spread = t.spread.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.draw = function(e) {
            var t = this.ctx,
                n = this.path,
                r = this.colors,
                i = this.spread * 100,
                e = typeof e == "undefined" ? n.length : e;
            if (e !== 0) {
                var s = n[e - 1],
                    o = n[e - 2] || s,
                    u;
                t.beginPath(), t.globalAlpha = this.opacity / 100, t.lineCap = "round", t.lineWidth = this.lineWidth, t.moveTo(o.x, o.y), t.lineTo(s.x, s.y), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke();
                for (var a = Math.max(0, e - 100); a < e; a++) if (s = n[a].x - n[e - 1].x, o = n[a].y - n[e - 1].y, u = s * s + o * o, u < i) t.beginPath(), t.moveTo(n[e - 1].x + s * .2, n[e - 1].y + o * .2), t.lineTo(n[a].x - s * .2, n[a].y - o * .2), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke()
            }
        }, this.construct(t)
    }, e.brush.shader = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.spread = t.spread.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.draw = function(e) {
            var t = this.ctx,
                n = this.path,
                r = this.colors,
                i = this.spread * 100,
                e = typeof e == "undefined" ? n.length : e,
                s, o;
            t.lineCap = "round", t.lineWidth = this.lineWidth;
            for (var u = 0; u < e; u++) if (s = n[u].x - n[e - 1].x, o = n[u].y - n[e - 1].y, s = s * s + o * o, s < i) t.beginPath(), t.globalAlpha = (1 - s / i) * .1, t.moveTo(n[e - 1].x, n[e - 1].y), t.lineTo(n[u].x, n[u].y), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke()
        }, this.construct(t)
    }, e.brush.sketchy = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.spread = t.spread.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.drawStart = function() {
            this.rand = new Random(this.seed || 1)
        }, this.draw = function(e) {
            var t = this.ctx,
                n = this.path,
                r = this.colors,
                i = this.spread * 100,
                e = typeof e == "undefined" ? n.length : e;
            if (e !== 0) {
                var s = n[e - 1],
                    o = n[e - 2] || s,
                    u;
                t.beginPath(), t.lineCap = "round", t.lineWidth = this.lineWidth, t.moveTo(o.x, o.y), t.lineTo(s.x, s.y), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke();
                for (var a = 0; a < e; a++) if (s = n[a].x - n[e - 1].x, o = n[a].y - n[e - 1].y, u = s * s + o * o, u < i && this.rand.toDouble() > u / i / 2) t.beginPath(), t.moveTo(n[e - 1].x + s * .3, n[e - 1].y + o * .3), t.lineTo(n[a].x - s * .3, n[a].y - o * .3), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke()
            }
        }, this.construct(t)
    }, e.brush.web = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.spread = t.spread.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.drawStart = function() {
            this.rand = new Random(this.seed || 1)
        }, this.draw = function(e) {
            var t = this.ctx,
                n = this.path,
                r = this.colors,
                i = this.spread * 100,
                e = typeof e == "undefined" ? n.length : e;
            if (e !== 0) {
                var s = n[e - 1],
                    o = n[e - 2] || s,
                    u;
                t.beginPath(), t.lineCap = "round", t.lineWidth = this.lineWidth, t.moveTo(o.x, o.y), t.lineTo(s.x, s.y), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke();
                for (s = 0; s < e; s++) if (o = n[s].x - n[e - 1].x, u = n[s].y - n[e - 1].y, o = o * o + u * u, o < i && this.rand.toDouble() < .15) t.beginPath(), t.moveTo(n[e - 1].x, n[e - 1].y), t.lineTo(n[s].x, n[s].y), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke()
            }
        }, this.construct(t)
    }, e.brush.fur = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.spread = t.spread.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.drawStart = function() {
            this.rand = new Random(this.seed || 1)
        }, this.draw = function(e) {
            var t = this.ctx,
                n = this.path,
                r = this.colors,
                i = this.spread / 100,
                e = typeof e == "undefined" ? n.length : e;
            if (e !== 0) {
                var s = n[e - 1],
                    o = n[e - 2] || s,
                    u, a;
                t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(s.x, s.y), t.lineCap = "round", t.lineWidth = this.lineWidth, t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke();
                for (var f = 0; f < e; f++) if (o = n[f].x - n[e - 1].x, u = n[f].y - n[e - 1].y, a = o * o + u * u, a < 2e3 && this.rand.toDouble() < .15) t.beginPath(), t.moveTo(s.x + o * i, s.y + u * i), t.lineTo(s.x - o * i, s.y - u * i), t.strokeStyle = r[(this.time * 2 + 1) % r.length], t.stroke()
            }
        }, this.construct(t)
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    var t = {};
    return e.brush.stamp = function(n) {
        var r = this;
        return this.bitmap = {}, this.onerror = function() {
            r.image.loaded = !0, r.image.error = !0, n.callback(r, "404")
        }, this.onload = function() {
            r.image.loaded = !0, n.callback(r)
        }, this.construct = function(n) {
            this.rand = new Random(this.seed || 1), this.diameter = n.diameter.value || 20, this.opacity = n.opacity.value || 100, this.colors = n.colors || e.defaultValues.colors, this.color_mode = n.color_mode || "normal", this.composite = n.composite, this.interval = n.interval || void 0, this.rotate = n.rotate || {
                min: 0,
                max: 0
            }, this.scale = n.scale || {
                min: 1,
                max: 1
            }, this.translate = n.translate || {
                min: 0,
                max: 0
            }, this.flow = n.flow || {
                min: this.diameter / 3,
                max: this.diameter / 3
            }, this.pollock = n.pollock || !1;
            if (this.src = n.src || void 0) t[this.src] ? t[this.src].loaded ? (this.image = t[this.src], n.callback(r)) : (this.image = t[this.src], Event.add(this.image, "error", this.onerror), Event.add(this.image, "load", this.onload)) : (this.image = new Image, Event.add(this.image, "error", this.onerror), Event.add(this.image, "load", this.onload), this.image.src = this.src, t[this.src] = this.image);
            return this
        }, this.drawStart = function() {
            var t = this.bitmap,
                n = this.finger,
                r;
            e: {
                r = this.finger;
                var i = this.scale.max * this.diameter >> 0,
                    s = document.createElement("canvas"),
                    o = s.getContext("2d");
                if (this.src) {
                    if (this.image.error) {
                        r = o;
                        break e
                    }
                    var u = this.image.width,
                        a = this.image.height;
                    u > i && (a *= i / u, u = i), a > i && (u *= i / a, a = i);
                    var f = Math.sqrt(u * u + a * a);
                    f > i && (i /= f, u *= i, a *= i), s.width = u, s.height = a, o.drawImage(this.image, 0, 0, u, a)
                } else {
                    for (var u = s.width = i, a = s.height = i, s = o.getImageData(0, 0, u, a), i = s.data, f = this.diameter * 25, l = this.diameter / 2, h = 0; h < f; h++) {
                        var p = this.rand.toDouble() * l,
                            d = 1.5 - p / l,
                            v = this.rand.toDouble() * 2 * Math.PI,
                            m = Math.sin(v) * p + l + .5 >> 0,
                            p = Math.cos(v) * p + l + .5 >> 0;
                        m >= u || m <= 0 || p >= a || p <= 0 || (i[(p * u + m) * 4 + 3] = 255 * d)
                    }
                    o.putImageData(s, 0, 0)
                }
                o.globalCompositeOperation = "source-in", o.fillStyle = e.createGradient(o, 0, 0, u, a, this), o.fillRect(0, 0, u, a), f = Math.sqrt(u * u + a * a), this.ratio = 1 / (f / this.diameter), r = this.bitmap[r] = o
            }
            t[n] = r,
            this.rand = new Random(this.seed || 1),
            this.isRecording && (t = this.cache, t.canvas.width = this.ctx.canvas.width, t.canvas.height = this.ctx.canvas.height)
        }, this.draw = function() {
            var e = this.isRecording ? this.cache : this.ctx,
                t = this.ratio,
                n = this.finger;
            if (this.bitmap[n]) {
                var n = this.bitmap[n],
                    r = n.canvas.width,
                    i = n.canvas.height,
                    s = r / 2,
                    o = i / 2;
                if (s && o) {
                    var u = this.translate.min,
                        a = this.translate.max;
                    if (u === 0 && a === 0) var f = 0,
                        u = 0;
                    else f = (a - u) * this.rand.toDouble() + u, u = (a - u) * this.rand.toDouble() + u;
                    var a = this.scale.min,
                        l = this.scale.max,
                        t = a === 1 && l === 1 ? t : ((l - a) * this.rand.toDouble() + a) * t,
                        a = this.rotate.min,
                        l = this.rotate.max,
                        a = a === 0 && l === 0 ? 0 : (l - a) * this.rand.toDouble() + a;
                    this.pollock || e.save(), this.color_mode === "cycle" && (l = this.colors[(this.time * 2 + 1) % this.colors.length], l !== n.fillStyle) && (n.fillStyle = l, n.fillRect(0, 0, r, i)), e.translate(this.x - s * t, this.y - o * t), t !== 1 && e.scale(t, t), a !== 0 && (e.translate(s, o), e.rotate(a * DEG_RAD), e.translate(-s, - o)), e.translate(f * 1 / t, u * 1 / t), e.drawImage(n.canvas, 0, 0), this.pollock || e.restore(), this.isRecording && (this.active.save(), this.active.globalAlpha = this.opacity / 100, this.active.globalCompositeOperation = "copy", this.active.drawImage(e.canvas, 0, 0), this.active.restore())
                }
            }
        }, this.drawEnd = function() {
            delete this.bitmap[this.finger]
        }, this.construct(n)
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    return e.brush.streamer = function(t) {
        var n = {}, r = function(e, t, r, i) {
            var s = .2 * n[t].thickness,
                o = n[t].cos,
                u = n[t].sin,
                a = n[t].color;
            e.beginPath(), e.fillStyle = a, e.strokeStyle = a, e.arc(r, i, s, 0, Math.PI * 2, !0), e.moveTo(n[t].x + o, n[t].y + u), e.lineTo(r + .2 * o, i + .2 * u), e.lineTo(r - .2 * o, i - .2 * u), e.lineTo(n[t].x - o, n[t].y - u), e.lineTo(n[t].x + o, n[t].y + u), e.fill(), e.stroke()
        };
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.flow = t.flow || [0, 0], t.callback(this)
        }, this.drawStart = function() {
            var e = this.finger;
            if (this.isRecording) {
                var t = this.cache;
                t.canvas.width = this.ctx.canvas.width, t.canvas.height = this.ctx.canvas.height
            }
            n[e] = {}, n[e].x = this.x, n[e].y = this.y, n[e].px = this.x, n[e].py = this.y, n[e].time = (new Date).getTime(), n[e].vectorx = 0, n[e].vectory = 0, n[e].thickness = 0, n[e].rotation = Math.PI / 2
        }, this.draw = function() {
            var e = this.finger,
                t = this.colors[(this.time * 2 + 1) % this.colors.length],
                i = this.isRecording ? this.cache : this.ctx;
            if (typeof n[e] != "undefined") {
                var s = this.x - n[e].px,
                    o = this.y - n[e].py,
                    u = (new Date).getTime();
                if (Math.abs(s) > 5 || Math.abs(o) > 5) {
                    s * n[e].vectorx + o * n[e].vectory < 0 && (r(i, e, this.px, this.py), n[e].x = n[e].px = this.px, n[e].y = n[e].py = this.py, n[e].rotation += Math.PI, n[e].thickness *= .2), n[e].x += .42 * (this.x - n[e].x), n[e].y += .42 * (this.y - n[e].y);
                    var a = n[e].x - n[e].px,
                        f = n[e].y - n[e].py,
                        l = Math.sqrt(a * a + f * f),
                        a = l !== 0 ? Math.PI / 2 + Math.atan2(f, a) : 0,
                        f = n[e].thickness + .42 * (.25 + .2 * l - n[e].thickness),
                        c = Math.sin(n[e].rotation),
                        h = Math.cos(n[e].rotation),
                        p = Math.sin(a),
                        v = Math.cos(a),
                        m = n[e].thickness * c,
                        g = n[e].thickness * h;
                    p *= f, v *= f, c *= .33 * l;
                    var y = -0.33 * l * h,
                        l = n[e].px + g + c,
                        h = n[e].py + m + y,
                        c = n[e].px - g + c,
                        y = n[e].py - m + y;
                    i.beginPath(), i.fillStyle = t, i.strokeStyle = t, i.moveTo(n[e].px + g, n[e].py + m), i.quadraticCurveTo(l, h, n[e].x + v, n[e].y + p), i.lineTo(n[e].x - v, n[e].y - p), i.quadraticCurveTo(c, y, n[e].px - g, n[e].py - m), i.lineTo(n[e].px + g, n[e].py + m), i.fill(), i.stroke(), n[e].color = t, n[e].px = n[e].x, n[e].py = n[e].y, n[e].rotation = a, n[e].thickness = f, n[e].vectorx = s, n[e].vectory = o, n[e].cos = v, n[e].sin = p, n[e].time = u, this.isRecording && (this.active.save(), this.active.globalAlpha = this.opacity / 100, this.active.globalCompositeOperation = "copy", this.active.drawImage(i.canvas, 0, 0), this.active.restore())
                }
            }
        }, this.drawEnd = function() {
            var e = this.finger;
            typeof n[e] != "undefined" && (r(this.ctx, e, this.x, this.y), delete n[e])
        }, this.construct(t)
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    return e.brush.spirograph = function(t) {
        var n = !0,
            r = 0,
            i, s, o = 0;
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.lineWidth = t.lineWidth.value || 1, this.diameter = t.diameter.value || 30, this.flow = t.flow || [0, 10], this.interval = t.interval || 1e3 / 60, this.contract = t.contract || 0, this.outerRadius = t.outerRadius.value || 10.2, this.innerRadius = t.innerRadius.value || 3.2, this.speed = t.speed.value || 20, t.callback(this)
        }, this.drawStart = function() {
            o = this.diameter
        }, this.draw = function() {
            var e = this.ctx,
                t = this.colors,
                u = this.innerRadius,
                a = this.outerRadius;
            this.contract === 0 && (o = this.diameter), e.globalAlpha = this.opacity / 100, e.lineWidth = this.lineWidth;
            for (var l = this.speed; l--;) {
                if (o > this.diameter || o < 0) n = !n;
                n ? (r -= 1, o -= this.contract) : (r += 1, o += this.contract);
                var c = (a - u) / u * r,
                    p = (a - u) * Math.cos(r) + o * Math.cos(c),
                    c = (a - u) * Math.sin(r) - o * Math.sin(c);
                p += this.x, c += this.y, i && (e.beginPath(), e.moveTo(i, s), e.lineTo(p, c), e.strokeStyle = t[(this.time * 2 + 1) % t.length], e.stroke()), i = p, s = c
            }
            s = i = void 0
        }, this.construct(t)
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    return e.brush.textbrush = function(t) {
        var n = 0,
            r = 0;
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.fontFamily = t.fontFamily || "Georgia", this.fontSize = t.fontSizeFloor || {
                min: 10,
                max: 100
            }, this.composite = t.composite || "paint", this.text = "Canvas is an extremely heavy-duty plain-woven fabric used for making sails, tents, marquees, backpacks, and other items for which sturdiness is required.", this.flow = t.flow || [0, 10], t.callback(this)
        }, this.drawStart = function() {
            n = this.x, r = this.y
        }, this.draw = function() {
            var e = this.ctx,
                t = this.colors,
                i = this.x - n,
                s = this.y - r,
                o = Math.sqrt(i * i + s * s);
            e.font = Math.max(this.fontSize.min, o / 2) + "px " + this.fontFamily, e.fillStyle = t[(this.time * 2 + 1) % t.length];
            var t = this.text[this.time % this.text.length],
                u = e.measureText(t).width;
            o > u && (i = Math.atan2(s, i), e.translate(n, r), e.rotate(i), e.fillText(t, 0, 0), e.rotate(-i), e.translate(-n, - r), n += Math.cos(i) * u, r += Math.sin(i) * u)
        }, this.construct(t)
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), typeof sketch.brush == "undefined" && (sketch.brush = {}), sketch = function(e) {
    e.brush.calligraphy = function(t) {
        this.construct = function(t) {
            this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.diameter = t.diameter.value || 30, this.flow = t.flow || [0, 0], t.callback(this)
        }, this.drawStart = function() {
            if (this.isRecording) {
                var e = this.cache;
                e.canvas.width = this.ctx.canvas.width, e.canvas.height = this.ctx.canvas.height
            }
        }, this.draw = function() {
            var e = this.isRecording ? this.cache : this.ctx,
                t = this.colors,
                n = this.diameter;
            e.save(), e.beginPath(), e.lineCap = "round", e.translate(-n / 2, n / 4), e.moveTo(this.px, this.py), e.lineTo(this.px + n, this.py - n / 2), e.lineTo(this.x + n, this.y - n / 2), e.lineTo(this.x, this.y), e.closePath(), e.strokeStyle = t[(this.time * 2 + 1) % t.length], e.stroke(), e.fillStyle = t[(this.time * 2 + 1) % t.length], e.fill(), e.restore(), this.isRecording && (this.active.save(), this.active.globalAlpha = this.opacity / 100, this.active.globalCompositeOperation = "copy", this.active.drawImage(e.canvas, 0, 0), this.active.restore())
        }, this.construct(t)
    }, e.brush.pencil = function(n) {
        return this.construct = function(t) {
            return this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.diameter = t.diameter.value || 30, this.flow = t.flow || [0, 0], this.useSmooth = !0, t.callback(this), this
        }, this.preprocess = this.render = function() {
            var n = this.path,
                r = n.length,
                s = n[r - 1].cmd === "z",
                n = s ? this.ctx : this.active,
                o = this.colors[1 % this.colors.length],
                u = this.diameter,
                a = this.active.canvas.width,
                f = this.active.canvas.height;
            n.save(), n.beginPath(), s ? (this.active.clearRect(0, 0, a, f), this.active.canvas.style.background = "", this.ctx.canvas.style.display = "inline", n.globalAlpha = 1) : (this.active.clearRect(0, 0, a, f), this.active.canvas.style.background = this.ctx.canvas.style.background, this.active.drawImage(this.ctx.canvas, 0, 0), this.ctx.canvas.style.display = "none", n.globalAlpha = this.opacity / 100, n.globalCompositeOperation = e.defineComposite(this.composite));
            if (s || this.useSmooth) t({
                path: this.path,
                tension: 0,
                ctx: n
            });
            else for (s = 0; s < r; s++) a = this.path[s], a.cmd === "M" ? (n.moveTo(a.x, a.y), n.lineTo(a.x + .1, a.y + .1)) : n.lineTo(a.x, a.y);
            n.lineCap = "round", n.lineJoin = "round", n.lineWidth = u, n.strokeStyle = o, n.stroke(), n.restore()
        }, this.construct(n)
    }, e.brush.paintbrush = function(n) {
        return this.bitmap = {}, this.construct = function(t) {
            return this.opacity = t.opacity.value || 100, this.colors = t.colors || e.defaultValues.colors, this.composite = t.composite || "paint", this.diameter = t.diameter.value || 30, this.blur = t.blur.value || 10, this.flow = t.flow || [0, 0], this.useSmooth = !0, t.callback(this), this
        }, this.preprocess = this.render = function(n) {
            var r = this.path,
                s = r.length,
                o = r[s - 1].cmd === "z",
                r = o ? this.ctx : this.active,
                u = this.colors[1 % this.colors.length],
                a = this.diameter,
                f = this.blur,
                l = this.active.canvas.width,
                h = this.active.canvas.height;
            if (n && n.bbox) var p = n.bbox.scale.x,
                n = n.bbox.boxWidth;
            else p = 1, n = 5e3;
            r.save(), r.beginPath(), o ? (this.active.clearRect(0, 0, l, h), this.active.canvas.style.background = "", this.ctx.canvas.style.display = "inline", r.globalAlpha = 1) : (this.active.clearRect(0, 0, l, h), this.active.canvas.style.background = this.ctx.canvas.style.background, this.active.drawImage(this.ctx.canvas, 0, 0), this.ctx.canvas.style.display = "none", r.globalAlpha = this.opacity / 100, r.globalCompositeOperation = e.defineComposite(this.composite));
            if (o || this.useSmooth) r.translate(-n, 0), t({
                path: this.path,
                tension: 0,
                ctx: r
            });
            else for (o = 0; o < s; o++) l = this.path[o], l.cmd === "M" ? (r.moveTo(l.x - n, l.y), r.lineTo(l.x - n + .1, l.y + .1)) : r.lineTo(l.x - n, l.y);
            r.lineCap = "round", r.lineJoin = "round", r.lineWidth = a, r.shadowOffsetX = n * p, r.shadowOffsetY = 0, r.shadowBlur = f * p, r.shadowColor = u, r.strokeStyle = "#000", r.stroke(), r.restore()
        }, this.construct(n)
    };
    var t = function(e) {
        var t = clone(e.path),
            n = 1 - (e.tension || 0),
            e = e.ctx,
            r = t.length - 2;
        t.splice(0, 0, t[0]), t.push(t[t.length - 1]), t.push(t[t.length - 1]);
        if (r <= 0) {
            var i = t[0],
                s = t[1];
            e.moveTo(i.x, i.y), e.lineTo(s.x + .1, s.y + .1)
        } else for (var o = 0; o < r; o++) {
            var i = t[o],
                s = t[o + 1],
                u = t[o + 2],
                a = t[o + 3];
            o === 0 && (e.beginPath(), e.moveTo(s.x, s.y)), e.bezierCurveTo(s.x + (n * u.x - n * i.x) / 6, s.y + (n * u.y - n * i.y) / 6, u.x + (n * s.x - n * a.x) / 6, u.y + (n * s.y - n * a.y) / 6, u.x, u.y)
        }
    };
    return e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    var t = "Difference,Exclusion,Hue,Saturation,Color,Luminosity,Darker,Lighter,Dissolve,Additive,Subtractive,Multiply,ColorBurn,LinearBurn,Screen,ColorDodge,LinearDodge,Overlay,SoftLight,HardLight,VividLight,LinearLight,PinLight,HardMix".split(",");
    return e.configure = {
        setStyle: function(e) {
            var n = e.color_noise;
            if (e.fill.type === "gradient") for (var r = e.fill.gradient.split(","), s = 0; s < r.length; s += 2) r[s] = parseFloat(r[s]), r[s + 1] = parseInt("0x" + r[s + 1]);
            else r = parseInt("0xFF" + e.fill.color), r = [0, r, 1, r];
            if (e.color_mode === "cycle" || !e.color_mode) {
                for (var s = [], o = 0; o < r.length; o += 2) s.push(r[o] * .5), s.push(r[o + 1]);
                for (o = r.length - 1; o > 0; o -= 2) s.push(1 - r[o - 1] * .5), s.push(r[o]);
                r = s
            }
            e.colors = Gradient.getNoise({
                dna: r,
                length: 1e3,
                resolution: 1,
                blend: t[5],
                H: n ? 10 : 0,
                S: n ? 20 : 0,
                L: n ? 10 : 0
            })
        },
        defaults: {
            opacity: "%",
            lineWidth: "px-float",
            spread: "px",
            diameter: "px",
            rotate: "clamp-degree",
            blur: "%",
            flow: "integer",
            scale: "clamp-float",
            tint: "clamp-float",
            temperature: "clamp-float",
            brightness: "clamp-float",
            contrast: "clamp-float",
            exposure: "clamp-float",
            saturation: "clamp-float",
            outerRadius: "float",
            innerRadius: "float",
            speed: "integer",
            sides: "integer",
            slope: "float",
            coils: "integer",
            spread: "%",
            points: "integer",
            m: "integer",
            n1: "float",
            n2: "float",
            n3: "float",
            color_noise: "boolean"
        },
        types: {
            "clamp-float": "slide",
            "clamp-degree": "slide",
            "clamp-px": "slide",
            "px-float": "slide",
            integer: "slide",
            "float": "slide",
            px: "slide",
            "%": "slide",
            "boolean": "toggle",
            list: "list",
            style: "style"
        },
        typesDisplay: {
            "clamp-float": "x",
            "clamp-degree": "°",
            "px-float": "px",
            "clamp-px": "px",
            px: "px",
            "%": "%"
        },
        tools: {
            move: {
                toolkit: "move",
                type: "move"
            },
            snapshot: {
                toolkit: "snapshot",
                type: "snapshot"
            },
            select: {
                toolkit: "select",
                type: "select"
            },
            ellipse: {
                toolkit: "shape",
                type: "ellipse",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ffff5db1,0.5,ffef017c,1,ffef017c"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        max: 100,
                        min: 0
                    }
                }
            },
            rectangle: {
                toolkit: "shape",
                type: "rectangle",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ffff5db1,0.5,ffef017c,1,ffef017c"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        max: 100,
                        min: 0
                    }
                }
            },
            polygon: {
                toolkit: "shape",
                type: "polygon",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ffff0000,0.25,ffffff00,0.5,ffffff00,0.75,ff00ff00,1,ff00ff00"
                },
                noise: !0,
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 5,
                    clamp: {
                        min: 1,
                        max: 25
                    }
                }
            },
            gear: {
                toolkit: "shape",
                type: "gear",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff2c539e,0.5,ff2c539e,1,ff2c539e"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 30,
                    clamp: {
                        min: 2,
                        max: 100
                    }
                },
                slope: {
                    value: 1.1,
                    clamp: {
                        min: .001,
                        max: 5
                    }
                }
            },
            star: {
                toolkit: "shape",
                type: "star",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ffcdeb8b,0.5,ffcdeb8b,1,ffcdeb8b"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 5,
                    clamp: {
                        min: 2,
                        max: 100
                    }
                },
                slope: {
                    value: .5,
                    clamp: {
                        min: -10,
                        max: 10
                    }
                }
            },
            burst: {
                toolkit: "shape",
                type: "burst",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff9c2224,0.09,ffc42d25,0.18,ffc42d25,0.255,ffe23f30,0.33,ffe23f30,0.415,ffef5d41,0.5,ffef5d41,0.55,fff38d4e,0.6,fff38d4e,0.67,fff59a3a,0.74,fff59a3a,0.815,fffabf58,0.89,fffabf58,0.945,fffccfa0,1,fffccfa0"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 5,
                    clamp: {
                        min: 2,
                        max: 100
                    }
                },
                slope: {
                    value: .001,
                    clamp: {
                        min: -10,
                        max: 10
                    }
                }
            },
            radialburst: {
                toolkit: "shape",
                type: "radialburst",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff9c2224,0.09,ffc42d25,0.18,ffc42d25,0.255,ffe23f30,0.33,ffe23f30,0.415,ffef5d41,0.5,ffef5d41,0.55,fff38d4e,0.6,fff38d4e,0.67,fff59a3a,0.74,fff59a3a,0.815,fffabf58,0.89,fffabf58,0.945,fffccfa0,1,fffccfa0"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 12,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                slope: {
                    value: .5,
                    clamp: {
                        min: -10,
                        max: 10
                    }
                }
            },
            spiral: {
                toolkit: "shape",
                type: "spiral",
                composite: "paint",
                movement: "placement",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff607e80,0.25,ff9fd962,0.5,ff9fd962,0.75,fff3fa58,1,fff3fa58"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                sides: {
                    value: 10,
                    clamp: {
                        min: 1,
                        max: 20
                    }
                },
                coils: {
                    value: 1,
                    clamp: {
                        min: 1,
                        max: 5
                    }
                },
                spread: {
                    value: 25,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            supershape: {
                toolkit: "shape",
                type: "supershape",
                composite: "paint",
                movement: "repeat",
                fill: {
                    type: "gradient",
                    color: "ff0000",
                    gradient: "0,ff15aeeb,0.3333333,ff8157ba,0.50818891461434,ffed008a,0.6717635,fff47961,1,fffbf239"
                },
                color_mode: "radial",
                color_noise: !0,
                opacity: {
                    value: 5,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                points: {
                    value: 500,
                    clamp: {
                        min: 50,
                        max: 1e3
                    }
                },
                m: {
                    value: 39,
                    clamp: {
                        min: .1,
                        max: 50
                    }
                },
                n1: {
                    value: 1,
                    clamp: {
                        min: .1,
                        max: 15
                    }
                },
                n2: {
                    value: .9,
                    clamp: {
                        min: .1,
                        max: 15
                    }
                },
                n3: {
                    value: .25,
                    clamp: {
                        min: .1,
                        max: 15
                    }
                }
            },
            text: {
                toolkit: "area-text",
                type: "text",
                composite: "paint",
                fontWeight: "bold",
                fontSize: "41px",
                fontFamily: "Arial",
                fontVariant: "",
                fontStyle: "",
                fill: {
                    type: "color",
                    color: "0085c8"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                blur: {
                    value: 0,
                    clamp: {
                        min: 0,
                        max: 25
                    }
                }
            },
            image: {
                toolkit: "area-media",
                type: "image",
                composite: "paint",
                src: "./media/brush/Basic/0-live.png",
                temperature: {
                    id: "White Balance->Temp",
                    type: "ColorMatrix",
                    gradient: ["#568fcf", "#f7e146"],
                    value: 0,
                    clamp: {
                        min: -64,
                        max: 64
                    }
                },
                tint: {
                    id: "White Balance->Tint",
                    type: "ColorMatrix",
                    gradient: ["#00ae47", "#c73baf"],
                    value: 0,
                    clamp: {
                        min: -64,
                        max: 64
                    }
                },
                exposure: {
                    id: "Exposure->Exposure",
                    type: "ColorMatrix",
                    gradient: ["#777", "#eee"],
                    value: 0,
                    clamp: {
                        min: -1.5,
                        max: 1.5
                    }
                },
                brightness: {
                    id: "Exposure->Brightness",
                    type: "ColorMatrix",
                    color: ["#ddd", "#eee"],
                    value: 0,
                    clamp: {
                        min: -50,
                        max: 50
                    }
                },
                contrast: {
                    id: "Enhance->Contrast",
                    type: "ColorMatrix",
                    value: 0,
                    clamp: {
                        min: -0.5,
                        max: .5
                    }
                },
                saturation: {
                    id: "Enhance->Saturation",
                    type: "ColorMatrix",
                    value: 1,
                    clamp: {
                        min: 0,
                        max: 2
                    }
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            svg: {
                toolkit: "area-media",
                type: "svg",
                composite: "paint",
                src: "./media/clipart/Monsters/monster0.svg",
                color: "rgba(0,0,0,1)",
                fill: {
                    type: "color",
                    color: "000000"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            textbrush: {
                toolkit: "brush",
                type: "textbrush",
                composite: "paint",
                fill: {
                    type: "color",
                    color: "0085c8"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 4294967295
                },
                diameter: {
                    value: 10,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            pencil: {
                toolkit: "brush",
                type: "pencil",
                composite: "paint",
                fill: {
                    type: "color",
                    color: "0085c8"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 4294967295
                },
                diameter: {
                    value: 10,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            eraser: {
                toolkit: "brush",
                type: "paintbrush",
                composite: "erase",
                fill: {
                    type: "color",
                    color: "rgba(0,0,0,0.75)"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 4294967295
                },
                diameter: {
                    value: 40,
                    clamp: {
                        min: 1,
                        max: 250
                    }
                },
                blur: {
                    value: 20,
                    clamp: {
                        min: 0,
                        max: 100
                    }
                }
            },
            paintbrush: {
                toolkit: "brush",
                type: "paintbrush",
                composite: "paint",
                fill: {
                    type: "color",
                    color: "e90808"
                },
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 4294967295
                },
                diameter: {
                    value: 20,
                    clamp: {
                        min: 1,
                        max: 250
                    }
                },
                blur: {
                    value: 20,
                    clamp: {
                        min: 0,
                        max: 100
                    }
                }
            },
            crayon: {
                toolkit: "brush",
                type: "crayon",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "1b0045",
                    gradient: "0,fffa6c0c,0.04,fff6300a,0.08,fff6300a,0.145,ffd11b7e,0.21,ffd11b7e,0.28,ff7425b1,0.35,ff7425b1,0.42,ff0a62da,0.49,ff0a62da,0.56,ff00c000,0.63,ff00c000,0.715,fff6ef2a,0.8,fff6ef2a,0.9,fffa6c0c,1,fffa6c0c"
                },
                color_noise: !1,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                rotate: {
                    hidden: !0,
                    min: 0,
                    max: 360
                },
                diameter: {
                    value: 19,
                    clamp: {
                        min: 3,
                        max: 42
                    }
                }
            },
            streamer: {
                toolkit: "brush",
                type: "streamer",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "ffff00",
                    gradient: "0.06567889822065,ff005ee6,0.1176747,ff1912ea,0.22994306504649997,ff27032e,0.37598319999999996,ff43013a,0.43984393878431993,ff5f0046,0.544758,ff7e003a,0.6070303324195799,ff9e002f,0.7105123,ffce1129,0.77393466551848,fffe2323,0.8197397,fff6441a,0.8692658678592999,ffee6611,0.930715,fff68617,0.9802042847244999,ffffa61e"
                },
                color_noise: !0,
                opacity: {
                    value: 50,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 50
                }
            },
            calligraphy: {
                toolkit: "brush",
                type: "calligraphy",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "1b0045",
                    gradient: "0,ff000022,0.175,ff191024,0.28333335,ff322027,0.3916667,ff4c322d,0.5000000499999999,ff664433,0.6083334,ff8a5d3d,0.71666675,ffae7747,0.8250001,ffce9056,1,ffeeaa66"
                },
                color_noise: !1,
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 5,
                    max: 5
                },
                diameter: {
                    value: 17,
                    clamp: {
                        min: 1,
                        max: 50
                    }
                }
            },
            chrome: {
                toolkit: "brush",
                type: "chrome",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff45484d,0.5,ff000000,1,ff000000"
                },
                color_noise: !0,
                opacity: {
                    value: 15,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 100
                },
                lineWidth: {
                    value: 1,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                spread: {
                    value: 20,
                    clamp: {
                        min: 1,
                        max: 50
                    }
                },
                lookback: 2e3
            },
            shader: {
                toolkit: "brush",
                type: "shader",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "FF0000",
                    gradient: "0,ff000022,0.175,ff191024,0.28333335,ff322027,0.3916667,ff4c322d,0.5000000499999999,ff664433,0.6083334,ff8a5d3d,0.71666675,ffae7747,0.8250001,ffce9056,1,ffeeaa66"
                },
                color_noise: !0,
                opacity: {
                    value: 75,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 100
                },
                lineWidth: {
                    value: .5,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                spread: {
                    value: 40,
                    clamp: {
                        min: 1,
                        max: 50
                    }
                },
                lookback: 2e3
            },
            sketchy: {
                toolkit: "brush",
                type: "sketchy",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff7d7e7d,0.5,ff0e0e0e,1,ff0e0e0e"
                },
                color_noise: !0,
                opacity: {
                    value: 50,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 100
                },
                lineWidth: {
                    value: 1,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                spread: {
                    value: 40,
                    clamp: {
                        min: 1,
                        max: 50
                    }
                },
                lookback: 2e3
            },
            web: {
                toolkit: "brush",
                type: "web",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "FF0000",
                    gradient: "0,fffa6c0c,0.04,fff6300a,0.08,fff6300a,0.145,ffd11b7e,0.21,ffd11b7e,0.28,ff7425b1,0.35,ff7425b1,0.42,ff0a62da,0.49,ff0a62da,0.56,ff00c000,0.63,ff00c000,0.715,fff6ef2a,0.8,fff6ef2a,0.9,fffa6c0c,1,fffa6c0c"
                },
                color_noise: !0,
                opacity: {
                    value: 25,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 100
                },
                lineWidth: {
                    value: 1,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                spread: {
                    value: 50,
                    clamp: {
                        min: 1,
                        max: 50
                    }
                },
                lookback: 2e3
            },
            fur: {
                toolkit: "brush",
                type: "fur",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff7d7e7d,0.5,ff0e0e0e,1,ff0e0e0e"
                },
                color_noise: !0,
                opacity: {
                    value: 15,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: 10
                },
                lineWidth: {
                    value: .5,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                spread: {
                    value: 250,
                    clamp: {
                        min: 1,
                        max: 500
                    }
                },
                lookback: 2e3
            },
            spirograph: {
                toolkit: "brush",
                type: "spirograph",
                composite: "paint",
                fill: {
                    type: "gradient",
                    color: "fff000",
                    gradient: "0,ff4c36b3,0.15,ffa1207d,0.24734265,fff60a48,0.3446853,fffa7e3b,0.43132864374999996,fffff32e,0.5326573,ff87f874,0.6721152827415,ff0ffebb,0.8,ff26a0be,1,ff3d43c1"
                },
                color_noise: !0,
                opacity: {
                    value: 12,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                flow: {
                    min: 1,
                    max: Infinity
                },
                lineWidth: {
                    value: 1,
                    clamp: {
                        min: .1,
                        max: 5
                    }
                },
                diameter: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 150
                    }
                },
                contract: .005,
                outerRadius: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                innerRadius: {
                    value: 58.08,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                speed: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                }
            },
            stamp: {
                toolkit: "brush",
                type: "stamp",
                composite: "paint",
                fill: {
                    type: "color",
                    color: "1b0045"
                },
                color_mode: "linear",
                opacity: {
                    value: 100,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                diameter: {
                    value: 100,
                    clamp: {
                        min: 5,
                        max: 350
                    }
                },
                rotate: {
                    min: 1,
                    max: 360,
                    clamp: {
                        min: 1,
                        max: 360
                    }
                },
                scale: {
                    min: .05,
                    max: 1.5,
                    clamp: {
                        min: .05,
                        max: 3
                    }
                },
                translate: {
                    min: 0,
                    max: 0,
                    clamp: {
                        min: 0,
                        max: 250
                    }
                },
                flow: {
                    min: 15,
                    max: 4294967295,
                    clamp: {
                        min: 1,
                        max: 100
                    }
                },
                pollock: !1,
                src: "./media/brush/Butterflies/0-live.png"
            }
        }
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.move = function() {
        var t = this;
        return this.enable = function() {
            Event.add(window, "drag", this.mouse), e.canvas2d.container.style.cursor = "move", e.tool !== e.toolkits.select && e.toolkits.select.enable({
                mouse: !1
            })
        }, this.disable = function() {
            Event.remove(window, "drag", this.mouse), e.canvas2d.container.style.cursor = "default", e.tool !== e.toolkits.select && e.toolkits.select.disable({
                mouse: !1
            })
        }, this.mouse = function(n, r) {
            var s = e.canvas2d.scale,
                o = (r.start.x - r.x) / s,
                s = (r.start.y - r.y) / s;
            switch (r.state) {
                case "down":
                    e.actions.selectAll(), e.actions.move(0, 0, "cache");
                    break;
                case "move":
                    e.actions.move((t.movex || 0) - o, (t.movey || 0) - s);
                    break;
                case "up":
                    if (r.start.x === r.x && r.start.y === r.y) break;
                    e.actions.move(0, 0, "record")
            }
            t.movex = o, t.movey = s, e.renderActions("root.move"), Event.cancel(n)
        }, this
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    e.render = {}, e.render.actions = function() {};
    var t = 0,
        n = function(r) {
            var s, o, u, a, f;
            a = e.actions.data, f = e.ctx, t === 0 && (f.beginPath(), f.rect(0, 0, f.canvas.width, f.canvas.height), f.clip());
            if (t > a.length - 1) t = 0, e.rendering = !1, f.restore();
            else {
                f = a[t], a = f.bbox;
                var l = f.toolkit;
                if (l) {
                    var h = function() {
                        return t++, t % 2500 === 0 ? setTimeout(function() {
                            n(r)
                        }, 0) : n(r)
                    };
                    if (f.dirtyTransform || f.dirty || !f.placement) {
                        delete f.dirtyTransform;
                        var p = a.x,
                            d = a.y,
                            v = p + a.boxWidth;
                        f.trx = new Vector.Transform, a = f.bbox, u = a.scale.x, o = a.scale.y, s = a.rotate * DEG_RAD, f.trx.translate(p, d), s && f.trx.rotate(s), f.trx.translate(-p * u, - d * o), f.trx.scale(u, o), f.placement = e.placement({
                            trx: f.placement,
                            bbox: a,
                            pt0: {
                                x: p,
                                y: d
                            },
                            pt1: {
                                x: v,
                                y: d
                            },
                            rotate: a.rotate * DEG_RAD,
                            scale: a.scale,
                            doRotate: !0,
                            doScale: !0,
                            doLockRatio: !0
                        })
                    }
                    if (f.dirty || f.dirtyTransform) a = f.bbox, s = a.scale, s.x = (1e4 * s.x + .5 >> 0) / 1e4, s.y = (1e4 * s.y + .5 >> 0) / 1e4, a.rotate = (1e4 * a.rotate + .5 >> 0) / 1e4;
                    if (e.actions.id === t) {
                        if (f.type === "text" && !e.area.hidden) return e.area.drawControls(e.toolkits["area-media"].active, f), h();
                        l.renderAction ? l.renderAction(f, !1, r, h) : e.renderAction(l.ctx, f, h), e.area.drawControls(e.toolkits["area-media"].active, f)
                    } else l.renderAction ? l.renderAction(f, !0, r, h) : e.renderAction(l.ctx, f, h)
                } else t = 0, e.rendering = !1, setTimeout(e.loadActions, 1)
            }
        };
    e.renderActions = function(t) {
        if (!e.rendering) {
            (new Date).getTime();
            if (e.editable === !1) {
                if (typeof e.actions.id == "undefined") return;
                var r = e.actions.data[e.actions.id],
                    i = r.toolkit.renderAction;
                return i(r, !1, t)
            }
            return e.active.canvas.width = e.active.canvas.width, e.ctx.canvas.width = e.ctx.canvas.width, e.rendering = !0, n(t)
        }
    };
    var r = {
        chrome: !0,
        shader: !0,
        sketchy: !0,
        web: !0,
        fur: !0,
        spirograph: !0,
        hair: !0
    };
    return e.renderAction = function(n, s, o) {
        (!s.ctx || s.dirty || s.dirtyCache) && e.renderCache(n, s);
        if (!s.ctx || s.ctx.canvas.width === 0 || s.ctx.canvas.height === 0) return o();
        n.save();
        var u = s.bbox.viewBox[2] / s.bbox.boxWidth / s.bbox.scale.x,
            a = s.placement.clone();
        a.scale(u), s.bbox.scaleCache && a.scale(s.bbox.scaleCache), a.apply(n), n.globalAlpha = r[s.type] ? 1 : typeof s.opacity == "undefined" ? 1 : s.opacity / 100, n.globalCompositeOperation = e.defineComposite(s.composite), n.drawImage(s.ctx.canvas, 0, 0), n.restore();
        if (e.actions.selection[t] && e.tool.type !== "move") {
            var f = s.bbox;
            if (s.type === "text") var s = f.boxWidth,
                l = f.boxHeight,
                u = 1;
            else u = f.viewBox[2] / f.boxWidth, s = f.viewBox[2], l = u * f.boxHeight;
            var h = f.scale.x * 1 / u,
                u = f.scale.y * 1 / u,
                p = e.container;
            n.save(), a.reset(), a.translate(f.x - p.scrollLeft, f.y - p.scrollTop), a.rotate(f.rotate * DEG_RAD), a.scale(h, u), a.apply(n), n.beginPath(), n.rect(-0.5, - 0.5, s, l), n.restore(), n.save(), n.shadowOffsetX = 1, n.shadowOffsetY = 1, n.shadowBlur = 0, e.backdrop === "dark" ? (n.shadowColor = "#000", n.strokeStyle = "#fff") : (n.shadowColor = "#fff", n.strokeStyle = "#000"), n.lineWidth = 1, n.stroke(), n.restore()
        }
        o && o()
    }, e.renderCacheCtx = {}, e.renderCacheClean = function(t) {
        t.ctx && (t.ctx.canvas.copies--, t.ctx.canvas.copies === 0 && (delete e.renderCacheCtx[t.hash], e.debug && document.body.removeChild(t.ctx.canvas)))
    }, e.renderCache = function(t, n) {
        var r = e.actions.createHash(n);
        if (!n || !n.render) return console.log("missing action");
        if (e.renderCacheCtx[r] && !n.dirtyCache) {
            if (delete n.dirty, n.ctx = e.renderCacheCtx[r], typeof n.hash == "undefined") n.hash = r, n.ctx.canvas.copies++
        } else {
            n.ctx && (n.ctx.canvas.copies--, n.ctx.canvas.copies === 0 && (delete e.renderCacheCtx[n.hash], e.debug && document.body.removeChild(n.ctx.canvas)));
            var i = document.createElement("canvas");
            n.ctx = i.getContext("2d"), n.ctx.canvas.copies = 1, n.hash = r, e.renderCacheCtx[r] = n.ctx, n.ctx.canvas.width = n.bbox.boxWidth * n.bbox.scale.x, n.ctx.canvas.height = n.bbox.boxHeight * n.bbox.scale.y, e.debug && document.body.appendChild(n.ctx.canvas), r = n.placement.clone(), r.matrix.x = 0, r.matrix.y = 0, r.rotate(-n.bbox.rotate * DEG_RAD), n.render(n.ctx, r), delete n.dirty, delete n.dirtyCache
        }
    }, e.loadActions = function(t) {
        function n(n, r) {
            r ? (s.push(r), n.error = !0) : n === !1 ? (s.push("Action missing."), n.error = !0) : n.toolkit && n.toolkit.updateActionSize && n.toolkit.updateActionSize(n), --o || (e.rendering = !1, e.renderActions("root.loadActions"), e.loader.stop(), s.length && e.growl.message(s[0]), t && t())
        }
        if (!e.rendering) {
            var r = e.actions.data,
                i = r.length;
            if (i === 0) e.loader.stop(), t && t();
            else {
                var s = [],
                    o = i;
                e.rendering = !0, e.loader.message("Rendering..."), e.actions.sort();
                for (var u = 0; u < i; u++) {
                    var a = r[u];
                    a.data && !a.dataHash && (a.dataHash = e.actions.createHash(a.data)), a.type === "text" ? a.bbox.scale = {
                        x: 1,
                        y: 1
                    } : a.type === "brush" ? (a.type = "paintbrush", a.blur = 20, delete a.scale) : a.type === "spraypaint" && (a.src || (a.src = "./media/brush/_/1-live.png"), a.type = "stamp", a.scale = {
                        min: .25,
                        max: 2,
                        clamp: {
                            min: .05,
                            max: 3
                        }
                    }), a.render && !a.dirtyRender ? n(a) : (e.actions.updateToolkit(a), a.toolkit ? a.toolkit.loadResource(a, n) : (s.push("Missing toolkit."), n(a)))
                }
            }
        }
    }, e.renderComposite = function(t, n, r, i) {
        var s = e.actions.getBBox(),
            o = e.canvas2d.layers,
            u = e.cache,
            a = u.canvas,
            f = o.layer0.width,
            l = o.layer0.height,
            t = t || s.x,
            n = n || s.y,
            r = r || s.width,
            i = i || s.height;
        a.width = r, a.height = i;
        for (var h in o) h !== "cache" && h !== "active" && u.drawImage(o[h], 0, 0, f, l, - t, - n, f, l);
        return u.canvas
    }, e.toDataURL = function(t, n, r, i, s, o) {
        return e.renderComposite(t, n, r, i).toDataURL(s || "image/png", o || 1)
    }, e.render.fileToCanvas = function(t, n) {
        var r = new Image;
        r.onload = function() {
            var i = e.cache,
                s = i.canvas;
            s.width = r.width, s.height = r.height, i.drawImage(r, 0, 0), n(s, t)
        }, r.src = t.src
    }, e.render.fileToImage = function(e, t) {
        typeof e == "string" && (e = {
            src: e
        });
        var n = new Image;
        n.onload = function() {
            t(n, e)
        }, n.src = e.src
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.render.stack = function() {
        for (var t, n = "", r = [], i = [], s = [], o = e.actions.data, u = 0, a = o.length; u < a; u++) t = o[u], t.dirty || t.dirtyTransform ? (i.length && s.push({
            sid: r.push(n),
            data: i
        }), s.push({
            sid: r.push("" + t.id),
            data: [t]
        }), n = "", i = []) : (n += t.id, i.push(t));
        i.length && s.push({
            sid: r.push(n),
            data: i
        }), t = r.toString();
        if (ctx_stack.length !== s.length) {
            a = Math.max(ctx_stack.length, s.length);
            for (u = 0; u < a; u++) ctx_stack[u] ? u > s.length && (n = ctx_stack[u], r = n.canvas, r.parentNode.removeChild(r)) : (r = document.createElement("canvas"), n = r.getContext("2d"), e.canvas2d.container.appendChild(r), ctx_stack[u] = n)
        }
        u = 0;
        for (a = s.length; u < a; u++) {
            n = ctx_stack[u], r = n.canvas, n = s[u].sid, i = s[u].data;
            if (i.length === 1) r.width = e.canvas2d.width, r.height = e.canvas2d.height;
            else if (t !== ctx_sid || n !== r.data) {
                r.width = e.canvas2d.width, r.height = e.canvas2d.height, o = 0;
                for (i = i.length; o < i; o++);
            }
            r.data = n
        }
        ctx_sid = t
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.select = function(t) {
        function n(t, n) {
            typeof t != "undefined" && (n && e.actions.selection[t] ? delete e.actions.selection[t] : e.actions.selection[t] = !0)
        }
        var r = this;
        this.id = "select", this.rect = {}, this.doMove = !1, this.points = {}, this.copied = {}, this.cancelSelection = !1, this.construct = function() {
            this.ctx = t.layer0.ctx, this.active = t.active.ctx, this.cache = t.cache.ctx
        }, this.enable = function(e) {
            e || (e = {}), r.cancelSelection = e.cancelSelection || !1, r.search = e.search || "", typeof e.mouse == "undefined" && (e.mouse = !0), typeof e.key == "undefined" && (e.key = !0), typeof e.cursor == "undefined" && (e.cursor = !0), e.mouse && (e.cursor && Event.add(this.active.canvas, "mousemove", this.cursorEvent), Event.add(this.active.canvas, "drag", this.mouseEvent)), e.key && (Event.add(window, "keydown", this.keydown), Event.add(window, "keyup", this.keyup))
        }, this.disable = function(e) {
            e || (e = {}), typeof e.mouse == "undefined" && (e.mouse = !0), typeof e.key == "undefined" && (e.key = !0), typeof e.cursor == "undefined" && (e.cursor = !0), e.mouse && (e.cursor && Event.remove(this.active.canvas, "mousemove", this.cursorEvent), Event.remove(this.active.canvas, "drag", this.mouseEvent)), e.key && (Event.remove(window, "keydown", this.keydown), Event.remove(window, "keyup", this.keyup))
        }, this.findSingleAction = function(t, n) {
            for (var i = new Vector.Transform, s = e.canvas2d, o = e.container.scrollLeft, u = e.container.scrollTop, a = s.container, f = s.scale, l = e.active.canvas, h = Math.min(0, (parseInt(l.style.width) - l.width) / 2), p = Math.min(0, (parseInt(l.style.height) - l.height) / 2), h = (t.x - s.left + a.scrollLeft - a.offsetLeft - h) / f, s = (t.y - s.top + a.scrollTop - a.offsetTop - p) / f, a = n.length, p = f = void 0, v = r.search; a--;) {
                var m = n[a],
                    l = m.type === "button";
                if (!v || l || m.type === v) {
                    var g = m.bbox;
                    if (g.boxWidth < 10) var y = 10,
                        b = g.x + (g.boxWidth - 5);
                    else y = g.boxWidth, b = g.x;
                    if (g.boxHeight < 10) var w = 10,
                        E = g.y + (g.boxHeight - 5);
                    else w = g.boxHeight, E = g.y;
                    var S = 1 / g.scale.x,
                        x = 1 / g.scale.y,
                        T = g.rotate * DEG_RAD;
                    i.reset(), i.translate(b, E), T && i.rotate(-T), i.translate(-b * S, - E * x), i.scale(S, x), S = l ? i.point2d(h + o, s + u) : i.point2d(h + o * 2, s + u * 2), S.x -= g.left || 0, S.y -= g.top || 0;
                    if (S.x > b && S.y > E && S.x < b + y && S.y < E + w) {
                        if (l) return a;
                        if (m.ctx && (l = m.ctx.canvas, m.ctx.getImageData((S.x - g.x) / g.boxWidth * l.width >> 0, (S.y - g.y) / g.boxHeight * l.height >> 0, 1, 1).data[3] > 8)) return a;
                        m = y * g.scale.x * w * g.scale.y;
                        if (f === void 0 || f >= m) p = a, f = m
                    }
                    i.reset()
                }
            }
            return p
        }, this.findMultipleActions = function(t, s) {
            Event.cancel(t), s.state === "down" && (r.rect.x1 = s.x, r.rect.y1 = s.y), e.actions.id = void 0;
            var o = -e.container.scrollLeft,
                u = -e.container.scrollTop,
                a = e.canvas2d,
                l = a.container,
                h = a.layers.active,
                p = a.scale,
                v = h.ctx,
                h = e.active.canvas,
                m = Math.min(0, (parseInt(h.style.width) - h.width) / 2),
                g = Math.min(0, (parseInt(h.style.height) - h.height) / 2),
                m = (a.left - l.scrollLeft + l.offsetLeft + m) / p,
                l = (a.top - l.scrollTop + l.offsetTop + g) / p,
                a = {
                    x: Math.min(r.rect.x1, s.x) - m,
                    y: Math.min(r.rect.y1, s.y) - l
                }, m = {
                    x: Math.max(r.rect.x1, s.x) - m,
                    y: Math.max(r.rect.y1, s.y) - l
                }, l = {
                    x: m.x,
                    y: a.y
                }, p = {
                    x: a.x,
                    y: m.y
                }, g = m.x - a.x,
                y = m.y - a.y;
            h.width = h.width, s.state === "up" ? v.fillStyle = "rgba(255,0,0,1)" : (v.fillStyle = "rgba(255,0,100,0.20)", v.fillRect(a.x, a.y, g, y), v.lineWidth = 2, v.strokeStyle = "rgba(255,0,100,1)", v.strokeRect(a.x, a.y, g, y), v.fillStyle = "rgba(0,0,255,1)"), h = e.actions.data, g = {};
            for (y = h.length; y--;) {
                var b = h[y],
                    w = b.bbox,
                    E = w.x,
                    S = w.y,
                    x = w.boxWidth,
                    T = w.boxHeight,
                    w = w.scale.x,
                    N = b.trx;
                if (!b.trx) return console.log("action.trx not available");
                var b = N.point2d(E + o, S + u),
                    C = N.point2d(E + o + x, S + u),
                    k = N.point2d(E + o + x, S + u + T),
                    L = N.point2d(E + o, S + u + T);
                if (b.x > a.x && b.x < m.x && b.y > a.y && b.y < m.y || C.x > a.x && C.x < m.x && C.y > a.y && C.y < m.y || k.x > a.x && k.x < m.x && k.y > a.y && k.y < m.y || L.x > a.x && L.x < m.x && L.y > a.y && L.y < m.y || i(b, C, a, m) || i(k, L, a, m) || i(C, k, a, m) || i(b, L, a, m) || i(b, C, l, p) || i(k, L, l, p) || i(C, k, l, p) || i(b, L, l, p)) {
                    if (Event.proxy.metaKey && r.hasPoints) {
                        if (!e.actions.selection[y]) continue;
                        b = "rgba(0,0,0,0.20)", C = "rgba(255,255,255,0.20)", g[y] = !1
                    } else b = "rgba(255,255,255,0.20)", C = "rgba(0,0,0,0.20)", g[y] = !0;
                    v.save(), v.translate(o, u), N.apply(v, !0), v.fillStyle = b, v.fillRect(E, S, x, T), v.lineWidth = 1 / w, v.strokeStyle = C, v.strokeRect(E, S, x, T), v.restore()
                }
            }
            if (s.state === "up") {
                for (var A in g) g[A] ? e.actions.selection[A] = !0 : delete e.actions.selection[A];
                r.rect.x1 === s.x && r.rect.y1 === s.y && (o = Event.proxy.metaKey, u = t.shiftKey, v = Event.proxy.getCoord(t), v = r.findSingleAction(v, h), n(v, o, u)), e.actions.checkForSingleSelection(), e.renderActions("select.mouseEvent.cancelSelection")
            }
        }, this.setActionColor = function(t) {
            if (t = e.actions.data[t]) {
                var n = t.toolkit;
                n.updateBBox && (n.updateBBox(), setTimeout(function() {
                    e.area.textarea.blur(), e.area.textarea.focus()
                }, 10)), e.ColorPicker.updateFromAction(t)
            }
        }, this.cursorEvent = function(t) {
            if (e.ColorPicker.state !== "eyeDropper" && !r.doMove) {
                var n = r.active;
                if (r.cancelSelection) var i = clone(e.actions.controls),
                    s = 0;
                else i = e.actions.data.concat(e.actions.controls), s = e.actions.data.length;
                for (var t = Event.proxy.getCoord(t), o = n.canvas; o !== null;) t.x -= o.offsetLeft, t.y -= o.offsetTop, o = o.offsetParent;
                i = r.findSingleAction(t, i), typeof i == "undefined" ? (t = s = "", e.area.renderControls(), e.area.hover = "") : i - s < 0 ? (s = "move", t = "pointer", e.area.renderControls(i), e.area.hover = "") : (i -= s, o = e.actions.controls[i], s = o.id, t = o.cursor || "default", e.area.hover = o.id, e.area.renderControls()), e.translation[s] ? (s = e.translation[s], n.canvas.title = s + " layer #" + i) : n.canvas.title = "", n.canvas.style.cursor = t || ""
            }
        }, this.hasNewPoints = this.hasPoints = !1, this.mouseEvent = function(t, i) {
            if (e.ColorPicker.state !== "eyeDropper") {
                if (i.state !== "move") {
                    i.state === "down" && (r.hasNewPoints = !1);
                    if (r.cancelSelection) var s = clone(e.actions.controls),
                        o = 0;
                    else s = e.actions.data.concat(e.actions.controls), o = e.actions.data.length;
                    for (var u = Event.proxy.getCoord(t), a = r.active.canvas; a !== null;) u.x -= a.offsetLeft, u.y -= a.offsetTop, a = a.offsetParent;
                    a = r.findSingleAction(u, s)
                }
                var s = Event.proxy.metaKey,
                    f = t.shiftKey,
                    l = typeof a != "undefined",
                    h = i.start.x !== i.x || i.start.y !== i.y,
                    p;
                for (p in e.actions.selection) break;
                r.hasPoints = typeof p != "undefined";
                if (e.actions.controls[a - o]) {
                    if (a - o !== 0) {
                        e.actions.controls[a - o].event(t), i.pause(), r.doMove = !1, Event.cancel(t);
                        return
                    }
                    if (e.active.canvas.className = "drag", i.state === "up") {
                        r.doMove = !1;
                        if (h) return r.move(i);
                        a = r.findSingleAction(u, e.actions.data), u = e.actions.data[a];
                        if (a === e.actions.id && !r.hasNewPoints) {
                            e.area.hidden && u.type === "text" ? e.area.show(u) : (e.actions.deselectAll(), e.actions.checkForSingleSelection(), e.renderActions("root.area.moveEvent"));
                            return
                        }
                        if (!f && !s && u) {
                            e.actions.select(a), e.actions.checkForSingleSelection(), e.ui.buildConfigure(u.type), e.renderActions(), r.setActionColor(a);
                            return
                        }
                    } else r.doMove = !0
                }
                if (i.state === "up" && r.doMove && !h && !r.hasNewPoints && !f && !s) r.doMove = !1, e.editing || (s = e.actions.data.concat(e.actions.controls), e.actions.select(a), e.actions.checkForSingleSelection(), e.renderActions("select.mouseEvent.cancelSelection"), Event.cancel(t));
                else if (i.state === "down" && !l && r.hasPoints && !f && !s && (e.actions.deselectAll(), e.renderActions("select.mouseEvent.cancelSelection")), i.state === "down" && e.actions.selection[a] && !s || r.doMove) r.doMove = i.state !== "up", e.editing || (r.move(i), Event.cancel(t));
                else {
                    if (!l || f || s) {
                        if (e.toolkit.id === "select" && i.state === "down") return i.proxy(r.findMultipleActions);
                        if (e.useCreateAction && e.toolkit.createAction) return i.proxy(function(t, n) {
                            r.doMove = n.state !== "up", e.toolkit.createAction(n), Event.cancel(t)
                        })
                    }
                    a - o < 0 && (f || s ? (n(a, s, f), e.actions.checkForSingleSelection(), e.active.canvas.width = e.active.canvas.width, e.renderActions("select.moveActions")) : (u = e.actions.data[a], r.doMove = i.state !== "up", r.hasNewPoints = !0, e.actions.select(a), e.ui.buildConfigure(u.type), r.setActionColor(a), r.move(i)), Event.cancel(t))
                }
            }
        }, this.move = function(t) {
            var n = t.start.x - t.x,
                i = t.start.y - t.y;
            switch (t.state) {
                case "down":
                    e.actions.move(0, 0, "cache");
                    break;
                case "move":
                    e.actions.move((r.movex || 0) - n, (r.movey || 0) - i);
                    break;
                case "up":
                    if (t.start.x === t.x && t.start.y === t.y) break;
                    e.actions.move(0, 0, "record")
            }
            r.movex = n, r.movey = i, e.active.canvas.width = e.active.canvas.width, e.renderActions("select.moveActions")
        }, this.keyboardShortcuts = {
            "break-file": "File",
            "Save (to Sketchpad.io)": "cmd.s",
            "Save (snapshot)": "cmd.shift.s",
            "Save (json)": "cmd.alt.s",
            "break-history": "History",
            "Undo history": "cmd.z",
            "Redo history": "cmd.shift.z",
            "break-select": '<img src="./media/ux/tools/pointer.png" width="19"/> Select tool',
            "Select all": "cmd.a",
            "Select inverse": "cmd.shift.a",
            "Escape selection": "escape",
            "Delete selection": "delete",
            "Copy selection": "cmd.c",
            "Cut selection": "cmd.x",
            "Paste selection": "cmd.v",
            "Send selection Backwards": "cmd.[",
            "Send selection Forwards": "cmd.]",
            "Send selection to Back": "cmd.alt.[",
            "Send selection to Front": "cmd.alt.]",
            "Move selection Left 1px": "left",
            "Move selection Right 1px": "right",
            "Move selection Up 1px": "up",
            "Move selection Down 1px": "down",
            "Move selection Left 10px": "left.shift",
            "Move selection Right 10px": "right.shift",
            "Move selection Up 10px": "up.shift",
            "Move selection Down 10px": "down.shift",
            "break-text": '<img src="./media/ux/tools/Text_2.png" width="19"/> Text tool',
            "Resize instead of Rescale": "shift",
            "break-tools": "Tool switching",
            '<img src="./media/ux/tools/pointer.png" width="19"/> Select tool': "1",
            '<img src="./media/ux/tools/Calligraphy_2.png" width="19"/> Calligraphy tool': "2",
            '<img src="./media/ux/tools/Brush_2.png" width="19"/> Paintbrush tool': "3",
            '<img src="./media/ux/tools/Pencil_2.png" width="19"/> Pencil tool': "4",
            '<img src="./media/ux/tools/Brush_2.png" width="19"/> Streamer tool': "5",
            '<img src="./media/ux/tools/Eraser_2.png" width="19"/> Eraser tool': "6",
            '<img src="./media/ux/tools/Text_2.png" width="19"/> Text tool': "7",
            '<img src="./media/ux/tools/Stamp_2.png" width="19"/> Stamp tool': "8",
            '<img src="./media/ux/tools/clipart.png" width="19"/> Clipart tool': "9",
            "break-windows": "Window toggle",
            "Color Picker": "alt.c",
            "Help (you are here)": "alt.h",
            "break-zoom": "Zoom",
            "Zoom-in": "cmd.+",
            "Zoom-out": "cmd.-",
            "Zoom to actual size": "cmd.0"
        }, this.keyTranslate = {}, this.keyDownUpdate = function(t) {
            e.active.canvas.width = e.active.canvas.width, e.renderActions("select.keydown"), r.keyTranslate[t.keyCode] = !0, Event.cancel(t)
        }, this.keydown = function(t) {
            var n = Event.proxy.metaKey;
            Event.proxy.isMetaKey(t) && sketch.tool.type !== "select" && (sketch.ptool = sketch.tool.type);
            switch (t.keyCode) {
                case 48:
                    if (n) return e.scale2d(1), e.area.updateTextareaCSS(), r.keyDownUpdate(t);
                    return;
                case 189:
                    if (n) return n = Math.max(1, e.canvas2d.scale / 1.25), e.scale2d(n), e.area.updateTextareaCSS(), r.keyDownUpdate(t);
                    return;
                case 187:
                    if (n) return n = Math.min(5, e.canvas2d.scale * 1.25), e.scale2d(n), e.area.updateTextareaCSS(), r.keyDownUpdate(t);
                    return;
                case 219:
                    if (n) return e.actions.sendBackwards(t.altKey), e.renderActions("ctrl-x"), r.keyDownUpdate(t);
                    return;
                case 221:
                    if (n) return e.actions.sendForwards(t.altKey), e.renderActions("ctrl-x"), r.keyDownUpdate(t);
                    return;
                case 83:
                    if (n) {
                        if (!t.altKey) return t.shiftKey ? e.setTool("snapshot") : (e.TimeMachine.saveToServer(), r.keyDownUpdate(t));
                        e.TimeMachine.exportJSON()
                    }
                    return;
                case 27:
                    return e.actions.deselectAll(), r.keyDownUpdate(t)
            }
            if (!e.editing) {
                switch (t.keyCode) {
                    case 72:
                        if (t.altKey) return e.setTool("help");
                        return;
                    case 49:
                        return e.setTool("select");
                    case 50:
                        return e.setTool("calligraphy");
                    case 51:
                        return e.setTool("paintbrush");
                    case 52:
                        return e.setTool("pencil");
                    case 53:
                        return e.setTool("streamer");
                    case 54:
                        return e.setTool("eraser");
                    case 55:
                        return e.setTool("text");
                    case 56:
                        return e.setTool("stamp");
                    case 57:
                        return e.setTool("svg");
                    case 67:
                        if (t.altKey) return e.setTool("color");
                        if (n) {
                            e.actions.copy();
                            break
                        }
                        return;
                    case 88:
                        if (!n) return;
                        e.actions.cut();
                        break;
                    case 86:
                        if (!n) return;
                        Event.cancel(t), e.actions.paste();
                        return;
                    case 8:
                        e.actions.remove(e.actions.selection, !0), e.actions.deselectAll();
                        break;
                    case 90:
                        if (!n) return;
                        t.shiftKey ? (e.actions.deselectAll(), e.TimeMachine.redoAction()) : (e.actions.deselectAll(), e.TimeMachine.undoAction());
                        break;
                    case 65:
                        if (!n) return;
                        if (e.tool.type !== "select") return;
                        e.actions.selectAll(t.shiftKey);
                        break;
                    case 37:
                        var n = r.keyTranslate[37] ? "" : "cache",
                            i = t.shiftKey ? 10 : 1;
                        e.actions.move(-i, 0, n);
                        break;
                    case 38:
                        n = r.keyTranslate[38] ? "" : "cache", i = t.shiftKey ? 10 : 1, e.actions.move(0, - i, n);
                        break;
                    case 39:
                        n = r.keyTranslate[39] ? "" : "cache", i = t.shiftKey ? 10 : 1, e.actions.move(i, 0, n);
                        break;
                    case 40:
                        n = r.keyTranslate[40] ? "" : "cache", i = t.shiftKey ? 10 : 1, e.actions.move(0, i, n);
                        break;
                    default:
                        return
                }
                r.keyDownUpdate(t)
            }
        }, this.keyup = function(t) {
            Event.proxy.isMetaKey(t) && sketch.ptool && delete sketch.ptool, r.keyTranslate[t.keyCode] = !1;
            switch (t.keyCode) {
                case 37:
                case 38:
                case 39:
                case 40:
                    e.actions.move(0, 0, "record")
            }
        };
        var i = function(e, t, n, r) {
            return (r.y - e.y) * (n.x - e.x) > (n.y - e.y) * (r.x - e.x) != (r.y - t.y) * (n.x - t.x) > (n.y - t.y) * (r.x - t.x) && (n.y - e.y) * (t.x - e.x) > (t.y - e.y) * (n.x - e.x) != (r.y - e.y) * (t.x - e.x) > (t.y - e.y) * (r.x - e.x)
        };
        return this.construct(), this
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.shape = function(t) {
        var n = this;
        this.active = t.active.ctx, this.cache = t.cache.ctx, this.ctx = t.layer0.ctx, this.device = {}, this.gestures = this.gid = 0, this.rendering = !1, this.time = 0, this.batches = {}, this.events = {}, this.enable = function() {
            this.disable(), this.device.useGesture = "ontouchstart" in window && this.device.movement !== "drag", this.events[this.gid] = n.device.useGesture ? Event.add(this.active.canvas, "gesture", new this.record) : Event.add(this.active.canvas, "drag", new this.record)
        }, this.disable = function() {
            for (var e in this.events) this.events[e].remove(), delete this.events[e]
        }, this.cloneAttributes = function(e, t) {
            for (var n in e) typeof e[n] == "undefined" && (e[n] = clone(t[n]));
            return t
        }, this.loadResource = function(t, r) {
            typeof t == "string" && (t = {
                type: t
            });
            var i = e.configure.tools[t.type];
            i ? (i = n.cloneAttributes(t, clone(i)), n.device.opacity = i.opacity.value || 100, n.device.fill = i.fill || "cycle", n.device.color_mode = i.color_mode || "cycle", n.device.composite = i.composite || "paint", n.device.movement = i.movement || "placement", n.device.type = i.type || "star", i.sides && (n.device.sides = i.sides.value || 5), i.slope && (n.device.slope = i.slope.value || .5), i.coils && (n.device.coils = i.coils.value || 1), i.spread && (n.device.spread = i.spread.value || 2), i.points && (n.device.points = i.points.value || 250), i.m && (n.device.m = i.m.value || 39), i.n1 && (n.device.n1 = i.n1.value || 25), i.n2 && (n.device.n2 = i.n2.value || 215), i.n3 && (n.device.n3 = i.n3.value || 10), e.configure.setStyle(n.device)) : r && r(t)
        }, this.record = function() {
            var e = n.gid;
            return function(t, s) {
                var o = n.batches[s.id];
                o || (o = n.batches[s.id] = [], o.time = n.time);
                if (n.device.useGesture) if (s.state === "start") n.gestures++, n.events[++n.gid] = Event.add(n.active.canvas, "gesture", new n.record);
                else {
                    s.state === "end" && (n.gestures--, n.events[e].remove(), n.time = o.time, delete n.events[e]);
                    var u = {};
                    u.pt1 = s.touches[0], u.pt2 = s.touches[1], u.rotation = s.rotation, u.state = s.state, o[0] = u
                } else {
                    u = {};
                    if (n.device.movement === "drag") {
                        u.pt1 = {
                            x: r[s.id],
                            y: i[s.id]
                        }, r[s.id] = s.x, i[s.id] = s.y;
                        if (typeof u.pt1.x == "undefined") return;
                        s.state === "up" && (delete r[s.id], delete i[s.id])
                    } else u.pt1 = {
                        x: s.start.x,
                        y: s.start.y
                    };
                    u.pt2 = {
                        x: s.x,
                        y: s.y
                    }, u.rotation = -Math.atan2(s.x - u.pt1.x, s.y - u.pt1.y) * RAD_DEG + 180, u.state = s.state, o[0] = u
                }
                n.rendering || requestAnimationFrame(n.render)
            }
        };
        var r = {}, i = {};
        this.render = function() {
            (new Date).getTime();
            var t = n.device,
                r = n.ctx;
            t.ctx = n.ctx, t.active = n.active, t.cache = n.cache, n.active.clearRect(0, 0, r.canvas.width, r.canvas.height);
            for (var i in n.batches) for (var s = n.batches[i], o = 0; o < s.length; o++) {
                var u = s.shift(),
                    a = u.state === "end" || u.state === "up";
                t.movement === "placement" && (a ? r = n.ctx : (r = n.active, s[0] = u)), r.save(), r.beginPath();
                if (n.device.useGesture) var f = u.pt1,
                    l = u.pt2,
                    h = (f.x + l.x) / 2,
                    p = (f.y + l.y) / 2,
                    d = l.x - f.x,
                    v = l.y - f.y,
                    m = Math.max(0, Math.sqrt(d * d + v * v) - 75);
                else f = u.pt1, l = u.pt2, h = f.x, p = f.y, d = l.x - f.x, v = l.y - f.y, m = Math.max(0, Math.sqrt(d * d + v * v));
                r.translate(h, p), r.rotate(u.rotation * DEG_RAD), r.translate(-h, - p);
                switch (t.type) {
                    case "ellipse":
                        Vector.Shapes.ellipse(r, h, p, m, m);
                        break;
                    case "rectangle":
                        Vector.Shapes.rect(r, h - m, p - m, h + m, p + m);
                        break;
                    case "polygon":
                        Vector.Shapes.polygon(r, h, p, m, t.sides >> 0);
                        break;
                    case "gear":
                        Vector.Shapes.gear(r, h, p, m, t.sides >> 0, t.slope);
                        break;
                    case "star":
                        Vector.Shapes.star(r, h, p, m, t.sides >> 0, t.slope);
                        break;
                    case "burst":
                        Vector.Shapes.burst(r, h, p, m, t.sides >> 0, t.slope);
                        break;
                    case "radialburst":
                        Vector.Shapes.radialBurst(r, h, p, m, t.sides >> 0, t.slope);
                        break;
                    case "spiral":
                        Vector.Shapes.spirals(r, h, p, m, t.sides >> 0, t.coils, 1 - t.spread / 100, t.colors);
                        break;
                    case "supershape":
                        Vector.Shapes.superformula(r, h, p, m, t.points, t.m >> 0, t.n1, t.n2, t.n3)
                }
                r.restore(), r.save(), r.globalAlpha = t.opacity / 100, r.globalCompositeOperation = e.defineComposite(t.composite, s.time), t.color_mode === "cycle" ? (u = t.colors, r.fillStyle = u[(s.time++ * 2 + 1) % u.length]) : r.fillStyle = n.device.useGesture ? e.createGradient(n.ctx, f.x, f.y, l.x, l.y, t) : e.createGradient(n.ctx, f.x - d, f.y - v, l.x, l.y, t), r.fill(), r.globalAlpha = .225, r.lineWidth = 1, r.strokeStyle = "rgba(0,0,0,1)", r.stroke(), r.restore();
                if (a) {
                    n.time = n.batches[i].time, delete n.batches[i];
                    break
                }
            }
            t.postprocess && t.postprocess(), typeof i == "undefined" ? n.rendering = !1 : (requestAnimationFrame(n.render), n.rendering = !0)
        }
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.snapshot = function() {
        return this.enable = function() {
            Event.add(window, "drag", this.mouse), e.canvas2d.container.style.cursor = "move", e.tool !== e.toolkits.select && e.toolkits.select.enable({
                mouse: !1
            })
        }, this.disable = function() {
            Event.remove(window, "drag", this.mouse), e.canvas2d.container.style.cursor = "default", e.tool !== e.toolkits.select && e.toolkits.select.disable({
                mouse: !1
            })
        }, this.mouse = function(t, n) {
            var r = e.active,
                i = n.x - n.start.x,
                s = n.y - n.start.y,
                o = n.start.x,
                u = n.start.y,
                a = Math.round(i / 2),
                f = Math.round(s / 2),
                l = a % 42 + o,
                h = f % 42 + u;
            r.save(), r.canvas.width = r.canvas.width, r.canvas.style.display = "block", r.shadowOffsetX = 1, r.shadowOffsetY = 1, r.shadowBlur = 1, r.beginPath(), r.fillStyle = "rgba(0,0,0,0.5)", r.fillRect(0, 0, r.canvas.width, r.canvas.height), r.clearRect(o + .5, u + .5, i, s), r.lineWidth = 1, r.strokeStyle = "#333", r.strokeRect(o + .5, u + .5, i, s), r.strokeStyle = "rgba(0, 0, 0, 0.25)", r.shadowColor = "rgba(255, 255, 255, 0.25)";
            for (var p = .5; p < i; p += 42) o + a + .5 !== p + l && (r.moveTo(p + l, u), r.lineTo(p + l, u + s));
            for (p = .5; p < s; p += 42) u + f + .5 !== p + h && (r.moveTo(o, p + h), r.lineTo(o + i, p + h));
            r.stroke(), r.beginPath(), r.strokeStyle = "rgba(0, 0, 0, 0.65)", r.shadowColor = "rgba(255, 255, 255, 0.15)", r.moveTo(o, u + f + .5), r.lineTo(o + i, u + f + .5), r.moveTo(o + a + .5, u), r.lineTo(o + a + .5, u + s), r.stroke(), r.beginPath(), r.strokeStyle = "rgba(255, 255, 255, 0.5)", r.shadowColor = "rgba(255, 255, 255, 0)", r.moveTo(o + a - 7.5, u + f + .5), r.lineTo(o + a + 8.5, u + f + .5), r.moveTo(o + a + .5, u + f - 7.5), r.lineTo(o + a + .5, u + f + 8.5), r.stroke(), r.restore(), n.state === "up" && (r.canvas.width = r.canvas.width, n.x === n.start.x && n.y === n.start.y ? e.growl.message("No area was selected.") : (e.TimeMachine.exportPNG(o, u, i, s), e.setTool("select")))
        }, this
    }, e
}(sketch), typeof sketch == "undefined" && (sketch = {}), sketch = function(e) {
    return e.TimeMachine = new function() {
        function t(e) {
            for (var t in e.actions) {
                var n = e.actions[t].data;
                if (n && n.length) for (var r = 0; r < n.length; r++) n[r].x = Math.round(n[r].x * 1e3) / 1e3, n[r].y = Math.round(n[r].y * 1e3) / 1e3
            }
            return e
        }
        var n = this;
        this.useBitmap = !1, this.useVector = !0, this.history = {}, this.store = function(e) {
            this.useBitmap && this.storeBitmap(), this.useVector && this.storeAction(e)
        }, this.redo = function() {
            this.useBitmap && this.redoBitmap(), this.useVector && this.redoAction()
        }, this.undo = function() {
            this.useBitmap && this.undoBitmap(), this.useVector && this.undoAction()
        }, this.history.bitmap = {
            max: 15,
            current: -1,
            data: []
        }, this.storeBitmap = function() {
            var t = n.history.bitmap,
                r = t.data.length - 1,
                i = r - t.current;
            i && (t.data = t.data.splice(0, r - i + 1)), t.data.length === t.max ? t.data.push(t.data.shift()) : t.data.push(e.canvas()), t.current = t.data.length - 1, r = e.canvas2d.layers.layer0, t = t.data[t.current].ctx, t.clearRect(0, 0, r.width, r.height), t.drawImage(r, 0, 0)
        }, this.undoBitmap = function() {
            var t = n.history.bitmap;
            t.current = Math.max(0, --t.current);
            var r = e.canvas2d.layers.layer0,
                i = r.ctx;
            i.clearRect(0, 0, r.width, r.height), i.drawImage(t.data[t.current], 0, 0)
        }, this.redoBitmap = function() {
            var t = n.history.bitmap;
            t.current = Math.min(t.data.length - 1, ++t.current);
            var r = e.canvas2d.layers.layer0,
                i = r.ctx;
            i.clearRect(0, 0, r.width, r.height), i.drawImage(t.data[t.current], 0, 0)
        }, this.clearBitmap = function() {
            if (confirm(e.translation["clear-confirm"]) === !0) {
                var t = n.history.bitmap;
                t.current = 0, t.data = t.data.splice(0, 1);
                try {
                    var r = e.canvas2d.layers.layer0,
                        i = r.ctx;
                    i.clearRect(0, 0, r.width, r.height), i.drawImage(t.data[t.current], 0, 0)
                } catch (s) {
                    e.loadTexture()
                }
                e.resize(), e.scale2d(1), e.configure.tools.reset(), callback && callback()
            }
        }, this.history.actions = {
            max: Infinity,
            current: -1,
            data: []
        }, this.resetActionHistory = function() {
            this.history.actions.data = [], this.history.actions.current = -1
        }, this.popAction = function() {
            this.history.actions.data.pop(), this.history.actions.data.pop()
        }, this.storeAction = function(e) {
            var t = n.history.actions,
                r = t.data.length - 1,
                s = r - t.current;
            s % 2 !== 0 && s++, s && (t.data = t.data.splice(0, r - s + 1)), t.data.length === t.max && t.data.shift(), t.data.push(JSON.stringify(e)), t.current = t.data.length - 1, i = t.current
        }, this.undoAction = function() {
            var t = n.history.actions;
            t.current = Math.max(0, t.current - 2), t.current % 2 !== 0 && t.current++, t.data[t.current] && t.data[t.current + 1] && (s(JSON.parse(t.data[t.current]), JSON.parse(t.data[t.current + 1]), !0), e.renderActions("TimeMachine.undoAction()"))
        }, this.redoAction = function() {
            var e = n.history.actions;
            e.current = Math.min(e.data.length - 1, e.current + 2), e.current % 2 === 0 && e.current--, e.data[e.current - 1] && e.data[e.current] && s(JSON.parse(e.data[e.current - 1]), JSON.parse(e.data[e.current]), !1)
        };
        var r = {
            add: "add",
            remove: "remove"
        }, i = 0,
            s = function(t, s, o) {
                if (i !== n.history.actions.current) {
                    i = n.history.actions.current;
                    var u = r[t] || r[s];
                    if (o) var a = t,
                        l = s;
                    else a = s, l = t;
                    u === "remove" ? (o && (u = "add"), a = t) : u === "add" && (o && (u = "remove"), a = s), e.actions.deselectAll(), t = 0;
                    for (s = a.length; t < s; t++) {
                        var o = a[t],
                            h = l[t];
                        if (u === "add") {
                            if (!e.actions.getById(o.id)) {
                                h = e.actions.clone(o), e.actions.updateToolkit(h), e.actions.data.splice(o.zIndex, 0, h), e.actions.selection[o.zIndex] = !0;
                                continue
                            }
                        } else {
                            if (u === "remove") {
                                h = e.actions.getById(o.id);
                                if (!h) continue;
                                for (o = 0; o < e.actions.data.length; o++) if (e.actions.data[o].id === h.id) {
                                    e.actions.data.splice(o, 1);
                                    break
                                }
                                continue
                            }
                            if (typeof o.zIndex == "number") {
                                e.actions.data.splice(o.zIndex, 0, e.actions.data.splice(h.zIndex, 1)[0]), e.actions.selection[o.zIndex] = !0;
                                continue
                            }
                        }
                        h = e.actions.getById(o.id), e.actions.selection[h.zIndex] = !0, mergeObject(o, h), o.content ? (delete h.breaks, h.dirty = !0) : o.color || o.fillStyle || o.bbox && o.bbox.scale ? h.dirty = !0 : (h.dirty = !0, h.dirtyRender = !0)
                    }
                    e.actions.reindex(), e.loadActions(e.actions.checkForSingleSelection)
                }
            };
        this.undoVOBPath = function(t) {
            for (var t = t.data, n = t.length, r = n - 1; r >= 0; r--) if (t[r].beginPath) {
                t.splice(r, n - r), e.renderActions("TimeMachine.undoPath()");
                break
            }
        }, this.restoreFromJSON = function(t, n) {
            if (t.substr(0, 1) === "<") e.loader.stop();
            else {
                t = JSON.parse(t), t.srcs && (e.actions.srcs = t.srcs), t.actions && (e.actions.data = t.actions), t.history && e.saveHistory && (e.TimeMachine.history = t.history);
                for (var t = e.actions.data, r = 0; r < t.length; r++) typeof t[r].zIndex == "undefined" && (t[r].zIndex = r);
                e.actions.reindex(), e.loadActions(n)
            }
        }, this.exportPNG = function(t, n, r, i) {
            e.growl.message("Saving Image to your Downloads directory..."), e.fileSaver.download({
                name: "Sketchpad",
                extension: "png",
                getData: function() {
                    return e.actions.deselectAll(), e.renderActions(), e.toDataURL(t, n, r, i, "image/png")
                }
            })
        }, this.exportJSON = function() {
            e.growl.message("Saving JSON to your Downloads directory..."), this.getJSON(function(t) {
                e.fileSaver.download({
                    name: "Sketchpad",
                    extension: "json",
                    getData: function() {
                        return t
                    }
                })
            })
        }, this.getJSON = function(r) {
            e.TimeMachine.encodeAssets(function(i, s) {
                e.saveHistory && (i.history = n.history), i.srcs = s, i.version = e.version, r(JSON.stringify(t(i)))
            })
        }, this.error = function() {
            e.avgrund("<h2>You must be <a href='/login.html' target='_blank' class='roll'><span data-title='logged in'>logged in</span></a> to sync changes on Sketchpad.io. If you want to save to your computer, click on the save button on the toolbar and select &ldquo;save .json&rdquo;.<br><br>When you click on the login link above it will open in a new tab, then once you&rsquo;re logged in you can come back here and try saving again.</h2>")
        }, this.saveToServer = function() {
            e.actions.data.length === 0 ? e.growl.message("There is nothing to save.") : DOMLoader.sendRequest({
                url: "../check-login.html",
                onload: function(e) {
                    e.responseText === "true" ? n.getJSON(o) : n.error()
                }
            })
        };
        var o = function(t) {
            var r = {
                action: "../save.php",
                confirm: "text",
                files: []
            };
            e.actions.deselectAll(), e.renderActions(), e.thumbnailer.generate({
                src: e.renderComposite(),
                maxWidth: 756,
                maxHeight: 498,
                center: !0,
                crop: "Fit",
                callback: function(i) {
                    var s = sketch.supports.jpeg ? "jpeg" : "png",
                        o = r.files;
                    e.sync && o.push({
                        data: e.sync,
                        name: "id"
                    }), o.push({
                        data: i.toDataURL("image/" + s),
                        name: "snapshot"
                    }), o.push({
                        data: t,
                        name: "json"
                    }), r.onProgress = function(t) {
                        e.loader.message("Syncing: " + t.transferPercent + "%")
                    }, r.onUpload = function(t, r) {
                        e.loader.stop(), r === "false" ? n.error() : (e.sync = r, localStorage.setItem("sync", r)), e.growl.message("All changes saved!"), console.log(t.transferTotal, r)
                    }, new e.uploader.upload(r)
                }
            })
        };
        this.encodeAssets = function(t) {
            var n = {
                jpg: !0,
                jpeg: !0,
                gif: !0,
                png: !0
            }, r = function(r) {
                u++;
                if (r.substr(0, 1) === "#")--u || t(s, i);
                else if (r.substr(0, 5) === "blob:" || n[r.split(".").pop()]) {
                    var o = new Image;
                    o.onerror = function() {
                        --u || t(s, i)
                    }, o.onload = function() {
                        var n = e.cache,
                            a = n.canvas;
                        a.width = o.width, a.height = o.height, n.drawImage(o, 0, 0), i[r] = a.toDataURL(), --u || t(s, i)
                    }, o.src = r
                } else DOMLoader.sendRequest({
                    url: r,
                    onerror: function() {
                        --u || t(s, i)
                    },
                    onload: function(e) {
                        i[r] = e.responseText, --u || t(s, i)
                    }
                })
            }, i = {}, s = {
                actions: e.actions.clone(e.actions.data)
            }, o = e.actions.data.length;
            if (o === 0) return t(s, i);
            for (var u = 0, a = 0; a < o; a++) {
                var f = e.actions.data[a].src;
                e.actions.srcs[f] ? i[f] = e.actions.srcs[f] : f && !i[f] && r(e.actions.data[a].src);
                if (!u && a === o - 1) return t(s, i)
            }
        }
    }, e
}(sketch), typeof Vector == "undefined" && (Vector = {}), Vector = function(e) {
    e.BBox = function(e, t, n) {
        this.unset();
        if (e) {
            if (e.length === 4 && typeof e[0] == "number") {
                var r = new Vector.Transform(t),
                    t = r.point2d(e[0], e[1]),
                    n = r.point2d(e[0], e[3]),
                    i = r.point2d(e[2], e[3]),
                    s = r.point2d(e[2], e[1]),
                    e = Math.min(t.x, n.x, i.x, s.x),
                    r = Math.max(t.x, n.x, i.x, s.x),
                    o = Math.min(t.y, n.y, i.y, s.y),
                    t = Math.max(t.y, n.y, i.y, s.y);
                return {
                    x1: e,
                    y1: o,
                    x2: r,
                    y2: t
                }
            }
            return this.path(e, t, n)
        }
    }, e.BBox.prototype = {
        path: function(e, t, n) {
            for (var t = new Vector.Transform(t), r, i = this.x, s = this.y, o, u, a = 0, f = e.length; a < f; a++) switch ((r = e[a]).cmd) {
                case "M":
                    var l = t.point2d(r.x, r.y);
                    i.extendTo(l.x), s.extendTo(l.y), o = l.x, u = l.y;
                    break;
                case "L":
                    l = t.point2d(r.x, r.y), i.extendTo(l.x), s.extendTo(l.y), o = l.x, u = l.y;
                    break;
                case "C":
                    var l = t.point2d(r.x, r.y),
                        c = t.point2d(r.x1, r.y1);
                    r = t.point2d(r.x2, r.y2), this.cubic(o, u, c.x, c.y, r.x, r.y, l.x, l.y), o = l.x, u = l.y;
                    break;
                case "Q":
                    l = t.point2d(r.x, r.y), t.point2d(r.x1, r.y1), c = o + 2 / 3 * (l.x1 - o), r = u + 2 / 3 * (l.y1 - u), this.cubic(o, u, c, r, c + (l.x - o) / 3, r + (l.y - u) / 3, l.x, l.y), o = l.x, u = l.y
            }
            return n && (i.expand(n), s.expand(n)), {
                x1: i.min,
                x2: i.max,
                y1: s.min,
                y2: s.max
            }
        },
        cubic: function(e, t, n, r, i, s, o, u) {
            var a = this.x,
                f = this.y;
            a.extendTo(o), f.extendTo(u);
            var l = a.contains(n) && a.contains(i),
                c = f.contains(r) && f.contains(s);
            if (!l) {
                var l = 3 * e - 9 * n + 9 * i - 3 * o,
                    h = 6 * n - 12 * i + 6 * o,
                    p = 3 * i - 3 * o;
                if (Math.abs(l) <= 0) {
                    if (Math.abs(h) >= 0 && (p = -p / h, p > 0 && p < 1)) {
                        var d = 1 - p;
                        a.extendTo(p * p * p * e + 3 * p * p * d * n + 3 * p * d * d * i + d * d * d * o)
                    }
                } else if (p = h * h - 4 * l * p, p >= 0) {
                    var v = Math.sqrt(p),
                        p = (-h + v) / (2 * l);
                    p > 0 && p < 1 && (d = 1 - p, a.extendTo(p * p * p * e + 3 * p * p * d * n + 3 * p * d * d * i + d * d * d * o)), p = (-h - v) / (2 * l), p > 0 && p < 1 && (d = 1 - p, a.extendTo(p * p * p * e + 3 * p * p * d * n + 3 * p * d * d * i + d * d * d * o))
                }
            }
            c || (l = 3 * t - 9 * r + 9 * s - 3 * u, h = 6 * r - 12 * s + 6 * u, p = 3 * s - 3 * u, Math.abs(l) <= 0 ? Math.abs(h) >= 0 && (p = -p / h, p > 0 && p < 1 && (d = 1 - p, f.extendTo(p * p * p * t + 3 * p * p * d * r + 3 * p * d * d * s + d * d * d * u))) : (p = h * h - 4 * l * p, p >= 0 && (v = Math.sqrt(p), p = (-h + v) / (2 * l), p > 0 && p < 1 && (d = 1 - p, f.extendTo(p * p * p * t + 3 * p * p * d * r + 3 * p * d * d * s + d * d * d * u)), p = (-h - v) / (2 * l), p > 0 && p < 1 && (d = 1 - p, f.extendTo(p * p * p * t + 3 * p * p * d * r + 3 * p * d * d * s + d * d * d * u)))))
        },
        unset: function() {
            this.x = new t({
                min: Infinity,
                max: -Infinity
            }), this.y = new t({
                min: Infinity,
                max: -Infinity
            })
        }
    };
    var t = function(e) {
        this.min = e.min, this.max = e.max
    };
    return t.prototype = {
        extendTo: function(e) {
            e < this.min && (this.min = e), e > this.max && (this.max = e)
        },
        contains: function(e) {
            return this.min <= e && e <= this.max
        },
        expand: function(e) {
            this.min -= e, this.max += e
        }
    }, e
}(Vector), typeof Vector == "undefined" && (Vector = {}), typeof Vector.Shapes == "undefined" && (Vector.Shapes = {}),
function() {
    var e = Math.PI * 2,
        t = Vector.Shapes;
    t.point = {}, t.circle = function(e, n, r, s) {
        return t.ellipse(e, n, r, s, s)
    }, t.ellipse = function(e, t, n, r, i) {
        e.moveTo(t, n - i), e.bezierCurveTo(t + .5522847498307936 * r, n - i, t + r, n - .5522847498307936 * i, t + r, n), e.bezierCurveTo(t + r, n + .5522847498307936 * i, t + .5522847498307936 * r, n + i, t, n + i), e.bezierCurveTo(t - .5522847498307936 * r, n + i, t - r, n + .5522847498307936 * i, t - r, n), e.bezierCurveTo(t - r, n - .5522847498307936 * i, t - .5522847498307936 * r, n - i, t, n - i)
    }, t.line = function(e, t, n, r, i) {
        e.moveTo(t, n), e.lineTo(r, i)
    }, t.SVGPath = function(e, n) {
        return n = Vector.SVG.toVOBPath(n), t.VOBPath(e, n)
    }, t.VOBPath = function(e, t) {
        for (var n in t) switch ((o = t[n]).cmd) {
            case "M":
                e.moveTo(o.x, o.y);
                break;
            case "L":
                e.lineTo(o.x, o.y);
                break;
            case "Q":
                e.quadraticCurveTo(o.x1, o.y1, o.x, o.y);
                break;
            case "C":
                e.bezierCurveTo(o.x1, o.y1, o.x2, o.y2, o.x, o.y);
                break;
            case "A":
                e.arcTo(o.x1, o.y1, o.x2, o.y2, o.radius);
                break;
            case "Z":
                e.closePath()
        }
    }, t.rect = function(e, t, n, r, i) {
        t - r <= 0 != n - i <= 0 ? (e.moveTo(t, n), e.lineTo(r, n), e.lineTo(r, i), e.lineTo(t, i)) : (e.moveTo(t, n), e.lineTo(t, i), e.lineTo(r, i), e.lineTo(r, n)), e.lineTo(t, n), e.closePath()
    }, t.roundRect = function(e, t, n, r, i, s, o) {
        r < 0 && (t += r, r = Math.abs(r)), i < 0 && (n += i, i = Math.abs(i)), typeof s != "numeric" && (o = s);
        var u = -Math.PI / 2,
            a = Math.PI / 4;
        s > Math.min(r, i) / 2 && (s = Math.min(r, i) / 2), o > Math.min(r, i) / 2 && (o = Math.min(r, i) / 2), e.moveTo(t + s, n), e.lineTo(t + r - s, n), e.quadraticCurveTo(t + r - s + Math.cos(u + a / 2) * s / Math.cos(a / 2), n + o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + r - s + Math.cos(u + a) * s, n + o + Math.sin(u + a) * o), e.quadraticCurveTo(t + r - s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + r - s + Math.cos(u + a) * s, n + o + Math.sin(u + a) * o), e.lineTo(t + r, n + i - o), e.quadraticCurveTo(t + r - s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + i - o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + r - s + Math.cos(u + a) * s, n + i - o + Math.sin(u + a) * o), e.quadraticCurveTo(t + r - s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + i - o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + r - s + Math.cos(u + a) * s, n + i - o + Math.sin(u + a) * o), e.lineTo(t + s, n + i), e.quadraticCurveTo(t + s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + i - o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + s + Math.cos(u + a) * s, n + i - o + Math.sin(u + a) * o), e.quadraticCurveTo(t + s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + i - o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + s + Math.cos(u + a) * s, n + i - o + Math.sin(u + a) * o), e.lineTo(t, n + o), e.quadraticCurveTo(t + s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + s + Math.cos(u + a) * s, n + o + Math.sin(u + a) * o), e.quadraticCurveTo(t + s + Math.cos((u += a) + a / 2) * s / Math.cos(a / 2), n + o + Math.sin(u + a / 2) * o / Math.cos(a / 2), t + s + Math.cos(u + a) * s, n + o + Math.sin(u + a) * o)
    }, t.wedge = function(e, t, n, r, i, s, o) {
        e.moveTo(t, n), e.arc(t, n, r, i, s, o), e.lineTo(t, n)
    }, t.polygon = function(e, t, n, r, i) {
        e.moveTo(t, n - r);
        for (var s = 1, o; s < i; s++) o = 360 / i * s * .017453, e.lineTo(Math.sin(o) * r + t, - Math.cos(o) * r + n);
        e.lineTo(t, n - r)
    }, t.gear = function(t, n, r, i, s, o) {
        o < 1 && (i *= o);
        var u = e / s,
            a = u / 4,
            o = i / o;
        t.moveTo(i + n, r);
        for (var f = 1; f <= s; f++) t.lineTo(Math.cos(u * f - a * 3) * o + n, Math.sin(u * f - a * 3) * o + r), t.lineTo(Math.cos(u * f - a * 2) * o + n, Math.sin(u * f - a * 2) * o + r), t.lineTo(Math.cos(u * f - a) * i + n, Math.sin(u * f - a) * i + r), t.lineTo(Math.cos(u * f) * i + n, Math.sin(u * f) * i + r)
    }, t.star = function(t, n, r, i, s, o) {
        o < 1 && (i *= o);
        var u = e / s,
            a = u / 2,
            o = i / o;
        t.moveTo(i + n, r);
        for (var f = 1; f <= s; f++) t.lineTo(Math.cos(u * f - a) * o + n, Math.sin(u * f - a) * o + r), t.lineTo(Math.cos(u * f) * i + n, Math.sin(u * f) * i + r)
    }, t.burst = function(t, n, r, i, s, o) {
        o < 1 && (i *= o);
        var u = e / s,
            a = u / 2,
            f = u / 4,
            o = i / o,
            l = 0;
        t.moveTo(i + n, r);
        for (l = 1; l <= s; l++) t.quadraticCurveTo(Math.cos(u * l - f * 3) * (o / Math.cos(f)) + n, Math.sin(u * l - f * 3) * (o / Math.cos(f)) + r, Math.cos(u * l - a) * o + n, Math.sin(u * l - a) * o + r), t.quadraticCurveTo(Math.cos(u * l - f) * (o / Math.cos(f)) + n, Math.sin(u * l - f) * (o / Math.cos(f)) + r, Math.cos(u * l) * i + n, Math.sin(u * l) * i + r)
    }, t.radialBurst = function(t, n, r, i, s, o) {
        var o = o * 4 || 1,
            u = e / s,
            a = u / 8,
            f = u / 4;
        t.moveTo(i + n, r);
        for (var l = 1; l <= s; l++) t.moveTo(Math.cos(u * l - a * o) * 0 + n, Math.sin(u * l - a * o) * 0 + r), t.lineTo(Math.cos(u * l - f * o) * i + n, Math.sin(u * l - f * o) * i + r), t.lineTo(Math.cos(u * l) * i + n, Math.sin(u * l) * i + r), t.lineTo(Math.cos(u * l - a * o) * 0 + n, Math.sin(u * l - a * o) * 0 + r)
    }, t.spiral = function(n, r, s, o, u, a, f) {
        var l = 0,
            h = 0,
            p = 0,
            d = 0,
            a = a / u * e,
            v = "moveTo";
        if (f) for (f = u; f > 0; f--) {
            var p = Math.pow(o, f / u),
                m = f * a,
                l = Math.cos(m) * p + r,
                p = Math.sin(m) * p + s;
            t[v] ? (h = Math.sqrt(Math.pow(l - h, 2) + Math.pow(p - d, 2)), t[v](n, l, p, h / 2, 5, 3.35)) : n[v](l, p), v === "moveTo" && (t.point.x = l, t.point.y = p, v = "lineTo"), h = l, d = p
        } else {
            for (f = 0; f <= u; f++) p = Math.pow(o, f / u), m = f * a, l = Math.cos(m) * p + r, p = Math.sin(m) * p + s, n.lineTo(l, p);
            t.point.x = l, t.point.y = p
        }
    }, t.spirals = function(n, r, s, o, u, a, f) {
        for (var l = u; l--;) {
            n.save(), n.translate(r, s), n.rotate(l * e / u), n.translate(-r, - s), n.moveTo(r, s);
            var h = 50 * a;
            t.spiral(n, r, s, o * f, h, a, !0);
            var p = t.point.x,
                d = t.point.y;
            t.spiral(n, r, s, o, h, a), n.lineTo(p, d), n.restore()
        }
    }, t.superformula = function(t, n, r, i, s, o, u, a, f) {
        o === 0 && (o = .01), u === 0 && (u = -0.01), a === 0 && (a = .01), f === 0 && (f = .01);
        for (var l = "moveTo", h = 0; h <= s; h++) {
            var p = h * e / s,
                d = Math.pow(Math.abs(Math.cos(o * p / 4) / 1), a),
                v = Math.pow(Math.abs(Math.sin(o * p / 4) / 1), f),
                v = Math.pow(d + v, 1 / u);
            v === 0 ? p = d = 0 : (v = 1 / v, d = v * Math.cos(p), p = v * Math.sin(p)), t[l](d * i + n, p * i + r), l = "lineTo"
        }
    }, t.clearPath = function(e, n, r, s, o, u, a, f, l) {
        e.beginPath(), e.globalCompositeOperation = "destination-out", t[n](e, n, r, s, o, u, a, f, l), e.fill(), e.globalCompositeOperation = "source-over", e.beginPath()
    }, t.clipPath = function(e, n, r, s, o, u, a, f, l) {
        e.beginPath(), t[n](e, n, r, s, o, u, a, f, l), e.clip()
    }
}(), typeof Vector == "undefined" && (Vector = {}), typeof Vector.SVG == "undefined" && (Vector.SVG = {}),
function() {
    function e(e) {
        e = e.getAttribute("style");
        if (!e) return {};
        for (var e = e.split(";"), t = {}, n = 0, r = e.length; n < r; n++) {
            var i = e[n].split(":");
            i[0] && i[1] && (t[i[0].trim()] = i[1].trim())
        }
        return t
    }
    function t(e) {
        var t = [];
        if (!e) return [];
        for (typeof e == "string" && (e = e.indexOf(",") !== -1 ? e.split(",") : e.split(" ")); e.length;) {
            var n = parseFloat(e.shift());
            t.push(n)
        }
        return t
    }
    function n() {
        return {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            x: 0,
            y: 0
        }
    }
    function r(e) {
        if (!e || typeof e != "object") return e;
        var t = new e.constructor,
            n;
        for (n in e) t[n] = !e[n] || typeof e[n] != "object" ? e[n] : r(e[n]);
        return t
    }
    var i = {}, s = {}, o = Vector.SVG = function(e) {
        var t = this;
        this.cors = this.debugBBox = this.debug = !1, this.placement = "bbox", this.ctx = e.ctx, this.cache = e.cache || document.createElement("canvas").getContext("2d"), this.defaultStroke = this.defaultFill = "#000000", this.state = {
            fillStyle: "#000000"
        }, this.defs = {}, this.vob = {}, this.batch = 0;
        var n = e.src,
            r = n.replace(/[^A-Z 0-9]+/gi, ""),
            o = document.getElementById(r),
            u = function() {
                if (i[r]) e.onload && e.onload(i[r]);
                else {
                    var n = o.contentDocument || o;
                    t.loaded = !0, t.document = o, t.element = n, t.svg = o, t.parse({
                        document: n,
                        onload: function(n) {
                            if (n) {
                                t.vob = n[0], t.viewBox = t.getBBox(), typeof sketch != "undefined" && sketch.fromPNG && (i[r] = t), e.onload && e.onload(t);
                                if (!t.debug) try {
                                    document.body.removeChild(o)
                                } catch (s) {}
                            }
                        },
                        node: {
                            childNodes: []
                        }
                    })
                }
            }, a = new DOMParser,
            f = function(e) {
                o = document.createElement("object"), o.style.cssText = "position: absolute; top: 0; left: 0;", o.appendChild(a.parseFromString(e, "text/xml").documentElement), o.id = r, document.body.appendChild(o), u(), t.debug ? o.style.background = "#ff0" : o.style.opacity = 0
            };
        return s[n] ? e.onerror("404") : o ? i[r] && i[r].loaded || e.srcs[n] ? u() : o.addEventListener("load", u, !1) : e.srcs && e.srcs[n] ? f(e.srcs[n]) : DOMLoader.sendRequest({
            url: n,
            onerror: function() {
                s[n] = !0, e.onerror("404")
            },
            onload: function(e) {
                f(e.responseText)
            }
        }), this
    };
    o.prototype.render = function(e) {
        if (this.vob) {
            if (String(e) === "[object CanvasRenderingContext2D]") var t = e,
                r = n();
            else t = e.ctx || this.ctx, r = e.matrix || n();
            t.save();
            switch (this.placement) {
                case "crop":
                    var i = this.viewBox,
                        r = i[2] - i[0],
                        s = i[3] - i[1],
                        i = (new Vector.Transform).translate(-i[0], - i[1]).matrix;
                    t.canvas.width = r, t.canvas.height = s, t.transform(i.a, i.b, i.c, i.d, i.x, i.y);
                    break;
                case "bbox":
                    i = this.viewBox, s = i[2] * r.a, s = r.a * (s / (s - i[0] * r.a) - 1), this.vob.matrix = r, this.vob.matrix.a += s, this.vob.matrix.d += s, this.vob.matrix.x -= i[0] * this.vob.matrix.a, this.vob.matrix.y -= i[1] * this.vob.matrix.d, i = this.vob.matrix, t.transform(i.a, i.b, i.c, i.d, i.x, i.y);
                    break;
                case "none":
                    t.canvas.width = this.ctx.canvas.width, t.canvas.height = this.ctx.canvas.height
            }
            return e.defaultFill && (this.defaultFill = e.defaultFill), this.activeAreas = [], this.renderChildNodes(t, e, [this.vob]), t.restore(), this.activeAreas
        }
    }, o.prototype.renderChildNodes = function(e, t, n, r) {
        var i;
        if (n && n.length) {
            var s = n.length,
                o = Vector.Shapes;
            this.typeface.ctx = e;
            for (var u = 0; u < s; u++) {
                e.save(), e.beginPath();
                var a = n[u];
                this.currentNode = a, e.save(), a.matrix && (i = a.matrix, e.transform(i.a, i.b, i.c, i.d, i.x, i.y)), a.clip && a.clip.length && (this.renderChildNodes(e, t, a.clip, !0), e.clip(), e.beginPath());
                switch (a.type) {
                    case "image":
                        e.drawImage(a.image, a.x, a.y, a.width, a.height);
                        break;
                    case "line":
                        o.line(e, a.x1, a.y1, a.x2, a.y2);
                        break;
                    case "path":
                        o.VOBPath(e, a.data);
                        break;
                    case "ellipse":
                        o.ellipse(e, a.cx, a.cy, a.rx, a.ry);
                        break;
                    case "circle":
                        o.ellipse(e, a.cx, a.cy, a.r, a.r);
                        break;
                    case "rect":
                        typeof a.rx == "undefined" ? o.rect(e, a.x, a.y, a.width + a.x, a.height + a.y) : o.roundRect(e, a.x, a.y, a.width, a.height, a.rx, a.ry)
                }
                t.point && e.isPointInPath(t.point.x, t.point.y + document.body.scrollTop) && this.activeAreas.push(a), this.debugBBox && a.bbox && !r && (i = a.bbox, e.save(), e.setTransform(1, 0, 0, 1, 0, 0), e.strokeRect(i.x1, i.y1, i.x2 - i.x1, i.y2 - i.y1), e.restore()), (i = a.style) && !r && (e.save(), typeof i.opacity != "undefined" && (e.globalAlpha = i.opacity), i.fillStyle && (this.setStyle(e, this.defs[i.fillStyle] || i, "fillStyle", this.defaultFill), e.save(), e.globalAlpha *= i.fillOpacity, a.content ? (e.font = this.formatFontStyle(e, i), i.fontRenderer === "SVG" ? (this.typeface.setFont(e.font), this.typeface.fillText(a.content, a.x, a.y)) : e.fillText(a.content.trim(), a.x, a.y)) : e.fill(), e.restore()), e.lineWidth = i.strokeWidth === 0 ? 1e-10 : i.strokeWidth || 1, e.lineCap = i.strokeLinecap || "butt", e.lineJoin = i.strokeLinejoin || "miter", e.miterLimit = i.strokeMiterlimit || e.lineWidth, i.strokeStyle && (this.setStyle(e, this.defs[i.strokeStyle] || i, "strokeStyle", this.defaultStroke), e.save(), e.globalAlpha *= i.strokeOpacity, a.content ? (e.font = this.formatFontStyle(e, i), i.fontRenderer === "SVG" ? (this.typeface.setFont(e.font), this.typeface.strokeText(a.content, a.x, a.y)) : e.strokeText(a.content, a.x, a.y)) : e.stroke(), e.restore()), e.restore()), e.restore(), a.childNodes && a.childNodes.length && this.renderChildNodes(e, t, a.childNodes, r), e.restore()
            }
        }
    }, o.prototype.parse = function(e) {
        function t() {
            if (++s.batch % 250 === 0) setTimeout(t, 0);
            else if (++g === m) e.onload && e.onload(u);
            else {
                var r = h[g],
                    i = r.type,
                    l = "",
                    p = s.getAttributes(r, "visibility,display");
                if (p.display === "none" || p.visibility === "hidden") return t();
                c.save();
                switch (i) {
                    case "SVG":
                        s.currentNode = l = s.getAttributes(r, "id,x,y,width,height,viewBox"), l.matrix = n(), l.type = "svg", s.vob = l, s.ctx.canvas.style.border = "1px solid rgba(0,0,0,0.1)", s.ctx.canvas.width = l.width || 0, s.ctx.canvas.height = l.height || 0, s.document.width = l.width || 0, s.document.height = l.height || 0, i = s.element.getElementsByTagName("font"), document.createElement("div"), s.typeface = new Vector.Typeface(s.ctx);
                        for (var d = 0; d < i.length; d++) s.typeface.loadFont(s.typeface.load(i[d].cloneNode(!0)));
                        s.debug && (s.document.style.left = s.ctx.canvas.width + "px");
                        if (l.viewBox) {
                            var i = l.width,
                                d = l.height,
                                p = l.viewBox[2] - l.viewBox[0],
                                v = l.viewBox[3] - l.viewBox[1];
                            if (i !== p || d !== v) p = Math.min(i / p, d / v), c.translate(i / 2, d / 2), c.scale(p, p), c.translate(-i / 2 * 1 / p, - d / 2 * 1 / p), v = new Vector.Transform, v.translate(i / 2, d / 2), v.scale(p, p), v.translate(-i / 2 * 1 / p, - d / 2 * 1 / p), l.matrix = v.matrix, l.rawMatrix = v.matrix, l.rawMatrix.type = "transform"
                        }
                        u.push(l), a = u[0], l.childNodes = [], s.parse({
                            document: r,
                            node: l,
                            svg: a,
                            onload: function(e) {
                                l.childNodes = e, c.restore(), t()
                            }
                        });
                        return;
                    case "Title":
                        a.title = r.textContent;
                        break;
                    case "Desc":
                        a.desc = r.textContent;
                        break;
                    case "A":
                    case "Switch":
                    case "G":
                        if (s.currentNode = l = s.getAttributes(r, "id"), l.parentNode = e.node, l.type = "G", c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), l.style = s.parseStyle(c, r, !f), r.hasChildNodes) {
                            u.push(l), l.childNodes = [], s.parse({
                                document: r,
                                node: l,
                                svg: a,
                                onload: function(e) {
                                    l.childNodes = e, c.restore(), t()
                                }
                            });
                            return
                        };
                    case "Use":
                        if (i = r.getAttribute("xlink:href") || r.getAttribute("href")) if (s.currentNode = l = {}, l.parentNode = e.node, l.type = "use", i = i.substr(1), !s.defs[i]) {
                            var y = s.getElementById(i);
                            c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), s.parseTransform(y, !0), s.parseClipPath(y, !0), u.push(l), l.childNodes = [], s.parse({
                                skipFill: e.skipFill,
                                document: y,
                                node: l,
                                svg: a,
                                onload: function(e) {
                                    l.childNodes = e, c.restore(), t()
                                }
                            });
                            return
                        }
                        break;
                    case "FEGaussianBlur":
                        s.currentNode = l = s.getAttributes(r, "id,stdDeviation"), l.parentNode = e.node, l.type = "GaussianBlur", u.push(l);
                        break;
                    case "Image":
                        if (i = r.getAttribute("xlink:href")) {
                            if (!this.cors && i.substr(0, 4) === "http") break;
                            s.currentNode = l = s.getAttributes(r, "id,x,y,width,height,preserveAspectRatio", !0), l.parentNode = e.node, l.type = "image", l.x = l.x || 0, l.y = l.y || 0, c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), r = s.svg.data.split("/"), r.pop(), r = r.join("/") + "/", l.image = new Image, l.image.node = l, l.image.onload = function() {
                                var e = this.width,
                                    n = this.height,
                                    r = this.node.matrix;
                                c.setTransform(r.a, r.b, r.c, r.d, r.x, r.y);
                                if (this.node.preserveAspectRatio && this.node.preserveAspectRatio !== "none") {
                                    var i = this.node.preserveAspectRatio.split(" ")[0],
                                        r = i.substr(1, 3),
                                        i = i.substr(5, 3);
                                    e > this.node.width && (n *= this.node.width / e, e = this.node.width), n > this.node.height && (e *= this.node.height / n, n = this.node.height);
                                    switch (r) {
                                        case "Min":
                                            r = 0;
                                            break;
                                        case "Mid":
                                            r = (this.node.width - e) / 2;
                                            break;
                                        case "Max":
                                            r = this.node.width - e
                                    }
                                    switch (i) {
                                        case "Min":
                                            i = 0;
                                            break;
                                        case "Mid":
                                            i = (this.node.height - n) / 2;
                                            break;
                                        case "Max":
                                            i = this.node.height - n
                                    }
                                    c.drawImage(this, r, i, e, n), l.x = r, l.y = i, l.width = e, l.height = n
                                } else c.drawImage(this, this.node.x, this.node.y, this.node.width, this.node.height);
                                c.restore(), u.push(l), t()
                            }, l.image.onerror = function() {
                                c.restore(), t()
                            }, i.indexOf("base64") !== -1 || i.substr(0, 4) === "http" ? (l.src = i, l.image.src = i) : (l.src = r + i, l.image.src = r + i);
                            return
                        };
                    case "Text":
                        s.currentNode = l = s.getAttributes(r, "id,x,y,dx,dy", !0), l.parentNode = e.node, l.type = "text", l.childNodes = [], c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), l.style = s.parseStyle(c, r, !f);
                        for (var b = Infinity, w = Infinity, E = -Infinity, S = -Infinity, x = l.dx || 0 + (l.x || 0), T = l.dy || 0 + (l.y || 0), r = r.childNodes, d = i = 0, v = r.length; d < v; d++) {
                            y = r[d];
                            if (String(y) === "[object Text]") {
                                var p = {}, N = document.createElement("tspan");
                                N.textContent = y.textContent, y = N
                            } else p = s.getAttributes(y, "id,x,y,dx,dy", !0);
                            0 !== (p.dy || 0) ? x = p.dx || 0 : x += p.dx || 0, T += p.dy || 0, p.x = x + (p.x || 0), p.y = T + (p.y || 0), p.parentNode = l, p.type = "tspan", p.content = y.textContent, s.currentNode = p, p.style = s.parseStyle(c, y, !f), l.childNodes.push(p), N = s.formatFontStyle(c, p.style), y = Vector.Text.measureText(y.textContent, N), b > p.x && (b = p.x), w > p.y && (w = p.y - p.style.fontSize), S < p.y + y.height && (S = p.y + y.height - p.style.fontSize), E < p.x + y.width && (E = p.x + y.width), x += y.width, i += y.width
                        }
                        switch (l.style.textAnchor) {
                            case "middle":
                                b -= i / 2, E -= i / 2;
                                break;
                            case "end":
                                b -= i, E -= i
                        }
                        i = [b, w, E, S], l.bbox = new Vector.BBox(i, l.matrix), u.push(l);
                        break;
                    case "Rect":
                        s.currentNode = l = s.getAttributes(r, "id,x,y,rx,ry,width,height"), l.parentNode = e.node, l.type = "rect", l.x || (l.x = 0), l.y || (l.y = 0), c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), i = [l.x, l.y, l.x + l.width, l.y + l.height], l.bbox = new Vector.BBox(i, l.matrix), typeof l.rx == "undefined" ? o.rect(c, l.x, l.y, l.width + l.x, l.height + l.y) : o.roundRect(c, l.x, l.y, l.width, l.height, l.rx, l.ry), l.style = s.parseStyle(c, r, !f), u.push(l);
                        break;
                    case "Circle":
                        s.currentNode = l = s.getAttributes(r, "id,cx,cy,r"), l.parentNode = e.node, l.type = "circle", c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), i = [l.cx - l.r, l.cy - l.r, l.cx + l.r, l.cy + l.r], l.bbox = new Vector.BBox(i, l.matrix), l.cx = l.cx || 0, l.cy = l.cy || 0, o.ellipse(c, l.cx, l.cy, l.r, l.r), l.style = s.parseStyle(c, r, !f), u.push(l);
                        break;
                    case "Ellipse":
                        s.currentNode = l = s.getAttributes(r, "id,cx,cy,rx,ry"), l.parentNode = e.node, l.type = "ellipse", c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), l.cx = l.cx || 0, l.
                        cy = l.cy || 0, i = [l.cx - l.rx, l.cy - l.ry, l.cx + l.rx, l.cy + l.ry], l.bbox = new Vector.BBox(i, l.matrix), o.ellipse(c, l.cx, l.cy, l.rx, l.ry), l.style = s.parseStyle(c, r, !f), u.push(l);
                        break;
                    case "Line":
                        s.currentNode = l = s.getAttributes(r, "id,x1,y1,x2,y2"), l.parentNode = e.node, l.type = "line", l.x1 = l.x1 || 0, l.y1 = l.y1 || 0, l.x2 = l.x2 || 0, l.y2 = l.y2 || 0, c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), i = [l.x1, l.y1, l.x2, l.y2], l.bbox = new Vector.BBox(i, l.matrix), o.line(c, l.x1, l.y1, l.x2, l.y2), l.style = s.parseStyle(c, r, !f), u.push(l);
                        break;
                    case "Polyline":
                    case "Polygon":
                        b = r.getAttribute("points");
                        if (typeof b == "undefined" || b === null) break;
                        p = b.trim().split(/[, ]/), b = [], w = [], d = 0;
                        for (v = p.length; d < v; d++) p[d] && (w.length < 2 && w.push(p[d]), w.length === 2 && (b.push(w), w = []));
                        if (b.length < 2) break;
                        typeof b[b.length - 1][1] == "undefined" && (b[b.length - 1][1] = b[0][1]), b = i === "Polygon" ? "M" + b.join(" L") + "z" : "M" + b.join(" L"), s.currentNode = l = s.getAttributes(r, "id"), l.parentNode = e.node, l.type = "path", l.d = b, c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), l.data = Vector.SVGPath.toVOBPath(l.d), l.bbox = new Vector.BBox(l.data, l.matrix), o.VOBPath(c, l.data), l.style = s.parseStyle(c, r, !f), u.push(l);
                        break;
                    case "Path":
                        s.currentNode = l = s.getAttributes(r, "id,d"), l.parentNode = e.node, l.type = "path", c.beginPath(), s.parseTransform(r, !0), s.parseClipPath(r, !0), l.data = Vector.SVGPath.toVOBPath(l.d), l.bbox = new Vector.BBox(l.data, l.matrix), o.VOBPath(c, l.data), l.style = s.parseStyle(c, r, !f), u.push(l)
                }
                c.restore(), t()
            }
        }
        if (e.node) {
            if (!e.document || !e.document.childNodes || !e.document.childNodes.length) {
                var r = String(e.document),
                    r = r.substr(11, r.length - 19);
                if (!l[r]) {
                    e.onload && e.onload([]);
                    return
                }
                i = [e.document]
            } else var i = e.document.childNodes;
            e.defs && (this.defs = e.defs);
            for (var s = this, o = Vector.Shapes, u = e.node.childNodes, a = e.svg, f = e.skipFill, c = this.ctx, h = [], p = 0, d = i.length; p < d; p++) {
                var v = i[p],
                    r = String(v),
                    r = r.substr(11, r.length - 19);
                r !== "" && (v.type = r, h.push(v))
            }
            var m = h.length,
                g = -1;
            return t(), u
        }
    }, o.prototype.setStyle = function(e, t, n, r) {
        typeof t.strokeWidth != "undefined" && (e.lineWidth = t.strokeWidth || 1e-10), typeof t.strokeLinecap != "undefined" && (e.lineCap = t.strokeLinecap), typeof t.strokeLinejoin != "undefined" && (e.lineJoin = t.strokeLinejoin), typeof t.strokeMiterlimit != "undefined" && (e.miterLimit = t.strokeMiterlimit);
        var i;
        if (t.gradientTransform) {
            var s = t.gradientTransform;
            if (this.currentNode && this.currentNode.matrix) {
                i = this.currentNode.matrix;
                var o = new Vector.Transform;
                o.transform(i.a, i.b, i.c, i.d, i.x, i.y), o.transform(s.a, s.b, s.c, s.d, s.x, s.y), i = o.matrix
            }
        }
        switch (t.type) {
            case "linearGradient":
                i && e.setTransform(i.a, i.b, i.c, i.d, i.x, i.y), String(t.x1) === "undefined" && (t.x1 = 0), String(t.y1) === "undefined" && (t.y1 = 0), String(t.x2) === "undefined" && (t.x2 = 0), String(t.y2) === "undefined" && (t.y2 = 0);
                if (t.gradientUnits === "objectBoundingBox") {
                    t.x1 === 0 && t.y1 === 0 && t.x2 === 0 && t.y2 === 0 && (t.x2 = 1);
                    var u = this.currentNode;
                    if (!u.bbox) break;
                    var r = u.bbox,
                        a = r.x1 + (r.x2 - r.x1) * t.x1,
                        f = r.y1 + (r.y2 - r.y1) * t.y1,
                        l = r.x1 + (r.x2 - r.x1) * t.x2,
                        c = r.y1 + (r.y2 - r.y1) * t.y2,
                        o = e.createLinearGradient(a, f, l, c),
                        o = (new Vector.Transform(u.matrix)).invert(),
                        a = o.point2d(a, f),
                        o = o.point2d(l, c),
                        o = e.createLinearGradient(a.x, a.y, o.x, o.y)
                } else o = e.createLinearGradient(t.x1, t.y1, t.x2, t.y2);
                r = 0;
                for (i = t.stops.length; r < i; r++) s = t.stops[r], o.addColorStop(s.offset, s.color);
                e[n] = o;
                break;
            case "radialGradient":
                i && e.setTransform(i.a, i.b, i.c, i.d, i.x, i.y), typeof t.cx == "undefined" && (t.cx = .5), typeof t.cy == "undefined" && (t.cy = .5), typeof t.fx == "undefined" && (t.fx = .5), typeof t.fy == "undefined" && (t.fy = .5), typeof t.r == "undefined" && (t.r = .5);
                if (t.gradientUnits === "objectBoundingBox") {
                    u = this.currentNode, r = u.bbox;
                    if (!u.bbox) break;
                    i = r.x2 - r.x1;
                    var s = r.y2 - r.y1,
                        a = r.x1 + i * t.cx,
                        f = r.y1 + s * t.cy,
                        l = r.x1 + i * t.fx,
                        c = r.y1 + s * t.cy,
                        h = Math.max(i, s) * t.r * 1.6,
                        o = (new Vector.Transform(u.matrix)).invert(),
                        a = o.point2d(a, f),
                        o = o.point2d(l, c),
                        o = e.createRadialGradient(a.x, a.y, 0, o.x, o.y, h);
                    s < i && (i = s / i, e.translate(0, r.y2), e.scale(1, i))
                } else o = e.createRadialGradient(t.cx, t.cy, 0, t.fx, t.fy, t.r);
                r = 0;
                for (i = t.stops.length; r < i; r++) s = t.stops[r], o.addColorStop(s.offset, s.color);
                e[n] = o;
                break;
            case "pattern":
                e[n] = t.pattern;
                break;
            default:
                e[n] = t[n] === "default" ? r || this.defaultFill : t[n]
        }
    }, o.prototype.parseAttribute = function(e, t, n) {
        return e === "inherit" && (e = this.currentNode, e = e.parentNode && e.parentNode.style && e.parentNode.style[t] ? e.parentNode.style[t] : n), e
    }, o.prototype.parseStyleAttribute = function(e, t, n) {
        e = t[n] || e.getAttribute(n), t = n === "color" ? "color" : n + "Style";
        if (e) {
            if (Color.WebColors[e]) e = "#" + Color.WebColors[e];
            else if (e === "none") e = "rgba(0,0,0,0)";
            else if (e === "currentColor") e = this.state.color;
            else if (e.substr(0, 3) === "url") {
                var e = e.substr(5, e.indexOf(")") - 5),
                    r = this.ctx,
                    i = this.parseDefs(r, e, n);
                i ? this.setStyle(r, i, t) : e = ""
            }
            return e === "inherit" && (r = this.currentNode, r.parentNode && r.parentNode.style && r.parentNode.style[t] ? e = r.parentNode.style[t] : n !== "stroke" && (e = "#000000")), e
        }
    }, o.prototype.parseStyle = function(t, n, i) {
        var s = this.currentNode,
            o = this.state = r(s.parentNode.style || this.state),
            u = e(n);
        t.save();
        var a = this.getAttributes(n, "opacity,fill-rule,fill-opacity,stroke-width,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-dasharray,stroke-dashoffset,stroke-opacity,font-size,font-family,font-weight,font-style,line-height,text-anchor", !0);
        typeof a.opacity != "undefined" ? (o.opacity = a.opacity, t.globalAlpha = o.opacity) : s.parentNode.style ? (o.opacity = s.parentNode.style.opacity, t.globalAlpha = o.opacity) : (o.opacity = 1, t.globalAlpha = 1);
        var f = u.filter || n.getAttribute("filter");
        if (f) {
            var l = f.substr(5, f.length - 6);
            !this.defs[l] && (f = this.getElementById(l)) && (this.defs[l] = this.getAttributes(f, "id,x,y,width,height"), this.defs[l].type = "filter", this.defs[l].filter = this.parse({
                document: f,
                node: {
                    childNodes: []
                }
            })), o.filter = l
        } else delete o.filter;
        a.fontSize && (o.fontSize = a.fontSize);
        if (a.fontFamily) {
            o.fontFamily = a.fontFamily;
            for (f = a.fontFamily.split(",");;) {
                l = f.shift();
                if (!l) break;
                if (this.typeface.packages[l]) {
                    o.fontRenderer = "SVG";
                    break
                }
                if (Vector.Text.getFontSupport(l)) {
                    o.fontRenderer = "native";
                    break
                }
            }
        }
        a.fontWeight && (o.fontWeight = a.fontWeight), a.fontStyle && (o.fontStyle = a.fontStyle), a.lineHeight && (o.lineHeight = a.lineHeight), a.textAnchor && (o.textAnchor = a.textAnchor), t.font = this.formatFontStyle(t, o);
        if (f = this.parseStyleAttribute(n, u, "color")) o.color = f;
        if (f = this.parseStyleAttribute(n, u, "fill")) a.fillStyle = f;
        else if (f = s.parentNode, f.style) {
            var f = r(f.style),
                h;
            for (h in a) f[h] = a[h];
            a = f
        } else a.fillStyle = "default";
        o.fillStyle = this.parseAttribute(a.fillStyle, "fillStyle", "#000000"), o.fillRule = this.parseAttribute(a.fillRule, "fillRule", "nonzero"), o.fillOpacity = Math.max(0, this.parseAttribute(a.fillOpacity, "fillOpacity", 1)), i && o && (o.fillStyle === "default" ? t.fillStyle = this.defaultFill : o.fillStyle && (t.fillStyle = o.fillStyle), t.save(), t.globalAlpha *= o.fillOpacity, s.content ? o.fontRenderer === "SVG" ? (this.typeface.setFont(t.font), this.typeface.fillText(s.content, s.x, s.y)) : t.fillText(s.content, s.x, s.y) : t.fill(), t.restore());
        if (f = this.parseStyleAttribute(n, u, "stroke")) a.strokeStyle = f;
        else if (f = s.parentNode, f.style) {
            f = r(f.style);
            for (h in a) f[h] = a[h];
            a = f
        }
        return typeof a.strokeWidth != "undefined" && (o.strokeWidth = this.parseAttribute(a.strokeWidth, "strokeWidth", 1)), typeof a.strokeStyle != "undefined" && (o.strokeStyle = this.parseAttribute(a.strokeStyle, "strokeStyle", "none")), typeof a.strokeLinecap != "undefined" && (o.strokeLinecap = this.parseAttribute(a.strokeLinecap, "strokeLinecap", "butt")), typeof a.strokeLinejoin != "undefined" && (o.strokeLinejoin = this.parseAttribute(a.strokeLinejoin, "strokeLinejoin", "miter")), typeof a.strokeMiterlimit != "undefined" && (o.strokeMiterlimit = Math.max(1, this.parseAttribute(a.strokeMiterlimit, "strokeMiterlimit", 4))), typeof a.strokeDasharray != "undefined" && (o.strokeDasharray = this.parseAttribute(a.strokeDasharray, "strokeDasharray", "none")), typeof a.strokeDashoffset != "undefined" && (o.strokeDashoffset = this.parseAttribute(a.strokeDashoffset, "strokeDashoffset", 0)), typeof a.strokeOpacity != "undefined" && (o.strokeOpacity = Math.max(0, this.parseAttribute(a.strokeOpacity, "strokeOpacity", 1))), i && o && (t.lineWidth = o.strokeWidth === 0 ? 1e-10 : o.strokeWidth || 1, t.lineCap = o.strokeLinecap || "butt", t.lineJoin = o.strokeLinejoin || "miter", t.miterLimit = o.strokeMiterlimit || t.lineWidth, o.strokeStyle) && (t.strokeStyle = o.strokeStyle, t.save(), t.globalAlpha *= o.strokeOpacity, s.content ? o.fontRenderer === "SVG" ? (this.typeface.setFont(t.font), this.typeface.strokeText(s.content, s.x, s.y)) : t.strokeText(s.content, s.x, s.y) : t.stroke(), t.restore()), t.restore(), o
    };
    var u = function(e, t) {
        return e.evaluate('//*[@xml:id="' + t + '"]', e, function() {
            return "http://www.w3.org/XML/1998/namespace"
        }, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
    };
    o.prototype.getElementById = function(e) {
        if (this.element.ownerDocument) {
            var t = this.element.ownerDocument.getElementById(e);
            t || (t = u(this.element.ownerDocument, e))
        } else(t = this.element.getElementById(e)) || (t = u(this.element, e));
        return t
    }, o.prototype.parseDefs = function(e, t, n) {
        if (!this.defs[t]) {
            var r = this.getElementById(t);
            if (!r) return {};
            n = String(r);
            switch (n = n.substr(11, n.length - 19)) {
                case "Pattern":
                    var i = document.createElement("canvas").getContext("2d");
                    i.VOBPath = Vector.Shapes.VOBPath;
                    var s = this.parsePattern(e, r, n);
                    i.canvas.width = s.width, i.canvas.height = s.width, s.childNodes = this.parse({
                        ctx: i,
                        document: r,
                        node: {
                            childNodes: []
                        }
                    }), i.canvas.width && (s.pattern = e.createPattern(i.canvas, "repeat")), this.defs[t] = s;
                case "LinearGradient":
                case "RadialGradient":
                    this.defs[t] = this.parseGradient(e, r, n)
            }
        }
        return this.defs[t]
    }, o.prototype.parseGradient = function(t, n, r) {
        if (r === "LinearGradient") {
            var i = this.getAttributes(n, "id,x1,y1,x2,y2,spreadMethod,gradientUnits,gradientTransform");
            i.type = "linearGradient"
        } else if (i = this.getAttributes(n, "id,cx,cy,r,fx,fy,spreadMethod,gradientUnits,gradientTransform"), i.type = "radialGradient", typeof i.fx == "undefined") i.fx = i.cx, i.fy = i.cy;
        typeof i.gradientUnits == "undefined" && (i.gradientUnits = "objectBoundingBox");
        var s = [],
            o = n.childNodes;
        if (n.getAttribute("xlink:href")) return s = n.getAttribute("xlink:href").substr(1), s = this.parseDefs(t, s, r), i.stops = s.stops, i;
        var u = e(n),
            t = u.color || n.getAttribute("color") || this.state.color,
            n = 0,
            a;
        for (a in o) {
            var f = o[a],
                r = String(f);
            r.substr(11, r.length - 19) === "Stop" && (u = e(f), r = u["stop-color"] || f.getAttribute("stop-color")) && (Color.WebColors[r] ? r = "#" + Color.WebColors[r] : r === "none" ? r = "rgba(0,0,0,0)" : r === "currentColor" ? r = t || "#000000" : r === "inherit" && (r = t || "#000000"), (u = u["stop-opacity"] || f.getAttribute("stop-opacity")) && u !== "1" && (u === "inherit" && (u = 1), r.substr(0, 1) === "#" ? (r = Color.Space(r.substr(1), "W3>HEX24>RGB"), r.A = parseFloat(u) * 255) : r.substr(0, 4) === "rgba" ? (r = Color.Space(r, "W3>RGBA"), r.A *= parseFloat(u)) : r.substr(0, 3) === "rgb" && (r = Color.Space(r, "W3>RGB"), r.A = parseFloat(u) * 255), r = Color.Space.RGBA_W3(r)), f = f.getAttribute("offset") || "0", u = f.indexOf("%") !== -1 ? 100 : 1, f = parseFloat(f) / u, f < n && (f = n), s.push({
                offset: f,
                color: r
            }), n = f)
        }
        return i.stops = s, i
    }, o.prototype.parsePattern = function(e, t) {
        var n = this.getAttributes(t, "patternUnits,patternContentUnits,patternTransform,x,y,width,height,preserveAspectRatio,href");
        return n.type = "pattern", n.id = t.id, n
    };
    var a = Math.PI / 180;
    o.prototype.parseTransform = function(e, r, i) {
        var s = this.ctx,
            o = this.currentNode;
        if (e) {
            e = e.getAttribute(i || "transform");
            if (r) if (o.parentNode.matrix) var u = o.parentNode.matrix,
                i = o.matrix = {
                    a: u.a,
                    b: u.b,
                    c: u.c,
                    d: u.d,
                    x: u.x,
                    y: u.y
                };
            else i = o.matrix = n();
            else i = n();
            if (e) {
                var u = new Vector.Transform(i),
                    f = new Vector.Transform;
                if (e.substr(0, 6) === "matrix") e = e.substr(7, e.length - 8), e = t(e), r && (s.transform(e[0], e[1], e[2], e[3], e[4], e[5]), f.transform(e[0], e[1], e[2], e[3], e[4], e[5])), u.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
                else if (e.indexOf("(") !== -1) for (var e = e.substr(0, e.length - 1).split(")"), l = 0, c = e.length; l < c; l++) {
                    var h = e[l].replace(/^\s+|\s+$/, "").split("("),
                        i = h[0].replace(/^\s+|\s+$/, ""),
                        h = t(h[1]);
                    switch (i) {
                        case "translate":
                            h.length === 2 ? (r && (s.translate(h[0], h[1]), f.translate(h[0], h[1])), u.translate(h[0], h[1])) : (r && (s.translate(h[0], 0), f.translate(h[0], 0)), u.translate(h[0]));
                            break;
                        case "scale":
                            h.length === 2 ? (r && (s.scale(h[0], h[1]), f.scale(h[0], h[1])), u.scale(h[0], h[1])) : (r && (s.scale(h[0], h), f.scale(h[0], h[0])), u.scale(h[0], h[0]));
                            break;
                        case "rotate":
                            i = h[0] * a, h.length === 3 ? (r && (s.translate(h[1], h[2]), s.rotate(i), s.translate(-h[1], - h[2]), f.translate(h[1], h[2]), f.rotate(i), f.translate(-h[1], - h[2])), u.translate(h[1], h[2]), u.rotate(i), u.translate(-h[1], - h[2])) : (r && (s.rotate(i), f.rotate(i)), u.rotate(i));
                            break;
                        case "skewX":
                            i = h[0] * a, r && (s.transform(1, 0, Math.tan(i), 1, 0, 0), f.skew(i, 0)), u.skew(i, 0);
                            break;
                        case "skewY":
                            i = h[0] * a, r && (s.transform(1, Math.tan(i), 0, 1, 0, 0), f.skew(0, i)), u.skew(0, i)
                    }
                }
                return r && (o.rawMatrix = f.matrix, o.rawMatrix.type = "transform", o.matrix = u.matrix), u.matrix
            }
        }
    }, o.prototype.parseClipPath = function(e, t) {
        var n = this.ctx,
            r = this.currentNode;
        if (e) {
            var i = e.getAttribute("clip-path");
            if (i) {
                i = i.substr(5, i.length - 6);
                if (this.defs[i]) return t && (r.clip = this.defs[i].d), this.renderChildNodes(n, {}, r.clip, !0), n.clip(), n.beginPath(), this.defs[i];
                var s = this.getElementById(i);
                if (s) return this.defs[i] = this.getAttributes(s, "id,x,y,width,height,clipPathUnits"), this.defs[i].type = "clipPath", s = this.parse({
                    document: s,
                    matrix: this.vob.matrix,
                    node: {
                        childNodes: []
                    },
                    skipFill: !0,
                    skipDraw: !0
                }), n.clip(), n.beginPath(), s.id = i, this.defs[i].d = s, t && (r.clip = s), this.defs[i]
            }
        }
    };
    var f = {
        id: "string",
        viewBox: "numarray",
        stdDeviation: "float",
        opacity: "float",
        "font-size": "float",
        "font-style": "string",
        "font-family": "string",
        "font-weight": "string",
        "line-height": "float",
        "text-anchor": "string",
        visibility: "string",
        display: "string",
        d: "string",
        x: "coordinate",
        y: "coordinate",
        dx: "coordinate",
        dy: "coordinate",
        cx: "coordinate",
        cy: "coordinate",
        rx: "float",
        ry: "float",
        r: "coordinate",
        x1: "float",
        y1: "float",
        x2: "float",
        y2: "float",
        width: "coordinate",
        height: "coordinate",
        "fill-rule": "string",
        "fill-opacity": "float",
        "stroke-width": "coordinate",
        "stroke-linecap": "string",
        "stroke-linejoin": "string",
        "stroke-miterlimit": "float",
        "stroke-dasharray": "numarray",
        "stroke-dashoffset": "coordinate",
        "stroke-opacity": "float",
        spreadMethod: "string",
        gradientUnits: "string",
        gradientTransform: "gradientTransform",
        clipPathUnits: "string",
        fx: "coordinate",
        fy: "coordinate",
        patternUnits: "string",
        patternContentUnits: "string",
        patternTransform: "patternTransform",
        preserveAspectRatio: "string",
        href: "xlink:href",
        "color-interpolation-filters": "string"
    };
    o.prototype.getAttributes = function(n, r, i) {
        var s = {};
        if (!n || !n.getAttribute) return {};
        for (var o = e(n), u = 0, r = r.split(","), a = r.length; u < a; u++) {
            var l = r[u],
                h = f[l];
            if (i) {
                var d = o[l] || n.getAttribute(l);
                l.indexOf("-") !== -1 && (l = l.split("-"), l[1] && (l[1] = l[1][0].toUpperCase() + l[1].substr(1)), l = l.join(""))
            } else d = n.getAttribute(l) || o[l], l === "id" && !d && (d = n.getAttribute("xml:id"));
            if (d) if (d === "inherit") h = this.currentNode, h.parentNode && h.parentNode.style && h.parentNode.style[l] && (s[l] = h.parentNode.style[l]);
            else switch (h) {
                case "numarray":
                    s[l] = t(d);
                    break;
                case "coordinate":
                    s[l] = parseFloat(d), d.indexOf("%") !== -1 && (s[l] *= 3), s[l] === Infinity && (s[l] = 4294967295), s[l] === -Infinity && (s[l] = -4294967295);
                    break;
                case "float":
                    s[l] = parseFloat(d), s[l] === Infinity && (s[l] = 4294967295), s[l] === -Infinity && (s[l] = -4294967295);
                    break;
                case "int":
                    s[l] = parseInt(d), s[l] === Infinity && (s[l] = 4294967295), s[l] === -Infinity && (s[l] = -4294967295);
                    break;
                case "transform":
                case "patternTransform":
                case "gradientTransform":
                    s[l] = this.parseTransform(n, !1, h);
                    break;
                case "string":
                    s[l] = d
            }
        }
        return s
    }, o.prototype.getBBox = function() {
        var e = Infinity,
            t = Infinity,
            n = -Infinity,
            r = -Infinity,
            i = function(s) {
                for (var o = 0, u = s.length; o < u; o++) {
                    var a = s[o];
                    if (a) {
                        if (a.bbox) {
                            if (a.style.strokeStyle) var f = a.style.strokeWidth || 0,
                                l = a.bbox.x1 - f,
                                h = a.bbox.x2 + f,
                                p = a.bbox.y1 - f,
                                f = a.bbox.y2 + f;
                            else l = a.bbox.x1, h = a.bbox.x2, p = a.bbox.y1, f = a.bbox.y2;
                            l < e && (e = l), p < t && (t = p), h > n && (n = h), f > r && (r = f)
                        }
                        a.childNodes && i(a.childNodes)
                    }
                }
            };
        return i([this.vob]), [e, t, n, r]
    }, o.prototype.formatFontStyle = function(e, t) {
        var n = t.textAnchor || "left";
        return n === "middle" && (n = "center"), e.textAlign = n, (t.fontStyle || "normal") + " " + (t.fontWeight || "normal") + " " + (t.fontSize || "normal") + "px " + (t.fontFamily || "serif")
    };
    var l = {
        Text: !0,
        Rect: !0,
        Circle: !0,
        Ellipse: !0,
        Line: !0,
        Polyline: !0,
        Polygon: !0,
        Path: !0
    };
    o.prototype.stringify = function() {
        var e = this,
            t = "",
            n = function(t, n) {
                typeof n.id == "string" && (t += ' id="' + n.id + '"'), typeof n.d == "string" && (t += ' d="' + n.d + '"');
                if (n.rawMatrix) {
                    var r = n.rawMatrix;
                    t += ' transform="matrix(' + r.a + "," + r.b + "," + r.c + "," + r.d + "," + r.x + "," + r.y + ')"'
                }
                if (n.style) for (var i in n.style) {
                    var r = i.match(/([A-Z]?[^A-Z]*)/g).slice(0, - 1).join("-").toLowerCase(),
                        s = n.style[i];
                    r === "fill-style" && (r = "fill"), r === "stroke-style" && (r = "stroke"), s === "default" && (s = e.defaultFill), t += e.defs[s] ? " " + r + '="url(#' + s + ')"' : " " + r + '="' + s + '"'
                }
                return n.viewBox && (i = n.viewBox, t += ' viewBox="' + i[0] + " " + i[1] + " " + i[2] + " " + i[3] + '"'), n.x && (t += ' x="' + n.x + '"'), n.y && (t += ' y="' + n.y + '"'), n.x1 && (t += ' x1="' + n.x1 + '"'), n.y1 && (t += ' y1="' + n.y1 + '"'), n.x2 && (t += ' x2="' + n.x2 + '"'), n.y2 && (t += ' y2="' + n.y2 + '"'), n.rx && (t += ' rx="' + n.rx + '"'), n.ry && (t += ' ry="' + n.ry + '"'), n.cx && (t += ' cx="' + n.cx + '"'), n.cy && (t += ' cy="' + n.cy + '"'), n.r && (t += ' r="' + n.r + '"'), n.fx && (t += ' fx="' + n.fx + '"'), n.fy && (t += ' fy="' + n.fy + '"'), n.width && (t += ' width="' + n.width + '"'), n.height && (t += ' height="' + n.height + '"'), n.preserveAspectRatio && (t += ' preserveAspectRatio="' + n.preserveAspectRatio + '"'), n.clipPathUnits && (t += ' clipPathUnits="' + n.clipPathUnits + '"'), n.stdDeviation && (t += ' stdDeviation="' + n.stdDeviation + '"'), n.gradientUnits && (t += ' gradientUnits="' + n.gradientUnits + '"'), n.spreadMethod && (t += ' spreadMethod="' + n.spreadMethod + '"'), n.clip && (t += ' clip-path="url(#' + n.clip.id + ')"'), n.src && (t += ' xlink:href="' + n.src + '"'), n.textAnchor && (t += ' text-anchor="' + n.textAnchor + '"'), n.gradientTransform && (r = n.gradientTransform, t += ' gradientTransform="matrix(' + r.a + "," + r.b + "," + r.c + "," + r.d + "," + r.x + "," + r.y + ')"'), t
            }, r = "",
            i;
        for (i in this.defs) {
            var s = this.defs[i];
            switch (s.type) {
                case "linearGradient":
                case "radialGradient":
                    r += "<" + s.type, r = n(r, s), r += ">\n";
                    for (var o = s.stops, u = 0; u < o.length; u++) {
                        var a = o[u],
                            f = a.color;
                        if (f.substr(0, 4) === "rgba") {
                            var f = Color.Space(f, "W3>RGBA"),
                                l = f.A / 255,
                                f = Color.Space(f, "RGB>W3");
                            r += '	<stop offset="' + a.offset + '" style="stop-color:' + f + ";stop-opacity:" + l + ';"/>\n'
                        } else r += '	<stop offset="' + a.offset + '" style="stop-color:' + a.color + ';"/>\n'
                    }
                    r += "</" + s.type + ">\n";
                    break;
                case "pattern":
                    r += "";
                    break;
                case "filter":
                    r += "<filter", r = n(r, s), r += ">\n", s = s.filter;
                    for (u = 0; u < s.length; u++) o = s[u], r += "	<fe" + o.type, r = n(r, o), r += "/>\n";
                    r += "</filter>\n";
                    break;
                case "clipPath":
                    r += "<clipPath", r = n(r, s), r += ">\n", s = s.d;
                    for (u = 0; u < s.length; u++) o = s[u], r += "	<" + o.type, r = n(r, o), r += "/>\n";
                    r += "</clipPath>\n"
            }
        }
        var c = function(e, i) {
            if (e && e.length) for (var s = 0, o = e.length; s < o; s++) {
                var u = e[s];
                switch (u.type) {
                    case "G":
                        t += i + "<g", t = n(t, u), t += ">\n", c(u.childNodes, i + "	"), t += i + "</g>\n";
                        break;
                    case "rect":
                        t += i + "<rect", t = n(t, u), t += "></rect>\n";
                        break;
                    case "circle":
                        t += i + "<circle", t = n(t, u), t += "></circle>\n";
                        break;
                    case "ellipse":
                        t += i + "<ellipse", t = n(t, u), t += "></ellipse>\n";
                        break;
                    case "line":
                        t += i + "<line", t = n(t, u), t += "></line>\n";
                        break;
                    case "path":
                        t += i + "<path", t = n(t, u), t += "></path>\n";
                        break;
                    case "text":
                        t += i + "<text", t = n(t, u), t += ">";
                        for (var u = u.childNodes, a = 0, f = u.length; a < f; a++) t += "<tspan", t = n(t, u[a]), t += ">" + u[a].content + "</tspan>";
                        t += "</text>\n";
                        break;
                    case "image":
                        t += i + "<image", t = n(t, u), t += "></image>\n";
                        break;
                    case "svg":
                        t += '<?xml version="1.0" encoding="utf-8"?>\n', t += "<!-- Generator: Sketch.js 1.0 (http://sketchpad.io/) -->\n", t += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"', t = n(t, u), t += ">\n", r && (t += "<defs>" + r + "</defs>"), c(u.childNodes, i + "	"), t += "</svg>";
                        break;
                    default:
                        c(u.childNodes, i + "	")
                }
            }
        };
        return c([this.vob], ""), t
    }
}();
if (typeof Vector == "undefined") var Vector = {};
var entityRe = RegExp("&(quot|apos|lt|gt|amp|#x[^;]+|#d+);", "g"),
    decodeEntitySequence = function(e) {
        if (!e.match(entityRe)) return e;
        for (var t = {
            amp: "&",
            apos: "'",
            quot: '"',
            lt: "<",
            gt: ">"
        }, n, r = "";
        (n = entityRe.exec(e)) !== null;) r += n[1].charAt(1) === "x" ? String.fromCharCode(n[1].slice(2), 16) : isNaN(parseInt(n[1].slice(1), 10)) ? t(n[1]) : String.fromCharCode(n[1].slice(1));
        return r
    };
Vector.Typeface = function(e) {
    var t = 1,
        n = {}, r = "",
        i = {}, s = ["	", "\n", "", "\f", "\r"],
        o = {
            direction: "ltr",
            fontFamily: "sans-serif",
            fontSize: "40px",
            fontStyle: "normal",
            fontWeight: "normal",
            fontVariant: "normal",
            textAlign: "start",
            textBaseline: "alphabetic",
            lineHeight: "1em",
            packages: {}
        };
    o.ctx = e, o.load = function(e) {
        var t = document.createElement("div");
        typeof e == "string" ? t.innerHTML = e : t.appendChild(e);
        var n = null,
            r = t.getElementsByTagName("font")[0],
            i = t.getElementsByTagName("font-face")[0],
            e = i.getAttribute("font-family"),
            s = (n = i.getElementsByTagName("font-face-name")[0]) ? n.getAttribute("name") : e,
            o = i.getAttribute("font-style") || "all",
            u = i.getAttribute("font-variant") || "normal",
            a = i.getAttribute("font-weight") || "all",
            f = i.getAttribute("font-stretch") || "normal",
            l = i.getAttribute("unicode-range") || "U+0-10FFFF",
            c = i.getAttribute("panose-1") || "0 0 0 0 0 0 0 0 0 0",
            h = i.getAttribute("cap-height") || 0,
            p = i.getAttribute("x-height") || 0,
            d = parseFloat(i.getAttribute("units-per-em") || 1e3, 10),
            n = t.getElementsByTagName("missing-glyph")[0],
            v = {
                x: parseFloat(r.getAttribute("horiz-adv-x"), 10),
                y: parseFloat(r.getAttribute("vert-adv-y") || 0, 10) || d
            };
        parseFloat(n ? n.getAttribute("horiz-adv-x") : v.x, 10);
        var r = {
            horiz: {
                x: parseFloat(r.getAttribute("horiz-origin-x") || 0, 10),
                y: parseFloat(r.getAttribute("horiz-origin-y") || 0, 10)
            },
            vert: {
                x: parseFloat(r.getAttribute("vert-origin-x") || 0, 10),
                y: parseFloat(r.getAttribute("vert-origin-y") || 0, 10)
            }
        }, m = parseFloat(i.getAttribute("ascent") || d - r.vert.y, 10),
            g = parseFloat(i.getAttribute("descent") || r.vert.y, 10),
            y = {}, b = ["alphabetic", "ideographic", "mathematical", "hanging"],
            w;
        for (w in b)(n = i.getAttribute(w = b[w])) && (y[w] = parseFloat(n, 10));
        i = {}, t = t.getElementsByTagName("glyph");
        for (w in t)(n = t[w]).getAttribute && (b = n.getAttribute("unicode"), b.match(entityRe) && (b = decodeEntitySequence(b)), b = b.charCodeAt(), i[b] = {
            name: n.getAttribute("glyph-name"),
            xadv: parseFloat(n.getAttribute("horiz-adv-x") || v.x, 10),
            path: n.getAttribute("d")
        });
        return {
            family: e,
            name: s,
            style: o,
            variant: u,
            weight: a,
            stretch: f,
            range: l,
            panose: c.split(" ").map(parseFloat),
            capHeight: h,
            unitsPerEm: d,
            origin: r,
            advance: v,
            ascent: m,
            descent: g,
            xheight: p,
            baseline: y,
            glyphs: i
        }
    }, o.measureText = function(e) {
        if (e) {
            for (var e = "" + e, r = n.glyphs, i = 0, s = e.length, o = 0; i < s; i++) {
                var u = r[e.charCodeAt(i)];
                o += u ? u.xadv : 0
            }
            return {
                width: o * t
            }
        }
    }, o.strokeText = function(e, t, n, r) {
        e && t && n && (this.drawText(e, t, n, r), o.ctx.stroke(), o.ctx.beginPath())
    }, o.fillText = function(e, t, n, r) {
        e && t && n && (this.drawText(e, t, n, r), o.ctx.fill(), o.ctx.beginPath())
    }, o.drawText = function(e, r, u, a) {
        var l = o.ctx;
        if (e.length) {
            for (var c = 0; c < s.length; c++) e = e.split(s[c]).join(" ");
            var p = o.fontSize.toLowerCase(),
                d = p.replace(c = parseFloat(p), "");
            d.length > 2 ? c = ScreenMetrics[p + "_px"] : d !== "px" && (c = ScreenMetrics[d + "_px"] * (isNaN(c) ? 1 : c)), isNaN(c) || (t = c / n.unitsPerEm), c = r || 0, u = u || 0;
            switch (this.textAlign) {
                case "start":
                    c -= this.direction === "ltr" ? 0 : this.measureText(e).width;
                    break;
                case "end":
                    c -= this.direction === "ltr" ? this.measureText(e).width : 0;
                    break;
                case "right":
                    c -= this.measureText(e).width;
                    break;
                case "center":
                    c -= this.measureText(e).width / 2
            }
            switch (this.textBaseline) {
                case "top":
                    u += n.ascent * t;
                    break;
                case "hanging":
                    u += n.ascent * 8 / 10 * t;
                    break;
                case "middle":
                    u += n.xheight / 2 * t;
                    break;
                case "ideographic":
                    u += n.descent * t;
                    break;
                case "bottom":
                    u += n.descent * t
            }
            l.save(), l.beginPath(), r = this.measureText(e).width, a && r > a && (l.scale(a / r, 1), c = c * r / a), (c || u) && l.translate(c, u), l.scale(t, - t);
            var a = n.glyphs,
                v;
            typeof e == "number" && (e = "" + e), r = 0;
            for (p = e.length; r < p; r++) if ((u = a[d = e.charCodeAt(r)]) && d !== 10 && d !== 13) {
                d in i || d in a || (d = "?".charCodeAt()), d in i || (i[d] = Vector.SVGPath.toVOBPath(u.path));
                for (var c = 0, d = i[d] || "", m = d.length; c < m; c++) switch ((v = d[c]).cmd) {
                    case "M":
                        l.moveTo(v.x, v.y);
                        break;
                    case "L":
                        l.lineTo(v.x, v.y);
                        break;
                    case "Q":
                        l.quadraticCurveTo(v.x1, v.y1, v.x, v.y);
                        break;
                    case "C":
                        l.bezierCurveTo(v.x1, v.y1, v.x2, v.y2, v.x, v.y);
                        break;
                    case "A":
                        l.arcTo(v.x1, v.y1, v.x2, v.y2, v.radius);
                        break;
                    case "Z":
                        l.closePath()
                }
                l.translate(u.xadv, 0)
            }
            l.closePath(), l.restore()
        }
    };
    var u = {
        normal: 400,
        bold: 700,
        lighter: 300,
        bolder: 500
    };
    return o.setFont = function(e) {
        if (r !== e) {
            for (var t = e.trim().split(" "), n = t.length, i = 0, s = 0, a = Math.min(3, n); i < a;) {
                var f = t[i];
                if ((s & 1) === 0 && " normal italic oblique ".indexOf(" " + f + " ") !== -1) o.fontStyle = t[i++], s |= 1;
                else if ((s & 2) === 0 && " normal small-caps ".indexOf(" " + f + " ") !== -1) o.fontVariant = t[i++], s |= 2;
                else {
                    if ((s & 4) !== 0 || !(" normal bold bolder lighter ".indexOf(" " + f + " ") !== -1 || f.length === 3 && f.charAt(0) >= "1" && f.charAt(0) <= "9" && f.charAt(1) === "0" && f.charAt(2) === "0")) break;
                    o.fontWeight = u[t[i++]], s |= 4
                }
            }
            i < n && (s = t[i], a = s.indexOf("/"), a === -1 ? i++ : (s = s.substring(0, a), t[i] = t[i].substring(a)), o.fontSize = s), i < n && t[i].substr(0, 1) === "/" && (t[i] !== "/" ? o.lineHeight = t[i++].substring(1) : ++i < n && (o.lineHeight = t[i++]));
            if (i < n) {
                for (s = t[i++]; i < n;) s += " " + t[i++];
                o.fontFamily = s, o.loadFont(s)
            }
            r = e
        }
    }, o.loadFont = function(e) {
        if (typeof e == "string") var t = e,
            e = Vector.fonts[t];
        else t = e.family;
        n.family !== t && (e ? n = o.packages[t] = e : t in o.packages && (n = o.packages[t]))
    }, Vector.font && (o.loadFont(Vector.font), o.fontFamily = Vector.name), o
}, typeof Vector == "undefined" && (Vector = {}), Vector = function(e) {
    return e.fonts = {}, e.fonts["Liberation Sans"] = {
        family: "Liberation Sans",
        name: "Liberation Sans",
        style: "all",
        variant: "normal",
        weight: "all",
        stretch: "normal",
        range: "U+0-10FFFF",
        panose: [2, 11, 6, 4, 2, 2, 2, 2, 2, 4],
        capHeight: null,
        unitsPerEm: 1948,
        origin: {
            horiz: {
                x: 0,
                y: 0
            },
            vert: {
                x: 0,
                y: 0
            }
        },
        advance: {
            x: 1206,
            y: 2048
        },
        ascent: 1854,
        descent: -434,
        baseline: {
            alphabetic: 0
        },
        glyphs: {
            32: {
                name: "space",
                xadv: 569,
                path: null
            },
            33: {
                name: "exclam",
                xadv: 569,
                path: "M359 397H211L187 1409H383L359 397ZM185 0V201H379V0H185Z"
            },
            34: {
                name: "quotedbl",
                xadv: 727,
                path: "M618 966H476L456 1409H640L618 966ZM249 966H108L87 1409H271L249 966Z"
            },
            35: {
                name: "numbersign",
                xadv: 1139,
                path: "M896 885L818 516H1078V408H795L707 0H597L683 408H320L236 0H126L210 408H9V516H234L312 885H60V993H334L423 1401H533L445 993H808L896 1401H1006L918 993H1129V885H896ZM425 885L345 516H707L785\n885H425Z"
            },
            36: {
                name: "dollar",
                xadv: 1139,
                path: "M518 20Q301 29 179 121T22 379L192 416Q203 363 226 320T288 244T383 193T518 168V664L498 669Q421 687 347 712T215 778T122 884T86 1046Q86 1130 118 1192T207 1295T344 1359T518 1385V1516H642V1385Q742\n1380 814 1358T938 1295T1022 1198T1075 1065L901 1032Q881 1126 820 1178T642 1242V797Q701 783 758 768T866 733T962 684T1038 617T1088 523T1106 396Q1106 319 1078 254T993 138T849 57T642 20V-142H518V20ZM934 394Q934 457 911 497T847 562T753 604T642 635V167Q707\n171 761 186T853 230T913 298T934 394ZM258 1048Q258 994 278 957T333 895T415 854T518 823V1244Q446 1240 396 1224T316 1181T272 1121T258 1048Z"
            },
            37: {
                name: "percent",
                xadv: 1821,
                path: "M1748 434Q1748 309 1723 224T1654 86T1552 11T1428 -12Q1362 -12 1305 10T1205 85T1138 222T1113 434Q1113 567 1137 654T1204 792T1305 864T1432 885Q1498 885 1555 865T1655 793T1723 654T1748\n434ZM527 0H372L1294 1409H1451L527 0ZM394 1421Q458 1421 515 1401T615 1329T682 1192T707 975Q707 849 682 763T615 624T514 547T390 524Q323 524 265 547T165 623T98 762T73 975Q73 1106 97 1192T165 1329T267 1400T394 1421ZM1600 434Q1600 533 1589 598T1557\n703T1504 758T1432 774Q1390 774 1358 758T1304 702T1271 598T1260 434Q1260 339 1271 275T1304 172T1357 115T1430 98Q1469 98 1500 115T1554 171T1588 275T1600 434ZM560 975Q560 1073 549 1138T517 1242T465 1297T394 1313Q351 1313 319 1297T264 1241T231 1137T220\n975Q220 880 231 815T264 711T318 654T392 637Q430 637 461 654T514 710T548 815T560 975Z"
            },
            38: {
                name: "ampersand",
                xadv: 1366,
                path: "M1193 -12Q1097 -12 1025 21T895 115Q865 89 827 65T743 22T642 -8T523 -20Q406 -20 321 10T180 92T99 216T72 371Q72 450 97 514T168 631T277 725T415 800Q397 834 383 872T357 950T340\n1028T334 1102Q334 1168 354 1225T416 1325T525 1392T685 1417Q758 1417 819 1398T926 1343T996 1254T1021 1133Q1021 1058 988 1000T899 895T769 812T612 741Q674 627 747 527T905 329Q966 419 1006 518T1076 739L1221 696Q1186 557 1133 444T1009 227Q1062 173\n1115 151T1217 129Q1249 129 1278 132T1334 145V10Q1306 -1 1269 -6T1193 -12ZM869 1133Q869 1170 856 1200T818 1251T760 1284T683 1296Q587 1296 537 1245T487 1102Q487 1043 505 979T552 858Q617 884 675 911T776 971T844 1043T869 1133ZM795 217Q706 322 624\n437T476 674Q363 626 302 552T240 373Q240 318 257 271T311 188T401 132T529 111Q573 111 612 120T686 145T747 179T795 217Z"
            },
            39: {
                name: "quotesingle",
                xadv: 391,
                path: "M266 966H125L104 1409H288L266 966Z"
            },
            40: {
                name: "parenleft",
                xadv: 682,
                path: "M127 532Q127 671 148 798T214 1042T329 1269T496 1484H670Q576 1379 508 1269T395 1041T330 796T308 530Q308 391 329 264T395 19T507 -209T670 -424H496Q399 -319 329 -209T214 18T148 261T127\n528V532Z"
            },
            41: {
                name: "parenright",
                xadv: 682,
                path: "M555 528Q555 388 534 262T468 18T353 -209T186 -424H12Q106 -319 174 -209T287 19T352 264T374 530Q374 669 353 796T287 1040T175 1268T12 1484H186Q283 1379 353 1269T468 1042T534 798T555 532V528Z"
            },
            42: {
                name: "asterisk",
                xadv: 797,
                path: "M456 1114L720 1217L765 1085L483 1012L668 762L549 690L399 948L243 692L124 764L313 1012L33 1085L78 1219L345 1112L333 1409H469L456 1114Z"
            },
            43: {
                name: "plus",
                xadv: 1196,
                path: "M671 608V180H524V608H100V754H524V1182H671V754H1095V608H671Z"
            },
            44: {
                name: "comma",
                xadv: 569,
                path: "M385 219V51Q385 -2 381 -45T366 -126T342 -197T307 -262H184Q229 -197 253 -131T278 0H190V219H385Z"
            },
            45: {
                name: "hyphen",
                xadv: 682,
                path: "M91 464V624H591V464H91Z"
            },
            46: {
                name: "period",
                xadv: 569,
                path: "M187 0V219H382V0H187Z"
            },
            47: {
                name: "slash",
                xadv: 569,
                path: "M0 -20L411 1484H569L162 -20H0Z"
            },
            48: {
                name: "zero",
                xadv: 1139,
                path: "M1059 705Q1059 502 1021 364T916 140T759 17T567 -20Q464 -20 375 17T221 139T118 362T80 705Q80 918 117 1057T221 1280T377 1396T573 1430Q674 1430 762 1397T917 1280T1021 1058T1059 705ZM876\n705Q876 873 856 984T797 1162T702 1256T573 1284Q497 1284 439 1256T342 1162T282 984T262 705Q262 543 282 432T342 254T439 157T569 127Q640 127 697 156T793 253T854 432T876 705Z"
            },
            49: {
                name: "one",
                xadv: 1139,
                path: "M156 0V153H515V1237L197 1010V1180L530 1409H696V153H1039V0H156Z"
            },
            50: {
                name: "two",
                xadv: 1139,
                path: "M103 0V127Q154 244 227 333T382 495T542 630T686 754T789 884T829 1038Q829 1098 811 1143T759 1220T678 1266T572 1282Q518 1282 471 1267T386 1222T326 1148T295 1044L111 1061Q120 1137 153 1204T244\n1321T383 1401T572 1430Q677 1430 759 1405T897 1331T984 1210T1014 1044Q1014 973 989 909T921 787T822 675T705 570T582 468T466 366T368 263T301 153H1036V0H103Z"
            },
            51: {
                name: "three",
                xadv: 1139,
                path: "M1049 389Q1049 292 1018 216T926 88T776 8T571 -20Q440 -20 351 12T203 98T116 220T78 362L264 379Q272 323 293 277T352 198T443 147T571 129Q707 129 784 196T862 395Q862 473 828 520T742 594T630\n630T518 639H416V795H514Q565 795 620 805T720 843T795 918T825 1038Q825 1151 759 1216T561 1282Q442 1282 369 1221T283 1049L102 1063Q113 1156 153 1225T254 1339T395 1407T563 1430Q681 1430 766 1401T905 1321T984 1202T1010 1057Q1010 995 993 941T940 844T849\n770T715 723V719Q800 710 863 681T967 607T1028 507T1049 389Z"
            },
            52: {
                name: "four",
                xadv: 1139,
                path: "M881 319V0H711V319H47V459L692 1409H881V461H1079V319H881ZM711 1206Q709 1201 701 1187T683 1154T663 1118T644 1087L283 555Q278 547 269 534T249 508T229 481T213 461H711V1206Z"
            },
            53: {
                name: "five",
                xadv: 1139,
                path: "M1053 459Q1053 353 1021 265T926 114T770 15T553 -20Q442 -20 360 6T220 77T130 184T82 315L264 336Q275 296 295 259T349 192T434 145T557 127Q627 127 684 148T781 212T844 315T866 455Q866 520\n845 574T785 668T690 730T561 752Q516 752 478 744T408 722T349 690T299 651H123L170 1409H971V1256H334L307 809Q355 846 427 872T598 899Q703 899 787 867T930 777T1021 637T1053 459Z"
            },
            54: {
                name: "six",
                xadv: 1139,
                path: "M1049 461Q1049 355 1020 267T933 115T790 16T594 -20Q471 -20 379 27T226 162T135 379T104 672Q104 860 138 1002T238 1239T396 1382T608 1430Q680 1430 743 1415T857 1367T948 1278T1010 1143L838\n1112Q810 1203 749 1243T606 1284Q532 1284 472 1249T370 1145T306 970T283 725Q332 816 421 863T625 911Q721 911 799 880T932 791T1018 649T1049 461ZM866 453Q866 526 848 585T794 685T705 749T582 772Q533 772 483 758T393 711T327 625T301 496Q301 418 321\n351T378 233T469 154T588 125Q653 125 704 147T792 212T847 316T866 453Z"
            },
            55: {
                name: "seven",
                xadv: 1139,
                path: "M1036 1263Q930 1101 841 952T688 651T589 340T553 0H365Q365 169 405 331T513 650T671 958T862 1256H105V1409H1036V1263Z"
            },
            56: {
                name: "eight",
                xadv: 1139,
                path: "M1050 393Q1050 303 1022 228T935 97T785 11T570 -20Q446 -20 356 11T206 96T118 226T89 391Q89 468 112 528T175 631T265 701T370 737V741Q311 755 265 786T187 860T139 957T122 1069Q122 1143 150\n1208T235 1323T374 1401T566 1430Q681 1430 765 1401T905 1323T988 1207T1015 1067Q1015 1009 999 956T951 860T873 786T765 743V739Q826 729 878 703T968 633T1028 529T1050 393ZM828 1057Q828 1110 815 1154T770 1229T689 1278T566 1296Q495 1296 446 1279T366\n1230T320 1154T306 1057Q306 1015 317 971T357 891T437 832T568 809Q653 809 704 832T783 891T819 971T828 1057ZM863 410Q863 461 849 508T801 592T710 651T566 674Q487 674 432 652T342 592T291 507T275 406Q275 341 291 288T342 196T434 136T572 115Q654 115\n710 136T800 195T848 288T863 410Z"
            },
            57: {
                name: "nine",
                xadv: 1139,
                path: "M1042 733Q1042 545 1007 404T905 168T745 27T532 -20Q451 -20 386 -4T270 48T183 139T125 274L297 301Q325 210 384 168T535 125Q608 125 668 159T771 263T838 436T864 680Q843 633 807 596T724 534T623\n495T514 481Q418 481 341 515T209 612T126 761T96 956Q96 1065 127 1153T219 1302T366 1397T565 1430Q800 1430 921 1256T1042 733ZM846 907Q846 985 828 1054T773 1174T683 1254T559 1284Q494 1284 442 1261T354 1196T299 1092T279 956Q279 885 296 824T349 719T436\n649T557 623Q607 623 658 640T751 692T819 780T846 907Z"
            },
            58: {
                name: "colon",
                xadv: 569,
                path: "M187 875V1082H382V875H187ZM187 0V207H382V0H187Z"
            },
            59: {
                name: "semicolon",
                xadv: 569,
                path: "M385 207V51Q385 -2 381 -45T366 -126T342 -197T307 -262H184Q229 -197 253 -131T278 0H190V207H385ZM190 875V1082H385V875H190Z"
            },
            60: {
                name: "less",
                xadv: 1196,
                path: "M101 571V776L1096 1194V1040L238 674L1096 307V154L101 571Z"
            },
            61: {
                name: "equal",
                xadv: 1196,
                path: "M100 856V1004H1095V856H100ZM100 344V492H1095V344H100Z"
            },
            62: {
                name: "greater",
                xadv: 1196,
                path: "M101 154V307L959 674L101 1040V1194L1096 776V571L101 154Z"
            },
            63: {
                name: "question",
                xadv: 1139,
                path: "M1063 1032Q1063 961 1045 907T995 811T925 735T844 671T764 612T693 549T642 474T621 377H446Q448 446 467 498T518 590T588 661T667 721T745 778T814 842T862 921T881 1024Q881 1083 860 1129T801\n1206T708 1254T586 1270Q446 1270 364 1200T268 1008L84 1020Q95 1104 128 1178T222 1309T372 1397T584 1430Q698 1430 787 1402T937 1323T1031 1197T1063 1032ZM438 0V201H633V0H438Z"
            },
            64: {
                name: "at",
                xadv: 2079,
                path: "M1902 755Q1902 611 1869 492T1776 286T1635 152T1455 104Q1399 104 1360 117T1295 154T1259 210T1248 280Q1248 295 1249 316T1251 350H1245Q1221 305 1187 261T1106 182T1001 126T871 104Q787 104\n725 133T622 213T561 335T541 489Q541 609 576 719T678 914T836 1050T1043 1101Q1103 1101 1151 1088T1235 1050T1299 993T1344 919H1350L1389 1079H1545L1429 573Q1410 489 1401 429T1392 320Q1392 272 1413 249T1473 226Q1535 226 1588 266T1681 378T1743 545T1766\n753Q1766 882 1725 993T1603 1185T1403 1312T1128 1358Q994 1358 881 1326T675 1236T514 1098T397 921T326 716T302 491Q302 350 345 231T470 27T674 -107T954 -155Q1059 -155 1150 -139T1317 -98T1453 -46T1557 7L1612 -105Q1562 -135 1495 -166T1344 -224T1163\n-266T954 -283Q764 -283 617 -226T368 -65T214 180T161 491Q161 630 192 758T283 996T427 1196T619 1350T854 1449T1126 1484Q1327 1484 1473 1425T1714 1266T1856 1034T1902 755ZM1296 747Q1296 797 1279 839T1231 911T1155 957T1054 974Q968 974 903 932T795\n820T729 665T706 491Q706 371 753 303T900 235Q969 235 1029 266T1137 348T1220 465T1273 602Q1282 638 1289 678T1296 747Z"
            },
            65: {
                name: "A",
                xadv: 1366,
                path: "M1167 0L1006 412H364L202 0H4L579 1409H796L1362 0H1167ZM768 1026Q752 1066 738 1107T712 1181T694 1237T685 1265Q683 1260 676 1237T658 1180T632 1105T602 1024L422 561H949L768 1026Z"
            },
            66: {
                name: "B",
                xadv: 1366,
                path: "M1258 397Q1258 290 1216 215T1103 92T938 22T740 0H168V1409H680Q797 1409 889 1390T1045 1328T1142 1222T1176 1067Q1176 1008 1160 956T1110 862T1026 789T908 743Q993 733 1058 704T1168 630T1235\n526T1258 397ZM984 1044Q984 1158 906 1207T680 1256H359V810H680Q764 810 822 826T916 873T968 947T984 1044ZM1065 412Q1065 479 1041 526T970 603T860 647T715 661H359V153H730Q803 153 864 165T970 207T1040 287T1065 412Z"
            },
            67: {
                name: "C",
                xadv: 1479,
                path: "M792 1274Q672 1274 580 1234T425 1120T330 942T298 711Q298 584 332 479T431 297T589 179T800 137Q882 137 949 158T1071 219T1169 311T1245 430L1401 352Q1363 273 1307 205T1176 87T1005 9T791 -20Q620\n-20 492 34T277 186T147 418T104 711Q104 876 149 1009T282 1235T498 1379T790 1430Q1015 1430 1166 1342T1388 1081L1207 1021Q1187 1071 1153 1116T1068 1197T949 1253T792 1274Z"
            },
            68: {
                name: "D",
                xadv: 1479,
                path: "M1381 719Q1381 543 1328 409T1183 184T966 47T695 0H168V1409H634Q797 1409 934 1369T1171 1244T1325 1029T1381 719ZM1189 719Q1189 862 1148 963T1033 1130T856 1225T630 1256H359V153H673Q784 153\n878 189T1042 296T1150 473T1189 719Z"
            },
            69: {
                name: "E",
                xadv: 1366,
                path: "M168 0V1409H1237V1253H359V801H1177V647H359V156H1278V0H168Z"
            },
            70: {
                name: "F",
                xadv: 1251,
                path: "M359 1253V729H1145V571H359V0H168V1409H1169V1253H359Z"
            },
            71: {
                name: "G",
                xadv: 1593,
                path: "M103 711Q103 876 147 1009T280 1235T500 1379T804 1430Q934 1430 1032 1407T1202 1341T1324 1237T1409 1098L1227 1044Q1201 1096 1165 1138T1076 1211T956 1257T799 1274Q671 1274 577 1234T420 1120T328\n942T297 711Q297 584 330 479T428 297T589 178T813 135Q896 135 966 149T1092 185T1192 235T1264 291V545H843V705H1440V219Q1393 171 1330 128T1187 51T1014 -1T813 -20Q635 -20 502 34T281 186T148 418T103 711Z"
            },
            72: {
                name: "H",
                xadv: 1479,
                path: "M1121 0V653H359V0H168V1409H359V813H1121V1409H1312V0H1121Z"
            },
            73: {
                name: "I",
                xadv: 569,
                path: "M189 0V1409H380V0H189Z"
            },
            74: {
                name: "J",
                xadv: 1024,
                path: "M457 -20Q286 -20 177 69T32 350L219 381Q229 316 252 270T307 193T378 149T458 135Q562 135 622 206T682 416V1253H411V1409H872V420Q872 319 844 238T763 100T632 11T457 -20Z"
            },
            75: {
                name: "K",
                xadv: 1366,
                path: "M1106 0L543 680L359 540V0H168V1409H359V703L1038 1409H1263L663 797L1343 0H1106Z"
            },
            76: {
                name: "L",
                xadv: 1139,
                path: "M168 0V1409H359V156H1071V0H168Z"
            },
            77: {
                name: "M",
                xadv: 1706,
                path: "M1366 0V940Q1366 991 1367 1044T1370 1141Q1372 1192 1375 1240Q1361 1189 1346 1139Q1333 1096 1318 1048T1287 960L923 0H789L420 960Q414 975 408 995T394 1037T379 1083T364 1130Q347 1183 331 1240Q332\n1184 334 1129Q336 1082 337 1031T338 940V0H168V1409H419L794 432Q801 412 811 381T830 316T846 254T857 208Q860 224 868 254T886 317T907 381T925 432L1293 1409H1538V0H1366Z"
            },
            78: {
                name: "N",
                xadv: 1479,
                path: "M1082 0L328 1200Q330 1151 333 1103Q335 1062 336 1017T338 936V0H168V1409H390L1152 201Q1152 201 1146 299Q1144 341 1142 390T1140 485V1409H1312V0H1082Z"
            },
            79: {
                name: "O",
                xadv: 1593,
                path: "M1495 711Q1495 546 1448 411T1310 180T1090 32T795 -20Q621 -20 490 34T272 186T141 418T97 711Q97 876 143 1009T278 1235T497 1379T797 1430Q965 1430 1095 1379T1314 1234T1449 1007T1495 711ZM1300\n711Q1300 838 1268 942T1172 1120T1014 1234T797 1274Q671 1274 576 1234T418 1120T323 942T291 711Q291 584 323 479T419 297T577 178T795 135Q927 135 1022 178T1179 297T1270 480T1300 711Z"
            },
            80: {
                name: "P",
                xadv: 1366,
                path: "M1258 985Q1258 893 1228 814T1137 676T985 583T773 549H359V0H168V1409H761Q886 1409 979 1379T1134 1293T1227 1159T1258 985ZM1066 983Q1066 1117 984 1186T738 1256H359V700H746Q911 700 988 773T1066 983Z"
            },
            81: {
                name: "Q",
                xadv: 1593,
                path: "M1495 711Q1495 562 1457 439T1346 222T1168 71T928 -6Q949 -70 975 -115T1036 -188T1111 -230T1204 -244Q1232 -244 1264 -240T1319 -231V-365Q1281 -374 1236 -380T1141 -387Q1055 -387 991 -362T879\n-289T795 -172T733 -16Q575 -8 456 49T257 203T137 429T97 711Q97 876 143 1009T278 1235T497 1379T797 1430Q965 1430 1095 1379T1314 1234T1449 1007T1495 711ZM1300 711Q1300 838 1268 942T1172 1120T1014 1234T797 1274Q671 1274 576 1234T418 1120T323 942T291\n711Q291 584 323 479T419 297T577 178T795 135Q927 135 1022 178T1179 297T1270 480T1300 711Z"
            },
            82: {
                name: "R",
                xadv: 1479,
                path: "M1164 0L798 585H359V0H168V1409H831Q951 1409 1043 1382T1199 1302T1295 1175T1328 1006Q1328 939 1309 874T1247 755T1140 662T984 607L1384 0H1164ZM1136 1004Q1136 1068 1114 1115T1050 1193T948\n1240T812 1256H359V736H820Q902 736 962 756T1060 813T1117 898T1136 1004Z"
            },
            83: {
                name: "S",
                xadv: 1366,
                path: "M1272 389Q1272 300 1238 225T1131 96T950 11T690 -20Q427 -20 280 72T93 338L278 375Q292 320 321 275T399 198T522 147T697 129Q782 129 853 143T975 188T1054 265T1083 379Q1083 448 1052 491T963\n562T827 609T652 650Q593 663 534 678T420 715T317 766T234 835T179 929T159 1053Q159 1153 199 1224T312 1342T482 1409T694 1430Q825 1430 918 1410T1075 1348T1177 1247T1239 1106L1051 1073Q1037 1124 1011 1164T941 1231T837 1272T692 1286Q594 1286 528 1269T421\n1221T363 1151T345 1063Q345 1000 376 960T462 892T587 847T738 811Q803 796 867 781T991 744T1101 693T1191 622T1250 523T1272 389Z"
            },
            84: {
                name: "T",
                xadv: 1251,
                path: "M720 1253V0H530V1253H46V1409H1204V1253H720Z"
            },
            85: {
                name: "U",
                xadv: 1479,
                path: "M731 -20Q615 -20 511 11T329 107T204 273T158 512V1409H349V528Q349 421 377 347T457 225T577 157T730 135Q812 135 885 157T1013 227T1099 352T1131 541V1409H1321V530Q1321 389 1275 286T1148 114T961\n13T731 -20Z"
            },
            86: {
                name: "V",
                xadv: 1366,
                path: "M782 0H584L9 1409H210L600 417Q615 372 630 328T657 248Q671 207 684 168Q696 205 710 246Q722 281 736 325T768 417L1156 1409H1357L782 0Z"
            },
            87: {
                name: "W",
                xadv: 1933,
                path: "M1511 0H1283L1039 895Q1028 933 1016 985T993 1084Q981 1139 969 1196Q956 1138 944 1083Q933 1035 921 984T898 895L652 0H424L9 1409H208L461 514Q478 451 493 389T520 278Q533 220 544 168Q559 237\n575 304Q582 332 589 363T603 424T618 481T632 532L877 1409H1060L1305 532Q1311 509 1318 482T1333 425T1348 364T1362 305Q1378 238 1393 168Q1394 168 1402 202T1422 289T1448 401T1478 514L1727 1409H1926L1511 0Z"
            },
            88: {
                name: "X",
                xadv: 1366,
                path: "M1112 0L689 616L257 0H46L582 732L87 1409H298L690 856L1071 1409H1282L800 739L1323 0H1112Z"
            },
            89: {
                name: "Y",
                xadv: 1366,
                path: "M777 584V0H587V584L45 1409H255L684 738L1111 1409H1321L777 584Z"
            },
            90: {
                name: "Z",
                xadv: 1251,
                path: "M1187 0H65V143L923 1253H138V1409H1140V1270L282 156H1187V0Z"
            },
            91: {
                name: "bracketleft",
                xadv: 569,
                path: "M146 -425V1484H553V1355H320V-296H553V-425H146Z"
            },
            92: {
                name: "backslash",
                xadv: 569,
                path: "M407 -20L0 1484H158L569 -20H407Z"
            },
            93: {
                name: "bracketright",
                xadv: 569,
                path: "M16 -425V-296H249V1355H16V1484H423V-425H16Z"
            },
            94: {
                name: "asciicircum",
                xadv: 961,
                path: "M787 673L478 1306L172 673H10L378 1409H581L951 673H787Z"
            },
            95: {
                name: "underscore",
                xadv: 1139,
                path: "M-31 -407V-277H1162V-407H-31Z"
            },
            96: {
                name: "grave",
                xadv: 682,
                path: "M436 1201L106 1479V1508H313L530 1221V1201H436Z"
            },
            97: {
                name: "a",
                xadv: 1139,
                path: "M414 -20Q251 -20 169 66T87 302Q87 409 127 477T233 585T383 639T554 656L797 660V719Q797 786 783 833T740 909T668 951T565 965Q513 965 471 958T398 931T348 878T323 793L135 810Q145 874 173 927T252\n1020T381 1080T569 1102Q773 1102 876 1009T979 738V272Q979 192 1000 152T1080 111Q1095 111 1110 113T1139 118V6Q1105 -2 1072 -6T1000 -10Q949 -10 913 3T853 44T818 112T803 207H797Q768 155 734 113T653 42T549 -4T414 -20ZM455 115Q541 115 605 146T712\n227T776 334T797 445V534L600 530Q534 529 475 521T370 487T299 417T272 299Q272 211 319 163T455 115Z"
            },
            98: {
                name: "b",
                xadv: 1139,
                path: "M1053 546Q1053 -20 655 -20Q532 -20 451 24T318 168H316Q316 142 315 114T312 62T309 21T306 0H132Q133 9 134 30T136 82T137 148T138 223V1484H318V1061Q318 1031 318 1004T316 955Q315 930 314 908H318Q368\n1012 450 1057T655 1102Q860 1102 956 964T1053 546ZM864 540Q864 652 850 732T805 863T726 939T609 963Q538 963 484 940T393 866T337 732T318 529Q318 413 337 334T392 206T483 135T607 113Q673 113 721 136T801 210T848 342T864 540Z"
            },
            99: {
                name: "c",
                xadv: 1024,
                path: "M275 546Q275 453 288 375T334 241T418 153T548 122Q644 122 708 174T788 334L970 322Q961 255 931 193T850 84T724 9T553 -20Q426 -20 337 23T193 141T112 319T87 542Q87 651 105 734T155 880T232 985T327\n1053T436 1090T551 1102Q642 1102 713 1077T835 1009T919 906T964 779L779 765Q765 855 708 908T546 961Q469 961 418 936T334 859T289 729T275 546Z"
            },
            100: {
                name: "d",
                xadv: 1139,
                path: "M821 174Q771 70 689 25T484 -20Q279 -20 183 118T86 536Q86 1102 484 1102Q607 1102 689 1057T821 914H823Q823 924 823 945T822 990T821 1035T821 1065V1484H1001V223Q1001 184 1001 148T1003 82T1005\n31T1007 0H835Q833 10 832 28T829 71T826 121T825 174H821ZM275 542Q275 430 289 350T334 219T413 143T530 119Q601 119 655 142T746 216T802 351T821 554Q821 669 802 748T746 877T656 947T532 969Q466 969 418 946T338 872T291 740T275 542Z"
            },
            101: {
                name: "e",
                xadv: 1139,
                path: "M276 503Q276 418 293 347T347 224T441 144T578 115Q695 115 765 162T861 281L1019 236Q1002 191 972 146T890 64T763 4T578 -20Q338 -20 213 123T87 548Q87 700 125 805T229 977T383 1072T571 1102Q707\n1102 798 1058T945 937T1024 754T1048 527V503H276ZM862 641Q847 812 775 890T568 969Q523 969 474 955T382 903T311 803T278 641H862Z"
            },
            102: {
                name: "f",
                xadv: 569,
                path: "M361 951V0H181V951H29V1082H181V1204Q181 1263 192 1313T232 1401T313 1460T445 1482Q477 1482 511 1479T572 1470V1333Q555 1336 533 1338T492 1341Q452 1341 427 1330T387 1299T367 1248T361 1179V1082H572V951H361Z"
            },
            103: {
                name: "g",
                xadv: 1139,
                path: "M548 -425Q455 -425 383 -406T260 -352T177 -267T131 -158L312 -132Q330 -207 391 -247T553 -288Q614 -288 664 -271T749 -217T803 -119T822 27V201H820Q800 160 771 123T699 56T600 10T472 -8Q369 -8\n296 26T176 130T108 301T86 539Q86 669 107 773T177 949T303 1060T492 1099Q607 1099 691 1047T822 897H824Q824 922 825 953T828 1011T832 1059T836 1082H1007Q1006 1073 1005 1052T1003 1000T1002 934T1001 858V31Q1001 -196 890 -310T548 -425ZM822 541Q822\n654 798 734T733 866T642 941T536 965Q467 965 418 941T336 866T288 734T272 541Q272 424 287 345T335 216T416 146T533 125Q587 125 638 148T731 221T797 350T822 541Z"
            },
            104: {
                name: "h",
                xadv: 1139,
                path: "M317 897Q347 952 382 990T459 1054T551 1090T663 1102Q767 1102 833 1074T938 996T991 875T1006 721V0H825V686Q825 755 817 807T784 893T716 945T602 963Q538 963 487 940T399 875T342 773T322 638V0H142V1484H322V1098Q322\n1065 321 1032T319 971T316 924T314 897H317Z"
            },
            105: {
                name: "i",
                xadv: 455,
                path: "M137 1312V1484H317V1312H137ZM137 0V1082H317V0H137Z"
            },
            106: {
                name: "j",
                xadv: 455,
                path: "M137 1312V1484H317V1312H137ZM317 -134Q317 -196 307 -249T269 -341T196 -402T77 -425Q43 -425 11 -423T-50 -416V-277Q-37 -279 -19 -281T12 -283Q50 -283 74 -273T113 -242T132 -187T137 -107V1082H317V-134Z"
            },
            107: {
                name: "k",
                xadv: 1024,
                path: "M816 0L450 494L318 385V0H138V1484H318V557L793 1082H1004L565 617L1027 0H816Z"
            },
            108: {
                name: "l",
                xadv: 455,
                path: "M138 0V1484H318V0H138Z"
            },
            109: {
                name: "m",
                xadv: 1706,
                path: "M768 0V686Q768 765 758 818T725 903T663 949T570 963Q513 963 467 941T389 876T339 771T321 627V0H142V851Q142 885 142 922T140 993T138 1051T136 1082H306Q307 1077 308 1055T310 1005T313 947T314\n897H317Q341 944 369 982T434 1046T520 1087T633 1102Q756 1102 827 1053T927 897H930Q954 944 984 982T1054 1046T1144 1087T1258 1102Q1340 1102 1399 1080T1497 1012T1553 894T1571 721V0H1393V686Q1393 765 1383 818T1350 903T1288 949T1195 963Q1138 963 1092\n942T1014 878T964 773T946 627V0H768Z"
            },
            110: {
                name: "n",
                xadv: 1139,
                path: "M825 0V686Q825 765 814 818T776 903T708 949T602 963Q538 963 487 941T399 876T342 771T322 627V0H142V851Q142 885 142 922T140 993T138 1051T136 1082H306Q307 1077 308 1055T310 1005T313 947T314\n897H317Q343 944 374 982T446 1046T540 1087T663 1102Q753 1102 818 1080T925 1012T986 894T1006 721V0H825Z"
            },
            111: {
                name: "o",
                xadv: 1139,
                path: "M1053 542Q1053 258 928 119T565 -20Q452 -20 363 14T213 118T119 293T86 542Q86 1102 571 1102Q697 1102 788 1067T938 962T1025 787T1053 542ZM864 542Q864 668 845 750T788 881T696 949T574 969Q505\n969 450 949T355 879T296 747T275 542Q275 416 297 334T357 202T448 133T563 113Q632 113 688 132T783 201T843 333T864 542Z"
            },
            112: {
                name: "p",
                xadv: 1139,
                path: "M1053 546Q1053 423 1033 319T967 140T844 23T655 -20Q539 -20 452 24T319 168H314Q315 166 315 150T316 110T317 57T318 -2V-425H138V861Q138 900 138 936T136 1001T134 1052T132 1082H306Q307 1079\n308 1061T311 1018T314 963T316 908H320Q345 960 377 996T450 1056T541 1090T655 1101Q767 1101 843 1061T966 949T1033 774T1053 546ZM864 542Q864 642 852 720T811 852T732 934T609 962Q549 962 496 945T404 880T341 748T318 528Q318 413 337 334T392 205T483\n135T607 113Q682 113 731 142T810 226T852 360T864 542Z"
            },
            113: {
                name: "q",
                xadv: 1139,
                path: "M484 -20Q278 -20 182 119T86 536Q86 818 184 960T484 1102Q551 1102 602 1090T694 1055T765 996T821 914H823Q823 939 824 969T827 1027T831 1073T835 1096H1008Q1006 1079 1004 1007T1001 801V-425H821V14Q821\n40 821 68T823 121Q824 149 825 178H823Q797 127 766 90T693 28T601 -8T484 -20ZM821 554Q821 672 801 752T743 880T652 948T532 969Q463 969 414 944T335 866T290 733T275 542Q275 434 288 354T332 222T411 145T530 119Q590 119 643 137T735 204T798 337T821 554Z"
            },
            114: {
                name: "r",
                xadv: 682,
                path: "M142 0V830Q142 864 142 899T140 968T138 1030T136 1082H306Q307 1059 308 1030T311 969T313 910T314 861H318Q337 923 358 968T409 1043T478 1087T575 1102Q597 1102 617 1099T648 1092V927Q630 932 606\n934T552 937Q490 937 447 909T376 832T335 714T322 564V0H142Z"
            },
            115: {
                name: "s",
                xadv: 1024,
                path: "M950 299Q950 223 921 164T835 64T698 2T511 -20Q417 -20 342 -6T209 41T114 125T57 254L216 285Q239 198 311 158T511 117Q569 117 617 125T701 152T755 204T775 285Q775 334 752 365T688 418T589 454T460\n489Q395 506 331 527T216 582T132 668T100 796Q100 944 205 1021T513 1099Q692 1099 797 1036T931 834L769 814Q760 856 736 884T678 930T602 955T513 963Q391 963 333 926T275 814Q275 770 296 742T356 694T449 660T568 629Q611 618 656 606T743 576T823 535T889\n478T933 401T950 299Z"
            },
            116: {
                name: "t",
                xadv: 569,
                path: "M554 8Q513 -3 471 -9T372 -16Q156 -16 156 229V951H31V1082H163L216 1324H336V1082H536V951H336V268Q336 190 361 159T450 127Q476 127 500 131T554 141V8Z"
            },
            117: {
                name: "u",
                xadv: 1139,
                path: "M314 1082V396Q314 317 325 264T363 179T431 133T537 119Q601 119 652 141T740 206T797 311T817 455V1082H997V231Q997 197 997 160T999 89T1001 31T1003 0H833Q832 5 831 27T829 77T826 135T825 185H822Q796\n138 765 100T693 36T599 -5T476 -20Q386 -20 321 2T214 70T153 188T133 361V1082H314Z"
            },
            118: {
                name: "v",
                xadv: 1024,
                path: "M613 0H400L7 1082H199L437 378Q444 356 453 325T473 259T491 194T506 141Q512 162 521 193T541 258T561 322T580 376L826 1082H1017L613 0Z"
            },
            119: {
                name: "w",
                xadv: 1479,
                path: "M1174 0H965L792 698Q784 725 776 765T759 843Q749 887 740 934Q731 889 721 845Q713 807 704 766T686 694L508 0H300L-3 1082H175L358 347Q365 324 372 291T386 225Q393 188 401 149Q409 187 418 223Q426\n254 434 286T448 339L644 1082H837L1026 339Q1033 313 1041 280T1056 218Q1064 184 1072 149Q1080 187 1088 223Q1095 254 1102 287T1117 347L1308 1082H1484L1174 0Z"
            },
            120: {
                name: "x",
                xadv: 1024,
                path: "M801 0L510 444L217 0H23L408 556L41 1082H240L510 661L778 1082H979L612 558L1002 0H801Z"
            },
            121: {
                name: "y",
                xadv: 1024,
                path: "M604 0Q566 -98 527 -176T438 -310T329 -395T191 -425Q157 -425 128 -423T67 -414V-279Q86 -282 110 -283T151 -285Q230 -285 298 -226T417 -38L434 5L5 1082H197L425 484Q435 457 450 412L482 322Q497\n277 509 241T523 196Q526 207 537 239T563 312T593 393T618 464L830 1082H1020L604 0Z"
            },
            122: {
                name: "z",
                xadv: 1024,
                path: "M49 0V137L710 943H89V1082H913V945L251 139H950V0H49Z"
            },
            123: {
                name: "braceleft",
                xadv: 684,
                path: "M513 -425Q448 -425 399 -405T316 -346T266 -254T249 -132V229Q249 292 235 336T193 408T125 450T34 466V593Q85 595 125 609T192 651T234 723T249 829V1191Q249 1332 315 1408T513 1484H648V1355H585Q494\n1355 456 1302T417 1140V784Q417 734 402 692T361 618T300 564T223 532V530Q266 520 301 498T362 444T402 369T417 276V-81Q417 -187 455 -241T585 -296H648V-425H513Z"
            },
            124: {
                name: "bar",
                xadv: 532,
                path: "M183 -434V1484H349V-434H183Z"
            },
            125: {
                name: "braceright",
                xadv: 684,
                path: "M94 -296Q185 -296 224 -242T264 -81V276Q264 327 278 369T317 443T378 498T457 530V532Q415 542 380 564T319 618T279 692T264 784V1140Q264 1248 225 1301T94 1355H34V1484H166Q297 1484 363\n1408T430 1191V829Q430 767 444 723T486 651T554 609T647 593V466Q595 464 555 450T487 408T445 336T430 229V-132Q430 -200 413 -254T363 -346T281 -404T166 -425H34V-296H94Z"
            },
            126: {
                name: "asciitilde",
                xadv: 1196,
                path: "M844 553Q775 553 703 575T557 623Q428 668 340 668Q302 668 270 662T207 645T149 617T92 580V723Q142 761 208 784T355 807Q395 807 435 801T513 784T589 761T664 735Q685 727 710 720T760\n705T811 694T860 690Q929 690 990 715T1104 782V633Q1072 610 1043 595T983 571T918 557T844 553Z"
            }
        }
    }, e.font = e.fonts["Liberation Sans"], e
}(Vector), typeof Vector == "undefined" && (Vector = {}), Vector.SVGPath = function(e) {
    var t = {
        m: 2,
        l: 2,
        h: 1,
        v: 1,
        c: 6,
        s: 4,
        q: 4,
        t: 2,
        a: 7,
        z: 0
    };
    return e.fromVOBPath = function(e) {
        for (var t = "", n = {}, r = 0, i = e.length; r < i; r++) switch ((n = e[r]).cmd) {
            case "M":
                t += "M" + n.x + " " + n.y + " ";
                break;
            case "L":
                t += "L" + n.x + " " + n.y + " ";
                break;
            case "C":
                t += "C" + n.x1 + " " + n.y1 + ", " + n.x2 + " " + n.y2 + ", " + n.x + " " + n.y + " ";
                break;
            case "Q":
                t += "Q" + n.x1 + " " + n.y1 + ", " + n.x + " " + n.y + " ";
                break;
            case "Z":
                t += "Z "
        }
        return t.substr(0, t.length - 1)
    }, e.toVOBPath = function(e) {
        if (e) {
            for (var e = e.replace(/([^e])([+-])/g, "$1 $2"), e = e.match(/([mlhvcsqtaz])|[0-9.\-e]*/gi), n = [], r = 0, s = e.length; r < s; r++) e[r] && n.push(e[r]);
            for (var e = n, n = "", o = r = 0, u = 0, a = 0, f = 0, l, c, h = "", p = 0, d = []; n = e[r];) {
                var v = t[n.toLowerCase()] + 1;
                if (v) {
                    for (var m = 1, s = v, g = []; m < s; m++) g.push(parseFloat(e[r + m]));
                    prevType = n, p = v, r += v
                } else {
                    m = 0, s = p - 1;
                    for (g = []; m < s; m++) g.push(parseFloat(e[r + m]));
                    n = h === "m" ? "l" : h === "M" ? "L" : h, r += p - 1
                }
                if (n) {
                    switch (n) {
                        case "M":
                            o = g[0], u = g[1], a = o, f = u, l = c = null, d.push({
                                cmd: "M",
                                x: o,
                                y: u
                            });
                            break;
                        case "m":
                            o += g[0], u += g[1], a = o, f = u, l = c = null, d.push({
                                cmd: "M",
                                x: o,
                                y: u
                            });
                            break;
                        case "L":
                            o = g[0], u = g[1], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "l":
                            o += g[0], u += g[1], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "H":
                            o = g[0], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "h":
                            o += g[0], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "V":
                            u = g[0], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "v":
                            u += g[0], l = c = null, d.push({
                                cmd: "L",
                                x: o,
                                y: u
                            });
                            break;
                        case "C":
                            o = g[4], u = g[5], l = g[2], c = g[3], d.push({
                                cmd: "C",
                                x1: g[0],
                                y1: g[1],
                                x2: g[2],
                                y2: g[3],
                                x: g[4],
                                y: g[5]
                            });
                            break;
                        case "c":
                            g[4] === 0 && g[5] === 0 && (g[4] += 1e-4, g[5] += 1e-4), d.push({
                                cmd: "C",
                                x1: g[0] + o,
                                y1: g[1] + u,
                                x2: g[2] + o,
                                y2: g[3] + u,
                                x: g[4] + o,
                                y: g[5] + u
                            }), l = o + g[2], c = u + g[3], o += g[4], u += g[5];
                            break;
                        case "S":
                            if (l === null || !h.match(/[sc]/i)) l = o, c = u;
                            d.push({
                                cmd: "C",
                                x1: o - (l - o),
                                y1: u - (c - u),
                                x2: g[0],
                                y2: g[1],
                                x: g[2],
                                y: g[3]
                            }), l = g[0], c = g[1], o = g[2], u = g[3];
                            break;
                        case "s":
                            g[2] === 0 && g[3] === 0 && (g[2] += 1e-4, g[3] += 1e-4);
                            if (l === null || !h.match(/[sc]/i)) l = o, c = u;
                            d.push({
                                cmd: "C",
                                x1: o - (l - o),
                                y1: u - (c - u),
                                x2: o + g[0],
                                y2: u + g[1],
                                x: o + g[2],
                                y: u + g[3]
                            }), l = o + g[0], c = u + g[1], o += g[2], u += g[3];
                            break;
                        case "Q":
                            l = g[0], c = g[1], o = g[2], u = g[3], d.push({
                                cmd: "Q",
                                x1: g[0],
                                y1: g[1],
                                x: g[2],
                                y: g[3]
                            });
                            break;
                        case "q":
                            g[2] === 0 && g[3] === 0 && (g[2] += 1e-4, g[3] += 1e-4), d.push({
                                cmd: "Q",
                                x1: g[0] + o,
                                y1: g[1] + u,
                                x: g[2] + o,
                                y: g[3] + u
                            }), l = o + g[0], c = u + g[1], o += g[2], u += g[3];
                            break;
                        case "T":
                            l === null || !h.match(/[qt]/i) ? (l = o, c = u) : (l = o - (l - o), c = u - (c - u)), d.push({
                                cmd: "Q",
                                x1: l,
                                y1: c,
                                x: g[0],
                                y: g[1]
                            }), o = g[0], u = g[1];
                            break;
                        case "t":
                            g[0] === 0 && g[1] === 0 && (g[0] += 1e-4, g[1] += 1e-4), l === null || !h.match(/[qt]/i) ? (l = o, c = u) : (l = o - (l - o), c = u - (c - u)), d.push({
                                cmd: "Q",
                                x1: l,
                                y1: c,
                                x: o + g[0],
                                y: u + g[1]
                            }), o += g[0], u += g[1];
                            break;
                        case "A":
                            l = c = null, d.push({
                                cmd: "L",
                                x: o = g[5],
                                y: u = g[6]
                            });
                            break;
                        case "a":
                            l = c = null, d.push({
                                cmd: "L",
                                x: o = g[5] + o,
                                y: u = g[6] + u
                            });
                            break;
                        case "A":
                            s = arcToBezier(g[5], g[6], g[0], g[1], g[3], g[4], g[2], o, u);
                            for (o = 0; o < s.length; o++) d.push(s[o]);
                            o = g[5], u = g[6];
                            break;
                        case "a":
                            g[5] += o, g[6] += u, s = arcToBezier(g[5], g[6], g[0], g[1], g[3], g[4], g[2], o, u);
                            for (o = 0; o < s.length; o++) d.push(s[o]);
                            o = g[5], u = g[6];
                            break;
                        case "Z":
                            f = a = 0, d.push({
                                cmd: "Z"
                            });
                            break;
                        case "z":
                            o = a, u = f, d.push({
                                cmd: "Z"
                            })
                    }
                    h = n
                }
            }
            return d
        }
    }, e
}({}), typeof Vector == "undefined" && (Vector = {}), Vector.Text = function(e) {
    function t(t) {
        var n = document.body;
        e.element || (e.parent = document.createElement("span"), e.text = document.createElement("span"), e.parent.appendChild(e.text), e.image = document.createElement("img"), e.image.style.display = "inline", e.image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=", e.parent.appendChild(e.image), e.element = document.createElement("div"), e.element.id = "DOMMetrics", e.element.appendChild(e.parent), n.insertBefore(e.element, n.firstChild)), e.text.innerHTML = t.text, e.element.style.cssText = "display: block;";
        if (!t.marginReset) return r = t.callback(e.parent), e.element.style.display = "none", r;
        if (!t.setup || t.setup === 1) a = n.style.padding, f = n.style.margin, n.style.padding = 0, n.style.margin = 0;
        if (!t.setup) var r = t.callback(e.parent);
        if (!t.setup || t.setup === 2) n.style.padding = a, n.style.margin = f, e.element.style.display = "none";
        if (!t.setup) return r
    }
    function n() {
        var t = document.createElement("span");
        t.style.cssText = e.CSSWhiteSpace, document.body.appendChild(t), e.elementContent = t
    }
    function r(t) {
        var n = e.elementContent;
        n.style.display = "block", n.style.width = t.width + "px", n.style.font = t.font, n.innerHTML = sketch.area.entities(t.content);
        var t = n.firstChild || n,
            r = document.createRange();
        r.setStart(t, 0), r.setEnd(t, 0);
        for (var i = 1, s = t.textContent, o = s.length, u = [], a = 0, f = r.getClientRects(), l = f[f.length - 1].top, c = e.spaceOffset, h = e.mOffset, p = n.offsetHeight, d = n.offsetWidth; s;) {
            if (i > o) {
                u.push(s);
                break
            }
            r.setStart(t, a), r.setEnd(t, i), i++, f = r.getClientRects(), f = f[f.length - 1].top, l !== f && (i--, u.push(s.substr(0, i - a - c + h)), s = s.substr(i - a - c + h), a = i - c + h, l = f)
        }
        return s[s.length - 1].charCodeAt() === 10 && u.push(""), n.style.display = "none", {
            data: u,
            lines: u.length,
            height: p,
            width: d
        }
    }
    function i(t) {
        var n = e.elementContent;
        n.style.display = "block", n.style.width = t.width + "px", n.style.font = t.font, n.innerHTML = t.content;
        for (var t = document.body.createTextRange(), r = 1, i = target.innerText, s = i.length, o = [], u = 0, a = n.offsetHeight, f = n.offsetWidth; i;) {
            if (r > s) {
                o.push(i);
                break
            }
            t.moveToElementText(target), t.collapse(!0), t.moveEnd("character", r), t.moveStart("character", u), t.select(), r++, t.getClientRects().length > 1 && (r--, o.push(i.substr(0, r - u - 1)), i = i.substr(r - u - 1), u = r - 1)
        }
        return n.style.display = "none", {
            data: o,
            lines: o.length,
            height: a,
            width: f
        }
    }
    function s(t) {
        function n(n) {
            s.push(n), n = e.measureText(n, t.font), f += n.height, a = Math.max(n.width, a)
        }
        function r() {
            if (!(e.measureTextWidth(o, t.font) <= t.width)) {
                for (var r = o.length, i = 0, s = 0, u = 0; u < r; u++) {
                    var a = o.substr(i, ++s).replace(p, "");
                    e.measureTextWidth(a, t.font) > t.width && (a = a.substr(0, a.length - 1).replace(p, ""), a.match(c) ? (i = a.split(c), a = a[i[0].length], u -= i[1].length, n(i[0] + a)) : a.match(" ") ? (i = a.split(" "), u -= i.pop().length, n(i.join(" "))) : n(a), i = u, s = 1)
                }
                return o.substr(i, s + 1)
            }
        }
        for (var i = t.content.split("\n"), s = [], o = "", u, a = 0, f = 0, l = 0; l <= i.length; l++) {
            if (o) {
                n(o);
                if (l === i.length) break;
                o = ""
            }
            for (var d = i[l], v = d.split(h), m = 0, g = 0; g < v.length + 2; g++) {
                var y = m - 1 < 0 ? "" : d.substr(m - 1, 1),
                    b = v[g] || "";
                if (e.measureTextWidth(o + y + b, t.font) <= t.width) o += y + b;
                else if (u = r()) o = u + y + b;
                else {
                    u = y.match(c) ? y : "";
                    if (o || y) e.measureTextWidth(o + u, t.font) > t.width ? u === "–" ? b = o + u + b : (n(o), b = u + b) : n(o + u);
                    o = b
                }
                m += b.length + 1
            }
        }
        return {
            data: s,
            lines: s.length,
            height: f,
            width: a
        }
    }
    function o(e) {
        return g.clearRect(0, 0, g.canvas.width, g.canvas.height), g.fillText(e, 0, d.textBaseline.top), g.canvas.toDataURL()
    }
    function u(t) {
        return d || (d = e.getMetrics(v, "16px Arial, Helvetica"), m.width = d.width, m.height = d.height, g.font = "16px Arial, Helvetica", y = o(v), b = o("")), g.font = "16px " + t + ", Arial, Helvetica", o(v)
    }
    e.getMetrics = function(n, r) {
        var i = window.getComputedStyle(document.body, "").direction,
            s = e.measureTextHeight(n, r),
            o = e.measureTextWidth(n, r);
        return t({
            marginReset: !0,
            text: n,
            callback: function(t) {
                t.style.cssText = "font: " + r + "; white-space: nowrap; display: block;";
                var n = e.image.offsetTop,
                    u = n - s;
                return t.style.cssText = "font: " + r + "; white-space: nowrap; line-height: 0; display: block;", {
                    font: r,
                    direction: i,
                    ascent: n,
                    descent: -u,
                    height: s,
                    width: o,
                    textBaseline: {
                        alphabetic: 0,
                        top: n,
                        hanging: n * 8 / 10,
                        middle: e.image.offsetTop,
                        ideographic: u,
                        bottom: u
                    },
                    textAlign: {
                        left: 0,
                        start: -(i === "ltr") ? 0 : o,
                        end: -(i === "ltr") ? o : 0,
                        right: -o,
                        center: -o / 2
                    }
                }
            }
        })
    }, e.measureText = function(t, n) {
        return {
            width: e.measureTextWidth(t, n),
            height: e.measureTextHeight(t, n)
        }
    }, e.measureTextWidth = function(e, n) {
        return t({
            text: e + e + e,
            callback: function(e) {
                return e.style.cssText = "font: " + n + "; white-space: nowrap; display: inline;", e.offsetWidth / 3
            }
        })
    }, e.measureTextHeight = function(e, n) {
        return t({
            text: "1<br>2<br>3<br>4<br>5<br>6<br>7",
            callback: function(e) {
                return e.style.cssText = "font: " + n + "; white-space: nowrap; display: inline;", e.offsetHeight / 7 + .5 >> 0
            }
        })
    }, e.textAlign = function(n, r) {
        var i = window.getComputedStyle(document.body, "").direction,
            s = e.measureTextWidth(n, r);
        return t({
            text: n,
            callback: function() {
                return {
                    left: 0,
                    start: -(i === "ltr") ? 0 : s,
                    end: -(i === "ltr") ? s : 0,
                    right: -s,
                    center: -s / 2
                }
            }
        })
    }, e.textBaseline = function(n, r) {
        var i = e.measureTextHeight(n, r);
        return t({
            marginReset: !0,
            text: n,
            callback: function(t) {
                t.style.cssText = "font: " + r + "; white-space: nowrap; display: block;";
                var n = e.image.offsetTop,
                    s = n - i;
                return t.style.cssText = "font: " + r + "; white-space: nowrap; line-height: 0; display: block;", {
                    alphabetic: 0,
                    top: n,
                    hanging: n * 8 / 10,
                    middle: e.image.offsetTop + 1,
                    ideographic: s,
                    bottom: s
                }
            }
        })
    }, e.textBaselineTop = function(n, r) {
        return t({
            text: n,
            callback: function(t) {
                return t.style.cssText = "font: " + r + "; white-space: nowrap; display: block;", e.image.offsetTop * 1.315
            }
        })
    };
    var a, f;
    e.getFontStyle = function(e) {
        var t = [];
        return e.fontStyle && t.push(e.fontStyle), e.fontVariant && t.push(e.fontVariant), e.fontWeight && t.push(e.fontWeight), e.fontSize && t.push(e.fontSize), e.fontFamily && t.push("'" + e.fontFamily + "'"), t.join(" ")
    };
    var l = 1 / (180 / Math.PI),
        c = /[\u2014\u2013-]/,
        h = /[ \u2014\u2013-]/,
        p = /^\s+|\s+$/g;
    e.drawLineBreaks = function(t) {
        var n = t.content;
        if (n) {
            var r = e.getFontStyle(t),
                i = t.bbox,
                s = t.ctx;
            if (t.breaks && t.breaks.data) var o = t.breaks.lineHeight,
                n = t.breaks;
            else o = e.measureTextHeight(n, r), n = e.getLineBreaks({
                font: r,
                content: n,
                width: i.width
            });
            var u = n.data;
            if (s) {
                s.font = r, s.save();
                var r = i.scale.x,
                    a = i.scale.y,
                    f = i.rotate * l;
                s.translate(i.x, i.y), f && s.rotate(f), s.translate(-i.x * r, - i.y * a), r === 1 && a === 1 || s.scale(r, a), s.fillStyle = t.fillStyle || "#000", t.clip && (s.rect(i.x, i.y, i.boxWidth, i.boxHeight), s.clip()), t.blur ? (f = t.blur / 2, r = i.y + f, a = i.x - n.width - 25, s.shadowOffsetX = n.width + f + 25, s.shadowOffsetY = 0, s.shadowBlur = t.blur, s.shadowColor = s.fillStyle) : (r = i.y, a = i.x), t = 0;
                for (f = u.length; t < f; t++) s.textBaseline = "top", s.fillText(u[t], a, t * o + r);
                s.restore()
            }
            return {
                data: u,
                lineHeight: o,
                height: n.height,
                width: n.width,
                x: i.x,
                y: i.y
            }
        }
    }, e.getLineBreaks = function(t) {
        if (document.createRange) {
            n();
            var o = document.createElement("span");
            return document.body.appendChild(o), e.spaceOffset = 1, e.mOffset = function() {
                var t = document.createRange();
                return o.textContent = "d—d", o.className = "wrap", o.style.cssText = "display: block; width: 1.55555em; " + e.CSSWhiteSpace + " font-size: bold 22px arial;", t.setStart(o.firstChild, 0), t.setEnd(o.firstChild, o.textContent.length), t.getClientRects().length > 2 ? 1 : 0
            }(), document.body.removeChild(o), (e.getLineBreaks = r)(t)
        }
        return document.body.createTextRange ? (n(), (e.getLineBreaks = i)(t)) : (e.getLineBreaks = s)(t)
    }, e.CSSWhiteSpace = "white-space: pre-wrap;white-space: -moz-pre-wrap !important;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;", e.getPixelBoundingBox = function(e) {
        var t = e.ctx,
            n = e.height >> 0,
            r = e.width >> 0,
            i = e.x >> 0,
            e = e.y >> 0,
            s = t.getImageData(i, e, r, n).data,
            o = {}, u = 0,
            a = 0,
            f = 0;
        for (t.save(); a <= n && f <= r;) {
            if (s[(a * r + f) * 4 + 3]) {
                u = f + i;
                break
            }
            a++, a % n === 0 && (a = 0, f++)
        }
        o.x1 = u;
        for (var l = 0, a = 0, f = r; a <= n && f >= 0;) {
            if (s[(a * r + f) * 4 + 3]) {
                l = f + i + 1;
                break
            }
            a++, a % n === 0 && (a = 0, f--)
        }
        o.x2 = l, o.width = l - u;
        for (i = n = 0; i < s.length;) {
            if (s[i + 3]) {
                i -= i % r, n = i / 4 / r, n += e;
                break
            }
            i += 4
        }
        o.y1 = n, u = 0;
        for (i = s.length; i >= 0;) {
            if (s[i + 3]) {
                i += r - i % r, u = i / 4 / r, u += e;
                break
            }
            i -= 4
        }
        return o.height = u - n, o.y2 = o.height + o.y1, t.restore(), o
    }, e.range = {}, e.range.selectAll = function(e) {
        if (document.selection) {
            var t = document.body.createTextRange();
            t.moveToElementText(e), t.select()
        } else window.getSelection && (t = document.createRange(), t.selectNode(e), window.getSelection().addRange(t))
    }, e.getRange = function(t) {
        var n = window.getSelection();
        return n === null ? (t = e.getCursorPos(t), {
            startOffset: t,
            endOffset: t
        }) : n.getRangeAt(0)
    }, e.setRange = function(e, t, n) {
        var r = document.createRange(),
            e = e.firstChild || e;
        r.setStart(e, t), r.setEnd(e, n), e = window.getSelection(), e.removeAllRanges(), e.addRange(r)
    }, e.getCursorPos = function(e) {
        var t = 0;
        if (window.getSelection) {
            var n = window.getSelection();
            n.rangeCount && (n = n.getRangeAt(0), n.commonAncestorContainer.parentNode === e) && (t = n.endOffset)
        } else document.selection && document.selection.createRange && (n = document.selection.createRange(), n.parentElement() === editableDiv) && (e = document.createElement("span"), editableDiv.insertBefore(e, editableDiv.firstChild), t = n.duplicate(), t.moveToElementText(e), t.setEndPoint("EndToEnd", n), t = t.text.length);
        return t
    };
    var d, v = "The quick brown fox.",
        m = document.createElement("canvas"),
        g = m.getContext("2d"),
        y, b;
    return e.getFontSupport = function(e) {
        return e.toLowerCase() === "arial" ? !0 : (e = u(e), e !== b && e !== y ? !0 : !1)
    }, e.attach = function(t) {
        if (e.getFontSupport(t.family)) return t.callback();
        var n = u(t.family);
        if (n !== b && n !== y) return t.callback();
        var r = (new Date).getTime(),
            i = setInterval(function() {
                var e = u(t.family);
                (new Date).getTime() - r > 2e4 && (clearInterval(i), t.callback("timeout"), s.setAttribute("data-error", "timeout")), e !== b && e !== y && (clearInterval(i), t.callback())
            }, 10),
            n = t.href.replace(/[^a-zA-Z 0-9]+/g, ""),
            s = document.getElementById(n);
        s ? (n = s.getAttribute("data-error"), t.callback(n)) : (s = document.createElement("link"), s.href = t.href, s.id = n, s.setAttribute("rel", "stylesheet"), s.setAttribute("type", "text/css"), s.onerror = function() {
            clearInterval(i), t.callback("404"), s.setAttribute("data-error", "404")
        }, document.body.appendChild(s))
    }, e
}({}), typeof Vector == "undefined" && (Vector = {}),
function(e) {
    e.Transform = function(e) {
        return this.matrix = typeof e == "undefined" ? {
            a: 1,
            b: 0,
            x: 0,
            c: 0,
            d: 1,
            y: 0
        } : typeof e[0] == "undefined" ? e : this.cloneMatrix(e), this
    }, e.Transform.prototype = {
        point2d: function(e, t) {
            var n = this.matrix;
            return {
                x: n.a * e + n.c * t + n.x,
                y: n.b * e + n.d * t + n.y
            }
        },
        invert: function(e) {
            e = e || this.matrix, typeof e.a == "undefined" && (M = this.cloneMatrix(M));
            var t = e.a * e.d - e.b * e.c;
            return delete this.matrix, this.combine({
                a: e.d / t,
                b: -e.b / t,
                x: (e.b * e.y - e.d * e.x) / t,
                c: -e.c / t,
                d: e.a / t,
                y: (e.c * e.x - e.a * e.y) / t
            }), this
        },
        transform: function(e, t, n, r, i, s) {
            var o = this.matrix;
            return this.matrix = {
                a: o.a * e + o.c * t,
                b: o.b * e + o.d * t,
                c: o.a * n + o.c * r,
                d: o.b * n + o.d * r,
                x: o.a * i + o.c * s + o.x,
                y: o.b * i + o.d * s + o.y
            }, this
        },
        setTransform: function(e, t, n, r, i, s) {
            return this.matrix = {
                a: e,
                b: t,
                c: n,
                d: r,
                x: i,
                y: s
            }, this
        },
        rotate: function(e) {
            var t = this.matrix,
                n = Math.cos(e),
                e = Math.sin(e);
            return this.matrix = {
                a: t.a * n + t.b * -e,
                b: t.a * e + t.b * n,
                c: t.c * n + t.d * -e,
                d: t.c * e + t.d * n,
                x: t.x,
                y: t.y
            }, this
        },
        scale: function(e, t) {
            typeof t == "undefined" && (t = e);
            var n = this.matrix;
            return this.matrix = {
                a: n.a * e,
                b: n.b * t,
                c: n.c * e,
                d: n.d * t,
                x: n.x,
                y: n.y
            }, this
        },
        skew: function(e, t) {
            var n = this.matrix,
                r = n.a,
                i = n.b,
                s = n.c,
                o = n.d,
                u = Math.tan(e),
                a = Math.tan(t);
            return n.a = r + s * a, n.b = i + o * a, n.c = r * u + s, n.d = i * u + o, this
        },
        translate: function(e, t) {
            typeof t == "undefined" && (t = 0);
            var n = this.matrix;
            return n.x = n.a * e + n.c * t + n.x, n.y = n.b * e + n.d * t + n.y, this
        },
        relative: function(e, t) {
            var n = this.matrix;
            return delete this.matrix, this.combine([{
                a: 1,
                b: 0,
                x: -e,
                c: 0,
                d: 1,
                y: -t
            }, {
                a: n.a,
                b: n.b,
                x: n.x,
                c: n.c,
                d: n.d,
                y: n.y
            }, {
                a: 1,
                b: 0,
                x: e,
                c: 0,
                d: 1,
                y: t
            }]), this
        },
        runBefore: function(e, t, n, r, i, s, o) {
            var u = this.cloneMatrix();
            return this.reset(), this[e](t, n, r, i, s, o), e = this.cloneMatrix(), this.reset(), this.combine([e, u]), this
        },
        combine: function(e) {
            var t = [];
            if (typeof e.matrix != "undefined") for (var n = 0; n < arguments.length; n++) t[n] = arguments[n].matrix;
            else if (typeof
            e.a == "number") for (n = 0; n < arguments.length; n++) t[n] = arguments[n];
            else t = e;
            for (var n = this.matrix, r = [], i = 0; i < t.length; i++) typeof M == "undefined" ? n = t[i] : (r = t[i], n = {
                a: m.a * r.a + m.b * r.c,
                b: m.a * r.b + m.b * r.d,
                c: m.c * r.a + m.d * r.c,
                d: m.c * r.b + m.d * r.d,
                x: m.a * r.x + m.c * r.y + m.x,
                y: m.b * r.x + m.d * r.y + m.y
            });
            return this.matrix = n, this
        },
        clone: function() {
            return new e.Transform(this.cloneMatrix())
        },
        cloneMatrix: function(e) {
            return e = e || this.matrix, typeof e.a == "undefined" ? {
                a: e[0],
                b: e[1],
                c: e[2],
                d: e[3],
                x: e[4],
                y: e[5]
            } : {
                a: e.a,
                b: e.b,
                c: e.c,
                d: e.d,
                x: e.x,
                y: e.y
            }
        },
        reset: function() {
            return this.matrix = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                x: 0,
                y: 0
            }, this
        },
        toString: function() {
            var e = this.matrix;
            return e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.x + "," + e.y
        },
        apply: function(e, t) {
            var n = this.matrix;
            return t ? e.transform(n.a, n.b, n.c, n.d, n.x, n.y) : e.setTransform(n.a, n.b, n.c, n.d, n.x, n.y), this
        }
    }
}(Vector);
if (typeof widgets == "undefined") var widgets = {};
(function() {
    var e = {
        "text/css": "string",
        "text/html": "string",
        "text/plain": "string"
    };
    widgets.FileSaver = function(t) {
        typeof t == "undefined" && (t = {});
        var n = t.jsDir || "./js/",
            r = this;
        this.html5 = typeof ArrayBuffer == "function", this.boot = function(e) {
            var t = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder,
                i = window.btoa && window.atob,
                s = [];
            s.push({
                src: n + "File/jszip.js",
                verify: "JSZip"
            }), i || s.push({
                src: n + "Polyfill/Base64.js",
                verify: ["atob", "btoa"]
            }), t || s.push({
                src: n + "Polyfill/BlobBuilder.js",
                verify: "BlobBuilder"
            }), r.html5 ? s.push({
                src: n + "File/FileSaver.js",
                verify: "saveAs"
            }) : s.push({
                src: n + "File/downloadify.js",
                verify: ["Downloadify", "swfobject"]
            }), DOMLoader.script.add({
                srcs: s,
                callback: function() {
                    if (e) return e(r)
                }
            })
        }, this.download = function(t) {
            if (typeof saveAs == "function" && typeof BlobBuilder == "function" && t.getData) {
                var n = t.getData(),
                    r = t.name,
                    s = t.mime,
                    o = t.charset,
                    t = t.extension,
                    u = "";
                if (typeof n == "string") {
                    if (n.substr(0, 5) === "data:") {
                        var a = n.substr(5).split(","),
                            n = a[1],
                            s = a[0].split(";")[0];
                        t || (t = s.split("/")[1]), e[a[0]] || (u = "binary")
                    }
                } else u = "binary", s = "application/zip", t = "zip", n = i(n);
                r || (r = "download"), s || (s = "text/plain"), t || (t = "txt"), u || (u = e[s] || "binary"), a = new BlobBuilder;
                if (u === "string") a.append(n), o && (s += ";charset=" + o);
                else {
                    for (var n = atob(n), o = new ArrayBuffer(n.length), u = new Uint8Array(o), l = 0; l < n.length; l++) u[l] = n.charCodeAt(l);
                    a.append(o)
                }
                s = a.getBlob(s), saveAs(s, r + "." + t)
            }
        }, this.button = function(e) {
            var t = e.parent || document.body,
                s = e.id,
                o = e.fileName,
                u = e.fileType,
                a = e.getData,
                l = e.format === "fake",
                c = document.createElement("div");
            c.className = "downloadifyContainer";
            var h = document.createElement("div");
            h.id = s, c.appendChild(h), h = document.createElement("div"), h.className = "downloadify", h.style.cssText = "width: 90px; text-align: center;", h.innerHTML = e.title || o + "." + u, c.appendChild(h), t.appendChild(c), t = document.getElementById(s), r.html5 || l ? Event.add(h, "click", function() {
                if (l) return a();
                r.download({
                    name: o,
                    extension: u,
                    getData: a
                })
            }) : (Event.add(t, "mousedown", function(e) {
                Event.stopPropagation(e)
            }), Downloadify.create(s, {
                filename: function() {
                    return o + "." + u
                },
                data: function() {
                    var e = a();
                    return typeof e != "string" && (e = i(e)), e
                },
                downloadImage: n + "downloadify.png",
                swf: n + "downloadify.swf",
                transparent: !0,
                append: !1,
                width: 110,
                height: 40,
                dataType: e.format
            }))
        };
        var i = function(t) {
            function n(t, n) {
                var r = t.data,
                    i = {};
                r.indexOf("base64") !== -1 && (r = r.split(";"), e[r[0].substr(5)] && (i.binary = !1), i.base64 = !0, r = r[1].substr(7)), n.add(t.name, r, i)
            }
            var r = new JSZip;
            if (typeof t.length == "undefined") {
                if (!t.data || !t.name) {
                    for (var i in t) for (var s = t[i], o = r.folder(i), u = 0, a = s.length; u < a; u++) n(s[u], o);
                    return r.generate()
                }
                t = [t]
            }
            u = 0;
            for (a = t.length; u < a; u++) n(t[u], r);
            return r.generate()
        };
        return this.boot(t.callback), this
    }
})(), typeof widgets == "undefined" && (widgets = {}),
function(e) {
    if (document.cancelFullScreen) var t = "onfullscreenchange";
    else if (document.webkitCancelFullScreen) t = "onwebkitfullscreenchange", document.cancelFullScreen = document.webkitCancelFullScreen;
    else {
        if (!document.mozCancelFullScreen) return;
        t = "onmozfullscreenchange", document.cancelFullScreen = document.mozCancelFullScreen
    }
    e.state = "exited", e.addKeyboardEvents = function() {
        Event.add(window, "keydown", function(t) {
            switch (t.keyCode) {
                case 13:
                    t.preventDefault(), document.cancelFullScreen();
                    break;
                case 70:
                    e.enter()
            }
        })
    }, e.enter = function() {
        var n = document.body;
        n[t] = function() {
            e.state = "entered", n[t] = function() {
                e.state = "exited"
            }
        }, n.webkitRequestFullScreen ? n.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : n.mozRequestFullScreen()
    }, e.exit = function() {
        document.cancelFullScreen()
    }
}(widgets.FullScreen = {}), typeof widgets == "undefined" && (widgets = {}), widgets.Growl = function(e) {
    e = e || this, e.close = function() {
        t.style.opacity = 0, t.style.bottom = "-" + t.firstChild.offsetHeight + "px", setTimeout(function() {
            t.style.display = "none"
        }, 300)
    }, e.message = function(n) {
        e.timeout || (document.body.appendChild(t), t.firstChild.innerHTML = n, t.style.display = "block", e.timeout = setTimeout(function() {
            t.style.opacity = 1, t.style.bottom = 0, e.timeout = setTimeout(function() {
                e.close(), delete e.timeout
            }, 2e3)
        }, 1))
    };
    var t = document.createElement("div");
    return t.onclick = e.close, t.id = "growl", t.appendChild(document.createElement("div")), e
}, typeof widgets == "undefined" && (widgets = {}), widgets.Loader = function() {
    var e = Math.PI,
        t = {
            id: "loader",
            bars: 12,
            radius: 0,
            lineWidth: 20,
            lineHeight: 70,
            display: !0
        }, n = function() {
            if (window.innerWidth && window.innerHeight) var e = window.innerWidth,
                t = window.innerHeight;
            else document.compatMode === "CSS1Compat" && document.documentElement && document.documentElement.offsetWidth ? (e = document.documentElement.offsetWidth, t = document.documentElement.offsetHeight) : document.body && document.body.offsetWidth && (e = document.body.offsetWidth, t = document.body.offsetHeight);
            return {
                width: e,
                height: t
            }
        };
    return function(r) {
        function s() {
            if (r.message) {
                var e = n(),
                    t = e.height - v;
                u.span.style.left = (e.width - v + v) / 2 - u.span.offsetWidth / 2 + "px", u.span.style.top = t / 2 + v - 10 + "px"
            }
        }
        function o() {
            var t = n(),
                i = t.width - v,
                o = t.height - v;
            f.style.left = i / 2 + "px", f.style.top = o / 2 + "px", s(), y.save(), y.clearRect(0, 0, v, v), y.translate(v / 2, v / 2);
            for (var t = 360 - 360 / p, a = 0; a < p; a++) {
                i = a / p * 2 * e + g, y.save(), y.translate(d * Math.sin(-i), d * Math.cos(-i)), y.rotate(i);
                var l = -r.lineWidth / 2,
                    i = r.lineWidth,
                    o = r.lineHeight,
                    h = i / 2;
                y.beginPath(), y.moveTo(l + h, 0), y.lineTo(l + i - h, 0), y.quadraticCurveTo(l + i, 0, l + i, 0 + h), y.lineTo(l + i, 0 + o - h), y.quadraticCurveTo(l + i, 0 + o, l + i - h, 0 + o), y.lineTo(l + h, 0 + o), y.quadraticCurveTo(l, 0 + o, l, 0 + o - h), y.lineTo(l, 0 + h), y.quadraticCurveTo(l, 0, l + h, 0), y.fillStyle = "hsla(" + a / (p - 1) * t + ", 100%, 50%, 0.85)", y.fill(), y.restore()
            }
            y.restore(), g += .07, r.messageAnimate && (i = g / .07 >> 0, i % 10 === 0) && (u.span.innerHTML = r.message + r.messageAnimate[i / 10 % r.messageAnimate.length])
        }
        var u = this;
        if (document.createElement("canvas").getContext && (u = this, document.body)) {
            typeof r == "string" && (r = {
                message: r
            }), typeof r == "undefined" && (r = {}), typeof r == "boolean" && (r = {
                display: !1
            });
            for (var a in t) typeof r[a] == "undefined" && (r[a] = t[a]);
            var f = document.getElementById(r.id);
            if (f) u.span = f.parentNode.getElementsByTagName("span")[0];
            else {
                var l = document.createElement("div"),
                    h = document.createElement("span");
                l.appendChild(h), u.span = h, u.div = l, f = document.createElement("canvas"), document.body.appendChild(f), f.id = r.id, f.style.cssText = "opacity: 1; position: absolute; z-index: 10000;", l.appendChild(f), document.body.appendChild(l)
            }
            var p = r.bars,
                d = r.radius,
                v = (r.lineHeight + 20) * 2 + r.radius * 2,
                m = n();
            a = m.width - v, m = m.height - v, f.width = v, f.height = v, f.style.left = a / 2 + "px", f.style.top = m / 2 + "px", s();
            var g = 0,
                y = f.getContext("2d");
            y.globalCompositeOperation = "lighter", y.shadowOffsetX = 1, y.shadowOffsetY = 1, y.shadowBlur = 1, y.shadowColor = "rgba(0, 0, 0, 0.5)", this.css = function() {
                h.style.cssText = "font-family: monospace; font-size: 14px; opacity: 1; display: none; background: " + (r.background ? r.background : "rgba(0,0,0,0.65)") + "; border-radius: 10px; padding: 10px; width: 200px; text-align: center; position: absolute; z-index: 10000;", l.style.cssText = "color: #fff; -webkit-transition-property: opacity; -webkit-transition-duration: 1s; position: fixed; left: 0; top: 0; width: 100%; height: 100%; z-index: 100000; opacity: 0; display: none", l.style.cssText += this.stopPropagation ? "background: rgba(0,0,0,0.25);" : "pointer-events: none;"
            }, this.stop = function() {
                setTimeout(function() {
                    window.clearInterval(u.interval), delete u.interval
                }, 50), f && f.style && (l.style.cssText += "pointer-events: none;", f.parentNode.style.opacity = 0, window.setTimeout(function() {
                    u.stopPropagation = !1, f.parentNode.style.display = "none", y.clearRect(0, 0, v, v)
                }, 1e3))
            }, this.start = function(e) {
                this.css();
                var t = n(),
                    i = t.width - v,
                    t = t.height - v;
                f.parentNode.style.opacity = 1, f.parentNode.style.display = "block", u.span.style.display = r.message ? "block" : "none", r.background && (u.div.style.background = r.backgrond), f.style.left = i / 2 + "px", f.style.top = t / 2 + "px", r.delay || o(), window.clearInterval(this.interval), this.interval = window.setInterval(o, 30), r.message && b(r.message, e)
            }, this.message = function(e, t) {
                r.message = e;
                if (!this.interval) return this.start(t);
                r.background && (u.span.style.background = r.backgrond), b(r.message, t), u.span.style.display = r.message ? "block" : "none"
            };
            var b = function(e, t) {
                e.substr(-3) === "..." ? (r.message = e.substr(0, e.length - 3), r.messageAnimate = [".&nbsp;&nbsp;", "..&nbsp;", "..."].reverse(), u.span.innerHTML = r.message + r.messageAnimate[0]) : (r.messageAnimate = !1, u.span.innerHTML = r.message), t && setTimeout(t, 50)
            };
            return r.display === !1 ? this : (this.css(), this.start(), this)
        }
    }
}(widgets), typeof widgets == "undefined" && (widgets = {}), widgets.Range = function() {
    function e(e) {
        var t = [];
        if (!e) return [];
        for (typeof e == "string" && (e = e.indexOf(",") !== -1 ? e.split(",") : e.split(" ")); e.length;) {
            var n = parseFloat(e.shift());
            t.push(n)
        }
        return t
    }
    function t(e, t) {
        return typeof e == "number" ? e : String(parseFloat(e)) === "NaN" ? t : parseFloat(e)
    }
    return function(n) {
        var r = this,
            s = n.onchange;
        n.target && (n.target.onchange && (s = n.target.onchange), n.target.setValue = function(e, t) {
            r.thumbs[e].value = t, r.update(e, "end")
        }, n.value = n.target.value, n.min = n.target.getAttribute("min"), n.max = n.target.getAttribute("max"), n.step = n.target.getAttribute("step")), this.value = e(n.value, 0), this.min = t(n.min, 0), this.max = t(n.max, 100), this.step = t(n.step, 1), this.thumbs = [], this.canPush = !0, this.canCross = !1;
        if (typeof n.css != "object") {
            n.css = {}, n.className ? (n.css.slider = "", n.css.thumb = "") : (n.css.slider = "background: #000 -webkit-radial-gradient(45px 45px, cover, rgb(0, 0, 0) 0%, rgb(255, 255, 255) 100%); border: 1px solid #000; border-radius: 25px; width: 500px; height: 40px; top: 0; position: relative; z-index: 100", n.css.thumb = "background: #fff -webkit-radial-gradient(45px 45px, cover, rgb(0, 100, 255) 0%, rgb(255, 255, 255) 100%); border: 2px solid rgba(0,100,255,1); top: -2px; border-radius: 25px; width: 40px; height: 40px; position: absolute;");
            var o = sketch.createMedia.rangeBar(n.gradient);
            n.css.slider += "background-image: url(" + o + ");"
        }
        for (var u = document.createElement("div"), a = 0, f = this.value.length, o = 0; o < f; o++) {
            var l = document.createElement("div");
            u.appendChild(l), this.thumbs.push({
                index: o,
                element: l,
                left: 0,
                value: this.value[o]
            })
        }
        if (f === 2 && (this.canPush || !this.canCross)) {
            var h = document.createElement("div");
            h.className = "rangeSpan", u.appendChild(h)
        }
        return this.element = u, this.setup = function() {
            u.className = n.className, u.style.cssText = n.css.slider;
            for (var e = 0; e < f; e++) this.thumbs[e].element.style.cssText = n.css.thumb
        }, this.setAnimate = function(e, t) {
            this.thumbs[e].element.style.cssText = t ? n.css.thumb + "-webkit-transition: top, left 0.1s;     -moz-transition: top, left 0.1s;       -o-transition: top, left 0.1s;          transition: top, left 0.1s;" : n.css.thumb
        }, this.update = function(e, t) {
            var i = r.thumbs[e || 0],
                o = i.element,
                a = u.offsetWidth,
                l = o.offsetWidth,
                a = Math.max(0, Math.min(a - l, (i.value - r.min) / (r.max - r.min) * (a - l)));
            l /= 2;
            if (this.canPush) {
                var c = a + l;
                if (c < i.left) for (var p = i.index - 1; p > -1; p--) {
                    var v = this.thumbs[p];
                    v.left > c && (v.element.style.cssText = n.css.thumb, v.element.style.left = a + "px", v.left = c, v.value = i.value, r.state = t || "change", s(r, v))
                } else for (p = i.index + 1; p < f; p++) if (v = this.thumbs[p], v.left < c) v.element.style.cssText = n.css.thumb, v.element.style.left = a + "px", v.left = c, v.value = i.value, r.state = t || "change", s(r, v);
                o.style.left = a + "px", i.left = c
            } else if (this.canCross) o.style.left = a + "px", i.left = a + l;
            else {
                c = a + l;
                if (c < i.left) {
                    for (p = i.index - 1; p > -1; p--) if (v = this.thumbs[p], v.left > c) {
                        a = v.left - l, c = v.left, v.value = i.value, r.state = t || "change", s(r, v);
                        break
                    }
                } else for (p = i.index + 1; p < f; p++) if (v = this.thumbs[p], v.left < c) {
                    a = v.left - l, c = v.left, v.value = i.value, r.state = t || "change", s(r, v);
                    break
                }
                o.style.left = a + "px", i.left = c
            }
            r.state = t || "change", s(r, i), f === 2 && (i = r.thumbs[0].left, o = r.thumbs[1].left, h.style.width = Math.abs(i - o) + "px", h.style.left = Math.min(i, o) + "px")
        }, Event.add(u, "wheel", function(e, t) {
            var n = r.thumbs[0],
                i = (n.value - r.min) / (r.max - r.min),
                i = Math.min(1, Math.max(0, i - t.wheelDelta / 5e3));
            n.value = i * (r.max - r.min) + r.min, r.update(0, t.state)
        }), Event.add(u, "mousedown", function(e) {
            for (var t = Event.proxy.getCoord(e), n = Event.proxy.getBoundingBox(u), i = Infinity, s, t = t.x - n.x1, n = 0; n < f; n++) {
                var o = r.thumbs[n],
                    l = o.left - t,
                    c = Math.abs(l);
                if (l < 0 && c <= i || l > -1 && c < i) i = c, s = o
            }
            var h = s.element,
                p = s.index;
            h.style.zIndex = ++a, Event.proxy.drag({
                event: e,
                target: u,
                position: "relative",
                listener: function(e, t) {
                    Event.cancel(e);
                    var n = u.offsetWidth;
                    r.setAnimate(p, t.state !== "move");
                    var i = h.offsetWidth,
                        n = Math.max(0, Math.min(n - i, t.x - i / 2)) / (n - i),
                        i = t.state === "down" ? "start" : t.state === "up" ? "end" : "change";
                    s.value = n * (r.max - r.min) + r.min, r.update(p, i)
                }
            })
        }), n.target && n.target.parentNode && n.target.parentNode.replaceChild(u, n.target), this.setup(), setTimeout(function() {
            for (var e = f - 1; e > -1; e--) r.setAnimate(e, !0), r.update(e, "load"), r.state = "load", s(r, r.thumbs[e])
        }, 1), this
    }
}({}), typeof widgets == "undefined" && (widgets = {}), widgets.Thumbnailer = function(e) {
    var t = {
        backdrop: "",
        maxWidth: 300,
        maxHeight: 100,
        center: !0,
        crop: "Edge",
        srcs: []
    };
    return function(e) {
        var n = this;
        e || (e = {});
        for (var r in t) typeof e[r] == "undefined" && (e[r] = t[r]);
        return this.images = {}, this.conf = e, this.maxHeight = e.maxHeight, this.maxWidth = e.maxWidth, this.generate = function(t) {
            var r, i = t.src,
                s = t.canvas,
                o = t.title,
                u = typeof FlashCanvas != "undefined",
                a = t.crop || e.crop,
                f = t.center || e.center,
                l = t.backdrop || e.backdrop,
                h = t.maxWidth || e.maxWidth,
                p = t.maxHeight || e.maxHeight,
                v = t.callback || e.callback;
            if (typeof s == "undefined") if (this.images[i]) s = this.images[i].canvas;
            else if (s = document.createElement("canvas"), Event && Event.add) {
                var m = {}, g;
                for (g in e) typeof e[g] == "function" && (m[g] = e[g]);
                for (g in t) typeof e[g] == "function" && (m[g] = t[g]);
                Event.add(s, m)
            }
            var y = s.getContext("2d"),
                t = function() {
                    h === "auto" ? (s.height = p, s.width = h = r.width / r.height * p) : (s.height = p === "auto" ? p = r.height / r.width * h : p, s.width = h), s.title = o || "";
                    var e = 1;
                    if (a !== "None") var e = h / p < r.width / r.height,
                        t = a === "Fit",
                        e = t && e || !t && !e ? p / r.height : h / r.width;
                    var n = Math.round(r.width * e) || 1,
                        t = Math.round(r.height * e) || 1,
                        n = Math.round(f ? (h - n) / 2 : 0),
                        t = Math.round(f ? (p - t) / 2 : 0);
                    y.save(), y.beginPath(), y.rect(0, 0, h, p), y.clip(), l && (y.fillStyle = l, y.fill()), y.translate(n, t), y.scale(e, e), y.drawImage(r, 0, 0), y.restore(), v && v(s, r)
                }, m = String(i);
            return m === "[object HTMLImageElement]" || m === "[object HTMLCanvasElement]" || u && m === "[object]" ? (r = i, t()) : this.images[i] ? (r = this.images[i], t()) : (s.src = i, r = new Image, n.images[i] = r, n.images[i].canvas = s, u ? (r.src = i, y.loadImage(r, t)) : (r.onload = t, r.src = i)), s
        }, this.regenerate = function() {
            for (var e in this.images) thumb.generate({
                src: e,
                canvas: this.images[e].canvas
            })
        }, this
    }
}({}), typeof widgets == "undefined" && (widgets = {}), widgets.Uploader = function(e) {
    var t = this,
        e = e || {};
    this.action = e.action || "./upload.php?upload=true", this.confirm = e.confirm || "text", this.onUpload = e.onUpload, this.onProgress = e.onProgress, this.onLoad = e.onLoad, this.onError = e.onError, this.onAbort = e.onAbort, this.onChange = e.onChange, this.mode = e.mode || "read", this.maxFiles = e.maxFiles || 1, this.maxFileSize = e.maxFileSize || 104857600, this.directory = e.directory || !1, typeof e.fakeInput == "object" ? (this.fakeInput = e.fakeInput || document.createElement("div"), this.fakeInputParent = e.fakeInputParent || (this.fakeInput.parentNode ? null : document.body)) : typeof e.fileInput == "object" && (this.fileInput = e.fileInput), this.dropAreaContainer = e.dropArea || document.body, this.dropAreaMessage = e.dropAreaMessage || "Drop File(s) Anywhere", this.dropAreaStyle = e.dropAreaStyle || "", this.files = {}, this.formats = {};
    var n = e.formats;
    if (n && n.indexOf(",") === -1) this.formats[n] = !0;
    else for (n = (e.formats || "jpg,jpeg,gif,png").split(","); n.length;) this.formats[n.shift().toLowerCase()] = !0;
    this.createFileInput = function() {
        if (t.fileInput) var e = t.fileInput;
        else {
            e = t.fileInput = document.createElement("input"), e.style.cssText = "position: absolute; top: 0; z-index: 1000; font-size: 1000px; text-align: right; width: inherit; height: inherit; cursor: pointer; right: 0; filter: alpha(opacity: 0); opacity: 0;", e.setAttribute("type", "file"), t.maxFiles > 1 ? (e.setAttribute("name", "files[]"), e.setAttribute("multiple", "multiple")) : e.setAttribute("name", "file"), t.directory && (e.setAttribute("directory", ""), e.setAttribute("mozdirectory", ""), e.setAttribute("webkitdirectory", ""));
            var n = t.fakeInput,
                r = t.fakeInputContainer = document.createElement("div"),
                i = t.fakeInputParent || n.parentNode;
            r.style.cssText = "position: relative; overflow: hidden; display: inline-block;", r.className = "fakeInputContainer";
            var s = n.height || n.offsetHeight,
                o = {
                    A: !0
                }, u = function() {
                    var s = n.width || n.offsetWidth,
                        a = n.height || n.offsetHeight;
                    if (!o[n.nodeName]) {
                        if (!s || !a) return setTimeout(u, 250);
                        r.style.width = s + "px", r.style.height = a + "px"
                    }
                    t.fakeInputParent ? t.fakeInputParent.appendChild(r) : i.replaceChild(r, n), r.appendChild(n), r.appendChild(e)
                };
            !n.width && !n.offsetWidth && !s ? setTimeout(u, 250) : u()
        }
        this.initFileInput(e)
    }, this.initFileInput = function(e) {
        e.onchange = function(t) {
            if (e.files && e.files.length) s(t.target.files, t);
            else {
                var n = e.value,
                    r = n.replace(/\\/g, "/").replace(/.*\//, "");
                s([{
                    src: n,
                    name: r
                }], t)
            }
        }
    };
    var r = document.createElement("form");
    r.style.cssText = "z-index: 10000; background: rgba(0,200,0, 0.5); position: fixed; width: 100%; height: 100%; left: 0; top: 0; display: none; font-weight: bold; font-size: 2.5em; color: #fff; line-height: 6em; text-align: center; text-shadow: 0 0 15px #000;", this.createDropArea = function(e) {
        var n = !! e,
            e = e || this.dropAreaContainer;
        t.dropAreaStyle && (r.style.cssText += t.dropAreaStyle), r.innerHTML = t.dropAreaMessage, r.ondragenter = function(e) {
            return e.preventDefault(), e.stopPropagation(), !1
        }, r.ondragover = function(e) {
            return e.preventDefault(), e.stopPropagation(), !1
        }, r.ondrop = function(e) {
            e.preventDefault(), e.stopPropagation(), r.style.display = "none", typeof e.dataTransfer != "undefined" && typeof e.dataTransfer.files != "undefined" && e.dataTransfer.files.length !== 0 && s(e.dataTransfer.files, e)
        }, r.ondragleave = function(e) {
            e.preventDefault(), e.stopPropagation(), setTimeout(function() {
                r.style.display = "none"
            }, 100)
        }, e === window && (e = document.body), n || e.appendChild(r), e.ondragenter = function(e) {
            typeof e.dataTransfer != "undefined" && typeof e.dataTransfer.files != "undefined" && setTimeout(function() {
                r.style.display = "block"
            }, 10)
        }, e === document.body && (window.onresize = function() {
            !window.innerWidth && document.body && document.body.offsetWidth && (window.innerWidth = document.body.offsetWidth, window.innerHeight = document.body.offsetHeight), window.innerWidth && window.innerHeight && (r.style.width = window.innerWidth + "px", r.style.height = window.innerHeight + "px")
        })()
    };
    var i = {
        length: 0
    }, s = function(e, n) {
        t.onProgress && t.onProgress({
            transferPercent: 100
        });
        var r = 0,
            s = function(e, n) {
                n.src && (n = [n]);
                for (var r in n) {
                    var i = t.files[r],
                        s = n[r];
                    i.src = s.src, i.size = s.size, i.type = s.type, i.name = s.name
                }
                a()
            }, o = {
                jpg: !0,
                jpeg: !0,
                gif: !0,
                png: !0
            }, u = function(e) {
                var n = e.hash;
                if (e.type && !o[e.type.substr(6).toLowerCase()]) {
                    var r = new FileReader;
                    r.onload = function(e) {
                        return t.files[n].src = e.target.result, t.files[n].isLoaded = !0, a()
                    }, r.readAsText(e)
                } else try {
                    var i = (window.URL || window.webkitURL).createObjectURL(e);
                    return t.files[n].src = i, t.files[n].isLoaded = !0, a()
                } catch (u) {
                    try {
                        r = new FileReader, r.onload = function(e) {
                            return t.files[n].src = e.target.result, t.files[n].isLoaded = !0, a()
                        }, r.readAsDataURL(e)
                    } catch (f) {
                        e.upload = new t.upload({
                            file: e,
                            onUpload: s
                        })
                    }
                }
            }, a = function(e) {
                e ? f() : setTimeout(f, 30)
            }, f = function() {
                var o = e[r];
                if (++r > t.maxFiles || !o) {
                    t.onLoad && t.onLoad();
                    if (t.maxFiles === 1) {
                        if (typeof e[0] == "undefined") {
                            t.onError && t.onError(t, "UPLOAD_ERR_FORMAT");
                            return
                        }
                        return t.file = e[0], t.onChange(t, n)
                    }
                    for (var f in t.files);
                    return t.files[f] ? t.onChange(t, n) : void 0
                }
                f = t.createFileHash(o);
                var l = t.files[i[f]];
                if (l) {
                    if (t.changedFiles[i[f]] = o, t.mode === "upload" && l.isUploaded) return a(!0);
                    if (t.mode === "read" && l.isLoaded) return a(!0)
                }
                i[f] = i.length++, l = o.name, l = l.substr(l.lastIndexOf(".") + 1).toLowerCase();
                if (!t.formats[l]) return t.onError && t.onError(t, "UPLOAD_ERR_FORMAT"), a(!0);
                l = o.fileSize || o.size;
                if (l === 0) return t.onError && t.onError(t, "UPLOAD_ERR_NO_FILE"), a(!0);
                if (l && l > t.maxFileSize) return t.onError && t.onError(t, "UPLOAD_ERR_FORM_SIZE"), a(!0);
                o.hash = f, t.files[f] = o, t.changedFiles[f] = o;
                if (t.mode === "upload") o.upload = new t.upload({
                    file: o,
                    onUpload: s
                });
                else {
                    if (t.mode !== "read") return a(!0);
                    u(o)
                }
            };
        t.changedFiles = {}, a()
    };
    this.createFileHash = function(e) {
        var t = {};
        t.name = e.name, t.src = e.src, t.size = e.size || e.fileSize, t.type = e.type;
        for (var e = JSON.stringify(t), t = 5381, n = 0, r = e.length; n < r; n++) var i = e[n].charCodeAt(),
            t = (t << 5) + t + i;
        return t
    }, this.setTranslation = function(e) {
        for (var t in e) this.translation[t] = e[t]
    }, this.translation = {
        UPLOAD_ERR_INI_SIZE: "The uploaded file exceeds the upload_max_filesize directive",
        UPLOAD_ERR_FORM_SIZE: "The uploaded file exceeds the MAX_FILE_SIZE directive",
        UPLOAD_ERR_PARTIAL: "The uploaded file was only partially uploaded",
        UPLOAD_ERR_NO_FILE: "No file was uploaded",
        UPLOAD_ERR_NO_TMP_DIR: "Missing a temporary folder",
        UPLOAD_ERR_CANT_WRITE: "Failed to write file to disk",
        UPLOAD_ERR_EXTENSION: "A PHP extension stopped the file upload",
        UPLOAD_ERR_FORMAT: "The uploaded file was an invalid format",
        UPLOAD_ERR_XHTTP: ""
    }, this.upload = function(e) {
        this.onUpload = e.onUpload, this.onProgress = e.onProgress, this.action = e.action || t.action, this.confirm = e.confirm || t.confirm, this.files = String(e.file).indexOf("[object") === 0 ? [e.file] : e.files, this.bytes = this.timeLapse = this.timeRemaining = this.transferPercent = this.transferTotal = this.transferSpeed = 0, t.onUpload && t.onUpload(this), window.FormData ? u(this, e.onUpload) : a(this, e.onUpload)
    };
    var o = function(e, t) {
        switch (Object.prototype.toString.call(e)) {
            case "[object Array]":
                for (var n = 0, r = e.length; n < r; n++) t(e[n]);
                break;
            case "[object Object]":
                for (n in e) t(e[n]);
                break;
            default:
                t(e)
        }
    }, u = function(e, n) {
        var r = new FormData;
        o(e.files, function(e) {
            if (typeof e.data != "undefined") r.append(e.name, e.data);
            else if (e.src && e.src.substr(0, 5) === "data:") {
                var t = JSON.stringify(e);
                r.append(e.name, t)
            } else r.append(e.hash, e)
        });
        var i = new XMLHttpRequest;
        i.upload.onprogress = function(n) {
            if (n.lengthComputable) {
                var r = n.loaded;
                e.transferPercent = Math.round(r * 100 / n.total), e.transferTotal = f(r);
                var i = (r - e.bytes) * 2;
                i !== 0 && (e.bytes = r, e.transferSpeed = f(i), e.timeRemaining = l((n.total - e.bytes) / i), e.timeLapse = l(Date.now() - n.timeStamp)), e.onProgress ? e.onProgress(e) : t.onProgress && t.onProgress(e)
            } else e.transferSpeed = 0, e.transferTotal = 0, e.transferPercent = 0, e.timeRemaining = 0
        }, i.onload = function(r) {
            o(e.files, function(e) {
                typeof e.date == "undefined" && (e.isUploaded = !0)
            });
            var i = r.target.responseText;
            if (e.confirm === "json") try {
                i = JSON.parse(i)
            } catch (s) {
                console.log(r.target.responseText)
            }
            t.translation[i] ? t.onError && t.onError(t, i) : (t.onLoad && t.onLoad(e, i), n && n(e, i))
        }, i.onerror = function(e) {
            t.onError && t.onError(t, "UPLOAD_ERR_XHTTP", e)
        }, i.onabort = function() {
            t.onAbort && t.onAbort(e)
        }, i.open("POST", e.action), i.send(r)
    }, a = function(e, n) {
        var r = document.createElement("form");
        document.body.appendChild(r);
        var i = document.createElement("iframe");
        i.setAttribute("id", "upload_iframe"), i.setAttribute("name", "upload_iframe"), i.setAttribute("width", "0"), i.setAttribute("height", "0"), i.setAttribute("border", "0"), i.setAttribute("style", "width: 0; height: 0; border: none;");
        var s = function() {
            try {
                var s = i.contentDocument.body
            } catch (u) {
                try {
                    s = i.contentWindow.document.body
                } catch (a) {
                    s = i.document.body
                }
            }
            if (s.innerHTML) {
                o(e.files, function(e) {
                    typeof e.date == "undefined" && (e.isUploaded = !0)
                }), s = s.innerHTML;
                if (e.confirm === "json") try {
                    s = JSON.parse(s)
                } catch (f) {
                    console.log(s)
                }
                t.translation[s] ? t.onError && t.onError(t, s) : (t.onLoad && t.onLoad(e, s), n && n(e, s))
            }
            setTimeout(function() {
                r.parentNode && r.parentNode.removeChild(r), t.fileInput.parent && t.fileInput.parent.appendChild(t.fileInput)
            }, 250)
        };
        i.addEventListener ? i.addEventListener("load", s, !0) : i.attachEvent && i.attachEvent("onload", s), r.appendChild(i), window.frames.upload_iframe.name = "upload_iframe", o(e.files, function(e) {
            if (typeof e.data != "undefined") {
                var n = document.createElement("input");
                n.type = "hidden", n.value = e.data, n.name = e.name
            } else e.src && e.src.substr(0, 11) === "data:image/" ? (n = document.createElement("input"), n.type = "hidden", n.value = JSON.stringify(e), n.name = e.name) : (n = t.fileInput, n.parent = n.parentNode, n.name = e.hash);
            r.appendChild(n)
        }), r.setAttribute("target", "upload_iframe"), r.setAttribute("action", e.action), r.setAttribute("method", "post"), r.setAttribute("enctype", "multipart/form-data"), r.setAttribute("encoding", "multipart/form-data"), r.submit()
    }, f = function(e) {
        return e > 1048576 ? Math.round(e * 100 / 1048576) / 100 + "MB" : e > 1024 ? Math.round(e / 1024) + "KB" : e + "B"
    }, l = function(e) {
        var t = e / 3600 >> 0,
            n = (e - t * 3600) / 60 >> 0,
            e = e - t * 3600 - n * 60;
        return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), e < 10 && (e = "0" + e), t + ":" + n + ":" + e
    };
    return this.dropAreaContainer && this.createDropArea(), (this.fakeInput || this.fileInput) && this.createFileInput(), this
};
var PI = Math.PI,
    RAD_DEG = 180 / PI,
    DEG_RAD = 1 / RAD_DEG,
    INFINITY = 4294967295;
(Random = function(e) {
    return this.seed = typeof e == "number" ? e : Math.random() * 2147483648 >> 0, this.n = Number(this.seed), this
}).prototype = {
    toInt: function() {
        return this.n = this.n * 16807 % 2147483647
    },
    toDouble: function() {
        return (this.n = this.n * 16807 % 2147483647) / 2147483647
    },
    intRange: function(e, t) {
        return e -= .4999, t += .4999, Math.round(e + (t - e) * ((this.n = this.n * 16807 % 2147483647) / 2147483647))
    },
    doubleRange: function(e, t) {
        return e + (t - e) * ((this.n = this.n * 16807 % 2147483647) / 2147483647)
    }
}, ScreenMetrics = function() {
    function e(t, n, r, i) {
        for (var s in n) typeof(i = n[s]) == "object" ? e(t, i, s) : (r && (t["px_" + s] = t["px_" + r] * t[r + "_" + s], t[r + "_" + i] = t[r + "_" + s] * t[s + "_" + i], t[r + "_px"] = 1 / t["px_" + r], t[i + "_" + r] = 1 / t[s + "_" + i] * 1 / t[r + "_" + s], t[s + "_" + r] = 1 / t[r + "_" + s]), t["px_" + i] = t["px_" + s] * t[s + "_" + i], t[s + "_px"] = 1 / t["px_" + s], t[i + "_px"] = 1 / t["px_" + s] * 1 / t[s + "_" + i], t[i + "_" + s] = 1 / t[s + "_" + i])
    }
    var t = function(e) {
        return n.style.fontSize = e, e / 1e4
    }, n = document.createElement("div");
    n.setAttribute("style", "position: absolute; width: 100em; height: 10000em; overflow: hidden;"), document.body ? document.body.appendChild(n) : console.log("document body not available");
    for (var r = "xx-small,x-small,small,medium,large,x-large,xx-large".split(","), i = 0, s = {}; i < r.length; i++) s[r[i] + "_px"] = t(r[i]);
    return s["%_px"] = t("100%") / 100, s.px_pt = 1 / t("1pt"), s.pt_pc = 1 / 12, s.px_in = 1 / t("72pt"), s.in_ft = 1 / 12, s.ft_yd = 1 / 3, s.px_mm = 25.4 * s.px_in, s.mm_cm = .1, s.cm_m = .01, s.px_ex = 1 / t("1ex"), s.ex_em = 1 / s.px_ex / t("1em"), document.body && document.body.removeChild(n), e(s, {
        pt: "pc",
        mm: {
            cm: "m"
        },
        "in": {
            ft: "yd"
        },
        ex: "em"
    }), s
};
var createHash = function(e) {
    for (var t = 5381, n = 0, r = e.length; n < r; n++) var i = e[n].charCodeAt(),
        t = (t << 5) + t + i;
    return t
};
window.addEventListener("load", function() {
    function e(e) {
        t(e), document.addEventListener("mousemove", t, !1), document.addEventListener("mouseup", n, !1), c = !0
    }
    function t(e) {
        !document.querySelector(".avgrund-active") && !c && ((e = e.clientX - u, e > f) ? (l === !0 && (l = !1, e = document.documentElement, e.className = e.className.replace("meny-active", "")), document.removeEventListener("mousemove", t, !1)) : e < a && (l === !1 && (l = !0, r(document.documentElement, "meny-active")), sketch.lazyloader(".meny .lazy")))
    }
    function n() {
        document.removeEventListener("mouseup", n, !1), c = !1
    }
    function r(e, t) {
        e.className = e.className.replace(/\s+$/gi, "") + " " + t
    }
    var i = document.querySelector(".meny"),
        s = document.querySelector(".meny-arrow");
    if (i && i.parentNode) {
        var o = i.parentNode;
        o.className += " meny-wrapper";
        var u = o.offsetLeft,
            a = 25,
            f = i.offsetWidth || 400,
            l = !1,
            c = !1,
            o = "WebkitPerspective" in document.body.style || "MozPerspective" in document.body.style || "msPerspective" in document.body.style || "OPerspective" in document.body.style || "perspective" in document.body.style;
        i.addEventListener("mousedown", e, !1), s.addEventListener("mousedown", e, !1),
        function() {
            if (window.location.hash.match("fold") && !document.body.className.match("meny-fold")) {
                r(document.body, "meny-fold");
                var e = document.createElement("div");
                e.className = "meny right", e.innerHTML = i.innerHTML + '<div class="cover"></div>', document.body.appendChild(e), r(i, "left")
            } else e = document.body, e.className = e.className.replace("meny-fold", ""), (e = document.querySelector(".meny.right")) && e.parentNode.removeChild(e)
        }(), o || (document.documentElement.className += " meny-no-transform"), document.documentElement.className += " meny-ready", window.setTimeout(function() {
            i.style.opacity = 1
        }, 150)
    }
});
var avgrundInit = function() {
    function e(e) {
        e.keyCode === 27 && n()
    }
    function t(e) {
        e.target === o && n()
    }
    function n() {
        document.removeEventListener("keyup", e, !1), o.removeEventListener("click", t, !1), i.className = i.className.replace("avgrund-active", ""), avgrund.active = !1
    }
    function r(e, t) {
        e.className = e.className.replace(/\s+$/gi, "") + " " + t
    }
    var i = document.documentElement,
        s = document.querySelector(".avgrund-popup"),
        o = document.querySelector(".avgrund-cover"),
        u = null;
    i.className = i.className.replace(/\s+$/gi, "") + " avgrund-ready", window.avgrund = {
        activate: function(n) {
            document.querySelector(".avgrund-active") || (document.addEventListener("keyup", e, !1), o.addEventListener("click", t, !1), s.className = s.className.replace(u, ""), r(s, "no-transition"), r(s, n), setTimeout(function() {
                s.className = s.className.replace("no-transition", ""), r(i, "avgrund-active")
            }, 0), u = n, avgrund.active = !0)
        },
        deactivate: n,
        disableBlur: function() {
            r(document.documentElement, "no-blur")
        }
    }
}, BlobBuilder = BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || function(e) {
        var t = function(e) {
            return Object.prototype.toString.call(e).match(/^\[object\s(.*)\]$/)[1]
        }, n = function() {
            this.data = []
        }, r = function(e, t, n) {
            this.data = e, this.size = e.length, this.type = t, this.encoding = n
        }, i = n.prototype,
            s = r.prototype,
            o = e.FileReaderSync,
            u = function(e) {
                this.code = this[this.name = e]
            }, a = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),
            f = a.length,
            l = e.URL || e.webkitURL || e,
            c = l,
            h = e.btoa,
            p = e.atob,
            d = !1,
            v = e.ArrayBuffer,
            m = e.Uint8Array;
        for (n.fake = s.fake = !0; f--;) u.prototype[a[f]] = f + 1;
        try {
            m && function(e) {
                d = !e
            }.apply(0, new m(1))
        } catch (g) {}
        return l.createObjectURL || (c = e.URL = {}), c.createObjectURL = function(e) {
            var t = e.type;
            t === null && (t = "application/octet-stream");
            if (e instanceof r) return t = "data:" + t, e.encoding === "base64" ? t + ";base64," + e.data : e.encoding === "URI" ? t + "," + decodeURIComponent(e.data) : h ? t + ";base64," + h(e.data) : t + "," + encodeURIComponent(e.data);
            if (real_create_object_url) return real_create_object_url.call(l, e)
        }, c.revokeObjectURL = function(e) {
            e.substring(0, 5) !== "data:" && real_revoke_object_url && real_revoke_object_url.call(l, e)
        }, i.append = function(e) {
            var n = this.data;
            if (m && e instanceof v) if (d) n.push(String.fromCharCode.apply(String, new m(e)));
            else for (var n = "", e = new m(e), i = 0, s = e.length; i < s; i++) n += String.fromCharCode(e[i]);
            else if (t(e) === "Blob" || t(e) === "File") {
                if (!o) throw new u("NOT_READABLE_ERR");
                i = new o, n.push(i.readAsBinaryString(e))
            } else e instanceof r ? e.encoding === "base64" && p ? n.push(p(e.data)) : e.encoding === "URI" ? n.push(decodeURIComponent(e.data)) : e.encoding === "raw" && n.push(e.data) : (typeof e != "string" && (e += ""), n.push(unescape(encodeURIComponent(e))))
        }, i.getBlob = function(e) {
            return arguments.length || (e = null), new r(this.data.join(""), e, "raw")
        }, i.toString = function() {
            return "[object BlobBuilder]"
        }, s.slice = function(e, t, n) {
            var i = arguments.length;
            return i < 3 && (n = null), new r(this.data.slice(e, i > 1 ? t : this.data.length), n, this.encoding)
        }, s.toString = function() {
            return "[object Blob]"
        }, n
    }(self);
window.requestAnimationFrame = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
        window.setTimeout(e, 1e3 / 60)
    }
}(), String.prototype.replaceAll = function(e, t) {
    if (typeof e == "object") {
        for (var n = this, r = 0; r < e.length; r++) n = n.split(e[r]).join(t[r]);
        return n
    }
    return this.split(e).join(t)
}, String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
}, String.prototype.ucfirst = function() {
    return this[0].toUpperCase() + this.substr(1)
}, String.prototype.ucwords = function() {
    return this.replace(/^(.)|\s(.)/g, function(e) {
        return e.toUpperCase()
    })
}, String.prototype.addslashes = function() {
    return this.replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0")
}, String.prototype.stripslashes = function() {
    return this.replace(/\0/g, "0").replace(/\\([\\'"])/g, "$1")
}, String.prototype.basename = function() {
    return this.replace(/\\/g, "/").replace(/.*\//, "")
}, String.prototype.lpad = function(e, t) {
    for (var n = this; n.length < t;) n = e + n;
    return n
}, String.prototype.rpad = function(e, t) {
    for (var n = this; n.length < t;) n += e;
    return n
}, window.STRING = String, STRING.prototype.replaceAll = STRING.prototype.replaceAll, STRING.prototype.trim = STRING.prototype.trim, STRING.prototype.ucfirst = STRING.prototype.ucfirst, STRING.prototype.ucwords = STRING.prototype.ucwords, STRING.
prototype.addslashes = STRING.prototype.addslashes, STRING.prototype.stripslashes = STRING.prototype.stripslashes, STRING.prototype.basename = STRING.prototype.basename, STRING.prototype.lpad = STRING.prototype.lpad, STRING.prototype.rpad = STRING.prototype.rpad;

/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */ (function(n, r, t, o, e, i, f) {
    function a(n) {
        var r, o, e = this,
            i = n.length,
            f = 0,
            a = e.i = e.j = e.m = 0;
        for (e.S = [], e.c = [], i || (n = [i++]); t > f;) e.S[f] = f++;
        for (f = 0; t > f; f++) r = e.S[f], a = d(a + r + n[f % i]), o = e.S[a], e.S[f] = o, e.S[a] = r;
        e.g = function(n) {
            var r = e.S,
                o = d(e.i + 1),
                i = r[o],
                f = d(e.j + i),
                a = r[f];
            r[o] = a, r[f] = i;
            for (var u = r[d(i + a)]; --n;) o = d(o + 1), i = r[o], f = d(f + i), a = r[f], r[o] = a, r[f] = i, u = u * t + r[d(i + a)];
            return e.i = o, e.j = f, u
        }, e.g(t)
    }
    function u(n, r, t, o, e) {
        if (t = [], e = typeof n, r && "object" == e) for (o in n) if (5 > o.indexOf("S")) try {
            t.push(u(n[o], r - 1))
        } catch (i) {}
        return t.length ? t : n + ("string" != e ? "\0" : "")
    }
    function c(n, r, t, o) {
        for (n += "", t = 0, o = 0; n.length > o; o++) r[d(o)] = d((t ^= 19 * r[d(o)]) + n.charCodeAt(o));
        n = "";
        for (o in r) n += String.fromCharCode(r[o]);
        return n
    }
    function d(n) {
        return n & t - 1
    }
    r.srand = function() {
        return Math.random()
    }, r.seedrandom = function(d, g) {
        var h, s = [];
        return d = c(u(g ? [d, n] : arguments.length ? d : [(new Date).getTime(), n, window], 3), s), h = new a(s), c(h.S, n), r.srand = function() {
            for (var n = h.g(o), r = f, a = 0; e > n;) n = (n + a) * t, r *= t, a = h.g(1);
            for (; n >= i;) n /= 2, r /= 2, a >>>= 1;
            return (n + a) / r
        }, d
    }, f = r.pow(t, o), e = r.pow(2, e), i = 2 * e, c(r.srand(), n)
})([], Math, 256, 6, 52), window.DWait && DWait.run("jms/lib/seededRandom.js");
if (window.DWait) {
    DWait.count()
}

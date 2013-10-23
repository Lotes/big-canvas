/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
DWait.ready(["jms/lib/difi.js"], function() {
    window.MenuTraffic = {
        cache: {},
        register: function(i, t) {
            this.registry.push([i, t])
        },
        registry: [],
        titles: [],
        get: function(i) {
            var t, e, r;
            if ((t = this.cache[i]) && !this.cache[i]["volatile"]) {
                if (this.shout(i), null == t.children || !t.children[0].path) return;
                if (this.cache[t.children[0].path.join("/")]) return;
                if (MenuTraffic.no_prefetch) return;
                for (r = 0; t.children[r] && null == t.children[r].children; r++);
                if (!t.children[r]) return
            } else if ((e = this.overrides[i.split("/")[0]]) && (t = e.call(this, i))) return 1 != t && (this.cache[i] = t, this.shout(i)), void 0;
            DiFi.pushPrivateGet("Menu", "get", [i, 2], this.difi_got, this), MenuTraffic.AUTO_DIFI_OFF || DiFi.send()
        },
        difi_got: function(i, t) {
            this.got.call(this, i, t.request.args[0], t.response.content, !0)
        },
        got: function(i, t, e) {
            var r, h, n, s;
            if (i) {
                if (this.cache[t] = e, e.path instanceof Array && (n = e.title_path)) for (h = 0; h != n.length; h++) this.titles[e.path.slice(0, h + 1).join("/")] = n[h];
                if (r = e.children) for (h = 0; r[h]; h++) {
                    if (r[h].children && r[h].children.length) for (this.cache[r[h].path.join("/")] = r[h], s = 0; r[h].children[s]; s++) this.titles[r[h].children[s].path.join("/")] = r[h].children[s].title;
                    this.titles[r[h].path.join("/")] = r[h].title
                }
            } else delete MenuTraffic.cache[t];
            this.shout(t)
        },
        shout: function(i) {
            var t, e;
            for (e = this.cache[i], t = -1; this.registry[++t];) this.registry[t][0].call(this.registry[t][1], i, e)
        },
        overrides: {},
        getTitles: function(i) {
            var t, e, r, h;
            for (t = i.split("/"), h = [], e = 0; e != t.length; e++) r = t.slice(0, e + 1).join("/"), MenuTraffic.titles[r] ? h.push(MenuTraffic.titles[r]) : MenuTraffic.cache[r] && h.push(MenuTraffic.cache[r].title || t[e]);
            return h
        }
    }, window.DWait && DWait.run("jms/lib/menutraffic.js")
});
window.Pager = {
    more: {},
    overrides: [],
    create: function(e) {
        var a, t, i;
        if (Browser.isIE) try {
            document.execCommand("BackgroundImageCache", !1, !0)
        } catch (r) {}
        return e = e || {}, t = e.paned ? $("<div>", {
            "class": "pager-panes pager-" + e.theme
        }) : $("<div>", {
            "class": "pager-holder pager-" + e.theme
        }), e.auto_height, e.breadcrumb_stack && t.addClass("pager-holder-stackable"), i = $("<div>", {
            "class": "jsid-pager " + (e.class_name || "pager2")
        }), e.icon_set && i.addClass("pager2-icons iconset-" + e.icon_set), i.appendTo(t), a = {
            options: e,
            node: t.get(0),
            pages: {},
            selection: e.selection
        }, t.data("pager", a), MenuTraffic.register(Pager.dataAvailable, a), a
    },
    getFromNode: function(e) {
        return $($(e).closest("div.jsid-pager")[0].parentNode).data("pager")
    },
    render: {
        page: function(e, a, t) {
            var i = t.split("/"),
                r = $("<div>", {
                    "class": "page2"
                });
            if ("artid" == i[0]) return !1;
            if (!e.options.paned && (a.length > 1 || a[0])) {
                for (var s = $("<div>", {
                    "class": "top"
                }).appendTo(r); a.length && (i.pop(), $("<a>", {
                    "class": "f " + (e.options.breadcrumb_stack ? "bareback" : "back"),
                    href: "",
                    menuri: i.join("/"),
                    css: e.options.breadcrumb_stack ? {
                        textIndent: "10px",
                        paddingLeft: Math.max(0, - 3 + 8 * (a.length - 1)) + "px"
                    } : {},
                    text: e.options.breadcrumb_stack ? MenuTraffic.titles[i.join("/")] || (1 == i.length ? "All Categories" : i[i.length - 1]) : "Back"
                }).click(function(e) {
                    Pager.clickBack(this) || e.preventDefault()
                }).prependTo(s), e.options.breadcrumb_stack);) a.pop();
                r.append($("<div>", {
                    "class": "busy pagescroll pagescroll-space"
                }))
            } else r.append($("<div>", {
                "class": "busy pagescroll"
            }));
            return r[0]
        },
        menuHTML: function(e, a, t) {
            function i(e, a) {
                var t;
                return e ? (t = "gallery" == a[0] ? 2 : 1, e[0] + "/" + (a.length > t ? a.slice(t).join("/") + "/" : "") + (e[1] || "")) : ""
            }
            var r, s, l, n, o, p, d, c;
            for (r = [], p = a.disable_clicks ? "" : ' onclick="return Pager.clickBack(this) ? true : Events.stop();" ', a.href_base && (o = a.href_base.split("%s"), o[1] || (o[1] = ""), o[0] = o[0].replace(/\/$/, "")), a.master_links && (d = "string" == typeof e.all ? e.all : e.title ? e.title + ": All" : "All", d && r.push('<a menuri="' + e.path.join("/") + '" href="' + (e.href || i(o, e.path)) + '" class="f" ' + p + ">" + d + "</a>")), n = 0; n != Pager.overrides.length; n++) if (s = Pager.overrides[n](e, a, r, p, t)) return a.return_html_as_array ? s : s.join("");
            for (n = 0; l = e.children[n]; n++) void 0 != c && l.flag != c && r.push('<div class="hr">-</div>'), c = l.flag, html_click = "", href = l.href || i(o, l.path), html_class = null != l.children ? "f more" : "f", l.children && a.more_links ? (r.push('<a menuri="' + e.children[n].path.join("/") + '" href="' + href + '" class="rr f more" ' + p + ">more</a>"), r.push('<a menuri="' + e.children[n].path.join("/") + '" href="' + href + '" class="ll f" ' + p + ">")) : (e.children[n].path ? r.push('<a menuri="' + e.children[n].path.join("/") + '" ') : r.push("<a "), r.push('href="' + href + '" class="' + html_class + '" ' + p + ">")), a.icon_base_url && l.icon ? r.push('<img src="' + a.icon_base_url + l.icon + '" alt=""/> ') : a.icon_set && l.icon && r.push('<i class="icon i' + l.icon + '"></i> '), r.push(l.title + "</a>");
            return r.join("")
        }
    },
    loadPage: function(e, a, t, i) {
        var r;
        r = e.pages[a], r ? (Pager.pageSelect(e, r.node), Pager.showPage(e, a, t, i), Pager.pageDisplayed(e, a)) : (r = e.pages[a] = {
            node: Pager.render.page(e, a.substr((e.options.rootri + "/" || "").length).split("/"), a),
            ready: !1
        }, e.options.paned || Events.hook(r.node, "contextmenu", Pager.backBack), Pager.showPage(e, a, t, i), MenuTraffic.get(a))
    },
    select: function(e, a) {
        var t;
        return e.selection = a, e.options.input && (e.options.input.value = $('.popup2 a[menuri="' + a + '"]').text()), e.options.callback && (t = e.options.callback.call(e.options.callback_object || window, a, e)), t
    },
    backBack: function() {
        var e;
        return e = $(this).closest("div.page2").find("a.back").get(0), e && Pager.clickBack(e), !1
    },
    clickBack: function(e, a) {
        var t, i;
        return e ? (e.blur(), t = Pager.getFromNode(e), !t.options.editable || $(e).hasClass("more") || $(e).hasClass("back") || $(e).hasClass("backback") ? (i = $(e).closest("div.page2")[0], a || (a = e.getAttribute("menuri")), $(e).hasClass("more") ? (t.options.callback_immediately && Pager.select(t, a), t.options.paned && (Pager.pageSelect(t, i), $(e).addClass("more-selected")), Pager.loadPage(t, a, i, "next"), !1) : $(e).hasClass("back") || $(e).hasClass("backback") ? (t.options.callback_immediately && Pager.select(t, a), Pager.loadPage(t, a, i, "previous"), !1) : t.options.input || t.options.callback ? (t.options.paned && Pager.clearPages(t, i, "next"), Pager.select(t, a) ? !0 : (Pager.pageSelect(t, i, e), !1)) : !0) : (Pager.editOn(e), !1)) : !1
    },
    dataAvailable: function(e, a) {
        this.pages[e] && !this.pages[e].ready && (void 0 == a ? Pager.pageFail(this, e) : Pager.pageReady(this, e, a))
    },
    pageFail: function(pager, ri) {
        with($("div.pagescroll", pager.pages[ri].node)[0]) className = className.replace(/\bbusy\b/, "broken");
        delete pager.pages[ri]
    },
    pageReady: function(pager, ri, data) {
        var page, page_html;
        if (null == data.children) return ri.indexOf("/") > 0 && Pager.loadPage(pager, ri.split("/").reverse().slice(1).reverse().join("/")), void 0;
        with(page = pager.pages[ri], page.ready, page_html = Pager.render.menuHTML(data, pager.options, page.node), $("div.pagescroll", page.node)[0]) {
            for (className = className.replace(/\bbusy\b/, ""); firstChild;) removeChild(firstChild);
            $($("div.pagescroll", page.node)[0]).html(page_html)
        }
        Pager.pageSelect(pager, page.node), page.ready = !0, Pager.pageDisplayed(pager, ri)
    },
    pageDisplayed: function(e, a) {
        e.ri = a, e.options.paned && e.jump_target && (0 == e.jump_target.indexOf(a) ? Pager.more.jumpThrough(e, e.pages[a].node, a) : e.jump_target = null), e.options.auto_height && this.adjustHeight(e)
    },
    pageSelect: function(e, a, t) {
        var i, r, s, l, n, o;
        "string" == typeof e.selection && (r = e.selection.split("/"), i = r.pop().split("-"), i.length > 1 ? (s = r.concat([i[1]]).join("/"), r = r.concat([i[0]]).join("/")) : r = e.selection, l = $("div.pagescroll a.f", a), e.options.paned && l.filter(".more").removeClass("more-selected"), l.filter(":not(.more)").each(function() {
            var a = $(this);
            o = !1, s ? a.attr("menuri") == r ? (r = s, n = !n, o = !0) : o = n : a.attr("menuri") == r && a[0] == (t || a[0]) && (o = !0), o && !e.options.no_selected_class ? a.addClass("selected") : a.removeClass("selected")
        }))
    },
    clearPages: function(e, a, t) {
        for (e.options.paned, t += "Sibling"; a[t];) a.parentNode.removeChild(a[t])
    },
    adjustHeight: function(e, a) {
        a = a || e.pages[e.ri].node;
        var t = $("div.top", a)[0],
            i = t ? t.offsetHeight : 0,
            r = $("div.pagescroll", a)[0];
        if (r = r ? r.children : !1) for (var s = r.length - 1; s >= 0; s--) i += r[s].offsetHeight;
        e.node.style.height = i + "px", e.options.adjust_height_callback && e.options.adjust_height_callback.call(this, e, a, i)
    },
    showPage: function(e, a, t, i) {
        var r;
        if (r = e.pages[a].node, r === !1 && window.SuperArtSubmitZoneJapan) return window.SuperArtSubmitZoneJapan.finish(e.node), void 0;
        if (t)("previous" != i || t.previousSibling != r) && Pager.clearPages(e, t, i), r.style.left = Math.max(window.SuperArtSubmitZoneJapan && window.SuperArtSubmitZoneJapan.from_inline_editor ? 220 : 0, parseInt(t.style.left, 10) + t.offsetWidth * ("next" == i ? 1 : -1)) + "px";
        else {
            for (i = "next", r.style.left = 0; e.node.firstChild.firstChild;) e.node.firstChild.removeChild(e.node.firstChild.firstChild);
            e.node.firstChild.style.width = "auto"
        }
        if ("next" == i ? e.node.firstChild.appendChild(r) : ("previous" != i || t.previousSibling != r) && e.node.firstChild.insertBefore(r, t), t) if (e.options.paned) {
            e.node.firstChild.style.width = parseInt(e.node.firstChild.lastChild.style.left) + t.offsetWidth + "px";
            var s = 0 > $.inArray(a, e.options.no_scroll || []);
            s && (e.node.scrollLeft = parseInt(t.style.left) + t.offsetWidth)
        } else Station.push(e.node.firstChild, "left", {
            from: parseInt(e.node.firstChild.style.left || 0),
            to: -parseInt(r.style.left),
            f: Interpolators.pulse,
            time: 350
        });
        else e.node.firstChild.style.left = 0;
        e.last_loaded_ri = a
    },
    reload: function(e) {
        var a;
        a = e.last_loaded_ri || e.options.rootri, delete e.pages[a], Pager.loadPage(e, a)
    },
    editOn: function(e) {
        var a;
        e.getAttribute("menuri") && 1 != e.lastChild.nodeType && (a = e.lastChild.nodeValue, e.getAttribute("pager_original_text") || e.setAttribute("pager_original_text", a), e.removeChild(e.lastChild), $("<input>", {
            "class": "itext",
            type: "text",
            value: a,
            blur: function() {
                Pager.editOff(this.parentNode)
            },
            keypress: function(e) {
                13 == e.keyCode && this.blur()
            }
        }).appendTo(e), e.lastChild.focus())
    },
    editOff: function(e) {
        var a;
        a = e.lastChild.value, e.removeChild(e.lastChild), e.appendChild(document.createTextNode(a || "???"))
    }
}, window.DWait && DWait.run("jms/lib/pager.js");
DWait.ready(["jms/lib/pager.js", "jms/lib/menutraffic.js"], function() {
    Pager.overrides.push(function(e, i, s, t) {
        function r(e) {
            return e = e.toLowerCase(), e = e.replace(/ /g, "_"), e = e.replace(/[^a-z0-9\-_]/g, ""), "wow" == e && (e = "surprise"), e
        }
        var a, o, n, h;
        if ("mood" == e.path[0]) {
            for (o = "", n = 1; n != e.path.length; n++) o += r(MenuTraffic.cache[e.path.slice(0, n + 1).join("/")].title) + "/";
            for (n = 0; a = e.children[n]; n++) a.children ? s.push('<a menuri="' + a.path.join("/") + '" href="/" onmouseover="if (!Browser.isIE)this.style.height = (this.nextSibling.offsetHeight-1) + \'px\';$(this.nextSibling).addClass(\'highlight\')" onmouseout="$(this.nextSibling).removeClass(\'highlight\')" class="rr f more" ' + t + '>more</a><a menuri="' + a.path.join("/") + '" href="/" class="ll f" ' + t + ">") : (a.path ? s.push('<a menuri="' + a.path.join("/") + '" ') : s.push("<a "), s.push('href="/" class="f" ' + t + ">")), h = o + r(a.title) + ".gif", i.icon_base_url = i.icon_base_url || "http://e.deviantart.com/emoticons/moods/", s.push('<img src="' + i.icon_base_url + h + '" alt=""/> '), s.push(a.title + "</a>");
            return s
        }
        return !1
    }), window.DWait && DWait.run("jms/lib/pager.js.mood.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/popup2.js", "jms/lib/jquery/jquery.current.js", ".domready"], function() {
    DWait.init("Popup2.menu", function(n) {
        $(n).on("click.popup2menu", function() {
            var n = $(this);
            return n.data("menuri"), e.create(n, {
                menuRI: n.data("menuri")
            })
        })
    });
    var e = window.Popup2Menu = Base.extend({}, {
        inc: 0,
        create: function(n, t) {
            var i = {
                classes: "",
                popupRootRI: null,
                menuRI: "",
                onFloaterSelection: null,
                input: null
            };
            t = $.extend({}, i, t);
            var o = t.menuRI.split("/");
            e.inc++;
            var a = new Popup2("pagerMenu" + e.inc, "body", {
                classes: "click-menu " + t.classes,
                destroy: !0
            }),
                r = Pager.create({
                    rootri: t.popupRootRI || o[0],
                    href_base: n.attr("href"),
                    more_links: "mood" == o[0],
                    master_links: o[0] in {
                        art: 1,
                        gallery: 1
                    },
                    theme: "dark",
                    icon_set: "deviate" == t.menuRI ? "deviate" : null,
                    input: $("#" + t.input).get(0),
                    callback: function(e) {
                        return Popup2.hideAll(), t.onFloaterSelection ? (this.attr("floaterresult", e), t.onFloaterSelection.call(this, e), !1) : t.input ? !1 : !0
                    },
                    callback_object: n
                });
            return Pager.loadPage(r, t.menuRI), DiFi.send(), a.content = $(r.node), a.show(a.position(n)), !1
        }
    });
    window.DWait && DWait.run("jms/lib/popup2menu.js")
});
if (window.DWait) {
    DWait.count()
}

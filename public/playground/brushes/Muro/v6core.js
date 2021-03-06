/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
window.FilmBox = {
    hover: function(t) {
        var i = $(t),
            o = i.width(),
            n = i.find("b.film");
        Station.stopAnimation(n[0]);
        for (var r = parseInt(Station.read(n[0], "left")) || 0, a = [n[0], "left", {
            from: r,
            to: r,
            time: 500
        }]; r > -(5 * o);) a = a.concat([{
            from: r,
            to: r = r - o - r % o,
            time: 300,
            f: Interpolators.pulse
        }, {
            from: r,
            to: r,
            time: 700
        }]);
        Station.run.apply(Station, a)
    },
    out: function(t) {
        $filmstrip = $(t).find("b.film"), Station.stopAnimation($filmstrip[0]), Station.run($filmstrip[0], "display", {
            to: "block",
            time: 25
        }, "left", {
            from: parseInt(Station.read($filmstrip[0], "left") || 0),
            to: 0,
            f: Interpolators.pulse,
            time: 600
        })
    }
}, window.DWait && DWait.run("jms/lib/filmbox.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/quicktip.js", ".domready"], function() {
    (function(s) {
        s(document).on("mouseover", "span.user-symbol", function() {
            if (s(this).data("show-tooltip")) {
                var o = !0;
                s(this).on("mouseleave", function() {
                    o = !1
                });
                var i = this;
                setTimeout(function() {
                    o && QuickTip.show(i, "symbol")
                }, 500)
            }
        }).on("click", "span.user-symbol", function(o) {
            o.preventDefault();
            var i = s(this);
            i.closest(".symbols-modal").size() || (i.data("clickthrough") ? window.location.href = i.data("clickthrough") : (DiFi.pushPublicGet("User", "getSymbolsModal", [], function(o, i) {
                if (o) {
                    var t = s('<div class="symbols-modal">');
                    t.html(i.response.content.html);
                    var e = Modals.factory(t);
                    Modals.push(e)
                }
            }), DiFi.send()))
        })
    })(jQuery), window.DWait && DWait.run("jms/lib/deviantsymbols.js")
});
DWait.init("Friends", function(n) {
    $(n).on("click.friends-menu", $.throttle(500, function() {
        Friends.open(this)
    }))
}), window.DWait && DWait.run("jms/pages/friendsmenu.js");
DWait.ready(["jms/lib/minibrowse.view.js", "jms/lib/pubsub.js", "jms/lib/analytics.js", "jms/lib/cbc.js"], function() {
    (function(e) {
        var t = {
            _has_next: !1,
            _has_prev: !1,
            _has_mobile_ad: !0,
            _textad_suppressed: !1,
            _current_item_id: null,
            _reload_anchor: null,
            _print_tabs_def: null,
            constructor: function() {
                PubSub.subscribe([{
                    eventname: "MinibrowseView.take_over_page",
                    subscriber: this,
                    callback: this.da__handlers.take_over_page
                }, {
                    eventname: "MinibrowseView.restore_page",
                    subscriber: this,
                    callback: this.da__handlers.restore_page
                }, {
                    eventname: "MinibrowseView.populate_main",
                    subscriber: this,
                    callback: this.da__handlers.populate_main
                }, {
                    eventname: "MinibrowseView.populate_extra",
                    subscriber: this,
                    callback: this.da__handlers.populate_extra
                }, {
                    eventname: "MinibrowseView.preload_main",
                    subscriber: this,
                    callback: this.da__handlers.preload_main
                }, {
                    eventname: "MinibrowseView.preload_extra",
                    subscriber: this,
                    callback: this.da__handlers.preload_extra
                }, {
                    eventname: "MinibrowseView.populate_failed",
                    subscriber: this,
                    callback: this.da__handlers.populate_failed
                }, {
                    eventname: "MinibrowseView.init_extras",
                    subscriber: this,
                    callback: this.da__handlers.init_extras
                }, {
                    eventname: "Duperbrowse.has_next",
                    subscriber: this,
                    callback: this.da__handlers.has_next
                }, {
                    eventname: "Duperbrowse.has_prev",
                    subscriber: this,
                    callback: this.da__handlers.has_prev
                }, {
                    eventname: "Duperbrowse.opened",
                    subscriber: this,
                    callback: this.da__handlers.opened
                }, {
                    eventname: "Duperbrowse.pageload_failed",
                    subscriber: this,
                    callback: this.da__handlers.pageload_failed
                }, {
                    eventname: "Duperbrowse.disable_paddle",
                    subscriber: this,
                    callback: this.da__handlers.disable_paddle
                }, {
                    eventname: "ProductTabsLoader.loaded",
                    subscriber: this,
                    callback: this.da__handlers.print_tabs_loaded
                }])
            },
            da__handlers: {
                populate_main: function() {
                    PubSub.publish("PageViewTracker.pageview", {
                        page: "/vpv" + Glbl("Location.path"),
                        tag: "Dynamic.Deviation"
                    }), window.DDD && (DDD.subject = null);
                    var e = this._get_container();
                    e.find("iframe.madefire-player").length && e.addClass("madefire"), vms_feature("new_devpage") && e.find(":gmi(DeviationPageView)").removeClass("duper-loading")
                },
                populate_extra: function(t, i) {
                    var a, n = this._get_container(),
                        o = this._get_about(),
                        s = this._get_meta(),
                        r = [];
                    if (i.edit === !0) DWait.ready(["jms/pages/ile/ile.js"], e.proxy(function() {
                        o.html(i.content.html_col1), s.html(i.content.html_col2), n.prepend(o.find("#ile-container")), PubSub.publish("InlineEditor.open"), n.show(), this._init_deviation_extras(i, o, s)
                    }, this));
                    else {
                        if ((vms_feature("helloandre") || vms_feature("new_devpage")) && "prints" == Glbl("PurchaseAutoload.purchase") && (this._print_tabs_def = e.Deferred(), r.push(this._print_tabs_def)), vms_feature("new_devpage")) {
                            var d = e.Deferred();
                            r.push(d), a = new CBC(function() {
                                d.resolve()
                            })
                        }
                        r.length && (o.hide(), s.hide(), e.when.apply(e, r).done(function() {
                            o.show(), s.show(), PubSub.publish("DeviationExtras.shown")
                        })), o.html(i.content.html_col1), s.html(i.content.html_col2), this._init_deviation_extras(i, o, s)
                    }
                    i.content && (gWebPage.update(i.content, a), a && a.start()), PubSub.publish("DaGa.track_tao_pageview", {
                        page: "deviation"
                    }), PubSub.publish("DaGa.track_artist_private_pageview", {
                        artist_analytics_id: i.content.artist_analytics_id
                    })
                },
                take_over_page: function() {
                    this._get_container().css("min-height", e(window).height()), e("#depths").appendTo("body"), e("#depths").show(), "hidden" == (((deviantART.pageData.tao || {}).tests || {}).deviationfooter || {}).group && e("#depths").hide(), "removed" == (((deviantART.pageData.tao || {}).tests || {}).deviationfooter || {}).group && e("#footer-pane-extra, #footer-pane-channels").hide(), PubSub.publish("DeviationAds.minibrowse_init"), window.Popup2 && Popup2.hideAll(), this._take_over_overhead_box(), this._add_loading_text()
                },
                restore_page: function() {
                    this._restore_overhead_box(), this._current_item_id = null, "hidden" == (((deviantART.pageData.tao || {}).tests || {}).deviationfooter || {}).group && e("#depths").show(), "removed" == (((deviantART.pageData.tao || {}).tests || {}).deviationfooter || {}).group && e("#footer-pane-extra, #footer-pane-channels").show(), e("#ile-container").empty(), Glbl("InlineEditor.loaded", !1)
                },
                has_next: function(e, t) {
                    this._has_next = Boolean(t)
                },
                has_prev: function(e, t) {
                    this._has_prev = Boolean(t)
                },
                opened: function(e, t) {
                    this.debugging && console.log("[MinibrowseView] Duperbrowse has been opened"), this._current_item_id = t.id
                },
                preload_main: function(t, i) {
                    var a = i.content;
                    if (e.isPlainObject(a)) switch (a.pageData.deviation_preload_type) {
                        case "image":
                            var n = e(":gmi(ResViewSizer_img)", a.html).first();
                            this._preload_image(n.attr("src"));
                            break;
                        case "embed":
                            this._preload_image(a.pageData.deviation_preload_file);
                            break;
                        case "html":
                            this._preload_html(a.html);
                            break;
                        case "none":
                            break;
                        default:
                            this.debugging && console.log("[MinibrowseView] unknown preload type:", a.pageData.deviation_preload_type)
                    }
                },
                preload_extra: function(t, i) {
                    var a = i.content,
                        n = e("img.avatar", a.html_col1).first();
                    this._preload_image(n.attr("src"))
                },
                populate_failed: function(t, i) {
                    ddt.trace("minibrowse", "populate failed", i);
                    var a = '<div><h1 style="color:#607066;text-align:center;padding-top:4em;">An error occurred while displaying this deviation</h1><p style="text-align:center;">Please visit <a href="' + Glbl("Location.path") + '">the deviation page</a> to try again.</p>' + "</div>";
                    vms_feature("new_devpage") ? e(".dev-page-container.minibrowse-container").html(a) : e("div#dv7").html(a)
                },
                pageload_failed: function() {
                    var t = '<div><h1 style="color:#607066;text-align:center;padding-top:4em;">An error occurred while loading the next set of deviations</h1><p style="text-align:center;">Please try again.</p></div>';
                    vms_feature("new_devpage") ? e(".dev-page-container.minibrowse-container").html(t) : e("div#dv7").html(t)
                },
                disable_paddle: function(t, i) {
                    var a = i === !0 ? ".minibrowse_prev" : ".minibrowse_next";
                    e(a, window.da_overhead_box.$node).addClass("disabled")
                },
                init_extras: function(e, t) {
                    this._init_deviation_extras(t, this._get_about(), this._get_meta())
                },
                print_tabs_loaded: function() {
                    this._print_tabs_def && this._print_tabs_def.resolve()
                }
            },
            _preload_html: function(t) {
                if (t) {
                    this.debugging && console.log("[MinibrowseView] preloading HTML");
                    var i = this._make_preloader(e("<iframe><html><body></body></html></iframe>")).find("body").html(t).each(function() {
                        e(this).find("embed, object").remove()
                    }).end().appendTo("body");
                    return i
                }
            },
            _preload_image: function(t) {
                if (t) {
                    this.debugging && console.log("[MinibrowseView] preloading image", t);
                    var i = this._make_preloader(e("<img>")).attr("src", t).appendTo("body");
                    return i
                }
            },
            _make_preloader: function(t) {
                return t.css({
                    position: "absolute",
                    top: -100,
                    left: -100,
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    visibility: "hidden"
                }).load(function() {
                    e(this).remove()
                })
            },
            _take_over_overhead_box: function() {
                var t = (window.da_overhead_box.$node, ""),
                    i = this._has_prev ? "" : " disabled",
                    a = this._has_next ? "" : " disabled";
                t += '<td class=f><a href="javascript:void(0)" class="gmbutton2 gmhuge gmbutton2top ntfirst minibrowse_prev' + i + '"><img src="//st.deviantart.net/minish/main/superbrowse/3dleft.png" alt="Left" width=8 height=9> Prev</a></td>', t += '<td class=f><a href="javascript:void(0)" class="gmbutton2 gmhuge gmbutton2top ntmid minibrowse_close">&nbsp;<img src="//st.deviantart.net/minish/main/superbrowse/3dback.png" alt="All" width=9 height=9> All&nbsp;</a></td>', t += '<td class=f><a href="javascript:void(0)" class="gmbutton2 gmhuge gmbutton2top ntlast minibrowse_next' + a + '">Next <img src="//st.deviantart.net/minish/main/superbrowse/3dright.png" alt="Right" width=8 height=9></a></td>', window.da_overhead_box.setHTML(t), window.da_overhead_box.$node.data("minibrowse_paddles_bound") || window.da_overhead_box.$node.data("minibrowse_paddles_bound", !0).on("click.minibrowse", ".minibrowse_prev", function() {
                    return e(this).hasClass("disabled") || PubSub.publish("Minibrowse.prev_click"), !1
                }).on("click.minibrowse", ".minibrowse_next", function() {
                    return e(this).hasClass("disabled") || PubSub.publish("Minibrowse.next_click"), !1
                }).on("click.minibrowse", ".minibrowse_close", function() {
                    return PubSub.publish("Minibrowse.close_click"), !1
                });
                var n = e(document.body);
                if (!n.data("minibrowse_keys_bound")) {
                    var o = this;
                    n.data("minibrowse_keys_bound", !0).on("keydown.minibrowse", function(e) {
                        o._get_eventname_from_keypress(e) && e.preventDefault()
                    }).on("keyup.minibrowse", function(e) {
                        var t = o._get_eventname_from_keypress(e);
                        t && (window.Popup2 && Popup2.hideAll(), PubSub.publish(t))
                    })
                }
            },
            _get_eventname_from_keypress: function(t) {
                var i = {
                    39: "Minibrowse.next_click",
                    37: "Minibrowse.prev_click",
                    27: "Minibrowse.close_click"
                };
                if (i[t.which] && !(t.metaKey || t.altKey || t.shiftKey || t.ctrlKey)) {
                    var a = e(t.target);
                    if (!(t.target.isContentEditable || a.attr("contenteditable") || a.is(":input")) || !a.is(":visible")) return i[t.which]
                }
            },
            _restore_overhead_box: function() {
                e(document.body).off(".minibrowse").removeData("minibrowse_keys_bound"), window.da_overhead_box.$node.off(".minibrowse").removeData("minibrowse_paddles_bound"), window.da_overhead_box.setHTML(null)
            },
            _add_loading_text: function() {
                var t = e('<h1 class="loading_text" style="color:#607066;text-align:center;padding:4em 0">Loading...</h1>'),
                    i = function() {
                        t.animate({
                            opacity: .3
                        }, 700, a)
                    }, a = function() {
                        t.animate({
                            opacity: .99
                        }, 700, i)
                    };
                vms_feature("new_devpage") ? this._get_container().find(":gmi(DeviationPageView)").addClass("duper-loading").find(".dev-view-deviation").append(t) : e(":gmi(ResourcePageDisplayPane)", "body > div#dv7").append(t), i()
            },
            _init_deviation_extras: function(t, i, a) {
                if (Glbl("ResView.message_button") === !0) {
                    Glbl.del("ResView.message_button"), buttons = a.add(i).find(":gmi(ResourceViewMessageButton)").gmi();
                    for (var n = 0, o = buttons.length; o > n; n++) buttons[n].render()
                }
                buttons = GMI.query(i[0], "GPageButton").concat(GMI.query(i[0], "GMoodButton"));
                for (var n = 0, o = buttons.length; o > n; n++) e(buttons[n].gmi_node).on("click.comments_pager", this._comments_pager_click.bindTo(this)), buttons[n].gmi_node.eventonclickclaimed = 1;
                PubSub.publish("DeviationAds.minibrowse_populate", t), deviantART && deviantART.pageData.is_not_favouritable && e("#zoomed-in").addClass("no-lub"), t.content.pageData && 1 == t.content.pageData.deviation_has_print ? PubSub.publish("DaGa.track_event", {
                    category: "Deviation",
                    action: 1 == t.content.pageData.deviation_has_printtabs ? "printtabs_pageview" : "printbutton_pageview"
                }) : (((window.deviantART || {}).pageData || {}).deviation_has_print = 0, ((window.deviantART || {}).pageData || {}).deviation_has_printbutton = 0, ((window.deviantART || {}).pageData || {}).deviation_has_printtabs = 0), e(":gmi(ResourceViewFavouriteButton)", a).gmi(), e(":gmi(ResourceViewPrintButton)", a).gmi(), e(":gmi(ResourceViewWatchButton)", a).gmi(), e(":gmi(ResourcePageBtfDockAd)", a).gmi(), e(":gmi(ResourceViewShare)", a).gmi(), e(":gmi(ResourceStream)", a).gmi();
                var s = this._get_container();
                if (DWait.ready(["jms/pages/ccommentthread.js"], function() {
                    e(":gmi(CCommentThread)", s).gmi()
                }), this._reload_anchor) {
                    var r = e("a[id=" + this._reload_anchor + "]").first().offset().top,
                        d = e(window).scrollTop();
                    r > d && d + e(window).height() > r || e(window).scrollTop(r), this._reload_anchor = null
                }
                PubSub.publish("DeviationExtras.loaded")
            },
            _comments_pager_click: function(t) {
                var i = 0,
                    a = !1,
                    n = e(t.currentTarget),
                    o = {};
                if (n.attr("gmi-offset") && (i = n.attr("gmi-offset"), a = !0, o.offset = i), "GMoodButton" == n.data("gmiclass")) {
                    o.offset = i;
                    var s = n.attr("href").match(/moodonly=(\d+)/);
                    s ? (o.moodonly = s[1], a = !0) : n.hasClass("moodx") && (a = !0)
                }
                if (window.PaginationGoto) {
                    window.PaginationGoto.clearSuperbrowsableData();
                    var r = GMI.query(t.target, "GPageButton");
                    if (r && r[0].gmi_args.gotoboxinputid) {
                        var d = e("#" + r[0].gmi_args.gotoboxinputid),
                            _ = window.PaginationGoto.calculateOffsetFromPageNumber(d.val(), r[0].gmi_args.currentpage, r[0].gmi_args.lastpage, r[0].gmi_args.interval);
                        _ === !1 ? window.PaginationGoto.errorAlert() : (i = _, o.offset = i, a = !0)
                    }
                }
                return a && (this._reload_anchor = "comments", PubSub.publish("Minibrowse.reload_extras", {
                    itemid: this._current_item_id,
                    extras_parameters: o
                })), !1
            },
            _get_about: function() {
                var t = this._get_container(),
                    i = e(".resview7-about .sban-dyn", t);
                return i.length || (i = e(".resview7-about", t)), vms_feature("new_devpage") && (i = e(".dev-view-about .dev-view-about-content", t)), i
            },
            _get_meta: function() {
                var t = this._get_container(),
                    i = e(".resview7-meta .sbmn-dyn", t);
                return i.length || (i = e(".resview7-meta", t)), vms_feature("new_devpage") && (i = e(".dev-view-meta .dev-view-meta-content", t)), i
            }
        };
        Glbl("Site.is_deviantart") && PubSub.publish("MinibrowseView.js_factory", t)
    })(jQuery), window.DWait && DWait.run("jms/lib/minibrowse.view.da.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/location.js", "jms/lib/minibrowse.js", "jms/lib/jquery/plugins/jquery.throttle-debounce.js", "jms/pages/duperbrowse/duperbrowse.helpers.js"], function() {
    (function() {
        var e, t, s = "prev",
            i = "next",
            r = /^\/?(?:art|journal)\/.+-([0-9]+)(?!.*[?&]hf=1)/,
            o = /^\/?(?:art|journal)\/.+-([0-9]+)(.*[?&]hf=1)/,
            a = !1;
        if (window.location.hash && !r.test(window.location.pathname) && r.test(Glbl("Location.path")) && !document.referrer.match("deviantart")) return ddt.log("Duperbrowse", "redirecting to canonical URL from hash"), PubSub.publish("Location.redirect_to_canonical_url"), void 0;
        if (r.test(Glbl("Location.path")) && !Glbl("Location.pushstate_enabled") ? (a = !0, e = r) : o.test(Glbl("Location.path")) && (a = !0, e = o), window.Duperbrowse = {
            open: function(e, s) {
                return Glbl("Duperbrowse.disabled") ? ddt.log("Duperbrowse", "disabled") : (t.waiting_for_item && (s = t.get_current_stream()), s = $.extend({
                    current_id: e.itemid,
                    current_offset: e.stream_offset,
                    scroll_position: $(window).scrollTop()
                }, s), t.waiting_for_stream || t.push_stream(s), ddt.log("Duperbrowse", "global open", e, s), t.open(e, !0), void 0)
            },
            close: function(e) {
                Glbl("Duperbrowse.disabled") || (ddt.log("Duperbrowse", "global close", e), t.close(e))
            }
        }, vms_feature("shadowhand") && function() {
            ddt.log("Duperbrowse", "delayed open: activated");
            var e, t = Duperbrowse.open.bindTo(Duperbrowse),
                s = 500,
                i = {
                    done: !1,
                    item: null,
                    stream: null,
                    open: function(s) {
                        i.done || (i.done = !0, PubSub.unsubscribe(r), e && clearTimeout(e), s && ddt.log("Duperbrowse", "delayed: preload finished"), t(i.item, i.stream))
                    }
                }, r = {
                    eventname: "Minibrowse.extras_loaded",
                    subscriber: i,
                    callback: i.open
                };
            Duperbrowse.delay = function(e) {
                ddt.log("Duperbrowse", "delayed open timeout changed to", e, "ms"), s = e
            }, Duperbrowse.open = function(t, o) {
                i.done = !1, i.item = t, i.stream = o, ddt.log("Duperbrowse", "delayed: waiting for preload, timeout is", s, "ms"), e = setTimeout(function() {
                    ddt.log("Duperbrowse", "delayed: timed out", s, "ms"), i.open()
                }, s), PubSub.subscribe(r), PubSub.publish("Minibrowse.preload", t.itemid)
            }
        }(), !Glbl("Duperbrowse.disabled")) {
            var n = Base.extend({
                is_open: !1,
                opened_from: null,
                streams: [],
                stream_stack: [],
                current_stream: null,
                deviation_urls: {},
                last_scroll_position: 0,
                active_promise: null,
                last_url_was_faked: !1,
                last_open_was_faked: !1,
                waiting_for_next_item: !1,
                waiting_for_prev_item: !1,
                subscribed: !1,
                constructor: function() {
                    ddt.log("Duperbrowse", "instance created from:", window.location.href), PubSub.subscribe([{
                        eventname: "Duperbrowse.map_url",
                        subscriber: this,
                        callback: this.handlers.map_url
                    }, {
                        eventname: "Location.changed",
                        subscriber: this,
                        callback: this.handlers.location_changed
                    }, {
                        eventname: "Location.anchor_changed",
                        subscriber: this,
                        callback: this.handlers.location_changed
                    }, {
                        eventname: "Location.changed_without_push",
                        subscriber: this,
                        callback: this.handlers.bad_location_state
                    }]), Browser.isChrome || Browser.isSafari || Browser.isIE10 || !Glbl("Location.pushstate_enabled") || $(window).on("unload.duperbrowse", this.handlers.fix_redirect_history.bindTo(this)), $(window).on("popstate.duperbrowse", this.handlers.popstate.bindTo(this))
                },
                subscribe: function() {
                    this.subscribed || (this.subscribed = !0, PubSub.subscribe([{
                        eventname: "Minibrowse.next_click",
                        subscriber: this,
                        callback: this.handlers.next_click
                    }, {
                        eventname: "Minibrowse.close_click",
                        subscriber: this,
                        callback: this.handlers.close_click
                    }, {
                        eventname: "Minibrowse.prev_click",
                        subscriber: this,
                        callback: this.handlers.prev_click
                    }, {
                        eventname: "DeviationExtras.loaded",
                        subscriber: this,
                        callback: this.handlers.extras_loaded
                    }]))
                },
                handlers: {
                    popstate: function(e) {
                        if (ddt.log("Duperbrowse", "Raw popstate", e, Glbl("Location.path")), Glbl("Location.path")) {
                            if (r.test(window.location.hash.substr(1))) return ddt.log("Duperbrowse", "Redirect to canonical bad popstate", e, Glbl("Location.path")), PubSub.publish("Location.redirect_to_canonical_url"), void 0;
                            if (!this.is_open || e.originalEvent.state || r.test(Glbl("Location.path"))) if (this.is_open || e.originalEvent.state || !r.test(Glbl("Location.path")) || r.test(window.location.pathname)) {
                                if (0 === this.streams.length && e.originalEvent.state && e.originalEvent.state.duper_state) {
                                    ddt.log("Duperbrowse", "Got bad raw popstate reloading page");
                                    var t = Glbl("Location.path").match(r);
                                    t && t[1] != e.originalEvent.state.item.itemid && window.location.reload()
                                }
                            } else window.location.reload();
                            else {
                                if (o.test(Glbl("Location.path")) && this.stream_was_faked) return;
                                this.close_silently(), "" !== window.location.search && window.location.reload()
                            }
                        }
                    },
                    next_click: function() {
                        this.next()
                    },
                    prev_click: function() {
                        this.prev()
                    },
                    close_click: function() {
                        PubSub.publish("DaGa.track_event", {
                            category: "Duperbrowse",
                            action: "navigate_close"
                        }), this.close()
                    },
                    extras_loaded: function() {
                        if (this._ready_to_preload()) {
                            var e;
                            if (this.current_stream.direction === i ? this.current_stream.has_next_callback() && (e = this.current_stream.next_item_callback()) : this.current_stream.has_prev_callback() && (e = this.current_stream.prev_item_callback()), !e) return ddt.log("Duperbrowse", "ready to preload, but could not get item");
                            var t = this;
                            e.done(function(e) {
                                ddt.log("Duperbrowse", "preloading", t.current_stream.direction, e), PubSub.publish("Minibrowse.preload", e.itemid)
                            })
                        }
                    },
                    location_changed: function(t, s) {
                        ddt.log("Duperbrowse", "location changed", s);
                        var i;
                        if (a && (a = !1, i = Glbl("Location.path").match(e), i && i[1] && (this.last_open_was_faked = !0, DWait.ready(".domready", function() {
                            this._open_fake(i[1])
                        }.bindTo(this))), ddt.log("Duperbrowse", "Opened duper instead of redirect")), this.is_open && this.last_open_was_faked && "hashchange" === s.origin && Glbl("Location.pushstate_enabled") && (ddt.log("Duperbrowse", "silently closed, blocking redirect loop"), this.close_silently(), this.last_open_was_faked = !1), "hashchange" === s.origin && Glbl("Location.pushstate_enabled") && o.test(Glbl("Location.path")) && (i = Glbl("Location.path").match(o), i && i[1] && this._open_fake(i[1])), "popstate" === s.origin || "hashchange" === s.origin || "anchorchange" === s.origin) {
                            var n = window.location.pathname + window.location.search,
                                l = "hashchange" !== s.origin && Glbl("Location.pushstate_enabled");
                            if (s.state && s.state.duper_state) {
                                if (this.is_open && !Glbl("Location.pushstate_enabled") && !r.test(Glbl("Location.path"))) return ddt.log("Duperbrowse", "silently closed, this is not an art url", Glbl("Location.path")), this.close_silently(), void 0;
                                this.unfreeze_state(s.state);
                                var c = this._get_browse_options(s.state.item);
                                if (!c) return ddt.log("Duperbrowse", "open failed");
                                PubSub.publish("Minibrowse.open", c)
                            } else if (this.is_open && n !== s.path && l) ddt.log("Duperbrowse", "silently closed, state is not from duper", Glbl("Location.path")), this.close_silently();
                            else if (this.is_open && n === s.path && this.current_stream) PubSub.publish("Location.push", {
                                url: window.location.pathname + window.location.search + window.location.hash,
                                state: this.freeze_state({
                                    itemid: this.current_stream.current_id,
                                    stream_offset: this.current_stream.current_offset
                                }),
                                replace: !0
                            });
                            else if (l) this.clear_state();
                            else if (!Glbl("Location.pushstate_enabled") && "hashchange" === s.origin) {
                                if (0 === this.streams.length && "hashchange" === s.origin && (i = Glbl("Location.path").match(r), i && (ddt.log("Duperbrowse", "Got bad hashstate", s, this.streams, i[1]), i[1]))) {
                                    var _ = null;
                                    return this.opened_from || (_ = {
                                        url: s.path,
                                        title: window.document.title
                                    }), this._open_fake(i[1], _), void 0
                                }
                                ddt.log("Duperbrowse", "silently closed, last resort failed", Glbl("Location.path")), this.close_silently()
                            }
                        }
                    },
                    bad_location_state: function(e, t) {
                        if (0 === this.streams.length && "popstate" === t.origin && t.state && t.state.duper_state && !r.test(Glbl("Location.path"))) {
                            ddt.log("Duperbrowse", "Got bad popstate", t, this.streams);
                            var s = null;
                            this.opened_from || (s = t.state.opened_from), this._open_fake(t.state.item.itemid, s)
                        }
                    },
                    map_url: function(e, t) {
                        $.isPlainObject(t) && t.itemid && t.url && (this.deviation_urls[t.itemid] || (this.deviation_urls[t.itemid] = {}), this.deviation_urls[t.itemid][this._get_context(t.context)] = t.url, this.current_stream && this.current_stream.current_id == t.itemid && this.last_url_was_faked && (ddt.log("Duperbrowse", "resetting location from map_url"), this.last_url_was_faked = !1, PubSub.publish("Location.push", {
                            url: this._get_url(t.itemid, this._get_context(t.context)),
                            state: this.freeze_state({
                                itemid: this.current_stream.current_id,
                                stream_offset: this.current_stream.current_offset
                            }),
                            replace: !0
                        })))
                    },
                    fix_redirect_history: function() {
                        if (this.is_open && Glbl("Location.pushstate_enabled") && r.test(window.location.pathname)) {
                            var e = "/#" + window.location.pathname + "?hf=1";
                            this.opened_from && this.opened_from.url && (e = this.opened_from.url.substr(0, this.opened_from.url.indexOf("#")), e = e.replace(/\/$/, "") + "/#" + window.location.pathname + "?hf=1"), PubSub.publish("Location.push", {
                                url: e,
                                state: {},
                                replace: !0
                            })
                        }
                    }
                },
                push_stream: function(e) {
                    Glbl("Duperbrowse.preload_active", 0), this.streams.push(e), this.stream_stack.push(this.streams.length - 1)
                },
                get_stream: function(e) {
                    return this.streams[e]
                },
                get_current_stream: function() {
                    return this.streams[this.streams.length - 1]
                },
                freeze_state: function(e) {
                    return {
                        duper_state: !0,
                        is_open: this.is_open,
                        opened_from: this.opened_from,
                        stream_stack: this.stream_stack,
                        last_scroll_position: this.last_scroll_position,
                        last_url_was_faked: this.last_url_was_faked,
                        item: e
                    }
                },
                unfreeze_state: function(e) {
                    this.is_open = e.is_open, this.opened_from = e.opened_from, this.stream_stack = e.stream_stack, this.last_scroll_position = e.last_scroll_position, this.current_stream = this.get_stream(e.stream_stack[e.stream_stack.length - 1]), this.last_url_was_faked = e.last_url_was_faked
                },
                clear_state: function() {
                    this.opened_from = null, this.stream_stack = [], this.last_scroll_position = null, this.current_stream = null, this.last_url_was_faked = !1
                },
                close_silently: function() {
                    if (this.is_open = !1, this.current_stream) {
                        var e = this.current_stream.scroll_position;
                        setTimeout(function() {
                            $(window).scrollTop(e)
                        }, 1)
                    }
                    this.clear_state(), PubSub.publish("Minibrowse.close"), PubSub.publish("Duperbrowse.closed")
                },
                open: function(e, t) {
                    ddt.log("Duperbrowse", "open", e, t);
                    var s = this.get_stream(this.stream_stack[this.stream_stack.length - 1]);
                    if (!s) return this.close(!0);
                    this.is_open || (this.is_open = !0, this.opened_from = {
                        url: window.location.pathname + window.location.search + window.location.hash,
                        title: window.document.title
                    }, this.subscribe());
                    var r = !1;
                    s !== this.current_stream && (ddt.log("Duperbrowse", "moving into a new stream", s, this.current_stream, this), this.current_stream = s, s.direction = i, s.direction_confirmed = !1), e ? (s.current_id = e.itemid, s.current_offset = e.stream_offset) : s.current_id && (e = {
                        itemid: s.current_id,
                        stream_offset: s.current_offset
                    });
                    var o = this._get_browse_options(e);
                    if (!o) return ddt.log("Duperbrowse", "open failed");
                    s.on_stream_item_opened && s.on_stream_item_opened(e), s.has_next_callback && (o.show_next = Boolean(s.has_next_callback()), PubSub.publish("Duperbrowse.has_next", o.show_next)), s.has_prev_callback && (o.show_prev = Boolean(s.has_prev_callback()), PubSub.publish("Duperbrowse.has_prev", o.show_prev));
                    var a = this._get_url(o.id, o.context);
                    PubSub.publish("Location.push", {
                        url: a,
                        state: this.freeze_state(e)
                    }), PubSub.publish("Minibrowse.open", o), r && this.current_stream.next_item_callback().done(function(e) {
                        ddt.log("Duperbrowse", "eager preloading", e), PubSub.publish("Minibrowse.preload", e.itemid)
                    }), PubSub.publish("Duperbrowse.opened", {
                        id: o.id,
                        url: a,
                        fresh: Boolean(t)
                    })
                },
                close: function(e) {
                    return this.is_open ? (this.current_stream && (this.last_scroll_position = this.current_stream.scroll_position), ddt.log("Duperbrowse", "close", e), e ? (this.is_open = !1, $(document).off(".duperbrowse"), PubSub.publish("Minibrowse.close"), this.opened_from && this.opened_from.url ? (Glbl("Location.pushstate_enabled") || (this.opened_from.url = this.opened_from.url.replace(/^.*#/, "")), PubSub.publish("Location.set", this.opened_from.url), PubSub.publish("DuperBrowse.set_closing_location", this.opened_from.url)) : o.test(Glbl("Location.path")) && PubSub.publish("Location.push", {
                        url: window.location.pathname,
                        state: {}
                    }), this.opened_from && this.opened_from.title && (window.document.title = this.opened_from.title), this.opened_from = null, this.current_stream && $(window).scrollTop(this.last_scroll_position), this.current_stream.on_stream_item_closed && this.current_stream.on_stream_item_closed(this.current_stream), this.current_stream = null, this.stream_stack = [], PubSub.publish("Duperbrowse.closed", e)) : (this.stream_stack.pop(), this.open()), void 0) : !1
                },
                next: function() {
                    if (this.current_stream && !this.waiting_for_next_item && this.current_stream.has_next_callback()) {
                        PubSub.publish("Duperbrowse.next"), PubSub.publish("DaGa.track_event", {
                            category: "Duperbrowse",
                            action: "navigate_next"
                        }), this._cancel_promise();
                        var e = this;
                        this.active_promise = this.current_stream.next_item_callback().done(function(t) {
                            e._ready_to_preload(i), e.open(t)
                        }).fail(function(e) {
                            e !== DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM && e !== DuperbrowseHelpers.PROMISE_STATE_CANCELLED && e !== DuperbrowseHelpers.PROMISE_STATE_OVERPAGED && PubSub.publish("Duperbrowse.pageload_failed", e)
                        }).always(function() {
                            e.waiting_for_next_item = !1
                        }), this.waiting_for_next_item = "pending" === this.active_promise.state() ? !0 : !1
                    }
                },
                prev: function() {
                    if (this.current_stream && !this.waiting_for_prev_item && this.current_stream.has_prev_callback()) {
                        PubSub.publish("Duperbrowse.prev"), ((window.deviantART || {}).deviant || {}).loggedIn ? "loggedin" : "loggedout", PubSub.publish("DaGa.track_event", {
                            category: "Duperbrowse",
                            action: "navigate_prev"
                        }), this._cancel_promise();
                        var e = this;
                        this.active_promise = this.current_stream.prev_item_callback().done(function(t) {
                            e._ready_to_preload(s), e.open(t)
                        }).fail(function(e) {
                            e !== DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM && e !== DuperbrowseHelpers.PROMISE_STATE_CANCELLED && e !== DuperbrowseHelpers.PROMISE_STATE_OVERPAGED && PubSub.publish("Duperbrowse.pageload_failed", e)
                        }).always(function() {
                            e.waiting_for_prev_item = !1
                        }), this.waiting_for_prev_item = "pending" === this.active_promise.state() ? !0 : !1
                    }
                },
                _ready_to_preload: function(e) {
                    return this.current_stream ? ((e === s || e === i) && (this.current_stream.direction !== e ? (Glbl("Duperbrowse.preload_active", 0), this.current_stream.direction = e, this.current_stream.direction_confirmed = !1, ddt.log("Duperbrowse", "user started moving", e)) : this.current_stream.direction_confirmed || (this.current_stream.direction_confirmed = !0, ddt.log("Duperbrowse", "user confirmed moving", e)), this.current_stream.direction_confirmed && Glbl.plus("Duperbrowse.preload_active")), this.current_stream.direction_confirmed) : void 0
                },
                _get_url: function(e, t) {
                    var s = (this.deviation_urls[e] || {})[this._get_context(t)];
                    if (s) s = s.replace(/^(https?:)?\/\/[^\/]+/, ""), t || (s = s.replace(/\?.*$/, ""));
                    else {
                        if (!e) return !1;
                        s = "d" + parseInt(e, 10).toString(36), this.last_url_was_faked = !0
                    }
                    return ddt.log("Duperbrowse", "got url for item", e, t, s), s
                },
                _get_context: function(e) {
                    return e || "default"
                },
                _get_browse_options: function(e) {
                    return e && e.itemid ? {
                        id: e.itemid,
                        type: e.type,
                        context: e.context,
                        show_next: !1,
                        show_prev: !1
                    } : !1
                },
                _cancel_promise: function() {
                    this.active_promise && "pending" === this.active_promise.state() && this.active_promise.cancel && (this.active_promise.cancel(), ddt.log("Duperbrowse", "Cancelled pending promise", this.active_promise))
                },
                _open_fake: function(e, t) {
                    this.current_stream = {
                        scroll_position: 0
                    }, this.subscribe(), this.is_open = !0, this.opened_from = t || null, this.stream_was_faked = !0, this.deviation_urls[e] && Glbl("Location.path", this._get_url(e, null)), PubSub.publish("Minibrowse.open", {
                        id: e,
                        type: 1,
                        show_next: !1,
                        show_prev: !1
                    })
                }
            });
            t = new n
        }
    })(), window.DWait && DWait.run("jms/pages/duperbrowse/duperbrowse.master.js")
});
DWait.ready(["jms/thirdparty/lib/spin.js", "jms/lib/spinpreset.js"], function() {
    (function() {
        var e = {
            PROMISE_STATE_END_OF_STREAM: 1,
            PROMISE_STATE_CANCELLED: 2,
            PROMISE_STATE_OVERPAGED: 3,
            click_handler: function(e) {
                var r = {
                    open_duperbrowse: !0,
                    click_return: !1,
                    wait_for_load: !1,
                    disabled: !1
                };
                (e.metaKey || e.altKey || e.shiftKey || e.ctrlKey) && (r.open_duperbrowse = !1, r.click_return = !0), e.which > 1 && (r.open_duperbrowse = !1, r.click_return = !0), (Glbl("Duperbrowse.pause") || Glbl("Duperbrowse.disabled")) && (r.disabled = Glbl("Duperbrowse.disabled"), r.open_duperbrowse = !1, r.click_return = !0);
                var i = $(e.currentTarget);
                return window.deviantART.deviant.loggedIn || !i.hasClass("antisocial") && !i.hasClass("ismature") || (r.open_duperbrowse = !1, r.click_return = !0), r
            },
            map_url: function(e, r, i) {
                r && PubSub.publish("Duperbrowse.map_url", {
                    itemid: e,
                    url: r,
                    context: i
                })
            },
            get_element_super_dimensions: function(e) {
                var r = {};
                if (e.data("super-img")) {
                    var i = {
                        "super-img": "src",
                        "super-width": "width",
                        "super-height": "height",
                        "super-full-img": "full_src",
                        "super-full-width": "full_width",
                        "super-full-height": "full_height",
                        "super-transparent": "transparent"
                    };
                    $.each(i, function(i, t) {
                        var s = e.data(i);
                        s && (r[t] = s)
                    })
                }
                return r
            },
            cache_dimensions_for_item: function(e, r) {
                var i = this.get_element_super_dimensions(e);
                $.isEmptyObject(i) || (i.id = r, PubSub.publish("Minibrowse.cache_main_html_dimensions", i))
            },
            cache_dimensions_for_legacy_item: function(e, r) {
                var i = {}, t = {
                    super_img: "src",
                    super_w: "width",
                    super_h: "height",
                    super_fullimg: "full_src",
                    super_fullw: "full_width",
                    super_fullh: "full_height",
                    super_transparent: "transparent"
                };
                $.each(t, function(r, t) {
                    var s = e.attr(r);
                    s && (i[t] = s)
                }), $.isEmptyObject(i) || (i.id = r, PubSub.publish("Minibrowse.cache_main_html_dimensions", i))
            },
            init_thumb_data: function(e, r, i) {
                r.find(i).each(function() {
                    $anchor = $(this), 0 !== $anchor.length && 0 !== r.length && (DuperbrowseHelpers.cache_dimensions_for_item($anchor, e.itemid), DuperbrowseHelpers.map_url(e.itemid, $anchor.attr("href"), $anchor.data("duper-context")))
                }), r.data(e)
            },
            scroll_to_thumb: function(e) {
                var r = $(window),
                    i = e.offset().top,
                    t = r.scrollTop();
                i > t && t + r.height() > i || r.scrollTop(i)
            }
        };
        window.DuperbrowseHelpers = e
    })(), window.DWait && DWait.run("jms/pages/duperbrowse/duperbrowse.helpers.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/jquery/plugins/jquery.gmi.js"], function() {
    (function(e) {
        var a = vms_feature("dre"),
            t = Base.extend({
                constructor: function() {
                    PubSub.subscribe([{
                        eventname: "DuperbrowseStreamLoader.load",
                        subscriber: this,
                        callback: this.handlers.load
                    }])
                },
                dot_to_camel: function(e) {
                    return (e + "").replace(/\b[a-z]/g, this.make_uppercase).replace(".", "")
                },
                make_uppercase: function(e) {
                    return e.toUpperCase()
                },
                handlers: {
                    load: function(t, r) {
                        if (r && r.stream && /^[a-z]+\.[a-z]+$/.test(r.stream)) {
                            var s;
                            s = r.gmi && /^[a-zA-Z]+$/.test(r.gmi) ? r.gmi : "Duperbrowse" + this.dot_to_camel(r.stream) + "Stream";
                            var i;
                            if (r.node) i = e(r.node);
                            else var i = e(":gmi(" + s + ")");
                            if (!i.length) return a && console.log("[DuperbrowseStream] loader aborted, GMI node not found", s), void 0;
                            if (window[s] && !r.delay_gmi) i.gmi();
                            else if (!i.hasClass("dwait_stream")) {
                                var o = r.selector || "a.thumb, a.embedded-deviation",
                                    m = {
                                        stream_file: "jms/pages/duperbrowse/stream/" + r.stream + ".stream.js",
                                        stream_gmi: s
                                    };
                                a && console.log("[DuperbrowseStream] loader requested", m), i.addClass("dwait_stream").on("click.dwait_stream", o, m, this.events.click)
                            }
                        }
                    }
                },
                events: {
                    click: function(t) {
                        if (!(t.metaKey || t.altKey || t.shiftKey || t.ctrlKey || t.which > 1) && t.data && t.data.stream_file && t.data.stream_gmi) {
                            var r = e(t.target).addClass("dwaiting");
                            return DWait.ready(t.data.stream_file, function() {
                                a && console.log("[DuperbrowseStream] loader finished", t.data.stream_file, t.data.stream_gmi), r.closest(":gmi(" + t.data.stream_gmi + ")").off(".dwait_stream").gmi(), r.removeClass("dwaiting").trigger("click")
                            }), !1
                        }
                    }
                }
            });
        new t
    })(jQuery), window.DWait && DWait.run("jms/pages/duperbrowse/loader/stream.loader.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/gmi.js", "jms/lib/jquery/jquery.current.js", "jms/lib/jquery/plugins/jquery.somedata.js", "jms/pages/duperbrowse/duperbrowse.helpers.js"], function() {
    (function(e, t) {
        var s = {
            dataFetchComplete: function(t, s, r, _, i, a) {
                ResourceStream.prototype.dataFetchComplete.call(this, t, s, r, _, i, a);
                var n = s,
                    o = {
                        status: i,
                        rids: [],
                        total: a.response.content.total,
                        offset: s,
                        count: r,
                        more: a.response.content.more
                    };
                i && e.each(a.response.content.resources, function(t, s) {
                    return e(s[2]).data("deviation-inactive") ? (n++, void 0) : (o.rids.push({
                        itemid: s[1],
                        stream_offset: n
                    }), n++, void 0)
                }), this.$.trigger("dataFetchComplete", o)
            }
        }, r = 0,
            _ = Base.extend({
                id: 0,
                range_start: 0,
                range_end: 0,
                has_more: !1,
                has_less: !1,
                constructor: function(e, t, s, _) {
                    this.id = r, r++, this.range_start = e, this.range_end = t - 1, this.has_more = s, this.has_less = _
                },
                offset_in_range: function(e) {
                    return e >= this.range_start && this.range_end >= e
                }
            }),
            i = vms_feature("dre");
        t.DuperbrowseStandardResourceStream = Base.extend({
            _resource_stream: null,
            _current_page: null,
            _current_item: null,
            _current_offset: null,
            _pages: {},
            _missing_offsets: {},
            _previous_offset: 0,
            paging_disabled: !1,
            fake_paging: !1,
            factory: function(e, s) {
                var r = "Duperbrowse" + (e.duperbrowse_class || "Standard") + "ResourceStream";
                return t[r] ? (i && console.log("[DuperbrowseStream] creating resource stream", r), new t[r](s)) : (i && console.log("[DuperbrowseStream] could not locate class for stream", e), void 0)
            },
            constructor: function(e) {
                this._pages = {}, this._missing_offsets = {}, this._resource_stream = e, this._init_stream()
            },
            _init_stream: function() {
                if (this._bind_clicks(), this._patch_resource_stream(), this.fake_paging === !0 && this._resource_stream.contents.length > this._resource_stream.gs_count_per_page) this._create_pages_from_overflow();
                else {
                    var e = new _(this._resource_stream.gs_offset, this._resource_stream.gs_offset + this._resource_stream.gs_count_per_page, 1 === parseInt(this._resource_stream.gs_more_to_load, 10), this._resource_stream.gs_offset > 0);
                    this._current_page = e, this._pages[e.id] = e, this._find_missing_offsets(e)
                }
            },
            _patch_resource_stream: function() {
                this._resource_stream.extend(s), this._resource_stream.$.on("dataFetchComplete", this._handle_contents_change.bindTo(this))
            },
            _handle_contents_change: function() {
                this._bind_clicks()
            },
            _bind_clicks: function() {
                var t = this;
                e.each(this._resource_stream.contents, function(s, r) {
                    if (r) {
                        var _ = e(r[2]);
                        _.length && (t._init_thumb_data(s, r, _, "a.thumb, a.tt-fh-purchasable"), e("a.thumb, span a.t", _).off("click.duperbrowse").on("click.duperbrowse", t._open_duperbrowse.bindTo(t)))
                    }
                })
            },
            _init_thumb_data: function(e, t, s, r) {
                var _ = {
                    type: t[0],
                    itemid: t[1],
                    stream_offset: e
                };
                DuperbrowseHelpers.init_thumb_data(_, s, r)
            },
            _open_duperbrowse: function(t) {
                if ((t.metaKey || t.altKey || t.shiftKey || t.ctrlKey) && this._resource_stream.edit_mode === !0) return t.preventDefault(), this._ga_callback(t.currentTarget, !1), !0;
                var s = DuperbrowseHelpers.click_handler(t),
                    r = ["itemid", "stream_offset", "type"];
                if (s.open_duperbrowse) {
                    var _ = e(t.currentTarget),
                        i = _.closest(".tt-a, .tt-aa").someData(r);
                    if (!e.isEmptyObject(i)) {
                        this._ga_callback(t.currentTarget, !1);
                        var a = {
                            next_item_callback: this._next_item_callback.bindTo(this),
                            prev_item_callback: this._prev_item_callback.bindTo(this),
                            has_next_callback: this._has_next_callback.bindTo(this),
                            has_prev_callback: this._has_prev_callback.bindTo(this),
                            on_stream_item_opened: this._on_stream_item_opened.bindTo(this),
                            on_stream_item_closed: this._on_stream_item_closed.bindTo(this)
                        };
                        return i.wait_for_load = s.wait_for_load, i.context = _.data("duper-context"), Duperbrowse.open(i, a), !1
                    }
                    return this._ga_callback(t.currentTarget, !0), !0
                }
                return this._ga_callback(t.currentTarget, s.click_return), s.click_return
            },
            _get_item: function(s) {
                var r = this._resource_stream.contents[s];
                if (this._missing_offsets[s] === !0) return !1;
                if (void 0 === r) return r;
                var _ = e(r[2]);
                if (0 === _.length || _.data("deviation-inactive")) return !1;
                if (_.length && !t.deviantART.deviant.loggedIn) {
                    var i = _.find("a.thumb");
                    if (i.hasClass("antisocial") || i.hasClass("ismature")) return !1
                }
                return {
                    itemid: r[1],
                    stream_offset: s
                }
            },
            _move_stream: function(t, s) {
                this._resource_stream.gs_offset = t, this._resource_stream.domClearAll();
                var r = this._resource_stream.gs_count_per_page;
                e.each(this._missing_offsets, function(e) {
                    s && s.offset_in_range(e) && r--
                }), this._resource_stream.domDrawRange(t, r), this._update_pager(t)
            },
            _update_pager: function(t) {
                this._resource_stream.gmi_args.pager_id && DWait.ready("jms/lib/da.misc.widgets.pager.js", function() {
                    var s = e("#" + this._resource_stream.gmi_args.pager_id).gmi1();
                    s && s.update_to_offset(t)
                }.bindTo(this))
            },
            _find_next: function(t) {
                for (var s = 1 == t ? this._current_offset + 1 : this._current_offset - 1, r = null, _ = 0; null === r;) {
                    var i = this._get_item(s);
                    void 0 !== i && e.isEmptyObject(i) ? s = 1 == t ? s + 1 : s - 1 : r = i, _++, _ > this._resource_stream.gs_count_per_page && (r = void 0)
                }
                return r
            },
            _find_missing_offsets: function(e) {
                for (var t = e.range_start, s = e.range_end + 1; s > t; t++) void 0 === this._resource_stream.contents[t] && (this._missing_offsets[t] = !0)
            },
            _create_pages_from_overflow: function() {
                var e, t, s = Math.ceil(this._resource_stream.contents.length / this._resource_stream.gs_count_per_page),
                    r = 0;
                for (e = 0; s > e; e++) t = new _(r, r + this._resource_stream.gs_count_per_page, s - 1 > e, e > 0), this._pages[t.id] = t, 0 === r && (this._current_page = t), this._find_missing_offsets(t), r += this._resource_stream.gs_count_per_page
            },
            _next_item_callback: function() {
                var t = this._find_next(!0);
                return void 0 !== t ? e.Deferred().resolve(t).promise() : void 0 === t && this._current_page.has_more && !this.paging_disabled ? this._create_next_item_promise(!1) : e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _prev_item_callback: function() {
                var t = this._find_next(!1);
                return void 0 !== t ? e.Deferred().resolve(t).promise() : void 0 === t && this._current_page.has_less && !this.paging_disabled ? this._create_next_item_promise(!0) : e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _has_next_callback: function() {
                var e = this._find_next(!0);
                return void 0 !== e ? !0 : this._current_page.has_more === !0 ? !0 : !1
            },
            _has_prev_callback: function() {
                var e = this._current_offset - 1;
                if (0 > e) return !1;
                var t = this._find_next(!1);
                return void 0 !== t ? !0 : void 0 === t && this._current_page.has_less ? !0 : !1
            },
            _on_stream_item_opened: function(t) {
                var s, r = !1,
                    _ = this;
                void 0 !== this._get_item(t.stream_offset) ? (s = this._get_item(t.stream_offset), this._current_item = s, this._current_offset = s.stream_offset, e.each(this._pages, function(e, s) {
                    _._current_page && s.id != _._current_page.id && s.offset_in_range(t.stream_offset) && (r = s)
                }), r && (this._move_stream(r.range_start, r), this._current_page = r)) : (this._current_item = null, this._current_offset = null)
            },
            _on_stream_item_closed: function(t) {
                var s = this._resource_stream.contents[t.current_offset];
                if (void 0 !== s) {
                    var r = e(s[2]);
                    0 !== r.length && DuperbrowseHelpers.scroll_to_thumb(r)
                }
            },
            _handle_page_promise: function(e) {
                var t = !1;
                e.total && e.total > this._resource_stream.contents.length && (t = !0), 0 === e.total && e.more === !0 && e.rids.length > 0 && (t = !0);
                var s = new _(e.offset, e.offset + e.count, t, e.offset > 0);
                this._current_page = s, this._pages[s.id] = s, this._find_missing_offsets(s), this._bind_clicks()
            },
            _handle_page_promise_failure: function(e, t) {
                this._move_stream(this._previous_offset, this._current_page), e === DuperbrowseHelpers.PROMISE_STATE_OVERPAGED && (t ? this._current_page.has_less = !1 : this._current_page.has_more = !1, PubSub.publish("Duperbrowse.disable_paddle", t))
            },
            _create_next_item_promise: function(t) {
                var s, r, _ = e.Deferred(),
                    i = !1,
                    a = this,
                    n = this._resource_stream.gs_offset + this._resource_stream.gs_count_per_page;
                return this._previous_offset = this._resource_stream.gs_offset, t && (n = this._resource_stream.gs_offset - this._resource_stream.gs_count_per_page, 0 > n && (n = 0)), this._move_stream(n), this._resource_stream.$.on("dataFetchComplete", function(e, s) {
                    s.status ? 0 === s.rids.length ? _.reject(DuperbrowseHelpers.PROMISE_STATE_OVERPAGED, t) : _.resolve(s) : _.reject("failed to load thumbs")
                }), _.done(a._handle_page_promise.bindTo(a)).fail(a._handle_page_promise_failure.bindTo(a)), r = function(t) {
                    return i ? e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_CANCELLED).promise() : t.rids[0]
                }, prev_pipe = function(t) {
                    return i ? e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_CANCELLED).promise() : t.rids[t.rids.length - 1]
                }, s = e.when(_.promise()).then(t === !0 ? prev_pipe : r), s.cancel = function() {
                    i = !0
                }, s
            },
            _ga_callback: function(e, t) {
                var s;
                this._resource_stream.$.parent().hasClass("deviation-visit") ? s = "mfa_thumb" : this._resource_stream.$.parent().hasClass("deviation-mlt-preview-body") && (s = this._resource_stream.$.parent().siblings("h3.more-from-artist-title").length ? "mfa_thumb" : "mlt_thumb"), s && PubSub.publish(t ? "DaGa.track_event_link" : "DaGa.track_event", {
                    event: null,
                    element: e,
                    category: "Deviation",
                    action: s
                })
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/duperbrowse/stream/standard.resource.stream.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/pages/duperbrowse/stream/standard.resource.stream.js"], function() {
    (function(e, s) {
        s.DuperbrowseChannelResourceStream = DuperbrowseStandardResourceStream.extend({
            _init_stream: function() {
                var e = this._resource_stream.$.find("smoothie").attr("q");
                "special:newest" == e ? this.paging_disabled = !0 : e && e.match(/special:(popular|dd)/) && (this.fake_paging = !0), this.base()
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/duperbrowse/stream/channel.resource.stream.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/pubsub.js", "jms/lib/jquery/jquery.current.js", "jms/pages/duperbrowse/stream/channel.resource.stream.js"], function() {
    (function(e, r) {
        r.DuperbrowseFooterResourceStream = DuperbrowseChannelResourceStream.extend({
            _ga_callback: function() {
                PubSub.publish("DaGa.track_event_no_debounce", {
                    category: "Footer",
                    action: "Thumbnail"
                })
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/duperbrowse/stream/footer.resource.stream.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/gmi.js", "jms/lib/jquery/jquery.current.js", "jms/pages/duperbrowse/duperbrowse.helpers.js", "jms/pages/duperbrowse/stream/standard.resource.stream.js"], function() {
    (function(e, r) {
        r.DuperbrowseCropthumbResourceStream = DuperbrowseStandardResourceStream.extend({
            _items: [],
            _current_item: null,
            _current_offset: null,
            constructor: function(e) {
                this._resource_stream = e, this._items = [], this.init_stream()
            },
            init_stream: function() {
                var t = this;
                this._resource_stream.$.find(".tt-crop").each(function(s) {
                    var i = e(this),
                        _ = parseInt(i.attr("collect_rid").split(":")[1], 10),
                        a = {
                            itemid: _,
                            stream_offset: s
                        };
                    (r.deviantART.deviant.loggedIn || !i.hasClass("antisocial") && !i.hasClass("ismature")) && (t._items.push(a), i.on("click.cropthumb", t._open_duperbrowse.bindTo(t)), i.data(a), DuperbrowseHelpers.cache_dimensions_for_item(i, _), DuperbrowseHelpers.map_url(_, i.find("a").attr("href")))
                })
            },
            _open_duperbrowse: function(t) {
                var s = r.DuperbrowseHelpers.click_handler(t),
                    i = ["itemid", "stream_offset"];
                if (s.open_duperbrowse) {
                    var _ = e(t.currentTarget).someData(i);
                    if (!e.isEmptyObject(_)) {
                        this._ga_callback(t.currentTarget, !1);
                        var a = {
                            next_item_callback: this._next_item_callback.bindTo(this),
                            prev_item_callback: this._prev_item_callback.bindTo(this),
                            has_next_callback: this._has_next_callback.bindTo(this),
                            has_prev_callback: this._has_prev_callback.bindTo(this),
                            on_stream_item_opened: this._on_stream_item_opened.bindTo(this)
                        };
                        return _.wait_for_load = s.wait_for_load, Duperbrowse.open(_, a), !1
                    }
                    return this._ga_callback(t.currentTarget, !0), !0
                }
                return this._ga_callback(t.currentTarget, s.click_return), s.click_return
            },
            _next_item_callback: function() {
                var r = this._current_offset + 1,
                    t = this._items[r];
                return void 0 !== t ? e.Deferred().resolve(t).promise() : e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _prev_item_callback: function() {
                var r = this._current_offset - 1,
                    t = this._items[r];
                return void 0 !== t ? e.Deferred().resolve(t).promise() : e.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _has_next_callback: function() {
                var e = this._current_offset + 1;
                return void 0 !== this._items[e] ? !0 : !1
            },
            _has_prev_callback: function() {
                var e = this._current_offset - 1;
                return 0 > e ? !1 : void 0 !== this._items[e] ? !0 : !1
            },
            _on_stream_item_opened: function(e) {
                void 0 !== this._items[e.stream_offset] ? (this._current_item = e, this._current_offset = e.stream_offset) : (this._current_item = null, this._current_offset = null)
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/duperbrowse/stream/cropthumb.resource.stream.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/lib/jquery/plugins/jquery.gmi.js", "jms/lib/pubsub.js"], function() {
    (function(e) {
        var s = Base.extend({
            $menus: null,
            constructor: function() {
                this.$menus = e(".oh-hasmenu"), e(".textbanner-ad").length && this.disable_hover(), PubSub.subscribe([{
                    eventname: "Duperbrowse.opened",
                    subscriber: this,
                    callback: this.disable_hover
                }, {
                    eventname: "Duperbrowse.closed",
                    subscriber: this,
                    callback: this.enable_hover
                }])
            },
            enable_hover: function() {
                OHM.disabled && !e(".textbanner-ad").length && (OHM.disabled = !1, this.$menus.removeClass("oh-nohover"))
            },
            disable_hover: function() {
                OHM.disabled || (OHM.disabled = !0, this.$menus.addClass("oh-nohover"))
            }
        });
        window.deviantART && window.deviantART.deviant && window.deviantART.deviant.loggedIn || new s
    })(jQuery), window.DWait && DWait.run("jms/pages/deviation/dev-page-hover.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/pubsub.js"], function() {
    $(window).on("message.AdCatch", function(a) {
        var i = a.originalEvent.data && a.originalEvent.data.match ? a.originalEvent.data.match(/^adcatch::(all|one)::/) : !1;
        i && a.originalEvent.origin == window.location.origin && DWait.ready("jms/modals/adcatch-modal.js", function() {
            PubSub.publish("AdCatchModal.prime", {
                is_all: "all" == i[1],
                content: a.originalEvent.data.substr(i[0].length)
            })
        })
    }), window.DWait && DWait.run("jms/lib/adcatch_listener.js")
});
(function() {
    var t = function(t) {
        if (DWait) {
            var a = ((t || {}).data || "") + "",
                e = t.source;
            DWait.ready("jms/lib/jquery/jquery.current.js", function() {
                if ("da-dfpib::" == (a + "").substr(0, 10)) try {
                    var t = a.replace("da-dfpib::", "").replace(/;/g, "%3B");
                    "http://ad.doubleclick.net/adj/N7217.131920.DEVIANTART.COM/B7875741" == t.substr(0, 66) && $("iframe").each(function() {
                        if (this.contentWindow == e) {
                            var a = window.location.hostname.match(/lan$/) ? "vm" + $.now() : 1422442459;
                            return $(this).attr("src", "http://www.da-ads.com/da_custom.html?cb=" + a + "#;0;dfpib;;1380062155;0;" + escape(t)), !1
                        }
                    })
                } catch (n) {}
            })
        }
    };
    try {
        window.postMessage && (window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent("onmessage", t))
    } catch (a) {}
})(), window.DWait && DWait.run("jms/lib/ad_hack_for_dfp.js");
window.popupSitback = function(t, n) {
    var o = "http://justsitback.deviantart.com",
        i = "menubar=no,width=640,height=480,toolbar=no,status=no,location=no,directories=no,resizable=yes";
    Browser.isIE && (t = "Slideshow");
    var e = o + "?title=" + encodeURIComponent(t) + "&rssQuery=" + encodeURIComponent(n);
    return window.open(e, "SitBack", i), window.event && (event.cancelBubble = !0), !1
}, DWait.init("SitBack", function(t) {
    var n = $("smoothie"),
        o = n.attr("label"),
        i = n.attr("q");
    $(t).on("click.sitback", function() {
        popupSitback(o, i, 400, 300)
    })
}), window.DWait && DWait.run("jms/pages/sitback.js");
DWait.ready(["jms/lib/jquery/jquery.current.js"], function() {
    (function(t) {
        t(function() {
            var e;
            t("body").hasClass("maturehide") && (e = t("#browse2 .tt-ismature, #browse-results .tt-ismature").length) && t("#browse2 .tt-a, #browse-results .tt-a").length == e && t("#maturehider_explanation").show()
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/browsesearch.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/quantcast.js", "jms/lib/dtlocal.js", "jms/lib/bind.js", "jms/pages/ccommentthread.js", "jms/lib/glbl.js", "jms/lib/analytics.js", "jms/lib/browser.js", "jms/lib/php.js"], function() {
    DWait.ready("jms/lib/gmi.js", function() {
        window.TalkPostWrapper = GMIBase.extend({
            gmiConstructor: function() {
                vms_feature("dre") && console.log("TalkPost GMI constructor");
                var e;
                this.talkpost = new TalkPost(this), this.talkpost.node = this.gmi_node, this.talkpost.comment = this.gmi_args, this.reset = bind(this.talkpost, this.talkpost.reset), this.talkpost.hookDrawingUI(), this.$.data("TalkPost", this.talkpost), this.textarea = this.gmi_node.getElementsByTagName("textarea")[0], e = this.getCacheName(), TalkPostWrapper.textCache[e] && (this.textarea.value = TalkPostWrapper.textCache[e].shift() || ""), this.stdPostHook(), this.refreshTextareaState(), this.$.children(".inputs").show(), this.talkpost.commentwriter = window.WriterAnywhereFactory && WriterAnywhereFactory.get(Glbl("Site.is_stash") ? "stashcomment" : this.$.closest(".mczone").length ? "mccomment" : "comment", this.$.find("textarea"), !1, !0), this.talkpost.commentwriter ? (this.$.addClass("ccexpanded ccwriter-raisin"), this.$.find("textarea").addClass("writeranywhere")) : (this.textarea.onfocus = bind(this, this.textareaFocus), this.textarea.onblur = bind(this, this.textareaBlur), $(document.documentElement).bind("keydown", this.keypress = bind(this, this.keypress)))
            },
            gmiDestructor: function() {
                var e;
                $(document.documentElement).unbind("keydown", this.keypress), this.textarea && (e = this.getCacheName(), TalkPostWrapper.textCache[e] || (TalkPostWrapper.textCache[e] = []), TalkPostWrapper.textCache[e].push(this.textarea.value || "")), this.talkpost.localDestroy()
            },
            previewClick: function() {
                this.talkpost.confirmPreview()
            },
            sendClick: function() {
                return window.event && (event.cancelBubble = !0), this.talkpost.confirmPost(), !1
            },
            getCacheName: function() {
                return [this.gmi_args.typeid || "", this.gmi_args.itemid || "", this.gmi_args.parentid || "", this.gmi_args.time_index || ""].join(":")
            },
            keypress: function(e) {
                return this.tab_pressed = 9 == e.keyCode, this.textarea_focused && (13 == e.keyCode || 10 == e.keyCode) && (Browser.isMac && e.metaKey && !Browser.isOpera || e.ctrlKey) ? (e.target.blur(), this.sendClick()) : void 0
            },
            setCallback: function(e) {
                this.talkpost.callback = e
            },
            hookSend: function() {
                $("input.post[type=submit]", this.talkpost.node).click(function() {
                    return !1
                })
            },
            stdPostHook: function() {
                this.setCallback(bind(this, this.stdPostHookDone)), this.hookSend()
            },
            stdPostHookDone: function(e, t) {
                var i;
                TalkPostWrapper.one_comment_posted = 1, "posted" == e && (i = (GMI.up(this.gmi_node) || this).gmiQuery("CCommentThread")[0] || GMI.query("CCommentThread")[0], this.reset(!1), this.$.find(".inputs").hide(), i.renderNewComment(t, {
                    fast: !0,
                    scroll_to: !0
                }), PubSub.publish("PageViewTracker.pageview", {
                    page: "/vpv/difi/commentpost",
                    tag: "Dynamic.Comment"
                }), PubSub.publish("Minibrowse.uncache", t.itemid))
            },
            refreshTextareaState: function() {
                var e, t;
                this.textarea_focused || this.writer_focused || this.sidebar_hovered || this.textarea.value || this.mood_hovered || this.talkpost.drawplz_hovered || this.talkpost.commentDrawin || this.talkpost.collection_hovered ? (this.logged_expand || (this.logged_expand = !0), $(".show_collections").unbind("mouseover").mouseover(bind(this, this.collectionHover)), $(".show_collections").unbind("mouseout").mouseout(bind(this, this.collectionOut)), this.moods || (this.moods = this.talkpost.renderMoodBox(), this.moods && (this.moods.onmouseover = bind(this, this.moodHover), this.moods.onmouseout = bind(this, this.moodOut)), t = this.gmi_node.getElementsByTagName("a"), t = t[t.length - 1], $(t).is(".emoticons") && (t.onmouseover = bind(this, this.moodHover), t.onmouseout = bind(this, this.moodOut))), this.$.find(".drawPlz").show(), this.$.addClass("ccexpanded"), this.$.find("textarea").data("disable-writer") || this.$.addClass("ccwriter-raisin"), document.body.scrollTop || document.documentElement.scrollTop || (window.scrollTo ? window.scrollTo(0, 1) : document.body.scrollTop = 1, e = this.$.height() + this.$.offset().top + 10 - $(window).height(), e > 0 && (window.scrollTo ? window.scrollTo(0, e) : document.body.scrollTop = e))) : this.$ && this.$.removeClass("ccexpanded").find(".drawPlz").hide()
            },
            textareaFocus: function() {
                this.textarea_focused || (this.textarea_focused = 1, $(this.textarea).trigger("focus.writeranywhere")), this.refreshTextareaState()
            },
            textareaBlur: function() {
                if (!(this.writer_focused || this.sidebar_hovered || this.collection_hovered) && (this.textarea_focused = 0, this.refreshTextareaState(), this.tab_pressed && -1 == document.activeElement.className.indexOf("comment-submit"))) {
                    var e = this.textarea;
                    setTimeout(function() {
                        $(e).closest("form").find(".comment-submit:visible").focus()
                    }, 100)
                }
            },
            moodHover: function() {
                this.mood_hovered = 1
            },
            moodOut: function() {
                this.mood_hovered = 0
            },
            collectionHover: function() {
                this.collection_hovered = 1
            },
            collectionOut: function() {
                this.collection_hovered = 0
            }
        }), TalkPostWrapper.textCache = {}
    }), window.show_emoticons_modal = function() {
        var e = $("<div style='width:470px;' />");
        $("<h2>Emoticons</h2>").appendTo(e), $("<iframe style='width:100%; height:450px; border: none; border-bottom: 1px solid #AAB5AB; -webkit-box-shadow: rgba(255,255,255, 0.75) 0px 1px 0px; -moz-box-shadow: rgba(255, 255, 255, 0.75) 0px 1px 0px;' frameBorder='0' src='http://comments.deviantart.com/emoticons' />").appendTo(e);
        var t = Modals.factory(e, {
            cssShadows: !0,
            showCloseButton: !0,
            showButtonsSeparator: !1,
            ignoreinvincible: !0
        });
        return t.addButton("Close", "smbutton-lightgreen", function() {
            return Modals.pop("closed"), !1
        }), Modals.push(t), !1
    }, $(document).on("click", ".show_emoticons_modal", window.show_emoticons_modal), $(document).on("click", ".show_collections", function() {
        return Lub.go(), da_minish_lub.buttonClicked(), !1
    }), window.TalkPost = function(e, t, i, s) {
        var o;
        if (DTLocal.infect(this), "function" != typeof e && (this.owner = e, this.current_mode = "normal", !(window.TalkPostWrapper && e instanceof TalkPostWrapper))) {
            this.node = $("div.mczone").first().parents("div#output").is(":visible") ? $(this.template_message_center)[0] : $(this.template)[0], $(this.node).find("textarea").addClass("writeranywhere"), this.comment = t, this.callback = i;
            for (o in s || {}) this[o] = s[o];
            this.on()
        }
    }, TalkPost.prototype = {
        debug_label: "TalkPost",
        on: function() {
            vms_feature("dre") && console.log("Talkpost On"), $(this.node).data("TalkPost", this), Number(this.comment.parentid) && $(this.node).addClass("talk-post-reply ccexpanded ccwriter-raisin"), this.localEventHook($(".cx", this.node)[0], "click", bind(this, this.confirmExit)), this.localEventHook($(".cancel", this.node)[0], "click", bind(this, this.confirmCancel));
            var e = $(".post", this.node);
            this.localEventHook(e[0], "click", bind(this, this.confirmPost)), this.localEventHook($(e).parent()[0], "keypress", bind(this, this.confirmPost)), this.localEventHook($(".preview", this.node)[0], "click", bind(this, this.confirmPreview)), this.textarea = $("textarea", this.node)[0], this.localEventHook(this.textarea, "keydown", bind(this, this.textareaKeydown)), this.localEventHook(this.textarea, "blur", bind(this, this.textareaBlur)), this.hookDrawingUI(), $(".name", this.node).html(deviantART.deviant && deviantART.deviant.username ? PHP.userlink(deviantART.deviant.username, deviantART.deviant.symbol) + ' - <span class="cclabel">Add a Comment:</span>' : "Your Comment"), $(".avatar", this.node).html(deviantART.deviant && deviantART.deviant.username ? PHP.usericon(deviantART.deviant.username, deviantART.deviant.usericon) : ""), this.current_mode = "normal", $(".text", this.node)[0].value = this.constructor.localCache["text" + (Number(this.comment.parentid) || "t" + (this.comment.time_index || 0))] || "", deviantART.deviant && deviantART.deviant.username || (this.node.style.display = "none");
            var t = $("div.moodbox", this.node)[0];
            t && (this.hide_moods ? t.parentNode.style.display = "none" : this.renderMoodBox()), setTimeout(bind(this, function() {
                this.commentwriter = window.WriterAnywhereFactory && WriterAnywhereFactory.get(Glbl("Site.is_stash") ? "stashcomment" : $(this.node).closest(".mczone").length ? "mccomment" : "comment", $(this.node).find(".writeranywhere"), !0, !0), this.commentwriter && $(this.node).find("textarea").addClass("writeranywhere")
            }), 10)
        },
        off: function() {
            var e = !0;
            this.drawPlz_hide(e), $(".cancel", this.node).hide(), this.owner.local && this.owner.localClean(TalkPost)
        },
        localRecv: function(e) {
            "destroy" == e && (this.constructor.localCache["text" + (Number(this.comment.parentid) || "t" + (this.comment.time_index || 0))] = $(".text", this.node)[0].value, this.owner.local && (this.local_tie && this.owner.localClean(this.local_tie), this.node.parentNode && this.node.parentNode.removeChild(this.node)))
        },
        PHP_userlink: function(e, t) {
            return "object" == typeof e && (t = e.symbol, e = e.username), t + '<a class="u" href="ht' + "tp://" + e.toLowerCase() + '.deviantart.com/">' + e + "</a>"
        },
        template: '<div class="talk-post" keeper="TalkPost"><a href="#" class="cx">Cancel</a><div class="name"></div><div class="avatar"></div><div class="h"><div class="previewbox" style="display:none"></div><table class="f"><tr><td class="f"><i class="l"></i><textarea class="text" tabindex="4"></textarea></td><td class="f rr moodbox-zone"><div class="moodbox"></div></td></tr></table></div><div class="inputs" style="position:relative; text-align: right"><div class="scripted"><a class="smbutton smbutton-big preview" tabindex="6" href="javascript:void(0)"><span>Preview</span></a><span style="display: inline-block; width: 10px">&nbsp;</span><a class="smbutton smbutton-green comment-submit smbutton-big post" tabindex="5" href="javascript:void(0)"><span class="post">Submit Comment</span></a></div><div class="unscripted"><input class="post" type="submit" value="Send" tabindex="1"></div><div style="position:absolute;left:0;top:0;font-size:8.25pt"></div></div></div>',
        template_message_center: '<div class="talk-post" keeper="TalkPost"><a href="#" class="cx">Cancel</a><div class="name"></div><div class="avatar"></div><div class="h"><div class="previewbox" style="display:none"></div><table class="f"><tr><td class="f"><i class="l"></i><textarea class="text" tabindex="4"></textarea></td><td class="f rr moodbox-zone"><div class="moodbox"></div></td></tr></table></div><div class="inputs" style="position:relative; text-align: right"><div class="scripted"><a class="smbutton smbutton-big preview" tabindex="6" href="javascript:void(0)"><span>Preview</span></a><span style="display: inline-block; width: 10px">&nbsp;</span><a class="smbutton smbutton-green smbutton-big" tabindex="5" href="javascript:void(0)"><span class="post">Submit Comment</span></a></div><div class="unscripted"><input class="post" type="submit" value="Send" tabindex="1"></div><div style="position:absolute;left:0;top:0;font-size:8.25pt;text-align:left"><br><input type="checkbox" id="remove_message_after_reply" value="1" checked><label for="remove_message_after_reply">Remove this message after I reply</label></div></div></div>',
        nodeMap: {
            files: {
                get: function() {
                    return $("div.talk-files", this.node)[0]
                }
            }
        },
        renderMoodBox: function() {
            return DWait.ready("jms/lib/pager.js.mood.js", bind(this, this.renderMoodBox2)), $(".moodbox", this.node)[0]
        },
        renderMoodBox2: function() {
            return $(".f.rr", this.node).remove(), !1
        },
        getText: function() {
            return $("textarea.text", this.node).val()
        },
        getTextToSave: function() {
            var e = this.getText();
            if (!$("textarea.text", this.node).attr("writer")) return e;
            var t = document.createElement("div");
            if (t.innerHTML = e, e.length > t.innerHTML.length) return e;
            var i = [".embedded-deviation", ".shadow-holder", ".writer-embed", "da\\:deviation", "da\\:thumb", "da\\:drawing"];
            return $(t).find($.map(i, function(e) {
                return "span>" + e
            }).join(",")).not(function() {
                return $(this).siblings().length || $(this).parent("[align]").length
            }).unwrap(), $(t).find($.map(i, function(e) {
                return "div>" + e
            }).join(",")).not(function() {
                return $(this).siblings(":not(br)").length || $(this).parent("[align]").length
            }).unwrap(), t.innerHTML.replace(/&amp;([^\s;]+?);/gi, "&$1;")
        },
        setPreviewText: function(e) {
            $(".previewbox", this.node).html(['<i class="l"></i>', '<a class="previewclose">Close Preview</a>', '<div class="previewbox-content">', e, "</div>"].join("")), $(".previewbox .previewclose", this.node).on("click", bind(this, function() {
                this.goMode("normal", !0)
            }));
            var t = $(".previewbox .previewbox-content", this.node),
                i = 0;
            t.height($(".previewbox", this.node).height() - 16), t.children().each(function() {
                i += $(this).height()
            }), i > t.height() && $(".previewbox", this.node).addClass("in-scroll")
        },
        focus: function() {
            "normal" == this.current_mode && $(".text", this.node)[0].focus()
        },
        textareaKeydown: function(e) {
            this.tab_pressed = 9 == e.keyCode
        },
        textareaBlur: function() {
            if (this.tab_pressed && -1 == document.activeElement.className.indexOf("post")) {
                var e = this.textarea;
                setTimeout(function() {
                    $(e).closest(".talk-post").find(".post:visible").parent().focus()
                }, 100)
            }
        },
        current_mode: null,
        goMode: function(e, t) {
            if (e != this.current_mode) {
                var i = $(this.node);
                switch (this.current_mode, this.current_mode = e, e) {
                    case "busy":
                    case "muro_saving":
                        i.find(".text, .preview, .post").attr("disabled", "disabled"), i.find(".preview, .post").addClass("disabledbutton"), i.find(".inputblocker").css({
                            visibility: "hidden",
                            display: "block"
                        });
                        var s = this.commentwriter ? i.find(".cctextarea") : i.find(".text");
                        i.find(".inputblocker").css({
                            height: s.outerHeight(),
                            width: s.outerWidth()
                        }), i.find(".inputblocker").css("visibility", "visible");
                        break;
                    case "normal":
                        i.find(".text, .preview, .post").removeAttr("disabled"), i.find(".preview span, span.preview").val("Preview").html("Preview"), i.find(".preview, .post").removeClass("disabledbutton"), i.removeClass("ccwriter-preview").find(".previewbox").hide(), i.find(".text").css("visibility", "visible"), t !== !1 && i.find(".text").trigger("focus.talkpost"), this.commentwriter && ($(".commentwriter-toolbar .commentwriter-preview em").text("Preview"), i.find(".drawPlz").show(), t !== !1 && (this.commentwriter.active ? this.commentwriter.ccwriter.writer.$node.trigger("focus.talkpost") : this.commentwriter.attach(i.find("textarea"), !0))), i.find(".inputblocker").hide();
                        break;
                    case "preview":
                        i.find(".preview, .post").removeAttr("disabled").removeClass("disabledbutton"), i.find(".previewbox").css({
                            visibility: "hidden",
                            display: "block"
                        }), this.commentwriter ? ($(".commentwriter-toolbar .commentwriter-preview em").text("Edit"), i.find(".preview span, span.preview").val("Edit").html("Edit").removeAttr("disabled"), i.addClass("ccwriter-preview").find(".previewbox").css({
                            height: i.find(".cctextarea").outerHeight()
                        })) : (i.find(".preview span, span.preview").val("Preview Off").html("Preview Off").removeAttr("disabled"), i.find(".previewbox").css({
                            height: i.find(".text").outerHeight(),
                            width: i.find(".text").outerWidth()
                        })), i.find(".text").css("visibility", "hidden"), i.find(".previewbox").css("visibility", "visible");
                        break;
                    case "fail":
                        DiFi.stdErr(null, this.last_fail_reason), this.goMode("normal")
                }
            }
        },
        showCancel: function() {
            $(".cancel", this.node).show()
        },
        confirmCancel: function() {
            return $(".cancel", this.node).hide(), PubSub.publish("WriterAnywhere.collapse"), !1
        },
        confirmExit: function() {
            return this.commentDrawing && !confirm("If you do this, you will lose your current drawing.\nAre you sure?") ? !1 : (this.callback && this.callback("closed"), this.commentwriter ? this.commentwriter.detach().done(bind(this, function() {
                window.WriterAnywhereFactory && WriterAnywhereFactory.remove($(this.node).find("textarea")), this.off()
            })) : this.off(), !1)
        },
        confirmPost: function(e) {
            try {
                !this.commentDrawing && mgr && mgr.canvasDrawing && (this.commentDrawing = mgr.canvasDrawing)
            } catch (t) {}
            if (window.event && (event.cancelBubble = !0), "busy" != this.current_mode && (void 0 === e || "keypress" !== e.type || 13 === e.keyCode)) {
                var i, s, o, n;
                if (-1 == this.getText().search(/[^\s]/g) && !this.commentDrawing) return this.focus(), !1;
                if (this.drawplz_saving > 0) {
                    if ("muro_saving" == this.current_mode) return;
                    this.goMode("muro_saving");
                    var r = setInterval(bind(this, function() {
                        this.drawplz_saving > 0 || (this.confirmPost(), clearInterval(r))
                    }), 100)
                } else {
                    if (this.goMode("busy"), i = 0, s = 0, this.exo_files ? (this.exo_files[0] && this.exo_files[0].file && (i = this.exo_files[0].file.deckId), this.exo_files[1] && this.exo_files[1].file && (s = this.exo_files[1].file.deckId)) : $(".talk-files", this.node)[0] && (o = $(".talk-files a", this.node), i = Number(o[0].getAttribute("attachdeckid") || 0), s = Number(o[1].getAttribute("attachdeckid") || 0)), this.comment.time_index || i || s) DiFi.pushPost("Comments", "filmPost", [this.getTextToSave(), this.comment.itemid, this.comment.parentid || 0, this.comment.typeid, this.mood || 0, this.comment.time_index || 0], this.posted, this);
                    else {
                        if (n = GMI.up(this.node, "CCommentThread"), n && n.rcpStallQueue && n.rcpStallQueue(!0), this.commentDrawing) {
                            var a;
                            if (a = this.getCommentImage()) return DiFi.pushPost("DrawPlz", "post_comment", [this.getTextToSave(), a, this.comment.itemid, this.comment.parentid || 0, this.comment.typeid, this.mood || 0], this.posted, this), DiFi.send(), void 0
                        }
                        deviantART.pageData.messages ? DiFi.pushPost("Comments", "post_from_messagecenter", [this.getTextToSave(), this.comment.itemid, this.comment.parentid || 0, this.comment.typeid, this.mood || 0, $("#remove_message_after_reply").prop("checked") ? 1 : 0], this.posted, this) : (61 == this.comment.typeid && Glbl("Site.is_stash") && PubSub.publish("Minibrowse.uncache", deviantART.pageData.privateid), DiFi.pushPost("Comments", "post", [this.getTextToSave(), this.comment.itemid, this.comment.parentid || 0, this.comment.typeid, this.mood || 0], this.posted, this))
                    }
                    DiFi.send()
                }
            }
        },
        confirmPreview: function() {
            return window.event && (event.cancelBubble = !0), $(this.node).find(".commentwriter-toolbar .commentwriter-preview").toggleClass("active"), "preview" == this.current_mode ? (this.goMode("normal", !0), void 0) : (this.setPreviewText("Loading preview"), previewHasThumbs = 1, this.commentwriter ? DiFi.pushPost("Comments", "preview_v2", [this.getText().replace(/&amp;([^\s;]+?);/gi, "&$1;"), previewHasThumbs, this.comment.typeid, this.comment.itemid], this.preview, this) : DiFi.pushPost("Comments", "preview", [this.getText(), previewHasThumbs], this.preview, this), DiFi.send(), this.goMode("preview"), void 0)
        },
        preview: function(e, t) {
            return e ? (this.setPreviewText(t.response.content), void 0) : ("preview" == this.current_mode && (this.goMode("normal"), this.setPreviewText("")), void 0)
        },
        posted: function(e, t, i) {
            var s, o;
            if (threadGMI = $(this.node).parents(":gmi(CCommentThread)"), threadGMI.length && (thread = threadGMI.gmi1(), thread && thread.rcpStallQueue && (e && (thread.recently_rendered[t.response.content.commentid] = 1), thread.rcpStallQueue(!1))), !e) return this.last_fail_reason = "string" == typeof(t.response.content || {}).error ? t.response.content.error : "There was an error while posting the comment.\n\nPlease try again soon.", this.goMode(i ? "normal" : "fail"), void 0;
            s = t.response.content, o = {
                commentid: s.id,
                parentid: this.comment.parentid,
                typeid: this.comment.typeid,
                itemid: this.comment.itemid,
                username: deviantART.deviant.username,
                symbol: deviantART.deviant.symbol,
                usericon: deviantART.deviant.usericon,
                ts: Math.floor((new Date).valueOf() / 1e3),
                attributes: t.request.args[5] << 16 | t.request.args[4] << 3,
                depth: void 0,
                text: s.body,
                signature: null,
                files: s.files,
                html: s.html
            };
            try {
                HALT()
            } catch (n) {}
            this.constructor.localCache["text" + (Number(this.comment.parentid) || "t" + (this.comment.time_index || 0))] = null, this.constructor.localCache["mood" + (Number(this.comment.parentid) || "t" + (this.comment.time_index || 0))] = null, $(".text", this.node)[0].value = "", this.callback && this.callback("posted", o), this.commentwriter ? (this.commentwriter.ccwriter.writer.syncer.sync(!0), this.commentwriter.detach().done(bind(this, function() {
                window.WriterAnywhereFactory && WriterAnywhereFactory.remove($(this.node).find("textarea")), this.owner ? this.off() : $(".inputs", this.node).hide()
            }))) : this.owner && this.off()
        },
        reset: function(e) {
            var t;
            if (this.goMode("normal", e), $("textarea", this.node).val(""), this.owner && (this.owner.textarea_focused = 0, this.owner.refreshTextareaState()), this.pager && (Pager.select(this.pager, ""), Pager.loadPage(this.pager, "mood")), this.exo_files) for (t = 0; t != this.exo_files.length; t++) this.exo_files[t] && this.exo_files[t].file && this.exo_files[t].deckNuke()
        },
        browserSupportsCommentDrawings: function() {
            return !Browser.isIE8
        },
        hookDrawingUI: function() {
            var e = this.comment.allowdrawings && this.browserSupportsCommentDrawings();
            if (e) {
                if (!$(".drawPlz", this.node).length) {
                    var t = '<div class="drawPlz"><div class="topbar hh">' + (e ? '<a href="#showDrawPlz" class="showDrawPlz">Add a Drawing</a>' : "") + "</div>" + "</div>",
                        i = jQuery("textarea", this.node),
                        s = -1 != (" " + this.node.className + " ").indexOf(" talk-post-reply ");
                    s ? (t = '<tr><td colspan="2">' + t + "</td></tr>", i.closest("tr").after(jQuery(t))) : jQuery(".cctextarea", this.node).append(jQuery(t))
                }
                $(this.node).on("click", ".editDrawing", this.drawPlz_edit.bindTo(this)), $(this.node).on("click", ".hideDrawPlz, .hideDrawing", this.drawPlz_hide.bindTo(this)), this.drawplz_saving = this.drawplz_saving || 0;
                var o = $(".showDrawPlz", this.node)[0];
                this.localEventHook(o, "mouseover", this.drawPlz_mouseover.bindTo(this)), this.localEventHook(o, "mouseout", this.drawPlz_mouseout.bindTo(this))
            }
        },
        drawPlz_show: function(e) {
            e.preventDefault();
            var t = 450,
                i = 340,
                s = $(this.node);
            s.find(".drawPlz").hide(), DiFi.pushPost("DrawPlz", "inline_html", [], function(e, o) {
                if ("SUCCESS" == o.response.status) {
                    var n = o.response.content.htmlContent,
                        r = -1 != this.node.className.indexOf("talk-post-reply");
                    if (r) {
                        var a = s.find("tr").get(0);
                        $(a).after('<tr><td colspan="2">' + n + "</td></tr>")
                    } else s.find(".cc-without-moods").append(n);
                    Browser.isIE && s.find("canvas").each(function() {
                        var e = {};
                        el = this;
                        var t = ["class", "style", "width", "height"];
                        for (var i in t) {
                            var s = el.getAttribute(t[i]);
                            s && (e[t[i]] = s)
                        }
                        var o = $(el).parent().get(0);
                        $(el).remove();
                        var n = document.createElement("canvas");
                        for (var i in e) n.setAttribute(i, e[i]);
                        o.appendChild(n)
                    }), DWait.ready(["jms/lib/localStorage.js", "jms/pages/drawplz/managers.js"], function() {
                        window.manager = new Managers(s.find(".drawPlzContainer").get(0), t, i), this.commentDrawing = manager.canvasDrawing
                    }.bindTo(this))
                }
            }.bindTo(this)), DiFi.send()
        },
        drawPlz_updateImage: function(e, t) {
            this.commentDrawing = e;
            var i = $(this.node),
                s = t,
                o = i.hasClass("talk-post-reply");
            o ? (i.find(".drawPlzComment").parents("tr").remove(), i.find("tr").eq(0).after('<tr><td colspan="2">' + s + "</td></tr>")) : (i.find(".drawPlzComment").remove(), i.find(".cc-with-moods .cctextarea").append(s))
        },
        drawPlz_edit: function() {},
        drawPlz_hide: function(e) {
            if (this.drawplz_hovered = 0, this.commentDrawing) {
                if (1 != e && !confirm("If you do this, you will lose your current drawing.\nAre you sure?")) return;
                var t = $(this.node);
                t.find(".hideDrawPlz, .info").hide().eq(0).parent().find(".showDrawPlz").show(), t.find(".drawPlz").show(), t.find(".drawPlzContainer, .drawPlzComment").remove(), this.commentDrawing = null
            }
        },
        getCommentImage: function() {
            return this.commentDrawing && this.commentDrawing.hasUnsavedWork() ? this.commentDrawing.getSaveData() : !1
        },
        drawPlz_mouseover: function() {
            this.drawplz_hovered = 1
        },
        drawPlz_mouseout: function() {
            this.drawplz_hovered = 0
        }
    },
    function(e) {
        Browser.isMobile || Glbl("Site.is_mobile") || e(document).on("mouseover.ccwriter", ".talk-tower", function() {
            DWait.ready(["cssms/lib/writer.css", "cssms/pages/stash/stash.override.thumbs.css", "cssms/pages/stash/stash.header.css", "cssms/lib/writer-subtoolbar.css", "cssms/lib/muro_comment.css", "jms/lib/writer/factory.js", "jms/lib/sidebar.js"], function() {
                ddt.log("writer", "CommentWriter preloaded")
            }), e(document).off("mouseover.ccwriter")
        })
    }(jQuery), window.DWait && DWait.run("jms/pages/talkpost.js")
});
DWait.ready(["jms/lib/bind.js", "jms/lib/browser.js", "jms/lib/gwebpage.js", "jms/lib/popup2.js", "jms/lib/jquery/jquery.current.js", ".domready"], function() {
    (function(i) {
        window.GiveMenu = {
            show: function(e, n) {
                popup = new Popup2("GiveMenu", "body", {
                    classes: "givemenu",
                    content: '<div class="pager2"><div class="blockmenu"><div class="loading">Loading</div></div></div>',
                    destroy: !0
                }), popup.show(popup.position(i(e), {
                    align: "right",
                    bump: {
                        left: 15
                    }
                })), DiFi.pushPublicGet("User", "getGiveMenu", [n], bind(this, this.difiCallback, e, popup)), DiFi.send()
            },
            difiCallback: function(e, n, t, s, o) {
                if (!t || !s.response.content.html) return o ? null : DiFi.stdErr("Failed to load give menu", s.response.content);
                gWebPage.update(s.response.content);
                var u = i(s.response.content.html),
                    a = this;
                u.find("a.morelink").click(function() {
                    u.find(i(this).attr("rel")).show(), i(this).remove(), a.heightCalc(n)
                }), setTimeout(bind(this, this.actualDisplay, u, e, n), 50)
            },
            actualDisplay: function(i, e, n) {
                n.$node.html(i.show()), this.heightCalc(n)
            },
            heightCalc: function(i) {
                i.$node.height(i.$node.find("div.blockmenu").height() + (Browser.isIE ? 4 : 0))
            }
        }, i(document).on && i(document).on("click", "[givemenu]", function(e) {
            e.preventDefault(), e.stopPropagation(), GiveMenu.show(this, i(this).attr("givemenu"))
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/givemenu.js")
});
DWait.ready(["jms/lib/gmi.js", "jms/lib/pubsub.js", "jms/lib/image_lazy_load.js"], function() {
    window.CCommentThread = CCommentThread = (window.GMIHub || GMIBase).extend({
        gmiConstructor: function() {
            PubSub.publish("ImageLazyLoad.activate"), this.scrollHandler = function() {
                PubSub.publish("ImageLazyLoad.delayedUpdate")
            }, $("#output, .bubbleview").on("scroll", this.scrollHandler)
        },
        gmiDestructor: function() {
            $("#output, .bubbleview").off("scroll", this.scrollHandler)
        },
        DR_SEL: "span.drawplz.closed",
        HT_SEL: "span.thumb-attachment.closed",
        B_SEL: "div.drawplz-attachment-ctrl",
        recently_rendered: {},
        toggleAttachmentButton: function() {
            (this.$.parent().find(this.DR_SEL).length || this.$.parent().find(this.HT_SEL).length) && this.$.parent().find(this.B_SEL).show().find(".gmbutton2").click(bind(this, this.clickAttachmentButton))
        },
        clickAttachmentButton: function() {
            return this.$.parent().find(this.B_SEL).hide(), this.$.parent().find(this.DR_SEL).removeClass("closed").unbind("click").removeClass("dwait"), this.$.parent().find(this.HT_SEL).each(function() {
                $(this).removeClass("closed").unbind("click").removeClass("dwait").next(".shadow-holder, .embedded-deviation").show(), $(this).next("a.thumb-attachment-content").replaceWith(function() {
                    return $(this).data("html")
                })
            }), PubSub.publish("ImageLazyLoad.delayedUpdate"), !1
        },
        hubRecv: function(t) {
            switch (t.cmd) {
                case "new":
                    if (t.commentid in this.recently_rendered) return;
                    this.renderNewComment(t, {})
            }
        },
        renderNewComment: function(t, e) {
            var n, i, o;
            console.log("renderNewComment", t, e), this.recently_rendered[t.commentid] = 1, this.gmi_node.firstChild && (this.gmi_node.firstChild.className || "").indexOf("expendable") >= 0 && (this.gmi_node.innerHTML = ""), o = Number(t.parentid);
            var a = [];
            if (o && o != this.gmi_args.rootid ? $.each(this.gmiQuery("CComment", {
                match: {
                    commentid: t.parentid
                }
            }), function(t, e) {
                n = e.gmi_node, n && (n = $(n.nextSibling).hasClass("nest") ? n.nextSibling : $('<div class="nest"></div>').insertAfter(n)[0]), a.push(n)
            }) : $.each(GMI.query("CCommentThread"), function(e, i) {
                t.itemid == i.gmi_args.itemid && t.typeid == i.gmi_args.typeid && (n = i.gmi_node, a.push(n))
            }), a.length) {
                var s = this;
                $.each(a, function(e, n) {
                    i = $($.trim(t.html)).hide()[2 == Number(s.gmi_args.order) ? "prependTo" : "appendTo"](n).fadeIn(400).gmiWake()[0]
                })
            } else console.log("Skipped comment rendering; parent is out of view");
            return i && e.scroll_to && setTimeout(function() {
                var t = $(i).offset().top,
                    e = t + $(i).height(),
                    n = $(document).scrollTop(),
                    o = n + $(window).height();
                console.log(t, e, n, o, n > t, e > o), (n > t || e > o) && (window.scrollTo ? window.scrollTo(0, t - 30) : document.body.scrollTop = t - 30)
            }, 100), i
        }
    }), window.CCommentMaster = CCommentMaster = GMIBase.extend({
        gmiConstructor: function() {}
    }), DWait.init("ccommentthread_wake_and_click", function(t) {
        $(t).gmiWake().gmiEach(function() {
            this.clickAttachmentButton()
        })
    }), DWait.init("ccommentthread_wake_and_toggle", function(t) {
        $(t).gmiWake().gmiEach(function() {
            this.toggleAttachmentButton()
        })
    }), window.DWait && DWait.run("jms/pages/ccommentthread.js")
});
DWait.ready(["jms/lib/gmi.js", "jms/lib/dtlocal.js", "jms/lib/popup2.js", "jms/pages/ccommentthread.js", "jms/lib/analytics.js", "jms/lib/jquery/plugins/jquery.imagesloaded.js", "jms/lib/pubsub.js", "jms/lib/image_lazy_load.js"], function() {
    window.CComment = CComment = GMIBase.extend({
        gmiConstructor: function() {
            DTLocal.infect(this), this.permahidden = this.gmi_args.permahidden, this.$.find("span.drawplz.closed").click(this.specialAttachmentClick), this.$.find("span.thumb-attachment.closed").each(function() {
                $(this).show().next(".shadow-holder, .embedded-deviation").hide(), $(this).hasClass("show-image-thumbs") && this.addEventListener && this.addEventListener("click", function(e) {
                    var t = $(this);
                    return t.hasClass("no-after") || (t.addClass("no-after"), t.children("img").each(function(t, i) {
                        var a = i,
                            s = {
                                top: 0,
                                left: 0
                            }, n = {
                                width: i.offsetWidth,
                                height: i.offsetHeight
                            };
                        do s.top += a.offsetTop, s.left += a.offsetLeft;
                        while (a = a.offsetParent);
                        e.pageX >= s.left && s.left + n.width >= e.pageX && e.pageY >= s.top && s.top + n.height >= e.pageY && (e.stopImmediatePropagation(), $(i).trigger(new $.Event("click")))
                    })), !1
                }, !0)
            }), this.$.find("span.thumb-attachment.closed").on("click", this.thumbAttachmentClick), this.groupAttachmentButtons(), PubSub.publish("ImageLazyLoad.activate"), PubSub.publish("ImageLazyLoad.delayedUpdate")
        },
        gmiDestructor: function() {
            this.localDestroy()
        },
        groupAttachmentButtons: function() {
            $(".thumb-attachment.closed.show-image-thumbs", this.$).each(function() {
                for (var e = $(this), t = this, i = []; t = t.previousSibling;) if (3 == t.nodeType && (t.textContent || t.nodeValue).match(/^\s+$/) || "BR" == t.nodeName) i.unshift(t);
                else if (!$(t).is(".thumb-attachment-content")) {
                    if ($(t).is(".thumb-attachment")) break;
                    return
                }
                if (t) {
                    var a = $(t);
                    if ("none" == a.css("display") || $("img", t).length >= 5) e.css("display", "none"), $("img", t).length >= 5 && !a.hasClass("contains-more-thumbs") && a.addClass("contains-more-thumbs");
                    else {
                        for (var s = "", n = 0; i.length > n; n++) s += 3 == i[n].nodeType ? i[n].textContent || i[n].nodeValue : i[n].outerHTML, this.parentNode.removeChild(i[n]);
                        a.append($("img", e)), a.next("a.thumb-attachment-content").data({
                            html: a.next("a.thumb-attachment-content").data("html") + s + e.next("a.thumb-attachment-content").data("html")
                        }), e.next("a.thumb-attachment-content").add(e).remove()
                    }
                }
            }), Glbl("Site.is_stash") && this.$.find("span.thumb-attachment.closed").click()
        },
        replyClick: function() {
            var e, t, i;
            return window.event && (event.cancelBubble = !0), this.local.talkpost ? (this.local.talkpost.focus(), !1) : (this.local.talkpostnode = e = document.createElement("div"), e.className = "nest", e.innerHTML = '<div class="ccomment ccomment-post ch"><i class="tl c"><i></i><b></b></i><i class="tr c"><i></i><b></b></i><i class="bl c"><i></i><b></b></i><i class="br c"><i></i><b></b></i><div class="ch-ctrl"><br/></div></div>', this.local.talkpost = t = new TalkPost(this, {
                typeid: this.gmi_args.typeid || -1,
                itemid: this.gmi_args.itemid || -1,
                parentid: this.gmi_args.commentid,
                allowdrawings: this.gmi_args.allowdrawings
            }, bind(this, this.replyCallback), {
                pager_theme: "light",
                show_icon: !0,
                hide_moods: this.gmi_args.hidemoods
            }), t.local_tie = "talkpostnode", i = e.getElementsByTagName("br")[0], t.node.style.display = "block", i.parentNode.replaceChild(t.node, i), this.gmi_node.className += " ccomment-activereply", this.gmi_node.nextSibling ? this.gmi_node.parentNode.insertBefore(e, this.gmi_node.nextSibling) : this.gmi_node.parentNode.appendChild(e), t.focus(), this.logged_expand || (this.logged_expand = !0), !1)
        },
        replyCallback: function(e, t) {
            if (this.local.talkpost) switch (e) {
                case "posted":
                    this.callback_post && this.callback_post(t), this.local.talkpost.local_tie = null, this.localClean(TalkPost), this.local.talkpostnode.parentNode.removeChild(this.local.talkpostnode);
                    var i = this.gmiUp("CCommentThread");
                    i || (i = GMI.query("CCommentThread")[0]), console.log("ccommentthread", i), i && !i.renderNewComment(t, {
                        fast: !0,
                        scroll_to: !0
                    }), this.local.talkpostnode = null, PubSub.publish("PageViewTracker.pageview", {
                        page: "/vpv/difi/commentpost",
                        tag: "Dynamic.Comment"
                    });
                case "closed":
                    this.gmi_node.className = this.gmi_node.className.replace(/\bactivereply\b/g, "")
            }
        },
        unhideClick: function() {
            return this.permahidden ? this.setHideState(!1) : this.difi("unhide", "displaying this comment"), window.event && (event.cancelBubble = !0), !1
        },
        hideClick: function() {
            this.permahidden ? this.setHideState(!0) : this.difi("hide", "hiding this comment")
        },
        reportClick: function() {
            this.permahidden ? alert("This comment has already been reported.") : !this.loading && confirm("Report this comment as spam?") && this.difi("reportSpam", "reporting this comment as spam")
        },
        doPopup: function(e) {
            var t = "<div class='blockmenu'><div style='position:relative'><a class='f' href='#' onclick='GMI.up(this).hideClick();Popup2.hideAll(); return GMI.evCancel();'>Hide Comment</a>";
            e === !1 && (t += "<a href='#' class='f' onclick='GMI.up(this).reportClick();Popup2.hideAll(); return GMI.evCancel();'>Report Spam</a><a class='f' href='#' onclick='GMI.up(this).blockClick();Popup2.hideAll();return GMI.evCancel();'>Block User</a>"), t += "</div></div>";
            var i = $(this.gmi_node).find(".gm-chaos");
            return CComment.popup = new Popup2("GroupListManage", "body", {
                classes: "ccomment-manage",
                content: t,
                destroy: !0,
                created: function(e) {
                    e.$node.attr("gmi-redirect", this.gmi_node.getAttribute("gmindex"))
                }.bindTo(this),
                hidden: function() {
                    i.find(".gmbutton2").removeClass("active")
                },
                shown: function() {
                    i.find(".gmbutton2").addClass("active")
                }
            }), CComment.popup.show(CComment.popup.position(i, {
                align: "right"
            })), !1
        },
        blockClick: function() {
            a = $("a.u", this.gmi_node)[0], author = a.firstChild.nodeValue, confirm("Add " + author + " to your blocked users list?") && (DiFi.pushPost("User", "block", [author], function(e, t) {
                e ? alert(author + " has been added to your list of blocked users.") : t.response.content.error ? alert(t.response.content.error) : alert("deviantART was unable to add " + author + " to your blocked users list.")
            }), DiFi.send())
        },
        specialAttachmentClick: function() {
            $(this).removeClass("closed").unbind("click").removeClass("dwait"), PubSub.publish("ImageLazyLoad.update")
        },
        thumbAttachmentClick: function(e) {
            var t = null,
                i = $(e.target),
                a = $.Deferred();
            i.is("img") && (t = i.data("deviationid")), $(this).closest(".ccomment").find(".thumb-attachment.closed").each(function() {
                $(this).removeClass("closed").unbind("click").removeClass("dwait").next(".shadow-holder, .embedded-deviation").show(), $(this).next("a.thumb-attachment-content").replaceWith(function() {
                    return $(this).data("html")
                })
            }).end().imagesLoaded().done(function() {
                a.resolve()
            }), PubSub.publish("ImageLazyLoad.delayedUpdate"), setTimeout(function() {
                "resolved" != a.state() && a.reject()
            }, 1e3), a.done(bind(this, function() {
                if (t) {
                    var e = $("[deviationid=" + t + "]", this.$).not("img");
                    if (e.length) {
                        var i = $(window).scrollTop(),
                            a = $(window).height(),
                            s = e.offset().top,
                            n = e.height();
                        (i > s + n || s > i + a) && $("html, body").animate({
                            scrollTop: s - 25
                        }, 200)
                    }
                }
            }))
        },
        difi: function(e, t) {
            var t;
            this.loading || (this.loading = !0, this.gmi_node.className += " ccomment-loading", DiFi.pushPost("CommentAttributes", e, [this.gmi_args.commentid, this.gmi_args.itemid, this.gmi_args.typeid], bind(this, this.difiDone, t)), DiFi.timer(1))
        },
        difiDone: function(e, t, i) {
            if (this.gmi_node.className = this.gmi_node.className.replace(/\bccomment.loading\b/g, ""), this.loading = !1, !t) return alert("There was an error while " + e + ".\n\nPlease try again soon."), void 0;
            switch (i.request.method) {
                case "reportSpam":
                    if (this.permahidden = !0, !CComment.SPAM_REPORT_DONE) {
                        var a, s, n;
                        CComment.SPAM_REPORT_DONE = !0, a = $("a.u", this.gmi_node)[0], s = a.firstChild.nodeValue, n = a.previousSibling.nodeValue, i.response.content.can_report_all && s && confirm("Would you also like to scan for comments by " + n + s + " on your user page, deviations, journals, etc.?") ? (DiFi.pushPost("CommentAttributes", "removeSpamOnUser", [s], function(e) {
                            e ? alert("The process of removing spam from your user page, deviations, journals, etc., has started.\nYou will be notified with a note once this is complete.") : alert("deviantART was unable to start the process of removing all spam by this user.\nWe appreciate your effort, and ask you to please try again shortly.")
                        }), DiFi.timer(1)) : alert("Thank you for your report.")
                    }
                case "hide":
                    this.makeUnhideLink(), this.setHideState(!0);
                    break;
                case "unhide":
                    this.setHideState(!1)
            }
        },
        makeUnhideLink: function() {
            var e, t;
            e = (this.gmi_node.getElementsByTagName("a") || [])[0], e && "creason" == e.className || (e = document.createElement("a"), e.onclick = bind(this, this.unhideClick), e.href = "#", e.className = "creason", t = this.gmi_node.getElementsByTagName("div")[0], t.insertBefore(e, t.firstChild)), e.innerHTML = "<span>" + (this.permahidden ? "Flagged as Spam" : "Hidden by Owner") + "</span><em>" + (this.permahidden ? "Peek" : "Undo Hide") + "</em>"
        },
        setHideState: function(e) {
            e ? this.gmi_node.className += " ccomment-hidden" : this.gmi_node.className = this.gmi_node.className.replace(/\bccomment.hidden\b/g, ""), PubSub.publish("ImageLazyLoad.update")
        }
    }), window.DWait && DWait.run("jms/pages/ccomment.js")
});
window.TabledResourceStream = ResourceStream.extend({
    domFindVisible: function() {
        var e, t, r, i;
        t = {}, i = 0;
        var o = $(this.gmi_node).find(".tt-a, .rs-customicon-cont, .gl-text");
        for (e = 0; r = o[e]; e++) r.getAttribute("rs_ignore") || (t[i+++this.gs_offset] = r);
        return t
    },
    dataFetch: function() {},
    gmiConstructor: function() {
        this.preview_override_selection_type = TabledResourceStreamSimpleSelection, this.base()
    },
    get_stream_node_from_clicked_node: function(e) {
        return $(e).closest(".tt-a").get(0)
    }
}), window.TabledResourceStreamSimpleSelection = window.ResourceStreamSimpleSelection.extend({
    getAllSelectable: function() {
        return $(".tt-a", this.root).toArray()
    },
    isSelectable: function(e) {
        return $(e).hasClass("tt-a")
    }
}), window.DWait && DWait.run("jms/lib/gstream/tabled_resource_stream.js");
DWait.ready(["jms/lib/Base.js", "jms/legacy/modals.js", "cssms/modals/signup-modal.css"], function() {
    SignupBase = Base.extend({
        constructor: function() {
            $(window).bind("message", function(e) {
                e.originalEvent && "http://verify.deviantart.com" === e.originalEvent.origin && e.originalEvent.data.match(/"command":"close"/) && Modals.pop("finished")
            })
        },
        modalUp: !1,
        dificalls: [],
        modal: function(e, i, s) {
            var t, a, o = "520";
            if (s) a = s;
            else {
                var n = location.hostname.split(".")[0];
                window.location.hostname.match(/sta.sh$/) ? (a = "https://sta.sh/login/oauth/modal", o = "550") : a = ((window.deviantART || {}).deviant || {}).id ? "http://verify.deviantart.com/?from=Modal&subdomain=" + n + "&referrer=" + encodeURIComponent(location.href) : "https://www.deviantart.com/join/?joinview=Modal&joinpoint=" + encodeURIComponent(i.request["class"]) + "&subdomain=" + n
            }
            if (t = $('<div class="secure"><div class="join-modal-title"><h3>Sign Up<span> or Log In</span></h3></div><div class="join-modal-contents" style="height:' + o + 'px;">' + '<div id="loading_iframe">' + '<img src="http://s.deviantart.com/emoticons/e/eager.gif" />Loading&hellip;' + "</div>" + '<iframe scrolling="no" allowtransparency="true"  src="' + a + '" frameBorder="0" ' + "onload=\"$(this).show().closest('.secure').addClass('loaded').parent().width($(this).closest('.secure').width()).height($(this).closest('.secure').height()); $('#loading_iframe').hide();\">" + "</iframe>" + "</div>" + "</div>")[0], this.dificalls.push([e, i]), !this.modalUp) {
                var d = Modals.factory(t);
                Modals.push(d, bind(this, this.done), "join-modal")
            }
            this.modalUp = !0
        },
        done: function(e) {
            e && gWebPage.update(e), this.modalUp = !1;
            for (var i, s, t, a = !1; i = this.dificalls.pop();) s = i[0], t = i[1], e && "finished" == e.result && t ? (a = !0, DiFi.pushPost(t.request["class"], t.request.method, t.request.args, s[0][0], s[1][0])) : s[0][0].call(s[1][0], e && "finished" == e.result, t, !0);
            if (a) {
                var o = ($("#overhead").data("header-refresh") || "DAWebpageHeader;getHeaderHTML").split(";");
                DiFi.pushPrivateGet(o[0], o[1], [], this.headerRefresh), DiFi.send()
            }
        },
        headerRefresh: function(e, i) {
            e ? ($("#overhead-sc").fadeOut(function() {
                gWebPage.update(i.response.content), $(this).html(i.response.content.html), PubSub.publish("Signup.headerRefresh"), $(this).fadeIn()
            }), $("#overhead tr").fadeOut(function() {
                gWebPage.update(i.response.content), $(this).html(i.response.content.html), PubSub.publish("Signup.headerRefresh"), $(this).fadeIn()
            })) : console.log("Err", i.response.content)
        }
    }), window.Signup = new SignupBase, window.DWait && DWait.run("jms/pages/signup.js")
});
DiFi.errorHooks.push(function(e, n, o) {
    return e || !n.response.content || "DiFi Security Access Error" != n.response.content.error || !n.response.content.details.privs || ((n.response.content.details.privs[0] || [])[2] || [])[0] != PRIV_LOGGEDIN && ((n.response.content.details.privs[0] || [])[2] || [])[0] != PRIV_VERIFIED || !window.Signup || window.location.hostname.match("dreamup") ? void 0 : (Signup.modal(o, n), !0)
}), window.DWait && DWait.run("jms/pages/difi_errorhook_signup.js");
(function(n) {
    n(".gmbutton2searchcancel").each(function() {
        var a = n(this),
            c = a.parent().find("input.gmbutton2");
        a.click(function() {
            c.val(""), c.change(), a.parents("form").submit()
        });
        var e = function() {
            c.val() ? a.addClass("show") : a.removeClass("show")
        };
        c.change(e), c.keyup(e), c.change()
    })
})(jQuery), window.DWait && DWait.run("jms/chrome/searchcancel.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", ".domready"], function() {
    var i = window.location.href.substring(window.location.href.indexOf("?") + 1);
    $("a.expand").each(function() {
        var n = $(this).attr("href");
        if ("#_expand_" == n.substring(0, 9)) {
            var t = n.substring(9),
                a = $("div[skinscript=expandable_" + t + "]");
            a.length && (a.hide(), $(this).click(function() {
                return a.toggle(), !1
            }), (i == $(this).attr("href").substring(1) || i.match("_expand_all")) && $(this).click())
        }
    }), window.DWait && DWait.run("jms/pages/catskin-expander.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/glbl.js"], function() {
    if (window.BrowserSupport = {
        getBrowser: function(e) {
            for (var r = 0; e.length > r; r++) {
                var t = e[r].string,
                    i = e[r].prop;
                if (this.versionSearchString = e[r].versionSearch || e[r].identity, t) {
                    if (-1 != t.indexOf(e[r].subString)) return e[r]
                } else if (i) {
                    if (!navigator.userAgent) return e[r];
                    if (-1 != navigator.userAgent.indexOf(e[r].identity)) return e[r]
                }
            }
            return null
        },
        getVersion: function(e) {
            var r = RegExp(this.versionSearchString + "/? ?([0-9]+(\\.?[0-9]+)*)"),
                t = e.match(r);
            return t ? t[1].split(".") : null
        },
        dataBrowser: [{
            string: navigator.userAgent,
            subString: "OPR",
            identity: "Opera",
            versionSearch: "OPR",
            min: [15, 0],
            link: "http://www.opera.com/"
        }, {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome",
            min: [22, 0],
            link: "http://www.google.com/chrome"
        }, {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version",
            min: [5, 0],
            link: "http://www.apple.com/safari/"
        }, {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version",
            min: [15, 0],
            link: "http://www.opera.com/"
        }, {
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox",
            min: [12, 0],
            link: "http://getfirefox.com"
        }, {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE",
            min: [8, 0],
            link: "http://microsoft.com/ie"
        }],
        getSupported: function() {
            var e = this.getBrowser(this.dataBrowser),
                r = this.getVersion(navigator.userAgent);
            if (e && r) {
                var t;
                return $.each(e.min, function(e, i) {
                    void 0 === t && r[e] && (i > r[e] && (t = !1), r[e] > i && (t = !0))
                }), void 0 === t && (t = r.length >= e.min.length), {
                    browser: e.identity,
                    version: r.join("."),
                    supported: t,
                    link: e.link
                }
            }
        }
    }, !Glbl("Site.is_mobile") && Glbl("BrowserSupport.enforce") !== !1) {
        var e = BrowserSupport.getSupported();
        $.isPlainObject(e) && !e.supported && $("#overhead-collect").before('<div id="update-browser-banner" style="background:url(http://st.deviantart.net/misc/updatebrowser_ylw_bg.png) repeat-x;width:100%;height:10px;line-height:10px;text-align:center;position:absolute;top:-1px;z-index:1000;font-family:verdana;font-size:10px;color:#3c3838;padding:10px 0px;text-shadow:#fff 1px 1px;">Please <a href="' + e.link + '" style="color:#1965B6;">upgrade your browser</a> to access deviantART<a href="#" style="position: fixed; top: 0px; right: 10px; font-size: 18px; line-height: normal; text-decoration: none; " onclick="$(this).parent().remove(); return false;">&times;</a>')
    }
    window.DWait && DWait.run("jms/pages/browser_support.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/Base.js", "jms/lib/pubsub.js"], function() {
    (function(e) {
        var t = Base.extend({
            _resize_throttle: 100,
            _debounce_fill_ad: 800,
            _page_debounce_times: {},
            _minimum_boundary: 100,
            _init: !1,
            _resize_mode: !1,
            _duperbrowse_mode: !1,
            _stashed_ad_html: [],
            _waiting_ad_units: [],
            _ads: {},
            _pool: [],
            _win_w: 0,
            _$win: null,
            constructor: function() {
                this._$win = e(window), this._win_w = this._$win.width()
            },
            fill_ad_slot: function(t, i) {
                if (!this._resize_mode) {
                    if (!i.is(":visible")) return ddt.log("bltads", "[" + t + "] invalid ad request with invisible node", i), void 0;
                    t += "";
                    var s = e.now();
                    if (!(this._page_debounce_times[t] && this._page_debounce_times[t] > s)) {
                        if (this._page_debounce_times[t] = s + this._debounce_fill_ad, i = e(i), ddt.log("bltads", "[" + t + "] ad request", i, i.offset()), !this.is_valid_ad_request(t, i)) return ddt.log("bltads", "[" + t + "] request denied! ", i, e.extend(!0, {}, this._ads)), void 0;
                        if (this._ads[t]) return ddt.log("bltads", "[" + t + "] ad repositioned"), this.position_ad(t, i), void 0;
                        this.show_container(), this.get_an_offscreen_ad(t), this.position_ad(t, i), ddt.log("bltads", "[" + t + "] request fulfilled with ad ", e.extend(!0, {}, {
                            ad: this.get_ad_by_page_id(t),
                            ads: this._ads,
                            pool: this._pool
                        })), this._init || (this._init = !0, this.bind_window_resize(), PubSub.subscribe([{
                            eventname: "Duperbrowse.opened",
                            subscriber: this,
                            callback: this.duperbrowse_opened
                        }, {
                            eventname: "Duperbrowse.closed",
                            subscriber: this,
                            callback: this.duperbrowse_closed
                        }]))
                    }
                }
            },
            stash_ad_html: function(t) {
                return this._waiting_ad_units.length ? (e(this._waiting_ad_units.shift()).html(t), void 0) : (5 >= this._stashed_ad_html.length && this._stashed_ad_html.push(t), void 0)
            },
            scroll_manager_is_done_resizing: function() {
                if (this._resize_mode && !this._duperbrowse_mode) {
                    ddt.log("bltads", "User stopped resizing, reposition ads; final window width: ", this._$win.width()), this._win_w = this._$win.width(), this.show_container();
                    for (var e = 0, t = this._pool.length; t > e; ++e) this.position_ad(this._pool[e]);
                    this.enter_normal_mode()
                }
            },
            enter_normal_mode: function() {
                ddt.log("bltads", "Ads acting in normal mode"), this._resize_mode = !1, this.show_container(), this.bind_window_resize()
            },
            enter_resize_mode: function() {
                ddt.log("bltads", "Ads acting in resize mode"), this._resize_mode = !0, this.unbind_window_resize(), this.hide_container()
            },
            unbind_window_resize: function() {
                ddt.log("bltads", "Unbinding window.resize"), this._$win.off("resize.browselikethis_ad_pool")
            },
            bind_window_resize: function() {
                ddt.log("bltads", "Binding window.resize"), this._$win.on("resize.browselikethis_ad_pool", e.throttle(this._resize_throttle, this.window_resize.bindTo(this)))
            },
            window_resize: function() {
                var e = this._$win.width();
                e != this._win_w && (this._win_w = e, ddt.log("bltads", "Horizontal window resize; new window width: ", e), this.enter_resize_mode())
            },
            duperbrowse_opened: function() {
                ddt.log("bltads", "duperbrowse opened, enter resize mode"), this._duperbrowse_mode = !0, this.enter_resize_mode()
            },
            duperbrowse_closed: function() {
                ddt.log("bltads", "duperbrowse closed, enter normal mode"), this._duperbrowse_mode = !1, this.enter_normal_mode()
            },
            position_ad: function(t, i) {
                var s = this.get_ad_by_page_id(t);
                s && (i = e(i), i.length && (s.$node = i), s.offset = s.$node.offset(), this._minimum_boundary > s.offset ? s.offset = {
                    top: -9999,
                    left: -9999
                } : Glbl("Site.is_mobile") && i.hasClass("mobile-ad") && i.css({
                    height: s.$el.outerHeight()
                }), s.$el.css(s.offset))
            },
            is_valid_ad_request: function(t, i) {
                if (!i.length) return ddt.log("bltads", t + " -------> invalid ad request: invalid $node"), !1;
                var s = this.get_ad_by_page_id(t);
                if (!s) return ddt.log("bltads", t + " -------> valid ad request: this page does not have an ad"), !0;
                if (!s.$node.is(i)) return ddt.log("bltads", t + " -------> valid ad request: this page changed its $node"), !0;
                var d = i.offset();
                return Math.floor(d.top) != Math.floor(s.offset.top) || Math.floor(d.left) != Math.floor(s.offset.left) ? (ddt.log("bltads", t + " -------> valid ad request: the $node has repositioned. offsets:", e.extend(!0, {}, {
                    node_offset: d,
                    ad_offset: s.offset
                })), !0) : (ddt.log("bltads", t + " -------> invalid ad request: duplicate."), !1)
            },
            get_ad_by_page_id: function(e) {
                return this._ads[e]
            },
            get_an_offscreen_ad: function(t) {
                var i = this._pool.length,
                    s = this._$win.scrollTop(),
                    d = s + this._$win.height();
                ddt.log("bltads", "ad_count: ", i, " screen_top: ", s, " screen_btm: ", d);
                for (var n = 0; i > n; ++n) {
                    var o = this._pool[n],
                        _ = this.get_ad_by_page_id(o);
                    if (_) {
                        var a = _.offset.top,
                            r = a + this.ad_height,
                            h = a >= s && d >= a || s >= a && r >= s;
                        if (ddt.log("bltads", "ad_index: ", n, " ad_top: ", a, " ad_btm: ", r, " onscreen: ", h), !h) return ddt.log("bltads", "ad_index ", n, " is not on screen, using it", e.extend(!0, {}, _)), this._pool.splice(n, 1), this._pool.push(t), this._ads[o] = null, this._ads[t] = _, _
                    }
                }
                var l = {
                    $el: this.create_ad_element(),
                    $node: e()
                };
                return l.offset = l.$el.offset(), this._pool.push(t), this._ads[t] = l, ddt.log("bltads", "no ads available, creating new ad at index ", i, " :: ", e.extend(!0, {}, l)), this.ad_height || (this.ad_height = l.$el.height()), l
            },
            get_container: function() {
                return this.$container || (this.$container = e("<div>").addClass("blt-ad-container").prependTo(document.body)), this.$container
            },
            hide_container: function() {
                ddt.log("bltads", "Container hidden"), this._container_hidden = !0, this.get_container().addClass("hidden")
            },
            show_container: function() {
                ddt.log("bltads", "Container shown"), this._container_hidden = !1, this.get_container().removeClass("hidden")
            },
            create_ad_element: function() {
                var t = this._stashed_ad_html.shift(),
                    i = e("<div>").addClass("blt-ad").appendTo(this.get_container());
                return t ? i.html(t) : this._waiting_ad_units.push(i), i
            }
        }),
            i = new t;
        PubSub.publish("BrowseLikeThisAdPool.instance_loaded", i)
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.ads.js")
});
(function(o) {
    function a(o) {
        for (var a, e = o.split("&"), n = {}, t = 0; e.length > t; t++) e[t].length && (a = e[t].split("=", 2), n[a[0]] = a[1]);
        return n
    }
    if (window.location.hash.indexOf("offset") > -1) {
        var e, n, t, i = a(window.location.hash.split("?", 2)[1] || ""),
            s = a(window.location.search.replace(/^\?/, "")),
            l = parseInt(i.offset || 0, 10);
        if (void 0 == i.offset) return;
        o("#browse-results-page-1").html('<span class="browse-loading">Loading from result ' + (l + 1) + "...</span>"), delete i.offset, n = o.param(i), e = window.location.hash.replace(/\?.*$/, n.length ? "?" + n : ""), ("#" === e || "#/" === e) && (e = ""), s.offset = l, t = "?" + o.param(s), window.location = window.location.pathname + t + e
    }
})(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.onload_url_hash_handler.js");
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", ".domready"], function() {
    (function(e) {
        var i = Base.extend({
            handlers: {
                load_comments_clicked: function(i) {
                    i.preventDefault();
                    var s = e(this),
                        n = s.data("CommentsLoader");
                    if (!n) {
                        var o = s.data("itemid"),
                            d = s.closest(".deviation-full-minipage");
                        n = new t(o, d), s.data("CommentsLoader", n).closest(".deviation-full-minipage").find("#gmi-CCommentThread").remove()
                    }
                    n.load_more()
                },
                show_description_clicked: function() {
                    e(this).siblings(".minipage-description").css({
                        height: "auto",
                        overflow: "auto"
                    }).find(".description-fader").remove(), e(this).remove()
                }
            },
            constructor: function() {
                var i = e("#browse-results");
                i.on && i.on("click", ".comments-count:not(.disabled)", this.handlers.load_comments_clicked).on("click", ".minipage-show-description", this.handlers.show_description_clicked), this.adjust_description_height(), PubSub.subscribe([{
                    eventname: "BrowseLikeThisStreamView.pages_visible",
                    subscriber: this,
                    callback: this.adjust_description_height
                }])
            },
            adjust_description_height: function() {
                var i = 43;
                e(".minipage-description .text-ctrl").not(".height-adjusted").each(function() {
                    var t = e(this);
                    i >= t.height() && (t.siblings(".description-fader").remove(), t.parent().height(t.height()).siblings(".minipage-show-description").remove()), t.addClass("height-adjusted")
                })
            }
        }),
            t = Base.extend({
                COMMENT_DEVIATION: 1,
                $comments: null,
                $comments_loaded: null,
                $comments_count: null,
                itemid: null,
                offset: 0,
                limit: 25,
                templates: {
                    loading: "<div class='comments-loading browse-loading'>Loading...</div>",
                    end: "<div class='browse-done'>End of Comments</div>"
                },
                constructor: function(e, i) {
                    this.itemid = e, this.$comments = i.find(".minipage-comments-container"), this.$comments_loaded = i.find(".comments-loaded"), this.$comments_count = i.find(".comments-count")
                },
                load_more: function() {
                    this.show_loading(), DiFi.pushPublicGet("Comments", "getLimitedComments", [this.COMMENT_DEVIATION, this.itemid, 0, this.offset, this.limit + 1], this.load_more_done.bindTo(this)), DiFi.send()
                },
                load_more_done: function(i, t) {
                    if (this.remove_loading(), t.response.content.error) return this.disable_more(), void 0;
                    var s = e(t.response.content.html),
                        n = s.find(".ccomment"),
                        o = n.length;
                    this.limit + 1 > o ? this.disable_more() : (o--, n.last().remove()), this.$comments.append(s), this.offset += o, this.update_comments_loaded()
                },
                show_loading: function() {
                    this.$comments.append(this.templates.loading)
                },
                remove_loading: function() {
                    this.$comments.find(".comments-loading").remove()
                },
                disable_more: function() {
                    this.$comments_count.parent().prepend(this.templates.end), this.$comments_count.remove()
                },
                update_comments_loaded: function() {
                    this.$comments_loaded.text(this.offset), this.$comments_loaded.parent().show()
                }
            });
        new i
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.minipage.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/pages/browselikethis/browselikethis.stream.fetcher.js", "jms/pages/duperbrowse/duperbrowse.helpers.js"], function() {
    (function() {
        var e = Base.extend({
            _fetcher: null,
            _stream_stack: null,
            _max_page_id: 0,
            _loaded_pages: [],
            _loading_queue: [],
            _pages: {},
            _first_visible_page: null,
            _current_item_page: null,
            _current_item: null,
            _current_offset: null,
            _items: {},
            _page_skeleton: {
                id: null,
                number: null,
                portal_api: null,
                query_params: {},
                results_dom: null,
                results_rids: null,
                paging_mode: "infinite",
                is_initial_page: !1,
                advert_dom: null,
                state: "unloaded",
                has_more: !1,
                has_less: !1,
                error_state: 0,
                max_offset: null,
                result_type: null,
                result_limit: null
            },
            handlers: {
                init: function(e, t) {
                    var s = this._create_page(t);
                    s.state = "loaded", s.is_initial_page = !0, this._add_loaded_page(s), this._add_loaded_items(t.results_rids, s.id), this.handlers.set_first_visible_page.bindTo(this)(null, s.id), this._set_current_item_page(s), this._fetcher = new BLTStreamFetcher({
                        cache_size: 20
                    }), PubSub.unsubscribe({
                        eventname: "BrowseLikeThisStream.init",
                        subscriber: this
                    }), PubSub.subscribe([{
                        eventname: "BrowseLikeThisStream.load_next",
                        subscriber: this,
                        callback: this.handlers.load_next
                    }, {
                        eventname: "BrowseLikeThisStream.set_first_visible_page",
                        subscriber: this,
                        callback: this.handlers.set_first_visible_page
                    }, {
                        eventname: "BrowseLikeThisStream.open_duperbrowse",
                        subscriber: this,
                        callback: this.handlers.open_duperbrowse.bindTo(this)
                    }])
                },
                load_next: function(e, t) {
                    if (!this._loading_queue[0]) {
                        var s = this._init_new_page(t);
                        s && this._load_new_page(s)
                    }
                },
                set_first_visible_page: function(e, t) {
                    if (this._pages.hasOwnProperty(t)) {
                        var s = !this._current_page;
                        if ((s || this._current_page.id !== t) && (this._current_page = this._pages[t], PubSub.publish("BrowseLikeThisStream.current_page_changed", this._current_page), !s)) {
                            var i = BrowseLikeThisStream.get_blt_url_for_offset(this._current_page.query_params.offset);
                            PubSub.publish("Location.replace", i)
                        }
                    }
                },
                open_duperbrowse: function(e, t) {
                    var s = {
                        next_item_callback: this._next_item_callback.bindTo(this),
                        prev_item_callback: this._prev_item_callback.bindTo(this),
                        has_next_callback: this._has_next_callback.bindTo(this),
                        has_prev_callback: this._has_prev_callback.bindTo(this),
                        on_stream_item_opened: this._on_stream_item_opened.bindTo(this),
                        on_stream_item_closed: this._on_stream_item_closed.bindTo(this)
                    };
                    Duperbrowse.open(t, s)
                }
            },
            constructor: function() {
                this._loading_queue = [], this._loaded_pages = [], this._pages = {}, this._items = {}, PubSub.subscribe({
                    eventname: "BrowseLikeThisStream.init",
                    subscriber: this,
                    callback: this.handlers.init
                })
            },
            _create_page: function(e) {
                var t = $.extend(!0, {}, this._page_skeleton, e);
                return t.id = this._next_page_id(), this._pages[t.id] = t, t
            },
            _load_new_page: function(e) {
                var t = this._fetcher.fetch(e.portal_api, e.query_params, e.result_limit);
                1 > this._loading_queue.length && PubSub.publish("BrowseLikeThisStream.next_page_loading", e), this._loading_queue.push(e), this._handle_promise(t, e).always(this._process_queue.bindTo(this))
            },
            _set_current_item_page: function(e) {
                this._current_item_page = e
            },
            _process_queue: function() {
                for (var e, t = 0; this._loading_queue[0] && "pending" !== this._loading_queue[0].state;) e = this._loading_queue.shift(), ("loaded" == e.state || "error" == e.state) && this._add_loaded_page(e), t++;
                1 > this._loading_queue.length ? PubSub.publish("BrowseLikeThisStream.next_page_loading", !1) : PubSub.publish("BrowseLikeThisStream.next_page_loading", e)
            },
            _handle_promise: function(e, t) {
                var s = this;
                return e.done(function(e) {
                    t.advert_dom = e.advert_dom, t.results_dom = e.results_dom, t.results_rids = e.results_rids, t.has_more = e.has_more, t.has_less = Boolean(e.query_params.offset > 0), t.error_state = e.error_state, t.state = "loaded", s._add_loaded_items(e.results_rids, t.id)
                }).fail(function(e) {
                    t.state = "error", t.error = e
                })
            },
            _add_loaded_page: function(e) {
                this._loaded_pages.push(e), e.is_initial_page || "paged" == e.paging_mode || PubSub.publish("BrowseLikeThisStream.new_page_added", e)
            },
            _add_loaded_items: function(e, t) {
                if (e) {
                    var s = this;
                    $.each(e, function(e, i) {
                        s._items[i.stream_offset] = {
                            itemid: parseInt(i.itemid, 10),
                            stream_offset: parseInt(i.stream_offset, 10),
                            pageid: parseInt(t, 10)
                        }
                    })
                }
            },
            _next_page_id: function() {
                return ++this._max_page_id
            },
            _init_new_page: function(e, t) {
                var s, i, _ = 0;
                return i = t ? this._loaded_pages[0] : this._loaded_pages[this._loaded_pages.length - 1], !i.has_more && !t || !i.has_less && t || (s = this._create_page(i), t ? (_ = parseInt(s.query_params.offset, 10) - parseInt(s.query_params.length, 10), s.number--) : (_ = parseInt(s.query_params.offset, 10) + parseInt(s.query_params.length, 10), s.number++), 0 > _ && (_ = 0, s.result_limit = s.query_params.offset), s.query_params.offset = _, s.display_method = e ? "auto" : "button", s.state = "pending", s.is_initial_page = !1, "full" == s.query_params.view_mode && (s.query_params.results_shown = (parseInt(s.query_params.results_shown, 10) || 0) + (parseInt(s.query_params.length, 10) || 0), s.query_params.length = 5, "paged" === s.paging_mode && (s.query_params.results_shown = 0)), Number(s.max_offset) && s.query_params.offset >= Number(s.max_offset)) ? void 0 : s
            },
            _next_item_callback: function() {
                var e = this._current_offset + 1,
                    t = this._items[e];
                return void 0 !== t ? $.Deferred().resolve(t).promise() : void 0 === t && this._current_item_page.has_more ? this._create_next_item_promise(!1) : $.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _prev_item_callback: function() {
                var e = this._current_offset - 1,
                    t = this._items[e];
                return void 0 !== t ? $.Deferred().resolve(t).promise() : void 0 === t && this._current_item_page.has_less ? this._create_next_item_promise(!0) : $.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_END_OF_STREAM).promise()
            },
            _has_next_callback: function() {
                var e = this._current_offset + 1;
                return void 0 !== this._items[e] ? !0 : this._current_item_page.has_more === !0 && parseInt(this._current_item_page.max_offset, 10) > e ? !0 : !1
            },
            _has_prev_callback: function() {
                var e = this._current_offset - 1;
                return 0 > e ? !1 : void 0 !== this._items[e] ? !0 : void 0 === this._items[e] && "infinite" != this._current_item_page.paging_mode ? !0 : !1
            },
            _on_stream_item_opened: function(e) {
                var t, s;
                void 0 !== this._items[e.stream_offset] ? (t = this._items[e.stream_offset], s = this._current_item, s && s.pageid != t.pageid && this._pages.hasOwnProperty(t.pageid) && (this._current_item_page = this._pages[t.pageid], PubSub.publish("BrowseLikeThisStream.current_item_page_changed", {
                    new_page: this._current_item_page,
                    old_page: this._pages[s.pageid]
                })), this._current_item = t, this._current_offset = t.stream_offset) : (this._current_item = null, this._current_offset = null)
            },
            _on_stream_item_closed: function(e) {
                void 0 !== this._items[e.current_offset] && PubSub.publish("BrowseLikeThisStream.duperbrowse_stream_item_closed", this._items[e.current_offset])
            },
            _create_next_item_promise: function(e) {
                var t, s, i, _, r, a = !1;
                return r = function(e) {
                    return a ? $.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_CANCELLED).promise() : e.results_rids[0]
                }, _ = function(e) {
                    return a ? $.Deferred().reject(DuperbrowseHelpers.PROMISE_STATE_CANCELLED).promise() : e.results_rids[e.results_rids.length - 1]
                }, (t = this._init_new_page(!0, e)) ? (s = this._fetcher.fetch(t.portal_api, t.query_params, t.result_limit), 1 > this._loading_queue.length && PubSub.publish("BrowseLikeThisStream.next_page_loading", t), this._loading_queue.push(t), this._handle_promise(s, t).always(this._process_queue.bindTo(this)), i = $.when(s).then(e === !0 ? _ : r), i.cancel = function() {
                    a = !0
                }, i) : $.Deferred().reject("no page").promise()
            }
        });
        new e, window.BrowseLikeThisStream = {
            get_blt_url_for_offset: function(e) {
                var t = Glbl("Location.get_params"),
                    s = "";
                return e = e || 0, e ? t.offset = e : void 0 !== t.offset && delete t.offset, $.isEmptyObject(t) || (s = "?" + $.param(t)), Glbl("Location.pushstate_enabled") && (s += window.location.hash), window.location.pathname + s
            }
        }
    })(), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.stream.js")
});
DWait.ready(["jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/lib/difi.js"], function() {
    (function(e) {
        window.BLTStreamFetcher = Base.extend({
            _options: {},
            _defaults: {},
            constructor: function(r) {
                this._options = e.extend({}, this._defaults, r)
            },
            fetch: function(r, s, t) {
                var o = e.Deferred();
                return o.request = {
                    portal_api: r,
                    query_params: s,
                    advert_dom: "",
                    results_dom: [],
                    results_rids: [],
                    has_more: !1,
                    error_state: 0,
                    result_limit: t
                }, DiFi.pushPublicGet("PortalCore", "get_result_thumbs", [o.request.portal_api, o.request.query_params], this._difi_callback.bindTo(this, o)), DiFi.send(), o.promise()
            },
            _difi_callback: function(e, r, s) {
                if (r && s.response.content.resources) {
                    var t, o = s.response.content.resources,
                        i = [],
                        n = parseInt(e.request.query_params.offset, 10),
                        a = parseInt(e.request.result_limit, 10);
                    for (a > 0 && (o = o.slice(0, a)), t = 0; o.length > t; t++) e.request.results_rids.push({
                        type: o[t][0],
                        itemid: o[t][1],
                        stream_offset: n
                    }), i.push(o[t][2]), n++;
                    e.request.advert_dom = s.response.content.ad, e.request.results_dom = i, e.request.has_more = Boolean(s.response.content.has_more), e.request.error_state = parseInt(s.response.content.error_state, 10), e.resolve(e.request)
                } else e.reject(s.response.content.error || "Unknown DiFi Error")
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.stream.fetcher.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/gmi.js", "jms/lib/popup2.js", "jms/lib/browser.js", "jms/lib/jquery/jquery.current.js", ".domready", "jms/lib/gstream/resource_stream.js", "jms/lib/gstream/portal_core_resource_stream.js", "jms/pages/browselikethis/browselikethis.stream.scroll_manager.js", "jms/pages/duperbrowse/duperbrowse.helpers.js", "jms/lib/jquery/plugins/jquery.somedata.js"], function() {
    (function(e, t) {
        var s = "infinite",
            i = "paged";
        t.BrowseLikeThisStreamView = t.PortalCoreResourceStream.extend({
            _infinite_scroll_enable: !1,
            _reached_end: !1,
            _$paging_container: null,
            _$load_more_button: null,
            _$gear_menu_button: null,
            _$first_paging_results: null,
            _$loading_indicator: null,
            _$loading_message: null,
            _scroll_manager: null,
            _results_since_last_ad: 0,
            preview_override_selection_type: t.BrowseLikeThisPreviewSelection,
            _allow_show_more: !1,
            _removed_pages: {},
            _current_page_offset: 0,
            _initial_location: {
                path: Glbl("Location.path"),
                query: Glbl("Location.get_params")
            },
            _$ad_container: null,
            _ad_html: null,
            templates: {
                errors: {
                    generic: '<span class="browse-error">There was an error loading this page.</error>',
                    states: {
                        1: '<div class="browse-no-results">There was an error performing your request. Please try again later.</div>',
                        2: '<div class="browse-no-results">Sorry, deviantART does not serve more than @_MAX_OFFSET_@ results for this query.</div>',
                        3: '<div class="browse-no-results">Sorry, we found no relevant results.</div>',
                        4: '<div class="browse-no-results">Sorry, we don\'t have that many results.</div>',
                        5: '<div class="browse-no-results">All of the results on this page have been hidden due to your Mature Content Settings.</div>',
                        6: '<div class="browse-no-results">All of the results on this page have been hidden due to the owner putting them into storage. There may be more visible results on later pages.</div>',
                        7: '<div class="browse-no-results">All of the results on this page have been hidden due to the owner deleting them. There may be more visible results on later pages.</div>'
                    }
                }
            },
            handlers: {
                next_page_loading: function(t, s) {
                    if (s) {
                        var i = "#browse-results-page-" + s.id;
                        if (1 > e(i).length) {
                            s.results_dom = [];
                            var r = this._make_page(s);
                            this._$paging_container.before(r)
                        }
                        this._hide_reached_end(), this._$load_more_button.hide(), this._$gear_menu_button.hide(), this._$first_paging_results.hide(), this._$loading_indicator.show()
                    } else this._infinite_scroll_enable || this._reached_end || (this._$load_more_button.show(), this._$gear_menu_button.show(), this._$first_paging_results.show()), this._$loading_indicator.hide()
                },
                cancel_pending: function(t, s) {
                    for (var i = 0; s.length > i; i++) e("#browse-results-page-" + s[i].id).remove()
                },
                new_page_added: function(i, r) {
                    setTimeout(function() {
                        this._infinite_scroll_enable ? (e("#depths").data("infinite_scroll_enabled", !0), this._$paging_container.css("padding-bottom", "300px")) : this._reached_end || (this._$load_more_button.show(), this._$gear_menu_button.show(), this._$first_paging_results.show());
                        var i = e("#browse-results-page-" + r.id);
                        1 > i.length ? i = this._make_page(r) : i.detach().find(".page-results").html(this._make_contents_html(r)), this._scroll_manager && r.paging_mode === s ? this._scroll_manager.add_page(r.id, i) : this.add_non_scroll_page(r, i), r.has_more && r.max_offset > Number(r.query_params.offset) + Number(r.query_params.length) ? (this._reached_end = !1, this._hide_reached_end()) : (this._$load_more_button.hide(), this._$gear_menu_button.hide(), this._$first_paging_results.hide(), this._reached_end = !0, this._show_reached_end()), this._make_legacy_js_happy(i);
                        var a = "/vpv/" + t.location.host.split(".")[0] + t.location.pathname + "?offset=" + r.query_params.offset;
                        PubSub.publish("PageViewTracker.pageview", {
                            page: a,
                            tag: "Dynamic.BrowseResultsPage"
                        }), this._init_new_thumbs(r.results_rids, e("#browse-results-page-" + r.id + " .page-results")), this._infinite_scroll_enable && (e("#depths").remove(), this._$paging_container.css("padding-bottom", "300px")), PubSub.publish("BrowseLikeThisStreamView.page_added_to_dom", r.id)
                    }.bindTo(this), 1)
                },
                infinite_scroll_enabled: function() {
                    this._infinite_scroll_enable = !0, this._$load_more_button.hide(), this._$gear_menu_button.hide(), this._$first_paging_results.hide()
                },
                infinite_scroll_disabled: function() {
                    this._infinite_scroll_enable = !1, this._$load_more_button.show(), this._$gear_menu_button.show(), this._$first_paging_results.show()
                },
                current_item_page_changed: function(e, t) {
                    this.gmi_args.paging_mode === i && (void 0 !== this._removed_pages[t.old_page.id] && (t.new_page.ad_settings.disabled = !0), this.handlers.new_page_added.bindTo(this)(e, t.new_page), this._removed_pages[t.old_page.id] = !0, this._current_page_offset = t.new_page.query_params.offset)
                },
                duperbrowse_stream_item_closed: function(s, r) {
                    var a = ["#browse-results-page-" + r.pageid + " .page-results > .tt-a", "#browse-results-page-" + r.pageid + " .page-results > .deviation-full-container > .deviation-full-data", "#browse-results-page-" + r.pageid + " .page-results > .tt-a > .journal-wrapper.tt-a"],
                        n = e(a.join(",")).filter(function() {
                            return e.data(this, "itemid") == r.itemid
                        });
                    if (0 !== n.length) {
                        var o = n.offset().top,
                            l = e(t).scrollTop();
                        o > l && l + e(t).height() > o || e(t).scrollTop(o), this.gmi_args.paging_mode === i && this._$ad_container && this._ad_html && this._$ad_container.html(this._ad_html)
                    }
                },
                duperbrowse_set_closing_location: function(e, t) {
                    if (this.gmi_args.paging_mode === i) {
                        var s = Glbl("Location.get_params"),
                            r = Number(this._current_page_offset);
                        t = this._replace_url_offset(t, s, r), PubSub.publish("Location.replace", t)
                    }
                },
                popup_trigger_click: function() {
                    e(".pane-switch").css("z-index", 10);
                    var t = e(this),
                        s = t.data("name");
                    Popup2.getPopup(s) || new Popup2(s, "body", {
                        classes: s,
                        content: e("#" + s).clone(!0).show(),
                        hidden: function() {
                            t.removeClass("popupactive"), t.data("type") && this.$node.removeClass(t.data("type"))
                        },
                        shown: function() {
                            t.addClass("popupactive"), this.$node.addClass(t.data("type"))
                        }
                    });
                    var i = Popup2.getPopup(s);
                    if (i.active) i.hide();
                    else {
                        var r = {
                            keepOnScreen: !1
                        };
                        "browse-paging-popup" == s && (r.valign = "center", r.bump = {
                            top: 7,
                            left: -9
                        }), i.show(i.position(t, r)), e(".paging-results-go-input:visible").focus()
                    }
                    return !1
                },
                popup_active_check: function() {
                    return Popup2.getPopup(e(this).data("name")).active ? !1 : void 0
                },
                ignore_journal_preview_click: function(t) {
                    var s = t.which || t.button;
                    if (!(t.altKey || t.ctrlKey || t.metaKey || t.shiftKey || 1 != s)) {
                        var i = e(t.target);
                        if (i.closest(".journalcontrol,.blogcontrol")[0]) {
                            t.preventDefault(), t.stopPropagation();
                            var r = i.closest(".journal-browse").find(".journal-footer:last > a:first");
                            if (e("#browse2, #browse-results").length) r.click();
                            else {
                                var a = i.closest(".journal-browse").find(".journalcontrol .metadata a:first");
                                document.location = i.is("[href]") ? i.attr("href") : a.length ? a.attr("href") : r.attr("href")
                            }
                        }
                    }
                },
                top_button_click: function() {
                    return t.scrollTo(0, 0), !1
                },
                ie8_hover_fix: function() {
                    e(this).find(".mlt-link").css("background-color", "#196BA7").find(".mlt-text").css("display", "block")
                },
                points_download_button_click: function(t) {
                    t.preventDefault(), PubSub.publish("PointsDownload.download_click", e(t.currentTarget))
                }
            },
            gmiConstructor: function() {
                this.$.removeClass("dwait"), this.$.find(".browse-no-results a").click(function() {
                    return t.location = this.href, !1
                }), this._init_stream(), this._$paging_container = e(".browse-paging", this.gmi_node);
                var i = e(".load_more", this._$paging_container);
                i.hasClass("disabled") || (this._$load_more_button = i.click(this._load_more_click.bindTo(this)).closest(".pagination")), this._allow_show_more = !i.hasClass("disabled"), this._$gear_menu_button = e(".paging-dropdown-trigger", this._$paging_container), this._$first_paging_results = e(".paging-results-first-page", this._$paging_container), this._$loading_indicator = e('<span class="browse-loading">Loading ...</span>').hide().appendTo(this._$paging_container), e("body").on("keydown", ".paging-results-go-input", this._keydown_go_input.bindTo(this)).on("click", ".paging-results-go", this._set_offset.bindTo(this)).on("click", ".paging-style-link", this._change_paging_style);
                var r = e("#browse-results");
                r.on("click", ".popup-trigger", this.handlers.popup_trigger_click).on("mousedown", ".popup-trigger", this.handlers.popup_active_check).on("mousedown", ".journal-browse", this.handlers.ignore_journal_preview_click).on("click", "a.browse-top-link", this.handlers.top_button_click), Browser.isIE8 && r.on("mouseenter", ".tt-a, .deviation-full-data", this.handlers.ie8_hover_fix), this.base();
                var a = e("<div></div>");
                this._$paging_container.before(a), this.gmi_args.paging_mode === s && (this._scroll_manager = new BrowseLikeThisScrollManager(a), e(this._scroll_manager).bind("top_page_changed", this._top_page_changed.bindTo(this)), e(this._scroll_manager).bind("needs_more", this._needs_more.bindTo(this)), e(this._scroll_manager).bind("pages_became_visible", this._pages_became_visible.bindTo(this))), PubSub.subscribe([{
                    eventname: "BrowseLikeThisStream.next_page_loading",
                    subscriber: this,
                    callback: this.handlers.next_page_loading
                }, {
                    eventname: "BrowseLikeThisStream.cancel_pending_pages",
                    subscriber: this,
                    callback: this.handlers.cancel_pending
                }, {
                    eventname: "BrowseLikeThisStream.new_page_added",
                    subscriber: this,
                    callback: this.handlers.new_page_added
                }, {
                    eventname: "BrowseLikeThisStream.infinite_scroll_enabled",
                    subscriber: this,
                    callback: this.handlers.infinite_scroll_enabled
                }, {
                    eventname: "BrowseLikeThisStream.infinite_scroll_disabled",
                    subscriber: this,
                    callback: this.handlers.infinite_scroll_disabled
                }, {
                    eventname: "BrowseLikeThisStream.current_item_page_changed",
                    subscriber: this,
                    callback: this.handlers.current_item_page_changed
                }, {
                    eventname: "BrowseLikeThisStream.duperbrowse_stream_item_closed",
                    subscriber: this,
                    callback: this.handlers.duperbrowse_stream_item_closed
                }, {
                    eventname: "DuperBrowse.set_closing_location",
                    subscriber: this,
                    callback: this.handlers.duperbrowse_set_closing_location
                }])
            },
            _init_stream: function() {
                var t = {
                    number: Math.floor(this.gmi_args.query_params.offset / this.gmi_args.count_per_page) + 1,
                    portal_api: this.gmi_args.portal,
                    query_params: this.gmi_args.query_params,
                    results_dom: e("#browse-results-page-1 .page-results", this.gmi_node).html(),
                    has_more: Boolean(this.gmi_args.more_to_load),
                    has_less: Boolean(this.gmi_args.query_params.offset > 0),
                    max_offset: this.gmi_args.max_offset,
                    result_type: this.gmi_args.paging_result_type,
                    ad_settings: this.gmi_args.ad_settings,
                    paging_mode: this.gmi_args.paging_mode
                }, s = this._find_dom_nodes_in_container(e("#browse-results-page-1 .page-results")),
                    i = [],
                    r = this,
                    a = t.query_params.offset;
                e.each(s, function(t, s) {
                    var n = e(s),
                        o = n.attr("collect_rid"),
                        l = {
                            stream_offset: a
                        };
                    if (o && (o = o.split(":"), o[0] && o[1] && (l.type = o[0], l.itemid = o[1])), l.itemid && n.hasClass("tt-fh") && (DuperbrowseHelpers.init_thumb_data(l, n, "a.thumb, a.tt-fh-purchasable"), i.push(l), e("a.thumb, span.details a.t", n).on("click.duperbrowse", r._open_duperbrowse)), l.itemid && n.hasClass("deviation-full-data") && (DuperbrowseHelpers.init_thumb_data(l, n, "a.full-view-link"), i.push(l), $anchor = n.parent().next().find(".minipage-title a"), $anchor.on("click.duperbrowse", r._open_duperbrowse), 0 === n.find("> div.journal-wrapper.tt-a").length && n.on("click.duperbrowse", r._open_duperbrowse)), !l.itemid && n.length > 0) {
                        var _ = n.find("div.journal-footer a.more"),
                            d = n.find("div.journal-wrapper.tt-a");
                        l.type = 1, l.itemid = _.data("deviationid"), DuperbrowseHelpers.init_thumb_data(l, d, "div.journal-footer a.more"), i.push(l), d.on("click.duperbrowse", r._open_duperbrowse)
                    }
                    l.itemid || 0 !== n.length || console.log("[BrowseStreamView] Init found invalid stream item"), a++
                }), t.results_rids = i, PubSub.publish("BrowseLikeThisStream.init", t), this._init_ads()
            },
            _init_ads: function() {
                var e = Number(this.gmi_args.ad_settings.results_before_first || 0),
                    t = Number(this.gmi_args.count_per_page);
                t > e && (this._results_since_last_ad = t - e)
            },
            _init_new_thumbs: function(t, s) {
                var i = this;
                e.each(t, function(t, r) {
                    var a = s.find('> .tt-a[collect_rid="' + r.type + ":" + r.itemid + '"]');
                    if (0 !== a.length) return DuperbrowseHelpers.init_thumb_data(r, a, "a.thumb, a.tt-fh-purchasable"), e("a.thumb, span.details a.t", a).on("click.duperbrowse", i._open_duperbrowse), void 0;
                    if (a = s.find('> .deviation-full-container .deviation-full-data[collect_rid="' + r.type + ":" + r.itemid + '"]'), 0 !== a.length) return DuperbrowseHelpers.init_thumb_data(r, a, "a.full-view-link"), 0 === a.find("> div.journal-wrapper.tt-a").length && a.on("click.duperbrowse", i._open_duperbrowse), $anchor.on("click.duperbrowse", i._open_duperbrowse), void 0;
                    if (0 === a.length) {
                        var n = s.find('> .tt-a .journal-footer a.more[data-deviationid="' + r.itemid + '"]');
                        if (0 === n.length) return console.log("[BrowseStreamView] RID Item not found in stream DOM", r), void 0;
                        var o = n.closest("div.journal-wrapper.tt-a");
                        DuperbrowseHelpers.init_thumb_data(r, o, "div.journal-footer a.more"), o.on("click.duperbrowse", i._open_duperbrowse)
                    }
                })
            },
            _open_duperbrowse: function(s) {
                var i = t.DuperbrowseHelpers.click_handler(s),
                    r = ["itemid", "stream_offset", "type"];
                if (i.open_duperbrowse) {
                    var a = e(this),
                        n = a.closest(".tt-a").someData(r);
                    return a.hasClass("deviation-full-data") && (n = a.someData(r)), e.isEmptyObject(n) && a.parent().hasClass("minipage-title") && (n = a.closest(".deviation-full-minipage").prev().find(".deviation-full-data").someData(r)), e.isEmptyObject(n) ? !0 : (n.wait_for_load = i.wait_for_load, n.context = a.data("duper-context"), PubSub.publish("BrowseLikeThisStream.open_duperbrowse", n), !1)
                }
                if (i.disabled) {
                    if (i.click_return) return;
                    var o = e(this).closest(".tt-a").find("div.journal-footer a.more");
                    return t.location = o.attr("href"), !1
                }
                return i.click_return
            },
            _load_more_click: function() {
                return PubSub.publish("BrowseLikeThisStream.load_next", !1), PubSub.publish("BrowseLikeThisStream.infinite_scroll_enabled"), !1
            },
            _keydown_go_input: function(e) {
                13 == e.keyCode && this._set_offset()
            },
            _set_offset: function() {
                var s = Math.max(parseInt(e(".paging-results-go-input:visible").val(), 10) - 1, 0);
                t.location = BrowseLikeThisStream.get_blt_url_for_offset(s)
            },
            _change_paging_style: function() {
                var s = e(".thumb-limit-picker").data("offset");
                return s ? (t.location = e(this).attr("href") + "&offset=" + s, !1) : void 0
            },
            _show_reached_end: function() {
                e('<div class="browse-end">End of Results</div>').appendTo(this._$paging_container)
            },
            _hide_reached_end: function() {
                e(".browse-end").remove()
            },
            _needs_more: function() {
                this._infinite_scroll_enable && PubSub.publish("BrowseLikeThisStream.load_next", !0)
            },
            _top_page_changed: function(e, t) {
                t || (t = 1), PubSub.publish("BrowseLikeThisStream.set_first_visible_page", t)
            },
            _pages_became_visible: function(e, t) {
                PubSub.publish("BrowseLikeThisStreamView.pages_visible", t)
            },
            _find_dom_nodes_in_container: function(e) {
                return e.find("> .tt-a, > .deviation-full-container > .deviation-full-data").get()
            },
            domFindVisible: function() {
                var t = {};
                if (!this.contents || !this.contents.length) {
                    t = this._find_dom_nodes_in_container(e(".page-results"));
                    var s = e(".mlt-seed-container .tt-a");
                    return s.length && t.unshift(s.get(0)), t
                }
                for (var i in this.contents) this.contents.hasOwnProperty(i) && this.contents[i][2] && document.body.contains(this.contents[i][2]) && (t[i] = this.contents[i][2]);
                return t
            },
            _make_page: function(t) {
                var s = "results-page-" + t.query_params.view_mode;
                "grid" == t.query_params.thumb_mode && (s += " stream-fh-grid", vms_feature("responsive_grid") && (s += " stream-fh-grid-responsive responsive-full-width"));
                var r;
                return t.paging_mode === i ? (r = '<div class="browse-results-page" id="browse-results-page-' + t.id + '">', r += '<div class="page-results ' + s + '">' + this._make_contents_html(t) + "</div>", r += "</div>", e(r)) : (r = '<div class="browse-results-page" id="browse-results-page-' + t.id + '">' + '<hr class="browse-divider browse-page-divider">' + '<div class="browse-page-header">' + '<div class="paging-results browse-link-button popup-trigger" data-name="paging-results-popup">' + t.result_type + ' <div class="paging-results-count">' + (parseInt(t.query_params.offset, 10) + 1) + " - " + (parseInt(t.query_params.offset, 10) + parseInt(t.results_rids.length, 10)) + "</div>" + "</div>" + '<a href="javascript:void(0)" class="browse-top-link browse-proper-button"><span>&uarr;</span> Top</a>', 2 == t.id && e(".thumb-limit-picker").length && (r += '<div data-name="browse-paging-popup" data-type="paging-gear" data-offset="' + t.query_params.offset + '" class="thumb-limit-picker paging-dropdown-trigger popup-trigger"><span></span></div>'), r += '</div><div class="page-results ' + s + '">' + this._make_contents_html(t) + "</div>" + "</div>", e(r))
            },
            _make_contents_html: function(t) {
                if ("error" == t.state) return this.templates.errors.generic;
                if (t.error_state > 0) {
                    var s = this.templates.errors.states[t.error_state];
                    return s.replace("@_MAX_OFFSET_@", this.gmi_args.max_offset)
                }
                if (!t.ad_settings.disabled && t.results_dom.length) {
                    var i;
                    "browse-results-page-" + t.id, i = 0 == Number(t.ad_settings.results_between) ? 0 : null == this._results_since_last_ad ? Number(t.ad_settings.results_before_first) - Number(this.gmi_args.count_per_page) : Number(t.ad_settings.results_between) - this._results_since_last_ad, t.results_dom.length > i ? (t.advert_dom && t.results_dom.splice(i, 0, t.advert_dom), this._results_since_last_ad = t.results_dom.length - i - 1) : this._results_since_last_ad = (this._results_since_last_ad || 0) + t.results_dom.length
                }
                return e.isArray(t.results_dom) ? t.results_dom.join("") : t.results_dom
            },
            add_non_scroll_page: function(t, s) {
                var i, r = parseInt(t.query_params.offset, 10) + 1,
                    a = parseInt(t.query_params.offset, 10) + parseInt(t.query_params.length, 10),
                    n = e(".browse-results-page"),
                    o = e(".next a", "div.browse-paging div.pagination"),
                    l = e(".prev a", "div.browse-paging div.pagination"),
                    _ = ["th", "st", "nd", "rd"],
                    d = s.find('iframe[data-da-ad="1"]');
                if (d.length > 0 && (this._$ad_container = d.parent(), this._ad_html = d.appendTo("<div>").parent().html(), d.remove()), n.replaceWith(s), e(".paging-results-count").text(r + " - " + a), r > 1) {
                    i = r - parseInt(t.query_params.length, 10) - 1, l.removeClass("disabled").attr("href", this._replace_url_offset(this._initial_location.path, this._initial_location.query, i));
                    var u = _[r % 10 > 3 ? 0 : r % 10];
                    r % 100 >= 11 && 13 >= r % 100 && (u = "th");
                    var p = '<span class="showing-page">Starting from ' + r + "<sup>" + u + "</sup> result</span>" + '<span class="first-result-spacer"></span>' + '<a class="browse-back-to-first-result" href="http://www.deviantart.com/"> Go to first result </a>';
                    e("div.page-results").before(p)
                } else l.addClass("disabled").attr("href", "");
                t.has_more ? o.removeClass("disabled").attr("href", this._replace_url_offset(this._initial_location.path, this._initial_location.query, a)) : o.addClass("disabled").attr("href", "")
            },
            _replace_url_offset: function(t, s, i) {
                var r = "",
                    a = Number(i);
                return a ? s.offset = a : void 0 !== s.offset && delete s.offset, e.isEmptyObject(s) ? t.replace(/\?[^?#]*/, "") : (r = "?" + e.param(s), t = t.replace(/\?.*/, ""), t + r)
            },
            get_all_selectable_result_nodes: function() {
                return e.map(this.contents, function(e) {
                    return e[2]
                })
            },
            get_stream_node_from_clicked_node: function(t) {
                return e(t).closest(".tt-a, .deviation-full-data").get(0)
            },
            _override_loader_item_read: function(t) {
                var s = e(t),
                    i = s.hasClass("journal-wrapper") ? s : s.find(".journal-wrapper:first");
                return i.length && !i.find('[id="news-special"]').length ? e(i.html()).find(".journal-footer").remove().end() : OUTLINE_PreviewStream.loaderItemRead.apply(this, arguments)
            },
            _make_legacy_js_happy: function(t) {
                for (var s = this._find_dom_nodes_in_container(t.find(".page-results")), i = 0; s.length > i; i++) {
                    var r = s[i],
                        a = e(r);
                    r && r.getAttribute && (r.getAttribute("collect_rid") || a.hasClass("journal-browse")) ? this.contents.push(this.domReadOne(r)) : (r = a.find("[collect_rid]").get(0), r && r.getAttribute && r.getAttribute("collect_rid") && this.contents.push(this.domReadOne(r)))
                }
            },
            commsMakeCustomSurfer: function(t, s, i) {
                var r = e(i);
                if (1 == s[0] && r.hasClass("deviation-full-data") && r.find(".journal-wrapper").length) {
                    var a = r.find("h2:first").get(0),
                        n = Surfer.create(t, a, void 0, void 0, !0, !0),
                        o = e(n.node);
                    return o.addClass("browse-title-surfer"), 1 > o.find("img").length && o.addClass("lit-title-surfer"), n.mod_down = {
                        x: -(o.width() / 2),
                        y: -(o.height() / 2)
                    }, n
                }
                return !1
            }
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.stream.view.js")
});
DWait.ready(["jms/lib/pubsub.js", "jms/lib/Base.js", "jms/lib/jquery/jquery.current.js", "jms/lib/jquery/plugins/jquery.throttle-debounce.js", "jms/pages/browselikethis/browselikethis.ads.js", ".domready"], function() {
    (function(e) {
        var t = null;
        PubSub.subscribe({
            eventname: "BrowseLikeThisAdPool.instance_loaded",
            subscriber: {},
            callback: function(e, s) {
                t = s
            }
        });
        var s = Base.extend({
            $node: null,
            has_ad: !1,
            $ad_container: null,
            ad_height: 0,
            ad_offset: null,
            page_id: null,
            height: 0,
            offset: 0,
            is_on_screen: !1,
            last_measured_at: null,
            constructor: function(s, i) {
                this.page_id = s, this.$node = i;
                var _ = this.$node.find('iframe[data-da-ad="1"]');
                if (_.length) {
                    this.has_ad = !0, this.$ad_container = _.parent(), this.ad_height = _.height();
                    var h = e("<div>");
                    _.appendTo(h), t && t.stash_ad_html(h.html())
                }
            },
            measure: function() {
                if (!this.is_on_screen) throw Error("Cannot measure page that is not visible");
                this.height = this.$node.outerHeight(), this.last_measured_at = (new Date).getTime(), this.has_ad && (this.ad_offset = this.offset + this.$ad_container.offset().top - this.$node.offset().top)
            },
            render_ad: function() {
                t && t.fill_ad_slot(this.page_id, this.$ad_container)
            },
            stash: function() {
                this.is_on_screen && (this.$node.detach(), this.is_on_screen = !1)
            }
        }),
            i = !1;
        window.pause_scroll = function() {
            i = !0
        }, window.resume_scroll = function() {
            i = !1
        }, window.BrowseLikeThisScrollManager = Base.extend({
            _$node: null,
            _$top_buffer: null,
            _$bottom_buffer: null,
            _$w: null,
            _pages: [],
            _scroll_throttle: 300,
            _resize_debounce: 500,
            _advert_throttle: 500,
            _remeasure_throttle: 2e3,
            _viewport_height: null,
            _last_scroll_top: -1,
            _last_update_needed_more: !1,
            _first_visible_index: -1,
            _last_visible_index: -1,
            _current_top_page_idx: -1,
            _visible_pixels_threshold: 700,
            _load_more_threshold: 1500,
            constructor: function(t) {
                this._$node = t, this._pages = [], this._$w = e(window), this._$top_buffer = e("<div></div>"), this._$bottom_buffer = e("<div></div>"), this._$node.prepend(this._$top_buffer), this._$node.append(this._$bottom_buffer), this._$w.on("scroll", e.throttle(this._scroll_throttle, this._on_scroll.bindTo(this))), this._throttled_render_ads = e.throttle(this._advert_throttle, this._render_ads.bindTo(this)), this._$w.on("scroll", this._throttled_render_ads), this._$w.on("resize", e.debounce(this._resize_debounce, this._on_resize.bindTo(this))), this._measure_viewport()
            },
            add_page: function(t, i) {
                var _ = new s(t, i),
                    h = this._pages[this._pages.length - 1];
                this._pages.push(_), i.insertBefore(this._$bottom_buffer), _.is_on_screen = !0, h && (_.offset = h.offset + h.height), _.measure(), 1 == this._pages.length && (this._first_visible_index = 0, this._last_visible_index = 0), h && !h.is_on_screen ? _.stash() : (this._last_visible_index = this._pages.length - 1, e(this).trigger("pages_became_visible", [_.$node]), this._throttled_render_ads())
            },
            _on_scroll: function(t) {
                if (this._pages.length && !i && this._$node.is(":visible")) {
                    var s, _, h, o = this._$node.offset().top,
                        r = this._$w.scrollTop() - o;
                    if (t || r != this._last_scroll_top) {
                        if (s = this._find_at_offset(r - this._visible_pixels_threshold, this._first_visible_index), _ = this._find_at_offset(r + this._viewport_height + this._visible_pixels_threshold, this._last_visible_index), 0 > s && (s = 0), 0 > _ && (_ = this._pages.length - 1), s !== this._first_visible_index || _ !== this._last_visible_index) {
                            for (this._$top_buffer.height(this._pages[s].offset), h = this._first_visible_index; this._last_visible_index >= h; h++)(s > h || h > _) && this._pages[h].stash();
                            var n = !0,
                                a = [];
                            for (h = s; _ >= h; h++) this._pages[h].is_on_screen ? n = !1 : (n ? this._$top_buffer.after(this._pages[h].$node) : this._$bottom_buffer.before(this._pages[h].$node), this._pages[h].is_on_screen = !0, a.push(this._pages[h].$node));
                            a.length && e(this).trigger("pages_became_visible", a);
                            var l, d = this._pages[this._pages.length - 1],
                                f = d.offset + d.height,
                                g = this._pages[_],
                                p = g.offset + g.height;
                            if (this._remeasure_pages(s, _ + 1), g.offset + g.height !== p) for (p = l = g.offset + g.height, h = _ + 1; this._pages.length > h; h++) this._pages[h].offset = l, l += this._pages[h].height;
                            this._$bottom_buffer.height(f - p)
                        }
                        var u = this._find_at_offset(r, this._current_top_page_idx);
                        u !== this._current_top_page_idx && (e(this).trigger("top_page_changed", 0 > u ? null : this._pages[u].page_id), this._current_top_page_idx = u), this._last_scroll_top = r, this._first_visible_index = s, this._last_visible_index = _, this._load_more_if_necessary(r)
                    }
                }
            },
            _load_more_if_necessary: function(t) {
                var s = this._pages[this._pages.length - 1],
                    i = t + this._viewport_height;
                i + this._load_more_threshold > s.offset + s.height && e(this).trigger("needs_more")
            },
            _render_ads: function() {
                if (this._pages.length && !i && this._$node.is(":visible")) for (var e = this._$w.scrollTop() - this._$node.offset().top, t = e + this._viewport_height, s = 0; this._pages.length > s; ++s) if (this._pages[s].has_ad && this._pages[s].is_on_screen) {
                    var _ = this._pages[s].ad_offset - 50,
                        h = _ + this._pages[s].ad_height + 100;
                    (_ >= e && t >= _ || e >= _ && h >= e) && this._pages[s].render_ad()
                }
            },
            _on_resize: function() {
                this._measure_viewport();
                var e, s = 3;
                for (e = 0; this._pages.length > e; e += s) this._remeasure_pages(e, Math.min(e + s, this._pages.length));
                this._on_scroll(!0), t && t.scroll_manager_is_done_resizing(), this._throttled_render_ads()
            },
            _remeasure_pages: function(e, t) {
                var s, i, _ = [],
                    h = this._pages[e - 1] || null,
                    o = h ? h.offset + h.height : 0,
                    r = (new Date).getTime();
                for (s = e; t > s; s++) i = this._pages[s], i.is_on_screen || (_.push(i), i.$node.insertBefore(this._$bottom_buffer), i.is_on_screen = !0);
                for (s = e; t > s; s++) i = this._pages[s], r > i.last_measured_at + this._remeasure_throttle && i.measure(), i.offset = o, o += i.height;
                for (s = 0; _.length > s; s++) _[s].stash()
            },
            _measure_viewport: function() {
                this._viewport_height = window.innerHeight ? window.innerHeight : this._$w.height()
            },
            _find_at_offset: function(e, t) {
                var s = Math.max(t, 0),
                    i = this._pages[s];
                if (i.offset > e) {
                    do s--, i = this._pages[s];
                    while (s >= 0 && i && i.offset > e);
                    return s
                }
                if (e > i.offset + i.height) {
                    do s++, i = this._pages[s];
                    while (this._pages.length > s && i && e > i.offset + i.height);
                    return this._pages.length > s ? s : -1
                }
                return s
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.stream.scroll_manager.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", ".domready"], function() {
    (function(e) {
        function t(e) {
            var t = e.data("toggle_text");
            e.data("toggle_text", e.text()).text(t)
        }
        var i = e(".browse-facet-toggle-hidden");
        i.on && i.on("click", function() {
            var i = e(this),
                n = i.data("toggle_text"),
                o = i.data("more_increment") || 9999,
                a = i.closest(".browse-facet").find(".facet-link-hidden"),
                r = 0 == a.not(":visible").length;
            r ? (a.hide(), t(i)) : (a.not(":visible").slice(0, o).show(), 0 == a.not(":visible").length && (n && n.length ? t(i) : i.remove()))
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.left_bar.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/popup2.js", "jms/lib/browser.js", ".domready"], function() {
    (function(i) {
        var t = i(".browse-top-bar-mc-filter");
        t.on && i(".browse-top-bar-mc-filter").on("click", function() {
            var t = i(this);
            if (i(".mature-filter-popup-container").hide(), !deviantART.deviant.loggedIn) return window.location = "https://www.deviantart.com/join/?from=mature", !1;
            var s = Number(t.data("value")) ? 1 : 0;
            DiFi.pushPost("Settings", "updateMatureFilter", [s], function(i) {
                i ? window.location.reload() : (t.removeClass("working disabled"), alert("Sorry there was an error while changing your settings.\n\nYou must be 18 or over to turn off mature filter.\n\nIf you are, please try again in a minute."))
            }), t.addClass("working").addClass("disabled"), DiFi.send()
        });
        var s = !1,
            e = i(".browse-top-bar-mc-filter-trigger");
        e.on && (e.on("mousedown", function() {
            return s && s.visible() ? !1 : void 0
        }), e.on("click", function() {
            var t = i(this);
            return s || (s = new Popup2("BrowseMaturePopup", "body", {
                classes: "browse-mature-popup",
                content: i(".mature-filter-popup-container").clone(!0).show(),
                hidden: function() {
                    t.removeClass("popupactive")
                },
                shown: function() {
                    t.addClass("popupactive")
                }
            })), s.visible() ? s.hide() : s.show(s.position(t.parent(), {
                align: "center"
            })), !1
        })), window.BrowseLikeThisSearchBox = GMIBase.extend({
            _$input: null,
            _$term: null,
            _$button: null,
            _initial_val: "",
            _initially_disabled: !1,
            gmiConstructor: function() {
                this.$.removeClass("dwait"), this._init_terms(), this._init_input(), this.$.on("click.browselikethis", ".browse-search-container", this._search_container_click.bindTo(this)), this.$.on("click.browselikethis", ".search-clear", this._clear_search_box.bindTo(this)), this.$.on("blur.browselikethis", ".browse-search-input", this._input_blur.bindTo(this))
            },
            _init_terms: function() {
                this._$term = this.$.find(".search-term-container")
            },
            _init_input: function() {
                this._$input = this.$.find(".browse-search-input"), this._$button = this.$.find(".browse-search-button"), this._initial_val = this._$input.val(), this._initially_disabled = this.$.hasClass("disabled"), this._$input.on("keydown", this._input_keydown.bindTo(this)), this._$input.on("keyup", this._input_keyup.bindTo(this));
                var t = i(document.activeElement);
                window.location.hash || this._initially_disabled || Browser.isTouch || t.is(this._$input) || t.is(":input") ? this._input_blur() : this._make_editable(!0)
            },
            _clear_search_box: function() {
                return this._make_editable(!1), !1
            },
            _search_container_click: function() {
                return this._$input.is(":focus") || this._make_editable(!0), !1
            },
            _make_editable: function(i) {
                this._$term.hide(), this.$.removeClass("disabled"), this._$button.attr("disabled", !1), this._$input.attr("disabled", !1).removeClass("disabled").show(), Browser.isFirefox ? this._$input.css("position", "fixed").focus().css("position", "static") : this._$input.focus(), this._$input.select(), i || this._$input.val(""), "" == this._$input.val() && this.$.find(".search-box-clear").hide()
            },
            _input_blur: function() {
                var i = this._$input.val();
                i == this._initial_val && (this._$input.hide(), this._$term.show(), this._$input.val(this._initial_val), this._initially_disabled ? (this.$.addClass("disabled"), this._$input.attr("disabled", !0), this._$button.attr("disabled", !0), this.$.find(".search-box-clear").hide()) : this.$.find(".search-box-clear").show())
            },
            _input_keydown: function(i) {
                i.keyCode in {
                    40: 0,
                    32: 0,
                    34: 0,
                    35: 0
                } && "" == this._$input.val() && this._$input.blur()
            },
            _input_keyup: function() {
                this.$.find(".search-box-clear").toggle("" !== this._$input.val())
            }
        }), i(function() {
            i(":gmi(BrowseLikeThisSearchBox)").gmi()
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.top_bar.js")
});
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/pages/duperbrowse/stream/base.custom.stream.js"], function() {
    (function(e) {
        var t = window.DuperbrowseBaseCustomStream.extend({
            init_stream: function() {
                var t = e(".pcp-side-bar .pcp-thumb"),
                    s = this;
                t.each(function(t, a) {
                    var r = e(a),
                        i = r.find(".tt-aa").attr("collect_rid").split(":")[1],
                        o = {
                            itemid: i,
                            stream_offset: t
                        };
                    DuperbrowseHelpers.init_thumb_data(o, r, "a.thumb, a.tt-fh-purchasable"), s._items[t] = o, r.find("a").on("click", s._open_duperbrowse.bindTo(s))
                })
            },
            _get_item_data_from_clicked_element: function(e) {
                var t = e.closest(".pcp-thumb").someData("itemid", "stream_offset");
                return console.log("Item data is: ", t), t
            }
        });
        DWait.ready([".domready", "jms/pages/duperbrowse/stream/base.custom.stream.js"], function() {
            new t
        })
    })(jQuery, window), window.DWait && DWait.run("jms/pages/browselikethis/browselikethis.pcpstream.js")
});
if (window.DWait) {
    DWait.count()
}

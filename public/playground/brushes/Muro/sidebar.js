/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */
DWait.ready(["jms/lib/Base.js", "jms/lib/browser.js", "jms/lib/jquery/jquery.current.js", "jms/lib/pager.js", "jms/pages/stash/stash.embedded.js", "jms/chrome/autobob.js", "jms/lib/spinpreset.js", "jms/lib/popup2.js", "jms/lib/pubsub.js", "cssms/lib/writer-sidebar.css", "jms/lib/jquery/ui/jquery.ui.draggable.js"], function() {
    var t = function(t, i) {
        var e, s = 0;
        return function() {
            if (!e) {
                var a = +new Date - s,
                    n = this,
                    r = arguments,
                    o = function() {
                        s = +new Date, e = !1, t.apply(n, r)
                    };
                a >= i ? o() : e = setTimeout(o, i)
            }
        }
    };
    window.WriterSidebar = Base.extend({
        default_options: {
            sections: ["gallery", "faves", "search", "stash", "art", "emotes"],
            initial_selection: !1,
            stash_filter: "writer_sidebar",
            portfolio_ids: [],
            height_drop: window.Dreamup ? 222 : 202,
            premium_upsell: !1
        },
        constructor: function(i, e, s) {
            this.options = $.extend(!0, {}, this.default_options, s), s.sections && (this.options.sections = s.sections), this.$ = $(i).addClass("stash-sidebar"), this.$.append('<div class="types-container"><div class="types-overview"><ul></ul></div><div class="types-main"><div class="types-main-inside"></div></div></div>'), this.click_callback = e, this.modes = {};
            for (var a = 0; this.options.sections.length > a; a++) this.options.sections[a] && (this.modes[this.options.sections[a]] = new p[this.options.sections[a]](this));
            if ($("body").hasClass("create") || $(window).off("resize.writersidebar").on("resize.writersidebar", t(bind(this, function() {
                PubSub.publish("Skinbar.resize", {}), this.$.is(":visible") && this.active && (this.active.load_more_results_if_needed(), this.active.load_visible_placeholders()), this.$.hasClass("sidebar-collapsed") || (this.$.find(".types-main").height($(window).height() - this.options.height_drop), this.$.find(".scroll-container.inner-scroll").height($(window).height() - this.options.height_drop - 67))
            }), 50)).trigger("resize.writersidebar"), this.options.from_page_top) {
                var n = this.$.offset().top;
                $(window).off("scroll.imrans-hack").on("scroll.imrans-hack", t(bind(this, function() {
                    this.options.from_page_top > window.pageYOffset + n ? this.$.css("top", this.options.from_page_top - Math.max(window.pageYOffset, 0)) : this.$.css("top", "")
                }), 50)).scroll()
            }
            setTimeout(bind(this, function() {
                var t = this.options.initial_selection;
                t && this.modes[t] && this.modes[t].display(), this.modes.stash && this.active != this.modes.stash && this.modes.stash.loaded_stash_content(null, $('<div class="stream stash-stream"/>'))
            }), 10), this.$.on("keydown", function(t) {
                27 == t.keyCode && PubSub.publish("WriterSidebar.cancel_interaction")
            }), PubSub.subscribe({
                eventname: "WriterSidebar.show_emoticons",
                subscriber: this,
                callback: function() {
                    this.$.is(":visible") && this.modes.emotes && (this.modes.emotes.display(), this.modes.emotes.$main.find("input").focus())
                }
            })
        },
        reinit_modes: function(t, i) {
            this.options.sections = t;
            for (var e = 0; this.options.sections.length > e; e++) this.options.sections[e] && !this.modes[this.options.sections[e]] && (this.modes[this.options.sections[e]] = new p[this.options.sections[e]](this));
            this.options.initial_selection = i, setTimeout(bind(this, function() {
                var t = this.options.initial_selection;
                t && this.modes[t] && this.modes[t].display(), this.modes.stash && this.active != this.modes.stash && this.modes.stash.loaded_stash_content(null, $('<div class="stream stash-stream"/>'))
            }), 10)
        },
        destroy: function() {
            this.on_hide();
            for (var t in this.modes) this.modes[t].unbind();
            $(window).off("resize.writersidebar"), this.$.remove(), this.$ = null
        },
        display: function(t) {
            this.modes[t] && (this.top(), this.on_show(), this.modes[t].display())
        },
        on_show: function() {
            this.modes.stash && (this.stash_previous_mode = Glbl("Stash.mode"), Glbl("Stash.mode", "plain")), this.$.is(":visible") && this.active && this.active.load_more_results_if_needed()
        },
        on_hide: function() {
            this.modes.stash && this.stash_previous_mode && (Glbl("Stash.mode", this.stash_previous_mode), this.stash_previous_mode = null)
        },
        top: function() {
            this.active && this.active.close(!0)
        }
    });
    var i = window.WriterSidebarDragAndDrop = Base.extend({
        constructor: function(t, i) {
            var e = this;
            this.sidebar_section = t, this.sidebar_section.$main.on("mouseover", i || ".tt-a", function() {
                e.init_thumb_draggable(this)
            })
        },
        init_thumb_draggable: function(t) {
            var i = this;
            $(t).is(":ui-draggable") || $(t).draggable({
                appendTo: "body",
                revert: "invalid",
                distance: 4,
                scroll: !1,
                start: $.proxy(this, "ui_start_handler"),
                stop: $.proxy(this, "ui_stop_handler"),
                drag: $.proxy(this, "ui_drag_handler"),
                helper: function() {
                    return i.create_drag_helper_from_thumb(this)
                }
            })
        },
        ui_start_handler: function(t) {
            var i = t.target,
                e = t.originalEvent.target;
            return $(i).is(".stash-stack") || !$(e).is("img, .emotes li") && !$(i).find("q").length && !$(e).closest(".image-placeholder").length ? !1 : (this.sidebar_section.dragging = !0, $(window).width() >= $(document).width() && $("body").css("overflow-x", "hidden"), $(window).height() >= $(document).height() && $("body").css("overflow-y", "hidden"), void 0)
        },
        ui_stop_handler: function() {
            this.sidebar_section.dragging = !1, $("body").css({
                "overflow-x": "",
                "overflow-y": ""
            })
        },
        ui_drag_handler: function(t, i) {
            i.helper.css("visibility", "hidden");
            var e = document.elementFromPoint(t.clientX, t.clientY);
            $(e).closest(":ui-droppable[contenteditable]").length && this.update_caret_position(t, i), i.helper.css("visibility", "")
        },
        create_drag_helper_from_thumb: function(t) {
            var i, e, s = .66666666;
            return $(t).is(".emotes li") ? (i = $(t).find("img"), e = i.clone(), s = 1) : $(t).find("q").length ? (i = $(t), e = i.clone()) : $(t).find(".image-placeholder").length ? (i = $(t).find(".image-placeholder"), e = i.clone().css({
                left: "",
                top: -17
            })) : $(t).find("a.thumb.film").length ? (i = $thumb.find("a.thumb b.film img"), e = $("<div>").css({
                width: 150,
                overflow: "hidden"
            }).append(i.clone())) : $(t).find("a.thumb img").length ? (i = $(t).find("a.thumb img"), e = i.clone().css({
                left: "",
                top: ""
            })) : (i = $(t), e = i.clone().css({
                left: "",
                top: ""
            })), e.css({
                marginLeft: (i.offset().left - $(t).offset().left) / s,
                marginTop: (i.offset().top - $(t).offset().top) / s
            }), 1 != s && (e = $('<div class="writer-sidebar-drag-helper-inner">').append(e)), $('<div class="writer-sidebar-drag-helper">').append(e)
        },
        update_caret_position: function(t) {
            var i, s, a;
            if (document.caretPositionFromPoint) {
                if (i = document.caretPositionFromPoint(t.clientX, t.clientY)) return s = document.createRange(), s.setStart(i.offsetNode, i.offset), a = window.getSelection(), a.removeAllRanges(), a.addRange(s), !0
            } else {
                if (document.caretRangeFromPoint) return s = document.caretRangeFromPoint(t.clientX, t.clientY), a = window.getSelection(), a.removeAllRanges(), a.addRange(s), !0;
                Browser.isIE && !Browser.isIE8 && e.move_to(t.clientX, t.clientY)
            }
            return !1
        }
    }),
        e = {
            move_to: function(t, i) {
                var e, s, a = document.elementFromPoint(t, i),
                    n = window.getSelection(),
                    r = document.createRange();
                if (a) {
                    if ("IMG" == a.tagName) return r.selectNode(a), e = a.getBoundingClientRect(), r.collapse(e.right - t > t - e.left), n.removeAllRanges(), n.addRange(r), void 0;
                    s = a.childNodes, 0 !== s.length && (s.length > 50 && (s = this.select_nodes_in_vertical_range(s, i - 100, i + 100)), s = this.select_nodes_with_best_overlap(s, t, i), caret = this.nearest_caret_position_in_all_nodes(s, t, i), caret && (r.setStart(caret.node, caret.offset), r.collapse(!0), n.removeAllRanges(), n.addRange(r)))
                }
            },
            select_nodes_in_vertical_range: function(t, i, e) {
                var s = this,
                    a = this.binary_search({
                        length: t.length,
                        get: function(e) {
                            var a = s.get_node_bounding_box(t[e]);
                            return i > a.bottom ? -1 : 1
                        }
                    }, 0),
                    n = this.binary_search({
                        length: t.length,
                        get: function(i) {
                            var a = s.get_node_bounding_box(t[i]);
                            return e > a.top ? -1 : 1
                        }
                    }, 0);
                return Array.prototype.slice.call(t, a, n + 1)
            },
            select_nodes_with_best_overlap: function(t, i, e) {
                var s, a, n, r = [];
                for (s = 0; a = t[s]; s++) if (n = this.get_node_bounding_box(a), e >= n.top && n.bottom >= e && (r.push(a), i >= n.left && n.right >= i)) return [a];
                return r.length ? r : t
            },
            nearest_caret_position_in_all_nodes: function(t, i, e) {
                var s, a, n, r, o, h, d = 1 / 0;
                for (s = 0; a = t[s]; s++) n = this.nearest_point_in_node(a, i, e), n && (h = Math.sqrt(Math.pow(i - n[1].x, 2) + Math.pow(e - n[1].y, 2)), d > h && (d = h, r = a, o = n[0]));
                return 1 / 0 > d ? {
                    node: r,
                    offset: o
                } : null
            },
            nearest_point_in_node: function(t, i, e) {
                if (1 == t.nodeType) {
                    var s = this.get_node_bounding_box(t);
                    return [0, {
                        x: s.right,
                        y: s.top + s.height / 2
                    }]
                }
                return this.nearest_point_in_text_node(t, i, e)
            },
            nearest_point_in_text_node: function(t, i, e) {
                var s, a, n = document.createRange(),
                    r = t.nodeValue.length;
                if (0 !== r) {
                    var o = function(i) {
                        n.setStart(t, i == r ? i - 1 : i), n.setEnd(t, i);
                        var e = n.getBoundingClientRect();
                        return {
                            x: e.right,
                            y: e.top + e.height / 2
                        }
                    };
                    return s = this.binary_search({
                        length: r + 1,
                        get: function(t) {
                            return o(t).y
                        }
                    }, e), a = o(s).y, s = this.binary_search({
                        length: r + 1,
                        get: function(t) {
                            var e = o(t);
                            return a > e.y ? -1 / 0 : e.y > a ? +1 / 0 : e.x - i
                        }
                    }, 0), [s, o(s)]
                }
            },
            get_node_bounding_box: function(t) {
                if (1 == t.nodeType) return t.getBoundingClientRect();
                var i = document.createRange();
                return i.selectNode(t), i.getBoundingClientRect()
            },
            binary_search: function(t, i) {
                for (var e, s = 0, a = t.length - 1; a >= s;) if (e = Math.floor((s + a) / 2), i > t.get(e)) s = e + 1;
                else {
                    if (!(t.get(e) > i)) return e;
                    a = e - 1
                }
                return -1 == a ? 0 : s == t.length ? t.length - 1 : Math.abs(t.get(a) - i) > Math.abs(t.get(s) - i) ? s : a
            }
        }, s = Base.extend({
            _show_timeout: null,
            _hide_timeout: null,
            _spinner: null,
            _$node: null,
            _$spinner: null,
            _$text: null,
            constructor: function(t) {
                this._$node = $('<div class="writer-sidebar-status"><div class="writer-sidebar-status-spinner"></div><div class="writer-sidebar-status-text"></div></div>').appendTo(t.$main.find(".writer-sidebar-status-container")), this._$text = this._$node.find(".writer-sidebar-status-text"), this._$spinner = this._$node.find(".writer-sidebar-status-spinner"), this._reset()
            },
            show_progress: function() {
                this._reset(), this._$text.html("&nbsp;"), this._$node.show(), this._show_timeout = setTimeout(function() {
                    this._$text.text("Loading..."), this._spinner = new Spinner(SpinnerPresets.green), this._spinner.spin(this._$spinner[0])
                }.bindTo(this), 300)
            },
            flash_message: function(t) {
                this._reset(), this._$text.text(t), this._$node.show(), this._hide_timeout = setTimeout(function() {
                    this._$node.hide()
                }.bindTo(this), 2e3)
            },
            hide: function() {
                this._reset()
            },
            _reset: function() {
                this._show_timeout && clearTimeout(this._show_timeout), this._hide_timeout && clearTimeout(this._hide_timeout), this._spinner && this._spinner.stop(), this._$node.hide()
            }
        }),
        a = Base.extend({
            offset: 0,
            count: 120,
            dragging: !1,
            parent_type: null,
            constructor: function(t) {
                this.sidebar = t, this.$item = this.render_list_item(), this.$main = this.render_main().hide(), this.$stream = this.$main.find(".stream").not(".pager-stream"), this.status = new s(this), this.parent_type || t.$.find(".types-overview ul").append(this.$item), t.$.find(".types-main-inside").append(this.$main), this.$main.find("a.clear, .types-searchbox").hide(), t.options.premium_upsell && this.premium_only && Glbl("Site.is_deviantart") && !deviantART.deviant.subbed && this.show_premium_overlay(), this.bind()
            },
            render_list_item: function() {
                var t = this.label;
                this.sidebar.options.section_titles && (t = this.sidebar.options.section_titles[this.type_name()] || this.label);
                var i = $("<li>", {
                    "class": "writer-sidebar-type writer-sidebar-type-" + this.type_name(),
                    html: "<span>" + t + "</span>"
                }).data("sidebar-type", this);
                return i
            },
            render_main: function() {
                var t = $.inArray("search", this.sidebar.options.sections) > -1,
                    i = ['<div class="writer-sidebar-main-' + this.type_name() + '">', '<div class="types-back"><i></i><span>Back</span></div>', '<div class="types-heading"></div>'];
                return t && i.push('<div class="types-searchbox">', '<div class="writer-sidebar-input-container"><input type="text" placeholder="Search deviantART"/><a class="clear" href="#">Clear</a></div>', '<a id="open-friends-menu" href="#"></a>', "</div>"), i.push('<div class="scroll-container">', '<div class="pager-stream stream stash-stream" rs_ignore></div>', '<div class="stream stash-stream" rs_ignore></div>', '<div class="writer-sidebar-status-container"></div>', "</div>", "</div>"), $(i.join("\n")).data("sidebar-type", this)
            },
            display: function(t) {
                if (this._activate_tab() && (this.$main.width() && this.$main.find(".types-searchbox:visible").length && (this.$main.height($(window).height() - this.sidebar.options.height_drop), this.$main.find(".scroll-container").addClass("inner-scroll").css({
                    height: this.$main.height() - 67
                })), this.crumb(""), !t && 0 === this.offset)) {
                    if (this.loading) return;
                    this.loading = !0, this.fetch()
                }
            },
            _activate_tab: function() {
                return this.sidebar.active == this ? !1 : (this.sidebar.active && this.sidebar.active.close(!0), this.sidebar.active = this, this.sidebar.$.find(".types-overview li").removeClass("active"), this.parent_type ? this.sidebar.modes[this.parent_type].$item.addClass("active") : this.$item.addClass("active"), this.sidebar.$.find('div[class^="writer-sidebar-main-"]').hide(), this.$main.show(), this.status.hide(), PubSub.publish("WriterSidebar.activate_tab", this.name), !0)
            },
            close: function(t) {
                return !this.on_back() || t ? (this.sidebar.active = !1, this.parent_type || this.sidebar.$.find(".types-overview li").removeClass("active"), this.$main.hide(), this.status.hide(), this.parent_type ? (this.sidebar.modes[this.parent_type].display(), void 0) : !0) : void 0
            },
            on_back: function() {
                return this.$main.hide(), !1
            },
            bind: function() {
                this.$item.click(bind(this, this.item_click)), this.$main.delegate(".stream div a.thumb, .stream div a.t", "click", bind(this, this.stream_click)), this.results_scroll_node().on("scroll", bind(this, this.load_more_results_if_needed)), this.$main.find(".types-back, a.clear").click(bind(this, this.back_click)), new i(this)
            },
            unbind: function() {
                this.$main.undelegate(), this.$item.unbind()
            },
            item_click: function(t) {
                t.preventDefault(), this.sidebar.$.hasClass("sidebar-collapsed") ? PubSub.publish("Skinbar.collapse", this.type_name()) : this.display()
            },
            back_click: function(t) {
                return t.preventDefault(), this.close(), $(t.target).is("a.clear") ? !1 : void 0
            },
            crumb: function(t, i) {
                t ? (t = t.replace(" boost:popular", "").replace(/^by:/, ""), this.$main.find(".types-searchbox:visible").length ? (this.$main.find(".types-heading").hide(), this.$main.find(".types-back").hide(), this.$main.find(".types-searchbox").find("input").val(t).end().find("a.clear").show()) : (this.$main.find(".types-heading").show().html(t), this.$main.find(".types-back").show().find("span").html(i || "Back"))) : (this.$main.find(".types-heading").hide(), this.$main.find(".types-back").hide()), this.$main.find(".types-heading").css({
                    width: 230 - this.$main.find(".types-back").width() + "px"
                })
            },
            stream_click: function(t) {
                t.preventDefault();
                var i = this.stream_click_hook($(t.target).closest("[collect_rid]"));
                null !== i && this.sidebar.click_callback(i, this.label)
            },
            stream_click_hook: function(t) {
                return t
            },
            query: !1,
            fetch: function(t, i, e) {
                e = e || !1, this.status.show_progress(), t && (this.query = t), i && (this.autofetch ? this.crumb(i, "deviantART") : this.crumb(i, this.label)), DiFi.pushPrivateGet("Resources", "htmlFromQuery", [this.query, this.offset, this.results_per_page(), "thumb150", "artist:0,title:1"], bind(this, this.loaded_stream)), e || DiFi.send(), this.$stream.show(), this.fix_stream_size()
            },
            loaded_stream: function(t, i) {
                this.loading = !1, t || this.status.flash_message("Couldn't load contents");
                var e = this.normalized_response(i.response.content);
                0 === e.items.length && 0 === this.offset && (this.fetch_callback && this.fetch_callback(this.query, []), this.status.flash_message("No results found")), this.offset += e.items.length, this.$stream.append(e.items.join("")), this.$main.find(".stream.pager-stream").empty().hide(), this.status.hide(), this.fix_stream_size(), this.has_more_results = e.more, this.load_more_results_if_needed(), this.fetch_callback && this.fetch_callback(this.query, this.$stream.clone(!0))
            },
            normalized_response: function(t) {
                for (var i = [], e = 0; t.resources.length > e; e++) i.push(t.resources[e][2]);
                return {
                    items: i,
                    more: t.more
                }
            },
            type_name: function() {
                return this.name || this.label.toLowerCase().replace(/[^a-z_\-]/g, "")
            },
            generate_stackthumb: function(t, i, e) {
                var s, a = $('<div class="stash-thumb-container" data-id="' + e + '">').html(['<div class="tt-a stash-tt-a sq stash-stack new-stack">', '<span class="tt-w">', '<span class="shadow">', '<a class="thumb" href="#">', '<div class="stack-background">', '<span class="stack-crop">', "</span>", "</div>", "</a>", "</span>", '<a class="t">', $("<div></div>").html(i).text(), "</a>", "</span>", "</div>"].join("\n"));
                if (t.find(".image-placeholder").length) s = t.find(".image-placeholder").clone();
                else if (t.is(".lit")) {
                    var i = t.find("q strong:first-child").text(),
                        n = t.find("q").html();
                    n = n.substr(n.indexOf("</strong>") + 9), s = $('<div class="freeform-wrapper"><strong>' + i + "</strong><br>" + n + "</div>")
                } else {
                    var r = t.find("img").attr("src");
                    s = $('<img src="' + r + '" onerror="autobob.error(event)" onload="autobob.load(event)">'), s.on("load", function() {
                        var t = s.width(),
                            i = s.height(),
                            e = Math.round,
                            a = 112,
                            n = {}, r = t,
                            o = i;
                        t > i ? (i >= a ? (n.height = a, r = t / (i / a)) : (r = t, n["margin-top"] = e((a - i) / 2)), n["margin-left"] = e((a - r) / 2)) : t == i ? t >= a ? (n.width = a, n.height = a) : n["margin-top"] = e((a - i) / 2) : t >= a ? (n.width = a, o = i / (t / a), n["margin-top"] = e((a - i) / 4)) : n["margin-top"] = i >= a ? e((a - i) / 4) : e((a - i) / 2), $.each(n, function(t, i) {
                            s.css(t, i)
                        })
                    })
                }
                return a.find("span.stack-crop").append(s), a
            },
            fix_stream_size: function() {
                this.$main.find(".stash-stream").each(function() {
                    var t = $(this);
                    t.parent().is(".zoom-fix") || t.wrap('<div class="zoom-fix" style="width: 410px; overflow: hidden;"></div>'), t.height() && t.parent().height(.666666 * t.height() + 20)
                })
            },
            reset_stream_size: function() {
                this.$main.find(".zoom-fix").css("height", "")
            },
            show_overlay: function(t, i) {
                return $('<div class="writer-sidebar-overlay"></div>').addClass("writer-sidebar-" + t + "-overlay").append(i.addClass("writer-sidebar-overlay-inner")).appendTo(this.$main)
            },
            show_premium_overlay: function() {
                var t = "https://www.deviantart.com/checkout/?mx=premium&subpref=22870_0&point=writersidebar",
                    i = "PubSub.publish('DaGa.track_event_link', { event: event, element: this, category : 'PremiumUpsell', action: 'WriterEmbedding'});",
                    e = $('<div><div class="section-description"></div><br><b>Premium Membership</b> allows you to use this feature. <a target="_blank" href="' + t + '" onclick="' + i + '">' + "Upgrade!" + "</a><br><br>" + '<a target="_blank" href="' + t + '" onclick="' + i + '">' + '<img src="//st.deviantart.net/minish/main/premium_button_standard.png">' + "</a>" + "</div>");
                e.find(".section-description").text(this.description), this.show_overlay("premium", e)
            },
            loading: !1,
            has_more_results: !1,
            results_per_pixel: function() {
                return 2 / 152
            },
            results_scroll_node: function() {
                return this.$main
            },
            results_per_page: function() {
                return Math.max(this.count, Math.ceil((this.results_page_height() + 100) * this.results_per_pixel()))
            },
            results_page_height: function() {
                return this.results_scroll_node().height()
            },
            reached_bottom_results: function() {
                var t = this.results_scroll_node()[0];
                return t.scrollHeight && 50 > t.scrollHeight - t.scrollTop - t.clientHeight
            },
            load_more_results_if_needed: function() {
                this.sidebar.active == this && !this.loading && this.reached_bottom_results() && this.has_more_results && this.load_more_results()
            },
            load_more_results: function() {
                this.loading = !0, this.fetch()
            },
            load_visible_placeholders: function() {}
        }),
        n = a.extend({
            label: "Sta.sh",
            name: "stash",
            description: "Drag and drop any of your Sta.sh images into your comment. Or add a new image to use immediately!",
            premium_only: !0,
            _uploading: !1,
            _ready: !1,
            _display_asap: !1,
            _previous_mode: "",
            constructor: function(t) {
                this.base(t), this.sidebar.options.upload_thumb || t.$.prepend($(".stash-upload-box").show()), PubSub.subscribe([{
                    eventname: "WriterSidebar.start_stash",
                    subscriber: this,
                    callback: this.start_listening
                }, {
                    eventname: "WriterSidebar.stop_stash",
                    subscriber: this,
                    callback: this.stop_listening
                }])
            },
            start_listening: function(t, i) {
                PubSub.subscribe([{
                    eventname: "Stash.item_open",
                    subscriber: this,
                    callback: this.stash_item_open
                }, {
                    eventname: "Stash.folder_open",
                    subscriber: this,
                    callback: this.stash_folder_open
                }, {
                    eventname: "Stash.root_open",
                    subscriber: this,
                    callback: this.stash_root_open
                }, {
                    eventname: "Stash.folder_current_name",
                    subscriber: this,
                    callback: this.stash_folder_name
                }, {
                    eventname: "StashEmbedded.folder_loaded",
                    subscriber: this,
                    callback: this.loaded_stash_content
                }, {
                    eventname: "StashEmbedded.root_loaded",
                    subscriber: this,
                    callback: this.loaded_stash_content
                }, {
                    eventname: "Stash.needs_stream_now",
                    subscriber: this,
                    callback: this.stash_needs_stream_now
                }, {
                    eventname: "StashUploader.starting",
                    subscriber: this,
                    callback: this.upload_start
                }, {
                    eventname: "StashUploader.error",
                    subscriber: this,
                    callback: this.upload_end
                }, {
                    eventname: "StashUploader.cancel",
                    subscriber: this,
                    callback: this.upload_end
                }, {
                    eventname: "StashUploader.cancel_all",
                    subscriber: this,
                    callback: this.upload_end
                }, {
                    eventname: "StashUploader.complete",
                    subscriber: this,
                    callback: this.upload_end
                }, {
                    eventname: "StashEmbedded.start",
                    subscriber: this,
                    callback: this.stash_started
                }]), DWait.ready(["jms/pages/stash/stash.js", "jms/lib/glbl.js"], function() {
                    this._previous_mode = Glbl("Stash.mode"), Glbl("Stash.mode", "plain"), Glbl("Stash.filter", this.sidebar.options.stash_filter), Glbl("StashStreamSelection.disable", !0), Glbl("Stash.browselimit", 15), PubSub.publish("StashEmbedded.start"), this.sidebar.options.upload_thumb || PubSub.publish("StashUploader.form_switch"), i && this.display()
                }.bindTo(this))
            },
            stop_listening: function() {
                PubSub.unsubscribe([{
                    eventname: "Stash.item_open",
                    subscriber: this
                }, {
                    eventname: "Stash.folder_open",
                    subscriber: this
                }, {
                    eventname: "Stash.root_open",
                    subscriber: this
                }, {
                    eventname: "Stash.folder_current_name",
                    subscriber: this
                }, {
                    eventname: "StashEmbedded.folder_loaded",
                    subscriber: this
                }, {
                    eventname: "StashEmbedded.root_loaded",
                    subscriber: this
                }, {
                    eventname: "Stash.needs_stream_now",
                    subscriber: this
                }, {
                    eventname: "StashUploader.starting",
                    subscriber: this
                }, {
                    eventname: "StashUploader.error",
                    subscriber: this
                }, {
                    eventname: "StashUploader.cancel",
                    subscriber: this
                }, {
                    eventname: "StashUploader.cancel_all",
                    subscriber: this
                }, {
                    eventname: "StashUploader.complete",
                    subscriber: this
                }, {
                    eventname: "StashEmbedded.start",
                    subscriber: this
                }]), this._previous_mode && Glbl("Stash.mode", this._previous_mode)
            },
            unbind: function() {
                this.base(), PubSub.unsubscribe([{
                    eventname: "WriterSidebar.start_stash",
                    subscriber: this
                }, {
                    eventname: "WriterSidebar.stop_stash",
                    subscriber: this
                }])
            },
            render_main: function() {
                var t = this.base();
                return t.find(".stash-stream").removeClass("stash-stream"), t
            },
            stash_item_open: function(t, i) {
                if (!this.dragging && !Glbl("Minibrowse.navigating_by_arrows")) {
                    var e = GMI.query("StashThumb", {
                        match: i
                    })[0],
                        s = e.$.find("div.tt-a");
                    this.stream_click_hook(s), this.sidebar.click_callback(s, this.label)
                }
            },
            stash_folder_open: function(t, i) {
                this.loading = !0, this.folder_id = i.id, this.folder_title = i.title || "", i.title && this.crumb(i.title, this.label), this.status.show_progress(), this.$stream.hide().removeClass("stash-stream"), this.reset_stream_size()
            },
            stash_folder_name: function(t, i) {
                this.folder_current_name = i
            },
            stash_root_open: function() {
                this.loading = !0, this.status.show_progress(), this.folder_title = "", this.reset_stream_size()
            },
            loaded_stash_content: function(t, i) {
                this.loading = !1;
                var e = $(i);
                this.has_more_results = !e.find(".next .disabled").length, e.find(".pagination-wrapper").remove();
                var s = 0 === Glbl("StashEmbedded.expand_offset");
                s ? (this.$stream.replaceWith(e), this.$stream = this.$main.find(".stream").not(".pager-stream")) : (this.$stream.append(e.children()), PubSub.publish("StashStream.activate_visible")), GMI.query("StashThumb"), s && this.sidebar.options.upload_thumb && (this.$stream.prepend($('<div class="tt-a stash-tt-a sq stream-upload-thumb stream-always-at-head">').html($("#stash_upload_zone_holder .stream-upload-thumb").html())), this.$stream.find(".stream-upload-thumb [name=folder_name]").val(this.folder_title), PubSub.publish("StashUploader.form_switch", this.$stream.find(".stream-upload-thumb form"))), s && PubSub.publish("WriterSidebar.loaded_stash_content"), this.$stream.show(), this.status.hide(), this.fix_stream_size(), this.load_more_results_if_needed()
            },
            stash_needs_stream_now: function() {
                this.display()
            },
            upload_start: function() {
                this.display(!0), this._uploading = !0, this.fix_stream_size()
            },
            upload_end: function() {
                this._uploading = !1, this.fix_stream_size()
            },
            display: function(t) {
                this._ready ? this.base(t) : DWait.ready(["jms/pages/stash/stash.js"], function() {
                    this._ready ? this.display(t) : (this._display_asap = !0, PubSub.publish("WriterSidebar.start_stash"))
                }.bindTo(this))
            },
            stash_started: function() {
                this._ready = !0, this._display_asap && (this._display_asap = !1, this.display())
            },
            fetch: function() {
                this.loading = !0, this.$stream.empty().removeClass("stash-stream"), PubSub.publish("Stash.root_open")
            },
            stream_click: function() {},
            stream_click_hook: function(t) {
                return t.addClass("stashthumb")
            },
            load_more_results: function() {
                this.loading = !0, this.status.show_progress(), PubSub.publish("StashEmbedded.stream_expand")
            },
            on_back: function() {
                return this._uploading ? !0 : "folder" == Glbl("Stash.view") ? (this.display(), !0) : this.base()
            },
            close: function() {
                return this.sidebar.active = !1, this.base() ? !0 : void 0
            },
            item_click: function(t) {
                this.sidebar.active == this ? (t.preventDefault(), this.loading = !0, this.$stream.empty().removeClass("stash-stream"), Glbl("Stash.current_folderid") ? PubSub.publish("Stash.folder_open", {
                    id: Glbl("Stash.current_folderid"),
                    title: this.folder_current_name || ""
                }) : PubSub.publish("Stash.root_open")) : this.base(t)
            }
        }),
        r = a.extend({
            fetch_callback: null,
            constructor: function(t) {
                if (this.parent_type = "art", this.collection_stack = [], this.collectionid = 0, this.base(t), this.$pagerstream = this.$main.find(".pager-stream"), !this.pager) {
                    var i = {
                        master_links: !1,
                        theme: "browse",
                        auto_height: !0,
                        adjust_height_callback: function() {},
                        no_selected_class: !0
                    };
                    this.pager = Pager.create($.extend({}, i, this.pager_options()))
                }
            },
            stream_click: function(t) {
                t.preventDefault();
                var i = this.stream_click_hook($(t.target).closest("[collect_rid]"));
                if (null !== i) if (i.parent(".stash-thumb-container").length) {
                    t.stopPropagation(), this.collectionid && this.collection_stack.push({
                        query: this.query,
                        label: this.label,
                        toplabel: this.toplabel || !1,
                        id: this.collectionid
                    }), this.$stream.empty().hide(), this.reset_stream_size(), this.offset = 0, this.toplabel = this.label, this.label = i.parent().data("gallectiontitle");
                    var e = (20 == this.resource_type ? "gallery" : "favby") + ":" + window.deviantART.deviant.username + "/" + i.parent().data("gallectionid");
                    this.fetch(e, this.label, !1, bind(this, function() {
                        this.$stream.hide(), this.reset_stream_size(), this.status.show_progress(), this.collectionid = i.parent().data("gallectionid"), DiFi.pushPublicGet("Resources", "writerSidebarHTMLFromResourceRoot_v2", [this.resource_type, window.deviantART.deviant.id, i.parent().data("gallectionid")], bind(this, function(t, i) {
                            this.loading = !1, this.status.hide(), this.$stream.prepend(i.response.content.html).show(), this.fix_stream_size()
                        })), DiFi.send()
                    })), this.crumb(this.label, this.toplabel)
                } else this.sidebar.click_callback(i, this.label)
            },
            display: function() {
                this.base(!0), this.crumb(this.label, "deviantART"), this.$stream.empty().hide(), this.$pagerstream.empty().hide(), this.reset_stream_size(), this.$main.find(".scroll-container").css("clear", "left"), this.offset = 0, this.has_more_results = !1, this.loading = !0, this.status.show_progress(), DiFi.pushPublicGet("Resources", "writerSidebarHTMLFromResourceRoot_v2", [this.resource_type, window.deviantART.deviant.id, 0], bind(this, function(t, i) {
                    this.$pagerstream.html(i.response.content.html), this.$pagerstream.find(".tt-a").not(".stash-tt-a").addClass("stash-tt-a"), 1 >= this.$pagerstream.children("div").length ? (this.fetch((20 == this.resource_type ? "gallery" : "favby") + ":" + window.deviantART.deviant.username, this.label), this.crumb(this.label, "deviantART")) : (this.loading = !1, this.has_more_results = !1, this.status.hide(), this.$pagerstream.show(), this.fix_stream_size(), this.query = !1)
                })), DiFi.send()
            },
            crumb: function(t, i) {
                this.$main.find(".types-back").show().find("span").html(i || "Back"), t ? this.$main.find(".types-heading").show().html(t) : this.$main.find(".types-heading").hide(), this.$main.find(".types-heading").css({
                    width: 230 - this.$main.find(".types-back").width() + "px"
                })
            },
            pager_options: function() {},
            fetch: function(t, i, e, s) {
                this.fetch_callback = s || null, $(this.pager.node).hide(), this.$pagerstream.empty().hide(), this.reset_stream_size(), this.base(t, i, e)
            },
            on_back: function() {
                var t = this.$main.find(".types-back span").text();
                if ("deviantART" != t && this.query) {
                    if (this.collection_stack.length) {
                        var i = this.collection_stack.pop();
                        this.$stream.empty(), this.$pagerstream.empty(), this.reset_stream_size(), this.loading = !0, this.fetch(i.query, i.label, !1, bind(this, function() {
                            this.$stream.hide(), this.reset_stream_size(), DiFi.pushPublicGet("Resources", "writerSidebarHTMLFromResourceRoot_v2", [this.resource_type, window.deviantART.deviant.id, i.id], bind(this, function(t, i) {
                                this.loading = !1, this.status.hide(), this.$stream.prepend(i.response.content.html).show()
                            })), DiFi.send()
                        })), this.collectionid = i.id, this.label = i.label, this.toplabel = i.toplabel, this.crumb(this.label, this.toplabel)
                    } else this.query = !1, this.offset = 0, this.collectionid = 0, this.label = this.toplabel, this.toplabel = !1, this.display();
                    return !0
                }
                return this.base()
            }
        }),
        o = r.extend({
            label: "Gallery",
            resource_type: 20,
            href_base: "gallery/",
            pager_options: function() {
                return {
                    rootri: "gallections/" + window.deviantART.deviant.username + "/" + this.resource_type,
                    selection: "gallections/" + window.deviantART.deviant.username + "/" + this.resource_type,
                    href_base: "http://" + window.deviantART.deviant.username + ".deviantart.com/" + this.href_base,
                    callback: bind(this, function(t) {
                        var i = t;
                        if (t = /gallections\/([^\/]+)\/(\d+)\/?.*?\/??(\d*)$/.exec(t)) {
                            var e = (20 == t[2] ? "gallery" : "favby") + ":" + t[1] + (t[3] ? "/" + t[3] : ""),
                                s = $('a[menuri="' + i + '"]').html();
                            this.fetch(e, s)
                        }
                    })
                }
            }
        }),
        h = o.extend({
            label: "Favourites",
            name: "faves",
            resource_type: 21,
            href_base: "faves/"
        }),
        d = a.extend({
            label: "Portfolios",
            constructor: function(t) {
                t.options.portfolio_ids.length && (this.base(t), this.$pagerstream = this.$main.find(".pager-stream"), this.current_portfolio = null, this.$pagerstream.delegate("div.stash-thumb-container", "click", bind(this, function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var i = $(t.target).closest("div.stash-thumb-container");
                    this.view_depth ? this.render_gallery(i.data("id")) : this.render_portfolio(i.data("id"))
                })), this.fetch_root())
            },
            display: function() {
                this.base(!0), this.render_root()
            },
            on_back: function() {
                switch (this.view_depth--, this.view_depth) {
                    case -1:
                        return !1;
                    case 0:
                        this.render_root();
                        break;
                    case 1:
                        this.render_portfolio(this.current_portfolio)
                }
                return !0
            },
            fetch_root: function() {
                this.loading = !0, this.$stream.empty().hide(), this.reset_stream_size(), this.status.show_progress(), this.has_more_results = !1, DiFi.pushPost("Portfolio", "getPortfoliosData", [this.sidebar.options.portfolio_ids], bind(this, this.loaded_root)), DiFi.send()
            },
            loaded_root: function(t, i) {
                if (this.loading = !1, !t) return this.status.flash_message("Couldn't load contents"), void 0;
                this.status.hide(), this.portfolio_data = i.response.content.data;
                for (var e, s = 0; this.portfolio_data.length > s; s++) {
                    e = this.portfolio_data[s];
                    var a = new Image;
                    a.src = e.mainimage_id > 0 ? e.mainimage_data.thumburl : "http://st.deviantart.net/portfolio/ui/portfolio-icon-thumb.png", this.portfolio_data[s].thumbobj = a;
                    for (var n in e.galleries_data) {
                        var r = new Image;
                        r.src = e.galleries_data[n].images ? e.galleries_data[n].images.thumburl : "http://st.deviantart.net/portfolio/ui/portfolio-icon-thumb.png", this.portfolio_data[s].galleries_data[n].thumbobj = r
                    }
                }
            },
            render_root: function() {
                this.status.hide(), this.has_more_results = !1, this.$stream.empty().hide(), this.$pagerstream.empty(), this.view_depth = 0;
                for (var t, i, e, s = 0; this.portfolio_data.length > s; s++) t = this.portfolio_data[s], i = $(t.thumbobj), i.attr({
                    width: t.thumbobj.width,
                    height: t.thumbobj.height
                }), e = this.generate_stackthumb(i, t.label, t.portfolioid), this.$pagerstream.append(e);
                this.crumb("", ""), this.current_portfolio = null, this.$pagerstream.show(), this.fix_stream_size()
            },
            render_portfolio: function(t) {
                this.status.hide(), this.has_more_results = !1, this.loading = !1, this.$stream.empty().hide(), this.$pagerstream.empty(), this.view_depth = 1;
                for (var i = 0; this.portfolio_data.length > i; i++) {
                    var e = this.portfolio_data[i];
                    if (e.portfolioid == t) {
                        this.crumb(e.label, "Portfolios"), this.current_portfolio = t, this.$pagerstream.empty();
                        for (var s in e.galleries_data) {
                            var a = e.galleries_data[s];
                            $img = $(a.thumbobj), $img.attr({
                                width: a.thumbobj.width,
                                height: a.thumbobj.height
                            }), thumb = this.generate_stackthumb($img, a.label, a.galleryid), this.$pagerstream.append(thumb)
                        }
                        break
                    }
                }
                this.$pagerstream.show(), this.fix_stream_size()
            },
            render_gallery: function(t) {
                this.$stream.empty().hide(), this.$pagerstream.empty().hide(), this.reset_stream_size(), this.has_more_results = !1, this.loading = !0, this.view_depth = 2, this.status.show_progress();
                for (var i, e = 0; this.portfolio_data.length > e; e++) if (this.portfolio_data[e].portfolioid == this.current_portfolio) {
                    i = this.portfolio_data[e];
                    break
                }
                var s = i.galleries_data[t];
                this.crumb(s.label, i.label), DiFi.pushPost("Portfolio", "getGalleryFiles", [i.userid, i.portfolioid, t], bind(this, function(t, i) {
                    if (this.loading = !1, this.status.hide(), i.response.content.data.length) for (var e in i.response.content.data) {
                        var s = i.response.content.data[e],
                            a = new Image;
                        a.src = s.thumburl;
                        var n = $(a),
                            r = $('<div class="tt-a portfoliofile" collect_rid="36:' + s.fileid + '">').html(['<span class="tt-w"><span class="shadow">', '<a class="thumb" data-super-height="' + s.height + '" data-super-width="' + s.width + '" data-super-img="' + s.fileurl + '" href="' + s.fileurl + '" title="' + s.title + '"><img></a>', "</span>", '<a class="t" href="' + s.fileurl + '" title="' + s.title + '">' + s.title + "</a>", "</span>"].join("\n"));
                        r.find("img").attr({
                            src: n.attr("src"),
                            width: n.attr("width"),
                            height: n.attr("height")
                        }), this.$stream.append(r)
                    } else this.$stream.append("<div><strong>No images in this gallery</strong></div>");
                    this.$stream.show(), this.fix_stream_size()
                })), DiFi.send()
            },
            load_more_results: function() {}
        }),
        l = a.extend({
            label: "Search",
            constructor: function(t) {
                this.parent_type = "art", this.base(t), this.$main.find(".types-searchbox").show(), this.$main.find(".pager-stream").remove()
            },
            bind: function() {
                this.base(), this.sidebar.$.find("a.clear").click(bind(this, this.on_back)), this.$main.find("input").keypress(bind(this, function(t) {
                    13 == t.which && (t.preventDefault(), this.query = $(t.target).val() + " boost:popular", this.$stream.empty(), this.offset = 0, this.crumb(this.query, "deviantART"), this.loading = !0, this.fetch())
                }))
            },
            on_back: function() {
                return this.sidebar.$.find("input").val(""), !1
            },
            display: function() {
                this.base(!0), this.sidebar.$.find("a.clear").show(), this.crumb(this.query, "deviantART"), this.loading || (this.loading = !0, this.fetch())
            },
            results_scroll_node: function() {
                return this.$main.find(".scroll-container")
            }
        }),
        c = a.extend({
            label: "Bing",
            render_main: function() {
                var t = this.base();
                return t.find(".pager-stream").remove(), t.find(".scroll-container").before('<div class="writer-sidebar-input-container"><input type="text" placeholder="Search Bing Images"/><a class="clear" href="#">Clear</a></div>'), t
            },
            bind: function() {
                this.$main.find("input").keypress(bind(this, function(t) {
                    if (13 == t.which) {
                        t.preventDefault();
                        var i = $(t.target).val();
                        this.offset = 0, this.$main.find(".scroll-container").show(), this.$main.find("a.clear").show(), this.$stream.empty(), this.fetch_results(i)
                    }
                })), this.base()
            },
            fetch_results: function(t) {
                t && (this.query = t), this.has_more_results = !1, this.loading = !0, this.status.show_progress(), DiFi.pushPost("Writer", "getImageResultsBing", [this.query, this.offset, 20], bind(this, this.loaded_results)), DiFi.send()
            },
            loaded_results: function(t, i) {
                this.loading = !1, this.has_more_results = t && i.response.content.d.results.length, t && i.response.content.d.results.length ? this.status.hide() : this.status.flash_message("No results");
                for (var e in i.response.content.d.results) {
                    var s = i.response.content.d.results[e],
                        a = Math.min(1, 150 / Math.max(s.Thumbnail.Width, s.Thumbnail.Height)),
                        n = $('<div class="tt-a portfoliofile" collect_rid="bing:none" data-fullsize="' + s.MediaUrl + '">').append($('<span class="tt-w">').append($('<span class="shadow">').append($('<a class="thumb">').attr({
                            "data-super-height": s.Height,
                            "data-super-width": s.Width,
                            "data-super-img": s.MediaUrl,
                            href: s.MediaUrl,
                            title: s.Title
                        }).append($("<img>").attr({
                            src: s.Thumbnail.MediaUrl,
                            width: s.Thumbnail.Width * a,
                            height: s.Thumbnail.Height * a
                        })))).append($('<a class="t">').attr({
                            href: s.MediaUrl,
                            title: s.Title
                        }).css({
                            padding: "0 2em",
                            height: "2.5em",
                            overflow: "hidden"
                        }).text(s.Title)));
                    this.$stream.append(n)
                }
                this.fix_stream_size()
            },
            display: function() {
                this.sidebar.active.parent_type && this.sidebar.active.close(!0), this.sidebar.active && this.sidebar.active.close(!0), this.sidebar.active = this, this.sidebar.$.find(".types-overview li").removeClass("active"), this.$item.addClass("active"), this.$main.show(), this.$main.find("input").show().val(""), this.$main.find("a.clear").hide(), this.$main.find(".stream").empty(), this.$main.width() && (this.$main.find(".scroll-container.inner-scroll").length ? this.$main.find(".scroll-container.inner-scroll").css({
                    height: this.$main.height() - 67 + "px",
                    width: "auto"
                }) : this.$main.find(".scroll-container").width(this.$main.width()).hide()), this.crumb("")
            },
            on_back: function() {
                return this.sidebar.active = !1, this.$main.find("input").length > 0 ? (this.display(), !0) : !1
            },
            load_more_results: function() {
                this.offset += this.results_per_page(), this.fetch_results()
            }
        }),
        m = a.extend({
            label: "Emoticons",
            name: "emotes",
            search_category: "customization/emoticons/animated",
            query_offset: 0,
            count: 120,
            folder: null,
            constructor: function(t) {
                this.base(t)
            },
            render_main: function() {
                var t = this.base();
                return t.html('<div class="types-searchbox"><div class="writer-sidebar-input-container"><input type="text" placeholder="Search Emoticons"><a class="clear" href="#">Clear</a></div></div><div class="types-back"><i></i><span>Back</span></div><div class="types-heading"></div><div class="scroll-container"><div class="emotes"><div class="official-icons"><h5 class="section-header">Official Emoticons</h5><ul class="exact-matches"></ul><ul class="icon-list"></ul><div class="more" style="padding: 0 0 2em 0"><div class="smbutton smbutton-white">Show All</div></div><div class="empty-message">No matches found</div></div><div class="community-icons"><h5 class="section-header">Community Emoticons</h5><ul class="icon-list"></ul><div class="more" style="padding: 0 0 2em 0"><div class="smbutton smbutton-white">Show All</div></div><div class="empty-message">No matches found</div></div><div class="writer-sidebar-status-container"></div></div></div>'), t
            },
            display: function() {
                this._activate_tab() && this.show_root()
            },
            item_click: function(t) {
                this.base(t), this.$main.find(".types-searchbox input").focus()
            },
            bind: function() {
                this.$item.click(bind(this, this.item_click)), this.$main.delegate(".emotes li", "click", bind(this, this.emote_click)), this.$main.find("input").keyup(bind(this, function(t) {
                    13 == t.which && (this.$main.find(".types-searchbox input").val() ? this.show_search_results() : this.show_root())
                })), this.results_scroll_node().on("scroll", bind(this, function() {
                    this.load_more_results_if_needed(), this.load_visible_placeholders()
                })), new i(this, ".emotes li"), this.$main.find(".official-icons .more .smbutton").click(bind(this, function() {
                    this.show_official_icons()
                })), this.$main.find(".community-icons .more .smbutton").click(bind(this, function() {
                    this.show_community_icons()
                })), this.$main.find(".types-back, .clear").click(bind(this, function(t) {
                    this.show_root(), t.preventDefault()
                }))
            },
            query_emotes: function() {
                var t = this.$main.find("input").val();
                this.has_more_results = !1, this.loading = !0, this.status.show_progress(), DiFi.pushPost("PortalCore", "get_result_thumbs", ["browse", {
                    user_input: t || "",
                    category_path: this.search_category,
                    offset: this.query_offset,
                    mature_filter: !(deviantART.deviant && deviantART.deviant.browseadult),
                    length: this.results_per_page(),
                    order: t ? 8 : 15
                }], bind(this, this.emote_query_results)), DiFi.send()
            },
            search_emotes: function() {
                this.status.hide(), this.has_more_results = !1;
                var t = this.$main.find("input").val();
                if (t) {
                    var i = this.$main.find(".exact-matches"),
                        e = !1;
                    this.$main.find(".official-icons .icon-list li").each(function() {
                        this.title == t || this.title == ":" + t + ":" ? (i.append($(this).clone().show()).show(), e = !0) : this.title.indexOf(t) >= 0 && ($(this).show(), e = !0)
                    }), e || this.$main.find(".official-icons .empty-message").show(), this.query_offset = 0, this.query_emotes(), this.load_visible_placeholders(!0)
                }
            },
            emote_query_results: function(t, i) {
                this.loading = !1, this.status.hide();
                var e, s, a, n, r, o, h = [],
                    d = [];
                if (t && (h = i.response.content.resources || [], h.length)) for (var l = 0; h.length > l; l++) e = $(h[l][2]), s = h[l][1], RegExp("^" + this.search_category + ".*", "i").test(e.attr("category") || "") && (a = e.find("a.thumb"), n = a.children("img").clone(), n.length && (n.addClass("deviation").attr("id", s), r = 0 | n.attr("width"), o = 0 | n.attr("height"), 2500 >= r * o && d.push($("<li>", {
                    collect_rid: "1:" + s + ":emote",
                    title: a.attr("title")
                }).append(n))));
                var c = this.$main.find(".community-icons");
                this.query_offset || c.find(".icon-list").empty(), d.length && c.find(".icon-list").append(d), this.has_more_results = t && d.length && i.response.content.has_more, "root" == this.view && !this.query_offset && d.length ? (c.find(".more").show(), c.find(".section-header").show(), c.show()) : "community-icons" == this.view ? (c.show(), this.load_more_results_if_needed()) : "search" == this.view && (c.find(".section-header").show(), c.show(), this.query_offset || d.length || c.find(".empty-message").show(), this.load_more_results_if_needed())
            },
            fetch: function() {
                this.loaded_official_icons ? this.populated_official_icons() : this.loading_official_icons || (this.loading_official_icons = !0, this.status.show_progress(), WriterEmbed.getEmoticons().done(bind(this, this.loaded_emotes)))
            },
            loaded_emotes: function(t) {
                this.loading_official_icons = !1, this.loaded_official_icons = !0, this.status.hide(), this.$main.find(".official-icons .icon-list").html($.map($.grep(t, function(t) {
                    return !t.hidden
                }), $.proxy(this, "icon_to_html"))), this.populated_official_icons()
            },
            populated_official_icons: function() {
                var t = this.$main.find(".official-icons");
                "root" == this.view ? (t.find(".section-header").show(), t.find(".more").show(), t.find("li").hide().filter(":lt(30)").show(), t.show(), this.load_visible_placeholders(!0)) : "official-icons" == this.view && (t.find("li").show(), t.show(), this.load_visible_placeholders(!0)), this.results_scroll_node().trigger("scroll")
            },
            reset_controls: function() {
                this.$main.find(".types-searchbox").show(), this.$main.find(".types-searchbox .clear").hide(), this.$main.find(".types-back, .types-heading").hide(), this.$main.find(".official-icons").hide(), this.$main.find(".community-icons").hide(), this.$main.find(".community-icons .icon-list").empty(), this.$main.find(".exact-matches").empty().hide(), this.$main.find("li").hide(), this.$main.find(".section-header").hide(), this.$main.find(".more").hide(), this.$main.find(".empty-message").hide()
            },
            show_root: function() {
                "root" != this.view && (this.view = "root", this.reset_controls(), this.$main.find(".types-searchbox input").val(""), this.fetch(), this.query_offset = 0, this.query_emotes())
            },
            show_search_results: function() {
                this.view = "search", this.reset_controls(), this.$main.find(".types-searchbox .clear").show(), this.$main.find(".official-icons").show(), this.$main.find(".community-icons").show(), this.$main.find(".section-header").show(), this.search_emotes()
            },
            show_official_icons: function() {
                this.view = "official-icons", this.reset_controls(), this.$main.find(".types-searchbox input").val(""), this.$main.find(".types-heading").text("Official Emoticons").show(), this.$main.find(".types-back").show(), this.fetch()
            },
            show_community_icons: function() {
                this.view = "community-icons", this.reset_controls(), this.$main.find(".types-searchbox input").val(""), this.$main.find(".types-heading").text("Community Emoticons").show(), this.$main.find(".types-back").show(), this.query_offset = 0, this.query_emotes()
            },
            icon_to_html: function(t) {
                return '<li title="' + t.emoticon.replace(/"/g, "&quot;") + '"' + ' collect_rid="emote:' + t.id + '"' + '><img class="placeholder"' + ' src="//sh.deviantart.net/shadow/x/30/30/null.png"' + ' width="30"' + ' height="30"' + ' data-src="//s.deviantart.net/emoticons/' + t.src + '"' + ' data-width="' + t.w + '"' + ' data-height="' + t.h + '">' + "</li>"
            },
            emote_click: function(t, i) {
                t && (t.preventDefault(), i = $(t.target)), this.sidebar.click_callback(i.closest("li"))
            },
            results_per_pixel: function() {
                return 5 / 48
            },
            results_scroll_node: function() {
                return this.$main
            },
            load_more_results: function() {
                ("search" == this.view || "community-icons" == this.view) && (this.query_offset += this.results_per_page(), this.query_emotes())
            },
            load_visible_placeholders_timeout: null,
            load_visible_placeholders: function(t) {
                if (clearTimeout(this.load_visible_placeholders_timeout), !t) return this.load_visible_placeholders_timeout = setTimeout($.proxy(this, "load_visible_placeholders", !0), 200), void 0;
                for (var i, e = this.$main[0].getBoundingClientRect(), s = this.$main.find(".placeholder:visible"), a = 0; i = s[a]; a++) {
                    var n = i.getBoundingClientRect();
                    if (!(e.top > n.bottom)) {
                        if (!(e.bottom > n.top)) break;
                        $(i).replaceWith($("<img>", $(i).data()))
                    }
                }
            }
        }),
        u = a.extend({
            label: "Conversation",
            name: "conversation",
            description: "The latest items from comments on this page will appear here as the conversation grows.",
            premium_only: !0,
            render_main: function() {
                var t = $(['<div class="writer-sidebar-main-' + this.type_name() + '">', '<div class="scroll-container">', '<div class="empty-message">Media items from the conversation will appear here whenever new comments are posted.</div>', '<div class="conversation stream stash-stream" rs_ignore></div>', '<div class="writer-sidebar-status-container"></div>', "</div>", "</div>"].join("\n")).data("sidebar-type", this);
                return t
            },
            fetch: function() {
                this.$main.find(".empty-message").show(), this.$stream.empty().hide(), this.loading = !0, this.status.show_progress(), this.lines = {}, deviantART.pageData.deviationid && (this.lines[0] = {
                    type: "Original Item",
                    speaker: null,
                    speaker_icon: null,
                    age: null,
                    content: "",
                    content_count: 1,
                    failed_count: 0
                }), this.loaded_lines = 0, this.defined_lines = 0, this.defined_comment_content = 0, this.comment_substream = "";
                var t = $(":gmi(CCommentThread)");
                this.fetch_from_comments(t);
                var i = t.gmi1().gmi_args; + i.offset && DiFi.pushPost("Comments", "getThreadRange", [i.itemid, i.typeid, 0, i.count_per_page], bind(this, this.loaded_comment_page));
                for (var e in this.lines) this.defined_lines++;
                this.defined_lines && this.$main.find(".empty-message").hide(), deviantART.pageData.deviationid && (Glbl("Site.is_stash") ? DiFi.pushPost("Resources", "htmlFromRID", [1, deviantART.pageData.privateid, "thumb150", "artist:0,ts:1,title:1,stash:1"], bind(this, this.loaded_deviation)) : DiFi.pushPost("Resources", "htmlFromRID", [1, deviantART.pageData.deviationid ? deviantART.pageData.deviationid : window.da_preview_master.current_stream.resview.gmi_args.id, "thumb150", "artist:0,ts:1,title:1"], bind(this, this.loaded_deviation)));
                var s = $(":gmi(ResourcePageDisplayPane) > .journal-wrapper");
                s.length && s.find(".shadow-holder, .embedded-deviation").each(bind(this, function(t, i) {
                    if ($(i).attr("deviationid")) {
                        this.lines[0].content_count++;
                        var e = $(i).attr("deviationid").length > 10 ? ",stash:1" : "";
                        DiFi.pushPost("Resources", "htmlFromRID", [1, $(i).attr("deviationid"), "thumb150", "artist:0,title:1" + e], bind(this, this.loaded_journal_content))
                    }
                })), DiFi.send()
            },
            fetch_from_comments: function(t) {
                var i = 0;
                return t.find(":gmi(CComment)").each(bind(this, function(t, e) {
                    var s = $(e),
                        a = s.gmi1().gmi_args.commentid,
                        n = [];
                    if (s.find(".shadow-holder, a.embedded-deviation, .thumb-attachment-content").each(function() {
                        $container = $(this), $container.is(".thumb-attachment-content") && ($container = $($container.data("html"))), n.push($container.attr("deviationid"))
                    }), n.length) {
                        this.lines[a] = {
                            type: s.parent(".nest").length ? "Reply" : "Comment",
                            speaker: s.find("img.avatar").attr("title"),
                            speaker_icon: s.find("img.avatar").attr("src"),
                            age: s.find(".cc-time a").text(),
                            content: "",
                            content_count: n.length,
                            failed_count: 0
                        }, i++, this.defined_comment_content += n.length;
                        for (var r = 0; n.length > r; r++) {
                            var o = n[r];
                            DiFi.pushPost("Resources", "htmlFromRID", [1, o, "thumb150", "artist:0,title:1" + (o >= 1e12 ? ",stash:1" : "")], bind(this, function(t, i) {
                                this.loaded_comment_content(t, i, a)
                            }))
                        }
                        this.loading = !0, this.status.show_progress()
                    }
                })), i
            },
            load_more_results: function() {},
            render_lines: function() {
                if (this.defined_lines == this.loaded_lines) {
                    var t = "",
                        i = $();
                    this.$stream.show().empty(), this.comment_substream = "", this.status.hide(), this.loading = !1;
                    for (var e in this.lines) {
                        var s = this.lines[e];
                        switch (s.type) {
                            case "Comment":
                            case "Reply":
                                this.comment_substream += s.content, $(this.comment_substream).length == this.defined_comment_content && ($(this.comment_substream).each(function(e, s) {
                                    var a = $(s).attr("collect_rid");
                                    a != t && (t = a, i.push(s))
                                }), this.$stream.append('<h3 class="comments_list">From Comments</h3>'), this.$stream.append(i));
                                break;
                            case "Original Item":
                                this.$stream.prepend(s.content), this.$stream.prepend($("<h3>" + s.type + " (" + s.age + ")</h3>").prepend($("<a>", {
                                    href: "http://" + s.speaker + ".deviantart.com/"
                                }).append($("<img>", {
                                    src: s.speaker_icon,
                                    width: 25,
                                    height: 25
                                }))))
                        }
                    }
                    this.fix_stream_size()
                }
            },
            loaded_deviation: function(t, i) {
                if (this.loading = !1, this.status.hide(), t) {
                    var e = $(i.response.content),
                        s = e.find(".tt-w > small").text().replace(/^\s+|\s+$/g, "");
                    e.find(".tt-w > small").hide(), this.lines[0].speaker = e.attr("username"), this.lines[0].speaker_icon = e.attr("usericon"), this.lines[0].age = s, this.lines[0].content = e[0].outerHTML + this.lines[0].content
                } else this.lines[0].failed_count++;
                $(this.lines[0].content).length + this.lines[0].failed_count == this.lines[0].content_count && this.loaded_lines++, this.render_lines()
            },
            loaded_journal_content: function(t, i) {
                this.loading = !1, this.status.hide(), t ? this.lines[0].content += i.response.content : this.lines[0].failed_count++, $(this.lines[0].content).length + this.lines[0].failed_count == this.lines[0].content_count && this.loaded_lines++, this.render_lines()
            },
            loaded_comment_content: function(t, i, e) {
                this.loading = !1, this.status.hide(), t ? this.lines[e].content += i.response.content : this.lines[e].failed_count++, $(this.lines[e].content).length + this.lines[e].failed_count == this.lines[e].content_count && this.loaded_lines++, this.render_lines()
            },
            loaded_comment_page: function(t, i) {
                if (t) {
                    var e, s, a, n;
                    for (var r in i.response.content.thread) s = r, e = i.response.content.thread[s], n = $("<div/>").html(e.body), n.find(".thumb-attachment-content").each(function() {
                        $(this).replaceWith($(this).data("html"))
                    }), a = n.find(".shadow-holder, a.embedded-deviation"), a.length && (this.lines[s] = {
                        type: e.level ? "Reply" : "Comment",
                        speaker: e.username,
                        speaker_icon: e.usericonurl,
                        content: "",
                        content_count: a.length,
                        failed_count: 0
                    }, this.defined_lines++, this.defined_comment_content += a.length, a.each(bind(this, function(t, i) {
                        var e = s,
                            a = $(i).attr("deviationid");
                        if (a) {
                            var n = a.length > 10 ? ",stash:1" : "";
                            DiFi.pushPost("Resources", "htmlFromRID", [1, a, "thumb150", "artist:0,title:1" + n], bind(this, function(t, i) {
                                this.loaded_comment_content(t, i, e)
                            })), this.loading = !0, this.status.show_progress()
                        }
                    })));
                    DiFi.send()
                }
            }
        }),
        _ = a.extend({
            label: "deviantART",
            name: "art",
            loading: !1,
            description: "Search images from throughout deviantART, including your friends!",
            premium_only: !0,
            substreams: {},
            substream_loaded: {
                gallery: !1,
                favby: !1
            },
            friends: null,
            friends_pages_loaded: 0,
            has_more_friends: !0,
            loading_friends: !1,
            friends_spinner: null,
            $friends_list: null,
            constructor: function(t) {
                this.$friends_list = $('<div class="friends-list blockmenu"><div class="menu-items friends-menu"><div class="progress-indicator"><span class="writer-friends-list-spinner"></span>Loading...</div></div></div>'), this.base(t)
            },
            display: function() {
                this.base(!0), this.loading || (this.sidebar.modes.gallery && !this.substream_loaded.gallery && (this.sidebar.modes.gallery.fetch("gallery:" + window.deviantART.deviant.username, "", !0, bind(this, this.loaded_substream)), this.loading = !0), this.sidebar.modes.faves && !this.substream_loaded.favby && (this.sidebar.modes.faves.fetch("favby:" + window.deviantART.deviant.username, "", !0, bind(this, this.loaded_substream)), this.loading = !0), this.sidebar.modes.search && !this.friends_pages_loaded && this.has_more_friends && this.load_more_friends(), this.loading && this.status.show_progress(), DiFi.send())
            },
            load_more_friends: function() {
                this.has_more_friends && !this.loading_friends && (this.loading_friends = !0, DiFi.pushPost("Friends", "getFriendsMenu", [0, this.friends_pages_loaded], bind(this, this.loaded_friends)), DiFi.send(), this.$friends_list.find(".progress-indicator").show(), this.friends_spinner && this.friends_spinner.stop(), this.friends_spinner = new Spinner(SpinnerPresets.green), this.friends_spinner.spin(this.$friends_list.find(".writer-friends-list-spinner")[0]))
            },
            loaded_friends: function(t, i) {
                var e = this.$friends_list.find(".progress-indicator");
                if (this.loading_friends = !1, e.hide(), this.friends_spinner.stop(), t) {
                    var s = i.response.content.friends;
                    this.has_more_friends = i.response.content.has_more, this.friends_pages_loaded += 1;
                    for (var a = 0; s.length > a; a++) $("<a>", {
                        rel: s[a].username
                    }).text(s[a].symbol + s[a].username).insertBefore(e)
                }
            },
            loaded_substream: function(t, i) {
                t || (t = "gallery:" + window.deviantART.deviant.username);
                var e = t.split(":")[0];
                if (this.substream_loaded[e] = !0, this.substreams[e] = i, !(this.sidebar.modes.gallery && !this.substreams.gallery || this.sidebar.modes.faves && !this.substreams.favby)) {
                    if (this.sidebar.modes.gallery && this.substreams.gallery.find && this.substreams.gallery.find("img").length) {
                        var s = this.generate_stackthumb($(this.substreams.gallery.find("a.thumb:first")), "Gallery");
                        s.find("a").click(bind(this.sidebar.modes.gallery, this.sidebar.modes.gallery.item_click)), this.$main.find(".stream").append(s)
                    }
                    if (this.sidebar.modes.faves && this.substreams.favby.find && this.substreams.favby.find("img").length) {
                        var a = this.generate_stackthumb($(this.substreams.favby.find("a.thumb:first")), "Favourites");
                        a.find("a").click(bind(this.sidebar.modes.faves, this.sidebar.modes.faves.item_click)), this.$main.find(".stream").append(a)
                    }
                    this.status.hide(), this.fix_stream_size()
                }
            },
            render_main: function() {
                var t = $.inArray("search", this.sidebar.options.sections) > -1,
                    i = ['<div class="writer-sidebar-main-' + this.type_name() + '">'];
                return t && i.push('<div class="writer-sidebar-input-container"><input type="text" placeholder="Search deviantART"/></div>', '<a id="open-friends-menu" href="#"></a>'), i.push('<div style="clear: both">', '<div class="stream stash-stream"></div>', '<div class="writer-sidebar-status-container"></div>', "</div>", "</div>"), $(i.join("\n")).data("sidebar-type", this)
            },
            stream_click_hook: function() {
                return null
            },
            bind: function() {
                var t = this;
                this.base(), this.$main.find("input").keypress(bind(this, function(t) {
                    13 == t.which && (t.preventDefault(), this.sidebar.modes.search.query = $(t.target).val() + " boost:popular", this.sidebar.modes.search.$stream.empty(), this.sidebar.modes.search.offset = 0, this.sidebar.modes.search.display())
                })), this.$main.find("#open-friends-menu").click(function(e) {
                    e.preventDefault();
                    var s = new Popup2("writerFriendsMenu", "body", {
                        classes: "notes-menu",
                        content: this.$friends_list,
                        destroy: !0,
                        created: function() {
                            t.$friends_list = this.$node.find(".friends-list"), t.$friends_list.find(".friends-menu").off("scroll").on("scroll", i)
                        },
                        events: [{
                            selector: "a",
                            event: "click",
                            callback: function(t) {
                                t.preventDefault(), Popup2.hideAll();
                                var i = t.target.getAttribute("rel");
                                i.length && (this.sidebar.modes.search.query = "by:" + i, this.sidebar.modes.search.$stream.empty(), this.sidebar.modes.search.offset = 0, this.sidebar.modes.search.display(), this.$main.find("input").val(i))
                            }.bindTo(this)
                        }]
                    });
                    s.show(s.position($(e.target), {
                        align: "right"
                    }))
                }.bindTo(this));
                var i = function() {
                    this.scrollHeight && 50 > this.scrollHeight - this.scrollTop - this.clientHeight && t.load_more_friends()
                }
            },
            load_more_results: function() {}
        }),
        p = {
            stash: n,
            gallery: o,
            faves: h,
            search: l,
            art: _,
            emotes: m,
            portfolios: d,
            bing: c,
            conversation: u
        };
    window.DWait && DWait.run("jms/lib/sidebar.js")
});
if (window.DWait) {
    DWait.count()
}

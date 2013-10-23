/*
 *  (c) 2000-2013 deviantART, Inc. All rights reserved.
 */ (function() {
    window.BinaryFile = function(e, t, n) {
        var r = e,
            i = t || 0,
            o = 0;
        if (this.getRawData = function() {
            return r
        }, "string" == typeof e) o = n || r.length, this.getByteAt = function(e) {
            return 255 & r.charCodeAt(e + i)
        };
        else if ("unknown" == typeof e) o = n || IEBinary_getLength(r), this.getByteAt = function(e) {
            return IEBinary_getByteAt(r, e + i)
        };
        else if ("object" == typeof e && e instanceof ArrayBuffer) {
            var a = new Uint8Array(e);
            o = a.length, this.getByteAt = function(e) {
                return a[e + i]
            }
        }
        this.getLength = function() {
            return o
        }, this.getSByteAt = function(e) {
            var t = this.getByteAt(e);
            return t > 127 ? t - 256 : t
        }, this.getShortAt = function(e, t) {
            var n = t ? (this.getByteAt(e) << 8) + this.getByteAt(e + 1) : (this.getByteAt(e + 1) << 8) + this.getByteAt(e);
            return 0 > n && (n += 65536), n
        }, this.getSShortAt = function(e, t) {
            var n = this.getShortAt(e, t);
            return n > 32767 ? n - 65536 : n
        }, this.getLongAt = function(e, t) {
            var n = this.getByteAt(e),
                r = this.getByteAt(e + 1),
                i = this.getByteAt(e + 2),
                o = this.getByteAt(e + 3),
                a = t ? (((n << 8) + r << 8) + i << 8) + o : (((o << 8) + i << 8) + r << 8) + n;
            return 0 > a && (a += 4294967296), a
        }, this.getSLongAt = function(e, t) {
            var n = this.getLongAt(e, t);
            return n > 2147483647 ? n - 4294967296 : n
        }, this.getStringAt = function(e, t) {
            for (var n = [], r = e, i = 0; e + t > r; r++, i++) n[i] = String.fromCharCode(this.getByteAt(r));
            return n.join("")
        }, this.getCharAt = function(e) {
            return String.fromCharCode(this.getByteAt(e))
        }, this.toBase64 = function() {
            return window.btoa(r)
        }, this.fromBase64 = function(e) {
            r = window.atob(e)
        }
    };
    var e = function() {
        function e() {
            var e = null;
            return window.XMLHttpRequest ? e = new XMLHttpRequest : window.ActiveXObject && (e = new ActiveXObject("Microsoft.XMLHTTP")), e
        }
        function t(t, n, r) {
            var i = e();
            i ? (n && (i.onload !== void 0 ? i.onload = function() {
                "200" == i.status ? n(this) : r && r(), i = null
            } : i.onreadystatechange = function() {
                4 == i.readyState && ("200" == i.status ? n(this) : r && r(), i = null)
            }), i.open("HEAD", t, !0), i.send(null)) : r && r()
        }
        function n(t, n, r, i, o, a) {
            var s = e();
            if (s) {
                var u = 0;
                i && !o && (u = i[0]);
                var g = 0;
                i && (g = i[1] - i[0] + 1), n && (s.onload !== void 0 ? s.onload = function() {
                    "200" == s.status || "206" == s.status || "0" == s.status ? (this.binaryResponse = new BinaryFile(this.responseText, u, g), this.fileSize = a || this.getResponseHeader("Content-Length"), n(this)) : r && r(), s = null
                } : s.onreadystatechange = function() {
                    4 == s.readyState && ("200" == s.status || "206" == s.status || "0" == s.status ? (this.binaryResponse = new BinaryFile(s.responseBody, u, g), this.fileSize = a || this.getResponseHeader("Content-Length"), n(this)) : r && r(), s = null)
                }), s.open("GET", t, !0), s.overrideMimeType && s.overrideMimeType("text/plain; charset=x-user-defined"), i && o && s.setRequestHeader("Range", "bytes=" + i[0] + "-" + i[1]), s.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 1970 00:00:00 GMT"), s.send(null)
            } else r && r()
        }
        return function(e, r, i, o) {
            o ? t(e, function(t) {
                var a, s, u = parseInt(t.getResponseHeader("Content-Length"), 10),
                    g = t.getResponseHeader("Accept-Ranges");
                a = o[0], 0 > o[0] && (a += u), s = a + o[1] - 1, n(e, r, i, [a, s], "bytes" == g, u)
            }) : n(e, r, i)
        }
    }();
    document.write("<script type='text/vbscript'>\r\nFunction IEBinary_getByteAt(strBinary, iOffset)\r\n IEBinary_getByteAt = AscB(MidB(strBinary,iOffset+1,1))\r\nEnd Function\r\nFunction IEBinary_getLength(strBinary)\r\n IEBinary_getLength = LenB(strBinary)\r\nEnd Function\r\n</script>\r\n");
    var t = window.EXIF = {}, n = window.bDebug = !1;
    t.Tags = {
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubsecTime",
        37521: "SubsecTimeOriginal",
        37522: "SubsecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "ISOSpeedRatings",
        34856: "OECF",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRation",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        40965: "InteroperabilityIFDPointer",
        42016: "ImageUniqueID"
    }, t.TiffTags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright"
    }, t.GPSTags = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential"
    }, t.StringValues = {
        ExposureProgram: {
            0: "Not defined",
            1: "Manual",
            2: "Normal program",
            3: "Aperture priority",
            4: "Shutter priority",
            5: "Creative program",
            6: "Action program",
            7: "Portrait mode",
            8: "Landscape mode"
        },
        MeteringMode: {
            0: "Unknown",
            1: "Average",
            2: "CenterWeightedAverage",
            3: "Spot",
            4: "MultiSpot",
            5: "Pattern",
            6: "Partial",
            255: "Other"
        },
        LightSource: {
            0: "Unknown",
            1: "Daylight",
            2: "Fluorescent",
            3: "Tungsten (incandescent light)",
            4: "Flash",
            9: "Fine weather",
            10: "Cloudy weather",
            11: "Shade",
            12: "Daylight fluorescent (D 5700 - 7100K)",
            13: "Day white fluorescent (N 4600 - 5400K)",
            14: "Cool white fluorescent (W 3900 - 4500K)",
            15: "White fluorescent (WW 3200 - 3700K)",
            17: "Standard light A",
            18: "Standard light B",
            19: "Standard light C",
            20: "D55",
            21: "D65",
            22: "D75",
            23: "D50",
            24: "ISO studio tungsten",
            255: "Other"
        },
        Flash: {
            0: "Flash did not fire",
            1: "Flash fired",
            5: "Strobe return light not detected",
            7: "Strobe return light detected",
            9: "Flash fired, compulsory flash mode",
            13: "Flash fired, compulsory flash mode, return light not detected",
            15: "Flash fired, compulsory flash mode, return light detected",
            16: "Flash did not fire, compulsory flash mode",
            24: "Flash did not fire, auto mode",
            25: "Flash fired, auto mode",
            29: "Flash fired, auto mode, return light not detected",
            31: "Flash fired, auto mode, return light detected",
            32: "No flash function",
            65: "Flash fired, red-eye reduction mode",
            69: "Flash fired, red-eye reduction mode, return light not detected",
            71: "Flash fired, red-eye reduction mode, return light detected",
            73: "Flash fired, compulsory flash mode, red-eye reduction mode",
            77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
            79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
            89: "Flash fired, auto mode, red-eye reduction mode",
            93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
            95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
            1: "Not defined",
            2: "One-chip color area sensor",
            3: "Two-chip color area sensor",
            4: "Three-chip color area sensor",
            5: "Color sequential area sensor",
            7: "Trilinear sensor",
            8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
            0: "Standard",
            1: "Landscape",
            2: "Portrait",
            3: "Night scene"
        },
        SceneType: {
            1: "Directly photographed"
        },
        CustomRendered: {
            0: "Normal process",
            1: "Custom process"
        },
        WhiteBalance: {
            0: "Auto white balance",
            1: "Manual white balance"
        },
        GainControl: {
            0: "None",
            1: "Low gain up",
            2: "High gain up",
            3: "Low gain down",
            4: "High gain down"
        },
        Contrast: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        Saturation: {
            0: "Normal",
            1: "Low saturation",
            2: "High saturation"
        },
        Sharpness: {
            0: "Normal",
            1: "Soft",
            2: "Hard"
        },
        SubjectDistanceRange: {
            0: "Unknown",
            1: "Macro",
            2: "Close view",
            3: "Distant view"
        },
        FileSource: {
            3: "DSC"
        },
        Components: {
            0: "",
            1: "Y",
            2: "Cb",
            3: "Cr",
            4: "R",
            5: "G",
            6: "B"
        }
    }, window.addEvent = function(e, t, n) {
        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }, window.imageHasData = function(e) {
        return !!e.exifdata
    }, window.getImageData = function(t, n) {
        e(t.src, function(e) {
            var r = findEXIFinJPEG(e.binaryResponse);
            t.exifdata = r || {}, n && n()
        })
    }, window.findEXIFinJPEG = function(e) {
        if (255 != e.getByteAt(0) || 216 != e.getByteAt(1)) return !1;
        for (var t = 2, r = e.getLength(); r > t;) {
            if (255 != e.getByteAt(t)) return n && console.log("Not a valid marker at offset " + t + ", found: " + e.getByteAt(t)), !1;
            var i = e.getByteAt(t + 1);
            if (22400 == i) return n && console.log("Found 0xFFE1 marker"), readEXIFData(e, t + 4, e.getShortAt(t + 2, !0) - 2);
            if (225 == i) return n && console.log("Found 0xFFE1 marker"), readEXIFData(e, t + 4, e.getShortAt(t + 2, !0) - 2);
            t += 2 + e.getShortAt(t + 2, !0)
        }
    }, window.readTags = function(e, t, r, i, o) {
        for (var a = e.getShortAt(r, o), s = {}, u = 0; a > u; u++) {
            var g = r + 12 * u + 2,
                d = i[e.getShortAt(g, o)];
            !d && n && console.log("Unknown tag: " + e.getShortAt(g, o)), s[d] = readTagValue(e, g, t, r, o)
        }
        return s
    }, window.readTagValue = function(e, t, n, r, i) {
        var o = e.getShortAt(t + 2, i),
            a = e.getLongAt(t + 4, i),
            s = e.getLongAt(t + 8, i) + n;
        switch (o) {
            case 1:
            case 7:
                if (1 == a) return e.getByteAt(t + 8, i);
                for (var u = a > 4 ? s : t + 8, g = [], d = 0; a > d; d++) g[d] = e.getByteAt(u + d);
                return g;
            case 2:
                var c = a > 4 ? s : t + 8;
                return e.getStringAt(c, a - 1);
            case 3:
                if (1 == a) return e.getShortAt(t + 8, i);
                for (var u = a > 2 ? s : t + 8, g = [], d = 0; a > d; d++) g[d] = e.getShortAt(u + 2 * d, i);
                return g;
            case 4:
                if (1 == a) return e.getLongAt(t + 8, i);
                for (var g = [], d = 0; a > d; d++) g[d] = e.getLongAt(s + 4 * d, i);
                return g;
            case 5:
                if (1 == a) return e.getLongAt(s, i) / e.getLongAt(s + 4, i);
                for (var g = [], d = 0; a > d; d++) g[d] = e.getLongAt(s + 8 * d, i) / e.getLongAt(s + 4 + 8 * d, i);
                return g;
            case 9:
                if (1 == a) return e.getSLongAt(t + 8, i);
                for (var g = [], d = 0; a > d; d++) g[d] = e.getSLongAt(s + 4 * d, i);
                return g;
            case 10:
                if (1 == a) return e.getSLongAt(s, i) / e.getSLongAt(s + 4, i);
                for (var g = [], d = 0; a > d; d++) g[d] = e.getSLongAt(s + 8 * d, i) / e.getSLongAt(s + 4 + 8 * d, i);
                return g
        }
    }, window.readEXIFData = function(e, r) {
        if ("Exif" != e.getStringAt(r, 4)) return n && console.log("Not valid EXIF data! " + e.getStringAt(r, 4)), !1;
        var i, o = r + 6;
        if (18761 == e.getShortAt(o)) i = !1;
        else {
            if (19789 != e.getShortAt(o)) return n && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"), !1;
            i = !0
        }
        if (42 != e.getShortAt(o + 2, i)) return n && console.log("Not valid TIFF data! (no 0x002A)"), !1;
        if (8 != e.getLongAt(o + 4, i)) return n && console.log("Not valid TIFF data! (First offset not 8)", e.getShortAt(o + 4, i)), !1;
        var a = readTags(e, o, o + 8, t.TiffTags, i);
        if (a.ExifIFDPointer) {
            var s = readTags(e, o, o + a.ExifIFDPointer, t.Tags, i);
            for (var u in s) {
                switch (u) {
                    case "LightSource":
                    case "Flash":
                    case "MeteringMode":
                    case "ExposureProgram":
                    case "SensingMethod":
                    case "SceneCaptureType":
                    case "SceneType":
                    case "CustomRendered":
                    case "WhiteBalance":
                    case "GainControl":
                    case "Contrast":
                    case "Saturation":
                    case "Sharpness":
                    case "SubjectDistanceRange":
                    case "FileSource":
                        s[u] = t.StringValues[u][s[u]];
                        break;
                    case "ExifVersion":
                    case "FlashpixVersion":
                        s[u] = String.fromCharCode(s[u][0], s[u][1], s[u][2], s[u][3]);
                        break;
                    case "ComponentsConfiguration":
                        s[u] = t.StringValues.Components[s[u][0]] + t.StringValues.Components[s[u][1]] + t.StringValues.Components[s[u][2]] + t.StringValues.Components[s[u][3]]
                }
                a[u] = s[u]
            }
        }
        if (a.GPSInfoIFDPointer) {
            var g = readTags(e, o, o + a.GPSInfoIFDPointer, t.GPSTags, i);
            for (var u in g) {
                switch (u) {
                    case "GPSVersionID":
                        g[u] = g[u][0] + "." + g[u][1] + "." + g[u][2] + "." + g[u][3]
                }
                a[u] = g[u]
            }
        }
        return a
    }, t.getData = function(e, t) {
        return e.complete ? (imageHasData(e) ? t && t() : getImageData(e, t), !0) : !1
    }, t.getTag = function(e, t) {
        return imageHasData(e) ? e.exifdata[t] : void 0
    }, t.getAllTags = function(e) {
        if (!imageHasData(e)) return {};
        var t = e.exifdata,
            n = {};
        for (var r in t) t.hasOwnProperty(r) && (n[r] = t[r]);
        return n
    }, t.pretty = function(e) {
        if (!imageHasData(e)) return "";
        var t = e.exifdata,
            n = "";
        for (var r in t) t.hasOwnProperty(r) && (n += "object" == typeof t[r] ? r + " : [" + t[r].length + " values]\r\n" : r + " : " + t[r] + "\r\n");
        return n
    }, t.readFromBinaryFile = function(e) {
        return findEXIFinJPEG(e)
    }, jQuery.fn.exifLoad = function(e) {
        return this.each(function() {
            t.getData(this, e)
        })
    }, jQuery.fn.exif = function(e) {
        var n = [];
        return this.each(function() {
            n.push(t.getTag(this, e))
        }), n
    }, jQuery.fn.exifAll = function() {
        var e = [];
        return this.each(function() {
            e.push(t.getAllTags(this))
        }), e
    }, jQuery.fn.exifPretty = function() {
        var e = [];
        return this.each(function() {
            e.push(t.pretty(this))
        }), e
    }
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.exif.js");
(function(i) {
    var t = {
        initialize: !0,
        add_height: 0
    };
    i.fn.autogrow = function(a) {
        return "destroy" === a ? this.each(function() {
            var t = i.data(this, "autogrow.shadow");
            t && (t.remove(), i.data(this, "autogrow.shadow", null))
        }) : (a = i.extend({}, t, a || {}), this.filter("textarea").each(function() {
            var t = i(this);
            if (!t.data("autogrow.shadow")) {
                var e = a.min_height || t.height(),
                    o = i('<div class="autogrow-shadow"/>').css({
                        position: "absolute",
                        top: -1e4,
                        left: -1e4,
                        width: t.width(),
                        minHeight: e,
                        fontSize: t.css("fontSize"),
                        fontFamily: t.css("fontFamily"),
                        fontWeight: t.css("fontWeight"),
                        lineHeight: t.css("lineHeight"),
                        letterSpacing: t.css("letterSpacing"),
                        padding: t.css("padding") || "2px",
                        paddingLeft: t.css("paddingLeft") || "2px",
                        paddingRight: t.css("paddingRight") || "2px",
                        paddingTop: t.css("paddingTop") || "2px",
                        paddingBottom: t.css("paddingBottom") || "2px",
                        margin: t.css("margin"),
                        boxSizing: t.css("boxSizing"),
                        MozBoxSizing: t.css("MozBoxSizing"),
                        WebkitBoxSizing: t.css("WebkitBoxSizing"),
                        resize: "none"
                    }).appendTo("body"),
                    n = function() {
                        var i = t.val().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n/, "<br><br>").replace(/\n/g, "<br>");
                        o.html(i).width(t.width()), t.height(Math.max(o.outerHeight(), e) + a.add_height), t.scrollTop(t[0].scrollHeight - t.height())
                    }, s = function() {
                        setTimeout(n, 100)
                    };
                t.on("change keyup keydown", n).on("paste cut", s).data("autogrow.shadow", o), a.initialize && n.call(this)
            }
        }))
    }
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.autogrow.js");
(function(n) {
    n.fn.$each = function(t) {
        var i = n([1]);
        return this.each(function() {
            return i[0] = this, t.apply(i, arguments)
        })
    }, n.fn.$filter = function(t, i) {
        var r = n([1]);
        return this.filter(function() {
            return r[0] = this, t.apply(r, arguments)
        }, i)
    }, n.fn.$map = function(t) {
        var i = n([1]);
        return this.map(function() {
            return i[0] = this, t.apply(i, arguments)
        })
    }, n.fn.some = n.fn.is, n.fn.$some = n.fn.$is = function() {
        return this.$filter.apply(this, arguments).length > 0
    }, n.fn.every = function() {
        return this.length === this.filter.apply(this, arguments).length
    }, n.fn.$every = function() {
        return this.length === this.$filter.apply(this, arguments).length
    }, n.fn.find_first_closest_in_selectors = function(n) {
        if (n.length) {
            var t = this.closest(n.join(",")).first();
            if (t) {
                var i = null;
                return n.some(function(n) {
                    return t.is(n) ? (i = n, !0) : void 0
                }), i
            }
        }
    }
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.quicker.js");
(function(e) {
    var t = {
        type: "multiline",
        before_callback: void 0,
        after_callback: void 0,
        save_callback: void 0,
        default_value_to_set_if_edited_elt_is_empty: "",
        unsaved_text_to_show_if_empty_value_has_been_submitted: void 0,
        max_length: void 0,
        spellcheck: !1
    }, a = {
        "focus.contenteditable": function(t) {
            var a = e(this);
            a.removeClass("read").addClass("write");
            var i = a.data("before_callback");
            if (e.isFunction(i)) {
                var n = i.bindTo(this).call();
                if (0 == n) return t.stopPropagation(), t.preventDefault(), a.trigger("cancel.contenteditable"), !1
            }
            var l = a.data("unsaved_text_to_show_if_empty_value_has_been_submitted"),
                s = a.data("default_value_to_set_if_edited_elt_is_empty");
            void 0 !== l && void 0 !== s && a.text() == l && a.html(s);
            var _ = document;
            if (_.body.createTextRange) {
                var o = document.body.createTextRange();
                o.moveToElementText(this), o.select()
            } else if (window.getSelection) {
                var r = window.getSelection(),
                    o = document.createRange();
                o.selectNodeContents(this), r.removeAllRanges(), r.addRange(o)
            }
            t.stopPropagation()
        },
        "keydown.contenteditable": function(t) {
            t.stopPropagation();
            var a = e(this);
            if (13 == t.keyCode) {
                var i = a.data("edition_type");
                if (!i) return;
                switch (i) {
                    case "singleline":
                        a.trigger("blur"), t.preventDefault();
                        break;
                    case "multiline":
                        if (window.getSelection) {
                            var n = window.getSelection(),
                                l = n.getRangeAt(0),
                                s = document.createElement("br");
                            return l.deleteContents(), l.insertNode(s), l.setStartAfter(s), l.setEndAfter(s), l.collapse(!1), n.removeAllRanges(), n.addRange(l), !1
                        }
                        t.preventDefault(), document.selection.createRange().pasteHTML("<br>")
                }
            } else if (27 == t.keyCode) t.preventDefault(), a.trigger("cancel.contenteditable");
            else if (!(-1 != e.inArray(t.keyCode, [8, 46]) || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey)) {
                var _ = a.data("max_length");
                _ && a.text().length >= _ && t.preventDefault()
            }
        },
        "keyup.contenteditable": function(t) {
            13 != t.keyCode || "multiline" != e(this).data("edition_type") || this.lastChild && "br" == this.lastChild.nodeName.toLowerCase() || this.appendChild(document.createElement("br")), t.stopPropagation()
        },
        "paste.contenteditable": function() {
            var t = e(this),
                a = t.data("max_length");
            if (a) {
                var i = e(window).scrollTop();
                setTimeout(function() {
                    var n = t.text();
                    n.length > a && (t.text(n.substr(0, a)), e(window).scrollTop(i))
                }, 10)
            }
        },
        "cancel.contenteditable": function() {
            e(this).trigger("reset.contenteditable", {
                reset_value: e(this).data("_initial_value")
            }).trigger("blur")
        },
        "blur.contenteditable": function(t) {
            e(this).data("_saving") || e(this).trigger("save.contenteditable"), t.stopPropagation()
        },
        "save.contenteditable": function() {
            e(this).data("_saving", !0);
            var t = e(this),
                a = t.data("save_callback"),
                i = t.data("unsaved_text_to_show_if_empty_value_has_been_submitted");
            t.clone(), t.html(function() {
                return t.html().replace(/<br>/g, "\n")
            });
            var n = t.text();
            !t.html().length && i && t.html(i), e.isFunction(a) && n !== t.data("_initial_value") && (a(n, t.data("_initial_value")), e(this).data("_initial_value", n));
            var l = t.data("after_callback");
            e.isFunction(l) && l.bindTo(this).call(), t.removeClass("write").addClass("read"), e(this).data("_saving", !1)
        },
        "reset.contenteditable": function(t, a) {
            var i = e(this),
                n = a.reset_value;
            i.data("_previous_saved_value", n), i.data("_initial_value", n), i.html(n)
        },
        "finalize.contenteditable": function() {
            e(this).trigger("reset.contenteditable", {
                reset_value: e(this).html()
            }), e(this).attr("contenteditable", !0)
        },
        "revert.contenteditable": function() {
            e(this).trigger("reset.contenteditable", {
                reset_value: e(this).data("_previous_saved_value")
            }).trigger("blur")
        }
    };
    e.fn.contenteditable = function(i) {
        var n = e.extend({}, t, i),
            l = e.map(a, function(e, t) {
                return t
            }).join(" ");
        return this.each(function() {
            var t = e(this),
                i = t.html(),
                s = i !== n.unsaved_text_to_show_if_empty_value_has_been_submitted ? i : "";
            t.addClass("read").data({
                default_value_to_set_if_edited_elt_is_empty: n.default_value_to_set_if_edited_elt_is_empty,
                unsaved_text_to_show_if_empty_value_has_been_submitted: n.unsaved_text_to_show_if_empty_value_has_been_submitted,
                max_length: n.max_length,
                edition_type: n.type,
                save_callback: n.save_callback,
                before_callback: n.before_callback,
                after_callback: n.after_callback,
                _previous_saved_value: s,
                _initial_value: s,
                _saving: !1
            }).off(l).on(a).css({
                "-webkit-user-select": "auto",
                "moz-user-select": "auto",
                "user-select": "auto"
            }).attr("contenteditable", !0), e("body").attr("spellcheck", !1), n.spellcheck && t.attr("spellcheck", !0), !i.length && n.unsaved_text_to_show_if_empty_value_has_been_submitted && t.html(n.unsaved_text_to_show_if_empty_value_has_been_submitted)
        })
    }
})(jQuery), window.DWait && DWait.run("jms/lib/jquery/plugins/jquery.contenteditable.js");
DWait.ready(["jms/lib/jquery/jquery.current.js", "jms/lib/Base.js", "jms/lib/gmi.js", "jms/lib/json2.js", "jms/pages/stash/stash.stream.js", "jms/lib/pubsub.js", "jms/lib/station.js", "jms/lib/glbl.js", "jms/lib/site.js"], function() {
    (function() {
        var s = 0,
            t = Glbl("Location.path").match(/offset=(\d+)/);
        t && 2 == t.length && (s = parseInt(t[1], 10)), Glbl.dflt({
            "deviantART.user_agreed_to_submission_policy": !1,
            "Stash.browselimit": 120,
            "Stash.current_offset": s,
            "Stash.mode": "rich",
            "Stash.filter": "",
            "Stash.current_folderid": 0
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.js")
});
DWait.ready(["jms/lib/gstream/folders/editable_resource_stream.js", "jms/pages/superbrowse/types/stash_preview_stream.js", "jms/lib/browser.js", "jms/lib/pubsub.js", "jms/pages/stash/stash.stream.selection.js"], function() {
    (function(e) {
        window.StashStream = EditableResourceStream.extend({
            progress: 0,
            total: 0,
            preview_override_selection_type: StashPreviewStreamSelection,
            override_selection_type: StashStreamSelection,
            _upload_queue_length: 0,
            handlers: {
                window_select_batch: function(t, s) {
                    !this.active || Glbl("Minibrowse.opened") || Glbl("StashStream.navigation_keyboard_disabled") || (s && (s.stopPropagation(), s.preventDefault()), "StashToolbar.select_none" == t ? this.selector.deselectAll() : "StashKeyboard.select_all" == t ? this.selector.selectAll() : "StashToolbar.select_stacks" == t ? this.selector.select(this.selector.get_selectable().filter(".stash-stack")) : "StashToolbar.select_inverse" == t && this.selector.invert_selection(), e("div:hover").trigger("mouseleave").trigger("mouseenter"))
                },
                window_arrows: function(t, s) {
                    if (this.active) {
                        if (Glbl("Minibrowse.opened")) return this.handlers.minibrowse_arrows.call(this, t, s), void 0;
                        if (!Glbl("StashStream.navigation_keyboard_disabled")) {
                            var i, a, r, n = 0;
                            switch (t) {
                                case "StashKeyboard.left":
                                case "StashKeyboard.select_left":
                                case "StashKeyboard.select_left_cumulative":
                                    i = this.selector.setRelativeSelection(-1, !0, a = 0 == t.indexOf("StashKeyboard.select_left"), this.shift_selection, r = "StashKeyboard.select_left_cumulative" == t), n = 1;
                                    break;
                                case "StashKeyboard.right":
                                case "StashKeyboard.select_right":
                                case "StashKeyboard.select_right_cumulative":
                                    i = this.selector.setRelativeSelection(1, !0, a = 0 == t.indexOf("StashKeyboard.select_right"), this.shift_selection, r = "StashKeyboard.select_right_cumulative" == t), n = -1;
                                    break;
                                case "StashKeyboard.up":
                                case "StashKeyboard.select_up":
                                case "StashKeyboard.select_up_cumulative":
                                    i = this.selector.setVerticallyRelativeSelection(-1, !0, a = 0 == t.indexOf("StashKeyboard.select_up"), this.shift_selection, r = "StashKeyboard.select_up_cumulative" == t), n = 1;
                                    break;
                                case "StashKeyboard.down":
                                case "StashKeyboard.select_down":
                                case "StashKeyboard.select_down_cumulative":
                                    i = this.selector.setVerticallyRelativeSelection(1, !0, a = 0 == t.indexOf("StashKeyboard.select_down"), this.shift_selection, r = "StashKeyboard.select_down_cumulative" == t), n = -1
                            }
                            if (a && jQuery.isEmptyObject(this.shift_selection) && (this.shift_selection = i), s.stopPropagation(), s.preventDefault(), n) {
                                var h = this.selector.getSelection();
                                switch (n) {
                                    case -1:
                                        var l = 0;
                                        for (var o in h) {
                                            var c = e(h[o]),
                                                b = c.offset().top + c.height();
                                            b > l && (l = b)
                                        }
                                        return PubSub.publish("StashPageScroll.bottom_point_in_sight", l), void 0;
                                    case 1:
                                        var d = e(document).height();
                                        for (var o in h) {
                                            var u = e(h[o]).offset().top;
                                            d > u && (d = u)
                                        }
                                        return PubSub.publish("StashPageScroll.top_point_in_sight", d), void 0
                                }
                            }
                        }
                    }
                },
                minibrowse_arrows: function(e, t) {
                    if (!Glbl("StashStream.minibrowse_keyboard_disabled")) {
                        var s = this.handlers.get_previous_and_next_item_ids.call(this, Glbl("Minibrowse.itemid")),
                            i = s.previous_itemid,
                            a = s.next_itemid,
                            r = "Stash.item_open";
                        if ("StashKeyboard.left" == e && i) Glbl("Minibrowse.navigating_by_arrows", !0), PubSub.publish(r, i);
                        else {
                            if ("StashKeyboard.right" != e || !a) return;
                            Glbl("Minibrowse.navigating_by_arrows", !0), PubSub.publish(r, a)
                        }
                        t.stopPropagation(), t.preventDefault()
                    }
                },
                get_previous_and_next_item_ids: function(t) {
                    var s, i, a, r = e(this.gmi_node),
                        n = GMI.query(r[0], "StashThumb", {
                            match: {
                                type: "flat"
                            }
                        }),
                        h = !1,
                        l = !1;
                    for (i in n) {
                        var o = n[i];
                        h && !s && (s = {
                            privateid: o.gmi_args.privateid
                        }), o.gmi_args.privateid == t && (l = !0, h = !0), h || (a = {
                            privateid: o.gmi_args.privateid
                        })
                    }
                    return l ? {
                        previous_itemid: a,
                        next_itemid: s
                    } : !1
                },
                keyboard_shift: function() {
                    !this.active || Glbl("Minibrowse.opened") || Glbl("StashStream.navigation_keyboard_disabled") || (this.shift_selection = this.selector.getSelection(!0))
                },
                keyboard_delete: function(e, t) {
                    !this.active || Glbl("Minibrowse.opened") || Glbl("StashStream.navigation_keyboard_disabled") || (t.stopPropagation(), t.preventDefault(), this.handlers.stash_stream_delete_items.call(this))
                },
                keyboard_merge: function(e, t) {
                    !this.active || Glbl("Minibrowse.opened") || Glbl("StashStream.navigation_keyboard_disabled") || (t.stopPropagation(), t.preventDefault(), "folder" != Glbl("Stash.view") && this.handlers.stash_stream_merge_items.call(this))
                },
                keyboard_escape: function(e, t) {
                    this.active && (Glbl("Minibrowse.opened") ? PubSub.publish("Minibrowse.close") : "folder" != Glbl("Stash.view") || Glbl("StashStream.minibrowse_keyboard_disabled") || (t.stopPropagation(), t.preventDefault(), PubSub.publish("StashPageNavigation.folder_close")))
                },
                keyboard_enter: function(t, s) {
                    if (this.active && !Glbl("Minibrowse.opened") && !Glbl("StashStream.minibrowse_keyboard_disabled")) {
                        s.stopPropagation(), s.preventDefault();
                        var i = this.selector.getSelection();
                        1 === i.length && (e(i[0]).find("img").click().mouseout(), PubSub.publish("StashToolbar.select_none"))
                    }
                },
                stash_stream_delete_items_dontask: function(t, s) {
                    if (this.active) {
                        var i, a = this;
                        if (s) {
                            var r;
                            r = vms_feature("stash_nested_stacks") ? "gmi-stashid" : "gmi-deviationid", i = e.map(s, function(t) {
                                return e(a.gmi_node).find(".stash-thumb-container[" + r + '="' + t + '"]').find(".tt-a")[0]
                            })
                        }
                        this.handlers.stash_stream_delete_items.call(this, t, i, !0), PubSub.publish("StashPage.refresh_emptiness_notice")
                    }
                },
                stash_stream_delete_items: function(t, s, i) {
                    if (this.active) {
                        var a = !0;
                        if (!s) {
                            if (a = !1, !this.selector) return console.info("selector fail", this), void 0;
                            s = this.selector.getSelection()
                        }
                        if (s.length) {
                            if (a || 1 !== s.length || i) {
                                if (s.length > 1 && !i && !confirm("Do you really want to delete these " + s.length + " items?")) return
                            } else {
                                var r = GMI.up(s[0], "StashThumb"),
                                    n = "Do you really want to delete this " + ("stack" == r.gmi_args.type ? "stack?" : "item?");
                                if (!confirm(n)) return
                            }
                            for (var h in s) {
                                var l = s[h],
                                    r = GMI.up(l, "StashThumb");
                                r.push_delete()
                            }
                            PubSub.publish("StashStream.thumbs_have_been_removed");
                            var o = e(this.gmi_node),
                                c = GMI.query(o[0], "StashThumb")[0],
                                b = GMI.query(o.find("#empty-item")[0], "StashThumb"),
                                d = GMI.query(o[0], "StashThumb").length - 1 - b.length;
                            return "root" != Glbl("Stash.view") && (c === r || 2 > d) && PubSub.publish("StashPage.mark_root_as_dirty", !0), PubSub.publish("StashPage.update_pagination"), DiFi.send(), Glbl("Minibrowse.opened") ? (PubSub.publish("Minibrowse.close"), void 0) : void 0
                        }
                    }
                },
                stash_stream_merge_items: function() {
                    if (this.active) {
                        var t = this.selector.getSelection();
                        if (!(2 > t.length)) {
                            var s = [],
                                i = void 0,
                                a = void 0,
                                r = function(e) {
                                    return "stack" === e.gmi_args.type ? e.gmi_args.stack_title : e.gmi_args.flat_title
                                };
                            for (var n in t) {
                                var h = GMI.up(t[n], "StashThumb"),
                                    l = r(h);
                                s.push(h), void 0 === a && (null === l.match(/^Sta\.sh Uploads/) ? (a = h, i = l) : n == t.length - 1 && (a = GMI.up(t[0], "StashThumb"), i = r(a)))
                            }
                            var o = s[0];
                            s.splice(s.indexOf(a), 1);
                            var c = s[s.length - 1].gmi_args.stashid;
                            s.reverse();
                            var b = new CBC(function() {
                                PubSub.publish("StashStream.items_merged")
                            });
                            for (n = 1; s.length > n; n++) {
                                var d = b.pull();
                                DiFi.pushPost("Stashes", "merge", [c, s[n].gmi_args.stashid], function(e, t) {
                                    return e ? (d(), void 0) : (alert(t.response.content.error), void 0)
                                })
                            }
                            var u = b.pull();
                            DiFi.pushPost("Stashes", "merge", [c, a.gmi_args.stashid], function(e, t) {
                                return e ? (PubSub.publish("StashStream.be_whole_again"), u(), void 0) : (alert(t.response.content.error), void 0)
                            });
                            var _ = b.pull();
                            DiFi.pushPost("Stashes", "rename", [59, c, i], function() {
                                _()
                            });
                            var m = e(this.gmi_node).find(".stash-thumb-container"),
                                v = e.inArray(o.$[0], m) + Glbl("Stash.current_offset"),
                                S = b.pull();
                            DiFi.pushPost("Stashes", "set_position", [c, v], function() {
                                S()
                            }), a.gmi_args.stashid = c, a.controls__set_stack_title(i), a.grow_into_a_stack_motherfucker(!0), a.gmiRefresh(), a.dnd__add(), o !== a && o.$.replaceWith(a.$);
                            for (var n in s) s[n].$.remove();
                            PubSub.publish("StashStream.update_selection_count"), PubSub.publish("StashPage.update_pagination"), b.start(), DiFi.send()
                        }
                    }
                },
                upload_complete: function(e, t) {
                    if (this.active && -1 === Glbl("Stash.mode").indexOf("invisible") && (t.size ? this.progress += t.size : this.progress++, this.progress > 0)) {
                        var s = Math.round(100 * (this.progress / this.total));
                        (this.progress >= this.total || 0 === s || isNaN(s)) && (this.progress = 0, this.total = 0)
                    }
                },
                upload_remove_current: function(t, s) {
                    this.active && s && (s.size ? this.total -= s.size : this.total--, PubSub.publish("StashStream.adopt_uploaded_thumb", e.extend(s, {
                        container: e(this.gmi_node)
                    })))
                },
                upload_queue_update: function(e, t) {
                    this._upload_queue_length = t
                },
                refresh_slice: function() {
                    if (this.active) {
                        var t = e(this.gmi_node).find(".stash-thumb-container").slice(0, - 1),
                            s = Math.min(t.length, Glbl("Stash.browselimit")),
                            i = Math.min(0, Glbl("Stash.browselimit") - t.length);
                        0 != s && (ddt.log("stashinfinitescroll", "Revealing thumbs", s), t.slice(s).removeClass("hidden").show().css("opacity", 1)), 0 != i && (ddt.log("stashinfinitescroll", "Hiding thumbs", i), t.slice(i).addClass("hidden"))
                    }
                },
                add_uploading_items: function(t, s) {
                    if (this.active && -1 === Glbl("Stash.mode").indexOf("invisible")) {
                        if (Glbl("Stash.current_offset") > 0 && e.isEmptyObject(s.options)) return PubSub.publish("StashPageNavigation.change_offset", {
                            offset: 0,
                            synchronous: !0
                        }), PubSub.publish("StashStream.add_uploading_items", s), void 0;
                        var i = e("#empty-item div.stash-thumb-container:first");
                        if (0 === i.length && (PubSub.publish("Stash.needs_stream_now"), i = e("#empty-item div.stash-thumb-container:first")), 0 !== i.length) {
                            var a = !1;
                            if (s.options && s.options.insertion_mode && "merge" == s.options.insertion_mode) {
                                var r = GMI.query("StashThumb", {
                                    match: {
                                        deviationid: s.options.relative_deviationid
                                    }
                                })[0];
                                a = !0
                            } else var r = GMI.apply(i.clone()[0], "StashThumb");
                            r.initialize_for_uploading(s);
                            var n = 0;
                            e.each(s.file_sizes, function(e, t) {
                                n += t || 1
                            }), this.total = n, a || this.insert_new_uploading_thumb.call(this, s, r), PubSub.publish("StashPage.refresh_emptiness_notice")
                        }
                    }
                },
                add_uploaded_items: function(e, t) {
                    this.active && -1 === Glbl("Stash.mode").indexOf("invisible") && (t.$.addClass("already-uploaded"), PubSub.publish("StashPage.refresh_emptiness_notice"))
                },
                be_whole_again: function(t, s) {
                    function i(e, t) {
                        r.resolve(e, t)
                    }
                    if (this.active) {
                        if (s) {
                            var a = this,
                                r = e.Deferred();
                            return this.be_whole_again_promise || (this.be_whole_again_promise = e.Deferred().resolve().promise()), this.be_whole_again_promise = this.be_whole_again_promise.then(function() {
                                return r.then(a.handlers.be_whole_again_callback.bindTo(a)), r.promise()
                            }), ddt.log("stashinfinitescroll", "be_whole_again", [s.offset, s.limit]), "root" == Glbl("Stash.view") ? DiFi.pushPost("Stashes", "get_root_stream", [s.offset, s.limit, Glbl("Stash.filter")], i) : "folder" == Glbl("Stash.view") && DiFi.pushPost("Stashes", "get_folder_stream", [Glbl("Stash.current_folderid"), s.offset, s.limit, Glbl("Stash.filter"), s.limit], i), DiFi.send(), void 0
                        }
                        var n = e(this.gmi_node).find(".stash-thumb-container.already-uploaded");
                        0 == n.length && Glbl("Stash.current_offset") > 0 ? PubSub.publish("Stash.pagination", Math.max(0, Glbl("Stash.current_offset") - Glbl("Stash.browselimit"))) : Glbl("Stash.browselimit") > n.length ? ("root" == Glbl("Stash.view") ? DiFi.pushPost("Stashes", "get_root_stream", [Glbl("Stash.current_offset") + n.length, Glbl("Stash.browselimit"), Glbl("Stash.filter")], this.handlers.be_whole_again_callback.bindTo(this)) : "folder" == Glbl("Stash.view") && DiFi.pushPost("Stashes", "get_folder_stream", [Glbl("Stash.current_folderid"), Math.max(0, Glbl("Stash.current_offset") + n.length - this._upload_queue_length), Glbl("Stash.current_offset") + n.length, Glbl("Stash.filter"), Glbl("Stash.browselimit")], this.handlers.be_whole_again_callback.bindTo(this)), DiFi.send()) : (PubSub.publish("StashStream.refresh_slice"), PubSub.publish("StashStream.is_whole_again"))
                    }
                },
                be_whole_again_callback: function(t, s) {
                    if (t) {
                        ddt.log("stashinfinitescroll", "be_whole_again_callback", s.request.args);
                        var i = e(s.response.content.datex),
                            a = e(this.gmi_node),
                            r = i.find(".stash-thumb-container.already-uploaded");
                        r.insertAfter(a.children(".stash-thumb-container.already-uploaded").last()), r.on("mouseover.gmi_init", function(t) {
                            var s = e(t.currentTarget);
                            s.off("mouseover.gmi_init"), GMI.query(t.currentTarget, "StashThumb")
                        }), vms_feature("qunit") ? GMI.query(a[0], "StashThumb") : (ddt.log("stashinfinitescroll", "About to GMI query async"), GMI.gmiQueryAsync(a[0], "StashThumb"), ddt.log("stashinfinitescroll", "GMI async query done")), "folder" == Glbl("Stash.view") && 0 == a.find(".stash-thumb-container.already-uploaded:visible").length && 0 == r.length && PubSub.publish("StashPageNavigation.folder_close"), PubSub.publish("StashPage.refresh_emptiness_notice"), PubSub.publish("StashStream.refresh_slice"), PubSub.publish("StashStream.is_whole_again", s)
                    } else "folder" == Glbl("Stash.view") && PubSub.publish("StashPageNavigation.folder_close")
                },
                sleep: function() {
                    this.active = !1, Glbl("StashStream.is_any_active", !1), this.unhook()
                },
                pagination_handler: function(t) {
                    if (this.active) {
                        t.preventDefault ? t.preventDefault() : t.returnValue = !1;
                        var s = 0,
                            i = e(t.target),
                            a = i.get(0).href.match(/offset=(\d+)/);
                        a && 2 == a.length && (s = parseInt(a[1], 10), PubSub.publish("Stash.pagination", s))
                    }
                },
                replace_pagination: function(t, s) {
                    this.active && (e(this.gmi_node).find(".pagination-wrapper").replaceWith(s), this._bind_to_pagination())
                },
                refresh_pagination: function() {
                    var t = e(this.gmi_node).find(".pagination li.prev, .pagination li.next"),
                        s = 0;
                    t.each(function(t, i) {
                        e(i).children("a.disabled").length && s++
                    }), 2 === s ? t.hide() : t.show()
                },
                activate_visible: function() {
                    var t = e(this.gmi_node);
                    t.is(":visible") && (Glbl("Stash.view", this._view), this._activate())
                },
                activate_current_view: function() {
                    this._view == Glbl("Stash.view") && this._activate()
                },
                replace_current: function(e, t) {
                    this._view == Glbl("Stash.view") && this._replace(t)
                },
                check_previous_and_next: function(e, t) {
                    var s = this.handlers.get_previous_and_next_item_ids.call(this, t);
                    s && PubSub.publish("StashStream.fetched_next_and_previous_items", s)
                },
                update_current: function(t, s) {
                    if (this.active && this._view == Glbl("Stash.view")) {
                        var i = e("<div/>"),
                            a = e(this.gmi_node),
                            r = e.map(i.html(s).find(".already-uploaded[name=gmi-StashThumb]"), function(e) {
                                return GMIBase.getOne(e)
                            }),
                            n = GMI.query(a[0], "StashThumb").slice(0, - 1);
                        this._sort_thumbs(n, r, a)
                    }
                },
                refresh_visibility: function() {
                    this.active && e(this.gmi_node).find(".already-uploaded.stash-thumb-container").css("visibility", "visible")
                },
                refresh_unsocketed_visibility: function() {
                    this.active && e(this.gmi_node).find(".stash-thumb-container").css("visibility", "visible").filter(".hover-mode, .selection-hover-mode").mouseout()
                },
                blur_share_links: function() {
                    this.active && e(this.gmi_node).find(".stash-thumb-container .text.small").blur()
                },
                hide: function() {
                    this.active && e(this.gmi_node).hide()
                },
                show: function() {
                    this.active && e(this.gmi_node).show()
                },
                deactivate_selection: function() {
                    this.active && this.selector && this.selector.unhook()
                },
                activate_selection: function() {
                    this.active && this.selector && this.selector.hook()
                },
                remove_from_container: function(t, s) {
                    if (this.active) {
                        var i = e([]),
                            a = this.selector.getSelection();
                        0 === a.length && s && a.push(e('.stash-thumb-container[gmi-deviationid="' + s + '"] .tt-a')[0]), a.length > 0 && (a.reverse(), e(a).each(function(t, s) {
                            var a = e(s).parent(),
                                r = GMI.query(a[0], "StashThumb")[0];
                            vms_feature("stash_nested_stacks") ? DiFi.pushPost("Stashes", "move_to_parent_stack", [r.gmi_args.stashid], function(e, t) {
                                return e ? (i.remove(), PubSub.publish("StashStream.item_removed_from_stack"), PubSub.publish("StashStream.be_whole_again"), void 0) : (i.show(), alert(t.response.content.error), void 0)
                            }) : DiFi.pushPost("Stashes", "remove_from_stack", [r.gmi_args.deviationid], function(e, t) {
                                return e ? (i.remove(), PubSub.publish("StashStream.item_removed_from_stack"), PubSub.publish("StashStream.be_whole_again"), void 0) : (i.show(), alert(t.response.content.error), void 0)
                            }), i.push(a[0])
                        }), PubSub.publish("StashPage.mark_root_as_dirty", !0), PubSub.publish("StashPage.update_pagination"), i.hide(), PubSub.publish("StashStream.thumbs_have_been_removed"), DiFi.send())
                    }
                },
                delete_selection: function(e, t) {
                    this.active && (this.selector.getSelection().length ? PubSub.publish("StashStream.delete_items_dontask") : PubSub.publish("StashStream.delete_items_dontask", [t]))
                },
                deselect_all: function() {
                    this.active && this.selector.deselectAll()
                },
                rename_selected: function() {
                    if (this.active) {
                        var t = this.selector.getSelection(),
                            s = GMI.up(t[0], "StashThumb");
                        this.selector.deselectAll(), e(s.gmi_node).find("a.t").focus()
                    }
                },
                select_thumb: function(t, s) {
                    if (this.active) {
                        var i = e('.stash-thumb-container[gmi-deviationid="' + s.deviationid + '"]').find(".stash-tt-a");
                        this.selector.toggle(i[0], s.force || !i.hasClass("selected"))
                    }
                },
                edit_selection: function(t, s) {
                    if (this.active) {
                        var i = e(this.selector.getSelection()).gmiUp(),
                            a = [],
                            r = [];
                        s && r.push(parseInt(s, 36)), i.every(function() {
                            return !!this.$.attr("gmi-stashid")
                        }) ? i.each(function(e, t) {
                            r.push(parseInt(t.$.attr("gmi-stashid"), 36))
                        }) : i.each(function(e, t) {
                            a.push(t.$.attr("gmi-deviationid"))
                        }), PubSub.publish("StashPageNavigation.go", "//www.deviantart.com/submit/deviation?deviationids=" + a.join(",") + "&stashids=" + r.join(","))
                    }
                },
                import_writer: function(t, s) {
                    if (this.active) {
                        var i = this.selector.getSelection();
                        if (s) {
                            var a = GMI.up(i[0], "StashThumb");
                            PubSub.publish("StashPageNavigation.go", "http://sta.sh/writer?deviationid=" + a.gmi_args.deviationid)
                        } else if (i.length) {
                            var r = e.map(i, function(e) {
                                var t = GMI.up(e, "StashThumb");
                                return t.gmi_args.stashid ? "stack:" + t.gmi_args.stashid : "deviation:" + t.gmi_args.deviationid
                            }),
                                n = e('<form id="import_to_writer" action="/writer/" method="POST" style="display: none;"><input type="hidden" name="stack" value="" /></form>');
                            n.children("input").val(r.join(",")), n.appendTo("body"), n.submit()
                        }
                    }
                },
                update_selection_count: function() {
                    this.active && (Glbl("StashStreamSelection.count", this.selector ? this.selector.getSelection().length : 0), PubSub.publish("StashStream.after_update_selection_count"))
                },
                refresh_empty_state: function() {
                    this.active && Glbl("StashStream.empty", 0 === e(this.gmi_node).children(".stash-thumb-container").length)
                }
            },
            emMakeEditable: function() {},
            domFindVisible: function() {
                var t = 0,
                    s = {}, i = this.gs_offset;
                return e(this.gmi_node).find("span.already-uploaded.stash-thumb-container > div.tt-a:not(.stash-stack)").each(function(e, a) {
                    s[t+++i] = a
                }), s
            },
            _drag_rect: Ruler.document.node,
            emGetSelectionParams: function() {
                return {
                    allow_multiple: "rectangle",
                    drag_rect_ruler: this._drag_rect,
                    ignore_clicks: 1,
                    global_mouse_cancel: !0,
                    selectable_area: e(".stash-container")[0]
                }
            },
            gmiConstructor: function() {
                this.base();
                var t = e(this.gmi_node);
                t.hasClass("stash-root-stream") ? this._view = "root" : t.hasClass("stash-folder-stream") && (this._view = "folder"), Glbl("Stash.view") == this._view && this._activate(), PubSub.subscribe([{
                    eventname: "StashStream.activate_visible",
                    subscriber: this,
                    callback: this.handlers.activate_visible
                }, {
                    eventname: "StashStream.activate_current_view",
                    subscriber: this,
                    callback: this.handlers.activate_current_view
                }, {
                    eventname: "StashStream.update_current",
                    subscriber: this,
                    callback: this.handlers.update_current
                }, {
                    eventname: "Minibrowse.item_has_been_opened",
                    subscriber: this,
                    callback: this.handlers.check_previous_and_next
                }, {
                    eventname: "StashStream.replace_current",
                    subscriber: this,
                    callback: this.handlers.replace_current
                }])
            },
            destructor: function() {
                this.active = !1, PubSub.unsubscribe([{
                    eventname: "StashStream.activate_visible",
                    subscriber: this
                }, {
                    eventname: "StashStream.update_current",
                    subscriber: this
                }, {
                    eventname: "StashStream.activate_current_view",
                    subscriber: this
                }, {
                    eventname: "StashStream.replace_current",
                    subscriber: this
                }])
            },
            stylize_and_hook: function() {
                if (!this._hooked) {
                    var t = e(this.gmi_node),
                        s = this;
                    if (Glbl("Stash.first_load") || t.css({
                        opacity: .01
                    }), (Glbl("Stash.mode").indexOf("embed") > -1 || -1 === Glbl("Stash.mode").indexOf("plain") && -1 === Glbl("Stash.mode").indexOf("readonly")) && (this.edit_mode = !1, this.emReceiver(!0)), - 1 !== Glbl("Stash.mode").indexOf("rich") && e("root" == Glbl("Stash.view") ? ".stash-folder-stream" : ".stash-root-stream").hide(), - 1 === Glbl("Stash.mode").indexOf("rich") || vms_feature("qunit")) GMI.query(this.gmi_node, "StashThumb");
                    else {
                        GMI.gmiQueryAsync(this.gmi_node, "StashThumb"), e(this.gmi_node).find(".stash-thumb-container:visible").on("mouseover.gmi_init", function(t) {
                            var s = e(t.currentTarget);
                            s.off("mouseover.gmi_init"), GMI.query(t.currentTarget, "StashThumb")
                        });
                        for (var i = Math.floor(this.gmi_args.total / this.gmi_args.count_per_page) * this.gmi_args.count_per_page, a = i; a >= this.gmi_args.count_per_page; a -= this.gmi_args.count_per_page) {
                            var r = a == i ? this.gmi_args.total % this.gmi_args.count_per_page : this.gmi_args.count_per_page,
                                n = e('<div class="infinite-scroll-placeholder ' + ("root" == Glbl("Stash.view") ? "root-placeholder" : "folder-placeholder") + '" data-offset="' + a + '" data-count="' + r + '"></div>'),
                                h = e("#empty-item .stash-thumb-container").first().clone();
                            h.find(".processing-spinner").remove();
                            for (var l = 0; r > l; l++) n.append(h);
                            n.insertAfter(t)
                        }
                    }
                    if (PubSub.publish("StashStream.refresh_slice"), Glbl("Stash.first_load") || (-1 !== Glbl("Stash.mode").indexOf("plain") || "root" == Glbl("Stash.view") ? (t[0].setAttribute("style", ""), t[0].style.cssText = "") : (t.css("opacity", .5), t.fadeTo(300, 1, function() {
                        t[0].setAttribute("style", ""), t[0].style.cssText = "", s.active || t.hide()
                    }))), (Browser.isIE || Browser.isOpera) && e(".stash-upload .smbutton-thin").css("margin-top", "9px !important"), Glbl("Stash.first_load", !1), PubSub.subscribe([{
                        eventname: "StashKeyboard.left",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.right",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.escape",
                        subscriber: this,
                        callback: this.handlers.keyboard_escape
                    }, {
                        eventname: "StashStream.be_whole_again",
                        subscriber: this,
                        callback: this.handlers.be_whole_again
                    }, {
                        eventname: "StashStream.refresh_slice",
                        subscriber: this,
                        callback: this.handlers.refresh_slice
                    }]), - 1 !== Glbl("Stash.mode").indexOf("readonly")) return Glbl("StashStream.navigation_keyboard_disabled", !0), this._hooked = !0, void 0;
                    this._bind_to_pagination(), this.pubsubery = [{
                        eventname: "StashKeyboard.select_all",
                        subscriber: this,
                        callback: this.handlers.window_select_batch
                    }, {
                        eventname: "StashToolbar.select_none",
                        subscriber: this,
                        callback: this.handlers.window_select_batch
                    }, {
                        eventname: "StashToolbar.select_stacks",
                        subscriber: this,
                        callback: this.handlers.window_select_batch
                    }, {
                        eventname: "StashToolbar.select_inverse",
                        subscriber: this,
                        callback: this.handlers.window_select_batch
                    }, {
                        eventname: "StashKeyboard.up",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.down",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_left",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_right",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_up",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_down",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_left_cumulative",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_right_cumulative",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_up_cumulative",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.select_down_cumulative",
                        subscriber: this,
                        callback: this.handlers.window_arrows
                    }, {
                        eventname: "StashKeyboard.shift",
                        subscriber: this,
                        callback: this.handlers.keyboard_shift
                    }, {
                        eventname: "StashKeyboard.delete",
                        subscriber: this,
                        callback: this.handlers.keyboard_delete
                    }, {
                        eventname: "StashKeyboard.merge",
                        subscriber: this,
                        callback: this.handlers.keyboard_merge
                    }, {
                        eventname: "StashKeyboard.enter",
                        subscriber: this,
                        callback: this.handlers.keyboard_enter
                    }, {
                        eventname: "StashStream.delete_items_dontask",
                        subscriber: this,
                        callback: this.handlers.stash_stream_delete_items_dontask
                    }, {
                        eventname: "StashStream.delete_items",
                        subscriber: this,
                        callback: this.handlers.stash_stream_delete_items
                    }, {
                        eventname: "StashStream.merge_items",
                        subscriber: this,
                        callback: this.handlers.stash_stream_merge_items
                    }, {
                        eventname: "StashUploader.complete",
                        subscriber: this,
                        callback: this.handlers.upload_complete
                    }, {
                        eventname: "StashUploader.current_removed",
                        subscriber: this,
                        callback: this.handlers.upload_remove_current
                    }, {
                        eventname: "StashUploader.queue_updated",
                        subscriber: this,
                        callback: this.handlers.upload_queue_update
                    }, {
                        eventname: "StashStream.add_uploading_items",
                        subscriber: this,
                        callback: this.handlers.add_uploading_items
                    }, {
                        eventname: "StashStream.add_uploaded_items",
                        subscriber: this,
                        callback: this.handlers.add_uploaded_items
                    }, {
                        eventname: "StashStream.sleep",
                        subscriber: this,
                        callback: this.handlers.sleep
                    }, {
                        eventname: "StashStream.replace_pagination",
                        subscriber: this,
                        callback: this.handlers.replace_pagination
                    }, {
                        eventname: "StashStream.refresh_pagination",
                        subscriber: this,
                        callback: this.handlers.refresh_pagination
                    }, {
                        eventname: "StashStream.refresh_visibility",
                        subscriber: this,
                        callback: this.handlers.refresh_visibility
                    }, {
                        eventname: "StashStream.refresh_unsocketed_visibility",
                        subscriber: this,
                        callback: this.handlers.refresh_unsocketed_visibility
                    }, {
                        eventname: "StashStream.blur_share_links",
                        subscriber: this,
                        callback: this.handlers.blur_share_links
                    }, {
                        eventname: "StashStream.remove_from_container",
                        subscriber: this,
                        callback: this.handlers.remove_from_container
                    }, {
                        eventname: "StashStream.deselect_all",
                        subscriber: this,
                        callback: this.handlers.deselect_all
                    }, {
                        eventname: "StashStream.rename_selected",
                        subscriber: this,
                        callback: this.handlers.rename_selected
                    }, {
                        eventname: "StashStream.import_writer",
                        subscriber: this,
                        callback: this.handlers.import_writer
                    }, {
                        eventname: "StashStream.update_selection_count",
                        subscriber: this,
                        callback: this.handlers.update_selection_count
                    }, {
                        eventname: "StashStream.delete_selection",
                        subscriber: this,
                        callback: this.handlers.delete_selection
                    }, {
                        eventname: "StashStream.select_thumb",
                        subscriber: this,
                        callback: this.handlers.select_thumb
                    }, {
                        eventname: "StashStream.edit_selection",
                        subscriber: this,
                        callback: this.handlers.edit_selection
                    }, {
                        eventname: "Minibrowse.open",
                        subscriber: this,
                        callback: this.handlers.deactivate_selection
                    }, {
                        eventname: "Minibrowse.close",
                        subscriber: this,
                        callback: this.handlers.activate_selection
                    }, {
                        eventname: "StashStream.hide",
                        subscriber: this,
                        callback: this.handlers.hide
                    }, {
                        eventname: "StashStream.show",
                        subscriber: this,
                        callback: this.handlers.show
                    }, {
                        eventname: "StashStream.refresh_empty_state",
                        subscriber: this,
                        callback: this.handlers.refresh_empty_state
                    }], PubSub.subscribe(this.pubsubery), this._hooked = !0
                }
            },
            unhook: function() {
                this._hooked && (-1 === Glbl("Stash.mode").indexOf("plain") && -1 === Glbl("Stash.mode").indexOf("readonly") && this.emReceiver(!1), PubSub.unsubscribe(this.pubsubery), this._hooked = !1)
            },
            _replace: function(t) {
                var s = e(this.gmi_node);
                this.unhook(), s.replaceWith(t), this.destructor();
                var i = GMI.query(e(".stash-" + Glbl("Stash.view") + "-stream")[0], "StashStream")[0];
                i ? PubSub.publish("StashPage.refresh_emptiness_notice") : console.log("Stream markup not found!")
            },
            _activate: function() {
                this.active = !0, Glbl("StashStream.is_any_active", !0), this.stylize_and_hook(), PubSub.publish("StashPage.refresh_emptiness_notice"), PubSub.publish("StashStream.update_selection_count"), PubSub.publish("StashStream.activated")
            },
            _bind_to_pagination: function() {
                e(this.gmi_node).find(".pagination a").bind("click.pagination_handler", this.handlers.pagination_handler.bindTo(this))
            },
            _sort_thumbs: function(t, s, i) {
                function a(e, t) {
                    for (var s = 0, i = t.length; i > s; ++s) if (e.gmi_args.privateid + "" == t[s].gmi_args.privateid + "") return s;
                    return -1
                }
                t = e.grep(t, function(e) {
                    return -1 === a(e, s) ? (e.$.remove(), !1) : !0
                }), e.each(s, function(e, s) {
                    var r = a(s, t),
                        n = t[r]; - 1 === r ? (i.prepend(s.$), t.unshift(s)) : e !== r ? n.$.before(t[e].$.get(0)) : (n.gmi_args.flat_title != s.gmi_args.flat_title || n.$.find("img").attr("src") != s.$.find("img").attr("src")) && (n.$.replaceWith(s.$), t[r] = s)
                })
            },
            insert_new_uploading_thumb: function(t, s) {
                if (!t.options || !t.options.insertion_mode || !t.options.relative_deviationid) {
                    ddt.log("targeteddrop", "untargeted file drop", t);
                    var i = e(this.gmi_node).find(".stream-always-at-head").last();
                    return i.length ? (i.after(s.$), void 0) : (e(this.gmi_node).prepend(s.$), void 0)
                }
                var a;
                if (e(this.gmi_node).find(".already-uploaded.stash-thumb-container").each(function(s, i) {
                    return e(i).gmi1().gmi_args.deviationid == t.options.relative_deviationid ? (a = e(this), !1) : void 0
                }), !a) return ddt.log("targeteddrop", "anchor thumb could not be found", t.options), void 0;
                switch (t.options.insertion_mode) {
                    case "insert_before":
                        ddt.log("targeteddrop", "insert before deviationid", t.options.relative_deviationid, s, a), a.before(s.$);
                        break;
                    case "insert_after":
                        ddt.log("targeteddrop", "insert after deviationid", t.options.relative_deviationid, s, a), a.after(s.$);
                        break;
                    default:
                        ddt.error("targetedrop", "invalid uploading thumb insertion mode", t.options)
                }
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.stream.js")
});
DWait.ready(["jms/lib/selection.js", "jms/lib/pubsub.js", "jms/lib/glbl.js", "jms/lib/simple_selection.js"], function() {
    Glbl("StashStreamSelection.disable", !1),
    function(e) {
        var t = e('<div class="surfer2"/>');
        window.StashStreamSelection = SimpleSelection.extend({
            event_list: "mousedown.stashstreamselection mouseup.stashstreamselection scroll.stashstreamselection",
            broadcasting: !0,
            is_selection_cumulative: !1,
            is_range_selection: !1,
            auto_scroll_interval_id: null,
            current_mouse_offsets: {
                x: 0,
                y: 0
            },
            current_scroll_top: 0,
            initial_document_height: e(document).height(),
            selected_order: [],
            handlers: {
                broadcast: function(e, t) {
                    this.broadcasting = t !== !1
                },
                event_handler: function(e) {
                    return this.handlers[e.type].call(this, e)
                },
                mousedown: function(t) {
                    this.is_valid_selection_event(t) && (Glbl("StashStream.navigation_keyboard_disabled", !0), Glbl("StashStream.minibrowse_keyboard_disabled", !0), this.is_range_selection = t.shiftKey, this.is_selection_cumulative = t.ctrlKey || t.metaKey, this.moved = !1, this.$closest = e(t.target).closest(".stash-modal-stream .stash-stream, body"), this.origin = this.$closest.offset(), this.current_mouse_offsets = this.position(t), this.current_mouse_offsets.x > this.$closest.outerWidth() - 20 || (this.rectangle = {
                        x1: this.current_mouse_offsets.x,
                        y1: this.current_mouse_offsets.y
                    }, this.$selectable = this.get_selectable(), this.$selectable && this.$selectable.length && this.$selectable.each(function() {
                        e(this).hasClass("selected") && (this.is_already_selected = !0)
                    }), this.$document.on("mousemove.stashstreamselection", e.throttle(100, this.handlers.event_handler.bindTo(this)))))
                },
                mouseup: function(e) {
                    this.handlers.mousemove.call(this, e), this.$document.off("mousemove.stashstreamselection"), this.clear_autoscroll_interval.call(this), this.rectangle = null, t.detach(), this.is_selection_cumulative = !1, this.is_range_selection = !1, this.$selectable && this.$selectable.length && this.$selectable.each(function() {
                        this.is_already_selected = null
                    }), this.$selectable = null, Glbl.del("StashStream.navigation_keyboard_disabled"), Glbl.del("StashStream.minibrowse_keyboard_disabled")
                },
                mousemove: function(e) {
                    this.rectangle && (this.moved || (this.moved = !0, t.css({
                        left: this.rectangle.x1,
                        top: this.rectangle.y1,
                        width: 1,
                        height: 1
                    }).appendTo(this.$closest).show()), this.current_mouse_offsets = this.position(e), this.update_selection.call(this), this.clear_autoscroll_interval.call(this), this.scroll_vertically_if_necessary.call(this) && this.set_autoscroll_interval.call(this))
                },
                scroll: function() {
                    var t = e(window).scrollTop();
                    this.current_mouse_offsets.y += t - this.current_scroll_top, this.current_scroll_top = t
                }
            },
            constructor: function(t) {
                this.$target_node = e(t), this.base(t), this.$document = e(document)
            },
            set_autoscroll_interval: function() {
                var e = this;
                this.auto_scroll_interval_id = setInterval(function() {
                    e.scroll_vertically_if_necessary.call(e) || e.clear_autoscroll_interval.call(e), e.update_selection.call(e)
                }, 100)
            },
            clear_autoscroll_interval: function() {
                this.auto_scroll_interval_id && (clearInterval(this.auto_scroll_interval_id), this.auto_scroll_interval_id = null)
            },
            update_selection: function() {
                this.update_rectangle.call(this);
                var t = this;
                this.broadcasting = !1;
                var s = !1,
                    i = !1;
                this.$selectable && this.$selectable.length && (this.deselectAll.call(this), this.$selectable.each(function() {
                    var l = e(this),
                        o = t.relative_offset(l.offset()),
                        r = l.width(),
                        a = l.height();
                    o.right = o.left + r, o.bottom = o.top + a;
                    var n = t.within_rectangle(o, l);
                    t.is_range_selection && (this.is_already_selected && (s = !0), n && (i = !0));
                    var c = t.is_selection_cumulative && this.is_already_selected ^ n || !t.is_selection_cumulative && n || t.is_range_selection && this.is_already_selected || s ^ i;
                    t.toggle(l, c)
                }), this.broadcasting = !0, this.broadcast())
            },
            relative_offset: function(e) {
                return this.$closest.is("body") ? {
                    left: e.left - this.origin.left,
                    top: e.top - this.origin.top
                } : {
                    left: e.left - this.origin.left + this.$closest.prop("scrollLeft"),
                    top: e.top - this.origin.top + this.$closest.prop("scrollTop")
                }
            },
            position: function(e) {
                return this.$closest.is("body") ? {
                    x: e.pageX,
                    y: e.pageY
                } : {
                    x: e.pageX - this.origin.left + this.$closest.prop("scrollLeft"),
                    y: e.pageY - this.origin.top + this.$closest.prop("scrollTop")
                }
            },
            is_valid_selection_event: function(t) {
                var s = e(t.target);
                return (Browser.isGecko ? 0 : 1) >= t.button && !t.ctrlKey && !t.altKey && s.closest(".stash-container, .stash-container-bottom-margin, .stash-modal-stream .stash-stream").length > 0 && 0 === s.closest("input:focus, a, .thumb").length
            },
            update_rectangle: function() {
                var e, s, i, l, o = this.rectangle;
                o.x2 = this.current_mouse_offsets.x, o.y2 = this.current_mouse_offsets.y, e = o.x2 > o.x1 ? o.x1 : o.x2, i = o.y2 > o.y1 ? o.y1 : o.y2, s = e == o.x1 ? o.x2 : o.x1, l = i == o.y1 ? o.y2 : o.y1, o.left = e, o.right = s, o.top = i, o.bottom = l, t.css({
                    left: e,
                    top: i,
                    width: s - e,
                    height: l - i
                })
            },
            scroll_vertically_if_necessary: function() {
                var t = 20,
                    s = e(window).height(),
                    i = 0;
                if (this.current_scroll_top + t >= this.current_mouse_offsets.y ? i = this.current_mouse_offsets.y - (this.current_scroll_top + t) : this.current_mouse_offsets.y >= this.current_scroll_top + s - t && (i = this.current_mouse_offsets.y - (this.current_scroll_top + s - t)), !i) return !1;
                var l = this.current_scroll_top + i,
                    o = !0;
                return 0 > l ? (l = 0, o = !1) : l > this.initial_document_height - s && (l = this.initial_document_height - s, o = !1), e(window).scrollTop(l), o
            },
            within_rectangle: function(e) {
                var t = this.rectangle;
                return t.right > e.left && e.right > t.left && t.bottom > e.top && e.bottom > t.top
            },
            get_selectable: function() {
                return this.$target_node.find(".already-uploaded").find(".stash-tt-a")
            },
            broadcast: function() {
                this.broadcasting && PubSub.publish("StashStream.update_selection_count")
            },
            invert_selection: function() {
                this.get_selectable().toggleClass("selected")
            },
            toggle: function(e, t) {
                t ? this.select(e) : this.deselect(e)
            },
            hook: function(t) {
                Glbl("StashStreamSelection.disable") || (this.base(t), PubSub.subscribe({
                    eventname: "StashStreamSelection.broadcast",
                    subscriber: this,
                    callback: this.handlers.broadcast
                }), e("body").addClass("unselectable"), this.$document.on(this.event_list, this.handlers.event_handler.bindTo(this)))
            },
            unhook: function() {
                PubSub.unsubscribe({
                    eventname: "StashStreamSelection.broadcast",
                    subscriber: this
                }), e("body").removeClass("unselectable").off("selectstart").off(this.event_list)
            },
            getAllSelectable: function() {
                return this.get_selectable().toArray()
            },
            isSelected: function(t) {
                return e(t).hasClass("selected")
            },
            setSelection: function(e) {
                this.deselectAll(), this.select(e)
            },
            setNewSelection: function(t, s, i, l) {
                if (!this.selected_order || !this.selected_order.length) return this.base.call(this, t, s, i, l);
                var o = this.selected_order[this.selected_order.length - 1];
                for (var r in t) if (r = Number(r), l[r] && e(l[r]).data("selected_order_rank") == o) return 0 >= r + i ? this.setSelection(l[0], s) : this.setSelection(l[Math.min(l.length - 1, r + i)], s);
                this.setSelection(l[i > 0 ? 0 : l.length - 1], s)
            },
            getSelection: function(e) {
                var t = this.get_selectable(),
                    s = t.filter(".selected");
                if (e) {
                    var i = {};
                    return s.each(function(e, s) {
                        i[t.index(s)] = s
                    }), i
                }
                return s.toArray()
            },
            selectAll: function() {
                this.select(this.get_selectable())
            },
            deselectAll: function() {
                this.deselect(this.get_selectable()), this.selected_order = []
            },
            select: function(t) {
                var s = e(t);
                if (!s.hasClass("selected")) {
                    s.addClass("selected"), PubSub.publish("StashThumbHover.adapt_mode_if_necessary"), this.broadcast();
                    var i = this.selected_order.length ? this.selected_order[this.selected_order.length - 1] + 1 : 1;
                    s.data("selected_order_rank", i), this.selected_order.push(i)
                }
            },
            deselect: function(t) {
                var s = e(t);
                if (s.hasClass("selected")) {
                    s.removeClass("selected").closest(".stash-thumb-container.selection-hover-mode").gmi().each(function(e, t) {
                        t.$.mouseout()
                    }), this.broadcast();
                    var i = s.data("selected_order_rank");
                    if (this.selected_order && this.selected_order.length && i) {
                        var l = this.selected_order.indexOf(i); - 1 != l && this.selected_order.splice(l, 1)
                    }
                }
            }
        })
    }(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.stream.selection.js")
});
(function(t) {
    window.StashThumbControls = {
        controls__handlers: {
            controls_click: function(s) {
                if (s && (s.preventDefault(), s.stopPropagation(), !this.is_thumb_click_disabled.call(this, s))) switch (t(s.target).find_first_closest_in_selectors([".view", ".edit", ".merge", ".back", ".delete"])) {
                    case ".view":
                        this.controls__handlers.view.call(this);
                        break;
                    case ".edit":
                        this.controls__handlers.edit.call(this);
                        break;
                    case ".merge":
                        this.controls__handlers.set_mouse_position(s), this.controls__handlers.merge.call(this);
                        break;
                    case ".back":
                        this.controls__handlers.set_mouse_position(s), this.controls__handlers.remove_from_container.call(this);
                        break;
                    case ".delete":
                        this.controls__handlers.set_mouse_position(s), this.controls__handlers.deleteit.call(this)
                }
            },
            view: function() {
                return "stack" == this.gmi_args.type ? PubSub.publish("Stash.folder_open", {
                    id: this.gmi_args.stashid,
                    title: this.gmi_args.stack_title
                }) : PubSub.publish("Stash.item_open", {
                    privateid: this.gmi_args.privateid
                }), !1
            },
            edit: function() {
                return "stack" == this.gmi_args.type || Glbl("StashStreamSelection.count") > 0 ? PubSub.publish("StashStream.edit_selection", 0 === Glbl("StashStreamSelection.count") && this.gmi_args.stashid) : PubSub.publish("StashPageNavigation.go", "//www.deviantart.com/submit/deviation?deviationids=" + this.gmi_args.deviationid), !1
            },
            merge: function() {
                return PubSub.publish("StashStream.merge_items"), this.$.mouseleave(), !1
            },
            remove_from_container: function() {
                return PubSub.publish("StashStream.remove_from_container", this.gmi_args.deviationid), !1
            },
            deleteit: function() {
                var t = this.$.find(".ctl a.delete");
                if (t.hasClass("confirm")) this.confirming_deletion = !1, vms_feature("stash_nested_stacks") ? PubSub.publish("StashStream.delete_selection", this.gmi_args.stashid) : PubSub.publish("StashStream.delete_selection", this.gmi_args.deviationid);
                else {
                    this.confirming_deletion = !0, this.$.find(".ctl a.f").hide(), t.show().removeClass("f").addClass("confirm"), t.find(".btn").addClass("smbutton smbutton-size-large smbutton-red"), t.before('<span class="cancel_holder"><a href="javascript:void(0)" class="cancel smbutton smbutton-size-large smbutton-white">Cancel</a></span>');
                    var s = this;
                    this.$.find(".ctl a.cancel").click(function() {
                        return s.controls__hide_delete_confirmation(), !1
                    })
                }
                return !1
            },
            renamed: function(t, s) {
                var e = this.$.find("span.tt-w > a.t");
                this.controls__set_title(t);
                var i = bind(this, function(t, i) {
                    if (t) e.trigger("finalize");
                    else {
                        e.trigger("revert");
                        var a = "stack" == this.gmi_args.type ? "stack" : "item",
                            n = "";
                        this.controls__set_title(s), n = "stack" == a ? i.response.content.error.match(/duplicate entry/i) ? "Each stack must have a unique name." : "There was a problem renaming this " + a + ".\n\nPlease try again or choose a different name." : i.response.content.error.replace("Deviation", "Item"), alert(n)
                    }
                    return PubSub.publish("StashThumb.renamed"), t
                });
                t && t != s ? ("flat" == this.gmi_args.type ? DiFi.pushPost("Stash", "update_deviation_title", [this.gmi_args.deviationid, t], i) : DiFi.pushPost("Stashes", "rename", [59, this.gmi_args.stashid, t], i), DiFi.send()) : t = s
            },
            auto_hover_after_page_update: function() {
                var t = Glbl("StashPage.mouse_position");
                if (t && this.$ && this.$.is(":visible")) {
                    var s = this.$.find(".tt-w");
                    if (s.length) {
                        var e = s.offset(),
                            i = parseInt(s.css("width"), 10),
                            a = parseInt(s.css("height"), 10);
                        !(t.x && t.y && e && e.top && e.left) || 0 > i || 0 > a || t.y > e.top && t.x > e.left && e.top + a > t.y && e.left + i > t.x && (this.$.find("a.thumb, a.t").trigger("mouseenter.hover"), Glbl.del("StashPage.mouse_position"))
                    }
                }
            },
            set_mouse_position: function(s) {
                Glbl("StashPage.mouse_position", {
                    x: s.pageX,
                    y: s.pageY
                }), t(".stash-thumb-:visible").on("mousemove", function() {
                    Glbl.del("StashPage.mouse_position")
                })
            }
        },
        controls__add: function() {
            if (-1 !== Glbl("Stash.mode").indexOf("plain")) return this;
            var s = "stack" == this.gmi_args.type ? " stacked" : " flatter",
                e = t('<div class="undraggable ctl' + s + '"></div>'),
                i = this.$.find("a.t");
            if (i.length || (i = this.$.find(".stackystacky")), i.after(e), vms_feature("stash_nested_stacks")) var a = t('<div class="hovercard-controls"><a class="f view" href="#"><span class="img"></span><span class="btn">View</span></a><a class="f edit" href="#"><span class="img"></span><span class="btn">Submit</span><span class="num"></span></a><a class="f merge" href="#"><span class="img"></span><span class="btn">Merge</span><span class="num"></span></a><a class="f back" href="#"><span class="img"></span><span class="btn">Move up</span><span class="num"></span></a><a class="f delete" href="#"><span class="img"></span><span class="btn">Delete</span><span class="num"></span></a></div>');
            else var a = t('<div class="hovercard-controls"><a class="f view" href="#"><span class="img"></span><span class="btn">View</span></a><a class="f edit" href="#"><span class="img"></span><span class="btn">Submit</span><span class="num"></span></a><a class="f merge" href="#"><span class="img"></span><span class="btn">Merge</span><span class="num"></span></a><a class="f back" href="#"><span class="img"></span><span class="btn">Move to<br>Sta.sh</span><span class="num"></span></a><a class="f delete" href="#"><span class="img"></span><span class="btn">Delete</span><span class="num"></span></a></div>');
            return a.find("a").on("click", this.controls__handlers.controls_click.bindTo(this)), PubSub.subscribe({
                eventname: "StashStream.thumbs_have_been_removed",
                subscriber: this,
                callback: this.controls__handlers.auto_hover_after_page_update
            }), e.append(a), this._controls__add_shorturl()._controls__add_title_handler(), this
        },
        controls__remove: function() {
            if (-1 !== Glbl("Stash.mode").indexOf("plain")) return this;
            var t = this.$.find(".ctl");
            return t.find("a").off("click"), this.$.find("a.t").off("click dragover drop"), t.parent().find(".shorturl").remove(), t.remove(), this
        },
        controls__adapt: function() {
            var t = this.$.find(".ctl"),
                s = t.find("a.merge"),
                e = t.find("a.delete"),
                i = t.find("a.back"),
                a = t.find("a.view"),
                n = t.find("a.edit"),
                l = this._get_short_url();
            if (-1 !== Glbl("Stash.mode").indexOf("readonly")) return a.hide(), n.hide(), s.hide(), i.hide(), e.hide(), this;
            a.attr("href", l), "stack" == this.gmi_args.type ? n.attr("href", "//www.deviantart.com/submit/deviation?stashids=" + parseInt(this.gmi_args.stashid, 36, 10)) : n.attr("href", "//www.deviantart.com/submit/deviation?deviationids=" + this.gmi_args.deviationid);
            var r = Glbl("StashStreamSelection.count");
            return r > 1 && this.$.find(".tt-a").hasClass("selected") ? (a.hide(), window.deviantART.deviant.subbed ? n.css("display", "inline-block").find("span.num").html(" (" + r + ")") : n.hide(), e.find("span.num").html(" (" + r + ")"), e.css("display", "inline-block"), "root" == Glbl("Stash.view") ? (i.hide(), s.find("span.num").html(" (" + r + ")"), s.css("display", "inline-block"), this) : "folder" == Glbl("Stash.view") ? (vms_feature("stash_nested_stacks") ? (s.find("span.num").html(" (" + r + ")"), s.css("display", "inline-block")) : s.hide(), i.find("span.num").html(" (" + r + ")"), i.css("display", "inline-block"), this) : (s.hide(), i.hide(), this)) : 1 >= r ? (s.hide(), a.css("display", "inline-block"), e.find("span.num").empty(), e.css("display", "inline-block"), "folder" == Glbl("Stash.view") ? (this.gmi_args.stash_only ? n.hide() : n.css("display", "inline-block").find("span.num").empty(), i.find("span.num").empty(), i.css("display", "inline-block"), this) : "stack" != this.gmi_args.type ? (i.hide(), this.gmi_args.stash_only ? n.hide() : n.css("display", "inline-block").find("span.num").empty(), this) : (window.deviantART.deviant.subbed ? n.css("display", "inline-block").find("span.num").empty() : n.hide(), i.hide(), this)) : (a.hide(), n.hide(), s.hide(), i.hide(), e.hide(), this)
        },
        controls__hide_delete_confirmation: function() {
            this.confirming_deletion = !1;
            var t = this.$.find(".ctl a.delete");
            return this.$.find(".ctl a.cancel"), t.addClass("f").removeClass("confirm"), t.find(".btn").removeClass("smbutton smbutton-size-large smbutton-red"), this.$.find(".ctl .cancel_holder").remove(), this.controls__adapt(), this
        },
        controls__deletenow: function() {
            return vms_feature("stash_nested_stacks") ? PubSub.publish("StashStream.delete_items_dontask", [this.gmi_args.stashid]) : PubSub.publish("StashStream.delete_items_dontask", [this.gmi_args.deviationid]), this
        },
        controls__set_title: function(t) {
            return void 0 === t && (t = ""), this.untruncated_title = t, this.$.removeClass("block-hover"), "flat" != this.gmi_args.type ? this.controls__set_stack_title(t) : this.controls__set_thumb_title(t)
        },
        controls__set_stack_title: function(t) {
            return this.gmi_args.stack_title = t, this.controls__set_thumb_title(t), this
        },
        controls__set_thumb_title: function(t) {
            var s = this.$.find("a.t");
            s.length && s.attr("original-title", t).text(t), PubSub.publish("Minibrowse.uncache", this.gmi_args.privateid), this.gmi_args.flat_title = t;
            var e = this.$.find("a.thumb");
            if (e && e.attr("title")) {
                var i = e.attr("title").match(/(.*) by /);
                i.length && e.attr("title", t + " by " + e.attr("title").substr(i[0].length))
            }
            return this
        },
        _controls__add_title_handler: function() {
            var s = this.$.find("a.t");
            return s.on("dragover drop", function(t) {
                return t.preventDefault(), !1
            }), - 1 !== Glbl("Stash.mode").indexOf("readonly") ? s.bind("click", this.controls__handlers.view.bindTo(this)) : s.attr("title", "Click to rename").contenteditable({
                type: "singleline",
                max_length: 50,
                before_callback: function() {
                    return t(".surfer2").length || t(".selected").length > 1 ? !1 : (t(this).closest(".stash-thumb-container").attr("lock-hover", "in").addClass("block-hover"), Glbl("StashStream.navigation_keyboard_disabled", !0), Glbl("StashStream.minibrowse_keyboard_disabled", !0), void 0)
                },
                save_callback: this.controls__handlers.renamed.bindTo(this),
                after_callback: function() {
                    t(".surfer2").length || (Glbl.del("StashStream.navigation_keyboard_disabled"), Glbl.del("StashStream.minibrowse_keyboard_disabled"));
                    var s = t(this).closest(".stash-thumb-container").removeClass("block-hover"),
                        e = s.attr("lock-hover");
                    s.removeAttr("lock-hover"), "out" == e && s.mouseleave()
                }
            }), this
        },
        _controls__name_link_hover: function() {
            return -1 !== Glbl("Stash.mode").indexOf("readonly") ? this : (this.$.find("a.t").mouseover(function() {
                t(GMI.up(this, "StashThumb").gmi_node).hasClass("hover-mode") ? t(this).attr("title", "Click to rename") : t(this).attr("title", "")
            }), this)
        },
        _controls__add_shorturl: function() {
            var s = this.$.find(".ctl"),
                e = this._get_short_url();
            return this.$.find("a.t").each(function(s, i) {
                t(i).attr("href", e)
            }), s.append('<input class="text small shorturl selectable" readonly="readonly" value="' + e + '" onselectstart="window.event.cancelBubble = true;" onmousedown="if (window.event) { window.event.cancelBubble = true; } else { event.stopPropagation(); }" />'), this
        },
        _get_short_url: function() {
            var t;
            return "stack" == this.gmi_args.type ? t = this.gmi_args.stashid : (t = parseInt(this.gmi_args.privateid, 10).toString(36), this.$.find("a.thumb").attr("href", "/0" + t)), "http://sta.sh/" + ("stack" == this.gmi_args.type ? "2" : "0") + t
        }
    }
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.thumb.controls.js");
DWait.ready(["jms/lib/jquery/ui/jquery.ui.draggable.js", "jms/lib/jquery/ui/jquery.ui.droppable.js", "jms/lib/jquery/plugins/jquery.throttle-debounce.js", "jms/lib/pubsub.js"], function() {
    (function(e) {
        window.StashThumbDND = {
            $window: e(window),
            event_cache: null,
            socketed: null,
            dragged_element: null,
            $drag_helper: null,
            dnd__handlers: {
                scroll_interval: function() {
                    if (!this.event_cache) return null;
                    var e, t = this.event_cache;
                    Ruler.screen.pointer(t), top !== Glbl("StashPageScroll.position.top") && (e = parseInt(t.helper.css("top"), 10) + (Glbl("StashPageScroll.position.top") - top), t.helper.css("top", e)), setTimeout(this.bound_scroll_interval, 200)
                },
                start: function(t, s) {
                    this.bound_scroll_interval = this.bound_scroll_interval || this.dnd__handlers.scroll_interval.bindTo(this), this.dragged_element = t.target, this.event_cache = {
                        clientX: t.clientX,
                        clientY: t.clientY,
                        x: t.x,
                        y: t.y,
                        helper: s.helper
                    }, this.bound_scroll_interval(), PubSub.publish("StashThumbDND.started"), PubSub.publish("LitBox.stop", e(t.target).find("a.thumb.lit")), Glbl("StashThumbHover.paused", !0), e("body").addClass("stash-thumb-dragging")
                },
                drag: function(e, t) {
                    this.event_cache = {
                        clientX: e.clientX,
                        clientY: e.clientY,
                        x: e.x,
                        y: e.y,
                        helper: t.helper
                    }
                },
                stop: function() {
                    this.event_cache = null, PubSub.publish("StashThumbDND.stopped"), PubSub.publish("LitBox.start"), Glbl.del("StashThumbHover.paused"), this.$drag_helper = null, this.socketed === !1 && PubSub.publish("StashStream.refresh_unsocketed_visibility"), this.socketed = null, e("body").removeClass("stash-thumb-dragging")
                },
                revert: function(t) {
                    return this.socketed = t === !1 ? !1 : !0, e(this.dragged_element), this.socketed || this.$drag_helper.removeClass("hover-mode").find("a.t, input.text, button, a.smbutton").css({
                        display: "none"
                    }), !this.socketed
                },
                helper: function() {
                    var t = e(this),
                        s = e('<div class="stash-drag-container" />'),
                        r = Glbl("StashStreamSelection.count");
                    r > 0 && e(this).find(".tt-a").hasClass("selected") ? e.merge(t, e(".stash-stream:visible .already-uploaded").find(".selected").closest(".stash-thumb-container").not(t)) : r > 0 && PubSub.publish("StashStream.deselect_all");
                    var a = t.clone();
                    a.each(function() {
                        var t = e(this);
                        t.removeClass("hover-mode selection-hover-mode force-big").find("a.t, input.text, button, a.smbutton").hide(), PubSub.publish("LitBox.stop", t.find("a.thumb.lit"))
                    }), a.length > 1 ? a.each(function(t) {
                        var s = e(this);
                        t >= 5 && s.hide(), s.css({
                            left: 7 * t,
                            top: 7 * t,
                            "z-index": 5 - t,
                            position: "absolute"
                        })
                    }) : s.addClass("stash-thumb-container"), t.css("visibility", "hidden"), t.find(".stack-crop img").css("visibility", "hidden"), s.append(a), s.find("a.thumb").each(function(t, s) {
                        var r = e(s);
                        r.attr("shh_title", r.attr("title")), r.attr("title", "")
                    });
                    var i = GMI.query(this, "StashThumb")[0];
                    return i.$drag_helper = s, s
                },
                merge_accept: function() {
                    return "hidden" !== e(this).closest(".stash-thumb-container").css("visibility")
                },
                merge_over: function() {
                    e(this).data("over_image", !0), e(this).closest(".stash-tt-a").addClass("selected"), $zones = e(this).parents("span.shadow").siblings(".reorder_zone"), $zones.removeClass("hovering")
                },
                merge_out: function(t, s) {
                    e(this).data("over_image", !1), e(this).closest(".stash-tt-a").removeClass("selected"), $zones = e(this).parents("span.shadow").siblings(".reorder_zone"), $zones.each(function(r, a) {
                        var i = e(a).offset();
                        t.pageX > i.left && i.left + e(a).width() > t.pageX && t.pageY > i.top && i.top + e(a).height() > t.pageY && s.helper.hasClass("stash-thumb-container") && e(a).addClass("hovering")
                    })
                },
                merge_drop: function(t, s) {
                    var r = GMI.query(e(this).closest(".stash-thumb-container")[0], "StashThumb")[0],
                        a = GMI.query(s.helper[0], "StashThumb"),
                        d = r.gmi_args.stashid;
                    if (e(this).closest(".stash-tt-a").removeClass("selected"), vms_feature("stash_nested_stacks")) e.each(a, function(e, t) {
                        var s = t.gmi_args.stashid;
                        DiFi.pushPost("Stashes", "move_into", [d, s], function(e, t) {
                            return e ? (PubSub.publish("StashStream.items_merged"), void 0) : (alert(t.response.content.error), void 0)
                        }), t.$.remove()
                    });
                    else {
                        var o = /^Sta\.sh Uploads/,
                            h = o.test(r.gmi_args.stack_title),
                            n = void 0;
                        e.each(a, function(e, t) {
                            var s = t.gmi_args.stashid;
                            if (DiFi.pushPost("Stashes", "merge", [d, s], function(e, t) {
                                return e ? (PubSub.publish("StashStream.items_merged"), void 0) : (alert(t.response.content.error), void 0)
                            }), h) {
                                var r = "stack" === t.gmi_args.type ? t.gmi_args.stack_title : t.gmi_args.flat_title;
                                o.test(r) && (n = r, h = !1)
                            }
                            t.$.remove()
                        }), n && (r.controls__set_stack_title(n), r.gmi_args.flat_title = n, r.gmiRefresh(), DiFi.pushPost("Stashes", "rename", [59, d, n], e.noop))
                    }
                    PubSub.publish("StashPage.update_pagination"), DiFi.send(), s.draggable.filter(":ui-draggable").draggable("destroy").remove();
                    var l = r.$.find("a.thumb"),
                        _ = l.hasClass("lit");
                    l.removeClass("lit");
                    var u = e(a[a.length - 1].gmi_node).find("a.thumb");
                    l.html(u.html()), u.find("img.lit").length && l.addClass("lit unified"), l.height(u.height() || "auto"), l.width(u.width() || "auto");
                    var g = u.get(0);
                    if (g && g.attributes) for (i = 0; g.attributes.length > i; i++) {
                        var b = g.attributes[i].name;
                        l.attr(b, u.attr(b))
                    }
                    var v = u.find("img");
                    v.hasClass("lit") || r.update_image(v.attr("src"), v.width(), v.height()), r.grow_into_a_stack_motherfucker(!0), _ && r.cast_shadow(), r.dnd__add(), PubSub.publish("StashStream.select_thumb", {
                        deviationid: r.gmi_args.deviationid,
                        force: !0
                    }), PubSub.publish("StashStream.be_whole_again")
                },
                reorder_accept: function() {
                    return "hidden" !== e(this).closest(".stash-thumb-container").css("visibility")
                },
                reorder_over: function(t, s) {
                    !e(this).siblings("span.shadow").find("a.thumb").data("over_image") && s.helper.hasClass("stash-thumb-container") && e(this).addClass("hovering")
                },
                reorder_out: function() {
                    e(this).removeClass("hovering")
                },
                reorder_drop: function(t, s) {
                    if (!s.helper.hasClass("stash-thumb-container")) return s.helper.remove(), PubSub.publish("StashStream.refresh_visibility"), !1;
                    var r = e(this),
                        a = GMI.query(s.draggable[0], "StashThumb")[0],
                        i = GMI.query(r.closest(".stash-thumb-container")[0], "StashThumb")[0],
                        d = GMI.query(e(".stash-stream:visible")[0], "StashThumb");
                    if (!a || !i) return !1;
                    var o = e.inArray(i, d),
                        h = e.inArray(a, d),
                        n = !1;
                    if (r.hasClass("left_reorder_zone")) {
                        var l = o > h ? o - 1 : o;
                        h + 1 === o && (n = !0)
                    } else if (r.hasClass("right_reorder_zone")) {
                        if (o > h) var l = o;
                        else var l = o + 1;
                        l >= d.length && (l = d.length - 1), h - 1 === o && (n = !0)
                    }
                    0 != l && d[0] != a || "root" == Glbl("Stash.view") || PubSub.publish("StashPage.mark_root_as_dirty", !0), l += Glbl("Stash.current_offset"), n || (vms_feature("stash_nested_stacks") ? DiFi.pushPost("Stashes", "set_position", [a.gmi_args.stashid, l]) : 0 === Glbl("Stash.current_folderid") ? DiFi.pushPost("Stashes", "set_position", [a.gmi_args.stashid, l]) : DiFi.pushPost("Stashes", "set_position_stack", [Glbl("Stash.current_folderid"), a.gmi_args.deviationid, l]), DiFi.send());
                    var _ = s.draggable.detach();
                    r = e(this), r.removeClass("hovering"), r.hasClass("left_reorder_zone") ? _.insertBefore(r.closest(".stash-thumb-container")) : r.hasClass("right_reorder_zone") && _.insertAfter(r.closest(".stash-thumb-container")), _.css("visibility", "visible"), _.find(".stack-crop img").css("visibility", "hidden"), _.attr("title", _.attr("shh_title")), _.removeAttr("shh_title"), e(".stash-thumb-container .reorder_zone").removeClass("hovering");
                    var u = GMI.query(_[0], "StashThumb")[0];
                    u.dnd__add(), setTimeout(function() {
                        e(u.gmi_node).mouseout()
                    }, 1)
                },
                targeted_thumb_dragover: function(t) {
                    ddt.log("targeteddrop", "targeted_thumb_dragover"), Glbl("StashThumbDnd.hovered", !0);
                    var s = t.originalEvent.dataTransfer,
                        r = s && s.types && e.makeArray(s.types);
                    r && -1 != r.indexOf("Files") && -1 == r.indexOf("text/plain") && (this.$.find(".hovering").length || (this.about_to_file_hover_thumb = !0, this.thumb_is_file_hovered || (e(".active-dragover").trigger("dragleave"), this.$.addClass("active-dragover"), this.thumb_is_file_hovered = !0)))
                },
                targeted_thumb_dragleave: function() {
                    ddt.log("targeteddrop", "targeted_thumb_dragleave"), Glbl("StashThumbDnd.hovered", !1);
                    var e = this;
                    this.about_to_file_hover_thumb = !1, setTimeout(function() {
                        e.about_to_file_hover_thumb || (e.$.removeClass("active-dragover"), e.thumb_is_file_hovered = !1)
                    }, 10)
                },
                targeted_gap_dragover: function(t) {
                    ddt.log("targeteddrop", "targeted_gap_dragover"), Glbl("StashThumbDnd.hovered", !0);
                    var s = t.originalEvent.dataTransfer,
                        r = s && s.types && e.makeArray(s.types);
                    r && -1 != r.indexOf("Files") && -1 == r.indexOf("text/plain") && (this.about_to_file_hover_gap = !0, !this.about_to_file_hover_gap || this.gap_is_file_hovered || e(this).siblings("span.shadow").find("a.thumb").data("over_image") || (e(this).addClass("hovering"), this.gap_is_file_hovered = !0))
                },
                targeted_gap_dragleave: function() {
                    ddt.log("targeteddrop", "targeted_gap_dragleave"), Glbl("StashThumbDnd.hovered", !1);
                    var t = this;
                    this.about_to_file_hover_gap = !1, setTimeout(function() {
                        t.about_to_file_hover_gap || (e(t).removeClass("hovering"), t.gap_is_file_hovered = !1)
                    }, 10)
                }
            },
            dnd__add: function() {
                if (-1 === Glbl("Stash.mode").indexOf("plain") && -1 === Glbl("Stash.mode").indexOf("readonly")) {
                    if (this.$.find("a.thumb").filter(":ui-droppable").droppable("destroy"), this.$.find(".tt-w .reorder_zone").filter(":ui-droppable").droppable("destroy"), this.$.draggable({
                        distance: 4,
                        handle: "a.thumb",
                        revertDuration: 200,
                        start: this.dnd__handlers.start.bindTo(this),
                        drag: this.dnd__handlers.drag.bindTo(this),
                        stop: this.dnd__handlers.stop.bindTo(this),
                        revert: this.dnd__handlers.revert.bindTo(this),
                        helper: this.dnd__handlers.helper
                    }), vms_feature("stash_nested_stacks") ? this.$.find("a.thumb").droppable({
                        tolerance: "pointer",
                        accept: this.dnd__handlers.merge_accept,
                        over: this.dnd__handlers.merge_over,
                        out: this.dnd__handlers.merge_out,
                        drop: this.dnd__handlers.merge_drop
                    }) : "root" == Glbl("Stash.view") && this.$.find("a.thumb").droppable({
                        tolerance: "pointer",
                        accept: this.dnd__handlers.merge_accept,
                        over: this.dnd__handlers.merge_over,
                        out: this.dnd__handlers.merge_out,
                        drop: this.dnd__handlers.merge_drop
                    }), 0 === this.$.find(".reorder_zone").length) {
                        var t = e('<div class="reorder_zone left_reorder_zone"><div class="reorder_zone_divider"></div></div>'),
                            s = e('<div class="reorder_zone right_reorder_zone"><div class="reorder_zone_divider"></div>');
                        this.$.find(".tt-w").append(t, s)
                    }
                    this.$.find(".tt-w .reorder_zone").droppable({
                        tolerance: "pointer",
                        accept: this.dnd__handlers.reorder_accept,
                        over: this.dnd__handlers.reorder_over,
                        out: this.dnd__handlers.reorder_out,
                        drop: this.dnd__handlers.reorder_drop
                    }), vms_feature("stash_nested_stacks") ? this.$.off("dragover").on("dragover", this.dnd__handlers.targeted_thumb_dragover.bindTo(this)).off("dragleave").on("dragleave", this.dnd__handlers.targeted_thumb_dragleave.bindTo(this)) : "root" == Glbl("Stash.view") && this.$.off("dragover").on("dragover", this.dnd__handlers.targeted_thumb_dragover.bindTo(this)).off("dragleave").on("dragleave", this.dnd__handlers.targeted_thumb_dragleave.bindTo(this)), this.$.find(".tt-w .reorder_zone").off("dragover").on("dragover", this.dnd__handlers.targeted_gap_dragover).off("dragleave").on("dragleave", this.dnd__handlers.targeted_gap_dragleave)
                }
            }
        }
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.thumb.dnd.js")
});
(function(t) {
    window.StashThumbHover = {
        hover__handlers: {
            mouseenter: function() {
                this.gmi_args.is_uploading || this.$.attr("lock-hover") && this.$.attr("lock-hover", "in")
            },
            preload_stack_thumbs_rotation: function(t) {
                !this.stack_thumbs_end_reached && this.gmi_args.stashid && void 0 !== this.stack_thumbs_offset && this.last_offset_requested != this.stack_thumbs_offset && (vms_feature("stash_nested_stacks") ? DiFi.pushPost("Stashes", "get_folder_as_stack_thumbs", [this.gmi_args.stashid, this.traversal_offset || ""], this.hover__handlers.stack_thumbs_loaded.bindTo(this)) : DiFi.pushPost("Stashes", "get_folder_as_stack_thumbs", [this.gmi_args.stashid, this.stack_thumbs_offset], this.hover__handlers.stack_thumbs_loaded.bindTo(this)), t ? DiFi.timer(500) : DiFi.send(), this.last_offset_requested = this.stack_thumbs_offset)
            },
            stack_thumbs_loaded: function(s, e) {
                if (vms_feature("stash_nested_stacks")) {
                    if (!s || !e.response.content || !e.response.content.datex) return;
                    this.traversal_offset = e.response.content.traversal_offset || "";
                    var i = t.makeArray(t(e.response.content.datex).find(".new-stack span.tt-w")),
                        h = [];
                    ddt.log("stackslideshow", "returned thumbs", i), ddt.log("stackslideshow", "traversal offset", e.response.content.traversal_offset), t.each(i, function(s, e) {
                        var i = t(e),
                            a = i.find("a.thumb img");
                        a.attr("src", ImageCache.get(a.attr("src"))), h.push(i)
                    }), this.$thumbs_tt_w = t.merge(this.$thumbs_tt_w, h), ddt.log("stackslideshow", "currently rotating thumbs", t(this.$thumbs_tt_w)), this.stack_thumbs_offset += 5, this.traversal_offset ? this.stack_thumbs_rotating && this.traversal_offset.length && this.hover__handlers.preload_stack_thumbs_rotation.call(this, !0) : this.stack_thumbs_end_reached = !0, 5 == this.stack_thumbs_offset && i.length && this.preload_deferred.resolve()
                } else if (s) {
                    var i = t.makeArray(t(e.response.content).find(".already-uploaded span.tt-w")),
                        h = [];
                    t.each(i, function(s, e) {
                        var i = t(e),
                            a = i.find("a.thumb img");
                        a.attr("src", ImageCache.get(a.attr("src"))), h.push(i)
                    }), this.$thumbs_tt_w = t.merge(this.$thumbs_tt_w, h), this.stack_thumbs_offset += 5, 5 == i.length ? this.stack_thumbs_rotating && this.hover__handlers.preload_stack_thumbs_rotation.call(this, !0) : this.stack_thumbs_end_reached = !0, 5 == this.stack_thumbs_offset && i.length && this.preload_deferred.resolve()
                }
            },
            rotate_stack_thumbs: function() {
                this.stack_thumbs_rotating && (Glbl("StashThumbHover.paused") || (this.stack_thumbs_current_index++, this.stack_thumbs_current_index == this.$thumbs_tt_w.length && (this.stack_thumbs_current_index = 0), this.clone_promise = this.clone_promise.then(this.clone_into_thumb.bindTo(this, t(this.$thumbs_tt_w[this.stack_thumbs_current_index])))), this.stack_thumbs_rotation_timer && clearTimeout(this.stack_thumbs_rotation_timer), this.stack_thumbs_rotation_timer = setTimeout(this.hover__handlers.rotate_stack_thumbs.bindTo(this), 1600))
            },
            mouseleave: function() {
                if (!this.dragging && "deleted" != this.gmi_lifecycle && !this.gmi_args.is_uploading && this.hovercard_active) {
                    if (this.$.attr("lock-hover")) return this.$.attr("lock-hover", "out"), void 0;
                    var s = this.$.find("a.t").data("deviation-title");
                    s && this.$.find("a.t").text(s).show().removeData("deviation-title"), t("#output input.temporary").remove(), this.controls__hide_delete_confirmation(), this.stop_stack_thumbs_rotation(), this.$.removeClass("hover-mode selection-hover-mode force-big"), this.$.find("input.text, button, a.smbutton").hide(), this.truncate_title.call(this), this.hovercard_active = !1
                }
            },
            image_mousemove: function() {
                this.gmi_args.is_uploading || this.$.hasClass("hover-mode") || this.$.hasClass("selection-hover-mode") || 0 !== t("div.surfer2").length || this.$.find("a.thumb").mouseenter()
            },
            image_mouseenter: function() {
                if (!(DDD.p_down || this.dragging || this.confirming_deletion || this.gmi_args.is_uploading)) {
                    this.$.css("opacity", 1);
                    var s = this.$.find(".tt-a").hasClass("selected"),
                        e = Glbl("StashStreamSelection.count") || 0;
                    if (this.$.attr("lock-hover") && this.$.attr("lock-hover", "in"), !(!s && e > 0 || t(".stash-stream:visible .stash-thumb-container[lock-hover]").length > 0)) if (t("div.surfer2").length > 0);
                    else if (this.$.find("div.tt-a.selected").length) {
                        if (this.hovercard_active = !0, this.controls__adapt(), this.$.addClass("selection-hover-mode"), 1 === e) this.$.addClass("force-big"), this.hover__link();
                        else if (!this.$.find("a.t").data("deviation-title")) {
                            var i = this.$.find("a.t").text();
                            this.$.find("a.t").text("(" + e + ") Selected").show().data("deviation-title", i)
                        }
                    } else {
                        this.hovercard_active = !0, Glbl.del("StashPage.mouse_position"), "stack" == this.gmi_args.type && (this.hover__handlers.preload_stack_thumbs_rotation.call(this, !1), this.start_stack_thumbs_rotation()), this.controls__adapt(), this.$.hasClass("active-dragover") || this.$.addClass("hover-mode"), this.untruncate_title.call(this), this.hover__link();
                        var h = this.$.find("input.text");
                        h.length && !Browser.isMobile && (this.hover__is_element_in_view(h) ? setTimeout(function() {
                            h.select().focus()
                        }, 1) : h.clone().addClass("temporary").css({
                            position: "fixed",
                            top: "0px",
                            left: "0px",
                            opacity: 0
                        }).appendTo("#output").select())
                    }
                }
            },
            adapt_mode_if_necessary: function() {
                this.$ && this.$.hasClass("hover-mode") && this.$.find("div.tt-a").hasClass("selected") && this.$.removeClass("hover-mode").addClass("selection-hover-mode")
            }
        },
        hover__link: function() {
            this.$.find("input.text, button").css({
                display: "inline-block",
                opacity: 1
            })
        },
        hover__add: function() {
            -1 === Glbl("Stash.mode").indexOf("plain") && (this.preload_deferred = t.Deferred(), this.clone_promise = this.preload_deferred.promise(), this.$thumbs_tt_w = [], this.stack_thumbs_current_index = 0, this.$original_stack_thumb_tt_w = !1, this.stack_thumbs_offset = 0, this.last_offset_requested = -1, this.stack_thumbs_end_reached = !1, this.traversal_offset = null, this.$.find("a.thumb, a.t").off("mousemove.hover").on("mousemove.hover", this.hover__handlers.image_mousemove.bindTo(this)), this.$.find("a.thumb, a.t").off("mouseenter.hover").on("mouseenter.hover", this.hover__handlers.image_mouseenter.bindTo(this)), this.$.off("mouseenter.hover").on("mouseenter.hover", this.hover__handlers.mouseenter.bindTo(this)), this.$.off("mouseleave.hover").on("mouseleave.hover", this.hover__handlers.mouseleave.bindTo(this)), t(window).off("blur.hover" + this.gmi_args.deviationid).on("blur.hover" + this.gmi_args.deviationid, t.debounce(10, !0, this.hover__handlers.mouseleave.bindTo(this))), PubSub.subscribe({
                eventname: "StashThumbHover.adapt_mode_if_necessary",
                subscriber: this,
                callback: this.hover__handlers.adapt_mode_if_necessary
            }))
        },
        hover__is_element_in_view: function(s) {
            var e = t(window),
                i = e.scrollTop(),
                h = i + e.height(),
                a = s.offset().top,
                o = a + s.height();
            return o >= i && h >= a && h >= o && a >= i
        },
        start_stack_thumbs_rotation: function() {
            this.stack_thumbs_rotating || (this.stack_thumbs_rotating = !0, this.$original_stack_thumb_tt_w = this.$.find("span.tt-w").clone(), this.stack_thumbs_rotation_timer && clearTimeout(this.stack_thumbs_rotation_timer), this.preload_deferred.promise().then(this.hover__handlers.rotate_stack_thumbs.bindTo(this)))
        },
        stop_stack_thumbs_rotation: function() {
            if (!this.stack_thumbs_stopping) if (this.stack_thumbs_stopping = !0, this.stack_thumbs_rotation_timer && clearTimeout(this.stack_thumbs_rotation_timer), this.$original_stack_thumb_tt_w && 0 !== this.stack_thumbs_current_index) {
                var t = this;
                this.clone_promise = this.clone_promise.then(this.clone_into_thumb.bindTo(this, this.$original_stack_thumb_tt_w)).then(function() {
                    t.stack_thumbs_rotating = !1, t.stack_thumbs_stopping = !1, t.stack_thumbs_current_index = 0, t.$original_stack_thumb_tt_w = !1
                })
            } else this.stack_thumbs_rotating = !1, this.stack_thumbs_stopping = !1, this.stack_thumbs_current_index = 0
        },
        clone_into_thumb: function(s) {
            var e = this.$.find("span.tt-w span.stack-crop"),
                i = this.$.find("div.stack-background"),
                h = s.find("span.stack-crop").clone(),
                a = t.Deferred(),
                o = 800;
            return e.addClass("fading-out"), i.addClass("fading"), h.insertAfter(e), h.addClass("fading-in").hide().fadeIn(o), e.fadeOut(o, function() {
                e.remove(), i.removeClass("fading"), h.removeClass("fading-in"), a.resolve()
            }), this.bind_stack_click(), a.promise()
        }
    }
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.thumb.hover.js");
DWait.ready(["jms/lib/imagecache.js"], function() {
    (function(s) {
        window.StashThumbUpload = {
            upload__handlers: {
                initialize_upload_progress: function(i, t) {
                    s.inArray(t.upload_id, this.upload_ids) > -1 && (this.progress_bar.loaded += this.progress_bar.last_load > t.progress ? t.progress : t.progress - this.progress_bar.last_load, this.progress_bar.last_load = t.progress, this.progress_bar.loaded && (t.progress = this.progress_bar.loaded), this.progress_bar.total && (t.total = this.progress_bar.total))
                },
                prepare_next_in_queue: function(i, t) {
                    s.inArray(t.upload_id, this.upload_ids) > -1 && (this.is_first_in_set = t.is_first_in_set, !t.is_first_in_set && this.gmi_args.stack_title && PubSub.publish("Stash.folder_current_name", this.gmi_args.stack_title), t.size && this.show_progress())
                },
                upload_starting: function(i, t) {
                    t.with_progress && s.inArray(t.upload_id, this.upload_ids) > -1 && this.$.find(".progress").width("100%").attr("start_time", s.now())
                },
                upload_progress: function(i, t) {
                    s.inArray(t.upload_id, this.upload_ids) > -1 && this.update_progress(t.percent, t.text)
                },
                upload_complete: function(i, t) {
                    var a = s.inArray(t.upload_id, this.upload_ids);
                    if (!(-1 >= a)) {
                        var e = s(t.response.thumb);
                        if (vms_feature("stash_nested_stacks")) {
                            var r = t.first_in_set && (!this.upload_type || "targeted" != this.upload_type);
                            if (this.upload_ids.splice(a, 1), this.$.find(".tt-w a.t").hide(), r) {
                                this.gmi_args.deviationid = t.response.deviationid, this.gmi_args.privateid = t.response.privateid, this.gmi_args.stashid = t.response.stashid, this.gmi_args.stack_title = t.response.folder, this.gmi_args.flat_title = t.response.title, this.gmi_args.transparent = !0, this.gmi_args.draggable = "root" === Glbl("Stash.view") || "folder" === Glbl("Stash.view"), this._data_uris && ImageCache.set(this.gmi_args.deviationid, this._data_uris);
                                for (var _ in this.gmi_args) this.gmi_node.getAttribute("gmi-" + _) !== this.gmi_args[_] && this.gmi_node.setAttribute("gmi-" + _, this.gmi_args[_])
                            }
                            if (t.last_in_set ? Glbl.del("Stash.current_upload_folderid") : t.first_in_set && Glbl("Stash.current_upload_folderid", t.response.stashid), !t.last_in_set && !t.first_in_set) return this.grow_into_a_stack_motherfucker(!0), void 0
                        } else {
                            this.upload_ids.splice(a, 1), this.$.find(".tt-w a.t").hide(), this.gmi_args.deviationid = t.response.deviationid, this.gmi_args.privateid = t.response.privateid, this.gmi_args.stashid = t.response.stashid, this.gmi_args.stack_title = t.response.folder, this.gmi_args.flat_title = t.response.title, this.gmi_args.transparent = !0, this.gmi_args.draggable = "root" === Glbl("Stash.view") || "folder" === Glbl("Stash.view"), this._data_uris && ImageCache.set(this.gmi_args.deviationid, this._data_uris);
                            for (var _ in this.gmi_args) this.gmi_node.getAttribute("gmi-" + _) !== this.gmi_args[_] && this.gmi_node.setAttribute("gmi-" + _, this.gmi_args[_]);
                            if (!t.last_in_set && !t.first_in_set && "root" === Glbl("Stash.view")) return this.grow_into_a_stack_motherfucker(!0), void 0
                        }
                        t.last_in_set && (PubSub.publish("StashStream.add_uploaded_items", this), this.listening_to_image_load = !1, t.first_in_set || e.addClass("stash-stack"), this.$.find(".tt-a:first").replaceWith(e), this.cast_shadow(), this.gmi_args.is_uploading = !1, this.gmiConstructor(!0), this.trigger_image_error(), PubSub.unsubscribe(this.pubsubery))
                    }
                },
                adopt_uploaded_thumb: function(i, t) {
                    s.inArray(t.upload_id, this.upload_ids) > -1 && (t.is_born ? (this.$.addClass("already-uploaded").detach().prependTo(t.container), this.gmi_args.is_uploading = !1, this.gmiConstructor(!0), t.idx > 0 && this.restore_previous_image()) : t.is_dead && !this.gmi_args.transparent ? (this.$.remove(), PubSub.publish("StashPage.refresh_emptiness_notice")) : (this.hide_progress(), this.$.addClass("already-uploaded")))
                },
                current_removed: function(i, t) {
                    s.inArray(t.upload_id, this.upload_ids) > -1 && this.gmi_args && (this.gmi_args.is_uploading = !1)
                },
                upload_cleared: function() {
                    return this.upload__handlers.adopt_uploaded_thumb.call(this, "", {
                        upload_id: this.upload_ids[0],
                        is_dead: !0
                    }), !1
                },
                set_data_uris: function(i, t) {
                    (s.inArray(t.upload_id, this.upload_ids) > -1 || t.upload_id == this.gmi_args.privateid) && (this._data_uris = t.uris, this.$.find(".image-placeholder") ? this.$.find(".image-placeholder").replaceWith('<i></i><img src="' + t.uris["150"] + '">') : this.$.find("a.thumb img").attr("src", t.uris["150"]))
                }
            },
            initialize_for_uploading: function(i) {
                var t = 0;
                return this.pubsubery = [{
                    eventname: "StashUploader.prepare_next_in_queue",
                    subscriber: this,
                    callback: this.upload__handlers.prepare_next_in_queue
                }, {
                    eventname: "StashUploader.starting",
                    subscriber: this,
                    callback: this.upload__handlers.upload_starting
                }, {
                    eventname: "StashUploader.initialize_progress",
                    subscriber: this,
                    callback: this.upload__handlers.initialize_upload_progress
                }, {
                    eventname: "StashUploader.progress",
                    subscriber: this,
                    callback: this.upload__handlers.upload_progress
                }, {
                    eventname: "StashUploader.queue_cleared",
                    subscriber: this,
                    callback: this.upload__handlers.upload_cleared
                }, {
                    eventname: "StashUploader.after_upload_complete",
                    subscriber: this,
                    callback: this.upload__handlers.upload_complete
                }, {
                    eventname: "StashUploader.current_removed",
                    subscriber: this,
                    callback: this.upload__handlers.current_removed
                }, {
                    eventname: "StashStream.adopt_uploaded_thumb",
                    subscriber: this,
                    callback: this.upload__handlers.adopt_uploaded_thumb
                }, {
                    eventname: "StashThumb.set_data_uris",
                    subscriber: this,
                    callback: this.upload__handlers.set_data_uris
                }], vms_feature("stash_nested_stacks") ? i.options && i.options.insertion_mode && "merge" == i.options.insertion_mode ? (this.gmi_args.stashid = i.options.folderid, this.gmi_args.type = "stack", this.upload_type = "targeted") : (this.gmi_args.type = i.upload_ids.length > 1 ? "stack" : "flat", this.upload_type = "normal") : i.options && i.options.stashid ? (this.gmi_args.stashid = i.options.stashid, this.gmi_args.type = "stack") : this.gmi_args.type = i.upload_ids.length > 1 ? "stack" : "flat", this.gmi_args.is_uploading = !0, this.upload_ids = i.upload_ids, this.gmiConstructor(), s.each(i.file_sizes, function(s, i) {
                    t += void 0 === i ? 1e3 : i
                }), this.progress_bar.total = t, PubSub.subscribe(this.pubsubery), this.$.css("display", "inline-block"), t
            }
        }
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.thumb.upload.js")
});
DWait.ready(["jms/pages/stash/stash.thumb.controls.js", "jms/pages/stash/stash.thumb.dnd.js", "jms/pages/stash/stash.thumb.hover.js", "jms/lib/browser.js", "jms/lib/pubsub.js", "jms/lib/imagecache.js"], function() {
    DWait.ready("cssms/pages/stash/stash.override.thumbs.css", $.noop),
    function(t) {
        Glbl("StashThumb.pageload_stack_thumbs_preloading", 0), window.StashThumb = GMIBase.extend({
            handlers: {
                stack_click: function(t) {
                    return t.which > 1 ? !0 : this.is_thumb_click_disabled.call(this, t) ? (t.preventDefault(), PubSub.publish("StashStream.select_thumb", {
                        deviationid: this.gmi_args.deviationid
                    }), !0) : this.gmi_args.is_uploading ? !0 : (PubSub.publish("Stash.folder_open", {
                        id: this.gmi_args.stashid,
                        title: this.gmi_args.stack_title
                    }), t.preventDefault(), void 0)
                },
                thumb_click: function(t) {
                    return t.which > 1 ? !0 : this.is_thumb_click_disabled.call(this, t) ? (-1 === Glbl("Stash.mode").indexOf("readonly") && t.preventDefault(), PubSub.publish("StashStream.select_thumb", {
                        deviationid: this.gmi_args.deviationid
                    }), !0) : this.gmi_args.is_uploading ? !0 : (t.preventDefault(), PubSub.publish("Stash.item_open", {
                        privateid: this.gmi_args.privateid,
                        deviationid: this.gmi_args.deviationid
                    }), void 0)
                },
                dragging_start: function() {
                    this.dragging = !0
                },
                dragging_stop: function() {
                    this.dragging = !1
                },
                cancel_upload: function() {
                    return PubSub.publish("StashUploader.cancel", this.upload_ids[0]), !1
                },
                image_error_callback: function() {
                    if (this.$img.length && !vms_feature("qunit")) {
                        this.listen_to_image_load(), this.$img.css("display", "none");
                        var s = this.$img.attr("src"),
                            i = ImageCache.get(s);
                        if (!this.$.find(".image-placeholder").length && !this.$.find(".temp_stashing").length) if (i != s || this._data_uris) {
                            var a = i != s ? i : this._data_uris["150"];
                            this.$img.after(t('<img class="temp_stashing"/>').attr("src", a))
                        } else this.$img.after(t('<div class="image-placeholder loading stashing"><i class="processing-spinner"></i><strong>Stashing</strong></div>'));
                        this.$img.attr("autobob_done") === !0 && (this.$img.attr("src", "//st.deviantart.net/minish/stash/stash-noprev-120.png").height(120).width(120), this.$.find(".temp_stashing, .image-placeholder").remove(), this.$img.css("display", "block")), this.$img.parents("span.shadow").css("backgroundImage", ""), this.$img.css("top", "auto"), this.$img.parents("span.shadow.stackystacky").children("b").css({
                            backgroundColor: "transparent",
                            height: "auto",
                            width: "auto"
                        }), this.$img.parents("span.shadow.stackystacky").children("a").css({
                            height: "auto",
                            width: "auto"
                        }), this.adapt_thumb()
                    }
                },
                image_load_callback: function() {
                    function s() {
                        a.$.find(".image-placeholder, .temp_stashing").remove(), a.update_image(i, this.width, this.height), a.cast_shadow()
                    }
                    var i = this.$img.attr("src"),
                        a = this;
                    Browser.isIE8 ? setTimeout(s, 1) : t("<img/>").attr("src", i).load(s), this.adapt_thumb()
                },
                mouse_coordinates: function(t, s) {
                    600 > Math.abs(s.left - this._coordinates.left) && 600 > Math.abs(s.top - this._coordinates.top) && (this._coordinates_preloaded || (this._coordinates_preloaded = !0, this.hover__handlers.preload_stack_thumbs_rotation.call(this, !0)))
                }
            },
            gmiConstructor: function(t) {
                if (this.$img = this.$.find("a.thumb img:first"), PubSub.subscribe([{
                    eventname: "StashThumbDND.started",
                    subscriber: this,
                    callback: this.handlers.dragging_start
                }, {
                    eventname: "StashThumbDND.stopped",
                    subscriber: this,
                    callback: this.handlers.dragging_stop
                }]), this.progress_bar = {
                    total: 0,
                    loaded: 0,
                    last_load: 0
                }, void 0 !== this.gmi_args.type) {
                    this.hover__add();
                    var s = this.$.find("a.t"),
                        i = s.text();
                    if (s.attr("original-title", i), s.addClass("undraggable"), "stack" == this.gmi_args.type) this.grow_into_a_stack_motherfucker(t);
                    else {
                        var a = "a.thumb:not(.no-link)"; - 1 !== Glbl("Stash.mode").indexOf("plain") && (a += ", a.t:not(.no-link)"), this.$.find(a).off("click").on("click", this.handlers.thumb_click.bindTo(this)), this.controls__add(), this.adapt_small_thumb()
                    }
                    this.gmi_args.draggable && null === navigator.platform.match(/^iP(hone|ad)$/) && this.dnd__add(), this.$.is(":visible") && this.$.css("opacity", 1), this.$img.length && this.$img.on("error", this.handlers.image_error_callback.bindTo(this)), Browser.isIE && this.$.css("vertical-align", "top"), t && this.adapt_thumb(), this.truncate_title.call(this);
                    var e = this.$.find("a.thumb");
                    if (e.length > 0 && void 0 !== e.data("super-height")) {
                        var h = {
                            id: this.gmi_args.privateid,
                            width: e.data("super-width"),
                            height: e.data("super-height"),
                            src: e.data("super-img"),
                            transparent: 1 == e.data("super-transparent")
                        };
                        e.data("super-full-img") && (h.full_src = e.data("super-full-img"), h.full_width = e.data("super-full-width"), h.full_height = e.data("super-full-height")), PubSub.publish("Minibrowse.cache_main_html_dimensions", h)
                    }
                    "stack" == this.gmi_args.type && 4 > Glbl.plus("StashThumb.pageload_stack_thumbs_preloading") && this.hover__handlers.preload_stack_thumbs_rotation.call(this, !0), "stack" == this.gmi_args.type && (this._coordinates = this.$.offset(), PubSub.subscribe([{
                        eventname: "StashPageMouse.position",
                        subscriber: this,
                        callback: this.handlers.mouse_coordinates
                    }]))
                }
            },
            is_thumb_click_disabled: function(t) {
                return t.shiftKey || t.ctrlKey || t.metaKey
            },
            grow_into_a_stack_motherfucker: function(s) {
                if (this.gmi_args.type = "stack", s) {
                    var i = this.$.find("a.thumb"),
                        a = t(""),
                        e = "";
                    if (i.find(".image-placeholder").length) a = i.find(".image-placeholder").clone();
                    else if (i.hasClass("lit")) {
                        var h = this.$.find("q strong:first-child").text(),
                            r = this.$.find("q").html();
                        r = r.substr(r.indexOf("</strong>") + 9), a = t('<div class="freeform-wrapper"><strong>' + h + "</strong><br>" + r + "</div>")
                    } else {
                        var n = this.$.find("img").attr("src");
                        a = t('<img src="' + n + '" onerror="autobob.error(event)" onload="autobob.load(event)">'), a.on("load", function() {
                            var s = a.width(),
                                i = a.height(),
                                e = Math.round,
                                h = 112,
                                r = {}, n = s,
                                o = i;
                            s > i ? (i >= h ? (r.height = h, n = s / (i / h)) : (n = s, r["margin-top"] = e((h - i) / 2)), r["margin-left"] = e((h - n) / 2)) : s == i ? s >= h ? (r.width = h, r.height = h) : r["margin-top"] = e((h - i) / 2) : s >= h ? (r.width = h, o = i / (s / h), r["margin-top"] = e((h - i) / 4)) : r["margin-top"] = i >= h ? e((h - i) / 4) : e((h - i) / 2), t.each(r, function(t, s) {
                                a.css(t, s)
                            })
                        })
                    }
                    var o = this.$.find("div.tt-a"),
                        l = o.hasClass("selected") ? "selected" : "",
                        e = '<div class="tt-a stash-tt-a sq stash-stack new-stack ' + l + '">' + '<span class="tt-w">' + '<span class="shadow">' + '<a class="thumb">' + '<div class="stack-background">' + '<span class="stack-crop">' + "</span>" + "</div>" + "</a>" + "</span>" + '<a class="t">' + t("<div></div>").html(this.gmi_args.stack_title).text() + "</a>" + "</span>" + "</div>";
                    o.replaceWith(e), this.$.find("span.stack-crop").append(a), this.hover__add()
                }
                this.bind_stack_click(), - 1 !== Glbl("Stash.mode").indexOf("plain") && this.$.find("a.t").off("click").on("click", this.handlers.stack_click).attr("href", "#"), this.controls__remove().controls__add().controls__set_title(this.gmi_args.stack_title)
            },
            bind_stack_click: function() {
                var t = this.$.find("a.thumb");
                t.off("click").on("click", this.handlers.stack_click.bindTo(this)).attr("href", "/2" + this.gmi_args.stashid + (-1 === Glbl("Stash.mode").indexOf("readonly") ? "?edit=1" : ""))
            },
            adapt_small_thumb: function() {
                if ("stack" != this.gmi_args.type) {
                    var t = this.$.find("span.shadow"),
                        s = t.find("a.thumb"),
                        i = this.$.find(".temp_stashing:first:visible"),
                        a = i.length > 0 ? i : this.$img,
                        e = 76,
                        h = 16;
                    void 0 !== this._last_adapt_timeout && clearTimeout(this._last_adapt_timeout), this._last_adapt_timeout = setTimeout(bind(this, function() {
                        if (a.length > 0 && a.is(":visible") && !s.is(".lit, .journal, .film") && (s.css({
                            width: "auto",
                            height: "auto"
                        }), a.css({
                            top: "auto",
                            position: "static"
                        }), (e > s.width() || e > s.height()) && (e > a.width() && s.width(e), e > a.height()))) {
                            s.height(e);
                            var t = h > a.height() ? 30 : e / 2 - a.height() / 2;
                            a.css({
                                position: "relative",
                                top: t + "px"
                            })
                        }
                    }, 1))
                }
            },
            adapt_thumb: function() {
                "stack" != this.gmi_args.type && this.adapt_small_thumb()
            },
            cast_shadow: function() {
                var t, s, i = this.$.find("span.shadow"),
                    a = i.children("b"),
                    e = "stack" === this.gmi_args.type;
                e && !a.is(":visible") || !e && !this.$img.is(":visible") || (t = e ? a.width() : this.$img.width(), s = e ? a.height() : this.$img.height(), !this.$img.attr("src").match(/stash-noprev-120\.png$/) && (e && !this.is_first_in_set || this.$img.hasClass("lit") || "false" == this.gmi_args.transparent + "") ? (a.removeClass("transp-backdrop"), this.$img.hasClass("lit") && 135 == s && (s = 138), i.removeClass("mild")) : (a.addClass("transp-backdrop"), i.css({
                    "background-image": "none"
                })))
            },
            update_image: function(t, s, i) {
                this.listen_to_image_load(), this.previous_img = {
                    src: this.$img.attr("src"),
                    width: this.$img.width(),
                    height: this.$img.height()
                };
                var a = this.$img.css("top");
                this.$img.removeAttr("width").removeAttr("height").removeAttr("style"), a && this.$img.css("top", a), s && i && this.$img.width(s).height(i), this.previous_img.src != t && this.$img.attr("src", t), this.adapt_thumb()
            },
            restore_previous_image: function() {
                this.previous_img && this.update_image(this.previous_img.src, this.previous_img.width, this.previous_img.height)
            },
            show_progress: function() {
                this.hide_progress(), this.$progress = t('<div class="stash-thumb-progressbar"><div class="stash-thumb-progressbar-cancel"></div><div class="stash-thumb-progressbar-value"><span class="stash-thumb-progressbar-label"></span></div></div>'), this.$progress_value = this.$progress.find(".stash-thumb-progressbar-value"), this.$progress_cancel = this.$progress.find(".stash-thumb-progressbar-cancel"), this.$progress_label = this.$progress.find(".stash-thumb-progressbar-label"), window.File ? this.$progress_cancel.on("click", this.handlers.cancel_upload.bindTo(this)) : this.$progress_cancel.hide(), this.progress_bar.total = this.progress_bar.total || 0, this.progress_bar.progress = window.File ? 0 : 1e3, this.progress_bar.count = 1, this.progress_bar.offset = 1, this.progress_bar.start_time = t.now(), this.$.find(".shadow").after(this.$progress), PubSub.publish("QUnit.Stash.progress_bar_created"), this.$.animate({
                    opacity: .75
                }, 500)
            },
            update_progress: function(s, i) {
                if (this.$progress && (this.$progress_value.width(s + "%"), this.$progress_label.text(i).css("opacity", s > 40 ? 1 : 0), window.File && s)) {
                    var a = (t.now() - this.progress_bar.start_time) / 1e3,
                        e = a * (100 / s - 1);
                    this.$progress.prop("title", "Remaining time: " + Math.round(e) + "s")
                }
            },
            hide_progress: function() {
                this.$progress && this.$progress.remove()
            },
            push_delete: function() {
                var s = function() {
                    PubSub.publish("StashThumb.deleted"), Glbl("Stash.pending_deletions", Glbl("Stash.pending_deletions") - 1), 1 > Glbl("Stash.pending_deletions") && PubSub.publish("StashStream.be_whole_again")
                };
                Glbl("Stash.pending_deletions", (Glbl("Stash.pending_deletions") || 0) + 1), "stack" == this.gmi_args.type ? DiFi.pushPost("Gallections", "delete", [0, 59, parseInt(this.gmi_args.stashid, 36)], s) : DiFi.pushPost("Stashes", "delete_deviation_from_stashes", [this.gmi_args.deviationid], s), t(this.gmi_node).remove(), PubSub.publish("StashStream.update_selection_count")
            },
            listen_to_image_load: function() {
                this.listening_to_image_load || (this.listening_to_image_load = !0, this.$img.load(this.handlers.image_load_callback.bindTo(this)))
            },
            truncate_title: function() {
                var t = this.$.find("a.t");
                if (this.untruncated_title || (this.untruncated_title = t.text()), t.length) for (var s = parseInt(t.css("max-height").replace(/px/, ""), 10) - 1, i = function(t, s) {
                    return s.replace(/\S\s*(\.\.\.)?$/, "...")
                }; t.height() > s && t.text().length > 4;) t.text(i)
            },
            untruncate_title: function() {
                if (this.untruncated_title) {
                    var t = this.$.find("a.t");
                    t.text(this.untruncated_title)
                }
            },
            trigger_image_error: function() {
                this.$img.length && this.handlers.image_error_callback.call(this)
            }
        }), window.StashThumb = window.StashThumb.extend(window.StashThumbControls), window.StashThumb = window.StashThumb.extend(window.StashThumbDND), window.StashThumb = window.StashThumb.extend(window.StashThumbHover), window.StashThumb = window.StashThumb.extend(window.StashThumbUpload)
    }(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.thumb.js")
});
(function(e) {
    var t = Base.extend({
        queue: [],
        uploading: !1,
        already_uploaded_ie: [],
        thumb_size_limit: 5242880,
        upload_check_data: {},
        upload_progress_data: {},
        progress_check_timer: 0,
        uploaded: 0,
        handlers: {
            enqueue: function(t, s) {
                if (e.isArray(s.files)) {
                    Glbl("Stash.mode").indexOf("multisubmit") > -1 && (s.options || (s.options = {}), s.options.submit_page = 1);
                    var i = s.files,
                        a = s.options,
                        r = e.now(),
                        o = {
                            upload_ids: [],
                            file_sizes: [],
                            stash_mode: Glbl("Stash.mode"),
                            options: a
                        }, u = this,
                        l = [];
                    if (Glbl("Stash.mode").indexOf("multisubmit") > -1 && !window.deviantART.deviant.subbed) var n = 1;
                    var d = 0;
                    return e.each(i, function(t, s) {
                        if (u.check_upload_limits(s.file)) {
                            if (n && d >= n) return Glbl("Upsell.multi_upload", !0), void 0;
                            d++, s.deferred = e.Deferred(), setTimeout(s.deferred.resolve, 1e3);
                            var i = u.uploaded+++"-" + r,
                                p = s.file && (s.file.size || s.file.fileSize);
                            0 === t && window.FileReader && u.is_viewable_thumb(p, s.file.type) || s.deferred.resolve(), s.upload_id = i, s.upload_options = e.extend({}, a), Glbl("Stash.mode").indexOf("multisubmit") > -1 ? (o.upload_ids.unshift(i), o.file_sizes.unshift(p), l.unshift(s)) : (o.upload_ids.push(i), o.file_sizes.push(p), l.push(s))
                        }
                    }), o.upload_ids.length ? (PubSub.publish("StashStream.add_uploading_items", o), PubSub.publish("StashPage.refresh_emptiness_notice"), this.queue.push(l), PubSub.publish("StashUploader.queue_updated", this.queue.length), PubSub.publish("StashStream.refresh_slice", this.queue), Glbl("deviantART.user_agreed_to_submission_policy") || deviantART.pageData["deviantART.user_agreed_to_submission_policy"] ? (this.handlers.dequeue.call(this), void 0) : (PubSub.publish("Stash.show_submission_agreement"), !1)) : !1
                }
            },
            dequeue: function() {
                if (this.uploading) return !1;
                var t = this.next_in_queue();
                if (!t) return PubSub.publish("StashUploader.queue_emptied"), !1;
                this.uploading = !0, PubSub.publish("StashUploader.prepare_next_in_queue", {
                    upload_id: t.upload_id,
                    is_first_in_set: t.is_first_in_set,
                    size: t.file.size || t.file.fileSize
                });
                var s = this;
                vms_feature("stash_nested_stacks") ? (t.upload_options || (t.upload_options = {}), t.is_first_in_set || (t.upload_options.folderid = Glbl("Stash.current_upload_folderid")), t.upload_options.folderid || (t.upload_options.folderid = Glbl("Stash.current_folderid")), e.each({
                    folderid: 36,
                    stack_position: 10,
                    submit_page: 10
                }, function(e, i) {
                    s.$form.find("input[name=" + e + "]").remove(), t.upload_options && t.upload_options[e] && (ddt.log("targeteddrop", "Adding " + e + " upload option to form", t.upload_options[e]), s.$form.append('<input type="hidden" name="' + e + '" value="' + parseInt(t.upload_options[e], i) + '">'))
                })) : e.each({
                    stashid: 36,
                    root_position: 10,
                    stack_position: 10,
                    submit_page: 10
                }, function(e, i) {
                    t.upload_options && t.upload_options[e] ? (ddt.log("targeteddrop", "Adding " + e + " upload option to form", t.upload_options[e]), s.$form.append('<input type="hidden" name="' + e + '" value="' + parseInt(t.upload_options[e], i) + '">')) : s.$form.find("input[name=" + e + "]").remove()
                });
                var i = !0;
                window.File && window.FormData ? this.upload_with_progress(t) : (this.upload_without_progress(t), i = !1), PubSub.publish("StashPage.refresh_emptiness_notice"), PubSub.publish("StashUploader.starting", {
                    upload_id: t.upload_id,
                    item: t,
                    with_progress: i
                })
            },
            upload_onprogress: function(e) {
                if (e.lengthComputable) {
                    var t = {
                        upload_id: this.progress_upload_item.upload_id,
                        size: this.progress_upload_item.file.size || this.progress_upload_item.file.fileSize,
                        progress: e.loaded,
                        total: e.total
                    };
                    PubSub.publish("StashUploader.initialize_progress", t), t.percent = Math.min(100, Math.ceil(100 * (t.progress / t.total))), t.text = t.percent + "%", t.total >= t.progress && PubSub.publish("StashUploader.progress", t)
                }
            },
            upload_onreadystatechange: function(e) {
                if (4 === this.xhr.readyState && !this.xhr.upload_canceled) {
                    this.uploading = !1;
                    var t;
                    try {
                        t = JSON.parse(e.target.responseText)
                    } catch (s) {
                        t = null !== (t = e.target.responseText.match(/Fatal error: .* on line <i>\d+<\/i>/)) ? t[0] : null !== (t = e.target.responseText.match(/<title>(.*)<\/title>/)) ? t[1] : "Unknown error";
                        var t = {
                            status: "error",
                            error: "unknown",
                            error_description: t
                        }
                    }
                    if (!this.current_upload) return this.handlers.dequeue.call(this), void 0;
                    var i = this.current_upload;
                    t && "error" == t.status ? PubSub.publish("StashUploader.error", {
                        upload_id: i.upload_id,
                        response: t,
                        name: i.name || i.fileName || "file"
                    }) : PubSub.publish("StashUploader.complete", {
                        upload_id: i.upload_id,
                        response: t,
                        size: i.file.size || i.file.fileSize
                    }), this.handlers.dequeue.call(this)
                }
                PubSub.publish("StashPage.refresh_emptiness_notice")
            },
            cancel_all: function() {
                PubSub.publish("StashUploader.queue_cleared"), this.queue = [], this.current_upload = void 0, PubSub.publish("StashUploader.queue_updated", this.queue.length), this.xhr && (this.xhr.upload_canceled = !0, this.xhr.abort(), this.uploading = !1), PubSub.publish("StashPage.refresh_emptiness_notice")
            },
            cancel_current_upload: function(e, t) {
                !this.current_upload || t && this.current_upload.upload_id !== t || (this.xhr && (this.xhr.upload_canceled = !0, this.xhr.abort(), this.uploading = !1), this.abort_timer = this.abort_timer || setTimeout(this.reload_after_abort, 2e3), this.remove_current_upload(Glbl("Stash.mode").indexOf("multisubmit") > -1), this.handlers.dequeue.call(this)), PubSub.publish("StashPage.refresh_emptiness_notice")
            },
            upload_complete: function(t, s) {
                PubSub.publish("StashUploader.after_upload_complete", e.extend(s, {
                    last_in_set: this.on_last_in_set(),
                    first_in_set: this.on_first_in_set()
                })), clearTimeout(this.progress_check_timer), this.progress_check_timer = 0, this.upload_progress_data = {}, s && s.response && s.response.cursor && Glbl("Stash.cursor", s.response.cursor), PubSub.publish("StashPage.refresh_emptiness_notice"), PubSub.publish("StashPage.update_pagination"), DiFi.send()
            },
            form_switch: function(t, s) {
                this.$form = s || e("form[id=stash-form]:visible")
            },
            show_agreement: function(t, s) {
                DiFi.pushPost("DASubmitDeviation", "special_terms", ["submitpolicy"], function(t, i) {
                    var a = e(i.response.content);
                    a.removeClass("bubbleview"), a.find("div.catbar").remove();
                    var r = e('<div style="width:500px;">');
                    r.append("<h2>Submission Policy</h2>");
                    var o = e('<div style="margin: 10px 20px; height: 387px; overflow: auto; overflow-x: hidden; overflow-y: scroll; position: relative;">');
                    o.html(a), r.append(o), r.append(a.find("div.btns"));
                    var u = Modals.factory(r, {
                        cssShadows: !0,
                        showCloseButton: !0,
                        showButtonSeparator: !0
                    }),
                        l = function() {
                            return Modals.stack.length > 0 && Modals.pop("closed"), Glbl("deviantART.user_agreed_to_submission_policy", !1), PubSub.publish("deviantART.user_responded_to_submission_policy"), PubSub.publish("StashUploader.cancel_all"), !1
                        };
                    u.addButton("I do not agree", "smbutton-lightgreen", l), u.addButton("I agree", "smbutton-green", function() {
                        return Modals.pop("closed"), Glbl("deviantART.user_agreed_to_submission_policy", !0), PubSub.publish("deviantART.user_responded_to_submission_policy"), DiFi.pushPost("DASubmitDeviation", "agree", ["submitpolicy"], e.noop), DiFi.send(), s ? PubSub.publish("StashSubmitPage.submit_text", s) : PubSub.publish("StashUploader.start_next_in_queue"), !1
                    }), Modals.push(u), e("#modalspace .modal a.x").click(l), e(".modal-button-holder").css("padding-top", "12px"), e("#modalspace .smbutton").css("min-width", "120px"), PubSub.publish("QUnit.StashUploader.agreement_shown")
                }), DiFi.send()
            },
            upload_progress_check: function() {
                var t = this.upload_check_data.last_progress || 0,
                    s = this.upload_check_data.last_ts,
                    i = this.upload_progress_data,
                    a = e.now(),
                    r = this;
                if (i.total && i.progress >= i.total) return console.log("Upload already done - stop checking."), this.progress_check_timer = setTimeout(function() {
                    console.log("Flagged as stalled on complete"), PubSub.publish("CrossPageTracking.push_event", r.get_tracking_data({
                        type: "stall_on_complete"
                    }))
                }, 3e4), void 0;
                if (this.upload_check_data.has_progress) {
                    if (a - s > 6e4) return PubSub.publish("StashUploader.flag_slow_upload", {
                        type: "no_progress_died_60"
                    }), this.progress_check_timer = 0, this.upload_progress_data = {}, console.log("Flagging as failed upload"), void 0;
                    if (a - s > 3e4 && !this.upload_check_data.flagged_stalled) console.log("Flagging as stalled upload"), this.upload_check_data.flagged_stalled = !0, PubSub.publish("CrossPageTracking.push_event", this.get_tracking_data({
                        type: "no_progress_stalled_30"
                    }));
                    else if (i.ts > s) {
                        var o = (i.progress - t) / (i.ts - s);.3 > o && !this.upload_check_data.flagged_slow && (console.log("Flagging as slow upload - " + o + "Kb/s"), this.upload_check_data.flagged_slow = !0, PubSub.publish("CrossPageTracking.push_event", this.get_tracking_data({
                            type: "slow_upload"
                        })))
                    }
                }
                this.upload_check_data.last_progress = i.progress, this.upload_check_data.last_ts = i.ts, this.upload_check_data.total = i.total, this.progress_check_timer = setTimeout(this.handlers.upload_progress_check.bindTo(this), 5e3)
            },
            upload_tracking_progress: function(e, t) {
                t.ts = (new Date).getTime(), this.upload_progress_data = t
            },
            upload_tracking_start: function(t, s) {
                var i = e.now();
                this.progress_check_timer = setTimeout(this.handlers.upload_progress_check.bindTo(this), 5e3), this.upload_progress_data = {
                    progress: 0,
                    ts: i
                }, this.upload_check_data = {
                    last_ts: i,
                    has_progress: s.with_progress
                }
            }
        },
        get_tracking_data: function(e) {
            var t = e.type + (navigator.onLine ? "_online" : "_offline");
            return {
                category: "Submit-SlowUpload",
                action: t,
                days_valid: 3
            }
        },
        constructor: function() {
            this.queue = [], this.uploading = !1;
            var e = this;
            this.reload_after_abort = function() {
                this.queue.length ? this.abort_timer = setTimeout(this.reload_after_abort, 2e3) : (PubSub.publish("StashPageNavigation.reload_view", {
                    minimal: !0,
                    synchronous: !1
                }), this.abort_timer = null)
            }.bindTo(this), DWait.ready([".domready"], function() {
                e.handlers.form_switch.call(e)
            }), PubSub.subscribe([{
                eventname: "StashUploader.enqueue",
                subscriber: this,
                callback: this.handlers.enqueue
            }, {
                eventname: "StashUploader.start_next_in_queue",
                subscriber: this,
                callback: this.handlers.dequeue
            }, {
                eventname: "StashUploader.cancel_all",
                subscriber: this,
                callback: this.handlers.cancel_all
            }, {
                eventname: "StashUploader.cancel",
                subscriber: this,
                callback: this.handlers.cancel_current_upload
            }, {
                eventname: "StashUploader.complete",
                subscriber: this,
                callback: this.handlers.upload_complete
            }, {
                eventname: "StashUploader.starting",
                subscriber: this,
                callback: this.handlers.upload_tracking_start
            }, {
                eventname: "StashUploader.progress",
                subscriber: this,
                callback: this.handlers.upload_tracking_progress
            }, {
                eventname: "Stash.show_submission_agreement",
                subscriber: this,
                callback: this.handlers.show_agreement
            }, {
                eventname: "StashUploader.form_switch",
                subscriber: this,
                callback: this.handlers.form_switch
            }])
        },
        next_in_queue: function() {
            if (void 0 === this.current_upload && 0 === this.queue.length) return void 0;
            if ("root" != Glbl("Stash.view") && PubSub.publish("StashPage.mark_root_as_dirty", !0), void 0 === this.current_upload) this.current_upload = this.queue[0], e.isArray(this.current_upload) && (this.current_upload = this.current_upload[0]), this.current_upload.is_first_in_set = !0, vms_feature("stash_nested_stacks") || "root" == Glbl("Stash.view") && PubSub.publish("Stash.folder_current_name", "");
            else for (var t = 0, s = this.queue.length; s > t; t++) {
                var i = e.inArray(this.current_upload, this.queue[t]);
                if (i > -1) {
                    if (this.queue[t].length - 1 === i) {
                        this.current_upload = this.queue[t + 1], e.isArray(this.current_upload) && (this.current_upload = this.current_upload[0]), this.current_upload && (this.current_upload.is_first_in_set = !0), vms_feature("stash_nested_stacks") || "root" != Glbl("Stash.view") || PubSub.publish("Stash.folder_current_name", ""), this.queue.splice(t, 1);
                        break
                    }
                    this.current_upload = this.queue[t][i + 1], this.current_upload.is_first_in_set = !1;
                    break
                }
            }
            return PubSub.publish("StashUploader.queue_updated", this.queue.length), this.current_upload
        },
        on_last_in_set: function() {
            for (var e = 0, t = this.queue.length; t > e; e++) {
                var s = this.queue[e].length - 1;
                if (this.current_upload === this.queue[e][s]) return !0
            }
            return !1
        },
        on_first_in_set: function() {
            return this.current_upload && this.current_upload.is_first_in_set
        },
        upload_without_progress: function(t) {
            var s = t.file,
                i = this,
                a = {
                    upload_id: t.upload_id,
                    size: t.file.size || t.file.fileSize,
                    progress: 1,
                    total: 1
                };
            PubSub.publish("StashUploader.initialize_progress", a), a.percent = 100, a.text = a.percent + "%", a.total >= a.progress && PubSub.publish("StashUploader.progress", a), DWait.ready("jms/lib/deck.js", function() {
                if (void 0 !== window.DeckUploader) {
                    var a = new DeckUploader(function() {}, {
                        bypass_deckid_check: !0
                    });
                    a.upload(s[0], function(a) {
                        if (a) {
                            if (-1 !== e.inArray(a.privateid || a.assetid || a.deckId, i.already_uploaded_ie)) return;
                            i.already_uploaded_ie.push(a.privateid || a.assetid || a.deckId), i.uploading = !1, "error" == a.status ? PubSub.publish("StashUploader.error", {
                                upload_id: t.upload_id,
                                response: a,
                                name: t.name || t.fileName || "file"
                            }) : PubSub.publish("StashUploader.complete", {
                                upload_id: t.upload_id,
                                response: a,
                                size: t.file.size || t.file.fileSize
                            }), i.handlers.dequeue.call(i), s.remove()
                        }
                    })
                }
            })
        },
        upload_with_progress: function(e) {
            this.xhr = new XMLHttpRequest, void 0 === this.xhr.upload && (this.xhr.upload = {}), this.progress_upload_item = e, this.xhr.upload.onprogress = this.handlers.upload_onprogress.bindTo(this), this.xhr.onreadystatechange = this.handlers.upload_onreadystatechange.bindTo(this), this.xhr.open("POST", this.$form.attr("action"), !0), this.xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest"), this.xhr.setRequestHeader("X-File-Name", encodeURIComponent(e.file.fileName)), this.xhr.setRequestHeader("pragma", "no-cache");
            var t = new FormData;
            this.$form.find("input:hidden").each(function() {
                t.append(this.name, this.value)
            }), t.append("file", e.file), this.xhr.send(t)
        },
        remove_current_upload: function(t) {
            for (var s = this.current_upload, i = {
                upload_id: s.upload_id,
                size: s.file.size || s.file.fileSize
            }, a = 0, r = this.queue.length; r > a; a++) {
                var o = e.inArray(this.current_upload, this.queue[a]);
                if (-1 !== o) {
                    0 === o ? i.is_dead = !0 : (i.is_born = !0, i.idx = o), t ? this.queue[a].splice(o, 1) : this.queue.splice(a, 1), this.current_upload = void 0;
                    break
                }
            }
            PubSub.publish("StashUploader.current_removed", i), PubSub.publish("StashUploader.queue_updated", this.queue.length), PubSub.publish("StashStream.refresh_slice", this.queue)
        },
        check_upload_limits: function(e) {
            var t = e.size || e.fileSize;
            if (t && e.type) if ("image/png" == e.type || "image/jpg" == e.type || "image/jpeg" == e.type || "image/gif" == e.type) {
                if (t > Glbl("StashUploader.image_size_limit")) {
                    var s = Glbl("StashUploader.image_size_limit") / 1024 / 1024;
                    return alert(e.name + " is too large, the limit for images is " + s + " MB"), !1
                }
            } else if ("video/" == e.type.substr(0, 6));
            else if ("text/plain" == e.type) {
                if (t > Glbl("StashUploader.text_size_limit")) {
                    var i = Glbl("StashUploader.text_size_limit") / 1024;
                    return alert(e.name + " is too large, the limit for plain text is " + i + " KB"), !1
                }
            } else if (t > Glbl("StashUploader.default_size_limit")) {
                var s = Glbl("StashUploader.default_size_limit") / 1024 / 1024;
                return alert(e.name + " is too large, the limit for files other than images, text or video is " + s + " MB"), !1
            }
            return !0
        },
        is_viewable_thumb: function(e, t) {
            return e > 0 && this.thumb_size_limit > e && /^image\/(png|jpe?g)$/i.test(t)
        }
    });
    new t
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.uploader.js");
DWait.ready(["jms/lib/jquery/plugins/jquery.exif.js", "jms/lib/pubsub.js", "jms/lib/browser.js"], function() {
    (function(e) {
        var a = Base.extend({
            queue: [],
            handlers: {
                upload_start: function(a, r) {
                    void 0 === r.item || void 0 === window.FileReader || void 0 === window.ArrayBuffer || Browser.isOpera || Browser.isWebkit && e.inArray(Browser.webkitVersion, [535.1, 535.7, 535.19]) >= 0 || (t.queue.push(r.item), t.processing || (t.processing = !0, t.dequeue()))
                },
                image_onload: function(e, a, r, i) {
                    var n = i.target,
                        s = n.width,
                        o = n.height,
                        u = s,
                        d = o;
                    if ("gif" == r) return 150 >= s && 150 >= o && PubSub.publish("StashThumb.set_data_uris", {
                        upload_id: e.upload_id,
                        uris: {
                            original: n.src,
                            150: n.src,
                            "300W": n.src
                        }
                    }), t.dequeue(), void 0;
                    var c = 0,
                        l = 0;
                    switch (a) {
                        case 90:
                            l = -o, u = o, d = s;
                            break;
                        case 180:
                            c = -s, l = -o;
                            break;
                        case 270:
                            c = -s, u = o, d = s
                    }
                    setTimeout(function() {
                        var r = document.createElement("canvas"),
                            i = document.createElement("canvas"),
                            h = u,
                            b = d,
                            g = u,
                            f = d;
                        h > 150 && (b /= h / 150, h = 150), b > 150 && (h /= b / 150, b = 150), g > 300 && (f /= g / 300, g = 300), f > 300 && (g /= f / 300, f = 300), r.width = h, r.height = b, ctx = r.getContext("2d"), ctx.mozImageSmoothingEnabled = !1, ctx.rotate(a * Math.PI / 180), ctx.translate(c, l), ctx.drawImage(n, 0, 0, s, o, 0, 0, h, b), i.width = g, i.height = f, ctx = i.getContext("2d"), ctx.rotate(a * Math.PI / 180), ctx.translate(c, l), ctx.drawImage(n, 0, 0, s, o, 0, 0, g, f), PubSub.publish("StashThumb.set_data_uris", {
                            upload_id: e.upload_id,
                            uris: {
                                150: r.toDataURL(),
                                "300W": i.toDataURL()
                            }
                        }), t.dequeue()
                    }, 0)
                },
                base64_onload: function(e, a, r) {
                    var i = r.target.result.match(/^data:image\/([^;]+);/);
                    if (i = i ? i[1] : "", "gif" != i && "png" != i && "jpg" != i && "jpeg" != i) return t.dequeue(), void 0;
                    var n = new Image;
                    n.onload = t.handlers.image_onload.bindTo(t, e, a, i), setTimeout(function() {
                        n.src = r.target.result
                    })
                },
                binary_onload: function(e, a) {
                    e.deferred.resolve();
                    var r = EXIF.readFromBinaryFile(new BinaryFile(a.target.result)),
                        i = 0;
                    if (r && r.Orientation && r.Orientation > 1) switch (r.Orientation) {
                        case 3:
                            i = 180;
                            break;
                        case 6:
                            i = 90;
                            break;
                        case 8:
                            i = 270
                    }
                    var n = new FileReader;
                    n.onload = t.handlers.base64_onload.bindTo(t, e, i), n.readAsDataURL(e.file)
                }
            },
            constructor: function() {
                this.queue = Array(), this.processing = !1, PubSub.subscribe([{
                    eventname: "StashUploader.starting",
                    subscriber: this,
                    callback: this.handlers.upload_start
                }])
            },
            dequeue: function() {
                if (0 >= t.queue.length) return t.processing = !1, void 0;
                var e = t.queue.shift();
                t.load(e)
            },
            load: function(e) {
                var a = new FileReader;
                a.onload = t.handlers.binary_onload.bindTo(t, e), setTimeout(function() {
                    a.readAsArrayBuffer(e.file)
                })
            }
        }),
            t = new a
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.uploader.previewer.js")
});
(function(e) {
    var s = Base.extend({
        _uploading: !1,
        handlers: {
            extend: function(e, s) {
                this.extend(s), void 0 !== s.pluggedin && s.pluggedin.call(this)
            },
            upload_zone_start: function() {
                -1 === Glbl("Stash.mode").indexOf("no_upload") && -1 === Glbl("Stash.mode").indexOf("readonly") && (this.bind_change(), PubSub.subscribe([{
                    eventname: "StashUploadZone.start",
                    subscriber: this,
                    callback: this.handlers.upload_zone_start
                }, {
                    eventname: "StashUploadZone.stop",
                    subscriber: this,
                    callback: this.handlers.upload_zone_stop
                }, {
                    eventname: "StashUploader.starting",
                    subscriber: this,
                    callback: this.handlers.upload_start
                }, {
                    eventname: "StashUploader.progress",
                    subscriber: this,
                    callback: this.handlers.upload_progress
                }, {
                    eventname: "StashUploader.error",
                    subscriber: this,
                    callback: this.handlers.upload_error
                }, {
                    eventname: "StashUploader.cancel",
                    subscriber: this,
                    callback: this.handlers.upload_cancel
                }, {
                    eventname: "StashUploader.cancel_all",
                    subscriber: this,
                    callback: this.handlers.upload_cancel
                }, {
                    eventname: "StashUploader.complete",
                    subscriber: this,
                    callback: this.handlers.upload_complete
                }, {
                    eventname: "StashUploader.form_switch",
                    subscriber: this,
                    callback: this.handlers.upload_form_switch
                }]))
            },
            upload_zone_stop: function() {
                var s = e("input.stash-file[type=file]");
                s.unbind("change.stashpage"), PubSub.unsubscribe([{
                    eventname: "StashUploadZone.stop",
                    subscriber: this
                }, {
                    eventname: "StashUploader.starting",
                    subscriber: this
                }, {
                    eventname: "StashUploader.progress",
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
                    eventname: "StashUploader.form_switch",
                    subscriber: this
                }])
            },
            upload_start: function() {
                this.upload_started(), PubSub.publish("StashPageTitle.save"), PubSub.publish("StashPageTitle.set", "Uploading...")
            },
            upload_progress: function(e, s) {
                var a = Math.min(100, Math.ceil(100 * (s.progress / s.total))),
                    t = a + "%";
                a > 0 && PubSub.publish("StashPageTitle.set", "Uploading: " + t)
            },
            upload_error: function(e, s) {
                !Glbl("Site.is_stash") && Glbl("Submit.is_new_submit_form") && PubSub.publish("DaGa.track_event", {
                    category: "Submit",
                    action: "new_upload_error"
                }), this.upload_completed(), alert("Error uploading " + s.name + ": " + s.response.error_description), PubSub.publish("StashUploader.cancel_all")
            },
            upload_complete: function(e, s) {
                if (!Glbl("Site.is_stash") && Glbl("Submit.is_new_submit_form") && PubSub.publish("DaGa.track_event", {
                    category: "Submit",
                    action: "new_upload_success"
                }), this.upload_completed(), s.response.usage && s.response.quota) {
                    var a = GMI.query("GMStashQuota")[0];
                    a && a.setProgress(parseFloat(s.response.usage), parseFloat(s.response.quota))
                }
            },
            upload_cancel: function() {
                this.upload_completed()
            },
            upload_form_switch: function(s, a) {
                this._$upload_form = a || e("form[id=stash-form]:visible"), this.bind_change()
            },
            file_onchange: function(s) {
                if (Browser.isIE && this._uploading) return alert("Please wait until the current item is finished uploading before you start a new one."), void 0;
                var a = s.target,
                    t = {
                        files: a.files
                    };
                if (t.options = this.extract_upload_options.call(this), !a.files || 0 >= a.files.length || Browser.isGecko && void 0 === window.FormData) if (Browser.isIE) {
                    var i = this._$upload_form.clone(!0).hide();
                    i.find("input[type=file]").remove(), i[0].appendChild(this._$upload_form.find("input[type=file]").unbind("change.stashpage")[0]), this._$upload_form.append(i.find("input[type=file]").clone()), this._$upload_form.find("input[type=file]").bind("change.stashpage", this.handlers.file_onchange.bindTo(this)), e("body").append(i), PubSub.publish("StashUploader.enqueue", {
                        files: [{
                            file: i
                        }],
                        options: t.options
                    })
                } else {
                    var i = this._$upload_form.clone(!0, !0).hide();
                    e("body").append(i), PubSub.publish("StashUploader.enqueue", {
                        files: [{
                            file: i
                        }],
                        options: t.options
                    })
                } else this.upload_fancy(t);
                Browser.isKHTML && (e(a).siblings(".smbutton-file-upload"), $file = e(a), $clone = $file.clone(!0), $file.replaceWith($clone))
            },
            stash_folder_current_name: function(e, s) {
                vms_feature("stash_nested_stacks") || this._$upload_form && this._$upload_form.find("input[name=folder_name]").val(s)
            },
            stash_folder_current_id: function(e, s) {
                vms_feature("stash_nested_stacks") && (Glbl("Stash.current_folderid", s), this._$upload_form && this._$upload_form.find("input[name=folderid]").val(parseInt(s + "", 36).toString(10)))
            }
        },
        constructor: function() {
            var e = [{
                eventname: "StashUploadZone.js_extend",
                subscriber: this,
                callback: this.handlers.extend
            }, {
                eventname: "StashEmbedded.start",
                subscriber: this,
                callback: this.handlers.upload_zone_start
            }, {
                eventname: "StashEmbedded.stop",
                subscriber: this,
                callback: this.handlers.upload_zone_stop
            }, {
                eventname: "Stash.start",
                subscriber: this,
                callback: this.handlers.upload_zone_start
            }, {
                eventname: "Stash.stop",
                subscriber: this,
                callback: this.handlers.upload_zone_stop
            }];
            vms_feature("stash_nested_stacks") ? e.push({
                eventname: "Stash.folder_current_id",
                subscriber: this,
                callback: this.handlers.stash_folder_current_id
            }) : e.push({
                eventname: "Stash.folder_current_name",
                subscriber: this,
                callback: this.handlers.stash_folder_current_name
            }), PubSub.subscribe(e)
        },
        bind_change: function() {
            var s = e("input.stash-file[type=file]");
            window.File && !Browser.isOpera && s.attr("multiple", !0), s.unbind("change.stashpage").bind("change.stashpage", this.handlers.file_onchange.bindTo(this))
        },
        upload_fancy: function(s) {
            if (s.files) {
                var a = e.makeArray(s.files);
                if (vms_feature("stash_nested_stacks")) if (Glbl("Stash.mode").indexOf("invisible") > -1) e.each(a, function(e, a) {
                    PubSub.publish("StashUploader.enqueue", {
                        files: [{
                            file: a
                        }],
                        options: s.options
                    })
                });
                else {
                    var t = [];
                    e.each(a, function(e, s) {
                        t.unshift({
                            file: s
                        })
                    }), PubSub.publish("StashUploader.enqueue", {
                        files: t,
                        options: s.options
                    })
                } else if ("root" === Glbl("Stash.view") || Glbl("Stash.mode").indexOf("invisible") > -1) {
                    var t = [];
                    e.each(a, function(e, s) {
                        t.unshift({
                            file: s
                        })
                    }), PubSub.publish("StashUploader.enqueue", {
                        files: t,
                        options: s.options
                    })
                } else e.each(a, function(e, a) {
                    PubSub.publish("StashUploader.enqueue", {
                        files: [{
                            file: a
                        }],
                        options: s.options
                    })
                })
            }
        },
        upload_started: function() {
            this._uploading = !0, e(window).bind("beforeunload.stash_upload", function() {
                return "You are currently uploading files, are you sure you want to cancel the upload(s)?"
            })
        },
        upload_completed: function() {
            this._uploading && PubSub.publish("StashPageTitle.load"), this._uploading = !1, e(window).unbind("beforeunload.stash_upload")
        }
    });
    new s
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.uploadzone.js");
(function(e) {
    var s = {
        dnd__handlers: {
            body_ondragover: function(s) {
                var a = s.originalEvent.dataTransfer,
                    t = a && a.types && e.makeArray(a.types);
                return t && -1 != t.indexOf("Files") && -1 == t.indexOf("text/plain") ? (s.preventDefault(), Glbl("StashThumbDnd.hovered") || e(s.target).closest(".stash-thumb-container").length ? (this.already_hovered && (e(".stash-upload-box").removeClass("stash-file-hover"), e("body").removeClass("dragover-file"), this.already_hovered = !1), void 0) : (this.already_hovered || (e(".stash-upload-box").addClass("stash-file-hover"), e("body").addClass("dragover-file"), this.already_hovered = !0), void 0)) : void 0
            },
            body_ondragleave: function() {
                this.already_hovered && (e("body").removeClass("dragover-file"), e(".stash-upload-box").removeClass("stash-file-hover"), this.already_hovered = !1)
            },
            body_ondrop: function(s) {
                if (dragtimeout = setTimeout(function() {
                    e("body").removeClass("dragover-file")
                }, 1e3), e(".stash-upload-box").removeClass("stash-file-hover"), - 1 !== Glbl("Stash.mode").indexOf("rich") && Glbl("Minibrowse.opened") && PubSub.publish("Minibrowse.close"), - 1 === Glbl("Stash.mode").indexOf("no_upload")) {
                    var a = s.originalEvent.dataTransfer;
                    if (a && a.files && a.files.length) {
                        s.preventDefault();
                        for (var t = 0; a.files.length > t; t++) {
                            var d = !1;
                            if (0 == a.files[t].size && (d = !0), Browser.isChrome && Browser.isWin && 0 == a.files[t].size % 4096 && "" == a.files[t].type && (d = !0), d) return alert("HTML5 drag & drop only supports files.\n\nIf this is a folder, please open it first, select all its files, and drag them to your Sta.sh"), void 0
                        }
                        a.options = this.extract_upload_options.call(this), this.upload_fancy(a)
                    }
                }
            },
            start: function() {
                if (-1 === Glbl("Stash.mode").indexOf("no_upload") && -1 === Glbl("Stash.mode").indexOf("readonly") && !Browser.isOpera) {
                    var s = this;
                    e("body").off("dragover.page_dnd").on("dragover.page_dnd", function(a) {
                        a.preventDefault(), e.debounce(100, !0, s.body_ondragover.call(s.thisref, a))
                    }).off("dragleave.page_dnd").on("dragleave.page_dnd", e.debounce(100, !0, this.body_ondragleave.bindTo(this.thisref))).off("drop.page_dnd").on("drop.page_dnd", this.body_ondrop.bindTo(this.thisref))
                }
            },
            stop: function() {
                e("body").unbind(".page_dnd")
            }
        },
        extract_upload_options: function() {
            var s = e(".active-dragover"),
                a = {};
            if (s.length) {
                ddt.log("targeteddrop", "dropped file on thumb", s);
                var t = s.gmi1().gmi_args.stashid;
                s.removeClass("active-dragover"), a = vms_feature("stash_nested_stacks") ? {
                    insertion_mode: "merge",
                    relative_deviationid: s.gmi1().gmi_args.deviationid,
                    folderid: t
                } : {
                    insertion_mode: "merge",
                    relative_deviationid: s.gmi1().gmi_args.deviationid,
                    stashid: t
                }
            }
            var d = e(".hovering");
            if (d.length) {
                ddt.log("targeteddrop", "dropped file on gap", d);
                var r = d.closest(".stash-thumb-container").gmi1().gmi_args.deviationid,
                    o = GMI.query("StashThumb", {
                        match: {
                            deviationid: r
                        }
                    })[0],
                    i = GMI.query(e(".stash-stream:visible")[0], "StashThumb"),
                    n = e.inArray(o, i) + Glbl("Stash.current_offset");
                a = {
                    relative_deviationid: r
                }, d.removeClass("hovering"), d.hasClass("left_reorder_zone") && (a.insertion_mode = "insert_before"), d.hasClass("right_reorder_zone") && (a.insertion_mode = "insert_after", n++), vms_feature("stash_nested_stacks") ? a.stack_position = n : "root" == Glbl("Stash.view") ? a.root_position = n : a.stack_position = n
            }
            return a
        },
        pluggedin: function() {
            this.dnd__handlers.thisref = this, PubSub.subscribe([{
                eventname: "StashEmbedded.start",
                subscriber: this.dnd__handlers,
                callback: this.dnd__handlers.start
            }, {
                eventname: "StashEmbedded.stop",
                subscriber: this.dnd__handlers,
                callback: this.dnd__handlers.stop
            }, {
                eventname: "Stash.start",
                subscriber: this.dnd__handlers,
                callback: this.dnd__handlers.start
            }, {
                eventname: "Stash.stop",
                subscriber: this.dnd__handlers,
                callback: this.dnd__handlers.stop
            }])
        }
    };
    PubSub.publish("StashUploadZone.js_extend", s)
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.uploadzone.dnd.js");
(function() {
    Glbl.dflt("StashEmbedded.expand_offset", 0);
    var e = Base.extend({
        _upload_queue_length: 0,
        handlers: {
            start: function() {
                PubSub.subscribe([{
                    eventname: "Stash.folder_open",
                    subscriber: this,
                    callback: this.handlers.open_folder
                }, {
                    eventname: "Stash.root_open",
                    subscriber: this,
                    callback: this.handlers.open_root
                }, {
                    eventname: "Stash.pagination",
                    subscriber: this,
                    callback: this.handlers.pagination
                }]), Glbl("StashStream.navigation_keyboard_disabled", !0), Glbl("StashStream.minibrowse_keyboard_disabled", !0)
            },
            stop: function() {
                PubSub.unsubscribe([{
                    eventname: "Stash.folder_open",
                    subscriber: this
                }, {
                    eventname: "Stash.root_open",
                    subscriber: this
                }, {
                    eventname: "Stash.pagination",
                    subscriber: this
                }]), Glbl("StashStream.is_any_active") && PubSub.publish("StashStream.sleep")
            },
            open_folder: function(e, t) {
                Glbl("Stash.current_offset", 0), Glbl.minus("Stash.browselimit", Glbl("StashEmbedded.expand_offset")), Glbl("StashEmbedded.expand_offset", 0), this._open_folder(t.id)
            },
            folder_loaded: function(e, t) {
                PubSub.publish("Stash.folder_current_name", t.response.content.name), Glbl("Stash.current_folderid", t.response.content.id), PubSub.publish("StashEmbedded.folder_loaded", t.response.content.datex), this._contents_loaded()
            },
            open_root: function() {
                Glbl("Stash.current_offset", 0), Glbl.minus("Stash.browselimit", Glbl("StashEmbedded.expand_offset")), Glbl("StashEmbedded.expand_offset", 0), this._open_root()
            },
            root_loaded: function(e, t) {
                vms_feature("stash_nested_stacks") || Glbl("Stash.current_folderid", 0), PubSub.publish("StashEmbedded.root_loaded", t.response.content.datex), this._contents_loaded()
            },
            pagination: function(e, t) {
                Glbl("Stash.current_offset", t), this._reload_with_new_offset()
            },
            upload_queue_update: function(e, t) {
                this._upload_queue_length = t
            },
            stream_expand: function() {
                var e = Glbl("Stash.browselimit") - Glbl("StashEmbedded.expand_offset");
                Glbl.plus("Stash.browselimit", e), Glbl.plus("StashEmbedded.expand_offset", e), this._reload_with_new_offset()
            }
        },
        constructor: function() {
            PubSub.subscribe([{
                eventname: "StashEmbedded.start",
                subscriber: this,
                callback: this.handlers.start
            }, {
                eventname: "StashEmbedded.stop",
                subscriber: this,
                callback: this.handlers.stop
            }, {
                eventname: "StashUploader.queue_updated",
                subscriber: this,
                callback: this.handlers.upload_queue_update
            }, {
                eventname: "StashEmbedded.stream_expand",
                subscriber: this,
                callback: this.handlers.stream_expand
            }])
        },
        _contents_loaded: function() {
            GMI.query("StashStream")
        },
        _open_folder: function(e) {
            Glbl("StashStream.is_any_active") && PubSub.publish("StashStream.sleep"), Glbl("Stash.view", "folder"), DiFi.pushPost("Stashes", "get_folder_stream", [e, Math.max(0, Glbl("Stash.current_offset") + Glbl("StashEmbedded.expand_offset") - this._upload_queue_length), Glbl("Stash.current_offset") + Glbl("StashEmbedded.expand_offset"), Glbl("Stash.filter"), Glbl("Stash.browselimit") - Glbl("StashEmbedded.expand_offset")], this.handlers.folder_loaded.bindTo(this)), DiFi.send()
        },
        _open_root: function() {
            Glbl("StashStream.is_any_active") && PubSub.publish("StashStream.sleep"), Glbl("Stash.view", "root"), DiFi.pushPost("Stashes", "get_root_stream", [Glbl("Stash.current_offset") + Glbl("StashEmbedded.expand_offset"), Glbl("Stash.browselimit") - Glbl("StashEmbedded.expand_offset"), Glbl("Stash.filter")], this.handlers.root_loaded.bindTo(this)), DiFi.send()
        },
        _reload_with_new_offset: function() {
            "root" == Glbl("Stash.view") ? this._open_root() : this._open_folder(Glbl("Stash.current_folderid"))
        }
    });
    new e
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.embedded.js");
DWait.ready(["jms/lib/pubsub.js", "jms/lib/jquery/plugins/jquery.contenteditable.js"], function() {
    (function(e) {
        var t = Base.extend({
            handlers: {
                extras_loaded: function() {
                    e("#deviation_title").contenteditable({
                        type: "singleline",
                        max_length: 50,
                        save_callback: this.handlers.update_edited_deviation_title.bindTo(this)
                    }), vms_feature("writer_descriptions") && Function.prototype.bind ? DWait.ready(["jms/pages/writeranywhere/core.js", "jms/pages/writeranywhere/factory.js", "jms/pages/writeranywhere/stashdesc.js"], bind(this, function() {
                        WriterAnywhereFactory && !this.descriptionwriter && WriterAnywhereFactory.detachAll(!0, !0).done(bind(this, function() {
                            WriterAnywhereFactory.getInto.apply(this, ["stashdesc", e("#deviation_description"), "descriptionwriter"])
                        }))
                    })) : e("#deviation_description").contenteditable({
                        type: "multiline",
                        before_callback: this.handlers.before_description_edition,
                        after_callback: this.handlers.after_description_edition,
                        save_callback: this.handlers.update_edited_deviation_description.bindTo(this),
                        unsaved_text_to_show_if_empty_value_has_been_submitted: "Click to add Description"
                    })
                },
                update_webpage: function() {
                    this.descriptionwriter && this.descriptionwriter.detach(!0, !0).done(bind(this, function() {
                        this.descriptionwriter = null
                    }))
                },
                update_edited_deviation_title: function(e, t) {
                    this.handlers._save_edited_content("deviation_title", t, e)
                },
                update_window_title: function(e, t) {
                    var i = "Submit";
                    window.document.title != i ? (i = Glbl("Site.is_stash") || !deviantART.pageData.deviation_editor.is_published ? "-" : "by", window.document.title = window.document.title.replace(RegExp("^.+" + i), t.new_title + " " + i)) : window.document.title = t.new_title + " - Submit"
                },
                before_description_edition: function() {
                    var t = e(this).siblings(".original-text");
                    e(this).data("previous_content", e(this).html()).html(t.html().replace(/\n/g, "<br>"))
                },
                after_description_edition: function() {
                    var t = e(this).siblings(".original-text");
                    e(this).html() == t.html() && e(this).html(e(this).data("previous_content"))
                },
                update_edited_deviation_description: function(e, t) {
                    this.handlers._save_edited_content("deviation_description", t, e)
                },
                update_edited_deviation_description_from_writer: function(e, t) {
                    this.handlers._save_edited_content("deviation_description", null, t)
                },
                redescribe_difi_callback: function(t, i) {
                    if (t) {
                        var n = e("#deviation_description"),
                            a = vms_feature("writer_descriptions") ? n.closest(".deviation-description-writer").siblings(".original-text") : n.siblings(".original-text");
                        !vms_feature("writer_descriptions") && i.response.content.description.length && n.html(i.response.content.description), a.text(i.response.content.original), PubSub.publish("Minibrowse.uncache", deviantART.pageData.privateid)
                    } else alert(i.response.content.error.replace("Deviation", "Item"))
                },
                rename_difi_callback: function(t, i) {
                    if (t) {
                        var n = i.request.args[1];
                        PubSub.publish("Stash.title_changed", {
                            new_title: n
                        });
                        var a = GMI.query("StashThumb", {
                            match: {
                                deviationid: deviantART.pageData.deviationid
                            }
                        });
                        a.length && a[0].controls__set_thumb_title(n), PubSub.publish("Minibrowse.uncache", deviantART.pageData.privateid), e("#gmi-ResourcePageDisplayPane .journal-wrapper").length && e("#gmi-ResourcePageDisplayPane .journal-wrapper .gr-top .metadata > h2:first-child > a").html(n)
                    } else alert(i.response.content.error.replace("Deviation", "Item"));
                    return t
                },
                _save_edited_content: function(e, t, i) {
                    switch (e) {
                        case "deviation_title":
                            DiFi.pushPost("Deviation", "UpdateTitle", [deviantART.pageData.deviationid, i], this.rename_difi_callback), DiFi.send();
                            break;
                        case "deviation_description":
                            DiFi.pushPost("Deviation", "UpdateDescription", [deviantART.pageData.deviationid, i], this.redescribe_difi_callback), DiFi.send();
                            break;
                        default:
                            console.log("can't save element named", e)
                    }
                }
            },
            constructor: function() {
                PubSub.subscribe([{
                    eventname: "DeviationExtras.loaded",
                    subscriber: this,
                    callback: this.handlers.extras_loaded
                }, {
                    eventname: "Stash.title_changed",
                    subscriber: this,
                    callback: this.handlers.update_window_title
                }, {
                    eventname: "gWebPage.update",
                    subscriber: this,
                    callback: this.handlers.update_webpage
                }, {
                    eventname: "DescriptionWriter.sync",
                    subscriber: this,
                    callback: this.handlers.update_edited_deviation_description_from_writer
                }])
            }
        });
        new t
    })(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.deviation.js")
});
DWait.ready(["jms/pages/superbrowse/preview_stream.js", "jms/pages/superbrowse/preview_selection.js"], function() {
    (function(e) {
        window.StashPreviewStreamSelection = PreviewStreamSelection.extend({
            streamType: "StashPreviewStreamSelection",
            getAllSelectable: function() {
                var t, a, s;
                if (!Glbl("StashStream.is_any_active")) return [];
                var r = e(".stash-" + Glbl("Stash.view") + "-stream .already-uploaded .tt-a");
                for (t = [], a = 0; s = r[a]; a++) this.isSelectable(s) && t.push(s);
                return t
            },
            isSelectable: function(t) {
                var a = e(t).closest(".stash-thumb-container"),
                    s = GMI.query(a[0], "StashThumb")[0],
                    r = GMI.up(a[0], "StashStream");
                return t.innerHTML && r && r.active && s && "flat" == s.gmi_args.type ? !0 : !1
            }
        })
    })(jQuery), window.DWait && DWait.run("jms/pages/superbrowse/types/stash_preview_stream.js")
});
(function(t) {
    var a = Base.extend({
        key_down_map: {
            38: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.up"
            }, {
                alt: !1,
                shift: !0,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.select_up"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.select_up_cumulative"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.select_up_cumulative"
            }],
            40: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.down"
            }, {
                alt: !1,
                shift: !0,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.select_down"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.select_down_cumulative"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.select_down_cumulative"
            }],
            37: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.left"
            }, {
                alt: !1,
                shift: !0,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.select_left"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.select_left_cumulative"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.select_left_cumulative"
            }],
            39: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.right"
            }, {
                alt: !1,
                shift: !0,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.select_right"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.select_right_cumulative"
            }, {
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.select_right_cumulative"
            }],
            16: [{
                alt: !1,
                shift: !0,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.shift"
            }],
            65: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.select_all"
            }],
            77: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !0,
                broadcast: "StashKeyboard.merge"
            }],
            8: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.delete"
            }],
            46: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.delete"
            }],
            13: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.enter"
            }]
        },
        key_up_map: {
            65: [{
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.select_all"
            }],
            77: [{
                alt: !1,
                shift: !1,
                ctrl: !0,
                meta: !1,
                broadcast: "StashKeyboard.merge"
            }],
            27: [{
                alt: !1,
                shift: !1,
                ctrl: !1,
                meta: !1,
                broadcast: "StashKeyboard.escape"
            }]
        },
        handlers: {
            press: function(t) {
                if (-1 === Glbl("Stash.mode").indexOf("plain")) {
                    var a = "keydown" == t.type ? e.key_down_map : e.key_up_map;
                    if (a[t.keyCode]) for (var s, r = a[t.keyCode], l = 0, c = r.length; c > l;) if (s = r[l++], t.metaKey == s.meta && t.altKey == s.alt && t.shiftKey == s.shift && t.ctrlKey == s.ctrl) return PubSub.publish(s.broadcast, t), void 0
                }
            }
        },
        constructor: function() {
            t(document).on("keydown.stashkeyboard, keyup.stashkeyboard", this.handlers.press)
        }
    }),
        e = new a
})(jQuery), window.DWait && DWait.run("jms/pages/stash/stash.keyboard.js");
if (window.DWait) {
    DWait.count()
}

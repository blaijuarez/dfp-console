(function() {

    var window = this, document = this.document;

    window.DFPConsole = {"slots":{},"startTime":performance.now()};
    var loadDFPConsole = setInterval(function() {console.info("Cargando DFP Console...")},1000),
        k, n = this, r = function (a) {
            return void 0 !== a
        }, aa = function () {
        }, ba = function (a) {
            var b = typeof a;
            if ("object" == b)if (a) {
                if (a instanceof Array)return "array";
                if (a instanceof Object)return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c)return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
            } else return "null"; else if ("function" == b && "undefined" == typeof a.call)return "object";
            return b
        }, t = function (a) {
            return "array" == ba(a)
        }, ca = function (a) {
            var b = ba(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        }, v = function (a) {
            return "string" == typeof a
        }, da = function (a) {
            return "boolean" == typeof a
        }, w = function (a) {
            return "number" == typeof a
        }, ea = function (a) {
            return "function" == ba(a)
        }, x = function (a) {
            var b = typeof a;
            return "object" ==
                b && null != a || "function" == b
        }, fa = "closure_uid_" + (1E9 * Math.random() >>> 0), ga = 0, ha = function (a, b, c) {
            return a.call.apply(a.bind, arguments)
        }, ia = function (a, b, c) {
            if (!a)throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function () {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function () {
                return a.apply(b, arguments)
            }
        }, y = function (a, b, c) {
            y = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ?
                ha : ia;
            return y.apply(null, arguments)
        }, ja = function (a, b) {
            var c = a.split("."), d = n;
            c[0] in d || !d.execScript || d.execScript("var " + c[0]);
            for (var e; c.length && (e = c.shift());)!c.length && r(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
        }, z = function (a, b) {
            function c() {
            }

            c.prototype = b.prototype;
            a.qa = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Eb = function (a, c, f) {
                for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)g[h - 2] = arguments[h];
                return b.prototype[c].apply(a, g)
            }
        };
    var ka = function () {
        return n.googletag || (n.googletag = {})
    }, A = function (a, b) {
        var c = ka();
        c.hasOwnProperty(a) || (c[a] = b)
    }, la = function (a, b) {
        a.addEventListener ? a.addEventListener("load", b, !1) : a.attachEvent && a.attachEvent("onload", b)
    }, ma = function (a, b) {
        a.addEventListener ? a.addEventListener("beforeunload", b, !1) : a.attachEvent && a.attachEvent("onbeforeunload", b)
    };
    var na = function (a, b) {
        this.l = a;
        this.j = b || []
    };
    na.prototype.getMessageId = function () {
        return this.l
    };
    na.prototype.getMessageArgs = function () {
        return this.j
    };
    var oa = function (a, b, c, d, e) {
        this.l = new Date;
        this.v = d || null;
        this.u = c || null;
        this.m = a;
        this.o = b;
        this.j = e || null
    };
    k = oa.prototype;
    k.getSlot = function () {
        return this.v
    };
    k.getService = function () {
        return this.u
    };
    k.getLevel = function () {
        return this.m
    };
    k.getTimestamp = function () {
        return this.l
    };
    k.getMessage = function () {
        return this.o
    };
    k.getReference = function () {
        return this.j
    };
    var pa = ["Debug", "Info", "Warning", "Error", "Fatal"];
    oa.prototype.toString = function () {
        var a = this.l.toTimeString() + ": " + pa[this.m] + ": " + this.o;
        this.j && (a += " Duration: " + (this.l.getTime() - this.j.getTimestamp().getTime()) + "ms.");
        return a
    };
    var qa = function () {
        this.l = []
    };
    qa.prototype.getAllEvents = function () {
        return this.l
    };
    qa.prototype.getEventsByService = function (a) {
        return ra(this, function (b) {
            return b.getService() === a
        })
    };
    qa.prototype.getEventsBySlot = function (a) {
        return ra(this, function (b) {
            return b.getSlot() === a
        })
    };
    qa.prototype.getEventsByLevel = function (a) {
        return ra(this, function (b) {
            return b.getLevel() >= a
        })
    };
    var ra = function (a, b) {
        for (var c = [], d = 0; d < a.l.length; ++d)b(a.l[d]) && c.push(a.l[d]);
        return c
    };
    qa.prototype.log = function (a, b, c, d, e) {
        a = new oa(a, b, c, d, e);
        this.l.push(a);
        return a
    };
    qa.prototype.info = function (a, b, c, d) {
        return this.log(1, a, b, c, d)
    };
    qa.prototype.j = function (a, b, c, d) {
        return this.log(2, a, b, c, d)
    };
    qa.prototype.error = function (a, b, c, d) {
        return this.log(3, a, b, c, d)
    };
    var sa = function () {
        var a = ka();
        return a.debug_log || (a.debug_log = new qa)
    };
    A("getEventLog", sa);
    var B = function (a) {
            return function () {
                return new na(a, [])
            }
        }, C = function (a) {
            return function (b) {
                return new na(a, [b])
            }
        }, D = function (a) {
            return function (b, c) {
                return new na(a, [b, c])
            }
        }, ua = function (a) {
            return function (b, c, d) {
                return new na(a, [b, c, d])
            }
        }, wa = function (a) {
            return "[" + va(a, function (a) {
                    return v(a) ? "'" + a + "'" : t(a) ? wa(a) : String(a)
                }).join(", ") + "]"
        }, xa = B(1), ya = C(2), za = C(3), Aa = C(4), Ba = C(5), Ca = C(6), Da = B(8), Ea = ua(9), Fa = ua(10), Ga = D(12), Ha = C(13), Ia = C(14), Ja = B(16), Ka = ua(17), La = B(19), Ma = C(20), Na = C(21), Oa = D(22), Pa =
            D(23), Qa = C(26), Ra = C(27), Sa = C(28), Ta = C(30), Ua = D(31), Va = B(34), Wa = C(35), Xa = ua(36), Ya = ua(37), Za = B(38), $a = C(39), ab = D(40), bb = B(42), cb = D(43), db = B(44), eb = B(45), fb = C(46), gb = C(47), hb = C(48), ib = B(49), jb = B(50), kb = B(52), lb = D(53), mb = D(54), nb = C(55), ob = D(57), pb = ua(58), qb = C(59), rb = C(60), sb = D(61), tb = D(62), ub = C(63), vb = D(64), wb = C(65), xb = B(66), yb = B(67), zb = B(68), Ab = B(69), Bb = B(70), Cb = B(71), Db = B(72), Eb = C(74), Fb = C(75), Gb = ua(77), Hb = C(78), Ib = B(79), Jb = C(80), Kb = D(82), Lb = D(84), Mb = C(85), Nb = B(87), Ob = ua(88), Pb = C(90), Qb = C(92), Rb = C(93),
        Sb = C(94), Tb = C(95), F = function (a, b) {
            var c = wa(b), c = c.substring(1, c.length - 1);
            return new na(96, [a, c])
        }, Ub = C(97), Vb = C(98), Wb = C(99), Xb = C(100), Yb = D(101);
    var Zb = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, Zb); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    z(Zb, Error);
    Zb.prototype.name = "CustomError";
    var $b;
    var ac = function (a) {
            return /^[\s\xa0]*$/.test(a)
        }, bc = function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, jc = function (a) {
            if (!cc.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(dc, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(ec, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(fc, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(gc, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(hc, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(ic, "&#0;"));
            return a
        }, dc = /&/g, ec = /</g, fc = />/g, gc = /"/g, hc = /'/g, ic = /\x00/g, cc = /[\x00&<>"']/,
        mc = function (a) {
            return -1 != a.indexOf("&") ? "document" in n ? kc(a) : lc(a) : a
        }, kc = function (a) {
            var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'}, c;
            c = n.document.createElement("div");
            return a.replace(nc, function (a, e) {
                var f = b[a];
                if (f)return f;
                if ("#" == e.charAt(0)) {
                    var g = Number("0" + e.substr(1));
                    isNaN(g) || (f = String.fromCharCode(g))
                }
                f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
                return b[a] = f
            })
        }, lc = function (a) {
            return a.replace(/&([^;]+);/g, function (a, c) {
                switch (c) {
                    case "amp":
                        return "&";
                    case "lt":
                        return "<";
                    case "gt":
                        return ">";
                    case "quot":
                        return '"';
                    default:
                        if ("#" == c.charAt(0)) {
                            var d = Number("0" + c.substr(1));
                            if (!isNaN(d))return String.fromCharCode(d)
                        }
                        return a
                }
            })
        }, nc = /&([^;\s<&]+);?/g, oc = {
            "\x00": "\\0",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\x0B",
            '"': '\\"',
            "\\": "\\\\",
            "<": "<"
        }, pc = {"'": "\\'"}, qc = function (a) {
            a = String(a);
            for (var b = ['"'], c = 0; c < a.length; c++) {
                var d = a.charAt(c), e = d.charCodeAt(0), f = c + 1, g;
                if (!(g = oc[d])) {
                    if (!(31 < e && 127 > e))if (d in pc)d = pc[d]; else if (d in oc)d = pc[d] = oc[d]; else {
                        e =
                            d;
                        g = d.charCodeAt(0);
                        if (31 < g && 127 > g)e = d; else {
                            if (256 > g) {
                                if (e = "\\x", 16 > g || 256 < g)e += "0"
                            } else e = "\\u", 4096 > g && (e += "0");
                            e += g.toString(16).toUpperCase()
                        }
                        d = pc[d] = e
                    }
                    g = d
                }
                b[f] = g
            }
            b.push('"');
            return b.join("")
        }, rc = function (a) {
            return null == a ? "" : String(a)
        }, sc = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var tc = function (a, b) {
            if (v(a))return v(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
            return -1
        }, G = function (a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
        }, uc = function (a, b) {
            for (var c = a.length, d = [], e = 0, f = v(a) ? a.split("") : a, g = 0; g < c; g++)if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
            return d
        }, va = function (a, b, c) {
            for (var d = a.length, e = Array(d), f = v(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        vc = function (a, b) {
            var c = 0;
            G(a, function (d, e) {
                c = b.call(void 0, c, d, e, a)
            });
            return c
        }, wc = function (a, b) {
            for (var c = a.length, d = v(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return !0;
            return !1
        }, yc = function (a, b) {
            var c = xc(a, b, void 0);
            return 0 > c ? null : v(a) ? a.charAt(c) : a[c]
        }, xc = function (a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
            return -1
        }, zc = function (a, b) {
            return 0 <= tc(a, b)
        }, Ac = function (a, b) {
            zc(a, b) || a.push(b)
        }, Bc = function (a, b) {
            var c = tc(a,
                b);
            0 <= c && Array.prototype.splice.call(a, c, 1)
        }, Cc = function (a) {
            return Array.prototype.concat.apply(Array.prototype, arguments)
        }, Dc = function (a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
                return c
            }
            return []
        }, Ec = function (a, b, c) {
            return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
        }, Fc = function (a) {
            for (var b = {}, c = 0, d = 0; d < a.length;) {
                var e = a[d++], f;
                f = e;
                f = x(f) ? "o" + (f[fa] || (f[fa] = ++ga)) : (typeof f).charAt(0) + f;
                Object.prototype.hasOwnProperty.call(b, f) ||
                (b[f] = !0, a[c++] = e)
            }
            a.length = c
        }, Hc = function (a, b) {
            a.sort(b || Gc)
        }, Jc = function (a) {
            for (var b = Ic, c = Array(a.length), d = 0; d < a.length; d++)c[d] = {index: d, value: a[d]};
            var e = b || Gc;
            Hc(c, function (a, b) {
                return e(a.value, b.value) || a.index - b.index
            });
            for (d = 0; d < a.length; d++)a[d] = c[d].value
        }, Gc = function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        }, Kc = function (a, b) {
            for (var c = {}, d = 0; d < a.length; d++) {
                var e = a[d], f = b.call(void 0, e, d, a);
                r(f) && (c[f] || (c[f] = [])).push(e)
            }
            return c
        };
    var Lc = function (a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }, Mc = function (a, b) {
        for (var c in a)if (b.call(void 0, a[c], c, a))return !0;
        return !1
    }, Nc = function (a, b) {
        return null !== a && b in a
    }, Oc = function (a, b) {
        for (var c in a)if (a[c] == b)return !0;
        return !1
    }, Pc = function (a, b) {
        b in a && delete a[b]
    }, Qc = function (a) {
        var b = {}, c;
        for (c in a)b[c] = a[c];
        return b
    }, Rc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "), Sc = function (a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d =
                arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < Rc.length; f++)c = Rc[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var Tc;
    a:{
        var Uc = n.navigator;
        if (Uc) {
            var Vc = Uc.userAgent;
            if (Vc) {
                Tc = Vc;
                break a
            }
        }
        Tc = ""
    }
    var H = function (a) {
        return -1 != Tc.indexOf(a)
    };
    var Wc = function () {
        return H("Trident") || H("MSIE")
    }, Xc = function () {
        return (H("Chrome") || H("CriOS")) && !H("Edge")
    };
    var Zc = function () {
        this.la = "";
        this.Ca = Yc
    };
    Zc.prototype.ya = !0;
    Zc.prototype.ka = function () {
        return this.la
    };
    var $c = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i, Yc = {}, ad = function (a) {
        var b = new Zc;
        b.la = a;
        return b
    };
    ad("about:blank");
    var cd = function () {
        this.Da = bd
    };
    cd.prototype.ya = !0;
    cd.prototype.ka = function () {
        return ""
    };
    var bd = {};
    var dd = function (a, b) {
        this.width = a;
        this.height = b
    };
    k = dd.prototype;
    k.clone = function () {
        return new dd(this.width, this.height)
    };
    k.Ea = function () {
        return this.width * this.height
    };
    k.isEmpty = function () {
        return !this.Ea()
    };
    k.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    k.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    k.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var ed = function (a) {
        ed[" "](a);
        return a
    };
    ed[" "] = aa;
    var fd = function (a, b) {
        try {
            return ed(a[b]), !0
        } catch (c) {
        }
        return !1
    };
    var gd = function (a) {
            try {
                return !!a && null != a.location.href && fd(a, "foo")
            } catch (b) {
                return !1
            }
        }, hd = function (a, b) {
            var c = a.createElement("script");
            c.src = b;
            var d = a.getElementsByTagName("script")[0];
            d && d.parentNode && d.parentNode.insertBefore(c, d)
        }, id = function (a, b) {
            var c = a.createElement("link");
            c.rel = "prefetch";
            var d;
            b instanceof cd ? b instanceof cd && b.constructor === cd && b.Da === bd ? d = "" : (ba(b), d = "type_error:TrustedResourceUrl") : b instanceof Zc ? b instanceof Zc && b.constructor === Zc && b.Ca === Yc ? d = b.la : (ba(b), d = "type_error:SafeUrl") :
                (d = b, d instanceof Zc || (d = d.ya ? d.ka() : String(d), $c.test(d) || (d = "about:invalid#zClosurez"), d = ad(d)), d = d.ka());
            c.href = d;
            (d = a.getElementsByTagName("head")[0]) && d.appendChild(c)
        }, jd = function (a, b) {
            if (!(1E-4 > Math.random())) {
                var c = Math.random();
                if (c < b) {
                    var d = window;
                    try {
                        var e = new Uint32Array(1);
                        d.crypto.getRandomValues(e);
                        c = e[0] / 65536 / 65536
                    } catch (f) {
                        c = Math.random()
                    }
                    return a[Math.floor(c * a.length)]
                }
            }
            return null
        }, I = function (a, b, c) {
            for (var d in a)Object.prototype.hasOwnProperty.call(a, d) && b.call(c, a[d], d, a)
        },
        kd = function (a) {
            var b = a.length;
            if (0 == b)return 0;
            for (var c = 305419896, d = 0; d < b; d++)c ^= (c << 5) + (c >> 2) + a.charCodeAt(d) & 4294967295;
            return 0 < c ? c : 4294967296 + c
        }, ld = function (a) {
            try {
                for (var b = null; b != a; b = a, a = a.parent)switch (a.location.protocol) {
                    case "https:":
                        return !0;
                    case "http:":
                    case "file:":
                        return !1
                }
            } catch (c) {
            }
            return !0
        }, md = function (a) {
            if (!a)return "";
            var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
            try {
                var c = b.exec(decodeURIComponent(a));
                if (c)return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
            } catch (d) {
            }
            return ""
        };
    var nd = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, od = function (a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    var pd = function () {
        this.o = "&";
        this.l = r(void 0) ? void 0 : "trn";
        this.m = {};
        this.u = 0;
        this.j = []
    }, sd = function (a, b, c, d) {
        b = b + "//" + c + d;
        var e = qd(a) - d.length - 0;
        if (0 > e)return "";
        a.j.sort(function (a, b) {
            return a - b
        });
        d = null;
        c = "";
        for (var f = 0; f < a.j.length; f++)for (var g = a.j[f], h = a.m[g], l = 0; l < h.length; l++) {
            var m = rd(h[l], a.o, ",$");
            if (m) {
                m = c + m;
                if (e >= m.length) {
                    e -= m.length;
                    b += m;
                    c = a.o;
                    break
                }
                null == d && (d = g)
            }
        }
        e = "";
        a.l && null != d && (e = c + a.l + "=" + d);
        return b + e + ""
    }, qd = function (a) {
        if (!a.l)return 2048;
        var b = 1, c;
        for (c in a.m)b = c.length >
        b ? c.length : b;
        return 2048 - a.l.length - b - a.o.length - 1
    }, rd = function (a, b, c, d, e) {
        var f = [];
        I(a, function (a, h) {
            var l = td(a, b, c, d, e);
            l && f.push(h + "=" + l)
        });
        return f.join(b)
    }, td = function (a, b, c, d, e) {
        if (null == a)return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0, d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)f.push(td(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)return e = e || 0, 2 > e ? encodeURIComponent(rd(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    };
    var vd = function (a, b, c, d, e) {
        try {
            if (Math.random() < (d || a.j)) {
                var f = new pd;
                I(c, function (a, b) {
                    var c = f.u++, d = {};
                    d[b] = a;
                    d = [d];
                    f.j.push(c);
                    f.m[c] = d
                });
                var g = sd(f, a.l, a.m, a.o + b + "&");
                "undefined" === typeof e ? ud(n, g) : ud(n, g, e)
            }
        } catch (h) {
        }
    }, ud = function (a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        if (c) {
            var e = function (a) {
                c(a);
                od(d, "load", e);
                od(d, "error", e)
            };
            nd(d, "load", e);
            nd(d, "error", e)
        }
        d.src = b;
        a.google_image_requests.push(d)
    };
    var wd = function (a, b, c) {
        this.u = a;
        this.o = b;
        this.l = c;
        this.m = this.j
    }, xd = function (a, b, c) {
        this.message = a;
        this.j = b || "";
        this.l = c || -1
    }, zd = function (a, b) {
        var c;
        try {
            c = b()
        } catch (f) {
            var d = a.l;
            try {
                var e = yd(f), d = a.m.call(a, "osd::adp::reg", e, void 0, void 0)
            } catch (g) {
                a.j("pAR", g)
            }
            if (!d)throw f;
        } finally {
        }
        return c
    }, Bd = function (a) {
        var b = Ad;
        return function () {
            for (var c = [], d = 0; d < arguments.length; ++d)c[d] = arguments[d];
            return zd(b, function () {
                return a.apply(void 0, c)
            })
        }
    };
    wd.prototype.j = function (a, b, c, d, e) {
        try {
            var f = {};
            f.context = a;
            b instanceof xd || (b = yd(b));
            f.msg = b.message.substring(0, 512);
            b.j && (f.file = b.j);
            0 < b.l && (f.line = b.l.toString());
            var g = n.document;
            f.url = g.URL.substring(0, 512);
            f.ref = (g.referrer || "").substring(0, 512);
            if (d)try {
                d(f)
            } catch (h) {
            }
            vd(this.u, e || this.o, f, c)
        } catch (h) {
        }
        return this.l
    };
    var yd = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        a.stack && (b = Cd(a.stack, b));
        return new xd(b, a.fileName, a.lineNumber)
    }, Cd = function (a, b) {
        try {
            -1 == a.indexOf(b) && (a = b + "\n" + a);
            for (var c; a != c;)c = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
            return a.replace(/\n */g, "\n")
        } catch (d) {
            return b
        }
    };
    var Dd = function (a) {
        return function () {
            return a
        }
    }, Ed = function (a) {
        var b = arguments, c = b.length;
        return function () {
            for (var a = 0; a < c; a++)if (!b[a].apply(this, arguments))return !1;
            return !0
        }
    }, Fd = function (a, b) {
        b && (a = y(a, b));
        var c = null, d = !1, e = [], f = function () {
            c = null;
            d && (d = !1, g())
        }, g = function () {
            c = n.setTimeout(f, 200);
            a.apply(null, e)
        };
        return function (a) {
            e = arguments;
            c ? d = !0 : g()
        }
    };
    var Gd = !1, Hd = function (a, b, c) {
        "" != b && (c ? a.j.hasOwnProperty(c) && (a.j[c] = b) : a.l[b] = !0)
    }, Jd = function () {
        var a = Id, b = [];
        I(a.l, function (a, d) {
            b.push(d)
        });
        I(a.j, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var Kd = function (a, b) {
        for (var c = 0, d = a, e = 0; a && a != a.parent;)if (a = a.parent, e++, gd(a))d = a, c = e; else if (b)break;
        return {ja: d, level: c}
    }, Ld = null;
    var Md = function () {
        return H("iPhone") && !H("iPod") && !H("iPad")
    };
    var Nd = H("Opera"), J = Wc(), Od = H("Edge"), Pd = Od || J, Qd = H("Gecko") && !(-1 != Tc.toLowerCase().indexOf("webkit") && !H("Edge")) && !(H("Trident") || H("MSIE")) && !H("Edge"), Rd = -1 != Tc.toLowerCase().indexOf("webkit") && !H("Edge"), Sd = function () {
        var a = n.document;
        return a ? a.documentMode : void 0
    }, Td;
    a:{
        var Ud = "", Vd = function () {
            var a = Tc;
            if (Qd)return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (Od)return /Edge\/([\d\.]+)/.exec(a);
            if (J)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Rd)return /WebKit\/(\S+)/.exec(a);
            if (Nd)return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Vd && (Ud = Vd ? Vd[1] : "");
        if (J) {
            var Wd = Sd();
            if (null != Wd && Wd > parseFloat(Ud)) {
                Td = String(Wd);
                break a
            }
        }
        Td = Ud
    }
    var Xd = Td, Yd = {}, Zd = function (a) {
            var b;
            if (!(b = Yd[a])) {
                b = 0;
                for (var c = bc(String(Xd)).split("."), d = bc(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || "", h = d[f] || "", l = RegExp("(\\d*)(\\D*)", "g"), m = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var p = l.exec(g) || ["", "", ""], q = m.exec(h) || ["", "", ""];
                        if (0 == p[0].length && 0 == q[0].length)break;
                        b = sc(0 == p[1].length ? 0 : parseInt(p[1], 10), 0 == q[1].length ? 0 : parseInt(q[1], 10)) || sc(0 == p[2].length, 0 == q[2].length) || sc(p[2], q[2])
                    } while (0 == b)
                }
                b = Yd[a] = 0 <= b
            }
            return b
        },
        $d = n.document, ae = $d && J ? Sd() || ("CSS1Compat" == $d.compatMode ? parseInt(Xd, 10) : 5) : void 0;
    var be = function (a, b) {
        this.x = r(a) ? a : 0;
        this.y = r(b) ? b : 0
    };
    be.prototype.clone = function () {
        return new be(this.x, this.y)
    };
    be.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    be.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    be.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    var ce = !J || 9 <= Number(ae), de = !Qd && !J || J && 9 <= Number(ae) || Qd && Zd("1.9.1");
    J && Zd("9");
    var ee = J || Nd || Rd;
    var he = function (a) {
        return a ? new fe(ge(a)) : $b || ($b = new fe)
    }, ie = function (a) {
        var b = document;
        return v(a) ? b.getElementById(a) : a
    }, ke = function (a, b) {
        Lc(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : je.hasOwnProperty(d) ? a.setAttribute(je[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, je = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    }, le = function (a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new dd(a.clientWidth, a.clientHeight)
    }, me = function (a) {
        return a.scrollingElement ? a.scrollingElement : Rd || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement
    }, ne = function (a) {
        return a.parentWindow || a.defaultView
    }, pe = function (a, b, c) {
        function d(c) {
            c && b.appendChild(v(c) ? a.createTextNode(c) : c)
        }

        for (var e =
            2; e < c.length; e++) {
            var f = c[e];
            !ca(f) || x(f) && 0 < f.nodeType ? d(f) : G(oe(f) ? Dc(f) : f, d)
        }
    }, qe = function (a) {
        return de && void 0 != a.children ? a.children : uc(a.childNodes, function (a) {
            return 1 == a.nodeType
        })
    }, ge = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, oe = function (a) {
        if (a && "number" == typeof a.length) {
            if (x(a))return "function" == typeof a.item || "string" == typeof a.item;
            if (ea(a))return "function" == typeof a.item
        }
        return !1
    }, fe = function (a) {
        this.j = a || n.document || document
    };
    fe.prototype.l = function (a, b, c) {
        var d = this.j, e = arguments, f = e[0], g = e[1];
        if (!ce && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', jc(g.name), '"');
            if (g.type) {
                f.push(' type="', jc(g.type), '"');
                var h = {};
                Sc(h, g);
                delete h.type;
                g = h
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        g && (v(g) ? f.className = g : t(g) ? f.className = g.join(" ") : ke(f, g));
        2 < e.length && pe(d, f, e);
        return f
    };
    fe.prototype.contains = function (a, b) {
        if (!a || !b)return !1;
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    var re = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    k = re.prototype;
    k.clone = function () {
        return new re(this.top, this.right, this.bottom, this.left)
    };
    k.contains = function (a) {
        return this && a ? a instanceof re ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    k.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    k.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    k.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    var se = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    se.prototype.clone = function () {
        return new se(this.left, this.top, this.width, this.height)
    };
    var te = function (a) {
        return new re(a.top, a.left + a.width, a.top + a.height, a.left)
    };
    se.prototype.contains = function (a) {
        return a instanceof se ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    se.prototype.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    se.prototype.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    se.prototype.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var ue = function (a, b) {
        var c;
        a:{
            c = ge(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, ve = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        J && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, we = function (a) {
        if (J && !(8 <= Number(ae)))return a.offsetParent;
        var b = ge(a), c = ue(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)if (11 == a.nodeType && a.host && (a = a.host), c = ue(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))return a;
        return null
    }, xe = function (a) {
        var b = ge(a), c = new be(0, 0), d;
        d = b ? ge(b) : document;
        d = !J || 9 <= Number(ae) || "CSS1Compat" ==
        he(d).j.compatMode ? d.documentElement : d.body;
        if (a == d)return c;
        a = ve(a);
        d = he(b).j;
        b = me(d);
        d = ne(d);
        b = J && Zd("10") && d.pageYOffset != b.scrollTop ? new be(b.scrollLeft, b.scrollTop) : new be(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, ye = function (a) {
        "number" == typeof a && (a = Math.round(a) + "px");
        return a
    }, ze = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = Rd && !b && !c;
        return r(b) && !d || !a.getBoundingClientRect ? new dd(b, c) : (a = ve(a), new dd(a.right - a.left, a.bottom - a.top))
    };
    var Ae = document, K = window;
    var Be = Object.prototype.hasOwnProperty, Ce = function (a, b) {
        for (var c in a)Be.call(a, c) && b.call(void 0, a[c], c, a)
    }, Ee = function () {
        var a = De();
        "google_onload_fired" in a || (a.google_onload_fired = !1, nd(a, "load", function () {

            DFPConsoleLog("finish");

            a.google_onload_fired = !0
        }))
    }, Fe = function (a, b) {
        var c = b - 8;
        if (a.length > b) {
            var d = a.lastIndexOf("&", c);
            -1 !== d ? a = a.substring(0, d) : (a = a.substring(0, c), a = a.replace(/%\w?$/, ""));
            a += "&trunc=1"
        }
        return a
    }, Ge = !!window.google_async_iframe_id, He = Ge && window.parent || window, De = function () {
        if (Ge && !gd(He)) {
            var a =
                "." + Ae.domain;
            try {
                for (; 2 < a.split(".").length && !gd(He);)Ae.domain = a = a.substr(a.indexOf(".") + 1), He = window.parent
            } catch (b) {
            }
            gd(He) || (He = window)
        }
        return He
    }, Ie = function () {
        var a, b, c = window.ActiveXObject;
        if (navigator.plugins && navigator.mimeTypes.length) {
            if ((a = navigator.plugins["Shockwave Flash"]) && a.description)return a.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s)+r/, ".")
        } else {
            if (navigator.userAgent && 0 <= navigator.userAgent.indexOf("Windows CE")) {
                b = 3;
                for (a = 1; a;)try {
                    a = new c("ShockwaveFlash.ShockwaveFlash." +
                        (b + 1)), b++
                } catch (d) {
                    a = null
                }
                return b.toString()
            }
            if (Wc()) {
                a = null;
                try {
                    a = new c("ShockwaveFlash.ShockwaveFlash.7")
                } catch (d) {
                    b = 0;
                    try {
                        a = new c("ShockwaveFlash.ShockwaveFlash.6"), b = 6, a.AllowScriptAccess = "always"
                    } catch (e) {
                        if (6 === b)return b.toString()
                    }
                    try {
                        a = new c("ShockwaveFlash.ShockwaveFlash")
                    } catch (e) {
                    }
                }
                if (a)return b = a.GetVariable("$version").split(" ")[1], b.replace(/,/g, ".")
            }
        }
        return "0"
    };
    var Je, Ad;
    Je = new function () {
        this.l = "http:" === K.location.protocol ? "http:" : "https:";
        this.m = "pagead2.googlesyndication.com";
        this.o = "/pagead/gen_204?id=";
        this.j = .01
    };
    Ad = new wd(Je, "jserror", !0);
    var Ke = /Trident|MSIE/, Le = /rv:11|Trident\/[78]/, Ne = function () {
        var a = Me;
        return n.google_osd_loaded ? !1 : (hd(n.document, a), n.google_osd_loaded = !0)
    }, Pe = function (a, b) {
        Oe() ? nd(a, "readystatechange", function (c) {
            a && "complete" == a.readyState && b(c)
        }) : nd(a, "load", b)
    }, Qe = function () {
        var a = (De() || n).google_osd_amcb;
        return ea(a) ? a : null
    }, Oe = function () {
        var a = n.navigator;
        return (a = a && a.userAgent) ? Ke.test(a) && !Le.test(a) : !1
    };
    var Te = function () {
        var a = Re, b = Se;
        if (!(window && Math.random && navigator))return -1;
        if (window.__google_ad_urls) {
            var c = window.__google_ad_urls;
            try {
                if (c && c.getOseId())return c.getOseId()
            } catch (e) {
            }
        }
        if (!window.__google_ad_urls_id) {
            var c = window.google_enable_ose, d;
            !0 === c ? d = 2 : !1 !== c && (d = jd([0], a), null == d && ((d = jd([2], b)) || (d = 3)));
            if (!d)return 0;
            window.__google_ad_urls_id = d
        }
        return window.__google_ad_urls_id
    }, Ue = function () {
        var a = 0;
        !r(n.postMessage) && (a |= 1);
        return a
    };
    var Ve = function (a, b) {
        this.o = a;
        this.l = b && b.l ? b.l : [];
        this.m = b && b.m ? b.m : 0;
        this.u = b ? b.u : "";
        this.j = b && b.j ? b.j : [];
        if (b) {
            var c;
            for (c = 0; c < this.l.length; ++c)this.l[c].push("true");
            for (c = 0; c < this.j.length; ++c)this.j[c].za = !0
        }
    }, Me = "", Se = 0, Re = 0, We = function (a, b) {
        var c = a.l, d = a.o.google_ad_request_done;
        d && (d = d.orig_callback || d, a.o.google_ad_request_done = function (a) {
            if (a && 0 < a.length) {
                var f = 1 < a.length ? a[1].url : null, g = a[0].log_info || null, h = a[0].activeview_url || null, l = a[0].activeview_js_enabled || null, m = a[0].activeview_js_immediate_enabled ||
                    null, p = a[0].activeview_js_tos_enabled || null, q = a[0].activeview_cid || null, u = a[0].activeview_metadata || null, E = a[0].image_url || "", ta = a[0].type || null;
                c.push([b, mc(a[0].url), f, g, null, h, l, m, p, q, u, mc(E), ta])
            }
            d(a)
        }, a.o.google_ad_request_done.orig_callback = d)
    }, Ye = function (a, b, c, d) {
        var e = a.l, f = d || 0, g = b.document;
        if (0 < e.length)for (var h = g.getElementsByTagName("a"), l = 0; l < h.length; l++)for (var m = 0; m < e.length; m++)if (0 <= h[l].href.indexOf(e[m][1])) {
            var p = h[l].parentNode;
            if (e[m][2])for (var q = p, u = 0; 4 > u; u++) {
                if (0 <= q.innerHTML.indexOf(e[m][2])) {
                    p =
                        q;
                    break
                }
                q = q.parentNode
            }
            Xe(e[m], p, f, c);
            e.splice(m, 1);
            break
        }
        if (0 < e.length)for (p = g.getElementsByTagName("embed"), l = 0; l < p.length; l++)for (m = 0; m < e.length; m++)if (q = e[m][12], h = e[m][11], "flash" == q && h && (q = p[l], q.src == h)) {
            var E = q;
            0 == E.getBoundingClientRect().height && E.parentElement && "OBJECT" == E.parentElement.tagName && (E = E.parentElement);
            Xe(e[m], E, f, c);
            e.splice(m, 1);
            break
        }
        if (0 < e.length)for (g = g.getElementsByTagName("param"), l = 0; l < g.length; l++)for (m = 0; m < e.length; m++)if (q = e[m][12], h = e[m][11], "flash" == q && h && (p = g[l],
            "movie" == p.name && p.value == h)) {
            p.parentNode && "OBJECT" == p.parentNode.tagName && (E = p.parentNode);
            if (!E)break;
            Xe(e[m], E, f, c);
            e.splice(m, 1);
            break
        }
        if (l = 0 < e.length)Ld || (Ld = Kd(window, !0).ja), l = b != Ld;
        if (l)try {
            Ye(a, b.parent, c, d)
        } catch (ta) {
        }
        for (l = 0; l < e.length; ++l)a = e[l], "true" == a[6] && Ze("osd2", a[3]), "true" == a[7] && Ze("osdim", a[3])
    }, Xe = function (a, b, c, d) {
        d(b, a[0], c, !0, a[3], void 0, a[5], "true" == a[6], "true" == a[7], "true" == a[13], "true" == a[8], a[9], a[10])
    }, Ze = function (a, b) {
        if (a && b) {
            var c = ["//"];
            c.push("pagead2.googlesyndication.com");
            c.push("/activeview");
            c.push("?id=" + a);
            c.push("&r=j");
            c.push("&avi=" + b);
            ud(n, c.join(""))
        }
    };
    k = Ve.prototype;
    k.getNewBlocks = function (a, b) {
        b && Ye(this, this.o, a, 1);
        for (var c = this.j.length, d = 0; d < c; d++) {
            var e = this.j[d];
            !e.m && e.j && (a(e.j, e.o, e.v, e.l, "", void 0, "", !1, !1, e.za, !1, "", "", e.u), e.m = !0)
        }
        b && ((De() || n).google_osd_amcb = a)
    };
    k.setupOse = function (a) {
        if (this.getOseId())return this.getOseId();
        var b = Te();
        if (!b)return 0;
        this.m = b;
        this.u = String(a || 0);
        return this.getOseId()
    };
    k.getOseId = function () {
        return window && Math.random && navigator ? this.m : -1
    };
    k.getCorrelator = function () {
        return this.u
    };
    k.numBlocks = function () {
        return this.l.length + this.j.length
    };
    k.registerAdBlock = function (a, b, c, d, e, f, g) {
        if ((e = Qe()) && d)e(d, a, b, !0, "", void 0, "", !1, !1, !1, !1, "", "", g); else {
            if ("js" == c)We(this, a); else {
                var h = new $e(a, b, d, g);
                this.j.push(h);
                d && Pe(d, Bd(function () {
                    h.l = !0
                }))
            }
            Ne() && Ee()
        }
    };
    k.unloadAdBlock = function (a, b) {
        r(window.Goog_Osd_UnloadAdBlock) && window.Goog_Osd_UnloadAdBlock(a, b)
    };
    var af = function () {
        var a = De(), b = a.__google_ad_urls;
        if (!b)return a.__google_ad_urls = new Ve(a);
        try {
            if (0 <= b.getOseId())return b
        } catch (c) {
        }
        return a.__google_ad_urls = new Ve(a, b)
    }, $e = function (a, b, c, d) {
        this.o = a;
        this.v = b;
        this.j = c;
        this.za = this.m = this.l = !1;
        this.u = d || aa
    };
    ja("Goog_AdSense_getAdAdapterInstance", af);
    ja("Goog_AdSense_OsdAdapter", Ve);
    ja("Goog_AdSense_OsdAdapter.prototype.numBlocks", Ve.prototype.numBlocks);
    ja("Goog_AdSense_OsdAdapter.prototype.getNewBlocks", Ve.prototype.getNewBlocks);
    ja("Goog_AdSense_OsdAdapter.prototype.getOseId", Ve.prototype.getOseId);
    ja("Goog_AdSense_OsdAdapter.prototype.getCorrelator", Ve.prototype.getCorrelator);
    ja("Goog_AdSense_OsdAdapter.prototype.setupOse", Ve.prototype.setupOse);
    ja("Goog_AdSense_OsdAdapter.prototype.registerAdBlock", Ve.prototype.registerAdBlock);
    ja("Goog_AdSense_OsdAdapter.prototype.unloadAdBlock", Ve.prototype.unloadAdBlock);
    var L = n.googletag._vars_, bf = L["#7#"], cf = L["#20#"], Me = sd(new pd, L["#6#"] ? "https:" : "http:", L["#1#"], "/pagead/osd.js"), Se = bf, Re = cf;
    var df = function (a, b, c, d, e, f) {
        var g = "";
        a && (g += a + ":");
        c && (g += "//", b && (g += b + "@"), g += c, d && (g += ":" + d));
        e && (g += e);
        f && (g += "?" + f);
        return g
    }, ef = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, ff = function (a) {
        return a ? decodeURI(a) : a
    }, gf = /#|$/, hf = function (a, b) {
        var c = a.search(gf), d;
        a:{
            d = 0;
            for (var e = b.length; 0 <= (d = a.indexOf(b, d)) && d < c;) {
                var f = a.charCodeAt(d - 1);
                if (38 == f || 63 == f)if (f = a.charCodeAt(d + e), !f || 61 == f || 38 == f || 35 == f)break a;
                d += e + 1
            }
            d = -1
        }
        if (0 >
            d)return null;
        e = a.indexOf("&", d);
        if (0 > e || e > c)e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, " "))
    };
    var jf = !1, kf = "", lf = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    (function () {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (jf = !0, a.description)) {
                kf = lf(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                jf = !0;
                kf = "2.0.0.11";
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"], jf = !!a && a.enabledPlugin)) {
            kf = lf(a.enabledPlugin.description);
            return
        }
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            jf = !0;
            kf = lf(b.GetVariable("$version"));
            return
        } catch (c) {
        }
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            jf = !0;
            kf = "6.0.21";
            return
        } catch (c) {
        }
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), jf = !0, kf = lf(b.GetVariable("$version"))
        } catch (c) {
        }
    })();
    var mf = jf, nf = kf;
    var of = H("Firefox"), pf = Md() || H("iPod"), qf = H("iPad"), rf = H("Android") && !(Xc() || H("Firefox") || H("Opera") || H("Silk")), sf = Xc(), tf = H("Safari") && !(Xc() || H("Coast") || H("Opera") || H("Edge") || H("Silk") || H("Android")) && !(Md() || H("iPad") || H("iPod"));
    var uf = function (a) {
        return (a = a.exec(Tc)) ? a[1] : ""
    };
    (function () {
        if (of)return uf(/Firefox\/([0-9.]+)/);
        if (J || Od || Nd)return Xd;
        if (sf)return uf(/Chrome\/([0-9.]+)/);
        if (tf && !(Md() || H("iPad") || H("iPod")))return uf(/Version\/([0-9.]+)/);
        if (pf || qf) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Tc);
            if (a)return a[1] + "." + a[2]
        } else if (rf)return (a = uf(/Android\s+([0-9.]+)/)) ? a : uf(/Version\/([0-9.]+)/);
        return ""
    })();
    var vf = function (a) {
        var b = "//tpc.googlesyndication.com/safeframe/1-0-2/html/container.html", c;
        c = a;
        for (var d = 0; c != c.parent;)d++, c = c.parent;
        (c = d) && (b += "?n=" + c);
        return (ld(a) ? "https:" : "http:") + b
    };
    var wf = function (a) {
        if (a = /[-\w]+\.[-\w]+$/.exec(a)) {
            a = a[0].toLowerCase();
            for (var b = 0, c = 0; c < a.length; ++c)b = 31 * b + a.charCodeAt(c) >>> 0;
            switch (b) {
                case 1967261364:
                    return 0;
                case 3147493546:
                    return 1;
                case 1567346461:
                    return 2;
                case 2183041838:
                    return 3;
                case 763236279:
                    return 4;
                case 1342279801:
                    return 5;
                case 526831769:
                    return 6;
                case 352806002:
                    return 7;
                case 2755048925:
                    return 8;
                case 3306848407:
                    return 9;
                case 2207000920:
                    return 10;
                case 484037040:
                    return 11;
                case 3506871055:
                    return 12;
                case 672143848:
                    return 13;
                case 2528751226:
                    return 14;
                case 2744854768:
                    return 15;
                case 3703278665:
                    return 16;
                case 2014749173:
                    return 17;
                case 133063824:
                    return 18;
                case 2749334602:
                    return 19;
                case 3131239845:
                    return 20;
                case 2074086763:
                    return 21;
                case 795772493:
                    return 22;
                case 290857819:
                    return 23;
                case 3035947606:
                    return 24;
                case 2983138003:
                    return 25;
                case 2197138676:
                    return 26;
                case 4216016165:
                    return 27;
                case 239803524:
                    return 28;
                case 975993579:
                    return 29;
                case 1794940339:
                    return 30;
                case 1314429186:
                    return 31;
                case 1643618937:
                    return 32;
                case 497159982:
                    return 33
            }
        }
        return -1
    }, xf =
        function (a) {
            if (!a.length)return 0;
            for (var b = [], c = 0; 33 >= c; c++)b[c] = 0;
            for (c = a.length - 1; 0 <= c; c--) {
                var d = wf(a[c]);
                0 <= d && (b[33 - d] = 1)
            }
            return parseInt(b.join(""), 2)
        };
    var yf = function (a, b) {
        this.url = a;
        this.ja = b;
        this.Sa = !1;
        this.depth = w(void 0) ? void 0 : null
    }, zf = function (a) {
        a = (this.l = a || n) || n;
        this.m = a.top == a ? 1 : gd(a.top) ? 2 : 3;
        3 != this.m && Date.parse(n.top.document.lastModified);
        var b = this.l, c = b || n;
        a = [];
        var d = null, e = null;
        do {
            var f = c;
            gd(f) ? (d = f.location.href, e = f.document.referrer || null) : (d = e, e = null);
            a.push(new yf(d, f));
            try {
                c = f.parent
            } catch (g) {
                c = null
            }
        } while (c && f != c);
        c = 0;
        for (f = a.length - 1; c <= f; ++c)a[c].depth = f - c;
        f = b || n;
        if (f.location && f.location.ancestorOrigins && f.location.ancestorOrigins.length ==
            a.length - 1)for (c = 1; c < a.length; ++c)b = a[c], b.url || (b.url = f.location.ancestorOrigins[c - 1], b.Sa = !0);
        this.j = a
    }, Af = function (a, b) {
        for (var c = "", d = a.j[Math.max(a.j.length - 1, 0)].url || "", e = 0; e < b.length && 26 > e; e++) {
            var f;
            null != b[e] && (f = ff(b[e].match(ef)[3] || null));
            if ("" != d && f && f == ff(d.match(ef)[3] || null))c += "11"; else {
                var g;
                if (g = f)a:{
                    g = b[e];
                    for (var h = [/^https?:\/\/(secure)?pubads\.g\.doubleclick\.net(\:\d+)?($|(\/.*))/i, /^https?:\/\/(googleads|adx)\.g\.doubleclick\.net(\:\d+)?($|(\/.*))/i, /^https?:\/\/(?!adx)ad.*\.doubleclick\.net(\:\d+)?($|(\/.*))/i,
                        /^https?:\/\/(tpc|pagead2).googlesyndication\.com(\:\d+)?($|(\/.*))/i, /^https?:\/\/www.googletagservices\.com(\:\d+)?($|(\/.*))/i], l = 0; l < h.length; ++l)if (h[l].test(g)) {
                        g = !0;
                        break a
                    }
                    g = !1
                }
                c = g ? c + "10" : f && f && 0 <= wf(f) ? c + "01" : c + "00"
            }
        }
        return "" == c ? 0 : parseInt(c, 2)
    };
    var Bf = function (a, b, c) {
        b = b || K;
        a && b.top != b && (b = b.top);
        try {
            return b.document && !b.document.body ? new dd(-1, -1) : c ? (new dd(b.innerWidth, b.innerHeight)).round() : le(b || window).round()
        } catch (d) {
            return new dd(-12245933, -12245933)
        }
    };
    var Cf = function (a) {
        a = (a || n).context;
        try {
            if (a && "pageViewId" in a && "canonicalUrl" in a)return a
        } catch (b) {
        }
        return null
    }, Df = function () {
        var a = Cf();
        return a && a.initialIntersection ? a.initialIntersection : null
    }, Ef = function () {
        var a = Df();
        return a && x(a.rootBounds) ? new dd(a.rootBounds.width, a.rootBounds.height) : null
    }, Ff = function () {
        var a = Df();
        return a && x(a.rootBounds) ? new be(a.rootBounds.left + a.boundingClientRect.left, a.rootBounds.top + a.boundingClientRect.top) : null
    };
    var Gf = function (a) {
            this.S = a;
            M(this, 3, null);
            M(this, 4, 0);
            M(this, 5, 0);
            M(this, 6, 0);
            M(this, 15, 0);
            a = De();
            var b = Cf(a);
            b ? ((a = b || Cf()) ? (b = a.pageViewId, v(a.clientId) && (b += a.clientId.replace(/\D/g, "").substr(0, 6)), a = b) : a = null, a = +a) : (a = Kd(a, !1).ja, (b = a.google_global_correlator) || (a.google_global_correlator = b = 1 + Math.floor(Math.random() * Math.pow(2, 43))), a = b);
            M(this, 7, a);
            M(this, 8, {});
            M(this, 9, {});
            M(this, 10, {});
            M(this, 11, []);
            M(this, 12, 0);
            M(this, 14, {});
            M(this, 17, !1);
            M(this, 18, !1);
            M(this, 19, {})
        }, Hf = {
            google_persistent_state: !0,
            google_persistent_state_async: !0
        }, If = {}, Jf = function (a) {
            var b = Cf(window);
            if (b && x(b.master)) {
                b = b.master;
                a = "google_persistent_state_async";
                var c = {}
            } else {
                b = De();
                a = a && Hf[a] ? a : Ge ? "google_persistent_state_async" : "google_persistent_state";
                if (If[a])return If[a];
                "google_persistent_state_async" == a ? c = {} : c = b
            }
            var d = b[a];
            return null != d && "object" == typeof d && null != d.S && "object" == typeof d.S ? If[a] = d : b[a] = If[a] = new Gf(c)
        }, Kf = {
            3: "google_exp_persistent",
            4: "google_num_sdo_slots",
            5: "google_num_0ad_slots",
            6: "google_num_ad_slots",
            7: "google_correlator",
            8: "google_prev_ad_formats_by_region",
            9: "google_prev_ad_slotnames_by_region",
            10: "google_num_slots_by_channel",
            11: "google_viewed_host_channels",
            12: "google_num_slot_to_show",
            14: "gaGlobal",
            15: "google_num_reactive_ad_slots",
            17: "google_ose_setup_performed",
            18: "google_predictive_sra_request_sent",
            19: "google_removed_debug_exp_ids"
        }, Lf = function (a) {
            if (a in Kf)return Kf[a];
            throw Error("unexpected state");
        }, Mf = {14: "gaGlobal", 8: "google_prev_ad_formats_by_region", 9: "google_prev_ad_slotnames_by_region"},
        Nf = function (a) {
            return Mf[a] || "google_ps_" + a
        }, Of = function (a, b, c) {
            var d = a[Lf(b)];
            a = a[Nf(b)];
            d !== a && (b = {
                context: "ps_ckncc",
                url: De().location.href,
                key: b,
                clr: c,
                old: String(d),
                "new": String(a)
            }, vd(Je, "jserror", b, 1E-4, void 0))
        }, Pf = function (a) {
            var b = {}, c = Lf(14);
            a = a.S;
            var d = a[c];
            if (void 0 === d) {
                var e = Nf(14), d = a[e];
                if (void 0 === d)return a[c] = b, a[e] = b
            }
            Of(a, 14, 1);
            return d
        }, M = function (a, b, c) {
            a = a.S;
            var d = Lf(b), e = Nf(b);
            Of(a, b, 2);
            d !== e && void 0 === a[e] && (a[e] = c);
            void 0 === a[d] && (a[d] = c)
        };
    Gd = !1;
    var Qf = function (a) {
        return !!a && a.top == a
    }, Rf = function (a, b, c, d) {
        c = c || a.google_ad_width;
        d = d || a.google_ad_height;
        if (Qf(a))return !1;
        var e = b.documentElement;
        if (c && d) {
            var f = 1, g = 1;
            a.innerHeight ? (f = a.innerWidth, g = a.innerHeight) : e && e.clientHeight ? (f = e.clientWidth, g = e.clientHeight) : b.body && (f = b.body.clientWidth, g = b.body.clientHeight);
            if (g > 2 * d || f > 2 * c)return !1
        }
        return !0
    }, Sf = function (a, b) {
        var c = {};
        c.hb = Kd(window, !1).ja;
        var d;
        var e = c.hb;
        d = e.location.href;
        if (e == e.top)d = {url: d, Aa: !0}; else {
            var f = !1, g = e.document;
            g && g.referrer &&
            (d = g.referrer, e.parent == e.top && (f = !0));
            (e = e.location.ancestorOrigins) && (e = e[e.length - 1]) && -1 == d.indexOf(e) && (f = !1, d = e);
            d = {url: d, Aa: f}
        }
        c.ib = d;
        c.Qa = Rf(De(), b, a.google_ad_width, a.google_ad_height);
        d = c.Qa;
        f = c.ib.Aa;
        e = De();
        e = e.top == e ? 0 : gd(e.top) ? 1 : 2;
        g = 4;
        d || 1 != e ? d || 2 != e ? d && 1 == e ? g = 7 : d && 2 == e && (g = 8) : g = 6 : g = 5;
        f && (g |= 16);
        c.Pa = "" + g;
        return c
    };
    var Uf = function (a, b) {
        var c = a.getPassbackPageUrl();
        if ("" != c)return c;
        c = b[N(a)];
        return null != c ? Tf(c) : null
    }, Vf = function (a) {
        var b = a;
        "about:blank" != a && (b = b.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/'/g, "%27"), /^https?:\/\//.test(b) || (b = "unknown:" + b));
        return b
    }, Wf = /\+/g, Xf = function (a) {
        var b = L["#6#"];
        return a || b ? "https://" + L["#3#"] : "http://" + L["#2#"]
    }, Yf = function () {
        var a = navigator.userAgent, b = a.indexOf("MSIE ");
        return -1 == b ? 0 : parseFloat(a.substring(b + 5, a.indexOf(";", b)))
    }, Zf = function () {
        var a =
            Tc;
        return null != a && -1 != a.indexOf("MSIE ") && -1 == a.indexOf("IEMobile")
    }, ag = function (a, b) {
        var c = 0, d = [];
        a && (d.push(a.getAdUnitPath()), d.push($f(a)), d.push(a.getSlotElementId()));
        if (b) {
            var e;
            e = [];
            for (var f = 0, g = b; g && 25 > f; g = g.parentNode, ++f)e.push(9 !== g.nodeType && g.id || "");
            (e = e.join()) && d.push(e)
        }
        0 < d.length && (c = kd(d.join(":")));
        return c.toString()
    }, bg = function (a, b) {
        if (null == b)return a;
        var c = a.indexOf("google_preview=", a.lastIndexOf("?")), d = a.indexOf("&", c);
        -1 == d && (d = a.length - 1, --c);
        return a.substring(0,
                c) + a.substring(d + 1, a.length)
    }, cg = {VISIBLE: "visible", HIDDEN: "hidden", PRERENDER: "prerender", nb: "other"}, dg = function (a) {
        a = a || document;
        a = a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || "visible";
        return Oc(cg, a) ? a : "other"
    };
    var Id = new function () {
        this.l = {};
        this.j = {};
        for (var a = [], b = 0, c = a.length; b < c; ++b)this.j[a[b]] = ""
    }, eg = [], gg = function (a, b, c) {
        c = c || [];
        a = new fg(a);
        if (Ed.apply(a, c)()) {
            var d = a.j;
            c = [];
            var e = 0, f;
            for (f in d)c[e++] = d[f];
            f = a.l;
            d = b * c.length;
            if ((b = a.m) ? f.j.hasOwnProperty(b) && "" == f.j[b] : 1) {
                var g;
                a:{
                    try {
                        var h = window.top.location.hash;
                        if (h) {
                            var l = h.match(/\bdeid=([\d,]+)/);
                            g = l && l[1] || "";
                            break a
                        }
                    } catch (m) {
                    }
                    g = ""
                }
                (g = (g = (g = g.match(new RegExp("\\b(" + c.join("|") + ")\\b"))) && g[0] || null) ? g : Gd ? null : jd(c, d)) && Hd(f, g, b)
            }
        }
        eg.push(a);
        return a
    }, fg = function (a) {
        var b = Id;
        this.j = a;
        this.l = b;
        this.m = "exp" + (this[fa] || (this[fa] = ++ga));
        this.l.j[this.m] = ""
    }, hg = function (a, b) {
        var c;
        if (Nc(a.j, b)) {
            c = a.j[b];
            var d;
            d = a.l;
            var e = a.m;
            d = d.j.hasOwnProperty(e) ? d.j[e] : "";
            c = c == d
        } else c = !1;
        return c
    }, ig = function (a) {
        for (var b = 0; b < eg.length; ++b) {
            var c = eg[b], d = c.j, e = {}, f = void 0;
            for (f in d)e[d[f]] = f;
            d = e[a];
            if (null != d) {
                Nc(c.j, d) && Hd(c.l, c.j[d], c.m);
                return
            }
        }
        Hd(Id, a)
    }, jg = L["#18#"], kg = zc(["prerender"], dg(void 0));
    gg({control: "108809009", experiment: "108809010"}, jg, [Dd(kg)]);
    gg({branch_1: "108809028", branch_2: "108809029"}, L["#27#"]);
    var lg = gg({
        control: "108809097",
        experiment: "108809098"
    }, L["#54#"], [Dd(L["#46#"])]), mg = gg({control: "108809030", experiment: "108809031"}, L["#28#"], [function (a) {
        return function () {
            return !a.apply(this, arguments)
        }
    }(Dd(L["#46#"]))]);
    L["#46#"] || hg(mg, "experiment") || hg(mg, "control") || ig("108809080");
    var ng = gg({control: "328840005", experiment: "328840006"}, L["#52#"]);
    gg({
        control: "108809103",
        osd_registration: "108809104",
        dom_content_loaded: "108809105",
        iframe_onload: "108809106",
        creative_element_loaded: "108809107",
        creative_element_hybrid: "108809108",
        listener_registration: "108809109"
    }, L["#56#"]);
    var og = function (a) {
        return w(a) && isFinite(a) && 0 == a % 1 && 0 <= a
    }, qg = function () {
        return pg().replace(/[^a-zA-Z0-9]/g, function (a) {
            return "&#" + a.charCodeAt() + ";"
        })
    }, sg = function () {
        return rg("#6#") ? "https:" : "http:"
    }, tg = function (a) {
        var b = a.split("/");
        return "/" == a.charAt(0) && 2 <= b.length ? b[1] : "/" != a.charAt(0) && 1 <= b.length ? b[0] : ""
    }, ug = function (a) {
        var b = [], b = va(a, function (a) {
            return tg(a.getAdUnitPath())
        });
        Fc(b);
        return b
    }, vg = {}, rg = function (a) {
        return vg[a] || ka()._vars_[a]
    };
    A("getVersion", function () {
        return "88"
    });
    var xg = function (a) {
        this.l = a;
        this.j = wg + "/pagead/gen_204?id=" + encodeURIComponent(a)
    }, yg = [], wg = rg("#6#") ? "https://" + rg("#33#") : "http://" + rg("#33#"), zg = function (a, b, c) {
        b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + encodeURIComponent(c))
    }, Ag = function (a, b) {
        if (!r(b) || 0 > b || 1 < b)b = rg("#23#");
        Math.random() < b && a.l && a.j && ud(window, a.j)
    }, Bg = function (a) {
        zg(a, "vrg", "88");
        var b = ug(yg);
        0 < b.length && (3 >= b.length || (b = Ec(b, 0, 3), b.push("__extra__")), zg(a, "nw_id", b.join(",")));
        zg(a, "nslots", yg.length.toString());
        b = Jd();
        0 < b.length &&
        zg(a, "eid", b.join());
        zg(a, "pub_url", document.URL)
    };
    var Cg = rg("#38#"), Dg = function (a, b) {
        var c = {methodId: a};
        b.name && (c.name = b.name);
        b.message && (c.message = b.message.substring(0, 512));
        b.fileName && (c.fileName = b.fileName);
        b.lineNumber && (c.lineNumber = b.lineNumber);
        b.stack && (c.stack = Cd(b.stack, ""));
        return c
    }, O = function (a, b) {
        Eg(a, b, void 0);
        throw b;
    }, Eg = function (a, b, c) {
        if (!b.Ta)try {
            b.Ta = !0;
            var d = Cg;
            r(c) && 0 <= c && 1 >= c && (d = c);
            var e = Dg(a, b), f = new xg("gpt_exception");
            try {
                Bg(f)
            } catch (g) {
            }
            I(e, function (a, b) {
                zg(f, b, a)
            });
            Ag(f, d)
        } catch (g) {
        }
    };
    var Fg = function () {
        this.l = this.j = 0
    };
    Fg.prototype.push = function (a) {
        try {
            for (var b = sa(), c = 0; c < arguments.length; ++c)try {
                ea(arguments[c]) && (arguments[c](), this.j++)
            } catch (d) {
                this.l++, b.error(Ta(String(d.message)))
            }
            b.info(Ua(String(this.j), String(this.l)));
            return this.j
        } catch (d) {
            O(1001, d)
        }
    };
    (function () {
        function a(a) {
            this.t = {};
            this.tick = function (a, b, c) {
                this.t[a] = [void 0 != c ? c : (new Date).getTime(), b];
                if (void 0 == c)try {
                    window.console.timeStamp("CSI/" + a)
                } catch (d) {
                }
            };
            this.tick("start", null, a)
        }

        var b;
        window.performance && (b = window.performance.timing);
        var c = b ? new a(b.responseStart) : new a;
        window.GPT_jstiming = {Timer: a, load: c};
        b && (c = b.navigationStart, b = b.responseStart, 0 < c && b >= c && (window.GPT_jstiming.srt = b - c));
        try {
            b = null, window.chrome && window.chrome.csi && (b = Math.floor(window.chrome.csi().pageT)), null ==
            b && window.gtbExternal && (b = window.gtbExternal.pageT()), null == b && window.external && (b = window.external.pageT), b && (window.GPT_jstiming.pt = b)
        } catch (d) {
        }
    })();
    if (window.GPT_jstiming) {
        window.GPT_jstiming.ra = {};
        window.GPT_jstiming.eb = 1;
        var Gg = function (a, b, c) {
            var d = a.t[b], e = a.t.start;
            if (d && (e || c))return d = a.t[b][0], void 0 != c ? e = c : e = e[0], Math.round(d - e)
        };
        window.GPT_jstiming.getTick = Gg;
        var Hg = function (a, b, c) {
            var d = "";
            window.GPT_jstiming.srt && (d += "&srt=" + window.GPT_jstiming.srt);
            window.GPT_jstiming.pt && (d += "&tbsrt=" + window.GPT_jstiming.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d +=
                    "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (q) {
            }
            var e = window.chrome;
            if (e && (e = e.loadTimes)) {
                e().wasFetchedViaSpdy && (d += "&p=s");
                if (e().wasNpnNegotiated) {
                    var d = d + "&npn=1", f = e().npnNegotiatedProtocol;
                    f && (d += "&npnv=" + (encodeURIComponent || escape)(f))
                }
                e().wasAlternateProtocolAvailable && (d += "&apa=1")
            }
            var g = a.t, h = g.start, e = [], f = [], l;
            for (l in g)if ("start" != l && 0 != l.indexOf("_")) {
                var m = g[l][1];
                m ? g[m] && f.push(l + "." + Gg(a, l, g[m][0])) : h && e.push(l +
                    "." + Gg(a, l))
            }
            if (b)for (var p in b)d += "&" + p + "=" + b[p];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            return [b, "?v=3", "&s=" + (window.GPT_jstiming.sn || "gpt") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
        }, Ig = function (a, b, c) {
            a = Hg(a, b, c);
            if (!a)return "";
            b = new Image;
            var d = window.GPT_jstiming.eb++;
            window.GPT_jstiming.ra[d] = b;
            b.onload = b.onerror = function () {
                window.GPT_jstiming && delete window.GPT_jstiming.ra[d]
            };
            b.src =
                a;
            b = null;
            return a
        };
        window.GPT_jstiming.report = function (a, b, c) {
            if ("prerender" == document.webkitVisibilityState) {
                var d = !1, e = function () {
                    if (!d) {
                        b ? b.prerender = "1" : b = {prerender: "1"};
                        var f;
                        "prerender" == document.webkitVisibilityState ? f = !1 : (Ig(a, b, c), f = !0);
                        f && (d = !0, document.removeEventListener("webkitvisibilitychange", e, !1))
                    }
                };
                document.addEventListener("webkitvisibilitychange", e, !1);
                return ""
            }
            return Ig(a, b, c)
        }
    }
    ;
    var Jg = function () {
        this.m = this.m;
        this.o = this.o
    };
    Jg.prototype.m = !1;
    Jg.prototype.v = function () {
        if (this.o)for (; this.o.length;)this.o.shift()()
    };
    var Kg = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, Ng = function (a) {
        var b = [];
        Lg(new Mg, a, b);
        return b.join("")
    }, Mg = function () {
    }, Lg = function (a, b, c) {
        if (null == b)c.push("null");
        else {
            if ("object" == typeof b) {
                if (t(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)c.push(e), Lg(a, d[f], c), e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)b = b.valueOf(); else {
                    c.push("{");
                    e = "";
                    for (d in b)Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Og(d, c), c.push(":"), Lg(a, f, c), e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
                case "string":
                    Og(b, c);
                    break;
                case "number":
                    c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                    break;
                case "boolean":
                    c.push(String(b));
                    break;
                case "function":
                    c.push("null");
                    break;
                default:
                    throw Error("Unknown type: " + typeof b);
            }
        }
    }, Pg = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, Qg = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, Og = function (a, b) {
        b.push('"', a.replace(Qg, function (a) {
            var b = Pg[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Pg[a] = b);
            return b
        }), '"')
    };
    var Rg = function (a, b, c, d) {
        Jg.call(this);
        this.C = a;
        this.j = 1;
        this.u = b;
        this.B = c;
        this.I = d;
        this.w = Math.random();
        this.A = {};
        this.l = null;
        this.D = y(this.H, this)
    };
    z(Rg, Jg);
    Rg.prototype.H = function (a) {
        if (a.origin === this.B && a.source == this.u) {
            var b = null;
            try {
                b = Kg(a.data)
            } catch (c) {
            }
            if (x(b) && (a = b.i, b.c === this.C && a != this.w && (2 !== this.j && (this.j = 2, Sg(this), this.l && (this.l(), this.l = null)), a = b.s, b = b.p, v(a) && (v(b) || x(b)) && this.A.hasOwnProperty(a))))this.A[a](b)
        }
    };
    var Sg = function (a) {
        var b = {};
        b.c = a.C;
        b.i = a.w;
        a.u.postMessage(Ng(b), a.B)
    };
    Rg.prototype.G = function () {
        if (1 === this.j) {
            try {
                this.u.postMessage && Sg(this)
            } catch (a) {
            }
            window.setTimeout(y(this.G, this), 50)
        }
    };
    Rg.prototype.connect = function (a) {
        a && (this.l = a);
        nd(window, "message", this.D);
        this.I && this.G()
    };
    var Tg = function (a, b, c) {
        a.A[b] = c
    }, Ug = function (a, b, c) {
        var d = {};
        d.c = a.C;
        d.i = a.w;
        d.s = b;
        d.p = c;
        a.u.postMessage(Ng(d), a.B)
    };
    Rg.prototype.v = function () {
        this.j = 3;
        od(window, "message", this.D);
        Rg.qa.v.call(this)
    };
    Qd || Rd || J && Zd(11);
    var Vg = function () {
        this.j = []
    }, Xg = function (a, b, c, d, e) {
        a.j.push(new Wg(b, c, d, e))
    }, Wg = function (a, b, c, d) {
        this.m = a;
        this.j = (this.l = r(d) && a.style && a.style.getPropertyPriority) ? String(b).replace(/([A-Z])/g, "-$1").toLowerCase() : b;
        this.o = this.l ? a.style.getPropertyValue(this.j) : a.style[this.j];
        this.u = this.l ? a.style.getPropertyPriority(this.j) : null;
        this.l ? (a.style.removeProperty(this.j), a.style.setProperty(this.j, c, d)) : a.style[this.j] = c
    };
    var Yg = function (a) {
        this.o = a;
        this.u = null;
        this.G = this.m = 0;
        this.l = null;
        this.C = "sfchannel" + a
    };
    var Zg = function (a, b, c, d, e, f) {
        this.m = a.clone();
        this.l = b.clone();
        this.o = c;
        this.j = d.clone();
        this.u = e;
        this.v = f
    }, $g = function (a) {
        var b = window.screenX || window.screenLeft || 0, c = window.screenY || window.screenTop || 0, b = new re(c, (window.outerWidth || document.documentElement.clientWidth || 0) - b, (window.outerHeight || document.documentElement.clientHeight || 0) - c, b), c = xe(a), d;
        if ("none" != ue(a, "display"))d = ze(a); else {
            d = a.style;
            var e = d.display, f = d.visibility, g = d.position;
            d.visibility = "hidden";
            d.position = "absolute";
            d.display =
                "inline";
            var h = ze(a);
            d.display = e;
            d.position = g;
            d.visibility = f;
            d = h
        }
        c = new se(c.x, c.y, d.width, d.height);
        d = te(c);
        for (var e = String(ue(a, "zIndex")), f = new re(0, Infinity, Infinity, 0), g = he(a), l = g.j.body, m = g.j.documentElement, h = me(g.j); a = we(a);)if (!(J && 0 == a.clientWidth || Rd && 0 == a.clientHeight && a == l) && a != l && a != m && "visible" != ue(a, "overflow")) {
            var p = xe(a), q = new be(a.clientLeft, a.clientTop);
            p.x += q.x;
            p.y += q.y;
            f.top = Math.max(f.top, p.y);
            f.right = Math.min(f.right, p.x + a.clientWidth);
            f.bottom = Math.min(f.bottom, p.y + a.clientHeight);
            f.left = Math.max(f.left, p.x)
        }
        a = h.scrollLeft;
        h = h.scrollTop;
        f.left = Math.max(f.left, a);
        f.top = Math.max(f.top, h);
        g = le(ne(g.j) || window);
        f.right = Math.min(f.right, a + g.width);
        f.bottom = Math.min(f.bottom, h + g.height);
        a = 0 <= f.top && 0 <= f.left && f.bottom > f.top && f.right > f.left ? f : null;
        var u;
        if (null != a)a:{
            h = new se(a.left, a.top, a.right - a.left, a.bottom - a.top);
            u = Math.max(h.left, c.left);
            f = Math.min(h.left + h.width, c.left + c.width);
            if (u <= f && (g = Math.max(h.top, c.top), h = Math.min(h.top + h.height, c.top + c.height), g <= h)) {
                u = new se(u, g,
                    f - u, h - g);
                break a
            }
            u = null
        }
        a = (f = (f = null != u && (0 != u.width || u.left + u.width != a.left && u.left != a.right)) && (0 != u.height || u.top + u.height != a.top && u.top != a.bottom)) ? new re(Math.max(d.top - a.top, 0), Math.max(a.right - d.right, 0), Math.max(a.bottom - d.bottom, 0), Math.max(d.left - a.left, 0)) : new re(0, 0, 0, 0);
        g = f = 0;
        u && !(new dd(u.width, u.height)).isEmpty() && (f = u.width / c.width, g = u.height / c.height);
        return new Zg(b, d, e, a, f, g)
    }, ah = function (a) {
        return Ng({
            windowCoords_t: a.m.top,
            windowCoords_r: a.m.right,
            windowCoords_b: a.m.bottom,
            windowCoords_l: a.m.left,
            frameCoords_t: a.l.top,
            frameCoords_r: a.l.right,
            frameCoords_b: a.l.bottom,
            frameCoords_l: a.l.left,
            styleZIndex: a.o,
            allowedExpansion_t: a.j.top,
            allowedExpansion_r: a.j.right,
            allowedExpansion_b: a.j.bottom,
            allowedExpansion_l: a.j.left,
            xInView: a.u,
            yInView: a.v
        })
    };
    var bh = function () {
        this.j = {shared: {sf_ver: "1-0-2", ck_on: navigator.cookieEnabled ? 1 : 0, flash_ver: mf ? nf : "0"}}
    };
    var ch = function (a) {
        this.ha = a;
        this.j = !1
    };
    var dh = function (a, b, c, d, e) {
        var f = new bh;
        this.j = a;
        this.l = b;
        this.m = c;
        this.permissions = d;
        this.o = f;
        this.u = e
    };
    var eh = function (a) {
        this.j = a
    }, fh = function (a, b) {
        this.j = a;
        this.version = b
    };
    z(fh, eh);
    fh.prototype.m = function () {
        return Ng({uid: this.j, version: this.version})
    };
    var gh = function (a, b, c) {
        this.j = a;
        this.o = b;
        this.l = c
    };
    z(gh, eh);
    gh.prototype.m = function () {
        return Ng({uid: this.j, initialWidth: this.o, initialHeight: this.l})
    };
    var hh = function (a, b) {
        this.j = a;
        this.description = b
    };
    z(hh, eh);
    hh.prototype.m = function () {
        return Ng({uid: this.j, description: this.description})
    };
    var ih = function (a, b) {
        this.j = a;
        this.l = b
    };
    z(ih, eh);
    ih.prototype.m = function () {
        return Ng({
            uid: this.j,
            expand_t: this.l.top,
            expand_r: this.l.right,
            expand_b: this.l.bottom,
            expand_l: this.l.left
        })
    };
    var jh = function (a) {
        this.j = a
    };
    z(jh, eh);
    jh.prototype.m = function () {
        return Ng({uid: this.j})
    };
    var kh = function (a, b) {
        this.j = a;
        this.o = b
    };
    z(kh, eh);
    kh.prototype.m = function () {
        var a = {uid: this.j, newGeometry: ah(this.o)};
        return Ng(a)
    };
    var lh = function (a, b, c, d) {
        kh.call(this, a, c);
        this.u = b;
        this.l = d
    };
    z(lh, kh);
    lh.prototype.m = function () {
        var a = {
            uid: this.j,
            success: this.u,
            newGeometry: ah(this.o),
            expand_t: this.l.top,
            expand_r: this.l.right,
            expand_b: this.l.bottom,
            expand_l: this.l.left
        };
        return Ng(a)
    };
    var mh = function (a, b, c) {
        this.j = a;
        this.width = b;
        this.height = c
    };
    z(mh, eh);
    mh.prototype.m = function () {
        return Ng({uid: this.j, width: this.width, height: this.height})
    };
    var nh = 1, oh = !1, rh = function (a) {
        Yg.call(this, nh++);
        this.T = !!a.Ua;
        this.B = a.Ya;
        this.D = 1 == a.size;
        this.M = new ch(a.permissions.ha && !this.D);
        this.A = a.oa;
        this.R = window.location.protocol + "//" + window.location.host;
        this.O = window.location.protocol + "//tpc.googlesyndication.com";
        this.J = !!a.Ha;
        this.U = a.sandbox || !1;
        this.v = new Vg;
        ph(this, a.oa, a.size);
        this.u = this.L = $g(a.oa);
        this.j = qh(this, a.Na, a.content, a.size, a.Oa);
        this.H = y(this.P, this);
        this.I = -1;
        this.w = 0;
        this.l = new Rg(this.C, this.j.contentWindow, this.O, !1);
        Tg(this.l,
            "init_done", y(this.Ra, this));
        Tg(this.l, "register_done", y(this.cb, this));
        Tg(this.l, "report_error", y(this.fb, this));
        Tg(this.l, "expand_request", y(this.Ia, this));
        Tg(this.l, "collapse_request", y(this.Ga, this));
        Tg(this.l, "creative_geometry_update", y(this.N, this));
        this.l.connect(y(this.ab, this));
        if (a.Ba) {
            var b = y(function () {
                var c;
                a:{
                    try {
                        if (this.j.contentWindow.frames.google_pubads_beacon_iframe) {
                            c = !0;
                            break a
                        }
                    } catch (d) {
                    }
                    c = !1
                }
                c || (a.Ba(), od(this.j, "load", b))
            }, this);
            nd(this.j, "load", b)
        }
    };
    z(rh, Yg);
    var ph = function (a, b, c) {
        a.D ? (b.style.width = ye("100%"), b.style.height = ye("auto")) : (b.style.width = ye(c.width), b.style.height = ye(c.height))
    }, qh = function (a, b, c, d, e) {
        var f = he(a.A);
        c = "1-0-2;" + c.length + ";" + c;
        var g;
        g = new dh(a.o, a.R, a.L, a.M, a.D);
        var h = g.j, l = g.l, m = ah(g.m), p;
        p = g.permissions;
        p = Ng({expandByOverlay: p.ha, expandByPush: p.j, readCookie: !1, writeCookie: !1});
        g = {
            uid: h,
            hostPeerName: l,
            initialGeometry: m,
            permissions: p,
            metadata: Ng(g.o.j),
            reportCreativeGeometry: g.u
        };
        g = Ng(g);
        c += g;
        a.J && d instanceof dd && (g = he(a.A),
        oh || (hd(g.j, a.T ? "//pagead2.googlesyndication.com/pagead/creative_toolset.js?source=safeframe" : "//pagead2.googlesyndication.com/pagead/expansion_embed.js?source=safeframe"), oh = !0), g = ne(g.j), g.google_eas_queue = g.google_eas_queue || [], g.google_eas_queue.push({
            a: b,
            b: g.location.protocol + "//tpc.googlesyndication.com",
            c: d.width,
            d: d.height,
            e: "sf-gdn-exp-" + a.o,
            f: void 0,
            g: void 0,
            h: void 0,
            i: void 0
        }));
        a.D ? (h = g = 0, d = "min-width:100%") : (g = d.width, h = d.height, d = "");
        m = ne(f.j);
        l = vf(m);
        a.J && (m = md(m.location.href), l += "#" +
            [0 < m.length ? "google_debug" + (m ? "=" + m : "") + "&" : "", "xpc=", "sf-gdn-exp-" + a.o, "&p=", encodeURIComponent(n.document.location.protocol), "//", encodeURIComponent(n.document.location.host)].join(""));
        b = {
            id: b,
            title: e || "",
            name: c,
            src: l,
            scrolling: "no",
            marginWidth: "0",
            marginHeight: "0",
            width: String(g),
            height: String(h),
            "data-is-safeframe": "true"
        };
        e = J && !Zd(9) ? "javascript:\"<html><body style='background:transparent'></body></html>\"" : "about:blank";
        e = {
            frameborder: 0, style: "border:0;vertical-align:bottom;" + (d || ""), allowTransparency: "true",
            src: e
        };
        b && Sc(e, b);
        f = f.l("iframe", e);
        a.U && (f.sandbox = "allow-same-origin allow-forms allow-popups allow-scripts allow-pointer-lock allow-popups-to-escape-sandbox");
        a.A.appendChild(f);
        return f
    };
    k = rh.prototype;
    k.ab = function () {
        nd(window, "resize", this.H);
        nd(window, "scroll", this.H)
    };
    k.Ra = function (a) {
        try {
            if (0 != this.m)throw Error("Container already initialized");
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Kg(a);
            if (!(x(c) && w(c.uid) && v(c.version)))throw Error("Cannot parse JSON message");
            b = new fh(c.uid, c.version);
            if (this.o != b.j || "1-0-2" != b.version)throw Error("Wrong source container");
            this.m = 1
        } catch (d) {
            this.B.error("Invalid INITIALIZE_DONE message. Reason: " + d.message)
        }
    };
    k.cb = function (a) {
        try {
            if (1 != this.m)throw Error("Container not initialized");
            if (!v(a))throw Error("Could not parse serialized message");
            var b = Kg(a);
            if (!(x(b) && w(b.uid) && w(b.initialWidth) && w(b.initialHeight)))throw Error("Cannot parse JSON message");
            if (this.o != (new gh(b.uid, b.initialWidth, b.initialHeight)).j)throw Error("Wrong source container");
            this.m = 2
        } catch (c) {
            this.B.error("Invalid REGISTER_DONE message. Reason: " + c.message)
        }
    };
    k.fb = function (a) {
        try {
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Kg(a);
            if (!(x(c) && w(c.uid) && v(c.description)))throw Error("Cannot parse JSON message");
            b = new hh(c.uid, c.description);
            if (this.o != b.j)throw Error("Wrong source container");
            this.B.info("Ext reported an error. Description: " + b.description)
        } catch (d) {
            this.B.error("Invalid REPORT_ERROR message. Reason: " + d.message)
        }
    };
    k.Ia = function (a) {
        try {
            if (2 != this.m)throw Error("Container is not registered");
            if (0 != this.G)throw Error("Container is not collapsed");
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Kg(a);
            if (!(x(c) && w(c.uid) && w(c.expand_t) && w(c.expand_r) && w(c.expand_b) && w(c.expand_l)))throw Error("Cannot parse JSON message");
            b = new ih(c.uid, new re(c.expand_t, c.expand_r, c.expand_b, c.expand_l));
            if (this.o != b.j)throw Error("Wrong source container");
            if (!(0 <= b.l.top && 0 <= b.l.left && 0 <= b.l.bottom && 0 <= b.l.right))throw Error("Invalid expansion amounts");
            var d;
            if (d = this.M.ha) {
                var e = b.l, f = this.u = $g(this.j);
                if (e.top <= f.j.top && e.right <= f.j.right && e.bottom <= f.j.bottom && e.left <= f.j.left) {
                    for (var g = this.j.parentNode; g && g.style; g = g.parentNode)Xg(this.v, g, "overflowX", "visible", "important"), Xg(this.v, g, "overflowY", "visible", "important");
                    var h = this.u.l, l = this.u.l, m = te(new se(0, 0, h.right - h.left, l.bottom - l.top));
                    x(e) ? (m.top -= e.top, m.right += e.right, m.bottom += e.bottom, m.left -= e.left) : (m.top -= e, m.right += Number(void 0), m.bottom += Number(void 0), m.left -= Number(void 0));
                    Xg(this.v, this.A, "position", "relative");
                    Xg(this.v, this.j, "zIndex", "10000");
                    Xg(this.v, this.j, "position", "absolute");
                    Xg(this.v, this.j, "width", m.right - m.left + "px", void 0);
                    Xg(this.v, this.j, "height", m.bottom - m.top + "px", void 0);
                    Xg(this.v, this.j, "left", m.left + "px", void 0);
                    Xg(this.v, this.j, "top", m.top + "px", void 0);
                    this.G = 2;
                    this.u = $g(this.j);
                    d = !0
                } else d = !1
            }
            a = d;
            Ug(this.l, "expand_response", (new lh(this.o, a, this.u, b.l)).m());
            if (!a)throw Error("Viewport or document body not large enough to expand into.");
        } catch (p) {
            this.B.error("Invalid EXPAND_REQUEST message. Reason: " +
                p.message)
        }
    };
    k.Ga = function (a) {
        try {
            if (2 != this.m)throw Error("Container is not registered");
            if (2 != this.G)throw Error("Container is not expanded");
            if (!v(a))throw Error("Could not parse serialized message");
            var b = Kg(a);
            if (!x(b) || !w(b.uid))throw Error("Cannot parse JSON message");
            if (this.o != (new jh(b.uid)).j)throw Error("Wrong source container");
            sh(this);
            Ug(this.l, "collapse_response", (new kh(this.o, this.u)).m())
        } catch (c) {
            this.B.error("Invalid COLLAPSE_REQUEST message. Reason: " + c.message)
        }
    };
    var sh = function (a) {
        for (var b = a.v, c = b.j.length - 1; 0 <= c; c--) {
            var d = b.j[c];
            d.l ? (d.m.style.removeProperty(d.j), d.m.style.setProperty(d.j, d.o, d.u)) : d.m.style[d.j] = d.o
        }
        b.j.length = 0;
        a.G = 0;
        a.j && (a.u = $g(a.j))
    };
    rh.prototype.P = function () {
        if (1 == this.m || 2 == this.m)switch (this.w) {
            case 0:
                th(this);
                this.I = window.setTimeout(y(this.K, this), 1E3);
                this.w = 1;
                break;
            case 1:
                this.w = 2;
                break;
            case 2:
                this.w = 2
        }
    };
    rh.prototype.N = function (a) {
        try {
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Kg(a);
            if (!(x(c) && w(c.uid) && w(c.width) && w(c.height)))throw Error("Cannot parse JSON message");
            b = new mh(c.uid, c.width, c.height);
            if (this.o != b.j)throw Error("Wrong source container");
            this.D ? this.j.height = String(b.height) : this.B.error("Got CreativeGeometryUpdate message in non-fluidcontainer. The container is not resized.")
        } catch (d) {
            this.B.error("Invalid CREATIVE_GEOMETRY_UPDATE message. Reason: " + d.message)
        }
    };
    rh.prototype.K = function () {
        if (1 == this.m || 2 == this.m)switch (this.w) {
            case 1:
                this.w = 0;
                break;
            case 2:
                th(this), this.I = window.setTimeout(y(this.K, this), 1E3), this.w = 1
        }
    };
    var th = function (a) {
        a.u = $g(a.j);
        Ug(a.l, "geometry_update", (new kh(a.o, a.u)).m())
    }, uh = function (a) {
        if (100 != a.m) {
            2 == a.G && sh(a);
            window.clearTimeout(a.I);
            a.I = -1;
            a.w = 3;
            if (a.l) {
                var b = a.l;
                b.m || (b.m = !0, b.v());
                a.l = null
            }
            od(window, "resize", a.H);
            od(window, "scroll", a.H);
            if (b = a.j) {
                var b = a.A, c;
                a:{
                    c = a.j;
                    var d;
                    if (ee && !(J && Zd("9") && !Zd("10") && n.SVGElement && c instanceof n.SVGElement) && (d = c.parentElement)) {
                        c = d;
                        break a
                    }
                    d = c.parentNode;
                    c = x(d) && 1 == d.nodeType ? d : null
                }
                b = b == c
            }
            b && a.A.removeChild(a.j);
            a.j = null;
            a.A = null;
            a.m = 100
        }
    };
    var vh = function (a, b, c, d, e) {
        this.advertiserId = a;
        this.campaignId = b;
        this.creativeId = c;
        this.labelIds = d;
        this.lineItemId = e
    };
    var wh = function (a) {
        var b = sa(), c = {};
        if (!a || !x(a))return null;
        var d = !1;
        I(a, function (e, f) {
            switch (f) {
                case "allowOverlayExpansion":
                    da(e) ? c.allowOverlayExpansion = a.allowOverlayExpansion : (b.error(Yb("allowOverlayExpansion", a.allowOverlayExpansion), null, this), d = !0);
                    break;
                case "sandbox":
                    !0 === e ? c.sandbox = a.sandbox : (b.error(Yb("sandbox", a.sandbox), null, this), d = !0);
                    break;
                default:
                    b.j(Xb(f), null, this)
            }
        });
        return d ? null : c
    }, xh = function (a) {
        for (var b = {}, c = 0; c < a.length; ++c)I(a[c], function (a, c) {
            b[c] = a
        });
        return b
    };
    var yh = {
        Cb: "slotRenderEnded",
        mb: "impressionViewable",
        Db: "slotVisibilityChanged"
    }, zh = function (a, b, c, d, e, f, g, h, l) {
        this.slot = a;
        this.isEmpty = b;
        this.size = c;
        this.advertiserId = d;
        this.campaignId = e;
        this.creativeId = f;
        this.labelIds = g;
        this.lineItemId = h;
        this.serviceName = l;
        this.slotContentChanged = !0
    }, Bh = function (a) {
        var b = Ah().getName();
        this.slot = a;
        this.serviceName = b
    }, Ch = function (a, b, c) {
        this.slot = a;
        this.serviceName = b;
        this.inViewPercentage = c
    };
    var Dh = function () {
        this.$ = [];
        this.ba = {};
        this.l = !1;
        this.B = {};
        this.log = sa();
        this.log.info(Wa(this.getName()), this)
    };
    k = Dh.prototype;
    k.getName = function () {
        return "unknown"
    };
    k.getVersion = function () {
        return "unversioned"
    };
    k.getSlots = function () {
        return this.$
    };
    k.getSlotIdMap = function () {
        return this.ba
    };
    k.enable = function () {
        if (this.l)this.log.info(Za(), this); else try {
            this.ma(), this.l = !0
        } catch (a) {
            Eg(1402, a), this.log.error($a(String(a)), this)
        }
    };
    k.pa = function (a) {
        this.$.push(a);
        this.ba[N(a)] = a;
        this.log.info(ab(this.getName(), a.getAdUnitPath()), this, a)
    };
    k.addEventListener = function (a, b) {
        try {
            if (!ea(b) || !v(a)) {
                var c = F("Service.addEventListener", [a, b]);
                this.log.j(c, this);
                return this
            }
            if (!Oc(yh, a))return this.log.j(Rb(a), this), this;
            t(this.B[a]) || (this.B[a] = []);
            this.B[a].push(b);
            var d = new xg("gpt_callback_usage");
            zg(d, "type", a);
            Bg(d);
            Ag(d);
            return this
        } catch (e) {
            O(1401, e)
        }
    };
    var Eh = function (a, b, c) {
        b = a.B[b];
        t(b) && G(b, function (a) {
            try {
                a(c)
            } catch (b) {
                a = b && v(b.name) ? b.name : null;
                var e = b && v(b.message) ? b.message : null, f = "";
                a && e ? f = a + ": " + e : a ? f = a : e && (f = e);
                this.log.j(Qb(f), this)
            }
        }, a)
    };
    var Fh = {
        zb: "rt_st_instant",
        wb: "rt_fs_instant",
        ub: "rt_dns_period",
        Ab: "rt_tcp_period",
        yb: "rt_ssl_period",
        xb: "rt_rtt_period",
        Bb: "rt_tft_period",
        vb: "rt_duration_period",
        kb: "loader_loaded_instant",
        lb: "loader_loaded_instant_nw",
        tb: "_start_pubads_load_period",
        rb: "pubads_load_period",
        sb: "impl_loaded_instant",
        ob: "page_load_time",
        pb: "page_load_time_nw",
        qb: "page_unload_time"
    }, Gh = {
        start_ad_fetch_period: !0,
        start_ad_render_period: !0
    }, Hh = {pubads_load_period: "_start_pubads_load_period"}, Ih = {
        ad_fetch_period: "start_ad_fetch_period",
        ad_render_period: "start_ad_render_period"
    }, Jh = function () {
        this.u = !1;
        n.GPT_jstiming && n.GPT_jstiming.load && ("http:" == n.location.protocol || "https:" == n.location.protocol) && Math.random() < rg("#37#") && (this.u = !0);
        this.W = (new Date).getTime() + "_" + Math.random();
        this.o = this.m = this.L = null;
        this.K = this.I = this.G = !1;
        this.A = window.GPT_jstiming.getTick(window.GPT_jstiming.load, "start", 0);
        this.l = window.GPT_jstiming.load;
        this.l.name = "global";
        if (!window.performance || !window.performance.timing) {
            var a = rg("#49#");
            this.A =
                a;
            this.l.tick("start", void 0, a)
        }
        this.j = {};
        this.C = 500;
        this.H = [];
        this.D = {};
        this.J = !1;
        this.V = this.U = 0;
        this.w = !1;
        this.v = {};
        this.B = {};
        this.N = this.R = this.O = this.P = this.M = this.T = 0
    }, Kh = null, P = function () {
        return Kh || Lh()
    }, Lh = function () {
        var a = window, b = new Jh;
        Kh = b;
        Mh(b);
        Nh(b);
        ka().fifWin && "complete" == document.readyState ? a.performance && a.performance.timing && Oh(b, a.performance.timing.loadEventStart) : la(a, function () {
            Oh(b)
        });
        ma(a, function () {
            Ph(b, "page_unload_time");
            Qh(b, !0)
        });
        Rh(b, "v88");
        return b
    }, Nh = function (a) {
        I(Fh,
            function (a) {
                this.j[a] = !1
            }, a)
    }, Sh = function (a, b, c, d) {
        a.l || (a.l = new n.GPT_jstiming.Timer(a.A), a.l.name = "global");
        var e = "_" == b[0];
        if (c || e || window.performance && window.performance.timing)a.l.tick(b, c, d), e || (a.I = !0);
        a.J || Qh(a)
    }, Th = function (a, b, c, d, e) {
        c ? a.o || (a.o = new n.GPT_jstiming.Timer(a.A), a.o.name = "ad_events_psbk") : a.m || (a.m = new n.GPT_jstiming.Timer(a.A), a.m.name = "ad_events");
        var f = "_" == b.charAt(0);
        c ? (a.o.tick(b, d, e), f || (a.K = !0)) : (a.m.tick(b, d, e), f || (a.G = !0))
    }, Ph = function (a, b, c) {
        try {
            a.u && (Sh(a, b, Hh[b],
                c), a.j[b] = !0)
        } catch (d) {
            O(2601, d)
        }
    }, Uh = function (a, b, c) {
        try {
            if (a.u) {
                var d = "_" + b;
                d && (Sh(a, d, void 0, 0), Sh(a, b, d, c))
            }
        } catch (e) {
            O(2601, e)
        }
    }, Vh = function (a, b, c, d) {
        if (a.u && !(1E3 < c)) {
            var e = Ih[b], f = e;
            e && (f += "." + c);
            c = b + ("." + c);
            f && a.D.hasOwnProperty("_" + f) && (f = "_" + f, Th(a, f, d || !1, void 0, a.D[f] + a.A), delete a.D[f]);
            Th(a, c, d || !1, f);
            d = d ? a.o : a.m;
            Gh.hasOwnProperty(b) && (b = window.GPT_jstiming.getTick(d, c), a.D["_" + c] = b)
        }
    }, Wh = function (a) {
        a.j.loader_loaded_instant && !a.j.loader_loaded_instant_nw && Ph(a, "loader_loaded_instant_nw",
            a.U);
        a.j.page_load_time && !a.j.page_load_time_nw && Ph(a, "page_load_time_nw", a.V)
    }, Mh = function (a) {
        window.setTimeout(y(function () {
            try {
                var a = Qh(this), c;
                if (this.u) {
                    var d = Xh(), e = !1;
                    this.m && this.G && (Yh(this, this.v), n.GPT_jstiming.report(this.m, this.v, d), this.m = null, this.G = !1, this.v = {}, e = !0);
                    this.o && this.K && (Yh(this, this.B), n.GPT_jstiming.report(this.o, this.B, d), this.o = null, this.K = !1, this.B = {}, e = !0);
                    c = e
                } else c = !1;
                if (a || c)this.C = 32E3 < 2 * this.C ? 32E3 : 2 * this.C;
                Mh(this)
            } catch (f) {
                O(2602, f)
            }
        }, a), a.C)
    }, Xh = function () {
        return "https:" ==
        n.location.protocol ? "https://www.google.com/csi" : "http://csi.gstatic.com/csi"
    }, Zh = function (a) {
        var b = null != a.l && a.I && (a.j.page_load_time || "complete" == document.readyState) && a.j.loader_loaded_instant;
        b && I(Fh, function (a) {
            var d = Hh[a];
            d && (b = b && this.j[a] == this.j[d])
        }, a);
        return b
    }, Qh = function (a, b) {
        if (!a.u)return !1;
        var c = Xh(), d = !1;
        if (a.l && (b || Zh(a))) {
            b ? Rh(a, "page_unload") : Rh(a, "page_load");
            d = {};
            if (!a.J || b)d.count_of_slots = a.T, d.count_of_requested_slots = a.P, d.count_of_rendered_slots = a.O, d.count_of_requests =
                a.R, d.count_of_refreshes_called = a.N, d.count_of_passback = a.M;
            Yh(a, d);
            n.GPT_jstiming.report(a.l, d, c);
            a.J = !0;
            a.I = !1;
            a.l = null;
            d = !0
        }
        return d
    }, Yh = function (a, b) {
        b.vrg = "88";
        b.pl_id = a.W;
        a.H.length && (b.e = a.H.join())
    }, Rh = function (a, b) {
        0 < b.length && Ac(a.H, b)
    }, $h = function (a, b) {
        null === a.L && ((a.L = b) ? Rh(a, "sra") : Rh(a, "non-sra"))
    }, ai = function (a, b, c, d) {
        a.u && (d ? (a.B[b] = a.B[b] || [], a.B[b].push(c)) : (a.v[b] = a.v[b] || [], a.v[b].push(c)))
    }, bi = function (a, b) {
        switch (b) {
            case "count_of_slots":
                ++a.T;
                break;
            case "count_of_requested_slots":
                ++a.P;
                break;
            case "count_of_rendered_slots":
                ++a.O;
                break;
            case "count_of_requests":
                ++a.R;
                break;
            case "count_of_refreshes_called":
                ++a.N;
                break;
            case "count_of_passback":
                ++a.M
        }
    }, Oh = function (a, b) {
        Ph(a, "page_load_time", b);
        a.w ? Ph(a, "page_load_time_nw", b) : a.V = b || (new Date).getTime()
    }, ci = function () {
        var a = P();
        Ph(a, "_start_pubads_load_period")
    }, di = function () {
        var a = P();
        Ph(a, "impl_loaded_instant");
        Ph(a, "pubads_load_period")
    }, ei = function (a, b, c, d) {
        Vh(a, "start_ad_fetch_period", b, c);
        d && I(d, function (a, d) {
                ai(this, d, b + "_" + a, c)
            },
            a);
        bi(a, "count_of_requests")
    }, fi = function (a, b, c, d) {
        Vh(a, "start_ad_render_period", b, c);
        d && I(d, function (a, d) {
            ai(this, d, b + "_" + a, c)
        }, a)
    }, gi = function (a, b, c) {
        Vh(a, "ad_render_period", b, c)
    }, ii = function (a) {
        var b = hi, c = ka().fifWin || window;
        c.performance && c.performance.getEntriesByName && (a = c.performance.getEntriesByName(a)[0]) && (Uh(b, "rt_st_instant", a.startTime), Uh(b, "rt_fs_instant", a.fetchStart), Uh(b, "rt_dns_period", a.domainLookupEnd - a.domainLookupStart), Uh(b, "rt_tcp_period", a.connectEnd - a.connectStart), a.secureConnectionStart &&
        Uh(b, "rt_ssl_period", a.connectEnd - a.secureConnectionStart), Uh(b, "rt_rtt_period", a.responseStart - a.fetchStart), Uh(b, "rt_tft_period", a.responseEnd - a.responseStart), Uh(b, "rt_duration_period", a.duration))
    };
    var ji = function () {
        this.j = {};
        this.m = !1;
        this.l = sa();
        this.u = this.l.info(Da());
        la(window, y(ji.prototype.o, this))
    }, ki = function (a, b) {
        var c = null;
        b in a.j && (c = a.j[b]);
        return c
    }, mi = function () {
        var a = li();
        I(a.j, function (a, c) {
            a.enable();
            Rh(P(), c)
        })
    };
    ji.prototype.o = function () {
        try {
            this.m = !0, this.l.info(xa(), null, null, this.u)
        } catch (a) {
            O(1802, a)
        }
    };
    var li = function () {
        var a = ka();
        return a.service_manager_instance || (a.service_manager_instance = new ji)
    };
    A("enableServices", function () {
        try {
            mi()
        } catch (a) {
            O(1801, a)
        }
    });
    var ni = function (a) {
        var b = t(a) && 2 == a.length && og(a[0]) && og(a[1]);
        a = v(a) && "fluid" == a;
        return b || a
    }, oi = function (a) {
        var b = new xg("gpt_multi_size_fluid");
        zg(b, "len", "" + a.length);
        Bg(b);
        Ag(b)
    }, qi = function (a) {
        return t(a) ? new pi(a[0], a[1]) : a
    }, ri = function (a) {
        var b = t(a) && 1 < a.length && w(a[0]) && w(a[1]);
        a = v(a) && "fluid" == a;
        return b || a
    };
    var pi = function (a, b) {
        this.l = a;
        this.j = b
    };
    pi.prototype.getWidth = function () {
        return this.l
    };
    pi.prototype.getHeight = function () {
        return this.j
    };
    var si = function (a) {
        var b = [];
        if (ri(a))b.push(qi(a)); else if (t(a)) {
            for (var c = 0; c < a.length; ++c) {
                var d = a[c];
                ri(d) && b.push(qi(d))
            }
            zc(a, "fluid") && oi(a)
        }
        return b
    };
    var ti = function (a, b) {
        this.l = a;
        this.j = b
    };
    ti.prototype.clone = function () {
        return new ti(this.l, this.j)
    };
    var ui = function (a) {
        this.j = a
    }, vi = function (a, b) {
        var c = yc(a.j, function (a) {
            a = a.l;
            return a.width <= b.width && a.height <= b.height
        });
        return null == c ? null : c.j
    }, wi = function (a) {
        if (!t(a) || 2 != a.length)throw Error("Each mapping entry has to be an array of size 2");
        var b;
        b = a[0];
        if (!ni(b) || "fluid" == b)throw Error("Size has to be an array of two non-negative integers");
        b = new dd(b[0], b[1]);
        if (t(a[1]) && 0 == a[1].length)a = []; else if (a = si(a[1]), 0 == a.length)throw Error("At least one slot size must be present");
        return new ti(b,
            a)
    };
    var xi = function (a, b, c) {
        this.j = a;
        this.m = w(b) ? b : 0;
        this.l = this.j + "_" + this.m;
        this.o = c || "gpt_unit_" + this.l
    };
    k = xi.prototype;
    k.getId = function () {
        return this.l
    };
    k.getAdUnitPath = function () {
        return this.j
    };
    k.getName = function () {
        return this.j
    };
    k.getInstance = function () {
        return this.m
    };
    k.toString = xi.prototype.getId;
    k.getDomId = function () {
        return this.o
    };
    var zi = function (a, b, c, d) {
        this.G = a;
        this.Xa = si(c);
        this.U = null;
        this.m = new xi(a, b, d);
        this.u = [];
        this.H = {};
        this.J = null;
        this.j = sa();
        this.j.info(ya(this.m.toString()), null, this);
        this.va = this.C = this.ba = this.B = null;
        this.Z = this.aa = "";
        this.R = !0;
        this.w = {};
        this.M = [];
        this.da = !1;
        this.X = this.$ = null;
        this.Y = 0;
        this.V = -1;
        this.ca = 0;
        this.l = !1;
        this.Va = ++yi;
        this.L = {};
        this.ua = "";
        this.P = !1;
        this.K = null;
        this.O = !1;
        this.D = null;
        this.Za = Fd(function () {
            null !== this.D && this.visibilityChanged(this.D)
        }, this);
        this.ta = tg(this.G);
        this.W =
            "";
        this.I = this.v = null;
        this.xa = !1;
        this.o = null;
        this.fa = this.A = this.T = 0;
        this.N = !1
    }, Ai = 0, yi = 0;
    k = zi.prototype;
    k.getPassbackPageUrl = function () {
        return this.ua
    };
    k.set = function (a, b) {
        try {
            if (!v(a) || !b)return this.j.j(F("Slot.set", [a, b]), null, this), this;
            var c = this.getAdUnitPath();
            this.H[a] = b;
            this.B || this.C ? this.j.j(Fa(a, String(b), c), null, this) : this.j.info(Ea(a, String(b), c), null, this);
            return this
        } catch (d) {
            O(201, d)
        }
    };
    k.get = function (a) {
        try {
            return v(a) ? this.H.hasOwnProperty(a) ? this.H[a] : null : (this.j.j(F("Slot.get", [a]), null, this), null)
        } catch (b) {
            O(202, b)
        }
    };
    k.getAttributeKeys = function () {
        try {
            var a = [];
            I(this.H, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(203, b)
        }
    };
    k.addService = function (a) {
        try {
            var b = li();
            if (!Oc(b.j, a))return this.j.j(Sb(this.m.toString()), null, this), this;
            for (b = 0; b < this.u.length; ++b)if (a == this.u[b])return this.j.j(Ga(a.getName(), this.m.toString()), a, this), this;
            this.u.push(a);
            a.pa(this);
            return this
        } catch (c) {
            O(204, c)
        }
    };
    k.getName = function () {
        return this.G
    };
    k.getAdUnitPath = function () {
        try {
            return this.G
        } catch (a) {
            O(215, a)
        }
    };
    k.getInstance = function () {
        return this.getSlotId().getInstance()
    };
    k.getSlotElementId = function () {
        return this.m.getDomId()
    };
    k.getSlotId = function () {
        return this.m
    };
    k.getServices = function () {
        return this.u
    };
    k.getSizes = function (a, b) {
        return w(a) && w(b) && this.U ? vi(this.U, new dd(a, b)) : this.Xa
    };
    var N = function (a) {
        return a.G + "_" + a.m.getInstance()
    };
    zi.prototype.defineSizeMapping = function (a) {
        try {
            if (!t(a))throw Error("Size mapping has to be an array");
            var b = va(a, wi);
            this.U = new ui(b)
        } catch (c) {
            Eg(205, c), this.j.j(Ha(c.message), null, this)
        }
        return this
    };
    var Bi = function (a) {
        var b = window, c = null;
        b.top == b && (b = le(window), c = a.getSizes(b.width, b.height));
        null == c && (c = a.getSizes());
        return va(c, function (a) {
            return v(a) ? a : [a.getWidth(), a.getHeight()]
        })
    }, $f = function (a) {
        var b = [], c = !1;
        G(Bi(a), function (a) {
            t(a) ? b.push(a.join("x")) : "fluid" == a ? c = !0 : b.push(a)
        });
        c && b.unshift("320x50");
        return b.join("|")
    };
    k = zi.prototype;
    k.hasWrapperDiv = function () {
        return !!document.getElementById(this.m.getDomId())
    };
    k.setClickUrl = function (a) {
        try {
            if (!v(a))return this.j.j(F("Slot.setClickUrl", [a]), null, this), this;
            this.Z = a;
            return this
        } catch (b) {
            O(206, b)
        }
    };
    k.getClickUrl = function () {
        return this.Z
    };
    k.setForceSafeFrame = function (a) {
        try {
            if (!da(a))return this.j.j(F("Slot.setForceSafeFrame", [a]), null, this), this;
            this.K = a;
            return this
        } catch (b) {
            O(216, b)
        }
    };
    k.setCategoryExclusion = function (a) {
        try {
            return v(a) && !ac(rc(a)) ? (Ac(this.M, a), this.j.info(Ia(a), null, this)) : this.j.j(F("Slot.setCategoryExclusion", [a]), null, this), this
        } catch (b) {
            O(207, b)
        }
    };
    k.clearCategoryExclusions = function () {
        try {
            return this.j.info(Ja(), null, this), this.M = [], this
        } catch (a) {
            O(208, a)
        }
    };
    k.getCategoryExclusions = function () {
        try {
            return Dc(this.M)
        } catch (a) {
            O(209, a)
        }
    };
    k.setTargeting = function (a, b) {
        try {
            var c = [];
            t(b) ? c = b : b && c.push(b.toString());
            v(a) ? (this.j.info(Ka(a, c.join(), this.getAdUnitPath()), null, this), this.w[a] = c) : this.j.j(F("Slot.setTargeting", [a, b]), null, this);
            return this
        } catch (d) {
            O(210, d)
        }
    };
    k.clearTargeting = function () {
        try {
            return this.j.info(La(), null, this), this.w = {}, this
        } catch (a) {
            O(211, a)
        }
    };
    k.getTargetingMap = function () {
        return Qc(this.w)
    };
    k.getTargeting = function (a) {
        try {
            return v(a) ? this.w.hasOwnProperty(a) ? Dc(this.w[a]) : [] : (this.j.j(F("Slot.getTargeting", [a]), null, this), [])
        } catch (b) {
            O(212, b)
        }
    };
    k.getTargetingKeys = function () {
        try {
            var a = [];
            I(this.w, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(213, b)
        }
    };
    k.ia = function (a) {
        this.da = a
    };
    k.getOutOfPage = function () {
        return this.da
    };
    k.getAudExtId = function () {
        return this.Y
    };
    k.gtfcd = function () {
        return this.V
    };
    k.setCollapseEmptyDiv = function (a, b) {
        try {
            if (!da(a) || b && !da(b))return this.j.j(F("Slot.setCollapseEmptyDiv", uc([a, b], r)), null, this), this;
            this.X = (this.$ = a) && !!b;
            b && !a && this.j.j(Ma(this.m.toString()), null, this);
            return this
        } catch (c) {
            O(214, c)
        }
    };
    k.getCollapseEmptyDiv = function () {
        return this.$
    };
    k.getDivStartsCollapsed = function () {
        return this.X
    };
    var Ci = function (a, b) {
        if (!a.hasWrapperDiv())return a.j.error(Na(a.m.toString()), null, a), !1;
        var c = n.document, d = a.m.getDomId(), c = c && c.getElementById(d);
        if (!c)return a.j.error(Oa(d, a.m.toString()), null, a), !1;
        d = a.J;
        return v(d) && 0 < d.length ? (a.renderStarted(), c.innerHTML = d, a.renderEnded(b), !0) : !1
    }, Di = function (a) {
        a.A = ++Ai;
        return a.A
    }, Ei = function (a, b) {
        var c = null, d = !0, e = null, f = null, g = null, h = null, l = null;
        x(b) && (d = b._empty_, d || (c = [b._width_, b._height_], 0 == b._is_afc_ && b._creative_ids_ && b._adgroup2_ids_ && (g = b._creative_ids_[0],
            l = b._adgroup2_ids_[0]), b._advertiser_ids_ && (e = b._advertiser_ids_[0]), b._campaign_ids_ && (f = b._campaign_ids_[0]), b._label_ids_ && b._label_ids_[0] && (h = v(b._label_ids_[0]) ? b._label_ids_[0].split("|") : [b._label_ids_[0]])));
        return new zh(a, d, c, e, f, g, h, l, "publisher_ads")
    }, Fi = function (a) {
        return new zh(a, !0, null, null, null, null, null, null, "publisher_ads")
    };
    k = zi.prototype;
    k.fetchStarted = function (a) {

        DFPConsoleLog("fetchStarted",this);

        this.B || bi(P(), "count_of_requested_slots");
        this.B = this.j.info(za(this.getAdUnitPath()), null, this);
        this.aa = a;
        this.T++;
    };
    k.getContentUrl = function () {
        return this.aa
    };
    k.fetchEnded = function () {

        DFPConsoleLog("fetchEnded",this);

        this.ba = this.j.info(Aa(this.getAdUnitPath()), null, this, this.B);

    };
    k.renderStarted = function () {

        DFPConsoleLog("renderStarted",this);

        this.C = this.j.info(Ba(this.getAdUnitPath()), null, this);


    };
    k.getResponseInformation = function () {
        return this.I
    };
    k.renderEnded = function (a) {
        a.isEmpty ? this.I = null : this.I = new vh(a.advertiserId, a.campaignId, a.creativeId, a.labelIds, a.lineItemId);
        this.va || bi(P(), "count_of_rendered_slots");
        this.va = this.j.info(Ca(this.getAdUnitPath()), null, this, this.C);
        G(this.u, function (b) {
            if (b.getName() == a.serviceName) {
                var c;
                if (c = !a.slotContentChanged)c = b.B.slotRenderEnded, c = !!c && 0 < c.length;
                c && (c = new xg("slot_render_ended_false_positive"), Bg(c), Ag(c));
                Eh(b, "slotRenderEnded", a);

                DFPConsoleLog("renderEnded", a.slot);

            }
        })
    };
    k.impressionViewable = function () {
        Gi(this, "impressionViewable", new Bh(this))
    };
    var Hi = function (a) {
        a.O = !1;
        a.D = null;
        a.I = null;
        a.N = !1;
        a.o = null
    };
    k = zi.prototype;
    k.Ka = function (a, b) {
        a && !this.O && (this.impressionViewable(), this.O = !0);
        var c = this.D;
        this.D = Math.floor(b);
        c !== this.D && this.Za()
    };
    k.visibilityChanged = function (a) {
        a = new Ch(this, Ah().getName(), a);
        Gi(this, "slotVisibilityChanged", a)
    };
    k.setFirstLook = function (a) {
        if (!da(a))return this.j.j(F("Slot.setFirstLook", [a]), null, this), this;
        this.ca = a ? 1 : 2;
        return this
    };
    k.getFirstLook = function () {
        return this.ca
    };
    k.getDefinedId = function () {
        return this.Va
    };
    var Ii = function (a) {
        var b = [], c = a.getTargetingMap();
        I(c, function (a, c) {
            for (var d = [], h = 0; h < a.length; ++h)d.push(encodeURIComponent(a[h]));
            b.push(encodeURIComponent(c) + "=" + d.join(","))
        });
        a = a.getCategoryExclusions();
        if (0 < a.length && !("excl_cat" in c)) {
            for (var c = [], d = 0; d < a.length; ++d)c.push(encodeURIComponent(a[d]));
            b.push(encodeURIComponent("excl_cat") + "=" + c.join(","))
        }
        return b.join("&")
    };
    zi.prototype.Wa = function () {
        return this.T
    };
    var Ji = function (a) {
        return a.o ? a.o._is_afc_ ? a.o._is_afc_ : !1 : null
    }, Gi = function (a, b, c) {
        G(a.u, function (a) {
            a.getName() == c.serviceName && Eh(a, b, c)
        })
    };
    zi.prototype.setSafeFrameConfig = function (a) {
        try {
            if (a && x(a)) {
                var b = wh(a);
                b && (this.L = b)
            } else this.j.error(F("Slot.setSafeFrameConfig", [a]), null, this);
            return this
        } catch (c) {
            O(217, c)
        }
    };
    var Q = function (a) {
        return "google_ads_iframe_" + N(a)
    };
    var Ki = {
        google_ad_channel: "channel",
        google_ad_host: "host",
        google_ad_host_channel: "h_ch",
        google_ad_host_tier_id: "ht_id",
        google_ad_section: "region",
        google_ad_type: "ad_type",
        google_adtest: "adtest",
        google_available_width: "avail_w",
        google_allow_expandable_ads: "ea",
        google_alternate_ad_url: "alternate_ad_url",
        google_alternate_color: "alt_color",
        google_city: "gcs",
        google_color_bg: "color_bg",
        google_color_border: "color_border",
        google_color_line: "color_line",
        google_color_link: "color_link",
        google_color_text: "color_text",
        google_color_url: "color_url",
        google_contents: "contents",
        google_country: "gl",
        google_cpm: "cpm",
        google_cust_age: "cust_age",
        google_cust_ch: "cust_ch",
        google_cust_gender: "cust_gender",
        google_cust_id: "cust_id",
        google_cust_interests: "cust_interests",
        google_cust_job: "cust_job",
        google_cust_l: "cust_l",
        google_cust_lh: "cust_lh",
        google_cust_u_url: "cust_u_url",
        google_disable_video_autoplay: "disable_video_autoplay",
        google_ed: "ed",
        google_encoding: "oe",
        google_flash_version: "flash",
        google_font_face: "f",
        google_font_size: "fs",
        google_hints: "hints",
        google_is_split_slot: "spl",
        google_kw: "kw",
        google_kw_type: "kw_type",
        google_language: "hl",
        google_page_url: "url",
        google_pgb_reactive: "pra",
        google_region: "gr",
        google_reuse_colors: "reuse_colors",
        google_responsive_formats: "resp_fmts",
        google_safe: "adsafe",
        google_tag_info: "gut",
        google_ui_features: "ui",
        google_video_doc_id: "video_doc_id",
        google_video_product_type: "video_product_type",
        google_webgl_support: "wgl"
    }, Li = {
        google_ad_block: "ad_block",
        google_ad_client: "client",
        google_ad_format: "format",
        google_ad_output: "output",
        google_ad_callback: "callback",
        google_ad_height: "h",
        google_ad_slot: "slotname",
        google_ad_unit_key: "adk",
        google_ad_dom_fingerprint: "adf",
        google_ad_width: "w",
        google_analytics_url_parameters: "aup",
        google_auto_format: "afmt",
        google_captcha_token: "captok",
        google_content_recommendation_ui_type: "crui",
        google_ctr_threshold: "ctr_t",
        google_cust_criteria: "cust_params",
        google_delay_requests_count: "drc",
        google_delay_requests_delay: "drd",
        google_image_size: "image_size",
        google_last_modified_time: "lmt",
        google_loeid: "loeid",
        google_max_num_ads: "num_ads",
        google_max_radlink_len: "max_radlink_len",
        google_mtl: "mtl",
        google_nofo: "nofo",
        google_enable_content_recommendations: "ecr",
        google_infinite_scroll_slot_type: "ifsl",
        google_num_radlinks: "num_radlinks",
        google_num_radlinks_per_unit: "num_radlinks_per_unit",
        google_reactive_plaf: "plaf",
        google_reactive_plat: "plat",
        google_reactive_sra_channels: "plach",
        google_only_ads_with_video: "only_ads_with_video",
        google_rl_dest_url: "rl_dest_url",
        google_rl_filtering: "rl_filtering",
        google_rl_mode: "rl_mode",
        google_rt: "rt",
        google_source_type: "src_type",
        google_sui: "sui",
        google_skip: "skip",
        google_tag_for_child_directed_treatment: "tfcd",
        google_tag_origin: "to",
        google_tdsma: "tdsma",
        google_tfs: "tfs",
        google_tl: "tl"
    }, Mi = {
        google_core_dbp: "dbp",
        google_lact: "lact",
        google_only_pyv_ads: "pyv",
        google_only_userchoice_ads: "uc",
        google_scs: "scs",
        google_targeting: "targeting",
        google_with_pyv_ads: "withpyv",
        google_previous_watch: "p_w",
        google_previous_searches: "p_s",
        google_video_url_to_fetch: "durl",
        google_yt_pt: "yt_pt",
        google_yt_up: "yt_up"
    };
    var Ni = function (a) {
        this.j = {};
        this.l = a
    }, Oi = function (a, b, c, d) {
        b && (c || (c = ""), "google_gl" == b ? b = "google_country" : "google_region" == b && (b = "google_section"), b in a.l && ("undefined" == typeof d || d || !a.j[b]) && (a.j[b] = c))
    }, Pi = function (a, b) {
        I(b.j, function (a, b) {
            this.j[b] || (this.j[b] = a)
        }, a)
    }, Qi = function (a) {
        var b = new Ni(a.l);
        b.j = Qc(a.j);
        delete b.j.google_page_url;
        return b
    }, Tf = function (a) {
        return a.j.google_page_url
    };
    Ni.prototype.ga = function () {
        var a = [];
        I(this.j, function (b, c) {
            var d = Ki[c] || Li[c] || Mi[c] || null;
            d && b && a.push(d + "=" + encodeURIComponent(b))
        });
        return a.join("&")
    };
    var Si = function (a, b, c, d) {
        var e = Ri(a, Qi(b), c, d);
        a = Ri(a, b, c, d);
        b = [];
        e[0] && 0 < e[0].length && b.push(e[0].join("&"));
        a[1] && 0 < a[1].length && b.push("sps=" + a[1].join("|"));
        return b.join("&")
    }, Ri = function (a, b, c, d) {
        var e = [], f = [], g = b.j;
        I(d, function (b, d) {
            if (b) {
                var m = "";
                null != g[d] && (m = encodeURIComponent(g[d]));
                for (var p = [], q = -1, u = -1, E = 0; E < a.length; ++E) {
                    var ta = N(a[E]);
                    ++q;
                    null == c[ta] ? p.push("") : (ta = c[ta].j, null != ta[d] ? (p.push(encodeURIComponent(encodeURIComponent(ta[d]))), u = q) : p.push(""))
                }
                if (0 <= u) {
                    q = [];
                    q.push(encodeURIComponent(m));
                    for (E = 0; E <= u; ++E)q.push(p[E]);
                    f.push(b + "," + q.join(","))
                } else m && e.push(b + "=" + m)
            }
        });
        b = [];
        b.push(e);
        b.push(f);
        return b
    }, Ti = function (a, b) {
        var c;
        a:{
            c = a.navigator;
            var d = c.userAgent, e = c.platform, f = /WebKit\/(\d+)/, g = /rv\:(\d+\.\d+)/, h = /rv\:1\.8([^.]|\.0)/;
            if (/Win|Mac|Linux|iPad|iPod|iPhone/.test(e) && !/^Opera/.test(d) && (f = (f.exec(d) || [0, 0])[1], g = (g.exec(d) || [0, 0])[1], /Win/.test(e) && /Trident/.test(d) && 11 <= b.documentMode || !f && "Gecko" === c.product && 27 <= g && !h.test(d) || 536 <= f)) {
                c = !0;
                break a
            }
            c = !1
        }
        d = Rf(a, a.document,
            500, 300);
        e = {};
        if (!c || d)e.ea = "0";
        return e
    };
    var Ui = function (a) {
        this.j = {};
        this.v = {};
        this.m = {};
        this.C = [];
        this.M = a;
        this.o = new Ni(a);
        this.u = {};
        this.D = {};
        this.B = {};
        this.I = {};
        this.L = this.A = "";
        this.l = !1;
        this.J = -1;
        this.K = 0;
        this.G = this.w = !1;
        this.H = {}
    }, Vi = function (a, b) {
        var c = N(b);
        if (a.j[c])return a.j[c];
        a.j[c] = b;
        a.v[b.getAdUnitPath()] || (a.v[b.getAdUnitPath()] = []);
        return a.v[b.getAdUnitPath()][b.getInstance()] = b
    }, Xi = function (a) {
        return uc(Wi(a), function (a) {
            return !a.B
        })
    }, Yi = function (a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            N(d) in a.j && Hi(d)
        }
    }, Zi = function (a) {
        a =
            uc(Wi(a), function (a) {
                return !!a.B && !a.ba
            });
        return va(a, function (a) {
            return [a.getAdUnitPath(), a.getSlotId().getInstance()]
        })
    }, $i = function (a, b) {
        return !(N(b) in a.I)
    }, aj = function (a) {
        var b = 0;
        I(a.j, function () {
            b++
        });
        return b
    };
    Ui.prototype.toString = function () {
        var a = "[AdData:", b = [];
        I(this.j, function (a) {
            b.push(a.toString())
        });
        I(this.m, function (a, d) {
            b.push("[" + d + "," + a + "]")
        });
        a += b.join();
        return a + "]"
    };
    var Wi = function (a) {
        var b = [];
        I(a.j, function (a) {
            b.push(a)
        });
        return b
    }, bj = function (a, b) {
        var c = b || Wi(a), c = va(c, function (a) {
            return a.ta
        });
        Fc(c);
        return c
    }, cj = function (a) {
        var b = [];
        I(a.m, function (a, d) {
            b.push(encodeURIComponent(d) + "=" + encodeURIComponent(a))
        });
        0 < a.C.length && ("excl_cat" in a.m || b.push(encodeURIComponent("excl_cat") + "=" + encodeURIComponent(a.C.join(","))));
        return b.join("&")
    }, dj = function (a, b, c) {
        a.B[N(b)] = c
    }, ej = function (a, b) {
        var c = a.B[N(b)], d;
        if (c)if (c)try {
            var e = window.top, f = new be(0, 0), g, h = ge(c);
            g = h ? ne(h) : window;
            if (fd(g, "parent")) {
                do {
                    var l;
                    if (g == e)l = xe(c); else {
                        var m = ve(c);
                        l = new be(m.left, m.top)
                    }
                    h = l;
                    f.x += h.x;
                    f.y += h.y
                } while (g && g != e && g != g.parent && (c = g.frameElement) && (g = g.parent))
            }
            d = f
        } catch (p) {
            d = new be(-12245933, -12245933)
        } else d = null; else d = null;
        return d
    }, fj = function (a) {
        for (var b = [], c = 0; c < a.length; ++c)b.push($f(a[c]));
        return b.join()
    }, gj = function (a) {
        for (var b = [], c = !1, d = 0; d < a.length; ++d) {
            var e = a[d].getFirstLook();
            0 != e && (c = !0);
            b.push(e)
        }
        return c ? b.join() : void 0
    };
    var hj = function () {
        this.j = [];
        this.H = !1;
        this.w = "";
        this.G = "json_html";
        this.o = "fif";
        this.l = 1;
        this.D = !1;
        this.v = "";
        this.m = [];
        this.persistentRoadblocksOnly = !1;
        this.videoPodNumber = this.videoPodPosition = NaN;
        this.A = this.C = "";
        this.B = !1;
        this.videoStreamCorrelator = NaN;
        this.u = 0
    };
    var kj = function (a) {
        this.u = document;
        this.j = a || 0;
        this.l = ij(this, "__gads=");
        this.v = this.o = !1;
        jj(this)
    }, lj = function (a, b) {
        if (b._cookies_ && b._cookies_.length && (a.m = b._cookies_[0], null != a.m && (a.l = a.m._value_, null != a.m && a.l))) {
            var c = new Date;
            c.setTime(1E3 * a.m._expires_);
            a.u.cookie = "__gads=" + a.l + "; expires=" + c.toGMTString() + "; path=" + a.m._path_ + "; domain=." + a.m._domain_
        }
    }, jj = function (a) {
        if (!a.l && !a.v && 1 != a.j) {
            a.u.cookie = "GoogleAdServingTest=Good";
            var b = "Good" == ij(a, "GoogleAdServingTest=");
            if (b) {
                var c = new Date;
                c.setTime((new Date).valueOf() + -1);
                a.u.cookie = "GoogleAdServingTest=; expires=" + c.toGMTString()
            }
            a.o = b;
            a.v = !0
        }
    }, ij = function (a, b) {
        var c = a.u.cookie, d = c.indexOf(b), e = "";
        -1 != d && (d += b.length, e = c.indexOf(";", d), -1 == e && (e = c.length), e = c.substring(d, e));
        return e
    }, mj = null, nj = function (a) {
        null == mj && (mj = new kj(a));
        return mj
    };
    var oj = function (a, b) {
            var c;
            c = L["#6#"] ? "https://" + L["#33#"] : "http://" + L["#33#"];
            if (!b || 0 > b || 1 < b)b = 0;
            this.m = Math.random() < b;
            this.l = a;
            this.j = c + "/pagead/gen_204?id=" + encodeURIComponent(a)
        }, R = function (a, b, c) {
            b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + encodeURIComponent(c))
        }, pj = function (a, b) {
            R(a, "vrg", "88");
            var c = document, d = bj(b);
            0 < d.length && (3 >= d.length || (d = Ec(d, 0, 3), d.push("__extra__")), R(a, "nw_id", d.join(",")));
            R(a, "nslots", aj(b).toString());
            d = Jd();
            0 < d.length && R(a, "eid", d.join());
            R(a, "pub_url", c.URL)
        },
        qj = function (a) {
            a.m && a.l && a.j && ud(window, a.j)
        };
    var rj = function () {
        this.j = {};
        var a = Ae.URL;
        null == S(this, "target_platform") && (this.j.target_platform = "DESKTOP");
        for (var b = this.j, a = a.split("?"), a = a[a.length - 1].split("&"), c = 0; c < a.length; c++) {
            var d = a[c].split("=");
            if (d[0]) {
                var e = d[0].toLowerCase();
                if ("google_domain_reset_url" != e)try {
                    var f;
                    if (1 < d.length) {
                        var g = d[1];
                        f = window.decodeURIComponent ? decodeURIComponent(g.replace(Wf, " ")) : unescape(g)
                    } else f = "";
                    b[e] = f
                } catch (h) {
                }
            }
        }
    }, S = function (a, b) {
        return null == b ? null : a.j[b]
    };
    var sj = function (a, b, c, d, e) {
        this.j = b;
        this.v = c;
        this.m = d;
        this.u = a;
        this.l = e;
        this.o = "";
        this.G = Ki;
        this.w = [];
        this.D = []
    };
    sj.prototype.ga = function (a, b) {
        var c = b || window;
        if (!t(a))return "";
        if ("sra" == this.u)0 == a.length && (a = Wi(this.j)); else {
            if (0 == a.length)return "";
            1 < a.length && (a = [a[0]])
        }
        this.A();
        this.C(a, c);
        return this.o
    };
    sj.prototype.C = function (a, b) {
        var c = b || window;
        try {
            var d, e = "", f = 0;
            "prerender" == dg(document) ? (e = "108809008", f = L["#17#"]) : (e = "108809007", f = L["#16#"]);
            d = jd([e], f);
            T(this, "eid", (d ? Cc(this.l.m, d) : this.l.m).join())
        } catch (E) {
        }
        this.m && 0 !== this.m.j && T(this, "co", this.m.j);
        d = this.j.J;
        -1 !== d && T(this, "tfcd", d);
        1 === this.j.K && T(this, "kfa", 1);
        T(this, "sc", L["#6#"] ? 1 : 0);
        window.postMessage && T(this, "sfv", "1-0-2");
        if ("sra" == this.u) {
            tj(this, a);
            uj(this);
            e = null;
            d = [];
            for (e = 0; e < a.length; ++e)d.push(Ii(a[e]));
            e = d.join("|");
            e.length ==
            d.length - 1 && (e = null);
            T(this, "prev_scp", e)
        } else d = a[0].gtfcd(), -1 !== d && T(this, "tfcd", d), d = a[0], T(this, "iu", d.getAdUnitPath()), T(this, "sz", $f(d)), zc(Bi(d), "fluid") && T(this, "fluid", "height"), (e = d.getFirstLook()) && T(this, "fl", e), e = vj(d.K, this.j.G), "1" == e && T(this, "fsf", e), e = d.T, 0 < e && T(this, "rc", e), d.getClickUrl() && T(this, "click", d.getClickUrl()), d.getOutOfPage() && T(this, "ists", "1"), $i(this.j, d) || T(this, "logonly", "1"), uj(this), d = a[0], e = Ii(d), T(this, "scp", e), d = d.getAudExtId(), 0 < d && T(this, "audextid", d);
        d =
            1 != this.l.l;
        e = a[0].l;
        f = this.j.u;
        if (null != Tf(this.j.o))f = !0; else {
            for (var g = !1, h = 0; h < a.length && !g; h++)g = null != Uf(a[h], f);
            f = g
        }
        var g = this.l.D, h = 3 == this.l.l, l = L["#46#"], m = 0;
        d && (m |= 1);
        e && (m |= 2);
        f && (m |= 4);
        g && (m |= 8);
        h && (m |= 16);
        l && (m |= 32);
        d = m;
        0 < d && T(this, "eri", d);
        "prerender" == dg() && T(this, "d_imp", 1);
        d = c.document;
        T(this, "cust_params", cj(this.j));
        this.m && 1 != this.m.j && (T(this, "cookie", this.m.l), this.m.o && T(this, "cookie_enabled", "1"));
        (e = this.j.A) && T(this, "uule", e);
        this.m && 1 != this.m.j && (d = (Tf(this.j.o) || (Qf(c) ?
            d.URL : d.referrer)) != d.URL ? d.domain : "") && T(this, "cdm", d);
        null != S(this.v, "google_preview") && T(this, "gct", S(this.v, "google_preview"));
        this.j.w && T(this, "is_amp", "1");
        this.B(new Date, a, c);
        d = {};
        d.u_tz = -(new Date).getTimezoneOffset();
        var p;
        try {
            p = K.history.length
        } catch (E) {
            p = 0
        }
        d.u_his = p;
        d.u_java = !!K.navigator && "unknown" !== typeof K.navigator.javaEnabled && !!K.navigator.javaEnabled && K.navigator.javaEnabled();
        K.screen && (d.u_h = K.screen.height, d.u_w = K.screen.width, d.u_ah = K.screen.availHeight, d.u_aw = K.screen.availWidth,
            d.u_cd = K.screen.colorDepth);
        K.navigator && K.navigator.plugins && (d.u_nplug = K.navigator.plugins.length);
        K.navigator && K.navigator.mimeTypes && (d.u_nmime = K.navigator.mimeTypes.length);
        wj(this, d);
        n.devicePixelRatio && U(this, "u_sd", Number(n.devicePixelRatio.toFixed(3)));
        var q;
        try {
            q = Ie()
        } catch (E) {
            q = "0"
        }
        U(this, "flash", q);
        g = c || window;
        q = g.document;
        p = "sra" == this.u ? Tf(this.j.o) : Uf(a[0], this.j.u) || Tf(this.j.o);
        h = bg(q.URL, S(this.v, "google_preview"));
        q = bg(q.referrer, S(this.v, "google_preview"));
        f = new zf(g);
        d = f.j[Math.max(f.j.length -
            1, 0)].url;
        var e = f.j[0].depth, u;
        null != p ? (u = h, Qf(g) || (q = "", d && (d = ff(d.match(ef)[3] || null)))) : p = h;
        if (null != e && 0 < e && (T(this, "nhd", e), g.location.ancestorOrigins)) {
            g = [];
            for (h = 1; h < f.j.length && 27 > h; h++)f.j[h] && f.j[h].url && (g[h - 1] = f.j[h].url);
            g = Af(f, g.reverse());
            T(this, "iag", g);
            f = f.j;
            g = [];
            for (h = f.length - 1; 0 < h; h--)(l = f[h]) && null != l.url && g.push(ff(l.url.match(ef)[3] || null));
            f = xf(g);
            0 < f && T(this, "mdo", f)
        }
        T(this, "url", p);
        null != u && u != p && T(this, "loc", u);
        T(this, "ref", q);
        null != e && 0 < e && T(this, "top", d);
        u = c || window;
        c =
            u.document;
        (p = c.scripts) && T(this, "dssz", p.length);
        u = new zf(u);
        if (p = u.l.document && u.l.document.scripts ? u.l.document.scripts : []) {
            q = [];
            for (d = p.length - 1; 0 <= d && 26 > q.length;)p[d].src && q.unshift(p[d].src), d--;
            p = Af(u, q)
        } else p = 0;
        T(this, "icsg", p);
        if (u = u.l.document && u.l.document.scripts ? u.l.document.scripts : []) {
            p = [];
            for (q = u.length - 1; 0 <= q; q--)(d = u[q]) && null != d.src && p.push(ff(d.src.match(ef)[3] || null));
            u = xf(p)
        } else u = 0;
        0 < u && T(this, "mso", u);
        u = Error();
        u.stack && (p = u.stack, q = p.split(/\r\n|\r|\n/).length, "Error" ==
        p.slice(0, 5) && q--, p = q - 10, 0 > p && (p = 0, q = new oj("gpt_negative_stack_trace", L["#23#"]), pj(q, this.j), R(q, "stackTrace", u.stack), qj(q)), T(this, "std", p));
        c.currentScript && c.currentScript.text && T(this, "csl", c.currentScript.text.length);
        T(this, "vrg", "88");
        T(this, "vrp", "88")
    };
    var xj = function (a, b) {
        for (var c = b.length, d = [], e = 0; e < c; e++) {
            var f = ag(b[e]);
            b[e].W = f;
            d.push(f)
        }
        T(a, "adks", d.join(","))
    }, wj = function (a, b) {
        I(b, function (a, b) {
            U(this, b, a)
        }, a)
    }, uj = function (a) {
        a.m && 1 == a.m.j || T(a, "ppid", a.j.L)
    };
    sj.prototype.B = function (a, b, c) {
        var d = c.document;
        T(this, "lmt", (Date.parse(d.lastModified) / 1E3).toString());
        U(this, "dt", a.getTime());
        if (d.body) {
            a = d.body.scrollHeight;
            var e = d.body.clientHeight;
            e && a && T(this, "cc", Math.round(100 * e / a).toString())
        }
        a = S(this.v, "deb");
        null != a && T(this, "deb", a);
        a = S(this.v, "haonly");
        null != a && T(this, "haonly", a);
        a = Ti(c, d);
        Ce(a, y(function (a, b) {
            T(this, b, a)
        }, this));
        d = Sf(c, d).Pa || null;
        null != d && T(this, "frm", d);
        if (d = (this.j.w ? Ef() : null) || Bf(!0, c))T(this, "biw", d.width), T(this, "bih", d.height);
        !Qf(c) && (c = Bf(!1, c)) && (T(this, "isw", c.width), T(this, "ish", c.height));
        this.l.u && T(this, "oid", this.l.u);
        if ("sra" == this.u)xj(this, b); else {
            if (c = (this.j.w ? Ff() : null) || ej(this.j, b[0]))T(this, "adx", Math.round(c.x)), T(this, "ady", Math.round(c.y));
            c = b[0].W || ag(b[0], this.j.D[N(b[0])]);
            T(this, "adk", c)
        }
        c = Ue();
        0 < c && T(this, "osd", c);
        c = this.j.o;
        d = "";
        "sra" == this.u ? d = Si(b, c, this.j.u, this.G) : (b = this.j.u[N(b[0])], null == b ? b = c : Pi(b, c), b = Qi(b), d = b.ga());
        d && (this.o += "&" + d)
    };
    sj.prototype.A = function () {
        var a = !1, b = L["#46#"];
        this.j.A || (a = b ? !hg(lg, "experiment") : hg(mg, "control"));
        this.o = Xf(!a) + "/gampad/ads?";
        U(this, "gdfp_req", 1);
        T(this, "correlator", this.l.w);
        U(this, "output", this.l.G);
        U(this, "callback", this.l.v);
        U(this, "impl", this.l.o);
        this.l.persistentRoadblocksOnly && T(this, "per_only", 1);
        "sra" == this.u && T(this, "json_a", 1)
    };
    var tj = function (a, b) {
        for (var c = b.length, d = 0; d < c; d++)yj(a, b[d].getAdUnitPath());
        T(a, "iu_parts", a.w.join());
        T(a, "enc_prev_ius", a.D.join());
        T(a, "prev_iu_szs", fj(b));
        wc(b, function (a) {
            return zc(Bi(a), "fluid")
        }) && (c = va(b, function (a) {
            return zc(Bi(a), "fluid") ? "height" : "0"
        }).join(), T(a, "fluid", c));
        (c = gj(b)) && T(a, "fla", c);
        c = va(b, function (a) {
            return vj(a.K, this.j.G)
        }, a).join();
        0 <= c.indexOf("1") && T(a, "fsfs", c);
        c = va(b, Function.prototype.call, zi.prototype.Wa);
        0 < wc(c, function (a) {
            return 0 < a
        }) && T(a, "rcs", c.join());
        (c = zj(b)) && T(a, "ists", c)
    }, vj = function (a, b) {
        return (null === a ? b : a) ? "1" : "0"
    }, T = function (a, b, c) {
        null != c && U(a, b, encodeURIComponent("" + c))
    }, U = function (a, b, c) {
        null != c && "" != c && (a.o = "?" != a.o.charAt(a.o.length - 1) ? a.o + ("&" + b + "=" + c) : a.o + (b + "=" + c))
    }, yj = function (a, b) {
        var c = "";
        if ("" != b) {
            for (var c = b.split("/"), d = 0; d < c.length; d++)if ("" != c[d]) {
                for (var e = !1, f = 0; f < a.w.length; f++)if (c[d] == a.w[f]) {
                    e = !0;
                    break
                }
                e || a.w.push(c[d])
            }
            d = "";
            for (e = 0; e < c.length; e++) {
                if (0 < e)d += "/"; else if ("" == c[0])continue;
                for (f = 0; f < a.w.length; f++)if (c[e] ==
                    a.w[f]) {
                    d += f;
                    break
                }
            }
            c = d
        }
        a.D.push(c)
    }, zj = function (a) {
        if (!a.length)return 0;
        for (var b = "", c = 0; c < a.length; ++c)b += a[c].getOutOfPage() ? "1" : "0";
        return parseInt(b, 2)
    };
    var Aj = navigator;

    function Bj() {
        try {
            return Aj.javaEnabled()
        } catch (a) {
            return !1
        }
    }

    function Cj(a) {
        var b = 1, c = 0, d;
        if (void 0 != a && "" != a)for (b = 0, d = a.length - 1; 0 <= d; d--)c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    }

    function Dj(a, b) {
        if (!a || "none" == a)return 1;
        a = String(a);
        "auto" == a && (a = b, "www." == a.substring(0, 4) && (a = a.substring(4, a.length)));
        return Cj(a.toLowerCase())
    }

    var Ej = /^\s*_ga=\s*1\.(\d+)[^.]*\.(.*?)\s*$/, Fj = /^[^=]+=\s*GA1\.(\d+)[^.]*\.(.*?)\s*$/;
    var Gj = function (a, b, c, d, e) {
        sj.call(this, a, b, c, d, e)
    };
    z(Gj, sj);
    Gj.prototype.B = function (a, b, c) {
        0 < navigator.userAgent.indexOf("MSIE ") && Oi(this.j.o, "google_encoding", document.charset, !1);
        sj.prototype.B.call(this, a, b, c);
        T(this, "ifi", b[0].fa);
        c == c.top ? c = 0 : (a = [], a.push(c.document.URL), c.name && a.push(c.name), c = Bf(!1, c, !1), a.push(c.width.toString()), a.push(c.height.toString()), c = kd(a.join("")));
        0 != c && T(this, "ifk", c.toString())
    };
    Gj.prototype.C = function (a) {
        var b = a[0], c = window;
        c.google_unique_id ? ++c.google_unique_id : c.google_unique_id = 1;
        b.fa = c.google_unique_id;
        this.l.B ? (U(this, "hxva", 1), T(this, "cmsid", this.l.A), T(this, "vid", this.l.C)) : window.google_test_extended_pageview && U(this, "hxva", 1);
        isNaN(this.l.videoPodNumber) || U(this, "pod", this.l.videoPodNumber);
        isNaN(this.l.videoPodPosition) || U(this, "ppos", this.l.videoPodPosition);
        isNaN(this.l.videoStreamCorrelator) || U(this, "scor", this.l.videoStreamCorrelator);
        sj.prototype.C.call(this,
            a);
        a = window;
        var b = a.document.domain, c = a.document.cookie, d = a.history.length, e = a.screen, f = a.document.referrer, g = Math.round((new Date).getTime() / 1E3), h = window.google_analytics_domain_name, b = "undefined" == typeof h ? Dj("auto", b) : Dj(h, b), l = -1 < c.indexOf("__utma=" + b + "."), m = -1 < c.indexOf("__utmb=" + b), h = Jf("google_persistent_state"), p;
        (p = Pf(h)) || (p = {}, h = h.S, h[Nf(14)] = p, p = h[Lf(14)] = p);
        h = p;
        p = !1;
        if (l)f = c.split("__utma=" + b + ".")[1].split(";")[0].split("."), m ? h.sid = f[3] + "" : h.sid || (h.sid = g + ""), h.vid = f[0] + "." + f[1], h.from_cookie = !0; else {
            h.sid || (h.sid = g + "");
            if (!h.vid) {
                p = !0;
                m = Math.round(2147483647 * Math.random());
                l = [Aj.appName, Aj.version, Aj.language ? Aj.language : Aj.browserLanguage, Aj.platform, Aj.userAgent, Bj() ? 1 : 0].join("");
                e ? l += e.width + "x" + e.height + e.colorDepth : window.java && (e = window.java.awt.Toolkit.getDefaultToolkit().getScreenSize(), l += e.screen.width + "x" + e.screen.height);
                l = l + c + (f || "");
                for (f = l.length; 0 < d;)l += d-- ^ f++;
                h.vid = (m ^ Cj(l) & 2147483647) + "." + g
            }
            h.from_cookie = !1
        }
        if (!h.cid) {
            var q;
            a:{
                g = 999;
                if (f = window.google_analytics_domain_name)f =
                    0 == f.indexOf(".") ? f.substr(1) : f, g = ("" + f).split(".").length;
                f = 999;
                c = c.split(";");
                for (e = 0; e < c.length; e++)if (d = Ej.exec(c[e]) || Fj.exec(c[e])) {
                    if (d[1] == g) {
                        q = d[2];
                        break a
                    }
                    d[1] < f && (f = d[1], q = d[2])
                }
            }
            p && q && -1 != q.search(/^\d+\.\d+$/) ? h.vid = q : q != h.vid && (h.cid = q)
        }
        h.dh = b;
        h.hid || (h.hid = Math.round(2147483647 * Math.random()));
        q = Jf();
        q = Pf(q);
        U(this, "ga_vid", q.vid);
        U(this, "ga_sid", q.sid);
        U(this, "ga_hid", q.hid);
        U(this, "ga_fc", q.from_cookie);
        T(this, "ga_wpids", a.google_analytics_uacct)
    };
    var Hj = function () {
    };
    var Ij, Jj = function () {
    };
    z(Jj, Hj);
    Jj.prototype.j = function () {
        var a;
        a:{
            if (!this.l && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
                for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                    var d = b[c];
                    try {
                        new ActiveXObject(d);
                        a = this.l = d;
                        break a
                    } catch (e) {
                    }
                }
                throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
            }
            a = this.l
        }
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    };
    Ij = new Jj;
    var Kj = function (a, b) {
        this.m = a;
        this.o = b;
        this.l = 0;
        this.j = null
    }, Lj = function (a) {
        var b;
        0 < a.l ? (a.l--, b = a.j, a.j = b.next, b.next = null) : b = a.m();
        return b
    }, Mj = function (a, b) {
        a.o(b);
        100 > a.l && (a.l++, b.next = a.j, a.j = b)
    };
    var Nj = function (a) {
        n.setTimeout(function () {
            throw a;
        }, 0)
    }, Qj = function (a, b) {
        var c = a;
        b && (c = y(a, b));
        !ea(n.setImmediate) || n.Window && n.Window.prototype && !H("Edge") && n.Window.prototype.setImmediate == n.setImmediate ? (Oj || (Oj = Pj()), Oj(c)) : n.setImmediate(c)
    }, Oj, Pj = function () {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !H("Presto") && (a = function () {
            var a = document.createElement("IFRAME");
            a.style.display = "none";
            a.src = "";
            document.documentElement.appendChild(a);
            var b = a.contentWindow, a = b.document;
            a.open();
            a.write("");
            a.close();
            var c = "callImmediate" + Math.random(), d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host, a = y(function (a) {
                if (("*" == d || a.origin == d) && a.data == c)this.port1.onmessage()
            }, this);
            b.addEventListener("message", a, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function () {
                    b.postMessage(c, d)
                }
            }
        });
        if ("undefined" !== typeof a && !Wc()) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (r(c.next)) {
                    c = c.next;
                    var a = c.sa;
                    c.sa = null;
                    a()
                }
            };
            return function (a) {
                d.next = {sa: a};
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ? function (a) {
            var b = document.createElement("SCRIPT");
            b.onreadystatechange = function () {
                b.onreadystatechange = null;
                b.parentNode.removeChild(b);
                b = null;
                a();
                a = null
            };
            document.documentElement.appendChild(b)
        } : function (a) {
            n.setTimeout(a, 0)
        }
    };
    var Sj = new Kj(function () {
        return new Rj
    }, function (a) {
        a.reset()
    }), Uj = function () {
        var a = Tj, b = null;
        a.j && (b = a.j, a.j = a.j.next, a.j || (a.l = null), b.next = null);
        return b
    }, Rj = function () {
        this.next = this.l = this.j = null
    };
    Rj.prototype.set = function (a, b) {
        this.j = a;
        this.l = b;
        this.next = null
    };
    Rj.prototype.reset = function () {
        this.next = this.l = this.j = null
    };
    var Yj = function (a, b) {
        Vj || Wj();
        Xj || (Vj(), Xj = !0);
        var c = Tj, d = Lj(Sj);
        d.set(a, b);
        c.l ? c.l.next = d : c.j = d;
        c.l = d
    }, Vj, Wj = function () {
        if (n.Promise && n.Promise.resolve) {
            var a = n.Promise.resolve(void 0);
            Vj = function () {
                a.then(Zj)
            }
        } else Vj = function () {
            Qj(Zj)
        }
    }, Xj = !1, Tj = new function () {
        this.l = this.j = null
    }, Zj = function () {
        for (var a = null; a = Uj();) {
            try {
                a.j.call(a.l)
            } catch (b) {
                Nj(b)
            }
            Mj(Sj, a)
        }
        Xj = !1
    };
    var bk = function (a, b) {
        this.j = 0;
        this.w = void 0;
        this.m = this.l = this.u = null;
        this.o = this.v = !1;
        if (a != aa)try {
            var c = this;
            a.call(b, function (a) {
                ak(c, 2, a)
            }, function (a) {
                ak(c, 3, a)
            })
        } catch (d) {
            ak(this, 3, d)
        }
    }, ck = function () {
        this.next = this.m = this.l = this.o = this.j = null;
        this.u = !1
    };
    ck.prototype.reset = function () {
        this.m = this.l = this.o = this.j = null;
        this.u = !1
    };
    var dk = new Kj(function () {
        return new ck
    }, function (a) {
        a.reset()
    }), ek = function (a, b, c) {
        var d = Lj(dk);
        d.o = a;
        d.l = b;
        d.m = c;
        return d
    };
    bk.prototype.then = function (a, b, c) {
        return fk(this, ea(a) ? a : null, ea(b) ? b : null, c)
    };
    bk.prototype.then = bk.prototype.then;
    bk.prototype.$goog_Thenable = !0;
    var hk = function (a, b) {
        a.l || 2 != a.j && 3 != a.j || gk(a);
        a.m ? a.m.next = b : a.l = b;
        a.m = b
    }, fk = function (a, b, c, d) {
        var e = ek(null, null, null);
        e.j = new bk(function (a, g) {
            e.o = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : a;
            e.l = c ? function (b) {
                try {
                    var e = c.call(d, b);
                    a(e)
                } catch (m) {
                    g(m)
                }
            } : g
        });
        e.j.u = a;
        hk(a, e);
        return e.j
    };
    bk.prototype.A = function (a) {
        this.j = 0;
        ak(this, 2, a)
    };
    bk.prototype.C = function (a) {
        this.j = 0;
        ak(this, 3, a)
    };
    var ak = function (a, b, c) {
        if (0 == a.j) {
            a == c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.j = 1;
            var d;
            a:{
                var e = c, f = a.A, g = a.C;
                if (e instanceof bk)hk(e, ek(f || aa, g || null, a)), d = !0; else {
                    var h;
                    if (e)try {
                        h = !!e.$goog_Thenable
                    } catch (m) {
                        h = !1
                    } else h = !1;
                    if (h)e.then(f, g, a), d = !0; else {
                        if (x(e))try {
                            var l = e.then;
                            if (ea(l)) {
                                ik(e, l, f, g, a);
                                d = !0;
                                break a
                            }
                        } catch (m) {
                            g.call(a, m);
                            d = !0;
                            break a
                        }
                        d = !1
                    }
                }
            }
            d || (a.w = c, a.j = b, a.u = null, gk(a), 3 != b || jk(a, c))
        }
    }, ik = function (a, b, c, d, e) {
        var f = !1, g = function (a) {
            f || (f = !0, c.call(e, a))
        }, h = function (a) {
            f ||
            (f = !0, d.call(e, a))
        };
        try {
            b.call(a, g, h)
        } catch (l) {
            h(l)
        }
    }, gk = function (a) {
        a.v || (a.v = !0, Yj(a.B, a))
    }, kk = function (a) {
        var b = null;
        a.l && (b = a.l, a.l = b.next, b.next = null);
        a.l || (a.m = null);
        return b
    };
    bk.prototype.B = function () {
        for (var a = null; a = kk(this);) {
            var b = this.j, c = this.w;
            if (3 == b && a.l && !a.u)for (var d = void 0, d = this; d && d.o; d = d.u)d.o = !1;
            if (a.j)a.j.u = null, lk(a, b, c); else try {
                a.u ? a.o.call(a.m) : lk(a, b, c)
            } catch (e) {
                mk.call(null, e)
            }
            Mj(dk, a)
        }
        this.v = !1
    };
    var lk = function (a, b, c) {
        2 == b ? a.o.call(a.m, c) : a.l && a.l.call(a.m, c)
    }, jk = function (a, b) {
        a.o = !0;
        Yj(function () {
            a.o && mk.call(null, b)
        })
    }, mk = Nj;
    var qk = function (a, b) {
        var c = {timeoutMs: 0, withCredentials: !0};
        return new bk(function (d, e) {
            var f = c || {}, g, h = f.jb ? f.jb.j() : Ij.j();
            try {
                h.open("POST", a, !0)
            } catch (p) {
                e(new nk("Error opening XHR: " + p.message, a))
            }
            h.onreadystatechange = function () {
                if (4 == h.readyState) {
                    n.clearTimeout(g);
                    var b;
                    a:switch (h.status) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            b = !0;
                            break a;
                        default:
                            b = !1
                    }
                    !b && (b = 0 === h.status) && (b = a.match(ef)[1] || null, !b && n.self && n.self.location && (b = n.self.location.protocol, b = b.substr(0,
                        b.length - 1)), b = b ? b.toLowerCase() : "", b = !("http" == b || "https" == b || "" == b));
                    b ? d(h) : e(new ok(h.status, a))
                }
            };
            h.onerror = function () {
                e(new nk("Network error", a))
            };
            var l;
            if (f.headers) {
                for (var m in f.headers)l = f.headers[m], null != l && h.setRequestHeader(m, l);
                l = f.headers["Content-Type"]
            }
            m = n.FormData && b instanceof n.FormData;
            void 0 !== l || m || h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            f.withCredentials && (h.withCredentials = f.withCredentials);
            f.responseType && (h.responseType = f.responseType);
            f.$a && h.overrideMimeType(f.$a);
            0 < f.gb && (g = n.setTimeout(function () {
                h.onreadystatechange = aa;
                h.abort();
                e(new pk(a))
            }, f.gb));
            try {
                h.send(b)
            } catch (p) {
                h.onreadystatechange = aa, n.clearTimeout(g), e(new nk("Error sending XHR: " + p.message, a))
            }
        })
    }, nk = function (a, b) {
        Zb.call(this, a + ", url=" + b);
        this.url = b
    };
    z(nk, Zb);
    nk.prototype.name = "XhrError";
    var ok = function (a, b) {
        nk.call(this, "Request Failed, status=" + a, b)
    };
    z(ok, nk);
    ok.prototype.name = "XhrHttpError";
    var pk = function (a) {
        nk.call(this, "Request timed out", a)
    };
    z(pk, nk);
    pk.prototype.name = "XhrTimeoutError";
    var rk = function () {
    };
    z(rk, Hj);
    rk.prototype.j = function () {
        var a = new XMLHttpRequest;
        if ("withCredentials" in a)return a;
        if ("undefined" != typeof XDomainRequest)return new sk;
        throw Error("Unsupported browser");
    };
    var sk = function () {
        this.j = new XDomainRequest;
        this.readyState = 0;
        this.responseText = this.onreadystatechange = null;
        this.status = -1;
        this.j.onload = y(this.Ja, this);
        this.j.onerror = y(this.wa, this);
        this.j.onprogress = y(this.La, this);
        this.j.ontimeout = y(this.Ma, this)
    };
    k = sk.prototype;
    k.open = function (a, b, c) {
        if (null != c && !c)throw Error("Only async requests are supported.");
        this.j.open(a, b)
    };
    k.send = function (a) {
        if (a)if ("string" == typeof a)this.j.send(a); else throw Error("Only string data is supported"); else this.j.send()
    };
    k.abort = function () {
        this.j.abort()
    };
    k.setRequestHeader = function () {
    };
    k.Ja = function () {
        this.status = 200;
        this.responseText = this.j.responseText;
        tk(this, 4)
    };
    k.wa = function () {
        this.status = 500;
        this.responseText = null;
        tk(this, 4)
    };
    k.Ma = function () {
        this.wa()
    };
    k.La = function () {
        this.status = 200;
        tk(this, 1)
    };
    var tk = function (a, b) {
        a.readyState = b;
        if (a.onreadystatechange)a.onreadystatechange()
    };
    var uk = function (a) {
            if (a = ie(a))a.innerHTML = ""
        }, vk = function (a, b) {
            var c = ie(a);
            c && (c.style.display = b ? "" : "none")
        }, wk = function (a, b, c, d, e, f) {
            f = (f || document).createElement("iframe");
            f.id = b;
            f.title = c;
            f.name = b;
            t(e) ? null != e[0] && null != e[1] && (f.width = String(e[0]), f.height = String(e[1])) : (f.width = "100%", f.height = "0");
            f.vspace = "0";
            f.hspace = "0";
            f.allowTransparency = "true";
            f.scrolling = "no";
            f.marginWidth = "0";
            f.marginHeight = "0";
            f.frameBorder = "0";
            f.style.border = "0";
            f.style.verticalAlign = "bottom";
            d && (f.style.visibility =
                "hidden", f.style.display = "none");
            f.src = "javascript:\"<html><body style='background:transparent'></body></html>\"";
            a.appendChild(f);
            return f
        }, xk = function (a, b) {
            if (0 != Yf()) {
                var c = a.getElementById(b);
                c && "hidden" == c.style.visibility && "none" == c.style.display && c.parentNode.removeChild(c)
            }
        }, Ak = function (a, b, c, d, e, f, g) {
            var h = yk, l;
            t(d) ? l = new dd(d[0], d[1]) : l = 1;
            d = hg(ng, "experiment");
            return new rh({
                oa: a, Na: b, Oa: h, content: zk(c), size: l, Ya: {
                    info: function () {
                    }, j: function () {
                    }, error: function () {
                    }
                }, Ha: !0, Ba: e, sandbox: r(f.sandbox) ?
                    f.sandbox : !1, permissions: {ha: r(f.allowOverlayExpansion) ? f.allowOverlayExpansion : !g}, Ua: d
            })
        }, Dk = function (a, b, c) {
            c && (b = zk(b));
            if (0 != Yf()) {
                var d;
                try {
                    d = !!a.contentWindow.document
                } catch (E) {
                    d = !1
                }
                if (d) {
                    var e = b, f = Bk();
                    try {
                        var g = window.frames[a.name];
                        if (6 < parseInt(Yf(), 10) || 0 > e.indexOf("http://" + L["#1#"] + "/pagead/inject_object_div.js")) {
                            var h;
                            b:{
                                a = e;
                                b = document;
                                var l = Yf(), m;
                                if (!(m = 0 == l || isNaN(l) || 7 > l || 9 < l || b.documentMode && 10 <= b.documentMode)) {
                                    var p = navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
                                    m = 6 <=
                                        (p ? parseFloat(p[1]) : 0)
                                }
                                if (!m)for (l = 0; l < a.length; ++l)if (127 < a.charCodeAt(l)) {
                                    h = !0;
                                    break b
                                }
                                h = !1
                            }
                            if (h) {
                                var q = unescape(encodeURIComponent(e)), u = Math.floor(q.length / 2);
                                a = [];
                                for (h = 0; h < u; ++h)a[h] = String.fromCharCode(256 * q.charCodeAt(2 * h + 1) + q.charCodeAt(2 * h));
                                1 == q.length % 2 && (a[u] = q.charAt(q.length - 1));
                                e = a.join("")
                            }
                            g.contents = e;
                            g.location.replace("javascript:window.contents")
                        } else g.contents = e, g.location.replace("javascript:document.write(window.contents);document.close();")
                    } catch (E) {
                    } finally {
                        Ck(f)
                    }
                } else {
                    q =
                        b;
                    g = Bk();
                    try {
                        e = "google-ad-content-" + (Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ +new Date).toString(36)), window[e] = q, q = 'var adContent = window.parent["' + e + '"];window.parent["' + e + '"] = null;document.write(adContent);', q = 6 == Yf() ? "window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + q + "<\\/scr\\' + \\'ipt>\\');document.close(); };" : 'document.domain = "' + document.domain + '";' +
                        q + "document.close();", a.src = 'javascript:\'<script type="text/javascript">' + q + "\x3c/script>'"
                    } catch (E) {
                        window[e] = null
                    } finally {
                        Ck(g)
                    }
                }
            } else {
                g = b;
                try {
                    f = a.contentWindow ? a.contentWindow.document : a.contentDocument, -1 != navigator.userAgent.indexOf("Firefox") && f.open("text/html", "replace"), f.write(g), f.close()
                } catch (E) {
                }
            }
        }, zk = function (a) {
            if (!a)return a;
            var b = a.toLowerCase();
            return -1 < b.indexOf("<!doctype") || -1 < b.indexOf("<html") ? a : "<html>\n<head>\n<script>var inDapIF=true;\x3c/script>\n</head><body>" + a + "</body></html>\n"
        },
        Ek = function (a, b) {
            var c = (b || document).getElementById(a);
            if (c && c.style.height && c.style.width) {
                for (var c = [c.style.width, c.style.height], d = 0; d < c.length; ++d)if (2 < c[d].length && "px" == c[d].substring(c[d].length - 2))c[d] = parseInt(c[d], 10); else return null;
                return c
            }
            return null
        }, Bk = function () {
            var a = [], b = document.getElementsByTagName("base");
            if (b)for (var c = 0, d = b.length; c < d; ++c) {
                var e = b[c], f = e.getAttribute("target");
                f && (a.push({Fa: e, bb: f}), e.removeAttribute("target"))
            }
            return a
        }, Ck = function (a) {
            if (a)for (var b = 0,
                           c = a.length; b < c; ++b) {
                var d = a[b];
                d.Fa.setAttribute("target", d.bb)
            }
        };
    var Fk = function (a, b, c, d) {
        var e = S(c, "api_experiment");
        ac(rc(e)) || G(va(e.split(","), bc), ig);
        G(Jd(), function (a) {
            Rh(P(), a)
        });
        this.F = b;
        this.l = c;
        this.v = d;
        this.o = Math.floor(4503599627370496 * Math.random());
        this.Y = !1;
        this.j = a;
        J && Zd(9) && (Ij = new rk)
    };
    Fk.prototype.w = function () {
        return "lean"
    };
    var Gk = function (a, b) {
        var c = window;
        !b || Qf(c) ? b = Math.floor(4503599627370496 * Math.random()) : a.Y = !0;
        a.o = Math.floor(b)
    };
    Fk.prototype.V = function () {
        return null
    };
    Fk.prototype.M = function () {
        return !1
    };
    Fk.prototype.W = function () {
    };
    var Hk = function (a, b, c, d) {
        var e = new hj;
        e.G = "json_html";
        e.o = a.D(a.j);
        e.l = c;
        e.v = d;
        e.j = b;
        return e
    };
    Fk.prototype.u = function (a) {
        a.w = this.o + "";
        a.m = Jd();
        a.D = this.Y
    };
    Fk.prototype.ga = function (a) {
        this.u(a);
        return Ik(this, this.j ? "sra" : "single", a).ga(a.j)
    };
    var Jk = function (a, b) {
        return b ? Fe(a, 8192) : Fe(a, 4096)
    }, Lk = function (a, b, c, d) {
        b = b.match(ef);
        qk(df(b[1], b[2], b[3], b[4], b[5], "nwids=" + encodeURIComponent(d)), b[6]).then(function (a) {
                var b;
                a = a.responseText;
                a = a.substring(a.indexOf("(") + 1, a.lastIndexOf(")")).replace(/\\x/g, "\\u00");
                var d = n.JSON.parse;
                try {
                    b = d(a)
                } catch (h) {
                    b = null
                }
                b && (Kk(b), c(b))
            }, function (a) {
                var b = new oj("gpt_post_error", L["#23#"]);
                a.name && R(b, "name", a.name);
                a.status && R(b, "status", a.status);
                a.message && R(b, "message", a.message);
                pj(b, this.F);
                qj(b)
            },
            a)
    }, Kk = function (a) {
        t(a) ? G(a, Kk) : I(a, function (a) {
            a._cookies_ && delete a._cookies_
        })
    }, Mk = function (a, b, c, d) {
        var e = d || !1;
        G(b, function (a) {
            var b = Hk(this, [a], 1, c);
            this.u(b);
            b.o = this.D(!1);
            b = Jk(Ik(this, "single", b).ga([a]), e);
            a.fetchStarted(b)
        }, a)
    }, Nk = function (a, b, c) {
        $i(a.F, b) && (c && a.M([b]), c = b.getCollapseEmptyDiv(), null == c && (c = "true" === S(a.l, "google_collapse_empty_div")), c && vk(b.getSlotElementId(), !1))
    }, Ok = function (a, b, c) {
        if (a.j && !t(b))return a = new xg("sra_legacy_ad_response"), Bg(a), Ag(a), [];
        t(b) || (b = [b]);
        for (var d = [], e = 0; e < c.length; ++e) {
            var f = c[e], g = b[e][f.getAdUnitPath()];
            if (g) {
                var h = a, l = f;
                l.o = g;
                l.fetchEnded();
                null != g._cookies_ && lj(h.v, g);
                g._persistent_for_stream_ && (h.F.I[N(l)] = null);
                d.push(f)
            }
        }
        return d
    }, Pk = function () {
        n.googletag._getcook_ = 1
    };
    var Qk = function (a, b, c, d, e) {
        sj.call(this, a, b, c, d, e)
    };
    z(Qk, sj);
    Qk.prototype.A = function () {
        sj.prototype.A.call(this);
        U(this, "m_ast", "js");
        U(this, "markup", "html");
        U(this, "js", "afmc")
    };
    var Rk = function (a, b, c, d) {
        Fk.call(this, a, b, c, d);
        this.T = this.G = this.I = this.B = !1;
        this.K = this.L = "";
        this.videoStreamCorrelator = NaN;
        this.J = 0
    };
    z(Rk, Fk);
    Rk.prototype.w = function () {
        return "unknown"
    };
    Rk.prototype.u = function (a) {
        Rk.qa.u.call(this, a);
        a.B = this.T;
        a.A = this.K;
        a.C = this.L;
        a.u = this.J
    };
    var Sk = function (a) {
        var b = Zi(a.F);
        if (0 < b.length) {
            for (var c = {}, d = [], e = 0; e < b.length; ++e)c[b[e][0]] = !0;
            I(c, function (a, b) {
                d.push(b)
            });
            b = new oj("gpt_missing_cb", L["#10#"]);
            R(b, "pending", d.join());
            R(b, "correlator", a.o.toString());
            R(b, "impl", a.w());
            pj(b, a.F);
            qj(b)
        }
    }, Tk = function (a) {
        return vc(Wi(a.F), function (a, c) {
            return c.xa ? a + 1 : a
        })
    };
    Rk.prototype.da = function () {
        Sk(this)
    };
    Rk.prototype.fa = function () {
        var a = new oj("gpt_req_disp_mismatch", L["#23#"]);
        R(a, "dslots", Tk(this).toString());
        R(a, "impl", this.D(this.j));
        R(a, "sra", this.j ? "1" : "0");
        R(a, "correlator", this.o.toString());
        pj(a, this.F);
        qj(a)
    };
    var Uk = function (a) {
        var b = new oj("gpt_fluid_not_sf", L["#23#"]);
        R(b, "impl", a.w());
        pj(b, a.F);
        qj(b)
    }, Ik = function (a, b, c) {
        switch (S(a.l, "target_platform")) {
            case "MOBILE":
                return new Qk(b, a.F, a.l, a.v, c);
            default:
                return new Gj(b, a.F, a.l, a.v, c)
        }
    }, Vk = function (a, b, c) {
        a.J && b && (a = a.F.j[c], c = "", a && (c = a.getContentUrl()), af().registerAdBlock(c, 3, "json_html", b, void 0, void 0, y(a.Ka, a)))
    };
    var yk = "3rd party ad content";
    A("setAdIframeTitle", function (a) {
        yk = a
    });
    var V = function (a, b, c, d) {
        Rk.call(this, a, b, c, d);
        this.m = [];
        this.A = {};
        this.C = 0;
        this.aa = {};
        this.ba = this.X = NaN;
        this.H = !1;
        this.O = NaN;
        this.$ = !1
    };
    z(V, Rk);
    V.prototype.w = function () {
        return this.j ? "gut_friendly_iframe_sra" : "gut_friendly_iframe"
    };
    V.prototype.D = function (a) {
        return a ? "fifs" : "fif"
    };
    V.prototype.u = function (a) {
        V.qa.u.call(this, a);
        a.persistentRoadblocksOnly = this.$;
        a.videoPodNumber = this.X;
        a.videoPodPosition = this.ba;
        a.videoStreamCorrelator = this.videoStreamCorrelator
    };
    var Zk = function (a, b, c) {
        var d = b.j, e = a.ga(b);
        if (n.JSON && n.JSON.parse && (!J || Zd(10)) && (!Nd || Zd(12)) && 4096 < e.length) {
            if (Wk(a, e, d), c = d[c], a.v && 1 != n.googletag._getcook_) {
                e = a.v;
                if (1 == e.j || !e.l && !e.o)e = null; else {
                    var f = Xf(!!a.F.A) + "/gampad/cookie.js?", f = f + ("domain=" + encodeURIComponent(document.domain)), f = f + "&callback=window.parent.googletag.impl.pubads.setCookieInfo" + ("&iu=" + c.ta);
                    e.l && (f += "&cookie=" + encodeURIComponent(e.l));
                    e.o && (f += "&cookie_enabled=1");
                    e = f
                }
                e && (e = '<script src = "' + Vf(e) + '">\x3c/script>', Xk(c,
                    e))
            }
        } else Yk(a, e, d, c);
        b.H = !0;
        c = P();
        ai(c, "request_refresh_type", a.C + "_" + b.l, d[0].l);
        Pk();
        a.j || (a.aa[N(d[0])] = window.setTimeout(y(a.ca, a), L["#13#"]))
    }, $k = function (a, b, c) {
        var d = "";
        c && (d = d + '<script type="text/javascript">function callbackProxy(adContents) { ' + ("window.parent.googletag.impl.pubads.setAdContentsBySlotForAsync(adContents, " + a + ");}") + "\x3c/script>");
        return d + ('<script src = "' + b + '">\x3c/script>')
    }, Yk = function (a, b, c, d) {
        b = Jk(b, !1);
        var e = Vf(b);
        a.j ? Mk(a, c, "callbackProxy") : c[0].fetchStarted(e);
        al(a, c, d);
        b = ++a.C;
        a.A[b] = c;
        a = $k(b, e, a.j || $i(a.F, c[0]));
        var f = va(c, function (a) {
            return a.getDefinedId()
        }), e = {request_length: e.length, slot_defined_id_in_request: f.join("-")};
        ei(P(), b, c[0].l, e);
        if (null == document.getElementById(c[d].getSlotElementId()) && (d = xc(c, function (a) {
                return null != document.getElementById(a.getSlotElementId())
            }), -1 == d))return;
        Xk(c[d], a)
    }, Wk = function (a, b, c) {
        b = Jk(b, !0);
        var d = Vf(b);
        a.j ? Mk(a, c, "callbackProxy", !0) : c[0].fetchStarted(d);
        var e = ++a.C;
        a.A[e] = c;
        d = y(function (a) {
            (this.j || $i(this.F,
                c[0])) && bl(this, a, e)
        }, a);
        Lk(a, b, d, bj(a.F, c).join(","));
        a = va(c, function (a) {
            return a.getDefinedId()
        });
        a = {request_length: b.length, slot_defined_id_in_request: a.join("-")};
        ei(P(), e, c[0].l, a)
    }, Xk = function (a, b) {
        var c = document, d = Q(a) + "__hidden__", e = c.getElementById(d);
        if (!e) {
            e = a.getSlotElementId();
            e = c.getElementById(e);
            if (null == e)return;
            e = wk(e, d, "", !0, [0, 0], c)
        }
        Dk(e, b, !1)
    }, cl = function (a) {
        return Q(a) + "__container__"
    }, fl = function (a, b) {
        var c = document;
        if ($i(a.F, b)) {
            var d = b.getSlotElementId(), e = c.getElementById(d);
            if (e) {
                for (var d = cl(b), f = Q(b) + "__hidden__", e = e.childNodes, g = !1, h = 0; h < e.length; ++h)if (1 == e[h].nodeType) {
                    var l = e[h];
                    if (l.id != d && l.id != f) {
                        g = !0;
                        break
                    }
                }
                (g = g || dl(c, b)) && el(b)
            }
        }
    }, dl = function (a, b) {
        var c = a.getElementById(cl(b));
        return !!c && wc(qe(c), function (a) {
                return a.id != Q(b)
            })
    };
    V.prototype.W = function (a, b) {
        var c = Kc(a, function (a) {
            return 0 != Bi(a).length
        });
        c[!1] && G(c[!1], function (a) {
            Nk(this, a, !0)
        }, this);
        if (a = c[!0]) {
            r(b.videoStreamCorrelator) ? this.videoStreamCorrelator = b.videoStreamCorrelator : (c = !0, r(b.changeCorrelator) && (c = b.changeCorrelator), c && Gk(this));
            this.X = b.videoPodNumber || NaN;
            this.ba = b.videoPodPosition || NaN;
            this.$ = b.persistentRoadblocksOnly || !1;
            this.H = b.clearUnfilledSlots || !1;
            Yi(this.F, a);
            this.O = a.length;
            for (c = 0; c < a.length; ++c)fl(this, a[c]);
            if (!this.B) {
                var d = y(function (a) {
                    return Hk(this,
                        a, b.isVideoRefresh ? 3 : 2, "callbackProxy")
                }, this);
                if (this.j)gl(this, d(a), 0); else for (c = 0; c < a.length; ++c)gl(this, d([a[c]]), 0)
            }
        }
    };
    V.prototype.M = function (a) {
        for (var b = 0; b < a.length; ++b)el(a[b]), hl(this, a[b]), Hi(a[b]);
        return !0
    };
    var el = function (a) {
        var b = !!a.v;
        il(a);
        var c = a.getSlotElementId();
        if (b) {
            var d = document.getElementById(c);
            if (d) {
                var e = cl(a) + "__to_be_removed__";
                a = Dc(d.childNodes);
                G(a, function (a) {
                    1 == a.nodeType && a.id == e || d.removeChild(a)
                })
            }
        } else uk(c)
    }, jl = function (a, b) {
        var c = document, d = Bi(b);
        if (0 != d.length) {
            var e = d[0];
            1 < d.length && (e = Ek(b.getSlotElementId(), c) || e);
            var d = Q(b), f = c.getElementById(d);
            if (!f) {
                f = b.getSlotElementId();
                f = c.getElementById(f);
                if (null == f)return;
                var g = c.createElement("div");
                g.id = cl(b);
                g.name = g.id;
                g.style.border =
                    "0pt none";
                a.F.l && (g.style.margin = "auto", g.style.textAlign = "center");
                f.appendChild(g);
                f = wk(g, d, yk, !1, e, c);
                nd(f, "load", function () {

                    DFPConsoleLog("rendered",b);

                    b.C && gi(P(), b.A, b.l);
                })
            }
            dj(a.F, b, f)
        }
    }, bl = function (a, b, c) {
        var d = a.A[c];
        b = Ok(a, b, d);
        var e = P();
        Vh(e, "ad_fetch_period", c, b[0].l);
        delete a.A[c];
        G(b, a.U, a);
        a.j || c != a.C || (window.clearTimeout(a.aa[N(d[0])]), kl(a))
    };
    V.prototype.ca = function () {
        var a = new oj("gpt_request_timeout", L["#23#"]);
        pj(a, this.F);
        qj(a);
        kl(this)
    };
    var kl = function (a) {
        0 < a.m.length && (a.m.shift(), 0 < a.m.length && Zk(a, a.m[0], 0))
    }, ll = function (a, b) {
        jl(a, b);
        null != b.o && a.U(b)
    }, gl = function (a, b, c) {
        for (var d = 0; d < b.j.length; d++)jl(a, b.j[d]);
        a.j ? Zk(a, b, c) : (a.m.push(b), 1 == a.m.length ? Zk(a, b, c) : (b = uc(a.m, function (a) {
            return !a.H
        }), 1 < b.length && (c = new oj("gpt_request_queue_length", L["#23#"]), R(c, "len", "" + b.length), pj(c, a.F), qj(c))))
    };
    V.prototype.R = function (a) {
        if (!this.j) {
            var b = document.getElementById(a.getSlotElementId());
            b && (this.F.D[N(a)] = b)
        }
    };
    V.prototype.Z = function () {
    };
    V.prototype.P = function () {
    };
    V.prototype.N = function (a) {
        hl(this, a);
        var b = null, c = -1;
        if (this.j) {
            ll(this, a);
            b = Xi(this.F);
            if (0 == b.length)return;
            c = Kc(b, function (a) {
                return 0 != Bi(a).length
            });
            c[!1] && G(c[!1], function (a) {
                Nk(this, a, !0)
            }, this);
            b = c[!0];
            if (!b)return;
            c = a.B || !zc(b, a) ? 0 : xc(b, function (b) {
                return N(a) == N(b)
            })
        } else {
            if (0 == Bi(a).length) {
                Nk(this, a, !0);
                return
            }
            b = [a];
            c = 0
        }
        this.B || this.I || (b = Hk(this, b, 1, "callbackProxy"), gl(this, b, c))
    };
    var hl = function (a, b) {
        var c = b.getDivStartsCollapsed();
        null == c && (c = "true" === S(a.l, "google_divs_start_collapsed"));
        c && vk(b.getSlotElementId(), !1)
    };
    V.prototype.U = function (a) {
        try {
            ml(this, a)
        } catch (b) {
        }
    };
    var ml = function (a, b) {
        var c = document, d = b.o, e = {is_backfill_at_render: Ji(b), slot_defined_id_at_render: b.getDefinedId()};
        fi(P(), Di(b), b.l, e);
        b.renderStarted();
        if (null == d || d._empty_)Nk(a, b, a.H), d = Fi(b), d.slotContentChanged = a.H, b.renderEnded(d); else if (a.G)b.renderEnded(Fi(b)); else {
            e = d._html_;
            if (!v(e)) {
                il(b);
                return
            }
            vk(b.getSlotElementId(), !0);
            nl(a, b);
            var f;
            "height" == d._fluid_ ? f = "fluid" : f = [d._width_, d._height_];
            d._use_safe_frame_ ? ol(a, c, b, f, e, function () {
                gi(P(), b.A, b.l)
            }, {sandbox: d._use_sandbox_ || !1}) : pl(a,
                c, b, f, e);
            b.renderEnded(Ei(b, d))
        }
        d = Q(b) + "__hidden__";
        xk(c, d)
    }, il = function (a) {
        var b = document.getElementById(cl(a)), c = a.v;
        if (b) {
            var d = document.getElementById(Q(a)), e = af();
            e.unloadAdBlock && e.unloadAdBlock(d, !!a.v);
            a.v ? (b.style.display = "none", b.id += "__to_be_removed__", d.id = d.id + "__to_be_removed__", window.setTimeout(function () {
                c && uh(c);
                b.parentNode && b.parentNode.removeChild(b)
            }, L["#24#"])) : b.parentNode.removeChild(b)
        } else c && uh(c);
        a.v = null
    }, nl = function (a, b) {
        if (b.v)il(b), jl(a, b); else {
            var c = document.getElementById(Q(b)),
                d = af();
            d.unloadAdBlock && d.unloadAdBlock(c, !!b.v)
        }
    }, pl = function (a, b, c, d, e) {
        b = b.getElementById(Q(c));
        null != b && (v(d) ? Uk(a) : (b.width = String(d[0]), b.height = String(d[1])), Dk(b, e, !0), Vk(a, b, N(c)))
    }, ol = function (a, b, c, d, e, f, g) {
        var h = b.getElementById(cl(c));
        if (null != h) {
            for (var l; l = h.firstChild;)h.removeChild(l);
            a.F.l || (h.style.display = "inline-block");
            g = xh([g, a.F.H, c.L]);
            d = Ak(h, Q(c), e, d, f, g, Ji(c) || !1);
            c.v = d;
            Vk(a, b.getElementById(Q(c)), N(c))
        }
    };
    V.prototype.V = function () {
        return isNaN(this.O) || this.j ? 0 == Xi(this.F).length : Xi(this.F).length == aj(this.F) - this.O
    };
    var al = function (a, b, c) {
        null == document.getElementById(b[c].getSlotElementId()) && ql(a);
        a.j && (wc(b, function (a) {
            return null != document.getElementById(a.getSlotElementId())
        }) || rl(a))
    }, ql = function (a) {
        var b = new oj("gpt_target_slot_has_no_div", L["#29#"]);
        R(b, "sra", a.j ? "1" : "0");
        pj(b, a.F);
        qj(b)
    }, rl = function (a) {
        var b = new oj("gpt_request_slots_have_no_divs", L["#29#"]);
        pj(b, a.F);
        qj(b)
    };
    var sl = function (a, b, c, d) {
        Rk.call(this, a, b, c, d);
        this.C = 0;
        this.m = this.A = null
    };
    z(sl, Rk);
    sl.prototype.w = function () {
        return this.j ? "gut_sync_sra" : "gut_sync"
    };
    sl.prototype.D = function (a) {
        return a ? "ss" : "s"
    };
    var tl = function (a, b) {
        if (!a.B) {
            a.A = b.j;
            var c = a.ga(b), c = Vf(Jk(c, !1)), d = ++a.C, e = va(b.j, function (a) {
                return a.getDefinedId()
            }), e = {request_length: c.length, request_refresh_type: b.l, slot_defined_id_in_request: e.join("-")};
            ei(P(), d, b.j[0].l, e);
            a.j ? Mk(a, b.j, "googletag.impl.pubads.setAdContentsBySlotForSync") : b.j[0].fetchStarted(c);
            Pk();
            document.write('<script type="text/javascript" src="' + c + '">\x3c/script>')
        }
    }, vl = function (a, b) {
        var c = Ok(a, b, a.A);
        a.A = null;
        var d = P();
        Vh(d, "ad_fetch_period", a.C, c[0].l);
        ul(a, a.m)
    };
    sl.prototype.R = function (a) {
        if (!this.j) {
            var b;
            b = null;
            var c = Ae.getElementsByTagName("script");
            c && c.length && (b = c[c.length - 1]);
            (b = b && b.parentElement) && (this.F.D[N(a)] = b)
        }
    };
    sl.prototype.Z = function (a) {
        var b = "google_temp_div_" + N(a), c = '<div id="' + jc(b) + '"></div>';
        document.write(c);
        (b = ie(b)) && dj(this.F, a, b)
    };
    sl.prototype.P = function (a) {
        var b = this.F;
        a = N(a);
        var c = b.B[a];
        c && (c && c.parentNode && c.parentNode.removeChild(c), delete b.B[a])
    };
    sl.prototype.N = function (a) {
        var b = null == this.m;
        this.m = a;
        this.j ? b ? (b = uc(Wi(this.F), function (a) {
            return 0 != Bi(a).length
        }), zc(b, a) || Nk(this, a, !1), b.length && tl(this, Hk(this, b, 1, "googletag.impl.pubads.setAdContentsBySlotForSync"))) : ul(this, a) : 0 == Bi(a).length ? Nk(this, a, !1) : tl(this, Hk(this, [a], 1, a.l ? "googletag.impl.pubads.setPassbackAdContents" : "googletag.impl.pubads.setAdContentsBySlotForSync"))
    };
    var ul = function (a, b) {
        var c = document, d = b.o, e = {slot_defined_id_at_render: b.getDefinedId(), is_backfill_at_render: Ji(b)};
        fi(P(), Di(b), b.l, e);
        if (null == d || d._empty_)Nk(a, b, !1), b.renderEnded(Fi(b)); else if (a.G)b.renderEnded(Fi(b)); else if (d._use_safe_frame_) {
            var e = function () {
                gi(P(), b.A, b.l)
            }, f = d._html_;
            if (f) {
                var g;
                "height" == d._fluid_ ? g = "fluid" : g = [d._width_, d._height_];
                wl(a, c, b, g, f, e, {sandbox: d._use_sandbox_ || !1});
                b.renderEnded(Ei(b, d))
            } else b.renderEnded(Fi(b))
        } else if (d._snippet_ && !d._is_afc_)xl(a, b, c);
        else if (Zf()) {
            c = "googletag.impl.pubads.syncAdSlotLoaded(this, '" + N(b) + "'," + b.l + ");";
            e = "about:blank";
            if (g = S(a.l, "google_domain_reset_url"))if (f = ff(g.match(ef)[3] || null), null === f || 0 <= f.indexOf(document.domain))e = g;
            if ("height" == d._fluid_) {
                Uk(a);
                return
            }
            g = [d._width_, d._height_];
            yl(a, b, e, c, g, a.F.l)
        } else d = zl(a, b, c), c.write("<script>googletag.impl.pubads.createDomIframe(" + qc(d) + " ," + qc(N(b)) + "," + a.F.l + "," + b.l + ");\x3c/script>");
        b.renderStarted()
    }, wl = function (a, b, c, d, e, f, g) {
        Al(c, b);
        var h = Q(c) + "__container__",
            l = '<div id="' + jc(h) + '"></div>';
        b.write(l);
        h = b.getElementById(h);
        null != h && (a.F.l ? h.style.margin = "auto" : h.style.display = "inline-block", g = xh([g, a.F.H, c.L]), d = Ak(h, Q(c), e, d, f, g, Ji(c) || !1), c.v = d, Vk(a, b.getElementById(Q(c)), N(c)))
    }, Bl = function (a, b) {
        var c = b.o, d = a.parentNode, e = c && c._html_;
        e ? (!c._expandable_ || c._is_afc_ && c._is_3pas_ ? (nd(a, "load", function () {
            b.C && gi(P(), b.A, b.l)
        }), Dk(a, e, !0)) : d.innerHTML = e, b.renderEnded(Ei(b, c))) : (d.removeChild(a), b.renderEnded(Fi(b)))
    }, Cl = function (a, b, c, d) {
        b = b.getSlotElementId() +
            "_ad_container";
        var e = '<div id="' + jc(b) + '"';
        d && "height" == d._fluid_ ? e += ' style="width:100%;">' : a.F.l && d ? (e += ' style="width:' + d._width_, e += 'px;margin:auto;">') : e += ">";
        d && (e += d._html_);
        c.write(e + "\n</div>\n");
        return b
    }, Al = function (a, b) {
        var c = b.getElementById(a.getSlotElementId());
        c && c.parentNode && "" === c.innerHTML && c.parentNode.removeChild(c)
    }, xl = function (a, b, c) {
        Al(b, c);
        var d = b.o;
        if (null != d) {
            var e = Cl(a, b, c, d);
            b.renderEnded(Ei(b, d));
            (c = c.getElementById(e)) && Vk(a, c, N(b))
        }
    }, yl = function (a, b, c, d, e, f) {
        Al(b,
            document);
        var g = Q(b), h = [], l = 0, m = 0;
        t(e) ? (l = e[0], m = e[1]) : Uk(a);
        c = Vf(c);
        h.push('<iframe id="', jc(g), '" title="', yk, '" name="', jc(g), '" width="', l, '" height="', m, '" vspace="0" hspace="0" allowtransparency="true" ', "scrolling=", a.H ? '"auto"' : '"no"', ' marginwidth="0" marginheight="0" frameborder="0" style=', '"border:0px;left:0;position:absolute;top:0;"', ' src="', c, '"');
        null != d && h.push(' onload="', d, '"');
        h.push("></iframe>");
        d = [];
        c = b.getSlotElementId() + "_ad_container";
        d.push('<div id="', jc(c), '"');
        f && d.push(' style="text-align:center" ');
        d.push(">");
        d.push('<ins style="position:relative;width:' + l + "px;height:" + m + 'px;border:none;display:inline-table;vertical-align:bottom;">' + ('<ins style="position:relative;width:' + l + "px;height:" + m + 'px;border:none;display:block;">' + h.join("") + "</ins>") + "</ins>");
        d.push("</div>");
        document.write(d.join(""));
        (f = document.getElementById(g)) && Vk(a, f, N(b))
    }, zl = function (a, b, c) {
        Al(b, c || document);
        return Cl(a, b, c || document)
    }, Dl = function (a, b, c, d, e, f, g) {
        a = a.createElement(b);
        a.style.width = d + "px";
        e && (a.style.height =
            e + "px");
        a.style.display = f;
        a.style.position = "relative";
        g && (a.style.margin = g);
        a.style.border = 0;
        c && a.appendChild(c);
        return a
    }, El = function (a, b, c, d, e, f) {
        e = Dl(a, "ins", e, c, d, "block");
        d = Dl(a, "ins", e, c, d, "inline-table");
        d.style.verticalAlign = "bottom";
        b = a.getElementById(b);
        f ? (a = Dl(a, "div", d, c, null, "block", "auto"), b.appendChild(a)) : b.appendChild(d)
    }, Fl = function (a, b, c) {
        var d = document, e = b.o, f = e._width_, g = e._height_, h = e._html_, l = d.createElement("iframe"), m = Q(b);
        l.id = m;
        l.title = yk;
        l.name = m;
        l.width = f;
        l.height = g;
        l.vspace =
            0;
        l.hspace = 0;
        l.allowTransparency = "true";
        l.scrolling = "no";
        l.marginWidth = 0;
        l.marginHeight = 0;
        l.frameBorder = 0;
        l.style.border = 0;
        l.style.position = "absolute";
        l.style.top = "0";
        l.style.left = "0";
        nd(l, "load", function () {
            b.C && gi(P(), b.A, b.l)
        });
        El(d, a, f, g, l, c);
        l.contentWindow.document.write(h);
        l.contentWindow.document.write("<script>document.close();\x3c/script>");
        b.renderEnded(Ei(b, e))
    };
    var Gl = function () {
        this.m = this.j = this.l = null
    }, W = function (a) {
        null == a.l && (a.l = new Ui(Ki));
        return a.l
    }, X = function (a) {
        if (null != a.j)return a.j;
        var b = S(Hl(a), "google_ad_impl"), c = P();
        switch (b) {
            case "gut_sync_sra":
                $h(c, !0);
                a.j = new sl(!0, W(a), Hl(a), nj(void 0));
                Rh(c, "sync");
                break;
            case "gut_friendly_iframe":
                $h(c, !1);
                a.j = new V(!1, W(a), Hl(a), nj(void 0));
                Rh(c, "fif");
                break;
            case "gut_friendly_iframe_sra":
                $h(c, !0);
                a.j = new V(!0, W(a), Hl(a), nj(void 0));
                Rh(c, "fif");
                break;
            default:
                $h(c, !1), a.j = new sl(!1, W(a), Hl(a), nj(void 0)),
                    Rh(c, "sync")
        }
        b = a.j;
        b.B = null != S(b.l, "google_nofetch") || !!window.google_noFetch || b.B;
        b.I = null != S(b.l, "google_disable_initial_load") || !!window.google_DisableInitialLoad || b.I;
        b.G = null != S(b.l, "google_norender") || b.G;
        var c = y(b.da, b), d = window;
        d.attachEvent ? d.attachEvent("onload", c) : d.addEventListener && d.addEventListener("load", c, !1);
        c = y(b.fa, b);
        d = window;
        d.attachEvent ? d.attachEvent("onunload", c) : d.addEventListener && d.addEventListener("unload", c, !1);
        b.J = af().setupOse(b.o);
        return a.j
    }, Hl = function (a) {
        null ==
        a.m && (a.m = new rj);
        return a.m
    }, Il = null, Y = function () {
        Il || (Il = new Gl);
        return Il
    }, Jl = null, Kl = function () {
        Jl || (Jl = new Gl);
        return Jl
    };
    var Ll = function () {
    };
    k = Ll.prototype;
    k.addSlot = function (a) {
        if (!a)return null;
        var b = a.getAdUnitPath();
        return b && b.length ? Vi(W(Y()), a) : null
    };
    k.fillSlot = function (a) {
        var b = Y(), c = X(b), b = W(b);
        a && b.j[N(a)] && (null == a.o || c.j) && (c.R(a), c.Z(a), c.N(a), c.P(a))
    };
    k.setCookieOptions = function (a) {
        Y();
        var b = nj(a);
        b.j = a;
        jj(b)
    };
    k.setTagForChildDirectedTreatment = function (a) {
        W(Y()).J = a
    };
    k.setKidsFriendlyAds = function (a) {
        W(Y()).K = a
    };
    k.passback = function (a) {
        if (a) {
            var b = a.getAdUnitPath();
            b && b.length && (b = Kl(), Vi(W(b), a), X(b).N(a))
        }
    };
    k.disableInitialLoad = function () {
        window.google_DisableInitialLoad = !0
    };
    k.addAttribute = function (a, b) {
        var c = W(Y()), d = b;
        if (!ac(rc(a))) {
            ac(rc(d)) && (d = "");
            var e = c.m[a];
            c.m[a] = e ? e + "," + d : d
        }
    };
    k.clearAttribute = function (a) {
        var b = W(Y());
        ac(rc(a)) || b.m[a] && delete b.m[a]
    };
    k.addPageCategoryExclusion = function (a) {
        var b = W(Y());
        ac(rc(a)) || Ac(b.C, a)
    };
    k.clearPageCategoryExclusions = function () {
        W(Y()).C = []
    };
    k.addAdSensePageAttribute = function (a, b) {
        var c = W(Y());
        Oi(c.o, a, b)
    };
    k.addAdSenseSlotAttribute = function (a, b, c) {
        var d = W(Y());
        a && d.j[N(a)] && (a = N(a), null == d.u[a] && (d.u[a] = new Ni(d.M)), Oi(d.u[a], b, c))
    };
    k.enableSingleRequest = function () {
        var a = Hl(Y());
        null == S(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_sync_sra")
    };
    k.collapseEmptyDivs = function (a) {
        var b = Hl(Y());
        b.j.google_collapse_empty_div = "true";
        a && (b.j.google_divs_start_collapsed = "true")
    };
    k.enableAsyncRendering = function () {
        var a = Hl(Y());
        null == S(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe")
    };
    k.enableAsyncSingleRequest = function () {
        var a = Hl(Y());
        null == S(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe_sra")
    };
    k.setVideoContentInformation = function (a, b) {
        var c = X(Y());
        c.T = !0;
        c.L = a;
        c.K = b;
        c.videoStreamCorrelator = Math.floor(4503599627370496 * Math.random())
    };
    k.getVideoContentInformation = function () {
        var a = X(Y());
        return {cmsid: a.K, vid: a.L}
    };
    k.getVideoStreamCorrelator = function () {
        return X(Y()).videoStreamCorrelator
    };
    k.refresh = function (a, b) {
        var c = Y(), d = X(c), c = W(c), e = null, e = null != a ? Ml(a) : Wi(c);
        0 == e.length || d.W(e, b)
    };
    k.destroySlots = function (a) {
        var b = W(Y());
        this.clearSlotContents(a);
        for (var c = 0; c < a.length; ++c)if (b.j[N(a[c])]) {
            var d = a[c].getAdUnitPath();
            Pc(b.j, N(a[c]));
            Pc(b.v[d], a[c].getInstance());
            var e;
            a:{
                e = b.v[d];
                var f = void 0;
                for (f in e) {
                    e = !1;
                    break a
                }
                e = !0
            }
            e && Pc(b.v, d)
        }
    };
    k.getCorrelator = function () {
        return X(Y()).o + ""
    };
    k.setCorrelator = function (a) {
        Gk(X(Y()), a)
    };
    k.setMobilePlatform = function () {
        Hl(Y()).j.target_platform = "MOBILE"
    };
    k.setApiExperiment = function (a) {
        ig(a)
    };
    k.isAdRequestFinished = function () {
        return X(Y()).V()
    };
    k.isSlotAPersistentRoadblock = function (a) {
        return a ? !$i(W(Y()), a) : !1
    };
    k.clearNoRefreshState = function () {
        W(Y()).I = {}
    };
    k.clearSlotContents = function (a) {
        var b = Y(), c = X(b), b = W(b), d = null, d = a ? Ml(a) : Wi(b);
        return c.M(d)
    };
    var Nl = function (a) {
        W(Y()).G = a
    }, Ol = function (a) {
        W(Y()).H = a
    };
    Ll.prototype.setLocation = function (a) {
        W(Y()).A = a
    };
    Ll.prototype.setPublisherProvidedId = function (a) {
        W(Y()).L = a
    };
    Ll.prototype.getVersion = function () {
        return "88"
    };
    Ll.prototype.setCenterAds = function (a) {
        W(Y()).l = a
    };
    var Ml = function (a) {
        var b = W(Y());
        return uc(a, function (a) {
            return !!b.j[N(a)]
        })
    }, Pl = null, Ql = function (a, b) {
        var c;
        c = n.googletag || (n.googletag = {});
        c = c.impl || (c.impl = {});
        c = c.pubads || (c.pubads = {});
        c[a] || (c[a] = b)
    };
    Ql("createDomIframe", function (a, b, c, d) {
        try {
            var e;
            e = d ? Kl() : Y();
            var f = X(e), g;
            if (g = W(e).j[b]) {
                Fl(a, g, c);
                var h = document.getElementById(Q(g));
                h && Vk(f, h, b)
            }
        } catch (l) {
            O(2401, l)
        }
    });
    Ql("setAdContentsBySlotForSync", function (a) {
        try {
            vl(X(Y()), a)
        } catch (b) {
            O(2403, b)
        }
    });
    Ql("setPassbackAdContents", function (a) {
        try {
            vl(X(Kl()), a)
        } catch (b) {
            O(2404, b)
        }
    });
    Ql("setAdContentsBySlotForAsync", function (a, b) {
        try {
            bl(X(Y()), a, b)
        } catch (c) {
            O(2405, c)
        }
    });
    Ql("syncAdSlotLoaded", function (a, b, c) {
        try {
            var d = X(c ? Kl() : Y());
            if (b) {
                var e = d.F.j[b];
                e && !e.N && (e.N = !0, Bl(a, e))
            }
        } catch (f) {
            O(2407, f)
        }
    });
    Ql("setCookieInfo", function (a) {
        try {
            var b;
            Y();
            b = nj(void 0);
            lj(b, a)
        } catch (c) {
            O(2408, c)
        }
    });
    var Rl = null, Sl = Qd || Rd && !tf || Nd || "function" == typeof n.btoa;
    var Tl = {
        adsense_ad_format: "google_ad_format",
        adsense_ad_types: "google_ad_type",
        adsense_allow_expandable_ads: "google_allow_expandable_ads",
        adsense_background_color: "google_color_bg",
        adsense_bid: "google_bid",
        adsense_border_color: "google_color_border",
        adsense_channel_ids: "google_ad_channel",
        adsense_content_section: "google_ad_section",
        adsense_cpm: "google_cpm",
        adsense_ed: "google_ed",
        adsense_encoding: "google_encoding",
        adsense_family_safe: "google_safe",
        adsense_feedback: "google_feedback",
        adsense_flash_version: "google_flash_version",
        adsense_font_face: "google_font_face",
        adsense_font_size: "google_font_size",
        adsense_hints: "google_hints",
        adsense_host: "google_ad_host",
        adsense_host_channel: "google_ad_host_channel",
        adsense_host_tier_id: "google_ad_host_tier_id",
        adsense_keyword_type: "google_kw_type",
        adsense_keywords: "google_kw",
        adsense_line_color: "google_line_color",
        adsense_link_color: "google_color_link",
        adsense_relevant_content: "google_contents",
        adsense_reuse_colors: "google_reuse_colors",
        adsense_targeting: "google_targeting",
        adsense_targeting_types: "google_targeting",
        adsense_test_mode: "google_adtest",
        adsense_text_color: "google_color_text",
        adsense_ui_features: "google_ui_features",
        adsense_ui_version: "google_ui_version",
        adsense_url_color: "google_color_url",
        alternate_ad_iframe_color: "google_alternate_color",
        alternate_ad_url: "google_alternate_ad_url",
        demographic_age: "google_cust_age",
        demographic_ch: "google_cust_ch",
        demographic_gender: "google_cust_gender",
        demographic_interests: "google_cust_interests",
        demographic_job: "google_cust_job",
        demographic_l: "google_cust_l",
        demographic_lh: "google_cust_lh",
        demographic_u_url: "google_cust_u_url",
        demographic_unique_id: "google_cust_id",
        document_language: "google_language",
        geography_override_city: "google_city",
        geography_override_country: "google_country",
        geography_override_region: "google_region",
        page_url: "google_page_url"
    };
    var Ul = rg("#36#");
    var Wl = function (a, b, c) {
        var d = Vl++;
        this.j = new zi(a, d, b);
        this.j.l = !0;
        this.j.addService(c);
        this.l = c
    }, Vl = 1;
    k = Wl.prototype;
    k.setClickUrl = function (a) {
        try {
            return this.j.setClickUrl(a), this
        } catch (b) {
            O(1202, b)
        }
    };
    k.setTargeting = function (a, b) {
        try {
            return this.j.setTargeting(a, b), this
        } catch (c) {
            O(1204, c)
        }
    };
    k.updateTargetingFromMap = function (a) {
        try {
            var b = this.j.getTargetingMap();
            if (!a || v(a) || "number" == typeof a)return sa().error(F("PassbackSlot.updateTargetingFromMap", [a])), this;
            try {
                return I(a, function (a, b) {
                    this.setTargeting(b, a)
                }, this), this
            } catch (c) {
                return this.j.w = Qc(b), sa().error(F("PassbackSlot.updateTargetingFromMap", [a])), this
            }
        } catch (c) {
            O(1208, c)
        }
    };
    k.setAudExtId = function (a) {
        try {
            return og(a) && (this.j.Y = a), this
        } catch (b) {
            O(1205, b)
        }
    };
    k.setTagForChildDirectedTreatment = function (a) {
        try {
            if (0 === a || 1 === a)this.j.V = a;
            return this
        } catch (b) {
            O(1203, b)
        }
    };
    k.display = function () {
        try {
            Xl(this.l, this.j)
        } catch (a) {
            O(1201, a)
        }
    };
    k.setForceSafeFrame = function (a) {
        this.j.setForceSafeFrame(a);
        return this
    };
    k.set = function (a, b) {
        try {
            if (!v(a) || !b || "page_url" != a)return this;
            var c = this.j;
            c.l && (c.ua = "" + b)
        } catch (d) {
            O(1206, d)
        }
        return this
    };
    k.get = function (a) {
        try {
            return v(a) && "page_url" == a ? this.j.getPassbackPageUrl() : null
        } catch (b) {
            O(1207, b)
        }
    };
    k.ia = function (a) {
        this.j.ia(a)
    };
    var Yl = function (a, b) {
        this.j = a;
        this.l = b || {changeCorrelator: !0}
    }, Z = function () {
        Dh.call(this);
        this.w = !1;
        this.j = null;
        this.T = 0;
        this.K = -1;
        this.W = 0;
        this.J = {};
        this.D = {};
        this.N = [];
        this.Y = this.M = "";
        this.u = this.U = this.X = this.aa = !1;
        this.m = Ul ? !1 : !0;
        this.R = Ul;
        this.O = this.H = !1;
        this.o = [];
        this.I = [];
        this.A = [];
        this.ca = {};
        this.P = !1;
        this.C = -1;
        this.da = this.fa = "";
        this.v = [];
        this.L = this.V = !1;
        this.Z = {};
        null !== hf(window.location.href, "google_force_sra") && this.v.push("108809056");
        var a = rg("#53#");
        a && this.forceExperiment(a);
        a =
            jd(["108809055", "108809056", "108809057"], 3 * rg("#47#"));
        ac(rc(a)) || this.forceExperiment(a);
        zc(this.v, "108809056") && (this.u = !0)
    };
    z(Z, Dh);
    k = Z.prototype;
    k.set = function (a, b) {
        try {
            if (!(v(a) && 0 < a.length))return this.log.j(F("PubAdsService.set", [a, b]), this, null), this;
            this.J[a] = b;
            this.log.info(Xa(a, String(b), this.getName()), this, null);
            return this
        } catch (c) {
            O(21, c)
        }
    };
    k.get = function (a) {
        try {
            return this.J[a]
        } catch (b) {
            O(22, b)
        }
    };
    k.getAttributeKeys = function () {
        try {
            var a = [];
            I(this.J, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(23, b)
        }
    };
    k.display = function (a, b, c, d) {
        try {
            this.enable();
            var e = c ? Zl(a, b, c) : Zl(a, b);
            e.addService(this);
            d && e.setClickUrl(d);
            $l(e.getSlotId().getDomId())
        } catch (f) {
            O(24, f)
        }
    };
    k.ma = function () {
        this.w || (ci(), 0 < this.o.length ? am(this) : Qj(this.na, this));
        this.w = !0
    };
    k.na = function () {
        this.w || ci();
        this.w = !0;
        this.j || am(this)
    };
    k.getName = function () {
        return "publisher_ads"
    };
    var am = function (a) {
        if (!a.j)try {
            di();
            window.google_noFetch = !1;
            window.google_DisableInitialLoad = !1;
            a.j = Pl || (Pl = new Ll);
            a.log.info(hb("GPT"), a);
            a.j.setCookieOptions(a.T);
            a.j.setTagForChildDirectedTreatment(a.K);
            a.j.setKidsFriendlyAds(a.W);
            G(a.v, function (a) {
                this.j.setApiExperiment(a)
            }, a);
            a.j.setCenterAds(a.R);
            Ul && (a.u = !1, a.j.setMobilePlatform());
            a.H && a.j.collapseEmptyDivs(a.O);
            bm(a);
            if (0 < a.o.length)for (var b = 0; b < a.o.length; ++b)a.G(a.o[b]);
            if (0 < a.I.length)for (b = 0; b < a.I.length; ++b)Xl(a, a.I[b]);
            a.V && (W(Y()).w = !0);
            Nl(a.L);
            Ol(a.Z);
            A("pubadsReady", !0)
        } catch (c) {
            Eg(3001, c)
        }
    };
    Z.prototype.pa = function (a) {
        this.m || (a.R = !1);
        Dh.prototype.pa.call(this, a)
    };
    Z.prototype.G = function (a) {
        if (li().m && !this.m)this.log.error(kb(), this); else if (this.w && this.na(), this.j) {
            if (cm(this), dm(this, a))if (this.log.info(jb()), this.j.fillSlot(a), this.ca[a.getAdUnitPath()] = !0, this.j)for (a = 0; a < this.A.length; a++) {
                var b = this.A[a];
                b.j[0].getAdUnitPath() in this.ca && (this.refresh(b.j, b.l), Array.prototype.splice.call(this.A, a, 1), a--)
            } else this.log.error(ib(), this)
        } else if (this.m || this.w && 0 == this.o.length) {
            for (var b = !1, c = 0; c < this.o.length; ++c)a === this.o[c] && (b = !0);
            b || (this.log.info(lb(a.getAdUnitPath(),
                "GPT"), this, a), this.o.push(a))
        } else this.log.error(nb(a.getAdUnitPath()), this, a)
    };
    var dm = function (a, b) {
        if (a.j && null == a.j.addSlot(b))return a.log.error(Vb(b.getAdUnitPath()), a, b), !1;
        for (var c = b.getAttributeKeys(), d = 0; d < c.length; ++d)c[d] in Tl ? a.j.addAdSenseSlotAttribute(b, Tl[c[d]], String(b.get(c[d]))) : a.log.j(pb(String(c[d]), String(b.get(c[d])), b.getAdUnitPath()), a, b);
        return !0
    }, bm = function (a) {
        if (!a.X && a.j) {
            var disableInitialLoad = window.localStorage.getItem("disableInitialLoad");
            var singleRequest = window.localStorage.getItem("singleRequest");
            var asyncRendering = window.localStorage.getItem("asyncRendering");
            if (disableInitialLoad !== null) {
                a.U = disableInitialLoad;
            }
            if (singleRequest !== null) {
                a.u = singleRequest;
            }
            if (asyncRendering !== null) {
                a.m = asyncRendering;
            }
            a.X = !0;
            if (a.u) {
                a.m ? a.j.enableAsyncSingleRequest() : a.j.enableSingleRequest();
                cm(a);
                for (var b = a.getSlots(), c = 0; c < b.length; ++c)dm(a, b[c])
            } else a.m && a.j.enableAsyncRendering();
            a.U &&
            a.j.disableInitialLoad();
            em(a);
            fm(a)
        }
    }, cm = function (a) {
        if (!a.aa) {
            a.aa = !0;
            for (var b = a.getAttributeKeys(), c = 0; c < b.length; ++c)b[c] in Tl ? a.j.addAdSensePageAttribute(Tl[b[c]], String(a.get(b[c]))) : a.log.j(ob(String(b[c]), String(a.get(b[c]))), a);
            a.j.addAdSensePageAttribute("google_tag_info", "v2");
            I(a.D, function (a, b) {
                if (t(a))for (var c = 0; c < a.length; ++c)this.j.addAttribute(b, a[c])
            }, a);
            G(a.N, function (a) {
                this.j.addPageCategoryExclusion(a)
            }, a);
            a.j.setPublisherProvidedId(a.Y);
            a.M && a.j.setLocation(a.M)
        }
    };
    k = Z.prototype;
    k.setCookieOptions = function (a) {
        try {
            if (!w(a) || !og(a))return this.log.j(qb(String(a)), this), this;
            this.T = a;
            this.j && this.j.setCookieOptions(a);
            return this
        } catch (b) {
            O(17, b)
        }
    };
    k.setTagForChildDirectedTreatment = function (a) {
        try {
            if (0 !== a && 1 !== a)return this.log.j(Pb(String(a)), this), this;
            this.K = a;
            this.j && this.j.setTagForChildDirectedTreatment(a);
            return this
        } catch (b) {
            O(18, b)
        }
    };
    k.clearTagForChildDirectedTreatment = function () {
        try {
            return this.K = -1, this.j && this.j.setTagForChildDirectedTreatment(-1), this
        } catch (a) {
            O(19, a)
        }
    };
    k.setKidsFriendlyAds = function (a) {
        try {
            if (0 !== a && 1 !== a)return this.log.j(Ub(String(a)), this), this;
            this.W = a;
            this.j && this.j.setKidsFriendlyAds(a);
            return this
        } catch (b) {
            O(18, b)
        }
    };
    k.setTargeting = function (a, b) {
        try {
            var c = null;
            v(b) ? c = [b] : t(b) ? c = b : ca(b) && (c = Dc(b));
            var d = c ? c.join() : String(b);
            if (!v(a) || ac(rc(a)) || !c)return this.log.j(F("PubAdsService.setTargeting", [a, b]), this), this;
            this.D[a] = c;
            this.log.info(Ob(a, d, this.getName()), this);
            if (this.j)for (this.j.clearAttribute(a), d = 0; d < c.length; ++d)this.j.addAttribute(a, c[d]);
            return this
        } catch (e) {
            O(1, e)
        }
    };
    k.clearTargeting = function (a) {
        try {
            if (!v(a) || ac(rc(a)))return this.log.j(F("PubAdsService.clearTargeting", [a]), this), this;
            if (!this.D[a])return this.log.j(Lb(a, this.getName()), this), this;
            delete this.D[a];
            this.log.info(Kb(a, this.getName()), this);
            this.j && this.j.clearAttribute(a);
            return this
        } catch (b) {
            O(2, b)
        }
    };
    k.setCategoryExclusion = function (a) {
        try {
            if (!v(a) || ac(rc(a)))return this.log.j(F("PubAdsService.setCategoryExclusion", [a]), this), this;
            Ac(this.N, a);
            this.log.info(Mb(a), this);
            this.j && this.j.addPageCategoryExclusion(a);
            return this
        } catch (b) {
            O(3, b)
        }
    };
    k.clearCategoryExclusions = function () {
        try {
            return this.N = [], this.log.info(Nb(), this), this.j && this.j.clearPageCategoryExclusions(), this
        } catch (a) {
            O(4, a)
        }
    };
    k.disableInitialLoad = function () {
        try {
            this.j ? this.log.j(sb("disableInitialLoad", "pubads"), this) : this.U = !0
        } catch (a) {
            O(5, a)
        }
    };
    k.enableSingleRequest = function () {
        try {
            return this.l && !this.u ? this.log.j(rb("enableSingleRequest"), this) : zc(this.v, "108809057") || zc(this.v, "108809056") || (this.log.info(ub("single request"), this), this.u = !0), this.u
        } catch (a) {
            O(6, a)
        }
    };
    k.enableAsyncRendering = function () {
        try {
            return this.l && !this.m ? this.log.j(rb("enableAsyncRendering"), this) : (this.log.info(ub("asynchronous rendering"), this), this.m = !0), this.m
        } catch (a) {
            O(7, a)
        }
    };
    k.enableSyncRendering = function () {
        try {
            if (this.l && this.m)this.log.j(rb("enableSyncRendering"), this); else {
                this.log.info(ub("synchronous rendering"), this);
                this.m = !1;
                for (var a = this.getSlots(), b = 0; b < a.length; ++b)a[b].R = !1
            }
            return !this.m
        } catch (c) {
            O(8, c)
        }
    };
    k.setCentering = function (a) {
        try {
            this.log.info(vb("centering", String(a)), this), this.R = a
        } catch (b) {
            O(9, b)
        }
    };
    k.setPublisherProvidedId = function (a) {
        try {
            return this.l ? this.log.j(tb("setPublisherProvidedId", a), this) : (this.log.info(vb("PPID", a), this), this.Y = a), this
        } catch (b) {
            O(20, b)
        }
    };
    k.definePassback = function (a, b) {
        try {
            if (!v(a) || 0 >= a.length || !b)return this.log.error(F("PubAdsService.definePassback", [a, b])), null;
            var c = tg(a), d = P();
            bi(d, "count_of_passback");
            d.w || (d.w = !0, Rh(d, "n" + c));
            Wh(d);
            return new Wl(a, b, this)
        } catch (e) {
            O(10, e)
        }
    };
    k.defineOutOfPagePassback = function (a) {
        try {
            var b = this.definePassback(a, [1, 1]);
            b.ia(!0);
            return b
        } catch (c) {
            O(35, c)
        }
    };
    var Xl = function (a, b) {
        a.na();
        a.j ? a.j.passback(b) : (a.log.info(mb(b.getAdUnitPath(), "GPT"), a, b), a.I.push(b))
    };
    Z.prototype.refresh = function (a, b) {
        try {
            if (a && !t(a) || b && (!x(b) || b.changeCorrelator && !da(b.changeCorrelator)))this.log.j(F("PubAdsService.refresh", uc([a, b], r)), this); else {
                var c = null;
                if (a && (c = gm(this, a), !c.length)) {
                    this.log.j(F("PubAdsService.refresh", uc([a, b], r)), this);
                    return
                }
                if (this.j) {
                    this.log.info(Bb(), this);
                    var d = !0;
                    r(b) && r(b.changeCorrelator) && (d = b.changeCorrelator);
                    bi(P(), "count_of_refreshes_called");
                    this.j.refresh(c, {changeCorrelator: d})
                } else this.u ? (this.log.info(Ab(), this), c ? Ac(this.A, new Yl(c,
                    b)) : Ac(this.A, new Yl(this.getSlots(), b))) : this.log.j(xb(), this)
            }
        } catch (e) {
            O(11, e)
        }
    };
    Z.prototype.enableVideoAds = function () {
        try {
            this.P = !0, em(this)
        } catch (a) {
            O(12, a)
        }
    };
    Z.prototype.setVideoContent = function (a, b) {
        try {
            this.P = !0, this.fa = a, this.da = b, em(this)
        } catch (c) {
            O(13, c)
        }
    };
    Z.prototype.getVideoContent = function () {
        try {
            return this.j ? this.j.getVideoContentInformation() : null
        } catch (a) {
            O(30, a)
        }
    };
    var em = function (a) {
        a.P && a.j && a.j.setVideoContentInformation(a.fa, a.da)
    }, fm = function (a) {
        a.j && a.j.setCorrelator(-1 == a.C ? void 0 : a.C)
    };
    k = Z.prototype;
    k.getCorrelator = function () {
        try {
            return 0 == this.getSlots().length ? "not_available" : this.j ? this.j.getCorrelator() : "not_loaded"
        } catch (a) {
            O(27, a)
        }
    };
    k.setCorrelator = function (a) {
        try {
            if (Qf(window))return this;
            if (!og(a) || 0 === a)return this.log.j(Tb(String(a)), this), this;
            this.C = a;
            fm(this);
            return this
        } catch (b) {
            O(28, b)
        }
    };
    k.updateCorrelator = function () {
        try {
            return this.C = -1, fm(this), this
        } catch (a) {
            O(25, a)
        }
    };
    k.isAdRequestFinished = function () {
        try {
            return this.j ? this.j.isAdRequestFinished() : !1
        } catch (a) {
            O(29, a)
        }
    };
    k.collapseEmptyDivs = function (a) {
        try {
            return this.H ? this.log.j(Ib(), this) : this.l ? this.log.j(rb("collapseEmptyDivs"), this) : (this.O = !!a, this.log.info(Hb(String(this.O)), this), this.H = !0), this.H
        } catch (b) {
            O(14, b)
        }
    };
    k.clear = function (a) {
        try {
            if (!this.j)return this.log.j(zb(), this), !1;
            var b = null;
            if (a && (b = gm(this, a), 0 == b.length))return this.log.j(F("PubAdsService.clear", uc([a], r)), this), !1;
            this.log.info(Cb(), this);
            return this.j.clearSlotContents(b)
        } catch (c) {
            O(15, c)
        }
    };
    k.setLocation = function (a, b, c) {
        try {
            var d = "role:1 producer:12";
            if (r(b)) {
                if (!w(a))return this.log.j(Fb("Latitude")), this;
                if (!w(b))return this.log.j(Fb("Longitude")), this;
                d += " latlng{ latitude_e7: " + Math.round(1E7 * a) + " longitude_e7: " + Math.round(1E7 * b) + "}";
                if (r(c)) {
                    if (isNaN(c))return this.log.j(Fb("Radius")), this;
                    d += " radius:" + Math.round(c)
                }
            } else {
                if (50 < a.length) {
                    var e = a.substring(0, 50);
                    this.log.j(Gb(String(a), "50", e));
                    a = e
                }
                d += ' loc:"' + a + '"'
            }
            var e = d, f;
            if (Sl)f = n.btoa(e); else {
                d = [];
                for (b = a = 0; b < e.length; b++) {
                    for (var g =
                        e.charCodeAt(b); 255 < g;)d[a++] = g & 255, g >>= 8;
                    d[a++] = g
                }
                if (!Rl)for (Rl = {}, g = 0; 65 > g; g++)Rl[g] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g);
                g = Rl;
                e = [];
                for (a = 0; a < d.length; a += 3) {
                    var h = d[a], l = a + 1 < d.length, m = l ? d[a + 1] : 0, p = a + 2 < d.length, q = p ? d[a + 2] : 0;
                    b = h >> 2;
                    c = (h & 3) << 4 | m >> 4;
                    var u = (m & 15) << 2 | q >> 6, E = q & 63;
                    p || (E = 64, l || (u = 64));
                    e.push(g[b], g[c], g[u], g[E])
                }
                f = e.join("")
            }
            this.M = "a " + f;
            return this
        } catch (ta) {
            O(16, ta)
        }
    };
    k.getVersion = function () {
        return this.j ? this.j.getVersion() : void 0
    };
    k.forceExperiment = function (a) {
        this.l ? this.log.j(tb("forceExperiment", a), this) : this.v.push(a)
    };
    var Ah = function () {
        try {
            var a = li(), b = ki(a, "publisher_ads");
            if (!b) {
                var c = b = new Z;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(26, d)
        }
    }, gm = function (a, b) {
        for (var c = [], d = 0; d < b.length; ++d) {
            var e = b[d];
            e instanceof zi ? e.P || c.push(e) : a.log.j(Jb(String(d)), a)
        }
        return c
    };
    Z.prototype.markAsAmp = function () {
        this.V = !0;
        this.j && (W(Y()).w = !0)
    };
    Z.prototype.setSafeFrameConfig = function (a) {
        try {
            if (a && x(a)) {
                var b = wh(a);
                b && (this.Z = b)
            } else this.log.error(F("PubAdsService.setSafeFrameConfig", [a]), this);
            return this
        } catch (c) {
            O(37, c)
        }
    };
    var hm = function (a, b) {
        var c = a.getSlots(), d = uc(c, function (a) {
            return zc(b, a)
        });
        0 != d.length && (a.j ? a.j.destroySlots(d) : G(d, function (a) {
            Bc(this.o, a)
        }, a), G(d, function (a) {
            Bc(c, a)
        }))
    };
    Z.prototype.setForceSafeFrame = function (a) {
        try {
            if (!da(a))return this.log.j(Eb(String(a)), this), this;
            this.L = a;
            this.j && Nl(this.L);
            return this
        } catch (b) {
            O(36, b)
        }
    };
    Z.prototype.markAsGladeControl = function () {
        this.forceExperiment("108809101")
    };
    Z.prototype.markAsGladeOptOut = function () {
        this.forceExperiment("108809110")
    };
    A("pubads", Ah);
    var im = function () {
        this.j = {};
        this.m = {};
        this.l = {};
        this.o = sa()
    }, jm = function (a, b, c, d) {
        if (!v(b) || 0 >= b.length || !c)return null;
        b in a.j || (a.j[b] = [], a.m[b] = 0);
        c = new zi(b, a.m[b], c, d);
        a.m[b]++;
        d = c.getSlotId().getDomId();
        if (a.l[d])return a.o.error(Sa(d)), null;
        a.j[b].push(c);
        a.l[c.getSlotId().getDomId()] = c;
        yg.push(c);
        a = ug([c])[0];
        b = P();
        bi(b, "count_of_slots");
        b.w || (b.w = !0, Rh(b, "n" + a));
        Wh(b);
        return c
    }, km = function (a) {
        var b = [];
        Lc(a.j, function (a) {
            G(a, function (a) {
                b.push(a)
            })
        });
        return b
    }, lm = function (a, b) {
        G(b, function (a) {
            a.P = !0;
            a.j.info(Wb(a.m.toString()), null, a);
            var b = a.getAdUnitPath();
            Bc(this.j[b], a);
            0 == this.j[b].length && Pc(this.j, b);
            Pc(this.l, a.getSlotId().getDomId());
            Bc(yg, a)
        }, a)
    }, mm = function (a, b) {
        if (b && !t(b))return a.o.j(F("googletag.destroySlots", [b])), !1;
        var c;
        b ? (Fc(b), c = uc(b, function (a) {
            return a instanceof zi && !a.P
        })) : c = km(a);
        if (!c || 0 == c.length)return !1;
        hm(Ah(), c);
        lm(a, c);
        return !0
    };
    im.prototype.u = function (a, b) {
        var c = b || 0, d = v(a) && this.j[a] || [];
        return 0 <= c && c < d.length && (d = d[c], d.getSlotId().getInstance() == c) ? d : null
    };
    var nm = function (a, b) {
        return Mc(a.j, function (a) {
            return zc(a, b)
        })
    }, om = function () {
        var a = ka();
        return a.slot_manager_instance || (a.slot_manager_instance = new im)
    }, Zl = function (a, b, c) {
        try {
            var d = om();
            return d && jm(d, a, b, c)
        } catch (e) {
            O(802, e)
        }
    };
    A("defineOutOfPageSlot", function (a, b) {
        try {
            var c = om();
            if (!c)return null;
            var d = jm(c, a, [1, 1], b);
            return d ? (d.ia(!0), d) : null
        } catch (e) {
            O(801, e)
        }
    });
    A("defineSlot", Zl);
    A("defineUnit", Zl);
    A("destroySlots", function (a) {
        try {
            var b = om();
            return !(!b || !mm(b, a))
        } catch (c) {
            O(803, c)
        }
    });
    im.prototype.find = im.prototype.u;
    im.getInstance = om;
    var $l = function (a) {
        try {
            var b = sa();
            if (v(a)) {
                var c, d = om();
                if (c = d.l[a] ? d.l[a] : null)if (c.xa = !0, c.R && !c.hasWrapperDiv())c.j.j(Pa(c.G, c.m.getDomId()), null, c); else for (a = 0; a < c.u.length; ++a)c.u[a].l && c.u[a].G(c); else b.error(Ra(String(a)))
            } else b.error(Qa(String(a)))
        } catch (e) {
            O(2201, e)
        }
    };
    A("display", $l);
    var pm = function () {
        Dh.call(this);
        this.I = !0;
        this.o = this.H = !1;
        this.w = 0;
        this.v = this.u = void 0;
        this.J = this.D = !1;
        this.C = {};
        this.m = {};
        this.j = !1;
        this.A = {}
    };
    z(pm, Dh);
    k = pm.prototype;
    k.set = function (a, b) {
        v(a) && 0 < a.length ? (this.A[a] = b, this.log.info(Xa(a, String(b), this.getName()), this, null)) : this.log.j(Ya(String(a), String(b), this.getName()), this, null);
        return this
    };
    k.get = function (a) {
        return this.A[a]
    };
    k.getAttributeKeys = function () {
        var a = [];
        I(this.A, function (b, c) {
            a.push(c)
        });
        return a
    };
    k.display = function (a, b, c, d) {
        this.enable();
        a = c ? Zl(a, b, c) : Zl(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        $l(a.getSlotId().getDomId())
    };
    k.ma = function () {
        if (this.I) {
            if (!this.J) {
                var a = document, b = pg();
                try {
                    this.log.info(fb("GPT CompanionAds"), this), hd(a, b), this.J = !0
                } catch (c) {
                    Eg(414, c), this.log.error(gb("GPT CompanionAds"), this)
                }
            }
        } else this.D || (n.document.write('<script type="text/javascript" src="' + qg() + '">\x3c/script>'), this.D = !0)
    };
    k.enableSyncLoading = function () {
        try {
            this.I = !1
        } catch (a) {
            O(402, a)
        }
    };
    k.setRefreshUnfilledSlots = function (a) {
        try {
            da(a) && (this.H = a)
        } catch (b) {
            O(403, b)
        }
    };
    k.setClearUnfilledSlots = function (a) {
        try {
            da(a) && (this.o = a)
        } catch (b) {
            O(412, b)
        }
    };
    k.notifyUnfilledSlots = function (a) {
        try {
            if (this.H)qm(this, rm(this, a)); else if (this.o) {
                var b = rm(this, a), c = Ah();
                if (c.l)for (c.clear(b), a = 0; a < b.length; ++a) {
                    var d = new zh(b[a], !0, null, null, null, null, null, null, c.getName());
                    Eh(c, "slotRenderEnded", d)
                } else this.log.error(cb("PubAds", "clear"))
            }
        } catch (e) {
            O(413, e)
        }
    };
    k.isRoadblockingSupported = function () {
        var a = Ah();
        if (!a.l)return !1;
        var a = a.getSlots(), b = this.getSlots();
        if (a.length != b.length)return !1;
        for (var c = 0; c < b.length; ++c) {
            for (var d = !1, e = 0; e < a.length; ++e)if (b[c] === a[e]) {
                d = !0;
                break
            }
            if (!d)return !1
        }
        return !0
    };
    k.refreshAllSlots = function () {
        try {
            this.H && qm(this, null)
        } catch (a) {
            O(404, a)
        }
    };
    k.setVideoSession = function (a, b, c, d) {
        try {
            this.j = !1, this.w = 0, this.v = this.u = void 0, this.w = a, this.u = b, this.v = c, this.j = d
        } catch (e) {
            O(405, e)
        }
    };
    k.getDisplayAdsCorrelator = function () {
        try {
            return Ah().getCorrelator()
        } catch (a) {
            O(406, a)
        }
    };
    k.getVideoStreamCorrelator = function () {
        try {
            var a;
            var b = Ah();
            if (b.j) {
                var c = b.j.getVideoStreamCorrelator();
                a = isNaN(c) ? 0 : c
            } else a = 0;
            return a
        } catch (d) {
            O(407, d)
        }
    };
    var qm = function (a, b) {
        var c = Ah();
        if (c.l) {
            if (a.j) {
                if (!a.isRoadblockingSupported()) {
                    a.log.j(bb());
                    return
                }
                c.j ? (c.log.info(Db(), c), c.j.clearNoRefreshState()) : c.log.j(yb(), c);
                c.clear()
            }
            var d = {isVideoRefresh: !0};
            r(a.w) && (d.videoStreamCorrelator = a.w);
            a.u && (d.videoPodNumber = a.u);
            a.v && (d.videoPodPosition = a.v);
            a.j && (d.persistentRoadblocksOnly = a.j);
            a.o && (d.clearUnfilledSlots = a.o);
            a:if (b && !t(b) || d.videoStreamCorrelator && !w(d.videoStreamCorrelator) || d.videoPodNumber && !w(d.videoPodNumber) || d.videoPodPosition && !w(d.videoPodPosition) ||
                d.persistentRoadblocksOnly && !da(d.persistentRoadblocksOnly) || d.clearUnfilledSlots && !da(d.clearUnfilledSlots))c.log.j(F("PubAdsService.internalVideoRefresh", uc([b, d], r)), c); else if (c.j) {
                var e = null;
                if (b && (e = gm(c, b), !e.length)) {
                    c.log.error(wb("internalVideoRefresh"), c);
                    break a
                }
                c.log.info(Bb(), c);
                c.j.refresh(e, d)
            } else c.log.j(xb(), c)
        } else a.log.error(cb("PubAds", "refresh"))
    };
    pm.prototype.isSlotAPersistentRoadblock = function (a) {
        try {
            var b = Ah();
            if (b.l && nm(om(), a))return b.j ? b.j.isSlotAPersistentRoadblock(a) : !1;
            this.log.error(db());
            return !1
        } catch (c) {
            O(408, c)
        }
    };
    var rm = function (a, b) {
        for (var c = a.getSlotIdMap(), d = [], e = 0; e < b.length; ++e) {
            var f = b[e];
            Nc(c, f) ? d.push(c[f]) : a.log.j(eb(), a)
        }
        return d
    };
    pm.prototype.getName = function () {
        return "companion_ads"
    };
    var pg = function () {
        return sg() + "//pagead2.googlesyndication.com/pagead/show_companion_ad.js"
    };
    pm.prototype.onImplementationLoaded = function () {
        try {
            this.log.info(hb("GPT CompanionAds"), this), this.D = !0
        } catch (a) {
            O(409, a)
        }
    };
    var sm = function (a, b) {
        var c = b && b.getSlotId().getId();
        if (c && c in a.C && b.hasWrapperDiv() && a.l && !a.isSlotAPersistentRoadblock(b)) {
            b.J = a.C[c];
            var d = null;
            a.m.hasOwnProperty(c) && (d = a.m[c], delete a.m[c]);
            c = new zh(b, !1, d, null, null, null, null, null, a.getName());
            return Ci(b, c)
        }
        return !1
    };
    pm.prototype.G = function (a) {
        sm(this, a)
    };
    pm.prototype.fillSlot = function (a, b, c, d) {
        try {
            return nm(om(), a) && v(b) && 0 < b.length ? (this.C[a.getSlotId().getId()] = b, null != c && null != d && (this.m[a.getSlotId().getId()] = [c, d]), sm(this, a)) : !1
        } catch (e) {
            O(410, e)
        }
    };
    pm.prototype.slotRenderEnded = function (a, b, c) {
        try {
            var d = null;
            null != b && null != c && (d = [b, c]);
            var e = new zh(a, !1, d, null, null, null, null, null, this.getName());
            Eh(this, "slotRenderEnded", e)
        } catch (f) {
            O(411, f)
        }
    };
    A("companionAds", function () {
        try {
            var a = li(), b = ki(a, "companion_ads");
            if (!b) {
                var c = b = new pm;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(401, d)
        }
    });
    var tm = function () {
        Dh.call(this);
        this.j = {};
        this.m = {}
    };
    z(tm, Dh);
    k = tm.prototype;
    k.getName = function () {
        return "content"
    };
    k.set = function (a, b) {
        v(a) && 0 < a.length ? (this.j[a] = b, this.log.info(Xa(a, String(b), this.getName()), this, null)) : this.log.j(Ya(String(a), String(b), this.getName()), this, null);
        return this
    };
    k.get = function (a) {
        return this.j[a]
    };
    k.getAttributeKeys = function () {
        var a = [];
        I(this.j, function (b, c) {
            a.push(c)
        });
        return a
    };
    k.display = function (a, b, c, d) {
        this.enable();
        a = c ? Zl(a, b, c) : Zl(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        $l(a.getSlotId().getDomId())
    };
    var um = function (a, b) {
        var c = b && b.getSlotId().getId();
        c in a.m && a.l && b.hasWrapperDiv() && !b.C && (b.J = a.m[c], c = new zh(b, !1, null, null, null, null, null, null, a.getName()), Ci(b, c))
    };
    tm.prototype.ma = function () {
        for (var a = this.getSlots(), b = 0; b < a.length; ++b)um(this, a[b])
    };
    tm.prototype.G = function (a) {
        um(this, a)
    };
    tm.prototype.setContent = function (a, b) {
        try {
            nm(om(), a) && v(b) && 0 < b.length && (this.m[a.getSlotId().getId()] = b, um(this, a))
        } catch (c) {
            O(602, c)
        }
    };
    A("content", function () {
        try {
            var a = li(), b = ki(a, "content");
            if (!b) {
                var c = b = new tm;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(601, d)
        }
    });
    var vm = null, wm = function () {
            var a = sg() + "//publisherconsole.appspot.com/js/loader.js";
            hd(document, a)
        }, xm = function () {
            var a = window, b = document;
            if (ka()._pubconsole_disable_)return !1;
            var c;
            c = document.cookie.split("google_pubconsole=");
            if (c = 2 == c.length ? c[1].split(";")[0] : "")if (c = c.split("|"), 0 < c.length && ("1" == c[0] || "0" == c[0]))return !0;
            li();
            c = !1;
            try {
                c = a.top.document.URL === b.URL
            } catch (d) {
            }
            a = c ? b.URL : b.referrer;
            return null !== hf(a, "google_debug") || null !== hf(a, "dfpdeb") || null !== hf(a, "google_console") || null !== hf(a,
                    "google_force_console") || null !== hf(a, "googfc")
        }, zm = function () {
            try {
                xm() && wm(), ym()
            } catch (a) {
                O(2002, a)
            }
        }, ym = function () {
            nd(window, "message", function (a) {
                a.source == window && "gpt_open_pubconsole" == a.data.type && (a = a.data.slotDomId) && (window.googletag && window.googletag.console ? window.googletag.console.openConsole(a) : (vm = a, wm()))
            })
        },

        DFPConsoleLog = function (action,slot) {
            if(action==="finish") {
                loadDFPConsole && clearInterval(loadDFPConsole);
                window.DFPConsole["endTime"]=performance.now();
                window.postMessage("dfpStream"+JSON.stringify(window.DFPConsole), "*");
                return;
            }
            var idSlot = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            for(var key in slot.w) {
                if(/^(p|pos|slot)$/.test(key)) idSlot = slot.w[key][0];
            }
            if(!(idSlot in window.DFPConsole.slots)) window.DFPConsole.slots[idSlot]={};
            window.DFPConsole.slots[idSlot]["id"] = slot.m.o;
            window.DFPConsole.slots[idSlot][action] = window.performance.now();
        };

    window.addEventListener('message', function (e) {
        var m = e.data.match ? e.data.match(/^dfpForceConsole(.*)/) : null;
        var f = e.data.match ? e.data.match(/^dfpFinishParse(.*)/) : null;
        if(m && !window.DFPConsole["ready"]) {
            var r = confirm("Tenemos problemas para capturar los datos de DFP. Quieres forzar la consola?");
            if (r == true) {
                DFPConsoleLog("finish");
            }
            loadDFPConsole && clearInterval(loadDFPConsole);
        }
        if(f) {
            var rd = JSON.parse(f[1]);
            window.DFPConsole.slotsSort = rd;
            window.DFPConsole["ready"]=true;
        }
    });

    "complete" === document.readyState ? zm() : la(window, zm);

    A("disablePublisherConsole", function () {
        try {
            ka()._pubconsole_disable_ = !0
        } catch (a) {
            O(2001, a)
        }
    });
    A("onPubConsoleJsLoad", function () {
        vm && (window.googletag.console.openConsole(vm), vm = null)
    });
    var Am = function () {
        this.j = [];
        this.m = !1;
        this.l = sa()
    };
    Am.prototype.addSize = function (a, b) {
        try {
            var c;
            if (!(c = !ni(a) || "fluid" == a)) {
                var d;
                if (!(d = ni(b)))if (t(b)) {
                    t(b) && zc(b, "fluid") && oi(b);
                    b:{
                        for (var e = b.length, f = v(b) ? b.split("") : b, g = 0; g < e; g++)if (g in f && !ni.call(void 0, f[g])) {
                            d = !1;
                            break b
                        }
                        d = !0
                    }
                } else d = !1;
                c = !d
            }
            if (c)return this.m = !0, this.l.j(F("SizeMappingBuilder.addSize", [a, b])), this;
            this.j.push([a, b]);
            return this
        } catch (h) {
            O(1601, h)
        }
    };
    Am.prototype.build = function () {
        try {
            if (this.m)return this.l.j(Va()), null;
            Jc(this.j);
            return this.j
        } catch (a) {
            O(1602, a)
        }
    };
    var Ic = function (a, b) {
        var c;
        a:{
            c = b[0];
            for (var d = a[0], e = Gc, f = Math.min(c.length, d.length), g = 0; g < f; g++) {
                var h = e(c[g], d[g]);
                if (0 != h) {
                    c = h;
                    break a
                }
            }
            c = Gc(c.length, d.length)
        }
        return c
    };
    A("sizeMapping", function () {
        try {
            return new Am
        } catch (a) {
            O(1603, a)
        }
    });
    function Bm() {
        G(document.getElementsByTagName("script"), function (a) {
            var b = a.src;
            b && (0 <= b.indexOf("/tag/js/gpt.js") || 0 <= b.indexOf("/tag/js/gpt_mobile.js")) && a.innerHTML && !a.googletag_executed && (a.googletag_executed = !0, eval(a.innerHTML))
        })
    }

    if (window.googletag.evalScripts)window.googletag.evalScripts(); else {
        A("evalScripts", function () {
            Bm()
        });
        try {
            md(window.location.href) && (vg["#37#"] = 1, vg["#38#"] = 1);
            var hi = P();
            A("apiReady", !0);
            var Cm = ka().cmd;
            if (!Cm || t(Cm)) {
                var Dm = ka().cmd = new Fg;
                Cm && 0 < Cm.length && Dm.push.apply(Dm, Cm)
            }
            Bm();
            var Em = rg("#34#");
            if (Math.random() < Em) {
                var Fm = document, Gm = vf(Fm ? ne(Fm) : window);
                if (Md() || H("iPad") || H("iPod") || !(sf || Qd || Pd && Zd(11))) {
                    var Hm = ka().fifWin, Im = Hm && Hm.document || Fm, Jm = Im.createElement("iframe");
                    Jm.src = Gm;
                    Jm.style.visibility =
                        "hidden";
                    Jm.style.display = "none";
                    var Km = Im.getElementsByTagName("script");
                    if (0 < Km.length) {
                        var Lm = Km[Km.length - 1];
                        Lm.parentNode && Lm.parentNode.insertBefore(Jm, Lm.nextSibling)
                    }
                } else id(Fm, Gm)
            }
            var Mm = rg("#57#");
            Math.random() < Mm && id(document, Xf(!0) + "/static/glade.js");
            var Nm = hi;
            Ph(Nm, "loader_loaded_instant");
            Nm.w ? Ph(Nm, "loader_loaded_instant_nw") : Nm.U = (new Date).getTime();
            var Om = sg();
            ii(Om + "//www.googletagservices.com/tag/js/gpt.js");
            ii(Om + "//www.googletagservices.com/tag/js/gpt_mobile.js")
        } catch (a) {
            O(2801,
                a)
        }
    };
}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
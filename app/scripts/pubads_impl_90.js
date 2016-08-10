(function() {
    var window = this, document = this.document;

    var llega = 0;

    window["DFPConsole"] = window["DFPConsole"] || {};
    window["DFPConsole"].slots = window["DFPConsole"].slots || {};

    var loadDFPConsole = null, k, q = this, r = function (a) {
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
        var c = a.split("."), d = q;
        c[0] in d || !d.execScript || d.execScript("var " + c[0]);
        for (var e; c.length && (e = c.shift());)!c.length && r(b) ? d[e] = b : d[e] ? d = d[e] : d = d[e] = {}
    }, z = function (a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.sa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Gb = function (a, c, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)g[h - 2] = arguments[h];
            return b.prototype[c].apply(a, g)
        }
    };
    var ka = function () {
        return q.googletag || (q.googletag = {})
    }, A = function (a, b) {
        var c = ka();
        c.hasOwnProperty(a) || (c[a] = b)
    }, la = function (a, b) {
        a.addEventListener ? a.addEventListener("load", b, !1) : a.attachEvent && a.attachEvent("onload", b)
    }, na = function (a, b) {
        a.addEventListener ? a.addEventListener("beforeunload", b, !1) : a.attachEvent && a.attachEvent("onbeforeunload", b)
    };
    var oa = function (a, b) {
        this.l = a;
        this.j = b || []
    };
    oa.prototype.getMessageId = function () {
        return this.l
    };
    oa.prototype.getMessageArgs = function () {
        return this.j
    };
    var pa = function (a, b, c, d, e) {
        this.l = new Date;
        this.v = d || null;
        this.u = c || null;
        this.m = a;
        this.o = b;
        this.j = e || null
    };
    k = pa.prototype;
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
    var qa = ["Debug", "Info", "Warning", "Error", "Fatal"];
    pa.prototype.toString = function () {
        var a = this.l.toTimeString() + ": " + qa[this.m] + ": " + this.o;
        this.j && (a += " Duration: " + (this.l.getTime() - this.j.getTimestamp().getTime()) + "ms.");
        return a
    };
    var ra = function () {
        this.l = []
    };
    ra.prototype.getAllEvents = function () {
        return this.l
    };
    ra.prototype.getEventsByService = function (a) {
        return sa(this, function (b) {
            return b.getService() === a
        })
    };
    ra.prototype.getEventsBySlot = function (a) {
        return sa(this, function (b) {
            return b.getSlot() === a
        })
    };
    ra.prototype.getEventsByLevel = function (a) {
        return sa(this, function (b) {
            return b.getLevel() >= a
        })
    };
    var sa = function (a, b) {
        for (var c = [], d = 0; d < a.l.length; ++d)b(a.l[d]) && c.push(a.l[d]);
        return c
    };
    ra.prototype.log = function (a, b, c, d, e) {
        a = new pa(a, b, c, d, e);
        this.l.push(a);
        return a
    };
    ra.prototype.info = function (a, b, c, d) {
        return this.log(1, a, b, c, d)
    };
    ra.prototype.j = function (a, b, c, d) {
        return this.log(2, a, b, c, d)
    };
    ra.prototype.error = function (a, b, c, d) {
        return this.log(3, a, b, c, d)
    };
    var ta = function () {
        var a = ka();
        return a.debug_log || (a.debug_log = new ra)
    };
    A("getEventLog", ta);
    var B = function (a) {
            return function () {
                return new oa(a, [])
            }
        }, D = function (a) {
            return function (b) {
                return new oa(a, [b])
            }
        }, E = function (a) {
            return function (b, c) {
                return new oa(a, [b, c])
            }
        }, ua = function (a) {
            return function (b, c, d) {
                return new oa(a, [b, c, d])
            }
        }, va = function (a) {
            return "[" + F(a, function (a) {
                    return v(a) ? "'" + a + "'" : t(a) ? va(a) : String(a)
                }).join(", ") + "]"
        }, wa = B(1), xa = D(2), ya = D(3), za = D(4), Aa = D(5), Ba = D(6), Ca = B(8), Da = ua(9), Ea = ua(10), Fa = E(12), Ga = D(13), Ha = D(14), Ia = B(16), Ja = ua(17), Ka = B(19), La = D(20), Ma = D(21), Na = E(22), Oa =
            E(23), Pa = D(26), Qa = D(27), Ra = D(28), Sa = D(30), Ta = E(31), Ua = B(34), Va = D(35), Wa = ua(36), Xa = ua(37), Ya = B(38), Za = D(39), $a = E(40), ab = B(42), bb = E(43), cb = B(44), db = B(45), eb = D(46), fb = D(47), gb = D(48), hb = B(49), ib = B(50), jb = B(52), kb = E(53), lb = E(54), mb = D(55), nb = E(57), ob = ua(58), pb = D(59), qb = D(60), rb = E(61), sb = E(62), tb = D(63), ub = E(64), vb = D(65), wb = B(66), xb = B(67), yb = B(68), zb = B(69), Ab = B(70), Bb = B(71), Cb = B(72), Db = D(74), Eb = D(75), Fb = ua(77), Gb = D(78), Hb = B(79), Ib = D(80), Jb = E(82), Kb = E(84), Lb = D(85), Mb = B(87), Nb = ua(88), Ob = D(90), Pb = D(92), Qb = D(93), Zr = D(110),
        Rb = D(94), Sb = D(95), G = function (a, b) {
            var c = va(b), c = c.substring(1, c.length - 1);
            return new oa(96, [a, c])
        }, Tb = D(97), Ub = D(98), Vb = D(99), Wb = D(100), Xb = E(101);
    var Yb = function (a) {
        if (Error.captureStackTrace)Error.captureStackTrace(this, Yb); else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    z(Yb, Error);
    Yb.prototype.name = "CustomError";
    var Zb;
    var $b = function (a) {
            return /^[\s\xa0]*$/.test(a)
        }, ac = function (a) {
            return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        }, ic = function (a) {
            if (!bc.test(a))return a;
            -1 != a.indexOf("&") && (a = a.replace(cc, "&amp;"));
            -1 != a.indexOf("<") && (a = a.replace(dc, "&lt;"));
            -1 != a.indexOf(">") && (a = a.replace(ec, "&gt;"));
            -1 != a.indexOf('"') && (a = a.replace(fc, "&quot;"));
            -1 != a.indexOf("'") && (a = a.replace(gc, "&#39;"));
            -1 != a.indexOf("\x00") && (a = a.replace(hc, "&#0;"));
            return a
        }, cc = /&/g, dc = /</g, ec = />/g, fc = /"/g, gc = /'/g, hc = /\x00/g, bc = /[\x00&<>"']/,
        lc = function (a) {
            return -1 != a.indexOf("&") ? "document" in q ? jc(a) : kc(a) : a
        }, jc = function (a) {
            var b = {"&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"'}, c;
            c = q.document.createElement("div");
            return a.replace(mc, function (a, e) {
                var f = b[a];
                if (f)return f;
                if ("#" == e.charAt(0)) {
                    var g = Number("0" + e.substr(1));
                    isNaN(g) || (f = String.fromCharCode(g))
                }
                f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
                return b[a] = f
            })
        }, kc = function (a) {
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
        }, mc = /&([^;\s<&]+);?/g, nc = {
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
        }, oc = {"'": "\\'"}, pc = function (a) {
            a = String(a);
            for (var b = ['"'], c = 0; c < a.length; c++) {
                var d = a.charAt(c), e = d.charCodeAt(0), f = c + 1, g;
                if (!(g = nc[d])) {
                    if (!(31 < e && 127 > e))if (d in oc)d = oc[d]; else if (d in nc)d = oc[d] = nc[d]; else {
                        g =
                            d.charCodeAt(0);
                        if (31 < g && 127 > g)e = d; else {
                            if (256 > g) {
                                if (e = "\\x", 16 > g || 256 < g)e += "0"
                            } else e = "\\u", 4096 > g && (e += "0");
                            e += g.toString(16).toUpperCase()
                        }
                        d = oc[d] = e
                    }
                    g = d
                }
                b[f] = g
            }
            b.push('"');
            return b.join("")
        }, qc = function (a) {
            return null == a ? "" : String(a)
        }, rc = function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        };
    var sc = function (a, b) {
            if (v(a))return v(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)if (c in a && a[c] === b)return c;
            return -1
        }, H = function (a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
        }, tc = function (a, b) {
            for (var c = a.length, d = [], e = 0, f = v(a) ? a.split("") : a, g = 0; g < c; g++)if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
            return d
        }, F = function (a, b, c) {
            for (var d = a.length, e = Array(d), f = v(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
            return e
        },
        uc = function (a, b) {
            var c = 0;
            H(a, function (d, e) {
                c = b.call(void 0, c, d, e, a)
            });
            return c
        }, vc = function (a, b) {
            for (var c = a.length, d = v(a) ? a.split("") : a, e = 0; e < c; e++)if (e in d && b.call(void 0, d[e], e, a))return !0;
            return !1
        }, xc = function (a, b) {
            var c = wc(a, b, void 0);
            return 0 > c ? null : v(a) ? a.charAt(c) : a[c]
        }, wc = function (a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
            return -1
        }, yc = function (a, b) {
            return 0 <= sc(a, b)
        }, zc = function (a, b) {
            yc(a, b) || a.push(b)
        }, Ac = function (a, b) {
            var c = sc(a,
                b);
            0 <= c && Array.prototype.splice.call(a, c, 1)
        }, Bc = function (a) {
            return Array.prototype.concat.apply(Array.prototype, arguments)
        }, Cc = function (a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++)c[d] = a[d];
                return c
            }
            return []
        }, Dc = function (a, b, c) {
            return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
        }, Ec = function (a) {
            for (var b = {}, c = 0, d = 0; d < a.length;) {
                var e = a[d++], f;
                f = e;
                f = x(f) ? "o" + (f[fa] || (f[fa] = ++ga)) : (typeof f).charAt(0) + f;
                Object.prototype.hasOwnProperty.call(b, f) ||
                (b[f] = !0, a[c++] = e)
            }
            a.length = c
        }, Gc = function (a, b) {
            a.sort(b || Fc)
        }, Ic = function (a) {
            for (var b = Hc, c = Array(a.length), d = 0; d < a.length; d++)c[d] = {index: d, value: a[d]};
            var e = b || Fc;
            Gc(c, function (a, b) {
                return e(a.value, b.value) || a.index - b.index
            });
            for (d = 0; d < a.length; d++)a[d] = c[d].value
        }, Fc = function (a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        }, Jc = function (a, b) {
            for (var c = {}, d = 0; d < a.length; d++) {
                var e = a[d], f = b.call(void 0, e, d, a);
                r(f) && (c[f] || (c[f] = [])).push(e)
            }
            return c
        };
    var Kc = function (a, b) {
            for (var c in a)b.call(void 0, a[c], c, a)
        }, Lc = function (a, b) {
            for (var c in a)if (b.call(void 0, a[c], c, a))return !0;
            return !1
        }, Mc = function (a) {
            var b = [], c = 0, d;
            for (d in a)b[c++] = d;
            return b
        }, Nc = function (a, b) {
            return null !== a && b in a
        }, Oc = function (a, b) {
            for (var c in a)if (a[c] == b)return !0;
            return !1
        }, Pc = function (a) {
            for (var b in a)return !1;
            return !0
        }, Qc = function (a, b) {
            b in a && delete a[b]
        }, Rc = function (a) {
            var b = {}, c;
            for (c in a)b[c] = a[c];
            return b
        }, Sc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Tc = function (a, b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d)a[c] = d[c];
                for (var f = 0; f < Sc.length; f++)c = Sc[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var Uc;
    a:{
        var Vc = q.navigator;
        if (Vc) {
            var Wc = Vc.userAgent;
            if (Wc) {
                Uc = Wc;
                break a
            }
        }
        Uc = ""
    }
    var I = function (a) {
        return -1 != Uc.indexOf(a)
    };
    var Xc = function () {
        return I("Trident") || I("MSIE")
    }, Yc = function () {
        return (I("Chrome") || I("CriOS")) && !I("Edge")
    };
    var $c = function () {
        this.na = "";
        this.Fa = Zc
    };
    $c.prototype.Aa = !0;
    $c.prototype.ma = function () {
        return this.na
    };
    var ad = /^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/i, Zc = {}, bd = function (a) {
        var b = new $c;
        b.na = a;
        return b
    };
    bd("about:blank");
    var dd = function () {
        this.Ga = cd
    };
    dd.prototype.Aa = !0;
    dd.prototype.ma = function () {
        return ""
    };
    var cd = {};
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
            b instanceof dd ? b instanceof dd && b.constructor === dd && b.Ga === cd ? d = "" : (ba(b), d = "type_error:TrustedResourceUrl") : b instanceof $c ? b instanceof $c && b.constructor === $c && b.Fa === Zc ? d = b.na : (ba(b), d = "type_error:SafeUrl") :
                (d = b, d instanceof $c || (d = d.Aa ? d.ma() : String(d), ad.test(d) || (d = "about:invalid#zClosurez"), d = bd(d)), d = d.ma());
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
        }, J = function (a, b, c) {
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
    var nd = function (a, b, c, d, e, f) {
        var g = "";
        a && (g += a + ":");
        c && (g += "//", b && (g += b + "@"), g += c, d && (g += ":" + d));
        e && (g += e);
        f && (g += "?" + f);
        return g
    }, od = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/, pd = function (a) {
        return a ? decodeURI(a) : a
    }, qd = /#|$/, rd = function (a, b) {
        var c = a.search(qd), d;
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
    var sd = function (a) {
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
    }, td =
        function (a) {
            if (!a.length)return 0;
            for (var b = [], c = 0; 33 >= c; c++)b[c] = 0;
            for (c = a.length - 1; 0 <= c; c--) {
                var d = sd(a[c]);
                0 <= d && (b[33 - d] = 1)
            }
            return parseInt(b.join(""), 2)
        };
    var ud = function (a, b) {
        this.j = a;
        this.l = b
    }, vd = function (a, b, c) {
        this.url = a;
        this.ta = b;
        this.Ca = !!c;
        this.depth = w(void 0) ? void 0 : null
    }, xd = function (a) {
        a = (this.l = a || q) || q;
        this.m = a.top == a ? 1 : gd(a.top) ? 2 : 3;
        3 != this.m && Date.parse(q.top.document.lastModified);
        this.j = wd(this.l)
    }, yd = function (a, b) {
        for (var c = "", d = a.j[Math.max(a.j.length - 1, 0)].url || "", e = 0; e < b.length && 26 > e; e++) {
            var f;
            null != b[e] && (f = pd(b[e].match(od)[3] || null));
            if ("" != d && f && f == pd(d.match(od)[3] || null))c += "11"; else {
                var g;
                if (g = f)a:{
                    g = b[e];
                    for (var h = [/^https?:\/\/(secure)?pubads\.g\.doubleclick\.net(\:\d+)?($|(\/.*))/i,
                        /^https?:\/\/(googleads|adx)\.g\.doubleclick\.net(\:\d+)?($|(\/.*))/i, /^https?:\/\/(?!adx)ad.*\.doubleclick\.net(\:\d+)?($|(\/.*))/i, /^https?:\/\/(tpc|pagead2).googlesyndication\.com(\:\d+)?($|(\/.*))/i, /^https?:\/\/www.googletagservices\.com(\:\d+)?($|(\/.*))/i], l = 0; l < h.length; ++l)if (h[l].test(g)) {
                        g = !0;
                        break a
                    }
                    g = !1
                }
                c = g ? c + "10" : f && f && 0 <= sd(f) ? c + "01" : c + "00"
            }
        }
        return "" == c ? 0 : parseInt(c, 2)
    }, wd = function (a) {
        var b = a || q, c = [], d, e = null;
        do {
            var f = b;
            gd(f) ? (d = f.location.href, e = f.document && f.document.referrer || null) :
                (d = e, e = null);
            c.push(new vd(d || "", f));
            try {
                b = f.parent
            } catch (g) {
                b = null
            }
        } while (b && f != b);
        b = 0;
        for (f = c.length - 1; b <= f; ++b)c[b].depth = f - b;
        f = a || q;
        if (f.location && f.location.ancestorOrigins && f.location.ancestorOrigins.length == c.length - 1)for (b = 1; b < c.length; ++b)a = c[b], a.url || (a.url = f.location.ancestorOrigins[b - 1] || "", a.Ca = !0);
        return c
    };
    var zd = function (a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }, Ad = function (a, b, c) {
        a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
    };
    var Bd = function (a, b, c, d, e) {
        this.v = c || 4E3;
        this.m = a || "&";
        this.w = b || ",$";
        this.o = r(d) ? d : "trn";
        this.B = e || null;
        this.u = !1;
        this.l = {};
        this.A = 0;
        this.j = []
    }, Cd = function (a, b) {
        var c = {};
        c[a] = b;
        return [c]
    }, Dd = function (a, b, c, d) {
        a.j.push(b);
        a.l[b] = Cd(c, d)
    }, Gd = function (a, b, c, d) {
        b = b + "//" + c + d;
        var e = Ed(a) - d.length - 0;
        if (0 > e)return "";
        a.j.sort(function (a, b) {
            return a - b
        });
        d = null;
        c = "";
        for (var f = 0; f < a.j.length; f++)for (var g = a.j[f], h = a.l[g], l = 0; l < h.length; l++) {
            if (!e) {
                d = null == d ? g : d;
                break
            }
            var n = Fd(h[l], a.m, a.w);
            if (n) {
                n = c + n;
                if (e >=
                    n.length) {
                    e -= n.length;
                    b += n;
                    c = a.m;
                    break
                } else a.u && (c = e, n[c - 1] == a.m && --c, b += n.substr(0, c), c = a.m, e = 0);
                d = null == d ? g : d
            }
        }
        f = "";
        a.o && null != d && (f = c + a.o + "=" + (a.B || d));
        return b + f + ""
    }, Ed = function (a) {
        if (!a.o)return a.v;
        var b = 1, c;
        for (c in a.l)b = c.length > b ? c.length : b;
        return a.v - a.o.length - b - a.m.length - 1
    }, Fd = function (a, b, c, d, e) {
        var f = [];
        J(a, function (a, h) {
            var l = Hd(a, b, c, d, e);
            l && f.push(h + "=" + l)
        });
        return f.join(b)
    }, Hd = function (a, b, c, d, e) {
        if (null == a)return "";
        b = b || "&";
        c = c || ",$";
        "string" == typeof c && (c = c.split(""));
        if (a instanceof Array) {
            if (d = d || 0, d < c.length) {
                for (var f = [], g = 0; g < a.length; g++)f.push(Hd(a[g], b, c, d + 1, e));
                return f.join(c[d])
            }
        } else if ("object" == typeof a)return e = e || 0, 2 > e ? encodeURIComponent(Fd(a, b, c, d, e + 1)) : "...";
        return encodeURIComponent(String(a))
    };
    var Jd = function (a, b, c, d, e) {
        try {
            var f;
            c instanceof Bd ? f = c : (f = new Bd, J(c, function (a, b) {
                var c = f, d = c.A++, e = Cd(b, a);
                c.j.push(d);
                c.l[d] = e
            }));
            if (Math.random() < (d || a.j)) {
                var g = Gd(f, a.l, a.m, a.o + b + "&");
                "undefined" === typeof e ? Id(q, g) : Id(q, g, e)
            }
        } catch (h) {
        }
    }, Id = function (a, b, c) {
        a.google_image_requests || (a.google_image_requests = []);
        var d = a.document.createElement("img");
        if (c) {
            var e = function (a) {
                c(a);
                Ad(d, "load", e);
                Ad(d, "error", e)
            };
            zd(d, "load", e);
            zd(d, "error", e)
        }
        d.src = b;
        a.google_image_requests.push(d)
    };
    var Kd = function (a, b, c) {
        this.l = a;
        this.u = b;
        this.m = c;
        this.o = this.j
    }, Ld = function (a, b, c) {
        this.message = a;
        this.j = b || "";
        this.l = c || -1
    }, Nd = function (a, b) {
        var c;
        try {
            c = b()
        } catch (f) {
            var d = a.m;
            try {
                var e = Md(f), d = a.o.call(a, "osd::adp::reg", e, void 0, void 0)
            } catch (g) {
                a.j("pAR", g)
            }
            if (!d)throw f;
        } finally {
        }
        return c
    }, Pd = function (a) {
        var b = Od;
        return function () {
            for (var c = [], d = 0; d < arguments.length; ++d)c[d] = arguments[d];
            return Nd(b, function () {
                return a.apply(void 0, c)
            })
        }
    };
    Kd.prototype.j = function (a, b, c, d, e) {
        try {
            var f = e || this.u, g = new Bd;
            g.u = !0;
            Dd(g, 1, "context", a);
            b instanceof Ld || (b = Md(b));
            Dd(g, 2, "msg", b.message.substring(0, 512));
            b.j && Dd(g, 3, "file", b.j);
            0 < b.l && Dd(g, 4, "line", b.l.toString());
            b = {};
            if (d)try {
                d(b)
            } catch (C) {
            }
            d = [b];
            g.j.push(5);
            g.l[5] = d;
            var h, l = wd(), n = new vd(q.location.href, q, !1), m = l.length - 1;
            for (d = m; 0 <= d; --d) {
                var p = l[d];
                if (p.url && !p.Ca) {
                    n = p;
                    break
                }
            }
            var p = null, u = l.length && l[m].url;
            0 != n.depth && u && (p = l[m]);
            h = new ud(n, p);
            h.l && Dd(g, 6, "top", h.l.url || "");
            Dd(g, 7, "url",
                h.j.url || "");
            Jd(this.l, f, g, c)
        } catch (C) {
            try {
                Jd(this.l, f, {context: "ecmserr", rctx: a, msg: Qd(C), url: h.j.url}, c)
            } catch (ma) {
            }
        }
        return this.m
    };
    var Md = function (a) {
        return new Ld(Qd(a), a.fileName, a.lineNumber)
    }, Qd = function (a) {
        var b = a.toString();
        a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
        a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
        a.stack && (b = Rd(a.stack, b));
        return b
    }, Rd = function (a, b) {
        try {
            -1 == a.indexOf(b) && (a = b + "\n" + a);
            for (var c; a != c;)c = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
            return a.replace(/\n */g, "\n")
        } catch (d) {
            return b
        }
    };
    var Sd = function (a) {
        return function () {
            return a
        }
    }, Td = function (a) {
        var b = arguments, c = b.length;
        return function () {
            for (var a = 0; a < c; a++)if (!b[a].apply(this, arguments))return !1;
            return !0
        }
    }, Ud = function (a, b) {
        b && (a = y(a, b));
        var c = null, d = !1, e = [], f = function () {
            c = null;
            d && (d = !1, g())
        }, g = function () {
            c = q.setTimeout(f, 200);
            a.apply(null, e)
        };
        return function (a) {
            e = arguments;
            c ? d = !0 : g()
        }
    };
    var Vd = !1, Wd = function (a, b, c) {
        "" != b && (c ? a.j.hasOwnProperty(c) && (a.j[c] = b) : a.l[b] = !0)
    }, Yd = function () {
        var a = Xd, b = [];
        J(a.l, function (a, d) {
            b.push(d)
        });
        J(a.j, function (a) {
            "" != a && b.push(a)
        });
        return b
    };
    var Zd = function (a) {
        for (var b = window, c = 0, d = b, e = 0; b && b != b.parent;)if (b = b.parent, e++, gd(b))d = b, c = e; else if (a)break;
        return {ta: d, level: c}
    }, $d = null;
    var ae = function () {
        return I("iPhone") && !I("iPod") && !I("iPad")
    };
    var be = I("Opera"), K = Xc(), ce = I("Edge"), de = ce || K, ee = I("Gecko") && !(-1 != Uc.toLowerCase().indexOf("webkit") && !I("Edge")) && !(I("Trident") || I("MSIE")) && !I("Edge"), fe = -1 != Uc.toLowerCase().indexOf("webkit") && !I("Edge"), ge = function () {
        var a = q.document;
        return a ? a.documentMode : void 0
    }, he;
    a:{
        var ie = "", je = function () {
            var a = Uc;
            if (ee)return /rv\:([^\);]+)(\)|;)/.exec(a);
            if (ce)return /Edge\/([\d\.]+)/.exec(a);
            if (K)return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (fe)return /WebKit\/(\S+)/.exec(a);
            if (be)return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        je && (ie = je ? je[1] : "");
        if (K) {
            var ke = ge();
            if (null != ke && ke > parseFloat(ie)) {
                he = String(ke);
                break a
            }
        }
        he = ie
    }
    var le = he, me = {}, ne = function (a) {
            var b;
            if (!(b = me[a])) {
                b = 0;
                for (var c = ac(String(le)).split("."), d = ac(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || "", h = d[f] || "", l = RegExp("(\\d*)(\\D*)", "g"), n = RegExp("(\\d*)(\\D*)", "g");
                    do {
                        var m = l.exec(g) || ["", "", ""], p = n.exec(h) || ["", "", ""];
                        if (0 == m[0].length && 0 == p[0].length)break;
                        b = rc(0 == m[1].length ? 0 : parseInt(m[1], 10), 0 == p[1].length ? 0 : parseInt(p[1], 10)) || rc(0 == m[2].length, 0 == p[2].length) || rc(m[2], p[2])
                    } while (0 == b)
                }
                b = me[a] = 0 <= b
            }
            return b
        },
        oe = q.document, pe = oe && K ? ge() || ("CSS1Compat" == oe.compatMode ? parseInt(le, 10) : 5) : void 0;
    var qe = function (a, b) {
        this.x = r(a) ? a : 0;
        this.y = r(b) ? b : 0
    };
    qe.prototype.clone = function () {
        return new qe(this.x, this.y)
    };
    qe.prototype.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    qe.prototype.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    qe.prototype.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    var re = function (a, b) {
        this.width = a;
        this.height = b
    };
    k = re.prototype;
    k.clone = function () {
        return new re(this.width, this.height)
    };
    k.Ha = function () {
        return this.width * this.height
    };
    k.isEmpty = function () {
        return !this.Ha()
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
    var se = !K || 9 <= Number(pe), te = !ee && !K || K && 9 <= Number(pe) || ee && ne("1.9.1");
    K && ne("9");
    var ue = K || be || fe;
    var xe = function (a) {
        return a ? new ve(we(a)) : Zb || (Zb = new ve)
    }, ye = function (a) {
        var b = document;
        return v(a) ? b.getElementById(a) : a
    }, Ae = function (a, b) {
        Kc(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : ze.hasOwnProperty(d) ? a.setAttribute(ze[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }, ze = {
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
    }, Be = function (a) {
        a = a.document;
        a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
        return new re(a.clientWidth, a.clientHeight)
    }, Ce = function (a) {
        return a.scrollingElement ? a.scrollingElement : fe || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement
    }, De = function (a) {
        return a.parentWindow || a.defaultView
    }, Fe = function (a, b, c) {
        function d(c) {
            c && b.appendChild(v(c) ? a.createTextNode(c) : c)
        }

        for (var e =
            2; e < c.length; e++) {
            var f = c[e];
            !ca(f) || x(f) && 0 < f.nodeType ? d(f) : H(Ee(f) ? Cc(f) : f, d)
        }
    }, Ge = function (a) {
        return te && void 0 != a.children ? a.children : tc(a.childNodes, function (a) {
            return 1 == a.nodeType
        })
    }, we = function (a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }, Ee = function (a) {
        if (a && "number" == typeof a.length) {
            if (x(a))return "function" == typeof a.item || "string" == typeof a.item;
            if (ea(a))return "function" == typeof a.item
        }
        return !1
    }, ve = function (a) {
        this.j = a || q.document || document
    };
    ve.prototype.l = function (a, b, c) {
        var d = this.j, e = arguments, f = String(e[0]), g = e[1];
        if (!se && g && (g.name || g.type)) {
            f = ["<", f];
            g.name && f.push(' name="', ic(g.name), '"');
            if (g.type) {
                f.push(' type="', ic(g.type), '"');
                var h = {};
                Tc(h, g);
                delete h.type;
                g = h
            }
            f.push(">");
            f = f.join("")
        }
        f = d.createElement(f);
        g && (v(g) ? f.className = g : t(g) ? f.className = g.join(" ") : Ae(f, g));
        2 < e.length && Fe(d, f, e);
        return f
    };
    ve.prototype.contains = function (a, b) {
        if (!a || !b)return !1;
        if (a.contains && 1 == b.nodeType)return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;)b = b.parentNode;
        return b == a
    };
    var He = function (a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    k = He.prototype;
    k.clone = function () {
        return new He(this.top, this.right, this.bottom, this.left)
    };
    k.contains = function (a) {
        return this && a ? a instanceof He ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
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
    var Ie = function (a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    };
    Ie.prototype.clone = function () {
        return new Ie(this.left, this.top, this.width, this.height)
    };
    var Je = function (a) {
        return new He(a.top, a.left + a.width, a.top + a.height, a.left)
    };
    Ie.prototype.contains = function (a) {
        return a instanceof qe ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    };
    Ie.prototype.ceil = function () {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    Ie.prototype.floor = function () {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    Ie.prototype.round = function () {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var Ke = function (a, b) {
        var c;
        a:{
            c = we(a);
            if (c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, null))) {
                c = c[b] || c.getPropertyValue(b) || "";
                break a
            }
            c = ""
        }
        return c || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }, Le = function (a) {
        var b;
        try {
            b = a.getBoundingClientRect()
        } catch (c) {
            return {left: 0, top: 0, right: 0, bottom: 0}
        }
        K && a.ownerDocument.body && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
        return b
    }, Me = function (a) {
        if (K && !(8 <= Number(pe)))return a.offsetParent;
        var b = we(a), c = Ke(a, "position"), d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)if (11 == a.nodeType && a.host && (a = a.host), c = Ke(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))return a;
        return null
    }, Ne = function (a) {
        var b = we(a), c = new qe(0, 0), d;
        d = b ? we(b) : document;
        d = !K || 9 <= Number(pe) || "CSS1Compat" ==
        xe(d).j.compatMode ? d.documentElement : d.body;
        if (a == d)return c;
        a = Le(a);
        d = xe(b).j;
        b = Ce(d);
        d = De(d);
        b = K && ne("10") && d.pageYOffset != b.scrollTop ? new qe(b.scrollLeft, b.scrollTop) : new qe(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }, Oe = function (a) {
        "number" == typeof a && (a = Math.round(a) + "px");
        return a
    }, Pe = function (a) {
        var b = a.offsetWidth, c = a.offsetHeight, d = fe && !b && !c;
        return r(b) && !d || !a.getBoundingClientRect ? new re(b, c) : (a = Le(a), new re(a.right - a.left, a.bottom - a.top))
    };
    var Qe = document, L = window;
    var Re = Object.prototype.hasOwnProperty, Se = function (a, b) {
        for (var c in a)Re.call(a, c) && b.call(void 0, a[c], c, a)
    }, Ue = function () {
        var a = Te();
        "google_onload_fired" in a || (a.google_onload_fired = !1, zd(a, "load", function () {
            DFPConsoleLog();
            a.google_onload_fired = !0
        }))
    }, Ve = function (a, b) {
        var c = b - 8;
        if (a.length > b) {
            var d = a.lastIndexOf("&", c);
            -1 !== d ? a = a.substring(0, d) : (a = a.substring(0, c), a = a.replace(/%\w?$/, ""));
            a += "&trunc=1"
        }
        return a
    }, We = !!window.google_async_iframe_id, Xe = We && window.parent || window, Te = function () {
        if (We && !gd(Xe)) {
            var a =
                "." + Qe.domain;
            try {
                for (; 2 < a.split(".").length && !gd(Xe);)Qe.domain = a = a.substr(a.indexOf(".") + 1), Xe = window.parent
            } catch (b) {
            }
            gd(Xe) || (Xe = window)
        }
        return Xe
    }, Ye = function () {
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
            if (Xc()) {
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
    var Ze, Od;
    Ze = new function () {
        this.l = "http:" === L.location.protocol ? "http:" : "https:";
        this.m = "pagead2.googlesyndication.com";
        this.o = "/pagead/gen_204?id=";
        this.j = .01
    };
    Od = new Kd(Ze, "jserror", !0);
    var $e = /Trident|MSIE/, af = /rv:11|Trident\/[78]/, cf = function () {
        var a = bf;
        return q.google_osd_loaded ? !1 : (hd(q.document, a), q.google_osd_loaded = !0)
    }, ef = function (a, b) {
        df() ? zd(a, "readystatechange", function (c) {
            a && "complete" == a.readyState && b(c)
        }) : zd(a, "load", b)
    }, ff = function () {
        var a = (Te() || q).google_osd_amcb;
        return ea(a) ? a : null
    }, df = function () {
        var a = q.navigator;
        return (a = a && a.userAgent) ? $e.test(a) && !af.test(a) : !1
    };
    var jf = function () {
        var a = gf, b = hf;
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
    }, kf = function () {
        var a = 0;
        !r(q.postMessage) && (a |= 1);
        return a
    };
    var lf = function (a, b) {
        this.o = a;
        this.l = b && b.l ? b.l : [];
        this.m = b && b.m ? b.m : 0;
        this.u = b ? b.u : "";
        this.j = b && b.j ? b.j : [];
        if (b) {
            var c;
            for (c = 0; c < this.l.length; ++c)this.l[c].push("true");
            for (c = 0; c < this.j.length; ++c)this.j[c].Ba = !0
        }
    }, bf = "", hf = 0, gf = 0, mf = function (a, b) {
        var c = a.l, d = a.o.google_ad_request_done;
        d && (d = d.orig_callback || d, a.o.google_ad_request_done = function (a) {
            if (a && 0 < a.length) {
                var f = 1 < a.length ? a[1].url : null, g = a[0].log_info || null, h = a[0].activeview_url || null, l = a[0].activeview_js_enabled || null, n = a[0].activeview_js_immediate_enabled ||
                    null, m = a[0].activeview_js_tos_enabled || null, p = a[0].activeview_cid || null, u = a[0].activeview_metadata || null, C = a[0].image_url || "", ma = a[0].type || null;
                c.push([b, lc(a[0].url), f, g, null, h, l, n, m, p, u, lc(C), ma])
            }
            d(a)
        }, a.o.google_ad_request_done.orig_callback = d)
    }, of = function (a, b, c, d) {
        var e = a.l, f = d || 0, g = b.document;
        if (0 < e.length)for (var h = g.getElementsByTagName("a"), l = 0; l < h.length; l++)for (var n = 0; n < e.length; n++)if (0 <= h[l].href.indexOf(e[n][1])) {
            var m = h[l].parentNode;
            if (e[n][2])for (var p = m, u = 0; 4 > u; u++) {
                if (0 <= p.innerHTML.indexOf(e[n][2])) {
                    m =
                        p;
                    break
                }
                p = p.parentNode
            }
            nf(e[n], m, f, c);
            e.splice(n, 1);
            break
        }
        if (0 < e.length)for (m = g.getElementsByTagName("embed"), l = 0; l < m.length; l++)for (n = 0; n < e.length; n++)if (p = e[n][12], h = e[n][11], "flash" == p && h && (p = m[l], p.src == h)) {
            var C = p;
            0 == C.getBoundingClientRect().height && C.parentElement && "OBJECT" == C.parentElement.tagName && (C = C.parentElement);
            nf(e[n], C, f, c);
            e.splice(n, 1);
            break
        }
        if (0 < e.length)for (g = g.getElementsByTagName("param"), l = 0; l < g.length; l++)for (n = 0; n < e.length; n++)if (p = e[n][12], h = e[n][11], "flash" == p && h && (m = g[l],
            "movie" == m.name && m.value == h)) {
            m.parentNode && "OBJECT" == m.parentNode.tagName && (C = m.parentNode);
            if (!C)break;
            nf(e[n], C, f, c);
            e.splice(n, 1);
            break
        }
        if (l = 0 < e.length)$d || ($d = Zd(!0).ta), l = b != $d;
        if (l)try {
            of(a, b.parent, c, d)
        } catch (ma) {
        }
        for (l = 0; l < e.length; ++l)a = e[l], "true" == a[6] && pf("osd2", a[3]), "true" == a[7] && pf("osdim", a[3])
    }, nf = function (a, b, c, d) {
        d(b, a[0], c, !0, a[3], void 0, a[5], "true" == a[6], "true" == a[7], "true" == a[13], "true" == a[8], a[9], a[10])
    }, pf = function (a, b) {
        if (a && b) {
            var c = ["//"];
            c.push("pagead2.googlesyndication.com");
            c.push("/activeview");
            c.push("?id=" + a);
            c.push("&r=j");
            c.push("&avi=" + b);
            Id(q, c.join(""))
        }
    };
    k = lf.prototype;
    k.getNewBlocks = function (a, b) {
        b && of(this, this.o, a, 1);
        for (var c = this.j.length, d = 0; d < c; d++) {
            var e = this.j[d];
            !e.m && e.j && (a(e.j, e.o, e.v, e.l, "", void 0, "", !1, !1, e.Ba, !1, "", "", e.u), e.m = !0)
        }
        b && ((Te() || q).google_osd_amcb = a)
    };
    k.setupOse = function (a) {
        if (this.getOseId())return this.getOseId();
        var b = jf();
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
        if ((e = ff()) && d)e(d, a, b, !0, "", void 0, "", !1, !1, !1, !1, "", "", g); else {
            if ("js" == c)mf(this, a); else {
                var h = new qf(a, b, d, g);
                this.j.push(h);
                d && ef(d, Pd(function () {
                    h.l = !0
                }))
            }
            cf() && Ue()
        }
    };
    k.unloadAdBlock = function (a, b) {
        r(window.Goog_Osd_UnloadAdBlock) && window.Goog_Osd_UnloadAdBlock(a, b)
    };
    var rf = function () {
        var a = Te(), b = a.__google_ad_urls;
        if (!b)return a.__google_ad_urls = new lf(a);
        try {
            if (0 <= b.getOseId())return b
        } catch (c) {
        }
        return a.__google_ad_urls = new lf(a, b)
    }, qf = function (a, b, c, d) {
        this.o = a;
        this.v = b;
        this.j = c;
        this.Ba = this.m = this.l = !1;
        this.u = d || aa
    };
    ja("Goog_AdSense_getAdAdapterInstance", rf);
    ja("Goog_AdSense_OsdAdapter", lf);
    ja("Goog_AdSense_OsdAdapter.prototype.numBlocks", lf.prototype.numBlocks);
    ja("Goog_AdSense_OsdAdapter.prototype.getNewBlocks", lf.prototype.getNewBlocks);
    ja("Goog_AdSense_OsdAdapter.prototype.getOseId", lf.prototype.getOseId);
    ja("Goog_AdSense_OsdAdapter.prototype.getCorrelator", lf.prototype.getCorrelator);
    ja("Goog_AdSense_OsdAdapter.prototype.setupOse", lf.prototype.setupOse);
    ja("Goog_AdSense_OsdAdapter.prototype.registerAdBlock", lf.prototype.registerAdBlock);
    ja("Goog_AdSense_OsdAdapter.prototype.unloadAdBlock", lf.prototype.unloadAdBlock);
    var M = q.googletag._vars_, sf = M["#7#"], tf = M["#20#"], bf = Gd(new Bd, M["#6#"] ? "https:" : "http:", M["#1#"], "/pagead/osd.js"), hf = sf, gf = tf;
    var uf = !1, vf = "", wf = function (a) {
        a = a.match(/[\d]+/g);
        if (!a)return "";
        a.length = 3;
        return a.join(".")
    };
    (function () {
        if (navigator.plugins && navigator.plugins.length) {
            var a = navigator.plugins["Shockwave Flash"];
            if (a && (uf = !0, a.description)) {
                vf = wf(a.description);
                return
            }
            if (navigator.plugins["Shockwave Flash 2.0"]) {
                uf = !0;
                vf = "2.0.0.11";
                return
            }
        }
        if (navigator.mimeTypes && navigator.mimeTypes.length && (a = navigator.mimeTypes["application/x-shockwave-flash"], uf = !(!a || !a.enabledPlugin))) {
            vf = wf(a.enabledPlugin.description);
            return
        }
        try {
            var b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
            uf = !0;
            vf = wf(b.GetVariable("$version"));
            return
        } catch (c) {
        }
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
            uf = !0;
            vf = "6.0.21";
            return
        } catch (c) {
        }
        try {
            b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"), uf = !0, vf = wf(b.GetVariable("$version"))
        } catch (c) {
        }
    })();
    var xf = uf, yf = vf;
    var zf = I("Firefox"), Af = ae() || I("iPod"), Bf = I("iPad"), Cf = I("Android") && !(Yc() || I("Firefox") || I("Opera") || I("Silk")), Df = Yc(), Ef = I("Safari") && !(Yc() || I("Coast") || I("Opera") || I("Edge") || I("Silk") || I("Android")) && !(ae() || I("iPad") || I("iPod"));
    var Ff = function (a) {
        return (a = a.exec(Uc)) ? a[1] : ""
    };
    (function () {
        if (zf)return Ff(/Firefox\/([0-9.]+)/);
        if (K || ce || be)return le;
        if (Df)return Ff(/Chrome\/([0-9.]+)/);
        if (Ef && !(ae() || I("iPad") || I("iPod")))return Ff(/Version\/([0-9.]+)/);
        if (Af || Bf) {
            var a = /Version\/(\S+).*Mobile\/(\S+)/.exec(Uc);
            if (a)return a[1] + "." + a[2]
        } else if (Cf)return (a = Ff(/Android\s+([0-9.]+)/)) ? a : Ff(/Version\/([0-9.]+)/);
        return ""
    })();
    var Gf = function (a) {
        var b = "//tpc.googlesyndication.com/safeframe/1-0-4/html/container.html", c;
        c = a;
        for (var d = 0; c != c.parent;)d++, c = c.parent;
        (c = d) && (b += "?n=" + c);
        return (ld(a) ? "https:" : "http:") + b
    };
    var Hf = function (a, b, c) {
        b = b || L;
        a && b.top != b && (b = b.top);
        try {
            return b.document && !b.document.body ? new re(-1, -1) : c ? (new re(b.innerWidth, b.innerHeight)).round() : Be(b || window).round()
        } catch (d) {
            return new re(-12245933, -12245933)
        }
    };
    var If = function (a) {
        a = a || q;
        var b = a.context;
        if (!b)try {
            b = a.parent.context
        } catch (c) {
        }
        try {
            if (b && "pageViewId" in b && "canonicalUrl" in b)return b
        } catch (c) {
        }
        return null
    }, Jf = function () {
        var a = If();
        return a && a.initialIntersection ? a.initialIntersection : null
    }, Kf = function () {
        var a = Jf();
        return a && x(a.rootBounds) ? new re(a.rootBounds.width, a.rootBounds.height) : null
    }, Lf = function () {
        var a = Jf();
        return a && x(a.rootBounds) ? new qe(a.rootBounds.left + a.boundingClientRect.left, a.rootBounds.top + a.boundingClientRect.top) : null
    };
    var Mf = function (a) {
        this.S = a
    }, Nf = {google_persistent_state: !0, google_persistent_state_async: !0}, Of = {}, Pf = function (a) {
        var b = If(window);
        if (b && x(b.master)) {
            b = b.master;
            a = "google_persistent_state_async";
            var c = {}
        } else {
            b = Te();
            a = a && Nf[a] ? a : We ? "google_persistent_state_async" : "google_persistent_state";
            if (Of[a])return Of[a];
            "google_persistent_state_async" == a ? c = {} : c = b
        }
        var d = b[a];
        return null != d && "object" == typeof d && null != d.S && "object" == typeof d.S ? Of[a] = d : b[a] = Of[a] = new Mf(c)
    }, Qf = {
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
    }, Rf = function () {
        if (14 in Qf)return Qf[14];
        throw Error("unexpected state");
    }, Sf = {
        14: "gaGlobal", 8: "google_prev_ad_formats_by_region",
        9: "google_prev_ad_slotnames_by_region"
    }, Tf = function () {
        return Sf[14] || "google_ps_14"
    }, Uf = function (a) {
        var b = {}, c = Tf(), d = a.S;
        a = d[c];
        if (void 0 === a)return a = Rf(), a !== c && void 0 === d[a] && (d[a] = b), d[c] = b;
        b = d[Rf()];
        c = d[Tf()];
        b !== c && (b = {
            context: "ps_ckncc",
            url: Te().location.href,
            key: 14,
            clr: 1,
            old: String(b),
            "new": String(c),
            mgr: !0
        }, Jd(Ze, "jserror", b, void 0, void 0));
        return a
    };
    Vd = !1;
    var Vf = function (a) {
        return !!a && a.top == a
    }, Wf = function (a, b, c, d) {
        c = c || a.google_ad_width;
        d = d || a.google_ad_height;
        if (Vf(a))return !1;
        var e = b.documentElement;
        if (c && d) {
            var f = 1, g = 1;
            a.innerHeight ? (f = a.innerWidth, g = a.innerHeight) : e && e.clientHeight ? (f = e.clientWidth, g = e.clientHeight) : b.body && (f = b.body.clientWidth, g = b.body.clientHeight);
            if (g > 2 * d || f > 2 * c)return !1
        }
        return !0
    }, Xf = function (a, b) {
        var c = {};
        c.jb = Zd(!1).ta;
        var d;
        var e = c.jb;
        d = e.location.href;
        if (e == e.top)d = {url: d, Da: !0}; else {
            var f = !1, g = e.document;
            g && g.referrer &&
            (d = g.referrer, e.parent == e.top && (f = !0));
            (e = e.location.ancestorOrigins) && (e = e[e.length - 1]) && -1 == d.indexOf(e) && (f = !1, d = e);
            d = {url: d, Da: f}
        }
        c.kb = d;
        c.Ta = Wf(Te(), b, a.google_ad_width, a.google_ad_height);
        d = c.Ta;
        f = c.kb.Da;
        e = Te();
        e = e.top == e ? 0 : gd(e.top) ? 1 : 2;
        g = 4;
        d || 1 != e ? d || 2 != e ? d && 1 == e ? g = 7 : d && 2 == e && (g = 8) : g = 6 : g = 5;
        f && (g |= 16);
        c.Sa = "" + g;
        return c
    };
    var Zf = function (a, b) {
        var c = a.getPassbackPageUrl();
        if ("" != c)return c;
        c = b[N(a)];
        return null != c ? Yf(c) : null
    }, $f = function (a) {
        var b = a;
        "about:blank" != a && (b = b.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/'/g, "%27"), /^https?:\/\//.test(b) || (b = "unknown:" + b));
        return b
    }, ag = /\+/g, bg = function (a) {
        var b = M["#6#"];
        return a || b ? "https://" + M["#3#"] : "http://" + M["#2#"]
    }, cg = function () {
        var a = navigator.userAgent, b = a.indexOf("MSIE ");
        return -1 == b ? 0 : parseFloat(a.substring(b + 5, a.indexOf(";", b)))
    }, dg = function () {
        var a =
            Uc;
        return null != a && -1 != a.indexOf("MSIE ") && -1 == a.indexOf("IEMobile")
    }, fg = function (a, b) {
        var c = 0, d = [];
        a && (d.push(a.getAdUnitPath()), d.push(eg(a)), d.push(a.getSlotElementId()));
        if (b) {
            var e;
            e = [];
            for (var f = 0, g = b; g && 25 > f; g = g.parentNode, ++f)e.push(9 !== g.nodeType && g.id || "");
            (e = e.join()) && d.push(e)
        }
        0 < d.length && (c = kd(d.join(":")));
        return c.toString()
    }, gg = function (a, b) {
        if (null == b)return a;
        var c = a.indexOf("google_preview=", a.lastIndexOf("?")), d = a.indexOf("&", c);
        -1 == d && (d = a.length - 1, --c);
        return a.substring(0,
                c) + a.substring(d + 1, a.length)
    }, hg = {VISIBLE: "visible", HIDDEN: "hidden", PRERENDER: "prerender", pb: "other"}, ig = function (a) {
        a = a || document;
        a = a.webkitVisibilityState || a.mozVisibilityState || a.visibilityState || "visible";
        return Oc(hg, a) ? a : "other"
    };
    var Xd = new function () {
        this.l = {};
        this.j = {};
        for (var a = [], b = 0, c = a.length; b < c; ++b)this.j[a[b]] = ""
    }, jg = [], lg = function (a, b, c) {
        c = c || [];
        a = new kg(a);
        if (Td.apply(a, c)()) {
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
                    } catch (n) {
                    }
                    g = ""
                }
                (g = (g = (g = g.match(new RegExp("\\b(" + c.join("|") + ")\\b"))) && g[0] || null) ? g : Vd ? null : jd(c, d)) && Wd(f, g, b)
            }
        }
        jg.push(a);
        return a
    }, kg = function (a) {
        var b = Xd;
        this.j = a;
        this.l = b;
        this.m = "exp" + (this[fa] || (this[fa] = ++ga));
        this.l.j[this.m] = ""
    }, mg = function (a, b) {
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
    }, ng = function (a) {
        for (var b = 0; b < jg.length; ++b) {
            var c = jg[b], d = c.j, e = {}, f = void 0;
            for (f in d)e[d[f]] = f;
            d = e[a];
            if (null != d) {
                Nc(c.j, d) && Wd(c.l, c.j[d], c.m);
                return
            }
        }
        Wd(Xd, a)
    }, og = M["#18#"], pg = yc(["prerender"], ig(void 0));
    lg({control: "108809009", experiment: "108809010"}, og, [Sd(pg)]);
    lg({branch_1: "108809028", branch_2: "108809029"}, M["#27#"]);
    var qg = lg({
        control: "108809097",
        experiment: "108809098"
    }, M["#54#"], [Sd(M["#46#"])]), rg = lg({control: "108809030", experiment: "108809031"}, M["#28#"], [function (a) {
        return function () {
            return !a.apply(this, arguments)
        }
    }(Sd(M["#46#"]))]);
    M["#46#"] || mg(rg, "experiment") || mg(rg, "control") || ng("108809080");
    var sg = lg({control: "328840005", experiment: "328840006"}, M["#52#"]);
    lg({
        control: "108809103",
        osd_registration: "108809104",
        dom_content_loaded: "108809105",
        iframe_onload: "108809106",
        creative_element_loaded: "108809107",
        creative_element_hybrid: "108809108",
        listener_registration: "108809109"
    }, M["#56#"]);
    var tg = lg({control: "108809111", experiment: "108809112"}, M["#59#"]);
    var ug = function (a) {
        return w(a) && isFinite(a) && 0 == a % 1 && 0 <= a
    }, wg = function () {
        return vg().replace(/[^a-zA-Z0-9]/g, function (a) {
            return "&#" + a.charCodeAt() + ";"
        })
    }, yg = function () {
        return xg("#6#") ? "https:" : "http:"
    }, zg = function (a) {
        var b = a.split("/");
        return "/" == a.charAt(0) && 2 <= b.length ? b[1] : "/" != a.charAt(0) && 1 <= b.length ? b[0] : ""
    }, Ag = function (a) {
        var b = [], b = F(a, function (a) {
            return zg(a.getAdUnitPath())
        });
        Ec(b);
        return b
    }, Bg = {}, xg = function (a) {
        return Bg[a] || ka()._vars_[a]
    };
    A("getVersion", function () {
        return "90"
    });
    var Dg = function (a) {
        this.l = a;
        this.j = Cg + "/pagead/gen_204?id=" + encodeURIComponent(a)
    }, Eg = [], Cg = xg("#6#") ? "https://" + xg("#33#") : "http://" + xg("#33#"), Fg = function (a, b, c) {
        b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + encodeURIComponent(c))
    }, Gg = function (a, b) {
        if (!r(b) || 0 > b || 1 < b)b = xg("#23#");
        Math.random() < b && a.l && a.j && Id(window, a.j)
    }, Hg = function (a) {
        Fg(a, "vrg", "90");
        var b = Ag(Eg);
        0 < b.length && (3 >= b.length || (b = Dc(b, 0, 3), b.push("__extra__")), Fg(a, "nw_id", b.join(",")));
        Fg(a, "nslots", Eg.length.toString());
        b = Yd();
        0 < b.length &&
        Fg(a, "eid", b.join());
        Fg(a, "pub_url", document.URL)
    };
    var Ig = xg("#38#"), Jg = function (a, b) {
        var c = {methodId: a};
        b.name && (c.name = b.name);
        b.message && (c.message = b.message.substring(0, 512));
        b.fileName && (c.fileName = b.fileName);
        b.lineNumber && (c.lineNumber = b.lineNumber);
        b.stack && (c.stack = Rd(b.stack, ""));
        return c
    }, O = function (a, b) {
        Kg(a, b, void 0);
        throw b;
    }, Kg = function (a, b, c) {
        if (!b.Va)try {
            b.Va = !0;
            var d = Ig;
            r(c) && 0 <= c && 1 >= c && (d = c);
            var e = Jg(a, b), f = new Dg("gpt_exception");
            try {
                Hg(f)
            } catch (g) {
            }
            J(e, function (a, b) {
                Fg(f, b, a)
            });
            Gg(f, d)
        } catch (g) {
        }
    };
    var Lg = function () {
        this.l = this.j = 0
    };
    Lg.prototype.push = function (a) {
        try {
            DFPConsoleInit();
            for (var b = ta(), c = 0; c < arguments.length; ++c)try {
                ea(arguments[c]) && (arguments[c](), this.j++)
            } catch (d) {
                this.l++, b.error(Sa(String(d.message)))
            }
            b.info(Ta(String(this.j), String(this.l)));
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
        window.GPT_jstiming.ua = {};
        window.GPT_jstiming.gb = 1;
        var Mg = function (a, b, c) {
            var d = a.t[b], e = a.t.start;
            if (d && (e || c))return d = a.t[b][0], void 0 != c ? e = c : e = e[0], Math.round(d - e)
        };
        window.GPT_jstiming.getTick = Mg;
        var Ng = function (a, b, c) {
            var d = "";
            window.GPT_jstiming.srt && (d += "&srt=" + window.GPT_jstiming.srt);
            window.GPT_jstiming.pt && (d += "&tbsrt=" + window.GPT_jstiming.pt);
            try {
                window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal && window.gtbExternal.tran ? d +=
                    "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
            } catch (p) {
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
                var n = g[l][1];
                n ? g[n] && f.push(l + "." + Mg(a, l, g[n][0])) : h && e.push(l +
                    "." + Mg(a, l))
            }
            if (b)for (var m in b)d += "&" + m + "=" + b[m];
            (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
            return [b, "?v=3", "&s=" + (window.GPT_jstiming.sn || "gpt") + "&action=", a.name, f.length ? "&it=" + f.join(",") : "", d, "&rt=", e.join(",")].join("")
        }, Og = function (a, b, c) {
            a = Ng(a, b, c);
            if (!a)return "";
            b = new Image;
            var d = window.GPT_jstiming.gb++;
            window.GPT_jstiming.ua[d] = b;
            b.onload = b.onerror = function () {
                window.GPT_jstiming && delete window.GPT_jstiming.ua[d]
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
                        "prerender" == document.webkitVisibilityState ? f = !1 : (Og(a, b, c), f = !0);
                        f && (d = !0, document.removeEventListener("webkitvisibilitychange", e, !1))
                    }
                };
                document.addEventListener("webkitvisibilitychange", e, !1);
                return ""
            }
            return Og(a, b, c)
        }
    }
    ;
    var Pg = function () {
        this.l = this.l;
        this.o = this.o
    };
    Pg.prototype.l = !1;
    Pg.prototype.v = function () {
        if (this.o)for (; this.o.length;)this.o.shift()()
    };
    var Qg = function (a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }, Tg = function (a) {
        var b = [];
        Rg(new Sg, a, b);
        return b.join("")
    }, Sg = function () {
    }, Rg = function (a, b, c) {
        if (null == b)c.push("null");
        else {
            if ("object" == typeof b) {
                if (t(b)) {
                    var d = b;
                    b = d.length;
                    c.push("[");
                    for (var e = "", f = 0; f < b; f++)c.push(e), Rg(a, d[f], c), e = ",";
                    c.push("]");
                    return
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean)b = b.valueOf(); else {
                    c.push("{");
                    e = "";
                    for (d in b)Object.prototype.hasOwnProperty.call(b, d) && (f = b[d], "function" != typeof f && (c.push(e), Ug(d, c), c.push(":"), Rg(a, f, c), e = ","));
                    c.push("}");
                    return
                }
            }
            switch (typeof b) {
                case "string":
                    Ug(b, c);
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
    }, Vg = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, Wg = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g, Ug = function (a, b) {
        b.push('"', a.replace(Wg, function (a) {
            var b = Vg[a];
            b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Vg[a] = b);
            return b
        }), '"')
    };
    var Xg = function (a, b, c, d, e) {
        Pg.call(this);
        this.D = a;
        this.m = 1;
        this.u = b;
        this.A = c;
        this.I = d;
        this.ha = !!e;
        this.w = Math.random();
        this.B = {};
        this.j = null;
        this.C = y(this.H, this)
    };
    z(Xg, Pg);
    Xg.prototype.H = function (a) {
        if (a.origin === this.A && (this.ha || a.source == this.u)) {
            var b = null;
            try {
                b = Qg(a.data)
            } catch (c) {
            }
            if (x(b) && (a = b.i, b.c === this.D && a != this.w && (2 !== this.m && (this.m = 2, Yg(this), this.j && (this.j(), this.j = null)), a = b.s, b = b.p, v(a) && (v(b) || x(b)) && this.B.hasOwnProperty(a))))this.B[a](b)
        }
    };
    var Yg = function (a) {
        var b = {};
        b.c = a.D;
        b.i = a.w;
        a.u.postMessage(Tg(b), a.A)
    };
    Xg.prototype.G = function () {
        if (1 === this.m) {
            try {
                this.u.postMessage && Yg(this)
            } catch (a) {
            }
            window.setTimeout(y(this.G, this), 50)
        }
    };
    Xg.prototype.connect = function (a) {
        a && (this.j = a);
        zd(window, "message", this.C);
        this.I && this.G()
    };
    var Zg = function (a, b, c) {
        a.B[b] = c
    }, $g = function (a, b, c) {
        var d = {};
        d.c = a.D;
        d.i = a.w;
        d.s = b;
        d.p = c;
        a.u.postMessage(Tg(d), a.A)
    };
    Xg.prototype.v = function () {
        this.m = 3;
        Ad(window, "message", this.C);
        Xg.sa.v.call(this)
    };
    ee || fe || K && ne(11);
    var ah = function () {
        this.j = []
    }, ch = function (a, b, c, d, e) {
        a.j.push(new bh(b, c, d, e))
    }, dh = function (a, b, c, d) {
        ch(a, b, c, d + "px", void 0)
    }, bh = function (a, b, c, d) {
        this.m = a;
        this.j = (this.l = r(d) && a.style && a.style.getPropertyPriority) ? String(b).replace(/([A-Z])/g, "-$1").toLowerCase() : b;
        this.o = this.l ? a.style.getPropertyValue(this.j) : a.style[this.j];
        this.u = this.l ? a.style.getPropertyPriority(this.j) : null;
        this.l ? (a.style.removeProperty(this.j), a.style.setProperty(this.j, c, d)) : a.style[this.j] = c
    };
    var eh = function (a) {
        this.o = a;
        this.v = null;
        this.G = this.m = 0;
        this.l = null;
        this.D = "sfchannel" + a
    };
    var fh = function (a, b, c, d, e, f) {
        this.m = a.clone();
        this.l = b.clone();
        this.o = c;
        this.j = d.clone();
        this.u = e;
        this.v = f
    }, gh = function (a) {
        var b = window.screenX || window.screenLeft || 0, c = window.screenY || window.screenTop || 0, b = new He(c, (window.outerWidth || document.documentElement.clientWidth || 0) - b, (window.outerHeight || document.documentElement.clientHeight || 0) - c, b), c = Ne(a), d;
        if ("none" != Ke(a, "display"))d = Pe(a); else {
            d = a.style;
            var e = d.display, f = d.visibility, g = d.position;
            d.visibility = "hidden";
            d.position = "absolute";
            d.display =
                "inline";
            var h = Pe(a);
            d.display = e;
            d.position = g;
            d.visibility = f;
            d = h
        }
        c = new Ie(c.x, c.y, d.width, d.height);
        d = Je(c);
        for (var e = String(Ke(a, "zIndex")), f = new He(0, Infinity, Infinity, 0), g = xe(a), l = g.j.body, n = g.j.documentElement, h = Ce(g.j); a = Me(a);)if (!(K && 0 == a.clientWidth || fe && 0 == a.clientHeight && a == l) && a != l && a != n && "visible" != Ke(a, "overflow")) {
            var m = Ne(a), p = new qe(a.clientLeft, a.clientTop);
            m.x += p.x;
            m.y += p.y;
            f.top = Math.max(f.top, m.y);
            f.right = Math.min(f.right, m.x + a.clientWidth);
            f.bottom = Math.min(f.bottom, m.y + a.clientHeight);
            f.left = Math.max(f.left, m.x)
        }
        a = h.scrollLeft;
        h = h.scrollTop;
        f.left = Math.max(f.left, a);
        f.top = Math.max(f.top, h);
        g = Be(De(g.j) || window);
        f.right = Math.min(f.right, a + g.width);
        f.bottom = Math.min(f.bottom, h + g.height);
        a = 0 <= f.top && 0 <= f.left && f.bottom > f.top && f.right > f.left ? f : null;
        var u;
        if (null != a)a:{
            h = new Ie(a.left, a.top, a.right - a.left, a.bottom - a.top);
            u = Math.max(h.left, c.left);
            f = Math.min(h.left + h.width, c.left + c.width);
            if (u <= f && (g = Math.max(h.top, c.top), h = Math.min(h.top + h.height, c.top + c.height), g <= h)) {
                u = new Ie(u, g,
                    f - u, h - g);
                break a
            }
            u = null
        }
        a = (f = (f = null != u && (0 != u.width || u.left + u.width != a.left && u.left != a.right)) && (0 != u.height || u.top + u.height != a.top && u.top != a.bottom)) ? new He(Math.max(d.top - a.top, 0), Math.max(a.right - d.right, 0), Math.max(a.bottom - d.bottom, 0), Math.max(d.left - a.left, 0)) : new He(0, 0, 0, 0);
        g = f = 0;
        u && !(new re(u.width, u.height)).isEmpty() && (f = u.width / c.width, g = u.height / c.height);
        return new fh(b, d, e, a, f, g)
    }, hh = function (a) {
        return Tg({
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
    var ih = function () {
        this.j = {shared: {sf_ver: "1-0-4", ck_on: navigator.cookieEnabled ? 1 : 0, flash_ver: xf ? yf : "0"}}
    };
    var jh = function (a, b) {
        this.ia = a;
        this.ja = b
    };
    var kh = function (a, b, c, d, e, f) {
        var g = new ih;
        this.o = a;
        this.j = b;
        this.l = c;
        this.permissions = d;
        this.m = g;
        this.u = e;
        this.ha = f
    };
    var lh = function (a) {
        this.j = a
    }, mh = function (a, b) {
        this.j = a;
        this.version = b
    };
    z(mh, lh);
    mh.prototype.m = function () {
        return Tg({uid: this.j, version: this.version})
    };
    var nh = function (a, b, c) {
        this.j = a;
        this.o = b;
        this.l = c
    };
    z(nh, lh);
    nh.prototype.m = function () {
        return Tg({uid: this.j, initialWidth: this.o, initialHeight: this.l})
    };
    var oh = function (a, b) {
        this.j = a;
        this.l = b
    };
    z(oh, lh);
    oh.prototype.m = function () {
        return Tg({uid: this.j, description: this.l})
    };
    var ph = function (a, b, c) {
        this.j = a;
        this.l = b;
        this.push = c
    };
    z(ph, lh);
    ph.prototype.m = function () {
        return Tg({
            uid: this.j,
            expand_t: this.l.top,
            expand_r: this.l.right,
            expand_b: this.l.bottom,
            expand_l: this.l.left,
            push: this.push
        })
    };
    var qh = function (a) {
        this.j = a
    };
    z(qh, lh);
    qh.prototype.m = function () {
        return Tg({uid: this.j})
    };
    var rh = function (a, b) {
        this.j = a;
        this.o = b
    };
    z(rh, lh);
    rh.prototype.m = function () {
        var a = {uid: this.j, newGeometry: hh(this.o)};
        return Tg(a)
    };
    var sh = function (a, b, c, d, e) {
        rh.call(this, a, c);
        this.u = b;
        this.l = d;
        this.push = e
    };
    z(sh, rh);
    sh.prototype.m = function () {
        var a = {
            uid: this.j,
            success: this.u,
            newGeometry: hh(this.o),
            expand_t: this.l.top,
            expand_r: this.l.right,
            expand_b: this.l.bottom,
            expand_l: this.l.left,
            push: this.push
        };
        return Tg(a)
    };
    var th = function (a, b, c) {
        this.j = a;
        this.width = b;
        this.height = c
    };
    z(th, lh);
    th.prototype.m = function () {
        return Tg({uid: this.j, width: this.width, height: this.height})
    };
    var uh = 1, vh = !1, yh = function (a) {
        eh.call(this, uh++);
        this.U = !!a.Wa;
        this.B = a.$a;
        this.C = 1 == a.size;
        this.J = new jh(a.permissions.ia && !this.C, a.permissions.ja && !this.C);
        this.w = a.qa;
        this.R = window.location.protocol + "//" + window.location.host;
        this.T = !!a.ha;
        this.O = window.location.protocol + "//tpc.googlesyndication.com";
        this.K = !!a.Ka;
        this.V = a.sandbox || !1;
        this.u = new ah;
        wh(this, a.qa, a.size);
        this.v = this.M = gh(a.qa);
        this.j = xh(this, a.Qa, a.content, a.size, a.Ra);
        this.H = y(this.P, this);
        this.I = -1;
        this.A = 0;
        this.l = new Xg(this.D,
            this.j.contentWindow, this.O, !1);
        Zg(this.l, "init_done", y(this.Ua, this));
        Zg(this.l, "register_done", y(this.fb, this));
        Zg(this.l, "report_error", y(this.hb, this));
        Zg(this.l, "expand_request", y(this.La, this));
        Zg(this.l, "collapse_request", y(this.Ja, this));
        Zg(this.l, "creative_geometry_update", y(this.N, this));
        this.l.connect(y(this.cb, this));
        if (a.Ea) {
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
                c || (a.Ea(), Ad(this.j, "load", b))
            }, this);
            zd(this.j,
                "load", b)
        }
    };
    z(yh, eh);
    var wh = function (a, b, c) {
        a.C ? (b.style.width = Oe("100%"), b.style.height = Oe("auto")) : (b.style.width = Oe(c.width), b.style.height = Oe(c.height))
    }, xh = function (a, b, c, d, e) {
        var f = xe(a.w);
        c = "1-0-4;" + c.length + ";" + c;
        var g;
        g = new kh(a.o, a.R, a.M, a.J, a.C, a.T);
        var h = g.o, l = g.j, n = hh(g.l), m;
        m = g.permissions;
        m = Tg({expandByOverlay: m.ia, expandByPush: m.ja, readCookie: !1, writeCookie: !1});
        g = {
            uid: h,
            hostPeerName: l,
            initialGeometry: n,
            permissions: m,
            metadata: Tg(g.m.j),
            reportCreativeGeometry: g.u,
            isDifferentSourceWindow: g.ha
        };
        g = Tg(g);
        c +=
            g;
        a.K && d instanceof re && (g = xe(a.w), vh || (hd(g.j, a.U ? "//pagead2.googlesyndication.com/pagead/creative_toolset.js?source=safeframe" : "//pagead2.googlesyndication.com/pagead/expansion_embed.js?source=safeframe"), vh = !0), g = De(g.j), g.google_eas_queue = g.google_eas_queue || [], g.google_eas_queue.push({
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
        a.C ? (h = g = 0, d = "min-width:100%") : (g = d.width, h = d.height, d = "");
        n = De(f.j);
        l = Gf(n);
        a.K && (n = md(n.location.href), l += "#" + [0 < n.length ? "google_debug" + (n ? "=" + n : "") + "&" : "", "xpc=", "sf-gdn-exp-" + a.o, "&p=", encodeURIComponent(q.document.location.protocol), "//", encodeURIComponent(q.document.location.host)].join(""));
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
        e = K && !ne(9) ? "javascript:\"<html><body style='background:transparent'></body></html>\"" : "about:blank";
        e = {
            frameborder: 0, style: "border:0;vertical-align:bottom;" +
            (d || ""), allowTransparency: "true", src: e
        };
        b && Tc(e, b);
        f = f.l("iframe", e);
        a.V && (f.sandbox = "allow-same-origin allow-forms allow-popups allow-scripts allow-pointer-lock allow-popups-to-escape-sandbox");
        a.w.appendChild(f);
        return f
    };
    k = yh.prototype;
    k.cb = function () {
        zd(window, "resize", this.H);
        zd(window, "scroll", this.H)
    };
    k.Ua = function (a) {
        try {
            if (0 != this.m)throw Error("Container already initialized");
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Qg(a);
            if (!(x(c) && w(c.uid) && v(c.version)))throw Error("Cannot parse JSON message");
            b = new mh(c.uid, c.version);
            if (this.o != b.j || "1-0-4" != b.version)throw Error("Wrong source container");
            this.m = 1
        } catch (d) {
            this.B.error("Invalid INITIALIZE_DONE message. Reason: " + d.message)
        }
    };
    k.fb = function (a) {
        try {
            if (1 != this.m)throw Error("Container not initialized");
            if (!v(a))throw Error("Could not parse serialized message");
            var b = Qg(a);
            if (!(x(b) && w(b.uid) && w(b.initialWidth) && w(b.initialHeight)))throw Error("Cannot parse JSON message");
            if (this.o != (new nh(b.uid, b.initialWidth, b.initialHeight)).j)throw Error("Wrong source container");
            this.m = 2
        } catch (c) {
            this.B.error("Invalid REGISTER_DONE message. Reason: " + c.message)
        }
    };
    k.hb = function (a) {
        try {
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Qg(a);
            if (!(x(c) && w(c.uid) && v(c.description)))throw Error("Cannot parse JSON message");
            b = new oh(c.uid, c.description);
            if (this.o != b.j)throw Error("Wrong source container");
            this.B.info("Ext reported an error. Description: " + b.l)
        } catch (d) {
            this.B.error("Invalid REPORT_ERROR message. Reason: " + d.message)
        }
    };
    k.La = function (a) {
        try {
            if (2 != this.m)throw Error("Container is not registered");
            if (0 != this.G)throw Error("Container is not collapsed");
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Qg(a);
            if (!(x(c) && w(c.uid) && w(c.expand_t) && w(c.expand_r) && w(c.expand_b) && w(c.expand_l) && da(c.push)))throw Error("Cannot parse JSON message");
            b = new ph(c.uid, new He(c.expand_t, c.expand_r, c.expand_b, c.expand_l), c.push);
            if (this.o != b.j)throw Error("Wrong source container");
            if (!(0 <= b.l.top && 0 <= b.l.left && 0 <= b.l.bottom &&
                0 <= b.l.right))throw Error("Invalid expansion amounts");
            var d;
            if (d = b.push && this.J.ja || !b.push && this.J.ia) {
                var e = b.l, f = b.push, g = this.v = gh(this.j);
                if (e.top <= g.j.top && e.right <= g.j.right && e.bottom <= g.j.bottom && e.left <= g.j.left) {
                    if (!f)for (var h = this.j.parentNode; h && h.style; h = h.parentNode)ch(this.u, h, "overflowX", "visible", "important"), ch(this.u, h, "overflowY", "visible", "important");
                    var l = this.v.l, n = this.v.l, m = Je(new Ie(0, 0, l.right - l.left, n.bottom - n.top));
                    x(e) ? (m.top -= e.top, m.right += e.right, m.bottom += e.bottom,
                        m.left -= e.left) : (m.top -= e, m.right += Number(void 0), m.bottom += Number(void 0), m.left -= Number(void 0));
                    ch(this.u, this.w, "position", "relative");
                    ch(this.u, this.j, "position", "absolute");
                    f ? (dh(this.u, this.w, "width", m.right - m.left), dh(this.u, this.w, "height", m.bottom - m.top)) : ch(this.u, this.j, "zIndex", "10000");
                    dh(this.u, this.j, "width", m.right - m.left);
                    dh(this.u, this.j, "height", m.bottom - m.top);
                    dh(this.u, this.j, "left", m.left);
                    dh(this.u, this.j, "top", m.top);
                    this.G = 2;
                    this.v = gh(this.j);
                    d = !0
                } else d = !1
            }
            a = d;
            $g(this.l,
                "expand_response", (new sh(this.o, a, this.v, b.l, b.push)).m());
            if (!a)throw Error("Viewport or document body not large enough to expand into.");
        } catch (p) {
            this.B.error("Invalid EXPAND_REQUEST message. Reason: " + p.message)
        }
    };
    k.Ja = function (a) {
        try {
            if (2 != this.m)throw Error("Container is not registered");
            if (2 != this.G)throw Error("Container is not expanded");
            if (!v(a))throw Error("Could not parse serialized message");
            var b = Qg(a);
            if (!x(b) || !w(b.uid))throw Error("Cannot parse JSON message");
            if (this.o != (new qh(b.uid)).j)throw Error("Wrong source container");
            zh(this);
            $g(this.l, "collapse_response", (new rh(this.o, this.v)).m())
        } catch (c) {
            this.B.error("Invalid COLLAPSE_REQUEST message. Reason: " + c.message)
        }
    };
    var zh = function (a) {
        for (var b = a.u, c = b.j.length - 1; 0 <= c; c--) {
            var d = b.j[c];
            d.l ? (d.m.style.removeProperty(d.j), d.m.style.setProperty(d.j, d.o, d.u)) : d.m.style[d.j] = d.o
        }
        b.j.length = 0;
        a.G = 0;
        a.j && (a.v = gh(a.j))
    };
    yh.prototype.P = function () {
        if (1 == this.m || 2 == this.m)switch (this.A) {
            case 0:
                Ah(this);
                this.I = window.setTimeout(y(this.L, this), 1E3);
                this.A = 1;
                break;
            case 1:
                this.A = 2;
                break;
            case 2:
                this.A = 2
        }
    };
    yh.prototype.N = function (a) {
        try {
            if (!v(a))throw Error("Could not parse serialized message");
            var b, c = Qg(a);
            if (!(x(c) && w(c.uid) && w(c.width) && w(c.height)))throw Error("Cannot parse JSON message");
            b = new th(c.uid, c.width, c.height);
            if (this.o != b.j)throw Error("Wrong source container");
            this.C ? this.j.height = String(b.height) : this.B.error("Got CreativeGeometryUpdate message in non-fluidcontainer. The container is not resized.")
        } catch (d) {
            this.B.error("Invalid CREATIVE_GEOMETRY_UPDATE message. Reason: " + d.message)
        }
    };
    yh.prototype.L = function () {
        if (1 == this.m || 2 == this.m)switch (this.A) {
            case 1:
                this.A = 0;
                break;
            case 2:
                Ah(this), this.I = window.setTimeout(y(this.L, this), 1E3), this.A = 1
        }
    };
    var Ah = function (a) {
        a.v = gh(a.j);
        $g(a.l, "geometry_update", (new rh(a.o, a.v)).m())
    }, Bh = function (a) {
        if (100 != a.m) {
            2 == a.G && zh(a);
            window.clearTimeout(a.I);
            a.I = -1;
            a.A = 3;
            if (a.l) {
                var b = a.l;
                b.l || (b.l = !0, b.v());
                a.l = null
            }
            Ad(window, "resize", a.H);
            Ad(window, "scroll", a.H);
            if (b = a.j) {
                var b = a.w, c;
                a:{
                    c = a.j;
                    var d;
                    if (ue && !(K && ne("9") && !ne("10") && q.SVGElement && c instanceof q.SVGElement) && (d = c.parentElement)) {
                        c = d;
                        break a
                    }
                    d = c.parentNode;
                    c = x(d) && 1 == d.nodeType ? d : null
                }
                b = b == c
            }
            b && a.w.removeChild(a.j);
            a.j = null;
            a.w = null;
            a.m = 100
        }
    };
    var Ch = function (a, b, c, d, e) {
        this.advertiserId = a;
        this.campaignId = b;
        this.creativeId = c;
        this.labelIds = d;
        this.lineItemId = e
    };
    var Dh = function (a) {
        var b = ta(), c = {};
        if (!a || !x(a))return null;
        var d = !1;
        J(a, function (e, f) {
            switch (f) {
                case "allowOverlayExpansion":
                    da(e) ? c.allowOverlayExpansion = a.allowOverlayExpansion : (b.error(Xb("allowOverlayExpansion", a.allowOverlayExpansion), null, this), d = !0);
                    break;
                case "allowPushExpansion":
                    da(e) ? c.allowPushExpansion = a.allowPushExpansion : (b.error(Xb("allowPushExpansion", a.allowPushExpansion), null, this), d = !0);
                    break;
                case "sandbox":
                    !0 === e ? c.sandbox = a.sandbox : (b.error(Xb("sandbox", a.sandbox), null, this),
                        d = !0);
                    break;
                default:
                    b.j(Wb(f), null, this)
            }
        });
        return d ? null : c
    }, Eh = function (a) {
        for (var b = {}, c = 0; c < a.length; ++c)J(a[c], function (a, c) {
            b[c] = a
        });
        return b
    };
    var Fh = {
        Eb: "slotRenderEnded",
        ob: "impressionViewable",
        Fb: "slotVisibilityChanged"
    }, Gh = function (a, b, c, d, e, f, g, h, l) {
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
    }, Ih = function (a) {
        var b = Hh().getName();
        this.slot = a;
        this.serviceName = b
    }, Jh = function (a, b, c) {
        this.slot = a;
        this.serviceName = b;
        this.inViewPercentage = c
    };
    var Kh = function () {
        this.$ = [];
        this.ba = {};
        this.l = !1;
        this.B = {};
        this.log = ta();
        this.log.info(Va(this.getName()), this)
    };
    k = Kh.prototype;
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
        if (this.l)this.log.info(Ya(), this); else try {
            this.oa(), this.l = !0
        } catch (a) {
            Kg(1402, a), this.log.error(Za(String(a)), this)
        }
    };
    k.ra = function (a) {
        this.$.push(a);
        this.ba[N(a)] = a;
        this.log.info($a(this.getName(), a.getAdUnitPath()), this, a)
    };
    k.addEventListener = function (a, b) {
        try {
            if (!ea(b) || !v(a)) {
                var c = G("Service.addEventListener", [a, b]);
                this.log.j(c, this);
                return this
            }
            if (!Oc(Fh, a))return this.log.j(Qb(a), this), this;
            t(this.B[a]) || (this.B[a] = []);
            this.B[a].push(b);
            var d = new Dg("gpt_callback_usage");
            Fg(d, "type", a);
            Hg(d);
            Gg(d);
            return this
        } catch (e) {
            O(1401, e)
        }
    };
    var Lh = function (a, b, c) {
        b = a.B[b];
        t(b) && H(b, function (a) {
            try {
                a(c)
            } catch (b) {
                a = b && v(b.name) ? b.name : null;
                var e = b && v(b.message) ? b.message : null, f = "";
                a && e ? f = a + ": " + e : a ? f = a : e && (f = e);
                this.log.j(Pb(f), this)
            }
        }, a)
    };
    var Mh = {
        Bb: "rt_st_instant",
        yb: "rt_fs_instant",
        wb: "rt_dns_period",
        Cb: "rt_tcp_period",
        Ab: "rt_ssl_period",
        zb: "rt_rtt_period",
        Db: "rt_tft_period",
        xb: "rt_duration_period",
        mb: "loader_loaded_instant",
        nb: "loader_loaded_instant_nw",
        vb: "_start_pubads_load_period",
        tb: "pubads_load_period",
        ub: "impl_loaded_instant",
        qb: "page_load_time",
        rb: "page_load_time_nw",
        sb: "page_unload_time"
    }, Nh = {
        start_ad_fetch_period: !0,
        start_ad_render_period: !0
    }, Oh = {pubads_load_period: "_start_pubads_load_period"}, Ph = {
        ad_fetch_period: "start_ad_fetch_period",
        ad_render_period: "start_ad_render_period"
    }, Qh = function () {
        this.u = !1;
        q.GPT_jstiming && q.GPT_jstiming.load && ("http:" == q.location.protocol || "https:" == q.location.protocol) && Math.random() < xg("#37#") && (this.u = !0);
        this.W = (new Date).getTime() + "_" + Math.random();
        this.o = this.m = this.L = null;
        this.K = this.I = this.G = !1;
        this.B = window.GPT_jstiming.getTick(window.GPT_jstiming.load, "start", 0);
        this.l = window.GPT_jstiming.load;
        this.l.name = "global";
        if (!window.performance || !window.performance.timing) {
            var a = xg("#49#");
            this.B =
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
        this.A = {};
        this.N = this.R = this.O = this.P = this.M = this.T = 0
    }, Rh = null, P = function () {
        return Rh || Sh()
    }, Sh = function () {
        var a = window, b = new Qh;
        Rh = b;
        Th(b);
        Uh(b);
        ka().fifWin && "complete" == document.readyState ? a.performance && a.performance.timing && Vh(b, a.performance.timing.loadEventStart) : la(a, function () {
            Vh(b)
        });
        na(a, function () {
            Wh(b, "page_unload_time");
            Xh(b, !0)
        });
        Yh(b, "v90");
        return b
    }, Uh = function (a) {
        J(Mh,
            function (a) {
                this.j[a] = !1
            }, a)
    }, Zh = function (a, b, c, d) {
        a.l || (a.l = new q.GPT_jstiming.Timer(a.B), a.l.name = "global");
        var e = "_" == b[0];
        if (c || e || window.performance && window.performance.timing)a.l.tick(b, c, d), e || (a.I = !0);
        a.J || Xh(a)
    }, $h = function (a, b, c, d, e) {
        c ? a.o || (a.o = new q.GPT_jstiming.Timer(a.B), a.o.name = "ad_events_psbk") : a.m || (a.m = new q.GPT_jstiming.Timer(a.B), a.m.name = "ad_events");
        var f = "_" == b.charAt(0);
        c ? (a.o.tick(b, d, e), f || (a.K = !0)) : (a.m.tick(b, d, e), f || (a.G = !0))
    }, Wh = function (a, b, c) {
        try {
            a.u && (Zh(a, b, Oh[b],
                c), a.j[b] = !0)
        } catch (d) {
            O(2601, d)
        }
    }, ai = function (a, b, c) {
        try {
            if (a.u) {
                var d = "_" + b;
                d && (Zh(a, d, void 0, 0), Zh(a, b, d, c))
            }
        } catch (e) {
            O(2601, e)
        }
    }, bi = function (a, b, c, d) {
        if (a.u && !(1E3 < c)) {
            var e = Ph[b], f = e;
            e && (f += "." + c);
            c = b + ("." + c);
            f && a.D.hasOwnProperty("_" + f) && (f = "_" + f, $h(a, f, d || !1, void 0, a.D[f] + a.B), delete a.D[f]);
            $h(a, c, d || !1, f);
            d = d ? a.o : a.m;
            Nh.hasOwnProperty(b) && (b = window.GPT_jstiming.getTick(d, c), a.D["_" + c] = b)
        }
    }, ci = function (a) {
        a.j.loader_loaded_instant && !a.j.loader_loaded_instant_nw && Wh(a, "loader_loaded_instant_nw",
            a.U);
        a.j.page_load_time && !a.j.page_load_time_nw && Wh(a, "page_load_time_nw", a.V)
    }, Th = function (a) {
        window.setTimeout(y(function () {
            try {
                var a = Xh(this), c;
                if (this.u) {
                    var d = di(), e = !1;
                    this.m && this.G && (ei(this, this.v), q.GPT_jstiming.report(this.m, this.v, d), this.m = null, this.G = !1, this.v = {}, e = !0);
                    this.o && this.K && (ei(this, this.A), q.GPT_jstiming.report(this.o, this.A, d), this.o = null, this.K = !1, this.A = {}, e = !0);
                    c = e
                } else c = !1;
                if (a || c)this.C = 32E3 < 2 * this.C ? 32E3 : 2 * this.C;
                Th(this)
            } catch (f) {
                O(2602, f)
            }
        }, a), a.C)
    }, di = function () {
        return "https:" ==
        q.location.protocol ? "https://www.google.com/csi" : "http://csi.gstatic.com/csi"
    }, fi = function (a) {
        var b = null != a.l && a.I && (a.j.page_load_time || "complete" == document.readyState) && a.j.loader_loaded_instant;
        b && J(Mh, function (a) {
            var d = Oh[a];
            d && (b = b && this.j[a] == this.j[d])
        }, a);
        return b
    }, Xh = function (a, b) {
        if (!a.u)return !1;
        var c = di(), d = !1;
        if (a.l && (b || fi(a))) {
            b ? Yh(a, "page_unload") : Yh(a, "page_load");
            d = {};
            if (!a.J || b)d.count_of_slots = a.T, d.count_of_requested_slots = a.P, d.count_of_rendered_slots = a.O, d.count_of_requests =
                a.R, d.count_of_refreshes_called = a.N, d.count_of_passback = a.M;
            ei(a, d);
            q.GPT_jstiming.report(a.l, d, c);
            a.J = !0;
            a.I = !1;
            a.l = null;
            d = !0
        }
        return d
    }, ei = function (a, b) {
        b.vrg = "90";
        b.pl_id = a.W;
        a.H.length && (b.e = a.H.join())
    }, Yh = function (a, b) {
        0 < b.length && zc(a.H, b)
    }, gi = function (a, b) {
        null === a.L && ((a.L = b) ? Yh(a, "sra") : Yh(a, "non-sra"))
    }, hi = function (a, b, c, d) {
        a.u && (d ? (a.A[b] = a.A[b] || [], a.A[b].push(c)) : (a.v[b] = a.v[b] || [], a.v[b].push(c)))
    }, ii = function (a, b) {
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
    }, Vh = function (a, b) {
        Wh(a, "page_load_time", b);
        a.w ? Wh(a, "page_load_time_nw", b) : a.V = b || (new Date).getTime()
    }, ji = function () {
        var a = P();
        Wh(a, "_start_pubads_load_period")
    }, ki = function () {
        var a = P();
        Wh(a, "impl_loaded_instant");
        Wh(a, "pubads_load_period")
    }, li = function (a, b, c, d) {
        bi(a, "start_ad_fetch_period", b, c);
        d && J(d, function (a, d) {
                hi(this, d, b + "_" + a, c)
            },
            a);
        ii(a, "count_of_requests")
    }, mi = function (a, b, c, d) {
        bi(a, "start_ad_render_period", b, c);
        d && J(d, function (a, d) {
            hi(this, d, b + "_" + a, c)
        }, a)
    }, ni = function (a, b, c) {
        bi(a, "ad_render_period", b, c)
    }, pi = function (a) {
        var b = oi, c = ka().fifWin || window;
        c.performance && c.performance.getEntriesByName && (a = c.performance.getEntriesByName(a)[0]) && (ai(b, "rt_st_instant", a.startTime), ai(b, "rt_fs_instant", a.fetchStart), ai(b, "rt_dns_period", a.domainLookupEnd - a.domainLookupStart), ai(b, "rt_tcp_period", a.connectEnd - a.connectStart), a.secureConnectionStart &&
        ai(b, "rt_ssl_period", a.connectEnd - a.secureConnectionStart), ai(b, "rt_rtt_period", a.responseStart - a.fetchStart), ai(b, "rt_tft_period", a.responseEnd - a.responseStart), ai(b, "rt_duration_period", a.duration))
    };
    var qi = function () {
        this.j = {};
        this.m = !1;
        this.l = ta();
        this.u = this.l.info(Ca());
        la(window, y(qi.prototype.o, this))
    }, ri = function (a, b) {
        var c = null;
        b in a.j && (c = a.j[b]);
        return c
    }, ti = function () {
        var a = si();
        J(a.j, function (a, c) {
            a.enable();
            Yh(P(), c)
        })
    };
    qi.prototype.o = function () {
        try {
            this.m = !0, this.l.info(wa(), null, null, this.u)
        } catch (a) {
            O(1802, a)
        }
    };
    var si = function () {
        var a = ka();
        return a.service_manager_instance || (a.service_manager_instance = new qi)
    };
    A("enableServices", function () {
        try {
            ti()
        } catch (a) {
            O(1801, a)
        }
    });
    var ui = function (a) {
        var b = t(a) && 2 == a.length && ug(a[0]) && ug(a[1]);
        a = v(a) && "fluid" == a;
        return b || a
    }, wi = function (a) {
        return t(a) ? new vi(a[0], a[1]) : a
    }, xi = function (a) {
        var b = t(a) && 1 < a.length && w(a[0]) && w(a[1]);
        a = v(a) && "fluid" == a;
        return b || a
    };
    var vi = function (a, b) {
        this.l = a;
        this.j = b
    };
    vi.prototype.getWidth = function () {
        return this.l
    };
    vi.prototype.getHeight = function () {
        return this.j
    };
    var yi = function (a) {
        var b = [];
        if (xi(a))b.push(wi(a)); else if (t(a))for (var c = 0; c < a.length; ++c) {
            var d = a[c];
            xi(d) && b.push(wi(d))
        }
        return b
    };
    var zi = function (a, b) {
        this.l = a;
        this.j = b
    };
    zi.prototype.clone = function () {
        return new zi(this.l, this.j)
    };
    var Ai = function (a) {
        this.j = a
    }, Bi = function (a, b) {
        var c = xc(a.j, function (a) {
            a = a.l;
            return a.width <= b.width && a.height <= b.height
        });
        return null == c ? null : c.j
    }, Ci = function (a) {
        if (!t(a) || 2 != a.length)throw Error("Each mapping entry has to be an array of size 2");
        var b;
        b = a[0];
        if (!ui(b) || "fluid" == b)throw Error("Size has to be an array of two non-negative integers");
        b = new re(b[0], b[1]);
        if (t(a[1]) && 0 == a[1].length)a = []; else if (a = yi(a[1]), 0 == a.length)throw Error("At least one slot size must be present");
        return new zi(b,
            a)
    };
    var Di = function (a, b, c) {
        this.j = a;
        this.m = w(b) ? b : 0;
        this.l = this.j + "_" + this.m;
        this.o = c || "gpt_unit_" + this.l
    };
    k = Di.prototype;
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
    k.toString = Di.prototype.getId;
    k.getDomId = function () {
        return this.o
    };
    var Fi = function (a, b, c, d) {
        this.G = a;
        this.Za = yi(c);
        this.U = null;
        this.m = new Di(a, b, d);
        this.u = [];
        this.H = {};
        this.J = null;
        this.j = ta();
        this.j.info(xa(this.m.toString()), null, this);
        this.xa = this.C = this.ba = this.A = null;
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
        this.Xa = ++Ei;
        this.L = {};
        this.wa = "";
        this.P = !1;
        this.K = null;
        this.O = !1;
        this.D = null;
        this.ab = Ud(function () {
            null !== this.D && this.visibilityChanged(this.D)
        }, this);
        this.ka = zg(this.G);
        this.W =
            "";
        this.I = this.v = null;
        this.za = !1;
        this.o = null;
        this.fa = this.B = this.T = 0;
        this.N = !1
    }, Gi = 0, Ei = 0;
    k = Fi.prototype;
    k.getPassbackPageUrl = function () {
        return this.wa
    };
    k.set = function (a, b) {
        try {
            if (!v(a) || !b)return this.j.j(G("Slot.set", [a, b]), null, this), this;
            var c = this.getAdUnitPath();
            this.H[a] = b;
            this.A || this.C ? this.j.j(Ea(a, String(b), c), null, this) : this.j.info(Da(a, String(b), c), null, this);
            return this
        } catch (d) {
            O(201, d)
        }
    };
    k.get = function (a) {
        try {
            return v(a) ? this.H.hasOwnProperty(a) ? this.H[a] : null : (this.j.j(G("Slot.get", [a]), null, this), null)
        } catch (b) {
            O(202, b)
        }
    };
    k.getAttributeKeys = function () {
        try {
            var a = [];
            J(this.H, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(203, b)
        }
    };
    k.addService = function (a) {
        try {
            var b = si();
            if (!Oc(b.j, a))return this.j.j(Rb(this.m.toString()), null, this), this;
            for (b = 0; b < this.u.length; ++b)if (a == this.u[b])return this.j.j(Fa(a.getName(), this.m.toString()), a, this), this;
            this.u.push(a);
            a.ra(this);
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
        return w(a) && w(b) && this.U ? Bi(this.U, new re(a, b)) : this.Za
    };
    var N = function (a) {
        return a.G + "_" + a.m.getInstance()
    };
    Fi.prototype.defineSizeMapping = function (a) {
        try {
            if (!t(a))throw Error("Size mapping has to be an array");
            var b = F(a, Ci);
            this.U = new Ai(b)
        } catch (c) {
            Kg(205, c), this.j.j(Ga(c.message), null, this)
        }
        return this
    };
    var Hi = function (a) {
        var b = window, c = null;
        b.top == b && (b = Be(window), c = a.getSizes(b.width, b.height));
        null == c && (c = a.getSizes());
        return F(c, function (a) {
            return v(a) ? a : [a.getWidth(), a.getHeight()]
        })
    }, eg = function (a) {
        var b = [], c = !1;
        H(Hi(a), function (a) {
            t(a) ? b.push(a.join("x")) : "fluid" == a ? c = !0 : b.push(a)
        });
        c && b.unshift("320x50");
        return b.join("|")
    };
    k = Fi.prototype;
    k.hasWrapperDiv = function () {
        return !!document.getElementById(this.m.getDomId())
    };
    k.setClickUrl = function (a) {
        try {
            if (!v(a))return this.j.j(G("Slot.setClickUrl", [a]), null, this), this;
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
            if (!da(a))return this.j.j(G("Slot.setForceSafeFrame", [a]), null, this), this;
            this.K = a;
            return this
        } catch (b) {
            O(216, b)
        }
    };
    k.setCategoryExclusion = function (a) {
        try {
            return v(a) && !$b(qc(a)) ? (zc(this.M, a), this.j.info(Ha(a), null, this)) : this.j.j(G("Slot.setCategoryExclusion", [a]), null, this), this
        } catch (b) {
            O(207, b)
        }
    };
    k.clearCategoryExclusions = function () {
        try {
            return this.j.info(Ia(), null, this), this.M = [], this
        } catch (a) {
            O(208, a)
        }
    };
    k.getCategoryExclusions = function () {
        try {
            return Cc(this.M)
        } catch (a) {
            O(209, a)
        }
    };
    k.setTargeting = function (a, b) {
        try {
            var c = [];
            t(b) ? c = b : b && c.push(b.toString());
            v(a) ? (this.j.info(Ja(a, c.join(), this.getAdUnitPath()), null, this), this.w[a] = c) : this.j.j(G("Slot.setTargeting", [a, b]), null, this);
            return this
        } catch (d) {
            O(210, d)
        }
    };
    k.clearTargeting = function () {
        try {
            return this.j.info(Ka(), null, this), this.w = {}, this
        } catch (a) {
            O(211, a)
        }
    };
    k.getTargetingMap = function () {
        return Rc(this.w)
    };
    k.getTargeting = function (a) {
        try {
            return v(a) ? this.w.hasOwnProperty(a) ? Cc(this.w[a]) : [] : (this.j.j(G("Slot.getTargeting", [a]), null, this), [])
        } catch (b) {
            O(212, b)
        }
    };
    k.getTargetingKeys = function () {
        try {
            var a = [];
            J(this.w, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(213, b)
        }
    };
    k.la = function (a) {
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
            if (!da(a) || b && !da(b))return this.j.j(G("Slot.setCollapseEmptyDiv", tc([a, b], r)), null, this), this;
            this.X = (this.$ = a) && !!b;
            b && !a && this.j.j(La(this.m.toString()), null, this);
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
    var Ii = function (a, b) {
        if (!a.hasWrapperDiv())return a.j.error(Ma(a.m.toString()), null, a), !1;
        var c = q.document, d = a.m.getDomId(), c = c && c.getElementById(d);
        if (!c)return a.j.error(Na(d, a.m.toString()), null, a), !1;
        d = a.J;
        return v(d) && 0 < d.length ? (a.renderStarted(), c.innerHTML = d, a.renderEnded(b), !0) : !1
    }, Ji = function (a) {
        a.B = ++Gi;
        return a.B
    }, Ki = function (a, b) {
        var c = null, d = !0, e = null, f = null, g = null, h = null, l = null;
        x(b) && (d = b._empty_, d || (c = [b._width_, b._height_], 0 == b._is_afc_ && b._creative_ids_ && b._adgroup2_ids_ && (g = b._creative_ids_[0],
            l = b._adgroup2_ids_[0]), b._advertiser_ids_ && (e = b._advertiser_ids_[0]), b._campaign_ids_ && (f = b._campaign_ids_[0]), b._label_ids_ && b._label_ids_[0] && (h = v(b._label_ids_[0]) ? b._label_ids_[0].split("|") : [b._label_ids_[0]])));
        return new Gh(a, d, c, e, f, g, h, l, "publisher_ads")
    }, Li = function (a) {
        return new Gh(a, !0, null, null, null, null, null, null, "publisher_ads")
    };
    k = Fi.prototype;
    k.fetchStarted = function (a) {
        this.A || ii(P(), "count_of_requested_slots");
        this.A = this.j.info(ya(this.getAdUnitPath()), null, this);
        this.aa = a;
        this.T++
    };
    k.getContentUrl = function () {
        return this.aa
    };
    k.fetchEnded = function () {
        this.ba = this.j.info(za(this.getAdUnitPath()), null, this, this.A)
    };
    k.renderStarted = function () {
        this.C = this.j.info(Aa(this.getAdUnitPath()), null, this)
    };
    k.getResponseInformation = function () {
        return this.I
    };
    k.renderEnded = function (a) {
        a.isEmpty ? this.I = null : this.I = new Ch(a.advertiserId, a.campaignId, a.creativeId, a.labelIds, a.lineItemId);
        this.xa || ii(P(), "count_of_rendered_slots");
        this.xa = this.j.info(Ba(this.getAdUnitPath()), null, this, this.C);
        H(this.u, function (b) {
            if (b.getName() == a.serviceName) {
                var c;
                if (c = !a.slotContentChanged)c = b.B.slotRenderEnded, c = !!c && 0 < c.length;
                c && (c = new Dg("slot_render_ended_false_positive"), Hg(c), Gg(c));
                Lh(b, "slotRenderEnded", a)
            }
        })
    };
    k.impressionViewable = function () {
        Mi(this, "impressionViewable", new Ih(this))
    };
    var Ni = function (a) {
        a.O = !1;
        a.D = null;
        a.I = null;
        a.N = !1;
        a.o = null
    };
    k = Fi.prototype;
    k.Na = function (a, b) {
        a && !this.O && (this.impressionViewable(), this.O = !0);
        var c = this.D;
        this.D = Math.floor(b);
        c !== this.D && this.ab()
    };
    k.visibilityChanged = function (a) {
        a = new Jh(this, Hh().getName(), a);
        Mi(this, "slotVisibilityChanged", a)
    };
    k.setFirstLook = function (a) {
        if (!da(a))return this.j.j(G("Slot.setFirstLook", [a]), null, this), this;
        this.ca = a ? 1 : 2;
        return this
    };
    k.getFirstLook = function () {
        return this.ca
    };
    k.getDefinedId = function () {
        return this.Xa
    };
    var Oi = function (a) {
        var b = [], c = a.getTargetingMap();
        J(c, function (a, c) {
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
    Fi.prototype.Ya = function () {
        return this.T
    };
    var Pi = function (a) {
        return a.o ? a.o._is_afc_ ? a.o._is_afc_ : !1 : null
    }, Mi = function (a, b, c) {
        H(a.u, function (a) {
            a.getName() == c.serviceName && Lh(a, b, c)
        })
    };
    Fi.prototype.setSafeFrameConfig = function (a) {
        try {
            if (a && x(a)) {
                var b = Dh(a);
                b && (this.L = b)
            } else this.j.error(G("Slot.setSafeFrameConfig", [a]), null, this);
            return this
        } catch (c) {
            O(217, c)
        }
    };
    var Q = function (a) {
        return "google_ads_iframe_" + N(a)
    };
    var Qi = {
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
    }, Ri = {
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
    }, Si = {
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
    var Ti = function (a) {
        this.j = {};
        this.l = a
    }, Ui = function (a, b, c, d) {
        b && (c || (c = ""), "google_gl" == b ? b = "google_country" : "google_region" == b && (b = "google_section"), b in a.l && ("undefined" == typeof d || d || !a.j[b]) && (a.j[b] = c))
    }, Vi = function (a, b) {
        J(b.j, function (a, b) {
            this.j[b] || (this.j[b] = a)
        }, a)
    }, Wi = function (a) {
        var b = new Ti(a.l);
        b.j = Rc(a.j);
        delete b.j.google_page_url;
        return b
    }, Yf = function (a) {
        return a.j.google_page_url
    };
    Ti.prototype.ga = function () {
        var a = [];
        J(this.j, function (b, c) {
            var d = Qi[c] || Ri[c] || Si[c] || null;
            d && b && a.push(d + "=" + encodeURIComponent(b))
        });
        return a.join("&")
    };
    var Yi = function (a, b, c, d) {
        var e = Xi(a, Wi(b), c, d);
        a = Xi(a, b, c, d);
        b = [];
        e[0] && 0 < e[0].length && b.push(e[0].join("&"));
        a[1] && 0 < a[1].length && b.push("sps=" + a[1].join("|"));
        return b.join("&")
    }, Xi = function (a, b, c, d) {
        var e = [], f = [], g = b.j;
        J(d, function (b, d) {
            if (b) {
                var n = "";
                null != g[d] && (n = encodeURIComponent(g[d]));
                for (var m = [], p = -1, u = -1, C = 0; C < a.length; ++C) {
                    var ma = N(a[C]);
                    ++p;
                    null == c[ma] ? m.push("") : (ma = c[ma].j, null != ma[d] ? (m.push(encodeURIComponent(encodeURIComponent(ma[d]))), u = p) : m.push(""))
                }
                if (0 <= u) {
                    p = [];
                    p.push(encodeURIComponent(n));
                    for (C = 0; C <= u; ++C)p.push(m[C]);
                    f.push(b + "," + p.join(","))
                } else n && e.push(b + "=" + n)
            }
        });
        b = [];
        b.push(e);
        b.push(f);
        return b
    }, Zi = function (a, b) {
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
        d = Wf(a, a.document,
            500, 300);
        e = {};
        if (!c || d)e.ea = "0";
        return e
    };
    var $i = function (a) {
        this.j = {};
        this.w = {};
        this.m = {};
        this.C = [];
        this.M = a;
        this.o = new Ti(a);
        this.u = {};
        this.D = {};
        this.A = {};
        this.I = {};
        this.L = this.B = "";
        this.l = !1;
        this.J = -1;
        this.K = 0;
        this.G = this.v = !1;
        this.H = {}
    }, aj = function (a, b) {
        var c = N(b);
        if (a.j[c])return a.j[c];
        a.j[c] = b;
        a.w[b.getAdUnitPath()] || (a.w[b.getAdUnitPath()] = []);
        return a.w[b.getAdUnitPath()][b.getInstance()] = b
    }, cj = function (a) {
        return tc(bj(a), function (a) {
            return !a.A
        })
    }, dj = function (a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = b[c];
            N(d) in a.j && Ni(d)
        }
    }, ej = function (a) {
        a =
            tc(bj(a), function (a) {
                return !!a.A && !a.ba
            });
        return F(a, function (a) {
            return [a.getAdUnitPath(), a.getSlotId().getInstance()]
        })
    }, fj = function (a, b) {
        return !(N(b) in a.I)
    }, gj = function (a) {
        var b = 0;
        J(a.j, function () {
            b++
        });
        return b
    };
    $i.prototype.toString = function () {
        var a = "[AdData:", b = [];
        J(this.j, function (a) {
            b.push(a.toString())
        });
        J(this.m, function (a, d) {
            b.push("[" + d + "," + a + "]")
        });
        a += b.join();
        return a + "]"
    };
    var bj = function (a) {
        var b = [];
        J(a.j, function (a) {
            b.push(a)
        });
        return b
    }, hj = function (a, b) {
        var c = b || bj(a), c = F(c, function (a) {
            return a.ka
        });
        Ec(c);
        return c
    }, ij = function (a) {
        var b = [];
        J(a.m, function (a, d) {
            b.push(encodeURIComponent(d) + "=" + encodeURIComponent(a))
        });
        0 < a.C.length && ("excl_cat" in a.m || b.push(encodeURIComponent("excl_cat") + "=" + encodeURIComponent(a.C.join(","))));
        return b.join("&")
    }, jj = function (a, b, c) {
        a.A[N(b)] = c
    }, kj = function (a, b) {
        var c = a.A[N(b)], d;
        if (c)if (c)try {
            var e = window.top, f = new qe(0, 0), g, h = we(c);
            g = h ? De(h) : window;
            if (fd(g, "parent")) {
                do {
                    var l;
                    if (g == e)l = Ne(c); else {
                        var n = Le(c);
                        l = new qe(n.left, n.top)
                    }
                    h = l;
                    f.x += h.x;
                    f.y += h.y
                } while (g && g != e && g != g.parent && (c = g.frameElement) && (g = g.parent))
            }
            d = f
        } catch (m) {
            d = new qe(-12245933, -12245933)
        } else d = null; else d = null;
        return d
    }, lj = function (a) {
        for (var b = [], c = 0; c < a.length; ++c)b.push(eg(a[c]));
        return b.join()
    }, mj = function (a) {
        for (var b = [], c = !1, d = 0; d < a.length; ++d) {
            var e = a[d].getFirstLook();
            0 != e && (c = !0);
            b.push(e)
        }
        return c ? b.join() : void 0
    };
    var nj = function () {
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
        this.B = this.C = "";
        this.A = !1;
        this.videoStreamCorrelator = NaN;
        this.u = 0
    };
    var qj = function (a) {
        this.u = document;
        this.j = a || 0;
        this.l = oj(this, "__gads=");
        this.v = this.o = !1;
        pj(this)
    }, rj = function (a, b) {
        if (b._cookies_ && b._cookies_.length && (a.m = b._cookies_[0], null != a.m && (a.l = a.m._value_, null != a.m && a.l))) {
            var c = new Date;
            c.setTime(1E3 * a.m._expires_);
            a.u.cookie = "__gads=" + a.l + "; expires=" + c.toGMTString() + "; path=" + a.m._path_ + "; domain=." + a.m._domain_
        }
    }, pj = function (a) {
        if (!a.l && !a.v && 1 != a.j) {
            a.u.cookie = "GoogleAdServingTest=Good";
            var b = "Good" == oj(a, "GoogleAdServingTest=");
            if (b) {
                var c = new Date;
                c.setTime((new Date).valueOf() + -1);
                a.u.cookie = "GoogleAdServingTest=; expires=" + c.toGMTString()
            }
            a.o = b;
            a.v = !0
        }
    }, oj = function (a, b) {
        var c = a.u.cookie, d = c.indexOf(b), e = "";
        -1 != d && (d += b.length, e = c.indexOf(";", d), -1 == e && (e = c.length), e = c.substring(d, e));
        return e
    }, sj = null, tj = function (a) {
        null == sj && (sj = new qj(a));
        return sj
    };
    var uj = function (a, b) {
            var c;
            c = M["#6#"] ? "https://" + M["#33#"] : "http://" + M["#33#"];
            if (!b || 0 > b || 1 < b)b = 0;
            this.m = Math.random() < b;
            this.l = a;
            this.j = c + "/pagead/gen_204?id=" + encodeURIComponent(a)
        }, R = function (a, b, c) {
            b && b.match(/^\w+$/) && c && (a.j += "&" + b + "=" + encodeURIComponent(c))
        }, vj = function (a, b) {
            R(a, "vrg", "90");
            var c = document, d = hj(b);
            0 < d.length && (3 >= d.length || (d = Dc(d, 0, 3), d.push("__extra__")), R(a, "nw_id", d.join(",")));
            R(a, "nslots", gj(b).toString());
            d = Yd();
            0 < d.length && R(a, "eid", d.join());
            R(a, "pub_url", c.URL)
        },
        wj = function (a) {
            a.m && a.l && a.j && Id(window, a.j)
        };
    var xj = function () {
        this.j = {};
        var a = Qe.URL;
        null == S(this, "target_platform") && (this.j.target_platform = "DESKTOP");
        for (var b = this.j, a = a.split("?"), a = a[a.length - 1].split("&"), c = 0; c < a.length; c++) {
            var d = a[c].split("=");
            if (d[0]) {
                var e = d[0].toLowerCase();
                if ("google_domain_reset_url" != e)try {
                    var f;
                    if (1 < d.length) {
                        var g = d[1];
                        f = window.decodeURIComponent ? decodeURIComponent(g.replace(ag, " ")) : unescape(g)
                    } else f = "";
                    b[e] = f
                } catch (h) {
                }
            }
        }
    }, S = function (a, b) {
        return null == b ? null : a.j[b]
    };
    var yj = function (a, b, c, d, e) {
        this.j = b;
        this.v = c;
        this.m = d;
        this.u = a;
        this.l = e;
        this.o = "";
        this.G = Qi;
        this.w = [];
        this.D = []
    };
    yj.prototype.ga = function (a, b) {
        var c = b || window;
        if (!t(a))return "";
        if ("sra" == this.u)0 == a.length && (a = bj(this.j)); else {
            if (0 == a.length)return "";
            1 < a.length && (a = [a[0]])
        }
        this.B();
        this.C(a, c);
        return this.o
    };
    yj.prototype.C = function (a, b) {
        var c = b || window;
        try {
            var d, e, f;
            "prerender" == ig(document) ? (e = "108809008", f = M["#17#"]) : (e = "108809007", f = M["#16#"]);
            d = jd([e], f);
            T(this, "eid", (d ? Bc(this.l.m, d) : this.l.m).join())
        } catch (C) {
        }
        this.m && 0 !== this.m.j && T(this, "co", this.m.j);
        d = this.j.J;
        -1 !== d && T(this, "tfcd", d);
        1 === this.j.K && T(this, "kfa", 1);
        T(this, "sc", M["#6#"] ? 1 : 0);
        window.postMessage && T(this, "sfv", "1-0-4");
        if ("sra" == this.u) {
            zj(this, a);
            Aj(this);
            d = [];
            for (e = 0; e < a.length; ++e)d.push(Oi(a[e]));
            e = d.join("|");
            e.length == d.length -
            1 && (e = null);
            T(this, "prev_scp", e)
        } else d = a[0].gtfcd(), -1 !== d && T(this, "tfcd", d), d = a[0], T(this, "iu", d.getAdUnitPath()), T(this, "sz", eg(d)), yc(Hi(d), "fluid") && T(this, "fluid", "height"), (e = d.getFirstLook()) && T(this, "fl", e), e = Bj(d.K, this.j.G), "1" == e && T(this, "fsf", e), e = d.T, 0 < e && T(this, "rc", e), d.getClickUrl() && T(this, "click", d.getClickUrl()), d.getOutOfPage() && T(this, "ists", "1"), fj(this.j, d) || T(this, "logonly", "1"), Aj(this), d = a[0], e = Oi(d), T(this, "scp", e), d = d.getAudExtId(), 0 < d && T(this, "audextid", d);
        d = 1 != this.l.l;
        e = a[0].l;
        f = this.j.u;
        if (null != Yf(this.j.o))f = !0; else {
            for (var g = !1, h = 0; h < a.length && !g; h++)g = null != Zf(a[h], f);
            f = g
        }
        var g = this.l.D, h = 3 == this.l.l, l = M["#46#"], n = 0;
        d && (n |= 1);
        e && (n |= 2);
        f && (n |= 4);
        g && (n |= 8);
        h && (n |= 16);
        l && (n |= 32);
        d = n;
        0 < d && T(this, "eri", d);
        "prerender" == ig() && T(this, "d_imp", 1);
        d = c.document;
        T(this, "cust_params", ij(this.j));
        this.m && 1 != this.m.j && (T(this, "cookie", this.m.l), this.m.o && T(this, "cookie_enabled", "1"));
        (e = this.j.B) && T(this, "uule", e);
        this.m && 1 != this.m.j && (d = (Yf(this.j.o) || (Vf(c) ? d.URL : d.referrer)) !=
        d.URL ? d.domain : "") && T(this, "cdm", d);
        null != S(this.v, "google_preview") && T(this, "gct", S(this.v, "google_preview"));
        this.j.v && T(this, "is_amp", "1");
        this.A(new Date, a, c);
        d = {};
        d.u_tz = -(new Date).getTimezoneOffset();
        var m;
        try {
            m = L.history.length
        } catch (C) {
            m = 0
        }
        d.u_his = m;
        d.u_java = !!L.navigator && "unknown" !== typeof L.navigator.javaEnabled && !!L.navigator.javaEnabled && L.navigator.javaEnabled();
        L.screen && (d.u_h = L.screen.height, d.u_w = L.screen.width, d.u_ah = L.screen.availHeight, d.u_aw = L.screen.availWidth, d.u_cd = L.screen.colorDepth);
        L.navigator && L.navigator.plugins && (d.u_nplug = L.navigator.plugins.length);
        L.navigator && L.navigator.mimeTypes && (d.u_nmime = L.navigator.mimeTypes.length);
        Cj(this, d);
        q.devicePixelRatio && U(this, "u_sd", Number(q.devicePixelRatio.toFixed(3)));
        var p;
        try {
            p = Ye()
        } catch (C) {
            p = "0"
        }
        U(this, "flash", p);
        f = c || window;
        p = f.document;
        m = "sra" == this.u ? Yf(this.j.o) : Zf(a[0], this.j.u) || Yf(this.j.o);
        g = gg(p.URL, S(this.v, "google_preview"));
        p = this.j.v ? (p = If()) ? p.referrer : null : gg(p.referrer, S(this.v, "google_preview"));
        h = new xd(f);
        d =
            h.j[Math.max(h.j.length - 1, 0)].url;
        e = h.j[0].depth;
        var u;
        null != m ? (u = g, Vf(f) || (p = "", d && (d = pd(d.match(od)[3] || null)))) : m = g;
        if (null != e && 0 < e && (T(this, "nhd", e), f.location.ancestorOrigins)) {
            f = [];
            for (g = 1; g < h.j.length && 27 > g; g++)h.j[g] && h.j[g].url && (f[g - 1] = h.j[g].url);
            f = yd(h, f.reverse());
            T(this, "iag", f);
            f = h.j;
            g = [];
            for (h = f.length - 1; 0 < h; h--)(l = f[h]) && null != l.url && g.push(pd(l.url.match(od)[3] || null));
            f = td(g);
            0 < f && T(this, "mdo", f)
        }
        T(this, "url", m);
        null != u && u != m && T(this, "loc", u);
        T(this, "ref", p);
        null != e && 0 < e && T(this,
            "top", d);
        u = c || window;
        c = u.document;
        (m = c.scripts) && T(this, "dssz", m.length);
        u = new xd(u);
        if (m = u.l.document && u.l.document.scripts ? u.l.document.scripts : []) {
            p = [];
            for (d = m.length - 1; 0 <= d && 26 > p.length;)m[d].src && p.unshift(m[d].src), d--;
            m = yd(u, p)
        } else m = 0;
        T(this, "icsg", m);
        if (u = u.l.document && u.l.document.scripts ? u.l.document.scripts : []) {
            m = [];
            for (p = u.length - 1; 0 <= p; p--)(d = u[p]) && null != d.src && m.push(pd(d.src.match(od)[3] || null));
            u = td(m)
        } else u = 0;
        0 < u && T(this, "mso", u);
        u = Error();
        u.stack && (m = u.stack, p = m.split(/\r\n|\r|\n/).length,
        "Error" == m.slice(0, 5) && p--, m = p - 10, 0 > m && (m = 0, p = new uj("gpt_negative_stack_trace", M["#23#"]), vj(p, this.j), R(p, "stackTrace", u.stack), wj(p)), T(this, "std", m));
        c.currentScript && c.currentScript.text && T(this, "csl", c.currentScript.text.length);
        T(this, "vrg", "90");
        T(this, "vrp", "90")
    };
    var Dj = function (a, b) {
        for (var c = b.length, d = [], e = 0; e < c; e++) {
            var f = fg(b[e]);
            b[e].W = f;
            d.push(f)
        }
        T(a, "adks", d.join(","))
    }, Cj = function (a, b) {
        J(b, function (a, b) {
            U(this, b, a)
        }, a)
    }, Aj = function (a) {
        a.m && 1 == a.m.j || T(a, "ppid", a.j.L)
    };
    yj.prototype.A = function (a, b, c) {
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
        a = Zi(c, d);
        Se(a, y(function (a, b) {
            T(this, b, a)
        }, this));
        d = Xf(c, d).Sa || null;
        null != d && T(this, "frm", d);
        if (d = (this.j.v ? Kf() : null) || Hf(!0, c))T(this, "biw", d.width), T(this, "bih", d.height);
        !Vf(c) && (c = Hf(!1, c)) && (T(this, "isw", c.width), T(this, "ish", c.height));
        this.l.u && T(this, "oid", this.l.u);
        if ("sra" == this.u)Dj(this, b); else {
            if (c = (this.j.v ? Lf() : null) || kj(this.j, b[0]))T(this, "adx", Math.round(c.x)), T(this, "ady", Math.round(c.y));
            c = b[0].W || fg(b[0], this.j.D[N(b[0])]);
            T(this, "adk", c)
        }
        c = kf();
        0 < c && T(this, "osd", c);
        c = this.j.o;
        d = "";
        "sra" == this.u ? d = Yi(b, c, this.j.u, this.G) : (b = this.j.u[N(b[0])], null == b ? b = c : Vi(b, c), b = Wi(b), d = b.ga());
        d && (this.o += "&" + d)
    };
    yj.prototype.B = function () {
        var a = !1, b = M["#46#"];
        this.j.B || (a = b ? !mg(qg, "experiment") : mg(rg, "control"));
        this.o = bg(!a) + "/gampad/ads?";
        U(this, "gdfp_req", 1);
        T(this, "correlator", this.l.w);
        U(this, "output", this.l.G);
        U(this, "callback", this.l.v);
        U(this, "impl", this.l.o);
        this.l.persistentRoadblocksOnly && T(this, "per_only", 1);
        "sra" == this.u && T(this, "json_a", 1)
    };
    var zj = function (a, b) {
        for (var c = b.length, d = 0; d < c; d++)Ej(a, b[d].getAdUnitPath());
        T(a, "iu_parts", a.w.join());
        T(a, "enc_prev_ius", a.D.join());
        T(a, "prev_iu_szs", lj(b));
        vc(b, function (a) {
            return yc(Hi(a), "fluid")
        }) && (c = F(b, function (a) {
            return yc(Hi(a), "fluid") ? "height" : "0"
        }).join(), T(a, "fluid", c));
        (c = mj(b)) && T(a, "fla", c);
        c = F(b, function (a) {
            return Bj(a.K, this.j.G)
        }, a).join();
        0 <= c.indexOf("1") && T(a, "fsfs", c);
        c = F(b, Function.prototype.call, Fi.prototype.Ya);
        0 < vc(c, function (a) {
            return 0 < a
        }) && T(a, "rcs", c.join());
        (c =
            Fj(b)) && T(a, "ists", c);
        var e = {};
        H(b, function (a) {
            (a = a.getClickUrl()) && (e[a] = (e[a] || 0) + 1)
        });
        Pc(e) || (c = new Dg("gpt_sra_setclickurl"), Fg(c, "lenfreqs", F(Mc(e), function (a) {
            return a.length + ":" + e[a]
        }).join()), Hg(c), Gg(c, xg("#58#")))
    }, Bj = function (a, b) {
        return (null === a ? b : a) ? "1" : "0"
    }, T = function (a, b, c) {
        null != c && U(a, b, encodeURIComponent("" + c))
    }, U = function (a, b, c) {
        null != c && "" != c && (a.o = "?" != a.o.charAt(a.o.length - 1) ? a.o + ("&" + b + "=" + c) : a.o + (b + "=" + c))
    }, Ej = function (a, b) {
        var c = "";
        if ("" != b) {
            for (var c = b.split("/"), d = 0; d < c.length; d++)if ("" !=
                c[d]) {
                for (var e = !1, f = 0; f < a.w.length; f++)if (c[d] == a.w[f]) {
                    e = !0;
                    break
                }
                e || a.w.push(c[d])
            }
            d = "";
            for (e = 0; e < c.length; e++) {
                if (0 < e)d += "/"; else if ("" == c[0])continue;
                for (f = 0; f < a.w.length; f++)if (c[e] == a.w[f]) {
                    d += f;
                    break
                }
            }
            c = d
        }
        a.D.push(c)
    }, Fj = function (a) {
        if (!a.length)return 0;
        for (var b = "", c = 0; c < a.length; ++c)b += a[c].getOutOfPage() ? "1" : "0";
        return parseInt(b, 2)
    };
    var Gj = navigator;

    function Hj() {
        try {
            return Gj.javaEnabled()
        } catch (a) {
            return !1
        }
    }

    function Ij(a) {
        var b = 1, c, d;
        if (void 0 != a && "" != a)for (b = 0, d = a.length - 1; 0 <= d; d--)c = a.charCodeAt(d), b = (b << 6 & 268435455) + c + (c << 14), c = b & 266338304, b = 0 != c ? b ^ c >> 21 : b;
        return b
    }

    function Jj(a, b) {
        if (!a || "none" == a)return 1;
        a = String(a);
        "auto" == a && (a = b, "www." == a.substring(0, 4) && (a = a.substring(4, a.length)));
        return Ij(a.toLowerCase())
    }

    var Kj = /^\s*_ga=\s*1\.(\d+)[^.]*\.(.*?)\s*$/, Lj = /^[^=]+=\s*GA1\.(\d+)[^.]*\.(.*?)\s*$/;
    var Mj = function (a, b, c, d, e) {
        yj.call(this, a, b, c, d, e)
    };
    z(Mj, yj);
    Mj.prototype.A = function (a, b, c) {
        0 < navigator.userAgent.indexOf("MSIE ") && Ui(this.j.o, "google_encoding", document.charset, !1);
        yj.prototype.A.call(this, a, b, c);
        T(this, "ifi", b[0].fa);
        c == c.top ? c = 0 : (a = [], a.push(c.document.URL), c.name && a.push(c.name), c = Hf(!1, c, !1), a.push(c.width.toString()), a.push(c.height.toString()), c = kd(a.join("")));
        0 != c && T(this, "ifk", c.toString())
    };
    Mj.prototype.C = function (a) {
        var b = a[0], c = window;
        c.google_unique_id ? ++c.google_unique_id : c.google_unique_id = 1;
        b.fa = c.google_unique_id;
        this.l.A ? (U(this, "hxva", 1), T(this, "cmsid", this.l.B), T(this, "vid", this.l.C)) : window.google_test_extended_pageview && U(this, "hxva", 1);
        isNaN(this.l.videoPodNumber) || U(this, "pod", this.l.videoPodNumber);
        isNaN(this.l.videoPodPosition) || U(this, "ppos", this.l.videoPodPosition);
        isNaN(this.l.videoStreamCorrelator) || U(this, "scor", this.l.videoStreamCorrelator);
        yj.prototype.C.call(this,
            a);
        a = window;
        var b = a.document.domain, c = a.document.cookie, d = a.history.length, e = a.screen, f = a.document.referrer;
        if (!If()) {
            var g = Math.round((new Date).getTime() / 1E3), h = window.google_analytics_domain_name, b = "undefined" == typeof h ? Jj("auto", b) : Jj(h, b), l = -1 < c.indexOf("__utma=" + b + "."), n = -1 < c.indexOf("__utmb=" + b), h = Pf("google_persistent_state"), m;
            (m = Uf(h)) || (m = {}, h = h.S, h[Tf()] = m, m = h[Rf()] = m);
            h = m;
            m = !1;
            if (l)f = c.split("__utma=" + b + ".")[1].split(";")[0].split("."), n ? h.sid = f[3] + "" : h.sid || (h.sid = g + ""), h.vid = f[0] + "." +
                f[1], h.from_cookie = !0; else {
                h.sid || (h.sid = g + "");
                if (!h.vid) {
                    m = !0;
                    n = Math.round(2147483647 * Math.random());
                    l = [Gj.appName, Gj.version, Gj.language ? Gj.language : Gj.browserLanguage, Gj.platform, Gj.userAgent, Hj() ? 1 : 0].join("");
                    e ? l += e.width + "x" + e.height + e.colorDepth : window.java && window.java.awt && (e = window.java.awt.Toolkit.getDefaultToolkit().getScreenSize(), l += e.screen.width + "x" + e.screen.height);
                    l = l + c + (f || "");
                    for (f = l.length; 0 < d;)l += d-- ^ f++;
                    h.vid = (n ^ Ij(l) & 2147483647) + "." + g
                }
                h.from_cookie = !1
            }
            if (!h.cid) {
                var p;
                a:{
                    g =
                        999;
                    if (f = window.google_analytics_domain_name)f = 0 == f.indexOf(".") ? f.substr(1) : f, g = ("" + f).split(".").length;
                    f = 999;
                    c = c.split(";");
                    for (e = 0; e < c.length; e++)if (d = Kj.exec(c[e]) || Lj.exec(c[e])) {
                        if (d[1] == g) {
                            p = d[2];
                            break a
                        }
                        d[1] < f && (f = d[1], p = d[2])
                    }
                }
                m && p && -1 != p.search(/^\d+\.\d+$/) ? h.vid = p : p != h.vid && (h.cid = p)
            }
            h.dh = b;
            h.hid || (h.hid = Math.round(2147483647 * Math.random()))
        }
        p = Pf();
        p = Uf(p);
        U(this, "ga_vid", p.vid);
        U(this, "ga_sid", p.sid);
        U(this, "ga_hid", p.hid);
        U(this, "ga_fc", p.from_cookie);
        T(this, "ga_wpids", a.google_analytics_uacct)
    };
    var Nj = function () {
    };
    var Oj, Pj = function () {
    };
    z(Pj, Nj);
    Pj.prototype.j = function () {
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
    Oj = new Pj;
    var Qj = function (a, b, c) {
        this.o = c;
        this.m = a;
        this.u = b;
        this.l = 0;
        this.j = null
    };
    Qj.prototype.get = function () {
        var a;
        0 < this.l ? (this.l--, a = this.j, this.j = a.next, a.next = null) : a = this.m();
        return a
    };
    var Rj = function (a, b) {
        a.u(b);
        a.l < a.o && (a.l++, b.next = a.j, a.j = b)
    };
    var Sj = function (a) {
        q.setTimeout(function () {
            throw a;
        }, 0)
    }, Vj = function (a, b) {
        var c = a;
        b && (c = y(a, b));
        !ea(q.setImmediate) || q.Window && q.Window.prototype && !I("Edge") && q.Window.prototype.setImmediate == q.setImmediate ? (Tj || (Tj = Uj()), Tj(c)) : q.setImmediate(c)
    }, Tj, Uj = function () {
        var a = q.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !I("Presto") && (a = function () {
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
        if ("undefined" !== typeof a && !Xc()) {
            var b = new a, c = {}, d = c;
            b.port1.onmessage = function () {
                if (r(c.next)) {
                    c = c.next;
                    var a = c.va;
                    c.va = null;
                    a()
                }
            };
            return function (a) {
                d.next = {va: a};
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
            q.setTimeout(a, 0)
        }
    };
    var Xj = new Qj(function () {
        return new Wj
    }, function (a) {
        a.reset()
    }, 100), Zj = function () {
        var a = Yj, b = null;
        a.j && (b = a.j, a.j = a.j.next, a.j || (a.l = null), b.next = null);
        return b
    }, Wj = function () {
        this.next = this.l = this.j = null
    };
    Wj.prototype.set = function (a, b) {
        this.j = a;
        this.l = b;
        this.next = null
    };
    Wj.prototype.reset = function () {
        this.next = this.l = this.j = null
    };
    var dk = function (a, b) {
        ak || bk();
        ck || (ak(), ck = !0);
        var c = Yj, d = Xj.get();
        d.set(a, b);
        c.l ? c.l.next = d : c.j = d;
        c.l = d
    }, ak, bk = function () {
        if (q.Promise && q.Promise.resolve) {
            var a = q.Promise.resolve(void 0);
            ak = function () {
                a.then(ek)
            }
        } else ak = function () {
            Vj(ek)
        }
    }, ck = !1, Yj = new function () {
        this.l = this.j = null
    }, ek = function () {
        for (var a; a = Zj();) {
            try {
                a.j.call(a.l)
            } catch (b) {
                Sj(b)
            }
            Rj(Xj, a)
        }
        ck = !1
    };
    var gk = function (a, b) {
        this.j = 0;
        this.w = void 0;
        this.m = this.l = this.u = null;
        this.o = this.v = !1;
        if (a != aa)try {
            var c = this;
            a.call(b, function (a) {
                fk(c, 2, a)
            }, function (a) {
                fk(c, 3, a)
            })
        } catch (d) {
            fk(this, 3, d)
        }
    }, hk = function () {
        this.next = this.m = this.l = this.o = this.j = null;
        this.u = !1
    };
    hk.prototype.reset = function () {
        this.m = this.l = this.o = this.j = null;
        this.u = !1
    };
    var ik = new Qj(function () {
        return new hk
    }, function (a) {
        a.reset()
    }, 100), jk = function (a, b, c) {
        var d = ik.get();
        d.o = a;
        d.l = b;
        d.m = c;
        return d
    };
    gk.prototype.then = function (a, b, c) {
        return kk(this, ea(a) ? a : null, ea(b) ? b : null, c)
    };
    gk.prototype.then = gk.prototype.then;
    gk.prototype.$goog_Thenable = !0;
    var mk = function (a, b) {
        a.l || 2 != a.j && 3 != a.j || lk(a);
        a.m ? a.m.next = b : a.l = b;
        a.m = b
    }, kk = function (a, b, c, d) {
        var e = jk(null, null, null);
        e.j = new gk(function (a, g) {
            e.o = b ? function (c) {
                try {
                    var e = b.call(d, c);
                    a(e)
                } catch (n) {
                    g(n)
                }
            } : a;
            e.l = c ? function (b) {
                try {
                    var e = c.call(d, b);
                    a(e)
                } catch (n) {
                    g(n)
                }
            } : g
        });
        e.j.u = a;
        mk(a, e);
        return e.j
    };
    gk.prototype.B = function (a) {
        this.j = 0;
        fk(this, 2, a)
    };
    gk.prototype.C = function (a) {
        this.j = 0;
        fk(this, 3, a)
    };
    var fk = function (a, b, c) {
        if (0 == a.j) {
            a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself"));
            a.j = 1;
            var d;
            a:{
                var e = c, f = a.B, g = a.C;
                if (e instanceof gk)mk(e, jk(f || aa, g || null, a)), d = !0; else {
                    var h;
                    if (e)try {
                        h = !!e.$goog_Thenable
                    } catch (n) {
                        h = !1
                    } else h = !1;
                    if (h)e.then(f, g, a), d = !0; else {
                        if (x(e))try {
                            var l = e.then;
                            if (ea(l)) {
                                nk(e, l, f, g, a);
                                d = !0;
                                break a
                            }
                        } catch (n) {
                            g.call(a, n);
                            d = !0;
                            break a
                        }
                        d = !1
                    }
                }
            }
            d || (a.w = c, a.j = b, a.u = null, lk(a), 3 != b || ok(a, c))
        }
    }, nk = function (a, b, c, d, e) {
        var f = !1, g = function (a) {
            f || (f = !0, c.call(e, a))
        }, h =
            function (a) {
                f || (f = !0, d.call(e, a))
            };
        try {
            b.call(a, g, h)
        } catch (l) {
            h(l)
        }
    }, lk = function (a) {
        a.v || (a.v = !0, dk(a.A, a))
    }, pk = function (a) {
        var b = null;
        a.l && (b = a.l, a.l = b.next, b.next = null);
        a.l || (a.m = null);
        return b
    };
    gk.prototype.A = function () {
        for (var a; a = pk(this);) {
            var b = this.j, c = this.w;
            if (3 == b && a.l && !a.u) {
                var d;
                for (d = this; d && d.o; d = d.u)d.o = !1
            }
            if (a.j)a.j.u = null, qk(a, b, c); else try {
                a.u ? a.o.call(a.m) : qk(a, b, c)
            } catch (e) {
                rk.call(null, e)
            }
            Rj(ik, a)
        }
        this.v = !1
    };
    var qk = function (a, b, c) {
        2 == b ? a.o.call(a.m, c) : a.l && a.l.call(a.m, c)
    }, ok = function (a, b) {
        a.o = !0;
        dk(function () {
            a.o && rk.call(null, b)
        })
    }, rk = Sj;
    var vk = function (a, b) {
        var c = {timeoutMs: 0, withCredentials: !0};
        return new gk(function (d, e) {
            var f = c || {}, g, h = f.lb ? f.lb.j() : Oj.j();
            try {
                h.open("POST", a, !0)
            } catch (m) {
                e(new sk("Error opening XHR: " + m.message, a))
            }
            h.onreadystatechange = function () {
                if (4 == h.readyState) {
                    q.clearTimeout(g);
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
                    !b && (b = 0 === h.status) && (b = a.match(od)[1] || null, !b && q.self && q.self.location && (b = q.self.location.protocol, b = b.substr(0,
                        b.length - 1)), b = b ? b.toLowerCase() : "", b = !("http" == b || "https" == b || "" == b));
                    b ? d(h) : e(new tk(h.status, a))
                }
            };
            h.onerror = function () {
                e(new sk("Network error", a))
            };
            var l;
            if (f.headers) {
                for (var n in f.headers)l = f.headers[n], null != l && h.setRequestHeader(n, l);
                l = f.headers["Content-Type"]
            }
            n = q.FormData && b instanceof q.FormData;
            void 0 !== l || n || h.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            f.withCredentials && (h.withCredentials = f.withCredentials);
            f.responseType && (h.responseType = f.responseType);
            f.bb && h.overrideMimeType(f.bb);
            0 < f.ib && (g = q.setTimeout(function () {
                h.onreadystatechange = aa;
                h.abort();
                e(new uk(a))
            }, f.ib));
            try {
                h.send(b)
            } catch (m) {
                h.onreadystatechange = aa, q.clearTimeout(g), e(new sk("Error sending XHR: " + m.message, a))
            }
        })
    }, sk = function (a, b) {
        Yb.call(this, a + ", url=" + b);
        this.url = b
    };
    z(sk, Yb);
    sk.prototype.name = "XhrError";
    var tk = function (a, b) {
        sk.call(this, "Request Failed, status=" + a, b)
    };
    z(tk, sk);
    tk.prototype.name = "XhrHttpError";
    var uk = function (a) {
        sk.call(this, "Request timed out", a)
    };
    z(uk, sk);
    uk.prototype.name = "XhrTimeoutError";
    var wk = function () {
    };
    z(wk, Nj);
    wk.prototype.j = function () {
        var a = new XMLHttpRequest;
        if ("withCredentials" in a)return a;
        if ("undefined" != typeof XDomainRequest)return new xk;
        throw Error("Unsupported browser");
    };
    var xk = function () {
        this.j = new XDomainRequest;
        this.readyState = 0;
        this.responseText = this.onreadystatechange = null;
        this.status = -1;
        this.j.onload = y(this.Ma, this);
        this.j.onerror = y(this.ya, this);
        this.j.onprogress = y(this.Oa, this);
        this.j.ontimeout = y(this.Pa, this)
    };
    k = xk.prototype;
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
    k.Ma = function () {
        this.status = 200;
        this.responseText = this.j.responseText;
        yk(this, 4)
    };
    k.ya = function () {
        this.status = 500;
        this.responseText = null;
        yk(this, 4)
    };
    k.Pa = function () {
        this.ya()
    };
    k.Oa = function () {
        this.status = 200;
        yk(this, 1)
    };
    var yk = function (a, b) {
        a.readyState = b;
        if (a.onreadystatechange)a.onreadystatechange()
    };
    var zk = function (a) {
            if (a = ye(a))a.innerHTML = ""
        }, Ak = function (a, b) {
            var c = ye(a);
            c && (c.style.display = b ? "" : "none")
        }, Bk = function (a, b, c, d, e, f) {
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
        }, Ck = function (a, b) {
            if (0 != cg()) {
                var c = a.getElementById(b);
                c && "hidden" == c.style.visibility && "none" == c.style.display && c.parentNode.removeChild(c)
            }
        }, Fk = function (a, b, c, d, e, f, g) {
            var h = Dk, l;
            t(d) ? l = new re(d[0], d[1]) : l = 1;
            d = mg(sg, "experiment");
            return new yh({
                qa: a,
                Qa: b,
                Ra: h,
                content: Ek(c),
                size: l,
                $a: {
                    info: function () {
                    }, j: function () {
                    }, error: function () {
                    }
                },
                Ka: !0,
                Ea: e,
                sandbox: r(f.sandbox) ?
                    f.sandbox : !1,
                permissions: {
                    ia: r(f.allowOverlayExpansion) ? f.allowOverlayExpansion : !g,
                    ja: r(f.allowPushExpansion) ? f.allowPushExpansion : !1
                },
                Wa: d,
                ha: !!ka().fifWin
            })
        }, Ik = function (a, b, c) {
            c && (b = Ek(b));
            if (0 != cg()) {
                var d;
                try {
                    d = !!a.contentWindow.document
                } catch (C) {
                    d = !1
                }
                if (d) {
                    var e = b, f = Gk();
                    try {
                        var g = window.frames[a.name];
                        if (6 < parseInt(cg(), 10) || 0 > e.indexOf("http://" + M["#1#"] + "/pagead/inject_object_div.js")) {
                            var h;
                            b:{
                                a = e;
                                b = document;
                                var l = cg(), n;
                                if (!(n = 0 == l || isNaN(l) || 7 > l || 9 < l || b.documentMode && 10 <= b.documentMode)) {
                                    var m =
                                        navigator.userAgent.match(/Trident\/([0-9]+.[0-9]+)/);
                                    n = 6 <= (m ? parseFloat(m[1]) : 0)
                                }
                                if (!n)for (l = 0; l < a.length; ++l)if (127 < a.charCodeAt(l)) {
                                    h = !0;
                                    break b
                                }
                                h = !1
                            }
                            if (h) {
                                var p = unescape(encodeURIComponent(e)), u = Math.floor(p.length / 2);
                                a = [];
                                for (h = 0; h < u; ++h)a[h] = String.fromCharCode(256 * p.charCodeAt(2 * h + 1) + p.charCodeAt(2 * h));
                                1 == p.length % 2 && (a[u] = p.charAt(p.length - 1));
                                e = a.join("")
                            }
                            g.contents = e;
                            g.location.replace("javascript:window.contents")
                        } else g.contents = e, g.location.replace("javascript:document.write(window.contents);document.close();")
                    } catch (C) {
                    } finally {
                        Hk(f)
                    }
                } else {
                    p =
                        b;
                    g = Gk();
                    try {
                        e = "google-ad-content-" + (Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ +new Date).toString(36)), window[e] = p, p = 'var adContent = window.parent["' + e + '"];window.parent["' + e + '"] = null;document.write(adContent);', p = 6 == cg() ? "window.onload = function() {document.write(\\'<sc\\' + \\'ript type=\"text/javascript\">document.domain = \"" + document.domain + '";' + p + "<\\/scr\\' + \\'ipt>\\');document.close(); };" : 'document.domain = "' + document.domain + '";' +
                        p + "document.close();", a.src = 'javascript:\'<script type="text/javascript">' + p + "\x3c/script>'"
                    } catch (C) {
                        window[e] = null
                    } finally {
                        Hk(g)
                    }
                }
            } else {
                g = b;
                try {
                    f = a.contentWindow ? a.contentWindow.document : a.contentDocument, -1 != navigator.userAgent.indexOf("Firefox") && f.open("text/html", "replace"), f.write(g), f.close()
                } catch (C) {
                }
            }
        }, Ek = function (a) {
            if (!a)return a;
            var b = a.toLowerCase();
            return -1 < b.indexOf("<!doctype") || -1 < b.indexOf("<html") ? a : "<html>\n<head>\n<script>var inDapIF=true;\x3c/script>\n</head><body>" + a + "</body></html>\n"
        },
        Jk = function (a, b) {
            var c = (b || document).getElementById(a);
            if (c && c.style.height && c.style.width) {
                for (var c = [c.style.width, c.style.height], d = 0; d < c.length; ++d)if (2 < c[d].length && "px" == c[d].substring(c[d].length - 2))c[d] = parseInt(c[d], 10); else return null;
                return c
            }
            return null
        }, Gk = function () {
            var a = [], b = document.getElementsByTagName("base");
            if (b)for (var c = 0, d = b.length; c < d; ++c) {
                var e = b[c], f = e.getAttribute("target");
                f && (a.push({Ia: e, eb: f}), e.removeAttribute("target"))
            }
            return a
        }, Hk = function (a) {
            if (a)for (var b = 0,
                           c = a.length; b < c; ++b) {
                var d = a[b];
                d.Ia.setAttribute("target", d.eb)
            }
        };
    var Kk = function (a, b, c, d) {
        var e = S(c, "api_experiment");
        $b(qc(e)) || H(F(e.split(","), ac), ng);
        H(Yd(), function (a) {
            Yh(P(), a)
        });
        this.F = b;
        this.l = c;
        this.v = d;
        this.o = Math.floor(4503599627370496 * Math.random());
        this.Y = !1;
        this.j = a;
        K && ne(9) && (Oj = new wk)
    };
    Kk.prototype.w = function () {
        return "lean"
    };
    var Lk = function (a, b) {
        var c = window;
        !b || Vf(c) ? b = Math.floor(4503599627370496 * Math.random()) : a.Y = !0;
        a.o = Math.floor(b)
    };
    Kk.prototype.V = function () {
        return null
    };
    Kk.prototype.M = function () {
        return !1
    };
    Kk.prototype.W = function () {
    };
    var Mk = function (a, b, c, d) {
        var e = new nj;
        e.G = "json_html";
        e.o = a.D(a.j);
        e.l = c;
        e.v = d;
        e.j = b;
        return e
    };
    Kk.prototype.u = function (a) {
        a.w = this.o + "";
        a.m = Yd();
        a.D = this.Y
    };
    Kk.prototype.ga = function (a) {
        this.u(a);
        return Nk(this, this.j ? "sra" : "single", a).ga(a.j)
    };
    var Ok = function (a, b) {
        return b ? Ve(a, 8192) : Ve(a, 4096)
    }, Qk = function (a, b, c, d) {
        b = b.match(od);
        vk(nd(b[1], b[2], b[3], b[4], b[5], "nwids=" + encodeURIComponent(d)), b[6]).then(function (a) {
                var b;
                a = a.responseText;
                a = a.substring(a.indexOf("(") + 1, a.lastIndexOf(")")).replace(/\\x/g, "\\u00");
                var d = q.JSON.parse;
                try {
                    b = d(a)
                } catch (h) {
                    b = null
                }
                b && (Pk(b), c(b))
            }, function (a) {
                var b = new uj("gpt_post_error", M["#23#"]);
                a.name && R(b, "name", a.name);
                a.status && R(b, "status", a.status);
                a.message && R(b, "message", a.message);
                vj(b, this.F);
                wj(b)
            },
            a)
    }, Pk = function (a) {
        t(a) ? H(a, Pk) : J(a, function (a) {
            a._cookies_ && delete a._cookies_
        })
    }, Rk = function (a, b, c, d) {
        var e = d || !1;
        H(b, function (a) {
            var b = Mk(this, [a], 1, c);
            this.u(b);
            b.o = this.D(!1);
            b = Ok(Nk(this, "single", b).ga([a]), e);
            a.fetchStarted(b)
        }, a)
    }, Sk = function (a, b, c) {
        fj(a.F, b) && (c && a.M([b]), c = b.getCollapseEmptyDiv(), null == c && (c = "true" === S(a.l, "google_collapse_empty_div")), c && Ak(b.getSlotElementId(), !1))
    }, Tk = function (a, b, c) {
        if (a.j && !t(b))return a = new Dg("sra_legacy_ad_response"), Hg(a), Gg(a), [];
        t(b) || (b = [b]);
        for (var d = [], e = 0; e < c.length; ++e) {
            var f = c[e], g = b[e][f.getAdUnitPath()];
            if (g) {
                var h = a, l = f;
                l.o = g;
                l.fetchEnded();
                null != g._cookies_ && rj(h.v, g);
                g._persistent_for_stream_ && (h.F.I[N(l)] = null);
                d.push(f)
            }
        }
        return d
    }, Uk = function () {
        q.googletag._getcook_ = 1
    };
    var Vk = function (a, b, c, d, e) {
        yj.call(this, a, b, c, d, e)
    };
    z(Vk, yj);
    Vk.prototype.B = function () {
        yj.prototype.B.call(this);
        U(this, "m_ast", "js");
        U(this, "markup", "html");
        U(this, "js", "afmc")
    };
    var Wk = function (a, b, c, d) {
        Kk.call(this, a, b, c, d);
        this.T = this.G = this.I = this.A = !1;
        this.K = this.L = "";
        this.videoStreamCorrelator = NaN;
        this.J = 0
    };
    z(Wk, Kk);
    Wk.prototype.w = function () {
        return "unknown"
    };
    Wk.prototype.u = function (a) {
        Wk.sa.u.call(this, a);
        a.A = this.T;
        a.B = this.K;
        a.C = this.L;
        a.u = this.J
    };
    var Xk = function (a) {
        var b = ej(a.F);
        if (0 < b.length) {
            for (var c = {}, d = [], e = 0; e < b.length; ++e)c[b[e][0]] = !0;
            J(c, function (a, b) {
                d.push(b)
            });
            b = new uj("gpt_missing_cb", M["#10#"]);
            R(b, "pending", d.join());
            R(b, "correlator", a.o.toString());
            R(b, "impl", a.w());
            vj(b, a.F);
            wj(b)
        }
    }, Yk = function (a) {
        return uc(bj(a.F), function (a, c) {
            return c.za ? a + 1 : a
        })
    };
    Wk.prototype.fa = function () {
        Xk(this)
    };
    Wk.prototype.ka = function () {
        var a = new uj("gpt_req_disp_mismatch", M["#23#"]);
        R(a, "dslots", Yk(this).toString());
        R(a, "impl", this.D(this.j));
        R(a, "sra", this.j ? "1" : "0");
        R(a, "correlator", this.o.toString());
        vj(a, this.F);
        wj(a)
    };
    var Zk = function (a) {
        var b = new uj("gpt_fluid_not_sf", M["#23#"]);
        R(b, "impl", a.w());
        vj(b, a.F);
        wj(b)
    }, Nk = function (a, b, c) {
        switch (S(a.l, "target_platform")) {
            case "MOBILE":
                return new Vk(b, a.F, a.l, a.v, c);
            default:
                return new Mj(b, a.F, a.l, a.v, c)
        }
    }, $k = function (a, b, c) {
        a.J && b && (a = a.F.j[c], c = "", a && (c = a.getContentUrl()), rf().registerAdBlock(c, 3, "json_html", b, void 0, void 0, y(a.Na, a)))
    };
    var Dk = "3rd party ad content";
    A("setAdIframeTitle", function (a) {
        Dk = a
    });
    var V = function (a, b, c, d) {
        Wk.call(this, a, b, c, d);
        this.m = [];
        this.B = {};
        this.C = 0;
        this.aa = {};
        this.ba = this.X = NaN;
        this.H = !1;
        this.O = NaN;
        this.$ = !1;
        this.ca = mg(tg, "experiment")
    };
    z(V, Wk);
    V.prototype.w = function () {
        return this.j ? "gut_friendly_iframe_sra" : "gut_friendly_iframe"
    };
    V.prototype.D = function (a) {
        return a ? "fifs" : "fif"
    };
    V.prototype.u = function (a) {
        V.sa.u.call(this, a);
        a.persistentRoadblocksOnly = this.$;
        a.videoPodNumber = this.X;
        a.videoPodPosition = this.ba;
        a.videoStreamCorrelator = this.videoStreamCorrelator
    };
    var dl = function (a, b, c) {
        var d = b.j, e = a.ga(b);
        if (q.JSON && q.JSON.parse && (!K || ne(10)) && (!be || ne(12)) && 4096 < e.length) {
            if (al(a, e, d), c = d[c], a.v && 1 != q.googletag._getcook_) {
                e = a.v;
                if (1 == e.j || !e.l && !e.o)e = null; else {
                    var f = bg(!!a.F.B) + "/gampad/cookie.js?", f = f + ("domain=" + encodeURIComponent(document.domain)), f = f + "&callback=window.parent.googletag.impl.pubads.setCookieInfo" + ("&iu=" + c.ka);
                    e.l && (f += "&cookie=" + encodeURIComponent(e.l));
                    e.o && (f += "&cookie_enabled=1");
                    e = f
                }
                e && (e = '<script src = "' + $f(e) + '">\x3c/script>', bl(c,
                    e))
            }
        } else cl(a, e, d, c);
        b.H = !0;
        c = P();
        hi(c, "request_refresh_type", a.C + "_" + b.l, d[0].l);
        Uk();
        a.j || (a.aa[N(d[0])] = window.setTimeout(y(a.da, a), M["#13#"]))
    }, el = function (a, b, c) {
        var d = "";
        c && (d = d + '<script type="text/javascript">function callbackProxy(adContents) { ' + ("window.parent.googletag.impl.pubads.setAdContentsBySlotForAsync(adContents, " + a + ");}") + "\x3c/script>");
        return d + ('<script src = "' + b + '">\x3c/script>')
    }, cl = function (a, b, c, d) {
        b = Ok(b, !1);
        var e = $f(b);
        a.j ? Rk(a, c, "callbackProxy") : c[0].fetchStarted(e);
        fl(a, c, d);
        b = ++a.C;
        a.B[b] = c;
        a = el(b, e, a.j || fj(a.F, c[0]));
        var f = F(c, function (a) {
            return a.getDefinedId()
        }), e = {request_length: e.length, slot_defined_id_in_request: f.join("-")};
        li(P(), b, c[0].l, e);
        if (null == document.getElementById(c[d].getSlotElementId()) && (d = wc(c, function (a) {
                return null != document.getElementById(a.getSlotElementId())
            }), -1 == d))return;
        bl(c[d], a)
    }, al = function (a, b, c) {
        b = Ok(b, !0);
        var d = $f(b);
        a.j ? Rk(a, c, "callbackProxy", !0) : c[0].fetchStarted(d);
        var e = ++a.C;
        a.B[e] = c;
        d = y(function (a) {
            (this.j || fj(this.F,
                c[0])) && gl(this, a, e)
        }, a);
        Qk(a, b, d, hj(a.F, c).join(","));
        a = F(c, function (a) {
            return a.getDefinedId()
        });
        a = {request_length: b.length, slot_defined_id_in_request: a.join("-")};
        li(P(), e, c[0].l, a)
    }, bl = function (a, b) {
        var c = document, d = Q(a) + "__hidden__", e = c.getElementById(d);
        if (!e) {
            e = a.getSlotElementId();
            e = c.getElementById(e);
            if (null == e)return;
            e = Bk(e, d, "", !0, [0, 0], c)
        }
        Ik(e, b, !1)
    }, hl = function (a) {
        return Q(a) + "__container__"
    }, kl = function (a, b) {
        var c = document;
        if (fj(a.F, b)) {
            var d = b.getSlotElementId(), e = c.getElementById(d);
            if (e) {
                for (var d = hl(b), f = Q(b) + "__hidden__", e = e.childNodes, g = !1, h = 0; h < e.length; ++h)if (1 == e[h].nodeType) {
                    var l = e[h];
                    if (l.id != d && l.id != f) {
                        g = !0;
                        break
                    }
                }
                (g = g || il(c, b)) && jl(b)
            }
        }
    }, il = function (a, b) {
        var c = a.getElementById(hl(b));
        return !!c && vc(Ge(c), function (a) {
                return a.id != Q(b)
            })
    };
    V.prototype.W = function (a, b) {
        var c = Jc(a, function (a) {
            return 0 != Hi(a).length
        });
        c[!1] && H(c[!1], function (a) {
            Sk(this, a, !0)
        }, this);
        if (a = c[!0]) {
            r(b.videoStreamCorrelator) ? this.videoStreamCorrelator = b.videoStreamCorrelator : (c = !0, r(b.changeCorrelator) && (c = b.changeCorrelator), c && Lk(this));
            this.X = b.videoPodNumber || NaN;
            this.ba = b.videoPodPosition || NaN;
            this.$ = b.persistentRoadblocksOnly || !1;
            this.H = b.clearUnfilledSlots || !1;
            dj(this.F, a);
            this.O = a.length;
            for (c = 0; c < a.length; ++c)kl(this, a[c]);
            if (!this.A) {
                var d = y(function (a) {
                    return Mk(this,
                        a, b.isVideoRefresh ? 3 : 2, "callbackProxy")
                }, this);
                if (this.j)ll(this, d(a), 0); else for (c = 0; c < a.length; ++c)ll(this, d([a[c]]), 0)
            }
        }
    };
    V.prototype.M = function (a) {
        for (var b = 0; b < a.length; ++b)jl(a[b]), ml(this, a[b]), Ni(a[b]);
        return !0
    };
    var jl = function (a) {
        var b = !!a.v;
        nl(a);
        var c = a.getSlotElementId();
        if (b) {
            var d = document.getElementById(c);
            if (d) {
                var e = hl(a) + "__to_be_removed__";
                a = Cc(d.childNodes);
                H(a, function (a) {
                    1 == a.nodeType && a.id == e || d.removeChild(a)
                })
            }
        } else zk(c)
    }, ol = function (a, b) {
        var c = document, d = Hi(b);
        if (0 != d.length) {
            var e = d[0];
            1 < d.length && (e = Jk(b.getSlotElementId(), c) || e);
            var d = Q(b), f = c.getElementById(d);
            if (!f) {
                f = b.getSlotElementId();
                f = c.getElementById(f);
                if (null == f)return;
                var g = c.createElement("div");
                g.id = hl(b);
                g.name = g.id;
                g.style.border =
                    "0pt none";
                a.F.l && (g.style.margin = "auto", g.style.textAlign = "center");
                f.appendChild(g);
                f = Bk(g, d, Dk, !1, e, c);
                zd(f, "load", function () {
                    b.Zr = b.j.info(Zr(b.getAdUnitPath()), null, b);
                    b.C && ni(P(), b.B, b.l)
                })
            }
            jj(a.F, b, f)
        }
    }, gl = function (a, b, c) {
        var d = a.B[c];
        b = Tk(a, b, d);
        var e = P();
        bi(e, "ad_fetch_period", c, b[0].l);
        delete a.B[c];
        H(b, a.U, a);
        a.j || c != a.C || (window.clearTimeout(a.aa[N(d[0])]), pl(a))
    };
    V.prototype.da = function () {
        var a = new uj("gpt_request_timeout", M["#23#"]);
        vj(a, this.F);
        wj(a);
        pl(this)
    };
    var pl = function (a) {
        0 < a.m.length && (a.m.shift(), 0 < a.m.length && dl(a, a.m[0], 0))
    }, ql = function (a, b) {
        ol(a, b);
        null != b.o && a.U(b)
    }, ll = function (a, b, c) {
        for (var d = 0; d < b.j.length; d++)ol(a, b.j[d]);
        a.j ? dl(a, b, c) : (a.m.push(b), 1 == a.m.length ? dl(a, b, c) : (b = tc(a.m, function (a) {
            return !a.H
        }), 1 < b.length && (c = new uj("gpt_request_queue_length", M["#23#"]), R(c, "len", "" + b.length), vj(c, a.F), wj(c))))
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
        ml(this, a);
        var b = null, c = -1;
        if (this.j) {
            ql(this, a);
            b = cj(this.F);
            if (0 == b.length)return;
            c = Jc(b, function (a) {
                return 0 != Hi(a).length
            });
            c[!1] && H(c[!1], function (a) {
                Sk(this, a, !0)
            }, this);
            b = c[!0];
            if (!b)return;
            c = a.A || !yc(b, a) ? 0 : wc(b, function (b) {
                return N(a) == N(b)
            })
        } else {
            if (0 == Hi(a).length) {
                Sk(this, a, !0);
                return
            }
            b = [a];
            c = 0
        }
        this.A || this.I || (b = Mk(this, b, 1, "callbackProxy"), ll(this, b, c))
    };
    var ml = function (a, b) {
        var c = b.getDivStartsCollapsed();
        null == c && (c = "true" === S(a.l, "google_divs_start_collapsed"));
        c && Ak(b.getSlotElementId(), !1)
    };
    V.prototype.U = function (a) {
        try {
            rl(this, a)
        } catch (b) {
        }
    };
    var rl = function (a, b) {
        var c = document, d = b.o, e = {is_backfill_at_render: Pi(b), slot_defined_id_at_render: b.getDefinedId()};
        mi(P(), Ji(b), b.l, e);
        b.renderStarted();
        if (null == d || d._empty_)Sk(a, b, a.H), d = Li(b), d.slotContentChanged = a.H, b.renderEnded(d); else if (a.G)b.renderEnded(Li(b)); else {
            e = d._html_;
            if (!v(e)) {
                nl(b);
                return
            }
            Ak(b.getSlotElementId(), !0);
            sl(a, b);
            var f;
            "height" == d._fluid_ ? f = "fluid" : f = [d._width_, d._height_];
            d._use_safe_frame_ ? tl(a, c, b, f, e, function () {
                ni(P(), b.B, b.l)
            }, {sandbox: d._use_sandbox_ || !1}) : ul(a,
                c, b, f, e);
            b.renderEnded(Ki(b, d))
        }
        d = Q(b) + "__hidden__";
        Ck(c, d)
    }, nl = function (a) {
        var b = document.getElementById(hl(a)), c = a.v;
        if (b) {
            var d = document.getElementById(Q(a)), e = rf();
            e.unloadAdBlock && e.unloadAdBlock(d, !!a.v);
            a.v ? (b.style.display = "none", b.id += "__to_be_removed__", d.id = d.id + "__to_be_removed__", window.setTimeout(function () {
                c && Bh(c);
                b.parentNode && b.parentNode.removeChild(b)
            }, M["#24#"])) : b.parentNode.removeChild(b)
        } else c && Bh(c);
        a.v = null
    }, sl = function (a, b) {
        if (b.v || a.ca)nl(b), ol(a, b); else {
            var c = document.getElementById(Q(b)),
                d = rf();
            d.unloadAdBlock && d.unloadAdBlock(c, !!b.v)
        }
    }, ul = function (a, b, c, d, e) {
        b = b.getElementById(Q(c));
        null != b && (v(d) ? Zk(a) : (b.width = String(d[0]), b.height = String(d[1])), Ik(b, e, !0), $k(a, b, N(c)))
    }, tl = function (a, b, c, d, e, f, g) {
        var h = b.getElementById(hl(c));
        if (null != h) {
            for (var l; l = h.firstChild;)h.removeChild(l);
            a.F.l || (h.style.display = "inline-block");
            g = Eh([g, a.F.H, c.L]);
            d = Fk(h, Q(c), e, d, f, g, Pi(c) || !1);
            c.v = d;
            $k(a, b.getElementById(Q(c)), N(c))
        }
    };
    V.prototype.V = function () {
        return isNaN(this.O) || this.j ? 0 == cj(this.F).length : cj(this.F).length == gj(this.F) - this.O
    };
    var fl = function (a, b, c) {
        null == document.getElementById(b[c].getSlotElementId()) && vl(a);
        a.j && (vc(b, function (a) {
            return null != document.getElementById(a.getSlotElementId())
        }) || wl(a))
    }, vl = function (a) {
        var b = new uj("gpt_target_slot_has_no_div", M["#29#"]);
        R(b, "sra", a.j ? "1" : "0");
        vj(b, a.F);
        wj(b)
    }, wl = function (a) {
        var b = new uj("gpt_request_slots_have_no_divs", M["#29#"]);
        vj(b, a.F);
        wj(b)
    };
    var xl = function (a, b, c, d) {
        Wk.call(this, a, b, c, d);
        this.C = 0;
        this.m = this.B = null
    };
    z(xl, Wk);
    xl.prototype.w = function () {
        return this.j ? "gut_sync_sra" : "gut_sync"
    };
    xl.prototype.D = function (a) {
        return a ? "ss" : "s"
    };
    var yl = function (a, b) {
        if (!a.A) {
            a.B = b.j;
            var c = a.ga(b), c = $f(Ok(c, !1)), d = ++a.C, e = F(b.j, function (a) {
                return a.getDefinedId()
            }), e = {request_length: c.length, request_refresh_type: b.l, slot_defined_id_in_request: e.join("-")};
            li(P(), d, b.j[0].l, e);
            a.j ? Rk(a, b.j, "googletag.impl.pubads.setAdContentsBySlotForSync") : b.j[0].fetchStarted(c);
            Uk();
            document.write('<script type="text/javascript" src="' + c + '">\x3c/script>')
        }
    }, Al = function (a, b) {
        var c = Tk(a, b, a.B);
        a.B = null;
        var d = P();
        bi(d, "ad_fetch_period", a.C, c[0].l);
        zl(a, a.m)
    };
    xl.prototype.R = function (a) {
        if (!this.j) {
            var b;
            b = null;
            var c = Qe.getElementsByTagName("script");
            c && c.length && (b = c[c.length - 1]);
            (b = b && b.parentElement) && (this.F.D[N(a)] = b)
        }
    };
    xl.prototype.Z = function (a) {
        var b = "google_temp_div_" + N(a), c = '<div id="' + ic(b) + '"></div>';
        document.write(c);
        (b = ye(b)) && jj(this.F, a, b)
    };
    xl.prototype.P = function (a) {
        var b = this.F;
        a = N(a);
        var c = b.A[a];
        c && (c && c.parentNode && c.parentNode.removeChild(c), delete b.A[a])
    };
    xl.prototype.N = function (a) {
        var b = null == this.m;
        this.m = a;
        this.j ? b ? (b = tc(bj(this.F), function (a) {
            return 0 != Hi(a).length
        }), yc(b, a) || Sk(this, a, !1), b.length && yl(this, Mk(this, b, 1, "googletag.impl.pubads.setAdContentsBySlotForSync"))) : zl(this, a) : 0 == Hi(a).length ? Sk(this, a, !1) : yl(this, Mk(this, [a], 1, a.l ? "googletag.impl.pubads.setPassbackAdContents" : "googletag.impl.pubads.setAdContentsBySlotForSync"))
    };
    var zl = function (a, b) {
        var c = document, d = b.o, e = {slot_defined_id_at_render: b.getDefinedId(), is_backfill_at_render: Pi(b)};
        mi(P(), Ji(b), b.l, e);
        if (null == d || d._empty_)Sk(a, b, !1), b.renderEnded(Li(b)); else if (a.G)b.renderEnded(Li(b)); else if (d._use_safe_frame_) {
            var e = function () {
                ni(P(), b.B, b.l)
            }, f = d._html_;
            if (f) {
                var g;
                "height" == d._fluid_ ? g = "fluid" : g = [d._width_, d._height_];
                Bl(a, c, b, g, f, e, {sandbox: d._use_sandbox_ || !1});
                b.renderEnded(Ki(b, d))
            } else b.renderEnded(Li(b))
        } else if (d._snippet_ && !d._is_afc_)Cl(a, b, c);
        else if (dg()) {
            c = "googletag.impl.pubads.syncAdSlotLoaded(this, '" + N(b) + "'," + b.l + ");";
            e = "about:blank";
            if (g = S(a.l, "google_domain_reset_url"))if (f = pd(g.match(od)[3] || null), null === f || 0 <= f.indexOf(document.domain))e = g;
            if ("height" == d._fluid_) {
                Zk(a);
                return
            }
            g = [d._width_, d._height_];
            Dl(a, b, e, c, g, a.F.l)
        } else d = El(a, b, c), c.write("<script>googletag.impl.pubads.createDomIframe(" + pc(d) + " ," + pc(N(b)) + "," + a.F.l + "," + b.l + ");\x3c/script>");
        b.renderStarted()
    }, Bl = function (a, b, c, d, e, f, g) {
        Fl(c, b);
        var h = Q(c) + "__container__",
            l = '<div id="' + ic(h) + '"></div>';
        b.write(l);
        h = b.getElementById(h);
        null != h && (a.F.l ? h.style.margin = "auto" : h.style.display = "inline-block", g = Eh([g, a.F.H, c.L]), d = Fk(h, Q(c), e, d, f, g, Pi(c) || !1), c.v = d, $k(a, b.getElementById(Q(c)), N(c)))
    }, Gl = function (a, b) {
        var c = b.o, d = a.parentNode, e = c && c._html_;
        e ? (!c._expandable_ || c._is_afc_ && c._is_3pas_ ? (zd(a, "load", function () {
            b.C && ni(P(), b.B, b.l)
        }), Ik(a, e, !0)) : d.innerHTML = e, b.renderEnded(Ki(b, c))) : (d.removeChild(a), b.renderEnded(Li(b)))
    }, Hl = function (a, b, c, d) {
        b = b.getSlotElementId() +
            "_ad_container";
        var e = '<div id="' + ic(b) + '"';
        d && "height" == d._fluid_ ? e += ' style="width:100%;">' : a.F.l && d ? (e += ' style="width:' + d._width_, e += 'px;margin:auto;">') : e += ">";
        d && (e += d._html_);
        c.write(e + "\n</div>\n");
        return b
    }, Fl = function (a, b) {
        var c = b.getElementById(a.getSlotElementId());
        c && c.parentNode && "" === c.innerHTML && c.parentNode.removeChild(c)
    }, Cl = function (a, b, c) {
        Fl(b, c);
        var d = b.o;
        if (null != d) {
            var e = Hl(a, b, c, d);
            b.renderEnded(Ki(b, d));
            (c = c.getElementById(e)) && $k(a, c, N(b))
        }
    }, Dl = function (a, b, c, d, e, f) {
        Fl(b,
            document);
        var g = Q(b), h = [], l = 0, n = 0;
        t(e) ? (l = e[0], n = e[1]) : Zk(a);
        c = $f(c);
        h.push('<iframe id="', ic(g), '" title="', Dk, '" name="', ic(g), '" width="', l, '" height="', n, '" vspace="0" hspace="0" allowtransparency="true" ', "scrolling=", a.H ? '"auto"' : '"no"', ' marginwidth="0" marginheight="0" frameborder="0" style=', '"border:0px;left:0;position:absolute;top:0;"', ' src="', c, '"');
        null != d && h.push(' onload="', d, '"');
        h.push("></iframe>");
        d = [];
        c = b.getSlotElementId() + "_ad_container";
        d.push('<div id="', ic(c), '"');
        f && d.push(' style="text-align:center" ');
        d.push(">");
        d.push('<ins style="position:relative;width:' + l + "px;height:" + n + 'px;border:none;display:inline-table;vertical-align:bottom;">' + ('<ins style="position:relative;width:' + l + "px;height:" + n + 'px;border:none;display:block;">' + h.join("") + "</ins>") + "</ins>");
        d.push("</div>");
        document.write(d.join(""));
        (f = document.getElementById(g)) && $k(a, f, N(b))
    }, El = function (a, b, c) {
        Fl(b, c || document);
        return Hl(a, b, c || document)
    }, Il = function (a, b, c, d, e, f, g) {
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
    }, Jl = function (a, b, c, d, e, f) {
        e = Il(a, "ins", e, c, d, "block");
        d = Il(a, "ins", e, c, d, "inline-table");
        d.style.verticalAlign = "bottom";
        b = a.getElementById(b);
        f ? (a = Il(a, "div", d, c, null, "block", "auto"), b.appendChild(a)) : b.appendChild(d)
    }, Kl = function (a, b, c) {
        var d = document, e = b.o, f = e._width_, g = e._height_, h = e._html_, l = d.createElement("iframe"), n = Q(b);
        l.id = n;
        l.title = Dk;
        l.name = n;
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
        zd(l, "load", function () {
            b.C && ni(P(), b.B, b.l)
        });
        Jl(d, a, f, g, l, c);
        l.contentWindow.document.write(h);
        l.contentWindow.document.write("<script>document.close();\x3c/script>");
        b.renderEnded(Ki(b, e))
    };
    var Ll = function () {
        this.m = this.j = this.l = null
    }, W = function (a) {
        null == a.l && (a.l = new $i(Qi));
        return a.l
    }, X = function (a) {
        if (null != a.j)return a.j;
        var b = S(Ml(a), "google_ad_impl"), c = P();
        switch (b) {
            case "gut_sync_sra":
                gi(c, !0);
                a.j = new xl(!0, W(a), Ml(a), tj(void 0));
                Yh(c, "sync");
                break;
            case "gut_friendly_iframe":
                gi(c, !1);
                a.j = new V(!1, W(a), Ml(a), tj(void 0));
                Yh(c, "fif");
                break;
            case "gut_friendly_iframe_sra":
                gi(c, !0);
                a.j = new V(!0, W(a), Ml(a), tj(void 0));
                Yh(c, "fif");
                break;
            default:
                gi(c, !1), a.j = new xl(!1, W(a), Ml(a), tj(void 0)),
                    Yh(c, "sync")
        }
        b = a.j;
        b.A = null != S(b.l, "google_nofetch") || !!window.google_noFetch || b.A;
        b.I = null != S(b.l, "google_disable_initial_load") || !!window.google_DisableInitialLoad || b.I;
        b.G = null != S(b.l, "google_norender") || b.G;
        var c = y(b.fa, b), d = window;
        d.attachEvent ? d.attachEvent("onload", c) : d.addEventListener && d.addEventListener("load", c, !1);
        c = y(b.ka, b);
        d = window;
        d.attachEvent ? d.attachEvent("onunload", c) : d.addEventListener && d.addEventListener("unload", c, !1);
        b.J = rf().setupOse(b.o);
        return a.j
    }, Ml = function (a) {
        null ==
        a.m && (a.m = new xj);
        return a.m
    }, Nl = null, Y = function () {
        Nl || (Nl = new Ll);
        return Nl
    }, Ol = null, Pl = function () {
        Ol || (Ol = new Ll);
        return Ol
    };
    var Ql = function () {
    };
    k = Ql.prototype;
    k.addSlot = function (a) {
        if (!a)return null;
        var b = a.getAdUnitPath();
        return b && b.length ? aj(W(Y()), a) : null
    };
    k.fillSlot = function (a) {
        var b = Y(), c = X(b), b = W(b);
        a && b.j[N(a)] && (null == a.o || c.j) && (c.R(a), c.Z(a), c.N(a), c.P(a))
    };
    k.setCookieOptions = function (a) {
        Y();
        var b = tj(a);
        b.j = a;
        pj(b)
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
            b && b.length && (b = Pl(), aj(W(b), a), X(b).N(a))
        }
    };
    k.disableInitialLoad = function () {
        window.google_DisableInitialLoad = !0
    };
    k.addAttribute = function (a, b) {
        var c = W(Y()), d = b;
        if (!$b(qc(a))) {
            $b(qc(d)) && (d = "");
            var e = c.m[a];
            c.m[a] = e ? e + "," + d : d
        }
    };
    k.clearAttribute = function (a) {
        var b = W(Y());
        $b(qc(a)) || b.m[a] && delete b.m[a]
    };
    k.addPageCategoryExclusion = function (a) {
        var b = W(Y());
        $b(qc(a)) || zc(b.C, a)
    };
    k.clearPageCategoryExclusions = function () {
        W(Y()).C = []
    };
    k.addAdSensePageAttribute = function (a, b) {
        var c = W(Y());
        Ui(c.o, a, b)
    };
    k.addAdSenseSlotAttribute = function (a, b, c) {
        var d = W(Y());
        a && d.j[N(a)] && (a = N(a), null == d.u[a] && (d.u[a] = new Ti(d.M)), Ui(d.u[a], b, c))
    };
    k.enableSingleRequest = function () {
        var a = Ml(Y());
        null == S(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_sync_sra")
    };
    k.collapseEmptyDivs = function (a) {
        var b = Ml(Y());
        b.j.google_collapse_empty_div = "true";
        a && (b.j.google_divs_start_collapsed = "true")
    };
    k.enableAsyncRendering = function () {
        var a = Ml(Y());
        null == S(a, "google_ad_impl") && (a.j.google_ad_impl = "gut_friendly_iframe")
    };
    k.enableAsyncSingleRequest = function () {
        var a = Ml(Y());
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
        var c = Y(), d = X(c), c = W(c), c = null != a ? Rl(a) : bj(c);
        0 == c.length || d.W(c, b)
    };
    k.destroySlots = function (a) {
        var b = W(Y());
        this.clearSlotContents(a);
        for (var c = 0; c < a.length; ++c)if (b.j[N(a[c])]) {
            var d = a[c].getAdUnitPath();
            Qc(b.j, N(a[c]));
            Qc(b.w[d], a[c].getInstance());
            Pc(b.w[d]) && Qc(b.w, d)
        }
    };
    k.getCorrelator = function () {
        return X(Y()).o + ""
    };
    k.setCorrelator = function (a) {
        Lk(X(Y()), a)
    };
    k.setMobilePlatform = function () {
        Ml(Y()).j.target_platform = "MOBILE"
    };
    k.setApiExperiment = function (a) {
        ng(a)
    };
    k.isAdRequestFinished = function () {
        return X(Y()).V()
    };
    k.isSlotAPersistentRoadblock = function (a) {
        return a ? !fj(W(Y()), a) : !1
    };
    k.clearNoRefreshState = function () {
        W(Y()).I = {}
    };
    k.clearSlotContents = function (a) {
        var b = Y(), c = X(b), b = W(b);
        a = a ? Rl(a) : bj(b);
        return c.M(a)
    };
    var Sl = function (a) {
        W(Y()).G = a
    }, Tl = function (a) {
        W(Y()).H = a
    };
    Ql.prototype.setLocation = function (a) {
        W(Y()).B = a
    };
    Ql.prototype.setPublisherProvidedId = function (a) {
        W(Y()).L = a
    };
    Ql.prototype.getVersion = function () {
        return "90"
    };
    Ql.prototype.setCenterAds = function (a) {
        W(Y()).l = a
    };
    var Rl = function (a) {
        var b = W(Y());
        return tc(a, function (a) {
            return !!b.j[N(a)]
        })
    }, Ul = null, Vl = function (a, b) {
        var c;
        c = q.googletag || (q.googletag = {});
        c = c.impl || (c.impl = {});
        c = c.pubads || (c.pubads = {});
        c[a] || (c[a] = b)
    };
    Vl("createDomIframe", function (a, b, c, d) {
        try {
            var e;
            e = d ? Pl() : Y();
            var f = X(e), g;
            if (g = W(e).j[b]) {
                Kl(a, g, c);
                var h = document.getElementById(Q(g));
                h && $k(f, h, b)
            }
        } catch (l) {
            O(2401, l)
        }
    });
    Vl("setAdContentsBySlotForSync", function (a) {
        try {
            Al(X(Y()), a)
        } catch (b) {
            O(2403, b)
        }
    });
    Vl("setPassbackAdContents", function (a) {
        try {
            Al(X(Pl()), a)
        } catch (b) {
            O(2404, b)
        }
    });
    Vl("setAdContentsBySlotForAsync", function (a, b) {
        try {
            gl(X(Y()), a, b)
        } catch (c) {
            O(2405, c)
        }
    });
    Vl("syncAdSlotLoaded", function (a, b, c) {
        try {
            var d = X(c ? Pl() : Y());
            if (b) {
                var e = d.F.j[b];
                e && !e.N && (e.N = !0, Gl(a, e))
            }
        } catch (f) {
            O(2407, f)
        }
    });
    Vl("setCookieInfo", function (a) {
        try {
            var b;
            Y();
            b = tj(void 0);
            rj(b, a)
        } catch (c) {
            O(2408, c)
        }
    });
    var Wl = null, Xl = ee || fe && !Ef || be || "function" == typeof q.btoa;
    var Yl = {
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
    var Zl = xg("#36#");
    var am = function (a, b, c) {
        var d = $l++;
        this.j = new Fi(a, d, b);
        this.j.l = !0;
        this.j.addService(c);
        this.l = c
    }, $l = 1;
    k = am.prototype;
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
            if (!a || v(a) || "number" == typeof a)return ta().error(G("PassbackSlot.updateTargetingFromMap", [a])), this;
            try {
                return J(a, function (a, b) {
                    this.setTargeting(b, a)
                }, this), this
            } catch (c) {
                return this.j.w = Rc(b), ta().error(G("PassbackSlot.updateTargetingFromMap", [a])), this
            }
        } catch (c) {
            O(1208, c)
        }
    };
    k.setAudExtId = function (a) {
        try {
            return ug(a) && (this.j.Y = a), this
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
            bm(this.l, this.j)
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
            c.l && (c.wa = "" + b)
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
    k.la = function (a) {
        this.j.la(a)
    };
    var cm = function (a, b) {
        this.j = a;
        this.l = b || {changeCorrelator: !0}
    }, Z = function () {
        Kh.call(this);
        this.A = !1;
        this.j = null;
        this.T = 0;
        this.K = -1;
        this.W = 0;
        this.J = {};
        this.u = {};
        this.N = [];
        this.Y = this.M = "";
        this.v = this.U = this.X = this.aa = !1;
        this.m = Zl ? !1 : !0;
        this.R = Zl;
        this.O = this.H = !1;
        this.o = [];
        this.I = [];
        this.C = [];
        this.ca = {};
        this.P = !1;
        this.D = -1;
        this.da = this.fa = "";
        this.w = [];
        this.L = this.V = !1;
        this.Z = {};
        null !== rd(window.location.href, "google_force_sra") && this.w.push("108809056");
        var a = xg("#53#");
        a && this.forceExperiment(a);
        a =
            jd(["108809055", "108809056", "108809057"], 3 * xg("#47#"));
        $b(qc(a)) || this.forceExperiment(a);
        yc(this.w, "108809056") && (this.v = !0)
    };
    z(Z, Kh);
    k = Z.prototype;
    k.set = function (a, b) {
        try {
            if (!(v(a) && 0 < a.length))return this.log.j(G("PubAdsService.set", [a, b]), this, null), this;
            this.J[a] = b;
            this.log.info(Wa(a, String(b), this.getName()), this, null);
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
            J(this.J, function (b, c) {
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
            var e = c ? dm(a, b, c) : dm(a, b);
            e.addService(this);
            d && e.setClickUrl(d);
            em(e.getSlotId().getDomId())
        } catch (f) {
            O(24, f)
        }
    };
    k.oa = function () {
        this.A || (ji(), 0 < this.o.length ? fm(this) : Vj(this.pa, this));
        this.A = !0
    };
    k.pa = function () {
        this.A || ji();
        this.A = !0;
        this.j || fm(this)
    };
    k.getName = function () {
        return "publisher_ads"
    };
    var fm = function (a) {
        if (!a.j)try {
            ki();
            window.google_noFetch = !1;
            window.google_DisableInitialLoad = !1;
            a.j = Ul || (Ul = new Ql);
            a.log.info(gb("GPT"), a);
            a.j.setCookieOptions(a.T);
            a.j.setTagForChildDirectedTreatment(a.K);
            a.j.setKidsFriendlyAds(a.W);
            H(a.w, function (a) {
                this.j.setApiExperiment(a)
            }, a);
            a.j.setCenterAds(a.R);
            Zl && (a.v = !1, a.j.setMobilePlatform());
            a.H && a.j.collapseEmptyDivs(a.O);
            gm(a);
            if (0 < a.o.length)for (var b = 0; b < a.o.length; ++b)a.G(a.o[b]);
            if (0 < a.I.length)for (b = 0; b < a.I.length; ++b)bm(a, a.I[b]);
            a.V && (W(Y()).v = !0);
            Sl(a.L);
            Tl(a.Z);
            A("pubadsReady", !0)
        } catch (c) {
            Kg(3001, c)
        }
    };
    Z.prototype.ra = function (a) {
        this.m || (a.R = !1);
        Kh.prototype.ra.call(this, a)
    };
    Z.prototype.G = function (a) {
        if (si().m && !this.m)this.log.error(jb(), this); else if (this.A && this.pa(), this.j) {
            if (hm(this), im(this, a))if (this.log.info(ib()), this.j.fillSlot(a), this.ca[a.getAdUnitPath()] = !0, this.j)for (a = 0; a < this.C.length; a++) {
                var b = this.C[a];
                b.j[0].getAdUnitPath() in this.ca && (this.refresh(b.j, b.l), Array.prototype.splice.call(this.C, a, 1), a--)
            } else this.log.error(hb(), this)
        } else if (this.m || this.A && 0 == this.o.length) {
            for (var b = !1, c = 0; c < this.o.length; ++c)a === this.o[c] && (b = !0);
            b || (this.log.info(kb(a.getAdUnitPath(),
                "GPT"), this, a), this.o.push(a))
        } else this.log.error(mb(a.getAdUnitPath()), this, a)
    };
    var im = function (a, b) {
        if (a.j && null == a.j.addSlot(b))return a.log.error(Ub(b.getAdUnitPath()), a, b), !1;
        for (var c = b.getAttributeKeys(), d = 0; d < c.length; ++d)c[d] in Yl ? a.j.addAdSenseSlotAttribute(b, Yl[c[d]], String(b.get(c[d]))) : a.log.j(ob(String(c[d]), String(b.get(c[d])), b.getAdUnitPath()), a, b);
        return !0
    }, gm = function (a) {
        if (!a.X && a.j) {
            a = DFPCheckParameters(a);
            a.X = !0;
            if (a.v) {
                a.m ? a.j.enableAsyncSingleRequest() : a.j.enableSingleRequest();
                hm(a);
                for (var b = a.getSlots(), c = 0; c < b.length; ++c)im(a, b[c])
            } else a.m && a.j.enableAsyncRendering();
            a.U &&
            a.j.disableInitialLoad();
            jm(a);
            km(a)
        }
    }, hm = function (a) {
        if (!a.aa) {
            a.aa = !0;
            for (var b = a.getAttributeKeys(), c = 0; c < b.length; ++c)b[c] in Yl ? a.j.addAdSensePageAttribute(Yl[b[c]], String(a.get(b[c]))) : a.log.j(nb(String(b[c]), String(a.get(b[c]))), a);
            a.j.addAdSensePageAttribute("google_tag_info", "v2");
            J(a.u, function (a, b) {
                if (t(a))for (var c = 0; c < a.length; ++c)this.j.addAttribute(b, a[c])
            }, a);
            H(a.N, function (a) {
                this.j.addPageCategoryExclusion(a)
            }, a);
            a.j.setPublisherProvidedId(a.Y);
            a.M && a.j.setLocation(a.M)
        }
    };
    k = Z.prototype;
    k.setCookieOptions = function (a) {
        try {
            if (!w(a) || !ug(a))return this.log.j(pb(String(a)), this), this;
            this.T = a;
            this.j && this.j.setCookieOptions(a);
            return this
        } catch (b) {
            O(17, b)
        }
    };
    k.setTagForChildDirectedTreatment = function (a) {
        try {
            if (0 !== a && 1 !== a)return this.log.j(Ob(String(a)), this), this;
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
            if (0 !== a && 1 !== a)return this.log.j(Tb(String(a)), this), this;
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
            v(b) ? c = [b] : t(b) ? c = b : ca(b) && (c = Cc(b));
            var d = c ? c.join() : String(b);
            if (!v(a) || $b(qc(a)) || !c)return this.log.j(G("PubAdsService.setTargeting", [a, b]), this), this;
            this.u[a] = c;
            this.log.info(Nb(a, d, this.getName()), this);
            if (this.j)for (this.j.clearAttribute(a), d = 0; d < c.length; ++d)this.j.addAttribute(a, c[d]);
            return this
        } catch (e) {
            O(1, e)
        }
    };
    k.clearTargeting = function (a) {
        try {
            if (!v(a) || $b(qc(a)))return this.log.j(G("PubAdsService.clearTargeting", [a]), this), this;
            if (!this.u[a])return this.log.j(Kb(a, this.getName()), this), this;
            delete this.u[a];
            this.log.info(Jb(a, this.getName()), this);
            this.j && this.j.clearAttribute(a);
            return this
        } catch (b) {
            O(2, b)
        }
    };
    k.getTargeting = function (a) {
        try {
            return v(a) ? Object.prototype.hasOwnProperty.call(this.u, a) ? Cc(this.u[a]) : [] : (this.log.j(G("PubAdsService.getTargeting", [a]), this), [])
        } catch (b) {
            O(38, b)
        }
    };
    k.getTargetingKeys = function () {
        try {
            var a = [];
            J(this.u, function (b, c) {
                a.push(c)
            });
            return a
        } catch (b) {
            O(39, b)
        }
    };
    k.setCategoryExclusion = function (a) {
        try {
            if (!v(a) || $b(qc(a)))return this.log.j(G("PubAdsService.setCategoryExclusion", [a]), this), this;
            zc(this.N, a);
            this.log.info(Lb(a), this);
            this.j && this.j.addPageCategoryExclusion(a);
            return this
        } catch (b) {
            O(3, b)
        }
    };
    k.clearCategoryExclusions = function () {
        try {
            return this.N = [], this.log.info(Mb(), this), this.j && this.j.clearPageCategoryExclusions(), this
        } catch (a) {
            O(4, a)
        }
    };
    k.disableInitialLoad = function () {
        try {
            this.j ? this.log.j(rb("disableInitialLoad", "pubads"), this) : this.U = !0
        } catch (a) {
            O(5, a)
        }
    };
    k.enableSingleRequest = function () {
        try {
            return this.l && !this.v ? this.log.j(qb("enableSingleRequest"), this) : yc(this.w, "108809057") || yc(this.w, "108809056") || (this.log.info(tb("single request"), this), this.v = !0), this.v
        } catch (a) {
            O(6, a)
        }
    };
    k.enableAsyncRendering = function () {
        try {
            return this.l && !this.m ? this.log.j(qb("enableAsyncRendering"), this) : (this.log.info(tb("asynchronous rendering"), this), this.m = !0), this.m
        } catch (a) {
            O(7, a)
        }
    };
    k.enableSyncRendering = function () {
        try {
            if (this.l && this.m)this.log.j(qb("enableSyncRendering"), this); else {
                this.log.info(tb("synchronous rendering"), this);
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
            this.log.info(ub("centering", String(a)), this), this.R = a
        } catch (b) {
            O(9, b)
        }
    };
    k.setPublisherProvidedId = function (a) {
        try {
            return this.l ? this.log.j(sb("setPublisherProvidedId", a), this) : (this.log.info(ub("PPID", a), this), this.Y = a), this
        } catch (b) {
            O(20, b)
        }
    };
    k.definePassback = function (a, b) {
        try {
            if (!v(a) || 0 >= a.length || !b)return this.log.error(G("PubAdsService.definePassback", [a, b])), null;
            var c = zg(a), d = P();
            ii(d, "count_of_passback");
            d.w || (d.w = !0, Yh(d, "n" + c));
            ci(d);
            return new am(a, b, this)
        } catch (e) {
            O(10, e)
        }
    };
    k.defineOutOfPagePassback = function (a) {
        try {
            var b = this.definePassback(a, [1, 1]);
            b.la(!0);
            return b
        } catch (c) {
            O(35, c)
        }
    };
    var bm = function (a, b) {
        a.pa();
        a.j ? a.j.passback(b) : (a.log.info(lb(b.getAdUnitPath(), "GPT"), a, b), a.I.push(b))
    };
    Z.prototype.refresh = function (a, b) {
        try {
            if (a && !t(a) || b && (!x(b) || b.changeCorrelator && !da(b.changeCorrelator)))this.log.j(G("PubAdsService.refresh", tc([a, b], r)), this); else {
                var c = null;
                if (a && (c = lm(this, a), !c.length)) {
                    this.log.j(G("PubAdsService.refresh", tc([a, b], r)), this);
                    return
                }
                if (this.j) {
                    this.log.info(Ab(), this);
                    var d = !0;
                    r(b) && r(b.changeCorrelator) && (d = b.changeCorrelator);
                    ii(P(), "count_of_refreshes_called");
                    this.j.refresh(c, {changeCorrelator: d})
                } else this.v ? (this.log.info(zb(), this), c ? zc(this.C, new cm(c,
                    b)) : zc(this.C, new cm(this.getSlots(), b))) : this.log.j(wb(), this)
            }
        } catch (e) {
            O(11, e)
        }
    };
    Z.prototype.enableVideoAds = function () {
        try {
            this.P = !0, jm(this)
        } catch (a) {
            O(12, a)
        }
    };
    Z.prototype.setVideoContent = function (a, b) {
        try {
            this.P = !0, this.fa = a, this.da = b, jm(this)
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
    var jm = function (a) {
        a.P && a.j && a.j.setVideoContentInformation(a.fa, a.da)
    }, km = function (a) {
        a.j && a.j.setCorrelator(-1 == a.D ? void 0 : a.D)
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
            if (Vf(window))return this;
            if (!ug(a) || 0 === a)return this.log.j(Sb(String(a)), this), this;
            this.D = a;
            km(this);
            return this
        } catch (b) {
            O(28, b)
        }
    };
    k.updateCorrelator = function () {
        try {
            return this.D = -1, km(this), this
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
            return this.H ? this.log.j(Hb(), this) : this.l ? this.log.j(qb("collapseEmptyDivs"), this) : (this.O = !!a, this.log.info(Gb(String(this.O)), this), this.H = !0), this.H
        } catch (b) {
            O(14, b)
        }
    };
    k.clear = function (a) {
        try {
            if (!this.j)return this.log.j(yb(), this), !1;
            var b = null;
            if (a && (b = lm(this, a), 0 == b.length))return this.log.j(G("PubAdsService.clear", tc([a], r)), this), !1;
            this.log.info(Bb(), this);
            return this.j.clearSlotContents(b)
        } catch (c) {
            O(15, c)
        }
    };
    k.setLocation = function (a, b, c) {
        try {
            var d = "role:1 producer:12";
            if (r(b)) {
                if (!w(a))return this.log.j(Eb("Latitude")), this;
                if (!w(b))return this.log.j(Eb("Longitude")), this;
                d += " latlng{ latitude_e7: " + Math.round(1E7 * a) + " longitude_e7: " + Math.round(1E7 * b) + "}";
                if (r(c)) {
                    if (isNaN(c))return this.log.j(Eb("Radius")), this;
                    d += " radius:" + Math.round(c)
                }
            } else {
                if (50 < a.length) {
                    var e = a.substring(0, 50);
                    this.log.j(Fb(String(a), "50", e));
                    a = e
                }
                d += ' loc:"' + a + '"'
            }
            var e = d, f;
            if (Xl)f = q.btoa(e); else {
                d = [];
                for (b = a = 0; b < e.length; b++) {
                    for (var g =
                        e.charCodeAt(b); 255 < g;)d[a++] = g & 255, g >>= 8;
                    d[a++] = g
                }
                if (!Wl)for (Wl = {}, g = 0; 65 > g; g++)Wl[g] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g);
                g = Wl;
                e = [];
                for (a = 0; a < d.length; a += 3) {
                    var h = d[a], l = a + 1 < d.length, n = l ? d[a + 1] : 0, m = a + 2 < d.length, p = m ? d[a + 2] : 0;
                    b = h >> 2;
                    c = (h & 3) << 4 | n >> 4;
                    var u = (n & 15) << 2 | p >> 6, C = p & 63;
                    m || (C = 64, l || (u = 64));
                    e.push(g[b], g[c], g[u], g[C])
                }
                f = e.join("")
            }
            this.M = "a " + f;
            return this
        } catch (ma) {
            O(16, ma)
        }
    };
    k.getVersion = function () {
        return this.j ? this.j.getVersion() : void 0
    };
    k.forceExperiment = function (a) {
        this.l ? this.log.j(sb("forceExperiment", a), this) : this.w.push(a)
    };
    var Hh = function () {
        try {
            var a = si(), b = ri(a, "publisher_ads");
            if (!b) {
                var c = b = new Z;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(26, d)
        }
    }, lm = function (a, b) {
        for (var c = [], d = 0; d < b.length; ++d) {
            var e = b[d];
            e instanceof Fi ? e.P || c.push(e) : a.log.j(Ib(String(d)), a)
        }
        return c
    };
    Z.prototype.markAsAmp = function () {
        this.V = !0;
        this.j && (W(Y()).v = !0)
    };
    Z.prototype.setSafeFrameConfig = function (a) {
        try {
            if (a && x(a)) {
                var b = Dh(a);
                b && (this.Z = b)
            } else this.log.error(G("PubAdsService.setSafeFrameConfig", [a]), this);
            return this
        } catch (c) {
            O(37, c)
        }
    };
    var mm = function (a, b) {
        var c = a.getSlots(), d = tc(c, function (a) {
            return yc(b, a)
        });
        0 != d.length && (a.j ? a.j.destroySlots(d) : H(d, function (a) {
            Ac(this.o, a)
        }, a), H(d, function (a) {
            Ac(c, a)
        }))
    };
    Z.prototype.setForceSafeFrame = function (a) {
        try {
            if (!da(a))return this.log.j(Db(String(a)), this), this;
            this.L = a;
            this.j && Sl(this.L);
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
    A("pubads", Hh);
    var nm = function () {
        this.j = {};
        this.m = {};
        this.l = {};
        this.o = ta()
    }, om = function (a, b, c, d) {
        if (!v(b) || 0 >= b.length || !c)return null;
        b in a.j || (a.j[b] = [], a.m[b] = 0);
        c = new Fi(b, a.m[b], c, d);
        a.m[b]++;
        d = c.getSlotId().getDomId();
        if (a.l[d])return a.o.error(Ra(d)), null;
        a.j[b].push(c);
        a.l[c.getSlotId().getDomId()] = c;
        Eg.push(c);
        a = Ag([c])[0];
        b = P();
        ii(b, "count_of_slots");
        b.w || (b.w = !0, Yh(b, "n" + a));
        ci(b);
        return c
    }, pm = function (a) {
        var b = [];
        Kc(a.j, function (a) {
            H(a, function (a) {
                b.push(a)
            })
        });
        return b
    }, qm = function (a, b) {
        H(b, function (a) {
            a.P = !0;
            a.j.info(Vb(a.m.toString()), null, a);
            var b = a.getAdUnitPath();
            Ac(this.j[b], a);
            0 == this.j[b].length && Qc(this.j, b);
            Qc(this.l, a.getSlotId().getDomId());
            Ac(Eg, a)
        }, a)
    }, rm = function (a, b) {
        if (b && !t(b))return a.o.j(G("googletag.destroySlots", [b])), !1;
        var c;
        b ? (Ec(b), c = tc(b, function (a) {
            return a instanceof Fi && !a.P
        })) : c = pm(a);
        if (!c || 0 == c.length)return !1;
        mm(Hh(), c);
        qm(a, c);
        return !0
    };
    nm.prototype.u = function (a, b) {
        var c = b || 0, d = v(a) && this.j[a] || [];
        return 0 <= c && c < d.length && (d = d[c], d.getSlotId().getInstance() == c) ? d : null
    };
    var sm = function (a, b) {
        return Lc(a.j, function (a) {
            return yc(a, b)
        })
    }, tm = function () {
        var a = ka();
        return a.slot_manager_instance || (a.slot_manager_instance = new nm)
    }, dm = function (a, b, c) {
        try {
            var d = tm();
            return d && om(d, a, b, c)
        } catch (e) {
            O(802, e)
        }
    };
    A("defineOutOfPageSlot", function (a, b) {
        try {
            var c = tm();
            if (!c)return null;
            var d = om(c, a, [1, 1], b);
            return d ? (d.la(!0), d) : null
        } catch (e) {
            O(801, e)
        }
    });
    A("defineSlot", dm);
    A("defineUnit", dm);
    A("destroySlots", function (a) {
        try {
            var b = tm();
            return !(!b || !rm(b, a))
        } catch (c) {
            O(803, c)
        }
    });
    A("getSlots", function () {
        try {
            return pm(tm())
        } catch (a) {
            O(804, a)
        }
    });
    nm.prototype.find = nm.prototype.u;
    nm.getInstance = tm;
    var em = function (a) {
        try {
            var b = ta();
            if (v(a)) {
                var c, d = tm();
                if (c = d.l[a] ? d.l[a] : null)if (c.za = !0, c.R && !c.hasWrapperDiv())c.j.j(Oa(c.G, c.m.getDomId()), null, c); else for (a = 0; a < c.u.length; ++a)c.u[a].l && c.u[a].G(c); else b.error(Qa(String(a)))
            } else b.error(Pa(String(a)))
        } catch (e) {
            O(2201, e)
        }
    };
    A("display", em);
    var um = function () {
        Kh.call(this);
        this.I = !0;
        this.m = this.A = !1;
        this.H = 0;
        this.D = this.C = void 0;
        this.J = this.w = !1;
        this.v = {};
        this.j = {};
        this.o = !1;
        this.u = {}
    };
    z(um, Kh);
    k = um.prototype;
    k.set = function (a, b) {
        v(a) && 0 < a.length ? (this.u[a] = b, this.log.info(Wa(a, String(b), this.getName()), this, null)) : this.log.j(Xa(String(a), String(b), this.getName()), this, null);
        return this
    };
    k.get = function (a) {
        return this.u[a]
    };
    k.getAttributeKeys = function () {
        var a = [];
        J(this.u, function (b, c) {
            a.push(c)
        });
        return a
    };
    k.display = function (a, b, c, d) {
        this.enable();
        a = c ? dm(a, b, c) : dm(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        em(a.getSlotId().getDomId())
    };
    k.oa = function () {
        if (this.I) {
            if (!this.J) {
                var a = document, b = vg();
                try {
                    this.log.info(eb("GPT CompanionAds"), this), hd(a, b), this.J = !0
                } catch (c) {
                    Kg(414, c), this.log.error(fb("GPT CompanionAds"), this)
                }
            }
        } else this.w || (q.document.write('<script type="text/javascript" src="' + wg() + '">\x3c/script>'), this.w = !0)
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
            da(a) && (this.A = a)
        } catch (b) {
            O(403, b)
        }
    };
    k.setClearUnfilledSlots = function (a) {
        try {
            da(a) && (this.m = a)
        } catch (b) {
            O(412, b)
        }
    };
    k.notifyUnfilledSlots = function (a) {
        try {
            if (this.A)vm(this, wm(this, a)); else if (this.m) {
                var b = wm(this, a), c = Hh();
                if (c.l)for (c.clear(b), a = 0; a < b.length; ++a) {
                    var d = new Gh(b[a], !0, null, null, null, null, null, null, c.getName());
                    Lh(c, "slotRenderEnded", d)
                } else this.log.error(bb("PubAds", "clear"))
            }
        } catch (e) {
            O(413, e)
        }
    };
    k.isRoadblockingSupported = function () {
        var a = Hh();
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
            this.A && vm(this, null)
        } catch (a) {
            O(404, a)
        }
    };
    k.setVideoSession = function (a, b, c, d) {
        try {
            this.H = a, this.C = b, this.D = c, this.o = d
        } catch (e) {
            O(405, e)
        }
    };
    k.getDisplayAdsCorrelator = function () {
        try {
            return Hh().getCorrelator()
        } catch (a) {
            O(406, a)
        }
    };
    k.getVideoStreamCorrelator = function () {
        try {
            var a;
            var b = Hh();
            if (b.j) {
                var c = b.j.getVideoStreamCorrelator();
                a = isNaN(c) ? 0 : c
            } else a = 0;
            return a
        } catch (d) {
            O(407, d)
        }
    };
    var vm = function (a, b) {
        var c = Hh();
        if (c.l) {
            if (a.o) {
                if (!a.isRoadblockingSupported()) {
                    a.log.j(ab());
                    return
                }
                c.j ? (c.log.info(Cb(), c), c.j.clearNoRefreshState()) : c.log.j(xb(), c);
                c.clear()
            }
            var d = {isVideoRefresh: !0};
            r(a.H) && (d.videoStreamCorrelator = a.H);
            a.C && (d.videoPodNumber = a.C);
            a.D && (d.videoPodPosition = a.D);
            a.o && (d.persistentRoadblocksOnly = a.o);
            a.m && (d.clearUnfilledSlots = a.m);
            a:if (b && !t(b) || d.videoStreamCorrelator && !w(d.videoStreamCorrelator) || d.videoPodNumber && !w(d.videoPodNumber) || d.videoPodPosition && !w(d.videoPodPosition) ||
                d.persistentRoadblocksOnly && !da(d.persistentRoadblocksOnly) || d.clearUnfilledSlots && !da(d.clearUnfilledSlots))c.log.j(G("PubAdsService.internalVideoRefresh", tc([b, d], r)), c); else if (c.j) {
                var e = null;
                if (b && (e = lm(c, b), !e.length)) {
                    c.log.error(vb("internalVideoRefresh"), c);
                    break a
                }
                c.log.info(Ab(), c);
                c.j.refresh(e, d)
            } else c.log.j(wb(), c)
        } else a.log.error(bb("PubAds", "refresh"))
    };
    um.prototype.isSlotAPersistentRoadblock = function (a) {
        try {
            var b = Hh();
            if (b.l && sm(tm(), a))return b.j ? b.j.isSlotAPersistentRoadblock(a) : !1;
            this.log.error(cb());
            return !1
        } catch (c) {
            O(408, c)
        }
    };
    var wm = function (a, b) {
        for (var c = a.getSlotIdMap(), d = [], e = 0; e < b.length; ++e) {
            var f = b[e];
            Nc(c, f) ? d.push(c[f]) : a.log.j(db(), a)
        }
        return d
    };
    um.prototype.getName = function () {
        return "companion_ads"
    };
    var vg = function () {
        return yg() + "//pagead2.googlesyndication.com/pagead/show_companion_ad.js"
    };
    um.prototype.onImplementationLoaded = function () {
        try {
            this.log.info(gb("GPT CompanionAds"), this), this.w = !0
        } catch (a) {
            O(409, a)
        }
    };
    var xm = function (a, b) {
        var c = b && b.getSlotId().getId();
        if (c && c in a.v && b.hasWrapperDiv() && a.l && !a.isSlotAPersistentRoadblock(b)) {
            b.J = a.v[c];
            var d = null;
            a.j.hasOwnProperty(c) && (d = a.j[c], delete a.j[c]);
            c = new Gh(b, !1, d, null, null, null, null, null, a.getName());
            return Ii(b, c)
        }
        return !1
    };
    um.prototype.G = function (a) {
        xm(this, a)
    };
    um.prototype.fillSlot = function (a, b, c, d) {
        try {
            return sm(tm(), a) && v(b) && 0 < b.length ? (this.v[a.getSlotId().getId()] = b, null != c && null != d && (this.j[a.getSlotId().getId()] = [c, d]), xm(this, a)) : !1
        } catch (e) {
            O(410, e)
        }
    };
    um.prototype.slotRenderEnded = function (a, b, c) {
        try {
            var d = null;
            null != b && null != c && (d = [b, c]);
            var e = new Gh(a, !1, d, null, null, null, null, null, this.getName());
            Lh(this, "slotRenderEnded", e)
        } catch (f) {
            O(411, f)
        }
    };
    A("companionAds", function () {
        try {
            var a = si(), b = ri(a, "companion_ads");
            if (!b) {
                var c = b = new um;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(401, d)
        }
    });
    var ym = function () {
        Kh.call(this);
        this.j = {};
        this.m = {}
    };
    z(ym, Kh);
    k = ym.prototype;
    k.getName = function () {
        return "content"
    };
    k.set = function (a, b) {
        v(a) && 0 < a.length ? (this.j[a] = b, this.log.info(Wa(a, String(b), this.getName()), this, null)) : this.log.j(Xa(String(a), String(b), this.getName()), this, null);
        return this
    };
    k.get = function (a) {
        return this.j[a]
    };
    k.getAttributeKeys = function () {
        var a = [];
        J(this.j, function (b, c) {
            a.push(c)
        });
        return a
    };
    k.display = function (a, b, c, d) {
        this.enable();
        a = c ? dm(a, b, c) : dm(a, b);
        a.addService(this);
        d && a.setClickUrl(d);
        em(a.getSlotId().getDomId())
    };
    var zm = function (a, b) {
        var c = b && b.getSlotId().getId();
        c in a.m && a.l && b.hasWrapperDiv() && !b.C && (b.J = a.m[c], c = new Gh(b, !1, null, null, null, null, null, null, a.getName()), Ii(b, c))
    };
    ym.prototype.oa = function () {
        for (var a = this.getSlots(), b = 0; b < a.length; ++b)zm(this, a[b])
    };
    ym.prototype.G = function (a) {
        zm(this, a)
    };
    ym.prototype.setContent = function (a, b) {
        try {
            sm(tm(), a) && v(b) && 0 < b.length && (this.m[a.getSlotId().getId()] = b, zm(this, a))
        } catch (c) {
            O(602, c)
        }
    };
    A("content", function () {
        try {
            var a = si(), b = ri(a, "content");
            if (!b) {
                var c = b = new ym;
                a.j[c.getName()] = c
            }
            return b
        } catch (d) {
            O(601, d)
        }
    });
    var Am = null, Bm = !1, Cm = !1, Dm = function () {
        if (!Cm) {
            var a = yg() + "//publisherconsole.appspot.com/js/loader.js";
            hd(document, a);
            Cm = !0
        }
    }, Em = function () {
        var a = window, b = document;
        if (ka()._pubconsole_disable_)return !1;
        var c;
        c = document.cookie.split("google_pubconsole=");
        if (c = 2 == c.length ? c[1].split(";")[0] : "")if (c = c.split("|"), 0 < c.length && ("1" == c[0] || "0" == c[0]))return !0;
        si();
        c = !1;
        try {
            c = a.top.document.URL === b.URL
        } catch (d) {
        }
        a = c ? b.URL : b.referrer;
        return null !== rd(a, "google_debug") || null !== rd(a, "dfpdeb") || null !== rd(a, "google_console") ||
            null !== rd(a, "google_force_console") || null !== rd(a, "googfc")
    }, Gm = function () {
        try {
            Em() && Dm(), Fm()
        } catch (a) {
            O(2002, a)
        }
    }, Fm = function () {
        zd(window, "message", function (a) {
            a.source == window && "gpt_open_pubconsole" == a.data.type && (a = a.data.slotDomId) && Hm(a)
        })
    }, Hm = function (a) {
        window.googletag && window.googletag.console ? window.googletag.console.openConsole(a) : (a && (Am = a), Bm = !0, Dm())
    };

    DFPConsoleLog = function () {

        if(window["DFPConsole"].ready) return;

        loadDFPConsole && clearInterval(loadDFPConsole);
        loadDFPConsole = null;

        var gTags = window["googletag"],
            pAds = gTags.pubads(),
            slots = pAds.getSlots(),
            offsetTime = window["DFPConsole"].offsetTime || 0,
            matchCode = {
                8:      "gpt-google_js_loaded",
                46:     "gpt-gpt_fetch",
                48:     "gpt-gpt_fetched",
                1:      "gpt-page_load_complete",
                31:     "gpt-queue_start",
                40:     "gpt-service_add_slot",
                88:     "gpt-service_add_targeting",
                78:     "gpt-service_collapse_containers_enable",
                35:     "gpt-service_create",
                63:     "gpt-service_single_request_mode_enable",
                2:      "gpt-slot_create",
                17:     "gpt-slot_add_targeting",
                50:     "gpt-slot_fill",
                3:      "gpt-slot_fetch",
                4:      "gpt-slot_receiving",
                53:     "gpt-slot_render_delay",
                5:      "gpt-slot_rendering",
                6:      "gpt-slot_rendered",
                110:    "gpt-slot_rendered_load"
            };

        for (var key in slots) {

            var slot = slots[key];

            if (typeof slot === 'function') continue;

            var slotId = slot.getSlotId && slot.getSlotId();
            var rand = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            var id = slotId ? slotId.getId() : rand;

            if(window["DFPConsole"].slots[id] && window["DFPConsole"].slots[id]["fix"]) continue;

            window["DFPConsole"].slots[id] = window["DFPConsole"].slots[id] ||
                {
                    id: slotId.getDomId(),
                    pos: slot.getTargeting(slot.getTargetingKeys()[0])[0],
                    fix: true
                };

            gTags.debug_log.getEventsBySlot(slot).map(function (eventSlot) {
                var time = (new Date(eventSlot.l).getTime()) - performance.timing.navigationStart;
                window["DFPConsole"].slots[id][matchCode[eventSlot.getMessage().getMessageId()]] = Math.abs(time - offsetTime);
            });
        }

        setTimeout(function(){
            window["DFPConsole"]["endTime"] = performance.timing.loadEventEnd - performance.timing.navigationStart;
            window["DFPConsole"]["startTime"] = performance.timing.domInteractive - performance.timing.navigationStart;
            window.postMessage("dfpStream" + JSON.stringify(window["DFPConsole"]), "*");
        },1000);

        window["DFPConsole"].ready=true;

        return window["DFPConsole"];
    };

    function DFPConsoleInit() {

        var tryOn = 0;

        if (!loadDFPConsole) loadDFPConsole = setInterval(function () {
            tryOn++;
            console.info("Cargando DFP Console.", "pubadsReady: "+window["googletag"].pubadsReady, "apiReady: "+window["googletag"].apiReady);

            if(document.readyState === 'complete' && tryOn >15) {
                DFPConsoleLog();
            }

        }, 1000);

        if( window["DFPConsole"]) {
            window["DFPConsole"].ready = null;
            window["DFPConsole"].offsetTime = window["DFPConsole"].offsetTime || 0;

            var navStart = performance.timing.navigationStart,
                aux = Date.now() - navStart,
                delay = 10000,
                diff = aux - window["DFPConsole"].offsetTime;
            if (diff > delay) {
                window["DFPConsole"].offsetTime = aux;
            }
        }else{
            window["DFPConsole"] = {};
            DFPConsoleInit();
        }
    }

    function DFPCheckParameters(a) {
        var dfpEnabled = booleanCast(window.localStorage.getItem("dfp_extension_disabled"));
        var disableInitialLoad = booleanCast(window.localStorage.getItem("dfp_disable_initial_load"));
        var singleRequest = booleanCast(window.localStorage.getItem("dfp_single_request"));
        var asyncRendering = booleanCast(window.localStorage.getItem("dfp_async_rendering"));

        if (!dfpEnabled) {
            if (disableInitialLoad !== null) {
                a.U = disableInitialLoad;
            }
            if (singleRequest !== null) {
                a.v = singleRequest;
            }
            if (asyncRendering !== null) {
                a.m = asyncRendering;
            }
        }
        return a;
    }

    function booleanCast(data) {
        return data == "false" ? false : true;
    }

    function resetSlotFix() {
        for(var key in window["DFPConsole"].slots) {
            window["DFPConsole"].slots[key]["fix"] = false;
        }
    }

    window.addEventListener('message', function (e) {
        var showConsole = e.data.match ? e.data.match(/^dfpShowConsole$/) : null;
        var refresh = e.data.match ? e.data.match(/^dfpRefreshAds$/) : null;
        var reload = e.data.match ? e.data.match(/^dfpReload$/) : null;
        var parse = e.data.match ? e.data.match(/^dfpFinishParse(.*)/) : null;

        if(parse) {
            window["DFPConsole"].slotsSort = JSON.parse(parse[1]);
            window["DFPConsole"].parser = true;
        }
        if(refresh) {
            resetSlotFix(), DFPConsoleInit();
            window.googletag.pubads().refresh();
        }
        if(reload) {
            location.reload();
        }
        if(showConsole) {
            window["DFPConsole"].ready=null;
            DFPConsoleLog();
        }
    });

    "complete" === document.readyState ? Gm() : la(window, Gm);
    A("disablePublisherConsole", function () {
        try {
            ka()._pubconsole_disable_ = !0
        } catch (a) {
            O(2001, a)
        }
    });
    A("onPubConsoleJsLoad", function () {
        Bm && (window.googletag.console.openConsole(Am), Am = null, Bm = !1)
    });
    A("openConsole", Hm);
    var Im = function () {
        this.j = [];
        this.m = !1;
        this.l = ta()
    };
    Im.prototype.addSize = function (a, b) {
        try {
            var c;
            if (!(c = !ui(a) || "fluid" == a)) {
                var d;
                if (!(d = ui(b))) {
                    var e;
                    if (e = t(b))a:{
                        for (var f = b.length, g = v(b) ? b.split("") : b, h = 0; h < f; h++)if (h in g && !ui.call(void 0, g[h])) {
                            e = !1;
                            break a
                        }
                        e = !0
                    }
                    d = e
                }
                c = !d
            }
            if (c)return this.m = !0, this.l.j(G("SizeMappingBuilder.addSize", [a, b])), this;
            this.j.push([a, b]);
            return this
        } catch (l) {
            O(1601, l)
        }
    };
    Im.prototype.build = function () {
        try {
            if (this.m)return this.l.j(Ua()), null;
            Ic(this.j);
            return this.j
        } catch (a) {
            O(1602, a)
        }
    };
    var Hc = function (a, b) {
        var c;
        a:{
            c = b[0];
            for (var d = a[0], e = Fc, f = Math.min(c.length, d.length), g = 0; g < f; g++) {
                var h = e(c[g], d[g]);
                if (0 != h) {
                    c = h;
                    break a
                }
            }
            c = Fc(c.length, d.length)
        }
        return c
    };
    A("sizeMapping", function () {
        try {
            return new Im
        } catch (a) {
            O(1603, a)
        }
    });
    function Jm() {
        H(document.getElementsByTagName("script"), function (a) {
            var b = a.src;
            b && (0 <= b.indexOf("/tag/js/gpt.js") || 0 <= b.indexOf("/tag/js/gpt_mobile.js")) && a.innerHTML && !a.googletag_executed && (a.googletag_executed = !0, eval(a.innerHTML))
        })
    }

    if (window.googletag.evalScripts)window.googletag.evalScripts(); else {
        A("evalScripts", function () {
            Jm()
        });
        try {
            md(window.location.href) && (Bg["#37#"] = 1, Bg["#38#"] = 1);
            var oi = P();
            A("apiReady", !0);
            var Km = ka().cmd;
            if (!Km || t(Km)) {
                var Lm = ka().cmd = new Lg;
                Km && 0 < Km.length && Lm.push.apply(Lm, Km)
            }
            Jm();
            var Mm = xg("#34#");
            if (Math.random() < Mm) {
                var Nm = document, Om = Gf(Nm ? De(Nm) : window);
                if (ae() || I("iPad") || I("iPod") || !(Df || ee || de && ne(11))) {
                    var Pm = ka().fifWin, Qm = Pm && Pm.document || Nm, Rm = Qm.createElement("iframe");
                    Rm.src = Om;
                    Rm.style.visibility =
                        "hidden";
                    Rm.style.display = "none";
                    var Sm = Qm.getElementsByTagName("script");
                    if (0 < Sm.length) {
                        var Tm = Sm[Sm.length - 1];
                        Tm.parentNode && Tm.parentNode.insertBefore(Rm, Tm.nextSibling)
                    }
                } else id(Nm, Om)
            }
            var Um = xg("#57#");
            Math.random() < Um && id(document, bg(!0) + "/static/glade.js");
            var Vm = oi;
            Wh(Vm, "loader_loaded_instant");
            Vm.w ? Wh(Vm, "loader_loaded_instant_nw") : Vm.U = (new Date).getTime();
            var Wm = yg();
            pi(Wm + "//www.googletagservices.com/tag/js/gpt.js");
            pi(Wm + "//www.googletagservices.com/tag/js/gpt_mobile.js")
        } catch (a) {
            O(2801,
                a)
        }
    }
    ;
}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this)
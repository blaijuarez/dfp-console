(function() {
    var window = this;
    var a = this;
    var c = function (b, e) {
        var d = parseFloat(b);
        return isNaN(d) || 1 < d || 0 > d ? e : d
    }, f = function (b, e) {
        var d = parseInt(b, 10);
        return isNaN(d) ? e : d
    }, g = /^([\w-]+\.)*([\w-]{2,})(\:[0-9]+)?$/, h = function (b, e) {
        if (!b)return e;
        var d = b.match(g);
        return d ? d[0] : e
    };
    var k = c("0.02", 0), l = c("0.0", 0);
    var m = c("0", 0), n = c("0.001", 0), p = f("1500", 1500), q = c("0.01", 0), r = c("1.0", 0), t = c("0.5", 0), u = c("", .001), v = f("", 200), w = c("0.01", 0), x = /^true$/.test("") ?
        !0 : !1, y = c("0.0", 0), z = c("0.01", 0), A = c("0.1", 0), B = c("0.01", 0), C = c("1", 0), D = c("", .001), E = c("0", 0), F = c("0.1", 0), G = c("0.0001", 0), H = c("0", 0), I = f("90",
        0), J = f("90", 0), K = c("0", 0), aa = c("0.0", 0), ba = c("0.1", 0), ca = c("0.001", 0), da = c("0.05", 0), ea = c("0.001", 0), fa = c("0.001", 0);
    var ga = /^true$/.test("false") ? !0 : !1;
    var L = function () {
        return a.googletag || (a.googletag = {})
    }, M = function (b, e) {
        var d = L();
        d.hasOwnProperty(b) || (d[b] = e)
    };
    var N = {};
    N["#1#"] = h("", "pagead2.googlesyndication.com");
    N["#2#"] = h("", "pubads.g.doubleclick.net");
    N["#3#"] = h("", "securepubads.g.doubleclick.net");
    N["#6#"] = function (b) {
        try {
            for (var e = null; e != b; e = b, b = b.parent)switch (b.location.protocol) {
                case "https:":
                    return !0;
                case "http:":
                case "file:":
                    return !1
            }
        } catch (d) {
        }
        return !0
    }(window);
    N["#7#"] = k;
    N["#10#"] = m;
    N["#11#"] = n;
    N["#13#"] = p;
    N["#16#"] = q;
    N["#17#"] = r;
    N["#18#"] = t;
    N["#20#"] = l;
    N["#23#"] = u;
    N["#24#"] = v;
    N["#27#"] = w;
    N["#28#"] = y;
    N["#29#"] = z;
    N["#31#"] = A;
    N["#33#"] = h("", "pagead2.googlesyndication.com");
    N["#34#"] = C;
    N["#36#"] = x;
    N["#37#"] = B;
    N["#38#"] = D;
    N["#39#"] = "";
    N["#40#"] = E;
    N["#45#"] = F;
    N["#46#"] = ga;
    N["#47#"] = G;
    N["#49#"] = (new Date).getTime();
    N["#52#"] = H;
    N["#53#"] = "";
    N["#54#"] = aa;
    N["#55#"] = ba;
    N["#56#"] = ca;
    N["#57#"] = da;
    N["#58#"] = ea;
    N["#59#"] = fa;
    M("_vars_", N);
    M("getVersion", function () {
        return "89"
    });
    var ha = {};
    var O = L(), P = (O.fifWin || window).document;
    M("cmd", []);
    if ("function" == function (b) {
            var e = typeof b;
            if ("object" == e)if (b) {
                if (b instanceof Array)return "array";
                if (b instanceof Object)return e;
                var d = Object.prototype.toString.call(b);
                if ("[object Window]" == d)return "object";
                if ("[object Array]" == d || "number" == typeof b.length && "undefined" != typeof b.splice && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("splice"))return "array";
                if ("[object Function]" == d || "undefined" != typeof b.call && "undefined" != typeof b.propertyIsEnumerable && !b.propertyIsEnumerable("call"))return "function"
            } else return "null";
            else if ("function" == e && "undefined" == typeof b.call)return "object";
            return e
        }(O.evalScripts))O.evalScripts(); else {
        var Q, R = J || "89", S = "", T;
        if (I && K) {
            a:{
                var U = [I, R], ia = 2 * K;
                if (!(1E-4 > Math.random())) {
                    var V = Math.random();
                    if (V < ia) {
                        var ja = window;
                        try {
                            var W = new Uint32Array(1);
                            ja.crypto.getRandomValues(W);
                            V = W[0] / 65536 / 65536
                        } catch (b) {
                            V = Math.random()
                        }
                        T = U[Math.floor(V * U.length)];
                        break a
                    }
                }
                T = null
            }
            T == I ? N["#53#"] = "108809094" : T == R && (N["#53#"] = "108809093", S = "?v=" + I)
        }
        T = T || R;
        Q = (ha["#6#"] || L()._vars_["#6#"] ? "https:" : "http:") +
            "//partner.googleadservices.com/gpt/pubads_impl_" + T + ".js" + S;
        var X = P.currentScript;
        if (!("complete" == P.readyState || "loaded" == P.readyState || X && X.async)) {
            var Y = "gpt-impl-" + Math.random();
            try {
                P.write('<script id="' + Y + '" src="' + Q + '">\x3c/script>')
            } catch (b) {
            }
            P.getElementById(Y) && (O._loadStarted_ = !0)
        }
        if (!O._loadStarted_) {
            var Z = P.createElement("script");
            Z.src = Q;
            Z.async = !0;
            (P.head || P.body || P.documentElement).appendChild(Z);
            O._loadStarted_ = !0
        }
    };
}).call(this.googletag&&googletag.fifWin?googletag.fifWin.parent:this);

function pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
}

function pug_classes(s, r) {
    return Array.isArray(s) ? pug_classes_array(s, r) : s && "object" == typeof s ? pug_classes_object(s) : s || ""
}

function pug_classes_array(r, a) {
    for (var s, e = "", u = "", c = Array.isArray(a), g = 0; g < r.length; g++) (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = " ");
    return e
}

function pug_classes_object(r) {
    var a = "", n = "";
    for (var o in r) o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = " ");
    return a
}

function pug_escape(e) {
    var a = "" + e, t = pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n
    }
    return c !== r ? s + a.substring(c, r) : s
}

var pug_has_own_property = Object.prototype.hasOwnProperty;
var pug_match_html = /["&<>]/;

export default function template(...locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (Array, car, items, nextBtn, num, prevBtn, typeMov, wrapMov) {
        items = locals[0];
        car = locals[1];
        prevBtn = locals[2];
        nextBtn = locals[3];
        wrapMov = locals[4];
        typeMov = locals[5];
        num = locals[6];
        var pug_indent = [];
        pug_mixins["carousel"] = pug_interp = function (items, car, prevBtn, nextBtn, wrapMov, typeMov, num) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["b-carousel", car], [false, true]), false, false)) + "\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cbutton" + (pug_attr("class", pug_classes([`b-carousel` + `${typeMov}` + `__prev ${prevBtn}`], [true]), false, false)) + "\u003E❬\u003C\u002Fbutton\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cbutton" + (pug_attr("class", pug_classes([`b-carousel` + `${typeMov}` + `__next ${nextBtn}`], [true]), false, false)) + "\u003E❭\u003C\u002Fbutton\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`b-carousel` + `${typeMov}` + `__wrap ${wrapMov}`], [true]), false, false) + " style=\"transform: translateX(0%);\"") + "\u003E";
// iterate Array(num)
            ;(function () {
                var $$obj = Array(num);
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var _ = $$obj[pug_index0];
                        pug_html = pug_html + "\n    ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"b-carousel__item\"\u003E";
// iterate items
                        ;(function () {
                            var $$obj = items;
                            if ('number' == typeof $$obj.length) {
                                for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
                                    var item = $$obj[pug_index1];
                                    pug_html = pug_html + "\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`movie` + `${typeMov}`], [true]), false, false)) + "\u003E\u003Ca" + (pug_attr("href", item.href, true, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"ref-mov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`desc-mov` + `${typeMov}`], [true]), false, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cinput class=\"input-like\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                                }
                            } else {
                                var $$l = 0;
                                for (var pug_index1 in $$obj) {
                                    $$l++;
                                    var item = $$obj[pug_index1];
                                    pug_html = pug_html + "\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`movie` + `${typeMov}`], [true]), false, false)) + "\u003E\u003Ca" + (pug_attr("href", item.href, true, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"ref-mov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`desc-mov` + `${typeMov}`], [true]), false, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cinput class=\"input-like\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                                }
                            }
                        }).call(this);

                        pug_html = pug_html + "\n    ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var _ = $$obj[pug_index0];
                        pug_html = pug_html + "\n    ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"b-carousel__item\"\u003E";
// iterate items
                        ;(function () {
                            var $$obj = items;
                            if ('number' == typeof $$obj.length) {
                                for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
                                    var item = $$obj[pug_index2];
                                    pug_html = pug_html + "\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`movie` + `${typeMov}`], [true]), false, false)) + "\u003E\u003Ca" + (pug_attr("href", item.href, true, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"ref-mov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`desc-mov` + `${typeMov}`], [true]), false, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cinput class=\"input-like\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                                }
                            } else {
                                var $$l = 0;
                                for (var pug_index2 in $$obj) {
                                    $$l++;
                                    var item = $$obj[pug_index2];
                                    pug_html = pug_html + "\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`movie` + `${typeMov}`], [true]), false, false)) + "\u003E\u003Ca" + (pug_attr("href", item.href, true, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"ref-mov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes([`desc-mov` + `${typeMov}`], [true]), false, false)) + "\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n          ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003Cinput class=\"input-like\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n        ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E\n      ";
                                    pug_html = pug_html + pug_indent.join("");
                                    pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                                }
                            }
                        }).call(this);

                        pug_html = pug_html + "\n    ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                    }
                }
            }).call(this);

            pug_html = pug_html + "\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        };
        pug_indent.push('');
        pug_mixins["carousel"](items, car, prevBtn, nextBtn, wrapMov, typeMov, num);
        pug_indent.pop();
    }.call(this, "Array" in locals_for_with ? locals_for_with.Array : typeof Array !== "undefined" ? Array : undefined, "car" in locals_for_with ? locals_for_with.car : typeof car !== "undefined" ? car : undefined, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined, "nextBtn" in locals_for_with ? locals_for_with.nextBtn : typeof nextBtn !== "undefined" ? nextBtn : undefined, "num" in locals_for_with ? locals_for_with.num : typeof num !== "undefined" ? num : undefined, "prevBtn" in locals_for_with ? locals_for_with.prevBtn : typeof prevBtn !== "undefined" ? prevBtn : undefined, "typeMov" in locals_for_with ? locals_for_with.typeMov : typeof typeMov !== "undefined" ? typeMov : undefined, "wrapMov" in locals_for_with ? locals_for_with.wrapMov : typeof wrapMov !== "undefined" ? wrapMov : undefined));
    ;
    return pug_html;
}
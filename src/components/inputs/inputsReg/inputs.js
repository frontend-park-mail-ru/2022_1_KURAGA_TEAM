function pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = typeof e;
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'"
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

var pug_match_html = /["&<>]/;

export default function inputsTemplate(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        pug_mixins["inputs"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
// iterate items
            ;(function () {
                var $$obj = items;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\u003Cdiv" + (" class=\"element\"" + pug_attr("data-section", item.key, true, false)) + "\u003E\u003Cobject" + (" class=\"svg\"" + " type=\"image\u002Fsvg+xml\"" + pug_attr("data", item.data, true, false)) + "\u003E\u003C\u002Fobject\u003E\u003Cinput" + (" class=\"menu-input\"" + pug_attr("placeholder", item.placeholder, true, false) + pug_attr("type", item.type, true, false) + pug_attr("required", true, true, false) + pug_attr("data-section", item.key, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"error\"" + pug_attr("data-section", item.error, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\u003Cdiv" + (" class=\"element\"" + pug_attr("data-section", item.key, true, false)) + "\u003E\u003Cobject" + (" class=\"svg\"" + " type=\"image\u002Fsvg+xml\"" + pug_attr("data", item.data, true, false)) + "\u003E\u003C\u002Fobject\u003E\u003Cinput" + (" class=\"menu-input\"" + pug_attr("placeholder", item.placeholder, true, false) + pug_attr("type", item.type, true, false) + pug_attr("required", true, true, false) + pug_attr("data-section", item.key, true, false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv" + (" class=\"error\"" + pug_attr("data-section", item.error, true, false)) + "\u003E\u003C\u002Fdiv\u003E";
                    }
                }
            }).call(this);

            pug_html = pug_html + "\u003Cdiv class=\"error\" data-section=\"incorrect\"\u003E\u003C\u002Fdiv\u003E";
        };
        pug_mixins["inputs"](items);
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
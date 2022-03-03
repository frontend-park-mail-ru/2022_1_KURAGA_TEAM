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

export default function footerTemplate(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        pug_mixins["footer"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\u003Cfooter id=\"footer\"\u003E\u003Cdiv class=\"left\"\u003E\u003Cdiv\u003E\u003Cdiv class=\"title\"\u003EКонтакты\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003EМосква. ул. 2-ая Бауманская, д. 5\u003C\u002Fdiv\u003E\u003Ca class=\"content\" href=\"mailto:kuraga_team@moviespace.com\"\u003Ekuraga_team@moviespace.com\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"second-footer\"\u003E\u003Cdiv class=\"title\"\u003EИнформация\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E© 2022–2022 Movie Space.\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003EМожет содержать информацию, не предназначенную для несовершеннолетних\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"third-footer\"\u003E";
// iterate items
            ;(function () {
                var $$obj = items;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\u003Ca" + (" class=\"ref\"" + pug_attr("href", item.href, true, false)) + "\u003E\u003Cimg" + (" class=\"refer\"" + pug_attr("src", item.src, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\u003Ca" + (" class=\"ref\"" + pug_attr("href", item.href, true, false)) + "\u003E\u003Cimg" + (" class=\"refer\"" + pug_attr("src", item.src, true, false)) + "\u002F\u003E\u003C\u002Fa\u003E";
                    }
                }
            }).call(this);

            pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Ffooter\u003E";
        };
        pug_mixins["footer"](items);
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
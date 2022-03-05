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

export default function regViewTemplate(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        pug_mixins["regView"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\u003Cdiv id=\"back\"\u003E\u003C\u002Fdiv\u003E\u003Cobject class=\"logo\" type=\"image\u002Fsvg+xml\" data=\"..\u002F..\u002Fstatic\u002FLogo.svg\"\u003E\u003C\u002Fobject\u003E\u003Cdiv id=\"back-menu\"\u003E\u003Cdiv id=\"menu\"\u003E\u003Ch1 class=\"menu-h1\"\u003EРегистрация\u003C\u002Fh1\u003E\u003Cform" + (" class=\"menu-form\"" + " method=\"post\" action=\"\u002F\"" + pug_attr("noValidate", true, true, false)) + "\u003E" + (null == (pug_interp = items.inputs) ? "" : pug_interp) + " " + (null == (pug_interp = items.button) ? "" : pug_interp) + "\u003C\u002Fform\u003E\u003Cdiv class=\"text\"\u003E\u003Cspan class=\"first-span\"\u003EЕсть аккаунт?\u003C\u002Fspan\u003E\u003Ca class=\"second-span\" href=\"\u002Flogin\"\u003EВойдите\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E" + (null == (pug_interp = items.footer) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
        };
        pug_mixins["regView"](items);
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
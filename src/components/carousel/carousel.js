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

export default function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items=locals
        var pug_indent = [];
        pug_mixins["carousel"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"wrap\"\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"b-carousel js-carousel\"\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cbutton class=\"b-carousel__prev js-carousel__prev\"\u003E\u003C\u002Fbutton\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cbutton class=\"b-carousel__next js-carousel__next\"\u003E\u003C\u002Fbutton\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"b-carousel__wrap js-carousel__wrap\"\u003E\n      ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"b-carousel__item\"\u003E";
// iterate items
            ;(function () {
                var $$obj = items;
                if ('number' == typeof $$obj.length) {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\n        ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"movie\"\u003E\u003Ca href=\"\u002F\"\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"refMov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n          ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"descMov\"\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cinput class=\"inputLike\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n          ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E\n        ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var item = $$obj[pug_index0];
                        pug_html = pug_html + "\n        ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"movie\"\u003E\u003Ca href=\"\u002F\"\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"refMov\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n          ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"descMov\"\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = item.name) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cdiv class=\"genre\"\u003E" + (pug_escape(null == (pug_interp = item.genre) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\n            ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003Cinput class=\"inputLike\" id=\"cb\" type=\"checkbox\"\u002F\u003E\n          ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E\n        ";
                        pug_html = pug_html + pug_indent.join("");
                        pug_html = pug_html + "\u003C\u002Fdiv\u003E";
                    }
                }
            }).call(this);

            pug_html = pug_html + "\n      ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        };
        pug_indent.push('');
        pug_mixins["carousel"](items);
        pug_indent.pop();
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
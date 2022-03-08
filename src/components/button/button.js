/* eslint-disable */
function pug_attr(t, e, n, r) {
    if (!1 === e || e == null || !e && (t === 'class' || t === 'style')) return '';
    if (!0 === e) return ` ${r ? t : `${t}="${t}"`}`;
    const f = typeof e;
    return f !== 'object' && f !== 'function' || typeof e.toJSON !== 'function' || (e = e.toJSON()), typeof e === 'string' || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), ` ${t}="${e}"`) : ` ${t}='${e.replace(/'/g, '&#39;')}'`;
}

function pug_classes(s, r) {
    return Array.isArray(s) ? pug_classes_array(s, r) : s && typeof s === 'object' ? pug_classes_object(s) : s || '';
}

function pug_classes_array(r, a) {
    for (var s, e = '', u = '', c = Array.isArray(a), g = 0; g < r.length; g++) (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = ' ');
    return e;
}

function pug_classes_object(r) {
    let a = '';
    let n = '';
    for (const o in r) o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = ' ');
    return a;
}

function pug_escape(e) {
    const a = `${e}`; const
        t = pug_match_html.exec(a);
    if (!t) return e;
    let r; let c; let n; let
        s = '';
    for (r = t.index, c = 0; r < a.length; r++) {
        switch (a.charCodeAt(r)) {
        case 34:
            n = '&quot;';
            break;
        case 38:
            n = '&amp;';
            break;
        case 60:
            n = '&lt;';
            break;
        case 62:
            n = '&gt;';
            break;
        default:
            continue;
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
}

var pug_has_own_property = Object.prototype.hasOwnProperty;
var pug_match_html = /["&<>]/;

export default function buttonTemplate(...locals) {
    let pug_html = '';
    const pug_mixins = {};
    let pug_interp;
    const locals_for_with = (locals || {});
    (function (cls, value) {
        value = locals[0];
        cls = locals[1];
        pug_mixins.button = pug_interp = function (value, cls) {
            const block = (this && this.block); const
                attributes = (this && this.attributes) || {};
            pug_html = `${pug_html}\u003Cbutton${pug_attr('class', pug_classes([`menu-button ${cls}`], [true]), false, false)} type="submit"\u003E${pug_escape((pug_interp = value) == null ? '' : pug_interp)}\u003C\u002Fbutton\u003E`;
        };
        pug_mixins.button(value, cls);
    }.call(this, 'cls' in locals_for_with ? locals_for_with.cls : typeof cls !== 'undefined' ? cls : undefined, 'value' in locals_for_with ? locals_for_with.value : typeof value !== 'undefined' ? value : undefined));

    return pug_html;
}

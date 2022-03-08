/* eslint-disable */
function pug_attr(t, e, n, r) {
    if (!1 === e || e == null || !e && (t === 'class' || t === 'style')) return '';
    if (!0 === e) return ` ${r ? t : `${t}="${t}"`}`;
    const f = typeof e;
    return f !== 'object' && f !== 'function' || typeof e.toJSON !== 'function' || (e = e.toJSON()), typeof e === 'string' || (e = JSON.stringify(e), n || e.indexOf('"') === -1) ? (n && (e = pug_escape(e)), ` ${t}="${e}"`) : ` ${t}='${e.replace(/'/g, '&#39;')}'`;
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

var pug_match_html = /["&<>]/;

export default function regViewTemplate(locals) {
    let pug_html = '';
    const pug_mixins = {};
    let pug_interp;
    const locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        pug_mixins.regView = pug_interp = function (items) {
            const block = (this && this.block); const
                attributes = (this && this.attributes) || {};
            pug_html = `${pug_html}\u003Cdiv id="back"\u003E\u003C\u002Fdiv\u003E\u003Cobject class="logo" type="image\u002Fsvg+xml" data="..\u002F..\u002Fstatic\u002FLogo.svg"\u003E\u003C\u002Fobject\u003E\u003Cdiv id="back-menu"\u003E\u003Cdiv id="menu"\u003E\u003Ch1 class="menu-h1"\u003EРегистрация\u003C\u002Fh1\u003E\u003Cform` + ' class="menu-form"' + ` method="post" action="\u002F"${pug_attr('noValidate', true, true, false)} enctype="application\u002Fjson"` + `\u003E${(pug_interp = items.inputs) == null ? '' : pug_interp} ${(pug_interp = items.button) == null ? '' : pug_interp}\u003C\u002Fform\u003E\u003Cdiv class="text"\u003E\u003Cspan class="first-span"\u003EЕсть аккаунт?\u003C\u002Fspan\u003E\u003Ca class="second-span" href="\u002Flogin"\u003EВойдите\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E${(pug_interp = items.footer) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E`;
        };
        pug_mixins.regView(items);
    }.call(this, 'items' in locals_for_with ? locals_for_with.items : typeof items !== 'undefined' ? items : undefined));

    return pug_html;
}

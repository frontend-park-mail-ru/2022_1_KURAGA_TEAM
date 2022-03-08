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

export default function template(...locals) {
    let pug_html = '';
    const pug_mixins = {};
    let pug_interp;
    const locals_for_with = (locals || {});
    (function (car, items, nextBtn, prevBtn, typeMov, wrapMov) {
        items = locals[0];
        car = locals[1];
        prevBtn = locals[2];
        nextBtn = locals[3];
        wrapMov = locals[4];
        typeMov = locals[5];
        const pug_indent = [];
        pug_mixins.carousel = pug_interp = function (items, car, prevBtn, nextBtn, wrapMov, typeMov) {
            const block = (this && this.block); const
                attributes = (this && this.attributes) || {};
            pug_html += '\n';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['b-carousel', car], [false, true]), false, false)}\u003E\n  `;
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cbutton${pug_attr('class', pug_classes(['b-carousel' + `${typeMov}` + `__prev ${prevBtn}`], [true]), false, false)}\u003E❬\u003C\u002Fbutton\u003E\n  `;
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cbutton${pug_attr('class', pug_classes(['b-carousel' + `${typeMov}` + `__next ${nextBtn}`], [true]), false, false)}\u003E❭\u003C\u002Fbutton\u003E\n  `;
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['b-carousel' + `${typeMov}` + `__wrap ${wrapMov}`], [true]), false, false)} style="transform: translateX(0%);"\u003E`;
            // iterate [1,2,3]
            (function () {
                const $$obj = [1, 2, 3];
                if (typeof $$obj.length === 'number') {
                    for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
                        var val = $$obj[pug_index0];
                        pug_html += '\n    ';
                        pug_html += pug_indent.join('');
                        pug_html += '\u003Cdiv class="b-carousel__item"\u003E';
                        // iterate items
                        (function () {
                            const $$obj = items;
                            if (typeof $$obj.length === 'number') {
                                for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
                                    var item = $$obj[pug_index1];
                                    pug_html += '\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['movie' + `${typeMov}`], [true]), false, false)}\u003E\u003Ca${pug_attr('href', item.href, true, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cdiv class="ref-mov"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['desc-mov' + `${typeMov}`], [true]), false, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv\u003E${pug_escape((pug_interp = item.name) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv class="genre"\u003E${pug_escape((pug_interp = item.genre) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cinput class="input-like" id="cb" type="checkbox"\u002F\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E';
                                }
                            } else {
                                var $$l = 0;
                                for (var pug_index1 in $$obj) {
                                    $$l++;
                                    var item = $$obj[pug_index1];
                                    pug_html += '\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['movie' + `${typeMov}`], [true]), false, false)}\u003E\u003Ca${pug_attr('href', item.href, true, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cdiv class="ref-mov"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['desc-mov' + `${typeMov}`], [true]), false, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv\u003E${pug_escape((pug_interp = item.name) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv class="genre"\u003E${pug_escape((pug_interp = item.genre) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cinput class="input-like" id="cb" type="checkbox"\u002F\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E';
                                }
                            }
                        }).call(this);

                        pug_html += '\n    ';
                        pug_html += pug_indent.join('');
                        pug_html += '\u003C\u002Fdiv\u003E';
                    }
                } else {
                    var $$l = 0;
                    for (var pug_index0 in $$obj) {
                        $$l++;
                        var val = $$obj[pug_index0];
                        pug_html += '\n    ';
                        pug_html += pug_indent.join('');
                        pug_html += '\u003Cdiv class="b-carousel__item"\u003E';
                        // iterate items
                        (function () {
                            const $$obj = items;
                            if (typeof $$obj.length === 'number') {
                                for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
                                    var item = $$obj[pug_index2];
                                    pug_html += '\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['movie' + `${typeMov}`], [true]), false, false)}\u003E\u003Ca${pug_attr('href', item.href, true, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cdiv class="ref-mov"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['desc-mov' + `${typeMov}`], [true]), false, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv\u003E${pug_escape((pug_interp = item.name) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv class="genre"\u003E${pug_escape((pug_interp = item.genre) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cinput class="input-like" id="cb" type="checkbox"\u002F\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E';
                                }
                            } else {
                                var $$l = 0;
                                for (var pug_index2 in $$obj) {
                                    $$l++;
                                    var item = $$obj[pug_index2];
                                    pug_html += '\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['movie' + `${typeMov}`], [true]), false, false)}\u003E\u003Ca${pug_attr('href', item.href, true, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cdiv class="ref-mov"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fa\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv${pug_attr('class', pug_classes(['desc-mov' + `${typeMov}`], [true]), false, false)}\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv\u003E${pug_escape((pug_interp = item.name) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html = `${pug_html}\u003Cdiv class="genre"\u003E${pug_escape((pug_interp = item.genre) == null ? '' : pug_interp)}\u003C\u002Fdiv\u003E\n          `;
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003Cinput class="input-like" id="cb" type="checkbox"\u002F\u003E\n        ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E\n      ';
                                    pug_html += pug_indent.join('');
                                    pug_html += '\u003C\u002Fdiv\u003E';
                                }
                            }
                        }).call(this);

                        pug_html += '\n    ';
                        pug_html += pug_indent.join('');
                        pug_html += '\u003C\u002Fdiv\u003E';
                    }
                }
            }).call(this);

            pug_html += '\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E\n';
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E';
        };
        pug_indent.push('');
        pug_mixins.carousel(items, car, prevBtn, nextBtn, wrapMov, typeMov);
        pug_indent.pop();
    }.call(this, 'car' in locals_for_with ? locals_for_with.car : typeof car !== 'undefined' ? car : undefined, 'items' in locals_for_with ? locals_for_with.items : typeof items !== 'undefined' ? items : undefined, 'nextBtn' in locals_for_with ? locals_for_with.nextBtn : typeof nextBtn !== 'undefined' ? nextBtn : undefined, 'prevBtn' in locals_for_with ? locals_for_with.prevBtn : typeof prevBtn !== 'undefined' ? prevBtn : undefined, 'typeMov' in locals_for_with ? locals_for_with.typeMov : typeof typeMov !== 'undefined' ? typeMov : undefined, 'wrapMov' in locals_for_with ? locals_for_with.wrapMov : typeof wrapMov !== 'undefined' ? wrapMov : undefined));

    return pug_html;
}

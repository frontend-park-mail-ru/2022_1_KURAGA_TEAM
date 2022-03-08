export default function template(locals) {
    let pug_html = '';
    const pug_mixins = {};
    let pug_interp;
    const locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        const pug_indent = [];
        pug_mixins.homeView = pug_interp = function (items) {
            const block = (this && this.block); const
                attributes = (this && this.attributes) || {};
            pug_html += '\n';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="root background"\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="header" id="header"\u003E\n    ';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv class="navbar"\u003E${(pug_interp = items.header) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n    `;
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv class="main-movie"\u003E${(pug_interp = items.mainMovie) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n  `;
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="selection"\u003E\n    ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="select"\u003E\n      ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="select-title"\u003EПопулярное\u003C\u002Fdiv\u003E\n      ';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv class="wrap"\u003E${(pug_interp = items.carouselPop) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n      `;
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="select-title"\u003EЛучшее за 2021 год\u003C\u002Fdiv\u003E\n      ';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv class="wrap"\u003E${(pug_interp = items.carouselTop) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n      `;
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="select-title"\u003EСемейное\u003C\u002Fdiv\u003E\n      ';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv class="wrap"\u003E${(pug_interp = items.carouselFam) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n    `;
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html = `${pug_html}\u003Cdiv\u003E${(pug_interp = items.footer) == null ? '' : pug_interp}\u003C\u002Fdiv\u003E\n`;
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E';
        };
        pug_indent.push('');
        pug_mixins.homeView(items);
        pug_indent.pop();
    }.call(this, 'items' in locals_for_with ? locals_for_with.items : typeof items !== 'undefined' ? items : undefined));

    return pug_html;
}

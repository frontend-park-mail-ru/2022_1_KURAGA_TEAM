/* eslint-disable */
export default function template(locals) {
    let pug_html = '';
    const pug_mixins = {};
    let pug_interp;
    const locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        const pug_indent = [];
        pug_mixins.mainMovie = pug_interp = function (items) {
            const block = (this && this.block); const
                attributes = (this && this.attributes) || {};
            pug_html += '\n';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="sidebar"\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="font title-main-movie"\u003E\n    ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="title-name"\u003E1+1\u003C\u002Fdiv\u003E\n    ';
            pug_html += pug_indent.join('');
            pug_html += "\u003Cdiv class=\"title-descr\"\u003E«Sometimes you have to reach into someone else's world to find out what's missing in your own»\u003C\u002Fdiv\u003E\n  ";
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="btn"\u003E\u003Ca class="font-other" href="\u002F"\u003EСмотреть онлайн\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n  ';
            pug_html += pug_indent.join('');
            pug_html += '\u003Cdiv class="btn-info"\u003E\u003Ca class="font-other" href="\u002F"\u003EО фильме\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\n';
            pug_html += pug_indent.join('');
            pug_html += '\u003C\u002Fdiv\u003E';
        };
        pug_indent.push('');
        pug_mixins.mainMovie(items);
        pug_indent.pop();
    }.call(this, 'items' in locals_for_with ? locals_for_with.items : typeof items !== 'undefined' ? items : undefined));

    return pug_html;
}

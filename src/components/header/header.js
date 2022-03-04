export default function template(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        var pug_indent = [];
        pug_mixins["header"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"navbar font\"\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cobject class=\"logo\" type=\"image\u002Fpng\" data=\"..\u002Fstatic\u002Flogo.png\"\u003E\u003C\u002Fobject\u003E\u003Ca class=\"label font\" href=\"\u002F\"\u003EГлавная\u003C\u002Fa\u003E\u003Ca class=\"label font\" href=\"\u002F\"\u003EФильмы\u003C\u002Fa\u003E\u003Ca class=\"label font\" href=\"\u002F\"\u003EСериалы\u003C\u002Fa\u003E\u003Ca class=\"label font\" href=\"\u002F\"\u003EИзбранное\u003C\u002Fa\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"space\"\u003E\u003C\u002Fdiv\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cform\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"search\"\u003E\n      ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cinput class=\"fontGT\" type=\"text\" placeholder=\"Поиск\"\u002F\u003E\n      ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cbutton class=\"btnSearch\" type=\"submit\"\u003E\u003C\u002Fbutton\u003E\n    ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fform\u003E\n  ";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003Cdiv class=\"profile\"\u003E\u003Cimg class=\"profileImg\" src=\"..\u002Fstatic\u002Fprofile.png\"\u002F\u003E\u003C\u002Fdiv\u003E\n";
            pug_html = pug_html + pug_indent.join("");
            pug_html = pug_html + "\u003C\u002Fdiv\u003E";
        };
        pug_indent.push('');
        pug_mixins["header"](items);
        pug_indent.pop();
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
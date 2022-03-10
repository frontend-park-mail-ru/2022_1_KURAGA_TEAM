export default function homeViewTemplate(locals) {
    var pug_html = "", pug_mixins = {}, pug_interp;
    ;var locals_for_with = (locals || {});
    (function (items) {
        items = locals;
        pug_mixins["homeView"] = pug_interp = function (items) {
            var block = (this && this.block), attributes = (this && this.attributes) || {};
            pug_html = pug_html + "\u003Cdiv class=\"root\"\u003E\u003Cdiv class=\"header\" id=\"header\"\u003E\u003Cdiv class=\"navbar\"\u003E" + (null == (pug_interp = items.header) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"main-movie\"\u003E" + (null == (pug_interp = items.mainMovie) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"selection\"\u003E\u003Cdiv class=\"select\"\u003E\u003Cdiv class=\"select-title\"\u003EПопулярное\u003C\u002Fdiv\u003E\u003Cdiv class=\"wrap\"\u003E" + (null == (pug_interp = items.carouselPop) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"select-title\"\u003EЛучшее за 2021 год\u003C\u002Fdiv\u003E\u003Cdiv class=\"wrap\"\u003E" + (null == (pug_interp = items.carouselTop) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cdiv class=\"select-title\"\u003EСемейное\u003C\u002Fdiv\u003E\u003Cdiv class=\"wrap\"\u003E" + (null == (pug_interp = items.carouselFam) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv\u003E" + (null == (pug_interp = items.footer) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
        };
        pug_mixins["homeView"](items);
    }.call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined));
    ;
    return pug_html;
}
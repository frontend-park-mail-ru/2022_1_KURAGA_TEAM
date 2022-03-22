import { parseRegExp } from './parseRegExp.js';
import { routes } from "./constRouting.js";

class Router {
    constructor() {
        this.routes = {};
    }

    register(path, View) {
        this.routes[path] = new View();

        return this;
    }

    go(path) {
        let pathname = path;

        pathname = parseRegExp(pathname);

        window.history.pushState(null, null, path);

        this.routes[pathname].render();
    }

    start() {
        let pathname = window.location.pathname;

        pathname = parseRegExp(pathname);

        if (this.routes[pathname] === undefined) {
            pathname = routes.ERROR_VIEW;
        }

        const currentView = this.routes[pathname];
        currentView.render();

        window.addEventListener('popstate', (e) => {
            let pathname = window.location.pathname;

            pathname = parseRegExp(pathname);

            const newView = this.routes[pathname];
            newView.render();
        });
    }
}

export default new Router();

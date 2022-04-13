import { parseRegExp } from "./parseRegExp";
import { routes } from "./constRouting";
import OfflineViewClass from "../views/offlineView/offlineViewClass";

class Router {
    private readonly routes: {};

    constructor() {
        this.routes = {};
    }

    register(path: string, View): Router {
        this.routes[path] = new View();

        return this;
    }

    go(path: string): void {
        const pathname = parseRegExp(path);

        window.history.pushState(null, null, path);

        this.routes[pathname].render();
    }

    start(): void {
        if (!navigator.onLine) {
            const offline = new OfflineViewClass();
            offline.render();

            return;
        }

        let pathname = parseRegExp(window.location.pathname);

        if (this.routes[pathname] === undefined) {
            pathname = routes.ERROR_VIEW;
        }

        const currentView = this.routes[pathname];
        currentView.render();

        window.addEventListener("popstate", () => {
            const pathname = parseRegExp(window.location.pathname);

            const newView = this.routes[pathname];
            newView.render();
        });
    }
}

export default new Router();

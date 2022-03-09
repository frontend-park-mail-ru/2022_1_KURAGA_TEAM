class Router {
    constructor() {
        this.routes = {};
    }

    register(path, View) {
        this.routes[path] = new View();
        return this;
    }

    go(path) {
        window.history.pushState(null, null, path);

        this.routes[window.location.pathname].render();
    }

    start() {
        const currentView = this.routes[window.location.pathname];
        currentView.render();

        window.addEventListener('popstate', () => {
            const newView = this.routes[window.location.pathname];
            newView.render();
        });
    }
}

export default new Router();

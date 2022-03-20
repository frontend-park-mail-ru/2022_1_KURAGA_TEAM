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
        let result = path.match(/movie\/(\d+)/);

        if (result !== null) {
            pathname = '/movie/id';
        }

        window.history.pushState(null, null, path);

        this.routes[pathname].render();
    }

    start() {
        let pathname = window.location.pathname;

        let result = window.location.pathname.match(/movie\/(\d+)/);
        if (result !== null) {
            pathname = '/movie/id';
        }

        if (this.routes[pathname] === undefined) {
            pathname = '/error';
        }

        const currentView = this.routes[pathname];
        currentView.render();

        window.addEventListener('popstate', () => {
            let pathname = window.location.pathname;

            let result = window.location.pathname.match(/movie\/(\d+)/);
            if (result !== null) {
                pathname = '/movie/id';
            }

            const newView = this.routes[pathname];
            newView.render();
        });
    }
}

export default new Router();

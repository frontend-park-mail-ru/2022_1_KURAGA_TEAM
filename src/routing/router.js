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

        const regPath = pathname.match(/(\b\w+\b)\/(\d+)/);

        if (regPath !== null) {
            pathname = '/' + regPath[1];
        }

        window.history.pushState(null, null, path);

        this.routes[pathname].render();
    }

    start() {
        let pathname = window.location.pathname;

        const regPath = pathname.match(/(\b\w+\b)\/(\d+)/);

        if (regPath !== null) {
            pathname = '/' + regPath[1];
        }

        if (this.routes[pathname] === undefined) {
            pathname = '/error';
        }

        const currentView = this.routes[pathname];
        currentView.render();

        window.addEventListener('popstate', (e) => {
            let pathname = window.location.pathname;

            const regPath = pathname.match(/(\b\w+\b)\/(\d+)/);
            console.log(pathname, regPath)

            if (regPath !== null) {
                pathname = '/' + regPath[1];
            }

            const newView = this.routes[pathname];
            newView.render();
        });
    }
}

export default new Router();

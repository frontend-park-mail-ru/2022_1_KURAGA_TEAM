class Router {
   constructor() {
       this.routes = {};
   }

   register(path, view) {
       this.routes[path] = new view();
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
           const currentView = this.routes[window.location.pathname];
           currentView.render();
       });
   }
}

export default new Router();
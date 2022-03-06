export class Router {
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

        this.setHandler();
    }

   start() {
       let currentView = this.routes[window.location.pathname];
       currentView.render();

       this.setHandler();

       window.addEventListener('popstate', () => {
           currentView = this.routes[window.location.pathname];
           currentView.render();
       });
   }

   setHandler() {
       Array.from(document.getElementsByTagName('a')).forEach((item) => {
           item.addEventListener('click', (e) => {
               e.preventDefault();

               this.go(item.pathname);
           })
       })
   }
}

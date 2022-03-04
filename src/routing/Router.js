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
    }

   start() {
       let currentView = this.routes[window.location.pathname];
       currentView.render();

       Array.from(document.getElementsByTagName('a')).forEach((item) => {
           item.addEventListener('click', (e) => {
               e.preventDefault();

               this.go(item.pathname);
           })
       })

       window.addEventListener('popstate', () => {
           currentView = this.routes[window.location.pathname];
           currentView.render();
       });
   }
}

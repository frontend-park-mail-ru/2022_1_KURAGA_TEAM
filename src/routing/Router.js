export class Router {
   constructor() {
       this.routes = {};
   }

   register(path, view) {
       this.routes[path] = new view();
       return this;
   }

   start() {
       let currentView = this.routes[window.location.pathname];
       currentView.render();

       window.addEventListener('popstate', () => {
           currentView = this.routes[window.location.pathname];
           currentView.render();
       });
   }
}

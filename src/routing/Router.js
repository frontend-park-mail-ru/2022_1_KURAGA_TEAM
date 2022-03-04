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

       document.addEventListener('click', (e) => {
          if (e.target instanceof HTMLAnchorElement) {
              e.preventDefault();

              history.pushState(null, null, e.target.pathname);
              currentView = this.routes[e.target.pathname];

              currentView.render();
          }
       });
   }
}

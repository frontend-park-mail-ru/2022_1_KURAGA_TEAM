import {LoginViewClass} from "../components/loginView/loginViewClass.js";

export class Router {
   constructor() {
       this.routes = {};
   }

   register(path, view) {
       this.routes[path] = new view();
       return this;
   }

   start() {
       const login = new LoginViewClass();
       login.render();

       document.addEventListener('click', (e) => {
          if (e.target instanceof HTMLAnchorElement) {
              e.preventDefault();

              history.pushState(null, null, e.target.pathname);
              const currentView = this.routes[e.target.pathname];

              currentView.render();
          }
       });
   }
}

import router from 'Routing/router.ts';
import { routes } from "Routing/constRouting";
import RegViewClass from './views/regView/regViewClass.js';
import LoginViewClass from './views/loginView/loginViewClass.js';
import HomeViewClass from './views/homeView/homeViewClass.js';
import MovieViewClass from './views/movieView/movieViewClass.js';
import PersonViewClass from './views/personView/personViewClass.js';
import ErrorViewClass from "./views/errorView/404Error/errorViewClass.js";
import ProfileViewClass from "./views/profileView/profileViewClass.js";
import PlayerViewClass from "./views/playerView/playerViewClass";
import ErrorCatchViewClass from "./views/errorView/catchError/errorCatchViewClass";

import './css/common.scss';
import './css/media.scss';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', {scope: '/'})
        .catch(() => {
            router.go(routes.ERROR_CATCH_VIEW);
        });
}

router.register('/reg', RegViewClass);
router.register('/login', LoginViewClass);
router.register('/', HomeViewClass);
router.register('/movie', MovieViewClass);
router.register('/person', PersonViewClass);
router.register('/404', ErrorViewClass);
router.register('/errors', ErrorCatchViewClass);
router.register('/profile', ProfileViewClass);
router.register('/player', PlayerViewClass);

router.start();

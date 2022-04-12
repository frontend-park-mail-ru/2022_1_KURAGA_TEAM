import router from 'Routing/router.ts';
import RegViewClass from './views/regView/regViewClass';
import LoginViewClass from './views/loginView/loginViewClass';
import HomeViewClass from './views/homeView/homeViewClass';
import MovieViewClass from './views/movieView/movieViewClass';
import PersonViewClass from './views/personView/personViewClass';
import ErrorViewClass from "./views/errorView/404Error/errorViewClass";
import ProfileViewClass from "./views/profileView/profileViewClass";
import PlayerViewClass from "./views/playerView/playerViewClass";
import ErrorCatchViewClass from "./views/errorView/catchError/errorCatchViewClass";

import './css/common.scss';
import './css/media.scss';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('sw.js', {scope: '/'})
        .catch((err) => {
             console.error(err);
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

import router from './routing/router.js';
import RegViewClass from './views/regView/regViewClass.js';
import LoginViewClass from './views/loginView/loginViewClass.js';
import HomeViewClass from './views/homeView/homeViewClass.js';
import MovieViewClass from './views/movieView/movieViewClass.js';
import PersonViewClass from './views/personView/personViewClass.js';
import ErrorViewClass from "./views/errorView/errorViewClass.js";
import ProfileViewClass from "./views/profileView/profileViewClass.js";
import PlayerViewClass from "./views/playerView/playerViewClass";

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
router.register('/error', ErrorViewClass);
router.register('/profile', ProfileViewClass);
router.register('/player', PlayerViewClass);

router.start();

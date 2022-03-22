import router from './routing/router.js';
import RegViewClass from './views/regView/regViewClass.js';
import LoginViewClass from './views/loginView/loginViewClass.js';
import HomeViewClass from './views/homeView/homeViewClass.js';
import MovieViewClass from './views/movieView/movieViewClass.js';

import PersonViewClass from './views/personView/personViewClass.js';
import ErrorViewClass from "./views/errorView/errorViewClass.js";
import ProfileViewClass from "./views/profileView/profileViewClass.js";

import '../src/css/common.css';
import '../src/css/media.css';

router.register('/reg', RegViewClass);
router.register('/login', LoginViewClass);
router.register('/', HomeViewClass);
router.register('/movie', MovieViewClass);
router.register('/person', PersonViewClass);
router.register('/error', ErrorViewClass);
router.register('/profile', ProfileViewClass);

router.start();

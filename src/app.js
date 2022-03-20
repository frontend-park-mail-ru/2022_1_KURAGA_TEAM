import router from './routing/router.js';
import RegViewClass from './views/regView/regViewClass.js';
import LoginViewClass from './views/loginView/loginViewClass.js';
import HomeViewClass from './views/homeView/homeViewClass.js';
import MovieViewClass from './views/movieView/movieViewClass.js';
import ErrorViewClass from "./views/errorView/errorViewClass.js";

import '../src/css/common.css';
import '../src/css/home.css';
import '../src/css/error.css';
import '../src/css/media.css';
import '../src/css/regLog.css';
import '../src/css/movie.css';

router.register('/reg', RegViewClass);
router.register('/login', LoginViewClass);
router.register('/', HomeViewClass);
router.register('/movie/id', MovieViewClass);
router.register('/error', ErrorViewClass);

router.start();

import router from './routing/router.js';
import RegViewClass from './views/regView/regViewClass.js';
import LoginViewClass from './views/loginView/loginViewClass.js';
import HomeViewClass from './views/homeView/homeViewClass.js';
import MovieViewClass from './views/movieView/movieViewClass.js';

router.register('/reg', RegViewClass);
router.register('/login', LoginViewClass);
router.register('/', HomeViewClass);
router.register('/movie', MovieViewClass);

router.start();

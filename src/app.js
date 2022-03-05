'use script'

import {Router} from "./routing/Router.js";
import {RegViewClass} from "./views/regView/regViewClass.js";
import {LoginViewClass} from "./views/loginView/loginViewClass.js";
import {HomeViewClass} from "./views/homeView/homeViewClass.js";

const router = new Router();

router.register("/reg", RegViewClass);
router.register("/login", LoginViewClass);
router.register("/", HomeViewClass);

router.start();

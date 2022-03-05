'use script'

import {RegViewClass} from "./views/regView/regViewClass.js";
import {Router} from "./routing/Router.js";
import {LoginViewClass} from "./views/loginView/loginViewClass.js";

const router = new Router();

router.register("/reg", RegViewClass);
router.register("/login", LoginViewClass);
router.register("/", LoginViewClass);

router.start();

'use script'

import {RegViewClass} from "./components/regView/regViewClass.js";
import {Router} from "./Routing/Router.js";
import {LoginViewClass} from "./components/loginView/loginViewClass.js";

const router = new Router();

router.register("/reg", RegViewClass);
router.register("/login", LoginViewClass);

router.start();


import headerTemplate from "./header.js";
import {logout} from "../../modules/network.js";
import router from "../../routing/router.js"
const configUser= {
    name: "admin",
    src: ""
};

export class HeaderClass {
    render() {

        return headerTemplate(configUser);
    }
    setHandler(){
        const quit = document.querySelector(".quit");
        quit.addEventListener('click', (e) => {
            e.preventDefault();
            logout()
                .then(({status, responseBody}) => {
                    if (Number(status) / 100 === 4) {

                    } else {
                        console.log("move");
                        router.go("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                })

        });
    }
}
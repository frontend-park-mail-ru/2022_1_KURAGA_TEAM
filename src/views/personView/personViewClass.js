import personViewTemplate from './personView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import {person,profile} from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadPersonClass from "../../components/headPerson/headPerson.js";
import carousel from '../../components/carousel/carouselClass.js';
import FooterClass from "../../components/footer/footerClass.js";

const moviesConfig = [
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны1',
        genre: [
            "Боевик",
            "Приключения",
            "Фантастика",
            "Фэнтези"
        ],
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны2',
        genre: 'Фантастика2',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны3',
        genre: 'Фантастика3',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны4',
        genre: 'Фантастика4',
    },
];


const root = document.getElementById('root');

export default class PersonViewClass {
    render() {
        // profile()
        //     .then(({ isAuth, data }) => {
        //         if (!isAuth) {
        //             router.go('login');
        //             return;
        //         }
        //         data.then((res) => {
        const header = new HeaderClass("res.username");
        const headPerson = new HeadPersonClass();
        const carouselPop = new carousel('Pop', moviesConfig, 3, "Фильмография");
        const footer = new FooterClass();

        root.innerHTML = personViewTemplate({
            header: header.render(),
            headPerson: headPerson.render(),
            carouselPop: carouselPop.render(),
            footer: footer.render()
        });

        handlerLink()
        header.setHandler();
        carouselPop.setHandler();
        //     })
        // })
        // .catch((err) => {
        //     console.error(err);
        // })
    }
}

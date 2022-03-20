import personViewTemplate from './personView.pug'
import HeaderClass from '../../components/header/headerClass.js';
import handlerLink from '../../utils/handlerLink.js';
import {profile} from '../../modules/network.js';
import router from "../../routing/router.js";
import HeadPersonClass from "../../components/headPerson/headPerson.js";
import carousel from '../../components/carousel/carouselClass.js';
import FooterClass from "../../components/footer/footerClass.js";

const moviesConfig = [
    {
        img: "gucci.jpg",
        href: '/',
        name: 'Звездныефцвфцвфцв войны1',
        genre: 'Фантастика1',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войнфцвфцвы2',
        genre: 'Фантастика2',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны3фцвфцв',
        genre: 'Фантастика3',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны4',
        genre: 'Фантастика4',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны5фцвфцв',
        genre: 'Фантастика3',
    },
    {
        img: "star.png",
        href: '/',
        name: 'Звездные войны6',
        genre: 'Фантастика4',
    }
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

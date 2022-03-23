export default class BaseViewClass {
    render(props, template) {
        const root = document.getElementById('root');

        console.log(1)

        root.innerHTML = template({
            props,
        })
    }
}

// props:
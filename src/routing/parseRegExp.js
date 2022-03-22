export function parseRegExp(pathname) {
    const regPath = pathname.match(/(\b\w+\b)\/(\d+)$/);
    console.log(regPath)

    if (regPath !== null) {
        pathname = '/' + regPath[1];
    }

    return pathname;
}
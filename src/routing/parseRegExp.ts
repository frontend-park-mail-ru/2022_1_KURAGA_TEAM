export function parseRegExp(pathname: string): string {
    const regPath = pathname.match(/(\b\w+\b)\/(\d+)/);

    if (regPath !== null) {
        pathname = "/" + regPath[1];
    }

    return pathname;
}

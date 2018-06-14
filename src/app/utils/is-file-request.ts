export function isFileRequest (url: string) : boolean {
    const separator: string = '/';
    const searcher: RegExp = /\./;

    return url.split(separator).pop().search(searcher) !== -1;
}

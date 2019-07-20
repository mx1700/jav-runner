const crypto=require('crypto');

export class Thumb {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    get hashcode(): string {
        return crypto.createHash('md5').update(this.url).digest('hex');
    }
}
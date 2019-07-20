const crypto=require('crypto');

export class Thumb {
    readonly url: string;
    readonly isCrop: boolean;

    constructor(url: string, isCrop: boolean = false) {
        this.url = url;
        this.isCrop = isCrop;
    }

    get hashcode(): string {
        return crypto.createHash('md5').update(this.url).digest('hex');
    }

    get tmpPath(): string {
        return 'tmp/images/' + this.hashcode + '.jpg'
    }
}
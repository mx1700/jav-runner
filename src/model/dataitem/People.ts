import {Thumb} from "./thumb";

export class People {
    name: string;
    thumb?: Thumb;

    constructor(name: string, thumb: Thumb = null) {
        this.name = name;
        this.thumb = thumb;
    }
}
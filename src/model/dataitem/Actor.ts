import {People} from "./People";
import {Thumb} from "./thumb";

export class Actor extends People {
    rule?: string;

    constructor(name: string, thumb: Thumb = null, rule: string = null) {
        super(name, thumb);
        this.rule = rule
    }

}
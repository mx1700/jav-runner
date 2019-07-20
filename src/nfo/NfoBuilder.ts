import {Movie} from "../model/Movie";
import {Actor} from "../model/dataitem/Actor";
import {Thumb} from "../model/dataitem/thumb";

export class NfoBuilder {
    private items = [];
    private header = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
    private readonly movie: Movie;

    constructor(movie: Movie) {
        this.movie = movie;
    }

    public buildNfo(movie: Movie): string {
        let m = this.movie;
        this.items.push(this.header);
        this.items.push('<movie>');
            
        this.appendItem(m.title, 'title');
        this.appendItem(m.originalTitle, 'originaltitle');
        this.appendItem(m.sortTitle, 'sorttitle');
        this.appendItem(m.year.toString(), 'year');
        this.appendItem('', 'trailer');
        this.appendItem('', 'votes');
        this.appendItem('', 'set');
        this.appendItem(m.rating.toString(), 'rating');
        this.appendItem(m.outline, 'outline');
        this.appendItem(m.plot, 'plot');
        this.appendItem(m.tagline, 'tagline');
        this.appendItem(m.runtime.toString(), 'runtime');
        this.appendItem(m.releaseDate, 'releasedate');
        this.appendItem(m.studio, 'studio');
        this.appendItem(m.posters ? m.posters[0].url : '', 'thumb');
        this.appendFanart(m.fanart);
        this.appendItem(m.mpaa, 'mpaa');
        this.appendItem(m.id, 'id');
        this.appendItems(m.genres, 'genre');
        this.appendActors(m.actors);
        this.appendItem(m.directors ? m.directors[0].name : '', 'director');

        this.items.push('</movie>');
        return this.items.join("\n");
    }

    private appendItem(val: string, tag: string, attr: string = null) {
        let item;
        if(!attr) {
            item = `  <${tag}>` + val + `</${tag}>`
        } else {
            item = `  <${tag} ${attr}>` + val + `</${tag}>`
        }
        this.items.push(item)
    }

    private appendItems(vals: string[], tag: string, attr: string = null) {
        for (let val of vals) {
            this.appendItem(val, tag, attr)
        }
    }

    private appendActors(actors: Actor[]) {
        for(let actor of actors) {
            this.items.push('  <actor>');
            this.items.push(`    <name>${actor.name}</name>`);
            this.items.push(`    <thumb>${actor.thumb.url}</thumb>`);
            this.items.push('  </actor>');
        }
    }

    private appendFanart(fanart: Thumb[]) {
        this.items.push('  <fanart>');
        for(let thumb of fanart) {
            this.items.push(`    <thumb>${thumb.url}</thumb>`);
        }
        this.items.push('  </fanart>');
    }


    

}
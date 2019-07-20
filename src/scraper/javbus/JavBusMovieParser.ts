import {MovieParser} from "../../schema/MovieParser";
import {People} from "../../model/dataitem/People";
import {Thumb} from "../../model/dataitem/thumb";
import {Actor} from "../../model/dataitem/Actor";

export class JavBusMovieParser implements MovieParser{
    private readonly $: any;
    private $movieBox: any;
    private $infos: any;

    private id: string;
    private releaseDate: string;
    private runtime: number;
    private director: string;


    constructor($: any) {
        this.$ = $;
        this.parseInit()
    }

    private parseInit() {
        this.$movieBox = this.$('.container .row.movie');
        this.$infos = this.$movieBox.find('.info p');  //<p><span class="header">識別碼:</span> <span style="color:#CC0000;">HOKS-036</span>s
        this.parseInfo();
    }

    private parseInfo() {
        this.$infos.each((i, info) => {
            let header = this.$(info).find('.header').text();
            let val = this.$(info).text().replace(header, '').trim();
            switch(header) {
                case '識別碼:':
                    this.id = val;
                    break;
                case "發行日期:":
                    this.releaseDate = val;
                    break;
                case "長度:":
                    this.runtime = parseInt(val.replace("分鐘", ""));
                    break;
                case "導演:":
                    this.director = val;
                    break;
                case "製作商:":
                    break;
                case "發行商:":
                    break;

            }
        });
    }

    private parseActors(): Array<Actor> {
        let $ = this.$;
        let $actors = $('#star-div .avatar-box');
        return $actors.map((i, item): People => {
            let $item = $(item);
            let name = $item.find('span').text();
            let imgUrl = $item.find('img').attr('src');
            return new Actor(name, new Thumb(imgUrl))
        }).get()
    }

    getActors(): Array<Actor> {
        return this.parseActors();
    }

    getDirectors(): Array<People> {
        return this.director && [{ name: this.director }];
    }

    getFanart(): Array<Thumb> {
        let imgUrl = this.$('.movie .screencap .bigImage img').attr('src');
        return imgUrl && [new Thumb(imgUrl)];
    }

    getId(): string {
        return this.id;
    }

    getOriginalTitle(): string {
        return this.getTitle();
    }

    /**
     * 简介
     */
    getPlot(): string {
        return "";
    }

    /**
     * 海报
     */
    getPosters(): Array<Thumb> {
        let fanart = this.getFanart();
        return fanart ? [new Thumb(fanart[0].url, true)] : [];
    }

    getRating(): number {
        return 0;
    }

    getReleaseDate(): string {
        return this.releaseDate;
    }

    getRuntime(): number {
        return this.runtime;
    }

    getSortTitle(): string {
        return this.getId() + " - " + this.getTitle();
    }

    getStudio(): string {
        //todo
        return "";
    }

    getTags(): Array<string> {
        return [];
    }

    getTitle(): string {
        return this.$movieBox.find('.screencap .bigImage img').attr('title');
    }

    getYear(): number {
        return this.releaseDate ? parseInt(this.releaseDate.split('-')[0]) : 0;
    }

    getGenres(): Array<string> {
        return this.$infos.find('.genre a[href*=genre]').map((i, item) => this.$(item).text().trim()).get()
    }

    getCountry(): string {
        return "日本";
    }

    getMPAA(): string {
        return "XXX";
    }

    getOutline(): string {
        return "";
    }

    getTagline(): string {
        return "";
    }
}
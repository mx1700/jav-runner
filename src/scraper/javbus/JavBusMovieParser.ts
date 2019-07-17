import {MovieParser} from "../../schema/MovieParser";
import {People} from "../../model/dataitem/People";
import {ImageInfo} from "../../model/dataitem/ImageInfo";

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

    private parseActors(): Array<People> {
        let $ = this.$;
        let $actors = $('#star-div .avatar-box');
        return $actors.map((i, item): People => {
            let $item = $(item);
            let name = $item.find('span').text();
            let imgUrl = $item.find('img').attr('src');
            return { name: name, photo: new ImageInfo(imgUrl) }
        }).get()
    }

    getActors(): Array<People> {
        return this.parseActors();
    }

    getDirectors(): Array<People> {
        return this.director && [{ name: this.director }];
    }

    getExtraFanart(): Array<ImageInfo> {
        //todo
        return [];
    }

    getFanart(): Array<ImageInfo> {
        let imgUrl = this.$('.movie .screencap .bigImage img').attr('src');
        return imgUrl && [new ImageInfo(imgUrl)];
    }

    getId(): string {
        return this.id;
    }

    getOriginalTitle(): string {
        return "";
    }

    getPlot(): string {
        return "";
    }

    /**
     * 海报
     * @todo:需要切割主图
     */
    getPosters(): Array<ImageInfo> {
        //todo
        return [];
    }

    getRating(): number {
        //todo
        return 0;
    }

    getReleaseDate(): string {
        return this.releaseDate;
    }

    getRuntime(): number {
        return this.runtime;
    }

    getSortTitle(): string {
        //todo
        return "";
    }

    getStudio(): string {
        //todo
        return "";
    }

    getTags(): Array<string> {
        //todo
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
}
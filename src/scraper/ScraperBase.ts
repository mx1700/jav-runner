import {SearchResult} from "../model/SearchResult";
import * as Crawler from "crawler"
import {SearchParser} from "../schema/SearchParser";
import {MovieParser} from "../schema/MovieParser";
import * as fs from 'fs';
import {Movie} from "../model/Movie";
import {Scraper} from "../schema/Scraper";
import {Thumb} from "../model/dataitem/thumb";
const https = require('https');
import * as _ from "lodash";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export abstract class ScraperBase<M extends MovieParser, S extends SearchParser> implements Scraper{

    protected crawler: any;

    constructor() {
        this.initCrawler();
    }

    protected getMovieId(fileName: string): string {
        return fileName
    }

    protected abstract getSearchUrl(movieId: string);

    protected abstract getSearchParser($: any): S;

    protected abstract getMovieParser($: any): M;

    protected initCrawler() {
        this.crawler = new Crawler({
            maxConnections: 10,
            preRequest: function(options, done) {
                options.proxy = "https://bwh.tpimg.net:455";
                options.rejectUnauthorized = false;
                // options.agent = new https.Agent({
                //     rejectUnauthorized: false
                // });
                done();
            }
        });
        // this.crawler.on('schedule',(options) => {
        //     options.proxy = "https://bwh.tpimg.net:455";
        //     options.strictSSL = false;
        //     //options.proxy = "http://127.0.0.1:1080";
        // });
    }

    /**
     * 刮削影片
     * @param fileName
     */
    async getMovie(fileName: string): Promise<Movie> {
        let movieId = this.getMovieId(fileName);
        let searchUrl = this.getSearchUrl(movieId);
        let searchDoc = await this.getDocument(searchUrl);
        let searchResults = this.getSearchParser(searchDoc).parserResults(searchDoc);
        if(!searchResults) {
            return null;
        }

        let result = searchResults[0];
        let movieDoc = await this.getDocument(result.url);
        let movieParser = this.getMovieParser(movieDoc);
        return this.parserToMovie(movieParser)
    }

    async downloadMovieThumbs(movie: Movie): Promise<any> {
        let thumbs: Thumb[] = [];
        thumbs.push(...movie.posters);
        thumbs.push(...movie.fanart);
        thumbs.push(...movie.actors.map((it) => it.thumb));

        thumbs = _.uniqBy(thumbs, (it) => it.hashcode);
        console.log(thumbs);
        return this.downloadThumbs(thumbs);
    }

    /**
     * 转换模型
     * @param parser
     */
    protected parserToMovie(parser: M): Movie {
        let m = new Movie();
        let p = parser;
        m.id = p.getId();
        m.title = p.getTitle();
        m.originalTitle = p.getOriginalTitle();
        m.sortTitle = p.getSortTitle();
        m.actors = p.getActors();
        m.directors = p.getDirectors();
        m.posters = p.getPosters();
        m.fanart = p.getFanart();
        m.rating = p.getRating();
        m.releaseDate = p.getReleaseDate();
        m.year = p.getYear();
        m.runtime = p.getRuntime();
        m.studio = p.getStudio();
        m.tags = p.getTags();
        m.genres = p.getGenres();
        m.plot = p.getPlot();
        m.country = p.getCountry();
        m.outline = p.getOutline();
        m.tagline = p.getTagline();
        m.mpaa = p.getMPAA();

        return m;
    }



    protected async getDocument(url: String): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let task = {
                uri: url,
                callback: function(error, res, done) {
                    if(error) {
                        reject(error)
                    } else {
                        resolve(res.$)
                    }
                    done();
                }
            };
            this.crawler.queue(task)
        });
    }

    public async downloadThumb(thumb: Thumb): Promise<any> {
        let file = 'tmp/images/' + thumb.hashcode + '.jpg';
        return new Promise<any>((resolve, reject) => {
            let task = {
                uri: thumb.url,
                encoding:null,
                jquery: false,
                callback: function(error, res, done) {
                    if(error) {
                        reject(error)
                    } else {
                        fs.createWriteStream(file).write(res.body);
                        resolve()
                    }
                    done();
                }
            };
            this.crawler.queue(task)
        });
    }

    public async downloadThumbs(thumbs: Thumb[]): Promise<any> {
        let promises = thumbs.map((it) => this.downloadThumb(it));
        return Promise.all(promises)
    }
}
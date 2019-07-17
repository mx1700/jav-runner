import {SearchResult} from "../model/SearchResult";
import * as Crawler from "crawler"
import {SearchParser} from "../schema/SearchParser";
import {MovieParser} from "../schema/MovieParser";
import * as fs from 'fs';
import {Movie} from "../model/Movie";
import {Scraper} from "../schema/Scraper";

export abstract class ScraperBase<M extends MovieParser, S extends SearchParser> implements Scraper{

    protected crawler: any;

    constructor() {
        this.initCrawler();
    }

    protected abstract getMovieId(fileName: String): String;

    protected abstract getSearchUrl(movieId: String);

    protected abstract getSearchParser($: any): S;

    protected abstract getMovieParser($: any): M;

    protected initCrawler() {
        this.crawler = new Crawler({
            maxConnections: 10,
        });
    }

    /**
     * 刮削影片
     * @param fileName
     */
    async getMovie(fileName: String): Promise<Movie> {
        let movieId = this.getMovieId(fileName);
        let searchUrl = this.getSearchUrl(movieId);
        let searchDoc = await this.getDocument(searchUrl);
        let searchResults = this.getSearchParser(searchDoc).parserResults(searchDoc);
        if(!searchResults) {
            return null;
        }

        let result = searchResults[0];
        let movieDoc = await this.getDocument(result.url);
        let movieParser = this.getMovieParser(movieDoc)
        return this.parserToMovie(movieParser)
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
        m.extraFanart = p.getExtraFanart();
        m.rating = p.getRating();
        m.releaseDate = p.getReleaseDate();
        m.year = p.getYear();
        m.runtime = p.getRuntime();
        m.studio = p.getStudio();
        m.tags = p.getTags();
        m.genres = p.getGenres();
        m.plot = p.getPlot();

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
}
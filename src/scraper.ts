import {SearchResult} from "./model/SearchResult";
import * as Crawler from "crawler"
import {SearchParser} from "./schema/SearchParser";
import {MovieParser} from "./schema/MovieParser";
import * as fs from 'fs';

export abstract class Scraper<M extends MovieParser, S extends SearchParser> {

    crawler: any;
    movieParser: M;
    searchParser: S;

    constructor() {
        this.initCrawler();
    }

    abstract getMovieId(fileName: String): String;

    abstract getSearchUrl(movieId: String);

    protected initCrawler() {
        this.crawler = new Crawler({
            maxConnections: 10,
        });
    }

    async handle(fileName: String) {
        let movieId = this.getMovieId(fileName);
        let searchUrl = this.getSearchUrl(movieId);
        let searchDoc = await this.getDocument(searchUrl);
        let searchResults = this.searchParser.parserResult(searchDoc);
    }

    async getDocument(url: String): Promise<any> {
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

    async getDocumentMock(html: String): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let task = {
                html: html,
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

    async getDocumentMockByFile(filePath: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                let task = {
                    html: data,
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
        });
    }
}
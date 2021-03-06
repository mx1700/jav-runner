import {ScraperBase} from "../ScraperBase";
import {JavBusMovieParser} from "./JavBusMovieParser";
import {JavBusSearchParser} from "./JavBusSearchParser";

export class JavBusScraper extends ScraperBase<JavBusMovieParser, JavBusSearchParser>{

    baseUrl = "https://www.javbus.com/";

    getMovieId(fileName: string): string {
        //仅支持jav有码
        let reg = /([a-zA-Z]{2,6})-?(00)?(\d{3,6})/g;
        let match = reg.exec(fileName);
        if(!match) {
            return null;
        }
        return match[1].toUpperCase() + '-' + match[3].toUpperCase();
    }

    getSearchUrl(movieId: string) {
        movieId = movieId.replace('-', '');
        return `${this.baseUrl}search/${movieId}&type=&parent=ce`
    }

    protected getMovieParser($: any): JavBusMovieParser {
        return new JavBusMovieParser($);
    }

    protected getSearchParser($: any): JavBusSearchParser {
        return new JavBusSearchParser();
    }
}
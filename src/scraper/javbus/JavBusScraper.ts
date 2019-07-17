import {ScraperBase} from "../ScraperBase";
import {JavBusMovieParser} from "./JavBusMovieParser";
import {JavBusSearchParser} from "./JavBusSearchParser";

export class JavBusScraper extends ScraperBase<JavBusMovieParser, JavBusSearchParser>{

    baseUrl = "https://www.javbus.com/";

    getMovieId(fileName: String): String {
        return "HOKS-036";
    }

    getSearchUrl(movieId: String) {
        return `${this.baseUrl}search/${movieId}&type=&parent=ce`
    }

    protected getMovieParser($: any): JavBusMovieParser {
        return new JavBusMovieParser($);
    }

    protected getSearchParser($: any): JavBusSearchParser {
        return new JavBusSearchParser();
    }
}
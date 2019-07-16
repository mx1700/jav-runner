import {Scraper} from "../../scraper";
import {JavBusMovieParser} from "./JavBusMovieParser";
import {JavBusSearchParser} from "./JavBusSearchParser";

class JavBusScraper extends Scraper<JavBusMovieParser, JavBusSearchParser>{

    baseUrl = "https://www.javbus.com/";

    getMovieId(fileName: String): String {
        return "HOKS-036";
    }

    getSearchUrl(movieId: String) {
        return `${this.baseUrl}search/${movieId}&type=&parent=ce`
    }

    async getDocument(url: String): Promise<any> {

    }

}
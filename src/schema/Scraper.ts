import {Movie} from "../model/Movie";

export interface Scraper {
    getMovie(fileName: String): Promise<Movie>
}
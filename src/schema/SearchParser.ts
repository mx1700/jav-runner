import {SearchResult} from "../model/SearchResult";

export interface SearchParser {
    parserResult(doc: any): SearchResult[]
}
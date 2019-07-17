import {SearchResult} from "../model/SearchResult";

export interface SearchParser {
    parserResults(doc: any): SearchResult[]
}
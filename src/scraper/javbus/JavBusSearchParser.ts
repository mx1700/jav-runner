import {SearchParser} from "../../schema/SearchParser";
import {SearchResult} from "../../model/SearchResult";

export class JavBusSearchParser implements SearchParser{

    parserResults($: any): SearchResult[] {
        let $items = $('#waterfall .item .movie-box');
        return $items.map((i, item) => JavBusSearchParser.parserResult($(item))).get();
    }

    static parserResult(doc: any): SearchResult {
        let url = doc.attr('href');
        let $photo = doc.find('.thumb-frame img');
        let imgUrl = $photo.attr('src');
        let title = $photo.attr('title');
        return { url: url, label: title, thumbUrl: imgUrl};
    }
}
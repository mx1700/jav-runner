import * as help from './help'
import {JavBusSearchParser} from "../scraper/javbus/JavBusSearchParser";

describe('Javbus Scraper Test', () => {
    it('should parse search page', (done) => {
        let parser = new JavBusSearchParser();
        help.getDocumentMockByFile(__dirname + "/res/javbus-search.html").then(($) => {
            let result = parser.parserResults($);
            console.log(result);
            done()
        });
    });
});
import * as help from './help'
import {JavBusSearchParser} from "../scraper/javbus/JavBusSearchParser";
import {JavBusMovieParser} from "../scraper/javbus/JavBusMovieParser";
import {JavBusScraper} from "../scraper/javbus/JavBusScraper";
import {Thumb} from "../model/dataitem/thumb";
var assert = require('assert');

describe('Javbus Scraper Test', function() {
    it('should parse search page', async () => {
        let parser = new JavBusSearchParser();
        let $ = await help.getDocumentMockByFile(__dirname + "/res/javbus-search.html");

        let result = parser.parserResults($);
        assert.strictEqual(result[0].url, 'https://www.javbus.com/HOKS-036');
        assert.strictEqual(result[0].label, '快楽堕ち 早川瑞希');
        assert.strictEqual(result[0].thumbUrl, 'https://pics.javbus.com/thumb/76jz.jpg');
    });

    it('should parse movie page', async () => {
        let $ = await help.getDocumentMockByFile(__dirname + '/res/javbus-movie.html');
        let parser = new JavBusMovieParser($);
        assert.strictEqual(parser.getId(), 'HOKS-036', 'id');
        assert.strictEqual(parser.getTitle(), '快楽堕ち 早川瑞希', 'title');
        assert.strictEqual(parser.getRuntime(), 80, 'runtime');
        assert.strictEqual(parser.getReleaseDate(), '2019-07-13', 'release_date');
        assert.strictEqual(parser.getDirectors()[0].name, 'タク・オガワ', 'director');
        assert.strictEqual(parser.getStudio(), '');
        // assert.strictEqual(parser.getReleaseDate(), '2019-07-13');   //todo:发行商
        assert.strictEqual(parser.getGenres().length, 8, 'genres');
        assert.strictEqual(parser.getActors()[0].name, '早川瑞希');
        assert.strictEqual(parser.getActors()[0].thumb.url, 'https://pics.javbus.com/actress/o1s_a.jpg');
        assert.strictEqual(parser.getFanart()[0].url, 'https://pics.javbus.com/cover/76jz_b.jpg');
    });

    it('should scraper movie', async function() {
        this.timeout(20000);
        let s = new JavBusScraper();
        let m = await s.getMovie('HOKS-036');

        assert.strictEqual(m.id, 'HOKS-036', 'id');
        assert.strictEqual(m.title, '快楽堕ち 早川瑞希', 'title');
        assert.strictEqual(m.runtime, 80, 'runtime');
        assert.strictEqual(m.releaseDate, '2019-07-13', 'release_date');
        assert.strictEqual(m.directors[0].name, 'タク・オガワ', 'director');
        // assert.strictEqual(parser.getReleaseDate(), '2019-07-13');   //todo:制作商
        // assert.strictEqual(parser.getReleaseDate(), '2019-07-13');   //todo:发行商
        assert.strictEqual(m.genres.length, 8, 'genres');
        assert.strictEqual(m.actors[0].name, '早川瑞希');
        assert.strictEqual(m.actors[0].thumb.url, 'https://pics.javbus.com/actress/o1s_a.jpg');
        assert.strictEqual(m.fanart[0].url, 'https://pics.javbus.com/cover/76jz_b.jpg');
    });

    it('should download thumb', async function() {
        this.timeout(10000);
        let thumb = new Thumb("https://pics.javbus.com/cover/76jz_b.jpg");
        let s = new JavBusScraper();
        await s.downloadThumb(thumb);
    });

    it('should download all thumbs', async function() {
        this.timeout(10000);
        let s = new JavBusScraper();
        let m = await s.getMovie('HOKS-036');
        await s.downloadMovieThumbs(m)
    });
});
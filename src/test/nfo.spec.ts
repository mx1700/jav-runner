import {JavBusScraper} from "../scraper/javbus/JavBusScraper";
import {NfoWriter} from "../nfo/NfoWriter";

describe('Nfo Test', function() {
    let movie;

    before(async function() {
        this.timeout(10000);
        let s = new JavBusScraper();
        movie = await s.getMovie('AVOP-453');
    });

    it('should write .nfo', async function() {
        await new NfoWriter().writeNfo(movie, "tmp/" + movie.id)
    });

    it('should write poster', async function() {
        await new NfoWriter().writePoster(movie, "tmp/" + movie.id)
    });

    it('should write fanart', async function() {
        await new NfoWriter().writeFanart(movie, "tmp/" + movie.id)
    })
});
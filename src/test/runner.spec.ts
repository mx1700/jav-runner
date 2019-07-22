import {JavBusScraper} from "../scraper/javbus/JavBusScraper";
import {Runner} from "../Runner";
var assert = require('assert');
import * as fs from "fs"
import * as path from "path"

describe('Runner Test', function() {

    let movie;

    before(async function() {
        this.timeout(10000);
        let s = new JavBusScraper();
        movie = await s.getMovie('AVOP-453');
    });

    it('should get rename', function() {
        let rename = new Runner().getDirRename(movie);
        console.log(rename);
        assert.strictEqual(rename, "AVOP-453 [高杉麻里,妃月るい,枢木あおい] [DMM独家,滥交,美少女,粗暴,凌辱] (2019)");
    });

    it('should do rename(file)', async function() {
        let time = new Date().getTime();
        let tmp = 'tmp/' + time;
        await fs.promises.mkdir(tmp);

        let filePath = tmp + '/avop-453.mp4';
        await fs.promises.writeFile(filePath, '1');
        let newFile = await new Runner().rename(movie, filePath, false);
        assert.strictEqual(newFile, tmp + '/AVOP-453 [高杉麻里,妃月るい,枢木あおい] [DMM独家,滥交,美少女,粗暴,凌辱] (2019)/avop-453.mp4');
    });

    it('should do rename(dir)', async function() {
        let time = new Date().getTime();
        let tmp = 'tmp/' + time;
        await fs.promises.mkdir(tmp);
        let dir = tmp + '/avop-453';
        await fs.promises.mkdir(dir);
        let filePath = dir + '/abc.mp4';
        await fs.promises.writeFile(filePath, '1');

        let newFile = await new Runner().rename(movie, dir, true);
        assert.strictEqual(newFile, tmp + '/AVOP-453 [高杉麻里,妃月るい,枢木あおい] [DMM独家,滥交,美少女,粗暴,凌辱] (2019)/abc.mp4');
    });
});
import * as fs from "fs"
import * as path from "path"
import {JavBusScraper} from "./scraper/javbus/JavBusScraper";
import {Scraper} from "./schema/Scraper";

export class Runner {
    run(dir: string) {
        let list = fs.readdirSync(dir);
        list.forEach((item, i) => {
            let fileName = dir + '/' + item;
            let info = fs.statSync(fileName);
            if (info.isDirectory()) {
                console.log("dir: " + item)
            } else {
                console.log("file: " + item)
            }
        })
    }

    async scraperMovie(file: string, fileInfo: fs.Stats, scraper: Scraper): Promise<any> {
        let movie = await scraper.getMovie(file);
    }
}
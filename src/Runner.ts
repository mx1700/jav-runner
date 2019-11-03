import * as fs from "fs"
import * as path from "path"
import {JavBusScraper} from "./scraper/javbus/JavBusScraper";
import {Scraper} from "./schema/Scraper";
import {isVideoFile} from "./Help";
import {Movie} from "./model/Movie";
import {NfoWriter} from "./nfo/NfoWriter";
import Config from "./config";

export class Runner {

    run(dir: string) {
        Config.init();
        let list = fs.readdirSync(dir);
        /*
         * 只遍历一层文件夹
         * 如果是视频文件就先抓取,然后创建文件夹
         * 如果是文件夹就不创建
         * 最后都修改文件夹名&文件名
         * 文件名永远是番号
         */
        list = list.map((item) => dir + '/' + item);
        this.runFiles(list);
    }

    runFiles(list: string[]) {
        let scraper = new JavBusScraper();
        let files = [];
        list.forEach((item, i) => {
            let fileName = item;
            let info = fs.statSync(fileName);
            let isDir = info.isDirectory();

            //只保留文件夹和视频文件
            if(!isDir && !isVideoFile(fileName)) {
                return;
            }

            files.push({ file: fileName, info: info })
        });

        let tasks = files.map((it) => this.scraperMovie(it.file, it.info, scraper));
        Promise.all(tasks).then(() => {
            console.log("------ [DONE] ------");
        });
    }

    async scraperMovie(filePath: string, fileInfo: fs.Stats, scraper: Scraper): Promise<any> {
        let fileName = path.basename(filePath);
        console.log(`[JAV-RUNNER] ${fileName} 开始抓取`);
        try {
            let movie = await scraper.getMovie(fileName);
            if(movie) {
                let newFilePath = await this.rename(movie, filePath, fileInfo.isDirectory());
                let newFileInfo = path.parse(newFilePath);
                let writer = new NfoWriter(movie, newFileInfo.dir, newFileInfo.name);
                await writer.writeNfo();
                await writer.writePoster();
                await writer.writeFanart();
                console.log(`[JAV-RUNNER] ${fileName} 抓取完成`);
            } else {
                console.error(`[JAV-RUNNER] 没有找到 ${fileName} 影片`);
            }
        } catch(e) {
            console.log(e);
            console.error(`[JAV-RUNNER] 抓取 ${fileName} 失败, 错误信息: ` + e.message)
        }
    }

    async rename(movie: Movie, filePath: string, isDir: boolean) {
        if(isDir) {
            let basePath = path.dirname(filePath);
            let newName = this.getDirRename(movie);
            let newDir = basePath + '/' + newName;
            // console.log(filePath, newDir);
            await fs.promises.rename(filePath, newDir);
            let files = await fs.promises.readdir(newDir);
            let movieFiles = files.filter(isVideoFile);
            if(!movieFiles || movieFiles.length == 0) {
                //返回一个虚拟的路径,已供写入nfo
                return newDir + '/' + movie.id
            }
            let movieFile = movieFiles[0];
            return newDir + '/' + movieFile;
        } else {
            let basePath = path.dirname(filePath);
            let dirName = this.getDirRename(movie);
            let dirPath = basePath + '/' + dirName;
            let newFilePath = dirPath + '/' + path.basename(filePath);
            await fs.promises.mkdir(dirPath);
            await fs.promises.rename(filePath, newFilePath);
            return newFilePath;
        }
    }

    public getDirRename(movie: Movie) {
        let actors = movie.actors.map((it) => it.name).slice(0, Config.rename.actors_limit).join(",");
        let genres = movie.genres.slice(0, Config.rename.genres_limit).join(',');
        let id = movie.id;
        let title = movie.title.slice(0, Config.rename.title_length_limit);
        let year = movie.year;
        return eval('`' + Config.rename.template + '`')
    }
}
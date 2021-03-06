import {Movie} from "../model/Movie";
import {Thumb} from "../model/dataitem/thumb";
import * as sharp from "sharp"
import * as fs from 'fs';
import * as path from "path"
import {NfoBuilder} from "./NfoBuilder";

export class NfoWriter {
    private readonly movie: Movie;
    private readonly dir: string;
    private readonly basename: string;

    constructor(movie: Movie, dir: string, basename: string) {
        this.movie = movie;
        this.dir = dir;
        this.basename = basename;
    }

    get writeBase() {
        return path.join(this.dir, this.basename);
    }

    public async writeNfo(): Promise<any> {
        let builder = new NfoBuilder(this.movie);
        let xml = builder.buildNfo(this.movie);
        return fs.promises.writeFile(this.writeBase + '.nfo', xml);
    }

    public async writePoster(): Promise<any> {
        for (let thumb of this.movie.posters) {
            let file = this.writeBase + '-poster' + path.extname(thumb.url);
            if(thumb.isCrop) {
                return NfoWriter.cropPosterThumb(this.movie.id, thumb, file)
            } else {
                return fs.promises.copyFile(thumb.tmpPath, file);
            }
        }
    }

    public async writeFanart(): Promise<any> {
        for (let thumb of this.movie.fanart) {
            let file = this.writeBase + '-fanart' + path.extname(thumb.url);
            return fs.promises.copyFile(thumb.tmpPath, file);
        }
    }

    public static async cropPosterThumb(id: string, thumb: Thumb, toFile: string): Promise<any> {
        let img = sharp(thumb.tmpPath);
        let data = await img.metadata();
        let width = data.width;
        let height = data.height;

        let croppedWidth = Math.round(width / 2.11);
        let filename = id;
        //Presets

        //SOD (SDMS, SDDE) - crop 3 pixels
        if (filename.indexOf("SDDE") >= 0 || filename.indexOf("SDMS") >= 0)
            croppedWidth = croppedWidth - 3;
        //Natura High - crop 2 pixels
        if (filename.indexOf("NHDT") >= 0)
            croppedWidth = croppedWidth - 2;
        //HTY - crop 1 pixel
        if (filename.indexOf("HTV") >= 0)
            croppedWidth = croppedWidth - 1;
        //Prestige (EVO, DAY, ZER, EZD, DOM) crop 1 pixel
        if (filename.indexOf("EVO") >= 0 || filename.indexOf("DAY") >= 0 || filename.indexOf("ZER") >= 0 ||
            filename.indexOf("EZD") >= 0 || filename.indexOf("DOM") >= 0 && height == 522)
            croppedWidth = croppedWidth - 1;
        //DOM - overcrop a little
        if (filename.indexOf("DOM") >= 0 && height == 488)
            croppedWidth = croppedWidth + 13;
        //DIM - crop 5 pixels
        if (filename.indexOf("DIM") >= 0)
            croppedWidth = croppedWidth - 5;
        //DNPD - the front is on the left and a different crop routine will be used below
        //CRZ - crop 5 pixels
        if (filename.indexOf("CRZ") >= 0 && height == 541)
            croppedWidth = croppedWidth - 5;
        //FSET - crop 2 pixels
        if (filename.indexOf("FSET") >= 0 && height == 675)
            croppedWidth = croppedWidth - 2;
        //Moodyz (MIRD dual discs - the original code says to center the overcropping but provides no example so I'm not dooing anything for now)
        //Opera (ORPD) - crop 1 pixel
        if (filename.indexOf("DIM") >= 0)
            croppedWidth = croppedWidth - 1;
        //Jade (P9) - crop 2 pixels
        if (filename.indexOf("P9") >= 0)
            croppedWidth = croppedWidth - 2;
        //Rocket (RCT) - Crop 2 Pixels
        if (filename.indexOf("RCT") >= 0)
            croppedWidth = croppedWidth - 2;
        //SIMG - crop 10 pixels
        if (filename.indexOf("SIMG") >= 0 && height == 864)
            croppedWidth = croppedWidth - 10;
        //SIMG - crop 4 pixels
        if (filename.indexOf("SIMG") >= 0 && height == 541)
            croppedWidth = croppedWidth - 4;
        //SVDVD - crop 2 pixels
        if (filename.indexOf("SVDVD") >= 0 && height == 950)
            croppedWidth = croppedWidth - 4;
        //XV-65 - crop 6 pixels
        if (filename.indexOf("XV-65") >= 0 && height == 750)
            croppedWidth = croppedWidth - 6;
        //800x538 - crop 2 pixels
        if (height == 538 && width == 800)
            croppedWidth = croppedWidth - 2;
        //800x537 - crop 1 pixel
        if (height == 537 && width == 800)
            croppedWidth = croppedWidth - 1;
        if (height == 513 && width == 800) {
            croppedWidth = croppedWidth - 14;
        }

        //handling some weird inverted covers
        let cropInfo;
        if (filename.indexOf("DNPD") >= 0) {
            cropInfo = { left: 0, top: 0, width: croppedWidth, height: height};
        } else {
            cropInfo = { left: width - croppedWidth, top: 0, width: croppedWidth, height: height};
        }

        return img.extract(cropInfo).toFile(toFile)
    }
}
import * as path from 'path';
import * as OpenCC from 'opencc'

let acceptedMovieExtensions = ["avi", "mpeg", "mpg", "wmv", "asf", "flv", "mkv", "mka", "mov", "qt", "mp4", "m4v", "m4a", "aac", "nut", "ogg", "ogm", "rmvb", "rm", "ram",
    "ra", "3gp", "vivo", "pva", "nuv", "nsa", "fli", "flc", "dvr-ms", "wtv", "iso", "vob"];

export function isVideoFile(filepath: string) {
    let ext = path.extname(filepath);
    return acceptedMovieExtensions.indexOf(ext) >= 0;
}

let opencc = new OpenCC('t2s.json');
export function str_t2s(str: string) {
    return opencc.convertSync(str)
}

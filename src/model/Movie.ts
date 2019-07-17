import {People} from "./dataitem/People";
import {ImageInfo} from "./dataitem/ImageInfo";

export class Movie {
    id: string;
    title: string;
    originalTitle: string;
    sortTitle: string;

    actors: Array<People>;
    /**
     * 导演
     */
    directors: Array<People>;

    /**
     * 海报
     */
    posters: Array<ImageInfo>;

    /**
     * 大图
     */
    fanart: Array<ImageInfo>;

    /**
     * 扩展图片
     */
    extraFanart: Array<ImageInfo>;

    rating: number;
    releaseDate: string;
    year: number;

    /**
     * 时长
     */
    runtime: number;

    /**
     * 发行
     */
    studio: string;

    /**
     * 标签
     */
    tags: Array<string>;

    /**
     * 类型
     */
    genres: Array<string>;

    /**
     * 简介
     */
    plot: string
}
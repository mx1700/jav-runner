import {People} from "./dataitem/People";
import {Thumb} from "./dataitem/thumb";
import {Actor} from "./dataitem/Actor";

export class Movie {

    id: string;

    /**
     * 标题
     */
    title: string;
    /**
     * 原始标题
     */
    originalTitle: string;

    /**
     * 用以排序的标题
     */
    sortTitle: string;

    /**
     * 评分
     */
    rating: number;

    /**
     * 评级
     */
    mpaa: string;

    /**
     * 一行简介
     */
    outline: string;

    /**
     * 简介
     */
    plot: string;

    /**
     * 一句话标语
     */
    tagline: string;

    /**
     * 时长(分钟)
     */
    runtime: number;

    /**
     * 海报
     */
    posters: Array<Thumb>;

    /**
     * 大图
     */
    fanart: Array<Thumb>;

    /**
     * 国家
     */
    country: string;

    /**
     * 演员
     */
    actors: Array<Actor>;
    /**
     * 导演
     */
    directors: Array<People>;

    /**
     * 发行日志(2019-01-01)
     */
    releaseDate: string;

    /**
     * 年份
     */
    year: number;

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

}
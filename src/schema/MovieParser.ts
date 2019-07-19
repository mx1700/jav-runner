import {People} from "../model/dataitem/People";
import {Thumb} from "../model/dataitem/thumb";
import {Actor} from "../model/dataitem/Actor";

export interface MovieParser {

    /**
     * 编号
     */
    getId(): string

    /**
     * 标题
     */
    getTitle(): string

    /**
     * 原始标题
     */
    getOriginalTitle(): string

    /**
     * 用以排序的标题
     */
    getSortTitle(): string

    /**
     * 演员
     */
    getActors(): Array<Actor>

    /**
     * 导演
     */
    getDirectors(): Array<People>

    /**
     * 海报
     */
    getPosters(): Array<Thumb>

    /**
     * 大图,剧照
     */
    getFanart(): Array<Thumb>

    /**
     * 评分
     */
    getRating(): number

    /**
     * 评级
     */
    getMPAA(): string;

    /**
     * 发行日期
     */
    getReleaseDate(): string

    /**
     * 年份
     */
    getYear(): number

    /**
     * 时长
     */
    getRuntime(): number

    /**
     * 发行
     */
    getStudio(): string

    /**
     * 类型
     */
    getGenres(): Array<string>

    /**
     * 标签
     */
    getTags(): Array<string>

    /**
     * 简介
     */
    getPlot(): string

    /**
     * 一行简介
     */
    getOutline(): string

    /**
     * 一句话标语
     */
    getTagline(): string

    /**
     * 国家
     */
    getCountry(): string
}
import {People} from "../model/dataitem/People";
import {ImageInfo} from "../model/dataitem/ImageInfo";

export interface MovieParser {
    getId(): string
    getTitle(): string
    getOriginalTitle(): string
    getSortTitle(): string

    /**
     * 演员
     */
    getActors(): Array<People>

    /**
     * 导演
     */
    getDirectors(): Array<People>

    /**
     * 海报
     */
    getPosters(): Array<ImageInfo>

    /**
     * 大图
     */
    getFanart(): Array<ImageInfo>

    /**
     * 扩展图片
     */
    getExtraFanart(): Array<ImageInfo>

    /**
     * 评分
     */
    getRating(): number

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
}
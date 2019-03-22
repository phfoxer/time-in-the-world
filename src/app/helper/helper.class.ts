import { Injectable } from '@angular/core';
import { ISection } from '../interface/sections.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { IArticle } from '../interface/article.interface';

@Injectable()

export class HelperClass {
    /**
     * Return the Section object
     * @return ISection
     */
    public getSectionById(sectionId: string): ISection {
        const sections: ISection[] = environment.sections;
        const result = sections.filter(r => (r.sectionId === sectionId) ? r : false);
        return (result.length === 1) ? result[0] : null;
    }

    /**
     * Convert a string and date in friendly url
     * @param str Any string
     * @data date Any date object
     * @return string
     */
    public toFriendlyUrl(str: string, date: Date): string {
        const _date: Date = new Date(date);
        const url = _date.getFullYear() + '/' + Number(_date.getMonth() + 1).toString() + '/' + _date.getDate() + '/';
        return url + str.toLowerCase().replace(/[^\w-]+/g, ' ').replace(/ /g, '-') + '.html';
    }

    /**
     * Convert a any object in HttpParams object
     * @param obj any object
     * @return HttpParams
     */
    public setParams(obj: object): HttpParams {
        let params: HttpParams = new HttpParams();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                params = params.append(key, value);
            }
        }
        return params;
    }

    /**
     * Make the api integrations
     * @param array is the API response
     * @param origin is the API origin
     * @return IArticle[]
     */
    public getTheArticleObject(array: object[], origin: string): IArticle[] {
        const list: IArticle[] = [];
        if (origin === environment.origins.nytimes) {
            array.map((data: any) => {
                list.push({
                    id: encodeURIComponent(data.url),
                    title: data.title,
                    text: data.abstract,
                    thumbnail: (data.multimedia.length > 0) ? data.multimedia[2].url : null,
                    image: (data.multimedia.length > 0) ? data.multimedia[3].url : null,
                    date: data.published_date,
                    section: data.section,
                    author: data.byline,
                    url: this.toFriendlyUrl(data.title, data.published_date),
                    origin: origin
                });
            });
        } else if (origin === environment.origins.guardian) {
            array.map((data: any) => {
                list.push({
                    id: encodeURIComponent(data.id),
                    title: data.webTitle,
                    text: data.fields.trailText,
                    thumbnail: (data.fields.thumbnail) ? data.fields.thumbnail : null,
                    image: (data.fields.thumbnail) ? data.fields.thumbnail : null,
                    date: data.webPublicationDate,
                    section: data.sectionId,
                    author: data.fields.byline,
                    url: this.toFriendlyUrl(data.webTitle, data.webPublicationDate),
                    origin: origin
                });
            });
        }
        return list;
    }
}

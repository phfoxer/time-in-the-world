import { Injectable } from '@angular/core';
import { ISection } from '../interface/sections.interface';
import { environment } from 'src/environments/environment';

@Injectable()

export class HelperClass {
    /**
     * Return the Section object
     */
    public getSectionById(sectionId: string) {
        const sections: ISection[] = environment.sections;
        const result = sections.filter(r => (r.sectionId === sectionId) ? r : false);
        return (result.length === 1) ? result[0] : null;
    }

    /**
     * Convert a string and date in friendly url
     */
    public toFriendlyUrl(str: string, date: Date) {
        const d: Date = new Date(date);
        const s = d.getFullYear() + '/' + Number(d.getMonth() + 1).toString() + '/' + d.getDate() + '/';
        return s + str.toLowerCase().replace(/[^\w-]+/g, ' ').replace(/ /g, '-') + '.html';
    }

    /**
     * name
     */
    public getSingleArticle(url: string) {

    }
}

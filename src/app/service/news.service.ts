import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IArticle } from '../interface/article.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public theguardianapis: string;
  public newyorktimesapis: string;
  constructor(private http: HttpClient) {
    this.theguardianapis = 'https://content.guardianapis.com/';
    this.newyorktimesapis = 'https://api.nytimes.com/svc/news/v3/content/nyt/';
  }

  /**
   * Make the api integrations and return news request by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getNews(section: string, limit?: string): Observable<IArticle[]> {
    return new Observable((observer) =>
      forkJoin([this.getTheGuardian(section, limit), this.getTheNewYorkTimes(section, limit)]).subscribe((result: Array<object[]>) => {
        const list: IArticle[] = [];
        // The guardian response
        result[0].map((guardian: any) => {
          list.push({
            title: guardian.webTitle,
            text: guardian.body.trailText,
            thumbnail: (guardian.fields.thumbnail) ? guardian.fields.thumbnail : null,
            image: (guardian.fields.thumbnail) ? guardian.fields.thumbnail : null,
            date: guardian.webPublicationDate,
            section: guardian.sectionId,
            author: guardian.fields.byline
          });
        });
        // The New York Times response
        result[1].map((newyorktimes: any) => {
          list.push({
            title: newyorktimes.title,
            text: newyorktimes.abstract,
            thumbnail: (newyorktimes.multimedia.length > 0) ? newyorktimes.multimedia[2].thumbnail.url : null,
            image: (newyorktimes.multimedia.length > 0) ? newyorktimes.multimedia[3].thumbnail.url : null,
            date: newyorktimes.published_date,
            section: newyorktimes.section,
            author: newyorktimes.byline
          });
        });
        observer.next(list);
      })
    );
  }

  /**
   * Return The Guardian news by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getTheGuardian(section: string, limit: string = '10'): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('api-key', environment.keys.theguardian);
    params = params.append('show-fields', 'trail-text,byline,body,thumbnail');
    params = params.append('page-size', limit);
    return this.http.get(this.theguardianapis + section, { params }).pipe(map((data: any) =>
      data.response.results
    ));
  }

  /**
   * Return The New York Time news by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getTheNewYorkTimes(section: string, limit: string = '10'): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('api-key', environment.keys.newyorktimes);
    params = params.append('limit', limit);
    return this.http.get(this.newyorktimesapis + section + '.json', { params }).pipe(map((data: any) => data.results));
  }
}

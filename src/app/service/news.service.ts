import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IArticle } from '../interface/article.interface';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private theguardianapis: string;
  private newyorktimesapis: string;
  constructor(private http: HttpClient) {
    this.theguardianapis = 'https://content.guardianapis.com/';
    this.newyorktimesapis = 'https://api.nytimes.com/svc/news/v3/content/nyt/';
  }

  /**
   * Return news request by section
   * @param section
   * @return Observable<any>
   */
  public getNews(section: string): Observable<any> {
    return new Observable((Subscriber) =>
      forkJoin([this.getTheGuardian(section), this.getTheNewYorkTimes(section)]).subscribe((result: Array<object[]>) => {
        let list: IArticle[] = [];
        // The guardian response
        result[0].map((guardian: any) => {
          list.push({
            title: guardian.webTitle,
            text: guardian.fields.trailText,
            date: guardian.webPublicationDate,
            section: guardian.sectionId
          });
        });
        // The New York Times response
        result[1].map((newyorktimes: any) => {
          list.push({
            title: newyorktimes.title,
            text: newyorktimes.abstract,
            date: newyorktimes.published_date,
            section: newyorktimes.section
          });
        });
      })
    );
  }

  /**
   * Return The Guardian news by section
   * @param section 
   * @return Observable<any>
   */
  public getTheGuardian(section: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('api-key', environment.theguardian);
    params = params.append('show-fields', 'trail-text');
    return this.http.get(this.theguardianapis + section, { params }).pipe(map((data: any) =>
      data.response.results
    ))
  }

  /**
   * Return The New York Time news by section
   * @param section 
   * @return Observable<any>
   */
  public getTheNewYorkTimes(section: string): Observable<any> {
    let params: HttpParams = new HttpParams();
    params = params.append('api-key', environment.newyorktimes);
    params = params.append('limit', '10');
    return this.http.get(this.newyorktimesapis + section + '.json', { params }).pipe(map((data: any) => data.results))
  }



}

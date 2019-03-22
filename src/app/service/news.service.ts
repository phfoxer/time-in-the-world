import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, concatAll } from 'rxjs/operators';
import { IArticle } from '../interface/article.interface';
import { HelperClass } from '../helper/helper.class';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  public theguardianapis: string;
  public newyorktimesapis: string;
  constructor(private http: HttpClient, private helper: HelperClass) {
    this.theguardianapis = 'https://content.guardianapis.com/';
    this.newyorktimesapis = 'https://api.nytimes.com/svc/news/v3/';
  }

  /**
   * Make the api integrations and return news request by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getNews(section: string, limit?: string): Observable<IArticle[]> {
    return new Observable((observer) =>
      forkJoin([
        this.getListTheGuardian(section, limit),
        this.getListTheNewYorkTimes(section, limit)
      ]).pipe(concatAll()).subscribe((result: IArticle[]) =>
        observer.next(result)
      )
    );
  }

  /**
   * Make the api integrations and return news request by id
   * @return Observable<any>
   */
  public getNewsById(id: string, origin: string): Observable<IArticle> {
    if (origin === environment.origins.nytimes) {
      return this.getTheNewYorkTimesById(id);
    } else if (origin === environment.origins.guardian) {
      return this.getTheGuardianById(id);
    } else {
      return null;
    }
  }

  /**
   * Return The Guardian news by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getListTheGuardian(section: string, limit: string = '10'): Observable<any> {
    const params: HttpParams = this.helper.setParams({
      'api-key': environment.keys.theguardian,
      'show-fields': 'trail-text,byline,body,thumbnail',
      'page-size': limit
    });
    return this.http.get(this.theguardianapis + section, { params }).pipe(map((data: any) =>
      this.helper.getTheArticleObject(data.response.results, environment.origins.guardian)
    ));
  }

  /**
   * Return The Guardian news by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getTheGuardianById(id: string): Observable<any> {
    const params: HttpParams = this.helper.setParams({
      'ids': id,
      'api-key': environment.keys.theguardian,
      'show-fields': 'trail-text,byline,body,thumbnail'
    });
    return this.http.get(this.theguardianapis + 'search', { params }).pipe(map((data: any) =>
      this.helper.getTheArticleObject(data.response.results, environment.origins.guardian)[0]
    ));
  }
  /**
   * Return The New York Time news by section
   * @param section The Section of the News
   * @return Observable<any>
   */
  public getListTheNewYorkTimes(section: string, limit: string = '10'): Observable<any> {
    const params: HttpParams = this.helper.setParams({
      'api-key': environment.keys.newyorktimes,
      'limit': limit
    });
    return this.http.get(this.newyorktimesapis + 'content/nyt/' + section + '.json', { params }).pipe(map((data: any) =>
      this.helper.getTheArticleObject(data.results, environment.origins.nytimes)
    ));
  }

  /**
   * Return The New York Time news by section
   * @param id The ID for search a article in The NY Times, in this case url
   * @return Observable<any>
   */
  public getTheNewYorkTimesById(id: string): Observable<any> {
    const params: HttpParams = this.helper.setParams({
      'api-key': environment.keys.newyorktimes,
      'url': id
    });
    return this.http.get(this.newyorktimesapis + 'content.json', { params }).pipe(map((data: any) =>
      this.helper.getTheArticleObject(data.results, environment.origins.nytimes)[0]
    ));
  }

}

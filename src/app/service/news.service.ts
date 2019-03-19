import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
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


  getNews(section: string, params: any) {
    const keys: any = environment;
    // api-key
    const theguardian = this.http.get(this.theguardianapis + section);
    const newyorktimes = this.http.get(this.newyorktimesapis + section + '.json');

    forkJoin([theguardian, newyorktimes]).subscribe((results: Array<object>) => {
      console.log(results);
    });

  }


}

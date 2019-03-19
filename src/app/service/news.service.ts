import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private theguardianapis: string;
  private newyorktimesapis: string;
  constructor(private http: HttpClient) {
    this.theguardianapis = 'https://content.guardianapis.com/world?api-key=77d3b102-9cc8-4ae3-b3f3-246dd91cfbc6&show-fields=trail-text';
    this.newyorktimesapis = 'https://api.nytimes.com/svc/news/v3/content/nyt/world.json';
  }


  getNews() {
    const theguardianapis = this.http.get(this.theguardianapis);
    const newyorktimesapis = this.http.get(this.newyorktimesapis);

    forkJoin([theguardianapis, newyorktimesapis]).subscribe((results: Array<object>) => {
      console.log(results);
    });

  }


}

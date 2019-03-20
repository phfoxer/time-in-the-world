import { Component, OnInit } from '@angular/core';
import { ISection } from './interface/sections.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The PH News';
  sections: ISection[];
  constructor() { }

  ngOnInit() {
    this.sections = environment.sections;
  }


}

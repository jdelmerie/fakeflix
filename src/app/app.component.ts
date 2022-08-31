import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fakeflix';
  currentYear = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {

  }
}

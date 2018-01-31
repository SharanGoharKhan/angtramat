import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Trabble Agent Portal';
  isSignedIn: boolean = false;

  constructor(
    private ngZone: NgZone,
    private router: Router){}
  
  ngOnInit() {
    console.log("App Component")
    this.intializeSubscribers();
  }
  intializeSubscribers() {
  }
  ngOnDestroy() {

  }
}

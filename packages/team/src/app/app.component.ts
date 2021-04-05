import { Component, OnInit } from '@angular/core';

import routingProxy from '../routingProxy';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Team';
  skipLocationChange = false;

  ngOnInit(): void {
    if (document.querySelector('app-root')) {
      console.log('routingProxy.navigate: ', routingProxy.navigate);
      this.skipLocationChange = !!routingProxy.navigate;
    }
  }
}

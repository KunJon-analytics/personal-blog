import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'personal-blog';
  getOutlet(o: RouterOutlet) {
    return o.activatedRouteData['routeState'];
  }
}

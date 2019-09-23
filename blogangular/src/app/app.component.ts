import { Component } from '@angular/core';
import { configServiceUser } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [configServiceUser]
})
export class AppComponent {
  title = 'blogangular';

  public userIdentity; 
  public token; 

  constructor(private serviceProvider: configServiceUser) {
    this.userIdentity = this.serviceProvider.getUserIdentity();
  }

}

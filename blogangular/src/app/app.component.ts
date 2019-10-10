import { Component, DoCheck, OnInit } from '@angular/core';
import { configServiceUser } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [configServiceUser]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'blogangular';

  public userIdentity; 
  public token; 
  public url = global.urlApi;

  constructor(private serviceProvider: configServiceUser) {
    this.loadUser()
  }

  ngOnInit(){

  }

  ngDoCheck(){ //con este se actualiza ese mismo metodo 
    this.loadUser() //con este metodo cargamos el token de usuario y contraseña que esten en el localstorage o no 
  }

  loadUser(){
    this.userIdentity = this.serviceProvider.getUserIdentity();
    this.token = this.serviceProvider.getToken();
  }

}

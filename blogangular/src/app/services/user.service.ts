import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import {user} from '../models/users';
import { global } from './global';  

@Injectable()
export class configServiceUser{

    public url:string;

    constructor(public http: HttpClient ){
        this.url = global.urlApi; 
    }

   
    //creamos el metodo para poder eviar los datos, pasamos como parametro el objeto y gracias a ngModel, este se modifica en todos  lados
    addUser(user: user): Observable<any>{
        //recibimos los datos de usuario y los convertirmos en json 
        let userJson = JSON.stringify(user); 
        
        //agregamos la llave que nos pedira la api, en este caso es 'json'. seguido concatenamos el json ya creado 
        let params = `json=${userJson}`;
       
        //instanciamos la clase httpheaders 
        let head = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');//enviamos un formulario normal 
          
        return this.http.post(`${this.url}register`, params, {headers: head})

    }

}
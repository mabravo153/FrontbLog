import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders}  from '@angular/common/http';
import { Observable } from 'rxjs';
import {user} from '../models/users';
import { global } from './global';  //tenemos la url de la api 

@Injectable()
export class configServiceUser{

    public url:string;
    public Identity; 
    public token; 

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

    //pasamos como parametro el objeto que estaremos enviando
    login(user: user, getToken = null): Observable<any>{

        //el api nos retorna el usuario decodificado en caso de ser true 
        if(getToken != null){
            user.getToken = 'true'; 
        }

        //este objeto lo convertimos en un json y le agreamos la llave correspondiente 
        let json = JSON.stringify(user); 

        let params = `json=${json}`;

        //instanciamos el objeto httpHeader que contendra las cabeceras 
        let cabeceras = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'); 

        //retornamos toda la informacion 
        return this.http.post(`${this.url}login`, params, {headers: cabeceras});

    }


    //tomamos la identidad del usuario en el local storage 
    getUserIdentity(){
        let userIdentity = JSON.parse(localStorage.getItem('userIdentify')); 

        (userIdentity != undefined &&  userIdentity)? this.Identity = userIdentity : this.Identity = null;

        return this.Identity;
    }

    //tomamos la el token usuario en el local storage
    getToken(){
        let tokenUser = localStorage.getItem('token');

        (tokenUser && tokenUser != undefined)? this.token = tokenUser : this.token = null; 

        return this.token

    }

    updateUser(user: user, token): Observable<any>{

        let usuario = JSON.stringify(user); 
        let key = `json=${usuario}`; 

        let header = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Auth': token
        })
                                      

        return this.http.put(`${this.url}update`, key, {headers: header});  
    }
}
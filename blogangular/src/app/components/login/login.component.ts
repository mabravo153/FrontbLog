import { Component, OnInit } from '@angular/core';
import { user } from '../../models/users';
import { configServiceUser } from '../../services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [configServiceUser]
})
export class LoginComponent implements OnInit {

  public pageTitle: string; 
  public user: user = new user(1,'','','','','','USER','','');
  public estado: string; 

  constructor(private serviceUser: configServiceUser) {
    this.pageTitle = 'Sign In';
   }


  get diagnostico(){
     return JSON.stringify(this.user); //funcion que nos muestra que recibe el usuario 
   }

   onSubmit(){
    //estamos instanciando la clase que contiene el metodo para enviar la informacion de usuario  
    this.serviceUser.login(this.user).subscribe(

      response => {
        console.log(response)
      }, 
      error => {
       
        console.log(error);
        
      }

    )
     
   }

  ngOnInit() {
  }

}

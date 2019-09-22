import { Component, OnInit } from '@angular/core';
import { configServiceUser } from '../../services/user.service';
import {user} from '../../models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [configServiceUser]
})

export class RegisterComponent implements OnInit {

  public pageTitle: string; 
  public user: user = new user(1, '', '', '', '', '', 'USER', '',''); 
  public estado: string; 

  constructor(private serviceUser: configServiceUser) {
    this.pageTitle = 'Sign Up';
  }

  

  get diagnostic(){
    return JSON.stringify(this.user) //para ver lo que estamos enviando 
  }

  onSubmit(form){
  
    this.serviceUser.addUser(this.user).subscribe(//con este metodo tomamos la informacion que nos envia el api de vuelta 
      response => {
       
        //tomamos el codigo de estado que el api nos envia y mostramos algo en la vista dependiendo 
        if(response.estado  == 'correcto'){
          this.estado = response.estado
          form.reset();
        }else{
          this.estado = 'error'
        }

       
      },
      error =>{
        console.log(error)
        form.reset();
      } 
    
    )
  }//fin onSubmit 

  ngOnInit(){

  }



}

import { Component, OnInit } from '@angular/core';
import {user} from '../../models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public pageTitle: string; 
  public user: user; 


  constructor() {
    this.pageTitle = 'Sign Up';
    this.user = new user(1, '', '', '', '', '', 'USER', '');
  }

  get diagnostic(){
    return JSON.stringify(this.user) //para ver lo que estamos enviando 
  }

  onSubmit(form){
    
  }

  ngOnInit() {
  }

}

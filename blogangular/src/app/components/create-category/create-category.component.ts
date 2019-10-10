import { Component, OnInit } from '@angular/core';
import { categories } from '../../models/categories';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { configServiceUser } from '../../services/user.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers: [configServiceUser]
})
export class CreateCategoryComponent implements OnInit {

  public pageTitle: string;
  public category: categories;
  public token; 
  public identity;

  constructor(
    private categoryService: configServiceUser,
    private activateRoute: ActivatedRoute,
    private _route: Router
  ) {
    this.pageTitle = 'Create Category',
    this.token = this.categoryService.getToken(),
    this.identity = this.categoryService.getUserIdentity(),
    this.category = new categories(1, ''); 
  }

  ngOnInit() {
  }

 get identify(){
    return JSON.stringify(this.category)
 }

 onSubmit(form){
   
 }

}

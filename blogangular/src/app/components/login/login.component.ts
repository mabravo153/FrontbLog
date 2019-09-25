import { Component, OnInit } from '@angular/core';
import { user } from '../../models/users';
import { configServiceUser } from '../../services/user.service'; 
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [configServiceUser]
})
export class LoginComponent implements OnInit {

  public pageTitle: string; 
  public user: user = new user(1,'','','','','','USER','','');
  public estado: string; //estado que nos ayudara a mostrar u ocultar las ventana de derror
  public token: string; //para almacenar el token que la api nos envie  
  public userIdenty:string; //usuario identidicado 


  constructor(
    private serviceUser: configServiceUser,
    private _router : Router,
    private ActRoute: ActivatedRoute //objeto que usaremos para cerrar sesion d
    ) {
    this.pageTitle = 'Sign In';
   }


   onSubmit(){
    //estamos instanciando la clase que contiene el metodo para enviar la informacion de usuario  
    this.serviceUser.login(this.user).subscribe(

      response => {
        
        //validamos que estado no sea error y escribimos el token
        if(response.estado != 'error'){
          this.token = response
          this.estado = 'correcto'; 
          
          //ejecutamos la funcion pasando el parametro true con el fin de optener los datos 
          this.serviceUser.login(this.user, true).subscribe(

            response => {
            
              //agregamos el usuario decodificado a la propiedad 
              this.userIdenty = response
              
              //agregamos el token al localstorage para que este persista 

              localStorage.setItem('token', this.token); 
              localStorage.setItem('userIdentify', JSON.stringify(this.userIdenty));
            
              this._router.navigate(['home'])
              
            }, 
            error => {
             this.estado = 'error';        
            }
      
          )

        }else{
          this.estado = 'error';
        
        }
        
      }, 
      error => {
       this.estado = 'error';        

       console.log(error);
       
      }

    )
     
   }

  ngOnInit() {
    this.logOut();
  }

  logOut(){
    this.ActRoute.params.subscribe(//de esta manera accedemos al parametro que nos envia la url al seleccionar el boton de logout 
      params => {
        let logout = +params['sure'] //de esta manera capturamos el valor que nos esta pasando, este debe ser un numero 

        //validamos que lo que nos envie el boton sea 1, en caso de serlo, borraremos la informacion del loal storage
        if(logout == 1){
          
          localStorage.removeItem('userIdentify');
          localStorage.removeItem('token');

          //removemos la informacion de las propiedades de la clase

          this.token = null; 
          this.userIdenty = null; 

          //redirigimos a la pagina de login 

          this._router.navigate(['login'])

        }

      }
    )
  }

}

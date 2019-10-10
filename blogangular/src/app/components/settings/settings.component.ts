import { Component, OnInit } from '@angular/core';
import { user } from '../../models/users';
import { configServiceUser } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [configServiceUser]
})
export class SettingsComponent implements OnInit {

  public pageTitle: string;
  public token;
  public userIdentify;
  public user: user;
  public estado: string;
  public url; 
  //configuracion de servicio de subida de archivos
  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpeg, .png, .bmp, .gif, .svg, .jpg",
    maxSize: "20",
    uploadAPI:  {
      url:`${global.urlApi}upload`,
      headers: {
     "Auth" : `${this.userService.getToken()}` // no usamos el token, porque a este punto no le hemos agregado un valor
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
};

  constructor(private userService: configServiceUser) {
    this.pageTitle = 'Settings',

      this.userIdentify = this.userService.getUserIdentity(),
      this.token = this.userService.getToken(),
      this.user = new user(1, this.userIdentify.name, this.userIdentify.lastName, '', this.userIdentify.email, '', 'USER', '', '');
      this.url = global.urlApi
  }

  ngOnInit() {

  }

  onSubmit() {

    this.userService.updateUser(this.user, this.token).subscribe(
      response => {
        if (response.estado == 'correcto') {
          this.estado = response.estado

          //modificar los campos del usuario identificado para actualizar el localstorage 
          this.userIdentify.name = this.user.name;
          this.userIdentify.lastName = this.user.lastName;
          this.userIdentify.userName = this.user.userName;
          this.userIdentify.email = this.user.email;

          localStorage.setItem('userIdentify', JSON.stringify(this.userIdentify));

        } else {
          this.estado = response.estado
        }

      },
      error => {
        this.estado = 'error';//en caso de dar un error en la red
        console.log(error);

      }

    )

  }

  get diagnostic() {

    return JSON.stringify(this.user)
  }

  imageUpload(datos){
    let response = JSON.parse(datos.response); //recibe los datos de la api, sea error o no 

    if (response.estado == 'correcto') {
      this.user.image = response.nombreImage
    }else{
      this.estado = 'error'; 
    }
    
  }

}

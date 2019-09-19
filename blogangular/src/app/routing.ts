//modulos necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//importar componentes

import {RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';


//definir las rutas 

const appRoutes: Routes= [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', component: HomeComponent},//ruta por defecto al abrir el sitio 
    {path: '**', component: ErrorComponent} //esta ruta se usa cuando no haya ninguna valida, despliega un error
]

//exportar las rutas 

export const appRoutingProviders: any[] = []; //para cargar las rutas como servicios
export const routingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
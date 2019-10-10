//modulos necesarios
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//importar componentes

import {RegisterComponent } from './components/register/register.component';
import {LoginComponent} from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';


//definir las rutas 

const appRoutes: Routes= [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'settings', component:SettingsComponent},
    {path: 'logout/:sure', component: LoginComponent},
    {path: 'create-category', component: CreateCategoryComponent},
    {path: '', component: HomeComponent},//ruta por defecto al abrir el sitio 
    {path: '**', component: ErrorComponent} //esta ruta se usa cuando no haya ninguna valida, despliega un error
]

//exportar las rutas 

export const appRoutingProviders: any[] = []; //para cargar las rutas como servicios
export const routingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
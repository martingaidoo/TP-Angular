import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './template/home/home.component';
import { TemplateComponent } from './template/template.component';
import { AuthGuardService } from './auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: TemplateComponent,
    children: [{ path: 'home', component: HomeComponent }],
    canActivate: [AuthGuardService],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

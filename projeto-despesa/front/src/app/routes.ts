import { Routes } from '@angular/router';
import { SigninComponent } from './user/signin/sign-in.component';
import { SignupComponent } from './user/signup/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CadastroSalarioComponent } from './cadastro-salario/cadastro-salario.component';
export const appRoutes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'cadastroSalario',
    component: CadastroSalarioComponent
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  }
];

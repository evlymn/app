import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: NavigationComponent,
  },
  {
    path: 'profile/:id',
    component: NavigationComponent,
  },
  {
    path: 'privates/:id',
    component: NavigationComponent,
  },
  {
    path: 'comments/:id',
    component: NavigationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

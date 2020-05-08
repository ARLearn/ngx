import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProtectedPageComponent } from './pages/protected-page/protected-page.component';
import { UnprotectedPageComponent } from './pages/unprotected-page/unprotected-page.component';

const routes: Routes = [];
//   { path: 'login', component: LoginComponent },
//   { path: 'prot', component: ProtectedPageComponent },
//   { path: 'unprot', component: UnprotectedPageComponent },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

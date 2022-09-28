import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAuthGuard} from './helper/admin-auth-guard';
import {NotFoundComponent} from './shared/not-found/not-found.component';


const routes: Routes = [
  {
    path: 'backyard',
    canActivateChild: [AdminAuthGuard],
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  },
  {
    path: '',
    loadChildren: () => import('./account/account.module').then(module => module.AccountModule)
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

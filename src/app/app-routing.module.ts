import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'auth',pathMatch:"full"},
  {
    path: 'admin', loadChildren: () =>
     import('../app/views/admin/admin.module').then(
      (m)=>m.AdminModule),
      canActivate:[authGuard],data:{ roles:['Admin','Manager']}
  },
  {
    path: 'sales', loadChildren: () =>
     import('../app/views/sales/sales.module').then(
      (m)=>m.SalesModule),
      canActivate:[authGuard],data:{roles:['Sales']}
  },
  {
    path:'auth',loadChildren:()=>
    import('../app/core/authentication/authentication.module').then(
      (m)=>m.AuthenticationModule
    )
  },
  {
    path:'client',loadChildren:()=>
    import('../app/views/client/client.module').then(
      (m)=>m.ClientModule),
      canActivate:[authGuard],data:{roles:['TeamLeader','Retention','Manager']}
  },
  {path:'notfound',component:NotfoundComponent},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

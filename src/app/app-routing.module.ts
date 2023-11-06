import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';

const appRoutes: Routes = [
  { path: '', component: ContentComponent }
  //{ path: '', redirectTo: '/menu', pathMatch: 'full' },
  // { path: '', component:  ContentComponent},
  // { path: 'menu', component: MenuComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

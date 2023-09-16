import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ContentComponent } from './content/content.component';
import { MenuComponent } from './content/menu/menu.component';

const routes: Routes = [
  { path: '', component:  ContentComponent},
  { path: 'menu', component: MenuComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

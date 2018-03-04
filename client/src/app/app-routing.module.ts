import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "./app-user/user.component";
import { PageNotFoundComponent } from "./not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [ 
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only) ],
      )
    ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

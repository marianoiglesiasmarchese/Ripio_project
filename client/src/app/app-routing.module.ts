import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './app-user/user.component';
import { PageNotFoundComponent } from './not-found.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/app', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
  { path: 'users', component: UserComponent },
  { path: 'app', component: AppComponent }

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

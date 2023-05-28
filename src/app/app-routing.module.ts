import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './onboarding/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RehearsalComponent } from './features/dashboard/rehearsal/rehearsal.component';
import { DatepickerComponent } from './features/dashboard/datepicker/datepicker.component';
import { ConcertComponent } from './features/dashboard/concert/concert.component';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectAuthorized = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'rehearsal'
  },
  {
    path: 'login', component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorized }
  },
  {
    path: '', component: DashboardComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'rehearsal',
        component: RehearsalComponent
      },
      {
        path: 'concert',
        component: ConcertComponent
      },
      {
        path: 'datepicker',
        component: DatepickerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

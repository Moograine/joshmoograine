import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './onboarding/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { DatepickerComponent } from './features/dashboard/datepicker/datepicker.component';
import { redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { EventComponent } from './features/dashboard/event/event.component';
import { RepertoireComponent } from './features/dashboard/repertoire/repertoire.component';

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
        path: 'repertoire',
        component: RepertoireComponent
      },
      {
        path: 'rehearsal',
        component: EventComponent
      },
      {
        path: 'concert',
        component: EventComponent
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

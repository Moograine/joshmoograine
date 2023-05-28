import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './onboarding/login/login.component';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RehearsalComponent } from './features/dashboard/rehearsal/rehearsal.component';
import { ConcertComponent } from './features/dashboard/concert/concert.component';
import { DatepickerComponent } from './features/dashboard/datepicker/datepicker.component';
import { PanelComponent } from './features/dashboard/shared/panel/panel.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './features/dashboard/shared/header/header.component';
import { DropdownModule } from 'primeng/dropdown';
import { EventCreatorComponent } from './features/dashboard/shared/event-creator/event-creator.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { ContextMenuModule } from 'primeng/contextmenu';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { Environment } from '../assets/environments/environment';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RehearsalComponent,
    ConcertComponent,
    DatepickerComponent,
    PanelComponent,
    HeaderComponent,
    EventCreatorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        DialogModule,
        InputTextareaModule,
        CheckboxModule,
        TooltipModule,
        ContextMenuModule,
        FormsModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(Environment.firebaseConfig),
        SkeletonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
